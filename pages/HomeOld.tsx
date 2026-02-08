
import React from 'react';
import { ArrowRight, Phone, ShieldCheck, CheckCircle2, Star, Camera, Zap } from 'lucide-react';
import { COMPANY_NAME, TAGLINE, USPs, SERVICES, PHONE_JACOB } from '../constants';
import ProblemGuide from '../components/ProblemGuide';
import ImageAnalyzer from '../components/ImageAnalyzer';

const Home: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541976590-71394168159b?auto=format&fit=crop&q=80&w=1920" 
            alt="Construction background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-orange-600/20">
              <ShieldCheck size={16} fill="currentColor" /> Autoriseret Kloakmester
            </div>
            <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-[1]">
              LØSNINGER <br/>
              DER <span className="text-orange-500">HOLDER.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 leading-relaxed font-medium">
              Vi sikrer din ejendom med autoriseret kloakarbejde, omfangsdræn og asbestsanering på hele Fyn og i Trekantområdet.
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
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Fyns Foretrukne</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                <CheckCircle2 size={16} className="text-green-500" /> Byggegaranti Medlem
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-b py-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center lg:justify-between gap-10 lg:gap-0 items-center">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-2xl group-hover:bg-blue-900 group-hover:text-white transition-colors">100%</div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Autoriseret <br/> Kloakarbejde</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-2xl group-hover:bg-blue-900 group-hover:text-white transition-colors">24/7</div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Døgnvagt <br/> Ved Akutte Sager</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-2xl group-hover:bg-blue-900 group-hover:text-white transition-colors">FYN</div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Dækker Hele <br/> Øen & Trekanten</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-black text-2xl group-hover:bg-blue-900 group-hover:text-white transition-colors">GTI</div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">Vi Køber <br/> Kun Kvalitet</span>
          </div>
        </div>
      </div>

      {/* AI Image Analysis Section */}
      <section className="py-24 bg-slate-50 border-b relative overflow-hidden">
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4 uppercase italic">Vælg dit problem</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Få svar med det samme i guiden</p>
          </div>
          <ProblemGuide />
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/10 pb-12">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-4 uppercase italic tracking-tighter">Vores Ydelser</h2>
              <div className="w-48 h-2 bg-orange-600"></div>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Som autoriserede specialister leverer vi løsninger, der overholder alle lovkrav og sikrer din ejendoms værdi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <a 
                key={service.id} 
                href={`#/services/${service.slug}`}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-orange-600 hover:border-orange-600 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:scale-150 transition-transform duration-700">
                  <ShieldCheck size={200} />
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm mb-8 group-hover:bg-white group-hover:text-orange-600 transition-colors">
                  <ShieldCheck size={36} />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight italic">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8 group-hover:text-white/90 transition-colors font-medium">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-3 text-sm font-black text-orange-500 group-hover:text-white transition-all uppercase tracking-widest">
                  Læs mere <ArrowRight size={20} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* USPs / Why Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-10 leading-[0.9] text-blue-900 uppercase italic tracking-tighter">
                DERFOR SKAL DU VÆLGE <br/> <span className="text-orange-600">OS</span>
              </h2>
              <div className="space-y-8">
                {USPs.map((usp, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="mt-1 bg-blue-900 text-white p-2 rounded-xl shrink-0 group-hover:bg-orange-600 transition-colors shadow-lg">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-blue-900 uppercase italic mb-1 tracking-tight">{usp.title}</h4>
                      <p className="text-slate-600 leading-relaxed font-medium">{usp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl relative">
              <div className="absolute -top-6 -left-6 bg-orange-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                <HardHat size={40} />
              </div>
              <h3 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tight">Få et uforpligtende besøg</h3>
              <p className="text-slate-400 mb-10 font-medium">Vi kommer gerne forbi til en snak om jeres projekt. Det koster ingenting at få et konkret tilbud.</p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="text" placeholder="Navn" className="w-full bg-white/5 border-2 border-white/10 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-600 transition-colors font-bold" />
                  <input type="tel" placeholder="Telefon" className="w-full bg-white/5 border-2 border-white/10 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-600 transition-colors font-bold" />
                </div>
                <textarea placeholder="Beskriv kort dit problem..." className="w-full bg-white/5 border-2 border-white/10 text-white rounded-2xl px-6 py-4 h-40 focus:outline-none focus:border-orange-600 transition-colors font-bold resize-none"></textarea>
                <button className="w-full bg-orange-600 hover:bg-white hover:text-orange-600 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-xl shadow-xl shadow-orange-600/30 active:scale-95">
                  Send besked nu
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple HardHat helper icon if not already globally available
const HardHat = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 18V10a10 10 0 0 1 20 0v8" />
    <path d="M2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
  </svg>
);

export default Home;
