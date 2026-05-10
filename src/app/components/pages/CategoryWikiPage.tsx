import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ChevronRight, BookOpen, Star, Plus, Share2, Edit3,
  Play, ArrowRight, Eye, TrendingUp, Users, Package,
  Award, Newspaper, Lightbulb, Check,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { CATEGORY, BRANDS } from "../data/mockData";
import { TechnologiesSection } from "../shared/TechnologiesSection";
import { IndustryNewsSection } from "../shared/IndustryNewsSection";
import { ContributeSection } from "../shared/ContributeSection";
import { NewsletterSection } from "../shared/NewsletterSection";
import { BrandMarketingSection } from "../shared/BrandMarketingSection";
import { BrandCard } from "../shared/BrandCard";

const TOC_ITEMS = [
  { id: "types", label: "Concrete & Cement Products" },
  { id: "applications", label: "Applications" },
  { id: "sustainability", label: "Sustainability & Green Concrete" },
  { id: "top-brands", label: "Top Brands" },
  { id: "news", label: "Industry News" },
  { id: "brand-marketing", label: "Brand Marketing" },
  { id: "contribute", label: "Contribute" },
  { id: "newsletter", label: "Stay Informed" },
];

function SectionHeading({ id, label }: { id: string; label: string }) {
  return (
    <div id={id} className="flex items-center justify-between mb-5 pt-1">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{label}</h2>
      </div>
    </div>
  );
}

export function CategoryWikiPage() {
  const navigate = useNavigate();
  const [activeToc, setActiveToc] = useState("types");

  const featuredBrands = BRANDS.filter((b) => b.isFeatured).slice(0, 6);

  // Filter out "standards" and "selection" knowledge sections
  const filteredKnowledgeSections = CATEGORY.knowledgeSections.filter(
    (section) => section.id !== "standards" && section.id !== "selection"
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
          <Link to="/" className="text-xs transition-all" style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span className="text-xs cursor-pointer transition-all" style={{ color: "var(--text-muted)" }}>{CATEGORY.parentCategory}</span>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-primary)", fontWeight: 600 }}>{CATEGORY.name}</span>
        </div>
      </div>

      {/* ── Hero Section (light) ── */}
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
                  {CATEGORY.parentCategory}
                </span>
                <span className="pill" style={{ fontSize: "0.7rem" }}>Sub-Category</span>
                <span
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.12)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)", fontWeight: 600, fontSize: "0.7rem" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live
                </span>
              </div>

              <h1 style={{ fontSize: "2.6rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                {CATEGORY.name}
              </h1>
              <div style={{ width: "40px", height: "4px", background: "var(--accent)", borderRadius: "4px", margin: "12px 0" }} />
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {CATEGORY.description}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6">
                {CATEGORY.stats.map((s, i) => (
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
                {CATEGORY.keyFacts.slice(0, 4).map((f, i) => (
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

      {/* Subcategory strip */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }} className="overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 min-w-max">
            {CATEGORY.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/l3/${sub.id}`}
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

          {/* ── TOC Sidebar ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* TOC */}
              <div className="gl-strong overflow-hidden">
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
                      className={`toc-btn ${activeToc === item.id ? "active" : ""} ${item.id === "top-brands" ? "font-bold" : ""}`}
                      style={item.id === "top-brands" ? { background: activeToc === item.id ? "var(--accent-light)" : "rgba(255,106,61,0.08)", color: activeToc === item.id ? "var(--accent)" : "var(--text-primary)" } : {}}
                    >
                      <span style={{ color: "var(--accent)", fontSize: "0.65rem", fontWeight: 700, minWidth: "14px" }}>{i + 1}.</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Key Facts sidebar */}
              <div className="gl-strong overflow-hidden">
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
                  {CATEGORY.keyFacts.map((f, i) => (
                    <div
                      key={i}
                      className="px-4 py-3"
                      style={{ borderBottom: i < CATEGORY.keyFacts.length - 1 ? "var(--border)" : "none" }}
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
              <div className="gl-strong overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: "var(--accent-light)", borderBottom: "var(--border)" }}>
                  <Users className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-primary)" }}>
                    Top Contributors
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {CATEGORY.experts.map((ex, i) => (
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

          {/* ── Main Article ── */}
          <main className="flex-1 min-w-0 space-y-12">

            {/* Knowledge sections */}
            {filteredKnowledgeSections.map((section) => (
              <section key={section.id} id={section.id}>
                <SectionHeading id={`${section.id}-heading`} label={section.title} />
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "var(--glass)", border: "var(--border)", boxShadow: "var(--shadow-sm)", backdropFilter: "var(--glass-blur-sm)" }}
                >
                  {section.content.split("\n\n").map((para, i) => {
                    const parts = para.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "12px" }}>
                        {parts.map((part, j) =>
                          j % 2 === 1 ? (
                            <strong key={j} style={{ color: "var(--text-primary)", fontWeight: 700 }}>{part}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Technologies */}
            <TechnologiesSection level="L2" technologies={CATEGORY.technologies} />

            {/* Applications */}
            <section id="applications">
              <SectionHeading id="applications-heading" label="Applications" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORY.applications.map((app) => (
                  <div key={app.id} className="gl-card overflow-hidden group cursor-pointer" style={{ padding: 0 }}>
                    <div className="relative overflow-hidden" style={{ height: "160px" }}>
                      <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.4s ease" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs px-2.5 py-1 rounded-full text-white" style={{ background: "var(--accent)", fontWeight: 600, fontSize: "0.68rem" }}>
                          {app.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4" style={{ background: "var(--glass-strong)" }}>
                      <p style={{ fontSize: "0.78rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Brands */}
            <section id="top-brands">
              <div className="flex items-center justify-between mb-5 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
                  <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>Top Brands</h2>
                </div>
                <Link
                  to="/category/lighting/brands"
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-all"
                  style={{ color: "var(--accent)", background: "var(--accent-light)", fontWeight: 600 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.16)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featuredBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/brand/${brand.id}`}
                    className="gl-card flex items-center gap-3 group"
                    style={{ padding: "14px 16px" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${brand.accentColor || "var(--accent)"}, ${brand.accentColor || "var(--accent)"}cc)`, fontWeight: 800, boxShadow: "0 3px 12px rgba(0,0,0,0.12)" }}
                    >
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "var(--text-primary)", transition: "var(--t-fast)" }} className="truncate group-hover:text-[var(--accent)]">
                        {brand.name}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }} className="truncate">{brand.city}, {brand.state}</div>
                      {brand.rating ? (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-2.5 h-2.5" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
                          <span style={{ fontSize: "0.68rem", color: "var(--accent)", fontWeight: 600 }}>{brand.rating}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>No ratings yet</span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all" style={{ color: "var(--accent)" }} />
                  </Link>
                ))}
              </div>
            </section>

            {/* Brand Marketing */}
            <BrandMarketingSection categoryName={CATEGORY.name} level="L2" />

            {/* Industry News */}
            <IndustryNewsSection news={CATEGORY.news} categoryName={CATEGORY.name} />

            {/* Contribute CTA */}
            <ContributeSection topContributors={CATEGORY.experts} categoryName={CATEGORY.name} />

            {/* Newsletter CTA */}
            <NewsletterSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}