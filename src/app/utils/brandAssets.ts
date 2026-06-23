// Centralized brand + product imagery for the ML Knowledge Hub mock data set.
//
// - Real-world brand logos come from Clearbit's free Logo API
//   (https://logo.clearbit.com/{domain}), which returns a clean PNG/SVG.
// - Fictional / unknown brands fall back to UI Avatars with the brand's
//   accent colour so they still render a recognisable mark.
// - Product imagery is sourced from category-specific Unsplash photos so
//   cards on the L4/L5/product pages match the product family.
//
// All UI surfaces (HIERARCHY_BRANDS in hierarchyData.ts, BRANDS in
// mockData.ts, MOCK_BRANDS in brand/BrandsPage etc.) should call into
// `getBrandLogo` / `getBrandCover` / `getProductImage` so updates are made
// in one place.

export interface BrandAsset {
  /** Web domain used to fetch the Clearbit logo. */
  domain: string;
  /** Hex accent color used for UI Avatars fallback + tinting. */
  accent: string;
  /** Hero/cover image best matching this brand's main product family. */
  cover: string;
  /** Optional override for the logo URL (used when Clearbit is unreliable). */
  logoOverride?: string;
}

// Normalize a brand name for registry lookup.
function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // strip parenthetical
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// ---------- Category-specific cover photos (Unsplash IDs) ----------
const COVERS = {
  cement: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  concrete: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  rmc: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  steel: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  facade: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  curtainWall: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  rainscreen: "https://images.unsplash.com/photo-1618005821760-a9544b92cc14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  windows: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  tiles: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  paints: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  coatings: "https://images.unsplash.com/photo-1562564055-71e051d33c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  chemicals: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  adhesives: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  bathware: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  hardware: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  plywood: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  electrical: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  lighting: "https://images.unsplash.com/photo-1565538810643-b5bd7d1e1cf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  smartHome: "https://images.unsplash.com/photo-1558002038-bb4237bb0e30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  smartSwitch: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  hvac: "https://images.unsplash.com/photo-1631545806609-c2a785e19b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  pipes: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  glass: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  insulation: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  waterproofing: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  fallback: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
} as const;

