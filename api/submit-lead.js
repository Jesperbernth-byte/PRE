import { createClient } from '@supabase/supabase-js';
import { checkAndLogIp, getClientIp } from '../lib/rateLimit.js';

const TO_EMAIL = 'jeh@prentreprenoer.dk';
const FROM_EMAIL = process.env.LEAD_NOTIFY_FROM || 'PR Entreprenøren <noreply@prentreprenoer.dk>';

const MIN_FORM_FILL_MS = 3000;        // skal udfyldes på mindst 3s
const MAX_FORM_AGE_MS = 24 * 3600 * 1000; // og senest 24t efter load
const MAX_PROBLEM_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;

// Fjerner script-tags og potentielt farlige HTML-fragmenter.
// Vi tillader unicode, mellemrum, dansk tegnsætning — kun aktive
// markup-fragmenter fjernes.
function sanitizeText(input) {
  if (input == null) return '';
  let s = String(input);
  s = s.replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '');
  s = s.replace(/<\s*\/?\s*(iframe|object|embed|link|meta|style)[^>]*>/gi, '');
  s = s.replace(/javascript\s*:/gi, '');
  s = s.replace(/on\w+\s*=/gi, '');
  return s.trim();
}

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
    conversation,
    website,        // honeypot
    formLoadedAt    // timestamp fra klient
  } = req.body || {};

  // Honeypot — bots udfylder typisk alle felter
  if (website && String(website).trim().length > 0) {
    // Silent reject: bots ved ikke at vi opdagede dem
    return res.status(200).json({ success: true, message: 'Tak!' });
  }

  // Min. udfyldnings-tid (kun for form-source — chat har egen flow)
  if (source !== 'chat' && typeof formLoadedAt === 'number') {
    const age = Date.now() - formLoadedAt;
    if (age < MIN_FORM_FILL_MS) {
      return res.status(400).json({ success: false, message: 'Formularen blev sendt for hurtigt. Prøv igen.' });
    }
    if (age > MAX_FORM_AGE_MS) {
      return res.status(400).json({ success: false, message: 'Formularen er udløbet. Genindlæs siden og prøv igen.' });
    }
  }

  // Rate limit: maks 5 submits / IP pr. time
  const clientIp = getClientIp(req);
  const rate = await checkAndLogIp({
    ip: clientIp,
    endpoint: '/api/submit-lead',
    windowSeconds: 3600,
    maxRequests: 5
  });
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds || 3600));
    return res.status(429).json({
      success: false,
      message: 'Du har sendt for mange beskeder på kort tid. Prøv igen om en time, eller ring direkte.'
    });
  }

  // Sanitering + validering af felter
  const cleanName = sanitizeText(name);
  const cleanPhone = sanitizeText(phone).replace(/\s+/g, ' ').trim();
  const cleanProblem = sanitizeText(problem);
  const cleanZip = zipCode ? sanitizeText(zipCode) : null;
  const cleanEmail = email ? sanitizeText(email) : null;

  if (!cleanName || cleanName.length < 2 || cleanName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ success: false, message: 'Navn er påkrævet (2-200 tegn)' });
  }
  const phoneDigits = cleanPhone.replace(/[^+\d]/g, '');
  if (!/^\+?\d{8,12}$/.test(phoneDigits)) {
    return res.status(400).json({ success: false, message: 'Ugyldigt telefonnummer' });
  }
  if (!cleanProblem || cleanProblem.length < 5) {
    return res.status(400).json({ success: false, message: 'Beskriv venligst problemet' });
  }
  if (cleanProblem.length > MAX_PROBLEM_LENGTH) {
    return res.status(400).json({ success: false, message: 'Beskrivelsen er for lang (maks 5000 tegn)' });
  }
  if (cleanZip && !/^\d{4}$/.test(cleanZip)) {
    return res.status(400).json({ success: false, message: 'Postnummer skal være 4 cifre' });
  }
  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ success: false, message: 'Ugyldig email-adresse' });
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
    name: cleanName,
    phone: cleanPhone,
    problem: cleanProblem,
    zip_code: cleanZip,
    priority: priority || 'PLANLAGT',
    insurance_claim: !!insuranceClaim,
    status: 'NY',
    source: leadSource,
    created_at: new Date().toISOString()
  };
  if (cleanEmail) insertRow.email = cleanEmail;
  if (conversation) insertRow.conversation_log = String(conversation).slice(0, 50000);

  const { error } = await supabase.from('leads').insert([insertRow]);

  if (error) {
    console.error('Lead insert error:', error);
    return res.status(500).json({ success: false, message: 'Der opstod en fejl. Prøv igen.' });
  }

  try {
    await notifyByEmail({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      zipCode: cleanZip,
      problem: cleanProblem,
      priority,
      source: leadSource,
      conversation
    });
  } catch (e) {
    console.error('Email notification failed (lead still saved):', e);
  }

  return res.status(200).json({ success: true, message: 'Tak! Vi kontakter dig hurtigst muligt.' });
}
