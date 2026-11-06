import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const product = JSON.parse(
  readFileSync(new URL('../src/content/products/STD-40-PV-600V.json', import.meta.url), 'utf8'),
);
const response = await fetch(
  new URL('/products/STD-40-PV-600V', process.argv[2] || 'http://127.0.0.1:4400'),
);
assert.equal(response.status, 200);
const html = await response.text();
const section = html.split('id="specifications"')[1]?.split('</section>')[0];
assert(section, 'Specifications section must render');
const expected = product.detailSections.find((entry) => entry.id === 'specifications').table;
assert(section.includes(expected.caption), 'Table caption must render');
const rows = [...section.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
  [...row[1].matchAll(/<(?:th|td)\b[^>]*>([\s\S]*?)<\/(?:th|td)>/g)].map((cell) => cell[1].trim()),
);
assert.deepEqual(
  rows,
  expected.rows,
  'All table cells, including empty cells, must render in order',
);
console.log('PASS: product specifications table matches every configured row and cell.');

const drawing = html.split('id="drawing"')[1]?.split('</section>')[0];
assert(drawing, 'Drawing section must render');
const imageSrc = drawing.match(/<img\b[^>]*src="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
assert(imageSrc, 'Drawing image must render');
const imageResponse = await fetch(new URL(imageSrc, response.url));
assert.equal(imageResponse.status, 200);
assert(imageResponse.headers.get('content-type')?.startsWith('image/'));
console.log('PASS: Drawing image renders and loads successfully.');

const installation = html.split('id="installation-and-dimensions"')[1]?.split('</section>')[0];
assert(installation, 'Installation table must render');
assert(!/[?\uFFFD]/.test(installation), 'Installation table must not contain corrupted characters');
for (const text of [
  'Wiring capacity (mm\u00b2)',
  'Torque (N\u00b7m)',
  '\u22642000',
  '-30\u00b0C ~ +70\u00b0C',
  '30%~90%',
  '4~25',
  '4~16',
  'Size (mm) (W \u00d7 H \u00d7 L)',
]) {
  assert(installation.includes(text), `Expected intact text: ${text}`);
}
const expectedRows = product.detailSections.find(
  (entry) => entry.id === 'installation-and-dimensions',
).table.rows;
const renderedRows = [...installation.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)];
assert.equal(renderedRows.length, expectedRows.length);
const occupied = [];
for (const [rowIndex, row] of renderedRows.entries()) {
  const cells = [...row[1].matchAll(/<(th|td)\b([^>]*)>([\s\S]*?)<\/(?:th|td)>/g)];
  assert.equal(cells.length, expectedRows[rowIndex].length);
  let column = 0;
  for (const [cellIndex, cell] of cells.entries()) {
    const configured = expectedRows[rowIndex][cellIndex];
    const expectedCell = typeof configured === 'string' ? { text: configured } : configured;
    assert.equal(cell[3].trim(), expectedCell.text);
    const rowSpan = Number(cell[2].match(/rowspan="(\d+)"/)?.[1] || 1);
    const colSpan = Number(cell[2].match(/colspan="(\d+)"/)?.[1] || 1);
    assert.equal(rowSpan, expectedCell.rowSpan || 1);
    assert.equal(colSpan, expectedCell.colSpan || 1);
    while (occupied[rowIndex]?.[column]) column++;
    for (let y = rowIndex; y < rowIndex + rowSpan; y++) {
      assert(y < expectedRows.length, 'Rowspan must stay within the table');
      occupied[y] ??= [];
      for (let x = column; x < column + colSpan; x++) {
        assert(x < 4 && !occupied[y][x], 'Merged cells must not overlap or exceed four columns');
        occupied[y][x] = true;
      }
    }
    column += colSpan;
  }
  assert.equal(occupied[rowIndex].filter(Boolean).length, 4, 'Every row must fill four columns');
}
console.log('PASS: installation table values and merged cells form a complete four-column grid.');
