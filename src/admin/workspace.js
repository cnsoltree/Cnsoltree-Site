import { parseAdminUrl } from './routes.mjs';
import { installAdminNavigation } from './navigation.js';

export function initialWorkspaceView(url) {
  return parseAdminUrl(url)?.view === 'workspace';
}

export function workspaceGreeting(hour) {
  if (hour >= 5 && hour < 12) return '老板，上午好';
  if (hour >= 12 && hour < 18) return '老板，下午好';
  return '老板，晚上好';
}

export function articleEditorMode(hash) {
  const route = parseAdminUrl(`/admin${hash}`);
  return route?.collection === 'articles' && ['new', 'edit'].includes(route.mode)
    ? route.mode
    : null;
}

if (typeof document !== 'undefined') {
  const navigation = installAdminNavigation();
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
    knowledge: { element: document.getElementById('studio-knowledge'), label: '知识库' },
  };
  const articleHeading = document.getElementById('studio-article-editor-heading');
  const contentToggle = document.querySelector('[data-studio-content-toggle]');
  const contentLinks = document.getElementById('studio-content-links');
  const sidebarToggle = document.querySelector('[data-studio-sidebar-toggle]');
  const pageLabel = document.querySelector('[data-studio-page-label]');
  const greeting = document.getElementById('studio-greeting');
  const hour = Number(
    new Intl.DateTimeFormat('en', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hourCycle: 'h23',
    }).format(new Date()),
  );
  if (greeting) greeting.textContent = workspaceGreeting(hour);

  function renderView(route = navigation.route) {
    const current = route.view;
    const showWorkspace = current === 'workspace';
    const activeAuxiliary = Object.hasOwn(auxiliaryViews, current) ? current : null;
    const articleMode =
      current === 'articles' && ['new', 'edit'].includes(route.mode) ? route.mode : null;
    const showProducts = current === 'products' && route.mode === 'list';
    const showArticles = current === 'articles' && route.mode === 'list';
    document.body.dataset.view = showWorkspace ? 'workspace' : 'content';
    document.body.dataset.editor = articleMode
      ? 'article'
      : current === 'products' && ['new', 'edit'].includes(route.mode)
        ? 'product'
        : '';
    if (articleHeading) {
      articleHeading.hidden = !articleMode;
      articleHeading.querySelector('h1').textContent =
        articleMode === 'new' ? '新建文章' : '编辑文章';
    }
    for (const [element, visible] of [
      [workspace, showWorkspace],
      [productsTable, showProducts],
      [articlesTable, showArticles],
      ...Object.entries(auxiliaryViews).map(([view, { element }]) => [
        element,
        activeAuxiliary === view,
      ]),
    ]) {
      if (!element) continue;
      element.hidden = !visible;
      element.inert = !visible;
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
      ['products', 'articles', 'groups'].includes(current),
    );
    if (showProducts) document.dispatchEvent(new Event('studio:products'));
    if (showArticles) document.dispatchEvent(new Event('studio:articles'));
    if (activeAuxiliary) document.dispatchEvent(new Event(`studio:${activeAuxiliary}`));
  }

  document.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !parseAdminUrl(url)) return;
    event.preventDefault();
    if (navigation.navigate(url.href) && ['products', 'articles'].includes(navigation.route.view)) {
      if (contentLinks) contentLinks.hidden = false;
      contentToggle?.setAttribute('aria-expanded', 'true');
    }
  });
  navigation.listen(renderView);
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
