export const richArticleMarker = '<!-- soltree-richtext -->';
export const markdownArticleMarker = '<!-- soltree-markdown -->';
export const isMarkdownArticle = (value) =>
  typeof value === 'string' && value.startsWith(markdownArticleMarker);
export const markdownArticleSource = (value = '') =>
  isMarkdownArticle(value)
    ? value.slice(markdownArticleMarker.length).replace(/^\r?\n/, '')
    : value;
export const isRichArticle = (value) =>
  typeof value === 'string' && value.startsWith(richArticleMarker);
export const richArticleHtml = (value) => value.slice(richArticleMarker.length).trim();

export function articleWords(value = '') {
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
