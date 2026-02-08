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
import { PHONE_JACOB, PHONE_PREBEN, EMAIL_JACOB, EMAIL_PREBEN, ADDRESS, CVR } from './constants';

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-2xl font-black mb-6 uppercase italic">PR Entreprenøren ApS</h3>
        <p className="text-slate-400 leading-relaxed mb-6">Autoriseret kloakmester og entreprenør. Vi bygger løsninger der holder for fremtiden.</p>
        <div className="text-orange-500 font-bold flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Svarer døgnet rundt
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-slate-500">Kontakt</h4>
        <ul className="space-y-4 text-slate-300">
          <li>{ADDRESS}</li>
          <li>Jacob: <a href={`mailto:${EMAIL_JACOB}`} className="hover:text-white transition-colors">{EMAIL_JACOB}</a></li>
          <li>Preben: <a href={`mailto:${EMAIL_PREBEN}`} className="hover:text-white transition-colors">{EMAIL_PREBEN}</a></li>
          <li>Jacob: <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{PHONE_JACOB}</a></li>
          <li>Preben: <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{PHONE_PREBEN}</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-slate-500">Serviceområde</h4>
        <p className="text-slate-300 leading-relaxed">Vi dækker hele Fyn samt Trekantsområdet (Vejle, Kolding, Fredericia, Middelfart).</p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">Odense</span>
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">Svendborg</span>
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">Middelfart</span>
          <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">Fredericia</span>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
      &copy; {new Date().getFullYear()} PR Entreprenøren ApS. Alle rettigheder forbeholdes. CVR: {CVR}.
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
