import { useMemo, useState, useRef } from "react";
import { Link } from "react-router";
import {
  Search, Star, MapPin, CheckCircle, Building2, Palette, HardHat, Zap,
  ClipboardList, Compass, Trees, Wrench, Umbrella, Leaf, Shield, Monitor,
  Ruler, Package, Truck, Briefcase, ArrowRight, ChevronRight, Flame,
  Sparkles, Phone, Clock, Award, ShieldCheck, BadgeCheck,
  IndianRupee, Hammer, PaintBucket, Layers, Droplets, X,
} from "lucide-react";
import {
  SERVICE_TYPES,
  REGISTERED_SERVICES,
  SERVICE_SUBCATEGORIES,
  UNIFIED_CATEGORIES,
  getCategoryById,
} from "../data/kcPortalData";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Palette, HardHat, Zap, ClipboardList, Compass, Trees, Wrench,
  Umbrella, Leaf, Shield, Monitor, Ruler, Package, Truck, Briefcase,
};

// Popular services — UrbanClap-style icon grid. Each maps to a SVC type.
const POPULAR_SERVICES = [
  { slug: "painting-contractor", label: "Painting", icon: PaintBucket, color: "#f97316" },
  { slug: "electrical-contractor", label: "Electrical", icon: Zap, color: "#eab308" },
  { slug: "plumbing-contractor", label: "Plumbing", icon: Droplets, color: "#0ea5e9" },
  { slug: "carpentry-contractor", label: "Carpentry", icon: Hammer, color: "#92400e" },
  { slug: "waterproofing-contractor", label: "Waterproofing", icon: Umbrella, color: "#0891b2" },
  { slug: "tiling-stone-contractor", label: "Tiling", icon: Layers, color: "#8b5cf6" },
  { slug: "false-ceiling-contractor", label: "False Ceiling", icon: Building2, color: "#ec4899" },
  { slug: "renovation-contractor", label: "Renovation", icon: Wrench, color: "#ff6a3d" },
  { slug: "hvac-contractor", label: "AC / HVAC", icon: Zap, color: "#06b6d4" },
  { slug: "flooring-contractor", label: "Flooring", icon: Layers, color: "#14b8a6" },
  { slug: "landscape-contractor", label: "Landscape", icon: Trees, color: "#10b981" },
  { slug: "smart-home-automation", label: "Smart Home", icon: Monitor, color: "#a855f7" },
];

const TRUST_ROW = [
  { icon: ShieldCheck, label: "Verified contractors", sub: "Background-checked" },
  { icon: BadgeCheck, label: "Free quotes", sub: "No commitment" },
  { icon: Award, label: "Quality guarantee", sub: "Workmanship warranty" },
  { icon: Clock, label: "Fast response", sub: "Under 2 hours" },
];

const HOW_STEPS = [
  { n: 1, title: "Tell us what you need", desc: "Describe your job in a few words — no forms, no fuss." },
  { n: 2, title: "Get matched in minutes", desc: "We connect you with 3 verified contractors nearby." },
  { n: 3, title: "Compare free quotes", desc: "Review pricing, past work, and ratings. Ask questions." },
  { n: 4, title: "Hire with confidence", desc: "Book through KC — backed by our quality guarantee." },
];

const PINCODE_CITY: Record<string, string> = {
  "400001": "Mumbai", "400069": "Mumbai", "400053": "Mumbai",
  "110001": "New Delhi", "110020": "New Delhi", "110085": "New Delhi",
  "560001": "Bangalore", "560034": "Bangalore",
  "500001": "Hyderabad", "500018": "Hyderabad",
  "600001": "Chennai", "600017": "Chennai",
  "411001": "Pune", "411045": "Pune",
  "700001": "Kolkata", "700064": "Kolkata",
  "380001": "Ahmedabad", "380054": "Ahmedabad",
  "302001": "Jaipur", "302017": "Jaipur",
  "682001": "Kochi", "682011": "Kochi",
};

