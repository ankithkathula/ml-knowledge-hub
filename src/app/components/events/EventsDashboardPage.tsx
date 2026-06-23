import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar, ChevronRight, Globe, IndianRupee, MapPin, Plus, Sparkles,
  Ticket, TrendingUp, Users, X,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  getOrganizer, eventTypeLabel, eventTypeBadge, eventCapacityFill, eventRevenue,
  getEventTypeOptions, type MlEvent, type OrganizerType, type EventType,
} from "../data/eventData";
import { useEvents } from "../data/eventsStore";

interface EventsDashboardPageProps {
  stakeholderType: OrganizerType;
  organizerId: string;
  basePath: string;
  accent: string;
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function EventsDashboardPage({ stakeholderType, organizerId, basePath, accent }: EventsDashboardPageProps) {
  const { events, addEvent } = useEvents();
  const [showModal, setShowModal] = useState(false);

  const organizer = getOrganizer(organizerId);
  const owned = events.filter((e) => e.organizerId === organizerId);
  const sponsored = events.filter((e) => e.organizerId !== organizerId && e.sponsorOrganizerIds.includes(organizerId));

  const now = Date.now();
  const upcomingOwned = owned.filter((e) => Date.parse(e.startsAt) >= now && e.status !== "cancelled");
  const completedOwned = owned.filter((e) => e.status === "completed");
  const kpis = {
    upcomingCount: upcomingOwned.length,
    completedCount: completedOwned.length,
    totalRegistrations: owned.reduce((s, e) => s + e.registeredCount, 0),
    totalRevenue: owned.reduce((s, e) => s + eventRevenue(e), 0),
    averageFill: owned.length
      ? Math.round(owned.reduce((s, e) => s + eventCapacityFill(e), 0) / owned.length)
      : 0,
  };

  const labelByType: Record<OrganizerType, string> = {
    brand: "Brand Events",
    studio: "Studio Events",
    institute: "Institute Events",
    platform: "Platform Events",
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1280px] mx-auto space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: accent }}>
            <Sparkles className="w-3.5 h-3.5" /> {labelByType[stakeholderType]}
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>{organizer?.name ?? labelByType[stakeholderType]}</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
            Manage your hosted events end-to-end and track the ones you're sponsoring.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/events" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-primary)" }}>
            <Globe className="w-4 h-4" /> Public listing
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: accent }}
          >
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <KpiTile icon={Calendar}    label="Upcoming"          value={kpis.upcomingCount}          accent={accent} />
        <KpiTile icon={Ticket}      label="Registrations"     value={kpis.totalRegistrations}     accent={accent} />
        <KpiTile icon={TrendingUp}  label="Avg fill"          value={`${kpis.averageFill}%`}      accent={accent} />
        <KpiTile icon={IndianRupee} label="Ticket revenue"    value={kpis.totalRevenue ? `₹${(kpis.totalRevenue / 100000).toFixed(1)}L` : "—"} accent={accent} />
        <KpiTile icon={Users}       label="Past events"       value={kpis.completedCount}         accent={accent} />
      </section>

      {/* My events */}
      <SectionCard title="Your hosted events" subtitle={`${owned.length} event${owned.length === 1 ? "" : "s"}`}>
        {owned.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: "var(--text-muted)" }}>You haven't hosted any events yet. Tap "New Event" to start.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {owned.map((e) => (
              <EventRowCard key={e.id} event={e} basePath={basePath} accent={accent} />
            ))}
          </div>
        )}
      </SectionCard>

      {/* Sponsored / co-presented */}
      {sponsored.length > 0 && (
        <SectionCard title="Sponsoring / co-presenting" subtitle={`${sponsored.length} other organisers' events`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsored.map((e) => (
              <EventRowCard key={e.id} event={e} basePath={basePath} accent={accent} mode="sponsor" />
            ))}
          </div>
        </SectionCard>
      )}

      {/* New Event Modal */}
      {showModal && (
        <NewEventModal
          organizerId={organizerId}
          accent={accent}
          onClose={() => setShowModal(false)}
          onSave={(event) => {
            addEvent(event);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

/* ── New Event Modal ──────────────────────────────────────────────────── */

interface NewEventForm {
  title: string;
  subtitle: string;
  type: EventType;
  startsAt: string;
  endsAt: string;
  city: string;
  venue: string;
  venueAddress: string;
  isOnline: boolean;
  capacity: string;
  isFree: boolean;
  price: string;
  description: string;
  tags: string;
  coverImage: string;
}

const DEFAULT_COVER = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200";

function toLocalDatetimeValue(offsetHours = 0): string {
  const d = new Date(Date.now() + offsetHours * 3600000);
  d.setSeconds(0, 0);
  return d.toISOString().slice(0, 16);
}

function NewEventModal({
  organizerId,
  accent,
  onClose,
  onSave,
}: {
  organizerId: string;
  accent: string;
  onClose: () => void;
  onSave: (event: MlEvent) => void;
}) {
  const [form, setForm] = useState<NewEventForm>({
    title: "",
    subtitle: "",
    type: "seminar",
    startsAt: toLocalDatetimeValue(24 * 7),
    endsAt: toLocalDatetimeValue(24 * 7 + 2),
    city: "",
    venue: "",
    venueAddress: "",
    isOnline: false,
    capacity: "100",
    isFree: true,
    price: "0",
    description: "",
    tags: "",
    coverImage: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewEventForm, string>>>({});

  function set<K extends keyof NewEventForm>(key: K, value: NewEventForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof NewEventForm, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.startsAt) e.startsAt = "Start date is required";
    if (!form.endsAt) e.endsAt = "End date is required";
    if (form.startsAt && form.endsAt && form.endsAt <= form.startsAt) e.endsAt = "End must be after start";
    if (!form.isOnline && !form.city.trim()) e.city = "City is required";
    if (!form.isOnline && !form.venue.trim()) e.venue = "Venue is required";
    if (!form.capacity || isNaN(Number(form.capacity)) || Number(form.capacity) < 1) e.capacity = "Enter a valid capacity";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const id = `evt-${organizerId}-${Date.now()}`;
    const capacity = Number(form.capacity);
    const price = form.isFree ? 0 : Number(form.price) || 0;
    const startsAt = new Date(form.startsAt).toISOString();
    const endsAt = new Date(form.endsAt).toISOString();
    const regCloses = new Date(new Date(form.startsAt).getTime() - 86400000).toISOString();

    const event: MlEvent = {
      id,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      type: form.type,
      organizerId,
      coverImage: form.coverImage.trim() || DEFAULT_COVER,
      description: form.description.trim(),
      highlights: [],
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      startsAt,
      endsAt,
      registrationOpensAt: new Date().toISOString(),
      registrationClosesAt: regCloses,
      city: form.isOnline ? "Online" : form.city.trim(),
      venue: form.venue.trim(),
      venueAddress: form.venueAddress.trim(),
      isOnline: form.isOnline,
      onlineUrl: form.isOnline ? undefined : undefined,
      capacity,
      registeredCount: 0,
      attendingCount: 0,
      status: "published",
      isInvitationOnly: false,
      isFree: form.isFree,
      ticketTiers: [
        {
          id: `tier-${id}`,
          kind: form.isFree ? "free-rsvp" : "general",
          name: form.isFree ? "Free RSVP" : "General Admission",
          price,
          capacity,
          sold: 0,
          perks: [],
        },
      ],
      speakers: [],
      sessions: [],
      sponsorOrganizerIds: [],
      isFeatured: false,
    };

    onSave(event);
  }

  const inputCls = "w-full rounded-xl px-3 py-2.5 text-sm outline-none border transition-colors focus:ring-2";
  const inputStyle = { background: "var(--bg-base, #f9f9f9)", color: "var(--text-primary)", borderColor: "rgba(0,0,0,0.12)" };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div
        className="w-full sm:max-w-[640px] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 24px 64px rgba(0,0,0,0.18)", maxHeight: "90vh" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Create new event</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Published immediately — visible on the public events page</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5">
            <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-5 py-5 space-y-4" style={{ maxHeight: "calc(90vh - 130px)" }}>

          {/* Title */}
          <Field label="Event title" error={errors.title} required>
            <input
              className={inputCls}
              style={{ ...inputStyle, borderColor: errors.title ? "#ef4444" : "rgba(0,0,0,0.12)" }}
              placeholder="e.g. Green Building Summit 2026"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>

          {/* Subtitle */}
          <Field label="Subtitle / tagline">
            <input
              className={inputCls}
              style={inputStyle}
              placeholder="One-line teaser"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </Field>

          {/* Type */}
          <Field label="Event type">
            <select
              className={inputCls}
              style={inputStyle}
              value={form.type}
              onChange={(e) => set("type", e.target.value as EventType)}
            >
              {getEventTypeOptions().map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start" error={errors.startsAt} required>
              <input
                type="datetime-local"
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.startsAt ? "#ef4444" : "rgba(0,0,0,0.12)" }}
                value={form.startsAt}
                onChange={(e) => set("startsAt", e.target.value)}
              />
            </Field>
            <Field label="End" error={errors.endsAt} required>
              <input
                type="datetime-local"
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.endsAt ? "#ef4444" : "rgba(0,0,0,0.12)" }}
                value={form.endsAt}
                onChange={(e) => set("endsAt", e.target.value)}
              />
            </Field>
          </div>

          {/* Online toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <div
              onClick={() => set("isOnline", !form.isOnline)}
              className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
              style={{ background: form.isOnline ? accent : "rgba(0,0,0,0.15)" }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow"
                style={{ transform: form.isOnline ? "translateX(18px)" : "translateX(2px)" }}
              />
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 600 }}>Online event</span>
          </label>

          {/* Location fields — hidden when online */}
          {!form.isOnline && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" error={errors.city} required>
                  <input
                    className={inputCls}
                    style={{ ...inputStyle, borderColor: errors.city ? "#ef4444" : "rgba(0,0,0,0.12)" }}
                    placeholder="e.g. Mumbai"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                  />
                </Field>
                <Field label="Venue name" error={errors.venue} required>
                  <input
                    className={inputCls}
                    style={{ ...inputStyle, borderColor: errors.venue ? "#ef4444" : "rgba(0,0,0,0.12)" }}
                    placeholder="e.g. Main Auditorium"
                    value={form.venue}
                    onChange={(e) => set("venue", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Venue address">
                <input
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Full address"
                  value={form.venueAddress}
                  onChange={(e) => set("venueAddress", e.target.value)}
                />
              </Field>
            </div>
          )}

          {/* Capacity + pricing */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Capacity" error={errors.capacity} required>
              <input
                type="number"
                min={1}
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.capacity ? "#ef4444" : "rgba(0,0,0,0.12)" }}
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
              />
            </Field>
            <Field label={form.isFree ? "Pricing — Free" : "Ticket price (₹)"}>
              <div className="flex gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFree}
                    onChange={(e) => set("isFree", e.target.checked)}
                    className="accent-current"
                    style={{ accentColor: accent }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Free</span>
                </label>
                {!form.isFree && (
                  <input
                    type="number"
                    min={0}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="0"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                  />
                )}
              </div>
            </Field>
          </div>

          {/* Description */}
          <Field label="Description">
            <textarea
              rows={3}
              className={inputCls}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="What is this event about?"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>

          {/* Tags */}
          <Field label="Tags (comma-separated)">
            <input
              className={inputCls}
              style={inputStyle}
              placeholder="e.g. sustainability, seminar, students"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
            />
          </Field>

          {/* Cover image */}
          <Field label="Cover image URL (optional)">
            <input
              className={inputCls}
              style={inputStyle}
              placeholder="https://... (leave blank for default)"
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-primary)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: accent }}
          >
            Publish event
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
        {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: "0.7rem", color: "#ef4444", marginTop: 3 }}>{error}</p>}
    </div>
  );
}

