import taxonomy from '../content/settings/taxonomy.json?raw';
import { gitBlobSha } from './admin-publish.mjs';

const records = import.meta.glob(['../content/products/*.json', '../content/articles/*.json'], {
  eager: true,
  query: '?raw',
  import: 'default',
});
export function adminSeed() {
  const files: Record<string, string> = { 'src/content/settings/taxonomy.json': taxonomy };
  for (const [name, raw] of Object.entries(records))
    files[`src/content/${name.slice('../content/'.length)}`] = raw as string;
  const sourceManifest = Object.fromEntries(
    Object.entries(files).map(([name, raw]) => [name, gitBlobSha(raw)]),
  );
  return { version: 1, files, media: {}, publication: null, sourceManifest };
}
