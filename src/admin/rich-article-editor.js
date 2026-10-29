import { Jodit } from 'jodit';
import 'jodit/esm/langs/zh_cn.js';
import DOMPurify from 'dompurify';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { isRichArticle, richArticleHtml, richArticleMarker } from '../lib/article-format.mjs';
import { htmlToArticleMarkdown, readMarkdownFile } from './article-markdown.mjs';
import { markdownArticleMarker, markdownArticleSource } from '../lib/article-format.mjs';

export function editorHtml(value = '') {
  const html = isRichArticle(value)
    ? richArticleHtml(value)
    : micromark(markdownArticleSource(value), {
        allowDangerousHtml: true,
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
      });
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function registerRichArticle(CMS, h, createClass) {
  CMS.registerWidget(
    'rich-article',
    createClass({
      getInitialState() {
        return { mode: 'rich', markdown: '', error: '', importPending: null };
      },
      setMode(mode) {
        if (mode === this.state.mode) return;
        if (mode === 'markdown') {
          const value = this.lastValue || '';
          this.setState({
            mode,
            markdown: isRichArticle(value)
              ? htmlToArticleMarkdown(editorHtml(value))
              : markdownArticleSource(value),
            error: '',
          });
        } else {
          this.syncing = true;
          this.editor.value = editorHtml(this.lastValue || '');
          this.lastHtml = this.editor.value;
          this.syncing = false;
          this.setState({ mode, error: '' });
        }
      },
      async importMarkdown(file) {
        try {
          const markdown = await readMarkdownFile(file);
          if ((this.lastValue || '').trim()) this.setState({ importPending: markdown, error: '' });
          else this.applyMarkdown(markdown);
        } catch (failure) {
          this.setState({ error: failure.message });
        }
      },
      applyMarkdown(markdown) {
        this.lastValue = markdown.trim() ? `${markdownArticleMarker}\n${markdown}` : '';
        this.setState({ mode: 'markdown', markdown, importPending: null, error: '' });
        this.props.onChange(this.lastValue);
      },
      componentDidMount() {
        this.controlID = crypto.randomUUID();
        this.host.value = editorHtml(this.props.value);
        this.editor = Jodit.make(this.host, {
          language: 'zh_cn',
          height: 'auto',
          minHeight: 440,
          toolbarSticky: false,
          toolbarAdaptive: false,
          buttons: [
            'undo',
            'redo',
            '|',
            'paragraph',
            'font',
            'fontsize',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'brush',
            '|',
            'align',
            'ul',
            'ol',
            'outdent',
            'indent',
            '\n',
            {
              name: 'articleImage',
              icon: 'image',
              tooltip: '上传或选择正文图片',
              exec: () => {
                this.editor.s.save();
                this.props.onOpenMediaLibrary({
                  controlID: this.controlID,
                  forImage: true,
                  allowMultiple: false,
                  field: this.props.field,
                });
              },
            },
            'link',
            'table',
            'hr',
            'symbols',
            'eraser',
            '|',
            'source',
            'fullsize',
          ],
          controls: {
            paragraph: {
              list: {
                p: '段落',
                h2: '二级标题',
                h3: '三级标题',
                h4: '四级标题',
                blockquote: '引用',
              },
            },
          },
          uploader: { url: '', insertImageAsBase64URI: false },
          enableDragAndDropFileToEditor: false,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
          sourceEditor: 'area',
          showXPathInStatusbar: false,
          readonly: Boolean(this.props.isDisabled),
        });
        this.lastHtml = this.editor.value;
        this.lastValue = this.props.value;
        this.editor.e.on('change', () => {
          if (this.syncing || this.state.mode === 'markdown') return;
          const html = this.editor.value;
          if (html === this.lastHtml) return;
          this.lastHtml = html;
          const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
          const hasContent = clean.replace(/<[^>]*>|&nbsp;/g, '').trim() || /<img\b/i.test(clean);
          this.lastValue = hasContent ? `${richArticleMarker}\n${clean}` : '';
          this.props.onChange(this.lastValue);
        });
      },
      componentDidUpdate() {
        if (!this.editor) return;
        if (this.props.value !== this.lastValue) {
          this.syncing = true;
          this.lastValue = this.props.value;
          this.editor.value = editorHtml(this.props.value);
          this.lastHtml = this.editor.value;
          this.syncing = false;
          if (this.state.mode === 'markdown')
            this.setState({
              markdown: isRichArticle(this.lastValue)
                ? htmlToArticleMarkdown(editorHtml(this.lastValue))
                : markdownArticleSource(this.lastValue || ''),
            });
        }
        this.editor.setReadOnly(Boolean(this.props.isDisabled));
        const path = this.props.mediaPaths?.get(this.controlID);
        if (path) {
          this.props.onRemoveInsertedMedia(this.controlID);
          this.editor.s.restore();
          if (/^\/images\/.+\.(?:png|jpe?g|webp|avif)$/i.test(path))
            this.editor.s.insertImage(path);
        }
      },
      componentWillUnmount() {
        this.editor?.destruct();
        this.props.onRemoveMediaControl(this.controlID);
      },
      render() {
        return h(
          'div',
          { className: 'article-rich-editor' },
          h(
            'div',
            {
              className: 'article-editor-modes',
              role: 'group',
              'aria-label': '正文编辑模式与导入',
            },
            ...[
              ['rich', '富文本'],
              ['markdown', 'Markdown'],
            ].map(([mode, label]) =>
              h(
                'button',
                {
                  type: 'button',
                  'aria-pressed': this.state.mode === mode,
                  disabled: this.props.isDisabled,
                  onClick: () => this.setMode(mode),
                },
                label,
              ),
            ),
            h(
              'button',
              {
                type: 'button',
                disabled: this.props.isDisabled,
                onClick: () => this.fileInput.click(),
              },
              '导入 .md 文件',
            ),
            h('input', {
              type: 'file',
              accept: '.md,.markdown,text/markdown',
              hidden: true,
              ref: (node) => {
                this.fileInput = node;
              },
              onChange: (event) => {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (file) void this.importMarkdown(file);
              },
            }),
          ),
          this.state.error &&
            h('p', { role: 'alert', className: 'product-error' }, this.state.error),
          this.state.importPending !== null &&
            h(
              'div',
              { className: 'article-import-confirm', role: 'group', 'aria-label': '确认导入正文' },
              h('p', {}, '当前正文已有内容。导入会替换正文，标题、封面等其他字段不变。'),
              h(
                'button',
                { type: 'button', onClick: () => this.applyMarkdown(this.state.importPending) },
                '替换正文',
              ),
              h(
                'button',
                { type: 'button', onClick: () => this.setState({ importPending: null }) },
                '取消导入',
              ),
            ),
          h(
            'div',
            { hidden: this.state.mode !== 'rich' },
            h('textarea', {
              id: this.props.forID,
              ref: (node) => {
                this.host = node;
              },
              'aria-label': '文章正文富文本编辑器',
            }),
          ),
          this.state.mode === 'markdown' &&
            h(
              'div',
              { className: 'article-markdown-editor' },
              h(
                'p',
                {},
                '可直接编辑 Markdown；字体、颜色、对齐及合并表格会以 HTML 保留。文件中的本机图片路径需通过媒体库上传后替换。',
              ),
              h('textarea', {
                value: this.state.markdown,
                'aria-label': '文章 Markdown 正文',
                readOnly: this.props.isDisabled,
                spellCheck: false,
                onChange: (event) => this.applyMarkdown(event.target.value),
              }),
            ),
        );
      },
    }),
  );
}
