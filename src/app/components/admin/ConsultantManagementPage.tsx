import { useState } from "react";
import {
  Users, Search, Plus, Upload, Download, Edit3, Trash2,
  Eye, Star, MapPin, Tag, CheckCircle, Shield, Award,
  Mail, Phone, Briefcase, Globe, Link as LinkIcon
} from "lucide-react";

interface ConsultantEntry {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  linkedCategories: string[];
  layerVisibility: string[];
  city: string;
  region: string;
  rating: number;
  consultations: number;
  articles: number;
  isVerified: boolean;
  status: "active" | "pending" | "inactive";
  email: string;
  phone: string;
  image?: string;
  bio: string;
}

const MOCK_CONSULTANTS: ConsultantEntry[] = [
  { id: "c1", name: "Dr. Rajesh Kumar", title: "Structural Engineering Expert", specialization: ["Concrete Technology", "Structural Design", "Earthquake Engineering"], linkedCategories: ["Structural Systems", "Concrete & Cement", "Ready-Mix Concrete"], layerVisibility: ["L1", "L2", "L3", "L4"], city: "Mumbai", region: "West India", rating: 4.9, consultations: 342, articles: 28, isVerified: true, status: "active", email: "rajesh.kumar@example.com", phone: "+91-98xxx-xxxxx", bio: "20+ years in structural engineering, PhD from IIT Bombay" },
  { id: "c2", name: "Priya Sharma", title: "MEP Systems Specialist", specialization: ["HVAC Design", "Smart Building Automation", "Energy Efficiency"], linkedCategories: ["MEP Systems", "Smart Home & Building Automation", "Electrical Systems"], layerVisibility: ["L1", "L2", "L3"], city: "Bangalore", region: "South India", rating: 4.7, consultations: 218, articles: 15, isVerified: true, status: "active", email: "priya.sharma@example.com", phone: "+91-98xxx-xxxxx", bio: "Expert in sustainable MEP design with 15+ years experience" },
  { id: "c3", name: "Amit Patel", title: "Building Envelope Consultant", specialization: ["Facade Engineering", "Curtain Walls", "Thermal Performance"], linkedCategories: ["Building Envelope", "Doors & Windows", "Cladding & Facades"], layerVisibility: ["L1", "L2", "L3", "L4", "L5"], city: "Ahmedabad", region: "West India", rating: 4.8, consultations: 189, articles: 22, isVerified: true, status: "active", email: "amit.patel@example.com", phone: "+91-98xxx-xxxxx", bio: "Certified facade consultant, expert in high-performance glazing" },
  { id: "c4", name: "Neha Singh", title: "Interior Design Specialist", specialization: ["Commercial Interiors", "Flooring Solutions", "Sustainable Materials"], linkedCategories: ["Interior Finishes", "Furniture & Fittings"], layerVisibility: ["L1", "L2", "L3"], city: "New Delhi", region: "North India", rating: 4.6, consultations: 156, articles: 12, isVerified: true, status: "active", email: "neha.singh@example.com", phone: "+91-98xxx-xxxxx", bio: "Award-winning interior architect specializing in commercial spaces" },
  { id: "c5", name: "Vikram Das", title: "Waterproofing Expert", specialization: ["Basement Waterproofing", "Terrace Solutions", "Chemical Treatment"], linkedCategories: ["Wet Areas & Plumbing", "Insulation & Protection"], layerVisibility: ["L1", "L2", "L3", "L4"], city: "Kolkata", region: "East India", rating: 4.5, consultations: 98, articles: 8, isVerified: false, status: "pending", email: "vikram.das@example.com", phone: "+91-98xxx-xxxxx", bio: "15 years in waterproofing solutions for high-rise buildings" },
  { id: "c6", name: "Dr. Sanjay Gupta", title: "Fire Safety Consultant", specialization: ["Fire Safety Audits", "NBC Compliance", "Passive Fire Protection"], linkedCategories: ["Safety & Security"], layerVisibility: ["L1", "L2", "L3", "L4"], city: "Chennai", region: "South India", rating: 4.8, consultations: 267, articles: 19, isVerified: true, status: "active", email: "sanjay.gupta@example.com", phone: "+91-98xxx-xxxxx", bio: "Former fire department chief, PhD in fire engineering" },
];

