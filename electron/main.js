import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { homedir } from 'os';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import { ProjectMonitor } from './projectMonitor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable hardware acceleration and WebGL on Linux
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-webgl');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('use-gl', 'desktop');
app.commandLine.appendSwitch('disable-gpu-sandbox');

// Initialize electron-store for persistent data
const store = new Store();

let mainWindow;
let projectMonitor;

// Configure auto-updater with verbose logging
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.logger = console;

// Log the feed URL being used
console.log('=== AUTO-UPDATER CONFIGURATION ===');
console.log('App version:', app.getVersion());
console.log('App is packaged:', app.isPackaged);
console.log('Platform:', process.platform);
console.log('Arch:', process.arch);

// Auto-updater event listeners with detailed logging
autoUpdater.on('checking-for-update', () => {
  console.log('=== CHECKING FOR UPDATES ===');
  console.log('Feed URL:', autoUpdater.getFeedURL());
});

autoUpdater.on('update-available', (info) => {
  console.log('=== UPDATE AVAILABLE ===');
  console.log('New version:', info.version);
  console.log('Release date:', info.releaseDate);
  console.log('Files:', info.files);

  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Available',
    message: `A new version (${info.version}) is available!\n\nCurrent: ${app.getVersion()}\nNew: ${info.version}`,
    buttons: ['Download Update', 'Later'],
    defaultId: 0,
    cancelId: 1
  }).then((result) => {
    if (result.response === 0) {
      console.log('User clicked Download Update');
      autoUpdater.downloadUpdate();
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Downloading Update',
        message: 'Update is being downloaded in the background. You\'ll be notified when it\'s ready.',
        buttons: ['OK']
      });
    } else {
      console.log('User clicked Later');
    }
  });
});

autoUpdater.on('update-not-available', (info) => {
  console.log('=== NO UPDATE AVAILABLE ===');
  console.log('Current version:', app.getVersion());
  console.log('Info:', info);

  // Show dialog when manually checking
  if (mainWindow && mainWindow.isFocused()) {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'No Updates',
      message: `You're on the latest version (${app.getVersion()})`,
      buttons: ['OK']
    });
  }
});

autoUpdater.on('error', (err) => {
  console.error('=== AUTO-UPDATER ERROR ===');
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  console.error('Full error:', err);

  dialog.showMessageBox(mainWindow, {
    type: 'error',
    title: 'Update Error',
    message: `Failed to check for updates:\n\n${err.message}`,
    buttons: ['OK']
  });
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log('=== DOWNLOAD PROGRESS ===');
  console.log(`Downloaded ${progressObj.percent.toFixed(2)}% (${progressObj.transferred}/${progressObj.total})`);
  console.log(`Speed: ${progressObj.bytesPerSecond} bytes/sec`);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('=== UPDATE DOWNLOADED ===');
  console.log('Version:', info.version);

  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Ready',
    message: `Version ${info.version} has been downloaded. Restart the application to apply the update.`,
    buttons: ['Restart Now', 'Later'],
    defaultId: 0,
    cancelId: 1
  }).then((result) => {
    if (result.response === 0) {
      console.log('Quitting and installing update');
      autoUpdater.quitAndInstall();
    }
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#1a1a2e',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webgl: true,
      acceleratedGraphics: true,
    },
    icon: join(__dirname, '../public/icon.svg'),
  });

  // Load the app
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }

  // Set up Mac menu
  const template = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Export Data',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('export-data');
          },
        },
        { type: 'separator' },
        { role: 'close' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Check for Updates',
          click: () => {
            if (app.isPackaged) {
              autoUpdater.checkForUpdates();
              dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Checking for Updates',
                message: 'Checking for updates...',
                buttons: ['OK']
              });
            } else {
              dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Development Mode',
                message: 'Auto-update is only available in production builds.',
                buttons: ['OK']
              });
            }
          },
        },
        { type: 'separator' },
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = await import('electron');
            await shell.openExternal('https://github.com/hauskat');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (projectMonitor) {
      projectMonitor.stop();
    }
  });
}

// Set up project monitoring
function setupProjectMonitor() {
  const hauskatPath = store.get('hauskatProjectPath', join(homedir(), 'Projects', 'hauskat'));

  console.log('Setting up project monitor for:', hauskatPath);

  projectMonitor = new ProjectMonitor(
    hauskatPath,
    (data) => {
      // Send project updates to renderer
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('project-update', data);
      }
    },
    (matches) => {
      // Send task matches to renderer for auto-completion
      if (mainWindow && !mainWindow.isDestroyed()) {
        console.log('Sending task matches to renderer:', matches);
        mainWindow.webContents.send('task-matches', matches);
      }
    }
  );

  projectMonitor.start();
}

// IPC handlers
ipcMain.handle('get-project-path', () => {
  return store.get('hauskatProjectPath', join(homedir(), 'Projects', 'hauskat'));
});

ipcMain.handle('set-project-path', async (event, path) => {
  store.set('hauskatProjectPath', path);

  // Restart monitor with new path
  if (projectMonitor) {
    projectMonitor.stop();
  }
  setupProjectMonitor();

  return true;
});

ipcMain.handle('refresh-project-data', async () => {
  if (projectMonitor) {
    await projectMonitor.fetchProjectData();
  }
});

ipcMain.handle('update-tasks', async (event, tasks) => {
  if (projectMonitor) {
    projectMonitor.setTasks(tasks);
  }
});

app.whenReady().then(() => {
  createWindow();

  // Set up project monitoring
  setupProjectMonitor();

  // Check for updates after app is ready (only in production)
  if (app.isPackaged) {
    // Check for updates on startup
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 3000); // Wait 3 seconds after startup

    // Check for updates every 4 hours
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 4 * 60 * 60 * 1000);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (projectMonitor) {
    projectMonitor.stop();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
