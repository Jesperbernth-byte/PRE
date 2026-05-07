import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, Clock, Shield, Phone, Mail } from 'lucide-react';
import { CITIES, SERVICES, PHONE_PREBEN, PHONE_JACOB, EMAIL_INFO, ADDRESS, CVR } from '../constants';
import CallButton from '../components/CallButton';
import { usePageMeta } from '../lib/usePageMeta';

const CityLanding: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const cityConfig = CITIES.find(c => c.slug === slug);

  usePageMeta({
    title: cityConfig ? `${cityConfig.title} | PR Entreprenøren ApS` : 'Kloakmester | PR Entreprenøren ApS',
    description: cityConfig ? cityConfig.metaDescription : '',
    canonicalPath: cityConfig ? `/${cityConfig.slug}` : undefined
  });

  if (!cityConfig) {
    return <Navigate to="/" replace />;
  }

  const topServices = cityConfig.topServices
    .map(s => SERVICES.find(svc => svc.slug === s))
    .filter((s): s is NonNullable<typeof s> => s != null);

  // LocalBusiness schema with city-specific areaServed
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PR Entreprenøren ApS – ${cityConfig.title}`,
    "description": cityConfig.metaDescription,
    "telephone": PHONE_PREBEN.replace(/\s/g, ''),
    "email": EMAIL_INFO,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nørregårdsvej 17",
      "addressLocality": "Broby",
      "postalCode": "5672",
      "addressRegion": "DK-83",
      "addressCountry": "DK"
    },
    "areaServed": {
      "@type": "City",
      "name": cityConfig.city
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cityConfig.localFAQ.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Shield size={14} /> Autoriseret kloakmester
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
              <MapPin size={14} /> {cityConfig.travelTime}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 uppercase italic tracking-tighter leading-tight">
            {cityConfig.title}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-medium">
            {cityConfig.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CallButton className="px-8 py-4 text-lg" />
            <Link
              to="/kontakt"
              className="bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              Gratis besigtigelse <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-blue-900 text-white py-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-orange-400" /> Autoriseret kloakmester</div>
          <div className="flex items-center gap-2"><Clock size={16} className="text-orange-400" /> Akut udrykning under 2 timer</div>
          <div className="flex items-center gap-2"><Shield size={16} className="text-orange-400" /> 5 års garanti</div>
          <div className="flex items-center gap-2"><MapPin size={16} className="text-orange-400" /> Lokal i {cityConfig.city}</div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-8 uppercase italic tracking-tighter">
            Lokal kloakmester i {cityConfig.city}
          </h2>
          <div className="text-lg text-slate-700 leading-relaxed space-y-6">
            {cityConfig.intro.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">Mest efterspurgt i {cityConfig.city}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-12 uppercase italic tracking-tighter">
            Ydelser vi løser hver uge
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map(service => (
              <Link
                key={service.id}
                to={`/ydelser/${service.slug}`}
                className="group bg-white border-2 border-slate-100 rounded-3xl p-6 hover:border-orange-600 transition-all hover:shadow-xl"
              >
                <h3 className="text-xl font-black text-blue-900 mb-3 uppercase italic tracking-tight group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center gap-2 text-xs font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
                  Læs mere <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* In-content CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-l-8 border-orange-600 rounded-r-2xl p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
              <div>
                <p className="text-sm font-black text-orange-600 uppercase tracking-widest mb-2">Brug for hjælp i {cityConfig.city}?</p>
                <p className="text-xl font-bold text-blue-900">Ring direkte – vi giver fast pris efter besigtigelse uden forpligtelser.</p>
              </div>
              <a
                href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                className="flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-4 rounded-xl whitespace-nowrap transition-colors shadow-xl"
              >
                <Phone size={20} fill="currentColor" /> {PHONE_PREBEN}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local angle */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-8 uppercase italic tracking-tighter">
            Det vi ser i {cityConfig.city}
          </h2>
          <div className="text-lg text-slate-700 leading-relaxed space-y-6">
            {cityConfig.localAngle.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-black text-orange-600 uppercase tracking-widest mb-3">Vi kører til</p>
          <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-8 uppercase italic tracking-tighter">
            Områder i {cityConfig.city} vi dækker
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cityConfig.coverage.map(area => (
              <span key={area} className="bg-white border-2 border-slate-200 px-5 py-2 rounded-full text-sm font-bold text-blue-900">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-12 uppercase italic tracking-tighter text-center">
            Spørgsmål fra {cityConfig.city}-kunder
          </h2>
          <div className="space-y-4">
            {cityConfig.localFAQ.map((faq, i) => (
              <details key={i} className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100 hover:border-orange-600 transition-all group">
                <summary className="font-black text-lg text-blue-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-orange-600 text-2xl group-open:rotate-45 transition-transform shrink-0 ml-4">+</span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 uppercase italic tracking-tighter">
            Klar til at få løst dit problem i {cityConfig.city}?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Gratis besigtigelse og fast pris. Ring til Jacob på {PHONE_JACOB} eller send en besked online – vi vender tilbage hurtigst muligt.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <CallButton className="px-12 py-6 text-xl shadow-2xl" />
            <Link
              to="/kontakt"
              className="bg-white text-blue-900 px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
            >
              <Mail size={22} /> Send besked
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            PR Entreprenøren ApS · {ADDRESS} · CVR {CVR}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CityLanding;
