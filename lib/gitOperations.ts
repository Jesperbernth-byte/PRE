import simpleGit, { SimpleGit } from 'simple-git';
import { minimatch } from 'minimatch';

const ALLOWED_FILE_PATTERNS = [
  'PRE/constants.tsx',
  'PRE/index.css',
  'PRE/public/**/*'
];

const FORBIDDEN_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.env*',
  '**/package.json',
  '**/package-lock.json',
  '**/vercel.json',
  '**/*.config.*'
];

export interface GitOperationsConfig {
  repoPath: string;
  defaultBranch?: string;
}

export class GitOperations {
  private git: SimpleGit;
  private repoPath: string;
  private defaultBranch: string;

  constructor(config: GitOperationsConfig) {
    this.repoPath = config.repoPath;
    this.defaultBranch = config.defaultBranch || 'main';
    this.git = simpleGit(this.repoPath);
  }

  /**
   * Validate if a file is allowed to be edited
   */
  isFileAllowed(filePath: string): boolean {
    // Check if file matches any forbidden pattern
    const isForbidden = FORBIDDEN_PATTERNS.some(pattern =>
      minimatch(filePath, pattern)
    );

    if (isForbidden) {
      return false;
    }

    // Check if file matches any allowed pattern
    return ALLOWED_FILE_PATTERNS.some(pattern =>
      minimatch(filePath, pattern)
    );
  }

  /**
   * Create a new preview branch
   */
  async createPreviewBranch(branchName: string): Promise<void> {
    // Ensure we're on the default branch and up to date
    await this.git.checkout(this.defaultBranch);
    await this.git.pull('origin', this.defaultBranch);

    // Create and checkout new branch
    await this.git.checkoutLocalBranch(branchName);
  }

  /**
   * Delete a preview branch
   */
  async deletePreviewBranch(branchName: string): Promise<void> {
    // Checkout default branch first
    await this.git.checkout(this.defaultBranch);

    // Delete local branch
    await this.git.deleteLocalBranch(branchName, true);

    // Delete remote branch if it exists
    try {
      await this.git.push('origin', branchName, ['--delete']);
    } catch (error) {
      // Branch might not exist on remote, that's okay
      console.log('Remote branch does not exist or already deleted');
    }
  }

  /**
   * Apply file changes to current branch
   */
  async applyChanges(fileChanges: Record<string, string>): Promise<string[]> {
    const appliedFiles: string[] = [];

    for (const [filePath, newContent] of Object.entries(fileChanges)) {
      // Validate file is allowed
      if (!this.isFileAllowed(filePath)) {
        throw new Error(`File ${filePath} is not allowed to be edited`);
      }

      // Write file content
      const fs = await import('fs/promises');
      const path = await import('path');
      const fullPath = path.join(this.repoPath, filePath);

      await fs.writeFile(fullPath, newContent, 'utf-8');
      appliedFiles.push(filePath);
    }

    return appliedFiles;
  }

  /**
   * Commit changes on current branch
   */
  async commitChanges(message: string, files: string[]): Promise<string> {
    // Stage files
    await this.git.add(files);

    // Commit
    const commitResult = await this.git.commit(message);

    return commitResult.commit;
  }

  /**
   * Push branch to remote
   */
  async pushBranch(branchName: string): Promise<void> {
    await this.git.push('origin', branchName, ['--set-upstream']);
  }

  /**
   * Merge preview branch into main
   */
  async mergeBranch(branchName: string): Promise<string> {
    // Checkout default branch
    await this.git.checkout(this.defaultBranch);

    // Pull latest
    await this.git.pull('origin', this.defaultBranch);

    // Merge preview branch
    await this.git.merge([branchName]);

    // Push to remote
    await this.git.push('origin', this.defaultBranch);

    // Get latest commit SHA
    const log = await this.git.log(['-1']);
    return log.latest?.hash || '';
  }

  /**
   * Get current branch name
   */
  async getCurrentBranch(): Promise<string> {
    const branch = await this.git.branch();
    return branch.current;
  }

  /**
   * Check if branch exists
   */
  async branchExists(branchName: string): Promise<boolean> {
    const branches = await this.git.branch();
    return branches.all.includes(branchName);
  }

  /**
   * Get list of changed files on current branch
   */
  async getChangedFiles(): Promise<string[]> {
    const status = await this.git.status();
    return [
      ...status.modified,
      ...status.created,
      ...status.deleted
    ];
  }

  /**
   * Revert to specific commit
   */
  async revertToCommit(commitSha: string): Promise<void> {
    await this.git.checkout(this.defaultBranch);
    await this.git.revert(commitSha, { '--no-edit': null });
    await this.git.push('origin', this.defaultBranch);
  }
}

/**
 * Generate unique preview branch name
 */
export function generatePreviewBranchName(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `preview/site-edit-${timestamp}-${random}`;
}
