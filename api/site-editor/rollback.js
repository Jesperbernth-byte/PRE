import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../../lib/serverAuth.js';
import {
  isFileAllowed,
  githubHeaders,
  githubContentsUrl,
  GITHUB_BRANCH
} from '../../lib/editorFiles.js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function getFileSha(filePath) {
  const response = await fetch(githubContentsUrl(filePath, true), { headers: githubHeaders() });
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
  const body = {
    message: commitMessage,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: GITHUB_BRANCH
  };
  if (sha) body.sha = sha;

  const response = await fetch(githubContentsUrl(filePath), {
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

    // Rollback = FORTRYD versionen: gendan filerne som de så ud FØR
    // ændringen. Før-indholdet ligger i change_details[].oldContent —
    // files_changed indeholder det NYE indhold og kan ikke bruges.
    const details = Array.isArray(targetVersion.change_details) ? targetVersion.change_details : [];
    const restoreMap = {};
    for (const d of details) {
      if (d && d.file && typeof d.oldContent === 'string') {
        restoreMap[d.file] = d.oldContent;
      }
    }

    if (Object.keys(restoreMap).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Denne version indeholder ikke det oprindelige filindhold og kan ikke rulles tilbage automatisk. Kontakt udvikleren.'
      });
    }

    const unauthorized = Object.keys(restoreMap).filter(f => !isFileAllowed(f));
    if (unauthorized.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Følgende filer må ikke skrives: ${unauthorized.join(', ')}`
      });
    }

    const commitMessage = `Admin: Fortryd version ${targetVersion.version_number}\n\nRullet tilbage af: ${username}\nOriginal ændring: ${targetVersion.change_description}`;

    const restoredFiles = [];
    let lastCommitSha = null;

    for (const [filePath, oldContent] of Object.entries(restoreMap)) {
      const result = await writeFileToGitHub(filePath, oldContent, commitMessage);
      restoredFiles.push(filePath);
      lastCommitSha = result?.commit?.sha || lastCommitSha;
    }

    await supabase
      .from('site_edit_versions')
      .update({
        rolled_back_at: new Date().toISOString(),
        rolled_back_by: username
      })
      .eq('id', versionId);

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
        change_description: `Fortrudt version ${targetVersion.version_number}`,
        change_prompt: `Rollback: ${targetVersion.change_description}`,
        changed_by: username,
        files_changed: restoreMap,
        change_details: [{
          action: 'rollback',
          summary: `Gendannede filerne som de så ud før version ${targetVersion.version_number}`,
          files: restoredFiles
        }],
        status: 'deployed',
        deployed_at: new Date().toISOString(),
        commit_sha: lastCommitSha,
        deployment_url: process.env.PRE_SITE_URL || 'https://prentreprenoer.dk'
      });

    return res.status(200).json({
      success: true,
      message: `Version ${targetVersion.version_number} er fortrudt — sitet gendannes som før ændringen. Vercel rebuilder om 1-2 min.`,
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
