---
name: soltree-i18n
description: Soltree（elesoltree）网站多语言方案：翻译产品/文章/页面、新增语言、技术 SEO（lang、canonical、hreflang、x-default、sitemap）与验收检查。用户要求翻译、多语言、某语言版本（如西语 /es/）或新增语言时使用。
---

# Soltree 多语言方案

本站已有一套固定的多语言架构，**沿用它，不要另起方案**。不要引入 i18n 库，不要按 IP 自动跳转语言，不要用 JavaScript 切换语言。

## 架构（必须遵守）

- 英文是默认语言，放在根路径（`/products/...`）。其他语言放子目录 `/{lang}/...`（如 `/es/products/...`）。
- 语言列表只在 `src/i18n/index.ts` 的 `locales` 里维护（含 `hreflang`、`ogLocale`、`dir`；阿拉伯语、波斯语 `dir: 'rtl'`）。
- **URL 不翻译**：产品 id、文章 slug、分类 slug 全部保持英文。
- **有译文才生成页面**：没有译文的产品/文章不会生成该语言页面，链接自动回落到英文页。不要为了“凑齐”生成半英文页面。
- 译文全部放 `src/i18n/{lang}/`，**不要改 `src/content/`**（那是英文原文，由后台发布管理）。
- 英文页面内容不得改变。改完要对比英文页可见文字。

## 文件位置

| 内容 | 英文原文 | 译文 |
|---|---|---|
| 界面文案 | 组件里的英文字符串 | `src/i18n/{lang}/ui*.json`（英文原句作 key，可拆多个文件，自动合并） |
| 分类 | `src/content/settings/taxonomy.json` | `src/i18n/{lang}/taxonomy.json` |
| 产品 | `src/content/products/<id>.json` | `src/i18n/{lang}/products/<id>.json` |
| 文章 | `src/content/articles/<slug>.json` | `src/i18n/{lang}/articles/<slug>.json` |
| 术语与语气 | — | `src/i18n/{lang}/GLOSSARY.md`（翻译前必读） |
| 文章翻译规则 | — | `src/i18n/{lang}/ARTICLES.md`（翻译文章前必读） |

参考样板：西班牙语 `src/i18n/es/`（87 个产品、19 篇文章、全部界面文案均已完成）。新语言照抄它的格式。

### 产品译文格式

字段：`sourceHash`（先填 `""`）、`name`、`shortDescription`、`description`、`features`、`specs`（`[{name, value}]`）、`metaTitle`、`metaDescription`、`metaKeywords`、`imageAlts`。`features`、`specs`、`imageAlts` 的数量与顺序必须和英文一致；spec 名称不可重复。数值、型号、标准号（IEC、UL、TÜV）保持原样。

### 文章译文格式

字段：`sourceHash`（先填 `""`）、`title`、`excerpt`、`content`、`tags`、`metaTitle`、`metaDescription`、`metaKeywords`。`content` 是 Markdown，必须满足：
- `##` / `###` 标题数量和顺序与英文一致；
- 所有图片路径、链接 URL 原样保留（只翻译可见文字和图片 alt），站内链接会自动改指向该语言版本；
- FAQ 段标题用该语言的“常见问题”（西语 `## Preguntas frecuentes ...`）。**新语言要把这个词加到 `src/lib/markdown.ts` 的 `inFaq` 正则里**，否则 FAQ 结构化数据不生成；
- `tags` 数量和顺序一致；`metaTitle` 约 65 字符以内并保留 `| Soltree`，`metaDescription` 约 160 字符以内。

## 常见任务

### A. 翻译新发布的英文产品或文章（最常见）

1. 读 `GLOSSARY.md`（文章再读 `ARTICLES.md`）。
2. 读英文原文，按上面的格式写译文文件，文件名与英文相同。
3. 跑检查与打指纹（见“验收”）。

### B. 新增一个页面的多语言版本

1. 把页面内容抽成组件 `src/components/XxxPage.astro`，接收 `lang` 参数；文字用 `t(lang, 'English text')`，站内链接用 `href(lang, '/path')`。英文页 `src/pages/xxx.astro` 改为只渲染该组件。
2. 新建 `src/pages/[lang]/xxx.astro`，`getStaticPaths` 遍历 `translatedLangs`。
3. 把路径加入 `src/i18n/index.ts` 的 `staticPages`（这样 hreflang/sitemap/语言切换器才会认它）。
4. 在 `scripts/verify.mjs` 的 localizedPairs 里加上该路径。
5. 把新文案加入 `src/i18n/{lang}/ui*.json`。

### C. 新增一种语言

1. 在 `locales` 加一项（`hreflang` 用标准代码，如 `pt-BR`、`fr`、`ar`；RTL 语言 `dir: 'rtl'`）。
2. 新建 `src/i18n/{lang}/`：先写 `GLOSSARY.md`（目标市场、称呼、术语表），再写 `ui*.json`、`taxonomy.json`，然后逐批翻译产品和文章。
3. 在 `inFaq` 正则加入该语言的“常见问题”。
4. 先只翻译界面 + 分类 + 少量产品，构建验收后再批量翻译。

## 技术 SEO 规则（代码已自动处理，改动时不要破坏）

1. `<html lang>` 和 `dir`：由 BaseLayout 按语言输出。
2. canonical：每个语言页指向**它自己**，不指向英文页。
3. hreflang：只列真实存在的语言版本，且双向互指；由 `alternates(path)` / `hasPage()` 决定。
4. x-default 指向英文。
5. sitemap 包含所有语言版本（`src/pages/sitemap.xml.ts`）。
6. 空页面（如没有译文文章的分类页）输出 noindex，且不作为语言版本。
7. 跳转地址统一在 `src/lib/redirects.mjs` 维护（astro.config 与链接本地化共用），译文页里的跳转链接会自动换成目标页。

## 验收（每次都要跑，全部通过才算完成）

```bash
node scripts/i18n-status.mjs {lang}          # 缺失 / 过期 / 结构不一致检查
node scripts/i18n-status.mjs {lang} --stamp  # 结构无误后打指纹（标记译文为最新）
npx astro check                              # 0 errors
npm run build                                # 构建日志里不得出现 "[i18n] {lang} missing:"，有就补到 ui*.json
npm run verify                               # 检查 lang、canonical、双向 hreflang、sitemap、未翻译页不生成
```

- 英文原文改动后，`i18n-status` 会把对应译文标为 stale：只重译变动的部分，再 `--stamp`。
- 英文源数据里如果有乱码（如 “ – .0kV”），译文照原样保留并告诉用户去后台改英文，不要自行编造数值。

## 项目规则

- 开始前读 `TASK.md`、`PROGRESS.md`；完成后更新 `PROGRESS.md`，并区分“本地完成 / 已验证 / 已部署”。
- 未经用户要求不提交、不部署。
- 向用户汇报用中文。
