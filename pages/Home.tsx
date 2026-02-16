import React from 'react';
import { ArrowRight, Phone, ShieldCheck, CheckCircle2, Star, Camera, Zap, Award, Quote, MapPin, Clock } from 'lucide-react';
import { COMPANY_NAME, TAGLINE, USPs, SERVICES, PHONE_JACOB, TEAM, CASES, REVIEWS, CERTIFICATIONS, FAQ_GENERAL } from '../constants';
import ProblemGuide from '../components/ProblemGuide';
import ImageAnalyzer from '../components/ImageAnalyzer';

const HomeUpdated: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden hero-section">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/Hero/hero.jpg"
            alt="Kloakarbejde og drænsystemer - PR Entreprenøren"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <a
              href="https://www.sik.dk/registre/autorisationsregister?search_index=46075536&forretningsomr=Kloakmestervirksomhed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-colors"
            >
              <ShieldCheck size={16} fill="currentColor" /> Se autorisation hos Sikkerhedsstyrelsen
            </a>
            <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-[1]">
              AUTORISERET <br/>
              <span className="text-orange-500">KLOAKMESTER</span> PÅ FYN
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 leading-relaxed font-medium">
              Omfangsdræn, kloakseparering, rottespærrer, TV-inspektion og højvandslukkere. Hurtig udrykning ved akutte problemer på hele Fyn og i Trekantsområdet.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="#/contact"
                className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 active:scale-95"
              >
                Bestil besigtigelse <ArrowRight size={24} />
              </a>
              <a
                href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
                className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95"
              >
                <Phone size={24} fill="currentColor" /> {PHONE_JACOB}
              </a>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">5.0 Stjerner (32 anmeldelser)</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                <CheckCircle2 size={16} className="text-green-500" /> 500+ Tilfredse Kunder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Updated with concrete numbers */}
      <div className="bg-white border-b py-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center lg:justify-between gap-10 lg:gap-0 items-center">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
              &lt;2h
            </div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Responstid <br/> Ved Akutte Sager</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
              500+
            </div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Gennemførte <br/> Projekter</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
              15+
            </div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Års Erfaring <br/> På Fyn</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-xs group-hover:bg-blue-900 group-hover:text-white transition-colors">
              5 år
            </div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Garanti På <br/> Arbejde</span>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-slate-50 border-b py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-blue-900 mb-10 uppercase italic text-center tracking-tight">
            Autorisationer & Garantier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-100 hover:border-orange-600 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center text-blue-900 font-black text-xs group-hover:ring-2 group-hover:ring-orange-600 transition-all">
                    <img
                      src={cert.badge}
                      alt={cert.name}
                      className="w-full h-full object-cover logo"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-black text-blue-900 uppercase tracking-wide mb-1">{cert.name}</div>
                    <div className="text-xs text-slate-500 font-bold">{cert.issuer}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {cert.customerBenefit}
                </p>
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
              Upload et billede af dit kloakproblem, mistænkelig asbest eller fugt i kælderen. Vores AI-assistent giver dig en lynhurtig vurdering døgnet rundt.
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

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">Mød Teamet</h2>
            <p className="text-slate-600 font-medium text-lg">Vi er klar til at hjælpe dig</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-100 hover:border-orange-600 transition-all group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-6 ring-4 ring-white shadow-xl group-hover:ring-orange-600 transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 text-center mb-2 uppercase italic">{member.name}</h3>
                <p className="text-sm font-bold text-orange-600 text-center mb-4 uppercase tracking-widest">{member.role}</p>
                <p className="text-slate-600 text-center mb-6 leading-relaxed">{member.description}</p>
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="w-full bg-blue-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-all"
                >
                  <Phone size={18} fill="currentColor" /> {member.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Services Overview with Prices */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase italic tracking-tighter text-blue-900">Vores Ydelser</h2>
            <p className="text-slate-600 font-medium text-lg">Gennemsigtige priser og professionelt håndværk</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <a
                key={service.id}
                href={`#/services/${service.slug}`}
                className="group relative bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 hover:border-orange-600 transition-all hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-sm mb-6 group-hover:bg-orange-600 transition-colors">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight italic text-blue-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
                  Læs mere <ArrowRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">Hvad Kunderne Siger</h2>
            <div className="flex items-center justify-center gap-2 text-orange-600">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" />)}
              <span className="ml-2 text-2xl font-black text-blue-900">5.0</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-orange-600 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-orange-600">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                  <Quote size={24} className="text-slate-200" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="border-t pt-4">
                  <div className="font-black text-blue-900 text-sm">{review.name}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin size={12} />
                    <span>{review.location} · {review.date}</span>
                  </div>
                </div>
              </div>
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
              href="#/contact"
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40"
            >
              Bestil besigtigelse <ArrowRight size={24} />
            </a>
            <a
              href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
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