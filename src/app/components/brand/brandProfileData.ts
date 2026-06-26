/**
 * Brand profile resolver.
 *
 * The brand microsite previously rendered a single hardcoded "Aditya Birla"
 * dataset for every brand. This module resolves *real, brand-specific* content
 * for whatever id/name the route passes in:
 *
 *   1. Curated brands from mockData.BRANDS (rich, hand-written data).
 *   2. Otherwise, a profile derived from the products catalogue (products.ts).
 *   3. Otherwise, a domain-themed generic profile inferred from the name.
 *
 * Every path returns the same shape, so BrandProfile.tsx is purely presentational.
 */
import { BRANDS } from "../data/mockData";
import { PRODUCTS } from "../../utils/products";
import { getBrandLogo, getBrandAccent } from "../../utils/brandAssets";
import { PRODUCT_IMAGES } from "../../utils/productImages";
import type { StoreLocation } from "../shared/StoreNavigator";

export interface BrandCategoryTag { name: string; desc: string; }
export interface BrandCert { name: string; issuer: string; image: string; verified: boolean; }
export interface BrandProductCategory { name: string; count: number; image: string; }
export interface BrandService { name: string; desc: string; }
export interface BrandCatalogue { name: string; year: string; type: string; category: string; cover: string; }
export interface BrandStat { label: string; value: string; }

export interface BrandProfileData {
  name: string;
  tagline: string;
  category: string;
  location: string;
  website: string;
  rating: number;
  reviews: number;
  est: string;
  accentColor: string;
  bannerImage: string;
  logoImage: string;
  certifications: string[];
  certificationsDetailed: BrandCert[];
  categories: BrandCategoryTag[];
  about: string;
  mission: string;
  stats: BrandStat[];
  materials: BrandService[];
  catalogues: BrandCatalogue[];
  productCategories: BrandProductCategory[];
  stores: StoreLocation[];
  portfolioCategories: any[];
  contact: { email: string; phone: string; hq: string; website: string };
}

type Domain =
  | "cement" | "rmc" | "precast" | "steel" | "tiles" | "paints"
  | "chemicals" | "lighting" | "plywood" | "electrical" | "generic";

// ── image helpers ──────────────────────────────────────────────────────────
// Brand-profile imagery uses the same local, bundled product photos as the
// catalogue, so the page never depends on a live image host loading.
const P = PRODUCT_IMAGES;
const DOMAIN_LOCAL: Record<Domain, string[]> = {
  cement:     [P.cement, P.concrete, P.masonry],
  rmc:        [P.concrete, P.cement, P.rebar],
  precast:    [P.concrete, P.masonry, P.cement],
  steel:      [P.steel, P.rebar, P.concrete],
  tiles:      [P.tiles, P.paint, P.masonry],
  paints:     [P.paint, P.tiles, P.masonry],
  chemicals:  [P.chemicals, P.concrete, P.cement],
  lighting:   [P.lighting, P.lightingCommercial, P.paint],
  plywood:    [P.masonry, P.tiles, P.concrete],
  electrical: [P.lightingCommercial, P.lighting, P.steel],
  generic:    [P.cement, P.concrete, P.masonry],
};
// Pick a local image for a domain, cycling through its set by index.
const dimg = (domain: Domain, i = 0): string => {
  const set = DOMAIN_LOCAL[domain] || DOMAIN_LOCAL.generic;
  return set[Math.abs(i) % set.length];
};

interface Theme {
  banner: string;
  accent: string;
  category: string;
  productImgs: string[];
  portfolioImgs: string[];
  categories: BrandCategoryTag[];
  certs: { name: string; issuer: string }[];
  services: BrandService[];
}

