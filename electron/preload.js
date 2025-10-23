// Preload script for Electron
// This file runs before the web page loads and has access to both DOM APIs and Node.js
import { ipcRenderer } from 'electron';

// Expose project monitoring APIs to renderer
window.projectMonitor = {
  onUpdate: (callback) => {
    ipcRenderer.on('project-update', (event, data) => callback(data));
  },
  onTaskMatches: (callback) => {
    ipcRenderer.on('task-matches', (event, matches) => callback(matches));
  },
  getProjectPath: () => ipcRenderer.invoke('get-project-path'),
  setProjectPath: (path) => ipcRenderer.invoke('set-project-path', path),
  refreshData: () => ipcRenderer.invoke('refresh-project-data'),
  updateTasks: (tasks) => ipcRenderer.invoke('update-tasks', tasks),
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('Hauskat Mission Control - Electron Preload Script Loaded');
});
