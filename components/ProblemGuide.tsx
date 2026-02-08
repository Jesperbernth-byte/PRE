
import React, { useState } from 'react';
import { Droplets, Info, AlertTriangle, Bug, ArrowRight, CheckCircle2 } from 'lucide-react';

const options = [
  { id: 'fugt', title: 'Vand eller fugt i kælder', icon: Droplets, color: 'text-blue-600', advice: 'Det tyder på utæt fundament eller manglende dræn. Vi anbefaler en gennemgang af dit omfangsdræn.' },
  { id: 'lugt', title: 'Lugt af kloak indendørs', icon: AlertTriangle, color: 'text-orange-600', advice: 'Kan være udtørret vandlås eller et brud på røret under huset. Vi anbefaler TV-inspektion.' },
  { id: 'stop', title: 'Afløb stopper ofte til', icon: Info, color: 'text-slate-600', advice: 'Sandsynligvis rødder eller aflejringer i rørene. Vi kan spule og foretage TV-inspektion.' },
  { id: 'rotter', title: 'Mistanke om rotter', icon: Bug, color: 'text-red-600', advice: 'Akut problem! Vi monterer autoriserede rottespærrer og reparerer eventuelle brud.' },
];

const ProblemGuide: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOption = options.find(o => o.id === selected);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-blue-900 mb-2">Hvad oplever du?</h2>
        <p className="text-slate-600 mb-8">Vælg et punkt for at få en hurtig vurdering og rådgivning.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                selected === opt.id 
                  ? 'border-blue-900 bg-blue-50 ring-4 ring-blue-900/5' 
                  : 'border-slate-100 hover:border-blue-200 bg-slate-50'
              }`}
            >
              <div className={`p-3 rounded-xl bg-white shadow-sm ${opt.color}`}>
                <opt.icon size={24} />
              </div>
              <span className="font-bold text-slate-800">{opt.title}</span>
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className="mt-10 p-6 rounded-2xl bg-white border-2 border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 mb-1">Vores vurdering</h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {selectedOption.advice}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="#/contact" 
                    className="flex-1 bg-blue-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
                  >
                    Få et uforpligtende tilbud <ArrowRight size={18} />
                  </a>
                  <button 
                    onClick={() => document.getElementById('chat-trigger')?.click()}
                    className="flex-1 bg-slate-100 text-slate-800 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    Chat med os 24/7
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemGuide;
