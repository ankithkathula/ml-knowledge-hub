import { Link, useParams } from "react-router";
import {
  ArrowLeft, Calendar, MapPin, Ticket, Users, Globe, CheckCircle2, Lock,
  Sparkles, Clock, Heart, Share2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  getEvent, getOrganizer, eventTypeLabel, eventTypeBadge, eventCapacityFill,
  type TicketTier,
} from "../data/eventData";

const ACCENT = "#ff6a3d";

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function fmtTimeRange(startIso: string, endIso: string): string {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const timeFmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" });
  return `${timeFmt.format(s)} – ${timeFmt.format(e)}`;
}

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = getEvent(eventId ?? "");

  if (!event) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link to="/events" className="text-sm font-semibold flex items-center gap-1" style={{ color: ACCENT }}>
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
        <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>Event not found.</p>
      </div>
    );
  }

  const org = getOrganizer(event.organizerId);
  const fill = eventCapacityFill(event);
  const badge = eventTypeBadge(event.type);
  const sponsors = event.sponsorOrganizerIds.map(getOrganizer).filter((o): o is NonNullable<typeof o> => Boolean(o));

  const cheapest = [...event.ticketTiers].sort((a, b) => a.price - b.price)[0];

  return (
    <div className="min-h-screen" style={{ background: "#fafafa" }}>
      {/* Hero */}
      <section className="relative" style={{ background: "#0f172a", color: "white" }}>
        <ImageWithFallback src={event.coverImage} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.95) 100%)" }} />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link to="/events" className="text-xs font-semibold flex items-center gap-1 opacity-80 mb-6 hover:opacity-100" style={{ color: "white" }}>
            <ArrowLeft className="w-4 h-4" /> Events
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.95)", color: badge.color }}>{eventTypeLabel(event.type)}</span>
            {event.isInvitationOnly && <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ background: "rgba(0,0,0,0.5)", color: "white" }}><Lock className="w-3 h-3" /> Invite only</span>}
            {event.isFeatured && <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1" style={{ background: ACCENT }}><Sparkles className="w-3 h-3" /> Featured</span>}
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1.1, maxWidth: "780px" }}>{event.title}</h1>
          <p className="mt-3 opacity-90" style={{ fontSize: "1rem", lineHeight: 1.5, maxWidth: "780px" }}>{event.subtitle}</p>

          <div className="mt-5 flex items-center gap-3 flex-wrap text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 opacity-80" /> {fmt(event.startsAt)}</span>
            <span className="flex items-center gap-1.5">{event.isOnline ? <><Globe className="w-4 h-4 opacity-80" /> Online ({event.city})</> : <><MapPin className="w-4 h-4 opacity-80" /> {event.venue}</>}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 opacity-80" /> {event.registeredCount}/{event.capacity}</span>
          </div>

          {/* Organizer + actions */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            {org && (
              <Link to="#" className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
                <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center" style={{ background: "rgba(255,255,255,0.95)" }}>
                  <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs opacity-80">Hosted by</div>
                  <div className="text-sm font-semibold">{org.name}</div>
                </div>
              </Link>
            )}
            <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2" style={{ background: ACCENT }}>
              <Ticket className="w-4 h-4" /> {event.isFree ? "RSVP free" : cheapest ? `Book from ₹${cheapest.price.toLocaleString("en-IN")}` : "Book"}
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.10)" }}><Heart className="w-4 h-4" /></button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.10)" }}><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* About */}
          <Card title="About this event">
            <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{event.description}</p>
            <ul className="mt-4 space-y-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} /> {h}
                </li>
              ))}
            </ul>
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${ACCENT}10`, color: ACCENT }}>#{t}</span>
                ))}
              </div>
            )}
          </Card>

          {/* Agenda */}
          {event.sessions.length > 0 && (
            <Card title="Agenda">
              <ol className="relative space-y-3">
                <div className="absolute left-[13px] top-2 bottom-2 w-px" style={{ background: "rgba(0,0,0,0.08)" }} />
                {event.sessions.map((s) => (
                  <li key={s.id} className="flex items-start gap-3 relative">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{s.title}</div>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{fmtTimeRange(s.startsAt, s.endsAt)}</span>
                      </div>
                      {s.speakerNames && s.speakerNames.length > 0 && (
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>with {s.speakerNames.join(", ")}</div>
                      )}
                      {s.description && (
                        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>{s.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <Card title="Speakers">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((sp) => (
                  <div key={sp.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="w-11 h-11 rounded-xl text-white flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: sp.color }}>{sp.initials}</div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate" style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{sp.name}</div>
                      <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{sp.title}</div>
                      <div className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>{sp.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Sponsors */}
          {sponsors.length > 0 && (
            <Card title="Co-presented with">
              <div className="flex flex-wrap gap-3">
                {sponsors.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-0.5" />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Tickets */}
          <Card title="Tickets">
            <div className="space-y-2">
              {event.ticketTiers.map((t) => (
                <TicketCard key={t.id} tier={t} disabled={event.isInvitationOnly && t.kind !== "invitation-only"} />
              ))}
            </div>
            {event.isInvitationOnly && (
              <p className="mt-3 text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <Lock className="w-3 h-3" /> This is an invite-only event. Confirm your access code on booking.
              </p>
            )}
          </Card>

          {/* Capacity + Date/Venue card */}
          <Card title="At a glance">
            <div className="space-y-3">
              <Field icon={Calendar} label="When" value={fmt(event.startsAt)} />
              <Field icon={Clock} label="Duration" value={`${fmtTimeRange(event.startsAt, event.endsAt)} · ${Math.round((Date.parse(event.endsAt) - Date.parse(event.startsAt)) / 3.6e6 * 10) / 10} hr`} />
              <Field icon={event.isOnline ? Globe : MapPin} label={event.isOnline ? "Online" : "Venue"} value={event.isOnline ? event.onlineUrl ?? "—" : event.venue} secondary={!event.isOnline ? event.venueAddress : undefined} />
              <Field icon={Users} label="Capacity" value={`${event.registeredCount}/${event.capacity} (${fill}%)`} />
              <Field icon={Ticket} label="Registration closes" value={fmt(event.registrationClosesAt)} />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <h2 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.9rem" }}>{title}</h2>
      {children}
    </section>
  );
}

function TicketCard({ tier, disabled }: { tier: TicketTier; disabled?: boolean }) {
  const remaining = tier.capacity - tier.sold;
  const isSoldOut = remaining <= 0;
  return (
    <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: disabled || isSoldOut ? "rgba(0,0,0,0.02)" : `${ACCENT}05`, border: `1px solid ${disabled || isSoldOut ? "rgba(0,0,0,0.06)" : ACCENT + "20"}` }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{tier.name}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>{isSoldOut ? "Sold out" : `${remaining} left`}</div>
          </div>
          <div className="text-right">
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: tier.price === 0 ? "#10b981" : ACCENT }}>
              {tier.price === 0 ? "Free" : `₹${tier.price.toLocaleString("en-IN")}`}
            </div>
          </div>
        </div>
        <ul className="mt-2 space-y-1">
          {tier.perks.map((p) => (
            <li key={p} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: tier.price === 0 ? "#10b981" : ACCENT }} /> {p}
            </li>
          ))}
        </ul>
        <button disabled={disabled || isSoldOut} className="mt-3 w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: tier.price === 0 ? "#10b981" : ACCENT, color: "white" }}>
          {isSoldOut ? "Sold out" : disabled ? "Invite required" : tier.price === 0 ? "RSVP" : "Book now"}
        </button>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, secondary }: { icon: React.ElementType; label: string; value: React.ReactNode; secondary?: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}10` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>{label}</div>
        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{value}</div>
        {secondary && <div className="text-xs" style={{ color: "var(--text-muted)" }}>{secondary}</div>}
      </div>
    </div>
  );
}
