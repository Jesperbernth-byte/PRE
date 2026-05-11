// Minimal HMAC-SHA256 signed token (JWT-compatible) — no external deps.
// Used by all admin API endpoints to validate the caller is logged in.
//
// Required env var on Vercel: ADMIN_JWT_SECRET (any random ≥32-char string).

import crypto from 'crypto';

const ALGORITHM = 'HS256';
const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf-8');
}

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('ADMIN_JWT_SECRET er ikke sat (eller for kort) i Vercel env vars');
  }
  return secret;
}

export function signToken(payload) {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS
  };

  const headerEncoded = base64url(JSON.stringify({ alg: ALGORITHM, typ: 'JWT' }));
  const payloadEncoded = base64url(JSON.stringify(fullPayload));
  const data = `${headerEncoded}.${payloadEncoded}`;

  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${data}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [headerEncoded, payloadEncoded, signature] = parts;
  const data = `${headerEncoded}.${payloadEncoded}`;

  let expectedSignature;
  try {
    expectedSignature = crypto
      .createHmac('sha256', getSecret())
      .update(data)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  } catch {
    return null;
  }

  // Constant-time comparison
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(base64urlDecode(payloadEncoded));
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp !== 'number' || payload.exp < now) {
    return null;
  }

  return payload;
}

// Express-style middleware. Returns true if authorised (and you may continue),
// false if the request was rejected (response already sent with 401).
export function requireAuth(req, res) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Manglende eller ugyldigt auth-token' });
    return false;
  }

  const token = header.slice(7).trim();
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ success: false, message: 'Token er ugyldigt eller udløbet' });
    return false;
  }

  req.user = payload;
  return true;
}
