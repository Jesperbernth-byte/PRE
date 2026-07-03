import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import { requireAuth } from '../../lib/serverAuth.js';
import {
  isFileAllowed,
  sanitizeImageLocation,
  validateGeneratedContent,
  githubHeaders,
  githubContentsUrl
} from '../../lib/editorFiles.js';

// Maks 4 MB billede — Vercel serverless body limit er ~4.5 MB.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Tilladte mime-types — ikke SVG (kan indeholde XSS via embedded scripts).
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

function detectMimeFromMagicBytes(buf) {
  if (buf.length < 12) return null;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  // WebP: RIFF....WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46
      && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
  return null;
}

async function uploadUserImageToGitHub(imageBase64Data, imageLocation) {
  const declaredMatch = imageBase64Data.match(/^data:(image\/[\w+]+);base64,/);
  const declaredMime = declaredMatch ? declaredMatch[1] : null;
  if (declaredMime && !ALLOWED_MIME.includes(declaredMime)) {
    throw new Error(`Filformat ${declaredMime} er ikke tilladt. Brug JPG, PNG eller WebP.`);
  }

  const base64Data = imageBase64Data.replace(/^data:image\/[\w+]+;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');

  if (imageBuffer.length > MAX_IMAGE_BYTES) {
    throw new Error(`Billedet er for stort (${Math.round(imageBuffer.length / 1024)} KB). Maks 4 MB.`);
  }
  if (imageBuffer.length < 64) {
    throw new Error('Billedet er ugyldigt eller tomt.');
  }

  const detectedMime = detectMimeFromMagicBytes(imageBuffer);
  if (!detectedMime || !ALLOWED_MIME.includes(detectedMime)) {
    throw new Error('Filen er ikke et gyldigt billede (JPG, PNG eller WebP).');
  }

  let extension = 'jpg';
  if (detectedMime === 'image/png') extension = 'png';
  else if (detectedMime === 'image/webp') extension = 'webp';

  // imageLocation er klient-styret → saneres så det ikke kan bruges til
  // path traversal. Uploads samles i public/uploads/.
  const safeLocation = sanitizeImageLocation(imageLocation);
  const filename = `${safeLocation}-${Date.now()}.${extension}`;
  const githubPath = `public/uploads/${filename}`;

  const uploadResponse = await fetch(githubContentsUrl(githubPath), {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify({
      message: `Admin: Upload billede (${safeLocation})`,
      content: imageBuffer.toString('base64'),
      branch: 'main'
    })
  });

  if (!uploadResponse.ok) {
    const errorData = await uploadResponse.json().catch(() => ({ message: uploadResponse.statusText }));
    throw new Error(`GitHub upload fejlede: ${errorData.message}`);
  }

  // Stien som den refereres fra koden (public/ er web-roden).
  return `/uploads/${filename}`;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({
      success: false,
      message: 'Supabase credentials mangler (SUPABASE_URL + SUPABASE_SERVICE_KEY skal sættes i Vercel env vars)'
    });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ success: false, message: 'GEMINI_API_KEY mangler i Vercel env vars' });
  }
  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: 'GITHUB_TOKEN mangler i Vercel env vars' });
  }

  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY);
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const { analysis, username = req.user?.sub || 'admin', uploadedImageData } = req.body;

  if (!analysis || !Array.isArray(analysis.specificChanges) || analysis.specificChanges.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Analysis med specificChanges er påkrævet'
    });
  }

  // Whitelist håndhæves HER (ikke kun i analyze) — request-body er
  // klient-kontrolleret og må aldrig kunne pege på vilkårlige filer.
  const requestedFiles = analysis.specificChanges.map(c => c.file);
  const unauthorized = [...new Set(requestedFiles.filter(f => !isFileAllowed(f)))];
  if (unauthorized.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Følgende filer må ikke redigeres: ${unauthorized.join(', ')}`
    });
  }

  try {
    // Næste versionsnummer
    const { data: versions, error: versionError } = await supabase
      .from('site_edit_versions')
      .select('version_number')
      .eq('site_name', 'PRE')
      .order('version_number', { ascending: false })
      .limit(1);

    if (versionError) {
      console.error('Supabase version error:', versionError);
    }

    const nextVersion = versions && versions.length > 0
      ? versions[0].version_number + 1
      : 1;

    // Billede-upload: obligatorisk ved billede-ændringer, ellers ville vi
    // generere kode der peger på en sti uden fil bag.
    let uploadedImagePath = null;

    if (analysis.changeType === 'image') {
      if (!uploadedImageData) {
        return res.status(400).json({
          success: false,
          message: 'Du bad om en billede-ændring, men der er ikke uploadet noget billede. Upload et billede i chatten først (📷-knappen).'
        });
      }
      try {
        uploadedImagePath = await uploadUserImageToGitHub(uploadedImageData, analysis.imageLocation);
      } catch (imageError) {
        console.error('Image upload failed:', imageError);
        return res.status(500).json({
          success: false,
          message: `Billede-upload fejlede: ${imageError.message}. Ingen kode-ændringer er gemt.`
        });
      }
    }

    // Generér kode-ændringer med Gemini — én fil ad gangen
    const fileChanges = {};
    const changeDetails = [];

    for (const change of analysis.specificChanges) {
      const filePath = change.file;

      // Hent nuværende filindhold fra GitHub (repo-rod, intet PRE/-prefix)
      const githubResponse = await fetch(githubContentsUrl(filePath, true), {
        headers: githubHeaders()
      });

      if (!githubResponse.ok) {
        throw new Error(`Kunne ikke hente ${filePath} fra GitHub (${githubResponse.status})`);
      }

      const githubData = await githubResponse.json();
      const currentContent = Buffer.from(githubData.content, 'base64').toString('utf-8');

      const codeGenPrompt = `
# DU ER KODE-GENERATOR FOR PR ENTREPRENØREN ApS WEBSITE

## CONTEXT
PR Entreprenøren ApS er en autoriseret kloakmester-virksomhed på Fyn (React + TypeScript + Tailwind site).

**Brand:**
- Jordnær, ærlig tone — ALDRIG marketing-fluff
- Blå (#1e3a8a) primær farve, orange (#ea580c) sekundær
- INGEN priser eller beløb må optræde på sitet
- Asbest må KUN omtales som autorisation, aldrig som ydelse

## DIN OPGAVE
FIL: ${filePath}
HANDLING: ${change.action}
BESKRIVELSE: ${change.description}
${uploadedImagePath ? `\n🎯 VIGTIGT: NØJAGTIG BILLEDSTI: ${uploadedImagePath} ← brug PRÆCIS denne sti, uden ekstra prefix!` : ''}

## NUVÆRENDE FIL INDHOLD
\`\`\`
${currentContent}
\`\`\`

## REGLER
1. ✅ Returner HELE filen med ændringen — aldrig kun et udsnit
2. ✅ Bevar ALLE imports, exports og struktur
3. ✅ Ændr KUN det specificerede
4. ✅ Behold eksisterende styling og UI-mønstre
5. ✅ Dansk tekst der passer til en kloakmester (jordnær, direkte)
6. ✅ Er filen JSON: outputtet SKAL være valid JSON med præcis samme struktur

## OUTPUT
KUN den nye fil-kode. INGEN forklaring. INGEN markdown code blocks.

START OUTPUT:`;

      const result = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: codeGenPrompt
      });
      let newContent = result.text.trim();
      newContent = newContent
        .replace(/^```(typescript|tsx|javascript|jsx|css|json|html)?\n?/g, '')
        .replace(/```\s*$/g, '')
        .trim();

      // Validering FØR vi gemmer — fanger afkortede filer, ugyldig JSON,
      // fjernede imports osv., så en brudt fil aldrig når deploy-knappen.
      const validationErrors = validateGeneratedContent(filePath, newContent, currentContent);
      if (validationErrors.length > 0) {
        return res.status(422).json({
          success: false,
          message: `Den genererede ændring bestod ikke sikkerhedstjekket og er IKKE gemt:\n- ${validationErrors.join('\n- ')}\n\nPrøv at formulere ønsket mere præcist, eller del det op i mindre ændringer.`
        });
      }

      fileChanges[filePath] = newContent;
      changeDetails.push({
        file: filePath,
        action: change.action,
        summary: change.description,
        oldContent: currentContent,
        newContent: newContent
      });
    }

    // Gem version i databasen (deploy-endpointet skubber den til GitHub)
    const { data: versionData, error: insertError } = await supabase
      .from('site_edit_versions')
      .insert({
        version_number: nextVersion,
        site_name: 'PRE',
        change_description: analysis.danishExplanation,
        change_prompt: req.body.originalPrompt || analysis.danishExplanation,
        changed_by: username,
        branch_name: null,
        files_changed: fileChanges,
        change_details: changeDetails,
        status: 'preview'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error('Kunne ikke gemme version i database');
    }

    return res.status(200).json({
      success: true,
      message: 'Preview genereret',
      version: versionData,
      fileChanges,
      changeDetails,
      uploadedImagePath
    });

  } catch (error) {
    console.error('Preview Generation Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Der opstod en fejl ved generering af preview',
      error: error.message || 'Ukendt fejl'
    });
  }
}
