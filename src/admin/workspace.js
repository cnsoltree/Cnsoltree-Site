/** Keep a valid Decap route underneath the optional workbench view. */
export function initialWorkspaceView(url) {
  if (url.searchParams.has('view')) return url.searchParams.get('view') === 'workspace';
  return !url.hash || url.hash === '#' || url.hash === '#/';
}

export function workspaceGreeting(hour) {
  if (hour >= 5 && hour < 12) return '老板，上午好';
  if (hour >= 12 && hour < 18) return '老板，下午好';
  return '老板，晚上好';
}

export function articleEditorMode(hash) {
  const path = hash.split('?')[0];
  if (/^#\/collections\/articles\/new\/?$/.test(path)) return 'new';
  if (/^#\/collections\/articles\/entries\/[^/]+\/?$/.test(path)) return 'edit';
  return null;
}

if (typeof document !== 'undefined') {
  const workspace = document.getElementById('studio-workspace');
  const cms = document.getElementById('nc-root');
  const productsTable = document.getElementById('studio-products');
  const articlesTable = document.getElementById('studio-articles');
  const auxiliaryViews = {
    groups: { element: document.getElementById('studio-groups'), label: '内容 / 分组管理' },
    analytics: {
      element: document.getElementById('studio-analytics'),
      label: '数据分析 / 数据看板',
    },
    seo: { element: document.getElementById('studio-seo'), label: 'SEO 助手' },
    knowledge: { element: document.getElementById('studio-knowledge'), label: '内容 / 知识库' },
  };
  const articleHeading = document.getElementById('studio-article-editor-heading');
  const contentToggle = document.querySelector('[data-studio-content-toggle]');
  const contentLinks = document.getElementById('studio-content-links');
  const sidebarToggle = document.querySelector('[data-studio-sidebar-toggle]');
  const pageLabel = document.querySelector('[data-studio-page-label]');
  const greeting = document.getElementById('studio-greeting');
  const startUrl = new URL(window.location.href);
  let showWorkspace = initialWorkspaceView(startUrl);
  const auxiliaryView = (url) => {
    const view = url.searchParams.get('view');
    return Object.hasOwn(auxiliaryViews, view) ? view : null;
  };
  let activeAuxiliary = auxiliaryView(startUrl);
  let pendingContentHash = null;

  // This query survives Decap's initial redirect to the first collection.
  if (showWorkspace && startUrl.searchParams.get('view') !== 'workspace') {
    startUrl.searchParams.set('view', 'workspace');
    window.history.replaceState(window.history.state, '', startUrl);
  }

  const hour = Number(
    new Intl.DateTimeFormat('en', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hourCycle: 'h23',
    }).format(new Date()),
  );
  if (greeting) greeting.textContent = workspaceGreeting(hour);

  function renderView() {
    const current =
      activeAuxiliary ||
      (showWorkspace
        ? 'workspace'
        : window.location.hash.includes('/articles')
          ? 'articles'
          : 'products');
    document.body.dataset.view = showWorkspace ? 'workspace' : 'content';
    const articleMode =
      !showWorkspace && !activeAuxiliary && articleEditorMode(window.location.hash);
    document.body.dataset.editor = articleMode ? 'article' : '';
    if (articleHeading) {
      articleHeading.hidden = !articleMode;
      articleHeading.querySelector('h1').textContent =
        articleMode === 'new' ? '新建文章' : '编辑文章';
    }
    const showProducts =
      !showWorkspace &&
      !activeAuxiliary &&
      /^#\/collections\/products\/?$/.test(window.location.hash.split('?')[0]);
    const showArticles =
      !showWorkspace &&
      !activeAuxiliary &&
      /^#\/collections\/articles\/?$/.test(window.location.hash.split('?')[0]);
    if (productsTable) {
      productsTable.hidden = !showProducts;
      productsTable.inert = !showProducts;
    }
    if (articlesTable) {
      articlesTable.hidden = !showArticles;
      articlesTable.inert = !showArticles;
    }
    if (workspace) workspace.hidden = !showWorkspace;
    for (const [view, { element }] of Object.entries(auxiliaryViews)) {
      if (element) {
        element.hidden = activeAuxiliary !== view;
        element.inert = element.hidden;
      }
    }
    if (cms) {
      cms.hidden = showWorkspace || Boolean(activeAuxiliary) || showProducts || showArticles;
      cms.inert = cms.hidden;
    }
    document.querySelectorAll('[data-studio-nav]').forEach((link) => {
      if (link.dataset.studioNav === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (pageLabel)
      pageLabel.textContent = activeAuxiliary
        ? auxiliaryViews[activeAuxiliary].label
        : showWorkspace
          ? '工作台'
          : current === 'articles'
            ? '内容 / 文章管理'
            : '内容 / 产品管理';
    contentToggle?.classList.toggle(
      'is-active',
      ['products', 'articles', 'groups', 'knowledge'].includes(current),
    );
    if (showProducts) document.dispatchEvent(new Event('studio:products'));
    if (showArticles) document.dispatchEvent(new Event('studio:articles'));
    if (activeAuxiliary) document.dispatchEvent(new Event(`studio:${activeAuxiliary}`));
  }

  document.querySelectorAll('[data-studio-nav]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      const nextWorkspace = link.dataset.studioNav === 'workspace';
      const nextAuxiliary = Object.hasOwn(auxiliaryViews, link.dataset.studioNav)
        ? link.dataset.studioNav
        : null;
      const url = new URL(window.location.href);
      event.preventDefault();
      if (nextWorkspace || nextAuxiliary) {
        // Hiding a mounted editor preserves its draft; returning does not discard changes.
        pendingContentHash = null;
        url.searchParams.set('view', nextAuxiliary || 'workspace');
        if (url.href !== window.location.href)
          window.history.pushState(window.history.state, '', url);
      } else {
        url.searchParams.delete('view');
        if (contentLinks) contentLinks.hidden = false;
        contentToggle?.setAttribute('aria-expanded', 'true');
        const targetHash = new URL(link.href, window.location.href).hash;
        if (targetHash !== window.location.hash) {
          // Native hash navigation lets Decap handle its unsaved-content guard. Keep
          // the previous view on its history entry; strip it only from the new entry.
          pendingContentHash = targetHash;
          window.location.hash = targetHash;
          return;
        }
        if (url.href !== window.location.href)
          window.history.pushState(window.history.state, '', url);
      }
      showWorkspace = nextWorkspace;
      activeAuxiliary = nextAuxiliary;
      renderView();
    });
  });

  window.addEventListener('hashchange', () => {
    if (pendingContentHash === window.location.hash) {
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      window.history.replaceState(window.history.state, '', url);
    }
    pendingContentHash = null;
    showWorkspace = new URL(window.location.href).searchParams.get('view') === 'workspace';
    activeAuxiliary = auxiliaryView(new URL(window.location.href));
    renderView();
  });
  window.addEventListener('popstate', () => {
    showWorkspace = initialWorkspaceView(new URL(window.location.href));
    activeAuxiliary = auxiliaryView(new URL(window.location.href));
    renderView();
  });
  contentToggle?.addEventListener('click', () => {
    const open = contentToggle.getAttribute('aria-expanded') !== 'true';
    contentToggle.setAttribute('aria-expanded', String(open));
    if (contentLinks) contentLinks.hidden = !open;
  });
  sidebarToggle?.addEventListener('click', () => {
    const collapsed = document.body.dataset.sidebarCollapsed !== 'true';
    document.body.dataset.sidebarCollapsed = String(collapsed);
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.setAttribute('aria-label', collapsed ? '展开侧栏' : '收起侧栏');
  });
  renderView();
}
