# Soltree Astro migration

The current Soltree Next.js content and product catalog, migrated into native Astro templates. The original Next.js project and the earlier Astro draft are unchanged.

## Local use

The local Chinese product/article CMS is available at `http://127.0.0.1:4323/admin` after `npm run admin` (or double-click `启动内容后台.cmd`). See [后台使用说明.md](./后台使用说明.md). Local mode uses pinned Decap packages and local JSON files. Authenticated online mode uses a private Supabase workspace and explicit Git publication; it stays disabled until configured. Follow [线上后台启用说明.md](./线上后台启用说明.md) before enabling it. Existing content and URLs were migrated losslessly to `src/content/products` and `src/content/articles`; `src/lib/data.ts` validates and exposes only published entries. Local changes are backed up to ignored `.content-backups`; uploads and editor assets are prepared before builds. Landing pages stay code-managed.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4323
npm run check
npm run build
npm run verify
node scripts/verify-vercel-build.mjs
```

This project has its own installed dependencies. Use `npm ci` to reproduce the locked versions on another machine.

## Preserved

- 87 products, nine existing category URLs, all 19 articles and original product/article URLs.
- Home, about, contact, privacy, terms and aerosol solution pages.
- Six product families, two-level navigation, DC filtering, unique counts, category switching without scrolling to the top, back/forward navigation.
- Product image gallery, native FAQ disclosures, testimonial controls, cookie preferences, WhatsApp.
- Per-page metadata, canonical URLs without a trailing slash, JSON-LD, sitemap, robots and RSS.
- Contact form via Resend and best-effort storage in the existing Supabase `contact_messages` table. Optional lead details are included in both email and stored message.

## Runtime configuration

For local development use `.env.local`; for Vercel deployment configure the following server-side environment variables in the existing project's dashboard. Set Production and Preview independently; use test services for Preview. Local secret files are ignored and must not be committed. Do not give email or database service keys a `PUBLIC_` prefix.

```
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_ADMIN_EMAIL
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

The Vercel adapter emits `.vercel/output/config.json`, prerendered pages/assets in `.vercel/output/static/` and the on-demand Node function under `.vercel/output/functions/`. `/api/contact`, legacy blog-topic redirects and production 404 responses for the local admin use the function. Public catalog, article and information pages remain prerendered; images are generated with Sharp at build time. `npm run verify` checks the static output, and `node scripts/verify-vercel-build.mjs` checks the Vercel routes/function and production admin isolation without sending enquiries.

## Vercel migration

Keep the existing Git repository, Vercel project and production domains. Preserve the previous Next.js commit and any uncommitted files before merging the Astro migration on a separate branch. Replacing the application does not require creating a second repository or deleting the old history.

The repository's `vercel.json` selects the Astro framework, `npm ci`, `npm run build`, `.vercel/output/static` and URLs without trailing slashes. The adapter generates the complete [Vercel Build Output API](https://vercel.com/docs/build-output-api) directory, including the function; uploading only the static folder to a file host would omit the contact API and legacy redirects. In the existing Vercel project, remove any old Next.js-specific build/output overrides and ensure its Root Directory points at the migrated application's `package.json`.

