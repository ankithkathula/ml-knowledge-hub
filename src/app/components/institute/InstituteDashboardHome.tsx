import { Link } from "react-router";
import { GraduationCap, Users, IndianRupee, Star, TrendingUp, ArrowRight, Plus, AlertCircle } from "lucide-react";
import { getAuthUser } from "../../utils/auth";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATS = [
  { label: "Total Courses",    value: "14",      sub: "+2 this month",   icon: GraduationCap, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { label: "Enrolled Students",value: "3,842",   sub: "+186 this month", icon: Users,         color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Total Revenue",    value: "₹18.4L",  sub: "+12% vs last mo", icon: IndianRupee,   color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  { label: "Avg Course Rating",value: "4.73",    sub: "Across all courses", icon: Star,        color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
];

const TOP_COURSES = [
  { title: "BIM Professional: Revit Architecture Complete", enrolled: 842, revenue: "₹4.2L", rating: 4.8, status: "Live", format: "Certification" },
  { title: "AutoCAD for Construction Drawings",             enrolled: 720, revenue: "₹2.9L", rating: 4.5, status: "Live", format: "Training" },
  { title: "Grasshopper & Parametric Design",               enrolled: 314, revenue: "₹1.8L", rating: 4.7, status: "Live", format: "Digital" },
  { title: "Smart Home & Building Automation",              enrolled: 182, revenue: "₹1.6L", rating: 4.6, status: "Live", format: "Certification" },
  { title: "Façade Engineering & Cladding Systems",         enrolled: 96,  revenue: "₹0.8L", rating: 4.5, status: "Draft", format: "Training" },
];

const RECENT_ENROLLMENTS = [
  { name: "Priya Menon",     course: "BIM Professional",        date: "Today, 9:41 AM",   avatar: "PM", color: "#be185d" },
  { name: "Arjun Kulkarni",  course: "AutoCAD for Construction", date: "Today, 8:22 AM",   avatar: "AK", color: "#1e40af" },
  { name: "Sneha Tiwari",    course: "BIM Professional",        date: "Yesterday, 6:15 PM",avatar: "ST", color: "#065f46" },
  { name: "Rahul Bose",      course: "Grasshopper & Parametric",date: "Yesterday, 3:30 PM",avatar: "RB", color: "#7c3aed" },
  { name: "Ananya Shah",     course: "Smart Home Automation",   date: "12 May, 11:00 AM",  avatar: "AS", color: "#b45309" },
];

const PENDING = [
  { type: "Review",  text: "3 student reviews pending approval" },
  { type: "Faculty", text: "1 faculty application awaiting review" },
  { type: "Course",  text: "\"Façade Engineering\" draft needs publishing" },
];

const formatColors: Record<string, string> = {
  Certification: "#3b82f6",
  Training: "#10b981",
  Digital: "#f59e0b",
  Workshop: "#ec4899",
  "Brand Course": "#8b5cf6",
};

export function InstituteDashboardHome() {
  const authUser = getAuthUser();
  const instituteName = authUser?.name ?? "RICS SBE";

  return (
    <div className="p-5 sm:p-7 max-w-6xl mx-auto space-y-7">
      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>{getGreeting()}, {instituteName} 👋</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>Here's what's happening with your institute today.</p>
        </div>
        <Link
          to="/institute/courses"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "#3b82f6", color: "#fff" }}
        >
          <Plus className="w-4 h-4" /> Add New Course
        </Link>
      </div>

      {/* KPI cards */}
      <div id="tour-institute-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: s.color }} />
              </div>
              <p style={{ fontSize: "1.55rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 }}>{s.label}</p>
              <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top courses */}
        <div id="tour-institute-courses" className="lg:col-span-2 rounded-2xl" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: "#3b82f6" }} />
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Course Performance</h3>
            </div>
            <Link to="/institute/courses" className="text-xs font-semibold flex items-center gap-1" style={{ color: "#3b82f6" }}>
              Manage all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y" style={{ divideColor: "rgba(0,0,0,0.04)" }}>
            {TOP_COURSES.map((c) => (
              <div key={c.title} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ background: `${formatColors[c.format]}18`, color: formatColors[c.format] }}>
                      {c.format}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.enrolled} enrolled</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981" }}>{c.revenue}</p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{c.rating}</span>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: c.status === "Live" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: c.status === "Live" ? "#10b981" : "#f59e0b" }}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Recent enrollments */}
          <div id="tour-institute-enrollments" className="rounded-2xl" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Enrollments</h3>
              <Link to="/institute/students" className="text-xs font-semibold" style={{ color: "#3b82f6" }}>View all</Link>
            </div>
            <div className="divide-y" style={{ divideColor: "rgba(0,0,0,0.04)" }}>
              {RECENT_ENROLLMENTS.map((e) => (
                <div key={e.name + e.date} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: e.color }}>
                    {e.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">{e.name}</p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }} className="truncate">{e.course}</p>
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", flexShrink: 0 }}>{e.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action items */}
          <div id="tour-institute-attention" className="rounded-2xl" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div className="px-4 py-3.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Needs Attention</h3>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              {PENDING.map((p) => (
                <div key={p.text} className="flex items-start gap-2.5 p-2.5 rounded-lg" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#f59e0b" }} />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
