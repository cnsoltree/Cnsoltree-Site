import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAdminStore } from '../src/lib/admin-store.mjs';
import { MEDIA_BUCKET } from '../src/lib/admin-media.mjs';
import { supabaseServiceHeaders } from '../src/lib/supabase.mjs';

/** Supabase may report a missing bucket as NoSuchBucket/400 instead of HTTP 404. */
export async function ensurePrivateMediaBucket(call, prepare = false) {
  let bucket = await call(`/storage/v1/bucket/${MEDIA_BUCKET}`);
  const missingDetails =
    bucket.status === 400
      ? await bucket
          .clone()
          .json()
          .catch(() => ({}))
      : null;
  const missing =
    bucket.status === 404 ||
    (bucket.status === 400 &&
      (missingDetails?.code === 'NoSuchBucket' || missingDetails?.statusCode === 'NoSuchBucket'));
  if (missing && prepare) {
    const created = await call('/storage/v1/bucket', {
      method: 'POST',
      body: JSON.stringify({
        id: MEDIA_BUCKET,
        name: MEDIA_BUCKET,
        public: false,
        file_size_limit: 2097152,
        allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'],
      }),
    });
    if (!created.ok && created.status !== 409)
      throw new Error(`Private media bucket creation failed (${created.status}).`);
    bucket = await call(`/storage/v1/bucket/${MEDIA_BUCKET}`);
  }
  if (!bucket.ok) return false;
  const settings = await bucket.json();
  if (settings.public !== false) throw new Error('The admin media bucket must be private.');
  return true;
}

async function main() {
  // Read existing local configuration without printing credentials or writing environment files.
  if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey)
    throw new Error('Configure the existing Supabase URL/service key in .env.local first.');
  const base = new URL(url);
  if (base.protocol !== 'https:' || base.pathname !== '/' || base.username || base.password)
    throw new Error('Invalid Supabase URL.');
  const headers = {
    ...supabaseServiceHeaders(serviceKey),
    'Content-Type': 'application/json',
  };
  const call = (pathname, options = {}) =>
    fetch(`${base.origin}${pathname}`, {
      ...options,
      headers,
      signal: AbortSignal.timeout(20_000),
    });
  let failed = false;
  try {
    const current = await createAdminStore({ url, serviceKey }).load();
    console.log(
      current
        ? `Content database: ready (revision ${current.revision}).`
        : 'Content database: ready; first authorized login will import the public content.',
    );
  } catch (error) {
    console.log(`Content database: ${error.message}`);
    failed = true;
  }
  if (await ensurePrivateMediaBucket(call, process.argv.includes('--prepare-storage'))) {
    console.log('Private image storage: ready.');
  } else {
    console.log(
      'Private image storage: not prepared. Run with --prepare-storage after reviewing this script.',
    );
    failed = true;
  }
  console.log(
    `Local online-admin switch: ${process.env.ADMIN_ONLINE_ENABLED === 'true' ? 'enabled' : 'disabled'}.`,
  );
  console.log(
    `Dedicated publishing token: ${process.env.ADMIN_GITHUB_TOKEN ? 'configured locally' : 'not configured locally'}.`,
  );
  console.log(
    'This check does not send login emails, create users, publish Git commits or change Vercel settings.',
  );
  process.exitCode = failed ? 1 : 0;
}

// Importing the offline-checkable bucket helper must not read local credentials or run setup.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await main();
