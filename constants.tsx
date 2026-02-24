import React from 'react';
import { Droplets, ShieldCheck, Bug, Camera, Trash2, Home, Hammer, Users } from 'lucide-react';
import { Service } from './types';

import siteContent from './site-content.json';

// Editable content from site-content.json (sync via admin ContentEditor)
export const COMPANY_NAME = siteContent.company.name;
export const TAGLINE = siteContent.company.tagline;
export const CVR = siteContent.company.cvr;
export const ADDRESS = siteContent.company.address;
export const GLN_NUMBER = siteContent.company.gln;

export const PHONE_PREBEN = siteContent.contacts.preben.phone;
export const PHONE_JACOB = siteContent.contacts.jacob.phone;
export const EMAIL_PREBEN = siteContent.contacts.preben.email;
export const EMAIL_JACOB = siteContent.contacts.jacob.email;
export const EMAIL_FAKTURA = siteContent.contacts.faktura.email;
export const EMAIL = siteContent.contacts.jacob.email;

export const LOGO_PATH = siteContent.header.logoPath;
export const LOGO_ALT = siteContent.header.logoAlt;

export const HERO_TITLE = siteContent.hero.title;
export const HERO_SUBTITLE = siteContent.hero.subtitle;
export const HERO_IMAGE = siteContent.hero.imagePath;

