import type { APIContext } from 'astro';
import { getSecret } from 'astro:env/server';
import { requireAdmin } from './admin-server';
import { adminOrigin, adminProblem } from './admin-auth.mjs';
import { createAiSettings } from './admin-ai.mjs';
import { createAiCloudStore } from './admin-ai-store.mjs';

/** Shared authorization and server-only credentials for AI settings and features. */
export async function adminAiContext(context: APIContext) {
  const local = import.meta.env.DEV && context.request.headers.get('x-soltree-ai-mode') === 'local';
  let options;
  if (local) {
    adminOrigin(context.request, true);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(context.request.url).hostname))
      throw adminProblem(403, '本地设置仅允许本机访问。');
    const { createAiLocalStore } = await import('./admin-ai-local.mjs');
    const path = await import('node:path');
    options = createAiLocalStore(path.resolve(process.cwd(), '../Astro-elesoltree-private'));
  } else {
    await requireAdmin(context);
    options = {
      store: createAiCloudStore({
        url: getSecret('NEXT_PUBLIC_SUPABASE_URL'),
        serviceKey: getSecret('SUPABASE_SERVICE_ROLE_KEY'),
      }),
      encryptionKey: getSecret('AI_SETTINGS_ENCRYPTION_KEY'),
    };
  }
  return { local, service: createAiSettings(options) };
}
