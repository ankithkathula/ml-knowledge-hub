import { BookOpen, Users, ClipboardList, FlaskConical } from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#2563eb";

const STATS = [
  { label: "Active Courses", value: 3, icon: BookOpen, color: "#2563eb", bg: "rgba(37,99,235,0.1)" },
  { label: "Students Enrolled", value: 86, icon: Users, color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  { label: "Pending Reviews", value: 12, icon: ClipboardList, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  { label: "Research Citations", value: 47, icon: FlaskConical, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
];

const CLASSES = [
  {
    name: "Environmental Design Studio",
    section: "Sec A",
    room: "Room 301",
    schedule: "Mon & Thu 9–11 AM",
    students: 28,
    color: "#2563eb",
  },
  {
    name: "Building Construction III",
    section: "Sec B",
    room: "Room 204",
    schedule: "Tue & Fri 11 AM–1 PM",
    students: 30,
    color: "#6366f1",
  },
  {
    name: "History of Architecture II",
    section: "Sec C",
    room: "Room 101",
    schedule: "Wed 2–5 PM",
    students: 28,
    color: "#10b981",
  },
];

const SUBMISSIONS = [
  { student: "Priya Mehta", title: "Thesis Draft - Community Learning Hub", course: "Env. Design Studio", time: "30m ago", status: "Submitted", statusColor: "#f59e0b" },
  { student: "Rahul Verma", title: "Construction Detail Sheet 4", course: "Building Construction III", time: "2h ago", status: "Late", statusColor: "#ef4444" },
  { student: "Aisha Khan", title: "Precedent Study — Le Corbusier", course: "History of Arch II", time: "4h ago", status: "Submitted", statusColor: "#2563eb" },
  { student: "Karan Singh", title: "Thesis Draft - Biophilic Office", course: "Env. Design Studio", time: "1d ago", status: "Reviewed", statusColor: "#10b981" },
  { student: "Meera Pillai", title: "Material Board Assignment 2", course: "Building Construction III", time: "2d ago", status: "Reviewed", statusColor: "#10b981" },
];

const QUICK_ACTIONS = [
  { label: "Grade Assignments", color: "#f59e0b", textColor: "white" },
  { label: "Post Announcement", color: "#2563eb", textColor: "white" },
  { label: "Upload Materials", color: "#8b5cf6", textColor: "white" },
  { label: "Schedule Office Hours", color: "#10b981", textColor: "white" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function FacultyDashboardHome() {
  const authUser = getAuthUser();
  void authUser;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          {getGreeting()}, Dr. Kumar!
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
          Here's what's happening with your courses today.
        </p>
      </div>

      <div id="tour-faculty-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-4"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <Icon style={{ width: 18, height: 18, color: stat.color }} />
                </div>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        id="tour-faculty-classes"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          This Week's Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CLASSES.map((cls) => (
            <div
              key={cls.name}
              className="rounded-xl p-4"
              style={{
                borderLeft: `3px solid ${cls.color}`,
                background: "rgba(0,0,0,0.015)",
                border: `1px solid rgba(0,0,0,0.06)`,
                borderLeftColor: cls.color,
                borderLeftWidth: 3,
              }}
            >
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                {cls.name}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                <div>{cls.section} · {cls.room}</div>
                <div>{cls.schedule}</div>
              </div>
              <div
                className="mt-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: `${cls.color}15`, color: cls.color }}
              >
                {cls.students} students
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="tour-faculty-submissions"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Recent Submissions
        </h2>
        <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
          {SUBMISSIONS.map((sub, idx) => (
            <div key={idx} className="flex items-center gap-3 py-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                style={{ background: ACCENT }}
              >
                {sub.student.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                  {sub.student}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }} className="truncate">
                  {sub.title} · {sub.course}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: `${sub.statusColor}18`, color: sub.statusColor }}
                >
                  {sub.status}
                </span>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {sub.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="tour-faculty-actions"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              className="h-12 rounded-xl text-[12px] font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: action.color, color: action.textColor }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
