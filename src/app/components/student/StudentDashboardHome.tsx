import { Link } from "react-router";
import { ClipboardList, GraduationCap, Briefcase, Clock, BookOpen, TrendingUp, ChevronRight, Building2, MapPin } from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

const DUE_ASSIGNMENTS = [
  { id: "A1", course: "Green Building Materials", courseColor: "#10b981", title: "Module 3 Reflection: Sustainable Cement & Concrete", dueDate: "Jun 2, 2026", daysLeft: 15 },
  { id: "A2", course: "BIM for Interior Designers", courseColor: "#6366f1", title: "BIM Assignment: Floor Plan Modelling", dueDate: "Jun 5, 2026", daysLeft: 18 },
];

const COURSES = [
  { id: "C1", title: "Green Building Materials", instructor: "Prof. Suresh Nair", progress: 68, totalModules: 9, completedModules: 6, color: "#10b981" },
  { id: "C2", title: "BIM for Interior Designers", instructor: "DesignTech India", progress: 35, totalModules: 8, completedModules: 3, color: "#6366f1" },
  { id: "C3", title: "Sustainable Architecture", instructor: "RICS SBE", progress: 10, totalModules: 10, completedModules: 1, color: "#f59e0b" },
];

const RECOMMENDED_JOBS = [
  { id: "J1", title: "Junior Interior Designer Intern", company: "Studio Symbiosis", location: "Bangalore", type: "Internship" },
  { id: "J2", title: "Material Consultant Trainee", company: "BuildPro Pvt Ltd", location: "Hyderabad", type: "Internship" },
  { id: "J3", title: "Architectural Draftsman", company: "Creative Spaces Studio", location: "Mumbai", type: "Full-time" },
];

function urgencyColor(days: number) {
  if (days <= 3) return { color: "#ef4444", bg: "rgba(239,68,68,0.1)" };
  if (days <= 7) return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" };
  return { color: "#10b981", bg: "rgba(16,185,129,0.1)" };
}

export function StudentDashboardHome() {
  return (
    <div className="p-4 sm:p-6 max-w-[920px] mx-auto space-y-8">

      {/* Welcome */}
      <div>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>Good morning, Priya 👋</h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
          Monday, 18 May 2026 · Here's what needs your attention today.
        </p>
      </div>

      {/* Stats strip */}
      <div id="tour-stats" className="grid grid-cols-3 gap-3">
        <Link
          to="/s/courses"
          className="rounded-2xl p-4 flex flex-col gap-1 transition-all hover:shadow-md"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          <GraduationCap style={{ width: 20, height: 20, color: "#a855f7" }} />
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>3</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Courses Enrolled</div>
        </Link>

        <Link
          to="/s/assignments"
          className="rounded-2xl p-4 flex flex-col gap-1 transition-all hover:shadow-md"
          style={{ background: `rgba(${ACCENT_RGB},0.07)`, border: `1px solid rgba(${ACCENT_RGB},0.2)` }}
        >
          <ClipboardList style={{ width: 20, height: 20, color: ACCENT }} />
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: ACCENT, lineHeight: 1 }}>2</div>
          <div style={{ fontSize: "0.72rem", color: ACCENT, fontWeight: 600 }}>Assignments Due</div>
        </Link>

        <Link
          to="/s/jobs"
          className="rounded-2xl p-4 flex flex-col gap-1 transition-all hover:shadow-md"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          <Briefcase style={{ width: 20, height: 20, color: "#f59e0b" }} />
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>5</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Jobs Applied</div>
        </Link>
      </div>

      {/* Due this week */}
      <div id="tour-due-this-week" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Due This Week</span>
          </div>
          <Link to="/s/assignments" style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }} className="flex items-center gap-1">
            See all <ChevronRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>

        {DUE_ASSIGNMENTS.map((a) => {
          const urg = urgencyColor(a.daysLeft);
          return (
            <div
              key={a.id}
              className="rounded-2xl p-4 flex items-start gap-4"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{ background: `${a.courseColor}18`, color: a.courseColor }}
                  >
                    {a.course}
                  </span>
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: urg.bg, color: urg.color }}
                  >
                    <Clock style={{ width: 9, height: 9 }} />
                    {a.daysLeft}d left
                  </span>
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{a.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Due {a.dueDate}</div>
              </div>
              <button
                className="flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
              >
                Submit
              </button>
            </div>
          );
        })}
      </div>

      {/* Continue Learning */}
      <div id="tour-continue-learning" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Continue Learning</span>
          </div>
          <Link to="/s/courses" style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }} className="flex items-center gap-1">
            My Courses <ChevronRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {COURSES.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div style={{ height: 4, background: c.color }} />
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{c.instructor}</div>
                </div>
                <div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "rgba(0,0,0,0.06)" }}>
                    <div style={{ height: "100%", width: `${c.progress}%`, background: c.color, borderRadius: 999 }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{c.completedModules}/{c.totalModules} modules</span>
                    <span style={{ fontSize: "0.68rem", color: c.color, fontWeight: 700 }}>{c.progress}%</span>
                  </div>
                </div>
                <button
                  className="text-left text-xs font-semibold flex items-center gap-1 mt-auto"
                  style={{ color: c.color }}
                >
                  Continue <ChevronRight style={{ width: 12, height: 12 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Jobs */}
      <div id="tour-recommended-jobs" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Recommended for You</span>
          </div>
          <Link to="/s/jobs" style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }} className="flex items-center gap-1">
            Browse all <ChevronRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>

        <div className="space-y-2">
          {RECOMMENDED_JOBS.map((j) => (
            <div
              key={j.id}
              className="rounded-xl px-4 py-3.5 flex items-center gap-4"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <Building2 style={{ width: 11, height: 11 }} />{j.company}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <MapPin style={{ width: 11, height: 11 }} />{j.location}
                  </span>
                </div>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0"
                style={{
                  background: j.type === "Internship" ? `rgba(${ACCENT_RGB},0.1)` : "rgba(8,145,178,0.1)",
                  color: j.type === "Internship" ? ACCENT : "#0891b2",
                }}
              >
                {j.type}
              </span>
              <button
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border"
                style={{ borderColor: `rgba(${ACCENT_RGB},0.3)`, color: ACCENT }}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
