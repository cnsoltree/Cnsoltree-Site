import assert from 'node:assert/strict';
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
console.log(
  `PASS: ${count} existing galleries preserved; image/Alt alignment, reorder/main image, batch selection, deduplication, 8-image limit, removal and empty-gallery normalization.`,
);
