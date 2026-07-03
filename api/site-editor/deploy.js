import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../lib/serverAuth.js';
import {
  isFileAllowed,
  validateGeneratedContent,
  githubHeaders,
  githubContentsUrl,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH
} from '../../lib/editorFiles.js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: 'GITHUB_TOKEN mangler i Vercel env vars' });
  }

  const { versionId, username = req.user?.sub || 'admin' } = req.body || {};

  if (!versionId) {
    return res.status(400).json({ success: false, message: 'versionId er påkrævet' });
  }

  try {
    const { data: version, error: fetchError } = await supabase
      .from('site_edit_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (fetchError || !version) {
      return res.status(404).json({ success: false, message: 'Version ikke fundet' });
    }

    if (version.status === 'deployed') {
      return res.status(400).json({ success: false, message: 'Denne version er allerede deployet' });
    }
    if (version.status !== 'preview') {
      return res.status(400).json({ success: false, message: 'Kun preview versioner kan godkendes' });
    }

    const fileChanges = version.files_changed;
    if (!fileChanges || Object.keys(fileChanges).length === 0) {
      throw new Error('Ingen fil ændringer at deploye');
    }

    // Whitelist håndhæves også her — versioner i databasen kan i princippet
    // være manipuleret, og deploy er sidste chance for at stoppe dem.
    const files = Object.keys(fileChanges);
    const unauthorized = files.filter(f => !isFileAllowed(f));
    if (unauthorized.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Følgende filer må ikke deployes: ${unauthorized.join(', ')}`
      });
    }

    // change_details indeholder oldContent fra preview-tidspunktet — bruges
    // både til konflikt-tjek og som kilde ved en senere rollback.
    const detailsByFile = {};
    for (const d of (version.change_details || [])) {
      if (d && d.file) detailsByFile[d.file] = d;
    }

    const updatedFiles = [];

    for (const [filePath, newContent] of Object.entries(fileChanges)) {
      // Genvalidér inden push — samme tjek som ved preview.
      const oldContent = detailsByFile[filePath]?.oldContent;
      const validationErrors = validateGeneratedContent(filePath, newContent, oldContent);
      if (validationErrors.length > 0) {
        return res.status(422).json({
          success: false,
          message: `Versionen bestod ikke sikkerhedstjekket og er IKKE deployet:\n- ${validationErrors.join('\n- ')}`
        });
      }

      // Hent nuværende fil (sha + indhold)
      const getFileResponse = await fetch(githubContentsUrl(filePath, true), {
        headers: githubHeaders()
      });

      if (!getFileResponse.ok) {
        throw new Error(`Kunne ikke hente fil fra GitHub: ${filePath}`);
      }

      const fileData = await getFileResponse.json();

      // Konflikt-tjek: er filen ændret siden preview blev genereret (fx af
      // udvikleren), ville et deploy overskrive de ændringer — afvis og bed
      // om et nyt preview i stedet.
      if (oldContent !== undefined) {
        const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
        if (currentContent !== oldContent) {
          return res.status(409).json({
            success: false,
            message: `Filen ${filePath} er blevet ændret siden dit preview blev lavet. Generér et nyt preview af din ændring og deploy igen — så mister vi ikke andres arbejde.`
          });
        }
      }

      const updateFileResponse = await fetch(githubContentsUrl(filePath), {
        method: 'PUT',
        headers: githubHeaders(),
        body: JSON.stringify({
          message: `Admin: ${version.change_description}\n\nÆndret via AI Site-Editor af ${username} (version ${version.version_number})`,
          content: Buffer.from(newContent).toString('base64'),
          sha: fileData.sha,
          branch: GITHUB_BRANCH
        })
      });

      if (!updateFileResponse.ok) {
        const errorData = await updateFileResponse.json().catch(() => ({ message: updateFileResponse.statusText }));
        throw new Error(`Kunne ikke opdatere ${filePath}: ${errorData.message}`);
      }

      updatedFiles.push(filePath);
    }

    // Seneste commit SHA (til deploy-status polling)
    const branchResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/branches/${GITHUB_BRANCH}`,
      { headers: githubHeaders() }
    );
    const branchData = await branchResponse.json();
    const commitSha = branchData.commit?.sha;

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
