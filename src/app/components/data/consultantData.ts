// ============================================================================
// Consultant / Services Section — Mock Data
// Construction Materials Platform (Material Library)
// ============================================================================

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // lucide-react icon name
  consultantCount: number;
  image: string;
  color: string; // hex
}

export interface ConsultantPricing {
  type: "hourly" | "project" | "sqft";
  range: string;
}

export interface ConsultantLocation {
  city: string;
  state: string;
  pincode: string;
}

export interface ConsultantSocialLinks {
  linkedin?: string;
  website?: string;
  instagram?: string;
}

export interface ConsultantContactInfo {
  email: string;
  phone: string;
}

export interface ConsultantStats {
  completedProjects: number;
  activeProjects: number;
  totalClients: number;
  repeatClients: number;
}

export interface Consultant {
  id: string;
  name: string;
  slug: string;
  type: "individual" | "studio";
  tagline: string;
  description: string;
  categoryId: string;
  categoryName: string;
  avatar: string;
  coverImage: string;
  location: ConsultantLocation;
  rating: number;
  reviewCount: number;
  projectCount: number;
  yearsExp: number;
  teamSize: number;
  verified: boolean;
  featured: boolean;
  pricing: ConsultantPricing;
  specializations: string[];
  areasServing: string[];
  languages: string[];
  certifications: string[];
  socialLinks: ConsultantSocialLinks;
  contactInfo: ConsultantContactInfo;
  stats: ConsultantStats;
}

export interface Project {
  id: string;
  consultantId: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  location: string;
  area: string;
  budget: string;
  duration: string;
  completedDate: string;
  tags: string[];
  featured: boolean;
}

export interface TeamMember {
  id: string;
  consultantId: string;
  name: string;
  role: string;
  avatar: string;
  experience: string;
  specialization: string;
  education: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "contract" | "freelance";
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  categoryId: string;
  applicants: number;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  rating: number;
  enrolledCount: number;
  thumbnail: string;
  categoryId: string;
  modules: string[];
}

export interface Review {
  id: string;
  consultantId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle: string;
  helpful: number;
}

// ---------------------------------------------------------------------------
// Service Categories
// ---------------------------------------------------------------------------

export const serviceCategories: ServiceCategory[] = [
  {
    id: "architects",
    name: "Architects",
    slug: "architects",
    description:
      "Licensed architects specializing in residential, commercial, and institutional building design with expertise in planning approvals, sustainable design, and construction documentation.",
    icon: "PenTool",
    consultantCount: 1240,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
    color: "#2563EB",
  },
  {
    id: "interior-designers",
    name: "Interior Designers",
    slug: "interior-designers",
    description:
      "Creative professionals transforming interior spaces through space planning, material selection, furniture design, and project execution for homes, offices, and hospitality venues.",
    icon: "Palette",
    consultantCount: 2180,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
    color: "#7C3AED",
  },
  {
    id: "structural-engineers",
    name: "Structural Engineers",
    slug: "structural-engineers",
    description:
      "Certified structural engineers providing design, analysis, and consultancy for RCC, steel, and composite structures ensuring safety, economy, and compliance with IS codes.",
    icon: "Building2",
    consultantCount: 870,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    color: "#DC2626",
  },
  {
    id: "mep-consultants",
    name: "MEP Consultants",
    slug: "mep-consultants",
    description:
      "Mechanical, electrical, and plumbing engineering consultants designing HVAC, power distribution, fire-fighting, and sanitary systems for buildings of all scales.",
    icon: "Zap",
    consultantCount: 640,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    color: "#EA580C",
  },
  {
    id: "landscape-architects",
    name: "Landscape Architects",
    slug: "landscape-architects",
    description:
      "Specialists in outdoor space design including gardens, hardscapes, water features, recreational areas, and sustainable landscape solutions for residential and commercial projects.",
    icon: "TreePine",
    consultantCount: 410,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    color: "#16A34A",
  },
  {
    id: "project-management",
    name: "Project Management Consultants",
    slug: "project-management-consultants",
    description:
      "PMC firms and individuals managing construction projects end-to-end — scheduling, cost control, quality assurance, vendor coordination, and statutory compliance.",
    icon: "ClipboardCheck",
    consultantCount: 520,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    color: "#0891B2",
  },
  {
    id: "quantity-surveyors",
    name: "Quantity Surveyors",
    slug: "quantity-surveyors",
    description:
      "Cost management professionals providing BOQ preparation, rate analysis, tender evaluation, cost estimation, and contract administration for construction projects.",
    icon: "Calculator",
    consultantCount: 380,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    color: "#CA8A04",
  },
  {
    id: "vastu-consultants",
    name: "Vastu / Feng Shui Consultants",
    slug: "vastu-feng-shui-consultants",
    description:
      "Traditional design consultants integrating Vastu Shastra and Feng Shui principles into modern architecture for residential, commercial, and industrial projects.",
    icon: "Compass",
    consultantCount: 310,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    color: "#9333EA",
  },
  {
    id: "green-building",
    name: "Green Building Consultants",
    slug: "green-building-consultants",
    description:
      "Sustainability experts guiding projects through IGBC, GRIHA, LEED, and EDGE certifications with energy modelling, daylighting analysis, and green material selection.",
    icon: "Leaf",
    consultantCount: 260,
    image:
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=400&h=300&fit=crop",
    color: "#059669",
  },
  {
    id: "lighting-designers",
    name: "Lighting Designers",
    slug: "lighting-designers",
    description:
      "Architectural lighting professionals creating functional and aesthetic lighting schemes for facades, interiors, landscapes, and specialty environments.",
    icon: "Lightbulb",
    consultantCount: 190,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1432bc73025?w=400&h=300&fit=crop",
    color: "#F59E0B",
  },
  {
    id: "acoustics-consultants",
    name: "Acoustics Consultants",
    slug: "acoustics-consultants",
    description:
      "Sound engineering specialists designing acoustic treatments for auditoriums, studios, hospitals, offices, and residential buildings with noise control solutions.",
    icon: "AudioLines",
    consultantCount: 120,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
    color: "#6366F1",
  },
  {
    id: "fire-safety",
    name: "Fire Safety Consultants",
    slug: "fire-safety-consultants",
    description:
      "Fire protection engineers providing fire-risk assessment, NBC compliance, fire-fighting system design, evacuation planning, and fire audit services.",
    icon: "Flame",
    consultantCount: 210,
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop",
    color: "#EF4444",
  },
  {
    id: "bim-consultants",
    name: "Building Information Modeling (BIM)",
    slug: "bim-consultants",
    description:
      "BIM specialists offering 3D modelling, clash detection, 4D scheduling, 5D cost estimation, and digital-twin services using Revit, Tekla, and Navisworks.",
    icon: "Box",
    consultantCount: 340,
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&h=300&fit=crop",
    color: "#0EA5E9",
  },
  {
    id: "waterproofing",
    name: "Waterproofing Specialists",
    slug: "waterproofing-specialists",
    description:
      "Technical consultants providing waterproofing solutions for basements, terraces, wet areas, swimming pools, and underground structures using membrane and crystalline systems.",
    icon: "Droplets",
    consultantCount: 290,
    image:
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=300&fit=crop",
    color: "#0284C7",
  },
];

// ---------------------------------------------------------------------------
// Consultants
// ---------------------------------------------------------------------------

