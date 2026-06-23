import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Briefcase, GraduationCap, Bookmark, TrendingUp,
  ArrowUpRight, MapPin, Package, Check, ChevronRight,
  Building2, IndianRupee, Calendar, Eye, Award, Star,
} from "lucide-react";
import { getAuthUser, type AuthUser } from "../../utils/auth";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

const kpiCards = [
  {
    label: "Jobs Applied",
    value: "12",
    change: "+3",
    icon: Briefcase,
    color: ACCENT,
    bg: `rgba(${ACCENT_RGB},0.1)`,
    border: `rgba(${ACCENT_RGB},0.2)`,
    sparkline: [5, 6, 7, 8, 9, 10, 12],
    href: "/u/jobs",
  },
  {
    label: "Profile Views",
    value: "89",
    change: "+18%",
    icon: Eye,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
    sparkline: [40, 55, 48, 62, 58, 70, 89],
    href: "/u/profile",
  },
  {
    label: "Courses Enrolled",
    value: "3",
    change: "+1",
    icon: GraduationCap,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
    sparkline: [1, 1, 2, 2, 2, 3, 3],
    href: "/u/courses",
  },
  {
    label: "Saved Jobs",
    value: "18",
    change: "+5",
    icon: Bookmark,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    sparkline: [8, 10, 12, 13, 15, 16, 18],
    href: "/u/bookmarks",
  },
];

const activityFeed = [
  { icon: Briefcase,     color: ACCENT,    text: "Applied for Junior Architect at DesignCraft Studio", time: "2h ago" },
  { icon: GraduationCap, color: "#a855f7", text: "Completed Module 8: Green Walls in GBCI course",      time: "5h ago" },
  { icon: Eye,           color: "#3b82f6", text: "Morphogenesis viewed your portfolio",                       time: "1d ago" },
  { icon: Package,       color: "#10b981", text: "Sample request for Kajaria tiles approved",             time: "1d ago" },
  { icon: MapPin,        color: "#f59e0b", text: "KC Visit scheduled — Asian Paints KC, Bengaluru",       time: "2d ago" },
  { icon: Star,          color: "#ec4899", text: "Received a recommendation from Dr. Ravi Kumar",         time: "3d ago" },
];

const recommendedJobs = [
  { title: "Junior Architect",     studio: "DesignCraft Studio", location: "Mumbai",    salary: "4-6 LPA",  match: 92 },
  { title: "Design Intern",        studio: "SpaceWorks India",   location: "Bangalore", salary: "15k/mo",   match: 85 },
  { title: "Architecture Intern",  studio: "Morphogenesis",          location: "Gurgaon",   salary: "20k/mo",   match: 78 },
];

const inProgressCourses = [
  { title: "Green Building Certification (GBCI)", provider: "EcoDesign Academy", progress: 65, modules: "8/12 modules" },
  { title: "Advanced Revit for Architecture",     provider: "BuildSkill Pro",     progress: 30, modules: "3/10 modules" },
];

const upcomingEvents = [
  { title: "Design Innovation Summit 2026",    date: "May 22", location: "Mumbai",      type: "Conference" },
  { title: "Morphogenesis Campus Placement Drive", date: "May 25", location: "Online",      type: "Placement"  },
  { title: "Material Clinic: Surfaces & Finishes", date: "Jun 3", location: "Bengaluru KC", type: "Workshop" },
];

