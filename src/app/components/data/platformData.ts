// ─── Interfaces ────────────────────────────────────────────────

export interface BomEntry {
  id: string;
  projectId: string;
  productName: string;
  brandName: string;
  l5Category: string;
  quantity: number;
  unit: "sqft" | "kg" | "nos" | "meters" | "liters";
  unitPrice: number;
  totalPrice: number;
  notes: string;
  status: "ordered" | "delivered" | "pending";
}

export interface SampleRequest {
  id: string;
  requesterId: string;
  requesterType: "studio" | "individual";
  productName: string;
  brandName: string;
  productImage: string;
  status: "requested" | "approved" | "shipped" | "received" | "returned";
  requestDate: string;
  shippingDate?: string;
  trackingId?: string;
  notes: string;
}

export interface KcVisit {
  id: string;
  userId: string;
  userName: string;
  userType: "studio" | "individual";
  kcLocation: string;
  date: string;
  time: string;
  purpose: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string;
  attendees: number;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
  category: string;
  materialsUsed: string[];
  location: string;
  isPublic: boolean;
  views: number;
  likes: number;
  createdDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  slug: string;
  type: "architect" | "engineer" | "student" | "designer" | "professional";
  avatar: string;
  bio: string;
  skills: string[];
  education: { degree: string; institution: string; year: number }[];
  experience: { role: string; company: string; duration: string }[];
  certifications: string[];
  socialLinks: { linkedin?: string; behance?: string; website?: string; instagram?: string };
  location: { city: string; state: string };
  joinedDate: string;
}

export interface TeamInvitation {
  id: string;
  studioId: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "pending" | "accepted" | "declined";
  invitedDate: string;
}

export interface TeamMemberStudio {
  id: string;
  studioId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  avatar: string;
  joinedDate: string;
  lastActive: string;
  status: "active" | "invited";
}

export interface PlatformCourse {
  id: string;
  creatorStudioId: string;
  creatorName: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  price: number;
  modules: { title: string; duration: string; description: string }[];
  enrolledCount: number;
  rating: number;
  status: "draft" | "published" | "archived";
  createdDate: string;
}

export interface PlatformJob {
  id: string;
  studioId: string;
  studioName: string;
  studioAvatar: string;
  title: string;
  description: string;
  location: string;
  type: "full-time" | "contract" | "freelance" | "internship";
  salary: string;
  requirements: string[];
  skills: string[];
  applicants: number;
  status: "active" | "closed" | "draft";
  postedDate: string;
  deadline: string;
}

// ─── Mock Data ─────────────────────────────────────────────────

export const BOM_ENTRIES: BomEntry[] = [
  {
    id: "bom-1",
    projectId: "proj-1",
    productName: "OPC 53 Grade Cement",
    brandName: "UltraTech",
    l5Category: "Cement > OPC > 53 Grade",
    quantity: 500,
    unit: "kg",
    unitPrice: 8.5,
    totalPrice: 4250,
    notes: "For RCC slab work - Ground floor",
    status: "delivered",
  },
  {
    id: "bom-2",
    projectId: "proj-1",
    productName: "Fe 500D TMT Steel Bars 12mm",
    brandName: "Tata Tiscon",
    l5Category: "Steel > TMT Bars > Fe 500D",
    quantity: 2000,
    unit: "kg",
    unitPrice: 72,
    totalPrice: 144000,
    notes: "Main reinforcement for columns and beams",
    status: "ordered",
  },
  {
    id: "bom-3",
    projectId: "proj-1",
    productName: "AAC Blocks 600x200x150mm",
    brandName: "Magicrete",
    l5Category: "Masonry > AAC Blocks > 150mm",
    quantity: 1200,
    unit: "nos",
    unitPrice: 55,
    totalPrice: 66000,
    notes: "External wall masonry - all floors",
    status: "pending",
  },
  {
    id: "bom-4",
    projectId: "proj-1",
    productName: "Cementitious Waterproofing Membrane",
    brandName: "Dr. Fixit",
    l5Category: "Waterproofing > Cementitious > Membrane",
    quantity: 350,
    unit: "sqft",
    unitPrice: 45,
    totalPrice: 15750,
    notes: "Terrace and bathroom waterproofing",
    status: "ordered",
  },
  {
    id: "bom-5",
    projectId: "proj-2",
    productName: "Glazed Vitrified Floor Tiles 800x800mm",
    brandName: "Kajaria",
    l5Category: "Tiles > Floor > GVT 800x800",
    quantity: 1800,
    unit: "sqft",
    unitPrice: 85,
    totalPrice: 153000,
    notes: "Living room and bedrooms - Statuario finish",
    status: "pending",
  },
  {
    id: "bom-6",
    projectId: "proj-2",
    productName: "FRLS Copper Wire 2.5 sq mm",
    brandName: "Havells",
    l5Category: "Electrical > Wires > FRLS Copper",
    quantity: 500,
    unit: "meters",
    unitPrice: 28,
    totalPrice: 14000,
    notes: "Power circuit wiring for entire unit",
    status: "delivered",
  },
  {
    id: "bom-7",
    projectId: "proj-2",
    productName: "CPVC Pipes 1 inch",
    brandName: "Astral",
    l5Category: "Plumbing > CPVC > 1 inch",
    quantity: 200,
    unit: "meters",
    unitPrice: 120,
    totalPrice: 24000,
    notes: "Hot and cold water supply lines",
    status: "ordered",
  },
  {
    id: "bom-8",
    projectId: "proj-2",
    productName: "Premium Emulsion Interior Paint",
    brandName: "Asian Paints",
    l5Category: "Paints > Interior > Premium Emulsion",
    quantity: 80,
    unit: "liters",
    unitPrice: 450,
    totalPrice: 36000,
    notes: "All interior walls - Royale Luxury finish",
    status: "pending",
  },
];

