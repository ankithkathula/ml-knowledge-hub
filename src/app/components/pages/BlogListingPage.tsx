import { useState } from "react";
import { Link } from "react-router";
import { Search, Eye, ArrowRight, Sparkles, Clock, ExternalLink } from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  authorImg: string;
  date: string;
  readTime: string;
  views: number;
  imgUrl: string;
  excerpt: string;
}

const POSTS: Post[] = [
  { id: "sustainable-concrete", title: "Sustainable Concrete Innovations Transforming Modern Construction", category: "Structural", author: "Ar. Priya Sharma",     authorImg: "https://i.pravatar.cc/80?img=55", date: "28 Mar", readTime: "8 min", views: 12450, imgUrl: "https://picsum.photos/seed/concrete-build/600/400",    excerpt: "Breakthroughs in carbon-negative mixes, recycled aggregate innovations, and real-world implementations in mega projects across India." },
  { id: "smart-glass",          title: "Smart Glass Technology: The Future of Building Envelopes",          category: "Facade",     author: "Eng. Rajesh Kumar",    authorImg: "https://i.pravatar.cc/80?img=66", date: "25 Mar", readTime: "6 min", views: 8920,  imgUrl: "https://picsum.photos/seed/glass-facade/600/400",     excerpt: "Electrochromic glass can reduce HVAC costs by up to 40% while dramatically improving occupant comfort and visual transparency control." },
  { id: "hvac-vrf",             title: "VRF vs Traditional Ducted HVAC: A 15-Project Analysis",            category: "MEP",        author: "Ar. Sneha Patel",      authorImg: "https://i.pravatar.cc/80?img=13", date: "22 Mar", readTime: "10 min",views: 15670, imgUrl: "https://picsum.photos/seed/hvac-system/600/400",      excerpt: "Cost analysis, installation considerations, and performance metrics from 15 completed projects across residential and commercial sectors." },
  { id: "luxury-flooring",      title: "Luxury Flooring Trends: Italian Marble to Engineered Wood",        category: "Interiors",  author: "Des. Aisha Khan",      authorImg: "https://i.pravatar.cc/80?img=67", date: "20 Mar", readTime: "7 min", views: 6540,  imgUrl: "https://picsum.photos/seed/flooring-marble/600/400",  excerpt: "Material selection guide for high-end residential and hospitality projects with full cost breakdowns and installation notes." },
  { id: "led-lighting",         title: "LED Lighting Design Strategies for Commercial Spaces",             category: "MEP",        author: "Eng. Michael D'Souza", authorImg: "https://i.pravatar.cc/80?img=18", date: "18 Mar", readTime: "9 min", views: 4230,  imgUrl: "https://picsum.photos/seed/office-lighting/600/400",  excerpt: "Circadian rhythm lighting, color temperature selection, and smart control system integration for modern workplace environments." },
  { id: "waterproofing-guide",  title: "Complete Guide to Basement Waterproofing Solutions",               category: "Structural", author: "Ar. Vikram Mehta",     authorImg: "https://i.pravatar.cc/80?img=69", date: "15 Mar", readTime: "11 min",views: 9870,  imgUrl: "https://picsum.photos/seed/basement-build/600/400",   excerpt: "Membrane selection, drainage systems, crystalline waterproofing, and a deep-dive into common failure modes with case studies." },
  { id: "bim-contractors",      title: "BIM for Contractors: Streamlining On-Site Documentation",         category: "BIM & Tech", author: "Ar. Kavya Reddy",      authorImg: "https://i.pravatar.cc/80?img=61", date: "12 Mar", readTime: "8 min", views: 7200,  imgUrl: "https://picsum.photos/seed/bim-construction/600/400", excerpt: "From clash detection to digital twins — a practical BIM implementation guide for construction teams working on site." },
  { id: "biophilic-offices",    title: "Biophilic Design in Corporate Offices: The ROI on Wellbeing",     category: "Interiors",  author: "Dr. Sameer Joshi",     authorImg: "https://i.pravatar.cc/80?img=54", date: "10 Mar", readTime: "6 min", views: 5800,  imgUrl: "https://picsum.photos/seed/biophilic-plant/600/400",  excerpt: "Green walls, natural light strategies, and material palettes proven to boost employee productivity by up to 12% in measured studies." },
];

