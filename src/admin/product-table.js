/** The management list includes drafts; public Astro data exports remain publication-filtered. */
export function filterProductRows(products, { query = '', category = '', status = 'active' } = {}) {
  const search = query.trim().toLocaleLowerCase();
  return products.filter((product) => {
    if (status === 'trash' ? !product.deletedAt : product.deletedAt) return false;
    if (status === 'published' && !product.published) return false;
    if (status === 'draft' && product.published) return false;
    if (category && product.categorySlug !== category) return false;
    return (
      !search ||
      `${product.id} ${product.name ?? product.title ?? ''}`.toLocaleLowerCase().includes(search)
    );
  });
}

export function formatProductDate(value) {
  if (!value || !Number.isFinite(Date.parse(value))) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return { date: value, time: '' };
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(value));
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return {
    date: `${part('year')}-${part('month')}-${part('day')}`,
    time: `${part('hour')}:${part('minute')}`,
  };
}

export function normalizeProductListState(value) {
  const state = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return {
    query: typeof state.query === 'string' ? state.query.slice(0, 256) : '',
    category:
      typeof state.category === 'string' && /^[a-z0-9-]{0,100}$/.test(state.category)
        ? state.category
        : '',
    status: ['active', 'published', 'draft', 'trash'].includes(state.status)
      ? state.status
      : 'active',
    pageSize: [20, 50].includes(state.pageSize) ? state.pageSize : 20,
    page: Number.isInteger(state.page) && state.page > 0 && state.page <= 100000 ? state.page : 1,
  };
}

if (typeof document !== 'undefined') {
  for (const id of ['studio-products', 'studio-articles']) {
    const manager = document.getElementById(id);
    if (manager) initContentTable(manager);
  }
}

