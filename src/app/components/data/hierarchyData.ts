// ============================================
// 6-LEVEL HIERARCHY DATA MODEL
// L1 (11) → L2 (41) → L3 (195) → L4 (6,330) → L5 (53,717) → L6 (2M+ products)
// ============================================

export interface HierarchyNode {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon?: string;
  parentId: string | null;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  childCount?: number;
  brandCount?: number;
  color?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  coverImage: string;
  rating: number;
  productCount: number;
  city: string;
  region: string;
  accentColor: string;
  tier: "Premium" | "Standard" | "Emerging";
  isFeatured: boolean;
  // Which hierarchy nodes this brand appears on
  layerIds: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  specs: Record<string, string>;
  inStock: boolean;
  l5Id: string;
}

// ============================================
// L1 CATEGORIES (11 items) — Home Page Cards
// ============================================
export const L1_DATA: HierarchyNode[] = [
  {
    id: "building-envelope",
    name: "Building Envelope",
    description: "Doors, windows, curtain walls, cladding, roofing, and facade systems for weather-tight building enclosures",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🏢",
    parentId: null,
    level: 1,
    childCount: 5,
    brandCount: 680,
    color: "#2a9d8f",
  },
  {
    id: "structural-systems",
    name: "Structural Systems",
    description: "Concrete, cement, steel, reinforcement, and structural framing for load-bearing construction",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🏗️",
    parentId: null,
    level: 1,
    childCount: 4,
    brandCount: 520,
    color: "#6c757d",
  },
  {
    id: "mep-systems",
    name: "MEP Systems",
    description: "Mechanical, electrical, plumbing, HVAC, fire safety, and smart building automation systems",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "⚡",
    parentId: null,
    level: 1,
    childCount: 5,
    brandCount: 920,
    color: "#ff6a3d",
  },
  {
    id: "interior-finishes",
    name: "Interior Finishes",
    description: "Flooring, tiles, paints, coatings, wall finishes, and decorative surfaces for interior spaces",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🎨",
    parentId: null,
    level: 1,
    childCount: 4,
    brandCount: 750,
    color: "#e63946",
  },
  {
    id: "wet-areas",
    name: "Wet Areas & Plumbing",
    description: "Bathroom fittings, sanitaryware, kitchen systems, water supply, and drainage solutions",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🚿",
    parentId: null,
    level: 1,
    childCount: 3,
    brandCount: 560,
    color: "#457b9d",
  },
  {
    id: "insulation-protection",
    name: "Insulation & Protection",
    description: "Thermal insulation, waterproofing, acoustic treatment, and fire protection systems",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🛡️",
    parentId: null,
    level: 1,
    childCount: 3,
    brandCount: 310,
    color: "#ffb703",
  },
  {
    id: "furniture-fittings",
    name: "Furniture & Fittings",
    description: "Furniture, joinery, hardware, architectural ironmongery, and modular storage systems",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🛋️",
    parentId: null,
    level: 1,
    childCount: 3,
    brandCount: 650,
    color: "#795548",
  },
  {
    id: "ceiling-partition",
    name: "Ceiling & Partition",
    description: "False ceilings, drywall partitions, acoustic panels, and grid suspension systems",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "📐",
    parentId: null,
    level: 1,
    childCount: 3,
    brandCount: 280,
    color: "#90e0ef",
  },
  {
    id: "outdoor-landscape",
    name: "Outdoor & Landscape",
    description: "Landscaping materials, outdoor furniture, paving, swimming pools, and garden systems",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🌳",
    parentId: null,
    level: 1,
    childCount: 4,
    brandCount: 220,
    color: "#38b000",
  },
  {
    id: "safety-security",
    name: "Safety & Security",
    description: "Fire safety, access control, CCTV, alarm systems, and safety equipment",
    image: "https://images.unsplash.com/photo-1558002038-bb4237bb0e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🔒",
    parentId: null,
    level: 1,
    childCount: 4,
    brandCount: 340,
    color: "#d62828",
  },
  {
    id: "specialty-materials",
    name: "Specialty Materials",
    description: "Green building materials, sustainable products, specialty chemicals, and construction innovations",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    icon: "🔬",
    parentId: null,
    level: 1,
    childCount: 3,
    brandCount: 190,
    color: "#023e8a",
  },
];

