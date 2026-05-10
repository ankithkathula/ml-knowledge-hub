import { useState } from "react";
import {
  Building2, Search, Plus, Upload, Download, Edit3, Trash2,
  Eye, Star, MapPin, Tag, CheckCircle, Shield, Award,
  ExternalLink, Link as LinkIcon, Globe
} from "lucide-react";

interface BrandEntry {
  id: string;
  name: string;
  tagline: string;
  city: string;
  region: string;
  tier: "Premium" | "Standard" | "Emerging";
  rating: number;
  productCount: number;
  isFeatured: boolean;
  isVerified: boolean;
  linkedCategories: number;
  accentColor: string;
  status: "active" | "pending" | "suspended";
  dateAdded: string;
}

const MOCK_BRANDS: BrandEntry[] = [
  { id: "ml-brand", name: "ML Brand", tagline: "Innovation in Building Materials", city: "Mumbai", region: "West India", tier: "Premium", rating: 4.5, productCount: 52, isFeatured: true, isVerified: true, linkedCategories: 8, accentColor: "#ff6a3d", status: "active", dateAdded: "2025-01-15" },
  { id: "schuco", name: "Schuco International", tagline: "System Solutions for Windows, Doors & Facades", city: "Bangalore", region: "South India", tier: "Premium", rating: 4.8, productCount: 38, isFeatured: true, isVerified: true, linkedCategories: 12, accentColor: "#003366", status: "active", dateAdded: "2025-02-01" },
  { id: "3a-composites", name: "3A Composites / Alucobond", tagline: "World Leader in Aluminium Composite Panels", city: "New Delhi", region: "North India", tier: "Premium", rating: 4.7, productCount: 24, isFeatured: true, isVerified: true, linkedCategories: 6, accentColor: "#cc0000", status: "active", dateAdded: "2025-01-20" },
  { id: "hunter-douglas", name: "Hunter Douglas", tagline: "Architectural Products & Sun Control Solutions", city: "Mumbai", region: "West India", tier: "Premium", rating: 4.9, productCount: 31, isFeatured: true, isVerified: true, linkedCategories: 9, accentColor: "#1a4c6e", status: "active", dateAdded: "2025-03-01" },
  { id: "schneider", name: "Schneider Electric", tagline: "Life Is On — Digital Transformation", city: "Gurgaon", region: "North India", tier: "Premium", rating: 4.6, productCount: 86, isFeatured: false, isVerified: true, linkedCategories: 15, accentColor: "#3dcd58", status: "active", dateAdded: "2025-02-15" },
  { id: "havells", name: "Havells India", tagline: "Wires That Don't Catch Fire", city: "Noida", region: "North India", tier: "Premium", rating: 4.4, productCount: 124, isFeatured: false, isVerified: true, linkedCategories: 18, accentColor: "#003087", status: "active", dateAdded: "2025-01-10" },
  { id: "aeotec", name: "Aeotec", tagline: "Smart Home Technology Leader", city: "Bangalore", region: "South India", tier: "Standard", rating: 4.6, productCount: 42, isFeatured: false, isVerified: true, linkedCategories: 5, accentColor: "#00a4e0", status: "active", dateAdded: "2025-04-01" },
  { id: "greenbuild", name: "GreenBuild Materials", tagline: "Sustainable Construction Solutions", city: "Pune", region: "West India", tier: "Emerging", rating: 3.8, productCount: 12, isFeatured: false, isVerified: false, linkedCategories: 3, accentColor: "#2d6a4f", status: "pending", dateAdded: "2026-03-28" },
];

export function BrandManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState<string | null>(null);

  const filtered = MOCK_BRANDS.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = filterTier === "all" || b.tier === filterTier;
    const matchRegion = filterRegion === "all" || b.region === filterRegion;
    return matchSearch && matchTier && matchRegion;
  });

  const regions = [...new Set(MOCK_BRANDS.map((b) => b.region))];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Brand Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage brands, link to taxonomy categories, and import brand data in bulk
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "#ff6a3d" }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-3.5 h-3.5" /> Add Brand
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Brands", value: "6,240", icon: Building2, color: "#3b82f6" },
          { label: "Premium Tier", value: "1,840", icon: Award, color: "#ff6a3d" },
          { label: "Verified", value: "5,120", icon: Shield, color: "#10b981" },
          { label: "Pending Approval", value: "85", icon: CheckCircle, color: "#f59e0b" },
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
          <input
            placeholder="Search brands, cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
          />
        </div>
        <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Tiers</option>
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
          <option value="Emerging">Emerging</option>
        </select>
        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((brand) => (
          <div
            key={brand.id}
            className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {/* Brand Header */}
            <div className="p-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: brand.accentColor }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{brand.name}</span>
                      {brand.isVerified && <Shield className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />}
                    </div>
                    <div className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <MapPin className="w-3 h-3" /> {brand.city}, {brand.region}
                    </div>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: brand.status === "active" ? "rgba(34,197,94,0.1)" : brand.status === "pending" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                    color: brand.status === "active" ? "#10b981" : brand.status === "pending" ? "#f59e0b" : "#ef4444",
                  }}
                >
                  {brand.status}
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{brand.tagline}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              {[
                { label: "Products", value: brand.productCount },
                { label: "Rating", value: brand.rating },
                { label: "Categories", value: brand.linkedCategories },
                { label: "Tier", value: brand.tier },
              ].map((s) => (
                <div key={s.label} className="p-2.5 text-center" style={{ borderRight: "1px solid rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-3 flex items-center gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{ background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}
                onClick={() => setShowLinkModal(brand.id)}
              >
                <LinkIcon className="w-3.5 h-3.5" /> Link Categories
              </button>
              <button className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              ><Eye className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              ><Edit3 className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              ><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Linking Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowLinkModal(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
              Link Brand to Categories
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>
              Select taxonomy categories where this brand operates. Brand will appear on all selected category pages.
            </p>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input placeholder="Search categories..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {["Building Envelope > Doors & Windows", "Building Envelope > Cladding & Facades", "MEP Systems > Electrical Systems", "MEP Systems > Smart Automation", "Interior Finishes > Flooring", "Structural Systems > Concrete & Cement", "Safety & Security > Fire Safety", "Ceiling & Partition > False Ceilings"].map((cat, i) => (
                <label key={cat} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all" style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <input type="checkbox" defaultChecked={i < 4} className="rounded" />
                  <span style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{cat}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowLinkModal(null)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Save Links</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Brand Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-2xl rounded-2xl p-6 max-h-[85vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>Add New Brand</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { field: "Brand Name", span: true },
                { field: "Tagline", span: true },
                { field: "City" },
                { field: "Region", type: "select", options: ["North India", "South India", "West India", "East India"] },
                { field: "Tier", type: "select", options: ["Premium", "Standard", "Emerging"] },
                { field: "Accent Color" },
                { field: "Cover Image URL", span: true },
                { field: "Website URL", span: true },
              ].map((f) => (
                <div key={f.field} className={f.span ? "md:col-span-2" : ""}>
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
              <div className="md:col-span-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded" /><span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Featured</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded" /><span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Verified</span></label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Create Brand</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Bulk Import Brands</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>Upload brands with profile data and category mappings</p>
            <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>Required Columns:</div>
              <div className="flex flex-wrap gap-1">
                {["Name", "Tagline", "City", "Region", "Tier", "Accent Color", "Category IDs", "Cover Image"].map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{f}</span>
                ))}
              </div>
            </div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Drop CSV/XLSX file here</p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>Supports .csv, .xlsx up to 10MB</p>
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
