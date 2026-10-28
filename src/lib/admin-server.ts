import type { APIContext } from 'astro';
import { getSecret } from 'astro:env/server';
import { createAdminAuth, adminProblem, adminJson, adminOrigin } from './admin-auth.mjs';
import { createAdminStore } from './admin-store.mjs';

type Context = Pick<APIContext, 'cookies' | 'request'>;
export const onlineAdminEnabled = () => getSecret('ADMIN_ONLINE_ENABLED') === 'true';
const config = () => ({
  url: getSecret('NEXT_PUBLIC_SUPABASE_URL'),
  serviceKey: getSecret('SUPABASE_SERVICE_ROLE_KEY'),
});
export const adminStore = () => createAdminStore(config());
export const adminAuth = () => createAdminAuth(config());
const names = ['soltree-admin-access', 'soltree-admin-refresh'];

export function clearAdminCookies(context: Context) {
  for (const name of names) context.cookies.delete(name, { path: '/' });
}
export function setAdminCookies(context: Context, session: Record<string, any>) {
  const options = {
    path: '/',
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: 'strict' as const,
  };
  context.cookies.set(names[0], session.access_token, {
    ...options,
    maxAge: Math.min(Number(session.expires_in) || 3600, 3600),
  });
  context.cookies.set(names[1], session.refresh_token, { ...options, maxAge: 60 * 60 * 24 * 14 });
}
export async function requireAdmin(context: Context) {
  if (!onlineAdminEnabled()) throw adminProblem(404, 'Not found');
  adminOrigin(context.request, import.meta.env.DEV);
  const auth = adminAuth();
  try {
    return await auth.user(context.cookies.get(names[0])?.value);
  } catch (error: any) {
    if (error.status !== 401) throw error;
    const refresh = context.cookies.get(names[1])?.value;
    if (!refresh) throw error;
    try {
      const session = await auth.refresh(refresh);
      setAdminCookies(context, session);
      return await auth.user(session.access_token);
    } catch (refreshError) {
      clearAdminCookies(context);
      throw refreshError;
    }
  }
}
export function adminFailure(error: any) {
  return adminJson(
    { error: Number.isInteger(error?.status) ? error.message : '操作未完成，请稍后重试。' },
    Number.isInteger(error?.status) ? error.status : 500,
  );
}
