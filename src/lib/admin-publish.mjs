import { createHash } from 'node:crypto';
import { validateTaxonomy } from './taxonomy-model.mjs';

const shaPattern = /^[a-f0-9]{40}$/i;
const jsonPath =
  /^src\/content\/(products\/[A-Za-z0-9][A-Za-z0-9_-]{0,159}\.json|articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.json|settings\/taxonomy\.json)$/;
const assetPath =
  /^public\/images\/uploads\/[A-Za-z0-9][A-Za-z0-9_.-]{0,190}\.(?:jpe?g|png|webp)$/i;
const productFields = new Set([
  'id',
  'name',
  'slug',
  'categorySlug',
  'categoryName',
  'additionalCategorySlugs',
  'productTypes',
  'published',
  'sortOrder',
  'createdAt',
  'updatedAt',
  'shortDescription',
  'description',
  'features',
  'specs',
  'image',
  'images',
  'descriptionImages',
  'badge',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'imageAlts',
]);
const articleFields = new Set([
  'published',
  'sortOrder',
  'slug',
  'title',
  'excerpt',
  'content',
  'date',
  'dateModified',
  'author',
  'image',
  'tags',
  'readingTime',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'relatedCategorySlug',
  'relatedProductTypes',
]);
const problem = (status, message) => Object.assign(new Error(message), { status });
const requireSha = (value) => {
  if (typeof value !== 'string' || !shaPattern.test(value))
    throw problem(502, 'GitHub 返回了无效的版本标识。');
  return value.toLowerCase();
};

/** Git's SHA-1 blob ID, including its byte-length header. Supports UTF-8 text and binary buffers. */
export function gitBlobSha(raw) {
  if (typeof raw !== 'string' && !Buffer.isBuffer(raw))
    throw problem(400, '发布内容必须是文本或二进制数据。');
  const data = Buffer.isBuffer(raw) ? raw : Buffer.from(raw, 'utf8');
  return createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
}

function publicRecord(file, raw) {
  if (!jsonPath.test(file) || typeof raw !== 'string')
    throw problem(400, '发布仅允许产品、文章和分类的公开 JSON 快照。');
  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    throw problem(400, '发布内容不是有效的 JSON。');
  }
  if (!record || typeof record !== 'object' || Array.isArray(record))
    throw problem(400, '公开内容必须是 JSON 对象。');
  if (file === 'src/content/settings/taxonomy.json') {
    try {
      validateTaxonomy(record);
    } catch {
      throw problem(400, '分类快照无效。');
    }
    return;
  }
  if (record.published !== true || Object.hasOwn(record, 'deletedAt'))
    throw problem(400, '草稿和回收站内容不得写入公开仓库。');
  const product = file.startsWith('src/content/products/');
  const fields = product ? productFields : articleFields;
  if (Object.keys(record).some((key) => !fields.has(key)))
    throw problem(400, '公开快照包含不受支持的私有字段。');
  const key = product ? record.id : record.slug;
  const filename = file.split('/').pop().slice(0, -5);
  if (typeof key !== 'string' || (filename !== key && !(product && filename === key.toLowerCase())))
    throw problem(400, '公开内容标识与文件名不一致。');
}

/** Validate a public snapshot and return Map<content path, raw Git blob SHA>. */
export function manifestFromFiles(files) {
  if (!(files instanceof Map)) throw problem(400, '公开快照必须是文件映射。');
  const manifest = new Map();
  for (const [file, raw] of files) {
    publicRecord(file, raw);
    manifest.set(file, gitBlobSha(raw));
  }
  return manifest;
}

function validateAssets(assets) {
  if (!Array.isArray(assets) || assets.length > 30)
    throw problem(400, '一次最多发布 30 张新图片。');
  const used = new Set();
  return assets.map((asset) => {
    if (
      !asset ||
      !assetPath.test(asset.path) ||
      asset.path.includes('..') ||
      used.has(asset.path) ||
      typeof asset.content !== 'string' ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(asset.content)
    )
      throw problem(400, '发布图片的路径或编码无效。');
    used.add(asset.path);
    const bytes = Buffer.from(asset.content, 'base64');
    if (
      !bytes.length ||
      bytes.length > 2 * 1024 * 1024 ||
      bytes.toString('base64') !== asset.content ||
      !asset.path.toLowerCase().includes(createHash('sha256').update(bytes).digest('hex')) ||
      gitBlobSha(bytes) !== asset.sha
    )
      throw problem(400, '图片校验失败，或超过 2 MB。');
    return asset;
  });
}