function initContentTable(manager) {
  const isArticle = manager.id === 'studio-articles';
  const collection = isArticle ? 'articles' : 'products';
  const label = isArticle ? '文章' : '产品';
  const api = `/__cms/${collection}`;
  const rows = manager.querySelector('[data-product-rows]');
  const table = manager.querySelector('table');
  const category = manager.querySelector('[data-product-category]');
  const search = manager.querySelector('[data-product-search]');
  const status = manager.querySelector('[data-product-filter-status]');
  const pageSize = manager.querySelector('[data-product-page-size]');
  const previous = manager.querySelector('[data-product-prev]');
  const next = manager.querySelector('[data-product-next]');
  const pageLabel = manager.querySelector('[data-product-page]');
  const total = manager.querySelector('[data-product-total]');
  const error = manager.querySelector('[data-product-error]');
  const refresh = manager.querySelector('[data-product-refresh]');
  const dialog = manager.querySelector('[data-product-delete-dialog]');
  const deleteConfirm = manager.querySelector('[data-product-delete-confirm]');
  const deleteCancel = manager.querySelector('[data-product-delete-cancel]');
  const storageKey = `soltree.${isArticle ? 'article' : 'product'}-list.v1`;
  let restored = normalizeProductListState();
  try {
    restored = normalizeProductListState(JSON.parse(window.sessionStorage.getItem(storageKey)));
  } catch {
    // Private browsing or unavailable storage must not block content management.
  }
  search.value = restored.query;
  status.value = restored.status;
  pageSize.value = String(restored.pageSize);
  let pendingCategory = restored.category;
  let products = [];
  let page = restored.page;
  let hasLoaded = false;
  let loading = false;
  let requestVersion = 0;
  let deleting = null;
  const busy = new Set();

  function rememberState() {
    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          query: search.value.slice(0, 256),
          category: pendingCategory ?? category.value,
          status: status.value,
          pageSize: Number(pageSize.value),
          page,
        }),
      );
    } catch {
      // Storage is optional; saving and publishing still work if it is unavailable.
    }
  }

  function setError(message = '') {
    error.textContent = message;
    error.hidden = !message;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function entryHref(product) {
    return `/admin#/collections/${collection}/entries/${encodeURIComponent(product.entryKey || product.id)}`;
  }

  function addDate(row, value, missingLabel) {
    const cell = element('td', 'product-date');
    const formatted = formatProductDate(value);
    if (formatted && isArticle && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const time = element('time', '', value);
      time.dateTime = value;
      cell.append(time);
    } else if (formatted) {
      const time = element('time');
      time.dateTime = value;
      time.append(element('span', '', formatted.date), element('small', '', formatted.time));
      time.title = 'America/Los_Angeles';
      cell.append(time);
    } else {
      cell.textContent = '—';
      cell.title = missingLabel;
    }
    row.append(cell);
  }

  function actionButton(product, action, label, className = '') {
    const button = element(
      'button',
      `product-action product-action-${action} ${className}`.trim(),
      label,
    );
    button.type = 'button';
    button.dataset.productAction = action;
    button.dataset.productId = product.id;
    button.disabled = busy.has(product.id);
    return button;
  }

  function renderRow(product) {
    const row = element('tr');
    row.dataset.productId = product.id;
    const id = element('td', 'product-id', product.id);
    id.title = product.id;
    row.append(id);
    const info = element('td');
    const wrapper = element('div', isArticle ? 'article-info' : 'product-info');
    if (!isArticle && typeof product.image === 'string' && product.image.startsWith('/images/')) {
      const image = element('img', 'product-thumbnail');
      image.src = product.image;
      image.alt = '';
      image.width = 48;
      image.height = 48;
      image.loading = 'lazy';
      image.addEventListener(
        'error',
        () => image.replaceWith(element('span', 'product-image-placeholder', '暂无图片')),
        { once: true },
      );
      wrapper.append(image);
    } else if (!isArticle) wrapper.append(element('span', 'product-image-placeholder', '暂无图片'));
    const title = (isArticle ? product.title : product.name) || `未命名${label}`;
    const name = element('span', isArticle ? 'product-name article-name' : 'product-name', title);
    name.title = title;
    wrapper.append(name);
    info.append(wrapper);
    row.append(info, element('td', 'product-category-name', product.categoryName || '未分类'));
    const stateCell = element('td');
    const state = product.deletedAt ? 'deleted' : product.published ? 'published' : 'draft';
    stateCell.append(
      element(
        'span',
        `product-status product-status-${state}`,
        product.deletedAt ? '已删除' : product.published ? '已发布' : '未发布',
      ),
    );
    row.append(stateCell);
    if (isArticle) {
      addDate(row, product.date || product.dateModified, '尚未记录文章时间');
      const updated = formatProductDate(product.dateModified);
      if (updated)
        row.lastElementChild.title = `发布时间：${product.date || '—'}；更新时间：${updated.date}${updated.time ? ` ${updated.time}` : ''}`;
    } else {
      addDate(row, product.createdAt, '旧产品未记录创建时间');
      addDate(row, product.updatedAt, '尚未记录更新时间');
    }
    const actions = element('td', 'product-actions');
    if (product.deletedAt) actions.append(actionButton(product, 'restore', '恢复'));
    else {
      const edit = element('a', 'product-action product-action-edit', '编辑');
      edit.href = entryHref(product);
      const preview = element('a', 'product-action product-action-preview', '预览');
      preview.href = `/admin/${isArticle ? 'article' : 'product'}-preview/${encodeURIComponent(product.id)}`;
      preview.target = '_blank';
      preview.rel = 'noopener noreferrer';
      actions.append(
        edit,
        preview,
        actionButton(product, 'delete', '删除'),
        actionButton(
          product,
          product.published ? 'unpublish' : 'publish',
          product.published ? '下架' : '发布',
        ),
      );
      if (busy.has(product.id)) {
        edit.setAttribute('aria-disabled', 'true');
        preview.setAttribute('aria-disabled', 'true');
        edit.tabIndex = -1;
        preview.tabIndex = -1;
      }
    }
    row.append(actions);
    return row;
  }

  function render() {
    const filtered = filterProductRows(products, {
      query: search.value,
      category: category.value,
      status: status.value,
    });
    const size = Number(pageSize.value);
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    if (hasLoaded) page = Math.min(page, pages);
    rows.replaceChildren();
    if (!filtered.length) {
      const row = element('tr');
      const cell = element(
        'td',
        'product-empty',
        loading
          ? `正在加载${label}…`
          : status.value === 'trash'
            ? `回收站暂无匹配${label}`
            : `没有找到匹配的${label}`,
      );
      cell.colSpan = isArticle ? 6 : 7;
      row.append(cell);
      rows.append(row);
    } else rows.append(...filtered.slice((page - 1) * size, page * size).map(renderRow));
    table.setAttribute('aria-busy', String(loading));
    previous.disabled = !hasLoaded || page <= 1 || loading;
    next.disabled = !hasLoaded || page >= pages || loading;
    refresh.disabled = loading;
    pageLabel.textContent = hasLoaded ? `${page} / ${pages}` : '—';
    total.textContent = loading ? '正在加载…' : `共 ${filtered.length} 条`;
    if (hasLoaded && !loading) rememberState();
  }

  async function load(clearError = true) {
    const version = ++requestVersion;
    loading = true;
    if (clearError) setError();
    render();
    try {
      const response = await fetch(api, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `${label}列表加载失败，请重试。`);
      if (version !== requestVersion) return;
      products = data[collection];
      const selected = pendingCategory ?? category.value;
      category.replaceChildren(new Option('全部分类', ''));
      for (const item of data.categories) category.add(new Option(item.name, item.slug));
      category.value = selected;
      pendingCategory = null;
      hasLoaded = true;
    } catch (failure) {
      if (version === requestVersion) setError(failure.message || `${label}列表加载失败，请重试。`);
    } finally {
      if (version === requestVersion) {
        loading = false;
        render();
      }
    }
  }

  async function perform(product, action) {
    if (busy.has(product.id)) return;
    busy.add(product.id);
    setError();
    render();
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, action, revision: product.revision }),
      });
      const result = await response.json();
      if (!response.ok) {
        const message = result.error || '操作失败，请重试。';
        if (response.status === 409) {
          await load(false);
          throw new Error(`${message} 列表已刷新，请确认后重试。`);
        }
        throw new Error(message);
      }
      await load(false);
    } catch (failure) {
      setError(failure.message || '操作失败，请重试。');
    } finally {
      busy.delete(product.id);
      render();
    }
  }

  rows.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const disabledLink = event.target.closest('a[aria-disabled="true"]');
    if (disabledLink) {
      event.preventDefault();
      return;
    }
    const button = event.target.closest('button[data-product-action]');
    if (!button) return;
    const product = products.find((item) => item.id === button.dataset.productId);
    if (!product) return;
    if (button.dataset.productAction === 'delete') {
      deleting = product;
      manager.querySelector('[data-product-delete-name]').textContent =
        product.name || product.title || product.id;
      dialog.showModal();
    } else void perform(product, button.dataset.productAction);
  });
  deleteCancel.addEventListener('click', () => dialog.close());
  deleteConfirm.addEventListener('click', async () => {
    if (!deleting) return;
    deleteConfirm.disabled = true;
    deleteCancel.disabled = true;
    await perform(deleting, 'delete');
    deleteConfirm.disabled = false;
    deleteCancel.disabled = false;
    deleting = null;
    dialog.close();
  });
  dialog.addEventListener('cancel', (event) => {
    if (deleteConfirm.disabled) event.preventDefault();
  });
  for (const field of [search, category, status, pageSize])
    field.addEventListener(field === search ? 'input' : 'change', () => {
      page = 1;
      render();
    });
  previous.addEventListener('click', () => {
    page -= 1;
    render();
  });
  next.addEventListener('click', () => {
    page += 1;
    render();
  });
  refresh.addEventListener('click', () => void load());
  document.addEventListener(`studio:${collection}`, () => void load());
  window.addEventListener('hashchange', () => {
    if (!manager.hidden && new RegExp(`^#/collections/${collection}/?$`).test(window.location.hash))
      void load();
  });
  if (!manager.hidden) void load();
}