const TAGS = ["All", "Structural", "MEP", "Facade", "Interiors", "BIM & Tech"];
const ACCENT = "#ff6a3d";
const LINE = "1px solid rgba(0,0,0,0.1)";

interface StudioAd {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  imgUrl: string;
  profilePath: string;
  cta: string;
  stat: string;
  statLabel: string;
}

const STUDIO_ADS: StudioAd[] = [
  {
    id: "morphogenesis",
    name: "Morphogenesis",
    tagline: "Sustainable architecture at civic scale",
    desc: "From TERI's net-zero retreat to Fortis hospitals and the USAID New Delhi campus — Morphogenesis designs buildings that perform as well as they look.",
    tags: ["Architecture", "Sustainability", "Urban"],
    imgUrl: "https://picsum.photos/seed/morphogenesis-civic/800/420",
    profilePath: "/studio/morphogenesis",
    cta: "View Portfolio",
    stat: "200+",
    statLabel: "completed projects",
  },
  {
    id: "studio-lotus",
    name: "Studio Lotus",
    tagline: "Crafting soulful spaces with local materials",
    desc: "Raas Hotels, Amara, and a growing portfolio of private residences — Studio Lotus brings craft and narrative to every interior.",
    tags: ["Interior Design", "Hospitality", "Residential"],
    imgUrl: "https://picsum.photos/seed/studio-lotus-interior/800/420",
    profilePath: "/studio/studio-lotus",
    cta: "Explore Work",
    stat: "15+",
    statLabel: "award-winning hospitality projects",
  },
];

function CategoryLabel({ cat }: { cat: string }) {
  return (
    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em" }}>
      {cat}
    </span>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <AvatarImg src={post.authorImg} fallback={post.author.split(" ").map(n => n[0]).join("").slice(0, 2)} size={24} borderStyle="none" />
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#1a1a1a" }}>{post.author}</span>
      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>· {post.date} · {post.readTime}</span>
    </div>
  );
}

