import type { APIRoute } from 'astro';
export const GET: APIRoute = () =>
  new Response(
    'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\nDisallow: /__cms/\nSitemap: https://www.elesoltree.com/sitemap.xml\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
