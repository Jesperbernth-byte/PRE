import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings } from 'lucide-react';
import { openConsentBanner } from '../lib/consent';
import { usePageMeta } from '../lib/usePageMeta';

const LAST_UPDATED = '2026-05-12';

const CookiePolicy: React.FC = () => {
  usePageMeta({
    title: 'Cookiepolitik | PR Entreprenøren ApS',
    description: 'Sådan bruger vi cookies på prentreprenoer.dk og hvordan du administrerer dit samtykke.',
    canonicalPath: '/cookiepolitik'
  });

  return (
    <div className="pb-20">
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
            <Cookie size={14} /> Cookies
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 uppercase italic tracking-tighter">
            Cookiepolitik
          </h1>
          <p className="text-lg text-slate-300">Sidst opdateret: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 prose prose-slate prose-lg">
          <p className="text-lg text-slate-700 leading-relaxed">
            Vi bruger cookies og lignende teknologier på prentreprenoer.dk for at sikre at sitet fungerer, måle hvordan det bliver brugt, og vise indhold fra Facebook. På denne side kan du se præcis hvilke cookies vi sætter, hvad de gør, og hvordan du kan ændre dit samtykke.
          </p>

          <div className="bg-orange-50 border-l-8 border-orange-600 p-6 rounded-r-2xl my-8 not-prose">
            <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Settings size={20} className="text-orange-600" /> Ændre dit samtykke
            </p>
            <p className="text-slate-700 mb-4">Du kan til enhver tid ændre dit valg af cookies.</p>
            <button
              onClick={openConsentBanner}
              className="bg-blue-900 hover:bg-blue-800 text-white font-black px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-colors"
            >
              Åbn cookie-indstillinger
            </button>
          </div>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvad er cookies?</h2>
          <p>En cookie er en lille tekstfil som hjemmesiden gemmer i din browser. Den bruges fx til at huske dit valg af sprog, samtykke eller om du er logget ind. Nogle cookies kommer fra os (førsteparts), andre kommer fra tjenester vi bruger som fx Facebook eller Google (tredjeparts).</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Vores cookies — opdelt i kategorier</h2>

          <h3 className="text-xl font-black text-blue-900 mt-8 mb-3">1. Nødvendige cookies</h3>
          <p>Disse bruges for at sitet virker, og kan ikke fravælges. De indeholder ingen personlige oplysninger.</p>
          <div className="not-prose overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3 font-black text-blue-900">Navn</th>
                  <th className="text-left p-3 font-black text-blue-900">Formål</th>
                  <th className="text-left p-3 font-black text-blue-900">Levetid</th>
                  <th className="text-left p-3 font-black text-blue-900">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs">pre-cookie-consent</td>
                  <td className="p-3 text-slate-700">Husker dit cookie-samtykke</td>
                  <td className="p-3 text-slate-700">Til du sletter det</td>
                  <td className="p-3 text-slate-500">localStorage</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">admin_token</td>
                  <td className="p-3 text-slate-700">Login-token (kun /admin)</td>
                  <td className="p-3 text-slate-700">24 timer</td>
                  <td className="p-3 text-slate-500">sessionStorage</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-black text-blue-900 mt-8 mb-3">2. Statistik (valgfri)</h3>
          <p>Hjælper os med at forstå hvordan sitet bliver brugt — fx hvilke sider der får flest besøg. Anonymiseret data, men kræver dit samtykke.</p>
          <div className="not-prose overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3 font-black text-blue-900">Navn</th>
                  <th className="text-left p-3 font-black text-blue-900">Formål</th>
                  <th className="text-left p-3 font-black text-blue-900">Levetid</th>
                  <th className="text-left p-3 font-black text-blue-900">Udbyder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs">_ga</td>
                  <td className="p-3 text-slate-700">Skelner unikke besøgende (Google Analytics 4)</td>
                  <td className="p-3 text-slate-700">2 år</td>
                  <td className="p-3 text-slate-500">Google</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">_ga_*</td>
                  <td className="p-3 text-slate-700">Sessions-tilstand for GA4</td>
                  <td className="p-3 text-slate-700">2 år</td>
                  <td className="p-3 text-slate-500">Google</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">Vercel Analytics</td>
                  <td className="p-3 text-slate-700">Anonyme sidevisninger (ingen cookies, kun aggregeret data)</td>
                  <td className="p-3 text-slate-700">—</td>
                  <td className="p-3 text-slate-500">Vercel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-black text-blue-900 mt-8 mb-3">3. Marketing (valgfri)</h3>
          <p>Bruges til at vise Facebook-feedet på forsiden og måle effekten af eventuelle annoncekampagner. Sætter cookies fra Facebook/Meta. Kræver dit samtykke.</p>
          <div className="not-prose overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3 font-black text-blue-900">Navn</th>
                  <th className="text-left p-3 font-black text-blue-900">Formål</th>
                  <th className="text-left p-3 font-black text-blue-900">Levetid</th>
                  <th className="text-left p-3 font-black text-blue-900">Udbyder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs">_fbp</td>
                  <td className="p-3 text-slate-700">Facebook Pixel — identificerer besøgende på tværs af besøg</td>
                  <td className="p-3 text-slate-700">90 dage</td>
                  <td className="p-3 text-slate-500">Meta</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">fr, datr, sb</td>
                  <td className="p-3 text-slate-700">Facebook Page Plugin — viser feed fra vores Facebook-side</td>
                  <td className="p-3 text-slate-700">Op til 2 år</td>
                  <td className="p-3 text-slate-500">Meta</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvordan ændrer jeg mit samtykke?</h2>
          <p>Du kan ændre dit samtykke når som helst:</p>
          <ul>
            <li>Klik på "Åbn cookie-indstillinger" øverst på denne side</li>
            <li>Eller klik på "Cookie-indstillinger" i sidens footer</li>
          </ul>
          <p>Du kan også slette alle cookies fra din browser — så bliver du spurgt igen næste gang du besøger sitet.</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Mere information</h2>
          <p>Læs også vores <Link to="/privatlivspolitik" className="text-orange-600 font-bold hover:text-orange-700">privatlivspolitik</Link> for at se hvordan vi behandler dine persondata generelt.</p>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
