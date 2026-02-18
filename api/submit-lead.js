import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, problem, zipCode, priority, insuranceClaim } = req.body;

  // Server-side validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Navn er påkrævet (min. 2 tegn)' });
  }
  if (!phone || phone.replace(/\s/g, '').length < 8) {
    return res.status(400).json({ success: false, message: 'Ugyldigt telefonnummer' });
  }
  if (!problem || problem.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Beskriv venligst problemet' });
  }

  // Use service key — bypasses RLS completely, never exposed to client
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error } = await supabase.from('leads').insert([{
    name: name.trim(),
    phone: phone.trim(),
    problem: problem.trim(),
    zip_code: zipCode?.trim() || null,
    priority: priority || 'PLANLAGT',
    insurance_claim: insuranceClaim || false,
    status: 'NY',
    created_at: new Date().toISOString()
  }]);

  if (error) {
    console.error('Lead insert error:', error);
    return res.status(500).json({ success: false, message: 'Der opstod en fejl. Prøv igen.' });
  }

  return res.status(200).json({ success: true, message: 'Tak! Vi kontakter dig hurtigst muligt.' });
}
