export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: 'GITHUB_TOKEN mangler i Vercel env vars' });
  }

  try {
    const response = await fetch(
      'https://api.github.com/repos/Jesperbernth-byte/PRE/contents/site-content.json',
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));

    return res.status(200).json({
      success: true,
      content,
      sha: data.sha
    });
  } catch (error) {
    console.error('Content read error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
