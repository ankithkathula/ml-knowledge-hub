import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  Search, BookOpen, Users, Clock, Star, ArrowRight,
  GraduationCap, Award, TrendingUp, ChevronRight, ChevronLeft,
  CheckCircle, Filter, X, Play, Layers, Zap, Building2,
  Pencil, Cpu, Leaf, Quote, ExternalLink, UserCheck, MapPin,
  Briefcase, Globe, Sparkles, Hammer, Palette, Lightbulb,
  ShieldCheck, IndianRupee, Calendar,
} from "lucide-react";
import {
  INSTITUTES,
  INSTITUTE_COURSES,
  getCoursesForInstitute,
  getFacultyForInstitute,
  getInstituteLogo,
  getFormalInstitutes,
  getBrandAcademies,
  getCourseLevelLabel,
} from "../data/instituteCatalogData";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const FORMAL_INSTITUTES = getFormalInstitutes();
const BRAND_ACADEMIES  = getBrandAcademies();

// Institutes shown in the "Top Institutes" rail (formal academic schools).
const TOP_INSTITUTES = FORMAL_INSTITUTES.map((inst) => ({
  id: inst.id,
  name: inst.name,
  shortName: inst.shortName,
  initials: inst.initials,
  color: inst.brandColor,
  logoUrl: getInstituteLogo(inst, 200),
  specialisation: inst.specialisations.slice(0, 3).join(" · "),
  courseCount: getCoursesForInstitute(inst.id).length,
  facultyCount: getFacultyForInstitute(inst.id).length,
  studentCount: inst.studentCount,
  city: inst.city,
  country: inst.country,
  region: inst.region,
  rankingTag: inst.rankingTag,
  type: inst.type,
  avgRating: 4.7,
  verified: inst.isVerified,
  dashPath: `/institute-microsite/${inst.id}`,
}));

// Brand academies — separate rail.
const BRAND_ACADEMY_CARDS = BRAND_ACADEMIES.map((inst) => ({
  id: inst.id,
  name: inst.name,
  shortName: inst.shortName,
  initials: inst.initials,
  color: inst.brandColor,
  logoUrl: getInstituteLogo(inst, 200),
  specialisation: inst.specialisations.slice(0, 3).join(" · "),
  courseCount: getCoursesForInstitute(inst.id).length,
  studentCount: inst.studentCount,
  city: inst.city,
  rankingTag: inst.rankingTag,
  dashPath: `/institute-microsite/${inst.id}`,
}));

// Headline catalog stats.
const TOTAL_COURSES = INSTITUTE_COURSES.length;
const TOTAL_FORMAL = FORMAL_INSTITUTES.length;
const TOTAL_BRAND_ACADEMIES = BRAND_ACADEMIES.length;
const TOTAL_FACULTY = FORMAL_INSTITUTES.reduce((s, i) => s + getFacultyForInstitute(i.id).length, 0)
  + BRAND_ACADEMIES.reduce((s, i) => s + getFacultyForInstitute(i.id).length, 0);
const TOTAL_CERTIFICATES = INSTITUTE_COURSES.filter((c) => c.level === "certificate" || c.level === "executive-ed").length;

const BRAND_TINTS = [
  { bg: "#FFD6C9", accent: "#C94F2E" },
  { bg: "#E2E8F0", accent: "#475569" },
  { bg: "#CBD5E1", accent: "#334155" },
  { bg: "#FFB39A", accent: "#A63F26" },
  { bg: "#F1F5F9", accent: "#64748B" },
  { bg: "#E2E8F0", accent: "#334155" },
];

interface CourseInstAd {
  id: string;
  institute: string;
  tagline: string;
  stat: string;
  statLabel: string;
  tags: string[];
  cta: string;
  image: string;
  accentBg: string;
  accentColor: string;
}

const COURSE_INST_ADS: CourseInstAd[] = [
  {
    id: "ad-cept",
    institute: "CEPT University",
    tagline: "Architecture, Planning & Design — Ahmedabad's research-led postgraduate school",
    stat: "34",
    statLabel: "programmes offered",
    tags: ["M.Arch", "Urban Design", "Structural Eng", "Research Doctorate"],
    cta: "Explore programmes",
    image: "https://picsum.photos/seed/cept-arch/600/300",
    accentBg: "#FFD6C9",
    accentColor: "#FF6A3D",
  },
  {
    id: "ad-nid",
    institute: "Pearl Academy",
    tagline: "Fashion, Design & Business — India's top creative university with 7 campuses",
    stat: "22",
    statLabel: "design & business courses",
    tags: ["Interior Design", "Fashion Mgmt", "Spatial Design", "UX Research"],
    cta: "View courses",
    image: "https://picsum.photos/seed/pearl-academy/600/300",
    accentBg: "#E2E8F0",
    accentColor: "#94A3B8",
  },
];

// Exploration "pivot" tiles shown in the hero strip — each links to a tag-style
// filter (currently a soft anchor; can be wired to filter state later).
const EXPLORE_PIVOTS = [
  { id: "ug",       label: "Undergraduate",   sub: "B.Arch · BBA · BA",             icon: GraduationCap, count: INSTITUTE_COURSES.filter((c) => c.level === "undergraduate").length,  bg: "#fff", iconBg: "#FF6A3D", iconColor: "#fff" },
  { id: "pg",       label: "Post-graduate",   sub: "M.Arch · MBA · MSc",            icon: Layers,        count: INSTITUTE_COURSES.filter((c) => c.level === "post-graduate").length,   bg: "#fff", iconBg: "#334155", iconColor: "#fff" },
  { id: "cert",     label: "Certifications",  sub: "Brand & professional certs",    icon: Award,         count: INSTITUTE_COURSES.filter((c) => c.level === "certificate").length,      bg: "#fff", iconBg: "#C94F2E", iconColor: "#fff" },
  { id: "exec",     label: "Executive Ed",    sub: "Short, intensive, online",      icon: Briefcase,     count: INSTITUTE_COURSES.filter((c) => c.level === "executive-ed").length,    bg: "#fff", iconBg: "#475569", iconColor: "#fff" },
  { id: "online",   label: "Online & Hybrid", sub: "Learn from anywhere",           icon: Globe,         count: INSTITUTE_COURSES.filter((c) => c.studyMode !== "on-campus").length,  bg: "#fff", iconBg: "#64748B", iconColor: "#fff" },
  { id: "doctorate",label: "Doctorate",       sub: "PhD · DDes",                    icon: Sparkles,      count: INSTITUTE_COURSES.filter((c) => c.level === "doctorate").length,       bg: "#fff",    iconBg: "#0F172A", iconColor: "#94A3B8" },
];

