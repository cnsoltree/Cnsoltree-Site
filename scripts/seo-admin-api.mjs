import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
import { body, json, localOrigin, problem, revisionOf } from './product-admin-api.mjs';
import { validateTaxonomy } from '../src/lib/taxonomy-model.mjs';
import {
  applicableKnowledge,
  planTopics,
  buildTopicBrief,
  resolvePlanningScope,
} from '../src/lib/seo-planner.mjs';
import { diagnoseContent } from '../src/lib/seo-diagnostics.mjs';
import { articleSummary } from '../src/lib/article-excerpt.mjs';

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const formats = new Set(['guide', 'comparison', 'faq', 'landing_page', 'update']);
const intents = new Set(['informational', 'commercial', 'transactional']);

function object(value, fields) {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    Object.keys(value).some((key) => !fields.includes(key))
  )
    throw problem(400, '提交格式不正确，请刷新页面后重试。');
  return value;
}
function text(value, maximum, required = false) {
  if (
    typeof value !== 'string' ||
    value.length > maximum ||
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value) ||
    (required && !value.trim())
  )
    throw problem(422, '请填写有效文字，并检查字段长度。');
  return value.trim();
}
function id(value) {
  if (typeof value !== 'string' || !uuid.test(value))
    throw problem(400, '记录标识无效，请刷新页面。');
  return value;
}
function sourceUrl(value = '', publicOnly = false) {
  if (typeof value !== 'string')
    throw problem(422, '资料来源链接必须是有效的 http 或 https 网页地址。');
  if (!value) return '';
  text(value, 2048, true);
  try {
    const url = new URL(value);
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      !url.hostname
    )
      throw new Error();
    if (
      publicOnly &&
      (isIP(url.hostname.replace(/^\[|\]$/g, '')) ||
        !url.hostname.includes('.') ||
        /(?:^|\.)(local|localhost|internal|test|invalid)$/i.test(url.hostname))
    )
      throw new Error();
    return url.href;
  } catch {
    throw problem(422, '资料来源链接必须是有效的 http 或 https 网页地址。');
  }
}
function selectedTopics(workspace, input) {
  const batch = workspace.batches.find((record) => record.id === id(input.batchId));
  if (!batch) throw problem(404, '选题批次不存在。');
  if (
    !Array.isArray(input.ids) ||
    !input.ids.length ||
    input.ids.length > 30 ||
    new Set(input.ids).size !== input.ids.length
  )
    throw problem(400, '请选择 1–30 个不同选题。');
  const topics = input.ids.map((value) => {
    const topic = batch.topics.find((record) => record.id === id(value) && !record.deletedAt);
    if (!topic) throw problem(404, '选题不存在或已删除，请刷新列表。');
    return topic;
  });
  return { batch, topics };
}
function planningInput(value, taxonomy) {
  object(value, ['groupSlug', 'topicSlug', 'count', 'audience', 'goal', 'direction', 'language']);
  if (value.topicSlug !== undefined && typeof value.topicSlug !== 'string')
    throw problem(422, '二级分类标识无效。');
  if (
    !Number.isSafeInteger(value.count) ||
    value.count < 1 ||
    value.count > 30 ||
    !['en', 'zh'].includes(value.language)
  )
    throw problem(422, '请填写 1–30 的选题数量，并选择中文或英文。');
  const input = {
    groupSlug: text(value.groupSlug, 100, true),
    ...(value.topicSlug ? { topicSlug: text(value.topicSlug, 100, true) } : {}),
    count: value.count,
    audience: text(value.audience ?? '', 300),
    goal: text(value.goal ?? '', 500),
    direction: text(value.direction ?? '', 200),
    language: value.language,
  };
  const group = taxonomy.groups.find(
    (record) => record.slug === input.groupSlug && !record.deletedAt,
  );
  if (
    !group ||
    (input.topicSlug &&
      !group.items.some((item) => item.slug === input.topicSlug && !item.deletedAt))
  )
    throw problem(422, '请选择有效的一级和二级分类。');
  return input;
}

