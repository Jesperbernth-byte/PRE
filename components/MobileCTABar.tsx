import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { PHONE_PREBEN } from '../constants';

const MobileCTABar: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white border-t-2 border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-all"
          aria-label={`Ring til PR Entreprenøren – ${PHONE_PREBEN}`}
        >
          <Phone size={20} fill="currentColor" />
          <span className="text-sm uppercase tracking-wider">Ring nu</span>
        </a>
        <Link
          to="/kontakt"
          className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          <Mail size={20} />
          <span className="text-sm uppercase tracking-wider">Skriv besked</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileCTABar;
