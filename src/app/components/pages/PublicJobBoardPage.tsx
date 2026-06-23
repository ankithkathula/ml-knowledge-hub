import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Search, MapPin, Briefcase, Users, Clock, Filter, BookmarkPlus,
  BookmarkCheck, IndianRupee, Sparkles, GraduationCap, Layers, X, ChevronDown,
  ChevronRight, Globe, Zap, CheckCircle2, ExternalLink, Send,
  Cpu, Pencil, ArrowLeft, UserCircle2, ScanSearch, ListChecks,
} from "lucide-react";
import { getBrandLogo } from "../../utils/brandAssets";
import { AvatarImg } from "../ui/AvatarImg";

// Local brand assets — copied from marquee + user-supplied images
import asianPaintsLogo    from "../../../assets/brands/asian_paints.svg";
import bdpLogo            from "../../../assets/brands/bdp.svg";
import maceLogo           from "../../../assets/brands/mace.svg";
import ttLogo             from "../../../assets/brands/turner_townsend.svg";
import igbcLogo           from "../../../assets/brands/igbc.svg";
import spaDelhiLogo       from "../../../assets/brands/spa_delhi.svg";
import alucobondLogo      from "../../../assets/brands/alucobond.svg";
import ltLogo             from "../../../assets/brands/lt_construction.svg";
import morphLogo          from "../../../assets/brands/morph.svg";
import tjpLogo            from "../../../assets/brands/tjp.svg";
import tetradLogo         from "../../../assets/brands/tetrad.svg";
import landDesignLogo     from "../../../assets/brands/land_design.svg";
import ubdLogo            from "../../../assets/brands/ubd.svg";
import schneiderLogo      from "../../../assets/brands/schneider_electric.jpg";
import havellsLogo        from "../../../assets/brands/havells.png";
import ethZurichLogo      from "../../../assets/brands/eth_zurich.svg";

// All jobs-page logos resolved locally — no remote URLs
const LOGO_MAP: Record<string, string> = {
  "Asian Paints":              asianPaintsLogo,
  "BDP India":                 bdpLogo,
  "Mace India":                maceLogo,
  "Turner & Townsend India":   ttLogo,
  "IGBC Training Cell":        igbcLogo,
  "SPA Delhi":                 spaDelhiLogo,
  "Alucobond (3A Composites)": alucobondLogo,
  "L&T Construction":          ltLogo,
  "Morph Design Co.":          morphLogo,
  "TJP Structural Consultants": tjpLogo,
  "Tetrad Visuals":            tetradLogo,
  "Land Design Atelier":       landDesignLogo,
  "UBD Studio":                ubdLogo,
  "Schneider Electric":        schneiderLogo,
  "Havells India":             havellsLogo,
  "ETH Zürich (MAS DFAB)":     ethZurichLogo,
};

/* ──────────────────────────────────────────────────────────────────────
   Data model
─────────────────────────────────────────────────────────────────────── */

type Discipline =
  | "architecture" | "interior" | "structural" | "mep" | "civil" | "urban-planning"
  | "landscape" | "bim" | "computational" | "sustainability" | "viz-3d"
  | "qs-cost" | "project-management" | "construction-management" | "smart-home"
  | "brand-spec" | "facade" | "fabrication";

type WorkMode = "on-site" | "hybrid" | "remote";
type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
type ExperienceLevel = "entry" | "mid" | "senior" | "lead-principal";
type Region = "North India" | "South India" | "West India" | "East India" | "Central India" | "Northeast India" | "International";

interface Job {
  id: string;
  title: string;
  company: string;
  companyType: "studio" | "brand" | "consultant" | "contractor" | "institute";
  isVerified: boolean;
  isFeatured: boolean;
  isActivelyRecruiting: boolean;
  city: string;
  region: Region;
  workMode: WorkMode;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  experienceYearsMin: number;
  experienceYearsMax: number;
  salaryMin: number;
  salaryMax: number;
  hasEquity: boolean;
  discipline: Discipline;
  postedDaysAgo: number;
  applicants: number;
  earlyApplicantBadge: boolean;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  niceToHaves: string[];
  tags: string[];
  companySize: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  hiringManager?: { name: string; title: string; initials: string; avatarUrl?: string };
}

