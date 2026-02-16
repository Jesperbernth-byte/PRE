export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Get credentials from environment variables
  const adminUsername = process.env.PRE_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.PRE_ADMIN_PASSWORD;

  // Check if environment variables are set
  if (!adminPassword) {
    console.error('PRE_ADMIN_PASSWORD environment variable is not set');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error. Contact administrator.'
    });
  }

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // Generate a simple session token (in production, use proper JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      token,
      message: 'Login successful'
    });
  }

  // Invalid credentials
  return res.status(401).json({
    success: false,
    message: 'Forkert brugernavn eller adgangskode'
  });
}
