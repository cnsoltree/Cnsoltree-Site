import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Exercise the real production handler; only Astro's own prerendered 404 may be fetched locally.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '.vercel/output');
const staticRoot = path.join(output, 'static');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const project = readJson(path.join(root, 'vercel.json'));
const pkg = readJson(path.join(root, 'package.json'));
assert.equal(project.framework, 'astro');
assert.equal(project.buildCommand, 'npm run build');
assert.equal(project.outputDirectory, '.vercel/output/static');
assert(['22.x', '24.x'].includes(pkg.engines?.node), 'Pin a supported Vercel Node major.');
assert.equal(
  process.versions.node.split('.')[0],
  pkg.engines.node.split('.')[0],
  'Run the production handler check with the Node major pinned for Vercel.',
);

const config = readJson(path.join(output, 'config.json'));
assert.equal(config.version, 3, 'Run npm run build to generate Vercel Build Output API v3.');
for (const file of ['index.html', '404.html', 'robots.txt', 'sitemap.xml'])
  assert(fs.existsSync(path.join(staticRoot, file)), `Missing prerendered ${file}.`);
assert(
  !fs.existsSync(path.join(staticRoot, '_worker.js')),
  'Cloudflare output must not be deployed.',
);
assert(!fs.existsSync(path.join(staticRoot, 'admin')), 'The local admin must not be prerendered.');

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}
const files = filesIn(output);
for (const file of files) {
  const relative = path.relative(output, file).replaceAll('\\', '/');
  assert(
    !/(?:^|\/)(?:\.env(?:\.[^/]*)?|\.dev\.vars(?:\.[^/]*)?|\.content-backups|seo-workspace\.json)(?:\/|$)/i.test(
      relative,
    ),
    `Private file included in deployable output: ${relative}`,
  );
}
const publicText = files
  .filter(
    (file) => file.startsWith(staticRoot + path.sep) && /\.(?:html|js|json|xml|txt)$/.test(file),
  )
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');
assert(!publicText.includes('/__cms/decap-cms.js'), 'Local CMS code leaked into static output.');
assert(!publicText.includes('/src/admin/main.js'), 'Local editor entry leaked into static output.');
assert(
  !publicText.includes('SEO_OPENAI_API_KEY'),
  'Private research settings leaked into public output.',
);

const routes = config.routes ?? [];
function routesFor(url) {
  return routes.filter((route) => route.src && new RegExp(route.src).test(url));
}
for (const [from, to] of [
  ['/landing-pages', '/resources'],
  ['/products/din-rail-aerosol-fire-extinguisher', '/products/Aerosol-DIN-Rail'],
])
  assert(
    routesFor(from).some(
      (route) =>
        route.status === 301 &&
        Object.entries(route.headers ?? {}).some(
          ([name, value]) => name.toLowerCase() === 'location' && value === to,
        ),
    ),
    `Missing real permanent redirect: ${from} -> ${to}`,
  );

const functionConfigs = files.filter((file) => path.basename(file) === '.vc-config.json');
assert.equal(functionConfigs.length, 1, 'Expected one shared Node function for on-demand routes.');
const functionDir = path.dirname(functionConfigs[0]);
const functionConfig = readJson(functionConfigs[0]);
assert.equal(functionConfig.runtime, `nodejs${pkg.engines.node.slice(0, 2)}.x`);
const functionName = path.basename(functionDir, '.func');
for (const route of [
  '/api/contact',
  '/admin',
  '/blog/category/fire-suppression/aerosol-fire-extinguisher',
])
  assert(
    routesFor(route).some((item) => item.dest?.replace(/^\//, '') === functionName),
    `Missing on-demand Node route: ${route}`,
  );

const originalFetch = globalThis.fetch;
// Astro's host-validation fallback uses localhost for prerendered error pages.
const base = 'http://localhost';
const notFoundHtml = fs.readFileSync(path.join(staticRoot, '404.html'), 'utf8');
let externalCalls = 0;
const blockedFetches = [];
globalThis.fetch = async (input, init) => {
  const url = new URL(input instanceof Request ? input.url : String(input));
  const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();
  if (url.origin === base && url.pathname === '/404.html' && !url.search && method === 'GET')
    return new Response(notFoundHtml, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  externalCalls++;
  blockedFetches.push(`${method} ${url.origin}${url.pathname}`);
  throw new Error('External services are disabled during build verification.');
};
try {
  const entry = await import(pathToFileURL(path.join(functionDir, functionConfig.handler)).href);
  assert.equal(typeof entry.default?.fetch, 'function', 'Expected the Vercel 11 fetch handler.');
  const request = (pathname, options = {}) =>
    entry.default.fetch(
      new Request(`${base}${pathname}`, {
        ...options,
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      }),
    );

  for (const pathname of [
    '/admin',
    '/admin/product-preview/MCB-AC-1P',
    '/admin/article-preview/what-is-din-rail-aerosol-fire-extinguisher',
    '/__cms/content-index',
    '/__cms/seo',
    '/src/admin/main.js',
    '/src/content/settings/seo-workspace.json',
  ])
    assert.equal((await request(pathname)).status, 404, `Production must not expose ${pathname}.`);

  const taxonomy = readJson(path.join(root, 'src/content/settings/taxonomy.json'));
  let legacyRoutes = 0;
  for (const group of taxonomy.groups)
    for (const item of group.items) {
      const pathname = `/blog/category/${group.slug}/${item.slug}`;
      const response = await request(pathname);
      assert.equal(response.status, 301, `Expected a real 301 for ${pathname}.`);
      assert.equal(
        new URL(response.headers.get('location'), base).pathname,
        `/blog/category/${group.slug}`,
      );
      legacyRoutes++;
    }
  assert.equal((await request('/blog/category/unknown/unknown')).status, 404);
  assert.equal((await request('/blog/category/circuit-protection/unknown')).status, 404);
  assert.equal((await request('/api/contact')).status, 405);
  assert.equal(
    (await request('/api/contact', { headers: { 'x-astro-path': '/admin' } })).status,
    405,
    'Untrusted internal path headers must not override the requested route.',
  );
  assert.equal(
    (await request('/admin', { headers: { 'x-astro-path': '/api/contact' } })).status,
    404,
  );
  assert.equal((await request('/api/contact?x_astro_path=%2Fadmin')).status, 405);
  assert.equal(
    (
      await request('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: base },
        body: '{',
      })
    ).status,
    400,
  );
  const invalid = await request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: base },
    body: JSON.stringify({ name: '', email: 'invalid', message: '' }),
  });
  assert.equal(invalid.status, 422);
  assert.equal((await invalid.json()).success, false);
  assert.equal(
    externalCalls,
    0,
    `Unexpected fetches (origin/path only): ${JSON.stringify(blockedFetches)}`,
  );
  console.log(
    `PASS: Vercel static output + ${functionConfig.runtime} function, ${legacyRoutes} real legacy 301s, private admin 404s, safe contact failures; no external service calls.`,
  );
} finally {
  globalThis.fetch = originalFetch;
}
