#!/usr/bin/env node
/**
 * Sync tasks from Mission Control to hauskat/TASKS.md
 * Run this after updating tasks in the Dev Sprint Board
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

async function syncTasks() {
  const hauskatPath = join(homedir(), 'Projects', 'hauskat');

  console.log('🔄 Syncing tasks to hauskat/TASKS.md...\n');

  // TODO: Extract tasks from MissionControl.jsx
  // For now, this is a manual process. In the future, you could:
  // 1. Store tasks in a JSON file
  // 2. Parse MissionControl.jsx to extract task data
  // 3. Use Mission Control's localStorage data

  console.log('📝 Manual sync required:');
  console.log('   1. Open Mission Control → Dev Sprint Board');
  console.log('   2. Copy task details');
  console.log('   3. Update hauskat/TASKS.md manually');
  console.log('   4. Commit: "docs: sync TASKS.md from Mission Control"');
  console.log('\n💡 Or use this as a reminder to keep TASKS.md updated!');
}

syncTasks();