// ---------- Brand registry (real-world brands referenced in mock data) ----------
const BRAND_REGISTRY: Record<string, BrandAsset> = {
  // Cement & concrete
  "ultratech cement": { domain: "ultratechcement.com", accent: "#d32f2f", cover: COVERS.cement },
  "ultratech": { domain: "ultratechcement.com", accent: "#d32f2f", cover: COVERS.cement },
  "acc cement": { domain: "acclimited.com", accent: "#1976d2", cover: COVERS.cement },
  "acc": { domain: "acclimited.com", accent: "#1976d2", cover: COVERS.cement },
  "ambuja cement": { domain: "ambujacement.com", accent: "#388e3c", cover: COVERS.cement },
  "ambuja cements": { domain: "ambujacement.com", accent: "#388e3c", cover: COVERS.cement },
  "ambuja": { domain: "ambujacement.com", accent: "#388e3c", cover: COVERS.cement },
  "jk lakshmi cement": { domain: "jklakshmicement.com", accent: "#f57c00", cover: COVERS.cement },
  "jk cement": { domain: "jkcement.com", accent: "#f57c00", cover: COVERS.cement },
  "ramco cements": { domain: "ramcocements.in", accent: "#7b1fa2", cover: COVERS.cement },
  "shree cement": { domain: "shreecement.com", accent: "#d84315", cover: COVERS.cement },
  "birla rmc": { domain: "ultratechcement.com", accent: "#d32f2f", cover: COVERS.rmc },
  "birla rmc ultratech": { domain: "ultratechcement.com", accent: "#d32f2f", cover: COVERS.rmc },
  "rmc readymix": { domain: "rmcreadymix.com", accent: "#0288d1", cover: COVERS.rmc },
  "rmc readymix india": { domain: "rmcreadymix.com", accent: "#0288d1", cover: COVERS.rmc },
  "prestige precast": { domain: "prestigegroup.com", accent: "#5e35b1", cover: COVERS.concrete },
  "prestige precast systems": { domain: "prestigegroup.com", accent: "#5e35b1", cover: COVERS.concrete },
  // Construction chemicals & adhesives
  "fosroc": { domain: "fosroc.com", accent: "#00796b", cover: COVERS.chemicals },
  "fosroc chemicals": { domain: "fosroc.com", accent: "#00796b", cover: COVERS.chemicals },
  "sika": { domain: "sika.com", accent: "#c62828", cover: COVERS.chemicals },
  "sika india": { domain: "sika.com", accent: "#c62828", cover: COVERS.chemicals },
  "pidilite": { domain: "pidilite.com", accent: "#1565c0", cover: COVERS.adhesives },
  // Paints
  "asian paints": { domain: "asianpaints.com", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Asian_Paints_Logo.svg/320px-Asian_Paints_Logo.svg.png", accent: "#e91e63", cover: COVERS.paints },
  "berger paints": { domain: "bergerpaints.com", accent: "#2e7d32", cover: COVERS.paints },
  // Tiles & ceramics
  "kajaria ceramics": { domain: "kajariaceramics.com", accent: "#7b1fa2", cover: COVERS.tiles },
  "kajaria": { domain: "kajariaceramics.com", accent: "#7b1fa2", cover: COVERS.tiles },
  "somany ceramics": { domain: "somanyceramics.com", accent: "#00838f", cover: COVERS.tiles },
  "somany": { domain: "somanyceramics.com", accent: "#00838f", cover: COVERS.tiles },
  // Steel
  "tata steel": { domain: "tatasteel.com", accent: "#1565c0", cover: COVERS.steel },
  "jsw steel": { domain: "jsw.in", accent: "#283593", cover: COVERS.steel },
  // Plywood / interiors
  "greenply": { domain: "greenply.com", accent: "#2e7d32", cover: COVERS.plywood },
  // Windows & glazing
  "saint gobain": { domain: "saint-gobain.com", accent: "#00529c", cover: COVERS.glass },
  "saint-gobain": { domain: "saint-gobain.com", accent: "#00529c", cover: COVERS.glass },
  "schuco": { domain: "schueco.com", accent: "#1565c0", cover: COVERS.curtainWall },
  "alucobond": { domain: "alucobond.com", logoOverride: "https://ui-avatars.com/api/?name=3A&background=1a1a2e&color=fff&size=200&bold=true&format=png", accent: "#1a1a2e", cover: COVERS.rainscreen },
  "alucobond 3a composites": { domain: "alucobond.com", logoOverride: "https://ui-avatars.com/api/?name=3A&background=1a1a2e&color=fff&size=200&bold=true&format=png", accent: "#1a1a2e", cover: COVERS.rainscreen },
  "hunter douglas": { domain: "hunterdouglas.com", accent: "#388e3c", cover: COVERS.facade },
  "fenesta": { domain: "fenesta.com", accent: "#1976d2", cover: COVERS.windows },
  "fenesta dcm shriram": { domain: "fenesta.com", accent: "#1976d2", cover: COVERS.windows },
  // Electricals & smart home
  "legrand": { domain: "legrand.com", accent: "#e65100", cover: COVERS.smartSwitch },
  "legrand india": { domain: "legrand.com", accent: "#e65100", cover: COVERS.smartSwitch },
  "schneider electric": { domain: "se.com", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/SchneiderElectric_Logo.svg/320px-SchneiderElectric_Logo.svg.png", accent: "#2e7d32", cover: COVERS.smartSwitch },
  "havells": { domain: "havells.com", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Havells_Logo.svg/320px-Havells_Logo.svg.png", accent: "#c62828", cover: COVERS.smartSwitch },
  "havells india": { domain: "havells.com", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Havells_Logo.svg/320px-Havells_Logo.svg.png", accent: "#c62828", cover: COVERS.smartSwitch },
  "polycab": { domain: "polycab.com", accent: "#d84315", cover: COVERS.electrical },
  "aeotec": { domain: "aeotec.com", accent: "#0097a7", cover: COVERS.smartHome },
  "fibaro": { domain: "fibaro.com", accent: "#7b1fa2", cover: COVERS.smartHome },
  // Lighting
  "philips lighting": { domain: "lighting.philips.com", accent: "#0066b2", cover: COVERS.lighting },
  "syska led": { domain: "syska.in", accent: "#fbc02d", cover: COVERS.lighting },
  "bajaj electricals": { domain: "bajajelectricals.com", accent: "#283593", cover: COVERS.lighting },
  "wipro lighting": { domain: "wiprolighting.com", accent: "#5e35b1", cover: COVERS.lighting },
  "panasonic india": { domain: "panasonic.com", accent: "#0066cc", cover: COVERS.lighting },
  "orient electric": { domain: "orientelectric.com", accent: "#c62828", cover: COVERS.lighting },
  "eveready lighting": { domain: "evereadyindia.com", accent: "#d32f2f", cover: COVERS.lighting },
  // Hardware
  "hafele india": { domain: "hafele.com", accent: "#212121", cover: COVERS.hardware },
  "hafele": { domain: "hafele.com", accent: "#212121", cover: COVERS.hardware },
  // Architecture / design studios (real)
  "bdp india": { domain: "bdparchitecture.com", logoOverride: "https://ui-avatars.com/api/?name=BDP&background=003082&color=fff&size=200&bold=true&format=png", accent: "#003082", cover: COVERS.facade },
  "mace india": { domain: "macegroup.com", logoOverride: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Mace_Group_logo.svg/320px-Mace_Group_logo.svg.png", accent: "#003087", cover: COVERS.facade },
  "turner townsend india": { domain: "turnerandtownsend.com", logoOverride: "https://ui-avatars.com/api/?name=T%26T&background=e60028&color=fff&size=200&bold=true&format=png", accent: "#e60028", cover: COVERS.concrete },
  // Construction (real)
  "l t construction": { domain: "larsentoubro.com", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Larsen-%26-Toubro-Logo.svg/320px-Larsen-%26-Toubro-Logo.svg.png", accent: "#1e3a5f", cover: COVERS.concrete },
  // Education / institutes (real)
  "igbc training cell": { domain: "igbc.in", logoOverride: "https://ui-avatars.com/api/?name=IGBC&background=2e7d32&color=fff&size=200&bold=true&format=png", accent: "#2e7d32", cover: COVERS.facade },
  "spa delhi": { domain: "spa.ac.in", logoOverride: "https://ui-avatars.com/api/?name=SPA&background=7b1fa2&color=fff&size=200&bold=true&format=png", accent: "#7b1fa2", cover: COVERS.facade },
  "eth z rich": { domain: "ethz.ch", logoOverride: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/ETH_Z%C3%BCrich_Logo.svg/320px-ETH_Z%C3%BCrich_Logo.svg.png", accent: "#1565c0", cover: COVERS.concrete },
  // Fictional studios — distinctive monogram logos (not all-orange)
  "morph design co": { domain: "", logoOverride: "https://ui-avatars.com/api/?name=Morph+Design&background=1e293b&color=fff&size=200&bold=true&format=png", accent: "#1e293b", cover: COVERS.facade },
  "tjp structural consultants": { domain: "", logoOverride: "https://ui-avatars.com/api/?name=TJP&background=1e3a5f&color=fff&size=200&bold=true&format=png", accent: "#1e3a5f", cover: COVERS.concrete },
  "tetrad visuals": { domain: "", logoOverride: "https://ui-avatars.com/api/?name=Tetrad&background=4c1d95&color=fff&size=200&bold=true&format=png", accent: "#4c1d95", cover: COVERS.facade },
  "land design atelier": { domain: "", logoOverride: "https://ui-avatars.com/api/?name=Land+Design&background=14532d&color=fff&size=200&bold=true&format=png", accent: "#14532d", cover: COVERS.facade },
  "ubd studio": { domain: "", logoOverride: "https://ui-avatars.com/api/?name=UBD&background=164e63&color=fff&size=200&bold=true&format=png", accent: "#164e63", cover: COVERS.facade },
};

// Clearbit returns a transparent PNG/SVG sized to the requested size.
function clearbitUrl(domain: string, size = 200): string {
  return `https://logo.clearbit.com/${domain}?size=${size}`;
}

function uiAvatarUrl(name: string, bg = "ff6a3d"): string {
  const safe = encodeURIComponent(name);
  const safeBg = bg.replace(/^#/, "");
  return `https://ui-avatars.com/api/?name=${safe}&background=${safeBg}&color=fff&size=200&bold=true&rounded=false&format=png`;
}

/** Returns the best logo URL for a brand. */
export function getBrandLogo(name: string, opts?: { size?: number }): string {
  const entry = BRAND_REGISTRY[normalize(name)];
  if (entry?.logoOverride) return entry.logoOverride;
  if (entry?.domain) return clearbitUrl(entry.domain, opts?.size ?? 200);
  // Fictional / unknown — fall back to a typographic avatar in brand-accent.
  return uiAvatarUrl(name);
}

/** Returns a category-appropriate cover/hero image for a brand. */
export function getBrandCover(name: string, fallback?: string): string {
  const entry = BRAND_REGISTRY[normalize(name)];
  if (entry?.cover) return entry.cover;
  return fallback ?? COVERS.fallback;
}

/** Returns the registered accent color for a brand (used for UI tinting). */
export function getBrandAccent(name: string, fallback = "#ff6a3d"): string {
  const entry = BRAND_REGISTRY[normalize(name)];
  return entry?.accent ?? fallback;
}

/** Returns true when a real brand asset entry exists. */
export function hasBrandAsset(name: string): boolean {
  return BRAND_REGISTRY[normalize(name)] !== undefined;
}

// ---------- Product image helpers ----------

const PRODUCT_IMAGE_RULES: Array<{ match: RegExp; image: string }> = [
  // Facade / rainscreen / curtain wall
  { match: /(rainscreen|composite-rainscreen|cladding-panels)/, image: COVERS.rainscreen },
  { match: /(curtain-wall|facade|unitized|stick-system|structural-glaz)/, image: COVERS.curtainWall },
  // Windows & doors
  { match: /(window|fenestration|glazing-bead)/, image: COVERS.windows },
  { match: /(door)/, image: COVERS.windows },
  // Tiles & flooring & surfaces
  { match: /(tile|porcelain|ceramic|terrazzo|granite|marble|onyx|slate)/, image: COVERS.tiles },
  // Lighting
  { match: /(smart-lighting|smart-light|led-bulb|downlighter|panel-light|batten|track-light|cove-light)/, image: COVERS.lighting },
  // Smart home
  { match: /(smart-switch|home-automation|building-automation|smart-thermostat|smart-plug|scene-controller|bms)/, image: COVERS.smartSwitch },
  // Electrical
  { match: /(switch|socket|mcb|rcbo|elcb|switchgear|cable|wire)/, image: COVERS.electrical },
  // HVAC
  { match: /(hvac|air-conditioner|chiller|ahu|fcu|vrv|vrf|fan-coil)/, image: COVERS.hvac },
  // Pipes / plumbing
  { match: /(pipe|cpvc|upvc|ppr|hdpe|plumbing)/, image: COVERS.pipes },
  // Bathware
  { match: /(sanitary|wc|water-closet|wash-basin|faucet|shower|mixer|tap|cistern)/, image: COVERS.bathware },
  // Kitchen
  { match: /(kitchen|modular-kitchen|countertop|chimney|hob)/, image: COVERS.kitchen },
  // Cement / concrete / RMC
  { match: /(rmc|ready-mix|concrete|precast)/, image: COVERS.rmc },
  { match: /(cement|opc|ppc|psc)/, image: COVERS.cement },
  // Steel & metals
  { match: /(steel|tmt|rebar|reinforcement)/, image: COVERS.steel },
  // Paints
  { match: /(paint|emulsion|enamel|primer|coating)/, image: COVERS.paints },
  // Waterproofing / chemicals
  { match: /(waterproof|membrane|sealant)/, image: COVERS.waterproofing },
  { match: /(admixture|grout|mortar|epoxy|polyurethane|silicone|adhesive)/, image: COVERS.adhesives },
  // Insulation
  { match: /(insulation|eps|xps|mineral-wool|spray-foam)/, image: COVERS.insulation },
  // Glass
  { match: /(glass|igu|laminated|tempered)/, image: COVERS.glass },
  // Plywood
  { match: /(plywood|veneer|laminate|mdf|hdf|particle-board)/, image: COVERS.plywood },
  // Hardware
  { match: /(hardware|handle|hinge|lock|fastener)/, image: COVERS.hardware },
];

/** Returns a category-appropriate product image given an L4/L5 slug. */
export function getProductImage(l5IdOrName: string, fallback?: string): string {
  const key = l5IdOrName.toLowerCase();
  for (const rule of PRODUCT_IMAGE_RULES) {
    if (rule.match.test(key)) return rule.image;
  }
  return fallback ?? COVERS.fallback;
}

export const COVER_IMAGES = COVERS;
