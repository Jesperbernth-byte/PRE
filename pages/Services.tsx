import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { SERVICES, PHONE_PREBEN } from '../constants';

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
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-orange-600 transition-all hover:shadow-2xl"
              >
                {service.image && (
                  <div className="h-52 overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-black mb-3 uppercase tracking-tight italic text-blue-900 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-5 font-medium text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
                    Læs mere <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
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
              href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`}
              className="bg-orange-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-xl"
            >
              <Phone size={24} fill="currentColor" /> {PHONE_PREBEN}
            </a>
            <Link
              to="/contact"
              className="bg-blue-900 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
            >
              Send Besked
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
