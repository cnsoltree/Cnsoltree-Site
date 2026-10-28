import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function backupContent() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const target = path.join(root, '.content-backups', stamp);
  await fs.mkdir(target, { recursive: true });
  for (const folder of ['src/content', 'public/images/uploads']) {
    const source = path.join(root, folder);
    if (await fs.stat(source).catch(() => null))
      await fs.cp(source, path.join(target, folder), {
        recursive: true,
        filter: async (file) => !(await fs.lstat(file)).isSymbolicLink(),
      });
  }
  return target;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  console.log(`Content backup saved: ${await backupContent()}`);
