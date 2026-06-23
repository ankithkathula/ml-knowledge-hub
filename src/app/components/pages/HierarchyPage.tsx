import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ChevronRight, ChevronLeft, Star, MapPin, TrendingUp,
  ArrowRight, Package, Award, Building2, Sparkles,
  ExternalLink, Eye, Newspaper, Users, BookOpen, Mail,
  PenLine, Trophy, Briefcase, BarChart3, Globe,
  ChevronDown, Send, Search, List, Share2, Plus,
} from "lucide-react";
import { consultants } from "../data/consultantData";
import {
  getNode, getChildren, getBreadcrumb, getBrandsForLayer,
  getSiblings,
  type HierarchyNode, type BrandInfo,
} from "../data/hierarchyData";

/* ============ SECTION DIVIDER ============ */
function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 rounded-full" style={{ background: "var(--accent)" }} />
      <div className="flex items-center gap-2">
        {icon}
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {count !== undefined && (
        <span className="ml-auto px-2.5 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}>
          {count}
        </span>
      )}
    </div>
  );
}

/* ============ HORIZONTAL SCROLLABLE BAR ============ */
function HorizontalBar({ items, activeId, onSelect }: { items: HierarchyNode[]; activeId: string; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => { el?.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, [items]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector(`[data-id="${activeId}"]`) as HTMLElement;
    activeEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--glass-strong)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "var(--border-subtle)" }}>
          <ChevronLeft className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
        </button>
      )}
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto px-1 py-2" style={{ scrollbarWidth: "none" }}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button key={item.id} data-id={item.id} onClick={() => onSelect(item.id)} className="flex-shrink-0 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap" style={{ background: isActive ? "#ff6a3d" : "rgba(255,255,255,0.75)", color: isActive ? "#fff" : "var(--text-secondary)", border: isActive ? "1px solid #ff6a3d" : "1px solid rgba(0,0,0,0.08)", fontWeight: isActive ? 600 : 500, fontSize: "0.82rem", boxShadow: isActive ? "0 4px 14px rgba(255,106,61,0.3)" : "0 1px 3px rgba(0,0,0,0.04)", backdropFilter: "blur(8px)" }}>
              {item.name}
              {item.childCount ? (
                <span className="ml-2 px-1.5 py-0.5 rounded-full" style={{ fontSize: "0.65rem", background: isActive ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.06)", color: isActive ? "#fff" : "var(--text-muted)" }}>
                  {item.childCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {canScrollRight && (
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--glass-strong)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: "var(--border-subtle)" }}>
          <ChevronRight className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
        </button>
      )}
    </div>
  );
}

