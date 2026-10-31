import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createAdminStore } from '../src/lib/admin-store.mjs';
import { createAdminMedia } from '../src/lib/admin-media.mjs';
import { cloudProxy } from '../src/lib/admin-proxy.mjs';
import { rawJson, writableWorkspace } from '../src/lib/admin-workspace.mjs';
import { manifestFromFiles } from '../src/lib/admin-publish.mjs';
import { validateTaxonomy } from '../src/lib/taxonomy-model.mjs';

const recordPath =
  /^src\/content\/(products\/[A-Za-z0-9][A-Za-z0-9_-]{0,159}\.json|articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.json)$/;
const taxonomyPath = 'src/content/settings/taxonomy.json';
const managed = (name) => recordPath.test(name) || name === taxonomyPath;
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const canonical = (value) =>
  JSON.stringify(value, (_key, item) =>
    object(item)
      ? Object.fromEntries(
          Object.keys(item)
            .sort()
            .map((key) => [key, item[key]]),
        )
      : item,
  );
const equal = (a, b) => canonical(a) === canonical(b);
const digest = (raw) => createHash('sha256').update(raw).digest('hex');

/** Objects merge by field; arrays and article bodies remain atomic, never guessed or concatenated. */
export function mergeValue(base, local, remote, at, conflicts) {
  if (equal(local, remote) || equal(remote, base)) return local;
  if (equal(local, base)) return remote;
  if (object(local) && object(remote) && (base === undefined || object(base))) {
    const result = Object.create(null);
    for (const key of new Set([
      ...Object.keys(base || {}),
      ...Object.keys(local),
      ...Object.keys(remote),
    ])) {
      const value = mergeValue(base?.[key], local[key], remote[key], `${at}.${key}`, conflicts);
      if (value !== undefined) result[key] = value;
    }
    return result;
  }
  conflicts.push(at);
  return remote;
}

export function mergeFiles(base, local, remote) {
  const files = {};
  const conflicts = [];
  for (const name of new Set([
    ...Object.keys(base),
    ...Object.keys(local),
    ...Object.keys(remote),
  ])) {
    if (!managed(name)) continue;
    const parse = (files) => (files[name] === undefined ? undefined : JSON.parse(files[name]));
    const value = mergeValue(parse(base), parse(local), parse(remote), name, conflicts);
    if (value === undefined && (base[name] !== undefined || remote[name] !== undefined)) {
      conflicts.push(`${name}（不支持直接删文件，请在后台下架或移入回收站）`);
    } else if (value !== undefined) files[name] = rawJson(value);
  }
  return { files, conflicts };
}

function failConflicts(conflicts) {
  if (conflicts.length)
    throw new Error(`同步已停止，以下位置存在冲突，未覆盖内容：\n${conflicts.join('\n')}`);
}

export async function prepareCloudBatch(
  current,
  files,
  validateRecord,
  existingPublished = new Set(),
) {
  writableWorkspace(current.document);
  let document = structuredClone(current.document);
  if (files[taxonomyPath]) {
    validateTaxonomy(JSON.parse(files[taxonomyPath]));
    document.files[taxonomyPath] = files[taxonomyPath];
  }
  const changed = Object.keys(files).filter(
    (name) =>
      recordPath.test(name) &&
      !equal(
        JSON.parse(files[name]),
        document.files[name] === undefined ? undefined : JSON.parse(document.files[name]),
      ),
  );
  // A batch preserves publication/route/retirement state. Publish and deletion remain explicit backend actions.
  for (const name of changed) {
    const before = document.files[name];
    const record = JSON.parse(files[name]);
    if (before !== undefined) {
      const old = JSON.parse(before);
      for (const key of ['id', 'slug', 'published', 'deletedAt'])
        if (!equal(old[key], record[key]))
          throw new Error(`${name}：同步不能改变 ${key}，请在后台操作。`);
      if (old.deletedAt) throw new Error(`${name}：回收站内容请先在后台恢复。`);
    } else if (
      (record.published !== false && !(existingPublished.has(name) && record.published === true)) ||
      record.deletedAt
    ) {
      throw new Error(`${name}：本地新建内容只能作为草稿同步。`);
    }
    const collection = name.split('/')[2];
    const result = await cloudProxy(
      {
        action: 'persistEntry',
        params: {
          dataFiles: [{ path: name, raw: files[name] }],
          assets: [],
          expected: { [name]: before === undefined ? null : digest(before) },
          options: { collectionName: collection },
        },
      },
      document,
      { validateRecord },
    );
    document = result.document;
  }
  // Git taxonomy updates must not invalidate a cloud-only draft or an unchanged product.
  for (const [name, raw] of Object.entries(document.files))
    if (recordPath.test(name) && !JSON.parse(raw).deletedAt)
      await validateRecord(name.split('/')[2], JSON.parse(raw), document);
  return { document, changed };
}

