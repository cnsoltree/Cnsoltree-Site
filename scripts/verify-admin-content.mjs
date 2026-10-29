import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import { rawJson } from '../src/lib/admin-workspace.mjs';

const root = new URL('../', import.meta.url);
const moduleUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const stateKey = Symbol.for('soltree-cloud-content-test');
const previous = globalThis[stateKey];
const originalFetch = globalThis.fetch;
const state = {
  current: null,
  writes: 0,
  scratch: [],
  enabled: true,
  user: true,
  secretReads: [],
  seed: null,
};
globalThis[stateKey] = state;
globalThis.fetch = async () => {
  throw new Error('Offline cloud content verification forbids external requests.');
};
const authUrl = new URL('src/lib/admin-auth.mjs', root).href;
const workspaceUrl = new URL('src/lib/admin-workspace.mjs', root).href;
const stateSource = `globalThis[Symbol.for('soltree-cloud-content-test')]`;
const serverModule =
  moduleUrl(`import {adminJson,adminProblem,adminOrigin} from ${JSON.stringify(authUrl)};
  export const adminStore = () => ${stateSource}.store;
  export async function requireAdmin(context) {
    const state=${stateSource};
    if(!state.enabled) throw adminProblem(404,'Not found');
    adminOrigin(context.request);
    if(!state.user) throw adminProblem(401,'请先登录后台。');
    return {email:'jacky@cnsoltree.com'};
  }
  export const adminFailure = error => adminJson({error:error.message},error.status||500);`);
const workspaceModule = moduleUrl(`import * as workspace from ${JSON.stringify(workspaceUrl)};
  export const {collectWorkspace,emptySeo,localHandler,writableWorkspace}=workspace;
  export const withWorkspace=(document,images,callback)=>workspace.withWorkspace(document,images,async root=>{
    ${stateSource}.scratch.push(root); return callback(root);
  });`);
