// KC Portal master data — sourced from KC_Portal_Tech_Handoff_V2.xlsx
// 16 Unified Categories, 27 Professional Types, 37 Service Types
// Plus mock "registered" studios & contractors for listing pages.

export interface UnifiedCategory {
  id: string;            // CAT-01 .. CAT-16
  slug: string;
  name: string;
  description: string;
  icon: string;          // lucide-react icon name
  color: string;         // hex accent
  professionalCount: number;
  serviceCount: number;
}

export interface ProfessionalType {
  id: string;            // PRO-001 .. PRO-027
  slug: string;
  name: string;
  subCategory: string;   // "Design Studio" | "Engineering Consultancy" | "Consultancy" | "Digital Studio"
  categoryIds: string[];
  offerings: string[];
  marketplaceDepts: string[];
  profileFeatures: string[];
}

export interface ServiceType {
  id: string;            // SVC-001 .. SVC-037
  slug: string;
  name: string;
  subCategory: string;   // "General Contractor" | "Specialty Contractor" | "Trade Contractor" | "Material Supplier" | "Testing Lab" | "Support Service"
  categoryIds: string[];
  offerings: string[];
  marketplaceDepts: string[];
  profileFeatures: string[];
}

export interface RegisteredProfile {
  id: string;
  slug: string;
  name: string;
  typeId: string;          // PRO-xxx or SVC-xxx
  typeName: string;
  categoryId: string;      // primary category
  tagline: string;
  city: string;
  state: string;
  avatar: string;          // dicebear shapes — logo-style mark
  logoUrl: string;         // alias for avatar, used on Professionals cards
  coverImage: string;      // themed stock photo (loremflickr)
  heroImage: string;       // larger landscape stock photo
  rating: number;
  reviewCount: number;
  yearsExp: number;
  projectCount: number;
  teamSize: number;
  verified: boolean;
  featured: boolean;
  specializations: string[];
  priceRange: string;     // display string
  responseTime: string;   // "< 2 hrs"
}

// Category → image keyword tags for loremflickr
const CATEGORY_IMAGE_KEYWORDS: Record<string, string> = {
  "CAT-01": "architecture,building,modern",
  "CAT-02": "interior,design,room",
  "CAT-03": "landscape,garden,outdoor",
  "CAT-04": "structure,steel,engineering",
  "CAT-05": "construction,crane,building",
  "CAT-06": "electrical,pipe,industrial",
  "CAT-07": "renovation,paint,interior",
  "CAT-08": "roof,house,building",
  "CAT-09": "solar,green,sustainable",
  "CAT-10": "security,safety,building",
  "CAT-11": "blueprint,plan,office",
  "CAT-12": "architecture,render,modern",
  "CAT-13": "survey,measure,site",
  "CAT-14": "construction,modern,architecture",
  "CAT-15": "concrete,steel,factory",
  "CAT-16": "office,building,corporate",
};

// ────────────────────────────────────────────────────────────────────────────
// UNIFIED CATEGORIES (16)
// ────────────────────────────────────────────────────────────────────────────