async function gitSnapshot(root, sourceManifest) {
  const git = (args, input) =>
    execFileSync(
      'git',
      ['-c', `safe.directory=${root.split(path.sep).join('/')}`, '-C', root, ...args],
      {
        encoding: 'utf8',
        maxBuffer: 40 * 1024 * 1024,
        stdio: ['pipe', 'pipe', 'pipe'],
        input,
        timeout: 30_000,
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      },
    );
  try {
    git(['fetch', '--quiet', 'origin', 'main']);
  } catch {
    throw new Error('无法读取 GitHub 最新版本，请检查网络；没有执行同步。');
  }
  const entries = [];
  for (const line of git(['ls-tree', '-r', 'origin/main', '--', 'src/content'])
    .trim()
    .split('\n')) {
    const match = /^(\d+) blob ([a-f0-9]{40})\t(.+)$/.exec(line);
    if (!match || !managed(match[3])) continue;
    if (match[1] !== '100644') throw new Error('公开内容包含非普通文件，请先检查仓库。');
    entries.push({ name: match[3], sha: match[2] });
  }
  const source = [];
  for (const [name, sha] of Object.entries(sourceManifest)) {
    if (!managed(name) || sha === null) continue;
    if (!/^[a-f0-9]{40}$/i.test(sha)) throw new Error('云端公开来源版本无效，请先联系维护人员。');
    source.push({ name, sha });
  }
  // Read all old/current Git blobs in one process; per-file Git startup is slow on Windows.
  const ids = [...new Set([...entries, ...source].map((item) => item.sha))];
  const bytes = Buffer.from(git(['cat-file', '--batch'], `${ids.join('\n')}\n`), 'utf8');
  const blobs = new Map();
  let offset = 0;
  for (const sha of ids) {
    const newline = bytes.indexOf(10, offset);
    const header = bytes.subarray(offset, newline).toString('utf8');
    const match = /^([a-f0-9]{40}) blob (\d+)$/.exec(header);
    if (!match || match[1] !== sha) throw new Error('找不到共同来源版本，不能安全同步。');
    offset = newline + 1;
    const size = Number(match[2]);
    blobs.set(sha, bytes.subarray(offset, offset + size).toString('utf8'));
    offset += size + 1;
  }
  const latest = Object.fromEntries(entries.map(({ name, sha }) => [name, blobs.get(sha)]));
  const base = Object.fromEntries(source.map(({ name, sha }) => [name, blobs.get(sha)]));
  return {
    base,
    latest,
    manifest: Object.fromEntries(manifestFromFiles(new Map(Object.entries(latest)))),
  };
}

async function safeTarget(directory, name) {
  let cursor = path.resolve(directory);
  const target = path.resolve(directory, name);
  if (target !== cursor && !target.startsWith(`${cursor}${path.sep}`))
    throw new Error('同步路径超出工作目录。');
  for (const part of ['', ...name.split('/').filter(Boolean)]) {
    if (part) cursor = path.join(cursor, part);
    const info = await fs.lstat(cursor).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (info?.isSymbolicLink()) throw new Error('同步目录不能包含符号链接。');
  }
  return target;
}

async function readFiles(directory) {
  const result = {};
  for (const folder of ['products', 'articles', 'settings']) {
    const target = await safeTarget(directory, `src/content/${folder}`);
    for (const entry of await fs.readdir(target, { withFileTypes: true }).catch((error) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    })) {
      const name = `src/content/${folder}/${entry.name}`;
      if (!managed(name)) continue;
      if (!entry.isFile()) throw new Error('同步目录只接受普通 JSON 文件。');
      result[name] = await fs.readFile(path.join(directory, name), 'utf8');
    }
  }
  return result;
}

async function writeFile(directory, name, raw) {
  if (!managed(name) && !['state.json', 'cloud-before.json', '.gitignore'].includes(name))
    throw new Error('同步路径无效。');
  const target = await safeTarget(directory, name);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, raw, { flag: 'w' });
}

