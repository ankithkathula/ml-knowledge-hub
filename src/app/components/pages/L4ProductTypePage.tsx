import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ChevronRight, Star, MapPin, Building2, Package, Award,
  TrendingUp, Zap, CheckCircle, Info, ShoppingBag, ArrowRight,
  BookOpen, Users, Edit3, Plus, Share2,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { BRANDS } from "../data/mockData";
import { MetricsSection } from "../shared/MetricsSection";
import { TechnologiesSection } from "../shared/TechnologiesSection";
import { IndustryNewsSection } from "../shared/IndustryNewsSection";
import { ContributeSection } from "../shared/ContributeSection";
import { NewsletterSection } from "../shared/NewsletterSection";

// L4 Data - LED Bulbs (most granular level)
const LED_BULBS_L4 = {
  id: "led-bulbs",
  name: "LED Bulbs",
  parentCategory: "Indoor Lighting",
  grandParent: "Lighting",
  description:
    "Comprehensive guide to LED bulbs including A-type, B-type, globe, candle, and specialty LED lamps for general illumination across residential and commercial applications.",
  
  overview: `LED bulbs have become the standard for general lighting worldwide due to their exceptional energy efficiency, long lifespan, and environmental benefits. In India, LED bulbs account for over 80% of residential lamp sales.

The Indian LED bulb market is valued at ₹5,200 Cr (2024) with an annual sales volume of 350+ million units. UJALA scheme and declining costs have accelerated adoption across all income segments.

LED bulbs are available in multiple wattages (3W to 20W), color temperatures (2700K to 6500K), base types (B22, E27, E14), and form factors (standard A-type, globe, candle). Understanding these parameters is critical for proper specification.`,

  keySpecs: [
    { label: "Typical Wattage Range", value: "3W – 20W" },
    { label: "Lumen Output", value: "250 – 2000 lm" },
    { label: "Efficacy", value: "100–130 lm/W" },
    { label: "Lifespan", value: "25,000–50,000 hrs" },
    { label: "Color Temperatures", value: "2700K–6500K" },
    { label: "CRI", value: "≥ 80" },
  ],

  stats: [
    { value: "85+", label: "Verified Brands" },
    { value: "1,250+", label: "Products Listed" },
    { value: "18", label: "Industry Experts" },
    { value: "450K", label: "Page Views / Mo" },
  ],

  productTypes: [
    {
      name: "A-Type (Standard)",
      description: "Most common general-purpose bulb shape, 5W–20W, suitable for ceiling fixtures and table lamps.",
      usage: "Living rooms, bedrooms, offices",
    },
    {
      name: "B-Type (Bayonet)",
      description: "India-standard B22 bayonet base, quick twist-lock installation.",
      usage: "All residential and commercial fittings",
    },
    {
      name: "Globe Bulbs",
      description: "Large spherical shape for decorative fixtures, typically 9W–15W.",
      usage: "Pendant lights, bathroom vanities",
    },
    {
      name: "Candle Bulbs",
      description: "Flame-shaped for chandeliers and decorative sconces, 3W–7W.",
      usage: "Decorative and hospitality lighting",
    },
    {
      name: "Smart LED Bulbs",
      description: "Wi-Fi/Bluetooth enabled with color-changing and dimming capabilities.",
      usage: "Smart homes, mood lighting",
    },
  ],

  buyingGuide: [
    {
      title: "Lumen Output Selection",
      content: "Choose lumens based on room size: 400–800 lm for bedrooms, 800–1500 lm for living rooms, 1500–2500 lm for large spaces.",
    },
    {
      title: "Color Temperature",
      content: "Warm white (2700–3000K) for relaxing spaces, neutral white (4000K) for offices, cool daylight (5000–6500K) for task areas.",
    },
    {
      title: "Base Type",
      content: "B22 (bayonet) is standard in India. E27 (screw) and E14 (small screw) for specialty fittings. Verify your fixture before purchase.",
    },
    {
      title: "Quality Indicators",
      content: "Look for BIS certification, BEE star rating (4–5 stars preferred), branded drivers, and minimum 2-year warranty.",
    },
  ],

  // L4 brands include MORE regional/local players
  brandsL4: [
    // National brands
    { id: "philips-lighting", name: "Philips Lighting", region: "All India", tier: "Premium", specialization: "Full range, high-CRI" },
    { id: "havells", name: "Havells India", region: "All India", tier: "Premium", specialization: "Energy-efficient, smart bulbs" },
    { id: "syska-led", name: "Syska LED", region: "All India", tier: "Mid-range", specialization: "Value for money" },
    { id: "bajaj-electricals", name: "Bajaj Electricals", region: "All India", tier: "Mid-range", specialization: "Durable, long lifespan" },
    { id: "wipro-lighting", name: "Wipro Lighting", region: "All India", tier: "Premium", specialization: "Smart integration" },
    { id: "panasonic-india", name: "Panasonic India", region: "All India", tier: "Premium", specialization: "Japanese quality" },
    { id: "orient-electric", name: "Orient Electric", region: "All India", tier: "Mid-range", specialization: "Decorative shapes" },
    { id: "eveready-lighting", name: "Eveready Lighting", region: "All India", tier: "Budget", specialization: "Affordable, reliable" },
    
    // MORE Regional players (L4 has increased regional focus)
    { id: "lumex-north", name: "Lumex Electricals", region: "North India", tier: "Regional", specialization: "B22 bayonet specialists" },
    { id: "brightsun-west", name: "BrightSun Industries", region: "West India", tier: "Regional", specialization: "Commercial bulk supply" },
    { id: "southern-leds", name: "Southern LED Co.", region: "South India", tier: "Regional", specialization: "Custom color temps" },
    { id: "eastern-lights", name: "Eastern Lights Pvt Ltd", region: "East India", tier: "Regional", specialization: "Low-cost rural solutions" },
    { id: "delhi-luminaires", name: "Delhi Luminaires", region: "North India", tier: "Regional", specialization: "Smart bulb assemblies" },
    { id: "mumbai-led-works", name: "Mumbai LED Works", region: "West India", tier: "Regional", specialization: "High-wattage bulbs" },
    { id: "bangalore-lighting", name: "Bangalore Lighting Co", region: "South India", tier: "Regional", specialization: "Color-tunable LEDs" },
    { id: "kolkata-electric", name: "Kolkata Electric", region: "East India", tier: "Regional", specialization: "Budget segment leader" },
  ],

  knowledgeSections: [
    {
      id: "types",
      title: "LED Bulb Types and Specifications",
      content: `**A-Type Bulbs:** Traditional shape, the most common replacement for incandescent bulbs. Available in 5W (40W equivalent) to 20W (100W+ equivalent).

**B22 Bayonet Base:** India's standard quick-twist base, inherited from British electrical standards. Most common in residential installations.

**E27 Edison Screw:** International standard screw base, increasingly popular in new construction and imported fixtures.

**Smart LED Bulbs:** Wi-Fi or Bluetooth enabled, allowing app control, color changing (RGB), dimming, and scheduling capabilities.`,
    },
    {
      id: "standards",
      title: "Standards, Certifications & Quality Markers",
      content: `**BIS (IS 16102):** Mandatory certification for LED lamps sold in India. Ensures minimum safety and performance standards.

**BEE Star Rating:** 5-star bulbs consume the least power per lumen. Check for BEE label when purchasing.

**Lumen Maintenance (L70):** Indicates hours until bulb reaches 70% of original brightness. Quality LEDs maintain >70% after 25,000 hours.

**Color Rendering Index (CRI):** Minimum CRI 80 for general use; CRI 90+ for accurate color perception in retail, galleries, and task lighting.`,
    },
  ],

  technologies: {
    india: [
      { name: "Driver IC Integration", description: "Advanced driver circuits with PFC (Power Factor Correction) improving efficiency and reducing flicker", adoption: "high" },
      { name: "Thermal Management", description: "Aluminum heat sinks and thermal plastics ensuring long LED lifespan in hot Indian climates", adoption: "high" },
      { name: "Smart Bulb Platforms", description: "Integration with Alexa, Google Home, and local Indian smart home ecosystems", adoption: "medium" },
    ],
    specific: [
      { name: "Instant-On Technology", description: "Zero warm-up time unlike CFLs, full brightness immediately on switching", adoption: "high" },
      { name: "Dimming Compatibility", description: "TRIAC and phase-cut dimmer compatibility for residential retrofit applications", adoption: "medium" },
      { name: "Emergency Backup", description: "Integrated battery providing 3-4 hours of light during power cuts, popular in tier-2/3 cities", adoption: "medium" },
    ],
  },

  news: [
    {
      id: "1",
      title: "BEE Revises Star Rating for LED Bulbs - Higher Efficacy Required",
      date: "Mar 20, 2026",
      source: "Bureau of Energy Efficiency",
      summary: "New norms effective April 2026 mandate minimum 110 lm/W for 5-star bulbs, up from 100 lm/W.",
      category: "Regulation",
    },
    {
      id: "2",
      title: "Philips Launches 'SceneSwitch' - 3-in-1 LED Bulb Without Dimmer",
      date: "Mar 12, 2026",
      source: "Product Launch",
      summary: "New technology allows switching between warm, neutral, and cool white using standard wall switch.",
      category: "Innovation",
    },
    {
      id: "3",
      title: "Smart LED Bulb Prices Drop 30% YoY as Volumes Scale",
      date: "Mar 8, 2026",
      source: "Market Analysis",
      summary: "Wi-Fi enabled color-changing bulbs now available under ₹500, driving mass adoption in metro cities.",
      category: "Market Trend",
    },
    {
      id: "4",
      title: "UJALA 2.0: Govt Plans to Distribute 50 Million LED Bulbs in Rural Areas",
      date: "Mar 3, 2026",
      source: "Government Initiative",
      summary: "Expanded scheme targets tier-3 cities and villages with subsidized 9W LED bulbs at ₹60 each.",
      category: "Policy",
    },
  ],

  experts: [
    { name: "Anil Verma", initials: "AV", contributions: 124 },
    { name: "Sanjay Mehta", initials: "SM", contributions: 98 },
    { name: "Priya Nair", initials: "PN", contributions: 76 },
    { name: "Ramesh Kumar", initials: "RK", contributions: 63 },
  ],
};

