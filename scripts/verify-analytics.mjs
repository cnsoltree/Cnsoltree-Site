import assert from 'node:assert/strict';
import {
  defaultRange,
  validateRange,
  METRICS,
  TABLES,
  formatMetric,
  createUnavailableReport,
} from '../src/admin/analytics-model.mjs';

const now = new Date('2026-10-27T17:00:00.000Z');
assert.deepEqual(defaultRange(28, now), { startDate: '2026-09-29', endDate: '2026-10-26' });
assert.deepEqual(defaultRange(1, now), { startDate: '2026-10-26', endDate: '2026-10-26' });
assert.deepEqual(defaultRange(28, new Date('2026-01-01T08:00:00.000Z')), {
  startDate: '2025-12-04',
  endDate: '2025-12-31',
});
assert.deepEqual(defaultRange(1, new Date('2026-01-01T07:59:59.999Z')), {
  startDate: '2025-12-30',
  endDate: '2025-12-30',
});
assert.deepEqual(defaultRange(7, new Date('2024-03-01T08:00:00.000Z')), {
  startDate: '2024-02-23',
  endDate: '2024-02-29',
});
assert.deepEqual(defaultRange(1, new Date('2025-03-01T08:00:00.000Z')), {
  startDate: '2025-02-28',
  endDate: '2025-02-28',
});
assert.deepEqual(defaultRange(7, new Date('2026-05-01T07:00:00.000Z')), {
  startDate: '2026-04-24',
  endDate: '2026-04-30',
});
assert.equal(
  defaultRange(1, new Date('2026-10-28T02:00:00.000Z')).endDate,
  '2026-10-26',
  'UTC today must not replace Pacific today',
);
for (const instant of ['2026-03-08T09:59:59.000Z', '2026-03-08T10:00:00.000Z'])
  assert.equal(
    defaultRange(1, new Date(instant)).endDate,
    '2026-03-07',
    'Spring DST must not lose a calendar day',
  );
for (const instant of ['2026-11-01T08:30:00.000Z', '2026-11-01T09:30:00.000Z'])
  assert.equal(
    defaultRange(1, new Date(instant)).endDate,
    '2026-10-31',
    'Repeated fall DST hour must keep the same day',
  );
for (const days of [0, -1, 1.5, NaN, Infinity, '28'])
  assert.throws(() => defaultRange(days, now), RangeError);
assert.throws(() => defaultRange(28, new Date('invalid')), RangeError);
assert.equal(validateRange(defaultRange(28, now), now), null);
assert.equal(validateRange({ startDate: '2024-02-29', endDate: '2024-02-29' }, now), null);
assert.equal(
  validateRange({ startDate: '1990-01-01', endDate: '2026-10-26' }, now),
  null,
  'Unconnected providers must not impose arbitrary history limits',
);
for (const range of [
  null,
  {},
  { startDate: '2025-02-29', endDate: '2025-03-01' },
  { startDate: '2026-04-31', endDate: '2026-05-01' },
  { startDate: '2026-13-01', endDate: '2026-13-02' },
  { startDate: '2026-00-01', endDate: '2026-01-01' },
  { startDate: '0000-01-01', endDate: '2026-01-01' },
  { startDate: '2026-1-01', endDate: '2026-01-02' },
  { startDate: '2026-01-01T00:00:00Z', endDate: '2026-01-02' },
  { startDate: '2026-10-26', endDate: '2026-10-25' },
  { startDate: '2026-10-26', endDate: '2026-10-27' },
  { startDate: '2026-10-27', endDate: '2027-01-01' },
]) {
  const error = validateRange(range, now);
  assert.equal(typeof error, 'string');
  assert(/[\u4e00-\u9fff]/.test(error), 'Date errors must explain the problem in Chinese');
}
assert.equal(formatMetric(null), '—');
assert.equal(formatMetric(undefined), '—');
assert.equal(formatMetric(NaN), '—');
assert.equal(formatMetric(Infinity), '—');
assert.equal(formatMetric('0'), '—', 'Provider measurements must be numeric');
assert.equal(formatMetric(0), '0');
assert.equal(formatMetric(12345), '12,345');
assert.equal(formatMetric(3.25, 'decimal'), '3.3');
assert.equal(formatMetric(0, 'decimal'), '0.0');
assert.equal(formatMetric(0, 'percent'), '0.00%');
assert.equal(formatMetric(0.123456, 'percent'), '12.35%');
assert.equal(formatMetric(1, 'percent'), '100.00%');

const range = defaultRange(28, now);
const search = createUnavailableReport({ source: 'search', range });
const traffic = createUnavailableReport({ source: 'traffic', range });
assert.deepEqual(Object.keys(search.summary), ['clicks', 'impressions', 'ctr', 'position']);
assert.deepEqual(Object.keys(traffic.summary), [
  'visits',
  'visitors',
  'inquiries',
  'conversionRate',
]);
assert.deepEqual(Object.keys(search.tables), ['country', 'device', 'page', 'query']);
assert.deepEqual(Object.keys(traffic.tables), ['country', 'device', 'referrer', 'page']);
assert(!Object.hasOwn(search.summary, 'visits'));
assert(!Object.hasOwn(traffic.summary, 'clicks'));
assert(search.statusDescription.includes('Google Search Console'));
assert(traffic.statusDescription.includes('网站访问统计'));
for (const report of [search, traffic]) {
  assert.equal(report.status, 'unavailable');
  assert.equal(report.updatedAt, null);
  assert(
    Object.values(report.summary).every((value) => value === null),
    'Missing provider data must never appear as actual zero measurements',
  );
  assert(Object.values(report.tables).every((rows) => Array.isArray(rows) && rows.length === 0));
  assert.deepEqual(report.range, range);
  assert.notEqual(report.range, range, 'Reports must not retain caller-owned mutable date state');
  assert.deepEqual(
    TABLES[report.source].map(({ key }) => key),
    Object.keys(report.tables),
  );
  for (const table of TABLES[report.source]) {
    assert.equal(typeof table.dimensionLabel, 'string');
    assert.deepEqual(
      table.columns.map(({ key }) => key),
      METRICS[report.source].map(({ key }) => key),
      'Dimension headings are separate from metric columns',
    );
  }
}
search.tables.country.push({ label: 'Only this instance changed' });
assert.equal(createUnavailableReport({ source: 'search', range }).tables.country.length, 0);
assert.equal(traffic.tables.country.length, 0);
assert.throws(() => createUnavailableReport({ source: 'unknown', range }), TypeError);
console.log(
  'PASS: analytics source contracts, honest unavailable reports, metric formats and Pacific calendar ranges across years, leap days, DST and invalid/future dates.',
);
