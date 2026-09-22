// ─────────────────────────────────────────────────────────────────────────────
//  MARCH 2026  —  COMPANY LIST        *** FROZEN ARCHIVE — DO NOT EDIT ***
//
//  This edition has already taken place. The list below is a historical record
//  of who actually attended on 5 March 2026. Changing it rewrites history.
//
//  Working on the upcoming edition? Edit
//      src/editions/november-2026/data/companies.js
//  instead. The format is documented there.
// ─────────────────────────────────────────────────────────────────────────────
import { normalizeCompanies } from "../../../shared/companyData.js";

export const MARCH_2026_COMPANIES = normalizeCompanies([
  {
    id: "berkel-industrial-b-v",
    name: "Berkel Industrial B.V.",
    logo: "/logos/berkel.svg",
    logoTone: "light",
    category: "engineering",
    industry: { nl: "Machinebouw / industriële engineering", en: "Machine building / industrial engineering" },
    employees: "~ 15",
    location: { nl: "Berkel en Rodenrijs, NL", en: "Berkel en Rodenrijs, NL" },
    website: "https://www.berkelindustrial.com/en/",
    stand: 1,
    description: {
      nl: "Partner in seriematige machinebouw; ondersteunt machinebouwers met technische oplossingen en supply chain ondersteuning.",
      en: "Partner in serial machine building, supporting machine builders with technical solutions and supply chain support."
    }
  },
  {
    id: "verebus-engineering-b-v",
    name: "Verebus Engineering B.V.",
    logo: "/logos/verebus.png",
    logoTone: "light",
    category: "consultancy",
    industry: { nl: "Asset management / technische documentatie", en: "Asset management / technical documentation" },
    employees: "N/A",
    location: { nl: "Rijswijk, NL", en: "Rijswijk, NL" },
    website: "https://verebus.nl/",
    stand: 2,
    description: {
      nl: "Technische dienstverlener gespecialiseerd in asset management en technische documentatie over de volledige asset lifecycle.",
      en: "Technical service provider specialized in asset management and technical documentation across the full asset lifecycle."
    }
  },
  {
    id: "technip-energies",
    name: "Technip Energies",
    logo: "/logos/technip.webp",
    category: "engineering",
    industry: { nl: "Energie engineering / EPC", en: "Energy engineering / EPC" },
    employees: "N/A",
    location: { nl: "Amsterdam, NL", en: "Amsterdam, NL" },
    website: "https://www.ten.com/en",
    stand: 3,
    description: {
      nl: "Engineering- en technologiebedrijf voor energie-infrastructuur en de energietransitie.",
      en: "Engineering and technology company delivering solutions for energy infrastructure and the energy transition."
    }
  },
  {
    id: "tempcontrol-b-v",
    name: "Tempcontrol B.V.",
    logo: "/logos/tempcontrol.svg",
    category: "technology",
    industry: { nl: "Instrumentatie / sensoren", en: "Instrumentation / sensors" },
    employees: "~ 11 - 50",
    location: { nl: "Nootdorp, NL", en: "Nootdorp, NL" },
    website: "https://www.tempcontrol.nl/en/",
    stand: 4,
    description: {
      nl: "Fabrikant van nauwkeurige temperatuursensoren en meetapparatuur voor meten, regelen en registreren van temperatuur en luchtvochtigheid.",
      en: "Manufacturer of high-accuracy temperature sensors and equipment for measuring, controlling and recording temperature and humidity."
    }
  },
  {
    id: "halmos-adviseurs",
    name: "Halmos Adviseurs",
    logo: "/logos/halmos.svg",
    logoTone: "light",
    category: "consultancy",
    industry: { nl: "Installatieadvies / building services", en: "Building services engineering" },
    employees: "N/A",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://halmos.nl/",
    stand: 5,
    description: {
      nl: "Onafhankelijk adviesbureau voor gebouwgebonden installaties met focus op duurzaamheid, energie efficiëntie en comfort binnen budget.",
      en: "Independent consultancy for building services installations, focusing on sustainability, energy efficiency and user comfort."
    }
  },
  {
    id: "dvp-smart-concepts-b-v",
    name: "DVP Smart Concepts B.V.",
    logo: "/logos/dvp.png",
    logoTone: "light",
    category: "consultancy",
    industry: { nl: "Installatieadvies / smart buildings", en: "Building services consultancy / smart buildings" },
    employees: "~ 10",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://dvpsmartconcepts.nl/",
    stand: 6,
    description: {
      nl: "Adviesbureau voor technische installaties met focus op duurzaamheid, comfort, haalbaarheid en smart building technologie.",
      en: "Consultancy for technical installations with a focus on sustainability, comfort, feasibility and smart building solutions."
    }
  },
  {
    id: "energy-solutions-b-v",
    name: "Energy Solutions B.V.",
    logo: "/logos/EnergySolutions.svg",
    logoTone: "dark",
    category: "engineering",
    industry: { nl: "Hoogspanning / power systems", en: "High-voltage / power systems" },
    employees: "N/A",
    location: { nl: "Delft, NL", en: "Delft, NL" },
    website: "https://www.ensol.nl/en/",
    stand: 7,
    description: {
      nl: "Engineering & consultancy in elektrische energietechniek, met focus op hoogspanning en energieprojecten.",
      en: "Engineering and consultancy company specialized in electrical power systems and high-voltage infrastructure."
    }
  },
  {
    id: "sasja-careers-b-v",
    name: "SASJA careers B.V.",
    logo: "/logos/Sasja.svg",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Recruitment / staffing (technisch)", en: "Recruitment / staffing (technical)" },
    employees: "N/A",
    location: { nl: "Aalsmeer, NL", en: "Aalsmeer, NL" },
    website: "https://www.sasja-careers.nl/",
    stand: 8,
    description: {
      nl: "Recruitmentbureau dat technisch talent matcht met functies in engineering en techniek.",
      en: "Recruitment agency connecting technical talent with engineering and technology-focused organizations."
    }
  },
  {
    id: "comaen",
    name: "Comaen",
    logo: "/logos/comaen.svg",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Technische recruitment (industriële automatisering, E&I, werktuigbouw)", en: "Technical recruitment (industrial automation, E&I, mechanical, process)" },
    employees: "51-200",
    location: { nl: "Haarlem, NL", en: "Haarlem, NL" },
    website: "https://www.comaen.nl/",
    stand: 28,
    description: {
      nl: "Recruitment specialist voor technische professionals in industriële automatisering, werktuigbouw, proces en E&I.",
      en: "Recruitment specialist for technical professionals across industrial automation, mechanical, process, and electrical & instrumentation disciplines."
    }
  },
  {
    id: "wepro",
    name: "Wepro",
    logo: "/logos/wepro.png",
    category: "engineering",
    industry: { nl: "Engineering services", en: "Engineering services" },
    employees: "~ 501 -1000",
    location: { nl: "Arnhem, NL", en: "Arnhem, NL" },
    website: "https://wepro.nl/",
    stand: 9,
    description: {
      nl: "Engineeringdienstverlener actief in mechanical, electrical, industrial automation en installatie-techniek.",
      en: "Engineering service provider active in mechanical, electrical, industrial automation and installation technology."
    }
  },
  {
    id: "emmett-green-engineering-b-v",
    name: "Emmett Green Engineering B.V.",
    logo: "/logos/emmett.png",
    logoTone: "light",
    category: "energy-transition",
    industry: { nl: "Elektrotechniek / energietransitie", en: "Electrical engineering / energy transition" },
    employees: "~ 11 - 50",
    location: { nl: "Delft, NL", en: "Delft, NL" },
    website: "https://emmettgreen.nl/",
    stand: 10,
    description: {
      nl: "Engineeringbedrijf gericht op de energietransitie, o.a. elektrotechnische ontwerpen voor industrie en netprojecten.",
      en: "Engineering company focused on the energy transition, delivering electrical designs for industry and grid-related projects."
    }
  },
  {
    id: "siemens-nederland-n-v",
    name: "Siemens Nederland N.V.",
    logo: "/logos/Siemens.png",
    category: "technology",
    industry: { nl: "Industrie / energie / automatisering", en: "Industry / energy / automation" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://www.siemens.com/nl/en.html",
    stand: 11,
    description: {
      nl: "Technologiebedrijf actief in o.a. industrie, infrastructuur, energie en digitalisering.",
      en: "Global technology company active in industry, infrastructure, energy and digitalization."
    }
  },
  {
    id: "kern-engineers",
    name: "KERN Engineers",
    logo: "/logos/kernengineers.png",
    category: "recruitment",
    industry: { nl: "Recruitment / staffing (engineering)", en: "Recruitment / staffing (engineering)" },
    employees: "N/A",
    location: { nl: "Den Haag, NL", en: "The Hague, NL" },
    website: "https://kernengineers.nl/",
    stand: 12,
    description: {
      nl: "Technisch recruitment- en detacheringsbureau voor engineers en technische organisaties.",
      en: "Technical recruitment and secondment agency connecting engineers with technical organizations."
    }
  },
  {
    id: "sweco-nederland-b-v",
    name: "Sweco Nederland B.V.",
    logo: "/logos/sweco.png",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Engineering & architectuur consultancy", en: "Engineering & architecture consultancy" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://www.sweco.nl/",
    stand: 13,
    description: {
      nl: "Ingenieurs- en architectenadviesbureau voor duurzame steden, infrastructuur en gebouwen.",
      en: "Architecture and engineering consultancy working on sustainable cities, infrastructure and buildings."
    }
  },
  {
    id: "iv",
    name: "Iv",
    logo: "/logos/IV.svg",
    logoTone: "light",
    category: "consultancy",
    industry: { nl: "Engineering consultancy", en: "Engineering consultancy" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://www.iv.nl/en/",
    stand: 14,
    description: {
      nl: "Ingenieurs- en adviesbureau voor o.a. infrastructuur, offshore & energy, maritime, industrie en gebouwen.",
      en: "Engineering and consultancy firm active in infrastructure, offshore & energy, maritime, industry and buildings."
    }
  },
  {
    id: "van-oord",
    name: "Van Oord",
    logo: "/logos/vanoord.svg",
    logoTone: "light",
    category: "engineering",
    industry: { nl: "Maritieme aannemer / offshore", en: "Marine contracting / offshore" },
    employees: "N/A",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.vanoord.com/en/",
    stand: 15,
    description: {
      nl: "Internationale maritieme aannemer actief in baggeren, offshore en infrastructuurprojecten.",
      en: "International marine contractor specializing in dredging, offshore and infrastructure projects."
    }
  },
  {
    id: "dcmr-environmental-protection-agency-rijnmond",
    name: "DCMR Environmental Protection Agency Rijnmond",
    logo: "/logos/DCMR.svg",
    category: "other",
    industry: { nl: "Public environmental authority", en: "Public environmental authority" },
    employees: "N/A",
    location: { nl: "Rijnmond region, NL", en: "Rijnmond region, NL" },
    website: "https://www.dcmr.nl/",
    stand: 16,
    description: {
      nl: "Regional environmental authority responsible for permits, inspections, monitoring and environmental advice.",
      en: "Regional environmental authority responsible for permits, inspections, monitoring and environmental advice."
    }
  },
  {
    id: "bilfinger-engineering-consultancy",
    name: "Bilfinger Engineering & Consultancy",
    logo: "/logos/bilfinger.svg",
    category: "consultancy",
    industry: { nl: "IndustriÃ«le engineering & consultancy", en: "Industrial engineering & consultancy" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://www.bilfinger.com/en/nl/",
    stand: 17,
    description: {
      nl: "Multidisciplinaire engineering- en consultancyservices voor industrie- en energieprojecten.",
      en: "Multidisciplinary engineering and consultancy services for industrial and energy-related projects."
    }
  },
  {
    id: "abb-b-v",
    name: "ABB B.V.",
    logo: "/logos/ABB.png",
    category: "technology",
    industry: { nl: "Elektrificatie / automatisering", en: "Electrification / automation" },
    employees: "N/A",
    location: { nl: "NL / Benelux", en: "Netherlands / Benelux" },
    website: "https://new.abb.com/benelux",
    stand: 18,
    description: {
      nl: "Technologiebedrijf in elektrificatie en automatisering voor efficiëntere en duurzamere industrie.",
      en: "Technology leader in electrification and automation enabling more efficient and sustainable industry."
    }
  },
  {
    id: "quooker",
    name: "Quooker",
    logo: "/logos/quooker.svg",
    category: "technology",
    industry: { nl: "Consumentenproducten / keukenapparatuur", en: "Consumer products / kitchen appliances" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://www.quooker.com/",
    stand: 19,
    description: {
      nl: "Producent van de kokendwaterkraan (en varianten met gekoeld/bruisend) voor keukeninnovatie en efficiÃ«ntie.",
      en: "Manufacturer of boiling-water kitchen taps and related systems focused on innovation and efficiency."
    }
  },
  {
    id: "the-confettimaker",
    name: "The Confettimaker",
    logo: "/logos/confetti.png",
    logoTone: "dark",
    category: "other",
    industry: { nl: "TBD", en: "TBD" },
    employees: "N/A",
    location: { nl: "TBD", en: "TBD" },
    website: "https://www.theconfettimaker.com/",
    stand: 20,
    description: {
      nl: "TBD",
      en: "TBD"
    }
  },
  {
    id: "de-nationale-carrierebeurs",
    name: "De Nationale Carrierebeurs",
    logo: "/logos/nationale-carrierebeurs.png",
    logoTone: "dark",
    category: "recruitment",
    industry: { nl: "Carriere-evenement / student employability", en: "Career event organization / student employability" },
    employees: "N/A",
    location: { nl: "Nederland", en: "Netherlands" },
    website: "https://www.carrierebeurs.nl/",
    stand: null,
    description: {
      nl: "De eerste indruk telt, zeker bij een sollicitatie. Daarom maken wij professionele LinkedIn-foto's van studenten, zodat zij zichzelf sterk en verzorgd kunnen presenteren aan toekomstige werkgevers. Daarnaast zijn wij de trotse organisator van De Nationale Carrierebeurs op 24 en 25 april 2026, het carriere-evenement van Nederland. Tijdens deze dagen nodigen wij studenten uit om zich te orienteren op de arbeidsmarkt, te netwerken met toonaangevende werkgevers en misschien wel hun eerste baan te vinden. Samen zetten we de stap van studie naar carriere. Jij maakt de indruk, wij maken de foto. De Nationale Carrierebeurs!",
      en: "Organizer of De Nationale Carrierebeurs (24 & 25 April 2026), where students explore the job market, network with leading employers, and connect to first-job opportunities. Also provides professional LinkedIn profile photos for students."
    }
  },
  {
    id: "schulte-en-lestraden-b-v",
    name: "Schulte en Lestraden B.V.",
    logo: "/logos/schulte.png",
    category: "other",
    industry: { nl: "Installatietechniek (MEP)", en: "Building services / MEP contractor" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://senl.nl/",
    stand: 21,
    description: {
      nl: "Installatiebedrijf met services in E/W, meet- en regeltechniek, ontwerp, realisatie en onderhoud.",
      en: "Installation company providing electrical, mechanical, measurement & control services from design to maintenance."
    }
  },
  {
    id: "rh-marine-netherlands-b-v",
    name: "RH Marine Netherlands B.V.",
    logo: "/logos/RHmarine.svg",
    logoTone: "dark",
    category: "defence",
    industry: { nl: "Maritieme systeemintegratie", en: "Maritime system integration" },
    employees: "~ 201–500",
    location: { nl: "Schiedam, NL", en: "Schiedam, NL" },
    website: "https://rhmarine.com/",
    stand: 22,
    description: {
      nl: "Systeemintegrator voor maritieme elektrotechniek en automatisering; maatwerkoplossingen voor complexe schepen.",
      en: "System integrator delivering electrical and automation solutions for complex maritime vessels."
    }
  },
  {
    id: "hanab-energy-solutions",
    name: "Hanab Energy Solutions",
    logo: "/logos/hanab.svg",
    category: "energy-transition",
    industry: { nl: "Hoogspanningsinfrastructuur / energiediensten", en: "High-voltage infrastructure / energy services" },
    employees: "N/A",
    location: { nl: "Rotterdam, NL", en: "Rotterdam, NL" },
    website: "https://www.hanab.nl/energy-solutions/en",
    stand: 23,
    description: {
      nl: "Ondersteunt hoogspanningsinfrastructuur: advies, engineering, uitvoering, onderhoud en optimalisatie voor de energietransitie.",
      en: "Supports high-voltage energy infrastructure with consultancy, engineering, execution and maintenance services."
    }
  },
  {
    id: "silicon-theatre-scenery",
    name: "Silicon theatre scenery",
    logo: "/logos/sts.webp",
    category: "other",
    industry: { nl: "TBD", en: "TBD" },
    employees: "N/A",
    location: { nl: "TBD", en: "TBD" },
    website: "https://stsonstage.com/",
    stand: 24,
    description: {
      nl: "TBD",
      en: "TBD"
    }
  },
  {
    id: "smits-zevenhuizen",
    name: "Smits Zevenhuizen",
    logo: "/logos/smits.png",
    category: "other",
    industry: { nl: "TBD", en: "TBD" },
    employees: "N/A",
    location: { nl: "TBD", en: "TBD" },
    website: "#",
    stand: 25,
    description: {
      nl: "TBD",
      en: "TBD"
    }
  },
  {
    id: "peutz",
    name: "Peutz",
    logo: "/logos/peutz.svg",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Engineering consultancy (akoestiek/bouwfysica)", en: "Engineering consultancy (acoustics/building physics)" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://peutz.nl/",
    stand: 26,
    description: {
      nl: "Adviesbureau in akoestiek, bouwfysica, milieu, duurzaamheid en geveltechniek.",
      en: "Engineering consultancy specializing in acoustics, building physics, environmental technology and sustainability."
    }
  },
  {
    id: "flux-partners",
    name: "Flux Partners",
    logo: "/logos/flux.svg",
    logoTone: "dark",
    category: "consultancy",
    industry: { nl: "Consultancy (tender & project support)", en: "Consultancy (tender & project support)" },
    employees: "N/A",
    location: { nl: "NL", en: "Netherlands" },
    website: "https://flux.partners/en/",
    stand: 27,
    description: {
      nl: "Consultancy voor tenders en projectbeheersing binnen infrastructuur, bouw en energie.",
      en: "Consultancy supporting tenders and project delivery within infrastructure, construction and energy."
    }
  },
]);
