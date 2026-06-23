import { useState } from "react";
import {
  CalendarCheck, MapPin, Clock, Ticket,
  Building2, CheckCircle2, AlertCircle, XCircle,
  Download, ExternalLink, ChevronRight, CalendarClock,
} from "lucide-react";

const ACCENT = "#0891b2";
const ACCENT_RGB = "8,145,178";

type EventStatus = "confirmed" | "pending" | "cancelled" | "attended";
type EventTab = "all" | "upcoming" | "past";

interface EventActivity {
  id: string;
  title: string;
  organizer: string;
  organizerType: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  ticketId: string;
  status: EventStatus;
  category: string;
  past: boolean;
  thumbnailColor: string;
}

const STATUS_CONFIG: Record<EventStatus, { label: string; icon: typeof CheckCircle2; color: string; bg: string }> = {
  confirmed: { label: "Confirmed",  icon: CheckCircle2,  color: "#0891b2", bg: "rgba(8,145,178,0.1)"   },
  pending:   { label: "Pending",    icon: AlertCircle,   color: "#d97706", bg: "rgba(245,158,11,0.1)"  },
  cancelled: { label: "Cancelled",  icon: XCircle,       color: "#ef4444", bg: "rgba(239,68,68,0.1)"   },
  attended:  { label: "Attended",   icon: CheckCircle2,  color: "#10b981", bg: "rgba(16,185,129,0.1)"  },
};

const EVENTS: EventActivity[] = [
  {
    id: "E01",
    title: "UltraTech Innovation Day 2026",
    organizer: "UltraTech Cement",
    organizerType: "Brand Event",
    date: "Jun 10, 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "Bangalore International Exhibition Centre",
    city: "Bangalore",
    ticketId: "UTC-2026-0483",
    status: "confirmed",
    category: "Brand Launch",
    past: false,
    thumbnailColor: "#0891b2",
  },
  {
    id: "E02",
    title: "MaterialKart Design Week",
    organizer: "MaterialKart",
    organizerType: "Platform Event",
    date: "Jul 5–7, 2026",
    time: "9:00 AM – 7:00 PM",
    venue: "NSIC Exhibition Grounds",
    city: "New Delhi",
    ticketId: "MKW-2026-1124",
    status: "confirmed",
    category: "Exhibition",
    past: false,
    thumbnailColor: "#7c3aed",
  },
  {
    id: "E03",
    title: "Asian Paints Colour Reveal 2026",
    organizer: "Asian Paints",
    organizerType: "Brand Event",
    date: "Jun 22, 2026",
    time: "6:30 PM – 9:00 PM",
    venue: "The Leela Palace",
    city: "Mumbai",
    ticketId: "APC-2026-0099",
    status: "pending",
    category: "Product Launch",
    past: false,
    thumbnailColor: "#ea580c",
  },
  {
    id: "E04",
    title: "BIM in Construction Summit",
    organizer: "CREDAI",
    organizerType: "Industry Summit",
    date: "Apr 18, 2026",
    time: "9:30 AM – 6:00 PM",
    venue: "Hotel Conrad",
    city: "Pune",
    ticketId: "BIM-2026-0312",
    status: "attended",
    category: "Conference",
    past: true,
    thumbnailColor: "#0f766e",
  },
  {
    id: "E05",
    title: "Kajaria World of Tiles 2026",
    organizer: "Kajaria Ceramics",
    organizerType: "Brand Showcase",
    date: "Mar 14, 2026",
    time: "11:00 AM – 8:00 PM",
    venue: "Expo Centre, Pragati Maidan",
    city: "New Delhi",
    ticketId: "KJR-2026-0778",
    status: "attended",
    category: "Exhibition",
    past: true,
    thumbnailColor: "#be185d",
  },
  {
    id: "E06",
    title: "CERA Annual Product Showcase",
    organizer: "CERA Sanitaryware",
    organizerType: "Brand Event",
    date: "Feb 27, 2026",
    time: "10:00 AM – 6:00 PM",
    venue: "HITEX Exhibition Centre",
    city: "Hyderabad",
    ticketId: "CER-2026-0201",
    status: "cancelled",
    category: "Showcase",
    past: true,
    thumbnailColor: "#6366f1",
  },
];

