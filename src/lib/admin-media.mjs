import { createHash } from 'node:crypto';
import { adminProblem } from './admin-auth.mjs';
import { uploadPath } from './admin-workspace.mjs';
import { supabaseServiceHeaders } from './supabase.mjs';

export const MEDIA_BUCKET = 'soltree-admin-media';
export function imageUpload(asset) {
  if (
    !asset ||
    asset.encoding !== 'base64' ||
    typeof asset.path !== 'string' ||
    !/^public\/images\/uploads\/[\w .()-]+\.(png|jpe?g|webp)$/i.test(asset.path) ||
    typeof asset.content !== 'string' ||
    asset.content.length > 2_800_000 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(asset.content)
  )
    throw adminProblem(422, '仅支持 uploads 文件夹内不超过 2 MB 的 JPG、PNG、WebP 图片。');
  const bytes = Buffer.from(asset.content, 'base64');
  if (!bytes.length || bytes.length > 2 * 1024 * 1024)
    throw adminProblem(413, '图片不能超过 2 MB。');
  const ext = asset.path.split('.').pop().toLowerCase().replace('jpeg', 'jpg');
  const valid =
    ext === 'png'
      ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : ext === 'jpg'
        ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!valid) throw adminProblem(422, '图片内容与扩展名不匹配，请重新导出图片。');
  const name = `${createHash('sha256').update(bytes).digest('hex')}.${ext}`;
  const sha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  return {
    bytes,
    path: `public/images/uploads/${name}`,
    metadata: {
      objectKey: name,
      sha,
      size: bytes.length,
      contentType: ext === 'jpg' ? 'image/jpeg' : `image/${ext}`,
    },
  };
}

export function createAdminMedia({ url, serviceKey, fetchImpl = fetch }) {
  let origin;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== 'https:' ||
      parsed.pathname !== '/' ||
      parsed.username ||
      parsed.password
    )
      throw new Error();
    origin = parsed.origin;
  } catch {
    throw adminProblem(503, '图片存储尚未配置。');
  }
  if (!serviceKey) throw adminProblem(503, '图片存储尚未配置。');
  const headers = supabaseServiceHeaders(serviceKey);
  return {
    async upload(asset) {
      const image = imageUpload(asset);
      let response;
      try {
        response = await fetchImpl(
          `${origin}/storage/v1/object/${MEDIA_BUCKET}/${image.metadata.objectKey}`,
          {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': image.metadata.contentType,
              'x-upsert': 'false',
            },
            body: image.bytes,
            signal: AbortSignal.timeout(20_000),
          },
        );
      } catch {
        throw adminProblem(503, '图片上传暂时不可用，请重试。');
      }
      // A content-addressed object can be reused; existing bytes have the same digest.
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        if (!['409', 'Duplicate'].includes(String(error.statusCode)) && response.status !== 409)
          throw adminProblem(503, '图片未保存，请确认私有图片存储已初始化后重试。');
      }
      return image;
    },
    async read(name, metadata) {
      if (!uploadPath.test(name) || metadata?.objectKey !== name.split('/').pop())
        throw adminProblem(404, '图片不存在。');
      const response = await fetchImpl(
        `${origin}/storage/v1/object/authenticated/${MEDIA_BUCKET}/${metadata.objectKey}`,
        {
          headers,
          signal: AbortSignal.timeout(20_000),
        },
      );
      if (!response.ok) throw adminProblem(503, '暂时无法读取图片。');
      const bytes = Buffer.from(await response.arrayBuffer());
      const image = imageUpload({
        path: name,
        encoding: 'base64',
        content: bytes.toString('base64'),
      });
      if (image.path !== name || image.metadata.sha !== metadata.sha)
        throw adminProblem(502, '图片校验失败，请重新上传。');
      return image;
    },
  };
}
