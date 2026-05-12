import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../types';

interface Props {
  service: Service;
}

const ServiceCard: React.FC<Props> = ({ service }) => (
  <Link
    to={`/ydelser/${service.slug}`}
    className="group relative bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-orange-600 transition-all hover:shadow-2xl"
  >
    {service.image && (
      <div className="h-48 overflow-hidden bg-slate-100">
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
      <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm">
        {service.description}
      </p>
      <div className="flex items-center gap-2 text-sm font-black text-orange-600 group-hover:gap-3 transition-all uppercase tracking-widest">
        Læs mere <ArrowRight size={18} />
      </div>
    </div>
  </Link>
);

export default ServiceCard;
