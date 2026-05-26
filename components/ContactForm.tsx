import React, { useRef, useState } from 'react';
import { Phone, Send, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { PHONE_PREBEN, PHONE_JACOB } from '../constants';
import { trackFormSubmit } from '../lib/tracking';

const ContactForm: React.FC<{ source?: string }> = ({ source = 'form' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipCode: '',
    email: '',
    message: '',
    website: '' // honeypot — skal forblive tom
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formLoadedAt = useRef<number>(Date.now());

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
          source,
          website: formData.website,
          formLoadedAt: formLoadedAt.current
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
      trackFormSubmit({ source: 'form' });

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', zipCode: '', email: '', message: '', website: '' });
        formLoadedAt.current = Date.now();
      }, 4000);
    } catch (err) {
      console.error('Form submit failed:', err);
      setErrorMessage('Kunne ikke sende beskeden. Tjek din internetforbindelse eller ring til os direkte.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
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
              <p className="text-sm text-slate-600 mb-3">Ved vand i kælder, oversvømmelse eller andet der ikke kan vente, så ring hellere direkte til Jacob.</p>
              <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-orange-600 font-black hover:text-orange-700 transition-colors">
                <Phone size={18} />
                Ring {PHONE_JACOB}
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
              <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
                {/* Honeypot — bots udfylder typisk alle felter; menneskelige brugere ser ikke dette */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
  );
};

export default ContactForm;
