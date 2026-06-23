// ============================================
// 6-LEVEL HIERARCHY DATA MODEL
// L1 → L2 → L3 → L4 → L5 → L6 (products)
//
// L1–L5 are sourced from `taxonomyGenerated.ts`, which is built from
// `taxonomy.csv` (Marketplace Taxonomy V6). The generated module is the
// single source of truth for the category tree. Regenerate it via:
//   node scripts/generateTaxonomy.mjs
//
// L6 products and BRANDS are still mock data — they reference the L5/L4 ids
// that exist in the generated taxonomy.
// ============================================

import {
  GEN_L1,
  GEN_L2,
  GEN_L3,
  GEN_L4,
  GEN_L5,
  type TaxonomyRow4,
  type TaxonomyRow6,
} from "./taxonomyGenerated";
import {
  getBrandLogo,
  getBrandCover,
  getBrandAccent,
  getProductImage,
} from "../../utils/brandAssets";

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
  /** L5 only: comma-separated domain tags (Arch | Int, etc.) */
  domains?: string;
  /** L5 only: onboarding priority (High / Medium / Low). */
  priority?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  /** Square logo URL (Clearbit / UI Avatars). */
  logo: string;
  coverImage: string;
  rating: number;
  productCount: number;
  city: string;
  region: string;
  accentColor: string;
  tier: "Premium" | "Standard" | "Emerging";
  isFeatured: boolean;
  /** Hierarchy node ids (any level) where this brand should surface. */
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
  /** Parent L5 id from the generated taxonomy. */
  l5Id: string;
}

// ============================================
// L1–L5: derived from taxonomyGenerated
// ============================================
//
// Decorative metadata (icons, colours, hero images) is layered on top of the
// generated rows for L1 only — every other level inherits sensible defaults so
// pages don't need to special-case missing values.

const L1_META: Record<string, { icon: string; color: string; image: string; description: string }> = {
  "building-envelope": {
    icon: "🏢",
    color: "#2a9d8f",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Doors, windows, curtain walls, cladding, roofing, and facade systems for weather-tight building enclosures",
  },
  "building-materials": {
    icon: "🧱",
    color: "#8d6e63",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Bulk construction materials — metals, wood, glass, stone, plastics and composite systems",
  },
  "energy-and-sustainability": {
    icon: "🌱",
    color: "#38b000",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Solar, storage, EV charging, water recycling and carbon-reduction solutions for sustainable building",
  },
  "furniture-and-interiors": {
    icon: "🛋️",
    color: "#795548",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Furniture, lighting, soft furnishings, décor, linen and full interior fit-out products",
  },
  "hardware-tools-and-services": {
    icon: "🛠️",
    color: "#ffb703",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Tools, accessories, decorative hardware, staircases, railings and on-site services",
  },
  "interior-surfaces-and-finishes": {
    icon: "🎨",
    color: "#e63946",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Flooring, tiles, paints, plasters, wallpapers and decorative surface finishes",
  },
  "kitchen-and-bathroom": {
    icon: "🚿",
    color: "#457b9d",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Bathroom fittings, sanitaryware, kitchen systems, modular kitchens and commercial kitchen equipment",
  },
  "mep-systems": {
    icon: "⚡",
    color: "#ff6a3d",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Mechanical, electrical, plumbing, HVAC, smart-home and structured cabling systems",
  },
  "outdoor-and-landscape": {
    icon: "🌳",
    color: "#56c596",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Landscape, hardscape, paving, decking, pool, sports surface and traffic-management systems",
  },
  "safety-and-compliance": {
    icon: "🔒",
    color: "#d62828",
    image: "https://images.unsplash.com/photo-1558002038-bb4237bb0e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Fire protection, access control, CCTV, accessibility and PPE / safety compliance products",
  },
  "structure-and-civil-works": {
    icon: "🏗️",
    color: "#6c757d",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    description: "Concrete, cement, steel, masonry, precast and structural / civil construction systems",
  },
};

function fromRow4(row: TaxonomyRow4, level: 1 | 2 | 3 | 4): HierarchyNode {
  const [id, name, parentId, childCount] = row;
  if (level === 1) {
    const meta = L1_META[id];
    return {
      id,
      name,
      parentId,
      level,
      childCount,
      description: meta?.description ?? name,
      image: meta?.image,
      icon: meta?.icon,
      color: meta?.color,
    };
  }
  return {
    id,
    name,
    parentId,
    level,
    childCount,
    description: name,
  };
}

