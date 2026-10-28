import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Exercise the actual shell controller without mounting Decap or changing content.
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
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  querySelector() {
    return this.heading;
  }
}

const source = fs.readFileSync(new URL('../src/admin/workspace.js', import.meta.url), 'utf8');
function shell(route) {
  const ids = Object.fromEntries(
    [
      'studio-workspace',
      'nc-root',
      'studio-products',
      'studio-articles',
      'studio-groups',
      'studio-analytics',
      'studio-seo',
      'studio-knowledge',
      'studio-article-editor-heading',
      'studio-content-links',
      'studio-greeting',
    ].map((id) => [id, new Element()]),
  );
  const selectors = Object.fromEntries(
    ['content-toggle', 'sidebar-toggle', 'page-label'].map((key) => [key, new Element()]),
  );
  const nav = ['workspace', 'analytics', 'seo', 'knowledge', 'products', 'articles', 'groups'].map(
    (view) => new Element(view),
  );
  for (const link of nav)
    link.href = `/admin#/collections/${link.dataset.studioNav === 'articles' ? 'articles' : 'products'}`;
  const document = Object.assign(new EventTarget(), {
    body: { dataset: {} },
    getElementById: (id) => ids[id],
    querySelector: (selector) => selectors[selector.match(/data-studio-(.+)\]/)?.[1]],
    querySelectorAll: () => nav,
  });
  const window = Object.assign(new EventTarget(), {
    location: new URL(`http://127.0.0.1:4323${route}`),
    history: {
      state: { mountedEditor: true },
      entries: [new URL(`http://127.0.0.1:4323${route}`).href],
      replaceState(state, _unused, url) {
        this.state = state;
        window.location = new URL(url, window.location);
        this.entries[this.entries.length - 1] = window.location.href;
      },
      pushState(state, _unused, url) {
        this.state = state;
        window.location = new URL(url, window.location);
        this.entries.push(window.location.href);
      },
      back() {
        this.entries.pop();
        window.location = new URL(this.entries.at(-1));
        window.dispatchEvent(new Event('popstate'));
      },
    },
  });
  vm.runInNewContext(source.replace(/^export /gm, ''), {
    document,
    window,
    URL,
    Intl,
    Date,
    Event,
  });
  const current = () => nav.filter((link) => link.getAttribute('aria-current') === 'page');
  const click = (view, modified = false) => {
    const previousHash = window.location.hash;
    const event = new Event('click', { cancelable: true });
    Object.assign(event, { button: 0, ctrlKey: modified });
    nav.find((link) => link.dataset.studioNav === view).dispatchEvent(event);
    if (window.location.hash !== previousHash) {
      window.history.entries.push(window.location.href);
      window.dispatchEvent(new Event('hashchange'));
    }
    return event;
  };
  return { ids, selectors, nav, document, window, current, click };
}

for (const hash of ['#/collections/products', '#/collections/articles/entries/existing-article']) {
  const state = shell(`/admin?view=analytics${hash}`);
  assert.equal(state.ids['studio-analytics'].hidden, false, 'Direct refresh opens analytics.');
  assert.equal(state.ids['studio-analytics'].inert, false);
  assert.equal(state.current()[0].dataset.studioNav, 'analytics');
  assert.equal(state.current().length, 1);
  for (const id of ['studio-products', 'studio-articles', 'studio-groups', 'nc-root']) {
    assert.equal(state.ids[id].hidden, true, `${id} stays hidden behind analytics.`);
    assert.equal(state.ids[id].inert, true);
  }
  assert.equal(state.document.body.dataset.editor, '');
  assert(!state.selectors['content-toggle'].classes.has('is-active'));
  const original = state.window.location.href;
  state.click('groups', true);
  assert.equal(state.window.location.href, original, 'Modified clicks leave this tab unchanged.');
  state.click('groups');
  assert.equal(state.ids['studio-groups'].hidden, false);
  assert.equal(state.ids['studio-analytics'].hidden, true);
  assert.equal(
    state.window.location.hash,
    hash,
    'Auxiliary views preserve the mounted editor URL.',
  );
  state.click('analytics');
  assert.equal(state.ids['studio-analytics'].hidden, false);
  state.click('workspace');
  assert.equal(state.ids['studio-workspace'].hidden, false);
  assert.equal(state.ids['studio-analytics'].hidden, true);
  state.window.location = new URL(`http://127.0.0.1:4323/admin${hash}`);
  state.window.dispatchEvent(new Event('popstate'));
  assert.equal(state.ids['studio-analytics'].hidden, true);
  assert.equal(state.ids['nc-root'].hidden, hash === '#/collections/products');
  assert.equal(
    state.current()[0].dataset.studioNav,
    hash.includes('articles') ? 'articles' : 'products',
  );
}

const draft = shell('/admin#/collections/articles/entries/existing-article');
draft.ids['nc-root'].unsavedDraft = { title: 'Unsaved text' };
const editor = draft.ids['nc-root'];
draft.click('analytics');
assert.equal(editor.hidden, true);
assert.equal(draft.window.location.hash, '#/collections/articles/entries/existing-article');
draft.window.history.back();
assert.equal(editor.hidden, false);
assert.equal(draft.ids['nc-root'], editor, 'The editor is hidden, never replaced.');
assert.deepEqual(editor.unsavedDraft, { title: 'Unsaved text' });
assert.equal(draft.document.body.dataset.editor, 'article');
assert(!draft.window.location.searchParams.has('view'));
draft.click('analytics');
draft.click('articles');
assert.equal(draft.ids['studio-articles'].hidden, false);
draft.window.history.back();
assert.equal(draft.ids['studio-analytics'].hidden, false, 'Back restores the preceding dashboard.');
draft.window.history.back();
assert.equal(editor.hidden, false, 'Back from dashboard restores the preceding editor.');
draft.click('analytics');
draft.click('products');
assert.equal(draft.ids['studio-products'].hidden, false);
assert(!draft.window.location.searchParams.has('view'));
draft.window.history.back();
assert.equal(
  draft.ids['studio-analytics'].hidden,
  false,
  'Hash navigation preserves the previous view.',
);
assert.equal(editor.unsavedDraft.title, 'Unsaved text');

console.log('Analytics shell: refresh, navigation, modifiers, history and mounted drafts passed.');

for (const view of ['seo', 'knowledge']) {
  const state = shell(`/admin?view=${view}#/collections/articles/new`);
  assert.equal(state.ids[`studio-${view}`].hidden, false, `${view} opens on refresh.`);
  assert.equal(state.ids[`studio-${view}`].inert, false);
  assert.equal(state.ids['nc-root'].hidden, true);
  assert.equal(state.document.body.dataset.editor, '');
  assert.equal(state.current()[0].dataset.studioNav, view);
  state.click('workspace');
  assert.equal(state.ids[`studio-${view}`].hidden, true);
  state.window.history.back();
  assert.equal(state.ids[`studio-${view}`].hidden, false);
  state.click('articles');
  assert.equal(state.ids['studio-articles'].hidden, false);
  state.window.history.back();
  assert.equal(state.ids[`studio-${view}`].hidden, false);
}
console.log('SEO and knowledge views: direct refresh, isolation and history passed.');
