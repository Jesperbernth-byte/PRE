import crypto from 'crypto';
import { signToken } from '../../lib/serverAuth.js';
import { checkAndLogIp, getClientIp } from '../../lib/rateLimit.js';

// Konstant-tid sammenligning så login ikke lækker information via timing.
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a ?? ''));
  const bufB = Buffer.from(String(b ?? ''));
  if (bufA.length !== bufB.length) {
    // Sammenlign alligevel mod os selv så tidsforbruget er ens.
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limit: maks 5 forsøg pr. IP pr. 15 min (mod brute force).
  // Vi logger ALLE forsøg, ikke kun fejlede — så simpel og effektiv.
  // failClosed: på login-endpointet afviser vi hvis rate-limit-tjekket
  // fejler — ellers kan brute-force omgås ved at presse Supabase i knæ.
  const clientIp = getClientIp(req);
  const rate = await checkAndLogIp({
    ip: clientIp,
    endpoint: '/api/auth/admin-login',
    windowSeconds: 900,
    maxRequests: 5,
    failClosed: true
  });
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds || 900));
    return res.status(429).json({
      success: false,
      message: 'For mange login-forsøg. Prøv igen om 15 minutter.'
    });
  }

  const { username, password } = req.body || {};

  const adminUsername = process.env.PRE_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.PRE_ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('PRE_ADMIN_PASSWORD environment variable is not set');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error. Contact administrator.'
    });
  }

  const usernameOk = safeEqual(username, adminUsername);
  const passwordOk = safeEqual(password, adminPassword);
  if (!usernameOk || !passwordOk) {
    return res.status(401).json({
      success: false,
      message: 'Forkert brugernavn eller adgangskode'
    });
  }

  let token;
  try {
    token = signToken({ sub: username, role: 'admin' });
  } catch (err) {
    console.error('Token signing failed:', err);
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: ' + err.message
    });
  }

  return res.status(200).json({
    success: true,
    token,
    expiresIn: 60 * 60 * 24,
    message: 'Login successful'
  });
}