/* ============ CATEGORY CARD ============ */
function CategoryCard({ node, linkTo }: { node: HierarchyNode; linkTo: string }) {
  return (
    <Link to={linkTo} className="group gl-card cursor-pointer overflow-hidden" style={{ padding: 0 }}>
      <div className="relative h-36 overflow-hidden" style={{ background: "var(--bg-hero)" }}>
        {node.image ? (
          <>
            <img src={node.image} alt={node.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-10 h-10" style={{ color: "rgba(255,106,61,0.18)" }} />
          </div>
        )}
        {node.childCount !== undefined && node.childCount > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full" style={{ background: "var(--glass-strong)", fontSize: "0.7rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {node.childCount} subcategories
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {node.name}
          </h3>
          <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "#ff6a3d" }} />
        </div>
        <p className="line-clamp-2 mb-3" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{node.description}</p>
        <div className="flex items-center gap-3">
          {node.brandCount && (
            <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              <Building2 className="w-3 h-3" /> {node.brandCount} brands
            </span>
          )}
          {node.childCount !== undefined && node.childCount > 0 && (
            <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              <Package className="w-3 h-3" /> {node.childCount} types
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ============ QUICK FACTS CARD (RIGHT SIDE) ============ */
function QuickFactsCard({ node, children, brands }: { node: HierarchyNode; children: HierarchyNode[]; brands: BrandInfo[] }) {
  const totalSubCategories = children.reduce((sum, c) => sum + (c.childCount || 0), 0);
  const avgRating = brands.length > 0 ? (brands.reduce((s, b) => s + b.rating, 0) / brands.length).toFixed(1) : null;
  
  // Calculate market share as a percentage based on brand count relative to total market
  const marketSharePercent = node.brandCount ? Math.min(((node.brandCount / 10000) * 100), 100) : null;
  const marketShare = marketSharePercent ? `${marketSharePercent.toFixed(1)}%` : null;
  
  // Calculate market share in dollars (assuming average category market value)
  // Base calculation: $50M per 1% market share for construction materials
  const marketShareDollar = marketSharePercent ? `$${(marketSharePercent * 50).toFixed(0)}M` : null;

  const facts = [
    { label: "Market Share", value: marketShare },
    { label: "Market Value", value: marketShareDollar },
    { label: "Listed Brands", value: node.brandCount || brands.length || null },
    { label: "Subcategories", value: node.childCount || children.length || null },
    { label: "Avg. Brand Rating", value: avgRating },
    { label: "Downstream Items", value: totalSubCategories > 0 ? totalSubCategories.toLocaleString() : null },
  ].filter(f => f.value !== null && f.value !== 0);

  if (facts.length === 0) return null;

  return (
    <div className="w-[300px] flex-shrink-0" style={{ background: "var(--glass)", backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)", borderRadius: "var(--r-md)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.5)", padding: "20px 24px" }}>
      <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14 }}>Quick Facts</div>
      <div className="space-y-3">
        {facts.map((f, i) => (
          <div key={i} className="flex items-center justify-between">
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{f.label}</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.value}</span>
          </div>
        ))}
      </div>
      <Link to="#brands" className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg" style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>
        View All Brands <ArrowRight className="w-4 h-4" />
      </Link>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg" style={{ background: "var(--glass)", border: "var(--border-subtle)", fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)" }}>
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
        <Link to="/blog/create" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg" style={{ background: "var(--glass)", border: "var(--border-subtle)", fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)" }}>
          <Plus className="w-3.5 h-3.5" /> Contribute
        </Link>
      </div>
    </div>
  );
}

/* ============ BANNER METRICS ROW ============ */
function BannerMetrics({ node, children, brands }: { node: HierarchyNode; children: HierarchyNode[]; brands: BrandInfo[] }) {
  const metrics = [
    { value: node.brandCount ? `${node.brandCount}+` : brands.length > 0 ? `${brands.length}+` : null, label: "VERIFIED BRANDS" },
    { value: children.length > 0 ? `${children.reduce((s, c) => s + (c.brandCount || 0), 0).toLocaleString()}+` : null, label: "PRODUCTS LISTED" },
    { value: brands.length > 0 ? `${brands.length}` : null, label: "INDUSTRY EXPERTS" },
  ].filter(f => f.value !== null);

  if (metrics.length === 0) return null;

  return (
    <div className="flex items-center gap-8 mt-6">
      {metrics.map((m, i) => (
        <div key={i}>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ff6a3d" }}>{m.value}</div>
          <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============ BRAND STRIP ============ */
function BrandStrip({ brands, categoryName }: { brands: BrandInfo[]; categoryName: string }) {
  const [showAll, setShowAll] = useState(false);
  if (brands.length === 0) return null;
  const visible = showAll ? brands : brands.slice(0, 6);

  return (
    <div>
      <SectionHeader icon={<Building2 className="w-5 h-5" style={{ color: "#ff6a3d" }} />} title={`Top Brands in ${categoryName}`} count={brands.length} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((brand) => (
          <Link key={brand.id} to={`/brand/${brand.id}`} className="gl-card flex items-center gap-4 group" style={{ padding: "14px 18px" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: brand.accentColor + "18", border: `1px solid ${brand.accentColor}30` }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: brand.accentColor }}>{brand.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{brand.name}</span>
                {brand.isFeatured && <Award className="w-3.5 h-3.5" style={{ color: "#ff6a3d" }} />}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {brand.rating}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{brand.city} · {brand.productCount} products</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: "#ff6a3d" }} />
          </Link>
        ))}
      </div>
      {brands.length > 6 && (
        <div className="flex justify-center mt-4">
          <button onClick={() => setShowAll(!showAll)} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "8px 20px" }}>
            <Eye className="w-3.5 h-3.5" /> {showAll ? "Show Less" : `View All ${brands.length} Brands`}
          </button>
        </div>
      )}
    </div>
  );
}

