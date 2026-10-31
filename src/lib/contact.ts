export interface ContactBody {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  country?: string;
  inquiry_type?: string;
  /** Site language the enquiry was sent from, e.g. es. */
  language?: string;
  website?: string;
}
export function validContact(body: unknown): body is ContactBody {
  if (!body || typeof body !== 'object') return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    data.name.length <= 100 &&
    typeof data.email === 'string' &&
    data.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.message === 'string' &&
    data.message.trim().length >= 10 &&
    data.message.length <= 5000 &&
    ['company', 'phone', 'country', 'inquiry_type', 'language'].every(
      (key) =>
        data[key] === undefined || (typeof data[key] === 'string' && data[key].length <= 200),
    )
  );
}
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  );
}
export function contactHtml(data: ContactBody) {
  return `<h2>New Soltree enquiry</h2>${Object.entries(data)
    .filter(([key]) => key !== 'website')
    .map(
      ([key, value]) =>
        `<p><strong>${escapeHtml(key)}:</strong> <span style="white-space:pre-wrap">${escapeHtml(value ?? '')}</span></p>`,
    )
    .join('')}`;
}
