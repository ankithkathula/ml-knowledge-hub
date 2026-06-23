import type {
  PORTFOLIO_WORKS as PortfolioWorksType,
  CAREER_HISTORY as CareerHistoryType,
  CERTIFICATIONS as CertificationsType,
  ENROLLED_COURSES as EnrolledCoursesType,
  BLOG_POSTS as BlogPostsType,
} from "./designerData";

// ─── Shared profile shape (Ankit + all verifiers) ────────────────────────────

export interface DesignerProfileData {
  id: string;
  name: string;
  initials: string;
  headline: string;
  type: string;
  location: string;
  email: string;
  website?: string;
  linkedin?: string;
  bio: string;
  skills: string[];
  stats: { works: number; profileViews: number; connections: number; endorsements: number };
  works: typeof PORTFOLIO_WORKS_SHAPE;
  careerHistory: typeof CAREER_HISTORY_SHAPE;
  certifications: typeof CERTIFICATIONS_SHAPE;
  courses: typeof COURSES_SHAPE;
  blogs: typeof BLOGS_SHAPE;
  accentColor: string;
  avatar?: string;
}

// placeholder type shapes (only used for TS inference — values are set below)
declare const PORTFOLIO_WORKS_SHAPE: Array<{
  id: string; title: string; category: string; year: string; client: string;
  gradient: string; description: string; tags: string[]; views: number; likes: number; isPublic: boolean;
}>;
declare const CAREER_HISTORY_SHAPE: Array<{
  id: string; role: string; company: string; period: string; from: string;
  to: string | null; description: string; skills: string[];
  verificationStatus?: "verified" | "pending" | "unverified";
}>;
declare const CERTIFICATIONS_SHAPE: Array<{ id: string; name: string; issuer: string; year: string; credentialId: string }>;
declare const COURSES_SHAPE: Array<{
  id: string; title: string; provider: string; progress: number;
  modulesComplete: number; totalModules: number; level: string; enrolledDate: string; completed: boolean;
}>;
declare const BLOGS_SHAPE: Array<{
  id: string; title: string; excerpt: string; date: string;
  tags: string[]; views: number; likes: number; status: string;
}>;

// ─── Endorsements on Ankit's work history ────────────────────────────────────

export interface Endorsement {
  verifierId: string;
  verifierName: string;
  verifierInitials: string;
  verifierRole: string;
  verifierCompany: string;
  relationship: "Direct Manager" | "Colleague" | "HR" | "Client" | "Mentor";
  comment: string;
  verifiedDate: string;
}

export interface WorkVerification {
  experienceId: string; // matches CAREER_HISTORY[n].id
  candidateSlug: string;
  companySlug: string;
  companyName: string;
  roleAtCompany: string;
  period: string;
  status: "verified" | "partial" | "pending";
  endorsements: Endorsement[];
}

export const WORK_VERIFICATIONS: WorkVerification[] = [
  {
    experienceId: "e1",
    candidateSlug: "ankit-sharma",
    companySlug: "studio-lotus",
    companyName: "Studio Lotus",
    roleAtCompany: "Senior Interior Designer",
    period: "Jan 2024 – Present",
    status: "verified",
    endorsements: [
      {
        verifierId: "rohan-mehta",
        verifierName: "Rohan Mehta",
        verifierInitials: "RM",
        verifierRole: "Principal & Co-founder",
        verifierCompany: "Studio Lotus",
        relationship: "Direct Manager",
        comment: "Ankit joined Studio Lotus in January 2024 as a Senior Interior Designer. He's been instrumental in our Rajwada Heritage project and has consistently delivered work of the highest quality. His material knowledge and client communication skills are exceptional.",
        verifiedDate: "2026-03-12",
      },
      {
        verifierId: "priya-nair",
        verifierName: "Priya Nair",
        verifierInitials: "PN",
        verifierRole: "Senior Architect",
        verifierCompany: "Studio Lotus",
        relationship: "Colleague",
        comment: "I've worked closely with Ankit on three projects since he joined. His ability to translate client briefs into thoughtful spatial narratives sets him apart. A genuine collaborator.",
        verifiedDate: "2026-03-15",
      },
      {
        verifierId: "vikram-sinha",
        verifierName: "Vikram Sinha",
        verifierInitials: "VS",
        verifierRole: "HR Manager",
        verifierCompany: "Studio Lotus",
        relationship: "HR",
        comment: "Confirmed employment as Senior Interior Designer from Jan 2024 to present. Employment records on file.",
        verifiedDate: "2026-03-18",
      },
    ],
  },
  {
    experienceId: "e2",
    candidateSlug: "ankit-sharma",
    companySlug: "morphogenesis",
    companyName: "Morphogenesis",
    roleAtCompany: "Interior Designer",
    period: "Jun 2021 – Dec 2023",
    status: "pending",
    endorsements: [],
  },
];

