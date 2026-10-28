import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createSeoAdminHandler } from './seo-admin-api.mjs';
import { planTopics, buildTopicBrief } from '../src/lib/seo-planner.mjs';

const placement = { visible: true, order: 0 };
const taxonomy = {
  version: 1,
  categories: [
    {
      slug: 'circuit-breaker',
      name: 'Circuit Breaker',
      shortDescription: 'Breakers.',
      description: 'Breaker reference.',
      image: '/images/fixture.png',
    },
  ],
  groups: [
    {
      slug: 'circuit-protection',
      name: 'Circuit Protection',
      description: 'Protection family.',
      icon: 'M3 3h18v18H3Z',
      products: placement,
      articles: placement,
      items: [
        {
          slug: 'mcb',
          name: 'MCB',
          category: 'circuit-breaker',
          type: 'MCB',
          products: placement,
          articles: placement,
        },
      ],
    },
    {
      slug: 'other-group',
      name: 'Other Group',
      description: 'Other family.',
      icon: 'M3 3h18v18H3Z',
      products: placement,
      articles: placement,
      items: [
        {
          slug: 'mccb',
          name: 'MCCB',
          category: 'circuit-breaker',
          type: 'MCCB',
          products: placement,
          articles: placement,
        },
      ],
    },
  ],
};
const products = [
  {
    id: 'MCB-ONE',
    name: 'MCB Fixture',
    categorySlug: 'circuit-breaker',
    productTypes: ['MCB'],
    published: true,
    shortDescription: 'Actual fixture product.',
    image: '/images/fixture.png',
  },
];
const articles = [
  {
    slug: 'mcb-selection',
    title: 'How to Select MCB',
    excerpt: 'Existing selection intent.',
    content: '# Duplicate body H1\n\n[Known](/products/MCB-ONE)\n[Unknown](/blog/not-existing)',
    relatedCategorySlug: 'circuit-breaker',
    relatedProductTypes: ['MCB'],
    tags: ['MCB'],
    image: '/images/fixture.png',
    published: false,
  },
  {
    slug: 'mcb-overview',
    title: 'What Is MCB?',
    excerpt: 'Existing overview intent.',
    content: 'Old overview.',
    relatedCategorySlug: 'circuit-breaker',
    relatedProductTypes: ['MCB'],
    published: false,
    deletedAt: '2026-10-27T00:00:00.000Z',
  },
];
const selection = {
  groupSlug: 'circuit-protection',
  topicSlug: 'mcb',
  count: 30,
  audience: 'Electrical distributors',
  goal: 'Product selection',
  direction: 'installation planning',
  language: 'en',
};
const pure = planTopics(selection, { taxonomy, products, articles });
assert(pure.topics.length < 30 && pure.topics.length > 0);
assert.equal(new Set(pure.topics.map(({ intentKey }) => intentKey)).size, pure.topics.length);
assert(pure.topics[0].title.includes('Installation'));
assert(
  pure.topics[0].intentKey.endsWith('/installation') &&
    pure.topics[0].priorityReason.includes(selection.direction),
  'Requested direction must change the actual candidate framework',
);
assert(
  !pure.topics[0].title.includes('Focus:'),
  'Free-form directions must not pollute the candidate title',
);
assert.equal(
  pure.topics.find(({ existingArticleSlug }) => existingArticleSlug === 'mcb-selection').title,
  articles[0].title,
);
assert(
  pure.topics.some(({ existingArticleSlug }) => existingArticleSlug === 'mcb-selection'),
  'Draft coverage must become an update suggestion',
);
assert(
  pure.topics.some(({ existingArticleSlug }) => existingArticleSlug === 'mcb-overview'),
  'Trash coverage must not create duplicate new articles',
);
assert(
  pure.topics.some(({ format, intent }) => format === 'landing_page' && intent === 'transactional'),
);
assert(
  pure.topics.every(
    ({ status, sources }) =>
      status === 'pending_research' && sources.every(({ kind }) => kind !== 'web'),
  ),
);
assert(pure.notes.some((note) => note.includes('未为满足数量重复生成')));
assert(!JSON.stringify(pure).includes('searchVolume'));
const chinese = planTopics(
  { ...selection, language: 'zh', direction: '安装前资料核对', count: 1 },
  { taxonomy, products, articles },
);
assert(/[\u4e00-\u9fff]/.test(chinese.topics[0].title));
assert(chinese.topics[0].title.includes('安装前核对'));
const excludedId = randomUUID();
const excludedEvidence = buildTopicBrief(
  {
    ...pure.topics[0],
    sources: [
      ...pure.topics[0].sources,
      {
        kind: 'knowledge',
        id: excludedId,
        title: 'EXCLUDED_REFERENCE',
        url: 'https://example.com/excluded',
      },
    ],
  },
  selection,
  {
    taxonomy,
    products,
    knowledge: [
      {
        id: excludedId,
        title: 'EXCLUDED_REFERENCE',
        content: 'EXCLUDED_CONTENT',
        enabled: false,
        status: 'verified',
      },
    ],
  },
);
assert(!excludedEvidence.brief.includes('EXCLUDED_REFERENCE'));
assert(!excludedEvidence.brief.includes('example.com/excluded'));

