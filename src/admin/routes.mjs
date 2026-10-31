const views = new Set([
  'workspace',
  'analytics',
  'operations',
  'groups',
  'settings',
  'seo-planning',
]);
const collections = new Set(['products', 'articles']);
const entryPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,159}$/;
const base = 'https://www.elesoltree.com';

function route(view, mode = null, entryKey = null, search = '') {
  const collection = collections.has(view) ? view : null;
  const path = view === 'workspace' ? '/admin' : `/admin/${view}`;
  const suffix =
    mode === 'new' ? '/new' : mode === 'edit' ? `/${encodeURIComponent(entryKey)}/edit` : '';
  const cmsSuffix =
    mode === 'new' ? '/new' : mode === 'edit' ? `/entries/${encodeURIComponent(entryKey)}` : '';
  return {
    view,
    collection,
    mode: collection ? mode || 'list' : null,
    entryKey,
    path: `${path}${suffix}${search}`,
    hash: collection ? `#/collections/${collection}${cmsSuffix}${search}` : null,
  };
}

function entry(value) {
  try {
    const decoded = decodeURIComponent(value);
    return entryPattern.test(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

/** Shared allowlist for server aliases, login return paths and browser navigation. */
export function parseAdminUrl(input) {
  let url;
  try {
    url = new URL(input, base);
  } catch {
    return null;
  }
  const pathname = url.pathname.replace(/\/$/, '');
  const params = new URLSearchParams(url.search);
  const legacyView = params.get('view');
  params.delete('view');
  const search = () => (params.size ? `?${params}` : '');
  if (pathname === '/admin') {
    if (legacyView && !collections.has(legacyView)) {
      if (!views.has(legacyView) && !collections.has(legacyView)) return null;
      return route(legacyView, null, null, search());
    }
    if (!url.hash || url.hash === '#' || url.hash === '#/')
      return route(legacyView || 'workspace', null, null, search());
    const match =
      /^#\/collections\/(products|articles)(?:\/(new|entries\/([^/?]+)))?\/?(?:\?([^#]*))?$/.exec(
        url.hash,
      );
    if (!match) return null;
    for (const [key, value] of new URLSearchParams(match[4])) params.set(key, value);
    const key = match[3] ? entry(match[3]) : null;
    if (match[3] && !key) return null;
    return route(match[1], match[2] === 'new' ? 'new' : key ? 'edit' : 'list', key, search());
  }
  const view = /^\/admin\/(analytics|operations|groups|settings|seo-planning)$/.exec(pathname)?.[1];
  if (view) return route(view, null, null, search());
  const match = /^\/admin\/(products|articles)(?:\/(new|([^/]+)\/edit))?$/.exec(pathname);
  if (!match) return null;
  const key = match[3] ? entry(match[3]) : null;
  if (match[3] && !key) return null;
  return route(match[1], match[2] === 'new' ? 'new' : key ? 'edit' : 'list', key, search());
}

/** Convert Decap's internal collection route without exposing it in the address bar. */
export function adminPathFromCmsPath(path) {
  if (path === '/' || path === '') return '/admin/products';
  if (typeof path !== 'string' || !path.startsWith('/collections/')) return null;
  return parseAdminUrl(`${base}/admin#${path}`)?.path ?? null;
}

export function adminEntryHref(collection, entryKey) {
  if (!collections.has(collection) || !entryPattern.test(entryKey)) return null;
  return `/admin/${collection}/${encodeURIComponent(entryKey)}/edit`;
}

export function adminLoginHref(input) {
  const path = parseAdminUrl(input)?.path || '/admin';
  return path === '/admin' ? '/admin/login' : `/admin/login?next=${encodeURIComponent(path)}`;
}
