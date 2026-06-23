import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Calendar, MapPin, Search, Sparkles, Ticket, Users, Globe, Filter,
  Sun, TrendingUp, ChevronRight, Flame, Zap, Lock, Plus, X,
  Building2, Compass, Clock, ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  getOrganizer,
  getEventTypeOptions, eventTypeLabel, eventTypeBadge, eventCapacityFill,
  type EventType, type MlEvent,
} from "../data/eventData";
import { useEvents } from "../data/eventsStore";

const ACCENT = "#ff6a3d";
const LINE = "1px solid rgba(0,0,0,0.08)";

/* ── Helpers ── */

function fmtRange(startIso: string, endIso: string): string {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const sameDay = s.toDateString() === e.toDateString();
  const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });
  const timeFmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `${dateFmt.format(s)} · ${timeFmt.format(s)}–${timeFmt.format(e)}`;
  return `${dateFmt.format(s)} – ${dateFmt.format(e)}`;
}

function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const DAY = 1000 * 60 * 60 * 24;
function withinDays(iso: string, days: number): boolean {
  const t = Date.parse(iso) - Date.now();
  return t >= 0 && t <= days * DAY;
}

function eventCheapest(e: MlEvent): { price: number; label: string } {
  const tier = [...e.ticketTiers].sort((a, b) => a.price - b.price)[0];
  if (!tier || tier.price === 0) return { price: 0, label: "Free" };
  return { price: tier.price, label: `₹${tier.price.toLocaleString("en-IN")}` };
}

/* ── Page ── */

