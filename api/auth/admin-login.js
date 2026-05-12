import { signToken } from '../../lib/serverAuth.js';
import { checkAndLogIp, getClientIp } from '../../lib/rateLimit.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limit: maks 5 forsøg pr. IP pr. 15 min (mod brute force).
  // Vi logger ALLE forsøg, ikke kun fejlede — så simpel og effektiv.
  const clientIp = getClientIp(req);
  const rate = await checkAndLogIp({
    ip: clientIp,
    endpoint: '/api/auth/admin-login',
    windowSeconds: 900,
    maxRequests: 5
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

  if (username !== adminUsername || password !== adminPassword) {
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
