import {
  Eye, Briefcase, GraduationCap, Bookmark, TrendingUp,
  ArrowUpRight, Plus, Search, MapPin, Package, Clock,
  ChevronRight, Star, Building2, IndianRupee
} from "lucide-react";
import { Link } from "react-router";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

/* ── Mock Data ──────────────────────────────────────────────────────── */

const kpiCards = [
  {
    label: "Portfolio Views",
    value: "890",
    change: "+18%",
    icon: Eye,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
    sparkline: [40, 55, 48, 62, 58, 70, 89],
  },
  {
    label: "Jobs Applied",
    value: "12",
    change: "+3",
    icon: Briefcase,
    color: ACCENT,
    bg: `rgba(${ACCENT_RGB},0.1)`,
    border: `rgba(${ACCENT_RGB},0.2)`,
    sparkline: [5, 6, 7, 8, 9, 10, 12],
  },
  {
    label: "Courses In Progress",
    value: "3",
    change: "+1",
    icon: GraduationCap,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
    sparkline: [1, 1, 2, 2, 2, 3, 3],
  },
  {
    label: "Bookmarked Materials",
    value: "45",
    change: "+8",
    icon: Bookmark,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    sparkline: [20, 25, 28, 32, 37, 40, 45],
  },
];

const activityFeed = [
  { icon: Briefcase, color: ACCENT, text: "Applied for Senior Architect at XYZ Studio", time: "2h ago" },
  { icon: GraduationCap, color: "#a855f7", text: "Enrolled in Green Building Certification", time: "5h ago" },
  { icon: Bookmark, color: "#f59e0b", text: "Bookmarked Italian Marble from BrandX", time: "1d ago" },
  { icon: Package, color: "#10b981", text: "Sample request approved", time: "1d ago" },
  { icon: MapPin, color: "#3b82f6", text: "KC Visit scheduled for Apr 15", time: "2d ago" },
  { icon: Eye, color: "#ec4899", text: "Portfolio project got 50 views", time: "3d ago" },
];

const recommendedJobs = [
  { title: "Senior Architect", studio: "DesignCraft Studio", location: "Mumbai", salary: "12-18 LPA" },
  { title: "Interior Designer", studio: "SpaceWorks India", location: "Bangalore", salary: "8-12 LPA" },
  { title: "Sustainability Consultant", studio: "GreenBuild Associates", location: "Pune", salary: "10-15 LPA" },
];

const inProgressCourses = [
  { title: "Green Building Certification", provider: "EcoDesign Academy", progress: 65, modules: "8/12 modules" },
  { title: "Advanced Revit for Architecture", provider: "BuildSkill Pro", progress: 30, modules: "3/10 modules" },
];

const recentBookmarks = [
  { name: "Italian Carrara Marble", brand: "BrandX", color: "#3b82f6" },
  { name: "Vitrified Floor Tiles", brand: "Kajaria", color: "#10b981" },
  { name: "Teak Wood Veneer", brand: "GreenPly", color: "#f59e0b" },
  { name: "Aluminium Composite Panel", brand: "Aludecor", color: "#a855f7" },
];

/* ── Tiny sparkline SVG ────────────────────────────────────────────── */

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Main Component ────────────────────────────────────────────────── */

export function UserDashboardHome() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Welcome Banner ────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{
          background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.1) 0%, rgba(168,85,247,0.08) 100%)`,
          border: `1px solid rgba(${ACCENT_RGB},0.15)`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {greeting}, Ankit
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
              {todayStr}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/u/jobs"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: `rgba(${ACCENT_RGB},0.12)`, color: ACCENT }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.2)`)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.12)`)}
            >
              <Search className="w-3.5 h-3.5" /> Browse Jobs
            </Link>
            <Link
              to="/u/courses"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.12)")}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Explore Courses
            </Link>
            <Link
              to="/u/portfolio"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.12)")}
            >
              <Plus className="w-3.5 h-3.5" /> Add Project
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{ background: kpi.bg, border: `1px solid ${kpi.border}` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: kpi.color, width: 18, height: 18 }} />
                </div>
                <MiniSparkline data={kpi.sparkline} color={kpi.color} />
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: kpi.color, lineHeight: 1, marginBottom: 4 }}>
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  {kpi.label}
                </span>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#10b981", fontSize: "0.65rem" }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Activity Feed + Recommended Jobs ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recent Activity
              </h3>
              <Link
                to="/u/activity"
                className="flex items-center gap-1 text-xs font-semibold transition-all"
                style={{ color: ACCENT }}
              >
                View All <ArrowUpRight className="w-3 h-3" />
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
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>
                        {item.text}
                      </p>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recommended Jobs
              </h3>
              <Link
                to="/u/jobs"
                className="flex items-center gap-1 text-xs font-semibold transition-all"
                style={{ color: ACCENT }}
              >
                Browse All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {job.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                        {job.studio}
                      </span>
                      <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <IndianRupee className="w-3 h-3" /> {job.salary}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/u/jobs"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.2)`)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.1)`)}
                  >
                    Apply
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Continue Learning + Recent Bookmarks ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Continue Learning
            </h3>
            <Link
              to="/u/courses"
              className="flex items-center gap-1 text-xs font-semibold transition-all"
              style={{ color: ACCENT }}
            >
              My Courses <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {inProgressCourses.map((course, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl transition-all"
                style={{ background: "rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {course.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {course.provider} &middot; {course.modules}
                    </div>
                  </div>
                  <Link
                    to="/u/courses"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.2)`)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.1)`)}
                  >
                    Continue <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${course.progress}%`, background: ACCENT }}
                    />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: ACCENT, minWidth: 32, textAlign: "right" }}>
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookmarks */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Recent Bookmarks
            </h3>
            <Link
              to="/u/bookmarks"
              className="flex items-center gap-1 text-xs font-semibold transition-all"
              style={{ color: ACCENT }}
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentBookmarks.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)` }}
                >
                  <Package className="w-8 h-8" style={{ color: `${item.color}60` }} />
                </div>
                <div className="p-3">
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {item.brand}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
