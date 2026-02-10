import React, { useState, useEffect } from 'react';
import { ExternalLink, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SiteEditorService } from '../services/siteEditorService';

interface PreviewIframeProps {
  version: any;
  fileChanges: Record<string, string>;
  onClose: () => void;
  onApprove?: () => void;
  onApproved?: () => void;
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({
  version,
  fileChanges,
  onClose,
  onApprove,
  onApproved
}) => {
  const [previewMode, setPreviewMode] = useState<'side-by-side' | 'preview-only'>('side-by-side');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const previewIframeRef = React.useRef<HTMLIFrameElement>(null);
  const currentIframeRef = React.useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Simulate preview loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Apply changes to preview iframe when it loads
  useEffect(() => {
    if (isLoading || !previewIframeRef.current) return;

    const applyChanges = async () => {
      const iframe = previewIframeRef.current;
      if (!iframe || !iframe.contentWindow) return;

      try {
        const iframeDoc = iframe.contentWindow.document;

        console.log('Applying changes to preview iframe:', version.change_details);

        // Check if we have HTML changes (like index.html for images)
        const hasHtmlChanges = Array.isArray(version.change_details) &&
          version.change_details.some((d: any) => d.file.endsWith('.html') || d.file.endsWith('.tsx') || d.file.endsWith('.jsx'));

        if (hasHtmlChanges) {
          // For HTML changes, fetch the current page HTML and apply changes
          console.log('HTML changes detected - reloading with modifications');

          try {
            const response = await fetch('/pre/');
            let html = await response.text();

            // Apply changes to HTML string
            if (Array.isArray(version.change_details)) {
              version.change_details.forEach((detail: any) => {
                console.log('Processing file:', detail.file);

                // For image changes, find and replace img src in HTML
                if (detail.file.includes('Home') || detail.file.includes('index')) {
                  // Extract new image path from the changed content
                  const imgMatch = detail.newContent.match(/src=["']([^"']+)["']/);
                  if (imgMatch && imgMatch[1]) {
                    const newImagePath = imgMatch[1];
                    console.log('Found new image path:', newImagePath);

                    // Replace logo image sources
                    html = html.replace(
                      /<img[^>]+alt=["']Logo["'][^>]*>/g,
                      `<img src="${newImagePath}" alt="Logo" class="h-12" />`
                    );
                  }
                }
              });
            }

            // Write the modified HTML to iframe
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();

            // Ensure viewport is the same
            setTimeout(() => {
              const viewport = iframeDoc.querySelector('meta[name="viewport"]');
              if (!viewport) {
                const meta = iframeDoc.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, initial-scale=1.0';
                iframeDoc.head.appendChild(meta);
              }
            }, 100);

            console.log('HTML rewritten with changes');

          } catch (fetchError) {
            console.error('Error fetching/modifying HTML:', fetchError);
            // Fall back to DOM manipulation
            applyDOMChanges(iframeDoc);
          }
        } else {
          // For non-HTML changes (CSS, constants), use DOM manipulation
          applyDOMChanges(iframeDoc);
        }

        // Add visual indicator
        setTimeout(() => {
          const indicator = iframeDoc.createElement('div');
          indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: rgba(0,255,0,0.8); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold; z-index: 99999; font-size: 12px;';
          indicator.textContent = '✅ Preview med ændringer';
          iframeDoc.body.appendChild(indicator);
          setTimeout(() => indicator.remove(), 3000);
        }, 500);

      } catch (error) {
        console.error('Error applying preview changes:', error);
      }
    };

    const applyDOMChanges = (iframeDoc: Document) => {
      if (!Array.isArray(version.change_details)) {
        console.log('change_details is not an array:', version.change_details);
        return;
      }

      version.change_details.forEach((detail: any) => {
        console.log('Applying DOM change from file:', detail.file);

        if (detail.file === 'PRE/index.css' || detail.file.endsWith('.css')) {
          // Apply CSS changes
          const styleEl = iframeDoc.createElement('style');
          styleEl.setAttribute('data-preview-changes', 'true');
          styleEl.textContent = detail.newContent;
          iframeDoc.head.appendChild(styleEl);
          console.log('Applied CSS changes');
        } else if (detail.file === 'PRE/constants.tsx' || detail.file.includes('constants')) {
          // Apply text changes by parsing constants
          applyConstantsChanges(iframeDoc, detail.newContent);
          console.log('Applied constants changes');
        }
      });
    };

    // Wait for iframe to fully load
    const iframe = previewIframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', applyChanges);
      return () => iframe.removeEventListener('load', applyChanges);
    }
  }, [isLoading, version.change_details]);

  // Scroll synchronization between iframes
  useEffect(() => {
    if (isLoading || previewMode !== 'side-by-side') return;

    const currentIframe = currentIframeRef.current;
    const previewIframe = previewIframeRef.current;

    if (!currentIframe || !previewIframe) return;

    let isSyncing = false;
    let syncTimeoutId: NodeJS.Timeout | null = null;

    const syncScroll = (sourceIframe: HTMLIFrameElement, targetIframe: HTMLIFrameElement) => {
      if (isSyncing) return;

      const sourceDoc = sourceIframe.contentDocument || sourceIframe.contentWindow?.document;
      const targetDoc = targetIframe.contentDocument || targetIframe.contentWindow?.document;

      if (!sourceDoc || !targetDoc) return;

      isSyncing = true;

      // Get scroll position from source
      const scrollTop = sourceDoc.documentElement.scrollTop || sourceDoc.body.scrollTop;
      const scrollLeft = sourceDoc.documentElement.scrollLeft || sourceDoc.body.scrollLeft;

      // Apply to target
      targetDoc.documentElement.scrollTop = scrollTop;
      targetDoc.body.scrollTop = scrollTop;
      targetDoc.documentElement.scrollLeft = scrollLeft;
      targetDoc.body.scrollLeft = scrollLeft;

      // Reset sync flag after a short delay
      if (syncTimeoutId) clearTimeout(syncTimeoutId);
      syncTimeoutId = setTimeout(() => {
        isSyncing = false;
      }, 50);
    };

    const handleCurrentScroll = () => syncScroll(currentIframe, previewIframe);
    const handlePreviewScroll = () => syncScroll(previewIframe, currentIframe);

    const setupScrollListeners = () => {
      try {
        const currentDoc = currentIframe.contentDocument || currentIframe.contentWindow?.document;
        const previewDoc = previewIframe.contentDocument || previewIframe.contentWindow?.document;

        if (!currentDoc || !previewDoc) {
          console.log('Documents not ready yet');
          return;
        }

        // Listen to scroll on both window and document
        currentIframe.contentWindow?.addEventListener('scroll', handleCurrentScroll);
        currentDoc.addEventListener('scroll', handleCurrentScroll);

        previewIframe.contentWindow?.addEventListener('scroll', handlePreviewScroll);
        previewDoc.addEventListener('scroll', handlePreviewScroll);

        console.log('Scroll listeners attached successfully');
      } catch (error) {
        console.error('Error setting up scroll listeners:', error);
      }
    };

    const handleLoad = () => {
      console.log('Iframe loaded, setting up scroll listeners');
      // Delay setup slightly to ensure iframe is fully ready
      setTimeout(setupScrollListeners, 100);
    };

    // Attach load listeners
    currentIframe.addEventListener('load', handleLoad);
    previewIframe.addEventListener('load', handleLoad);

    // Setup immediately if already loaded
    if (currentIframe.contentDocument?.readyState === 'complete' &&
        previewIframe.contentDocument?.readyState === 'complete') {
      console.log('Iframes already loaded, setting up scroll listeners');
      setupScrollListeners();
    }

    return () => {
      if (syncTimeoutId) clearTimeout(syncTimeoutId);

      try {
        const currentDoc = currentIframe.contentDocument || currentIframe.contentWindow?.document;
        const previewDoc = previewIframe.contentDocument || previewIframe.contentWindow?.document;

        currentIframe.contentWindow?.removeEventListener('scroll', handleCurrentScroll);
        currentDoc?.removeEventListener('scroll', handleCurrentScroll);

        previewIframe.contentWindow?.removeEventListener('scroll', handlePreviewScroll);
        previewDoc?.removeEventListener('scroll', handlePreviewScroll);

        currentIframe.removeEventListener('load', handleLoad);
        previewIframe.removeEventListener('load', handleLoad);
      } catch (error) {
        console.error('Error cleaning up scroll listeners:', error);
      }
    };
  }, [isLoading, previewMode]);

  const applyConstantsChanges = (doc: Document, newConstantsContent: string) => {
    try {
      // Extract constants from new content
      const constants: Record<string, string> = {};

      // Parse COMPANY_NAME
      const companyMatch = newConstantsContent.match(/export const COMPANY_NAME = ["'](.+?)["'];/);
      if (companyMatch) constants.COMPANY_NAME = companyMatch[1];

      // Parse TAGLINE
      const taglineMatch = newConstantsContent.match(/export const TAGLINE = ["'](.+?)["'];/);
      if (taglineMatch) constants.TAGLINE = taglineMatch[1];

      // Parse PHONE_JACOB
      const phoneJacobMatch = newConstantsContent.match(/export const PHONE_JACOB = ["'](.+?)["'];/);
      if (phoneJacobMatch) constants.PHONE_JACOB = phoneJacobMatch[1];

      // Parse PHONE_PREBEN
      const phonePrebenMatch = newConstantsContent.match(/export const PHONE_PREBEN = ["'](.+?)["'];/);
      if (phonePrebenMatch) constants.PHONE_PREBEN = phonePrebenMatch[1];

      // Parse EMAIL
      const emailMatch = newConstantsContent.match(/export const EMAIL = ["'](.+?)["'];/);
      if (emailMatch) constants.EMAIL = emailMatch[1];

      // Apply changes to DOM
      if (constants.COMPANY_NAME) {
        doc.querySelectorAll('h1, h2, .company-name').forEach(el => {
          if (el.textContent?.includes('PR Entreprenøren')) {
            el.textContent = el.textContent.replace(/PR Entreprenøren ApS|PR Entreprenøren/, constants.COMPANY_NAME);
          }
        });
      }

      if (constants.PHONE_JACOB) {
        doc.querySelectorAll('a[href*="tel:"]').forEach(el => {
          const href = el.getAttribute('href');
          if (href?.includes('24946661') || href?.includes('24 94 66 61')) {
            el.setAttribute('href', `tel:${constants.PHONE_JACOB.replace(/\s/g, '')}`);
            if (el.textContent?.includes('24 94 66 61') || el.textContent?.includes('24946661')) {
              el.textContent = constants.PHONE_JACOB;
            }
          }
        });
      }

      if (constants.PHONE_PREBEN) {
        doc.querySelectorAll('a[href*="tel:"]').forEach(el => {
          const href = el.getAttribute('href');
          if (href?.includes('22966661') || href?.includes('22 96 66 61')) {
            el.setAttribute('href', `tel:${constants.PHONE_PREBEN.replace(/\s/g, '')}`);
            if (el.textContent?.includes('22 96 66 61') || el.textContent?.includes('22966661')) {
              el.textContent = constants.PHONE_PREBEN;
            }
          }
        });
      }

      if (constants.EMAIL) {
        doc.querySelectorAll('a[href*="mailto:"]').forEach(el => {
          el.setAttribute('href', `mailto:${constants.EMAIL}`);
          if (el.textContent?.includes('@')) {
            el.textContent = constants.EMAIL;
          }
        });
      }

    } catch (error) {
      console.error('Error parsing constants:', error);
    }
  };

  const handleApprove = async () => {
    if (!version?.id) return;

    setIsDeploying(true);
    setDeployError(null);

    try {
      await SiteEditorService.approveChanges(version.id, 'admin');

      // Call parent callback
      if (onApproved) {
        onApproved();
      }

      // Show success and close
      alert('✅ Ændringerne er nu deployet til produktion! Sitet opdateres om 1-2 minutter.');
      onClose();
    } catch (error: any) {
      setDeployError(error.message || 'Deployment fejlede');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Preview - Version {version.version_number}
            </h2>
            <p className="text-sm text-blue-200 mt-1">{version.change_description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="bg-slate-100 p-4 border-b flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode('side-by-side')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                previewMode === 'side-by-side'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              ⚖️ Live Sammenligning
            </button>
            <button
              onClick={() => setPreviewMode('preview-only')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                previewMode === 'preview-only'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              📝 Kode Detaljer
            </button>
          </div>

          <div className="flex items-center gap-3">
            {deployError && (
              <span className="text-sm text-red-600 font-bold">❌ {deployError}</span>
            )}
            <button
              onClick={handleApprove}
              disabled={isDeploying}
              className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Deployer...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Godkend & Publicer
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Changes Summary */}
        <div className="bg-blue-50 p-4 border-b">
          <h3 className="font-bold text-sm text-blue-900 mb-2">Filer der ændres:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(fileChanges).map((file, i) => (
              <span
                key={i}
                className="bg-white px-3 py-1 rounded-full text-xs font-mono text-blue-900 border border-blue-200"
              >
                {file}
              </span>
            ))}
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <Loader2 className="animate-spin text-blue-900 mx-auto mb-4" size={48} />
                <p className="text-lg font-bold text-slate-800">Genererer preview...</p>
                <p className="text-sm text-slate-500 mt-2">Dette tager normalt 30-60 sekunder</p>
              </div>
            </div>
          ) : previewMode === 'side-by-side' ? (
            <div className="grid grid-cols-2 h-full gap-0">
              {/* Current Version */}
              <div className="border-r flex flex-col w-full">
                <div className="bg-slate-200 p-3 flex items-center justify-between border-b">
                  <span className="font-bold text-sm uppercase tracking-wide text-slate-700">
                    ❌ Nuværende Version
                  </span>
                  <a
                    href="/pre/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-900 hover:text-blue-700 flex items-center gap-1 text-xs"
                  >
                    <ExternalLink size={14} />
                    Åbn i ny fane
                  </a>
                </div>
                <iframe
                  ref={currentIframeRef}
                  src="/pre/"
                  className="flex-1 w-full border-0"
                  title="Current Version"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                  }}
                />
              </div>

              {/* Preview Version */}
              <div className="flex flex-col w-full">
                <div className="bg-green-100 p-3 flex items-center justify-between border-b">
                  <span className="font-bold text-sm uppercase tracking-wide text-green-900">
                    ✅ Preview med Ændringer
                  </span>
                  <a
                    href="/pre/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 flex items-center gap-1 text-xs"
                  >
                    <ExternalLink size={14} />
                    Åbn i ny fane
                  </a>
                </div>
                <iframe
                  ref={previewIframeRef}
                  src="/pre/"
                  className="flex-1 w-full border-0"
                  title="Preview Version"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                  }}
                />
              </div>
            </div>
          ) : (
            /* Code Details Mode */
            <div className="h-full flex flex-col">
              <div className="bg-blue-100 p-3 border-b">
                <span className="font-bold text-sm uppercase tracking-wide text-blue-900">
                  📝 Kode Detaljer - Før/Efter Sammenligning
                </span>
              </div>
              <div className="flex-1 overflow-auto p-6 bg-slate-50">
                <div className="space-y-4 max-w-6xl mx-auto">

                  <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">💡</div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2 text-lg">
                          Tip: Se Live Preview
                        </h4>
                        <p className="text-sm text-blue-800">
                          Klik på <strong>"⚖️ Live Sammenligning"</strong> knappen ovenfor for at se ændringerne visuelt
                          i en side-by-side live preview i stedet for kode.
                        </p>
                      </div>
                    </div>
                  </div>
                  {version.change_details?.map((detail: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4">
                        <div className="font-mono text-sm font-bold mb-1">
                          📄 {detail.file}
                        </div>
                        <div className="text-sm opacity-90">
                          {detail.summary}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {/* Before */}
                        <div>
                          <div className="text-sm font-black uppercase tracking-widest text-red-600 mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            FØR (Nuværende Version)
                          </div>
                          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 overflow-hidden">
                            <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                              {detail.oldContent}
                            </pre>
                          </div>
                        </div>

                        {/* After */}
                        <div>
                          <div className="text-sm font-black uppercase tracking-widest text-green-600 mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            EFTER (Ny Version)
                          </div>
                          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 overflow-hidden">
                            <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                              {detail.newContent}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="text-blue-600 shrink-0 mt-1" size={32} />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2 text-lg">
                          Klar til at publicere?
                        </h4>
                        <p className="text-sm text-blue-800 mb-4">
                          Når du er tilfreds med ændringerne, klik på <strong>"Godkend & Publicer"</strong> knappen ovenfor.
                          Ændringerne vil være live på <a href="https://prentreprenoer.dk" target="_blank" rel="noopener noreferrer" className="underline font-bold">https://prentreprenoer.dk</a> efter 1-2 minutter.
                        </p>
                        <p className="text-xs text-blue-700">
                          💡 Tip: Du kan altid rulle tilbage fra "Historik" menuen hvis du fortryder.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t flex justify-between items-center">
          <div className="text-xs text-slate-600">
            <p>
              <strong>Branch:</strong> {version.branch_name}
            </p>
            <p>
              <strong>Ændret af:</strong> {version.changed_by}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-700 transition-all"
          >
            Luk Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewIframe;
