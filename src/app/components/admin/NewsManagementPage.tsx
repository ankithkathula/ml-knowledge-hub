import { useState } from "react";
import {
  Newspaper, Search, Plus, Upload, Download, Edit3, Trash2,
  Eye, RefreshCw, Tag, Calendar, ExternalLink, Globe,
  CheckCircle, Clock, XCircle, Rss, Zap, Filter
} from "lucide-react";

interface NewsEntry {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  categories: string[];
  status: "published" | "pending_tag" | "draft" | "archived";
  date: string;
  fetchedVia: "api" | "manual" | "rss";
  image?: string;
  summary: string;
}

const TAG_COLORS: Record<string, string> = {
  Policy: "#3b82f6",
  Technology: "#a855f7",
  Market: "#f59e0b",
  Innovation: "#10b981",
  Sustainability: "#2a9d8f",
  Standards: "#6c757d",
  Infrastructure: "#e63946",
  "Real Estate": "#bc6c25",
};

const MOCK_NEWS: NewsEntry[] = [
  { id: "n1", title: "New BIS Standards for Steel Reinforcement Bars Released", source: "Construction Week", sourceUrl: "#", tags: ["Standards", "Policy"], categories: ["Structural Systems"], status: "published", date: "2026-03-29", fetchedVia: "api", summary: "Bureau of Indian Standards has released updated specifications for TMT bars..." },
  { id: "n2", title: "India's Cement Production Hits Record 380M Tonnes", source: "ET Infrastructure", sourceUrl: "#", tags: ["Market", "Infrastructure"], categories: ["Structural Systems", "Building Envelope"], status: "published", date: "2026-03-28", fetchedVia: "api", summary: "India's cement production reached an all-time high in FY2025-26..." },
  { id: "n3", title: "Smart Building Adoption Grows 45% in Tier-1 Cities", source: "Building Materials India", sourceUrl: "#", tags: ["Technology", "Innovation"], categories: ["MEP Systems", "Safety & Security"], status: "published", date: "2026-03-27", fetchedVia: "rss", summary: "Smart building solutions seeing rapid adoption across metros..." },
  { id: "n4", title: "Green Building Materials Market to Reach $500B by 2030", source: "Markets & Markets", sourceUrl: "#", tags: ["Market", "Sustainability"], categories: ["Insulation & Protection", "Interior Finishes"], status: "pending_tag", date: "2026-03-27", fetchedVia: "api", summary: "Global green building materials market projected to grow at 11.2% CAGR..." },
  { id: "n5", title: "RERA Mandates Fire Safety Compliance for All New Projects", source: "Economic Times", sourceUrl: "#", tags: ["Policy", "Standards"], categories: ["Safety & Security"], status: "pending_tag", date: "2026-03-26", fetchedVia: "rss", summary: "New RERA guidelines require comprehensive fire safety audits..." },
  { id: "n6", title: "3D Printed Concrete Structure Completed in Chennai", source: "The Hindu", sourceUrl: "#", tags: ["Innovation", "Technology"], categories: ["Structural Systems", "Specialty Materials"], status: "draft", date: "2026-03-25", fetchedVia: "manual", summary: "India's first full-scale 3D printed concrete building completed..." },
  { id: "n7", title: "Modular Kitchen Market Growing at 25% CAGR in India", source: "Business Standard", sourceUrl: "#", tags: ["Market"], categories: ["Furniture & Fittings", "Interior Finishes"], status: "published", date: "2026-03-24", fetchedVia: "api", summary: "The Indian modular kitchen market is experiencing unprecedented growth..." },
];

const NEWS_API_SOURCES = [
  { name: "NewsAPI.org", status: "connected", lastFetch: "5 min ago", articles: 128 },
  { name: "Google News RSS", status: "connected", lastFetch: "15 min ago", articles: 86 },
  { name: "Construction Week RSS", status: "connected", lastFetch: "1 hr ago", articles: 42 },
  { name: "ET Infrastructure", status: "error", lastFetch: "2 hr ago", articles: 0 },
];

