// Institute catalog — drives the institutes section on the public Courses
// page, the per-institute microsite, and the faculty microsites.
//
// Each institute has:
//   - identity (slug, name, location, founded, accreditation)
//   - hero + brand visuals
//   - a roster of courses, each with curriculum modules
//   - a faculty roster, each with a linked microsite (bio + courses)

export type InstituteType =
  | "school-of-architecture"
  | "school-of-design"
  | "university"
  | "professional-body"
  | "design-studio"
  | "research-cell"
  | "brand-academy";

export type InstituteRegion = "India" | "United States" | "United Kingdom" | "Europe" | "APAC" | "MENA";

export type CourseLevel =
  | "certificate"
  | "diploma"
  | "undergraduate"
  | "post-graduate"
  | "doctorate"
  | "executive-ed";

export interface CurriculumModule {
  id: string;
  title: string;
  weeks: number;
  topics: string[];
  facultyId?: string;
}

export interface InstituteCourse {
  id: string;
  instituteId: string;
  title: string;
  shortDescription: string;
  level: CourseLevel;
  durationLabel: string;
  totalWeeks?: number;
  studyMode: "on-campus" | "online" | "hybrid";
  language: string;
  feeLabel: string;
  feeNumeric?: number;
  startDate?: string;
  intakeSize?: number;
  rating: number;
  enrolled: number;
  outcomes: string[];
  curriculum: CurriculumModule[];
  /** Faculty ids (foreign keys into FACULTY) who teach the course. */
  facultyIds: string[];
  /** Optional cover image / brand banner. */
  coverImage: string;
}

export interface Faculty {
  id: string;
  instituteId: string;
  name: string;
  title: string;
  initials: string;
  color: string;
  photo?: string;
  bio: string;
  expertise: string[];
  yearsExperience: number;
  city: string;
  email?: string;
  linkedin?: string;
  /** Selected publications / awards / talks. */
  highlights: string[];
  /** Course ids this faculty leads or co-teaches. */
  courseIds: string[];
}

export interface Institute {
  id: string;            // slug
  name: string;
  shortName: string;
  initials: string;
  brandColor: string;
  type: InstituteType;
  region: InstituteRegion;
  city: string;
  country: string;
  foundedYear: number;
  description: string;
  accreditation: string[];
  heroImage: string;
  campusImage: string;
  website: string;
  isVerified: boolean;
  studentCount: number;
  alumniCount: number;
  rankingTag?: string;       // e.g. "QS #1 India for Architecture"
  specialisations: string[];
  /** Optional override for the Clearbit logo domain. Falls back to website host. */
  logoDomain?: string;
  /** Linked brand id when this institute is in fact a brand-academy. */
  brandId?: string;
}

// ============================================
// Institutes
// ============================================

