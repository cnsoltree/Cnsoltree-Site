/** Admin ordering includes hidden entries; publication uses each surface's visibility separately. */
export function sortTaxonomyRecords(records, surface) {
  return [...records].sort((a, b) => a[surface].order - b[surface].order);
}

/** Move only active siblings and retain the other surface and deleted records unchanged. */
export function reorderTaxonomyRecords(records, surface, sourceSlug, targetSlug) {
  const sorted = sortTaxonomyRecords(
    records.filter((record) => !record.deletedAt),
    surface,
  );
  const source = sorted.findIndex((record) => record.slug === sourceSlug);
  const target = sorted.findIndex((record) => record.slug === targetSlug);
  if (source < 0 || target < 0 || source === target) return records;
  sorted.splice(target, 0, sorted.splice(source, 1)[0]);
  const order = new Map(sorted.map((record, index) => [record.slug, index + 1]));
  return records.map((record) =>
    order.has(record.slug)
      ? { ...record, [surface]: { ...record[surface], order: order.get(record.slug) } }
      : record,
  );
}

/** A shared-list move aligns both placements without rewriting identities or deleted records. */
export function reorderSharedTaxonomyRecords(records, sourceSlug, targetSlug) {
  const moved = reorderTaxonomyRecords(records, 'products', sourceSlug, targetSlug);
  if (moved === records) return records;
  return moved.map((record) =>
    record.deletedAt
      ? record
      : {
          ...record,
          articles: { ...record.articles, order: record.products.order },
        },
  );
}

if (typeof document !== 'undefined') {
  const manager = document.getElementById('studio-groups');
  if (manager) initGroupManager(manager);
}

