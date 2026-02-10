import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

  // Check environment variables
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({
      success: false,
      message: 'Supabase credentials mangler'
    });
  }

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

    // Upload user's image if provided
    let uploadedImagePath = null;
    let imageUploadWarning = null;

    // Check if user uploaded an image AND if the analysis is about changing an image
    if (uploadedImageData && analysis.changeType === 'image') {
      try {
        console.log('User uploaded image - uploading to GitHub...');
        console.log('Image location:', analysis.imageLocation || 'logo');

        const imageLocation = analysis.imageLocation || 'logo';
        uploadedImagePath = await uploadUserImageToGitHub(uploadedImageData, imageLocation);

        console.log('Image uploaded successfully:', uploadedImagePath);
      } catch (imageError) {
        console.error('Image upload failed:', imageError);
        imageUploadWarning = `⚠️ Billede upload fejlede: ${imageError.message}`;
        // Don't throw - let preview continue without image
      }
    } else if (analysis.changeType === 'image' && !uploadedImageData) {
      imageUploadWarning = '⚠️ Intet billede uploadet. Upload et billede i chatten først.';
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

        // Use Gemini to generate new file content
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

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

        const result = await model.generateContent(codeGenPrompt);
        const response = await result.response;
        let newContent = response.text().trim();

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
      message: imageUploadWarning || 'Preview genereret',
      version: versionData,
      fileChanges,
      changeDetails,
      warning: imageUploadWarning,
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