const THEMES: Record<Domain, Theme> = {
  cement: {
    banner: "photo-1416879595882-3373a0480b5b",
    accent: "#d32f2f",
    category: "Cement & Concrete",
    productImgs: ["photo-1589939705384-5185137a7f0f", "photo-1416879595882-3373a0480b5b", "photo-1517089152318-42ec560349c0", "photo-1607400201515-c2c41c07d307"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1545324418-cc1a3fa10c00", "photo-1681216868987-b7268753b81c", "photo-1589939705384-5185137a7f0f"],
    categories: [
      { name: "OPC Cement", desc: "High-strength Ordinary Portland Cement for structural work." },
      { name: "PPC Cement", desc: "Eco-friendly Portland Pozzolana Cement for durable builds." },
      { name: "White Cement", desc: "High-whiteness cement for putty and decorative finishes." },
      { name: "Ready-Mix Concrete", desc: "Consistent, plant-batched concrete delivered on demand." },
      { name: "AAC Blocks", desc: "Lightweight autoclaved blocks with thermal insulation." },
      { name: "Wall Putty", desc: "Smooth, crack-resistant base for premium wall finishes." },
    ],
    certs: [
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "IS 12269 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "GreenPro Certified", issuer: "CII-IGBC" },
      { name: "NABL Tested", issuer: "Accredited Lab" },
    ],
    services: [
      { name: "Material Supply", desc: "Direct supply of premium-grade cement and aggregates." },
      { name: "Technical Consulting", desc: "Mix-design guidance and material selection for complex builds." },
      { name: "On-site QA", desc: "Cube testing and quality assurance support at site." },
      { name: "Logistics Support", desc: "Pan-India dealer network and timely bulk delivery." },
    ],
  },
  rmc: {
    banner: "photo-1517089152318-42ec560349c0",
    accent: "#0288d1",
    category: "Ready-Mix Concrete",
    productImgs: ["photo-1517089152318-42ec560349c0", "photo-1541008022357-e6195d1af8cc", "photo-1589939705384-5185137a7f0f", "photo-1416879595882-3373a0480b5b"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1681216868987-b7268753b81c", "photo-1545324418-cc1a3fa10c00", "photo-1541008022357-e6195d1af8cc"],
    categories: [
      { name: "Standard RMC", desc: "M15–M30 grades for everyday structural concreting." },
      { name: "Pumped Concrete", desc: "Workable mixes engineered for high-rise pumping." },
      { name: "Self-Compacting", desc: "Flowable concrete for congested reinforcement." },
      { name: "High-Strength RMC", desc: "M40+ grades for towers and infrastructure." },
    ],
    certs: [
      { name: "IS 4926 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "QCI-RMCPCS", issuer: "Plant Certification" },
      { name: "NABL Tested", issuer: "Accredited Lab" },
    ],
    services: [
      { name: "Plant-Batched Supply", desc: "Computer-controlled batching for consistent quality." },
      { name: "Mix Design", desc: "Custom mix designs tuned to your project spec." },
      { name: "Site Delivery", desc: "Transit-mixer fleet with scheduled delivery slots." },
      { name: "Pumping Service", desc: "Boom and line pumps for any pour height." },
    ],
  },
  precast: {
    banner: "photo-1541008022357-e6195d1af8cc",
    accent: "#5e35b1",
    category: "Precast Concrete",
    productImgs: ["photo-1541008022357-e6195d1af8cc", "photo-1589939705384-5185137a7f0f", "photo-1607400201515-c2c41c07d307", "photo-1517089152318-42ec560349c0"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1589939705384-5185137a7f0f", "photo-1681216868987-b7268753b81c", "photo-1545324418-cc1a3fa10c00"],
    categories: [
      { name: "Hollow-Core Slabs", desc: "Pre-stressed slabs for rapid floor construction." },
      { name: "Precast Beams", desc: "Factory-cast beams with consistent finish and strength." },
      { name: "Façade Panels", desc: "Architectural precast panels for building envelopes." },
      { name: "Boundary Walls", desc: "Modular precast compound-wall systems." },
    ],
    certs: [
      { name: "IS 2185 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "ISO 14001:2015", issuer: "Environmental Management" },
      { name: "NABL Tested", issuer: "Accredited Lab" },
    ],
    services: [
      { name: "Custom Fabrication", desc: "Precast elements cast to your structural drawings." },
      { name: "Design Support", desc: "Connection detailing and erection methodology." },
      { name: "Transport & Erection", desc: "Specialised handling and on-site installation." },
      { name: "Quality Assurance", desc: "Factory-controlled curing and testing." },
    ],
  },
  steel: {
    banner: "photo-1587293852726-70cdb56c2866",
    accent: "#455a64",
    category: "Steel & Metals",
    productImgs: ["photo-1590496793929-36417d3117de", "photo-1504917595217-d4dc5ebe6122", "photo-1558618666-fcd25c85cd64", "photo-1587293852726-70cdb56c2866"],
    portfolioImgs: ["photo-1681216868987-b7268753b81c", "photo-1589939705384-5185137a7f0f", "photo-1486406146926-c627a92ad1ab", "photo-1504917595217-d4dc5ebe6122"],
    categories: [
      { name: "TMT Bars", desc: "High-tensile Fe500/Fe550 reinforcement bars." },
      { name: "Structural Steel", desc: "H-beams, I-beams, channels and angles." },
      { name: "Steel Plates", desc: "Mild and stainless steel plates for fabrication." },
      { name: "Roofing Sheets", desc: "Colour-coated and galvanised roofing solutions." },
      { name: "Wire Rods", desc: "Quality wire rods for drawing and fabrication." },
    ],
    certs: [
      { name: "IS 1786 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "CRS Certified", issuer: "Corrosion Resistant Steel" },
      { name: "ISO 14001:2015", issuer: "Environmental Management" },
    ],
    services: [
      { name: "Material Supply", desc: "Mill-direct supply of certified structural steel." },
      { name: "Cut & Bend", desc: "Ready-to-use cut-and-bend rebar service." },
      { name: "Custom Fabrication", desc: "Fabricated steel components to specification." },
      { name: "Erection Support", desc: "On-site technical support for steel erection." },
    ],
  },
  tiles: {
    banner: "photo-1600210491892-03d54c0aaf87",
    accent: "#00897b",
    category: "Tiles & Surfaces",
    productImgs: ["photo-1604075698925-5f4a79d05b85", "photo-1600210491892-03d54c0aaf87", "photo-1618221195710-dd6b41faaea6", "photo-1493809842364-78817add7ffb"],
    portfolioImgs: ["photo-1600585154340-be6161a56a0c", "photo-1618221195710-dd6b41faaea6", "photo-1567694876529-44ef2c44ad99", "photo-1512917774080-9991f1c4c750"],
    categories: [
      { name: "Vitrified Tiles", desc: "Low-porosity tiles for floors and high-traffic areas." },
      { name: "Ceramic Wall Tiles", desc: "Design-rich wall tiles for kitchens and baths." },
      { name: "Porcelain Slabs", desc: "Large-format slabs for seamless surfaces." },
      { name: "Outdoor Tiles", desc: "Anti-skid tiles engineered for exteriors." },
      { name: "Sanitaryware", desc: "Premium bathroom suites and fittings." },
    ],
    certs: [
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "IS 13630 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "GreenPro Certified", issuer: "CII-IGBC" },
      { name: "CE Marked", issuer: "European Conformity" },
    ],
    services: [
      { name: "Product Supply", desc: "Wide catalogue across sizes, finishes and designs." },
      { name: "Design Consultation", desc: "Surface and layout guidance for your space." },
      { name: "Sample Library", desc: "Order physical samples before you commit." },
      { name: "Installation Guidance", desc: "Recommended adhesives and laying support." },
    ],
  },
  paints: {
    banner: "photo-1562259949-e8e7689d7828",
    accent: "#f9a825",
    category: "Paints & Coatings",
    productImgs: ["photo-1562259949-e8e7689d7828", "photo-1513467535987-fd81bc7d62f8", "photo-1503387762-592deb58ef4e", "photo-1541888946425-d81bb19240f5"],
    portfolioImgs: ["photo-1600585154340-be6161a56a0c", "photo-1618221195710-dd6b41faaea6", "photo-1545324418-cc1a3fa10c00", "photo-1493809842364-78817add7ffb"],
    categories: [
      { name: "Interior Emulsions", desc: "Washable, low-odour finishes for interior walls." },
      { name: "Exterior Paints", desc: "Weatherproof coatings with long-lasting colour." },
      { name: "Enamels & Primers", desc: "Wood and metal enamels with smooth coverage." },
      { name: "Waterproof Coatings", desc: "Protective coatings for damp-prone surfaces." },
      { name: "Wood Finishes", desc: "Stains and polishes that enhance natural grain." },
    ],
    certs: [
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "GreenPro Eco-Label", issuer: "CII-IGBC" },
      { name: "Low-VOC Certified", issuer: "Indoor Air Quality" },
      { name: "BIS Certified", issuer: "Bureau of Indian Standards" },
    ],
    services: [
      { name: "Colour Consultation", desc: "Expert palettes and visualiser tools for your home." },
      { name: "Surface Solutions", desc: "Putty, primer and topcoat systems that last." },
      { name: "Applicator Network", desc: "Trained painters for a flawless finish." },
      { name: "Project Estimation", desc: "Accurate quantity and budget planning." },
    ],
  },
  chemicals: {
    banner: "photo-1581094288338-2314dddb7ece",
    accent: "#00838f",
    category: "Construction Chemicals",
    productImgs: ["photo-1581094288338-2314dddb7ece", "photo-1541888946425-d81bb19240f5", "photo-1416879595882-3373a0480b5b", "photo-1518005020251-582c788447dd"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1545324418-cc1a3fa10c00", "photo-1681216868987-b7268753b81c", "photo-1600585154340-be6161a56a0c"],
    categories: [
      { name: "Waterproofing", desc: "Membranes and coatings for terraces and basements." },
      { name: "Tile Adhesives", desc: "High-bond adhesives for tiles and stone." },
      { name: "Grouts", desc: "Epoxy and cement grouts in lasting colours." },
      { name: "Admixtures", desc: "Concrete admixtures for strength and workability." },
      { name: "Sealants", desc: "Flexible sealants for joints and gaps." },
    ],
    certs: [
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "ASTM Compliant", issuer: "International Standards" },
      { name: "LEED Contributing", issuer: "Green Building" },
      { name: "BIS Certified", issuer: "Bureau of Indian Standards" },
    ],
    services: [
      { name: "Product Supply", desc: "Full range of construction chemicals from stock." },
      { name: "Application Support", desc: "On-site demonstration and applicator training." },
      { name: "Site Diagnostics", desc: "Leakage and substrate assessment by experts." },
      { name: "Specification Service", desc: "System specs written for your project." },
    ],
  },
  lighting: {
    banner: "photo-1524758631624-e2822e304c36",
    accent: "#fbc02d",
    category: "Lighting & Electricals",
    productImgs: ["photo-1565814329452-e1efa11c5b89", "photo-1513506003901-1e6a229e2d15", "photo-1524758631624-e2822e304c36", "photo-1550985616-10810253b84d"],
    portfolioImgs: ["photo-1600585154340-be6161a56a0c", "photo-1524758631624-e2822e304c36", "photo-1497366216548-37526070297c", "photo-1567694876529-44ef2c44ad99"],
    categories: [
      { name: "LED Bulbs", desc: "Energy-efficient bulbs with long rated life." },
      { name: "Commercial Lighting", desc: "Panels and downlights for offices and retail." },
      { name: "Decorative Lighting", desc: "Filament and accent lighting for ambience." },
      { name: "Outdoor Lighting", desc: "Weatherproof fixtures for façades and gardens." },
      { name: "Smart Lighting", desc: "App- and voice-controlled connected fixtures." },
    ],
    certs: [
      { name: "BEE 5-Star", issuer: "Energy Efficiency" },
      { name: "IS 16102 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "RoHS Compliant", issuer: "Hazardous Substances" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
    ],
    services: [
      { name: "Lighting Design", desc: "Layouts and lux planning for every space." },
      { name: "Product Supply", desc: "Full catalogue of luminaires and fixtures." },
      { name: "Energy Audit", desc: "Retrofit advice to cut lighting energy use." },
      { name: "Installation Support", desc: "Commissioning and after-sales support." },
    ],
  },
  plywood: {
    banner: "photo-1558618666-fcd25c85cd64",
    accent: "#8d6e63",
    category: "Plywood & Panels",
    productImgs: ["photo-1558618666-fcd25c85cd64", "photo-1504917595217-d4dc5ebe6122", "photo-1600585154340-be6161a56a0c", "photo-1518005020251-582c788447dd"],
    portfolioImgs: ["photo-1600585154340-be6161a56a0c", "photo-1618221195710-dd6b41faaea6", "photo-1567694876529-44ef2c44ad99", "photo-1545324418-cc1a3fa10c00"],
    categories: [
      { name: "BWP Plywood", desc: "Boiling-water-proof ply for kitchens and baths." },
      { name: "Block Boards", desc: "Stable block boards for shutters and shelving." },
      { name: "Decorative Veneers", desc: "Natural veneers that showcase real wood grain." },
      { name: "Laminates", desc: "Durable, design-rich laminate surfaces." },
      { name: "Flush Doors", desc: "Engineered doors with consistent finish." },
    ],
    certs: [
      { name: "IS 710 (BWP)", issuer: "Bureau of Indian Standards" },
      { name: "CARB-P2", issuer: "Low Formaldehyde" },
      { name: "FSC Certified", issuer: "Responsible Forestry" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
    ],
    services: [
      { name: "Material Supply", desc: "Full range of ply, boards, veneers and laminates." },
      { name: "Custom Sizing", desc: "Cut-to-size panels for joinery and modular work." },
      { name: "Dealer Network", desc: "Wide distribution with reliable availability." },
      { name: "Technical Guidance", desc: "Selection support for application and load." },
    ],
  },
  electrical: {
    banner: "photo-1581094794329-c8112a89af12",
    accent: "#1565c0",
    category: "Electrical & Wiring",
    productImgs: ["photo-1581094794329-c8112a89af12", "photo-1565814329452-e1efa11c5b89", "photo-1558002038-1055907df827", "photo-1524758631624-e2822e304c36"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1497366216548-37526070297c", "photo-1600585154340-be6161a56a0c", "photo-1581094794329-c8112a89af12"],
    categories: [
      { name: "Wires & Cables", desc: "FR and HRFR wiring for safe installations." },
      { name: "Switches & Sockets", desc: "Modular switches with elegant finishes." },
      { name: "Circuit Protection", desc: "MCBs, RCCBs and distribution boards." },
      { name: "Fans & Appliances", desc: "Energy-rated fans and home appliances." },
    ],
    certs: [
      { name: "IS 694 (BIS)", issuer: "Bureau of Indian Standards" },
      { name: "ISI Marked", issuer: "Indian Standards Institution" },
      { name: "RoHS Compliant", issuer: "Hazardous Substances" },
      { name: "ISO 9001:2015", issuer: "Quality Management" },
    ],
    services: [
      { name: "Product Supply", desc: "Complete wiring and switchgear range." },
      { name: "Load Planning", desc: "Circuit and load design for safe homes." },
      { name: "Electrician Network", desc: "Trained partners for clean installations." },
      { name: "After-Sales Support", desc: "Warranty and replacement assistance." },
    ],
  },
  generic: {
    banner: "photo-1486406146926-c627a92ad1ab",
    accent: "#ff6a3d",
    category: "Building Materials",
    productImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1600585154340-be6161a56a0c", "photo-1545324418-cc1a3fa10c00", "photo-1497366216548-37526070297c"],
    portfolioImgs: ["photo-1486406146926-c627a92ad1ab", "photo-1545324418-cc1a3fa10c00", "photo-1681216868987-b7268753b81c", "photo-1600585154340-be6161a56a0c"],
    categories: [
      { name: "Building Materials", desc: "A comprehensive range of construction materials." },
      { name: "Surfaces & Finishes", desc: "Finishing products for floors and walls." },
      { name: "Fixtures & Fittings", desc: "Quality hardware and fittings for every build." },
      { name: "Project Solutions", desc: "Bundled material solutions for builders." },
    ],
    certs: [
      { name: "ISO 9001:2015", issuer: "Quality Management" },
      { name: "ISO 14001:2015", issuer: "Environmental Management" },
      { name: "BIS Certified", issuer: "Bureau of Indian Standards" },
      { name: "GreenPro Certified", issuer: "CII-IGBC" },
    ],
    services: [
      { name: "Material Supply", desc: "Direct supply of quality building materials." },
      { name: "Technical Consulting", desc: "Product selection and specification guidance." },
      { name: "Custom Solutions", desc: "Tailored material packages for your project." },
      { name: "Installation Support", desc: "On-site support for correct application." },
    ],
  },
};

// ── helpers ────────────────────────────────────────────────────────────────
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function inferDomain(text: string): Domain {
  const t = text.toLowerCase();
  if (/(ready[-\s]?mix|readymix|\brmc\b)/.test(t)) return "rmc";
  if (/precast/.test(t)) return "precast";
  // Word-bounded so "reinforcement" doesn't accidentally match "cement".
  if (/\b(cement|concrete|opc|ppc|psc)\b|birla white|jk white/.test(t)) return "cement";
  if (/(steel|tmt|tiscon|neosteel|\bsail\b|jsw|girder|rebar|reinforcement)/.test(t)) return "steel";
  if (/(tile|ceramic|vitrified|porcelain|kajaria|somany|sanitary|bath)/.test(t)) return "tiles";
  if (/(paint|emulsion|enamel|berger|nerolac|asian paints|coating)/.test(t)) return "paints";
  if (/(waterproof|adhesive|grout|chemical|sealant|admixture|fosroc|sika|dr\.?\s?fixit|pidilite|basf|weber|ardex|laticrete|fixit)/.test(t)) return "chemicals";
  if (/(light|lighting|\bled\b|lumin|havells|philips|wipro|syska|bulb)/.test(t)) return "lighting";
  if (/(ply|plywood|veneer|laminate|greenply|block board|flush door)/.test(t)) return "plywood";
  if (/(electric|wire|cable|switch|mcb)/.test(t)) return "electrical";
  return "generic";
}

function prettyName(raw: string): string {
  if (/[a-z]/.test(raw) && /\s/.test(raw)) return raw; // already a display name
  return raw
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function buildStores(brandName: string, city: string, accent: string): StoreLocation[] {
  const base = { lat: 19.07, lng: 72.87 };
  const types: StoreLocation["type"][] = ["flagship", "showroom", "dealer", "depot"];
  const areas = ["Central", "North", "East", "West"];
  return [0, 1, 2].map((i) => ({
    id: `${slugify(brandName)}-store-${i}`,
    name: `${brandName} ${i === 0 ? "Experience Center" : types[i] === "dealer" ? "Authorised Dealer" : "Stockyard & Depot"}`,
    type: types[i] || "dealer",
    address: `Plot ${12 + i * 7}, ${areas[i]} Industrial Estate`,
    area: `${areas[i]} ${city}`,
    city,
    pincode: `${400000 + i * 51}`,
    phone: `+91 ${22 + i} ${6600 + i * 111} ${5000 + i * 7}`,
    hours: "Mon–Sat 9am–7pm",
    lat: base.lat + i * 0.06,
    lng: base.lng + i * 0.05,
  }));
}

function buildPortfolio(domain: Domain, brandName: string, city: string) {
  const t = THEMES[domain];
  const segments = [
    { name: "Commercial", count: 14, blurb: "office and retail developments" },
    { name: "Residential", count: 22, blurb: "premium homes and townships" },
    { name: "Infrastructure", count: 9, blurb: "public and civic infrastructure" },
  ];
  return segments.map((seg, si) => ({
    name: seg.name,
    count: seg.count,
    image: dimg(domain, si),
    projects: [0, 1].map((pi) => {
      const title = `${seg.name} ${["Project", "Development"][pi]} ${si + 1}.${pi + 1}`;
      return {
        title,
        serviceType: t.services[0].name,
        shortDescription: `${brandName} supplied ${t.category.toLowerCase()} for a landmark ${seg.blurb} project in ${city}.`,
        fullDescription: `A flagship ${seg.name.toLowerCase()} engagement where ${brandName}'s ${t.category.toLowerCase()} were specified end-to-end. The project showcases the brand's quality, technical support, and reliable supply at scale across ${seg.blurb}.`,
        city,
        country: "India",
        duration: `${12 + si * 6} months`,
        area: `${(si + 1) * 120},000 sq.ft`,
        teamSize: `${30 + si * 15} professionals`,
        completionYear: `${2024 - pi}`,
        client: `${["Oberoi", "Lodha", "Prestige", "Brigade", "DLF"][(si + pi) % 5]} Group`,
        backgroundImage: dimg(domain, si + pi),
        status: "Active",
        projectCategory: t.categories[(si + pi) % t.categories.length].name,
        architect: `${["Hafeez Contractor", "RSP Architects", "Morphogenesis", "CP Kukreja", "Sanjay Puri"][(si + pi) % 5]}`,
        materialsUsed: t.categories.slice(0, 3).map((c) => c.name),
        gallery: [0, 1, 2].map((gi) => ({
          type: "image",
          url: dimg(domain, si + pi + gi),
          caption: ["Exterior View", "Detail", "On Site"][gi],
        })),
      };
    }),
  }));
}

function assemble(opts: {
  name: string;
  domain: Domain;
  tagline?: string;
  about?: string;
  website?: string;
  location?: string;
  city?: string;
  rating?: number;
  reviews?: number;
  est?: string;
  accent?: string;
  banner?: string;
  productCategories?: BrandProductCategory[];
  stats?: BrandStat[];
  contact?: { email: string; phone: string; hq: string; website: string };
}): BrandProfileData {
  const t = THEMES[opts.domain];
  // Prefer the brand registry's accent (knows real brands) over the domain default.
  const accent = opts.accent || getBrandAccent(opts.name, t.accent);
  const city = opts.city || (opts.location ? opts.location.split(",")[0].trim() : "Mumbai");
  const website = (opts.website || `www.${slugify(opts.name)}.com`).replace(/^https?:\/\//, "");
  const banner = dimg(opts.domain, 0);
  // Real brand logo (Clearbit/Wikipedia) when known; clean typographic mark otherwise.
  const logoImage = getBrandLogo(opts.name, { size: 240 });

  const productCategories: BrandProductCategory[] =
    opts.productCategories && opts.productCategories.length
      ? opts.productCategories
      : t.categories.slice(0, 4).map((c, i) => ({
          name: c.name,
          count: 18 + ((opts.name.length + i * 7) % 40),
          image: dimg(opts.domain, i),
        }));

  return {
    name: opts.name.toUpperCase(),
    tagline: opts.tagline || `Trusted ${t.category} for India's builders`,
    category: t.category,
    location: opts.location || `${city}, India`,
    website,
    rating: opts.rating ?? 4.6,
    reviews: opts.reviews ?? 200 + (opts.name.length * 37) % 1200,
    est: opts.est || `${1990 - (opts.name.length % 40)}`,
    accentColor: accent,
    bannerImage: banner,
    logoImage,
    certifications: t.certs.map((c) => c.name),
    certificationsDetailed: t.certs.map((c, i) => ({
      name: c.name,
      issuer: c.issuer,
      image: dimg(opts.domain, i + 1),
      verified: true,
    })),
    categories: t.categories,
    about:
      opts.about ||
      `${prettyName(opts.name)} is a trusted name in ${t.category.toLowerCase()}, supplying quality products to architects, builders and homeowners across India. The brand combines reliable manufacturing, a strong distribution network, and technical support to help projects of every scale build with confidence.`,
    mission: `To deliver dependable ${t.category.toLowerCase()} and expert support that help our partners build durable, beautiful and sustainable spaces.`,
    stats: opts.stats || [
      { label: "PRODUCTS", value: `${productCategories.reduce((a, c) => a + c.count, 0)}` },
      { label: "STORES", value: "40+" },
      { label: "PORTFOLIO PROJECTS", value: "45" },
      { label: "YEARS EXPERIENCE", value: `${15 + (opts.name.length % 35)}+` },
    ],
    materials: t.services,
    catalogues: [
      { name: `${prettyName(opts.name)} Product Guide 2025`, year: "2025", type: "Main Catalogue", category: t.category, cover: dimg(opts.domain, 0) },
      { name: `${t.category} Solutions`, year: "2024", type: "Product Focus", category: t.category, cover: dimg(opts.domain, 1) },
    ],
    productCategories,
    stores: buildStores(prettyName(opts.name), city, accent),
    portfolioCategories: buildPortfolio(opts.domain, prettyName(opts.name), city),
    contact:
      opts.contact || {
        email: `sales@${slugify(opts.name)}.com`,
        phone: "+91 22 6600 0000",
        hq: `${city}, India`,
        website,
      },
  };
}

// ── resolution ───────────────────────────────────────────────────────────────
function fromCuratedBrand(b: (typeof BRANDS)[number]): BrandProfileData {
  // Infer from name + category (not subcategories) so a brand literally named
  // "…Cement" maps to cement even when it also lists ready-mix lines.
  const domain = inferDomain(`${b.name} ${b.category}`);
  const t = THEMES[domain];
  const productCategories: BrandProductCategory[] = (b.productCategories || []).map((pc, i) => ({
    name: pc.name,
    count: pc.count,
    image: dimg(domain, i),
  }));
  return assemble({
    name: b.name,
    domain,
    tagline: b.tagline,
    about: b.about,
    website: b.website,
    location: b.location,
    city: b.city,
    rating: b.rating,
    reviews: b.portfolioCount ? b.portfolioCount * 8 : undefined,
    est: b.yearsExp ? `${2026 - b.yearsExp}` : undefined,
    accent: b.accentColor,
    banner: undefined, // use the domain banner (full-bleed, high-res) for the hero
    productCategories: productCategories.length ? productCategories : undefined,
    stats: [
      { label: "PRODUCTS", value: `${b.productCount ?? 120}` },
      { label: "STORES", value: `${b.storeCount ?? 40}` },
      { label: "PORTFOLIO PROJECTS", value: `${b.portfolioCount ?? 45}` },
      { label: "YEARS EXPERIENCE", value: `${b.yearsExp ?? 20}+` },
    ],
    contact: b.contact
      ? { email: b.contact.email, phone: b.contact.phone, hq: b.contact.cityState || b.location, website: (b.website || "").replace(/^https?:\/\//, "") }
      : undefined,
  });
}

function fromProducts(brandName: string): BrandProfileData | null {
  const slug = slugify(brandName);
  const matches = PRODUCTS.filter((p) => {
    const ps = slugify(p.brand);
    return ps === slug || ps.includes(slug) || slug.includes(ps) || p.brand.toLowerCase() === brandName.toLowerCase();
  });
  if (!matches.length) return null;

  const realName = matches[0].brand;
  const domain = inferDomain(`${realName} ${matches[0].category} ${matches[0].subcategory} ${matches[0].materialType || ""}`);
  const t = THEMES[domain];

  // Group products into "product categories" by family / sub-subcategory.
  const groups = new Map<string, number>();
  matches.forEach((p) => {
    const key = p.productFamily || p.subSubcategory || p.subcategory || t.category;
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  const productCategories: BrandProductCategory[] = Array.from(groups.entries())
    .slice(0, 4)
    .map(([name, count], i) => ({
      name: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      count: count * 6 + 6,
      image: dimg(domain, i),
    }));

  return assemble({
    name: realName,
    domain,
    // Use real product families when the brand is well-represented; otherwise
    // fall back to the domain's representative categories (avoids a 1-item list
    // for brands that only have a stray product in the catalogue).
    productCategories: productCategories.length >= 2 ? productCategories : undefined,
    about: `${prettyName(realName)} offers a focused range of ${t.category.toLowerCase()} including ${matches
      .slice(0, 3)
      .map((p) => p.name)
      .join(", ")} and more. Known for dependable quality and availability, the brand serves projects across India with products trusted by builders and contractors alike.`,
    stats:
      [
        { label: "PRODUCTS", value: `${matches.length * 8}` },
        { label: "STORES", value: "35+" },
        { label: "PORTFOLIO PROJECTS", value: "40" },
        { label: "YEARS EXPERIENCE", value: `${18 + (realName.length % 30)}+` },
      ],
  });
}

const _cache = new Map<string, BrandProfileData>();

export function getBrandProfile(idOrName: string): BrandProfileData {
  const input = (idOrName || "").trim();
  if (!input) return assemble({ name: "Material Library Brand", domain: "generic" });
  if (_cache.has(input)) return _cache.get(input)!;

  const slug = slugify(input);

  // 1. curated brand from mockData.BRANDS (by id or name)
  const curated = BRANDS.find(
    (b) => b.id === slug || slugify(b.name) === slug || b.name.toLowerCase() === input.toLowerCase(),
  );
  let result: BrandProfileData;
  if (curated) {
    result = fromCuratedBrand(curated);
  } else {
    // 2. derive from the product catalogue
    const derived = fromProducts(input);
    // 3. generic, domain-themed fallback
    result = derived || assemble({ name: prettyName(input), domain: inferDomain(input) });
  }

  _cache.set(input, result);
  return result;
}
