# Hauskat Mission Control v4.5 - Native Mac Application

A beautiful native macOS application for managing your Hauskat project development lifecycle, built with Electron, React, and Tailwind CSS.

## Features

- **Native Mac Application**: Runs as a standalone Mac app with proper window chrome and menu bar
- **17 Comprehensive Sections**: From overview to dev sprints, covering all aspects of the project
- **State Persistence**: Automatically saves your progress, checkbox states, and active sections
- **Beautiful UI**: Purple/pink gradient theme with smooth animations
- **Responsive Design**: Resizable window with minimum size constraints
- **Keyboard Shortcuts**: Quick navigation and actions
- **Search Functionality**: Find what you need quickly across all sections

## Project Structure

```
hauskat-mission-control/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # App wrapper
│   ├── MissionControl.jsx  # Main component (v4.5)
│   └── index.css        # Global styles + Tailwind
├── public/
│   └── icon.svg         # App icon (SVG)
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── electron-builder.json # Electron packaging config
```

## Prerequisites

- **Node.js** 18+ (recommended: use latest LTS)
- **npm** or **yarn**
- **macOS** (for building the .app file)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install:
   - Electron for native app wrapper
   - React 18+ for UI
   - Vite for fast development and bundling
   - Tailwind CSS for styling
   - lucide-react for icons
   - electron-store for state persistence
   - electron-builder for packaging

## Development

### Run in Development Mode

```bash
npm run electron:dev
```

This will:
- Start the Vite dev server on http://localhost:5173
- Launch Electron with hot reload enabled
- Open DevTools automatically for debugging

**Note**: The app will automatically reload when you make changes to the code.

### Development Tips

- **State is persisted**: Your checkbox progress is saved in localStorage automatically
- **DevTools are enabled**: Press `Cmd+Option+I` or use View > Toggle DevTools
- **Hot reload works**: Edit components and see changes instantly
- **Mac menu is active**: Use standard Mac shortcuts (Cmd+Q to quit, etc.)

## Building for Production

### Build the Application

```bash
npm run build
```

This will:
- Build the React app with Vite (optimized for production)
- Create the `dist/` folder with bundled assets
- Create the `dist-electron/` folder with Electron files

### Package as Mac Application

```bash
npm run package
```

This will:
- Build the production version
- Package it as a native Mac .app file
- Create both `.dmg` installer and `.zip` archive
- Output to the `release/` folder
- Build for both Intel (x64) and Apple Silicon (arm64)

**Output files**:
- `release/Hauskat Mission Control-{version}.dmg` - Installer
- `release/Hauskat Mission Control-{version}-mac.zip` - Portable archive
- `release/mac/Hauskat Mission Control.app` - The actual app

### Install the App

After packaging:

1. **From DMG**:
   - Double-click the `.dmg` file in `release/`
   - Drag "Hauskat Mission Control" to the Applications folder
   - Eject the DMG
   - Launch from Applications

2. **From ZIP**:
   - Extract the `.zip` file
   - Move "Hauskat Mission Control.app" to Applications
   - Launch from Applications

## Icon Customization

The app currently uses a custom SVG icon (`public/icon.svg`) with a purple/pink gradient cat theme.

### To use a custom PNG icon:

1. Create a 512x512 PNG image
2. Save it as `public/icon.png`
3. The build process will use it automatically

### To convert the SVG to PNG:

```bash
# Using imagemagick (install via: brew install imagemagick)
convert -density 300 -background none public/icon.svg -resize 512x512 public/icon.png

# Or use online tools like:
# https://cloudconvert.com/svg-to-png
```

## State Persistence

The app automatically saves:
- **Completed items** (checkboxes)
- **Active section** (which section you're viewing)
- **Sidebar state** (open/closed)
- **Active phase** (planning, week 1-12, or launched)

Data is stored in localStorage and persists across app restarts.

### Clear Saved Data

To reset all progress:
1. Open DevTools (Cmd+Option+I)
2. Go to Console
3. Run: `localStorage.clear()`
4. Reload the app (Cmd+R)

## Menu Bar Features

The app includes a full macOS menu bar:

### File Menu
- **Export Data** (Cmd+E): Export your progress (feature to be implemented)
- **Close** (Cmd+W): Close the window

### Edit Menu
- Standard edit operations (Undo, Redo, Cut, Copy, Paste, Select All)

### View Menu
- **Reload** (Cmd+R)
- **Toggle DevTools** (Cmd+Option+I)
- **Zoom In/Out/Reset**
- **Toggle Fullscreen**

### Window Menu
- **Minimize**
- **Zoom**
- **Bring All to Front**

## Troubleshooting

### App won't start in development mode

```bash
# Make sure Vite dev server is running
npm run dev

# In another terminal, start Electron
npm run electron:dev
```

### Build fails

```bash
# Clean build artifacts
rm -rf dist dist-electron release node_modules

# Reinstall dependencies
npm install

# Try building again
npm run build
```

### Icon doesn't show

Make sure you have either:
- `public/icon.png` (preferred for electron-builder)
- `public/icon.svg` (fallback)

The icon should be at least 512x512 pixels for best results.

### State not persisting

Check browser console for localStorage errors. Make sure the app has permission to write to localStorage.

### macOS says app is damaged or from unidentified developer

This happens with unsigned apps. To open:

1. Right-click the app
2. Select "Open"
3. Click "Open" in the dialog
4. Or in System Settings: Privacy & Security > Allow app to run

To properly sign the app, you'll need an Apple Developer account and code signing certificate.

## Keyboard Shortcuts (Planned)

These shortcuts are planned for future implementation:

- `Cmd+1` to `Cmd+9`: Switch between sections
- `Cmd+F`: Focus search
- `Cmd+B`: Toggle sidebar
- `Cmd+K`: Quick navigation menu

## Technologies Used

- **Electron 28**: Native Mac app wrapper
- **React 18**: UI framework
- **Vite 5**: Build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **lucide-react**: Beautiful icon library
- **electron-store**: Persistent data storage
- **electron-builder**: Packaging and distribution

## Development Workflow

1. **Start development**: `npm run electron:dev`
2. **Make changes**: Edit files in `src/`
3. **See changes**: App auto-reloads
4. **Test thoroughly**: Check all sections and features
5. **Build for production**: `npm run build`
6. **Package the app**: `npm run package`
7. **Test the .app**: Install and test from `release/`
8. **Distribute**: Share the `.dmg` or `.zip` file

## File Sizes

- Development: ~250MB (with node_modules)
- Built .app: ~150MB (unpacked)
- .dmg installer: ~75MB
- .zip archive: ~70MB

## License

MIT

## Support

For issues or questions:
- Check the console for errors (DevTools)
- Review this README
- Check the Electron and React documentation

## Credits

Built with love for the Hauskat project.
- Component: Hauskat Mission Control v4.5
- Icon: Custom cat gradient theme
- Architecture: Electron + React + Vite

---

**Happy Mission Controlling!**