export async function runSync({
  root,
  mode,
  apply = false,
  store,
  media,
  validateRecord,
  snapshot = gitSnapshot,
}) {
  if (!['pull', 'push'].includes(mode)) throw new Error('使用 pull 或 push。');
  // Keep drafts outside the public repository, including outside Vercel dependency tracing.
  const directory = path.join(path.dirname(root), `${path.basename(root)}-content`);
  const current = await store.load();
  if (!current) throw new Error('云端内容工作区不存在，请先在后台完成初始化。');
  writableWorkspace(current.document);
  const git = await snapshot(root, current.document.sourceManifest);
  const upstream = mergeFiles(git.base, git.latest, current.document.files);
  failConflicts(upstream.conflicts);
  const local = await readFiles(directory);
  let state;
  try {
    state = JSON.parse(await fs.readFile(await safeTarget(directory, 'state.json'), 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (state && (state.version !== 1 || state.project !== root || !object(state.base)))
    throw new Error('本地同步基线无效，请检查 state.json。');
  if (!state && Object.keys(local).length)
    throw new Error('本地已有内容但缺少同步基线，已停止，避免覆盖。');
  if (mode === 'push' && !state) throw new Error('请先执行 content:pull -- --apply 建立共同版本。');
  if (
    state &&
    local[taxonomyPath] !== undefined &&
    !equal(JSON.parse(local[taxonomyPath]), JSON.parse(state.base[taxonomyPath]))
  )
    throw new Error('分类配置是只读参考，请在云端分组管理中修改后重新同步。');
  const plan = mergeFiles(state?.base || {}, local, upstream.files);
  failConflicts(plan.conflicts);
  const changed = Object.keys(plan.files).filter(
    (name) =>
      !equal(
        JSON.parse(plan.files[name]),
        (mode === 'pull' ? local : current.document.files)[name] === undefined
          ? undefined
          : JSON.parse((mode === 'pull' ? local : current.document.files)[name]),
      ),
  );
  const report = {
    mode,
    apply,
    directory,
    revision: current.revision,
    changed,
    sourceChanged: !equal(current.document.sourceManifest, git.manifest),
  };
  const existingPublished = new Set(
    Object.entries(git.latest)
      .filter(([name, raw]) => recordPath.test(name) && JSON.parse(raw).published === true)
      .map(([name]) => name),
  );
  const batch =
    mode === 'push'
      ? await prepareCloudBatch(current, plan.files, validateRecord, existingPublished)
      : null;
  if (!apply) return report;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = await safeTarget(directory, `backups/${stamp}`);
  const assertLocalUnchanged = async () => {
    if (!equal(await readFiles(directory), local))
      throw new Error('本地内容刚刚变更，已停止，请重新预览。');
  };
  await assertLocalUnchanged();
  for (const [name, raw] of Object.entries(local)) await writeFile(backup, name, raw);
  if (state) await writeFile(backup, 'state.json', rawJson(state));
  if (mode === 'push') {
    batch.document.sourceManifest = git.manifest;
    // A source update is reconciliation, not a new publication or deployment.
    if (changed.length || report.sourceChanged) {
      await writeFile(backup, 'cloud-before.json', rawJson(current));
      const latestGit = await snapshot(root, current.document.sourceManifest);
      if (!equal(latestGit.manifest, git.manifest))
        throw new Error('GitHub 内容刚刚变更，已停止，请重新预览。');
      await assertLocalUnchanged();
      const saved = await store.save(current.revision, batch.document);
      current.revision = saved.revision;
      current.document = saved.document;
    }
    plan.files = Object.fromEntries(
      Object.entries(current.document.files).filter(([name]) => managed(name)),
    );
    upstream.files = plan.files;
  }
  // Download and verify cloud uploads before updating the mirror/baseline.
  for (const [name, metadata] of Object.entries(current.document.media || {})) {
    const target = await safeTarget(directory, name);
    const bytes = await fs.readFile(target).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (bytes) {
      if (digest(bytes) === path.basename(name).split('.')[0]) continue;
      throw new Error(`${name}：本地图片已改变，已停止，未覆盖图片。`);
    }
    const image = await media.read(name, metadata);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, image.bytes);
  }
  await assertLocalUnchanged();
  await writeFile(directory, '.gitignore', '*\n');
  for (const [name, raw] of Object.entries(plan.files)) await writeFile(directory, name, raw);
  await writeFile(
    directory,
    'state.json',
    rawJson({ version: 1, project: root, revision: current.revision, base: upstream.files }),
  );
  return { ...report, revision: current.revision, backup };
}

async function main() {
  const root = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\/]$/, '');
  const args = process.argv.slice(2);
  if (
    args.some((arg) => !['pull', 'push', '--apply'].includes(arg)) ||
    args.filter((arg) => ['pull', 'push'].includes(arg)).length !== 1
  )
    throw new Error('用法：npm run content:pull 或 content:push；添加 -- --apply 才会写入。');
  try {
    process.loadEnvFile(path.join(root, '.env.local'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const config = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
  // Vite loads the same TypeScript content and image validators as the online editor.
  const { createServer } = await import('vite');
  const server = await createServer({
    configFile: false,
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });
  try {
    const { validateCloudRecord } = await server.ssrLoadModule('/src/lib/admin-validation.ts');
    const report = await runSync({
      root,
      mode: args[0],
      apply: args.includes('--apply'),
      store: createAdminStore(config),
      media: createAdminMedia(config),
      validateRecord: validateCloudRecord,
    });
    console.log(JSON.stringify(report, null, 2));
    console.log(
      report.apply ? '同步完成；没有发布网站。' : '仅预览，未写入。确认后添加 -- --apply。',
    );
  } finally {
    await server.close();
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
