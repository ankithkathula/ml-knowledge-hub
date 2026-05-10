import { useState } from "react";
import { Link } from "react-router";
import {
  FileText, Eye, Heart, Clock, Plus, Edit3, Trash2,
  ExternalLink, TrendingUp, Search, Filter, BarChart3,
  BookOpen, MessageSquare, Save, Send, X, Tag, ChevronDown,
} from "lucide-react";

// --- Types ---

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  status: "Published" | "Draft" | "Under Review";
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
}

// --- Mock Data ---

const mockArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Choosing the Right Waterproofing System for Coastal Buildings in Kerala",
    excerpt: "A comprehensive guide to selecting waterproofing membranes and coatings suited for high-humidity, salt-laden coastal environments...",
    status: "Published",
    publishDate: "2026-03-15",
    views: 4820,
    likes: 312,
    comments: 47,
    readTime: "8 min",
    category: "Waterproofing",
    tags: ["Waterproofing", "Coastal Construction", "Kerala"],
  },
  {
    id: "2",
    title: "AAC Blocks vs Red Bricks: A Cost-Benefit Analysis for Residential Projects",
    excerpt: "Detailed comparison of Autoclaved Aerated Concrete blocks and traditional red clay bricks across 12 key parameters...",
    status: "Published",
    publishDate: "2026-02-28",
    views: 7340,
    likes: 489,
    comments: 83,
    readTime: "12 min",
    category: "Masonry",
    tags: ["AAC Blocks", "Bricks", "Cost Analysis"],
  },
  {
    id: "3",
    title: "Understanding IS 456:2000 - Concrete Mix Design for Indian Conditions",
    excerpt: "Breaking down the BIS standard for plain and reinforced concrete with practical mix design examples...",
    status: "Under Review",
    publishDate: "",
    views: 0,
    likes: 0,
    comments: 0,
    readTime: "15 min",
    category: "Concrete",
    tags: ["BIS Standards", "Concrete", "Mix Design"],
  },
  {
    id: "4",
    title: "Sustainable Alternatives to River Sand in Construction",
    excerpt: "Exploring M-Sand, recycled aggregates, and other alternatives addressing the sand mining crisis in India...",
    status: "Draft",
    publishDate: "",
    views: 0,
    likes: 0,
    comments: 0,
    readTime: "10 min",
    category: "Aggregates",
    tags: ["M-Sand", "Sustainability", "Aggregates"],
  },
  {
    id: "5",
    title: "HVAC System Selection Guide for Commercial Spaces in Tier-2 Indian Cities",
    excerpt: "Navigating VRF, chiller, and split system options considering India's diverse climate zones and energy costs...",
    status: "Published",
    publishDate: "2026-01-20",
    views: 3150,
    likes: 198,
    comments: 34,
    readTime: "11 min",
    category: "HVAC",
    tags: ["HVAC", "Commercial", "Energy Efficiency"],
  },
  {
    id: "6",
    title: "Fire Safety Compliance: A Checklist for High-Rise Residential Buildings",
    excerpt: "Step-by-step compliance guide based on NBC 2016 and state-specific fire safety norms for residential towers...",
    status: "Published",
    publishDate: "2025-12-10",
    views: 5680,
    likes: 410,
    comments: 62,
    readTime: "9 min",
    category: "Fire Safety",
    tags: ["Fire Safety", "NBC", "High-Rise"],
  },
];

