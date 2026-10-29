const plain = (value) => value?.toJS?.() ?? value;

export function productGalleryItems(value, cover = '', alts = []) {
  value = plain(value);
  alts = plain(alts) || [];
  if (value && !Array.isArray(value) && Array.isArray(value.items)) return value.items;
  const images = Array.isArray(value) && value.length ? value : cover ? [cover] : [];
  return images.map((image, index) => ({ image, alt: alts[index] || '' }));
}

export function productGalleryData(value, cover = '', alts = []) {
  const items = productGalleryItems(value, cover, alts);
  if (items.some((item) => typeof item.image !== 'string' || typeof item.alt !== 'string'))
    throw new Error('产品图片或 Alt 格式无效，请重新选择。');
  return {
    image: items[0]?.image || '',
    images: items.map((item) => item.image),
    imageAlts: items.map((item) => item.alt.trim()),
  };
}

export function registerProductGallery(CMS, h, createClass) {
  CMS.registerWidget(
    'product-gallery',
    createClass({
      getInitialState() {
        return { error: '', altIndex: null };
      },
      componentDidMount() {
        this.controlID = crypto.randomUUID();
      },
      componentWillUnmount() {
        this.props.onRemoveMediaControl(this.controlID);
      },
      items() {
        const data = this.props.getEntry().get('data');
        return productGalleryItems(this.props.value, data.get('image'), data.get('imageAlts'));
      },
      update(items) {
        this.props.onChange({ items });
      },
      componentDidUpdate() {
        const paths = this.props.mediaPaths?.get(this.controlID);
        if (!paths) return;
        this.props.onRemoveInsertedMedia(this.controlID);
        const selected = plain(paths);
        const items = this.items();
        const images = [...new Set(Array.isArray(selected) ? selected : [selected])].filter(
          (image) => !items.some((item) => item.image === image),
        );
        if (!images.length) return;
        if (items.length + images.length > 8) {
          this.setState({ error: '最多 8 张图片，请减少本次选择的数量。' });
          return;
        }
        if (
          images.some(
            (image) =>
              typeof image !== 'string' || !/^\/images\/.+\.(?:png|jpe?g|webp|avif)$/i.test(image),
          )
        ) {
          this.setState({ error: '请选择已上传的 JPG、PNG、WebP 或 AVIF 图片。' });
          return;
        }
        this.setState({ error: '' });
        this.update([...items, ...images.map((image) => ({ image, alt: '' }))]);
      },
      move(from, to) {
        const items = [...this.items()];
        if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return;
        const [item] = items.splice(from, 1);
        items.splice(to, 0, item);
        this.setState({ altIndex: null });
        this.update(items);
      },
      render() {
        const items = this.items();
        const disabled = this.props.isDisabled;
        return h(
          'div',
          { className: 'product-gallery-editor' },
          h(
            'div',
            { className: 'product-gallery-cards', role: 'list', 'aria-label': '产品图片' },
            ...items.map((item, index) => {
              const src =
                this.props.getAsset(item.image, this.props.field)?.toString() || item.image;
              return h(
                'div',
                {
                  className: 'product-gallery-card',
                  key: `${index}-${item.image}`,
                  role: 'listitem',
                  draggable: !disabled,
                  onDragStart: (event) => {
                    this.dragged = index;
                    event.dataTransfer.effectAllowed = 'move';
                  },
                  onDragEnd: () => {
                    this.dragged = null;
                  },
                  onDragOver: (event) => {
                    if (!disabled) event.preventDefault();
                  },
                  onDrop: (event) => {
                    event.preventDefault();
                    if (!disabled && Number.isInteger(this.dragged)) this.move(this.dragged, index);
                    this.dragged = null;
                  },
                },
                h('img', { src, alt: item.alt || `产品图片 ${index + 1}`, draggable: false }),
                h(
                  'span',
                  { className: 'product-gallery-position' },
                  index === 0 ? '主图' : String(index + 1),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'product-gallery-remove',
                    disabled,
                    'aria-label': `移除第 ${index + 1} 张图片`,
                    onClick: () => {
                      this.setState({ altIndex: null, error: '' });
                      this.update(items.filter((_, i) => i !== index));
                    },
                  },
                  '×',
                ),
                h(
                  'a',
                  {
                    className: 'product-gallery-preview',
                    href: src,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `预览第 ${index + 1} 张图片`,
                  },
                  h(
                    'svg',
                    {
                      viewBox: '0 0 24 24',
                      width: 22,
                      height: 22,
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: 1.5,
                      'aria-hidden': true,
                    },
                    h('path', { d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z' }),
                    h('circle', { cx: 12, cy: 12, r: 3 }),
                  ),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'product-gallery-alt',
                    disabled,
                    onClick: () =>
                      this.setState({ altIndex: this.state.altIndex === index ? null : index }),
                  },
                  item.alt ? '✓ Alt' : '+ Alt',
                ),
              );
            }),
            items.length < 8 &&
              h(
                'button',
                {
                  id: this.props.forID,
                  type: 'button',
                  className: 'product-gallery-add',
                  disabled,
                  'aria-label': '上传或选择产品图片',
                  onClick: () => {
                    this.props.onOpenMediaLibrary({
                      controlID: this.controlID,
                      forImage: true,
                      allowMultiple: true,
                      field: this.props.field,
                    });
                  },
                },
                h('span', { 'aria-hidden': true }, '▧'),
                '＋',
              ),
          ),
          h(
            'p',
            { className: 'product-gallery-hint' },
            '拖拽调整图片顺序，第一张为主图；最多 8 张，支持批量选择。',
          ),
          this.state.error &&
            h('p', { className: 'product-error', role: 'alert' }, this.state.error),
          this.state.altIndex !== null &&
            items[this.state.altIndex] &&
            h(
              'label',
              { className: 'product-gallery-alt-input' },
              `第 ${this.state.altIndex + 1} 张图片 Alt`,
              h('input', {
                type: 'text',
                value: items[this.state.altIndex].alt,
                maxLength: 300,
                disabled,
                placeholder: '描述产品型号、外观或视角；留空使用产品名称',
                onChange: (event) =>
                  this.update(
                    items.map((item, i) =>
                      i === this.state.altIndex ? { ...item, alt: event.target.value } : item,
                    ),
                  ),
              }),
            ),
        );
      },
    }),
  );
}