// "Explore by discipline" cards.
const DISCIPLINE_TILES: { label: string; sub: string; icon: any; tag: string; bg: string; iconBg: string; iconColor: string; textColor: string }[] = [
  { label: "Architecture & Studios",  sub: "B.Arch, MArch, studios",        icon: Building2, tag: "architecture",  bg: "#CBD5E1", iconBg: "#1F2937", iconColor: "#fff",     textColor: "#1F2937" },
  { label: "Interior & Joinery",      sub: "Interior arch + hardware",      icon: Palette,   tag: "interior",      bg: "#FFD6C9", iconBg: "#C94F2E", iconColor: "#fff",     textColor: "#7F2F1D" },
  { label: "Construction Mgmt + QS",  sub: "RICS, BBA CM, MRICS",           icon: Hammer,    tag: "construction",  bg: "#FFB39A", iconBg: "#A63F26", iconColor: "#fff",     textColor: "#7F2F1D" },
  { label: "BIM, Computation & AI",   sub: "Revit, Grasshopper, robotics",  icon: Cpu,       tag: "bim",           bg: "#0F172A", iconBg: "#1F2937", iconColor: "#94A3B8",  textColor: "#94A3B8" },
  { label: "Sustainability & ECBC",   sub: "Net-zero, IGBC AP, LEED",       icon: Leaf,      tag: "sustainability",bg: "#E2E8F0", iconBg: "#334155", iconColor: "#fff",     textColor: "#334155" },
  { label: "Brand-led Specs",         sub: "Coatings, façades, smart-home", icon: Lightbulb, tag: "brand-spec",    bg: "#F1F5F9", iconBg: "#475569", iconColor: "#fff",     textColor: "#475569" },
];

// ── Testimonials ──────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  studentName: string;
  initials: string;
  color: string;
  avatarUrl?: string;
  designation: string;
  company: string;
  profilePath: string;
  course: string;
  institute: string;
  facultyName: string;
  rating: number;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1, studentName: "Akash Mehra", initials: "AM", color: "#1e40af",
    designation: "BIM Coordinator", company: "Mace India",
    profilePath: "/professionals/akash-mehra",
    course: "BIM Professional: Revit Architecture Complete",
    institute: "RICS SBE", facultyName: "Dr. Ramesh Iyer",
    rating: 5,
    quote: "Dr. Iyer's depth of knowledge on Revit is unmatched. The real-project exercises made me job-ready from day one. I landed a BIM Coordinator role at Mace within 3 weeks of completing the course.",
    avatarUrl: "https://i.pravatar.cc/80?img=11",
  },
  {
    id: 2, studentName: "Rahul Saxena", initials: "RS", color: "#065f46",
    designation: "Architect", company: "Morphogenesis",
    profilePath: "/professionals/rahul-saxena",
    course: "Advanced AutoCAD for Construction Drawings",
    institute: "RICS SBE", facultyName: "Priya Suresh",
    rating: 5,
    quote: "Priya brings a rare combination of precision and pedagogy. Sheet sets and dynamic blocks are explained with real construction drawings. The most practical AutoCAD course in 6 years of practice.",
    avatarUrl: "https://i.pravatar.cc/80?img=69",
  },
  {
    id: 3, studentName: "Arjun Kulkarni", initials: "AK", color: "#7c3aed",
    designation: "Computational Design Lead", company: "Zaha Hadid Architects India",
    profilePath: "/designer/arjun-kulkarni",
    course: "Grasshopper & Parametric Design",
    institute: "Studio Morphogenesis", facultyName: "Arjun Nair",
    rating: 5,
    quote: "As someone already at a top firm, it still gave me techniques I immediately applied to live projects. Arjun Nair's structural optimisation scripts were a revelation.",
    avatarUrl: "https://i.pravatar.cc/80?img=52",
  },
  {
    id: 4, studentName: "Divya Pillai", initials: "DP", color: "#0e7490",
    designation: "ELV Engineer", company: "Larsen & Toubro",
    profilePath: "/professionals/divya-pillai",
    course: "Smart Home & Building Automation",
    institute: "TechHomes India", facultyName: "Meera Pillai",
    rating: 5,
    quote: "Excellent coverage of KNX and DALI protocols. The integration lab exercises were very hands-on and directly applicable to L&T projects. I've already applied three concepts on a live hospital project.",
    avatarUrl: "https://i.pravatar.cc/80?img=47",
  },
  {
    id: 5, studentName: "Vijay Kumar", initials: "VK", color: "#6d28d9",
    designation: "Façade Consultant", company: "Enclos India",
    profilePath: "/professionals/vijay-kumar",
    course: "Façade Engineering & Cladding Systems",
    institute: "RICS SBE", facultyName: "Rohit Desai",
    rating: 5,
    quote: "Rohit is one of the few practitioners teaching this niche with real tender and fabrication experience. I've attended conferences that didn't cover thermal bridging as clearly as this course.",
    avatarUrl: "https://i.pravatar.cc/80?img=57",
  },
  {
    id: 6, studentName: "Sneha Tiwari", initials: "ST", color: "#9a3412",
    designation: "Interior Designer", company: "Studio Lotus",
    profilePath: "/designer/sneha-tiwari",
    course: "Sustainable Interior Design Principles",
    institute: "IIID", facultyName: "Priya Nair",
    rating: 5,
    quote: "The circular design and LEED modules completely shifted how I specify materials for projects. This is exactly the kind of future-facing curriculum the design community needs right now.",
    avatarUrl: "https://i.pravatar.cc/80?img=25",
  },
];

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
type CourseFormat = "Certification" | "Training" | "Workshop" | "Digital" | "Brand Course";
type CreatorType = "Institute" | "Brand" | "Freelancer" | "Designer" | "Architect" | "Interior Designer";

