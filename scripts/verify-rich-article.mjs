import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { isRichArticle, richArticleMarker, articleWords } from '../src/lib/article-format.mjs';
import { renderRichArticle } from '../src/lib/rich-article.mjs';
import { diagnoseContent } from '../src/lib/seo-diagnostics.mjs';
import * as articleFormat from '../src/lib/article-format.mjs';
import { htmlToArticleMarkdown, readMarkdownFile } from '../src/admin/article-markdown.mjs';

const markdownUrl = new URL('../src/lib/markdown.ts', import.meta.url);
const markdownCode = ts
  .transpileModule(await fs.readFile(markdownUrl, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  .outputText.replace(
    /from '([^']+)'/g,
    (_, name) =>
      `from '${name.startsWith('.') ? new URL(name, markdownUrl).href : import.meta.resolve(name)}'`,
  );
const { renderArticleContent, articleFaqs, markdownProcessor, availableMarkdown } = await import(
  `data:text/javascript;base64,${Buffer.from(markdownCode).toString('base64')}`
);
const processor = await markdownProcessor;
const converted = htmlToArticleMarkdown(
  '<h2>Heading</h2><p><strong>Bold</strong></p><p style="text-align:center;color:#ff0000">Styled</p><table><tr><td rowspan="2">Merged</td></tr></table>',
);
assert.match(converted, /## Heading/);
assert.match(converted, /\*\*Bold\*\*/);
assert.match(converted, /text-align:center;color:#ff0000/);
assert.match(converted, /rowspan="2"/);
const imported = await readMarkdownFile({
  name: 'test.MD',
  size: 30,
  text: async () => '\ufeff## Test\r\n\r\nBody',
});
assert.equal(imported, '## Test\n\nBody');
await assert.rejects(readMarkdownFile({ name: 'test.exe', size: 0 }), /请选择/);
await assert.rejects(readMarkdownFile({ name: 'test.md', size: 3 * 1024 * 1024 }), /2 MB/);
await assert.rejects(
  readMarkdownFile({ name: 'test.md', size: 3, text: async () => '\ufffd' }),
  /UTF-8/,
);
const newMarkdown = await renderArticleContent(
  `${articleFormat.markdownArticleMarker}\n${converted}\n<script>alert(1)</script>`,
);
assert(!newMarkdown.code.includes('<script'));
assert.match(newMarkdown.code, /color:#ff0000/);
let oldCount = 0;
for (const file of await fs.readdir(new URL('../src/content/articles/', import.meta.url))) {
  if (!file.endsWith('.json')) continue;
  const post = JSON.parse(
    await fs.readFile(new URL(`../src/content/articles/${file}`, import.meta.url), 'utf8'),
  );
  if (isRichArticle(post.content)) continue;
  const rendered = await renderArticleContent(post.content);
  const original = await processor.render(availableMarkdown(post.content));
  assert.equal(rendered.code, original.code, `Old Markdown changed: ${file}`);
  assert.deepEqual(rendered.metadata.headings, original.metadata.headings);
  oldCount++;
}
const content = `${richArticleMarker}\n<h2>Technical guide</h2>
<p style="text-align:center"><span style="font-family:Arial;font-size:18px;color:#ff0000;background-color:#ffff00">Formatted text</span></p>
<table><tbody><tr><td rowspan="2">A</td><td>B</td></tr></tbody></table>
<p><img src="/images/uploads/example.png" alt="Diagram" width="300"></p>
<h2>FAQ</h2><h3>How does it work?</h3><p>It works safely.</p>`;
const result = await renderArticleContent(content);
assert.match(result.code, /font-size:18px/);
assert.match(result.code, /text-align:center/);
assert.match(result.code, /background-color:#ffff00/);
assert.match(result.code, /rowspan="2"/);
assert.match(result.code, /src="\/images\/uploads\/example.png"/);
assert.deepEqual(
  result.metadata.headings.map((h) => h.text),
  ['Technical guide', 'FAQ', 'How does it work?'],
);
assert.deepEqual(articleFaqs(content), [
  { question: 'How does it work?', answer: 'It works safely.' },
]);
assert.equal(
  (await renderArticleContent(JSON.parse(JSON.stringify({ content })).content)).code,
  result.code,
);
const unsafe = renderRichArticle(`${richArticleMarker}<h1>Main</h1><script>alert(1)</script>
<p onclick="alert(1)" style="position:fixed;background-image:url(javascript:alert(1));color:#123456">Safe</p>
<a href="javascript:alert(1)">Bad</a><img src="x" onerror="alert(1)"><iframe src="https://evil.test"></iframe>`);
assert(!/script|onclick|onerror|javascript|position:|background-image|iframe/.test(unsafe.code));
assert.match(unsafe.code, /color:#123456/);
assert.match(unsafe.code, /<h2 id=/);
assert.equal(articleWords(`${richArticleMarker}<p>Hello <strong>world</strong></p>`), 2);
assert(
  diagnoseContent({
    articles: [{ slug: 'rich', content: `${richArticleMarker}<h2>A</h2><h4>B</h4>` }],
  }).some((finding) => finding.code === 'heading-order'),
);

// Exercise the real widget lifecycle with a minimal editor double: opening must never rewrite old content.
let definition, options, handler;
const changes = [];
const fakeEditor = {
  value: '',
  e: {
    on: (_name, callback) => {
      handler = callback;
    },
  },
  s: {
    save() {},
    restore() {},
    insertImage(path) {
      fakeEditor.value += `<img src="${path}">`;
      handler();
    },
  },
  setReadOnly() {},
  destruct() {
    fakeEditor.destroyed = true;
  },
};
const widgetCode = ts.transpileModule(
  await fs.readFile(new URL('../src/admin/rich-article-editor.js', import.meta.url), 'utf8'),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  },
).outputText;
const module = { exports: {} };
new Function('module', 'exports', 'require', widgetCode)(module, module.exports, (name) => {
  if (name === 'jodit')
    return {
      Jodit: {
        make: (host, config) => {
          options = config;
          fakeEditor.value = host.value;
          return fakeEditor;
        },
      },
    };
  if (name === 'dompurify') return { default: { sanitize: (html) => html } };
  if (name === 'micromark') return { micromark };
  if (name === 'micromark-extension-gfm') return { gfm, gfmHtml };
  if (name.endsWith('article-format.mjs')) return articleFormat;
  if (name.endsWith('article-markdown.mjs')) return { htmlToArticleMarkdown, readMarkdownFile };
  return {};
});
module.exports.registerRichArticle(
  {
    registerWidget: (_name, control) => {
      definition = control;
    },
  },
  () => {},
  (control) => control,
);
const widget = {
  ...definition,
  state: definition.getInitialState(),
  setState(update) {
    this.state = { ...this.state, ...update };
  },
  host: {},
  props: {
    value: '## Original\n\n**Unchanged**',
    onChange: (value) => changes.push(value),
    onRemoveMediaControl() {},
    onRemoveInsertedMedia() {},
  },
};
widget.componentDidMount();
assert.equal(changes.length, 0);
widget.setMode('markdown');
assert.equal(widget.state.markdown, '## Original\n\n**Unchanged**');
const hiddenChanges = changes.length;
handler();
assert.equal(changes.length, hiddenChanges, 'The hidden rich editor must not overwrite Markdown.');
widget.setMode('rich');
assert.equal(changes.length, 0, 'Switching without editing must keep the original content.');
assert.match(fakeEditor.value, /<h2>Original<\/h2>/);
assert(
  options.buttons.includes('font') &&
    options.buttons.includes('fontsize') &&
    options.buttons.includes('table'),
);
fakeEditor.value = '<p style="color:#ff0000">Edited</p>';
handler();
assert(isRichArticle(changes[0]));
widget.props.value = changes[0];
widget.componentDidUpdate();
assert.equal(changes.length, 1, 'An echoed saved value must not trigger another update.');
widget.props.mediaPaths = { get: () => '/images/uploads/photo.png' };
widget.componentDidUpdate();
assert.match(changes.at(-1), /\/images\/uploads\/photo.png/);
fakeEditor.value = '<p><br></p>';
handler();
assert.equal(
  changes.at(-1),
  '',
  'Clearing the editor keeps publication-required validation effective.',
);
widget.lastValue = '';
await widget.importMarkdown({
  name: 'import.md',
  size: 20,
  text: async () => '## Imported\n\nBody',
});
assert.equal(widget.state.mode, 'markdown');
assert.equal(widget.state.markdown, '## Imported\n\nBody');
assert.equal(articleFormat.markdownArticleSource(changes.at(-1)), widget.state.markdown);
const beforeImport = changes.length;
await widget.importMarkdown({ name: 'replace.md', size: 10, text: async () => 'Replacement' });
assert.equal(
  changes.length,
  beforeImport,
  'Importing over existing text must wait for explicit replacement.',
);
assert.equal(widget.state.importPending, 'Replacement');
widget.setState({ importPending: null });
widget.setMode('rich');
assert.match(fakeEditor.value, /<h2>Imported/);
widget.componentWillUnmount();
assert(fakeEditor.destroyed);
console.log(
  `PASS: ${oldCount} old Markdown articles unchanged; rich formatting, tables, image paths, JSON roundtrip, headings/FAQ, safe HTML, SEO and editor lifecycle.`,
);