const categories = [
  "Waterproofing", "Masonry", "Concrete", "Aggregates", "HVAC",
  "Fire Safety", "Plumbing", "Electrical", "Flooring", "Roofing",
  "Structural Steel", "Paint & Coatings",
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Published: { bg: "rgba(16,185,129,0.1)", text: "#10b981", border: "rgba(16,185,129,0.25)" },
  Draft: { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  "Under Review": { bg: "rgba(59,130,246,0.1)", text: "#3b82f6", border: "rgba(59,130,246,0.25)" },
};

// --- Component ---

export function ConsultantBlogsPage() {
  const [articles, setArticles] = useState<BlogArticle[]>(mockArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showDraftEditor, setShowDraftEditor] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftCategory, setDraftCategory] = useState(categories[0]);
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Computed
  const totalViews = articles.reduce((s, a) => s + a.views, 0);
  const totalLikes = articles.reduce((s, a) => s + a.likes, 0);
  const publishedCount = articles.filter((a) => a.status === "Published").length;
  const avgReadTime =
    articles.length > 0
      ? (articles.reduce((s, a) => s + parseInt(a.readTime), 0) / articles.length).toFixed(0)
      : "0";

  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const topPerformers = [...articles]
    .filter((a) => a.status === "Published")
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !draftTags.includes(tag)) {
      setDraftTags([...draftTags, tag]);
      setNewTag("");
    }
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleSaveDraft = () => {
    if (!draftTitle.trim()) return;
    const newArticle: BlogArticle = {
      id: Date.now().toString(),
      title: draftTitle,
      excerpt: draftContent.slice(0, 120) + "...",
      status: "Draft",
      publishDate: "",
      views: 0,
      likes: 0,
      comments: 0,
      readTime: Math.max(1, Math.ceil(draftContent.split(/\s+/).length / 200)) + " min",
      category: draftCategory,
      tags: draftTags,
    };
    setArticles([newArticle, ...articles]);
    resetDraft();
  };

  const handlePublish = () => {
    if (!draftTitle.trim()) return;
    const newArticle: BlogArticle = {
      id: Date.now().toString(),
      title: draftTitle,
      excerpt: draftContent.slice(0, 120) + "...",
      status: "Under Review",
      publishDate: "",
      views: 0,
      likes: 0,
      comments: 0,
      readTime: Math.max(1, Math.ceil(draftContent.split(/\s+/).length / 200)) + " min",
      category: draftCategory,
      tags: draftTags,
    };
    setArticles([newArticle, ...articles]);
    resetDraft();
  };

  const resetDraft = () => {
    setShowDraftEditor(false);
    setDraftTitle("");
    setDraftContent("");
    setDraftCategory(categories[0]);
    setDraftTags([]);
    setNewTag("");
  };

  // Stats config
  const stats = [
    { label: "Total Articles", value: articles.length.toString(), icon: FileText, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
    { label: "Total Views", value: totalViews.toLocaleString("en-IN"), icon: Eye, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
    { label: "Total Likes", value: totalLikes.toLocaleString("en-IN"), icon: Heart, color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.2)" },
    { label: "Avg Read Time", value: `${avgReadTime} min`, icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            My Articles &amp; Blogs
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Create, manage, and track performance of your published content
          </p>
        </div>
        <button
          onClick={() => setShowDraftEditor(true)}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <Plus size={16} />
          Write New Article
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="glass-card rounded-xl p-4 hover-lift transition-all"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4" style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search articles by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
            />
          </div>
          <div className="flex gap-2">
            {["All", "Published", "Draft", "Under Review"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: statusFilter === s ? "var(--accent)" : "rgba(255,255,255,0.04)",
                  color: statusFilter === s ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${statusFilter === s ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article List - 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Articles ({filteredArticles.length})
          </h3>
          {filteredArticles.length === 0 && (
            <div className="glass-card rounded-xl p-8 text-center" style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <FileText size={40} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No articles found matching your criteria.</p>
            </div>
          )}
          {filteredArticles.map((article) => {
            const sc = statusColors[article.status];
            return (
              <div
                key={article.id}
                className="glass-card rounded-xl p-4 hover-lift transition-all"
                style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h4
                        className="truncate"
                        style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", flex: 1, minWidth: 0 }}
                      >
                        {article.title}
                      </h4>
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                      >
                        {article.status}
                      </span>
                    </div>
                    <p
                      className="line-clamp-2"
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8, lineHeight: 1.5 }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Tag size={11} />{article.category}</span>
                      {article.publishDate && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(article.publishDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><BookOpen size={11} />{article.readTime}</span>
                      {article.status === "Published" && (
                        <>
                          <span className="flex items-center gap-1"><Eye size={11} />{article.views.toLocaleString("en-IN")}</span>
                          <span className="flex items-center gap-1"><Heart size={11} />{article.likes}</span>
                          <span className="flex items-center gap-1"><MessageSquare size={11} />{article.comments}</span>
                        </>
                      )}
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: "rgba(255,106,61,0.08)", color: "var(--accent)", border: "1px solid rgba(255,106,61,0.15)", fontSize: "0.65rem" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-105"
                      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                      title="Edit"
                    >
                      <Edit3 size={14} style={{ color: "#3b82f6" }} />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-105"
                      style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                      title="Preview"
                    >
                      <ExternalLink size={14} style={{ color: "#10b981" }} />
                    </button>
                    {deleteConfirm === article.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 rounded-lg text-xs font-bold"
                          style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="p-2 rounded-lg text-xs"
                          style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(article.id)}
                        className="p-2 rounded-lg transition-all hover:scale-105"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                        title="Delete"
                      >
                        <Trash2 size={14} style={{ color: "#ef4444" }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar - Performance */}
        <div className="space-y-4">
          <div
            className="glass-card rounded-xl p-4"
            style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Top Performing</h3>
            </div>
            <div className="space-y-3">
              {topPerformers.map((a, i) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: i === 0 ? "rgba(255,106,61,0.15)" : "rgba(255,255,255,0.05)",
                      color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                      border: `1px solid ${i === 0 ? "rgba(255,106,61,0.25)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {a.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Eye size={10} />{a.views.toLocaleString("en-IN")}</span>
                      <span className="flex items-center gap-1"><Heart size={10} />{a.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div
            className="glass-card rounded-xl p-4"
            style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} style={{ color: "#a855f7" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>By Category</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(
                articles.reduce((acc, a) => {
                  acc[a.category] = (acc[a.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between">
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{cat}</span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Draft Editor */}
      {showDraftEditor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="glass-card rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6"
            style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Quick Draft
              </h3>
              <button onClick={resetDraft} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                <X size={18} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Article title..."
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none", fontSize: "1rem" }}
            />

            {/* Content */}
            <textarea
              placeholder="Start writing your article... (Markdown supported)"
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 rounded-xl text-sm mb-4 resize-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none", lineHeight: 1.7 }}
            />

            {/* Category */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, display: "block" }}>
                  Category
                </label>
                <select
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-5">
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, display: "block" }}>
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-3 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: "rgba(255,106,61,0.1)", color: "var(--accent)", border: "1px solid rgba(255,106,61,0.2)" }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {draftTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                    style={{ background: "rgba(255,106,61,0.08)", color: "var(--accent)", border: "1px solid rgba(255,106,61,0.15)" }}
                  >
                    {tag}
                    <button onClick={() => setDraftTags(draftTags.filter((t) => t !== tag))}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Save size={15} />
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <Send size={15} />
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
