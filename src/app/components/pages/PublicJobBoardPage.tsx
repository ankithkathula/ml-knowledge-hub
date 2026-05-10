import { useState } from "react";
import { Link } from "react-router";
import {
  Search, MapPin, Briefcase, Users, Clock, Star, Filter,
  ChevronDown, Building2, ArrowRight, TrendingUp
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type JobType = "Full-time" | "Part-time" | "Internship" | "Contract";

interface PublicJob {
  id: number;
  title: string;
  studio: string;
  location: string;
  type: JobType;
  salary: string;
  posted: string;
  applicants: number;
  featured: boolean;
  category: string;
}

const mockJobs: PublicJob[] = [
  { id: 1, title: "Senior Architect", studio: "DesignCraft Studios", location: "Mumbai, MH", type: "Full-time", salary: "₹18-25 LPA", posted: "2 days ago", applicants: 34, featured: true, category: "Architecture" },
  { id: 2, title: "Interior Design Intern", studio: "SpaceForm Architects", location: "Delhi, DL", type: "Internship", salary: "₹15,000/mo", posted: "4 days ago", applicants: 67, featured: false, category: "Interior" },
  { id: 3, title: "Structural Engineer", studio: "BuildRight Engineering", location: "Bengaluru, KA", type: "Full-time", salary: "₹12-18 LPA", posted: "1 day ago", applicants: 21, featured: true, category: "Engineering" },
  { id: 4, title: "BIM Coordinator", studio: "NexGen Constructions", location: "Hyderabad, TG", type: "Full-time", salary: "₹10-15 LPA", posted: "3 days ago", applicants: 15, featured: true, category: "BIM" },
  { id: 5, title: "Landscape Architect", studio: "GreenScape Design", location: "Pune, MH", type: "Contract", salary: "₹8-12 LPA", posted: "1 week ago", applicants: 9, featured: false, category: "Architecture" },
  { id: 6, title: "Project Manager", studio: "UrbanEdge Architects", location: "Chennai, TN", type: "Full-time", salary: "₹15-22 LPA", posted: "5 days ago", applicants: 28, featured: false, category: "Management" },
  { id: 7, title: "CAD Drafter", studio: "PrecisionBuild", location: "Jaipur, RJ", type: "Part-time", salary: "₹25,000/mo", posted: "1 day ago", applicants: 12, featured: false, category: "BIM" },
  { id: 8, title: "Sustainability Consultant", studio: "EcoDesign Partners", location: "Gurugram, HR", type: "Full-time", salary: "₹14-20 LPA", posted: "3 days ago", applicants: 18, featured: true, category: "Sustainability" },
  { id: 9, title: "3D Visualization Artist", studio: "RenderWorks Studio", location: "Mumbai, MH", type: "Contract", salary: "₹6-10 LPA", posted: "2 days ago", applicants: 42, featured: false, category: "Design" },
  { id: 10, title: "MEP Engineer", studio: "TechBuild Systems", location: "Bengaluru, KA", type: "Full-time", salary: "₹10-16 LPA", posted: "1 week ago", applicants: 11, featured: false, category: "Engineering" },
];

const typeColors: Record<JobType, { color: string; bg: string }> = {
  "Full-time": { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  "Part-time": { color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  Internship: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Contract: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

const categories = ["All", "Architecture", "Engineering", "Interior", "BIM", "Sustainability", "Management", "Design"];

export function PublicJobBoardPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobType | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const locations = ["All", ...new Set(mockJobs.map((j) => j.location))];

  const featured = mockJobs.filter((j) => j.featured);
  const filtered = mockJobs.filter((j) => {
    if (typeFilter !== "All" && j.type !== typeFilter) return false;
    if (categoryFilter !== "All" && j.category !== categoryFilter) return false;
    if (locationFilter !== "All" && j.location !== locationFilter) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.studio.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,106,61,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.15 }}>
            Find Your Next Role in<br />
            <span style={{ color: "var(--accent)" }}>Construction & Design</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: 12, maxWidth: 560, marginInline: "auto" }}>
            Explore opportunities from top studios and firms across India
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-12 py-3 text-base rounded-xl" placeholder="Search jobs, studios, or skills..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { label: "Jobs", value: "200+" },
              { label: "Studios", value: "50+" },
              { label: "Cities", value: "15" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent)" }}>{s.value}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
        {/* Featured Jobs */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Featured Opportunities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((j) => (
                <div key={j.id} className="glass-card hover-lift rounded-xl p-5" style={{ borderLeft: "3px solid var(--accent)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <Building2 size={20} style={{ color: "var(--text-muted)" }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{j.studio}</p>
                      </div>
                    </div>
                    <Star size={16} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><MapPin size={13} />{j.location}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: typeColors[j.type].bg, color: typeColors[j.type].color }}>{j.type}</span>
                    <span className="font-semibold" style={{ color: "var(--accent)" }}>{j.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Users size={12} />{j.applicants} applicants</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{j.posted}</span>
                    </div>
                    <Link to="/u/jobs" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                      View & Apply <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex flex-col sm:flex-row gap-3">
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
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                {locations.map((l) => <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setCategoryFilter(c)} className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors" style={{ background: categoryFilter === c ? "var(--accent)" : "rgba(255,255,255,0.05)", color: categoryFilter === c ? "#fff" : "var(--text-secondary)" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((j) => (
            <div key={j.id} className="glass-card hover-lift rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Building2 size={18} style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</h3>
                  <p className="truncate" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{j.studio}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-3" style={{ fontSize: "0.8rem" }}>
                <span className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}><MapPin size={12} />{j.location}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: typeColors[j.type].bg, color: typeColors[j.type].color }}>{j.type}</span>
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>{j.salary}</p>
              <div className="flex items-center justify-between" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Users size={12} />{j.applicants}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{j.posted}</span>
                </div>
                <Link to="/u/jobs" className="flex items-center gap-1 font-semibold" style={{ color: "var(--accent)" }}>
                  Apply <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <Briefcase size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
