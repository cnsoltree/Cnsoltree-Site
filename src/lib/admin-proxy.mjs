import { createHash } from 'node:crypto';
import { adminProblem } from './admin-auth.mjs';
import { rawJson } from './admin-workspace.mjs';

const recordPath = /^src\/content\/(products|articles)\/([A-Za-z0-9][A-Za-z0-9_-]{0,159})\.json$/;
const revision = (raw) => createHash('sha256').update(raw).digest('hex');
const plain = (value) => value && typeof value === 'object' && !Array.isArray(value);
export function contentEntry(name, raw) {
  return {
    data: raw,
    file: {
      path: name,
      id: raw === undefined ? null : revision(raw),
      label: name.split('/').pop(),
    },
  };
}

/** Decap transport only. Authentication and one durable CAS surround this action at the route boundary. */
export async function cloudProxy(
  input,
  original,
  { media, validateRecord, publicMedia = /** @type {string[]} */ ([]), readPublicMedia },
) {
  if (
    !plain(input) ||
    typeof input.action !== 'string' ||
    (input.branch && input.branch !== 'main')
  )
    throw adminProblem(400, '请求格式不正确。');
  const params = input.params ?? {};
  if (!plain(params) || (params.branch && params.branch !== 'main'))
    throw adminProblem(400, '请求格式不正确。');
  const document = structuredClone(original);
  const get = (name) => {
    if (typeof name !== 'string' || !recordPath.test(name))
      throw adminProblem(404, '内容路径不存在。');
    const raw = document.files[name];
    if (raw === undefined) throw adminProblem(404, '内容不存在。');
    return contentEntry(name, raw);
  };
  const mediaResponse = async (name) => {
    let image;
    if (Object.hasOwn(document.media, name)) image = await media.read(name, document.media[name]);
    else if (publicMedia.includes(name)) image = await readPublicMedia(name);
    else throw adminProblem(404, '图片不存在。');
    return {
      id: image.metadata.sha,
      name: name.split('/').pop(),
      path: name,
      content: image.bytes.toString('base64'),
      encoding: 'base64',
    };
  };
  let response;
  let changed = false;
  switch (input.action) {
    case 'info':
      response = { repo: 'Soltree private workspace', publish: true, type: 'proxy' };
      break;
    case 'entriesByFolder': {
      if (
        !['src/content/products', 'src/content/articles'].includes(params.folder) ||
        params.extension !== 'json'
      )
        throw adminProblem(404, '内容目录不存在。');
      response = Object.keys(document.files)
        .filter((name) => name.startsWith(`${params.folder}/`))
        .map(get);
      break;
    }
    case 'entriesByFiles': {
      if (!Array.isArray(params.files) || params.files.length > 1000)
        throw adminProblem(400, '文件列表无效。');
      response = params.files.map((file) => get(file.path));
      break;
    }
    case 'getEntry':
      response = get(params.path);
      break;
    case 'getNotes':
      response = { notes: [] };
      break;
    case 'getPRMetadata':
      response = { metadata: null };
      break;
    case 'getDeployPreview':
      response = null;
      break;
    case 'getMedia': {
      if (params.mediaFolder !== 'public/images/uploads')
        throw adminProblem(404, '图片目录不存在。');
      response = [...new Set([...publicMedia, ...Object.keys(document.media)])].map((name) => ({
        id: document.media[name]?.sha ?? name,
        path: name,
        name: name.split('/').pop(),
        url: name.slice('public'.length),
        size: document.media[name]?.size,
      }));
      break;
    }
    case 'getMediaFile':
      response = await mediaResponse(params.path);
      break;
    case 'persistMedia': {
      const image = await media.upload(params.asset);
      document.media[image.path] = image.metadata;
      changed = true;
      response = {
        id: image.metadata.sha,
        name: image.path.split('/').pop(),
        path: image.path,
        content: image.bytes.toString('base64'),
        encoding: 'base64',
      };
      break;
    }
    case 'persistEntry': {
      if (
        !Array.isArray(params.dataFiles) ||
        params.dataFiles.length !== 1 ||
        !Array.isArray(params.assets) ||
        params.assets.length > 8 ||
        !plain(params.expected) ||
        params.options?.useWorkflow
      )
        throw adminProblem(400, '保存参数无效，请刷新后台重新编辑。');
      const data = params.dataFiles[0];
      const match = typeof data?.path === 'string' && recordPath.exec(data.path);
      if (
        !match ||
        (data.newPath && data.newPath !== data.path) ||
        typeof data.raw !== 'string' ||
        data.raw.length > 300_000
      )
        throw adminProblem(422, '内容路径或内容大小无效。');
      const [, collection, entry] = match;
      if (params.options?.collectionName !== collection)
        throw adminProblem(422, '内容分类与目录不匹配。');
      const before = document.files[data.path];
      if (
        !Object.hasOwn(params.expected, data.path) ||
        params.expected[data.path] !== (before === undefined ? null : revision(before))
      )
        throw adminProblem(409, '内容已在其他位置修改，请刷新后重新编辑。');
      const key = collection === 'products' ? 'id' : 'slug';
      let record;
      try {
        record = JSON.parse(data.raw);
      } catch {
        throw adminProblem(422, '内容必须是有效 JSON。');
      }
      if (
        !plain(record) ||
        typeof record[key] !== 'string' ||
        record[key].toLowerCase() !== entry.toLowerCase() ||
        (collection === 'articles' && record.slug !== entry) ||
        typeof record.published !== 'boolean'
      )
        throw adminProblem(422, '内容网址、目录或发布开关无效。');
      const previous = before === undefined ? null : JSON.parse(before);
      if (previous && previous[key] !== record[key])
        throw adminProblem(409, '已保存的网址不能修改。');
      if (previous?.deletedAt) throw adminProblem(409, '此内容已移入回收站，请先恢复。');
      if (
        Object.entries(document.files).some(
          ([name, raw]) =>
            name !== data.path &&
            name.startsWith(`src/content/${collection}/`) &&
            JSON.parse(raw)[key]?.toLowerCase() === record[key].toLowerCase(),
        )
      )
        throw adminProblem(409, '这个内容网址已经存在。');
      for (const asset of params.assets) {
        const image = await media.upload(asset);
        document.media[image.path] = image.metadata;
        // Decap may include newly selected assets in the entry instead of persisting them first.
        record = JSON.parse(
          JSON.stringify(record).replaceAll(
            asset.path.slice('public'.length),
            image.path.slice('public'.length),
          ),
        );
      }
      const now = new Date().toISOString();
      delete record.deletedAt;
      if (collection === 'products') {
        if (previous?.createdAt) record.createdAt = previous.createdAt;
        else if (!previous) record.createdAt = now;
        else delete record.createdAt;
        record.updatedAt = now;
        if (!record.slug) record.slug = record.id;
      } else {
        record.dateModified = now;
        record.readingTime = Math.max(
          1,
          Math.ceil(
            String(record.content ?? '')
              .trim()
              .split(/\s+/)
              .filter(Boolean).length / 220,
          ),
        );
      }
      await validateRecord(collection, record, document);
      const raw = rawJson(record);
      document.files[data.path] = raw;
      changed = true;
      response = {
        message: 'entry persisted',
        revisions: { [data.path]: revision(raw) },
        savedAt: now,
      };
      break;
    }
    case 'deleteFiles':
      throw adminProblem(409, '请通过产品或文章列表移入回收站；图片暂时保留，避免破坏已有页面。');
    default:
      throw adminProblem(400, '此后台操作暂不支持。');
  }
  return { document, response, changed };
}
