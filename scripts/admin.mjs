import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createConnection } from 'node:net';
import { syncMedia } from './sync-media.mjs';
import { backupContent } from './content-backup.mjs';
import './sync-admin-assets.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
await syncMedia();
await backupContent();
const children = [];
const watchers = [];
let timer;
const launch = (file, args = [], env = {}) => {
  const child = spawn(process.execPath, [file, ...args], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
    env: { ...process.env, ...env },
  });
  children.push(child);
  child.on('error', (error) => {
    console.error(error.message);
    process.exitCode = 1;
    stop();
  });
  return child;
};
const packageBin = (name) => {
  const packageFile = path.join(root, 'node_modules', name, 'package.json');
  const metadata = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  const bin = typeof metadata.bin === 'string' ? metadata.bin : Object.values(metadata.bin)[0];
  return path.resolve(path.dirname(packageFile), bin);
};
const proxy = launch(packageBin('decap-server'), [], {
  PORT: '8081',
  BIND_HOST: '127.0.0.1',
  ORIGIN: 'http://127.0.0.1:4323',
  MODE: 'fs',
});
proxy.on('exit', (code) => {
  if (code) {
    process.exitCode = code;
    stop();
  }
});

const siteIsRunning = await new Promise((resolve) => {
  const socket = createConnection({ host: '127.0.0.1', port: 4323 });
  socket.on('connect', () => {
    socket.destroy();
    resolve(true);
  });
  socket.on('error', () => resolve(false));
  socket.setTimeout(1500, () => {
    socket.destroy();
    resolve(false);
  });
});
if (!siteIsRunning) launch(packageBin('astro'), ['dev', '--host', '127.0.0.1', '--port', '4323']);

let pending = Promise.resolve();
watchers.push(
  ...['src/content', 'public/images/uploads'].map((folder) =>
    fs.watch(path.join(root, folder), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        pending = pending
          .then(async () => {
            await syncMedia();
            await backupContent();
          })
          .catch((error) => console.error('Content backup/image sync failed:', error.message));
      }, 1200);
    }),
  ),
);
function stop() {
  clearTimeout(timer);
  for (const watcher of watchers) watcher.close();
  for (const child of children) child.kill();
}
process.on('SIGINT', () => {
  stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  stop();
  process.exit(0);
});
console.log(
  '\nSoltree content admin: http://127.0.0.1:4323/admin\nLocal saves update this computer only. Content is backed up after edits.\n',
);
