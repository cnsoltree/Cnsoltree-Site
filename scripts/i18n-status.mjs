// Translation status per language: missing/stale product and article translations, structure
// mismatches, taxonomy gaps and static UI strings without a translation. Strings passed to t()
// through variables are reported by the build log instead ("[i18n] … missing").
// Usage: node scripts/i18n-status.mjs [lang]   (--stamp marks current translations as up to date)
import fs from 'node:fs';
import path from 'node:path';
import { articleFields, sourceHash } from '../src/i18n/source-hash.mjs';

const root = path.resolve(import.meta.dirname, '..');
const i18nDir = path.join(root, 'src/i18n');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const args = process.argv.slice(2);
const stamp = args.includes('--stamp');
const langs = args.filter((arg) => !arg.startsWith('--'));
const targets = langs.length
  ? langs
  : fs.readdirSync(i18nDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

const published = (folder) =>
  fs
    .readdirSync(path.join(root, 'src/content', folder))
    .map((name) => readJson(path.join(root, 'src/content', folder, name)))
    .filter((record) => record.published && !record.deletedAt);
const products = published('products');
const articles = published('articles');
const taxonomy = readJson(path.join(root, 'src/content/settings/taxonomy.json'));

// '...' / "..." source literal → its string value (only \' \" \\ escapes occur in these strings)
const stringLiteral = (literal) => literal.slice(1, -1).replace(/\\(['"\\])/g, '$1');

function staticKeys() {
  const keys = new Set();
  const call = /\bt\(\s*\w+\s*,\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.(astro|ts)$/.test(entry.name))
        for (const match of fs.readFileSync(file, 'utf8').matchAll(call))
          keys.add(stringLiteral(match[1]));
    }
  };
  walk(path.join(root, 'src'));
  return keys;
}

// Markdown skeleton a translation must keep: headings per level, image and link targets
function skeleton(content = '') {
  const lines = content.split('\n');
  return JSON.stringify([
    lines.filter((line) => /^##\s/.test(line.trim())).length,
    lines.filter((line) => /^###\s/.test(line.trim())).length,
    [...content.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]),
    [...content.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]),
  ]);
}

/** Checks one collection; returns [missing, stale, mismatched] id lists. */
function check(dir, records, key, fields, matches) {
  const result = [[], [], []];
  for (const record of records) {
    const file = path.join(dir, `${record[key]}.json`);
    if (!fs.existsSync(file)) {
      result[0].push(record[key]);
      continue;
    }
    const translation = readJson(file);
    if (!matches(translation, record)) result[2].push(record[key]);
    const hash = sourceHash(record, fields);
    if (translation.sourceHash === hash) continue;
    if (stamp) {
      translation.sourceHash = hash;
      fs.writeFileSync(file, JSON.stringify(translation, null, 2) + '\n');
    } else result[1].push(record[key]);
  }
  return result;
}

let problems = 0;
for (const lang of targets) {
  const dir = path.join(i18nDir, lang);
  const ui = Object.assign(
    {},
    ...fs
      .readdirSync(dir)
      .filter((name) => /^ui.*\.json$/.test(name))
      .map((name) => readJson(path.join(dir, name))),
  );
  const missingUi = [...staticKeys()].filter((key) => !(key in ui));
  const text = fs.existsSync(path.join(dir, 'taxonomy.json'))
    ? readJson(path.join(dir, 'taxonomy.json'))
    : {};
  const missingTaxonomy = [
    ...taxonomy.categories.filter((c) => !c.deletedAt && !text.categories?.[c.slug]).map((c) => c.slug),
    ...taxonomy.groups.filter((g) => !g.deletedAt && !text.groups?.[g.slug]).map((g) => g.slug),
  ];
  // 译文必须逐条对应英文，避免漏译或错位的参数行
  const productReport = check(path.join(dir, 'products'), products, 'id', undefined, (tr, en) => {
    const sizes = (value) => ['features', 'specs', 'imageAlts'].map((k) => value[k]?.length ?? 0);
    const names = (tr.specs ?? []).map((spec) => spec.name);
    return sizes(tr).join() === sizes(en).join() && new Set(names).size === names.length;
  });
  const articleReport = check(
    path.join(dir, 'articles'),
    articles,
    'slug',
    articleFields,
    (tr, en) => skeleton(tr.content) === skeleton(en.content) && tr.tags?.length === en.tags?.length,
  );
  console.log(`\n[${lang}]`);
  for (const [label, total, [missing, stale, mismatched], shape] of [
    ['products', products.length, productReport, 'features/specs/imageAlts count'],
    ['articles', articles.length, articleReport, 'headings/images/links/tags'],
  ]) {
    problems += missing.length + stale.length + mismatched.length;
    console.log(`  ${label} ${total - missing.length}/${total} translated`);
    if (missing.length) console.log(`    untranslated: ${missing.join(', ')}`);
    if (stale.length) console.log(`    stale (English changed since translation): ${stale.join(', ')}`);
    if (mismatched.length) console.log(`    ${shape} differs from English: ${mismatched.join(', ')}`);
  }
  problems += missingUi.length;
  if (missingTaxonomy.length) console.log(`  taxonomy without translation: ${missingTaxonomy.join(', ')}`);
  if (missingUi.length) console.log(`  UI strings without translation:\n    ${missingUi.join('\n    ')}`);
}
process.exitCode = problems ? 1 : 0;