export const FOOTER_TAGLINE = siteContent.footer.tagline;
export const SERVICE_AREA = siteContent.footer.serviceArea;

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'omfangsdraen',
    image: '/pictures/Dræn/20210628_065610.jpg',
    title: 'Omfangsdræn',
    description: 'Permanent løsning mod fugt i kælder. Professionelt installeret drænsystem der beskytter dit fundament i årtier.',
    longDescription: 'Fugt i kælderen er ikke bare ubehageligt – det truer hele byggeriets levetid. Vi installerer omfangsdræn efter DTU-anvisninger med kvalitetsmaterialer der holder i generationer. Fra udgravning og membran til drænrør og retablering håndterer vi hele processen, så du kan være sikker på et tørt resultat.',
    icon: 'Droplets',
    faqs: [
      { question: 'Hvordan ved jeg om jeg har brug for omfangsdræn?', answer: 'Tegn på behov: Fugtige vægge i kælder, mosgr på sokkel, revner i fundament, musefår lugt, eller synlige vandskader. Vi kommer gerne ud til gratis besigtigelse og vurderer dit behov.' },
      { question: 'Hvor længe holder et omfangsdræn?', answer: 'Et professionelt udført omfangsdræn med kvalitetsmaterialer holder 50+ år. Vi bruger kun anerkendte produkter og følger DTU-retningslinjer nøje.' },
      { question: 'Skal jeg have tilladelse fra kommunen?', answer: 'Normalt ikke til omfangsdræn på egen grund. Vi håndterer dog alle nødvendige anmeldelser hvis projektet kræver det.' },
      { question: 'Hvad koster et omfangsdræn for et parcelhus?', answer: 'Prisen afhænger af husets størrelse, jordbundsforhold og adgangsforhold. Vi tilbyder altid gratis besigtigelse og fast pris herefter.' }
    ]
  },
  {
    id: '2',
    slug: 'kloakarbejde',
    image: '/pictures/Separering/20210713_123952.jpg',
    title: 'Kloakseparering & Renovering',
    description: 'Lovpligtig opdeling af regn- og spildevand. Vi klarer alt fra ansøgning til færdigmelding – første gang.',
    longDescription: 'Mange fynske kommuner kræver nu opdeling af regn- og spildevand. Som autoriseret kloakmester håndterer vi hele processen: myndighedsansøgninger, opgravning, installation af nye ledninger, og professionel færdigmelding. Du skal ikke gøre andet end at godkende tilbuddet – resten klarer vi.',
    icon: 'Hammer',
    faqs: [
      { question: 'Er jeg forpligtet til at separere kloak?', answer: 'Det afhænger af din kommune. Mange steder på Fyn er det nu lovkrav. Vi tjekker gerne din adresse og fortæller hvad der gælder for dig.' },
      { question: 'Hvad sker der hvis jeg ikke separerer?', answer: 'Du risikerer dagbøder fra kommunen og kan blive nægtet byggettilladelse til fremtidige projekter. Desuden stiger risikoen for oversvømmelse ved kraftig regn.' },
      { question: 'Skal jeg selv søge tilladelse?', answer: 'Nej, vi håndterer alle ansøgninger og kommunikation med kommunen. Du modtager en kopi når alt er godkendt.' },
      { question: 'Hvor lang tid tager en separering?', answer: 'Typisk 3-7 arbejdsdage for et parcelhus, afhængig af grundens størrelse og placering af eksisterende ledninger.' }
    ]
  },
  {
    id: '3',
    slug: 'rottespaerre',
    image: '/pictures/Rottespærre/1.png',
    title: 'Rottespærre',
    description: 'Giftfri rottesikring med dokumenteret effekt. Vi monterer kun certificerede rottespærrer fra Nordisk Innovation – patenteret dansk kvalitet.',
    longDescription: `Rotter i kloaksystemet er et stigende problem i danske byer. En enkelt rotte kan svømme op gennem afløbssystemet og ende i dit toilet – et mareridt ingen skal opleve.

Nordisk Innovation rottespærrer – Patenteret beskyttelse

Vi installerer udelukkende rottespærrer fra Nordisk Innovation, som er markedsleder inden for giftfri rottesikring. Deres patenterede design sikrer effektiv beskyttelse uden brug af kemiske bekæmpelsesmidler.

Sådan fungerer det

Rottespærren er en mekanisk enhed der monteres i din kloakledning. Den fungerer som et envejsspjæld: Affald kan frit løbe ud fra dit hus, men rotter kan ikke komme ind. Systemet er konstrueret så det ikke påvirker kloakkens normale funktion eller øger risikoen for tilstopning. Nordisk Innovation tilbyder 40 forskellige varianter tilpasset de mest almindelige rørtyper, så vi altid kan finde den rette løsning til netop dit hjem.

Installation på få timer

Installationen foregår professionelt og hurtigt. Vi bruger Nordisk Innovations specialudviklede værktøj, som sikrer korrekt montering første gang. I de fleste tilfælde er arbejdet færdigt på under en dag.

Årlig service anbefales

For at sikre optimal funktion gennem årene anbefaler vi et årligt eftersyn. Vi tilbyder serviceaftaler så du aldrig skal tænke på det – vi kontakter dig når det er tid til tjek.

Lovkrav og forsikring

Flere og flere kommuner indfører krav om rottespærrer i nybyggeri og ved større renoveringer. Derudover kan nogle forsikringsselskaber kræve rottespærre for at dække skader relateret til rotter. Vi rådgiver gerne om reglerne i din kommune.`,
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvordan virker en rottespærre?', answer: 'Rottespærren er et mekanisk envejsspjæld monteret i kloakledningen. Affald kan frit løbe ud fra dit hus, men rotter kan ikke svømme ind. Det patenterede design fra Nordisk Innovation sikrer at spjældet åbner og lukker korrekt uden at påvirke kloakkens funktion.' },
      { question: 'Kan rottespærren tilstoppe mit afløb?', answer: 'Nej. Nordisk Innovations rottespærrer er designet til at håndtere alt normalt kloakaffald uden at tilstoppe. De findes i 40 forskellige varianter tilpasset forskellige rørtyper, så vi vælger altid den korrekte størrelse til dit system. Vi anbefaler dog et årligt eftersyn for at sikre optimal drift.' },
      { question: 'Er det lovpligtigt at have rottespærre?', answer: 'Det afhænger af din kommune og byggeriet. Flere kommuner indfører nu krav om rottespærrer i nybyggeri og ved større renoveringer. Kontakt os, så tjekker vi reglerne for netop din adresse og rådgiver dig om dine muligheder.' },
      { question: 'Virker det virkelig – eller kommer rotterne bare en anden vej?', answer: 'Ja, det virker! Nordisk Innovation rottespærrer er testet, patenteret og dokumenteret effektive. Når rottespærren er monteret i din kloakledning, er den vej fysisk blokeret. Rotter kan selvfølgelig stadig komme ind via andre veje (f.eks. huller i fundamentet), men vejen gennem kloakken er spærret permanent.' },
      { question: 'Hvor lang tid holder en rottespærre?', answer: 'Ved korrekt installation og årlig service holder en Nordisk Innovation rottespærre i mange år. Materialet er robust og designet til at modstå de hårde forhold i kloaksystemet. Serviceaftaler sikrer at spjældet altid fungerer optimalt.' },
      { question: 'Hvad koster det at få monteret en rottespærre?', answer: 'Prisen afhænger af dit specifikke kloaksystem, tilgængelighed og hvilken variant der passer til dine rør. Kontakt os for en konkret pris – vi kommer gerne ud og vurderer din situation uden beregning.' }
    ]
  },
  {
    id: '4',
    slug: 'hoejvandslukker',
    image: '/pictures/Højvandslukke/20211123_122121.jpg',
    title: 'Højvandslukker & Backflow Sikring',
    description: 'Beskyt kælderen mod opstigende kloakvand. Installation og service af Kessel og UWS højvandslukkere.',
    longDescription: 'Ved ekstrem regn kan kommunens kloaksystem blive overbelastet – og kloakvandet løber tilbage gennem din afløb og ud i kælderen. En højvandslukker stopper dette automatisk. Vi er certificerede montører for både Kessel og UWS systemer og servicerer alle mærker.',
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvad er forskellen på højvandslukker og rottespærre?', answer: 'Rottespærren forhindrer rotter i at komme ind. Højvandslukkeren forhindrer kloakvand i at løbe tilbage ved overbelastning. Begge er vigtige sikkerhedsforanstaltninger.' },
      { question: 'Skal en højvandslukker serviceres?', answer: 'Ja, mindst én gang årligt. Vi tilbyder serviceaftaler så du altid er sikret optimal beskyttelse.' },
      { question: 'Dækker forsikringen skader hvis jeg ikke har højvandslukker?', answer: 'Ofte ikke. Mange forsikringsselskaber kræver nu højvandslukker i risikoområder, ellers dækkes skader ikke.' },
      { question: 'Hvilke mærker arbejder I med?', answer: 'Vi er godkendte servicepartnere for både Kessel og UWS – to af markedets førende producenter. Vi kan også servicere andre mærker.' }
    ]
  },
  {
    id: '5',
    slug: 'tv-inspektion',
    image: '/pictures/Tv-inspektion/20210904_112241.jpg',
    title: 'TV-Inspektion & Fejlsøgning',
    description: 'HD-kamera inspektion af kloakledninger. Præcis lokalisering af brud, rodindtrængning og blokering.',
    longDescription: 'Hvorfor grave hele haven op når problemet kan lokaliseres præcist? Med professionelt HD-kameraudstyr inspicerer vi dine kloakledninger og dokumenterer skader millimeterpræcist. Du får en detaljeret rapport med billeder – perfekt til forsikringen eller som grundlag for målrettet reparation.',
    icon: 'Camera',
    faqs: [
      { question: 'Hvornår skal jeg have lavet TV-inspektion?', answer: 'Ved gentagne stop i kloakken, mistanke om brud eller rodindtrængning, ved køb/salg af hus, eller hvis du ønsker at vide tilstanden før større renoveringer.' },
      { question: 'Hvor langt kan kameraet køre?', answer: 'Vores udstyr kan inspicere op til 100 meter ledning i ét stræk. Ved behov kombinerer vi med inspektion fra flere brønde.' },
      { question: 'Får jeg dokumentation?', answer: 'Ja, du modtager en komplet rapport med stillbilleder, video og præcis angivelse af eventuelle skaders placering. Dette kan bruges over for forsikring eller ved uenigheder med naboer.' }
    ]
  },
  {
    id: '6',
    slug: 'lar-anlaeg',
    image: '/pictures/Dræn/20210628_065624.jpg',
    title: 'LAR-Anlæg (Lokal Afledning af Regnvand)',
    description: 'Miljøvenlig håndtering af regnvand på egen grund. Kan give kommunalt tilskud og reduceret kloakafgift.',
    longDescription: 'LAR-anlæg (Lokal Afledning af Regnvand) er fremtidens måde at håndtere regnvand på. I stedet for at lede alt vand til kommunens overbelastede system, nedsiver eller forsinker vi det lokalt på din grund. Dette reducerer både miljøbelastning og din kloakafgift – og nogle kommuner giver endda tilskud til etablering.',
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad er fordelene ved LAR-anlæg?', answer: 'Reduceret kloakafgift, mulig for kommunalt tilskud, mindre belastning på kloak-systemet, og ofte et lovkrav ved nybyggeri eller større renoveringer.' },
      { question: 'Hvor meget plads kræver det?', answer: 'Det afhænger af grundens størrelse og jordbundsforhold. Et typisk parcelhus kræver 15-30 m² til regnbed eller nedsivningsanlæg.' },
      { question: 'Kan alle grundejere få LAR-anlæg?', answer: 'Nej, det kræver tilstrækkelig nedsivningskapacitet i jorden. Vi laver en gratis vurdering og fortæller om det er muligt på din grund.' },
      { question: 'Giver kommunen tilskud?', answer: 'Mange fynske kommuner har tilskudsordninger til LAR-anlæg. Vi hjælper gerne med ansøgningen.' }
    ]
  },
  {
    id: '8',
    slug: 'entreprenoer-arbejde',
    image: '/pictures/Anlægsarbejde/20211007_173659.jpg',
    title: 'Entreprenørarbejde & Jordflytning',
    description: 'Fra udgravning til terrænregulering – vi har maskinerne og erfaringen til effektiv løsning af din opgave.',
    longDescription: 'Med egen maskinpark og årtiers erfaring løser vi alle typer jordarbejde hurtigt og professionelt. Gravemaskiner til store projekter, rendegravere til præcisionsarbejde, dumpers til transport og komprimeringsudstyr til fast underlag. Vi kender den fynske jordbund og ved hvad der kræves for et holdbart resultat.',
    icon: 'Hammer',
    faqs: [
      { question: 'Hvilke entreprenøropgaver løser I?', answer: 'Udgravning til fundamenter, indkørsler, terrænregulering, jordflytning, nedrivning af belægning, komprimering af underlag, rydning af byggegrunde – og meget mere.' },
      { question: 'Hvor hurtigt kan I rykke ud?', answer: 'Akutte opgaver ofte samme eller næste dag. Planlagte projekter koordineres efter din tidsplan.' },
      { question: 'Samarbejder I med andre håndværkere?', answer: 'Ja, vi samarbejder ofte med murere, tømrere og andre faggrupper om samlede projekter.' }
    ]
  },
  {
    id: '9',
    slug: 'naturpleje',
    image: '/pictures/Oprensning af sø/20260119_112241.jpg',
    title: 'Naturpleje & Genopretning',
    description: 'Rydning, pleje og genopretning af grunde og naturområder. Perfekt kombination med dræn- og kloakprojekter.',
    longDescription: 'Med Prebens mangeårige baggrund inden for naturpleje tilbyder vi professionel rydning og genopretning af grunde, våde arealer og naturområder. Især relevant ved projekter hvor fugtige områder skal drænes og efterfølgende plejes – en helhedsløsning der sikrer både funktionalitet og æstetik.',
    icon: 'Hammer',
    faqs: [
      { question: 'Hvilke naturplejearbejder udfører I?', answer: 'Rydning af grunde, fjernelse af træer og buske, genopretning efter udgravning, etablering af fugtige naturområder, og pleje af arealer med særlige krav.' },
      { question: 'Kan I håndtere store arealer?', answer: 'Ja, vi har maskinerne til både små private haver og store erhvervsarealer eller naturområder.' },
      { question: 'Kombinerer I naturpleje med kloakarbejde?', answer: 'Ja, det er en af vores styrker. Vi kan f.eks. etablere dræn og derefter genoprette området naturligt – en samlet løsning der sparer dig for flere entreprenører.' }
    ]
  },
  {
    id: '10',
    slug: 'miniransanlaeg',
    image: '/pictures/Miniransanlæg/20210615_122917.jpg',
    title: 'Miniransanlæg & Renseanlæg',
    description: 'Installation og service af private renseanlæg. Professionel løsning til ejendomme uden offentlig kloak.',
    longDescription: 'Bor du uden for kloakerede områder? Vi installerer og servicerer miniransanlæg der sikrer lovlig rensning af spildevand. Vi håndterer alt fra ansøgninger til kommunen, udgravning, installation og efterfølgende service. Alle anlæg lever op til gældende miljøkrav.',
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad er et miniransanlæg?', answer: 'Et privat renseanlæg til ejendomme uden adgang til offentlig kloak. Det renser spildevand mekanisk og biologisk før udledning.' },
      { question: 'Skal anlægget serviceres?', answer: 'Ja, mindst én gang årligt skal slam tømmes og anlægget efterses. Vi tilbyder serviceaftaler.' },
      { question: 'Hvad koster installation?', answer: 'Prisen afhænger af antal personer i husstanden, jordbundsforhold og valg af anlæg. Kontakt os for et uforpligtende tilbud.' },
      { question: 'Skal jeg have tilladelse?', answer: 'Ja, kommunen skal godkende installation. Vi håndterer ansøgningen for dig.' }
    ]
  },
  {
    id: '11',
    slug: 'broend-renovering',
    image: '/pictures/Brønd renovering/20211027_142831.jpg',
    title: 'Brøndrenovering & Brøndbygning',
    description: 'Renovering af gamle brønde og byggeri af nye inspektionsbrønde. Professionel udførelse efter gældende regler.',
    longDescription: 'Gamle brønde kan være utætte og kræve renovering. Vi renoverer eksisterende brønde med tætningsprodukter eller bygger nye inspektionsbrønde i beton eller plast. Alle brønde bygges efter DS/EN-standarder og med korrekt belægning og dæksel.',
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvornår skal en brønd renoveres?', answer: 'Ved revner, utætheder, manglende trin eller hvis dæksel er beskadiget. Ofte opdages det ved TV-inspektion.' },
      { question: 'Hvad koster en ny brønd?', answer: 'Prisen afhænger af dybde og type. Kontakt os for et uforpligtende tilbud.' },
      { question: 'Kan I renovere uden at grave op?', answer: 'I nogle tilfælde ja - med indvendig tætning. Men ved større skader kræves opgravning.' }
    ]
  },
  {
    id: '12',
    slug: 'olietanke',
    image: '/pictures/Olie tanke/20220905_090641.jpg',
    title: 'Olietanke - Nedtagning & Sanering',
    description: 'Sikker nedtagning af gamle olietanke. Lovpligtig håndtering og miljøgodkendelse.',
    longDescription: 'Gamle nedgravede olietanke udgør en miljørisiko og skal håndteres korrekt. Vi er specialister i nedtagning af både over- og nedgravede tanke. Vi sørger for korrekt bortskaffelse, jordprøver og miljørapportering til kommunen.',
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Skal gamle olietanke fjernes?', answer: 'Ja, nedgravede tanke skal fjernes ved ejerskifte eller når de ikke længere bruges. Det er lovkrav.' },
      { question: 'Hvad hvis der er forurening?', answer: 'Vi tager jordprøver og dokumenterer eventuel forurening. Hvis nødvendigt saneres jorden efter miljøkrav.' },
      { question: 'Hvad koster nedtagning?', answer: 'Prisen afhænger af tankens størrelse og placering. Vi giver altid fast pris efter besigtigelse.' }
    ]
  },
  {
    id: '13',
    slug: 'fundament',
    image: '/pictures/Fundament/20220304_093935.jpg',
    title: 'Fundamentarbejde & Støbning',
    description: 'Professionel udgravning og klargøring til fundamenter. Præcist arbejde der sikrer et stabilt grundlag.',
    longDescription: 'Et godt fundament starter med korrekt jordarbejde. Vi graver ud, komprimerer underlag og sikrer korrekt dræning omkring fundamenter. Perfekt forberedelse til støbning af garage, carport, tilbygning eller helt nye byggerier.',
    icon: 'Hammer',
    faqs: [
      { question: 'Hvad indgår i fundamentarbejde?', answer: 'Udgravning til korrekt dybde, komprimering af underlag, etablering af dræn og sandfyld. Alt klar til støbning.' },
      { question: 'Laver I også selve støbningen?', answer: 'Vi klargør til støbning. Selve betonstøbning foregår ofte i samarbejde med andre entreprenører.' },
      { question: 'Hvor dybt skal fundamentet være?', answer: 'Minimum 60 cm under terræn i frostfri dybde. Vi rådgiver baseret på jordbund og byggeri.' }
    ]
  },
  {
    id: '14',
    slug: 'vandledning',
    image: '/pictures/Vandledning/20210908_100009.jpg',
    title: 'Vandledninger - Reparation & Fornyelse',
    description: 'Reparation af vandledninger og udskiftning af gamle rør. Hurtig service ved brud og lækager.',
    longDescription: 'Gamle vandledninger kan få brud eller korrodere. Vi reparerer eller udskifter både hoved- og stikledninger. Ved akutte brud rykker vi hurtigt ud for at minimere vandskader. Vi arbejder med både kobbер, plast og bly-udskiftning.',
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad koster det at skifte en vandledning?', answer: 'Prisen afhænger af længde, dybde og materialetype. Kontakt os for et uforpligtende tilbud.' },
      { question: 'Hvor hurtigt kan I komme ved brud?', answer: 'Ved akutte vandledningsbrud kommer vi inden for 2 timer - også aften og weekend.' },
      { question: 'Skal gamle blyrør udskiftes?', answer: 'Ja, blyrør bør udskiftes af hensyn til drikkevandskvaliteten. Vi hjælper med udskiftning.' }
    ]
  }
];

