import { allProductGroups, allArticleGroups, categories } from '../lib/taxonomy';

function categoryOptions(groups: typeof allProductGroups) {
  const active = new Map(categories.map((category) => [category.slug, category]));
  const families = new Map<string, string[]>();
  for (const group of groups) {
    if (group.deletedAt) continue;
    for (const item of group.items) {
      if (item.deletedAt || !active.has(item.category)) continue;
      if (!families.has(item.category)) families.set(item.category, []);
      const names = families.get(item.category)!;
      if (!names.includes(group.name)) names.push(group.name);
    }
  }
  return [...new Set([...families.keys(), ...active.keys()])].map((slug) => ({
    label: [...(families.get(slug) ?? []), active.get(slug)!.name].join(' / '),
    value: slug,
  }));
}
const productCategoryOptions = categoryOptions(allProductGroups);
const articleCategoryOptions = categoryOptions(allArticleGroups);

const publication = {
  label: '前台显示（准备完成后再开启）',
  name: 'published',
  widget: 'boolean',
  default: false,
  hint: '关闭时作为草稿保存，不生成公开网址，也不会进入分类、站点地图或 RSS。本机保存不会自动更新线上网站。',
};
const category = (name: string, label: string, required = false) => ({
  name,
  label,
  widget: 'select',
  options: name === 'relatedCategorySlug' ? articleCategoryOptions : productCategoryOptions,
  required,
  hint: '一级分类由此产品分类自动归集。断路器请同时选择 MCB、MCCB、RCCB 或 DC 子类型。',
});
const types = (name: string) => ({
  name,
  label: '产品子类型（按实际内容选择）',
  widget: 'select',
  multiple: true,
  required: false,
  options: [
    ...new Set(
      allProductGroups.flatMap((group) =>
        group.items.flatMap((item) => (item.type ? [item.type] : [])),
      ),
    ),
  ],
  hint: '太阳能直流断路器或直流浪涌保护器请选择 DC。没有这些类型时留空。',
});
const image = {
  label: '封面图片',
  name: 'image',
  widget: 'image',
  required: false,
  choose_url: false,
  hint: '上传清晰的 JPG、PNG 或 WebP 图片；新上传的图片会在构建时优化。',
};
const seo = [
  {
    label: 'SEO 标题',
    name: 'metaTitle',
    widget: 'string',
    required: false,
    hint: '可留空，自动使用内容标题。建议自然表达产品与用途，约 50–60 个英文字符只是参考。',
  },
  {
    label: 'SEO 描述',
    name: 'metaDescription',
    widget: 'text',
    required: false,
    hint: '可留空，自动使用简介。概括页面价值与选型信息，约 140–160 个英文字符只是参考。',
  },
];
const list = (name: string, label: string, field?: object | null) => ({
  name,
  label,
  widget: 'list',
  required: false,
  collapsed: true,
  default: [],
  ...(field === null
    ? {}
    : { field: field ?? { name: 'value', label: '内容', widget: 'string', required: false } }),
});

export const categoryNames: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.slug, category.name]),
);

