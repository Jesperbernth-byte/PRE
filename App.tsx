import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeadChat from './components/LeadChat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Memberships from './pages/Memberships';
import AdminDashboard from './pages/AdminDashboard';
import { PHONE_PREBEN, PHONE_JACOB, EMAIL_JACOB, EMAIL_PREBEN, ADDRESS, CVR } from './constants';

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Logo + Om os */}
      <div className="md:col-span-2">
        <img src="/logo.png" alt="PR Entreprenøren ApS" className="h-16 w-auto object-contain mb-6" />
        <p className="text-slate-400 leading-relaxed mb-4">Autoriseret kloakmester og entreprenør på Fyn og i Trekantsområdet. Vi bygger løsninger der holder for fremtiden.</p>
        <p className="text-slate-500 text-sm">{ADDRESS}</p>
        <div className="mt-4 text-orange-500 font-bold flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Svarer døgnet rundt
        </div>
      </div>

      {/* Kontaktkort Preben */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
      <p className="text-slate-500 text-sm">Vi dækker hele fyn samt trekantsområdet</p>
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
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/karriere" element={<Careers />} />
            <Route path="/medlemskaber" element={<Memberships />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <LeadChat />
      </div>
    </Router>
  );
};

export default App;
