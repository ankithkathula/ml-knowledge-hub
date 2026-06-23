import { useState } from "react";
import { Plus, Search, Edit2, Eye, Pause, Play, Trash2, Star, Users, ChevronDown } from "lucide-react";

type CourseStatus = "Live" | "Draft" | "Paused" | "Review";

interface ManagedCourse {
  id: number;
  title: string;
  format: string;
  category: string;
  level: string;
  faculty: string;
  enrolled: number;
  revenue: string;
  rating: number;
  reviews: number;
  price: string;
  status: CourseStatus;
  published: string;
}

const COURSES: ManagedCourse[] = [
  { id: 1, title: "BIM Professional: Revit Architecture Complete", format: "Certification", category: "BIM", level: "Intermediate", faculty: "Dr. Ramesh Iyer", enrolled: 842, revenue: "₹4.2L", rating: 4.8, reviews: 312, price: "₹12,999", status: "Live", published: "Jan 2024" },
  { id: 2, title: "Advanced AutoCAD for Construction Drawings",     format: "Training",     category: "BIM", level: "Intermediate", faculty: "Priya Suresh",   enrolled: 720, revenue: "₹2.9L", rating: 4.5, reviews: 240, price: "₹6,999",  status: "Live", published: "Mar 2024" },
  { id: 3, title: "Grasshopper & Parametric Design",               format: "Digital",      category: "Architecture", level: "Advanced", faculty: "Arjun Nair", enrolled: 314, revenue: "₹1.8L", rating: 4.7, reviews: 98,  price: "₹10,999", status: "Live", published: "Jun 2024" },
  { id: 4, title: "Smart Home & Building Automation",              format: "Certification",category: "Technology", level: "Advanced", faculty: "Meera Pillai",  enrolled: 182, revenue: "₹1.6L", rating: 4.6, reviews: 64,  price: "₹14,999", status: "Live", published: "Sep 2024" },
  { id: 5, title: "Façade Engineering & Cladding Systems",         format: "Training",     category: "Construction", level: "Advanced", faculty: "Rohit Desai",enrolled: 96,  revenue: "₹0.8L", rating: 4.5, reviews: 42,  price: "₹9,499",  status: "Draft", published: "—" },
  { id: 6, title: "Construction Cost Estimation & Tendering",      format: "Training",     category: "Construction", level: "Intermediate", faculty: "Sanjay Kumar", enrolled: 228, revenue: "₹0.5L", rating: 4.4, reviews: 88, price: "₹5,999", status: "Live", published: "Nov 2023" },
  { id: 7, title: "IGBC Green Building Professional Prep",         format: "Certification",category: "Sustainability", level: "Advanced", faculty: "Dr. Ramesh Iyer", enrolled: 142, revenue: "₹1.2L", rating: 4.7, reviews: 56, price: "₹18,000", status: "Paused", published: "Apr 2023" },
];

const statusColors: Record<CourseStatus, { color: string; bg: string }> = {
  Live:   { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Draft:  { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Paused: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  Review: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
};

export function InstituteCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "All">("All");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFormat, setNewFormat] = useState("Certification");

  const filtered = COURSES.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.faculty.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-5 sm:p-7 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Course Management</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{COURSES.length} courses · {COURSES.filter(c => c.status === "Live").length} live</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "#3b82f6", color: "#fff" }}
        >
          <Plus className="w-4 h-4" /> New Course
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or faculty..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Live", "Draft", "Paused"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: statusFilter === s ? "#3b82f6" : "white",
                color: statusFilter === s ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${statusFilter === s ? "#3b82f6" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Course", "Faculty", "Format / Level", "Enrolled", "Revenue", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const sc = statusColors[c.status];
                return (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.02)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <td className="px-5 py-3.5" style={{ maxWidth: "260px" }}>
                      <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.title}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Published: {c.published}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>{c.faculty}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{c.format}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{c.level}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.enrolled.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10b981" }}>{c.revenue}</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.rating}</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>({c.reviews})</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: sc.bg, color: sc.color }}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg transition-colors" title="Edit"
                          style={{ color: "#3b82f6" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors" title="Preview"
                          style={{ color: "#6b7280" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(107,114,128,0.08)"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors" title={c.status === "Live" ? "Pause" : "Publish"}
                          style={{ color: c.status === "Live" ? "#f59e0b" : "#10b981" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = c.status === "Live" ? "rgba(245,158,11,0.08)" : "rgba(16,185,129,0.08)"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                        >
                          {c.status === "Live" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors" title="Delete"
                          style={{ color: "#ef4444" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Course Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px" }}>Create New Course</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Course Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Structural Analysis"
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Format</label>
                <div className="relative mt-1.5">
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none appearance-none"
                    style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }}
                  >
                    {["Certification", "Training", "Workshop", "Digital", "Brand Course"].map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Category</label>
                  <input placeholder="e.g. BIM" className="w-full mt-1.5 px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Price</label>
                  <input placeholder="₹ or Free" className="w-full mt-1.5 px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Assign Faculty</label>
                <input placeholder="Search faculty name..." className="w-full mt-1.5 px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-secondary)" }}>
                Cancel
              </button>
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#3b82f6", color: "#fff" }}>
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
