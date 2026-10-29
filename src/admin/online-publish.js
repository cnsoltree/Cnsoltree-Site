import { adminLoginHref } from './routes.mjs';

export const publicationLabels = {
  idle: '暂无发布记录',
  queued: '等待构建',
  building: '网站构建中',
  ready: '本次发布已完成',
  error: '发布未完成',
};
export function validPublication(value) {
  return Boolean(
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.hasOwn(publicationLabels, value.status) &&
    (value.message === undefined || typeof value.message === 'string') &&
    (value.url === undefined || typeof value.url === 'string') &&
    ((['idle', 'building', 'error'].includes(value.status) && value.id === undefined) ||
      (typeof value.id === 'string' && /^[a-f0-9]{40}$/.test(value.id))),
  );
}
export function safePublishedUrl(value, origin) {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value, origin);
    return url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      url.origin === new URL(origin).origin
      ? url.href
      : null;
  } catch {
    return null;
  }
}

if (typeof document !== 'undefined') {
  const panel = document.querySelector('[data-online-publish]');
  if (panel && document.body.dataset.adminMode === 'online') initPublication(panel);
}

function initPublication(panel) {
  panel.hidden = false;
  const error = panel.querySelector('[data-publish-error]');
  const login = panel.querySelector('[data-publish-login]');
  const dialog = panel.querySelector('[data-publish-dialog]');
  const dialogError = panel.querySelector('[data-publish-dialog-error]');
  const confirm = panel.querySelector('[data-publish-confirm]');
  const cancel = panel.querySelector('[data-publish-cancel]');
  const open = panel.querySelector('[data-publish-open]');
  const refresh = panel.querySelector('[data-publish-refresh]');
  const logout = panel.querySelector('[data-admin-logout]');
  const storageKey = 'soltree.online-publication.v1';
  let publication = { status: 'idle', message: '正在读取发布状态…' };
  let savedAt = '';
  let needsPublish = false;
  let saveVersion = 0;
  let busy = false;
  let checking = false;
  let expired = false;
  let verified = false;
  let timer;
  let pollCount = 0;
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey));
    if (validPublication(stored?.publication)) publication = stored.publication;
    if (typeof stored?.savedAt === 'string' && Number.isFinite(Date.parse(stored.savedAt)))
      savedAt = stored.savedAt;
    needsPublish = stored?.needsPublish === true;
  } catch {
    /* Browser storage is optional. */
  }

  function showError(message = '', target = error) {
    target.textContent = message;
    target.hidden = !message;
  }
  function remember() {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          publication: {
            status: publication.status,
            ...(publication.id ? { id: publication.id } : {}),
            message: publication.message || '',
          },
          savedAt,
          needsPublish,
        }),
      );
    } catch {
      /* Do not block publishing when storage is unavailable. */
    }
  }
  function inProgress() {
    return ['queued', 'building'].includes(publication.status);
  }
  function render() {
    panel.dataset.status = verified ? publication.status : 'unknown';
    const summary = panel.querySelector('[data-publish-summary]');
    summary.textContent = error.textContent
      ? expired
        ? '登录已过期'
        : '发布状态核对失败'
      : !verified
        ? '核对发布状态'
        : needsPublish && !inProgress()
          ? '云端已保存，待发布'
          : publicationLabels[publication.status];
    summary.title = error.textContent || publication.message || '';
    open.disabled = busy || checking || expired || inProgress();
    open.textContent = inProgress() ? '正在发布…' : '发布到网站';
    refresh.disabled = busy || checking || expired;
    refresh.hidden = !error.textContent || expired;
    confirm.disabled = cancel.disabled = busy;
    logout.disabled = busy;
    login.hidden = !expired;
    remember();
  }
  function schedule() {
    clearTimeout(timer);
    // ponytail: poll only this active page for up to 30 minutes; reopening the page checks again.
    if (inProgress() && !expired && pollCount < 360 && document.visibilityState !== 'hidden')
      timer = setTimeout(() => void status(), 5000);
  }
  function sessionExpired() {
    expired = true;
    login.href = adminLoginHref(window.location.href);
    showError('登录已过期，请重新登录后继续。');
    clearTimeout(timer);
    render();
  }
  async function status() {
    if (checking || busy || expired) return;
    checking = true;
    render();
    try {
      let response = await fetch(
        `/api/admin/publish${publication.id ? `?id=${encodeURIComponent(publication.id)}` : ''}`,
        { credentials: 'same-origin', cache: 'no-store' },
      );
      if (response.status === 404 && publication.id) {
        await response.arrayBuffer();
        const { id: _previousId, ...previous } = publication;
        publication = previous;
        response = await fetch('/api/admin/publish', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
      }
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        sessionExpired();
        return;
      }
      if (!response.ok || !validPublication(result))
        throw new Error(result.error || '暂时无法读取发布状态，请稍后重试。');
      publication = result;
      verified = true;
      showError();
      pollCount += 1;
      schedule();
    } catch (failure) {
      showError(failure.message || '暂时无法读取发布状态，请稍后重试。');
    } finally {
      checking = false;
      render();
    }
  }
  open.addEventListener('click', () => {
    showError('', dialogError);
    dialog.showModal();
  });
  cancel.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', (event) => {
    if (busy) event.preventDefault();
  });
  confirm.addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    const captured = saveVersion;
    showError('', dialogError);
    showError();
    render();
    try {
      const response = await fetch('/api/admin/publish', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        dialog.close();
        sessionExpired();
        return;
      }
      if (!response.ok || !validPublication(result) || result.status === 'idle')
        throw new Error(result.error || '发布请求未确认，请检查状态后重试。');
      publication = result;
      verified = true;
      needsPublish = saveVersion !== captured;
      pollCount = 0;
      dialog.close();
      schedule();
    } catch (failure) {
      showError(failure.message || '发布请求未完成，请重试。', dialogError);
    } finally {
      busy = false;
      render();
    }
  });
  refresh.addEventListener('click', () => {
    pollCount = 0;
    void status();
  });
  document.addEventListener('studio:cloud-saved', (event) => {
    const value = event.detail?.savedAt;
    savedAt =
      typeof value === 'string' && Number.isFinite(Date.parse(value))
        ? value
        : new Date().toISOString();
    saveVersion += 1;
    needsPublish = true;
    render();
  });
  document.addEventListener('studio:session-expired', sessionExpired);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') clearTimeout(timer);
    else if (inProgress()) void status();
  });
  window.addEventListener('pagehide', () => clearTimeout(timer), { once: true });
  logout.addEventListener('click', async () => {
    // The shell can retain an editor while another view is open, so confirm on every logout.
    if (!window.confirm('退出前请先保存需要保留的编辑。确定退出登录？')) return;
    logout.disabled = true;
    try {
      const response = await fetch('/api/admin/session', {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok && response.status !== 401) throw new Error('退出登录未完成，请重试。');
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        /* Optional storage. */
      }
      window.location.replace(adminLoginHref(window.location.href));
    } catch (failure) {
      showError(failure.message || '退出登录未完成，请重试。');
      logout.disabled = false;
    }
  });
  render();
  void status();
}
