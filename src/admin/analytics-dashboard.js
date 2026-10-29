import {
  createUnavailableReport,
  defaultRange,
  formatMetric,
  METRICS,
  TABLES,
  validateRange,
} from './analytics-model.mjs';

if (typeof document !== 'undefined') {
  const manager = document.getElementById('studio-analytics');
  if (manager) initAnalytics(manager);
}

function initAnalytics(manager) {
  const storageKey = 'soltree.analytics-view.v1';
  const sourceNames = { search: 'Google Search Console', traffic: '网站分析与询盘跟踪' };
  const tabs = [...manager.querySelectorAll('[data-analytics-tab]')];
  const presets = [...manager.querySelectorAll('[data-analytics-days]')];
  const customButton = manager.querySelector('[data-analytics-custom]');
  const rangeForm = manager.querySelector('[data-analytics-range-form]');
  const start = manager.querySelector('[data-analytics-start]');
  const end = manager.querySelector('[data-analytics-end]');
  const error = manager.querySelector('[data-analytics-error]');
  const feedback = manager.querySelector('[data-analytics-feedback]');
  const metricSelect = manager.querySelector('[data-analytics-metric]');
  const overview = manager.querySelector('[data-analytics-overview]');
  const detail = manager.querySelector('[data-analytics-detail]');
  const sourceDialog = manager.querySelector('[data-analytics-source-dialog]');
  let source = 'search';
  let days = 28;
  let range = defaultRange(days);
  let detailKey;
  let metricKey;
  let lastDetailKey;
  let currentReport;
  let controller;
  let requestId = 0;
  const refreshButton = manager.querySelector('[data-analytics-refresh]');
  const tablePages = {};
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey));
    if (['search', 'traffic'].includes(saved?.source)) source = saved.source;
    if ([7, 28, 90].includes(saved?.days)) {
      days = saved.days;
      range = defaultRange(days);
    } else if (saved?.days === 'custom' && !validateRange(saved.range)) {
      days = 'custom';
      range = { startDate: saved.range.startDate, endDate: saved.range.endDate };
    }
  } catch {
    // Optional browser storage must not prevent opening the dashboard.
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function remember() {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ source, days, range }));
    } catch {
      // The selected view still works when storage is unavailable.
    }
  }

  function showError(message = '') {
    error.textContent = message;
    error.hidden = !message;
  }

  function dateLabels() {
    const yesterday = defaultRange(1).endDate;
    start.max = end.max = yesterday;
    start.value = range.startDate;
    end.value = range.endDate;
    manager.querySelector('[data-analytics-range-label]').textContent =
      `${range.startDate} 至 ${range.endDate}（太平洋时间）`;
    manager.querySelector('[data-analytics-chart-start]').textContent = range.startDate;
    manager.querySelector('[data-analytics-chart-end]').textContent = range.endDate;
    for (const button of presets)
      button.setAttribute('aria-pressed', String(Number(button.dataset.analyticsDays) === days));
    customButton.setAttribute('aria-pressed', String(days === 'custom'));
    customButton.setAttribute('aria-expanded', String(!rangeForm.hidden));
  }

  function emptyTable(config, { device = false, detailed = false } = {}) {
    const content = node('div');
    const wrapper = node('div', device ? 'analytics-device-content' : '');
    if (device && currentReport?.status !== 'connected') {
      const donut = node('div', 'analytics-empty-donut');
      donut.setAttribute('role', 'img');
      donut.setAttribute('aria-label', '设备数据尚未接入，暂无占比数据');
      donut.append(node('span', '', '—'), node('small', '', '未接入'));
      wrapper.append(donut);
    }
    const scroll = node('div', 'analytics-table-scroll');
    scroll.tabIndex = 0;
    scroll.setAttribute('aria-label', `${config.label}表格，可横向滚动`);
    const table = node('table', 'analytics-table');
    table.setAttribute('aria-label', config.label);
    const head = node('thead');
    const headings = node('tr');
    for (const title of [config.dimensionLabel, ...config.columns.map((column) => column.label)]) {
      const th = node('th', '', title);
      th.scope = 'col';
      headings.append(th);
    }
    head.append(headings);
    const body = node('tbody');
    const records = currentReport?.tables[config.key] || [];
    const size = detailed ? 20 : 5;
    const page = Math.min(
      tablePages[config.key] || 0,
      Math.max(0, Math.ceil(records.length / size) - 1),
    );
    for (const record of records.slice(page * size, (page + 1) * size)) {
      const row = node('tr');
      const cell = node('td');
      cell.title = record.label;
      if (config.key === 'page') {
        try {
          const url = new URL(record.label);
          if (
            ['https:', 'http:'].includes(url.protocol) &&
            ['elesoltree.com', 'www.elesoltree.com'].includes(url.hostname)
          ) {
            const link = node('a', '', url.pathname);
            link.href = url.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            cell.append(link);
          } else cell.textContent = record.label;
        } catch {
          cell.textContent = record.label;
        }
      } else
        cell.textContent =
          { DESKTOP: '桌面端', MOBILE: '移动端', TABLET: '平板' }[record.label] || record.label;
      row.append(cell);
      for (const column of config.columns)
        row.append(node('td', '', formatMetric(record[column.key], column.kind)));
      body.append(row);
    }
    const row = node('tr');
    const cell = node(
      'td',
      'analytics-table-empty',
      currentReport?.status === 'connected'
        ? '所选日期暂无搜索记录'
        : currentReport?.status === 'loading'
          ? '正在读取 Google 数据…'
          : '暂无可用数据',
    );
    cell.colSpan = config.columns.length + 1;
    cell.append(node('small', '', currentReport?.statusDescription || ''));
    row.append(cell);
    if (!records.length) body.append(row);
    table.append(head, body);
    scroll.append(table);
    wrapper.append(scroll);
    const footer = node('div', 'analytics-table-footer');
    footer.append(
      node(
        'span',
        '',
        records.length
          ? `共 ${records.length} 条${currentReport?.truncated?.[config.key] ? '（仅显示前 1,000 条）' : ''}`
          : '暂无可用记录',
      ),
    );
    const pagination = node('div', 'analytics-pagination');
    for (const [text, label] of [
      ['‹', '上一页'],
      ['›', '下一页'],
    ]) {
      const button = node('button', '', text);
      button.type = 'button';
      button.disabled = text === '‹' ? page === 0 : (page + 1) * size >= records.length;
      button.addEventListener('click', () => {
        tablePages[config.key] = page + (text === '‹' ? -1 : 1);
        render();
        const owner = detailed ? detail : manager.querySelector('[data-analytics-tables]');
        [...owner.querySelectorAll('button')]
          .find((item) => item.getAttribute('aria-label') === `${config.label}${label}`)
          ?.focus();
      });
      button.setAttribute('aria-label', `${config.label}${label}`);
      if (text === '›')
        pagination.append(
          node(
            'span',
            '',
            records.length ? `${page + 1} / ${Math.ceil(records.length / size)}` : '— / —',
          ),
        );
      pagination.append(button);
    }
    footer.append(pagination);
    content.append(wrapper, footer);
    return content;
  }

  function renderTrend() {
    const metric = METRICS[source].find((item) => item.key === metricKey) || METRICS[source][0];
    metricKey = metric.key;
    const chart = manager.querySelector('[data-analytics-live-chart]');
    const message = manager.querySelector('.analytics-chart-message');
    const records = (currentReport?.daily || []).filter(
      (row) => typeof row[metricKey] === 'number',
    );
    chart.replaceChildren();
    chart.hidden = !records.length;
    message.hidden = Boolean(records.length);
    manager
      .querySelector('.analytics-empty-chart')
      .setAttribute(
        'aria-labelledby',
        records.length
          ? 'analytics-trend-title'
          : 'analytics-chart-empty-title analytics-chart-empty-description',
      );
    if (records.length) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 900 230');
      svg.setAttribute('preserveAspectRatio', 'none');
      const maximum = Math.max(...records.map((row) => row[metricKey])) || 1;
      const minDate = Date.parse(range.startDate);
      const span = Math.max(86400000, Date.parse(range.endDate) - minDate);
      const x = (row) => 35 + ((Date.parse(row.date) - minDate) / span) * 845;
      const y = (row) => 210 - (row[metricKey] / maximum) * 185;
      // Missing dates remain gaps: Google may not have processed recent days yet.
      let points = '';
      let previous;
      for (const row of records) {
        points +=
          (previous && Date.parse(row.date) - Date.parse(previous.date) === 86400000
            ? ' L'
            : ' M') +
          x(row) +
          ' ' +
          y(row);
        previous = row;
        const dot = document.createElementNS(svg.namespaceURI, 'circle');
        dot.setAttribute('cx', x(row));
        dot.setAttribute('cy', y(row));
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', '#229e7d');
        dot.setAttribute('tabindex', '0');
        const title = document.createElementNS(svg.namespaceURI, 'title');
        title.textContent =
          row.date + ' · ' + metric.label + ' ' + formatMetric(row[metricKey], metric.kind);
        dot.setAttribute('aria-label', title.textContent);
        dot.append(title);
        svg.append(dot);
      }
      const line = document.createElementNS(svg.namespaceURI, 'path');
      line.setAttribute('d', points);
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', '#229e7d');
      line.setAttribute('stroke-width', '2');
      svg.prepend(line);
      chart.append(svg);
      const scale = node('span', 'analytics-chart-scale', formatMetric(maximum, metric.kind));
      chart.append(scale);
      manager
        .querySelector('.analytics-empty-chart')
        .setAttribute('aria-label', metric.label + '每日趋势，悬停数据点查看日期和值');
    }
    manager.querySelector('[data-analytics-trend-title]').textContent = `${metric.label}趋势`;
    manager.querySelector('[data-analytics-trend-caption]').textContent =
      source === 'search'
        ? '每日已确认数据；空缺日期尚无返回记录，不计为零。'
        : '网站访问来自网站分析；询盘数据还需接入事件跟踪。';
    manager.querySelector('[data-analytics-chart-empty-title]').textContent =
      currentReport?.status === 'connected'
        ? '所选日期暂无搜索记录'
        : currentReport?.status === 'loading'
          ? '正在读取 Google 数据…'
          : currentReport?.status === 'error'
            ? '数据读取未完成'
            : `尚未接入${sourceNames[source]}`;
    manager.querySelector('[data-analytics-chart-empty-description]').textContent =
      currentReport?.statusDescription || '暂无可用数据。';
  }

  function render() {
    const report = currentReport || createUnavailableReport({ source, range });
    for (const tab of tabs) {
      const selected = tab.dataset.analyticsTab === source;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    manager
      .querySelector('#analytics-report-panel')
      .setAttribute('aria-labelledby', `analytics-${source}-tab`);
    manager.querySelector('[data-analytics-source-label]').textContent =
      source === 'search'
        ? report.status === 'connected'
          ? `GSC 已接入 · 最新有记录日期：${report.latestDataDate || '暂无记录'} · 更新于 ${new Date(report.updatedAt).toLocaleString('zh-CN')}`
          : report.status === 'loading'
            ? '正在读取 GSC…'
            : report.status === 'error'
              ? 'GSC 读取失败，可重试'
              : 'Google Search Console 尚未接入'
        : '网站分析与询盘跟踪尚未接入 · GSC 不提供访问与询盘数据';
    dateLabels();
    const cards = manager.querySelector('[data-analytics-metrics]');
    cards.replaceChildren();
    metricSelect.replaceChildren();
    for (const metric of METRICS[source]) {
      const card = node('section', 'analytics-metric-card');
      const top = node('div', 'analytics-metric-top');
      const title = node('h2', '', metric.label);
      title.title = metric.description;
      top.append(title, node('span', 'analytics-status-tag', report.statusLabel));
      const value = node(
        'strong',
        'analytics-metric-value',
        formatMetric(report.summary[metric.key], metric.kind),
      );
      value.setAttribute(
        'aria-label',
        `${metric.label} ${formatMetric(report.summary[metric.key], metric.kind)}`,
      );
      card.append(top, value, node('p', '', metric.description));
      cards.append(card);
      metricSelect.add(new Option(metric.label, metric.key));
    }
    if (!METRICS[source].some((metric) => metric.key === metricKey))
      metricKey = METRICS[source][0].key;
    metricSelect.value = metricKey;
    renderTrend();
    const tables = manager.querySelector('[data-analytics-tables]');
    tables.replaceChildren();
    for (const config of TABLES[source]) {
      const panel = node('section', 'analytics-panel analytics-table-panel');
      const heading = node('div', 'analytics-panel-heading');
      const title = node('h2');
      const button = node('button', 'analytics-panel-link');
      button.type = 'button';
      button.dataset.analyticsDetailKey = config.key;
      button.setAttribute('aria-label', `查看${config.label}明细`);
      button.append(node('span', '', config.label), node('span', '', '查看明细 ›'));
      title.append(button);
      heading.append(title);
      panel.append(heading, emptyTable(config, { device: config.key === 'device' }));
      tables.append(panel);
    }
    const selected = TABLES[source].find((config) => config.key === detailKey);
    overview.hidden = Boolean(selected);
    detail.hidden = !selected;
    if (selected) {
      manager.querySelector('[data-analytics-detail-status]').textContent = report.statusLabel;
      manager.querySelector('[data-analytics-detail-title]').textContent = selected.label;
      manager.querySelector('[data-analytics-detail-description]').textContent =
        report.statusDescription;
      manager
        .querySelector('[data-analytics-detail-table]')
        .replaceChildren(emptyTable(selected, { detailed: true }));
    }
    remember();
  }

  async function loadReport(refresh = false) {
    const id = ++requestId;
    controller?.abort();
    controller = new AbortController();
    currentReport = createUnavailableReport({ source, range });
    if (source === 'traffic') {
      refreshButton.disabled = true;
      render();
      return;
    }
    Object.assign(currentReport, {
      status: 'loading',
      statusLabel: '加载中',
      statusDescription: '正在读取 Google 搜索数据，请稍候。',
    });
    refreshButton.disabled = true;
    render();
    try {
      const response = await fetch(
        '/api/admin/analytics?' +
          new URLSearchParams({ source, ...range, refresh: String(refresh) }),
        { credentials: 'same-origin', cache: 'no-store', signal: controller.signal },
      );
      const data = await response.json();
      if (id !== requestId) return;
      if (!response.ok) throw new Error(data.error || '数据读取失败，请重试。');
      currentReport = data;
      showError();
    } catch (issue) {
      if (id !== requestId || issue.name === 'AbortError') return;
      currentReport = createUnavailableReport({ source, range });
      Object.assign(currentReport, {
        status: 'error',
        statusLabel: '读取失败',
        statusDescription: issue.message || '连接失败，请重试。',
      });
      showError(currentReport.statusDescription);
    } finally {
      if (id === requestId) {
        refreshButton.disabled = false;
        render();
      }
    }
  }
  refreshButton.addEventListener('click', () => loadReport(true));

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => {
      source = tab.dataset.analyticsTab;
      detailKey = undefined;
      metricKey = undefined;
      showError();
      feedback.textContent = '';
      loadReport();
    });
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const target =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? tabs.length - 1
            : (index + 1) % tabs.length;
      tabs[target].click();
      tabs[target].focus();
    });
  }
  for (const button of presets)
    button.addEventListener('click', () => {
      days = Number(button.dataset.analyticsDays);
      range = defaultRange(days);
      rangeForm.hidden = true;
      showError();
      feedback.textContent = '';
      loadReport();
    });
  customButton.addEventListener('click', () => {
    rangeForm.hidden = !rangeForm.hidden;
    customButton.setAttribute('aria-expanded', String(!rangeForm.hidden));
    if (!rangeForm.hidden) {
      dateLabels();
      start.focus();
    }
  });
  rangeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const next = { startDate: start.value, endDate: end.value };
    const problem = validateRange(next);
    if (problem) {
      showError(problem);
      return;
    }
    range = next;
    days = 'custom';
    showError();
    feedback.textContent = '';
    loadReport();
  });
  metricSelect.addEventListener('change', () => {
    metricKey = metricSelect.value;
    renderTrend();
  });
  manager.querySelector('[data-analytics-tables]').addEventListener('click', (event) => {
    const button = event.target.closest?.('button[data-analytics-detail-key]');
    if (!button) return;
    detailKey = lastDetailKey = button.dataset.analyticsDetailKey;
    render();
    manager.querySelector('[data-analytics-detail-title]').focus();
  });
  manager.querySelector('[data-analytics-back]').addEventListener('click', () => {
    detailKey = undefined;
    render();
    [...manager.querySelectorAll('[data-analytics-detail-key]')]
      .find((button) => button.dataset.analyticsDetailKey === lastDetailKey)
      ?.focus();
  });
  manager
    .querySelector('[data-analytics-source-info]')
    .addEventListener('click', () => sourceDialog.showModal());
  manager
    .querySelector('[data-analytics-source-close]')
    .addEventListener('click', () => sourceDialog.close());
  new MutationObserver(() => {
    if ((manager.hidden || manager.inert) && sourceDialog.open) sourceDialog.close();
  }).observe(manager, { attributes: true, attributeFilter: ['hidden', 'inert'] });
  document.addEventListener('studio:analytics', () => {
    if (days !== 'custom') range = defaultRange(days);
    loadReport();
  });
  rangeForm.hidden = days !== 'custom';
  if (!manager.hidden) loadReport();
}
