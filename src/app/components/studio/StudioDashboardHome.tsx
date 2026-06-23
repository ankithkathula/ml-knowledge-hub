import { useState, type ReactNode } from "react";
import {
  FolderKanban, CalendarCheck, Star, ArrowUpRight, Plus,
  PenSquare, MessageSquare, Briefcase, BarChart3, MapPin,
  Navigation, Package, BookOpen, Heart, Users, Camera,
  MessageCircle, ChevronLeft, ChevronRight, Car,
} from "lucide-react";
import { Link } from "react-router";
import { getAuthUser } from "../../utils/auth";
import { AvatarImg } from "../ui/AvatarImg";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ── Mock Data ────────────────────────────────────────────────────── */

const todayAppts = [
  {
    time: "09:00", endTime: "10:00", client: "Ravi Sharma", initials: "RS",
    avatarUrl: "https://i.pravatar.cc/80?img=52",
    type: "Site Visit", location: "Jubilee Hills, Hyd",
    address: "Plot 12, Rd No. 36, Jubilee Hills", color: "#3b82f6",
    traffic: "light" as const,
  },
  {
    time: "11:30", endTime: "12:15", client: "Ananya Iyer", initials: "AI",
    avatarUrl: "https://i.pravatar.cc/80?img=5",
    type: "Video Call", location: "Virtual",
    address: null, color: "#10b981",
    traffic: null,
  },
  {
    time: "14:00", endTime: "15:00", client: "Vikram Patel", initials: "VP",
    avatarUrl: "https://i.pravatar.cc/80?img=59",
    type: "In-Office", location: "Studio HQ, Banjara Hills",
    address: "Studio HQ, Banjara Hills", color: "#a855f7",
    traffic: null,
  },
  {
    time: "16:30", endTime: "18:00", client: "Sunita Joshi", initials: "SJ",
    avatarUrl: "https://i.pravatar.cc/80?img=26",
    type: "Site Visit", location: "Madhapur, Hyd",
    address: "Cyber Towers Rd, Madhapur", color: "#ff6a3d",
    traffic: "heavy" as const,
  },
];

const routeStops = [
  {
    order: 1, client: "Ravi Sharma", initials: "RS", time: "09:00",
    avatarUrl: "https://i.pravatar.cc/80?img=52",
    address: "Plot 12, Rd No. 36, Jubilee Hills", traffic: "light" as const,
    travelFromPrev: null, color: "#3b82f6",
  },
  {
    order: 2, client: "Sunita Joshi", initials: "SJ", time: "16:30",
    avatarUrl: "https://i.pravatar.cc/80?img=26",
    address: "Cyber Towers Rd, Madhapur", traffic: "heavy" as const,
    travelFromPrev: "~25 min · 11 km", color: "#ff6a3d",
  },
];

const holidays = [
  { date: "May 26", name: "Buddha Purnima", type: "national", daysLeft: 1 },
  { date: "Jun 2", name: "Eid Al-Adha", type: "national", daysLeft: 8 },
  { date: "Jun 12", name: "Team Offsite", type: "internal", daysLeft: 18 },
  { date: "Aug 15", name: "Independence Day", type: "national", daysLeft: 82 },
];

const teamToday = [
  { name: "Priya S.", role: "Designer", status: "in-office" as const, task: "Villa Interior Moodboard" },
  { name: "Arjun M.", role: "Consultant", status: "remote" as const, task: "Client calls 10–12" },
  { name: "Rahul K.", role: "Drafter", status: "on-leave" as const, task: "—" },
  { name: "Nisha T.", role: "PM", status: "in-office" as const, task: "Rooftop Project BOM review" },
];

const socialInbox = [
  { channel: "google", label: "Google Review", sender: "Meera R.", text: "Absolutely loved the material recommendations! 5⭐", time: "1h ago", unread: true },
  { channel: "instagram", label: "Instagram", sender: "@designbyv", text: "Can you do this for a 2BHK in Mumbai?", time: "3h ago", unread: true },
  { channel: "whatsapp", label: "WhatsApp", sender: "Priya Desai", text: "Are you taking projects in Pune currently?", time: "4h ago", unread: false },
  { channel: "linkedin", label: "LinkedIn", sender: "GreenBuild Co.", text: "We'd love to feature you in our sustainable studios series.", time: "6h ago", unread: false },
];

