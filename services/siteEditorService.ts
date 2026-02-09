import type {
  SiteEditorRequest,
  SiteEditorResponse,
  AnalysisResult
} from '../types/siteEditor';

const API_BASE = '/api/site-editor';

export class SiteEditorService {
  /**
   * Analyze user's change request using AI
   */
  static async analyzeRequest(
    prompt: string,
    imageData?: string,
    username: string = 'admin'
  ): Promise<SiteEditorResponse> {
    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageData,
          siteName: 'PRE',
          username
        } as SiteEditorRequest)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Analyse fejlede');
      }

      return data;
    } catch (error) {
      console.error('SiteEditorService.analyzeRequest error:', error);
      throw error;
    }
  }

  /**
   * Get change history
   */
  static async getHistory(limit: number = 50): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/history?siteName=PRE&limit=${limit}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kunne ikke hente historik');
      }

      return data;
    } catch (error) {
      console.error('SiteEditorService.getHistory error:', error);
      throw error;
    }
  }

  /**
   * Create preview from analysis
   */
  static async createPreview(
    analysis: AnalysisResult,
    originalPrompt: string,
    username: string = 'admin',
    uploadedImageData?: string
  ): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysis,
          originalPrompt,
          username,
          uploadedImageData
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Preview generation fejlede');
      }

      return data;
    } catch (error) {
      console.error('SiteEditorService.createPreview error:', error);
      throw error;
    }
  }

  /**
   * Approve and deploy changes
   */
  static async approveChanges(versionId: string, username: string = 'admin'): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          versionId,
          username
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Deployment fejlede');
      }

      return data;
    } catch (error) {
      console.error('SiteEditorService.approveChanges error:', error);
      throw error;
    }
  }

  /**
   * Rollback to previous version
   */
  static async rollback(versionId: string, username: string = 'admin'): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/rollback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          versionId,
          username
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Rollback fejlede');
      }

      return data;
    } catch (error) {
      console.error('SiteEditorService.rollback error:', error);
      throw error;
    }
  }
}
