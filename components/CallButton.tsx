import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { PHONE_JACOB, PHONE_PREBEN } from '../constants';

interface CallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'hero';
}

const CallButton: React.FC<CallButtonProps> = ({ className = '', variant = 'primary' }) => {
  const [showModal, setShowModal] = useState(false);

  const baseClass = variant === 'hero'
    ? "bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95"
    : variant === 'secondary'
    ? "bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-lg"
    : "bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30";

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`${baseClass} ${className}`}
      >
        <Phone size={24} fill="currentColor" /> Ring Nu
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-black text-blue-900 mb-2 uppercase italic">Hvem vil du tale med?</h3>
            <p className="text-slate-600 mb-8 text-sm">Vælg hvem du vil ringe til</p>

            <div className="space-y-4">
              {/* Jacob */}
              <a
                href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
                className="block bg-blue-900 hover:bg-blue-800 text-white p-6 rounded-2xl transition-all group"
                onClick={() => setShowModal(false)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/team/jacob-cropped.png"
                    alt="Jacob"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <div className="text-xs text-orange-400 font-black uppercase tracking-wider mb-1">Kloakmester</div>
                    <div className="text-xl font-black mb-1">Jacob</div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Phone size={16} />
                      <span className="font-bold">{PHONE_JACOB}</span>
                    </div>
                    <div className="text-xs text-white/70 mt-2">Tekniske spørgsmål & akutte problemer</div>
                  </div>
                </div>
              </a>

              {/* Preben */}
              <a
                href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                className="block bg-slate-100 hover:bg-slate-200 text-slate-900 p-6 rounded-2xl transition-all group"
                onClick={() => setShowModal(false)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/team/preben-cropped.png"
                    alt="Preben"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-slate-300"
                  />
                  <div className="flex-1">
                    <div className="text-xs text-orange-600 font-black uppercase tracking-wider mb-1">Direktør</div>
                    <div className="text-xl font-black mb-1">Preben</div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone size={16} />
                      <span className="font-bold">{PHONE_PREBEN}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-2">Økonomi & planlægning af projekter</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallButton;
