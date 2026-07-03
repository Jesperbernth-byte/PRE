import React, { useEffect, useRef } from 'react';
import { Facebook, ExternalLink, Cookie } from 'lucide-react';
import { FACEBOOK_PAGE_URL } from '../constants';
import { trackFBFeedView } from '../lib/tracking';
import { useConsent, openConsentBanner } from '../lib/consent';

// Facebook Page Plugin embed.
// Bemærk: Page Plugin'et virker kun for Facebook Pages (ikke personlige
// profiler). Profile.php?id=… URL'er kan godt være "Pages" under Metas
// New Pages Experience — så det burde virke. Hvis siden viser tom,
// betyder det at URL'en er en profil og skal konverteres til en Page.

const FacebookFeed: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackedRef = useRef(false);
  // Meta sætter cookies (fr, datr, sb) så snart iframen indlæses —
  // derfor kræver feedet marketing-samtykke, som lovet i cookiepolitikken.
  const { marketing } = useConsent();

  useEffect(() => {
    if (!sectionRef.current || trackedRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !trackedRef.current) {
          trackedRef.current = true;
          trackFBFeedView();
          obs.disconnect();
        }
      }
    }, { threshold: 0.3 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  if (!FACEBOOK_PAGE_URL) return null;

  const pluginSrc = `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
    href: FACEBOOK_PAGE_URL,
    tabs: 'timeline',
    width: '500',
    height: '600',
    small_header: 'false',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'true'
  }).toString()}`;

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Facebook size={14} fill="currentColor" /> Følg os
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-3 uppercase italic tracking-tighter text-blue-900">
            Seneste fra Facebook
          </h2>
          <p className="text-slate-600 font-medium text-lg">
            Se vores nyeste projekter og opslag direkte fra Facebook
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Facebook iframe — kræver marketing-samtykke */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 overflow-hidden w-full max-w-[500px]">
            {marketing ? (
              <iframe
                src={pluginSrc}
                title="PR Entreprenørens Facebook-side"
                width="500"
                height="600"
                style={{ border: 'none', overflow: 'hidden', width: '100%', display: 'block' }}
                scrolling="no"
                frameBorder={0}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center text-center p-8 bg-slate-50">
                <Cookie size={40} className="text-blue-900 mb-4" />
                <p className="text-slate-700 font-bold mb-2">
                  Facebook-feedet kræver marketing-cookies
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Acceptér marketing-cookies for at se vores seneste opslag direkte her på siden — eller besøg Facebook-siden via knappen.
                </p>
                <button
                  onClick={openConsentBanner}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  Administrér cookie-samtykke
                </button>
              </div>
            )}
          </div>

          {/* Fallback / sekundær CTA — altid synlig */}
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-blue-900 mb-4 uppercase italic tracking-tight">
              Følg os på Facebook
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Vi deler regelmæssigt billeder fra konkrete projekter på Fyn — fra omfangsdræn og kloakseparering til oprensning af søer og minirensningsanlæg. Følg med og se hvad vi laver hver uge.
            </p>
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-900 hover:bg-blue-800 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-sm"
            >
              <Facebook size={20} fill="currentColor" />
              Besøg vores Facebook-side
              <ExternalLink size={16} />
            </a>
            <p className="text-xs text-slate-400 mt-4">
              Kan du ikke se feed'et? Det kan skyldes en cookie-blokering eller en ad-blocker — klik på knappen for at åbne siden direkte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookFeed;
