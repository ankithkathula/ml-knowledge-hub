import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search, ChevronRight, Star, MapPin, ArrowRight,
  Grid, List, Building2, Package, Store, X, Clock,
  TrendingUp, Zap, Filter, SlidersHorizontal,
} from "lucide-react";
import { BRANDS, REGIONS } from "../data/mockData";

const SUBCATEGORY_FILTERS = [
  "All", "Ready-Mix Concrete", "Precast Concrete", "Formwork & Falsework",
  "Cement Types", "Concrete Admixtures", "Concrete Repair & Protection",
];

const STAT_CARDS = [
  { label: "Verified Brands", value: "280+", icon: Building2, color: "#ff6a3d" },
  { label: "Products Listed", value: "8,500+", icon: Package, color: "#10b981" },
  { label: "Cities Covered", value: "180+", icon: MapPin, color: "#6366f1" },
  { label: "Avg. Response Time", value: "< 6 hrs", icon: Clock, color: "#f59e0b" },
];

export function CategoryBrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  const availableStates = useMemo(() => {
    if (selectedRegion === "all") return [];
    return REGIONS.find((r) => r.id === selectedRegion)?.states ?? [];
  }, [selectedRegion]);

  const filtered = useMemo(() => {
    let list = [...BRANDS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) => b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.state.toLowerCase().includes(q)
      );
    }
    if (selectedRegion !== "all") {
      const region = REGIONS.find((r) => r.id === selectedRegion);
      if (region) list = list.filter((b) => region.states.includes(b.state));
    }
    if (selectedState !== "all") list = list.filter((b) => b.state === selectedState);
    if (selectedSubcategory !== "All") list = list.filter((b) => b.subcategories.includes(selectedSubcategory));
    if (sortBy === "featured") list = list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    else if (sortBy === "rating") list = list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === "products") list = list.sort((a, b) => b.productCount - a.productCount);
    else if (sortBy === "name") list = list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [searchQuery, selectedRegion, selectedState, selectedSubcategory, sortBy]);

  const byRegion = useMemo(() => {
    const groups: Record<string, typeof BRANDS> = {};
    if (selectedRegion !== "all") {
      groups[selectedRegion] = filtered;
      return groups;
    }
    REGIONS.forEach((r) => {
      const list = filtered.filter((b) => b.region.toLowerCase() === r.id);
      if (list.length > 0) groups[r.id] = list;
    });
    return groups;
  }, [filtered, selectedRegion]);

  const activeFiltersCount = [selectedRegion !== "all", selectedState !== "all", selectedSubcategory !== "All"].filter(Boolean).length;

  const clearAll = () => {
    setSelectedRegion("all");
    setSelectedState("all");
    setSelectedSubcategory("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5">
          <Link to="/" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <Link to="/category/lighting" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >Concrete & Cement</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>Brands</span>
        </div>
      </div>

      {/* ── Hero / Header ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #fff4ef 0%, #f5f7fb 60%, #fff0e8 100%)", borderBottom: "var(--border)" }}
      >
        {/* Orange blob */}
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,61,0.10) 0%, transparent 65%)", transform: "translate(20%,-30%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pill active" style={{ fontSize: "0.68rem" }}>Structure & Civil Works</span>
                <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                <span className="pill active" style={{ fontSize: "0.68rem" }}>Concrete & Cement</span>
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Concrete & Cement Brands
              </h1>
              <div style={{ width: "36px", height: "3px", background: "var(--accent)", borderRadius: "3px", margin: "10px 0" }} />
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                {BRANDS.length} verified brands across India — filterable by region, state & category
              </p>
            </div>

            {/* Region buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => { setSelectedRegion("all"); setSelectedState("all"); }}
                className={`region-badge ${selectedRegion === "all" ? "active" : ""}`}
              >
                All India
              </button>
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRegion(r.id === selectedRegion ? "all" : r.id); setSelectedState("all"); }}
                  className={`region-badge ${selectedRegion === r.id ? "active" : ""}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {STAT_CARDS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18` }}
                >
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search + Filter row */}
          <div
            className="rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands, cities, states..."
                className="gl-input"
                style={{ paddingLeft: "36px", paddingRight: searchQuery ? "36px" : "14px" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-all"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Subcategory chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {SUBCATEGORY_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubcategory(s)}
                  className={`pill ${selectedSubcategory === s ? "active" : ""}`}
                  style={{ fontSize: "0.7rem", padding: "5px 12px" }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="gl-input"
                style={{ width: "auto", fontSize: "0.78rem", padding: "8px 12px", cursor: "pointer" }}
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="products">Most Products</option>
                <option value="name">A–Z</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="btn-secondary"
                style={{ padding: "10px 12px", fontSize: "0" }}
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* State filter (when region selected) */}
        {availableStates.length > 0 && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Filter by state:</span>
            <button
              onClick={() => setSelectedState("all")}
              className={`pill ${selectedState === "all" ? "active" : ""}`}
              style={{ fontSize: "0.7rem" }}
            >
              All States
            </button>
            {availableStates.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedState(s)}
                className={`pill ${selectedState === s ? "active" : ""}`}
                style={{ fontSize: "0.7rem" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results bar */}
        <div className="flex items-center justify-between mb-5">
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Showing{" "}
            <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong>{" "}
            brand{filtered.length !== 1 ? "s" : ""}
            {searchQuery && <> for <em>"{searchQuery}"</em></>}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all"
              style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.14)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)")}
            >
              <X className="w-3 h-3" /> Clear filters ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Grouped brand listing */}
        {Object.keys(byRegion).length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{ background: "var(--glass-strong)", border: "var(--border)" }}
          >
            <Building2 className="w-12 h-12 mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>No brands found matching your criteria.</p>
            <button onClick={clearAll} className="btn-primary mt-4" style={{ padding: "9px 20px", fontSize: "0.8rem" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          Object.entries(byRegion).map(([regionId, brands]) => {
            const region = REGIONS.find((r) => r.id === regionId);
            return (
              <div key={regionId} className="mb-12">
                {/* Region header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="accent-line" style={{ height: "22px" }} />
                  <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)" }}>
                    {region?.label || regionId}
                  </h2>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-white"
                    style={{ fontSize: "0.68rem", fontWeight: 700, background: "var(--accent)" }}
                  >
                    {brands.length}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                  {region && (
                    <div className="flex gap-1.5 hidden sm:flex">
                      {region.states.slice(0, 3).map((st) => (
                        <span key={st} className="pill" style={{ fontSize: "0.62rem", padding: "3px 8px" }}>{st}</span>
                      ))}
                      {region.states.length > 3 && (
                        <span className="pill" style={{ fontSize: "0.62rem", padding: "3px 8px" }}>+{region.states.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {brands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {brands.map((brand) => <BrandListItem key={brand.id} brand={brand} />)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

function BrandCard({ brand }: { brand: (typeof BRANDS)[0] }) {
  return (
    <Link
      to={`/brand/${brand.id}`}
      className="gl-card flex flex-col overflow-hidden group"
      style={{ padding: 0, borderRadius: "var(--r-lg)" }}
    >
      {/* Top accent stripe */}
      <div style={{ height: "4px", background: brand.isFeatured ? `linear-gradient(90deg, ${brand.accentColor || "var(--accent)"}, ${brand.accentColor || "var(--accent)"}88)` : "rgba(0,0,0,0.05)" }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${brand.accentColor || "var(--accent)"}ee, ${brand.accentColor || "var(--accent)"}99)`, fontWeight: 800, fontSize: "0.82rem", boxShadow: `0 4px 14px ${brand.accentColor || "rgba(255,106,61,0.3)"}44` }}
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col items-end gap-1">
            {brand.isFeatured && (
              <span
                className="text-white px-2 py-0.5 rounded-full"
                style={{ fontSize: "0.6rem", fontWeight: 700, background: "var(--accent)", boxShadow: "var(--shadow-orange)", letterSpacing: "0.04em" }}
              >
                FEATURED
              </span>
            )}
            {brand.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>{brand.rating}</span>
              </div>
            )}
          </div>
        </div>

        <h3
          className="mb-1 group-hover:text-[var(--accent)] transition-colors"
          style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}
        >
          {brand.name}
        </h3>
        <p className="mb-3 line-clamp-2" style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {brand.tagline}
        </p>

        {/* Sub-category badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {brand.subcategories.slice(0, 2).map((s) => (
            <span key={s} className="pill" style={{ fontSize: "0.62rem", padding: "3px 9px" }}>{s}</span>
          ))}
          {brand.subcategories.length > 2 && (
            <span className="pill" style={{ fontSize: "0.62rem", padding: "3px 9px" }}>+{brand.subcategories.length - 2}</span>
          )}
        </div>

        <div className="mt-auto">
          {/* Stats grid */}
          <div
            className="grid grid-cols-3 gap-1 p-3 rounded-xl mb-3"
            style={{ background: "rgba(0,0,0,0.03)", border: "var(--border)" }}
          >
            {[
              { v: brand.productCount, l: "Products" },
              { v: brand.storeCount, l: "Stores" },
              { v: `${brand.yearsExp}yr`, l: "Exp." },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{v}</div>
                <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{brand.city}, {brand.state}</span>
            </div>
            <ArrowRight
              className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all"
              style={{ color: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BrandListItem({ brand }: { brand: (typeof BRANDS)[0] }) {
  return (
    <Link
      to={`/brand/${brand.id}`}
      className="gl-card flex items-center gap-4 group"
      style={{ padding: "14px 18px", borderRadius: "var(--r-md)" }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${brand.accentColor || "var(--accent)"}ee, ${brand.accentColor || "var(--accent)"}88)`, fontWeight: 800, fontSize: "0.9rem", boxShadow: `0 4px 14px ${brand.accentColor || "rgba(255,106,61,0.25)"}44` }}
      >
        {brand.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="transition-colors group-hover:text-[var(--accent)]" style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {brand.name}
          </h3>
          {brand.isFeatured && (
            <span className="text-white px-2 py-0.5 rounded-full" style={{ fontSize: "0.6rem", fontWeight: 700, background: "var(--accent)" }}>
              FEATURED
            </span>
          )}
          {brand.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>{brand.rating}</span>
            </div>
          )}
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "6px" }}>{brand.tagline}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{brand.city}, {brand.state}</span>
          </div>
          <div className="flex gap-1.5">
            {brand.subcategories.slice(0, 3).map((s) => (
              <span key={s} className="pill" style={{ fontSize: "0.62rem", padding: "3px 9px" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-8 flex-shrink-0">
        {[
          { v: brand.productCount, l: "Products" },
          { v: brand.storeCount, l: "Stores" },
          { v: `${brand.yearsExp}yr`, l: "Exp." },
        ].map(({ v, l }) => (
          <div key={l} className="text-center">
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{v}</div>
            <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" style={{ color: "var(--accent)" }} />
      </div>
    </Link>
  );
}