/* ============ INDUSTRY NEWS ============ */
function IndustryNews({ categoryName, brands }: { categoryName: string; brands: BrandInfo[] }) {
  const newsImages = [
    "https://images.unsplash.com/photo-1650630718105-497674381f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    "https://images.unsplash.com/photo-1731317735479-1011ba08ad65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    "https://images.unsplash.com/photo-1594080051162-74b97d619668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    "https://images.unsplash.com/photo-1646579886741-12b59340c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  ];
  const news = [
    brands.length > 0 && { title: `${brands[0]?.name} launches new ${categoryName.toLowerCase()} product line`, date: "Mar 28, 2026", source: "Construction Week", image: newsImages[0] },
    { title: `India's ${categoryName.toLowerCase()} market projected to grow 12% CAGR through 2030`, date: "Mar 25, 2026", source: "Market Research", image: newsImages[1] },
    brands.length > 1 && { title: `${brands[1]?.name} expands ${categoryName.toLowerCase()} distribution to South India`, date: "Mar 22, 2026", source: "Building Products", image: newsImages[2] },
    { title: `New sustainability standards announced for ${categoryName.toLowerCase()}`, date: "Mar 18, 2026", source: "Green Building Council", image: newsImages[3] },
  ].filter(Boolean) as { title: string; date: string; source: string; image: string }[];

  if (news.length === 0) return null;

  return (
    <div>
      <SectionHeader icon={<Newspaper className="w-5 h-5" style={{ color: "#ff6a3d" }} />} title={`Industry News: ${categoryName}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {news.map((item, i) => (
          <div key={i} className="gl-card flex gap-0 group cursor-pointer hover:shadow-md transition-shadow overflow-hidden" style={{ padding: 0 }}>
            <div className="w-28 h-full flex-shrink-0 relative overflow-hidden" style={{ minHeight: 100 }}>
              <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded" style={{ fontSize: "0.62rem", fontWeight: 600, background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>{item.source}</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{item.date}</span>
              </div>
              <h4 className="line-clamp-2 group-hover:text-orange-500 transition-colors" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.title}</h4>
            </div>
            <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity m-4 mt-4" style={{ color: "#ff6a3d" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ CONSULTANTS & SERVICES ============ */
function ConsultantsSection({ categoryName }: { categoryName: string }) {
  const displayConsultants = consultants.slice(0, 3);

  return (
    <div>
      <SectionHeader icon={<Briefcase className="w-5 h-5" style={{ color: "#ff6a3d" }} />} title="Application Consultants & Services" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {displayConsultants.map((c) => (
          <Link
            key={c.id}
            to={`/services/consultant/${c.slug}`}
            className="gl-card group cursor-pointer hover:shadow-md transition-shadow overflow-hidden block"
            style={{ padding: 0, textDecoration: "none" }}
          >
            <div className="h-32 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.pricing.type === "hourly" ? "#ff6a3d" : "#6366f1"} 0%, #1f2937 100%)` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                  <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
                </div>
              </div>
              {c.verified && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", fontSize: "0.65rem", color: "#fff", fontWeight: 600 }}>
                  Verified
                </div>
              )}
            </div>
            <div style={{ padding: "14px 16px" }}>
              <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{c.name}</h4>
              <span className="flex items-center gap-1 mb-1" style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 600 }}>
                {c.categoryName}
              </span>
              <span className="flex items-center gap-1 mb-2" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                <MapPin className="w-3 h-3" /> {c.location.city}, {c.location.state}
              </span>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {c.rating}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.yearsExp} yrs exp</span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.projectCount} projects</span>
              </div>
              <span className="flex items-center gap-1.5 text-orange-500 group-hover:text-orange-600 transition-colors" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                View Profile <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover-lift"
          style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)", background: "var(--accent-light)" }}
        >
          View All Consultants & Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ============ BLOGS & CONTRIBUTIONS ============ */