export function ConsultantManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState<string | null>(null);

  const filtered = MOCK_CONSULTANTS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchRegion = filterRegion === "all" || c.region === filterRegion;
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchRegion && matchStatus;
  });

  const regions = [...new Set(MOCK_CONSULTANTS.map((c) => c.region))];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Consultant & Expert Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage consultants with tag relevance. Consultants appear across all linked layers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }} onClick={() => setShowImportModal(true)}>
            <Upload className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: "#ff6a3d" }} onClick={() => setShowAddModal(true)}>
            <Plus className="w-3.5 h-3.5" /> Add Consultant
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Consultants", value: "342", icon: Users, color: "#3b82f6" },
          { label: "Verified Experts", value: "285", icon: Shield, color: "#10b981" },
          { label: "Pending Approval", value: "12", icon: CheckCircle, color: "#f59e0b" },
          { label: "Total Consultations", value: "15.2K", icon: Briefcase, color: "#a855f7" },
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

      {/* Cross-Layer Visibility Info */}
      <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.12)" }}>
        <Tag className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#a855f7" }} />
        <div>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#a855f7" }}>Cross-Layer Visibility</p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Consultants tagged to a category at any layer (L1-L5) will automatically appear on all related pages across the hierarchy. For example, a consultant tagged to "Structural Systems" (L1) will also appear on "Concrete & Cement" (L2), "Ready-Mix Concrete" (L3), and deeper layers.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input placeholder="Search consultants, specializations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
        </div>
        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Regions</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", color: "var(--text-secondary)" }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Consultant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((consultant) => (
          <div
            key={consultant.id}
            className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                  {consultant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{consultant.name}</span>
                    {consultant.isVerified && <Shield className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                      background: consultant.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                      color: consultant.status === "active" ? "#10b981" : "#f59e0b",
                    }}>{consultant.status}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{consultant.title}</div>
                  <div className="flex items-center gap-1 mt-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    <MapPin className="w-3 h-3" /> {consultant.city}, {consultant.region}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 10 }}>{consultant.bio}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1 mb-3">
                {consultant.specialization.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(168,85,247,0.08)", color: "#a855f7" }}>{s}</span>
                ))}
              </div>

              {/* Linked Categories */}
              <div className="mb-3">
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Linked Categories</div>
                <div className="flex flex-wrap gap-1">
                  {consultant.linkedCategories.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}>{c}</span>
                  ))}
                </div>
              </div>

              {/* Layer Visibility */}
              <div className="flex items-center gap-1 mb-3">
                <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-muted)" }}>Visible on:</span>
                {consultant.layerVisibility.map((l) => (
                  <span key={l} className="px-1.5 py-0.5 rounded text-xs font-bold text-white" style={{ background: "#a855f7", fontSize: "0.6rem" }}>{l}</span>
                ))}
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: 10 }}>
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {consultant.rating}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Briefcase className="w-3 h-3" /> {consultant.consultations} consultations
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Globe className="w-3 h-3" /> {consultant.articles} articles
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all" style={{ background: "rgba(168,85,247,0.08)", color: "#a855f7" }} onClick={() => setShowTagModal(consultant.id)}>
                  <Tag className="w-3.5 h-3.5" /> Edit Tags & Layers
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
          </div>
        ))}
      </div>

      {/* Tag/Layer Modal */}
      {showTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTagModal(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Edit Tags & Layer Visibility</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>Select categories and layers where this consultant should appear.</p>

            <div className="mb-4">
              <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Layer Visibility</label>
              <div className="flex gap-2">
                {["L1", "L2", "L3", "L4", "L5"].map((l) => (
                  <label key={l} className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}>
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs font-bold" style={{ color: "#a855f7" }}>{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Linked Categories</label>
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input placeholder="Search categories..." className="w-full pl-10 pr-4 py-2 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
              </div>
              <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                {["Structural Systems", "Concrete & Cement", "Ready-Mix Concrete", "MEP Systems", "Electrical Systems", "Building Envelope", "Interior Finishes", "Safety & Security", "Wet Areas & Plumbing"].map((cat, i) => (
                  <label key={cat} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <input type="checkbox" defaultChecked={i < 3} className="rounded" />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Specialization Tags</label>
              <input placeholder="Add tags (comma separated)" className="w-full px-3 py-2 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} defaultValue="Concrete Technology, Structural Design" />
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowTagModal(null)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#a855f7" }}>Save Tags</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Consultant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-2xl rounded-2xl p-6 max-h-[85vh] overflow-y-auto" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>Add New Consultant</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Full Name", "Title / Designation", "Email", "Phone", "City", "Region", "Specializations (comma-separated)", "Bio"].map((field) => (
                <div key={field} className={(field === "Full Name" || field === "Bio" || field.includes("Specializations")) ? "md:col-span-2" : ""}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{field}</label>
                  {field === "Bio" ? (
                    <textarea className="w-full px-3 py-2.5 rounded-xl text-sm" rows={3} placeholder={field} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", resize: "vertical" }} />
                  ) : field === "Region" ? (
                    <select className="w-full px-3 py-2.5 rounded-xl text-sm" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}>
                      <option>Select region...</option>
                      <option>North India</option><option>South India</option><option>West India</option><option>East India</option>
                    </select>
                  ) : (
                    <input className="w-full px-3 py-2.5 rounded-xl text-sm" placeholder={field} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--text-secondary)" }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>Create Consultant</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-lg rounded-2xl p-6" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Bulk Import Consultants</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>Upload consultant profiles with category and layer mappings</p>
            <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>Required Columns:</div>
              <div className="flex flex-wrap gap-1">
                {["Name", "Title", "Email", "Phone", "City", "Region", "Specializations", "Category IDs", "Layer Visibility"].map((f) => (
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
