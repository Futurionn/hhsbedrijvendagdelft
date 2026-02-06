function inferCategory(industry) {
  const s = String(industry ?? "").toLowerCase();

  if (s.includes("defence") || s.includes("defense") || s.includes("military")) return "defence";
  if (s.includes("energy transition") || s.includes("energietransitie")) return "energy-transition";
  if (s.includes("recruit") || s.includes("staff")) return "recruitment";
  if (s.includes("consult")) return "consultancy";
  if (s.includes("install") || s.includes("e&i")) return "installation";
  if (
    s.includes("automation") ||
    s.includes("robot") ||
    s.includes("instrument") ||
    s.includes("sensor") ||
    s.includes("technology") ||
    s.includes("appliance") ||
    s.includes("electrification")
  ) {
    return "technology";
  }
  if (
    s.includes("engineering") ||
    s.includes("energy") ||
    s.includes("marine") ||
    s.includes("offshore") ||
    s.includes("dredging") ||
    s.includes("power")
  ) {
    return "engineering";
  }

  return "other";
}

export const COMPANIES = [
  {
    name: "Berkel Industrial B.V.",
    logo: "/logos/berkel.svg",
    logoTone: "light",
    category: "engineering",
    description:
      "Partner in serial machine building, supporting machine builders with technical solutions and supply chain support.",
    industry: "Machine building / industrial engineering",
    employees: "~ 15",
    location: "Berkel en Rodenrijs, NL",
    opportunities: ["TBD"],
    website: "https://www.berkelindustrial.com/en/",
  },
  {
    name: "Verebus Engineering B.V.",
    logo: "/logos/verebus.png",
    logoTone: "light",
    category: "consultancy",
    description:
      "Technical service provider specialized in asset management and technical documentation across the full asset lifecycle.",
    industry: "Asset management / technical documentation",
    employees: "N/A",
    location: "Rijswijk, NL",
    opportunities: ["TBD"],
    website: "https://verebus.nl/",
  },
  {
    name: "Technip Energies",
    logo: "/logos/technip.webp",
    category: "engineering",
    description:
      "Engineering and technology company delivering solutions for energy infrastructure and the energy transition.",
    industry: "Energy engineering / EPC",
    employees: "N/A",
    location: "Amsterdam, NL",
    opportunities: ["TBD"],
    website: "https://www.ten.com/en",
  },
  {
    name: "Tempcontrol B.V.",
    logo: "/logos/tempcontrol.svg",
    category: "technology",
    description:
      "Manufacturer of high-accuracy temperature sensors and equipment for measuring, controlling and recording temperature and humidity.",
    industry: "Instrumentation / sensors",
    employees: "~ 11–50",
    location: "Nootdorp, NL",
    opportunities: ["TBD"],
    website: "https://www.tempcontrol.nl/en/",
  },
  {
    name: "Halmos Adviseurs",
    logo: "/logos/halmos.svg",
    logoTone: "light",
    category: "consultancy",
    description:
      "Independent consultancy for building services installations, focusing on sustainability, energy efficiency and user comfort.",
    industry: "Building services engineering",
    employees: "N/A",
    location: "The Hague, NL",
    opportunities: ["TBD"],
    website: "https://halmos.nl/",
  },
  {
    name: "DVP Smart Concepts B.V.",
    logo: "/logos/dvp.png",
    logoTone: "light",
    category: "consultancy",
    description:
      "Consultancy for technical installations with a focus on sustainability, comfort, feasibility and smart building solutions.",
    industry: "Building services consultancy / smart buildings",
    employees: "~ 10",
    location: "The Hague, NL",
    opportunities: ["TBD"],
    website: "https://dvpsmartconcepts.nl/",
  },
  {
    name: "Energy Solutions B.V.",
    logoTone: "dark",
    logo: "/logos/EnergySolutions.svg",
    description:
      "Engineering and consultancy company specialized in electrical power systems and high-voltage infrastructure.",
    industry: "High-voltage / power systems",
    employees: "N/A",
    location: "Delft, NL",
    opportunities: ["TBD"],
    website: "https://www.ensol.nl/en/",
  },
  {
    name: "SASJA careers B.V.",
    logo: "/logos/Sasja.svg",
    description:
      "Recruitment agency connecting technical talent with engineering and technology-focused organizations.",
    industry: "Recruitment / staffing (technical)",
    employees: "N/A",
    location: "Aalsmeer, NL",
    opportunities: ["TBD"],
    website: "https://www.sasja-careers.nl/",
  },
  {
    name: "Wepro",
    logo: "/logos/wepro.png",
    description:
      "Engineering service provider active in mechanical, electrical, industrial automation and installation technology.",
    industry: "Engineering services",
    employees: "~ 501–1000",
    location: "Arnhem, NL",
    opportunities: ["TBD"],
    website: "https://wepro.nl/",
  },
  {
    name: "Emmett Green Engineering B.V.",
    logo: "/logos/emmett.png",
    logoTone: "light",
    description:
      "Engineering company focused on the energy transition, delivering electrical designs for industry and grid-related projects.",
    industry: "Electrical engineering / energy transition",
    employees: "~ 11–50",
    location: "Delft, NL",
    opportunities: ["TBD"],
    website: "https://emmettgreen.nl/",
  },
  {
    name: "Siemens Nederland N.V.",
    logo: "/logos/Siemens.png",
    description:
      "Global technology company active in industry, infrastructure, energy and digitalization.",
    industry: "Industry / energy / automation",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.siemens.com/nl/en.html",
  },
  {
    name: "KERN Engineers",
    logo: "/logos/kernengineers.png",
    description:
      "Technical recruitment and secondment agency connecting engineers with technical organizations.",
    industry: "Recruitment / staffing (engineering)",
    employees: "N/A",
    location: "The Hague, NL",
    opportunities: ["TBD"],
    website: "https://kernengineers.nl/",
  },
  {
    name: "Sweco Nederland B.V.",
    logo: "/logos/sweco.png",
    description:
      "Architecture and engineering consultancy working on sustainable cities, infrastructure and buildings.",
    industry: "Engineering & architecture consultancy",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.sweco.nl/",
  },
  {
    name: "Iv",
    logo: "/logos/IV.svg",
    logoTone: "light",
    description:
      "Engineering and consultancy firm active in infrastructure, offshore & energy, maritime, industry and buildings.",
    industry: "Engineering consultancy",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.iv.nl/en/",
  },
  {
    name: "Van Oord",
    logo: "/logos/vanoord.svg",
    logoTone: "light",
    description:
      "International marine contractor specializing in dredging, offshore and infrastructure projects.",
    industry: "Marine contracting / offshore",
    employees: "N/A",
    location: "Rotterdam, NL",
    opportunities: ["TBD"],
    website: "https://www.vanoord.com/en/",
  },
  {
    name: "DCMR Environmental Protection Agency Rijnmond",
    logo: "/logos/DCMR.svg",
    description:
      "Regional environmental authority responsible for permits, inspections, monitoring and environmental advice.",
    industry: "Public environmental authority",
    employees: "N/A",
    location: "Rijnmond region, NL",
    opportunities: ["TBD"],
    website: "https://www.dcmr.nl/",
  },
  {
    name: "Bilfinger Engineering & Consultancy",
    logo: "/logos/bilfinger.svg",
    description:
      "Multidisciplinary engineering and consultancy services for industrial and energy-related projects.",
    industry: "Industrial engineering & consultancy",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.bilfinger.com/en/nl/",
  },
  {
    name: "ABB B.V.",
    logo: "/logos/ABB.png",
    description:
      "Technology leader in electrification and automation enabling more efficient and sustainable industry.",
    industry: "Electrification / automation",
    employees: "N/A",
    location: "Netherlands / Benelux",
    opportunities: ["TBD"],
    website: "https://new.abb.com/benelux",
  },
  {
    name: "Quooker",
    logo: "/logos/quooker.svg",
    description:
      "Manufacturer of boiling-water kitchen taps and related systems focused on innovation and efficiency.",
    industry: "Consumer products / kitchen appliances",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.quooker.com/",
  },
  {
    name: "The Confettimaker",
    logo: "/logos/confetti.png",
    logoTone: "dark",
    description: "TBD",
    industry: "TBD",
    employees: "N/A",
    location: "TBD",
    opportunities: ["TBD"],
    website: "https://www.theconfettimaker.com/",
  },
  {
    name: "Schulte en Lestraden B.V.",
    logo: "/logos/schulte.png",
    description:
      "Installation company providing electrical, mechanical, measurement & control services from design to maintenance.",
    industry: "Building services / MEP contractor",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://senl.nl/",
  },
  {
    name: "RH Marine Netherlands B.V.",
    logo: "/logos/RHmarine.svg",
    logoTone: "dark",
    category: "defence",
    description:
      "System integrator delivering electrical and automation solutions for complex maritime vessels.",
    industry: "Maritime system integration",
    employees: "~ 201–500",
    location: "Schiedam, NL",
    opportunities: ["TBD"],
    website: "https://rhmarine.com/",
  },
  {
    name: "Hanab Energy Solutions",
    logo: "/logos/hanab.svg",
    category: "energy-transition",
    description:
      "Supports high-voltage energy infrastructure with consultancy, engineering, execution and maintenance services.",
    industry: "High-voltage infrastructure / energy services",
    employees: "N/A",
    location: "Rotterdam, NL",
    opportunities: ["TBD"],
    website: "https://www.hanab.nl/energy-solutions/en",
  },
  {
    name: "Nepocon",
    logo: "/logos/nepocon.png",
    description:
      "Engineering and consultancy firm specializing in civil, structural and hydraulic engineering.",
    industry: "Civil & structural engineering",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://www.nepocon.nl/",
  },
  {
    name: "Silicon theatre scenery",
    logo: "/logos/sts.webp",
    description: "TBD",
    industry: "TBD",
    employees: "N/A",
    location: "TBD",
    opportunities: ["TBD"],
    website: "https://stsonstage.com/",
  },
  {
    name: "Smits Zevenhuizen",
    logo: "/logos/smits.png",
    description: "TBD",
    industry: "TBD",
    employees: "N/A",
    location: "TBD",
    opportunities: ["TBD"],
    website: "#",
  },
  {
    name: "Peutz",
    logo: "/logos/peutz.svg",
    description:
      "Engineering consultancy specializing in acoustics, building physics, environmental technology and sustainability.",
    industry: "Engineering consultancy (acoustics/building physics)",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://peutz.nl/",
  },
  {
    name: "Flux Partners",
    logoTone: "dark",
    logo: "/logos/flux.svg",
    description:
      "Consultancy supporting tenders and project delivery within infrastructure, construction and energy.",
    industry: "Consultancy (tender & project support)",
    employees: "N/A",
    location: "Netherlands",
    opportunities: ["TBD"],
    website: "https://flux.partners/en/",
  },
].map((c) => ({
  // consistent fallback logic
  id:
    c.id ??
    String(c.name ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  logo: c.logo ?? "/logos/WIP.png",
  category: c.category ?? inferCategory(c.industry),
  description: c.description ?? "TBD",
  industry: c.industry ?? "TBD",
  employees: c.employees ?? "N/A",
  location: c.location ?? "TBD",
  opportunities: c.opportunities ?? ["TBD"],
  website: c.website ?? "#",
  ...c,
}));

const COMPANIES_NL_OVERRIDES = {
  "berkel-industrial-b-v": {
    "description": "Partner in seriematige machinebouw; ondersteunt machinebouwers met technische oplossingen en supply chain ondersteuning.",
    "industry": "Machinebouw / industriÃ«le engineering",
    "employees": "~ 15",
    "location": "Berkel en Rodenrijs, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.berkelindustrial.com/en/"
  },
  "verebus-engineering-b-v": {
    "description": "Technische dienstverlener gespecialiseerd in asset management en technische documentatie over de volledige asset lifecycle.",
    "industry": "Asset management / technische documentatie",
    "employees": "N/A",
    "location": "Rijswijk, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://verebus.nl/"
  },
  "technip-energies": {
    "description": "Engineering- en technologiebedrijf voor energie-infrastructuur en de energietransitie.",
    "industry": "Energie engineering / EPC",
    "employees": "N/A",
    "location": "Amsterdam, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.ten.com/en"
  },
  "tempcontrol-b-v": {
    "description": "Fabrikant van nauwkeurige temperatuursensoren en meetapparatuur voor meten, regelen en registreren van temperatuur en luchtvochtigheid.",
    "industry": "Instrumentatie / sensoren",
    "employees": "~ 11â€“50",
    "location": "Nootdorp, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.tempcontrol.nl/en/"
  },
  "halmos-adviseurs": {
    "description": "Onafhankelijk adviesbureau voor gebouwgebonden installaties met focus op duurzaamheid, energie-efficiÃ«ntie en comfort binnen budget.",
    "industry": "Installatieadvies / building services",
    "employees": "N/A",
    "location": "Den Haag, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://halmos.nl/"
  },
  "dvp-smart-concepts-b-v": {
    "description": "Adviesbureau voor technische installaties met focus op duurzaamheid, comfort, haalbaarheid en smart building technologie.",
    "industry": "Installatieadvies / smart buildings",
    "employees": "~ 10",
    "location": "Den Haag, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://dvpsmartconcepts.nl/"
  },
  "energy-solutions-b-v": {
    "description": "Engineering & consultancy in elektrische energietechniek, met focus op hoogspanning en energieprojecten.",
    "industry": "Hoogspanning / power systems",
    "employees": "N/A",
    "location": "Delft, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.ensol.nl/en/"
  },
  "sasja-careers-b-v": {
    "description": "Recruitmentbureau dat technisch talent matcht met functies in engineering en techniek.",
    "industry": "Recruitment / staffing (technisch)",
    "employees": "N/A",
    "location": "Aalsmeer, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.sasja-careers.nl/"
  },
  "wepro": {
    "description": "Engineeringdienstverlener actief in mechanical, electrical, industrial automation en installatie-techniek.",
    "industry": "Engineering services",
    "employees": "~ 501â€“1000",
    "location": "Arnhem, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://wepro.nl/"
  },
  "emmett-green-engineering-b-v": {
    "description": "Engineeringbedrijf gericht op de energietransitie, o.a. elektrotechnische ontwerpen voor industrie en netprojecten.",
    "industry": "Elektrotechniek / energietransitie",
    "employees": "~ 11â€“50",
    "location": "Delft, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://emmettgreen.nl/"
  },
  "siemens-nederland-n-v": {
    "description": "Technologiebedrijf actief in o.a. industrie, infrastructuur, energie en digitalisering.",
    "industry": "Industrie / energie / automatisering",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.siemens.com/nl/nl.html"
  },
  "kern-engineers": {
    "description": "Technisch recruitment- en detacheringsbureau voor engineers en technische organisaties.",
    "industry": "Recruitment / staffing (engineering)",
    "employees": "N/A",
    "location": "Den Haag, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://kernengineers.nl/"
  },
  "sweco-nederland-b-v": {
    "description": "Ingenieurs- en architectenadviesbureau voor duurzame steden, infrastructuur en gebouwen.",
    "industry": "Engineering & architectuur consultancy",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.sweco.nl/"
  },
  "iv": {
    "description": "Ingenieurs- en adviesbureau voor o.a. infrastructuur, offshore & energy, maritime, industrie en gebouwen.",
    "industry": "Engineering consultancy",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.iv.nl/en/"
  },
  "van-oord": {
    "description": "Internationale maritieme aannemer actief in baggeren, offshore en infrastructuurprojecten.",
    "industry": "Maritieme aannemer / offshore",
    "employees": "N/A",
    "location": "Rotterdam, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.vanoord.com/en/"
  },
  "dcmr-milieudienst-rijnmond": {
    "description": "Milieudienst voor de Rijnmondregio: vergunningen, inspecties, monitoring en milieuadvies.",
    "industry": "Publieke milieudienst / toezicht",
    "employees": "N/A",
    "location": "Rijnmond, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.dcmr.nl/"
  },
  "bilfinger-engineering-consultancy": {
    "description": "Multidisciplinaire engineering- en consultancyservices voor industrie- en energieprojecten.",
    "industry": "IndustriÃ«le engineering & consultancy",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.bilfinger.com/en/nl/"
  },
  "abb-b-v": {
    "description": "Technologiebedrijf in elektrificatie en automatisering voor efficiÃ«ntere en duurzamere industrie.",
    "industry": "Elektrificatie / automatisering",
    "employees": "N/A",
    "location": "NL / Benelux",
    "opportunities": [
      "TBD"
    ],
    "website": "https://new.abb.com/benelux"
  },
  "quooker": {
    "description": "Producent van de kokendwaterkraan (en varianten met gekoeld/bruisend) voor keukeninnovatie en efficiÃ«ntie.",
    "industry": "Consumentenproducten / keukenapparatuur",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.quooker.nl/"
  },
  "the-confettimaker": {
    "description": "TBD",
    "industry": "TBD",
    "employees": "N/A",
    "location": "TBD",
    "opportunities": [
      "TBD"
    ],
    "website": "#"
  },
  "schulte-en-lestraden-b-v": {
    "description": "Installatiebedrijf met services in E/W, meet- en regeltechniek, ontwerp, realisatie en onderhoud.",
    "industry": "Installatietechniek (MEP)",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://senl.nl/"
  },
  "rh-marine-netherlands-b-v": {
    "description": "Systeemintegrator voor maritieme elektrotechniek en automatisering; maatwerkoplossingen voor complexe schepen.",
    "industry": "Maritieme systeemintegratie",
    "employees": "~ 201â€“500",
    "location": "Schiedam, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://rhmarine.com/"
  },
  "hanab-energy-solutions": {
    "description": "Ondersteunt hoogspanningsinfrastructuur: advies, engineering, uitvoering, onderhoud en optimalisatie voor de energietransitie.",
    "industry": "Hoogspanningsinfrastructuur / energiediensten",
    "employees": "N/A",
    "location": "Rotterdam, NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.hanab.nl/energy-solutions/nl"
  },
  "nepocon": {
    "description": "Ingenieurs- en adviesbureau voor civiele, constructieve en waterbouwkundige vraagstukken.",
    "industry": "Civiele techniek / constructies / water",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://www.nepocon.nl/"
  },
  "silicon-theatre-scenery": {
    "description": "TBD",
    "industry": "TBD",
    "employees": "N/A",
    "location": "TBD",
    "opportunities": [
      "TBD"
    ],
    "website": "#"
  },
  "smits-zevenhuizen": {
    "description": "TBD",
    "industry": "TBD",
    "employees": "N/A",
    "location": "TBD",
    "opportunities": [
      "TBD"
    ],
    "website": "#"
  },
  "peutz": {
    "description": "Adviesbureau in akoestiek, bouwfysica, milieu, duurzaamheid en geveltechniek.",
    "industry": "Engineering consultancy (akoestiek/bouwfysica)",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://peutz.nl/"
  },
  "flux-partners": {
    "description": "Consultancy voor tenders en projectbeheersing binnen infrastructuur, bouw en energie.",
    "industry": "Consultancy (tender & project support)",
    "employees": "N/A",
    "location": "NL",
    "opportunities": [
      "TBD"
    ],
    "website": "https://flux.partners/en/"
  }
};

export const COMPANIES_NL = getCompanies("nl");


export const COMPANY_CATEGORY_LABELS = {
  nl: {
    all: "Alle",
    other: "Overig",
    defence: "Defensie",
    "energy-transition": "Energietransitie",
    engineering: "Engineering",
    consultancy: "Consultancy",
    recruitment: "Recruitment",
    technology: "Technologie",
    installation: "Installatie"
  },
  en: {
    all: "All",
    other: "Other",
    defence: "Defence",
    "energy-transition": "Energy transition",
    engineering: "Engineering",
    consultancy: "Consultancy",
    recruitment: "Recruitment",
    technology: "Technology",
    installation: "Installation"
  }
};

export function getCompanies(lang) {
  if (lang !== "nl") return COMPANIES;

  return COMPANIES.map((company) => {
    const override = COMPANIES_NL_OVERRIDES[company.id];
    if (!override) return company;

    const merged = { ...company, ...override };
    merged.category = override.category ?? company.category ?? inferCategory(merged.industry);
    merged.logoTone = override.logoTone ?? company.logoTone;
    merged.logo = override.logo ?? company.logo;
    merged.website = override.website ?? company.website;
    merged.name = override.name ?? company.name;
    return merged;
  });
}
