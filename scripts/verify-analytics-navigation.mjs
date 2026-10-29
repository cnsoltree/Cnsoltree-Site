import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parseAdminUrl } from '../src/admin/routes.mjs';

// Exercise the real shell; verify-admin-navigation separately covers history v4
// and native POP rollback with Decap's unsaved-content guard.
class Element extends EventTarget {
  constructor(view) {
    super();
    this.dataset = view ? { studioNav: view } : {};
    this.attributes = new Map();
    this.classes = new Set();
    this.classList = {
      toggle: (name, active) => (active ? this.classes.add(name) : this.classes.delete(name)),
    };
    this.heading = {};
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  getAttribute(name) {
    return this.attributes.get(name);
  }
  hasAttribute(name) {
    return this.attributes.has(name);
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  querySelector() {
    return this.heading;
  }
  closest() {
    return this.hasAttribute('href') ? this : null;
  }
}

const source = fs
  .readFileSync(new URL('../src/admin/workspace.js', import.meta.url), 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace(/^export /gm, '');
const views = ['workspace', 'analytics', 'seo', 'knowledge', 'products', 'articles', 'groups'];
const panelIds = views.map((view) => `studio-${view}`);
function shell(path) {
  const ids = Object.fromEntries(
    [
      ...panelIds,
      'nc-root',
      'studio-article-editor-heading',
      'studio-content-links',
      'studio-greeting',
    ].map((id) => [id, new Element()]),
  );
  const selectors = Object.fromEntries(
    ['content-toggle', 'sidebar-toggle', 'page-label'].map((key) => [key, new Element()]),
  );
  const nav = views.map((view) => new Element(view));
  const document = Object.assign(new EventTarget(), {
    body: { dataset: {} },
    getElementById: (id) => ids[id],
    querySelector: (selector) => selectors[selector.match(/data-studio-(.+)\]/)?.[1]],
    querySelectorAll: () => nav,
  });
  const window = { location: new URL(path, 'http://127.0.0.1:4323') };
  const routeEvents = [];
  for (const view of views)
    document.addEventListener(`studio:${view}`, () => routeEvents.push(view));
  let route = parseAdminUrl(window.location);
  window.location = new URL(route.path, window.location);
  const entries = [route];
  let index = 0;
  const listeners = new Set();
  const notify = () => {
    route = entries[index];
    window.location = new URL(route.path, window.location);
    for (const listener of listeners) listener(route);
  };
  const navigation = {
    get route() {
      return route;
    },
    navigate(href) {
      const next = parseAdminUrl(href);
      if (!next) return false;
      if (next.path === route.path) return true;
      entries.splice(index + 1, entries.length, next);
      index += 1;
      notify();
      return true;
    },
    listen(listener) {
      listeners.add(listener);
    },
  };
  window.history = {
    back() {
      if (index > 0) {
        index -= 1;
        notify();
      }
    },
    forward() {
      if (index + 1 < entries.length) {
        index += 1;
        notify();
      }
    },
  };
  for (const link of nav) {
    const href =
      link.dataset.studioNav === 'workspace' ? '/admin' : `/admin/${link.dataset.studioNav}`;
    link.setAttribute('href', href);
    link.href = new URL(href, window.location).href;
  }
  vm.runInNewContext(source, {
    document,
    window,
    parseAdminUrl,
    installAdminNavigation: () => navigation,
    URL,
    Intl,
    Date,
    Event,
  });
  const current = () => nav.filter((link) => link.getAttribute('aria-current') === 'page');
  const clickLink = (link, modifiers = {}) => {
    const event = new Event('click', { cancelable: true });
    // A nested icon/span exercises document delegation through closest('a[href]').
    Object.defineProperty(event, 'target', { value: { closest: () => link } });
    Object.assign(event, { button: 0, ...modifiers });
    document.dispatchEvent(event);
    return event;
  };
  const click = (view, modifiers) =>
    clickLink(
      nav.find((link) => link.dataset.studioNav === view),
      modifiers,
    );
  const clickHref = (href, attributes = {}, modifiers = {}) => {
    const link = new Element();
    link.setAttribute('href', href);
    link.href = new URL(href, window.location).href;
    Object.assign(link, attributes);
    if (attributes.download) link.setAttribute('download', '');
    return clickLink(link, modifiers);
  };
  return { ids, selectors, nav, document, window, current, click, clickHref, routeEvents };
}

for (const [path, view, panel, editor] of [
  ['/admin', 'workspace', 'studio-workspace', ''],
  ['/admin/analytics', 'analytics', 'studio-analytics', ''],
  ['/admin/seo', 'seo', 'studio-seo', ''],
  ['/admin/knowledge', 'knowledge', 'studio-knowledge', ''],
  ['/admin/groups', 'groups', 'studio-groups', ''],
  ['/admin/products', 'products', 'studio-products', ''],
  ['/admin/articles', 'articles', 'studio-articles', ''],
  ['/admin/products/new', 'products', 'nc-root', 'product'],
  ['/admin/products/example/edit', 'products', 'nc-root', 'product'],
  ['/admin/articles/new', 'articles', 'nc-root', 'article'],
  ['/admin/articles/example/edit', 'articles', 'nc-root', 'article'],
]) {
  const state = shell(path);
  assert.equal(state.window.location.pathname, path);
  assert.equal(state.window.location.hash, '');
  assert.equal(state.current().length, 1, `${path} has exactly one current navigation link.`);
  assert.equal(state.current()[0].dataset.studioNav, view);
  for (const id of [...panelIds, 'nc-root']) {
    assert.equal(state.ids[id].hidden, id !== panel, `${path}: ${id} visibility`);
    assert.equal(state.ids[id].inert, id !== panel, `${path}: ${id} interaction`);
  }
  assert.equal(state.document.body.dataset.editor, editor);
  assert.equal(state.ids['studio-article-editor-heading'].hidden, editor !== 'article');
  if (panel !== 'nc-root' && view !== 'workspace') assert.deepEqual(state.routeEvents, [view]);
  else assert.deepEqual(state.routeEvents, []);
}

const state = shell('/admin/analytics');
for (const modifier of [
  { ctrlKey: true },
  { metaKey: true },
  { shiftKey: true },
  { altKey: true },
  { button: 1 },
]) {
  assert.equal(state.click('groups', modifier).defaultPrevented, false);
  assert.equal(state.window.location.pathname, '/admin/analytics');
}
for (const [href, attributes] of [
  ['/admin/articles/new', { target: '_blank' }],
  ['/admin/products', { download: true }],
  ['https://other.example/admin/articles/new', {}],
  ['/admin/login', {}],
  ['#details', {}],
]) {
  assert.equal(state.clickHref(href, attributes).defaultPrevented, false);
  assert.equal(state.window.location.pathname, '/admin/analytics');
}
assert(state.click('groups').defaultPrevented);
assert.equal(state.ids['studio-groups'].hidden, false);
assert.equal(state.current().length, 1);
assert.equal(state.current()[0].dataset.studioNav, 'groups');
assert.equal(state.routeEvents.at(-1), 'groups');

assert(state.clickHref('/admin/articles/new').defaultPrevented);
assert.equal(state.ids['nc-root'].hidden, false);
assert.equal(state.document.body.dataset.editor, 'article');
assert.equal(state.current()[0].dataset.studioNav, 'articles');
assert.equal(state.selectors['content-toggle'].getAttribute('aria-expanded'), 'true');
assert.equal(state.ids['studio-content-links'].hidden, false);
assert(state.clickHref('/admin/products/example/edit').defaultPrevented);
assert.equal(state.window.location.pathname, '/admin/products/example/edit');
assert.equal(state.ids['nc-root'].hidden, false);
assert.equal(state.current()[0].dataset.studioNav, 'products');

const draft = shell('/admin/articles/existing-article/edit');
const editor = draft.ids['nc-root'];
editor.unsavedDraft = { title: 'Unsaved text' };
draft.click('analytics');
assert.equal(editor.hidden, true);
assert.equal(draft.window.location.pathname, '/admin/analytics');
draft.window.history.back();
assert.equal(editor.hidden, false);
assert.equal(draft.window.location.pathname, '/admin/articles/existing-article/edit');
assert.equal(draft.ids['nc-root'], editor);
assert.deepEqual(editor.unsavedDraft, { title: 'Unsaved text' });
draft.window.history.forward();
assert.equal(draft.ids['studio-analytics'].hidden, false);
draft.click('articles');
assert.equal(draft.ids['studio-articles'].hidden, false);
assert.equal(draft.routeEvents.at(-1), 'articles');
draft.window.history.back();
assert.equal(draft.ids['studio-analytics'].hidden, false);
draft.window.history.back();
assert.equal(editor.hidden, false);
assert.equal(draft.document.body.dataset.editor, 'article');
assert.equal(editor.unsavedDraft.title, 'Unsaved text');
assert.equal(draft.current().length, 1);

for (const view of ['seo', 'knowledge', 'groups', 'analytics']) {
  const legacy = shell(`/admin?view=${view}#/collections/articles/new`);
  assert.equal(legacy.window.location.pathname, `/admin/${view}`);
  assert.equal(legacy.window.location.search, '');
  assert.equal(legacy.window.location.hash, '');
  assert.equal(legacy.ids[`studio-${view}`].hidden, false);
  legacy.click('workspace');
  legacy.window.history.back();
  assert.equal(legacy.ids[`studio-${view}`].hidden, false);
  assert.equal(legacy.current()[0].dataset.studioNav, view);
}
console.log(
  'Admin shell: clean refresh routes, delegated links, modifiers, category events, back/forward and mounted drafts passed.',
);
