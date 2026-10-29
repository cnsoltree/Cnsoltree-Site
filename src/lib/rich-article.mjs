import sanitizeHtml from 'sanitize-html';
import { fromHtml } from 'hast-util-from-html';
import { toText } from 'hast-util-to-text';
import { richArticleHtml } from './article-format.mjs';

/** Only article formatting survives; active HTML and arbitrary CSS never reach the public page. */
export function renderRichArticle(content) {
  const headings = [];
  const heading = (tagName, attribs) => {
    const slug = `article-section-${headings.length + 1}`;
    headings.push({ depth: Number(tagName[1]), slug, text: '' });
    return { tagName, attribs: { ...attribs, id: slug } };
  };
  const code = sanitizeHtml(richArticleHtml(content), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'span', 'u', 's'],
    allowedAttributes: {
      '*': ['style', 'id'],
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    allowedStyles: {
      '*': {
        color: [/^#[\da-f]{3,8}$/i, /^rgba?\([\d.,%\s]+\)$/i, /^[a-z]+$/i],
        'background-color': [/^#[\da-f]{3,8}$/i, /^rgba?\([\d.,%\s]+\)$/i, /^[a-z]+$/i],
        'font-family': [/^[\w\s,'"-]+$/],
        'font-size': [/^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/],
        'font-weight': [/^(?:normal|bold|[1-9]00)$/],
        'font-style': [/^(?:normal|italic)$/],
        'text-decoration': [/^(?:none|underline|line-through)(?: (?:underline|line-through))?$/],
        'text-align': [/^(?:left|right|center|justify)$/],
        'vertical-align': [/^(?:top|middle|bottom|baseline|sub|super)$/],
        width: [/^\d+(?:\.\d+)?(?:px|%)$/],
        height: [/^\d+(?:\.\d+)?(?:px|%)$/],
        'margin-left': [/^(?:auto|\d+(?:\.\d+)?(?:px|em|%))$/],
        'margin-right': [/^(?:auto|\d+(?:\.\d+)?(?:px|em|%))$/],
        'padding-left': [/^\d+(?:\.\d+)?(?:px|em)$/],
        'border-collapse': [/^(?:collapse|separate)$/],
        border: [/^\d+px (?:solid|dashed|dotted) (?:#[\da-f]{3,8}|[a-z]+)$/i],
      },
    },
    transformTags: {
      h1: (_tag, attrs) => heading('h2', attrs),
      h2: heading,
      h3: heading,
      h4: heading,
      h5: heading,
      h6: heading,
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, rel: 'noopener noreferrer' } }),
    },
  });
  const tree = fromHtml(code, { fragment: true });
  let index = 0;
  const lines = [];
  function walk(node) {
    if (node.type === 'element' && /^h[2-6]$/.test(node.tagName)) {
      const text = toText(node).trim();
      headings[index++].text = text;
      lines.push(`${'#'.repeat(Number(node.tagName[1]))} ${text}`);
    } else if (
      node.type === 'element' &&
      ['p', 'li', 'td', 'pre', 'blockquote'].includes(node.tagName)
    ) {
      lines.push(toText(node));
    } else for (const child of node.children || []) walk(child);
  }
  walk(tree);
  return { code, metadata: { headings }, analysisText: lines.join('\n\n') };
}