export function NewsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApiPanel, setShowApiPanel] = useState(false);

  const filtered = MOCK_NEWS.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || n.status === filterStatus;
    const matchTag = filterTag === "all" || n.tags.includes(filterTag);
    return matchSearch && matchStatus && matchTag;
  });

  const pendingCount = MOCK_NEWS.filter((n) => n.status === "pending_tag").length;

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Industry News Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Fetch, tag, and manage industry news by category. Auto-populated via API feeds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}
            onClick={() => setShowApiPanel(!showApiPanel)}
          >
            <Rss className="w-3.5 h-3.5" /> API Sources
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Fetch Now
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "#ff6a3d" }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-3.5 h-3.5" /> Add Manually
          </button>
        </div>
      </div>

      {/* API Sources Panel */}
      {showApiPanel && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              <Rss className="w-4 h-4 inline mr-2" style={{ color: "#3b82f6" }} />
              News API Sources
            </h3>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
              + Add Source
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {NEWS_API_SOURCES.map((src) => (
              <div key={src.name} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{src.name}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: src.status === "connected" ? "#10b981" : "#ef4444" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: src.status === "connected" ? "#10b981" : "#ef4444" }} />
                    {src.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Last fetch: {src.lastFetch} &middot; {src.articles} articles
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.6)" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              <Zap className="w-3 h-3 inline mr-1" style={{ color: "#f59e0b" }} />
              News is auto-fetched every 30 minutes. Articles are tagged by category using keyword matching. Untagged articles appear in "Pending Tag" for manual review.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total News", value: "4,620", color: "#3b82f6" },
          { label: "Published", value: "4,180", color: "#10b981" },
          { label: "Pending Tags", value: pendingCount.toString(), color: "#f59e0b" },
          { label: "Sources", value: "12", color: "#a855f7" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3.5" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tag Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Filter by tag:</span>
        <button
          className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
          style={{ background: filterTag === "all" ? "#ff6a3d" : "rgba(0,0,0,0.04)", color: filterTag === "all" ? "white" : "var(--text-secondary)" }}
          onClick={() => setFilterTag("all")}
        >
          All
        </button>
        {Object.entries(TAG_COLORS).map(([tag, color]) => (
          <button
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
            style={{ background: filterTag === tag ? color : `${color}10`, color: filterTag === tag ? "white" : color }}
            onClick={() => setFilterTag(filterTag === tag ? "all" : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Search news articles, sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="pending_tag">Pending Tag</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* News List */}
      <div className="space-y-2">
        {filtered.map((news) => (
          <div
            key={news.id}
            className="rounded-xl p-4 transition-all"
            style={{
              background: "rgba(255,255,255,0.9)",
              border: news.status === "pending_tag" ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-semibold"
                    style={{
                      background: news.status === "published" ? "rgba(34,197,94,0.1)" : news.status === "pending_tag" ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.05)",
                      color: news.status === "published" ? "#10b981" : news.status === "pending_tag" ? "#f59e0b" : "var(--text-muted)",
                    }}
                  >
                    {news.status === "published" ? "Published" : news.status === "pending_tag" ? "Needs Tags" : news.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>
                    {news.fetchedVia === "api" ? "API" : news.fetchedVia === "rss" ? "RSS" : "Manual"}
                  </span>
                  {news.categories.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>{c}</span>
                  ))}
                </div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{news.title}</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 6 }}>{news.summary}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Globe className="w-3 h-3" /> {news.source}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Calendar className="w-3 h-3" /> {news.date}
                  </span>
                  <div className="flex gap-1">
                    {news.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ background: `${TAG_COLORS[t] || "#6b7280"}15`, color: TAG_COLORS[t] || "#6b7280" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {news.status === "pending_tag" && (
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}>
                    <Tag className="w-3 h-3 inline mr-1" /> Assign Tags
                  </button>
                )}
                <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                ><ExternalLink className="w-3.5 h-3.5" /></button>
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
        ))}
      </div>

      {/* Add News Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>Add News Article</h3>
            <div className="space-y-4">
              {["Title", "Source", "Source URL", "Date", "Summary"].map((field) => (
                <div key={field}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{field}</label>
                  {field === "Summary" ? (
                    <textarea className="w-full px-3 py-2.5 rounded-xl text-sm" rows={3} placeholder={field} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", resize: "vertical" }} />
                  ) : (
                    <input className="w-full px-3 py-2.5 rounded-xl text-sm" placeholder={field} type={field === "Date" ? "date" : "text"} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
                  )}
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Tags</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(TAG_COLORS).map(([tag, color]) => (
                    <label key={tag} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-xs font-medium" style={{ color }}>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Categories</label>
                <div className="flex flex-wrap gap-2">
                  {["Building Envelope", "Structural Systems", "MEP Systems", "Interior Finishes", "Wet Areas & Plumbing", "Insulation & Protection", "Furniture & Fittings", "Ceiling & Partition", "Outdoor & Landscape", "Safety & Security", "Specialty Materials"].map((cat) => (
                    <label key={cat} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Publish Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
