import './workspace.js';
import './product-table.js';
import './group-manager.js';
import './analytics-dashboard.js';
import './seo-workspace.js';
import { cmsConfig, categoryNames, familyName } from './config';
import chineseLocale from '../../node_modules/decap-cms-locales/dist/esm/zh_Hans/index.js';

const { CMS, h, createClass } = window;
if (!CMS) throw new Error('内容后台未加载，请重启 npm run admin 后刷新。');
const savedProductRevisions = new Map();
const savedArticleRevisions = new Map();
CMS.registerLocale('zh_Hans', {
  ...chineseLocale,
  auth: { ...chineseLocale.auth, login: '进入本地后台' },
  collection: {
    ...chineseLocale.collection,
    sidebar: { ...chineseLocale.collection.sidebar, collections: '内容导航' },
  },
  editor: {
    ...chineseLocale.editor,
    editorToolbar: {
      ...chineseLocale.editor.editorToolbar,
      backCollection: '返回%{collectionLabel}',
      unsavedChanges: '有未保存的修改',
      publish: '保存到本地',
      publishNow: '保存到本地',
      published: '已保存',
      publishing: '正在保存到本地…',
      publishAndCreateNew: '保存后新建内容',
      publishAndDuplicate: '保存后复制内容',
      save: '保存到本地',
      saving: '正在保存到本地…',
      changesSaved: '修改已保存到本地',
    },
  },
  ui: {
    ...chineseLocale.ui,
    toast: {
      ...chineseLocale.ui.toast,
      entrySaved: '内容已保存到本地',
      entryPublished: '内容已保存到本地',
      onFailToPublishEntry: '本地保存失败：%{details}',
    },
  },
});
CMS.registerWidget(
  'stable-route',
  createClass({
    render() {
      const entry = this.props.getEntry();
      const path = entry.get('path');
      const existing = Boolean(path && !entry.get('newRecord'));
      return h('input', {
        id: this.props.forID,
        className: this.props.classNameWrapper,
        type: 'text',
        value: this.props.value || '',
        readOnly: existing,
        onChange: (event) => {
          if (!existing) this.props.onChange(event.target.value);
        },
        onFocus: this.props.setActiveStyle,
        onBlur: this.props.setInactiveStyle,
        'aria-readonly': existing,
        title: existing ? '已保存的网址已锁定，避免影响搜索收录。' : '保存后网址自动锁定。',
      });
    },
  }),
);

CMS.registerWidget(
  'readonly-time',
  createClass({
    render() {
      const value = this.props.value || '';
      const display = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? value
        : value && Number.isFinite(Date.parse(value))
          ? new Intl.DateTimeFormat('sv-SE', {
              timeZone: 'America/Los_Angeles',
              dateStyle: 'short',
              timeStyle: 'short',
            }).format(new Date(value))
          : value;
      return h('input', {
        id: this.props.forID,
        className: this.props.classNameWrapper,
        type: 'text',
        value: display,
        readOnly: true,
        'aria-readonly': true,
        title: value,
        placeholder: '首次保存后自动记录',
      });
    },
  }),
);

CMS.registerPreviewStyle(
  `
  *{box-sizing:border-box}
  body{font-family:Inter,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;color:#20372d;padding:32px;margin:0;line-height:1.75;background:#f3f6f3}
  .preview-label{font-size:11px;letter-spacing:.05em;font-weight:700;color:#358160;margin:26px 0 12px}
  .preview-label:first-child{margin-top:0}
  .search-preview{padding:24px;border:1px solid #dce7de;border-top:3px solid #2f9466;border-radius:14px;margin-bottom:24px;background:#fff;box-shadow:0 4px 20px #193b2610}
  .search-url{font-size:11px;color:#718277;overflow-wrap:anywhere}
  .search-title{font-size:20px;line-height:1.45;color:#1a0dab;margin:8px 0}
  .search-description{color:#58655e;font-size:13px;line-height:1.8}
  .counts{font-size:11px;color:#94a398;margin-top:14px;padding-top:12px;border-top:1px solid #edf1ed}
  h1{font-size:28px;line-height:1.4;letter-spacing:-.025em;margin:12px 0 24px;color:#193d2d}h2{font-size:22px}h3{font-size:18px}
  p{white-space:pre-line}img{max-width:100%;height:auto;border-radius:12px}table{width:100%;border-collapse:collapse;background:#fff}td,th{border:1px solid #e0e9e1;padding:10px;text-align:left}
  .cover{max-height:260px;object-fit:contain;width:100%;background:#fff;border:1px solid #e2e9e2;padding:16px}.status{display:inline-flex;font-size:11px;color:#47755a;background:#e6f0e6;border:1px solid #d6e6d7;border-radius:20px;padding:4px 10px;margin:0 0 12px}.hint{font-size:12px;color:#87968b}
  a{color:#218154;text-underline-offset:4px;font-size:12px}
`,
  { raw: true },
);

