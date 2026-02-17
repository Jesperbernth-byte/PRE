# PR Entreprenøren — To-Do Liste

## ✅ Netop løst
- [x] Logo i header udskiftet fra blå hjelm til logo.png
- [x] Telefonnummer i header skiftet til Prebens (22 96 66 61)
- [x] "& asbest" fjernet fra header tagline
- [x] Asbestsanering fjernet som selvstændig service
- [x] Footer serviceområde forenklet
- [x] Admin login API oprettet (manglede helt)

---

## 🔴 HEADER / NAVBAR
- [ ] 1. Fjern "PR ENTREPRENØREN" teksten i header og forstør logo

## 🔴 TELEFONNUMRE
- [ ] 2. Home.tsx – Hero ring-knap bruger PHONE_JACOB
- [ ] 3. Home.tsx linje 288 – Bund-CTA bruger PHONE_JACOB
- [ ] 4. Audit alle sider for resterende PHONE_JACOB referencer

## 🔴 ANMELDELSER – FJERN ALT FAKE
- [ ] 5. Home.tsx – Fjern hele "Hvad Kunderne Siger" sektionen
- [ ] 6. Home.tsx – Fjern "5.0 Stjerner (32 anmeldelser)" fra hero
- [ ] 7. constants.tsx – Fjern REVIEWS data

## 🔴 PRISER – FJERN ALT
- [ ] 8. Home.tsx – Fjern "Gennemsigtige priser og professionelt håndværk" undertitel
- [ ] 9. constants.tsx – Fjern alle priceRange felter fra services
- [ ] 10. constants.tsx – Fjern priser fra CASES data

## 🔴 "MØD TEAMET" FJERNES + FOOTER KONTAKTKORT
- [ ] 11. Home.tsx – Fjern "Mød Teamet" sektionen
- [ ] 12. About.tsx – Fjern "Mød Teamet" sektionen
- [ ] 13. App.tsx (Footer) – Erstat kontaktliste med 2 professionelle kontaktkort for Jacob og Preben

## 🔴 AUTORISATIONSBOKSE – REDESIGN
- [ ] 14. Home.tsx – Redesign: billede fylder mest, ultra-kort tekst
- [ ] 15. Memberships.tsx – Samme redesign
- [ ] 16. About.tsx – Certifikationsbokse redesign

## 🔴 ASBEST NÆVNES STADIG
- [ ] 17. Home.tsx – Fjern "mistænkelig asbest eller" fra AI-assistent tekst
- [ ] 18. About.tsx – USP beskrivelse ændres fra "kloak- og asbestarbejde" til "kloakarbejde"
- [ ] 19. constants.tsx CERTIFICATIONS – Asbest-certifikat beholdes men omformuleres (vi ER autoriserede, ikke en service)

## 🟡 LINKS/ROUTING
- [ ] 20. Home.tsx – Fix #/contact → /contact (linje 39 + 283)
- [ ] 21. Home.tsx – Fix #/services/... → /services/... (service links)

## 🟡 BILLEDER
- [ ] 22. Verificer /team/jacob1.jpg og /team/preben1.jpg eksisterer
- [ ] 23. Verificer korrekt hero billede bruges

## 🟡 MISSION / VISION
- [ ] 24. About.tsx – Gennemgå og opdater mission/vision tekst
