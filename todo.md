# PR Entreprenøren — To-Do Liste

## ✅ FÆRDIGT ALT

### Header & Navigation
- [x] Logo: helmet → rigtige firmabillogo (logo.png), forstørret
- [x] Fjern "PR ENTREPRENØREN" tekst fra header
- [x] Telefon i header → Prebens nummer (22 96 66 61)
- [x] Fjern "& asbest" fra header tagline

### Telefonnumre
- [x] PHONE_JACOB → PHONE_PREBEN i alle hero/CTA knapper (Home, Services, ServiceDetail)
- [x] index.html structured data: opdateret til Prebens nummer

### Anmeldelser
- [x] Fjern "5.0 Stjerner (32 anmeldelser)" fra hero
- [x] Fjern hele "Hvad Kunderne Siger" sektion (fake anmeldelser)

### Priser — ALLE FJERNET
- [x] Fjern "Gennemsigtige priser" fra services undertitel
- [x] Fjern ALLE priceRange fra services (constants.tsx)
- [x] Fjern prisangivelser fra alle FAQ-svar
- [x] Fjern priser fra CASES data
- [x] Fjern priser fra index.html structured data
- [x] Fjern priceRange display fra Services.tsx

### Mød Teamet → Footer kontaktkort
- [x] Fjern "Mød Teamet" fra Home.tsx
- [x] Fjern "Mød Teamet" fra About.tsx
- [x] Footer: 2 professionelle kontaktkort for Jacob og Preben (tlf, email, titel)

### Autorisationsbokse — Redesign (billede dominerer)
- [x] Home.tsx: Ny layout – billede fylder, kun navn og issuer
- [x] About.tsx: 4-kolonne grid, billede i fuldt areal
- [x] Memberships.tsx: 4-kolonne grid, billede dominerer

### Asbest fjernet
- [x] Asbestsanering fjernet som service
- [x] Fjern asbest fra AI-assistent tekst
- [x] Fjern asbest fra Navbar tagline
- [x] USP tekst: fjern asbest reference
- [x] Company story: opdateret (fjernet Jesper og asbest fokus)
- [x] Asbest-certifikat: omformuleret til "vi ER autoriserede"
- [x] index.html: fjernet asbestsanering som service i structured data
- [x] index.html: fjernet asbest fra keywords og description

### Routing fikset
- [x] Fix routing: #/contact → /contact
- [x] Fix routing: #/services → /services (Home + Services)

### Service undersider — NY FUNKTIONALITET
- [x] ServiceDetail.tsx oprettet med:
  - Hero med rigtige projektbilleder (korrekte filnavne fra alle mapper)
  - Breadcrumb navigation
  - Schema.org Service + FAQPage structured data per side
  - Sidebar med ring-knap og kontaktinfo
  - Relaterede services sektion
  - Alle 13 services har egne billeder
- [x] App.tsx: Route /services/:slug tilføjet
- [x] Services.tsx: Opdateret med Link-komponenter og Prebens nummer

### Øvrige rettelser
- [x] Footer serviceområde forenklet
- [x] Admin login API oprettet
- [x] Vis ALLE services på forsiden

## 🟡 TILBAGEVÆRENDE (lavere prioritet)
- [ ] Gennemgå Mission/Vision tekst på Om Os – specificer ønske
- [ ] Bekræft at admin login virker i Vercel (env vars tjekket)