export const consultants: Consultant[] = [
  {
    id: "con-001",
    name: "Ar. Rajesh Menon & Associates",
    slug: "rajesh-menon-associates",
    type: "studio",
    tagline: "Crafting Spaces That Inspire — Since 2004",
    description:
      "Award-winning architecture studio based in Kochi with over two decades of experience designing residential villas, commercial complexes, and institutional campuses across Kerala and Karnataka. Known for blending tropical modernism with vernacular Kerala architecture, the studio has delivered 200+ projects ranging from compact urban homes to 5-lakh-sqft IT parks.",
    categoryId: "architects",
    categoryName: "Architects",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=400&fit=crop",
    location: { city: "Kochi", state: "Kerala", pincode: "682016" },
    rating: 4.8,
    reviewCount: 142,
    projectCount: 214,
    yearsExp: 22,
    teamSize: 18,
    verified: true,
    featured: true,
    pricing: { type: "sqft", range: "₹80 – ₹200 / sqft" },
    specializations: [
      "Tropical Modernism",
      "Sustainable Architecture",
      "Adaptive Reuse",
      "Heritage Conservation",
    ],
    areasServing: ["Kochi", "Trivandrum", "Kozhikode", "Bengaluru", "Mangalore"],
    languages: ["English", "Malayalam", "Hindi"],
    certifications: ["Council of Architecture (COA)", "IGBC AP", "GRIHA Evaluator"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/rajesh-menon-associates",
      website: "https://rajeshmenonarchitects.in",
      instagram: "https://instagram.com/rajeshmenonarch",
    },
    contactInfo: {
      email: "studio@rajeshmenonarchitects.in",
      phone: "+91 484 234 5678",
    },
    stats: {
      completedProjects: 198,
      activeProjects: 16,
      totalClients: 310,
      repeatClients: 87,
    },
  },
  {
    id: "con-002",
    name: "Priya Sharma Interiors",
    slug: "priya-sharma-interiors",
    type: "studio",
    tagline: "Designing Homes, Defining Lifestyles",
    description:
      "Boutique interior design studio led by Priya Sharma, specializing in luxury residential and high-end hospitality interiors. With a signature style that merges contemporary minimalism with warm Indian craftsmanship, the studio has designed over 150 residences, 12 boutique hotels, and 30+ corporate offices across Mumbai and Pune.",
    categoryId: "interior-designers",
    categoryName: "Interior Designers",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=400&fit=crop",
    location: { city: "Mumbai", state: "Maharashtra", pincode: "400050" },
    rating: 4.9,
    reviewCount: 198,
    projectCount: 192,
    yearsExp: 15,
    teamSize: 22,
    verified: true,
    featured: true,
    pricing: { type: "sqft", range: "₹1,200 – ₹3,500 / sqft" },
    specializations: [
      "Luxury Residential",
      "Boutique Hospitality",
      "Art Curation",
      "Custom Furniture Design",
    ],
    areasServing: ["Mumbai", "Pune", "Goa", "Ahmedabad"],
    languages: ["English", "Hindi", "Marathi"],
    certifications: ["IIID Member", "NCIDQ Certified", "WELL AP"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasharmainteriors",
      website: "https://priyasharmainteriors.com",
      instagram: "https://instagram.com/priyasharmainteriors",
    },
    contactInfo: {
      email: "hello@priyasharmainteriors.com",
      phone: "+91 22 2649 8700",
    },
    stats: {
      completedProjects: 178,
      activeProjects: 14,
      totalClients: 260,
      repeatClients: 72,
    },
  },
  {
    id: "con-003",
    name: "Dr. Venkatesh Rao",
    slug: "venkatesh-rao-structural",
    type: "individual",
    tagline: "Engineered for Safety, Optimised for Economy",
    description:
      "Structural engineering consultant with 28 years of experience in the design and analysis of multi-storey RCC and steel structures. Former chief engineer at L&T ECC, Dr. Rao now provides independent consultancy for residential towers, commercial high-rises, and industrial structures across South India. Expert in seismic design as per IS 1893 and wind load analysis.",
    categoryId: "structural-engineers",
    categoryName: "Structural Engineers",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1590644365607-1c5a789a476e?w=1200&h=400&fit=crop",
    location: { city: "Hyderabad", state: "Telangana", pincode: "500034" },
    rating: 4.9,
    reviewCount: 89,
    projectCount: 340,
    yearsExp: 28,
    teamSize: 5,
    verified: true,
    featured: true,
    pricing: { type: "project", range: "₹2,00,000 – ₹15,00,000" },
    specializations: [
      "High-Rise Structures",
      "Seismic Design",
      "Pre-Engineered Buildings",
      "Structural Audit",
    ],
    areasServing: ["Hyderabad", "Chennai", "Bengaluru", "Vijayawada"],
    languages: ["English", "Telugu", "Hindi", "Kannada"],
    certifications: [
      "Institution of Engineers (India) Fellow",
      "Ph.D. Structural Engineering (IIT Madras)",
      "Chartered Engineer",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/drvenkateshrao",
      website: "https://venkateshrao-structural.com",
    },
    contactInfo: {
      email: "venkatesh.rao@structural-consult.in",
      phone: "+91 40 2354 7890",
    },
    stats: {
      completedProjects: 326,
      activeProjects: 14,
      totalClients: 185,
      repeatClients: 64,
    },
  },
  {
    id: "con-004",
    name: "MechoElec Consultants Pvt. Ltd.",
    slug: "mechoelec-consultants",
    type: "studio",
    tagline: "Integrated MEP Solutions for the Built Environment",
    description:
      "Full-service MEP consulting firm with offices in Delhi NCR and Jaipur, delivering mechanical, electrical, plumbing, and fire-protection engineering services for commercial, healthcare, and data-centre projects. The firm has delivered MEP designs for over 45 million sqft of built-up area including hospitals, IT campuses, and metro stations.",
    categoryId: "mep-consultants",
    categoryName: "MEP Consultants",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=400&fit=crop",
    location: { city: "Gurugram", state: "Haryana", pincode: "122002" },
    rating: 4.6,
    reviewCount: 76,
    projectCount: 185,
    yearsExp: 18,
    teamSize: 45,
    verified: true,
    featured: false,
    pricing: { type: "sqft", range: "₹25 – ₹60 / sqft" },
    specializations: [
      "HVAC Design",
      "Data Centre Cooling",
      "Hospital MEP",
      "Fire Fighting Systems",
    ],
    areasServing: ["Delhi NCR", "Jaipur", "Chandigarh", "Lucknow"],
    languages: ["English", "Hindi"],
    certifications: ["ASHRAE Member", "ISHRAE Member", "ISO 9001:2015"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/mechoelec",
      website: "https://mechoelec.com",
    },
    contactInfo: {
      email: "info@mechoelec.com",
      phone: "+91 124 456 7890",
    },
    stats: {
      completedProjects: 172,
      activeProjects: 13,
      totalClients: 140,
      repeatClients: 48,
    },
  },
  {
    id: "con-005",
    name: "GreenScape Design Studio",
    slug: "greenscape-design-studio",
    type: "studio",
    tagline: "Where Nature Meets Design",
    description:
      "Landscape architecture practice known for ecologically sensitive designs ranging from urban rooftop gardens and township-level landscaping to resort masterplans and river-front development. The studio combines native planting palettes with contemporary hardscape design to create sustainable outdoor environments.",
    categoryId: "landscape-architects",
    categoryName: "Landscape Architects",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop",
    location: { city: "Bengaluru", state: "Karnataka", pincode: "560038" },
    rating: 4.7,
    reviewCount: 64,
    projectCount: 128,
    yearsExp: 12,
    teamSize: 14,
    verified: true,
    featured: true,
    pricing: { type: "sqft", range: "₹150 – ₹450 / sqft" },
    specializations: [
      "Terrace Gardens",
      "Township Landscaping",
      "Xeriscaping",
      "Water Feature Design",
    ],
    areasServing: ["Bengaluru", "Mysuru", "Chennai", "Hyderabad"],
    languages: ["English", "Kannada", "Tamil", "Hindi"],
    certifications: ["ISOLA Member", "IGBC AP", "Certified Arborist (ISA)"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/greenscape-studio",
      website: "https://greenscapedesign.in",
      instagram: "https://instagram.com/greenscapestudio",
    },
    contactInfo: {
      email: "design@greenscapedesign.in",
      phone: "+91 80 4123 6789",
    },
    stats: {
      completedProjects: 118,
      activeProjects: 10,
      totalClients: 95,
      repeatClients: 31,
    },
  },
  {
    id: "con-006",
    name: "Ar. Siddharth Kapoor",
    slug: "siddharth-kapoor-pmc",
    type: "individual",
    tagline: "Delivering Projects On Time, On Budget",
    description:
      "PMP-certified project management consultant with 20 years of experience managing large-scale residential, commercial, and infrastructure projects. Previously headed PMC operations at Cushman & Wakefield India. Specialises in owner's representation, RERA compliance monitoring, and construction risk management.",
    categoryId: "project-management",
    categoryName: "Project Management Consultants",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
    location: { city: "New Delhi", state: "Delhi", pincode: "110017" },
    rating: 4.7,
    reviewCount: 53,
    projectCount: 95,
    yearsExp: 20,
    teamSize: 8,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹5,00,000 – ₹25,00,000" },
    specializations: [
      "Owner's Representation",
      "RERA Compliance",
      "Risk Management",
      "Lean Construction",
    ],
    areasServing: ["Delhi NCR", "Jaipur", "Lucknow", "Dehradun"],
    languages: ["English", "Hindi", "Punjabi"],
    certifications: ["PMP (PMI)", "RICS Member", "CIOB Member"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/siddharthkapoorpmc",
      website: "https://kapoorpmc.com",
    },
    contactInfo: {
      email: "siddharth@kapoorpmc.com",
      phone: "+91 11 2634 5678",
    },
    stats: {
      completedProjects: 87,
      activeProjects: 8,
      totalClients: 62,
      repeatClients: 24,
    },
  },
  {
    id: "con-007",
    name: "CostWise Quantity Surveyors",
    slug: "costwise-qs",
    type: "studio",
    tagline: "Precision in Every Estimate",
    description:
      "Quantity surveying firm specialising in cost planning, BOQ preparation, and contract administration for construction projects. With a team of RICS-qualified surveyors, CostWise has managed cost control for projects worth over ₹8,000 crores including metro rail, hospitals, and luxury housing.",
    categoryId: "quantity-surveyors",
    categoryName: "Quantity Surveyors",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop",
    location: { city: "Chennai", state: "Tamil Nadu", pincode: "600018" },
    rating: 4.5,
    reviewCount: 41,
    projectCount: 220,
    yearsExp: 16,
    teamSize: 12,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹1,50,000 – ₹8,00,000" },
    specializations: [
      "BOQ Preparation",
      "Rate Analysis",
      "Contract Administration",
      "Value Engineering",
    ],
    areasServing: ["Chennai", "Coimbatore", "Bengaluru", "Hyderabad"],
    languages: ["English", "Tamil", "Hindi"],
    certifications: ["MRICS", "AIQS Member", "ISO 9001:2015"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/costwise-qs",
      website: "https://costwiseqs.in",
    },
    contactInfo: {
      email: "enquiry@costwiseqs.in",
      phone: "+91 44 2456 7890",
    },
    stats: {
      completedProjects: 208,
      activeProjects: 12,
      totalClients: 175,
      repeatClients: 53,
    },
  },
  {
    id: "con-008",
    name: "Pandit Arun Shastri",
    slug: "arun-shastri-vastu",
    type: "individual",
    tagline: "Ancient Wisdom for Modern Living",
    description:
      "Renowned Vastu Shastra consultant with 30+ years of practice, combining traditional Vastu principles with modern architectural requirements. Has advised on the planning of 500+ residential projects and 80+ commercial buildings. Known for practical, non-demolition Vastu remedies and integration with contemporary design.",
    categoryId: "vastu-consultants",
    categoryName: "Vastu / Feng Shui Consultants",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
    location: { city: "Jaipur", state: "Rajasthan", pincode: "302001" },
    rating: 4.6,
    reviewCount: 112,
    projectCount: 580,
    yearsExp: 32,
    teamSize: 3,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹15,000 – ₹2,50,000" },
    specializations: [
      "Residential Vastu",
      "Commercial Vastu",
      "Industrial Vastu",
      "Vastu Remedies Without Demolition",
    ],
    areasServing: ["Jaipur", "Delhi NCR", "Mumbai", "Pan India (Virtual)"],
    languages: ["Hindi", "English", "Sanskrit"],
    certifications: [
      "Vastu Visharad (Banaras Hindu University)",
      "International Vastu Academy Fellow",
    ],
    socialLinks: {
      website: "https://vastubyshastri.com",
      instagram: "https://instagram.com/panditarunshastri",
    },
    contactInfo: {
      email: "consult@vastubyshastri.com",
      phone: "+91 141 234 5678",
    },
    stats: {
      completedProjects: 564,
      activeProjects: 16,
      totalClients: 480,
      repeatClients: 120,
    },
  },
  {
    id: "con-009",
    name: "EcoHabitat Consultants",
    slug: "ecohabitat-consultants",
    type: "studio",
    tagline: "Building Green, Building Better",
    description:
      "India's leading green building consultancy with IGBC and GRIHA accredited professionals. EcoHabitat has facilitated 120+ green certifications across residential townships, commercial offices, and educational institutions. The team provides end-to-end services from pre-design energy modelling to post-occupancy evaluation.",
    categoryId: "green-building",
    categoryName: "Green Building Consultants",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=1200&h=400&fit=crop",
    location: { city: "Pune", state: "Maharashtra", pincode: "411001" },
    rating: 4.8,
    reviewCount: 58,
    projectCount: 135,
    yearsExp: 14,
    teamSize: 20,
    verified: true,
    featured: true,
    pricing: { type: "project", range: "₹3,00,000 – ₹20,00,000" },
    specializations: [
      "IGBC Certification",
      "GRIHA Rating",
      "Energy Modelling",
      "Net-Zero Design",
    ],
    areasServing: ["Pune", "Mumbai", "Bengaluru", "Hyderabad", "Pan India"],
    languages: ["English", "Hindi", "Marathi"],
    certifications: [
      "IGBC AP",
      "GRIHA Evaluator",
      "LEED AP BD+C",
      "EDGE Expert",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/ecohabitat-consultants",
      website: "https://ecohabitat.in",
      instagram: "https://instagram.com/ecohabitatindia",
    },
    contactInfo: {
      email: "green@ecohabitat.in",
      phone: "+91 20 2567 8901",
    },
    stats: {
      completedProjects: 122,
      activeProjects: 13,
      totalClients: 98,
      repeatClients: 35,
    },
  },
  {
    id: "con-010",
    name: "LuxLumen Lighting Design",
    slug: "luxlumen-lighting",
    type: "studio",
    tagline: "Illuminating Architecture, Evoking Emotion",
    description:
      "Award-winning architectural lighting design studio creating immersive lighting experiences for heritage monuments, luxury retail, hospitality, and residential projects. LuxLumen's work includes the lighting masterplan for a Rajasthan heritage hotel chain and facade lighting for several Mumbai high-rises.",
    categoryId: "lighting-designers",
    categoryName: "Lighting Designers",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1565814329452-e1432bc73025?w=1200&h=400&fit=crop",
    location: { city: "Mumbai", state: "Maharashtra", pincode: "400053" },
    rating: 4.8,
    reviewCount: 37,
    projectCount: 96,
    yearsExp: 11,
    teamSize: 9,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹2,50,000 – ₹18,00,000" },
    specializations: [
      "Facade Lighting",
      "Heritage Lighting",
      "Hospitality Lighting",
      "Circadian Lighting",
    ],
    areasServing: ["Mumbai", "Delhi NCR", "Goa", "Udaipur"],
    languages: ["English", "Hindi"],
    certifications: ["IALD Associate", "PLDA Member", "Dialux Certified"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/luxlumen",
      website: "https://luxlumen.in",
      instagram: "https://instagram.com/luxlumendesign",
    },
    contactInfo: {
      email: "studio@luxlumen.in",
      phone: "+91 22 2678 1234",
    },
    stats: {
      completedProjects: 88,
      activeProjects: 8,
      totalClients: 72,
      repeatClients: 22,
    },
  },
  {
    id: "con-011",
    name: "SoundSpace Acoustics",
    slug: "soundspace-acoustics",
    type: "studio",
    tagline: "Engineering Silence, Designing Sound",
    description:
      "Acoustics consultancy specialising in architectural acoustics, noise control, and audio-visual system design. The firm has designed acoustic environments for 40+ auditoriums, 15 recording studios, 25 corporate boardrooms, and noise mitigation for 60+ residential towers near highways and airports.",
    categoryId: "acoustics-consultants",
    categoryName: "Acoustics Consultants",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=400&fit=crop",
    location: { city: "Bengaluru", state: "Karnataka", pincode: "560001" },
    rating: 4.7,
    reviewCount: 29,
    projectCount: 145,
    yearsExp: 17,
    teamSize: 7,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹1,50,000 – ₹12,00,000" },
    specializations: [
      "Auditorium Acoustics",
      "Studio Design",
      "Noise Control",
      "AV Integration",
    ],
    areasServing: ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"],
    languages: ["English", "Kannada", "Hindi"],
    certifications: [
      "Institute of Acoustics (UK) Member",
      "AVIXA CTS",
      "Acoustical Society of India Member",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/soundspace-acoustics",
      website: "https://soundspaceacoustics.com",
    },
    contactInfo: {
      email: "info@soundspaceacoustics.com",
      phone: "+91 80 4567 8901",
    },
    stats: {
      completedProjects: 136,
      activeProjects: 9,
      totalClients: 110,
      repeatClients: 38,
    },
  },
  {
    id: "con-012",
    name: "FireShield Safety Consultants",
    slug: "fireshield-safety",
    type: "studio",
    tagline: "Protecting Lives, Safeguarding Assets",
    description:
      "Fire safety engineering firm providing fire risk assessment, NBC-compliant system design, fire audit, and emergency evacuation planning. The team has conducted fire audits for 300+ buildings and designed fire-fighting systems for hospitals, malls, warehouses, and high-rise residential towers.",
    categoryId: "fire-safety",
    categoryName: "Fire Safety Consultants",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=400&fit=crop",
    location: { city: "Ahmedabad", state: "Gujarat", pincode: "380009" },
    rating: 4.5,
    reviewCount: 45,
    projectCount: 310,
    yearsExp: 19,
    teamSize: 15,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹75,000 – ₹6,00,000" },
    specializations: [
      "Fire Risk Assessment",
      "NBC Compliance",
      "Fire Audit",
      "Evacuation Design",
    ],
    areasServing: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Mumbai"],
    languages: ["English", "Hindi", "Gujarati"],
    certifications: [
      "NFPA Member",
      "Fire Engineer (IFE, UK)",
      "National Safety Council Certified",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/fireshield-consultants",
      website: "https://fireshieldconsultants.in",
    },
    contactInfo: {
      email: "safety@fireshieldconsultants.in",
      phone: "+91 79 2657 8901",
    },
    stats: {
      completedProjects: 295,
      activeProjects: 15,
      totalClients: 210,
      repeatClients: 68,
    },
  },
  {
    id: "con-013",
    name: "BIMCraft Technologies",
    slug: "bimcraft-technologies",
    type: "studio",
    tagline: "Digital Precision for the Built World",
    description:
      "Technology-driven BIM consultancy offering LOD 100-500 modelling, MEP coordination, clash detection, 4D scheduling, and digital twin implementation. BIMCraft serves architects, developers, and contractors across India, having modelled over 30 million sqft of construction including metro rail stations and mixed-use towers.",
    categoryId: "bim-consultants",
    categoryName: "Building Information Modeling (BIM)",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&h=400&fit=crop",
    location: { city: "Noida", state: "Uttar Pradesh", pincode: "201301" },
    rating: 4.6,
    reviewCount: 52,
    projectCount: 168,
    yearsExp: 10,
    teamSize: 35,
    verified: true,
    featured: true,
    pricing: { type: "sqft", range: "₹8 – ₹25 / sqft" },
    specializations: [
      "Revit Modelling",
      "Clash Detection",
      "4D/5D BIM",
      "Digital Twins",
    ],
    areasServing: ["Delhi NCR", "Mumbai", "Bengaluru", "Pan India"],
    languages: ["English", "Hindi"],
    certifications: [
      "Autodesk Certified Professional",
      "buildingSMART Member",
      "ISO 19650 Compliant",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/bimcraft-tech",
      website: "https://bimcraft.tech",
    },
    contactInfo: {
      email: "projects@bimcraft.tech",
      phone: "+91 120 456 7890",
    },
    stats: {
      completedProjects: 155,
      activeProjects: 13,
      totalClients: 120,
      repeatClients: 42,
    },
  },
  {
    id: "con-014",
    name: "AquaGuard Waterproofing Consultants",
    slug: "aquaguard-waterproofing",
    type: "studio",
    tagline: "Zero Leakage, Guaranteed",
    description:
      "Waterproofing consultancy providing third-party design review, specification writing, and site supervision for all waterproofing applications. The team has resolved chronic leakage issues in 200+ buildings and provided waterproofing design for basements up to 30m below ground level, swimming pools, and water treatment plants.",
    categoryId: "waterproofing",
    categoryName: "Waterproofing Specialists",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1200&h=400&fit=crop",
    location: { city: "Chennai", state: "Tamil Nadu", pincode: "600034" },
    rating: 4.4,
    reviewCount: 67,
    projectCount: 245,
    yearsExp: 21,
    teamSize: 11,
    verified: true,
    featured: false,
    pricing: { type: "sqft", range: "₹5 – ₹18 / sqft" },
    specializations: [
      "Basement Waterproofing",
      "Terrace Waterproofing",
      "Swimming Pool Waterproofing",
      "Injection Grouting",
    ],
    areasServing: ["Chennai", "Bengaluru", "Hyderabad", "Coimbatore"],
    languages: ["English", "Tamil", "Hindi"],
    certifications: [
      "ICRI Certified",
      "Sika Approved Applicator",
      "FOSROC Certified",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/aquaguard-wp",
      website: "https://aquaguardwp.in",
    },
    contactInfo: {
      email: "consult@aquaguardwp.in",
      phone: "+91 44 2890 1234",
    },
    stats: {
      completedProjects: 232,
      activeProjects: 13,
      totalClients: 180,
      repeatClients: 55,
    },
  },
  {
    id: "con-015",
    name: "Ar. Nandini Deshmukh",
    slug: "nandini-deshmukh-architect",
    type: "individual",
    tagline: "Contextual Design for Contemporary India",
    description:
      "Young award-winning architect recognised by the Indian Institute of Architects for her work in affordable housing and community architecture. Nandini's practice focuses on socially responsive design, using local materials and labour to create contextual, low-carbon buildings. Her 60-unit affordable housing project in Nagpur won the A+D Spectrum Award 2024.",
    categoryId: "architects",
    categoryName: "Architects",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1448630360428-65456659c4f5?w=1200&h=400&fit=crop",
    location: { city: "Nagpur", state: "Maharashtra", pincode: "440010" },
    rating: 4.7,
    reviewCount: 38,
    projectCount: 45,
    yearsExp: 8,
    teamSize: 6,
    verified: true,
    featured: false,
    pricing: { type: "sqft", range: "₹50 – ₹120 / sqft" },
    specializations: [
      "Affordable Housing",
      "Community Architecture",
      "Sustainable Design",
      "Adaptive Reuse",
    ],
    areasServing: ["Nagpur", "Pune", "Nashik", "Aurangabad"],
    languages: ["English", "Hindi", "Marathi"],
    certifications: ["COA Licensed", "GRIHA Trainer", "Earthen Architecture Specialist"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/nandinideshmukh",
      website: "https://nandinideshmukh.com",
      instagram: "https://instagram.com/nandini.arch",
    },
    contactInfo: {
      email: "studio@nandinideshmukh.com",
      phone: "+91 712 234 5678",
    },
    stats: {
      completedProjects: 41,
      activeProjects: 4,
      totalClients: 38,
      repeatClients: 12,
    },
  },
  {
    id: "con-016",
    name: "Ankit Jain Interiors",
    slug: "ankit-jain-interiors",
    type: "individual",
    tagline: "Functional Elegance, Thoughtful Design",
    description:
      "Interior designer specialising in compact urban homes, co-working spaces, and retail interiors in Bangalore. Known for space-efficient designs that maximise storage and functionality in apartments under 1,200 sqft. Ankit's approach combines Scandinavian minimalism with warm Indian textures.",
    categoryId: "interior-designers",
    categoryName: "Interior Designers",
    avatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop",
    location: { city: "Bengaluru", state: "Karnataka", pincode: "560034" },
    rating: 4.6,
    reviewCount: 85,
    projectCount: 110,
    yearsExp: 9,
    teamSize: 7,
    verified: true,
    featured: false,
    pricing: { type: "sqft", range: "₹800 – ₹2,000 / sqft" },
    specializations: [
      "Compact Apartments",
      "Co-Working Spaces",
      "Retail Interiors",
      "Modular Kitchens",
    ],
    areasServing: ["Bengaluru", "Mysuru"],
    languages: ["English", "Hindi", "Kannada"],
    certifications: ["IIID Member", "Autodesk Certified"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/ankitjaininteriors",
      website: "https://ankitjaininteriors.in",
      instagram: "https://instagram.com/ankitjain.interiors",
    },
    contactInfo: {
      email: "hello@ankitjaininteriors.in",
      phone: "+91 80 2567 3456",
    },
    stats: {
      completedProjects: 102,
      activeProjects: 8,
      totalClients: 95,
      repeatClients: 28,
    },
  },
  {
    id: "con-017",
    name: "Tanvi Mehta Structural Consulting",
    slug: "tanvi-mehta-structural",
    type: "individual",
    tagline: "Smart Structures, Lean Design",
    description:
      "Structural consultant with deep expertise in steel structures, tensile fabric structures, and long-span roof systems. Tanvi has engineered canopy structures for stadiums, exhibition halls, and airport terminals. She combines advanced FEA modelling with practical construction know-how to deliver buildable, efficient designs.",
    categoryId: "structural-engineers",
    categoryName: "Structural Engineers",
    avatar:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=400&fit=crop",
    location: { city: "Pune", state: "Maharashtra", pincode: "411038" },
    rating: 4.8,
    reviewCount: 34,
    projectCount: 78,
    yearsExp: 13,
    teamSize: 4,
    verified: true,
    featured: false,
    pricing: { type: "project", range: "₹1,50,000 – ₹10,00,000" },
    specializations: [
      "Steel Structures",
      "Tensile Structures",
      "Long-Span Roofs",
      "FEA Analysis",
    ],
    areasServing: ["Pune", "Mumbai", "Nashik", "Goa"],
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    certifications: [
      "Institution of Structural Engineers (IStructE)",
      "M.Tech Structural (IIT Bombay)",
      "STAAD Pro Certified",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/tanvimehta-structural",
      website: "https://tanvimehta-structures.com",
    },
    contactInfo: {
      email: "tanvi@tanvimehta-structures.com",
      phone: "+91 20 2789 4567",
    },
    stats: {
      completedProjects: 72,
      activeProjects: 6,
      totalClients: 58,
      repeatClients: 19,
    },
  },
  {
    id: "con-018",
    name: "UrbanNest Design Collective",
    slug: "urbannest-design",
    type: "studio",
    tagline: "Architecture + Interiors Under One Roof",
    description:
      "Multidisciplinary design collective offering integrated architecture and interior design services. Founded by three IIT Kharagpur alumni, UrbanNest is known for its data-driven approach to residential design — using post-occupancy surveys and spatial analytics to optimise layouts for Indian families. The studio has designed 80+ apartment buildings and 200+ individual homes.",
    categoryId: "architects",
    categoryName: "Architects",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=400&fit=crop",
    location: { city: "Kolkata", state: "West Bengal", pincode: "700019" },
    rating: 4.5,
    reviewCount: 62,
    projectCount: 284,
    yearsExp: 14,
    teamSize: 28,
    verified: true,
    featured: false,
    pricing: { type: "sqft", range: "₹60 – ₹150 / sqft" },
    specializations: [
      "Apartment Design",
      "Township Planning",
      "Data-Driven Design",
      "Mixed-Use Developments",
    ],
    areasServing: ["Kolkata", "Siliguri", "Bhubaneswar", "Ranchi"],
    languages: ["English", "Bengali", "Hindi"],
    certifications: ["COA Licensed", "IGBC AP", "RERA Registered"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/urbannest-design",
      website: "https://urbannest.co.in",
      instagram: "https://instagram.com/urbannestdesign",
    },
    contactInfo: {
      email: "design@urbannest.co.in",
      phone: "+91 33 2456 7890",
    },
    stats: {
      completedProjects: 268,
      activeProjects: 16,
      totalClients: 195,
      repeatClients: 62,
    },
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "proj-001",
    consultantId: "con-001",
    title: "Vembanad Lakehouse Retreat",
    description:
      "A 4,200 sqft luxury lakeside villa in Kumarakom blending traditional Kerala Nalukettu architecture with contemporary glass and steel elements. The design maximises cross-ventilation and lake views while using locally sourced laterite and reclaimed teak.",
    category: "Residential",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    location: "Kumarakom, Kerala",
    area: "4,200 sqft",
    budget: "₹2.8 Cr",
    duration: "18 months",
    completedDate: "2024-06-15",
    tags: ["Tropical Architecture", "Lakeside", "Laterite", "Sustainable"],
    featured: true,
  },
  {
    id: "proj-002",
    consultantId: "con-002",
    title: "Sapphire Penthouse — Worli Sea Face",
    description:
      "Complete interior design of a 6,500 sqft penthouse in South Mumbai featuring curated art pieces, bespoke Italian marble flooring, custom walnut joinery, and a rooftop infinity bar with Arabian Sea views.",
    category: "Luxury Residential",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop",
    ],
    location: "Worli, Mumbai",
    area: "6,500 sqft",
    budget: "₹4.5 Cr",
    duration: "14 months",
    completedDate: "2025-01-20",
    tags: ["Penthouse", "Luxury", "Art Curation", "Sea View"],
    featured: true,
  },
  {
    id: "proj-003",
    consultantId: "con-003",
    title: "Prestige Tower — 32-Storey Residential",
    description:
      "Structural design and analysis for a G+32 RCC residential tower in Hyderabad with transfer-plate podium, 2 basement levels, and seismic Zone II compliance. Optimised column grid to maximise carpet area while reducing steel consumption by 12%.",
    category: "High-Rise Structural",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    ],
    location: "Gachibowli, Hyderabad",
    area: "5,40,000 sqft",
    budget: "₹180 Cr (overall project)",
    duration: "36 months",
    completedDate: "2024-11-30",
    tags: ["High-Rise", "RCC", "Transfer Plate", "Seismic Design"],
    featured: true,
  },
  {
    id: "proj-004",
    consultantId: "con-004",
    title: "Medanta Super-Speciality Hospital MEP",
    description:
      "Complete MEP services design for a 350-bed super-speciality hospital including medical gas pipeline, clean-room HVAC for 14 operating theatres, 100% DG backup, and a 500 KLD STP with treated water recycling.",
    category: "Healthcare MEP",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop",
    ],
    location: "Gurugram, Haryana",
    area: "3,80,000 sqft",
    budget: "₹42 Cr (MEP works)",
    duration: "28 months",
    completedDate: "2024-09-10",
    tags: ["Hospital", "HVAC", "Clean Room", "Medical Gas"],
    featured: false,
  },
  {
    id: "proj-005",
    consultantId: "con-005",
    title: "Prestige Lakeside Habitat — Township Landscape",
    description:
      "Masterplan landscape design for a 120-acre integrated township including 8 themed gardens, 2.5 km jogging trail, amphitheatre, butterfly garden, and a constructed wetland for stormwater management.",
    category: "Township Landscape",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    ],
    location: "Varthur, Bengaluru",
    area: "120 acres",
    budget: "₹18 Cr (landscape works)",
    duration: "24 months",
    completedDate: "2024-03-25",
    tags: ["Township", "Wetland", "Jogging Trail", "Native Planting"],
    featured: true,
  },
  {
    id: "proj-006",
    consultantId: "con-009",
    title: "Infosys Pune Campus — IGBC Platinum",
    description:
      "Green building consultancy for a 12-lakh-sqft IT campus achieving IGBC Platinum rating with 40% energy savings, 55% water recycling, 80% waste diversion, and 35% renewable energy through rooftop solar.",
    category: "Green Certification",
    images: [
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
    ],
    location: "Hinjewadi, Pune",
    area: "12,00,000 sqft",
    budget: "₹8.5 Cr (green consultancy + implementation)",
    duration: "30 months",
    completedDate: "2024-07-18",
    tags: ["IGBC Platinum", "IT Campus", "Solar", "Water Recycling"],
    featured: true,
  },
  {
    id: "proj-007",
    consultantId: "con-010",
    title: "Taj Falaknuma Palace — Heritage Lighting",
    description:
      "Restoration and redesign of interior and exterior lighting for the iconic heritage hotel. The project balanced heritage conservation with modern LED technology, using warm 2700K fixtures concealed within original chandeliers and sconces.",
    category: "Heritage Lighting",
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1432bc73025?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    location: "Hyderabad, Telangana",
    area: "32,000 sqft (lit area)",
    budget: "₹3.2 Cr",
    duration: "10 months",
    completedDate: "2025-02-14",
    tags: ["Heritage", "Hotel", "LED Retrofit", "Conservation"],
    featured: false,
  },
  {
    id: "proj-008",
    consultantId: "con-013",
    title: "Namma Metro Phase 3 — BIM Coordination",
    description:
      "Full BIM modelling and MEP clash detection for 8 underground metro stations. Identified and resolved 2,400+ clashes prior to construction, reducing site rework by an estimated 18% and saving ₹12 Cr in change-order costs.",
    category: "Infrastructure BIM",
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    location: "Bengaluru, Karnataka",
    area: "8 stations",
    budget: "₹4.8 Cr (BIM scope)",
    duration: "20 months",
    completedDate: "2025-03-01",
    tags: ["Metro", "Clash Detection", "Underground", "LOD 400"],
    featured: true,
  },
  {
    id: "proj-009",
    consultantId: "con-014",
    title: "Phoenix MarketCity Basement — Waterproofing Remediation",
    description:
      "Diagnosed and resolved chronic water seepage in a 3-level underground basement parking spanning 1,80,000 sqft. Deployed crystalline waterproofing, PU injection grouting, and external drainage mat system.",
    category: "Waterproofing",
    images: [
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    location: "Velachery, Chennai",
    area: "1,80,000 sqft",
    budget: "₹2.1 Cr",
    duration: "6 months",
    completedDate: "2024-12-20",
    tags: ["Basement", "Injection Grouting", "Crystalline", "Remediation"],
    featured: false,
  },
  {
    id: "proj-010",
    consultantId: "con-015",
    title: "Prayag Affordable Housing — 60 Units",
    description:
      "Design of a 60-unit affordable housing complex using stabilised rammed-earth walls, filler-slab roofs, and passive cooling strategies. The project achieved 40% cost savings over conventional RCC construction while providing thermally comfortable interiors.",
    category: "Affordable Housing",
    images: [
      "https://images.unsplash.com/photo-1448630360428-65456659c4f5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    location: "Nagpur, Maharashtra",
    area: "45,000 sqft",
    budget: "₹8.5 Cr",
    duration: "20 months",
    completedDate: "2024-08-30",
    tags: ["Affordable", "Rammed Earth", "Filler Slab", "Passive Cooling"],
    featured: true,
  },
  {
    id: "proj-011",
    consultantId: "con-016",
    title: "WeWork Galaxy — Co-Working Interiors",
    description:
      "Interior fit-out design for a 22,000 sqft co-working space in Bengaluru featuring biophilic design elements, phone booths, collaboration zones, and a cafe. Designed for 280 seats with flexible hot-desking layouts.",
    category: "Commercial Interiors",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    ],
    location: "Residency Road, Bengaluru",
    area: "22,000 sqft",
    budget: "₹2.8 Cr",
    duration: "5 months",
    completedDate: "2025-01-10",
    tags: ["Co-Working", "Biophilic", "Flexible Layout", "Cafe"],
    featured: false,
  },
  {
    id: "proj-012",
    consultantId: "con-011",
    title: "NCPA Tata Theatre — Acoustic Retrofit",
    description:
      "Acoustic analysis and treatment upgrade for the 1,000-seat Tata Theatre. Installed custom diffuser panels, bass traps, and adjustable acoustic curtains to achieve RT60 of 1.8s for orchestral performances and 1.2s for speech events.",
    category: "Auditorium Acoustics",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
    ],
    location: "Nariman Point, Mumbai",
    area: "18,000 sqft",
    budget: "₹4.5 Cr",
    duration: "8 months",
    completedDate: "2024-10-15",
    tags: ["Auditorium", "RT60", "Diffuser Panels", "Variable Acoustics"],
    featured: false,
  },
  {
    id: "proj-013",
    consultantId: "con-012",
    title: "DLF CyberCity — Fire Safety Audit & Upgrade",
    description:
      "Comprehensive fire safety audit and system upgrade for a 15-lakh-sqft IT park. Redesigned the fire detection and suppression systems, added pressurised stairwells, and conducted evacuation drills for 8,000 occupants.",
    category: "Fire Safety",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    ],
    location: "Gurugram, Haryana",
    area: "15,00,000 sqft",
    budget: "₹6.2 Cr",
    duration: "12 months",
    completedDate: "2024-05-20",
    tags: ["Fire Audit", "Sprinkler System", "Evacuation", "IT Park"],
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  {
    id: "tm-001",
    consultantId: "con-001",
    name: "Ar. Rajesh Menon",
    role: "Principal Architect & Founder",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    experience: "22 years",
    specialization: "Tropical Modern Architecture",
    education: "B.Arch (NIT Calicut), M.Arch (CEPT Ahmedabad)",
  },
  {
    id: "tm-002",
    consultantId: "con-001",
    name: "Ar. Meera Nair",
    role: "Design Director",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    experience: "16 years",
    specialization: "Hospitality & Resort Design",
    education: "B.Arch (College of Engineering Trivandrum)",
  },
  {
    id: "tm-003",
    consultantId: "con-001",
    name: "Ar. Arjun Pillai",
    role: "Senior Architect",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    experience: "10 years",
    specialization: "Sustainable Design & GRIHA",
    education: "B.Arch (TKM College of Engineering), GRIHA Evaluator",
  },
  {
    id: "tm-004",
    consultantId: "con-002",
    name: "Priya Sharma",
    role: "Founder & Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    experience: "15 years",
    specialization: "Luxury Residential & Art Curation",
    education: "B.Des (NID Ahmedabad), Interior Design (Parsons, New York)",
  },
  {
    id: "tm-005",
    consultantId: "con-002",
    name: "Rohan Deshpande",
    role: "Senior Interior Designer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    experience: "11 years",
    specialization: "Hospitality & Restaurant Design",
    education: "B.Des Interior (JJ School of Art, Mumbai)",
  },
  {
    id: "tm-006",
    consultantId: "con-002",
    name: "Aisha Khan",
    role: "Material Specialist & Procurement Lead",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    experience: "8 years",
    specialization: "Natural Stone, Custom Furniture",
    education: "B.Des (Pearl Academy, Delhi)",
  },
  {
    id: "tm-007",
    consultantId: "con-004",
    name: "Er. Suresh Bansal",
    role: "Managing Director",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    experience: "18 years",
    specialization: "HVAC System Design",
    education: "B.Tech Mechanical (IIT Delhi), M.Tech (IIT Roorkee)",
  },
  {
    id: "tm-008",
    consultantId: "con-004",
    name: "Er. Kavitha Rangan",
    role: "Head — Electrical Division",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    experience: "14 years",
    specialization: "Power Distribution & HT Systems",
    education: "B.Tech EEE (NIT Trichy)",
  },
  {
    id: "tm-009",
    consultantId: "con-005",
    name: "Ar. Deepa Krishnamurthy",
    role: "Principal Landscape Architect",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    experience: "12 years",
    specialization: "Ecological Landscape Design",
    education: "B.Arch (SPA Delhi), MLA (University of Melbourne)",
  },
  {
    id: "tm-010",
    consultantId: "con-009",
    name: "Ar. Sneha Patil",
    role: "Founder & Lead Consultant",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    experience: "14 years",
    specialization: "IGBC & LEED Certifications",
    education: "B.Arch (COEP Pune), MS Sustainable Design (AA London)",
  },
  {
    id: "tm-011",
    consultantId: "con-009",
    name: "Er. Rahul Deshpande",
    role: "Energy Modelling Specialist",
    avatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop",
    experience: "9 years",
    specialization: "eQUEST, DesignBuilder, EnergyPlus",
    education: "B.Tech Mechanical (VJTI Mumbai)",
  },
  {
    id: "tm-012",
    consultantId: "con-013",
    name: "Er. Amit Kumar Singh",
    role: "Founder & BIM Director",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop",
    experience: "10 years",
    specialization: "Revit Architecture & MEP Coordination",
    education: "B.Tech Civil (IIT Kharagpur)",
  },
  {
    id: "tm-013",
    consultantId: "con-013",
    name: "Neha Agarwal",
    role: "Lead BIM Modeller",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&h=200&fit=crop",
    experience: "7 years",
    specialization: "Tekla Structures & Navisworks",
    education: "B.Tech Civil (NIT Warangal)",
  },
  {
    id: "tm-014",
    consultantId: "con-018",
    name: "Ar. Aniket Ghosh",
    role: "Co-Founder & Design Lead",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    experience: "14 years",
    specialization: "Residential Township Planning",
    education: "B.Arch (IIT Kharagpur), Urban Design (SPA Delhi)",
  },
  {
    id: "tm-015",
    consultantId: "con-018",
    name: "Ar. Ritika Sen",
    role: "Co-Founder & Research Head",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    experience: "14 years",
    specialization: "Post-Occupancy Evaluation & Data Analytics",
    education: "B.Arch (IIT Kharagpur), M.Arch (MIT)",
  },
  {
    id: "tm-016",
    consultantId: "con-012",
    name: "Er. Harsh Patel",
    role: "Founder & Chief Fire Engineer",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
    experience: "19 years",
    specialization: "Fire Risk Assessment & NBC Compliance",
    education: "B.E. Fire Engineering (Nagpur University), IFE (UK) Chartered",
  },
];

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export const jobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Architect — Residential Projects",
    company: "Ar. Rajesh Menon & Associates",
    location: "Kochi, Kerala",
    type: "full-time",
    salary: "₹12,00,000 – ₹18,00,000 / year",
    description:
      "Looking for a Senior Architect with 6+ years of experience in residential project design and execution. Must be proficient in Revit, AutoCAD, and SketchUp with hands-on site experience.",
    requirements: [
      "B.Arch from a recognised university, COA registered",
      "6+ years of residential design experience",
      "Proficiency in Revit, AutoCAD, SketchUp, and Lumion",
      "Experience with NBC and Kerala municipal building rules",
      "Excellent communication in English and Malayalam",
    ],
    postedDate: "2026-03-15",
    categoryId: "architects",
    applicants: 42,
  },
  {
    id: "job-002",
    title: "Interior Designer — Luxury Residential",
    company: "Priya Sharma Interiors",
    location: "Mumbai, Maharashtra",
    type: "full-time",
    salary: "₹8,00,000 – ₹14,00,000 / year",
    description:
      "Join our design team to work on high-end residential projects in Mumbai and Pune. You will handle concept development, material selection, and vendor coordination for luxury apartments and penthouses.",
    requirements: [
      "B.Des / Diploma in Interior Design from IIID-recognised institute",
      "4+ years of experience in luxury residential interiors",
      "Proficiency in AutoCAD, 3ds Max / V-Ray, and Adobe Creative Suite",
      "Knowledge of Italian marble, premium hardware brands, and imported materials",
      "Portfolio showcasing completed luxury residential projects",
    ],
    postedDate: "2026-03-20",
    categoryId: "interior-designers",
    applicants: 78,
  },
  {
    id: "job-003",
    title: "Structural Design Engineer",
    company: "Dr. Venkatesh Rao — Structural Consulting",
    location: "Hyderabad, Telangana",
    type: "full-time",
    salary: "₹7,00,000 – ₹11,00,000 / year",
    description:
      "Seeking a structural engineer to assist with the design and analysis of multi-storey RCC and steel structures using ETABS and STAAD Pro. Will work on high-rise residential towers and commercial complexes.",
    requirements: [
      "M.Tech in Structural Engineering preferred",
      "3+ years of experience in structural design",
      "Proficiency in ETABS, STAAD Pro, and SAFE",
      "Strong understanding of IS 456, IS 1893, IS 800",
      "Experience with high-rise structures above G+15",
    ],
    postedDate: "2026-03-10",
    categoryId: "structural-engineers",
    applicants: 35,
  },
  {
    id: "job-004",
    title: "HVAC Design Engineer",
    company: "MechoElec Consultants Pvt. Ltd.",
    location: "Gurugram, Haryana",
    type: "full-time",
    salary: "₹6,00,000 – ₹10,00,000 / year",
    description:
      "Design HVAC systems for commercial, healthcare, and data-centre projects. Responsibilities include heat-load calculations, duct sizing, equipment selection, and coordination with architectural and structural teams.",
    requirements: [
      "B.Tech / B.E. in Mechanical Engineering",
      "2+ years of HVAC design experience",
      "Proficiency in HAP, Revit MEP, and AutoCAD MEP",
      "Knowledge of ASHRAE standards and NBC Part 8",
      "ISHRAE membership preferred",
    ],
    postedDate: "2026-03-18",
    categoryId: "mep-consultants",
    applicants: 28,
  },
  {
    id: "job-005",
    title: "BIM Coordinator — Infrastructure",
    company: "BIMCraft Technologies",
    location: "Noida, Uttar Pradesh",
    type: "full-time",
    salary: "₹9,00,000 – ₹15,00,000 / year",
    description:
      "Lead BIM coordination for metro rail and infrastructure projects. Manage federated models, run clash detection, and generate construction-ready drawings from BIM models.",
    requirements: [
      "B.Tech Civil / Architecture background",
      "4+ years of BIM coordination experience",
      "Expert in Revit, Navisworks, BIM 360, and Dynamo",
      "Experience with LOD 300-400 modelling",
      "Understanding of ISO 19650 BIM standards",
    ],
    postedDate: "2026-03-22",
    categoryId: "bim-consultants",
    applicants: 19,
  },
  {
    id: "job-006",
    title: "Landscape Designer",
    company: "GreenScape Design Studio",
    location: "Bengaluru, Karnataka",
    type: "full-time",
    salary: "₹5,50,000 – ₹8,50,000 / year",
    description:
      "Join our landscape team to design gardens, parks, and outdoor spaces for residential and commercial projects. Must have strong plant knowledge for South Indian climate zones.",
    requirements: [
      "B.Arch / B.Sc Horticulture / Diploma in Landscape Design",
      "2+ years of landscape design experience",
      "Proficiency in AutoCAD, SketchUp, and Lumion",
      "Knowledge of native South Indian plant species",
      "Experience with irrigation system design",
    ],
    postedDate: "2026-03-25",
    categoryId: "landscape-architects",
    applicants: 24,
  },
  {
    id: "job-007",
    title: "Green Building Consultant — IGBC Projects",
    company: "EcoHabitat Consultants",
    location: "Pune, Maharashtra",
    type: "full-time",
    salary: "₹8,00,000 – ₹13,00,000 / year",
    description:
      "Drive IGBC/GRIHA certification for commercial and residential projects. Conduct energy modelling, daylight simulation, and lifecycle assessment. Coordinate with design teams to integrate sustainable strategies.",
    requirements: [
      "B.Arch / B.Tech with IGBC AP or LEED AP certification",
      "3+ years in green building consultancy",
      "Proficiency in eQUEST, DesignBuilder, or EnergyPlus",
      "Experience with IGBC Green Homes / New Buildings rating",
      "Excellent report writing and client presentation skills",
    ],
    postedDate: "2026-03-12",
    categoryId: "green-building",
    applicants: 16,
  },
  {
    id: "job-008",
    title: "Freelance Vastu Consultant",
    company: "Multiple Clients via MaterialKH",
    location: "Remote / Pan India",
    type: "freelance",
    salary: "₹5,000 – ₹25,000 / consultation",
    description:
      "Provide Vastu consultancy for residential and commercial projects through our platform. Consultations can be virtual or on-site. Must be able to provide practical, non-demolition remedies.",
    requirements: [
      "Recognised Vastu Shastra certification",
      "5+ years of Vastu consultancy experience",
      "Ability to read architectural drawings",
      "Comfortable with video consultations",
      "Positive client reviews or references",
    ],
    postedDate: "2026-03-28",
    categoryId: "vastu-consultants",
    applicants: 31,
  },
  {
    id: "job-009",
    title: "Quantity Surveyor — Contract Administration",
    company: "CostWise Quantity Surveyors",
    location: "Chennai, Tamil Nadu",
    type: "full-time",
    salary: "₹6,50,000 – ₹10,00,000 / year",
    description:
      "Handle BOQ preparation, rate analysis, running-account bill verification, and contract administration for large-scale residential and infrastructure projects.",
    requirements: [
      "B.E. Civil / Diploma with QS specialisation",
      "3+ years of quantity surveying experience",
      "Proficiency in CostX, Cubit, or Excel-based estimation",
      "Knowledge of CPWD/MoRTH schedule of rates",
      "RICS aspirant status preferred",
    ],
    postedDate: "2026-03-08",
    categoryId: "quantity-surveyors",
    applicants: 22,
  },
  {
    id: "job-010",
    title: "Fire Safety Engineer — Contract Basis",
    company: "FireShield Safety Consultants",
    location: "Ahmedabad, Gujarat",
    type: "contract",
    salary: "₹50,000 – ₹80,000 / month",
    description:
      "6-month contract for fire audit and system design review of 10 commercial buildings. Conduct NBC compliance checks, prepare fire safety reports, and recommend remedial measures.",
    requirements: [
      "B.E. Fire / Mechanical / Electrical Engineering",
      "2+ years in fire safety consultancy",
      "Thorough knowledge of NBC 2016 Part 4",
      "Experience with AutoSPRINK or equivalent design software",
      "Fire Engineer (IFE) qualification preferred",
    ],
    postedDate: "2026-03-30",
    categoryId: "fire-safety",
    applicants: 14,
  },
  {
    id: "job-011",
    title: "Junior Architect — Affordable Housing",
    company: "Ar. Nandini Deshmukh",
    location: "Nagpur, Maharashtra",
    type: "full-time",
    salary: "₹4,00,000 – ₹6,00,000 / year",
    description:
      "Work on community-focused affordable housing projects using alternative building materials like rammed earth and filler slabs. Great opportunity for architects passionate about social impact.",
    requirements: [
      "B.Arch from a recognised university",
      "0-2 years of experience (fresh graduates welcome)",
      "Interest in sustainable and low-cost construction",
      "Proficiency in AutoCAD and SketchUp",
      "Willingness to spend time on construction sites",
    ],
    postedDate: "2026-03-19",
    categoryId: "architects",
    applicants: 56,
  },
];

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

