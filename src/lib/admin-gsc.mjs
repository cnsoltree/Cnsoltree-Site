import { JWT } from 'google-auth-library';
import { adminProblem } from './admin-auth.mjs';
import { validateRange } from '../admin/analytics-model.mjs';

const scope = 'https://www.googleapis.com/auth/webmasters.readonly';
const dimensions = ['country', 'device', 'page', 'query'];
const metricKeys = ['clicks', 'impressions', 'ctr', 'position'];
const metrics = (row) => Object.fromEntries(metricKeys.map((key) => [key, row?.[key] ?? null]));

/** One private, short-lived cache per server instance; no content workspace writes. */
export function createGscProvider({
  credential,
  property,
  fetchImpl = fetch,
  tokenProvider = undefined,
  now = () => new Date(),
}) {
  let client;
  if (!tokenProvider) {
    try {
      const key = JSON.parse(credential);
      if (
        key.type !== 'service_account' ||
        !/^[\w.-]+@[\w.-]+\.iam\.gserviceaccount\.com$/.test(key.client_email) ||
        !key.private_key?.startsWith('-----BEGIN PRIVATE KEY-----')
      )
        throw new Error();
      client = new JWT({ email: key.client_email, key: key.private_key, scopes: [scope] });
    } catch {
      throw adminProblem(503, 'GSC 服务账号尚未正确配置。');
    }
  }
  if (
    ![
      'sc-domain:elesoltree.com',
      'https://elesoltree.com/',
      'https://www.elesoltree.com/',
    ].includes(property)
  )
    throw adminProblem(503, 'GSC 网站资源尚未正确配置。');
  const cache = new Map();
  const pending = new Map();
  async function query(range, grouping, token) {
    let response;
    try {
      response = await fetchImpl(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...range,
            type: 'web',
            dataState: 'final',
            dimensions: grouping ? [grouping] : [],
            rowLimit: grouping === 'date' ? 1000 : grouping ? 1001 : 1,
          }),
          signal: AbortSignal.timeout(20_000),
        },
      );
    } catch {
      throw adminProblem(503, '连接 Google 暂时失败，请稍后重试。');
    }
    if (!response.ok)
      throw adminProblem(
        503,
        response.status === 403
          ? 'GSC 读取权限不足，请检查服务账号的网站授权。'
          : response.status === 429
            ? 'Google 请求较频繁，请稍后再刷新。'
            : 'Google 搜索数据暂时不可用，请稍后重试。',
      );
    let data;
    try {
      data = await response.json();
    } catch {
      throw adminProblem(503, 'Google 返回的数据格式无效。');
    }
    if (data.rows !== undefined && !Array.isArray(data.rows))
      throw adminProblem(503, 'Google 返回的数据格式无效。');
    for (const row of data.rows || []) {
      if (
        metricKeys.some(
          (key) => typeof row[key] !== 'number' || !Number.isFinite(row[key]) || row[key] < 0,
        ) ||
        row.ctr > 1 ||
        (grouping && (row.keys?.length !== 1 || typeof row.keys[0] !== 'string'))
      )
        throw adminProblem(503, 'Google 返回的数据格式无效。');
    }
    return data.rows || [];
  }
  async function load(range) {
    let token;
    try {
      token = tokenProvider ? await tokenProvider() : (await client.getAccessToken()).token;
    } catch {
      throw adminProblem(503, 'GSC 身份验证失败，请检查服务账号凭证。');
    }
    if (!token) throw adminProblem(503, 'GSC 身份验证失败。');
    const [total, daily, ...tables] = await Promise.all(
      [null, 'date', ...dimensions].map((dimension) => query(range, dimension, token)),
    );
    const sorted = daily
      .map((row) => ({ date: row.keys[0], ...metrics(row) }))
      .sort((a, b) => a.date.localeCompare(b.date));
    return {
      source: 'search',
      range: { ...range },
      property,
      status: 'connected',
      statusLabel: '已接入',
      statusDescription:
        'Google 网页自然搜索 · 已最终确认的数据。近期日期可能尚未完成处理；关键词存在隐私过滤，明细合计可能与总览不同。',
      // Totals come from a separate property-level query, never from summing top/privacy-filtered rows.
      summary: total.length
        ? metrics(total[0])
        : { clicks: 0, impressions: 0, ctr: null, position: null },
      daily: sorted,
      latestDataDate: sorted.at(-1)?.date ?? null,
      tables: Object.fromEntries(
        dimensions.map((key, i) => [
          key,
          tables[i].slice(0, 1000).map((row) => ({ label: row.keys[0], ...metrics(row) })),
        ]),
      ),
      // ponytail: show the top 1,000 returned rows per dimension; add server pagination if this ceiling is reached.
      truncated: Object.fromEntries(dimensions.map((key, i) => [key, tables[i].length > 1000])),
      updatedAt: now().toISOString(),
    };
  }
  return {
    async report(range, { refresh = false } = {}) {
      const problem = validateRange(range, now());
      if (problem) throw adminProblem(422, problem);
      const oldest = new Date(now());
      oldest.setUTCMonth(oldest.getUTCMonth() - 16);
      if (range.startDate < oldest.toISOString().slice(0, 10))
        throw adminProblem(422, 'GSC 仅提供最近约 16 个月的搜索历史，请缩小日期范围。');
      const key = `${range.startDate}/${range.endDate}`;
      const saved = cache.get(key);
      const age = saved ? now().getTime() - Date.parse(saved.updatedAt) : Infinity;
      if (saved && age < (refresh ? 30_000 : 300_000)) return saved;
      if (pending.has(key)) return pending.get(key);
      const promise = load({ startDate: range.startDate, endDate: range.endDate })
        .then((report) => {
          if (cache.size >= 20) cache.delete(cache.keys().next().value);
          cache.set(key, report);
          return report;
        })
        .finally(() => pending.delete(key));
      pending.set(key, promise);
      return promise;
    },
  };
}