export function EventsBrowsePage() {
  const { events } = useEvents();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<EventType | "all">("all");
  const [city, setCity] = useState<string>("all");
  const [pricing, setPricing] = useState<"all" | "free" | "paid">("all");
  const [mode, setMode] = useState<"all" | "in-person" | "online">("all");
  const [dateRange, setDateRange] = useState<"all" | "week" | "month">("all");

  const cities = useMemo(() => Array.from(new Set(events.map((e) => e.city))).sort(), [events]);

  const upcoming = useMemo(() => {
    const now = Date.now();
    return events
      .filter((e) => Date.parse(e.startsAt) >= now && e.status !== "cancelled")
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return upcoming.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (city !== "all" && e.city !== city) return false;
      if (pricing === "free" && !e.isFree) return false;
      if (pricing === "paid" && e.isFree) return false;
      if (mode === "in-person" && e.isOnline) return false;
      if (mode === "online" && !e.isOnline) return false;
      if (dateRange === "week" && !withinDays(e.startsAt, 7)) return false;
      if (dateRange === "month" && !withinDays(e.startsAt, 30)) return false;
      if (q) {
        const hay = `${e.title} ${e.subtitle} ${e.tags.join(" ")} ${getOrganizer(e.organizerId)?.name ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, type, city, pricing, mode, dateRange, upcoming]);

  const featured = useMemo(() => filtered.filter((e) => e.isFeatured), [filtered]);
  const flagship = useMemo(() => upcoming.filter((e) => e.isFeatured)[0], [upcoming]);
  const thisWeek = filtered.filter((e) => withinDays(e.startsAt, 7));
  const productLaunch = filtered.filter((e) => e.type === "product-launch");
  const competitions = filtered.filter((e) => e.type === "competition");
  const freeRsvp = filtered.filter((e) => e.isFree);

  const typeOptions = getEventTypeOptions();
  const activeFilterCount = [
    type !== "all", city !== "all", pricing !== "all",
    mode !== "all", dateRange !== "all",
  ].filter(Boolean).length;

  function clearFilters() {
    setType("all"); setCity("all"); setPricing("all");
    setMode("all"); setDateRange("all"); setQuery("");
  }

  return (
    <div className="min-h-screen" style={{ background: "#fafaf9" }}>

      {/* ── Page header ── */}
      <div style={{ background: "white", borderBottom: LINE }}>
        <div className="max-w-[1320px] mx-auto px-6 py-4 flex items-center gap-4">
          <div>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Material Library · Knowledge Center
            </p>
            <h1 style={{ fontSize: "1.45rem", fontWeight: 900, letterSpacing: "-0.025em", color: "#1a1a1a", lineHeight: 1.1, marginTop: 2 }}>
              Events
            </h1>
          </div>
          <div className="flex-1 mx-4">
            <label className="flex items-center gap-2.5 rounded-xl px-4 py-2.5" style={{ background: "#f4f4f2", border: LINE }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, brands or topics…"
                className="bg-transparent outline-none w-full"
                style={{ fontSize: "0.875rem", color: "#1a1a1a" }}
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <X className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                </button>
              )}
            </label>
          </div>
          <Link
            to="/studio/events"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white flex-shrink-0"
            style={{ background: "#1a1a1a", fontSize: "0.82rem", fontWeight: 700 }}
          >
            <Plus className="w-4 h-4" /> Post Event
          </Link>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto flex gap-0">

        {/* ── Sidebar ── */}
        <aside
          className="flex-shrink-0 hidden lg:block"
          style={{ width: 260, position: "sticky", top: 0, alignSelf: "flex-start", height: "100vh", overflowY: "auto", borderRight: LINE, background: "white" }}
        >
          <div className="p-5">

            {/* Filter header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" style={{ color: "#1a1a1a" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1a1a1a" }}>Filter By</span>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1" style={{ fontSize: "0.68rem", fontWeight: 700, color: ACCENT }}>
                  <X className="w-3 h-3" /> Clear ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Category / Event Type */}
            <div style={{ borderTop: LINE, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Event Type</p>
              <div className="space-y-1">
                <SidebarCategoryRow
                  label="All Types"
                  count={upcoming.length}
                  active={type === "all"}
                  onClick={() => setType("all")}
                />
                {typeOptions.map((t) => {
                  const count = upcoming.filter((e) => e.type === t.id).length;
                  return (
                    <SidebarCategoryRow
                      key={t.id}
                      label={t.label}
                      count={count}
                      active={type === t.id}
                      onClick={() => setType(t.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Date Range */}
            <div style={{ borderTop: LINE, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Date</p>
              <div className="space-y-1">
                {(["all", "week", "month"] as const).map((d) => (
                  <SidebarCategoryRow
                    key={d}
                    label={d === "all" ? "Any time" : d === "week" ? "This week" : "This month"}
                    active={dateRange === d}
                    onClick={() => setDateRange(d)}
                  />
                ))}
              </div>
            </div>

            {/* Mode */}
            <div style={{ borderTop: LINE, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Format</p>
              <div className="flex gap-2 flex-wrap">
                {(["all", "in-person", "online"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="px-3 py-1.5 rounded-full transition-all"
                    style={{
                      fontSize: "0.72rem", fontWeight: 600,
                      background: mode === m ? "#1a1a1a" : "transparent",
                      color: mode === m ? "white" : "#1a1a1a",
                      border: `1px solid ${mode === m ? "#1a1a1a" : "rgba(0,0,0,0.18)"}`,
                    }}
                  >
                    {m === "all" ? "All" : m === "in-person" ? "In-person" : "Online"}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div style={{ borderTop: LINE, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Pricing</p>
              <div className="flex gap-2 flex-wrap">
                {(["all", "free", "paid"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPricing(p)}
                    className="px-3 py-1.5 rounded-full transition-all"
                    style={{
                      fontSize: "0.72rem", fontWeight: 600,
                      background: pricing === p ? "#1a1a1a" : "transparent",
                      color: pricing === p ? "white" : "#1a1a1a",
                      border: `1px solid ${pricing === p ? "#1a1a1a" : "rgba(0,0,0,0.18)"}`,
                    }}
                  >
                    {p === "all" ? "All" : p === "free" ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div style={{ borderTop: LINE, paddingTop: 16, marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>City</p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 outline-none"
                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a1a", background: "#f4f4f2", border: LINE }}
              >
                <option value="all">All cities</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Quick stats */}
            <div style={{ borderTop: LINE, paddingTop: 16 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Quick links</p>
              <div className="space-y-1">
                <SidebarCategoryRow label="Free RSVPs" count={freeRsvp.length} active={false} onClick={() => setPricing("free")} icon={<Ticket className="w-3 h-3" />} />
                <SidebarCategoryRow label="Happening this week" count={thisWeek.length} active={false} onClick={() => setDateRange("week")} icon={<Sun className="w-3 h-3" />} />
                <SidebarCategoryRow label="Competitions" count={competitions.length} active={false} onClick={() => setType("competition")} icon={<TrendingUp className="w-3 h-3" />} />
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 px-6 py-6">

          {/* Flagship banner */}
          {flagship && (
            <Link
              to={`/events/${flagship.id}`}
              className="block rounded-2xl overflow-hidden mb-8 group relative"
              style={{ height: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            >
              <ImageWithFallback src={flagship.coverImage} alt={flagship.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: ACCENT, color: "white" }}>
                    <Flame className="w-2.5 h-2.5" /> Featured Event
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(8px)" }}>
                    {eventTypeLabel(flagship.type)}
                  </span>
                  {flagship.isFree && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(8px)" }}>
                      Free RSVP
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "white", lineHeight: 1.1, maxWidth: 580 }}>
                  {flagship.title}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: 6, maxWidth: 480, lineHeight: 1.5 }} className="line-clamp-2">
                  {flagship.subtitle}
                </p>
                <div className="flex items-center gap-4 mt-4 text-white/80" style={{ fontSize: "0.75rem" }}>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {fmtRange(flagship.startsAt, flagship.endsAt)}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {flagship.venue}, {flagship.city}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {flagship.registeredCount} registered</span>
                </div>
              </div>
              <div className="absolute top-6 right-7 flex items-center gap-2 text-white">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          )}

          {/* Category pill rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6" style={{ borderBottom: LINE }}>
            <button
              onClick={() => setType("all")}
              className="px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0"
              style={{ fontSize: "0.75rem", fontWeight: 700, background: type === "all" ? "#1a1a1a" : "transparent", color: type === "all" ? "white" : "#1a1a1a", border: `1px solid ${type === "all" ? "#1a1a1a" : "rgba(0,0,0,0.18)"}` }}
            >
              All ({upcoming.length})
            </button>
            {typeOptions.map((t) => {
              const count = upcoming.filter((e) => e.type === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className="px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0"
                  style={{ fontSize: "0.75rem", fontWeight: 700, background: type === t.id ? "#1a1a1a" : "transparent", color: type === t.id ? "white" : "#1a1a1a", border: `1px solid ${type === t.id ? "#1a1a1a" : "rgba(0,0,0,0.18)"}` }}
                >
                  {t.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Results count + active filters */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {filtered.length} event{filtered.length !== 1 ? "s" : ""}
              </span>
              {activeFilterCount > 0 && (
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: 8 }}>
                  · {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active
                  <button onClick={clearFilters} style={{ color: ACCENT, fontWeight: 700, marginLeft: 6 }}>Clear</button>
                </span>
              )}
            </div>
          </div>

          {/* ── Themed sections ── */}
          {thisWeek.length > 0 && type === "all" && dateRange !== "month" && (
            <Section title="Happening this week" subtitle={`${thisWeek.length} events between now and Sunday`} icon={Sun} accent={ACCENT}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {thisWeek.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </Section>
          )}

          {/* Studio spotlight ad */}
          <EventsStudioAd
            name="BDP India"
            tagline="Architecture from hospitality to healthcare"
            desc="BDP India's Bengaluru studio is actively hiring mid-senior architects and BIM coordinators. View open roles on their studio profile."
            tags={["Architecture", "BIM", "Healthcare", "Hospitality"]}
            imgUrl="https://picsum.photos/seed/bdp-india-studio/900/400"
            cta="View Studio & Open Roles"
            profilePath="/studio/bdp-india"
            stat="8+"
            statLabel="active projects in India"
          />

          {productLaunch.length > 0 && (type === "all" || type === "product-launch") && (
            <Section title="Product Launches" subtitle="New 2026 reveals from your favourite brands" icon={Zap} accent="#7c3aed">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {productLaunch.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </Section>
          )}

          {competitions.length > 0 && (type === "all" || type === "competition") && thisWeek.length === 0 && (
            <Section title="Competitions & Awards" subtitle="Live design briefs with cash prizes and recruiter interviews" icon={TrendingUp} accent="#ec4899">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {competitions.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </Section>
          )}

          {/* Studio spotlight ad */}
          <EventsStudioAd
            name="Morphogenesis"
            tagline="India's most awarded sustainable architecture firm"
            desc="LEED Platinum, net-zero campuses, civic-scale mixed-use — now partnering with Material Library to host exclusive KC visits and design seminars in 2026."
            tags={["Architecture", "Sustainability", "Campus Design"]}
            imgUrl="https://picsum.photos/seed/morphogenesis-campus/900/400"
            cta="Follow & Get Event Alerts"
            profilePath="/studio/morphogenesis"
            stat="28"
            statLabel="national & international awards"
            dark
          />

          {/* ── Ad banner ── */}
          <div className="mb-8">
            <AdBanner />
          </div>

          {/* ── All upcoming grid ── */}
          <Section title="All upcoming events" subtitle={`${filtered.length} event${filtered.length !== 1 ? "s" : ""} matching your filters`} icon={Filter} accent={ACCENT}>
            {filtered.length === 0 ? (
              <div className="py-16 text-center rounded-2xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px dashed rgba(0,0,0,0.1)" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>No events match those filters.</p>
                <button onClick={clearFilters} className="mt-3" style={{ fontSize: "0.8rem", fontWeight: 700, color: ACCENT }}>Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </Section>

        </main>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({
  title, subtitle, icon: Icon, accent = ACCENT, children,
}: {
  title: string; subtitle: string; icon: React.ElementType; accent?: string; children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        </div>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2 }}>{title}</h2>
          <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Sidebar category row ── */
function SidebarCategoryRow({
  label, count, active, onClick, icon,
}: {
  label: string; count?: number; active: boolean; onClick: () => void; icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left transition-all"
      style={{
        background: active ? `${ACCENT}12` : "transparent",
        border: active ? `1px solid ${ACCENT}30` : "1px solid transparent",
      }}
    >
      <div className="flex items-center gap-2">
        {icon && <span style={{ color: active ? ACCENT : "var(--text-muted)" }}>{icon}</span>}
        <span style={{ fontSize: "0.8rem", fontWeight: active ? 700 : 500, color: active ? ACCENT : "#1a1a1a" }}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span
          className="px-1.5 py-0.5 rounded-full"
          style={{ fontSize: "0.62rem", fontWeight: 700, background: active ? ACCENT : "rgba(0,0,0,0.06)", color: active ? "white" : "var(--text-muted)" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ── Event card ── */
function EventCard({ event }: { event: MlEvent }) {
  const org = getOrganizer(event.organizerId);
  const badge = eventTypeBadge(event.type);
  const fill = eventCapacityFill(event);
  const cheap = eventCheapest(event);
  const spotsLeft = event.capacity - event.registeredCount;
  const almostFull = fill >= 75;

  return (
    <Link
      to={`/events/${event.id}`}
      className="block rounded-2xl overflow-hidden group transition-all hover:-translate-y-0.5"
      style={{ background: "white", border: LINE, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", textDecoration: "none" }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <ImageWithFallback
          src={event.coverImage}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.42) 0%, transparent 55%)" }} />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: badge.bg, color: badge.color }}>
            {eventTypeLabel(event.type)}
          </span>
          {event.isFeatured && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: ACCENT, color: "white" }}>
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Top-right badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {event.isInvitationOnly && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: "rgba(0,0,0,0.65)", color: "white" }}>
              <Lock className="w-2.5 h-2.5" /> Invite
            </span>
          )}
          <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: cheap.price === 0 ? "rgba(16,185,129,0.9)" : "rgba(0,0,0,0.65)", color: "white" }}>
            {cheap.label}
          </span>
        </div>

        {/* Bottom: date on image */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-1" style={{ fontSize: "0.7rem", opacity: 0.9 }}>
            <Clock className="w-3 h-3" /> {fmtDateShort(event.startsAt)}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title */}
        <h3 className="line-clamp-2" style={{ fontSize: "0.88rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35, marginBottom: 4 }}>
          {event.title}
        </h3>
        <p className="line-clamp-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 10 }}>
          {event.isOnline ? "Online" : `${event.venue}, ${event.city}`}
        </p>

        {/* Tag pills */}
        {event.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Organizer + price */}
        <div className="flex items-center justify-between gap-2 mb-3" style={{ paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-1.5 min-w-0">
            {org && (
              <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
                <img src={org.logo} alt={org.name} className="w-full h-full object-contain" />
              </div>
            )}
            <span className="truncate" style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)" }}>{org?.name ?? "—"}</span>
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: cheap.price === 0 ? "#10b981" : ACCENT, flexShrink: 0 }}>
            {cheap.label}
          </span>
        </div>

        {/* Capacity bar */}
        <div>
          <div className="h-1 rounded-full overflow-hidden mb-1" style={{ background: "rgba(0,0,0,0.06)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${fill}%`,
                background: almostFull ? `linear-gradient(90deg, ${ACCENT}, #f59e0b)` : `linear-gradient(90deg, #10b981, #34d399)`,
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
              <Users className="inline w-3 h-3 -mt-0.5 mr-0.5" />
              {event.registeredCount.toLocaleString()} registered
            </span>
            <span style={{ fontSize: "0.62rem", fontWeight: 700, color: almostFull ? ACCENT : "var(--text-muted)" }}>
              {almostFull ? `${spotsLeft} spots left` : `${event.capacity - event.registeredCount} open`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Ad banner ── */
function AdBanner() {
  return (
    <Link
      to="/studio/events"
      className="block rounded-2xl overflow-hidden relative"
      style={{ background: "linear-gradient(120deg, #ff6a3d 0%, #f59e0b 100%)", boxShadow: "0 12px 32px rgba(255,106,61,0.2)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center text-white">
        <div className="p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-widest opacity-90 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> For brands & studios
          </p>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.2 }}>
            List your event in front of 12,000 architects
          </h3>
          <p className="mt-2 opacity-90 max-w-[400px]" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
            Featured rail placement, brand-follower push notifications, and full RSVP analytics dashboard.
          </p>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}>
              <Building2 className="w-3 h-3" /> Brand events
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}>
              <Compass className="w-3 h-3" /> KC visits
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "white", color: ACCENT }}>
              Get a slot <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        <div className="hidden md:block relative h-full min-h-[160px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>
      </div>
    </Link>
  );
}

function EventsStudioAd({
  name, tagline, desc, tags, imgUrl, cta, profilePath, stat, statLabel, dark = false,
}: {
  name: string; tagline: string; desc: string; tags: string[];
  imgUrl: string; cta: string; profilePath: string;
  stat: string; statLabel: string; dark?: boolean;
}) {
  const bg = dark ? "#1a1a1a" : "white";
  const textPrimary = dark ? "#fff" : "#1a1a1a";
  const textMuted = dark ? "rgba(255,255,255,0.5)" : "var(--text-muted)";
  const textSecondary = dark ? "rgba(255,255,255,0.8)" : "var(--text-secondary)";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tagBg = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  const tagColor = dark ? "rgba(255,255,255,0.8)" : "#1a1a1a";

  return (
    <div className="rounded-2xl overflow-hidden mb-8 grid md:grid-cols-2" style={{ background: bg, border: `1px solid ${borderColor}`, boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="flex flex-col justify-center p-7 gap-3">
        <p style={{ fontSize: "0.6rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.14em" }}>
          Sponsored · Studio Spotlight
        </p>
        <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: textPrimary, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{name}</h3>
        <p style={{ fontSize: "0.88rem", fontWeight: 700, color: textSecondary, lineHeight: 1.4 }}>{tagline}</p>
        <p style={{ fontSize: "0.78rem", color: textMuted, lineHeight: 1.65 }}>{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, background: tagBg, color: tagColor }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 mt-1">
          <div>
            <p style={{ fontSize: "1.5rem", fontWeight: 900, color: dark ? ACCENT : "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1 }}>{stat}</p>
            <p style={{ fontSize: "0.65rem", color: textMuted, marginTop: 2 }}>{statLabel}</p>
          </div>
          <Link
            to={profilePath}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl"
            style={{ background: dark ? ACCENT : "#1a1a1a", color: "#fff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}
          >
            {cta} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
      <div className="relative hidden md:block" style={{ minHeight: 200 }}>
        <img src={imgUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent 55%, ${bg} 100%)` }} />
      </div>
    </div>
  );
}
