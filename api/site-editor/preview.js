import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import { requireAuth } from '../../lib/serverAuth.js';

/**
 * Upload user's uploaded image to GitHub
 */
// Maks 5 MB billede — Vercel serverless body limit er ~4.5 MB anyway,
// men vi tjekker eksplicit så fejlbeskeden bliver pænere.
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// Tilladte mime-types — vi accepterer ikke fx exotic formater eller SVG
// (SVG kan indeholde XSS via embedded scripts).
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

function detectMimeFromMagicBytes(buf) {
  if (buf.length < 12) return null;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  // WebP: 52 49 46 46 .. .. .. .. 57 45 42 50
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46
      && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
  return null;
}

async function uploadUserImageToGitHub(imageBase64Data, imageLocation) {
  try {
    console.log('Uploading user image to GitHub:', imageLocation);

    // Verificér declared mime-type
    const declaredMatch = imageBase64Data.match(/^data:(image\/[\w+]+);base64,/);
    const declaredMime = declaredMatch ? declaredMatch[1] : null;
    if (declaredMime && !ALLOWED_MIME.includes(declaredMime)) {
      throw new Error(`Filformat ${declaredMime} er ikke tilladt. Brug JPG, PNG eller WebP.`);
    }

    // Remove data:image/xxx;base64, prefix if present
    const base64Data = imageBase64Data.replace(/^data:image\/[\w+]+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Size check
    if (imageBuffer.length > MAX_IMAGE_BYTES) {
      throw new Error(`Billedet er for stort (${Math.round(imageBuffer.length / 1024)} KB). Maks 5 MB.`);
    }
    if (imageBuffer.length < 64) {
      throw new Error('Billedet er ugyldigt eller tomt.');
    }

    // Magic-bytes check — fanger bots/angreb der forfalsker mime-type
    const detectedMime = detectMimeFromMagicBytes(imageBuffer);
    if (!detectedMime || !ALLOWED_MIME.includes(detectedMime)) {
      throw new Error('Filen er ikke et gyldigt billede (JPG, PNG eller WebP).');
    }

    // Use detected mime for extension (mere pålideligt end declared)
    let extension = 'jpg';
    if (detectedMime === 'image/png') extension = 'png';
    else if (detectedMime === 'image/webp') extension = 'webp';

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${imageLocation}-${timestamp}.${extension}`;
    const githubPath = `PRE/public/${filename}`;

    // Upload to GitHub
    const uploadResponse = await fetch(
      `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${githubPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `PRE: Upload user image for ${imageLocation}`,
          content: imageBuffer.toString('base64'),
          branch: 'main'
        })
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`GitHub upload failed: ${errorData.message}`);
    }

    const uploadData = await uploadResponse.json();
    console.log('Image uploaded successfully to:', uploadData.content.path);

    // Return path relative to public folder (how it's referenced in code)
    return `/${filename}`;

  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error(`Kunne ikke uploade billede: ${error.message}`);
  }
}

