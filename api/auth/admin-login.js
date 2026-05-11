import { signToken } from '../../lib/serverAuth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
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