export const USPs = [
  {
    title: "Autoriseret Kloakmester",
    desc: "Jacob er certificeret af Sikkerhedsstyrelsen og fagligt ansvarlig for kloakarbejde. Du er garanteret lovligt udført arbejde."
  },
  {
    title: "Dokumenteret Kvalitet",
    desc: "Godkendt kvalitetsledelsessystem via Kloakmestrenes Kontrolinstans. Alle opgaver sporbare og udført efter gældende regler."
  },
  {
    title: "Akut Respons Under 2 Timer",
    desc: "Ved vandskade, rotter eller andre akutte problemer prioriterer vi dig højest. Ring og vi er der inden 2 timer – også aften og weekend."
  },
  {
    title: "Fast Pris – Ingen Overraskelser",
    desc: "Efter gratis besigtigelse får du en fast pris. Finder vi uforudsete problemer undervejs, kontakter vi dig først før vi fortsætter."
  },
  {
    title: "Fynsk Grundlægger",
    desc: "Vi har rødder på Fyn og kender områdets jordbund, vejr og kommunale krav. Lokal forankring giver bedre service og hurtigere respons."
  },
  {
    title: "5 Års Garanti",
    desc: "Vi står ved vores arbejde. Alle opgaver er dækket af 5 års garanti fordi vi bruger kvalitetsmaterialer og udfører arbejdet ordentligt."
  }
];

