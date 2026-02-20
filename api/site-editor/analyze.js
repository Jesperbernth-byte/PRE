import { GoogleGenAI } from '@google/genai';

// Current site content snapshot for analysis
const SITE_CONTENT = {
  COMPANY_NAME: "PR Entreprenøren ApS",
  CVR: "46075536",
  PHONE_JACOB: "24 94 66 61",
  PHONE_PREBEN: "22 96 66 61",
  EMAIL_JACOB: "jeh@prentreprenoer.dk",
  EMAIL_PREBEN: "pr@prentreprenoer.dk",
  EMAIL_FAKTURA: "faktura@prentreprenoer.dk",
  ADDRESS: "Nørregårdsvej 17, 5672 Broby",
  GLN_NUMBER: "5790002657955",
  PRIMARY_COLOR: "#1e3a8a", // blue-900
  SECONDARY_COLOR: "#ea580c", // orange-600
  SERVICES_COUNT: 14,
  TEAM_COUNT: 3,
  CERTIFICATIONS_COUNT: 5
};

// File whitelist - only these files can be edited
const ALLOWED_FILES = [
  'PRE/constants.tsx',
  'PRE/index.css',
  'PRE/pages/Home.tsx',
  'PRE/pages/About.tsx',
  'PRE/pages/Services.tsx',
  'PRE/pages/Contact.tsx',
  'PRE/pages/Careers.tsx',
  'PRE/pages/Memberships.tsx',
  'PRE/components/Navbar.tsx',
  'PRE/components/Footer.tsx',
  'PRE/public/**/*'
];

// Pattern blacklist - these patterns are never allowed
const FORBIDDEN_PATTERNS = [
  'import ',
  'Router',
  'Route',
  'useState',
  'useEffect',
  'fetch(',
  'axios',
  'vercel.json',
  'package.json'
];