function initGroupManager(manager) {
  const api = '/__cms/taxonomy';
  const rows = manager.querySelector('[data-group-rows]');
  const table = manager.querySelector('table');
  const error = manager.querySelector('[data-group-error]');
  const feedback = manager.querySelector('[data-group-feedback]');
  const trash = manager.querySelector('[data-group-trash]');
  const create = manager.querySelector('[data-group-create]');
  const categoriesButton = manager.querySelector('[data-group-categories]');
  const refresh = manager.querySelector('[data-group-refresh]');
  const dialog = manager.querySelector('[data-group-dialog]');
  const form = manager.querySelector('[data-group-form]');
  const fields = manager.querySelector('[data-group-fields]');
  const dialogError = manager.querySelector('[data-group-dialog-error]');
  const dialogSave = manager.querySelector('[data-group-dialog-save]');
  const dialogCancel = manager.querySelector('[data-group-dialog-cancel]');
  const storageKey = 'soltree.group-manager.v1';
  const surface = 'products';
  let expanded = new Set();
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey));
    if (Array.isArray(saved?.expanded))
      expanded = new Set(saved.expanded.filter((slug) => typeof slug === 'string').slice(0, 500));
    trash.checked = saved?.trash === true;
  } catch {
    // Storage is optional; inaccessible storage must not block editing.
  }
  let taxonomy;
  let revision;
  let counts = { groups: {}, items: {} };
  let usage = { groups: {}, items: {}, categories: {} };
  let busy = false;
  let loading = false;
  let requestVersion = 0;
  let dialogSubmit;
  let dialogRecordDeleted = false;
  let dragged;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function showError(message = '', target = error) {
    target.textContent = message;
    target.hidden = !message;
  }

  function remember() {
    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({ surface, expanded: [...expanded], trash: trash.checked }),
      );
    } catch {
      // Publishing still works when browser storage is unavailable.
    }
  }

  function accept(data) {
    taxonomy = data.taxonomy;
    revision = data.revision;
    counts = data.counts || { groups: {}, items: {} };
    usage = data.usage || { groups: {}, items: {}, categories: {} };
  }

  function button(text, action, group, item, className = 'product-action') {
    const control = node('button', className, text);
    control.type = 'button';
    control.dataset.groupAction = action;
    control.dataset.groupSlug = group.slug;
    if (item) control.dataset.itemSlug = item.slug;
    control.disabled = busy || loading;
    return control;
  }

  function icon(path) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'group-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.6');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('d', path);
    svg.append(shape);
    return svg;
  }

  function renderRow(group, item, siblings, index) {
    const record = item || group;
    const retired = Boolean(record.deletedAt);
    const row = node('tr', item ? 'group-child' : 'group-parent');
    row.dataset.groupSlug = group.slug;
    if (item) row.dataset.itemSlug = item.slug;
    const name = node('td');
    const wrapper = node('div', 'group-name-cell');
    if (!trash.checked) {
      const drag = button('⠿', 'drag', group, item, 'group-drag');
      drag.draggable = !busy && !loading;
      drag.setAttribute('aria-label', `拖动排序：${record.name}`);
      drag.title = '拖动排序，也可使用右侧上下按钮';
      wrapper.append(drag);
    }
    if (!item) {
      const toggle = button(
        expanded.has(group.slug) ? '⌄' : '›',
        'expand',
        group,
        null,
        'group-expand',
      );
      toggle.setAttribute('aria-expanded', String(expanded.has(group.slug)));
      toggle.setAttribute(
        'aria-label',
        `${expanded.has(group.slug) ? '收起' : '展开'} ${group.name}`,
      );
      wrapper.append(toggle, icon(group.icon));
    }
    wrapper.append(node(item ? 'span' : 'strong', '', record.name));
    name.append(wrapper);
    const key = node('td');
    key.append(node('span', 'group-key', record.slug));
    if (item) {
      const category = taxonomy.categories.find((entry) => entry.slug === item.category);
      const reference = node('span', 'group-category-reference', category?.name || item.category);
      reference.title = item.category;
      key.append(reference);
      if (item.type) key.append(node('span', 'group-type', item.type));
    }
    const countKey = item ? `${group.slug}/${item.slug}` : group.slug;
    const scope = item ? 'items' : 'groups';
    const countCell = node('td', 'group-content-count');
    for (const [view, label] of [
      ['products', '产品'],
      ['articles', '文章'],
    ])
      countCell.append(node('span', '', `${label} ${counts[scope]?.[countKey]?.[view] ?? 0}`));
    countCell.title = '当前已发布内容数量；跨分类内容在所属分组内去重统计';
    const visible = node('td');
    if (retired) visible.append(node('span', 'product-status product-status-deleted', '已删除'));
    else if (trash.checked) visible.textContent = '—';
    else {
      for (const [view, text] of [
        ['products', '产品'],
        ['articles', '文章'],
      ]) {
        if (view === 'articles' && item) {
          visible.append(node('small', '', '文章仅后台分类'));
          continue;
        }
        const label = node('label', 'group-visibility');
        const checkbox = node('input');
        checkbox.type = 'checkbox';
        checkbox.checked = record[view].visible;
        checkbox.disabled = busy || loading;
        checkbox.dataset.groupAction = 'visibility';
        checkbox.dataset.groupSurface = view;
        checkbox.dataset.groupSlug = group.slug;
        if (item) checkbox.dataset.itemSlug = item.slug;
        checkbox.setAttribute('aria-label', `${record.name} 在${text}中显示`);
        label.append(checkbox, node('span', '', text));
        visible.append(label);
      }
    }
    const ordering = node('td');
    if (!trash.checked) {
      const controls = node('div', 'group-order');
      const up = button('↑', 'up', group, item, '');
      const down = button('↓', 'down', group, item, '');
      up.setAttribute('aria-label', `上移 ${record.name}`);
      down.setAttribute('aria-label', `下移 ${record.name}`);
      up.disabled ||= index === 0;
      down.disabled ||= index === siblings.length - 1;
      controls.append(up, node('span', '', String(index + 1)), down);
      ordering.append(controls);
    } else ordering.textContent = '—';
    const actions = node('td', 'product-actions');
    if (retired) {
      const restore = button('恢复', 'restore', group, item);
      if (item && group.deletedAt) {
        restore.disabled = true;
        restore.title = '请先恢复所属一级分组';
      } else if (
        item &&
        taxonomy.categories.find((category) => category.slug === item.category)?.deletedAt
      ) {
        restore.disabled = true;
        restore.title = '请先在分类资料中恢复商品分类';
      }
      actions.append(restore);
    } else if (!trash.checked) {
      actions.append(button('编辑', 'edit', group, item));
      if (item) actions.append(button('分类资料', 'category', group, item));
      else actions.append(button('添加二级分类', 'add', group));
      const remove = button('删除', 'delete', group, item, 'product-action product-action-delete');
      if (usage[scope]?.[countKey]?.deletable === false) {
        remove.disabled = true;
        remove.title = '已有内容引用，请使用隐藏保留原有链接';
      }
      actions.append(remove);
    }
    row.append(name, key, countCell, visible, ordering, actions);
    return row;
  }

  function render() {
    create.disabled = categoriesButton.disabled = busy || loading || !taxonomy;
    refresh.disabled = busy || loading;
    trash.disabled = busy;
    table.setAttribute('aria-busy', String(busy || loading));
    fields.disabled = busy;
    dialogSave.disabled = busy || dialogRecordDeleted;
    dialogCancel.disabled = busy;
    rows.replaceChildren();
    const groups = taxonomy
      ? sortTaxonomyRecords(taxonomy.groups, surface).filter((group) =>
          trash.checked
            ? group.deletedAt || group.items.some((item) => item.deletedAt)
            : !group.deletedAt,
        )
      : [];
    const activeGroups = taxonomy
      ? sortTaxonomyRecords(
          taxonomy.groups.filter((group) => !group.deletedAt),
          surface,
        )
      : [];
    let itemCount = 0;
    for (const group of groups) {
      rows.append(renderRow(group, null, activeGroups, activeGroups.indexOf(group)));
      const items = sortTaxonomyRecords(group.items, surface).filter((item) =>
        trash.checked ? item.deletedAt : !item.deletedAt,
      );
      itemCount += items.length;
      if (expanded.has(group.slug))
        for (const [index, item] of items.entries())
          rows.append(renderRow(group, item, items, index));
    }
    if (!groups.length) {
      const row = node('tr');
      const cell = node(
        'td',
        'product-empty',
        loading
          ? '正在加载分组…'
          : trash.checked
            ? '回收站暂无分组或分类'
            : '暂无分组，点击上方按钮创建',
      );
      cell.colSpan = 6;
      row.append(cell);
      rows.append(row);
    }
    manager.querySelector('[data-group-total]').textContent = taxonomy
      ? `${groups.length} 个一级分组 · ${itemCount} 个二级分类`
      : '正在加载';
  }

  async function load(clearError = true) {
    const version = ++requestVersion;
    loading = true;
    if (clearError) showError();
    render();
    try {
      const response = await fetch(api, { cache: 'no-store' });
      if (document.body.dataset.adminMode === 'online' && response.status === 401)
        document.dispatchEvent(new Event('studio:session-expired'));
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '分组加载失败，请重试。');
      if (version === requestVersion) accept(data);
    } catch (failure) {
      if (version === requestVersion) showError(failure.message || '分组加载失败，请重试。');
    } finally {
      if (version === requestVersion) {
        loading = false;
        render();
      }
    }
  }

  async function save(change) {
    if (!taxonomy || busy) return false;
    const next = JSON.parse(JSON.stringify(taxonomy));
    try {
      change(next);
    } catch (failure) {
      showError(failure.message, dialog.open ? dialogError : error);
      return false;
    }
    busy = true;
    showError();
    showError('', dialogError);
    feedback.textContent = '';
    render();
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revision, taxonomy: next }),
      });
      if (document.body.dataset.adminMode === 'online' && response.status === 401)
        document.dispatchEvent(new Event('studio:session-expired'));
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          await load(false);
          throw new Error(`${data.error || '分组已被更新。'} 已重新读取，请检查后再次保存。`);
        }
        throw new Error(data.error || '保存失败，请重试。');
      }
      accept(data);
      if (document.body.dataset.adminMode === 'online')
        document.dispatchEvent(
          new CustomEvent('studio:cloud-saved', {
            detail: { savedAt: data.savedAt || new Date().toISOString() },
          }),
        );
      if (dialog.open) dialog.close();
      feedback.textContent =
        document.body.dataset.adminMode === 'online'
          ? '已保存到云端，点击右上角“发布到网站”后前台生效。'
          : '已保存';
      document.dispatchEvent(new CustomEvent('studio:taxonomy-saved'));
      return true;
    } catch (failure) {
      showError(failure.message || '保存失败，请重试。', dialog.open ? dialogError : error);
      return false;
    } finally {
      busy = false;
      render();
    }
  }

  function openDialog(title, submit, { destructive = false, deleted = false } = {}) {
    fields.replaceChildren();
    manager.querySelector('#group-dialog-title').textContent = title;
    showError('', dialogError);
    dialogRecordDeleted = deleted;
    dialogSubmit = submit;
    dialogSave.textContent = destructive ? '移入回收站' : '保存';
    dialogSave.className = destructive ? 'product-confirm-delete' : 'group-save';
    render();
  }

  function field(
    name,
    text,
    value = '',
    { tag = 'input', required = true, readonly = false, hint = '', parent = fields, options } = {},
  ) {
    const label = node('label', 'group-field');
    label.append(node('span', '', text));
    const input = node(tag);
    input.name = name;
    if (tag === 'input') {
      input.type = 'text';
      input.maxLength = name === 'image' ? 300 : 120;
    }
    if (tag === 'textarea') input.maxLength = 10000;
    if (options) for (const option of options) input.append(new Option(option.name, option.slug));
    input.value = value;
    input.required = required;
    input.readOnly = readonly;
    if (name.endsWith('slug')) {
      input.pattern = '[a-z0-9]+(-[a-z0-9]+)*';
      input.maxLength = 100;
    }
    label.append(input);
    if (hint) label.append(node('small', '', hint));
    parent.append(label);
    return input;
  }

  function defaultSlug(name, slug) {
    name.addEventListener('change', () => {
      if (!slug.value)
        slug.value = name.value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
    });
  }

  function nextOrder(records, view) {
    return Math.max(0, ...records.map((record) => record[view].order)) + 1;
  }

  function viewSettings(records) {
    return {
      products: { visible: true, order: nextOrder(records, 'products') },
      articles: { visible: true, order: nextOrder(records, 'articles') },
    };
  }

  function groupForm(group) {
    let name, slug, description, selectedIcon;
    openDialog(group ? '编辑一级分组' : '新建一级分组', () =>
      save((next) => {
        const value = {
          name: name.value.trim(),
          description: description.value.trim(),
          icon: selectedIcon.value,
        };
        if (group)
          Object.assign(
            next.groups.find((entry) => entry.slug === group.slug),
            value,
          );
        else {
          if (next.groups.some((entry) => entry.slug === slug.value.trim()))
            throw new Error('这个分组标识已存在，请使用其他标识。');
          next.groups.push({
            slug: slug.value.trim(),
            ...value,
            ...viewSettings(next.groups),
            items: [],
          });
          expanded.add(slug.value.trim());
          remember();
        }
      }),
    );
    name = field('name', '分组名称', group?.name);
    slug = field('slug', '分组标识', group?.slug, {
      readonly: Boolean(group),
      hint: group
        ? '标识用于现有链接，创建后保持不变。'
        : '使用小写英文和短横线，例如 circuit-protection。',
    });
    description = field('description', '分组简介', group?.description, { tag: 'textarea' });
    description.maxLength = 2000;
    const icons = [
      ...new Map(
        taxonomy.groups.map((entry) => [entry.icon, { slug: entry.icon, name: entry.name }]),
      ).values(),
    ];
    if (!icons.length)
      icons.push({ slug: 'M4 4h16v16H4V4Zm4 5h8M8 16v-3m4 3v-5m4 5v-2', name: '通用分组' });
    selectedIcon = field('icon', '图标样式', group?.icon || icons[0]?.slug, {
      tag: 'select',
      options: icons,
    });
    fields.append(
      node(
        'p',
        'group-form-note',
        '名称、简介和图标由产品、文章与知识库共用；列表中可分别控制产品与文章的前台显示。',
      ),
    );
    if (!group) defaultSlug(name, slug);
    dialog.showModal();
    name.focus();
  }

  function itemForm(group, item) {
    let name, slug, source, category, type, categoryName, categorySlug, intro, image;
    openDialog(item ? '编辑二级分类' : `添加二级分类 · ${group.name}`, () =>
      save((next) => {
        const target = next.groups.find((entry) => entry.slug === group.slug);
        if (!target || target.deletedAt) throw new Error('所属分组已删除，请关闭窗口后刷新列表。');
        if (item) {
          const current = target.items.find((entry) => entry.slug === item.slug);
          if (!current || current.deletedAt)
            throw new Error('该二级分类已删除，请关闭窗口后刷新列表。');
          current.name = name.value.trim();
          return;
        }
        if (target.items.some((entry) => entry.slug === slug.value.trim()))
          throw new Error('这个二级分类标识已存在，请使用其他标识。');
        let categoryId = category.value;
        if (source.value === 'new') {
          categoryId = categorySlug.value.trim();
          if (next.categories.some((entry) => entry.slug === categoryId))
            throw new Error('这个分类标识已存在，请选择已有分类或更换标识。');
          next.categories.push({
            slug: categoryId,
            name: categoryName.value.trim(),
            shortDescription: intro.value.trim(),
            description: intro.value.trim(),
            image: image.value.trim(),
          });
        }
        target.items.push({
          slug: slug.value.trim(),
          name: name.value.trim(),
          category: categoryId,
          ...(type.value ? { type: type.value } : {}),
          ...viewSettings(target.items),
        });
        expanded.add(group.slug);
        remember();
      }),
    );
    name = field('name', '导航显示名称', item?.name);
    slug = field('slug', '二级分类标识', item?.slug, {
      readonly: Boolean(item),
      hint: '同一一级分组内唯一，创建后保持不变。',
    });
    if (item) {
      field(
        'category-display',
        '对应商品分类',
        taxonomy.categories.find((entry) => entry.slug === item.category)?.name || item.category,
        { readonly: true },
      );
      field('type-display', '产品类型', item.type || '不限类型', { readonly: true });
      fields.append(
        node(
          'p',
          'group-form-note',
          '此处只修改导航显示名称；分类名称、简介和图片请在「分类资料」中修改。',
        ),
      );
    } else {
      source = field('source', '分类来源', 'existing', {
        tag: 'select',
        options: [
          { slug: 'existing', name: '使用已有商品分类' },
          { slug: 'new', name: '新建商品分类' },
        ],
      });
      const options = taxonomy.categories
        .filter((entry) => !entry.deletedAt)
        .map((entry) => ({ slug: entry.slug, name: entry.name }));
      category = field('category', '选择商品分类', options[0]?.slug, { tag: 'select', options });
      type = field('type', '产品类型', '', {
        tag: 'select',
        required: false,
        options: [
          { slug: '', name: '不限类型' },
          ...['MCB', 'MCCB', 'RCCB', 'DC'].map((value) => ({ slug: value, name: value })),
        ],
      });
      const newCategory = node('div', 'group-new-category');
      newCategory.hidden = true;
      fields.append(newCategory);
      categoryName = field('category-name', '商品分类名称', '', { parent: newCategory });
      categorySlug = field('category-slug', '商品分类标识', '', {
        parent: newCategory,
        hint: '用于分类页面链接，例如 dc-fuse-holder。',
      });
      intro = field('intro', '分类简介', '', { tag: 'textarea', parent: newCategory });
      intro.maxLength = 500;
      image = field('image', '分类图片路径', '/images/logo.png', {
        parent: newCategory,
        hint: '填写 /images/ 下的 PNG、JPG、WebP 或 AVIF 图片路径。',
      });
      const updateSource = () => {
        const creating = source.value === 'new';
        category.closest('label').hidden = creating;
        category.required = !creating;
        newCategory.hidden = !creating;
        for (const input of [categoryName, categorySlug, intro, image]) input.required = creating;
      };
      source.addEventListener('change', updateSource);
      if (!options.length) source.value = 'new';
      updateSource();
      defaultSlug(name, slug);
      defaultSlug(categoryName, categorySlug);
      fields.append(
        node(
          'p',
          'group-form-note',
          '同一商品分类可出现在不同分组中。新分类保存后即可在产品和文章编辑器中选择。',
        ),
      );
    }
    dialog.showModal();
    name.focus();
  }

  function categoryForm(categoryId) {
    const current =
      taxonomy.categories.find((entry) => entry.slug === categoryId) ||
      taxonomy.categories.find((entry) => !entry.deletedAt) ||
      taxonomy.categories[0];
    if (!current) {
      showError('暂无商品分类，请先添加二级分类并新建商品分类。');
      return;
    }
    let name, intro, description, image;
    openDialog(
      '分类资料',
      () =>
        save((next) => {
          const target = next.categories.find((entry) => entry.slug === current.slug);
          if (!target || target.deletedAt) throw new Error('分类已删除，请先恢复。');
          Object.assign(target, {
            name: name.value.trim(),
            shortDescription: intro.value.trim(),
            description: description.value.trim(),
            image: image.value.trim(),
          });
        }),
      { deleted: Boolean(current.deletedAt) },
    );
    const selector = field('category-selector', '选择商品分类', current.slug, {
      tag: 'select',
      options: taxonomy.categories.map((entry) => ({
        slug: entry.slug,
        name: `${entry.name}${entry.deletedAt ? '（已删除）' : ''}`,
      })),
    });
    selector.addEventListener('change', () => categoryForm(selector.value));
    name = field('name', '商品分类名称', current.name);
    field('slug', '分类标识', current.slug, {
      readonly: true,
      hint: '此资料在全站共用，不会修改二级导航各自的显示名称。',
    });
    intro = field('intro', '分类简介', current.shortDescription, { tag: 'textarea' });
    intro.maxLength = 500;
    description = field('description', '详细说明', current.description, { tag: 'textarea' });
    image = field('image', '分类图片路径', current.image, {
      hint: '填写 /images/ 下的 PNG、JPG、WebP 或 AVIF 图片路径。',
    });
    const actions = node('div', 'group-category-actions');
    const remove = node(
      'button',
      `product-action${current.deletedAt ? '' : ' product-action-delete'}`,
      current.deletedAt ? '恢复分类' : '删除分类',
    );
    remove.type = 'button';
    const linked = taxonomy.groups.some(
      (group) =>
        !group.deletedAt &&
        group.items.some((item) => !item.deletedAt && item.category === current.slug),
    );
    remove.disabled =
      !current.deletedAt && (linked || usage.categories?.[current.slug]?.deletable === false);
    if (remove.disabled) remove.title = '分类仍被分组或内容引用，暂不能删除';
    remove.addEventListener('click', () => {
      if (current.deletedAt)
        void save((next) => {
          delete next.categories.find((entry) => entry.slug === current.slug).deletedAt;
        });
      else
        confirmDelete('商品分类', current.name, (next) => {
          next.categories.find((entry) => entry.slug === current.slug).deletedAt =
            new Date().toISOString();
        });
    });
    actions.append(remove);
    fields.append(actions);
    if (current.deletedAt) {
      for (const input of [name, intro, description, image]) input.readOnly = true;
      fields.append(node('p', 'group-form-note', '此分类已移入回收站，恢复后可以继续编辑。'));
    }
    if (!dialog.open) dialog.showModal();
  }

  function confirmDelete(kind, name, change) {
    openDialog(`删除${kind}？`, () => save(change), { destructive: true });
    fields.append(node('p', 'product-dialog-name', name));
    fields.append(
      node(
        'p',
        'group-form-note',
        '删除后移入回收站，可以恢复。已有内容引用的分组和分类请使用隐藏，以保留原有页面链接。',
      ),
    );
    if (!dialog.open) dialog.showModal();
    dialogCancel.focus();
  }

  function move(group, item, targetSlug) {
    void save((next) => {
      if (item) {
        const target = next.groups.find((entry) => entry.slug === group.slug);
        target.items = reorderSharedTaxonomyRecords(target.items, item.slug, targetSlug);
      } else next.groups = reorderSharedTaxonomyRecords(next.groups, group.slug, targetSlug);
    });
  }

  function locate(control) {
    const group = taxonomy?.groups.find((entry) => entry.slug === control.dataset.groupSlug);
    const item = control.dataset.itemSlug
      ? group?.items.find((entry) => entry.slug === control.dataset.itemSlug)
      : undefined;
    return { group, item };
  }

  rows.addEventListener('click', (event) => {
    const control = event.target.closest?.('button[data-group-action]');
    if (!control || busy || loading) return;
    const { group, item } = locate(control);
    if (!group) return;
    const action = control.dataset.groupAction;
    if (action === 'expand') {
      expanded.has(group.slug) ? expanded.delete(group.slug) : expanded.add(group.slug);
      remember();
      render();
    }
    if (action === 'edit') item ? itemForm(group, item) : groupForm(group);
    if (action === 'add') itemForm(group);
    if (action === 'category') categoryForm(item.category);
    if (action === 'delete')
      confirmDelete(item ? '二级分类' : '一级分组', (item || group).name, (next) => {
        const target = next.groups.find((entry) => entry.slug === group.slug);
        (item ? target.items.find((entry) => entry.slug === item.slug) : target).deletedAt =
          new Date().toISOString();
      });
    if (action === 'restore')
      void save((next) => {
        const target = next.groups.find((entry) => entry.slug === group.slug);
        delete (item ? target.items.find((entry) => entry.slug === item.slug) : target).deletedAt;
      });
    if (action === 'up' || action === 'down') {
      const siblings = sortTaxonomyRecords(
        (item ? group.items : taxonomy.groups).filter((entry) => !entry.deletedAt),
        surface,
      );
      const index = siblings.findIndex((entry) => entry.slug === (item || group).slug);
      const target = siblings[index + (action === 'up' ? -1 : 1)];
      if (target) move(group, item, target.slug);
    }
  });
  rows.addEventListener('change', (event) => {
    const control = event.target;
    if (control.dataset.groupAction !== 'visibility' || busy || loading) return;
    const { group, item } = locate(control);
    if (!group) return;
    const visible = control.checked;
    const view = control.dataset.groupSurface;
    if (!['products', 'articles'].includes(view)) return;
    void save((next) => {
      const target = next.groups.find((entry) => entry.slug === group.slug);
      (item ? target.items.find((entry) => entry.slug === item.slug) : target)[view].visible =
        visible;
    });
  });
  rows.addEventListener('dragstart', (event) => {
    const handle = event.target.closest?.('.group-drag');
    if (!handle || busy || loading || trash.checked) {
      event.preventDefault();
      return;
    }
    dragged = { group: handle.dataset.groupSlug, item: handle.dataset.itemSlug };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(dragged));
  });
  function dropRow(event) {
    const row = event.target.closest?.('tr[data-group-slug]');
    if (!row || !dragged || busy || loading) return;
    if (Boolean(dragged.item) !== Boolean(row.dataset.itemSlug)) return;
    if (dragged.item && dragged.group !== row.dataset.groupSlug) return;
    return row;
  }
  rows.addEventListener('dragover', (event) => {
    const row = dropRow(event);
    if (!row) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    for (const previous of rows.querySelectorAll('.group-drop-target'))
      previous.classList.remove('group-drop-target');
    row.classList.add('group-drop-target');
  });
  rows.addEventListener('drop', (event) => {
    const row = dropRow(event);
    if (!row) return;
    event.preventDefault();
    const group = taxonomy.groups.find((entry) => entry.slug === dragged.group);
    const item = dragged.item
      ? group.items.find((entry) => entry.slug === dragged.item)
      : undefined;
    const targetSlug = item ? row.dataset.itemSlug : row.dataset.groupSlug;
    if ((item || group).slug !== targetSlug) move(group, item, targetSlug);
    dragged = undefined;
  });
  rows.addEventListener('dragend', () => {
    dragged = undefined;
    for (const row of rows.querySelectorAll('.group-drop-target'))
      row.classList.remove('group-drop-target');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!busy && !dialogRecordDeleted) void dialogSubmit?.();
  });
  dialogCancel.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', (event) => {
    if (busy) event.preventDefault();
  });
  create.addEventListener('click', () => groupForm());
  categoriesButton.addEventListener('click', () => categoryForm());
  refresh.addEventListener('click', () => void load());
  trash.addEventListener('change', () => {
    feedback.textContent = '';
    remember();
    render();
  });
  document.addEventListener('studio:groups', () => {
    if (!busy) void load();
  });
  if (!manager.hidden) void load();
}
