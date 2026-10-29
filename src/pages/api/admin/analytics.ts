import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { requireAdmin, adminFailure } from '@/lib/admin-server';
import { adminJson, adminProblem } from '@/lib/admin-auth.mjs';
import { createGscProvider } from '@/lib/admin-gsc.mjs';
import { createUnavailableReport, validateRange } from '@/admin/analytics-model.mjs';

export const prerender = false;
let provider: ReturnType<typeof createGscProvider> | undefined;
export const GET: APIRoute = async (context) => {
  try {
    await requireAdmin(context);
    const query = new URL(context.request.url).searchParams;
    const source = query.get('source') || 'search';
    const range = { startDate: query.get('startDate'), endDate: query.get('endDate') };
    const problem = validateRange(range);
    if (problem) throw adminProblem(422, problem);
    if (source !== 'search') throw adminProblem(422, '数据来源无效。');
    if (!getSecret('GSC_SERVICE_ACCOUNT_JSON'))
      return adminJson(createUnavailableReport({ source, range }));
    provider ??= createGscProvider({
      credential: getSecret('GSC_SERVICE_ACCOUNT_JSON'),
      property: getSecret('GSC_PROPERTY'),
    });
    return adminJson(await provider.report(range, { refresh: query.get('refresh') === 'true' }));
  } catch (error) {
    return adminFailure(error);
  }
};
