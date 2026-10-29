export const ADMIN_EMAIL = 'jacky@cnsoltree.com';
export const adminProblem = (status, message) => Object.assign(new Error(message), { status });

export function adminOrigin(request, development = false) {
  const url = new URL(request.url);
  const local = development && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (!local && url.origin !== 'https://www.elesoltree.com')
    throw adminProblem(403, '请从正式网站后台执行此操作。');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (request.headers.get('origin') !== url.origin)
      throw adminProblem(403, '请求来源无效，请刷新后台后重试。');
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
      throw adminProblem(415, '请使用 JSON 提交操作。');
  }
}

export async function adminBody(request, limit = 3_500_000) {
  const chunks = [];
  let bytes = 0;
  const reader = request.body?.getReader();
  if (!reader) throw adminProblem(400, '请求内容为空。');
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > limit) {
        await reader.cancel();
        throw adminProblem(413, '内容过大，请分次上传，单张图片不超过 2 MB。');
      }
      chunks.push(value);
    }
    const result = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error();
    return result;
  } catch (error) {
    if (error.status) throw error;
    throw adminProblem(400, '请求格式不正确。');
  } finally {
    reader.releaseLock();
  }
}

export const adminJson = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'X-Content-Type-Options': 'nosniff',
      Vary: 'Cookie',
    },
  });

export function createAdminAuth({ url, serviceKey, fetchImpl = fetch }) {
  let origin;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.pathname !== '/'
    )
      throw new Error();
    origin = parsed.origin;
  } catch {
    throw adminProblem(503, '线上登录尚未配置。');
  }
  if (!serviceKey) throw adminProblem(503, '线上登录尚未配置。');
  async function call(path, options = {}) {
    let response;
    try {
      response = await fetchImpl(`${origin}/auth/v1/${path}`, {
        ...options,
        headers: { apikey: serviceKey, 'Content-Type': 'application/json', ...options.headers },
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw adminProblem(503, '登录服务暂时不可用，请稍后再试。');
    }
    if (!response.ok)
      throw adminProblem(
        response.status === 429 ? 429 : 401,
        response.status === 429 ? '登录尝试较多，请稍后再试。' : '邮箱或密码不正确，或登录已过期。',
      );
    return response.status === 204 ? null : response.json();
  }
  function allowed(user) {
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL || !user.email_confirmed_at)
      throw adminProblem(403, '此账号没有内容管理权限。');
    return { id: user.id, email: user.email };
  }
  return {
    async login(email, password) {
      if (
        typeof email !== 'string' ||
        email.toLowerCase().trim() !== ADMIN_EMAIL ||
        typeof password !== 'string' ||
        password.length < 8 ||
        password.length > 1024
      )
        throw adminProblem(401, '邮箱或密码不正确。');
      const result = await call('token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email: ADMIN_EMAIL, password }),
      });
      allowed(result.user);
      if (!result.access_token || !result.refresh_token)
        throw adminProblem(502, '登录未完成，请重试。');
      return result;
    },
    async user(token) {
      if (!token) throw adminProblem(401, '请先登录后台。');
      return allowed(await call('user', { headers: { Authorization: `Bearer ${token}` } }));
    },
    async refresh(token) {
      if (!token || token.length > 2048) throw adminProblem(401, '请重新登录后台。');
      const result = await call('token?grant_type=refresh_token', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: token }),
      });
      allowed(result.user);
      return result;
    },
    async logout(token) {
      if (token)
        await call('logout?scope=local', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
    },
  };
}
