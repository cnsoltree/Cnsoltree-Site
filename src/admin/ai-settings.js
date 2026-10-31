const main = typeof document !== 'undefined' && document.getElementById('studio-settings');
if (main) {
  const form = main.querySelector('[data-ai-form]');
  const fieldset = form.querySelector('fieldset');
  const key = form.elements.apiKey;
  const model = form.elements.model;
  const feedback = main.querySelector('[data-ai-feedback]');
  const error = main.querySelector('[data-ai-error]');
  const refresh = main.querySelector('[data-ai-refresh]');
  const remove = main.querySelector('[data-ai-delete]');
  const local = document.body.dataset.adminMode === 'local';
  main.querySelector('[data-ai-scope]').textContent = local
    ? '当前编辑本机配置，与线上设置独立。密钥加密保存在网站仓库之外，不随网站发布。'
    : '当前编辑线上配置。密钥加密保存在服务端，保存后仅显示掩码。';
  let saved;
  let busy = false;
  let dirty = false;
  let models = [];

  function message(problem = '', success = '') {
    error.textContent = problem;
    error.hidden = !problem;
    feedback.textContent = success;
  }
  function lock(value) {
    busy = value;
    fieldset.disabled = busy || !saved;
    refresh.disabled = busy;
    remove.disabled = !saved?.configured;
    form.setAttribute('aria-busy', String(busy));
  }
  async function request(input) {
    const response = await fetch('/api/admin/ai-settings', {
      method: input ? 'POST' : 'GET',
      headers: {
        ...(input ? { 'Content-Type': 'application/json' } : {}),
        ...(local ? { 'X-Soltree-AI-Mode': 'local' } : {}),
      },
      credentials: 'same-origin',
      cache: 'no-store',
      signal: AbortSignal.timeout(45_000),
      ...(input ? { body: JSON.stringify(input) } : {}),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || '设置服务暂时不可用，请稍后重试。');
    return result;
  }
  function fillModels(selected = '') {
    const available = [...new Set([selected, ...models].filter(Boolean))];
    model.replaceChildren(new Option(available.length ? '请选择默认模型' : '请先获取模型列表', ''));
    for (const id of available) model.add(new Option(id, id));
    model.value = selected;
  }
  function renderSaved(value) {
    saved = value;
    key.value = '';
    fillModels(saved.model);
    main.querySelector('[data-ai-key-status]').textContent = saved.configured
      ? `已保存 ${saved.keyHint}。留空保留原密钥，填写新 Key 后点击保存即可更换。`
      : '尚未配置。填写 Key 后获取模型列表，选择模型并保存。';
    dirty = false;
  }
  async function run(action) {
    if (busy) return;
    message();
    lock(true);
    try {
      await action();
    } catch (problem) {
      message(
        problem.name === 'TimeoutError'
          ? '请求超时，请稍后重试。'
          : problem.message || '操作失败，请稍后重试。',
      );
    } finally {
      lock(false);
    }
  }
  async function load() {
    renderSaved(await request());
  }
  const draft = () => ({ apiKey: key.value.trim(), model: model.value });
  form.addEventListener('input', () => {
    dirty = true;
    message();
  });
  form.addEventListener('change', () => {
    dirty = true;
    message();
  });
  main.querySelector('[data-ai-models]').addEventListener(
    'click',
    () =>
      void run(async () => {
        const result = await request({ action: 'models', apiKey: key.value.trim() });
        models = result.models;
        fillModels(model.value);
        message(
          '',
          models.length
            ? `已获取 ${models.length} 个文字模型，请选择后保存；尚未修改已保存配置。`
            : '未找到可访问的文字模型，请检查此 Key 的项目权限。',
        );
      }),
  );
  main.querySelector('[data-ai-test]').addEventListener(
    'click',
    () =>
      void run(async () => {
        const result = await request({ action: 'test', ...draft() });
        message('', result.message);
      }),
  );
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void run(async () => {
      renderSaved(await request({ action: 'save', revision: saved.revision, ...draft() }));
      message('', 'AI 设置已保存。');
    });
  });
  remove.addEventListener('click', () => {
    if (!window.confirm('删除已保存的 API Key 和默认模型？使用此配置的 AI 功能将停止工作。'))
      return;
    void run(async () => {
      renderSaved(await request({ action: 'delete', revision: saved.revision }));
      message('', '已删除保存的 AI 配置。');
    });
  });
  refresh.addEventListener('click', () => {
    if (dirty && !window.confirm('刷新会放弃尚未保存的 AI 设置，是否继续？')) return;
    void run(load);
  });
  document.addEventListener('studio:settings', () => {
    if (!saved && !busy) void run(load);
  });
  window.addEventListener('beforeunload', (event) => {
    if (dirty) {
      event.preventDefault();
    }
  });
  // The shell may dispatch its initial route before this module is initialized.
  if (!main.hidden) void run(load);
}
