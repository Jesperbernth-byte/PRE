import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, ArrowLeft, MapPin, Clock, Shield } from 'lucide-react';
import { SERVICES, PHONE_PREBEN, PHONE_JACOB, ADDRESS, CVR } from '../constants';

// Map service slugs to their picture folder names
const SERVICE_IMAGES: Record<string, { folder: string; images: string[] }> = {
  'omfangsdraen': {
    folder: 'Dræn',
    images: ['20210628_065610.jpg', '20210628_065624.jpg', '20210628_100202.jpg', '20210629_124507.jpg']
  },
  'kloakarbejde': {
    folder: 'Kloak arbejde',
    images: ['20220202_092520.jpg', '20220202_093331.jpg', '20220711_103441.jpg', '20220829_153238.jpg']
  },
  'rottespaerre': {
    folder: 'Rottespærre',
    images: ['20220112_100342.jpg', '20220112_100358.jpg']
  },
  'hoejvandslukker': {
    folder: 'Højvandslukke',
    images: ['20210805_135906.jpg', '20210805_140226.jpg']
  },
  'tv-inspektion': {
    folder: 'Tv-inspektion',
    images: ['20210904_112241.jpg', '20210904_132016.jpg', '20211126_151126.jpg']
  },
  'lar-anlaeg': {
    folder: 'Dræn',
    images: ['20210628_100206.jpg', '20210629_124507.jpg']
  },
  'entreprenoer-arbejde': {
    folder: 'Anlægsarbejde',
    images: ['20210628_065610.jpg']
  },
  'naturpleje': {
    folder: 'Oprensning af sø',
    images: ['20210628_065610.jpg']
  },
  'miniransanlaeg': {
    folder: 'Miniransanlæg',
    images: ['20210616_080635.jpg', '20210616_080700.jpg']
  },
  'broend-renovering': {
    folder: 'Brønd renovering',
    images: ['20210628_065610.jpg']
  },
  'olietanke': {
    folder: 'Olie tanke',
    images: ['20210628_065610.jpg']
  },
  'fundament': {
    folder: 'Fundament',
    images: ['20210628_065610.jpg']
  },
  'vandledning': {
    folder: 'Vandledning',
    images: ['20210628_065610.jpg']
  }
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} på Fyn | PR Entreprenøren ApS`;
      // Update meta description
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', `${service.description} Autoriseret kloakmester på Fyn og Trekantsområdet. Ring ${PHONE_PREBEN} for gratis besigtigelse.`);
      }
    }
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const imageData = SERVICE_IMAGES[service.slug] || null;
  const primaryImage = imageData
    ? `/pictures/${imageData.folder}/${imageData.images[0]}`
    : null;
  const galleryImages = imageData
    ? imageData.images.slice(1).map(img => `/pictures/${imageData.folder}/${img}`)
    : [];

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription || service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "PR Entreprenøren ApS",
      "telephone": PHONE_PREBEN.replace(/\s/g, ''),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nørregårdsvej 17",
        "addressLocality": "Broby",
        "postalCode": "5672",
        "addressCountry": "DK"
      },
      "areaServed": "Fyn og Trekantsområdet"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 55.2408,
        "longitude": 10.5456
      },
      "geoRadius": "100000"
    }
  };

  // Find related services (excluding current)
  const relatedServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pb-20">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-900 transition-colors">Forside</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-blue-900 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-blue-900 font-bold">{service.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {primaryImage && (
          <div className="absolute inset-0 opacity-25">
            <img
              src={primaryImage}
              alt={service.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> Alle services
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
              <Shield size={14} /> Autoriseret kloakmester
            </div>
            <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
              {service.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-10 leading-relaxed font-medium">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30"
              >
                <Phone size={20} fill="currentColor" /> Ring {PHONE_PREBEN}
              </a>
              <Link
                to="/contact"
                className="bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              >
                Gratis besigtigelse <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-blue-900 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-orange-400" /> Autoriseret kloakmester
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-400" /> Hele Fyn & Trekantsområdet
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-orange-400" /> Akut udrykning under 2 timer
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-orange-400" /> DM&E Kloakmestergaranti
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Long description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-8 uppercase italic tracking-tighter">
                Hvad er {service.title.toLowerCase()}?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {service.longDescription || service.description}
              </p>

              {/* Image gallery */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-slate-100">
                      <img
                        src={img}
                        alt={`${service.title} - billede ${i + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-blue-900 rounded-3xl p-8 text-white sticky top-28">
                <h3 className="text-2xl font-black mb-4 uppercase italic">Få et tilbud</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Gratis og uforpligtende besigtigelse. Vi vurderer dit behov og giver et fast tilbud.
                </p>
                <a
                  href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
                  className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-all mb-3"
                >
                  <Phone size={18} fill="currentColor" /> {PHONE_PREBEN}
                </a>
                <Link
                  to="/contact"
                  className="w-full bg-white/10 border border-white/20 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  Send besked online
                </Link>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Kontakt direkte</div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div>Jacob (kloakmester): <a href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`} className="text-orange-400 font-bold hover:text-orange-300">{PHONE_JACOB}</a></div>
                    <div>Preben (direktør): <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="text-orange-400 font-bold hover:text-orange-300">{PHONE_PREBEN}</a></div>
                  </div>
                </div>
              </div>

              {/* Why choose us */}
              <div className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-100">
                <h3 className="font-black text-blue-900 mb-4 uppercase tracking-wide text-sm">Hvorfor vælge os?</h3>
                <ul className="space-y-3">
                  {[
                    'Autoriseret kloakmester',
                    'Fast pris – ingen overraskelser',
                    'Akut udrykning på Fyn',
                    'DM&E Kloakmestergaranti',
                    '5 års garanti på arbejde',
                    'Godkendt kvalitetsledelsessystem'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                      <CheckCircle size={16} className="text-green-600 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-12 uppercase italic tracking-tighter text-center">
              Ofte Stillede Spørgsmål
            </h2>
            {/* FAQ Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": service.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer
                    }
                  }))
                })
              }}
            />
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-orange-600 transition-all group"
                >
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
      )}

      {/* Related Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-blue-900 mb-10 uppercase italic tracking-tighter">
            Andre services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.slug}`}
                className="group bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 hover:border-orange-600 transition-all hover:shadow-xl"
              >
                <h3 className="text-lg font-black text-blue-900 mb-2 uppercase italic group-hover:text-orange-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex items-center gap-2 text-xs font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
                  Læs mere <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 uppercase italic tracking-tighter">
            Klar til at komme i gang?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Vi tilbyder gratis besigtigelse og fast pris. Ring nu eller send en besked.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl"
            >
              <Phone size={24} fill="currentColor" /> Ring {PHONE_PREBEN}
            </a>
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
            >
              Bestil besigtigelse <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
