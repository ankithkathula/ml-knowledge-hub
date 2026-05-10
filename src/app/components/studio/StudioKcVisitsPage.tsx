import { useState, useMemo } from "react";
import {
  MapPin,
  Plus,
  X,
  Calendar,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Building2,
  CheckCircle2,
  CalendarCheck,
  Eye,
  Edit3,
  XCircle,
  StickyNote,
  Image,
  Package,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type VisitStatus = "Scheduled" | "Confirmed";
type VisitPurpose = "General Browse" | "Project-specific" | "Sample Collection" | "Vendor Meeting";

interface UpcomingVisit {
  id: string;
  location: string;
  city: string;
  date: string;
  time: string;
  purpose: VisitPurpose;
  attendees: number;
  status: VisitStatus;
}

interface PastVisit {
  id: string;
  location: string;
  city: string;
  date: string;
  purpose: VisitPurpose;
  notes: string;
  rating: number;
  materialsOfInterest: string[];
}

/* ── Mock Data ─────────────────────────────────────────────────────── */

const KC_LOCATIONS = [
  "Material Library KC - Gurugram",
  "ML KC - Whitefield, Bengaluru",
  "ML KC - Bandra, Mumbai",
  "ML KC - Anna Nagar, Chennai",
  "ML KC - Jubilee Hills, Hyderabad",
];

const INITIAL_UPCOMING: UpcomingVisit[] = [
  { id: "v1", location: "Material Library KC - Gurugram", city: "Gurugram", date: "Apr 5, 2026", time: "10:00 AM", purpose: "Project-specific", attendees: 3, status: "Confirmed" },
  { id: "v2", location: "ML KC - Whitefield, Bengaluru", city: "Bengaluru", date: "Apr 8, 2026", time: "2:00 PM", purpose: "Sample Collection", attendees: 2, status: "Scheduled" },
  { id: "v3", location: "ML KC - Bandra, Mumbai", city: "Mumbai", date: "Apr 12, 2026", time: "11:00 AM", purpose: "Vendor Meeting", attendees: 4, status: "Scheduled" },
];

const PAST_VISITS: PastVisit[] = [
  { id: "pv1", location: "Material Library KC - Gurugram", city: "Gurugram", date: "Mar 15, 2026", purpose: "General Browse", notes: "Explored new Italian marble collection. Impressed with the Calacatta Gold variants. Got brochures for Lavasa project.", rating: 5, materialsOfInterest: ["Calacatta Gold Marble", "Statuario Venato Marble", "Nano White Quartz"] },
  { id: "pv2", location: "ML KC - Whitefield, Bengaluru", city: "Bengaluru", date: "Feb 28, 2026", purpose: "Project-specific", notes: "Visited for Prestige Lakewood project. Shortlisted vitrified tiles and bathroom fittings. Need to follow up on Kajaria large-format tiles pricing.", rating: 4, materialsOfInterest: ["Kajaria 120x60cm Vitrified", "Jaquar Bathroom Fittings", "Saint-Gobain Glass"] },
  { id: "pv3", location: "ML KC - Anna Nagar, Chennai", city: "Chennai", date: "Feb 10, 2026", purpose: "Sample Collection", notes: "Picked up 8 tile samples and 3 paint shade cards for client presentation. KC team was very helpful with customization options.", rating: 5, materialsOfInterest: ["Somany Anti-Skid Tiles", "Asian Paints Royale Shyne", "Greenply Plywood"] },
  { id: "pv4", location: "ML KC - Jubilee Hills, Hyderabad", city: "Hyderabad", date: "Jan 22, 2026", purpose: "Vendor Meeting", notes: "Met with UltraTech and Birla Aerocon reps. Discussed bulk pricing for upcoming township project. Good discounts available for 500+ unit orders.", rating: 4, materialsOfInterest: ["UltraTech PPC Cement", "Birla Aerocon AAC Blocks", "Dalmia Cement"] },
];

const STATUS_STYLE: Record<VisitStatus, { bg: string; text: string }> = {
  Scheduled: { bg: "rgba(245,158,11,0.12)", text: "#d97706" },
  Confirmed: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
};

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioKcVisitsPage() {
  const [upcoming, setUpcoming] = useState<UpcomingVisit[]>(INITIAL_UPCOMING);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [expandedReport, setExpandedReport] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    location: KC_LOCATIONS[0],
    date: "",
    time: TIME_SLOTS[2],
    purpose: "General Browse" as VisitPurpose,
    attendees: "1",
    notes: "",
  });

  const stats = useMemo(() => ({
    upcoming: upcoming.length,
    completed: PAST_VISITS.length,
    totalThisYear: upcoming.length + PAST_VISITS.length,
  }), [upcoming]);

  const handleSchedule = () => {
    if (!form.date) return;
    setUpcoming((prev) => [
      ...prev,
      {
        id: `v-${Date.now()}`,
        location: form.location,
        city: form.location.split(" - ")[1] || "",
        date: new Date(form.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        time: form.time,
        purpose: form.purpose,
        attendees: Number(form.attendees),
        status: "Scheduled",
      },
    ]);
    setScheduleOpen(false);
    setForm({ location: KC_LOCATIONS[0], date: "", time: TIME_SLOTS[2], purpose: "General Browse", attendees: "1", notes: "" });
  };

  const cancelVisit = (id: string) => {
    setUpcoming((prev) => prev.filter((v) => v.id !== id));
  };

  const statCards = [
    { label: "Upcoming Visits", value: stats.upcoming, icon: CalendarCheck, color: "var(--accent)" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "#10b981" },
    { label: "Total This Year", value: stats.totalThisYear, icon: Building2, color: "#3b82f6" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
            <Building2 className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>KC Visits & Showroom Appointments</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Schedule and manage your Knowledge Center visits</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setScheduleOpen(true)}>
          <Plus className="w-4 h-4" /> Schedule Visit
        </button>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Upcoming Visits ─────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Upcoming Visits</h3>
        {upcoming.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No upcoming visits scheduled</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((visit) => (
              <div key={visit.id} className="rounded-xl p-4 transition-all hover:shadow-md" style={{ border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.9)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{visit.location}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: STATUS_STYLE[visit.status].bg, color: STATUS_STYLE[visit.status].text }}>
                    {visit.status}
                  </span>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <Calendar className="w-3.5 h-3.5" /> {visit.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <Clock className="w-3.5 h-3.5" /> {visit.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <Eye className="w-3.5 h-3.5" /> {visit.purpose}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <Users className="w-3.5 h-3.5" /> {visit.attendees} attendee{visit.attendees > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <button className="btn-secondary !text-xs !py-1.5 !px-3 flex-1">
                    <Edit3 className="w-3 h-3" /> Reschedule
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-lg transition-all"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                    onClick={() => cancelVisit(visit.id)}
                  >
                    <XCircle className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Past Visits ─────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Past Visits</h3>
        <div className="space-y-3">
          {PAST_VISITS.map((visit) => (
            <div key={visit.id} className="rounded-xl transition-all" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/[0.02] transition-all"
                onClick={() => setExpandedReport((prev) => ({ ...prev, [visit.id]: !prev[visit.id] }))}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)" }}>
                    <MapPin className="w-5 h-5" style={{ color: "#3b82f6" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{visit.location}</p>
                    <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {visit.date}</span>
                      <span>{visit.purpose}</span>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3" style={{ color: i < visit.rating ? "#f59e0b" : "rgba(0,0,0,0.1)", fill: i < visit.rating ? "#f59e0b" : "none" }} />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 transition-transform" style={{ color: "var(--text-muted)", transform: expandedReport[visit.id] ? "rotate(180deg)" : "none" }} />
              </div>
              {expandedReport[visit.id] && (
                <div className="px-4 pb-4 pt-0 space-y-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                  <div className="flex items-start gap-2 pt-3">
                    <StickyNote className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <p className="text-xs" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{visit.notes}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Image className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)", border: "1px dashed rgba(0,0,0,0.1)" }}>
                          <Image className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} />
                    <div className="flex flex-wrap gap-1.5">
                      {visit.materialsOfInterest.map((mat) => (
                        <span key={mat} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Schedule Visit Modal ────────────────────────────────────── */}
      {scheduleOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setScheduleOpen(false)}
        >
          <div className="glass-card-strong w-full max-w-lg max-h-[85vh] overflow-y-auto !rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Schedule KC Visit</h2>
              <button onClick={() => setScheduleOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>KC Location *</label>
                <select className="gl-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}>
                  {KC_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Date *</label>
                  <input type="date" className="gl-input" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Time Slot</label>
                  <select className="gl-input" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Purpose</label>
                  <select className="gl-input" value={form.purpose} onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value as VisitPurpose }))}>
                    {(["General Browse", "Project-specific", "Sample Collection", "Vendor Meeting"] as VisitPurpose[]).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Attendees</label>
                  <input type="number" className="gl-input" min="1" max="20" value={form.attendees} onChange={(e) => setForm((f) => ({ ...f, attendees: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Notes</label>
                <textarea className="gl-input" rows={3} placeholder="Any specific requirements or materials you want to see..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleSchedule}>
                  <CalendarCheck className="w-4 h-4" /> Schedule Visit
                </button>
                <button className="btn-secondary" onClick={() => setScheduleOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
