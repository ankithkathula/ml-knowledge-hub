import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ChevronRight, Star, MapPin, TrendingUp, ArrowRight,
  Lightbulb, Award, Package, ShoppingBag, Zap, Building2,
  BookOpen, Users, Edit3, Plus, Share2, Play, Eye,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { BRANDS } from "../data/mockData";
import { MetricsSection } from "../shared/MetricsSection";
import { TechnologiesSection } from "../shared/TechnologiesSection";
import { IndustryNewsSection } from "../shared/IndustryNewsSection";
import { ContributeSection } from "../shared/ContributeSection";
import { NewsletterSection } from "../shared/NewsletterSection";

// L3 Data - Indoor Lighting detailed breakdown
const INDOOR_LIGHTING_L3 = {
  id: "indoor-lighting",
  name: "Indoor Lighting",
  parentCategory: "Lighting",
  description:
    "Complete guide to indoor lighting solutions including LED bulbs, downlighters, panels, battens, track lights, and decorative fixtures for residential and commercial interiors.",
  overview: `Indoor lighting is the backbone of interior design and functionality in homes, offices, retail spaces, and institutional buildings. Modern indoor lighting systems combine aesthetics, energy efficiency, and advanced control capabilities.

The Indian indoor lighting market is valued at ₹18,500 Cr (2024) and growing at 14% CAGR, driven by LED adoption, smart home integration, and premium design consciousness. BIS and BEE certifications ensure product quality and energy efficiency.

Indoor lighting is categorized by fixture type (recessed, surface-mounted, suspended), light source (LED, CFL, incandescent), application (general, task, accent), and control system (manual, dimming, smart). Understanding these helps specify the right product for each space.`,

  keyFacts: [
    { label: "Market Size (India, 2024)", value: "₹18,500 Cr" },
    { label: "LED Adoption Rate", value: "78%" },
    { label: "Avg. Energy Savings vs Halogen", value: "75–85%" },
    { label: "Typical LED Lumen Efficacy", value: "100–130 lm/W" },
    { label: "Registered Brands (Indoor)", value: "320+" },
    { label: "Avg. Product Lifespan", value: "30,000–50,000 hrs" },
  ],

  stats: [
    { value: "320+", label: "Verified Brands" },
    { value: "4,800+", label: "Products Listed" },
    { value: "28", label: "Industry Experts" },
    { value: "1.8M", label: "Page Views / Mo" },
  ],

  // L4 subcategories
  subcategories: [
    { id: "led-bulbs", name: "LED Bulbs", count: 145, description: "A, B, and G-type bulbs for general lighting", brands: 85 },
    { id: "downlighters", name: "Downlighters & Spotlights", count: 98, description: "Recessed and surface-mounted ceiling lights", brands: 72 },
    { id: "panel-lights", name: "Panel Lights", count: 76, description: "Slim, edge-lit panels for false ceilings", brands: 68 },
    { id: "battens", name: "Battens & Tube Lights", count: 89, description: "Linear fixtures for offices and corridors", brands: 54 },
    { id: "track-lights", name: "Track Lighting", count: 54, description: "Adjustable rail-mounted directional lights", brands: 48 },
    { id: "cove-lights", name: "Cove & Concealed Lighting", count: 42, description: "LED strips for architectural accents", brands: 39 },
  ],

  // L3-specific brand list (more regional players)
  topBrands: [
    { id: "philips-lighting", name: "Philips Lighting", logo: null, region: "West", type: "National" },
    { id: "havells", name: "Havells India", logo: null, region: "North", type: "National" },
    { id: "syska-led", name: "Syska LED", logo: null, region: "South", type: "National" },
    { id: "bajaj-electricals", name: "Bajaj Electricals", logo: null, region: "West", type: "National" },
    { id: "wipro-lighting", name: "Wipro Lighting", logo: null, region: "South", type: "National" },
    { id: "panasonic-india", name: "Panasonic India", logo: null, region: "North", type: "National" },
    { id: "orient-electric", name: "Orient Electric", logo: null, region: "East", type: "National" },
    { id: "eveready-lighting", name: "Eveready Lighting", logo: null, region: "East", type: "National" },
  ],

  applications: [
    {
      id: "living-room",
      title: "Living Room",
      description: "Layered lighting with ambient downlights, accent spots, and decorative pendants. Recommended: 3000K warm white, 300-500 lux, dimmable controls.",
    },
    {
      id: "bedroom",
      title: "Bedroom",
      description: "Soft ambient lighting with bedside reading lights. Recommended: 2700-3000K, 150-300 lux, warmer tones for relaxation.",
    },
    {
      id: "kitchen",
      title: "Kitchen",
      description: "Bright task lighting over counters with general ceiling lights. Recommended: 4000K neutral white, 500-750 lux, CRI 90+.",
    },
    {
      id: "office",
      title: "Office Spaces",
      description: "Uniform panel lights or battens with minimal glare. Recommended: 4000-4500K, 400-500 lux, UGR < 19.",
    },
  ],

  knowledgeSections: [
    {
      id: "types",
      title: "Indoor Lighting Product Types",
      content: `**LED Bulbs:** The most common replacement for traditional incandescent and CFL lamps, offering 80-90% energy savings with lifespans of 25,000+ hours.

**Downlighters:** Recessed or surface-mounted ceiling lights providing focused or ambient illumination, ideal for modern interiors.

**Panel Lights:** Ultra-slim edge-lit LED panels that fit into false ceiling grids, popular in commercial offices and modern homes.

**Battens & Tube Lights:** Linear LED fixtures replacing traditional fluorescent tubes, perfect for uniform lighting in corridors and workspaces.`,
    },
    {
      id: "standards",
      title: "Standards & Certifications",
      content: `**BIS Certification (IS 16102):** Mandatory for all LED luminaires sold in India, ensuring minimum quality and safety.

**BEE Star Rating:** 5-star rated products are most energy-efficient, helping reduce electricity costs.

**CRI (Color Rendering Index):** Minimum CRI 80 required for general lighting; CRI 90+ recommended for task and accent lighting.

**IP Rating:** Indoor products typically rated IP20 (dust protected); bathroom and kitchen areas may require IP44 or higher.`,
    },
  ],

  technologies: {
    india: [
      { name: "Smart LED Integration", description: "Wi-Fi and Bluetooth enabled fixtures with app control, growing at 25% CAGR in urban India", adoption: "high" },
      { name: "COB LED Technology", description: "Chip-on-Board LEDs providing higher lumen density and better color consistency", adoption: "medium" },
      { name: "Tunable White Systems", description: "CCT-adjustable fixtures mimicking natural daylight cycles, increasingly popular in premium residential", adoption: "medium" },
    ],
    specific: [
      { name: "Dimming Technologies", description: "TRIAC, 0-10V, DALI dimming protocols for residential and commercial control", adoption: "high" },
      { name: "Sensor Integration", description: "PIR motion and daylight sensors for automated energy management", adoption: "high" },
      { name: "Emergency Backup", description: "Battery-integrated panels and battens for uninterrupted operation during power cuts", adoption: "medium" },
    ],
  },

  news: [
    {
      id: "1",
      title: "BEE Updates Star Rating Norms for LED Luminaires",
      date: "Mar 15, 2026",
      source: "Bureau of Energy Efficiency",
      summary: "New efficacy benchmarks mandate minimum 120 lm/W for 5-star rated LED panels and downlighters.",
      category: "Regulation",
    },
    {
      id: "2",
      title: "Smart Lighting Adoption Crosses 15% in Metro Cities",
      date: "Mar 10, 2026",
      source: "India Lighting Market Report 2026",
      summary: "Wi-Fi and app-controlled indoor lighting sees rapid uptake among millennials and Gen-Z homeowners.",
      category: "Market Trend",
    },
    {
      id: "3",
      title: "Havells Launches Tunable White Panel Range",
      date: "Mar 5, 2026",
      source: "Company Press Release",
      summary: "New CCT-adjustable panels allow users to switch between warm and cool white tones via remote control.",
      category: "Product Launch",
    },
  ],

  experts: [
    { name: "Rajesh Kumar", initials: "RK", contributions: 87 },
    { name: "Priya Sharma", initials: "PS", contributions: 64 },
    { name: "Amit Patel", initials: "AP", contributions: 52 },
    { name: "Neha Gupta", initials: "NG", contributions: 41 },
  ],
};