export const SAMPLE_REQUESTS: SampleRequest[] = [
  {
    id: "sr-1",
    requesterId: "studio-1",
    requesterType: "studio",
    productName: "Engineered Marble Tile 1200x600",
    brandName: "Simpolo",
    productImage: "/images/samples/marble-tile.jpg",
    status: "shipped",
    requestDate: "2026-03-15",
    shippingDate: "2026-03-18",
    trackingId: "DTDC9847261530",
    notes: "Need for client presentation - Luxury villa project",
  },
  {
    id: "sr-2",
    requesterId: "studio-2",
    requesterType: "studio",
    productName: "Wooden Laminate Flooring",
    brandName: "Greenlam",
    productImage: "/images/samples/laminate.jpg",
    status: "received",
    requestDate: "2026-03-10",
    shippingDate: "2026-03-12",
    trackingId: "BL2837465920",
    notes: "Client approved - placing bulk order soon",
  },
  {
    id: "sr-3",
    requesterId: "user-1",
    requesterType: "individual",
    productName: "Anti-Skid Bathroom Tiles 300x300",
    brandName: "Somany",
    productImage: "/images/samples/bathroom-tile.jpg",
    status: "approved",
    requestDate: "2026-03-20",
    notes: "For personal home renovation project",
  },
  {
    id: "sr-4",
    requesterId: "studio-1",
    requesterType: "studio",
    productName: "Quartz Kitchen Countertop",
    brandName: "Kalinga Stone",
    productImage: "/images/samples/quartz-counter.jpg",
    status: "requested",
    requestDate: "2026-03-25",
    notes: "Modular kitchen project - Whitefield client",
  },
  {
    id: "sr-5",
    requesterId: "user-3",
    requesterType: "individual",
    productName: "WPC Wall Panel",
    brandName: "Aludecor",
    productImage: "/images/samples/wpc-panel.jpg",
    status: "returned",
    requestDate: "2026-02-28",
    shippingDate: "2026-03-02",
    trackingId: "DELHIVERY84920",
    notes: "Colour did not match expectation, returned sample",
  },
  {
    id: "sr-6",
    requesterId: "studio-2",
    requesterType: "studio",
    productName: "Decorative Veneer Sheet",
    brandName: "Century Ply",
    productImage: "/images/samples/veneer.jpg",
    status: "requested",
    requestDate: "2026-03-28",
    notes: "Office reception wall cladding - need teak finish",
  },
];

