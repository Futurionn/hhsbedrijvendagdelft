// ═════════════════════════════════════════════════════════════════════════════
//  NOVEMBER 2026  —  COMPANY LIST
//
//  ★ ADD PARTICIPATING COMPANIES HERE. ★
//
//  The SOURCE for every company below is what the company itself filled in on
//  the registration form ("Bedrijvendag inschrijf formulier bedrijven"). The
//  Dutch description is their own text, with only typos fixed; the English is
//  a faithful translation. Do not rewrite their text — ask them instead.
//
//  ─── THE THREE STEPS ────────────────────────────────────────────────────────
//   1. Put the logo file in           public/logos/
//   2. Copy the TEMPLATE below into the list and fill it in.
//   3. Open src/editions/november-2026/edition.config.js and set
//      `showCompanies: true` so the section appears on the site.
//
//  ─── TEMPLATE  (copy everything between the braces) ─────────────────────────
//
//      {
//        name: "Voorbeeld B.V.",
//        logo: "/logos/voorbeeld.svg",
//        logoTone: "light",
//        category: "engineering",
//        industry: { nl: "Machinebouw", en: "Machine building" },
//        employees: "~ 50",
//        location: { nl: "Delft, NL", en: "Delft, NL" },
//        website: "https://voorbeeld.nl/",
//        stand: 1,
//        studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "maybe" },
//        opportunities: ["internship", "graduation", "traineeship", "job"],
//        opportunityNote: { nl: "Eigen tekst van het bedrijf.", en: "The company's own text." },
//        description: {
//          nl: "Twee tot vier zinnen over wat het bedrijf doet.",
//          en: "Two to four sentences about what the company does."
//        }
//      },
//
//  ─── WHAT EACH FIELD MEANS ──────────────────────────────────────────────────
//
//   name         Required. Shown on the card. Also generates the company's web
//                address, so "Voorbeeld B.V." becomes "voorbeeld-b-v".
//
//   logo         Path starting at /logos/. The file itself goes in
//                public/logos/. Prefer an SVG, or a PNG with a transparent
//                background, at least ~600px wide.
//                Leave the field out entirely and a "work in progress"
//                placeholder is used.
//
//   logoTone     Only needed when the logo has one fixed colour:
//                  "light"  the logo is WHITE  -> give it a dark card
//                  "dark"   the logo is BLACK  -> give it a white card
//                Leave it out for normal colour logos; the card then follows
//                the visitor's light/dark setting.
//
//   category     Used by the filter on the companies page. Pick one of:
//                  engineering  consultancy  technology  installation
//                  recruitment  defence      energy-transition  other
//                To invent a new one, add it to CATEGORY_LABELS in
//                src/shared/strings.js first, or it shows as a raw slug.
//
//   industry     Short sector description. Bilingual.
//   employees    Free text: "~ 50", "51-200", "N/A". May be bilingual.
//   location     City and country. Bilingual (usually the same in both).
//   website      Full https:// address. Use "#" if they have no site.
//
//   stand        The stand number on the floor plan, or leave it out if
//                stands are not assigned yet. This ONE number is what links
//                the company to its spot on the map — there is no second list.
//
//   studies      Which study programmes the company is looking for, straight
//                from the form ("Interesse" / "Neutraal" / "Geen interesse"):
//                  "yes"    Interesse         -> shown as "looking for"
//                  "maybe"  Neutraal          -> shown as "also open to"
//                  "no"     Geen interesse    -> not shown
//                Keys: ee  Elektrotechniek       mt   Mechatronica
//                      tbk Techn. Bedrijfskunde  tn   Techn. Natuurkunde
//                      tw  Toegepaste Wiskunde   wtb  Werktuigbouwkunde
//                      ict HBO-ICT
//                The labels are STUDY_LABELS in src/shared/strings.js. The
//                study filter on the home page and the list reads this.
//
//   opportunities What they offer students: any of
//                  "internship"  "graduation"  "traineeship"  "job"
//                Leave it out (or []) when the company said none.
//   opportunityNote  Optional. Their own sentence about it, when they wrote
//                one instead of (or as well as) the plain options. Bilingual.
//
//   description  Bilingual. The company's own text from the form.
//
//  ─── ORDER ──────────────────────────────────────────────────────────────────
//  The order here is the order the logos scroll past on the home page. The
//  companies PAGE has its own A-Z sort, so this order only affects the home page.
// ═════════════════════════════════════════════════════════════════════════════
import { normalizeCompanies } from "../../../shared/companyData.js";

