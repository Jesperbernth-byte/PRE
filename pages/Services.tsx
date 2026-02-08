import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { SERVICES, PHONE_JACOB } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 uppercase italic tracking-tighter">
            VORES <span className="text-orange-600">SERVICES</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Professionelle løsninger til private og erhverv på hele Fyn
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <a
                key={service.id}
                href={`#/services/${service.slug}`}
                className="group bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 hover:border-orange-600 transition-all hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-sm mb-6 group-hover:bg-orange-600 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight italic text-blue-900 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
                {service.priceRange && (
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-xl font-black text-sm inline-block mb-4">
                    {service.priceRange}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest mt-4">
                  Læs mere <ArrowRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-6 uppercase italic tracking-tighter">
            Ikke Sikker På Hvad Du Har Brug For?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Ring til os, så hjælper vi med at finde den rigtige løsning til dit problem
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href={`tel:${PHONE_JACOB.replace(/\s/g, '')}`}
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-xl"
            >
              <Phone size={24} fill="currentColor" /> Ring til Jacob
            </a>
            <a
              href="#/contact"
              className="bg-blue-900 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
            >
              Send Besked
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