export const KC_VISITS: KcVisit[] = [
  {
    id: "kc-1",
    userId: "studio-1",
    userName: "DesignCraft Studio",
    userType: "studio",
    kcLocation: "MaterialKart KC - Indiranagar, Bengaluru",
    date: "2026-04-05",
    time: "10:30 AM",
    purpose: "Client meeting to finalize tiles and sanitaryware for 3BHK project",
    status: "scheduled",
    notes: "Client Mr. Sharma will join. Need to see Kajaria premium range.",
    attendees: 4,
  },
  {
    id: "kc-2",
    userId: "user-2",
    userName: "Priya Menon",
    userType: "individual",
    kcLocation: "MaterialKart KC - Banjara Hills, Hyderabad",
    date: "2026-03-28",
    time: "2:00 PM",
    purpose: "Explore kitchen countertop and backsplash options",
    status: "completed",
    notes: "Shortlisted 3 quartz options. Will decide by next week.",
    attendees: 2,
  },
  {
    id: "kc-3",
    userId: "studio-2",
    userName: "ArchiVista Designs",
    userType: "studio",
    kcLocation: "MaterialKart KC - Andheri, Mumbai",
    date: "2026-04-10",
    time: "11:00 AM",
    purpose: "Bulk material selection for commercial office fitout",
    status: "scheduled",
    notes: "15,000 sqft office project. Need flooring, false ceiling, and partition samples.",
    attendees: 6,
  },
  {
    id: "kc-4",
    userId: "user-4",
    userName: "Rohit Kapoor",
    userType: "individual",
    kcLocation: "MaterialKart KC - Sector 18, Noida",
    date: "2026-03-20",
    time: "4:30 PM",
    purpose: "Compare paint brands for 2BHK flat",
    status: "completed",
    notes: "Selected Asian Paints Royale for living room, Berger for bedrooms.",
    attendees: 1,
  },
  {
    id: "kc-5",
    userId: "studio-1",
    userName: "DesignCraft Studio",
    userType: "studio",
    kcLocation: "MaterialKart KC - Indiranagar, Bengaluru",
    date: "2026-03-15",
    time: "3:00 PM",
    purpose: "Waterproofing solutions demo with Dr. Fixit team",
    status: "cancelled",
    notes: "Cancelled due to client schedule conflict. Rescheduling.",
    attendees: 3,
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "port-1",
    userId: "user-1",
    title: "Serenity Villa - Contemporary Tropical Home",
    description: "A 4500 sqft contemporary tropical residence in Koramangala, Bengaluru featuring open courtyards, sustainable materials, and passive cooling design.",
    coverImage: "/images/portfolio/serenity-villa-cover.jpg",
    images: ["/images/portfolio/serenity-1.jpg", "/images/portfolio/serenity-2.jpg", "/images/portfolio/serenity-3.jpg"],
    category: "Residential",
    materialsUsed: ["Exposed brick", "Kadapa stone", "Reclaimed teak wood", "Corten steel"],
    location: "Bengaluru, Karnataka",
    isPublic: true,
    views: 2340,
    likes: 187,
    createdDate: "2026-01-15",
  },
  {
    id: "port-2",
    userId: "user-1",
    title: "The Canopy Cafe - Biophilic Restaurant Design",
    description: "An 1800 sqft cafe interior in Indiranagar with living walls, natural materials, and abundant daylight. Designed to bring the outdoors in.",
    coverImage: "/images/portfolio/canopy-cafe-cover.jpg",
    images: ["/images/portfolio/canopy-1.jpg", "/images/portfolio/canopy-2.jpg"],
    category: "Commercial",
    materialsUsed: ["Bamboo", "Terrazzo flooring", "Rattan furniture", "Moss walls"],
    location: "Bengaluru, Karnataka",
    isPublic: true,
    views: 1560,
    likes: 124,
    createdDate: "2025-11-20",
  },
  {
    id: "port-3",
    userId: "user-2",
    title: "Azure Heights - Luxury Apartment Interiors",
    description: "Complete interior design for a 3BHK apartment in Banjara Hills. Italian marble, custom joinery, and smart home integration.",
    coverImage: "/images/portfolio/azure-cover.jpg",
    images: ["/images/portfolio/azure-1.jpg", "/images/portfolio/azure-2.jpg", "/images/portfolio/azure-3.jpg", "/images/portfolio/azure-4.jpg"],
    category: "Residential Interior",
    materialsUsed: ["Italian marble", "Veneer paneling", "Lacquered glass", "PU finish woodwork"],
    location: "Hyderabad, Telangana",
    isPublic: true,
    views: 3120,
    likes: 256,
    createdDate: "2025-12-05",
  },
  {
    id: "port-4",
    userId: "user-2",
    title: "GreenEdge Co-working Space",
    description: "A 6000 sqft co-working space in HITEC City with flexible layouts, acoustic pods, and an emphasis on sustainability with GRIHA rating.",
    coverImage: "/images/portfolio/greenedge-cover.jpg",
    images: ["/images/portfolio/greenedge-1.jpg", "/images/portfolio/greenedge-2.jpg"],
    category: "Commercial",
    materialsUsed: ["Recycled wood", "Acoustic panels", "Polished concrete", "Green wall systems"],
    location: "Hyderabad, Telangana",
    isPublic: false,
    views: 890,
    likes: 67,
    createdDate: "2026-02-18",
  },
  {
    id: "port-5",
    userId: "user-5",
    title: "Lotus Garden - Landscape Masterplan",
    description: "Landscape masterplan for a 2-acre gated community in Pune. Features native plant palette, rainwater harvesting, and sensory garden zones.",
    coverImage: "/images/portfolio/lotus-garden-cover.jpg",
    images: ["/images/portfolio/lotus-1.jpg", "/images/portfolio/lotus-2.jpg", "/images/portfolio/lotus-3.jpg"],
    category: "Landscape",
    materialsUsed: ["Kota stone pathways", "Pebble wash", "Corten steel planters", "Native grasses"],
    location: "Pune, Maharashtra",
    isPublic: true,
    views: 1870,
    likes: 143,
    createdDate: "2025-10-10",
  },
  {
    id: "port-6",
    userId: "user-5",
    title: "Heritage Courtyard Restoration",
    description: "Sensitive restoration of a 200-year-old wada courtyard in Pune using traditional lime mortar techniques and locally sourced materials.",
    coverImage: "/images/portfolio/heritage-cover.jpg",
    images: ["/images/portfolio/heritage-1.jpg", "/images/portfolio/heritage-2.jpg"],
    category: "Heritage & Restoration",
    materialsUsed: ["Lime mortar", "Burma teak", "Mangalore tiles", "Laterite stone"],
    location: "Pune, Maharashtra",
    isPublic: true,
    views: 4520,
    likes: 389,
    createdDate: "2026-03-01",
  },
];

