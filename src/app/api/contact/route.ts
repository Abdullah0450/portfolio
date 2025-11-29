import { NextResponse } from 'next/server';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const CONTACT_TO = process.env.CONTACT_TO || 'maliktriples123789@gmail.com';

/**
 * POST /api/contact
 * Supports Resend (primary) or SendGrid (fallback).
 * Environment variables:
 * - RESEND_API_KEY: Resend API key
 * - RESEND_FROM: Verified sender email in Resend (e.g., noreply@yourdomain.com or default@resend.dev)
 * - CONTACT_TO: Recipient email (defaults to maliktriples123789@gmail.com)
 * - SENDGRID_API_KEY: SendGrid API key (fallback)
 * - SENDGRID_FROM: SendGrid verified sender (fallback)
 */
export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const { name = 'Anonymous', email = 'no-reply@example.com', subject = 'New message from site', message = '' } = body;

    // Try Resend first
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev'; // Resend default for testing

    if (RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: RESEND_FROM,
            to: CONTACT_TO,
            reply_to: email,
            subject: `${subject} — ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2>New message from ${name}</h2>
                <p><strong>From:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                <div style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
${message}
                </div>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const resendErr = await resendRes.json();
          console.error('Resend error:', resendErr);
          // Fall through to SendGrid if Resend fails
        } else {
          return NextResponse.json({ ok: true });
        }
      } catch (err) {
        console.error('Resend request failed:', err);
        // Fall through to SendGrid
      }
    }

    // Fallback: SendGrid
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM = process.env.SENDGRID_FROM;

    if (SENDGRID_API_KEY && SENDGRID_FROM) {
      const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: CONTACT_TO }] }],
          from: { email: SENDGRID_FROM, name: 'Portfolio Contact' },
          reply_to: { email, name },
          subject: `${subject} — ${name}`,
          content: [{ type: 'text/plain', value: `Message from ${name} <${email}>:\n\n${message}` }],
        }),
      });

      if (!sendgridRes.ok) {
        const text = await sendgridRes.text();
        console.error('SendGrid error', text);
        return NextResponse.json({ ok: false, error: 'SendGrid error: ' + text }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    // No provider configured
    return NextResponse.json(
      {
        ok: false,
        error: 'No email provider configured. Set RESEND_API_KEY (Resend) or SENDGRID_API_KEY + SENDGRID_FROM (SendGrid).',
      },
      { status: 500 }
    );
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}

export const runtime = 'nodejs';
