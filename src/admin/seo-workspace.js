const intentLabels = {
  informational: '信息了解',
  commercial: '采购比较',
  transactional: '采购行动',
};
const formatLabels = {
  guide: '文章 · 指南',
  comparison: '文章 · 对比',
  faq: '文章 · FAQ',
  landing_page: '关键词落地页',
  update: '更新文章',
};
const researchLabels = {
  pending_research: '待调研',
  researched: '已调研',
  task_created: '已建任务',
};
const taskLabels = { todo: '待处理', in_progress: '写作中', done: '已完成' };
const sourceLabels = {
  taxonomy: '分类',
  product: '产品',
  article: '文章',
  knowledge: '知识库',
  web: '网页',
};

if (typeof document !== 'undefined') {
  const seo = document.getElementById('studio-seo');
  const knowledge = document.getElementById('studio-knowledge');
  if (seo || knowledge) initSeoWorkspace(seo, knowledge);
}

function initSeoWorkspace(seo, knowledge) {
  const api = '/__cms/seo';
  const storageKey = 'soltree.seo-workspace.v1';
  const mains = [seo, knowledge].filter(Boolean);
  let data;
  let loading = false;
  let loadFailed = false;
  let busy = false;
  let requestVersion = 0;
  let tab = 'planning';
  let batchId = '';
  let selected = new Set();
  let saved = {};
  try {
    const value = JSON.parse(window.sessionStorage.getItem(storageKey));
    if (value && typeof value === 'object' && !Array.isArray(value)) saved = value;
    if (['planning', 'tasks', 'diagnostics'].includes(saved.tab)) tab = saved.tab;
    if (typeof saved.batchId === 'string') batchId = saved.batchId;
    if (Array.isArray(saved.selected))
      selected = new Set(saved.selected.filter((id) => typeof id === 'string').slice(0, 300));
  } catch {
    // Optional browser storage must not block content management.
  }
  const planning = seo?.querySelector('[data-seo-planning-form]');
  const knowledgeSearch = knowledge?.querySelector('[data-knowledge-search]');
  const knowledgeStatus = knowledge?.querySelector('[data-knowledge-status]');
  const knowledgeGroup = knowledge?.querySelector('[data-knowledge-group]');
  const knowledgeTopic = knowledge?.querySelector('[data-knowledge-topic]');
  let pendingKnowledge = saved.knowledge || {};
  let pendingPlanning = saved.planning || {};
  if (knowledgeSearch && typeof pendingKnowledge.query === 'string')
    knowledgeSearch.value = pendingKnowledge.query.slice(0, 256);
  if (knowledgeStatus && ['active', 'verified', 'draft', 'trash'].includes(pendingKnowledge.status))
    knowledgeStatus.value = pendingKnowledge.status;
  if (planning) {
    for (const key of ['audience', 'goal', 'direction'])
      if (typeof pendingPlanning[key] === 'string')
        planning.elements[key].value = pendingPlanning[key].slice(
          0,
          key === 'direction' ? 200 : key === 'audience' ? 300 : 500,
        );
    if (['en', 'zh'].includes(pendingPlanning.language))
      planning.elements.language.value = pendingPlanning.language;
    if (
      Number.isInteger(pendingPlanning.count) &&
      pendingPlanning.count >= 1 &&
      pendingPlanning.count <= 30
    )
      planning.elements.count.value = pendingPlanning.count;
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function error(main, message = '') {
    const target = main?.querySelector(
      main === seo ? '[data-seo-error]' : '[data-knowledge-error]',
    );
    if (!target) return;
    target.textContent = message;
    target.hidden = !message;
  }

  function feedback(main, message = '') {
    const target = main?.querySelector(
      main === seo ? '[data-seo-feedback]' : '[data-knowledge-feedback]',
    );
    if (target) target.textContent = message;
  }

  function readPlanning() {
    if (!planning) return {};
    return {
      groupSlug: planning.elements.groupSlug.value,
      ...(planning.elements.topicSlug.value
        ? { topicSlug: planning.elements.topicSlug.value }
        : {}),
      count: Number(planning.elements.count.value),
      audience: planning.elements.audience.value.trim(),
      goal: planning.elements.goal.value.trim(),
      direction: planning.elements.direction.value.trim(),
      language: planning.elements.language.value,
    };
  }

  function remember() {
    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          tab,
          batchId,
          selected: [...selected],
          planning: readPlanning(),
          knowledge: knowledge
            ? {
                query: knowledgeSearch.value.slice(0, 256),
                status: knowledgeStatus.value,
                group: knowledgeGroup.value,
                topic: knowledgeTopic.value,
              }
            : {},
        }),
      );
    } catch {
      // Server records remain available if browser storage is unavailable.
    }
  }

  function groups() {
    return (data?.taxonomy.groups || [])
      .filter((group) => !group.deletedAt)
      .sort((a, b) => a.articles.order - b.articles.order);
  }
  function items(groupSlug) {
    return (
      groups()
        .find((group) => group.slug === groupSlug)
        ?.items.filter(
          (item) =>
            !item.deletedAt &&
            !data.taxonomy.categories.find((category) => category.slug === item.category)
              ?.deletedAt,
        )
        .sort((a, b) => a.articles.order - b.articles.order) || []
    );
  }
  function scopeText(groupSlug, topicSlug) {
    const group = data?.taxonomy.groups.find((entry) => entry.slug === groupSlug);
    if (!groupSlug) return '全站共用';
    const topic = group?.items.find((entry) => entry.slug === topicSlug);
    return `${group?.name || groupSlug}${topicSlug ? ` / ${topic?.name || topicSlug}` : ''}`;
  }

  function fillGroups(
    select,
    { placeholder = '请选择分类', shared = false, selected: value = select.value } = {},
  ) {
    select.replaceChildren(new Option(placeholder, ''));
    if (shared) select.add(new Option('全站共用', '__shared'));
    for (const group of groups()) select.add(new Option(group.name, group.slug));
    select.value = value;
  }

  function fillTopics(select, groupSlug, value = select.value) {
    select.replaceChildren(new Option('全部二级分类', ''));
    for (const item of items(groupSlug)) select.add(new Option(item.name, item.slug));
    select.value = value;
    select.disabled = busy || !groupSlug || groupSlug === '__shared';
  }

  function safeHref(value) {
    if (typeof value !== 'string' || !value) return null;
    try {
      const url = new URL(value, window.location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function link(label, href, className = 'seo-content-link', newTab = true) {
    const url = safeHref(href);
    if (!url) return node('span', '', label);
    const anchor = node('a', className, label);
    anchor.href = url;
    if (newTab) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    return anchor;
  }

  function action(label, actionName, id, prefix, { destructive = false } = {}) {
    const control = node(
      'button',
      `product-action${destructive ? ' product-action-delete' : ''}`,
      label,
    );
    control.type = 'button';
    control.dataset[`${prefix}Action`] = actionName;
    control.dataset.recordId = id;
    control.disabled = busy || loading || loadFailed;
    return control;
  }

  function date(value) {
    if (!value || !Number.isFinite(Date.parse(value))) return '—';
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).format(new Date(value));
  }

  function emptyRow(tbody, columns, message) {
    const row = node('tr');
    const cell = node('td', 'product-empty', message);
    cell.colSpan = columns;
    row.append(cell);
    tbody.append(row);
  }

  function sourcesView(sources = []) {
    const list = node('ul', 'seo-source-list');
    for (const source of sources) {
      const item = node('li');
      const label = `${sourceLabels[source.kind] || '资料'}：${source.title || source.id}`;
      item.append(source.url ? link(label, source.url) : node('span', '', label));
      list.append(item);
    }
    if (!sources.length) list.append(node('li', '', '待补充依据'));
    return list;
  }

  function field(
    parent,
    name,
    labelText,
    value = '',
    {
      tag = 'input',
      required = true,
      options,
      hint = '',
      readonly = false,
      type = 'text',
      maxLength = 1000,
    } = {},
  ) {
    const label = node('label', `seo-field${name === 'content' ? ' seo-field-content' : ''}`);
    label.append(node('span', '', labelText));
    const input = node(tag);
    input.name = name;
    if (tag === 'input') input.type = type;
    if (options) for (const option of options) input.add(new Option(option.label, option.value));
    input.value = value;
    input.required = required;
    input.readOnly = readonly;
    if (tag !== 'select') input.maxLength = maxLength;
    label.append(input);
    if (hint) label.append(node('small', '', hint));
    parent.append(label);
    return input;
  }

  function check(parent, labelText, checked) {
    const label = node('label', 'seo-check');
    const input = node('input');
    input.type = 'checkbox';
    input.checked = checked;
    label.append(input, node('span', '', labelText));
    parent.append(label);
    return input;
  }

  function modal(main, prefix) {
    if (!main) return null;
    const dialog = main.querySelector(`[data-${prefix}-dialog]`);
    const form = main.querySelector(`[data-${prefix}-dialog-form]`);
    const fields = main.querySelector(`[data-${prefix}-dialog-fields]`);
    const problem = main.querySelector(`[data-${prefix}-dialog-error]`);
    const submit = main.querySelector(`[data-${prefix}-dialog-save]`);
    const cancel = main.querySelector(`[data-${prefix}-dialog-cancel]`);
    let handler;
    let readOnly = false;
    function showError(message = '') {
      problem.textContent = message;
      problem.hidden = !message;
    }
    const controller = {
      dialog,
      fields,
      showError,
      open(title, onSubmit, { label = '保存', destructive = false, readonly = false } = {}) {
        main.querySelector(`#${prefix}-dialog-title`).textContent = title;
        fields.replaceChildren();
        showError();
        handler = onSubmit;
        readOnly = readonly;
        submit.textContent = label;
        submit.hidden = readonly;
        submit.className = destructive ? 'product-confirm-delete' : 'seo-dialog-submit';
        if (!dialog.open && !main.hidden && !main.inert) dialog.showModal();
        return fields;
      },
      sync() {
        fields.disabled = busy;
        cancel.disabled = busy;
        submit.disabled = busy || readOnly;
      },
      close() {
        dialog.close();
      },
    };
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!busy && !readOnly) void handler?.();
    });
    cancel.addEventListener('click', () => dialog.close());
    dialog.addEventListener('cancel', (event) => {
      if (busy) event.preventDefault();
    });
    new MutationObserver(() => {
      if ((main.hidden || main.inert) && dialog.open) dialog.close();
    }).observe(main, { attributes: true, attributeFilter: ['hidden', 'inert'] });
    return controller;
  }

  const seoModal = modal(seo, 'seo');
  const knowledgeModal = modal(knowledge, 'knowledge');

  function batch() {
    return data?.workspace.batches.find((entry) => entry.id === batchId);
  }
  function activeTopics() {
    return (batch()?.topics || []).filter((topic) => !topic.deletedAt);
  }

  function renderKnowledge() {
    if (!knowledge) return;
    fillGroups(knowledgeGroup, {
      placeholder: '全部分类',
      shared: true,
      selected: pendingKnowledge.group ?? knowledgeGroup.value,
    });
    fillTopics(
      knowledgeTopic,
      knowledgeGroup.value,
      pendingKnowledge.topic ?? knowledgeTopic.value,
    );
    if (data) pendingKnowledge = {};
    for (const selector of ['[data-knowledge-create]', '[data-knowledge-import]'])
      knowledge.querySelector(selector).disabled = busy || loading || loadFailed || !data;
    knowledge.querySelector('[data-knowledge-refresh]').disabled = busy || loading;
    const tbody = knowledge.querySelector('[data-knowledge-rows]');
    tbody.replaceChildren();
    const query = knowledgeSearch.value.trim().toLocaleLowerCase();
    const records = (data?.workspace.knowledge || [])
      .filter((entry) => {
        if (knowledgeStatus.value === 'trash' ? !entry.deletedAt : entry.deletedAt) return false;
        if (
          ['draft', 'verified'].includes(knowledgeStatus.value) &&
          entry.status !== knowledgeStatus.value
        )
          return false;
        if (knowledgeGroup.value === '__shared' && entry.groupSlug) return false;
        if (
          knowledgeGroup.value &&
          knowledgeGroup.value !== '__shared' &&
          entry.groupSlug !== knowledgeGroup.value
        )
          return false;
        if (knowledgeTopic.value && entry.topicSlug !== knowledgeTopic.value) return false;
        return (
          !query ||
          `${entry.title} ${entry.content} ${entry.notes || ''}`.toLocaleLowerCase().includes(query)
        );
      })
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    for (const entry of records) {
      const row = node('tr');
      const title = node('td');
      title.append(
        node('span', 'seo-title', entry.title),
        node('span', 'seo-subtext seo-clamp', entry.content.slice(0, 180)),
      );
      const category = node('td', '', scopeText(entry.groupSlug, entry.topicSlug));
      const status = node('td');
      status.append(
        node(
          'span',
          `seo-status${entry.deletedAt || entry.status !== 'verified' ? ' seo-status-muted' : ''}`,
          entry.deletedAt ? '已删除' : entry.status === 'verified' ? '已确认' : '待确认',
        ),
      );
      status.append(node('small', 'seo-subtext', entry.enabled ? '已启用' : '未启用'));
      const updated = node('td', 'product-date', date(entry.updatedAt));
      const actions = node('td', 'product-actions');
      if (entry.deletedAt) actions.append(action('恢复', 'restore', entry.id, 'knowledge'));
      else
        actions.append(
          action('编辑', 'edit', entry.id, 'knowledge'),
          action(entry.enabled ? '停用' : '启用', 'toggle', entry.id, 'knowledge'),
          action('删除', 'delete', entry.id, 'knowledge', { destructive: true }),
        );
      row.append(title, category, status, updated, actions);
      tbody.append(row);
    }
    if (!records.length)
      emptyRow(
        tbody,
        5,
        loading
          ? '正在加载知识资料…'
          : data
            ? '暂无匹配资料，添加资料后可用于内容规划。'
            : '资料尚未加载，请点击刷新重试。',
      );
    knowledge.querySelector('[data-knowledge-count]').textContent = loading
      ? '正在加载'
      : data
        ? `共 ${records.length} 条资料`
        : '尚未加载';
    knowledge.querySelector('table').setAttribute('aria-busy', String(loading || busy));
  }

  function renderCandidates() {
    const select = seo.querySelector('[data-seo-batch]');
    const batches = [...(data?.workspace.batches || [])].sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt)),
    );
    if (data && !batches.some((entry) => entry.id === batchId)) batchId = batches[0]?.id || '';
    select.replaceChildren(new Option(batches.length ? '选择历史批次' : '暂无批次', ''));
    for (const entry of batches)
      select.add(
        new Option(
          `${date(entry.createdAt)} · ${scopeText(entry.input.groupSlug, entry.input.topicSlug)} · ${entry.topics.filter((topic) => !topic.deletedAt).length} 个候选`,
          entry.id,
        ),
      );
    select.value = batchId;
    select.disabled = busy || loading || !batches.length;
    const current = batch();
    const topics = activeTopics();
    if (data)
      selected = new Set([...selected].filter((id) => topics.some((topic) => topic.id === id)));
    const description = seo.querySelector('[data-seo-batch-description]');
    description.textContent = current
      ? `${scopeText(current.input.groupSlug, current.input.topicSlug)} · ${current.input.language === 'zh' ? '中文' : 'English'}${current.notes?.length ? ` · ${current.notes.join(' ')}` : ''}`
      : '选择分类生成候选，历史批次会保留。';
    const tbody = seo.querySelector('[data-seo-candidate-rows]');
    tbody.replaceChildren();
    for (const topic of topics) {
      const row = node('tr');
      const selection = node('td');
      const checkbox = node('input');
      checkbox.type = 'checkbox';
      checkbox.checked = selected.has(topic.id);
      checkbox.disabled = busy || loading;
      checkbox.dataset.seoTopicSelection = topic.id;
      checkbox.setAttribute('aria-label', `选择候选：${topic.title}`);
      selection.append(checkbox);
      const title = node('td');
      title.append(node('span', 'seo-title', topic.title));
      if (topic.missingInformation?.length)
        title.append(
          node('small', 'seo-subtext', `待补充：${topic.missingInformation.join('；')}`),
        );
      const update = node('td', '', topic.newOrUpdate === 'update' ? '更新现有文章' : '新建内容');
      if (topic.existingArticleSlug) {
        const existing = node('small', 'seo-subtext');
        existing.append(
          link('查看现有文章', `/blog/${encodeURIComponent(topic.existingArticleSlug)}`),
        );
        update.append(existing);
      }
      const state = node('td');
      state.append(
        node(
          'span',
          `seo-status${topic.status === 'pending_research' ? ' seo-status-warning' : ''}`,
          researchLabels[topic.status] || '待调研',
        ),
      );
      const source = node('td');
      source.append(sourcesView(topic.sources));
      const actions = node('td', 'product-actions');
      actions.append(
        action('编辑', 'edit-candidate', topic.id, 'seo'),
        action('删除', 'delete-candidate', topic.id, 'seo', { destructive: true }),
      );
      row.append(
        selection,
        title,
        node('td', '', topic.keyword),
        node('td', '', intentLabels[topic.intent] || topic.intent),
        node('td', '', formatLabels[topic.format] || topic.format),
        update,
        node('td', '', topic.priorityReason),
        state,
        source,
        actions,
      );
      tbody.append(row);
    }
    if (!topics.length)
      emptyRow(
        tbody,
        10,
        loading
          ? '正在加载内容规划…'
          : data
            ? '暂无候选主题。先选择分类并生成候选框架。'
            : '内容规划尚未加载，请刷新重试。',
      );
    const selectAll = seo.querySelector('[data-seo-select-all]');
    selectAll.disabled = busy || loading || !topics.length;
    selectAll.checked = topics.length > 0 && topics.every((topic) => selected.has(topic.id));
    selectAll.indeterminate = selected.size > 0 && selected.size < topics.length;
    seo.querySelector('[data-seo-selected-count]').textContent = data
      ? `本批次 ${topics.length} 个候选 · 已选择 ${selected.size} 个`
      : '尚未加载';
    seo.querySelector('[data-seo-build-tasks]').disabled =
      busy || loading || loadFailed || !data || !selected.size;
    seo.querySelector('[data-seo-research]').disabled =
      busy || loading || loadFailed || !selected.size || !data?.capabilities.researchConfigured;
    seo.querySelector('[data-seo-research]').title = data?.capabilities.researchConfigured
      ? '对选中的候选执行真实联网调研'
      : '尚未配置联网调研服务，可以先复制调研需求';
  }

  function taskEditorHref(task) {
    if (task.topic.format === 'landing_page') return null;
    const slug = task.topic.existingArticleSlug;
    if (!slug) return '/admin#/collections/articles/new';
    const article = data.inventory.articles.find((entry) => entry.slug === slug);
    return `/admin#/collections/articles/entries/${encodeURIComponent(article?.entryKey || slug)}`;
  }

  function renderTasks() {
    const tbody = seo.querySelector('[data-seo-task-rows]');
    tbody.replaceChildren();
    const filter = seo.querySelector('[data-seo-task-filter]').value;
    const tasks = (data?.workspace.tasks || [])
      .filter((task) => !filter || task.status === filter)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    for (const task of tasks) {
      const row = node('tr');
      const title = node('td');
      title.append(
        node('span', 'seo-title', task.title),
        node('span', 'seo-subtext', task.topic.keyword),
      );
      const status = node('td');
      const select = node('select', 'seo-task-status-select');
      select.setAttribute('aria-label', `任务状态：${task.title}`);
      select.dataset.seoTaskStatus = task.id;
      select.disabled = busy || loading || loadFailed;
      for (const [value, label] of Object.entries(taskLabels)) select.add(new Option(label, value));
      select.value = task.status;
      status.append(select);
      const actions = node('td', 'product-actions');
      actions.append(
        action('查看 Brief', 'brief', task.id, 'seo'),
        action('复制', 'copy-task', task.id, 'seo'),
      );
      const href = taskEditorHref(task);
      if (href)
        actions.append(
          link(
            task.topic.existingArticleSlug ? '编辑文章' : '新建文章',
            href,
            'product-action',
            false,
          ),
        );
      row.append(
        title,
        node('td', '', formatLabels[task.topic.format] || task.topic.format),
        node('td', '', scopeText(task.taxonomy.groupSlug, task.taxonomy.topicSlug)),
        status,
        node('td', 'product-date', date(task.createdAt)),
        actions,
      );
      tbody.append(row);
    }
    if (!tasks.length)
      emptyRow(
        tbody,
        6,
        loading ? '正在加载写作任务…' : '暂无匹配任务。选择候选主题后生成写作任务。',
      );
    seo.querySelector('[data-seo-task-count]').textContent = data
      ? String(data.workspace.tasks.length)
      : '';
  }

  function renderDiagnostics() {
    const summary = seo.querySelector('[data-seo-diagnostic-summary]');
    summary.replaceChildren();
    for (const [label, value] of [
      ['文章条目', data?.inventory.articles.length],
      ['产品条目', data?.inventory.products.length],
      ['本地待检查项', data?.findings.length],
    ]) {
      const card = node('div', 'seo-diagnostic-card');
      card.append(
        node('span', '', label),
        node('strong', '', value === undefined ? '—' : String(value)),
      );
      summary.append(card);
    }
    const tbody = seo.querySelector('[data-seo-diagnostic-rows]');
    tbody.replaceChildren();
    for (const finding of data?.findings || []) {
      const row = node('tr');
      const title = node('td');
      title.append(
        node('span', 'seo-title', finding.title),
        node('small', 'seo-subtext', finding.severity === 'warning' ? '需要检查' : '优化建议'),
      );
      const record = data.inventory[
        finding.recordType === 'article' ? 'articles' : 'products'
      ].find((entry) => entry.slug === finding.recordId || entry.id === finding.recordId);
      const info = node('td');
      info.append(link(record?.title || record?.name || finding.recordId, finding.href));
      const action = node('td');
      action.append(link('编辑内容', finding.editHref, 'product-action', false));
      row.append(title, info, node('td', '', finding.description), action);
      tbody.append(row);
    }
    if (!data?.findings.length)
      emptyRow(
        tbody,
        4,
        loading
          ? '正在读取本地检查…'
          : data
            ? '本次本地检查暂无待办。搜索表现与索引状态仍需接入 GSC 后确认。'
            : '本地检查尚未加载，请刷新重试。',
      );
  }

  function renderSeo() {
    if (!seo) return;
    for (const button of seo.querySelectorAll('[data-seo-tab]')) {
      const active = button.dataset.seoTab === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    }
    for (const panel of seo.querySelectorAll('[data-seo-panel]'))
      panel.hidden = panel.dataset.seoPanel !== tab;
    fillGroups(planning.elements.groupSlug, {
      selected: pendingPlanning.groupSlug ?? planning.elements.groupSlug.value,
    });
    fillTopics(
      planning.elements.topicSlug,
      planning.elements.groupSlug.value,
      pendingPlanning.topicSlug ?? planning.elements.topicSlug.value,
    );
    if (data) pendingPlanning = {};
    planning.querySelector('[data-seo-generate]').disabled = busy || loading || loadFailed || !data;
    planning.querySelector('[data-seo-copy-research]').disabled = busy || loading || !data;
    seo.querySelector('[data-seo-refresh]').disabled = busy || loading;
    seo.querySelector('[data-seo-provider-status]').textContent = !data
      ? '正在读取配置…'
      : data.capabilities.researchConfigured
        ? '联网调研服务已配置'
        : '联网调研尚未配置，可先生成本地候选或复制需求继续调研';
    renderCandidates();
    renderTasks();
    renderDiagnostics();
    for (const table of seo.querySelectorAll('table'))
      table.setAttribute('aria-busy', String(busy || loading));
  }

  function render() {
    renderKnowledge();
    renderSeo();
    seoModal?.sync();
    knowledgeModal?.sync();
    if (data && !loading) remember();
  }

  async function load(main, { clear = true } = {}) {
    const version = ++requestVersion;
    loading = true;
    if (clear) error(main);
    render();
    try {
      const response = await fetch(api, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '工作区加载失败，请重试。');
      if (version === requestVersion) {
        data = result;
        loadFailed = false;
      }
    } catch (failure) {
      if (version === requestVersion) {
        loadFailed = true;
        error(main, failure.message || '工作区加载失败，请重试。');
      }
    } finally {
      if (version === requestVersion) {
        loading = false;
        render();
      }
    }
  }

  async function mutate(
    main,
    actionName,
    payload = {},
    { dialog, message = '已保存', after } = {},
  ) {
    if (!data || busy) return false;
    if (loading || loadFailed) {
      const message = '请先成功刷新工作区，再保存修改。';
      if (dialog?.dialog.open) dialog.showError(message);
      else error(main, message);
      return false;
    }
    busy = true;
    error(main);
    feedback(main);
    dialog?.showError();
    render();
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revision: data.revision, action: actionName, ...payload }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          await load(main, { clear: false });
          throw new Error(`${result.error || '资料刚刚被更新。'} 已刷新工作区，请检查后重试。`);
        }
        throw new Error(result.error || '操作未完成，请重试。');
      }
      data = result;
      after?.(result);
      dialog?.close();
      feedback(main, message);
      return true;
    } catch (failure) {
      if (dialog?.dialog.open) dialog.showError(failure.message || '操作未完成，请重试。');
      else error(main, failure.message || '操作未完成，请重试。');
      return false;
    } finally {
      busy = false;
      render();
    }
  }

  function knowledgeEntry(entry, changes = {}) {
    return {
      id: entry.id,
      title: entry.title,
      content: entry.content,
      status: entry.status,
      enabled: entry.enabled,
      ...(entry.groupSlug ? { groupSlug: entry.groupSlug } : {}),
      ...(entry.topicSlug ? { topicSlug: entry.topicSlug } : {}),
      sourceUrl: entry.sourceUrl || '',
      notes: entry.notes || '',
      ...changes,
    };
  }

  function knowledgeForm(entry = {}, imported) {
    let title, shared, group, topic, content, sourceUrl, notes, status, enabled;
    const fields = knowledgeModal.open(
      entry.id ? '编辑知识资料' : imported ? '导入知识资料' : '添加知识资料',
      () => {
        const value = {
          ...(entry.id ? { id: entry.id } : {}),
          title: title.value.trim(),
          content: content.value.trim(),
          status: status.value,
          enabled: enabled.checked,
          sourceUrl: sourceUrl.value.trim(),
          notes: notes.value.trim(),
          ...(!shared.checked
            ? { groupSlug: group.value, ...(topic.value ? { topicSlug: topic.value } : {}) }
            : {}),
        };
        void mutate(
          knowledge,
          'saveKnowledge',
          { entry: value },
          { dialog: knowledgeModal, message: '资料已保存；只有已确认且启用的资料会用于生成候选。' },
        );
      },
      { label: '保存资料' },
    );
    title = field(fields, 'title', '资料标题', entry.title || imported?.name || '', {
      maxLength: 200,
    });
    shared = check(
      fields,
      '全站共用资料',
      (!entry.groupSlug && !knowledgeGroup.value) || knowledgeGroup.value === '__shared',
    );
    if (entry.id) shared.checked = !entry.groupSlug;
    group = field(fields, 'groupSlug', '一级分类', '', { tag: 'select' });
    fillGroups(group, {
      selected:
        entry.groupSlug || (knowledgeGroup.value === '__shared' ? '' : knowledgeGroup.value),
    });
    topic = field(fields, 'topicSlug', '二级分类', '', { tag: 'select', required: false });
    fillTopics(topic, group.value, entry.topicSlug || knowledgeTopic.value);
    const updateScope = () => {
      group.closest('label').hidden = topic.closest('label').hidden = shared.checked;
      group.required = !shared.checked;
      topic.required = false;
    };
    shared.addEventListener('change', updateScope);
    updateScope();
    group.addEventListener('change', () => fillTopics(topic, group.value, ''));
    content = field(fields, 'content', '资料正文', entry.content || imported?.content || '', {
      tag: 'textarea',
      maxLength: 60000,
      hint: '保留真实参数、产品限制与来源信息，避免写入未经确认的结论。',
    });
    sourceUrl = field(fields, 'sourceUrl', '来源链接', entry.sourceUrl || '', {
      required: false,
      type: 'url',
      maxLength: 2048,
      hint: '选填，可填写产品资料或行业来源的 HTTP / HTTPS 链接。',
    });
    notes = field(
      fields,
      'notes',
      '来源说明 / 备注',
      entry.notes || (imported ? `导入文件：${imported.name}` : ''),
      { tag: 'textarea', required: false, maxLength: 10000 },
    );
    status = field(fields, 'status', '资料状态', entry.status || 'draft', {
      tag: 'select',
      options: [
        { value: 'draft', label: '待确认 · 不用于生成候选' },
        { value: 'verified', label: '已确认 · 可作为选题依据' },
      ],
    });
    content.required = status.value === 'verified';
    status.addEventListener('change', () => {
      content.required = status.value === 'verified';
    });
    enabled = check(fields, '启用这条资料', entry.enabled ?? true);
    title.focus();
  }

  function confirm(main, controller, title, description, actionName, payload) {
    const fields = controller.open(
      title,
      () =>
        void mutate(main, actionName, payload, {
          dialog: controller,
          message: actionName === 'deleteCandidate' ? '候选已从当前列表隐藏' : '已移入回收站',
        }),
      { label: '确认删除', destructive: true },
    );
    fields.append(node('p', 'seo-dialog-description', description));
    controller.dialog.querySelector('button[type="button"]').focus();
  }

  function candidateForm(topic) {
    let title, keyword;
    const fields = seoModal.open(
      '编辑候选主题',
      () =>
        void mutate(
          seo,
          'updateCandidate',
          {
            batchId,
            id: topic.id,
            patch: { title: title.value.trim(), keyword: keyword.value.trim() },
          },
          { dialog: seoModal },
        ),
    );
    title = field(fields, 'title', '候选标题', topic.title, { maxLength: 300 });
    keyword = field(fields, 'keyword', '核心关键词', topic.keyword, { maxLength: 200 });
    if (topic.researchSummary)
      field(fields, 'research-summary', '调研摘要', topic.researchSummary, {
        tag: 'textarea',
        readonly: true,
        required: false,
        maxLength: 12000,
      });
    fields.append(
      node('p', 'seo-dialog-description', topic.priorityReason),
      node(
        'p',
        'seo-note',
        '候选主题仍需核实搜索意图与资料依据，编辑标题和关键词不会自动完成调研。',
      ),
      sourcesView(topic.sources),
    );
    if (topic.missingInformation?.length) {
      fields.append(node('p', 'seo-dialog-description', '待补充信息'));
      const gaps = node('ul', 'seo-source-list');
      for (const gap of topic.missingInformation) gaps.append(node('li', '', gap));
      fields.append(gaps);
    }
    title.focus();
  }

  async function copy(text, main, controller) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error();
      await navigator.clipboard.writeText(text);
      feedback(main, '已复制到剪贴板');
      return true;
    } catch {
      const message = '浏览器无法自动复制，请在文本框中手动选择并复制。';
      if (controller?.dialog.open) controller.showError(message);
      else error(main, message);
      return false;
    }
  }

  function briefModal(title, text, main = seo, controller = seoModal, context) {
    const fields = controller.open(
      title,
      async () => {
        await copy(text, main, controller);
      },
      { label: '复制全文' },
    );
    const content = field(fields, 'brief', '任务 / 调研需求', text, {
      tag: 'textarea',
      readonly: true,
      required: false,
      maxLength: Math.max(100000, text.length),
    });
    content.rows = 17;
    if (context?.sources?.length)
      fields.append(node('p', 'seo-dialog-description', '参考来源'), sourcesView(context.sources));
    if (context?.missingInformation?.length) {
      fields.append(node('p', 'seo-dialog-description', '写作前需补充'));
      const list = node('ul', 'seo-source-list');
      for (const item of context.missingInformation) list.append(node('li', '', item));
      fields.append(list);
    }
    content.addEventListener('focus', () => content.select(), { once: true });
    content.focus();
  }

  function researchBrief() {
    const input = readPlanning();
    const evidence = data.workspace.knowledge.filter(
      (entry) =>
        !entry.deletedAt &&
        entry.status === 'verified' &&
        entry.enabled &&
        (!entry.groupSlug ||
          (entry.groupSlug === input.groupSlug &&
            (!entry.topicSlug || !input.topicSlug || entry.topicSlug === input.topicSlug))),
    );
    const current = batch();
    const sameScope =
      current?.input.groupSlug === input.groupSlug &&
      (current?.input.topicSlug || '') === (input.topicSlug || '');
    const currentTopics = sameScope
      ? activeTopics().filter((topic) => !selected.size || selected.has(topic.id))
      : [];
    // ponytail: clipboard briefs cap evidence at 20 excerpts; use the knowledge workspace for full documents.
    return [
      'SEO 选题调研需求',
      '以下候选来自本地资料，仅是待调研框架。请联网核实搜索意图、产品匹配和可引用来源，不得虚构搜索量、难度、排名或网页引用。',
      '附带知识资料为摘录，最多 20 条、每条 6,000 字符。引用具体参数前请核对完整资料。',
      JSON.stringify(
        {
          input: { ...input, category: scopeText(input.groupSlug, input.topicSlug) },
          verifiedKnowledge: evidence.slice(0, 20).map((entry) => ({
            title: entry.title,
            content: entry.content.slice(0, 6000),
            sourceUrl: entry.sourceUrl,
          })),
          candidates: currentTopics.map((topic) => ({
            title: topic.title,
            keyword: topic.keyword,
            intent: topic.intent,
            priorityReason: topic.priorityReason,
            sources: topic.sources,
          })),
        },
        null,
        2,
      ),
      '请区分行业参考信息与本公司的已确认产品事实。无法确认的内容请明确列为待补充，不将本地候选视为已完成调研。',
    ].join('\n\n');
  }

  if (knowledge) {
    knowledge
      .querySelector('[data-knowledge-create]')
      .addEventListener('click', () => knowledgeForm());
    knowledge
      .querySelector('[data-knowledge-refresh]')
      .addEventListener('click', () => void load(knowledge));
    knowledge
      .querySelector('[data-knowledge-import]')
      .addEventListener('click', () => knowledge.querySelector('[data-knowledge-file]').click());
    knowledge.querySelector('[data-knowledge-file]').addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      if (!/\.(txt|md|csv)$/i.test(file.name)) {
        error(knowledge, '请选择 TXT、Markdown 或 CSV 文本文件；暂不支持 PDF 提取。');
        return;
      }
      if (file.size > 60000) {
        error(knowledge, '文件超过 60 KB，请拆分为较小的知识资料后导入。');
        return;
      }
      try {
        const content = await file.text();
        if (!content.trim()) throw new Error('文件内容为空，请选择其他文件。');
        if (content.length > 60000) throw new Error('资料正文超过 60,000 字符，请拆分后导入。');
        knowledgeForm({}, { name: file.name, content });
      } catch (failure) {
        error(knowledge, failure.message || '文件读取失败，请重试。');
      }
    });
    knowledge.querySelector('[data-knowledge-rows]').addEventListener('click', (event) => {
      const control = event.target.closest?.('button[data-knowledge-action]');
      if (!control || busy || loading) return;
      const entry = data.workspace.knowledge.find((item) => item.id === control.dataset.recordId);
      if (!entry) return;
      if (control.dataset.knowledgeAction === 'edit') knowledgeForm(entry);
      if (control.dataset.knowledgeAction === 'toggle')
        void mutate(knowledge, 'saveKnowledge', {
          entry: knowledgeEntry(entry, { enabled: !entry.enabled }),
        });
      if (control.dataset.knowledgeAction === 'restore')
        void mutate(knowledge, 'restoreKnowledge', { id: entry.id }, { message: '资料已恢复' });
      if (control.dataset.knowledgeAction === 'delete')
        confirm(
          knowledge,
          knowledgeModal,
          '删除这条知识资料？',
          `「${entry.title}」将移入回收站，可以恢复。已有写作任务和历史批次会保留。`,
          'deleteKnowledge',
          { id: entry.id },
        );
    });
    for (const field of [knowledgeSearch, knowledgeStatus, knowledgeGroup, knowledgeTopic])
      field.addEventListener(field === knowledgeSearch ? 'input' : 'change', () => {
        if (field === knowledgeGroup) fillTopics(knowledgeTopic, knowledgeGroup.value, '');
        renderKnowledge();
        remember();
      });
  }

  if (seo) {
    const tabs = [...seo.querySelectorAll('[data-seo-tab]')];
    tabs.forEach((button, index) => {
      button.addEventListener('click', () => {
        tab = button.dataset.seoTab;
        renderSeo();
        remember();
      });
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const target =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? tabs.length - 1
              : (index + (event.key === 'ArrowLeft' ? -1 : 1) + tabs.length) % tabs.length;
        tabs[target].click();
        tabs[target].focus();
      });
    });
    planning.elements.groupSlug.addEventListener('change', () => {
      fillTopics(planning.elements.topicSlug, planning.elements.groupSlug.value, '');
      remember();
    });
    planning.addEventListener('change', remember);
    planning.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!data || loading || loadFailed || busy) return;
      const previousIds = new Set(data.workspace.batches.map((entry) => entry.id));
      void mutate(
        seo,
        'generateCandidates',
        { input: readPlanning() },
        {
          message: '候选框架已保存。请继续核实资料和搜索意图，再安排写作。',
          after: (result) => {
            batchId =
              result.workspace.batches.find((entry) => !previousIds.has(entry.id))?.id || batchId;
            selected.clear();
          },
        },
      );
    });
    seo.querySelector('[data-seo-copy-research]').addEventListener('click', () => {
      if (!planning.reportValidity()) return;
      const text = researchBrief();
      briefModal('调研需求 · 可复制到对话中继续', text);
      void copy(text, seo, seoModal);
    });
    seo.querySelector('[data-seo-refresh]').addEventListener('click', () => void load(seo));
    seo.querySelector('[data-seo-batch]').addEventListener('change', (event) => {
      batchId = event.target.value;
      selected.clear();
      renderCandidates();
      remember();
    });
    seo.querySelector('[data-seo-select-all]').addEventListener('change', (event) => {
      selected = event.target.checked
        ? new Set(activeTopics().map((topic) => topic.id))
        : new Set();
      renderCandidates();
      remember();
    });
    seo.querySelector('[data-seo-candidate-rows]').addEventListener('change', (event) => {
      const id = event.target.dataset.seoTopicSelection;
      if (!id) return;
      event.target.checked ? selected.add(id) : selected.delete(id);
      renderCandidates();
      remember();
    });
    seo.querySelector('[data-seo-candidate-rows]').addEventListener('click', (event) => {
      const control = event.target.closest?.('button[data-seo-action]');
      if (!control || busy || loading) return;
      const topic = activeTopics().find((entry) => entry.id === control.dataset.recordId);
      if (!topic) return;
      if (control.dataset.seoAction === 'edit-candidate') candidateForm(topic);
      if (control.dataset.seoAction === 'delete-candidate')
        confirm(
          seo,
          seoModal,
          '删除这个候选？',
          `「${topic.title}」将从当前候选列表隐藏；已有任务会保留。`,
          'deleteCandidate',
          { batchId, id: topic.id },
        );
    });
    seo.querySelector('[data-seo-build-tasks]').addEventListener(
      'click',
      () =>
        void mutate(
          seo,
          'buildTasks',
          { batchId, ids: [...selected] },
          {
            message: '写作任务已生成，不会自动创建或发布文章。',
            after: () => {
              tab = 'tasks';
              selected.clear();
            },
          },
        ),
    );
    seo.querySelector('[data-seo-research]').addEventListener('click', () => {
      if (!data?.capabilities.researchConfigured) return;
      void mutate(
        seo,
        'researchCandidates',
        { batchId, ids: [...selected] },
        { message: '联网调研结果已保存，请检查引用与待补充信息。' },
      );
    });
    seo.querySelector('[data-seo-task-filter]').addEventListener('change', renderTasks);
    seo.querySelector('[data-seo-task-rows]').addEventListener('change', (event) => {
      if (!event.target.dataset.seoTaskStatus) return;
      void mutate(seo, 'updateTask', {
        id: event.target.dataset.seoTaskStatus,
        patch: { status: event.target.value },
      });
    });
    seo.querySelector('[data-seo-task-rows]').addEventListener('click', (event) => {
      const control = event.target.closest?.('button[data-seo-action]');
      if (!control || busy || loading) return;
      const task = data.workspace.tasks.find((entry) => entry.id === control.dataset.recordId);
      if (!task) return;
      if (control.dataset.seoAction === 'brief')
        briefModal(task.title, task.brief, seo, seoModal, task);
      if (control.dataset.seoAction === 'copy-task') {
        briefModal(task.title, task.brief, seo, seoModal, task);
        void copy(task.brief, seo, seoModal);
      }
    });
  }

  document.addEventListener('studio:seo', () => {
    if (!busy) void load(seo);
  });
  document.addEventListener('studio:knowledge', () => {
    if (!busy) void load(knowledge);
  });
  render();
  const visible = mains.find((main) => !main.hidden);
  if (visible) void load(visible);
}
