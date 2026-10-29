/** Keep the existing category slug as the saved value; groups only narrow the choices. */
export function registerArticleCategory(CMS, h, createClass) {
  CMS.registerWidget(
    'article-category',
    createClass({
      getInitialState() {
        return { group: '' };
      },
      render() {
        const groups = this.props.field.get('groups').toJS();
        const value = this.props.value || '';
        let group = groups.find((item) => item.slug === this.state.group);
        if (value && !group?.options.some((item) => item.value === value))
          group = groups.find((item) => item.options.some((option) => option.value === value));
        const select = (id, label, selected, options, onChange, disabled = false) =>
          h(
            'div',
            { className: 'article-category-level' },
            h('label', { htmlFor: id }, label),
            h(
              'select',
              {
                id,
                value: selected,
                onChange,
                disabled: disabled || this.props.isDisabled,
                onFocus: this.props.setActiveStyle,
                onBlur: this.props.setInactiveStyle,
              },
              ...options.map((item) =>
                h('option', { key: item.value, value: item.value }, item.label),
              ),
            ),
          );
        return h(
          'div',
          { className: 'article-category-picker' },
          select(
            this.props.forID,
            '一级分组',
            group?.slug || '',
            [
              { value: '', label: '请选择一级分组（可不选）' },
              ...groups.map((item) => ({ value: item.slug, label: item.name })),
            ],
            (event) => {
              this.setState({ group: event.target.value });
              this.props.onChange('');
            },
          ),
          select(
            `${this.props.forID}-category`,
            '二级分类',
            value,
            [
              { value: '', label: group ? '请选择二级分类（可不选）' : '请先选择一级分组' },
              ...(group?.options || []),
              ...(value && !group ? [{ value, label: `原分类：${value}（当前不可选）` }] : []),
            ],
            (event) => this.props.onChange(event.target.value),
            !group || !group.options.length,
          ),
        );
      },
    }),
  );
}

/** Reuse the cascading picker while keeping additional categories as a slug array. */
export function registerAdditionalCategories(CMS, h, createClass) {
  let CategoryPicker;
  registerArticleCategory(
    { registerWidget: (_name, control) => (CategoryPicker = control) },
    h,
    createClass,
  );
  CMS.registerWidget(
    'additional-categories',
    createClass({
      render() {
        const values = this.props.value?.toJS?.() ?? this.props.value ?? [];
        const groups = this.props.field.get('groups').toJS();
        return h(
          'div',
          { className: 'additional-categories' },
          h(CategoryPicker, {
            ...this.props,
            value: '',
            onChange: (value) => {
              if (value && !values.includes(value)) this.props.onChange([...values, value]);
            },
          }),
          h(
            'div',
            { className: 'article-tag-list', 'aria-label': '已添加的补充分类' },
            ...values.map((value) => {
              const group = groups.find((item) =>
                item.options.some((item) => item.value === value),
              );
              const name = group?.options.find((item) => item.value === value)?.label || value;
              return h(
                'span',
                { className: 'article-tag', key: value },
                group ? `${group.name} / ${name}` : name,
                h(
                  'button',
                  {
                    type: 'button',
                    disabled: this.props.isDisabled,
                    'aria-label': `移除补充分类 ${name}`,
                    onClick: () => this.props.onChange(values.filter((item) => item !== value)),
                  },
                  '×',
                ),
              );
            }),
          ),
        );
      },
    }),
  );
}
