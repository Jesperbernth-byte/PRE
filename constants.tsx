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
    image: '/pictures/omfangsdræn/omfangs-forside.jpg',
    title: 'Omfangsdræn',
    description: 'Permanent løsning mod fugt i kælder og fundament. Autoriseret installation af drænsystem efter SBi-anvisning 224 – vi beskytter dit hus i generationer.',
    longDescription: `Fugt i kælderen er ikke bare ubehageligt – det truer hele byggeriets levetid og kan over tid føre til skimmelsvamp, råd i bjælker og alvorlige strukturelle skader på fundamentet. Et omfangsdræn er den mest effektive og langsigtede løsning mod vandindtrængning, og det er en investering der typisk betaler sig mange gange igen.

Hvad er et omfangsdræn?

Et omfangsdræn er et drænsystem der graves ned langs husets fundament og leder overskydende grundvand og regnvand væk fra bygningen. Systemet består af et perforeret drænrør (typisk 100 mm PVC), omgivet af drænende singels eller grus, og en kapillarbrydende membran der beskytter fundamentet mod direkte vandkontakt. Vandet ledes via drænrøret til en brønd eller videre til kommunal kloak, grøft eller faskine.

Hvornår har du brug for omfangsdræn?

Mange fynske boliger fra 1950'erne, 60'erne og 70'erne er aldrig blevet forsynet med korrekt dræning – og det kan mærkes med årene. Tegn på at du bør overveje omfangsdræn: Fugtpletter eller hvidt kalkudslag (udblomstring) på kælderens indvendige vægge. Mosgroede eller fugtige sokkelsten. Synlige revner i fundamentet. Muglugt eller muskelduft i kælder eller krybekælder. Kondensproblemer på gulve og vægge i den kolde årstid. Vandpyller i haven nær huset der ikke forsvinder hurtigt efter regn. Uisolerede kælderrum der er kolde og fugtige hele året.

Processen – hvad sker der trin for trin

Vi starter altid med en gratis besigtigelse, hvor vi vurderer dit hus' drænbehov, jordbundsforhold og det eksisterende afledningssystem. Herefter modtager du et fast tilbud uden overraskelser. Selve installationen foregår i disse trin: Udgravning langs fundament med minigraver – skånsomt og præcist selv på trange grunde. Rensning og inspektion af fundamentets yderside. Montering af kapillarbrydende drænmembran direkte mod fundamentsvæggen. Udlægning af drænrør i sandbund med korrekt fald mod udløbet (minimum 5 ‰). Omfyldning med drænende singels eller grus. Retablering af belægninger, græs og beplantning.

Kvalitetsmaterialer og faglig standard

Vi installerer efter SBi-anvisning 224 (Fugt i bygninger) og de gældende faglige standarder for dræning ved fundament. Det betyder korrekt dimensionering af rørdiameter, sikring af minimumsfald på alle strækninger og valg af materialer der er godkendt til formålet. Vi bruger membran og drænrør fra anerkendte leverandører og sikrer korrekt tilslutning til afledningssystemet – uanset om det er regnvandskloak, grøft eller faskine.

Omfangsdræn på Fyn – vores arbejdsområde

Som lokal virksomhed med base i Broby arbejder vi primært på Fyn og i Trekantsområdet. Vi kender de lokale jordbundsforhold og de typiske udfordringer i fynske boliger. Vi har etableret omfangsdræn i Odense, Svendborg, Nyborg, Faaborg, Ringe, Assens, Middelfart, Kerteminde, Langeland og mange andre fynske kommuner – og vi rykker hurtigt ud når behovet er akut.

Dokumentation, garanti og forsikring

Som autoriseret kloakmestervirksomhed udsteder vi fuld dokumentation for arbejdet i overensstemmelse med gældende lovkrav. Vi giver 5 års garanti på vores arbejde og benytter DM&E Kloakmestergarantien, der giver dig ekstra tryghed som forbruger. Et korrekt udført omfangsdræn holder typisk 50+ år uden vedligeholdelse. Mange forsikringsselskaber stiller desuden krav om dokumenteret drænløsning ved fugtskadesager – vi udsteder den nødvendige dokumentation og vejleder dig om hvad der gælder for din situation.`,
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad er forskellen på omfangsdræn og indvendigt dræn?', answer: 'Et omfangsdræn graves ned udvendigt langs fundamentet og leder vandet væk fra huset, inden det trænger ind. Det er den foretrukne og mest effektive løsning. Indvendigt dræn (f.eks. i kælderen) opsamler derimod vand der allerede er kommet ind – det løser ikke den underliggende årsag. Vi anbefaler altid udvendigt omfangsdræn som første valg.' },
      { question: 'Hvordan ved jeg om jeg har brug for omfangsdræn?', answer: 'De tydeligste tegn er fugtpletter eller kalkudslag på kælderens vægge, muglugt i kælder eller krybekælder, mosgroede sokkelsten, revner i fundamentet, eller vandpyller ved huset efter regn. Vi kommer gerne ud til gratis besigtigelse og giver en faglig vurdering af dit behov.' },
      { question: 'Hvor meget af huset skal have omfangsdræn?', answer: 'Det afhænger af problemets omfang og terrænets hældning. Ofte er det nok at dræne på de sider af huset der vender mod terrænet eller er mest udsat for vand. I andre tilfælde anbefaler vi at dræne alle fire sider. Vi vurderer det konkret ved besigtigelse og anbefaler kun det der er nødvendigt.' },
      { question: 'Skal jeg have tilladelse fra kommunen?', answer: 'Normalt kræves ingen tilladelse til omfangsdræn på egen grund. Hvis drænvandet ledes til kommunal kloak eller ud over skel, kan der kræves en tilladelse. Vi undersøger reglerne for din adresse og håndterer alle nødvendige anmeldelser.' },
      { question: 'Hvor lang tid tager installationen?', answer: 'Et typisk omfangsdræn på et parcelhus tager 2-4 dage inkl. retablering. Større projekter eller komplekse jordbundsforhold kan tage længere tid. Vi oplyser altid den forventede tid i tilbuddet.' },
      { question: 'Hvor længe holder et omfangsdræn?', answer: 'Et professionelt udført omfangsdræn med kvalitetsmaterialer holder 50+ år. Den eneste vedligeholdelse der kan være relevant, er jævnlig rensning af inspektionsbrønden for at sikre frit gennemløb. Vi rådgiver om dette ved aflevering af arbejdet.' },
      { question: 'Hvad koster et omfangsdræn?', answer: 'Prisen afhænger af husets størrelse, jordbundsforhold, adgangsforhold og hvor stor en del af huset der skal drænes. Vi tilbyder altid gratis besigtigelse og et fast tilbud herefter – ingen timeafregning og ingen skjulte omkostninger.' }
    ]
  },
  {
    id: '2',
    slug: 'kloakarbejde',
    image: '/pictures/Kloak arbejde/20220202_092520.jpg',
    title: 'Kloakseparering & Renovering',
    description: 'Lovpligtig opdeling af regn- og spildevand. Som autoriseret kloakmester klarer vi hele processen – fra myndighedsansøgning til færdigmelding.',
    longDescription: `Kloakseparering er en af de største kloakopgaver en boligejer kan stå over for – men også en af de vigtigste. Når regn- og spildevand løber i samme rør, bliver kommunens kloaksystem hurtigt overbelastet ved kraftig regn, og resultatet er overløb af urenset spildevand til vandløb, søer og kystområder. Med separering ledes regnvand ud i naturen eller via regnvandskloak, mens spildevandet føres videre til renseanlæg. Det giver renere vandmiljø, færre oversvømmelser og en kloak der er rustet til fremtidens klima.

Hvorfor skal vi separere kloak?

Det danske kloaksystem blev mange steder etableret som ét fælles rør (fællessystem) i 1950'erne, 60'erne og 70'erne. Dengang var regnmængderne mindre, og overløb ved skybrud blev accepteret som en nødløsning. I dag er klimaet markant ændret: skybrud er hyppigere, regnen er kraftigere, og kommunens fælleskloak kan ikke længere følge med. Når kloakken løber over, sker tre ting på én gang. For det første sker der miljøforurening: urenset toiletvand og spildevand fra køkkener løber direkte ud i åer og fjorde. For det andet får boligejere oversvømmelser i kælder og have, fordi vandet stiger op gennem afløbene. For det tredje belastes kommunens renseanlæg unødigt med fortyndet spildevand der koster ekstra energi at rense.

Ved at separere ledningerne ledes regnvand fra tag og indkørsel direkte til regnvandskloak, faskine eller LAR-løsning – mens spildevand fra toilet, bad og køkken føres uændret til renseanlæg. Resultatet er et stabilt kloaksystem, et renere vandmiljø og en boligejer der ikke længere skal frygte næste skybrud.

Lovkrav og kommunale påbud på Fyn

Mange fynske kommuner – herunder Faaborg-Midtfyn, Assens, Odense, Svendborg, Nyborg og Middelfart – udsender løbende påbud om separering til specifikke områder, hvor det fælles kloaksystem skal opdeles. Når du modtager et påbud, har du typisk en frist på 1-2 år til at få separeret på egen grund. Sker det ikke, kan kommunen pålægge dagbøder. Derudover kan du blive nægtet byggetilladelse til tilbygninger eller fremtidige renoveringer, indtil separeringen er udført. Ved hussalg vil et manglende påbud også kunne påvirke prisen og tilliden til ejendommen.

Vi kender de lokale kommuners specifikke krav, ansøgningsskemaer og dokumentationskrav, og vi sørger for at hele processen lever op til både teknisk standard og kommunal sagsbehandling.

Sådan foregår en kloakseparering trin for trin

En typisk kloakseparering på et parcelhus tager 3-7 arbejdsdage. Vi starter altid med en gratis besigtigelse, hvor vi gennemgår eksisterende kloakplaner, kontrollerer fald og dimensionering, og lokaliserer alle tagnedløb, brønde og afløb. Derefter udarbejder vi en samlet projektløsning og ansøger på dine vegne hos kommunen.

Selve arbejdet foregår i disse trin: opgravning langs eksisterende kloak med minigraver eller gravemaskine. Sløjfning af gamle fællesledninger og installation af nye separate ledninger til regnvand og spildevand. Etablering af nødvendige inspektionsbrønde og rensebrønde i godkendte materialer. Tilslutning af tagnedløb til regnvandsledning eller faskine. Korrekt fald (minimum 20 ‰ for spildevand, 5 ‰ for regnvand) og rette dimensionering af alle rør. TV-inspektion af det færdige system som dokumentation. Færdigmelding og indberetning til kommunens BBR-register.

Renovering af gamle, utætte kloakker

Mange ældre fynske ejendomme har kloakker der er utætte, gennemgroede med rødder eller har sammensunkne ledninger. Vi renoverer både små og store strækninger – med opgravning eller, hvor det er muligt, med strømpeforing (no-dig). En tæt kloak forhindrer rotteindtrængning, beskytter grundvandet mod forurening og sikrer at spildevandet rent faktisk kommer frem til renseanlægget. Vi anbefaler altid TV-inspektion før renovering, så vi kan målrette indsatsen og undgå unødvendig opgravning.

Dokumentation, garanti og forsikring

Som autoriseret kloakmestervirksomhed udsteder vi fuld dokumentation for alt udført arbejde – inkl. KS-rapport, TV-inspektion og færdigmelding. Vi giver 5 års garanti på vores arbejde og benytter DM&E Kloakmestergarantien. Korrekt udført separering holder typisk 50+ år uden vedligeholdelse, og du har papir på det hele hvis kommunen, forsikringen eller en kommende køber spørger.`,
    icon: 'Hammer',
    faqs: [
      { question: 'Er jeg forpligtet til at separere kloak?', answer: 'Det afhænger af din kommune og om der er udstedt påbud for dit område. Mange fynske kommuner separerer i etaper, og når du modtager et påbud, har du typisk 1-2 år til at få det udført. Vi tjekker gerne din adresse og fortæller hvad der gælder for dig.' },
      { question: 'Hvorfor er det vigtigt at separere?', answer: 'Når regn- og spildevand løber i samme rør, bliver kloakken overbelastet ved kraftig regn, og urenset spildevand løber over til søer, åer og kystområder. Separering forhindrer miljøforurening, reducerer oversvømmelser og aflaster kommunens renseanlæg.' },
      { question: 'Hvad sker der hvis jeg ikke separerer?', answer: 'Du risikerer dagbøder fra kommunen og kan blive nægtet byggetilladelse til fremtidige projekter. Derudover stiger risikoen for oversvømmelse ved kraftig regn, og manglende separering kan påvirke ejendomsværdien ved salg.' },
      { question: 'Skal jeg selv søge tilladelse?', answer: 'Nej, vi håndterer alle ansøgninger og al kommunikation med kommunen. Du modtager kopi af ansøgning og godkendelse, og vi sørger også for færdigmelding og BBR-indberetning.' },
      { question: 'Hvor lang tid tager en separering?', answer: 'Typisk 3-7 arbejdsdage for et parcelhus, afhængig af grundens størrelse, placering af eksisterende ledninger og adgangsforhold. Vi oplyser altid forventet tidsplan i tilbuddet.' },
      { question: 'Kan I renovere uden at grave hele haven op?', answer: 'I mange tilfælde kan vi anvende strømpeforing (no-dig), hvor vi renoverer eksisterende rør indefra uden større opgravning. Vi vurderer det altid konkret efter TV-inspektion.' },
      { question: 'Får jeg dokumentation jeg kan vise til forsikring og kommune?', answer: 'Ja, du får KS-rapport, TV-inspektion af det færdige arbejde, færdigmelding til kommunen og BBR-indberetning. Alt sammen som autoriseret kloakmestervirksomhed under DM&E Kloakmestergarantien.' }
    ]
  },
  {
    id: '3',
    slug: 'rottespaerre',
    image: '/pictures/Rottespærre/Messenger_creation_059DEB20-52BD-4B5C-94F2-4EF3D65CD87B.jpeg',
    title: 'Rottespærre',
    description: 'Giftfri og mekanisk rottesikring i kloakken. Vi monterer kun certificerede rottespærrer fra Nordisk Innovation – patenteret dansk kvalitet.',
    longDescription: `Rotter i kloaksystemet er et stigende problem i hele Danmark – og særligt på Fyn, hvor mange ældre kloaksystemer giver rotterne let adgang til boliger. En enkelt rotte kan svømme op gennem en kloakledning og ende i toilettet, og når først én rotte har fundet vejen, følger flere efter. Med en mekanisk rottespærre i din kloak kan du stoppe denne adgangsvej fysisk – uden brug af gift, kemi eller fælder.

Nordisk Innovation – patenteret dansk kvalitet

Vi installerer udelukkende rottespærrer fra Nordisk Innovation A/S, der er førende dansk producent af mekaniske rottespærrer. Produktet er udviklet, testet og produceret i Danmark, og det benyttes af kommuner, boligforeninger og kloakmestre i hele landet. Vi er certificerede montører og bruger Nordisk Innovations egne værktøjer og originaldele, så installationen lever op til producentens krav til funktion og garanti.

Sådan fungerer en rottespærre

Rottespærren er en mekanisk enhed der monteres direkte i kloakledningen. Den virker som et envejsspjæld: spildevand fra dit hus løber frit ud, men når en rotte forsøger at svømme den anden vej, lukker spjældet automatisk. Rotten kan ikke komme videre og må vende om. Systemet er helt mekanisk – der er ingen elektronik, ingen sensorer og intet der kræver strøm. Det betyder at det virker døgnet rundt, hele året, uden vedligeholdelse i den daglige drift.

Nordisk Innovation tilbyder rottespærrer i over 40 varianter, tilpasset forskellige rørdiametre og rørtyper. Det betyder at vi altid kan finde en rottespærre der passer præcist til dit kloaksystem – uanset om du har gamle betonrør, lerrør eller moderne plastrør.

Hvornår bør du overveje en rottespærre?

Der er flere situationer hvor en rottespærre er en god investering. Hvis du har set rotter i nærområdet, hørt skraben i afløbsrørene, eller fundet rotteekskrementer i kælder eller skure, er det et tydeligt signal om at rotter har adgang til din ejendom. Mange forsikringsselskaber afviser også at dække rotteskader, hvis du ikke har truffet rimelige forholdsregler – og en rottespærre er den mest effektive forholdsregel der findes mod kloakrotter. Endelig stiller flere fynske kommuner krav om rottespærre ved nybyggeri og ved større kloakrenoveringer, og kommunens rotteanmelder kan udstede påbud i områder med kendte rotteproblemer.

Installation på under en dag

Vi planlægger installationen ud fra dine eksisterende kloakforhold. I de fleste tilfælde monteres rottespærren i den hovedbrønd der ligger nærmest skellet, så hele ejendommen beskyttes med én enhed. Selve arbejdet foregår typisk på under en dag og består af: lokalisering af korrekt brønd, opmåling af rørdimension, valg af passende variant fra Nordisk Innovations sortiment, montering med originalværktøj, og funktionstest af spjældet. Du modtager dokumentation for installationen og en mærkat med oplysninger om producent, type og monteringsdato.

Årligt eftersyn anbefales

For at sikre at spjældet bevæger sig frit og ikke er blokeret af aflejringer, anbefaler producenten et årligt eftersyn. Vi tilbyder serviceaftaler hvor vi kontakter dig automatisk når det er tid til tjek – så slipper du for at huske det selv. Et eftersyn tager typisk 30-60 minutter pr. rottespærre.

Lovkrav, kommune og forsikring

Flere fynske kommuner – herunder områder i Faaborg-Midtfyn, Odense, Svendborg og Assens – indfører krav om rottespærre ved nybyggeri og kloakrenoveringer. Vi følger med i de lokale regler og rådgiver dig om hvad der gælder for din adresse. Hvis du har modtaget en henvendelse fra kommunens rotteanmelder, hjælper vi gerne med både inspektion, installation og dokumentation tilbage til kommunen.`,
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvordan virker en rottespærre?', answer: 'Rottespærren er et mekanisk envejsspjæld monteret i kloakledningen. Spildevand fra dit hus løber frit ud, men når en rotte forsøger at svømme ind, lukker spjældet automatisk. Det er en helt mekanisk løsning uden gift eller elektronik.' },
      { question: 'Kan rottespærren tilstoppe mit afløb?', answer: 'Nej. Nordisk Innovations rottespærrer er designet til at håndtere alt normalt kloakaffald uden at tilstoppe. De findes i over 40 varianter tilpasset forskellige rørdimensioner, så vi vælger altid den korrekte type til dit system. Et årligt eftersyn anbefales for at sikre optimal drift.' },
      { question: 'Er det lovpligtigt at have rottespærre?', answer: 'Det afhænger af kommune og byggeri. Flere fynske kommuner indfører krav om rottespærre ved nybyggeri og større kloakrenoveringer, og kommunens rotteanmelder kan udstede påbud i områder med dokumenterede rotteproblemer. Vi tjekker reglerne for din adresse.' },
      { question: 'Virker det virkelig – eller kommer rotterne bare en anden vej?', answer: 'Vejen gennem kloakken bliver fysisk lukket, og det er den vigtigste adgangsvej for rotter til boliger på Fyn. Rotter kan teoretisk komme ind via huller i fundamentet eller åbne riste, men disse veje er meget sjældnere brugt. Kloakken er deres motorvej – og den lukker vi.' },
      { question: 'Hvor lang tid holder en rottespærre?', answer: 'Ved korrekt installation og årligt eftersyn holder en Nordisk Innovation rottespærre i mange år. Materialet er rustfrit stål og polymer, dimensioneret til de hårde forhold i kloaksystemet. Serviceaftaler sikrer at spjældet bevæger sig frit gennem hele levetiden.' },
      { question: 'Bruger I gift eller fælder?', answer: 'Nej. Vi installerer udelukkende mekaniske rottespærrer. Det er en giftfri og dyrevenlig løsning der ikke påvirker miljø, husdyr eller børn. Gift bør altid være sidste udvej og udelukkende håndteres af autoriserede skadedyrsbekæmpere.' },
      { question: 'Hvad koster det at få monteret en rottespærre?', answer: 'Prisen afhænger af dit kloaksystem, antal brønde og hvilken variant der passer til dine rør. Vi kommer gerne ud og vurderer din situation uden beregning og giver dig en fast pris.' }
    ]
  },
  {
    id: '4',
    slug: 'hoejvandslukker',
    image: '/pictures/Højvandslukke/20211123_122121.jpg',
    title: 'Højvandslukker',
    description: 'Beskyt kælderen mod opstigende kloakvand. Vi installerer og servicerer højvandslukkere fra Kessel og UWS – godkendt og dokumenteret.',
    longDescription: `En højvandslukker er en af de vigtigste sikkerhedsforanstaltninger du kan have, hvis du bor i et område med fælleskloak, lavtliggende afløb eller kælder under niveau. Ved kraftig regn kan kommunens kloaksystem blive overbelastet, og kloakvandet presses tilbage gennem dine afløb. En højvandslukker stopper denne tilbagestrømning automatisk og forhindrer at urenset spildevand vælter ind i kælder, badeværelse eller bryggers.

Hvad er en højvandslukker, og hvornår har du brug for den?

Højvandslukkeren er et mekanisk eller automatisk spjæld der monteres i afløbsledninger under niveauet for opstuvning – typisk i en samlebrønd eller direkte i gulvafløb i kælder. Når kloakken bliver overbelastet, og vandet stiger, lukker spjældet automatisk og forhindrer vandet i at løbe op i ejendommen. Når kloakken igen har fri afledning, åbner spjældet, og afløbet fungerer normalt.

Du har især brug for en højvandslukker hvis: du har afløb i kælder eller stueetage under terrænet, du bor i et område med fælleskloak, du tidligere har haft oversvømmelse fra kloak ved skybrud, du har en kælder med vaskemaskine, bad eller toilet, eller hvis dit forsikringsselskab stiller krav om det. Ved skybrud i 2007, 2011 og 2014 oplevede mange danske boligejere store skader fra opstigende kloakvand, og siden har forsikringsbranchen strammet kravene markant.

Kessel og UWS – godkendte producenter

Vi er godkendte servicepartnere for både Kessel og UWS, der er to af markedets førende producenter inden for højvandsbeskyttelse. Begge mærker er CE-mærkede, lever op til EN 13564 og er anerkendt af forsikringsbranchen og kloakmestre i hele Danmark.

Kessel tilbyder både mekaniske og elektroniske løsninger med batteri-backup og alarm. UWS leverer robuste, vedligeholdelsesvenlige spjæld der er nemme at servicere. Vi vælger den løsning der passer bedst til dine behov og dit kloaksystem – og kan også servicere alle andre mærker, hvis du allerede har en højvandslukker installeret.

Sådan foregår installationen

Vi starter altid med en besigtigelse hvor vi vurderer dit kloaksystem, lokaliserer den optimale monteringsplacering og dimensionerer den rigtige model. Selve installationen indebærer: lokalisering af samlebrønd eller afløbsledning, opgravning eller tilpasning af eksisterende brønd, montering af højvandslukker med korrekte tætninger og ventiler, funktionstest og indregulering, samt instruktion i brug og eftersyn. Et typisk projekt tager 1-2 dage.

Service og årligt eftersyn er lovkrav

For at højvandslukkeren beskytter dig når der sker et skybrud, skal den være vedligeholdt. Bygningsreglementet og producenten foreskriver et årligt eftersyn, hvor spjældet rengøres, tætningerne kontrolleres og funktionen testes. Forsømt vedligeholdelse er en af de hyppigste årsager til at højvandslukkere fejler – og forsikringen kan afvise dækning hvis det viser sig at enheden ikke har været serviceret. Vi tilbyder serviceaftaler hvor vi kontakter dig automatisk og holder logbog over alle eftersyn.

Forsikring og dokumentation

Mange forsikringsselskaber stiller krav om højvandslukker for at dække skader fra opstigende kloakvand i risikoområder – og du skal kunne dokumentere både installation og løbende service. Vi udsteder fuld dokumentation, KS-rapport og servicelog, så du står stærkt over for forsikringen i tilfælde af skade.`,
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvad er forskellen på højvandslukker og rottespærre?', answer: 'Rottespærren forhindrer rotter i at komme ind gennem kloakken. Højvandslukkeren forhindrer kloakvand i at løbe tilbage og oversvømme kælderen ved overbelastning af kommunens kloak. De løser to forskellige problemer, og mange ejendomme har gavn af begge dele.' },
      { question: 'Skal en højvandslukker serviceres?', answer: 'Ja, mindst én gang årligt. Det er både producentens krav og en forsikringsmæssig forpligtelse. Vi tilbyder serviceaftaler hvor vi kontakter dig automatisk og dokumenterer hvert eftersyn i en logbog du kan vise til forsikring eller kommune.' },
      { question: 'Dækker forsikringen skader hvis jeg ikke har højvandslukker?', answer: 'I risikoområder – herunder mange fynske byområder med fælleskloak – afviser flere forsikringsselskaber dækning hvis der ikke er installeret højvandslukker. Tjek dine forsikringsbetingelser, og kontakt os hvis du er i tvivl om kravene.' },
      { question: 'Hvilke mærker arbejder I med?', answer: 'Vi er godkendte servicepartnere for både Kessel og UWS – to af markedets førende producenter. Vi installerer nye anlæg og servicerer også andre mærker, hvis du allerede har en højvandslukker.' },
      { question: 'Kan jeg installere en højvandslukker selv?', answer: 'Nej. Højvandslukkere er en del af kloakanlægget og skal installeres af en autoriseret kloakmester for at være lovlig og dækket af forsikringen. Vi sørger for korrekt installation og dokumentation.' },
      { question: 'Hvor placeres højvandslukkeren?', answer: 'Som hovedregel i en samlebrønd uden for huset eller direkte på den ledning der betjener kælderafløbene. Vi vurderer altid placeringen konkret ud fra dit kloaksystem, så kun de rette afløb beskyttes – og resten af kloakken kan løbe frit.' }
    ]
  },
  {
    id: '5',
    slug: 'tv-inspektion',
    image: '/pictures/Tv-inspektion/20260126_101025.jpg',
    title: 'TV-Inspektion & Fejlsøgning',
    description: 'Inspektion af kloakledninger med kloakkamera. Du får en detaljeret rapport der lever op til krav fra fx forsikringsselskaber, kommune og købere.',
    longDescription: `TV-inspektion af kloak er den hurtigste, billigste og mest skånsomme måde at finde ud af, hvad der reelt foregår i dine afløbsrør. I stedet for at grave på må og få, sender vi et kloakkamera ind i ledningen og ser direkte hvad der er galt – brud, rodindtrængning, sammenstyrtninger, fedtaflejringer eller fejlmonterede tilslutninger. Du får en detaljeret rapport med billeder, video og en præcis lokalisering af skadens placering, der lever op til krav fra fx forsikringsselskaber, kommune og ejendomsmægler.

Hvornår er TV-inspektion en god idé?

Der er mange situationer hvor en TV-inspektion er det rette første skridt. Ved gentagne stop i kloakken giver inspektionen et billede af hvor blokeringen reelt sidder, og hvad årsagen er. Ved mistanke om brud eller rodindtrængning kan vi se rødderne der vokser ind i samlinger, eller revner hvor jord siver ind. Ved køb eller salg af hus er en kloakinspektion en standardundersøgelse hvis ejendommen er over 30 år gammel – og oftest et krav fra køberens advokat eller bank. Før du sætter en større renovering eller tilbygning i gang, sikrer en inspektion at den eksisterende kloak kan klare den nye belastning. Forsikringsselskaber kræver ofte TV-inspektion som dokumentation før de vil dække en kloakskade, og kommunen kan stille krav om dokumentation ved separering eller renovering.

Vores udstyr og rapportformat

Vi bruger professionelt kloakkamera-udstyr med selvkørende kameravogn, der kan tage sig op gennem rør fra Ø100 mm og opefter. Kameraet har integreret afstandsmåler, så vi præcist kan angive hvor i ledningen en skade befinder sig. Når vi finder en skade, registrerer vi: skadens type (brud, revne, deformation, rodindtrængning, fedtaflejring, sammenfald), skadens nøjagtige placering målt fra inspektionsbrønden, billeder og videoklip af skaden, samt en faglig vurdering af om det skal udbedres akut, planlagt eller blot overvåges.

Du modtager rapporten elektronisk – med video og billeder – og du kan dele den direkte med forsikring, kommune eller køber. Rapporten lever op til de krav som forsikringsselskaber typisk stiller ved sagsbehandling, og er et solidt grundlag for både tilbud og udbedring.

Sådan foregår en inspektion

Selve inspektionen tager typisk 1-3 timer afhængigt af kloakkens omfang. Vi starter ved en eksisterende inspektionsbrønd og kører kameraet ind i ledningen. Hvis kloakken er tilstoppet, spuler vi den fri inden vi starter inspektionen, så vi kan se klart. Vi inspicerer i begge retninger fra hver brønd, så hele systemet bliver dækket. Efter inspektionen gennemgår vi resultatet med dig på stedet, og du får den fulde rapport tilsendt typisk samme eller næste dag.

TV-inspektion ved hussalg

Står du over for et hussalg eller boligkøb på Fyn? En forudgående TV-inspektion kan både give dig et stærkere salgsargument (du dokumenterer at kloakken er i orden) og beskytte mod ubehagelige overraskelser efter overtagelsen. Vi tilbyder hurtig udrykning – ofte inden for få dage – og leverer en rapport der er klar til at indgå i salgsmaterialet.

Tilbud, dokumentation og forsikring

Vi giver fast pris på TV-inspektion efter besigtigelse, og du betaler kun for det udførte arbejde. Hvis vi opdager skader, kan vi give dig et samlet tilbud på udbedring – men der er ingen forpligtelse, og du kan altid bruge rapporten til at indhente andre tilbud. Som autoriseret kloakmestervirksomhed under DM&E Kloakmestergarantien står vi inde for både inspektion og udførelse.`,
    icon: 'Camera',
    faqs: [
      { question: 'Hvornår skal jeg have lavet TV-inspektion?', answer: 'Ved gentagne stop i kloakken, mistanke om brud eller rodindtrængning, ved køb eller salg af hus (særligt hvis ejendommen er over 30 år), eller hvis du planlægger større renoveringer eller tilbygninger. Forsikringen kræver ofte TV-inspektion som dokumentation ved skadesager.' },
      { question: 'Hvor langt kan kameraet køre?', answer: 'Vores udstyr kan inspicere op til 100 meter ledning i ét stræk. Ved længere systemer kombinerer vi med inspektion fra flere brønde, så hele kloaksystemet bliver dækket.' },
      { question: 'Får jeg dokumentation?', answer: 'Ja, du modtager en komplet rapport med video, billeder og præcis afstandsmåling af eventuelle skader. Rapporten lever op til de krav som forsikringsselskaber, kommune og ejendomsmæglere typisk stiller ved sagsbehandling.' },
      { question: 'Skal kloakken være ren før inspektion?', answer: 'Ikke nødvendigvis. Hvis kloakken er tilstoppet eller fuld af sand og fedt, spuler vi den fri inden inspektionen, så vi får et klart billede. Det kan vi tage med i samme besøg.' },
      { question: 'Kan I se forskel på en gammel revne og en ny skade?', answer: 'Ja. Vi vurderer både skadens type, alder og udvikling – fx om der er aktiv jordindtrængning, friske rødder eller stabiliserede aflejringer. Det er vigtigt for både forsikringsbehandling og prioritering af udbedring.' },
      { question: 'Hvad koster en TV-inspektion?', answer: 'Prisen afhænger af kloakkens længde, antal brønde og om der skal spules først. Vi giver altid fast pris efter en kort indledende vurdering – ingen timeafregning og ingen skjulte gebyrer.' }
    ]
  },
  {
    id: '6',
    slug: 'lar-anlaeg',
    image: '/pictures/Separering/20220520_085810.jpg',
    title: 'LAR-Anlæg (Lokal Afledning af Regnvand)',
    description: 'Miljøvenlig håndtering af regnvand på egen grund med faskiner, regnbede og nedsivning. Reducerer kloakbelastning og kan give kommunalt tilskud.',
    longDescription: `LAR står for Lokal Afledning af Regnvand og dækker over alle de tekniske løsninger, hvor regnvand fra tag og befæstede arealer håndteres lokalt på grunden i stedet for at blive ledt til kloakken. Det kan være faskiner, regnbede, nedsivningsanlæg, regnvandsbede, permeable belægninger eller åbne grøfter. LAR er en miljøvenlig og fremtidssikker måde at håndtere regnvand på – og bliver i stigende grad et lovkrav ved nybyggeri og større renoveringer på Fyn.

Hvorfor er LAR-anlæg vigtige?

Klimaet ændrer sig, og skybruddene bliver hyppigere og kraftigere. De gamle kloaksystemer er ikke dimensioneret til de regnmængder vi ser i dag, og resultatet er overløb af kloakvand til vandmiljøet og oversvømmelser i lavtliggende byområder. Når regnvand håndteres lokalt på grunden, opnår man flere fordele på én gang: kommunens kloak aflastes, grundvandet får tilført rent regnvand, lokale vandløb og søer beskyttes mod overløb af kloakvand, og boligejeren kan få reduceret tilslutningsbidrag og kloakafgift hos forsyningsselskabet.

LAR er tæt forbundet med kloakseparering – ofte er separering det første skridt, og LAR-løsningen er det andet skridt, hvor regnvandet håndteres på grunden i stedet for at blive ledt videre til regnvandskloak. Vi vurderer altid om en samlet løsning, hvor separering og LAR udføres sammen, er den rigtige strategi for din ejendom.

Forskellige LAR-løsninger

Vi etablerer flere typer LAR-anlæg afhængigt af grundens jordbund, plads og terrænforhold:

Faskine: En underjordisk grav fyldt med drænende materiale eller præfabrikerede plastkassetter, hvor regnvand opmagasineres og langsomt nedsiver til den omgivende jord. Egnet til lerede og sandede jorder med passende nedsivningsevne. Tager kun lidt plads i overfladen, så græsplænen og haven kan bruges normalt.

Regnbed og nedsivningsbed: En lavtliggende beplantet zone, hvor regnvand opsamles, forsinkes og nedsiver. Kan integreres som en smuk del af haven og giver biodiversitet og levesteder for insekter og fugle.

Permeable belægninger: Belægningssten, grus eller græsarmering der lader regnvand sive direkte ned i underlaget i stedet for at lede det til kloak. Egnet til indkørsler, terrasser og parkeringsarealer.

Åbne grøfter og vandrender: Synlige forsinkende elementer der både fungerer praktisk og som æstetisk indslag i haven.

Udvendigt LAR-system: Større anlæg med kombination af bassin, faskine og overløb til vandløb eller kloak. Egnet til større ejendomme, virksomheder eller fællesarealer.

Sådan starter vi en LAR-opgave

Vi starter med en gratis besigtigelse, hvor vi vurderer din grunds jordbundsforhold (især nedsivningsevne), tagets areal, eksisterende afløb og terrænforhold. På baggrund af dette giver vi en faglig anbefaling om hvilken løsning der passer bedst, og vi laver en simpel beregning af nødvendig kapacitet ud fra danske dimensioneringskrav. Hvis du modtager LAR-tilskud fra kommunen, hjælper vi med ansøgning og dokumentation.

Selve etableringen tager typisk 2-5 dage afhængigt af løsningens omfang. Vi sløjfer eksisterende tilslutninger til regnvandskloak, etablerer det nye anlæg, tilslutter tagnedløb og lægger overløbsledning til kloak eller vandløb som backup. Alt arbejdet udføres som autoriseret kloakmester med fuld dokumentation.

Tilskud og økonomisk gevinst

Mange fynske kommuner og forsyningsselskaber tilbyder tilskud, hvis du frakobler regnvand fra kloakken og håndterer det lokalt. Tilskuddet kan dække en betydelig del af etableringsomkostningerne, og samtidig sparer du tilslutningsbidrag og fremtidig kloakafgift på regnvand. På sigt giver et velplaceret LAR-anlæg ofte både en miljøgevinst og en økonomisk gevinst – og en pænere have med flere muligheder for beplantning og biodiversitet.`,
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad er fordelene ved LAR-anlæg?', answer: 'Aflastning af kommunens kloak, reduceret kloakafgift, mulighed for kommunalt tilskud, mindre risiko for oversvømmelse, og en grøn og biodiversitetsfremmende have. LAR er ofte et lovkrav ved nybyggeri eller større renoveringer.' },
      { question: 'Hvor meget plads kræver et LAR-anlæg?', answer: 'Det afhænger af tagets areal og grundens jordbund. En typisk faskine til et parcelhus kræver 5-15 m² i underjordisk plads – overfladen kan bruges som græs eller bed. Regnbede kræver 15-30 m² synlig plads, men kan integreres smukt i haven.' },
      { question: 'Kan alle grundejere få LAR-anlæg?', answer: 'Nej. Det kræver tilstrækkelig nedsivningskapacitet i jorden, plads og at terrænet er egnet. Vi laver en gratis vurdering med simpel nedsivningsprøve og fortæller om det er muligt – og hvilken løsning der passer bedst.' },
      { question: 'Giver kommunen tilskud?', answer: 'Mange fynske kommuner og forsyningsselskaber har tilskudsordninger til LAR og frakobling af regnvand fra kloak. Beløb og betingelser varierer – vi kender de lokale ordninger og hjælper med ansøgningen.' },
      { question: 'Skal jeg lave både separering og LAR?', answer: 'Ofte ja. Separering deler dine ledninger i regnvand og spildevand, og LAR håndterer regnvandet lokalt i stedet for at lede det til regnvandskloak. Vi anbefaler altid en samlet plan, så du kun skal grave op én gang.' },
      { question: 'Hvor lang tid holder en faskine?', answer: 'En korrekt dimensioneret og udført faskine holder 25-50 år. Regelmæssig rengøring af tagrender og sandfangsbrønd forhindrer at faskinen tilstopper med blade og sand.' }
    ]
  },
  {
    id: '8',
    slug: 'entreprenoer-arbejde',
    image: '/pictures/Anlægsarbejde/20211007_173659.jpg',
    title: 'Entreprenørarbejde & Jordflytning',
    description: 'Fra udgravning og jordflytning til terrænregulering og anlæg. Vi har maskinerne og erfaringen til at løse din opgave effektivt og fagligt korrekt.',
    longDescription: `Entreprenørarbejde og jordflytning er rygraden i de fleste anlægsopgaver – uanset om du skal have en ny indkørsel, udgravet til fundament, jævnet en grund eller flyttet store mængder jord i forbindelse med byggeri. Hos PR Entreprenøren har vi en moderne maskinpark og årtiers praktisk erfaring fra både private projekter og større erhvervsopgaver på Fyn og i Trekantsområdet.

Hvad er jordflytning, og hvornår skal du anmelde det?

Jordflytning er den faglige betegnelse for transport af jord fra ét sted til et andet – typisk i forbindelse med udgravning, terrænregulering eller bortskaffelse af overskudsjord. På visse områder – særligt i byzoner og områder kortlagt som muligt forurenede – skal flytning af jord anmeldes til kommunen, og der skal udtages jordprøver for at dokumentere jordkvaliteten. Vi kender reglerne for anmeldepligtig jordflytning og hjælper dig hele vejen igennem: anmeldelse, prøvetagning, dokumentation, transport og bortskaffelse på godkendt modtageanlæg. Du skal ikke selv stå med papirerne – vi tager det.

Hvilke opgaver løser vi?

Vi løser et bredt udsnit af entreprenør- og jordopgaver, herunder:

Udgravning til fundament, kælder, garage, carport eller tilbygning. Vi graver til den korrekte dybde og dimensionering ud fra konstruktionstegninger, og afleverer en plan, ren og frostfri bund klar til støbning.

Terrænregulering: Hævning, sænkning eller udjævning af grunde til byggemodning, haveanlæg eller landbrugsmæssige formål. Vi bruger landmålerudstyr og GPS hvor det giver mening, så terrænet bliver præcist niveau.

Indkørsler og pladser: Opbygning af stabilt underlag, etablering af afløb og forberedelse til belægning, asfalt eller stenmel. Holdbare løsninger der står i mange år.

Jordflytning og transport: Bortskaffelse af overskudsjord, levering af muldjord, fyldjord eller stabilgrus, og samarbejde med godkendte modtageanlæg.

Rydning af byggegrunde: Fjernelse af gammel beplantning, beton, fliser, fundamentrester og affald. Klargøring af grunden til nye projekter.

Komprimering: Korrekt komprimering af underlag med tromle eller stamper, så fremtidige sætninger og revner undgås.

Nedrivning af belægning: Opbrydning af gammel asfalt, beton eller fliser, samt sortering og bortskaffelse af materialerne.

Maskinpark og kapacitet

Vi råder over en bred maskinpark – fra mini-bæltegravere til projekter på trange grunde, til større gravemaskiner og lastvogne til store volumener. Det betyder at vi kan løse både den lille have-opgave og det store anlægsprojekt med samme entreprenør, og vi kan tilpasse maskinvalget til de aktuelle adgangsforhold.

Samarbejde med andre faggrupper

Mange entreprenørprojekter går på tværs af fag, og vi har tætte samarbejder med murere, tømrere, betonsjak, landmålere, asfaltfirmaer og elinstallatører. Det betyder at vi kan koordinere et samlet projekt, så du kun skal have én kontakt – og at de forskellige faser passer ind i hinanden uden ventetid og forsinkelser.

Akut udrykning og fast pris

Ved akutte opgaver – fx vandskade, sammensunken indkørsel eller pludselig blokering – rykker vi typisk ud samme eller næste dag. Ved planlagte projekter giver vi fast pris efter besigtigelse, og du har papir på det hele inden vi går i gang. Som autoriseret kloakmestervirksomhed dækker vi også de kloak- og dræntekniske dele af projektet, hvis det er en del af opgaven.`,
    icon: 'Hammer',
    faqs: [
      { question: 'Hvilke entreprenøropgaver løser I?', answer: 'Udgravning til fundamenter, indkørsler, terrænregulering, jordflytning, nedrivning af belægning, komprimering af underlag, rydning af byggegrunde og koordinerede totalprojekter sammen med andre håndværkere.' },
      { question: 'Skal jordflytning anmeldes til kommunen?', answer: 'Det afhænger af området. I byzoner og i områder kortlagt som muligt forurenede, skal jordflytning anmeldes og prøvetagning udføres. Vi kender reglerne og håndterer hele anmeldeprocessen for dig.' },
      { question: 'Hvor hurtigt kan I rykke ud?', answer: 'Akutte opgaver løser vi ofte samme eller næste dag. Planlagte projekter koordineres efter din tidsplan og evt. andre håndværkere på sagen.' },
      { question: 'Samarbejder I med andre håndværkere?', answer: 'Ja, vi samarbejder ofte med murere, tømrere, betonsjak, asfaltfirmaer, landmålere og elinstallatører om samlede totalløsninger – så du kun har én kontakt på projektet.' },
      { question: 'Køber I overskudsjord, eller skal jeg selv betale for bortskaffelse?', answer: 'Overskudsjord skal typisk bortskaffes på godkendt modtageanlæg, og prisen afhænger af jordens kvalitet og forureningsgrad. Vi inkluderer altid bortskaffelse i tilbuddet, så du kender prisen op front.' },
      { question: 'Kan I levere fyldjord eller muldjord?', answer: 'Ja, vi leverer både muldjord, fyldjord og stabilgrus til både private og erhverv. Kontakt os for et tilbud på levering af den rigtige type til dit projekt.' }
    ]
  },
  {
    id: '9',
    slug: 'naturpleje',
    image: '/pictures/Oprensning af sø/20260119_112241.jpg',
    title: 'Naturpleje & Genopretning',
    description: 'Genslyngning af vandløb, grødeskæring, oprensning af søer og overfladebassiner. Vandløbsnær naturpleje udført med langarmet gravemaskine.',
    longDescription: `Naturpleje og genopretning handler om at give vandløb, søer, vådområder og overfladebassiner tilbage deres naturlige funktion og biodiversitet. Det er en specialdisciplin der kræver maskiner med rækkevidde, faglig viden om vandløbsregulativer og respekt for både flora, fauna og lodsejere langs vandløbet. Hos PR Entreprenøren er Preben en erfaren vandløbsentreprenør, og vi løser opgaver for både kommuner, lodsejere, ålauget, vandløbslaug og private grundejere på Fyn og i Trekantsområdet.

Genslyngning af vandløb

Mange danske vandløb blev i 1900-tallet rettet ud og uddybet for at gøre plads til landbrug og afvanding. Det gav mere markareal, men også dårligere vandkvalitet, færre fisk og mindre biodiversitet. Genslyngning er processen, hvor vandløbet føres tilbage til – eller tæt på – sit oprindelige slyngede forløb. Det giver lavere vandhastighed, bedre iltforhold, naturlige standpladser for fisk og insekter, og det reducerer ofte risikoen for oversvømmelse længere nedstrøms. Vi udfører genslyngninger i samarbejde med kommuner, vandråd og lodsejere, og vi følger altid det godkendte projekt og vandløbsregulativet.

Grødeskæring

Grødeskæring er den årlige eller halvårlige beskæring af vandplanter (grøde) i åer og vandløb, så vandet kan løbe frit og afvandingsfunktionen opretholdes. Tidspunkt og metode er reguleret i vandløbsregulativet, og hver kommune har sine egne krav til hvor meget grøde der må fjernes, hvor brede strømrender der skal efterlades, og hvilke perioder der må arbejdes i. Vi udfører grødeskæring med specialudstyr fra vandløbsbredden eller fra båd, og vi sørger altid for at efterlade tilstrækkelig grøde til at vandløbets økologi bevares.

Oprensning af søer og overfladebassiner

Med tiden samler søer, gadekær, regnvandsbassiner og overfladebassiner sediment, blade, alger og slam. Det reducerer kapaciteten, kvæler vandlivet og giver dårlig vandkvalitet med risiko for lugt og iltsvind. En oprensning genskaber dybden, fjerner det iltforbrugende slam og giver søen et nyt liv. Vi oprenser med langarmet gravemaskine direkte fra bredden – typisk uden behov for at sænke vandstanden – og vi sorterer det opgravede materiale, så vi kan disponere det korrekt: enten som muldjord, til deponering eller som biomasse.

Etablering og oprensning af regnvandsbassiner

Regnvandsbassiner er en stadig vigtigere del af klimatilpasning og spildevandsrensning. Vi etablerer nye bassiner som del af LAR- og separeringsprojekter og oprenser eksisterende bassiner, der har mistet kapacitet. Korrekt oprensning sikrer at bassinet kan optage regnvand under skybrud og fortsat fungere som naturligt rensningstrin før vandet ledes til vandløb eller faskine.

Langarmet gravemaskine – vores arbejdshest

Til vandløbs- og søarbejde bruger vi langarmet gravemaskine med rækkevidde op til 15-18 meter. Det betyder at vi kan arbejde fra fast grund i stor afstand fra vandet uden at presse maskiner ud i bløde brinker eller værdifulde naturarealer. Den lange arm giver præcision i selve oprensningen og minimal påvirkning af de omkringliggende arealer. Vi har også specialudstyr til grødeskæring (grødeskærebåd og kniv), så vi kan vælge den rigtige metode til opgaven.

Lodsejerkoordinering og myndighedstilladelser

Arbejde langs vandløb og søer kræver typisk dialog med flere lodsejere, godkendelse fra kommunen og overholdelse af vandløbsregulativet. Vi har erfaring med koordineringen og hjælper gerne med ansøgninger, lodsejerorientering og fagligt input til projekteringen. Vi arbejder efter godkendt projekt og dokumenterer udført arbejde med før- og efterbilleder, GPS-track og udtræksdokumentation hvor det kræves.

Hvem er kunderne?

Vi udfører naturpleje for kommuner (vandløbsforvaltning, vej og park), vandløbslaug og ålaug, dige- og pumpelaug, lodsejere langs vandløb, naturplejeforeninger og private grundejere med søer og bassiner på grunden. Vi har faste samarbejder med flere fynske kommuner og er vant til at arbejde efter offentlige udbud og rammeaftaler.`,
    icon: 'Hammer',
    faqs: [
      { question: 'Hvilke naturplejearbejder udfører I?', answer: 'Genslyngning af vandløb, grødeskæring, oprensning af søer og overfladebassiner, etablering og vedligehold af regnvandsbassiner samt vandløbsnær naturpleje for både offentlige og private kunder.' },
      { question: 'Bruger I langarmet gravemaskine?', answer: 'Ja. Vi anvender langarmet gravemaskine med rækkevidde op til 15-18 meter, så vi kan arbejde fra fast grund og skåne brinker, naturværdier og blødbund i de omkringliggende arealer.' },
      { question: 'Skal jeg have tilladelse for at oprense min sø?', answer: 'Det afhænger af søens størrelse og placering. For søer over en vis størrelse, søer i naturbeskyttelseszoner eller søer med tilløb til vandløb kræves oftest kommunal tilladelse. Vi vejleder om reglerne og hjælper med ansøgning.' },
      { question: 'Hvornår er den rigtige tid at oprense en sø?', answer: 'Oprensning udføres typisk i sensommer eller efterår, hvor vandstanden er lav, og påvirkningen af planter og dyr er mindst. Grødeskæring følger vandløbsregulativet og udføres på fastsatte tidspunkter.' },
      { question: 'Kan I lave både kloak og naturpleje på samme grund?', answer: 'Ja, det er en af vores klare styrker. Vi kan fx etablere dræn og LAR-anlæg, oprense en eksisterende sø og genskabe et naturligt udtryk i én samlet løsning – uden at du skal koordinere flere entreprenører.' },
      { question: 'Hvilke kommuner samarbejder I med?', answer: 'Vi har samarbejder med flere fynske kommuner om vandløbspleje og naturopgaver, og vi byder også på offentlige opgaver i Trekantsområdet. Kontakt os for konkrete referencer.' }
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
    description: 'Renovering af utætte og slidte brønde og opbygning af nye inspektionsbrønde. Vi sikrer en tæt og funktionel kloak – også ved skel, udløb og tilslutninger.',
    longDescription: `En brønd er det centrale knudepunkt i ethvert kloak- og afløbssystem. Det er gennem brønden vi inspicerer, renser og kobler ledninger sammen, og det er typisk her vi finder de første tegn på slid og utæthed. Når en brønd er gammel, revnet, sammensunken eller utæt, er konsekvenserne reelle: jord og rødder trænger ind, vand siver ud, kloakken tilstoppes oftere, og rotter får fri adgang til hele systemet. En grundig brøndrenovering – eller etablering af en helt ny inspektionsbrønd – er ofte den mest effektive måde at forlænge kloakkens levetid på.

Hvornår skal en brønd renoveres?

Tegn på at en brønd har brug for renovering omfatter: synlige revner i brøndvæggen, vandindsivning eller vandudsivning ved brøndens samlinger, sammensunkne brønddæksler, manglende eller løse stigetrin, brønde der er sat skævt eller står i forkert højde i forhold til terræn, jordophobning i bunden af brønden, eller hyppige rotter i området. Ofte opdager vi disse problemer i forbindelse med en TV-inspektion eller en akut tilstopning.

Vores renoveringsmetoder

Vi vurderer altid den mest skånsomme og holdbare løsning ud fra brøndens tilstand, type og placering. De typiske metoder er:

Indvendig opbygning: Hvis brøndvæggen i sig selv er stabil, men samlinger og bund er slidte, kan vi opbygge brønden indvendigt med beton, mørtel og tætningskrave. En forholdsvis enkel opgave der kan udføres på få timer uden større opgravning.

Udskiftning af brønddæksel og karm: Mange utætheder opstår omkring brønddækslet, hvor karmen er sunket eller revnet. Vi løfter den gamle karm, justerer højden, og monterer ny godkendt karm og dæksel der er belastningsklassificeret efter placeringen (have, indkørsel eller vej).

Helt ny brønd: Hvis brønden er sammenfaldet eller for ringe i tilstand til at renovere, etablerer vi en ny inspektionsbrønd – enten i beton eller plast afhængig af kloakkens type, dybde og belastning. Plastbrønde er ofte det rette valg ved nye huse og lette belastninger, mens betonbrønde foretrækkes ved tunge belastninger og trafikerede områder.

Sandfangsbrønde og rensebrønde: Vi etablerer også specialbrønde med sandfang til regnvandsledninger, til faskiner og til LAR-anlæg, hvor sand og blade skal opsamles før de når det videre system.

Efterbilleder og dokumentation

Vi dokumenterer altid arbejdet med både før- og efterbilleder, så du kan se forskellen og bruge dokumentationen over for forsikring eller kommune. Efter endt arbejde udfører vi tæthedsprøvning og TV-inspektion, så du har sort på hvidt at den nye eller renoverede brønd er tæt og fungerer som den skal.

Brøndbygning som del af nye projekter

Når vi etablerer ny kloak, separering eller LAR, indgår brøndbygning næsten altid som en del af projektet. Vi planlægger placeringen af inspektionsbrønde, så de er nemme at tilgå for både inspektion og rensning, og vi sørger for korrekt fald, tilslutninger og afdækning.

Holdbarhed og garanti

En korrekt udført brønd har en levetid på 50-100 år afhængigt af materiale og belastning. Vi giver 5 års garanti på vores arbejde og udfører altid efter gældende faglige standarder. Som autoriseret kloakmestervirksomhed under DM&E Kloakmestergarantien har du fuld dokumentation og forbrugerbeskyttelse.`,
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Hvornår skal en brønd renoveres?', answer: 'Ved revner, utætheder, sammensunken karm, manglende stigetrin, jordophobning i bunden eller når TV-inspektion afslører skader på brøndvæggen. Ofte er en utæt brønd den primære årsag til rotteindtrængning og hyppige tilstopninger.' },
      { question: 'Får jeg efterbilleder af det færdige arbejde?', answer: 'Ja. Vi dokumenterer altid med både før- og efterbilleder samt TV-inspektion af det renoverede system, så du kan se resultatet og bruge dokumentationen over for forsikring, kommune eller en kommende køber.' },
      { question: 'Kan I renovere uden at grave op?', answer: 'I mange tilfælde ja – fx med indvendig opbygning, ny karm eller punktvis udbedring. Ved større skader eller sammensunkne brønde kræves dog opgravning, og så bygger vi en ny inspektionsbrønd i beton eller plast.' },
      { question: 'Hvad koster en ny brønd?', answer: 'Prisen afhænger af brøndens dybde, type, placering og belastningsklasse. Vi giver altid fast pris efter besigtigelse – ingen timeafregning og ingen overraskelser undervejs.' },
      { question: 'Hvor længe holder en ny brønd?', answer: 'En korrekt udført brønd holder typisk 50-100 år afhængigt af materiale og belastning. Plastbrønde og betonbrønde har forskellige styrker, og vi vælger materialet ud fra placering, dybde og forventet trafik.' },
      { question: 'Kan I udskifte et knust brønddæksel?', answer: 'Ja, vi udskifter brønddæksler og karme i alle størrelser og belastningsklasser – fra havebrønde til vejbrønde der skal kunne klare lastbiltrafik. Hurtig udrykning ved akutte sikkerhedsrisici.' }
    ]
  },
  {
    id: '12',
    slug: 'olietanke',
    image: '/pictures/Olie tanke/20220905_090641.jpg',
    title: 'Olietanke – Opgravning og bortskaffelse',
    description: 'Lovlig opgravning, fjernelse og bortskaffelse af nedgravede olietanke. Inkl. jordprøver, kommuneindberetning og miljødokumentation.',
    longDescription: `Mange ejendomme på Fyn har stadig en gammel nedgravet olietank liggende i jorden – også selvom oliefyret blev udskiftet med fjernvarme eller varmepumpe for år tilbage. En sløjfet tank kan være tom, eller den kan stadig indeholde rester af olie, slam og rust. Uanset hvad er en gammel olietank en risiko: rust kan give utætheder, og lækker tanken først, kan forureningen sprede sig til grundvand, naboer og dyrt-bortskaffeligt jord. Korrekt opgravning og bortskaffelse er den eneste rigtige og lovlige løsning.

Lovkrav om sløjfning og fjernelse

Ifølge den danske olietankbekendtgørelse skal nedgravede olietanke sløjfes (taget ud af brug og forsvarligt afsluttet) når de ikke længere bruges, og senest når tanken er forældet ud fra alder og typegodkendelse. Sløjfning kan ske ved opgravning og bortskaffelse, eller – hvis tanken sidder uhensigtsmæssigt – ved tømning, rensning og afblænding på stedet. I de fleste tilfælde er fysisk opgravning den mest fremtidssikre løsning, fordi det fjerner risikoen helt. Husk at sløjfning skal indberettes til kommunen, og at boligejeren har ansvaret for at det sker korrekt.

Sådan foregår opgravning og bortskaffelse

Vi tager hånd om hele processen, så du ikke skal ringe rundt til flere parter:

Besigtigelse og lokalisering: Vi finder tanken (mange er ikke længere markeret på terræn), vurderer adgangsforhold og afklarer om der er kabler, ledninger eller bygninger i vejen.

Tømning og rensning: Tanken tømmes for restolie og slam, som bortskaffes på godkendt modtageanlæg. Vi sørger for kvitteringer og transportdokumentation.

Opgravning: Tanken graves op med gravemaskine. Adgangshul og forløb planlægges, så vi minimerer skade på belægning, beplantning og hus. Tankens tilstand dokumenteres med billeder.

Jordprøver og miljøvurdering: Hvis der er mistanke om forurening – fx på baggrund af synlig oliefilm, lugt eller tankens tilstand – udtager vi jordprøver til analyse på akkrediteret laboratorium. Resultatet afgør om jorden kan blive liggende, eller om der skal saneres.

Bortskaffelse: Selve tanken køres til ophugning på godkendt skrothandler, og kvittering sendes til kommunen som dokumentation. Eventuelt forurenet jord køres til godkendt jordrenseanlæg.

Indberetning til kommune og forsikring: Vi udarbejder den nødvendige dokumentation og indberetter sløjfningen til kommunen. Forsikringsselskaber og kommende købere kan herefter se i BBR og kommunale registre, at tanken er korrekt fjernet.

Forurenet jord – hvad så?

Hvis prøverne viser olieforurening, fastlægger kommunen i samarbejde med en miljørådgiver omfanget af saneringen. Mange forsikringer (oliebranchens miljøpulje for eksisterende skader før 1. marts 2000) kan dække hele eller dele af saneringsudgiften, og vi har erfaring med at samarbejde med både forsikringsselskaber og miljøkonsulenter om disse sager. Vi udfører selv saneringsarbejde – fra mindre afgravning af forurenet jord til større oprensninger – med fuld dokumentation.

Hvorfor vælge os til opgaven?

Som autoriseret kloakmestervirksomhed har vi maskiner, erfaring og dokumentationsapparat til at løse hele opgaven samlet. Vi kender de fynske kommuners krav, vi har samarbejder med godkendte modtageanlæg og laboratorier, og vi sørger for at hver eneste sag bliver dokumenteret korrekt. Du får ét tilbud, én kontaktperson og én faktura – og en olietank der ikke længere ligger og venter på at blive et problem.`,
    icon: 'ShieldCheck',
    faqs: [
      { question: 'Skal gamle olietanke fjernes?', answer: 'Ja. Når en nedgravet olietank ikke længere bruges – fx fordi du er skiftet til fjernvarme eller varmepumpe – skal den sløjfes. I de fleste tilfælde er opgravning og bortskaffelse den rigtige løsning, fordi det fjerner risikoen for fremtidige lækager helt.' },
      { question: 'Hvad hvis der er forurening?', answer: 'Vi tager jordprøver til analyse på akkrediteret laboratorium og dokumenterer eventuel forurening. Hvis sanering er nødvendig, udfører vi det selv og samarbejder med miljørådgivere og forsikring. Olietankforsikring og oliebranchens miljøpulje kan dække en stor del af saneringen.' },
      { question: 'Hvad koster opgravning af olietank?', answer: 'Prisen afhænger af tankens størrelse, dybde, adgangsforhold og om der er behov for jordprøver eller sanering. Vi giver altid fast pris efter besigtigelse – inkl. tømning, opgravning, bortskaffelse og kommuneindberetning.' },
      { question: 'Indberetter I sløjfningen til kommunen?', answer: 'Ja, vi sender den lovpligtige sløjfningsmeddelelse til kommunen sammen med dokumentation for bortskaffelse, så registret bliver opdateret. Du har papir på det hele bagefter.' },
      { question: 'Hvor lang tid tager opgaven?', answer: 'En typisk opgravning af en olietank tager 1-2 dage. Hvis der skal udtages jordprøver, kommer der en pause på nogle dage til laboratorieanalyse, før vi kan retablere fuldt op.' },
      { question: 'Kan tanken sløjfes uden at grave den op?', answer: 'I særlige tilfælde – fx hvis tanken ligger under en bygning eller utilgængeligt – kan den sløjfes på stedet ved tømning, rensning og afblænding. Det skal dog godkendes af kommunen, og opgravning er som hovedregel den foretrukne løsning.' }
    ]
  },
  {
    id: '13',
    slug: 'fundament',
    image: '/pictures/Fundament/20220304_093935.jpg',
    title: 'Fundamentarbejde & Støbning',
    description: 'Udgravning, klargøring og forberedelse til fundament. Vi sikrer et stabilt og frostfrit grundlag for garage, tilbygning eller nyt byggeri.',
    longDescription: `Et stabilt og holdbart byggeri starter med fundamentet – og fundamentet starter med korrekt jordarbejde. Når jorden under fundamentet ikke er bæredygtig, kan det give sætninger, revner i mure og dyre udbedringer mange år senere. Hos PR Entreprenøren udfører vi præcist og fagligt korrekt jordarbejde til fundamenter af alle typer – fra mindre garager og carporte til større tilbygninger og helt nye huse.

Hvad er fundamentarbejde?

Med fundamentarbejde mener vi alt det, der ligger forud for selve betonstøbningen og opmuringen: udgravning til korrekt dybde, komprimering og opbygning af underlag, etablering af kapillarbrydende lag, sokkelafretning og forberedelse til støbeforme. Det er det "usynlige" arbejde der bestemmer hvor stabilt det færdige byggeri vil stå – og det skal udføres efter konstruktionstegninger, geoteknisk vurdering og bygningsreglementets krav.

Vores ydelser i fundamentarbejde

Udgravning: Vi graver til korrekt dybde under hensyn til frostfri dybde (minimum 60 cm i Danmark, ofte mere ved tunge konstruktioner), jordens bæreevne og det aktuelle byggeri. Større huse kræver dybere udgravning, og særligt i lerede og bløde jorde kan en dybere bæreevneprøve være nødvendig.

Komprimering af underlag: Den udgravede bund komprimeres med tromle eller stamper, så fremtidige sætninger undgås. Vi opbygger derefter et bærelag af stabilgrus i lag, der hver komprimeres for sig.

Sandafretning: Et veludført sandlag oven på stabilgrus skaber en plan og frostfri bund klar til støbeforme eller fundamentsblokke.

Forberedelse til støbning: Vi sætter forme, sikrer korrekt højde og målsætning, og koordinerer med betonsjak eller murer omkring næste fase af byggeriet.

Etablering af installationer i jord: Vi tager hånd om den del af kloak, drænledninger og el-tomrør der løber under fundamentet, så der ikke skal brydes op senere. Som autoriseret kloakmestervirksomhed kobler vi det hele lovligt op til den øvrige kloak.

Dræn og afvanding

Hvis dit projekt kræver dræning omkring fundamentet, kan vi etablere det som en del af opgaven. Vi vurderer altid konkret om dræn er en del af det aktuelle projekt – nogle byggerier har behov for omfangsdræn fra start, mens andre er bedre tjent med kun at sikre korrekt fald, kapillarbrydende lag og afledning. Vi rådgiver ud fra grundens forhold, ikke en standardpakke.

Tilbygninger og fritliggende byggerier

Vi har erfaring med fundamenter til alt fra små redskabsskure og terrasseoverdækninger til store tilbygninger, garager og selvstændige huse. Tilbygninger har ofte særlige udfordringer: tilslutning til eksisterende fundament, hensyn til eksisterende dræn, kloak og forsyning, og tilpasning til niveauforskelle. Vi planlægger sammen med dig, din rådgiver eller arkitekt, så detaljerne er på plads inden vi går i gang.

Samarbejde med murere, betonsjak og rådgivere

Selve betonstøbningen, opmuring af sokkel og evt. armering udføres typisk af specialiserede betonsjak eller murere. Vi samarbejder fast med flere lokale håndværkere på Fyn, og vi koordinerer gerne så fundamentet glider lige over i næste fase uden ventetid. Hvis du selv har en murer eller entreprenør på sagen, samarbejder vi naturligvis også med dem.

Akut udrykning og fast pris

Vi giver fast pris efter besigtigelse og gennemgang af tegninger. Ved akutte sager – fx sætningsskader eller behov for hurtig udgravning før vinteren – rykker vi hurtigt ud. Som autoriseret kloakmestervirksomhed under DM&E Kloakmestergarantien har du dokumentation, garanti og forbrugerbeskyttelse på det udførte arbejde.`,
    icon: 'Hammer',
    faqs: [
      { question: 'Hvad indgår i fundamentarbejde?', answer: 'Udgravning til korrekt dybde, komprimering af underlag, opbygning af stabilgrus i lag, sandafretning, forberedelse til støbeforme og etablering af installationer der skal ligge under fundamentet (kloak, drænrør, el-tomrør).' },
      { question: 'Laver I også selve støbningen?', answer: 'Vi klargør til støbning og koordinerer med betonsjak eller murere, der typisk udfører selve betonarbejdet. Mange projekter løses smidigt i samarbejde med vores faste netværk af lokale håndværkere på Fyn.' },
      { question: 'Hvor dybt skal fundamentet være?', answer: 'Minimum 60 cm under terræn for at være frostfrit, men ofte dybere afhængigt af jordbundens bæreevne og bygningens vægt. Vi rådgiver konkret ud fra grundens forhold og konstruktionens krav.' },
      { question: 'Skal jeg have dræn omkring fundamentet?', answer: 'Det vurderes konkret. Nogle byggerier har gavn af omfangsdræn fra start, mens andre er bedre tjent med kun korrekt fald, kapillarbrydende lag og standardafledning. Vi anbefaler aldrig dræn som standard – kun når det giver mening for din situation.' },
      { question: 'Kan I lave fundament under svære adgangsforhold?', answer: 'Ja. Vi har minigravere til trange grunde, så vi kan komme ind på baggårde, smalle indkørsler og tilbygninger op ad eksisterende huse uden at ødelægge eksisterende belægning.' },
      { question: 'Hvor lang tid tager fundamentarbejdet?', answer: 'Til en mindre tilbygning eller carport typisk 2-4 dage. Større huse og kompleks udgravning tager længere tid. Vi planlægger ud fra det samlede projekt og koordinerer med næste fase, så I undgår ventetid.' }
    ]
  },
  {
    id: '14',
    slug: 'vandledning',
    image: '/pictures/Vandledning/20220625_130357.jpg',
    title: 'Vandledninger – Reparation & Fornyelse',
    description: 'Opgravning og udskiftning af utætte og slidte vandledninger i jord. Hurtig udrykning ved brud – fra hovedhane til stikledning.',
    longDescription: `En utæt eller bristet vandledning kan hurtigt udvikle sig fra et lille drypproblem til en alvorlig sag med oversvømmelse, sætningsskader og store regninger på vand der løber til ingen verdens nytte. PR Entreprenøren udfører opgravning, reparation og fornyelse af vandledninger i jord på hele Fyn og i Trekantsområdet. Vi tager os af alt jord- og kloakarbejdet på vandledningerne udefra og frem til huset – og vi samarbejder med en lokal autoriseret VVS-installatør, når selve VVS-tilslutningen indenfor skal udføres.

Hvad laver vi – og hvad gør vi ikke?

Vi er autoriseret kloakmestervirksomhed og graveentreprenør, ikke et VVS-firma. Det betyder at vi løser alle de opgaver der ligger i jorden: opgravning, lokalisering af utætheder, udskiftning af defekte rør i jord, etablering af nye stikledninger fra skel til hus, og retablering af haven og belægningen efter endt arbejde. Når selve den indvendige tilslutning eller skift af målerinstallation skal udføres, har vi faste samarbejder med autoriserede VVS-installatører – så hele opgaven kan løses samlet uden at du skal koordinere flere firmaer.

Hvornår skal en vandledning skiftes?

Tegn på at din vandledning kan være ved at være slidt op: pludselige eller gradvise stigninger i vandregningen uden at forbruget reelt er steget, vådt areal i haven eller indkørslen der ikke kan forklares, faldende vandtryk i hele eller dele af huset, tilbagevendende brud på samme strækning, samt synlige sætninger eller bløde områder over rørets formodede placering. Mange ældre fynske ejendomme har stadig vandledninger fra 1950'erne, 60'erne og 70'erne, og selv om materialerne den gang var solide, er levetiden ved at være indhentet.

Akut brud på vandledning – hvad gør vi?

Ved akutte vandledningsbrud rykker vi hurtigt ud, så vi kan minimere vandskader, finde bruddet og udskifte den defekte del. Vi har minigraver og hurtigt udstyr klar til at lokalisere og udbedre, og vi kan ofte have vandet tilbage på i løbet af samme dag. Hvis du oplever et brud, så luk hovedhanen, ring til os, og dokumentér gerne med billeder – det letter sagen over for forsikringen.

Sådan foregår fornyelse af stikledning

Skal vi udskifte hele stikledningen fra skel til hus, foregår det typisk sådan: vi lokaliserer den eksisterende ledning og planlægger forløbet, lukker for vandet ved hovedstophanen, graver en smal rende fra skel til hus, lægger ny vandledning i godkendt PE-rør i frostfri dybde, sikrer korrekt tilslutning ved skel og ved hus, og retablerer haven, belægningen eller græsset efter endt arbejde. Selve tilslutningen til vandinstallationen indenfor og montering af eventuelt målerarrangement udføres af autoriseret VVS-installatør i samarbejde med os.

Adgangsforhold og minimal opgravning

Mange vandledninger ligger under fliser, indkørsler eller plæner, og vi gør os umage med at lægge en plan der skader mindst muligt på det færdige resultat. Vi bruger minigraver hvor adgangsforholdene tillader det, vi tager hensyn til beplantning, og vi retablerer pænt og holdbart efter endt arbejde – ofte så det knapt kan ses bagefter.

Akut udrykning, fast pris og dokumentation

Ved akutte vandledningsbrud rykker vi typisk ud inden for få timer – også aften og weekend. Ved planlagte fornyelser giver vi fast pris efter besigtigelse, så du kender økonomien op front. Du modtager dokumentation for arbejdet, og vi indberetter til vandværk og kommune, hvor det er relevant.`,
    icon: 'Droplets',
    faqs: [
      { question: 'Hvad koster det at skifte en vandledning?', answer: 'Prisen afhænger af længde, dybde, jordtype og adgangsforhold. Vi giver altid fast pris efter besigtigelse, så du kender økonomien fra start. Akut udrykning ved brud afregnes særskilt.' },
      { question: 'Hvor hurtigt kan I komme ved brud?', answer: 'Ved akutte vandledningsbrud rykker vi som hovedregel ud inden for få timer – også aften og weekend. Luk hovedhanen og ring til os, så starter vi sagen.' },
      { question: 'Står I selv for VVS-tilslutningen indenfor?', answer: 'Nej. Vi er autoriseret kloakmestervirksomhed og graveentreprenør og udfører jord- og rørarbejdet udefra. Selve VVS-installationen og tilslutning til indvendige rør udføres af autoriseret VVS-installatør, som vi samarbejder med, så hele opgaven kan løses samlet.' },
      { question: 'Kan I lokalisere et brud uden at grave det hele op?', answer: 'I de fleste tilfælde ja. Vi bruger trykprøvning, akustisk lytteudstyr og terrænvurdering til at indkredse bruddet, så vi kun graver det stykke op der reelt skal udbedres.' },
      { question: 'Hvilket rørmateriale anvender I?', answer: 'Vi bruger godkendte PE-rør (polyethylen) i drikkevandskvalitet, lagt i frostfri dybde med korrekt forankring og samling. Materialet er holdbart, fleksibelt og lever op til alle krav fra vandværk og kommune.' },
      { question: 'Hvor langt holder en ny vandledning?', answer: 'En korrekt udført vandledning i moderne PE-rør holder typisk 50+ år uden vedligeholdelse. Det er en investering der varer ud over én generation.' }
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
    description: "Autoriseret installatør og service af UWS højvandslukkere",
    link: "https://uws.dk/kloakmestre/"
  }
];

export const FAQ_GENERAL = siteContent.faq as any[];