export const USER_PROFILES: UserProfile[] = [
  {
    id: "user-1",
    name: "Arjun Nair",
    slug: "arjun-nair",
    type: "architect",
    avatar: "/images/avatars/arjun.jpg",
    bio: "Principal Architect with 12 years of experience in sustainable residential and commercial design. Passionate about biophilic architecture and climate-responsive design in the Indian context.",
    skills: ["AutoCAD", "Revit", "SketchUp", "V-Ray", "Sustainable Design", "GRIHA", "Project Management"],
    education: [
      { degree: "B.Arch", institution: "School of Planning & Architecture, New Delhi", year: 2014 },
      { degree: "M.Arch (Sustainable Architecture)", institution: "CEPT University, Ahmedabad", year: 2016 },
    ],
    experience: [
      { role: "Principal Architect", company: "Nair & Associates", duration: "2020 - Present" },
      { role: "Senior Architect", company: "Mindspace Architects, Bengaluru", duration: "2016 - 2020" },
    ],
    certifications: ["Council of Architecture (India) - Registered Architect", "GRIHA Certified Professional", "LEED Green Associate"],
    socialLinks: { linkedin: "linkedin.com/in/arjunnair", behance: "behance.net/arjunnair", website: "nairassociates.in" },
    location: { city: "Bengaluru", state: "Karnataka" },
    joinedDate: "2025-06-15",
  },
  {
    id: "user-2",
    name: "Priya Menon",
    slug: "priya-menon",
    type: "designer",
    avatar: "/images/avatars/priya.jpg",
    bio: "Interior designer specializing in luxury residential and hospitality projects. Known for blending contemporary aesthetics with traditional Indian craftsmanship.",
    skills: ["3ds Max", "V-Ray", "AutoCAD", "Material Selection", "FF&E", "Colour Theory", "Space Planning"],
    education: [
      { degree: "B.Des (Interior Design)", institution: "NID Ahmedabad", year: 2017 },
    ],
    experience: [
      { role: "Design Director", company: "Studio Priya Menon, Hyderabad", duration: "2021 - Present" },
      { role: "Senior Designer", company: "Livspace, Bengaluru", duration: "2017 - 2021" },
    ],
    certifications: ["IIID Member", "WELL AP"],
    socialLinks: { linkedin: "linkedin.com/in/priyamenon", instagram: "instagram.com/studiopriyamenon", behance: "behance.net/priyamenon" },
    location: { city: "Hyderabad", state: "Telangana" },
    joinedDate: "2025-08-20",
  },
  {
    id: "user-3",
    name: "Vikram Joshi",
    slug: "vikram-joshi",
    type: "engineer",
    avatar: "/images/avatars/vikram.jpg",
    bio: "Structural engineer with expertise in RCC and steel structures for high-rise buildings. Experienced with IS codes, seismic design, and BIM coordination.",
    skills: ["STAAD Pro", "ETABS", "Revit Structure", "AutoCAD", "RCC Design", "Steel Design", "Seismic Analysis"],
    education: [
      { degree: "B.Tech (Civil Engineering)", institution: "IIT Bombay", year: 2012 },
      { degree: "M.Tech (Structural Engineering)", institution: "IIT Bombay", year: 2014 },
    ],
    experience: [
      { role: "Lead Structural Engineer", company: "Thornton Tomasetti India, Mumbai", duration: "2019 - Present" },
      { role: "Structural Engineer", company: "L&T Construction, Chennai", duration: "2014 - 2019" },
    ],
    certifications: ["Chartered Engineer (Institution of Engineers India)", "BIM Professional Certificate"],
    socialLinks: { linkedin: "linkedin.com/in/vikramjoshi", website: "vikramjoshi.engineer" },
    location: { city: "Mumbai", state: "Maharashtra" },
    joinedDate: "2025-09-10",
  },
  {
    id: "user-4",
    name: "Sneha Gupta",
    slug: "sneha-gupta",
    type: "student",
    avatar: "/images/avatars/sneha.jpg",
    bio: "Final year Interior Design student passionate about sustainable materials and adaptive reuse. Currently working on thesis about repurposing industrial spaces in Indian cities.",
    skills: ["SketchUp", "Adobe Creative Suite", "AutoCAD", "Hand Sketching", "Material Research", "Model Making"],
    education: [
      { degree: "B.Des (Interior Design)", institution: "Sir JJ School of Art, Mumbai", year: 2026 },
    ],
    experience: [
      { role: "Design Intern", company: "Studio Lotus, New Delhi", duration: "Summer 2025" },
    ],
    certifications: ["Google SketchUp Certification"],
    socialLinks: { instagram: "instagram.com/snehagupta.design", behance: "behance.net/snehagupta" },
    location: { city: "Mumbai", state: "Maharashtra" },
    joinedDate: "2025-11-01",
  },
  {
    id: "user-5",
    name: "Rajesh Patil",
    slug: "rajesh-patil",
    type: "professional",
    avatar: "/images/avatars/rajesh.jpg",
    bio: "Landscape architect and urban designer with 15 years of experience. Specializes in native plant landscaping, heritage garden restoration, and sustainable stormwater management.",
    skills: ["Lumion", "Rhino", "Grasshopper", "GIS", "Plant Identification", "Irrigation Design", "Urban Design"],
    education: [
      { degree: "B.Arch", institution: "College of Engineering, Pune", year: 2008 },
      { degree: "MLA (Landscape Architecture)", institution: "University of Sheffield, UK", year: 2011 },
    ],
    experience: [
      { role: "Founder & Principal", company: "GreenScape Design Studio, Pune", duration: "2015 - Present" },
      { role: "Landscape Architect", company: "SWA Group India, Mumbai", duration: "2011 - 2015" },
    ],
    certifications: ["ISOLA Member", "ISA Certified Arborist", "Council of Architecture (India)"],
    socialLinks: { linkedin: "linkedin.com/in/rajeshpatil", website: "greenscapedesign.in", instagram: "instagram.com/greenscape.pune" },
    location: { city: "Pune", state: "Maharashtra" },
    joinedDate: "2025-07-05",
  },
];

