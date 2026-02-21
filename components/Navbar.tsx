
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { PHONE_PREBEN, LOGO_PATH, LOGO_ALT } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Forside', href: '/' },
    { name: 'Ydelser', href: '/ydelser' },
    { name: 'Om os', href: '/om-os' },
    { name: 'Medlemskaber', href: '/medlemskaber' },
    { name: 'Karriere', href: '/karriere' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Admin', href: '/admin', className: 'text-xs text-slate-400' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src={LOGO_PATH}
                alt={LOGO_ALT}
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-bold text-slate-600 hover:text-blue-900 transition-colors ${link.className || ''}`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
              className="bg-blue-900 text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-blue-900/10 active:scale-95"
            >
              <Phone size={16} fill="currentColor" /> {PHONE_PREBEN}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-900 p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-5 text-lg font-bold text-slate-800 hover:bg-slate-50 border-b border-slate-100 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <a
                href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-3 w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-900/20"
              >
                <Phone size={24} fill="currentColor" /> {PHONE_PREBEN}
              </a>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Døgnvagt ved akutte problemer</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
