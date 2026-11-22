import assert from 'node:assert/strict';
import fs from 'node:fs';

const expected = ['STD-40-PV-1000V', 'STD-40-PV-600V'];
const products = fs
  .readdirSync('src/content/products')
  .filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(fs.readFileSync(`src/content/products/${file}`, 'utf8')));
const dc = products.filter(
  (product) =>
    product.published &&
    !product.deletedAt &&
    product.categorySlug === 'surge-protector-device' &&
    (product.productTypes?.includes('DC') || /\bDC\b/i.test(product.name)),
);
assert.deepEqual(dc.map((product) => product.id).sort(), expected);

const base = process.argv[2] || 'http://127.0.0.1:4400';
const response = await fetch(`${base}/dc-surge-protector`);
assert.equal(response.status, 200);
const html = await response.text();
const range = html.split('id="series"')[1].split('id="selection"')[0];
assert.equal((range.match(/<article\b/g) || []).length, 2);
for (const id of expected) {
  assert(range.includes(`/products/${id}`), `Missing product link: ${id}`);
  assert.equal((await fetch(`${base}/products/${id}`)).status, 200);
}
const schemas = [
  ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
].flatMap((match) => JSON.parse(match[1]));
const rangeSchema = schemas.find((schema) => schema['@type'] === 'ItemList');
assert(rangeSchema, 'Missing ItemList schema for the DC SPD range');
assert.deepEqual(
  rangeSchema.itemListElement.map((item) => item.url).sort(),
  expected.map((id) => `https://www.elesoltree.com/products/${id}`).sort(),
);
assert(
  !schemas.some((schema) => schema['@type'] === 'Product'),
  'Range page must not emit incomplete Product schemas',
);
assert(!/STO-40-PV|500V to 1500V|1P–4P/.test(html));
console.log('DC SPD range: exactly two published models, cards, detail links and schemas passed.');
