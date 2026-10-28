import type { APIRoute } from 'astro';
import { validContact, contactHtml } from '@/lib/contact';
import { getSecret } from 'astro:env/server';
export const prerender = false;
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }
  if (!validContact(body))
    return json(
      {
        success: false,
        error: 'Please enter your name, a valid email and a message of 10–5000 characters.',
      },
      422,
    );
  if (body.website) return json({ success: true });
  const apiKey = getSecret('RESEND_API_KEY');
  if (!apiKey)
    return json(
      {
        success: false,
        error: 'Email service is not configured. Please contact shawn@cnsoltree.com.',
      },
      503,
    );
  const from = getSecret('RESEND_FROM_EMAIL') ?? 'noreply@cnsoltree.com';
  const to = getSecret('RESEND_ADMIN_EMAIL') ?? 'shawn@cnsoltree.com';
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: body.email,
        subject: `[Soltree] New enquiry from ${body.name}${body.company ? ' · ' + body.company : ''}`,
        html: contactHtml(body),
      }),
    });
    if (!result.ok)
      return json({ success: false, error: 'Failed to send email. Please try again later.' }, 502);
    const confirmation = (await result.json()) as { id?: unknown } | null;
    if (typeof confirmation?.id !== 'string' || !confirmation.id.trim())
      return json(
        { success: false, error: 'Email delivery was not confirmed. Please try again later.' },
        502,
      );
  } catch {
    return json(
      { success: false, error: 'Unable to send your enquiry. Please try again later.' },
      502,
    );
  }
  // Keep the existing contact_messages schema; include optional lead details in the saved message.
  const databaseUrl = getSecret('NEXT_PUBLIC_SUPABASE_URL'),
    serviceKey = getSecret('SUPABASE_SERVICE_ROLE_KEY');
  if (databaseUrl && serviceKey) {
    try {
      const response = await fetch(`${databaseUrl}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          message: [
            body.message,
            ...['company', 'phone', 'country', 'inquiry_type'].flatMap((key) => {
              const value = body[key as keyof typeof body];
              return value ? [`${key}: ${value}`] : [];
            }),
          ].join('\n'),
        }),
      });
      if (!response.ok) console.error('[contact] Database save failed:', response.status);
    } catch {
      console.error('[contact] Database unavailable');
    }
  }
  return json({ success: true });
};
export const GET: APIRoute = () => json({ error: 'Method Not Allowed' }, 405);
