import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = path.join(root, 'node_modules/decap-cms/dist');
const target = path.join(root, 'public/__admin');
await fs.mkdir(target, { recursive: true });
for (const entry of await fs.readdir(source, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    /(?:\.decap-cms\.js|^decap-cms\.js(?:\.LICENSE\.txt)?$|\.wasm|^cms\.css)$/.test(entry.name)
  )
    await fs.copyFile(path.join(source, entry.name), path.join(target, entry.name));
}
const images = path.join(root, 'public/images');
const names = (await fs.readdir(images, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map(
    (entry) =>
      '/images/' +
      path.relative(images, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'),
  );
await fs.writeFile(
  path.join(root, 'src/admin/image-index.json'),
  JSON.stringify(names.sort()) + '\n',
);
console.log('Admin browser assets and public image index prepared.');
