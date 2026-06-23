import { useState } from "react";
import { ClipboardList, Clock, CheckCircle2, Star, AlertCircle } from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

type AssignmentStatus = "pending" | "submitted" | "graded";
type AssignmentTab = "due" | "submitted" | "graded";

interface Assignment {
  id: string;
  course: string;
  courseColor: string;
  title: string;
  description: string;
  dueDate: string;
  daysLeft?: number;
  submittedOn?: string;
  grade?: string;
  gradePoints?: number;
  maxPoints?: number;
  status: AssignmentStatus;
  feedback?: string;
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: "A1", course: "Green Building Materials", courseColor: "#10b981",
    title: "Module 3 Reflection: Sustainable Cement & Concrete",
    description: "Write a 600-word reflection on the environmental impact of OPC vs PPC cement based on the module readings.",
    dueDate: "Jun 2, 2026", daysLeft: 15, status: "pending",
  },
  {
    id: "A2", course: "BIM for Interior Designers", courseColor: "#6366f1",
    title: "BIM Assignment: Floor Plan Modelling",
    description: "Model a 3BHK apartment floor plan in Revit/BricsCAD using the provided specifications and export IFC file.",
    dueDate: "Jun 5, 2026", daysLeft: 18, status: "pending",
  },
  {
    id: "A3", course: "Green Building Materials", courseColor: "#10b981",
    title: "Research Paper: AAC Blocks in Modern Construction",
    description: "2000-word paper comparing AAC block thermal performance across 3 case studies.",
    dueDate: "May 30, 2026", submittedOn: "May 28, 2026", status: "submitted",
  },
  {
    id: "A4", course: "Sustainable Architecture", courseColor: "#f59e0b",
    title: "Site Analysis Report: Bioclimatic Design",
    description: "Analyse a local building site for passive solar design potential.",
    dueDate: "May 25, 2026", submittedOn: "May 24, 2026", status: "submitted",
  },
  {
    id: "A5", course: "BIM for Interior Designers", courseColor: "#6366f1",
    title: "Lecture Quiz: BIM Fundamentals",
    description: "20-question multiple choice quiz on BIM coordination concepts.",
    dueDate: "May 20, 2026", submittedOn: "May 19, 2026", status: "submitted",
  },
  {
    id: "A6", course: "Green Building Materials", courseColor: "#10b981",
    title: "Case Study: LEED Certified Buildings in India",
    description: "Comparative analysis of 2 LEED-certified commercial buildings in Bangalore.",
    dueDate: "May 10, 2026", submittedOn: "May 9, 2026", grade: "A", gradePoints: 92, maxPoints: 100, status: "graded",
    feedback: "Excellent analysis. Strong comparison of material choices. Could elaborate more on lifecycle cost.",
  },
  {
    id: "A7", course: "BIM for Interior Designers", courseColor: "#6366f1",
    title: "Module 1 Assignment: IFC File Review",
    description: "Review the provided IFC file and annotate 5 coordination issues.",
    dueDate: "Apr 28, 2026", submittedOn: "Apr 27, 2026", grade: "B+", gradePoints: 84, maxPoints: 100, status: "graded",
    feedback: "Good identification of issues. Work on precision in your annotations.",
  },
  {
    id: "A8", course: "Sustainable Architecture", courseColor: "#f59e0b",
    title: "Introduction Quiz: Sustainable Design Principles",
    description: "15-question quiz on passive design strategies and sustainability frameworks.",
    dueDate: "Apr 15, 2026", submittedOn: "Apr 15, 2026", grade: "A+", gradePoints: 98, maxPoints: 100, status: "graded",
    feedback: "Near-perfect score. Excellent grasp of passive cooling concepts.",
  },
];

const STATUS_MAP: Record<AssignmentTab, AssignmentStatus> = { due: "pending", submitted: "submitted", graded: "graded" };

const TABS: Array<{ key: AssignmentTab; label: string }> = [
  { key: "due",       label: "Due Soon" },
  { key: "submitted", label: "Submitted" },
  { key: "graded",    label: "Graded" },
];

function urgencyStyle(days: number | undefined) {
  if (!days) return { color: "#6b7280", bg: "rgba(107,114,128,0.1)" };
  if (days <= 3) return { color: "#ef4444", bg: "rgba(239,68,68,0.1)" };
  if (days <= 7) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" };
  return { color: "#10b981", bg: "rgba(16,185,129,0.1)" };
}

function gradeStyle(grade: string) {
  if (grade === "A+" || grade === "A") return { color: "#10b981", bg: "rgba(16,185,129,0.12)" };
  if (grade.startsWith("B")) return { color: "#6366f1", bg: `rgba(${ACCENT_RGB},0.12)` };
  return { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
}

export function StudentAssignmentsPage() {
  const [tab, setTab] = useState<AssignmentTab>("due");

  const status = STATUS_MAP[tab];
  const filtered = ASSIGNMENTS.filter((a) => a.status === status);

  return (
    <div className="p-4 sm:p-6 max-w-[860px] mx-auto space-y-6">

      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Assignments</h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 3 }}>
          Track, submit and review your course assignments
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => {
          const count = ASSIGNMENTS.filter((a) => a.status === STATUS_MAP[t.key]).length;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: active ? ACCENT : "rgba(0,0,0,0.05)", color: active ? "white" : "var(--text-secondary)" }}
            >
              {t.label}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)", color: active ? "white" : "var(--text-muted)" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.25 }} />
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>No assignments here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl p-5"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              {/* Course pill + status badge row */}
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <span
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                  style={{ background: `${a.courseColor}18`, color: a.courseColor }}
                >
                  {a.course}
                </span>

                {a.status === "pending" && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={urgencyStyle(a.daysLeft)}
                  >
                    <Clock style={{ width: 10, height: 10 }} />
                    {a.daysLeft}d left
                  </span>
                )}
                {a.status === "submitted" && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ color: "#10b981", background: "rgba(16,185,129,0.1)" }}>
                    <CheckCircle2 style={{ width: 10, height: 10 }} />
                    Submitted
                  </span>
                )}
                {a.status === "graded" && a.grade && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={gradeStyle(a.grade)}
                  >
                    <Star style={{ width: 10, height: 10 }} />
                    {a.grade} · {a.gradePoints}/{a.maxPoints}
                  </span>
                )}
              </div>

              {/* Title + description */}
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{a.title}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }} className="line-clamp-2">{a.description}</div>

              {/* Date info */}
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 10 }}>
                {a.status === "pending" && `Due ${a.dueDate}`}
                {a.status === "submitted" && (
                  <span className="flex items-center gap-1.5">
                    <AlertCircle style={{ width: 11, height: 11, color: "#f59e0b" }} />
                    Submitted on {a.submittedOn} · Awaiting grade…
                  </span>
                )}
                {a.status === "graded" && `Submitted ${a.submittedOn}`}
              </div>

              {/* Feedback */}
              {a.status === "graded" && a.feedback && (
                <div
                  className="mt-3 px-3 py-2.5 rounded-xl italic"
                  style={{ borderLeft: `3px solid rgba(${ACCENT_RGB},0.4)`, background: `rgba(${ACCENT_RGB},0.04)`, fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}
                >
                  "{a.feedback}"
                </div>
              )}

              {/* CTA */}
              <div className="mt-4">
                {a.status === "pending" && (
                  <button
                    className="px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                  >
                    Submit Assignment →
                  </button>
                )}
                {a.status === "submitted" && (
                  <button
                    className="px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)", border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    View Submission
                  </button>
                )}
                {a.status === "graded" && (
                  <button
                    className="px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                  >
                    View Feedback
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
