import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail } from 'lucide-react';
import { COMPANY_NAME, ADDRESS, CVR, EMAIL_INFO, PHONE_PREBEN } from '../constants';
import { usePageMeta } from '../lib/usePageMeta';

const LAST_UPDATED = '2026-05-12';

const Privacy: React.FC = () => {
  usePageMeta({
    title: 'Privatlivspolitik | PR Entreprenøren ApS',
    description: 'Sådan behandler PR Entreprenøren ApS dine persondata når du sender en henvendelse via kontaktformular eller chat.',
    canonicalPath: '/privatlivspolitik'
  });

  return (
    <div className="pb-20">
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
            <Shield size={14} /> Persondata
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 uppercase italic tracking-tighter">
            Privatlivspolitik
          </h1>
          <p className="text-lg text-slate-300">Sidst opdateret: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 prose prose-slate prose-lg">
          <p className="text-lg text-slate-700 leading-relaxed">
            Hos {COMPANY_NAME} tager vi din databeskyttelse alvorligt. Denne privatlivspolitik forklarer hvilke personoplysninger vi indsamler om dig, hvad vi bruger dem til, hvem vi deler dem med, og hvilke rettigheder du har.
          </p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Dataansvarlig</h2>
          <div className="bg-slate-50 rounded-2xl p-6 not-prose">
            <p className="font-bold text-slate-800">{COMPANY_NAME}</p>
            <p className="text-slate-600">{ADDRESS}</p>
            <p className="text-slate-600">CVR: {CVR}</p>
            <p className="text-slate-600 mt-2">
              E-mail: <a href={`mailto:${EMAIL_INFO}`} className="text-orange-600 font-bold hover:text-orange-700">{EMAIL_INFO}</a><br />
              Telefon: <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="text-orange-600 font-bold hover:text-orange-700">{PHONE_PREBEN}</a>
            </p>
          </div>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvilke data indsamler vi?</h2>
          <p>Når du kontakter os via formularen eller AI-chatten på sitet, indsamler vi følgende oplysninger:</p>
          <ul>
            <li><strong>Navn</strong> — så vi ved hvem vi taler med</li>
            <li><strong>Telefonnummer</strong> — så vi kan ringe dig op</li>
            <li><strong>Postnummer</strong> — for at vurdere køreafstand og lokale forhold</li>
            <li><strong>E-mail (valgfrit)</strong> — hvis du foretrækker skriftlig kontakt</li>
            <li><strong>Beskrivelse af din opgave</strong> — for at kunne give dig et relevant svar eller tilbud</li>
            <li><strong>Teknisk metadata</strong> — IP-adresse og tidspunkt for henvendelsen, kort tjek der bruges til at filtrere spam</li>
          </ul>
          <p>Hvis du chatter med AI-assistenten, bliver hele samtaleforløbet gemt sammen med leadet, så vi har konteksten når vi følger op.</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvad bruger vi dataene til?</h2>
          <p>Vi behandler dine oplysninger med følgende formål:</p>
          <ul>
            <li>At kontakte dig og besvare din henvendelse</li>
            <li>At give dig et tilbud og udføre den aftalte opgave</li>
            <li>At dokumentere arbejdet over for forsikringsselskab, kommune eller dig selv</li>
            <li>At forbedre vores hjemmeside og service (kun aggregerede statistikker, ikke personlige oplysninger)</li>
          </ul>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Retsgrundlag</h2>
          <p>Behandlingen sker på følgende grundlag i Databeskyttelsesforordningen (GDPR):</p>
          <ul>
            <li><strong>Artikel 6(1)(b)</strong> — opfyldelse af aftale eller på din anmodning forud for indgåelse af aftale</li>
            <li><strong>Artikel 6(1)(f)</strong> — legitim interesse i at drive virksomhed, dokumentere arbejdet og beskytte os mod misbrug af formularen</li>
            <li><strong>Artikel 6(1)(a)</strong> — dit samtykke for statistik- og marketing-cookies</li>
          </ul>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvem deler vi data med?</h2>
          <p>Vi deler dine oplysninger med følgende databehandlere, som hjælper os med driften af sitet:</p>
          <ul>
            <li><strong>Supabase</strong> (EU/USA) — sikker opbevaring af henvendelser</li>
            <li><strong>Resend</strong> (USA) — afsendelse af notifikations-emails om nye henvendelser</li>
            <li><strong>Vercel</strong> (USA) — hosting af hjemmesiden og serverless funktioner</li>
            <li><strong>Google</strong> (USA) — Gemini AI til at kvalificere chat-henvendelser</li>
          </ul>
          <p>Alle databehandlere har EU-godkendte standardkontraktbestemmelser (SCC) eller anden lovlig overførselsmekanisme. Vi har indgået databehandleraftaler hvor det kræves.</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Hvor længe gemmer vi data?</h2>
          <p>Vi opbevarer dine oplysninger så længe det er nødvendigt for at opfylde formålet:</p>
          <ul>
            <li><strong>Henvendelser uden videre kontakt:</strong> slettes efter 2 år</li>
            <li><strong>Gennemførte opgaver:</strong> gemmes i 5 år (samme periode som vores garantiperiode og dokumentationskrav over for myndigheder)</li>
            <li><strong>Tekniske logs:</strong> 30 dage</li>
          </ul>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Dine rettigheder</h2>
          <p>Efter GDPR har du følgende rettigheder over dine oplysninger:</p>
          <ul>
            <li><strong>Indsigt</strong> — du kan få at vide hvilke oplysninger vi har om dig</li>
            <li><strong>Berigtigelse</strong> — du kan få rettet forkerte oplysninger</li>
            <li><strong>Sletning</strong> — du kan få slettet dine oplysninger (når vi ikke længere har lovligt grundlag for at gemme dem)</li>
            <li><strong>Begrænsning</strong> — du kan kræve at vi midlertidigt holder op med at behandle dine oplysninger</li>
            <li><strong>Indsigelse</strong> — du kan gøre indsigelse mod vores behandling baseret på legitim interesse</li>
            <li><strong>Dataportabilitet</strong> — du kan få dine oplysninger udleveret i et struktureret, almindeligt anvendt format</li>
            <li><strong>Tilbagekaldelse af samtykke</strong> — du kan til enhver tid trække dit samtykke til cookies tilbage via vores <Link to="/cookiepolitik" className="text-orange-600 font-bold hover:text-orange-700">cookiepolitik</Link></li>
          </ul>
          <p>Send en e-mail til <a href={`mailto:${EMAIL_INFO}`} className="text-orange-600 font-bold hover:text-orange-700">{EMAIL_INFO}</a> for at gøre brug af dine rettigheder. Vi svarer normalt inden for 30 dage.</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Klage til Datatilsynet</h2>
          <p>Hvis du er utilfreds med vores behandling af dine personoplysninger, kan du indgive en klage til Datatilsynet:</p>
          <div className="bg-slate-50 rounded-2xl p-6 not-prose">
            <p className="font-bold text-slate-800">Datatilsynet</p>
            <p className="text-slate-600">Carl Jacobsens Vej 35, 2500 Valby</p>
            <p className="text-slate-600">Telefon: 33 19 32 00</p>
            <p className="text-slate-600">E-mail: <a href="mailto:dt@datatilsynet.dk" className="text-orange-600 font-bold hover:text-orange-700">dt@datatilsynet.dk</a></p>
            <p className="text-slate-600">Web: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:text-orange-700">datatilsynet.dk</a></p>
          </div>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Cookies</h2>
          <p>Læs mere om hvordan vi bruger cookies på <Link to="/cookiepolitik" className="text-orange-600 font-bold hover:text-orange-700">vores cookiepolitik-side</Link>.</p>

          <h2 className="text-2xl font-black text-blue-900 mt-10 mb-4 uppercase italic">Ændringer i politikken</h2>
          <p>Vi kan opdatere denne privatlivspolitik fra tid til anden. Den nyeste version vil altid være tilgængelig på denne side, og vi opdaterer "Sidst opdateret"-datoen i toppen.</p>

          <div className="bg-orange-50 border-l-8 border-orange-600 p-6 rounded-r-2xl mt-12 not-prose">
            <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Mail size={20} className="text-orange-600" /> Spørgsmål?
            </p>
            <p className="text-slate-700">
              Skriv til <a href={`mailto:${EMAIL_INFO}`} className="text-orange-600 font-bold hover:text-orange-700">{EMAIL_INFO}</a> eller ring til <a href={`tel:${PHONE_PREBEN.replace(/\s/g, '')}`} className="text-orange-600 font-bold hover:text-orange-700">{PHONE_PREBEN}</a> — vi besvarer gerne spørgsmål om vores håndtering af persondata.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
