# SMS Notifikation Setup til PRE Lead Chatbot

## Hvad gør denne feature?

Når en kunde chatter med AI-chatbotten på https://aibernth.dk/pre/ og bliver kvalificeret som et lead (navn, telefon, problem osv.), sker følgende **automatisk**:

1. ✅ Lead gemmes i Supabase database (`pre_leads` table)
2. 📱 Jacob får en SMS med lead-info på sit telefonnummer
3. 🚨 Hvis det er AKUT, får både Jacob og Preben SMS

**Eksempel SMS:**
```
🚨 AKUT LEAD fra PRE!

Navn: Jacob Jørgensen
Tlf: 22606056
Postnr: 5260
Problem: Rotter i kælderen
Forsikring: Nej/Ved ikke

RING NU! Conversation ID: a1b2c3d4

Log ind: aibernth.dk/pre/admin
```

---

## Setup Instruktioner

### 1. Opret Twilio Konto (hvis du ikke har én)

1. Gå til https://www.twilio.com/
2. Klik **Sign Up** (gratis trial)
3. Verificer din email og telefon
4. Du får $15 USD gratis kredit til at teste med

### 2. Køb et dansk telefonnummer

1. I Twilio Console, gå til: **Phone Numbers** → **Buy a Number**
2. Vælg **Denmark (+45)** som land
3. Vælg **SMS-enabled** nummer
4. Køb nummeret (ca. $1/måned)

**VIGTIGT:** Dette nummer bruges til at *sende* SMS'er fra. Jacob/Preben vil se dette nummer som afsender.

### 3. Hent dine Twilio credentials

I Twilio Console, find:
- **Account SID** (fx: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
- **Auth Token** (klik "Show" for at se den)
- **Phone Number** (dit købte nummer, fx: `+4512345678`)

### 4. Tilføj til Vercel Environment Variables

1. Gå til: https://vercel.com/jesper-bernths-projects/aibernth
2. Klik **Settings** → **Environment Variables**
3. Tilføj følgende:

```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = din_auth_token_her
TWILIO_PHONE_NUMBER = +4512345678 (dit Twilio nummer)
JACOB_PHONE_NUMBER = +4520647303 (Jacob's mobil)
PREBEN_PHONE_NUMBER = +4520211407 (Preben's mobil - valgfrit)
```

**VIGTIGT:** Telefonnumre skal være i international format med `+45` foran!

5. Klik **Save** for hver variabel
6. Redeploy projektet (Vercel gør det automatisk)

### 5. Opret Supabase table

1. Log ind på Supabase: https://supabase.com/
2. Vælg dit PRE projekt
3. Gå til **SQL Editor**
4. Kopier indholdet fra `PRE/database/migration-leads.sql`
5. Klik **Run** for at oprette `pre_leads` table

### 6. Test systemet

1. Gå til https://aibernth.dk/pre/
2. Klik på chat-boblen
3. Gennemfør en fuld samtale:
   ```
   AI: Hvad kan vi hjælpe dig med?
   Dig: Jeg har rotter i kælderen
   AI: Hvilket postnummer?
   Dig: 5260
   AI: Må jeg få dit navn?
   Dig: Test Testesen
   AI: Hvad er dit telefonnummer?
   Dig: 12345678
   AI: Er det en forsikringssag?
   Dig: Nej
   AI: Hvor meget haster det?
   Dig: Det er akut
   ```

4. Efter 7+ beskeder, skal Jacob modtage en SMS! 📱

---

## Priser

**Twilio costs (ca.):**
- Dansk telefonnummer: ~$1/måned (~7 kr/måned)
- SMS til dansk nummer: ~$0.10/SMS (~0.70 kr/SMS)
- Med 100 leads/måned: ~$10/måned (~70 kr/måned)

**MEGET billigt** sammenlignet med værdien af kvalificerede leads!

---

## Fejlfinding

### "Jeg får ikke SMS"
1. Tjek at alle environment variables er sat korrekt i Vercel
2. Tjek at telefonnumre er i `+45xxxxxxxx` format
3. Tjek Twilio Console → Logs for fejlbeskeder
4. Verificer at chatbotten har fået nok info (7+ beskeder)

### "SMS kommer fra et amerikansk nummer"
- Dit Twilio nummer er amerikansk. Køb et dansk nummer under "Buy a Number" i Twilio Console

### "Lead gemmes ikke i database"
1. Tjek at Supabase migration er kørt korrekt
2. Tjek API logs i Vercel → Functions

---

## Support

Ved problemer:
- Twilio Support: https://support.twilio.com/
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs

God fornøjelse med automatiske lead-notifikationer! 🚀
