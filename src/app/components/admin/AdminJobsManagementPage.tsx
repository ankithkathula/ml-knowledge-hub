import { useState } from "react";
import {
  Briefcase, CheckCircle, Clock, AlertTriangle, Search, Filter,
  Eye, Flag, Trash2, Star, X, MapPin, Calendar, Users,
  ChevronDown, Building2, Plus, PlusCircle,
} from "lucide-react";

const stats = [
  { label: "Total Jobs",     value: "482", icon: Briefcase,     color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)" },
  { label: "Active",         value: "324", icon: CheckCircle,   color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  { label: "Pending Review", value: "42",  icon: Clock,         color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  { label: "Flagged",        value: "8",   icon: AlertTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.2)" },
];

type JobStatus = "Active" | "Pending" | "Flagged" | "Closed";
type JobType   = "Full-time" | "Part-time" | "Internship" | "Contract";

interface MockJob {
  id: number;
  title: string;
  studio: string;
  location: string;
  city: string;
  type: JobType;
  applicants: number;
  posted: string;
  status: JobStatus;
  featured: boolean;
  salary: string;
  description: string;
  requirements: string[];
}

const CITY_OPTIONS = [
  "Mumbai, MH", "Delhi, DL", "Bengaluru, KA", "Hyderabad, TG",
  "Pune, MH", "Chennai, TN", "Jaipur, RJ", "Gurugram, HR",
  "Kolkata, WB", "Ahmedabad, GJ", "Noida, UP", "Chandigarh, PB",
];

let nextId = 11;

const mockJobs: MockJob[] = [
  { id: 1,  title: "Senior Architect",          studio: "DesignCraft Studios",    location: "Mumbai, MH",    city: "Mumbai",     type: "Full-time",  applicants: 34, posted: "2026-03-20", status: "Active",  featured: true,  salary: "₹18-25 LPA",  description: "Lead design projects for luxury residential developments.", requirements: ["8+ years experience", "AutoCAD, Revit proficiency", "LEED certification preferred"] },
  { id: 2,  title: "Interior Design Intern",    studio: "SpaceForm Architects",   location: "Delhi, DL",     city: "Delhi",      type: "Internship", applicants: 67, posted: "2026-03-18", status: "Active",  featured: false, salary: "₹15,000/mo",  description: "Assist senior designers with residential and commercial interiors.", requirements: ["Currently enrolled in design program", "SketchUp knowledge", "Portfolio required"] },
  { id: 3,  title: "Structural Engineer",       studio: "BuildRight Engineering", location: "Bengaluru, KA", city: "Bengaluru",  type: "Full-time",  applicants: 21, posted: "2026-03-25", status: "Pending", featured: false, salary: "₹12-18 LPA",  description: "Design structural systems for high-rise buildings.", requirements: ["5+ years in structural design", "STAAD Pro, ETABS", "PE license"] },
  { id: 4,  title: "BIM Coordinator",           studio: "NexGen Constructions",   location: "Hyderabad, TG", city: "Hyderabad",  type: "Full-time",  applicants: 15, posted: "2026-03-22", status: "Active",  featured: true,  salary: "₹10-15 LPA",  description: "Manage BIM workflows across multi-disciplinary teams.", requirements: ["Revit expert", "3+ years BIM coordination", "Navisworks experience"] },
  { id: 5,  title: "Landscape Architect",       studio: "GreenScape Design",      location: "Pune, MH",      city: "Pune",       type: "Contract",   applicants: 9,  posted: "2026-03-15", status: "Active",  featured: false, salary: "₹8-12 LPA",   description: "Design sustainable outdoor spaces for corporate campuses.", requirements: ["Landscape architecture degree", "AutoCAD, Lumion", "Sustainability focus"] },
  { id: 6,  title: "Project Manager",           studio: "UrbanEdge Architects",   location: "Chennai, TN",   city: "Chennai",    type: "Full-time",  applicants: 28, posted: "2026-03-10", status: "Flagged", featured: false, salary: "₹15-22 LPA",  description: "Oversee large-scale mixed-use development projects.", requirements: ["PMP certified", "10+ years in construction", "Budget management"] },
  { id: 7,  title: "CAD Drafter",               studio: "PrecisionBuild",         location: "Jaipur, RJ",    city: "Jaipur",     type: "Part-time",  applicants: 12, posted: "2026-03-28", status: "Pending", featured: false, salary: "₹25,000/mo",  description: "Create detailed construction drawings from design concepts.", requirements: ["AutoCAD proficiency", "2+ years experience", "Attention to detail"] },
  { id: 8,  title: "Sustainability Consultant", studio: "EcoDesign Partners",     location: "Gurugram, HR",  city: "Gurugram",   type: "Full-time",  applicants: 18, posted: "2026-03-12", status: "Active",  featured: true,  salary: "₹14-20 LPA",  description: "Guide projects toward green building certifications.", requirements: ["IGBC/GRIHA expertise", "5+ years sustainability", "Energy modeling skills"] },
  { id: 9,  title: "3D Visualization Artist",   studio: "RenderWorks Studio",     location: "Mumbai, MH",    city: "Mumbai",     type: "Contract",   applicants: 42, posted: "2026-03-26", status: "Active",  featured: false, salary: "₹6-10 LPA",   description: "Create photorealistic renders for architectural presentations.", requirements: ["3ds Max, V-Ray expertise", "Strong portfolio", "2+ years experience"] },
  { id: 10, title: "MEP Engineer",              studio: "TechBuild Systems",      location: "Bengaluru, KA", city: "Bengaluru",  type: "Full-time",  applicants: 11, posted: "2026-03-08", status: "Closed",  featured: false, salary: "₹10-16 LPA",  description: "Design MEP systems for commercial buildings.", requirements: ["MEP design experience", "Revit MEP", "HVAC knowledge"] },
];

const statusColors: Record<JobStatus, { color: string; bg: string }> = {
  Active:  { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Flagged: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  Closed:  { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

const typeColors: Record<JobType, { color: string; bg: string }> = {
  "Full-time":  { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  "Part-time":  { color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  Internship:   { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Contract:     { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

const BLANK_FORM = {
  title: "", studio: "", location: CITY_OPTIONS[0], type: "Full-time" as JobType,
  salary: "", description: "", requirements: "",
};

export function AdminJobsManagementPage() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All");
  const [typeFilter, setTypeFilter]   = useState<JobType | "All">("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [jobs, setJobs]               = useState(mockJobs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm]               = useState(BLANK_FORM);

  const uniqueCities = Array.from(new Set(jobs.map((j) => j.location))).sort();

  const filtered = jobs.filter((j) => {
    if (statusFilter !== "All" && j.status !== statusFilter) return false;
    if (typeFilter !== "All" && j.type !== typeFilter) return false;
    if (locationFilter !== "All" && j.location !== locationFilter) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.studio.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFeatured = (id: number) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, featured: !j.featured } : j)));

  const removeJob = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (selectedJob?.id === id) setSelectedJob(null);
  };

  const flagJob = (id: number) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: j.status === "Flagged" ? "Active" : "Flagged" as JobStatus } : j)));

  const approveJob = (id: number) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "Active" as JobStatus } : j)));

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const city = form.location.split(",")[0].trim();
    const newJob: MockJob = {
      id: nextId++,
      title: form.title,
      studio: form.studio,
      location: form.location,
      city,
      type: form.type,
      salary: form.salary,
      description: form.description,
      requirements: form.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      applicants: 0,
      posted: new Date().toISOString().split("T")[0],
      status: "Active",
      featured: false,
    };
    setJobs((prev) => [newJob, ...prev]);
    setForm(BLANK_FORM);
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Jobs Management</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Moderate and post jobs across studios on the platform</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0"
          style={{ background: "var(--accent, #FF6A3D)", color: "#fff" }}
        >
          <Plus size={15} /> Add Job
        </button>
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
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-9" placeholder="Search jobs or studios..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* Location filter */}
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select
              className="gl-input pl-9 pr-8 appearance-none cursor-pointer"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              {uniqueCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>

          {/* Type filter */}
          <div className="relative">
            <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as JobType | "All")}>
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as JobStatus | "All")}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
        </div>

        {/* Active filter chips */}
        {(locationFilter !== "All" || typeFilter !== "All" || statusFilter !== "All") && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {locationFilter !== "All" && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                <MapPin size={10} /> {locationFilter}
                <button onClick={() => setLocationFilter("All")}><X size={10} /></button>
              </span>
            )}
            {typeFilter !== "All" && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                <Briefcase size={10} /> {typeFilter}
                <button onClick={() => setTypeFilter("All")}><X size={10} /></button>
              </span>
            )}
            {statusFilter !== "All" && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                {statusFilter}
                <button onClick={() => setStatusFilter("All")}><X size={10} /></button>
              </span>
            )}
            <button
              onClick={() => { setLocationFilter("All"); setTypeFilter("All"); setStatusFilter("All"); }}
              className="text-xs" style={{ color: "var(--text-muted)" }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Result count */}
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
        Showing <strong style={{ color: "var(--text-secondary)" }}>{filtered.length}</strong> of {jobs.length} jobs
      </p>

      {/* Jobs Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Job Title", "Studio", "Location", "Type", "Applicants", "Posted", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr
                  key={j.id}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {j.featured && <Star size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />}
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{j.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <Building2 size={14} style={{ color: "var(--text-muted)" }} />
                      </div>
                      <span style={{ color: "var(--text-secondary)" }}>{j.studio}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><MapPin size={12} />{j.location}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: typeColors[j.type].bg, color: typeColors[j.type].color }}>{j.type}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><Users size={12} />{j.applicants}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><Calendar size={12} />{new Date(j.posted).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusColors[j.status].bg, color: statusColors[j.status].color }}>{j.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedJob(j)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="View"><Eye size={15} style={{ color: "#3b82f6" }} /></button>
                      <button onClick={() => toggleFeatured(j.id)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Feature"><Star size={15} style={{ color: j.featured ? "#f59e0b" : "var(--text-muted)", fill: j.featured ? "#f59e0b" : "none" }} /></button>
                      <button onClick={() => flagJob(j.id)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Flag"><Flag size={15} style={{ color: j.status === "Flagged" ? "#ef4444" : "#f59e0b" }} /></button>
                      <button onClick={() => removeJob(j.id)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Remove"><Trash2 size={15} style={{ color: "#ef4444" }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No jobs found matching your criteria.</div>
        )}
      </div>

      {/* ── Job Detail Modal ── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 relative" style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"><X size={18} style={{ color: "var(--text-muted)" }} /></button>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}><Building2 size={22} style={{ color: "var(--text-muted)" }} /></div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedJob.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{selectedJob.studio}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: typeColors[selectedJob.type].bg, color: typeColors[selectedJob.type].color }}>{selectedJob.type}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: statusColors[selectedJob.status].bg, color: statusColors[selectedJob.status].color }}>{selectedJob.status}</span>
                  {selectedJob.featured && <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>Featured</span>}
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <div className="flex items-center gap-2"><MapPin size={14} /> {selectedJob.location}</div>
              <div className="flex items-center gap-2"><Briefcase size={14} /> {selectedJob.salary}</div>
              <div className="flex items-center gap-2"><Users size={14} /> {selectedJob.applicants} applicants</div>
              <div className="flex items-center gap-2"><Calendar size={14} /> Posted {new Date(selectedJob.posted).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
            <div className="mb-4">
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Description</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{selectedJob.description}</p>
            </div>
            <div className="mb-5">
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Requirements</h4>
              <ul className="space-y-1">
                {selectedJob.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: "#10b981" }} /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { approveJob(selectedJob.id); setSelectedJob(null); }} className="btn-primary flex-1 text-sm py-2 rounded-lg cursor-pointer">Approve</button>
              <button onClick={() => removeJob(selectedJob.id)} className="flex-1 text-sm py-2 rounded-lg cursor-pointer" style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", background: "transparent" }}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Job Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#0F172A", border: "1px solid #1E293B", maxHeight: "90vh", overflowY: "auto" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #1E293B" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,106,61,0.15)" }}>
                  <PlusCircle size={16} style={{ color: "#FF6A3D" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F1F5F9" }}>Post a Job</h3>
                  <p style={{ fontSize: "0.7rem", color: "#64748B", marginTop: 1 }}>New listing · goes live immediately</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
                <X size={15} style={{ color: "#94A3B8" }} />
              </button>
            </div>

            <form onSubmit={handleAddJob} className="px-6 py-6 space-y-5">

              {/* Job Title */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Job Title *</label>
                <input
                  required
                  placeholder="e.g. Senior Interior Designer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6A3D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                />
              </div>

              {/* Studio */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Studio / Company *</label>
                <input
                  required
                  placeholder="e.g. DesignCraft Studios"
                  value={form.studio}
                  onChange={(e) => setForm({ ...form, studio: e.target.value })}
                  style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6A3D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                />
              </div>

              {/* Location + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Location *</label>
                  <div className="relative">
                    <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px 10px 34px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none", appearance: "none" }}
                    >
                      {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#64748B" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Job Type *</label>
                  <div className="relative">
                    <Briefcase size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }} />
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as JobType })}
                      style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px 10px 34px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none", appearance: "none" }}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#64748B" }} />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Salary / Stipend</label>
                <input
                  placeholder="e.g. ₹12–18 LPA or ₹20,000/mo"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6A3D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Description *</label>
                <textarea
                  required rows={3}
                  placeholder="Describe the role and responsibilities..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none", resize: "none", lineHeight: 1.6 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6A3D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                />
              </div>

              {/* Requirements */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Requirements</label>
                <textarea
                  rows={3}
                  placeholder={"One per line:\n5+ years experience\nRevit proficiency"}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", color: "#F1F5F9", outline: "none", resize: "none", lineHeight: 1.6 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6A3D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#334155")}
                />
                <p style={{ fontSize: "0.7rem", color: "#475569", marginTop: 4 }}>One requirement per line</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{ background: "#1E293B", border: "1px solid #334155", color: "#94A3B8" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
                  style={{ background: "#FF6A3D", color: "#fff", boxShadow: "0 4px 14px rgba(255,106,61,0.35)" }}
                >
                  Post Job →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
