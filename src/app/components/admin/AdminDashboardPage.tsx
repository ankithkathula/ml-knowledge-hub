import {
  Eye, Users, Package, Building2, FileText, Newspaper,
  TrendingUp, Upload, AlertCircle, CheckCircle, Clock,
  ArrowUpRight, Network, BarChart3, PenTool
} from "lucide-react";
import { Link } from "react-router";

const stats = [
  { label: "Total Categories", value: "60,294", change: "+124", icon: Network, color: "#2a9d8f", bg: "rgba(42,157,143,0.1)", border: "rgba(42,157,143,0.2)" },
  { label: "Products Listed", value: "52,480", change: "+1,250", icon: Package, color: "#ff6a3d", bg: "rgba(255,106,61,0.1)", border: "rgba(255,106,61,0.2)" },
  { label: "Verified Brands", value: "6,240", change: "+85", icon: Building2, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  { label: "Blog Articles", value: "1,850", change: "+32", icon: FileText, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
  { label: "News Articles", value: "4,620", change: "+180", icon: Newspaper, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  { label: "Consultants", value: "342", change: "+18", icon: Users, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  { label: "Monthly Views", value: "2.8M", change: "+18%", icon: Eye, color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.2)" },
  { label: "Data Completeness", value: "78%", change: "+5%", icon: BarChart3, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)" },
];

const quickActions = [
  { label: "Bulk Import Data", href: "/admin/bulk-import", icon: Upload, color: "#ff6a3d" },
  { label: "Add New Brand", href: "/admin/brands", icon: Building2, color: "#3b82f6" },
  { label: "Review Content", href: "/admin/content", icon: FileText, color: "#a855f7" },
  { label: "Manage Taxonomy", href: "/admin/taxonomy", icon: Network, color: "#2a9d8f" },
  { label: "Add Consultant", href: "/admin/consultants", icon: Users, color: "#10b981" },
  { label: "Update Market Data", href: "/admin/market-data", icon: BarChart3, color: "#f59e0b" },
];

const pendingItems = [
  { type: "Blog", title: "Sustainable Concrete Innovations 2026", author: "Dr. Rajesh Kumar", status: "pending_review", time: "2h ago" },
  { type: "Blog", title: "Smart Glass Technology in Modern Buildings", author: "Priya Sharma", status: "pending_review", time: "4h ago" },
  { type: "Brand", title: "GreenBuild Materials Pvt Ltd", action: "New brand registration", status: "pending_approval", time: "6h ago" },
  { type: "News", title: "New BIS Standards for Steel Reinforcement", source: "Construction Week", status: "pending_tag", time: "1h ago" },
  { type: "Contributor", title: "Amit Patel requested contributor access", action: "Expert in MEP Systems", status: "pending_approval", time: "3h ago" },
];

const recentImports = [
  { name: "L3_categories_batch_march.csv", records: 245, status: "completed", time: "Today, 10:30 AM" },
  { name: "brands_west_india.xlsx", records: 128, status: "completed", time: "Today, 9:15 AM" },
  { name: "products_mep_systems.csv", records: 1840, status: "processing", time: "Today, 8:00 AM" },
  { name: "consultant_profiles.csv", records: 45, status: "failed", time: "Yesterday, 4:30 PM" },
];

const layerBreakdown = [
  { layer: "L1", label: "Root Categories", count: 11, color: "#2a9d8f" },
  { layer: "L2", label: "Subcategories", count: 41, color: "#3b82f6" },
  { layer: "L3", label: "Product Groups", count: 195, color: "#a855f7" },
  { layer: "L4", label: "Product Types", count: 6330, color: "#f59e0b" },
  { layer: "L5", label: "Specifications", count: 53717, color: "#ff6a3d" },
  { layer: "L6", label: "Products", count: 2000000, color: "#ec4899" },
];

function formatNumber(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K";
  return n.toString();
}

export function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Data Ingestion Dashboard
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
          Manage taxonomy, products, brands, content, and market data across all layers
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: s.color, width: 18, height: 18 }} />
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#10b981" }}
                >
                  {s.change}
                </span>
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.label}
                    to={a.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all text-center group"
                    style={{ background: "rgba(0,0,0,0.02)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${a.color}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${a.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)";
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${a.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: a.color }} />
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{a.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Layer Breakdown */}
          <div className="rounded-2xl p-5 mt-4" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Taxonomy Layers
            </h3>
            <div className="space-y-3">
              {layerBreakdown.map((l) => (
                <div key={l.layer} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: l.color }}
                  >
                    {l.layer}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{l.label}</div>
                    <div className="w-full h-1.5 rounded-full mt-1" style={{ background: "rgba(0,0,0,0.05)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          background: l.color,
                          width: `${Math.min((Math.log10(l.count + 1) / Math.log10(2000001)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: l.color, minWidth: 48, textAlign: "right" }}>
                    {formatNumber(l.count)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Pending Reviews
              </h3>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}
              >
                {pendingItems.length} pending
              </span>
            </div>
            <div className="space-y-2">
              {pendingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <div className="flex-shrink-0">
                    {item.status === "pending_review" && <AlertCircle className="w-4 h-4" style={{ color: "#f59e0b" }} />}
                    {item.status === "pending_approval" && <Clock className="w-4 h-4" style={{ color: "#3b82f6" }} />}
                    {item.status === "pending_tag" && <Newspaper className="w-4 h-4" style={{ color: "#a855f7" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded font-semibold"
                        style={{
                          background: item.type === "Blog" ? "rgba(168,85,247,0.1)" : item.type === "Brand" ? "rgba(59,130,246,0.1)" : item.type === "News" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
                          color: item.type === "Blog" ? "#a855f7" : item.type === "Brand" ? "#3b82f6" : item.type === "News" ? "#f59e0b" : "#10b981",
                        }}
                      >
                        {item.type}
                      </span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                        {item.title}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {item.author && `by ${item.author}`}
                      {item.source && `Source: ${item.source}`}
                      {item.action && item.action}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{item.time}</span>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.2)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)")}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Imports */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recent Imports
              </h3>
              <Link
                to="/admin/bulk-import"
                className="flex items-center gap-1 text-xs font-semibold transition-all"
                style={{ color: "#ff6a3d" }}
              >
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentImports.map((imp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                >
                  <Upload className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                      {imp.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      {imp.records.toLocaleString()} records &middot; {imp.time}
                    </div>
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: imp.status === "completed" ? "rgba(34,197,94,0.1)" : imp.status === "processing" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)",
                      color: imp.status === "completed" ? "#10b981" : imp.status === "processing" ? "#3b82f6" : "#ef4444",
                    }}
                  >
                    {imp.status === "completed" && <CheckCircle className="w-3 h-3" />}
                    {imp.status === "processing" && <Clock className="w-3 h-3" />}
                    {imp.status === "failed" && <AlertCircle className="w-3 h-3" />}
                    {imp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
