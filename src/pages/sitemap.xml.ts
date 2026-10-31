import type { APIRoute } from 'astro';
import { products, categories, blogPosts } from '@/lib/data';
import { escapeHtml } from '@/lib/contact';
import { allProductGroups, allArticleGroups } from '@/lib/product-taxonomy';
import {
  landingPages,
  resourceCategoryHref,
  resourceTopicHref,
  resourceTopicSlug,
  matchesResource,
} from '@/lib/landing-pages';
import { blogCategoryHref, matchesBlogGroup } from '@/lib/blog-taxonomy';
import { alternates, translatedLangs } from '@/i18n';
export const GET: APIRoute = () => {
  const routes = [
    '/',
    '/products',
    '/blog',
    '/resources',
    ...allProductGroups
      .filter((group) => landingPages.some((page) => matchesResource(page, group.slug)))
      .map((group) => resourceCategoryHref(group.slug)),
    ...allProductGroups.flatMap((group) =>
      group.items
        .filter((item) =>
          landingPages.some((page) => matchesResource(page, group.slug, resourceTopicSlug(item))),
        )
        .map((item) => resourceTopicHref(group.slug, item)),
    ),
    ...allArticleGroups
      .filter((group) => blogPosts.some((post) => matchesBlogGroup(post, group)))
      .map((group) => blogCategoryHref(group.slug)),
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/solutions/aerosol-fire-extinguisher',
    ...categories.map((category) => `/categories/${category.slug}`),
    ...products.map((product) => `/products/${product.id}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];
  // 其他语言只收录真实存在的翻译页面
  routes.push(
    ...routes.flatMap((route) =>
      alternates(route)
        .filter((version) => translatedLangs.includes(version.lang))
        .map((version) => version.path),
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
      .map((route) => {
        const post = blogPosts.find((post) => route === `/blog/${post.slug}`);
        return `<url><loc>${escapeHtml(new URL(route, 'https://www.elesoltree.com').href)}</loc>${post ? `<lastmod>${new Date(post.dateModified ?? post.date).toISOString()}</lastmod>` : ''}</url>`;
      })
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
