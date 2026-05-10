import { useState } from "react";
import {
  BookOpen, CheckCircle, Clock, Users, Search, Filter,
  Eye, Star, Trash2, X, ChevronDown, Award, BarChart3
} from "lucide-react";

const stats = [
  { label: "Total Courses", value: "186", icon: BookOpen, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  { label: "Published", value: "142", icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  { label: "Pending", value: "28", icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  { label: "Total Enrollments", value: "12,480", icon: Users, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
];

type CourseStatus = "Published" | "Pending" | "Rejected" | "Draft";
type CourseCategory = "Architecture" | "Structural" | "Interior" | "MEP" | "Sustainability" | "BIM";

interface MockCourse {
  id: number;
  title: string;
  creator: string;
  category: CourseCategory;
  enrollments: number;
  rating: number;
  status: CourseStatus;
  featured: boolean;
  duration: string;
  price: string;
  description: string;
}

const mockCourses: MockCourse[] = [
  { id: 1, title: "Advanced Revit for Architects", creator: "DesignCraft Studios", category: "BIM", enrollments: 1240, rating: 4.8, status: "Published", featured: true, duration: "24 hours", price: "₹4,999", description: "Master Revit workflows for architectural design and documentation." },
  { id: 2, title: "Sustainable Building Design", creator: "EcoDesign Partners", category: "Sustainability", enrollments: 890, rating: 4.6, status: "Published", featured: true, duration: "18 hours", price: "₹3,499", description: "Learn IGBC and GRIHA certification processes for green buildings." },
  { id: 3, title: "Structural Analysis Fundamentals", creator: "BuildRight Engineering", category: "Structural", enrollments: 560, rating: 4.5, status: "Published", featured: false, duration: "30 hours", price: "₹5,999", description: "From basics to advanced structural analysis using STAAD Pro." },
  { id: 4, title: "Interior Space Planning", creator: "SpaceForm Architects", category: "Interior", enrollments: 720, rating: 4.7, status: "Pending", featured: false, duration: "16 hours", price: "₹2,999", description: "Master the art of space planning for residential and commercial interiors." },
  { id: 5, title: "MEP Systems Design", creator: "TechBuild Systems", category: "MEP", enrollments: 340, rating: 4.3, status: "Published", featured: false, duration: "28 hours", price: "₹6,499", description: "Comprehensive course on MEP systems for modern buildings." },
  { id: 6, title: "Architectural Photography", creator: "RenderWorks Studio", category: "Architecture", enrollments: 450, rating: 4.9, status: "Pending", featured: false, duration: "10 hours", price: "₹1,999", description: "Capture stunning architectural images for your portfolio." },
  { id: 7, title: "AutoCAD Mastery", creator: "PrecisionBuild", category: "BIM", enrollments: 1560, rating: 4.4, status: "Published", featured: false, duration: "20 hours", price: "₹3,999", description: "Complete AutoCAD course from 2D drafting to 3D modeling." },
  { id: 8, title: "Landscape Architecture Basics", creator: "GreenScape Design", category: "Architecture", enrollments: 280, rating: 4.2, status: "Rejected", featured: false, duration: "14 hours", price: "₹2,499", description: "Introduction to landscape design principles and plant selection." },
];

const statusColors: Record<CourseStatus, { color: string; bg: string }> = {
  Published: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Rejected: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  Draft: { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

export function AdminCoursesManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "All">("All");
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<MockCourse | null>(null);

  const filtered = courses.filter((c) => {
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.creator.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFeatured = (id: number) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)));
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Courses Management</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Moderate and manage all courses on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-9" placeholder="Search courses or creators..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as CourseStatus | "All")}>
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Draft">Draft</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
          <div className="relative">
            <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as CourseCategory | "All")}>
              <option value="All">All Categories</option>
              <option value="Architecture">Architecture</option>
              <option value="Structural">Structural</option>
              <option value="Interior">Interior</option>
              <option value="MEP">MEP</option>
              <option value="Sustainability">Sustainability</option>
              <option value="BIM">BIM</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Course", "Creator", "Category", "Enrollments", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <BookOpen size={16} style={{ color: "var(--text-muted)" }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {c.featured && <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />}
                          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{c.title}</span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.duration} &middot; {c.price}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{c.creator}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{c.category}</span></td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}><div className="flex items-center gap-1"><Users size={12} />{c.enrollments.toLocaleString()}</div></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                      <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{c.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusColors[c.status].bg, color: statusColors[c.status].color }}>{c.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedCourse(c)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="View"><Eye size={15} style={{ color: "#3b82f6" }} /></button>
                      <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Approve"><CheckCircle size={15} style={{ color: "#10b981" }} /></button>
                      <button onClick={() => toggleFeatured(c.id)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Feature"><Star size={15} style={{ color: c.featured ? "#f59e0b" : "var(--text-muted)", fill: c.featured ? "#f59e0b" : "none" }} /></button>
                      <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Remove"><Trash2 size={15} style={{ color: "#ef4444" }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No courses found matching your criteria.</div>}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 relative" style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"><X size={18} style={{ color: "var(--text-muted)" }} /></button>
            <div className="w-full h-32 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <BookOpen size={32} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedCourse.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>{selectedCourse.creator}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{selectedCourse.category}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: statusColors[selectedCourse.status].bg, color: statusColors[selectedCourse.status].color }}>{selectedCourse.status}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: 12 }}>{selectedCourse.description}</p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: "Duration", value: selectedCourse.duration, icon: Clock },
                { label: "Enrolled", value: selectedCourse.enrollments.toLocaleString(), icon: Users },
                { label: "Rating", value: selectedCourse.rating.toString(), icon: Award },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Icon size={16} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.value}</p>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn-primary flex-1 text-sm py-2 rounded-lg cursor-pointer">Approve</button>
              <button className="flex-1 text-sm py-2 rounded-lg cursor-pointer" style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", background: "transparent" }}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
