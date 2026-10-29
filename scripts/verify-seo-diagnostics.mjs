import assert from 'node:assert/strict';
import { diagnoseContent } from '../src/lib/seo-diagnostics.mjs';

const article = {
  entryKey: 'original-file',
  slug: 'safe-guide',
  title: 'Technical guide',
  excerpt: 'A real local summary.',
  published: true,
  content:
    '## Selection\n\n### Installation\n\n[Product](/products/MCB#unknown-anchor)\n[External](https://example.com/blog/missing)\n[Mail](mailto:test@example.com)',
};
const knownPaths = new Set(['/products/MCB']);
const fallback = diagnoseContent({ articles: [article], knownPaths });
assert.deepEqual(
  fallback.map((item) => item.code),
  ['metadata-fallback'],
);
assert.equal(fallback[0].severity, 'notice');
assert.equal(fallback[0].editHref, '/admin/articles/original-file/edit');
assert.deepEqual(
  diagnoseContent({ articles: [{ ...article, deletedAt: '2026-10-27T00:00:00.000Z' }] }),
  [],
);
assert(
  !diagnoseContent({
    articles: [
      {
        ...article,
        content: '```md\n# Example heading\n[Example](/products/missing)\n```\n## Real heading',
      },
    ],
    knownPaths,
  }).some((item) => ['body-h1', 'internal-path-review'].includes(item.code)),
);
assert(
  !diagnoseContent({
    articles: [{ ...article, content: '    # Indented code example\n\n## Real heading' }],
  }).some((item) => item.code === 'body-h1'),
);
assert(
  diagnoseContent({ articles: [{ ...article, content: '# Extra H1\n\n#### Jump' }] }).some(
    (item) => item.code === 'body-h1' && item.severity === 'warning',
  ),
);
assert(
  diagnoseContent({ articles: [{ ...article, content: '#' }] }).some(
    (item) => item.code === 'body-h1',
  ),
);
assert(
  diagnoseContent({ articles: [{ ...article, content: 'Heading\n===\n\n### Jump' }] }).some(
    (item) => item.code === 'body-h1',
  ),
);
const review = diagnoseContent({
  articles: [
    { ...article, content: '[Review](/blog/local-draft#unknown)\n![Image](/images/absent.webp)' },
  ],
  knownPaths,
}).find((item) => item.code === 'internal-path-review');
assert.equal(review.severity, 'notice');
assert(
  review.description.includes('/blog/local-draft') &&
    review.description.includes('/images/absent.webp'),
);
assert(
  !diagnoseContent({
    articles: [{ ...article, content: '[Unknown](/arbitrary-dynamic/path)' }],
    knownPaths,
  }).some((item) => item.code === 'internal-path-review'),
);
const duplicates = diagnoseContent({
  articles: [
    article,
    {
      ...article,
      entryKey: 'second-file',
      slug: 'another-guide',
      metaTitle: 'Technical guide | Soltree',
    },
  ],
});
assert.equal(
  duplicates.filter((item) => item.code === 'duplicate-title' && item.severity === 'warning')
    .length,
  2,
);
const partialDraft = diagnoseContent({
  products: [{ entryKey: 'empty-draft', id: 'draft', published: false }],
});
assert.equal(partialDraft[0].severity, 'notice');
assert.equal(partialDraft[0].editHref, '/admin/products/empty-draft/edit');
const original = structuredClone(article);
diagnoseContent({ articles: [article] });
assert.deepEqual(article, original);
assert(
  diagnoseContent({
    products: Array.from({ length: 250 }, (_, index) => ({
      entryKey: `${index}`,
      id: `${index}`,
      name: 'Same title',
      shortDescription: 'Description',
      published: true,
    })),
  }).length <= 200,
);
console.log(
  'PASS local SEO diagnostics: real fallbacks, headings, duplicate titles, conservative paths, trash exclusion and bounded output.',
);
