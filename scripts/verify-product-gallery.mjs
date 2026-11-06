import assert from 'node:assert/strict';
import { initProductGallery } from '../src/lib/product-gallery.js';
import fs from 'node:fs/promises';
import { fromJS } from 'immutable';
import {
  productGalleryItems,
  productGalleryData,
  registerProductGallery,
} from '../src/admin/product-gallery.js';

const legacy = ['/images/a.png', '/images/b.png'];
assert.deepEqual(
  productGalleryData(fromJS(legacy), '/images/cover.png', fromJS(['', 'Side view'])),
  {
    image: legacy[0],
    images: legacy,
    imageAlts: ['', 'Side view'],
  },
);
assert.deepEqual(productGalleryItems([], '/images/cover.png', []), [
  { image: '/images/cover.png', alt: '' },
]);
assert.deepEqual(productGalleryData({ items: [] }, '/images/old.png', []), {
  image: '',
  images: [],
  imageAlts: [],
});
let control;
registerProductGallery(
  {
    registerWidget: (_name, definition) => {
      control = definition;
    },
  },
  (tag, props, ...children) => ({ tag, props, children }),
  (definition) => definition,
);
const data = fromJS({ image: '/images/cover.png', imageAlts: ['', 'Side view'] });
const widget = {
  ...control,
  state: control.getInitialState(),
  setState(update) {
    this.state = { ...this.state, ...update };
  },
  props: {
    value: fromJS(legacy),
    getEntry: () => fromJS({ data }),
    getAsset: (image) => image,
    onChange(value) {
      widget.props.value = fromJS(value);
    },
    onRemoveInsertedMedia() {
      widget.props.mediaPaths = fromJS({});
    },
    onRemoveMediaControl() {},
  },
};
widget.componentDidMount();
const initialCards = widget.render().children[0].children;
assert.equal(initialCards[0].children.length, 5, 'Cards have no sorting arrow controls.');
assert.equal(initialCards[0].children[3].children[0].tag, 'svg', 'Preview uses an eye icon.');
initialCards[1].props.onDragStart({ dataTransfer: {} });
initialCards[0].props.onDrop({ preventDefault() {} });
assert.deepEqual(productGalleryData(widget.props.value), {
  image: legacy[1],
  images: [legacy[1], legacy[0]],
  imageAlts: ['Side view', ''],
});
widget.props.mediaPaths = fromJS({ [widget.controlID]: ['/images/c.png', '/images/d.webp'] });
widget.componentDidUpdate();
assert.equal(widget.items().length, 4);
widget.props.mediaPaths = fromJS({ [widget.controlID]: ['/images/c.png'] });
widget.componentDidUpdate();
assert.equal(widget.items().length, 4, 'Selecting existing images does not duplicate them.');
widget.props.mediaPaths = fromJS({
  [widget.controlID]: Array.from({ length: 5 }, (_, i) => `/images/new${i}.png`),
});
widget.componentDidUpdate();
assert.equal(widget.items().length, 4);
assert.match(widget.state.error, /8/);
widget.props.mediaPaths = fromJS({
  [widget.controlID]: Array.from({ length: 4 }, (_, i) => `/images/new${i}.png`),
});
widget.componentDidUpdate();
assert.equal(widget.items().length, 8);
const cardRow = widget.render().children[0];
assert.equal(cardRow.children.filter(Boolean).length, 8, 'No add tile at the limit.');
const firstCard = cardRow.children[0];
firstCard.children[4].props.onClick();
assert.equal(widget.state.altIndex, 0);
const altLabel = widget.render().children.at(-1);
altLabel.children[1].props.onChange({ target: { value: 'Front view' } });
assert.equal(productGalleryData(widget.props.value).imageAlts[0], 'Front view');
widget.render().children[0].children[0].children[2].props.onClick();
assert.equal(widget.items().length, 7);
assert.equal(productGalleryData(widget.props.value).image, legacy[0]);
widget.componentWillUnmount();
let count = 0;
for (const file of await fs.readdir(new URL('../src/content/products/', import.meta.url))) {
  if (!file.endsWith('.json')) continue;
  const product = JSON.parse(
    await fs.readFile(new URL(`../src/content/products/${file}`, import.meta.url), 'utf8'),
  );
  const copy = JSON.stringify(product);
  const gallery = productGalleryData(product.images, product.image, product.imageAlts);
  assert(gallery.images.length <= 8);
  assert.equal(gallery.images.length, gallery.imageAlts.length);
  assert.equal(JSON.stringify(product), copy);
  count++;
}
// Exercise real gallery handlers: color selection, arrows, thumbnail sync and repeated page loads.
function galleryControl(dataset = {}) {
  const listeners = [];
  return {
    dataset,
    attributes: {},
    classList: { toggle() {} },
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener(type, handler) {
      if (type === 'click') listeners.push(handler);
    },
    click() {
      listeners.forEach((handler) => handler());
    },
  };
}
function galleryFixture(withColors = true) {
  const slides = [{}, {}, {}];
  const thumbs = slides.map((_, i) => galleryControl({ thumb: String(i) }));
  const colors = withColors
    ? [
        galleryControl({ gallerySelect: '0', colorName: 'Orange' }),
        galleryControl({ gallerySelect: '2', colorName: 'Blue' }),
      ]
    : [];
  const selected = {};
  const count = {};
  const prev = galleryControl();
  const next = galleryControl();
  const scope = {
    querySelectorAll: () => colors,
    querySelector: () => (withColors ? selected : null),
  };
  const root = {
    dataset: {},
    closest: () => (withColors ? scope : null),
    querySelectorAll: (selector) =>
      selector === '[data-slide]' ? slides : selector === '[data-thumb]' ? thumbs : [],
    querySelector: (selector) =>
      ({ '[data-gallery-prev]': prev, '[data-gallery-next]': next, '[data-gallery-count]': count })[
        selector
      ],
  };
  initProductGallery(root);
  return { root, slides, thumbs, colors, selected, count, prev, next };
}
const fixture = galleryFixture();
assert.equal(fixture.selected.textContent, 'Orange');
fixture.colors[1].click();
assert.deepEqual(
  fixture.slides.map((slide) => slide.hidden),
  [true, true, false],
);
assert.equal(fixture.selected.textContent, 'Blue');
assert.equal(fixture.thumbs[2].attributes['aria-pressed'], 'true');
assert.equal(fixture.colors[0].attributes['aria-pressed'], 'false');
assert.equal(fixture.count.textContent, '3 / 3');
initProductGallery(fixture.root);
fixture.next.click();
assert.equal(
  fixture.count.textContent,
  '1 / 3',
  'Repeated initialization must not double-bind arrows.',
);
fixture.prev.click();
assert.equal(fixture.selected.textContent, 'Blue');
fixture.thumbs[1].click();
assert.equal(fixture.selected.textContent, '—');
assert(fixture.colors.every((button) => button.attributes['aria-pressed'] === 'false'));
const legacyFixture = galleryFixture(false);
legacyFixture.next.click();
assert.equal(legacyFixture.count.textContent, '2 / 3');
assert.equal(fixture.count.textContent, '2 / 3', 'Galleries are isolated.');
console.log(
  'PASS: color selection, main-image visibility, thumbnail/arrow sync, wrapping, legacy galleries and repeat initialization.',
);
console.log(
  `PASS: ${count} existing galleries preserved; image/Alt alignment, reorder/main image, batch selection, deduplication, 8-image limit, removal and empty-gallery normalization.`,
);
