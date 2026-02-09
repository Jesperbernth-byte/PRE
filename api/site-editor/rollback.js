import { createClient } from '@supabase/supabase-js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
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
    // Get version to rollback to
    const { data: targetVersion, error: fetchError } = await supabase
      .from('site_edit_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (fetchError || !targetVersion) {
      throw new Error('Version ikke fundet');
    }

    // Can only rollback deployed versions
    if (targetVersion.status !== 'deployed') {
      return res.status(400).json({
        success: false,
        message: 'Kun deployede versioner kan rulles tilbage'
      });
    }

    // Check if already rolled back
    if (targetVersion.rolled_back_at) {
      return res.status(400).json({
        success: false,
        message: 'Denne version er allerede rullet tilbage'
      });
    }

    // Get the file contents from this version
    const filesToRestore = targetVersion.files_changed;

    if (!filesToRestore || Object.keys(filesToRestore).length === 0) {
      throw new Error('Ingen filer at rulle tilbage');
    }

    // Apply the old file contents
    const repoRoot = process.cwd();
    const restoredFiles = [];

    for (const [filePath, oldContent] of Object.entries(filesToRestore)) {
      const fullPath = path.join(repoRoot, filePath);

      // Write old content back
      await fs.writeFile(fullPath, oldContent, 'utf-8');
      restoredFiles.push(filePath);
    }

    // Git commit and push the rollback
    try {
      // Add files
      await execAsync(`git add ${restoredFiles.join(' ')}`);

      // Commit
      const commitMessage = `PRE: Rollback til version ${targetVersion.version_number}\n\nRollet tilbage af: ${username}\nOriginal ændring: ${targetVersion.change_description}\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`;
      await execAsync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

      // Push
      await execAsync('git push origin main');

      // Get commit SHA
      const { stdout: commitSha } = await execAsync('git rev-parse HEAD');

      // Mark this version as rolled back
      const { error: updateError } = await supabase
        .from('site_edit_versions')
        .update({
          rolled_back_at: new Date().toISOString(),
          rolled_back_by: username
        })
        .eq('id', versionId);

      if (updateError) {
        console.error('Failed to update rollback status:', updateError);
      }

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
            summary: `Gendannede filer fra version ${targetVersion.version_number}`
          }],
          status: 'deployed',
          deployed_at: new Date().toISOString(),
          commit_sha: commitSha.trim(),
          deployment_url: process.env.PRE_SITE_URL || 'https://aibernth.dk/pre/'
        });

      return res.status(200).json({
        success: true,
        message: `Rollback til version ${targetVersion.version_number} fuldført`,
        commitSha: commitSha.trim(),
        deploymentUrl: process.env.PRE_SITE_URL || 'https://aibernth.dk/pre/'
      });

    } catch (gitError) {
      throw new Error(`Git operation fejlede: ${gitError.message}`);
    }

  } catch (error) {
    console.error('Rollback Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved rollback',
      error: error.message
    });
  }
}
