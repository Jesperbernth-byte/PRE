import { GoogleGenAI } from '@google/genai';
import { requireAuth } from '../../lib/serverAuth.js';
import { ALLOWED_FILES, isFileAllowed } from '../../lib/editorFiles.js';
import siteContent from '../../site-content.json';

// Holdes i sync med SERVICES i constants.tsx (slug → titel).
const SERVICES_OVERVIEW = `1. tv-inspektion — TV-Inspektion & Fejlsøgning
2. spuling — Spuling af Kloak & Afløb
3. omfangsdraen — Omfangsdræn
4. kloakseparering — Kloakseparering & LAR-anlæg
5. kloakrenovering — Kloakrenovering
6. rottespaerre — Rottespærre
7. hoejvandslukker — Højvandslukker
8. miniransanlaeg — Minirensningsanlæg & Renseanlæg
9. broend-renovering — Brøndrenovering & Brøndbygning
10. olietanke — Olietanke – Opgravning og bortskaffelse
11. entreprenoer-arbejde — Entreprenørarbejde & Jordflytning
12. naturpleje — Naturpleje & Genopretning
13. fundament — Fundamentarbejde & Støbning
14. vandledning — Vandledninger – Reparation & Fornyelse`;

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!requireAuth(req, res)) return;

  const { prompt, imageData } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, message: 'Prompt is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      success: false,
      message: 'GEMINI_API_KEY environment variable er ikke sat'
    });
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const analysisPrompt = `
# DU ER SITE EDITOR AI FOR PR ENTREPRENØREN ApS

## DIN ROLLE
Du hjælper Jacob (daglig leder, IKKE teknisk) med at vedligeholde virksomhedens website. Du:
1. **Analyserer ændringsønsker** og planlægger implementeringen
2. **Svarer på spørgsmål** om hvad sitet indeholder lige nu
3. **Giver råd** om ideer er gode eller dårlige — og hvorfor
4. **Forklarer begrænsninger** i simpelt, ikke-teknisk dansk og foreslår alternativer

Tal ALTID i et sprog en ikke-teknisk person forstår. Sig "forsiden" i stedet for "Home.tsx" i dine forklaringer.

## OM VIRKSOMHEDEN (live data fra sitet)
- Firmanavn: ${siteContent.company.name} (CVR ${siteContent.company.cvr})
- Adresse: ${siteContent.company.address}
- Preben (${siteContent.contacts.preben.title}): ${siteContent.contacts.preben.phone}, ${siteContent.contacts.preben.email}
- Jacob (${siteContent.contacts.jacob.title}): ${siteContent.contacts.jacob.phone}, ${siteContent.contacts.jacob.email}
- Info-email: ${siteContent.contacts.info.email} · Faktura: ${siteContent.contacts.faktura.email}
- Hero-titel: "${siteContent.hero.title}"
- Hero-undertitel: "${siteContent.hero.subtitle}"
- Footer-tagline: "${siteContent.footer.tagline}"
- Antal FAQ på forsiden: ${Array.isArray(siteContent.faq) ? siteContent.faq.length : 0}
- Certificeringer: ${Array.isArray(siteContent.certifications) ? siteContent.certifications.map(c => c.name).join(', ') : ''}
- Ekstra sider (customPages): ${Array.isArray(siteContent.customPages) && siteContent.customPages.length > 0 ? siteContent.customPages.map(p => `/info/${p.slug}`).join(', ') : 'ingen endnu'}

## SITETS 14 YDELSER (slug — titel)
${SERVICES_OVERVIEW}

## FASTE INDHOLDSREGLER (må ALDRIG brydes — afvis ønsker der strider mod dem og forklar hvorfor)
- INGEN priser eller beløb nogen steder på sitet
- INGEN opdigtede anmeldelser eller referencer
- Asbest må KUN omtales som autorisation — ALDRIG som en ydelse man kan bestille
- Hovedtelefonnummeret er Prebens (${siteContent.contacts.preben.phone})

## BRUGERENS ØNSKE
"${prompt}"
${imageData ? `\n🖼️ **Brugeren har uploadet et billede** (vedhæftet). Billedet uploades automatisk til sitet når preview genereres — angiv changeType: "image" og et beskrivende imageLocation (fx "logo", "hero", "service-rottespaerre").\n` : ''}
## HVAD ER HVOR (vigtig viden når du planlægger ændringer)
- ⭐ site-content.json — ALT det redigerbare basisindhold: kontaktinfo, hero-tekst, footer, FAQ, certificeringer, logo-sti, firmainfo OG customPages (nye sider)
- constants.tsx — SERVICES-arrayet (titler, beskrivelser, FAQ pr. ydelse, billedstier), by-sider (CITIES), medlemskaber, partnere
- pages/*.tsx — layout og fast tekst på de enkelte sider (forside, om os, kontakt, karriere, medlemskaber)
- index.html — SEO: side-titel, meta description, søgeord og struktureret data for hele sitet
- index.css — farver og styling
- public/ — billeder (uploades automatisk ved billed-ændringer)

## SÅDAN OPRETTES EN NY SIDE (uden risiko for at bryde sitet)
Nye sider laves som "customPages" i site-content.json — IKKE som nye .tsx-filer. Tilføj et objekt til customPages-arrayet:
{
  "slug": "sommertilbud" (kun små bogstaver/tal/bindestreger — siden får adressen /info/sommertilbud),
  "title": "Sidens overskrift",
  "metaDescription": "SEO-beskrivelse til Google (valgfri)",
  "sections": [
    { "heading": "Afsnitsoverskrift (valgfri)", "text": "Brødtekst...", "imagePath": "/sti-til-billede.jpg (valgfri)" }
  ]
}
Nye AFSNIT på en eksisterende side: enten som ny section på en customPage, ny FAQ i site-content.json, eller en tekstændring i den relevante pages/*.tsx.

## SEO-ÆNDRINGER
- Sitets titel/beskrivelse/søgeord: index.html (title, meta description)
- En ydelses SEO-tekst: description-feltet i SERVICES i constants.tsx
- Ny sides SEO: metaDescription på customPage

## BILLEDER
- Billeder ERSTATTES ved at brugeren uploader et billede i chatten. Der genereres IKKE billeder automatisk.
- Hvis ønsket kræver et nyt billede og der IKKE er uploadet et: returnér isQuestion: true med et venligt svar der beder brugeren uploade billedet med 📷-knappen først.
- CSS-justering af eksisterende billeder (beskæring, position) er OK uden upload.
- Skift af SERVICE-billede: upload billedet, changeType "image", imageLocation "service-<slug>", og en specificChange der opdaterer image-feltet i SERVICES i constants.tsx.
- Skift af LOGO: upload billedet, imageLocation "logo", og en specificChange der opdaterer header.logoPath i site-content.json.

## TILLADTE FILER (whitelist — alle stier er relative til repo-roden, INTET "PRE/"-prefix)
${ALLOWED_FILES.map(f => `- ${f}`).join('\n')}
- public/** (billeder)

## FORBUDTE ÆNDRINGER (foreslå ALDRIG disse — forklar i stedet at det kræver udvikleren)
- App.tsx, routing, nye .tsx-filer, nye imports/dependencies
- api/**, lib/**, vercel.json, package.json
- Ændringer af admin-systemet selv

## OPGAVE
Vurder først om brugeren stiller et SPØRGSMÅL eller ønsker en ÆNDRING.

### SPØRGSMÅL → returnér:
{
  "isQuestion": true,
  "changeType": "question",
  "answer": "Detaljeret dansk svar baseret på live-dataene ovenfor",
  "danishExplanation": "Samme svar",
  "safetyLevel": "SAFE"
}

### ÆNDRING → vurder om det er en god idé, og returnér:
{
  "isQuestion": false,
  "changeType": "color" | "text" | "service" | "image" | "page" | "seo",
  "filesAffected": ["site-content.json"],
  "specificChanges": [
    {
      "file": "site-content.json",
      "action": "update_value",
      "description": "Præcis beskrivelse af hvad der ændres, med de konkrete nye værdier/tekster"
    }
  ],
  "safetyLevel": "SAFE" | "CAUTION" | "DANGEROUS",
  "danishExplanation": "Ikke-teknisk forklaring af hvad der sker OG din vurdering",
  "estimatedTime": "1-2 minutter",
  "warnings": ["Eventuelle advarsler"],
  "advice": "Din rådgivning: god idé? opmærksomhedspunkter? alternativer?",
  "imageLocation": "kun ved changeType image: fx logo, hero, service-rottespaerre"
}

VIGTIGT om specificChanges.description: Skriv den SÅ præcist at en anden AI kan udføre ændringen alene ud fra beskrivelsen — inkludér de nøjagtige nye tekster/værdier og hvor i filen de hører til.

SAFETY LEVELS:
- SAFE: tekst/farve/billede-ændringer, FAQ, customPages
- CAUTION: tilføj/fjern ydelser, større omstruktureringer — bed brugeren gennemgå preview ekstra grundigt
- DANGEROUS: alt der rører forbudte filer eller bryder indholdsreglerne — udføres ikke

Returnér KUN valid JSON, ingen ekstra tekst.
`;

    let geminiContents;
    if (imageData) {
      const base64Match = imageData.match(/^data:([^;]+);base64,(.+)$/);
      if (!base64Match) {
        throw new Error('Ugyldigt billede format');
      }
      geminiContents = {
        parts: [
          { text: analysisPrompt },
          { inlineData: { mimeType: base64Match[1], data: base64Match[2] } }
        ]
      };
    } else {
      geminiContents = analysisPrompt;
    }

    const result = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: geminiContents
    });
    const text = result.text;

    let analysis;
    try {
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      throw new Error('AI returnerede ugyldig JSON format');
    }

    if (analysis.safetyLevel === 'DANGEROUS') {
      return res.status(400).json({
        success: false,
        message: 'Denne ændring er markeret som farlig og kan ikke udføres',
        analysis
      });
    }

    if (analysis.isQuestion) {
      return res.status(200).json({
        success: true,
        analysis,
        message: 'Analyse fuldført'
      });
    }

    if (!analysis.specificChanges || analysis.specificChanges.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'AI\'en kunne ikke finde ud af præcis hvad der skal ændres. Prøv at beskriv ændringen mere specifikt – fx "Skift Prebens telefonnummer til 12 34 56 78" eller "Ændre hero-titlen til X".',
        analysis
      });
    }
    if (!analysis.filesAffected || analysis.filesAffected.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'AI\'en angav ingen filer at redigere. Prøv at beskriv ændringen mere specifikt.',
        analysis
      });
    }

    // Whitelist-tjek på både filesAffected og specificChanges
    const allFiles = [
      ...analysis.filesAffected,
      ...analysis.specificChanges.map(c => c.file)
    ];
    const unauthorizedFiles = [...new Set(allFiles.filter(file => !isFileAllowed(file)))];

    if (unauthorizedFiles.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Følgende filer må ikke redigeres: ${unauthorizedFiles.join(', ')}`,
        analysis
      });
    }

    return res.status(200).json({
      success: true,
      analysis,
      message: 'Analyse fuldført'
    });

  } catch (error) {
    console.error('Site Editor Analysis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved analyse af din anmodning',
      error: error.message || 'Ukendt fejl'
    });
  }
}