export const TEAM = [
  {
    name: "Preben",
    role: "Direktør",
    phone: "22 96 66 61",
    email: "pr@prentreprenoer.dk",
    description: "Virksomhedens grundlægger med årtiers erfaring inden for entreprenørarbejde og maskinstationsopgaver. Ansvarlig for overordnet strategi og sikrer høj kvalitet i alle projekter.",
    image: "/team/preben1.jpg"
  },
  {
    name: "Jacob",
    role: "Daglig Leder & Autoriseret Kloakmester",
    phone: "24 94 66 61",
    email: "jeh@prentreprenoer.dk",
    description: "Fagligt ansvarlig for både kloak- og asbestarbejde. Står for daglig drift, tekniske vurderinger og er din primære kontakt ved alle kloakrelaterede spørgsmål.",
    image: "/team/jacob1.jpg"
  }
];

export const CASES = [
  {
    id: 1,
    title: "Omfangsdræn i Odense",
    problem: "Fugtig kælder og synlige revner i fundament",
    solution: "Komplet omfangsdræn 3 sider, 42 løbende meter med membran og drænrør",
    result: "100% tør kælder - ingen problemer siden 2022",
    duration: "2 uger",
    image: "/pictures/Dræn/20210628_065610.jpg"
  },
  {
    id: 2,
    title: "Kloakseparering i Svendborg",
    problem: "Kommunens krav om separering af regn- og spildevand",
    solution: "Ny regnvandsbrønd, opdeling af ledninger, tilslutning til offentlig kloak",
    result: "Godkendt af kommune første gang - ingen efterarbejde",
    duration: "1 uge",
    image: "/pictures/Separering/20220829_153238.jpg"
  },
  {
    id: 3,
    title: "TV-inspektion med brud lokaliseret",
    problem: "Tilbagevendende stop i kloak og mistanke om brud",
    solution: "Professionel TV-inspektion af 45 meter ledning, præcis lokalisering af rodindtrængning",
    result: "Målrettet reparation - ingen unødvendig opgravning",
    duration: "2 timer",
    image: "/pictures/Tv-inspektion/20211206_114913.jpg"
  },
  {
    id: 4,
    title: "Miniransanlæg installation på Sydfyn",
    problem: "Ingen mulighed for tilslutning til offentlig kloak",
    solution: "Komplet installation af 5 PE miniransanlæg inkl. ansøgning og godkendelse",
    result: "Godkendt første gang - fuldt funktionelt renseanlæg",
    duration: "1 uge",
    image: "/pictures/Miniransanlæg/20210616_080635.jpg"
  }
];

