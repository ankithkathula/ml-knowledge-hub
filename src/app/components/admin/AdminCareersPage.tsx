import { useState } from "react";
import { Plus, MapPin, Briefcase, Clock, Users, CheckCircle, XCircle, Eye, Edit2 } from "lucide-react";

type JobStatus = "open" | "closed" | "draft";
type Department = "Engineering" | "Design" | "Marketing" | "Sales" | "Operations" | "Content" | "Product";

interface InternalJob {
  id: number;
  title: string;
  department: Department;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  applications: number;
  shortlisted: number;
  postedDate: string;
  status: JobStatus;
}

const JOBS: InternalJob[] = [
  { id: 1,  title: "Senior Full-Stack Engineer",      department: "Engineering",  location: "Mumbai (Hybrid)",   type: "Full-time",  applications: 124, shortlisted: 8,  postedDate: "2026-05-01", status: "open" },
  { id: 2,  title: "React Native Developer",          department: "Engineering",  location: "Bangalore (Remote)",type: "Full-time",  applications: 87,  shortlisted: 6,  postedDate: "2026-05-05", status: "open" },
  { id: 3,  title: "Product Designer (UX/UI)",        department: "Design",       location: "Mumbai (On-site)",  type: "Full-time",  applications: 203, shortlisted: 12, postedDate: "2026-04-20", status: "open" },
  { id: 4,  title: "Growth Marketing Manager",        department: "Marketing",    location: "Mumbai (Hybrid)",   type: "Full-time",  applications: 156, shortlisted: 9,  postedDate: "2026-04-25", status: "open" },
  { id: 5,  title: "Enterprise Sales Executive",      department: "Sales",        location: "Delhi (On-site)",   type: "Full-time",  applications: 92,  shortlisted: 5,  postedDate: "2026-05-08", status: "open" },
  { id: 6,  title: "Content Strategist",              department: "Content",      location: "Remote",            type: "Full-time",  applications: 74,  shortlisted: 4,  postedDate: "2026-05-10", status: "open" },
  { id: 7,  title: "Product Manager – Platform",      department: "Product",      location: "Mumbai (Hybrid)",   type: "Full-time",  applications: 189, shortlisted: 11, postedDate: "2026-04-15", status: "open" },
  { id: 8,  title: "Operations Analyst",              department: "Operations",   location: "Mumbai (On-site)",  type: "Full-time",  applications: 63,  shortlisted: 3,  postedDate: "2026-05-12", status: "open" },
  { id: 9,  title: "Frontend Intern (React)",         department: "Engineering",  location: "Bangalore (Hybrid)",type: "Internship", applications: 312, shortlisted: 15, postedDate: "2026-05-14", status: "open" },
  { id: 10, title: "Brand Partnerships Lead",         department: "Sales",        location: "Mumbai (Hybrid)",   type: "Full-time",  applications: 48,  shortlisted: 2,  postedDate: "2026-04-10", status: "closed" },
  { id: 11, title: "DevOps Engineer",                 department: "Engineering",  location: "Remote",            type: "Full-time",  applications: 0,   shortlisted: 0,  postedDate: "2026-05-17", status: "draft" },
];

const DEPT_COLORS: Record<Department, string> = {
  Engineering:  "#3b82f6",
  Design:       "#8b5cf6",
  Marketing:    "#f59e0b",
  Sales:        "#22c55e",
  Operations:   "#64748b",
  Content:      "#ec4899",
  Product:      "#ff6a3d",
};

const STATUS_STYLE: Record<JobStatus, { bg: string; color: string; label: string }> = {
  open:   { bg: "rgba(34,197,94,0.1)",  color: "#16a34a", label: "Open" },
  closed: { bg: "rgba(148,163,184,0.1)",color: "#64748b", label: "Closed" },
  draft:  { bg: "rgba(234,179,8,0.1)",  color: "#ca8a04", label: "Draft" },
};

export function AdminCareersPage() {
  const [filter, setFilter] = useState<JobStatus | "all">("all");
  const [deptFilter, setDeptFilter] = useState<Department | "all">("all");

  const openJobs  = JOBS.filter((j) => j.status === "open").length;
  const totalApps = JOBS.reduce((s, j) => s + j.applications, 0);
  const allDepts  = Array.from(new Set(JOBS.map((j) => j.department)));

  const visible = JOBS.filter((j) => {
    if (filter !== "all" && j.status !== filter) return false;
    if (deptFilter !== "all" && j.department !== deptFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Careers at Material Library</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Internal hiring board — manage ML team openings and applications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>
          <Plus className="w-4 h-4" /> Post Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Open Positions",   val: openJobs,         color: "#ff6a3d" },
          { label: "Total Applicants", val: totalApps.toLocaleString(), color: "#3b82f6" },
          { label: "Shortlisted",      val: JOBS.reduce((s, j) => s + j.shortlisted, 0), color: "#22c55e" },
          { label: "Departments Hiring", val: allDepts.length, color: "#8b5cf6" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.val}</p>
            <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Dept distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {allDepts.map((dept) => {
          const count = JOBS.filter((j) => j.department === dept && j.status === "open").length;
          return (
            <div
              key={dept}
              className="rounded-xl p-3 text-center cursor-pointer transition-all"
              style={{ background: deptFilter === dept ? DEPT_COLORS[dept] + "18" : "white", border: `1px solid ${deptFilter === dept ? DEPT_COLORS[dept] + "50" : "rgba(0,0,0,0.06)"}` }}
              onClick={() => setDeptFilter(deptFilter === dept ? "all" : dept)}
            >
              <p style={{ fontSize: "1.3rem", fontWeight: 800, color: DEPT_COLORS[dept] }}>{count}</p>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-muted)" }}>{dept}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {(["all", "open", "draft", "closed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
            style={{
              background: filter === s ? "#ff6a3d" : "white",
              color: filter === s ? "white" : "var(--text-secondary)",
              border: filter === s ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {s === "all" ? "All" : STATUS_STYLE[s as JobStatus]?.label}
          </button>
        ))}
      </div>

      {/* Jobs table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {["Job Title", "Dept", "Location", "Type", "Applications", "Shortlisted", "Posted", "Status", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((job, i) => {
              const { bg, color, label } = STATUS_STYLE[job.status];
              return (
                <tr key={job.id} style={{ borderBottom: i < visible.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                  <td className="px-4 py-3.5" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{job.title}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: DEPT_COLORS[job.department] + "14", color: DEPT_COLORS[job.department] }}>{job.department}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                      <MapPin className="w-3 h-3 flex-shrink-0" />{job.location}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{job.type}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      <Users className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />{job.applications}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#16a34a" }}>
                      <CheckCircle className="w-3.5 h-3.5" />{job.shortlisted}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{job.postedDate}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: bg, color }}>{label}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"><Eye className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"><Edit2 className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
