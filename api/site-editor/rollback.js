import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../lib/serverAuth.js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const GITHUB_OWNER = 'Jesperbernth-byte';
const GITHUB_REPO = 'PRE';
const GITHUB_BRANCH = 'main';

const githubHeaders = () => ({
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  'Content-Type': 'application/json'
});

async function getFileSha(filePath) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}?ref=${GITHUB_BRANCH}`;
  const response = await fetch(url, { headers: githubHeaders() });
  if (response.status === 404) return null;
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Kunne ikke hente ${filePath} fra GitHub: ${err.message}`);
  }
  const data = await response.json();
  return data.sha;
}

async function writeFileToGitHub(filePath, content, commitMessage) {
  const sha = await getFileSha(filePath);
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}`;
  const body = {
    message: commitMessage,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: GITHUB_BRANCH
  };
  if (sha) body.sha = sha;

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Kunne ikke skrive ${filePath} til GitHub: ${err.message}`);
  }

  return await response.json();
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

  const { versionId, username = req.user?.sub || 'admin' } = req.body || {};

  if (!versionId) {
    return res.status(400).json({ success: false, message: 'versionId er påkrævet' });
  }

  try {
    const { data: targetVersion, error: fetchError } = await supabase
      .from('site_edit_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (fetchError || !targetVersion) {
      return res.status(404).json({ success: false, message: 'Version ikke fundet' });
    }

    if (targetVersion.status !== 'deployed') {
      return res.status(400).json({ success: false, message: 'Kun deployede versioner kan rulles tilbage' });
    }

    if (targetVersion.rolled_back_at) {
      return res.status(400).json({ success: false, message: 'Denne version er allerede rullet tilbage' });
    }

    const filesToRestore = targetVersion.files_changed;
    if (!filesToRestore || Object.keys(filesToRestore).length === 0) {
      return res.status(400).json({ success: false, message: 'Ingen filer at rulle tilbage' });
    }

    const commitMessage = `PRE: Rollback til version ${targetVersion.version_number}\n\nRollet tilbage af: ${username}\nOriginal ændring: ${targetVersion.change_description}\n\nCo-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`;

    const restoredFiles = [];
    let lastCommitSha = null;

    for (const [filePath, oldContent] of Object.entries(filesToRestore)) {
      const result = await writeFileToGitHub(filePath, oldContent, commitMessage);
      restoredFiles.push(filePath);
      lastCommitSha = result?.commit?.sha || lastCommitSha;
    }

    // Mark this version as rolled back
    await supabase
      .from('site_edit_versions')
      .update({
        rolled_back_at: new Date().toISOString(),
        rolled_back_by: username
      })
      .eq('id', versionId);

    // Create a new version entry for the rollback
    const { data: newVersions } = await supabase
      .from('site_edit_versions')
      .select('version_number')
      .eq('site_name', 'PRE')
      .order('version_number', { ascending: false })
      .limit(1);

    const nextVersion = newVersions && newVersions.length > 0
      ? newVersions[0].version_number + 1
      : targetVersion.version_number + 1;

    await supabase
      .from('site_edit_versions')
      .insert({
        version_number: nextVersion,
        site_name: 'PRE',
        change_description: `Rollback til version ${targetVersion.version_number}`,
        change_prompt: `Rollback: ${targetVersion.change_description}`,
        changed_by: username,
        files_changed: filesToRestore,
        change_details: [{
          action: 'rollback',
          summary: `Gendannede filer fra version ${targetVersion.version_number}`,
          files: restoredFiles
        }],
        status: 'deployed',
        deployed_at: new Date().toISOString(),
        commit_sha: lastCommitSha,
        deployment_url: process.env.PRE_SITE_URL || 'https://prentreprenoer.dk'
      });

    return res.status(200).json({
      success: true,
      message: `Rollback til version ${targetVersion.version_number} fuldført. Vercel rebuilder om 1-2 min.`,
      commitSha: lastCommitSha,
      restoredFiles,
      deploymentUrl: process.env.PRE_SITE_URL || 'https://prentreprenoer.dk'
    });
  } catch (error) {
    console.error('Rollback Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved rollback',
      error: error.message
    });
  }
}
