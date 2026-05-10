import { useState } from "react";
import {
  PenTool, Search, Plus, Eye, Edit3, CheckCircle, Clock,
  XCircle, Star, FileText, MessageSquare, Award, TrendingUp,
  Users, BookOpen, Tag, Calendar, ArrowUpRight, Shield,
  ThumbsUp, ThumbsDown, Mail
} from "lucide-react";
import { Link } from "react-router";

interface Contributor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "contributor" | "expert" | "editor";
  specializations: string[];
  articlesSubmitted: number;
  articlesPublished: number;
  totalViews: number;
  rating: number;
  joinedDate: string;
  status: "active" | "pending_approval" | "suspended";
  lastActive: string;
}

interface ContributorArticle {
  id: string;
  title: string;
  contributor: string;
  category: string;
  status: "published" | "pending" | "draft" | "rejected";
  submittedDate: string;
  views: number;
  likes: number;
}

const MOCK_CONTRIBUTORS: Contributor[] = [
  { id: "u1", name: "Dr. Rajesh Kumar", email: "rajesh.k@example.com", avatar: "RK", role: "expert", specializations: ["Concrete Technology", "Structural Design"], articlesSubmitted: 28, articlesPublished: 24, totalViews: 45200, rating: 4.9, joinedDate: "2025-06-15", status: "active", lastActive: "2h ago" },
  { id: "u2", name: "Priya Sharma", email: "priya.s@example.com", avatar: "PS", role: "contributor", specializations: ["HVAC", "Smart Buildings"], articlesSubmitted: 15, articlesPublished: 11, totalViews: 18900, rating: 4.7, joinedDate: "2025-09-20", status: "active", lastActive: "5h ago" },
  { id: "u3", name: "Amit Patel", email: "amit.p@example.com", avatar: "AP", role: "expert", specializations: ["Facade Engineering", "Building Envelope"], articlesSubmitted: 22, articlesPublished: 19, totalViews: 32100, rating: 4.8, joinedDate: "2025-07-01", status: "active", lastActive: "1d ago" },
  { id: "u4", name: "Neha Singh", email: "neha.s@example.com", avatar: "NS", role: "contributor", specializations: ["Interior Design", "Flooring"], articlesSubmitted: 12, articlesPublished: 8, totalViews: 14500, rating: 4.5, joinedDate: "2025-11-10", status: "active", lastActive: "3h ago" },
  { id: "u5", name: "Vikram Das", email: "vikram.d@example.com", avatar: "VD", role: "contributor", specializations: ["Waterproofing", "Plumbing"], articlesSubmitted: 8, articlesPublished: 5, totalViews: 6200, rating: 4.3, joinedDate: "2026-01-15", status: "active", lastActive: "2d ago" },
  { id: "u6", name: "Sandeep Mehra", email: "sandeep.m@example.com", avatar: "SM", role: "contributor", specializations: ["Fire Safety", "MEP Systems"], articlesSubmitted: 0, articlesPublished: 0, totalViews: 0, rating: 0, joinedDate: "2026-03-28", status: "pending_approval", lastActive: "Just now" },
  { id: "u7", name: "Kavita Reddy", email: "kavita.r@example.com", avatar: "KR", role: "editor", specializations: ["Technical Writing", "Construction Materials"], articlesSubmitted: 35, articlesPublished: 32, totalViews: 68400, rating: 4.9, joinedDate: "2025-05-01", status: "active", lastActive: "30m ago" },
];