const moduleSummaries = [
  { label: "Jobs", to: "/studio/jobs", value: "3 active", sub: "1 new invite", color: "#3b82f6", Icon: Briefcase },
  { label: "Projects", to: "/studio/projects", value: "8 running", sub: "2 due soon", color: "#ff6a3d", Icon: FolderKanban },
  { label: "Bookings", to: "/studio/bookings", value: "5 pending", sub: "2 today", color: "#10b981", Icon: CalendarCheck },
  { label: "Messages", to: "/studio/messages", value: "12 unread", sub: "3 urgent", color: "#ec4899", Icon: MessageSquare },
  { label: "Reviews", to: "/studio/reviews", value: "4.8 avg", sub: "2 new", color: "#f59e0b", Icon: Star },
  { label: "Blogs", to: "/studio/blogs", value: "2 drafts", sub: "1 scheduled", color: "#a855f7", Icon: PenSquare },
  { label: "Courses", to: "/studio/courses", value: "3 enrolled", sub: "42% avg", color: "#06b6d4", Icon: BookOpen },
  { label: "Samples", to: "/studio/samples", value: "7 requests", sub: "3 dispatched", color: "#84cc16", Icon: Package },
  { label: "KC Visits", to: "/studio/kc-visits", value: "2 booked", sub: "Next May 27", color: "#f97316", Icon: MapPin },
  { label: "Wishlist", to: "/studio/wishlist", value: "14 saved", sub: "3 projects", color: "#8b5cf6", Icon: Heart },
  { label: "Analytics", to: "/studio/analytics", value: "+12% views", sub: "This week", color: "#0ea5e9", Icon: BarChart3 },
  { label: "Team", to: "/studio/team", value: "4 members", sub: "1 on leave", color: "#6366f1", Icon: Users },
];

const TIMELINE_HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

/* ── Mini Calendar ─────────────────────────────────────────────── */

const APPT_DAYS_MAY = new Set([25, 27, 29]);

function MiniCalendar() {
  const todayRef = { y: 2026, m: 4, d: 25 }; // May = index 4
  const [viewDate, setViewDate] = useState(new Date(2026, 4, 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d: number) => d === todayRef.d && month === todayRef.m && year === todayRef.y;
  const hasAppt = (d: number) => month === 4 && year === 2026 && APPT_DAYS_MAY.has(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="p-1 rounded-lg hover:bg-black/5"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
          {monthName} {year}
        </span>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="p-1 rounded-lg hover:bg-black/5"
        >
          <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--text-muted)", textAlign: "center", padding: "2px 0" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center rounded-lg"
            style={{
              height: 28,
              fontSize: "0.72rem",
              fontWeight: d && isToday(d) ? 700 : 500,
              background: d && isToday(d) ? "#ff6a3d" : "transparent",
              color: d && isToday(d) ? "#fff" : d ? "var(--text-primary)" : "transparent",
              cursor: d ? "pointer" : "default",
            }}
          >
            {d}
            {d && hasAppt(d) && !isToday(d) && (
              <span
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: "#3b82f6" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 pt-2.5" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <span className="flex items-center gap-1.5" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff6a3d" }} /> Today
        </span>
        <span className="flex items-center gap-1.5" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3b82f6" }} /> Appointment
        </span>
      </div>
    </div>
  );
}

/* ── Traffic Badge ─────────────────────────────────────────────── */