export const courses: Course[] = [
  {
    id: "course-001",
    title: "Mastering Residential Architecture — From Concept to Construction",
    provider: "CEPT University (Online)",
    description:
      "Comprehensive course covering site analysis, climate-responsive design, NBC compliance, working drawings, and construction supervision for residential projects in India.",
    duration: "12 weeks",
    level: "Intermediate",
    price: "₹18,500",
    rating: 4.7,
    enrolledCount: 2340,
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
    categoryId: "architects",
    modules: [
      "Site Analysis & Climate Studies",
      "Building Bylaws & NBC Compliance",
      "Space Planning & Design Development",
      "Construction Drawings & Specifications",
      "Material Selection & Cost Estimation",
      "Site Supervision & Quality Control",
    ],
  },
  {
    id: "course-002",
    title: "Interior Design Fundamentals — Indian Residential Spaces",
    provider: "National Institute of Design (Online)",
    description:
      "Learn the fundamentals of interior space planning, colour theory, material palettes, and lighting design tailored for Indian apartments, villas, and independent houses.",
    duration: "8 weeks",
    level: "Beginner",
    price: "₹12,000",
    rating: 4.5,
    enrolledCount: 4120,
    thumbnail:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
    categoryId: "interior-designers",
    modules: [
      "Principles of Interior Design",
      "Space Planning for Indian Homes",
      "Colour Theory & Material Palettes",
      "Lighting Design Basics",
      "Furniture Layout & Ergonomics",
      "Client Presentation & Mood Boards",
    ],
  },
  {
    id: "course-003",
    title: "Structural Design of RCC Buildings — IS Code Practice",
    provider: "IIT Madras (NPTEL)",
    description:
      "In-depth course on RCC structural design covering IS 456, IS 1893 seismic provisions, foundation design, and detailing practices for multi-storey buildings.",
    duration: "16 weeks",
    level: "Advanced",
    price: "₹5,000 (NPTEL Certificate)",
    rating: 4.8,
    enrolledCount: 8750,
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    categoryId: "structural-engineers",
    modules: [
      "RCC Design Philosophy & IS 456",
      "Beam & Slab Design",
      "Column & Footing Design",
      "Seismic Design — IS 1893",
      "Shear Wall & Core Design",
      "Ductile Detailing — IS 13920",
      "ETABS / STAAD Pro Modelling",
      "Design Project — G+10 Building",
    ],
  },
  {
    id: "course-004",
    title: "IGBC AP Exam Preparation — Green Building Certification",
    provider: "IGBC (Indian Green Building Council)",
    description:
      "Official preparation course for the IGBC Accredited Professional exam covering all IGBC rating systems, green strategies, and documentation requirements.",
    duration: "4 weeks",
    level: "Intermediate",
    price: "₹15,000",
    rating: 4.6,
    enrolledCount: 1890,
    thumbnail:
      "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=400&h=300&fit=crop",
    categoryId: "green-building",
    modules: [
      "IGBC Rating Systems Overview",
      "Sustainable Sites & Land Use",
      "Water Efficiency & Recycling",
      "Energy & Atmosphere",
      "Materials & Resources",
      "Indoor Environmental Quality",
      "Documentation & Certification Process",
    ],
  },
  {
    id: "course-005",
    title: "BIM for Construction Professionals — Revit to Navisworks",
    provider: "Autodesk Learning Partner (CADD Centre)",
    description:
      "Hands-on course covering Revit Architecture, Revit MEP, Navisworks clash detection, and BIM 360 collaboration for architects, engineers, and contractors.",
    duration: "10 weeks",
    level: "Intermediate",
    price: "₹25,000",
    rating: 4.4,
    enrolledCount: 3250,
    thumbnail:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&h=300&fit=crop",
    categoryId: "bim-consultants",
    modules: [
      "Introduction to BIM & LOD Concepts",
      "Revit Architecture — Modelling & Documentation",
      "Revit Structure — Structural Modelling",
      "Revit MEP — HVAC, Plumbing, Electrical",
      "Navisworks — Clash Detection & Coordination",
      "BIM 360 — Cloud Collaboration",
      "4D Scheduling with Navisworks",
      "Capstone: Federated Model Project",
    ],
  },
  {
    id: "course-006",
    title: "MEP System Design for Buildings",
    provider: "ISHRAE (Indian Society of Heating, Refrigerating and AC Engineers)",
    description:
      "Practical course covering HVAC load calculations, plumbing system design, electrical distribution, and fire-fighting system layout for commercial and residential buildings.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "₹14,000",
    rating: 4.3,
    enrolledCount: 1560,
    thumbnail:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    categoryId: "mep-consultants",
    modules: [
      "HVAC Fundamentals & Load Calculation",
      "Duct Design & Air Distribution",
      "Plumbing & Drainage System Design",
      "Electrical Load Estimation & Distribution",
      "Fire Detection & Suppression Systems",
      "BMS & Building Automation Basics",
    ],
  },
  {
    id: "course-007",
    title: "Project Management for Construction — PMP Aligned",
    provider: "NICMAR (National Institute of Construction Management)",
    description:
      "Construction project management course aligned with PMI's PMBOK framework, covering Indian construction practices, RERA compliance, and lean construction principles.",
    duration: "12 weeks",
    level: "Advanced",
    price: "₹35,000",
    rating: 4.6,
    enrolledCount: 2180,
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    categoryId: "project-management",
    modules: [
      "Construction Project Lifecycle",
      "Scope, Time & Cost Management",
      "Quality Management & ISO Standards",
      "Risk Management in Construction",
      "RERA Compliance & Statutory Approvals",
      "Lean Construction & Last Planner System",
      "Contract Management — FIDIC & Indian Contracts",
      "Digital Tools — MS Project, Primavera P6",
    ],
  },
  {
    id: "course-008",
    title: "Architectural Lighting Design — Fundamentals to Advanced",
    provider: "Lighting Research Center (Online)",
    description:
      "Learn the art and science of architectural lighting design covering photometry, daylighting integration, facade lighting, interior schemes, and smart lighting controls.",
    duration: "6 weeks",
    level: "Beginner to Intermediate",
    price: "₹9,500",
    rating: 4.5,
    enrolledCount: 980,
    thumbnail:
      "https://images.unsplash.com/photo-1565814329452-e1432bc73025?w=400&h=300&fit=crop",
    categoryId: "lighting-designers",
    modules: [
      "Light & Vision — Fundamentals",
      "Interior Lighting Schemes",
      "Exterior & Facade Lighting",
      "Daylighting Design & Integration",
      "Lighting Controls & Smart Systems",
      "Dialux Evo — Hands-on Project",
    ],
  },
  {
    id: "course-009",
    title: "Quantity Surveying & Cost Management — Indian Construction",
    provider: "RICS School of Built Environment",
    description:
      "Industry-focused course covering measurement standards, BOQ preparation, rate analysis, tender evaluation, and contract administration for the Indian construction market.",
    duration: "10 weeks",
    level: "Intermediate",
    price: "₹22,000",
    rating: 4.4,
    enrolledCount: 1420,
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    categoryId: "quantity-surveyors",
    modules: [
      "Measurement Standards — IS 1200",
      "BOQ Preparation & Taking Off",
      "Rate Analysis — CPWD & State PWD",
      "Tender Documentation & Evaluation",
      "Running Account Bills & Variations",
      "Contract Administration & Claims",
      "Cost Planning & Value Engineering",
    ],
  },
];

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export const reviews: Review[] = [
  {
    id: "rev-001",
    consultantId: "con-001",
    authorName: "Vikram Nambiar",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Rajesh and his team designed our lakeside villa in Alappuzha and the result is breathtaking. They understood our brief perfectly — a modern home that still feels rooted in Kerala's architectural heritage. The use of laterite, exposed concrete, and reclaimed wood is masterful. Highly recommended for anyone looking for thoughtful, climate-responsive architecture.",
    date: "2025-08-12",
    projectTitle: "Lakeside Villa, Alappuzha",
    helpful: 24,
  },
  {
    id: "rev-002",
    consultantId: "con-001",
    authorName: "Dr. Lakshmi Iyer",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Engaged Rajesh Menon & Associates for our 40-bed Ayurveda resort in Munnar. The design seamlessly blends with the tea-garden landscape. Every room has a stunning view and natural cross-ventilation. Construction was completed on time with regular site visits from the team.",
    date: "2025-05-20",
    projectTitle: "Tea Garden Ayurveda Resort, Munnar",
    helpful: 18,
  },
  {
    id: "rev-003",
    consultantId: "con-002",
    authorName: "Rahul Malhotra",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Priya Sharma transformed our 3BHK in Bandra into something out of an AD magazine. Her attention to detail with the Italian marble inlays, custom lighting, and the art collection she curated for us is extraordinary. Yes, it is premium pricing, but the quality and finish are worth every rupee.",
    date: "2025-11-03",
    projectTitle: "Bandra Apartment Renovation",
    helpful: 31,
  },
  {
    id: "rev-004",
    consultantId: "con-002",
    authorName: "Ananya Kapoor",
    authorAvatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
    rating: 4,
    comment:
      "Beautiful design concepts and excellent material selections. The only reason for 4 stars instead of 5 is that the project took 3 months longer than originally estimated due to imported material delays. The team was transparent about it and the final result is stunning.",
    date: "2025-09-18",
    projectTitle: "Juhu Penthouse Interiors",
    helpful: 15,
  },
  {
    id: "rev-005",
    consultantId: "con-003",
    authorName: "K. Srinivas Reddy",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Dr. Venkatesh Rao is simply the best structural consultant in Hyderabad. He optimised the column layout for our G+20 tower which saved us nearly 8% on structural steel. His seismic design expertise gave us complete confidence. Absolute professional who delivers detailed calculations and clear explanations.",
    date: "2025-07-25",
    projectTitle: "Sky Residences G+20 Tower",
    helpful: 22,
  },
  {
    id: "rev-006",
    consultantId: "con-005",
    authorName: "Meenakshi Raghavan",
    authorAvatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "GreenScape designed the landscaping for our 5-acre villa community in Mysuru. The butterfly garden and the native-plant trail are the highlights. Residents absolutely love the outdoor spaces. The team also helped us set up a rainwater-harvesting system integrated with the landscape.",
    date: "2025-06-10",
    projectTitle: "Emerald Villas Landscaping, Mysuru",
    helpful: 14,
  },
  {
    id: "rev-007",
    consultantId: "con-009",
    authorName: "Sandeep Kulkarni",
    authorAvatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "EcoHabitat helped us achieve IGBC Gold rating for our 3-lakh-sqft commercial tower in Pune. Their energy modelling was precise — actual energy consumption in the first year matched their predictions within 5%. Excellent team with deep technical expertise.",
    date: "2025-10-08",
    projectTitle: "Green Towers Commercial, Pune",
    helpful: 19,
  },
  {
    id: "rev-008",
    consultantId: "con-013",
    authorName: "Er. Manish Tiwari",
    authorAvatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    rating: 4,
    comment:
      "BIMCraft provided LOD 400 modelling for our hospital project. Their clash detection saved us significant rework during construction. The team is technically strong though response times can be slow during peak project phases. Overall a solid BIM partner.",
    date: "2025-04-15",
    projectTitle: "Multispeciality Hospital, Greater Noida",
    helpful: 11,
  },
  {
    id: "rev-009",
    consultantId: "con-008",
    authorName: "Deepak Agarwal",
    authorAvatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Pandit Arun Shastri provided Vastu consultancy for our new factory in Bhiwadi. His suggestions were practical and did not require any major changes to our architect's plan. He clearly explained the reasoning behind each recommendation. The factory has been running well since we moved in!",
    date: "2025-12-01",
    projectTitle: "Industrial Unit, Bhiwadi",
    helpful: 27,
  },
  {
    id: "rev-010",
    consultantId: "con-004",
    authorName: "Dr. Anjali Mehta",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    rating: 4,
    comment:
      "MechoElec designed the complete MEP systems for our 200-bed hospital expansion. Their HVAC design for the OT complex with laminar flow and precise temperature/humidity control is excellent. Minor delays in drawing revisions but overall a competent MEP partner.",
    date: "2025-08-30",
    projectTitle: "City Hospital Expansion, Gurugram",
    helpful: 9,
  },
  {
    id: "rev-011",
    consultantId: "con-014",
    authorName: "Ravi Chandran",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    comment:
      "AquaGuard resolved a persistent basement leakage issue that three previous contractors had failed to fix. Their injection grouting technique worked perfectly. The 10-year warranty gives us peace of mind. Only wish they had more availability — we had to wait 3 weeks to get scheduled.",
    date: "2025-03-22",
    projectTitle: "Basement Waterproofing, T. Nagar, Chennai",
    helpful: 16,
  },
  {
    id: "rev-012",
    consultantId: "con-015",
    authorName: "Suresh Patil",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Nandini's approach to affordable housing is revolutionary. She designed our 60-unit project using rammed earth and filler slabs — the cost savings were 40% compared to conventional construction and the thermal comfort is remarkable. Her passion for socially impactful design is infectious.",
    date: "2025-09-05",
    projectTitle: "Prayag Affordable Housing, Nagpur",
    helpful: 33,
  },
  {
    id: "rev-013",
    consultantId: "con-016",
    authorName: "Kavita Hegde",
    authorAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Ankit designed our 2BHK in Whitefield and the transformation is incredible. He maximised storage in every corner — pull-out pantry, under-bed drawers, loft-integrated wardrobes. The Scandinavian-meets-Indian aesthetic is exactly what we wanted. Very responsive and professional throughout.",
    date: "2025-11-20",
    projectTitle: "Compact 2BHK Interior, Whitefield",
    helpful: 21,
  },
  {
    id: "rev-014",
    consultantId: "con-010",
    authorName: "Nitin Shenoy",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "LuxLumen designed the lighting for our boutique hotel in Goa. The evening ambiance they created using concealed cove lighting, uplighters on the stone walls, and the pool lighting is absolutely magical. Guests constantly compliment the atmosphere. Worth every penny.",
    date: "2025-07-14",
    projectTitle: "Boutique Hotel Lighting, Anjuna, Goa",
    helpful: 12,
  },
  {
    id: "rev-015",
    consultantId: "con-011",
    authorName: "Ar. Shreya Bhat",
    authorAvatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=100&h=100&fit=crop",
    rating: 4,
    comment:
      "SoundSpace designed the acoustics for our 300-seat corporate auditorium. The speech intelligibility is excellent — no echoes, no dead spots. They were thorough in their measurements and provided multiple material options at different price points. Slight delay in final report delivery.",
    date: "2025-10-28",
    projectTitle: "Corporate Auditorium, Manyata Tech Park",
    helpful: 8,
  },
  {
    id: "rev-016",
    consultantId: "con-017",
    authorName: "Ar. Prasad Joshi",
    authorAvatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    rating: 5,
    comment:
      "Tanvi Mehta designed the tensile canopy structure for our sports complex in Pune. The design is elegant, structurally efficient, and was surprisingly economical. Her FEA analysis was thorough and the fabrication drawings were construction-ready. One of the best structural engineers I have worked with.",
    date: "2025-06-30",
    projectTitle: "Sports Complex Tensile Canopy, Pune",
    helpful: 17,
  },
];

