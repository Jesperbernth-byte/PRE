import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

// Redirect component for /services/:slug → /ydelser/:slug
const RedirectToYdelser: React.FC = () => {
  const { slug } = useParams();
  return <Navigate to={`/ydelser/${slug}`} replace />;
};
import LeadChat from './components/LeadChat';
import MobileCTABar from './components/MobileCTABar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Memberships from './pages/Memberships';
import ServiceDetail from './pages/ServiceDetail';
import CityLanding from './pages/CityLanding';
import Privacy from './pages/Privacy';
import CookiePolicy from './pages/CookiePolicy';
import AdminDashboard from './pages/AdminDashboard';
import CookieBanner from './components/CookieBanner';
import { openConsentBanner } from './lib/consent';
import { initTracking } from './lib/tracking';
import { PHONE_PREBEN, PHONE_JACOB, EMAIL_JACOB, EMAIL_PREBEN, ADDRESS, CVR, FOOTER_TAGLINE, SERVICE_AREA, COMPANY_HISTORY, GSC_VERIFICATION_TOKEN, PERSON_PREBEN, PERSON_JACOB } from './constants';
import { Target, CheckCircle2 } from 'lucide-react';

const MissionValues: React.FC = () => (
  <section className="py-12 bg-gradient-to-r from-orange-50 to-orange-100/50 border-y-2 border-orange-200">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white border-l-8 border-orange-600 p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Target size={28} className="text-orange-600" />
            <h3 className="text-xl font-black text-blue-900 uppercase italic">Vores Mission</h3>
          </div>
          <p className="text-base text-slate-700 italic font-medium">
            "{COMPANY_HISTORY.mission}"
          </p>
        </div>

        {/* Values */}
        <div className="bg-white border-l-8 border-blue-900 p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={28} className="text-blue-900" />
            <h3 className="text-xl font-black text-blue-900 uppercase italic">Vores Værdier</h3>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {COMPANY_HISTORY.values.map((value, i) => (
              <div key={i} className="bg-blue-50 px-4 py-2 rounded-full border-2 border-blue-900 font-black text-blue-900 text-sm">
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// MissionValues vises ikke på Om Os — den side har samme indhold inline.
const MissionValuesGlobal: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/om-os') return null;
  return <MissionValues />;
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Logo + Om os */}
      <div className="md:col-span-2">
        <img src="/LOGO-NYT-uden-baggrund.png" alt="PR Entreprenøren ApS" className="h-28 w-auto object-contain mb-6" />
        <p className="text-slate-400 leading-relaxed mb-4">{FOOTER_TAGLINE}</p>
        <p className="text-slate-500 text-sm">{ADDRESS}</p>
        <div className="mt-4 text-orange-500 font-bold flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Svarer døgnet rundt
        </div>
      </div>

      {/* Kontaktkort Preben */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <img
          src={PERSON_PREBEN.image}
          alt={`${PERSON_PREBEN.name} - ${PERSON_PREBEN.title}`}
          className="w-16 h-16 rounded-xl object-cover object-top mb-4 border-2 border-white/20"
        />
        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">{PERSON_PREBEN.title}</div>
        <h4 className="text-xl font-black text-white mb-4">{PERSON_PREBEN.name}</h4>
        <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-2 text-sm font-bold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          {PHONE_PREBEN}
        </a>
        <a href={`mailto:${EMAIL_PREBEN}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          {EMAIL_PREBEN}
        </a>
      </div>

      {/* Kontaktkort Jacob */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <img
          src={PERSON_JACOB.image}
          alt={`${PERSON_JACOB.name} - ${PERSON_JACOB.title}`}
          className="w-16 h-16 rounded-xl object-cover object-top mb-4 border-2 border-blue-500/50"
        />
        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">{PERSON_JACOB.title}</div>
        <h4 className="text-xl font-black text-white mb-4">{PERSON_JACOB.name}</h4>
        <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-2 text-sm font-bold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          {PHONE_JACOB}
        </a>
        <a href={`mailto:${EMAIL_JACOB}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          {EMAIL_JACOB}
        </a>
      </div>
    </div>

    {/* Lokal forankring */}
    <div className="max-w-7xl mx-auto px-4 mt-10 pt-8 border-t border-white/10">
      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Kloakmester i</div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link to="/kloakmester-faaborg-midtfyn" className="text-slate-400 hover:text-orange-400 transition-colors">Faaborg-Midtfyn</Link>
        <Link to="/kloakmester-assens" className="text-slate-400 hover:text-orange-400 transition-colors">Assens</Link>
        <Link to="/kloakmester-odense" className="text-slate-400 hover:text-orange-400 transition-colors">Odense</Link>
      </div>
    </div>

    {/* Compliance links */}
    <div className="max-w-7xl mx-auto px-4 mt-6 pt-6 border-t border-white/10">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
        <Link to="/privatlivspolitik" className="hover:text-orange-400 transition-colors">Privatlivspolitik</Link>
        <Link to="/cookiepolitik" className="hover:text-orange-400 transition-colors">Cookiepolitik</Link>
        <button
          onClick={() => openConsentBanner()}
          className="hover:text-orange-400 transition-colors text-left"
        >
          Cookie-indstillinger
        </button>
      </div>
    </div>

    {/* Serviceområde */}
    <div className="max-w-7xl mx-auto px-4 mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm">{SERVICE_AREA}</p>
      <p className="text-slate-500 text-xs text-center">
        &copy; {new Date().getFullYear()} PR Entreprenøren ApS. Alle rettigheder forbeholdes. CVR: {CVR}.
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  useEffect(() => {
    initTracking();
    const onConsentChanged = () => initTracking();
    window.addEventListener('cookie-consent-changed', onConsentChanged);

    // Inject Google Search Console verification meta-tag if token is set.
    if (GSC_VERIFICATION_TOKEN && GSC_VERIFICATION_TOKEN.trim()) {
      const id = 'gsc-verification';
      if (!document.getElementById(id)) {
        const meta = document.createElement('meta');
        meta.id = id;
        meta.setAttribute('name', 'google-site-verification');
        meta.setAttribute('content', GSC_VERIFICATION_TOKEN.trim());
        document.head.appendChild(meta);
      }
    }

    return () => window.removeEventListener('cookie-consent-changed', onConsentChanged);
  }, []);

  return (
    <Router basename="/">
      <div className="flex flex-col min-h-screen pb-[88px] lg:pb-0">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Danish URLs */}
            <Route path="/om-os" element={<About />} />
            <Route path="/ydelser" element={<Services />} />
            <Route path="/ydelser/:slug" element={<ServiceDetail />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/karriere" element={<Careers />} />
            <Route path="/medlemskaber" element={<Memberships />} />

            {/* City landing pages */}
            <Route path="/kloakmester-odense" element={<CityLanding />} />
            <Route path="/kloakmester-faaborg-midtfyn" element={<CityLanding />} />
            <Route path="/kloakmester-assens" element={<CityLanding />} />

            {/* Compliance */}
            <Route path="/privatlivspolitik" element={<Privacy />} />
            <Route path="/cookiepolitik" element={<CookiePolicy />} />

            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Redirects from old English URLs to Danish */}
            <Route path="/about" element={<Navigate to="/om-os" replace />} />
            <Route path="/services" element={<Navigate to="/ydelser" replace />} />
            <Route path="/services/:slug" element={<RedirectToYdelser />} />
            <Route path="/contact" element={<Navigate to="/kontakt" replace />} />

            {/* Redirects fra omstrukturerede service-URL'er */}
            <Route path="/ydelser/kloakarbejde" element={<Navigate to="/ydelser/kloakseparering" replace />} />
            <Route path="/ydelser/lar-anlaeg" element={<Navigate to="/ydelser/kloakseparering" replace />} />
          </Routes>
        </main>
        <MissionValuesGlobal />
        <Footer />
        <LeadChat />
        <MobileCTABar />
        <CookieBanner />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
