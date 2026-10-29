import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { fromHtml } from 'hast-util-from-html';
import { toText } from 'hast-util-to-text';
import { isRichArticle, richArticleHtml, markdownArticleSource } from './article-format.mjs';

const skipped = new Set([
  'script',
  'style',
  'pre',
  'table',
  'ul',
  'ol',
  'nav',
  'figure',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]);
export function articleSummary(record) {
  return (
    (typeof record.metaDescription === 'string' && record.metaDescription.trim()) ||
    articleExcerpt(record.content)
  );
}
function withoutImages(node) {
  return {
    ...node,
    ...(node.children
      ? {
          children: node.children
            .filter((child) => child.tagName !== 'img' && !skipped.has(child.tagName))
            .map(withoutImages),
        }
      : {}),
  };
}

/** First readable body paragraph, shared by cards, metadata, RSS and admin previews. */
export function articleExcerpt(content = '') {
  if (typeof content !== 'string' || !content.trim()) return '';
  const html = isRichArticle(content)
    ? richArticleHtml(content)
    : micromark(markdownArticleSource(content), {
        allowDangerousHtml: true,
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
      });
  const tree = fromHtml(html, { fragment: true });
  const text = (node) => toText(withoutImages(node)).replace(/\s+/g, ' ').trim();
  function paragraph(node) {
    if (skipped.has(node.tagName)) return '';
    if (node.tagName === 'p') return text(node);
    for (const child of node.children || []) {
      const found = paragraph(child);
      if (found) return found;
    }
    return '';
  }
  const first =
    paragraph(tree) ||
    tree.children.map((node) => (skipped.has(node.tagName) ? '' : text(node))).find(Boolean) ||
    '';
  const chars = Array.from(first);
  if (chars.length <= 220) return first;
  const prefix = chars.slice(0, 220).join('');
  const boundary = prefix.lastIndexOf(' ');
  return `${boundary > 160 ? prefix.slice(0, boundary) : prefix}…`;
}