export const REVIEWS = [
  {
    name: "Lars H.",
    location: "Odense",
    rating: 5,
    date: "December 2025",
    text: "Super professionelt arbejde. Jacob kom med det samme, da vi havde vand i kælderen. Alt blev ordnet på 2 dage, og prisen var som aftalt. Kan varmt anbefales!"
  },
  {
    name: "Anne M.",
    location: "Svendborg",
    rating: 5,
    date: "November 2025",
    text: "Vi skulle have kloakseparering. Fik 3 tilbud, og PR Entreprenøren var både billigst og mest professionel. De kom til tiden hver dag og ryddede pænt op."
  },
  {
    name: "Thomas K.",
    location: "Middelfart",
    rating: 5,
    date: "Oktober 2025",
    text: "Akut problem med rotter. Jacob kom samme aften kl. 22 og fik løst problemet. Det er en service, man sjældent oplever. 10/10!"
  },
  {
    name: "Susanne P.",
    location: "Nyborg",
    rating: 5,
    date: "September 2025",
    text: "Omfangsdræn omkring hele huset. Stor opgave, men de holdt den aftalte pris og tidsplan. Vi er meget tilfredse."
  }
];

export const CERTIFICATIONS = siteContent.certifications as any[];

// Company history for About page
export const COMPANY_HISTORY = {
  title: "Fra Entreprenør til Kloakspecialist",
  intro: "PR Entreprenøren ApS er resultatet af årtiers praktisk erfaring kombineret med moderne faglighed og certificeringer.",
  story: `Preben har siden midten af 2000'erne drevet entreprenørvirksomhed på Fyn med fokus på naturpleje, maskinstationsarbejde og genopretningsprojekter. Den erfaring og det lokale kendskab gav et solidt fundament.

I 2025 blev det klart at fremtiden lå i specialisering. PR Entreprenøren ApS blev etableret med fuld fokus på kloak og dræn – arbejde der kræver autorisation, præcision og ansvarlighed. Samtidig fortsætter den oprindelige enkeltmandsvirksomhed som Ølsted Maskinstation.

Jacob blev ansat som autoriseret kloakmester og overtog den daglige ledelse og alt fagligt ansvar. Med sin autorisation fra Sikkerhedsstyrelsen sikrer han at hvert projekt lever op til lovkrav og branchestandarder.

I dag er Preben og Jacob virksomhedens drivkraft. Målet er klart: at vokse til 8-12 medarbejdere uden at gå på kompromis med kvalitet.`,
  mission: "At levere kvalitetsarbejde med fokus på sikkerhed, faglighed og ordentlighed.",
  values: ["Ansvar", "Sikkerhed", "Kvalitet", "Samarbejde"]
};

