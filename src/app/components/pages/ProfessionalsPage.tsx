import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search, Star, MapPin, CheckCircle, Building2, Palette, HardHat, Zap,
  ClipboardList, Compass, Trees, Wrench, Umbrella, Leaf, Shield, Monitor,
  Ruler, Package, Truck, Briefcase, ArrowRight, ChevronRight, Flame,
  Sparkles, Award, Clock,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import {
  PROFESSIONAL_TYPES,
  REGISTERED_PROFESSIONALS,
  PROFESSIONAL_SUBCATEGORIES,
  getCategoriesWithProfessionals,
  getCategoryById,
} from "../data/kcPortalData";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Palette, HardHat, Zap, ClipboardList, Compass, Trees, Wrench,
  Umbrella, Leaf, Shield, Monitor, Ruler, Package, Truck, Briefcase,
};

const QUICK_FILTERS = [
  { label: "Editor's Picks", icon: Sparkles, color: "#8b5cf6" },
  { label: "Verified", icon: Shield, color: "#10b981" },
  { label: "Award-winning", icon: Award, color: "#f59e0b" },
  { label: "Top Rated", icon: Star, color: "#ec4899" },
  { label: "Available Now", icon: Clock, color: "#6366f1" },
];

export function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [activeSubCat, setActiveSubCat] = useState<string>("all");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategoriesWithProfessionals(), []);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topRated = useMemo(
    () => [...REGISTERED_PROFESSIONALS].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  );

  const featuredProfessionals = useMemo(() => {
    let list = REGISTERED_PROFESSIONALS.filter((p) => p.featured);
    if (activeSubCat !== "all") {
      const typeIds = new Set(
        PROFESSIONAL_TYPES.filter((t) => t.subCategory === activeSubCat).map((t) => t.id)
      );
      list = list.filter((p) => typeIds.has(p.typeId));
    }
    return list.slice(0, 5);
  }, [activeSubCat]);

  const recentlyActive = useMemo(() => REGISTERED_PROFESSIONALS.slice(0, 4), []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* ── Compact Search Command Bar ── */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, var(--bg-base) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search studios, consultancies & practices…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)")}
              />
            </div>
            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3.5 rounded-xl text-sm outline-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1.5px solid rgba(0,0,0,0.08)",
                color: "var(--text-primary)",
                fontWeight: 600,
                minWidth: 160,
              }}
            >
              {["All Cities", "Mumbai", "New Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button className="btn-primary flex-shrink-0" style={{ padding: "12px 28px", fontSize: "0.9rem", borderRadius: 12 }}>
              <Search className="w-4 h-4" /> Discover
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            {QUICK_FILTERS.map((f) => {
              const active = activeQuickFilter === f.label;
              return (
                <button
                  key={f.label}
                  onClick={() => setActiveQuickFilter(active ? null : f.label)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    background: active ? `${f.color}15` : "rgba(255,255,255,0.8)",
                    color: active ? f.color : "var(--text-secondary)",
                    border: active ? `1.5px solid ${f.color}40` : "1.5px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <f.icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                  {f.label}
                </button>
              );
            })}
            <div className="h-5 w-px mx-1" style={{ background: "rgba(0,0,0,0.08)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
              {REGISTERED_PROFESSIONALS.length} practices registered
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content: Split Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">

          {/* ── Left: Discipline Nav Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[74px]">
              <h3 style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Disciplines
              </h3>
              <nav className="space-y-0.5">
                {filteredCategories.map((cat) => {
                  const IconComp = ICON_MAP[cat.icon] || Building2;
                  const isHovered = hoveredCategory === cat.id;
                  return (
                    <Link
                      key={cat.id}
                      to={`/services/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                      style={{
                        background: isHovered ? `${cat.color}08` : "transparent",
                        textDecoration: "none",
                      }}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ background: isHovered ? `${cat.color}18` : "rgba(0,0,0,0.03)" }}
                      >
                        <IconComp className="w-4 h-4" style={{ color: isHovered ? cat.color : "var(--text-muted)" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 600, color: isHovered ? cat.color : "var(--text-primary)" }}>
                          {cat.name}
                        </p>
                        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          {cat.professionalCount} practices
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all" style={{ color: "var(--text-muted)" }} />
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Registry Stats</p>
                {[
                  { label: "Verified practices", value: `${REGISTERED_PROFESSIONALS.filter(p => p.verified).length}+`, icon: Shield, color: "#10b981" },
                  { label: "Award-winning", value: "120+", icon: Award, color: "#f59e0b" },
                  { label: "Avg Response", value: "< 4 hrs", icon: Clock, color: "#6366f1" },
                  { label: "Cities Covered", value: "50+", icon: MapPin, color: "#ec4899" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 py-2">
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    <div className="flex-1">
                      <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{s.label}</p>
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Right: Main Feed ── */}
          <div className="flex-1 min-w-0">

            {/* Top Picks — Horizontal Scroll */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Editor's Selection</h2>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>Practices to know this season</p>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollSnapType: "x mandatory" }}>
                {topRated.map((p) => {
                  const cat = getCategoryById(p.categoryId);
                  return (
                    <Link
                      key={p.id}
                      to={`/services/consultant/${p.slug}`}
                      className="flex-shrink-0 w-72 rounded-2xl overflow-hidden transition-all group"
                      style={{
                        background: "rgba(255,255,255,0.55)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.45)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                        scrollSnapAlign: "start",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${cat?.color || "rgba(0,0,0,0.1)"}25, inset 0 1px 0 rgba(255,255,255,0.7)`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.72)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)";
                        (e.currentTarget as HTMLElement).style.transform = "none";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.55)";
                      }}
                    >
                      {/* Cover image */}
                      <div
                        className="relative overflow-hidden"
                        style={{ aspectRatio: "16/10", background: `${cat?.color || "var(--accent)"}10` }}
                      >
                        <img
                          src={p.coverImage}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)`,
                          }}
                        />
                        <span
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            background: "rgba(255,255,255,0.92)",
                            backdropFilter: "blur(8px)",
                            color: cat?.color || "var(--accent)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {cat?.name}
                        </span>
                      </div>

                      <div style={{ padding: "20px" }}>
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={p.logoUrl}
                            alt={p.name}
                            loading="lazy"
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                            style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="truncate" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</h4>
                              {p.verified && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#10b981" }} />}
                            </div>
                            <p style={{ fontSize: "0.72rem", color: cat?.color, fontWeight: 600 }}>{cat?.name}</p>
                          </div>
                        </div>

                        <p className="line-clamp-2 mb-3" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.tagline}</p>

                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.rating.toFixed(1)}</span>
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.reviewCount} reviews</span>
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.yearsExp}y exp</span>
                        </div>

                        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>{p.city}</span>
                          </div>
                          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)" }}>{p.projectCount} projects</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ── Sub-category pill row (slight distinction from Services) ── */}
            <section className="mb-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[{ id: "all", label: "All practices", value: "all" }, ...PROFESSIONAL_SUBCATEGORIES].map((s) => {
                  const active = activeSubCat === s.value;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSubCat(s.value)}
                      className="px-4 py-2 rounded-full whitespace-nowrap transition-all"
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        background: active ? "var(--accent)" : "rgba(255,255,255,0.8)",
                        color: active ? "#fff" : "var(--text-secondary)",
                        border: active ? "1.5px solid var(--accent)" : "1.5px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── Category Cards — Visual Discovery Grid ── */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Browse by Discipline</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredCategories.slice(0, 8).map((cat) => {
                  const IconComp = ICON_MAP[cat.icon] || Building2;
                  return (
                    <Link
                      key={cat.id}
                      to={`/services/${cat.slug}`}
                      className="relative overflow-hidden rounded-2xl group transition-all"
                      style={{
                        aspectRatio: "4/3",
                        background: `linear-gradient(145deg, ${cat.color}12 0%, ${cat.color}04 100%)`,
                        border: `1px solid ${cat.color}15`,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `linear-gradient(145deg, ${cat.color}22 0%, ${cat.color}10 100%)`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 30px ${cat.color}18`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `linear-gradient(145deg, ${cat.color}12 0%, ${cat.color}04 100%)`;
                        (e.currentTarget as HTMLElement).style.transform = "none";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Large faded icon */}
                      <div className="absolute -bottom-4 -right-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
                        <IconComp className="w-28 h-28" style={{ color: cat.color }} />
                      </div>

                      <div className="relative h-full flex flex-col justify-between p-5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${cat.color}18` }}
                        >
                          <IconComp className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                            {cat.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: cat.color }}>
                              {cat.professionalCount} practices
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: cat.color }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredCategories.length > 8 && (
                <div className="flex justify-center mt-4">
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                    style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)", background: "var(--accent-light)" }}
                  >
                    View All {filteredCategories.length} Disciplines <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>

            {/* ── Featured Studios & Consultancies — Card Feed ── */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Featured Studios & Consultancies</h2>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>Handpicked practices with a body of work that speaks for itself</p>
                </div>
              </div>

              <div className="space-y-4">
                {featuredProfessionals.map((p) => {
                  const cat = getCategoryById(p.categoryId);
                  return (
                    <Link
                      key={p.id}
                      to={`/services/consultant/${p.slug}`}
                      className="flex gap-5 p-5 rounded-2xl transition-all group"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,61,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.7)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Cover thumbnail + logo */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className="w-28 h-28 rounded-2xl overflow-hidden"
                          style={{ background: `${cat?.color || "var(--accent)"}10`, border: "1px solid rgba(0,0,0,0.04)" }}
                        >
                          <img
                            src={p.coverImage}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <img
                          src={p.logoUrl}
                          alt={`${p.name} logo`}
                          loading="lazy"
                          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl object-cover"
                          style={{
                            background: "#fff",
                            border: "2px solid #fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</h3>
                              {p.verified && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />}
                              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 600, background: `${cat?.color || "#ff6a3d"}12`, color: cat?.color || "#ff6a3d" }}>
                                {cat?.name}
                              </span>
                              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>
                                {p.typeName}
                              </span>
                            </div>
                            <p className="line-clamp-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>{p.tagline}</p>
                          </div>
                          <span
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: "var(--accent)",
                              background: "var(--accent-light)",
                              border: "1px solid rgba(255,106,61,0.18)",
                            }}
                          >
                            View microsite <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Meta row */}
                        <div className="flex items-center gap-4 mt-3 flex-wrap">
                          <span className="flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.rating.toFixed(1)}</span>
                            <span style={{ color: "var(--text-muted)" }}>({p.reviewCount})</span>
                          </span>
                          <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            <MapPin className="w-3 h-3" /> {p.city}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.yearsExp} yrs exp</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.projectCount} projects</span>
                          {p.teamSize > 1 && (
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.teamSize} team</span>
                          )}
                        </div>

                        {/* Specializations */}
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {p.specializations.slice(0, 4).map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 500, background: "rgba(0,0,0,0.03)", color: "var(--text-secondary)" }}>
                              {s}
                            </span>
                          ))}
                          {p.specializations.length > 4 && (
                            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", alignSelf: "center" }}>+{p.specializations.length - 4} more</span>
                          )}
                        </div>
                      </div>

                      {/* Action hint */}
                      <div className="hidden md:flex flex-col items-center justify-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                          <ArrowRight className="w-5 h-5" style={{ color: "var(--accent)" }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex justify-center mt-6">
                <Link
                  to="/services/architecture"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", background: "var(--accent)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  Browse All Practices <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* ── Quick Connect ── */}
            <section className="mb-10">
              <h2 className="mb-5" style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Available for Commissions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recentlyActive.map((p) => {
                  const cat = getCategoryById(p.categoryId);
                  return (
                    <Link
                      key={p.id}
                      to={`/services/consultant/${p.slug}`}
                      className="text-center p-5 rounded-2xl transition-all group"
                      style={{
                        background: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.95)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.05)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)";
                      }}
                    >
                      <div className="relative inline-block mb-3">
                        <img
                          src={p.logoUrl}
                          alt={p.name}
                          loading="lazy"
                          className="w-16 h-16 rounded-2xl object-cover mx-auto"
                          style={{
                            background: `${cat?.color || "var(--accent)"}10`,
                            border: "1px solid rgba(0,0,0,0.05)",
                          }}
                        />
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: "#10b981" }} />
                      </div>
                      <h4 className="truncate" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</h4>
                      <p className="truncate" style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>{p.typeName}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.rating.toFixed(1)}</span>
                      </div>
                      <button
                        className="mt-3 w-full py-2 rounded-lg transition-all text-center"
                        style={{ fontSize: "0.75rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        Enquire
                      </button>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ── CTA Banner ── */}
            <section>
              <div
                className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }}
              >
                {/* Background stock image */}
                <img
                  src="https://loremflickr.com/1600/600/architecture,modern,building?lock=777"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(31,41,55,0.92) 0%, rgba(17,24,39,0.88) 100%)" }}
                />
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "var(--accent)" }} />
                </div>
                <div className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl text-white mb-2" style={{ fontWeight: 800 }}>
                      List Your Practice
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                      Join India's registry of design studios, engineering consultancies and digital practices. Vetted for craft and rigour.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Link
                      to="/studio"
                      className="px-6 py-3 rounded-xl transition-all"
                      style={{ background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/services/architecture"
                      className="px-6 py-3 rounded-xl transition-all"
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 600, fontSize: "0.85rem", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      Browse Registry
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
