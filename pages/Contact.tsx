import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { PHONE_JACOB, PHONE_PREBEN, EMAIL_JACOB, EMAIL_PREBEN, EMAIL_FAKTURA, ADDRESS, GLN_NUMBER } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipCode: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', zipCode: '', email: '', message: '' });
    }, 3000);
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
            Vi er klar til at hjælpe døgnet rundt
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-blue-900 mb-8 uppercase italic">Kontaktinformation</h2>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                Vi sidder klar ved telefonen, men du kan også fange os døgnet rundt via vores AI-chat eller formularen til højre.
              </p>

              {/* Phone Numbers */}
              <div className="space-y-6 mb-12">
                <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-600 transition-all">
                  <div className="bg-blue-900 text-white p-3 rounded-xl shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Jacob (Kloakmester)</p>
                    <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="text-2xl font-black text-blue-900 hover:text-orange-600 transition-colors">
                      {PHONE_JACOB}
                    </a>
                    <p className="text-sm text-slate-600 mt-2">Alle tekniske spørgsmål og akutte problemer</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-600 transition-all">
                  <div className="bg-slate-100 text-blue-900 p-3 rounded-xl shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Preben (Direktør)</p>
                    <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="text-2xl font-black text-slate-900 hover:text-orange-600 transition-colors">
                      {PHONE_PREBEN}
                    </a>
                    <p className="text-sm text-slate-600 mt-2">Økonomi og planlægning af større projekter</p>
                  </div>
                </div>
              </div>

              {/* Other Contact Info */}
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="bg-orange-50 text-orange-600 p-3 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Jacob</p>
                    <a href={`mailto:${EMAIL_JACOB}`} className="text-lg font-black text-blue-900 hover:text-orange-600 transition-colors">
                      {EMAIL_JACOB}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-blue-50 text-blue-900 p-3 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Preben</p>
                    <a href={`mailto:${EMAIL_PREBEN}`} className="text-lg font-black text-blue-900 hover:text-orange-600 transition-colors">
                      {EMAIL_PREBEN}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-blue-50 text-blue-900 p-3 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Adresse</p>
                    <p className="text-lg font-black text-blue-900">{ADDRESS}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-100">
              <h3 className="text-2xl font-black text-blue-900 mb-6 uppercase italic">Send Os En Besked</h3>

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
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                      placeholder="Fx. Lars Hansen"
                    />
                  </div>

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
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-bold"
                      placeholder="Fx. 5000"
                    />
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

      {/* Invoicing Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border-l-8 border-blue-900 p-8 rounded-r-3xl">
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase italic">
              Elektronisk Fakturering
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                Vi modtager gerne elektroniske fakturaer via GLN:
              </p>
              <div className="bg-white px-6 py-4 rounded-xl border-2 border-blue-200 inline-block">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">GLN Nummer</div>
                <code className="text-3xl font-black text-blue-900">{GLN_NUMBER}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Area Coverage */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-blue-900 mb-6 uppercase italic tracking-tighter">
            Serviceområde
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Vi dækker hele Fyn samt Trekantsområdet med særligt fokus på Faaborg-Midtfyn, Assens og Odense
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Odense', 'Faaborg-Midtfyn', 'Assens', 'Svendborg', 'Middelfart', 'Nyborg', 'Kerteminde', 'Vejle', 'Kolding', 'Fredericia'].map((city) => (
              <span key={city} className="bg-white border-2 border-slate-200 px-6 py-3 rounded-full font-black text-blue-900 hover:border-orange-600 hover:text-orange-600 transition-all">
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