const RECENT_SUBMISSIONS: ContributorArticle[] = [
  { id: "a1", title: "Smart Glass Technology in Modern Buildings", contributor: "Priya Sharma", category: "Building Envelope", status: "pending", submittedDate: "2026-03-28", views: 0, likes: 0 },
  { id: "a2", title: "Luxury Flooring Trends for Premium Projects", contributor: "Neha Singh", category: "Interior Finishes", status: "pending", submittedDate: "2026-03-26", views: 0, likes: 0 },
  { id: "a3", title: "Sustainable Concrete Innovations 2026", contributor: "Dr. Rajesh Kumar", category: "Structural Systems", status: "published", submittedDate: "2026-03-10", views: 4520, likes: 89 },
  { id: "a4", title: "HVAC Systems: VRF vs Chilled Water", contributor: "Amit Patel", category: "MEP Systems", status: "published", submittedDate: "2026-03-05", views: 3210, likes: 56 },
  { id: "a5", title: "Waterproofing Best Practices for Basements", contributor: "Vikram Das", category: "Wet Areas & Plumbing", status: "draft", submittedDate: "2026-03-20", views: 0, likes: 0 },
];

export function ContributorConsolePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "contributors" | "submissions" | "guidelines">("overview");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredContributors = MOCK_CONTRIBUTORS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchRole = filterRole === "all" || c.role === filterRole;
    return matchSearch && matchRole;
  });

  const pendingApprovals = MOCK_CONTRIBUTORS.filter((c) => c.status === "pending_approval");
  const pendingArticles = RECENT_SUBMISSIONS.filter((a) => a.status === "pending");

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Contributor Console</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage contributors, review submissions, and oversee the content creation pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
            <Mail className="w-3.5 h-3.5" /> Invite Contributors
          </button>
          <Link to="/blog/create" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: "#ff6a3d" }}>
            <Plus className="w-3.5 h-3.5" /> New Article
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)" }}>
        {[
          { key: "overview" as const, label: "Overview" },
          { key: "contributors" as const, label: `Contributors (${MOCK_CONTRIBUTORS.length})` },
          { key: "submissions" as const, label: `Submissions (${pendingArticles.length} pending)` },
          { key: "guidelines" as const, label: "Guidelines" },
        ].map((tab) => (
          <button
            key={tab.key}
            className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: activeTab === tab.key ? "white" : "transparent", color: activeTab === tab.key ? "#ff6a3d" : "var(--text-muted)", boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Active Contributors", value: MOCK_CONTRIBUTORS.filter((c) => c.status === "active").length.toString(), icon: Users, color: "#3b82f6" },
              { label: "Pending Approvals", value: pendingApprovals.length.toString(), icon: Clock, color: "#f59e0b" },
              { label: "Articles Published", value: "1,540", icon: FileText, color: "#10b981" },
              { label: "Total Content Views", value: "284K", icon: Eye, color: "#a855f7" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pending Approvals */}
          {pendingApprovals.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                <Clock className="w-4 h-4 inline mr-2" style={{ color: "#f59e0b" }} />
                Pending Contributor Approvals
              </h3>
              {pendingApprovals.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.email} &middot; Applied {c.joinedDate}</div>
                    <div className="flex gap-1 mt-1">
                      {c.specializations.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#10b981" }}>
                      <ThumbsUp className="w-3 h-3" /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                      <ThumbsDown className="w-3 h-3" /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Top Contributors */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
              <Award className="w-4 h-4 inline mr-2" style={{ color: "#ff6a3d" }} />
              Top Contributors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOCK_CONTRIBUTORS.filter((c) => c.status === "active" && c.articlesPublished > 0).sort((a, b) => b.totalViews - a.totalViews).slice(0, 6).map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: i === 0 ? "linear-gradient(135deg, #f59e0b, #d97706)" : i === 1 ? "linear-gradient(135deg, #94a3b8, #64748b)" : i === 2 ? "linear-gradient(135deg, #cd7f32, #a0522d)" : "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                      {c.avatar}
                    </div>
                    {i < 3 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : "#cd7f32", fontSize: "0.55rem", fontWeight: 800 }}>
                        {i + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</span>
                      {c.role === "expert" && <Shield className="w-3 h-3" style={{ color: "#a855f7" }} />}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      {c.articlesPublished} articles &middot; {(c.totalViews / 1000).toFixed(1)}K views
                    </div>
                  </div>
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Contributors Tab */}
      {activeTab === "contributors" && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input placeholder="Search contributors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
            </div>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
              <option value="all">All Roles</option>
              <option value="contributor">Contributors</option>
              <option value="expert">Experts</option>
              <option value="editor">Editors</option>
            </select>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["Contributor", "Role", "Specializations", "Articles", "Views", "Rating", "Status", "Actions"].map((h) => (
                    <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} px-4 py-3`} style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredContributors.map((c) => (
                  <tr key={c.id} className="transition-all" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>{c.avatar}</div>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{
                        background: c.role === "expert" ? "rgba(168,85,247,0.1)" : c.role === "editor" ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.1)",
                        color: c.role === "expert" ? "#a855f7" : c.role === "editor" ? "#3b82f6" : "#10b981",
                      }}>{c.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {c.specializations.slice(0, 2).map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", fontSize: "0.65rem" }}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{c.articlesPublished}/{c.articlesSubmitted}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{c.totalViews > 0 ? `${(c.totalViews / 1000).toFixed(1)}K` : "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      {c.rating > 0 ? (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{c.rating}</span>
                        </span>
                      ) : <span style={{ color: "var(--text-muted)" }}>—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                        background: c.status === "active" ? "rgba(34,197,94,0.1)" : c.status === "pending_approval" ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.05)",
                        color: c.status === "active" ? "#10b981" : c.status === "pending_approval" ? "#f59e0b" : "var(--text-muted)",
                      }}>{c.status === "pending_approval" ? "pending" : c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {c.status === "pending_approval" && (
                          <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#10b981" }}>Approve</button>
                        )}
                        <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                        ><Edit3 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <div className="space-y-3">
          {RECENT_SUBMISSIONS.map((article) => (
            <div key={article.id} className="rounded-xl p-4 transition-all" style={{ background: "rgba(255,255,255,0.9)", border: article.status === "pending" ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{
                      background: article.status === "published" ? "rgba(34,197,94,0.1)" : article.status === "pending" ? "rgba(245,158,11,0.1)" : article.status === "draft" ? "rgba(0,0,0,0.05)" : "rgba(239,68,68,0.1)",
                      color: article.status === "published" ? "#10b981" : article.status === "pending" ? "#f59e0b" : article.status === "draft" ? "var(--text-muted)" : "#ef4444",
                    }}>{article.status}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{article.category}</span>
                  </div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{article.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>by {article.contributor}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{article.submittedDate}</span>
                    {article.views > 0 && <span className="text-xs" style={{ color: "var(--text-muted)" }}>{article.views.toLocaleString()} views</span>}
                  </div>
                </div>
                {article.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#10b981" }}>
                      <ThumbsUp className="w-3 h-3" /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                      <ThumbsDown className="w-3 h-3" /> Reject
                    </button>
                  </div>
                )}
                <button className="p-1.5 rounded-lg" style={{ color: "var(--text-muted)" }}><Eye className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guidelines Tab */}
      {activeTab === "guidelines" && (
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}>
            <BookOpen className="w-5 h-5 inline mr-2" style={{ color: "#ff6a3d" }} />
            Contributor Guidelines
          </h3>
          <div className="space-y-6">
            {[
              { title: "Content Requirements", items: ["Articles must be 800-3000 words", "Include at least 2 relevant images", "Cite sources for statistics and claims", "Content must be original and not published elsewhere", "Must be tied to at least one category in the taxonomy"] },
              { title: "Category Tagging", items: ["Every article must be tagged to the correct L1 category", "Additional L2-L5 tags help with discoverability", "Use relevant industry tags (Technology, Market, Standards, etc.)", "Cross-category articles should be tagged to all relevant categories"] },
              { title: "Review Process", items: ["Submitted articles enter 'Pending Review' queue", "Admin team reviews within 48 hours", "Feedback provided for revisions if needed", "Published articles appear on category pages and blog listing", "Contributors receive notifications on status changes"] },
              { title: "Expert Contributors", items: ["Verified experts can submit articles that fast-track review", "Expert badge displayed on published articles", "Experts can be tagged as consultants on category pages", "Expert status requires portfolio review and verification"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#10b981" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