/** Dedicated repository-scoped token only; never reads local Git/CLI credentials. */
/** @param {{token?: string, repo?: string, branch?: string, fetchImpl?: typeof fetch}} options */
export function createGitPublisher({
  token,
  repo = 'cnsoltree/Cnsoltree-Site',
  branch = 'main',
  fetchImpl = globalThis.fetch,
} = {}) {
  if (
    !/^[A-Za-z0-9][A-Za-z0-9_.-]*\/[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(repo) ||
    !/^[A-Za-z0-9][A-Za-z0-9_./-]*$/.test(branch) ||
    branch.includes('..') ||
    branch.endsWith('/')
  )
    throw problem(500, 'GitHub 发布目标配置无效。');
  const base = `https://api.github.com/repos/${repo}`;
  const ref = branch.split('/').map(encodeURIComponent).join('/');
  async function api(endpoint, { method = 'GET', body } = {}) {
    if (typeof token !== 'string' || !token.trim())
      throw problem(503, '尚未配置专用的 GitHub 发布令牌。');
    let response;
    try {
      response = await fetchImpl(base + endpoint, {
        method,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2026-03-10',
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(20000),
      });
    } catch {
      throw problem(502, '无法连接 GitHub 发布服务，请稍后重试。');
    }
    let data;
    try {
      data = await response.json();
    } catch {
      throw problem(502, 'GitHub 发布服务返回了无效响应。');
    }
    if (!data || typeof data !== 'object') throw problem(502, 'GitHub 发布服务返回了无效响应。');
    if (!response.ok) {
      const policy =
        method === 'PATCH' && /protected|rule violation|pull request/i.test(data?.message ?? '');
      if (policy)
        throw problem(409, '仓库分支保护规则阻止直接发布，请配置发布流程；未强制覆盖分支。');
      if (response.status === 409 || response.status === 422)
        throw problem(409, '仓库版本已变化或拒绝更新，请刷新后重新发布；未强制覆盖分支。');
      if (response.status === 401 || response.status === 403)
        throw problem(503, 'GitHub 发布令牌不可用或缺少仓库权限。');
      throw problem(502, 'GitHub 发布请求失败，请稍后重试。');
    }
    return data;
  }

  async function currentSnapshot() {
    const head = requireSha((await api(`/git/ref/heads/${ref}`)).object?.sha);
    const headTree = requireSha((await api(`/git/commits/${head}`)).tree?.sha);
    const current = await api(`/git/trees/${headTree}?recursive=1`);
    if (current.truncated || !Array.isArray(current.tree))
      throw problem(502, '无法完整核对仓库内容，已停止发布。');
    const managed = new Map();
    const paths = new Map();
    for (const entry of current.tree) {
      paths.set(entry.path, entry);
      if (jsonPath.test(entry.path)) {
        if (entry.type !== 'blob' || entry.mode !== '100644')
          throw problem(409, '仓库中的内容文件类型已变化，请先核对。');
        managed.set(entry.path, requireSha(entry.sha));
      }
    }
    return { head, headTree, managed, paths };
  }

  async function inspect() {
    const { head, managed } = await currentSnapshot();
    return { id: head, manifest: Object.fromEntries(managed) };
  }

  /** @param {{files: Map<string, string>, baseline: Map<string, string>, assets?: {path: string, content: string, sha: string}[]}} snapshot */
  async function publish({ files, baseline, assets = [] }) {
    const desired = manifestFromFiles(files);
    if (!desired.has('src/content/settings/taxonomy.json'))
      throw problem(400, '发布快照必须保留网站分类配置。');
    if (
      !(baseline instanceof Map) ||
      [...baseline].some(
        ([file, sha]) => !jsonPath.test(file) || typeof sha !== 'string' || !shaPattern.test(sha),
      )
    )
      throw problem(400, '发布基线无效。');
    assets = validateAssets(assets);
    const { head, headTree, managed, paths } = await currentSnapshot();
    if (
      managed.size !== baseline.size ||
      [...managed].some(([file, sha]) => baseline.get(file)?.toLowerCase() !== sha)
    )
      throw problem(409, '仓库中的公开内容已被其他操作修改，请先同步后再发布。');
    // Check every image conflict before creating any Git object.
    for (const asset of assets) {
      const existing = paths.get(asset.path);
      if (
        existing &&
        (existing.type !== 'blob' || existing.mode !== '100644' || existing.sha !== asset.sha)
      )
        throw problem(409, '同名发布图片已存在且内容不同，请重新上传。');
    }
    const entries = [];
    for (const [file, raw] of files)
      if (managed.get(file) !== desired.get(file))
        entries.push({ path: file, mode: '100644', type: 'blob', content: raw });
    for (const file of baseline.keys())
      if (!desired.has(file)) entries.push({ path: file, mode: '100644', type: 'blob', sha: null });
    for (const asset of assets) {
      if (paths.has(asset.path)) continue;
      const blob = await api('/git/blobs', {
        method: 'POST',
        body: { content: asset.content, encoding: 'base64' },
      });
      if (requireSha(blob.sha) !== asset.sha)
        throw problem(502, 'GitHub 图片校验失败，已停止发布。');
      entries.push({ path: asset.path, mode: '100644', type: 'blob', sha: asset.sha });
    }
    let id = head;
    if (entries.length) {
      const tree = requireSha(
        (await api('/git/trees', { method: 'POST', body: { base_tree: headTree, tree: entries } }))
          .sha,
      );
      id = requireSha(
        (
          await api('/git/commits', {
            method: 'POST',
            body: { message: 'Publish website content from admin', tree, parents: [head] },
          })
        ).sha,
      );
      await api(`/git/refs/heads/${ref}`, { method: 'PATCH', body: { sha: id, force: false } });
    }
    return {
      id,
      status: 'queued',
      message: entries.length
        ? '公开快照已提交，正在等待正式部署。'
        : '公开内容没有变化，正在核对正式部署。',
      manifest: Object.fromEntries(desired),
    };
  }

  async function status(value) {
    if (typeof value !== 'string' || !shaPattern.test(value))
      throw problem(400, '发布版本标识无效。');
    const id = value.toLowerCase();
    const [combined, deployments] = await Promise.all([
      api(`/commits/${id}/status`),
      api(`/deployments?sha=${id}&per_page=100`),
    ]);
    if (!Array.isArray(deployments)) throw problem(502, 'GitHub 部署记录无效。');
    const production = deployments
      .filter(
        (entry) =>
          entry.sha?.toLowerCase() === id &&
          (entry.environment?.toLowerCase() === 'production' ||
            entry.production_environment === true),
      )
      .sort(
        (a, b) =>
          (Date.parse(b.created_at) || 0) - (Date.parse(a.created_at) || 0) ||
          Number(b.id) - Number(a.id),
      )[0];
    if (production) {
      if (!/^\d+$/.test(String(production.id))) throw problem(502, 'GitHub 部署标识无效。');
      const statuses = await api(`/deployments/${production.id}/statuses?per_page=100`);
      if (!Array.isArray(statuses)) throw problem(502, 'GitHub 部署状态无效。');
      const latest = statuses[0]?.state;
      if (latest === 'success')
        return {
          id,
          status: 'ready',
          url: 'https://www.elesoltree.com',
          message: '正式网站部署成功。',
        };
      if (latest === 'inactive' && statuses.some((entry) => entry.state === 'success'))
        return {
          id,
          status: 'ready',
          url: 'https://www.elesoltree.com',
          message: '该次发布已成功上线，正式网站已有后续部署。',
        };
      if (['failure', 'error', 'inactive'].includes(latest))
        return {
          id,
          status: 'error',
          message:
            latest === 'inactive'
              ? '该部署已被后续版本替换。'
              : '正式部署失败，请检查 Vercel 构建记录。',
        };
    }
    if (['error', 'failure'].includes(combined.state))
      return { id, status: 'error', message: 'GitHub 发布检查失败，请查看部署记录。' };
    return { id, status: 'building', message: '正在等待正式环境部署完成。' };
  }
  return { publish, status, inspect };
}