// Service areas with focus
export const SERVICE_AREAS = {
  primary: ["Faaborg-Midtfyn", "Assens", "Odense"],
  secondary: ["Svendborg", "Nyborg", "Middelfart", "Kerteminde"],
  extended: ["Vejle", "Kolding", "Fredericia"],
  description: "Vi dækker hele Fyn og Trekantområdet, med særligt fokus på Faaborg-Midtfyn, Assens og Odense hvor vi har dyb lokal forankring og kender kommunernes specifikke krav."
};

// Memberships and partnerships
export const MEMBERSHIPS = [
  {
    name: "Danske Maskinstationer og Entreprenører (DM&E)",
    type: "Brancheorganisation",
    logo: "/partners/dme-logo.png",
    description: "Medlem af DM&E – din garanti for professionel håndværksvirksomhed",
    link: "https://medlem.dmoge.dk/unions/dme-fyn/"
  },
  {
    name: "Faaborg-Midtfyns Erhvervsråd",
    type: "Lokal forankring",
    logo: "/partners/erhvervsraad.png",
    description: "Aktiv i det lokale erhvervsliv og støtter udviklingen af området",
    link: null
  },
  {
    name: "Kloakmestrenes Kontrolinstans",
    type: "Kvalitetssikring",
    logo: "/partners/kontrolinstans.png",
    description: "Godkendt kvalitetsledelsessystem sikrer korrekt sagsbehandling",
    link: "https://kloakmestreneskontrolinstans.dk/"
  }
];

// Product partnerships
export const PARTNERS = [
  {
    name: "Nordisk Innovation (Rottespærrer)",
    logo: "/partners/rottestop.png",
    description: "Certificeret partner – alle monterede rottespærrer er kvalitets-testede",
    link: "https://rottestop.dk/#find"
  },
  {
    name: "Kessel (Højvandslukkere)",
    logo: "/partners/kessel.png",
    description: "Godkendt servicepartner for Kessel højvandslukkere",
    link: "https://www.lhi.dk/service/find-kessel-servicetekniker/"
  },
  {
    name: "UWS (Højvandslukkere)",
    logo: "/partners/uws.png",
    description: "Autoriseret installatør og service af UWS backflow-beskyttelse",
    link: "https://uws.dk/kloakmestre/"
  }
];

export const FAQ_GENERAL = siteContent.faq as any[];