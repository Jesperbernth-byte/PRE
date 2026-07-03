import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, CheckCircle, AlertTriangle, Sparkles, History as HistoryIcon, Image as ImageIcon, X, Eye, Rocket, ExternalLink } from 'lucide-react';
import { SiteEditorService } from '../services/siteEditorService';
import VersionHistory from './VersionHistory';
import type { ChatMessage, AnalysisResult } from '../types/siteEditor';

// Site Editor Chat Component - Phase 3 & 4 Complete

const SiteEditorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hej Jacob! Jeg er din AI-assistent til sitet. Du kan fx:\n\n✏️ Ændre tekster: "Ret hero-teksten til..." eller "Tilføj et FAQ-spørgsmål om..."\n🖼️ Skifte billeder: upload et billede med 📷-knappen og skriv fx "brug det her som billede på rottespærre-siden" eller "skift logoet til dette"\n📄 Oprette en ny side: "Lav en side om vinterklargøring af kloak"\n🔍 SEO: "Opdatér sidens beskrivelse i Google til..."\n❓ Spørge om sitet: "Hvilke ydelser viser vi?" eller "Hvad står der i footeren?"\n\nSådan foregår det: Jeg foreslår ændringen → du trykker "Generér preview" og ser før/efter → du trykker "Deploy" → ændringen er live på sitet 1-2 minutter efter. Fortryder du, kan alt rulles tilbage under Historik.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewLoadingIdx, setPreviewLoadingIdx] = useState<number | null>(null);
  const [deployLoadingIdx, setDeployLoadingIdx] = useState<number | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevMessageCountRef = useRef(messages.length);

  // Auto-scroll to bottom ONLY when NEW messages are added (not on every re-render)
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevMessageCountRef.current = messages.length;
    }
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

    // Save uploaded image for later use in apply
    if (uploadedImage) {
      setLastUploadedImage(uploadedImage);
    }

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

  const handleGeneratePreview = async (analysis: AnalysisResult, messageIdx: number) => {
    setPreviewLoadingIdx(messageIdx);
    try {
      const data = await SiteEditorService.createPreview(
        analysis,
        currentPrompt,
        'admin',
        lastUploadedImage || undefined
      );

      if (!data.success) {
        throw new Error(data.message || 'Preview kunne ikke genereres');
      }

      setMessages(prev => prev.map((m, i) => i === messageIdx ? {
        ...m,
        preview: {
          versionId: data.version.id,
          versionNumber: data.version.version_number,
          changeDetails: data.changeDetails || []
        }
      } : m));
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Kunne ikke generere preview: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setPreviewLoadingIdx(null);
    }
  };

  const pollDeployStatus = (commitSha: string, messageIdx: number) => {
    let attempts = 0;
    const maxAttempts = 36; // ~3 min at 5s interval
    const tick = async () => {
      attempts++;
      try {
        const data = await SiteEditorService.getDeployStatus(commitSha);
        const status = data.status;
        setMessages(prev => prev.map((m, i) => i === messageIdx ? {
          ...m,
          preview: m.preview ? {
            ...m.preview,
            buildStatus: status,
            buildUrl: data.deploymentUrl || m.preview.buildUrl
          } : m.preview
        } : m));
        if (status === 'READY' || status === 'ERROR' || status === 'CANCELED') {
          return; // stop polling
        }
      } catch (err) {
        // Ignore single failures; keep polling unless we've timed out
      }
      if (attempts < maxAttempts) {
        setTimeout(tick, 5000);
      }
    };
    tick();
  };

  const handleDeployVersion = async (versionId: string, messageIdx: number) => {
    setDeployLoadingIdx(messageIdx);
    try {
      const data = await SiteEditorService.approveChanges(versionId, 'admin');

      if (!data.success) {
        throw new Error(data.message || 'Deployment fejlede');
      }

      setMessages(prev => prev.map((m, i) => i === messageIdx ? {
        ...m,
        preview: m.preview ? {
          ...m.preview,
          deployed: true,
          deploymentUrl: data.deploymentUrl,
          commitSha: data.commitSha,
          buildStatus: 'pending'
        } : m.preview
      } : m));

      if (data.commitSha) {
        pollDeployStatus(data.commitSha, messageIdx);
      }
    } catch (error: any) {
      setMessages(prev => prev.map((m, i) => i === messageIdx ? {
        ...m,
        preview: m.preview ? {
          ...m.preview,
          deployError: error.message
        } : m.preview
      } : m));
    } finally {
      setDeployLoadingIdx(null);
    }
  };

  const handleCancelPreview = (messageIdx: number) => {
    setMessages(prev => prev.map((m, i) => i === messageIdx ? {
      ...m,
      preview: m.preview ? { ...m.preview, cancelled: true } : m.preview
    } : m));
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
                        {message.analysis.changeType === 'page' && 'Ny/ændret side'}
                        {message.analysis.changeType === 'seo' && 'SEO ændring'}
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

                      {/* Action area — preview flow */}
                      {message.analysis.safetyLevel !== 'DANGEROUS' && (
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          {!message.preview ? (
                            <button
                              onClick={() => handleGeneratePreview(message.analysis!, index)}
                              disabled={previewLoadingIdx !== null}
                              className="w-full bg-blue-900 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-blue-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {previewLoadingIdx === index ? (
                                <>
                                  <Loader2 className="animate-spin" size={14} />
                                  Genererer preview...
                                </>
                              ) : (
                                <>
                                  <Eye size={14} />
                                  Generér preview
                                </>
                              )}
                            </button>
                          ) : message.preview.cancelled ? (
                            <div className="text-xs text-slate-500 italic p-2 text-center">
                              Preview annulleret. Du kan generere en ny ved at sende beskeden igen.
                            </div>
                          ) : message.preview.deployed ? (
                            (() => {
                              const bs = message.preview.buildStatus;
                              const isReady = bs === 'READY';
                              const isError = bs === 'ERROR' || bs === 'CANCELED';
                              const wrapperClass = isError
                                ? 'bg-red-50 border-2 border-red-200'
                                : isReady
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-blue-50 border-2 border-blue-200';
                              const iconColor = isError ? 'text-red-700' : isReady ? 'text-green-700' : 'text-blue-700';
                              const icon = isError ? <AlertCircle size={14} /> : isReady ? <CheckCircle size={14} /> : <Loader2 className="animate-spin" size={14} />;
                              const label = isError
                                ? bs === 'CANCELED' ? 'Build annulleret' : 'Build fejlede'
                                : isReady ? 'Live på sitet' : 'Vercel bygger…';
                              const detail = isError
                                ? 'Tjek Vercel-dashboardet for build-log. Kør evt. rollback hvis sitet er brudt.'
                                : isReady
                                ? 'Ændringen er nu synlig for besøgende.'
                                : 'Holder øje med Vercel — typisk 1-2 min.';
                              return (
                                <div className={`${wrapperClass} rounded-lg p-3 text-xs`}>
                                  <div className={`flex items-center gap-2 ${iconColor} font-bold mb-2`}>
                                    {icon} {label}
                                  </div>
                                  <p className="text-slate-700 mb-2">{detail}</p>
                                  {(message.preview.deploymentUrl || message.preview.buildUrl) && (
                                    <a
                                      href={message.preview.deploymentUrl || message.preview.buildUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-blue-900 font-bold hover:text-orange-600"
                                    >
                                      {isReady ? 'Tjek live site' : 'Tjek build'} <ExternalLink size={11} />
                                    </a>
                                  )}
                                </div>
                              );
                            })()
                          ) : (
                            <div>
                              <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <Eye size={14} /> Preview klar
                                {message.preview.versionNumber && (
                                  <span className="text-slate-400 font-normal">(version #{message.preview.versionNumber})</span>
                                )}
                              </div>
                              {message.preview.changeDetails.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {message.preview.changeDetails.map((d, di) => (
                                    <details key={di} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                      <summary className="px-3 py-2 cursor-pointer text-xs font-bold text-slate-800 hover:bg-slate-50">
                                        <span className="font-mono text-slate-600">{d.file}</span>
                                        <span className="block text-slate-500 font-normal mt-0.5">{d.summary}</span>
                                      </summary>
                                      <div className="border-t border-slate-200 p-3 bg-slate-50">
                                        {d.oldContent && d.newContent ? (
                                          <div className="space-y-2">
                                            <div>
                                              <div className="text-[10px] font-bold text-red-700 uppercase mb-1">Før</div>
                                              <pre className="text-[10px] bg-red-50 text-red-900 p-2 rounded max-h-32 overflow-auto whitespace-pre-wrap break-all">{d.oldContent.length > 800 ? d.oldContent.substring(0, 800) + '\n…' : d.oldContent}</pre>
                                            </div>
                                            <div>
                                              <div className="text-[10px] font-bold text-green-700 uppercase mb-1">Efter</div>
                                              <pre className="text-[10px] bg-green-50 text-green-900 p-2 rounded max-h-32 overflow-auto whitespace-pre-wrap break-all">{d.newContent.length > 800 ? d.newContent.substring(0, 800) + '\n…' : d.newContent}</pre>
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-xs text-slate-500 italic">Ingen diff tilgængelig</p>
                                        )}
                                      </div>
                                    </details>
                                  ))}
                                </div>
                              )}
                              {message.preview.deployError && (
                                <div className="bg-red-50 border-2 border-red-200 text-red-800 rounded-lg p-2 text-xs mb-2">
                                  ❌ {message.preview.deployError}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleDeployVersion(message.preview!.versionId, index)}
                                  disabled={deployLoadingIdx !== null}
                                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-orange-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                  {deployLoadingIdx === index ? (
                                    <>
                                      <Loader2 className="animate-spin" size={14} />
                                      Deployer...
                                    </>
                                  ) : (
                                    <>
                                      <Rocket size={14} /> Deploy
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleCancelPreview(index)}
                                  disabled={deployLoadingIdx !== null}
                                  className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-slate-300 transition-all disabled:opacity-50"
                                >
                                  Annullér
                                </button>
                              </div>
                            </div>
                          )}
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
