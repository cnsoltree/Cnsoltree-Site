import { matchesTaxonomyProduct, matchesTaxonomyArticle } from './taxonomy-model.mjs';
import { adminEntryHref } from '../admin/routes.mjs';
import { articleSummary } from './article-excerpt.mjs';

const active = (record) => record.published === true && !record.deletedAt;
const normalize = (value) =>
  String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
const chineseKeywords = {
  selection: '选型指南',
  overview: '工作原理',
  comparison: '规格对比',
  installation: '安装要求',
  troubleshooting: '故障排查',
  maintenance: '维护检查',
  certification: '标准资料',
  cost: '采购成本',
  procurement: '供应商',
  faq: '常见问题',
};
const angles = [
  {
    key: 'selection',
    pattern: /select|choos|siz|specification|选型|选择|规格/i,
    format: 'guide',
    en: (n) => `How to Select ${n}: Ratings and Application Requirements`,
    zh: (n) => `${n}如何选型：参数与应用需求核对指南`,
    suffix: 'selection guide',
  },
  {
    key: 'overview',
    pattern: /what is|how does|working|原理|是什么/i,
    format: 'guide',
    en: (n) => `What Is ${n}? Functions, Applications and Selection Questions`,
    zh: (n) => `${n}是什么：功能、应用与选型问题`,
    suffix: 'guide',
  },
  {
    key: 'comparison',
    pattern: /\bvs\b|versus|compar|对比|比较/i,
    format: 'comparison',
    en: (n) => `${n} Options Compared: Which Specifications Matter?`,
    zh: (n) => `${n}方案比较：哪些规格需要重点核对？`,
    suffix: 'specifications comparison',
  },
  {
    key: 'installation',
    pattern: /install|wiring|接线|安装/i,
    format: 'guide',
    en: (n) => `${n} Installation Planning: Documentation and Wiring Checks`,
    zh: (n) => `${n}安装前核对：技术资料与接线要求`,
    suffix: 'installation planning',
  },
  {
    key: 'troubleshooting',
    pattern: /troubleshoot|fault|failure|故障|排查/i,
    format: 'guide',
    en: (n) => `${n} Troubleshooting: Questions to Check Before Replacement`,
    zh: (n) => `${n}故障排查：更换前需要确认的问题`,
    suffix: 'troubleshooting',
  },
  {
    key: 'maintenance',
    pattern: /maintenan|inspect|维护|巡检/i,
    format: 'guide',
    en: (n) => `${n} Maintenance Planning: Inspection Records and Replacement Criteria`,
    zh: (n) => `${n}维护计划：检查记录与更换条件核对`,
    suffix: 'maintenance checklist',
  },
  {
    key: 'certification',
    pattern: /certif|standard|complian|认证|标准|合规/i,
    format: 'guide',
    en: (n) => `${n} Documentation: How to Verify Applicable Standards and Reports`,
    zh: (n) => `${n}资料核验：如何确认适用标准与检测报告`,
    suffix: 'standards documentation',
  },
  {
    key: 'cost',
    pattern: /price|cost|pricing|价格|成本/i,
    format: 'guide',
    en: (n) => `${n} Cost Factors: What Buyers Should Include in an RFQ`,
    zh: (n) => `${n}采购成本：询价时需要确认哪些条件`,
    suffix: 'cost factors',
  },
  {
    key: 'procurement',
    pattern: /suppl|manufactur|factory|\boem\b|采购|供应商|厂家|工厂/i,
    format: 'landing_page',
    en: (n) => `${n} Supplier: Product Options and RFQ Support`,
    zh: (n) => `${n}供应商：产品方案与采购询价`,
    suffix: 'supplier',
  },
  {
    key: 'faq',
    pattern: /\bfaq\b|questions|常见问题|问答/i,
    format: 'faq',
    en: (n) => `${n} FAQ: Technical and Purchasing Questions to Confirm`,
    zh: (n) => `${n}常见问题：技术与采购需要核实的事项`,
    suffix: 'FAQ',
  },
];

export function applicableKnowledge(entries, groupSlug, topicSlug) {
  return entries.filter(
    (entry) =>
      !entry.deletedAt &&
      entry.enabled === true &&
      entry.status === 'verified' &&
      (!entry.groupSlug ||
        (entry.groupSlug === groupSlug && (!entry.topicSlug || entry.topicSlug === topicSlug))),
  );
}

export function resolvePlanningScope(taxonomy, input) {
  const group = taxonomy.groups.find(
    (record) => record.slug === input.groupSlug && !record.deletedAt,
  );
  if (!group) throw new Error('请选择有效的一级分类。');
  const retiredCategories = new Set(
    taxonomy.categories.filter((category) => category.deletedAt).map(({ slug }) => slug),
  );
  const items = group.items.filter(
    (item) =>
      !item.deletedAt &&
      !retiredCategories.has(item.category) &&
      (!input.topicSlug || item.slug === input.topicSlug),
  );
  if (!items.length) throw new Error('该分类没有可用的二级分类，请先完善统一分类。');
  return { group, items };
}

