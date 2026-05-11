import React from 'react';
import { Phone, Mail, MapPin, CheckCircle, Clock, Shield, Building2 } from 'lucide-react';
import { PHONE_JACOB, PHONE_PREBEN, EMAIL_JACOB, EMAIL_PREBEN, EMAIL_INFO, ADDRESS, GLN_NUMBER, CVR, COMPANY_NAME } from '../constants';
import { usePageMeta } from '../lib/usePageMeta';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  usePageMeta({
    title: 'Kontakt – Ring eller skriv | PR Entreprenøren ApS',
    description: 'Få en uforpligtende snak med Preben eller Jacob. Vi sidder klar ved telefonen og svarer mails dagligt. Akut udrykning under 2 timer på hele Fyn.',
    canonicalPath: '/kontakt'
  });

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 uppercase italic tracking-tighter">
            KONTAKT <span className="text-orange-600">OS</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Få en uforpligtende snak om din opgave – vi sidder klar ved telefonen
          </p>
        </div>
      </section>

      {/* Trust-building intro */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-6 uppercase italic tracking-tighter">
            Tag fat i os – det koster ikke noget
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Står du med vand i kælderen, en sammensunken kloak, et påbud fra kommunen eller bare et spørgsmål om din ejendom? Så er du allerede et skridt på vejen ved at have fundet os. Vi er en lokal kloakmester- og entreprenørvirksomhed på Fyn, og vi har gjort det til vores fornemmeste opgave at være nemme at få fat på, ærlige i rådgivningen og dygtige til håndværket.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            En henvendelse forpligter dig ikke til noget. Vi giver gratis besigtigelse og fast pris efter en kort gennemgang af opgaven – og vi siger fra, hvis vi ikke er det rigtige valg til netop din situation. Du får et klart svar, så du kan træffe en oplyst beslutning.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-full border-2 border-slate-100">
              <Clock size={18} className="text-orange-600" />
              <span className="text-sm font-bold text-slate-700">Akut udrykning under 2 timer</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-full border-2 border-slate-100">
              <Shield size={18} className="text-orange-600" />
              <span className="text-sm font-bold text-slate-700">Autoriseret kloakmester</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-full border-2 border-slate-100">
              <CheckCircle size={18} className="text-orange-600" />
              <span className="text-sm font-bold text-slate-700">Gratis besigtigelse & fast pris</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - moved to top */}
      <ContactForm source="form" />

      {/* Ledelse - Big team cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">Mød os</p>
            <h2 className="text-4xl sm:text-5xl font-black text-blue-900 uppercase italic tracking-tighter">
              Ledelse
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl">
              Når du ringer eller skriver, er det os to du kommer til at tale med. Vælg den der passer bedst til din opgave – eller tag bare den første der svarer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preben */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-600 transition-all hover:shadow-xl">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/team/preben-close.png"
                  alt="Preben – Direktør i PR Entreprenøren ApS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-blue-900 mb-1">Preben</h3>
                <p className="text-base font-bold text-orange-600 uppercase tracking-wider mb-2">Direktør</p>
                <p className="text-sm text-slate-600 mb-6">Økonomi.</p>
                <div className="space-y-3 border-t border-slate-200 pt-5">
                  <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors group">
                    <Phone size={18} className="text-blue-900 group-hover:text-orange-600 shrink-0" />
                    <span className="font-bold text-lg">T: {PHONE_PREBEN}</span>
                  </a>
                  <a href={`mailto:${EMAIL_PREBEN}`} className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors group">
                    <Mail size={18} className="text-blue-900 group-hover:text-orange-600 shrink-0" />
                    <span className="font-medium">E: {EMAIL_PREBEN}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Jacob */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-600 transition-all hover:shadow-xl">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/team/jacob-close.png"
                  alt="Jacob – Daglig Leder & Kloakmester hos PR Entreprenøren ApS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-blue-900 mb-1">Jacob</h3>
                <p className="text-base font-bold text-orange-600 uppercase tracking-wider mb-2">Daglig Leder & Kloakmester</p>
                <p className="text-sm text-slate-600 mb-6">Besigtigelser, tilbud, dialog med kunder og leverandører, planlægning, kundeservice.</p>
                <div className="space-y-3 border-t border-slate-200 pt-5">
                  <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors group">
                    <Phone size={18} className="text-blue-900 group-hover:text-orange-600 shrink-0" />
                    <span className="font-bold text-lg">T: {PHONE_JACOB}</span>
                  </a>
                  <a href={`mailto:${EMAIL_JACOB}`} className="flex items-center gap-3 text-slate-700 hover:text-orange-600 transition-colors group">
                    <Mail size={18} className="text-blue-900 group-hover:text-orange-600 shrink-0" />
                    <span className="font-medium">E: {EMAIL_JACOB}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virksomhedsoplysninger */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 rounded-3xl p-10 sm:p-14 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Building2 size={28} className="text-orange-500" />
              <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">
                Virksomhedsoplysninger
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">Hovednummer</p>
                <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="text-3xl font-black text-white hover:text-orange-300 transition-colors flex items-center gap-3">
                  <Phone size={24} className="text-orange-500" />
                  {PHONE_PREBEN}
                </a>
                <p className="text-slate-400 text-sm mt-2">Vi svarer typisk inden for få minutter i dagtimerne</p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">E-mail</p>
                <a href={`mailto:${EMAIL_INFO}`} className="text-2xl font-black text-white hover:text-orange-300 transition-colors flex items-center gap-3 break-all">
                  <Mail size={22} className="text-orange-500 shrink-0" />
                  {EMAIL_INFO}
                </a>
                <p className="text-slate-400 text-sm mt-2">Skriv til os hele døgnet – vi svarer i dagtimerne</p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">Adresse</p>
                <p className="text-xl font-black text-white flex items-start gap-3">
                  <MapPin size={22} className="text-orange-500 shrink-0 mt-1" />
                  <span>{ADDRESS}</span>
                </p>
                <p className="text-slate-400 text-sm mt-2 ml-9">Kontor og maskinplads</p>
              </div>

              <div>
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">{COMPANY_NAME}</p>
                <p className="text-base text-slate-200 leading-relaxed">
                  CVR: <span className="font-bold text-white">{CVR}</span>
                </p>
                <p className="text-base text-slate-200 leading-relaxed">
                  GLN/EAN: <span className="font-bold text-white">{GLN_NUMBER}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 text-sm text-slate-400">
              Faktura sendes via e-faktura/EAN, eller på e-mail til <a href="mailto:faktura@prentreprenoer.dk" className="text-orange-400 hover:text-orange-300 font-bold">faktura@prentreprenoer.dk</a>.
            </div>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase italic tracking-tighter">
            Serviceområde
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Vi dækker hele Fyn samt Trekantsområdet med særligt fokus på Faaborg-Midtfyn, Assens og Odense.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Odense', 'Faaborg-Midtfyn', 'Assens', 'Svendborg', 'Middelfart', 'Nyborg', 'Kerteminde', 'Vejle', 'Kolding', 'Fredericia'].map((city) => (
              <span key={city} className="bg-slate-50 border-2 border-slate-200 px-6 py-3 rounded-full font-black text-blue-900 hover:border-orange-600 hover:text-orange-600 transition-all">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
