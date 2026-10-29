import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = path.join(root, 'node_modules/decap-cms/dist');
const target = path.join(root, 'public/__admin');
// Decap 3.17.3 has no public history hook; keep the Router/editor singleton intact.
const historyMarker = 'return E}();function Pv(e){return Ov.push(`/collections/${e}`)}';
const exposedHistory =
  'return E}();window.__SOLTREE_CMS_HISTORY__=Ov;function Pv(e){return Ov.push(`/collections/${e}`)}';
await fs.mkdir(target, { recursive: true });
for (const entry of await fs.readdir(source, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    /(?:\.decap-cms\.js|^decap-cms\.js(?:\.LICENSE\.txt)?$|\.wasm|^cms\.css)$/.test(entry.name)
  ) {
    if (entry.name === 'decap-cms.js') {
      const bundle = await fs.readFile(path.join(source, entry.name), 'utf8');
      if (bundle.split(historyMarker).length !== 2)
        throw new Error(
          'Decap history hook changed; review the pinned editor bundle before updating.',
        );
      await fs.writeFile(
        path.join(target, entry.name),
        bundle.replace(historyMarker, exposedHistory),
      );
    } else await fs.copyFile(path.join(source, entry.name), path.join(target, entry.name));
  }
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