interface CourseInstructor {
  name: string;
  type: CreatorType;
  verified: boolean;
  initials: string;
  color: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: CourseInstructor;
  format: CourseFormat;
  category: string;
  level: CourseLevel;
  duration: string;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  enrolled: number;
  suitableFor: string[];
  thumbGrad: string;
  featured: boolean;
  bestseller?: boolean;
  new?: boolean;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "BIM Professional: Revit Architecture Complete",
    description: "Master Revit from foundations to advanced parametric design, documentation, and BIM collaboration workflows.",
    instructor: { name: "RICS School of Built Environment", type: "Institute", verified: true, initials: "RS", color: "#1e40af" },
    format: "Certification",
    category: "BIM",
    level: "Intermediate",
    duration: "48 hrs",
    price: "₹12,999",
    priceNum: 12999,
    rating: 4.8,
    reviews: 2340,
    enrolled: 8420,
    suitableFor: ["Architects", "Civil Engineers", "Project Managers"],
    thumbGrad: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    featured: true,
    bestseller: true,
  },
  {
    id: 2,
    title: "Sustainable Interior Design Principles",
    description: "Eco-conscious material selection, LEED fundamentals, circular design strategies for modern interiors.",
    instructor: { name: "Priya Nair", type: "Interior Designer", verified: true, initials: "PN", color: "#065f46" },
    format: "Certification",
    category: "Sustainability",
    level: "Beginner",
    duration: "22 hrs",
    price: "₹5,499",
    priceNum: 5499,
    rating: 4.7,
    reviews: 1120,
    enrolled: 4310,
    suitableFor: ["Interior Designers", "Students", "Home Owners"],
    thumbGrad: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
    featured: true,
    bestseller: false,
  },
  {
    id: 3,
    title: "Kajaria Tile Design Masterclass",
    description: "Product specification, pattern layouts, grouting techniques, and showroom design workflows using Kajaria's full range.",
    instructor: { name: "Kajaria Ceramics", type: "Brand", verified: true, initials: "KC", color: "#7c3aed" },
    format: "Brand Course",
    category: "Materials",
    level: "Beginner",
    duration: "8 hrs",
    price: "Free",
    priceNum: 0,
    rating: 4.6,
    reviews: 890,
    enrolled: 12500,
    suitableFor: ["Interior Designers", "Contractors", "Architects"],
    thumbGrad: "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)",
    featured: true,
    bestseller: false,
    new: false,
  },
  {
    id: 4,
    title: "Advanced AutoCAD for Construction Drawings",
    description: "Precision drafting, sheet sets, dynamic blocks, and annotation scaling for production-ready construction docs.",
    instructor: { name: "Arjun Mehta", type: "Architect", verified: true, initials: "AM", color: "#b45309" },
    format: "Training",
    category: "BIM",
    level: "Intermediate",
    duration: "30 hrs",
    price: "₹6,999",
    priceNum: 6999,
    rating: 4.5,
    reviews: 1876,
    enrolled: 7200,
    suitableFor: ["Architects", "Civil Engineers", "Draftsmen"],
    thumbGrad: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)",
    featured: false,
    bestseller: true,
  },
  {
    id: 5,
    title: "Lighting Design for Residential Spaces",
    description: "Lux calculations, fixture selection, layered lighting strategies, and mood-driven design for modern homes.",
    instructor: { name: "Sneha Kapoor", type: "Interior Designer", verified: true, initials: "SK", color: "#be185d" },
    format: "Workshop",
    category: "Lighting",
    level: "Beginner",
    duration: "12 hrs",
    price: "₹3,299",
    priceNum: 3299,
    rating: 4.9,
    reviews: 654,
    enrolled: 2100,
    suitableFor: ["Interior Designers", "Architects", "Students"],
    thumbGrad: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    featured: true,
    bestseller: false,
    new: true,
  },
  {
    id: 6,
    title: "IGBC Green Building Professional (IGBC AP)",
    description: "Comprehensive prep for IGBC AP exam covering energy efficiency, water management, and sustainable site planning.",
    instructor: { name: "IGBC Training Cell", type: "Institute", verified: true, initials: "IC", color: "#15803d" },
    format: "Certification",
    category: "Sustainability",
    level: "Advanced",
    duration: "60 hrs",
    price: "₹18,000",
    priceNum: 18000,
    rating: 4.7,
    reviews: 420,
    enrolled: 1580,
    suitableFor: ["Architects", "Engineers", "Project Managers", "Consultants"],
    thumbGrad: "linear-gradient(135deg, #14532d 0%, #4ade80 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 7,
    title: "Façade Engineering & Cladding Systems",
    description: "Aluminium composite panels, glass curtain walls, stone cladding — design, detailing, and fabrication insights.",
    instructor: { name: "Rohit Desai", type: "Architect", verified: true, initials: "RD", color: "#0e7490" },
    format: "Training",
    category: "Construction",
    level: "Advanced",
    duration: "36 hrs",
    price: "₹9,499",
    priceNum: 9499,
    rating: 4.6,
    reviews: 312,
    enrolled: 980,
    suitableFor: ["Architects", "Façade Consultants", "Structural Engineers"],
    thumbGrad: "linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 8,
    title: "Asian Paints Colour Design Workshop",
    description: "Colour theory for spaces, trending palettes 2025–26, digital colour tools, and project presentation techniques.",
    instructor: { name: "Asian Paints", type: "Brand", verified: true, initials: "AP", color: "#9a3412" },
    format: "Workshop",
    category: "Colours",
    level: "Beginner",
    duration: "6 hrs",
    price: "Free",
    priceNum: 0,
    rating: 4.8,
    reviews: 3400,
    enrolled: 28000,
    suitableFor: ["Interior Designers", "Architects", "Homeowners", "Students"],
    thumbGrad: "linear-gradient(135deg, #7f1d1d 0%, #f97316 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 9,
    title: "3D Visualisation with Lumion & Enscape",
    description: "Real-time rendering, walkthrough videos, 360° panoramas, and VR exports for impactful client presentations.",
    instructor: { name: "Vikram Nair", type: "Freelancer", verified: true, initials: "VN", color: "#6d28d9" },
    format: "Digital",
    category: "Visualisation",
    level: "Intermediate",
    duration: "26 hrs",
    price: "₹7,499",
    priceNum: 7499,
    rating: 4.8,
    reviews: 2100,
    enrolled: 6800,
    suitableFor: ["Architects", "Interior Designers", "Visualisation Artists"],
    thumbGrad: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #f59e0b 100%)",
    featured: true,
    bestseller: true,
  },
  {
    id: 10,
    title: "Interior FF&E Specification & Procurement",
    description: "From concept boards to purchase orders — furniture, fixtures, equipment sourcing and vendor management.",
    instructor: { name: "Ananya Joshi", type: "Designer", verified: true, initials: "AJ", color: "#be123c" },
    format: "Training",
    category: "Interior",
    level: "Intermediate",
    duration: "18 hrs",
    price: "₹4,999",
    priceNum: 4999,
    rating: 4.5,
    reviews: 780,
    enrolled: 2650,
    suitableFor: ["Interior Designers", "Project Managers", "Procurement Professionals"],
    thumbGrad: "linear-gradient(135deg, #881337 0%, #fb7185 100%)",
    featured: false,
    bestseller: false,
    new: true,
  },
  {
    id: 11,
    title: "Grasshopper & Parametric Design",
    description: "Algorithmic form-finding, generative patterns, structural optimisation scripts for contemporary architecture.",
    instructor: { name: "Studio Morphogenesis", type: "Institute", verified: true, initials: "SM", color: "#1e3a8a" },
    format: "Digital",
    category: "Architecture",
    level: "Advanced",
    duration: "40 hrs",
    price: "₹10,999",
    priceNum: 10999,
    rating: 4.7,
    reviews: 540,
    enrolled: 1420,
    suitableFor: ["Architects", "Design Researchers", "Engineers"],
    thumbGrad: "linear-gradient(135deg, #172554 0%, #2563eb 50%, #4f46e5 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 12,
    title: "Berger Silk Paint Application Techniques",
    description: "Surface prep, primer selection, brush vs. roller vs. spray — hands-on application training for premium finishes.",
    instructor: { name: "Berger Paints", type: "Brand", verified: true, initials: "BP", color: "#0369a1" },
    format: "Brand Course",
    category: "Colours",
    level: "Beginner",
    duration: "4 hrs",
    price: "Free",
    priceNum: 0,
    rating: 4.4,
    reviews: 1200,
    enrolled: 9800,
    suitableFor: ["Contractors", "Painters", "Property Owners"],
    thumbGrad: "linear-gradient(135deg, #075985 0%, #0ea5e9 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 13,
    title: "Construction Cost Estimation & Tendering",
    description: "BOQ preparation, rate analysis, contractor evaluation, and project cost control strategies for real projects.",
    instructor: { name: "Manish Tiwari", type: "Architect", verified: false, initials: "MT", color: "#374151" },
    format: "Training",
    category: "Construction",
    level: "Intermediate",
    duration: "24 hrs",
    price: "₹5,999",
    priceNum: 5999,
    rating: 4.4,
    reviews: 960,
    enrolled: 3100,
    suitableFor: ["Architects", "Civil Engineers", "Quantity Surveyors", "Contractors"],
    thumbGrad: "linear-gradient(135deg, #1f2937 0%, #6b7280 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 14,
    title: "Hand Sketching for Architectural Design",
    description: "Freehand perspective, entourage, shading techniques, and rapid ideation — a course for the analog-digital designer.",
    instructor: { name: "Kavita Iyer", type: "Designer", verified: true, initials: "KI", color: "#d97706" },
    format: "Workshop",
    category: "Architecture",
    level: "Beginner",
    duration: "10 hrs",
    price: "₹2,499",
    priceNum: 2499,
    rating: 4.9,
    reviews: 1560,
    enrolled: 5300,
    suitableFor: ["Students", "Young Architects", "Interior Designers"],
    thumbGrad: "linear-gradient(135deg, #78350f 0%, #d97706 50%, #fbbf24 100%)",
    featured: false,
    bestseller: true,
  },
  {
    id: 15,
    title: "Smart Home & Building Automation",
    description: "KNX, DALI, Lutron Homeworks — integrating smart systems into residential and commercial building projects.",
    instructor: { name: "TechHomes India", type: "Institute", verified: true, initials: "TH", color: "#0f766e" },
    format: "Certification",
    category: "Technology",
    level: "Advanced",
    duration: "50 hrs",
    price: "₹14,999",
    priceNum: 14999,
    rating: 4.6,
    reviews: 280,
    enrolled: 820,
    suitableFor: ["Architects", "MEP Engineers", "ELV Contractors"],
    thumbGrad: "linear-gradient(135deg, #134e4a 0%, #2dd4bf 100%)",
    featured: false,
    bestseller: false,
    new: true,
  },
  {
    id: 16,
    title: "Landscape Design with SketchUp & Plants",
    description: "Hardscape layout, plant selection, irrigation design, and photo-realistic renders for landscaping projects.",
    instructor: { name: "Deepa Menon", type: "Freelancer", verified: true, initials: "DM", color: "#166534" },
    format: "Digital",
    category: "Landscape",
    level: "Beginner",
    duration: "16 hrs",
    price: "₹3,999",
    priceNum: 3999,
    rating: 4.6,
    reviews: 420,
    enrolled: 1740,
    suitableFor: ["Landscape Architects", "Architects", "Students"],
    thumbGrad: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 17,
    title: "Vastu Shastra for Modern Architecture",
    description: "Evidence-based Vastu principles, directional planning, room layouts, and client consultation frameworks.",
    instructor: { name: "Dr. Rajan Sharma", type: "Architect", verified: true, initials: "RS", color: "#92400e" },
    format: "Workshop",
    category: "Architecture",
    level: "Beginner",
    duration: "8 hrs",
    price: "₹2,999",
    priceNum: 2999,
    rating: 4.3,
    reviews: 1890,
    enrolled: 7600,
    suitableFor: ["Architects", "Interior Designers", "Homeowners"],
    thumbGrad: "linear-gradient(135deg, #451a03 0%, #d97706 50%, #fef08a 100%)",
    featured: false,
    bestseller: false,
  },
  {
    id: 18,
    title: "Architectural Photography & Post-Production",
    description: "Camera settings, composition rules, HDR blending, and Lightroom workflows for stunning property portfolios.",
    instructor: { name: "Sameer Alves", type: "Freelancer", verified: false, initials: "SA", color: "#374151" },
    format: "Digital",
    category: "Visualisation",
    level: "Intermediate",
    duration: "14 hrs",
    price: "₹4,299",
    priceNum: 4299,
    rating: 4.7,
    reviews: 680,
    enrolled: 2200,
    suitableFor: ["Architects", "Interior Designers", "Property Developers"],
    thumbGrad: "linear-gradient(135deg, #1f2937 0%, #4b5563 50%, #9ca3af 100%)",
    featured: false,
    bestseller: false,
  },
];