const tempParent = await fs.realpath(os.tmpdir());
const fixture = await fs.mkdtemp(path.join(tempParent, 'soltree-seo-api-'));
const root = path.join(fixture, 'project');
const settings = path.join(root, 'src/content/settings');
const source = path.join(settings, 'seo-workspace.json');
const emptyRaw = `${JSON.stringify({ version: 1, knowledge: [], batches: [], tasks: [] }, null, 2)}\n`;
await fs.mkdir(settings, { recursive: true });
await fs.writeFile(path.join(settings, 'taxonomy.json'), JSON.stringify(taxonomy));
await fs.mkdir(path.join(root, 'public/images'), { recursive: true });
await fs.writeFile(path.join(root, 'public/images/fixture.png'), 'Known image fixture');
const originalContent = [];
for (const [collection, records] of [
  ['products', products],
  ['articles', articles],
]) {
  const folder = path.join(root, 'src/content', collection);
  await fs.mkdir(folder, { recursive: true });
  for (const record of records) {
    const filename = path.join(folder, `${record.id ?? record.slug}.json`);
    const raw = JSON.stringify(record);
    await fs.writeFile(filename, raw);
    originalContent.push({ filename, raw });
  }
}
let configured = false;
let providerCalls = 0;
let mode = 'subset';
let researchContext;
let started;
let release;
const handler = createSeoAdminHandler({
  root,
  getCapabilities: async () => ({
    researchConfigured: configured,
    researchProvider: 'Fixture research',
    apiKey: 'NEVER_RETURN_SECRET',
  }),
  researchTopics: async (input, context) => {
    providerCalls++;
    researchContext = context;
    if (mode === 'slow') {
      started();
      await new Promise((resolve) => {
        release = resolve;
      });
    }
    if (mode === 'error') throw new Error('NEVER_RETURN_SECRET');
    const result = {
      id: input.ids[0],
      researchSummary: 'Actual injected fixture evidence, no invented search metrics.',
      missingInformation: ['Verify current datasheet.'],
      sources: [
        { title: 'Primary fixture source', url: 'https://manufacturer.example.com/reference' },
      ],
    };
    if (mode === 'invalid') result.sources = [];
    if (mode === 'unsafe') result.sources[0].url = 'javascript:alert(1)';
    if (mode === 'private') result.sources[0].url = 'http://127.0.0.1/private';
    if (mode === 'wrong-id') result.id = randomUUID();
    return [result];
  },
});
const server = http.createServer((req, res) => {
  req.url = req.url.replace(/^\/__cms\/seo/, '') || '/';
  void handler(req, res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const site = `http://127.0.0.1:${server.address().port}`;
const endpoint = `${site}/__cms/seo`;
let successfulWrites = 0;
async function read() {
  const response = await fetch(endpoint);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  return response.json();
}
async function send(current, payload, headers = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Origin: site, 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ revision: current.revision, ...payload }),
  });
  const data = await response.json();
  if (response.status === 200) successfulWrites++;
  assert(!JSON.stringify(data).includes('NEVER_RETURN_SECRET'));
  return { status: response.status, data };
}
async function accepted(current, payload) {
  const result = await send(current, payload);
  assert.equal(result.status, 200, result.data.error);
  return result.data;
}
const entry = (title, overrides = {}) => ({
  title,
  content: 'Traceable unit facts from the current datasheet.',
  status: 'verified',
  enabled: true,
  sourceUrl: 'https://manufacturer.example.com/document',
  notes: '',
  ...overrides,
});
try {
  const [firstRead, concurrentRead] = await Promise.all([read(), read()]);
  let current = firstRead;
  assert.equal(
    concurrentRead.revision,
    current.revision,
    'Concurrent first reads must share one safely bootstrapped workspace',
  );
  assert.equal(
    await fs.readFile(source, 'utf8'),
    emptyRaw,
    'A missing private workspace must initialize to empty data',
  );
  assert.deepEqual(current.workspace, { version: 1, knowledge: [], batches: [], tasks: [] });
  assert.equal(current.capabilities.researchConfigured, false);
  assert.equal(current.inventory.articles.length, 2);
  assert.equal(
    current.inventory.articles.find(({ slug }) => slug === 'mcb-overview').entryKey,
    'mcb-overview',
  );
  assert(current.inventory.articles.some(({ tags }) => tags?.includes('MCB')));
  assert(current.findings.some(({ code }) => code === 'body-h1'));
  assert(current.findings.some(({ code }) => code === 'metadata-fallback'));
  assert(current.findings.some(({ description }) => description.includes('/blog/not-existing')));
  assert(
    !current.findings.some(({ description }) => description.includes('/images/fixture.png')),
    'Known image files must not produce noisy unresolved-path notices',
  );
  assert.equal(
    (
      await send(
        current,
        { action: 'generateCandidates', input: selection },
        { Origin: 'https://foreign.example' },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fetch(endpoint, {
        method: 'POST',
        headers: { Origin: site, 'Content-Type': 'application/json' },
        body: JSON.stringify({ padding: 'x'.repeat(262_144) }),
      })
    ).status,
    413,
  );
  assert.equal(
    (
      await send(current, {
        action: 'saveKnowledge',
        entry: entry('Bad URL', { sourceUrl: 'javascript:alert(1)' }),
      })
    ).status,
    422,
  );
  assert.equal(
    (
      await send(current, {
        action: 'saveKnowledge',
        entry: entry('Wrong URL type', { sourceUrl: false }),
      })
    ).status,
    422,
  );
  assert.equal(
    (
      await send(current, {
        action: 'saveKnowledge',
        entry: entry('Wrong scope type', { groupSlug: 0 }),
      })
    ).status,
    422,
  );
  assert.equal(
    (
      await send(current, {
        action: 'saveKnowledge',
        entry: entry('Bad scope', { topicSlug: 'mcb' }),
      })
    ).status,
    422,
  );
  assert.equal(
    (await send(current, { action: 'generateCandidates', input: { ...selection, count: 31 } }))
      .status,
    422,
  );
  const initial = current;
  current = await accepted(current, {
    action: 'saveKnowledge',
    entry: entry('Verified datasheet'),
  });
  assert.equal(
    (await read()).revision,
    current.revision,
    'Reading an existing workspace must never reinitialize or overwrite private data',
  );
  const verified = current.workspace.knowledge.at(-1);
  assert.match(verified.id, /^[a-f0-9-]{36}$/);
  assert(Number.isFinite(Date.parse(verified.createdAt)));
  assert.equal((await send(initial, { action: 'deleteKnowledge', id: verified.id })).status, 409);
  current = await accepted(current, {
    action: 'saveKnowledge',
    entry: entry('Draft only', { content: 'DRAFT_SECRET', status: 'draft' }),
  });
  current = await accepted(current, {
    action: 'saveKnowledge',
    entry: entry('Disabled only', { content: 'DISABLED_SECRET', enabled: false }),
  });
  current = await accepted(current, {
    action: 'saveKnowledge',
    entry: entry('Other family', {
      content: 'OTHER_GROUP_SECRET',
      groupSlug: 'other-group',
      topicSlug: 'mccb',
    }),
  });
  current = await accepted(current, { action: 'generateCandidates', input: selection });
  const batchId = current.workspace.batches.at(-1).id;
  let batch = current.workspace.batches.at(-1);
  assert(batch.topics.length > 1 && batch.topics.length < 30);
  assert(
    batch.topics.every(({ sources }) =>
      sources.filter(({ kind }) => kind === 'knowledge').every(({ id }) => id === verified.id),
    ),
  );
  const ids = batch.topics.slice(0, 2).map(({ id }) => id);
  assert.equal((await send(current, { action: 'researchCandidates', batchId, ids })).status, 409);
  assert.equal(providerCalls, 0, 'Unconfigured research must never call an external provider');
  configured = true;
  for (mode of ['invalid', 'unsafe', 'private', 'wrong-id']) {
    const result = await send(current, { action: 'researchCandidates', batchId, ids });
    assert.equal(result.status, 422, result.data.error);
    assert.equal(
      (await read()).revision,
      current.revision,
      'Invalid research must not change persisted state',
    );
  }
  mode = 'error';
  assert.equal((await send(current, { action: 'researchCandidates', batchId, ids })).status, 502);
  mode = 'subset';
  current = await accepted(current, { action: 'researchCandidates', batchId, ids });
  batch = current.workspace.batches.find(({ id }) => id === batchId);
  assert.equal(batch.topics.find(({ id }) => id === ids[0]).status, 'researched');
  assert.equal(batch.topics.find(({ id }) => id === ids[1]).status, 'pending_research');
  assert(batch.notes.some((note) => note.includes('1/2')));
  assert.equal(researchContext.knowledge.length, 1);
  assert(!JSON.stringify(researchContext.knowledge).includes('DRAFT_SECRET'));
  assert(!JSON.stringify(researchContext.knowledge).includes('DISABLED_SECRET'));
  assert(!JSON.stringify(researchContext.knowledge).includes('OTHER_GROUP_SECRET'));
  assert(
    batch.topics
      .find(({ id }) => id === ids[0])
      .sources.some(
        ({ kind, url }) => kind === 'web' && url === 'https://manufacturer.example.com/reference',
      ),
  );
  current = await accepted(current, { action: 'buildTasks', batchId, ids });
  assert.equal(current.workspace.tasks.length, 2);
  assert(current.workspace.tasks[0].brief.includes('https://manufacturer.example.com/reference'));
  assert(current.workspace.tasks[0].brief.includes(verified.id));
  assert(current.workspace.tasks[0].brief.includes('/products/MCB-ONE'));
  assert(
    current.workspace.tasks.every(
      ({ status, brief, taxonomy, language }) =>
        status === 'todo' &&
        brief.includes('Traceable unit facts') &&
        taxonomy.topicSlug === 'mcb' &&
        language === 'en',
    ),
  );
  assert.equal((await send(current, { action: 'buildTasks', batchId, ids })).status, 409);
  const task = current.workspace.tasks[0];
  const oldTaskTitle = task.topic.title;
  current = await accepted(current, {
    action: 'updateCandidate',
    batchId,
    id: ids[0],
    patch: { title: 'Manually revised topic', keyword: 'revised MCB intent' },
  });
  assert.equal(
    current.workspace.tasks[0].topic.title,
    oldTaskTitle,
    'Writing tasks retain the exact approved topic snapshot',
  );
  assert(
    !current.workspace.batches
      .find(({ id }) => id === batchId)
      .topics.find(({ id }) => id === ids[0]).researchSummary,
  );
  assert(
    !current.workspace.batches
      .find(({ id }) => id === batchId)
      .topics.find(({ id }) => id === ids[0])
      .sources.some(({ kind }) => kind === 'web'),
    'Editing a task-created candidate must invalidate its prior research without changing the task snapshot',
  );
  current = await accepted(current, {
    action: 'updateTask',
    id: task.id,
    patch: { status: 'in_progress', notes: 'Checking current product facts.' },
  });
  current = await accepted(current, {
    action: 'updateTask',
    id: task.id,
    patch: { status: 'done' },
  });
  assert.equal(current.workspace.tasks[0].status, 'done');
  current = await accepted(current, { action: 'deleteCandidate', batchId, id: ids[0] });
  assert(
    current.workspace.batches
      .find(({ id }) => id === batchId)
      .topics.find(({ id }) => id === ids[0]).deletedAt,
  );
  current = await accepted(current, { action: 'deleteKnowledge', id: verified.id });
  assert.equal(current.workspace.knowledge.find(({ id }) => id === verified.id).enabled, false);
  current = await accepted(current, { action: 'restoreKnowledge', id: verified.id });
  assert(!current.workspace.knowledge.find(({ id }) => id === verified.id).deletedAt);
  assert.equal(
    current.workspace.knowledge.find(({ id }) => id === verified.id).createdAt,
    verified.createdAt,
  );
  assert.equal(
    current.workspace.knowledge.find(({ id }) => id === verified.id).enabled,
    false,
    'Restored knowledge must be explicitly enabled again',
  );
  current = await accepted(current, { action: 'generateCandidates', input: selection });
  assert(
    current.workspace.batches.at(-1).topics.length <= 1,
    'Same-intent existing candidates are not generated again',
  );
  const remaining = current.workspace.batches
    .find(({ id }) => id === batchId)
    .topics.find((topic) => !topic.deletedAt && topic.status === 'pending_research');
  assert(remaining);
  mode = 'slow';
  let signalStarted;
  const researchStarted = new Promise((resolve) => {
    signalStarted = resolve;
  });
  started = signalStarted;
  const oldRevision = current;
  const pendingResearch = send(current, {
    action: 'researchCandidates',
    batchId,
    ids: [remaining.id],
  });
  await researchStarted;
  current = await Promise.race([
    accepted(current, {
      action: 'saveKnowledge',
      entry: entry('Write while researching', { status: 'draft', enabled: false }),
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('External research blocked unrelated local writes')), 2000),
    ),
  ]);
  release();
  assert.equal(
    (await pendingResearch).status,
    409,
    'A stale external response must never overwrite newer local changes',
  );
  assert.notEqual(current.revision, oldRevision.revision);
  mode = 'subset';
  const retiredTaxonomy = structuredClone(taxonomy);
  retiredTaxonomy.groups[0].items[0].deletedAt = new Date().toISOString();
  await fs.writeFile(path.join(settings, 'taxonomy.json'), JSON.stringify(retiredTaxonomy));
  const calls = providerCalls;
  assert.equal(
    (await send(current, { action: 'researchCandidates', batchId, ids: [remaining.id] })).status,
    409,
  );
  assert.equal(
    providerCalls,
    calls,
    'Retired scope must be rejected before transmitting knowledge',
  );
  await fs.writeFile(path.join(settings, 'taxonomy.json'), JSON.stringify(taxonomy));
  mode = 'slow';
  const secondStarted = new Promise((resolve) => {
    started = resolve;
  });
  const taxonomyRace = send(current, {
    action: 'researchCandidates',
    batchId,
    ids: [remaining.id],
  });
  await secondStarted;
  await fs.writeFile(path.join(settings, 'taxonomy.json'), JSON.stringify(retiredTaxonomy));
  release();
  assert.equal(
    (await taxonomyRace).status,
    409,
    'A taxonomy retirement during external research must be checked again before commit',
  );
  assert.equal((await read()).revision, current.revision);
  await fs.writeFile(path.join(settings, 'taxonomy.json'), JSON.stringify(taxonomy));
  mode = 'subset';
  const parallel = await Promise.all([
    send(current, { action: 'updateTask', id: task.id, patch: { notes: 'First edit' } }),
    send(current, { action: 'updateTask', id: task.id, patch: { notes: 'Second edit' } }),
  ]);
  assert.deepEqual(parallel.map(({ status }) => status).sort(), [200, 409]);
  current = await read();
  const backups = await fs.readdir(path.join(root, '.content-backups'));
  assert.equal(backups.length, successfulWrites);
  assert(
    await Promise.all(
      backups.map((folder) =>
        fs.readFile(
          path.join(root, '.content-backups', folder, 'src/content/settings/seo-workspace.json'),
          'utf8',
        ),
      ),
    ).then((raws) => raws.includes(emptyRaw)),
  );
  const outside = path.join(fixture, 'outside');
  await fs.mkdir(outside);
  const backupFolder = path.join(root, '.content-backups');
  const savedBackups = path.join(root, '.saved-backups');
  await fs.rename(backupFolder, savedBackups);
  await fs.symlink(outside, backupFolder, process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(
    (
      await send(current, {
        action: 'updateTask',
        id: task.id,
        patch: { notes: 'Must not escape' },
      })
    ).status,
    422,
  );
  assert.deepEqual(
    await fs.readdir(outside),
    [],
    'Escaping backup junction must be rejected before creating any outside directories',
  );
  await fs.unlink(backupFolder);
  await fs.rename(savedBackups, backupFolder);
  assert.equal((await read()).revision, current.revision);
  for (const { filename, raw } of originalContent)
    assert.equal(
      await fs.readFile(filename, 'utf8'),
      raw,
      'SEO operations must never modify actual products/articles',
    );
  console.log(
    'PASS: SEO workspace CRUD, scoped verified knowledge, grounded bilingual intent planning, draft/trash coverage, honest research/provider validation, nonblocking concurrency, task snapshots, backups and root containment.',
  );
} finally {
  if (release) release();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  const resolved = await fs.realpath(fixture);
  assert.equal(path.dirname(resolved).toLowerCase(), tempParent.toLowerCase());
  assert(path.basename(resolved).startsWith('soltree-seo-api-'));
  await fs.rm(resolved, { recursive: true, force: true });
}
