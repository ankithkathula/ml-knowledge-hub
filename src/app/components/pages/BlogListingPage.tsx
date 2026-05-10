import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Calendar, User, Tag, Clock, TrendingUp,
  Filter, ChevronDown, Grid, List as ListIcon, Eye,
  BookOpen, Sparkles, ArrowRight,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  excerpt: string;
  views: number;
  featured: boolean;
}

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: "sustainable-concrete-innovations-2026",
    title: "Sustainable Concrete Innovations Transforming Modern Construction",
    subtitle: "How eco-friendly concrete solutions are reducing carbon footprint in mega projects",
    bannerImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Ar. Priya Sharma",
    date: "2026-03-28",
    readTime: "8 min read",
    tags: ["Sustainability", "Concrete", "Green Building"],
    category: "Structural Systems",
    excerpt: "Discover the latest breakthroughs in sustainable concrete technology, including carbon-negative mixes, recycled aggregate innovations, and how leading construction firms are implementing these solutions in real-world projects.",
    views: 12450,
    featured: true,
  },
  {
    id: "smart-glass-technology-building-envelope",
    title: "Smart Glass Technology: The Future of Building Envelopes",
    subtitle: "Electrochromic windows and their impact on energy efficiency",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Eng. Rajesh Kumar",
    date: "2026-03-25",
    readTime: "6 min read",
    tags: ["Smart Buildings", "Glass", "Energy Efficiency"],
    category: "Building Envelope",
    excerpt: "An in-depth analysis of electrochromic glass technology and its applications in modern architecture. Learn how smart windows can reduce HVAC costs by up to 40% while improving occupant comfort.",
    views: 8920,
    featured: true,
  },
  {
    id: "hvac-systems-comparison-2026",
    title: "HVAC Systems Comparison: VRF vs Traditional Ducted Systems",
    subtitle: "Choosing the right mechanical system for your project",
    bannerImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Ar. Sneha Patel",
    date: "2026-03-22",
    readTime: "10 min read",
    tags: ["HVAC", "MEP", "Building Systems"],
    category: "MEP Systems",
    excerpt: "A comprehensive comparison of Variable Refrigerant Flow systems versus traditional ducted HVAC. Includes cost analysis, installation considerations, and performance metrics from 15 completed projects.",
    views: 15670,
    featured: false,
  },
  {
    id: "luxury-flooring-trends-2026",
    title: "Luxury Flooring Trends: From Italian Marble to Engineered Wood",
    subtitle: "Material selection guide for high-end residential projects",
    bannerImage: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Des. Aisha Khan",
    date: "2026-03-20",
    readTime: "7 min read",
    tags: ["Flooring", "Interior Design", "Luxury"],
    category: "Interior Finishes",
    excerpt: "Explore the most sought-after flooring materials for 2026, including natural stone, engineered hardwood, and luxury vinyl planks. Complete with installation tips, maintenance requirements, and cost breakdowns.",
    views: 6540,
    featured: false,
  },
  {
    id: "led-lighting-design-commercial-spaces",
    title: "LED Lighting Design Strategies for Commercial Spaces",
    subtitle: "Creating ambiance while maximizing energy savings",
    bannerImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Eng. Michael D'Souza",
    date: "2026-03-18",
    readTime: "9 min read",
    tags: ["Lighting", "Energy Efficiency", "Design"],
    category: "MEP Systems",
    excerpt: "Master the art of LED lighting design with practical examples from retail, office, and hospitality projects. Includes circadian rhythm lighting, color temperature selection, and control system integration.",
    views: 4230,
    featured: false,
  },
  {
    id: "waterproofing-solutions-basements",
    title: "Complete Guide to Basement Waterproofing Solutions",
    subtitle: "Preventing moisture ingress in below-grade construction",
    bannerImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    author: "Ar. Vikram Mehta",
    date: "2026-03-15",
    readTime: "11 min read",
    tags: ["Waterproofing", "Construction", "Technical"],
    category: "Structural Systems",
    excerpt: "Everything you need to know about basement waterproofing: from membrane selection and drainage systems to crystalline waterproofing and common failure modes. Case studies included.",
    views: 9870,
    featured: false,
  },
];

