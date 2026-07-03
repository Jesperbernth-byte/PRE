// Samlet server-side AI-endpoint for de kundevendte AI-funktioner
// (LeadChat, ImageAnalyzer). Erstatter de gamle client-side Gemini-kald,
// hvor API-nøglen lå i den offentlige JS-bundle.
//
// Actions (POST { action, ... }):
//   chat            { history, message }                          → { text }
//   qualify         { conversation }                              → { lead }
//   analyze-image   { imageBase64, mimeType }                     → { text }
//   image-followup  { imageBase64, mimeType, originalAnalysis,
//                     chatHistory }                               → { text }
//
// Kræver GEMINI_API_KEY i Vercel env vars (server-side, aldrig VITE_).

import { createRequire } from 'module';
import { GoogleGenAI, Type } from '@google/genai';
import { checkAndLogIp, getClientIp } from '../lib/rateLimit.js';

// JSON kan ikke importeres direkte i ESM ("type": "module") uden
// import-attributter — createRequire er det mønster Vercels
// file-tracing forstår, så site-content.json bundles med functionen.
const require = createRequire(import.meta.url);
const siteContent = require('../site-content.json');

const MODEL = 'gemini-3-flash-preview';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONVERSATION_LENGTH = 20000;
const MAX_IMAGE_BASE64_LENGTH = 6 * 1024 * 1024; // ~4.5 MB billede

// Rate limits pr. IP pr. time — beskytter mod scriptet misbrug af
// Gemini-forbruget. En normal chatsamtale bruger 5-15 kald.
const RATE_LIMITS = {
  'chat': 40,
  'qualify': 10,
  'analyze-image': 10,
  'image-followup': 20
};

const PHONE_PREBEN = siteContent.contacts.preben.phone;
const PHONE_JACOB = siteContent.contacts.jacob.phone;
const EMAIL_INFO = siteContent.contacts.info.email;

// Holdes manuelt i sync med SERVICES i constants.tsx (titler + slugs).
const SERVICE_LIST = `1. TV-Inspektion & Fejlsøgning (kloakkamera, rapport til forsikring/hussalg)
2. Spuling af kloak & afløb (højtryksspuling, rodfræsning)
3. Omfangsdræn (fugt i kælder, dræn langs fundament)
4. Kloakseparering & LAR-anlæg (påbud om separering, faskiner, regnbede)
5. Kloakrenovering (punktreparation, strømpeforing, opgravning)
6. Rottespærre (mekanisk rottesikring i kloakken)
7. Højvandslukker (beskyttelse mod opstigende kloakvand i kælder)
8. Minirensningsanlæg (privat spildevandsrensning i det åbne land)
9. Brøndrenovering & brøndbygning
10. Olietanke (opgravning og bortskaffelse)
11. Entreprenørarbejde & jordflytning
12. Naturpleje & genopretning (vandløb, oprensning af søer)
13. Fundamentarbejde (udgravning og klargøring til støbning)
14. Vandledninger (reparation og fornyelse i jord)`;

const COMPANY_CONTEXT = `## VIRKSOMHEDSINFO
- Firmanavn: ${siteContent.company.name}
- Adresse: ${siteContent.company.address}
- Område: Fyn og Trekantsområdet
- Hovednummer (Preben): ${PHONE_PREBEN}
- Jacob (daglig leder & kloakmester, besigtigelser og tilbud): ${PHONE_JACOB}
- Email: ${EMAIL_INFO}

## VORES 14 YDELSER
${SERVICE_LIST}

## VIGTIGE REGLER OM INDHOLD
- ASBEST: Vi har asbest-autorisation, men det er IKKE en ydelse man kan bestille.
  Den bruges KUN internt hvis gulvbelægning skal brydes op under kloakarbejde.
  Præsentér ALDRIG asbest som noget vi tilbyder. Ved asbest-spørgsmål: henvis til
  specialiserede asbestfirmaer.
- PRISER: Nævn ALDRIG beløb, prisintervaller eller "fra-priser" — heller ikke
  cirka-tal. Svar altid: "Prisen afhænger af opgaven — vi kommer gerne ud til en
  gratis og uforpligtende besigtigelse og giver fast pris."
- Opdigt aldrig referencer, anmeldelser eller garantier ud over: 5 års garanti
  på arbejdet, autoriseret kloakmestervirksomhed, DM&E Kloakmestergaranti.`;

