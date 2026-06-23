import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, ExternalLink, Share2, Mail, Phone, MapPin, Star,
  Globe, Package, Store, Briefcase, Clock, ChevronRight,
  Image as ImageIcon, BookOpen, Award, LayoutGrid, Search,
  Send, Plus, CheckCircle, ChevronDown, Download, Eye,
  TrendingUp, Users, Zap, Building2,
} from "lucide-react";
import { BRANDS } from "../data/mockData";

function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 rounded-2xl"
      style={{ background: "rgba(0,0,0,0.02)", border: "2px dashed rgba(0,0,0,0.08)" }}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "var(--accent-light)" }}>
        <Icon className="w-6 h-6" style={{ color: "var(--accent)" }} />
      </div>
      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>{label}</p>
      <button className="btn-primary mt-4" style={{ fontSize: "0.75rem", padding: "8px 16px" }}>
        <Plus className="w-3.5 h-3.5" /> Add Content
      </button>
    </div>
  );
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "catalogues", label: "Catalogues" },
  { id: "certificates", label: "Certificates" },
  { id: "portfolio", label: "Portfolio" },
  { id: "stores", label: "Stores" },
];

export function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = BRANDS.find((b) => b.id === brandId) || BRANDS[0];
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [submitted, setSubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setInquiryForm({ name: "", email: "", phone: "", message: "" });
  };

  const stats = [
    { label: "Products", value: brand.productCount, icon: Package, color: "#ff6a3d" },
    { label: "Stores", value: brand.storeCount, icon: Store, color: "#10b981" },
    { label: "Portfolio", value: brand.portfolioCount, icon: Briefcase, color: "#6366f1" },
    { label: "Yrs Exp.", value: brand.yearsExp, icon: Clock, color: "#f59e0b" },
  ];

  const accentColor = brand.accentColor || "var(--accent)";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Back bar */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <Link
            to="/category/lighting/brands"
            className="flex items-center gap-1.5 w-fit transition-all"
            style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Brands
          </Link>
        </div>
      </div>

      {/* ── Brand Hero (light) ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #fff8f5 0%, #f5f7fb 60%, #fff4ef 100%)", borderBottom: "var(--border)" }}
      >
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}18 0%, transparent 65%)`, transform: "translate(20%,-30%)" }} />

        {/* Banner strip */}
        <div
          className="w-full flex items-center justify-center"
          style={{ minHeight: "120px", background: "rgba(0,0,0,0.02)", borderBottom: "var(--border)" }}
        >
          <div className="flex items-center gap-2 opacity-30">
            <ImageIcon className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>Banner area</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Brand logo */}
            <div
              className="w-[88px] h-[88px] rounded-2xl flex items-center justify-center text-white flex-shrink-0 -mt-12 relative"
              style={{
                background: `linear-gradient(135deg, ${accentColor}f0, ${accentColor}99)`,
                boxShadow: `0 8px 32px ${accentColor}44`,
                border: "4px solid white",
                fontWeight: 900,
                fontSize: "1.2rem",
              }}
            >
              {brand.name.slice(0, brand.name.includes(" ") ? brand.name.indexOf(" ") : 4).toUpperCase().slice(0, 4)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="pill active" style={{ fontSize: "0.68rem" }}>{brand.category}</span>
                {brand.isFeatured && (
                  <span className="text-white px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700, background: "var(--accent)", boxShadow: "var(--shadow-orange)" }}>
                    ✦ FEATURED BRAND
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "6px" }}>
                {brand.name}
              </h1>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "10px" }}>{brand.tagline}</p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <a href={brand.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all"
                  style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {brand.website.replace("https://", "")}
                </a>
                <div className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  {brand.location}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                {brand.rating ? (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{ background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}
                  >
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5" style={{ fill: s <= Math.floor(brand.rating!) ? "var(--accent)" : "transparent", color: "var(--accent)" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)" }}>{brand.rating} / 5.0</span>
                  </div>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No ratings yet</span>
                )}
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all"
                  style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", background: "var(--accent-light)", border: "1px solid var(--accent-border)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.16)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                >
                  <Star className="w-3 h-3" /> Rate Brand
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 flex-shrink-0 w-full md:w-auto">
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
                style={{ minWidth: "180px" }}
              >
                Visit Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex gap-2">
                <button className="btn-secondary flex-1 justify-center" style={{ fontSize: "0.75rem", padding: "8px 14px" }}>
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button
                  onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-secondary flex-1 justify-center"
                  style={{ fontSize: "0.75rem", padding: "8px 14px" }}
                >
                  <Mail className="w-3.5 h-3.5" /> Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex flex-col items-center py-5 px-4 transition-all group cursor-default" style={{ gap: "4px" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-all group-hover:scale-110" style={{ background: `${color}14` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div
        className="sticky z-40 overflow-x-auto"
        style={{ top: "58px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); document.getElementById(`section-${tab.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="px-4 py-3.5 text-xs border-b-2 transition-all whitespace-nowrap"
                style={{
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  letterSpacing: "0.02em",
                  color: activeTab === tab.id ? "var(--accent)" : "var(--text-secondary)",
                  borderBottomColor: activeTab === tab.id ? "var(--accent)" : "transparent",
                  background: "transparent",
                }}
                onMouseEnter={(e) => { if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* ── Overview ── */}
        <div id="section-overview" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
              About the Brand
            </p>
            <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>{brand.about}</p>

            {/* Sub-category chips */}
            <div className="flex flex-wrap gap-2 mt-5">
              {brand.subcategories.map((s) => (
                <span key={s} className="pill" style={{ fontSize: "0.72rem" }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
              Brand Categories
            </p>
            <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
            <div className="space-y-3">
              {brand.brandCategories.map((bc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all"
                  style={{ background: "var(--glass-strong)", border: "var(--border)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "")}
                >
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{bc.category.toUpperCase()}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{bc.level} · {bc.parent}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact card */}
            <div className="mt-6 p-4 rounded-2xl" style={{ background: "var(--glass)", border: "var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "10px" }}>Quick Contact</p>
              <div className="space-y-2.5">
                <a href={`mailto:${brand.contact.email}`} className="flex items-center gap-2 transition-all"
                  style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {brand.contact.email}
                </a>
                <a href={`tel:${brand.contact.phone}`} className="flex items-center gap-2 transition-all"
                  style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {brand.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Categories ── */}
        <div id="section-products">
          <div className="flex items-center justify-between mb-5">
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              Product Categories
            </p>
            {brand.productCategories.some((p) => p.count > 0) && (
              <button
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ color: "var(--accent)", background: "var(--accent-light)", fontWeight: 600 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.16)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brand.productCategories.map((cat, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden cursor-pointer group transition-all"
                style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
              >
                <div
                  className="flex items-center justify-center transition-colors"
                  style={{ height: "110px", background: `linear-gradient(135deg, ${brand.accentColor || "var(--accent)"}10, ${brand.accentColor || "var(--accent)"}05)` }}
                >
                  <ImageIcon className="w-9 h-9 transition-all group-hover:scale-110" style={{ color: brand.accentColor || "var(--accent)", opacity: 0.4 }} />
                </div>
                <div className="p-3">
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{cat.name.toUpperCase()}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{cat.count} Products</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Catalogues ── */}
        <div id="section-catalogues">
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Product Catalogues
          </p>
          <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
          {brand.productCount === 0 ? (
            <EmptyState icon={BookOpen} label="No catalogues available yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-light)" }}>
                    <BookOpen className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Product Catalogue {i} — 2024</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>PDF · {Math.floor(Math.random() * 8 + 4)} MB</div>
                  </div>
                  <Download className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Certificates ── */}
        <div id="section-certificates">
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Certificates & Compliance
          </p>
          <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
          {brand.productCount === 0 ? (
            <EmptyState icon={Award} label="No certificates available yet." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "BIS Certified", desc: "IS 16102 Compliant", color: "#10b981" },
                { name: "BEE 5★ Rating", desc: "Energy Efficiency", color: "#f59e0b" },
                { name: "ISO 9001:2015", desc: "Quality Management", color: "#6366f1" },
                { name: "IP65 Rated", desc: "Outdoor Protection", color: "#0ea5e9" },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-2xl text-center cursor-pointer transition-all"
                  style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)";
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${cert.color}15` }}>
                    <Award className="w-5 h-5" style={{ color: cert.color }} />
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{cert.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{cert.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Portfolio ── */}
        <div id="section-portfolio">
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Portfolio Projects
          </p>
          <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
          {brand.portfolioCount === 0 ? (
            <EmptyState icon={LayoutGrid} label="No portfolio projects available yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { src: "https://images.unsplash.com/photo-1770682527373-bfc83796e7fd?w=600", title: "Commercial Project, Gurugram", type: "Commercial" },
                { src: "https://images.unsplash.com/photo-1696743297592-b841d160c222?w=600", title: "Residential Complex, Delhi", type: "Residential" },
                { src: "https://images.unsplash.com/photo-1732644144489-b1974816d3c0?w=600", title: "Street Lighting, Pune", type: "Outdoor" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden cursor-pointer group transition-all"
                  style={{ boxShadow: "var(--shadow-sm)", border: "var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={p.src} alt={p.title} className="w-full h-full object-cover" style={{ transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-white px-2 py-0.5 rounded-full text-xs" style={{ background: "var(--accent)", fontSize: "0.65rem", fontWeight: 600 }}>
                        {p.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-3" style={{ background: "var(--glass-strong)" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Stores ── */}
        <div id="section-stores">
          <div className="flex items-center justify-between mb-5">
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              Stores & Locations
            </p>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="gl-input"
                  style={{ paddingLeft: "30px", width: "140px", fontSize: "0.78rem", padding: "7px 14px 7px 30px" }}
                />
              </div>
            </div>
          </div>
          <div className="h-px mb-5" style={{ background: "var(--bg-surface)" }} />
          {brand.storeCount === 0 ? (
            <EmptyState icon={MapPin} label="No physical stores listed for this brand." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Delhi Flagship Showroom", address: "Shop No 112, Shiva Market, Pitampura, New Delhi", pin: "110034", type: "Flagship" },
                { name: "Bawana Service Centre", address: "Plot 237, PKT F, Sector 5, Bawana DSIDC, New Delhi", pin: "110039", type: "Service" },
                { name: "Rohini Display Studio", address: "A-4 Sector 9, Rohini, New Delhi", pin: "110085", type: "Studio" },
              ].map((store, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl transition-all"
                  style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-light)" }}>
                      <MapPin className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "var(--text-primary)" }}>{store.name}</div>
                        <span className="pill" style={{ fontSize: "0.6rem", padding: "2px 7px" }}>{store.type}</span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{store.address}</p>
                      <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>PIN: {store.pin}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Contact Section (light) ── */}
      <div
        id="contact-section"
        className="mt-8"
        style={{ background: "linear-gradient(140deg, #fff4ef 0%, #f5f7fb 60%, #fdf4ef 100%)", borderTop: "var(--border)", borderBottom: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "8px" }}>
              Get in Touch
            </p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Connect with {brand.name}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "8px" }}>
              Reach out for product specifications, pricing, and technical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Contact Person", value: brand.contact.person, icon: Users },
                { label: "Website", value: brand.contact.website, icon: Globe, isLink: true },
                { label: "Email", value: brand.contact.email, icon: Mail, isLink: true, href: `mailto:${brand.contact.email}` },
                { label: "Phone", value: brand.contact.phone, icon: Phone, isLink: true, href: `tel:${brand.contact.phone}` },
                { label: "City, State", value: brand.contact.cityState, icon: Building2 },
                { label: "Pincode, Country", value: `${brand.contact.pincode}, ${brand.contact.country}`, icon: MapPin },
              ].map(({ label, value, icon: Icon, isLink, href }: any) => (
                <div
                  key={label}
                  className="p-4 rounded-2xl transition-all"
                  style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)")}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                      {label}
                    </span>
                  </div>
                  {isLink && href ? (
                    <a href={href} style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)", wordBreak: "break-all" }}>
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", wordBreak: "break-all" }}>{value}</p>
                  )}
                </div>
              ))}

              {/* Full address */}
              <div
                className="sm:col-span-2 p-4 rounded-2xl transition-all"
                style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-xs)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  </div>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                    Head Office Address
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{brand.contact.address}</p>
              </div>
            </div>

            {/* Inquiry form */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-md)" }}
            >
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "4px" }}>Direct Inquiry</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Send a message directly to the brand's sales team.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)" }}>
                    <CheckCircle className="w-7 h-7" style={{ color: "#10b981" }} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>Inquiry Sent!</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center" }}>
                    The brand will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "6px" }}>
                      Name *
                    </label>
                    <input
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className="gl-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "6px" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="gl-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "6px" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="gl-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "6px" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your project requirements, product queries..."
                      className="gl-input"
                      style={{ resize: "none" }}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center" style={{ padding: "12px 24px" }}>
                    Send Inquiry <Send className="w-4 h-4" />
                  </button>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", textAlign: "center" }}>
                    Your information is safe. We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