function relatedArticle(article, item) {
  if (article.relatedCategorySlug !== item.category) return false;
  if (matchesTaxonomyArticle(article, item)) return true;
  // ponytail: conservative local coverage heuristic; actual intent must be reviewed against current search results.
  const explicitTypes = Array.isArray(article.relatedProductTypes)
    ? article.relatedProductTypes
    : [];
  return (
    !explicitTypes.length &&
    (!item.type ||
      normalize(article.title).includes(normalize(item.type)) ||
      !Array.isArray(article.tags) ||
      !article.tags.some((tag) => /^(MCB|MCCB|RCCB|DC)$/i.test(tag)))
  );
}

function reference(kind, record) {
  if (kind === 'product')
    return {
      kind,
      id: record.id,
      title: record.name,
      url: `/products/${encodeURIComponent(record.id)}`,
    };
  if (kind === 'article')
    return {
      kind,
      id: record.slug,
      title: record.title,
      url: adminEntryHref('articles', record.entryKey ?? record.slug),
    };
  return {
    kind,
    id: record.id,
    title: record.title,
    ...(record.sourceUrl ? { url: record.sourceUrl } : {}),
  };
}

/** Local candidate frameworks only. No search volume, competitiveness or researched intent is inferred. */
export function planTopics(
  input,
  { taxonomy, products = [], articles = [], knowledge = [], existingTopics = [] },
) {
  const { group, items } = resolvePlanningScope(taxonomy, input);
  const orderedAngles = [...angles].sort(
    (a, b) => Number(b.pattern.test(input.direction)) - Number(a.pattern.test(input.direction)),
  );
  const seen = new Set(
    existingTopics
      .filter((topic) => !topic.deletedAt)
      .map((topic) => topic.intentKey)
      .filter(Boolean),
  );
  const topics = [];
  const coveredArticles = new Set();
  for (const angle of orderedAngles) {
    for (const item of items) {
      const intentKey = `${item.category}/${item.type ?? 'all'}/${angle.key}`;
      if (seen.has(intentKey)) continue;
      seen.add(intentKey);
      const matchedProducts = products.filter(
        (product) => active(product) && matchesTaxonomyProduct(product, item),
      );
      const verified = applicableKnowledge(knowledge, group.slug, item.slug);
      const related = articles.filter((article) => relatedArticle(article, item));
      const existing =
        angle.key !== 'procurement'
          ? related.find((article) =>
              angle.pattern.test(
                `${article.title ?? ''} ${articleSummary(article)} ${article.metaKeywords ?? ''}`,
              ),
            )
          : undefined;
      if (existing && coveredArticles.has(existing.slug)) continue;
      if (existing) coveredArticles.add(existing.slug);
      const focus = input.direction.trim();
      const zh = input.language === 'zh';
      const title = existing ? existing.title : angle[zh ? 'zh' : 'en'](item.name);
      const missingInformation = [
        ...(!matchedProducts.length ? ['缺少已发布的匹配产品，请确认当前可供型号。'] : []),
        ...(!verified.length ? ['缺少对应范围内已核实并启用的内部资料。'] : []),
        '尚未进行当前搜索结果与外部资料调研。',
        ...(['installation', 'certification', 'maintenance'].includes(angle.key)
          ? ['需要工程人员确认适用标准、原厂资料与安全边界。']
          : []),
      ];
      topics.push({
        title: title.slice(0, 300),
        keyword: zh ? `${item.name} ${chineseKeywords[angle.key]}` : `${item.name} ${angle.suffix}`,
        intent:
          angle.key === 'procurement'
            ? 'transactional'
            : angle.key === 'cost' || angle.key === 'comparison'
              ? 'commercial'
              : 'informational',
        intentKey,
        format: existing ? 'update' : angle.format,
        newOrUpdate: existing ? 'update' : 'new',
        ...(existing ? { existingArticleSlug: existing.slug } : {}),
        groupSlug: group.slug,
        topicSlug: item.slug,
        priorityReason: existing
          ? `本地已有相近意图文章${existing.deletedAt ? '（在回收站，建议先恢复）' : existing.published === false ? '（草稿）' : ''}，优先核对并更新，避免重复创建。`
          : `${matchedProducts.length} 个已发布匹配产品、${verified.length} 条已核实资料可供核对。${angle.key === 'procurement' ? '供应商与采购意图建议使用商业落地页。' : '当前为分类与本地资料支持的候选框架，优先级仍需实际调研确认。'}${focus ? `按指定方向“${focus}”安排内容。` : ''}`,
        sources: [
          {
            kind: 'taxonomy',
            id: `${group.slug}/${item.slug}`,
            title: `${group.name} / ${item.name}`,
          },
          ...matchedProducts.slice(0, 5).map((product) => reference('product', product)),
          ...verified.slice(0, 5).map((entry) => reference('knowledge', entry)),
          ...(existing ? [reference('article', existing)] : []),
        ],
        missingInformation,
        status: 'pending_research',
        selected: false,
      });
      if (topics.length === input.count) break;
    }
    if (topics.length === input.count) break;
  }
  return {
    topics,
    notes: [
      '本批为本地资料生成的候选框架，全部待调研；没有搜索量、排名或竞争难度数据。',
      ...(topics.length < input.count
        ? [`去重已有候选和文章后，仅有 ${topics.length} 个不同意图框架，未为满足数量重复生成。`]
        : []),
    ],
  };
}