const FORMAT_TYPES: { label: CourseFormat | "All"; icon: React.FC<{ size?: number; className?: string }>; desc: string; color: string }[] = [
  { label: "All",          icon: BookOpen,   desc: "All formats",              color: "#FF6A3D" },
  { label: "Certification",icon: Award,      desc: "Recognised credentials",   color: "#C94F2E" },
  { label: "Training",     icon: TrendingUp, desc: "Skill-building programs",  color: "#475569" },
  { label: "Brand Course", icon: Building2,  desc: "Product & brand knowledge",color: "#334155" },
  { label: "Workshop",     icon: Pencil,     desc: "Live & intensive",         color: "#0F172A" },
  { label: "Digital",      icon: Cpu,        desc: "Self-paced online",        color: "#64748B" },
];

const CATEGORIES = [
  { label: "All", icon: Layers },
  { label: "BIM", icon: Cpu },
  { label: "Architecture", icon: Building2 },
  { label: "Interior", icon: Pencil },
  { label: "Sustainability", icon: Leaf },
  { label: "Materials", icon: Layers },
  { label: "Visualisation", icon: Play },
  { label: "Lighting", icon: Zap },
  { label: "Construction", icon: Building2 },
  { label: "Technology", icon: Cpu },
  { label: "Colours", icon: Pencil },
  { label: "Landscape", icon: Leaf },
];

const CREATOR_TYPES: (CreatorType | "All")[] = ["All", "Institute", "Brand", "Architect", "Interior Designer", "Designer", "Freelancer"];

const levelColors: Record<CourseLevel, { color: string; bg: string }> = {
  Beginner:     { color: "#475569", bg: "#F1F5F9" },
  Intermediate: { color: "#C94F2E", bg: "#FFD6C9" },
  Advanced:     { color: "#0F172A", bg: "#CBD5E1" },
};

const formatColors: Record<CourseFormat, { color: string; bg: string }> = {
  "Certification": { color: "#C94F2E", bg: "#FFD6C9" },
  "Training":      { color: "#475569", bg: "#E2E8F0" },
  "Brand Course":  { color: "#334155", bg: "#CBD5E1" },
  "Workshop":      { color: "#FF6A3D", bg: "#FFB39A" },
  "Digital":       { color: "#64748B", bg: "#F1F5F9" },
};

const creatorColors: Record<CreatorType, { color: string; bg: string }> = {
  "Institute":        { color: "#334155", bg: "#E2E8F0" },
  "Brand":            { color: "#C94F2E", bg: "#FFD6C9" },
  "Architect":        { color: "#475569", bg: "#CBD5E1" },
  "Interior Designer":{ color: "#FF6A3D", bg: "#FFB39A" },
  "Designer":         { color: "#64748B", bg: "#F1F5F9" },
  "Freelancer": { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
};

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b" }}>{rating}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={11} style={{ color: "#f59e0b", fill: i <= Math.round(rating) ? "#f59e0b" : "transparent" }} />
        ))}
      </div>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({reviews.toLocaleString()})</span>
    </div>
  );
}

const COURSE_IMG: Record<number, string> = {
  1:  "https://picsum.photos/seed/revit-bim-tech/600/320",
  2:  "https://picsum.photos/seed/sustainable-interior/600/320",
  3:  "https://picsum.photos/seed/ceramic-tile-design/600/320",
  4:  "https://picsum.photos/seed/autocad-drafting/600/320",
  5:  "https://picsum.photos/seed/lighting-bedroom/600/320",
  6:  "https://picsum.photos/seed/green-building-eco/600/320",
  7:  "https://picsum.photos/seed/facade-glass-cladding/600/320",
  8:  "https://picsum.photos/seed/paint-colour-palette/600/320",
  9:  "https://picsum.photos/seed/lumion-3d-render/600/320",
  10: "https://picsum.photos/seed/interior-ffe-furniture/600/320",
  11: "https://picsum.photos/seed/grasshopper-parametric/600/320",
  12: "https://picsum.photos/seed/berger-wall-paint/600/320",
  13: "https://picsum.photos/seed/construction-cost-site/600/320",
  14: "https://picsum.photos/seed/hand-sketch-architecture/600/320",
  15: "https://picsum.photos/seed/smart-home-automation/600/320",
  16: "https://picsum.photos/seed/landscape-garden-plants/600/320",
  17: "https://picsum.photos/seed/vastu-architecture-plan/600/320",
  18: "https://picsum.photos/seed/architectural-photography/600/320",
};

