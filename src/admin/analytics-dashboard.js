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
    if (device) {
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
    const row = node('tr');
    const cell = node('td', 'analytics-table-empty', '尚未接入数据源');
    cell.colSpan = config.columns.length + 1;
    cell.append(node('small', '', `接入${sourceNames[source]}后显示${config.label}数据`));
    row.append(cell);
    body.append(row);
    table.append(head, body);
    scroll.append(table);
    wrapper.append(scroll);
    const footer = node('div', 'analytics-table-footer');
    footer.append(node('span', '', detailed ? '暂无可用记录' : '暂无可用数据'));
    const pagination = node('div', 'analytics-pagination');
    for (const [text, label] of [
      ['‹', '上一页'],
      ['›', '下一页'],
    ]) {
      const button = node('button', '', text);
      button.type = 'button';
      button.disabled = true;
      button.setAttribute('aria-label', `${config.label}${label}`);
      if (text === '›') pagination.append(node('span', '', '— / —'));
      pagination.append(button);
    }
    footer.append(pagination);
    content.append(wrapper, footer);
    return content;
  }

  function renderTrend() {
    const metric = METRICS[source].find((item) => item.key === metricKey) || METRICS[source][0];
    metricKey = metric.key;
    manager.querySelector('[data-analytics-trend-title]').textContent = `${metric.label}趋势`;
    manager.querySelector('[data-analytics-trend-caption]').textContent =
      source === 'search'
        ? '接入后可查看每日 Google 自然搜索表现。'
        : '网站访问来自网站分析；询盘数据还需接入事件跟踪。';
    manager.querySelector('[data-analytics-chart-empty-title]').textContent =
      `尚未接入${sourceNames[source]}`;
    manager.querySelector('[data-analytics-chart-empty-description]').textContent =
      `接入真实数据后，这里会展示所选日期的${metric.label}趋势。`;
  }

  function render() {
    const report = createUnavailableReport({ source, range });
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
        ? 'Google Search Console 尚未接入'
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
      top.append(title, node('span', 'analytics-status-tag', '未接入'));
      const value = node(
        'strong',
        'analytics-metric-value',
        formatMetric(report.summary[metric.key], metric.kind),
      );
      value.setAttribute('aria-label', `${metric.label}暂无可用数据`);
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
      manager.querySelector('[data-analytics-detail-title]').textContent = selected.label;
      manager.querySelector('[data-analytics-detail-description]').textContent =
        report.statusDescription;
      manager
        .querySelector('[data-analytics-detail-table]')
        .replaceChildren(emptyTable(selected, { detailed: true }));
    }
    remember();
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => {
      source = tab.dataset.analyticsTab;
      detailKey = undefined;
      metricKey = undefined;
      showError();
      feedback.textContent = '';
      render();
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
      feedback.textContent = '日期已更新；接入数据源后将显示该时段的数据。';
      render();
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
    feedback.textContent = '自定义日期已应用；接入数据源后将显示该时段的数据。';
    render();
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
    render();
  });
  rangeForm.hidden = days !== 'custom';
  if (!manager.hidden) render();
}
