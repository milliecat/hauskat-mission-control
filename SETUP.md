# Intelligent Task Tracking Setup

This mission control app features **intelligent task tracking** that automatically detects when tasks are completed in the hauskat project.

## Quick Start

### 1. Both projects need to be set up:

**Mission Control (this repo):**
```bash
npm install
npm run electron:dev
```

**Hauskat project:**
- Must have `TASKS.md` with current sprint tasks
- Must have `CLAUDE.md` with commit conventions
- All commits must use `HK-###` task IDs

### 2. Directory Structure Expected:
```
~/Projects/
├── hauskat/              # Main project
│   ├── TASKS.md          # Current sprint tasks
│   └── CLAUDE.md         # Includes commit conventions
└── hauskat-mission-control/  # This app
    ├── electron/
    │   ├── taskMatcher.js       # Intelligence engine (to be added)
    │   ├── projectMonitor.js    # File watcher (to be added)
    │   └── main.js              # Electron main process
    └── src/
        └── MissionControl.jsx   # UI with Dev Sprint Board
```

## How It Works

1. **You commit in hauskat:**
   ```bash
   git commit -m "HK-005: add multiplayer zone system"
   ```

2. **Mission Control detects it:**
   - Monitors hauskat repo every 30 seconds
   - Analyzes commit messages for task IDs
   - Matches keywords from task descriptions
   - Analyzes modified files for patterns

3. **Task is auto-updated:**
   - Shows commit was detected
   - Links commit to task
   - Tracks acceptance criteria progress
   - Provides audit trail

## Integration Status

### ✅ Completed:
- Dev Sprint Board with task IDs (HK-001, HK-002, etc.)
- Live Project Status showing commits
- TASKS.md in hauskat with current sprint
- CLAUDE.md commit conventions
- Documentation and examples

### 🚧 To Be Added:
The following files need to be created in `/electron/`:

- `taskMatcher.js` - The intelligence engine that analyzes commits
- `projectMonitor.js` - File watcher with task matching integration

See `INTELLIGENT-TRACKING.md` for the full implementation guide.

## Configuration

### Change Hauskat Project Path:

Default: `~/Projects/hauskat`

To change:
```javascript
// In electron/main.js
const hauskatPath = '/your/custom/path';
```

Or set via the app (IPC handler exists):
```javascript
window.projectMonitor.setProjectPath('/your/custom/path');
```

## Testing

To test the task matching system:

```bash
# In hauskat project, make a commit
cd ~/Projects/hauskat
git commit -m "HK-010: add NextAuth configuration"

# Check Mission Control logs
# Should see: "Found 1 task matches in recent commits"
```

## Syncing Tasks

To keep `hauskat/TASKS.md` in sync with Mission Control:

1. Update tasks in Mission Control → Dev Sprint Board
2. Manually update `hauskat/TASKS.md` with new tasks
3. Commit: `git commit -m "docs: sync TASKS.md from Mission Control"`

Future enhancement: Automatic sync script

## Task ID Format

- Format: `HK-###` (uppercase HK, 3-digit zero-padded number)
- Examples: `HK-001`, `HK-015`, `HK-100`
- Used in: Commit messages, task board, acceptance criteria

## Troubleshooting

### Tasks not being detected?

1. Check hauskat path is correct: `~/Projects/hauskat`
2. Verify commit messages have task IDs: `HK-###:`
3. Check console logs in Mission Control for errors
4. Ensure `taskMatcher.js` and `projectMonitor.js` exist in `/electron/`

### AI not using task IDs?

1. Verify `hauskat/CLAUDE.md` has commit conventions section
2. Verify `hauskat/TASKS.md` exists and is up to date
3. Check that CLAUDE.md tells AI to check TASKS.md first

## Documentation

- `INTELLIGENT-TRACKING.md` - Full technical documentation
- `hauskat/TASKS.md` - Current sprint tasks
- `hauskat/CLAUDE.md` - AI instructions and conventions
- This file - Setup and integration guide

## Next Steps

To complete the intelligent tracking system:

1. Create `electron/taskMatcher.js` (see INTELLIGENT-TRACKING.md)
2. Create `electron/projectMonitor.js` with task integration
3. Test with real commits in hauskat
4. Add UI notifications for detected tasks
5. Build task completion dashboard view

---

For questions or issues, see `INTELLIGENT-TRACKING.md` or the main README.