export default async function handler(req, res) {
  // Set JSON response header
  res.setHeader('Content-Type', 'application/json');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { prompt, imageData, siteName = 'PRE', username = 'admin' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, message: 'Prompt is required' });
  }

  // Check if Gemini API key exists
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      success: false,
      message: 'GEMINI_API_KEY environment variable er ikke sat'
    });
  }

  // Initialize inside handler to avoid module-level crash on missing env var
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    // Create analysis prompt
    const analysisPrompt = `
# DU ER SITE EDITOR AI FOR PR ENTREPRENØREN ApS

## DIN ROLLE
Du er en KLOG assistent der:
1. **Analyserer ændringsønsker** og planlægger implementeringen
2. **Svarer på spørgsmål** om hvad sitet indeholder lige nu (SEO-fokus, services, kontaktinfo, osv.)
3. **Giver råd** om ideer er gode eller dårlige - og hvorfor
4. **Forklarer begrænsninger** når noget ikke kan gøres og foreslår alternativer
5. **Guider brugeren** til bedre løsninger hvis deres ønske ikke er optimalt

## OM VIRKSOMHEDEN
PR Entreprenøren ApS er en kloakmester-virksomhed på Fyn drevet af Jacob & Preben (far og søn).

**Ydelser:**
- Kloakering & renovering
- Omfangsdræn (vand i kælder)
- Rottespærre (lovkrav fra 2024)
- TV-inspektion
- Asbest (KUN i begrænset omfang!)

**Værdier:**
- Jordnær, ærlig kommunikation
- Professionelt håndværk
- Hurtig respons ved akutte situationer
- Personlig service (lille virksomhed)

**VIGTIGT:** Vi laver IKKE komplet asbestsanering! Kun i forbindelse med kloak/dræn arbejde.

## BRUGERENS ØNSKE
"${prompt}"
${imageData ? `\n🖼️ **VIGTIGT: Brugeren har uploadet et billede** (se billedet ovenfor i denne besked)\n- Dette billede skal bruges som det nye logo/hero/baggrund brugeren refererer til\n- Du skal angive changeType: "image" og imageLocation: "logo" (eller "hero" etc.)\n- Billedet bliver automatisk uploadet til GitHub - du skal bare angive hvad det skal erstatte\n` : ''}
## NUVÆRENDE SITE INDHOLD
**Firmainformation:**
- Firmanavn: ${SITE_CONTENT.COMPANY_NAME}
- CVR: ${SITE_CONTENT.CVR}
- Jacob telefon: ${SITE_CONTENT.PHONE_JACOB}
- Preben telefon: ${SITE_CONTENT.PHONE_PREBEN}
- Jacob email: ${SITE_CONTENT.EMAIL_JACOB}
- Preben email: ${SITE_CONTENT.EMAIL_PREBEN}
- Faktura email: ${SITE_CONTENT.EMAIL_FAKTURA}
- Adresse: ${SITE_CONTENT.ADDRESS}
- GLN nummer: ${SITE_CONTENT.GLN_NUMBER}

**Design & Branding:**
- Primær farve (blå): ${SITE_CONTENT.PRIMARY_COLOR}
- Sekundær farve (orange): ${SITE_CONTENT.SECONDARY_COLOR}
- Tone: Jordnær, ærlig, professionel men ikke "fancy"
- Design: Bold typography, moderne UI, high-contrast

**Indhold:**
- Antal services: ${SITE_CONTENT.SERVICES_COUNT}
- Antal team medlemmer: ${SITE_CONTENT.TEAM_COUNT} (Preben, Jacob, Jesper)
- Antal certificeringer: ${SITE_CONTENT.CERTIFICATIONS_COUNT}
- Medlemskaber: DM&E, Faaborg-Midtfyns Erhvervsråd, Kloakmestrenes Kontrolinstans
- Produktpartnere: Nordisk Innovation (rottespærrer), Kessel (højvandslukkere), UWS (højvandslukkere)

**SEO & Søgeord Fokus:**
Sitet er optimeret til følgende søgeord og målgrupper:
- "kloakmester Fyn", "kloakmester Odense", "omfangsdræn Fyn"
- "rottespærre", "fugtig kælder", "kloakseparering"
- "asbestsanering kloak" (begrænset)
- Geografisk: Faaborg-Midtfyn, Assens, Odense, Svendborg
- Målgruppe: Boligejere med akutte eller planlagte kloakproblemer
- USP: Akut respons under 2 timer, fast pris, 5 års garanti, autoriseret

## CONTEXT OM SERVICES
Sitet har disse 14 services:
1. Omfangsdræn & Fugtsikring
2. Kloakseparering & Renovering
3. Rottespærre - Effektiv Sikring
4. Højvandslukker & Backflow Sikring
5. TV-Inspektion & Fejlsøgning
6. LAR-Anlæg (Lokal Afledning af Regnvand)
7. Asbestsanering (Kloak-relateret) - BEGRÆNSET, kun ved kloak/dræn arbejde!
8. Entreprenørarbejde & Jordflytning
9. Naturpleje & Genopretning
10. Miniransanlæg & Renseanlæg
11. Brøndrenovering & Brøndbygning
12. Olietanke - Nedtagning & Sanering
13. Fundamentarbejde & Støbning
14. Vandledninger - Reparation & Fornyelse

**VIGTIGT:** Hvis bruger vil fjerne "asbest" eller "asbestsanering":
- Det er OK! Vi laver det kun i begrænset omfang alligevel
- Fjern det fra services listen
- Fjern tekst om asbest fra hele sitet

TILLADTE FILER (kun disse må redigeres):
- PRE/constants.tsx (tekst, services, team, kontaktinfo, certificeringer, medlemskaber, partnere)
- PRE/index.css (farver og styling)
- PRE/pages/Home.tsx (hero sektion CSS classes og styling)
- PRE/pages/About.tsx (om os tekst og historie)
- PRE/pages/Services.tsx (services side layout og tekst)
- PRE/pages/Contact.tsx (kontakt side layout)
- PRE/pages/Careers.tsx (karriere side)
- PRE/pages/Memberships.tsx (medlemskaber side)
- PRE/components/Navbar.tsx (navigation links)
- PRE/public/* (billeder og assets)

VIGTIGT OM BILLEDER:
- CSS styling af EKSISTERENDE billeder er OK (object-position, object-fit, filter, etc.)
- ERSTATNING af billeder: AI genererer NYE billeder automatisk med Gemini Imagen
- Hvis brugeren vil skifte til et nyt billede: Angiv hvad der skal genereres i "imagePrompt" feltet
- Billedet vil automatisk blive genereret og uploadet til PRE/public/
- Eksempel: "Skift baggrund til gravemaskine" → imagePrompt: "Professional excavator machine working on construction site, modern equipment, high quality"
- Brug ALTID professionelle, detaljerede prompts på engelsk for bedste resultat

FORBUDTE ÆNDRINGER (må ALDRIG foreslås):
- Nye imports eller dependencies
- Routing ændringer
- Ny React funktionalitet
- API calls (undtagen billede-generering som sker automatisk)
- Config filer (vercel.json, package.json)

NOTE: Billeder uploades AUTOMATISK via Gemini Imagen - systemet håndterer det selv.

EKSEMPLER PÅ BILLEDE-HÅNDTERING:

Eksempel 1 - Generér nyt billede:
Bruger: "Skift baggrundsbillede til en gravemaskine"
→ changeType: "image"
→ safetyLevel: "SAFE"
→ imagePrompt: "Modern yellow excavator machine working on construction site, professional construction equipment, blue sky, professional photography, high quality, wide angle, 8K"
→ imageLocation: "hero-background"
→ danishExplanation: "Genererer et professionelt billede af en gravemaskine og sætter det som baggrund i hero sektionen."

Eksempel 2 - Generér service billede:
Bruger: "Lav et billede til kloakservice"
→ changeType: "image"
→ imagePrompt: "Underground sewer pipe system, professional plumbing work, modern drainage system, clean professional photography, high quality"
→ imageLocation: "service-kloakservice"
→ danishExplanation: "Genererer et billede til kloakservice sektionen."

VIGTIG REGEL FOR IMAGE PROMPTS:
- Brug ALTID detaljerede engelske prompts
- Inkluder: "professional photography, high quality, 8K"
- Beskriv stil, farver, stemning præcist
- For hero baggrunde: "wide angle, landscape, professional"
- For ikoner/logos: "simple, minimalist, clean design, white background"

OPGAVE:
Vurder først om brugeren stiller et **SPØRGSMÅL** eller vil lave en **ÆNDRING**.

### HVIS DET ER ET SPØRGSMÅL (fx "hvad er sitet optimeret efter?", "hvad er jeres kontaktinfo?"):
Returner JSON i dette format:
{
  "isQuestion": true,
  "changeType": "question",
  "answer": "Detaljeret dansk svar på spørgsmålet baseret på NUVÆRENDE SITE INDHOLD",
  "danishExplanation": "Dit svar på deres spørgsmål",
  "safetyLevel": "SAFE"
}

### HVIS DET ER EN ÆNDRINGSANMODNING:
Vurder FØRST om det er en god idé:
- Er ændringen i tråd med virksomhedens værdier?
- Vil det forbedre brugeroplevelsen?
- Er der risici eller bedre alternativer?

Derefter returner JSON i dette format:
{
  "isQuestion": false,
  "changeType": "color" | "text" | "service" | "image" | "team",
  "filesAffected": ["PRE/constants.tsx"],
  "specificChanges": [
    {
      "file": "PRE/index.css",
      "action": "replace_class",
      "selector": ".bg-blue-900",
      "oldValue": "#1e3a8a",
      "newValue": "#166534",
      "description": "Ændrer primær farve fra blå til grøn"
    }
  ],
  "safetyLevel": "SAFE" | "CAUTION" | "DANGEROUS",
  "danishExplanation": "Kort forklaring på hvad der ændres OG din vurdering (god/dårlig idé)",
  "estimatedTime": "1-2 minutter",
  "warnings": ["Eventuelle advarsler"],
  "advice": "Din rådgivning: Er det en god idé? Hvad skal de være opmærksomme på? Alternativer?",
  "imagePrompt": "Hvis changeType er 'image': Detaljeret engelsk prompt til Gemini Imagen",
  "imageLocation": "Hvis changeType er 'image': Hvor billedet skal bruges"
}

SAFETY LEVEL REGLER:
- SAFE: Simple tekst/farve ændringer i tilladte filer, samt billede-generering
- CAUTION: Tilføj/fjern services, team medlemmer, større ændringer
- DANGEROUS: Ændringer der berører forbudte områder eller kan bryde sitet

Returner KUN valid JSON, ingen ekstra tekst.
`;

    // Get AI analysis (with optional image support)
    let geminiContents;
    if (imageData) {
      // Multimodal: text + image
      // Extract base64 data and mime type from data URL
      const base64Match = imageData.match(/^data:([^;]+);base64,(.+)$/);
      if (!base64Match) {
        throw new Error('Ugyldigt billede format');
      }
      const mimeType = base64Match[1];
      const base64Data = base64Match[2];

      geminiContents = {
        parts: [
          { text: analysisPrompt },
          { inlineData: { mimeType, data: base64Data } }
        ]
      };
    } else {
      // Text only
      geminiContents = analysisPrompt;
    }

    const result = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: geminiContents
    });
    const text = result.text;

    // Parse JSON response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      throw new Error('AI returnerede ugyldig JSON format');
    }

    // Validate safety level
    if (analysis.safetyLevel === 'DANGEROUS') {
      return res.status(400).json({
        success: false,
        message: 'Denne ændring er markeret som farlig og kan ikke udføres',
        analysis
      });
    }

    // For non-question responses, validate that specificChanges exists and is non-empty
    if (!analysis.isQuestion) {
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
    }

    // For question responses, return directly
    if (analysis.isQuestion) {
      return res.status(200).json({
        success: true,
        analysis,
        message: 'Analyse fuldført'
      });
    }

    // Check if files are allowed
    const unauthorizedFiles = analysis.filesAffected.filter(
      file => !ALLOWED_FILES.some(allowed => {
        if (allowed.includes('**')) {
          const pattern = allowed.replace('**/*', '');
          return file.startsWith(pattern);
        }
        return file === allowed;
      })
    );

    if (unauthorizedFiles.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Følgende filer må ikke redigeres: ${unauthorizedFiles.join(', ')}`,
        analysis
      });
    }

    // Return successful analysis
    return res.status(200).json({
      success: true,
      analysis,
      message: 'Analyse fuldført'
    });

  } catch (error) {
    console.error('Site Editor Analysis Error:', error);

    // Ensure we always return JSON
    return res.status(500).json({
      success: false,
      message: 'Der opstod en fejl ved analyse af din anmodning',
      error: error.message || 'Ukendt fejl',
      details: error.stack ? error.stack.substring(0, 200) : 'Ingen detaljer'
    });
  }
}
