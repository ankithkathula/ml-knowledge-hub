import { useState } from "react";
import {
  FileText, Search, Plus, Upload, Eye, Edit3, Trash2,
  CheckCircle, XCircle, Clock, MessageSquare, User,
  Tag, Calendar, TrendingUp, AlertCircle, Filter,
  ThumbsUp, ThumbsDown, ExternalLink
} from "lucide-react";
import { Link } from "react-router";

type ContentStatus = "published" | "pending_review" | "draft" | "rejected";

interface BlogEntry {
  id: string;
  title: string;
  author: string;
  authorType: "admin" | "contributor" | "expert";
  category: string;
  tags: string[];
  status: ContentStatus;
  views: number;
  comments: number;
  dateSubmitted: string;
  datePublished?: string;
  excerpt: string;
  featured: boolean;
}

const MOCK_BLOGS: BlogEntry[] = [
  { id: "b1", title: "Sustainable Concrete Innovations in 2026", author: "Dr. Rajesh Kumar", authorType: "expert", category: "Structural Systems", tags: ["Concrete", "Sustainability", "Innovation"], status: "published", views: 4520, comments: 23, dateSubmitted: "2026-03-10", datePublished: "2026-03-12", excerpt: "Exploring the latest advances in green concrete technology...", featured: true },
  { id: "b2", title: "Smart Glass Technology in Modern Buildings", author: "Priya Sharma", authorType: "contributor", category: "Building Envelope", tags: ["Glass", "Smart Tech", "Energy"], status: "pending_review", views: 0, comments: 0, dateSubmitted: "2026-03-28", excerpt: "How electrochromic and thermochromic glass is revolutionizing...", featured: false },
  { id: "b3", title: "HVAC Systems Comparison: VRF vs Chilled Water", author: "Amit Patel", authorType: "expert", category: "MEP Systems", tags: ["HVAC", "Comparison", "MEP"], status: "published", views: 3210, comments: 15, dateSubmitted: "2026-03-05", datePublished: "2026-03-07", excerpt: "A detailed comparison of VRF and chilled water HVAC systems...", featured: false },
  { id: "b4", title: "Luxury Flooring Trends for Premium Projects", author: "Neha Singh", authorType: "contributor", category: "Interior Finishes", tags: ["Flooring", "Luxury", "Trends"], status: "pending_review", views: 0, comments: 0, dateSubmitted: "2026-03-26", excerpt: "From Italian marble to engineered hardwood, the top flooring choices...", featured: false },
  { id: "b5", title: "LED Lighting Design for Commercial Spaces", author: "Admin", authorType: "admin", category: "MEP Systems", tags: ["Lighting", "LED", "Commercial"], status: "published", views: 2890, comments: 11, dateSubmitted: "2026-03-01", datePublished: "2026-03-02", excerpt: "Comprehensive guide to LED lighting specifications for offices...", featured: true },
  { id: "b6", title: "Waterproofing Best Practices for Basements", author: "Vikram Das", authorType: "contributor", category: "Wet Areas & Plumbing", tags: ["Waterproofing", "Basement", "Tips"], status: "draft", views: 0, comments: 0, dateSubmitted: "2026-03-20", excerpt: "Essential waterproofing techniques for below-grade construction...", featured: false },
  { id: "b7", title: "Fire Safety Standards Update: NBC 2026", author: "Fire Safety Board", authorType: "expert", category: "Safety & Security", tags: ["Fire Safety", "Standards", "NBC"], status: "rejected", views: 0, comments: 2, dateSubmitted: "2026-03-22", excerpt: "Changes to National Building Code fire safety provisions...", featured: false },
];

const statusConfig: Record<ContentStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  published: { label: "Published", color: "#10b981", bg: "rgba(34,197,94,0.1)", icon: CheckCircle },
  pending_review: { label: "Pending Review", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: Clock },
  draft: { label: "Draft", color: "#6b7280", bg: "rgba(0,0,0,0.05)", icon: FileText },
  rejected: { label: "Rejected", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: XCircle },
};

export function ContentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "published" | "contributors">("all");

  const filtered = MOCK_BLOGS.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchCategory = filterCategory === "all" || b.category === filterCategory;
    const matchTab = activeTab === "all" || (activeTab === "pending" && b.status === "pending_review") || (activeTab === "published" && b.status === "published") || (activeTab === "contributors" && b.authorType === "contributor");
    return matchSearch && matchStatus && matchCategory && matchTab;
  });

  const pendingCount = MOCK_BLOGS.filter((b) => b.status === "pending_review").length;
  const categories = [...new Set(MOCK_BLOGS.map((b) => b.category))];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Blog & Content Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Review, approve, and manage blog content. Contributors submit articles for review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
            <Upload className="w-3.5 h-3.5" /> Bulk Import Articles
          </button>
          <Link
            to="/blog/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "#ff6a3d" }}
          >
            <Plus className="w-3.5 h-3.5" /> New Article
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Articles", value: "1,850", color: "#3b82f6" },
          { label: "Published", value: "1,540", color: "#10b981" },
          { label: "Pending Review", value: pendingCount.toString(), color: "#f59e0b" },
          { label: "Contributors", value: "124", color: "#a855f7" },
          { label: "Total Views", value: "284K", color: "#ff6a3d" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3.5" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)" }}>
        {[
          { key: "all" as const, label: "All Content" },
          { key: "pending" as const, label: `Pending Review (${pendingCount})` },
          { key: "published" as const, label: "Published" },
          { key: "contributors" as const, label: "Contributor Submissions" },
        ].map((tab) => (
          <button
            key={tab.key}
            className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.key ? "white" : "transparent",
              color: activeTab === tab.key ? "#ff6a3d" : "var(--text-muted)",
              boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Search articles, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Content List */}
      <div className="space-y-3">
        {filtered.map((blog) => {
          const sc = statusConfig[blog.status];
          const StatusIcon = sc.icon;
          return (
            <div
              key={blog.id}
              className="rounded-xl p-4 transition-all"
              style={{ background: "rgba(255,255,255,0.9)", border: blog.status === "pending_review" ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(0,0,0,0.06)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: sc.bg, color: sc.color }}>
                      <StatusIcon className="w-3 h-3 inline mr-1" style={{ verticalAlign: "-2px" }} />{sc.label}
                    </span>
                    {blog.featured && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}>Featured</span>
                    )}
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>{blog.category}</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        background: blog.authorType === "admin" ? "rgba(59,130,246,0.1)" : blog.authorType === "expert" ? "rgba(168,85,247,0.1)" : "rgba(16,185,129,0.1)",
                        color: blog.authorType === "admin" ? "#3b82f6" : blog.authorType === "expert" ? "#a855f7" : "#10b981",
                      }}
                    >
                      {blog.authorType}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{blog.title}</h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>{blog.excerpt}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <User className="w-3 h-3" /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Calendar className="w-3 h-3" /> {blog.dateSubmitted}
                    </span>
                    {blog.views > 0 && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Eye className="w-3 h-3" /> {blog.views.toLocaleString()} views
                      </span>
                    )}
                    {blog.comments > 0 && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <MessageSquare className="w-3 h-3" /> {blog.comments}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      {blog.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.03)", color: "var(--text-muted)", fontSize: "0.65rem" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {blog.status === "pending_review" && (
                    <>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#10b981" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.2)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.1)")}
                      >
                        <ThumbsUp className="w-3 h-3" /> Approve
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.2)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)")}
                      >
                        <ThumbsDown className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                    ><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                    ><Edit3 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                    ><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
          <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>No articles found</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
