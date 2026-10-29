const pacific = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function articleDateInput(value) {
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00`;
  if (!Number.isFinite(Date.parse(value))) return '';
  const parts = Object.fromEntries(
    pacific.formatToParts(new Date(value)).map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

/** Interpret the picker in Pacific time, including DST; reject nonexistent spring-forward minutes. */
export function articleDateIso(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const target = Date.parse(`${value}:00Z`);
  if (!Number.isFinite(target) || new Date(target).toISOString().slice(0, 16) !== value)
    return null;
  let candidate = target;
  for (let i = 0; i < 3; i++)
    candidate += target - Date.parse(`${articleDateInput(new Date(candidate).toISOString())}:00Z`);
  return articleDateInput(new Date(candidate).toISOString()) === value
    ? new Date(candidate).toISOString()
    : null;
}

export function registerArticleDates(CMS, h, createClass) {
  CMS.registerWidget(
    'article-time',
    createClass({
      componentDidMount() {
        if (!this.props.value && this.props.getEntry().get('newRecord'))
          this.props.onChange(new Date().toISOString());
      },
      render() {
        return h('input', {
          id: this.props.forID,
          className: this.props.classNameWrapper,
          type: 'datetime-local',
          step: 60,
          required: true,
          value: articleDateInput(this.props.value),
          disabled: this.props.isDisabled,
          'aria-label': '时间（太平洋时间）',
          onFocus: this.props.setActiveStyle,
          onBlur: this.props.setInactiveStyle,
          onChange: (event) => {
            const input = event.target;
            const value = input.value ? articleDateIso(input.value) : '';
            input.setCustomValidity(value === null ? '此太平洋时间不存在，请重新选择。' : '');
            if (value === null) {
              input.reportValidity();
              return;
            }
            this.props.onChange(value);
          },
        });
      },
    }),
  );
  CMS.registerWidget(
    'readonly-time',
    createClass({
      render() {
        return h('input', {
          id: this.props.forID,
          className: this.props.classNameWrapper,
          type: 'datetime-local',
          value: articleDateInput(this.props.value),
          readOnly: true,
          'aria-readonly': true,
          title: this.props.value || '保存后自动记录',
        });
      },
    }),
  );
}