export default async function handler(req, res) {
  // Set JSON response header
  res.setHeader('Content-Type', 'application/json');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({
      success: false,
      message: 'Supabase credentials mangler (SUPABASE_URL + SUPABASE_SERVICE_KEY skal sættes i Vercel env vars)'
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      success: false,
      message: 'GEMINI_API_KEY mangler i Vercel env vars'
    });
  }

  // Initialize clients inside handler to avoid module-level crashes on missing env vars
  const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY);
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const { analysis, username = 'admin', uploadedImageData } = req.body;

  if (!analysis || !analysis.specificChanges) {
    return res.status(400).json({
      success: false,
      message: 'Analysis med specificChanges er påkrævet'
    });
  }

  console.log('Preview request received:', {
    hasUploadedImage: !!uploadedImageData,
    username,
    changesCount: analysis.specificChanges.length
  });

  try {
    // Generate unique branch name
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const branchName = `preview/site-edit-${timestamp}-${random}`;

    // Get next version number
    const { data: versions, error: versionError} = await supabase
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

    // Upload user's image if provided.
    // For billede-ændringer er en virkende upload obligatorisk — vi kan ikke
    // generere kode der referer til en sti, hvis selve billedet ikke ligger
    // i repoet. Abort med klar fejl i stedet for at producere bruden kode.
    let uploadedImagePath = null;

    if (analysis.changeType === 'image') {
      if (!uploadedImageData) {
        return res.status(400).json({
          success: false,
          message: 'Du bad om en billede-ændring, men der er ikke uploadet noget billede. Upload et billede i chatten først.'
        });
      }
      try {
        console.log('User uploaded image - uploading to GitHub...');
        const imageLocation = analysis.imageLocation || 'logo';
        console.log('Image location:', imageLocation);
        uploadedImagePath = await uploadUserImageToGitHub(uploadedImageData, imageLocation);
        console.log('Image uploaded successfully:', uploadedImagePath);
      } catch (imageError) {
        console.error('Image upload failed:', imageError);
        return res.status(500).json({
          success: false,
          message: `Billede-upload fejlede: ${imageError.message}. Ingen kode-ændringer er gemt.`
        });
      }
    }

    // Generate actual code changes using Gemini AI
    const fileChanges = {};
    const changeDetails = [];

    for (const change of analysis.specificChanges) {
      const filePath = change.file;

      try {
        // Fetch current file content from GitHub
        const githubResponse = await fetch(
          `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${filePath}`,
          {
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );

        if (!githubResponse.ok) {
          throw new Error(`GitHub API error: ${githubResponse.status}`);
        }

        const githubData = await githubResponse.json();
        const currentContent = Buffer.from(githubData.content, 'base64').toString('utf-8');

        const codeGenPrompt = `
# DU ER KODE-GENERATOR FOR PR ENTREPRENØREN ApS WEBSITE

## CONTEXT
PR Entreprenøren ApS er en kloakmester-virksomhed på Fyn (Jacob & Preben).

**Ydelser:**
- Kloakering & renovering
- Omfangsdræn (vand i kælder)
- Rottespærre
- TV-inspektion
- Asbest (KUN begrænset!)

**Brand:**
- Jordnær, ærlig tone
- Blå (#1e3a8a) primær farve
- Orange (#ea580c) sekundær farve
- Professionelt men ikke "fancy"

## DIN OPGAVE
FIL: ${filePath}
HANDLING: ${change.action}
BESKRIVELSE: ${change.description}
${uploadedImagePath ? `\n🎯 VIGTIGT: NØJAGTIG BILLEDSTI: ${uploadedImagePath} ← BRUG PRÆCIS DENNE STI!` : ''}

## NUVÆRENDE FIL INDHOLD
\`\`\`
${currentContent}
\`\`\`

## REGLER FOR KODE-GENERERING
1. ✅ Returner HELE filen med ændringen
2. ✅ Bevar ALLE imports, exports, struktur
3. ✅ Ændr KUN det specificerede
4. ✅ Behold eksisterende styling og UI patterns
5. ✅ Brug danske tekster der passer til en kloakmester
${uploadedImagePath ? `6. 🎯 KRITISK: Brug billedstien PRÆCIS som den er: "${uploadedImagePath}" - tilføj IKKE /pre/ eller andet prefix!` : ''}

## TONE OF VOICE (hvis du ændrer tekst)
- ✅ Jordnær og direkte ("Vi fikser det")
- ✅ Professionel men ikke stiv
- ❌ ALDRIG marketing-fluff ("innovative løsninger", "unikke metoder")

## OUTPUT FORMAT
Returner KUN den nye fil-kode.
INGEN forklaring før eller efter.
INGEN markdown code blocks i output.

START OUTPUT:`;

        const result = await genAI.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: codeGenPrompt
        });
        let newContent = result.text.trim();

        // Remove markdown code blocks if present
        newContent = newContent.replace(/```typescript\n?/g, '').replace(/```tsx\n?/g, '').replace(/```javascript\n?/g, '').replace(/```jsx\n?/g, '').replace(/```css\n?/g, '').replace(/```\n?/g, '').trim();

        // Store the new content
        fileChanges[filePath] = newContent;

        changeDetails.push({
          file: filePath,
          action: change.action,
          summary: change.description,
          oldContent: currentContent,
          newContent: newContent
        });

      } catch (error) {
        console.error(`Error generating code for ${filePath}:`, error);
        throw new Error(`Kunne ikke generere kode for ${filePath}: ${error.message}`);
      }
    }

    // Create version record in database
    const { data: versionData, error: insertError } = await supabase
      .from('site_edit_versions')
      .insert({
        version_number: nextVersion,
        site_name: 'PRE',
        change_description: analysis.danishExplanation,
        change_prompt: req.body.originalPrompt || analysis.danishExplanation,
        changed_by: username,
        branch_name: branchName,
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

    // In Phase 2, we don't actually create git branches yet
    // That would require git operations on server which is complex
    // Instead, we just store the changes and return them for preview

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
    console.error('Full error stack:', error.stack);

    // Determine user-friendly error message
    let userMessage = 'Der opstod en fejl ved generering af preview';
    if (error.message) {
      userMessage = error.message;
    }

    return res.status(500).json({
      success: false,
      message: userMessage,
      error: error.message || 'Ukendt fejl',
      details: error.stack ? error.stack.substring(0, 300) : 'Ingen detaljer',
      timestamp: new Date().toISOString()
    });
  }
}