export const UNIFIED_CATEGORIES: UnifiedCategory[] = [
  { id: "CAT-01", slug: "architecture", name: "Architecture", description: "Architecture firms, design studios, and freelance architects", icon: "Building2", color: "#8b5cf6", professionalCount: 4, serviceCount: 0 },
  { id: "CAT-02", slug: "interior-design", name: "Interior Design", description: "Interior designers, fit-out companies, and specialists", icon: "Palette", color: "#ec4899", professionalCount: 2, serviceCount: 1 },
  { id: "CAT-03", slug: "landscape-outdoor", name: "Landscape & Outdoor", description: "Landscape architects, contractors, and garden designers", icon: "Trees", color: "#10b981", professionalCount: 1, serviceCount: 2 },
  { id: "CAT-04", slug: "structural-engineering", name: "Structural Engineering", description: "Structural design, analysis, and geotechnical engineering", icon: "Compass", color: "#6366f1", professionalCount: 3, serviceCount: 0 },
  { id: "CAT-05", slug: "civil-construction", name: "Civil Engineering & Construction", description: "Civil engineers, general contractors, and builders", icon: "HardHat", color: "#f59e0b", professionalCount: 2, serviceCount: 10 },
  { id: "CAT-06", slug: "mep", name: "MEP Systems", description: "Mechanical, Electrical, Plumbing consultancies and contractors", icon: "Zap", color: "#eab308", professionalCount: 1, serviceCount: 4 },
  { id: "CAT-07", slug: "finishing-trades", name: "Finishing & Interior Trades", description: "Painters, tilers, carpenters, and finishing contractors", icon: "Wrench", color: "#f97316", professionalCount: 0, serviceCount: 10 },
  { id: "CAT-08", slug: "roofing-waterproofing", name: "Roofing & Waterproofing", description: "Roofing and waterproofing specialists", icon: "Umbrella", color: "#0ea5e9", professionalCount: 0, serviceCount: 2 },
  { id: "CAT-09", slug: "sustainability-energy", name: "Sustainability & Energy", description: "Green building, solar, and energy consultants", icon: "Leaf", color: "#22c55e", professionalCount: 4, serviceCount: 0 },
  { id: "CAT-10", slug: "safety-fire-security", name: "Safety, Fire & Security", description: "Fire safety, security, and smart home specialists", icon: "Shield", color: "#ef4444", professionalCount: 1, serviceCount: 3 },
  { id: "CAT-11", slug: "planning-advisory", name: "Planning & Advisory", description: "PMC, QS, urban planning, legal, and RERA consultants", icon: "ClipboardList", color: "#14b8a6", professionalCount: 6, serviceCount: 0 },
  { id: "CAT-12", slug: "visualization-bim", name: "Visualization & BIM", description: "3D visualization, BIM, and VR/AR studios", icon: "Monitor", color: "#a855f7", professionalCount: 3, serviceCount: 0 },
  { id: "CAT-13", slug: "surveying-testing", name: "Surveying & Testing", description: "Land surveyors, inspectors, and material testing labs", icon: "Ruler", color: "#64748b", professionalCount: 0, serviceCount: 1 },
  { id: "CAT-14", slug: "design-build-turnkey", name: "Design-Build & Turnkey", description: "Full-service design-build and renovation contractors", icon: "Package", color: "#d946ef", professionalCount: 1, serviceCount: 1 },
  { id: "CAT-15", slug: "material-suppliers", name: "Material Suppliers", description: "RMC, steel, precast, and building material suppliers", icon: "Truck", color: "#78716c", professionalCount: 0, serviceCount: 4 },
  { id: "CAT-16", slug: "facility-management", name: "Facility Management & Support", description: "Facility management, AMC, and relocation services", icon: "Briefcase", color: "#0891b2", professionalCount: 0, serviceCount: 2 },
];

// ────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL TYPES (27) — Studios & Consultants
// ────────────────────────────────────────────────────────────────────────────