function EventCard({ event }: { event: EventActivity }) {
  const st = STATUS_CONFIG[event.status];
  const StatusIcon = st.icon;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all hover:shadow-md"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Color band + category */}
      <div
        className="h-1.5 w-full"
        style={{ background: event.thumbnailColor }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${event.thumbnailColor}14` }}
            >
              <CalendarCheck style={{ width: 20, height: 20, color: event.thumbnailColor }} />
            </div>

            <div className="min-w-0">
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                {event.title}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 style={{ width: 12, height: 12, color: "var(--text-muted)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  {event.organizer}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                  style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}
                >
                  {event.organizerType}
                </span>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <span
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
            style={{ background: st.bg, color: st.color }}
          >
            <StatusIcon style={{ width: 11, height: 11 }} />
            {st.label}
          </span>
        </div>

        {/* Details row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
          <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            <CalendarClock style={{ width: 13, height: 13, color: ACCENT }} />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            <Clock style={{ width: 13, height: 13, color: ACCENT }} />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            <MapPin style={{ width: 13, height: 13, color: ACCENT }} />
            {event.venue}, {event.city}
          </span>
        </div>

        {/* Ticket strip */}
        <div
          className="flex items-center justify-between mt-4 px-3.5 py-2.5 rounded-xl"
          style={{ background: `rgba(${ACCENT_RGB},0.05)`, border: `1px dashed rgba(${ACCENT_RGB},0.25)` }}
        >
          <span className="flex items-center gap-2" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            <Ticket style={{ width: 13, height: 13, color: ACCENT }} />
            Ticket ID
            <span style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
              {event.ticketId}
            </span>
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-semibold"
            style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
          >
            {event.category}
          </span>
        </div>

        {/* Actions */}
        {!event.past && event.status !== "cancelled" && (
          <div className="flex gap-2 mt-4">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
            >
              <Download style={{ width: 13, height: 13 }} />
              Download Ticket
            </button>
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
            >
              <ExternalLink style={{ width: 13, height: 13 }} />
              Event Details
            </button>
          </div>
        )}
        {event.past && event.status === "attended" && (
          <div className="flex gap-2 mt-4">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}
            >
              <ChevronRight style={{ width: 13, height: 13 }} />
              View Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function CustomerActivitiesPage() {
  const [tab, setTab] = useState<EventTab>("all");

  const upcoming = EVENTS.filter((e) => !e.past);
  const past = EVENTS.filter((e) => e.past);
  const confirmed = upcoming.filter((e) => e.status === "confirmed").length;

  const displayed =
    tab === "all" ? EVENTS :
    tab === "upcoming" ? upcoming :
    past;

  const TABS: Array<{ key: EventTab; label: string; count: number }> = [
    { key: "all",      label: "All",      count: EVENTS.length },
    { key: "upcoming", label: "Upcoming", count: upcoming.length },
    { key: "past",     label: "Past",     count: past.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[860px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>My Activities</h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 3 }}>
          Events you've registered for — upcoming and past
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Registered",  value: upcoming.length, color: ACCENT, bg: `rgba(${ACCENT_RGB},0.08)` },
          { label: "Confirmed",   value: confirmed,        color: "#10b981", bg: "rgba(16,185,129,0.08)" },
          { label: "Attended",    value: past.filter((e) => e.status === "attended").length, color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 text-center"
            style={{ background: s.bg, border: `1px solid ${s.color}20` }}
          >
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t.key ? ACCENT : "rgba(0,0,0,0.05)",
              color: tab === t.key ? "white" : "var(--text-secondary)",
            }}
          >
            {t.label}
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: tab === t.key ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)",
                color: tab === t.key ? "white" : "var(--text-muted)",
              }}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Event cards */}
      {displayed.length === 0 ? (
        <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
          <CalendarCheck style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.3 }} />
          <p style={{ fontSize: "0.88rem" }}>No events here yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