Use Node `22.x` (at least `22.23.4`, as required by Astro 7.4.2) in `package.json` and Vercel's project settings. The deployment stack is Astro 7.4.2 and `@astrojs/vercel` 11.0.16; the adapter also supports Node 24. Keep the Node major consistent between local validation and Vercel. The Astro configuration explicitly keeps the previous HTML whitespace behavior during the compiler upgrade. See [Astro's adapter guide](https://docs.astro.build/en/guides/integrations-guide/vercel/), the [Astro 7 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v7/) and [Vercel's Node version rules](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

Deploy the migration branch as a Preview first, with the production domain still serving the previous deployment. Confirm the home page, existing case-sensitive product URLs, article pages, sitemap, genuine 301 redirects, contact errors and a deliberately submitted test enquiry before promoting it. Keep the last successful Next.js deployment available for rollback. A local build is preparation, not evidence that a Vercel deployment or enquiry delivery has succeeded.

Vercel normally adds `X-Robots-Tag: noindex` to Preview deployment URLs. Check the actual Preview response headers and keep Deployment Protection enabled for private previews; [custom preview domains can omit that automatic header](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines). Do not assign the production domain to Preview or add a global production `noindex` rule. Public canonical URLs continue to use `https://www.elesoltree.com`.

Production admin routes return 404 unless `ADMIN_ONLINE_ENABLED=true`. When enabled, `/admin` requires the confirmed `jacky@cnsoltree.com` Supabase account; APIs validate the session and request origin. The online `/__cms` operates on a private JSONB snapshot and commits changes with a database compare-and-swap transaction. Cloud saving does not publish content. Explicit publication exports public records and referenced images to the same Git main branch with a non-forced update, then checks the matching Production deployment. Private knowledge/planning, drafts, trash and unpublished media stay outside the public repository. The loopback local filesystem proxy remains development-only.

## Verification and limits

`npm run verify` checks every content route, unique product coverage, DC filtering, contact validation/HTML escaping, internal links and image references, metadata, JSON-LD and absence of client-side secrets or React runtime. It never sends emails or writes to the production database.

Seven article illustration files were already missing in the source project. Their Markdown remains in `src/content/articles`; broken image elements are omitted by `src/lib/markdown.ts` until the real illustrations are supplied. The missing About banner uses the existing factory photograph. The old aerosol product link redirects to `/products/Aerosol-DIN-Rail`.

The previous unused `/api/upload` helper is not exposed in this public-site migration; no public page used it. If an external admin tool relies on it, connect a properly authenticated upload endpoint before production cutover.

No domain or production deployment has been changed by these local migration files. Live email delivery, database writes and the Vercel Node runtime must be verified in Preview before replacing the existing production site. Local previews do not establish a production Core Web Vitals improvement.

The Vercel preparation upgrades the previous Astro 5 and adapter 9 versions after the dependency audit identified production vulnerabilities. The production-dependency audit on 2026-10-28 reports zero critical and five high entries, all tracking the same remaining upstream chain: `@astrojs/vercel → @vercel/functions → @vercel/oidc → @vercel/cli-config@0.3.4 → zod@4.1.11`. That Zod version is affected by the constrained-collection memory-exhaustion advisory fixed in 4.6.6. The CLI-config package pins and bundles its older Zod copy, so replacing only its external dependency would not establish that its bundled code is fixed.

The inspected Vercel function does not include the CLI-config/OIDC configuration readers; its included Zod is 4.6.7. The upstream reader validates local Vercel global/auth configuration files, while `/api/contact` uses the site's own `validContact` checks and does not send HTTP form input into those schemas. This limits the observed exposure in this build; it does not mean the dependency audit is clean. Track the upstream fix and re-run `npm audit --omit=dev` for each deployment. The local filesystem proxy must not be exposed to a network; online mode uses authenticated endpoints and durable storage.

## Code formatting

Prettier and `prettier-plugin-astro` format Astro, TypeScript, JavaScript, CSS and project configuration. Generated output, assets, dependency directories, secret files and the lockfile are excluded. Product and article strings are preserved.

```sh
npm run format        # Apply the project formatting rules
npm run format:check  # Check formatting without changing files
```

Open `Astro-elesoltree` itself as the VS Code project folder to use its save-time formatting settings. The workspace recommends the official Astro and Prettier extensions; install them if VS Code prompts.

## Blog categories

Blog archives show the six product families. `/blog/category/<family>` lists a family; existing `/blog/category/<family>/<topic>` URLs permanently redirect to their validated family page. Existing `/blog/<article>` URLs are preserved. The backend retains each article's `relatedCategorySlug` and optional `relatedProductTypes` (for example `["MCB", "DC"]`) for classification. General MCB articles are never automatically treated as DC solar guides.

The 19 current articles cover aerosol fire suppression (10) and PV combiner boxes (9). PV combiner articles appear in both Solar PV Components and Enclosures & Boxes, with each article listed once per archive. Empty archives are marked noindex and excluded from the sitemap until articles are added.
