import { matchesTaxonomyArticle, matchesTaxonomyArticleGroup } from './taxonomy-model.mjs';
import type { BlogPost } from './data';
import type { ProductSubcategory } from './product-taxonomy';

export function blogCategoryHref(slug: string) {
  return `/blog/category/${slug}`;
}
export function blogTopicSlug(item: ProductSubcategory) {
  return item.slug;
}
export function blogTopicHref(group: string, item: ProductSubcategory) {
  return `${blogCategoryHref(group)}/${blogTopicSlug(item)}`;
}
export function matchesBlogTopic(post: BlogPost, item: ProductSubcategory) {
  return matchesTaxonomyArticle(post, item);
}
export function matchesBlogGroup(
  post: BlogPost,
  group: { slug: string; items: ProductSubcategory[] },
) {
  return matchesTaxonomyArticleGroup(post, group);
}