// ============================================
// L2 DATA (subset shown — children of L1)
// ============================================
export const L2_DATA: HierarchyNode[] = [
  // --- Building Envelope children ---
  { id: "doors-windows", name: "Doors & Windows", description: "Internal/external doors, uPVC windows, aluminum systems, fire doors", parentId: "building-envelope", level: 2, childCount: 8, brandCount: 260, icon: "🚪" },
  { id: "cladding-facade", name: "Cladding & Facades", description: "Metal cladding, stone cladding, terracotta, and composite facade systems", parentId: "building-envelope", level: 2, childCount: 6, brandCount: 180, icon: "🧱" },
  { id: "roofing-systems", name: "Roofing Systems", description: "Roofing sheets, tiles, skylights, green roofing, and waterproof membranes", parentId: "building-envelope", level: 2, childCount: 5, brandCount: 150, icon: "🏠" },
  { id: "glass-glazing", name: "Glass & Glazing", description: "Architectural glass, laminated glass, IGUs, curtain walls", parentId: "building-envelope", level: 2, childCount: 7, brandCount: 165, icon: "🪟" },
  { id: "sealants-gaskets", name: "Sealants & Gaskets", description: "Weather seals, structural sealants, expansion joints", parentId: "building-envelope", level: 2, childCount: 4, brandCount: 90, icon: "🔧" },

  // --- Structural Systems children ---
  { id: "concrete-cement", name: "Concrete & Cement", description: "Ready-mix concrete, precast elements, cement, admixtures", parentId: "structural-systems", level: 2, childCount: 8, brandCount: 280, icon: "🧱" },
  { id: "steel-metals", name: "Steel & Metals", description: "Structural steel, reinforcement bars, metal decking", parentId: "structural-systems", level: 2, childCount: 6, brandCount: 245, icon: "🔩" },
  { id: "masonry-blocks", name: "Masonry & Blocks", description: "Clay bricks, AAC blocks, concrete blocks, mortar", parentId: "structural-systems", level: 2, childCount: 5, brandCount: 195, icon: "🧱" },
  { id: "wood-timber", name: "Wood & Timber", description: "Hardwood lumber, engineered wood, plywood, MDF", parentId: "structural-systems", level: 2, childCount: 8, brandCount: 220, icon: "🌲" },

  // --- MEP Systems children ---
  { id: "electrical-systems", name: "Electrical Systems", description: "Wiring, switchgear, panels, transformers, and power distribution", parentId: "mep-systems", level: 2, childCount: 7, brandCount: 350, icon: "⚡" },
  { id: "plumbing-water", name: "Plumbing & Water", description: "Pipes, fittings, valves, pumps, and water treatment", parentId: "mep-systems", level: 2, childCount: 6, brandCount: 275, icon: "🔧" },
  { id: "hvac-ventilation", name: "HVAC & Ventilation", description: "Air conditioning, heating, ventilation, and climate control", parentId: "mep-systems", level: 2, childCount: 5, brandCount: 180, icon: "❄️" },
  { id: "fire-safety", name: "Fire Safety Systems", description: "Fire alarms, sprinklers, suppression, and fire doors", parentId: "mep-systems", level: 2, childCount: 4, brandCount: 120, icon: "🔥" },
  { id: "smart-home-automation", name: "Smart Home & Automation", description: "Home automation, building management, IoT sensors, and smart controls", parentId: "mep-systems", level: 2, childCount: 6, brandCount: 210, icon: "🏠" },

  // --- Interior Finishes children ---
  { id: "flooring-tiles", name: "Flooring & Tiles", description: "Porcelain, ceramic, hardwood, vinyl, carpet tiles", parentId: "interior-finishes", level: 2, childCount: 12, brandCount: 380, icon: "🏗️" },
  { id: "paints-coatings", name: "Paints & Coatings", description: "Interior/exterior paints, primers, protective coatings", parentId: "interior-finishes", level: 2, childCount: 8, brandCount: 320, icon: "🎨" },
  { id: "wall-finishes", name: "Wall Finishes", description: "Wallpapers, textured finishes, decorative panels", parentId: "interior-finishes", level: 2, childCount: 5, brandCount: 140, icon: "🖼️" },
  { id: "decorative-surfaces", name: "Decorative Surfaces", description: "Laminates, veneers, solid surfaces, countertops", parentId: "interior-finishes", level: 2, childCount: 6, brandCount: 180, icon: "✨" },

  // --- Wet Areas children ---
  { id: "bathroom-sanitaryware", name: "Bathroom & Sanitaryware", description: "WCs, showers, taps, mixers, bathroom fittings", parentId: "wet-areas", level: 2, childCount: 10, brandCount: 290, icon: "🚿" },
  { id: "kitchen-systems", name: "Kitchen Systems", description: "Modular kitchens, sinks, chimneys, cooking appliances", parentId: "wet-areas", level: 2, childCount: 8, brandCount: 195, icon: "🍳" },
  { id: "drainage-waste", name: "Drainage & Waste", description: "Floor drains, waste pipes, manholes, sewage systems", parentId: "wet-areas", level: 2, childCount: 4, brandCount: 85, icon: "🔧" },

  // Other L1 children (abbreviated)
  { id: "thermal-insulation", name: "Thermal Insulation", description: "EPS, XPS, mineral wool, spray foam insulation", parentId: "insulation-protection", level: 2, childCount: 5, brandCount: 125, icon: "🧵" },
  { id: "waterproofing", name: "Waterproofing", description: "Membranes, coatings, sealants, injection systems", parentId: "insulation-protection", level: 2, childCount: 6, brandCount: 145, icon: "💧" },
  { id: "acoustic-treatment", name: "Acoustic Treatment", description: "Sound absorption, acoustic barriers, vibration isolation", parentId: "insulation-protection", level: 2, childCount: 4, brandCount: 80, icon: "🔇" },

  { id: "furniture-joinery", name: "Furniture & Joinery", description: "Seating, tables, wardrobes, custom joinery", parentId: "furniture-fittings", level: 2, childCount: 12, brandCount: 310, icon: "🛋️" },
  { id: "hardware-ironmongery", name: "Hardware & Ironmongery", description: "Handles, locks, hinges, fasteners", parentId: "furniture-fittings", level: 2, childCount: 14, brandCount: 340, icon: "🔩" },
  { id: "modular-storage", name: "Modular Storage", description: "Shelving, racking, locker systems", parentId: "furniture-fittings", level: 2, childCount: 4, brandCount: 90, icon: "📦" },

  { id: "false-ceilings", name: "False Ceilings", description: "Gypsum boards, metal ceilings, acoustic tiles", parentId: "ceiling-partition", level: 2, childCount: 7, brandCount: 155, icon: "📐" },
  { id: "drywall-partitions", name: "Drywall & Partitions", description: "Gypsum partitions, glass partitions, demountable walls", parentId: "ceiling-partition", level: 2, childCount: 5, brandCount: 95, icon: "🧱" },
  { id: "grid-suspension", name: "Grid & Suspension", description: "T-grid systems, concealed grids, suspension hardware", parentId: "ceiling-partition", level: 2, childCount: 3, brandCount: 45, icon: "📏" },

  { id: "landscaping-materials", name: "Landscaping Materials", description: "Paving, decking, retaining walls, soil systems", parentId: "outdoor-landscape", level: 2, childCount: 6, brandCount: 85, icon: "🌿" },
  { id: "outdoor-furniture", name: "Outdoor Furniture", description: "Garden furniture, poolside, outdoor dining", parentId: "outdoor-landscape", level: 2, childCount: 5, brandCount: 65, icon: "🪑" },
  { id: "swimming-pools", name: "Swimming Pools", description: "Pool construction, filtration, heating, covers", parentId: "outdoor-landscape", level: 2, childCount: 4, brandCount: 40, icon: "🏊" },
  { id: "irrigation-systems", name: "Irrigation Systems", description: "Drip irrigation, sprinklers, smart watering", parentId: "outdoor-landscape", level: 2, childCount: 3, brandCount: 30, icon: "💦" },

  { id: "access-control", name: "Access Control", description: "Biometric, card readers, turnstiles, barriers", parentId: "safety-security", level: 2, childCount: 5, brandCount: 110, icon: "🔑" },
  { id: "surveillance-cctv", name: "Surveillance & CCTV", description: "IP cameras, NVR, video analytics", parentId: "safety-security", level: 2, childCount: 4, brandCount: 95, icon: "📹" },
  { id: "alarm-detection", name: "Alarm & Detection", description: "Intrusion alarms, smoke detectors, gas sensors", parentId: "safety-security", level: 2, childCount: 4, brandCount: 80, icon: "🚨" },
  { id: "safety-equipment", name: "Safety Equipment", description: "PPE, safety barriers, signage, first aid", parentId: "safety-security", level: 2, childCount: 3, brandCount: 55, icon: "🦺" },

  { id: "green-materials", name: "Green Building Materials", description: "Sustainable, recycled, and eco-certified materials", parentId: "specialty-materials", level: 2, childCount: 5, brandCount: 75, icon: "🌱" },
  { id: "construction-chemicals", name: "Construction Chemicals", description: "Admixtures, repair compounds, grouts, adhesives", parentId: "specialty-materials", level: 2, childCount: 6, brandCount: 85, icon: "🧪" },
  { id: "prefab-modular", name: "Prefab & Modular", description: "Prefabricated buildings, modular pods, portable structures", parentId: "specialty-materials", level: 2, childCount: 4, brandCount: 45, icon: "🏭" },
];

