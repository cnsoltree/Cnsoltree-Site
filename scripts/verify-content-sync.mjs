import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { mergeFiles, runSync, prepareCloudBatch } from './content-sync.mjs';
import { rawJson } from '../src/lib/admin-workspace.mjs';

const article = (n) => `src/content/articles/article-${n}.json`;
const base = { [article(1)]: rawJson({ slug: 'article-1', title: 'Base', content: 'Body' }) };
const local = {
  [article(1)]: rawJson({ slug: 'article-1', title: 'Base', content: 'Linked body' }),
};
const remote = {
  [article(1)]: rawJson({ slug: 'article-1', title: 'New title', content: 'Body' }),
};
assert.deepEqual(JSON.parse(mergeFiles(base, local, remote).files[article(1)]), {
  slug: 'article-1',
  title: 'New title',
  content: 'Linked body',
});
assert.deepEqual(
  mergeFiles(base, local, {
    [article(1)]: rawJson({ slug: 'article-1', title: 'Base', content: 'Other body' }),
  }).conflicts,
  [`${article(1)}.content`],
);
assert(mergeFiles(base, {}, base).conflicts.length, 'Physical removal is never a silent delete.');

const sandbox = await fs.mkdtemp(path.join(os.tmpdir(), 'soltree-sync-test-'));
try {
  const root = path.join(sandbox, 'project');
  const taxonomy = 'src/content/settings/taxonomy.json';
  const fixtureTaxonomy = JSON.parse(
    await fs.readFile(new URL('../src/content/settings/taxonomy.json', import.meta.url), 'utf8'),
  );
  let current = {
    revision: 1,
    document: {
      version: 1,
      files: { [taxonomy]: rawJson(fixtureTaxonomy) },
      media: {},
      publication: null,
      sourceManifest: {},
    },
  };
  for (let i = 1; i <= 20; i++)
    current.document.files[article(i)] = rawJson({
      slug: `article-${i}`,
      title: `Article ${i}`,
      content: `Body ${i}`,
      published: i <= 10,
      date: '2026-01-01',
      author: 'Team',
      focusKeyword: `private target ${i}`,
    });
  const publicFiles = Object.fromEntries(
    Object.entries(current.document.files).map(([name, raw]) => {
      const record = JSON.parse(raw);
      delete record.focusKeyword;
      return [name, rawJson(record)];
    }),
  );
  const snapshot = () => ({ base: publicFiles, latest: publicFiles, manifest: {} });
  let saves = 0;
  let conflict = false;
  const store = {
    async load() {
      return structuredClone(current);
    },
    async save(revision, document) {
      if (conflict || revision !== current.revision)
        throw Object.assign(new Error('Concurrent save'), { status: 409 });
      saves++;
      current = { revision: revision + 1, document: structuredClone(document) };
      return structuredClone(current);
    },
  };
  const options = {
    root,
    store,
    snapshot,
    media: {
      read() {
        throw new Error('Unexpected media read');
      },
    },
    validateRecord(_collection, record) {
      assert(record.title && record.content);
    },
  };
  const preview = await runSync({ ...options, mode: 'pull' });
  assert.equal(preview.changed.length, 21);
  await assert.rejects(fs.access(preview.directory), { code: 'ENOENT' });
  const pulled = await runSync({ ...options, mode: 'pull', apply: true });
  assert.equal(saves, 0);
  assert.equal(
    path.dirname(pulled.directory),
    sandbox,
    'Private mirror is outside the public repository.',
  );
  const read = async (name) =>
    JSON.parse(await fs.readFile(path.join(pulled.directory, name), 'utf8'));
  const write = async (name, record) =>
    fs.writeFile(path.join(pulled.directory, name), rawJson(record));
  assert.equal((await read(article(20))).published, false, 'Unpublished drafts are pulled too.');
  for (let i = 1; i <= 20; i++) {
    const record = await read(article(i));
    record.content += ` [Related](/blog/article-${(i % 20) + 1})`;
    await write(article(i), record);
  }
  const concurrent = JSON.parse(current.document.files[article(1)]);
  concurrent.author = 'Cloud author';
  current.document.files[article(1)] = rawJson(concurrent);
  current.revision++;
  assert.equal((await runSync({ ...options, mode: 'push' })).changed.length, 20);
  assert.equal(saves, 0, 'Preview does not write cloud data.');
  await runSync({ ...options, mode: 'push', apply: true });
  assert.equal(saves, 1, 'Twenty articles commit in one durable CAS, without publishing.');
  assert.equal(current.document.publication, null);
  assert.equal(JSON.parse(current.document.files[article(1)]).author, 'Cloud author');
  assert.equal(JSON.parse(current.document.files[article(20)]).published, false);
  assert.equal((await read(article(1))).focusKeyword, 'private target 1');
  assert.equal(
    (await runSync({ ...options, mode: 'push' })).changed.length,
    0,
    'Push updates local baseline and server timestamps.',
  );

  const edited = await read(article(1));
  edited.content = 'Local conflict';
  await write(article(1), edited);
  const cloudEdited = JSON.parse(current.document.files[article(1)]);
  cloudEdited.content = 'Cloud conflict';
  current.document.files[article(1)] = rawJson(cloudEdited);
  await assert.rejects(
    runSync({ ...options, mode: 'push', apply: true }),
    /article-1.json.content/,
  );
  assert.equal(saves, 1);
  await write(article(1), cloudEdited);
  await runSync({ ...options, mode: 'pull', apply: true });
  const second = await read(article(2));
  second.metaTitle = 'Local SEO';
  await write(article(2), second);
  conflict = true;
  await assert.rejects(runSync({ ...options, mode: 'push', apply: true }), /Concurrent save/);
  assert.equal(saves, 1);
  conflict = false;
  await assert.rejects(
    runSync({
      ...options,
      mode: 'push',
      apply: true,
      validateRecord(_collection, record) {
        if (record.slug === 'article-20') throw new Error('Invalid final article');
      },
    }),
    /Invalid final article/,
  );
  assert.equal(saves, 1, 'Validation failure cannot partially write a batch.');
  let localRaceCalls = 0;
  await assert.rejects(
    runSync({
      ...options,
      mode: 'push',
      apply: true,
      async snapshot() {
        if (++localRaceCalls === 2)
          await write(article(2), { ...second, content: 'New local work during sync' });
        return snapshot();
      },
    }),
    /本地内容刚刚变更/,
  );
  assert.equal(saves, 1, 'Local edits during network calls cannot be overwritten.');
  await write(article(2), second);

  const unsafe = structuredClone(current.document.files);
  const record = JSON.parse(unsafe[article(2)]);
  record.published = !record.published;
  unsafe[article(2)] = rawJson(record);
  await assert.rejects(prepareCloudBatch(current, unsafe, options.validateRecord), /published/);
  let calls = 0;
  await assert.rejects(
    runSync({
      ...options,
      mode: 'push',
      apply: true,
      snapshot() {
        calls++;
        return { ...snapshot(), manifest: calls === 1 ? {} : { changed: 'a'.repeat(40) } };
      },
    }),
    /GitHub/,
  );
  assert.equal(saves, 1, 'Remote Git drift aborts before saving cloud state.');
  const tax = await read(taxonomy);
  tax.groups[0].name = 'Local taxonomy';
  await write(taxonomy, tax);
  await assert.rejects(runSync({ ...options, mode: 'pull', apply: true }), /只读/);
  console.log(
    'PASS: private draft mirror, previews, field conflicts, 20-article atomic sync, concurrent saves, validation rollback, private fields, publication preservation, Git drift and read-only taxonomy.',
  );
} finally {
  assert.equal(path.dirname(path.resolve(sandbox)), path.resolve(os.tmpdir()));
  await fs.rm(sandbox, { recursive: true, force: true });
}
