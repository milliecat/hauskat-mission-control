import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import chokidar from 'chokidar';
import { TaskMatcher } from './taskMatcher.js';

const execAsync = promisify(exec);

export class ProjectMonitor {
  constructor(projectPath, onUpdate, onTaskMatches) {
    this.projectPath = projectPath;
    this.onUpdate = onUpdate;
    this.onTaskMatches = onTaskMatches;
    this.watcher = null;
    this.updateInterval = null;
    this.lastUpdate = null;
    this.taskMatcher = new TaskMatcher(projectPath);
    this.lastProcessedCommit = null;
    this.currentTasks = [];
  }

  /**
   * Update the tasks that we're tracking
   */
  setTasks(tasks) {
    console.log(`Updating tracked tasks: ${tasks.length} tasks`);
    this.currentTasks = tasks;
  }

  async start() {
    console.log('Starting project monitor for:', this.projectPath);

    // Initial data fetch
    await this.fetchProjectData();

    // Set up file system watcher
    this.setupWatcher();

    // Poll for updates every 30 seconds
    this.updateInterval = setInterval(() => {
      this.fetchProjectData();
    }, 30000);
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  setupWatcher() {
    try {
      this.watcher = chokidar.watch(this.projectPath, {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/dist/**',
          '**/build/**',
        ],
        persistent: true,
        ignoreInitial: true,
      });

      this.watcher.on('all', (event, path) => {
        console.log(`File change detected: ${event} - ${path}`);
        if (!this.lastUpdate || Date.now() - this.lastUpdate > 2000) {
          this.lastUpdate = Date.now();
          this.fetchProjectData();
        }
      });

      this.watcher.on('error', (error) => {
        console.error('Watcher error:', error);
      });
    } catch (error) {
      console.error('Error setting up watcher:', error);
    }
  }

  async fetchProjectData() {
    try {
      const [git, metrics, dependencies, activity] = await Promise.all([
        this.getGitInfo(),
        this.getFileMetrics(),
        this.getDependencyInfo(),
        this.getRecentActivity(),
      ]);

      const projectData = {
        git,
        metrics,
        dependencies,
        activity,
        lastUpdated: new Date().toISOString(),
      };

      this.onUpdate(projectData);

      // Check for task matches if we have tasks to track
      if (this.currentTasks.length > 0 && this.onTaskMatches) {
        await this.checkTaskMatches();
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  /**
   * Check if any commits match our tracked tasks
   */
  async checkTaskMatches() {
    try {
      const result = await this.taskMatcher.analyzeCommits(
        this.currentTasks,
        this.lastProcessedCommit
      );

      if (result.matches.length > 0) {
        console.log(`✅ Found ${result.matches.length} task matches in recent commits`);

        // Log each match
        for (const match of result.matches) {
          console.log(`   ${match.taskId}: ${match.commitMessage} (${Math.round(match.confidence * 100)}% confidence)`);
        }

        this.onTaskMatches(result.matches);
      }

      // Update last processed commit
      if (result.lastCommit) {
        this.lastProcessedCommit = result.lastCommit;
      }
    } catch (error) {
      console.error('Error checking task matches:', error);
    }
  }

  async getGitInfo() {
    try {
      const [branch, status, log, stats] = await Promise.all([
        execAsync('git branch --show-current', { cwd: this.projectPath }),
        execAsync('git status --porcelain', { cwd: this.projectPath }),
        execAsync('git log -10 --pretty=format:"%h|%an|%ar|%s"', { cwd: this.projectPath }),
        execAsync('git diff --shortstat', { cwd: this.projectPath }),
      ]);

      const commits = log.stdout.split('\n').filter(line => line).map(line => {
        const [hash, author, date, message] = line.split('|');
        return { hash, author, date, message };
      });

      const changedFiles = status.stdout.split('\n').filter(line => line);
      const hasUncommittedChanges = changedFiles.length > 0;

      return {
        branch: branch.stdout.trim(),
        commits,
        uncommittedChanges: hasUncommittedChanges,
        changedFilesCount: changedFiles.length,
        changedFiles: changedFiles.slice(0, 10),
        stats: stats.stdout.trim(),
      };
    } catch (error) {
      console.error('Error getting git info:', error);
      return null;
    }
  }

  async getFileMetrics() {
    try {
      const metrics = {
        totalFiles: 0,
        byExtension: {},
        totalLines: 0,
        components: 0,
        pages: 0,
      };

      await this.countFiles(this.projectPath, metrics);

      return metrics;
    } catch (error) {
      console.error('Error getting file metrics:', error);
      return null;
    }
  }

  async countFiles(dir, metrics) {
    try {
      const skipDirs = ['node_modules', '.git', '.next', 'dist', 'build', '.cache'];
      const dirName = dir.split('/').pop();
      if (skipDirs.includes(dirName)) {
        return;
      }

      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          await this.countFiles(fullPath, metrics);
        } else if (entry.isFile()) {
          metrics.totalFiles++;

          const ext = entry.name.split('.').pop();
          metrics.byExtension[ext] = (metrics.byExtension[ext] || 0) + 1;

          if (dir.includes('/components')) metrics.components++;
          if (dir.includes('/app') || dir.includes('/pages')) metrics.pages++;

          if (['js', 'jsx', 'ts', 'tsx', 'css'].includes(ext)) {
            try {
              const content = await readFile(fullPath, 'utf-8');
              metrics.totalLines += content.split('\n').length;
            } catch (error) {
              // Skip files we can't read
            }
          }
        }
      }
    } catch (error) {
      // Skip directories we can't access
    }
  }

  async getDependencyInfo() {
    try {
      const packageJsonPath = join(this.projectPath, 'package.json');
      const content = await readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(content);

      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});

      return {
        total: dependencies.length + devDependencies.length,
        dependencies: dependencies.length,
        devDependencies: devDependencies.length,
        name: packageJson.name,
        version: packageJson.version,
        scripts: Object.keys(packageJson.scripts || {}),
      };
    } catch (error) {
      console.error('Error getting dependency info:', error);
      return null;
    }
  }

  async getRecentActivity() {
    try {
      const { stdout: lastCommit } = await execAsync(
        'git log -1 --format="%ar|%an"',
        { cwd: this.projectPath }
      );

      const [lastCommitDate, lastCommitAuthor] = lastCommit.trim().split('|');

      const today = new Date().toISOString().split('T')[0];
      const { stdout: todayCommits } = await execAsync(
        `git log --since="${today}" --oneline | wc -l`,
        { cwd: this.projectPath }
      );

      const { stdout: weekCommits } = await execAsync(
        'git log --since="1 week ago" --oneline | wc -l',
        { cwd: this.projectPath }
      );

      return {
        lastCommitDate,
        lastCommitAuthor,
        commitsToday: parseInt(todayCommits.trim()),
        commitsThisWeek: parseInt(weekCommits.trim()),
      };
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return null;
    }
  }
}
