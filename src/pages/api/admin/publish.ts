import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { getSecret } from 'astro:env/server';
import { requireAdmin, adminFailure, adminStore } from '@/lib/admin-server';
import { adminBody, adminJson, adminProblem } from '@/lib/admin-auth.mjs';
import { createGitPublisher, manifestFromFiles, publicContentRaw } from '@/lib/admin-publish.mjs';
import { createAdminMedia } from '@/lib/admin-media.mjs';
import { loadCloudWorkspace } from '@/lib/admin-content';
import { loadProducts, loadBlogPosts } from '@/lib/data';
import { validateTaxonomy } from '@/lib/taxonomy-model.mjs';
import { validateCloudRecord } from '@/lib/admin-validation';

export const prerender = false;
const publisher = () => createGitPublisher({ token: getSecret('ADMIN_GITHUB_TOKEN') });
const equal = (a: Record<string, string>, b: Record<string, string>) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.entries(a).every(([name, sha]) => b[name] === sha);

async function recover(current: any) {
  const publication = current.document.publication;
  if (publication?.status !== 'preparing') return current;
  if (Date.now() - Date.parse(publication.startedAt) < 10 * 60_000) return current;
  const actual = await publisher().inspect();
  const document = structuredClone(current.document);
  if (equal(actual.manifest, publication.snapshotManifest)) {
    document.publication = {
      id: actual.id,
      status: 'queued',
      startedAt: publication.startedAt,
      mediaPublished: publication.mediaPublished ?? [],
      message: '已找回提交记录，正在核对正式部署。',
    };
    document.sourceManifest = actual.manifest;
  } else if (equal(actual.manifest, document.sourceManifest)) {
    document.publication = {
      status: 'error',
      mediaPublished: publication.previousMediaPublished ?? [],
      message: '上一次准备发布未完成，云端内容已保留，可重新发布。',
    };
  } else {
    document.publication = {
      status: 'error',
      mediaPublished: publication.previousMediaPublished ?? [],
      message: '公开仓库与云端内容均有变化。云端仍可保存，请联系维护人员同步版本后再发布。',
    };
  }
  return adminStore().save(current.revision, document);
}

export const GET: APIRoute = async (context) => {
  try {
    await requireAdmin(context);
    const current = await recover(await loadCloudWorkspace());
    const previous = current.document.publication;
    if (previous?.status === 'preparing')
      return adminJson({ status: 'building', message: '正在准备发布，请稍后检查状态。' });
    const requested = new URL(context.request.url).searchParams.get('id');
    if (requested && requested !== previous?.id) throw adminProblem(404, '该发布记录不存在。');
    if (!previous?.id)
      return adminJson(
        previous ?? { status: 'idle', message: '内容保存到云端后，可统一发布到正式网站。' },
      );
    return adminJson(await publisher().status(previous.id));
  } catch (error) {
    return adminFailure(error);
  }
};

export const POST: APIRoute = async (context) => {
  let locked: any;
  try {
    await requireAdmin(context);
    const input = await adminBody(context.request, 1024);
    if (Object.keys(input).length) throw adminProblem(400, '发布参数无效。');
    if (!getSecret('ADMIN_GITHUB_TOKEN'))
      throw adminProblem(503, '请先配置专用 GitHub 发布令牌，云端草稿已保留。');
    const current = await recover(await loadCloudWorkspace());
    const document = current.document;
    if (document.publication?.status === 'preparing')
      throw adminProblem(409, '正在准备发布，请稍后检查状态。');
    // A failed build remains a real published Git snapshot. Reconcile status before publishing another.
    if (document.publication?.id && ['queued', 'building'].includes(document.publication.status)) {
      const prior = await publisher().status(document.publication.id);
      if (['queued', 'building'].includes(prior.status)) return adminJson(prior, 202);
    }
    const taxonomy = validateTaxonomy(
      JSON.parse(document.files['src/content/settings/taxonomy.json']),
    );
    const categories = taxonomy.categories.filter((item) => !item.deletedAt);
    const files = new Map<string, string>();
    files.set(
      'src/content/settings/taxonomy.json',
      document.files['src/content/settings/taxonomy.json'],
    );
    const productRecords: unknown[] = [];
    const articleRecords: unknown[] = [];
    for (const [name, raw] of Object.entries(document.files) as [string, string][]) {
      if (!/^src\/content\/(products|articles)\//.test(name)) continue;
      const record = JSON.parse(raw);
      if (!record.published || record.deletedAt) continue;
      validateCloudRecord(
        name.startsWith('src/content/products/') ? 'products' : 'articles',
        record,
        document,
      );
      (name.startsWith('src/content/products/') ? productRecords : articleRecords).push(record);
      files.set(name, publicContentRaw(name, raw));
    }
    try {
      loadProducts(productRecords, categories);
      loadBlogPosts(articleRecords, categories);
    } catch {
      throw adminProblem(422, '有待发布内容资料不完整，请完善产品或文章后重试。');
    }
    const manifest = Object.fromEntries(manifestFromFiles(files));
    const sourceText = [...files.values()].join('\n');
    const mediaPublished = document.publication?.mediaPublished ?? [];
    const referenced = Object.entries(document.media).filter(
      ([name]) =>
        !mediaPublished.includes(name) && sourceText.includes(name.slice('public'.length)),
    );
    if (referenced.length > 30)
      throw adminProblem(422, '当前有超过 30 张云端图片，请联系维护人员分批发布。');
    const actual = await publisher().inspect();
    if (!equal(actual.manifest, document.sourceManifest))
      throw adminProblem(409, '公开内容已在 Git 中变更，请先同步后再发布。');
    locked = await adminStore().save(current.revision, {
      ...document,
      publication: {
        status: 'preparing',
        token: randomUUID(),
        startedAt: new Date().toISOString(),
        snapshotManifest: manifest,
        previousMediaPublished: mediaPublished,
        mediaPublished: [...new Set([...mediaPublished, ...referenced.map(([name]) => name)])],
      },
    });
    const media = createAdminMedia({
      url: getSecret('NEXT_PUBLIC_SUPABASE_URL'),
      serviceKey: getSecret('SUPABASE_SERVICE_ROLE_KEY'),
    });
    const assets = [];
    for (const [name, metadata] of referenced) {
      const image = await media.read(name, metadata);
      assets.push({ path: name, content: image.bytes.toString('base64'), sha: image.metadata.sha });
    }
    const publication = await publisher().publish({
      files,
      baseline: new Map(Object.entries(document.sourceManifest)),
      assets,
    });
    const updated = await adminStore().save(locked.revision, {
      ...locked.document,
      sourceManifest: publication.manifest,
      publication: {
        id: publication.id,
        status: publication.status,
        message: publication.message,
        startedAt: locked.document.publication.startedAt,
        mediaPublished: locked.document.publication.mediaPublished,
      },
    });
    if (!updated) throw adminProblem(502, '发布提交已生成，状态暂未保存，请稍后检查发布状态。');
    locked = null;
    return adminJson(updated.document.publication, 202);
  } catch (error) {
    // If Git succeeded but recording it failed, retain the durable preparing record for recovery.
    // Clearing an ambiguous lock could allow a stale snapshot to overwrite a real publication.
    return adminFailure(error);
  }
};