export const INSTITUTES: Institute[] = [
  {
    id: "spa-delhi",
    name: "School of Planning and Architecture, New Delhi",
    shortName: "SPA Delhi",
    initials: "SD",
    brandColor: "#0f3470",
    type: "school-of-architecture",
    region: "India",
    city: "New Delhi",
    country: "India",
    foundedYear: 1941,
    description:
      "India's premier institute of national importance for architecture, planning and design. SPA Delhi houses a 5-year B.Arch programme and ten master's programmes ranging from urban design to industrial design.",
    accreditation: ["Institute of National Importance (INI) — MoE, GoI", "COA Recognised", "AIU Member"],
    heroImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.spa.ac.in",
    isVerified: true,
    studentCount: 2_400,
    alumniCount: 22_000,
    rankingTag: "INI · Top 3 Architecture (NIRF)",
    specialisations: ["Architecture", "Urban Planning", "Landscape", "Industrial Design", "Heritage Conservation"],
  },
  {
    id: "iit-roorkee",
    name: "IIT Roorkee — Department of Architecture & Planning",
    shortName: "IIT Roorkee",
    initials: "IR",
    brandColor: "#9d2235",
    type: "university",
    region: "India",
    city: "Roorkee",
    country: "India",
    foundedYear: 1847,
    description:
      "The oldest engineering institution in Asia. Its Department of Architecture & Planning runs a 5-year B.Arch alongside M.Arch, M.URP, and an extensive PhD programme with strength in structural design and computational architecture.",
    accreditation: ["Institute of Eminence — MoE, GoI", "NBA Accredited"],
    heroImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://iitr.ac.in",
    isVerified: true,
    studentCount: 9_500,
    alumniCount: 65_000,
    rankingTag: "QS World Top 250",
    specialisations: ["Architecture", "Urban & Regional Planning", "Building Science", "Computational Design"],
  },
  {
    id: "cept",
    name: "CEPT University",
    shortName: "CEPT",
    initials: "CE",
    brandColor: "#dc2626",
    type: "university",
    region: "India",
    city: "Ahmedabad",
    country: "India",
    foundedYear: 1962,
    description:
      "Founded as the Centre for Environmental Planning and Technology by B.V. Doshi. India's deepest design pedagogy across Architecture, Planning, Technology, Design and Management — six interlinked faculties.",
    accreditation: ["UGC Recognised", "COA Accredited", "AIU Member"],
    heroImage: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1568667256549-094345857637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://cept.ac.in",
    isVerified: true,
    studentCount: 3_200,
    alumniCount: 15_000,
    rankingTag: "Pritzker Prize-winning founder · Top 5 NIRF",
    specialisations: ["Architecture", "Planning", "Building Energy", "Interior", "Design"],
  },
  {
    id: "nid-ahmedabad",
    name: "National Institute of Design, Ahmedabad",
    shortName: "NID Ahmedabad",
    initials: "ND",
    brandColor: "#0f766e",
    type: "school-of-design",
    region: "India",
    city: "Ahmedabad",
    country: "India",
    foundedYear: 1961,
    description:
      "India's premier multi-disciplinary design school, conceived after the Eames Report. Pedagogy spans product, communication, textile, ceramic, animation, film, transportation and interaction design.",
    accreditation: ["Institute of National Importance — MoCI, GoI"],
    heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.nid.edu",
    isVerified: true,
    studentCount: 1_100,
    alumniCount: 8_500,
    rankingTag: "Eames Report Heritage",
    specialisations: ["Industrial Design", "Communication Design", "Textile", "Interaction Design"],
  },
  {
    id: "iiad",
    name: "Indian Institute of Art & Design",
    shortName: "IIAD New Delhi",
    initials: "IA",
    brandColor: "#7c3aed",
    type: "school-of-design",
    region: "India",
    city: "New Delhi",
    country: "India",
    foundedYear: 2014,
    description:
      "Partnered with Kingston University London. Award-led pedagogy in Interior Architecture, Fashion Design, Communication Design and Product Design, with a strong industry-immersion model.",
    accreditation: ["Kingston University London — Validation Partner", "MGN Recognised"],
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.iiad.edu.in",
    isVerified: true,
    studentCount: 850,
    alumniCount: 2_400,
    specialisations: ["Interior Architecture", "Fashion", "Product Design", "Communication Design"],
  },
  {
    id: "rics-sbe",
    name: "RICS School of Built Environment",
    shortName: "RICS SBE",
    initials: "RS",
    brandColor: "#1e40af",
    type: "university",
    region: "India",
    city: "Noida / Mumbai",
    country: "India",
    foundedYear: 2013,
    description:
      "South Asia's first dedicated built environment school under Amity Education Group, in academic partnership with RICS (UK). Programmes in Construction Management, QS, Real Estate and BIM.",
    accreditation: ["RICS — Royal Institution of Chartered Surveyors (UK)", "UGC Recognised"],
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://ricssbe.edu.in",
    isVerified: true,
    studentCount: 3_842,
    alumniCount: 12_500,
    rankingTag: "RICS-aligned",
    specialisations: ["Construction Management", "QS", "Real Estate", "BIM"],
  },
  {
    id: "harvard-gsd",
    name: "Harvard Graduate School of Design",
    shortName: "Harvard GSD",
    initials: "HG",
    brandColor: "#a51c30",
    type: "school-of-architecture",
    region: "United States",
    city: "Cambridge, MA",
    country: "United States",
    foundedYear: 1936,
    description:
      "The world's leading post-graduate design school across Architecture, Landscape, Urban Planning & Design, and Real Estate. Home of the Loeb Fellowship and the prestigious Wheelwright Prize.",
    accreditation: ["NAAB Accredited", "ASLA Accredited", "PAB Accredited"],
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.gsd.harvard.edu",
    isVerified: true,
    studentCount: 950,
    alumniCount: 15_400,
    rankingTag: "QS #1 Architecture (USA)",
    specialisations: ["Architecture", "Landscape", "Urban Design", "Real Estate"],
  },
  {
    id: "mit-architecture",
    name: "MIT — Department of Architecture",
    shortName: "MIT Architecture",
    initials: "MA",
    brandColor: "#8a8b8c",
    type: "university",
    region: "United States",
    city: "Cambridge, MA",
    country: "United States",
    foundedYear: 1865,
    description:
      "The first architecture programme in the United States. SMArchS, MArch and PhD streams with strength in computation, fabrication, building tech and history-theory-criticism.",
    accreditation: ["NAAB Accredited"],
    heroImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1614853035831-37e7b4dcdfd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://architecture.mit.edu",
    isVerified: true,
    studentCount: 480,
    alumniCount: 14_200,
    rankingTag: "QS Top 3 Globally",
    specialisations: ["Computation", "Building Tech", "Architecture", "Design Studies"],
  },
  {
    id: "ucla-auD",
    name: "UCLA Architecture & Urban Design",
    shortName: "UCLA AUD",
    initials: "UA",
    brandColor: "#2774ae",
    type: "university",
    region: "United States",
    city: "Los Angeles, CA",
    country: "United States",
    foundedYear: 1964,
    description:
      "UCLA's AUD programme is one of the most experimental design schools on the US west coast. MArch I/II, MA Urban Design and SUPRASTUDIO partnerships with Greg Lynn, Tom Wiscombe and others.",
    accreditation: ["NAAB Accredited"],
    heroImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1568667256549-094345857637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.aud.ucla.edu",
    isVerified: true,
    studentCount: 350,
    alumniCount: 4_800,
    specialisations: ["MArch I/II", "Urban Design", "SUPRASTUDIO"],
  },
  {
    id: "aa-london",
    name: "Architectural Association School of Architecture",
    shortName: "AA London",
    initials: "AA",
    brandColor: "#000000",
    type: "school-of-architecture",
    region: "United Kingdom",
    city: "London",
    country: "United Kingdom",
    foundedYear: 1847,
    description:
      "The world's oldest independent school of architecture. Famed for its DRL programme, Diploma units, and a faculty pipeline of Rem Koolhaas, Zaha Hadid, Patrik Schumacher and Eyal Weizman.",
    accreditation: ["RIBA Validated", "ARB Prescribed"],
    heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.aaschool.ac.uk",
    isVerified: true,
    studentCount: 760,
    alumniCount: 14_000,
    rankingTag: "Oldest independent school of architecture",
    specialisations: ["Diploma Studios", "DRL (Design Research Lab)", "Landscape Urbanism", "EmTech"],
  },
  {
    id: "bartlett-ucl",
    name: "The Bartlett School of Architecture, UCL",
    shortName: "Bartlett UCL",
    initials: "BU",
    brandColor: "#0040a5",
    type: "university",
    region: "United Kingdom",
    city: "London",
    country: "United Kingdom",
    foundedYear: 1841,
    description:
      "Consistently ranked top architecture school in the QS World University Rankings. Home of MArch Architecture Unit System and MArch UD that have shaped contemporary speculative practice.",
    accreditation: ["RIBA Validated", "ARB Prescribed"],
    heroImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.ucl.ac.uk/bartlett/architecture",
    isVerified: true,
    studentCount: 1_500,
    alumniCount: 26_000,
    rankingTag: "QS #1 Architecture Globally",
    specialisations: ["MArch Unit System", "MArch UD", "MSc Bio-Integrated Design"],
  },
  {
    id: "eth-zurich",
    name: "ETH Zürich — Department of Architecture (D-ARCH)",
    shortName: "ETH Zürich",
    initials: "EZ",
    brandColor: "#215aa8",
    type: "university",
    region: "Europe",
    city: "Zürich",
    country: "Switzerland",
    foundedYear: 1855,
    description:
      "One of the world's strongest research universities in architecture and structural design. Home of Block Research Group, Gramazio Kohler Research and a five-year integrated MSc Arch.",
    accreditation: ["SIA Accredited", "EU-recognised"],
    heroImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://arch.ethz.ch",
    isVerified: true,
    studentCount: 1_850,
    alumniCount: 28_400,
    rankingTag: "QS Top 5 Architecture Globally",
    specialisations: ["Structural Design", "Digital Fabrication", "Building Systems", "Computation"],
  },
  {
    id: "sci-arc",
    name: "SCI-Arc — Southern California Institute of Architecture",
    shortName: "SCI-Arc",
    initials: "SA",
    brandColor: "#ef4444",
    type: "school-of-architecture",
    region: "United States",
    city: "Los Angeles, CA",
    country: "United States",
    foundedYear: 1972,
    description:
      "An independent architecture school in downtown LA known for experimental design pedagogy, robotics, and parametric studios. Programmes: BArch, MArch 1/2, MS in Design Theory & Pedagogy.",
    accreditation: ["NAAB Accredited"],
    heroImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.sciarc.edu",
    isVerified: true,
    studentCount: 540,
    alumniCount: 7_200,
    specialisations: ["BArch", "MArch", "Robotics House", "Esoteric Studios"],
  },
  {
    id: "igbc-training",
    name: "IGBC Training Cell",
    shortName: "IGBC",
    initials: "IC",
    brandColor: "#15803d",
    type: "professional-body",
    region: "India",
    city: "Hyderabad",
    country: "India",
    foundedYear: 2001,
    description:
      "Training cell of the Indian Green Building Council. Issues the IGBC AP credential and runs short courses on the LEED India rating systems, Net-Zero codes and ECBC compliance.",
    accreditation: ["CII Recognised", "World GBC Member"],
    heroImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1518005020251-582c788447dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://igbc.in",
    isVerified: true,
    studentCount: 1_580,
    alumniCount: 9_400,
    specialisations: ["IGBC AP", "Net-Zero", "ECBC", "GRIHA"],
  },

  // ── Brand Academies ────────────────────────────────────────────────
  {
    id: "ultratech-academy",
    name: "UltraTech Engineering Academy",
    shortName: "UltraTech Academy",
    initials: "UA",
    brandColor: "#d32f2f",
    type: "brand-academy",
    region: "India",
    city: "Mumbai",
    country: "India",
    foundedYear: 2012,
    description:
      "UltraTech Cement's industry academy for engineers, contractors and architects. Certified courses on RMC operations, structural admixtures, and concrete repair — taught by UltraTech plant leaders and BIS-aligned trainers.",
    accreditation: ["Aditya Birla Group", "ACI India Recognised"],
    heroImage: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.ultratechcement.com",
    isVerified: true,
    studentCount: 5_400,
    alumniCount: 28_000,
    rankingTag: "India's #1 cement brand",
    specialisations: ["RMC Operations", "Concrete Admixtures", "Structural Repair", "Site QA"],
    logoDomain: "ultratechcement.com",
    brandId: "ultratech-cement",
  },
  {
    id: "asianpaints-academy",
    name: "Asian Paints Academy of Colour & Spec",
    shortName: "Asian Paints Academy",
    initials: "AA",
    brandColor: "#e91e63",
    type: "brand-academy",
    region: "India",
    city: "Mumbai",
    country: "India",
    foundedYear: 2015,
    description:
      "Asian Paints' learning arm for architects, designers and contractors. Certified courses on Royale Luxe + Apex Ultima specification, colour theory, decorative finishes and protective coatings.",
    accreditation: ["NSDC Recognised", "IIA CPD Provider"],
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1562564055-71e051d33c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.asianpaints.com",
    isVerified: true,
    studentCount: 7_200,
    alumniCount: 31_400,
    rankingTag: "Asia's largest paints brand",
    specialisations: ["Coatings", "Colour Theory", "Decorative Finishes", "Wood Finishes"],
    logoDomain: "asianpaints.com",
    brandId: "asian-paints",
  },
  {
    id: "schneider-university",
    name: "Schneider Electric University — India",
    shortName: "Schneider University",
    initials: "SU",
    brandColor: "#2e7d32",
    type: "brand-academy",
    region: "India",
    city: "Gurgaon",
    country: "India",
    foundedYear: 2010,
    description:
      "Schneider's global learning platform for MEP consultants, system integrators and architects. Certified pathways on EcoStruxure Building, BMS deployment, switchgear specification and net-zero design.",
    accreditation: ["Schneider Electric Certified", "ASHRAE India Partner"],
    heroImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.se.com",
    isVerified: true,
    studentCount: 4_800,
    alumniCount: 24_500,
    rankingTag: "Global net-zero leader",
    specialisations: ["BMS / EcoStruxure", "Smart Switchgear", "Net Zero", "Electrical Design"],
    logoDomain: "se.com",
    brandId: "schneider-electric",
  },
  {
    id: "saintgobain-multicomfort",
    name: "Saint-Gobain Multi-Comfort Academy",
    shortName: "Saint-Gobain Academy",
    initials: "SG",
    brandColor: "#00529c",
    type: "brand-academy",
    region: "India",
    city: "Pune",
    country: "India",
    foundedYear: 2014,
    description:
      "Saint-Gobain's flagship academy on high-performance façades, multi-comfort building science, glazing specification and acoustic comfort. CPD-credited workshops + a 2-month online Glass Studio programme.",
    accreditation: ["Saint-Gobain Certified", "IIA CPD Provider"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://multicomfort.saint-gobain.com",
    isVerified: true,
    studentCount: 2_900,
    alumniCount: 14_800,
    specialisations: ["Façades & Glazing", "Multi-Comfort", "Acoustic Design", "Gypsum"],
    logoDomain: "saint-gobain.com",
    brandId: "saint-gobain",
  },
  {
    id: "pidilite-academy",
    name: "Pidilite Industries Academy",
    shortName: "Pidilite Academy",
    initials: "PA",
    brandColor: "#1565c0",
    type: "brand-academy",
    region: "India",
    city: "Mumbai",
    country: "India",
    foundedYear: 2011,
    description:
      "Pidilite's certification arm for waterproofing applicators, contractors and architects. Hands-on training on Dr. Fixit systems, construction-chemical specification and quality assurance.",
    accreditation: ["NSDC Skill Council", "Dr. Fixit Certified"],
    heroImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.pidilite.com",
    isVerified: true,
    studentCount: 6_400,
    alumniCount: 38_000,
    specialisations: ["Waterproofing", "Construction Chemicals", "Adhesives", "Repair Systems"],
    logoDomain: "pidilite.com",
    brandId: "pidilite",
  },
  {
    id: "hafele-academy",
    name: "Hafele Design Academy",
    shortName: "Hafele Academy",
    initials: "HA",
    brandColor: "#212121",
    type: "brand-academy",
    region: "India",
    city: "Mumbai",
    country: "India",
    foundedYear: 2016,
    description:
      "Hafele's CPD-credited programme for designers and joiners. Workshops on kitchen + wardrobe systems, smart fittings, Loox lighting and ergonomics — at the Lower Parel design centre.",
    accreditation: ["Hafele Certified", "IIID CPD Partner"],
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    campusImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
    website: "https://www.hafele.com",
    isVerified: true,
    studentCount: 2_100,
    alumniCount: 8_600,
    specialisations: ["Kitchen Systems", "Wardrobe Joinery", "Smart Fittings", "Loox Lighting"],
    logoDomain: "hafele.com",
    brandId: "hafele",
  },
];

// ============================================
// Faculty
// ============================================

const FAC_COLORS = ["#1e40af", "#7c3aed", "#0f766e", "#dc2626", "#15803d", "#be185d", "#0891b2", "#a855f7", "#f97316", "#0ea5e9"];

function f(idx: number): string {
  return FAC_COLORS[idx % FAC_COLORS.length];
}

export const FACULTY: Faculty[] = [
  // ─── SPA Delhi ───────────────────────────────────────────────────────────
  { id: "fac-spa-1", instituteId: "spa-delhi",   name: "Prof. Aruna Singh",     title: "Dean, Architecture",         initials: "AS", color: f(0), bio: "Architect with 28 years of practice and pedagogy. Led the SPA's switch to studio-based BIM teaching in 2018.",          expertise: ["Studio Design", "BIM-led Pedagogy", "Heritage"],         yearsExperience: 28, city: "New Delhi", email: "aruna.singh@spa.ac.in", linkedin: "in/arunasingh", highlights: ["Authored 'Heritage in Practice' (2019)", "JIA Gold Medal — 2014"],          courseIds: ["crs-spa-1", "crs-spa-2"] },
  { id: "fac-spa-2", instituteId: "spa-delhi",   name: "Prof. Vikram Bhalla",   title: "Chair, Urban Planning",      initials: "VB", color: f(1), bio: "Urban planner with a portfolio of master plans across north India. Advisor to the MoHUA on Smart City benchmarks.",   expertise: ["Master Planning", "Transit-Oriented Development", "GIS"], yearsExperience: 24, city: "New Delhi", email: "vbhalla@spa.ac.in",      linkedin: "in/vikrambhalla",        highlights: ["MoHUA Smart City Advisor", "MIT-SPA Joint Studio"],                        courseIds: ["crs-spa-3"] },
  { id: "fac-spa-3", instituteId: "spa-delhi",   name: "Prof. Maya Khurana",    title: "Faculty, Landscape Design",  initials: "MK", color: f(2), bio: "Practising landscape architect specialising in dryland ecology and water-sensitive urban design.",                       expertise: ["Landscape", "Water-Sensitive Design", "Native Planting"],  yearsExperience: 18, city: "New Delhi", email: "mkhurana@spa.ac.in",     linkedin: "in/mayakhurana",         highlights: ["IFLA APR Award 2021", "Rajasthan Bawari Restoration"],                     courseIds: ["crs-spa-4"] },
  { id: "fac-spa-4", instituteId: "spa-delhi",   name: "Prof. Devansh Mohan",   title: "Faculty, Industrial Design", initials: "DM", color: f(3), bio: "Industrial designer + product strategist with stints at Titan and Tata Elxsi.",                                          expertise: ["Product", "Materials", "UX"],                              yearsExperience: 15, city: "New Delhi", email: "dmohan@spa.ac.in",       linkedin: "in/devanshmohan",        highlights: ["IF Design Award 2019", "Tata Elxsi Innovation Council"],                  courseIds: ["crs-spa-5"] },

  // ─── IIT Roorkee ─────────────────────────────────────────────────────────
  { id: "fac-iitr-1", instituteId: "iit-roorkee", name: "Prof. Rohit Mathur",    title: "Head, Department of Arch & Planning", initials: "RM", color: f(0), bio: "Structural engineer-turned-architect. Leads IIT Roorkee's research in long-span seismic design.",                 expertise: ["Seismic Design", "Structural Architecture"],            yearsExperience: 26, city: "Roorkee", email: "rmathur@iitr.ac.in", linkedin: "in/rohitmathur",     highlights: ["IUSSTF Fellow", "Co-authored IS 1893 commentary"],                       courseIds: ["crs-iitr-1", "crs-iitr-2"] },
  { id: "fac-iitr-2", instituteId: "iit-roorkee", name: "Dr. Anushka Kapoor",   title: "Assoc. Prof. — Urban Planning",         initials: "AK", color: f(1), bio: "Planning researcher with a focus on Himalayan towns and climate resilience.",                                      expertise: ["Regional Planning", "Climate Resilience"],              yearsExperience: 19, city: "Roorkee", email: "akapoor@iitr.ac.in", linkedin: "in/anushkakapoor",   highlights: ["UNESCO Himalaya Programme", "Smart City Dehradun"],                       courseIds: ["crs-iitr-3"] },
  { id: "fac-iitr-3", instituteId: "iit-roorkee", name: "Dr. Saurav Patel",    title: "Assoc. Prof. — Building Science",      initials: "SP", color: f(4), bio: "Building-physics researcher. ETH Zürich alumnus. Runs the Comfort & Energy Lab at IIT Roorkee.",                  expertise: ["Building Physics", "HVAC Modelling", "Comfort"],        yearsExperience: 17, city: "Roorkee", email: "spatel@iitr.ac.in",  linkedin: "in/sauravpatel",     highlights: ["LEED AP O+M Faculty", "ASHRAE India Chair"],                              courseIds: ["crs-iitr-4"] },
  { id: "fac-iitr-4", instituteId: "iit-roorkee", name: "Dr. Tara Pillai",     title: "Asst. Prof. — Computational Design",   initials: "TP", color: f(2), bio: "Computational designer focused on robotic fabrication and material systems.",                                    expertise: ["Computation", "Robotic Fabrication", "Material Systems"], yearsExperience: 11, city: "Roorkee", email: "tpillai@iitr.ac.in", linkedin: "in/tarapillai",     highlights: ["ACADIA 2023 Best Paper", "Bartlett B-Pro Alumna"],                        courseIds: ["crs-iitr-5"] },

  // ─── CEPT ────────────────────────────────────────────────────────────────
  { id: "fac-cept-1", instituteId: "cept",        name: "Prof. Yatin Pandya",   title: "Founder, Footprints Earth | Visiting Faculty", initials: "YP", color: f(3), bio: "Padma Shri awardee. Champion of vernacular sustainability across CEPT for three decades.",                expertise: ["Vernacular", "Earth Construction", "Heritage"],          yearsExperience: 34, city: "Ahmedabad", email: "ypandya@cept.ac.in", linkedin: "in/yatinpandya",   highlights: ["Padma Shri 2021", "UIA Friendly & Peaceful Cities"],                       courseIds: ["crs-cept-1", "crs-cept-2"] },
  { id: "fac-cept-2", instituteId: "cept",        name: "Prof. Yamini Mehta",  title: "Faculty, Building Energy Performance",          initials: "YM", color: f(5), bio: "Building energy modeller. Trains MEP teams across India on ECBC compliance.",                              expertise: ["BEP", "ECBC", "Energy Modelling"],                       yearsExperience: 16, city: "Ahmedabad", email: "ymehta@cept.ac.in",   linkedin: "in/yaminimehta",      highlights: ["ECBC Master Trainer — BEE", "Energy+ Award 2022"],                          courseIds: ["crs-cept-3"] },
  { id: "fac-cept-3", instituteId: "cept",        name: "Prof. Manish Trivedi", title: "Faculty, Architecture Studios",                initials: "MT", color: f(6), bio: "Practising architect (founder, MTD Architects). Specialises in low-rise high-density housing.",            expertise: ["Housing", "Studio Design"],                              yearsExperience: 20, city: "Ahmedabad", email: "mtrivedi@cept.ac.in", linkedin: "in/manishtrivedi",    highlights: ["IIA National Award 2018", "Aga Khan Asia Nominee"],                          courseIds: ["crs-cept-4"] },
  { id: "fac-cept-4", instituteId: "cept",        name: "Prof. Rina Saxena",   title: "Faculty, Interior Architecture",               initials: "RS", color: f(7), bio: "Veteran interior architect with a portfolio spanning the Oberoi Group and Park Hotels.",                 expertise: ["Interior Architecture", "Hospitality Design"],            yearsExperience: 22, city: "Ahmedabad", email: "rsaxena@cept.ac.in", linkedin: "in/rinasaxena",       highlights: ["Inside-Outside Awards 2017", "Park Hyatt Goa lead"],                          courseIds: ["crs-cept-5"] },

  // ─── NID ─────────────────────────────────────────────────────────────────
  { id: "fac-nid-1", instituteId: "nid-ahmedabad", name: "Prof. Anant Nigam",   title: "Chair, Industrial Design",     initials: "AN", color: f(2), bio: "Product designer with stints at Philips Design and Tata Elxsi.",                                                 expertise: ["Industrial Design", "DFM", "Materials"],            yearsExperience: 25, city: "Ahmedabad", email: "anigam@nid.edu",   linkedin: "in/anantnigam",    highlights: ["IF Design Award 2018", "Tata Innovation Council"],                          courseIds: ["crs-nid-1"] },
  { id: "fac-nid-2", instituteId: "nid-ahmedabad", name: "Prof. Shilpa Das",    title: "Faculty, Design Research",      initials: "SD", color: f(5), bio: "Design researcher exploring craft-tech bridges and policy.",                                                  expertise: ["Design Research", "Craft", "Policy"],                yearsExperience: 19, city: "Ahmedabad", email: "sdas@nid.edu",     linkedin: "in/shilpadas",     highlights: ["Cumulus Asia Chair", "Author 'Craft & Code' (2021)"],                       courseIds: ["crs-nid-2"] },
  { id: "fac-nid-3", instituteId: "nid-ahmedabad", name: "Prof. Karthik Iyer", title: "Faculty, Interaction Design",   initials: "KI", color: f(7), bio: "HCI researcher with a focus on accessibility-first design.",                                                  expertise: ["Interaction Design", "Accessibility", "UX"],         yearsExperience: 14, city: "Ahmedabad", email: "kiyer@nid.edu",    linkedin: "in/karthikiyer",   highlights: ["NID Director's Award 2022", "Inclusive India Charter"],                       courseIds: ["crs-nid-3"] },

  // ─── IIAD ────────────────────────────────────────────────────────────────
  { id: "fac-iiad-1", instituteId: "iiad",       name: "Prof. Sonal Kapoor",  title: "Faculty, Interior Architecture", initials: "SK", color: f(1), bio: "Interior architect + Kingston-validated tutor. Specialises in adaptive reuse.",                                expertise: ["Adaptive Reuse", "Interior Architecture"],            yearsExperience: 17, city: "New Delhi", email: "skapoor@iiad.edu.in", linkedin: "in/sonalkapoor",  highlights: ["Adaptive Reuse Award 2020", "Kingston Validation Lead"],                     courseIds: ["crs-iiad-1"] },
  { id: "fac-iiad-2", instituteId: "iiad",       name: "Prof. Amey Patkar",   title: "Faculty, Product Design",         initials: "AP", color: f(0), bio: "Product designer with experience at Logitech and Cult.Fit.",                                                   expertise: ["Product", "DFM", "Consumer Tech"],                    yearsExperience: 13, city: "New Delhi", email: "apatkar@iiad.edu.in", linkedin: "in/ameypatkar",   highlights: ["Red Dot Honoree 2022", "Logitech Design Council"],                            courseIds: ["crs-iiad-2"] },

  // ─── RICS SBE ────────────────────────────────────────────────────────────
  { id: "fac-rics-1", instituteId: "rics-sbe",   name: "Dr. Ramesh Iyer",     title: "Faculty, BIM",                     initials: "RI", color: f(0), bio: "BIM evangelist with 22 years of Revit teaching. Lead author of RICS India's BIM curriculum.",                  expertise: ["BIM", "Revit", "ISO 19650"],                          yearsExperience: 22, city: "Mumbai",   email: "riyer@ricssbe.edu.in", linkedin: "in/rameshiyer",   highlights: ["Autodesk Master Trainer 2017", "RICS Curriculum Lead"],                       courseIds: ["crs-rics-1", "crs-rics-2"] },
  { id: "fac-rics-2", instituteId: "rics-sbe",   name: "Priya Suresh",        title: "Faculty, AutoCAD & Detailing",     initials: "PS", color: f(2), bio: "Architect + author specialising in construction documentation.",                                            expertise: ["AutoCAD", "Detailing", "BoQ"],                         yearsExperience: 14, city: "Mumbai",   email: "psuresh@ricssbe.edu.in", linkedin: "in/priyasuresh", highlights: ["Author 'AutoCAD Sheet Sets'", "RICS Educator of the Year 2023"],            courseIds: ["crs-rics-3"] },
  { id: "fac-rics-3", instituteId: "rics-sbe",   name: "Aanchal Saxena",      title: "Faculty, QS & Cost Management",    initials: "AS", color: f(3), bio: "Chartered QS (MRICS). Cost-managed L&T's airport portfolio for six years.",                                expertise: ["QS", "Cost Engineering", "Contracts"],                yearsExperience: 16, city: "Noida",    email: "asaxena@ricssbe.edu.in", linkedin: "in/aanchalsaxena", highlights: ["MRICS Membership 2018", "L&T Cost Lead — Airports"],                     courseIds: ["crs-rics-4"] },

  // ─── Harvard GSD ─────────────────────────────────────────────────────────
  { id: "fac-h-1", instituteId: "harvard-gsd", name: "Prof. Sarah Williams",   title: "Chair, MArch I",                  initials: "SW", color: f(0), bio: "Architect and urbanist. Founder of the Civic Data Design Lab at MIT before joining Harvard.",                 expertise: ["Civic Data", "Urbanism", "Studio Pedagogy"],          yearsExperience: 21, city: "Cambridge, MA", email: "swilliams@gsd.harvard.edu", linkedin: "in/sarahwilliams", highlights: ["AIA NY Award 2022", "TED Speaker"],                                          courseIds: ["crs-h-1", "crs-h-2"] },
  { id: "fac-h-2", instituteId: "harvard-gsd", name: "Prof. Mohsen Mostafavi", title: "Distinguished Professor",          initials: "MM", color: f(1), bio: "Former Dean of Harvard GSD. Theorist of ecological urbanism and architecture.",                                expertise: ["Ecological Urbanism", "Theory"],                       yearsExperience: 35, city: "Cambridge, MA", email: "mmostafavi@gsd.harvard.edu", linkedin: "in/mohsenmostafavi", highlights: ["Editor 'Ecological Urbanism'", "Pritzker Prize Jury"],                courseIds: ["crs-h-3"] },
  { id: "fac-h-3", instituteId: "harvard-gsd", name: "Prof. Charles Waldheim", title: "John E. Irving Professor — Landscape", initials: "CW", color: f(2), bio: "Landscape urbanist. Editor of the Harvard Design Magazine.",                                                 expertise: ["Landscape Urbanism", "Theory"],                       yearsExperience: 25, city: "Cambridge, MA", email: "cwaldheim@gsd.harvard.edu", linkedin: "in/charleswaldheim", highlights: ["Author 'Landscape as Urbanism'", "ASLA Honor Award"],                  courseIds: ["crs-h-4"] },

  // ─── MIT ─────────────────────────────────────────────────────────────────
  { id: "fac-mit-1", instituteId: "mit-architecture", name: "Prof. Caitlin Mueller", title: "Assoc. Prof. — Structures & Computation", initials: "CM", color: f(5), bio: "Structural designer + computational researcher. Leads MIT's Digital Structures Group.",                       expertise: ["Computational Design", "Structural Optimisation"],     yearsExperience: 14, city: "Cambridge, MA", email: "cmueller@mit.edu", linkedin: "in/caitlinmueller", highlights: ["MIT Bose Fellowship", "ACADIA Award"],                                       courseIds: ["crs-mit-1", "crs-mit-2"] },
  { id: "fac-mit-2", instituteId: "mit-architecture", name: "Prof. Sheila Kennedy",  title: "Professor of Practice",                    initials: "SK", color: f(6), bio: "Architect + materials innovator. Principal of KVA Matx.",                                                       expertise: ["Materials", "Soft Architecture"],                       yearsExperience: 28, city: "Cambridge, MA", email: "skennedy@mit.edu", linkedin: "in/sheilakennedy", highlights: ["Cooper Hewitt Award", "Smithsonian acquisition"],                              courseIds: ["crs-mit-3"] },

  // ─── UCLA AUD ────────────────────────────────────────────────────────────
  { id: "fac-ucla-1", instituteId: "ucla-auD", name: "Prof. Greg Lynn",       title: "SUPRASTUDIO Lead",                initials: "GL", color: f(4), bio: "Pioneer of digital architecture. Founder of FORM, MacArthur Fellow.",                                            expertise: ["Animate Form", "Robotics", "Speculative Design"],     yearsExperience: 33, city: "Los Angeles, CA", email: "glynn@aud.ucla.edu", linkedin: "in/greglynn", highlights: ["MacArthur Fellow 2003", "Venice Biennale Curator"],                          courseIds: ["crs-ucla-1"] },
  { id: "fac-ucla-2", instituteId: "ucla-auD", name: "Prof. Tom Wiscombe",    title: "MArch I Coordinator",             initials: "TW", color: f(0), bio: "Founder of Tom Wiscombe Architecture. Known for object-oriented architecture.",                              expertise: ["Object-Oriented Architecture", "Form Theory"],         yearsExperience: 21, city: "Los Angeles, CA", email: "twiscombe@aud.ucla.edu", linkedin: "in/tomwiscombe", highlights: ["LA AIA Honor Award", "TWA monograph 2020"],                                courseIds: ["crs-ucla-2"] },

  // ─── AA London ───────────────────────────────────────────────────────────
  { id: "fac-aa-1", instituteId: "aa-london", name: "Prof. Patrik Schumacher", title: "Director, DRL",                  initials: "PS", color: f(3), bio: "Principal of Zaha Hadid Architects. Theorist of parametricism. DRL lead since 1996.",                       expertise: ["Parametricism", "DRL", "Computational Design"],      yearsExperience: 30, city: "London", email: "schumacher@aaschool.ac.uk", linkedin: "in/patrikschumacher", highlights: ["RIBA Stirling Prize 2010, 2011", "ZHA Principal"],                            courseIds: ["crs-aa-1", "crs-aa-2"] },
  { id: "fac-aa-2", instituteId: "aa-london", name: "Prof. Eyal Weizman",     title: "Forensic Architecture Founder",   initials: "EW", color: f(2), bio: "Architect + spatial investigator. Founder of Forensic Architecture at Goldsmiths, AA visiting faculty.",  expertise: ["Forensic Architecture", "Spatial Theory"],            yearsExperience: 22, city: "London", email: "weizman@aaschool.ac.uk",     linkedin: "in/eyalweizman", highlights: ["MacArthur Fellow 2019", "Turner Prize Nominee"],                              courseIds: ["crs-aa-3"] },

  // ─── Bartlett ────────────────────────────────────────────────────────────
  { id: "fac-bt-1", instituteId: "bartlett-ucl", name: "Prof. Mario Carpo",    title: "Reyner Banham Professor — Theory", initials: "MC", color: f(1), bio: "Architect + theorist. Author of 'The Second Digital Turn'.",                                                 expertise: ["Theory", "Digital Turn"],                             yearsExperience: 32, city: "London", email: "mcarpo@ucl.ac.uk",    linkedin: "in/mariocarpo",   highlights: ["Author 'The Second Digital Turn'", "Yale Visiting Chair"],                  courseIds: ["crs-bt-1"] },
  { id: "fac-bt-2", instituteId: "bartlett-ucl", name: "Prof. Frédéric Migayrou", title: "Bartlett Professor of Architecture", initials: "FM", color: f(4), bio: "Curator + scholar of contemporary architecture. Chief curator of architecture at Centre Pompidou (2000–2014).", expertise: ["Curation", "Contemporary Architecture"],            yearsExperience: 35, city: "London", email: "fmigayrou@ucl.ac.uk", linkedin: "in/fredericmigayrou", highlights: ["Centre Pompidou Curator", "Venice Biennale Curator"],                courseIds: ["crs-bt-2"] },

  // ─── ETH Zurich ──────────────────────────────────────────────────────────
  { id: "fac-eth-1", instituteId: "eth-zurich", name: "Prof. Philippe Block", title: "Co-Director, Block Research Group", initials: "PB", color: f(5), bio: "Structural engineer + architect. Pioneer of compression-only shells.",                                       expertise: ["Compression Structures", "Computation", "Sustainability"], yearsExperience: 18, city: "Zürich", email: "block@arch.ethz.ch", linkedin: "in/philippeblock", highlights: ["MIT Catalyst Award 2019", "Sustainable Concrete Pavilion 2022"],             courseIds: ["crs-eth-1"] },
  { id: "fac-eth-2", instituteId: "eth-zurich", name: "Prof. Fabio Gramazio", title: "Co-Director, Gramazio Kohler Research", initials: "FG", color: f(0), bio: "Architect + roboticist. Pioneer of robotic fabrication in architecture.",                                expertise: ["Robotic Fabrication", "Digital Materiality"],          yearsExperience: 22, city: "Zürich", email: "gramazio@arch.ethz.ch", linkedin: "in/fabiogramazio", highlights: ["Acadia Award", "Curtain Wall robot patent"],                                 courseIds: ["crs-eth-2"] },

  // ─── SCI-Arc ─────────────────────────────────────────────────────────────
  { id: "fac-sci-1", instituteId: "sci-arc", name: "Prof. Hernán Díaz Alonso", title: "Director, SCI-Arc",               initials: "HA", color: f(3), bio: "Argentine-American architect. Founder of HDA-X. Leads SCI-Arc since 2015.",                                expertise: ["Speculative Design", "Form"],                          yearsExperience: 27, city: "Los Angeles, CA", email: "hdalonso@sciarc.edu", linkedin: "in/hernandiazalonso", highlights: ["AIA LA Gold Medal", "Beijing Biennale Chief Curator"],                  courseIds: ["crs-sci-1"] },
  { id: "fac-sci-2", instituteId: "sci-arc", name: "Prof. Marcelo Spina",     title: "Distinguished Faculty",             initials: "MS", color: f(4), bio: "Co-founder of P-A-T-T-E-R-N-S. Pioneer of digital fabrication in education.",                            expertise: ["Robotics", "Fabrication", "Studios"],                  yearsExperience: 22, city: "Los Angeles, CA", email: "mspina@sciarc.edu",   linkedin: "in/marcelospina", highlights: ["P-A-T-T-E-R-N-S Monograph 2018", "Royal Academy NextGen"],                   courseIds: ["crs-sci-2"] },

  // ─── IGBC ────────────────────────────────────────────────────────────────
  { id: "fac-igbc-1", instituteId: "igbc-training", name: "Mahesh Ramanujam", title: "Senior Trainer (Visiting)",       initials: "MR", color: f(1), bio: "Former CEO USGBC. Now leads global net-zero training for IGBC.",                                          expertise: ["Net Zero", "LEED", "Policy"],                          yearsExperience: 25, city: "Washington / Hyderabad", email: "mahesh@igbc.in", linkedin: "in/maheshramanujam", highlights: ["Former CEO USGBC", "World GBC Board Member"],                          courseIds: ["crs-igbc-1", "crs-igbc-2"] },
  { id: "fac-igbc-2", instituteId: "igbc-training", name: "Dr. Suniti Sharma", title: "Lead — IGBC Education",            initials: "SS", color: f(2), bio: "Architect + sustainability consultant. IGBC AP since 2009.",                                            expertise: ["IGBC AP", "Net Zero", "Embodied Carbon"],            yearsExperience: 17, city: "Hyderabad", email: "ssharma@igbc.in", linkedin: "in/sunitisharma", highlights: ["IGBC AP Faculty of the Year 2022", "World GBC Carbon Pilot"],                courseIds: ["crs-igbc-3"] },
];

// ============================================
// Courses
// ============================================

export const INSTITUTE_COURSES: InstituteCourse[] = [
  // SPA Delhi
  { id: "crs-spa-1", instituteId: "spa-delhi", title: "Bachelor of Architecture (B.Arch)", shortDescription: "5-year full-time professional degree in architecture.", level: "undergraduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "English", feeLabel: "₹1.4 L / year", feeNumeric: 140000, startDate: "2026-08-04", intakeSize: 80, rating: 4.8, enrolled: 400, coverImage: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["COA registration", "Eligibility for M.Arch globally", "Studio portfolio of 8+ projects"],
    curriculum: [
      { id: "crs-spa-1-m1", title: "Foundation Studio + History", weeks: 32, topics: ["Drawing & Representation", "History of Architecture I", "Building Construction I"], facultyId: "fac-spa-1" },
      { id: "crs-spa-1-m2", title: "Housing + Climate Studio",    weeks: 32, topics: ["Housing Studio", "Climate & Comfort", "Structures I"], facultyId: "fac-spa-1" },
      { id: "crs-spa-1-m3", title: "Urban Design Studio",          weeks: 32, topics: ["Urban Studio", "Theory of Settlements", "Working Drawings"], facultyId: "fac-spa-2" },
      { id: "crs-spa-1-m4", title: "Pre-thesis + Tech",            weeks: 32, topics: ["Pre-thesis", "Smart Buildings", "Professional Practice"], facultyId: "fac-spa-1" },
      { id: "crs-spa-1-m5", title: "Thesis",                       weeks: 32, topics: ["Thesis design", "Architectural critique"] },
    ],
    facultyIds: ["fac-spa-1", "fac-spa-2"],
  },
  { id: "crs-spa-2", instituteId: "spa-delhi", title: "M.Arch — Architectural Conservation", shortDescription: "Two-year post-graduate in conservation, with NCF heritage projects.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.2 L / year", feeNumeric: 120000, startDate: "2026-08-04", intakeSize: 20, rating: 4.7, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1568667256549-094345857637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Heritage Impact Assessment", "Conservation thesis", "Hands-on with NCF / ASI sites"],
    curriculum: [
      { id: "crs-spa-2-m1", title: "Conservation Theory + Surveys", weeks: 16, topics: ["History", "Material conservation", "Documentation"], facultyId: "fac-spa-1" },
      { id: "crs-spa-2-m2", title: "Site Studio + Live Project",     weeks: 24, topics: ["Live conservation studio", "Drawings + tendering"], facultyId: "fac-spa-1" },
      { id: "crs-spa-2-m3", title: "Thesis",                          weeks: 40, topics: ["Conservation thesis"] },
    ],
    facultyIds: ["fac-spa-1"],
  },
  { id: "crs-spa-3", instituteId: "spa-delhi", title: "MURP — Urban & Regional Planning", shortDescription: "Two-year planning programme covering TOD, smart city benchmarks and urban policy.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.2 L / year", feeNumeric: 120000, startDate: "2026-08-04", intakeSize: 30, rating: 4.6, enrolled: 60, coverImage: "https://images.unsplash.com/photo-1597004822334-3da18d7df9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["TOD studio portfolio", "GIS competence", "Smart-city benchmarks practicum"],
    curriculum: [
      { id: "crs-spa-3-m1", title: "Planning Theory + GIS",        weeks: 16, topics: ["Planning theory", "GIS"], facultyId: "fac-spa-2" },
      { id: "crs-spa-3-m2", title: "Master Planning Studio",       weeks: 24, topics: ["Master plans", "TOD"], facultyId: "fac-spa-2" },
      { id: "crs-spa-3-m3", title: "Live Project + Thesis",         weeks: 40, topics: ["Live planning project", "Thesis"] },
    ],
    facultyIds: ["fac-spa-2"],
  },
  { id: "crs-spa-4", instituteId: "spa-delhi", title: "M.Arch — Landscape Architecture", shortDescription: "Two-year programme with strong dryland ecology + water-sensitive design.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.2 L / year", feeNumeric: 120000, startDate: "2026-08-04", intakeSize: 18, rating: 4.6, enrolled: 36, coverImage: "https://images.unsplash.com/photo-1558005530-a7958896ec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["IFLA-ready portfolio", "Ecology + planting practicum"],
    curriculum: [
      { id: "crs-spa-4-m1", title: "Ecology + Materials",          weeks: 16, topics: ["Dryland ecology", "Materials"], facultyId: "fac-spa-3" },
      { id: "crs-spa-4-m2", title: "Landscape Studio",              weeks: 24, topics: ["WSUD studio"], facultyId: "fac-spa-3" },
      { id: "crs-spa-4-m3", title: "Live Project + Thesis",         weeks: 40, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-spa-3"],
  },
  { id: "crs-spa-5", instituteId: "spa-delhi", title: "Master of Industrial Design", shortDescription: "Materials, product strategy and DFM in 2 years.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.2 L / year", feeNumeric: 120000, intakeSize: 20, rating: 4.4, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1620912189865-ae3c2bb6c8a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Product portfolio", "DFM practicum", "Industry partner project"],
    curriculum: [
      { id: "crs-spa-5-m1", title: "Materials + Manufacturing",     weeks: 16, topics: ["Materials", "DFM"], facultyId: "fac-spa-4" },
      { id: "crs-spa-5-m2", title: "Product Studios",                weeks: 40, topics: ["Studio 1", "Studio 2"], facultyId: "fac-spa-4" },
      { id: "crs-spa-5-m3", title: "Thesis + Industry Project",     weeks: 24, topics: ["Industry-sponsored thesis"] },
    ],
    facultyIds: ["fac-spa-4"],
  },

  // IIT Roorkee
  { id: "crs-iitr-1", instituteId: "iit-roorkee", title: "Bachelor of Architecture (B.Arch)", shortDescription: "5-year B.Arch with strong structural and computational core.", level: "undergraduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "English", feeLabel: "₹2.2 L / year", feeNumeric: 220000, startDate: "2026-07-22", intakeSize: 40, rating: 4.7, enrolled: 200, coverImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["COA registration", "Strong placement record", "Computational portfolio"],
    curriculum: [
      { id: "crs-iitr-1-m1", title: "Foundation + Drawing",      weeks: 32, topics: ["Studio I", "History I", "Materials I"], facultyId: "fac-iitr-1" },
      { id: "crs-iitr-1-m2", title: "Structures + Building Tech",weeks: 32, topics: ["Structures", "Building physics"], facultyId: "fac-iitr-3" },
      { id: "crs-iitr-1-m3", title: "Urban Studio + Climate",     weeks: 32, topics: ["Urban Studio", "Climate"], facultyId: "fac-iitr-2" },
      { id: "crs-iitr-1-m4", title: "Computation + Pre-thesis",   weeks: 32, topics: ["Computational design", "Pre-thesis"], facultyId: "fac-iitr-4" },
      { id: "crs-iitr-1-m5", title: "Thesis",                      weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-iitr-1", "fac-iitr-3", "fac-iitr-2", "fac-iitr-4"],
  },
  { id: "crs-iitr-2", instituteId: "iit-roorkee", title: "M.Arch — Building Engineering & Management", shortDescription: "Two-year programme with industry-immersion modules.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.9 L / year", feeNumeric: 190000, startDate: "2026-07-22", intakeSize: 20, rating: 4.7, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Site-execution toolkit", "BEP modelling", "Industry capstone"],
    curriculum: [
      { id: "crs-iitr-2-m1", title: "BEM Foundations",  weeks: 16, topics: ["Construction tech", "Energy"], facultyId: "fac-iitr-1" },
      { id: "crs-iitr-2-m2", title: "BEP + Smart Buildings", weeks: 24, topics: ["BEP", "Smart buildings"], facultyId: "fac-iitr-3" },
      { id: "crs-iitr-2-m3", title: "Industry Capstone + Thesis", weeks: 40, topics: ["Capstone", "Thesis"] },
    ],
    facultyIds: ["fac-iitr-1", "fac-iitr-3"],
  },
  { id: "crs-iitr-3", instituteId: "iit-roorkee", title: "MURP — Urban & Regional Planning",  shortDescription: "Strength in Himalayan towns + climate resilience.",        level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹1.9 L / year", feeNumeric: 190000, startDate: "2026-07-22", intakeSize: 20, rating: 4.6, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1597004822334-3da18d7df9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Himalayan planning practicum", "GIS toolkit"],
    curriculum: [
      { id: "crs-iitr-3-m1", title: "Planning Theory + GIS", weeks: 16, topics: ["Planning theory", "GIS"], facultyId: "fac-iitr-2" },
      { id: "crs-iitr-3-m2", title: "Himalayan Studio", weeks: 24, topics: ["Himalayan studio"], facultyId: "fac-iitr-2" },
      { id: "crs-iitr-3-m3", title: "Thesis", weeks: 40, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-iitr-2"],
  },
  { id: "crs-iitr-4", instituteId: "iit-roorkee", title: "Executive Ed — Building Performance Lab", shortDescription: "6-month executive ed in HVAC + BEP modelling.", level: "executive-ed", durationLabel: "6 months", totalWeeks: 24, studyMode: "hybrid", language: "English", feeLabel: "₹95,000", feeNumeric: 95000, startDate: "2026-08-12", intakeSize: 30, rating: 4.6, enrolled: 90, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["ASHRAE-ready toolkit", "Sandbox energy models"],
    curriculum: [
      { id: "crs-iitr-4-m1", title: "Building Physics",       weeks: 8, topics: ["Thermodynamics", "Air-flow"], facultyId: "fac-iitr-3" },
      { id: "crs-iitr-4-m2", title: "Energy + HVAC Modelling", weeks: 8, topics: ["EnergyPlus", "OpenStudio"], facultyId: "fac-iitr-3" },
      { id: "crs-iitr-4-m3", title: "Live Project",             weeks: 8, topics: ["Live energy audit"] },
    ],
    facultyIds: ["fac-iitr-3"],
  },
  { id: "crs-iitr-5", instituteId: "iit-roorkee", title: "Certificate — Robotic Fabrication for Architects", shortDescription: "8-week intensive on robotic toolpaths + material systems.", level: "certificate", durationLabel: "8 weeks", totalWeeks: 8, studyMode: "on-campus", language: "English", feeLabel: "₹60,000", feeNumeric: 60000, startDate: "2026-06-02", intakeSize: 18, rating: 4.8, enrolled: 18, coverImage: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Robotic toolpath authorship", "Material system prototype"],
    curriculum: [
      { id: "crs-iitr-5-m1", title: "Robotic Toolpaths",         weeks: 3, topics: ["Toolpath design", "Grasshopper"], facultyId: "fac-iitr-4" },
      { id: "crs-iitr-5-m2", title: "Material Systems",          weeks: 3, topics: ["Wood", "Ceramic"], facultyId: "fac-iitr-4" },
      { id: "crs-iitr-5-m3", title: "Capstone Pavilion",          weeks: 2, topics: ["Pavilion build"], facultyId: "fac-iitr-4" },
    ],
    facultyIds: ["fac-iitr-4"],
  },

  // CEPT
  { id: "crs-cept-1", instituteId: "cept", title: "Bachelor of Architecture (B.Arch)", shortDescription: "5-year studio-led B.Arch — CEPT's flagship.", level: "undergraduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "English", feeLabel: "₹2.0 L / year", feeNumeric: 200000, startDate: "2026-07-15", intakeSize: 90, rating: 4.8, enrolled: 450, coverImage: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["CEPT thesis portfolio", "COA registration"],
    curriculum: [
      { id: "crs-cept-1-m1", title: "Foundation + Drawing", weeks: 32, topics: ["Drawing", "Studio I"], facultyId: "fac-cept-3" },
      { id: "crs-cept-1-m2", title: "Housing Studio",        weeks: 32, topics: ["Housing"], facultyId: "fac-cept-3" },
      { id: "crs-cept-1-m3", title: "Vernacular Studio",     weeks: 32, topics: ["Vernacular materials", "Earth construction"], facultyId: "fac-cept-1" },
      { id: "crs-cept-1-m4", title: "Pre-thesis",            weeks: 32, topics: ["Pre-thesis"] },
      { id: "crs-cept-1-m5", title: "Thesis",                weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-cept-1", "fac-cept-3"],
  },
  { id: "crs-cept-2", instituteId: "cept", title: "M.Arch — Architectural Design", shortDescription: "Two-year exploratory MArch with focus on craft + materials.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹2.4 L / year", feeNumeric: 240000, startDate: "2026-07-15", intakeSize: 25, rating: 4.7, enrolled: 50, coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Material-led portfolio", "Studio-led thesis"],
    curriculum: [
      { id: "crs-cept-2-m1", title: "Material Studios",         weeks: 24, topics: ["Earth", "Stone", "Wood"], facultyId: "fac-cept-1" },
      { id: "crs-cept-2-m2", title: "Design Studio",             weeks: 24, topics: ["Studio 2"], facultyId: "fac-cept-3" },
      { id: "crs-cept-2-m3", title: "Thesis",                     weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-cept-1", "fac-cept-3"],
  },
  { id: "crs-cept-3", instituteId: "cept", title: "MTech — Building Energy Performance", shortDescription: "Two-year MTech with industry partners on building energy modelling.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹2.4 L / year", feeNumeric: 240000, intakeSize: 20, rating: 4.7, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["BEP toolkit", "ECBC compliance practicum"],
    curriculum: [
      { id: "crs-cept-3-m1", title: "Building Physics",          weeks: 16, topics: ["Thermodynamics", "Air-flow"], facultyId: "fac-cept-2" },
      { id: "crs-cept-3-m2", title: "Modelling + ECBC",          weeks: 24, topics: ["BEP", "ECBC"], facultyId: "fac-cept-2" },
      { id: "crs-cept-3-m3", title: "Live + Thesis",              weeks: 40, topics: ["Live energy audit"] },
    ],
    facultyIds: ["fac-cept-2"],
  },
  { id: "crs-cept-4", instituteId: "cept", title: "Master in Interior Architecture", shortDescription: "Hospitality-led MIA programme.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹2.4 L / year", feeNumeric: 240000, intakeSize: 20, rating: 4.6, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Hospitality folio", "Materials + lighting practicum"],
    curriculum: [
      { id: "crs-cept-4-m1", title: "Spatial Design",          weeks: 24, topics: ["Spatial", "Hospitality"], facultyId: "fac-cept-4" },
      { id: "crs-cept-4-m2", title: "Materials + Lighting",    weeks: 24, topics: ["Materials", "Lighting"], facultyId: "fac-cept-4" },
      { id: "crs-cept-4-m3", title: "Thesis",                   weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-cept-4"],
  },
  { id: "crs-cept-5", instituteId: "cept", title: "Summer School — Architecture & Cinema", shortDescription: "Six-week summer school combining film + architectural research.", level: "certificate", durationLabel: "6 weeks", totalWeeks: 6, studyMode: "on-campus", language: "English", feeLabel: "₹45,000", feeNumeric: 45000, intakeSize: 30, rating: 4.8, enrolled: 60, coverImage: "https://images.unsplash.com/photo-1505373876331-ff89baa8ce3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Short film portfolio", "Architectural research practicum"],
    curriculum: [
      { id: "crs-cept-5-m1", title: "Film + Architecture", weeks: 3, topics: ["Storyboarding", "Architecture in film"], facultyId: "fac-cept-3" },
      { id: "crs-cept-5-m2", title: "Capstone",            weeks: 3, topics: ["Short film"] },
    ],
    facultyIds: ["fac-cept-3"],
  },

  // NID
  { id: "crs-nid-1", instituteId: "nid-ahmedabad", title: "Master of Design — Industrial Design", shortDescription: "Two-year MDes in industrial design with strong DFM emphasis.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹3.5 L / year", feeNumeric: 350000, intakeSize: 20, rating: 4.7, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1620912189865-ae3c2bb6c8a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Product portfolio", "Industry capstone"],
    curriculum: [
      { id: "crs-nid-1-m1", title: "Foundation + Materials", weeks: 24, topics: ["Materials", "Drawing"], facultyId: "fac-nid-1" },
      { id: "crs-nid-1-m2", title: "Studios",                weeks: 24, topics: ["Product studio"], facultyId: "fac-nid-1" },
      { id: "crs-nid-1-m3", title: "Industry Thesis",         weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-nid-1"],
  },
  { id: "crs-nid-2", instituteId: "nid-ahmedabad", title: "MDes — Design for Research & Development", shortDescription: "Research-led MDes for policy + culture practitioners.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹3.5 L / year", feeNumeric: 350000, intakeSize: 20, rating: 4.6, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Research thesis", "Policy practicum"],
    curriculum: [
      { id: "crs-nid-2-m1", title: "Research Methods",     weeks: 24, topics: ["Quant + qual"], facultyId: "fac-nid-2" },
      { id: "crs-nid-2-m2", title: "Cases + Policy",        weeks: 24, topics: ["Policy"], facultyId: "fac-nid-2" },
      { id: "crs-nid-2-m3", title: "Thesis",                 weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-nid-2"],
  },
  { id: "crs-nid-3", instituteId: "nid-ahmedabad", title: "MDes — Interaction Design", shortDescription: "Two-year MDes with accessibility-first design pedagogy.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹3.5 L / year", feeNumeric: 350000, intakeSize: 20, rating: 4.7, enrolled: 40, coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Accessibility folio", "Interaction prototypes"],
    curriculum: [
      { id: "crs-nid-3-m1", title: "Interaction Foundations", weeks: 24, topics: ["HCI", "Prototyping"], facultyId: "fac-nid-3" },
      { id: "crs-nid-3-m2", title: "Accessibility Studios",    weeks: 24, topics: ["Inclusive design"], facultyId: "fac-nid-3" },
      { id: "crs-nid-3-m3", title: "Thesis",                    weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-nid-3"],
  },

  // IIAD
  { id: "crs-iiad-1", instituteId: "iiad", title: "BA (Hons) Interior Architecture & Design", shortDescription: "Three-year UK-validated programme with adaptive-reuse focus.", level: "undergraduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "₹5.5 L / year", feeNumeric: 550000, intakeSize: 30, rating: 4.5, enrolled: 90, coverImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["UK validated degree", "Live brief portfolio"],
    curriculum: [
      { id: "crs-iiad-1-m1", title: "Foundation",       weeks: 32, topics: ["Drawing", "Studio I"], facultyId: "fac-iiad-1" },
      { id: "crs-iiad-1-m2", title: "Adaptive Reuse",    weeks: 40, topics: ["Heritage reuse"], facultyId: "fac-iiad-1" },
      { id: "crs-iiad-1-m3", title: "Major Project",     weeks: 48, topics: ["Major project"] },
    ],
    facultyIds: ["fac-iiad-1"],
  },
  { id: "crs-iiad-2", instituteId: "iiad", title: "BA (Hons) Product Design", shortDescription: "Three-year UK-validated product design programme.", level: "undergraduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "₹5.5 L / year", feeNumeric: 550000, intakeSize: 30, rating: 4.5, enrolled: 90, coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Product portfolio", "Live brief launch"],
    curriculum: [
      { id: "crs-iiad-2-m1", title: "Foundation",      weeks: 32, topics: ["Drawing", "Materials"], facultyId: "fac-iiad-2" },
      { id: "crs-iiad-2-m2", title: "Product Studios", weeks: 40, topics: ["Consumer tech"], facultyId: "fac-iiad-2" },
      { id: "crs-iiad-2-m3", title: "Major Project",    weeks: 48, topics: ["Major project"] },
    ],
    facultyIds: ["fac-iiad-2"],
  },

  // RICS SBE
  { id: "crs-rics-1", instituteId: "rics-sbe", title: "BBA Construction Management", shortDescription: "Three-year UG programme — RICS-aligned.", level: "undergraduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "₹4.5 L / year", feeNumeric: 450000, intakeSize: 90, rating: 4.6, enrolled: 240, coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["RICS-aligned UG degree", "Site-execution toolkit", "Internship"],
    curriculum: [
      { id: "crs-rics-1-m1", title: "Foundations",          weeks: 32, topics: ["Construction tech", "Drawing"], facultyId: "fac-rics-2" },
      { id: "crs-rics-1-m2", title: "BIM + Drawings",        weeks: 32, topics: ["BIM I", "Drawings"], facultyId: "fac-rics-1" },
      { id: "crs-rics-1-m3", title: "Site + Cost",            weeks: 32, topics: ["Site mgmt", "Cost"], facultyId: "fac-rics-3" },
      { id: "crs-rics-1-m4", title: "Project + Internship",   weeks: 24, topics: ["Internship"] },
    ],
    facultyIds: ["fac-rics-1", "fac-rics-2", "fac-rics-3"],
  },
  { id: "crs-rics-2", instituteId: "rics-sbe", title: "MBA Construction Project Management", shortDescription: "Two-year MBA programme — RICS-aligned.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "₹7.5 L total", feeNumeric: 750000, intakeSize: 60, rating: 4.7, enrolled: 120, coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["RICS MRICS pathway", "Project leadership toolkit"],
    curriculum: [
      { id: "crs-rics-2-m1", title: "Project Management",    weeks: 24, topics: ["PM toolkit"], facultyId: "fac-rics-1" },
      { id: "crs-rics-2-m2", title: "BIM + Tech",             weeks: 24, topics: ["BIM II"], facultyId: "fac-rics-1" },
      { id: "crs-rics-2-m3", title: "Capstone + Internship",  weeks: 32, topics: ["Capstone"] },
    ],
    facultyIds: ["fac-rics-1"],
  },
  { id: "crs-rics-3", instituteId: "rics-sbe", title: "BIM Professional: Revit Architecture Complete", shortDescription: "12-week intensive on Revit + ISO 19650.", level: "certificate", durationLabel: "12 weeks", totalWeeks: 12, studyMode: "online", language: "English", feeLabel: "₹85,000", feeNumeric: 85000, intakeSize: 40, rating: 4.8, enrolled: 240, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Autodesk Revit Professional", "ISO 19650 working knowledge"],
    curriculum: [
      { id: "crs-rics-3-m1", title: "Revit Fundamentals",  weeks: 4, topics: ["Model setup", "Families"], facultyId: "fac-rics-1" },
      { id: "crs-rics-3-m2", title: "Documentation + Sheet Sets", weeks: 4, topics: ["Documentation", "Sheet sets"], facultyId: "fac-rics-2" },
      { id: "crs-rics-3-m3", title: "Coordination + ISO 19650",   weeks: 4, topics: ["Coordination", "ISO 19650"], facultyId: "fac-rics-1" },
    ],
    facultyIds: ["fac-rics-1", "fac-rics-2"],
  },
  { id: "crs-rics-4", instituteId: "rics-sbe", title: "PG Diploma — Quantity Surveying", shortDescription: "12-month diploma — RICS MRICS pathway.", level: "diploma", durationLabel: "12 months", totalWeeks: 48, studyMode: "on-campus", language: "English", feeLabel: "₹3.4 L total", feeNumeric: 340000, intakeSize: 28, rating: 4.7, enrolled: 56, coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["RICS MRICS-ready", "Cost-takeoff portfolio"],
    curriculum: [
      { id: "crs-rics-4-m1", title: "QS Foundations", weeks: 16, topics: ["Take-offs", "Estimation"], facultyId: "fac-rics-3" },
      { id: "crs-rics-4-m2", title: "Contracts + Disputes", weeks: 16, topics: ["FIDIC", "Disputes"], facultyId: "fac-rics-3" },
      { id: "crs-rics-4-m3", title: "Capstone", weeks: 16, topics: ["Live cost takeoff"] },
    ],
    facultyIds: ["fac-rics-3"],
  },

  // Harvard GSD
  { id: "crs-h-1",   instituteId: "harvard-gsd",        title: "Master of Architecture I (MArch I)", shortDescription: "Three-year, accredited professional MArch.", level: "post-graduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "$60,000 / year", feeNumeric: 0, intakeSize: 80, rating: 4.9, enrolled: 240, coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["NAAB-accredited MArch", "GSD studio portfolio"],
    curriculum: [
      { id: "crs-h-1-m1", title: "Core Studios",        weeks: 32, topics: ["Studio I", "Studio II"], facultyId: "fac-h-1" },
      { id: "crs-h-1-m2", title: "Theory + Tech",        weeks: 32, topics: ["Theory", "Building tech"], facultyId: "fac-h-2" },
      { id: "crs-h-1-m3", title: "Options Studios",      weeks: 32, topics: ["Options studios"], facultyId: "fac-h-1" },
      { id: "crs-h-1-m4", title: "Thesis",                weeks: 24, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-h-1", "fac-h-2"],
  },
  { id: "crs-h-2",   instituteId: "harvard-gsd",        title: "Master of Urban Planning",          shortDescription: "Two-year MUP with concentrations in transportation, real estate and public policy.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "$60,000 / year", feeNumeric: 0, intakeSize: 60, rating: 4.8, enrolled: 120, coverImage: "https://images.unsplash.com/photo-1597004822334-3da18d7df9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["PAB-accredited MUP", "Urban policy folio"],
    curriculum: [
      { id: "crs-h-2-m1", title: "Foundations + Theory", weeks: 24, topics: ["Theory"], facultyId: "fac-h-1" },
      { id: "crs-h-2-m2", title: "Urban Design Studios", weeks: 24, topics: ["Studios"], facultyId: "fac-h-1" },
      { id: "crs-h-2-m3", title: "Capstone + Thesis",     weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-h-1"],
  },
  { id: "crs-h-3",   instituteId: "harvard-gsd",        title: "Doctor of Design (DDes)",            shortDescription: "Four-year DDes in design theory + practice.", level: "doctorate", durationLabel: "4 years", totalWeeks: 160, studyMode: "on-campus", language: "English", feeLabel: "$60,000 / year", feeNumeric: 0, intakeSize: 12, rating: 4.7, enrolled: 36, coverImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Doctoral thesis", "Faculty career pathway"],
    curriculum: [
      { id: "crs-h-3-m1", title: "Research Foundations", weeks: 40, topics: ["Theory"], facultyId: "fac-h-2" },
      { id: "crs-h-3-m2", title: "Dissertation",         weeks: 120, topics: ["Dissertation"] },
    ],
    facultyIds: ["fac-h-2"],
  },
  { id: "crs-h-4",   instituteId: "harvard-gsd",        title: "Master of Landscape Architecture I", shortDescription: "Three-year first professional MLA degree.",  level: "post-graduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "$60,000 / year", feeNumeric: 0, intakeSize: 50, rating: 4.8, enrolled: 150, coverImage: "https://images.unsplash.com/photo-1558005530-a7958896ec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["ASLA-accredited MLA", "Landscape portfolio"],
    curriculum: [
      { id: "crs-h-4-m1", title: "Core Studios",     weeks: 32, topics: ["Studio I/II"], facultyId: "fac-h-3" },
      { id: "crs-h-4-m2", title: "Ecology",          weeks: 24, topics: ["Ecology"], facultyId: "fac-h-3" },
      { id: "crs-h-4-m3", title: "Options + Thesis", weeks: 64, topics: ["Options studios"], facultyId: "fac-h-3" },
    ],
    facultyIds: ["fac-h-3"],
  },

  // MIT
  { id: "crs-mit-1", instituteId: "mit-architecture", title: "MArch (3-year)",                shortDescription: "Three-year first-professional MArch with computation focus.", level: "post-graduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "$55,000 / year", feeNumeric: 0, intakeSize: 24, rating: 4.9, enrolled: 72, coverImage: "https://images.unsplash.com/photo-1614853035831-37e7b4dcdfd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["NAAB-accredited MArch", "Computational toolkit"],
    curriculum: [
      { id: "crs-mit-1-m1", title: "Core Studios",      weeks: 32, topics: ["Studio I/II"], facultyId: "fac-mit-1" },
      { id: "crs-mit-1-m2", title: "Computation",       weeks: 32, topics: ["Computational"], facultyId: "fac-mit-1" },
      { id: "crs-mit-1-m3", title: "Options Studios",   weeks: 32, topics: ["Options"], facultyId: "fac-mit-2" },
      { id: "crs-mit-1-m4", title: "Thesis",             weeks: 24, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-mit-1", "fac-mit-2"],
  },
  { id: "crs-mit-2", instituteId: "mit-architecture", title: "SMArchS — Computation",         shortDescription: "Research master's stream — computation + theory.",         level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "$55,000 / year", feeNumeric: 0, intakeSize: 12, rating: 4.8, enrolled: 24, coverImage: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Research thesis", "Computation toolkit"],
    curriculum: [
      { id: "crs-mit-2-m1", title: "Theory + Methods",     weeks: 24, topics: ["Theory"], facultyId: "fac-mit-1" },
      { id: "crs-mit-2-m2", title: "Computation",          weeks: 24, topics: ["Computation"], facultyId: "fac-mit-1" },
      { id: "crs-mit-2-m3", title: "Thesis",               weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-mit-1"],
  },
  { id: "crs-mit-3", instituteId: "mit-architecture", title: "SMArchS — Building Technology", shortDescription: "Research master's — materials and building systems.",       level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "$55,000 / year", feeNumeric: 0, intakeSize: 12, rating: 4.8, enrolled: 24, coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Materials research thesis", "Building tech toolkit"],
    curriculum: [
      { id: "crs-mit-3-m1", title: "Foundations",         weeks: 24, topics: ["Building tech"], facultyId: "fac-mit-2" },
      { id: "crs-mit-3-m2", title: "Materials",           weeks: 24, topics: ["Materials"], facultyId: "fac-mit-2" },
      { id: "crs-mit-3-m3", title: "Thesis",              weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-mit-2"],
  },

  // UCLA AUD
  { id: "crs-ucla-1", instituteId: "ucla-auD", title: "M.Arch I",         shortDescription: "Three-year MArch I — accredited.",                     level: "post-graduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "$50,000 / year", feeNumeric: 0, intakeSize: 30, rating: 4.8, enrolled: 90, coverImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["NAAB-accredited MArch", "Studio portfolio"],
    curriculum: [
      { id: "crs-ucla-1-m1", title: "Core Studios",       weeks: 32, topics: ["Studio I/II"], facultyId: "fac-ucla-2" },
      { id: "crs-ucla-1-m2", title: "Theory + History",   weeks: 32, topics: ["Theory"], facultyId: "fac-ucla-2" },
      { id: "crs-ucla-1-m3", title: "Options Studios",    weeks: 32, topics: ["Options studios"], facultyId: "fac-ucla-1" },
      { id: "crs-ucla-1-m4", title: "Thesis",              weeks: 24, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-ucla-1", "fac-ucla-2"],
  },
  { id: "crs-ucla-2", instituteId: "ucla-auD", title: "SUPRASTUDIO",       shortDescription: "Year-long research studio led by industry partners (Greg Lynn, etc.).", level: "post-graduate", durationLabel: "1 year", totalWeeks: 40, studyMode: "on-campus", language: "English", feeLabel: "$45,000 total", feeNumeric: 0, intakeSize: 12, rating: 4.9, enrolled: 24, coverImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Industry-partner thesis", "Specialised lab portfolio"],
    curriculum: [
      { id: "crs-ucla-2-m1", title: "Studio 1",   weeks: 20, topics: ["Lab work"], facultyId: "fac-ucla-1" },
      { id: "crs-ucla-2-m2", title: "Studio 2",   weeks: 20, topics: ["Lab thesis"] },
    ],
    facultyIds: ["fac-ucla-1"],
  },

  // AA London
  { id: "crs-aa-1", instituteId: "aa-london", title: "AA Diploma (5-year)",      shortDescription: "AA's flagship 5-year programme through Diploma units.",      level: "undergraduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "English", feeLabel: "£35,000 / year", feeNumeric: 0, intakeSize: 90, rating: 4.9, enrolled: 450, coverImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["RIBA Part 1+2 equivalent", "Diploma unit thesis"],
    curriculum: [
      { id: "crs-aa-1-m1", title: "Intermediate Units",    weeks: 80, topics: ["Studio 1-3"], facultyId: "fac-aa-1" },
      { id: "crs-aa-1-m2", title: "Diploma Units",          weeks: 80, topics: ["Diploma units"], facultyId: "fac-aa-1" },
      { id: "crs-aa-1-m3", title: "Thesis",                  weeks: 40, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-aa-1"],
  },
  { id: "crs-aa-2", instituteId: "aa-london", title: "Design Research Lab (DRL)", shortDescription: "Two-year computational MArch — global hub of parametricism.", level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "£35,000 / year", feeNumeric: 0, intakeSize: 50, rating: 4.9, enrolled: 100, coverImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["DRL thesis", "Computational toolkit"],
    curriculum: [
      { id: "crs-aa-2-m1", title: "Phase I — Workshops",     weeks: 16, topics: ["Workshops"], facultyId: "fac-aa-1" },
      { id: "crs-aa-2-m2", title: "Phase II — Design Studio", weeks: 32, topics: ["Studio"], facultyId: "fac-aa-1" },
      { id: "crs-aa-2-m3", title: "Phase III — Thesis",       weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-aa-1"],
  },
  { id: "crs-aa-3", instituteId: "aa-london", title: "Forensic Architecture (Visiting Studio)", shortDescription: "1-year visiting studio with Eyal Weizman's Forensic team.", level: "post-graduate", durationLabel: "1 year", totalWeeks: 40, studyMode: "on-campus", language: "English", feeLabel: "£18,000 total", feeNumeric: 0, intakeSize: 18, rating: 4.9, enrolled: 18, coverImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Forensic case study", "Visual investigation toolkit"],
    curriculum: [
      { id: "crs-aa-3-m1", title: "Forensic Methods",     weeks: 16, topics: ["Methods"], facultyId: "fac-aa-2" },
      { id: "crs-aa-3-m2", title: "Live Cases",            weeks: 24, topics: ["Live cases"], facultyId: "fac-aa-2" },
    ],
    facultyIds: ["fac-aa-2"],
  },

  // Bartlett
  { id: "crs-bt-1", instituteId: "bartlett-ucl", title: "MArch Architecture Unit System", shortDescription: "Two-year MArch with the famous Bartlett unit pedagogy.",        level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "£30,000 / year", feeNumeric: 0, intakeSize: 60, rating: 4.9, enrolled: 120, coverImage: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Unit-system folio", "Speculative thesis"],
    curriculum: [
      { id: "crs-bt-1-m1", title: "Unit Phase I",            weeks: 32, topics: ["Unit studios"], facultyId: "fac-bt-1" },
      { id: "crs-bt-1-m2", title: "Unit Phase II + Thesis",   weeks: 48, topics: ["Thesis"], facultyId: "fac-bt-1" },
    ],
    facultyIds: ["fac-bt-1"],
  },
  { id: "crs-bt-2", instituteId: "bartlett-ucl", title: "MSc Bio-Integrated Design",       shortDescription: "Two-year MSc with the Bio-ID lab.",                              level: "post-graduate", durationLabel: "2 years", totalWeeks: 80, studyMode: "on-campus", language: "English", feeLabel: "£30,000 / year", feeNumeric: 0, intakeSize: 28, rating: 4.8, enrolled: 56, coverImage: "https://images.unsplash.com/photo-1604497181015-76590d828272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Bio-integrated design thesis", "Materials research toolkit"],
    curriculum: [
      { id: "crs-bt-2-m1", title: "Bio-Materials",      weeks: 24, topics: ["Biomimicry"], facultyId: "fac-bt-2" },
      { id: "crs-bt-2-m2", title: "Studios",             weeks: 24, topics: ["Studios"], facultyId: "fac-bt-2" },
      { id: "crs-bt-2-m3", title: "Thesis",               weeks: 32, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-bt-2"],
  },

  // ETH Zürich
  { id: "crs-eth-1", instituteId: "eth-zurich", title: "MSc Architecture",          shortDescription: "Five-year integrated MSc with strong structural emphasis.", level: "post-graduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "German / English", feeLabel: "CHF 1,500 / sem", feeNumeric: 0, intakeSize: 120, rating: 4.9, enrolled: 600, coverImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["SIA-accredited MSc", "Structural design toolkit"],
    curriculum: [
      { id: "crs-eth-1-m1", title: "Core Studios",         weeks: 96, topics: ["Studios"], facultyId: "fac-eth-1" },
      { id: "crs-eth-1-m2", title: "Computation + Robotics",weeks: 32, topics: ["Robotics"], facultyId: "fac-eth-2" },
      { id: "crs-eth-1-m3", title: "Thesis",                weeks: 72, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-eth-1", "fac-eth-2"],
  },
  { id: "crs-eth-2", instituteId: "eth-zurich", title: "MAS Digital Fabrication",   shortDescription: "1-year MAS in digital fabrication with Gramazio Kohler.",    level: "post-graduate", durationLabel: "1 year", totalWeeks: 40, studyMode: "on-campus", language: "English", feeLabel: "CHF 26,000 total", feeNumeric: 0, intakeSize: 18, rating: 4.9, enrolled: 18, coverImage: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Robotic fabrication folio", "Industry capstone"],
    curriculum: [
      { id: "crs-eth-2-m1", title: "Foundations",        weeks: 16, topics: ["Robotics"], facultyId: "fac-eth-2" },
      { id: "crs-eth-2-m2", title: "Live Project",        weeks: 24, topics: ["Industry"], facultyId: "fac-eth-2" },
    ],
    facultyIds: ["fac-eth-2"],
  },

  // SCI-Arc
  { id: "crs-sci-1", instituteId: "sci-arc", title: "B.Arch (5-year)",          shortDescription: "Five-year BArch with experimental design pedagogy.",          level: "undergraduate", durationLabel: "5 years", totalWeeks: 200, studyMode: "on-campus", language: "English", feeLabel: "$45,000 / year", feeNumeric: 0, intakeSize: 60, rating: 4.7, enrolled: 300, coverImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["NAAB-accredited BArch", "Experimental folio"],
    curriculum: [
      { id: "crs-sci-1-m1", title: "Foundation",       weeks: 64, topics: ["Drawing"], facultyId: "fac-sci-1" },
      { id: "crs-sci-1-m2", title: "Studios",          weeks: 96, topics: ["Studios"], facultyId: "fac-sci-2" },
      { id: "crs-sci-1-m3", title: "Thesis",            weeks: 40, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-sci-1", "fac-sci-2"],
  },
  { id: "crs-sci-2", instituteId: "sci-arc", title: "MArch I (3-year)",         shortDescription: "Three-year first-professional MArch.",                      level: "post-graduate", durationLabel: "3 years", totalWeeks: 120, studyMode: "on-campus", language: "English", feeLabel: "$45,000 / year", feeNumeric: 0, intakeSize: 40, rating: 4.7, enrolled: 120, coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["NAAB-accredited MArch", "Robotics House folio"],
    curriculum: [
      { id: "crs-sci-2-m1", title: "Core",         weeks: 48, topics: ["Core studios"], facultyId: "fac-sci-2" },
      { id: "crs-sci-2-m2", title: "Robotics + Tech", weeks: 32, topics: ["Robotics"], facultyId: "fac-sci-2" },
      { id: "crs-sci-2-m3", title: "Thesis",         weeks: 40, topics: ["Thesis"] },
    ],
    facultyIds: ["fac-sci-2"],
  },

  // IGBC
  { id: "crs-igbc-1", instituteId: "igbc-training", title: "IGBC AP Exam Prep",          shortDescription: "4-week intensive to prep for the IGBC AP credential.",         level: "certificate", durationLabel: "4 weeks", totalWeeks: 4, studyMode: "online", language: "English", feeLabel: "₹18,000", feeNumeric: 18000, intakeSize: 60, rating: 4.7, enrolled: 480, coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["IGBC AP credential prep", "Practice exams"],
    curriculum: [
      { id: "crs-igbc-1-m1", title: "Rating Systems",      weeks: 2, topics: ["LEED India"], facultyId: "fac-igbc-1" },
      { id: "crs-igbc-1-m2", title: "Mock exams",          weeks: 2, topics: ["Mock papers"], facultyId: "fac-igbc-2" },
    ],
    facultyIds: ["fac-igbc-1", "fac-igbc-2"],
  },
  { id: "crs-igbc-2", instituteId: "igbc-training", title: "Net-Zero Buildings Masterclass", shortDescription: "8-week masterclass with Net-Zero leaders.",                  level: "executive-ed", durationLabel: "8 weeks", totalWeeks: 8, studyMode: "online", language: "English", feeLabel: "₹35,000", feeNumeric: 35000, intakeSize: 40, rating: 4.8, enrolled: 80, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Net-zero playbook", "Live case studies"],
    curriculum: [
      { id: "crs-igbc-2-m1", title: "Policy + Definitions",    weeks: 2, topics: ["Net Zero"], facultyId: "fac-igbc-1" },
      { id: "crs-igbc-2-m2", title: "Modelling + ROI",         weeks: 4, topics: ["ROI"], facultyId: "fac-igbc-1" },
      { id: "crs-igbc-2-m3", title: "Capstone",                weeks: 2, topics: ["Capstone"] },
    ],
    facultyIds: ["fac-igbc-1"],
  },
  { id: "crs-igbc-3", instituteId: "igbc-training", title: "Embodied Carbon Workshop",     shortDescription: "2-week intensive workshop on embodied-carbon accounting.",   level: "certificate", durationLabel: "2 weeks", totalWeeks: 2, studyMode: "online", language: "English", feeLabel: "₹12,000", feeNumeric: 12000, intakeSize: 40, rating: 4.6, enrolled: 120, coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["EC accounting practicum", "OneClick LCA familiarity"],
    curriculum: [
      { id: "crs-igbc-3-m1", title: "EC Foundations",     weeks: 1, topics: ["Foundations"], facultyId: "fac-igbc-2" },
      { id: "crs-igbc-3-m2", title: "LCA Tools",          weeks: 1, topics: ["OneClick LCA"], facultyId: "fac-igbc-2" },
    ],
    facultyIds: ["fac-igbc-2"],
  },

  /* ───────────────── Brand-academy certifications ───────────────── */

  // UltraTech
  { id: "crs-ut-1", instituteId: "ultratech-academy", title: "RMC Plant Operations Certificate", shortDescription: "Three-week certificate for site engineers on RMC quality, batching and BIS 4926 compliance.", level: "certificate", durationLabel: "3 weeks", totalWeeks: 3, studyMode: "hybrid", language: "English", feeLabel: "₹22,000", feeNumeric: 22000, intakeSize: 30, rating: 4.7, enrolled: 480, coverImage: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Hands-on at UltraTech RMC plant", "BIS 4926 walkthrough", "Plant QA toolkit"],
    curriculum: [
      { id: "crs-ut-1-m1", title: "Batching + Materials", weeks: 1, topics: ["Aggregates", "Admixtures"] },
      { id: "crs-ut-1-m2", title: "Plant operations",     weeks: 1, topics: ["Logistics", "QA"] },
      { id: "crs-ut-1-m3", title: "Site capstone",         weeks: 1, topics: ["Live site visit"] },
    ],
    facultyIds: [],
  },
  { id: "crs-ut-2", instituteId: "ultratech-academy", title: "Concrete Admixtures Masterclass", shortDescription: "Specification and lab-tested guide to superplasticizers, retarders and waterproofing admixtures.", level: "executive-ed", durationLabel: "4 weeks", totalWeeks: 4, studyMode: "online", language: "English", feeLabel: "₹15,000", feeNumeric: 15000, intakeSize: 60, rating: 4.6, enrolled: 320, coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Mix-design specification toolkit", "Cost-vs-strength simulations"],
    curriculum: [
      { id: "crs-ut-2-m1", title: "Admixture chemistry",    weeks: 2, topics: ["Chemistry"] },
      { id: "crs-ut-2-m2", title: "Mix design + costing",   weeks: 2, topics: ["Costing"] },
    ],
    facultyIds: [],
  },
  { id: "crs-ut-3", instituteId: "ultratech-academy", title: "Concrete Repair & Restoration Certificate", shortDescription: "Restoration techniques for heritage, infrastructure and high-rise repair scenarios.", level: "certificate", durationLabel: "5 weeks", totalWeeks: 5, studyMode: "hybrid", language: "English", feeLabel: "₹28,000", feeNumeric: 28000, intakeSize: 40, rating: 4.8, enrolled: 180, coverImage: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Restoration playbook", "Heritage retrofit case studies"],
    curriculum: [
      { id: "crs-ut-3-m1", title: "Diagnosis", weeks: 2, topics: ["NDT"] },
      { id: "crs-ut-3-m2", title: "Treatment + Capstone", weeks: 3, topics: ["Repair"] },
    ],
    facultyIds: [],
  },

  // Asian Paints
  { id: "crs-ap-1", instituteId: "asianpaints-academy", title: "Colour Theory for Architects", shortDescription: "Four-week colour theory + spec certificate by the Asian Paints Colour Lab.", level: "certificate", durationLabel: "4 weeks", totalWeeks: 4, studyMode: "online", language: "English", feeLabel: "₹9,500", feeNumeric: 9500, intakeSize: 50, rating: 4.7, enrolled: 720, coverImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Colour palette curation", "Royale spec library"],
    curriculum: [
      { id: "crs-ap-1-m1", title: "Colour fundamentals", weeks: 2, topics: ["HSL", "Perception"] },
      { id: "crs-ap-1-m2", title: "Spec library",        weeks: 2, topics: ["Royale Luxe"] },
    ],
    facultyIds: [],
  },
  { id: "crs-ap-2", instituteId: "asianpaints-academy", title: "Decorative Finishes Workshop", shortDescription: "Stucco, lime-wash, micro-cement and metallic finishes — applicators + designers.", level: "executive-ed", durationLabel: "6 weeks", totalWeeks: 6, studyMode: "hybrid", language: "English", feeLabel: "₹18,000", feeNumeric: 18000, intakeSize: 36, rating: 4.7, enrolled: 240, coverImage: "https://images.unsplash.com/photo-1562564055-71e051d33c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Hand-finished samples", "Application techniques"],
    curriculum: [
      { id: "crs-ap-2-m1", title: "Substrate prep",        weeks: 2, topics: ["Prep"] },
      { id: "crs-ap-2-m2", title: "Finishes lab",          weeks: 4, topics: ["Stucco", "Lime"] },
    ],
    facultyIds: [],
  },
  { id: "crs-ap-3", instituteId: "asianpaints-academy", title: "Protective Coatings Specialist", shortDescription: "Specification of anti-carbonation, anti-corrosion and high-build coatings for facades + industrial.", level: "executive-ed", durationLabel: "8 weeks", totalWeeks: 8, studyMode: "online", language: "English", feeLabel: "₹32,000", feeNumeric: 32000, intakeSize: 28, rating: 4.6, enrolled: 110, coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Spec packs for protective coatings", "Industrial coatings deep-dive"],
    curriculum: [
      { id: "crs-ap-3-m1", title: "Substrate science",    weeks: 4, topics: ["Substrate"] },
      { id: "crs-ap-3-m2", title: "Spec + costing",         weeks: 4, topics: ["Spec"] },
    ],
    facultyIds: [],
  },

  // Schneider
  { id: "crs-se-1", instituteId: "schneider-university", title: "EcoStruxure Building Operator", shortDescription: "Hands-on certification on EcoStruxure Building Operator for site teams + integrators.", level: "certificate", durationLabel: "6 weeks", totalWeeks: 6, studyMode: "hybrid", language: "English", feeLabel: "₹38,000", feeNumeric: 38000, intakeSize: 24, rating: 4.8, enrolled: 220, coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["EcoStruxure Building Operator credential", "Live BMS deployment"],
    curriculum: [
      { id: "crs-se-1-m1", title: "BMS foundations",       weeks: 2, topics: ["BMS"] },
      { id: "crs-se-1-m2", title: "Operator workshop",     weeks: 3, topics: ["Operator"] },
      { id: "crs-se-1-m3", title: "Capstone",                weeks: 1, topics: ["Site deployment"] },
    ],
    facultyIds: [],
  },
  { id: "crs-se-2", instituteId: "schneider-university", title: "Net-Zero Buildings — Design Track", shortDescription: "8-week online deep-dive on designing toward net-zero with active + passive systems.", level: "executive-ed", durationLabel: "8 weeks", totalWeeks: 8, studyMode: "online", language: "English", feeLabel: "₹42,000", feeNumeric: 42000, intakeSize: 40, rating: 4.7, enrolled: 320, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Net-zero design playbook", "EcoStruxure case-files"],
    curriculum: [
      { id: "crs-se-2-m1", title: "Definitions + policy",    weeks: 2, topics: ["Policy"] },
      { id: "crs-se-2-m2", title: "Active + passive design", weeks: 3, topics: ["Design"] },
      { id: "crs-se-2-m3", title: "Capstone",                  weeks: 3, topics: ["Project"] },
    ],
    facultyIds: [],
  },

  // Saint-Gobain Multi-Comfort
  { id: "crs-sg-1", instituteId: "saintgobain-multicomfort", title: "Glass Studio — High-Performance Façades", shortDescription: "Eight-week online programme on glass selection, IGU make-ups and façade engineering.", level: "executive-ed", durationLabel: "8 weeks", totalWeeks: 8, studyMode: "online", language: "English", feeLabel: "₹26,000", feeNumeric: 26000, intakeSize: 30, rating: 4.8, enrolled: 280, coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Façade Pro™ familiarity", "Live IGU make-up calculator"],
    curriculum: [
      { id: "crs-sg-1-m1", title: "Glass families",           weeks: 3, topics: ["Coatings", "Tints"] },
      { id: "crs-sg-1-m2", title: "IGU make-ups",              weeks: 3, topics: ["U-value"] },
      { id: "crs-sg-1-m3", title: "Capstone",                   weeks: 2, topics: ["Spec package"] },
    ],
    facultyIds: [],
  },
  { id: "crs-sg-2", instituteId: "saintgobain-multicomfort", title: "Acoustic Comfort Specialist", shortDescription: "Multi-Comfort accredited course on building acoustics for residential + commercial design.", level: "certificate", durationLabel: "4 weeks", totalWeeks: 4, studyMode: "hybrid", language: "English", feeLabel: "₹18,500", feeNumeric: 18500, intakeSize: 28, rating: 4.6, enrolled: 140, coverImage: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Acoustic spec toolkit", "Multi-Comfort credential"],
    curriculum: [
      { id: "crs-sg-2-m1", title: "Acoustic basics",           weeks: 2, topics: ["Sound transmission"] },
      { id: "crs-sg-2-m2", title: "System specification",       weeks: 2, topics: ["Spec"] },
    ],
    facultyIds: [],
  },
  { id: "crs-sg-3", instituteId: "saintgobain-multicomfort", title: "Gypsum Drywall — Build Standards", shortDescription: "Two-week applicator + specifier course on Saint-Gobain Gyproc systems.", level: "certificate", durationLabel: "2 weeks", totalWeeks: 2, studyMode: "hybrid", language: "English", feeLabel: "₹8,500", feeNumeric: 8500, intakeSize: 36, rating: 4.5, enrolled: 220, coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Gyproc spec library", "Build standards manual"],
    curriculum: [
      { id: "crs-sg-3-m1", title: "Systems",        weeks: 1, topics: ["Walls", "Ceilings"] },
      { id: "crs-sg-3-m2", title: "Spec + lab",      weeks: 1, topics: ["Spec"] },
    ],
    facultyIds: [],
  },

  // Pidilite
  { id: "crs-pi-1", instituteId: "pidilite-academy", title: "Dr. Fixit Certified Waterproofing Applicator", shortDescription: "Hands-on three-week applicator certification for waterproofing professionals.", level: "certificate", durationLabel: "3 weeks", totalWeeks: 3, studyMode: "hybrid", language: "English", feeLabel: "₹14,000", feeNumeric: 14000, intakeSize: 40, rating: 4.7, enrolled: 540, coverImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Dr. Fixit certified credential", "Hands-on site practicum"],
    curriculum: [
      { id: "crs-pi-1-m1", title: "Substrate prep",          weeks: 1, topics: ["Surface prep"] },
      { id: "crs-pi-1-m2", title: "Application",              weeks: 1, topics: ["Roof", "Bath", "Basement"] },
      { id: "crs-pi-1-m3", title: "QA + Capstone",            weeks: 1, topics: ["QA"] },
    ],
    facultyIds: [],
  },
  { id: "crs-pi-2", instituteId: "pidilite-academy", title: "Construction Chemicals for Architects", shortDescription: "Four-week online spec-in track on Pidilite construction-chemical portfolio.", level: "executive-ed", durationLabel: "4 weeks", totalWeeks: 4, studyMode: "online", language: "English", feeLabel: "₹9,500", feeNumeric: 9500, intakeSize: 60, rating: 4.6, enrolled: 380, coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Spec packs for architect briefs"],
    curriculum: [
      { id: "crs-pi-2-m1", title: "Foundations",           weeks: 2, topics: ["Chemistry"] },
      { id: "crs-pi-2-m2", title: "Spec library",            weeks: 2, topics: ["Spec"] },
    ],
    facultyIds: [],
  },

  // Hafele
  { id: "crs-hf-1", instituteId: "hafele-academy", title: "Smart Kitchen + Wardrobe Systems", shortDescription: "Six-week certification on Hafele's smart fittings, Loox lighting and ergonomics.", level: "certificate", durationLabel: "6 weeks", totalWeeks: 6, studyMode: "hybrid", language: "English", feeLabel: "₹19,500", feeNumeric: 19500, intakeSize: 24, rating: 4.7, enrolled: 180, coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    outcomes: ["Hafele Certified Designer credential", "Loox starter kit"],
    curriculum: [
      { id: "crs-hf-1-m1", title: "Joinery foundations",       weeks: 2, topics: ["Joinery"] },
      { id: "crs-hf-1-m2", title: "Smart fittings + Loox",      weeks: 2, topics: ["Loox"] },
      { id: "crs-hf-1-m3", title: "Capstone",                    weeks: 2, topics: ["Capstone"] },
    ],
    facultyIds: [],
  },
];

// ============================================
// Helpers
// ============================================

export function getInstitute(id: string): Institute | undefined {
  return INSTITUTES.find((i) => i.id === id);
}

export function getCoursesForInstitute(id: string): InstituteCourse[] {
  return INSTITUTE_COURSES.filter((c) => c.instituteId === id);
}

export function getFacultyForInstitute(id: string): Faculty[] {
  return FACULTY.filter((f) => f.instituteId === id);
}

export function getFaculty(id: string): Faculty | undefined {
  return FACULTY.find((f) => f.id === id);
}

export function getCoursesForFaculty(facultyId: string): InstituteCourse[] {
  return INSTITUTE_COURSES.filter((c) => c.facultyIds.includes(facultyId));
}

export function getCourseLevelLabel(level: CourseLevel): string {
  const m: Record<CourseLevel, string> = {
    certificate: "Certificate",
    diploma: "Diploma",
    undergraduate: "Undergraduate",
    "post-graduate": "Post-graduate",
    doctorate: "Doctorate",
    "executive-ed": "Executive Ed",
  };
  return m[level];
}

export function instituteTypeBadge(t: InstituteType): { bg: string; color: string; label: string } {
  const m: Record<InstituteType, { bg: string; color: string; label: string }> = {
    "school-of-architecture": { bg: "rgba(99,102,241,0.10)",  color: "#4338ca", label: "School of Architecture" },
    "school-of-design":       { bg: "rgba(168,85,247,0.10)",  color: "#7c3aed", label: "School of Design" },
    university:               { bg: "rgba(59,130,246,0.10)",  color: "#1d4ed8", label: "University" },
    "professional-body":      { bg: "rgba(16,185,129,0.10)",  color: "#047857", label: "Professional Body" },
    "design-studio":          { bg: "rgba(236,72,153,0.10)",  color: "#be185d", label: "Design Studio" },
    "research-cell":          { bg: "rgba(245,158,11,0.10)",  color: "#b45309", label: "Research" },
    "brand-academy":          { bg: "rgba(255,122,89,0.10)",  color: "#FF7A59", label: "Brand Academy" },
  };
  return m[t];
}

/**
 * Returns the Clearbit logo URL for an institute / brand academy, prefer
 * `logoDomain`, else extract from `website`.
 */
export function getInstituteLogo(institute: Institute, size = 200): string {
  let host = institute.logoDomain;
  if (!host && institute.website) {
    try {
      host = new URL(institute.website).hostname.replace(/^www\./, "");
    } catch {
      host = undefined;
    }
  }
  if (!host) return "";
  return `https://logo.clearbit.com/${host}?size=${size}`;
}

/** Returns only the brand-academy entries. */
export function getBrandAcademies(): Institute[] {
  return INSTITUTES.filter((i) => i.type === "brand-academy");
}

/** Returns only the formal (non-brand) institutes. */
export function getFormalInstitutes(): Institute[] {
  return INSTITUTES.filter((i) => i.type !== "brand-academy");
}
