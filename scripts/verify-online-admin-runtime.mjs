import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { safeAdminDestination } from '../src/admin/login.js';

assert.equal(
  process.versions.node.split('.')[0],
  '22',
  'Run this deployable-function check with the pinned Node 22 runtime.',
);
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '.vercel/output');
const functionSource = path.join(output, 'functions/_render.func');
const config = JSON.parse(await fs.readFile(path.join(functionSource, '.vc-config.json'), 'utf8'));
assert.equal(config.runtime, 'nodejs22.x');
const site = 'https://www.elesoltree.com';
const database = 'https://offline.supabase.test';
// Override test values before the actual built astro:env module and adapter are imported.
Object.assign(process.env, {
  ADMIN_ONLINE_ENABLED: 'true',
  NEXT_PUBLIC_SUPABASE_URL: database,
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
  ADMIN_GITHUB_TOKEN: 'test-github-token',
});

const taxonomyRaw = await fs.readFile(
  path.join(root, 'src/content/settings/taxonomy.json'),
  'utf8',
);
const taxonomy = JSON.parse(taxonomyRaw);
const category = taxonomy.categories.find((entry) => !entry.deletedAt);
const images = JSON.parse(await fs.readFile(path.join(root, 'src/admin/image-index.json'), 'utf8'));
const image = images.find((name) => name.startsWith('/images/products/') && /\.jpe?g$/i.test(name));
assert(category && image, 'Build the public image index before running this check.');
const productId = 'CLOUD-RUNTIME-DRAFT';
const productPath = `src/content/products/${productId}.json`;
const product = {
  id: productId,
  name: 'Offline Runtime Draft',
  slug: 'offline-runtime-draft',
  categorySlug: category.slug,
  categoryName: category.name,
  shortDescription: 'Cloud-only fixture for the built handler.',
  description: 'A private draft saved only in this in-memory test. Never published.',
  features: [],
  specs: [],
  image,
  published: false,
};
let workspace = {
  revision: 1,
  document: {
    version: 1,
    files: {
      [productPath]: `${JSON.stringify(product, null, 2)}\n`,
      'src/content/settings/taxonomy.json': taxonomyRaw,
      'src/content/settings/seo-workspace.json':
        '{"version":1,"knowledge":[],"batches":[],"tasks":[]}',
    },
    media: {},
    publication: null,
    sourceManifest: {},
  },
};
const accessToken = 'offline-access-token';
const refreshToken = 'offline-refresh-token';
const email = 'jacky@cnsoltree.com';
const account = { id: 'offline-admin-user', email, email_confirmed_at: '2026-10-28T00:00:00.000Z' };
const activeCookies = `soltree-admin-access=${accessToken}; soltree-admin-refresh=${refreshToken}`;
const calls = [];
const unexpected = [];
let passwordCalls = 0;
let refreshCalls = 0;
let writes = 0;
let conflictNextSave = false;
const originalFetch = globalThis.fetch;
const notFoundHtml = await fs.readFile(path.join(output, 'static/404.html'), 'utf8');
const publicHome = await fs.readFile(path.join(output, 'static/index.html'), 'utf8');
const json = (value, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });

globalThis.fetch = async (input, init) => {
  const request = new Request(input, init);
  const url = new URL(request.url);
  calls.push(`${request.method} ${url.origin}${url.pathname}`);
  // Astro may fetch its prerendered error page after host normalization; serve that local artifact only.
  if (
    [site, 'http://localhost', 'https://localhost'].includes(url.origin) &&
    url.pathname === '/404.html' &&
    request.method === 'GET'
  )
    return new Response(notFoundHtml, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  if (url.origin !== database) {
    unexpected.push(`${request.method} ${url.origin}${url.pathname}`);
    throw new Error(
      'All real network calls are forbidden during online admin runtime verification.',
    );
  }
  assert.equal(request.headers.get('apikey'), 'test-service-key');
  if (url.pathname === '/auth/v1/user') {
    const token = request.headers.get('authorization');
    if (token === `Bearer ${accessToken}`) return json(account);
    if (token === 'Bearer other-account') return json({ ...account, email: 'other@example.com' });
    return json({ message: 'Expired fixture access token' }, 401);
  }
  if (url.pathname === '/auth/v1/token') {
    const body = await request.json();
    if (url.searchParams.get('grant_type') === 'password') {
      passwordCalls++;
      assert.equal(body.email, email);
      if (body.password !== 'offline-password-only')
        return json({ message: 'Wrong fixture password' }, 400);
    } else {
      assert.equal(url.searchParams.get('grant_type'), 'refresh_token');
      refreshCalls++;
      if (body.refresh_token !== refreshToken)
        return json({ message: 'Expired fixture refresh token' }, 400);
    }
    return json({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600,
      user: account,
    });
  }
  if (url.pathname === '/auth/v1/logout') return new Response(null, { status: 204 });
  assert.equal(request.headers.get('authorization'), 'Bearer test-service-key');
  if (url.pathname === '/rest/v1/soltree_admin_workspace') {
    if (request.method === 'GET') {
      assert.equal(url.searchParams.get('key'), 'eq.main');
      return json(workspace ? [structuredClone(workspace)] : []);
    }
    assert.equal(request.method, 'POST');
    assert(request.headers.get('prefer').includes('resolution=ignore-duplicates'));
    const row = await request.json();
    if (!workspace) workspace = { revision: 1, document: row.document };
    return new Response(null, { status: 204 });
  }
  if (url.pathname === '/rest/v1/rpc/soltree_admin_save') {
    assert.equal(request.method, 'POST');
    const body = await request.json();
    if (conflictNextSave) {
      conflictNextSave = false;
      workspace.revision++;
      return json({ code: '40001', message: 'Fixture concurrent update' }, 500);
    }
    if (body.expected_revision !== workspace.revision)
      return json({ code: '40001', message: 'Fixture stale revision' }, 500);
    workspace = { revision: workspace.revision + 1, document: body.next_document };
    writes++;
    return json([structuredClone(workspace)]);
  }
  unexpected.push(`${request.method} ${url.origin}${url.pathname}`);
  throw new Error('Unexpected offline Supabase endpoint.');
};

// Run outside the repository so ancestor node_modules cannot hide missing traced dependencies.
const functionRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'soltree-function-runtime-'));
try {
  await fs.cp(functionSource, functionRoot, { recursive: true });
  const entry = await import(pathToFileURL(path.join(functionRoot, config.handler)).href);
  assert.equal(
    typeof entry.default?.fetch,
    'function',
    'Expected the current Vercel fetch entry, not a legacy Node HTTP listener.',
  );
  const responsePaths = new WeakMap();
  const request = async (
    pathname,
    { method = 'GET', body, cookie, origin = site, headers = {} } = {},
  ) => {
    const response = await entry.default.fetch(
      new Request(`${site}${pathname}`, {
        method,
        headers: {
          ...(cookie ? { Cookie: cookie } : {}),
          ...(method !== 'GET' && method !== 'HEAD'
            ? { Origin: origin, 'Content-Type': 'application/json' }
            : {}),
          ...headers,
        },
        ...(body !== undefined
          ? { body: typeof body === 'string' ? body : JSON.stringify(body) }
          : {}),
        redirect: 'manual',
        signal: AbortSignal.timeout(20_000),
      }),
    );
    responsePaths.set(response, `${method} ${pathname}`);
    return response;
  };
  const data = async (response, status) => {
    assert.equal(
      response.status,
      status,
      `${responsePaths.get(response)} returned ${response.status}; expected ${status}`,
    );
    const raw = await response.text();
    assert(
      !raw.includes('test-service-key') && !raw.includes('test-github-token'),
      'Server keys must never appear in response bodies.',
    );
    return JSON.parse(raw);
  };

  const anonymous = await request('/admin');
  assert.equal(anonymous.status, 303);
  assert.equal(new URL(anonymous.headers.get('location'), site).pathname, '/admin/login');
  const cleanRoutes = [
    '/admin/analytics',
    '/admin/seo',
    '/admin/products',
    '/admin/articles',
    '/admin/groups',
    '/admin/knowledge',
    '/admin/products/new',
    '/admin/articles/new',
    `/admin/products/${productId}/edit`,
    '/admin/articles/runtime-article/edit',
  ];
  for (const pathname of cleanRoutes) {
    const response = await request(pathname);
    assert.equal(response.status, 303, `Anonymous clean route must require login: ${pathname}`);
    const login = new URL(response.headers.get('location'), site);
    assert.equal(login.origin, site);
    assert.equal(login.pathname, '/admin/login');
    assert.equal(login.searchParams.get('next'), pathname);
    assert.equal(safeAdminDestination(login.searchParams.get('next')), pathname);
    assert(response.headers.get('x-robots-tag')?.includes('noindex'));
    assert(/no-store/.test(response.headers.get('cache-control')));
  }
  for (const pathname of [
    '/admin/unknown',
    '/admin/analytics/extra',
    '/admin/products/item/delete',
    '/admin/products/item/edit/extra',
    '/admin/products/%2F/edit',
    '/admin/articles/%5Cevil/edit',
  ]) {
    assert.equal((await request(pathname)).status, 404, `Unknown admin route: ${pathname}`);
    assert.equal(
      (await request(pathname, { cookie: activeCookies })).status,
      404,
      `Authentication must not turn unknown routes into the editor: ${pathname}`,
    );
  }
  await data(
    await request('/api/admin/proxy', {
      method: 'POST',
      body: { action: 'getEntry', params: { path: productPath } },
    }),
    401,
  );
  const loginPage = await request('/admin/login');
  assert.equal(loginPage.status, 200);
  assert((await loginPage.text()).includes('data-admin-login'));
  const beforeWrongAccount = passwordCalls;
  await data(
    await request('/api/admin/session', {
      method: 'POST',
      body: { email: 'other@example.com', password: 'offline-password-only' },
    }),
    401,
  );
  assert.equal(
    passwordCalls,
    beforeWrongAccount,
    'Closed allowlist rejects another account before asking Supabase for a token',
  );
  await data(
    await request('/api/admin/session', {
      method: 'POST',
      body: { email, password: 'offline-password-only' },
      origin: 'https://wrong-origin.example',
    }),
    403,
  );
  const loggedIn = await request('/api/admin/session', {
    method: 'POST',
    body: { email, password: 'offline-password-only' },
  });
  assert.equal((await data(loggedIn, 200)).success, true);
  const cookies = loggedIn.headers.getSetCookie();
  assert.equal(cookies.length, 2);
  for (const cookie of cookies) {
    assert(/;\s*HttpOnly/i.test(cookie));
    assert(/;\s*Secure/i.test(cookie));
    assert(/;\s*SameSite=Strict/i.test(cookie));
    assert(/;\s*Path=\//i.test(cookie));
  }
  const admin = await request('/admin', { cookie: activeCookies });
  assert.equal(admin.status, 200);
  assert(admin.headers.get('x-robots-tag')?.includes('noindex'));
  const adminHtml = await admin.text();
  assert(/data-admin-mode="online"/.test(adminHtml));
  assert(adminHtml.includes('/__admin/decap-cms.js'));
  assert(
    !adminHtml.includes('/src/admin/main.js'),
    'Production admin must reference the bundled module',
  );
  for (const pathname of cleanRoutes) {
    const response = await request(pathname, { cookie: activeCookies });
    assert.equal(response.status, 200, `Authenticated clean route should render: ${pathname}`);
    assert(response.headers.get('x-robots-tag')?.includes('noindex'));
    assert(/no-store/.test(response.headers.get('cache-control')));
    const html = await response.text();
    assert(html.includes('id="studio-sidebar"'), `Missing shared admin shell: ${pathname}`);
    assert(/data-admin-mode="online"/.test(html));
    assert(html.includes('/__admin/decap-cms.js'));
  }
  const scriptPaths = [...adminHtml.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(
    (match) => new URL(match[1], site).pathname,
  );
  assert(
    scriptPaths.some((name) => name.startsWith('/_astro/')),
    'Expected a compiled browser module in the admin shell',
  );
  for (const script of scriptPaths) {
    const filename = path.resolve(output, 'static', `.${decodeURIComponent(script)}`);
    assert(filename.startsWith(`${path.join(output, 'static')}${path.sep}`));
    await fs.access(filename);
  }

  await data(await request('/__cms/products'), 401);
  await data(await request('/__cms/taxonomy'), 401);
  const cloudTaxonomy = await data(
    await request('/__cms/taxonomy', { cookie: activeCookies }),
    200,
  );
  assert.deepEqual(cloudTaxonomy.taxonomy, taxonomy, 'CMS initialization can read cloud taxonomy.');
  const products = await data(await request('/__cms/products', { cookie: activeCookies }), 200);
  assert.equal(products.products.length, 1);
  assert.equal(products.products[0].id, productId);
  assert.equal(
    products.products[0].published,
    false,
    'Drafts remain visible to authenticated cloud management',
  );
  const proxy = (action, params, extra = {}) =>
    request('/api/admin/proxy', {
      method: 'POST',
      cookie: activeCookies,
      body: { branch: 'main', action, params },
      ...extra,
    });
  const loaded = await data(await proxy('getEntry', { branch: 'main', path: productPath }), 200);
  assert.match(loaded.file.id, /^[a-f0-9]{64}$/);
  let expected = loaded.file.id;
  for (let index = 1; index <= 2; index++) {
    const edited = {
      ...JSON.parse(workspace.document.files[productPath]),
      name: `Runtime edit ${index}`,
      description: `Private runtime fixture edit ${index}.`,
    };
    const saved = await data(
      await proxy('persistEntry', {
        branch: 'main',
        dataFiles: [{ path: productPath, slug: productId, raw: JSON.stringify(edited) }],
        assets: [],
        expected: { [productPath]: expected },
        options: {
          collectionName: 'products',
          useWorkflow: false,
          status: 'draft',
          commitMessage: 'Offline test only',
        },
      }),
      200,
    );
    assert.match(saved.revisions[productPath], /^[a-f0-9]{64}$/);
    assert.notEqual(saved.revisions[productPath], expected);
    expected = saved.revisions[productPath];
    assert.equal(JSON.parse(workspace.document.files[productPath]).name, `Runtime edit ${index}`);
  }
  assert.equal(writes, 2);
  const writesBeforeBadOrigin = writes;
  await data(await proxy('persistEntry', {}, { origin: 'https://wrong-origin.example' }), 403);
  await data(
    await request('/api/admin/publish', {
      method: 'POST',
      cookie: activeCookies,
      body: {},
      origin: 'https://wrong-origin.example',
    }),
    403,
  );
  assert.equal(writes, writesBeforeBadOrigin);
  const preview = await request(`/admin/product-preview/${productId}`, { cookie: activeCookies });
  assert.equal(preview.status, 200);
  assert(preview.headers.get('x-robots-tag')?.includes('noindex'));
  assert(/no-store/.test(preview.headers.get('cache-control')));
  assert((await preview.text()).includes('Runtime edit 2'));
  const privatePreview = await request(`/admin/product-preview/${productId}`);
  assert.equal(privatePreview.status, 303);
  assert.equal((await request('/admin/article-preview/runtime-article')).status, 303);

  const refreshed = await request('/api/admin/session', {
    cookie: `soltree-admin-access=expired; soltree-admin-refresh=${refreshToken}`,
  });
  assert.equal((await data(refreshed, 200)).user.email, email);
  assert.equal(refreshCalls, 1);
  assert.equal(
    refreshed.headers.getSetCookie().length,
    2,
    'Expired access token should renew the two protected cookies',
  );
  const expired = await request('/api/admin/session', {
    cookie: 'soltree-admin-access=expired; soltree-admin-refresh=expired-refresh',
  });
  await data(expired, 401);
  assert.equal(
    expired.headers.getSetCookie().length,
    2,
    'Failed refresh clears both cookies so the UI can request a fresh login',
  );
  await data(
    await request('/__cms/products', { cookie: 'soltree-admin-access=other-account' }),
    403,
  );

  conflictNextSave = true;
  const beforeConflict = workspace.document.files[productPath];
  const failed = await proxy('persistEntry', {
    branch: 'main',
    dataFiles: [
      {
        path: productPath,
        slug: productId,
        raw: JSON.stringify({ ...JSON.parse(beforeConflict), name: 'Must not overwrite' }),
      },
    ],
    assets: [],
    expected: { [productPath]: expected },
    options: {
      collectionName: 'products',
      useWorkflow: false,
      status: 'draft',
      commitMessage: 'Offline conflict only',
    },
  });
  await data(failed, 409);
  assert.equal(workspace.document.files[productPath], beforeConflict);
  assert.equal(writes, 2);
  assert.equal(workspace.document.publication, null);
  assert.equal(
    (await request(`/products/${productId}`)).status,
    404,
    'Saving cloud drafts must not create public routes',
  );
  assert.equal(
    await fs.readFile(path.join(output, 'static/index.html'), 'utf8'),
    publicHome,
    'Runtime cloud saves must not mutate deployed static pages',
  );
  assert.deepEqual(
    unexpected,
    [],
    `Unexpected network destinations: ${JSON.stringify(unexpected)}`,
  );
  assert(!calls.some((call) => call.includes('api.github.com') || call.includes('api.resend.com')));
  console.log(
    'PASS: actual Node 22 Vercel fetch function, clean admin routes and login returns, unknown-route 404s, online secrets, closed login/cookies/refresh, bundled admin, private cloud drafts and previews, two SHA256 saves, origin protection and durable CAS conflict; all fetches stayed inside offline fixtures.',
  );
} finally {
  globalThis.fetch = originalFetch;
  assert.equal(path.dirname(path.resolve(functionRoot)), path.resolve(os.tmpdir()));
  await fs.rm(functionRoot, { recursive: true, force: true });
}