const JOBS: Job[] = [
  { id: "j-bdp-pl",     title: "Project Lead — Hospitality",       company: "BDP India",          companyType: "studio",     isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Bengaluru",  region: "South India",   workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "senior",         experienceYearsMin: 6,  experienceYearsMax: 10, salaryMin: 24, salaryMax: 36, hasEquity: false, discipline: "architecture",       postedDaysAgo: 1,  applicants: 17,  earlyApplicantBadge: true,  shortDescription: "Lead the Novotel Whitefield Phase 2 — 210-key business hotel + conference centre.", responsibilities: ["Run the design-to-handover workflow for two flagship hospitality projects.", "Lead a team of 8 across SD, DD and CD.", "Own quality across drawings and documentation."], requirements: ["8+ years on hospitality / mixed-use", "Strong Revit + ISO 19650 fluency", "Excellent client-facing skills"], niceToHaves: ["LEED AP", "Experience with Accor / Marriott / Hyatt brands"], tags: ["hospitality", "leadership", "BIM"], companySize: "51-200", hiringManager: { name: "Mira Nayar", title: "Principal — BDP India", initials: "MN", avatarUrl: "https://i.pravatar.cc/80?img=36" } },
  { id: "j-bdp-int",    title: "Senior Interior Designer",          company: "BDP India",          companyType: "studio",     isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "Mumbai",     region: "West India",    workMode: "on-site", employmentType: "full-time",  experienceLevel: "mid",            experienceYearsMin: 4,  experienceYearsMax: 7,  salaryMin: 14, salaryMax: 22, hasEquity: false, discipline: "interior",           postedDaysAgo: 3,  applicants: 42,  earlyApplicantBadge: false, shortDescription: "Drive interiors for luxury residential portfolio across Mumbai + Pune.", responsibilities: ["Lead joinery and finishes across 4 active projects.", "Coordinate FFE, lighting and material selection.", "Own studio moodboards + BOM."], requirements: ["5+ years luxury residential", "AutoCAD + Revit", "Material library curation"], niceToHaves: ["Hospitality background", "Independent project ownership"], tags: ["interior", "residential", "luxury"], companySize: "51-200" },
  { id: "j-morph-comp", title: "Computational Designer",            company: "Morph Design Co.",   companyType: "studio",     isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Mumbai",     region: "West India",    workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "mid",            experienceYearsMin: 3,  experienceYearsMax: 6,  salaryMin: 16, salaryMax: 24, hasEquity: true,  discipline: "computational",      postedDaysAgo: 2,  applicants: 28,  earlyApplicantBadge: true,  shortDescription: "Build the studio's computational pipeline — Grasshopper + Karamba + custom plugins.", responsibilities: ["Author Grasshopper definitions for façades + structures.", "Maintain the studio's Speckle pipelines.", "Mentor two junior designers."], requirements: ["Strong GH + Python", "Real-build computational experience", "Karamba / structural literacy"], niceToHaves: ["Speckle / Hops contributions", "Robotic fabrication exposure"], tags: ["grasshopper", "computation", "speckle"], companySize: "11-50", hiringManager: { name: "Aanya Bhatt", title: "Computational Lead — Morph", initials: "AB", avatarUrl: "https://i.pravatar.cc/80?img=2" } },
  { id: "j-morph-jr",   title: "Junior Architect (BIM)",             company: "Morph Design Co.",   companyType: "studio",     isVerified: true,  isFeatured: false, isActivelyRecruiting: false, city: "Mumbai",     region: "West India",    workMode: "on-site", employmentType: "full-time",  experienceLevel: "entry",          experienceYearsMin: 0,  experienceYearsMax: 2,  salaryMin: 6,  salaryMax: 9,  hasEquity: false, discipline: "bim",                postedDaysAgo: 8,  applicants: 92,  earlyApplicantBadge: false, shortDescription: "Entry-level Revit role — strong fundamentals in modelling and drawings.", responsibilities: ["Model and document SD/DD packages.", "Maintain Revit families and shared parameters.", "Coordinate with consultants on clash detection."], requirements: ["Revit certification or equivalent", "Strong drawing fundamentals", "Eagerness to learn"], niceToHaves: ["Dynamo basics", "Internship in BIM team"], tags: ["bim", "revit"], companySize: "11-50" },
  { id: "j-spa-tutor",  title: "Visiting Tutor — Computation Studio", company: "SPA Delhi",         companyType: "institute",  isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "New Delhi",  region: "North India",   workMode: "hybrid",  employmentType: "contract",   experienceLevel: "lead-principal", experienceYearsMin: 10, experienceYearsMax: 25, salaryMin: 18, salaryMax: 28, hasEquity: false, discipline: "computational",      postedDaysAgo: 4,  applicants: 7,   earlyApplicantBadge: true,  shortDescription: "Lead one studio per semester at SPA Delhi's M.Arch.", responsibilities: ["Lead one studio per semester.", "Mentor 12 M.Arch students.", "Convene one open lecture annually."], requirements: ["10+ years in design + computation", "Strong public-presentation skills", "Independent practice or PhD"], niceToHaves: ["Published research", "Robotics / fabrication track record"], tags: ["teaching", "studio", "computation"], companySize: "201-1000" },
  { id: "j-tjps-str",   title: "Structural Engineer",                company: "TJP Structural Consultants", companyType: "consultant", isVerified: true, isFeatured: false, isActivelyRecruiting: true, city: "Bengaluru", region: "South India", workMode: "on-site", employmentType: "full-time", experienceLevel: "mid", experienceYearsMin: 4, experienceYearsMax: 8, salaryMin: 12, salaryMax: 18, hasEquity: false, discipline: "structural", postedDaysAgo: 5, applicants: 31, earlyApplicantBadge: false, shortDescription: "Long-span seismic + commercial design — STAAD / ETABS / Tekla.", responsibilities: ["Author structural designs for commercial + institutional projects.", "Coordinate with architectural teams.", "Conduct site visits and observation reports."], requirements: ["STAAD + ETABS", "IS 1893 fluency", "M.Tech preferred"], niceToHaves: ["Tekla", "Seismic detailing experience"], tags: ["structures", "seismic"], companySize: "51-200" },
  { id: "j-se-mep",     title: "Senior MEP Consultant",              company: "Schneider Electric", companyType: "brand",      isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Gurgaon",    region: "North India",   workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "senior",         experienceYearsMin: 7,  experienceYearsMax: 12, salaryMin: 26, salaryMax: 40, hasEquity: true,  discipline: "mep",                postedDaysAgo: 1,  applicants: 9,   earlyApplicantBadge: true,  shortDescription: "Lead BMS + EcoStruxure deployments for net-zero commercial campuses.", responsibilities: ["Lead BMS design + commissioning.", "Author EcoStruxure deployment plans.", "Coordinate with architects + clients."], requirements: ["B.Tech Electrical / Mechanical", "EcoStruxure familiarity", "ASHRAE + BMS expertise"], niceToHaves: ["LEED AP O+M", "PMP"], tags: ["mep", "bms", "net-zero"], companySize: "1000+", hiringManager: { name: "Rohit Bansal", title: "Talent Lead — Schneider", initials: "RB", avatarUrl: "https://i.pravatar.cc/80?img=66" } },
  { id: "j-l&t-pm",     title: "Project Manager — Airports",          company: "L&T Construction",  companyType: "contractor", isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Hyderabad",  region: "South India",   workMode: "on-site", employmentType: "full-time",  experienceLevel: "senior",         experienceYearsMin: 8,  experienceYearsMax: 14, salaryMin: 28, salaryMax: 45, hasEquity: false, discipline: "project-management", postedDaysAgo: 2,  applicants: 19,  earlyApplicantBadge: true,  shortDescription: "Run a ₹1,800 Cr airport terminal expansion as PM.", responsibilities: ["Own scope, schedule, cost, quality.", "Lead 50+ engineers across disciplines.", "Coordinate with statutory bodies."], requirements: ["PMP", "10+ years airports / large infrastructure", "Excellent client + statutory liaison"], niceToHaves: ["MBA — Construction Management", "RICS chartered"], tags: ["airports", "infrastructure", "PMP"], companySize: "1000+" },
  { id: "j-mace-bim",   title: "BIM Coordinator",                     company: "Mace India",         companyType: "consultant", isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "Bengaluru",  region: "South India",   workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "mid",            experienceYearsMin: 3,  experienceYearsMax: 6,  salaryMin: 11, salaryMax: 16, hasEquity: false, discipline: "bim",                postedDaysAgo: 2,  applicants: 38,  earlyApplicantBadge: false, shortDescription: "Coordinate BIM models across MEP + structural for 3 active commercial fit-outs.", responsibilities: ["Run clash detection cycles.", "Maintain federated models.", "Train juniors on family standards."], requirements: ["Autodesk Revit Pro", "Navisworks", "ISO 19650"], niceToHaves: ["Dynamo + Python", "Solibri"], tags: ["bim", "navisworks", "iso-19650"], companySize: "201-1000" },
  { id: "j-3da-viz",    title: "3D Visualisation Artist",             company: "Tetrad Visuals",    companyType: "studio",     isVerified: false, isFeatured: false, isActivelyRecruiting: true,  city: "Pune",       region: "West India",    workMode: "remote",  employmentType: "contract",   experienceLevel: "mid",            experienceYearsMin: 3,  experienceYearsMax: 7,  salaryMin: 9,  salaryMax: 14, hasEquity: false, discipline: "viz-3d",             postedDaysAgo: 1,  applicants: 56,  earlyApplicantBadge: false, shortDescription: "Remote 3D viz contract — 3dsMax + Corona + Photoshop.", responsibilities: ["Produce final stills + walkthroughs.", "Set up materials + lighting.", "Iterate quickly with art directors."], requirements: ["3dsMax + Corona Render", "Strong portfolio of stills + walkthroughs", "Photoshop"], niceToHaves: ["UE5 / Twinmotion", "VR / AR experience"], tags: ["viz", "remote", "3dsmax"], companySize: "11-50" },
  { id: "j-igbc-fac",   title: "Sustainability Consultant — Faculty Track", company: "IGBC Training Cell", companyType: "institute", isVerified: true, isFeatured: false, isActivelyRecruiting: true, city: "Hyderabad", region: "South India", workMode: "hybrid", employmentType: "full-time", experienceLevel: "senior", experienceYearsMin: 6, experienceYearsMax: 10, salaryMin: 16, salaryMax: 22, hasEquity: false, discipline: "sustainability", postedDaysAgo: 6, applicants: 14, earlyApplicantBadge: false, shortDescription: "Run net-zero training across 4 metros + lead the IGBC AP curriculum.", responsibilities: ["Develop IGBC AP curriculum updates.", "Run 12+ workshops a year.", "Mentor early-career sustainability consultants."], requirements: ["IGBC AP", "LEED AP / GRIHA Evaluator", "Strong public-facing presence"], niceToHaves: ["Embodied carbon practicum", "Published research"], tags: ["net-zero", "igbc-ap", "training"], companySize: "201-1000" },
  { id: "j-ap-spec",    title: "Architect Specifications Manager",   company: "Asian Paints",       companyType: "brand",      isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Mumbai",     region: "West India",    workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "senior",         experienceYearsMin: 6,  experienceYearsMax: 10, salaryMin: 18, salaryMax: 28, hasEquity: false, discipline: "brand-spec",         postedDaysAgo: 3,  applicants: 22,  earlyApplicantBadge: true,  shortDescription: "Be the brand-side architect → spec-in for Royale Luxe + Apex Ultima.", responsibilities: ["Run spec-in across top 200 studios.", "Author BIM blocks + spec sheets.", "Lead architect events."], requirements: ["B.Arch + Industry hands-on", "Spec-in track record", "Bilingual EN/HN"], niceToHaves: ["MBA", "Studio side experience"], tags: ["spec", "paints", "brand"], companySize: "1000+" },
  { id: "j-rics-qs",    title: "Quantity Surveyor — MRICS",            company: "Turner & Townsend India", companyType: "consultant", isVerified: true, isFeatured: false, isActivelyRecruiting: true, city: "New Delhi", region: "North India", workMode: "hybrid", employmentType: "full-time", experienceLevel: "senior", experienceYearsMin: 7, experienceYearsMax: 12, salaryMin: 22, salaryMax: 32, hasEquity: false, discipline: "qs-cost", postedDaysAgo: 7, applicants: 18, earlyApplicantBadge: false, shortDescription: "Lead cost on mixed-use + data-centre programmes across India.", responsibilities: ["Author estimates + BoQs.", "Negotiate contractor variations.", "Mentor QS team of 6."], requirements: ["MRICS", "10+ years cost lead", "FIDIC + NEC fluency"], niceToHaves: ["Data-centre track record", "MBA — Construction"], tags: ["qs", "MRICS", "cost"], companySize: "1000+" },
  { id: "j-lda-ldsc",   title: "Lead Landscape Architect",            company: "Land Design Atelier", companyType: "studio",    isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "Chennai",    region: "South India",   workMode: "on-site", employmentType: "full-time",  experienceLevel: "senior",         experienceYearsMin: 6,  experienceYearsMax: 10, salaryMin: 14, salaryMax: 22, hasEquity: false, discipline: "landscape",          postedDaysAgo: 4,  applicants: 11,  earlyApplicantBadge: true,  shortDescription: "Lead two flagship urban-park projects + own the planting palette library.", responsibilities: ["Run urban-park projects from concept → handover.", "Own the studio planting palette library.", "Lead a small team of 3."], requirements: ["6+ years landscape", "IFLA-ready portfolio", "Bilingual EN/TA preferred"], niceToHaves: ["WSUD experience", "SITES AP"], tags: ["landscape", "urban-park", "wsud"], companySize: "11-50" },
  { id: "j-ubd-urban",  title: "Urban Designer",                       company: "UBD Studio",         companyType: "studio",     isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "Ahmedabad",  region: "West India",    workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "mid",            experienceYearsMin: 3,  experienceYearsMax: 7,  salaryMin: 10, salaryMax: 16, hasEquity: false, discipline: "urban-planning",     postedDaysAgo: 9,  applicants: 22,  earlyApplicantBadge: false, shortDescription: "Translate masterplans into detailed urban-design schemes.", responsibilities: ["Author urban-design schemes.", "Lead public-consultation workshops.", "Coordinate with statutory bodies."], requirements: ["M.URP / MUD", "Strong GIS + Illustrator", "Public-speaking comfort"], niceToHaves: ["MoHUA project exposure", "Bilingual EN/GU"], tags: ["urban-design", "masterplans", "gis"], companySize: "11-50" },
  { id: "j-aluc-fac",   title: "Façade Engineer",                      company: "Alucobond (3A Composites)", companyType: "brand", isVerified: true, isFeatured: false, isActivelyRecruiting: false, city: "New Delhi", region: "North India", workMode: "on-site", employmentType: "full-time", experienceLevel: "mid", experienceYearsMin: 4, experienceYearsMax: 8, salaryMin: 14, salaryMax: 22, hasEquity: false, discipline: "facade", postedDaysAgo: 12, applicants: 31, earlyApplicantBadge: false, shortDescription: "Own façade design + spec packs for top architectural clients.", responsibilities: ["Author façade make-ups for client briefs.", "Run shop drawings + IGU spec calculators.", "Coordinate factory ↔ site."], requirements: ["4+ years façade experience", "Strong drawing fundamentals", "Familiarity with NFRC + EN 13830"], niceToHaves: ["Façade Pro™", "Site supervision experience"], tags: ["facade", "alucobond", "rainscreen"], companySize: "1000+" },
  { id: "j-hvls-smart", title: "Smart Home Product Manager",           company: "Havells India",      companyType: "brand",      isVerified: true,  isFeatured: true,  isActivelyRecruiting: true,  city: "Noida",      region: "North India",   workMode: "hybrid",  employmentType: "full-time",  experienceLevel: "mid",            experienceYearsMin: 5,  experienceYearsMax: 9,  salaryMin: 22, salaryMax: 34, hasEquity: false, discipline: "smart-home",         postedDaysAgo: 0,  applicants: 4,   earlyApplicantBadge: true,  shortDescription: "PM the Lloyd Connect range — switches, lighting, HVAC.", responsibilities: ["Own product roadmap.", "Run cross-functional with engineering + design.", "Drive trade marketing."], requirements: ["B.Tech / B.Arch + MBA", "Consumer tech PM experience", "Strong analytics"], niceToHaves: ["Matter / Thread fluency", "Built-environment background"], tags: ["smart-home", "iot", "lloyd-connect"], companySize: "1000+" },
  { id: "j-eth-fab",    title: "Robotic Fabrication Tutor",            company: "ETH Zürich (MAS DFAB)", companyType: "institute", isVerified: true, isFeatured: false, isActivelyRecruiting: true, city: "Zürich", region: "International", workMode: "on-site", employmentType: "contract", experienceLevel: "lead-principal", experienceYearsMin: 8, experienceYearsMax: 15, salaryMin: 36, salaryMax: 60, hasEquity: false, discipline: "fabrication", postedDaysAgo: 6, applicants: 8, earlyApplicantBadge: false, shortDescription: "12-month visiting role at the Gramazio Kohler MAS DFAB programme.", responsibilities: ["Co-lead MAS DFAB workshops.", "Mentor lab thesis tracks.", "Publish research."], requirements: ["Robotic fabrication experience", "Strong English + ideally German", "Published research"], niceToHaves: ["KUKA / ABB programming", "PhD"], tags: ["fabrication", "robotics", "research"], companySize: "1000+" },
  { id: "j-bdp-intern", title: "Architecture Intern — Summer",         company: "BDP India",          companyType: "studio",     isVerified: true,  isFeatured: false, isActivelyRecruiting: true,  city: "Bengaluru",  region: "South India",   workMode: "on-site", employmentType: "internship", experienceLevel: "entry",          experienceYearsMin: 0,  experienceYearsMax: 1,  salaryMin: 0,  salaryMax: 0,  hasEquity: false, discipline: "architecture",       postedDaysAgo: 3,  applicants: 188, earlyApplicantBadge: false, shortDescription: "8-week paid summer internship across 2 active hospitality projects.", responsibilities: ["Support DD documentation.", "Build moodboards + material libraries.", "Site visits weekly."], requirements: ["Final-year B.Arch / M.Arch", "Strong portfolio", "Curious + collaborative"], niceToHaves: ["Revit certified", "Sketchup + Lumion"], tags: ["internship", "summer"], companySize: "51-200" },
];

/* ──────────────────────────────────────────────────────────────────────
   Labels
─────────────────────────────────────────────────────────────────────── */

const DISCIPLINE_LABEL: Record<Discipline, string> = {
  architecture: "Architecture", interior: "Interior Design", structural: "Structural Engineering",
  mep: "MEP", civil: "Civil", "urban-planning": "Urban Planning", landscape: "Landscape",
  bim: "BIM & Tech", computational: "Computational Design", sustainability: "Sustainability",
  "viz-3d": "3D Visualisation", "qs-cost": "QS & Cost", "project-management": "Project Management",
  "construction-management": "Construction Mgmt", "smart-home": "Smart Home", "brand-spec": "Brand Spec",
  facade: "Façade Engineering", fabrication: "Fabrication",
};

const REGIONS: Region[] = ["North India", "South India", "West India", "East India", "Central India", "Northeast India", "International"];
const WORK_MODE_LABEL: Record<WorkMode, string> = { "on-site": "On-site", hybrid: "Hybrid", remote: "Remote" };
const EMPLOYMENT_LABEL: Record<EmploymentType, string> = { "full-time": "Full-time", "part-time": "Part-time", contract: "Contract", internship: "Internship" };
const EXPERIENCE_LABEL: Record<ExperienceLevel, string> = { entry: "Entry (0-2 yrs)", mid: "Mid (3-6 yrs)", senior: "Senior (7-12 yrs)", "lead-principal": "Lead / Principal" };

const POSTED_OPTIONS = [
  { id: "24h",   label: "Past 24 hours", maxDays: 1 },
  { id: "week",  label: "Past week",      maxDays: 7 },
  { id: "month", label: "Past month",     maxDays: 30 },
  { id: "any",   label: "Any time",        maxDays: Infinity },
] as const;

/* ──────────────────────────────────────────────────────────────────────
   User profile
─────────────────────────────────────────────────────────────────────── */

interface UserProfile {
  name: string;
  role: string;
  discipline: Discipline;
  city: string;
  region: Region;
  yearsExp: number;
  preferredWorkMode: WorkMode;
}

const MOCK_PROFILE: UserProfile = {
  name: "Anika Sharma",
  role: "Interior Designer",
  discipline: "interior",
  city: "Mumbai",
  region: "West India",
  yearsExp: 5,
  preferredWorkMode: "hybrid",
};

const DISCIPLINE_ADJACENCY: Partial<Record<Discipline, Discipline[]>> = {
  interior:      ["architecture", "brand-spec", "viz-3d"],
  architecture:  ["interior", "landscape", "computational", "sustainability"],
  bim:           ["computational", "architecture"],
  sustainability:["architecture", "landscape"],
  "viz-3d":      ["interior", "architecture"],
  facade:        ["architecture", "sustainability"],
};

const PROFILE_KEY = "ml-jobs:profile";
function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch { return null; }
  });
  const signIn = (p: UserProfile = MOCK_PROFILE) => {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfile(p);
  };
  const signOut = () => {
    window.localStorage.removeItem(PROFILE_KEY);
    setProfile(null);
  };
  return { profile, signIn, signOut };
}

const ProfileCtx = createContext<UserProfile | null>(null);

/* ──────────────────────────────────────────────────────────────────────
   AI match scoring
─────────────────────────────────────────────────────────────────────── */

function getAIMatch(job: Job, profile: UserProfile | null): number {
  if (!profile) {
    const FALLBACK: Partial<Record<Discipline, number>> = {
      interior: 88, architecture: 82, "brand-spec": 75, "viz-3d": 72, bim: 70,
    };
    return Math.min(92, Math.max(50, FALLBACK[job.discipline] ?? 55));
  }
  let score = 40;
  if (job.discipline === profile.discipline) score += 40;
  else if (DISCIPLINE_ADJACENCY[profile.discipline]?.includes(job.discipline)) score += 20;
  if (job.city === profile.city) score += 10;
  else if (job.region === profile.region) score += 5;
  const midExp = (job.experienceYearsMin + job.experienceYearsMax) / 2;
  if (Math.abs(midExp - profile.yearsExp) <= 1) score += 15;
  else if (Math.abs(midExp - profile.yearsExp) <= 3) score += 7;
  if (job.workMode === profile.preferredWorkMode) score += 5;
  else if (job.workMode === "hybrid") score += 2;
  return Math.min(98, Math.max(42, score));
}

/* ──────────────────────────────────────────────────────────────────────
   Saved-state hook
─────────────────────────────────────────────────────────────────────── */

const SAVED_KEY = "ml-jobs:saved";
function useSavedJobs() {
  const [saved, setSaved] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });
  useEffect(() => {
    try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(Array.from(saved))); } catch {}
  }, [saved]);
  const toggle = (id: string) => setSaved((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  return { saved, toggle };
}

const ACCENT = "#ff6a3d";
const LINE = "1px solid rgba(0,0,0,0.08)";

/* ──────────────────────────────────────────────────────────────────────
   Sponsored studio ads
─────────────────────────────────────────────────────────────────────── */

interface StudioJobAd {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  imgUrl: string;
  profilePath: string;
  cta: string;
  stat: string;
  statLabel: string;
}

const STUDIO_JOB_ADS: StudioJobAd[] = [
  {
    id: "morphogenesis",
    name: "Morphogenesis",
    tagline: "Hiring top design talent across studios in Delhi & Bengaluru",
    desc: "India's most awarded architecture practice is growing — with open roles in architecture, sustainability, and urban design across their Delhi NCR and Bengaluru studios.",
    tags: ["Architecture", "Sustainability", "Urban Design"],
    imgUrl: "https://picsum.photos/seed/morphogenesis-studio/800/440",
    profilePath: "/studio/morphogenesis",
    cta: "See Open Roles",
    stat: "12",
    statLabel: "open positions",
  },
  {
    id: "space-matrix",
    name: "Space Matrix",
    tagline: "Join a global workplace design studio with 1,200+ projects",
    desc: "Space Matrix is expanding its India team with roles in interior design, project management, and BIM — across Mumbai, Bengaluru, and Hyderabad.",
    tags: ["Interior Design", "Workplace", "BIM"],
    imgUrl: "https://picsum.photos/seed/space-matrix-office/800/440",
    profilePath: "/studio/space-matrix",
    cta: "Explore Careers",
    stat: "8",
    statLabel: "roles across 3 cities",
  },
];

function JobsStudioAd({ ad }: { ad: StudioJobAd }) {
  return (
    <div className="rounded-2xl overflow-hidden flex" style={{ background: "#0f172a", border: LINE }}>
      {/* Photo strip — narrow */}
      <div className="relative flex-shrink-0 hidden sm:block" style={{ width: 110 }}>
        <img src={ad.imgUrl} alt={ad.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 30%, #0f172a 100%)" }} />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center px-5 py-4 gap-2 flex-1 min-w-0">
        {/* Row 1: label + stat */}
        <div className="flex items-center justify-between gap-2">
          <p style={{ fontSize: "0.58rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            Sponsored · Studio Spotlight
          </p>
          <div className="flex items-baseline gap-1.5 flex-shrink-0">
            <span style={{ fontSize: "1.25rem", fontWeight: 900, color: ACCENT, letterSpacing: "-0.03em", lineHeight: 1 }}>{ad.stat}</span>
            <span style={{ fontSize: "0.62rem", color: "rgba(248,250,252,0.45)", whiteSpace: "nowrap" }}>{ad.statLabel}</span>
          </div>
        </div>
        {/* Row 2: name + tagline */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            {ad.name}
          </h3>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(248,250,252,0.55)", lineHeight: 1.4, marginTop: 2 }}>
            {ad.tagline}
          </p>
        </div>
        {/* Row 3: tags + CTA on same line */}
        <div className="flex items-center gap-2 flex-wrap">
          {ad.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ fontSize: "0.6rem", fontWeight: 600, border: "1px solid rgba(248,250,252,0.15)", color: "rgba(248,250,252,0.65)" }}>
              {t}
            </span>
          ))}
          <a
            href={ad.profilePath}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl flex-shrink-0 ml-auto"
            style={{ background: ACCENT, color: "#fff", fontSize: "0.73rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            {ad.cta} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Helpers
─────────────────────────────────────────────────────────────────────── */

function formatSalary(j: Job): string {
  if (j.employmentType === "internship" || (j.salaryMin === 0 && j.salaryMax === 0)) return "Stipend";
  if (j.salaryMin === j.salaryMax) return `₹${j.salaryMin} LPA`;
  return `₹${j.salaryMin}–${j.salaryMax} LPA`;
}

function postedLabel(daysAgo: number): string {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "1 day ago";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.round(daysAgo / 7)} week${daysAgo < 14 ? "" : "s"} ago`;
  return `${Math.round(daysAgo / 30)} month${daysAgo < 60 ? "" : "s"} ago`;
}

function companyLogoFor(job: Job): string {
  return LOGO_MAP[job.company] ?? getBrandLogo(job.company);
}

/* ──────────────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────────────── */

export function PublicJobBoardPage() {
  const [query, setQuery] = useState("");
  const [disciplines, setDisciplines] = useState<Set<Discipline>>(new Set());
  const [regions, setRegions] = useState<Set<Region>>(new Set());
  const [workModes, setWorkModes] = useState<Set<WorkMode>>(new Set());
  const [employment, setEmployment] = useState<Set<EmploymentType>>(new Set());
  const [experience, setExperience] = useState<Set<ExperienceLevel>>(new Set());
  const [salaryMin, setSalaryMin] = useState(0);
  const [postedWithin, setPostedWithin] = useState<typeof POSTED_OPTIONS[number]["id"]>("any");
  const [onlySaved, setOnlySaved] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { saved, toggle: toggleSave } = useSavedJobs();
  const { profile, signIn, signOut } = useUserProfile();

  const [modalOpen, setModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const aiPicksRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("auth") === "open") {
      setModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleProfileSaved = useCallback((p: UserProfile) => {
    signIn(p);
    setModalOpen(false);
    setEditProfile(false);
    setTimeout(() => {
      aiPicksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [signIn]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const posted = POSTED_OPTIONS.find((p) => p.id === postedWithin)!;
    return JOBS.filter((j) => {
      if (onlySaved && !saved.has(j.id)) return false;
      if (q) {
        const hay = `${j.title} ${j.company} ${j.tags.join(" ")} ${j.shortDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (disciplines.size && !disciplines.has(j.discipline)) return false;
      if (regions.size && !regions.has(j.region)) return false;
      if (workModes.size && !workModes.has(j.workMode)) return false;
      if (employment.size && !employment.has(j.employmentType)) return false;
      if (experience.size && !experience.has(j.experienceLevel)) return false;
      if (salaryMin > 0 && j.salaryMax < salaryMin) return false;
      if (j.postedDaysAgo > posted.maxDays) return false;
      return true;
    }).sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      if (a.postedDaysAgo !== b.postedDaysAgo) return a.postedDaysAgo - b.postedDaysAgo;
      return b.salaryMax - a.salaryMax;
    });
  }, [query, disciplines, regions, workModes, employment, experience, salaryMin, postedWithin, onlySaved, saved]);

  useEffect(() => {
    if (filtered.length === 0) { setActiveId(null); return; }
    if (!activeId || !filtered.find((j) => j.id === activeId)) setActiveId(filtered[0].id);
  }, [filtered, activeId]);

  const active = filtered.find((j) => j.id === activeId) ?? null;

  const clearAll = () => {
    setQuery(""); setDisciplines(new Set()); setRegions(new Set()); setWorkModes(new Set());
    setEmployment(new Set()); setExperience(new Set()); setSalaryMin(0); setPostedWithin("any"); setOnlySaved(false);
  };

  const activeFilters: { label: string; onRemove: () => void }[] = [];
  disciplines.forEach((d) => activeFilters.push({ label: DISCIPLINE_LABEL[d], onRemove: () => setDisciplines((p) => { const n = new Set(p); n.delete(d); return n; }) }));
  regions.forEach((r) => activeFilters.push({ label: r, onRemove: () => setRegions((p) => { const n = new Set(p); n.delete(r); return n; }) }));
  workModes.forEach((m) => activeFilters.push({ label: WORK_MODE_LABEL[m], onRemove: () => setWorkModes((p) => { const n = new Set(p); n.delete(m); return n; }) }));
  employment.forEach((e) => activeFilters.push({ label: EMPLOYMENT_LABEL[e], onRemove: () => setEmployment((p) => { const n = new Set(p); n.delete(e); return n; }) }));
  experience.forEach((e) => activeFilters.push({ label: EXPERIENCE_LABEL[e], onRemove: () => setExperience((p) => { const n = new Set(p); n.delete(e); return n; }) }));
  if (salaryMin > 0) activeFilters.push({ label: `≥ ₹${salaryMin} LPA`, onRemove: () => setSalaryMin(0) });
  if (postedWithin !== "any") activeFilters.push({ label: POSTED_OPTIONS.find((p) => p.id === postedWithin)!.label, onRemove: () => setPostedWithin("any") });
  if (onlySaved) activeFilters.push({ label: "Saved only", onRemove: () => setOnlySaved(false) });

  const uniqueCompanies = useMemo(() => {
    const seen = new Set<string>();
    return JOBS.filter((j) => { if (seen.has(j.company)) return false; seen.add(j.company); return true; });
  }, []);

  const aiPicks = useMemo(() => {
    return [...JOBS].sort((a, b) => getAIMatch(b, profile) - getAIMatch(a, profile)).slice(0, 4);
  }, [profile]);

  return (
    <ProfileCtx.Provider value={profile}>
    <div className="min-h-screen" style={{ background: "#fafaf9", fontFamily: "Satoshi, sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #fff7f4 0%, #fff2eb 40%, #fef9f6 100%)",
        borderBottom: LINE,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative orange blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,106,61,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "30%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,106,61,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(to bottom, ${ACCENT}, #ff9f6b)` }} />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6" style={{ paddingTop: 52, paddingBottom: 48 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
            <div>
              <div style={{
                fontSize: "0.62rem", fontWeight: 700, color: ACCENT,
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <Sparkles className="w-3 h-3" />
                Material Library · Jobs
              </div>

              <h1 style={{
                fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                color: "#1a1a1a",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
                Find your next role<br />in AEC India.
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#6b7280", lineHeight: 1.65, maxWidth: 500, marginBottom: 28 }}>
                AI matches your profile to the right studio, brand, or firm. {JOBS.filter(j => j.isActivelyRecruiting).length} roles actively recruiting.
              </p>

              {/* Search bar */}
              <div className="flex items-center gap-2 max-w-[580px]" style={{
                border: "1.5px solid rgba(0,0,0,0.15)",
                borderRadius: 14,
                padding: "10px 10px 10px 16px",
                background: "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#9ca3af" }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, skill or company…"
                  className="bg-transparent outline-none flex-1 text-sm"
                  style={{ color: "#1a1a1a" }}
                />
                <button
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0"
                  style={{ background: ACCENT }}
                >
                  Search
                </button>
              </div>

              {/* Stats row */}
              <div className="mt-4 flex items-center gap-3 text-xs" style={{ color: "#9ca3af" }}>
                <span style={{ color: ACCENT, fontWeight: 700 }}>{JOBS.length} live roles</span>
                <span>·</span>
                <span>Updated daily</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" style={{ color: ACCENT }} />
                  AI-powered matching
                </span>
              </div>
            </div>

            {/* Right: 3-step AI explainer */}
            <div className="hidden lg:flex flex-col gap-3">
              {[
                { icon: UserCircle2, step: "01", title: "Build your profile", desc: "Discipline, city, years of experience, preferred work mode." },
                { icon: ScanSearch,  step: "02", title: "AI reads every role", desc: "We score all live jobs against your profile in real time." },
                { icon: ListChecks,  step: "03", title: "See ranked matches",  desc: "Jobs sorted by fit — not just recency or sponsor spend." },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="flex items-start gap-3 rounded-xl px-4 py-3.5" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,106,61,0.12)" }}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}12` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: ACCENT }} size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Step {step}</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{title}</p>
                    <p style={{ fontSize: "0.73rem", color: "#6b7280", lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANIES MARQUEE ── */}
      <section style={{ background: "white", borderBottom: LINE, overflow: "hidden", position: "relative" }}>
        <style>{`
          @keyframes jobs-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        {/* "Hiring from" label — pinned left, above fade */}
        <div style={{
          position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
          fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.14em",
          textTransform: "uppercase", color: ACCENT, zIndex: 3,
          background: "white", paddingRight: 8,
        }}>
          Hiring<br />from
        </div>

        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 110, background: "linear-gradient(to right, white 55%, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, white 55%, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div className="flex items-center" style={{ animation: "jobs-marquee 55s linear infinite", width: "max-content", padding: "18px 0" }}>
          {[...uniqueCompanies, ...uniqueCompanies].map((job, i) => (
            <div key={i} className="flex items-center justify-center flex-shrink-0" style={{ padding: "0 44px" }}>
              <img
                src={LOGO_MAP[job.company] ?? getBrandLogo(job.company)}
                alt={job.company}
                style={{ height: 30, maxWidth: 130, objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── AI PICKS ── */}
      <section ref={aiPicksRef} style={{ background: "#fffaf8", borderBottom: "1px solid rgba(255,106,61,0.1)" }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
          {profile ? (
            <>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a" }}>Picked for you</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={signOut} className="text-xs font-medium" style={{ color: "#9ca3af" }}>Sign out</button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  Based on your profile: {profile.role} · {profile.city} · {profile.yearsExp} yrs
                </p>
                <button
                  onClick={() => { setEditProfile(true); setModalOpen(true); }}
                  className="flex items-center gap-0.5 text-[11px] font-medium"
                  style={{ color: ACCENT }}
                >
                  <Pencil size={10} /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {aiPicks.map((job) => (
                  <AIPickCard key={job.id} job={job} onSelect={() => setActiveId(job.id)} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-2xl px-6 py-5" style={{ background: "white", border: `1.5px solid ${ACCENT}22`, boxShadow: `0 2px 16px ${ACCENT}10` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}12` }}>
                <Sparkles className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 3 }}>Get AI-matched to the right roles</p>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", lineHeight: 1.5 }}>
                  Tell us your discipline, city, and experience — we'll rank every job by how well it fits your profile.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(["Discipline", "City", "Experience level", "Work mode"] as const).map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" }}>{f}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap"
                style={{ background: ACCENT, color: "#fff", boxShadow: `0 4px 14px ${ACCENT}40` }}
              >
                Complete your profile →
              </button>
            </div>
          )}
        </div>
      </section>

      {modalOpen && (
        <AuthProfileModal
          startAtProfile={editProfile || !!profile}
          existingProfile={profile}
          onSave={handleProfileSaved}
          onClose={() => { setModalOpen(false); setEditProfile(false); }}
        />
      )}

      {/* ── STICKY FILTER BAR ── */}
      <div style={{ background: "white", borderBottom: LINE, position: "sticky", top: 0, zIndex: 10 }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#9ca3af" }} />

          {(["", ...Object.keys(DISCIPLINE_LABEL)] as (Discipline | "")[]).slice(0, 1).map(() => (
            <select
              key="disc"
              value={Array.from(disciplines)[0] ?? ""}
              onChange={(e) => { const v = e.target.value as Discipline; setDisciplines(v ? new Set([v]) : new Set()); }}
              className="outline-none text-xs font-semibold flex-shrink-0 cursor-pointer"
              style={{ border: disciplines.size ? `1.5px solid ${ACCENT}` : LINE, borderRadius: 999, padding: "5px 12px", background: disciplines.size ? `${ACCENT}10` : "white", color: disciplines.size ? ACCENT : "#374151" }}
            >
              <option value="">All Disciplines</option>
              {(Object.keys(DISCIPLINE_LABEL) as Discipline[]).map((d) => (
                <option key={d} value={d}>{DISCIPLINE_LABEL[d]}</option>
              ))}
            </select>
          ))}

          <select
            value={Array.from(workModes)[0] ?? ""}
            onChange={(e) => { const v = e.target.value as WorkMode; setWorkModes(v ? new Set([v]) : new Set()); }}
            className="outline-none text-xs font-semibold flex-shrink-0 cursor-pointer"
            style={{ border: workModes.size ? `1.5px solid ${ACCENT}` : LINE, borderRadius: 999, padding: "5px 12px", background: workModes.size ? `${ACCENT}10` : "white", color: workModes.size ? ACCENT : "#374151" }}
          >
            <option value="">Any Mode</option>
            {(Object.keys(WORK_MODE_LABEL) as WorkMode[]).map((m) => (
              <option key={m} value={m}>{WORK_MODE_LABEL[m]}</option>
            ))}
          </select>

          <select
            value={Array.from(experience)[0] ?? ""}
            onChange={(e) => { const v = e.target.value as ExperienceLevel; setExperience(v ? new Set([v]) : new Set()); }}
            className="outline-none text-xs font-semibold flex-shrink-0 cursor-pointer"
            style={{ border: experience.size ? `1.5px solid ${ACCENT}` : LINE, borderRadius: 999, padding: "5px 12px", background: experience.size ? `${ACCENT}10` : "white", color: experience.size ? ACCENT : "#374151" }}
          >
            <option value="">Any Level</option>
            {(Object.keys(EXPERIENCE_LABEL) as ExperienceLevel[]).map((e) => (
              <option key={e} value={e}>{EXPERIENCE_LABEL[e]}</option>
            ))}
          </select>

          <select
            value={Array.from(regions)[0] ?? ""}
            onChange={(e) => { const v = e.target.value as Region; setRegions(v ? new Set([v]) : new Set()); }}
            className="outline-none text-xs font-semibold flex-shrink-0 cursor-pointer"
            style={{ border: regions.size ? `1.5px solid ${ACCENT}` : LINE, borderRadius: 999, padding: "5px 12px", background: regions.size ? `${ACCENT}10` : "white", color: regions.size ? ACCENT : "#374151" }}
          >
            <option value="">Any Region</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={salaryMin.toString()}
            onChange={(e) => setSalaryMin(Number(e.target.value))}
            className="outline-none text-xs font-semibold flex-shrink-0 cursor-pointer"
            style={{ border: salaryMin > 0 ? `1.5px solid ${ACCENT}` : LINE, borderRadius: 999, padding: "5px 12px", background: salaryMin > 0 ? `${ACCENT}10` : "white", color: salaryMin > 0 ? ACCENT : "#374151" }}
          >
            <option value="0">Salary</option>
            {[10, 15, 20, 30, 40].map((v) => <option key={v} value={v}>≥ ₹{v} LPA</option>)}
          </select>

          <button
            onClick={() => setOnlySaved((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
            style={{
              border: onlySaved ? `1.5px solid ${ACCENT}` : LINE,
              borderRadius: 999,
              padding: "5px 12px",
              background: onlySaved ? `${ACCENT}10` : "white",
              color: onlySaved ? ACCENT : "#374151",
            }}
          >
            <BookmarkCheck className="w-3.5 h-3.5" /> Saved
          </button>

          {(activeFilters.length > 0 || query) && (
            <button onClick={clearAll} className="text-xs font-semibold flex-shrink-0 ml-1" style={{ color: "#9ca3af" }}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.45fr)] gap-5">

        {/* ── Filter rail ── */}
        <aside className="lg:sticky lg:top-[44px] self-start">
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: LINE, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: LINE }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280" }}>Filters</span>
              <button onClick={clearAll} style={{ fontSize: "0.7rem", fontWeight: 700, color: ACCENT }}>Reset</button>
            </div>

            {/* Saved toggle */}
            <div className="px-4 py-3" style={{ borderBottom: LINE }}>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2" style={{ fontSize: "0.78rem", color: "#374151", fontWeight: 600 }}>
                  <BookmarkCheck className="w-3.5 h-3.5" style={{ color: onlySaved ? ACCENT : "#9ca3af" }} />
                  Saved only
                </span>
                <span className="relative inline-block w-8 h-4 rounded-full transition-colors" style={{ background: onlySaved ? ACCENT : "rgba(0,0,0,0.15)" }}>
                  <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform" style={{ left: 2, transform: onlySaved ? "translateX(14px)" : "translateX(0)" }} />
                </span>
                <input type="checkbox" checked={onlySaved} onChange={(e) => setOnlySaved(e.target.checked)} className="sr-only" />
              </label>
            </div>

            <SidebarGroup title="Discipline">
              {(Object.keys(DISCIPLINE_LABEL) as Discipline[]).map((d) => (
                <FilterCheckbox key={d} label={DISCIPLINE_LABEL[d]} checked={disciplines.has(d)} onChange={() => setDisciplines((p) => { const n = new Set(p); n.has(d) ? n.delete(d) : n.add(d); return n; })} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Region">
              {REGIONS.map((r) => (
                <FilterCheckbox key={r} label={r} checked={regions.has(r)} onChange={() => setRegions((p) => { const n = new Set(p); n.has(r) ? n.delete(r) : n.add(r); return n; })} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Work mode">
              {(Object.keys(WORK_MODE_LABEL) as WorkMode[]).map((m) => (
                <FilterCheckbox key={m} label={WORK_MODE_LABEL[m]} checked={workModes.has(m)} onChange={() => setWorkModes((p) => { const n = new Set(p); n.has(m) ? n.delete(m) : n.add(m); return n; })} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Employment">
              {(Object.keys(EMPLOYMENT_LABEL) as EmploymentType[]).map((e) => (
                <FilterCheckbox key={e} label={EMPLOYMENT_LABEL[e]} checked={employment.has(e)} onChange={() => setEmployment((p) => { const n = new Set(p); n.has(e) ? n.delete(e) : n.add(e); return n; })} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Experience">
              {(Object.keys(EXPERIENCE_LABEL) as ExperienceLevel[]).map((e) => (
                <FilterCheckbox key={e} label={EXPERIENCE_LABEL[e]} checked={experience.has(e)} onChange={() => setExperience((p) => { const n = new Set(p); n.has(e) ? n.delete(e) : n.add(e); return n; })} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Posted">
              {POSTED_OPTIONS.map((p) => (
                <label key={p.id} className="flex items-center gap-2 px-4 py-1.5 cursor-pointer" style={{ background: postedWithin === p.id ? `${ACCENT}08` : "transparent" }}>
                  <input type="radio" checked={postedWithin === p.id} onChange={() => setPostedWithin(p.id)} className="w-3 h-3" style={{ accentColor: ACCENT }} />
                  <span style={{ fontSize: "0.76rem", color: "#374151" }}>{p.label}</span>
                </label>
              ))}
            </SidebarGroup>

            <SidebarGroup title="Min. Salary (LPA)" last>
              <div className="px-4 pb-2">
                <input type="range" min={0} max={40} step={2} value={salaryMin} onChange={(e) => setSalaryMin(Number(e.target.value))} className="w-full" style={{ accentColor: ACCENT }} />
                <div className="flex items-center justify-between mt-1" style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                  <span>₹0</span>
                  <span style={{ color: ACCENT, fontWeight: 700 }}>₹{salaryMin}+ LPA</span>
                  <span>₹40+</span>
                </div>
              </div>
            </SidebarGroup>
          </div>
        </aside>

        {/* ── Job list ── */}
        <div className="space-y-3 min-w-0">
          {/* Active filter chips */}
          {(activeFilters.length > 0 || query) && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {query && (
                <button onClick={() => setQuery("")} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                  "{query}" <X className="w-3 h-3" />
                </button>
              )}
              {activeFilters.map((f, i) => (
                <button key={i} onClick={f.onRemove} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                  {f.label} <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between" style={{ fontSize: "0.73rem", color: "#9ca3af" }}>
            <span>{filtered.length} role{filtered.length === 1 ? "" : "s"}</span>
            <span>Featured · most recent</span>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: "white", border: LINE }}>
              <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>No roles match these filters.</p>
              <button onClick={clearAll} className="mt-3 text-sm font-semibold" style={{ color: ACCENT }}>Clear filters</button>
            </div>
          ) : filtered.flatMap((job, idx) => {
            const card = (
              <JobListCard
                key={job.id}
                job={job}
                isActive={activeId === job.id}
                isSaved={saved.has(job.id)}
                onSave={() => toggleSave(job.id)}
                onSelect={() => setActiveId(job.id)}
              />
            );
            if (idx === 3) {
              return [card, <JobsStudioAd key="ad-1" ad={STUDIO_JOB_ADS[0]} />];
            }
            if (idx === 8) {
              return [card, <JobsStudioAd key="ad-2" ad={STUDIO_JOB_ADS[1]} />];
            }
            return [card];
          })}
        </div>

        {/* ── Job detail pane ── */}
        <aside className="lg:sticky lg:top-[44px] self-start min-w-0">
          {active ? (
            <JobDetail job={active} isSaved={saved.has(active.id)} onSave={() => toggleSave(active.id)} />
          ) : (
            <div className="rounded-2xl p-10 text-center" style={{ background: "white", border: LINE }}>
              <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>Select a role to see details.</p>
            </div>
          )}
        </aside>
      </section>
    </div>
    </ProfileCtx.Provider>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Sidebar group
─────────────────────────────────────────────────────────────────────── */

function SidebarGroup({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: last ? "none" : LINE }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280" }}>{title}</span>
        <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ color: "#9ca3af", transform: open ? "rotate(0)" : "rotate(-90deg)" }} />
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 px-4 py-1.5 cursor-pointer" style={{ background: checked ? `${ACCENT}08` : "transparent" }}>
      <input type="checkbox" checked={checked} onChange={onChange} className="w-3 h-3 rounded" style={{ accentColor: ACCENT }} />
      <span style={{ fontSize: "0.76rem", color: "#374151" }}>{label}</span>
    </label>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   AI Pick Card
─────────────────────────────────────────────────────────────────────── */

function AIPickCard({ job, onSelect }: { job: Job; onSelect: () => void }) {
  const score = getAIMatch(job, useContext(ProfileCtx));
  const isTop = score >= 90;
  const palette = CARD_PALETTE[job.companyType];
  return (
    <article
      onClick={onSelect}
      className="rounded-2xl p-4 cursor-pointer"
      style={{
        background: isTop ? "#1a1a1a" : palette.bg,
        border: isTop ? `2px solid ${ACCENT}` : "2px solid transparent",
        boxShadow: isTop ? `0 8px 28px rgba(255,106,61,0.2)` : "0 2px 10px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.15s",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0" style={{
          width: 52, height: 52, background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          padding: 5,
        }}>
          <img src={companyLogoFor(job)} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <span className="px-2 py-0.5 rounded-full font-bold" style={{ fontSize: "0.65rem", background: isTop ? ACCENT : palette.pill, color: isTop ? "white" : palette.pillText }}>
          {score}% match
        </span>
      </div>
      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: isTop ? "rgba(255,255,255,0.5)" : "#9ca3af", marginBottom: 3 }}>{job.company}</div>
      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: isTop ? "white" : "#111827", lineHeight: 1.25, marginBottom: 8 }}>{job.title}</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 900, color: isTop ? ACCENT : "#111827", marginBottom: 10 }}>{formatSalary(job)}</div>
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {[WORK_MODE_LABEL[job.workMode], job.city].map(t => (
          <span key={t} style={{ fontSize: "0.67rem", color: isTop ? "rgba(255,255,255,0.55)" : "#6b7280", background: isTop ? "rgba(255,255,255,0.1)" : palette.pill, borderRadius: 999, padding: "3px 9px" }}>{t}</span>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        className="w-full rounded-xl text-sm font-bold flex items-center justify-center"
        style={{ background: isTop ? ACCENT : "#111827", color: "white", padding: "9px 12px" }}
      >
        View role →
      </button>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Job List Card — reference-style with pastel card backgrounds
─────────────────────────────────────────────────────────────────────── */

// Card palette from brand guidelines — Material Orange tints + Gray/Muted-Blue tints
const CARD_PALETTE: Record<Job["companyType"], { bg: string; pill: string; pillText: string; accentBar: string }> = {
  // Studios → warmest orange tint (#FFD6C9) — creative / design energy
  studio:     { bg: "#FFD6C9", pill: "rgba(166,63,38,0.12)",  pillText: "#7F2F1D", accentBar: "#FF6A3D" },
  // Brands → lightest gray (#F1F5F9) — clean, established
  brand:      { bg: "#F1F5F9", pill: "rgba(71,85,105,0.1)",   pillText: "#334155",  accentBar: "#64748B" },
  // Consultants → cool gray-blue (#E2E8F0) — professional services
  consultant: { bg: "#E2E8F0", pill: "rgba(55,67,79,0.1)",    pillText: "#37434F",  accentBar: "#475569" },
  // Contractors → medium orange tint (#FFB39A) — construction energy
  contractor: { bg: "#FFB39A", pill: "rgba(127,47,29,0.15)",  pillText: "#7F2F1D",  accentBar: "#C94F2E" },
  // Institutes → muted slate (#CBD5E1) — academic, institutional
  institute:  { bg: "#CBD5E1", pill: "rgba(51,65,85,0.12)",   pillText: "#1F2937",  accentBar: "#3F4C5F" },
};

function JobListCard({ job, isActive, isSaved, onSave, onSelect }: {
  job: Job; isActive: boolean; isSaved: boolean; onSave: () => void; onSelect: () => void
}) {
  const score = getAIMatch(job, useContext(ProfileCtx));
  const palette = CARD_PALETTE[job.companyType];

  return (
    <article
      onClick={onSelect}
      className="rounded-2xl cursor-pointer"
      style={{
        background: palette.bg,
        border: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
        boxShadow: isActive
          ? `0 0 0 4px rgba(255,106,61,0.1), 0 8px 24px rgba(0,0,0,0.1)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.15s, border-color 0.15s",
        padding: "20px 20px 16px",
      }}
    >
      {/* Row 1: Salary + Logo */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#111827", lineHeight: 1.1 }}>
            {formatSalary(job)}
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {job.isFeatured && (
              <span className="flex items-center gap-1" style={{ fontSize: "0.62rem", fontWeight: 700, color: "#f59e0b", background: "#fef3c7", borderRadius: 999, padding: "2px 8px" }}>
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            {job.earlyApplicantBadge && (
              <span className="flex items-center gap-1" style={{ fontSize: "0.62rem", fontWeight: 700, color: "#10b981", background: "#d1fae5", borderRadius: 999, padding: "2px 8px" }}>
                <Zap className="w-2.5 h-2.5" /> Early applicant
              </span>
            )}
            <span style={{ fontSize: "0.62rem", fontWeight: 700, background: score >= 80 ? ACCENT : "rgba(0,0,0,0.08)", color: score >= 80 ? "white" : "#6b7280", borderRadius: 999, padding: "2px 8px" }}>
              AI {score}%
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center rounded-2xl overflow-hidden" style={{
          width: 64, height: 64,
          background: "white",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          padding: 6,
        }}>
          <img src={companyLogoFor(job)} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>

      {/* Row 2: Job title + Company */}
      <div className="mb-3">
        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111827", lineHeight: 1.3 }}>{job.title}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 500 }}>{job.company}</span>
          {job.isVerified && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />}
        </div>
      </div>

      {/* Row 3: Location + Date·Applicants */}
      <div className="space-y-1 mb-4">
        <div className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "#6b7280" }}>
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {job.city}, {job.region}
        </div>
        <div className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "#6b7280" }}>
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          {postedLabel(job.postedDaysAgo)} · {job.applicants} applicants
        </div>
      </div>

      {/* Row 4: Tag pills */}
      <div className="flex items-center gap-1.5 flex-wrap mb-4">
        {[EMPLOYMENT_LABEL[job.employmentType], WORK_MODE_LABEL[job.workMode], `${job.experienceYearsMin}–${job.experienceYearsMax} yrs`].map((t) => (
          <span key={t} style={{
            fontSize: "0.7rem", fontWeight: 600,
            background: palette.pill, color: palette.pillText,
            borderRadius: 999, padding: "4px 12px",
          }}>{t}</span>
        ))}
      </div>

      {/* Row 5: Apply button + Bookmark */}
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="flex-1 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
          style={{ background: "#111827", padding: "11px 16px" }}
        >
          Apply now
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 44, height: 44,
            background: isSaved ? `${ACCENT}18` : "rgba(0,0,0,0.07)",
            color: isSaved ? ACCENT : "#6b7280",
          }}
          aria-label={isSaved ? "Unsave" : "Save"}
        >
          {isSaved ? <BookmarkCheck className="w-4.5 h-4.5" /> : <BookmarkPlus className="w-4.5 h-4.5" />}
        </button>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Job Detail
─────────────────────────────────────────────────────────────────────── */

function JobDetail({ job, isSaved, onSave }: { job: Job; isSaved: boolean; onSave: () => void }) {
  const score = getAIMatch(job, useContext(ProfileCtx));
  return (
    <article className="rounded-2xl overflow-hidden" style={{ border: LINE, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

      {/* Dark header */}
      <div style={{ background: "#1a1a1a", padding: "24px 24px 20px" }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 64, height: 64, background: "white", padding: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            <img src={companyLogoFor(job)} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span style={{ color: ACCENT, fontWeight: 700, fontSize: "0.78rem" }}>{job.company}</span>
              {job.isVerified && <CheckCircle2 className="w-3 h-3" style={{ color: "#60a5fa" }} />}
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", textTransform: "capitalize" }}>· {job.companyType} · {job.companySize}</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "white", lineHeight: 1.2 }}>{job.title}</h2>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <span className="flex items-center gap-1 rounded-full" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", padding: "4px 10px" }}>
            <MapPin className="w-3 h-3" /> {job.city} · {job.region}
          </span>
          <span className="flex items-center gap-1 rounded-full" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", padding: "4px 10px" }}>
            <Globe className="w-3 h-3" /> {WORK_MODE_LABEL[job.workMode]}
          </span>
          <span className="flex items-center gap-1 rounded-full" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", padding: "4px 10px" }}>
            <Clock className="w-3 h-3" /> {postedLabel(job.postedDaysAgo)}
          </span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: ACCENT, background: `${ACCENT}20`, borderRadius: 999, padding: "4px 10px" }}>
            {score}% match
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white flex-1 justify-center" style={{ background: ACCENT }}>
            <Send className="w-3.5 h-3.5" /> Easy Apply
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: isSaved ? "rgba(255,106,61,0.2)" : "rgba(255,255,255,0.1)", color: isSaved ? ACCENT : "white" }}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
            {isSaved ? "Saved" : "Save"}
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
            <ExternalLink className="w-4 h-4" style={{ color: "rgba(255,255,255,0.5)" }} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: "white" }}>
        {/* 2×2 stats */}
        <div className="grid grid-cols-2" style={{ borderBottom: LINE }}>
          <StatSnap icon={IndianRupee} label="Compensation" value={formatSalary(job) + (job.hasEquity ? " + Equity" : "")} bordered />
          <StatSnap icon={Briefcase} label="Type" value={EMPLOYMENT_LABEL[job.employmentType]} />
          <StatSnap icon={GraduationCap} label="Experience" value={`${job.experienceYearsMin}–${job.experienceYearsMax} yrs`} bordered borderTop />
          <StatSnap icon={Layers} label="Discipline" value={DISCIPLINE_LABEL[job.discipline]} borderTop />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 px-5 py-4" style={{ borderBottom: LINE }}>
          {job.tags.map((t) => (
            <span key={t} style={{ fontSize: "0.7rem", fontWeight: 600, color: ACCENT, background: `${ACCENT}10`, borderRadius: 999, padding: "3px 10px" }}>#{t}</span>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-0">
          <DetailSection title="About the role">
            <p style={{ fontSize: "0.84rem", color: "#4b5563", lineHeight: 1.65 }}>{job.shortDescription}</p>
          </DetailSection>

          <DetailSection title="What you'll do">
            <ul className="space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: "#4b5563" }}>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} /> {r}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Requirements">
            <ul className="space-y-2">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: "#4b5563" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#10b981" }} /> {r}
                </li>
              ))}
            </ul>
          </DetailSection>

          {job.niceToHaves.length > 0 && (
            <DetailSection title="Nice to have">
              <div className="flex flex-wrap gap-1.5">
                {job.niceToHaves.map((n) => (
                  <span key={n} style={{ fontSize: "0.76rem", fontWeight: 600, color: "#6b7280", background: "rgba(0,0,0,0.04)", borderRadius: 999, padding: "4px 12px" }}>{n}</span>
                ))}
              </div>
            </DetailSection>
          )}

          {job.hiringManager && (
            <DetailSection title="Hiring team" last>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: LINE }}>
                <AvatarImg src={job.hiringManager.avatarUrl} fallback={job.hiringManager.initials} size={40} />
                <div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1a1a" }}>{job.hiringManager.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{job.hiringManager.title}</div>
                </div>
              </div>
            </DetailSection>
          )}
        </div>
      </div>
    </article>
  );
}

function StatSnap({ icon: Icon, label, value, bordered, borderTop }: {
  icon: React.ElementType; label: string; value: React.ReactNode; bordered?: boolean; borderTop?: boolean
}) {
  return (
    <div className="flex items-start gap-2.5 p-4" style={{
      borderRight: bordered ? LINE : "none",
      borderTop: borderTop ? LINE : "none",
    }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}12` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
      </div>
      <div className="min-w-0">
        <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a", marginTop: 1, lineHeight: 1.3 }}>{value}</div>
      </div>
    </div>
  );
}

function DetailSection({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="px-5 py-4" style={{ borderBottom: last ? "none" : LINE }}>
      <h4 style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9ca3af", marginBottom: 10 }}>{title}</h4>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Auth + Profile Modal
─────────────────────────────────────────────────────────────────────── */

function AuthProfileModal({ startAtProfile, existingProfile, onSave, onClose }: {
  startAtProfile: boolean;
  existingProfile: UserProfile | null;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}) {
  type Step = "auth" | "profile" | "matching";
  const [step, setStep] = useState<Step>(startAtProfile ? "profile" : "auth");
  const [tab, setTab] = useState<"signin" | "signup">("signup");

  // Auth fields
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");

  // Profile fields
  const [discipline, setDiscipline] = useState<Discipline>(existingProfile?.discipline ?? "interior");
  const [city, setCity]             = useState(existingProfile?.city ?? "");
  const [yearsExp, setYearsExp]     = useState(existingProfile?.yearsExp ?? 3);
  const [workMode, setWorkMode]     = useState<WorkMode>(existingProfile?.preferredWorkMode ?? "hybrid");
  const [progress, setProgress]     = useState(0);

  // Matching animation
  useEffect(() => {
    if (step !== "matching") return;
    const id = setInterval(() => setProgress((p) => {
      if (p >= 100) { clearInterval(id); return 100; }
      return p + 8;
    }), 60);
    return () => clearInterval(id);
  }, [step]);

  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(() => {
        onSave({
          name: name || existingProfile?.name || "You",
          role: DISCIPLINE_LABEL[discipline],
          discipline,
          city,
          region: "West India",
          yearsExp,
          preferredWorkMode: workMode,
        });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("profile");
  };

  const handleProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProgress(0);
    setStep("matching");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ background: "white" }}>

        {/* ── Step: Auth ── */}
        {step === "auth" && (
          <>
            <div className="px-7 pt-7 pb-4">
              <button onClick={onClose} className="mb-4 flex items-center gap-1 text-xs" style={{ color: "#9ca3af" }}>
                <X size={12} /> Close
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} style={{ color: ACCENT }} />
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a" }}>AI Job Matching</p>
              </div>
              <p style={{ fontSize: "0.78rem", color: "#6b7280", marginBottom: 20 }}>
                {tab === "signup" ? "Create an account to save your profile and get matched." : "Welcome back — sign in to see your matches."}
              </p>
              {/* Tabs */}
              <div className="flex rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #E2E8F0" }}>
                {(["signup", "signin"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-2 text-xs font-bold transition-all"
                    style={{ background: tab === t ? ACCENT : "transparent", color: tab === t ? "#fff" : "#6b7280" }}
                  >
                    {t === "signup" ? "New here?" : "Welcome back"}
                  </button>
                ))}
              </div>
              <form onSubmit={handleAuth} className="flex flex-col gap-3">
                {tab === "signup" && (
                  <input
                    required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E2E8F0", color: "#1a1a1a" }}
                  />
                )}
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #E2E8F0", color: "#1a1a1a" }}
                />
                <input
                  required type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #E2E8F0", color: "#1a1a1a" }}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-sm font-bold mt-1"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  {tab === "signup" ? "Create account →" : "Sign in →"}
                </button>
              </form>
            </div>
            <div className="px-7 py-4 text-center" style={{ borderTop: "1px solid #F1F5F9" }}>
              <p style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                {tab === "signup" ? "Already have an account? " : "No account? "}
                <button onClick={() => setTab(tab === "signup" ? "signin" : "signup")} style={{ color: ACCENT, fontWeight: 600 }}>
                  {tab === "signup" ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </>
        )}

        {/* ── Step: Profile ── */}
        {step === "profile" && (
          <form onSubmit={handleProfile}>
            <div className="px-7 pt-7 pb-6">
              <div className="flex items-center gap-2 mb-1">
                {!startAtProfile && (
                  <button type="button" onClick={() => setStep("auth")} className="mr-1" style={{ color: "#9ca3af" }}>
                    <ArrowLeft size={14} />
                  </button>
                )}
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a" }}>Your job preferences</p>
                <button type="button" onClick={onClose} className="ml-auto" style={{ color: "#9ca3af" }}><X size={14} /></button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: 22 }}>
                {startAtProfile ? "Update your profile to refresh matches." : "Step 2 of 2 — takes 30 seconds."}
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>Your discipline</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value as Discipline)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E2E8F0", color: "#1a1a1a", background: "white" }}
                  >
                    {(Object.keys(DISCIPLINE_LABEL) as Discipline[]).map((d) => (
                      <option key={d} value={d}>{DISCIPLINE_LABEL[d]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>City</label>
                  <input
                    required value={city} onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Bengaluru, Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E2E8F0", color: "#1a1a1a" }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color: "#374151" }}>Years of experience</label>
                  <div className="flex gap-2">
                    {([1, 3, 5, 8, 12] as const).map((yr) => (
                      <button
                        type="button" key={yr}
                        onClick={() => setYearsExp(yr)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{ background: yearsExp === yr ? ACCENT : "#F1F5F9", color: yearsExp === yr ? "#fff" : "#475569", border: `1.5px solid ${yearsExp === yr ? ACCENT : "#E2E8F0"}` }}
                      >
                        {yr === 12 ? "12+" : yr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color: "#374151" }}>Preferred work mode</label>
                  <div className="flex gap-2">
                    {(["on-site", "hybrid", "remote"] as WorkMode[]).map((m) => (
                      <button
                        type="button" key={m}
                        onClick={() => setWorkMode(m)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all"
                        style={{ background: workMode === m ? ACCENT : "#F1F5F9", color: workMode === m ? "#fff" : "#475569", border: `1.5px solid ${workMode === m ? ACCENT : "#E2E8F0"}` }}
                      >
                        {WORK_MODE_LABEL[m]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 rounded-xl text-sm font-bold"
                style={{ background: ACCENT, color: "#fff" }}
              >
                Find my matches →
              </button>
            </div>
          </form>
        )}

        {/* ── Step: Matching animation ── */}
        {step === "matching" && (
          <div className="px-7 py-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${ACCENT}12` }}>
              <Sparkles size={28} style={{ color: ACCENT }} />
            </div>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>Matching you now…</p>
            <p style={{ fontSize: "0.78rem", color: "#6b7280", marginBottom: 24 }}>
              Scoring {JOBS.length}+ live roles against your profile
            </p>
            <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "#F1F5F9" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ACCENT}, #ff9f6b)`, transition: "width 0.08s linear" }}
              />
            </div>
            <p className="mt-3 text-xs font-bold" style={{ color: ACCENT }}>{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