// ── Type aliases for pages that import different names ──

export type JobListing = Job;
export type CourseListing = Course;

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  icon: string;
}

export interface ManagedProject {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  area: string;
  budget: string;
  duration: string;
  status: "Active" | "Completed" | "Draft";
  thumbnail: string;
  tags: string[];
  lastUpdated: string;
  views: number;
}

// ── Uppercase aliases (used by page imports) ──

export const SERVICE_CATEGORIES = serviceCategories;
export const CONSULTANTS = consultants;
export const PROJECTS = projects;
export const TEAM_MEMBERS = teamMembers;
export const JOBS = jobs;
export const COURSES = courses;
export const REVIEWS = reviews;

// ── Additional data arrays ──

export const CERTIFICATIONS: CertificationEntry[] = [
  { id: "cert-1", name: "IGBC Accredited Professional", issuer: "Indian Green Building Council", date: "2024-03-15", verifyUrl: "#", icon: "leaf" },
  { id: "cert-2", name: "GRIHA Evaluator", issuer: "TERI", date: "2023-11-20", verifyUrl: "#", icon: "award" },
  { id: "cert-3", name: "PMP Certified", issuer: "Project Management Institute", date: "2022-06-10", verifyUrl: "#", icon: "briefcase" },
];

export const COURSE_CATEGORIES = [
  "All",
  "Architecture",
  "Interior Design",
  "Green Building",
  "BIM & Technology",
  "Safety & Compliance",
  "Project Management",
  "Structural Engineering",
  "MEP Systems",
];

