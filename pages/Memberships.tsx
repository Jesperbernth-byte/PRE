import React from 'react';
import { Shield, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { MEMBERSHIPS, PARTNERS, CERTIFICATIONS } from '../constants';

const Memberships: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 uppercase italic tracking-tighter">
            MEDLEMSKABER <span className="text-orange-600">& PARTNERE</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Vi er en del af stærke faglige netværk og samarbejder med førende leverandører.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xl text-slate-700 leading-relaxed text-center">
            Som professionel kloakvirksomhed er vi en del af relevante brancheorganisationer og
            kvalitetssikringssystemer. Det giver dig som kunde tryghed om at arbejdet udføres efter
            anbefalede standarder og med adgang til garantiordninger.
          </p>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Shield size={48} className="mx-auto mb-6 text-blue-900" />
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">
              Medlemskaber & Certificeringer
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Vi er del af anerkendte faglige organisationer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMBERSHIPS.map((membership, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border-2 border-slate-100 hover:border-orange-600 transition-all shadow-md"
              >
                {membership.logo && (
                  <div className="w-full h-32 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    <img
                      src={membership.logo}
                      alt={membership.name}
                      className="max-w-full max-h-full object-contain p-4"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  {membership.type}
                </div>
                <h3 className="text-xl font-black text-blue-900 mb-3">{membership.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">{membership.description}</p>
                {membership.link && (
                  <a
                    href={membership.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm hover:gap-3 transition-all"
                  >
                    Læs mere <ExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Detailed */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Award size={48} className="mx-auto mb-6 text-blue-900" />
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">
              Autorisationer & Godkendelser
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              Vi opfylder alle lovkrav og industrisstandarder
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-orange-600 transition-all shadow-sm group"
              >
                <div className="bg-slate-50 p-8 flex items-center justify-center h-48 group-hover:bg-orange-50 transition-colors">
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    className="max-h-32 max-w-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-5 border-t border-slate-100">
                  <h3 className="font-black text-blue-900 text-sm uppercase tracking-wide mb-1">{cert.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{cert.issuer}</p>
                  {(cert as any).verificationLink && (
                    <a
                      href={(cert as any).verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-600 text-xs font-bold hover:text-orange-700"
                    >
                      Verificer <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Partners */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <CheckCircle size={48} className="mx-auto mb-6 text-orange-500" />
            <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase italic tracking-tighter">
              Produktpartnere & Leverandører
            </h2>
            <p className="text-slate-400 font-medium text-lg">
              Vi arbejder kun med dokumenteret kvalitet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((partner, i) => (
              <div
                key={i}
                className="bg-white/5 border-2 border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-orange-600 transition-all"
              >
                {partner.logo && (
                  <div className="w-full h-24 bg-white rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-black mb-3">{partner.name}</h3>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm">{partner.description}</p>
                {partner.link && (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm hover:gap-3 transition-all"
                  >
                    Læs mere <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality System Info */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-orange-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-600 text-white p-4 rounded-2xl">
                <Shield size={32} />
              </div>
              <h2 className="text-3xl font-black text-blue-900 uppercase italic">
                Kvalitetsledelsessystem
              </h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Vi har et godkendt kvalitetsledelsessystem via Kloakmestrenes Kontrolinstans. Dette sikrer:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                <span className="text-slate-700">Alle myndighedsansøgninger og færdigmeldinger håndteres korrekt</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                <span className="text-slate-700">Fuldstændig sporbarhed i alle projekter</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                <span className="text-slate-700">Overholdelse af alle gældende regler for kloak og jordhåndtering</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                <span className="text-slate-700">Professionel dokumentation til kommuner og forsikringsselskaber</span>
              </li>
            </ul>
            <a
              href="https://kloakmestreneskontrolinstans.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              Læs om kontrolinstansen <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase italic">
            DM&E Kloakmestergaranti
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Som medlem af Danske Maskinstationer og Entreprenører er vi omfattet af deres kloakmestergarantiordning.
            Det betyder ekstra sikkerhed for dig som kunde – skulle der mod forventning opstå problemer, er du
            økonomisk beskyttet.
          </p>
          <a
            href="https://dmoge.dk/brancher/entreprenoer-og-kloakmester/dme_kloakmestergaranti/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all"
          >
            Læs om garantiordningen <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Memberships;