const TOC_ITEMS = [
  { id: "metrics", label: "Platform Metrics" },
  { id: "overview", label: "Overview" },
  { id: "types", label: "Product Types" },
  { id: "standards", label: "Standards & Certifications" },
  { id: "buying-guide", label: "Buying Guide" },
  { id: "technologies", label: "Technologies" },
  { id: "brands", label: "Brands (National & Regional)" },
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

export function L4ProductTypePage() {
  const { productTypeId } = useParams();
  const navigate = useNavigate();
  const [activeToc, setActiveToc] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveToc(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5 text-xs">
          <Link to="/" style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span style={{ color: "var(--text-muted)" }}>Electrical</span>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <Link to="/category/lighting" style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >{LED_BULBS_L4.grandParent}</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <Link to="/l3/indoor-lighting" style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >{LED_BULBS_L4.parentCategory}</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
            {LED_BULBS_L4.name}
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
                  {LED_BULBS_L4.parentCategory}
                </span>
                <span className="pill" style={{ fontSize: "0.7rem" }}>L4 - Product Type</span>
                <span
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)", fontWeight: 600, fontSize: "0.7rem" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
                </span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                {LED_BULBS_L4.name}
              </h1>
              <div style={{ width: "40px", height: "4px", background: "var(--accent)", borderRadius: "4px", margin: "12px 0" }} />
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {LED_BULBS_L4.description}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6">
                {LED_BULBS_L4.stats.map((s, i) => (
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
                Key Specifications
              </p>
              <div className="space-y-3 mb-5">
                {LED_BULBS_L4.keySpecs.slice(0, 4).map((f, i) => (
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
                  Compare Brands <ArrowRight className="w-3.5 h-3.5" />
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

              {/* Key Specs sidebar */}
              <div className="gl-strong overflow-hidden" style={{ borderRadius: "var(--r-md)" }}>
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: "var(--accent-light)", borderBottom: "var(--border)" }}
                >
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-primary)" }}>
                    Specifications
                  </span>
                </div>
                <div>
                  {LED_BULBS_L4.keySpecs.map((f, i) => (
                    <div
                      key={i}
                      className="px-4 py-3"
                      style={{ borderBottom: i < LED_BULBS_L4.keySpecs.length - 1 ? "var(--border)" : "none" }}
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
                  {LED_BULBS_L4.experts.map((ex, i) => (
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
            <MetricsSection level="L4" categoryName="LED Bulbs" />

            {/* Overview */}
            <section id="overview">
              <SectionHeading id="overview-heading" label="Overview" />
              <div className="space-y-4">
                {LED_BULBS_L4.overview.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>{para}</p>
                ))}
              </div>
            </section>

            {/* Knowledge Sections */}
            {LED_BULBS_L4.knowledgeSections.map((section) => (
              <section key={section.id} id={section.id}>
                <SectionHeading id={`${section.id}-heading`} label={section.title} />
                <div className="space-y-4">
                  {section.content.split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>{para}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* Buying Guide */}
            <section id="buying-guide">
              <SectionHeading id="buying-guide-heading" label="Buying Guide" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {LED_BULBS_L4.buyingGuide.map((guide, idx) => (
                  <div key={idx} className="gl-card p-5" style={{ borderRadius: "var(--r-md)" }}>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      <CheckCircle className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      {guide.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                      {guide.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technologies */}
            <TechnologiesSection level="L4" technologies={LED_BULBS_L4.technologies} />

            {/* Brands - National & Regional */}
            <section id="brands">
              <SectionHeading id="brands-heading" label="Brands - National & Regional Players" />
              
              {/* National Brands */}
              <div className="mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                  <Building2 className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  National Brands (All India Presence)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {LED_BULBS_L4.brandsL4.filter(b => b.region === "All India").map((brand) => {
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
                          {brand.specialization}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Regional Brands */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                  <MapPin className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  Regional & Local Brands
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {LED_BULBS_L4.brandsL4.filter(b => b.region !== "All India").map((brand, idx) => (
                    <div
                      key={idx}
                      className="glass-card rounded-xl p-5 hover-lift cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                          style={{ background: `hsl(${idx * 45}, 65%, 55%)`, fontWeight: 800, fontSize: "0.8rem" }}
                        >
                          {brand.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span
                          className="px-2 py-1 rounded-md text-xs font-semibold"
                          style={{ background: "rgba(168, 85, 247, 0.1)", color: "#a855f7" }}
                        >
                          {brand.tier}
                        </span>
                      </div>

                      <h3 className="font-bold mb-1" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
                        {brand.name}
                      </h3>
                      <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                        {brand.specialization}
                      </p>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" style={{ color: "var(--accent)" }} />
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {brand.region}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Industry News */}
            <IndustryNewsSection news={LED_BULBS_L4.news} categoryName="LED Bulbs" />

            {/* Contribute CTA */}
            <ContributeSection topContributors={LED_BULBS_L4.experts} categoryName="LED Bulbs" />

            {/* Newsletter CTA */}
            <NewsletterSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
