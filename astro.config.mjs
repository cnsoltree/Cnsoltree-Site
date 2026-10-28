import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { createReadStream, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  createProductAdminHandler,
  createArticleAdminHandler,
} from './scripts/product-admin-api.mjs';
import { createTaxonomyAdminHandler } from './scripts/taxonomy-admin-api.mjs';
import { createSeoAdminHandler } from './scripts/seo-admin-api.mjs';
import { createSeoResearchProvider } from './scripts/seo-research-provider.mjs';
import { loadEnv } from 'vite';

const localRoot = fileURLToPath(new URL('.', import.meta.url));
const seoResearch = createSeoResearchProvider({
  getConfig: () => {
    const settings = { ...loadEnv('development', localRoot, 'SEO_'), ...process.env };
    return { apiKey: settings.SEO_OPENAI_API_KEY, model: settings.SEO_OPENAI_MODEL };
  },
});

export default defineConfig({
  site: 'https://www.elesoltree.com',
  output: 'static',
  // Preserve existing inline text spacing across the Astro 7 compiler upgrade.
  compressHTML: true,
  trailingSlash: 'never',
  redirects: {
    '/landing-pages': { status: 301, destination: '/resources' },
    '/products/din-rail-aerosol-fire-extinguisher': {
      status: 301,
      destination: '/products/Aerosol-DIN-Rail',
    },
  },
  // Keep catalog images generated at build time, alongside the prerendered public pages.
  adapter: vercel({ imageService: false }),
  vite: {
    optimizeDeps: { exclude: ['decap-cms-locales'] },
    plugins: [
      tailwindcss(),
      {
        name: 'local-content-admin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Internal knowledge and planning records are served only through the local admin API.
            let pathname;
            try {
              pathname = decodeURIComponent((req.url ?? '').split('?')[0]).replaceAll('\\', '/');
            } catch {
              res.statusCode = 400;
              res.end();
              return;
            }
            if (/(?:^|\/)seo-workspace\.json(?:\.(?:tmp|verify)-[^/]*)?$/i.test(pathname)) {
              res.statusCode = 404;
              res.end();
              return;
            }
            next();
          });
          server.middlewares.use(
            '/__cms/seo',
            createSeoAdminHandler({ root: localRoot, ...seoResearch }),
          );
          server.middlewares.use(
            '/__cms/taxonomy',
            createTaxonomyAdminHandler({
              root: fileURLToPath(new URL('.', import.meta.url)),
              getLandingPages: async () =>
                (await server.ssrLoadModule('/src/lib/landing-pages.ts')).landingPages,
            }),
          );
          server.middlewares.use(
            '/__cms/articles',
            createArticleAdminHandler({
              root: fileURLToPath(new URL('.', import.meta.url)),
              getCategories: async () =>
                (await server.ssrLoadModule('/src/lib/data.ts')).categories,
              validateArticle: async (record) =>
                (await server.ssrLoadModule('/src/lib/data.ts')).loadBlogPosts([record]),
            }),
          );
          server.middlewares.use(
            '/__cms/products',
            createProductAdminHandler({
              root: fileURLToPath(new URL('.', import.meta.url)),
              getCategories: async () =>
                (await server.ssrLoadModule('/src/lib/data.ts')).categories,
              validateProduct: async (record) =>
                (await server.ssrLoadModule('/src/lib/data.ts')).loadProducts([record]),
            }),
          );
          server.middlewares.use('/__cms', (req, res) => {
            const filename = (req.url ?? '').split('?')[0].slice(1);
            if (filename === 'content-index') {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'no-store');
              res.setHeader('X-Robots-Tag', 'noindex, nofollow');
              try {
                const index = {};
                index.productMeta = {};
                index.articleMeta = {};
                for (const [folder, key] of [
                  ['products', 'id'],
                  ['articles', 'slug'],
                ]) {
                  const directory = fileURLToPath(
                    new URL(`./src/content/${folder}/`, import.meta.url),
                  );
                  index[folder] = Object.fromEntries(
                    readdirSync(directory)
                      .filter((name) => name.endsWith('.json'))
                      .map((name) => {
                        const record = JSON.parse(readFileSync(`${directory}/${name}`, 'utf8'));
                        const entry = name.slice(0, -5);
                        if (folder === 'products')
                          index.productMeta[entry] = Object.fromEntries(
                            ['createdAt', 'updatedAt', 'deletedAt']
                              .filter((field) => record[field])
                              .map((field) => [field, record[field]]),
                          );
                        else
                          index.articleMeta[entry] = Object.fromEntries(
                            ['dateModified', 'deletedAt']
                              .filter((field) => record[field])
                              .map((field) => [field, record[field]]),
                          );
                        return [entry, record[key]];
                      }),
                  );
                }
                res.end(JSON.stringify(index));
              } catch {
                res.statusCode = 503;
                res.end(JSON.stringify({ error: 'Content index unavailable.' }));
              }
              return;
            }
            if (!/^[\w.-]+\.(?:js|css|wasm)$/.test(filename)) {
              res.statusCode = 404;
              res.end();
              return;
            }
            res.setHeader(
              'Content-Type',
              filename.endsWith('.wasm')
                ? 'application/wasm'
                : filename.endsWith('.css')
                  ? 'text/css; charset=utf-8'
                  : 'application/javascript; charset=utf-8',
            );
            res.setHeader('X-Robots-Tag', 'noindex, nofollow');
            const stream = createReadStream(
              fileURLToPath(new URL(`./node_modules/decap-cms/dist/${filename}`, import.meta.url)),
            );
            stream.on('error', () => {
              res.statusCode = 503;
              res.end('Install the project dependencies before opening the content admin.');
            });
            stream.pipe(res);
          });
        },
      },
    ],
  },
});
