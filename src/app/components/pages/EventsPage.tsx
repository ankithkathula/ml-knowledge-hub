import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ArrowRight, X, Check, ChevronRight, User, Mail, Phone, Briefcase } from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  type: "Webinar" | "Workshop" | "Trade Show" | "Meet-up" | "Launch";
  date: string;
  time: string;
  location: string;
  online: boolean;
  cover: string;
  speakers?: string[];
  description: string;
  category: string;
  attending?: number;
  ticketTypes?: { label: string; price: string; desc: string }[];
};

const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Sustainable Materials Summit 2026",
    type: "Trade Show",
    date: "May 22, 2026",
    time: "10:00 AM – 6:00 PM",
    location: "Bombay Exhibition Centre, Mumbai",
    online: false,
    cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    description: "Two-day showcase of low-carbon, recycled, and bio-based materials with 80+ exhibiting brands.",
    category: "Materials",
    attending: 1240,
    ticketTypes: [
      { label: "General Entry", price: "Free", desc: "Access to exhibition floor" },
      { label: "Workshop Pass", price: "₹499", desc: "Exhibition + 2 curated workshops" },
      { label: "VIP", price: "₹1,499", desc: "All-access + brand lounge + networking dinner" },
    ],
  },
  {
    id: "2",
    title: "BIM for Architects — Hands-on Webinar",
    type: "Webinar",
    date: "Apr 18, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "Online (Zoom)",
    online: true,
    cover: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    speakers: ["Riya Kapoor", "Studio Mosaic"],
    description: "Practical Revit + Navisworks workflow for small-studio practice. Live Q&A.",
    category: "Tooling",
    attending: 312,
    ticketTypes: [
      { label: "Free RSVP", price: "Free", desc: "Live stream + recording access" },
    ],
  },
  {
    id: "3",
    title: "Brand Launch — Asian Paints Earth Series",
    type: "Launch",
    date: "Apr 30, 2026",
    time: "11:00 AM – 1:00 PM",
    location: "Asian Paints HQ, Mumbai",
    online: false,
    cover: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    description: "First look at the Earth Series — natural-pigment interior emulsions.",
    category: "Launches",
    attending: 480,
    ticketTypes: [
      { label: "By Invitation", price: "Free", desc: "Press, trade, and design professionals" },
    ],
  },
  {
    id: "4",
    title: "Material Library Designer Meet — Bangalore",
    type: "Meet-up",
    date: "May 4, 2026",
    time: "6:30 PM – 9:00 PM",
    location: "Lalbagh Garden Club, Bengaluru",
    online: false,
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    description: "Curated meet-up for studios, designers, and brand reps. Limited to 80 seats.",
    category: "Community",
    attending: 64,
    ticketTypes: [
      { label: "RSVP", price: "Free", desc: "Limited to 80 seats" },
    ],
  },
  {
    id: "5",
    title: "Composite Cladding Workshop",
    type: "Workshop",
    date: "Jun 6, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "ML Knowledge Center, Mumbai",
    online: false,
    cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    description: "Hands-on session with HPL and ACP samples — installation + finishing.",
    category: "Materials",
    attending: 28,
    ticketTypes: [
      { label: "Standard", price: "₹799", desc: "Full-day workshop + materials kit" },
      { label: "Team (3 pax)", price: "₹1,999", desc: "Group rate — 3 attendees" },
    ],
  },
];

const CATEGORIES = ["All", "Materials", "Tooling", "Community", "Launches"] as const;
const TYPES = ["All Formats", "Webinar", "Workshop", "Trade Show", "Meet-up", "Launch"] as const;

const ROLES = ["Architect", "Interior Designer", "Product Designer", "Brand Representative", "Student", "Consultant", "Contractor", "Other"];

type ModalStep = "details" | "ticket" | "confirm" | "done";

interface RegForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  ticketIdx: number;
}

function RegistrationModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [step, setStep] = useState<ModalStep>("details");
  const [form, setForm] = useState<RegForm>({ name: "", email: "", phone: "", role: "", ticketIdx: 0 });
  const [errors, setErrors] = useState<Partial<RegForm>>({});

  const tickets = event.ticketTypes ?? [{ label: "RSVP", price: "Free", desc: "General registration" }];
  const selectedTicket = tickets[form.ticketIdx];

  function validateDetails() {
    const e: Partial<RegForm> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.role) e.role = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === "details") {
      if (validateDetails()) setStep(tickets.length > 1 ? "ticket" : "confirm");
    } else if (step === "ticket") {
      setStep("confirm");
    } else if (step === "confirm") {
      setStep("done");
    }
  }

  const steps: ModalStep[] = ["details", ...(tickets.length > 1 ? ["ticket" as ModalStep] : []), "confirm"];
  const stepIdx = steps.indexOf(step === "done" ? "confirm" : step);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-base, #fff)", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
      >
        {/* Event header strip */}
        <div className="relative h-28 overflow-hidden">
          <img src={event.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }} />
          <div className="absolute inset-0 px-6 flex flex-col justify-center gap-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">{event.type}</span>
            <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">{event.title}</h2>
            <div className="flex items-center gap-3 text-[11px] text-white/80 mt-0.5">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location.split(",")[0]}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: "rgba(0,0,0,0.45)", color: "white" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        {step !== "done" && (
          <div className="flex items-center gap-2 px-6 pt-5 pb-3">
            {steps.map((s, i) => {
              const label = s === "details" ? "Your details" : s === "ticket" ? "Ticket" : "Review";
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                    style={{
                      background: done ? "#22c55e" : active ? "var(--accent, #FF7A59)" : "var(--glass, #f3f3f3)",
                      color: done || active ? "white" : "var(--text-muted, #999)",
                    }}
                  >
                    {done ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: active ? "var(--text-primary, #111)" : "var(--text-muted, #999)" }}>{label}</span>
                  {i < steps.length - 1 && <ChevronRight className="w-3 h-3 mx-1" style={{ color: "var(--text-muted, #bbb)" }} />}
                </div>
              );
            })}
          </div>
        )}

        <div className="px-6 pb-6">
          {/* Step 1: Details */}
          {step === "details" && (
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted, #888)" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted, #aaa)" }} />
                  <input
                    type="text"
                    placeholder="Ankit Sharma"
                    value={form.name}
                    onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "var(--glass, #f7f7f7)",
                      border: errors.name ? "1.5px solid #ef4444" : "1.5px solid transparent",
                      color: "var(--text-primary, #111)",
                    }}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted, #888)" }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted, #aaa)" }} />
                  <input
                    type="email"
                    placeholder="you@studio.com"
                    value={form.email}
                    onChange={(ev) => setForm({ ...form, email: ev.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "var(--glass, #f7f7f7)",
                      border: errors.email ? "1.5px solid #ef4444" : "1.5px solid transparent",
                      color: "var(--text-primary, #111)",
                    }}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted, #888)" }}>
                  Phone <span style={{ color: "var(--text-muted, #bbb)", fontWeight: 400 }}>(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted, #aaa)" }} />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(ev) => setForm({ ...form, phone: ev.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "var(--glass, #f7f7f7)", border: "1.5px solid transparent", color: "var(--text-primary, #111)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted, #888)" }}>
                  Your Role
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted, #aaa)" }} />
                  <select
                    value={form.role}
                    onChange={(ev) => setForm({ ...form, role: ev.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none appearance-none"
                    style={{
                      background: "var(--glass, #f7f7f7)",
                      border: errors.role ? "1.5px solid #ef4444" : "1.5px solid transparent",
                      color: form.role ? "var(--text-primary, #111)" : "var(--text-muted, #aaa)",
                    }}
                  >
                    <option value="">Select your role</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                {errors.role && <p className="text-[11px] text-red-500 mt-1">{errors.role}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Ticket selection */}
          {step === "ticket" && (
            <div className="space-y-3 mt-2">
              <p className="text-xs" style={{ color: "var(--text-secondary, #666)" }}>Choose your pass for this event.</p>
              {tickets.map((t, i) => {
                const selected = form.ticketIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => setForm({ ...form, ticketIdx: i })}
                    className="w-full text-left rounded-xl p-4 transition-all"
                    style={{
                      background: selected ? "var(--accent-light, #fff4f1)" : "var(--glass, #f7f7f7)",
                      border: selected ? "1.5px solid var(--accent, #FF7A59)" : "1.5px solid transparent",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary, #111)" }}>{t.label}</span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: t.price === "Free" ? "#22c55e" : "var(--accent, #FF7A59)" }}
                      >
                        {t.price}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted, #888)" }}>{t.desc}</p>
                    {selected && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold" style={{ color: "var(--accent, #FF7A59)" }}>
                        <Check className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === "confirm" && (
            <div className="mt-2 space-y-4">
              <p className="text-xs" style={{ color: "var(--text-secondary, #666)" }}>Please review your registration before confirming.</p>
              <div className="rounded-xl p-4 space-y-2.5" style={{ background: "var(--glass, #f7f7f7)" }}>
                {[
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  ...(form.phone ? [{ label: "Phone", value: form.phone }] : []),
                  { label: "Role", value: form.role },
                  { label: "Ticket", value: `${selectedTicket.label} — ${selectedTicket.price}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted, #888)" }}>{label}</span>
                    <span className="text-[13px] font-medium text-right" style={{ color: "var(--text-primary, #111)" }}>{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px]" style={{ color: "var(--text-muted, #aaa)" }}>
                A confirmation will be sent to <strong>{form.email}</strong>.
              </p>
            </div>
          )}

          {/* Done state */}
          {step === "done" && (
            <div className="text-center py-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#dcfce7" }}
              >
                <Check className="w-7 h-7" style={{ color: "#16a34a" }} />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary, #111)" }}>You're registered!</h3>
              <p className="text-sm mb-1" style={{ color: "var(--text-secondary, #666)" }}>
                {event.title}
              </p>
              <p className="text-[11px]" style={{ color: "var(--text-muted, #999)" }}>
                Confirmation sent to <strong>{form.email}</strong>
              </p>
              <div
                className="mt-5 rounded-xl p-3 text-[11px]"
                style={{ background: "var(--glass, #f7f7f7)", color: "var(--text-secondary, #666)" }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {event.date} · {event.time.split(" – ")[0]} · {event.location.split(",")[0]}
                </span>
              </div>
              <button
                onClick={onClose}
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "var(--glass, #f0f0f0)", color: "var(--text-primary, #111)" }}
              >
                Close
              </button>
            </div>
          )}

          {/* Footer actions */}
          {step !== "done" && (
            <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid var(--glass, #eee)" }}>
              <button
                onClick={() => {
                  if (step === "details") onClose();
                  else if (step === "ticket") setStep("details");
                  else if (step === "confirm") setStep(tickets.length > 1 ? "ticket" : "details");
                }}
                className="text-sm px-4 py-2 rounded-lg transition-all"
                style={{ color: "var(--text-secondary, #666)", background: "var(--glass, #f0f0f0)" }}
              >
                {step === "details" ? "Cancel" : "Back"}
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--accent, #FF7A59)", color: "white" }}
              >
                {step === "confirm" ? "Confirm Registration" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EventsPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [fmt, setFmt] = useState<(typeof TYPES)[number]>("All Formats");
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  const filtered = EVENTS.filter((e) => (cat === "All" || e.category === cat) && (fmt === "All Formats" || e.type === fmt));

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {registeringEvent && (
        <RegistrationModal event={registeringEvent} onClose={() => setRegisteringEvent(null)} />
      )}

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-hero)", borderBottom: "var(--border-subtle)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "0.1em" }}>
            Upcoming
          </p>
          <h1 className="text-4xl md:text-5xl mb-3" style={{ fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Events & Webinars
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Trade shows, brand launches, designer meet-ups, and live workshops — across the country and online.
          </p>
        </div>
      </section>

      {/* Filter strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em" }}>
            Category
          </span>
          {CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-light)" : "var(--glass)",
                  border: "var(--border-subtle)",
                }}
              >
                {c}
              </button>
            );
          })}
          <div className="w-px h-4 mx-1" style={{ background: "var(--border-subtle)" }} />
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em" }}>
            Format
          </span>
          {TYPES.map((t) => {
            const active = fmt === t;
            return (
              <button
                key={t}
                onClick={() => setFmt(t)}
                className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-light)" : "var(--glass)",
                  border: "var(--border-subtle)",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: "var(--glass)", border: "var(--border-subtle)" }}>
            <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No events match these filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl overflow-hidden transition-all hover:translate-y-[-3px]"
                style={{ background: "var(--glass-strong)", border: "var(--border-subtle)" }}
              >
                <div className="relative h-44">
                  <img src={e.cover} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", color: "white", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em" }}
                  >
                    {e.type.toUpperCase()}
                  </div>
                  {e.online && (
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent)", color: "white", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em" }}
                    >
                      LIVE
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-2 text-[11px]" style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                    <Calendar className="w-3 h-3" /> {e.date}
                    <span className="opacity-50">·</span>
                    <Clock className="w-3 h-3" /> {e.time.split(" – ")[0]}
                  </div>
                  <h3 className="text-base mb-1.5 line-clamp-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>{e.title}</h3>
                  <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>{e.description}</p>
                  <div className="flex items-center gap-1.5 text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                    <MapPin className="w-3 h-3" /> <span className="truncate">{e.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {e.attending !== undefined && (
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                        <Users className="w-3 h-3" /> {e.attending.toLocaleString()} attending
                      </span>
                    )}
                    <button
                      onClick={() => setRegisteringEvent(e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all hover:opacity-90"
                      style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}
                    >
                      Register <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
