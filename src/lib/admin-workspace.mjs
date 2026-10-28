import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { adminProblem } from './admin-auth.mjs';

export const contentPath =
  /^src\/content\/(?:products\/[A-Za-z0-9][A-Za-z0-9_-]{0,159}\.json|articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.json|settings\/(?:taxonomy|seo-workspace)\.json)$/;
export const uploadPath = /^public\/images\/uploads\/[a-f0-9]{64}\.(?:png|jpg|jpeg|webp)$/;
export const rawJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
export const emptySeo = () => rawJson({ version: 1, knowledge: [], batches: [], tasks: [] });
export function writableWorkspace(document) {
  // The durable CAS below owns the lock. A running publication freezes the exact snapshot until recorded.
  if (document.publication?.status === 'preparing')
    throw adminProblem(409, '正在准备发布，请稍后再保存。');
}

/** Reuse the local validators/actions on an isolated scratch snapshot; /tmp is never persistent storage. */
export async function withWorkspace(document, imagePaths, callback) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'soltree-admin-'));
  try {
    for (const name of ['products', 'articles', 'settings'])
      await fs.mkdir(path.join(directory, 'src/content', name), { recursive: true });
    await fs.mkdir(path.join(directory, 'public/images'), { recursive: true });
    for (const [name, raw] of Object.entries(document.files)) {
      if (!contentPath.test(name) || typeof raw !== 'string')
        throw adminProblem(422, '云端内容格式无效。');
      await fs.writeFile(path.join(directory, name), raw);
    }
    for (const name of new Set([
      ...imagePaths,
      ...Object.keys(document.media || {}).map((name) => name.slice('public'.length)),
    ])) {
      if (!/^\/images\/(?:[\w .()-]+\/)*[\w .()-]+\.(?:png|jpe?g|webp|avif)$/i.test(name)) continue;
      const target = path.resolve(directory, 'public', `.${name}`);
      if (!target.startsWith(`${directory}${path.sep}public${path.sep}images${path.sep}`)) continue;
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, '');
    }
    return await callback(directory);
  } finally {
    // Only the mkdtemp result owned by this invocation is removed, never a request-supplied path.
    await fs.rm(directory, { recursive: true, force: true });
  }
}

export async function localHandler(handler, method, body, url = '') {
  const req = Readable.from(body === undefined ? [] : [Buffer.from(JSON.stringify(body))]);
  Object.assign(req, {
    method,
    url,
    headers: { host: 'localhost', origin: 'http://localhost', 'content-type': 'application/json' },
  });
  let status = 200;
  const headers = new Map();
  let finish;
  const output = new Promise((resolve) => {
    finish = resolve;
  });
  const res = {
    set statusCode(value) {
      status = value;
    },
    get statusCode() {
      return status;
    },
    setHeader(name, value) {
      headers.set(name.toLowerCase(), value);
    },
    end(value) {
      finish({ status, headers, value: JSON.parse(value) });
    },
  };
  await handler(req, res);
  return output;
}

export async function collectWorkspace(directory, previous) {
  const files = {};
  for (const folder of ['products', 'articles', 'settings']) {
    for (const filename of await fs.readdir(path.join(directory, 'src/content', folder))) {
      const name = `src/content/${folder}/${filename}`;
      if (contentPath.test(name))
        files[name] = await fs.readFile(path.join(directory, name), 'utf8');
    }
  }
  return { ...previous, files };
}