export const TEAM_MEMBERS_STUDIO: TeamMemberStudio[] = [
  {
    id: "tm-1",
    studioId: "studio-1",
    name: "Ananya Krishnan",
    email: "ananya@designcraft.studio",
    role: "owner",
    avatar: "/images/avatars/ananya.jpg",
    joinedDate: "2024-01-10",
    lastActive: "2026-03-31",
    status: "active",
  },
  {
    id: "tm-2",
    studioId: "studio-1",
    name: "Karthik Raman",
    email: "karthik@designcraft.studio",
    role: "admin",
    avatar: "/images/avatars/karthik.jpg",
    joinedDate: "2024-03-15",
    lastActive: "2026-03-30",
    status: "active",
  },
  {
    id: "tm-3",
    studioId: "studio-1",
    name: "Deepa Sharma",
    email: "deepa@designcraft.studio",
    role: "editor",
    avatar: "/images/avatars/deepa.jpg",
    joinedDate: "2025-06-20",
    lastActive: "2026-03-29",
    status: "active",
  },
  {
    id: "tm-4",
    studioId: "studio-2",
    name: "Farhan Syed",
    email: "farhan@archivista.in",
    role: "owner",
    avatar: "/images/avatars/farhan.jpg",
    joinedDate: "2024-02-01",
    lastActive: "2026-03-31",
    status: "active",
  },
  {
    id: "tm-5",
    studioId: "studio-2",
    name: "Meera Iyer",
    email: "meera@archivista.in",
    role: "editor",
    avatar: "/images/avatars/meera.jpg",
    joinedDate: "2024-08-10",
    lastActive: "2026-03-28",
    status: "active",
  },
  {
    id: "tm-6",
    studioId: "studio-2",
    name: "Rahul Deshmukh",
    email: "rahul.d@archivista.in",
    role: "viewer",
    avatar: "/images/avatars/rahul.jpg",
    joinedDate: "2026-03-20",
    lastActive: "2026-03-20",
    status: "invited",
  },
];

