import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { requireAdmin, adminFailure } from '@/lib/admin-server';
import { loadCloudWorkspace } from '@/lib/admin-content';
import { createAdminMedia } from '@/lib/admin-media.mjs';
import { adminProblem } from '@/lib/admin-auth.mjs';

export const prerender = false;
export const GET: APIRoute = async (context) => {
  try {
    await requireAdmin(context);
    if (!/^[a-f0-9]{64}\.(png|jpg|jpeg|webp)$/.test(context.params.name ?? ''))
      throw adminProblem(404, 'Not found');
    const name = `public/images/uploads/${context.params.name}`;
    const current = await loadCloudWorkspace();
    const metadata = current.document.media[name];
    if (!metadata) throw adminProblem(404, 'Not found');
    const media = createAdminMedia({
      url: getSecret('NEXT_PUBLIC_SUPABASE_URL'),
      serviceKey: getSecret('SUPABASE_SERVICE_ROLE_KEY'),
    });
    const image = await media.read(name, metadata);
    return new Response(new Uint8Array(image.bytes), {
      headers: {
        'Content-Type': metadata.contentType,
        'Cache-Control': 'private, no-store',
        Vary: 'Cookie',
        'X-Robots-Tag': 'noindex, nofollow',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return adminFailure(error);
  }
};
