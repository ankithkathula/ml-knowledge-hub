import { useState } from "react";
import { Plus, Eye, MousePointer, TrendingUp, Pause, Play, Trash2, BarChart3, Monitor, Smartphone, Layout } from "lucide-react";

type AdStatus = "active" | "paused" | "scheduled" | "ended";
type AdPlacement = "homepage-hero" | "product-sidebar" | "search-results" | "category-banner" | "mobile-interstitial";

interface AdCampaign {
  id: number;
  name: string;
  brand: string;
  placement: AdPlacement;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  status: AdStatus;
}

const CAMPAIGNS: AdCampaign[] = [
  { id: 1,  name: "UltraTech Cement Brand Awareness",  brand: "UltraTech Cement",    placement: "homepage-hero",          budget: 120000, spent: 68400,  impressions: 284000, clicks: 4820, startDate: "2026-05-01", endDate: "2026-05-31", status: "active" },
  { id: 2,  name: "Kajaria New Collection Launch",      brand: "Kajaria Ceramics",    placement: "category-banner",        budget: 80000,  spent: 44200,  impressions: 192000, clicks: 3140, startDate: "2026-05-10", endDate: "2026-06-10", status: "active" },
  { id: 3,  name: "Asian Paints Monsoon Promo",         brand: "Asian Paints",        placement: "product-sidebar",        budget: 60000,  spent: 60000,  impressions: 142000, clicks: 2180, startDate: "2026-04-01", endDate: "2026-04-30", status: "ended" },
  { id: 4,  name: "Jaquar Bathroom Solutions",          brand: "Jaquar Group",        placement: "search-results",         budget: 45000,  spent: 18200,  impressions: 84000,  clicks: 1640, startDate: "2026-05-15", endDate: "2026-06-15", status: "active" },
  { id: 5,  name: "Hindware Smart Faucets",             brand: "Hindware Innovation", placement: "mobile-interstitial",    budget: 35000,  spent: 0,      impressions: 0,      clicks: 0,    startDate: "2026-06-01", endDate: "2026-06-30", status: "scheduled" },
  { id: 6,  name: "Greenply Plywood Awareness",         brand: "Greenply Industries", placement: "product-sidebar",        budget: 25000,  spent: 12400,  impressions: 62000,  clicks: 840,  startDate: "2026-05-08", endDate: "2026-05-22", status: "paused" },
];

const PLACEMENTS: { id: AdPlacement; label: string; icon: React.ElementType; slots: number; rate: string }[] = [
  { id: "homepage-hero",         label: "Homepage Hero",       icon: Monitor,     slots: 2,  rate: "₹4,000/day" },
  { id: "category-banner",       label: "Category Banner",     icon: Layout,      slots: 8,  rate: "₹1,200/day" },
  { id: "search-results",        label: "Search Results",      icon: BarChart3,   slots: 5,  rate: "₹1,800/day" },
  { id: "product-sidebar",       label: "Product Sidebar",     icon: Layout,      slots: 10, rate: "₹800/day" },
  { id: "mobile-interstitial",   label: "Mobile Interstitial", icon: Smartphone,  slots: 3,  rate: "₹2,200/day" },
];

const STATUS_STYLE: Record<AdStatus, { bg: string; color: string; label: string }> = {
  active:    { bg: "rgba(34,197,94,0.1)",  color: "#16a34a", label: "Active" },
  paused:    { bg: "rgba(234,179,8,0.1)",  color: "#ca8a04", label: "Paused" },
  scheduled: { bg: "rgba(59,130,246,0.1)", color: "#1d4ed8", label: "Scheduled" },
  ended:     { bg: "rgba(148,163,184,0.1)",color: "#64748b", label: "Ended" },
};

export function AdminAdsPage() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(CAMPAIGNS);
  const [tab, setTab] = useState<"campaigns" | "placements">("campaigns");

  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpent  = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalImpr   = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const ctr = totalImpr > 0 ? ((totalClicks / totalImpr) * 100).toFixed(2) : "0.00";

  const toggle = (id: number) =>
    setCampaigns((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c)
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Advertisement Management</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Manage ad campaigns, placements, and performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Budget",   val: `₹${(totalBudget / 1000).toFixed(0)}K`,    icon: TrendingUp,    color: "#ff6a3d" },
          { label: "Total Spent",    val: `₹${(totalSpent / 1000).toFixed(0)}K`,     icon: BarChart3,     color: "#8b5cf6" },
          { label: "Impressions",    val: `${(totalImpr / 1000).toFixed(0)}K`,       icon: Eye,           color: "#3b82f6" },
          { label: "Avg CTR",        val: `${ctr}%`,                                 icon: MousePointer,  color: "#22c55e" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: s.color + "14" }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.val}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background: "rgba(0,0,0,0.04)", width: "fit-content" }}>
        {(["campaigns", "placements"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all"
            style={{
              background: tab === t ? "white" : "transparent",
              color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t === "campaigns" ? "Campaigns" : "Ad Slots"}
          </button>
        ))}
      </div>

      {tab === "campaigns" ? (
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Campaign", "Brand", "Placement", "Budget / Spent", "Impr.", "CTR", "Period", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => {
                const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : "—";
                const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
                const { bg, color, label } = STATUS_STYLE[c.status];
                return (
                  <tr key={c.id} style={{ borderBottom: i < campaigns.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                    <td className="px-4 py-3.5" style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--text-primary)", maxWidth: 180 }}>
                      <p className="truncate">{c.name}</p>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{c.brand}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.placement.replace(/-/g, " ")}</td>
                    <td className="px-4 py-3.5">
                      <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>₹{(c.budget / 1000).toFixed(0)}K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="h-1 rounded-full flex-1" style={{ background: "rgba(0,0,0,0.06)", maxWidth: 60 }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : "#ff6a3d" }} />
                        </div>
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{c.impressions > 0 ? `${(c.impressions / 1000).toFixed(0)}K` : "—"}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{ctr === "—" ? "—" : `${ctr}%`}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{c.startDate}<br />{c.endDate}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: bg, color }}>{label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        {c.status !== "ended" && c.status !== "scheduled" && (
                          <button onClick={() => toggle(c.id)} className="p-1.5 rounded-lg transition-colors hover:bg-gray-50">
                            {c.status === "active" ? <Pause className="w-3.5 h-3.5" style={{ color: "#ca8a04" }} /> : <Play className="w-3.5 h-3.5" style={{ color: "#16a34a" }} />}
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg transition-colors hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLACEMENTS.map((p) => {
            const Icon = p.icon;
            const activeCamps = campaigns.filter((c) => c.placement === p.id && c.status === "active").length;
            const occupancy = Math.round((activeCamps / p.slots) * 100);
            return (
              <div key={p.id} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,106,61,0.08)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#ff6a3d" }} />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: occupancy >= 100 ? "rgba(239,68,68,0.1)" : occupancy >= 60 ? "rgba(234,179,8,0.1)" : "rgba(34,197,94,0.1)", color: occupancy >= 100 ? "#dc2626" : occupancy >= 60 ? "#ca8a04" : "#16a34a" }}>
                    {occupancy >= 100 ? "Full" : `${100 - occupancy}% free`}
                  </span>
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>{p.label}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{p.rate} · {p.slots} slots total</p>
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Occupancy</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-secondary)" }}>{activeCamps}/{p.slots}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(occupancy, 100)}%`, background: occupancy >= 100 ? "#ef4444" : "#ff6a3d" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
