import type { APIRoute } from 'astro';
import { allArticleGroups } from '@/lib/product-taxonomy';
import { blogCategoryHref } from '@/lib/blog-taxonomy';

// Preserve existing topic URLs while the public blog now groups articles by family only.
export const prerender = false;
export const GET: APIRoute = ({ params, redirect }) => {
  const family = allArticleGroups.find((group) => group.slug === params.group);
  if (!family?.items.some((item) => item.slug === params.topic))
    return new Response('Not found', { status: 404 });
  return redirect(blogCategoryHref(family.slug), 301);
};
