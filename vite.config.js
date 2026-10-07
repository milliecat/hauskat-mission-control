import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.js',
        vite: {
          build: {
            rolldownOptions: { external: ['electron-store', 'electron-updater', 'chokidar'] },
          },
        },
      },
      {
        entry: 'electron/preload.js',
        vite: {
          build: {
            lib: { formats: ['cjs'], fileName: () => 'preload.cjs' },
          },
        },
        onstart(options) {
          options.reload();
        },
      },
    ]),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
