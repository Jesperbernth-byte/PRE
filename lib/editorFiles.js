// Delt server-side logik for AI Site-Editoren:
//  - fil-whitelist (håndhæves i BÅDE analyze, preview og deploy)
//  - sanering af filnavne/imageLocation
//  - validering af AI-genereret filindhold før det gemmes/deployes
//  - strukturel validering af site-content.json (delt med api/content/save.js)
//
// VIGTIGT: Stierne er relative til REPO-RODEN (repoet har ingen PRE/-mappe).

export const GITHUB_OWNER = 'Jesperbernth-byte';
export const GITHUB_REPO = 'PRE';
export const GITHUB_BRANCH = 'main';

// Kun disse filer må AI-editoren læse og skrive. Bevidst udeladt:
// App.tsx (routing — en runtime-fejl her white-screener hele sitet),
// api/**, lib/**, vercel.json, package.json, index.tsx.
export const ALLOWED_FILES = [
  'site-content.json',
  'constants.tsx',
  'index.css',
  'index.html',
  'pages/Home.tsx',
  'pages/About.tsx',
  'pages/Services.tsx',
  'pages/ServiceDetail.tsx',
  'pages/Contact.tsx',
  'pages/Careers.tsx',
  'pages/Memberships.tsx',
  'pages/CityLanding.tsx',
  'pages/CustomPage.tsx',
  'components/Navbar.tsx'
];

export function isFileAllowed(filePath) {
  if (typeof filePath !== 'string' || !filePath) return false;
  // Path traversal / absolutte stier / windows-separatorer afvises altid.
  if (filePath.includes('..') || filePath.includes('\\') || filePath.startsWith('/')) return false;
  if (ALLOWED_FILES.includes(filePath)) return true;
  // Billeder og assets under public/ er tilladt.
  if (filePath.startsWith('public/')) return true;
  return false;
}

// imageLocation kommer fra klienten (via AI-analysen) og indgår i et
// filnavn — tillad kun små bogstaver, tal og bindestreger.
export function sanitizeImageLocation(location) {
  const cleaned = String(location || '')
    .toLowerCase()
    .replace(/[æå]/g, 'a')
    .replace(/ø/g, 'o')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return cleaned || 'billede';
}

const FORBIDDEN_CODE_PATTERNS = [
  /\beval\s*\(/i,
  /new\s+Function\s*\(/i,
  /dangerouslySetInnerHTML/i,
  /document\.write/i,
  /<script[\s>]/i
];

// Validerer AI-genereret filindhold FØR det gemmes som preview/deployes.
// Returnerer en liste af fejl (tom = OK).
export function validateGeneratedContent(filePath, newContent, oldContent) {
  const errors = [];

  if (typeof newContent !== 'string' || newContent.trim().length === 0) {
    return [`${filePath}: genereret indhold er tomt`];
  }

  if (filePath.endsWith('.json')) {
    let parsed;
    try {
      parsed = JSON.parse(newContent);
    } catch (e) {
      return [`${filePath}: ugyldig JSON (${e.message})`];
    }
    if (filePath === 'site-content.json') {
      errors.push(...validateSiteContent(parsed));
    }
    return errors;
  }

  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
    for (const pattern of FORBIDDEN_CODE_PATTERNS) {
      if (pattern.test(newContent) && !(oldContent && pattern.test(oldContent))) {
        errors.push(`${filePath}: indeholder forbudt mønster (${pattern.source})`);
      }
    }

    const open = (newContent.match(/[{[]/g) || []).length;
    const close = (newContent.match(/[}\]]/g) || []).length;
    if (open !== close) {
      errors.push(`${filePath}: ubalancerede klammer ({ } / [ ]) — koden er sandsynligvis afkortet`);
    }

    if ((filePath.endsWith('.tsx') || filePath.endsWith('.ts')) && !/export\s+(default\s+)?/.test(newContent)) {
      errors.push(`${filePath}: mangler export — filen ville bryde builder`);
    }

    // Beskyt mod at AI'en "glemmer" store dele af filen.
    if (oldContent) {
      const oldLines = oldContent.split('\n').length;
      const newLines = newContent.split('\n').length;
      if (oldLines > 40 && newLines < oldLines * 0.5) {
        errors.push(`${filePath}: over halvdelen af filen forsvandt (${oldLines} → ${newLines} linjer) — afvist for en sikkerheds skyld`);
      }
      const oldImports = oldContent.match(/^import\s.+from\s+['"][^'"]+['"];?$/gm) || [];
      const missing = oldImports.filter(imp => !newContent.includes(imp.replace(/;$/, '')));
      if (missing.length > 0) {
        errors.push(`${filePath}: ${missing.length} import(s) blev fjernet — det bryder typisk builder`);
      }
    }
  }

  return errors;
}

// Strukturel validering af site-content.json. Sikrer at felterne som
// constants.tsx importerer faktisk findes, så et halvt-slettet JSON-objekt
// ikke crasher sitet.
export function validateSiteContent(content) {
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

  // customPages er valgfri, men skal være velformet når den findes —
  // det er den mekanisme AI-editoren bruger til at oprette nye sider.
  if (content.customPages !== undefined) {
    requireArray('customPages', content.customPages);
    if (Array.isArray(content.customPages)) {
      content.customPages.forEach((page, i) => {
        if (!page || typeof page !== 'object') {
          errors.push(`customPages[${i}] skal være et objekt`);
          return;
        }
        requireString(`customPages[${i}].slug`, page.slug);
        if (typeof page.slug === 'string' && !/^[a-z0-9-]+$/.test(page.slug)) {
          errors.push(`customPages[${i}].slug må kun indeholde små bogstaver, tal og bindestreger`);
        }
        requireString(`customPages[${i}].title`, page.title);
        requireArray(`customPages[${i}].sections`, page.sections);
        if (Array.isArray(page.sections)) {
          page.sections.forEach((section, j) => {
            if (!section || typeof section !== 'object') {
              errors.push(`customPages[${i}].sections[${j}] skal være et objekt`);
              return;
            }
            requireString(`customPages[${i}].sections[${j}].text`, section.text);
          });
        }
      });
    }
  }

  return errors;
}

export function githubHeaders() {
  return {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };
}

export function githubContentsUrl(filePath, withRef = false) {
  const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
  const base = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodedPath}`;
  return withRef ? `${base}?ref=${GITHUB_BRANCH}` : base;
}
