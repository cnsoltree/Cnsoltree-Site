export function safeAdminDestination(value) {
  const fallback = '/admin';
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//'))
    return fallback;
  try {
    const url = new URL(value, 'https://admin.invalid');
    if (
      url.origin !== 'https://admin.invalid' ||
      !/^\/admin(?:\/|$)/.test(url.pathname) ||
      /^\/admin\/login\/?$/.test(url.pathname)
    )
      return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('[data-admin-login]');
  if (form) {
    const email = form.elements.email;
    const password = form.elements.password;
    const submit = form.querySelector('[data-login-submit]');
    const toggle = form.querySelector('[data-login-password-toggle]');
    const error = form.querySelector('[data-login-error]');
    const feedback = form.querySelector('[data-login-feedback]');
    let busy = false;
    toggle.addEventListener('click', () => {
      const visible = password.type === 'password';
      password.type = visible ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(visible));
      toggle.setAttribute('aria-label', visible ? '隐藏密码' : '显示密码');
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (busy) return;
      busy = true;
      error.hidden = true;
      error.textContent = '';
      feedback.textContent = '正在登录…';
      form.setAttribute('aria-busy', 'true');
      email.disabled = password.disabled = submit.disabled = toggle.disabled = true;
      try {
        const response = await fetch('/api/admin/session', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value.trim(), password: password.value }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success !== true)
          throw new Error(
            result.error ||
              (response.status === 429
                ? '尝试次数过多，请稍后再试。'
                : response.status >= 500
                  ? '登录服务暂不可用，请稍后重试。'
                  : '邮箱或密码不正确，请重试。'),
          );
        feedback.textContent = '登录成功，正在进入后台…';
        password.value = '';
        const requested = new URL(window.location.href).searchParams.get('next');
        window.location.replace(safeAdminDestination(requested || result.redirect));
      } catch (failure) {
        feedback.textContent = '';
        error.textContent =
          failure instanceof TypeError
            ? '暂时无法连接登录服务，请检查网络后重试。'
            : failure.message || '登录未完成，请重试。';
        error.hidden = false;
        password.value = '';
        busy = false;
        email.disabled = password.disabled = submit.disabled = toggle.disabled = false;
        form.setAttribute('aria-busy', 'false');
        password.focus();
      }
    });
  }
}
