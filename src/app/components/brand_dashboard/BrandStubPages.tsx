import { useState } from "react";
import { Link } from "react-router";
import {
  Package, Eye, TrendingUp, Clock, Download, Upload, CheckCircle, AlertCircle,
  Building2, MapPin, Phone, Mail, Globe, Camera, Award, FileText, Plus, X,
  Pencil, Users, ExternalLink, Search,
} from "lucide-react";
import { BrandLeadPipeline } from "../brand/BrandLeadPipeline";
import { getBrandInventory, type InventoryProduct } from "../data/inventoryData";

const ACCENT = "#0284c7";

const PRODUCT_CATEGORIES = [
  "Cement & Concrete", "Ready Mix Concrete", "Wall Putty", "AAC Blocks",
  "Waterproofing", "Tile Adhesive", "Screeds & Levelling", "Structural Steel",
];

const HOT_LEADS = [
  { name: "Morphogenesis Architects", project: "Vitrified flooring for 320-unit township", value: "₹18.5L", lastContact: "May 10, 2026", type: "Hot" },
  { name: "Livspace Mumbai",          project: "Bulk tile + sanitaryware for 200 flats",    value: "₹12.2L", lastContact: "May 12, 2026", type: "Hot" },
];

const WARM_LEADS = [
  { name: "Studio Lotus",       project: "Large-format slabs for hotel lobby",      value: "₹6.4L", lastContact: "May 8, 2026",  type: "Warm" },
  { name: "Studio Sangam",      project: "Marbonite + wood-plank tiles for villa",  value: "₹3.0L", lastContact: "May 6, 2026",  type: "Warm" },
];

const COLD_LEADS = [
  { name: "Design Atelier",     project: "Eternity collection catalogue request",   value: "Exploring", lastContact: "May 2, 2026",  type: "Cold" },
  { name: "DesignCraft Studio", project: "Sample request — Marbonite series",       value: "Sampling",  lastContact: "Apr 28, 2026", type: "Cold" },
];

const CATALOGUES = [
  { name: "Product Catalogue 2026",       type: "PDF", size: "4.2 MB", updated: "Jan 2026" },
  { name: "Technical Specifications Sheet", type: "PDF", size: "1.8 MB", updated: "Mar 2026" },
  { name: "Application Guide",            type: "PDF", size: "2.6 MB", updated: "Feb 2026" },
];

function LeadRow({ lead, accent }: { lead: { name: string; project: string; value: string; lastContact: string; type: string }; accent: string }) {
  return (
    <div
      className="flex items-center gap-3 py-3"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
        style={{ background: accent }}
      >
        {lead.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">
          {lead.name}
        </div>
        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }} className="truncate">
          {lead.project}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: accent }}>{lead.value}</div>
        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{lead.lastContact}</div>
      </div>
      <button
        className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white flex-shrink-0"
        style={{ background: accent }}
      >
        Follow up
      </button>
    </div>
  );
}

