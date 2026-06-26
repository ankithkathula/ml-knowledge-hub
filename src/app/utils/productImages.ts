/**
 * Local, category-relevant product imagery.
 *
 * These images are bundled assets (downloaded into src/assets/products) so the
 * app never depends on a live image host loading. Each product is mapped to the
 * most relevant image by its taxonomy/material, replacing the previous random
 * live Unsplash URLs (which showed e.g. a soil scoop for cement).
 */
import cement from "../../assets/products/cement.jpg";
import concrete from "../../assets/products/concrete.jpg";
import steel from "../../assets/products/steel.jpg";
import rebar from "../../assets/products/rebar.jpg";
import chemicals from "../../assets/products/chemicals.jpg";
import paint from "../../assets/products/paint.jpg";
import tiles from "../../assets/products/tiles.jpg";
import lighting from "../../assets/products/lighting.jpg";
import lightingCommercial from "../../assets/products/lighting-commercial.jpg";
import masonry from "../../assets/products/masonry.jpg";

export const PRODUCT_IMAGES = {
  cement, concrete, steel, rebar, chemicals,
  paint, tiles, lighting, lightingCommercial, masonry,
};

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

interface ProductLike {
  category?: string;
  subcategory?: string;
  subSubcategory?: string;
  productType?: string;
  materialType?: string;
  name?: string;
  brand?: string;
}

/** Pick the best local image key for a product from its taxonomy/material. */
export function productImageKey(p: ProductLike): ProductImageKey {
  const hay = [p.subSubcategory, p.subcategory, p.productType, p.materialType, p.category, p.name, p.brand]
    .filter(Boolean).join(" ").toLowerCase();

  // Order matters — most specific first.
  if (/tmt|rebar|reinforcement/.test(hay)) return "rebar";
  if (/steel|beam|channel|angle|\bplate|stainless/.test(hay)) return "steel";
  if (/brick|block|aac|masonry|fly[- ]?ash/.test(hay)) return "masonry";
  if (/tile|ceramic|vitrified|porcelain|sanitary|bath/.test(hay)) return "tiles";
  if (/waterproof|adhesive|grout|sealant|admixture|chemical|membrane|bitumen|epoxy/.test(hay)) return "chemicals";
  if (/ready[- ]?mix|\brmc\b|concrete/.test(hay)) return "concrete";
  if (/cement|\bopc\b|\bppc\b|\bpsc\b|putty/.test(hay)) return "cement";
  if (/paint|emulsion|enamel|primer|coating|putty wall/.test(hay)) return "paint";
  if (/ply|plywood|veneer|laminate|block ?board|flush door|\bmdf\b|timber|wood/.test(hay)) return "masonry";
  if (/glass|glazing|gypsum|\bboard\b|insulation/.test(hay)) return "tiles";
  if (/handle|hinge|lock|fastener|hardware|fitting/.test(hay)) return "steel";
  if (/switch|socket|wire|cable|\bmcb\b|\brccb\b|electric|conduit/.test(hay)) return "lightingCommercial";
  if (/commercial-lighting|panel|downlight|batten/.test(hay)) return "lightingCommercial";
  if (/light|bulb|\bled\b|lamp|filament|decorative/.test(hay)) return "lighting";
  return "cement"; // construction-site fallback
}

/** Resolve a product to its local image URL. */
export function productImage(p: ProductLike): string {
  return PRODUCT_IMAGES[productImageKey(p)];
}

// Related images per key, for a small product-detail gallery (all local).
const RELATED: Record<ProductImageKey, ProductImageKey[]> = {
  cement: ["cement", "concrete", "masonry"],
  concrete: ["concrete", "cement", "rebar"],
  rebar: ["rebar", "steel", "concrete"],
  steel: ["steel", "rebar", "concrete"],
  masonry: ["masonry", "cement", "concrete"],
  tiles: ["tiles", "paint", "masonry"],
  chemicals: ["chemicals", "concrete", "cement"],
  paint: ["paint", "tiles", "masonry"],
  lightingCommercial: ["lightingCommercial", "lighting"],
  lighting: ["lighting", "lightingCommercial"],
};

/** A short local-image gallery for a product (main image first). */
export function productGallery(p: ProductLike): string[] {
  return RELATED[productImageKey(p)].map((k) => PRODUCT_IMAGES[k]);
}
