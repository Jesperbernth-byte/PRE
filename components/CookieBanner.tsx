import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { getConsent, setConsent } from '../lib/consent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);

    const reopen = () => {
      const current = getConsent();
      setStatistics(!!current?.statistics);
      setMarketing(!!current?.marketing);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener('cookie-consent-reopen', reopen);
    return () => window.removeEventListener('cookie-consent-reopen', reopen);
  }, []);

  if (!visible) return null;

  const persist = (s: boolean, m: boolean) => {
    setConsent({ statistics: s, marketing: m });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-0 bottom-[88px] lg:bottom-4 z-[200] lg:left-4 lg:right-auto lg:max-w-md"
    >
      <div className="bg-white border-t-4 lg:border-t-0 lg:border-l-4 border-orange-600 shadow-2xl lg:rounded-2xl p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-orange-100 text-orange-700 p-2 rounded-xl shrink-0">
            <Cookie size={20} />
          </div>
          <div className="flex-1">
            <h3 id="cookie-banner-title" className="text-lg font-black text-blue-900 uppercase tracking-tight">
              Vi bruger cookies
            </h3>
          </div>
          <button
            onClick={() => persist(false, false)}
            aria-label="Luk og afvis valgfri cookies"
            className="text-slate-400 hover:text-slate-700 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <p id="cookie-banner-description" className="text-sm text-slate-700 leading-relaxed mb-4">
          Vi bruger nødvendige cookies så sitet virker. Med dit samtykke bruger vi også cookies til statistik og marketing — fx for at se hvilke sider der virker bedst og vise Facebook-feedet. Du kan ændre dit valg når som helst i bunden af siden.
        </p>

        <p className="text-xs text-slate-500 mb-4">
          Læs mere i vores <Link to="/cookiepolitik" className="underline font-bold hover:text-orange-600">cookiepolitik</Link> og <Link to="/privatlivspolitik" className="underline font-bold hover:text-orange-600">privatlivspolitik</Link>.
        </p>

        {showDetails && (
          <div className="space-y-3 mb-4 border-t border-slate-100 pt-4">
            <ConsentRow
              title="Nødvendige"
              description="Krævet for at sitet virker (cookie-samtykke, admin-login). Kan ikke fravælges."
              checked
              disabled
            />
            <ConsentRow
              title="Statistik"
              description="Vercel Analytics og Google Analytics — anonyme tal om hvilke sider der bliver besøgt."
              checked={statistics}
              onChange={setStatistics}
            />
            <ConsentRow
              title="Marketing"
              description="Facebook-feedet på forsiden og Facebook Pixel — bruges til at måle effekt af annoncer og social trafik."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-2">
          <button
            onClick={() => setShowDetails(s => !s)}
            className="text-sm font-bold text-slate-600 hover:text-blue-900 transition-colors flex items-center justify-center gap-1 px-3 py-2"
          >
            {showDetails ? <><ChevronUp size={14} /> Skjul</> : <><ChevronDown size={14} /> Indstillinger</>}
          </button>
          {showDetails ? (
            <button
              onClick={() => persist(statistics, marketing)}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-black px-4 py-3 rounded-xl text-sm uppercase tracking-wider transition-colors"
            >
              Gem valg
            </button>
          ) : (
            <button
              onClick={() => persist(false, false)}
              className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-4 py-3 rounded-xl text-sm uppercase tracking-wider transition-colors"
            >
              Kun nødvendige
            </button>
          )}
          <button
            onClick={() => persist(true, true)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black px-4 py-3 rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg"
          >
            Accepter alle
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConsentRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}

const ConsentRow: React.FC<ConsentRowProps> = ({ title, description, checked, disabled, onChange }) => (
  <label className={`flex gap-3 items-start cursor-pointer ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      className="mt-1 w-5 h-5 accent-orange-600 cursor-pointer disabled:cursor-not-allowed"
    />
    <div className="flex-1">
      <div className="text-sm font-black text-blue-900">{title}</div>
      <div className="text-xs text-slate-600 leading-relaxed">{description}</div>
    </div>
  </label>
);

export default CookieBanner;