// ─── Verifier profiles (each gets their own /designer/:slug page) ─────────────

export const VERIFIER_PROFILES: DesignerProfileData[] = [
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    initials: "RM",
    headline: "Principal Architect & Co-founder at Studio Lotus",
    type: "Principal Architect",
    location: "Mumbai, India",
    email: "rohan@studiolotus.in",
    website: "studiolotus.in",
    linkedin: "linkedin.com/in/rohanmehta",
    bio: "Architect and co-founder of Studio Lotus, one of Mumbai's leading interdisciplinary design practices. Over 18 years of experience across luxury residential, boutique hospitality, and cultural institutions. Believer in architecture that negotiates between the vernacular and the contemporary.",
    skills: ["Architecture", "Project Leadership", "Luxury Residential", "Cultural Institutions", "Hospitality Design", "Urban Design", "Sustainable Architecture", "Client Relations"],
    stats: { works: 58, profileViews: 4200, connections: 890, endorsements: 241 },
    accentColor: "#0ea5e9",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    works: [
      { id: "rw1", title: "The Pearl House — Alibaug", category: "Residential", year: "2023", client: "Private Client", gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)", description: "A coastal weekend residence weaving local crafts with contemporary minimalism.", tags: ["Residential", "Coastal", "Luxury"], views: 820, likes: 74, isPublic: true },
      { id: "rw2", title: "NMACC Cultural Centre (Concept)", category: "Cultural", year: "2022", client: "Nita Mukesh Ambani Cultural Centre", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", description: "Design concept for an arts venue celebrating Indian craft traditions.", tags: ["Cultural", "Public", "Heritage"], views: 1240, likes: 112, isPublic: true },
      { id: "rw3", title: "Bandra Studio Offices", category: "Commercial", year: "2023", client: "TechCo India", gradient: "linear-gradient(135deg,#10b981,#34d399)", description: "A 6,000 sq ft creative office campus rooted in biophilic principles.", tags: ["Commercial", "Biophilic", "Office"], views: 630, likes: 55, isPublic: true },
    ],
    careerHistory: [
      { id: "re1", role: "Principal & Co-founder", company: "Studio Lotus", period: "2012 – Present", from: "2012-01", to: null, description: "Co-founded Studio Lotus in 2012. Oversee architectural design across 8-12 concurrent projects. Built the firm from a 2-person studio to a 35-person practice.", skills: ["Leadership", "Business Development", "Architecture"], verificationStatus: "unverified" },
      { id: "re2", role: "Senior Architect", company: "Morphogenesis", period: "2008 – 2012", from: "2008-06", to: "2012-01", description: "Led design on several award-winning commercial and institutional projects.", skills: ["Commercial Design", "Project Management"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "rc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2007", credentialId: "CA-IN-2007-RME-0341" },
      { id: "rc2", name: "LEED AP BD+C", issuer: "U.S. Green Building Council", year: "2015", credentialId: "LEED-AP-2015-RM-882" },
    ],
    courses: [],
    blogs: [
      { id: "rb1", title: "Designing for Climate: Lessons From 18 Years in Mumbai", excerpt: "How the monsoon, humidity, and coastal salt have shaped every material and spatial decision in our practice.", date: "2026-02-14", tags: ["Climate", "Architecture", "India"], views: 3200, likes: 280, status: "published" },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    headline: "Senior Architect at Studio Lotus | Heritage & Adaptive Reuse",
    type: "Senior Architect",
    location: "Mumbai, India",
    email: "priya.nair@studiolotus.in",
    website: "studiolotus.in",
    linkedin: "linkedin.com/in/priyanair-arch",
    bio: "Architect with 9 years of experience focused on heritage conservation, adaptive reuse, and biophilic interiors. Joined Studio Lotus in 2019. Passionate about the idea that the most sustainable building is the one that already exists.",
    skills: ["Heritage Conservation", "Adaptive Reuse", "Biophilic Design", "AutoCAD", "Revit", "Grasshopper", "Material Research", "Documentation"],
    stats: { works: 18, profileViews: 1650, connections: 390, endorsements: 64 },
    accentColor: "#ec4899",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    works: [
      { id: "pw1", title: "Lalbagh Fort Visitors' Centre", category: "Heritage", year: "2023", client: "Bangladesh Nat'l Museum", gradient: "linear-gradient(135deg,#ec4899,#f472b6)", description: "Sensitive adaptive reuse of a colonial-era annex as a modern visitor facility.", tags: ["Heritage", "Adaptive Reuse", "Public"], views: 940, likes: 88, isPublic: true },
      { id: "pw2", title: "Kala Ghoda Studio Apartment", category: "Residential", year: "2022", client: "Private Client", gradient: "linear-gradient(135deg,#f97316,#fb923c)", description: "A micro-apartment that uses layered textures and vertical planting to create generous feeling spaces.", tags: ["Residential", "Micro", "Biophilic"], views: 510, likes: 47, isPublic: true },
    ],
    careerHistory: [
      { id: "pe1", role: "Senior Architect", company: "Studio Lotus", period: "2019 – Present", from: "2019-03", to: null, description: "Lead heritage and adaptive reuse projects. Mentor 2 junior architects. Part of the material research initiative.", skills: ["Heritage", "Mentoring", "Material Research"], verificationStatus: "unverified" },
      { id: "pe2", role: "Architect", company: "INTACH Mumbai Chapter", period: "2016 – 2019", from: "2016-07", to: "2019-03", description: "Documentation and conservation planning for Grade I and II listed structures across Maharashtra.", skills: ["Conservation", "Documentation", "Heritage"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "pc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2015", credentialId: "CA-IN-2015-PN-1290" },
      { id: "pc2", name: "UNESCO Certificate in Heritage Conservation", issuer: "UNESCO-ICCROM", year: "2018", credentialId: "UNESCO-HCP-2018-PN-09" },
    ],
    courses: [
      { id: "pc1", title: "Grasshopper Parametric Design", provider: "Rhino Academy", progress: 80, modulesComplete: 8, totalModules: 10, level: "Advanced", enrolledDate: "2026-02-01", completed: false },
    ],
    blogs: [
      { id: "pb1", title: "What Heritage Buildings Can Teach Us About Material Longevity", excerpt: "Lime plaster has survived 200 years. Why are we still choosing gypsum board?", date: "2026-01-10", tags: ["Heritage", "Materials", "Conservation"], views: 1800, likes: 143, status: "published" },
    ],
  },
  {
    id: "vikram-sinha",
    name: "Vikram Sinha",
    initials: "VS",
    headline: "HR & Operations Manager at Studio Lotus",
    type: "HR Manager",
    location: "Mumbai, India",
    email: "vikram@studiolotus.in",
    bio: "Operations and HR professional with 11 years in the design and creative industry. Joined Studio Lotus in 2018 to build out its people and culture function. Responsible for talent acquisition, employee experience, and compliance.",
    skills: ["Talent Acquisition", "HR Operations", "HRIS", "Employment Law", "Payroll", "Performance Management", "Employer Branding", "D&I"],
    stats: { works: 0, profileViews: 720, connections: 580, endorsements: 38 },
    accentColor: "#6366f1",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    works: [],
    careerHistory: [
      { id: "ve1", role: "HR & Operations Manager", company: "Studio Lotus", period: "2018 – Present", from: "2018-04", to: null, description: "Built the HR function from scratch. Scaled team from 12 to 35 people. Implemented structured onboarding, performance review cycles, and ESOP framework.", skills: ["HR Strategy", "Scaling Teams", "Compliance"], verificationStatus: "unverified" },
      { id: "ve2", role: "HR Business Partner", company: "Mindspace Coworking", period: "2014 – 2018", from: "2014-09", to: "2018-04", description: "Supported HR for 3 co-working locations across Mumbai and Pune.", skills: ["HRBP", "Multi-site HR", "Recruitment"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "vc1", name: "SHRM-CP", issuer: "Society for Human Resource Management", year: "2017", credentialId: "SHRM-CP-2017-VS-4421" },
    ],
    courses: [],
    blogs: [],
  },
  {
    id: "mira-nayar",
    name: "Mira Nayar",
    initials: "MN",
    headline: "Principal Architect at Morphogenesis | High-rise & Mixed-Use",
    type: "Principal Architect",
    location: "Mumbai, India",
    email: "mira.nayar@morphogenesis.org",
    website: "morphogenesis.org",
    linkedin: "linkedin.com/in/miranayar-arch",
    bio: "Principal Architect with 16 years of experience leading complex mixed-use, commercial, and high-end residential projects across India. Joined Morphogenesis in 2012. Known for integrating passive design strategies with signature façade systems.",
    skills: ["Architecture", "High-rise Design", "Façade Engineering", "Passive Design", "Mixed-Use", "Revit", "Parametric Design", "Project Leadership"],
    stats: { works: 34, profileViews: 3800, connections: 720, endorsements: 198 },
    accentColor: "#7c3aed",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    works: [
      { id: "mnw1", title: "Kapoor Penthouse — Worli", category: "Residential", year: "2025", client: "Private Client", gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", description: "A 6,200 sq ft sky home with a double-height living terrace and bespoke stone cladding.", tags: ["Residential", "Luxury", "High-rise"], views: 1480, likes: 127, isPublic: true },
      { id: "mnw2", title: "Nexus Commercial Tower — BKC", category: "Commercial", year: "2024", client: "Nexus Ventures", gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)", description: "A 28-floor office tower with a unitised curtain wall façade and GRIHA 5-star rating.", tags: ["Commercial", "Façade", "Sustainable"], views: 2100, likes: 183, isPublic: true },
      { id: "mnw3", title: "The Courtyard Hotel — Lonavala", category: "Hospitality", year: "2023", client: "Courtyard by Marriott", gradient: "linear-gradient(135deg,#10b981,#34d399)", description: "A 120-key boutique hotel that references the stepped-well typology of Maharashtra.", tags: ["Hospitality", "Vernacular", "Landscape"], views: 960, likes: 81, isPublic: true },
    ],
    careerHistory: [
      { id: "mne1", role: "Principal Architect", company: "Morphogenesis", period: "2012 – Present", from: "2012-03", to: null, description: "Lead design principal for large-scale commercial and mixed-use projects. Manage a team of 12 architects. Represent the studio at client presentations and design juries.", skills: ["Leadership", "Design Direction", "Client Relations"], verificationStatus: "unverified" },
      { id: "mne2", role: "Associate Architect", company: "HOK India", period: "2007 – 2012", from: "2007-06", to: "2012-03", description: "Worked on airport terminal expansions and large corporate campuses.", skills: ["Airport Design", "Corporate Architecture", "BIM"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "mnc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2006", credentialId: "CA-IN-2006-MN-0882" },
      { id: "mnc2", name: "GRIHA Evaluator", issuer: "TERI, India", year: "2014", credentialId: "GRIHA-EVAL-2014-MN-0341" },
    ],
    courses: [],
    blogs: [
      { id: "mnb1", title: "Why India's Next Supertall Demands a New Approach to Façade Engineering", excerpt: "As projects push past 300 metres, the engineering of the envelope becomes the defining architectural gesture.", date: "2026-03-18", tags: ["High-rise", "Façade", "Engineering"], views: 2800, likes: 231, status: "published" },
    ],
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    initials: "AM",
    headline: "Project Lead & Associate Architect at Morphogenesis",
    type: "Associate Architect",
    location: "Mumbai, India",
    email: "arjun.mehta@morphogenesis.org",
    website: "morphogenesis.org",
    linkedin: "linkedin.com/in/arjunmehta-design",
    bio: "Associate Architect and Project Lead with 10 years in the profession. Specialise in coordinating multidisciplinary teams across design, MEP, and structural engineering. Passionate about building-information modelling and construction-phase delivery.",
    skills: ["Project Management", "BIM Coordination", "MEP Integration", "Revit", "Navisworks", "Construction Administration", "Cost Planning", "Team Leadership"],
    stats: { works: 21, profileViews: 2100, connections: 490, endorsements: 112 },
    accentColor: "#6d28d9",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    works: [
      { id: "amw1", title: "Kapoor Penthouse — Worli (Project Lead)", category: "Residential", year: "2025", client: "Private Client", gradient: "linear-gradient(135deg,#6d28d9,#8b5cf6)", description: "Led cross-discipline coordination for this complex sky home — structural, façade, MEP, and interiors.", tags: ["Residential", "Coordination", "Luxury"], views: 890, likes: 73, isPublic: true },
      { id: "amw2", title: "Nexus Tower — BIM Lead", category: "Commercial", year: "2024", client: "Nexus Ventures", gradient: "linear-gradient(135deg,#3b82f6,#60a5fa)", description: "Served as BIM lead on a 28-floor office tower, coordinating federated models across 5 consultants.", tags: ["Commercial", "BIM", "High-rise"], views: 1240, likes: 99, isPublic: true },
    ],
    careerHistory: [
      { id: "ame1", role: "Associate Architect / Project Lead", company: "Morphogenesis", period: "2017 – Present", from: "2017-08", to: null, description: "Lead project delivery for 3–4 concurrent large-scale projects. Responsible for programme, budget, and consultant coordination from design development through construction.", skills: ["Project Leadership", "BIM", "Construction Administration"], verificationStatus: "unverified" },
      { id: "ame2", role: "Architect", company: "WS Atkins India", period: "2013 – 2017", from: "2013-07", to: "2017-08", description: "Infrastructure and transport-related architecture on metro station and airport projects.", skills: ["Infrastructure", "Transport Architecture", "Documentation"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "amc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2013", credentialId: "CA-IN-2013-AM-2201" },
      { id: "amc2", name: "Autodesk Certified Professional — Revit", issuer: "Autodesk", year: "2019", credentialId: "AUT-RVT-2019-AM-5521" },
    ],
    courses: [
      { id: "amco1", title: "Advanced BIM Coordination", provider: "BIM Academy India", progress: 100, modulesComplete: 8, totalModules: 8, level: "Advanced", enrolledDate: "2025-10-01", completed: true },
    ],
    blogs: [],
  },
  {
    id: "priya-iyer",
    name: "Priya Iyer",
    initials: "PI",
    headline: "Interior Designer at Morphogenesis | Residential & Hospitality",
    type: "Interior Designer",
    location: "Mumbai, India",
    email: "priya.iyer@morphogenesis.org",
    website: "morphogenesis.org",
    linkedin: "linkedin.com/in/priyaiyer-interiors",
    bio: "Interior Designer with 7 years focused on luxury residential and boutique hospitality projects. Trained at CEPT Ahmedabad and spent 2 years in Milan before joining Morphogenesis. Known for material-led design concepts with a strong craft vocabulary.",
    skills: ["Interior Design", "Luxury Residential", "Material Specification", "FF&E", "Hospitality Design", "AutoCAD", "SketchUp", "3ds Max"],
    stats: { works: 14, profileViews: 1720, connections: 380, endorsements: 89 },
    accentColor: "#2563eb",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    works: [
      { id: "piw1", title: "Kapoor Penthouse — Interior Design", category: "Residential", year: "2025", client: "Private Client", gradient: "linear-gradient(135deg,#2563eb,#60a5fa)", description: "Full FF&E and interior design for a 6,200 sq ft penthouse — custom stone, bespoke joinery, and curated art curation.", tags: ["Residential", "Luxury", "FF&E"], views: 1340, likes: 118, isPublic: true },
      { id: "piw2", title: "The Courtyard Hotel — Interiors", category: "Hospitality", year: "2023", client: "Courtyard by Marriott", gradient: "linear-gradient(135deg,#10b981,#34d399)", description: "Guest room, lobby, and F&B interior design for a 120-key boutique hotel in the Western Ghats.", tags: ["Hospitality", "Hotel", "Vernacular"], views: 740, likes: 64, isPublic: true },
      { id: "piw3", title: "Seabreeze Villa — Goa", category: "Residential", year: "2022", client: "Private Client", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", description: "A beachside retreat using terracotta, rattan, and Portuguese tile as the material base.", tags: ["Residential", "Coastal", "Craft"], views: 560, likes: 48, isPublic: true },
    ],
    careerHistory: [
      { id: "pie1", role: "Interior Designer", company: "Morphogenesis", period: "2020 – Present", from: "2020-01", to: null, description: "Part of the interiors team at Morphogenesis, handling residential and hospitality commissions from concept through site handover.", skills: ["Design Direction", "Site Coordination", "FF&E"], verificationStatus: "unverified" },
      { id: "pie2", role: "Junior Designer", company: "Piero Lissoni Studio, Milan", period: "2018 – 2019", from: "2018-09", to: "2019-12", description: "Worked on European residential and hotel projects within Lissoni's team in Milan.", skills: ["European Aesthetic", "Furniture Design", "Luxury Hospitality"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "pic1", name: "Certified Interior Designer (CID)", issuer: "Indian Institute of Interior Designers", year: "2020", credentialId: "IIID-CID-20-3312" },
    ],
    courses: [
      { id: "pico1", title: "Material Specification & Procurement", provider: "MLKH Academy", progress: 100, modulesComplete: 6, totalModules: 6, level: "Intermediate", enrolledDate: "2024-08-01", completed: true },
    ],
    blogs: [
      { id: "pib1", title: "Craft as the Core of Luxury Interior Design", excerpt: "In an era of mass production, the clients who understand craft are the ones who end up with spaces worth keeping.", date: "2026-04-05", tags: ["Craft", "Luxury", "Materials"], views: 1120, likes: 93, status: "published" },
    ],
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    initials: "AR",
    headline: "Interior Designer at Kalpa Studio | Residential & Commercial Interiors",
    type: "Interior Designer",
    location: "Chennai, India",
    email: "ananya.rao@kalpastudio.in",
    website: "kalpastudio.in",
    linkedin: "linkedin.com/in/ananyarao-design",
    bio: "Interior Designer with 8 years specialising in warm, material-rich residential and boutique commercial interiors. Part of the founding team at Kalpa Studio, Chennai. Trained at NIFT Chennai and draws on Tamil craft traditions — particularly handwoven textiles and Chettinad stone — as the foundation of her design language.",
    skills: ["Interior Design", "Residential", "Material Specification", "FF&E", "Handloom Textiles", "SketchUp", "AutoCAD", "Vastu Consultation"],
    stats: { works: 22, profileViews: 1840, connections: 430, endorsements: 97 },
    accentColor: "#e11d48",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    works: [
      { id: "aw1", title: "The Chettinad House — Karaikudi", category: "Residential", year: "2024", client: "Private Client", gradient: "linear-gradient(135deg,#e11d48,#fb7185)", description: "Complete interior transformation of a heritage mansion using lime-washed walls, Athangudi tile, and hand-knotted rugs.", tags: ["Residential", "Heritage", "Craft"], views: 1640, likes: 148, isPublic: true },
      { id: "aw2", title: "Bloom Café — Nungambakkam", category: "Commercial", year: "2023", client: "Bloom F&B Pvt Ltd", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", description: "A 2,200 sq ft all-day café using terracotta, brass fixtures, and locally sourced jaali screens.", tags: ["Commercial", "F&B", "Craft"], views: 920, likes: 83, isPublic: true },
      { id: "aw3", title: "ECR Villa — Injambakkam", category: "Residential", year: "2022", client: "Private Client", gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)", description: "A coastal villa that layers Tandur stone, Madurai cotton, and local artisan work throughout its 4,800 sq ft.", tags: ["Residential", "Coastal", "Material"], views: 710, likes: 61, isPublic: true },
    ],
    careerHistory: [
      { id: "ae1", role: "Interior Designer", company: "Kalpa Studio", period: "2018 – Present", from: "2018-06", to: null, description: "Part of the founding team. Lead all interior commissions — from concept through handover. Mentor junior designers and manage material procurement relationships.", skills: ["Design Direction", "Client Management", "Craft Procurement"], verificationStatus: "unverified" },
      { id: "ae2", role: "Junior Designer", company: "Stapati Architects, Chennai", period: "2016 – 2018", from: "2016-08", to: "2018-06", description: "Residential and retail interior projects; developed material library and vendor relationships across Tamil Nadu.", skills: ["Residential Design", "Retail", "Material Research"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "ac1", name: "Certified Interior Designer (CID)", issuer: "Indian Institute of Interior Designers", year: "2016", credentialId: "IIID-CID-16-2204" },
    ],
    courses: [
      { id: "aco1", title: "Material Specification & Procurement", provider: "MLKH Academy", progress: 100, modulesComplete: 6, totalModules: 6, level: "Intermediate", enrolledDate: "2024-09-01", completed: true },
    ],
    blogs: [
      { id: "ab1", title: "Why Chettinad Stone Deserves a Place in Modern Interiors", excerpt: "Athangudi tile and Karaikudi lime-plaster have survived centuries. Here's how to integrate them without pastiche.", date: "2026-03-12", tags: ["Craft", "Heritage", "Materials"], views: 2100, likes: 176, status: "published" },
    ],
  },
  {
    id: "kabir-shah",
    name: "Kabir Shah",
    initials: "KS",
    headline: "Office Manager & Studio Operations at Kalpa Studio",
    type: "Office Manager",
    location: "Chennai, India",
    email: "kabir.shah@kalpastudio.in",
    bio: "Studio operations professional with 9 years in architecture and design practices. Manages all non-project functions at Kalpa Studio — contracts, vendor relations, HR, and finance. Previously ran operations at two Bengaluru-based firms before relocating to Chennai in 2019.",
    skills: ["Studio Operations", "Contracts & Legal", "HR Management", "Finance Coordination", "Vendor Relations", "Project Administration", "Tally ERP", "GST Compliance"],
    stats: { works: 0, profileViews: 610, connections: 340, endorsements: 28 },
    accentColor: "#0369a1",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    works: [],
    careerHistory: [
      { id: "ke1", role: "Office Manager", company: "Kalpa Studio", period: "2019 – Present", from: "2019-04", to: null, description: "Oversee all operational aspects of a 38-person studio — HR, contracts, vendor accounts, and office administration. Instrumental in implementing digital project tracking and GST compliance systems.", skills: ["Operations", "HR", "Finance"], verificationStatus: "unverified" },
      { id: "ke2", role: "Studio Coordinator", company: "Biome Environmental Solutions, Bengaluru", period: "2015 – 2019", from: "2015-09", to: "2019-03", description: "Managed procurement, billing, and project documentation for a sustainability-focused architecture practice.", skills: ["Procurement", "Billing", "Documentation"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "kc1", name: "Certified Administrative Professional (CAP)", issuer: "PACE International", year: "2017", credentialId: "PACE-CAP-2017-KS-3302" },
    ],
    courses: [],
    blogs: [],
  },
  {
    id: "ishaan-kapoor",
    name: "Ishaan Kapoor",
    initials: "IK",
    headline: "Principal Architect & Co-founder, Kalpa Studio Chennai",
    type: "Principal Architect",
    location: "Chennai, India",
    email: "ishaan@kalpastudio.in",
    website: "kalpastudio.in",
    linkedin: "linkedin.com/in/ishaankapoor-arch",
    bio: "Architect and co-founder of Kalpa Studio, a Chennai-based practice known for integrating South Indian vernacular typologies with contemporary construction methods. 14 years of practice spanning institutional, residential, and urban-scale projects. Recipient of the HUDCO Design Award 2022 and a Fulbright Fellow (2013). Teaches part-time at SPA Chennai.",
    skills: ["Architecture", "Urban Design", "Institutional Projects", "Passive Design", "Vernacular Architecture", "Revit", "Rhino", "Research & Teaching"],
    stats: { works: 41, profileViews: 4800, connections: 960, endorsements: 274 },
    accentColor: "#7c3aed",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    works: [
      { id: "ikw1", title: "Nilgiri Community Library — Ooty", category: "Institutional", year: "2024", client: "Nilgiri Municipal Corporation", gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", description: "A public library anchored in the hill-station vernacular — Nilgiri stone, sloped metal roofs, and verandah sequences that mediate outdoor learning.", tags: ["Institutional", "Public", "Vernacular"], views: 2800, likes: 243, isPublic: true },
      { id: "ikw2", title: "Adyar Riverside Housing", category: "Residential", year: "2023", client: "Kalpa Housing Trust", gradient: "linear-gradient(135deg,#10b981,#34d399)", description: "32-unit affordable housing block on the Adyar riverbank using exposed brick, concrete brise-soleil, and passive cross-ventilation.", tags: ["Residential", "Affordable", "Passive Design"], views: 1640, likes: 138, isPublic: true },
      { id: "ikw3", title: "Kalpa Studio HQ — Mylapore", category: "Commercial", year: "2021", client: "Self-commissioned", gradient: "linear-gradient(135deg,#f97316,#fb923c)", description: "The studio's own office — a converted warehouse in Mylapore featuring a double-height drawing hall and a publicly accessible material library.", tags: ["Commercial", "Adaptive Reuse", "Studio"], views: 3100, likes: 281, isPublic: true },
    ],
    careerHistory: [
      { id: "ike1", role: "Principal & Co-founder", company: "Kalpa Studio", period: "2014 – Present", from: "2014-01", to: null, description: "Co-founded Kalpa Studio in 2014 after returning from a Fulbright fellowship in the US. Lead architect across institutional, residential, and urban projects. Teach a design studio at SPA Chennai each semester.", skills: ["Practice Leadership", "Design Direction", "Teaching"], verificationStatus: "unverified" },
      { id: "ike2", role: "Project Architect", company: "Laurie Baker Centre, Thiruvananthapuram", period: "2011 – 2013", from: "2011-07", to: "2013-09", description: "Worked on low-cost housing and community buildings using Laurie Baker's cost-efficient masonry principles.", skills: ["Low-cost Construction", "Masonry", "Community Design"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "ikc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2011", credentialId: "CA-IN-2011-IK-1882" },
      { id: "ikc2", name: "GRIHA Evaluator", issuer: "TERI, India", year: "2016", credentialId: "GRIHA-EVAL-2016-IK-0512" },
    ],
    courses: [],
    blogs: [
      { id: "ikb1", title: "The Verandah as Climate Machine: Lessons From Tamil Nadu's Colonial Bungalows", excerpt: "The intermediate space is not dead. It is the most energy-efficient design move available to us in a South Indian climate.", date: "2026-04-20", tags: ["Vernacular", "Climate", "Tamil Nadu"], views: 3600, likes: 298, status: "published" },
    ],
  },
  {
    id: "nisha-verma",
    name: "Nisha Verma",
    initials: "NV",
    headline: "Senior Associate at Kalpa Studio | Project Delivery & Design Development",
    type: "Senior Associate",
    location: "Chennai, India",
    email: "nisha.verma@kalpastudio.in",
    website: "kalpastudio.in",
    linkedin: "linkedin.com/in/nishaverma-arch",
    bio: "Architect with 11 years of experience managing complex projects from design development through construction. Senior Associate at Kalpa Studio since 2020. Known for meticulous detailing, contractor coordination, and keeping ambitious designs buildable within budget. Previously worked with Sanjay Puri Architects in Mumbai.",
    skills: ["Architecture", "Design Development", "Construction Administration", "Technical Detailing", "Contractor Coordination", "AutoCAD", "Revit", "Cost Management"],
    stats: { works: 27, profileViews: 2200, connections: 510, endorsements: 143 },
    accentColor: "#0891b2",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    works: [
      { id: "nw1", title: "Nilgiri Library — Technical Lead", category: "Institutional", year: "2024", client: "Nilgiri Municipal Corporation", gradient: "linear-gradient(135deg,#0891b2,#22d3ee)", description: "Led design development and construction documentation for the Nilgiri Community Library — managing structural, MEP, and landscaping consultants.", tags: ["Institutional", "Technical", "Public"], views: 1120, likes: 96, isPublic: true },
      { id: "nw2", title: "Adyar Housing — Project Lead", category: "Residential", year: "2023", client: "Kalpa Housing Trust", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", description: "End-to-end project delivery for a 32-unit housing block — from tender documentation through occupation certificate.", tags: ["Residential", "Delivery", "Housing"], views: 780, likes: 67, isPublic: true },
      { id: "nw3", title: "T. Nagar Showroom Refit — RK Jewellers", category: "Commercial", year: "2022", client: "RK Jewellers Pvt Ltd", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", description: "A fast-track 6-week fit-out of a 4,500 sq ft jewellery showroom in Chennai's commercial heart.", tags: ["Commercial", "Retail", "Fast-track"], views: 540, likes: 44, isPublic: true },
    ],
    careerHistory: [
      { id: "ne1", role: "Senior Associate", company: "Kalpa Studio", period: "2020 – Present", from: "2020-02", to: null, description: "Drive design development and construction administration across 4–5 concurrent projects. Coordinate all technical consultants and manage construction-phase quality control.", skills: ["Project Delivery", "Technical Coordination", "QC"], verificationStatus: "unverified" },
      { id: "ne2", role: "Project Architect", company: "Sanjay Puri Architects, Mumbai", period: "2015 – 2020", from: "2015-06", to: "2020-01", description: "Designed and delivered hospitality, residential, and mixed-use projects known for complex geometric forms.", skills: ["Architecture", "Hospitality", "Complex Geometry"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "nc1", name: "Council of Architecture License", issuer: "Council of Architecture, India", year: "2014", credentialId: "CA-IN-2014-NV-3091" },
      { id: "nc2", name: "Project Management Professional (PMP)", issuer: "Project Management Institute", year: "2019", credentialId: "PMP-2019-NV-84432" },
    ],
    courses: [
      { id: "nco1", title: "Advanced Revit for Architecture", provider: "BIM Academy India", progress: 100, modulesComplete: 10, totalModules: 10, level: "Advanced", enrolledDate: "2025-06-01", completed: true },
    ],
    blogs: [],
  },
  {
    id: "vikram-bhalla",
    name: "Vikram Bhalla",
    initials: "VB",
    headline: "Quantity Surveyor Lead | Cost Planning & Contract Management",
    type: "Quantity Surveyor",
    location: "Mumbai, India",
    email: "vikram.bhalla@morphogenesis.org",
    website: "morphogenesis.org",
    linkedin: "linkedin.com/in/vikrambhalla-qs",
    bio: "Chartered Quantity Surveyor with 12 years in cost management for luxury residential and large-scale commercial construction across India. Joined Morphogenesis in 2016. Specialise in pre-contract cost planning, value engineering, and employer's agent services.",
    skills: ["Quantity Surveying", "Cost Planning", "Bill of Quantities", "Value Engineering", "Contract Administration", "NEC4", "RICS", "Procurement Strategy"],
    stats: { works: 8, profileViews: 940, connections: 310, endorsements: 67 },
    accentColor: "#d97706",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    works: [
      { id: "vbw1", title: "Kapoor Penthouse — Cost Plan", category: "Residential", year: "2025", client: "Private Client", gradient: "linear-gradient(135deg,#d97706,#fbbf24)", description: "Full pre-contract cost plan and procurement strategy for a high-specification penthouse across 3 levels.", tags: ["Residential", "Cost Planning", "Luxury"], views: 420, likes: 31, isPublic: true },
      { id: "vbw2", title: "Nexus Commercial Tower — QS Lead", category: "Commercial", year: "2024", client: "Nexus Ventures", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", description: "Led the QS workstream for a 28-floor commercial tower from RIBA Stage 2 through contract award.", tags: ["Commercial", "High-rise", "QS"], views: 580, likes: 44, isPublic: true },
    ],
    careerHistory: [
      { id: "vbe1", role: "QS Lead / Associate", company: "Morphogenesis", period: "2016 – Present", from: "2016-06", to: null, description: "In-house QS lead providing cost advice across all project types. Manage a team of 2 junior surveyors and external cost consultants.", skills: ["Cost Management", "Team Leadership", "Procurement"], verificationStatus: "unverified" },
      { id: "vbe2", role: "Quantity Surveyor", company: "Davis Langdon (AECOM)", period: "2011 – 2016", from: "2011-08", to: "2016-06", description: "Cost planning and contract administration on hospitality, residential, and infrastructure projects.", skills: ["QS Practice", "NEC Contracts", "Infrastructure"], verificationStatus: "unverified" },
    ],
    certifications: [
      { id: "vbc1", name: "MRICS (Member)", issuer: "Royal Institution of Chartered Surveyors", year: "2014", credentialId: "RICS-MRICS-2014-VB-7821" },
      { id: "vbc2", name: "NEC4 ECC Accredited User", issuer: "NEC Contracts", year: "2020", credentialId: "NEC4-ECC-2020-VB-0912" },
    ],
    courses: [],
    blogs: [],
  },
];

export function getVerifierById(id: string): DesignerProfileData | undefined {
  return VERIFIER_PROFILES.find((v) => v.id === id);
}

export function getVerificationForExp(experienceId: string, candidateSlug: string): WorkVerification | undefined {
  return WORK_VERIFICATIONS.find((v) => v.experienceId === experienceId && v.candidateSlug === candidateSlug);
}
