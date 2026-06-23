import { Link } from "react-router";
import {
  Eye, Briefcase, GraduationCap, Image, TrendingUp, ArrowUpRight,
  Plus, MapPin, ChevronRight, Building2, IndianRupee, Award, FileText, Activity,
} from "lucide-react";
import {
  DESIGNER_PROFILE, APPLIED_JOBS, ENROLLED_COURSES, ACTIVITY_FEED, PORTFOLIO_WORKS,
} from "../data/designerData";

const ACCENT = "#8b5cf6";
const ACCENT_RGB = "139,92,246";

const kpis = [
  { label: "Profile Views",    value: String(DESIGNER_PROFILE.stats.profileViews), change: "+12%", icon: Eye,           color: "#3b82f6",        bg: "rgba(59,130,246,0.08)",   border: "rgba(59,130,246,0.15)",  sparkline: [800,900,870,1020,980,1150,1280] },
  { label: "Works Published",  value: String(DESIGNER_PROFILE.stats.works),         change: "+2",   icon: Image,         color: "#f97316",        bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.15)",  sparkline: [18,18,20,20,22,22,24] },
  { label: "Jobs Applied",     value: String(APPLIED_JOBS.length),                  change: "+3",   icon: Briefcase,     color: ACCENT,           bg: `rgba(${ACCENT_RGB},0.08)`, border: `rgba(${ACCENT_RGB},0.15)`, sparkline: [1,2,2,3,4,4,5] },
  { label: "Courses Active",   value: String(ENROLLED_COURSES.filter(c => !c.completed).length), change: "+1", icon: GraduationCap, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.15)", sparkline: [1,1,2,2,2,2,2] },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Applied:     { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Shortlisted: { bg: "rgba(139,92,246,0.1)",  color: "#8b5cf6" },
  Interview:   { bg: "rgba(245,158,11,0.1)",  color: "#d97706" },
  Offered:     { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  Rejected:    { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase, GraduationCap, Image, Award, FileText, Activity,
  CheckCircle: Activity,
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 64},${24 - ((v - min) / range) * 24}`).join(" ");
  return <svg width={64} height={24}><polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function DesignerDashboardHome() {
  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; })();
  const todayStr = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const recentActivity = ACTIVITY_FEED.slice(0, 5);
  const activeJobs = APPLIED_JOBS.filter(j => j.status !== "Rejected").slice(0, 3);
  const inProgress = ENROLLED_COURSES.filter(c => !c.completed);
  const recentWorks = PORTFOLIO_WORKS.slice(0, 3);

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl p-5 sm:p-6" style={{ background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.1) 0%, rgba(109,40,217,0.08) 100%)`, border: `1px solid rgba(${ACCENT_RGB},0.15)` }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {greeting}, {DESIGNER_PROFILE.name.split(" ")[0]} ✦
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>{todayStr}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/d/works" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: `rgba(${ACCENT_RGB},0.12)`, color: ACCENT }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.2)`)} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.12)`)}>
              <Plus className="w-3.5 h-3.5" /> Add Work
            </Link>
            <Link to="/d/jobs" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.2)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.12)")}>
              <Briefcase className="w-3.5 h-3.5" /> My Jobs
            </Link>
            <Link to="/d/courses" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)")}>
              <GraduationCap className="w-3.5 h-3.5" /> Courses
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div id="tour-designer-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: kpi.bg, border: `1px solid ${kpi.border}` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                  <Icon style={{ color: kpi.color, width: 18, height: 18 }} />
                </div>
                <MiniSparkline data={kpi.sparkline} color={kpi.color} />
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: kpi.color, lineHeight: 1, marginBottom: 4 }}>{kpi.value}</div>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{kpi.label}</span>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#10b981", fontSize: "0.65rem", fontWeight: 700 }}>
                  <TrendingUp className="w-3 h-3" />{kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity + Applied Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div>
          <div id="tour-designer-activity" className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Activity</h3>
              <Link to="/d/activity" className="flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? Activity;
                return (
                  <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${item.color}15` }}>
                      <Icon style={{ color: item.color, width: 16, height: 16 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.text}</p>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="lg:col-span-2">
          <div id="tour-designer-jobs" className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Applied Jobs</h3>
              <Link to="/d/jobs" className="flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {activeJobs.map((job) => {
                const st = STATUS_STYLE[job.status] ?? STATUS_STYLE.Applied;
                return (
                  <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${ACCENT_RGB},0.1)` }}>
                      <Building2 style={{ color: ACCENT, width: 20, height: 20 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>{job.studio}</span>
                        <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><IndianRupee className="w-3 h-3" />{job.salary}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                      {job.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Courses + Recent Works */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div id="tour-designer-learning" className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Continue Learning</h3>
            <Link to="/d/courses" className="flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>
              My Courses <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {inProgress.map((course) => (
              <div key={course.id} className="p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{course.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{course.provider} · {course.modulesComplete}/{course.totalModules} modules</div>
                  </div>
                  <Link to="/d/courses" className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0" style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.2)`)} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.1)`)}>
                    Resume <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${course.progress}%`, background: ACCENT }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: ACCENT, minWidth: 32, textAlign: "right" }}>{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Works */}
        <div id="tour-designer-works" className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Works</h3>
            <Link to="/d/works" className="flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>
              All Works <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentWorks.map((work) => (
              <div key={work.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                <div className="w-12 h-12 rounded-xl flex-shrink-0" style={{ background: work.gradient }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{work.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{work.category} · {work.year} · {work.views} views</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>Live</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
