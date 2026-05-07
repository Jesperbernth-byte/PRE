import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, Clock, Shield, Building2, AlertTriangle } from 'lucide-react';
import { PHONE_JACOB, PHONE_PREBEN, EMAIL_JACOB, EMAIL_PREBEN, EMAIL_INFO, ADDRESS, GLN_NUMBER, CVR, COMPANY_NAME } from '../constants';
import { usePageMeta } from '../lib/usePageMeta';

const Contact: React.FC = () => {
  usePageMeta({
    title: 'Kontakt – Ring eller skriv | PR Entreprenøren ApS',
    description: 'Få en uforpligtende snak med Preben eller Jacob. Vi sidder klar ved telefonen og svarer mails dagligt. Akut udrykning under 2 timer på hele Fyn.',
    canonicalPath: '/kontakt'
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipCode: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          zipCode: formData.zipCode,
          email: formData.email || null,
          problem: formData.message,
          source: 'form'
        })
      });

      const result = await response.json().catch(() => ({ success: false, message: 'Uventet svar fra serveren' }));

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || 'Der opstod en fejl. Prøv igen eller ring til os.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', zipCode: '', email: '', message: '' });
      }, 4000);
    } catch (err) {
      console.error('Form submit failed:', err);
      setErrorMessage('Kunne ikke sende beskeden. Tjek din internetforbindelse eller ring til os direkte.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

      {/* Ledelse - Big team cards */}
      <section className="py-20 bg-slate-50">
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
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-600 transition-all hover:shadow-xl">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/team/preben-close.png"
                  alt="Preben – Direktør i PR Entreprenøren ApS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-blue-900 mb-1">Preben</h3>
                <p className="text-base font-bold text-orange-600 uppercase tracking-wider mb-6">Direktør</p>
                <div className="space-y-3 border-t border-slate-100 pt-5">
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
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-600 transition-all hover:shadow-xl">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/team/jacob-close.png"
                  alt="Jacob – Daglig Leder og autoriseret kloakmester"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-blue-900 mb-1">Jacob</h3>
                <p className="text-base font-bold text-orange-600 uppercase tracking-wider mb-2">Daglig Leder</p>
                <p className="text-sm text-slate-600 mb-6">Autoriseret kloakmester · Tekniske spørgsmål og akutte sager</p>
                <div className="space-y-3 border-t border-slate-100 pt-5">
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
      <section className="py-20 bg-white">
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

      {/* Contact Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <p className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">Skriv til os</p>
              <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase italic tracking-tighter">
                Send en besked
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Foretrækker du at skrive frem for at ringe? Send os en kort beskrivelse af din opgave, så vender vi tilbage hurtigst muligt – typisk inden for få timer i dagtimerne.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Du behøver ikke have alt på plads. Et par linjer om hvad du oplever, og en adresse eller postnummer, er rigeligt til at vi kan komme i gang.
              </p>
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
                <p className="text-sm font-bold text-blue-900 mb-2">Akut sag?</p>
                <p className="text-sm text-slate-600 mb-3">Ved vand i kælder, oversvømmelse eller andet der ikke kan vente, så ring hellere direkte.</p>
                <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-orange-600 font-black hover:text-orange-700 transition-colors">
                  <Phone size={18} />
                  Ring {PHONE_PREBEN}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-3xl p-8 border-2 border-slate-100">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-black text-green-600 mb-2 uppercase">Tak for din besked!</h4>
                  <p className="text-slate-600">Vi vender tilbage hurtigst muligt</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="flex gap-3 items-start bg-red-50 border-2 border-red-200 text-red-800 rounded-xl p-4">
                      <AlertTriangle size={20} className="shrink-0 mt-0.5 text-red-600" />
                      <div className="text-sm">
                        <p className="font-bold mb-1">Kunne ikke sende beskeden</p>
                        <p>{errorMessage}</p>
                        <p className="mt-2">Du er velkommen til at ringe direkte: <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="font-black underline">{PHONE_PREBEN}</a></p>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                      Dit Navn *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                      placeholder="Fx. Lars Hansen"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                        placeholder="Fx. 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                        Postnummer *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{4}"
                        maxLength={4}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                        placeholder="Fx. 5000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                      Email (Valgfri)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                      placeholder="din@email.dk"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                      Beskriv Dit Problem *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none resize-none transition-all font-bold"
                      placeholder="Fortæl os om dit problem, så vi kan hjælpe bedst muligt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-xl transition-all uppercase tracking-widest text-lg shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        SENDER...
                      </>
                    ) : (
                      <>
                        <Send size={24} />
                        SEND BESKED
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Vi svarer normalt inden for 2 timer i dagtimerne
                  </p>
                </form>
              )}
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