export const TEAM_INVITATIONS: TeamInvitation[] = [
  {
    id: "inv-1",
    studioId: "studio-1",
    email: "neha.verma@gmail.com",
    role: "editor",
    status: "pending",
    invitedDate: "2026-03-25",
  },
  {
    id: "inv-2",
    studioId: "studio-2",
    email: "rahul.d@archivista.in",
    role: "viewer",
    status: "accepted",
    invitedDate: "2026-03-18",
  },
  {
    id: "inv-3",
    studioId: "studio-1",
    email: "amit.kapoor@outlook.com",
    role: "admin",
    status: "declined",
    invitedDate: "2026-03-10",
  },
];

export const PLATFORM_COURSES: PlatformCourse[] = [
  {
    id: "course-1",
    creatorStudioId: "studio-1",
    creatorName: "DesignCraft Studio",
    title: "Material Selection Masterclass for Indian Homes",
    description: "Learn to select the right materials for residential projects in India — from flooring to roofing — considering climate, budget, and durability.",
    thumbnail: "/images/courses/material-selection.jpg",
    category: "Materials & Specifications",
    level: "Intermediate",
    price: 2499,
    modules: [
      { title: "Understanding Indian Building Materials", duration: "45 min", description: "Overview of commonly used materials in Indian construction" },
      { title: "Flooring Options & Comparison", duration: "60 min", description: "Tiles, marble, granite, wood, vinyl — when to use what" },
      { title: "Wall Finishes & Cladding", duration: "50 min", description: "Paint, texture, stone cladding, WPC panels" },
      { title: "Roofing & Waterproofing", duration: "40 min", description: "Choosing the right waterproofing system for flat and sloped roofs" },
    ],
    enrolledCount: 342,
    rating: 4.6,
    status: "published",
    createdDate: "2025-09-15",
  },
  {
    id: "course-2",
    creatorStudioId: "studio-2",
    creatorName: "ArchiVista Designs",
    title: "Revit for Indian Architectural Practice",
    description: "A practical Revit BIM course tailored for Indian architectural offices, covering IS codes, NBC compliance, and local drawing conventions.",
    thumbnail: "/images/courses/revit-india.jpg",
    category: "BIM & Software",
    level: "Beginner",
    price: 3999,
    modules: [
      { title: "Revit Interface & Project Setup", duration: "55 min", description: "Setting up templates with Indian standards and units" },
      { title: "Modeling Walls, Doors & Windows", duration: "70 min", description: "Using Indian standard sizes and families" },
      { title: "Creating Floor Plans & Sections", duration: "65 min", description: "As per NBC and local authority requirements" },
      { title: "Scheduling & BOQ Generation", duration: "50 min", description: "Generating quantity takeoffs in Indian formats" },
      { title: "Rendering & Presentation", duration: "45 min", description: "Client-ready renders and walkthroughs" },
    ],
    enrolledCount: 578,
    rating: 4.8,
    status: "published",
    createdDate: "2025-07-20",
  },
  {
    id: "course-3",
    creatorStudioId: "studio-1",
    creatorName: "DesignCraft Studio",
    title: "Sustainable Design Strategies for Tropical India",
    description: "Explore passive cooling, daylighting, rainwater harvesting, and green building rating systems relevant to Indian tropical climates.",
    thumbnail: "/images/courses/sustainable-tropical.jpg",
    category: "Sustainability",
    level: "Advanced",
    price: 1999,
    modules: [
      { title: "Climate Analysis & Site Response", duration: "50 min", description: "Using Mahoney tables and climate data for Indian cities" },
      { title: "Passive Cooling Techniques", duration: "60 min", description: "Courtyards, jaalis, wind towers, and earth air tunnels" },
      { title: "Water Conservation & Harvesting", duration: "45 min", description: "Rainwater harvesting systems and greywater recycling" },
    ],
    enrolledCount: 215,
    rating: 4.4,
    status: "published",
    createdDate: "2026-01-10",
  },
  {
    id: "course-4",
    creatorStudioId: "studio-2",
    creatorName: "ArchiVista Designs",
    title: "Construction Site Management Essentials",
    description: "Practical guide to managing construction sites in India — from contractor coordination to quality checks and safety protocols.",
    thumbnail: "/images/courses/site-management.jpg",
    category: "Project Management",
    level: "Beginner",
    price: 1499,
    modules: [
      { title: "Site Setup & Mobilization", duration: "40 min", description: "Temporary structures, site office, and material storage" },
      { title: "Reading & Interpreting Drawings", duration: "55 min", description: "Working drawings, structural drawings, and MEP coordination" },
      { title: "Quality Control Checklists", duration: "45 min", description: "Stage-wise quality checks for RCC, masonry, and finishes" },
    ],
    enrolledCount: 456,
    rating: 4.5,
    status: "published",
    createdDate: "2025-11-05",
  },
  {
    id: "course-5",
    creatorStudioId: "studio-1",
    creatorName: "DesignCraft Studio",
    title: "Kitchen & Bathroom Design - Indian Standards",
    description: "Design functional kitchens and bathrooms for Indian homes with proper ergonomics, plumbing considerations, and material selections.",
    thumbnail: "/images/courses/kitchen-bath.jpg",
    category: "Interior Design",
    level: "Intermediate",
    price: 1799,
    modules: [
      { title: "Indian Kitchen Layouts & Ergonomics", duration: "50 min", description: "L-shape, U-shape, parallel — with Indian cooking workflow" },
      { title: "Material Selection for Wet Areas", duration: "45 min", description: "Countertops, backsplash, cabinet materials for Indian kitchens" },
      { title: "Bathroom Planning & Fixtures", duration: "55 min", description: "Indian vs western closets, shower areas, and accessibility" },
    ],
    enrolledCount: 289,
    rating: 4.3,
    status: "draft",
    createdDate: "2026-03-01",
  },
  {
    id: "course-6",
    creatorStudioId: "studio-2",
    creatorName: "ArchiVista Designs",
    title: "MEP Coordination for Architects",
    description: "Understand HVAC, plumbing, and electrical systems from an architect's perspective. Learn to coordinate with MEP consultants effectively.",
    thumbnail: "/images/courses/mep-coord.jpg",
    category: "MEP & Services",
    level: "Intermediate",
    price: 2999,
    modules: [
      { title: "HVAC Basics for Architects", duration: "60 min", description: "Split AC, VRV, central AC — space and duct requirements" },
      { title: "Plumbing System Design", duration: "50 min", description: "Water supply, drainage, and STP requirements per NBC" },
      { title: "Electrical Layout Coordination", duration: "55 min", description: "Load calculation, DB placement, and conduit routing" },
      { title: "Fire Safety & Life Safety", duration: "45 min", description: "NBC fire safety norms, sprinkler systems, and escape routes" },
    ],
    enrolledCount: 167,
    rating: 4.7,
    status: "published",
    createdDate: "2026-02-15",
  },
];

