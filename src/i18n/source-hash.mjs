import { createHash } from 'node:crypto';

/** Fields copied into each translation file; everything else (images, ids, order) stays shared. */
export const translatedFields = [
  'name',
  'shortDescription',
  'description',
  'features',
  'specs',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'imageAlts',
];
export const articleFields = [
  'title',
  'excerpt',
  'content',
  'tags',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
];

/**
 * @typedef {{ sourceHash: string, name: string, shortDescription: string, description: string,
 *   features: string[], specs: { name: string, value: string }[], metaTitle?: string,
 *   metaDescription?: string, metaKeywords?: string, imageAlts?: string[] }} ProductTranslation
 * @typedef {{ sourceHash: string, title: string, excerpt?: string, content: string,
 *   tags: string[], metaTitle?: string, metaDescription?: string, metaKeywords?: string }} ArticleTranslation
 */

/** Fingerprint of the English text a translation was made from; specs may be a list or a map. */
export function sourceHash(record, fields = translatedFields) {
  const text = fields.map((key) => {
    const value = record[key];
    if (key === 'specs')
      return Array.isArray(value)
        ? value.map((spec) => [spec.name, spec.value])
        : Object.entries(value ?? {});
    return value === '' ? null : (value ?? null);
  });
  return createHash('sha256').update(JSON.stringify(text)).digest('hex').slice(0, 16);
}
