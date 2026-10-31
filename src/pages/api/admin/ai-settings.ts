import type { APIRoute } from 'astro';
import { adminFailure } from '@/lib/admin-server';
import { adminBody, adminJson } from '@/lib/admin-auth.mjs';
import { adminAiContext } from '@/lib/admin-ai-server';

export const prerender = false;
const handle: APIRoute = async (context) => {
  try {
    const { service } = await adminAiContext(context);
    return adminJson(
      context.request.method === 'GET'
        ? await service.read()
        : await service.act(await adminBody(context.request, 4096)),
    );
  } catch (error) {
    return adminFailure(error);
  }
};
export const GET = handle;
export const POST = handle;
