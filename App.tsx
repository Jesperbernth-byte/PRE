import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';

// Redirect component for /services/:slug → /ydelser/:slug
const RedirectToYdelser: React.FC = () => {
  const { slug } = useParams();
  return <Navigate to={`/ydelser/${slug}`} replace />;
};
import LeadChat from './components/LeadChat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Memberships from './pages/Memberships';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import { PHONE_PREBEN, PHONE_JACOB, EMAIL_JACOB, EMAIL_PREBEN, ADDRESS, CVR, FOOTER_TAGLINE, SERVICE_AREA, COMPANY_HISTORY } from './constants';
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

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Logo + Om os */}
      <div className="md:col-span-2">
        <img src="/logo.png" alt="PR Entreprenøren ApS" className="h-16 w-auto object-contain mb-6" />
        <p className="text-slate-400 leading-relaxed mb-4">{FOOTER_TAGLINE}</p>
        <p className="text-slate-500 text-sm">{ADDRESS}</p>
        <div className="mt-4 text-orange-500 font-bold flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Svarer døgnet rundt
        </div>
      </div>

      {/* Kontaktkort Preben */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <img
          src="/team/preben-cropped.png"
          alt="Preben - Direktør"
          className="w-16 h-16 rounded-xl object-cover mb-4 border-2 border-white/20"
        />
        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">Direktør</div>
        <h4 className="text-xl font-black text-white mb-1">Preben</h4>
        <p className="text-slate-400 text-xs mb-4">Grundlægger & overordnet ansvarlig</p>
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
          src="/team/jacob-cropped.png"
          alt="Jacob - Autoriseret Kloakmester"
          className="w-16 h-16 rounded-xl object-cover mb-4 border-2 border-blue-500/50"
        />
        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">Daglig Leder</div>
        <h4 className="text-xl font-black text-white mb-1">Jacob</h4>
        <p className="text-slate-400 text-xs mb-4">Autoriseret kloakmester</p>
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

    {/* Serviceområde */}
    <div className="max-w-7xl mx-auto px-4 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm">{SERVICE_AREA}</p>
      <p className="text-slate-500 text-xs text-center">
        &copy; {new Date().getFullYear()} PR Entreprenøren ApS. Alle rettigheder forbeholdes. CVR: {CVR}.
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router basename="/">
      <div className="flex flex-col min-h-screen">
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
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Redirects from old English URLs to Danish */}
            <Route path="/about" element={<Navigate to="/om-os" replace />} />
            <Route path="/services" element={<Navigate to="/ydelser" replace />} />
            <Route path="/services/:slug" element={<RedirectToYdelser />} />
            <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
          </Routes>
        </main>
        <MissionValues />
        <Footer />
        <LeadChat />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
