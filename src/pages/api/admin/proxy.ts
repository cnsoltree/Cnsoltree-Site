import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { requireAdmin, adminFailure, adminStore } from '@/lib/admin-server';
import { adminBody, adminJson, adminProblem } from '@/lib/admin-auth.mjs';
import { cloudProxy } from '@/lib/admin-proxy.mjs';
import { writableWorkspace } from '@/lib/admin-workspace.mjs';
import { createAdminMedia } from '@/lib/admin-media.mjs';
import { gitBlobSha } from '@/lib/admin-publish.mjs';
import { loadCloudWorkspace } from '@/lib/admin-content';
import { validateCloudRecord } from '@/lib/admin-validation';
import imageIndex from '@/admin/image-index.json';

export const prerender = false;
export const POST: APIRoute = async (context) => {
  try {
    await requireAdmin(context);
    const input = await adminBody(context.request);
    const current = await loadCloudWorkspace();
    if (['persistEntry', 'persistMedia', 'deleteFiles'].includes(input.action))
      writableWorkspace(current.document);
    const media = createAdminMedia({
      url: getSecret('NEXT_PUBLIC_SUPABASE_URL'),
      serviceKey: getSecret('SUPABASE_SERVICE_ROLE_KEY'),
    });
    const result = await cloudProxy(input, current.document, {
      media,
      publicMedia: imageIndex
        .filter((name) => name.startsWith('/images/uploads/') && /\.(png|jpe?g|webp)$/i.test(name))
        .map((name) => `public${name}`),
      async readPublicMedia(name: string) {
        const response = await fetch(`https://www.elesoltree.com${name.slice('public'.length)}`, {
          redirect: 'error',
          signal: AbortSignal.timeout(15_000),
        });
        if (!response.ok || Number(response.headers.get('content-length')) > 2 * 1024 * 1024)
          throw adminProblem(503, '暂时无法读取已发布图片。');
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.length > 2 * 1024 * 1024) throw adminProblem(413, '图片过大。');
        return { bytes, metadata: { sha: gitBlobSha(bytes) } };
      },
      validateRecord: validateCloudRecord,
    });
    if (result.changed) await adminStore().save(current.revision, result.document);
    return adminJson(result.response);
  } catch (error) {
    return adminFailure(error);
  }
};
