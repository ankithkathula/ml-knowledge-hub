import { useState } from "react";
import {
  Package, Clock, Truck, CheckCircle, Search, Filter,
  ChevronDown, Eye, RotateCcw, BarChart3, ArrowRight
} from "lucide-react";

const stats = [
  { label: "Total Requests", value: "1,842", icon: Package, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  { label: "Pending", value: "124", icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  { label: "In Transit", value: "86", icon: Truck, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
  { label: "Fulfilled", value: "1,580", icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
];

const returnRate = 12;

type SampleStatus = "Pending" | "Approved" | "Shipped" | "In Transit" | "Delivered" | "Returned";
type RequesterType = "Architect" | "Studio" | "Engineer" | "Student";

interface MockSample {
  id: number;
  requester: string;
  requesterType: RequesterType;
  product: string;
  brand: string;
  status: SampleStatus;
  requestDate: string;
  shipDate: string | null;
  deliveryDate: string | null;
  tracking: string | null;
}

const mockSamples: MockSample[] = [
  { id: 1, requester: "Arjun Mehta", requesterType: "Architect", product: "Italian Marble Tile 600x600", brand: "StoneCraft India", status: "Delivered", requestDate: "2026-03-15", shipDate: "2026-03-17", deliveryDate: "2026-03-20", tracking: "SC20260317001" },
  { id: 2, requester: "DesignCraft Studios", requesterType: "Studio", product: "Engineered Wood Flooring", brand: "WoodMaster", status: "In Transit", requestDate: "2026-03-22", shipDate: "2026-03-24", deliveryDate: null, tracking: "WM20260324002" },
  { id: 3, requester: "Priya Sharma", requesterType: "Student", product: "Acoustic Panel Set", brand: "SoundScape", status: "Pending", requestDate: "2026-03-28", shipDate: null, deliveryDate: null, tracking: null },
  { id: 4, requester: "BuildRight Engineering", requesterType: "Studio", product: "High-Strength TMT Bar Sample", brand: "TATA Tiscon", status: "Approved", requestDate: "2026-03-25", shipDate: null, deliveryDate: null, tracking: null },
  { id: 5, requester: "Vikram Rao", requesterType: "Engineer", product: "Waterproofing Membrane", brand: "Dr. Fixit", status: "Delivered", requestDate: "2026-03-10", shipDate: "2026-03-12", deliveryDate: "2026-03-15", tracking: "DF20260312005" },
  { id: 6, requester: "SpaceForm Architects", requesterType: "Studio", product: "Decorative Veneer Samples", brand: "Century Laminates", status: "Shipped", requestDate: "2026-03-26", shipDate: "2026-03-28", deliveryDate: null, tracking: "CL20260328006" },
  { id: 7, requester: "Karan Singh", requesterType: "Architect", product: "Glass Facade Panel", brand: "Saint-Gobain", status: "Pending", requestDate: "2026-03-30", shipDate: null, deliveryDate: null, tracking: null },
  { id: 8, requester: "EcoDesign Partners", requesterType: "Studio", product: "Bamboo Composite Board", brand: "EpicGreen", status: "In Transit", requestDate: "2026-03-20", shipDate: "2026-03-22", deliveryDate: null, tracking: "EG20260322008" },
  { id: 9, requester: "Ananya Iyer", requesterType: "Engineer", product: "CPVC Pipe Fitting Kit", brand: "Ashirvad Pipes", status: "Delivered", requestDate: "2026-03-08", shipDate: "2026-03-10", deliveryDate: "2026-03-13", tracking: "AP20260310009" },
  { id: 10, requester: "Meera Nair", requesterType: "Student", product: "Clay Roof Tile Samples", brand: "Wienerberger", status: "Returned", requestDate: "2026-03-05", shipDate: "2026-03-07", deliveryDate: "2026-03-10", tracking: "WB20260307010" },
  { id: 11, requester: "NexGen Constructions", requesterType: "Studio", product: "Porcelain Floor Tile Set", brand: "Kajaria", status: "Shipped", requestDate: "2026-03-27", shipDate: "2026-03-29", deliveryDate: null, tracking: "KJ20260329011" },
  { id: 12, requester: "Rahul Gupta", requesterType: "Student", product: "Insulation Material Kit", brand: "Rockwool", status: "Pending", requestDate: "2026-03-31", shipDate: null, deliveryDate: null, tracking: null },
];

const statusColors: Record<SampleStatus, { color: string; bg: string }> = {
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Approved: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  Shipped: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  "In Transit": { color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  Delivered: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Returned: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

const pipelineStages: { label: string; status: SampleStatus; color: string }[] = [
  { label: "Pending", status: "Pending", color: "#f59e0b" },
  { label: "Approved", status: "Approved", color: "#3b82f6" },
  { label: "Shipped", status: "Shipped", color: "#8b5cf6" },
  { label: "In Transit", status: "In Transit", color: "#a855f7" },
  { label: "Delivered", status: "Delivered", color: "#10b981" },
  { label: "Returned", status: "Returned", color: "#ef4444" },
];

export function AdminSamplesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SampleStatus | "All">("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [requesterTypeFilter, setRequesterTypeFilter] = useState<RequesterType | "All">("All");

  const brands = [...new Set(mockSamples.map((s) => s.brand))];

  const filtered = mockSamples.filter((s) => {
    if (statusFilter !== "All" && s.status !== statusFilter) return false;
    if (brandFilter !== "All" && s.brand !== brandFilter) return false;
    if (requesterTypeFilter !== "All" && s.requesterType !== requesterTypeFilter) return false;
    if (search && !s.requester.toLowerCase().includes(search.toLowerCase()) && !s.product.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pipelineCounts = pipelineStages.map((stage) => ({
    ...stage,
    count: mockSamples.filter((s) => s.status === stage.status).length,
  }));
  const maxCount = Math.max(...pipelineCounts.map((p) => p.count));

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Samples Management</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Track all sample requests across the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
              <RotateCcw size={20} style={{ color: "#ef4444" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Return Rate</p>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{returnRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} style={{ color: "var(--accent)" }} />
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Status Pipeline</h3>
        </div>
        <div className="space-y-3">
          {pipelineCounts.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-3">
              <span className="w-20 text-right shrink-0" style={{ fontSize: "0.8rem", fontWeight: 600, color: stage.color }}>{stage.label}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-full rounded-lg flex items-center px-3 transition-all" style={{ width: `${(stage.count / maxCount) * 100}%`, background: stage.color, minWidth: stage.count > 0 ? 30 : 0 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{stage.count}</span>
                </div>
              </div>
              {i < pipelineCounts.length - 1 && <ArrowRight size={14} style={{ color: "var(--text-muted)" }} className="shrink-0 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-9" placeholder="Search requester or product..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as SampleStatus | "All")}>
              <option value="All">All Status</option>
              {pipelineStages.map((s) => <option key={s.status} value={s.status}>{s.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
          <div className="relative">
            <Package size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="All">All Brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={requesterTypeFilter} onChange={(e) => setRequesterTypeFilter(e.target.value as RequesterType | "All")}>
              <option value="All">All Requesters</option>
              <option value="Architect">Architect</option>
              <option value="Studio">Studio</option>
              <option value="Engineer">Engineer</option>
              <option value="Student">Student</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
        </div>
      </div>

      {/* Samples Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Requester", "Type", "Product", "Brand", "Status", "Requested", "Tracking", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.requester}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{s.requesterType}</span></td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)", maxWidth: 200 }}><span className="line-clamp-1">{s.product}</span></td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{s.brand}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusColors[s.status].bg, color: statusColors[s.status].color }}>{s.status}</span></td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{new Date(s.requestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace" }}>{s.tracking || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {s.status === "Pending" && <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Approve"><CheckCircle size={15} style={{ color: "#10b981" }} /></button>}
                      {s.status === "Approved" && <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Ship"><Truck size={15} style={{ color: "#8b5cf6" }} /></button>}
                      {(s.status === "Shipped" || s.status === "In Transit") && <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Mark Delivered"><CheckCircle size={15} style={{ color: "#10b981" }} /></button>}
                      <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="View"><Eye size={15} style={{ color: "#3b82f6" }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No samples found matching your criteria.</div>}
      </div>
    </div>
  );
}