function ContentPreview({ entry, widgetFor, getAsset }) {
  const data = entry.get('data');
  const product = entry.get('collection') === 'products' || Boolean(data.get('id'));
  const title = data.get(product ? 'name' : 'title') || '请输入标题';
  const description = data.get(product ? 'shortDescription' : 'excerpt') || '';
  const seoTitle = data.get('metaTitle') || `${title} | Soltree`;
  const seoDescription = data.get('metaDescription') || description;
  const path = `/${product ? 'products' : 'blog'}/${data.get(product ? 'id' : 'slug') || 'your-page-url'}`;
  const cover = data.get('image');
  const category = data.get(product ? 'categorySlug' : 'relatedCategorySlug');
  return h(
    'div',
    {},
    h('p', { className: 'preview-label' }, '搜索结果预览（展示示意，实际摘要由搜索引擎决定）'),
    h(
      'div',
      { className: 'search-preview' },
      h('div', { className: 'search-url' }, `https://www.elesoltree.com${path}`),
      h('div', { className: 'search-title' }, seoTitle),
      h('div', { className: 'search-description' }, seoDescription),
      h(
        'div',
        { className: 'counts' },
        `标题 ${seoTitle.length} 字符 · 描述 ${seoDescription.length} 字符`,
      ),
    ),
    h(
      'p',
      { className: 'status' },
      data.get('published') ? '前台显示：开启 · 保存后可查看本地页面' : '草稿 · 不生成公开页面',
    ),
    data.get('published') && entry.get('path') && !entry.get('newRecord')
      ? h(
          'a',
          { href: path, target: '_blank', rel: 'noopener noreferrer' },
          '查看已保存的本地页面 ↗',
        )
      : h('p', { className: 'hint' }, '保存并开启“前台显示”后，可打开本地页面。'),
    h(
      'p',
      { className: 'preview-label' },
      [familyName(category), categoryNames[category]].filter(Boolean).join(' / '),
    ),
    h('h1', {}, title),
    cover && h('img', { className: 'cover', src: getAsset(cover).toString(), alt: title }),
    h('p', {}, description),
    product
      ? h(
          'div',
          {},
          h('h2', {}, '产品详情'),
          h('p', {}, data.get('description') || ''),
          widgetFor('features'),
          h('h2', {}, '技术参数'),
          widgetFor('specs'),
        )
      : h('div', {}, widgetFor('content')),
  );
}
CMS.registerPreviewTemplate('products', ContentPreview);
CMS.registerPreviewTemplate('articles', ContentPreview);