const CAT_PALETTE: Record<string, { bg: string; accent: string }> = {
  "BIM":           { bg: "#E2E8F0", accent: "#334155" },
  "Architecture":  { bg: "#CBD5E1", accent: "#1F2937" },
  "Interior":      { bg: "#FFD6C9", accent: "#C94F2E" },
  "Sustainability":{ bg: "#E2E8F0", accent: "#475569" },
  "Materials":     { bg: "#F1F5F9", accent: "#475569" },
  "Visualisation": { bg: "#0F172A", accent: "#64748B" },
  "Lighting":      { bg: "#FFB39A", accent: "#7F2F1D" },
  "Construction":  { bg: "#FFD6C9", accent: "#FF6A3D" },
  "Technology":    { bg: "#CBD5E1", accent: "#2F3A45" },
  "Colours":       { bg: "#FFD6C9", accent: "#A63F26" },
  "Landscape":     { bg: "#F1F5F9", accent: "#64748B" },
};

function CourseCard({ course, size = "normal" }: { course: Course; size?: "normal" | "featured" }) {
  const fc = formatColors[course.format];
  const lc = levelColors[course.level];
  const cc = creatorColors[course.instructor.type];
  const isFeatured = size === "featured";
  const cat = CAT_PALETTE[course.category] ?? { bg: "#F1F5F9", accent: "#475569" };
  const imgUrl = COURSE_IMG[course.id];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl flex flex-col cursor-pointer"
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,61,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0";
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: isFeatured ? "140px" : "120px", background: cat.bg, flexShrink: 0 }}>
        {imgUrl && (
          <img src={imgUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ background: "rgba(255,255,255,0.9)", color: fc.color }}>
            {course.format}
          </span>
          {course.bestseller && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ background: "rgba(245,158,11,0.9)", color: "#fff" }}>
              Bestseller
            </span>
          )}
          {course.new && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ background: "rgba(16,185,129,0.9)", color: "#fff" }}>
              New
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(255,255,255,0.9)", color: lc.color }}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4" style={{ gap: "10px" }}>
        <h3 className="line-clamp-2 leading-snug" style={{ fontSize: isFeatured ? "0.95rem" : "0.88rem", fontWeight: 700, color: "#1a1a1a", minHeight: "2.6em" }}>
          {course.title}
        </h3>

        {isFeatured && (
          <p className="line-clamp-2" style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.5 }}>
            {course.description}
          </p>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white" style={{ background: course.instructor.color }}>
            {course.instructor.initials}
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="truncate" style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 500 }}>{course.instructor.name}</span>
            {course.instructor.verified && (
              <CheckCircle size={11} style={{ color: "#3b82f6", flexShrink: 0 }} />
            )}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0" style={{ background: cc.bg, color: cc.color }}>
              {course.instructor.type}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          <StarRating rating={course.rating} reviews={course.reviews} />
          <span className="flex items-center gap-1"><Users size={11} />{course.enrolled.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
        </div>

        {/* Suitable For */}
        <div>
          <p style={{ fontSize: "0.68rem", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Suitable for</p>
          <div className="flex flex-wrap gap-1">
            {course.suitableFor.slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid #F1F5F9" }}>
          <span style={{ fontSize: course.priceNum === 0 ? "0.9rem" : "1.05rem", fontWeight: 800, color: course.priceNum === 0 ? "#10b981" : "#FF6A3D" }}>
            {course.price}
          </span>
          <Link
            to="/u/courses"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: "rgba(255,106,61,0.08)", color: "#FF6A3D", border: "1px solid rgba(255,106,61,0.2)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FF6A3D", (e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.08)", (e.currentTarget as HTMLElement).style.color = "#FF6A3D")}
          >
            Enroll <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PublicCourseCatalogPage() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState<CourseFormat | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "All">("All");
  const [creatorFilter, setCreatorFilter] = useState<CreatorType | "All">("All");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [showFilters, setShowFilters] = useState(false);
  const formatScrollRef = useRef<HTMLDivElement>(null);

  const featured = COURSES.filter((c) => c.featured);

  const filtered = COURSES.filter((c) => {
    if (formatFilter !== "All" && c.format !== formatFilter) return false;
    if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
    if (levelFilter !== "All" && c.level !== levelFilter) return false;
    if (creatorFilter !== "All" && c.instructor.type !== creatorFilter) return false;
    if (priceFilter === "free" && c.priceNum !== 0) return false;
    if (priceFilter === "paid" && c.priceNum === 0) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.name.toLowerCase().includes(search.toLowerCase()) && !c.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeFiltersCount = [
    formatFilter !== "All",
    categoryFilter !== "All",
    levelFilter !== "All",
    creatorFilter !== "All",
    priceFilter !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFormatFilter("All");
    setCategoryFilter("All");
    setLevelFilter("All");
    setCreatorFilter("All");
    setPriceFilter("all");
    setSearch("");
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>

      {/* ── Functional, exploration-led hero ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 15% -10%, rgba(255,122,89,0.10) 0%, transparent 55%), radial-gradient(ellipse at 110% 10%, rgba(99,102,241,0.06) 0%, transparent 55%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end">

            {/* Left — search + pivots */}
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest mb-3" style={{ color: "#FF6A3D" }}>
                <Sparkles size={12} /> Course catalogue
              </span>
              <h1 style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", fontWeight: 400, color: "#101828", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Learn from{" "}
                <span style={{ color: "#FF6A3D", fontWeight: 500 }}>14 institutes</span> and{" "}
                <span style={{ color: "#FF6A3D", fontWeight: 500 }}>{TOTAL_BRAND_ACADEMIES} brand academies</span> — under one roof.
              </h1>
              <p className="mt-3 max-w-[680px]" style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#667085" }}>
                Undergraduate programmes, certifications, brand-led workshops and short executive sessions across BIM, sustainability, façades, smart-building, joinery, colour and beyond.
              </p>

              {/* Search */}
              <div className="relative max-w-[640px] mt-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#98A2B3" }} />
                <input
                  className="w-full pl-11 pr-32 py-3.5 rounded-xl text-sm outline-none"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #F2F4F7",
                    color: "#101828",
                    fontSize: "0.95rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  placeholder="Search courses, brand academies, instructors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,122,89,0.4)")}
                  onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#F2F4F7")}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-lg text-[12px] font-medium text-white" style={{ background: "#FF6A3D" }}>
                  Search
                </button>
              </div>

              {/* Exploration pivots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 max-w-[680px]">
                {EXPLORE_PIVOTS.map((p) => {
                  const Icon = p.icon;
                  const isDark = p.bg === "#0F172A";
                  return (
                    <a key={p.id} href="#all-institutes" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all" style={{ background: p.bg, border: `1px solid ${isDark ? "#1F2937" : "#E2E8F0"}` }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: p.iconBg, color: p.iconColor }}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] truncate" style={{ color: isDark ? "#F1F5F9" : "#101828", fontWeight: 600 }}>{p.label}</span>
                        <span className="block text-[10px]" style={{ color: isDark ? "#64748B" : "#94A3B8" }}>{p.count} courses</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right — sponsored / certification rail */}
            <aside className="space-y-3">
              <div className="text-[10px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Sponsored · Featured certifications</div>

              <SponsoredCertCard
                accent="#FF6A3D"
                bg="#FFD6C9"
                eyebrow="IGBC Training Cell"
                title="IGBC AP Exam Prep — Cohort opens June 9"
                points={["4-week intensive · ₹18,000", "Live exam-mock papers", "Career boost for sustainability roles"]}
                cta={{ label: "Reserve seat", to: "/institute-microsite/igbc-training" }}
                image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900"
                badge="IGBC Certified"
              />

              <SponsoredCertCard
                accent="#475569"
                bg="#E2E8F0"
                eyebrow="Saint-Gobain Multi-Comfort"
                title="Glass Studio — High-Performance Façades"
                points={["8-week online · ₹26,000", "Façade Pro™ practicum + CPD credits"]}
                cta={{ label: "View programme", to: "/institute-microsite/saintgobain-multicomfort" }}
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900"
                badge="CPD Accredited"
              />
            </aside>
          </div>

          {/* Stat strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[1100px]">
            <StatTile value={TOTAL_COURSES.toString()}        label="Courses"            icon={BookOpen} />
            <StatTile value={`${TOTAL_FORMAL + TOTAL_BRAND_ACADEMIES}`} label="Schools & Academies" icon={Building2} />
            <StatTile value={TOTAL_CERTIFICATES.toString()}   label="Certifications"     icon={Award} />
            <StatTile value={TOTAL_FACULTY.toString()}        label="Faculty"            icon={UserCheck} />
          </div>

          {/* Discipline tiles */}
          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#98A2B3" }}>Explore by discipline</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {DISCIPLINE_TILES.map((d) => {
                const Icon = d.icon;
                return (
                  <a key={d.tag} href="#all-institutes" className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all" style={{ background: d.bg, border: "1px solid transparent" }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: d.iconBg, color: d.iconColor }}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] truncate" style={{ color: d.textColor, fontWeight: 600 }}>{d.label}</span>
                      <span className="block text-[10px]" style={{ color: d.textColor, opacity: 0.6 }}>{d.sub}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-12">

        {/* Top Institutes ───────────────────────────────────────────────── */}
        <section id="all-institutes">
          <div className="flex items-end justify-between mb-5 gap-3 flex-wrap">
            <div>
              <span className="text-[10px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Schools of Architecture · Design · Planning</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 400, color: "#101828", letterSpacing: "-0.01em", marginTop: 4 }}>Top Institutes on Material Library</h2>
            </div>
            <span className="text-[12px]" style={{ color: "#667085" }}>{TOP_INSTITUTES.length} verified institutes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOP_INSTITUTES.map((inst) => (
              <Link
                key={inst.id}
                to={inst.dashPath}
                className="group rounded-2xl p-5 flex flex-col gap-3 transition-all bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: "#F9FAFB", border: "1px solid #F2F4F7" }}>
                    <ImageWithFallback
                      src={inst.logoUrl}
                      alt={inst.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate" style={{ fontSize: "0.88rem", fontWeight: 500, color: "#101828" }}>{inst.shortName}</p>
                      {inst.verified && <CheckCircle size={12} style={{ color: "#175CD3", flexShrink: 0 }} />}
                    </div>
                    <p className="truncate flex items-center gap-1" style={{ fontSize: "0.7rem", color: "#98A2B3" }}>
                      <MapPin size={9} /> {inst.city}{inst.region !== "India" ? ` · ${inst.region}` : ""}
                    </p>
                  </div>
                </div>
                {inst.rankingTag && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium w-fit" style={{ background: "rgba(255,122,89,0.08)", color: "#FF6A3D" }}>
                    <Award size={9} /> {inst.rankingTag}
                  </span>
                )}
                <p style={{ fontSize: "0.74rem", color: "#667085", lineHeight: 1.5 }}>{inst.specialisation}</p>
                <div className="flex items-center gap-3 flex-wrap mt-auto" style={{ fontSize: "0.72rem" }}>
                  <span className="flex items-center gap-1" style={{ color: "#667085" }}>
                    <BookOpen size={11} />{inst.courseCount} courses
                  </span>
                  <span className="flex items-center gap-1" style={{ color: "#667085" }}>
                    <UserCheck size={11} />{inst.facultyCount} faculty
                  </span>
                  <span className="flex items-center gap-1" style={{ color: "#FF6A3D" }}>
                    <Star size={11} style={{ fill: "#FF6A3D" }} />{inst.avgRating}
                  </span>
                </div>
                <div className="flex items-center gap-1 pt-2 border-t border-gray-50" style={{ color: "#FF6A3D", fontSize: "0.72rem", fontWeight: 500 }}>
                  Open Microsite <ExternalLink size={11} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Certifications by Brands ─────────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-5 gap-3 flex-wrap">
            <div>
              <span className="text-[10px] uppercase tracking-widest" style={{ color: "#FF6A3D" }}>Brand Academies</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 400, color: "#101828", letterSpacing: "-0.01em", marginTop: 4 }}>Certifications by Brands</h2>
              <p style={{ fontSize: "0.85rem", color: "#667085", marginTop: 2 }}>
                Industry-aligned certifications and workshops led by India's leading brands.
              </p>
            </div>
            <span className="text-[12px]" style={{ color: "#667085" }}>{BRAND_ACADEMY_CARDS.length} brand academies · {BRAND_ACADEMIES.reduce((s, i) => s + getCoursesForInstitute(i.id).length, 0)} courses</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRAND_ACADEMY_CARDS.map((acad, idx) => {
              const tint = BRAND_TINTS[idx % BRAND_TINTS.length];
              return (
              <Link
                key={acad.id}
                to={acad.dashPath}
                className="group rounded-2xl overflow-hidden transition-all bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                style={{ textDecoration: "none" }}
              >
                <div className="h-16 relative" style={{ background: tint.bg }}>
                  <div className="absolute top-3 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: "white", border: "1px solid #F2F4F7" }}>
                      <ImageWithFallback src={acad.logoUrl} alt={acad.shortName} className="w-full h-full object-contain p-1" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.85)", color: tint.accent }}>
                      Brand Academy
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "#101828", marginBottom: 4 }}>{acad.shortName}</p>
                  <p className="truncate flex items-center gap-1" style={{ fontSize: "0.72rem", color: "#98A2B3" }}>
                    <MapPin size={9} /> {acad.city} {acad.rankingTag ? `· ${acad.rankingTag}` : ""}
                  </p>
                  <p className="mt-3" style={{ fontSize: "0.78rem", color: "#667085", lineHeight: 1.5 }}>{acad.specialisation}</p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100" style={{ fontSize: "0.72rem" }}>
                    <span className="flex items-center gap-1" style={{ color: "#667085" }}>
                      <Award size={11} /> {acad.courseCount} certifications
                    </span>
                    <span className="flex items-center gap-1" style={{ color: "#FF6A3D", fontWeight: 500 }}>
                      Open Academy <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            );})}
          </div>

          {/* Featured brand certifications strip */}
          <div className="mt-6">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>Top brand certifications this month</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              {BRAND_ACADEMIES.flatMap((acad) =>
                getCoursesForInstitute(acad.id).slice(0, 1).map((c) => ({ acad, c }))
              ).slice(0, 6).map(({ acad, c }) => (
                <Link key={c.id} to={`/institute-microsite/${acad.id}`} className="rounded-xl p-4 transition-all hover:border-gray-200 hover:shadow-sm" style={{ background: "white", border: "1px solid #F2F4F7" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: "#F9FAFB", border: "1px solid #F2F4F7" }}>
                      <ImageWithFallback src={getInstituteLogo(acad)} alt={acad.shortName} className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "#98A2B3" }}>{acad.shortName}</span>
                  </div>
                  <p style={{ fontSize: "0.86rem", fontWeight: 500, color: "#101828", lineHeight: 1.3 }}>{c.title}</p>
                  <p className="mt-1 line-clamp-2" style={{ fontSize: "0.72rem", color: "#667085", lineHeight: 1.5 }}>{c.shortDescription}</p>
                  <div className="mt-3 flex items-center gap-3 text-[11px]" style={{ color: "#98A2B3" }}>
                    <span className="flex items-center gap-1"><Calendar size={10} />{c.durationLabel}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={10} />{c.feeLabel.replace("₹", "")}</span>
                    <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ background: "rgba(255,122,89,0.08)", color: "#FF6A3D" }}>{getCourseLevelLabel(c.level)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending from top institutes ─────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Trending from Top Institutes</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.filter((c) => c.instructor.type === "Institute" && c.featured).map((c) => {
              const fc = formatColors[c.format];
              const lc = levelColors[c.level];
              const cc = creatorColors[c.instructor.type];
              return (
                <div
                  key={c.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "white", border: "1px solid #E2E8F0" }}
                >
                  {/* Thumb */}
                  <div className="relative h-32" style={{ background: (CAT_PALETTE[c.category] ?? { bg: "#F1F5F9" }).bg }}>
                    {COURSE_IMG[c.id] && (
                      <img src={COURSE_IMG[c.id]} alt={c.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: fc.bg, color: fc.color, border: `1px solid ${fc.color}30` }}>{c.format}</span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: lc.bg, color: lc.color }}>{c.level}</span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-4 flex flex-col gap-2.5">
                    <h3 className="line-clamp-2" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</h3>
                    {/* Institute + faculty */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: c.instructor.color }}>{c.instructor.initials}</div>
                      <div className="min-w-0">
                        <p className="truncate" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>{c.instructor.name}</p>
                      </div>
                      <CheckCircle size={11} style={{ color: "#3b82f6", flexShrink: 0 }} />
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0" style={{ background: cc.bg, color: cc.color }}>{c.instructor.type}</span>
                    </div>
                    {/* Faculty taught by chip */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.1)" }}>
                      <UserCheck size={12} style={{ color: "#3b82f6", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.7rem", color: "#3b82f6" }}>
                        {c.id === 1 ? "Taught by Dr. Ramesh Iyer" : c.id === 9 ? "Taught by Arjun Nair" : c.id === 11 ? "Taught by Arjun Nair" : "Taught by institute faculty"}
                      </span>
                    </div>
                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                      <StarRating rating={c.rating} reviews={c.reviews} />
                      <span className="flex items-center gap-1"><Users size={11} />{c.enrolled.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{c.duration}</span>
                    </div>
                    {/* Suitable for */}
                    <div>
                      <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Suitable for</p>
                      <div className="flex flex-wrap gap-1">
                        {c.suitableFor.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Price + enroll */}
                    <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #F1F5F9" }}>
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: c.priceNum === 0 ? "#10b981" : "var(--accent)" }}>{c.price}</span>
                      <Link to="/u/courses" className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(255,106,61,0.12)", color: "var(--accent)", border: "1px solid rgba(255,106,61,0.2)" }}>
                        Enroll <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Browse by Format */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Browse by format</h2>
            <div className="flex gap-1">
              <button
                onClick={() => formatScrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
              >
                <ChevronLeft size={16} style={{ color: "var(--text-secondary)" }} />
              </button>
              <button
                onClick={() => formatScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#F1F5F9", border: "1px solid #E2E8F0" }}
              >
                <ChevronRight size={16} style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
          </div>
          <div ref={formatScrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
            {FORMAT_TYPES.map((ft) => {
              const Icon = ft.icon;
              const active = formatFilter === ft.label;
              return (
                <button
                  key={ft.label}
                  onClick={() => setFormatFilter(ft.label as CourseFormat | "All")}
                  className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-xl transition-all"
                  style={{
                    minWidth: "120px",
                    background: active ? `${ft.color}18` : "#F8FAFC",
                    border: `1px solid ${active ? ft.color + "50" : "#E2E8F0"}`,
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: active ? `${ft.color}25` : "#F1F5F9" }}>
                    <Icon size={18} style={{ color: active ? ft.color : "var(--text-muted)" }} />
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: active ? "var(--text-primary)" : "var(--text-secondary)", whiteSpace: "nowrap" }}>{ft.label === "All" ? "All Courses" : ft.label}</p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{ft.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured / Popular */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: "var(--accent)" }} />
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Most Popular Courses</h2>
              </div>
              <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent)" }} onClick={() => { setFormatFilter("All"); setCategoryFilter("All"); }}>
                View all <ChevronRight size={15} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {featured.map((c) => (
                <CourseCard key={c.id} course={c} size="featured" />
              ))}
            </div>
          </section>
        )}

        {/* Category chips */}
        <section>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "14px" }}>Browse categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = categoryFilter === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setCategoryFilter(cat.label)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: active ? "var(--accent)" : "#F1F5F9",
                    color: active ? "#fff" : "#475569",
                    border: `1px solid ${active ? "var(--accent)" : "#E2E8F0"}`,
                  }}
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Filter bar + Grid */}
        <section>
          {/* Filter toggle header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {filtered.length} course{filtered.length !== 1 ? "s" : ""}
              </h2>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <X size={11} /> Clear filters
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: showFilters ? "rgba(255,106,61,0.12)" : "#F8FAFC",
                border: `1px solid ${showFilters ? "rgba(255,106,61,0.3)" : "#E2E8F0"}`,
                color: showFilters ? "var(--accent)" : "#475569",
              }}
            >
              <Filter size={15} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{ background: "var(--accent)", color: "#fff" }}>
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="rounded-xl p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              {/* Level */}
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Level</p>
                <div className="flex flex-col gap-1.5">
                  {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((l) => (
                    <button key={l} onClick={() => setLevelFilter(l)} className="text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ background: levelFilter === l ? "var(--accent)" : "transparent", color: levelFilter === l ? "#fff" : "#475569", border: `1px solid ${levelFilter === l ? "var(--accent)" : "#E2E8F0"}` }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Creator */}
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Creator type</p>
                <div className="flex flex-col gap-1.5">
                  {CREATOR_TYPES.map((ct) => {
                    const cc = ct !== "All" ? creatorColors[ct] : null;
                    return (
                      <button key={ct} onClick={() => setCreatorFilter(ct)} className="text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ background: creatorFilter === ct ? (cc ? cc.bg : "var(--accent)") : "transparent", color: creatorFilter === ct ? (cc ? cc.color : "#fff") : "#475569", border: `1px solid ${creatorFilter === ct ? (cc ? cc.color + "40" : "var(--accent)") : "#E2E8F0"}` }}>
                        {ct}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format */}
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Format</p>
                <div className="flex flex-col gap-1.5">
                  {(["All", "Certification", "Training", "Workshop", "Digital", "Brand Course"] as const).map((f) => (
                    <button key={f} onClick={() => setFormatFilter(f)} className="text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ background: formatFilter === f ? "var(--accent)" : "transparent", color: formatFilter === f ? "#fff" : "#475569", border: `1px solid ${formatFilter === f ? "var(--accent)" : "#E2E8F0"}` }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Price</p>
                <div className="flex flex-col gap-1.5">
                  {([["all", "Any price"], ["free", "Free"], ["paid", "Paid"]] as const).map(([val, label]) => (
                    <button key={val} onClick={() => setPriceFilter(val)} className="text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ background: priceFilter === val ? "var(--accent)" : "transparent", color: priceFilter === val ? "#fff" : "#475569", border: `1px solid ${priceFilter === val ? "var(--accent)" : "#E2E8F0"}` }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.flatMap((c, idx) => {
                const card = <CourseCard key={c.id} course={c} />;
                if (idx === 5) return [card, <CourseInstituteAd key="ciad-0" ad={COURSE_INST_ADS[0]} />];
                if (idx === 13) return [card, <CourseInstituteAd key="ciad-1" ad={COURSE_INST_ADS[1]} />];
                return [card];
              })}
            </div>
          ) : (
            <div className="rounded-xl p-16 text-center" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <BookOpen size={36} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ color: "var(--text-primary)", fontWeight: 600, marginBottom: 6 }}>No courses found</p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "var(--accent)", color: "#fff" }}>
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Learner Testimonials ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Quote size={18} style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>What Learners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: "white", border: "1px solid #E2E8F0" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={13} style={{ color: "#f59e0b", fill: i <= t.rating ? "#f59e0b" : "transparent" }} />
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>
                  "{t.quote}"
                </p>
                {/* Course + institute chip */}
                <div className="px-2.5 py-2 rounded-lg" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <p className="truncate" style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{t.course}</p>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>{t.institute} · {t.facultyName}</p>
                </div>
                {/* Reviewer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
                  <div className="flex items-center gap-2.5">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.studentName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" loading="lazy" />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: t.color }}>{t.initials}</div>
                    )}
                    <div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{t.studentName}</p>
                      <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{t.designation} · {t.company}</p>
                    </div>
                  </div>
                  <Link
                    to={t.profilePath}
                    className="p-1.5 rounded-lg flex-shrink-0 transition-all"
                    style={{ color: "#3b82f6" }}
                    title="View profile"
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator CTA banner */}
        <section>
          <div
            className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.12) 0%, rgba(139,92,246,0.08) 100%)", border: "1px solid rgba(255,106,61,0.2)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Become a Creator</span>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
                Share your expertise with India's AEC community
              </h3>
              <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", maxWidth: "460px", lineHeight: 1.6 }}>
                Whether you're an architect, interior designer, brand, or institute — publish courses, build your reputation, and reach thousands of professionals.
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-3 relative flex-shrink-0">
              <Link to="/signup" className="px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap" style={{ background: "var(--accent)", color: "#fff" }}>
                Start Teaching
              </Link>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Free to apply · Verified badge on approval</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Hero-only helpers ─────────────────────────────────────────────── */

function StatTile({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: "white", border: "1px solid #F2F4F7" }}>
      <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,122,89,0.10)", color: "#FF6A3D" }}>
        <Icon className="w-5 h-5" />
      </span>
      <span>
        <span className="block" style={{ fontSize: "1.4rem", fontWeight: 400, color: "#101828", lineHeight: 1 }}>{value}</span>
        <span className="block text-[10px] uppercase tracking-widest mt-1" style={{ color: "#98A2B3" }}>{label}</span>
      </span>
    </div>
  );
}