/** Local development only. Research is an explicit, separately configured external action. */
export function createSeoAdminHandler({ root, researchTopics, getCapabilities }) {
  const rootPath = path.resolve(root);
  const source = path.resolve(rootPath, 'src/content/settings/seo-workspace.json');
  let mutationQueue = Promise.resolve();
  let bootstrapQueue = Promise.resolve();

  async function safePath(filename, directory = false) {
    const [realRoot, resolved] = await Promise.all([fs.realpath(rootPath), fs.realpath(filename)]);
    const relative = path.relative(realRoot, resolved);
    const stat = await fs.stat(resolved);
    if (
      (!relative && !directory) ||
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      !(directory ? stat.isDirectory() : stat.isFile())
    )
      throw problem(422, '资料位置不正确，请联系维护人员检查。');
    return resolved;
  }
  async function readJson(filename) {
    try {
      return JSON.parse(await fs.readFile(await safePath(filename), 'utf8'));
    } catch (error) {
      if (error.status) throw error;
      throw problem(422, '本地资料格式不正确，请联系维护人员检查。');
    }
  }
  async function ensureDirectory(directory) {
    let ancestor = directory;
    for (;;) {
      try {
        await fs.lstat(ancestor);
        break;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        ancestor = path.dirname(ancestor);
      }
    }
    await safePath(ancestor, true);
    await fs.mkdir(directory, { recursive: true });
    await safePath(directory, true);
  }
  async function snapshot() {
    try {
      let raw;
      try {
        raw = await fs.readFile(await safePath(source), 'utf8');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        const pending = bootstrapQueue.then(async () => {
          const parent = await safePath(path.dirname(source), true);
          const initial = `${JSON.stringify({ version: 1, knowledge: [], batches: [], tasks: [] }, null, 2)}\n`;
          try {
            await fs.writeFile(path.join(parent, path.basename(source)), initial, { flag: 'wx' });
          } catch (writeError) {
            if (writeError.code !== 'EEXIST') throw writeError;
          }
        });
        bootstrapQueue = pending.catch(() => {});
        await pending;
        raw = await fs.readFile(await safePath(source), 'utf8');
      }
      const workspace = JSON.parse(raw);
      object(workspace, ['version', 'knowledge', 'batches', 'tasks']);
      if (
        workspace.version !== 1 ||
        !['knowledge', 'batches', 'tasks'].every((key) => Array.isArray(workspace[key]))
      )
        throw new Error();
      const identifiers = new Set();
      for (const row of [...workspace.knowledge, ...workspace.batches, ...workspace.tasks]) {
        id(row.id);
        if (identifiers.has(row.id)) throw new Error();
        identifiers.add(row.id);
      }
      if (
        !workspace.batches.every(
          (batch) =>
            Array.isArray(batch.topics) && batch.topics.every((topic) => uuid.test(topic.id)),
        )
      )
        throw new Error();
      return { workspace, raw, revision: revisionOf(raw) };
    } catch (error) {
      if (error.status === 422) throw error;
      throw problem(422, 'SEO 工作区资料格式不正确，请联系维护人员检查。');
    }
  }
  async function records(collection) {
    const folder = await safePath(path.join(rootPath, 'src/content', collection), true);
    const files = await fs.readdir(folder, { withFileTypes: true });
    return Promise.all(
      files
        .filter((entry) => entry.isFile() && /^[A-Za-z0-9][A-Za-z0-9_-]*\.json$/.test(entry.name))
        .map(async (entry) => {
          const record = await readJson(path.join(folder, entry.name));
          if (!record || typeof record !== 'object' || Array.isArray(record))
            throw problem(422, '产品或文章资料格式不正确。');
          return { ...record, entryKey: entry.name.slice(0, -5) };
        }),
    );
  }
  async function context() {
    const [taxonomy, products, articles] = await Promise.all([
      readJson(path.join(rootPath, 'src/content/settings/taxonomy.json')).then(validateTaxonomy),
      records('products'),
      records('articles'),
    ]);
    const inventory = {
      products: products.map(
        ({
          id,
          name,
          categorySlug,
          additionalCategorySlugs,
          productTypes,
          shortDescription,
          published,
          deletedAt,
          entryKey,
        }) => ({
          id,
          name,
          categorySlug,
          additionalCategorySlugs,
          productTypes,
          shortDescription,
          published,
          deletedAt,
          entryKey,
        }),
      ),
      articles: articles.map(
        ({
          slug,
          title,
          metaDescription,
          content,
          relatedCategorySlug,
          relatedProductTypes,
          tags,
          published,
          deletedAt,
          date,
          entryKey,
        }) => ({
          slug,
          title,
          excerpt: articleSummary({ metaDescription, content }),
          relatedCategorySlug,
          relatedProductTypes,
          tags,
          published,
          deletedAt,
          date,
          entryKey,
        }),
      ),
    };
    const knownPaths = new Set([
      '/',
      '/products',
      '/blog',
      '/about',
      '/contact',
      '/resources',
      '/privacy',
      '/terms',
      '/solutions/aerosol-fire-extinguisher',
    ]);
    for (const category of taxonomy.categories) knownPaths.add(`/categories/${category.slug}`);
    for (const group of taxonomy.groups) {
      knownPaths.add(`/blog/category/${group.slug}`);
      knownPaths.add(`/resources/category/${group.slug}`);
      for (const item of group.items) {
        knownPaths.add(`/blog/category/${group.slug}/${item.slug}`);
        knownPaths.add(`/resources/category/${group.slug}/${item.slug}`);
      }
    }
    for (const record of products.filter((row) => row.published === true && !row.deletedAt))
      knownPaths.add(`/products/${record.id}`);
    for (const record of articles.filter((row) => row.published === true && !row.deletedAt))
      knownPaths.add(`/blog/${record.slug}`);
    const images = path.join(rootPath, 'public/images');
    try {
      await safePath(images, true);
      const files = await fs.readdir(images, { withFileTypes: true, recursive: true });
      for (const entry of files.filter((entry) => entry.isFile())) {
        const filename = path.join(entry.parentPath ?? entry.path, entry.name);
        await safePath(filename);
        knownPaths.add(`/images/${path.relative(images, filename).split(path.sep).join('/')}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    return {
      taxonomy,
      products,
      articles,
      inventory,
      findings: diagnoseContent({ articles, products, knownPaths }),
    };
  }
  async function capabilities() {
    const configured = getCapabilities
      ? await getCapabilities()
      : { researchConfigured: typeof researchTopics === 'function' };
    return {
      researchConfigured:
        configured?.researchConfigured === true && typeof researchTopics === 'function',
      ...(typeof configured?.researchProvider === 'string'
        ? { researchProvider: text(configured.researchProvider, 120) }
        : {}),
    };
  }
  async function response(current, ctx) {
    return {
      workspace: current.workspace,
      revision: current.revision,
      taxonomy: ctx.taxonomy,
      inventory: ctx.inventory,
      findings: ctx.findings,
      capabilities: await capabilities(),
    };
  }
  function knowledgeScope(entry, taxonomy) {
    if (
      ['groupSlug', 'topicSlug'].some(
        (key) => entry[key] !== undefined && typeof entry[key] !== 'string',
      )
    )
      throw problem(422, '知识资料分类标识无效。');
    const groupSlug = entry.groupSlug ? text(entry.groupSlug, 100, true) : undefined;
    const topicSlug = entry.topicSlug ? text(entry.topicSlug, 100, true) : undefined;
    if (topicSlug && !groupSlug) throw problem(422, '二级分类必须同时选择所属一级分类。');
    const group =
      groupSlug && taxonomy.groups.find((record) => record.slug === groupSlug && !record.deletedAt);
    if (groupSlug && !group) throw problem(422, '知识资料所属分类不存在或已删除。');
    if (
      topicSlug &&
      !group.items.some(
        (item) =>
          item.slug === topicSlug &&
          !item.deletedAt &&
          !taxonomy.categories.find((category) => category.slug === item.category)?.deletedAt,
      )
    )
      throw problem(422, '知识资料所属二级分类不存在或已删除。');
    return { ...(groupSlug ? { groupSlug } : {}), ...(topicSlug ? { topicSlug } : {}) };
  }
  async function applyAction(workspace, input, ctx, now) {
    if (input.action === 'saveKnowledge') {
      const entry = object(input.entry, [
        'id',
        'title',
        'groupSlug',
        'topicSlug',
        'content',
        'sourceUrl',
        'notes',
        'status',
        'enabled',
      ]);
      if (!['draft', 'verified'].includes(entry.status) || typeof entry.enabled !== 'boolean')
        throw problem(422, '请选择资料状态和启用状态。');
      const before =
        entry.id !== undefined
          ? workspace.knowledge.find((record) => record.id === id(entry.id))
          : undefined;
      if (entry.id !== undefined && !before) throw problem(404, '知识资料不存在。');
      if (before?.deletedAt) throw problem(409, '请先恢复该知识资料。');
      const next = {
        id: before?.id ?? randomUUID(),
        title: text(entry.title, 200, true),
        ...knowledgeScope(entry, ctx.taxonomy),
        content: text(entry.content ?? '', 60_000, entry.status === 'verified'),
        sourceUrl: sourceUrl(entry.sourceUrl),
        notes: text(entry.notes ?? '', 10_000),
        status: entry.status,
        enabled: entry.enabled,
        createdAt: before?.createdAt ?? now,
        updatedAt: now,
      };
      if (before) workspace.knowledge[workspace.knowledge.indexOf(before)] = next;
      else workspace.knowledge.push(next);
    } else if (['deleteKnowledge', 'restoreKnowledge'].includes(input.action)) {
      const entry = workspace.knowledge.find((record) => record.id === id(input.id));
      if (!entry) throw problem(404, '知识资料不存在。');
      if (input.action === 'deleteKnowledge') {
        if (entry.deletedAt) throw problem(409, '资料已在回收站中。');
        entry.deletedAt = now;
      } else {
        if (!entry.deletedAt) throw problem(409, '资料不在回收站中。');
        delete entry.deletedAt;
      }
      entry.enabled = false;
      entry.updatedAt = now;
    } else if (input.action === 'generateCandidates') {
      const selection = planningInput(input.input, ctx.taxonomy);
      let result;
      try {
        result = planTopics(selection, {
          ...ctx,
          knowledge: workspace.knowledge,
          existingTopics: workspace.batches.flatMap((batch) => batch.topics),
        });
      } catch {
        throw problem(422, '所选分类没有可用内容，请检查统一分类设置。');
      }
      workspace.batches.push({
        id: randomUUID(),
        input: selection,
        createdAt: now,
        updatedAt: now,
        notes: result.notes,
        topics: result.topics.map((topic) => ({
          ...topic,
          id: randomUUID(),
          createdAt: now,
          updatedAt: now,
        })),
      });
    } else if (['updateCandidate', 'deleteCandidate'].includes(input.action)) {
      const {
        batch,
        topics: [topic],
      } = selectedTopics(workspace, { batchId: input.batchId, ids: [input.id] });
      if (input.action === 'deleteCandidate') {
        topic.deletedAt = now;
        topic.selected = false;
      } else {
        const patch = object(input.patch, ['title', 'keyword', 'selected', 'format', 'intent']);
        if (!Object.keys(patch).length) throw problem(400, '没有可保存的修改。');
        if (patch.title !== undefined) topic.title = text(patch.title, 300, true);
        if (patch.keyword !== undefined) topic.keyword = text(patch.keyword, 200, true);
        if (patch.selected !== undefined) {
          if (typeof patch.selected !== 'boolean') throw problem(422, '请选择正确的选中状态。');
          topic.selected = patch.selected;
        }
        if (patch.format !== undefined) {
          if (!formats.has(patch.format)) throw problem(422, '内容形式无效。');
          topic.format = patch.format;
        }
        if (patch.intent !== undefined) {
          if (!intents.has(patch.intent)) throw problem(422, '搜索意图无效。');
          topic.intent = patch.intent;
        }
        if (
          ['title', 'keyword', 'format', 'intent'].some((key) => patch[key] !== undefined) &&
          (topic.researchSummary || topic.sources.some((source) => source.kind === 'web'))
        ) {
          topic.status = workspace.tasks.some((task) => task.topicId === topic.id)
            ? 'task_created'
            : 'pending_research';
          topic.sources = topic.sources.filter((source) => source.kind !== 'web');
          delete topic.researchSummary;
          delete topic.researchedAt;
          if (!topic.missingInformation.includes('尚未进行当前搜索结果与外部资料调研。'))
            topic.missingInformation.push('尚未进行当前搜索结果与外部资料调研。');
        }
      }
      topic.updatedAt = now;
      batch.updatedAt = now;
    } else if (input.action === 'buildTasks') {
      const { batch, topics } = selectedTopics(workspace, input);
      const available = topics.filter(
        (topic) =>
          !workspace.tasks.some((task) => task.batchId === batch.id && task.topicId === topic.id),
      );
      if (!available.length) throw problem(409, '所选选题已创建任务，未重复创建。');
      for (const topic of available) {
        const verified = applicableKnowledge(workspace.knowledge, topic.groupSlug, topic.topicSlug);
        const sources = topic.sources.filter(
          (source) =>
            source.kind !== 'knowledge' || verified.some((entry) => entry.id === source.id),
        );
        let writing;
        try {
          writing = buildTopicBrief(topic, batch.input, { ...ctx, knowledge: workspace.knowledge });
        } catch {
          throw problem(409, '选题所属分类已删除，请先恢复分类或重新规划。');
        }
        workspace.tasks.push({
          id: randomUUID(),
          title: topic.title,
          status: 'todo',
          batchId: batch.id,
          topicId: topic.id,
          brief: writing.brief,
          topic: structuredClone({ ...topic, sources }),
          taxonomy: writing.taxonomy,
          sources,
          missingInformation: writing.missingInformation,
          language: batch.input.language,
          createdAt: now,
          updatedAt: now,
          notes: '',
        });
        topic.status = 'task_created';
        topic.selected = false;
        topic.updatedAt = now;
      }
      batch.updatedAt = now;
    } else if (input.action === 'updateTask') {
      const task = workspace.tasks.find((record) => record.id === id(input.id));
      if (!task) throw problem(404, '写作任务不存在。');
      const patch = object(input.patch, ['status', 'notes']);
      if (!Object.keys(patch).length) throw problem(400, '没有可保存的修改。');
      if (patch.status !== undefined) {
        if (!['todo', 'in_progress', 'done'].includes(patch.status))
          throw problem(422, '任务状态无效。');
        task.status = patch.status;
      }
      if (patch.notes !== undefined) task.notes = text(patch.notes, 10_000);
      task.updatedAt = now;
    } else throw problem(400, '操作类型无效。');
  }
  async function persist(current, workspace, action) {
    const sourcePath = await safePath(source);
    const now = new Date().toISOString();
    const backup = path.join(
      rootPath,
      '.content-backups',
      `${now.replace(/[:.]/g, '-')}-seo-${action}-${randomUUID().slice(0, 8)}`,
      'src/content/settings/seo-workspace.json',
    );
    // A backup directory may not redirect writes outside the project.
    await ensureDirectory(path.dirname(backup));
    await fs.writeFile(backup, current.raw, { flag: 'wx' });
    if (revisionOf(await fs.readFile(await safePath(source), 'utf8')) !== current.revision)
      throw problem(409, 'SEO 工作区刚刚被修改，请刷新后重试。');
    const raw = `${JSON.stringify(workspace, null, 2)}\n`;
    const temporary = `${sourcePath}.tmp-${randomUUID()}`;
    try {
      await fs.writeFile(temporary, raw, { flag: 'wx' });
      await fs.rename(temporary, sourcePath);
    } finally {
      await fs.unlink(temporary).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
    return { workspace, raw, revision: revisionOf(raw) };
  }
  async function currentRevision(input) {
    const current = await snapshot();
    if (current.revision !== input.revision)
      throw problem(409, 'SEO 工作区刚刚被修改，请刷新后重试。');
    return current;
  }
  async function prepareResearch(input) {
    const current = await currentRevision(input);
    if (!(await capabilities()).researchConfigured)
      throw problem(409, '尚未配置外部调研服务，请先配置后再调研；当前候选仍为待调研。');
    const { batch, topics } = selectedTopics(current.workspace, input);
    const ctx = await context();
    try {
      for (const topic of topics)
        resolvePlanningScope(ctx.taxonomy, {
          groupSlug: topic.groupSlug,
          topicSlug: topic.topicSlug,
        });
    } catch {
      throw problem(409, '选题所属分类已删除，请先恢复分类，再进行调研。');
    }
    const knowledge = current.workspace.knowledge.filter((entry) =>
      topics.some((topic) => applicableKnowledge([entry], topic.groupSlug, topic.topicSlug).length),
    );
    let results;
    try {
      results = await researchTopics(
        { batchId: batch.id, ids: topics.map((topic) => topic.id) },
        {
          topics: structuredClone(topics),
          input: batch.input,
          taxonomy: ctx.taxonomy,
          inventory: ctx.inventory,
          knowledge: structuredClone(knowledge),
        },
      );
    } catch {
      throw problem(502, '外部调研暂未完成，请稍后重试。现有选题未被修改。');
    }
    try {
      if (
        !Array.isArray(results) ||
        !results.length ||
        results.length > topics.length ||
        new Set(results.map((result) => result.id)).size !== results.length
      )
        throw new Error();
      return results.map((result) => {
        if (
          !topics.some((topic) => topic.id === result.id) ||
          !Array.isArray(result.sources) ||
          !result.sources.length ||
          result.sources.length > 12
        )
          throw new Error();
        const sources = result.sources.map((source) => ({
          kind: 'web',
          title: text(source.title, 300, true),
          url: sourceUrl(source.url, true),
        }));
        if (sources.some((source) => !source.url)) throw new Error();
        const missingInformation =
          result.missingInformation === undefined ? undefined : result.missingInformation;
        if (
          missingInformation !== undefined &&
          (!Array.isArray(missingInformation) || missingInformation.length > 30)
        )
          throw new Error();
        return {
          id: result.id,
          sources,
          researchSummary: text(result.researchSummary, 12_000, true),
          ...(missingInformation
            ? { missingInformation: missingInformation.map((gap) => text(gap, 500, true)) }
            : {}),
        };
      });
    } catch {
      throw problem(422, '调研结果缺少有效的可追溯网页来源，未保存为已调研。');
    }
  }
  async function mutate(input, researched) {
    const current = await currentRevision(input);
    const ctx = await context();
    const workspace = structuredClone(current.workspace);
    const now = new Date().toISOString();
    if (input.action === 'researchCandidates') {
      const { batch, topics } = selectedTopics(workspace, input);
      try {
        for (const topic of topics)
          resolvePlanningScope(ctx.taxonomy, {
            groupSlug: topic.groupSlug,
            topicSlug: topic.topicSlug,
          });
      } catch {
        throw problem(409, '调研期间所属分类发生变化，请恢复分类或重新规划后再调研。');
      }
      for (const topic of topics) {
        const result = researched.find((record) => record.id === topic.id);
        if (!result) continue;
        topic.sources = [
          ...topic.sources.filter((source) => source.kind !== 'web'),
          ...result.sources,
        ];
        topic.researchSummary = result.researchSummary;
        topic.missingInformation =
          result.missingInformation ??
          topic.missingInformation.filter((gap) => gap !== '尚未进行当前搜索结果与外部资料调研。');
        topic.status = 'researched';
        topic.researchedAt = now;
        topic.updatedAt = now;
      }
      if (researched.length < topics.length)
        batch.notes.push(
          `本次仅有 ${researched.length}/${topics.length} 个选题取得可追溯来源，其余保持原状态，待补充调研。`,
        );
      batch.updatedAt = now;
    } else await applyAction(workspace, input, ctx, now);
    return response(await persist(current, workspace, input.action), ctx);
  }
  return async (req, res) => {
    try {
      const origin = localOrigin(req);
      if (!origin || (req.method !== 'GET' && req.headers.origin !== origin))
        throw problem(403, '仅允许从本机后台执行此操作。');
      if (!['', '/'].includes((req.url ?? '').split('?')[0])) throw problem(404, '接口不存在。');
      if (req.method === 'GET') {
        const [current, ctx] = await Promise.all([snapshot(), context()]);
        return json(res, 200, await response(current, ctx));
      }
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'GET, POST');
        throw problem(405, '不支持此请求方式。');
      }
      if (!req.headers['content-type']?.toLowerCase().startsWith('application/json'))
        throw problem(415, '请使用 JSON 提交操作。');
      const input = object(await body(req, 262_144), [
        'revision',
        'action',
        'entry',
        'id',
        'input',
        'batchId',
        'ids',
        'patch',
      ]);
      if (
        typeof input.revision !== 'string' ||
        !/^[a-f0-9]{64}$/.test(input.revision) ||
        ![
          'saveKnowledge',
          'deleteKnowledge',
          'restoreKnowledge',
          'generateCandidates',
          'updateCandidate',
          'deleteCandidate',
          'researchCandidates',
          'buildTasks',
          'updateTask',
        ].includes(input.action)
      )
        throw problem(400, '操作参数无效，请刷新后重试。');
      // External requests run outside the write queue; the revision is checked again before committing.
      const researched =
        input.action === 'researchCandidates' ? await prepareResearch(input) : undefined;
      const pending = mutationQueue.then(() => mutate(input, researched));
      mutationQueue = pending.catch(() => {});
      return json(res, 200, await pending);
    } catch (error) {
      json(res, Number.isInteger(error.status) ? error.status : 500, {
        error: Number.isInteger(error.status) ? error.message : 'SEO 操作未完成，请稍后重试。',
      });
    }
  };
}
