import { Link, useParams } from "react-router";
import {
  ArrowLeft, Calendar, ChevronRight, CheckCircle2, Globe, IndianRupee,
  MapPin, Megaphone, Pencil, Send, ShieldCheck, Sparkles, Ticket, Users,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  getEvent, getOrganizer, getAttendeesForEvent, eventTypeLabel, eventTypeBadge,
  eventCapacityFill, eventRevenue, attendeeStatusBadge,
  type OrganizerType,
} from "../data/eventData";

interface EventDashboardDetailPageProps {
  stakeholderType: OrganizerType;
  basePath: string;
  accent: string;
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export function EventDashboardDetailPage({ stakeholderType, basePath, accent }: EventDashboardDetailPageProps) {
  const { eventId } = useParams();
  const event = getEvent(eventId ?? "");

  if (!event) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link to={basePath} className="text-sm font-semibold flex items-center gap-1" style={{ color: accent }}>
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
        <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>Event not found.</p>
      </div>
    );
  }

  const organizer = getOrganizer(event.organizerId);
  const attendees = getAttendeesForEvent(event.id);
  const badge = eventTypeBadge(event.type);
  const fill = eventCapacityFill(event);
  const revenue = eventRevenue(event);

  const tiers = event.ticketTiers;
  const sponsors = event.sponsorOrganizerIds.map(getOrganizer).filter((o): o is NonNullable<typeof o> => Boolean(o));

  // Capacity by attendee status
  const statusCounts = attendees.reduce((m, a) => {
    m[a.status] = (m[a.status] ?? 0) + 1;
    return m;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 sm:p-6 max-w-[1280px] mx-auto space-y-6">
      <Link to={basePath} className="text-sm font-semibold flex items-center gap-1" style={{ color: accent }}>
        <ArrowLeft className="w-4 h-4" /> All Events
      </Link>

      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
        <div className="aspect-[24/7] sm:aspect-[32/7] relative">
          <ImageWithFallback src={event.coverImage} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }} />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.95)", color: badge.color }}>{eventTypeLabel(event.type)}</span>
            {event.isFeatured && <span className="px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: accent, color: "white" }}><Sparkles className="w-2.5 h-2.5" /> Featured</span>}
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{event.title}</div>
            <div className="opacity-90" style={{ fontSize: "0.8rem" }}>{event.subtitle}</div>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 flex-wrap text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {fmt(event.startsAt)}</span>
            <span className="flex items-center gap-1">{event.isOnline ? <><Globe className="w-3.5 h-3.5" /> Online</> : <><MapPin className="w-3.5 h-3.5" /> {event.venue}</>}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {event.registeredCount}/{event.capacity}</span>
            {organizer && <span className="flex items-center gap-1 ml-2"><ShieldCheck className="w-3.5 h-3.5" /> Hosted by {organizer.name}</span>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-primary)" }}>
              <Pencil className="w-3.5 h-3.5" /> Edit Event
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: accent }}>
              <Send className="w-3.5 h-3.5" /> Send Update
            </button>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <KpiTile icon={Users}       label="Registered"  value={event.registeredCount} accent={accent} />
        <KpiTile icon={CheckCircle2} label="Confirmed"   value={statusCounts["confirmed"] ?? 0} accent={accent} />
        <KpiTile icon={Ticket}      label="Capacity"    value={`${fill}%`} accent={accent} />
        <KpiTile icon={IndianRupee} label="Revenue"     value={revenue ? `₹${revenue.toLocaleString("en-IN")}` : "—"} accent={accent} />
        <KpiTile icon={Sparkles}    label="Co-presented" value={sponsors.length} accent={accent} />
      </section>

      {/* Ticket tiers + Attendees */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Tier breakdown */}
        <SectionCard title="Ticket tiers" subtitle="Sold vs. capacity per tier">
          <div className="space-y-3">
            {tiers.map((t) => {
              const pct = t.capacity > 0 ? Math.round((t.sold / t.capacity) * 100) : 0;
              return (
                <div key={t.id} className="p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="min-w-0">
                      <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.perks.join(" · ")}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: accent }}>
                        {t.price === 0 ? "Free" : `₹${t.price.toLocaleString("en-IN")}`}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{t.sold} / {t.capacity}</div>
                    </div>
                  </div>
                  <div className="h-1.5 mt-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #f59e0b)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Attendee roster */}
        <SectionCard
          title="Attendees"
          subtitle={`${attendees.length} registrations`}
          action={<button className="text-xs font-semibold flex items-center gap-1" style={{ color: accent }}><Megaphone className="w-3 h-3" /> Email all</button>}
        >
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  <Th>Attendee</Th>
                  <Th>Type</Th>
                  <Th>City</Th>
                  <Th>Tier</Th>
                  <Th>Status</Th>
                  <Th>Registered</Th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((a) => {
                  const tier = tiers.find((t) => t.id === a.ticketTierId);
                  const sty = attendeeStatusBadge(a.status);
                  return (
                    <tr key={a.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <Td>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background: a.isVip ? "linear-gradient(135deg, #f59e0b, #ef4444)" : accent }}>
                            {a.userName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>{a.userName}{a.isVip && <span className="ml-1 text-[10px] font-bold text-amber-600">VIP</span>}</div>
                            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{a.email}</div>
                          </div>
                        </div>
                      </Td>
                      <Td><span className="text-xs capitalize" style={{ color: "var(--text-secondary)" }}>{a.userType.replace("-", " ")}</span></Td>
                      <Td><span className="text-xs" style={{ color: "var(--text-secondary)" }}>{a.city}</span></Td>
                      <Td><span className="text-xs" style={{ color: "var(--text-secondary)" }}>{tier?.name ?? "—"}</span></Td>
                      <Td><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold inline-block" style={{ background: sty.bg, color: sty.color }}>{sty.label}</span></Td>
                      <Td><span className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(a.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span></Td>
                    </tr>
                  );
                })}
                {attendees.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>No registrations yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Agenda + sponsors */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <SectionCard title="Agenda" subtitle="Schedule visible to attendees">
          {event.sessions.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>No sessions added yet.</p>
          ) : (
            <ol className="space-y-2">
              {event.sessions.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-3 p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <div className="min-w-0">
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.title}</div>
                    {s.speakerNames && s.speakerNames.length > 0 && (
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>with {s.speakerNames.join(", ")}</div>
                    )}
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {new Date(s.startsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })} – {new Date(s.endsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </SectionCard>

        <SectionCard title="Co-presented with" subtitle={`${sponsors.length} partner${sponsors.length === 1 ? "" : "s"}`}>
          {sponsors.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>No sponsors / co-presenters.</p>
          ) : (
            <div className="space-y-2">
              {sponsors.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{s.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "capitalize" }}>{s.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

/* ── Bits ──────────────────────────────────────────────────────────────── */

function KpiTile({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: number | string; accent: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: `${accent}15` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
      </div>
      <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 1 }}>{label}</div>
    </div>
  );
}

function SectionCard({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl p-4 sm:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
          {subtitle && <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2.5 align-middle">{children}</td>;
}
