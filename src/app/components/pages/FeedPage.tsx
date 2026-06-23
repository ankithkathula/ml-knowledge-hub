import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Heart, Eye, MessageCircle, MapPin, Users, Award,
  Share2, Bookmark, TrendingUp, ArrowRight, Briefcase, Palette,
  Building2, Ruler, Zap, TreePine, Layers, Leaf, Lightbulb,
  HardHat, Sparkles, Plus, ChevronRight, Filter, Star,
  ArrowUpRight, Flame, UserPlus,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

/* ── Data ── */

const pastelBg = (base: string, accent: string) =>
  `radial-gradient(circle at 30% 20%, ${accent}44 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${accent}33 0%, transparent 40%), linear-gradient(135deg, ${base} 0%, ${accent}22 100%)`;

const PROJECTS = [
  { id: 1,  title: "Lakeside Villa",              creator: "Ananya Sharma",   creatorAvatar: "https://i.pravatar.cc/80?img=2",  slug: "ananya-sharma",   initials: "AS", cat: "Architecture", desc: "A 4,200 sqft weekend retreat nestled between two lakes in Alibaug, using rammed earth walls and passive ventilation.",                              likes: 342, views: 4820, aspect: "4/5", bg: pastelBg("#f0f4ff", "#667eea"), imgUrl: "https://picsum.photos/seed/lakeside-villa/400/500" },
  { id: 2,  title: "Japandi Apartment",           creator: "Rohan Mehta",     creatorAvatar: "https://i.pravatar.cc/80?img=11", slug: "rohan-mehta",     initials: "RM", cat: "Interior",      desc: "Minimalist 3BHK in Bandra blending Japanese wabi-sabi with Scandinavian warmth. Local teak and handmade Jaipur tiles.",                          likes: 518, views: 7230, aspect: "3/4", bg: pastelBg("#fff0f3", "#f5576c"), imgUrl: "https://picsum.photos/seed/japandi-room/400/480" },
  { id: 3,  title: "Green Office Campus",         creator: "Priya Nair",      creatorAvatar: "https://i.pravatar.cc/80?img=1",  slug: "priya-nair",      initials: "PN", cat: "Landscape",     desc: "12-acre tech park landscape in Whitefield with bioswales, native plantings, and 40% reduction in urban heat island effect.",                     likes: 276, views: 3910, aspect: "1/1", bg: pastelBg("#ecfdf5", "#43e97b"), imgUrl: "https://picsum.photos/seed/green-campus-park/400/400" },
  { id: 4,  title: "Heritage Hotel Jaipur",       creator: "Vikram Singh",    creatorAvatar: "https://i.pravatar.cc/80?img=15", slug: "vikram-singh",    initials: "VS", cat: "Architecture", desc: "Restoration of a 200-year-old haveli into a 28-room boutique hotel. Preserved original jharokhas and lime plaster frescoes.",                   likes: 623, views: 9100, aspect: "4/5", bg: pastelBg("#fff7ed", "#f59e0b"), imgUrl: "https://picsum.photos/seed/heritage-hotel/400/500" },
  { id: 5,  title: "Seismic Retrofit — IT Park",  creator: "Deepa Iyer",      creatorAvatar: "https://i.pravatar.cc/80?img=36", slug: "deepa-iyer",      initials: "DI", cat: "Structural",    desc: "Base isolation retrofit for a 12-storey IT tower in Zone IV Chennai. FRP wrapping + new shear walls without tenant disruption.",               likes: 189, views: 2740, aspect: "3/4", bg: pastelBg("#eff6ff", "#4facfe"), imgUrl: "https://picsum.photos/seed/concrete-tower/400/533" },
  { id: 6,  title: "Boutique Café",               creator: "Meera Kapoor",    creatorAvatar: "https://i.pravatar.cc/80?img=40", slug: "meera-kapoor",    initials: "MK", cat: "Interior",      desc: "700 sqft café in Hauz Khas with exposed brick, terrazzo counters, and hand-blown pendant lights from Firozabad.",                              likes: 487, views: 6520, aspect: "1/1", bg: pastelBg("#fef3c7", "#f59e0b"), imgUrl: "https://picsum.photos/seed/boutique-cafe/400/400" },
  { id: 7,  title: "Eco-Resort Masterplan",        creator: "Siddharth Joshi", creatorAvatar: "https://i.pravatar.cc/80?img=4",  slug: "siddharth-joshi", initials: "SJ", cat: "Architecture", desc: "2.5-acre wellness retreat in Coorg with 12 bamboo-frame cottages, infinity pool, and zero-discharge water system.",                             likes: 395, views: 5640, aspect: "4/5", bg: pastelBg("#f0fdf4", "#22c55e"), imgUrl: "https://picsum.photos/seed/eco-resort-coorg/400/500" },
  { id: 8,  title: "Smart HVAC System",            creator: "Arjun Reddy",     creatorAvatar: "https://i.pravatar.cc/80?img=10", slug: "arjun-reddy",     initials: "AR", cat: "MEP",          desc: "AI-controlled VRF system for a 50,000 sqft commercial tower in HITEC City. 32% energy savings in first year.",                                likes: 154, views: 2100, aspect: "3/4", bg: pastelBg("#fdf2f8", "#ec4899"), imgUrl: "https://picsum.photos/seed/smart-hvac-building/400/480" },
  { id: 9,  title: "Modular Housing Thesis",       creator: "Rahul Deshmukh",  creatorAvatar: "https://i.pravatar.cc/80?img=58", slug: "rahul-deshmukh",  initials: "RD", cat: "Architecture", desc: "Award-winning thesis on prefab bamboo-composite panels for flood-prone Assam. Assembly in 72 hours flat.",                                      likes: 214, views: 3890, aspect: "1/1", bg: pastelBg("#f5f3ff", "#a78bfa"), imgUrl: "https://picsum.photos/seed/bamboo-modular/400/400" },
  { id: 10, title: "Penthouse Terrace Garden",     creator: "Kavitha Menon",   creatorAvatar: "https://i.pravatar.cc/80?img=45", slug: "kavitha-menon",   initials: "KM", cat: "Landscape",     desc: "2,800 sqft rooftop garden in Indiranagar with edible landscape, rainwater harvesting, and butterfly habitat zones.",                           likes: 331, views: 4100, aspect: "4/5", bg: pastelBg("#ecfdf5", "#34d399"), imgUrl: "https://picsum.photos/seed/rooftop-terrace/400/500" },
  { id: 11, title: "School Library Interiors",     creator: "Sneha Kulkarni",  creatorAvatar: "https://i.pravatar.cc/80?img=57", slug: "sneha-kulkarni",  initials: "SK", cat: "Interior",      desc: "Playful learning space for a Pune international school — curved bookshelves, reading nooks, and acoustic fabric panels.",                       likes: 267, views: 3450, aspect: "3/4", bg: pastelBg("#fefce8", "#facc15"), imgUrl: "https://picsum.photos/seed/school-library/400/533" },
  { id: 12, title: "Textile Mill Adaptive Reuse",  creator: "Ananya Sharma",   creatorAvatar: "https://i.pravatar.cc/80?img=2",  slug: "ananya-sharma",   initials: "AS", cat: "Architecture", desc: "Converting a 1920s textile mill in Ahmedabad into co-working + gallery spaces. Retained sawtooth roof and original brickwork.",                likes: 412, views: 5900, aspect: "1/1", bg: pastelBg("#fff1f2", "#fb7185"), imgUrl: "https://picsum.photos/seed/textile-mill/400/400" },
];

