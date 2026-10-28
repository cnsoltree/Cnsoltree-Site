import type { APIRoute } from 'astro';
import { cloudContentPaths, handleCloudContent } from '../../lib/admin-content';
import { adminBody, adminJson, adminProblem } from '../../lib/admin-auth.mjs';
import { adminFailure, requireAdmin } from '../../lib/admin-server';

export const prerender = false;
export const ALL: APIRoute = async (context) => {
  try {
    const name = context.params.path ?? '';
    if (!cloudContentPaths.has(name)) throw adminProblem(404, '接口不存在。');
    await requireAdmin(context);
    const method = context.request.method;
    const input = method === 'POST' ? await adminBody(context.request, 262_144) : undefined;
    const result = await handleCloudContent(name, method, input);
    return adminJson(result.value, result.status);
  } catch (error) {
    return adminFailure(error);
  }
};
