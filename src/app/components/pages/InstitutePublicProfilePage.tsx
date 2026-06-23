import { Link } from "react-router";
import {
  GraduationCap, Users, BookOpen, Award, MapPin, Globe,
  Briefcase, Star, ChevronRight, ExternalLink, Building2,
} from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#3b82f6";

const INSTITUTE = {
  name: "RICS SBE",
  fullName: "RICS School of Built Environment",
  tagline: "Shaping the Built Environment Professionals of Tomorrow",
  location: "Amity University Campus, Noida, Uttar Pradesh",
  type: "Architecture & Built Environment School",
  affiliation: "UGC Recognised · AICTE Approved · RICS Accredited",
  website: "https://www.rics-sbe.org",
  naac: "A",
  established: "2011",
  stats: [
    { label: "Programs",        value: "14",    icon: BookOpen },
    { label: "Faculty Members", value: "86",    icon: Users },
    { label: "Alumni",          value: "3,200+",icon: GraduationCap },
    { label: "Placement Rate",  value: "94%",   icon: Briefcase },
  ],
};

const PROGRAMS = [
  { name: "B.Arch (Bachelor of Architecture)",          duration: "5 Years", seats: 60,  badge: "UG" },
  { name: "M.Arch (Master of Architecture)",            duration: "2 Years", seats: 30,  badge: "PG" },
  { name: "BIM Professional Certification",             duration: "6 Months",seats: 80,  badge: "Certificate" },
  { name: "M.Sc. Construction Project Management",      duration: "2 Years", seats: 40,  badge: "PG" },
  { name: "B.Planning (Bachelor of Urban Planning)",    duration: "4 Years", seats: 40,  badge: "UG" },
  { name: "AutoCAD & Computational Design",             duration: "3 Months",seats: 60,  badge: "Certificate" },
];

const FACULTY_HIGHLIGHTS = [
  { name: "Dr. Ravi Kumar",    role: "Professor & Head of Architecture", initials: "RK", color: "#2563eb", papers: 18 },
  { name: "Prof. Meera Iyer",  role: "Associate Professor, Sustainability", initials: "MI", color: "#7c3aed", papers: 11 },
  { name: "Dr. Anil Bose",     role: "Professor, Construction Management", initials: "AB", color: "#065f46", papers: 14 },
];

const PLACEMENTS = [
  { company: "Morphogenesis",        role: "Junior Architect",        package: "₹8–12 LPA",  count: 8 },
  { company: "Hafeez Contractor",    role: "Design Associate",        package: "₹6–9 LPA",   count: 5 },
  { company: "L&T Construction",     role: "Project Engineer",        package: "₹7–10 LPA",  count: 12 },
  { company: "UltraTech Cement",     role: "Technical Sales (Arch.)", package: "₹6–8 LPA",   count: 4 },
  { company: "Ar. Raj Rewal Assoc.", role: "Design Intern → Full",    package: "₹5–7 LPA",   count: 3 },
];

const REVIEWS = [
  { author: "Priya Mehta",   batch: "B.Arch 2024", rating: 5, text: "Exceptional faculty and industry exposure. The BIM labs are world-class." },
  { author: "Arjun Verma",   batch: "M.Arch 2023", rating: 5, text: "The international RICS accreditation opened doors I didn't expect. Highly recommend." },
  { author: "Sneha Tiwari",  batch: "B.Arch 2023", rating: 4, text: "Great placements and a vibrant studio culture. Infrastructure could be even better." },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  UG:          { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  PG:          { bg: "rgba(139,92,246,0.1)", color: "#7c3aed" },
  Certificate: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
};

export function InstitutePublicProfilePage() {
  const authUser = getAuthUser();
  const isOwner  = authUser?.id === "rics-sbe-admin";

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Hero */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)",
          paddingBottom: 60,
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.3)" }}
            >
              RS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                  style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                >
                  Verified Institute
                </span>
              </div>
              <h1 style={{ fontSize: "1.7rem", fontWeight: 900, color: "white", lineHeight: 1.15 }}>
                {INSTITUTE.name}
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                {INSTITUTE.fullName}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <MapPin style={{ width: 13, height: 13 }} /> {INSTITUTE.location}
                </span>
                <span className="flex items-center gap-1 text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <Building2 style={{ width: 13, height: 13 }} /> Est. {INSTITUTE.established}
                </span>
                <a
                  href={INSTITUTE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[12px]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <Globe style={{ width: 13, height: 13 }} /> Website
                  <ExternalLink style={{ width: 11, height: 11 }} />
                </a>
              </div>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
                {INSTITUTE.affiliation}
              </p>
            </div>
            {isOwner && (
              <Link
                to="/institute"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                My Dashboard <ChevronRight style={{ width: 14, height: 14 }} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6" style={{ marginTop: -32 }}>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-0 rounded-2xl overflow-hidden"
          style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          {INSTITUTE.stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center py-4 px-2"
                style={{ borderRight: i < INSTITUTE.stats.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
              >
                <Icon style={{ width: 18, height: 18, color: ACCENT, marginBottom: 6 }} />
                <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 3 }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* About */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            About {INSTITUTE.name}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            RICS School of Built Environment (RICS SBE) is India's premier institution focused exclusively on the built
            environment sector — covering architecture, construction, real estate, and infrastructure. Affiliated with the
            Royal Institution of Chartered Surveyors (RICS), the school prepares graduates for global careers through
            a rigorous curriculum, industry-integrated projects, and strong placement networks.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Architecture", "Urban Planning", "BIM & Technology", "Sustainable Design", "Construction Management", "Interior Design"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[12px] font-semibold"
                style={{ background: "rgba(59,130,246,0.08)", color: ACCENT }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Programs Offered</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{PROGRAMS.length} programs</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROGRAMS.map((p) => {
              const bc = badgeColors[p.badge] ?? { bg: "rgba(0,0,0,0.06)", color: "var(--text-muted)" };
              return (
                <div
                  key={p.name}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <GraduationCap style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0, marginTop: 2 }} />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {p.duration} · {p.seats} seats
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: bc.bg, color: bc.color }}>
                    {p.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculty */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Faculty Highlights</h2>
            <Link to="/institute/faculty" style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }}>
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {FACULTY_HIGHLIGHTS.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                  style={{ background: f.color }}
                >
                  {f.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{f.role}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: ACCENT }}>{f.papers}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>papers</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}>
            Top Recruiting Partners
          </h2>
          <div className="space-y-3">
            {PLACEMENTS.map((p, idx) => (
              <div
                key={p.company}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: idx < PLACEMENTS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)", color: ACCENT }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.company}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.role}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981" }}>{p.package}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{p.count} placed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Student Reviews</h2>
            <div className="flex items-center gap-1.5">
              <Star style={{ width: 14, height: 14, color: "#f59e0b", fill: "#f59e0b" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>4.7</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>(128 reviews)</span>
            </div>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((r) => (
              <div key={r.author} className="p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} style={{ width: 12, height: 12, color: "#f59e0b", fill: i < r.rating ? "#f59e0b" : "none" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}>{r.author}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>· {r.batch}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {!isOwner && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.12))`, border: "1px solid rgba(59,130,246,0.15)" }}
          >
            <GraduationCap style={{ width: 32, height: 32, color: ACCENT, margin: "0 auto 12px" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
              Interested in studying here?
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>
              Explore programs, connect with alumni, and track placements at RICS SBE.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/courses"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: ACCENT }}
              >
                Browse Courses
              </Link>
              <Link
                to="/jobs"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(59,130,246,0.1)", color: ACCENT }}
              >
                View Placements
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