const CHAT_SYSTEM_PROMPT = `# DU ER LEAD-ASSISTENT FOR PR ENTREPRENØREN ApS

## DIN ROLLE
Du er en professionel, jordnær assistent der hjælper potentielle kunder og indsamler lead-information.

${COMPANY_CONTEXT}

## PRIORITERING
AKUT (samme dag): vand i kælderen LIGE NU, kloak løber over, rotter INDE i huset, kraftig kloaklugt inde.
→ Svar: "Det er akut. Jeg sørger for at der bliver ringet til dig med det samme!"
HASTENDE (1-3 dage): vand i kælder der bliver værre, rotter set nær hus, mindre kloaklugt.
PLANLAGT: forebyggende rottespærre, TV-inspektion før huskøb, planlagt renovering.

## GEOGRAFISK DÆKNING
✅ Fyn (5xxx postnumre) ✅ Trekantsområdet (Kolding, Vejle, Fredericia)
❌ Resten af Jylland, Sjælland, Bornholm.
Udenfor område: "Desværre dækker vi ikke jeres område. Vi opererer på Fyn og i Trekantsområdet."

## FORSIKRING
Ofte dækket: pludselig vandskade, brud på kloak. Ikke dækket: forebyggende, vedligeholdelse, gradvis forværring.
Svar: "Det afhænger af årsagen. Vi hjælper gerne med dokumentation til forsikringen."

## DIT MÅL: INDSAML DISSE OPLYSNINGER
1. Problem  2. Postnummer  3. Navn  4. Telefonnummer  5. Forsikring? (ja/nej/ved ikke)  6. Hastighed

## REGLER FOR SAMTALEN
✅ Stil ÉT spørgsmål ad gangen  ✅ Jordnær, ærlig, empatisk  ✅ "Vi"-form  ✅ Korte sætninger
❌ ALDRIG marketing-snak  ❌ ALDRIG love faste priser eller nævne beløb
❌ ALDRIG spørge om samme info to gange (tjek historikken!)
Hvis kunden vil ringe direkte: henvis til ${PHONE_PREBEN}.`;

function getGenAI(res) {
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ success: false, message: 'GEMINI_API_KEY mangler i Vercel env vars' });
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

async function handleChat(genAI, body) {
  const { history, message } = body;
  if (!message || typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
    return { status: 400, json: { success: false, message: 'Ugyldig besked' } };
  }
  const safeHistory = Array.isArray(history)
    ? history.slice(-30).filter(h =>
        h && (h.role === 'user' || h.role === 'model') &&
        Array.isArray(h.parts) && typeof h.parts[0]?.text === 'string'
      ).map(h => ({ role: h.role, parts: [{ text: String(h.parts[0].text).slice(0, MAX_MESSAGE_LENGTH) }] }))
    : [];

  const chat = genAI.chats.create({
    model: MODEL,
    config: {
      systemInstruction: CHAT_SYSTEM_PROMPT,
      maxOutputTokens: 500
    },
    history: safeHistory
  });
  const result = await chat.sendMessage({ message });
  return { status: 200, json: { success: true, text: result.text } };
}