const compile = (source, filename, replacements = {}) => {
  const code = ts.transpileModule(source, {
    fileName: filename.pathname,
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return code.replace(
    /(from\s+)(['"])([^'"]+)\2/g,
    (_match, prefix, _quote, specifier) =>
      `${prefix}${JSON.stringify(replacements[specifier] ?? (specifier.startsWith('.') ? new URL(specifier, filename).href : specifier))}`,
  );
};
const taxonomy = {
  version: 1,
  categories: [
    {
      slug: 'circuit-breaker',
      name: 'Cloud Breakers',
      shortDescription: 'Breakers.',
      description: 'Cloud category.',
      image: '/images/categories/fixture.png',
    },
  ],
  groups: [
    {
      slug: 'circuit-protection',
      name: 'Circuit Protection',
      description: 'Protection family.',
      icon: 'M3 3h18v18H3Z',
      products: { visible: true, order: 0 },
      articles: { visible: true, order: 0 },
      items: [
        {
          slug: 'mcb',
          name: 'MCB',
          category: 'circuit-breaker',
          type: 'MCB',
          products: { visible: true, order: 0 },
          articles: { visible: true, order: 0 },
        },
      ],
    },
  ],
};
const product = {
  id: 'MCB-ONE',
  name: 'MCB One',
  slug: 'mcb-one',
  categorySlug: 'circuit-breaker',
  categoryName: 'Old label',
  productTypes: ['MCB'],
  shortDescription: 'Fixture breaker.',
  description: 'Fixture product detail.',
  features: [],
  specs: [],
  image: '/images/cover.jpg',
  published: false,
};
const article = {
  slug: 'mcb-guide',
  title: 'MCB Guide',
  excerpt: 'Fixture selection guide.',
  content: '## Selection\n\nCheck the actual datasheet.',
  relatedCategorySlug: 'circuit-breaker',
  relatedProductTypes: ['MCB'],
  tags: ['MCB'],
  author: 'Fixture',
  date: '2026-10-28',
  readingTime: 1,
  image: '/images/COVER.JPG',
  published: false,
};
const productPath = 'src/content/products/mcb-one.json';
const articlePath = 'src/content/articles/mcb-guide.json';
const taxonomyPath = 'src/content/settings/taxonomy.json';
const seoPath = 'src/content/settings/seo-workspace.json';
state.seed = {
  version: 1,
  files: {
    [productPath]: rawJson(product),
    [articlePath]: rawJson(article),
    [taxonomyPath]: rawJson(taxonomy),
  },
  sourceManifest: { [productPath]: 'a'.repeat(40) },
  media: {},
  publication: null,
};
state.store = {
  async load() {
    return structuredClone(state.current);
  },
  async initialize(document) {
    if (!state.current) state.current = { revision: 1, document: structuredClone(document) };
    return structuredClone(state.current);
  },
  async save(revision, document) {
    if (state.current.revision !== revision)
      throw Object.assign(new Error('Cloud CAS conflict'), { status: 409 });
    state.current = { revision: revision + 1, document: structuredClone(document) };
    state.writes++;
    return structuredClone(state.current);
  },
};

try {
  // Run the actual data validators, replacing only build-time glob/catalog imports with empty fixtures.
  const dataFile = new URL('src/lib/data.ts', root);
  let dataSource = await fs.readFile(dataFile, 'utf8');
  const globs = [...dataSource.matchAll(/import\.meta\.glob\([\s\S]*?\}\)/g)];
  assert.equal(globs.length, 2);
  dataSource = dataSource.replace(/import\.meta\.glob\([\s\S]*?\}\)/g, '{}');
  const dataModule = moduleUrl(
    compile(dataSource, dataFile, {
      './taxonomy': moduleUrl('export const categories=[];export const allCategories=[];'),
    }),
  );
  const imageModule = moduleUrl(
    'export default ["/images/COVER.JPG","/images/categories/fixture.png"];',
  );
  const validationFile = new URL('src/lib/admin-validation.ts', root);
  const validationModule = moduleUrl(
    compile(await fs.readFile(validationFile, 'utf8'), validationFile, {
      './data': dataModule,
      '../admin/image-index.json': imageModule,
    }),
  );
  const contentFile = new URL('src/lib/admin-content.ts', root);
  const contentModule = moduleUrl(
    compile(await fs.readFile(contentFile, 'utf8'), contentFile, {
      'astro:env/server': moduleUrl(
        `export const getSecret=key=>{${stateSource}.secretReads.push(key);return undefined;};`,
      ),
      '../admin/image-index.json': imageModule,
      './admin-server': serverModule,
      './admin-seed': moduleUrl(`export const adminSeed=()=>structuredClone(${stateSource}.seed);`),
      './admin-workspace.mjs': workspaceModule,
      './data': dataModule,
      './admin-validation': validationModule,
      './landing-pages': moduleUrl('export const landingPages=[];'),
    }),
  );
  const { loadCloudWorkspace, handleCloudContent, getCloudRecord } = await import(contentModule);
  const current = await loadCloudWorkspace();
  assert.equal(current.revision, 1);
  assert.deepEqual(
    JSON.parse(current.document.files[seoPath]),
    { version: 1, knowledge: [], batches: [], tasks: [] },
    'Private SEO data initializes empty rather than reading a bundled private file',
  );
  assert(
    !Object.hasOwn(state.seed.files, seoPath),
    'Seeding does not mutate the supplied source fixture',
  );
  let result = await handleCloudContent('products', 'GET');
  assert.equal(result.status, 200);
  assert.equal(result.value.products[0].entryKey, 'mcb-one');
  assert.equal(result.value.products[0].image, '/images/COVER.JPG');
  assert.equal(
    result.value.products[0].categoryName,
    'Cloud Breakers',
    'DTOs must resolve current cloud taxonomy labels',
  );
  const row = result.value.products[0];
  result = await handleCloudContent('products', 'POST', {
    id: row.id,
    action: 'publish',
    revision: row.revision,
  });
  assert.equal(result.status, 200, JSON.stringify(result.value));
  assert.equal(
    result.value.product.published,
    true,
    'Actual loader must receive cloud categories, not the empty build-time fixture',
  );
  assert.equal(state.writes, 1);
  assert.equal(JSON.parse(state.current.document.files[productPath]).published, true);
  const index = await handleCloudContent('content-index', 'GET');
  assert.equal(index.value.products['mcb-one'], product.id);
  assert(index.value.productMeta['mcb-one'].updatedAt);
  assert.equal(index.value.articles['mcb-guide'], article.slug);
  assert.equal((await getCloudRecord('products', product.id)).entryKey, 'mcb-one');
  assert.equal(await getCloudRecord('articles', 'missing'), null);

  const articleList = await handleCloudContent('articles', 'GET');
  const articleRow = articleList.value.articles[0];
  result = await handleCloudContent('articles', 'POST', {
    id: articleRow.id,
    action: 'publish',
    revision: articleRow.revision,
  });
  assert.equal(result.status, 200, JSON.stringify(result.value));
  assert.equal(result.value.article.published, true);
  assert.equal(result.value.article.date, article.date);
  const bad = JSON.parse(state.current.document.files[productPath]);
  delete bad.description;
  bad.published = false;
  state.current.document.files[productPath] = rawJson(bad);
  state.current.revision++;
  const beforeFailure = state.writes;
  const badRow = (await handleCloudContent('products', 'GET')).value.products[0];
  assert.equal(
    (
      await handleCloudContent('products', 'POST', {
        id: badRow.id,
        action: 'publish',
        revision: badRow.revision,
      })
    ).status,
    422,
  );
  assert.equal(state.writes, beforeFailure, 'Failed local validation cannot write cloud state');
  assert.equal(JSON.parse(state.current.document.files[productPath]).published, false);
  state.current.document.files[productPath] = rawJson({ ...product, image: '/images/missing.png' });
  state.current.revision++;
  const missingImageRow = (await handleCloudContent('products', 'GET')).value.products[0];
  assert.equal(
    (
      await handleCloudContent('products', 'POST', {
        id: missingImageRow.id,
        action: 'publish',
        revision: missingImageRow.revision,
      })
    ).status,
    422,
  );
  assert.equal(
    state.writes,
    beforeFailure,
    'Missing images must be rejected before cloud publication',
  );
  state.current.document.files[productPath] = rawJson({ ...product, published: true });
  state.current.revision++;
  const concurrentRow = (await handleCloudContent('products', 'GET')).value.products[0];
  const concurrent = await Promise.allSettled([
    handleCloudContent('products', 'POST', {
      id: concurrentRow.id,
      action: 'unpublish',
      revision: concurrentRow.revision,
    }),
    handleCloudContent('products', 'POST', {
      id: concurrentRow.id,
      action: 'delete',
      revision: concurrentRow.revision,
    }),
  ]);
  assert.equal(concurrent.filter(({ status }) => status === 'fulfilled').length, 1);
  assert.equal(
    concurrent.find(({ status }) => status === 'rejected').reason.status,
    409,
    'Separate scratch snapshots still obey one durable cloud CAS',
  );

  const cloudTaxonomy = await handleCloudContent('taxonomy', 'GET');
  const renamed = structuredClone(cloudTaxonomy.value.taxonomy);
  renamed.categories[0].name = 'Renamed Cloud Category';
  result = await handleCloudContent('taxonomy', 'POST', {
    revision: cloudTaxonomy.value.revision,
    taxonomy: renamed,
  });
  assert.equal(result.status, 200, JSON.stringify(result.value));
  assert.equal(
    (await handleCloudContent('articles', 'GET')).value.articles[0].categoryName,
    'Renamed Cloud Category',
  );
  const seo = await handleCloudContent('seo', 'GET');
  assert.equal(seo.value.capabilities.researchConfigured, false);
  result = await handleCloudContent('seo', 'POST', {
    revision: seo.value.revision,
    action: 'saveKnowledge',
    entry: {
      title: 'Private cloud note',
      content: 'Unpublished internal note.',
      status: 'draft',
      enabled: false,
    },
  });
  assert.equal(result.status, 200, JSON.stringify(result.value));
  assert.equal(
    JSON.parse(state.current.document.files[seoPath]).knowledge[0].title,
    'Private cloud note',
  );
  assert.deepEqual(
    state.current.document.sourceManifest,
    state.seed.sourceManifest,
    'Admin saves must preserve the publication source baseline',
  );
  state.current.document.publication = { id: 'release', status: 'preparing' };
  const lockedWrites = state.writes;
  await assert.rejects(
    () =>
      handleCloudContent('articles', 'POST', {
        id: articleRow.id,
        action: 'unpublish',
        revision: articleRow.revision,
      }),
    (error) => error.status === 409,
  );
  assert.equal(state.writes, lockedWrites);
  assert.equal(
    (await handleCloudContent('articles', 'GET')).status,
    200,
    'Publication freezes writes but not authenticated reads',
  );
  state.current.document.publication = null;
  await assert.rejects(
    () => handleCloudContent('decap-cms.js', 'GET'),
    (error) => error.status === 404,
  );
  await assert.rejects(
    () => handleCloudContent('content-index', 'POST', {}),
    (error) => error.status === 405,
  );

  const routeFile = new URL('src/pages/__cms/[...path].ts', root);
  const routeModule = moduleUrl(
    compile(await fs.readFile(routeFile, 'utf8'), routeFile, {
      '../../lib/admin-content': contentModule,
      '../../lib/admin-server': serverModule,
    }),
  );
  const { ALL, prerender } = await import(routeModule);
  assert.equal(prerender, false);
  const context = (name, method = 'GET', body) => ({
    params: { path: name },
    request: new Request(`https://www.elesoltree.com/__cms/${name}`, {
      method,
      ...(body !== undefined
        ? {
            body,
            headers: { Origin: 'https://www.elesoltree.com', 'Content-Type': 'application/json' },
          }
        : {}),
    }),
  });
  state.enabled = false;
  assert.equal((await ALL(context('products'))).status, 404);
  state.enabled = true;
  state.user = false;
  assert.equal((await ALL(context('products'))).status, 401);
  assert.equal((await ALL(context('decap-cms.js'))).status, 404);
  state.user = true;
  const privateList = await ALL(context('products'));
  assert.equal(privateList.status, 200);
  assert.equal(privateList.headers.get('cache-control'), 'private, no-store');
  assert(privateList.headers.get('x-robots-tag').includes('noindex'));
  assert.equal((await ALL(context('products', 'POST', '{bad'))).status, 400);
  assert.equal((await ALL(context('products', 'PUT', '{}'))).status, 405);
  for (const directory of state.scratch)
    await assert.rejects(
      () => fs.access(directory),
      (error) => error.code === 'ENOENT',
    );
  console.log(
    'PASS: cloud content compatibility using real local handlers/validators, empty private seed, taxonomy labels, publication guard, outer CAS, content index, protected routes and scratch cleanup; no network or real content writes.',
  );
} finally {
  globalThis.fetch = originalFetch;
  if (previous === undefined) delete globalThis[stateKey];
  else globalThis[stateKey] = previous;
}
