import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const uploadRoot = path.join(root, 'public/images/uploads');
const assetRoot = path.join(root, 'src/assets/uploads');

/** Copy uploaded raster originals to Astro's asset pipeline without changing source URLs. */
export async function syncMedia() {
  await fs.mkdir(uploadRoot, { recursive: true });
  async function copyFolder(relative = '') {
    for (const entry of await fs.readdir(path.join(uploadRoot, relative), {
      withFileTypes: true,
    })) {
      const name = path.join(relative, entry.name);
      if (entry.isDirectory()) await copyFolder(name);
      else if (entry.isFile() && /\.(png|jpe?g|webp|avif)$/i.test(entry.name)) {
        const source = path.join(uploadRoot, name);
        const target = path.join(assetRoot, name);
        const sourceStat = await fs.stat(source);
        const targetStat = await fs.stat(target).catch(() => null);
        if (targetStat?.size === sourceStat.size && targetStat.mtimeMs >= sourceStat.mtimeMs)
          continue;
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.copyFile(source, target);
      }
    }
  }
  await copyFolder();
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await syncMedia();
  console.log('Uploaded images are ready for Astro image optimization.');
}