export function BrandProductsPage() {
  const [products, setProducts] = useState<InventoryProduct[]>(() => getBrandInventory());
  const [filter, setFilter] = useState<"All" | "Active" | "Draft">("All");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", status: "Active" as "Active" | "Draft", description: "" });

  const filtered = products.filter(p => {
    if (filter !== "All" && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    total: products.length,
    active: products.filter(p => p.status === "Active").length,
    draft: products.filter(p => p.status === "Draft").length,
  };

  function toggleStatus(id: string) {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, status: p.status === "Active" ? "Draft" as const : "Active" as const } : p)
    );
  }

  function openEdit(product: InventoryProduct) {
    setEditingId(product.id);
    setForm({ name: product.name, category: product.category, status: product.status, description: product.description });
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingId(null);
    setForm({ name: "", category: "", status: "Active", description: "" });
  }

  function saveForm() {
    if (!form.name.trim()) return;
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...form } : p));
    } else {
      const base = getBrandInventory()[0];
      setProducts(prev => [{
        ...base,
        id: `custom-${Date.now()}`,
        name: form.name,
        category: form.category || "General",
        status: form.status,
        description: form.description || base.description,
        views: 0,
        enquiries: 0,
      }, ...prev]);
    }
    closeDrawer();
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Product Inventory</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Manage your product catalog and public listings.</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-2 rounded-xl text-[13px] font-bold text-white flex items-center gap-2"
          style={{ background: ACCENT }}
        >
          <Plus style={{ width: 14, height: 14 }} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total", value: counts.total, color: ACCENT, bg: "rgba(2,132,199,0.08)" },
          { label: "Active", value: counts.active, color: "#10b981", bg: "rgba(16,185,129,0.08)" },
          { label: "Draft", value: counts.draft, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: s.bg }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
          {(["All", "Active", "Draft"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 text-[12px] font-bold transition-all"
              style={{
                background: filter === f ? ACCENT : "white",
                color: filter === f ? "white" : "var(--text-muted)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.1)", background: "white", minWidth: 180 }}>
          <Search style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-[13px] outline-none bg-transparent"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
          >
            <div className="relative h-36 overflow-hidden" style={{ background: "rgba(0,0,0,0.04)" }}>
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              <span
                className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background: product.status === "Active" ? "rgba(16,185,129,0.85)" : "rgba(0,0,0,0.55)",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              >
                {product.status}
              </span>
            </div>
            <div className="p-4">
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }} className="mb-0.5 truncate">{product.name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }} className="mb-3">{product.category}</div>
              <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  <Eye style={{ width: 11, height: 11 }} /> {product.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  <TrendingUp style={{ width: 11, height: 11 }} /> {product.enquiries} enquiries
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/product/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                  style={{ background: "rgba(2,132,199,0.08)", color: ACCENT, border: "1px solid rgba(2,132,199,0.2)" }}
                >
                  <ExternalLink style={{ width: 11, height: 11 }} /> View on site
                </Link>
                <button
                  onClick={() => toggleStatus(product.id)}
                  title={product.status === "Active" ? "Set to Draft" : "Set to Active"}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: product.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                    color: product.status === "Active" ? "#10b981" : "#f59e0b",
                  }}
                >
                  <CheckCircle style={{ width: 15, height: 15 }} />
                </button>
                <button
                  onClick={() => openEdit(product)}
                  title="Edit"
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(2,132,199,0.08)", color: ACCENT }}
                >
                  <Pencil style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center gap-3" style={{ color: "var(--text-muted)" }}>
            <Package style={{ width: 32, height: 32 }} />
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>No products match your filter.</div>
          </div>
        )}
      </div>

      {/* Add Product Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={closeDrawer}
          />
          <div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: "white", boxShadow: "-4px 0 24px rgba(0,0,0,0.14)" }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>{editingId ? "Edit Product" : "Add Product"}</h2>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 6 }}>
                  Product Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Eternity Glazed Vitrified Tile"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 6 }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: form.category ? "var(--text-primary)" : "var(--text-muted)", background: "white" }}
                >
                  <option value="">Select category</option>
                  {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 6 }}>Status</label>
                <div className="flex gap-3">
                  {(["Active", "Draft"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setForm(f => ({ ...f, status: s }))}
                      className="flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all"
                      style={{
                        background: form.status === s
                          ? (s === "Active" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)")
                          : "white",
                        border: `1px solid ${form.status === s
                          ? (s === "Active" ? "#10b981" : "#f59e0b")
                          : "rgba(0,0,0,0.1)"}`,
                        color: form.status === s
                          ? (s === "Active" ? "#10b981" : "#f59e0b")
                          : "var(--text-muted)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 6 }}>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short product description..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-[13px] resize-none"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </div>
            </div>
            <div className="px-6 py-5 flex gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={closeDrawer}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold"
                style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={saveForm}
                disabled={!form.name.trim()}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all"
                style={{ background: form.name.trim() ? ACCENT : "rgba(0,0,0,0.2)" }}
              >
                {editingId ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function BrandLeadsPage() {
  return <BrandLeadPipeline />;
}

export function BrandAnalyticsPage() {
  const metrics = [
    { label: "Total Views",       value: "2,840", icon: Eye,        color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    { label: "Enquiries",         value: "138",   icon: TrendingUp, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    { label: "Conversion Rate",   value: "4.9%",  icon: CheckCircle, color: "#0284c7", bg: "rgba(2,132,199,0.1)" },
    { label: "Avg. Response Time", value: "3.2h", icon: Clock,      color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  ];

  const topProducts = [
    { name: "Eternity Glazed Vitrified Tile", views: 3120, pct: 100 },
    { name: "Marbonite Double Charge Tile",   views: 2540, pct: 81  },
    { name: "Vintage Wood-Plank Tile",        views: 1880, pct: 60  },
    { name: "Bathonix Sanitaryware Suite",    views: 1460, pct: 47  },
    { name: "Kerastar Anti-Skid Outdoor Tile",views: 1090, pct: 35  },
  ];

  const sources = [
    { label: "Designer Platform", pct: 62, color: "#0284c7" },
    { label: "KC Visits",         pct: 21, color: "#10b981" },
    { label: "Direct Search",     pct: 17, color: "#8b5cf6" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Analytics</h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Performance metrics for your brand on Material Library.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-2xl p-4"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                  <Icon style={{ width: 18, height: 18, color: m.color }} />
                </div>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{m.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-5"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Top Performing Products
          </h2>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.views}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.pct}%`, background: ACCENT }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Traffic Sources
          </h2>
          <div className="space-y-4">
            {sources.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.pct}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandCataloguePage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Catalogue</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Manage downloadable catalogues and technical documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATALOGUES.map((cat) => (
          <div
            key={cat.name}
            className="rounded-2xl p-5"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(2,132,199,0.1)" }}
            >
              <AlertCircle style={{ width: 22, height: 22, color: ACCENT }} />
            </div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }} className="mb-1">
              {cat.name}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }} className="mb-4">
              {cat.type} · {cat.size} · Updated {cat.updated}
            </div>
            <button
              className="w-full py-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2"
              style={{ background: "rgba(2,132,199,0.08)", color: ACCENT, border: `1px solid rgba(2,132,199,0.2)` }}
            >
              <Download style={{ width: 14, height: 14 }} />
              Download
            </button>
          </div>
        ))}

        <div
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-sky-300"
          style={{
            background: "rgba(2,132,199,0.02)",
            border: "2px dashed rgba(2,132,199,0.2)",
            minHeight: 200,
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(2,132,199,0.1)" }}
          >
            <Upload style={{ width: 22, height: 22, color: ACCENT }} />
          </div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: ACCENT }}>Upload New</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
            PDF, DOCX up to 20 MB
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{title}</h1>
      <div
        className="rounded-2xl p-12 flex flex-col items-center justify-center gap-3 mt-6"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(2,132,199,0.08)" }}
        >
          <Package style={{ width: 26, height: 26, color: ACCENT }} />
        </div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Coming soon</div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>This section is under development.</div>
      </div>
    </div>
  );
}

export function BrandKcVisitsPage() { return <ComingSoon title="KC Visits" />; }
export function BrandMessagesPage() { return <ComingSoon title="Messages" />; }
export function BrandSettingsPage() { return <ComingSoon title="Settings" />; }

// ── Brand Profile Management ──────────────────────────────────────────────────

const BRAND_SERVICES = [
  { id: 1, name: "Architectural Specification Support", price: "Free",    unit: "per project", active: true  },
  { id: 2, name: "Technical Consultation",              price: "₹5,000",  unit: "per session", active: true  },
  { id: 3, name: "Knowledge Center Demo",               price: "₹2,500",  unit: "per visit",   active: true  },
  { id: 4, name: "Site Sample Request",                 price: "Free",    unit: "per request", active: false },
];

const BRAND_DOCS = [
  { id: 1, name: "BIS Certification",          issuer: "Bureau of Indian Standards", expires: "Dec 2027", status: "Verified"  },
  { id: 2, name: "GreenPro Certification",     issuer: "CII-ITC Centre of Excellence", expires: "Jun 2026", status: "Verified" },
  { id: 3, name: "ISO 9001:2015",              issuer: "Quality Management Body",    expires: "Mar 2026", status: "Pending"   },
  { id: 4, name: "Trademark Registration",     issuer: "IP India",                   expires: "Nov 2025", status: "Expired"   },
];

const BRAND_LOCATIONS = ["Mumbai, Maharashtra", "Delhi NCR", "Pune, Maharashtra", "Bengaluru, Karnataka"];

const BRAND_MEMBERS = [
  { initials: "AM", name: "Arjun Mehta",    title: "Brand Manager"     },
  { initials: "PS", name: "Priya Sharma",   title: "Marketing Lead"    },
  { initials: "RK", name: "Rahul Krishnan", title: "Technical Expert"  },
  { initials: "SP", name: "Sneha Patel",    title: "Content Manager"   },
  { initials: "VD", name: "Vikram Desai",   title: "Sales Executive"   },
];

const BRAND_ACTIVITY = [
  { icon: FileText, color: "#0284c7", bg: "rgba(2,132,199,0.1)",   text: "Rahul Krishnan updated product listing 'Eternity Glazed Vitrified Tile'", time: "1h ago"    },
  { icon: Users,    color: "#10b981", bg: "rgba(16,185,129,0.1)",  text: "Arjun Mehta invited deepa.nair@gmail.com as Editor",             time: "3h ago"    },
  { icon: Pencil,   color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", text: "Priya Sharma published blog 'AAC vs Red Brick: A Comparison'",    time: "5h ago"    },
  { icon: Package,  color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  text: "Sneha Patel updated BOM for project 'Lakewood Residences'",      time: "Yesterday" },
  { icon: Award,    color: "#ef4444", bg: "rgba(239,68,68,0.1)",   text: "Arjun Mehta changed Vikram Desai's role to Viewer",              time: "2 days ago" },
  { icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.1)", text: "Priya Sharma accepted a booking from Ravi Sharma",             time: "3 days ago" },
];

const DOC_STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  Verified: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending:  { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Expired:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

function ServiceToggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative inline-flex items-center rounded-full flex-shrink-0"
      style={{
        width: 36, height: 20,
        background: enabled ? ACCENT : "rgba(0,0,0,0.15)",
        padding: 2, transition: "background 0.2s",
      }}
    >
      <span
        className="rounded-full bg-white block"
        style={{
          width: 16, height: 16,
          transform: `translateX(${enabled ? 16 : 0}px)`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "transform 0.2s",
        }}
      />
    </button>
  );
}

export function BrandProfileEditPage() {
  const [services, setServices] = useState(BRAND_SERVICES);
  const [locations, setLocations] = useState(BRAND_LOCATIONS);
  const [newCity, setNewCity] = useState("");

  const toggleService = (id: number) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));

  const removeService = (id: number) =>
    setServices(prev => prev.filter(s => s.id !== id));

  const removeLocation = (loc: string) =>
    setLocations(prev => prev.filter(l => l !== loc));

  const addLocation = () => {
    const city = newCity.trim();
    if (city && !locations.includes(city)) {
      setLocations(prev => [...prev, city]);
    }
    setNewCity("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Brand Management</h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Manage your brand profile, team, services, and settings</p>
      </div>

      {/* Brand Profile Card */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-start gap-5">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(2,132,199,0.08)", border: "2px dashed rgba(2,132,199,0.25)" }}
            >
              <Building2 style={{ width: 36, height: 36, color: ACCENT }} />
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
              style={{ border: "1px solid rgba(2,132,199,0.35)", color: ACCENT, background: "rgba(2,132,199,0.05)" }}
            >
              <Camera style={{ width: 11, height: 11 }} /> Change Logo
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Kajaria Ceramics Ltd.</h2>
                <p style={{ fontSize: "0.88rem", color: ACCENT, fontWeight: 600, marginTop: 2 }}>India's No. 1 Tile Company</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.5, maxWidth: 560 }}>
                  India's largest manufacturer of ceramic and vitrified tiles, with a portfolio spanning glazed vitrified,
                  double-charge, wood-plank and large-format slabs, plus the Bathonix sanitaryware range. Trusted by architects
                  and designers across 100+ cities.
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold flex-shrink-0"
                style={{ border: "1px solid rgba(2,132,199,0.35)", color: ACCENT, background: "rgba(2,132,199,0.05)" }}
              >
                <Pencil style={{ width: 12, height: 12 }} /> Edit
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
              {[
                { icon: Package,  text: "Tiles, Slabs & Sanitaryware" },
                { icon: MapPin,   text: "New Delhi, India" },
                { icon: Phone,    text: "+91 11 2614 9000" },
                { icon: Mail,     text: "connect@materiallibrary.in" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Icon style={{ width: 13, height: 13 }} /> {text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
              {[
                { icon: Globe,  text: "www.kajariaceramics.com" },
                { icon: Clock,  text: "Since 1988" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Icon style={{ width: 13, height: 13 }} /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Members + Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Team Members */}
        <div
          className="rounded-2xl"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <Users style={{ width: 16, height: 16, color: ACCENT }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Team Members</span>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: ACCENT }}
              >
                {BRAND_MEMBERS.length}
              </span>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white"
              style={{ background: "#FF6A3D" }}
            >
              <Plus style={{ width: 12, height: 12 }} /> Invite
            </button>
          </div>
          <div className="p-4 space-y-3">
            {BRAND_MEMBERS.map(m => (
              <div key={m.initials} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #0369a1)` }}
                >
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{m.title}</div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                >
                  Active
                </span>
                <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                  <X style={{ width: 11, height: 11 }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Pricing */}
        <div
          className="rounded-2xl"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "1rem", color: ACCENT }}>₹</span>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Services & Pricing</span>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white"
              style={{ background: "#FF6A3D" }}
            >
              <Plus style={{ width: 12, height: 12 }} /> Add
            </button>
          </div>
          <div className="p-4 space-y-4">
            {services.map(svc => (
              <div key={svc.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: 12 }}>
                <div className="flex items-start justify-between mb-1">
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{svc.name}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: ACCENT, flexShrink: 0, marginLeft: 8 }}>
                    {svc.price} <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--text-muted)" }}>{svc.unit}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <ServiceToggle enabled={svc.active} onChange={() => toggleService(svc.id)} />
                    <span style={{ fontSize: "0.75rem", color: svc.active ? "#10b981" : "var(--text-muted)", fontWeight: svc.active ? 600 : 400 }}>
                      {svc.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <button onClick={() => removeService(svc.id)} style={{ color: "var(--text-muted)" }}>
                    <FileText style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas of Operation + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Areas of Operation */}
        <div
          className="rounded-2xl"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <MapPin style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Areas of Operation</span>
          </div>
          <div className="p-5 space-y-4">
            <div
              className="flex items-center justify-center rounded-xl py-6"
              style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <div className="text-center">
                <MapPin style={{ width: 28, height: 28, color: "var(--text-muted)", margin: "0 auto 6px" }} />
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Interactive Map View</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Serving {locations.length} locations</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map(loc => (
                <span
                  key={loc}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{ border: `1px solid ${ACCENT}50`, color: ACCENT, background: "rgba(2,132,199,0.05)" }}
                >
                  <MapPin style={{ width: 11, height: 11 }} />
                  {loc}
                  <button onClick={() => removeLocation(loc)} className="ml-0.5" style={{ color: ACCENT }}>×</button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addLocation()}
                placeholder="City name"
                className="flex-1 px-3 py-2 rounded-xl text-[13px]"
                style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", background: "white", color: "var(--text-primary)" }}
              />
              <button
                onClick={addLocation}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "#FF6A3D", flexShrink: 0 }}
              >
                <Plus style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Documents & Certifications */}
        <div
          className="rounded-2xl"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <Award style={{ width: 16, height: 16, color: ACCENT }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Documents & Certifications</span>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
              style={{ border: "1px solid rgba(2,132,199,0.35)", color: ACCENT, background: "rgba(2,132,199,0.05)" }}
            >
              <Upload style={{ width: 11, height: 11 }} /> Upload
            </button>
          </div>
          <div className="p-4 space-y-3">
            {BRAND_DOCS.map(doc => {
              const st = DOC_STATUS_STYLE[doc.status];
              return (
                <div
                  key={doc.id}
                  className="flex items-start justify-between gap-3 py-2"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-start gap-2.5">
                    <FileText style={{ width: 16, height: 16, color: ACCENT, marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{doc.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{doc.issuer}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Expires: {doc.expires}</div>
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                    style={{ background: st.bg, color: st.color }}
                  >
                    {doc.status}
                  </span>
                </div>
              );
            })}
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl py-4 cursor-pointer"
              style={{ border: "1.5px dashed rgba(2,132,199,0.3)", background: "rgba(2,132,199,0.02)" }}
            >
              <Upload style={{ width: 18, height: 18, color: "var(--text-muted)" }} />
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                Drag & drop or click to upload certificates
                <br />
                <span style={{ fontSize: "0.68rem" }}>PDF, JPG, PNG up to 5MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Team Activity */}
      <div
        className="rounded-2xl"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Team Activity</h2>
        </div>
        <div className="p-4 space-y-2">
          {BRAND_ACTIVITY.map((act, i) => {
            const Icon = act.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: i % 2 === 0 ? "rgba(0,0,0,0.01)" : "transparent" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: act.bg }}
                >
                  <Icon style={{ width: 15, height: 15, color: act.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>
                    {act.text}
                  </p>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{act.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