export function BlogListingPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  const filtered = POSTS.filter(p =>
    (activeTag === "All" || p.category === activeTag) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const showMagazine = activeTag === "All" && !search && filtered.length >= 8;

  return (
    <div className="min-h-screen" style={{ background: "#fafaf9" }}>

      {/* ── Masthead ── */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex items-start justify-between gap-8 pb-8" style={{ borderBottom: LINE }}>
          {/* Left: Big title */}
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>
              Material Library · Knowledge Center
            </p>
            <h1 style={{ fontSize: "clamp(3.8rem, 9vw, 7.5rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 0.88, color: "#1a1a1a" }}>
              Insights.
            </h1>
          </div>

          {/* Right: Filters + Search */}
          <div className="flex flex-col gap-4 pt-1 min-w-0 max-w-xs">
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="px-3 py-1.5 rounded-full transition-all"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: activeTag === tag ? "#1a1a1a" : "transparent",
                    color: activeTag === tag ? "#fff" : "#1a1a1a",
                    border: "1px solid rgba(0,0,0,0.22)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                style={{ background: "white", border: LINE, color: "#1a1a1a" }}
              />
            </div>
          </div>
        </div>
      </div>

      {showMagazine ? (
        <div className="max-w-6xl mx-auto px-6">

          {/* ── ROW 1: 4-column editorial strip ── */}
          <div className="grid grid-cols-4" style={{ borderBottom: LINE }}>

            {/* Col 1: Article with photo */}
            <Link to={`/blog/${filtered[0].id}`} className="block group" style={{ borderRight: LINE, paddingRight: 24, paddingTop: 22, paddingBottom: 24 }}>
              <div className="rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                <img src={filtered[0].imgUrl} alt={filtered[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <CategoryLabel cat={filtered[0].category} />
              <h3 className="mt-1 group-hover:underline" style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35 }}>
                {filtered[0].title}
              </h3>
              <p className="line-clamp-2 mt-1.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                {filtered[0].excerpt}
              </p>
              <PostMeta post={filtered[0]} />
            </Link>

            {/* Col 2: Stat / highlight visual */}
            <div style={{ borderRight: LINE, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <CategoryLabel cat="This Week" />
                <div style={{ fontSize: "3.8rem", fontWeight: 900, color: "#1a1a1a", lineHeight: 1, marginTop: 10, letterSpacing: "-0.04em" }}>
                  42.3k
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>
                  spec sheets downloaded across 6 material categories
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: ACCENT, opacity: 0.12 }} />
                <div style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: 0.4 }} />
              </div>
            </div>

            {/* Col 3: Text-only article */}
            <Link to={`/blog/${filtered[2].id}`} className="block group" style={{ borderRight: LINE, padding: "22px 24px 24px" }}>
              <CategoryLabel cat={filtered[2].category} />
              <h3 className="mt-1 group-hover:underline" style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35 }}>
                {filtered[2].title}
              </h3>
              <p className="line-clamp-3 mt-2" style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {filtered[2].excerpt}
              </p>
              <PostMeta post={filtered[2]} />
            </Link>

            {/* Col 4: Article with photo */}
            <Link to={`/blog/${filtered[3].id}`} className="block group" style={{ paddingLeft: 24, paddingTop: 22, paddingBottom: 24 }}>
              <div className="rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "4/3" }}>
                <img src={filtered[3].imgUrl} alt={filtered[3].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <CategoryLabel cat={filtered[3].category} />
              <h3 className="mt-1 group-hover:underline" style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35 }}>
                {filtered[3].title}
              </h3>
              <PostMeta post={filtered[3]} />
            </Link>
          </div>

          {/* ── ROW 2: Big photo + 2 stacked + dark stat ── */}
          <div className="grid grid-cols-4" style={{ borderBottom: LINE }}>

            {/* Big photo: col-span-2 */}
            <Link to={`/blog/${filtered[1].id}`} className="col-span-2 block group" style={{ borderRight: LINE, paddingRight: 28, paddingTop: 28, paddingBottom: 28 }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 300 }}>
                <img src={filtered[1].imgUrl} alt={filtered[1].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.75))" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    {filtered[1].category}
                  </span>
                  <h3 className="mt-1" style={{ fontSize: "1.45rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                    {filtered[1].title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <AvatarImg src={filtered[1].authorImg} fallback={filtered[1].author.split(" ").map(n => n[0]).join("").slice(0, 2)} size={28} borderStyle="none" />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#1a1a1a" }}>{filtered[1].author}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>· {filtered[1].date} · {filtered[1].readTime}</span>
                <span className="ml-auto flex items-center gap-1" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                  <Eye className="w-3 h-3" /> {(filtered[1].views / 1000).toFixed(1)}k
                </span>
              </div>
            </Link>

            {/* 2 stacked text articles */}
            <div style={{ borderRight: LINE }}>
              {[4, 5].map((idx, i) => (
                <Link key={idx} to={`/blog/${filtered[idx].id}`} className="block group"
                  style={{ padding: "24px 22px", borderBottom: i === 0 ? LINE : "none", height: "50%" }}
                >
                  <CategoryLabel cat={filtered[idx].category} />
                  <h4 className="mt-1 group-hover:underline" style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.4 }}>
                    {filtered[idx].title}
                  </h4>
                  <p className="line-clamp-2 mt-1.5" style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                    {filtered[idx].excerpt}
                  </p>
                </Link>
              ))}
            </div>

            {/* Dark stat card */}
            <div style={{ background: "#1a1a1a", padding: "28px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Most Read
                </span>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: ACCENT, lineHeight: 1, marginTop: 14, letterSpacing: "-0.04em" }}>
                  24.1k
                </div>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginTop: 10, lineHeight: 1.55 }}>
                  readers — Polished vs Matte: Choosing the Right Tile Finish for Indian Homes
                </p>
              </div>
              <Link to="/blog/hvac-vrf" className="flex items-center gap-1.5 mt-4" style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT }}>
                Read it <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ── STUDIO AD (between row 2 and row 3) ── */}
          <StudioSpotlightAd ad={STUDIO_ADS[0]} reverse={false} />

          {/* ── ROW 3: Large text headline + article + stat ── */}
          <div className="grid grid-cols-3" style={{ borderBottom: LINE }}>

            {/* Big text-only headline */}
            <Link to={`/blog/${filtered[6].id}`} className="block group col-span-1" style={{ borderRight: LINE, paddingRight: 28, paddingTop: 28, paddingBottom: 28 }}>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[filtered[6].category, "Construction", "Digital"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, border: "1px solid rgba(0,0,0,0.18)", color: "#1a1a1a" }}>
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="group-hover:underline" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", fontWeight: 900, color: "#1a1a1a", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
                {filtered[6].title}
              </h2>
              <p className="mt-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                {filtered[6].excerpt}
              </p>
              <PostMeta post={filtered[6]} />
            </Link>

            {/* Article with small photo */}
            <Link to={`/blog/${filtered[7].id}`} className="block group" style={{ borderRight: LINE, padding: "28px 26px" }}>
              <div className="rounded-xl overflow-hidden mb-4" style={{ height: 150 }}>
                <img src={filtered[7].imgUrl} alt={filtered[7].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <CategoryLabel cat={filtered[7].category} />
              <h3 className="mt-1 group-hover:underline" style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35 }}>
                {filtered[7].title}
              </h3>
              <p className="line-clamp-2 mt-2" style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                {filtered[7].excerpt}
              </p>
              <PostMeta post={filtered[7]} />
            </Link>

            {/* Community stat card */}
            <div style={{ padding: "28px 26px" }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Community
              </span>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: "#1a1a1a", lineHeight: 1, marginTop: 14, letterSpacing: "-0.04em" }}>
                12k+
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a", marginTop: 8 }}>
                Spec downloads
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.6 }}>
                Products from ML Knowledge Hub specified in projects this month
              </p>
              <Link to="/products" className="flex items-center gap-1.5 mt-5" style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT }}>
                Browse products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ── Filtered / Search grid ── */
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 20 }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} {activeTag !== "All" ? `in ${activeTag}` : "matching your search"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block group"
                style={{
                  borderRight: (i % 3 < 2) ? LINE : "none",
                  borderBottom: LINE,
                  padding: "24px 24px",
                }}
              >
                <div className="rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
                  <img src={post.imgUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <CategoryLabel cat={post.category} />
                <h3 className="mt-1 group-hover:underline" style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35 }}>
                  {post.title}
                </h3>
                <p className="line-clamp-2 mt-1.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  {post.excerpt}
                </p>
                <PostMeta post={post} />
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 py-20 text-center" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                No articles match your search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Studio ad before newsletter ── */}
      <div className="max-w-6xl mx-auto px-6">
        <StudioSpotlightAd ad={STUDIO_ADS[1]} reverse={true} />
      </div>

      {/* ── Write CTA strip ── */}
      <div className="max-w-6xl mx-auto px-6 py-6" style={{ borderTop: LINE, borderBottom: LINE }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Share your expertise</p>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a", marginTop: 2 }}>Write a technical article for the ML community</p>
          </div>
          <Link
            to="/blog/create"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
            style={{ background: "#1a1a1a", color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Write Article
          </Link>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div style={{ background: "#1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between flex-wrap gap-8">
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>
                Newsletter · Sent every Saturday morning
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
                Stay ahead of the curve.<br />
                <span style={{ color: ACCENT }}>New insights every week.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@company.com"
                className="px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", width: 260 }}
              />
              <button
                className="px-5 py-3 rounded-xl font-bold transition-opacity"
                style={{ background: ACCENT, color: "#fff", fontSize: "0.85rem" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Subscribe →
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function StudioSpotlightAd({ ad, reverse }: { ad: StudioAd; reverse: boolean }) {
  return (
    <div
      className={`grid md:grid-cols-2`}
      style={{ borderTop: LINE, borderBottom: LINE }}
    >
      {/* Photo side */}
      {!reverse && (
        <div className="relative overflow-hidden hidden md:block" style={{ minHeight: 240 }}>
          <img src={ad.imgUrl} alt={ad.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #fafaf9 100%)" }} />
        </div>
      )}

      {/* Text side */}
      <div className="flex flex-col justify-center py-8 px-8 gap-3">
        <p style={{ fontSize: "0.6rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.14em" }}>
          Sponsored · Studio Spotlight
        </p>
        <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
          {ad.name}
        </h3>
        <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", lineHeight: 1.4 }}>
          {ad.tagline}
        </p>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 400 }}>
          {ad.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 my-1">
          {ad.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, border: LINE, color: "#1a1a1a" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1 }}>{ad.stat}</p>
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{ad.statLabel}</p>
          </div>
          <Link
            to={ad.profilePath}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl"
            style={{ background: "#1a1a1a", color: "#fff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}
          >
            {ad.cta} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Photo side (reversed) */}
      {reverse && (
        <div className="relative overflow-hidden hidden md:block" style={{ minHeight: 240 }}>
          <img src={ad.imgUrl} alt={ad.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 60%, #fafaf9 100%)" }} />
        </div>
      )}
    </div>
  );
}
