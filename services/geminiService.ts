// Tynd klient mod /api/ai — alle Gemini-kald sker server-side, så
// API-nøglen aldrig ender i den offentlige JS-bundle.
// Fallback-beskeder henviser til hovednummeret fra site-content.json.

import { PHONE_PREBEN } from '../constants';

async function callAI(action: string, payload: Record<string, unknown>): Promise<any> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'AI-kald fejlede');
  }
  return data;
}

export const qualifyLeadWithAI = async (conversation: string) => {
  try {
    const data = await callAI('qualify', { conversation });
    return data.lead;
  } catch (error) {
    console.error('AI Qualification failed:', error);
    return null;
  }
};

export const getChatResponse = async (
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  currentMessage: string
) => {
  try {
    const data = await callAI('chat', { history, message: currentMessage });
    return data.text;
  } catch (error) {
    console.error('Chat error:', error);
    return `Beklager, jeg oplever tekniske problemer. Ring venligst direkte til os på ${PHONE_PREBEN}.`;
  }
};

export const analyzeProblemImage = async (base64Image: string, mimeType: string) => {
  try {
    const data = await callAI('analyze-image', { imageBase64: base64Image, mimeType });
    return data.text;
  } catch (error) {
    console.error('Image analysis error:', error);
    return `Vi kunne ikke analysere billedet automatisk lige nu. Send det venligst direkte til os på info@prentreprenoer.dk eller ring på ${PHONE_PREBEN}.`;
  }
};

export const askFollowUpQuestion = async (
  base64Image: string,
  mimeType: string,
  originalAnalysis: string,
  chatHistory: { role: 'user' | 'assistant'; text: string }[]
) => {
  try {
    const data = await callAI('image-followup', {
      imageBase64: base64Image,
      mimeType,
      originalAnalysis,
      chatHistory
    });
    return data.text;
  } catch (error) {
    console.error('Follow-up question error:', error);
    return `Beklager, jeg kunne ikke behandle dit spørgsmål. Prøv igen eller kontakt os direkte på ${PHONE_PREBEN}.`;
  }
};
