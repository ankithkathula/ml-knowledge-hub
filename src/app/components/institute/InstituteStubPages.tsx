import { useState } from "react";
import {
  Calendar, Plus, Search, Briefcase, MapPin, Clock,
  MessageSquare, Building2, Globe, Mail, Phone,
  Users, Award, ExternalLink, Camera, Upload, FileText,
  Pencil, X, GraduationCap, BookOpen,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

const ACCENT = "#3b82f6";

// ── Placements ──────────────────────────────────────────────────────────────

const DRIVES = [
  { company: "Morphogenesis",       role: "Junior Architect",          package: "₹8–12 LPA", date: "Jun 5, 2026",  spots: 5,  status: "Upcoming", logo: "MG" },
  { company: "L&T Construction",    role: "Project Engineer",          package: "₹7–10 LPA", date: "Jun 12, 2026", spots: 8,  status: "Upcoming", logo: "LT" },
  { company: "UltraTech Cement",    role: "Technical Sales (Arch.)",   package: "₹6–8 LPA",  date: "May 28, 2026", spots: 4,  status: "Open",     logo: "UC" },
  { company: "Hafeez Contractor",   role: "Design Associate",          package: "₹6–9 LPA",  date: "May 20, 2026", spots: 3,  status: "Closed",   logo: "HC" },
  { company: "CBRE India",          role: "Facilities Consultant",     package: "₹9–13 LPA", date: "Jun 20, 2026", spots: 6,  status: "Upcoming", logo: "CB" },
];

const driveColors: Record<string, { bg: string; color: string }> = {
  Upcoming: { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Open:     { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  Closed:   { bg: "rgba(0,0,0,0.06)",      color: "var(--text-muted)" },
};

export function InstitutePlacementsPage() {
  const [search, setSearch] = useState("");
  const filtered = DRIVES.filter((d) =>
    d.company.toLowerCase().includes(search.toLowerCase()) ||
    d.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 sm:p-7 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Campus Placements</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Manage recruitment drives and track student placements.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          <Plus style={{ width: 15, height: 15 }} /> Add Drive
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Placed",   value: "224", color: "#10b981" },
          { label: "Active Drives",  value: "3",   color: ACCENT },
          { label: "Avg Package",    value: "₹7.8L", color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-muted)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company or role…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ border: "1.5px solid rgba(0,0,0,0.09)", background: "white", color: "var(--text-primary)" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((d) => {
          const sc = driveColors[d.status] ?? driveColors.Closed;
          return (
            <div
              key={d.company + d.date}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: ACCENT }}>
                {d.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{d.company}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{d.role}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    <Clock style={{ width: 11, height: 11 }} /> {d.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    <Users style={{ width: 11, height: 11 }} /> {d.spots} spots
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981" }}>{d.package}</div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 inline-block" style={{ background: sc.bg, color: sc.color }}>
                  {d.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Events ──────────────────────────────────────────────────────────────────

const EVENTS = [
  { title: "Open House 2026",               date: "Jun 15, 2026", time: "10:00 AM",  type: "Admission", location: "Main Auditorium",    attendees: 200, status: "Upcoming" },
  { title: "BIM Workshop — Revit Advanced", date: "Jun 3, 2026",  time: "9:00 AM",   type: "Workshop",  location: "BIM Lab, Block C",   attendees: 40,  status: "Upcoming" },
  { title: "Architecture Alumni Talk",      date: "May 25, 2026", time: "4:00 PM",   type: "Talk",      location: "Seminar Hall 2",     attendees: 120, status: "Live" },
  { title: "Campus Sustainability Drive",   date: "May 18, 2026", time: "8:00 AM",   type: "Campaign",  location: "Campus Ground",      attendees: 350, status: "Completed" },
  { title: "RICS Quiz Bowl — Batch 2026",   date: "May 10, 2026", time: "11:00 AM",  type: "Competition",location: "Auditorium",         attendees: 90,  status: "Completed" },
];

const eventTypeColors: Record<string, string> = {
  Admission: "#3b82f6", Workshop: "#8b5cf6", Talk: "#10b981",
  Campaign: "#f59e0b", Competition: "#ec4899",
};
const eventStatusColors: Record<string, { bg: string; color: string }> = {
  Upcoming:  { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Live:      { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  Completed: { bg: "rgba(0,0,0,0.06)",      color: "var(--text-muted)" },
};

export function InstituteEventsPage() {
  return (
    <div className="p-5 sm:p-7 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Events</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Workshops, talks, open houses, and campus activities.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          <Plus style={{ width: 15, height: 15 }} /> Create Event
        </button>
      </div>

      <div className="space-y-3">
        {EVENTS.map((ev) => {
          const tc  = eventTypeColors[ev.type] ?? "#6b7280";
          const sc  = eventStatusColors[ev.status] ?? eventStatusColors.Completed;
          return (
            <div
              key={ev.title}
              className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${tc}18` }}>
                <Calendar style={{ width: 18, height: 18, color: tc }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{ev.title}</div>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[12px]" style={{ color: "var(--text-muted)" }}>
                    <Clock style={{ width: 11, height: 11 }} /> {ev.date} · {ev.time}
                  </span>
                  <span className="flex items-center gap-1 text-[12px]" style={{ color: "var(--text-muted)" }}>
                    <MapPin style={{ width: 11, height: 11 }} /> {ev.location}
                  </span>
                  <span className="flex items-center gap-1 text-[12px]" style={{ color: "var(--text-muted)" }}>
                    <Users style={{ width: 11, height: 11 }} /> {ev.attendees} expected
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sc.bg, color: sc.color }}>
                  {ev.status}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${tc}15`, color: tc }}>
                  {ev.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Messages ─────────────────────────────────────────────────────────────────

const MESSAGES = [
  { name: "Priya Mehta",    initials: "PM", color: "#be185d", avatarUrl: "https://i.pravatar.cc/80?img=38", preview: "Can I get a reference letter for my portfolio submission?", time: "10:20 AM", unread: true  },
  { name: "Arjun Kulkarni", initials: "AK", color: "#1e40af", avatarUrl: "https://i.pravatar.cc/80?img=33", preview: "Which Morphogenesis intake documents are needed for the drive?", time: "9:45 AM",  unread: true  },
  { name: "Dr. Ravi Kumar", initials: "RK", color: "#2563eb", avatarUrl: "https://i.pravatar.cc/80?img=65", preview: "M.Arch thesis schedule is attached. Please review and confirm.", time: "Yesterday", unread: false },
  { name: "L&T Recruitment",initials: "LT", color: "#065f46",                                               preview: "We'd like to schedule the campus drive for June 12.",           time: "2d ago",    unread: false },
  { name: "Sneha Tiwari",   initials: "ST", color: "#7c3aed", avatarUrl: "https://i.pravatar.cc/80?img=51", preview: "Submitted the BIM certification assignment — please check.",    time: "3d ago",    unread: false },
];

export function InstituteMessagesPage() {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div className="flex h-full" style={{ minHeight: "calc(100vh - 52px)" }}>
      <div className="w-72 flex-shrink-0 border-r" style={{ borderColor: "rgba(0,0,0,0.07)", background: "white" }}>
        <div className="p-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="relative">
            <Search style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-muted)" }} />
            <input placeholder="Search messages…" className="w-full pl-8 pr-3 py-2 rounded-xl text-[13px] outline-none" style={{ border: "1.5px solid rgba(0,0,0,0.09)", background: "rgba(0,0,0,0.02)" }} />
          </div>
        </div>
        <div>
          {MESSAGES.map((m, idx) => (
            <button
              key={m.name}
              onClick={() => setSelected(idx)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
              style={{ background: selected === idx ? `rgba(59,130,246,0.07)` : "transparent", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
            >
              <AvatarImg src={(m as any).avatarUrl} fallback={m.initials} size={36} fallbackBg={m.color} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "0.8rem", fontWeight: m.unread ? 700 : 500, color: "var(--text-primary)" }}>{m.name}</span>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{m.time}</span>
                </div>
                <div className="truncate" style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>{m.preview}</div>
              </div>
              {m.unread && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center" style={{ background: "#f8fafc" }}>
        <MessageSquare style={{ width: 40, height: 40, color: "rgba(0,0,0,0.12)", marginBottom: 12 }} />
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          {selected !== null ? `Viewing conversation with ${MESSAGES[selected].name}` : "Select a conversation"}
        </p>
      </div>
    </div>
  );
}

// ── Profile Management ────────────────────────────────────────────────────────

const INST_PROGRAMS = [
  { id: 1, name: "B.Arch (5 Years)",                    price: "₹2,50,000", unit: "per year",    active: true  },
  { id: 2, name: "M.Arch — Urban Design (2 Years)",     price: "₹2,80,000", unit: "per year",    active: true  },
  { id: 3, name: "BIM Professional Certificate",        price: "₹45,000",   unit: "6 months",    active: true  },
  { id: 4, name: "Structural Design Certificate",       price: "₹28,000",   unit: "3 months",    active: false },
];

const INST_DOCS = [
  { id: 1, name: "NAAC A+ Grade",          issuer: "National Assessment & Accreditation Council", expires: "Dec 2027", status: "Verified" },
  { id: 2, name: "AICTE Approval",         issuer: "All India Council for Technical Education",  expires: "Jun 2026", status: "Verified" },
  { id: 3, name: "COA Affiliation",        issuer: "Council of Architecture, India",             expires: "Mar 2026", status: "Pending"  },
  { id: 4, name: "ISO 21001:2018",         issuer: "Educational Organisation Management",        expires: "Nov 2025", status: "Expired"  },
];

const INST_LOCATIONS = ["Noida, Uttar Pradesh", "Delhi NCR", "Bengaluru, Karnataka", "Mumbai, Maharashtra"];

const INST_FACULTY = [
  { initials: "RK", name: "Dr. Ravi Kumar",   title: "Director",             avatarUrl: "https://i.pravatar.cc/80?img=65" },
  { initials: "MN", name: "Prof. Meera Nair", title: "HOD — Architecture",   avatarUrl: "https://i.pravatar.cc/80?img=43" },
  { initials: "AM", name: "Arjun Mehta",      title: "Academic Coordinator", avatarUrl: "https://i.pravatar.cc/80?img=12" },
  { initials: "SP", name: "Sneha Patel",      title: "Admissions Manager",   avatarUrl: "https://i.pravatar.cc/80?img=44" },
  { initials: "VD", name: "Vikram Desai",     title: "Industry Relations",   avatarUrl: "https://i.pravatar.cc/80?img=15" },
];

const INST_ACTIVITY = [
  { icon: BookOpen,  color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  text: "Dr. Ravi Kumar updated M.Arch curriculum for 2026 batch",            time: "1h ago"     },
  { icon: Users,     color: "#10b981", bg: "rgba(16,185,129,0.1)",  text: "Meera Nair invited deepa.nair@gmail.com as Editor",                  time: "3h ago"     },
  { icon: Pencil,    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  text: "Arjun Mehta published blog 'Future of Architecture Education in India'", time: "5h ago" },
  { icon: Briefcase, color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  text: "Sneha Patel updated placement report for Batch 2025",                time: "Yesterday"  },
  { icon: Award,     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   text: "Vikram Desai's role changed to Viewer by Dr. Ravi Kumar",            time: "2 days ago" },
  { icon: Calendar,  color: "#10b981", bg: "rgba(16,185,129,0.1)",  text: "Open House 2026 registration confirmed — 200 attendees expected",    time: "3 days ago" },
];

const DOC_STATUS: Record<string, { color: string; bg: string }> = {
  Verified: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending:  { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Expired:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)"  },
};

function ProgramToggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative inline-flex items-center rounded-full flex-shrink-0"
      style={{ width: 36, height: 20, background: enabled ? ACCENT : "rgba(0,0,0,0.15)", padding: 2, transition: "background 0.2s" }}
    >
      <span
        className="rounded-full bg-white block"
        style={{ width: 16, height: 16, transform: `translateX(${enabled ? 16 : 0}px)`, boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "transform 0.2s" }}
      />
    </button>
  );
}

export function InstituteProfileEditPage() {
  const [programs, setPrograms] = useState(INST_PROGRAMS);
  const [locations, setLocations] = useState(INST_LOCATIONS);
  const [newCity, setNewCity] = useState("");

  const toggleProgram = (id: number) =>
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  const removeLocation = (loc: string) =>
    setLocations(prev => prev.filter(l => l !== loc));

  const addLocation = () => {
    const city = newCity.trim();
    if (city && !locations.includes(city)) setLocations(prev => [...prev, city]);
    setNewCity("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Institute Management</h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>Manage your institute profile, faculty, programmes, and settings</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
        <div className="flex items-start gap-5">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.08)", border: "2px dashed rgba(59,130,246,0.25)" }}
            >
              <GraduationCap style={{ width: 36, height: 36, color: ACCENT }} />
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
              style={{ border: "1px solid rgba(59,130,246,0.35)", color: ACCENT, background: "rgba(59,130,246,0.05)" }}
            >
              <Camera style={{ width: 11, height: 11 }} /> Change Logo
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>RICS School of Built Environment</h2>
                <p style={{ fontSize: "0.88rem", color: ACCENT, fontWeight: 600, marginTop: 2 }}>Shaping the Built Environment Professionals of Tomorrow</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.5, maxWidth: 560 }}>
                  Premier architecture and built environment institute offering NAAC A+ accredited programmes in B.Arch, M.Arch,
                  and professional certifications. Industry-aligned curriculum with 95%+ placement rate.
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold flex-shrink-0"
                style={{ border: "1px solid rgba(59,130,246,0.35)", color: ACCENT, background: "rgba(59,130,246,0.05)" }}
              >
                <Pencil style={{ width: 12, height: 12 }} /> Edit
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
              {[
                { icon: GraduationCap, text: "Architecture & Built Environment" },
                { icon: MapPin,        text: "Amity University, Noida, UP" },
                { icon: Phone,         text: "+91 120 439 2700" },
                { icon: Mail,          text: "admissions@rics-sbe.org" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Icon style={{ width: 13, height: 13 }} /> {text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
              {[
                { icon: Globe,  text: "www.rics-sbe.org" },
                { icon: Award,  text: "NAAC A+ · AICTE · COA Affiliated" },
                { icon: Clock,  text: "Est. 2006" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Icon style={{ width: 13, height: 13 }} /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faculty + Programmes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Faculty */}
        <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <Users style={{ width: 16, height: 16, color: ACCENT }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Faculty & Staff</span>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: ACCENT }}>
                {INST_FACULTY.length}
              </span>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white"
              style={{ background: ACCENT }}
            >
              <Plus style={{ width: 12, height: 12 }} /> Invite
            </button>
          </div>
          <div className="p-4 space-y-3">
            {INST_FACULTY.map(f => (
              <div key={f.initials} className="flex items-center gap-3">
                <AvatarImg src={f.avatarUrl} fallback={f.initials} size={36} fallbackBg={`linear-gradient(135deg, ${ACCENT}, #1d4ed8)`} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{f.title}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                  Active
                </span>
                <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                  <X style={{ width: 11, height: 11 }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Programmes & Fees */}
        <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <BookOpen style={{ width: 16, height: 16, color: ACCENT }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Programmes & Fees</span>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white" style={{ background: ACCENT }}>
              <Plus style={{ width: 12, height: 12 }} /> Add
            </button>
          </div>
          <div className="p-4 space-y-4">
            {programs.map(p => (
              <div key={p.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: 12 }}>
                <div className="flex items-start justify-between mb-1">
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: ACCENT, flexShrink: 0, marginLeft: 8 }}>
                    {p.price} <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--text-muted)" }}>{p.unit}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ProgramToggle enabled={p.active} onChange={() => toggleProgram(p.id)} />
                  <span style={{ fontSize: "0.75rem", color: p.active ? "#10b981" : "var(--text-muted)", fontWeight: p.active ? 600 : 400 }}>
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campuses + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Campus Locations */}
        <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <MapPin style={{ width: 16, height: 16, color: ACCENT }} />
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Campus Locations</span>
          </div>
          <div className="p-5 space-y-4">
            <div
              className="flex items-center justify-center rounded-xl py-6"
              style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <div className="text-center">
                <MapPin style={{ width: 28, height: 28, color: "var(--text-muted)", margin: "0 auto 6px" }} />
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Interactive Map View</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Serving {locations.length} locations</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map(loc => (
                <span
                  key={loc}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{ border: `1px solid ${ACCENT}50`, color: ACCENT, background: "rgba(59,130,246,0.05)" }}
                >
                  <MapPin style={{ width: 11, height: 11 }} />
                  {loc}
                  <button onClick={() => removeLocation(loc)} style={{ color: ACCENT }}>×</button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addLocation()}
                placeholder="City name"
                className="flex-1 px-3 py-2 rounded-xl text-[13px]"
                style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", background: "white", color: "var(--text-primary)" }}
              />
              <button
                onClick={addLocation}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: ACCENT, flexShrink: 0 }}
              >
                <Plus style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Accreditations & Documents */}
        <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2">
              <Award style={{ width: 16, height: 16, color: ACCENT }} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Accreditations & Documents</span>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
              style={{ border: "1px solid rgba(59,130,246,0.35)", color: ACCENT, background: "rgba(59,130,246,0.05)" }}
            >
              <Upload style={{ width: 11, height: 11 }} /> Upload
            </button>
          </div>
          <div className="p-4 space-y-3">
            {INST_DOCS.map(doc => {
              const st = DOC_STATUS[doc.status];
              return (
                <div key={doc.id} className="flex items-start justify-between gap-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="flex items-start gap-2.5">
                    <FileText style={{ width: 16, height: 16, color: ACCENT, marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{doc.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{doc.issuer}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Expires: {doc.expires}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                    {doc.status}
                  </span>
                </div>
              );
            })}
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl py-4 cursor-pointer"
              style={{ border: "1.5px dashed rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.02)" }}
            >
              <Upload style={{ width: 18, height: 18, color: "var(--text-muted)" }} />
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                Drag & drop or click to upload documents
                <br />
                <span style={{ fontSize: "0.68rem" }}>PDF, JPG, PNG up to 5MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Team Activity</h2>
        </div>
        <div className="p-4 space-y-2">
          {INST_ACTIVITY.map((act, i) => {
            const Icon = act.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: i % 2 === 0 ? "rgba(0,0,0,0.01)" : "transparent" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: act.bg }}>
                  <Icon style={{ width: 15, height: 15, color: act.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>{act.text}</p>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{act.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Jobs Stub ─────────────────────────────────────────────────────────────────

const INSTITUTE_JOBS = [
  { title: "Assistant Professor — Architecture",  type: "Full-time",  dept: "Architecture",       applicants: 14, posted: "May 10, 2026", status: "Open"   },
  { title: "BIM Lab Instructor",                  type: "Contract",   dept: "Technology",         applicants: 6,  posted: "May 5, 2026",  status: "Open"   },
  { title: "Admissions Coordinator",              type: "Full-time",  dept: "Administration",     applicants: 22, posted: "Apr 28, 2026", status: "Closed" },
  { title: "Research Associate — Urban Design",   type: "Part-time",  dept: "Research",           applicants: 8,  posted: "Apr 20, 2026", status: "Open"   },
];

export function InstituteJobsPage() {
  return (
    <div className="p-5 sm:p-7 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Institute Jobs</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Manage faculty and staff openings at RICS SBE.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          <Plus style={{ width: 15, height: 15 }} /> Post Job
        </button>
      </div>

      <div className="space-y-3">
        {INSTITUTE_JOBS.map((j) => (
          <div
            key={j.title}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.1)" }}>
              <Briefcase style={{ width: 18, height: 18, color: ACCENT }} />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{j.title}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                {j.dept} · {j.type} · Posted {j.posted}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: ACCENT }}>{j.applicants}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>applicants</div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 inline-block"
                style={{
                  background: j.status === "Open" ? "rgba(16,185,129,0.1)" : "rgba(0,0,0,0.06)",
                  color: j.status === "Open" ? "#10b981" : "var(--text-muted)",
                }}
              >
                {j.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
