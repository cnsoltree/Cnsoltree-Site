import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { isRichArticle } from './article-format.mjs';
import { isMarkdownArticle, markdownArticleSource, richArticleMarker } from './article-format.mjs';
import { renderRichArticle } from './rich-article.mjs';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
export const markdownProcessor = createMarkdownProcessor({ syntaxHighlight: false });

export async function renderArticleContent(content: string) {
  if (isRichArticle(content)) return renderRichArticle(content);
  if (isMarkdownArticle(content)) {
    const rendered = await (
      await markdownProcessor
    ).render(availableMarkdown(markdownArticleSource(content)));
    return renderRichArticle(`${richArticleMarker}\n${rendered.code}`);
  }
  return (await markdownProcessor).render(availableMarkdown(content));
}

// The source articles refer to seven illustrations that were never supplied.
// Keep their source references, but omit broken images until the assets exist.
const unavailable = new Set([
  '/images/blog/pv-combiner-box-certifications-overview.jpg',
  '/images/blog/pv-combiner-box-certification-by-market.jpg',
  '/images/blog/din-rail-aerosol-18-spec-parameters.jpg',
  '/images/blog/din-rail-aerosol-7-fraud-patterns.jpg',
  '/images/blog/aerosol-fire-extinguisher-notified-bodies-en-15276.jpg',
  '/images/blog/aerosol-fire-extinguisher-5-fraud-cases.jpg',
  '/images/blog/aerosol-fire-extinguisher-30-minute-verification.jpg',
]);
export function availableMarkdown(content: string) {
  return content.replace(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g, (original, url) =>
    unavailable.has(url) ? '' : original,
  );
}

export function articleFaqs(content: string) {
  if (isMarkdownArticle(content))
    content = renderRichArticle(
      `${richArticleMarker}\n${micromark(markdownArticleSource(content), {
        allowDangerousHtml: true,
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
      })}`,
    ).analysisText;
  if (isRichArticle(content)) content = renderRichArticle(content).analysisText;
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false,
    question = '',
    answer: string[] = [];
  const plain = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const flush = () => {
    if (question && answer.length)
      faqs.push({ question: plain(question), answer: plain(answer.join(' ')) });
    question = '';
    answer = [];
  };
  for (const line of content.split('\n').map((line) => line.trim())) {
    if (line.startsWith('## ')) {
      flush();
      inFaq = /frequently asked|faq/i.test(line);
    } else if (inFaq && line.startsWith('### ')) {
      flush();
      question = line.slice(4);
    } else if (inFaq && question && line && !line.startsWith('<!--')) answer.push(line);
  }
  flush();
  return faqs;
}
