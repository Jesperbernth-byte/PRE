
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LOGO_PATH, LOGO_ALT } from '../constants';
import CallButton from './CallButton';

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
          <div className="flex items-stretch h-full">
            <Link to="/" className="flex items-center h-full py-0">
              <img
                src={LOGO_PATH}
                alt={LOGO_ALT}
                className="h-full w-auto object-contain"
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
            <CallButton className="px-6 py-3 text-sm" />
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
              <CallButton className="w-full py-5 text-xl" />
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Døgnvagt ved akutte problemer</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
