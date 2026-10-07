import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { _electron as electron } from '@playwright/test';

const temporary = await mkdtemp(join(tmpdir(), 'mission-control-smoke-'));
let application;
try {
  const config = join(temporary, 'hauskat-mission-control');
  const project = join(temporary, 'fixture-project');
  await mkdir(config);
  await mkdir(project);
  await writeFile(join(config, 'config.json'), JSON.stringify({ hauskatProjectPath: project }));
  const env = { ...process.env, XDG_CONFIG_HOME: temporary };
  delete env.ELECTRON_RUN_AS_NODE;
  delete env.VITE_DEV_SERVER_URL;
  application = await electron.launch({ args: ['.'], env, timeout: 30000 });
  const page = await application.firstWindow();
  await page.waitForFunction(() => document.querySelector('#root')?.textContent.length > 100);
  assert.match(page.url(), /^file:/);
  const security = await page.evaluate(async () => ({
    node: typeof window.require,
    process: typeof window.process,
    bridge: typeof window.projectMonitor?.getProjectPath,
    project: await window.projectMonitor?.getProjectPath(),
  }));
  assert.deepEqual(security, { node: 'undefined', process: 'undefined', bridge: 'function', project });
  const preferences = await application.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].webContents.getLastWebPreferences());
  assert.equal(preferences.contextIsolation, true);
  assert.equal(preferences.nodeIntegration, false);
  assert.equal(preferences.sandbox, true);
  console.log('Electron loaded the built dashboard, isolated Node, and exposed the working project bridge.');
} finally {
  await application?.close();
  await rm(temporary, { recursive: true, force: true });
}