/* ── Cards ─────────────────────────────────────────────────────────────── */

function EventRowCard({ event, basePath, accent, mode = "host" }: { event: MlEvent; basePath: string; accent: string; mode?: "host" | "sponsor" }) {
  const org = getOrganizer(event.organizerId);
  const badge = eventTypeBadge(event.type);
  const fill = eventCapacityFill(event);
  const revenue = eventRevenue(event);
  return (
    <Link to={`${basePath}/${event.id}`} className="rounded-2xl overflow-hidden block transition-all hover:scale-[1.005]" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div className="aspect-[16/8] relative">
        <ImageWithFallback src={event.coverImage} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%)" }} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.95)", color: badge.color }}>{eventTypeLabel(event.type)}</span>
          {mode === "sponsor" && <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.5)", color: "white" }}>Sponsoring</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div style={{ fontSize: "0.92rem", fontWeight: 800 }} className="line-clamp-1">{event.title}</div>
          <div className="opacity-90 line-clamp-1" style={{ fontSize: "0.7rem" }}>{event.subtitle}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {fmt(event.startsAt)}</span>
          <span className="flex items-center gap-1">{event.isOnline ? <><Globe className="w-3 h-3" /> Online</> : <><MapPin className="w-3 h-3" /> {event.city}</>}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.registeredCount}/{event.capacity}</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <Funnel label="Capacity fill" value={`${fill}%`} accent={accent} />
          <Funnel label="Tiers sold" value={`${event.ticketTiers.reduce((s, t) => s + t.sold, 0)} / ${event.ticketTiers.reduce((s, t) => s + t.capacity, 0)}`} accent={accent} />
          <Funnel label="Revenue" value={revenue ? `₹${(revenue / 100000).toFixed(1)}L` : "—"} accent={accent} />
        </div>

        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2 min-w-0">
            {org && (
              <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
                <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-0.5" />
              </div>
            )}
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: 600 }} className="truncate">{org?.name ?? "—"}</span>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
        </div>
      </div>
    </Link>
  );
}

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

function Funnel({ label, value, accent }: { label: string; value: React.ReactNode; accent: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: accent }}>{value}</div>
      <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 1 }}>{label}</div>
    </div>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl p-4 sm:p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
          {subtitle && <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}