export const PLATFORM_JOBS: PlatformJob[] = [
  {
    id: "job-1",
    studioId: "studio-1",
    studioName: "DesignCraft Studio",
    studioAvatar: "/images/studios/designcraft.jpg",
    title: "Senior Architect - Residential Projects",
    description: "Looking for an experienced architect to lead luxury residential projects across Bengaluru. Must have strong design sensibility and client management skills.",
    location: "Bengaluru, Karnataka",
    type: "full-time",
    salary: "8-12 LPA",
    requirements: ["B.Arch with 5+ years experience", "COA registered", "Strong portfolio of residential work", "Proficiency in Revit and SketchUp"],
    skills: ["Revit", "SketchUp", "AutoCAD", "V-Ray", "Project Management"],
    applicants: 23,
    status: "active",
    postedDate: "2026-03-15",
    deadline: "2026-04-30",
  },
  {
    id: "job-2",
    studioId: "studio-2",
    studioName: "ArchiVista Designs",
    studioAvatar: "/images/studios/archivista.jpg",
    title: "Interior Designer - Commercial Spaces",
    description: "Join our Mumbai team to work on large-scale commercial interiors including offices, retail, and hospitality projects.",
    location: "Mumbai, Maharashtra",
    type: "full-time",
    salary: "6-9 LPA",
    requirements: ["B.Des / Diploma in Interior Design", "3+ years in commercial interiors", "Experience with FF&E specifications", "Knowledge of NBC codes"],
    skills: ["3ds Max", "AutoCAD", "Material Selection", "FF&E", "Space Planning"],
    applicants: 41,
    status: "active",
    postedDate: "2026-03-10",
    deadline: "2026-04-20",
  },
  {
    id: "job-3",
    studioId: "studio-1",
    studioName: "DesignCraft Studio",
    studioAvatar: "/images/studios/designcraft.jpg",
    title: "BIM Coordinator",
    description: "We need a BIM coordinator to manage Revit models, resolve clashes, and coordinate with structural and MEP consultants on multi-storey projects.",
    location: "Bengaluru, Karnataka",
    type: "full-time",
    salary: "5-7 LPA",
    requirements: ["B.Tech Civil / B.Arch", "2+ years BIM experience", "Proficiency in Revit and Navisworks", "Understanding of Indian construction practices"],
    skills: ["Revit", "Navisworks", "BIM 360", "Clash Detection", "LOD Management"],
    applicants: 15,
    status: "active",
    postedDate: "2026-03-20",
    deadline: "2026-04-25",
  },
  {
    id: "job-4",
    studioId: "studio-2",
    studioName: "ArchiVista Designs",
    studioAvatar: "/images/studios/archivista.jpg",
    title: "Freelance 3D Visualizer",
    description: "Looking for a skilled 3D visualizer for ongoing project renders. Must deliver photorealistic interior and exterior renders within tight deadlines.",
    location: "Remote",
    type: "freelance",
    salary: "3,000-8,000 per render",
    requirements: ["Strong portfolio of architectural renders", "Quick turnaround time", "Ability to interpret design intent from sketches"],
    skills: ["3ds Max", "V-Ray", "Corona Renderer", "Photoshop", "Lumion"],
    applicants: 67,
    status: "active",
    postedDate: "2026-03-05",
    deadline: "2026-04-15",
  },
  {
    id: "job-5",
    studioId: "studio-1",
    studioName: "DesignCraft Studio",
    studioAvatar: "/images/studios/designcraft.jpg",
    title: "Architecture Intern - Summer 2026",
    description: "6-month internship for final year B.Arch students. Work on live residential projects, site visits, and client presentations.",
    location: "Bengaluru, Karnataka",
    type: "internship",
    salary: "15,000/month",
    requirements: ["Currently pursuing B.Arch (4th or 5th year)", "Basic knowledge of AutoCAD and SketchUp", "Enthusiasm for sustainable design"],
    skills: ["AutoCAD", "SketchUp", "Hand Sketching", "Model Making"],
    applicants: 89,
    status: "active",
    postedDate: "2026-02-28",
    deadline: "2026-04-10",
  },
  {
    id: "job-6",
    studioId: "studio-2",
    studioName: "ArchiVista Designs",
    studioAvatar: "/images/studios/archivista.jpg",
    title: "MEP Design Engineer",
    description: "Looking for an MEP engineer to handle HVAC and plumbing design for commercial projects. Must coordinate with architecture and structure teams.",
    location: "Mumbai, Maharashtra",
    type: "full-time",
    salary: "7-10 LPA",
    requirements: ["B.Tech Mechanical / Electrical", "3+ years MEP design experience", "Knowledge of IS codes and NBC", "Experience with HAP or Carrier software"],
    skills: ["AutoCAD MEP", "Revit MEP", "HAP", "Load Calculation", "Duct Design"],
    applicants: 12,
    status: "active",
    postedDate: "2026-03-18",
    deadline: "2026-05-01",
  },
  {
    id: "job-7",
    studioId: "studio-1",
    studioName: "DesignCraft Studio",
    studioAvatar: "/images/studios/designcraft.jpg",
    title: "Site Architect - Contract Basis",
    description: "Need a site architect for a 12-month luxury villa project in Whitefield. Must be available for daily site supervision and contractor coordination.",
    location: "Bengaluru, Karnataka",
    type: "contract",
    salary: "60,000/month",
    requirements: ["B.Arch with 3+ years site experience", "Knowledge of RCC and finishing work", "Ability to read structural drawings", "Good communication with contractors"],
    skills: ["Site Supervision", "Quality Control", "AutoCAD", "Contractor Management", "BOQ"],
    applicants: 8,
    status: "active",
    postedDate: "2026-03-22",
    deadline: "2026-04-15",
  },
  {
    id: "job-8",
    studioId: "studio-2",
    studioName: "ArchiVista Designs",
    studioAvatar: "/images/studios/archivista.jpg",
    title: "Marketing & BD Executive - Architecture Firm",
    description: "Drive business development and marketing for a growing architecture practice. Handle social media, client acquisition, and proposal preparation.",
    location: "Mumbai, Maharashtra",
    type: "full-time",
    salary: "4-6 LPA",
    requirements: ["MBA / BBA in Marketing", "Interest in architecture and design industry", "Strong communication and presentation skills", "Social media management experience"],
    skills: ["Business Development", "Social Media", "Proposal Writing", "Client Relations", "Adobe InDesign"],
    applicants: 34,
    status: "closed",
    postedDate: "2026-02-10",
    deadline: "2026-03-15",
  },
];
