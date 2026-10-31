const planning = typeof document !== 'undefined' && document.getElementById('studio-seo-planning');
const operations = typeof document !== 'undefined' && document.getElementById('studio-operations');
if (planning && operations) {
  const mains = [planning, operations];
  const form = planning.querySelector('[data-topic-form]');
  const fieldset = form.querySelector('fieldset');
  const group = form.elements.groupSlug;
  const topic = form.elements.topicSlug;
  const history = planning.querySelector('[data-planning-batch]');
  const add = planning.querySelector('[data-planning-add]');
  const all = planning.querySelector('[data-planning-all]');
  let state;
  let busy = false;
  let batchId = '';
  const selected = new Set();
  const intents = { informational: '信息了解', commercial: '采购比较', transactional: '采购行动' };
  const formats = {
    guide: '指南',
    comparison: '对比',
    faq: '常见问题',
    update: '更新',
    landing_page: '落地页',
  };
  const statuses = { todo: '待安排', in_progress: '进行中', done: '已完成' };
  const node = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const date = (value) =>
    new Date(value).toLocaleString('zh-CN', { timeZone: 'America/Los_Angeles' });
  const groups = () =>
    (state?.taxonomy.groups || []).filter(
      (item) =>
        !item.deletedAt &&
        item.items.some(
          (child) =>
            !child.deletedAt &&
            !state.taxonomy.categories.find((cat) => cat.slug === child.category)?.deletedAt,
        ),
    );
  function options(select, entries, placeholder, value) {
    select.replaceChildren(new Option(placeholder, ''));
    for (const entry of entries) select.add(new Option(entry.name, entry.slug));
    select.value = entries.some((entry) => entry.slug === value) ? value : '';
  }
  function fillTopics() {
    options(
      topic,
      (groups().find((item) => item.slug === group.value)?.items || []).filter(
        (item) =>
          !item.deletedAt &&
          !state.taxonomy.categories.find((cat) => cat.slug === item.category)?.deletedAt,
      ),
      '全部二级分类',
      topic.value,
    );
  }
  const batch = () => state?.batches.find((item) => item.id === batchId);
  const topics = () => (batch()?.topics || []).filter((item) => !item.deletedAt);
  const added = (id) => state?.plans.some((item) => item.topicId === id);
  function message(problem = '', success = '') {
    for (const main of mains) {
      const error = main.querySelector('[data-planning-error]');
      error.textContent = problem;
      error.hidden = !problem;
      main.querySelector('[data-planning-feedback]').textContent = success;
    }
  }
  function selection() {
    const available = topics().filter((item) => !added(item.id));
    const valid = new Set(available.map((item) => item.id));
    for (const id of selected) if (!valid.has(id)) selected.delete(id);
    all.checked = Boolean(available.length) && selected.size === available.length;
    all.indeterminate = selected.size > 0 && !all.checked;
    all.disabled = busy || !available.length;
    add.disabled = busy || !selected.size;
    planning.querySelector('[data-planning-count]').textContent =
      `本批 ${topics().length} 个主题，已选择 ${selected.size} 个`;
  }
  function render() {
    fieldset.disabled = busy || !state;
    for (const main of mains)
      for (const button of main.querySelectorAll(
        'button, [data-plan-status], [data-candidate-check]',
      ))
        button.disabled = busy || !state;
    history.disabled = busy || !state;
    // Refresh remains available after a failed initial read.
    for (const main of mains) main.querySelector('[data-planning-refresh]').disabled = busy;
    if (!state) return;
    options(group, groups(), '请选择一级分类', group.value);
    fillTopics();
    history.replaceChildren(new Option(state.batches.length ? '请选择历史批次' : '暂无批次', ''));
    for (const item of [...state.batches].reverse())
      history.add(
        new Option(
          `${date(item.createdAt)} · ${state.taxonomy.groups.find((g) => g.slug === item.input.groupSlug)?.name || item.input.groupSlug} · ${item.topics.filter((t) => !t.deletedAt).length} 个`,
          item.id,
        ),
      );
    if (!state.batches.some((item) => item.id === batchId))
      batchId = state.batches.at(-1)?.id || '';
    history.value = batchId;
    const rows = planning.querySelector('[data-planning-rows]');
    rows.replaceChildren();
    for (const item of topics()) {
      const row = node('tr');
      const checkCell = node('td');
      const check = node('input');
      check.type = 'checkbox';
      check.dataset.candidateCheck = item.id;
      check.setAttribute('aria-label', `选择主题：${item.title}`);
      check.checked = selected.has(item.id);
      check.disabled = busy || added(item.id);
      checkCell.append(check);
      const title = node('td');
      title.append(node('strong', item.title), node('span', item.keyword, 'planning-keyword'));
      const type = node(
        'td',
        `${intents[item.intent] || item.intent} / ${formats[item.format] || item.format}`,
      );
      const reason = node('td', item.priorityReason, 'planning-reason');
      const action = node('td');
      if (added(item.id)) action.append(node('span', '已加入运营计划'));
      else {
        const button = node('button', '加入运营计划', 'product-refresh');
        button.type = 'button';
        button.dataset.addTopic = item.id;
        button.disabled = busy;
        action.append(button);
      }
      row.append(checkCell, title, type, reason, action);
      rows.append(row);
    }
    if (!rows.children.length) {
      const row = node('tr');
      const cell = node('td', '暂无候选主题，请先生成规划。', 'product-empty');
      cell.colSpan = 5;
      row.append(cell);
      rows.append(row);
    }
    const plans = operations.querySelector('[data-operations-rows]');
    plans.replaceChildren();
    for (const item of [...state.plans].reverse()) {
      const row = node('tr');
      const cell = node('td');
      const select = node('select');
      select.dataset.planStatus = item.id;
      select.setAttribute('aria-label', `${item.title}的执行状态`);
      select.disabled = busy;
      for (const [value, label] of Object.entries(statuses)) select.add(new Option(label, value));
      select.value = item.status;
      cell.append(select);
      row.append(
        node('td', item.title),
        node('td', item.keyword),
        cell,
        node('td', date(item.createdAt)),
      );
      plans.append(row);
    }
    if (!plans.children.length) {
      const row = node('tr');
      const cell = node('td', '暂无运营计划。可从 SEO文章规划中加入认可的主题。', 'product-empty');
      cell.colSpan = 4;
      row.append(cell);
      plans.append(row);
    }
    operations.querySelector('[data-operations-count]').textContent =
      `${state.plans.length} 项计划`;
    selection();
  }
  async function request(body) {
    const response = await fetch('/api/admin/seo-planning', {
      method: body ? 'POST' : 'GET',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(document.body.dataset.adminMode === 'local' ? { 'X-Soltree-AI-Mode': 'local' } : {}),
      },
      credentials: 'same-origin',
      cache: 'no-store',
      signal: AbortSignal.timeout(110_000),
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || '规划服务暂时不可用。');
    return result;
  }
  async function run(action, progress = '') {
    if (busy) return;
    busy = true;
    message('', progress);
    render();
    try {
      await action();
    } catch (error) {
      message(
        error.name === 'TimeoutError'
          ? '请求超时，请刷新核对历史批次，避免重复生成。'
          : error.message || '操作未完成，请稍后重试。',
      );
    } finally {
      busy = false;
      render();
    }
  }
  async function load() {
    state = await request();
  }
  const addTopics = (ids) =>
    run(async () => {
      state = await request({ action: 'addToOperations', revision: state.revision, batchId, ids });
      selected.clear();
      message('', '已加入运营计划。');
    });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const input = {
      groupSlug: group.value,
      ...(topic.value ? { topicSlug: topic.value } : {}),
      count: Number(form.elements.count.value),
      language: form.elements.language.value,
      audience: form.elements.audience.value.trim(),
      goal: form.elements.goal.value.trim(),
      direction: form.elements.direction.value.trim(),
    };
    void run(async () => {
      state = await request({ action: 'generate', revision: state.revision, input });
      batchId = state.batches.at(-1)?.id || '';
      selected.clear();
      message('', '主题已生成并保存。请选择认可的主题加入运营计划。');
    }, '正在生成主题，请稍候…');
  });
  group.addEventListener('change', () => {
    topic.value = '';
    fillTopics();
  });
  history.addEventListener('change', () => {
    batchId = history.value;
    selected.clear();
    render();
  });
  planning.querySelector('[data-planning-rows]').addEventListener('change', (event) => {
    const id = event.target.dataset.candidateCheck;
    if (!id) return;
    if (event.target.checked) selected.add(id);
    else selected.delete(id);
    selection();
  });
  planning.querySelector('[data-planning-rows]').addEventListener('click', (event) => {
    const id = event.target.closest?.('[data-add-topic]')?.dataset.addTopic;
    if (id) void addTopics([id]);
  });
  all.addEventListener('change', () => {
    selected.clear();
    if (all.checked) for (const item of topics()) if (!added(item.id)) selected.add(item.id);
    render();
  });
  add.addEventListener('click', () => void addTopics([...selected]));
  operations.querySelector('[data-operations-rows]').addEventListener('change', (event) => {
    const id = event.target.dataset.planStatus;
    if (!id) return;
    const status = event.target.value;
    void run(async () => {
      state = await request({
        action: 'updatePlan',
        revision: state.revision,
        id,
        patch: { status },
      });
      message('', '计划状态已保存。');
    });
  });
  for (const main of mains)
    main.querySelector('[data-planning-refresh]').addEventListener('click', () => void run(load));
  for (const view of ['seo-planning', 'operations'])
    document.addEventListener(`studio:${view}`, () => {
      if (!busy) void run(load);
    });
  if (mains.some((main) => !main.hidden)) void run(load);
}