export function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeCity, setPincodeCity] = useState("");
  const [pincodeError, setPincodeError] = useState(false);
  const [activeSubCat, setActiveSubCat] = useState<string>("all");
  const pincodeRef = useRef<HTMLInputElement>(null);

  const allCities = useMemo(
    () => [...new Set(REGISTERED_SERVICES.map((s) => s.city))].sort(),
    []
  );

  const activeCity = pincodeCity || selectedCity;

  const handlePincodeSearch = () => {
    const pin = pincodeInput.trim();
    if (!pin) return;
    const city = PINCODE_CITY[pin];
    if (city) {
      setPincodeCity(city);
      setSelectedCity("");
      setPincodeError(false);
    } else {
      setPincodeError(true);
      setPincodeCity("");
    }
  };

  const clearLocation = () => {
    setSelectedCity("");
    setPincodeInput("");
    setPincodeCity("");
    setPincodeError(false);
  };

  const mostBooked = useMemo(
    () => [...REGISTERED_SERVICES].sort((a, b) => b.projectCount - a.projectCount).slice(0, 8),
    []
  );

  const nearYou = useMemo(() => {
    let list = REGISTERED_SERVICES.filter((s) => s.verified);
    if (activeCity) list = list.filter((s) => s.city === activeCity);
    if (activeSubCat !== "all") {
      const typeIds = new Set(
        SERVICE_TYPES.filter((t) => t.subCategory === activeSubCat).map((t) => t.id)
      );
      list = list.filter((s) => typeIds.has(s.typeId));
    }
    return list.slice(0, 6);
  }, [activeSubCat, activeCity]);

  const filteredCategories = UNIFIED_CATEGORIES.filter((c) => c.serviceCount > 0).filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ══ HERO — big question + search + city ══ */}
      <section
        style={{
          background: "var(--bg-hero)",
          paddingTop: 56,
          paddingBottom: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orange blob */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,106,61,0.14) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(255,106,61,0.1)",
                color: "#ff6a3d",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              15,000+ contractors · 50+ cities · Fully verified
            </span>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: 12,
              }}
            >
              What do you need done?
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#64748b",
                maxWidth: 620,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Book trusted contractors for construction, renovation, trades, and finishes —
              with free quotes and a workmanship guarantee.
            </p>
          </div>

          {/* Search card */}
          <div
            style={{
              background: "var(--glass-strong)",
              borderRadius: 20,
              padding: 10,
              boxShadow: "0 16px 48px -16px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.04)",
              display: "flex",
              gap: 8,
              maxWidth: 780,
              margin: "0 auto",
            }}
            className="flex-col md:flex-row"
          >
            <div className="flex-1 relative flex items-center">
              <Search className="w-5 h-5 ml-4" style={{ color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="e.g. Paint 2BHK, waterproof terrace, tile flooring…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-4 outline-none bg-transparent"
                style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: 500 }}
              />
            </div>
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                borderLeft: "1px solid rgba(15,23,42,0.08)",
                minWidth: 180,
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: "#ff6a3d" }} />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent outline-none cursor-pointer flex-1"
                style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f172a" }}
              >
                {["Mumbai", "New Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              className="flex items-center justify-center gap-2 flex-shrink-0"
              style={{
                background: "#ff6a3d",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: "0.92rem",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e85a2f")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ff6a3d")}
            >
              <Search className="w-4 h-4" /> Find contractors
            </button>
          </div>

          {/* Popular search chips */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 500 }}>Popular:</span>
            {["Painter", "Plumber", "Electrician", "Carpenter", "Waterproofing", "Tiler"].map((t) => (
              <button
                key={t}
                onClick={() => setSearchQuery(t)}
                style={{
                  fontSize: "0.78rem",
                  color: "#475569",
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "var(--glass-strong)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  fontWeight: 500,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST ROW ══ */}
      <section
        style={{
          background: "var(--glass-strong)",
          borderTop: "1px solid rgba(15,23,42,0.05)",
          borderBottom: "1px solid rgba(15,23,42,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_ROW.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,106,61,0.1)" }}
                >
                  <item.icon className="w-5 h-5" style={{ color: "#ff6a3d" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>{item.label}</p>
                  <p style={{ fontSize: "0.68rem", color: "#64748b" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POPULAR SERVICES — icon grid ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.015em" }}>
              Popular services
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: 4 }}>
              Book in minutes. Pay only after work is done.
            </p>
          </div>
          <Link to="#" style={{ fontSize: "0.82rem", color: "#ff6a3d", fontWeight: 700, textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {POPULAR_SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/consultant/${s.slug}`}
              className="group"
              style={{
                background: "var(--glass-strong)",
                border: "1px solid rgba(15,23,42,0.08)",
                borderRadius: 16,
                padding: 18,
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.2s",
                display: "block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = s.color;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 28px -12px ${s.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,23,42,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${s.color}14` }}
              >
                <s.icon className="w-7 h-7" style={{ color: s.color }} />
              </div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f172a" }}>{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ MOST BOOKED ══ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(15,23,42,0.05)", borderBottom: "1px solid rgba(15,23,42,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ff6a3d", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                <Flame className="w-3 h-3 inline mr-1" />
                Most booked this week
              </span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginTop: 6, letterSpacing: "-0.015em" }}>
                Trending near you
              </h2>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollSnapType: "x mandatory" }}>
            {mostBooked.map((s) => {
              const cat = getCategoryById(s.categoryId);
              return (
                <Link
                  key={s.id}
                  to={`/services/consultant/${s.slug}`}
                  style={{
                    flexShrink: 0,
                    width: 280,
                    background: "var(--glass-strong)",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(15,23,42,0.06)",
                    textDecoration: "none",
                    scrollSnapAlign: "start",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px -12px rgba(15,23,42,0.15)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  <div style={{ height: 140, background: `${cat?.color || "#ff6a3d"}12`, position: "relative" }}>
                    <img src={s.coverImage} alt="" className="w-full h-full object-cover" />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
                      style={{ background: "var(--glass-strong)", backdropFilter: "blur(8px)", fontSize: "0.68rem", fontWeight: 700, color: cat?.color || "#ff6a3d" }}
                    >
                      {cat?.name}
                    </div>
                  </div>
                  <div style={{ padding: 18 }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }} className="truncate">
                        {s.name}
                      </h4>
                      {s.verified && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#10b981" }} />}
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "#64748b" }} className="truncate">{s.typeName}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a" }}>{s.rating.toFixed(1)}</span>
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>({s.reviewCount})</span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b", marginLeft: "auto" }}>{s.projectCount} jobs</span>
                    </div>
                    <div
                      className="flex items-center justify-between mt-3 pt-3"
                      style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}
                    >
                      <div>
                        <p style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Starting at</p>
                        <p style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ff6a3d" }}>{s.priceRange}</p>
                      </div>
                      <span
                        style={{
                          background: "rgba(255,106,61,0.1)",
                          color: "#ff6a3d",
                          padding: "7px 14px",
                          borderRadius: 99,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        Get quote
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SUB-CATEGORY TABS + CONTRACTOR CARDS ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.015em" }}>
              Verified contractors{activeCity ? ` in ${activeCity}` : " near you"}
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#64748b", marginTop: 4 }}>
              All contractors background-checked and work-sample verified.
            </p>
          </div>
        </div>

        {/* Location filter bar */}
        <div
          className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-2xl"
          style={{ background: "var(--glass-strong)", border: "1px solid rgba(15,23,42,0.07)" }}
        >
          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#ff6a3d" }} />

          {/* City dropdown */}
          <div className="flex items-center gap-2">
            <label style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748b", whiteSpace: "nowrap" }}>City</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setPincodeInput("");
                setPincodeCity("");
                setPincodeError(false);
              }}
              style={{
                fontSize: "0.84rem",
                fontWeight: 600,
                color: selectedCity ? "#0f172a" : "#94a3b8",
                background: "white",
                border: "1.5px solid rgba(15,23,42,0.1)",
                borderRadius: 8,
                padding: "6px 10px",
                outline: "none",
                cursor: "pointer",
                minWidth: 140,
              }}
            >
              <option value="">All cities</option>
              {allCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ width: 1, height: 20, background: "rgba(15,23,42,0.1)" }} />

          {/* Pincode search */}
          <div className="flex items-center gap-2">
            <label style={{ fontSize: "0.74rem", fontWeight: 600, color: "#64748b", whiteSpace: "nowrap" }}>Pincode</label>
            <div className="flex items-center gap-1">
              <input
                ref={pincodeRef}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="e.g. 400001"
                value={pincodeInput}
                onChange={(e) => {
                  setPincodeInput(e.target.value.replace(/\D/g, ""));
                  setPincodeError(false);
                  if (e.target.value.length === 0) setPincodeCity("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handlePincodeSearch()}
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  color: "#0f172a",
                  background: "white",
                  border: `1.5px solid ${pincodeError ? "#ef4444" : "rgba(15,23,42,0.1)"}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                  outline: "none",
                  width: 110,
                }}
              />
              <button
                onClick={handlePincodeSearch}
                style={{
                  background: "#ff6a3d",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                }}
              >
                Search
              </button>
            </div>
            {pincodeError && (
              <span style={{ fontSize: "0.72rem", color: "#ef4444" }}>Pincode not found</span>
            )}
          </div>

          {/* Active filter pill + clear */}
          {activeCity && (
            <div
              className="flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,106,61,0.1)", border: "1px solid rgba(255,106,61,0.2)" }}
            >
              <MapPin className="w-3 h-3" style={{ color: "#ff6a3d" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ff6a3d" }}>{activeCity}</span>
              <button onClick={clearLocation} className="ml-1">
                <X className="w-3 h-3" style={{ color: "#ff6a3d" }} />
              </button>
            </div>
          )}
        </div>

        {/* Tab row */}
        <div
          className="flex items-center gap-2 overflow-x-auto mb-6 pb-1"
          style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}
        >
          {[{ id: "all", label: "All services", value: "all" }, ...SERVICE_SUBCATEGORIES].map((s) => {
            const active = activeSubCat === s.value;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSubCat(s.value)}
                style={{
                  padding: "12px 18px",
                  fontSize: "0.84rem",
                  fontWeight: active ? 700 : 600,
                  color: active ? "#ff6a3d" : "#64748b",
                  borderBottom: `2.5px solid ${active ? "#ff6a3d" : "transparent"}`,
                  marginBottom: -1,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Contractor cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {nearYou.map((s) => {
            const cat = getCategoryById(s.categoryId);
            return (
              <Link
                key={s.id}
                to={`/services/consultant/${s.slug}`}
                className="group"
                style={{
                  background: "var(--glass-strong)",
                  borderRadius: 16,
                  padding: 20,
                  border: "1px solid rgba(15,23,42,0.08)",
                  display: "flex",
                  gap: 18,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#ff6a3d";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px -8px rgba(255,106,61,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,23,42,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Avatar */}
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 16,
                      background: `${cat?.color || "#ff6a3d"}14`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: cat?.color || "#ff6a3d",
                    }}
                  >
                    {s.name.charAt(0)}
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a" }} className="truncate">
                        {s.name}
                      </h4>
                      {s.verified && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />}
                    </div>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.66rem",
                      fontWeight: 700,
                      color: cat?.color || "#ff6a3d",
                      background: `${cat?.color || "#ff6a3d"}12`,
                      padding: "3px 8px",
                      borderRadius: 99,
                      marginBottom: 8,
                    }}
                  >
                    {s.typeName}
                  </span>
                  <p
                    className="line-clamp-2"
                    style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.5, marginBottom: 10 }}
                  >
                    {s.tagline}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 flex-wrap mb-3" style={{ fontSize: "0.72rem", color: "#64748b" }}>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span style={{ fontWeight: 700, color: "#0f172a" }}>{s.rating.toFixed(1)}</span>
                      <span>({s.reviewCount})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {s.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.responseTime}
                    </span>
                    <span>{s.yearsExp}y exp</span>
                  </div>

                  {/* Price + CTA */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}
                  >
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Starts at
                      </p>
                      <p style={{ fontSize: "1.02rem", fontWeight: 800, color: "#ff6a3d", display: "flex", alignItems: "center", gap: 2 }}>
                        <IndianRupee className="w-4 h-4" />
                        {s.priceRange.replace(/^₹/, "")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1.5"
                        style={{
                          background: "var(--glass-strong)",
                          border: "1.5px solid rgba(15,23,42,0.12)",
                          color: "#0f172a",
                          padding: "9px 16px",
                          borderRadius: 10,
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </button>
                      <button
                        style={{
                          background: "#ff6a3d",
                          color: "#ffffff",
                          padding: "9px 18px",
                          borderRadius: 10,
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        Get quote
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {nearYou.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-10 h-10 mx-auto mb-3" style={{ color: "#cbd5e1" }} />
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
              No contractors found{activeCity ? ` in ${activeCity}` : ""}
            </p>
            <p style={{ fontSize: "0.84rem", color: "#64748b", marginTop: 6 }}>
              Try a different city or clear the location filter.
            </p>
            <button
              onClick={clearLocation}
              style={{ marginTop: 16, color: "#ff6a3d", fontSize: "0.84rem", fontWeight: 700 }}
            >
              Clear filter →
            </button>
          </div>
        )}

        {nearYou.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              style={{
                background: "var(--glass-strong)",
                border: "1.5px solid #ff6a3d",
                color: "#ff6a3d",
                padding: "13px 32px",
                borderRadius: 12,
                fontSize: "0.88rem",
                fontWeight: 700,
              }}
            >
              Browse all {REGISTERED_SERVICES.length} contractors
            </button>
          </div>
        )}
      </section>

      {/* ══ BROWSE BY WORK TYPE — full category set ══ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(15,23,42,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.015em", marginBottom: 6 }}>
            Browse by work type
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#64748b", marginBottom: 24 }}>
            From foundations to finishes — every trade and specialty.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredCategories.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Building2;
              return (
                <Link
                  key={cat.id}
                  to={`/services/${cat.slug}`}
                  className="group"
                  style={{
                    background: "var(--glass-strong)",
                    border: "1px solid rgba(15,23,42,0.08)",
                    borderRadius: 14,
                    padding: 18,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = cat.color;
                    (e.currentTarget as HTMLElement).style.background = `${cat.color}06`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,23,42,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.color}14` }}
                  >
                    <IconComp className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }} className="truncate">
                      {cat.name}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#64748b" }}>
                      {cat.serviceCount} contractors
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: cat.color }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span
            style={{
              fontSize: "0.74rem",
              fontWeight: 700,
              color: "#ff6a3d",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            How it works
          </span>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginTop: 8, letterSpacing: "-0.02em" }}>
            From enquiry to done in 4 simple steps
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {HOW_STEPS.map((step, idx) => (
            <div key={step.n} className="relative">
              <div
                style={{
                  background: "var(--glass-strong)",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(15,23,42,0.06)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,106,61,0.1)",
                    color: "#ff6a3d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    marginBottom: 14,
                  }}
                >
                  {step.n}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
              {idx < HOW_STEPS.length - 1 && (
                <ArrowRight
                  className="hidden md:block absolute top-1/2 -right-3 w-5 h-5"
                  style={{ color: "#cbd5e1", transform: "translateY(-50%)" }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div
          style={{
            background: "linear-gradient(135deg, #ff6a3d 0%, #e85a2f 100%)",
            borderRadius: 20,
            padding: "48px 44px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "-5%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Are you a contractor?
              </h2>
              <p style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.85)", maxWidth: 520, lineHeight: 1.6 }}>
                Join 15,000+ verified contractors. Get leads, manage quotes, and grow your business.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                to="/studio"
                style={{
                  background: "var(--glass-strong)",
                  color: "#ff6a3d",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                List your business
              </Link>
              <Link
                to="#"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  border: "1px solid rgba(255,255,255,0.3)",
                  textDecoration: "none",
                }}
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
