import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// ─── 环境变量校验 ─────────────────────────────────────────────────────────────

function getR2Env() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error(
      "[R2] Missing environment variables. Ensure R2_ACCOUNT_ID, " +
        "R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET_NAME are set in .env.local."
    );
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName };
}

// ─── 客户端工厂（每次调用新建，避免跨请求共享状态） ─────────────────────────

function createR2Client(): { client: S3Client; bucketName: string } {
  const { accountId, accessKeyId, secretAccessKey, bucketName } = getR2Env();

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return { client, bucketName };
}

// ─── 类型定义 ─────────────────────────────────────────────────────────────────

export interface UploadResult {
  /** R2 中的存储路径，如 "avatars/user-123.webp" */
  key: string;
  /** 公开访问 URL（仅当 R2_PUBLIC_URL 已配置且 isPublic=true 时返回） */
  url?: string;
}

export interface PresignedUploadResult {
  /** 预签名 PUT URL，客户端直接用 fetch/axios 上传 */
  uploadUrl: string;
  /** 上传后的 R2 存储路径 */
  key: string;
  /** 上传完成后的最终访问 URL（公开桶时） */
  publicUrl?: string;
}

export interface R2Object {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
}

// ─── 上传文件 ─────────────────────────────────────────────────────────────────

export interface UploadOptions {
  /** 存储路径，如 "avatars/user-123.webp" */
  key: string;
  body: Buffer | Uint8Array | string;
  /** MIME 类型，如 "image/webp" */
  contentType: string;
  /** 缓存控制，默认 1 年 */
  cacheControl?: string;
}

export async function uploadToR2({
  key,
  body,
  contentType,
  cacheControl = "public, max-age=31536000, immutable",
}: UploadOptions): Promise<UploadResult> {
  const { client, bucketName } = createR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    })
  );

  const publicBase = process.env.R2_PUBLIC_URL;
  return {
    key,
    url: publicBase ? `${publicBase}/${key}` : undefined,
  };
}

// ─── 客户端直传：生成预签名上传 URL ──────────────────────────────────────────

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<PresignedUploadResult> {
  const { client, bucketName } = createR2Client();

  const uploadUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn }
  );

  const publicBase = process.env.R2_PUBLIC_URL;
  return {
    uploadUrl,
    key,
    publicUrl: publicBase ? `${publicBase}/${key}` : undefined,
  };
}

// ─── 生成预签名下载 URL（私有文件临时访问） ───────────────────────────────────

export async function getPresignedDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const { client, bucketName } = createR2Client();

  return getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: bucketName, Key: key }),
    { expiresIn }
  );
}

// ─── 删除文件 ─────────────────────────────────────────────────────────────────

export async function deleteFromR2(key: string): Promise<void> {
  const { client, bucketName } = createR2Client();

  await client.send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: key })
  );
}

// ─── 检查文件是否存在 ─────────────────────────────────────────────────────────

export async function fileExistsInR2(key: string): Promise<boolean> {
  const { client, bucketName } = createR2Client();

  try {
    await client.send(new HeadObjectCommand({ Bucket: bucketName, Key: key }));
    return true;
  } catch {
    return false;
  }
}

// ─── 列出目录下的文件 ─────────────────────────────────────────────────────────

export async function listR2Objects(
  prefix: string,
  maxKeys = 100
): Promise<R2Object[]> {
  const { client, bucketName } = createR2Client();

  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: maxKeys,
    })
  );

  return (response.Contents ?? []).map((obj) => ({
    key: obj.Key ?? "",
    size: obj.Size ?? 0,
    lastModified: obj.LastModified ?? new Date(),
    etag: obj.ETag ?? "",
  }));
}

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

/** 根据用户 ID 生成规范的头像存储路径 */
export function getAvatarKey(userId: string, ext = "webp"): string {
  return `avatars/${userId}/avatar.${ext}`;
}

/** 根据路径拼接公开访问 URL */
export function getPublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_URL;
  if (!base) {
    throw new Error("[R2] R2_PUBLIC_URL is not configured in .env.local.");
  }
  return `${base}/${key}`;
}

/** 从文件名推断 MIME 类型（常见图片格式） */
export function inferContentType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
    pdf: "application/pdf",
    mp4: "video/mp4",
    webm: "video/webm",
  };
  return map[ext] ?? "application/octet-stream";
}

/** 生成唯一的存储路径，防止文件名冲突 */
export function generateUniqueKey(folder: string, filename: string): string {
  const ext = filename.split(".").pop() ?? "bin";
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `${folder}/${timestamp}-${random}.${ext}`;
}
