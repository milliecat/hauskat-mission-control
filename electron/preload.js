import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Expose methods as needed
  onExportData: (callback) => ipcRenderer.on('export-data', callback),
  removeExportDataListener: () => ipcRenderer.removeAllListeners('export-data'),
});

window.addEventListener('DOMContentLoaded', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Hauskat Mission Control - Electron Preload Script Loaded');
  }
});
