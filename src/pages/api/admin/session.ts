import type { APIRoute } from 'astro';
import {
  adminAuth,
  adminFailure,
  onlineAdminEnabled,
  requireAdmin,
  setAdminCookies,
  clearAdminCookies,
} from '@/lib/admin-server';
import { adminBody, adminOrigin, adminJson, adminProblem } from '@/lib/admin-auth.mjs';

export const prerender = false;
export const POST: APIRoute = async (context) => {
  try {
    if (!onlineAdminEnabled()) throw adminProblem(404, 'Not found');
    adminOrigin(context.request, import.meta.env.DEV);
    const input = await adminBody(context.request, 4096);
    const session = await adminAuth().login(input.email, input.password);
    setAdminCookies(context, session);
    return adminJson({ success: true, redirect: '/admin' });
  } catch (error) {
    return adminFailure(error);
  }
};
export const GET: APIRoute = async (context) => {
  try {
    return adminJson({ user: await requireAdmin(context) });
  } catch (error) {
    return adminFailure(error);
  }
};
export const DELETE: APIRoute = async (context) => {
  try {
    if (!onlineAdminEnabled()) throw adminProblem(404, 'Not found');
    adminOrigin(context.request, import.meta.env.DEV);
    const access = context.cookies.get('soltree-admin-access')?.value;
    try {
      await adminAuth().logout(access);
    } finally {
      clearAdminCookies(context);
    }
    return adminJson({ success: true });
  } catch (error) {
    return adminFailure(error);
  }
};