const placementSteps = [
  { label: "Basic Info", done: true  },
  { label: "Education",  done: true  },
  { label: "Portfolio",  done: false },
  { label: "Skills",     done: false },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64, h = 24;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserDashboardHome() {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());

  useEffect(() => {
    const sync = () => setUser(getAuthUser());
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const firstName = user?.name.split(" ")[0] ?? "there";
  const readiness = 45;
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">

      {/* ── Placement Readiness Block ─────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF6A3D 0%, #f97316 100%)" }}
      >
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <Award style={{ width: 16, height: 16, opacity: 0.85 }} />
              <span
                style={{
                  fontSize: "0.67rem",
                  fontWeight: 700,
                  opacity: 0.85,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Placement Readiness
              </span>
            </div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.25 }}>
              {greeting}, {firstName}! You're {readiness}% ready.
            </h2>
            <p style={{ fontSize: "0.82rem", opacity: 0.85, marginTop: 6, lineHeight: 1.5 }}>
              Complete your profile to get discovered by top studios &amp; brands.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Circular progress */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg
                viewBox="0 0 80 80"
                className="w-full h-full"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="8"
                />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(readiness / 100) * circumference} ${circumference}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>
                  {readiness}%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to="/u/portfolio"
                className="px-4 py-2 rounded-xl text-[12px] font-bold text-white text-center transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.25)" }}
              >
                Upload Portfolio
              </Link>
              <Link
                to="/u/profile"
                className="px-4 py-2 rounded-xl text-[12px] font-bold text-white text-center transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Completion steps */}
        <div className="px-5 sm:px-6 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {placementSteps.map((step) => (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: step.done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                }}
              >
                {step.done && (
                  <Check style={{ width: 10, height: 10, color: "#FF6A3D" }} />
                )}
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: step.done ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                  fontWeight: step.done ? 600 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────── */}
      <div id="tour-user-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              to={kpi.href}
              className="rounded-xl p-4 transition-all hover:scale-[1.02] hover:shadow-md"
              style={{ background: kpi.bg, border: `1px solid ${kpi.border}` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${kpi.color}20` }}
                >
                  <Icon style={{ color: kpi.color, width: 18, height: 18 }} />
                </div>
                <MiniSparkline data={kpi.sparkline} color={kpi.color} />
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: kpi.color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  {kpi.label}
                </span>
                <span
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: "#10b981",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  <TrendingUp style={{ width: 10, height: 10 }} />
                  {kpi.change}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Activity + Recommended Jobs ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recent Activity
              </h3>
              <Link
                to="/u/activity"
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: ACCENT }}
              >
                View All <ArrowUpRight style={{ width: 12, height: 12 }} />
              </Link>
            </div>
            <div className="space-y-3">
              {activityFeed.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-xl transition-all"
                    style={{ background: "rgba(0,0,0,0.02)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")
                    }
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon style={{ color: item.color, width: 15, height: 15 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.text}
                      </p>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div
            id="tour-user-jobs"
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recommended for You
              </h3>
              <Link
                to="/u/jobs"
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: ACCENT }}
              >
                Browse All <ArrowUpRight style={{ width: 12, height: 12 }} />
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")
                  }
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                  >
                    <Building2 style={{ color: ACCENT, width: 20, height: 20 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {job.title}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                      >
                        {job.match}% match
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                          fontWeight: 500,
                        }}
                      >
                        {job.studio}
                      </span>
                      <span
                        className="flex items-center gap-0.5"
                        style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}
                      >
                        <MapPin style={{ width: 11, height: 11 }} /> {job.location}
                      </span>
                      <span
                        className="flex items-center gap-0.5"
                        style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}
                      >
                        <IndianRupee style={{ width: 11, height: 11 }} /> {job.salary}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/u/jobs"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        `rgba(${ACCENT_RGB},0.2)`)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        `rgba(${ACCENT_RGB},0.1)`)
                    }
                  >
                    Apply
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Continue Learning + Upcoming Events ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div
          id="tour-user-learning"
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Continue Learning
            </h3>
            <Link
              to="/u/courses"
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: ACCENT }}
            >
              My Courses <ArrowUpRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
          <div className="space-y-3">
            {inProgressCourses.map((course, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl transition-all"
                style={{ background: "rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")
                }
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {course.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        marginTop: 3,
                      }}
                    >
                      {course.provider} · {course.modules}
                    </div>
                  </div>
                  <Link
                    to="/u/courses"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 ml-2 transition-all"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        `rgba(${ACCENT_RGB},0.2)`)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        `rgba(${ACCENT_RGB},0.1)`)
                    }
                  >
                    Resume <ChevronRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 h-2 rounded-full"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${course.progress}%`, background: ACCENT }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: ACCENT,
                      minWidth: 32,
                      textAlign: "right",
                    }}
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Upcoming Events
            </h3>
            <Link
              to="/events"
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: ACCENT }}
            >
              View All <ArrowUpRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => {
              const typeColor =
                event.type === "Placement"
                  ? { bg: `rgba(${ACCENT_RGB},0.1)`, text: ACCENT }
                  : event.type === "Workshop"
                  ? { bg: "rgba(168,85,247,0.1)", text: "#a855f7" }
                  : { bg: "rgba(255,106,61,0.1)", text: "#FF6A3D" };
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")
                  }
                >
                  <div
                    className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,106,61,0.1)" }}
                  >
                    <Calendar style={{ color: "#FF6A3D", width: 16, height: 16 }} />
                    <span
                      style={{ fontSize: "0.63rem", fontWeight: 700, color: "#FF6A3D", marginTop: 2 }}
                    >
                      {event.date}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {event.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: typeColor.bg, color: typeColor.text }}
                      >
                        {event.type}
                      </span>
                      <span
                        className="flex items-center gap-0.5"
                        style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                      >
                        <MapPin style={{ width: 10, height: 10 }} /> {event.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/events"
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold flex-shrink-0 transition-all"
                    style={{ background: "rgba(255,106,61,0.08)", color: "#FF6A3D" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(255,106,61,0.15)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(255,106,61,0.08)")
                    }
                  >
                    Register
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
