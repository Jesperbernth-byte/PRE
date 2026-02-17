import React from 'react';
import { Award, Target, CheckCircle2, ExternalLink } from 'lucide-react';
import { USPs, CERTIFICATIONS, COMPANY_HISTORY } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 uppercase italic tracking-tighter">
            OM <span className="text-orange-600">OS</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Autoriseret kloakmester på Fyn og i Trekantsområdet siden 2015
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose lg:prose-xl max-w-none">
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase italic">{COMPANY_HISTORY.title}</h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              {COMPANY_HISTORY.intro}
            </p>
            {COMPANY_HISTORY.story.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-lg text-slate-600 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
            <div className="bg-orange-50 border-l-8 border-orange-600 p-8 rounded-r-3xl my-12">
              <div className="flex items-center gap-3 mb-4">
                <Target size={32} className="text-orange-600" />
                <h3 className="text-2xl font-black text-blue-900 uppercase italic">Vores Mission</h3>
              </div>
              <p className="text-lg text-slate-700 italic font-medium">
                "{COMPANY_HISTORY.mission}"
              </p>
            </div>

            <div className="bg-blue-50 border-l-8 border-blue-900 p-8 rounded-r-3xl my-12">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 size={32} className="text-blue-900" />
                <h3 className="text-2xl font-black text-blue-900 uppercase italic">Vores Værdier</h3>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                {COMPANY_HISTORY.values.map((value, i) => (
                  <div key={i} className="bg-white px-6 py-3 rounded-full border-2 border-blue-900 font-black text-blue-900 text-lg">
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* USPs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">
              Derfor Vælger Kunder Os
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {USPs.map((usp, i) => (
              <div key={i} className="flex gap-6 bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 hover:border-orange-600 transition-all group">
                <div className="mt-1 bg-blue-900 text-white p-3 rounded-xl shrink-0 group-hover:bg-orange-600 transition-colors shadow-lg">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="font-black text-2xl text-blue-900 uppercase italic mb-2 tracking-tight">{usp.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase italic tracking-tighter">
              Certificeringer & Godkendelser
            </h2>
            <p className="text-slate-400 font-medium text-lg">Vi er fuldt autoriserede og forsikrede</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden group hover:ring-2 hover:ring-orange-600 transition-all">
                <div className="bg-white p-6 flex items-center justify-center h-44">
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    className="max-h-32 max-w-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="bg-slate-800 p-4 border-t border-white/10">
                  <div className="font-black text-white text-xs uppercase tracking-wide mb-1">{cert.name}</div>
                  <div className="text-slate-400 text-xs">{cert.issuer}</div>
                  {(cert as any).verificationLink && (
                    <a
                      href={(cert as any).verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-400 text-xs font-bold mt-2 hover:text-orange-300"
                    >
                      Verificer <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-black mb-2">500+</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-90">Projekter</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">15+</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-90">Års Erfaring</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">&lt;2h</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-90">Responstid</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">5 år</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-90">Garanti</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
