// TypeScript types for AI-powered Site Editor

export type SafetyLevel = 'SAFE' | 'CAUTION' | 'DANGEROUS';
export type ChangeType = 'color' | 'text' | 'service' | 'image' | 'team' | 'question';
export type VersionStatus = 'preview' | 'approved' | 'deployed' | 'rolled_back';

export interface FileChange {
  file: string;
  action: 'replace_value' | 'replace_class' | 'add_item' | 'remove_item' | 'update_item';
  selector?: string;
  oldValue?: string;
  newValue?: string;
  description: string;
}

export interface AnalysisResult {
  isQuestion?: boolean;
  changeType: ChangeType;
  filesAffected?: string[];
  specificChanges?: FileChange[];
  safetyLevel: SafetyLevel;
  danishExplanation: string;
  estimatedTime?: string;
  warnings?: string[];
  advice?: string;
  answer?: string;
  imagePrompt?: string;
  imageLocation?: string;
}

export interface SiteEditVersion {
  id: string;
  created_at: string;
  version_number: number;
  site_name: string;
  change_description: string;
  change_prompt: string;
  changed_by: string;
  commit_sha?: string;
  branch_name?: string;
  files_changed?: Record<string, any>;
  change_details?: Record<string, any>;
  status: VersionStatus;
  preview_url?: string;
  preview_build_id?: string;
  deployed_at?: string;
  deployment_url?: string;
  rolled_back_at?: string;
  rolled_back_by?: string;
}

export interface EditableContent {
  id: string;
  site_name: string;
  content_key: string;
  file_path: string;
  content_type: string;
  current_value?: string;
  description: string;
  is_editable: boolean;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  analysis?: AnalysisResult;
  imageData?: string;
}

export interface SiteEditorRequest {
  prompt: string;
  siteName: string;
  username: string;
}

export interface SiteEditorResponse {
  success: boolean;
  analysis?: AnalysisResult;
  message: string;
  error?: string;
}
