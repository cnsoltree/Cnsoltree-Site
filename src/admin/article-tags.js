export function registerArticleTags(CMS, h, createClass) {
  CMS.registerWidget(
    'article-tags',
    createClass({
      getInitialState() {
        return { draft: '' };
      },
      tags() {
        return Array.isArray(this.props.value)
          ? this.props.value
          : this.props.value?.toArray?.() || [];
      },
      add() {
        const tag = this.state.draft.trim();
        if (!tag || this.props.isDisabled) return;
        const tags = this.tags();
        if (!tags.some((item) => item.toLocaleLowerCase() === tag.toLocaleLowerCase()))
          this.props.onChange([...tags, tag]);
        this.setState({ draft: '' });
      },
      render() {
        return h(
          'div',
          { className: 'article-tags' },
          h('input', {
            id: this.props.forID,
            type: 'text',
            value: this.state.draft,
            placeholder: '可按回车添加多个标签',
            disabled: this.props.isDisabled,
            onChange: (event) => this.setState({ draft: event.target.value }),
            onFocus: this.props.setActiveStyle,
            onBlur: () => {
              this.add();
              this.props.setInactiveStyle?.();
            },
            onKeyDown: (event) => {
              if (
                event.key === 'Enter' &&
                !event.nativeEvent?.isComposing &&
                !event.isComposing &&
                event.keyCode !== 229
              ) {
                event.preventDefault();
                this.add();
              }
            },
          }),
          h(
            'div',
            { className: 'article-tag-list', role: 'list', 'aria-label': '已添加标签' },
            ...this.tags().map((tag, index) =>
              h(
                'span',
                { key: `${index}-${tag}`, className: 'article-tag', role: 'listitem' },
                tag,
                h(
                  'button',
                  {
                    type: 'button',
                    disabled: this.props.isDisabled,
                    'aria-label': `移除标签 ${tag}`,
                    onClick: () => this.props.onChange(this.tags().filter((_, i) => i !== index)),
                  },
                  '×',
                ),
              ),
            ),
          ),
        );
      },
    }),
  );
}