export const cmsConfig = {
  backend: { name: 'git-gateway' },
  local_backend: { url: 'http://127.0.0.1:8081/api/v1' },
  load_config_file: false,
  locale: 'zh_Hans',
  site_url: 'http://127.0.0.1:4323',
  display_url: 'http://127.0.0.1:4323',
  show_preview_links: false,
  logo_url: '/images/logo.png',
  media_folder: 'public/images/uploads',
  public_folder: '/images/uploads',
  slug: { encoding: 'ascii', clean_accents: true, sanitize_replacement: '-' },
  collections: [
    {
      name: 'products',
      label: '产品管理',
      description: '维护产品资料、图片与参数，让每个产品页都清楚、完整。',
      label_singular: '产品',
      folder: 'src/content/products',
      extension: 'json',
      format: 'json',
      create: true,
      delete: false,
      identifier_field: 'name',
      slug: '{{fields.id}}',
      summary: '{{name}} · {{id}}',
      sortable_fields: ['name', 'categorySlug', 'published'],
      view_filters: [
        { label: '已显示', field: 'published', pattern: true },
        { label: '草稿 / 已下架', field: 'published', pattern: false },
      ],
      fields: [
        publication,
        { label: '创建时间', name: 'createdAt', widget: 'hidden', required: false },
        { label: '更新时间', name: 'updatedAt', widget: 'hidden', required: false },
        { label: '回收站时间', name: 'deletedAt', widget: 'hidden', required: false },
        { label: '产品名称', name: 'name', widget: 'string' },
        {
          label: '产品网址 ID',
          name: 'id',
          widget: 'stable-route',
          pattern: ['^[A-Za-z0-9][A-Za-z0-9_-]*$', '仅使用英文字母、数字、短横线或下划线'],
          hint: '例如 MCB-AC-1P。网址为 /products/此ID；保存后的 ID 不能修改，避免已收录链接失效。',
        },
        { label: '旧版 slug（自动保留）', name: 'slug', widget: 'hidden', required: false },
        category('categorySlug', '产品分类'),
        types('productTypes'),
        {
          ...category('additionalCategorySlugs', '同时展示到其他产品分类', false),
          multiple: true,
        },
        { label: '分类名称（自动填写）', name: 'categoryName', widget: 'hidden', required: false },
        image,
        {
          ...list('images', '完整产品图集（第一张作为详情主图）', {
            label: '图片',
            name: 'image',
            widget: 'image',
            required: false,
            choose_url: false,
          }),
          max: 8,
        },
        {
          ...list('imageAlts', '产品图片说明（与图集顺序一致）'),
          hint: '用自然语言描述型号、外观或视角；不要堆叠关键词。缺少时使用产品名称。',
        },
        { label: '产品简介', name: 'shortDescription', widget: 'text', required: false },
        {
          label: '产品详情',
          name: 'description',
          widget: 'text',
          required: false,
          hint: '说明用途、适用环境及选型信息，保留段落换行。',
        },
        list('features', '产品特点'),
        {
          ...list('specs', '技术参数', null),
          summary: '{{fields.name}}：{{fields.value}}',
          fields: [
            { label: '参数名称', name: 'name', widget: 'string', required: false },
            { label: '参数值', name: 'value', widget: 'string', required: false },
          ],
        },
        list('descriptionImages', '详情图片 / 接线图', {
          label: '图片',
          name: 'image',
          widget: 'image',
          required: false,
          choose_url: false,
        }),
        {
          label: '产品角标',
          name: 'badge',
          widget: 'select',
          required: false,
          options: ['New', 'Hot', 'Featured'],
        },
        {
          label: '展示排序（数字越小越靠前）',
          name: 'sortOrder',
          widget: 'number',
          value_type: 'int',
          required: false,
        },
        ...seo,
        { label: '兼容保留的关键词字段', name: 'metaKeywords', widget: 'hidden', required: false },
      ],
    },
    {
      name: 'articles',
      label: '文章管理',
      description: '整理专业知识与选型指南，持续积累客户信任。',
      label_singular: '文章',
      folder: 'src/content/articles',
      extension: 'json',
      format: 'json',
      create: true,
      delete: false,
      slug: '{{fields.slug}}',
      identifier_field: 'title',
      editor: { preview: false },
      summary: '{{title}}',
      sortable_fields: ['date', 'title', 'published'],
      view_filters: [
        { label: '已显示', field: 'published', pattern: true },
        { label: '草稿 / 已下架', field: 'published', pattern: false },
      ],
      fields: [
        category('relatedCategorySlug', '文章产品分类'),
        { label: '文章标题', name: 'title', widget: 'string' },
        {
          label: '文章正文',
          name: 'content',
          widget: 'markdown',
          required: false,
          modes: ['rich_text', 'raw'],
          buttons: [
            'bold',
            'italic',
            'strikethrough',
            'code',
            'link',
            'heading-two',
            'heading-three',
            'heading-four',
            'quote',
            'bulleted-list',
            'numbered-list',
          ],
          sanitize_preview: true,
          hint: '大标题由文章标题自动生成，正文从二级标题开始。可插入图片、列表、链接和表格，也可切换 Markdown 编辑。',
        },
        image,
        {
          label: '文章网址',
          name: 'slug',
          widget: 'stable-route',
          pattern: [
            '^[a-z0-9]+(?:-[a-z0-9]+)*$',
            '使用小写英文、数字和短横线，例如 how-to-select-mcb',
          ],
          hint: '网址为 /blog/此名称。保存后的网址不能修改，避免已收录链接失效。',
        },
        {
          label: '文章简介',
          name: 'excerpt',
          widget: 'text',
          required: false,
          hint: '用于列表卡片；SEO 描述留空时也会使用此内容。',
        },
        ...seo,
        list('tags', '文章标签'),
        {
          label: '发布日期',
          name: 'date',
          widget: 'datetime',
          required: false,
          default: new Date().toISOString().slice(0, 10),
          format: 'YYYY-MM-DD',
          date_format: 'YYYY-MM-DD',
          time_format: false,
        },
        {
          label: '最后修改',
          name: 'dateModified',
          widget: 'readonly-time',
          required: false,
          hint: '保存时自动记录，不可手动修改。',
        },
        {
          label: '作者',
          name: 'author',
          widget: 'string',
          default: 'Soltree Technical Team',
          required: false,
        },
        types('relatedProductTypes'),
        {
          label: '展示排序（数字越小越靠前）',
          name: 'sortOrder',
          widget: 'number',
          value_type: 'int',
          required: false,
        },
        publication,
        { label: '回收站时间', name: 'deletedAt', widget: 'hidden', required: false },
        { label: '阅读时间（自动计算）', name: 'readingTime', widget: 'hidden', default: 1 },
        { label: '兼容保留的关键词字段', name: 'metaKeywords', widget: 'hidden', required: false },
      ],
    },
  ],
};

// Used in preview labels without fetching the public catalog or embedding content in admin JS.
export const familyName = (categorySlug: string) =>
  allProductGroups.find((group) => group.items.some((item) => item.category === categorySlug))
    ?.name ?? '';