function fromRow6(row: TaxonomyRow6): HierarchyNode {
  const [id, name, parentId, childCount, domains, priority] = row;
  return {
    id,
    name,
    parentId,
    level: 5,
    childCount,
    description: name,
    domains: domains || undefined,
    priority: priority || undefined,
  };
}

export const L1_DATA: HierarchyNode[] = GEN_L1.map((r) => fromRow4(r, 1));
export const L2_DATA: HierarchyNode[] = GEN_L2.map((r) => fromRow4(r, 2));
export const L3_DATA: HierarchyNode[] = GEN_L3.map((r) => fromRow4(r, 3));
export const L4_DATA: HierarchyNode[] = GEN_L4.map((r) => fromRow4(r, 4));
export const L5_DATA: HierarchyNode[] = GEN_L5.map(fromRow6);

// ============================================
// L6 — PRODUCTS (mock — references real L5 ids from the generated taxonomy)
// ============================================
//
// Description and specs are intentionally rich because they drive what users
// see on /products/:l5Id pages. Images are picked from the centralized
// brandAssets registry so they stay aligned with the product family.
export const L6_PRODUCTS: ProductItem[] = [
  // -------- Composite Rainscreen Panels — Double-Glazed (IGU) --------
  {
    id: "ml-composite-rainscreen-dg-igu-001",
    name: "ML Sky-Wall™ IGU Rainscreen Cassette",
    brand: "ML Brand",
    brandId: "ml-brand",
    price: "₹4,850/sq.ft",
    rating: 4.6,
    reviews: 128,
    image: getProductImage("composite-rainscreen-panels-double-glazed-igu"),
    specs: {
      "Glass Make-up": "8mm Tempered + 16Ar + 8mm Low-E (IGU)",
      "Panel Thickness": "45 mm cassette + 50 mm ventilated cavity",
      "U-Value": "1.10 W/m²K",
      "SHGC": "0.28",
      "Fire Rating": "EN 13501-1 Class A2-s1, d0",
      "Wind Load": "3.5 kPa (tested to EN 13116)",
      "Module Size": "Up to 1,800 × 3,300 mm",
      "Warranty": "10 years system / 25 years coating",
    },
    inStock: true,
    l5Id: "composite-rainscreen-panels-double-glazed-igu",
  },
  {
    id: "alucobond-dg-igu-002",
    name: "Alucobond® A2 IGU Rainscreen Panel",
    brand: "Alucobond (3A Composites)",
    brandId: "alucobond",
    price: "₹5,200/sq.ft",
    rating: 4.8,
    reviews: 245,
    image: getProductImage("composite-rainscreen-panels-double-glazed-igu"),
    specs: {
      "Core": "Mineral-filled non-combustible core (A2-grade)",
      "Glass Make-up": "Double-Glazed IGU, argon-filled",
      "Panel Thickness": "4 mm ACP + 50 mm cassette depth",
      "U-Value": "0.90 W/m²K",
      "Fire Rating": "EN 13501-1 A2-s1, d0",
      "Wind Load": "4.0 kPa",
      "PVDF Coating": "Lumiflon® 70% PVDF, BS EN 12206 Class 2",
      "Standards": "EN 13501-1, ASTM E84, IS 14276",
    },
    inStock: true,
    l5Id: "composite-rainscreen-panels-double-glazed-igu",
  },
  {
    id: "hunter-douglas-igu-003",
    name: "Hunter Douglas QuadroClad® IGU Facade",
    brand: "Hunter Douglas",
    brandId: "hunter-douglas",
    price: "₹6,100/sq.ft",
    rating: 4.7,
    reviews: 189,
    image: getProductImage("composite-rainscreen-panels-double-glazed-igu"),
    specs: {
      "System": "QuadroClad QC10 unitised IGU rainscreen",
      "Panel Thickness": "55 mm sandwich + 12.7 mm IGU lite",
      "U-Value": "0.80 W/m²K",
      "Acoustic Rating": "Rw 38 dB",
      "Fire Rating": "A2-s1, d0",
      "Wind Load": "4.5 kPa (Miami-Dade tested)",
      "Finish": "Architectural PVDF in 28 standard colours",
      "Sustainability": "Cradle-to-Cradle® Silver",
    },
    inStock: true,
    l5Id: "composite-rainscreen-panels-double-glazed-igu",
  },
  // -------- Smart Lighting Switches — Warm White 3000K --------
  {
    id: "ml-smart-lighting-switches-001",
    name: "ML SmartTouch™ 1-Gang Wi-Fi Dimmer (Warm White)",
    brand: "ML Brand",
    brandId: "ml-brand",
    price: "₹3,499",
    rating: 4.5,
    reviews: 312,
    image: getProductImage("smart-lighting-switches-warm-white-3000k"),
    specs: {
      "Form Factor": "Single-gang glass-touch retrofit",
      "Load": "300 W LED / 600 W incandescent",
      "Colour Temp": "Warm White 3000K (tunable 2700–3500K)",
      "Voltage": "110–240 V AC, 50 / 60 Hz",
      "Dimming": "Trailing-edge, 1% min, 200-step",
      "Connectivity": "Wi-Fi 2.4 GHz + BLE",
      "Voice Assistants": "Alexa, Google Assistant, Apple Home",
      "Certifications": "BIS, CE, FCC",
    },
    inStock: true,
    l5Id: "smart-lighting-switches-warm-white-3000k",
  },
  {
    id: "fibaro-switch-003",
    name: "FIBARO Dimmer 2 (Z-Wave Plus)",
    brand: "Fibaro",
    brandId: "fibaro",
    price: "₹5,199",
    rating: 4.8,
    reviews: 423,
    image: getProductImage("smart-lighting-switches-warm-white-3000k"),
    specs: {
      "Module": "In-wall micromodule (behind-switch)",
      "Load": "250 W LED / 500 W incandescent",
      "Colour Temp": "Warm White 3000K (load-independent)",
      "Voltage": "110–240 V AC",
      "Dimming": "Auto-detect leading/trailing edge",
      "Connectivity": "Z-Wave Plus 500-series",
      "Energy Monitoring": "Yes, ±1% accuracy",
      "Certifications": "CE, RoHS, Z-Wave Plus",
    },
    inStock: true,
    l5Id: "smart-lighting-switches-warm-white-3000k",
  },
  // -------- Smart Lighting Switches — Neutral White 4000K --------
  {
    id: "aeotec-smart-switch-002",
    name: "Aeotec Smart Dimmer 7 (Neutral White)",
    brand: "Aeotec",
    brandId: "aeotec",
    price: "₹4,299",
    rating: 4.7,
    reviews: 567,
    image: getProductImage("smart-lighting-switches-neutral-white-4000k"),
    specs: {
      "Form Factor": "In-wall micromodule (700-series)",
      "Load": "250 W LED / 800 W incandescent",
      "Colour Temp": "Neutral White 4000K",
      "Voltage": "100–240 V AC",
      "Dimming": "Auto-detect (leading & trailing edge)",
      "Connectivity": "Z-Wave Plus V2",
      "Range": "150 m line-of-sight",
      "Energy Monitoring": "Yes, real-time + historical",
    },
    inStock: true,
    l5Id: "smart-lighting-switches-neutral-white-4000k",
  },
];

