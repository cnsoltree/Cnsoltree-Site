import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../.vercel/output/static/', import.meta.url));
async function files(directory, relative = '') {
  const result = [];
  for (const entry of await fs.readdir(path.join(directory, relative), { withFileTypes: true })) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) result.push(...(await files(directory, name)));
    else if (entry.isFile()) result.push(name.replaceAll('\\', '/'));
  }
  return result;
}

const names = await files(root);
// A Set of actual directory entries enforces Linux casing even when this check runs on Windows.
const exactPaths = new Set(names);
const pages = names.filter((name) => name.endsWith('.html'));
assert(pages.length, 'Build the site before running the emitted-image check.');
let checked = 0;
const missing = [];
for (const page of pages) {
  const html = await fs.readFile(path.join(root, page), 'utf8');
  for (const [, , source] of html.matchAll(/<img\b[^>]*\ssrc=(["'])(.*?)\1/gi)) {
    if (!source.startsWith('/') || source.startsWith('//')) continue;
    const filename = decodeURIComponent(source.replaceAll('&amp;', '&').split(/[?#]/)[0]).slice(1);
    checked += 1;
    if (!exactPaths.has(filename)) missing.push({ page, source });
  }
}
assert.equal(
  missing.length,
  0,
  `Built images are missing or have the wrong casing:\n${JSON.stringify(missing, null, 2)}`,
);
console.log(
  `PASS: ${checked} local image references across ${pages.length} HTML files resolve with exact casing.`,
);