CMS.registerEventListener({
  name: 'preSave',
  handler: async ({ entry }) => {
    let data = entry.get('data');
    const isProduct = Boolean(data.get('id'));
    const key = isProduct ? 'id' : 'slug';
    const existingPath = entry.get('path');
    const response = await fetch('/__cms/content-index', { cache: 'no-store' });
    if (!response.ok) throw new Error('暂时无法核对内容网址，请确认本地后台服务正在运行后重试。');
    const contentIndex = await response.json();
    const index = contentIndex[isProduct ? 'products' : 'articles'];
    const value = data.get(key);
    // Decap retains an existing entry path. Prevent changing an established route in its form.
    if (existingPath && !entry.get('newRecord')) {
      const storedKey = existingPath
        .split('/')
        .pop()
        .replace(/\.json$/, '');
      if (index[storedKey] !== value)
        throw new Error(
          '已保存内容的网址不能修改。请保留原 ID / slug；需要迁移网址时联系维护人员设置跳转。',
        );
    } else if (Object.values(index).some((saved) => saved.toLowerCase() === value.toLowerCase())) {
      throw new Error('这个网址已经有内容使用，请换一个唯一的网址 ID / slug。');
    }
    if (data.get('sortOrder') === '' || data.get('sortOrder') === null)
      data = data.delete('sortOrder');
    const stringLists = isProduct
      ? [
          'features',
          'images',
          'descriptionImages',
          'imageAlts',
          'additionalCategorySlugs',
          'productTypes',
        ]
      : ['tags', 'relatedProductTypes'];
    for (const name of stringLists) {
      const values = data.get(name);
      if (values?.filter)
        data = data.set(
          name,
          values.filter((item) => typeof item === 'string' && item.trim()),
        );
    }
    if (isProduct) {
      const now = new Date().toISOString();
      if (existingPath && !entry.get('newRecord')) {
        const filename = existingPath
          .split('/')
          .pop()
          .replace(/\.json$/, '');
        const metadata = contentIndex.productMeta?.[filename];
        if (!metadata) throw new Error('暂时无法核对产品状态，请刷新后台后重试。');
        if (metadata.deletedAt) throw new Error('此产品已移入回收站，请先从回收站恢复后再编辑。');
        if (
          metadata.updatedAt !== data.get('updatedAt') &&
          metadata.updatedAt !== savedProductRevisions.get(existingPath)
        )
          throw new Error('该产品已在其他位置更新，请刷新页面后重新编辑，避免覆盖最新内容。');
        data =
          metadata.createdAt === undefined
            ? data.delete('createdAt')
            : data.set('createdAt', metadata.createdAt);
      } else {
        data = data.set('createdAt', now);
      }
      data = data.delete('deletedAt').set('updatedAt', now);
      data = data.set('categoryName', categoryNames[data.get('categorySlug')] || '');
      if (!data.get('slug')) data = data.set('slug', data.get('id'));
    } else {
      if (existingPath && !entry.get('newRecord')) {
        const filename = existingPath
          .split('/')
          .pop()
          .replace(/\.json$/, '');
        const metadata = contentIndex.articleMeta?.[filename];
        if (!metadata) throw new Error('暂时无法核对文章状态，请刷新后台后重试。');
        if (metadata.deletedAt) throw new Error('此文章已移入回收站，请先从回收站恢复后再编辑。');
        if (
          metadata.dateModified !== data.get('dateModified') &&
          metadata.dateModified !== savedArticleRevisions.get(existingPath)
        )
          throw new Error('该文章已在其他位置更新，请刷新页面后重新编辑，避免覆盖最新内容。');
      }
      if (/^#\s+/m.test(data.get('content') || ''))
        throw new Error('正文请从二级标题（##）开始；页面已自动使用文章标题作为唯一的大标题。');
      data = data.delete('deletedAt').set('dateModified', new Date().toISOString());
      const words = (data.get('content') || '').trim().split(/\s+/).filter(Boolean).length;
      data = data.set('readingTime', Math.max(1, Math.ceil(words / 220)));
    }
    if (data.get('published')) {
      const required = isProduct
        ? {
            categorySlug: '产品分类',
            image: '封面图片',
            shortDescription: '产品简介',
            description: '产品详情',
          }
        : {
            relatedCategorySlug: '文章产品分类',
            image: '封面图片',
            excerpt: '文章简介',
            content: '文章正文',
            author: '作者',
            date: '发布日期',
          };
      const missing = Object.entries(required)
        .filter(([name]) => typeof data.get(name) !== 'string' || !data.get(name).trim())
        .map(([, label]) => label);
      if (missing.length)
        throw new Error(
          `开启“前台显示”前请补全：${missing.join('、')}。也可以先关闭此开关保存草稿。`,
        );
      if (!isProduct && Number.isNaN(Date.parse(data.get('date'))))
        throw new Error('请填写有效的发布日期后再开启“前台显示”。');
      if (isProduct) {
        const specs = data.get('specs')?.toJS?.() ?? [];
        if (specs.some((spec) => !spec.name?.trim() || !spec.value?.trim()))
          throw new Error('开启“前台显示”前请补全每行技术参数的名称和值，或移除空行。');
        if (new Set(specs.map((spec) => spec.name)).size !== specs.length)
          throw new Error('技术参数名称重复，请合并后再保存。');
      }
    }
    return data;
  },
});

CMS.registerEventListener({
  name: 'postSave',
  handler: ({ entry }) => {
    if (entry.get('path') && entry.getIn(['data', 'id']))
      savedProductRevisions.set(entry.get('path'), entry.getIn(['data', 'updatedAt']));
    else if (entry.get('path') && entry.getIn(['data', 'slug']))
      savedArticleRevisions.set(entry.get('path'), entry.getIn(['data', 'dateModified']));
  },
});

CMS.init({ config: cmsConfig });