function BlogsSection({ categoryName }: { categoryName: string }) {
  const blogs = [
    { 
      id: "sustainable-concrete-innovations-2026",
      title: `Sustainable ${categoryName} Innovations Transforming Modern Construction`, 
      subtitle: "How eco-friendly solutions are reducing carbon footprint in mega projects",
      author: "Ar. Priya Sharma",
      authorTitle: "Senior Structural Engineer",
      readTime: "8 min", 
      tag: "Sustainability",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      date: "Mar 28, 2026",
      views: 12450,
    },
    { 
      id: "smart-technology-building-envelope",
      title: `Smart ${categoryName} Technology: The Future of Modern Buildings`, 
      subtitle: "Advanced materials and their impact on energy efficiency",
      author: "Eng. Rajesh Kumar",
      authorTitle: "MEP Specialist",
      readTime: "6 min", 
      tag: "Technology",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      date: "Mar 25, 2026",
      views: 8920,
    },
    { 
      id: "cost-analysis-comparison-guide",
      title: `${categoryName} Cost Analysis: Complete Comparison Guide for 2026`, 
      subtitle: "Material selection guide for high-end commercial projects",
      author: "QS Meera Patel",
      authorTitle: "Quantity Surveyor",
      readTime: "12 min", 
      tag: "Analysis",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      date: "Mar 22, 2026",
      views: 15670,
    },
  ];

  return (
    <div>
      <SectionHeader icon={<BookOpen className="w-5 h-5" style={{ color: "#ff6a3d" }} />} title="Blogs & Contributions" count={blogs.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog, i) => (
          <Link 
            key={i} 
            to={`/blog/${blog.id}`}
            className="gl-card group cursor-pointer hover:shadow-lg transition-all overflow-hidden" 
            style={{ padding: 0 }}
          >
            {/* Blog Banner Image */}
            <div className="h-48 relative overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
              
              {/* Tag Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.65rem", fontWeight: 600 }}>
                {blog.tag}
              </div>
              
              {/* Views Counter */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "0.65rem", fontWeight: 600 }}>
                <Eye className="w-3 h-3" />
                {(blog.views / 1000).toFixed(1)}k
              </div>
            </div>

            {/* Blog Content */}
            <div style={{ padding: "18px 20px" }}>
              <h4 className="line-clamp-2 group-hover:text-orange-500 transition-colors mb-2" style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
                {blog.title}
              </h4>
              <p className="line-clamp-2 mb-3" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {blog.subtitle}
              </p>
              
              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "var(--border-subtle)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>
                  {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {blog.author}
                  </p>
                  <div className="flex items-center gap-2" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime} read</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ============ CONTRIBUTORS & CONTRIBUTE CTA ============ */
function ContributeSection({ categoryName }: { categoryName: string }) {
  const contributors = [
    { name: "Ar. Priya Sharma", contributions: 24, avatar: "PS" },
    { name: "Eng. Rajesh Kumar", contributions: 18, avatar: "RK" },
    { name: "QS Meera Patel", contributions: 15, avatar: "MP" },
    { name: "Dr. Anand Rao", contributions: 12, avatar: "AR" },
    { name: "Arch. Neha Gupta", contributions: 9, avatar: "NG" },
  ];

  return (
    <div>
      <SectionHeader icon={<Users className="w-5 h-5" style={{ color: "#ff6a3d" }} />} title="Contributors" />
      <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--glass-mid)", border: "var(--border-subtle)" }}>
        {/* Stacked avatars */}
        <div className="flex -space-x-2.5 flex-shrink-0">
          {contributors.slice(0, 5).map((c, i) => (
            <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center ring-2 ring-white" style={{ background: `hsl(${i * 50 + 15}, 60%, 52%)`, color: "#fff", fontSize: "0.6rem", fontWeight: 700, zIndex: 5 - i }}>
              {c.avatar}
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>
            {contributors.length} experts contribute to {categoryName}
          </p>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
            Share your expertise -- write guides, reviews, or technical articles.
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg flex-shrink-0" style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>
          <PenLine className="w-3.5 h-3.5" /> Contribute
        </button>
      </div>
    </div>
  );
}

/* ============ NEWSLETTER SIGNUP ============ */
function NewsletterSignup({ categoryName }: { categoryName: string }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "var(--glass-mid)", border: "var(--border-subtle)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,106,61,0.08)" }}>
        <Mail className="w-5 h-5" style={{ color: "#ff6a3d" }} />
      </div>
      <div className="flex-1 min-w-0">
        {subscribed ? (
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#16a34a" }}>Subscribed to {categoryName} updates.</p>
        ) : (
          <>
            <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>{categoryName} Newsletter</p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>Weekly updates on products, brands & trends.</p>
          </>
        )}
      </div>
      {!subscribed && (
        <div className="flex gap-2 flex-shrink-0">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg w-44"
            style={{ border: "var(--border)", fontSize: "0.78rem", background: "var(--glass-strong)", outline: "none" }}
          />
          <button
            onClick={() => { if (email) setSubscribed(true); }}
            className="px-4 py-2 rounded-lg flex items-center gap-1.5 flex-shrink-0"
            style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}
          >
            <Send className="w-3.5 h-3.5" /> Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

/* ============ TABLE OF CONTENTS SIDEBAR ============ */
function TableOfContents({ activeSection }: { activeSection: string }) {
  const sections = [
    { id: "categories", label: "Categories", icon: <Package className="w-3.5 h-3.5" /> },
    { id: "brands", label: "Top Brands", icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: "news", label: "Industry News", icon: <Newspaper className="w-3.5 h-3.5" /> },
    { id: "consultants", label: "Consultants", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "blogs", label: "Blogs", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "contributors", label: "Contributors", icon: <Users className="w-3.5 h-3.5" /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: 224, flexShrink: 0, position: "sticky", top: 96, alignSelf: "flex-start", maxHeight: "calc(100vh - 120px)" }}>
      <div className="gl-card" style={{ padding: "16px 0", overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
        <div style={{ padding: "0 16px 12px", borderBottom: "var(--border-subtle)" }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Contents</h3>
        </div>
        <div className="mt-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`toc-btn ${activeSection === section.id ? "active" : ""}`}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ MAIN HIERARCHY PAGE ============ */
export function HierarchyPage() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();

  const node = getNode(nodeId || "");
  const siblings = nodeId ? getSiblings(nodeId) : [];
  const children = nodeId ? getChildren(nodeId) : [];
  const breadcrumb = nodeId ? getBreadcrumb(nodeId) : [];
  const brands = nodeId ? getBrandsForLayer(nodeId) : [];

  const [activeBarId, setActiveBarId] = useState(nodeId || "");
  const [activeSection, setActiveSection] = useState("categories");

  const handleBarSelect = (id: string) => {
    if (id !== nodeId) navigate(`/layer/${id}`, { replace: true });
  };

  useEffect(() => {
    if (nodeId) setActiveBarId(nodeId);
  }, [nodeId]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["categories", "brands", "news", "consultants", "blogs", "contributors", "newsletter"];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!node) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>Category not found</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>The requested category does not exist.</p>
          <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
        </div>
      </div>
    );
  }

  const isL5 = node.level === 5;
  const parentNode = node.parentId ? getNode(node.parentId) : null;

  const getCardLink = (child: HierarchyNode) => {
    if (child.level === 5) return `/products/${child.id}`;
    return `/layer/${child.id}`;
  };

  // Get layer meta label
  const levelLabels: Record<number, string> = { 1: "Category", 2: "Sub-Category", 3: "Product Group", 4: "Product Type", 5: "Product Line" };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ===== BANNER SECTION — matches uploaded image style ===== */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #f5f7fb 50%, #fdf4ef 100%)" }}>
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] opacity-20" style={{ background: "radial-gradient(ellipse, rgba(255,106,61,0.25) 0%, transparent 70%)" }} />
        <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px]" style={{ background: "radial-gradient(circle, rgba(255,106,61,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)", filter: "blur(30px)" }} />
        <div className="absolute bottom-0 right-[15%] w-[250px] h-[200px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-5 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 flex-wrap mb-5">
            <Link to="/" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }} className="hover:text-orange-500 transition-colors">Home</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.id} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                {i === breadcrumb.length - 1 ? (
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{crumb.name}</span>
                ) : (
                  <Link to={crumb.level === 1 ? "/" : `/layer/${crumb.id}`} style={{ fontSize: "0.78rem", color: "var(--text-muted)" }} className="hover:text-orange-500 transition-colors">{crumb.name}</Link>
                )}
              </span>
            ))}
          </div>

          {/* Main banner content: left info + right quick facts */}
          <div className="flex gap-8 items-start">
            {/* Left side */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {parentNode && (
                  <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "#ff6a3d", color: "#fff" }}>
                    {parentNode.name}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 500, background: "var(--glass)", color: "var(--text-secondary)", border: "var(--border-subtle)" }}>
                  {levelLabels[node.level] || `Level ${node.level}`}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 500, color: "#16a34a", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16a34a" }} /> Live
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.02em" }}>{node.name}</h1>

              {/* Description - now includes overview text */}
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 600 }}>
                {node.description} This category includes {children.length > 0 ? `${children.length} subcategories` : "various products"} and {brands.length > 0 ? `${brands.length} listed brands` : "multiple brands"} serving the construction and building materials industry.
              </p>

              {/* Metrics row */}
              <BannerMetrics node={node} children={children} brands={brands} />
            </div>

            {/* Right side: Quick Facts card */}
            <QuickFactsCard node={node} children={children} brands={brands} />
          </div>
        </div>
      </div>

      {/* ===== HORIZONTAL BAR ===== */}
      {siblings.length > 1 && (
        <div className="sticky top-[58px] z-30" style={{ background: "rgba(245,247,251,0.92)", backdropFilter: "blur(12px)", borderBottom: "var(--border-subtle)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <HorizontalBar items={siblings} activeId={activeBarId} onSelect={handleBarSelect} />
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT WITH SIDEBAR ===== */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8" style={{ alignItems: "flex-start" }}>
          {/* Table of Contents Sidebar */}
          <TableOfContents activeSection={activeSection} />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-12">
            {/* Children Cards */}
            {children.length > 0 && (
              <div id="categories">
                <SectionHeader
                  icon={<Package className="w-5 h-5" style={{ color: "#ff6a3d" }} />}
                  title={isL5 ? "Products" : `Explore ${node.name} Categories`}
                  count={children.length}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {children.map((child) => (
                    <CategoryCard key={child.id} node={child} linkTo={getCardLink(child)} />
                  ))}
                </div>
              </div>
            )}

            {/* L5 — No cards, show CTA */}
            {isL5 && children.length === 0 && (
              <div className="text-center py-8">
                <div className="glass-card inline-flex flex-col items-center p-10" style={{ maxWidth: 480 }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,106,61,0.08)" }}>
                    <Package className="w-8 h-8" style={{ color: "#ff6a3d" }} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Browse Products</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
                    View all products from verified brands in "{node.name}"
                  </p>
                  <Link to={`/products/${node.id}`} className="btn-primary">
                    <ArrowRight className="w-4 h-4" /> View Product Listings
                  </Link>
                </div>
              </div>
            )}

            {/* Top Brands */}
            <div id="brands">
              <BrandStrip brands={brands} categoryName={node.name} />
            </div>

            {/* Industry News */}
            <div id="news">
              <IndustryNews categoryName={node.name} brands={brands} />
            </div>

            {/* Consultants & Services */}
            <div id="consultants">
              <ConsultantsSection categoryName={node.name} />
            </div>

            {/* Blogs & Contributions */}
            <div id="blogs">
              <BlogsSection categoryName={node.name} />
            </div>

            {/* Contributors + Contribute CTA */}
            <div id="contributors">
              <ContributeSection categoryName={node.name} />
            </div>

            {/* Newsletter Signup */}
            <div id="newsletter">
              <NewsletterSignup categoryName={node.name} />
            </div>

            {/* Brand Marketing CTA */}
            <div className="gl-card relative overflow-hidden" style={{ padding: "32px", background: "linear-gradient(135deg, rgba(255,106,61,0.05) 0%, rgba(255,255,255,0.8) 100%)" }}>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#ff6a3d", boxShadow: "0 4px 14px rgba(255,106,61,0.3)" }}>
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>List Your Brand in "{node.name}"</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Reach architects, contractors, and procurement managers actively searching for {node.name.toLowerCase()} products.
                  </p>
                </div>
                <button className="btn-primary flex-shrink-0"><ArrowRight className="w-4 h-4" /> Join Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}