async function handleQualify(genAI, body) {
  const { conversation } = body;
  if (!conversation || typeof conversation !== 'string' || conversation.length > MAX_CONVERSATION_LENGTH) {
    return { status: 400, json: { success: false, message: 'Ugyldig samtale' } };
  }

  const response = await genAI.models.generateContent({
    model: MODEL,
    contents: `# ANALYSER LEAD-SAMTALE FOR PR ENTREPRENØREN ApS

Uddrag struktureret information fra denne kundesamtale til teknikeren.

## SAMTALE
${conversation}

## PRIORITERING
AKUT (samme dag): vand i kælderen lige nu, kloak løber over, rotter inde i huset, kraftig kloaklugt inde.
HASTER (1-3 dage): vand i kælder der bliver værre, rotter set nær hus, mindre kloaklugt.
PLANLAGT: forebyggende rottespærre, TV-inspektion før huskøb, planlagt udskiftning.

## AI SUMMARY
1-3 korte linjer til teknikeren: hvad er problemet (konkret), hvor hastende, særlige forhold (forsikring, adgang).

## FORSIKRING
'true' hvis kunden bekræfter det er en forsikringssag, ellers 'false'.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          phone: { type: Type.STRING },
          zipCode: { type: Type.STRING },
          problem: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ['AKUT', 'HASTER', 'PLANLAGT'] },
          insuranceClaim: { type: Type.BOOLEAN },
          aiSummary: { type: Type.STRING }
        },
        required: ['name', 'phone', 'problem', 'priority', 'aiSummary']
      }
    }
  });

  return { status: 200, json: { success: true, lead: JSON.parse(response.text) } };
}

function validateImageInput(body) {
  const { imageBase64, mimeType } = body;
  if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length > MAX_IMAGE_BASE64_LENGTH) {
    return 'Ugyldigt eller for stort billede (maks ~4,5 MB)';
  }
  if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(String(mimeType || ''))) {
    return 'Ugyldigt billedformat. Brug JPG, PNG eller WebP.';
  }
  return null;
}

async function handleAnalyzeImage(genAI, body) {
  const inputError = validateImageInput(body);
  if (inputError) return { status: 400, json: { success: false, message: inputError } };

  const response = await genAI.models.generateContent({
    model: MODEL,
    contents: {
      parts: [
        { inlineData: { data: body.imageBase64, mimeType: body.mimeType } },
        {
          text: `# DU ER BILLEDE-ANALYSE EKSPERT FOR PR ENTREPRENØREN ApS

${COMPANY_CONTEXT}

## DIN OPGAVE
Analyser billedet og besvar:
1. Hvad ser du? (konkret beskrivelse, tegn på skader)
2. Prioritet: AKUT (vand i kælder nu, kloak løber over, rotter inde) / HASTER (mindre fugt, revner) / PLANLAGT (forebyggende)
3. Hvilken af vores ydelser passer bedst? Hvis billedet ligner asbest: sig at det kræver et specialiseret asbestfirma — det tilbyder vi ikke.
4. Anbefaling: hvad skal der gøres, og skal de ringe nu eller kan det vente?

## TONE
Jordnær og direkte, professionel, empatisk ved alvorlige skader, ingen marketing-snak, INGEN priser.

## OUTPUT
Kort, klart svar på dansk (maks 100 ord) der kan vises direkte til kunden.`
        }
      ]
    },
    config: { maxOutputTokens: 400 }
  });
  return { status: 200, json: { success: true, text: response.text } };
}

async function handleImageFollowUp(genAI, body) {
  const inputError = validateImageInput(body);
  if (inputError) return { status: 400, json: { success: false, message: inputError } };

  const { originalAnalysis, chatHistory } = body;
  const conversationContext = (Array.isArray(chatHistory) ? chatHistory : [])
    .slice(-20)
    .map(m => `${m.role === 'user' ? 'Kunde' : 'Du'}: ${String(m.text || '').slice(0, MAX_MESSAGE_LENGTH)}`)
    .join('\n');

  const response = await genAI.models.generateContent({
    model: MODEL,
    contents: {
      parts: [
        { inlineData: { data: body.imageBase64, mimeType: body.mimeType } },
        {
          text: `# OPFØLGENDE SPØRGSMÅL TIL BILLEDE-ANALYSE

Du har tidligere analyseret dette billede for en kunde hos PR Entreprenøren ApS (kloakmester på Fyn).

## DIN OPRINDELIGE ANALYSE
${String(originalAnalysis || '').slice(0, 2000)}

## SAMTALE INDTIL NU
${conversationContext}

## REGLER
- Vær specifik og konkret ud fra billedet
- Kan du ikke se detaljen: sig det ærligt
- Maks 50-75 ord, jordnær tone, ingen marketing-snak, INGEN priser
- Generel kontakt: henvis til ${PHONE_PREBEN}; besigtigelser og tilbud er Jacobs bord (${PHONE_JACOB})

Besvar nu kundens seneste spørgsmål på dansk:`
        }
      ]
    },
    config: { maxOutputTokens: 300 }
  });
  return { status: 200, json: { success: true, text: response.text } };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { action } = req.body || {};
  if (!RATE_LIMITS[action]) {
    return res.status(400).json({ success: false, message: 'Ugyldig action' });
  }

  const clientIp = getClientIp(req);
  const rate = await checkAndLogIp({
    ip: clientIp,
    endpoint: `/api/ai:${action}`,
    windowSeconds: 3600,
    maxRequests: RATE_LIMITS[action]
  });
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds || 3600));
    return res.status(429).json({
      success: false,
      message: `Du har brugt AI-assistenten meget på kort tid. Prøv igen senere, eller ring til os på ${PHONE_PREBEN}.`
    });
  }

  const genAI = getGenAI(res);
  if (!genAI) return;

  try {
    let result;
    if (action === 'chat') result = await handleChat(genAI, req.body);
    else if (action === 'qualify') result = await handleQualify(genAI, req.body);
    else if (action === 'analyze-image') result = await handleAnalyzeImage(genAI, req.body);
    else result = await handleImageFollowUp(genAI, req.body);

    return res.status(result.status).json(result.json);
  } catch (error) {
    console.error(`AI endpoint error (${action}):`, error);
    return res.status(500).json({
      success: false,
      message: 'AI-assistenten er utilgængelig lige nu. Ring til os direkte, så hjælper vi dig.'
    });
  }
}
