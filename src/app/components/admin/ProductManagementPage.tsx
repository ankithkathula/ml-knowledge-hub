import { useState } from "react";
import {
  Package, Search, Plus, Upload, Download, Edit3, Trash2,
  Eye, Filter, Star, CheckCircle, XCircle, Image as ImageIcon,
  ArrowUpDown, Building2, Tag, ExternalLink
} from "lucide-react";

interface ProductEntry {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  l5Category: string;
  l5Id: string;
  price: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  status: "active" | "draft" | "pending";
  image: string;
  specs: Record<string, string>;
  dateAdded: string;
}

const MOCK_PRODUCTS: ProductEntry[] = [
  { id: "p1", name: "Alucobond A2 IGU Rainscreen Panel", brand: "3A Composites", brandId: "3a-composites", l5Category: "Composite Rainscreen — Double-Glazed (IGU)", l5Id: "composite-igs", price: "₹5,200/sq.ft", rating: 4.8, reviews: 124, inStock: true, status: "active", image: "", specs: { "Panel Size": "1220×2440mm", "Core": "FR A2", "Thickness": "4mm" }, dateAdded: "2026-03-15" },
  { id: "p2", name: "Aeotec Smart Dimmer 7 (Z-Wave)", brand: "Aeotec", brandId: "aeotec", l5Category: "Smart Lighting — Z-Wave Protocol", l5Id: "smart-zwave", price: "₹4,299", rating: 4.6, reviews: 89, inStock: true, status: "active", image: "", specs: { "Protocol": "Z-Wave Plus", "Load": "200W LED", "Voltage": "230V" }, dateAdded: "2026-03-10" },
  { id: "p3", name: "ML Brand Composite Rainscreen Panels", brand: "ML Brand", brandId: "ml-brand", l5Category: "Composite Rainscreen — Double-Glazed (IGU)", l5Id: "composite-igs", price: "₹4,850/sq.ft", rating: 4.5, reviews: 67, inStock: true, status: "active", image: "", specs: { "Panel Size": "1220×2440mm", "Core": "PE", "Thickness": "4mm" }, dateAdded: "2026-03-08" },
  { id: "p4", name: "Schneider Wiser Smart Dimmer", brand: "Schneider Electric", brandId: "schneider", l5Category: "Smart Lighting — Zigbee Protocol", l5Id: "smart-zigbee", price: "₹3,899", rating: 4.4, reviews: 156, inStock: true, status: "active", image: "", specs: { "Protocol": "Zigbee 3.0", "Load": "150W LED", "Voltage": "230V" }, dateAdded: "2026-03-05" },
  { id: "p5", name: "Hunter Douglas Quadroclick Louver Panel", brand: "Hunter Douglas", brandId: "hunter-douglas", l5Category: "Composite Rainscreen — ACP", l5Id: "composite-acp", price: "₹6,100/sq.ft", rating: 4.9, reviews: 45, inStock: false, status: "draft", image: "", specs: { "Material": "Aluminium", "Finish": "PVDF", "Width": "300mm" }, dateAdded: "2026-02-28" },
  { id: "p6", name: "Havells Smart WiFi LED Bulb 12W", brand: "Havells India", brandId: "havells", l5Category: "Smart Lighting — WiFi", l5Id: "smart-wifi", price: "₹899", rating: 4.2, reviews: 312, inStock: true, status: "active", image: "", specs: { "Wattage": "12W", "Protocol": "WiFi", "Color": "RGB+W" }, dateAdded: "2026-03-01" },
  { id: "p7", name: "Fibaro Dimmer 2 Z-Wave", brand: "Fibaro", brandId: "fibaro", l5Category: "Smart Lighting — Z-Wave Protocol", l5Id: "smart-zwave", price: "₹5,199", rating: 4.7, reviews: 78, inStock: true, status: "pending", image: "", specs: { "Protocol": "Z-Wave Plus", "Load": "250W LED", "Install": "Behind switch" }, dateAdded: "2026-03-12" },
];

export function ProductManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStock, setFilterStock] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>("dateAdded");

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchStock = filterStock === "all" || (filterStock === "instock" ? p.inStock : !p.inStock);
    return matchSearch && matchStatus && matchStock;
  });

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Product Management (L6)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage products tied to L5 specification categories and linked to brands
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
            onClick={() => setShowImportModal(true)}
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "#ff6a3d" }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Products", value: "52,480", color: "#ff6a3d" },
          { label: "Active", value: "48,120", color: "#10b981" },
          { label: "Pending Review", value: "2,340", color: "#f59e0b" },
          { label: "In Stock", value: "45,890", color: "#3b82f6" },
          { label: "Brands Linked", value: "6,240", color: "#a855f7" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3.5" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={filterStock}
          onChange={(e) => setFilterStock(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}
        >
          <option value="all">All Stock</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product</th>
                <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Brand</th>
                <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>L5 Category</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Rating</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Stock</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th className="text-right px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="transition-all"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
                        <Package className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      </div>
                      <div className="min-w-0">
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate max-w-[200px]">{p.name}</div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" style={{ color: "#3b82f6" }} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#3b82f6" }}>{p.brand}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }} className="truncate block max-w-[180px]">{p.l5Category}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.price}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.rating}</span>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>({p.reviews})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.inStock ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#10b981" }}>
                        <CheckCircle className="w-3 h-3" /> In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#ef4444" }}>
                        <XCircle className="w-3 h-3" /> Out
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: p.status === "active" ? "rgba(34,197,94,0.1)" : p.status === "pending" ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.05)",
                        color: p.status === "active" ? "#10b981" : p.status === "pending" ? "#f59e0b" : "var(--text-muted)",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
            style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>
              Add New Product
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Product Name", "Brand", "L5 Category", "Price", "SKU", "Rating", "Image URL"].map((field) => (
                <div key={field} className={field === "Product Name" ? "md:col-span-2" : ""}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{field}</label>
                  {field === "Brand" || field === "L5 Category" ? (
                    <select className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}>
                      <option>Select {field}...</option>
                    </select>
                  ) : (
                    <input className="w-full px-3 py-2.5 rounded-xl text-sm" placeholder={`Enter ${field.toLowerCase()}`} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
                  )}
                </div>
              ))}
              <div className="md:col-span-2">
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Description</label>
                <textarea className="w-full px-3 py-2.5 rounded-xl text-sm" rows={3} placeholder="Product description..." style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", resize: "vertical" }} />
              </div>
              <div className="md:col-span-2">
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Specifications (key:value, one per line)</label>
                <textarea className="w-full px-3 py-2.5 rounded-xl text-sm font-mono" rows={4} placeholder="Panel Size: 1220×2440mm&#10;Core: FR A2&#10;Thickness: 4mm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", resize: "vertical" }} />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>In Stock</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Create Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Bulk Import Products</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>Upload products CSV with brand and L5 category mapping</p>
            <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>Required Columns:</div>
              <div className="flex flex-wrap gap-1">
                {["Name", "Brand ID", "L5 ID", "Price", "Rating", "In Stock", "Specs JSON", "Image URL"].map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{f}</span>
                ))}
              </div>
            </div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Drop CSV/XLSX file here</p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>Supports .csv, .xlsx up to 50MB</p>
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
