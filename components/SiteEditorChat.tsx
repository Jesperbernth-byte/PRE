import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, CheckCircle, AlertTriangle, Sparkles, History as HistoryIcon, Image as ImageIcon, X } from 'lucide-react';
import { SiteEditorService } from '../services/siteEditorService';
import VersionHistory from './VersionHistory';
import type { ChatMessage, AnalysisResult } from '../types/siteEditor';

// Site Editor Chat Component - Phase 3 & 4 Complete

const SiteEditorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hej! Jeg er din smarte AI assistent. Du kan:\n\n✨ Spørge mig om sitet: "Hvad er sitet optimeret efter?" eller "Hvilke services har vi?"\n\n🎨 Bede om ændringer: "Skift alle knapper til grøn" eller "Ændre Jacobs telefonnummer"\n\nJeg giver dig råd om dine ideer er gode, forklarer hvad der kan lade sig gøre, og hjælper dig til den bedste løsning!',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setImageFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !uploadedImage) || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim() || '📷 Billede uploadet',
      timestamp: new Date().toISOString(),
      imageData: uploadedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentPrompt(input.trim() || 'Skift billede');
    const currentInput = input.trim();
    const currentImage = uploadedImage;

    setInput('');
    setUploadedImage(null);
    setImageFileName('');
    setIsLoading(true);

    try {
      // Call AI analysis API with optional image
      const response = await SiteEditorService.analyzeRequest(
        currentInput || 'Analyser dette billede og foreslå hvad der skal ændres',
        currentImage || undefined
      );

      if (response.success && response.analysis) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.analysis.danishExplanation,
          timestamp: new Date().toISOString(),
          analysis: response.analysis
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(response.message || 'Analyse fejlede');
      }
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `❌ Fejl: ${error.message || 'Der opstod en fejl. Prøv igen.'}`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleApplyChange = async (analysis: AnalysisResult) => {
    setIsApplying(true);
    try {
      const res = await fetch('/api/site-editor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis, originalPrompt: currentPrompt })
      });
      const data = await res.json();
      const msg: ChatMessage = {
        role: 'assistant',
        content: data.success
          ? `✅ ${data.message}\n\nOpdaterede filer: ${data.updatedFiles?.join(', ') || '-'}\n\nSitet er live om 1-2 minutter: https://prentreprenoer.dk`
          : `❌ Fejl: ${data.message}`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, msg]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Netværksfejl: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsApplying(false);
    }
  };

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'SAFE':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'CAUTION':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'DANGEROUS':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'SAFE':
        return 'border-green-200 bg-green-50';
      case 'CAUTION':
        return 'border-yellow-200 bg-yellow-50';
      case 'DANGEROUS':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
            {showHistory ? <HistoryIcon size={20} /> : <Sparkles size={20} />}
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">
              {showHistory ? 'Versions Historik' : 'AI Site Redigering'}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              {showHistory ? 'Se tidligere ændringer' : 'Fortæl mig hvad du vil ændre'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
        >
          {showHistory ? (
            <>
              <Sparkles size={16} />
              Chat
            </>
          ) : (
            <>
              <HistoryIcon size={16} />
              Historik
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {showHistory ? (
          <VersionHistory />
        ) : (
          <>
            {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {/* User uploaded image */}
              {message.imageData && message.role === 'user' && (
                <img
                  src={message.imageData}
                  alt="Uploaded by user"
                  className="max-w-full h-auto rounded-lg mb-3 border-2 border-white/20"
                />
              )}

              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

              {/* Analysis Details */}
              {message.analysis && (
                <div className={`mt-4 p-4 rounded-xl border-2 ${getSafetyColor(message.analysis.safetyLevel)}`}>
                  {/* If it's just a question - show answer only */}
                  {message.analysis.isQuestion ? (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                          Svar på dit spørgsmål
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {message.analysis.answer || message.analysis.danishExplanation}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Safety Level */}
                      <div className="flex items-center gap-2 mb-3">
                        {getSafetyIcon(message.analysis.safetyLevel)}
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {message.analysis.safetyLevel === 'SAFE' && 'Sikker ændring'}
                          {message.analysis.safetyLevel === 'CAUTION' && 'Forsigtig - gennemgå grundigt'}
                          {message.analysis.safetyLevel === 'DANGEROUS' && 'Farlig - kan ikke udføres'}
                        </span>
                      </div>

                      {/* AI Advice (new!) */}
                      {message.analysis.advice && (
                        <div className="text-xs bg-blue-50 p-3 rounded-lg mb-3 border border-blue-200">
                          <strong className="text-blue-900">💡 Min vurdering:</strong>
                          <p className="mt-1 text-slate-700 leading-relaxed">{message.analysis.advice}</p>
                        </div>
                      )}

                      {/* Change Type */}
                      <div className="text-xs mb-2">
                        <strong>Type:</strong>{' '}
                        {message.analysis.changeType === 'color' && 'Farve ændring'}
                        {message.analysis.changeType === 'text' && 'Tekst ændring'}
                        {message.analysis.changeType === 'service' && 'Service ændring'}
                        {message.analysis.changeType === 'image' && 'Billede ændring'}
                        {message.analysis.changeType === 'team' && 'Team ændring'}
                      </div>

                      {/* Files Affected */}
                      {message.analysis.filesAffected && message.analysis.filesAffected.length > 0 && (
                        <div className="text-xs mb-2">
                          <strong>Filer der ændres:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {message.analysis.filesAffected.map((file, i) => (
                              <li key={i} className="font-mono">{file}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Specific Changes */}
                      {message.analysis.specificChanges && message.analysis.specificChanges.length > 0 && (
                        <div className="text-xs mb-2">
                          <strong>Ændringer:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {message.analysis.specificChanges.map((change, i) => (
                              <li key={i}>{change.description}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Estimated Time */}
                      {message.analysis.estimatedTime && (
                        <div className="text-xs mb-2">
                          <strong>Estimeret tid:</strong> {message.analysis.estimatedTime}
                        </div>
                      )}

                      {/* Warnings */}
                      {message.analysis.warnings && message.analysis.warnings.length > 0 && (
                        <div className="text-xs text-orange-700 mt-3 p-2 bg-orange-100 rounded border border-orange-200">
                          <strong>⚠️ Advarsler:</strong>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {message.analysis.warnings.map((warning, i) => (
                              <li key={i}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons - only show for actual changes, not questions */}
                      {message.analysis.safetyLevel !== 'DANGEROUS' && (
                        <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                          <button
                            onClick={() => handleApplyChange(message.analysis!)}
                            disabled={isApplying}
                            className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-orange-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isApplying ? (
                              <>
                                <Loader2 className="animate-spin" size={14} />
                                Anvender ændring...
                              </>
                            ) : (
                              '⚡ Anvend Ændring Nu'
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              <p className="text-[10px] opacity-60 mt-2">
                {new Date(message.timestamp).toLocaleTimeString('da-DK')}
              </p>
            </div>
          </div>
        ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-2">
                  <Loader2 className="animate-spin text-blue-900" size={16} />
                  <span className="text-sm text-slate-600">Analyserer dit ønske...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      {!showHistory && (
        <div className="border-t-2 border-slate-200 p-4 bg-slate-50">
          {/* Image Preview */}
          {uploadedImage && (
            <div className="mb-3 relative inline-block">
              <img
                src={uploadedImage}
                alt="Upload preview"
                className="h-24 w-auto rounded-lg border-2 border-blue-900"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-all shadow-lg"
              >
                <X size={16} />
              </button>
              <p className="text-xs text-slate-600 mt-1 font-medium">{imageFileName}</p>
            </div>
          )}

          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Skriv hvad du vil ændre... (fx 'Skift knapper til grøn' eller upload et billede)"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-900 resize-none text-sm"
              rows={2}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
                title="Upload billede"
              >
                <ImageIcon size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={(!input.trim() && !uploadedImage) || isLoading}
                className="bg-blue-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Tryk Enter for at sende • Upload billeder med 📷 knappen
          </p>
        </div>
      )}

    </div>
  );
};

export default SiteEditorChat;
