import { ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { ENROLLED_COURSES } from "../data/designerData";

const ACCENT = "#8b5cf6";

const LEVEL_COLOR: Record<string, { bg: string; color: string }> = {
  Beginner:     { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  Intermediate: { bg: "rgba(245,158,11,0.1)",  color: "#d97706" },
  Advanced:     { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
};

export function DesignerCoursesPage() {
  const inProgress = ENROLLED_COURSES.filter(c => !c.completed);
  const completed  = ENROLLED_COURSES.filter(c => c.completed);

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-8">
      <div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>My Courses</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{inProgress.length} in progress · {completed.length} completed</p>
      </div>

      {/* In Progress */}
      <section>
        <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
          <Clock style={{ color: ACCENT, width: 16, height: 16 }} /> In Progress
        </h3>
        <div className="space-y-4">
          {inProgress.map((course) => {
            const lv = LEVEL_COLOR[course.level] ?? LEVEL_COLOR.Intermediate;
            return (
              <div key={course.id} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{course.title}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{course.provider}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: lv.bg, color: lv.color }}>{course.level}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white flex-shrink-0" style={{ background: ACCENT }}>
                    Resume <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{course.modulesComplete} of {course.totalModules} modules complete</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT }}>{course.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${ACCENT}, #6d28d9)` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Completed */}
      <section>
        <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
          <CheckCircle2 style={{ color: "#10b981", width: 16, height: 16 }} /> Completed
        </h3>
        <div className="space-y-3">
          {completed.map((course) => (
            <div key={course.id} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)" }}>
                <CheckCircle2 style={{ color: "#10b981", width: 20, height: 20 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{course.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{course.provider} · {course.totalModules} modules · Completed</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                ✓ Done
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
