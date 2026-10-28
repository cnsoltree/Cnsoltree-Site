import { supabaseServiceHeaders } from './supabase.mjs';

export const ADMIN_STORE_MAX_BYTES = 15 * 1024 * 1024;

const contentPath =
  /^(?:src\/content\/products\/[A-Za-z0-9][A-Za-z0-9_-]{0,159}\.json|src\/content\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.json|src\/content\/settings\/(?:taxonomy|seo-workspace)\.json)$/;
const mediaPath = /^public\/images\/uploads\/[a-f0-9]{64}\.(png|jpe?g|webp)$/;
const blobSha = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i;
const object = (value) => value && typeof value === 'object' && !Array.isArray(value);
const failure = (status, message) => Object.assign(new Error(message), { status });

/** Storage boundary only. Content fields and taxonomy mappings are validated by the authenticated API. */
export function validateAdminDocument(value) {
  try {
    if (
      !object(value) ||
      Object.keys(value).some(
        (key) => !['version', 'files', 'media', 'publication', 'sourceManifest'].includes(key),
      )
    )
      throw new Error();
    if (
      value.version !== 1 ||
      !object(value.files) ||
      !object(value.sourceManifest) ||
      (value.media !== undefined && !object(value.media)) ||
      !(value.publication === null || object(value.publication))
    )
      throw new Error();
    for (const [filename, raw] of Object.entries(value.files)) {
      if (!contentPath.test(filename) || typeof raw !== 'string' || !object(JSON.parse(raw)))
        throw new Error();
    }
    for (const [filename, sha] of Object.entries(value.sourceManifest)) {
      if (
        !contentPath.test(filename) ||
        filename.endsWith('/seo-workspace.json') ||
        !(sha === null || (typeof sha === 'string' && blobSha.test(sha)))
      )
        throw new Error();
    }
    for (const [filename, metadata] of Object.entries(value.media ?? {})) {
      const extension = mediaPath.exec(filename)?.[1];
      if (
        !extension ||
        !object(metadata) ||
        Object.keys(metadata).some(
          (key) => !['objectKey', 'sha', 'contentType', 'size'].includes(key),
        ) ||
        typeof metadata.objectKey !== 'string' ||
        !/^[A-Za-z0-9][A-Za-z0-9_./-]{0,511}$/.test(metadata.objectKey) ||
        metadata.objectKey.split('/').some((part) => !part || part === '.' || part === '..') ||
        typeof metadata.sha !== 'string' ||
        !blobSha.test(metadata.sha) ||
        metadata.contentType !==
          (extension === 'png'
            ? 'image/png'
            : extension === 'webp'
              ? 'image/webp'
              : 'image/jpeg') ||
        !Number.isSafeInteger(metadata.size) ||
        metadata.size < 1
      )
        throw new Error();
    }
    const raw = JSON.stringify({ ...value, media: value.media ?? {} }, (_key, field) => {
      if (
        field === undefined ||
        typeof field === 'function' ||
        typeof field === 'symbol' ||
        typeof field === 'bigint' ||
        (typeof field === 'number' && !Number.isFinite(field))
      )
        throw new Error();
      return field;
    });
    if (new TextEncoder().encode(raw).byteLength > ADMIN_STORE_MAX_BYTES)
      throw failure(413, '在线内容工作区超过 15 MB，请先整理内容或图片引用。');
    const document = JSON.parse(raw);
    if (
      !object(document) ||
      !object(document.files) ||
      !object(document.sourceManifest) ||
      !object(document.media) ||
      !(document.publication === null || object(document.publication))
    )
      throw new Error();
    return document;
  } catch (error) {
    if (error.status === 413) throw error;
    throw failure(422, '在线内容工作区格式无效，请检查内容路径、JSON 和来源版本。');
  }
}

/** One private Supabase JSONB row. PostgreSQL, not a process mutex or Storage upsert, owns compare-and-swap. */
export function createAdminStore({ url, serviceKey, fetchImpl = fetch }) {
  let base;
  try {
    const parsed = new URL(url);
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
    if (
      !(parsed.protocol === 'https:' || (parsed.protocol === 'http:' && loopback)) ||
      parsed.username ||
      parsed.password ||
      parsed.pathname !== '/' ||
      parsed.search ||
      parsed.hash ||
      typeof serviceKey !== 'string' ||
      !serviceKey.trim() ||
      typeof fetchImpl !== 'function'
    )
      throw new Error();
    base = parsed.origin;
  } catch {
    throw failure(503, '尚未正确配置在线内容存储。');
  }
  const headers = {
    ...supabaseServiceHeaders(serviceKey.trim()),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  async function request(pathname, options = {}) {
    let response;
    try {
      response = await fetchImpl(`${base}${pathname}`, {
        ...options,
        headers: { ...headers, ...options.headers },
        signal: AbortSignal.timeout(20_000),
      });
    } catch {
      throw failure(503, '在线内容存储暂时无法连接，请稍后重试。');
    }
    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      if (detail?.code === '40001' || response.status === 409)
        throw failure(409, '在线内容刚刚被修改，请刷新后重新保存。');
      if (['23514', '22023', '22P02'].includes(detail?.code))
        throw failure(422, '在线内容未通过存储校验，未覆盖原有内容。');
      if (response.status === 401 || response.status === 403)
        throw failure(503, '在线内容存储认证失败，请检查服务端配置。');
      if (['PGRST202', 'PGRST205', '42P01', '42883'].includes(detail?.code))
        throw failure(503, '在线内容存储尚未初始化，请先应用数据库迁移。');
      throw failure(503, '在线内容存储暂时不可用，请稍后重试。');
    }
    if (response.status === 204) return null;
    const raw = await response.text();
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      throw failure(502, '在线内容存储返回了无效数据。');
    }
  }

  function result(rows, allowEmpty = false) {
    if (allowEmpty && Array.isArray(rows) && !rows.length) return null;
    if (!Array.isArray(rows) || rows.length !== 1 || !object(rows[0]))
      throw failure(502, '在线内容存储返回了无效数据。');
    const revision =
      typeof rows[0].revision === 'string' && /^\d+$/.test(rows[0].revision)
        ? Number(rows[0].revision)
        : rows[0].revision;
    if (!Number.isSafeInteger(revision) || revision < 1)
      throw failure(502, '在线内容存储版本无效。');
    let document;
    try {
      document = validateAdminDocument(rows[0].document);
    } catch {
      throw failure(502, '在线内容存储返回了无效工作区。');
    }
    return { revision, document };
  }

  async function load() {
    return result(
      await request(
        '/rest/v1/soltree_admin_workspace?key=eq.main&select=revision,document&limit=1',
      ),
      true,
    );
  }

  async function initialize(value) {
    const document = validateAdminDocument(value);
    await request('/rest/v1/soltree_admin_workspace?on_conflict=key', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({ key: 'main', revision: 1, document }),
    });
    const current = await load();
    if (!current) throw failure(503, '在线内容工作区初始化尚未完成，请稍后重试。');
    return current;
  }

  async function save(expectedRevision, value) {
    if (
      !Number.isSafeInteger(expectedRevision) ||
      expectedRevision < 1 ||
      expectedRevision >= Number.MAX_SAFE_INTEGER
    )
      throw failure(422, '在线内容版本无效，请刷新后重试。');
    const document = validateAdminDocument(value);
    return result(
      await request('/rest/v1/rpc/soltree_admin_save', {
        method: 'POST',
        body: JSON.stringify({ expected_revision: expectedRevision, next_document: document }),
      }),
    );
  }

  return { load, initialize, save };
}