function SponsoredCertCard({ accent, bg, eyebrow, title, points, cta, image, badge }: {
  accent: string;
  bg?: string;
  eyebrow: string;
  title: string;
  points: string[];
  cta: { label: string; to: string };
  image: string;
  badge: string;
}) {
  const cardBg = bg ?? `linear-gradient(135deg, ${accent}14 0%, ${accent}06 100%)`;
  return (
    <Link
      to={cta.to}
      className="block rounded-2xl overflow-hidden transition-all"
      style={{
        background: cardBg,
        border: `1.5px solid ${accent}40`,
        textDecoration: "none",
        boxShadow: `0 2px 12px ${accent}22`,
      }}
    >
      {/* Accent top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />
      <div className="flex gap-0">
        {/* Image — taller, full left column */}
        <div className="flex-shrink-0 relative" style={{ width: 110, minHeight: 130 }}>
          <ImageWithFallback src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${accent}14 100%)` }} />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0 py-3 px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-700" style={{ background: accent, color: "#fff", fontWeight: 700 }}>{badge}</span>
            <span className="text-[9px] font-700 uppercase tracking-widest" style={{ color: accent, fontWeight: 700, opacity: 0.7 }}>Sponsored</span>
          </div>
          <p style={{ fontSize: "0.68rem", color: accent, opacity: 0.7, marginBottom: 2, fontWeight: 600 }}>{eyebrow}</p>
          <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.25, letterSpacing: "-0.01em" }}>{title}</p>
          <ul className="mt-2 space-y-1">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-1.5 text-[11px]" style={{ color: "#475569" }}>
                <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: accent }} /> {p}
              </li>
            ))}
          </ul>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg" style={{ background: accent, color: "#fff" }}>
            {cta.label} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CourseInstituteAd({ ad }: { ad: CourseInstAd }) {
  return (
    <div
      className="col-span-full rounded-2xl overflow-hidden flex items-stretch relative"
      style={{ background: "#0F172A", border: "1px solid #1E293B", minHeight: 120 }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: `linear-gradient(90deg, ${ad.accentColor}, ${ad.accentColor}40)` }} />
      {/* Image column */}
      <div className="flex-shrink-0 relative" style={{ width: 200 }}>
        <img src={ad.image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 55%, #0F172A 100%)" }} />
        {/* Stat overlay on image */}
        <div className="absolute bottom-4 left-4">
          <p style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{ad.stat}</p>
          <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{ad.statLabel}</p>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0 flex items-center gap-5 pl-2 pr-6 py-5">
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: "0.6rem", color: ad.accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
            Sponsored · Institute
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{ad.institute}</p>
          <p className="mt-1.5 line-clamp-1" style={{ fontSize: "0.76rem", color: "#64748B" }}>{ad.tagline}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {ad.tags.map((t) => (
              <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "#1E293B", color: "#94A3B8", border: "1px solid #2D3F55" }}>{t}</span>
            ))}
          </div>
        </div>
        {/* CTA */}
        <Link
          to="/courses"
          className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap"
          style={{ background: ad.accentColor, color: "#fff", boxShadow: `0 4px 14px ${ad.accentColor}40` }}
        >
          {ad.cta} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