// ============================================
// BRANDS DATA — layerIds reference real generated ids
// ============================================
//
// Logos come from the Clearbit Logo API via getBrandLogo(). For the fictional
// in-house "ML Brand" entry we fall back to UI Avatars. Cover imagery is
// picked from the curated Unsplash photo set in brandAssets.ts so every brand
// shows a category-appropriate hero.
export const HIERARCHY_BRANDS: BrandInfo[] = [
  // Facade / Building Envelope
  {
    id: "ml-brand",
    name: "ML Brand",
    tagline: "Innovation in Every Layer",
    logo: getBrandLogo("ML Brand"),
    coverImage: getBrandCover("ML Brand"),
    rating: 4.6,
    productCount: 340,
    city: "Mumbai",
    region: "National",
    accentColor: "#ff6a3d",
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "building-envelope",
      "doors-and-windows",
      "curtain-wall-and-facade-systems",
      "composite-rainscreen-panels",
      "composite-rainscreen-panels-double-glazed-igu",
      "mep-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
      "smart-lighting-switches-warm-white-3000k",
    ],
  },
  {
    id: "schuco",
    name: "Schuco",
    tagline: "Systems for the Future",
    logo: getBrandLogo("Schuco"),
    coverImage: getBrandCover("Schuco"),
    rating: 4.9,
    productCount: 520,
    city: "Bangalore",
    region: "National",
    accentColor: getBrandAccent("Schuco"),
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-and-windows", "curtain-wall-and-facade-systems", "window-systems-and-frames"],
  },
  {
    id: "alucobond",
    name: "Alucobond (3A Composites)",
    tagline: "The Original Since 1969",
    logo: getBrandLogo("Alucobond"),
    coverImage: getBrandCover("Alucobond"),
    rating: 4.8,
    productCount: 280,
    city: "New Delhi",
    region: "North",
    accentColor: getBrandAccent("Alucobond"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "building-envelope",
      "doors-and-windows",
      "curtain-wall-and-facade-systems",
      "composite-rainscreen-panels",
      "composite-rainscreen-panels-double-glazed-igu",
    ],
  },
  {
    id: "hunter-douglas",
    name: "Hunter Douglas",
    tagline: "Architecture. Reimagined.",
    logo: getBrandLogo("Hunter Douglas"),
    coverImage: getBrandCover("Hunter Douglas"),
    rating: 4.7,
    productCount: 390,
    city: "Mumbai",
    region: "West",
    accentColor: getBrandAccent("Hunter Douglas"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "building-envelope",
      "doors-and-windows",
      "curtain-wall-and-facade-systems",
      "composite-rainscreen-panels",
      "composite-rainscreen-panels-double-glazed-igu",
    ],
  },
  {
    id: "fenesta",
    name: "Fenesta (DCM Shriram)",
    tagline: "India's No.1 Window Brand",
    logo: getBrandLogo("Fenesta"),
    coverImage: getBrandCover("Fenesta"),
    rating: 4.6,
    productCount: 210,
    city: "New Delhi",
    region: "North",
    accentColor: getBrandAccent("Fenesta"),
    tier: "Premium",
    isFeatured: true,
    layerIds: ["building-envelope", "doors-and-windows", "window-systems-and-frames"],
  },
  // MEP / Smart Home
  {
    id: "aeotec",
    name: "Aeotec",
    tagline: "Smart Home Made Simple",
    logo: getBrandLogo("Aeotec"),
    coverImage: getBrandCover("Aeotec"),
    rating: 4.7,
    productCount: 180,
    city: "Bangalore",
    region: "South",
    accentColor: getBrandAccent("Aeotec"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "mep-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
      "smart-lighting-switches-neutral-white-4000k",
    ],
  },
  {
    id: "fibaro",
    name: "Fibaro",
    tagline: "Beautifully Smart Home",
    logo: getBrandLogo("Fibaro"),
    coverImage: getBrandCover("Fibaro"),
    rating: 4.8,
    productCount: 145,
    city: "Mumbai",
    region: "West",
    accentColor: getBrandAccent("Fibaro"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "mep-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
      "smart-lighting-switches-warm-white-3000k",
    ],
  },
  {
    id: "schneider-electric",
    name: "Schneider Electric",
    tagline: "Life Is On",
    logo: getBrandLogo("Schneider Electric"),
    coverImage: getBrandCover("Schneider Electric"),
    rating: 4.7,
    productCount: 850,
    city: "Gurgaon",
    region: "North",
    accentColor: getBrandAccent("Schneider Electric"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "mep-systems",
      "electrical-and-wiring",
      "electrical-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
    ],
  },
  {
    id: "havells",
    name: "Havells India",
    tagline: "Wires That Don't Catch Fire",
    logo: getBrandLogo("Havells India"),
    coverImage: getBrandCover("Havells India"),
    rating: 4.6,
    productCount: 720,
    city: "Noida",
    region: "North",
    accentColor: getBrandAccent("Havells"),
    tier: "Premium",
    isFeatured: true,
    layerIds: [
      "mep-systems",
      "electrical-and-wiring",
      "electrical-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
    ],
  },
  {
    id: "legrand",
    name: "Legrand India",
    tagline: "Specialist in Electrical",
    logo: getBrandLogo("Legrand India"),
    coverImage: getBrandCover("Legrand India"),
    rating: 4.5,
    productCount: 640,
    city: "Mumbai",
    region: "West",
    accentColor: getBrandAccent("Legrand"),
    tier: "Premium",
    isFeatured: false,
    layerIds: [
      "mep-systems",
      "electrical-and-wiring",
      "electrical-systems",
      "smart-home-and-automation",
      "smart-home-and-building-automation",
      "smart-lighting-switches",
    ],
  },
];

