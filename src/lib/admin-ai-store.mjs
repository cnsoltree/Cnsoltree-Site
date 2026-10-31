import { supabaseServiceHeaders } from './supabase.mjs';
import { adminProblem } from './admin-auth.mjs';

/** Separate from publishable content. Conditional writes prevent cross-instance lost updates. */
export function createAiCloudStore({ url, serviceKey, fetchImpl = fetch }) {
  let origin;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.pathname !== '/' ||
      parsed.search ||
      parsed.hash ||
      !serviceKey
    )
      throw new Error();
    origin = parsed.origin;
  } catch {
    throw adminProblem(503, 'AI 设置的私有存储尚未配置。');
  }
  async function request(path, options = {}) {
    let response;
    try {
      response = await fetchImpl(`${origin}/rest/v1/soltree_ai_settings${path}`, {
        ...options,
        headers: {
          ...supabaseServiceHeaders(serviceKey),
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: AbortSignal.timeout(15_000),
        redirect: 'error',
      });
    } catch {
      throw adminProblem(503, 'AI 设置存储暂时无法连接。');
    }
    if (!response.ok)
      throw adminProblem(503, 'AI 设置存储不可用，请确认已应用 AI 设置数据库迁移。');
    const rows = await response.json().catch(() => null);
    if (
      !Array.isArray(rows) ||
      rows.length > 1 ||
      (rows[0] &&
        (!Number.isSafeInteger(Number(rows[0].revision)) ||
          Number(rows[0].revision) < 1 ||
          !rows[0].payload))
    )
      throw adminProblem(503, 'AI 设置存储返回了无效数据。');
    return rows[0] ? { revision: Number(rows[0].revision), payload: rows[0].payload } : null;
  }
  return {
    load: () => request('?key=eq.main&select=revision,payload&limit=1'),
    async save(revision, payload) {
      if (!Number.isSafeInteger(revision) || revision < 0 || revision >= Number.MAX_SAFE_INTEGER)
        throw adminProblem(422, 'AI 设置版本无效。');
      const row = await request(
        revision ? `?key=eq.main&revision=eq.${revision}` : '?on_conflict=key',
        {
          method: revision ? 'PATCH' : 'POST',
          headers: {
            Prefer: revision
              ? 'return=representation'
              : 'resolution=ignore-duplicates,return=representation',
          },
          body: JSON.stringify({
            ...(revision ? {} : { key: 'main' }),
            revision: revision + 1,
            payload,
          }),
        },
      );
      if (!row) throw adminProblem(409, 'AI 设置已被修改，请刷新后重试。');
      return row;
    },
  };
}
