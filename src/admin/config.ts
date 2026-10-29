import {
  allProductGroups,
  allArticleGroups,
  categories,
  validateTaxonomy,
  getTaxonomyGroups,
} from '../lib/taxonomy';

function categoryOptions(groups: typeof allProductGroups, activeCategories = categories) {
  const active = new Map(activeCategories.map((category) => [category.slug, category]));
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

function categoryGroups(groups: typeof allArticleGroups, activeCategories = categories) {
  const active = new Map(activeCategories.map((item) => [item.slug, item]));
  const grouped = groups
    .filter((group) => !group.deletedAt)
    .map((group) => ({
      slug: group.slug,
      name: group.name,
      options: [
        ...new Set(group.items.filter((item) => !item.deletedAt).map((item) => item.category)),
      ]
        .filter((slug) => active.has(slug))
        .map((slug) => ({ label: active.get(slug)!.name, value: slug })),
    }));
  const assigned = new Set(grouped.flatMap((group) => group.options.map((item) => item.value)));
  const other = activeCategories.filter((item) => !assigned.has(item.slug));
  if (other.length)
    grouped.push({
      slug: '__ungrouped',
      name: '未归入一级分组',
      options: other.map((item) => ({ label: item.name, value: item.slug })),
    });
  return grouped;
}

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
  hint: '一级分组根据所选二级分类自动归集。',
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
    label: 'Meta Title',
    name: 'metaTitle',
    widget: 'string',
    required: false,
    hint: '建议 50–60 个英文字符，建议上限 70 字符；仅作写作参考，并非 Google 硬性规定。可留空，自动使用内容标题。',
  },
  {
    label: 'Meta Description',
    name: 'metaDescription',
    widget: 'text',
    required: false,
    hint: '建议 120–160 个英文字符，建议上限 180 字符；仅作写作参考，并非 Google 硬性规定。文章列表优先使用此描述，留空时提取正文首段；产品留空时使用产品简介。',
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
let previewFamilies = allProductGroups;

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
          label: '网址后缀（URL Slug）',
          name: 'id',
          widget: 'stable-route',
          pattern: ['^[A-Za-z0-9][A-Za-z0-9_-]*$', '仅使用英文字母、数字、短横线或下划线'],
          hint: '建议 20–60 字符，建议上限 100 字符；仅作写作参考，并非 Google 硬性规定。例如 MCB-AC-1P，网址为 /products/此ID。保存后不能修改，避免已收录链接失效。',
        },
        ...seo,
        { label: '旧版 slug（自动保留）', name: 'slug', widget: 'hidden', required: false },
        {
          ...category('categorySlug', '产品分类'),
          widget: 'article-category',
          groups: categoryGroups(allProductGroups),
          hint: '先选择一级分组，再选择二级分类；可清空后保存草稿，发布前需选好分类。二级分类可被多个一级分组共用。',
        },
        { name: 'productTypes', widget: 'hidden', required: false },
        { label: '分类名称（自动填写）', name: 'categoryName', widget: 'hidden', required: false },
        { name: 'image', widget: 'hidden', required: false },
        { name: 'images', label: '产品图片', widget: 'product-gallery', required: false },
        { name: 'imageAlts', widget: 'hidden', required: false },
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
        { label: '兼容保留的关键词字段', name: 'metaKeywords', widget: 'hidden', required: false },
        {
          name: 'additionalCategorySlugs',
          label: '同时展示到其他产品分类',
          widget: 'additional-categories',
          required: false,
          groups: categoryGroups(allProductGroups),
          hint: '补充分类：选择一级分组和二级分类后自动添加到下方，可继续选择或移除；不影响上方主分类。',
        },
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
        {
          ...category('relatedCategorySlug', '文章分类'),
          widget: 'article-category',
          groups: categoryGroups(allArticleGroups),
          hint: '先选择一级分组，再选择二级分类；可清空后保存草稿。网站发布前需选好分类。二级分类可被多个一级分组共用。',
        },
        { label: '文章标题', name: 'title', widget: 'string' },
        image,
        {
          label: '文章正文',
          name: 'content',
          widget: 'rich-article',
          required: false,
          hint: '支持富文本与 Markdown 编辑、导入 .md 文件、图片及表格；富文本可全屏或查看 HTML 源码。正文标题从二级开始，导入文件只替换正文。',
        },
        {
          label: 'Focus Keyword（核心关键词）',
          name: 'focusKeyword',
          widget: 'string',
          required: false,
          pattern: ['^.{0,200}$', '请填写不超过 200 个字符的核心关键词'],
          hint: '记录这篇文章主要围绕的搜索词，例如 pv combiner box sizing。仅作后台写作目标，不输出为网页关键词标签，也不会因填写而自动提升排名。',
        },
        {
          label: '文章网址（URL Slug）',
          name: 'slug',
          widget: 'stable-route',
          pattern: [
            '^[a-z0-9]+(?:-[a-z0-9]+)*$',
            '使用小写英文、数字和短横线，例如 how-to-select-mcb',
          ],
          hint: '建议 20–60 字符，建议上限 100 字符；仅作写作参考，并非 Google 硬性规定。网址为 /blog/此名称，保存后不能修改，避免已收录链接失效。',
        },
        ...seo,
        { name: 'tags', label: '标签', widget: 'article-tags', required: false, default: [] },
        {
          label: '时间',
          name: 'date',
          widget: 'article-time',
          required: true,
          hint: '太平洋时间（America/Los_Angeles）。',
        },
        {
          label: '最后修改',
          name: 'dateModified',
          widget: 'readonly-time',
          required: false,
          hint: '系统记录最后修改时间，不可编辑。太平洋时间。',
        },
        {
          label: '作者',
          name: 'author',
          widget: 'string',
          default: 'Soltree Engineering Team',
          required: false,
        },
        { name: 'relatedProductTypes', widget: 'hidden', required: false },
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
  previewFamilies.find((group) => group.items.some((item) => item.category === categorySlug))
    ?.name ?? '';

