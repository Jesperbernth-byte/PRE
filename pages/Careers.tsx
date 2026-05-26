import React from 'react';
import { Users, Briefcase, TrendingUp, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { PHONE_JACOB, EMAIL_JACOB } from '../constants';
import { usePageMeta } from '../lib/usePageMeta';

const Careers: React.FC = () => {
  usePageMeta({
    title: 'Karriere & Job hos PR Entreprenøren ApS | Kloakmester på Fyn',
    description: 'Vi søger dygtige håndværkere til vores team på Fyn. Se aktuelle jobopslag og hvordan det er at arbejde hos PR Entreprenøren ApS.',
    canonicalPath: '/karriere'
  });

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 uppercase italic tracking-tighter">
            KARRIERE <span className="text-orange-600">& JOB</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Vokser du med os? Vi søger dygtige håndværkere til vores team på Fyn.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-orange-50 border-l-8 border-orange-600 p-8 rounded-r-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={32} className="text-orange-600" />
              <h2 className="text-3xl font-black text-blue-900 uppercase italic">Vi Er I Vækst</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              PR Entreprenøren ApS er en ung virksomhed med store ambitioner. I dag er vi et team på 3
              – Preben, Jacob og Jesper – men vores mål er at vokse til 8-12 medarbejdere inden for de
              næste år. Vi søger fagligt stærke personer der deler vores værdier og vil være med til at
              bygge en professionel kloakvirksomhed på Fyn.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-black text-blue-900 mb-4">Hvem Søger Vi?</h3>
              <p className="text-lg text-slate-600 mb-4">
                Vi leder efter både erfarne fagfolk og kommende lærlinge der brænder for håndværk og kvalitet:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700"><strong>Lærlinge:</strong> Du vil lære faget fra grunden hos erfarne fagfolk i en virksomhed der investerer i din udvikling.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700"><strong>Entreprenører:</strong> Du har erfaring med jordarbejde, dræn og udgravning og kan arbejde selvstændigt såvel som i team.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100">
              <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase italic">Hvad Tilbyder Vi?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Faglig Udvikling</h4>
                    <p className="text-sm text-slate-600">Certificeringer, kurser og mulighed for at udvikle dine kompetencer</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Godt Arbejdsmiljø</h4>
                    <p className="text-sm text-slate-600">Et lille team hvor alle kender hinanden og man tager ansvar for fællesskabet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Moderne Udstyr</h4>
                    <p className="text-sm text-slate-600">Vores maskiner og værktøj er velholdte og professionelle</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Varieret Arbejde</h4>
                    <p className="text-sm text-slate-600">Ingen to dage er ens – fra akutte opgaver til større projekter</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Lokal Forankring</h4>
                    <p className="text-sm text-slate-600">Arbejde på Fyn – korte køreafstande og hjemme hver aften</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Mulighed for Indflydelse</h4>
                    <p className="text-sm text-slate-600">Som én af de første ansatte får du mulighed for at præge virksomhedens fremtid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-blue-900 mb-12 text-center uppercase italic">
            Aktuelle Stillinger
          </h2>

          {/* Aktiv stilling – Elev/lærling efter sommerferien 2026 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-orange-600 mb-6 shadow-xl shadow-orange-600/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-orange-600 text-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
                <Briefcase size={14} /> Aktiv stilling
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
                Start efter sommerferien 2026
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-blue-900 mb-3">
              Kloakmesterelev / -lærling
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Vil du lære kloakfaget hos en lokal autoriseret kloakmester på Fyn? Vi søger en elev eller lærling med start efter sommerferien 2026, der har lyst til at uddanne sig hos os og være med fra starten af en virksomhed i vækst.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Hos os får du varieret hverdag med opgaver som omfangsdræn, kloakseparering, TV-inspektion, rottespærrer, højvandslukkere og entreprenørarbejde i hele Faaborg-Midtfyn, Assens og Odense. Du arbejder side om side med erfarne folk og bliver oplært i alt fra praktisk håndværk til kundedialog og dokumentation.
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <h4 className="font-black text-blue-900 mb-3 text-sm uppercase tracking-wide">Vi forventer at du:</h4>
              <ul className="space-y-2">
                {[
                  'Er fysisk frisk og kan lide at arbejde udendørs',
                  'Har kørekort (eller er i gang) — så du kan komme på pladser',
                  'Tager initiativ, er nysgerrig og lærer hurtigt',
                  'Møder til tiden, gør tingene færdige og siger til når noget undrer dig',
                  'Har lyst til at uddanne dig som kloakmester på sigt'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded-r-xl mb-6">
              <p className="font-bold text-blue-900 mb-2">Sådan søger du</p>
              <p className="text-slate-700 leading-relaxed">
                Send et kort CV og en kort beskrivelse af hvorfor du gerne vil lære faget hos os til Jacob på <a href={`mailto:${EMAIL_JACOB}?subject=Ansøgning – Elev/lærling 2026`} className="text-orange-600 font-bold hover:text-orange-700">{EMAIL_JACOB}</a>, eller ring direkte for en uformel snak. Vi læser ansøgninger løbende.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${EMAIL_JACOB}?subject=Ansøgning – Elev/lærling 2026`}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Mail size={18} /> Send ansøgning
              </a>
              <a
                href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-6 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
              >
                <Phone size={18} /> Ring til Jacob
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-slate-100 mb-6 hover:border-orange-600 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-orange-600" size={32} />
              <h3 className="text-2xl font-black text-blue-900">Generelt Interesseret?</h3>
            </div>
            <p className="text-lg text-slate-600 mb-6">
              Vi har ikke altid specifikke stillinger slået op, men vi modtager gerne uopfordrede ansøgninger
              fra dygtige håndværkere der kunne tænke sig at være en del af teamet. Send din ansøgning og CV,
              så kontakter vi dig når der opstår en relevant mulighed.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-900 font-bold">💡 TIP: Fortæl os om din erfaring, dine styrker, og hvad du søger i et nyt job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12">
            <Users size={64} className="mx-auto mb-6 text-orange-500" />
            <h2 className="text-4xl sm:text-5xl font-black mb-6 uppercase italic tracking-tighter">
              Send Din Ansøgning
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Vi glæder os til at høre fra dig! Send din ansøgning og CV til Jacob.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={`mailto:${EMAIL_JACOB}?subject=Jobansøgning til PR Entreprenøren`}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <Mail size={24} />
              Send Email
            </a>
            <a
              href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
              className="bg-white hover:bg-slate-100 text-blue-900 px-8 py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all"
            >
              <Phone size={24} />
              Ring til Jacob
            </a>
          </div>

          <div className="mt-12 text-slate-400 text-sm">
            <p>Ved ansøgning bedes du inkludere CV og en kort beskrivelse af din erfaring.</p>
            <p className="mt-2">Vi behandler alle ansøgninger fortroligt.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
