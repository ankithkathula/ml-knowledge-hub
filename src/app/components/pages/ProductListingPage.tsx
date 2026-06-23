import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronRight, Star, Filter, Grid, List as ListIcon,
  Package, ShoppingBag, Heart, ChevronDown, Building2, Search,
  SlidersHorizontal, X, Share2, Plus, ArrowRight,
} from "lucide-react";
import {
  getNode, getBreadcrumb, getProductsForL5, getBrandsForLayer,
  type ProductItem,
} from "../data/hierarchyData";

function ProductCard({ product, viewMode }: { product: ProductItem; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="glass-card flex gap-5 group" style={{ padding: "16px 20px" }}>
        <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600 }}>{product.brand}</p>
              <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{product.name}</h3>
            </div>
            <button className="p-2 rounded-lg hover:bg-orange-50 transition-colors">
              <Heart className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.rating}</span>
              <span style={{ color: "var(--text-muted)" }}>({product.reviews})</span>
            </span>
            <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 600, background: product.inStock ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: product.inStock ? "#059669" : "#dc2626" }}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
              <span key={key} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
                {key}: {val}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>{product.price}</span>
            <button className="btn-primary" style={{ padding: "7px 16px", fontSize: "0.78rem" }}>
              <ShoppingBag className="w-3.5 h-3.5" /> Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gl-card group overflow-hidden" style={{ padding: 0 }}>
      <div className="relative h-44 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow-sm hover:bg-orange-50 transition-colors">
          <Heart className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
        </button>
        {product.inStock && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full" style={{ fontSize: "0.6rem", fontWeight: 700, background: "rgba(16,185,129,0.9)", color: "#fff" }}>
            In Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p style={{ fontSize: "0.68rem", color: "var(--accent)", fontWeight: 600, marginBottom: 2 }}>{product.brand}</p>
        <h3 className="line-clamp-2 mb-2" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{product.rating}</span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>({product.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <span key={key} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.6rem", background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
              {key}: {val}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>{product.price}</span>
          <button className="btn-primary" style={{ padding: "6px 14px", fontSize: "0.72rem" }}>Get Quote</button>
        </div>
      </div>
    </div>
  );
}

/* ============ FILTER SIDEBAR ============ */
function FilterSidebar({ products, brands, activeFilters, onFilterChange }: {
  products: ProductItem[];
  brands: { id: string; name: string }[];
  activeFilters: { brand: string[]; inStock: boolean | null; minRating: number | null };
  onFilterChange: (filters: any) => void;
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ brand: true, stock: true, rating: true, price: true });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const uniqueBrands = [...new Set(products.map(p => p.brand))].sort();
  const ratingOptions = [4, 3, 2];

  return (
    <div style={{ width: 224, flexShrink: 0, position: "sticky", top: 120, alignSelf: "flex-start", maxHeight: "calc(100vh - 140px)" }}>
      <div className="gl-card" style={{ padding: "0", overflowY: "auto", maxHeight: "calc(100vh - 140px)" }}>
        <div className="flex items-center justify-between" style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" style={{ color: "#ff6a3d" }} />
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Filters</h3>
          </div>
          {(activeFilters.brand.length > 0 || activeFilters.inStock !== null || activeFilters.minRating !== null) && (
            <button
              onClick={() => onFilterChange({ brand: [], inStock: null, minRating: null })}
              style={{ fontSize: "0.68rem", color: "#ff6a3d", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Brand Filter */}
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <button onClick={() => toggleSection("brand")} className="w-full flex items-center justify-between" style={{ padding: "12px 16px", background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>Brand</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--text-muted)", transform: expandedSections.brand ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {expandedSections.brand && (
            <div style={{ padding: "0 16px 12px" }} className="space-y-1.5">
              {uniqueBrands.slice(0, 8).map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  <input
                    type="checkbox"
                    checked={activeFilters.brand.includes(brand)}
                    onChange={() => {
                      const newBrands = activeFilters.brand.includes(brand)
                        ? activeFilters.brand.filter(b => b !== brand)
                        : [...activeFilters.brand, brand];
                      onFilterChange({ ...activeFilters, brand: newBrands });
                    }}
                    className="rounded"
                    style={{ accentColor: "#ff6a3d", width: 14, height: 14 }}
                  />
                  <span className="truncate">{brand}</span>
                  <span className="ml-auto" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                    {products.filter(p => p.brand === brand).length}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Stock Filter */}
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <button onClick={() => toggleSection("stock")} className="w-full flex items-center justify-between" style={{ padding: "12px 16px", background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>Availability</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--text-muted)", transform: expandedSections.stock ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {expandedSections.stock && (
            <div style={{ padding: "0 16px 12px" }} className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                <input
                  type="checkbox"
                  checked={activeFilters.inStock === true}
                  onChange={() => onFilterChange({ ...activeFilters, inStock: activeFilters.inStock === true ? null : true })}
                  style={{ accentColor: "#ff6a3d", width: 14, height: 14 }}
                />
                In Stock Only
                <span className="ml-auto" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                  {products.filter(p => p.inStock).length}
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <button onClick={() => toggleSection("rating")} className="w-full flex items-center justify-between" style={{ padding: "12px 16px", background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>Rating</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--text-muted)", transform: expandedSections.rating ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {expandedSections.rating && (
            <div style={{ padding: "0 16px 12px" }} className="space-y-1.5">
              {ratingOptions.map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  <input
                    type="radio"
                    name="rating"
                    checked={activeFilters.minRating === r}
                    onChange={() => onFilterChange({ ...activeFilters, minRating: activeFilters.minRating === r ? null : r })}
                    style={{ accentColor: "#ff6a3d", width: 14, height: 14 }}
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1">& up</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Placeholder */}
        <div>
          <button onClick={() => toggleSection("price")} className="w-full flex items-center justify-between" style={{ padding: "12px 16px", background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>Price Range</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--text-muted)", transform: expandedSections.price ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {expandedSections.price && (
            <div style={{ padding: "0 16px 12px" }} className="space-y-2">
              <div className="flex gap-2">
                <input placeholder="Min" className="w-full px-2 py-1.5 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.72rem", background: "rgba(255,255,255,0.8)", outline: "none" }} />
                <input placeholder="Max" className="w-full px-2 py-1.5 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.72rem", background: "rgba(255,255,255,0.8)", outline: "none" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductListingPage() {
  const { l5Id } = useParams<{ l5Id: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ brand: string[]; inStock: boolean | null; minRating: number | null }>({ brand: [], inStock: null, minRating: null });

  const node = getNode(l5Id || "");
  const breadcrumb = l5Id ? getBreadcrumb(l5Id) : [];
  const products = l5Id ? getProductsForL5(l5Id) : [];
  const brands = l5Id ? getBrandsForLayer(l5Id) : [];
  const parentNode = node?.parentId ? getNode(node.parentId) : null;

  if (!node) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Products not found</h1>
          <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Apply filters
  let filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (activeFilters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(p => activeFilters.brand.includes(p.brand));
  }
  if (activeFilters.inStock === true) {
    filteredProducts = filteredProducts.filter(p => p.inStock);
  }
  if (activeFilters.minRating !== null) {
    filteredProducts = filteredProducts.filter(p => p.rating >= activeFilters.minRating!);
  }

  // Sort
  if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].reverse();
  }

  const activeFilterCount = activeFilters.brand.length + (activeFilters.inStock ? 1 : 0) + (activeFilters.minRating ? 1 : 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ===== BANNER — light style matching hierarchy pages ===== */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #f5f7fb 50%, #fdf4ef 100%)" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] opacity-20" style={{ background: "radial-gradient(ellipse, rgba(255,106,61,0.25) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-5 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            <Link to="/" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }} className="hover:text-orange-500 transition-colors">Home</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.id} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                {i === breadcrumb.length - 1 ? (
                  <Link to={`/layer/${crumb.id}`} style={{ fontSize: "0.78rem", color: "var(--text-muted)" }} className="hover:text-orange-500 transition-colors">{crumb.name}</Link>
                ) : (
                  <Link to={crumb.level === 1 ? "/" : `/layer/${crumb.id}`} style={{ fontSize: "0.78rem", color: "var(--text-muted)" }} className="hover:text-orange-500 transition-colors">{crumb.name}</Link>
                )}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>Products</span>
            </span>
          </div>

          <div className="flex gap-8 items-start">
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "#10b981", color: "#fff" }}>Products</span>
                <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 500, background: "rgba(0,0,0,0.06)", color: "var(--text-secondary)", border: "1px solid rgba(0,0,0,0.08)" }}>L6 - Product Listing</span>
              </div>

              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 12 }}>{node.name} — Products</h1>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 600 }}>{node.description}</p>

              <div className="flex items-center gap-8 mt-6">
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ff6a3d" }}>{products.length}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Products</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ff6a3d" }}>{brands.length}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Brands</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ff6a3d" }}>{products.filter(p => p.inStock).length}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>In Stock</div>
                </div>
              </div>
            </div>

            {/* Quick facts card */}
            <div className="w-[280px] flex-shrink-0" style={{ background: "rgba(255,255,255,0.92)", borderRadius: "var(--r-md)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: "20px 24px" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14 }}>Quick Facts</div>
              <div className="space-y-3">
                {[
                  { label: "Market Share", value: node.brandCount ? `${Math.min(((node.brandCount / 10000) * 100).toFixed(1), 100)}%` : null },
                  { label: "Market Value", value: node.brandCount ? `$${(Math.min(((node.brandCount / 10000) * 100), 100) * 50).toFixed(0)}M` : null },
                  { label: "Total Products", value: products.length },
                  { label: "Brands", value: brands.length },
                  { label: "Avg Rating", value: brands.length > 0 ? (brands.reduce((s, b) => s + b.rating, 0) / brands.length).toFixed(1) : null },
                  { label: "In Stock", value: products.filter(p => p.inStock).length },
                ].filter(f => f.value !== null && f.value !== 0 && f.value !== "-").map((f, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{f.label}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[58px] z-30" style={{ background: "rgba(245,247,251,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.8)", border: "var(--border)" }}>
              <Search className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1"
                style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}
              />
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.8)", border: "var(--border)", fontSize: "0.8rem", color: "var(--text-secondary)" }}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
          {activeFilterCount > 0 && (
            <span className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "#ff6a3d", color: "#fff" }}>
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </span>
          )}
          <div className="flex items-center gap-1 ml-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {filteredProducts.length} results
          </div>
          <div className="flex rounded-xl overflow-hidden" style={{ border: "var(--border)" }}>
            <button onClick={() => setViewMode("grid")} className="p-2" style={{ background: viewMode === "grid" ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              <Grid className="w-4 h-4" style={{ color: viewMode === "grid" ? "#fff" : "var(--text-muted)" }} />
            </button>
            <button onClick={() => setViewMode("list")} className="p-2" style={{ background: viewMode === "list" ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              <ListIcon className="w-4 h-4" style={{ color: viewMode === "list" ? "#fff" : "var(--text-muted)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid with Filter Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8" style={{ alignItems: "flex-start" }}>
          {/* Filter Sidebar */}
          <FilterSidebar
            products={products}
            brands={brands.map(b => ({ id: b.id, name: b.name }))}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />

          {/* Products */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>No products found</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 4 }}>
                  Try adjusting your filters or search query.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => setActiveFilters({ brand: [], inStock: null, minRating: null })}
                    className="btn-secondary mt-4"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <X className="w-3.5 h-3.5" /> Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}