/** Fetch online taxonomy before CMS.init so newly added cloud categories are selectable immediately. */
export function configureOnlineCms(input: unknown, origin: string) {
  const taxonomy = validateTaxonomy(input);
  const activeCategories = taxonomy.categories.filter((category) => !category.deletedAt);
  const productFamilies = getTaxonomyGroups(taxonomy, 'products', false);
  const articleFamilies = getTaxonomyGroups(taxonomy, 'articles', false);
  previewFamilies = productFamilies.filter((group) => !group.deletedAt);
  for (const key of Object.keys(categoryNames)) delete categoryNames[key];
  Object.assign(
    categoryNames,
    Object.fromEntries(activeCategories.map((category) => [category.slug, category.name])),
  );
  Object.assign(cmsConfig.backend, {
    name: 'soltree-online',
    proxy_url: '/api/admin/proxy',
    branch: 'main',
  });
  const runtimeConfig: Record<string, unknown> = cmsConfig;
  delete runtimeConfig.local_backend;
  cmsConfig.site_url = cmsConfig.display_url = new URL(origin).origin;
  publication.label = '前台显示（发布到网站后生效）';
  publication.hint =
    '关闭时作为草稿保存，不进入公开页面。保存到云端后，点击顶部“发布到网站”更新正式网站。';
  for (const collection of cmsConfig.collections) {
    for (const filter of collection.view_filters)
      filter.label = filter.pattern ? '已选入网站发布' : '草稿 / 未选入发布';
    for (const definition of collection.fields) {
      const field = definition as Record<string, unknown>;
      if (
        ['categorySlug', 'additionalCategorySlugs', 'relatedCategorySlug'].includes(
          String(field.name),
        )
      )
        field.options = categoryOptions(
          collection.name === 'articles' ? articleFamilies : productFamilies,
          activeCategories,
        );
      if (
        ['categorySlug', 'additionalCategorySlugs', 'relatedCategorySlug'].includes(
          String(field.name),
        )
      )
        field.groups = categoryGroups(
          collection.name === 'articles' ? articleFamilies : productFamilies,
          activeCategories,
        );
    }
  }
}
