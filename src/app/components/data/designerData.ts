export const DESIGNER_PROFILE = {
  id: "ankit-sharma",
  name: "Ankit Sharma",
  initials: "AS",
  headline: "Interior Designer & Spatial Storyteller",
  type: "Interior Designer",
  location: "Mumbai, India",
  email: "ankit.sharma@design.in",
  website: "ankitsharma.design",
  linkedin: "linkedin.com/in/ankitsharma",
  bio: "Award-winning interior designer with 6+ years crafting human-centred spaces across residential, hospitality, and commercial typologies. Passionate about material honesty, biophilic design, and the intersection of craft and technology. I believe every space should tell a story — and I'm here to help you find yours.",
  skills: ["Interior Design", "Space Planning", "3D Visualisation", "AutoCAD", "SketchUp", "Revit", "Material Specification", "LEED Green Associate", "Lighting Design", "FF&E Procurement"],
  stats: { works: 24, profileViews: 1280, connections: 340, endorsements: 87 },
};

export const PORTFOLIO_WORKS = [
  { id: "w1", title: "Rajwada Heritage Residence", category: "Residential", year: "2024", client: "Private Client", gradient: "linear-gradient(135deg,#f97316,#fb923c)", description: "A 4,500 sq ft heritage-inspired bungalow blending Rajasthani vernacular elements with contemporary minimalism.", tags: ["Residential", "Heritage", "Luxury"], views: 420, likes: 38, isPublic: true },
  { id: "w2", title: "The Loft — Mumbai", category: "Commercial", year: "2024", client: "TechStart Inc.", gradient: "linear-gradient(135deg,#8b5cf6,#a78bfa)", description: "A co-working space for 200 occupants designed around activity-based working zones and biophilic elements.", tags: ["Commercial", "Co-working", "Biophilic"], views: 310, likes: 27, isPublic: true },
  { id: "w3", title: "Serenity Spa & Wellness Centre", category: "Hospitality", year: "2023", client: "The Orchid Hotels", gradient: "linear-gradient(135deg,#10b981,#34d399)", description: "A 2,000 sq ft spa using natural stone, bamboo screens, and water features to evoke calm.", tags: ["Hospitality", "Wellness", "Stone"], views: 290, likes: 24, isPublic: true },
  { id: "w4", title: "Kasturba Nagar School Library", category: "Institutional", year: "2023", client: "Municipal Corp", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", description: "A vibrant, child-scaled learning space encouraging exploration through colour, texture, and flexible furniture.", tags: ["Institutional", "Education", "Children"], views: 185, likes: 19, isPublic: true },
  { id: "w5", title: "Oak & Linen Café", category: "Commercial", year: "2022", client: "Oak & Linen", gradient: "linear-gradient(135deg,#ef4444,#f87171)", description: "A 900 sq ft specialty coffee bar with warm oak millwork, linen upholstery, and a curated material palette.", tags: ["F&B", "Retail", "Millwork"], views: 540, likes: 51, isPublic: true },
  { id: "w6", title: "Coastal Villa — Alibag", category: "Residential", year: "2022", client: "Private Client", gradient: "linear-gradient(135deg,#3b82f6,#60a5fa)", description: "A weekend retreat embracing coastal vernacular: whitewashed walls, terracotta tiles, and natural ventilation.", tags: ["Residential", "Coastal", "Vernacular"], views: 370, likes: 33, isPublic: true },
];

export const APPLIED_JOBS = [
  { id: "j1", title: "Senior Interior Designer", studio: "Livspace Bangalore", location: "Bangalore", salary: "14–18 LPA", type: "Full-time", appliedDate: "2026-05-08", status: "Shortlisted" },
  { id: "j2", title: "Lead Space Designer", studio: "HOK India", location: "Mumbai", salary: "18–24 LPA", type: "Full-time", appliedDate: "2026-05-03", status: "Applied" },
  { id: "j3", title: "Freelance Visualiser", studio: "DesignCraft Studio", location: "Remote", salary: "₹1,200/hr", type: "Freelance", appliedDate: "2026-04-28", status: "Interview" },
  { id: "j4", title: "Junior Designer", studio: "Morphogenesis", location: "Delhi", salary: "7–9 LPA", type: "Full-time", appliedDate: "2026-04-18", status: "Rejected" },
  { id: "j5", title: "Hospitality Designer", studio: "WOW Design", location: "Goa", salary: "11–14 LPA", type: "Full-time", appliedDate: "2026-04-10", status: "Offered" },
];

export const ENROLLED_COURSES = [
  { id: "c1", title: "LEED Green Associate Prep", provider: "EcoDesign Academy", progress: 65, modulesComplete: 8, totalModules: 12, level: "Intermediate", enrolledDate: "2026-03-01", completed: false },
  { id: "c2", title: "Advanced Revit for Interiors", provider: "BuildSkill Pro", progress: 30, modulesComplete: 3, totalModules: 10, level: "Advanced", enrolledDate: "2026-04-10", completed: false },
  { id: "c3", title: "Lighting Design Fundamentals", provider: "IES Online", progress: 100, modulesComplete: 8, totalModules: 8, level: "Beginner", enrolledDate: "2025-11-01", completed: true },
  { id: "c4", title: "Material Specification & Procurement", provider: "MLKH Academy", progress: 100, modulesComplete: 6, totalModules: 6, level: "Intermediate", enrolledDate: "2025-09-15", completed: true },
];

export const CAREER_HISTORY = [
  { id: "e1", role: "Senior Interior Designer", company: "Studio Lotus", period: "Jan 2024 – Present", from: "2024-01", to: null, description: "Leading end-to-end design on luxury residential and boutique hospitality projects. Manage a team of 3 junior designers and coordinate with vendors, contractors, and clients.", skills: ["Team Leadership", "Luxury Residential", "Hospitality"], verificationStatus: "verified" as const },
  { id: "e2", role: "Interior Designer", company: "Morphogenesis", period: "Jun 2021 – Dec 2023", from: "2021-06", to: "2023-12", description: "Worked on institutional and commercial typologies. Key projects included a 50,000 sq ft corporate campus in Gurugram and a flagship retail rollout across 8 cities.", skills: ["Commercial", "Institutional", "FF&E"], verificationStatus: "pending" as const },
  { id: "e3", role: "Junior Designer", company: "Urban Zen Studio", period: "Aug 2019 – May 2021", from: "2019-08", to: "2021-05", description: "Responsible for concept development, material boards, and site coordination on residential projects across Mumbai and Pune.", skills: ["Concept Design", "Site Coordination", "Residential"], verificationStatus: "unverified" as const },
];

export const CERTIFICATIONS = [
  { id: "cert1", name: "LEED Green Associate", issuer: "U.S. Green Building Council", year: "2023", credentialId: "LEED-GA-2023-IN-7842" },
  { id: "cert2", name: "Certified Interior Designer (CID)", issuer: "Indian Institute of Interior Designers", year: "2022", credentialId: "IIID-CID-22-4561" },
  { id: "cert3", name: "Revit Architecture Specialist", issuer: "Autodesk", year: "2021", credentialId: "AUT-RVT-2021-AS-009" },
  { id: "cert4", name: "Lighting Design Certificate", issuer: "Illuminating Engineering Society", year: "2020", credentialId: "IES-LDC-IN-2020-0234" },
];

export const BLOG_POSTS = [
  { id: "b1", title: "Why Material Honesty Is the Future of Interior Design", excerpt: "In a world of veneers and laminates, there's a quiet revolution brewing — one that celebrates the raw, the real, and the tactile.", date: "2026-04-22", tags: ["Materials", "Trends", "Philosophy"], views: 1240, likes: 87, status: "published" },
  { id: "b2", title: "5 Lessons From Designing a Spa With Zero Synthetic Materials", excerpt: "Our Serenity Spa project taught us that constraints are the mother of creativity. Here's what we learned.", date: "2026-03-15", tags: ["Case Study", "Wellness", "Natural Materials"], views: 890, likes: 62, status: "published" },
  { id: "b3", title: "The Biophilic Design Checklist Every Designer Should Use", excerpt: "Biophilic design is more than just houseplants. Here's a practical framework for bringing nature indoors.", date: "2026-02-08", tags: ["Biophilic", "Checklist", "How-to"], views: 2140, likes: 195, status: "published" },
  { id: "b4", title: "How to Specify Materials for a Luxury Hospitality Project", excerpt: "Material specification in hospitality is a different beast — durability, brand identity, guest experience all collide.", date: "2026-01-20", tags: ["Materials", "Hospitality", "Specification"], views: 670, likes: 44, status: "published" },
  { id: "b5", title: "The Hidden Cost of Cheap Finishes (Draft)", excerpt: "Draft exploring the long-term cost implications of value-engineering materials in interior projects.", date: "2026-05-10", tags: ["Cost", "Finishes", "Procurement"], views: 0, likes: 0, status: "draft" },
];

export const ACTIVITY_FEED = [
  { id: "a1", type: "job", icon: "Briefcase", color: "#8b5cf6", text: "Shortlisted for Senior Interior Designer at Livspace Bangalore", time: "2 hours ago", date: "2026-05-12" },
  { id: "a2", type: "course", icon: "GraduationCap", color: "#3b82f6", text: "Completed Module 8 of LEED Green Associate Prep", time: "1 day ago", date: "2026-05-11" },
  { id: "a3", type: "blog", icon: "FileText", color: "#10b981", text: "Published a new blog: Why Material Honesty Is the Future", time: "3 weeks ago", date: "2026-04-22" },
  { id: "a4", type: "job", icon: "Briefcase", color: "#8b5cf6", text: "Applied for Lead Space Designer at HOK India", time: "9 days ago", date: "2026-05-03" },
  { id: "a5", type: "work", icon: "Image", color: "#f97316", text: "Added project: The Loft — Mumbai to portfolio", time: "1 month ago", date: "2026-04-05" },
  { id: "a6", type: "certification", icon: "Award", color: "#f59e0b", text: "Earned LEED Green Associate certification", time: "2 months ago", date: "2026-03-10" },
  { id: "a7", type: "course", icon: "GraduationCap", color: "#3b82f6", text: "Enrolled in Advanced Revit for Interiors", time: "1 month ago", date: "2026-04-10" },
  { id: "a8", type: "job", icon: "CheckCircle", color: "#10b981", text: "Received offer from WOW Design for Hospitality Designer role", time: "1 month ago", date: "2026-04-10" },
];