const TOC_ITEMS = [
  { id: "metrics", label: "Platform Metrics" },
  { id: "overview", label: "Overview" },
  { id: "types", label: "Product Types" },
  { id: "applications", label: "Applications" },
  { id: "standards", label: "Standards & Certifications" },
  { id: "technologies", label: "Technologies" },
  { id: "top-brands", label: "Top Brands" },
  { id: "news", label: "Industry News" },
  { id: "contribute", label: "Contribute" },
  { id: "newsletter", label: "Stay Informed" },
];

function SectionHeading({ id, label, editLabel = true }: { id: string; label: string; editLabel?: boolean }) {
  return (
    <div id={id} className="flex items-center justify-between mb-5 pt-1">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{label}</h2>
      </div>
      {editLabel && (
        <button
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all"
          style={{ color: "var(--accent)", background: "var(--accent-light)", fontWeight: 500 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.16)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
        >
          <Edit3 className="w-3 h-3" /> Edit
        </button>
      )}
    </div>
  );
}

export function L3SubcategoryPage() {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const [activeToc, setActiveToc] = useState("overview");

  // Filter brands for this subcategory
  const relevantBrands = BRANDS.filter((b) =>
    b.subcategories.some((s) => s.toLowerCase().includes("indoor"))
  );

  const scrollTo = (id: string) => {
    setActiveToc(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5">
          <Link to="/" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Electrical</span>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <Link to="/category/lighting" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >{INDOOR_LIGHTING_L3.parentCategory}</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {INDOOR_LIGHTING_L3.name}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #fff4ef 0%, #f5f7fb 55%, #fff0e8 100%)", minHeight: "320px" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,61,0.10) 0%, transparent 65%)", transform: "translate(20%,-30%)" }} />
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,61,0.06) 0%, transparent 70%)", transform: "translate(-20%,30%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="pill active" style={{ fontSize: "0.7rem" }}>
                  {INDOOR_LIGHTING_L3.parentCategory}
                </span>
                <span className="pill" style={{ fontSize: "0.7rem" }}>L3 - Subcategory</span>
                <span
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)", fontWeight: 600, fontSize: "0.7rem" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
                </span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                {INDOOR_LIGHTING_L3.name}
              </h1>
              <div style={{ width: "40px", height: "4px", background: "var(--accent)", borderRadius: "4px", margin: "12px 0" }} />
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {INDOOR_LIGHTING_L3.description}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6">
                {INDOOR_LIGHTING_L3.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em" }}>{s.value}</div>
                    <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card panel */}
            <div className="gl-hero-panel p-6 w-full lg:w-auto lg:min-w-[280px] flex-shrink-0">
              <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "8px" }}>
                Quick Facts
              </p>
              <div className="space-y-3 mb-5">
                {INDOOR_LIGHTING_L3.keyFacts.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{f.label}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/category/lighting/brands")}
                  className="btn-primary justify-center w-full"
                >
                  View All Brands <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex gap-2">
                  <button className="btn-secondary flex-1 justify-center" style={{ fontSize: "0.75rem", padding: "8px 12px" }}>
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button className="btn-secondary flex-1 justify-center" style={{ fontSize: "0.75rem", padding: "8px 12px" }}>
                    <Plus className="w-3.5 h-3.5" /> Contribute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory strip (L4 navigation) */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)", backdropFilter: "blur(12px)" }} className="overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 min-w-max">
            {INDOOR_LIGHTING_L3.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/l4/${sub.id}`}
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs border-b-2 border-transparent transition-all whitespace-nowrap"
                style={{ fontWeight: 500, color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }}
              >
                {sub.name}
                <span
                  className="px-1.5 py-0.5 rounded-full"
                  style={{ fontSize: "0.6rem", background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
                >
                  {sub.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">

          {/* TOC Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* TOC */}
              <div className="gl-strong overflow-hidden" style={{ borderRadius: "var(--r-md)" }}>
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: "var(--accent-light)", borderBottom: "var(--border)" }}
                >
                  <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-primary)" }}>
                    Contents
                  </span>
                </div>
                <nav className="py-1">
                  {TOC_ITEMS.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`toc-btn ${activeToc === item.id ? "active" : ""}`}
                    >
                      <span style={{ color: "var(--accent)", fontSize: "0.65rem", fontWeight: 700, minWidth: "14px" }}>{i + 1}.</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Key Facts sidebar */}
              <div className="gl-strong overflow-hidden" style={{ borderRadius: "var(--r-md)" }}>
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: "var(--accent-light)", borderBottom: "var(--border)" }}
                >
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-primary)" }}>
                    Key Facts
                  </span>
                </div>
                <div>
                  {INDOOR_LIGHTING_L3.keyFacts.map((f, i) => (
                    <div
                      key={i}
                      className="px-4 py-3"
                      style={{ borderBottom: i < INDOOR_LIGHTING_L3.keyFacts.length - 1 ? "var(--border)" : "none" }}
                    >
                      <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "3px" }}>
                        {f.label}
                      </div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Contributors */}
              <div className="gl-strong overflow-hidden" style={{ borderRadius: "var(--r-md)" }}>
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: "var(--accent-light)", borderBottom: "var(--border)" }}>
                  <Users className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-primary)" }}>
                    Top Contributors
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {INDOOR_LIGHTING_L3.experts.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ background: `hsl(${i * 60 + 20}, 65%, 52%)`, fontSize: "0.62rem", fontWeight: 700 }}
                      >
                        {ex.initials}
                      </div>
                      <div className="min-w-0">
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">{ex.name}</div>
                        <div style={{ fontSize: "0.63rem", color: "var(--text-muted)" }} className="truncate">{ex.contributions} contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <main className="flex-1 min-w-0 space-y-12">

            {/* Metrics */}
            <MetricsSection level="L3" categoryName="Indoor Lighting" />

            {/* Overview */}
            <section id="overview">
              <SectionHeading id="overview-heading" label="Overview" />
              <div className="space-y-4">
                {INDOOR_LIGHTING_L3.overview.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>{para}</p>
                ))}
              </div>
            </section>

            {/* Knowledge Sections */}
            {INDOOR_LIGHTING_L3.knowledgeSections.map((section) => (
              <section key={section.id} id={section.id}>
                <SectionHeading id={`${section.id}-heading`} label={section.title} />
                <div className="space-y-4">
                  {section.content.split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>{para}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* Technologies */}
            <TechnologiesSection level="L3" technologies={INDOOR_LIGHTING_L3.technologies} />

            {/* Applications */}
            <section id="applications">
              <SectionHeading id="applications-heading" label="Applications" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INDOOR_LIGHTING_L3.applications.map((app) => (
                  <div key={app.id} className="gl-card p-5" style={{ borderRadius: "var(--r-md)" }}>
                    <h3 className="font-bold mb-2" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      {app.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                      {app.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Brands */}
            <section id="top-brands">
              <SectionHeading id="top-brands-heading" label="Top Brands" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {INDOOR_LIGHTING_L3.topBrands.map((brand) => {
                  const fullBrand = BRANDS.find((b) => b.id === brand.id);
                  if (!fullBrand) return null;

                  return (
                    <Link
                      key={brand.id}
                      to={`/brand/${brand.id}`}
                      className="glass-card rounded-xl p-5 group hover-lift"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                          style={{ background: `linear-gradient(135deg, ${fullBrand.accentColor || "var(--accent)"}ee, ${fullBrand.accentColor || "var(--accent)"}99)`, fontWeight: 800, fontSize: "0.8rem" }}
                        >
                          {fullBrand.name.slice(0, 2).toUpperCase()}
                        </div>
                        {fullBrand.isFeatured && (
                          <Star className="w-4 h-4" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
                        )}
                      </div>

                      <h3 className="font-bold mb-1 group-hover:text-[var(--accent)] transition-colors" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                        {fullBrand.name}
                      </h3>
                      <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                        {brand.type} • {brand.region}
                      </p>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {fullBrand.city}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Industry News */}
            <IndustryNewsSection news={INDOOR_LIGHTING_L3.news} categoryName="Indoor Lighting" />

            {/* Contribute CTA */}
            <ContributeSection topContributors={INDOOR_LIGHTING_L3.experts} categoryName="Indoor Lighting" />

            {/* Newsletter CTA */}
            <NewsletterSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
