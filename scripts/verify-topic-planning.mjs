import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createSeoAdminHandler, planningInput } from './seo-admin-api.mjs';
import { generateTopicCandidates } from '../src/lib/seo-topic-planning.mjs';
import { localHandler } from '../src/lib/admin-workspace.mjs';

const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'soltree-topic-plan-'));
try {
  for (const name of ['settings', 'products', 'articles'])
    await fs.mkdir(path.join(directory, 'src/content', name), { recursive: true });
  const taxonomy = JSON.parse(
    await fs.readFile(new URL('../src/content/settings/taxonomy.json', import.meta.url), 'utf8'),
  );
  await fs.writeFile(
    path.join(directory, 'src/content/settings/taxonomy.json'),
    JSON.stringify(taxonomy),
  );
  const group = taxonomy.groups.find(
    (g) =>
      !g.deletedAt &&
      g.items.some(
        (i) => !i.deletedAt && !taxonomy.categories.find((c) => c.slug === i.category)?.deletedAt,
      ),
  );
  const item = group.items.find(
    (i) => !i.deletedAt && !taxonomy.categories.find((c) => c.slug === i.category)?.deletedAt,
  );
  const handler = createSeoAdminHandler({ root: directory });
  const invoke = (method, input) => localHandler(handler, method, input);
  const initial = (await invoke('GET')).value;
  assert.equal(
    initial.capabilities.aiPlanningImport,
    true,
    'The save service must advertise AI candidate support before paid generation.',
  );
  const input = planningInput(
    {
      groupSlug: group.slug,
      topicSlug: item.slug,
      count: 2,
      language: 'en',
      audience: 'OEM buyers',
      direction: 'selection',
    },
    taxonomy,
  );
  const topics = ['Fixture buyer selection guide', 'Fixture procurement comparison'].map(
    (title) => ({
      title,
      keyword: 'fixture product selection',
      topicSlug: item.slug,
      intent: 'commercial',
      format: 'guide',
      priorityReason: 'Help buyers compare application needs.',
    }),
  );
  let calls = 0;
  const provider = {
    respond: async (body) => {
      calls++;
      assert.equal(body.text.format.strict, true);
      assert(!('tools' in body), 'Planning does not claim live research.');
      assert(!JSON.stringify(body).includes('knowledge'));
      return {
        status: 'completed',
        output: [
          { type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ topics }) }] },
        ],
      };
    },
  };
  const generated = await generateTopicCandidates(provider, input, initial);
  assert.equal(calls, 1);
  assert.equal(
    (await invoke('GET')).value.workspace.batches.length,
    0,
    'Generation alone does not mutate storage.',
  );
  const imported = await invoke('POST', {
    action: 'importAiCandidates',
    revision: initial.revision,
    input,
    topics: generated,
  });
  assert.equal(imported.status, 200, imported.value.error);
  let current = imported.value;
  const batch = current.workspace.batches.at(-1);
  assert.equal(batch.topics.length, 2);
  assert.equal(
    current.workspace.tasks.length,
    0,
    'Candidates must not become operations plans automatically.',
  );
  assert(
    batch.topics.every(
      (topic) =>
        topic.status === 'pending_research' &&
        !topic.sources.some((source) => source.kind === 'web'),
    ),
  );
  const stale = await invoke('POST', {
    action: 'buildTasks',
    revision: initial.revision,
    batchId: batch.id,
    ids: [batch.topics[0].id],
  });
  assert.equal(stale.status, 409);
  const added = await invoke('POST', {
    action: 'buildTasks',
    revision: current.revision,
    batchId: batch.id,
    ids: batch.topics.map((topic) => topic.id),
  });
  assert.equal(added.status, 200, added.value.error);
  current = added.value;
  assert.equal(current.workspace.tasks.length, 2);
  const duplicate = await invoke('POST', {
    action: 'buildTasks',
    revision: current.revision,
    batchId: batch.id,
    ids: batch.topics.map((topic) => topic.id),
  });
  assert.equal(duplicate.status, 409);
  const updated = await invoke('POST', {
    action: 'updateTask',
    revision: current.revision,
    id: current.workspace.tasks[0].id,
    patch: { status: 'in_progress' },
  });
  assert.equal(updated.status, 200, updated.value.error);
  current = (await invoke('GET')).value;
  assert.equal(current.workspace.tasks[0].status, 'in_progress');
  assert.equal(
    (await fs.readdir(path.join(directory, 'src/content/articles'))).length,
    0,
    'No article is created or published.',
  );
  await assert.rejects(generateTopicCandidates(provider, input, current), { status: 422 });
  assert.equal(
    (await invoke('GET')).value.revision,
    current.revision,
    'Rejected duplicates do not change stored history.',
  );
  const invalid = await invoke('POST', {
    action: 'importAiCandidates',
    revision: current.revision,
    input,
    topics: [{ ...topics[0], title: 'New fixture', topicSlug: 'outside-scope' }],
  });
  assert.equal(invalid.status, 422);
  const truncated = { respond: async () => ({ status: 'incomplete' }) };
  await assert.rejects(generateTopicCandidates(truncated, input, current), { status: 502 });
  const malformed = {
    respond: async () => ({
      status: 'completed',
      output: [{ type: 'message', content: [{ type: 'output_text', text: 'invalid JSON' }] }],
    }),
  };
  await assert.rejects(generateTopicCandidates(malformed, input, current), { status: 502 });
  const race = await Promise.all(
    ['Fixture unique A', 'Fixture unique B'].map((title) =>
      invoke('POST', {
        action: 'importAiCandidates',
        revision: current.revision,
        input,
        topics: [{ ...topics[0], title }],
      }),
    ),
  );
  assert.deepEqual(race.map((result) => result.status).sort(), [200, 409]);
  console.log(
    'PASS: mocked AI topic generation, validated taxonomy and JSON, persisted history, explicit bulk addition, duplicate/stale/concurrent rejection, plan status and no article/publication writes. No real AI calls.',
  );
} finally {
  const absolute = path.resolve(directory);
  assert(
    absolute.startsWith(path.resolve(os.tmpdir()) + path.sep) &&
      path.basename(absolute).startsWith('soltree-topic-plan-'),
  );
  await fs.rm(absolute, { recursive: true, force: true });
}