// ============================================
// L3 DATA — children of L2 (showing key chains)
// ============================================
export const L3_DATA: HierarchyNode[] = [
  // --- Doors & Windows → L3 ---
  { id: "curtain-wall-facade", name: "Curtain Wall & Facade Systems", description: "Unitized and stick curtain walls, structural glazing, double-skin facades, and rainscreen cladding systems", parentId: "doors-windows", level: 3, childCount: 8, brandCount: 45, icon: "🏢", image: "https://images.unsplash.com/photo-1774099690798-c4fe300374b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "aluminium-windows", name: "Aluminium Windows", description: "Casement, sliding, tilt-turn, and fixed aluminium window systems", parentId: "doors-windows", level: 3, childCount: 6, brandCount: 78, icon: "🪟" },
  { id: "upvc-windows", name: "uPVC Windows & Doors", description: "Energy-efficient uPVC casement, sliding, and French door systems", parentId: "doors-windows", level: 3, childCount: 5, brandCount: 55, icon: "🚪" },
  { id: "wooden-doors", name: "Wooden Doors", description: "Solid wood, engineered wood, flush doors, and panel doors", parentId: "doors-windows", level: 3, childCount: 7, brandCount: 92, icon: "🚪" },
  { id: "fire-doors", name: "Fire Doors", description: "Fire-rated steel, timber, and glass doors with certified ratings", parentId: "doors-windows", level: 3, childCount: 4, brandCount: 35, icon: "🔥" },
  { id: "automatic-doors", name: "Automatic Doors", description: "Sliding, swing, revolving, and folding automatic door systems", parentId: "doors-windows", level: 3, childCount: 5, brandCount: 28, icon: "🔄" },
  { id: "garage-industrial-doors", name: "Garage & Industrial Doors", description: "Roller shutters, sectional doors, high-speed doors", parentId: "doors-windows", level: 3, childCount: 4, brandCount: 32, icon: "🏭" },
  { id: "skylight-roof-windows", name: "Skylight & Roof Windows", description: "Fixed and operable skylights, roof windows, smoke vents", parentId: "doors-windows", level: 3, childCount: 3, brandCount: 22, icon: "☀️" },

  // --- Smart Home & Automation → L3 ---
  { id: "smart-home-building-auto", name: "Smart Home & Building Automation", description: "Complete home automation platforms, BMS, and IoT integration for residential and commercial buildings", parentId: "smart-home-automation", level: 3, childCount: 7, brandCount: 65, icon: "🏠", image: "https://images.unsplash.com/photo-1759647020638-72224b9003b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "smart-security", name: "Smart Security", description: "Smart locks, video doorbells, motion sensors, and integrated security", parentId: "smart-home-automation", level: 3, childCount: 5, brandCount: 48, icon: "🔒" },
  { id: "smart-energy", name: "Smart Energy Management", description: "Smart meters, energy monitors, solar inverters, and EV charging", parentId: "smart-home-automation", level: 3, childCount: 4, brandCount: 35, icon: "🔋" },
  { id: "voice-assistants", name: "Voice Assistants & Hubs", description: "Smart speakers, voice controllers, and central hub systems", parentId: "smart-home-automation", level: 3, childCount: 3, brandCount: 18, icon: "🗣️" },
  { id: "smart-sensors", name: "Smart Sensors", description: "Occupancy, temperature, humidity, air quality, and leak sensors", parentId: "smart-home-automation", level: 3, childCount: 5, brandCount: 40, icon: "📡" },
  { id: "smart-shading", name: "Smart Shading & Blinds", description: "Motorized curtains, smart blinds, automated shading systems", parentId: "smart-home-automation", level: 3, childCount: 3, brandCount: 22, icon: "🪟" },

  // A few more L3s for other L2 nodes (abbreviated)
  { id: "rmc", name: "Ready-Mix Concrete", description: "Factory-batched concrete in standard and specialty grades", parentId: "concrete-cement", level: 3, childCount: 5, brandCount: 85, icon: "🏗️" },
  { id: "precast-concrete", name: "Precast Concrete", description: "Factory-manufactured structural and architectural concrete elements", parentId: "concrete-cement", level: 3, childCount: 4, brandCount: 42, icon: "🧱" },
  { id: "cement-types", name: "Cement Types", description: "OPC, PPC, PSC, white cement, and specialty cements", parentId: "concrete-cement", level: 3, childCount: 6, brandCount: 65, icon: "🏗️" },
];

// ============================================
// L4 DATA — children of L3 (showing key chains)
// ============================================
export const L4_DATA: HierarchyNode[] = [
  // --- Curtain Wall & Facade Systems → L4 ---
  { id: "composite-rainscreen", name: "Composite Rainscreen Panels", description: "Aluminium composite, HPL, fibre cement, and terracotta rainscreen cladding panels with ventilated cavity systems", parentId: "curtain-wall-facade", level: 4, childCount: 6, brandCount: 18, icon: "🧱", image: "https://images.unsplash.com/photo-1618985821760-a9544b92cc14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "unitized-curtain-wall", name: "Unitized Curtain Wall", description: "Factory-assembled curtain wall modules for high-rise buildings", parentId: "curtain-wall-facade", level: 4, childCount: 4, brandCount: 15, icon: "🏢" },
  { id: "stick-curtain-wall", name: "Stick Curtain Wall", description: "Site-assembled mullion and transom curtain wall systems", parentId: "curtain-wall-facade", level: 4, childCount: 3, brandCount: 12, icon: "🏢" },
  { id: "structural-glazing", name: "Structural Glazing", description: "Frameless and semi-frameless structural glass systems", parentId: "curtain-wall-facade", level: 4, childCount: 4, brandCount: 14, icon: "🪟" },
  { id: "double-skin-facade", name: "Double-Skin Facade", description: "Ventilated double-layer facade systems for energy efficiency", parentId: "curtain-wall-facade", level: 4, childCount: 3, brandCount: 8, icon: "🏢" },
  { id: "point-fixed-glazing", name: "Point-Fixed Glazing", description: "Spider fitting and bolt-fixed structural glass systems", parentId: "curtain-wall-facade", level: 4, childCount: 3, brandCount: 10, icon: "🔩" },
  { id: "metal-cladding-panels", name: "Metal Cladding Panels", description: "Zinc, copper, stainless steel, and aluminium panel cladding", parentId: "curtain-wall-facade", level: 4, childCount: 4, brandCount: 16, icon: "🔧" },
  { id: "terracotta-facades", name: "Terracotta Facades", description: "Extruded terracotta and ceramic facade panel systems", parentId: "curtain-wall-facade", level: 4, childCount: 2, brandCount: 6, icon: "🧱" },

  // --- Smart Home & Building Automation → L4 ---
  { id: "smart-lighting-switches", name: "Smart Lighting (Switches)", description: "WiFi, Zigbee, Z-Wave, and Bluetooth smart light switches and dimmers for automated lighting control", parentId: "smart-home-building-auto", level: 4, childCount: 5, brandCount: 32, icon: "💡", image: "https://images.unsplash.com/photo-1570781921561-39a8a5d57313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: "smart-thermostats", name: "Smart Thermostats", description: "Connected thermostats for HVAC control and energy management", parentId: "smart-home-building-auto", level: 4, childCount: 3, brandCount: 18, icon: "🌡️" },
  { id: "smart-plugs-outlets", name: "Smart Plugs & Outlets", description: "WiFi and Zigbee smart plugs, in-wall outlets, and power strips", parentId: "smart-home-building-auto", level: 4, childCount: 3, brandCount: 25, icon: "🔌" },
  { id: "home-automation-hubs", name: "Home Automation Hubs", description: "Central controllers, gateways, and protocol bridges", parentId: "smart-home-building-auto", level: 4, childCount: 3, brandCount: 15, icon: "🏠" },
  { id: "smart-ir-blasters", name: "Smart IR Blasters", description: "Infrared controllers for AC, TV, and legacy appliance automation", parentId: "smart-home-building-auto", level: 4, childCount: 2, brandCount: 12, icon: "📡" },
  { id: "bms-controllers", name: "BMS Controllers", description: "Building management system controllers and software platforms", parentId: "smart-home-building-auto", level: 4, childCount: 4, brandCount: 20, icon: "🖥️" },
  { id: "scene-controllers", name: "Scene Controllers", description: "Multi-button scene panels for preset lighting and ambiance control", parentId: "smart-home-building-auto", level: 4, childCount: 2, brandCount: 14, icon: "🎛️" },
];

// ============================================
// L5 DATA — children of L4 (showing key chains)
// ============================================
export const L5_DATA: HierarchyNode[] = [
  // --- Composite Rainscreen Panels → L5 ---
  { id: "composite-rainscreen-dg-igu", name: "Composite Rainscreen Panels — Double-Glazed (IGU)", description: "Insulated glass unit integrated composite rainscreen panels for superior thermal performance and aesthetics", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 6, icon: "🪟" },
  { id: "composite-rainscreen-acp", name: "Composite Rainscreen — ACP (Aluminium Composite)", description: "Aluminium composite panel rainscreen cladding for commercial and residential facades", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 12, icon: "🧱" },
  { id: "composite-rainscreen-hpl", name: "Composite Rainscreen — HPL (High Pressure Laminate)", description: "Compact HPL panels for weather-resistant ventilated facade systems", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 8, icon: "🧱" },
  { id: "composite-rainscreen-fibre-cement", name: "Composite Rainscreen — Fibre Cement", description: "Fibre cement boards for durable, fire-resistant rainscreen cladding", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 7, icon: "🧱" },
  { id: "composite-rainscreen-ceramic", name: "Composite Rainscreen — Ceramic", description: "Ceramic-faced composite panels for premium architectural facades", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 4, icon: "🧱" },
  { id: "composite-rainscreen-natural-stone", name: "Composite Rainscreen — Natural Stone", description: "Stone-faced composite panels combining natural aesthetics with lightweight structure", parentId: "composite-rainscreen", level: 5, childCount: 0, brandCount: 5, icon: "🪨" },

  // --- Smart Lighting (Switches) → L5 ---
  { id: "smart-lighting-zwave", name: "Smart Lighting — Z-Wave Protocol", description: "Z-Wave based smart switches and dimmers offering mesh networking, low interference, and reliable whole-home lighting control", parentId: "smart-lighting-switches", level: 5, childCount: 0, brandCount: 8, icon: "📡" },
  { id: "smart-lighting-zigbee", name: "Smart Lighting — Zigbee Protocol", description: "Zigbee-based smart switches for mesh-networked lighting automation", parentId: "smart-lighting-switches", level: 5, childCount: 0, brandCount: 14, icon: "📡" },
  { id: "smart-lighting-wifi", name: "Smart Lighting — WiFi", description: "WiFi-connected smart switches requiring no hub for simple installation", parentId: "smart-lighting-switches", level: 5, childCount: 0, brandCount: 22, icon: "📶" },
  { id: "smart-lighting-bluetooth", name: "Smart Lighting — Bluetooth Mesh", description: "Bluetooth mesh smart switches for localized room-level control", parentId: "smart-lighting-switches", level: 5, childCount: 0, brandCount: 10, icon: "📡" },
  { id: "smart-lighting-dali", name: "Smart Lighting — DALI Protocol", description: "DALI-2 and DALI+ certified smart controllers for commercial lighting", parentId: "smart-lighting-switches", level: 5, childCount: 0, brandCount: 6, icon: "🏢" },
];

// ============================================
// L6 — PRODUCTS (mock for the two entries)
// ============================================
export const L6_PRODUCTS: ProductItem[] = [
  // Products for: Composite Rainscreen Panels — Double-Glazed (IGU)
  {
    id: "ml-composite-rainscreen-dg-igu-001",
    name: "ML Brand Composite Rainscreen Panels — Double-Glazed (IGU)",
    brand: "ML Brand",
    brandId: "ml-brand",
    price: "₹4,850/sq.ft",
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Glass Type": "Double-Glazed IGU", "Panel Thickness": "45mm", "U-Value": "1.1 W/m²K", "Fire Rating": "Class A2-s1,d0", "Wind Load": "3.5 kPa" },
    inStock: true,
    l5Id: "composite-rainscreen-dg-igu",
  },
  {
    id: "alucobond-dg-igu-002",
    name: "Alucobond A2 IGU Rainscreen Panel",
    brand: "Alucobond (3A Composites)",
    brandId: "alucobond",
    price: "₹5,200/sq.ft",
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Glass Type": "Double-Glazed IGU", "Panel Thickness": "50mm", "U-Value": "0.9 W/m²K", "Fire Rating": "A2-s1,d0", "Wind Load": "4.0 kPa" },
    inStock: true,
    l5Id: "composite-rainscreen-dg-igu",
  },
  {
    id: "hunter-douglas-igu-003",
    name: "Hunter Douglas QuadroClad IGU",
    brand: "Hunter Douglas",
    brandId: "hunter-douglas",
    price: "₹6,100/sq.ft",
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Glass Type": "Triple-option IGU", "Panel Thickness": "55mm", "U-Value": "0.8 W/m²K", "Fire Rating": "A2-s1,d0", "Wind Load": "4.5 kPa" },
    inStock: true,
    l5Id: "composite-rainscreen-dg-igu",
  },

  // Products for: Smart Lighting — Z-Wave Protocol
  {
    id: "ml-smart-lighting-zwave-001",
    name: "ML Brand Smart Lighting — Z-Wave Protocol",
    brand: "ML Brand",
    brandId: "ml-brand",
    price: "₹3,499",
    rating: 4.5,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Protocol": "Z-Wave Plus (700 Series)", "Load": "600W Incandescent / 200W LED", "Voltage": "110-240V AC", "Range": "100m (open air)", "Dimming": "Yes (trailing edge)" },
    inStock: true,
    l5Id: "smart-lighting-zwave",
  },
  {
    id: "aeotec-zwave-switch-002",
    name: "Aeotec Smart Dimmer 7 (Z-Wave)",
    brand: "Aeotec",
    brandId: "aeotec",
    price: "₹4,299",
    rating: 4.7,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Protocol": "Z-Wave Plus (700 Series)", "Load": "800W Incandescent / 250W LED", "Voltage": "100-240V AC", "Range": "150m (open air)", "Dimming": "Yes (auto-detect)" },
    inStock: true,
    l5Id: "smart-lighting-zwave",
  },
  {
    id: "fibaro-dimmer2-003",
    name: "Fibaro Dimmer 2 Z-Wave",
    brand: "Fibaro",
    brandId: "fibaro",
    price: "₹5,199",
    rating: 4.8,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    specs: { "Protocol": "Z-Wave Plus (500 Series)", "Load": "500W Incandescent / 250W LED", "Voltage": "110-240V AC", "Range": "50m (indoor)", "Dimming": "Yes (leading/trailing)" },
    inStock: true,
    l5Id: "smart-lighting-zwave",
  },
];

// ============================================
// BRANDS DATA — with layerIds mapping
// ============================================
export const HIERARCHY_BRANDS: BrandInfo[] = [
  // Building Envelope / Facade brands
  {
    id: "ml-brand",
    name: "ML Brand",
    tagline: "Innovation in Every Layer",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.6,
    productCount: 340,
    city: "Mumbai",
    region: "National",
    accentColor: "#ff6a3d",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-windows", "curtain-wall-facade", "composite-rainscreen", "composite-rainscreen-dg-igu", "mep-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches", "smart-lighting-zwave"],
  },
  {
    id: "schuco",
    name: "Schuco",
    tagline: "Systems for the Future",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.9,
    productCount: 520,
    city: "Bangalore",
    region: "National",
    accentColor: "#1565c0",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-windows", "curtain-wall-facade", "composite-rainscreen", "unitized-curtain-wall"],
  },
  {
    id: "alucobond",
    name: "Alucobond (3A Composites)",
    tagline: "The Original Since 1969",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.8,
    productCount: 280,
    city: "New Delhi",
    region: "North",
    accentColor: "#d32f2f",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-windows", "curtain-wall-facade", "composite-rainscreen", "composite-rainscreen-dg-igu", "composite-rainscreen-acp"],
  },
  {
    id: "hunter-douglas",
    name: "Hunter Douglas",
    tagline: "Architecture. Reimagined.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.7,
    productCount: 390,
    city: "Mumbai",
    region: "West",
    accentColor: "#388e3c",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-windows", "curtain-wall-facade", "composite-rainscreen", "composite-rainscreen-dg-igu"],
  },
  {
    id: "fenesta",
    name: "Fenesta (DCM Shriram)",
    tagline: "India's No.1 Window Brand",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.6,
    productCount: 210,
    city: "New Delhi",
    region: "North",
    accentColor: "#1976d2",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-windows", "aluminium-windows", "upvc-windows"],
  },
  // MEP / Smart Home brands
  {
    id: "aeotec",
    name: "Aeotec",
    tagline: "Smart Home Made Simple",
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.7,
    productCount: 180,
    city: "Bangalore",
    region: "South",
    accentColor: "#0097a7",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["mep-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches", "smart-lighting-zwave", "smart-lighting-zigbee"],
  },
  {
    id: "fibaro",
    name: "Fibaro",
    tagline: "Beautifully Smart Home",
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.8,
    productCount: 145,
    city: "Mumbai",
    region: "West",
    accentColor: "#7b1fa2",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["mep-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches", "smart-lighting-zwave"],
  },
  {
    id: "schneider-electric",
    name: "Schneider Electric",
    tagline: "Life Is On",
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.7,
    productCount: 850,
    city: "Gurgaon",
    region: "North",
    accentColor: "#2e7d32",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["mep-systems", "electrical-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches", "smart-lighting-wifi", "smart-lighting-zigbee"],
  },
  {
    id: "havells",
    name: "Havells India",
    tagline: "Wires That Don't Catch Fire",
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.6,
    productCount: 720,
    city: "Noida",
    region: "North",
    accentColor: "#c62828",
    tier: "Premium",
    isFeatured: true,
    layerIds: ["mep-systems", "electrical-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches", "smart-lighting-wifi"],
  },
  {
    id: "legrand",
    name: "Legrand India",
    tagline: "Specialist in Electrical",
    coverImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    rating: 4.5,
    productCount: 640,
    city: "Mumbai",
    region: "West",
    accentColor: "#e65100",
    tier: "Premium",
    isFeatured: false,
    layerIds: ["mep-systems", "electrical-systems", "smart-home-automation", "smart-home-building-auto", "smart-lighting-switches"],
  },
];

// ============================================
// HELPER: Get children by parentId & level
// ============================================
function getAllData(): HierarchyNode[] {
  return [...L1_DATA, ...L2_DATA, ...L3_DATA, ...L4_DATA, ...L5_DATA];
}

export function getChildren(parentId: string): HierarchyNode[] {
  return getAllData().filter((n) => n.parentId === parentId);
}

export function getNode(id: string): HierarchyNode | undefined {
  return getAllData().find((n) => n.id === id);
}

export function getBreadcrumb(nodeId: string): HierarchyNode[] {
  const trail: HierarchyNode[] = [];
  let current = getNode(nodeId);
  while (current) {
    trail.unshift(current);
    current = current.parentId ? getNode(current.parentId) : undefined;
  }
  return trail;
}

export function getBrandsForLayer(nodeId: string): BrandInfo[] {
  return HIERARCHY_BRANDS.filter((b) => b.layerIds.includes(nodeId));
}

export function getProductsForL5(l5Id: string): ProductItem[] {
  return L6_PRODUCTS.filter((p) => p.l5Id === l5Id);
}

export function getSiblings(nodeId: string): HierarchyNode[] {
  const node = getNode(nodeId);
  if (!node || !node.parentId) return [];
  return getAllData().filter((n) => n.parentId === node.parentId);
}

// Layer-specific metadata for sections
export const LAYER_META: Record<number, { showMetrics: boolean; showTechnologies: boolean; showNews: boolean; showSelectionCriteria: boolean; showBrandMarketing: boolean }> = {
  1: { showMetrics: false, showTechnologies: false, showNews: false, showSelectionCriteria: false, showBrandMarketing: false },
  2: { showMetrics: false, showTechnologies: true, showNews: true, showSelectionCriteria: false, showBrandMarketing: true },
  3: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
  4: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
  5: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
};