// ============================================
// HELPERS — indexed lookups for fast queries
// ============================================

const ALL_LEVELS: HierarchyNode[][] = [L1_DATA, L2_DATA, L3_DATA, L4_DATA, L5_DATA];

let _byId: Map<string, HierarchyNode> | null = null;
let _byParent: Map<string, HierarchyNode[]> | null = null;

function indexById(): Map<string, HierarchyNode> {
  if (_byId) return _byId;
  const m = new Map<string, HierarchyNode>();
  for (const arr of ALL_LEVELS) {
    for (const n of arr) m.set(n.id, n);
  }
  _byId = m;
  return m;
}

function indexByParent(): Map<string, HierarchyNode[]> {
  if (_byParent) return _byParent;
  const m = new Map<string, HierarchyNode[]>();
  for (const arr of ALL_LEVELS) {
    for (const n of arr) {
      const key = n.parentId ?? "__root__";
      const list = m.get(key);
      if (list) list.push(n);
      else m.set(key, [n]);
    }
  }
  _byParent = m;
  return m;
}

export function getNode(id: string): HierarchyNode | undefined {
  return indexById().get(id);
}

export function getChildren(parentId: string): HierarchyNode[] {
  return indexByParent().get(parentId) ?? [];
}

export function getSiblings(nodeId: string): HierarchyNode[] {
  const node = getNode(nodeId);
  if (!node || !node.parentId) return [];
  return getChildren(node.parentId);
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

export function getNodesAtLevel(level: 1 | 2 | 3 | 4 | 5): HierarchyNode[] {
  return ALL_LEVELS[level - 1];
}

export function getBrandsForLayer(nodeId: string): BrandInfo[] {
  return HIERARCHY_BRANDS.filter((b) => b.layerIds.includes(nodeId));
}

export function getProductsForL5(l5Id: string): ProductItem[] {
  return L6_PRODUCTS.filter((p) => p.l5Id === l5Id);
}

/**
 * Returns the set of leaf L5 ids reachable from any node id.
 * Useful for filters that want to roll up a category to "all L5s in subtree".
 */
export function getDescendantL5Ids(nodeId: string): string[] {
  const node = getNode(nodeId);
  if (!node) return [];
  if (node.level === 5) return [node.id];
  const out: string[] = [];
  const stack: string[] = [nodeId];
  while (stack.length) {
    const cur = stack.pop()!;
    const kids = getChildren(cur);
    for (const k of kids) {
      if (k.level === 5) out.push(k.id);
      else stack.push(k.id);
    }
  }
  return out;
}

/**
 * Returns brands that surface anywhere within the subtree rooted at nodeId
 * (i.e. their layerIds intersect the node or any of its descendants).
 */
export function getBrandsForSubtree(nodeId: string): BrandInfo[] {
  const ids = new Set<string>([nodeId, ...getDescendantL5Ids(nodeId)]);
  // walk inner levels too
  const stack: string[] = [nodeId];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const k of getChildren(cur)) {
      ids.add(k.id);
      stack.push(k.id);
    }
  }
  return HIERARCHY_BRANDS.filter((b) => b.layerIds.some((id) => ids.has(id)));
}

// Layer-specific metadata for sections
export const LAYER_META: Record<number, { showMetrics: boolean; showTechnologies: boolean; showNews: boolean; showSelectionCriteria: boolean; showBrandMarketing: boolean }> = {
  1: { showMetrics: false, showTechnologies: false, showNews: false, showSelectionCriteria: false, showBrandMarketing: false },
  2: { showMetrics: false, showTechnologies: true, showNews: true, showSelectionCriteria: false, showBrandMarketing: true },
  3: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
  4: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
  5: { showMetrics: true, showTechnologies: true, showNews: true, showSelectionCriteria: true, showBrandMarketing: true },
};
