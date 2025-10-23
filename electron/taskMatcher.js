import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class TaskMatcher {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.lastProcessedCommit = null;
  }

  /**
   * Analyze new commits and match them to tasks
   */
  async analyzeCommits(tasks, lastKnownCommit = null) {
    try {
      const commits = await this.getNewCommits(lastKnownCommit);

      if (commits.length === 0) {
        return { matches: [], lastCommit: lastKnownCommit };
      }

      const matches = [];

      for (const commit of commits) {
        // 1. Check for explicit task IDs in commit message
        const taskIdMatches = this.findTaskIdMatches(commit, tasks);
        matches.push(...taskIdMatches);

        // 2. Check for keywords and semantic matches
        const keywordMatches = this.findKeywordMatches(commit, tasks);
        matches.push(...keywordMatches);

        // 3. Analyze file changes to detect feature implementation
        const featureMatches = this.analyzeFileChanges(commit, tasks);
        matches.push(...featureMatches);
      }

      return {
        matches: this.deduplicateMatches(matches),
        lastCommit: commits[0]?.hash
      };
    } catch (error) {
      console.error('Error analyzing commits:', error);
      return { matches: [], lastCommit: lastKnownCommit };
    }
  }

  /**
   * Get new commits since last processed commit
   */
  async getNewCommits(sinceCommit) {
    try {
      let command = 'git log -50 --pretty=format:"%H|%an|%ar|%s|%b" --name-status';

      if (sinceCommit) {
        command += ` ${sinceCommit}..HEAD`;
      }

      const { stdout } = await execAsync(command, { cwd: this.projectPath });

      if (!stdout.trim()) {
        return [];
      }

      const commits = [];
      const lines = stdout.split('\n');
      let currentCommit = null;

      for (const line of lines) {
        if (line.includes('|')) {
          // This is a commit header line
          if (currentCommit) {
            commits.push(currentCommit);
          }

          const parts = line.split('|');
          currentCommit = {
            hash: parts[0],
            author: parts[1],
            date: parts[2],
            subject: parts[3] || '',
            body: parts.slice(4).join('|') || '',
            files: [],
            fullMessage: ''
          };
        } else if (line.match(/^[AMD]\t/) && currentCommit) {
          // This is a file change line
          const [status, ...fileParts] = line.split('\t');
          const file = fileParts.join('\t');
          currentCommit.files.push({ status, file });
        }
      }

      if (currentCommit) {
        commits.push(currentCommit);
      }

      // Set fullMessage for each commit
      commits.forEach(commit => {
        commit.fullMessage = `${commit.subject}\n${commit.body}`.trim();
      });

      return commits;
    } catch (error) {
      console.error('Error getting new commits:', error);
      return [];
    }
  }

  /**
   * Find tasks by explicit ID references in commit message
   */
  findTaskIdMatches(commit, tasks) {
    const matches = [];
    const taskIdPattern = /\b([A-Z]{2,}-\d+)\b/gi;
    const foundIds = [...commit.fullMessage.matchAll(taskIdPattern)];

    for (const match of foundIds) {
      const taskId = match[1].toUpperCase();
      const task = tasks.find(t => t.id === taskId);

      if (task) {
        matches.push({
          taskId: task.id,
          commitHash: commit.hash,
          commitMessage: commit.subject,
          author: commit.author,
          date: commit.date,
          matchType: 'explicit',
          confidence: 1.0,
          reason: `Commit explicitly references ${task.id}`
        });
      }
    }

    return matches;
  }

  /**
   * Find tasks by keyword matching
   */
  findKeywordMatches(commit, tasks) {
    const matches = [];
    const message = commit.fullMessage.toLowerCase();

    for (const task of tasks) {
      const taskText = `${task.title} ${(task.acceptanceCriteria || []).join(' ')}`.toLowerCase();

      // Extract key terms from task
      const keywords = this.extractKeywords(taskText);

      // Count how many keywords appear in commit
      let matchCount = 0;
      const matchedKeywords = [];

      for (const keyword of keywords) {
        if (message.includes(keyword)) {
          matchCount++;
          matchedKeywords.push(keyword);
        }
      }

      // If significant overlap, consider it a match
      const confidence = keywords.length > 0 ? matchCount / keywords.length : 0;

      if (confidence > 0.3 && matchedKeywords.length >= 2) {
        matches.push({
          taskId: task.id,
          commitHash: commit.hash,
          commitMessage: commit.subject,
          author: commit.author,
          date: commit.date,
          matchType: 'keyword',
          confidence,
          reason: `Matched keywords: ${matchedKeywords.join(', ')}`,
          matchedKeywords
        });
      }
    }

    return matches;
  }

  /**
   * Analyze file changes to detect feature implementation
   */
  analyzeFileChanges(commit, tasks) {
    const matches = [];

    for (const task of tasks) {
      const taskLower = task.title.toLowerCase();
      const patterns = this.getFilePatterns(taskLower);

      // Check if commit touches relevant files
      let relevantFileCount = 0;
      const matchedFiles = [];

      for (const fileObj of commit.files || []) {
        const file = fileObj.file.toLowerCase();
        for (const pattern of patterns) {
          if (file.includes(pattern)) {
            relevantFileCount++;
            matchedFiles.push(fileObj.file);
            break;
          }
        }
      }

      if (relevantFileCount > 0) {
        const confidence = Math.min(relevantFileCount / 3, 0.8);

        matches.push({
          taskId: task.id,
          commitHash: commit.hash,
          commitMessage: commit.subject,
          author: commit.author,
          date: commit.date,
          matchType: 'file-analysis',
          confidence,
          reason: `Modified relevant files: ${matchedFiles.slice(0, 3).join(', ')}`,
          matchedFiles: matchedFiles.slice(0, 5)
        });
      }
    }

    return matches;
  }

  /**
   * Extract important keywords from task text
   */
  extractKeywords(text) {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
      'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
    ]);

    const words = text
      .match(/\b[a-z]{3,}\b/g) || [];

    const filtered = words.filter(word => !stopWords.has(word));

    return [...new Set(filtered)];
  }

  /**
   * Get file patterns that suggest task implementation
   */
  getFilePatterns(taskTitle) {
    const patterns = [];

    if (taskTitle.includes('auth') || taskTitle.includes('login') || taskTitle.includes('signup')) {
      patterns.push('auth', 'login', 'signup', 'session', 'user');
    }

    if (taskTitle.includes('database') || taskTitle.includes('schema') || taskTitle.includes('prisma')) {
      patterns.push('schema', 'prisma', 'database', 'migration', '.sql');
    }

    if (taskTitle.includes('api') || taskTitle.includes('endpoint') || taskTitle.includes('route')) {
      patterns.push('/api/', 'route', 'endpoint', 'trpc', 'router');
    }

    if (taskTitle.includes('component') || taskTitle.includes('ui') || taskTitle.includes('page')) {
      patterns.push('component', '/app/', '/page', '.tsx', '.jsx');
    }

    if (taskTitle.includes('style') || taskTitle.includes('css') || taskTitle.includes('tailwind')) {
      patterns.push('tailwind', '.css', 'style', 'theme');
    }

    if (taskTitle.includes('test')) {
      patterns.push('.test.', '.spec.', '__test__');
    }

    if (taskTitle.includes('config') || taskTitle.includes('setup')) {
      patterns.push('config', '.config.', 'package.json', '.env');
    }

    // Cat game specific
    if (taskTitle.includes('cat') || taskTitle.includes('game') || taskTitle.includes('3d')) {
      patterns.push('cats/', 'play/', 'game', 'three', 'rapier', 'physics');
    }

    // Performance
    if (taskTitle.includes('performance') || taskTitle.includes('optim')) {
      patterns.push('fps', 'performance', 'optimization', 'cache');
    }

    return patterns;
  }

  /**
   * Remove duplicate matches, keeping highest confidence
   */
  deduplicateMatches(matches) {
    const byTaskId = new Map();

    for (const match of matches) {
      const existing = byTaskId.get(match.taskId);

      if (!existing || match.confidence > existing.confidence) {
        byTaskId.set(match.taskId, match);
      } else if (match.confidence === existing.confidence && match.matchType === 'explicit') {
        byTaskId.set(match.taskId, match);
      }
    }

    return Array.from(byTaskId.values());
  }

  /**
   * Check if a task's acceptance criteria are likely met based on commits
   */
  async checkAcceptanceCriteria(task, commits) {
    if (!task.acceptanceCriteria || task.acceptanceCriteria.length === 0) {
      return { met: false, details: [] };
    }

    const details = [];
    let metCount = 0;

    for (const criterion of task.acceptanceCriteria) {
      const keywords = this.extractKeywords(criterion.toLowerCase());
      let found = false;

      for (const commit of commits) {
        const message = commit.fullMessage.toLowerCase();
        const matchingKeywords = keywords.filter(kw => message.includes(kw));

        if (matchingKeywords.length > keywords.length * 0.5) {
          found = true;
          details.push({
            criterion,
            met: true,
            commit: commit.hash.substring(0, 7),
            message: commit.subject
          });
          metCount++;
          break;
        }
      }

      if (!found) {
        details.push({
          criterion,
          met: false
        });
      }
    }

    return {
      met: metCount >= task.acceptanceCriteria.length * 0.7,
      metCount,
      total: task.acceptanceCriteria.length,
      percentage: Math.round((metCount / task.acceptanceCriteria.length) * 100),
      details
    };
  }
}
