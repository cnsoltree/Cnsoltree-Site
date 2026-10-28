const site = 'https://www.elesoltree.com';
const sameSite = new Set(['elesoltree.com', 'www.elesoltree.com']);
const plain = (value) => (typeof value === 'string' ? value.trim() : '');
const cleanTitle = (value) => plain(value).replace(/\s+/g, ' ').toLowerCase();

function publicPath(value) {
  const input = plain(value);
  if (!input || input.startsWith('#') || input.startsWith('//')) return null;
  try {
    const url = new URL(input, site);
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      !sameSite.has(url.hostname) ||
      url.port ||
      url.username ||
      url.password
    )
      return null;
    const path = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
    return /^\/(?:images|products|blog|categories)(?:\/|$)/.test(path) ? path : null;
  } catch {
    return null;
  }
}

function proseWithoutCode(markdown) {
  let fence;
  const lines = [];
  for (const line of (typeof markdown === 'string' ? markdown : '').split(/\r?\n/)) {
    const marker = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = undefined;
      continue;
    }
    if (!fence) lines.push(line);
  }
  return lines
    .join('\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/`+[^`\n]*`+/g, '');
}

function headingsIn(content) {
  const lines = content.split('\n');
  const headings = [];
  for (const [index, line] of lines.entries()) {
    const atx = /^ {0,3}(#{1,6})(?:\s+|$)/.exec(line);
    if (atx) headings.push(atx[1].length);
    else if (index > 0 && plain(lines[index - 1]) && /^ {0,3}(=+|-+)\s*$/.test(line))
      headings.push(line.trim()[0] === '=' ? 1 : 2);
  }
  return headings;
}

function articlePaths(content) {
  const paths = [];
  for (const match of content.matchAll(/!?\[[^\]\n]*\]\(\s*<?([^\s)>]+)>?(?:\s+[^)]*)?\)/g))
    paths.push(match[1]);
  for (const match of content.matchAll(/^ {0,3}\[[^\]]+\]:\s*<?([^\s>]+)>?/gm))
    paths.push(match[1]);
  for (const match of content.matchAll(/\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi))
    paths.push(match[1] ?? match[2]);
  return paths;
}

/**
 * Inspect local content only; this does not measure Google indexation, rankings or traffic.
 * Raw records may include all drafts and trash plus entryKey (the actual JSON filename stem).
 * Trash is skipped. Optional knownPaths is a Set of locally known public routes/assets;
 * absent paths produce review notices, never an unsupported claim that a URL is broken.
 * @param {{articles?: Record<string, any>[], products?: Record<string, any>[], knownPaths?: Set<string>}} input
 * @returns {{id:string,severity:'warning'|'notice',code:string,title:string,description:string,recordType:'article'|'product',recordId:string,href:string,editHref:string}[]}
 */
export function diagnoseContent({ articles = [], products = [], knownPaths } = {}) {
  const known = knownPaths ? new Set([...knownPaths].map(publicPath).filter(Boolean)) : null;
  const records = [
    ...articles.map((record) => ({ record, type: 'article' })),
    ...products.map((record) => ({ record, type: 'product' })),
  ].filter(({ record }) => record && !record.deletedAt);
  const findings = [];
  const titles = new Map();
  function add(item, severity, code, title, description) {
    const recordId =
      plain(item.record[item.type === 'article' ? 'slug' : 'id']) || plain(item.record.entryKey);
    const entryKey = plain(item.record.entryKey) || recordId;
    const collection = item.type === 'article' ? 'articles' : 'products';
    findings.push({
      id: `${item.type}:${recordId}:${code}`,
      severity,
      code,
      title,
      description,
      recordType: item.type,
      recordId,
      href: `/${item.type === 'article' ? 'blog' : 'products'}/${encodeURIComponent(recordId)}`,
      editHref: `/admin#/collections/${collection}/entries/${encodeURIComponent(entryKey)}`,
    });
  }
  for (const item of records) {
    const { record, type } = item;
    const title = plain(record.metaTitle) || plain(record[type === 'article' ? 'title' : 'name']);
    const description =
      plain(record.metaDescription) ||
      plain(record[type === 'article' ? 'excerpt' : 'shortDescription']);
    const severity = record.published === true ? 'warning' : 'notice';
    if (!title || !description) {
      add(
        item,
        severity,
        'missing-page-summary',
        '页面标题或简介尚未补全',
        '当前内容连默认标题或描述也不完整。草稿可继续整理；准备显示到前台时，请补全标题和简介，或填写独立的 SEO 标题、描述。',
      );
    } else if (!plain(record.metaTitle) || !plain(record.metaDescription)) {
      add(
        item,
        'notice',
        'metadata-fallback',
        '正在使用默认 SEO 标题或描述',
        '网站已有内容标题和简介作为有效兜底。可按页面的搜索意图定制 SEO 文案；留空独立字段不等于缺少页面元数据。',
      );
    }
    if (title) {
      const renderedTitle = title.includes('Soltree') ? title : `${title} | Soltree`;
      const key = cleanTitle(renderedTitle);
      if (!titles.has(key)) titles.set(key, []);
      titles.get(key).push(item);
    }
    let content = '';
    if (type === 'article') {
      content = proseWithoutCode(record.content);
      const headings = headingsIn(content);
      if (headings.includes(1) || /<h1(?:\s|>)/i.test(content))
        add(
          item,
          severity,
          'body-h1',
          '正文中另有一级标题',
          '文章模板已经将文章标题输出为 H1。建议把正文中的大标题调整为 H2/H3，避免同页重复的大标题结构。',
        );
      let previous = 1;
      const skipped = headings.some((depth) => {
        const gap = depth > previous + 1;
        previous = depth;
        return gap;
      });
      if (skipped)
        add(
          item,
          'notice',
          'heading-order',
          '正文标题层级可再整理',
          '检测到标题层级跳级，例如 H2 后直接使用 H4。建议按内容层次安排标题；这是结构建议，不代表搜索排名存在问题。',
        );
    }
    if (known) {
      const candidates = [
        record.image,
        ...(Array.isArray(record.images) ? record.images : []),
        ...(Array.isArray(record.descriptionImages) ? record.descriptionImages : []),
        ...(type === 'article' ? articlePaths(content) : []),
      ];
      const unresolved = [
        ...new Set(candidates.map(publicPath).filter((path) => path && !known.has(path))),
      ];
      if (unresolved.length) {
        const examples = unresolved
          .slice(0, 3)
          .map((path) => (path.length > 120 ? `${path.slice(0, 117)}…` : path))
          .join('、');
        add(
          item,
          'notice',
          'internal-path-review',
          '站内路径待核对',
          `以下路径不在本次已知页面/图片清单中：${examples}${unresolved.length > 3 ? `，另有 ${unresolved.length - 3} 处` : ''}。建议核对草稿、重定向或图片文件；这不代表已确认链接失效。锚点未参与断链判断。`,
        );
      }
    }
  }
  for (const group of titles.values()) {
    if (group.length < 2) continue;
    const publishedCount = group.filter(({ record }) => record.published === true).length;
    for (const item of group)
      add(
        item,
        item.record.published === true && publishedCount > 1 ? 'warning' : 'notice',
        'duplicate-title',
        '多个内容使用相同页面标题',
        `本地有 ${group.length} 个未删除的内容使用同一标题（其中 ${publishedCount} 个设置为前台显示）。建议区分各页的主题和用途；草稿也列出供编辑时参考，并非已确认搜索结果重复。`,
      );
  }
  return findings
    .sort((a, b) => Number(a.severity === 'notice') - Number(b.severity === 'notice'))
    .slice(0, 200);
}