export const NOVEMBER_2026_COMPANIES = normalizeCompanies([
  // Stand numbers are not assigned yet — add `stand:` once the floor plan is done.
  {
    name: "Wepro",
    logo: "/logos/wepro.png",
    category: "recruitment",
    industry: { nl: "Werktuigbouwkunde (technische detachering)", en: "Mechanical engineering (technical secondment)" },
    employees: "~ 230",
    location: { nl: "Leusden, NL", en: "Leusden, NL" },
    website: "https://www.teameiffel.nl/nl/labels/wepro/",
    studies: { ee: "maybe", mt: "yes", tbk: "no", tn: "no", tw: "no", wtb: "yes", ict: "no" },
    opportunities: [],
    description: {
      nl: "Wepro is een technisch detacheringsbureau dat gespecialiseerd is in werktuigbouwkunde, installatietechniek en elektrotechniek. We verbinden technische professionals met opdrachtgevers in industrie, machinebouw, utiliteit en hightech om projecten te versterken op het gebied van engineering, werkvoorbereiding, projectleiding en technische uitvoering. Vanuit vakmanschap, persoonlijke aandacht en duurzame samenwerking bouwen we aan de technische oplossingen van morgen.",
      en: "Wepro is a technical secondment agency specialising in mechanical engineering, building services and electrical engineering. We connect technical professionals with clients in industry, machine building, utilities and high tech, strengthening projects in engineering, work preparation, project management and technical execution. Through craftsmanship, personal attention and lasting cooperation, we build the technical solutions of tomorrow."
    }
  },
  {
    name: "Van Dorp Installaties",
    logo: "/logos/vandorp.svg",
    logoTone: "light",
    category: "installation",
    industry: { nl: "Techniek (elektrotechniek en installatietechniek)", en: "Engineering (electrical and building services)" },
    employees: "~ 2000",
    location: { nl: "Zoetermeer, NL", en: "Zoetermeer, NL" },
    website: "https://werkenbijvandorp.eu/",
    // HBO-ICT was left blank on the form.
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "no", tw: "no", wtb: "yes" },
    opportunities: ["internship", "graduation", "traineeship", "job"],
    description: {
      nl: "Van Dorp Installaties is een technisch familiebedrijf met ruim 1900 medewerkers en vestigingen door heel Nederland. We ontwerpen, realiseren, beheren en onderhouden technische installaties in gebouwen, met veel aandacht voor duurzaamheid en langdurige klantrelaties.",
      en: "Van Dorp Installaties is a family-owned technical company with over 1,900 employees and offices across the Netherlands. We design, build, manage and maintain technical installations in buildings, with a strong focus on sustainability and long-term client relationships."
    }
  },
  {
    name: "Peutz",
    logo: "/logos/peutz.svg",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Gebouwde omgeving en industrie", en: "Built environment and industry" },
    employees: "~ 235",
    location: { nl: "Zoetermeer, NL", en: "Zoetermeer, NL" },
    website: "https://www.peutz.nl/",
    studies: { ee: "no", mt: "no", tbk: "no", tn: "yes", tw: "no", wtb: "yes", ict: "no" },
    opportunities: [],
    opportunityNote: {
      nl: "Als student krijg je bij Peutz de kans om te leren van topspecialisten, verantwoordelijkheid te nemen en je te ontwikkelen tot expert in jouw vakgebied.",
      en: "As a student at Peutz you get the chance to learn from top specialists, take on responsibility and grow into an expert in your field."
    },
    description: {
      nl: "Peutz is een onafhankelijk ingenieurs- en adviesbureau waar techniek, innovatie en maatschappelijke impact samenkomen. Werk mee aan bijzondere projecten, van iconische gebouwen en concertzalen tot duurzame industrie en complexe infrastructuur.",
      en: "Peutz is an independent engineering and consultancy firm where technology, innovation and social impact come together. Work on remarkable projects, from iconic buildings and concert halls to sustainable industry and complex infrastructure."
    }
  },
  {
    name: "Leiderdorp Instruments",
    logo: "/logos/leiderdorp.png",
    logoTone: "dark",
    category: "technology",
    industry: { nl: "Geotechniek en hydrologie", en: "Geotechnics and hydrology" },
    employees: "~ 15",
    location: { nl: "Leiderdorp, NL", en: "Leiderdorp, NL" },
    website: "https://www.leiderdorpinstruments.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "no", tn: "no", tw: "no", wtb: "maybe", ict: "yes" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "Leiderdorp Instruments is een Nederlandse fabrikant die sensor- en monitoringsoplossingen ontwikkelt en produceert voor de geotechniek en hydrologie. Met onze meetoplossingen voor onder andere grondwaterstand, bodemvocht, verplaatsing en waterkwaliteit helpen wij organisaties om meetgegevens betrouwbaar en efficiënt te verzamelen en te monitoren.",
      en: "Leiderdorp Instruments is a Dutch manufacturer that develops and produces sensor and monitoring solutions for geotechnics and hydrology. With our instruments for groundwater level, soil moisture, displacement and water quality, among others, we help organisations collect and monitor measurement data reliably and efficiently."
    }
  },
  {
    name: "Demcon",
    logo: "/logos/demcon.png",
    logoTone: "dark",
    category: "technology",
    industry: { nl: "High-tech en biomedische sector", en: "High-tech and biomedical sector" },
    employees: "~ 1100",
    location: { nl: "Delft, NL", en: "Delft, NL" },
    website: "https://demcon.com/nl",
    studies: { ee: "yes", mt: "yes", tbk: "no", tn: "maybe", tw: "maybe", wtb: "yes", ict: "no" },
    opportunities: ["internship", "graduation", "job"],
    description: {
      nl: "Demcon maakt het verschil met technologie. Ons hart klopt voor innovatieve techniek waarmee we complexe systemen en producten ontwikkelen, die bijdragen aan betere gezondheidszorg en high-tech oplossingen. We starten met een blanco vel en creëren oplossingen die de verwachtingen van onze klanten overtreffen. Extreme technische uitdagingen verbinden ons als team. Met elk onze eigen expertise en gedeelde passie voor technologie lossen we samen de moeilijkste vraagstukken op. We werken met vrijheid en verantwoordelijkheid, wat ons motiveert om grenzen te verleggen. Dankzij de sterke teamgeest en de steun van collega's durven we uitdagingen aan te gaan, wetende dat we er altijd samen uitkomen.",
      en: "Demcon makes the difference with technology. Our hearts beat for innovative engineering, with which we develop complex systems and products that contribute to better healthcare and high-tech solutions. We start with a blank sheet and create solutions that exceed our clients' expectations. Extreme technical challenges unite us as a team. Each with our own expertise and a shared passion for technology, we solve the hardest problems together. We work with freedom and responsibility, which motivates us to push boundaries. Thanks to strong team spirit and the support of colleagues, we dare to take on challenges, knowing we will always work it out together."
    }
  },
  {
    name: "Sweco Nederland B.V.",
    logo: "/logos/sweco.png",
    logoTone: "dark",
    category: "consultancy",
    industry: {
      nl: "Energie, water, infrastructuur, mobiliteit, bouw, installatietechniek",
      en: "Energy, water, infrastructure, mobility, construction, building services"
    },
    employees: "~ 2400",
    location: { nl: "De Bilt, NL", en: "De Bilt, NL" },
    website: "https://www.sweco.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "job"],
    description: {
      nl: "Sweco is Europa's toonaangevende architecten- en ingenieursadviesbureau. Met de collectieve kennis van 23.000 architecten, ingenieurs en adviseurs werken wij samen met onze opdrachtgevers aan de duurzame samenlevingen en steden van morgen. Vanuit de overtuiging dat elk stukje telt, richten wij ons op grote én kleine opgaven die samen het verschil maken. We faciliteren de transitie naar een groenere samenleving, benutten de kansen van digitalisering en dragen zo bij aan het versterken van de concurrentiekracht en weerbaarheid van Europa.",
      en: "Sweco is Europe's leading architecture and engineering consultancy. With the collective knowledge of 23,000 architects, engineers and consultants, we work with our clients on the sustainable communities and cities of tomorrow. Believing that every piece counts, we take on large and small challenges that together make the difference. We facilitate the transition to a greener society, seize the opportunities of digitalisation and so help strengthen Europe's competitiveness and resilience."
    }
  },
  {
    name: "Siemens Nederland N.V.",
    logo: "/logos/Siemens.png",
    category: "technology",
    industry: { nl: "Technologie", en: "Technology" },
    employees: { nl: "~ 1300 (NL), 318.000 wereldwijd", en: "~ 1,300 (NL), 318,000 worldwide" },
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://www.siemens.nl/",
    studies: { ee: "yes", mt: "maybe", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    // The form answer here was just "3"; ask Siemens what they offer.
    opportunities: [],
    description: {
      nl: "We create technology to transform the everyday, for everyone. Siemens creëert technologie om het alledaagse te transformeren: fabrieken die wendbaarder en productiever zijn, intelligentere en efficiëntere gebouwen en netwerken, betrouwbaarder en duurzamer transport. Als technologiebedrijf is het onze ambitie om de grootste uitdagingen van onze tijd aan te gaan door digitalisering en duurzaamheid samen te brengen: technology with purpose.",
      en: "We create technology to transform the everyday, for everyone. Siemens creates technology to transform the everyday: factories that are more agile and productive, smarter and more efficient buildings and grids, and more reliable and sustainable transport. As a technology company, our ambition is to take on the greatest challenges of our time by bringing digitalisation and sustainability together: technology with purpose."
    }
  },
  {
    name: "Gebr. Smits Holding B.V.",
    logo: "/logos/smits.png",
    category: "other",
    industry: { nl: "Circulaire voedingsmiddelenindustrie", en: "Circular food industry" },
    employees: "~ 70",
    // The form says "Cortelande" (their business park); the logo says Zevenhuizen.
    location: { nl: "Zevenhuizen, NL", en: "Zevenhuizen, NL" },
    website: "https://www.werkenbijsmits.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["graduation", "job"],
    opportunityNote: {
      nl: "Afstuderen en mogelijk aanbod van een baan binnen het bedrijf.",
      en: "Graduation projects, with a possible job offer within the company."
    },
    description: {
      nl: "Smits is een specialist in het opnieuw bestemmen van voedsel. We geloven dat goed niet het eindpunt is. Daarom zetten we ons voortdurend in om processen slimmer, oplossingen beter en samenwerking sterker te maken. Door te proberen, te leren en vol te houden, blijven we zoeken naar wat beter kan. Smits ziet toekomst in een foodindustrie waarin reststromen betrouwbaar en hoogwaardig worden hergebruikt. Met een goede beheersing van techniek, logistiek en verwerking behoudt de reststroom zijn waarde. Een familiebedrijf, driven by improvement.",
      en: "Smits specialises in repurposing food. We believe that good is not the end point. That is why we keep working to make processes smarter, solutions better and cooperation stronger. By trying, learning and persevering, we keep looking for what can be improved. Smits sees a future in a food industry where residual streams are reused reliably and at high value. Through strong control of technology, logistics and processing, those streams keep their value. A family business, driven by improvement."
    }
  },
  {
    name: "Comaen",
    logo: "/logos/comaen.svg",
    logoTone: "dark",
    category: "recruitment",
    // Comaen filled in the form twice; this is their second, later submission.
    industry: { nl: "Recruitment (engineering en industriële automatisering)", en: "Recruitment (engineering and industrial automation)" },
    employees: "~ 17",
    location: { nl: "Haarlem, NL", en: "Haarlem, NL" },
    website: "https://www.comaen.nl/",
    studies: { ee: "maybe", mt: "yes", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["graduation", "job"],
    opportunityNote: { nl: "Afstuderen en juniorfuncties.", en: "Graduation projects and junior positions." },
    description: {
      nl: "Bij Comaen geloven we dat een goede carrière niet begint bij een functietitel, maar bij wie jij bent. We verbinden engineers met technische organisaties waar hun talenten, ambities en persoonlijkheid tot hun recht komen. Want de juiste match draait om meer dan alleen een cv.",
      en: "At Comaen we believe a good career doesn't start with a job title, but with who you are. We connect engineers with technical organisations where their talents, ambitions and personality can shine. Because the right match is about more than just a CV."
    }
  },
  {
    name: "Tempcontrol",
    logo: "/logos/tempcontrol-2026.png",
    category: "technology",
    industry: { nl: "Temperatuursensoren", en: "Temperature sensors" },
    employees: "~ 40",
    location: { nl: "Nootdorp, NL", en: "Nootdorp, NL" },
    website: "https://www.tempcontrol.nl/",
    studies: { ee: "maybe", mt: "yes", tbk: "yes", tn: "maybe", tw: "no", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "traineeship", "job"],
    description: {
      nl: "Tempcontrol ontwikkelt temperatuursensoren op specificatie van de klant, voor elke toepassing in elke sector. De productie van de temperatuursensoren gebeurt binnen ons bedrijf in Nootdorp. We beschikken over een eigen kalibratielaboratorium en een cleanroom.",
      en: "Tempcontrol develops temperature sensors to customer specification, for any application in any sector. The sensors are produced in-house at our company in Nootdorp. We have our own calibration laboratory and a cleanroom."
    }
  },
  {
    name: "ABB B.V.",
    logo: "/logos/ABB.png",
    category: "technology",
    industry: { nl: "Elektrificatie en automatisering", en: "Electrification and automation" },
    employees: "~ 1000",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://careers.abb/benelux/nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "maybe", tw: "no", wtb: "maybe", ict: "maybe" },
    opportunities: ["internship", "job"],
    description: {
      nl: "ABB is een wereldwijde technologieleider in elektrificatie en automatisering die een duurzamere en grondstofzuinige toekomst mogelijk maakt. Door expertise in engineering en digitalisering te combineren, helpt ABB industrieën om op hoog niveau te presteren terwijl ze efficiënter, productiever en duurzamer worden en continu verbeteren. Bij ABB noemen we dit 'Engineered to Outrun'. Het bedrijf heeft een geschiedenis van meer dan 140 jaar en telt ruim 105.000 medewerkers wereldwijd. De ABB-aandelen zijn genoteerd op de SIX Swiss Exchange (ABBN) en Nasdaq Stockholm (ABB).",
      en: "ABB is a global technology leader in electrification and automation, enabling a more sustainable and resource-efficient future. By combining engineering and digitalisation expertise, ABB helps industries perform at a high level while becoming more efficient, productive and sustainable, and continuously improving. At ABB we call this 'Engineered to Outrun'. The company has a history of more than 140 years and over 105,000 employees worldwide. ABB shares are listed on the SIX Swiss Exchange (ABBN) and Nasdaq Stockholm (ABB)."
    }
  },
  {
    name: "DVI",
    logo: "/logos/dvi.png",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Gebouwgebonden installaties (energietechniek)", en: "Building services (energy engineering)" },
    employees: "~ 30",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.dvi.eu/",
    studies: { ee: "yes", mt: "no", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "no" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "DVI is een installatietechnisch adviesbureau dat actief is binnen woningbouw en utiliteit. De aarde beter achterlaten: dat is onze missie. Daarom kijken wij verder dan de installatietechniek. Dat doen we met onze drie kernwaarden: mens, natuur en techniek. Drie overtuigingen, drie perspectieven: onze kernwaarden zijn een driehoek die ons advies in balans brengt. Zo maken we de gebouwde omgeving wérkelijk toekomstbestendig.",
      en: "DVI is a building services consultancy working in housing and commercial buildings. Leaving the earth better than we found it: that is our mission. That is why we look beyond building services alone. We do so with our three core values: people, nature and technology. Three convictions, three perspectives: our core values form a triangle that keeps our advice in balance. That is how we make the built environment truly future-proof."
    }
  },
  {
    name: "Berkel Industrial B.V.",
    logo: "/logos/berkel.svg",
    logoTone: "light",
    category: "engineering",
    industry: { nl: "Industrie (machinebouw en assemblage)", en: "Industry (machine building and assembly)" },
    employees: "~ 20",
    location: { nl: "Berkel en Rodenrijs, NL", en: "Berkel en Rodenrijs, NL" },
    website: "https://www.berkelindustrial.com/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "maybe" },
    opportunities: ["internship"],
    opportunityNote: {
      nl: "Bij Berkel Industrial loop je niet gewoon mee, maar ben je een waardevolle bijdrage aan ons team. Je krijgt de ruimte om zelfstandig projecten op te pakken, verbeteringen door te voeren en ervaring op te doen in een technische organisatie die volop in ontwikkeling is. Zo bouw je niet alleen aan onze toekomst, maar ook aan die van jezelf.",
      en: "At Berkel Industrial you don't just tag along: you are a valuable part of our team. You get room to take on projects independently, carry out improvements and gain experience in a technical organisation that is growing fast. That way you build not only our future, but your own as well."
    },
    description: {
      nl: "Berkel Industrial B.V. is een technische partner en assemblagespecialist voor seriematige machinebouwers, met een sterke focus op kunststof-, rubber- en mechanische componenten. Wij ondersteunen OEM-klanten in onder andere de agri-, tuinbouw- en industriesector met maatwerkonderdelen, assemblages en supply chain-oplossingen die hun productieproces vereenvoudigen. Door technische kennis, een hoge leverbetrouwbaarheid en persoonlijke samenwerking helpen wij klanten efficiënter te produceren en verder te groeien.",
      en: "Berkel Industrial B.V. is a technical partner and assembly specialist for serial machine builders, with a strong focus on plastic, rubber and mechanical components. We support OEM customers in agriculture, horticulture and industry, among others, with custom parts, assemblies and supply chain solutions that simplify their production process. Through technical knowledge, high delivery reliability and personal cooperation, we help customers produce more efficiently and keep growing."
    }
  },
  {
    name: "Huygen",
    logo: "/logos/huygen.png",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Gebouwgebonden installatietechniek", en: "Building services engineering" },
    employees: "~ 80",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://huygen.net/",
    studies: { ee: "yes", mt: "maybe", tbk: "no", tn: "yes", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "traineeship"],
    description: {
      nl: "Huygen is een ingenieurs- en adviesbureau. We zijn gespecialiseerd in het ontwerp van gebouwgebonden installatietechniek, denk aan verwarming, koeling, ventilatie en elektrotechniek.",
      en: "Huygen is an engineering and consultancy firm. We specialise in the design of building services, such as heating, cooling, ventilation and electrical systems."
    }
  },
  {
    name: "Maasstad Ingenieurs B.V.",
    logo: "/logos/maasstad.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "GWW, industriële automatisering in infra", en: "Civil works, industrial automation for infrastructure" },
    employees: "~ 20",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.maasstadingenieurs.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "maybe", ict: "maybe" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "Bij Maasstad Ingenieurs ontwerpen, verbinden en borgen we de slimme infrastructuur van morgen. Van industriële automatisering voor bruggen, tunnels en sluizen tot haalbaarheidsstudies en ontwerpen voor lokale energiesystemen en andere oplossingen voor netcongestie.",
      en: "At Maasstad Ingenieurs we design, connect and safeguard the smart infrastructure of tomorrow. From industrial automation for bridges, tunnels and locks to feasibility studies and designs for local energy systems and other solutions to grid congestion."
    }
  },
  {
    name: "DVP Smart Concepts B.V.",
    logo: "/logos/dvp.png",
    logoTone: "light",
    category: "consultancy",
    industry: { nl: "Installatietechniek", en: "Building services" },
    employees: "~ 17",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://dvpsmartconcepts.nl/",
    studies: { ee: "yes", mt: "no", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "job"],
    description: {
      nl: "Adviesbureau voor technische installaties met focus op duurzaamheid, comfort, haalbaarheid en smart building technologie.",
      en: "Consultancy for technical installations with a focus on sustainability, comfort, feasibility and smart building technology."
    }
  },
  {
    name: "Rijksvastgoedbedrijf",
    logo: "/logos/rijksvastgoedbedrijf.png",
    logoTone: "dark",
    category: "other",
    industry: { nl: "Vastgoed (Rijksoverheid)", en: "Real estate (central government)" },
    employees: "~ 3300",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://www.rijksvastgoedbedrijf.nl/",
    studies: { ee: "yes", mt: "maybe", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "traineeship"],
    description: {
      nl: "Het Rijksvastgoedbedrijf (RVB) beheert, ontwikkelt en onderhoudt het vastgoed van de Rijksoverheid. Van monumentale gebouwen en kantoren tot militaire terreinen en gevangenissen: achter de schermen werken we aan een veilige, duurzame en toekomstbestendige leef- en werkomgeving. Bij het RVB krijg je de kans om met jouw kennis en ideeën impact te maken op Nederland.",
      en: "The Central Government Real Estate Agency (RVB) manages, develops and maintains the Dutch government's property. From monumental buildings and offices to military sites and prisons: behind the scenes we work on a safe, sustainable and future-proof living and working environment. At the RVB you get the chance to make an impact on the Netherlands with your knowledge and ideas."
    }
  },
  {
    name: "InWork",
    logo: "/logos/inwork.png",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Techniek & IT", en: "Engineering & IT" },
    employees: "~ 350",
    location: { nl: "Amsterdam, NL", en: "Amsterdam, NL" },
    website: "https://inwork.nl/",
    studies: { ee: "no", mt: "no", tbk: "no", tn: "yes", tw: "yes", wtb: "no", ict: "maybe" },
    opportunities: ["traineeship", "job"],
    opportunityNote: {
      nl: "InWork biedt kansen voor na het afstuderen, met banen en traineeships.",
      en: "InWork offers opportunities for after graduation, through jobs and traineeships."
    },
    description: {
      nl: "InWork brengt talent (jij) en kansen (opdrachtgevers) samen. Of je nu startend bent of al ervaring hebt, wij vinden de carrière die past bij je ambities.",
      en: "InWork brings talent (you) and opportunities (clients) together. Whether you are just starting out or already experienced, we find the career that fits your ambitions."
    }
  },
  {
    name: "Quooker",
    logo: "/logos/quooker-2026.png",
    category: "technology",
    industry: { nl: "Productontwikkeling en productie", en: "Product development and manufacturing" },
    employees: "~ 1100",
    location: { nl: "Ridderkerk, NL", en: "Ridderkerk, NL" },
    website: "https://www.quooker.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "yes", ict: "yes" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "Bij Quooker ontwikkelen en produceren we slimme producten voor in de keuken, zoals onze kokendwaterkraan. Van mechanische ontwerpen en elektronica tot software en geautomatiseerde productielijnen: we hebben de techniek zelf in huis. Als student krijg je de ruimte om mee te werken aan technische uitdagingen, je ideeën in de praktijk te brengen en te leren van ervaren collega's.",
      en: "At Quooker we develop and manufacture smart kitchen products, such as our boiling-water tap. From mechanical design and electronics to software and automated production lines: we have all the engineering in-house. As a student you get room to work on technical challenges, put your ideas into practice and learn from experienced colleagues."
    }
  },
  {
    name: "Almacon Storage Systems",
    logo: "/logos/almacon.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Engineering van staalconstructies voor magazijnen", en: "Engineering of steel structures for warehouses" },
    employees: "~ 14",
    location: { nl: "Hazerswoude-Dorp, NL", en: "Hazerswoude-Dorp, NL" },
    website: "https://almacon.nl/",
    studies: { ee: "maybe", mt: "maybe", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship"],
    opportunityNote: {
      nl: "We hebben een meewerkstage openstaan.",
      en: "We have a work placement internship open."
    },
    description: {
      nl: "Almacon Storage Systems BV is gespecialiseerd in het ontwerpen van dragende constructies in magazijnen en opslaglocaties.",
      en: "Almacon Storage Systems BV specialises in designing load-bearing structures for warehouses and storage facilities."
    }
  },
  {
    name: "Rubber Design B.V.",
    logo: "/logos/rubberdesign.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Maritiem, jachtbouw en industrie", en: "Maritime, yachting and industrial" },
    employees: "~ 140",
    location: { nl: "Heerjansdam, NL", en: "Heerjansdam, NL" },
    website: "https://www.rubberdesign.nl/",
    studies: { ee: "no", mt: "no", tbk: "no", tn: "yes", tw: "no", wtb: "yes", ict: "no" },
    opportunities: ["internship"],
    description: {
      // Submitted in English; the Dutch is a translation.
      nl: "Rubber Design is gespecialiseerd in anti-trillingstechniek. We bestrijden trillings- en geluidsproblemen door de bron van de verstoring te isoleren.",
      en: "Rubber Design specializes in anti-vibration technology. We combat vibration and noise problems by isolating the source of the disturbance."
    }
  },
  {
    name: "Emmett Green Engineering",
    logo: "/logos/emmett.png",
    logoTone: "light",
    category: "energy-transition",
    industry: { nl: "Energie-engineering", en: "Energy engineering" },
    employees: "~ 20",
    location: { nl: "Delft, NL", en: "Delft, NL" },
    website: "https://engineering.emmettgreen.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "job"],
    opportunityNote: {
      nl: "Wij zijn op zoek naar nieuwe collega's, stagiairs en afstudeerders.",
      en: "We are looking for new colleagues, interns and graduation students."
    },
    description: {
      nl: "Emmett Green Engineering helpt organisaties bij projecten rondom elektriciteit en energie. Wij denken mee over veilige, betrouwbare en duurzame oplossingen, bijvoorbeeld wanneer een bedrijf meer elektriciteit nodig heeft of wil verduurzamen. Van het eerste idee tot de uitvoering zorgen wij voor een duidelijk en praktisch technisch plan.",
      en: "Emmett Green Engineering helps organisations with projects around electricity and energy. We help find safe, reliable and sustainable solutions, for instance when a company needs more electricity or wants to become more sustainable. From the first idea to execution, we provide a clear and practical technical plan."
    }
  },
  {
    name: "Energy Solutions B.V.",
    logo: "/logos/EnergySolutions.svg",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Energietechniek, hoogspanning, duurzame energie", en: "Power engineering, high voltage, renewable energy" },
    employees: "~ 24",
    location: { nl: "Delft, NL", en: "Delft, NL" },
    website: "https://www.ensol.nl/",
    studies: { ee: "yes", mt: "no", tbk: "maybe", tn: "no", tw: "maybe", wtb: "no", ict: "maybe" },
    opportunities: ["internship", "graduation"],
    opportunityNote: {
      nl: "Wij staan altijd open om in samenwerking met de HHS een stage- of afstudeeropdracht te organiseren.",
      en: "We are always open to setting up an internship or graduation project together with THUAS."
    },
    description: {
      nl: "Energy Solutions is een specialistisch en dynamisch ingenieursbureau, met uitgebreide ervaring in engineering en consultancy op het gebied van hoogspanning en elektrische energietechniek.",
      en: "Energy Solutions is a specialist, dynamic engineering firm with extensive experience in engineering and consultancy in high voltage and electrical power engineering."
    }
  },
  {
    name: "Logiqs B.V.",
    logo: "/logos/logiqs-2026.png",
    logoTone: "light",
    category: "technology",
    industry: { nl: "Automatisering voor tuinbouw en logistiek", en: "Automation for horticulture and logistics" },
    employees: "~ 60",
    location: { nl: "Maasdijk, NL", en: "Maasdijk, NL" },
    website: "https://www.logiqs.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "yes", tw: "maybe", wtb: "yes", ict: "yes" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "Wij zijn Logiqs en we werken aan de meest geavanceerde automatiseringssystemen ter wereld voor de tuinbouw, vertical farming en magazijnlogistiek.",
      en: "We are Logiqs, and we work on the most advanced automation systems in the world for horticulture, vertical farming and warehouse logistics."
    }
  },
  {
    name: "RH Marine Netherlands B.V.",
    logo: "/logos/RHmarine.svg",
    logoTone: "dark",
    category: "defence",
    industry: { nl: "Maritiem", en: "Maritime" },
    employees: "~ 500",
    location: { nl: "Schiedam, NL", en: "Schiedam, NL" },
    website: "https://werkenbijrhmarine.com/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "no", tw: "no", wtb: "maybe", ict: "maybe" },
    opportunities: ["internship", "graduation"],
    opportunityNote: {
      nl: "Hier staan we altijd voor open, maar dit soort trajecten zijn erg populair, dus wees er snel bij om kans te maken op een plek.",
      en: "We are always open to this, but these placements are very popular, so be quick to have a chance at a spot."
    },
    description: {
      nl: "RH Marine ontwikkelt en integreert elektrotechnische systemen en automatiseringsoplossingen voor marineschepen en superjachten. Van energievoorziening en navigatie tot de bediening en bewaking van systemen aan boord: we zorgen dat alles betrouwbaar samenwerkt. Dat doen we vanaf het ontwerp en de bouw tot het onderhoud en de modernisering van schepen.",
      en: "RH Marine develops and integrates electrical systems and automation solutions for naval vessels and superyachts. From power supply and navigation to the control and monitoring of on-board systems: we make sure everything works together reliably. We do this from design and build through to the maintenance and modernisation of ships."
    }
  },
  {
    name: "Mammoet",
    logo: "/logos/mammoet-2026.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Logistiek & transport (heavy lifting)", en: "Logistics & transport (heavy lifting)" },
    employees: { nl: "~ 5000 wereldwijd", en: "~ 5,000 worldwide" },
    location: { nl: "Schiedam, NL", en: "Schiedam, NL" },
    website: "https://www.mammoet.com/",
    studies: { ee: "maybe", mt: "maybe", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "maybe" },
    opportunities: ["internship"],
    opportunityNote: { nl: "Engineeringstages.", en: "Engineering internships." },
    description: {
      nl: "Mammoet is wereldleider op het gebied van heavy lifting & transport. Met bestaand equipment bedenken we continu de beste en veiligste oplossing voor de klant.",
      en: "Mammoet is the world leader in heavy lifting & transport. Using existing equipment, we continually devise the best and safest solution for the client."
    }
  },
  {
    name: "Verkade Klimaat",
    logo: "/logos/verkade.png",
    logoTone: "dark",
    category: "installation",
    industry: { nl: "Klimaattechniek", en: "Climate control engineering" },
    employees: "~ 90",
    location: { nl: "Wateringen, NL", en: "Wateringen, NL" },
    website: "https://www.verkadeklimaat.nl/",
    studies: { ee: "no", mt: "no", tbk: "no", tn: "maybe", tw: "maybe", wtb: "yes", ict: "no" },
    opportunities: ["job"],
    description: {
      nl: "Gemiddeld, daar doen we het niet voor. We zijn klimaatwinnaars. Mondje dicht, aanpakken, en in één rechte lijn op ons doel af. We zoeken simpelweg naar de allerbeste en meest solide klimaatoplossing, hoe complex die ook mag klinken. Want we zijn vakidioten met lef. En een tikje eigenwijs.",
      en: "Average is not what we do it for. We are climate winners. Heads down, get to work, and straight for the goal. We simply look for the very best and most solid climate solution, however complex it may sound. Because we are craft fanatics with nerve. And a little bit headstrong."
    }
  },
  {
    name: "TechniekMatch",
    logo: "/logos/techniekmatch.png",
    logoTone: "dark",
    category: "recruitment",
    industry: {
      nl: "Techniekbreed; focus op installatietechniek en ondergrondse infra",
      en: "All of engineering; focus on building services and underground infrastructure"
    },
    employees: "~ 180",
    location: { nl: "Amsterdam, NL", en: "Amsterdam, NL" },
    website: "https://www.techniekmatch.com/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "no", tw: "no", wtb: "yes", ict: "maybe" },
    opportunities: ["traineeship", "job"],
    opportunityNote: { nl: "Bijbanen, traineeships en startersbanen.", en: "Side jobs, traineeships and starter jobs." },
    description: {
      nl: "Als technisch uitzendbureau verbinden wij technische studenten en professionals met bedrijven die de toekomst bouwen. Onze missie: technisch talent koppelen aan innovatieve organisaties en bijdragen aan duurzame groei. Wij bieden niet zomaar een baan, maar een startpunt voor sterke carrières in de techniek.",
      en: "As a technical staffing agency, we connect technical students and professionals with companies that are building the future. Our mission: matching technical talent with innovative organisations and contributing to sustainable growth. We don't just offer a job, but a starting point for strong careers in engineering."
    }
  },
  {
    name: "Certhon",
    logo: "/logos/certhon.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Tuinbouwsector", en: "Horticulture" },
    employees: "~ 130",
    location: { nl: "Poeldijk, NL", en: "Poeldijk, NL" },
    website: "https://certhon.com/nl/",
    studies: { ee: "yes", mt: "maybe", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "no" },
    opportunities: ["internship", "graduation", "job"],
    opportunityNote: {
      nl: "We bieden mogelijkheden in zowel stageopdrachten als afstuderen en kijken na het afstuderen ook altijd of er een mogelijkheid is voor een startersfunctie.",
      en: "We offer both internship and graduation projects, and after graduation we always look at whether a starter position is possible."
    },
    description: {
      nl: "Certhon realiseert complete hoogwaardige glastuinbouwprojecten. We integreren kasconstructie, klimaatinstallaties, irrigatie, belichting, energiesystemen, opkweek en automatisering tot één optimale teeltomgeving. Doordat alle systemen naadloos samenwerken, krijgen telers voor hun gewas de beste omstandigheden om maximaal te presteren.",
      en: "Certhon delivers complete, high-quality greenhouse projects. We integrate greenhouse construction, climate systems, irrigation, lighting, energy systems, propagation and automation into one optimal growing environment. Because all systems work together seamlessly, growers get the best conditions for their crops to perform at their peak."
    }
  },
  {
    name: "Dosign Engineering",
    // No logo came in with the form; this one is from their website.
    logo: "/logos/dosign.svg",
    logoTone: "light",
    category: "recruitment",
    industry: {
      nl: "Engineering en projectmanagement in energie, infra, industrie, installatietechniek en machinebouw",
      en: "Engineering and project management in energy, infrastructure, industry, building services and machine building"
    },
    // The form said 2, which is not their real size; left out until confirmed.
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.dosign.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "no", tw: "no", wtb: "yes", ict: "no" },
    opportunities: ["internship", "graduation", "traineeship", "job"],
    opportunityNote: {
      nl: "Stages, afstudeeropdrachten, traineeships, duale hbo-trajecten en startersfuncties binnen engineering en techniek.",
      en: "Internships, graduation projects, traineeships, work-study bachelor's tracks and starter positions in engineering and technology."
    },
    description: {
      nl: "Dosign Engineering helpt technische studenten en professionals aan een passende plek binnen de techniek. Wij bieden persoonlijke begeleiding en verbinden talent aan uitdagende projecten bij technische bedrijven binnen onder andere elektrotechniek, werktuigbouwkunde, energie, infrastructuur en industrie.",
      en: "Dosign Engineering helps technical students and professionals find the right place in engineering. We offer personal guidance and connect talent with challenging projects at technical companies in fields including electrical engineering, mechanical engineering, energy, infrastructure and industry."
    }
  },
  {
    name: "KERN Engineers",
    logo: "/logos/kernengineers.png",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Detachering", en: "Technical secondment" },
    employees: "~ 30",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://www.kernengineers.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "yes", tw: "maybe", wtb: "maybe", ict: "maybe" },
    opportunities: ["job"],
    opportunityNote: { nl: "Mooie startersfuncties na het afstuderen.", en: "Great starter positions after graduation." },
    description: {
      nl: "KERN Engineers is een detacheringsbureau voor hoogopgeleid technisch personeel. Voor ons draait het om de juiste engineer in de juiste rol. We gaan op zoek naar een échte match, niet alleen wat aansluit bij je cv.",
      en: "KERN Engineers is a secondment agency for highly educated technical staff. For us, it's all about the right engineer in the right role. We look for a real match, not just what fits your CV."
    }
  },
  {
    name: "Schulte en Lestraden B.V.",
    logo: "/logos/schulte.png",
    logoTone: "dark",
    category: "installation",
    industry: { nl: "Utiliteit", en: "Commercial buildings" },
    employees: "~ 160",
    location: { nl: "Lisse, NL", en: "Lisse, NL" },
    website: "https://senl.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation"],
    description: {
      nl: "Installatiebedrijf voor gebouwinstallaties.",
      en: "Installation company for building services."
    }
  },
  {
    name: "Fluor B.V.",
    // No logo came in with the form; this one is from their website.
    logo: "/logos/fluor.png",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Onder andere energie, life sciences en infrastructuur", en: "Energy, life sciences and infrastructure, among others" },
    employees: { nl: "~ 24.000 wereldwijd", en: "~ 24,000 worldwide" },
    location: { nl: "Hoofddorp, NL", en: "Hoofddorp, NL" },
    website: "https://www.fluor.com/",
    studies: { ee: "yes", mt: "yes", tbk: "maybe", tn: "maybe", tw: "no", wtb: "yes", ict: "yes" },
    opportunities: ["internship", "job"],
    opportunityNote: { nl: "Stage en juniorposities.", en: "Internships and junior positions." },
    description: {
      nl: "Wij ontwerpen, bouwen en onderhouden industriële faciliteiten. Door multidisciplinaire, diepgaande technische expertise te combineren met duurzaamheid, bouwkennis en projectmanagement, realiseren wij de grootste en meest complexe industriële projecten. Onze internationale teams realiseren projecten met wereldwijde impact, van het eerste ontwerp tot de laatste bout.",
      en: "We design, build and maintain industrial facilities. By combining deep, multidisciplinary technical expertise with sustainability, construction knowledge and project management, we deliver the largest and most complex industrial projects. Our international teams deliver projects with global impact, from the first design to the last bolt."
    }
  },
  {
    name: "Continu Professionals",
    logo: "/logos/continu.png",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Techniek (detachering)", en: "Engineering (secondment)" },
    employees: "~ 250",
    location: { nl: "Capelle aan den IJssel, NL", en: "Capelle aan den IJssel, NL" },
    website: "https://www.continu.nl/",
    studies: { ee: "yes", mt: "yes", tbk: "yes", tn: "yes", tw: "yes", wtb: "yes", ict: "yes" },
    opportunities: ["job"],
    opportunityNote: { nl: "Mooie startplekken binnen de techniek.", en: "Great starting positions in engineering." },
    description: {
      nl: "Technische detacheerder in Zuid-Holland.",
      en: "Technical secondment agency in South Holland."
    }
  },
  {
    name: "Hoppenbrouwers Barendrecht",
    logo: "/logos/hoppenbrouwers.png",
    logoTone: "dark",
    category: "installation",
    industry: { nl: "Industriële automatisering", en: "Industrial automation" },
    employees: { nl: "~ 2500 landelijk", en: "~ 2,500 nationwide" },
    location: { nl: "Barendrecht, NL", en: "Barendrecht, NL" },
    website: "https://www.werkenbijhoppenbrouwers.nl/vestigingen/werken-in-barendrecht/",
    studies: { ee: "yes", mt: "maybe", tbk: "no", tn: "no", tw: "no", wtb: "maybe", ict: "no" },
    opportunities: ["internship", "graduation", "traineeship"],
    description: {
      nl: "Hoppenbrouwers Barendrecht is een echte specialist in de industriële automatisering. Van complete nieuwbouw tot grondige renovaties en kleine aanpassingen. Wij maken op maat gemaakte hard- en softwareoplossingen voor de besturing van grote installaties in de sectoren water en industrie.",
      en: "Hoppenbrouwers Barendrecht is a true specialist in industrial automation. From complete new builds to thorough renovations and small adjustments. We make custom hardware and software solutions for controlling large installations in the water and industrial sectors."
    }
  },
  {
    name: "Conscia Nederland",
    // No logo came in with the form; this one is from their website.
    logo: "/logos/conscia.png",
    logoTone: "light",
    category: "technology",
    industry: { nl: "IT-netwerken en security", en: "IT networking and security" },
    employees: "~ 300",
    location: { nl: "Gouda, NL", en: "Gouda, NL" },
    website: "https://www.conscia.com/nl/",
    studies: { ee: "no", mt: "no", tbk: "no", tn: "no", tw: "no", wtb: "no", ict: "yes" },
    opportunities: ["internship", "graduation", "job"],
    description: {
      nl: "Bij Conscia werken we aan de digitale wereld van morgen. We ontwerpen, bouwen en beheren veilige IT-oplossingen op het gebied van networking, cybersecurity en cloud. Als stagiair werk je mee aan echte opdrachten en leer je van ervaren IT-specialisten. Zo ontdek je waar jouw talent ligt en geef je jouw carrière een vliegende start.",
      en: "At Conscia we work on the digital world of tomorrow. We design, build and manage secure IT solutions in networking, cybersecurity and cloud. As an intern you work on real assignments and learn from experienced IT specialists. That way you discover where your talent lies and give your career a flying start."
    }
  },
  {
    name: "Osbit",
    logo: "/logos/osbit.png",
    logoTone: "light",
    category: "engineering",
    industry: { nl: "Offshore equipment", en: "Offshore equipment" },
    employees: { nl: "230 (VK), 15 (NL)", en: "230 (UK), 15 (NL)" },
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.osbit.com/",
    studies: { ee: "maybe", mt: "yes", tbk: "maybe", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "graduation", "traineeship"],
    description: {
      nl: "Osbit levert op maat gemaakt equipment dat door onze klanten, veelal aannemers, gebruikt wordt voor de constructie van offshore windparken. Wij werken intensief samen met onze klanten en ontwerpen en leveren baanbrekend equipment voor verschillende toepassingen, zoals het leggen, begraven en repareren van kabels op de zeebodem en het hanteren en hijsen van funderingen zoals monopiles en jackets.",
      en: "Osbit supplies custom-built equipment that our clients, mostly contractors, use to construct offshore wind farms. We work closely with our clients to design and deliver ground-breaking equipment for a range of applications, such as laying, burying and repairing cables on the seabed and handling and lifting foundations such as monopiles and jackets."
    }
  },
  {
    name: "Red Point Alloys B.V.",
    // No logo came in with the form. Red Point is a Flowserve brand and its
    // website is a Flowserve page, so this is the Flowserve logo.
    logo: "/logos/flowserve.svg",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Metaalindustrie / werktuigbouwkunde (industriële afsluiters)", en: "Metal industry / mechanical engineering (industrial valves)" },
    employees: "~ 40",
    location: { nl: "Zoetermeer, NL", en: "Zoetermeer, NL" },
    website: "https://www.flowserve.com/products/brands/red-point/",
    studies: { ee: "maybe", mt: "maybe", tbk: "yes", tn: "maybe", tw: "maybe", wtb: "yes", ict: "maybe" },
    opportunities: ["internship", "job"],
    opportunityNote: { nl: "Stage en werkplek.", en: "Internships and jobs." },
    description: {
      nl: "Red Point Alloys B.V. in Zoetermeer ontwerpt en produceert industriële afsluiters op maat voor klanten over de hele wereld. Wij combineren engineering, materiaalkennis en productie om oplossingen te bieden voor uitdagende technische toepassingen. We zoeken enthousiaste stagiairs en afgestudeerden die hun kennis in de praktijk willen brengen en samen met ons willen werken aan technische oplossingen.",
      en: "Red Point Alloys B.V. in Zoetermeer designs and manufactures custom industrial valves for clients around the world. We combine engineering, materials expertise and production to deliver solutions for demanding technical applications. We are looking for enthusiastic interns and graduates who want to put their knowledge into practice and work with us on technical solutions."
    }
  }
]);
