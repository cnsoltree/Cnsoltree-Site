import type { APIRoute } from 'astro';
import { blogPosts } from '@/lib/data';
import { escapeHtml } from '@/lib/contact';
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Soltree Technical Resources</title><link>https://www.elesoltree.com/blog</link><description>Electrical protection guides from Soltree.</description>${blogPosts.map((post) => `<item><title>${escapeHtml(post.title)}</title><link>https://www.elesoltree.com/blog/${escapeHtml(post.slug)}</link><guid>https://www.elesoltree.com/blog/${escapeHtml(post.slug)}</guid><description>${escapeHtml(post.excerpt)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
