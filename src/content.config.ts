import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  products: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/products' }),
  }),
  articles: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/articles' }),
  }),
};
