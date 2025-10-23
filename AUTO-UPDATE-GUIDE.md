# Auto-Update Guide for Hauskat Mission Control

## Overview

The Hauskat Mission Control app now has automatic update functionality built-in using `electron-updater`. The app will automatically check for updates from GitHub Releases and prompt you to download and install them.

## How Auto-Update Works

### For Users

1. **Automatic Checks**: The app checks for updates:
   - 3 seconds after startup
   - Every 4 hours while the app is running

2. **Manual Check**: You can manually check for updates:
   - Go to `Help` → `Check for Updates`

3. **Update Flow**:
   - When an update is available, you'll see a dialog
   - Click "Download Update" to download in the background
   - Once downloaded, you'll be prompted to restart
   - Click "Restart Now" to apply the update

### For Developers

## Creating a New Release

To push a new version of the app that users will auto-update to:

### Step 1: Update Version Number

Edit `package.json` and increment the version number:

```json
{
  "version": "4.6.0"  // Increment from 4.5.0
}
```

Use semantic versioning:
- **Major** (5.0.0): Breaking changes
- **Minor** (4.6.0): New features, backward compatible
- **Patch** (4.5.1): Bug fixes

### Step 2: Commit Your Changes

```bash
git add .
git commit -m "Release v4.6.0: Add new features"
git push origin main
```

### Step 3: Build the App

Build the production version:

```bash
npm run electron:build
```

This creates:
- `release/Hauskat Mission Control-4.6.0-arm64.dmg`
- `release/Hauskat Mission Control-4.6.0-x64.dmg`
- `release/Hauskat Mission Control-4.6.0-arm64-mac.zip`
- `release/Hauskat Mission Control-4.6.0-x64-mac.zip`

### Step 4: Create GitHub Release

#### Option A: Using GitHub CLI (Recommended)

```bash
# Create a tag
git tag v4.6.0
git push origin v4.6.0

# Create release and upload files
gh release create v4.6.0 \
  --title "Version 4.6.0" \
  --notes "Release notes here" \
  release/*.dmg \
  release/*.zip
```

#### Option B: Using GitHub Web Interface

1. Go to https://github.com/milliecat/hauskat-mission-control/releases
2. Click "Draft a new release"
3. Create a new tag: `v4.6.0` (must match package.json version)
4. Release title: `Version 4.6.0`
5. Description: Add release notes (what changed)
6. Upload the `.dmg` and `.zip` files from the `release/` folder
7. Click "Publish release"

### Step 5: Users Get Auto-Updated

Once the GitHub release is published:
- Apps will detect the new version within 4 hours (or on next restart)
- Users will be prompted to download and install

## Important Notes

### File Requirements

For auto-update to work, you **MUST** upload these files to GitHub Releases:
- `Hauskat Mission Control-{version}-arm64-mac.zip` (for Apple Silicon Macs)
- `Hauskat Mission Control-{version}-x64-mac.zip` (for Intel Macs)
- DMG files are optional (for manual installation)

The `.zip` files are what electron-updater uses for updates.

### Version Format

- Tag format: `v4.6.0` (with 'v' prefix)
- package.json: `"version": "4.6.0"` (no 'v' prefix)

### Testing Updates

To test the update functionality:

1. Build and install the current version
2. Increment version in package.json
3. Build again and create a GitHub release
4. Open the installed app
5. Go to Help → Check for Updates
6. It should detect and offer the new version

### Troubleshooting

**"No updates available" when there should be:**
- Check that the GitHub release is published (not draft)
- Verify version number in package.json < release version
- Check that .zip files are attached to the release
- Look at console logs: `Help` → `Toggle Developer Tools`

**Update fails to download:**
- Check internet connection
- Verify GitHub release is public
- Check console for errors

**Update downloads but doesn't install:**
- Close all instances of the app
- Try "Restart Now" again
- Check macOS security settings

## Auto-Update Configuration

The auto-update is configured in:

- **electron/main.js**: Update checking logic and dialogs
- **electron-builder.json**: GitHub publish configuration
- **package.json**: Version number and dependencies

### Changing Update Frequency

To change how often the app checks for updates, edit `electron/main.js`:

```javascript
// Check every 4 hours (default)
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 4 * 60 * 60 * 1000);

// Change to 1 hour:
// 1 * 60 * 60 * 1000

// Change to 24 hours:
// 24 * 60 * 60 * 1000
```

### Disabling Auto-Update

To disable automatic checking (users can still check manually):

Comment out the automatic check in `electron/main.js`:

```javascript
// if (app.isPackaged) {
//   setTimeout(() => {
//     autoUpdater.checkForUpdates();
//   }, 3000);
// }
```

## Quick Release Checklist

- [ ] Update version in `package.json`
- [ ] Commit and push changes
- [ ] Run `npm run electron:build`
- [ ] Create git tag: `git tag v4.6.0 && git push origin v4.6.0`
- [ ] Create GitHub release with `.zip` files
- [ ] Test update on installed app
- [ ] Verify users receive update prompt

## Support

For issues with auto-update:
- Check the [electron-updater documentation](https://www.electron.build/auto-update)
- Review console logs in the app
- Check GitHub releases page