const SPONSORED = [
  { id: "sp-1", brand: "Asian Paints",     tagline: "Royale Luxury Emulsion — Now in 1,800+ shades",   desc: "Explore India's widest range of premium interior paints with anti-bacterial and low-VOC technology.",   cta: "Explore Collection", bg: pastelBg("#fff7ed", "#ff6a3d"), imgUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", url: "#" },
  { id: "sp-2", brand: "Kajaria Ceramics", tagline: "Eternity Collection — Large Format Porcelain",     desc: "1200x2400mm slabs for seamless floors and feature walls. Book a free sample for your next project.",    cta: "Request Sample",     bg: pastelBg("#f0f4ff", "#6366f1"), imgUrl: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", url: "#" },
  { id: "sp-3", brand: "Havells Lighting", tagline: "Crabtree Athena Smart Switches",                   desc: "Wi-Fi enabled modular switches with voice control. Specify for your next residential project.",          cta: "View Catalogue",     bg: pastelBg("#ecfdf5", "#10b981"), imgUrl: "https://images.unsplash.com/photo-1565538810643-b5bd7d1e1cf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", url: "#" },
];

const PEOPLE = [
  { name: "Ananya Sharma",  slug: "ananya-sharma",  initials: "AS", avatarUrl: "https://i.pravatar.cc/80?img=2",  title: "Senior Architect",      loc: "Bengaluru", projects: 24, followers: 1340, gradient: "linear-gradient(135deg, #667eea, #764ba2)", skills: ["Sustainability", "Revit", "LEED"] },
  { name: "Rohan Mehta",    slug: "rohan-mehta",    initials: "RM", avatarUrl: "https://i.pravatar.cc/80?img=11", title: "Interior Designer",     loc: "Mumbai",    projects: 31, followers: 2180, gradient: "linear-gradient(135deg, #f093fb, #f5576c)", skills: ["Hospitality", "FF&E", "V-Ray"] },
  { name: "Vikram Singh",   slug: "vikram-singh",   initials: "VS", avatarUrl: "https://i.pravatar.cc/80?img=15", title: "Principal Architect",   loc: "Jaipur",    projects: 37, followers: 3200, gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)", skills: ["Heritage", "Conservation", "Documentation"] },
  { name: "Deepa Iyer",     slug: "deepa-iyer",     initials: "DI", avatarUrl: "https://i.pravatar.cc/80?img=36", title: "Structural Engineer",   loc: "Chennai",   projects: 18, followers: 870,  gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", skills: ["High-Rise", "Seismic", "ETABS"] },
  { name: "Meera Kapoor",   slug: "meera-kapoor",   initials: "MK", avatarUrl: "https://i.pravatar.cc/80?img=40", title: "Interior Designer",     loc: "Delhi NCR", projects: 26, followers: 1890, gradient: "linear-gradient(135deg, #f5576c, #ff6a3d)", skills: ["Residential", "Japandi", "Art Curation"] },
  { name: "Kavitha Menon",  slug: "kavitha-menon",  initials: "KM", avatarUrl: "https://i.pravatar.cc/80?img=45", title: "Landscape Architect",   loc: "Kochi",     projects: 22, followers: 1120, gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", skills: ["Urban Green", "Planting", "Sustainability"] },
  { name: "Sneha Kulkarni", slug: "sneha-kulkarni", initials: "SK", avatarUrl: "https://i.pravatar.cc/80?img=57", title: "BIM Specialist",        loc: "Pune",      projects: 19, followers: 950,  gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)", skills: ["Revit", "Navisworks", "Dynamo"] },
  { name: "Rahul Deshmukh", slug: "rahul-deshmukh", initials: "RD", avatarUrl: "https://i.pravatar.cc/80?img=58", title: "Architecture Student",  loc: "Trichy",    projects: 8,  followers: 320,  gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)", skills: ["Rhino", "Grasshopper", "Parametric"] },
];

const CATEGORIES = [
  { name: "Architecture",      count: 820, icon: Building2, color: "#667eea" },
  { name: "Interior Design",   count: 645, icon: Palette,   color: "#f5576c" },
  { name: "Landscape",         count: 290, icon: TreePine,  color: "#43e97b" },
  { name: "Structural",        count: 380, icon: Ruler,     color: "#4facfe" },
  { name: "MEP",               count: 310, icon: Zap,       color: "#fa709a" },
  { name: "BIM & Tech",        count: 420, icon: Layers,    color: "#f59e0b" },
  { name: "Green Building",    count: 230, icon: Leaf,      color: "#10b981" },
  { name: "Lighting",          count: 145, icon: Lightbulb, color: "#fbbf24" },
  { name: "Construction Mgmt", count: 360, icon: HardHat,   color: "#ef4444" },
];

const FEED = [
  { author: "Vikram Singh",    slug: "vikram-singh",   initials: "VS", avatarUrl: "https://i.pravatar.cc/80?img=15", headline: "Principal Architect",      time: "2h", text: "Just completed the facade renovation for Phoenix Mall in Gurugram. Maintained the existing structural grid while introducing a contemporary double-skin facade. Really proud of the team!",                                        imgUrl: "https://picsum.photos/seed/facade-renovation/600/280" as string | null, likes: 87,  comments: 14 },
  { author: "Deepa Iyer",     slug: "deepa-iyer",     initials: "DI", avatarUrl: "https://i.pravatar.cc/80?img=36", headline: "Structural Engineer",      time: "5h", text: "Looking for recommendations on eco-friendly waterproofing solutions for a basement retaining wall in Chennai. High water table conditions. Any suggestions from the community?",                                                    imgUrl: null,                                                                    likes: 34,  comments: 22 },
  { author: "Rahul Deshmukh", slug: "rahul-deshmukh", initials: "RD", avatarUrl: "https://i.pravatar.cc/80?img=58", headline: "Architecture Student, NIT", time: "1d", text: "Our thesis on affordable modular housing for flood-prone areas in Assam won the NIASA Student Design Award! Prefab bamboo-composite panels, assembled in 3 days. Huge thanks to Prof. Banerjee 🙏", imgUrl: "https://picsum.photos/seed/bamboo-panels/600/280" as string | null,    likes: 214, comments: 47 },
  { author: "Meera Kapoor",   slug: "meera-kapoor",   initials: "MK", avatarUrl: "https://i.pravatar.cc/80?img=40", headline: "Interior Designer",        time: "3d", text: "Published a case study on our Koramangala 3BHK — Japandi-inspired living with locally sourced teak and handmade Jaipur tiles. Full project on my profile!",                                                              imgUrl: "https://picsum.photos/seed/japandi-living/600/280" as string | null,   likes: 156, comments: 31 },
];

const CAT_COLORS: Record<string, string> = {
  Architecture: "#667eea", Interior: "#f5576c", Landscape: "#43e97b",
  Structural: "#4facfe", MEP: "#fa709a",
};

/* ── Component ── */

export function FeedPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
  const [savedProjects, setSavedProjects] = useState<Set<number>>(new Set());

  const filters = ["All", "Architecture", "Interior", "Landscape", "Structural", "MEP"];

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === activeFilter);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProjects((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedProjects((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── Header ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{
              background: "var(--glass)",
              border: "1px solid rgba(26,26,26,0.08)",
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            ● Members only
          </span>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.015em" }}>
            Your Feed
          </h1>
          <span style={{ fontSize: "0.78rem", color: "#6b6b6b" }}>
            Personalised discovery from people you follow
          </span>
        </div>
      </div>

      {/* ── Sticky Discovery Bar ── */}
      <div
        className="sticky top-[58px] z-40"
        style={{
          background: "var(--glass-mid)",
          backdropFilter: "blur(16px)",
          borderBottom: "var(--border-subtle)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 py-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, people, skills..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "var(--glass)",
                  border: "1.5px solid transparent",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
              />
            </div>

            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 rounded-full whitespace-nowrap transition-all"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    background: activeFilter === f ? "#1a1a1a" : "transparent",
                    color: activeFilter === f ? "#fff" : "var(--text-secondary)",
                    border: activeFilter === f ? "none" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Link
                to="/u/portfolio"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all"
                style={{ fontSize: "0.8rem", fontWeight: 700, background: "#1a1a1a", color: "#fff" }}
              >
                <Plus className="w-4 h-4" /> Share Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">

          {/* ── LEFT: Project Gallery ── */}
          <div className="flex-1 min-w-0">
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {filteredProjects.map((p, idx) => {
                const liked = likedProjects.has(p.id);
                const saved = savedProjects.has(p.id);
                const catColor = CAT_COLORS[p.cat] || "#888";

                const sponsoredIndex = Math.floor(idx / 4);
                const showSponsored = idx > 0 && idx % 4 === 0 && sponsoredIndex <= SPONSORED.length;
                const sp = SPONSORED[sponsoredIndex - 1];

                return (
                  <>
                    {/* Sponsored Card */}
                    {showSponsored && sp && (
                      <div
                        key={sp.id}
                        className="break-inside-avoid rounded-2xl overflow-hidden"
                        style={{ border: "var(--border-subtle)" }}
                      >
                        <div className="relative overflow-hidden" style={{ height: 190 }}>
                          <img
                            src={sp.imgUrl}
                            alt={sp.brand}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Sponsored</span>
                            <h4 className="mt-1" style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>{sp.brand}</h4>
                            <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.82)", marginTop: 2, lineHeight: 1.35 }}>{sp.tagline}</p>
                          </div>
                        </div>
                        <div className="px-4 py-3" style={{ background: "var(--glass-strong)" }}>
                          <p className="line-clamp-2 mb-3" style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{sp.desc}</p>
                          <button
                            className="w-full py-2 rounded-lg text-center transition-all"
                            style={{ fontSize: "0.75rem", fontWeight: 700, background: "#1a1a1a", color: "#fff" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                          >
                            {sp.cta} →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Project Card */}
                    <Link
                      key={p.id}
                      to={`/professionals/${p.slug}`}
                      className="block rounded-2xl overflow-hidden group relative break-inside-avoid"
                      style={{ textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                    >
                      {/* Photo */}
                      <div
                        className="w-full relative overflow-hidden"
                        style={{ aspectRatio: p.aspect, background: p.bg, minHeight: 200 }}
                      >
                        <img
                          src={p.imgUrl}
                          alt={p.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Top gradient for pill readability */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 38%, transparent 58%, rgba(0,0,0,0.18) 100%)" }}
                        />

                        {/* Category pill */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="px-2.5 py-1 rounded-full backdrop-blur-sm"
                            style={{ fontSize: "0.65rem", fontWeight: 700, background: "rgba(0,0,0,0.45)", color: "#fff" }}
                          >
                            {p.cat}
                          </span>
                        </div>

                        {/* Hover overlay */}
                        <div
                          className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          style={{ background: "rgba(0,0,0,0.2)" }}
                        >
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={(e) => toggleSave(p.id, e)}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                              style={{ background: saved ? "#fff" : "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
                            >
                              <Bookmark className="w-4 h-4" style={{ color: saved ? "#1a1a1a" : "#fff", fill: saved ? "#1a1a1a" : "none" }} />
                            </button>
                            <button
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            >
                              <Share2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          <div />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-3.5 pt-3 pb-2" style={{ background: "var(--glass-strong)" }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 4 }}>{p.title}</h3>
                        <p className="line-clamp-2" style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.desc}</p>
                      </div>

                      {/* Bottom bar */}
                      <div className="flex items-center justify-between px-3.5 py-2.5" style={{ background: "var(--glass-strong)", borderTop: "var(--border-subtle)" }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <AvatarImg
                            src={p.creatorAvatar}
                            fallback={p.initials}
                            size={24}
                            fallbackBg={`linear-gradient(135deg, ${catColor}, ${catColor}88)`}
                            borderStyle="none"
                          />
                          <span className="truncate" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.creator}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button
                            onClick={(e) => toggleLike(p.id, e)}
                            className="flex items-center gap-1 transition-all"
                            style={{ fontSize: "0.7rem", color: liked ? "#ef4444" : "var(--text-muted)", fontWeight: 500 }}
                          >
                            <Heart className="w-3.5 h-3.5" style={{ fill: liked ? "#ef4444" : "none" }} />
                            {p.likes + (liked ? 1 : 0)}
                          </button>
                          <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            <Eye className="w-3.5 h-3.5" /> {(p.views / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-10">
              <button
                className="px-8 py-3 rounded-full transition-all"
                style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", border: "var(--border)", background: "var(--glass-strong)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              >
                Load More Projects
              </button>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-[120px] space-y-6">

              {/* People to Follow */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>People to Follow</h3>
                </div>
                <div className="space-y-1">
                  {PEOPLE.slice(0, 5).map((p) => (
                    <Link
                      key={p.slug}
                      to={`/professionals/${p.slug}`}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all group"
                      style={{ textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <AvatarImg src={p.avatarUrl} fallback={p.initials} size={40} fallbackBg={p.gradient} />
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</p>
                        <p className="truncate" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{p.title} · {p.loc}</p>
                      </div>
                      <button
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        style={{ border: "var(--border)" }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      >
                        <UserPlus className="w-3.5 h-3.5" style={{ color: "var(--text-secondary)" }} />
                      </button>
                    </Link>
                  ))}
                </div>
                <Link to="/professionals" className="flex items-center gap-1 px-3 mt-2 transition-colors" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  See All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div style={{ height: 1, background: "var(--glass)" }} />

              {/* Categories */}
              <div>
                <h3 className="mb-3" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Explore</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveFilter(c.name === activeFilter ? "All" : c.name)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        background: activeFilter === c.name ? `${c.color}15` : "rgba(0,0,0,0.03)",
                        color: activeFilter === c.name ? c.color : "var(--text-secondary)",
                        border: activeFilter === c.name ? `1px solid ${c.color}30` : "1px solid transparent",
                      }}
                    >
                      <c.icon className="w-3.5 h-3.5" />
                      {c.name}
                      <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: "var(--glass)" }} />

              {/* Trending */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4" style={{ color: "#ef4444" }} />
                  <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Trending</h3>
                </div>
                <div className="space-y-3">
                  {PEOPLE.slice(0, 3).map((p, i) => (
                    <Link
                      key={p.slug}
                      to={`/professionals/${p.slug}`}
                      className="flex items-center gap-3 group"
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : "#cd7f32", width: 20, textAlign: "center" }}>
                        {i + 1}
                      </span>
                      <AvatarImg src={p.avatarUrl} fallback={p.initials} size={36} fallbackBg={p.gradient} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate group-hover:underline" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</p>
                        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{p.projects} projects · {(p.followers / 1000).toFixed(1)}k followers</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: "var(--glass)" }} />

              {/* Community Feed Mini */}
              <div>
                <h3 className="mb-4" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Community</h3>
                <div className="space-y-4">
                  {FEED.slice(0, 3).map((post, i) => (
                    <div key={i}>
                      <div className="flex items-start gap-2.5 mb-2">
                        <Link to={`/professionals/${post.slug}`} className="flex-shrink-0">
                          <AvatarImg src={post.avatarUrl} fallback={post.initials} size={32} fallbackBg="linear-gradient(135deg, #1a1a1a, #444)" />
                        </Link>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Link to={`/professionals/${post.slug}`} style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none" }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                            >
                              {post.author}
                            </Link>
                            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>· {post.time}</span>
                          </div>
                          <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{post.headline}</p>
                        </div>
                      </div>
                      <p className="line-clamp-3" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{post.text}</p>
                      {post.imgUrl && (
                        <div className="mt-2 rounded-lg overflow-hidden" style={{ height: 80 }}>
                          <img src={post.imgUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          <Heart className="w-3 h-3" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          <MessageCircle className="w-3 h-3" /> {post.comments}
                        </button>
                      </div>
                      {i < 2 && <div className="mt-4" style={{ height: 1, background: "var(--glass)" }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Join CTA */}
              <div className="rounded-2xl p-5 text-center" style={{ background: "#1a1a1a" }}>
                <h4 className="mb-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>Join the Community</h4>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 16 }}>
                  Showcase your work, connect with peers, get discovered by studios.
                </p>
                <Link
                  to="/u/profile"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                  style={{ fontSize: "0.8rem", fontWeight: 700, background: "var(--glass-strong)", color: "#1a1a1a" }}
                >
                  Create Profile <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
