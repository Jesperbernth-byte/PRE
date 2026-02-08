# AI Instruktioner - Forbedringer til PRE

## Hvad er blevet forbedret?

Alle AI-features i PRE systemet har nu fået **detaljerede instruktioner** baseret på virksomhedens faktiske behov, ydelser, og tone of voice.

---

## 1. Lead Chatbot (LeadChat.tsx)

### Før:
```
"Du er en hjælpsom assistent for PR Entreprenøren ApS.
Stil spørgsmål om navn, telefon, postnummer..."
```

### Nu:
- ✅ Fuld virksomhedsinfo (alle ydelser med detaljer)
- ✅ Prioriterings-guide (AKUT vs HASTER vs PLANLAGT)
- ✅ Geografisk dækning (Fyn + Trekanten)
- ✅ Pris-politik ("Vi skal besigtige først")
- ✅ Forsikrings-håndtering
- ✅ Tone of voice regler
- ✅ Edge cases (vred kunde, ved ikke hvad problem er, osv.)
- ✅ Komplet eksempel på god samtale

### Resultat:
Chatbotten kan nu:
- Skelne mellem akut og planlagt
- Forklare hvad hver ydelse er
- Håndtere asbest-spørgsmål korrekt (vi laver det KUN begrænset!)
- Give konsistent, jordnære svar
- Aldrig love faste priser

---

## 2. Lead Qualification AI (qualifyLeadWithAI)

### Før:
```
"Analyser samtalen og udtræk info..."
```

### Nu:
- ✅ Klar prioriterings-guide med eksempler
- ✅ AI Summary format guide
- ✅ Forsikrings-logik
- ✅ Konkrete eksempler på gode summaries

### Resultat:
Jacob/Preben får nu SMS med:
```
🚨 AKUT LEAD!
"Vand i kælder lige nu i Odense. Står 10cm.
Kunde hjemme hele dagen. Ring NU."
```

I stedet for:
```
"Kunde har problem med vand"
```

---

## 3. Site Editor - Analyse AI (analyze.js)

### Før:
```
"Du analyserer ønsker til ændringer..."
```

### Nu:
- ✅ Virksomhedsinfo og værdier
- ✅ Services forklaring
- ✅ Kontekst om asbest (laver det kun begrænset!)
- ✅ Forklaring af hvad der kan ændres

### Resultat:
Når Jacob siger "Fjern asbest fra sitet", forstår AI'en:
- Det er OK at fjerne det (vi laver det kun begrænset alligevel)
- Fjern det fra services listen
- Fjern al tekst om asbest

---

## 4. Site Editor - Code Generation AI (preview.js)

### Før:
```
"Du er en kode-generator. Generer kode..."
```

### Nu:
- ✅ Virksomhedskontext
- ✅ Brand guidelines (farver, tone)
- ✅ Tone of voice for tekster
- ✅ Klare regler for output format

### Resultat:
Genereret kode har nu:
- Jordnære, passende tekster
- Konsistent styling
- Ingen "marketing-fluff"

---

## 5. Billede-Analyse AI (analyzeProblemImage)

### Før:
```
"Analyser billedet og giv vurdering..."
```

### Nu:
- ✅ Alle ydelser forklaret
- ✅ Prioriterings-guide
- ✅ Asbest-håndtering (henvis til specialister)
- ✅ Struktureret output format
- ✅ Tone guidelines

### Resultat:
Hvis kunde sender billede af asbest-tag:
> "Dette kræver specialiseret asbestsanering. Vi kan kun hjælpe i begrænset omfang ved kloak/dræn arbejde. Jeg anbefaler at kontakte en certificeret asbestsanerings-virksomhed."

I stedet for:
> "Vi kan hjælpe med asbestsanering!"

---

## Central Dokumentation

**Fil:** `PRE/AI_COMPANY_INFO.md`

Indeholder:
- Komplet virksomhedsinfo
- Alle ydelser med detaljer
- Prisstruktur og politik
- Geografisk dækning
- Prioriterings-guide
- Forsikrings-info
- Tone of voice guidelines
- Edge cases og eksempler
- GDPR & compliance

**Denne fil er reference-dokumentation** - den bruges ikke direkte af AI'en, men bruges som basis for at skrive AI instruktioner.

---

## Test Scenarier

### Scenario 1: Akut vand i kælder
```
Kunde: Jeg har vand i kælderen
AI: Det skal vi have stoppet hurtigt. Hvilket postnummer?
Kunde: 5260
AI: Det dækker vi. Må jeg få dit navn?
...
AI: Står vandet LIGE NU?
Kunde: Ja
AI: ✅ Det er akut. Jeg kontakter Jacob med det samme!
```

### Scenario 2: Asbest-henvendelse
```
Kunde: Kan I fjerne asbest fra mit tag?
AI: ✅ Vi håndterer kun asbest i begrænset omfang i forbindelse med kloakarbejde.
    Til asbestsanering af tag anbefaler jeg en specialiseret asbestsanerings-virksomhed.
```

### Scenario 3: Pris-spørgsmål
```
Kunde: Hvad koster en rottespærre?
AI: ✅ Prisen afhænger af antal toiletter/afløb og husets størrelse.
    Vi kommer gerne ud og laver en gratis besigtigelse, så I får et præcist tilbud.
```

### Scenario 4: Udenfor område
```
Kunde: Jeg bor i København - kan I komme?
AI: ✅ Desværre dækker vi ikke København.
    Vi opererer på Fyn og i Trekantsområdet.
    Jeg anbefaler at søge efter en lokal kloakmester i jeres område.
```

---

## Fremtidige Forbedringer

### Mulige tilføjelser:
1. **Sæson-specifikke svar** (fx "Frysevejr kan give rørsprængninger")
2. **Tidligere kunde-genkendelse** (hvis telefonnummer genkendt)
3. **Bookingsystem integration** (vælg tidspunkt direkte i chat)
4. **Multi-language** (engelsk for turister/sommerhusejere)
5. **Video-support** (kunde sender video af problem)

### Hvordan tilføjer man nye instruktioner?

1. Opdater `AI_COMPANY_INFO.md` med ny info
2. Opdater relevante AI prompts:
   - `PRE/services/geminiService.ts` - Chatbot
   - `api/pre/site-editor/analyze.js` - Site editor analyse
   - `api/pre/site-editor/preview.js` - Code generation
3. Test scenariet grundigt
4. Commit med beskrivelse af ændringen

---

## Metrics & Monitoring

### Hvad skal måles:
- Hvor mange leads konverterer til kundeemner?
- Hvor mange gange beder AI om pris (skal være sjældent!)
- Hvor mange gange nævnes "asbest" forkert?
- Respons-tid fra lead til Jacob's opkald

### Logs at tjekke:
- Vercel Functions logs → se API fejl
- Supabase `pre_leads` table → se kvalitet af lead-data
- Twilio logs → se om SMS'er afsendes korrekt

---

**Sidst opdateret:** Januar 2025
**Af:** Claude AI
**Status:** ✅ Live i produktion
