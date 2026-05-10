import {
  Eye, FolderKanban, CalendarCheck, Star, TrendingUp, TrendingDown,
  ArrowUpRight, Plus, PenSquare, MessageSquare, Briefcase, CheckCircle,
  Clock, User, FileText, BarChart3, PieChart, DollarSign
} from "lucide-react";
import { Link } from "react-router";

/* ── Mock Data ──────────────────────────────────────────────────────── */

const kpiCards = [
  {
    label: "Profile Views",
    value: "1,240",
    change: "+12%",
    trend: "up" as const,
    icon: Eye,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
    sparkline: [30, 45, 38, 52, 48, 60, 72],
  },
  {
    label: "Active Projects",
    value: "8",
    change: "+2",
    trend: "up" as const,
    icon: FolderKanban,
    color: "#ff6a3d",
    bg: "rgba(255,106,61,0.1)",
    border: "rgba(255,106,61,0.2)",
    sparkline: [4, 5, 5, 6, 6, 7, 8],
  },
  {
    label: "Pending Bookings",
    value: "5",
    change: "+3",
    trend: "up" as const,
    icon: CalendarCheck,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
    sparkline: [2, 3, 1, 4, 2, 3, 5],
  },
  {
    label: "Avg Rating",
    value: "4.8/5",
    change: "+0.2",
    trend: "up" as const,
    icon: Star,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    sparkline: [4.5, 4.6, 4.5, 4.7, 4.7, 4.8, 4.8],
  },
];

const activityFeed = [
  { icon: Star, color: "#f59e0b", text: "New 5-star review from Meera Reddy on Waterproofing Consultation", time: "12 min ago" },
  { icon: FolderKanban, color: "#3b82f6", text: "New project inquiry: Villa Interior Material Selection in Jubilee Hills", time: "45 min ago" },
  { icon: CalendarCheck, color: "#10b981", text: "Booking confirmed with Ravi Sharma for April 3, 2026 at 10:00 AM", time: "1h ago" },
  { icon: PenSquare, color: "#a855f7", text: "Your blog \"Top 10 Sustainable Roofing Materials\" was published", time: "3h ago" },
  { icon: Briefcase, color: "#ff6a3d", text: "Job application for Senior Material Consultant at GreenBuild was viewed", time: "5h ago" },
  { icon: MessageSquare, color: "#ec4899", text: "New message from Priya Desai regarding flooring recommendations", time: "6h ago" },
];

const upcomingBookings = [
  { client: "Ravi Sharma", date: "Apr 3, 2026", time: "10:00 AM", type: "Site Visit", status: "confirmed" },
  { client: "Ananya Iyer", date: "Apr 4, 2026", time: "2:00 PM", type: "Video Call", status: "confirmed" },
  { client: "Vikram Patel", date: "Apr 5, 2026", time: "11:00 AM", type: "In-Office", status: "pending" },
  { client: "Sunita Joshi", date: "Apr 7, 2026", time: "3:30 PM", type: "Site Visit", status: "pending" },
  { client: "Karthik Nair", date: "Apr 8, 2026", time: "9:00 AM", type: "Video Call", status: "confirmed" },
];

const recentMessages = [
  { sender: "Priya Desai", avatar: "PD", snippet: "Hi Arjun, can you recommend eco-friendly tiles for a bathroom renovation? Budget around...", time: "6h ago" },
  { sender: "Amit Verma", avatar: "AV", snippet: "Thanks for the consultation yesterday! I wanted to follow up on the cement brands you...", time: "1d ago" },
  { sender: "Neha Kulkarni", avatar: "NK", snippet: "Would you be available for a site visit in Banjara Hills next week? We need material...", time: "2d ago" },
];

const leadSources = [
  { label: "Search", pct: 38, color: "#3b82f6" },
  { label: "Referrals", pct: 28, color: "#10b981" },
  { label: "Social", pct: 18, color: "#a855f7" },
  { label: "Direct", pct: 16, color: "#f59e0b" },
];

const profileViewData = [
  { label: "Mon", value: 145 },
  { label: "Tue", value: 190 },
  { label: "Wed", value: 168 },
  { label: "Thu", value: 210 },
  { label: "Fri", value: 195 },
  { label: "Sat", value: 178 },
  { label: "Sun", value: 154 },
];

