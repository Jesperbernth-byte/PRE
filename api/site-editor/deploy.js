import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Set JSON response header
  res.setHeader('Content-Type', 'application/json');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { versionId, username = 'admin' } = req.body;

  if (!versionId) {
    return res.status(400).json({
      success: false,
      message: 'versionId er påkrævet'
    });
  }

  try {
    // Get version from database
    const { data: version, error: fetchError } = await supabase
      .from('site_edit_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (fetchError || !version) {
      throw new Error('Version ikke fundet');
    }

    // Check if already deployed
    if (version.status === 'deployed') {
      return res.status(400).json({
        success: false,
        message: 'Denne version er allerede deployet'
      });
    }

    // Check if status is preview
    if (version.status !== 'preview') {
      return res.status(400).json({
        success: false,
        message: 'Kun preview versioner kan godkendes'
      });
    }

    // Get file changes from version
    const fileChanges = version.files_changed;

    if (!fileChanges || Object.keys(fileChanges).length === 0) {
      throw new Error('Ingen fil ændringer at deploye');
    }

    // Update files via GitHub API
    const updatedFiles = [];

    for (const [filePath, newContent] of Object.entries(fileChanges)) {
      try {
        // Get current file SHA from GitHub
        const getFileResponse = await fetch(
          `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${filePath}`,
          {
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );

        if (!getFileResponse.ok) {
          throw new Error(`Kunne ikke hente fil fra GitHub: ${filePath}`);
        }

        const fileData = await getFileResponse.json();
        const fileSha = fileData.sha;

        // Update file via GitHub API
        const updateFileResponse = await fetch(
          `https://api.github.com/repos/Jesperbernth-byte/PRE/contents/${filePath}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `PRE: ${version.change_description}\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`,
              content: Buffer.from(newContent).toString('base64'),
              sha: fileSha,
              branch: 'main'
            })
          }
        );

        if (!updateFileResponse.ok) {
          const errorData = await updateFileResponse.json();
          throw new Error(`GitHub API error: ${errorData.message}`);
        }

        const updateData = await updateFileResponse.json();
        updatedFiles.push(filePath);

      } catch (error) {
        console.error(`Error updating file ${filePath}:`, error);
        throw new Error(`Kunne ikke opdatere ${filePath}: ${error.message}`);
      }
    }

    // Get latest commit SHA
    const branchResponse = await fetch(
      'https://api.github.com/repos/Jesperbernth-byte/PRE/branches/main',
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const branchData = await branchResponse.json();
    const commitSha = branchData.commit.sha;

    // Update database with deployment info
    const { error: updateError } = await supabase
      .from('site_edit_versions')
      .update({
        status: 'deployed',
        deployed_at: new Date().toISOString(),
        commit_sha: commitSha,
        deployment_url: process.env.PRE_SITE_URL || 'https://prentreprenoer.dk'
      })
      .eq('id', versionId);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    return res.status(200).json({
      success: true,
      message: 'Ændringerne er nu deployet! Vercel bygger sitet - det er live om 1-2 minutter.',
      updatedFiles,
      commitSha,
      deploymentUrl: process.env.PRE_SITE_URL || 'https://prentreprenoer.dk',
      version: {
        ...version,
        status: 'deployed',
        deployed_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Deployment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved deployment',
      error: error.message
    });
  }
}