function TrafficBadge({ level }: { level: "light" | "moderate" | "heavy" | null }) {
  if (!level) return null;
  const cfg = {
    light: { label: "Light traffic", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    moderate: { label: "Moderate", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    heavy: { label: "Heavy traffic", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  }[level];
  return (
    <span
      className="flex items-center gap-1 px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.color, fontSize: "0.62rem" }}
    >
      <Car className="w-2.5 h-2.5" /> {cfg.label}
    </span>
  );
}

/* ── Social Channel Icon ───────────────────────────────────────── */

function ChannelIcon({ channel }: { channel: string }) {
  const cfg: Record<string, { Icon: typeof Star; color: string; bg: string }> = {
    google: { Icon: Star, color: "#ea4335", bg: "rgba(234,67,53,0.1)" },
    instagram: { Icon: Camera, color: "#e1306c", bg: "rgba(225,48,108,0.1)" },
    whatsapp: { Icon: MessageCircle, color: "#25d366", bg: "rgba(37,211,102,0.1)" },
    linkedin: { Icon: Users, color: "#0077b5", bg: "rgba(0,119,181,0.1)" },
  };
  const { Icon, color, bg } = cfg[channel] ?? { Icon: MessageSquare, color: "#666", bg: "rgba(0,0,0,0.05)" };
  return (
    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
      <Icon className="w-3.5 h-3.5" style={{ color }} />
    </div>
  );
}

/* ── Card Shell ────────────────────────────────────────────────── */

function Card({ title, action, to, id, children }: {
  title: string; action?: string; to?: string; id?: string; children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="rounded-2xl p-4"
      style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.07)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          style={{
            fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)",
            textTransform: "uppercase", letterSpacing: "0.07em",
          }}
        >
          {title}
        </h3>
        {action && to && (
          <Link to={to} className="flex items-center gap-0.5" style={{ fontSize: "0.7rem", fontWeight: 600, color: "#ff6a3d" }}>
            {action} <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────── */

export function StudioDashboardHome() {
  const _authUser = getAuthUser();
  const todayStr = new Date(2026, 4, 25).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="p-4 sm:p-5 max-w-[1600px] mx-auto">

      {/* ── Greeting Banner ──────────────────────────────────────── */}
      <div id="tour-studio-greeting" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
            {getGreeting()}, Studio Materium
          </h1>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{todayStr}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "4 appointments", color: "#3b82f6", bg: "rgba(59,130,246,0.09)" },
            { label: "5 pending bookings", color: "#ff6a3d", bg: "rgba(255,106,61,0.09)" },
            { label: "3 new messages", color: "#a855f7", bg: "rgba(168,85,247,0.09)" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: pill.bg, color: pill.color }}
            >
              {pill.label}
            </span>
          ))}
          <Link
            to="/studio/bookings"
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(255,106,61,0.12)", color: "#ff6a3d" }}
          >
            <Plus className="w-3.5 h-3.5" /> New Booking
          </Link>
        </div>
      </div>

      {/* ── 3-Column Board ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

        {/* ════ Col 1 · TODAY ══════════════════════════════════════ */}
        <div className="space-y-4">

          {/* Day Planner */}
          <Card title="Day Planner" action="All bookings" to="/studio/bookings" id="tour-studio-day-planner">
            <div className="space-y-1">
              {TIMELINE_HOURS.map((t) => {
                const appt = todayAppts.find((a) => a.time === t);
                return (
                  <div key={t} className="flex items-start gap-2">
                    <span
                      style={{
                        fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600,
                        minWidth: 34, paddingTop: 5, flexShrink: 0,
                      }}
                    >
                      {t}
                    </span>
                    {appt ? (
                      <div
                        className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
                        style={{ background: `${appt.color}12`, border: `1px solid ${appt.color}25` }}
                      >
                        <AvatarImg src={appt.avatarUrl} fallback={appt.initials} size={24} fallbackBg={appt.color} borderStyle="none" />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {appt.client}
                          </div>
                          <div style={{ fontSize: "0.62rem", color: "var(--text-secondary)" }}>
                            {appt.type} · {appt.location}
                          </div>
                        </div>
                        <TrafficBadge level={appt.traffic} />
                      </div>
                    ) : (
                      <div
                        className="flex-1 border-b border-dashed"
                        style={{ borderColor: "rgba(0,0,0,0.06)", height: 28 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Route Planner */}
          <Card title="Today's Route" id="tour-studio-route-planner">
            <div className="flex items-center gap-1.5 mb-3">
              <Navigation className="w-3.5 h-3.5" style={{ color: "#ff6a3d" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                2 site visits · ordered by proximity
              </span>
            </div>

            <div className="mb-3 space-y-0">
              {routeStops.map((stop, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 3 }}>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ background: stop.color, fontSize: "0.62rem" }}
                    >
                      {stop.order}
                    </div>
                    {i < routeStops.length - 1 && (
                      <div className="w-px mt-1 mb-0" style={{ height: 28, background: "rgba(0,0,0,0.1)" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-3">
                    <div className="flex items-center justify-between gap-1">
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {stop.client}
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{stop.time}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: stop.color }} />
                      <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>{stop.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <TrafficBadge level={stop.traffic} />
                      {stop.travelFromPrev && (
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}
                        >
                          <Car className="w-3 h-3" /> {stop.travelFromPrev} from stop 1
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ height: 155, border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <iframe
                src="https://maps.google.com/maps?saddr=Jubilee+Hills,+Hyderabad&daddr=Madhapur,+Hyderabad&z=12&output=embed"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Today's appointment route"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p style={{ fontSize: "0.58rem", color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>
              © Google Maps
            </p>
          </Card>

        </div>

        {/* ════ Col 2 · SCHEDULE ═══════════════════════════════════ */}
        <div id="tour-studio-schedule-col" className="space-y-4">

          {/* Mini Calendar */}
          <Card title="Calendar">
            <MiniCalendar />
          </Card>

          {/* Holiday Planner */}
          <Card title="Holiday Planner">
            <div className="space-y-2">
              {holidays.map((h, i) => {
                const typeColor =
                  h.type === "national" ? "#ef4444"
                  : h.type === "internal" ? "#3b82f6"
                  : "#a855f7";
                const typeBg =
                  h.type === "national" ? "rgba(239,68,68,0.08)"
                  : h.type === "internal" ? "rgba(59,130,246,0.08)"
                  : "rgba(168,85,247,0.08)";
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.02)" }}
                  >
                    <div
                      className="rounded-lg px-2 py-1 text-center flex-shrink-0"
                      style={{ background: typeBg, minWidth: 52 }}
                    >
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, color: typeColor }}>{h.date}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{h.name}</div>
                      <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
                        {h.type === "national" ? "National holiday" : h.type === "internal" ? "Studio closure" : "Team event"}
                      </div>
                    </div>
                    <span
                      className="flex-shrink-0 px-2 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", fontSize: "0.62rem" }}
                    >
                      {h.daysLeft === 1 ? "Tomorrow" : `${h.daysLeft}d`}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Team Today */}
          <Card title="Team Today" action="Manage" to="/studio/team">
            <div className="space-y-2">
              {teamToday.map((m, i) => {
                const statusCfg = {
                  "in-office": { color: "#10b981", label: "In office" },
                  "remote": { color: "#3b82f6", label: "Remote" },
                  "on-leave": { color: "#9ca3af", label: "On leave" },
                }[m.status];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-2 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.02)", opacity: m.status === "on-leave" ? 0.55 : 1 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#ff6a3d,#e8522a)", fontSize: "0.58rem", fontWeight: 800 }}
                    >
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusCfg.color }} />
                        <span style={{ fontSize: "0.6rem", color: statusCfg.color, fontWeight: 600 }}>{statusCfg.label}</span>
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{m.task}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

        {/* ════ Col 3 · HUB OVERVIEW ═══════════════════════════════ */}
        <div className="space-y-4">

          {/* Module Snapshot */}
          <Card title="Hub Overview" id="tour-studio-hub-overview">
            <div className="grid grid-cols-2 gap-2">
              {moduleSummaries.map((mod) => {
                const { Icon } = mod;
                return (
                  <Link
                    key={mod.label}
                    to={mod.to}
                    className="flex items-start gap-2 p-2.5 rounded-xl transition-all"
                    style={{ background: `${mod.color}08`, border: `1px solid ${mod.color}20` }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${mod.color}16`)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `${mod.color}08`)}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mod.color}20` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: mod.color }} />
                    </div>
                    <div className="min-w-0">
                      <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {mod.label}
                      </div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 800, color: mod.color }}>{mod.value}</div>
                      <div style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>{mod.sub}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* Social Inbox */}
          <Card title="Social Inbox" action="All messages" to="/studio/messages" id="tour-studio-social-inbox">
            <div className="space-y-2">
              {socialInbox.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: item.unread ? "rgba(255,106,61,0.04)" : "rgba(0,0,0,0.02)",
                    border: item.unread ? "1px solid rgba(255,106,61,0.14)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = item.unread ? "rgba(255,106,61,0.04)" : "rgba(0,0,0,0.02)")}
                >
                  <ChannelIcon channel={item.channel} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {item.sender}
                      </span>
                      <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 1 }}>{item.label}</div>
                    <p className="truncate mt-0.5" style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                      {item.text}
                    </p>
                  </div>
                  {item.unread && (
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#ff6a3d" }} />
                  )}
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