export const PROFESSIONAL_TYPES: ProfessionalType[] = [
  { id: "PRO-001", slug: "architecture-firm", name: "Architecture Firm", subCategory: "Design Studio", categoryIds: ["CAT-01"], offerings: ["Architectural Design", "Facade Design / Engineering", "Heritage / Conservation Design", "Green / Sustainable Building Design"], marketplaceDepts: ["Building Materials", "Building Envelope", "Structure & Civil Works"], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served", "Images", "Videos", "Certifications"] },
  { id: "PRO-002", slug: "boutique-design-studio", name: "Boutique / Niche Design Studio", subCategory: "Design Studio", categoryIds: ["CAT-01"], offerings: ["Architectural Design", "Interior Concept Design"], marketplaceDepts: ["Building Materials", "Interior Surfaces & Finishes"], profileFeatures: ["Portfolio", "Projects", "Team", "Images", "Videos"] },
  { id: "PRO-003", slug: "heritage-conservation-firm", name: "Heritage / Conservation Architecture Firm", subCategory: "Design Studio", categoryIds: ["CAT-01"], offerings: ["Heritage / Conservation Design", "Architectural Design"], marketplaceDepts: ["Repair & Restoration Materials", "Stone & Masonry"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications", "Images", "Videos"] },
  { id: "PRO-004", slug: "green-sustainable-firm", name: "Green / Sustainable Architecture Firm", subCategory: "Design Studio", categoryIds: ["CAT-01", "CAT-09"], offerings: ["Green / Sustainable Building Design", "Architectural Design", "Energy Audit"], marketplaceDepts: ["Energy & Sustainability", "Building Materials"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications", "Images", "Videos"] },
  { id: "PRO-005", slug: "interior-design-firm", name: "Interior Design Firm", subCategory: "Design Studio", categoryIds: ["CAT-02"], offerings: ["Interior Concept Design", "Kitchen & Bath Design", "Lighting Design", "Furniture Design (Custom)", "Exhibition / Stall Design"], marketplaceDepts: ["Furniture & Interiors", "Interior Surfaces & Finishes", "Kitchen & Bathroom"], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served", "Images", "Videos"] },
  { id: "PRO-006", slug: "interior-fitout-company", name: "Interior Fit-out Company", subCategory: "Design Studio", categoryIds: ["CAT-02"], offerings: ["Interior Concept Design", "Modular Furniture & Fitout", "Carpentry & Joinery Work"], marketplaceDepts: ["Furniture & Interiors", "Wood & Timber"], profileFeatures: ["Portfolio", "Projects", "Team", "Images", "Videos"] },
  { id: "PRO-007", slug: "landscape-architecture-firm", name: "Landscape Architecture Firm", subCategory: "Design Studio", categoryIds: ["CAT-03"], offerings: ["Landscape Concept Design"], marketplaceDepts: ["Outdoor & Landscape"], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served", "Images", "Videos"] },
  { id: "PRO-008", slug: "design-build-firm", name: "Design-Build Firm", subCategory: "Design Studio", categoryIds: ["CAT-14"], offerings: ["Architectural Design", "Interior Concept Design", "Turnkey Construction (Residential)", "Turnkey Construction (Commercial)"], marketplaceDepts: ["All Groups"], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served", "Images", "Videos"] },
  { id: "PRO-009", slug: "structural-engineering-firm", name: "Structural Engineering Firm", subCategory: "Engineering Consultancy", categoryIds: ["CAT-04"], offerings: ["Structural Design & Analysis"], marketplaceDepts: ["Structure & Civil Works", "Steel & Metals"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications"] },
  { id: "PRO-010", slug: "civil-engineering-consultancy", name: "Civil Engineering Consultancy", subCategory: "Engineering Consultancy", categoryIds: ["CAT-05"], offerings: ["Water Supply & Distribution Design", "Sewerage & Drainage Design", "Irrigation / Canal Design"], marketplaceDepts: ["Structure & Civil Works", "Plumbing & Water Systems"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications"] },
  { id: "PRO-011", slug: "mep-consultancy", name: "MEP Consultancy", subCategory: "Engineering Consultancy", categoryIds: ["CAT-06"], offerings: ["HVAC System Design", "Electrical System Design", "Plumbing System Design", "Fire Fighting System Design"], marketplaceDepts: ["MEP Systems"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications"] },
  { id: "PRO-012", slug: "geotechnical-lab", name: "Geotechnical / Soil Testing Lab", subCategory: "Engineering Consultancy", categoryIds: ["CAT-04", "CAT-13"], offerings: ["Soil Investigation / Geotechnical Study", "Material Testing"], marketplaceDepts: ["Geotechnical & Foundation"], profileFeatures: ["Portfolio", "Certifications", "Equipment", "Team"] },
  { id: "PRO-013", slug: "seismic-engineering", name: "Seismic / Earthquake Engineering Consultancy", subCategory: "Engineering Consultancy", categoryIds: ["CAT-04"], offerings: ["Structural Design & Analysis"], marketplaceDepts: ["Geotechnical & Foundation"], profileFeatures: ["Portfolio", "Projects", "Team", "Certifications"] },
  { id: "PRO-014", slug: "construction-management-firm", name: "Construction Management Firm", subCategory: "Consultancy", categoryIds: ["CAT-05"], offerings: ["Project Management Consulting"], marketplaceDepts: ["All Groups"], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served"] },
  { id: "PRO-015", slug: "pmc", name: "Project Management Consultancy (PMC)", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["Project Management Consulting", "Feasibility Study & Due Diligence"], marketplaceDepts: [], profileFeatures: ["Portfolio", "Projects", "Team", "Areas Served"] },
  { id: "PRO-016", slug: "quantity-surveying", name: "Quantity Surveying Firm", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["Cost Estimation & BOQ Preparation", "Quantity Surveying & Valuation"], marketplaceDepts: [], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "PRO-017", slug: "urban-planning", name: "Urban Planning Firm", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["Town Planning / Master Planning"], marketplaceDepts: ["Outdoor & Landscape"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "PRO-018", slug: "rera-liaison", name: "RERA / Liaison Consultancy", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["RERA / Liaison & Approval Services"], marketplaceDepts: [], profileFeatures: ["Projects", "Areas Served", "Team"] },
  { id: "PRO-019", slug: "environmental-eia", name: "Environmental / EIA Consultancy", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["Feasibility Study & Due Diligence"], marketplaceDepts: ["Energy & Sustainability"], profileFeatures: ["Projects", "Certifications", "Team"] },
  { id: "PRO-020", slug: "real-estate-legal", name: "Real Estate Legal Consultancy", subCategory: "Consultancy", categoryIds: ["CAT-11"], offerings: ["Legal & Documentation Services"], marketplaceDepts: [], profileFeatures: ["Areas Served", "Team"] },
  { id: "PRO-021", slug: "3d-visualization-studio", name: "3D Visualization Studio", subCategory: "Digital Studio", categoryIds: ["CAT-12"], offerings: ["3D Modeling & Rendering", "3D Walkthrough / Animation", "360° Panorama / VR Experience"], marketplaceDepts: [], profileFeatures: ["Portfolio", "Showreel", "Team"] },
  { id: "PRO-022", slug: "bim-consultancy", name: "BIM Consultancy", subCategory: "Digital Studio", categoryIds: ["CAT-12"], offerings: ["BIM Modeling & Coordination", "4D Construction Simulation"], marketplaceDepts: [], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "PRO-023", slug: "vr-ar-studio", name: "VR / AR Studio", subCategory: "Digital Studio", categoryIds: ["CAT-12"], offerings: ["360° Panorama / VR Experience"], marketplaceDepts: [], profileFeatures: ["Portfolio", "Showreel", "Team"] },
  { id: "PRO-024", slug: "green-building-consultancy", name: "Green Building Consultancy (LEED/GRIHA/IGBC)", subCategory: "Consultancy", categoryIds: ["CAT-09"], offerings: ["Green / Sustainable Building Design", "Energy Audit"], marketplaceDepts: ["Energy & Sustainability"], profileFeatures: ["Certifications", "Projects", "Team"] },
  { id: "PRO-025", slug: "energy-audit-firm", name: "Energy Audit Firm", subCategory: "Consultancy", categoryIds: ["CAT-09"], offerings: ["Energy Audit"], marketplaceDepts: ["Energy & Sustainability"], profileFeatures: ["Certifications", "Projects", "Team"] },
  { id: "PRO-026", slug: "fire-safety-consultancy", name: "Fire Safety Consultancy", subCategory: "Consultancy", categoryIds: ["CAT-10"], offerings: ["Fire Fighting System Design"], marketplaceDepts: ["Safety & Fire Protection"], profileFeatures: ["Projects", "Certifications", "Team"] },
  { id: "PRO-027", slug: "solar-renewable-consultancy", name: "Solar / Renewable Energy Consultancy", subCategory: "Consultancy", categoryIds: ["CAT-09"], offerings: ["Solar / Renewable Energy Installation", "Energy Audit"], marketplaceDepts: ["Energy & Sustainability"], profileFeatures: ["Projects", "Installations", "Team"] },
];

// ────────────────────────────────────────────────────────────────────────────
// SERVICE TYPES (37) — Contractors, Vendors, Suppliers, Support
// ────────────────────────────────────────────────────────────────────────────

export const SERVICE_TYPES: ServiceType[] = [
  { id: "SVC-001", slug: "general-contractor", name: "General Contractor / Builder", subCategory: "General Contractor", categoryIds: ["CAT-05", "CAT-14"], offerings: ["Turnkey Construction (Residential)", "Turnkey Construction (Commercial)"], marketplaceDepts: ["All Groups"], profileFeatures: ["Portfolio", "Projects", "Team", "Equipment", "Areas Served"] },
  { id: "SVC-002", slug: "epc-contractor", name: "EPC Contractor", subCategory: "General Contractor", categoryIds: ["CAT-05", "CAT-14"], offerings: ["Turnkey Construction (Commercial)"], marketplaceDepts: ["All Groups"], profileFeatures: ["Portfolio", "Projects", "Certifications", "Team"] },
  { id: "SVC-003", slug: "renovation-contractor", name: "Renovation / Remodeling Contractor", subCategory: "General Contractor", categoryIds: ["CAT-14"], offerings: ["Renovation / Remodeling"], marketplaceDepts: ["Interior Surfaces & Finishes", "Building Envelope"], profileFeatures: ["Portfolio", "Before/After", "Team"] },
  { id: "SVC-004", slug: "demolition-contractor", name: "Demolition Contractor", subCategory: "General Contractor", categoryIds: ["CAT-05"], offerings: ["Demolition & Dismantling"], marketplaceDepts: ["Hardware, Tools & Services"], profileFeatures: ["Projects", "Certifications", "Equipment", "Team"] },
  { id: "SVC-005", slug: "waterproofing-contractor", name: "Waterproofing Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-08"], offerings: ["Waterproofing & Seepage Treatment"], marketplaceDepts: ["Roofing & Waterproofing"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-006", slug: "piling-contractor", name: "Piling / Foundation Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-05"], offerings: ["Piling & Deep Foundation"], marketplaceDepts: ["Geotechnical & Foundation", "Concrete & Cement"], profileFeatures: ["Portfolio", "Projects", "Equipment", "Team"] },
  { id: "SVC-007", slug: "landscape-contractor", name: "Landscape Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-03"], offerings: ["Landscape Execution"], marketplaceDepts: ["Outdoor & Landscape"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-008", slug: "swimming-pool-contractor", name: "Swimming Pool Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-03"], offerings: ["Swimming Pool Construction"], marketplaceDepts: ["Outdoor & Landscape"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-009", slug: "roofing-contractor", name: "Roofing Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-08"], offerings: ["Roofing Work"], marketplaceDepts: ["Roofing & Waterproofing"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-010", slug: "concreting-contractor", name: "Concreting Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-05"], offerings: ["Concreting & RCC Work"], marketplaceDepts: ["Concrete & Cement"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-011", slug: "steel-erector", name: "Structural Steel Erector", subCategory: "Specialty Contractor", categoryIds: ["CAT-05"], offerings: ["Steel Structure Erection"], marketplaceDepts: ["Steel & Metals"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-012", slug: "precast-concrete", name: "Precast Concrete Company", subCategory: "Specialty Contractor", categoryIds: ["CAT-05", "CAT-15"], offerings: ["Precast Construction"], marketplaceDepts: ["Precast & Modular Construction"], profileFeatures: ["Portfolio", "Products", "Projects", "Team"] },
  { id: "SVC-013", slug: "formwork-scaffolding", name: "Formwork / Scaffolding Company", subCategory: "Specialty Contractor", categoryIds: ["CAT-05"], offerings: ["Scaffolding & Formwork"], marketplaceDepts: ["Hardware, Tools & Services"], profileFeatures: ["Projects", "Equipment", "Team"] },
  { id: "SVC-014", slug: "fire-protection-contractor", name: "Fire Protection Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-10"], offerings: ["Fire Fighting System Installation"], marketplaceDepts: ["Safety & Fire Protection"], profileFeatures: ["Projects", "Certifications", "Team"] },
  { id: "SVC-015", slug: "smart-home-automation", name: "Smart Home / Automation Company", subCategory: "Specialty Contractor", categoryIds: ["CAT-10"], offerings: ["Smart Home / Automation Installation"], marketplaceDepts: ["Smart Home & Automation"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-016", slug: "security-systems", name: "Security Systems Company", subCategory: "Specialty Contractor", categoryIds: ["CAT-10"], offerings: ["Security System Installation"], marketplaceDepts: ["Access Control & Security"], profileFeatures: ["Projects", "Products", "Team"] },
  { id: "SVC-017", slug: "elevator-lift", name: "Elevator / Lift Company", subCategory: "Specialty Contractor", categoryIds: ["CAT-06"], offerings: ["Elevator / Lift Installation"], marketplaceDepts: ["HVAC & Ventilation"], profileFeatures: ["Products", "Projects", "Team"] },
  { id: "SVC-018", slug: "signage-graphics", name: "Signage & Graphics Contractor", subCategory: "Specialty Contractor", categoryIds: ["CAT-07"], offerings: ["Signage & Wayfinding Installation"], marketplaceDepts: ["Hardware, Tools & Services"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-019", slug: "electrical-contractor", name: "Electrical Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-06", "CAT-07"], offerings: ["Electrical Wiring & Installation"], marketplaceDepts: ["Electrical & Wiring"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-020", slug: "plumbing-contractor", name: "Plumbing Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-06", "CAT-07"], offerings: ["Plumbing & Sanitary Installation"], marketplaceDepts: ["Plumbing & Water Systems"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-021", slug: "hvac-contractor", name: "HVAC Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-06"], offerings: ["HVAC Installation"], marketplaceDepts: ["HVAC & Ventilation"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-022", slug: "carpentry-contractor", name: "Carpentry / Joinery Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Carpentry & Joinery Work"], marketplaceDepts: ["Wood & Timber"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-023", slug: "painting-contractor", name: "Painting Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Painting (Interior & Exterior)"], marketplaceDepts: ["Paints, Coatings & Finishes"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-024", slug: "tiling-stone-contractor", name: "Tiling & Stone Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Tiling & Stone Work"], marketplaceDepts: ["Flooring, Tiles & Surfaces"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-025", slug: "false-ceiling-contractor", name: "False Ceiling Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["False Ceiling Installation"], marketplaceDepts: ["Building Materials"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-026", slug: "flooring-contractor", name: "Flooring Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Flooring Installation"], marketplaceDepts: ["Flooring, Tiles & Surfaces"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-027", slug: "glass-aluminium-contractor", name: "Glass & Aluminium Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Glass & Aluminium Work"], marketplaceDepts: ["Glass & Glazing"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-028", slug: "masonry-contractor", name: "Masonry Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-05", "CAT-07"], offerings: ["Masonry / Brickwork"], marketplaceDepts: ["Stone & Masonry"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-029", slug: "welding-fabrication", name: "Welding & Fabrication Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Welding & Fabrication"], marketplaceDepts: ["Steel & Metals"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-030", slug: "bar-bending-contractor", name: "Bar Bending / Steel Fixing Contractor", subCategory: "Trade Contractor", categoryIds: ["CAT-05"], offerings: ["Rebar / Bar Bending & Steel Fixing"], marketplaceDepts: ["Steel & Metals"], profileFeatures: ["Projects", "Team"] },
  { id: "SVC-031", slug: "wallpaper-cladding", name: "Wallpaper / Wall Cladding Installer", subCategory: "Trade Contractor", categoryIds: ["CAT-07"], offerings: ["Wallpaper / Wall Cladding"], marketplaceDepts: ["Paints, Coatings & Finishes"], profileFeatures: ["Portfolio", "Projects", "Team"] },
  { id: "SVC-032", slug: "rmc-supplier", name: "RMC Supplier", subCategory: "Material Supplier", categoryIds: ["CAT-15"], offerings: ["Ready-Mix Concrete Supply"], marketplaceDepts: ["Concrete & Cement"], profileFeatures: ["Products", "Areas Served", "Certifications"] },
  { id: "SVC-033", slug: "steel-peb-company", name: "Steel / PEB Company", subCategory: "Material Supplier", categoryIds: ["CAT-15"], offerings: ["Pre-Engineered Building Supply"], marketplaceDepts: ["Steel & Metals"], profileFeatures: ["Products", "Projects", "Certifications"] },
  { id: "SVC-034", slug: "modular-furniture", name: "Modular Furniture Company", subCategory: "Material Supplier", categoryIds: ["CAT-02", "CAT-15"], offerings: ["Modular Furniture & Fitout"], marketplaceDepts: ["Furniture & Interiors"], profileFeatures: ["Products", "Portfolio", "Showroom"] },
  { id: "SVC-035", slug: "material-testing-lab", name: "Material Testing Lab", subCategory: "Testing Lab", categoryIds: ["CAT-13"], offerings: ["Material Testing"], marketplaceDepts: ["Structure & Civil Works"], profileFeatures: ["Certifications", "Equipment", "Team"] },
  { id: "SVC-036", slug: "facility-management", name: "Facility Management Company", subCategory: "Support Service", categoryIds: ["CAT-16"], offerings: ["Facility Management / AMC"], marketplaceDepts: ["Cleaning & Housekeeping"], profileFeatures: ["Projects", "Areas Served", "Team"] },
  { id: "SVC-037", slug: "packers-movers", name: "Packers & Movers", subCategory: "Support Service", categoryIds: ["CAT-16"], offerings: ["Packers & Movers"], marketplaceDepts: [], profileFeatures: ["Areas Served", "Fleet", "Team"] },
];

// ────────────────────────────────────────────────────────────────────────────
// MOCK REGISTERED ENTITIES
// ────────────────────────────────────────────────────────────────────────────

const CITIES = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "New Delhi", state: "Delhi NCR" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Kochi", state: "Kerala" },
];

const STUDIO_NAME_PARTS_A = ["Atelier", "Studio", "Collective", "Works", "Associates", "Design Co.", "& Partners", "House", "Practice", "Lab"];
const STUDIO_NAME_PARTS_B = ["Raa", "Noesis", "Varuna", "Monsoon", "Ivory", "Saffron", "Archipelago", "Terra", "Meridian", "Obsidian", "Lumen", "Verdant", "Foundry", "Aria", "Kalpa", "Onyx", "Vastu", "Ivory", "Solace", "Prism"];
const CONTRACTOR_PREFIX = ["Sriram", "Vishwakarma", "Maruti", "Anand", "Krishna", "Jain", "Om", "Siddhi", "Trinity", "Elite", "Prime", "Reliable", "Apex", "Gold Standard", "Precision", "Expert", "Metro", "Royal", "Unity", "Skyline"];
const CONTRACTOR_SUFFIX = ["Construction", "Builders", "Contractors", "Enterprises", "Industries", "Works", "Services", "Pvt Ltd", "Group", "Co."];

const TAGLINES_STUDIO = [
  "Contextual architecture rooted in craft and landscape",
  "Material-led design for contemporary living",
  "Timeless interiors with a modernist sensibility",
  "Where engineering precision meets design poetry",
  "Sustainable design for the next century",
  "Boutique practice shaping India's built environment",
  "Heritage-sensitive restoration and adaptive reuse",
  "Biophilic architecture for warm climates",
  "Research-driven design for complex programs",
  "Crafted spaces for discerning clients",
];

const TAGLINES_SERVICE = [
  "Trusted builders since 2008. On-time, on-budget.",
  "Quality workmanship with a 2-year guarantee",
  "Skilled crew, vetted materials, clear quotes",
  "Residential & commercial — any scale",
  "Fixed-price quotes. No surprises.",
  "Fully insured & RERA-compliant contractor",
  "Premium finish work for luxury interiors",
  "24/7 emergency response available",
  "Family-run business with 3 generations of expertise",
  "Certified crew with full safety compliance",
];

const SPECIALIZATIONS_PRO = [
  "Residential", "Commercial", "Hospitality", "Institutional", "Heritage",
  "Sustainable", "Mixed-Use", "Cultural", "Healthcare", "Retail",
  "Boutique Hotels", "Private Villas", "Urban Infill", "Vernacular",
];

const SPECIALIZATIONS_SVC = [
  "Villas", "Apartments", "High-rise", "Offices", "Showrooms",
  "Warehouses", "Hospitality", "Retail fit-out", "Infrastructure", "Factory sheds",
  "Luxury homes", "Mid-segment", "Budget projects",
];

const PRICE_RANGES_PRO = ["₹80-150/sqft", "₹150-300/sqft", "₹300-500/sqft", "₹500-800/sqft", "₹1L+/project", "₹5L+/project"];
const PRICE_RANGES_SVC = ["₹25-40/sqft", "₹40-70/sqft", "₹70-120/sqft", "Quote on request", "₹2L+/unit", "₹50K+/job"];

// Stable hash for picking from arrays
const pick = <T,>(arr: T[], seed: number): T => arr[seed % arr.length];

function studioName(seed: number): string {
  const a = pick(STUDIO_NAME_PARTS_B, seed);
  const b = pick(STUDIO_NAME_PARTS_A, seed * 7 + 3);
  return `${a} ${b}`;
}

function contractorName(seed: number): string {
  const a = pick(CONTRACTOR_PREFIX, seed);
  const b = pick(CONTRACTOR_SUFFIX, seed * 5 + 2);
  return `${a} ${b}`;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildProfiles<T extends { id: string; name: string; categoryIds: string[] }>(
  types: T[],
  kind: "pro" | "svc",
): RegisteredProfile[] {
  const profiles: RegisteredProfile[] = [];
  types.forEach((type, ti) => {
    // 2-3 registered per type
    const count = 2 + (ti % 2);
    for (let i = 0; i < count; i++) {
      const seed = ti * 11 + i * 17 + 1;
      const loc = pick(CITIES, seed);
      const name = kind === "pro" ? studioName(seed) : contractorName(seed);
      const tagline = pick(kind === "pro" ? TAGLINES_STUDIO : TAGLINES_SERVICE, seed);
      const specs = kind === "pro" ? SPECIALIZATIONS_PRO : SPECIALIZATIONS_SVC;
      const prices = kind === "pro" ? PRICE_RANGES_PRO : PRICE_RANGES_SVC;
      const rating = 4.3 + ((seed % 7) * 0.1);
      const avatarSeed = `${kind}-${type.id}-${i}`;
      const categoryId = type.categoryIds[0];
      const keywords = CATEGORY_IMAGE_KEYWORDS[categoryId] || "architecture,building";
      // loremflickr — keyword-tagged stock photos, locked by seed for stability
      const imgLock = ti * 97 + i * 13 + 11;
      const coverImage = `https://loremflickr.com/800/500/${keywords}?lock=${imgLock}`;
      const heroImage = `https://loremflickr.com/1600/900/${keywords}?lock=${imgLock + 1000}`;
      // dicebear shapes — abstract geometric logo marks
      const logoUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${avatarSeed}&backgroundType=gradientLinear&backgroundColor=ff6a3d,6366f1,10b981,f59e0b,8b5cf6,ec4899`;
      const profile: RegisteredProfile = {
        id: `${kind.toUpperCase()}-${type.id}-${i + 1}`,
        slug: slugify(`${name}-${loc.city}-${ti}-${i}`),
        name,
        typeId: type.id,
        typeName: type.name,
        categoryId,
        tagline,
        city: loc.city,
        state: loc.state,
        avatar: logoUrl,
        logoUrl,
        coverImage,
        heroImage,
        rating: Math.round(rating * 10) / 10,
        reviewCount: 18 + (seed * 13) % 220,
        yearsExp: 4 + (seed % 22),
        projectCount: 12 + (seed * 7) % 180,
        teamSize: kind === "pro" ? 4 + (seed % 40) : 6 + (seed % 80),
        verified: seed % 4 !== 0,
        featured: seed % 3 === 0,
        specializations: [pick(specs, seed), pick(specs, seed + 5), pick(specs, seed + 11)],
        priceRange: pick(prices, seed),
        responseTime: pick(["< 1 hr", "< 2 hrs", "< 4 hrs", "Same day"], seed),
      };
      profiles.push(profile);
    }
  });
  return profiles;
}

export const REGISTERED_PROFESSIONALS: RegisteredProfile[] = buildProfiles(PROFESSIONAL_TYPES, "pro");
export const REGISTERED_SERVICES: RegisteredProfile[] = buildProfiles(SERVICE_TYPES, "svc");

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

export function getCategoryById(id: string): UnifiedCategory | undefined {
  return UNIFIED_CATEGORIES.find((c) => c.id === id);
}

export function getProfessionalsByCategory(categoryId: string): RegisteredProfile[] {
  const typeIds = new Set(PROFESSIONAL_TYPES.filter((t) => t.categoryIds.includes(categoryId)).map((t) => t.id));
  return REGISTERED_PROFESSIONALS.filter((p) => typeIds.has(p.typeId));
}

export function getServicesByCategory(categoryId: string): RegisteredProfile[] {
  const typeIds = new Set(SERVICE_TYPES.filter((t) => t.categoryIds.includes(categoryId)).map((t) => t.id));
  return REGISTERED_SERVICES.filter((p) => typeIds.has(p.typeId));
}

export function getCategoriesWithProfessionals(): UnifiedCategory[] {
  return UNIFIED_CATEGORIES.filter((c) =>
    PROFESSIONAL_TYPES.some((t) => t.categoryIds.includes(c.id))
  );
}

export function getCategoriesWithServices(): UnifiedCategory[] {
  return UNIFIED_CATEGORIES.filter((c) =>
    SERVICE_TYPES.some((t) => t.categoryIds.includes(c.id))
  );
}

// Sub-category groupings for Services page tabs
export const SERVICE_SUBCATEGORIES = [
  { id: "general", label: "General Contractors", value: "General Contractor" },
  { id: "specialty", label: "Specialty Contractors", value: "Specialty Contractor" },
  { id: "trade", label: "Trade Contractors", value: "Trade Contractor" },
  { id: "supplier", label: "Material Suppliers", value: "Material Supplier" },
  { id: "testing", label: "Testing Labs", value: "Testing Lab" },
  { id: "support", label: "Support Services", value: "Support Service" },
];

export const PROFESSIONAL_SUBCATEGORIES = [
  { id: "design", label: "Design Studios", value: "Design Studio" },
  { id: "engineering", label: "Engineering Consultancies", value: "Engineering Consultancy" },
  { id: "advisory", label: "Advisory Consultancies", value: "Consultancy" },
  { id: "digital", label: "Digital Studios", value: "Digital Studio" },
];
