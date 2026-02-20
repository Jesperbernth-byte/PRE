import { GoogleGenAI } from '@google/genai';

/**
 * Upload user's uploaded image to GitHub
 */
async function uploadUserImageToGitHub(imageBase64Data, imageLocation) {
  try {
    console.log('Uploading user image to GitHub:', imageLocation);

    // Remove data:image/xxx;base64, prefix if present
    const base64Data = imageBase64Data.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Detect file extension from base64 header
    let extension = 'jpg';
    if (imageBase64Data.startsWith('data:image/png')) {
      extension = 'png';
    } else if (imageBase64Data.startsWith('data:image/webp')) {
      extension = 'webp';
    } else if (imageBase64Data.startsWith('data:image/svg')) {
      extension = 'svg';
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${imageLocation}-${timestamp}.${extension}`;
    const githubPath = `public/${filename}`;

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
          message: `AI: Upload user image for ${imageLocation}`,
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
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: 'GITHUB_TOKEN mangler i Vercel env vars' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ success: false, message: 'GEMINI_API_KEY mangler i Vercel env vars' });
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const { analysis, originalPrompt = '', uploadedImageData } = req.body;

  if (!analysis) {
    return res.status(400).json({ success: false, message: 'Ingen analyse modtaget. Prøv igen.' });
  }
  if (!analysis.specificChanges || analysis.specificChanges.length === 0) {
    return res.status(400).json({ success: false, message: 'AI\'en fandt ingen specifikke ændringer. Prøv at beskriv mere konkret – fx "Skift Prebens telefon til 12 34 56 78".' });
  }

  // Map from analyze.js file paths (which may have PRE/ prefix) to actual repo paths
  const normalizeFilePath = (p) => p.replace(/^PRE\//, '');

  const updatedFiles = [];

  try {
    // Upload user's image if provided AND if the analysis is about changing an image
    let uploadedImagePath = null;
    if (uploadedImageData && analysis.changeType === 'image') {
      try {
        console.log('User uploaded image - uploading to GitHub...');
        const imageLocation = analysis.imageLocation || 'logo';
        uploadedImagePath = await uploadUserImageToGitHub(uploadedImageData, imageLocation);
        console.log('Image uploaded successfully:', uploadedImagePath);
      } catch (imageError) {
        console.error('Image upload failed:', imageError);
        return res.status(500).json({
          success: false,
          message: `Billede upload fejlede: ${imageError.message}`
        });
      }
    }

    for (const change of analysis.specificChanges) {
      const filePath = normalizeFilePath(change.file);

      // Fetch current file from GitHub
      const getResponse = await fetch(
        `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${filePath}`,
        {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!getResponse.ok) {
        throw new Error(`Kunne ikke hente fil fra GitHub: ${filePath} (${getResponse.status})`);
      }

      const fileData = await getResponse.json();
      const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const fileSha = fileData.sha;

      // Generate new content with Gemini
      const prompt = `
# KODE-GENERATOR FOR PR ENTREPRENØREN ApS WEBSITE

## OPGAVE
FIL: ${filePath}
HANDLING: ${change.action}
BESKRIVELSE: ${change.description}
${uploadedImagePath ? `\n🎯 VIGTIGT: NØJAGTIG BILLEDSTI: ${uploadedImagePath} ← BRUG PRÆCIS DENNE STI!\nBrugeren har uploadet et nyt billede som skal bruges. Erstat den gamle billedsti med: "${uploadedImagePath}"` : ''}

## NUVÆRENDE FIL
\`\`\`
${currentContent}
\`\`\`

## REGLER
1. Returner HELE filen med KUN den specificerede ændring
2. Bevar ALLE imports, exports, og filstruktur
3. Ændr KUN det specificerede - intet mere
4. Brug danske tekster der passer til en kloakmester
5. Hold eksisterende Tailwind klasser og styling
${uploadedImagePath ? `6. 🎯 KRITISK: Brug billedstien PRÆCIS som den er: "${uploadedImagePath}" - tilføj IKKE /pre/ eller andet prefix!` : ''}

OUTPUT: Returner KUN kildekoden. INGEN forklaring. INGEN markdown code blocks.`;

      const result = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      let newContent = result.text.trim();
      // Strip markdown if present
      newContent = newContent
        .replace(/^```(?:typescript|tsx|javascript|jsx|css)?\n?/gm, '')
        .replace(/^```\n?/gm, '')
        .trim();

      // Write updated file to GitHub
      const updateResponse = await fetch(
        `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `AI: ${analysis.danishExplanation || originalPrompt}\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`,
            content: Buffer.from(newContent).toString('base64'),
            sha: fileSha
          })
        }
      );

      if (!updateResponse.ok) {
        const errData = await updateResponse.json();
        throw new Error(`GitHub skrivefejl på ${filePath}: ${errData.message}`);
      }

      updatedFiles.push(filePath);
    }

    return res.status(200).json({
      success: true,
      message: `Ændringen er applied! Sitet opdateres om 1-2 minutter.`,
      updatedFiles,
      deploymentUrl: 'https://prentreprenoer.dk'
    });

  } catch (error) {
    console.error('Apply error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Der opstod en fejl'
    });
  }
}
