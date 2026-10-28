# Public migration compatibility audit

Audit date: 2026-10-28. Sources: local `Next.js elesoltree` and `Astro-elesoltree` projects. HTTP checks used `http://127.0.0.1:4323` only. No production URL availability is claimed.

## Public files and article text

| Check                                         | Result                                   |
| --------------------------------------------- | ---------------------------------------- |
| Old `public` files                            | 690                                      |
| New `public` files                            | 691, including the added `_headers` file |
| Old files absent at the same exact new path   | 0                                        |
| Old/new SHA-256 content differences           | 0                                        |
| Files copied or overwritten during this audit | 0                                        |
| Raster originals mirrored into `src/assets`   | 682/682, hashes identical                |
| SVG illustrations preserved                   | 8/8; 7 appear in built article HTML      |
| Article bodies compared                       | 19/19 identical after CRLF normalization |

The complete old public-file comparison includes the blog illustrations regardless of their previous Git tracking state. No image names or article/product text were changed.

## URLs

The old App Router source and exported data define 123 public content paths: 8 static pages, 9 categories, 87 products and 19 articles. All 123 are present in the current Astro build and sitemap. No missing content path requires a new redirect.

The inspected pre-adapter `dist` snapshot contains 151 HTML files, including `404.html`: 150 content pages. `robots.txt` and `sitemap.xml` are also present. The sitemap contains 129 routes; empty taxonomy hubs are intentionally omitted by its existing content-aware logic. The final Vercel deployment artifact is `.vercel/output/static`; final release checks use that directory.

Local HTTP checks confirmed these redirects, with status **301** and the exact target below:

| Previous path                                                  | Target                                  |
| -------------------------------------------------------------- | --------------------------------------- |
| `/landing-pages`                                               | `/resources`                            |
| `/products/din-rail-aerosol-fire-extinguisher`                 | `/products/Aerosol-DIN-Rail`            |
| `/blog/category/circuit-protection/mcb`                        | `/blog/category/circuit-protection`     |
| `/blog/category/circuit-protection/mccb`                       | `/blog/category/circuit-protection`     |
| `/blog/category/circuit-protection/rccb`                       | `/blog/category/circuit-protection`     |
| `/blog/category/circuit-protection/surge-protector`            | `/blog/category/circuit-protection`     |
| `/blog/category/circuit-protection/voltage-protector`          | `/blog/category/circuit-protection`     |
| `/blog/category/switching-isolation/automatic-transfer-switch` | `/blog/category/switching-isolation`    |
| `/blog/category/solar-pv-components/dc-circuit-breaker`        | `/blog/category/solar-pv-components`    |
| `/blog/category/solar-pv-components/dc-surge-protector`        | `/blog/category/solar-pv-components`    |
| `/blog/category/solar-pv-components/dc-fuse-holder`            | `/blog/category/solar-pv-components`    |
| `/blog/category/solar-pv-components/pv-combiner-box`           | `/blog/category/solar-pv-components`    |
| `/blog/category/metering-smart-control/power-meter`            | `/blog/category/metering-smart-control` |
| `/blog/category/metering-smart-control/wifi-smart-devices`     | `/blog/category/metering-smart-control` |
| `/blog/category/enclosures-boxes/pv-combiner-box`              | `/blog/category/enclosures-boxes`       |
| `/blog/category/fire-suppression/aerosol-fire-extinguisher`    | `/blog/category/fire-suppression`       |

The 14 blog redirects preserve earlier Astro topic links; those nested routes were not present in the inspected original Next App Router tree.

## Image casing fix

Some old records use `.jpg` while the corresponding originals use `.JPG`. The previous `Img.astro` glob excluded uppercase extensions, producing 86 invalid image references across 16 HTML files, representing 22 unique paths in the `CZVA1`, `CZVA2`, `CZVA3` and `SRP-L` image families.

`Img.astro` now imports both lowercase and uppercase raster extensions, prefers an exact metadata key and falls back to a case-insensitive metadata lookup. The emitted optimized path uses the actual asset. Gallery slides and thumbnails already use this shared component; gallery controls switch existing slides and do not restore the incorrect source URL.

After this fix, local product pages `/products/CZVA1`, `/products/CZVA2`, `/products/CZVA3` and `/products/SRP-L` returned 200 with no incorrect raw `.jpg` references. Their four main-image optimization URLs returned 200 with nonempty `image/png` responses in development.

Run the final built-output check after rebuilding:

```sh
node scripts/check-built-images.mjs
```

It compares every local emitted `<img src>` with a Set of actual `.vercel/output/static` directory entries. This catches Linux casing errors even when run on Windows. Final post-build results should be recorded alongside the release checks; the inspected pre-fix build still contains the old references until rebuilt.

## Existing illustration gaps

These seven Markdown references have no original file in either project:

- `/images/blog/pv-combiner-box-certifications-overview.jpg`
- `/images/blog/pv-combiner-box-certification-by-market.jpg`
- `/images/blog/din-rail-aerosol-18-spec-parameters.jpg`
- `/images/blog/din-rail-aerosol-7-fraud-patterns.jpg`
- `/images/blog/aerosol-fire-extinguisher-notified-bodies-en-15276.jpg`
- `/images/blog/aerosol-fire-extinguisher-5-fraud-cases.jpg`
- `/images/blog/aerosol-fire-extinguisher-30-minute-verification.jpg`

The existing `availableMarkdown` helper omits these absent illustrations when rendering. Source article text remains intact. This audit did not fabricate replacements.

## Interface and query behavior differences

- `POST /api/contact` exists in both projects. Its delivery configuration and runtime behavior are audited separately; this report does not claim a production delivery test.
- The old `POST /api/upload` R2-presigned-upload endpoint has no Astro counterpart. Current content editing uses the local CMS media workflow; no remaining public Astro caller of `/api/upload` was found. A public upload endpoint was not added.
- Next's `/_next/image` and other internal Next assets are replaced by Astro's image/build outputs. Original valid `/images/...` URLs remain available with identical bytes.
- `/products?group=...` and category `?group=...&type=...` remain usable through the catalog's browser filtering. Next previously rendered filtered HTML on the server. Astro initially serves the static catalog and applies query filters in JavaScript.
- Old product-family query pages used a canonical URL containing `?group=...`; Astro currently canonicalizes them to `/products`. Category canonical URLs excluded `type` in both versions. This is an SEO behavior change to review, not a missing route, and was not altered during this asset audit.