const revenueData = [
  { month: "Oct", value: 45000 },
  { month: "Nov", value: 52000 },
  { month: "Dec", value: 48000 },
  { month: "Jan", value: 61000 },
  { month: "Feb", value: 58000 },
  { month: "Mar", value: 72000 },
];

/* ── Tiny sparkline SVG (inline) ────────────────────────────────── */

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

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

/* ── Simple bar chart placeholder ────────────────────────────────── */

function MiniBarChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-[100px]">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${(d.value / max) * 80}px`,
              background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
              minHeight: 4,
            }}
          />
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Area chart placeholder ──────────────────────────────────────── */

function MiniAreaChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const w = 280;
  const h = 100;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d.value - min) / range) * (h - 10) - 5}`).join(" ");
  const areaPath = `M0,${h} L${pts
    .split(" ")
    .map((p) => p)
    .join(" L")} L${w},${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id={`area-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#area-${color.replace("#", "")})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <text
            key={d.label}
            x={(i / (data.length - 1)) * w}
            y={h + 16}
            textAnchor="middle"
            style={{ fontSize: "9px", fill: "var(--text-muted)" }}
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */

export function StudioDashboardHome() {
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
          background: "linear-gradient(135deg, rgba(255,106,61,0.1) 0%, rgba(168,85,247,0.08) 100%)",
          border: "1px solid rgba(255,106,61,0.15)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {greeting}, Arjun
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
              {todayStr} &middot; You have <strong style={{ color: "#ff6a3d" }}>5 pending bookings</strong> and <strong style={{ color: "#a855f7" }}>3 new messages</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/studio/projects"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(255,106,61,0.12)", color: "#ff6a3d" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.12)")}
            >
              <Plus className="w-3.5 h-3.5" /> Add Project
            </Link>
            <Link
              to="/studio/blogs"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.12)")}
            >
              <PenSquare className="w-3.5 h-3.5" /> Write Blog
            </Link>
            <Link
              to="/studio/bookings"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.12)")}
            >
              <CalendarCheck className="w-3.5 h-3.5" /> View Bookings
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
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Charts + Activity Row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats Charts */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile Views Chart */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Profile Views This Week
              </h3>
              <span
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "#10b981" }}
              >
                <TrendingUp className="w-3 h-3" /> +12% vs last week
              </span>
            </div>
            <MiniBarChart data={profileViewData} color="#3b82f6" />
          </div>

          {/* Revenue + Lead Sources row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Revenue Trend */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Revenue Trend
                </h3>
                <DollarSign className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </div>
              <MiniAreaChart data={revenueData.map((d) => ({ label: d.month, value: d.value }))} color="#10b981" />
            </div>

            {/* Lead Sources */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Lead Sources
                </h3>
                <PieChart className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="space-y-3 mt-4">
                {leadSources.map((src) => (
                  <div key={src.label} className="flex items-center gap-3">
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", minWidth: 60 }}>
                      {src.label}
                    </span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${src.pct}%`, background: src.color }}
                      />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: src.color, minWidth: 32, textAlign: "right" }}>
                      {src.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Recent Activity
            </h3>
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
      </div>

      {/* ── Bookings + Messages Row ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Upcoming Bookings
              </h3>
              <Link
                to="/studio/bookings"
                className="flex items-center gap-1 text-xs font-semibold transition-all"
                style={{ color: "#ff6a3d" }}
              >
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {upcomingBookings.map((booking, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(59,130,246,0.1)" }}
                  >
                    <User className="w-4 h-4" style={{ color: "#3b82f6" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {booking.client}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {booking.date} at {booking.time} &middot; {booking.type}
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: booking.status === "confirmed" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                      color: booking.status === "confirmed" ? "#10b981" : "#f59e0b",
                    }}
                  >
                    {booking.status === "confirmed" ? (
                      <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed</span>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Recent Messages
              </h3>
              <Link
                to="/studio/messages"
                className="flex items-center gap-1 text-xs font-semibold transition-all"
                style={{ color: "#ff6a3d" }}
              >
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl transition-all cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #e8522a 100%)", fontSize: "0.65rem", fontWeight: 700 }}
                    >
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {msg.sender}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{msg.time}</span>
                    </div>
                  </div>
                  <p
                    className="truncate"
                    style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4, paddingLeft: 40 }}
                  >
                    {msg.snippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
