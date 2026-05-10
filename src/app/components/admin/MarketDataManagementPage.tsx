import { useState } from "react";
import {
  BarChart3, Search, Plus, Upload, Download, Edit3, Trash2,
  TrendingUp, TrendingDown, Globe, MapPin, IndianRupee,
  Calendar, Tag, Eye, RefreshCw, Filter
} from "lucide-react";

interface MarketDataEntry {
  id: string;
  metric: string;
  value: string;
  unit: string;
  category: string;
  region: string;
  year: string;
  source: string;
  trend: "up" | "down" | "stable";
  changePercent: string;
  lastUpdated: string;
}

const MOCK_MARKET_DATA: MarketDataEntry[] = [
  { id: "m1", metric: "Market Size (India)", value: "45,000", unit: "₹ Cr", category: "Structural Systems", region: "National", year: "2025-26", source: "IBEF", trend: "up", changePercent: "+12%", lastUpdated: "2026-03-25" },
  { id: "m2", metric: "Cement Production", value: "380", unit: "M tonnes/yr", category: "Structural Systems", region: "National", year: "2025-26", source: "CMA India", trend: "up", changePercent: "+8.5%", lastUpdated: "2026-03-20" },
  { id: "m3", metric: "RMC Market Growth (CAGR)", value: "10.2", unit: "%", category: "Structural Systems", region: "National", year: "2025-30", source: "Markets & Markets", trend: "up", changePercent: "+1.2%", lastUpdated: "2026-03-15" },
  { id: "m4", metric: "Smart Home Market", value: "8,200", unit: "₹ Cr", category: "MEP Systems", region: "National", year: "2025-26", source: "NASSCOM", trend: "up", changePercent: "+45%", lastUpdated: "2026-03-22" },
  { id: "m5", metric: "LED Market Size", value: "12,500", unit: "₹ Cr", category: "MEP Systems", region: "National", year: "2025-26", source: "ELCOMA", trend: "up", changePercent: "+18%", lastUpdated: "2026-03-18" },
  { id: "m6", metric: "Tiles Market Size", value: "52,000", unit: "₹ Cr", category: "Interior Finishes", region: "National", year: "2025-26", source: "CREDAI", trend: "up", changePercent: "+14%", lastUpdated: "2026-03-10" },
  { id: "m7", metric: "Facade Market Size", value: "18,500", unit: "₹ Cr", category: "Building Envelope", region: "National", year: "2025-26", source: "Grand View Research", trend: "up", changePercent: "+22%", lastUpdated: "2026-03-12" },
  { id: "m8", metric: "Fire Safety Equipment", value: "4,800", unit: "₹ Cr", category: "Safety & Security", region: "National", year: "2025-26", source: "FICCI", trend: "up", changePercent: "+16%", lastUpdated: "2026-03-08" },
  { id: "m9", metric: "Avg. Concrete Price (M25)", value: "5,200", unit: "₹/cu.m", category: "Structural Systems", region: "North India", year: "2026 Q1", source: "Industry Survey", trend: "up", changePercent: "+6%", lastUpdated: "2026-03-28" },
  { id: "m10", metric: "Steel Price (TMT)", value: "52,000", unit: "₹/tonne", category: "Structural Systems", region: "National", year: "2026 Q1", source: "Metal Bulletin", trend: "down", changePercent: "-3%", lastUpdated: "2026-03-27" },
  { id: "m11", metric: "Modular Kitchen Market", value: "6,500", unit: "₹ Cr", category: "Furniture & Fittings", region: "National", year: "2025-26", source: "RedSeer", trend: "up", changePercent: "+25%", lastUpdated: "2026-03-14" },
  { id: "m12", metric: "Waterproofing Market", value: "7,800", unit: "₹ Cr", category: "Wet Areas & Plumbing", region: "National", year: "2025-26", source: "Frost & Sullivan", trend: "up", changePercent: "+11%", lastUpdated: "2026-03-06" },
];

const REGIONS = ["National", "North India", "South India", "West India", "East India"];
const CATEGORIES = ["Structural Systems", "MEP Systems", "Interior Finishes", "Building Envelope", "Safety & Security", "Furniture & Fittings", "Wet Areas & Plumbing", "Insulation & Protection", "Ceiling & Partition", "Outdoor & Landscape", "Specialty Materials"];

export function MarketDataManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const filtered = MOCK_MARKET_DATA.filter((d) => {
    const matchSearch = d.metric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === "all" || d.category === filterCategory;
    const matchRegion = filterRegion === "all" || d.region === filterRegion;
    return matchSearch && matchCategory && matchRegion;
  });

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Market Data Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage market metrics, statistics, pricing, and regional data per category
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }} onClick={() => setShowImportModal(true)}>
            <Upload className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: "#ff6a3d" }} onClick={() => setShowAddModal(true)}>
            <Plus className="w-3.5 h-3.5" /> Add Metric
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Metrics", value: "2,840", icon: BarChart3, color: "#3b82f6" },
          { label: "Categories Covered", value: "11/11", icon: Tag, color: "#10b981" },
          { label: "Data Sources", value: "28", icon: Globe, color: "#a855f7" },
          { label: "Last Updated", value: "2h ago", icon: RefreshCw, color: "#f59e0b" },
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input placeholder="Search metrics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Regions</option>
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Metric", "Value", "Category", "Region", "Period", "Trend", "Source", "Updated", "Actions"].map((h) => (
                  <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} px-4 py-3`} style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="transition-all"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{d.metric}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      {d.value} <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--text-muted)" }}>{d.unit}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>{d.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <MapPin className="w-3 h-3" /> {d.region}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{d.year}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: d.trend === "up" ? "#10b981" : d.trend === "down" ? "#ef4444" : "var(--text-muted)" }}>
                      {d.trend === "up" ? <TrendingUp className="w-3 h-3" /> : d.trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
                      {d.changePercent}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{d.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{d.lastUpdated}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      ><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      ><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>Add Market Metric</h3>
            <div className="space-y-4">
              {[
                { field: "Metric Name", type: "text" },
                { field: "Value", type: "text" },
                { field: "Unit", type: "text" },
                { field: "Category", type: "select", options: CATEGORIES },
                { field: "Region", type: "select", options: REGIONS },
                { field: "Period / Year", type: "text" },
                { field: "Source", type: "text" },
                { field: "Trend", type: "select", options: ["Up", "Down", "Stable"] },
                { field: "Change %", type: "text" },
              ].map((f) => (
                <div key={f.field}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{f.field}</label>
                  {f.type === "select" ? (
                    <select className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}>
                      <option>Select...</option>
                      {f.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input className="w-full px-3 py-2.5 rounded-xl text-sm" placeholder={f.field} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Add Metric</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Bulk Import Market Data</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>Upload market metrics with category and region mappings</p>
            <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>Required Columns:</div>
              <div className="flex flex-wrap gap-1">
                {["Metric", "Value", "Unit", "Category", "Region", "Period", "Source", "Trend", "Change %"].map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{f}</span>
                ))}
              </div>
            </div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Drop CSV/XLSX file here</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button className="text-xs font-semibold" style={{ color: "#ff6a3d" }}><Download className="w-3.5 h-3.5 inline mr-1" />Download Template</button>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowImportModal(false)}>Cancel</button>
                <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Upload & Import</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