export const MANAGED_PROJECTS: ManagedProject[] = [
  {
    id: "mp-1",
    title: "Koregaon Park Penthouse",
    description: "Tri-level 6,400 sqft luxury penthouse with wellness floor, double-height living, and full-glazed facade. Net-zero ambition with on-site PV + battery storage.",
    category: "Residential",
    location: "Pune, Maharashtra",
    area: "6,400 sqft",
    budget: "₹4.8 Cr",
    duration: "18 months",
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    tags: ["Luxury", "Residential", "Net-Zero", "Wellness"],
    lastUpdated: "2026-05-08",
    views: 487,
  },
  {
    id: "mp-2",
    title: "Tech Park Office Interiors",
    description: "45,000 sqft open-plan office with biophilic design elements and smart lighting.",
    category: "Commercial",
    location: "Whitefield, Bengaluru",
    area: "45,000 sqft",
    budget: "₹4.5 Cr",
    duration: "8 months",
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    tags: ["Office", "Biophilic", "Smart"],
    lastUpdated: "2026-01-15",
    views: 218,
  },
  {
    id: "mp-3",
    title: "Boutique Hotel Renovation",
    description: "Heritage property renovation with 24 rooms blending colonial architecture and modern amenities.",
    category: "Hospitality",
    location: "Fort Kochi, Kerala",
    area: "18,000 sqft",
    budget: "₹6.2 Cr",
    duration: "18 months",
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    tags: ["Heritage", "Hospitality", "Renovation"],
    lastUpdated: "2026-02-20",
    views: 567,
  },
  {
    id: "mp-4",
    title: "Luxury Penthouse Design",
    description: "5,500 sqft penthouse with Italian marble, custom furniture, and home automation.",
    category: "Residential",
    location: "Bandra, Mumbai",
    area: "5,500 sqft",
    budget: "₹3.8 Cr",
    duration: "10 months",
    status: "Completed",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    tags: ["Luxury", "Penthouse", "Automation"],
    lastUpdated: "2025-09-05",
    views: 891,
  },
  {
    id: "mp-5",
    title: "Community Library",
    description: "Draft concept for a 8,000 sqft public library with reading gardens and maker spaces.",
    category: "Institutional",
    location: "Koramangala, Bengaluru",
    area: "8,000 sqft",
    budget: "₹95 L",
    duration: "TBD",
    status: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop",
    tags: ["Public", "Library", "Community"],
    lastUpdated: "2026-03-01",
    views: 45,
  },
  {
    id: "mp-6",
    title: "Wellness Spa & Resort",
    description: "Eco-resort with 12 cottages, infinity pool, and Ayurvedic spa using local stone and timber.",
    category: "Hospitality",
    location: "Coorg, Karnataka",
    area: "2.5 acres",
    budget: "₹12 Cr",
    duration: "24 months",
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&h=300&fit=crop",
    tags: ["Eco", "Resort", "Wellness"],
    lastUpdated: "2026-03-18",
    views: 432,
  },
];