const CATEGORIES = [
  "All Categories",
  "Building Envelope",
  "Structural Systems",
  "MEP Systems",
  "Interior Finishes",
  "Fixtures & Equipment",
];

export function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  let filteredBlogs = SAMPLE_BLOGS.filter(
    (blog) =>
      (selectedCategory === "All Categories" || blog.category === selectedCategory) &&
      (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (sortBy === "popular") {
    filteredBlogs = [...filteredBlogs].sort((a, b) => b.views - a.views);
  } else if (sortBy === "oldest") {
    filteredBlogs = [...filteredBlogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else {
    filteredBlogs = [...filteredBlogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  const featuredBlogs = SAMPLE_BLOGS.filter((b) => b.featured);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #f5f7fb 50%, #fdf4ef 100%)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="absolute top-0 right-0 w-[600px] h-[400px] opacity-20" style={{ background: "radial-gradient(ellipse, rgba(255,106,61,0.3) 0%, transparent 70%)" }} />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-8 h-8" style={{ color: "#ff6a3d" }} />
                <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Blog & Insights
                </h1>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: 600 }}>
                Expert articles, industry trends, and technical guides from construction materials professionals
              </p>
            </div>
            <Link
              to="/blog/create"
              className="flex items-center gap-2 px-5 py-3 rounded-xl"
              style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}
            >
              <Sparkles className="w-4 h-4" /> Write Article
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search articles by title, tags, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}
                />
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-4 pr-10 py-3 rounded-xl appearance-none"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            </div>
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-3"
                style={{ background: viewMode === "grid" ? "#ff6a3d" : "rgba(255,255,255,0.9)" }}
              >
                <Grid className="w-4 h-4" style={{ color: viewMode === "grid" ? "#fff" : "var(--text-muted)" }} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-3"
                style={{ background: viewMode === "list" ? "#ff6a3d" : "rgba(255,255,255,0.9)" }}
              >
                <ListIcon className="w-4 h-4" style={{ color: viewMode === "list" ? "#fff" : "var(--text-muted)" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {searchQuery === "" && selectedCategory === "All Categories" && featuredBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" style={{ color: "#ff6a3d" }} />
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="gl-card overflow-hidden group"
                style={{ padding: 0 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "#ff6a3d", color: "#fff" }}>
                    Featured
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}>
                      {blog.category}
                    </span>
                    <h3 className="line-clamp-2 mb-2" style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                      {blog.title}
                    </h3>
                    <p className="line-clamp-1" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                      {blog.subtitle}
                    </p>
                  </div>
                </div>
                <div className="p-5" style={{ background: "rgba(255,255,255,0.5)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>
                        {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{blog.author}</p>
                        <div className="flex items-center gap-2" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          <span>{new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Eye className="w-3.5 h-3.5" /> {(blog.views / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {selectedCategory === "All Categories" ? "All Articles" : selectedCategory} ({filteredBlogs.length})
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", fontSize: "0.8rem", color: "var(--text-secondary)" }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="gl-card overflow-hidden group"
                style={{ padding: 0 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 600, background: "rgba(255,106,61,0.95)", color: "#fff" }}>
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 mb-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
                    {blog.title}
                  </h3>
                  <p className="line-clamp-2 mb-4" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 500, background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>
                        {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)" }}>{blog.author.split(" ")[1]}</p>
                        <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{blog.readTime}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <Eye className="w-3 h-3" /> {(blog.views / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="gl-card flex gap-6 group"
                style={{ padding: "20px" }}
              >
                <div className="w-64 h-40 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 600, background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}>
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Calendar className="w-3 h-3" /> {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="mb-2" style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {blog.title}
                  </h3>
                  <p className="mb-1" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                    {blog.subtitle}
                  </p>
                  <p className="line-clamp-2 mb-3" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>
                          {blog.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{blog.author}</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>•</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{blog.readTime}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>•</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <Eye className="w-3 h-3" /> {(blog.views / 1000).toFixed(1)}k views
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 500, background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No articles found</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
