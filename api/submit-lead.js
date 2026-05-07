import { createClient } from '@supabase/supabase-js';

const TO_EMAIL = 'jeh@prentreprenoer.dk';
const FROM_EMAIL = process.env.LEAD_NOTIFY_FROM || 'PR Entreprenøren <noreply@prentreprenoer.dk>';

async function notifyByEmail({ name, phone, email, zipCode, problem, priority, source, conversation }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set – skipping email notification');
    return;
  }

  const subject = `Ny henvendelse fra prentreprenoer.dk – ${name}${zipCode ? ` (${zipCode})` : ''}`;
  const sourceLabel = source === 'chat' ? 'AI-chat' : 'Kontaktformular';
  const safe = (v) => (v == null || v === '') ? '—' : String(v);

  const text = [
    `Ny lead modtaget via ${sourceLabel}`,
    '',
    `Navn:        ${safe(name)}`,
    `Telefon:     ${safe(phone)}`,
    `Email:       ${safe(email)}`,
    `Postnummer:  ${safe(zipCode)}`,
    `Prioritet:   ${safe(priority)}`,
    '',
    'Beskrivelse:',
    safe(problem),
    conversation ? `\n— Chatforløb —\n${conversation}` : ''
  ].join('\n');

  const html = `
    <h2 style="margin:0 0 16px;color:#1e3a8a;">Ny henvendelse fra prentreprenoer.dk</h2>
    <p style="color:#475569;margin:0 0 24px;">Modtaget via <strong>${sourceLabel}</strong></p>
    <table style="border-collapse:collapse;width:100%;max-width:560px;font-family:system-ui,Arial,sans-serif;font-size:14px;">
      <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:bold;width:140px;">Navn</td><td style="padding:8px 12px;">${safe(name)}</td></tr>
      <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:bold;">Telefon</td><td style="padding:8px 12px;"><a href="tel:${safe(phone).replace(/\s/g,'')}">${safe(phone)}</a></td></tr>
      <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:bold;">Email</td><td style="padding:8px 12px;">${email ? `<a href="mailto:${email}">${email}</a>` : '—'}</td></tr>
      <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:bold;">Postnummer</td><td style="padding:8px 12px;">${safe(zipCode)}</td></tr>
      <tr><td style="padding:8px 12px;background:#f8fafc;font-weight:bold;">Prioritet</td><td style="padding:8px 12px;">${safe(priority)}</td></tr>
    </table>
    <h3 style="color:#1e3a8a;margin-top:24px;">Beskrivelse</h3>
    <p style="white-space:pre-wrap;color:#334155;font-family:system-ui,Arial,sans-serif;font-size:14px;line-height:1.5;">${safe(problem)}</p>
    ${conversation ? `<h3 style="color:#1e3a8a;margin-top:24px;">Chatforløb</h3><pre style="background:#f8fafc;padding:12px;border-radius:8px;white-space:pre-wrap;font-family:system-ui,Arial,sans-serif;font-size:13px;color:#475569;">${conversation.replace(/</g,'&lt;')}</pre>` : ''}
  `;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email || undefined,
      subject,
      text,
      html
    })
  });

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    console.error('Resend email failed:', resp.status, errBody);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const {
    name,
    phone,
    problem,
    zipCode,
    email,
    priority,
    insuranceClaim,
    source,
    conversation
  } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Navn er påkrævet (min. 2 tegn)' });
  }
  if (!phone || String(phone).replace(/\s/g, '').length < 8) {
    return res.status(400).json({ success: false, message: 'Ugyldigt telefonnummer' });
  }
  if (!problem || String(problem).trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Beskriv venligst problemet' });
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const leadSource = source === 'chat' ? 'chat' : 'form';

  // Match the existing leads-table schema. email/source/conversation_log are
  // optional — if a column doesn't exist in your Supabase, the insert will
  // fail and the lead won't be saved. See database/migration-leads.sql for
  // the canonical schema; run the ALTER TABLE in database/migration-add-form-fields.sql
  // if you want email + form-source tracking persisted.
  const insertRow = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    problem: String(problem).trim(),
    zip_code: zipCode ? String(zipCode).trim() : null,
    priority: priority || 'PLANLAGT',
    insurance_claim: !!insuranceClaim,
    status: 'NY',
    source: leadSource,
    created_at: new Date().toISOString()
  };
  if (email) insertRow.email = String(email).trim();
  if (conversation) insertRow.conversation_log = String(conversation);

  const { error } = await supabase.from('leads').insert([insertRow]);

  if (error) {
    console.error('Lead insert error:', error);
    return res.status(500).json({ success: false, message: 'Der opstod en fejl. Prøv igen.' });
  }

  try {
    await notifyByEmail({ name, phone, email, zipCode, problem, priority, source: leadSource, conversation });
  } catch (e) {
    console.error('Email notification failed (lead still saved):', e);
  }

  return res.status(200).json({ success: true, message: 'Tak! Vi kontakter dig hurtigst muligt.' });
}
