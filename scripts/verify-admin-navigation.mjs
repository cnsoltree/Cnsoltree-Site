import assert from 'node:assert/strict';
import fs from 'node:fs';

// Use history v4 itself: this DOM supplies only the native browser history API.
function browserWindow(path) {
  const window = Object.assign(new EventTarget(), {
    location: new URL(path, 'https://www.elesoltree.com'),
    document: { createElement() {} },
    navigator: { userAgent: 'Navigation verification' },
    confirmations: 0,
    allowLeave: false,
    confirm() {
      this.confirmations += 1;
      return this.allowLeave;
    },
  });
  const entries = [{ url: window.location.href, state: null }];
  let index = 0;
  window.history = {
    get state() {
      return entries[index].state;
    },
    get length() {
      return entries.length;
    },
    get index() {
      return index;
    },
    replaceState(state, _title, href) {
      window.location = new URL(href, window.location);
      entries[index] = { url: window.location.href, state };
    },
    pushState(state, _title, href) {
      window.location = new URL(href, window.location);
      entries.splice(index + 1, entries.length, { url: window.location.href, state });
      index += 1;
    },
    go(delta) {
      const next = Math.max(0, Math.min(entries.length - 1, index + delta));
      if (next === index) return;
      index = next;
      window.location = new URL(entries[index].url);
      const event = new Event('popstate');
      Object.defineProperty(event, 'state', { value: entries[index].state });
      window.dispatchEvent(event);
    },
    back() {
      this.go(-1);
    },
    forward() {
      this.go(1);
    },
  };
  return window;
}

const window = browserWindow(
  '/admin?view=analytics#/collections/articles/entries/existing-article',
);
globalThis.window = window;
const { installAdminNavigation } = await import('../src/admin/navigation.js');
const history = {};
const navigation = installAdminNavigation({ window, history });
assert.equal(window.location.pathname, '/admin/analytics');
assert.equal(window.location.hash, '');
assert.equal(window.location.search, '');
assert.equal(navigation.cmsPath, '/collections/articles/entries/existing-article');
assert.equal(history.location.pathname, navigation.cmsPath);
assert.equal(installAdminNavigation({ window, history }), navigation);

const mountedEditor = { draft: 'Unsaved text' };
const cmsEvents = [];
const shellEvents = [];
history.listen((location, action) => cmsEvents.push([location.pathname, action]));
navigation.listen((route) => shellEvents.push(route.view));
history.block(() => 'Unsaved changes');
navigation.navigate('/admin/groups');
navigation.navigate('/admin/operations');
window.history.back();
window.history.forward();
assert.equal(window.location.pathname, '/admin/operations');
assert.deepEqual(shellEvents, ['groups', 'operations', 'groups', 'operations']);
assert.equal(cmsEvents.length, 0, 'Auxiliary views keep the mounted editor route.');
assert.equal(window.confirmations, 0, 'Auxiliary views do not discard or guard drafts.');
assert.equal(mountedEditor.draft, 'Unsaved text');

assert.equal(navigation.navigate('/admin/products/new'), false);
assert.equal(window.location.pathname, '/admin/operations');
assert.equal(window.confirmations, 1);
assert.equal(cmsEvents.length, 0, 'Rejected transitions must not notify Decap.');
window.allowLeave = true;
assert.equal(navigation.navigate('/admin/products/new'), true);
assert.equal(history.location.pathname, '/collections/products/new');
assert.deepEqual(cmsEvents.at(-1), ['/collections/products/new', 'PUSH']);

window.allowLeave = false;
const currentIndex = window.history.index;
window.history.back();
assert.equal(window.history.index, currentIndex, 'Rejected native back restores its entry.');
assert.equal(window.location.pathname, '/admin/products/new');
assert.equal(navigation.route.path, '/admin/products/new');
window.allowLeave = true;
window.history.back();
assert.equal(window.location.pathname, '/admin/operations');
assert.equal(history.location.pathname, '/collections/articles/entries/existing-article');
window.history.forward();
assert.equal(window.location.pathname, '/admin/products/new');
assert.equal(history.location.pathname, '/collections/products/new');

history.replace('/collections/products/entries/saved-product');
assert.equal(window.location.pathname, '/admin/products/saved-product/edit');
assert.equal(cmsEvents.at(-1)[1], 'REPLACE');
history.push('/collections/articles/new?duplicate=true');
assert.equal(window.location.pathname, '/admin/articles/new');
assert.equal(window.location.search, '?duplicate=true');
assert.equal(history.location.search, '?duplicate=true');
assert.equal(
  history.createHref({ pathname: '/collections/articles/entries/example' }),
  '/admin/articles/example/edit',
);
assert.equal(navigation.navigate('/admin/login'), false);
assert.equal(window.location.hash, '');

// Refreshing an overlay retains the editor recorded on its native history entry.
navigation.navigate('/admin/analytics');
delete window.__SOLTREE_ADMIN_NAVIGATION__;
const refreshed = installAdminNavigation({ window, history: {} });
assert.equal(refreshed.route.view, 'analytics');
assert.equal(refreshed.cmsPath, '/collections/articles/new?duplicate=true');

// Finishing a save in an editor hidden by the dashboard updates its retained route.
const pendingWindow = browserWindow('/admin/articles/new');
globalThis.window = pendingWindow;
const pendingHistory = {};
const pending = installAdminNavigation({ window: pendingWindow, history: pendingHistory });
pending.navigate('/admin/analytics');
pendingHistory.replace('/collections/articles/entries/saved-in-background');
assert.equal(pending.route.view, 'analytics');
assert.equal(pending.cmsPath, '/collections/articles/entries/saved-in-background');
assert.equal(pendingWindow.location.pathname, '/admin/analytics');

const prepared = fs.readFileSync(
  new URL('../public/__admin/decap-cms.js', import.meta.url),
  'utf8',
);
assert.equal(prepared.split('window.__SOLTREE_CMS_HISTORY__=Ov;').length, 2);
console.log(
  'Clean admin history: canonical URLs, Decap guards, native back/forward and retained drafts passed.',
);
