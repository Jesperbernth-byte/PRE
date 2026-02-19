export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: 'GITHUB_TOKEN mangler i Vercel env vars' });
  }

  const { content, sha, changeDescription = 'Admin: Indholdsændring via Rediger Indhold' } = req.body;

  if (!content || !sha) {
    return res.status(400).json({ success: false, message: 'content og sha er påkrævet' });
  }

  try {
    // Validate content is valid JSON object
    if (typeof content !== 'object') {
      return res.status(400).json({ success: false, message: 'content skal være et JSON objekt' });
    }

    const newContentString = JSON.stringify(content, null, 2) + '\n';

    // Write updated file to GitHub
    const updateResponse = await fetch(
      'https://api.github.com/repos/Jesperbernth-byte/PRE/contents/site-content.json',
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `${changeDescription}\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`,
          content: Buffer.from(newContentString).toString('base64'),
          sha
        })
      }
    );

    if (!updateResponse.ok) {
      const errData = await updateResponse.json();
      throw new Error(`GitHub API error: ${errData.message}`);
    }

    const updateData = await updateResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Indhold gemt! Sitet opdateres om 1-2 minutter.',
      newSha: updateData.content.sha,
      commitSha: updateData.commit.sha
    });
  } catch (error) {
    console.error('Content save error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