/** Persist a reviewable writing brief, never an automatically published article. */
export function buildTopicBrief(topic, input, { taxonomy, products = [], knowledge = [] }) {
  const { group, items } = resolvePlanningScope(taxonomy, {
    groupSlug: topic.groupSlug,
    topicSlug: topic.topicSlug,
  });
  const item = items[0];
  const verified = applicableKnowledge(knowledge, group.slug, item.slug);
  const matchedProducts = products.filter(
    (product) => active(product) && matchesTaxonomyProduct(product, item),
  );
  const evidenceSources = (topic.sources ?? []).filter(
    (source) => source.kind !== 'knowledge' || verified.some((entry) => entry.id === source.id),
  );
  const evidenceLines = evidenceSources.map(
    (source) =>
      `- [${source.kind}] ${source.title}${source.id ? ` (ID: ${source.id})` : ''}${source.url ? ` — ${source.url}` : ''}`,
  );
  const zh = input.language === 'zh';
  const missingInformation = [
    ...new Set([
      ...(topic.missingInformation ?? []),
      ...(!verified.length ? ['当前缺少已核实并启用的内部资料。'] : []),
      ...(!matchedProducts.length ? ['当前缺少已发布的匹配产品，需确认可供型号。'] : []),
    ]),
  ];
  const lines = zh
    ? [
        `选题：${topic.title}`,
        `主关键词：${topic.keyword}`,
        `内容形式：${topic.format}`,
        `分类：${group.name} / ${item.name}`,
        `目标读者：${input.audience || '待确认'}`,
        `目标：${input.goal || '待确认'}`,
        `指定方向：${input.direction || '无'}`,
        `处理方式：${topic.newOrUpdate === 'update' ? `核对现有文章 ${topic.existingArticleSlug}，先检查是否需要恢复。` : topic.format === 'landing_page' ? '建议建立商业落地页，由人工确认和制作。' : '人工撰写新文章，不自动发布。'}`,
        '已匹配产品（型号与参数须以当前技术资料为准）：',
        ...matchedProducts.slice(0, 8).map((product) => `- ${product.id}: ${product.name}`),
        '已核实内部资料摘录（仅作参考，不替代原始证明文件）：',
        ...verified.slice(0, 5).map((entry) => `- ${entry.title}: ${entry.content.slice(0, 1200)}`),
        '可追溯证据来源（保留链接和资料标识）：',
        ...evidenceLines,
        ...(topic.researchSummary
          ? [`外部调研摘要：${topic.researchSummary}`]
          : ['外部调研：尚未完成。']),
        '撰写要求：核实每项产品、性能、认证和价格主张；引用可追溯来源，补充缺失资料，不推断不存在的参数。',
        '缺少资料：',
        ...missingInformation.map((gap) => `- ${gap}`),
      ]
    : [
        `Topic: ${topic.title}`,
        `Primary keyword: ${topic.keyword}`,
        `Content format: ${topic.format}`,
        `Taxonomy: ${group.name} / ${item.name}`,
        `Audience: ${input.audience || 'To confirm'}`,
        `Goal: ${input.goal || 'To confirm'}`,
        `Requested focus: ${input.direction || 'None'}`,
        `Action: ${topic.newOrUpdate === 'update' ? `Review and update existing article ${topic.existingArticleSlug}; restore it first if needed.` : topic.format === 'landing_page' ? 'Prepare a commercial landing page for human review.' : 'Write a new article for human review; never publish automatically.'}`,
        'Matched products (verify current datasheets and availability):',
        ...matchedProducts.slice(0, 8).map((product) => `- ${product.id}: ${product.name}`),
        'Verified internal reference excerpts (check original supporting documents):',
        ...verified.slice(0, 5).map((entry) => `- ${entry.title}: ${entry.content.slice(0, 1200)}`),
        'Traceable evidence references (retain URLs and internal record IDs):',
        ...evidenceLines,
        ...(topic.researchSummary
          ? [`External research summary: ${topic.researchSummary}`]
          : ['External research: not completed.']),
        'Writing requirements: substantiate product, performance, certification and price claims; cite traceable sources and request missing information rather than inventing facts.',
        'Missing information:',
        ...missingInformation.map((gap) => `- ${gap}`),
      ];
  return {
    brief: lines.join('\n'),
    missingInformation,
    taxonomy: {
      groupSlug: group.slug,
      groupName: group.name,
      topicSlug: item.slug,
      topicName: item.name,
    },
  };
}
