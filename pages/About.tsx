import React from 'react';
import { Phone, Award, Target, Users, CheckCircle2 } from 'lucide-react';
import { TEAM, USPs, CERTIFICATIONS, COMPANY_HISTORY } from '../constants';

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
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 uppercase italic tracking-tighter">Mød Teamet</h2>
            <p className="text-slate-600 font-medium text-lg">De mennesker bag PR Entreprenøren</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border-2 border-slate-100 hover:border-orange-600 transition-all group shadow-lg">
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 uppercase italic tracking-tighter">
              Certificeringer & Godkendelser
            </h2>
            <p className="text-slate-400 font-medium text-lg">Vi er fuldt autoriserede og forsikrede</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => {
              const Component = (cert as any).verificationLink ? 'a' : 'div';
              const linkProps = (cert as any).verificationLink ? {
                href: (cert as any).verificationLink,
                target: "_blank",
                rel: "noopener noreferrer"
              } : {};

              return (
                <Component key={i} {...linkProps} className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-orange-600 transition-all group block">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 group-hover:ring-2 group-hover:ring-orange-600 transition-all">
                      <img
                        src={cert.badge}
                        alt={cert.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-tight mb-1">{cert.name}</h3>
                      <p className="text-xs text-slate-400 font-bold">{cert.issuer}</p>
                      {(cert as any).verificationLink && (
                        <p className="text-[10px] text-orange-400 font-bold mt-1 uppercase tracking-widest">
                          ↗ Bekræft hos Sikkerhedsstyrelsen
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {cert.customerBenefit}
                  </p>
                </Component>
              );
            })}
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
