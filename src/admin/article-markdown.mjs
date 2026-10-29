import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import toMdast from 'hast-util-to-mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmToMarkdown } from 'mdast-util-gfm';

// Markdown keeps styled/merged blocks as HTML so switching modes cannot discard rich formatting.
function needsHtml(node) {
  return (
    node.type === 'element' &&
    (node.properties?.style ||
      node.properties?.rowSpan ||
      node.properties?.colSpan ||
      node.properties?.width ||
      node.properties?.height ||
      ['u', 'sub', 'sup'].includes(node.tagName) ||
      node.children.some(needsHtml))
  );
}

export function htmlToArticleMarkdown(html) {
  return fromHtml(html, { fragment: true })
    .children.map((node) => {
      if (needsHtml(node)) return toHtml(node);
      return toMarkdown(toMdast({ type: 'root', children: [node] }), {
        extensions: [gfmToMarkdown()],
        bullet: '-',
        emphasis: '*',
        strong: '*',
      }).trim();
    })
    .filter(Boolean)
    .join('\n\n');
}

export async function readMarkdownFile(file) {
  if (!file || !/\.(?:md|markdown)$/i.test(file.name))
    throw new Error('请选择 .md 或 .markdown 文件。');
  if (file.size > 2 * 1024 * 1024) throw new Error('Markdown 文件请控制在 2 MB 以内。');
  const text = await file.text();
  if (text.includes('\u0000') || text.includes('\ufffd'))
    throw new Error('文件编码无法识别，请另存为 UTF-8 后导入。');
  return text.replace(/^\ufeff/, '').replace(/\r\n?/g, '\n');
}
