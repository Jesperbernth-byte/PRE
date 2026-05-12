import { requireAuth } from '../../lib/serverAuth.js';

// Strukturel validering af site-content.json. Vi tjekker at de felter
// koden importerer fra constants.tsx faktisk findes — så Jacob ikke
// kan gemme et tomt eller halvt-slettet JSON-objekt der crasher sitet.
function validateSiteContent(content) {
  const errors = [];

  const requireObject = (path, value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`${path} skal være et objekt`);
      return false;
    }
    return true;
  };

  const requireString = (path, value) => {
    if (typeof value !== 'string' || value.trim().length === 0) {
      errors.push(`${path} skal være en ikke-tom tekst`);
    }
  };

  const requireArray = (path, value) => {
    if (!Array.isArray(value)) {
      errors.push(`${path} skal være en liste`);
    }
  };

  if (!requireObject('content', content)) return errors;

  if (requireObject('company', content.company)) {
    requireString('company.name', content.company.name);
    requireString('company.tagline', content.company.tagline);
    requireString('company.cvr', content.company.cvr);
    requireString('company.address', content.company.address);
  }

  if (requireObject('contacts', content.contacts)) {
    for (const person of ['preben', 'jacob']) {
      if (requireObject(`contacts.${person}`, content.contacts[person])) {
        requireString(`contacts.${person}.phone`, content.contacts[person].phone);
        requireString(`contacts.${person}.email`, content.contacts[person].email);
        requireString(`contacts.${person}.title`, content.contacts[person].title);
      }
    }
    if (requireObject('contacts.info', content.contacts.info)) {
      requireString('contacts.info.email', content.contacts.info.email);
    }
    if (requireObject('contacts.faktura', content.contacts.faktura)) {
      requireString('contacts.faktura.email', content.contacts.faktura.email);
    }
  }

  if (requireObject('header', content.header)) {
    requireString('header.logoPath', content.header.logoPath);
    requireString('header.logoAlt', content.header.logoAlt);
  }

  if (requireObject('hero', content.hero)) {
    requireString('hero.title', content.hero.title);
    requireString('hero.subtitle', content.hero.subtitle);
    requireString('hero.imagePath', content.hero.imagePath);
  }

  if (requireObject('footer', content.footer)) {
    requireString('footer.tagline', content.footer.tagline);
    requireString('footer.serviceArea', content.footer.serviceArea);
  }

  requireArray('faq', content.faq);
  if (Array.isArray(content.faq)) {
    content.faq.forEach((item, i) => {
      if (!item || typeof item !== 'object') {
        errors.push(`faq[${i}] skal være et objekt`);
        return;
      }
      requireString(`faq[${i}].question`, item.question);
      requireString(`faq[${i}].answer`, item.answer);
    });
  }

  requireArray('certifications', content.certifications);
  if (Array.isArray(content.certifications)) {
    content.certifications.forEach((item, i) => {
      if (!item || typeof item !== 'object') {
        errors.push(`certifications[${i}] skal være et objekt`);
        return;
      }
      requireString(`certifications[${i}].name`, item.name);
      requireString(`certifications[${i}].issuer`, item.issuer);
      requireString(`certifications[${i}].badge`, item.badge);
    });
  }

  return errors;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

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

    const validationErrors = validateSiteContent(content);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Indholdet kan ikke gemmes — nogle felter mangler eller er forkert udfyldt.',
        validationErrors
      });
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
