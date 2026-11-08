import assert from 'node:assert/strict';

// Run against the local dev server: node scripts/verify-pv-combiner-page.mjs [origin]
const origin = process.argv[2] ?? 'http://127.0.0.1:4400';
const response = await fetch(`${origin}/pv-combiner-box`);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? '';
assert(
  header.includes('href="/pv-combiner-box"'),
  'Product navigation must link to the landing page',
);
for (const section of [
  'customization',
  'projects',
  'configurations',
  'process',
  'faq',
  'inquiry',
]) {
  assert(html.includes(`id="${section}"`), `Missing section: ${section}`);
  assert(html.includes(`href="#${section}"`), `Missing section link: ${section}`);
}
assert.match(html, /<form[^>]*action="\/api\/contact"/);
assert.match(html, /name="subject"[^>]*value="PV Combiner Box/);
assert.match(html, /href="https:\/\/wa.me\/\d+\?text=/);
assert.match(html, /rel="canonical" href="https:\/\/www.elesoltree.com\/pv-combiner-box"/);
const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"');
const visible = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)]
  .filter(([, body]) => body.includes('<summary'))
  .map(([, body]) => {
    const question = body.match(/<summary[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/)?.[1];
    const answer = body.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1];
    return [question, answer].map((text) =>
      decode(text ?? '')
        .replace(/<[^>]*>/g, '')
        .trim(),
    );
  })
  .filter(([question]) => question);
const schemas = [
  ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
].flatMap(([, json]) => JSON.parse(json));
const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 8);
assert.deepEqual(
  visible,
  faq.mainEntity.map((item) => [item.name, item.acceptedAnswer.text]),
);
const targets = new Set(
  [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map(([, url]) => decode(url))
    .filter(
      (url) =>
        url.startsWith('/products/') ||
        url.startsWith('/_image?') ||
        url.startsWith('/categories/pv-combiner-box'),
    ),
);
for (const target of targets) {
  const result = await fetch(new URL(target, origin));
  assert.equal(result.status, 200, `Broken reference: ${target}`);
}
console.log(
  `PV combiner page OK: sections, enquiry form, 8 FAQs, canonical and ${targets.size} product/image references.`,
);
