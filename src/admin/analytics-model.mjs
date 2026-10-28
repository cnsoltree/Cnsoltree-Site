const timeZone = 'America/Los_Angeles';
const pacificDate = new Intl.DateTimeFormat('en-US', {
  timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const isoDay = (date) => date.toISOString().slice(0, 10);

function yesterday(now) {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime()))
    throw new RangeError('当前时间无效。');
  const parts = Object.fromEntries(
    pacificDate.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  const day = new Date(`${parts.year.padStart(4, '0')}-${parts.month}-${parts.day}T00:00:00.000Z`);
  day.setUTCDate(day.getUTCDate() - 1);
  return day;
}

function validDate(value) {
  if (typeof value !== 'string' || !/^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && isoDay(date) === value;
}

/** Calendar days in Pacific time, inclusive; stop yesterday to avoid partial-day comparisons. */
export function defaultRange(days = 28, now = new Date()) {
  if (!Number.isSafeInteger(days) || days < 1) throw new RangeError('日期天数必须为正整数。');
  const end = yesterday(now);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { startDate: isoDay(start), endDate: isoDay(end) };
}

/** Providers can impose their own retention limits after connection; there is no invented history limit here. */
export function validateRange(range, now = new Date()) {
  if (!range || !validDate(range.startDate) || !validDate(range.endDate))
    return '请选择有效的开始日期和结束日期，格式为 YYYY-MM-DD。';
  if (range.startDate > range.endDate) return '开始日期不能晚于结束日期。';
  const maximum = isoDay(yesterday(now));
  if (range.endDate > maximum) return `日期最多可选择到昨日（${maximum}，太平洋时间）。`;
  return null;
}

export const METRICS = {
  search: [
    {
      key: 'clicks',
      label: '点击量',
      kind: 'integer',
      description: 'Google 自然搜索结果带来的网站点击次数。',
    },
    {
      key: 'impressions',
      label: '展示量',
      kind: 'integer',
      description: '网站链接在 Google 自然搜索结果中的展示次数。',
    },
    {
      key: 'ctr',
      label: '平均点击率',
      kind: 'percent',
      description: '搜索点击量占搜索展示量的比例。',
    },
    {
      key: 'position',
      label: '平均排名',
      kind: 'decimal',
      description: 'Google Search Console 提供的平均搜索结果位置，数值越小排名越靠前。',
    },
  ],
  traffic: [
    {
      key: 'visits',
      label: '访问量',
      kind: 'integer',
      description: '网站访问会话数，同一访客可以产生多次访问。',
    },
    {
      key: 'visitors',
      label: '访客数',
      kind: 'integer',
      description: '所选日期内的去重网站访客数，以接入的网站统计工具口径为准。',
    },
    {
      key: 'inquiries',
      label: '询盘量',
      kind: 'integer',
      description: '去重后的有效询盘提交数，需要配置并接入询盘事件。',
    },
    {
      key: 'conversionRate',
      label: '询盘转化率',
      kind: 'percent',
      description: '发生至少一次有效询盘的会话数除以总会话数；同次访问多次提交只计一次转化。',
    },
  ],
};

const table = (source, key, label, dimensionLabel = label) => ({
  key,
  label,
  dimensionLabel,
  columns: METRICS[source],
});

export const TABLES = {
  search: [
    table('search', 'country', '国家/地区分布', '国家/地区'),
    table('search', 'device', '设备分布', '设备'),
    table('search', 'page', '热门搜索页面', '页面'),
    table('search', 'query', '搜索关键词', '关键词'),
  ],
  traffic: [
    table('traffic', 'country', '访客国家/地区分布', '国家/地区'),
    table('traffic', 'device', '访客设备分布', '设备'),
    table('traffic', 'referrer', '访问来源网站', '来源'),
    table('traffic', 'page', '热门访问页面', '页面'),
  ],
};

const numberFormats = {
  integer: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }),
  decimal: new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  percent: new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

/** Missing measurements are unknown, while numeric zero is an actual measurement. Percent inputs are ratios. */
export function formatMetric(value, kind = 'integer') {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  if (!numberFormats[kind]) throw new TypeError('指标显示格式无效。');
  return numberFormats[kind].format(value);
}

/** No provider is connected yet. Never turn absence of data into zeroes or simulated measurements. */
export function createUnavailableReport({ source, range }) {
  if (!Object.hasOwn(METRICS, source)) throw new TypeError('数据来源无效。');
  return {
    source,
    range: { startDate: range.startDate, endDate: range.endDate },
    status: 'unavailable',
    statusLabel: '尚未接入',
    statusDescription:
      source === 'search'
        ? '尚未接入 Google Search Console。这里将展示 Google 自然搜索的点击、展示、点击率和平均排名，当前没有可用的搜索数据。'
        : '尚未接入网站访问统计和询盘事件。这里将展示网站各访问来源的会话、访客与询盘转化，当前没有可用的网站统计数据；搜索点击量不等同于网站访问量。',
    summary: Object.fromEntries(METRICS[source].map(({ key }) => [key, null])),
    tables: Object.fromEntries(TABLES[source].map(({ key }) => [key, []])),
    updatedAt: null,
  };
}
