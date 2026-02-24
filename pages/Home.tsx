import React from 'react';
import { ArrowRight, Phone, CheckCircle2, Camera, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, PHONE_PREBEN, CERTIFICATIONS, FAQ_GENERAL, HERO_TITLE, HERO_SUBTITLE, HERO_IMAGE } from '../constants';
import ProblemGuide from '../components/ProblemGuide';
import ImageAnalyzer from '../components/ImageAnalyzer';

const HomeUpdated: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden hero-section">
        <div className="absolute inset-0 opacity-30">
          <img
            src={HERO_IMAGE}
            alt="Kloakarbejde og drænsystemer - PR Entreprenøren"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-[1]">
              AUTORISERET <br/>
              <span className="text-orange-500">KLOAKMESTER</span> PÅ FYN
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 leading-relaxed font-medium">
              {HERO_SUBTITLE}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="/contact"
                className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 active:scale-95"
              >
                Bestil besigtigelse <ArrowRight size={24} />
              </a>
              <a
                href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95"
              >
                <Phone size={24} fill="currentColor" /> {PHONE_PREBEN}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - TRUE facts only */}
      <div className="bg-white border-b py-10 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-orange-600 transition-colors shadow-lg">
              <ShieldCheck size={28} fill="currentColor" />
            </div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Autoriseret</span>
            <span className="text-xs text-slate-500 mt-1">Kloakmester</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-orange-600 transition-colors shadow-lg">
              <CheckCircle2 size={28} />
            </div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Gratis</span>
            <span className="text-xs text-slate-500 mt-1">Besigtigelse</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-orange-600 transition-colors shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Hurtig</span>
            <span className="text-xs text-slate-500 mt-1">Udrykning</span>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-orange-600 transition-colors shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Lokal</span>
            <span className="text-xs text-slate-500 mt-1">Virksomhed</span>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-slate-50 border-b py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase italic text-center tracking-tight">
            Autorisationer & Garantier
          </h2>
          <div className="flex justify-center mb-8">
            <a
              href="https://www.sik.dk/registre/autorisationsregister?search_index=46075536&forretningsomr=Kloakmestervirksomhed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all"
            >
              <ShieldCheck size={18} fill="currentColor" /> Se autorisation hos Sikkerhedsstyrelsen
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border-2 border-slate-100 hover:border-orange-600 transition-all group flex-1 min-w-[180px] max-w-[220px] overflow-hidden">
                <div className="bg-slate-50 p-6 flex items-center justify-center h-40 group-hover:bg-orange-50 transition-colors">
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    className="max-h-28 max-w-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-4 border-t border-slate-100">
                  <div className="font-black text-blue-900 text-sm uppercase tracking-wide mb-1">{cert.name}</div>
                  <div className="text-xs text-slate-500">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Image Analysis Section */}
      <section className="py-24 bg-white border-b relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
          <Camera size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Zap size={14} fill="currentColor" /> Nyhed: AI-Assistent
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-6 leading-tight uppercase italic tracking-tighter">Vis os problemet</h2>
            <p className="text-slate-600 font-medium text-lg leading-relaxed">
              Upload et billede af dit kloakproblem eller fugt i kælderen. Vores AI-assistent giver dig en lynhurtig vurdering døgnet rundt.
            </p>
          </div>
          <ImageAnalyzer />
        </div>
      </section>

      {/* Problem Diagnostic Guide */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4 uppercase italic">Vælg dit problem</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Få svar med det samme i guiden</p>
          </div>
          <ProblemGuide />
        </div>
      </section>



      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase italic tracking-tighter text-blue-900">Vores Ydelser</h2>
            <p className="text-slate-600 font-medium text-lg">Professionelt og autoriseret håndværk</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group relative bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-orange-600 transition-all hover:shadow-2xl"
              >
                {service.image && (
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-black mb-3 uppercase tracking-tight italic text-blue-900 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
                    Læs mere <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">Ofte Stillede Spørgsmål</h2>
            <p className="text-slate-600 font-medium text-lg">Find svar på de mest almindelige spørgsmål</p>
          </div>
          <div className="space-y-4">
            {FAQ_GENERAL.map((faq, i) => (
              <details key={i} className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 hover:border-orange-600 transition-all group">
                <summary className="font-black text-lg text-blue-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-orange-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase italic tracking-tighter">
            Klar til at komme i gang?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Få et gratis og uforpligtende tilbud i dag. Vi kommer gerne forbi for en snak om dit projekt.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="/contact"
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40"
            >
              Bestil besigtigelse <ArrowRight size={24} />
            </a>
            <a
              href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
              className="bg-white text-blue-900 px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
            >
              <Phone size={24} fill="currentColor" /> Ring Nu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUpdated;