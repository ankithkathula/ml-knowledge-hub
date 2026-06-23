import { useState } from "react";
import { Building2, MapPin, IndianRupee, Calendar, Filter } from "lucide-react";
import { APPLIED_JOBS } from "../data/designerData";

const ACCENT = "#8b5cf6";

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  Applied:     { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6", label: "Applied" },
  Shortlisted: { bg: "rgba(139,92,246,0.1)",  color: "#8b5cf6", label: "Shortlisted" },
  Interview:   { bg: "rgba(245,158,11,0.1)",  color: "#d97706", label: "Interview" },
  Offered:     { bg: "rgba(16,185,129,0.1)",  color: "#10b981", label: "Offered" },
  Rejected:    { bg: "rgba(239,68,68,0.1)",   color: "#ef4444", label: "Rejected" },
};

const TABS = ["All", "Applied", "Shortlisted", "Interview", "Offered", "Rejected"];

export function DesignerJobsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? APPLIED_JOBS : APPLIED_JOBS.filter(j => j.status === activeTab);

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Applied Jobs</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{APPLIED_JOBS.length} applications · {APPLIED_JOBS.filter(j => j.status === "Shortlisted" || j.status === "Interview").length} active</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `rgba(${ACCENT.slice(1)},0.08)`, color: ACCENT }}>
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab ? ACCENT : "rgba(0,0,0,0.04)",
              color: activeTab === tab ? "white" : "var(--text-secondary)",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-3">
        {filtered.map((job) => {
          const st = STATUS_STYLE[job.status] ?? STATUS_STYLE.Applied;
          return (
            <div
              key={job.id}
              className="rounded-2xl p-5 transition-all hover:scale-[1.005]"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.08)" }}>
                  <Building2 style={{ color: ACCENT, width: 24, height: 24 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500, marginTop: 2 }}>{job.studio}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <MapPin className="w-3.5 h-3.5" />{job.location}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <IndianRupee className="w-3.5 h-3.5" />{job.salary}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <Calendar className="w-3.5 h-3.5" />Applied {new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>{job.type}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>No applications with status "{activeTab}"</div>
        )}
      </div>
    </div>
  );
}
