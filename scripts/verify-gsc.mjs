import assert from 'node:assert/strict';
import { createGscProvider } from '../src/lib/admin-gsc.mjs';

let instant = new Date('2026-10-29T18:00:00Z');
const range = { startDate: '2026-10-01', endDate: '2026-10-28' };
const total = { clicks: 56, impressions: 2011, ctr: 56 / 2011, position: 9.56 };
let calls = [];
let fail = false;
const provider = createGscProvider({
  property: 'sc-domain:elesoltree.com',
  tokenProvider: async () => 'private-test-token',
  now: () => instant,
  fetchImpl: async (url, options) => {
    assert.equal(
      url,
      'https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aelesoltree.com/searchAnalytics/query',
    );
    assert.equal(options.headers.Authorization, 'Bearer private-test-token');
    const body = JSON.parse(options.body);
    calls.push(body);
    assert.equal(body.dataState, 'final');
    assert.equal(body.type, 'web');
    if (fail) return new Response('{}', { status: 403 });
    const dimension = body.dimensions[0];
    const rows = !dimension
      ? [total]
      : dimension === 'date'
        ? [
            { keys: ['2026-10-25'], ...total },
            { keys: ['2026-10-02'], ...total },
          ]
        : dimension === 'page'
          ? Array.from({ length: 1001 }, (_, i) => ({
              keys: [`https://www.elesoltree.com/products/${i}`],
              ...total,
            }))
          : [{ keys: [dimension === 'query' ? '<img onerror=alert(1)>' : 'MOBILE'], ...total }];
    return Response.json({ rows });
  },
});
const [report, duplicate] = await Promise.all([provider.report(range), provider.report(range)]);
assert.equal(calls.length, 6, 'Concurrent identical reports must reuse one request set');
assert.equal(report, duplicate);
assert.deepEqual(report.summary, total, 'Totals must not be sums of table rows');
assert.equal(report.latestDataDate, '2026-10-25');
assert.deepEqual(
  report.daily.map((x) => x.date),
  ['2026-10-02', '2026-10-25'],
);
assert.equal(report.daily.length, 2, 'Unreturned dates must not become fake zeroes');
assert.equal(report.tables.page.length, 1000);
assert.equal(report.truncated.page, true);
assert.equal(report.truncated.query, false);
assert(!JSON.stringify(report).includes('private-test-token'));
await provider.report(range);
await provider.report(range, { refresh: true });
assert.equal(calls.length, 6, 'Short refresh cooldown must prevent duplicate Google requests');
instant = new Date('2026-10-29T18:01:00Z');
await provider.report(range, { refresh: true });
assert.equal(calls.length, 12);
instant = new Date('2026-10-29T18:07:00Z');
fail = true;
await assert.rejects(
  provider.report(range),
  (error) => error.status === 503 && /权限/.test(error.message),
);
await assert.rejects(
  provider.report({ startDate: '2026-02-30', endDate: '2026-10-28' }),
  (error) => error.status === 422,
);
await assert.rejects(
  provider.report({ startDate: '2000-01-01', endDate: '2026-10-28' }),
  (error) => error.status === 422,
);
assert.throws(
  () => createGscProvider({ credential: '{}', property: 'sc-domain:elesoltree.com' }),
  (error) => error.status === 503,
);
assert.throws(
  () => createGscProvider({ tokenProvider: async () => '', property: 'https://attacker.test/' }),
  (error) => error.status === 503,
);
const empty = createGscProvider({
  property: 'sc-domain:elesoltree.com',
  tokenProvider: async () => 'test',
  now: () => instant,
  fetchImpl: async () => Response.json({}),
});
const noData = await empty.report(range);
assert.deepEqual(noData.summary, { clicks: 0, impressions: 0, ctr: null, position: null });
assert.equal(noData.latestDataDate, null);
console.log(
  'PASS: GSC totals, missing dates, ordering, bounded top rows, readonly requests, credential validation, cache/coalescing, and safe failures.',
);
