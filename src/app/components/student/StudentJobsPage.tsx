import { useState } from "react";
import { MapPin, Building2, Briefcase, Search, BookmarkPlus, Bookmark, CheckCircle2, Clock, Calendar, X } from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

type JobTab = "browse" | "applied" | "drives";
type JobType = "All" | "Internship" | "Full-time" | "Contract";
type AppStatus = "Applied" | "Shortlisted" | "Interview" | "Offered" | "Rejected";
type DriveEligibility = "eligible" | "not_eligible" | "applied";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Internship" | "Full-time" | "Contract";
  stipend?: string;
  salary?: string;
  skills: string[];
  posted: string;
}

interface AppliedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  appliedDate: string;
  status: AppStatus;
}

interface PlacementDrive {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  type: string;
  eligibility: DriveEligibility;
  package?: string;
  stipend?: string;
  slots: number;
}

const STATUS_CONFIG: Record<AppStatus, { color: string; bg: string }> = {
  Applied:     { color: "#6366f1", bg: `rgba(${ACCENT_RGB},0.1)` },
  Shortlisted: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  Interview:   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Offered:     { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Rejected:    { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  Internship: { color: ACCENT, bg: `rgba(${ACCENT_RGB},0.1)` },
  "Full-time": { color: "#0891b2", bg: "rgba(8,145,178,0.1)" },
  Contract:   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

const BROWSE_JOBS: Job[] = [
  { id: "B1", title: "Junior Interior Designer Intern", company: "Studio Symbiosis", location: "Bangalore", type: "Internship", stipend: "₹15,000/mo", skills: ["AutoCAD", "SketchUp", "Material Spec"], posted: "2d ago" },
  { id: "B2", title: "Material Consultant Trainee", company: "BuildPro Pvt Ltd", location: "Hyderabad", type: "Internship", stipend: "₹12,000/mo", skills: ["Material Knowledge", "Site Visits", "Excel"], posted: "4d ago" },
  { id: "B3", title: "Architectural Draftsman", company: "Creative Spaces Studio", location: "Mumbai", type: "Full-time", salary: "₹3.2–4 LPA", skills: ["AutoCAD", "Revit", "BIM"], posted: "1w ago" },
  { id: "B4", title: "Sustainable Design Associate", company: "GreenBuild Architects", location: "Delhi", type: "Full-time", salary: "₹3.8–5 LPA", skills: ["LEED", "Passive Design", "Energy Modelling"], posted: "1w ago" },
  { id: "B5", title: "Design Research Intern", company: "Morphogenesis", location: "Delhi", type: "Internship", stipend: "₹20,000/mo", skills: ["Research", "Revit", "Presentation"], posted: "3d ago" },
  { id: "B6", title: "Product Specification Writer", company: "MaterialKart", location: "Bangalore (Remote)", type: "Contract", stipend: "₹18,000/mo", skills: ["Technical Writing", "Material Science", "Content"], posted: "5d ago" },
];

const APPLIED_JOBS: AppliedJob[] = [
  { id: "AP1", title: "Senior Interior Designer", company: "Livspace", location: "Bangalore", type: "Full-time", appliedDate: "May 10, 2026", status: "Shortlisted" },
  { id: "AP2", title: "Material Consultant", company: "BuildPro Pvt Ltd", location: "Hyderabad", type: "Internship", appliedDate: "May 5, 2026", status: "Interview" },
  { id: "AP3", title: "Junior Architect", company: "Studio Symbiosis", location: "Delhi", type: "Full-time", appliedDate: "Apr 28, 2026", status: "Applied" },
  { id: "AP4", title: "BIM Coordinator Intern", company: "DesignTech India", location: "Pune", type: "Internship", appliedDate: "Apr 20, 2026", status: "Rejected" },
  { id: "AP5", title: "Design Intern", company: "Kajaria Ceramics", location: "Delhi", type: "Internship", appliedDate: "Apr 15, 2026", status: "Applied" },
];

const DRIVES: PlacementDrive[] = [
  { id: "D1", company: "Morphogenesis", role: "Architecture Graduate — Design Team", date: "Jun 15, 2026", location: "Delhi (On-campus)", type: "Full-time", eligibility: "eligible", package: "₹5.5–7 LPA", slots: 4 },
  { id: "D2", company: "Livspace", role: "Interior Design Internship", date: "Jun 22, 2026", location: "Bangalore (Virtual)", type: "Internship", eligibility: "applied", stipend: "₹18,000/mo", slots: 12 },
  { id: "D3", company: "Godrej Properties", role: "Graduate Engineer Trainee", date: "Jul 5, 2026", location: "Mumbai (On-campus)", type: "Full-time", eligibility: "not_eligible", package: "₹4.5 LPA", slots: 8 },
  { id: "D4", company: "Asian Paints", role: "Material Specification Intern", date: "Jul 18, 2026", location: "Mumbai (Hybrid)", type: "Internship", eligibility: "eligible", stipend: "₹15,000/mo", slots: 6 },
];

const TYPE_FILTERS: JobType[] = ["All", "Internship", "Full-time", "Contract"];

const TABS: Array<{ key: JobTab; label: string; count: number }> = [
  { key: "browse",  label: "Browse",         count: BROWSE_JOBS.length },
  { key: "applied", label: "Applied",        count: APPLIED_JOBS.length },
  { key: "drives",  label: "Campus Drives",  count: DRIVES.length },
];

export function StudentJobsPage() {
  const [tab, setTab] = useState<JobTab>("browse");
  const [typeFilter, setTypeFilter] = useState<JobType>("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtered = BROWSE_JOBS.filter((j) => {
    const matchType = typeFilter === "All" || j.type === typeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-6">

      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Jobs & Placements</h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 3 }}>
          {BROWSE_JOBS.length} opportunities · {APPLIED_JOBS.length} applications sent
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0"
              style={{ background: active ? ACCENT : "rgba(0,0,0,0.05)", color: active ? "white" : "var(--text-secondary)" }}
            >
              {t.label}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)", color: active ? "white" : "var(--text-muted)" }}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Browse tab */}
      {tab === "browse" && (
        <div className="space-y-4">
          <div className="relative">
            <Search style={{ width: 15, height: 15, position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs or companies…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              style={{ border: "1px solid rgba(0,0,0,0.1)", outline: "none", background: "white", color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: typeFilter === f ? ACCENT : "rgba(0,0,0,0.05)", color: typeFilter === f ? "white" : "var(--text-secondary)" }}
              >
                {f}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
              <Briefcase style={{ width: 32, height: 32, margin: "0 auto 10px", opacity: 0.25 }} />
              <p style={{ fontSize: "0.88rem" }}>No jobs match your search</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((j) => {
                const saved = savedIds.includes(j.id);
                const tc = TYPE_COLORS[j.type] ?? TYPE_COLORS.Internship;
                return (
                  <div
                    key={j.id}
                    className="rounded-2xl p-5"
                    style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: tc.bg, color: tc.color }}>{j.type}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap mb-3">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        <Building2 style={{ width: 12, height: 12 }} />{j.company}
                      </span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        <MapPin style={{ width: 12, height: 12 }} />{j.location}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {j.stipend ?? j.salary}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {j.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-[10px]" style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}>{s}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Posted {j.posted}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSave(j.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: saved ? `rgba(${ACCENT_RGB},0.1)` : "rgba(0,0,0,0.04)",
                            color: saved ? ACCENT : "var(--text-muted)",
                          }}
                        >
                          {saved ? <Bookmark style={{ width: 12, height: 12 }} /> : <BookmarkPlus style={{ width: 12, height: 12 }} />}
                          {saved ? "Saved" : "Save"}
                        </button>
                        <button
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold"
                          style={{ background: ACCENT, color: "white" }}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Applied tab */}
      {tab === "applied" && (
        <div className="space-y-3">
          {APPLIED_JOBS.map((j) => {
            const st = STATUS_CONFIG[j.status];
            const tc = TYPE_COLORS[j.type] ?? TYPE_COLORS.Internship;
            return (
              <div
                key={j.id}
                className="rounded-2xl p-4 flex items-start gap-4"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <Building2 style={{ width: 11, height: 11 }} />{j.company}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <MapPin style={{ width: 11, height: 11 }} />{j.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px]" style={{ background: tc.bg, color: tc.color }}>{j.type}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Applied {j.appliedDate}</span>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ background: st.bg, color: st.color }}
                >
                  {j.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Campus Drives tab */}
      {tab === "drives" && (
        <div className="space-y-3">
          {DRIVES.map((d) => {
            const eligible = d.eligibility === "eligible";
            const applied = d.eligibility === "applied";
            const notEligible = d.eligibility === "not_eligible";
            return (
              <div
                key={d.id}
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div style={{ fontSize: "0.98rem", fontWeight: 800, color: "var(--text-primary)" }}>{d.company}</div>
                  {eligible && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                      <CheckCircle2 style={{ width: 11, height: 11 }} />Eligible
                    </span>
                  )}
                  {applied && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0" style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}>
                      <CheckCircle2 style={{ width: 11, height: 11 }} />Applied
                    </span>
                  )}
                  {notEligible && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                      <X style={{ width: 11, height: 11 }} />Not Eligible
                    </span>
                  )}
                </div>

                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 }}>{d.role}</div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                  <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    <Calendar style={{ width: 12, height: 12, color: ACCENT }} />{d.date}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    <MapPin style={{ width: 12, height: 12, color: ACCENT }} />{d.location}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                    {d.package ?? d.stipend}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px]" style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}>{d.type}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.slots} slots</span>
                </div>

                <div>
                  {eligible && (
                    <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: ACCENT, color: "white" }}>
                      Apply Now
                    </button>
                  )}
                  {applied && (
                    <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}>
                      View Details
                    </button>
                  )}
                  {notEligible && (
                    <button disabled className="px-4 py-2 rounded-xl text-xs font-semibold cursor-not-allowed" style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}>
                      Not Eligible
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
