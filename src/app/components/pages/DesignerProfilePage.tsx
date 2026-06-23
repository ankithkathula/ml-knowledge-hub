import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  MapPin, Globe, Linkedin, Mail, Eye, Heart, Award, Briefcase,
  GraduationCap, FileText, Activity, ExternalLink,
  CheckCircle2, Calendar, IndianRupee, ShieldCheck, Clock, HelpCircle,
  ChevronDown, ChevronUp, UserCheck, Share2,
  Star, MessageCircle, ChevronRight, Quote,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { getAuthUser } from "../../utils/auth";
import {
  DESIGNER_PROFILE,
  PORTFOLIO_WORKS,
  CAREER_HISTORY,
  CERTIFICATIONS,
  ENROLLED_COURSES,
  BLOG_POSTS,
  ACTIVITY_FEED,
  APPLIED_JOBS,
} from "../data/designerData";
import {
  VERIFIER_PROFILES,
  WORK_VERIFICATIONS,
  getVerificationForExp,
  type DesignerProfileData,
  type Endorsement,
} from "../data/verificationData";

/* ── helpers ──────────────────────────────────────────────────────────────── */

function getProfileBySlug(slug: string): { isAnkit: boolean; verifier?: DesignerProfileData } | null {
  if (slug === DESIGNER_PROFILE.id) return { isAnkit: true };
  const v = VERIFIER_PROFILES.find((p) => p.id === slug);
  if (v) return { isAnkit: false, verifier: v };
  return null;
}

const ANKIT_ACCENT = "#FF6A3D";
const ANKIT_ACCENT_RGB = "255,106,61";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Applied:     { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Shortlisted: { bg: "rgba(255,106,61,0.1)",  color: "#FF6A3D" },
  Interview:   { bg: "rgba(245,158,11,0.1)",  color: "#d97706" },
  Offered:     { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  Rejected:    { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
};

/* ── sub-components ───────────────────────────────────────────────────────── */

function SectionCard({ title, icon: Icon, accent, children }: {
  title: string; icon: React.ElementType; accent: string; children: React.ReactNode;
}) {
  const rgb = hexToRgb(accent);
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-2.5 mb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "1rem" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${rgb},0.1)` }}>
          <Icon style={{ color: accent, width: 16, height: 16 }} />
        </div>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Verification badge + endorsement panel ───────────────────────────────── */

function VerificationBadge({
  status, experienceId, candidateSlug, companySlug, companyName,
}: {
  status: "verified" | "pending" | "unverified";
  experienceId: string;
  candidateSlug: string;
  companySlug: string;
  companyName: string;
}) {
  const [open, setOpen] = useState(false);
  const verification = getVerificationForExp(experienceId, candidateSlug);
  const endorsements = verification?.endorsements ?? [];

  if (status === "verified") {
    return (
      <div className="mt-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified by {endorsements.length} {endorsements.length === 1 ? "person" : "people"} from {companyName}
          {open ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
        </button>

        {open && (
          <div className="mt-3 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.02)" }}>
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "rgba(16,185,129,0.06)", borderBottom: "1px solid rgba(16,185,129,0.1)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10b981" }}>
                Verified by colleagues & HR at {companyName}
              </span>
              <Link
                to={`/verify/${companySlug}/${candidateSlug}`}
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "#10b981" }}
              >
                <Share2 className="w-3 h-3" /> Share verification link
              </Link>
            </div>
            <div className="divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
              {endorsements.map((e) => (
                <EndorserCard key={e.verifierId} endorsement={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="mt-3 flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#d97706", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Clock className="w-3.5 h-3.5" />
          Verification pending — awaiting response from {companyName}
        </span>
        <Link
          to={`/verify/${companySlug}/${candidateSlug}`}
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: "#d97706" }}
        >
          Verify page →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold w-fit" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", border: "1px solid rgba(0,0,0,0.08)" }}>
        <HelpCircle className="w-3.5 h-3.5" />
        Not yet verified
      </span>
    </div>
  );
}

function EndorserCard({ endorsement: e }: { endorsement: Endorsement }) {
  return (
    <div className="px-4 py-4 flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
      >
        {e.verifierInitials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <Link
              to={`/designer/${e.verifierId}`}
              className="font-semibold hover:underline"
              style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}
            >
              {e.verifierName}
            </Link>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 1 }}>
              {e.verifierRole} · {e.verifierCompany} · {e.relationship}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              {new Date(e.verifiedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <Link
              to={`/designer/${e.verifierId}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
            >
              <UserCheck className="w-3 h-3" /> View Profile
            </Link>
          </div>
        </div>
        {e.comment && (
          <p className="mt-2 italic" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            "{e.comment}"
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Ankit's full profile page ────────────────────────────────────────────── */

const SERVICE_AREAS = ["Mumbai", "Pune", "Bangalore", "Goa", "Delhi"];
const SERVICES_OFFERED = [
  "Interior Design Consultation", "Space Planning", "3D Visualisation",
  "Material Specification", "FF&E Procurement", "Lighting Design",
  "Residential Design", "Hospitality & Retail",
];
const CORE_EXPERTISE = [
  "Interior Design", "Space Planning", "Material Specification",
  "Biophilic Design", "Lighting Design", "FF&E Procurement",
];
const PROJECT_IMAGES: Record<string, string> = {
  w1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  w2: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  w3: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
  w4: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
  w5: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  w6: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
};
const PROJECT_CITIES: Record<string, string> = {
  w1: "Jaipur", w2: "Mumbai", w3: "Pune", w4: "Mumbai", w5: "Mumbai", w6: "Alibag",
};
const ANKIT_REVIEWS = [
  { id: 1, name: "Neha Kapoor", rating: 5, text: "Ankit transformed our Bandra apartment beautifully. His material choices were unlike anything I'd seen — every surface felt considered.", project: "Residential — Bandra, Mumbai" },
  { id: 2, name: "Vikram Malhotra", rating: 5, text: "He designed our co-working space in Lower Parel. Ankit balances aesthetics with functionality brilliantly. The team absolutely loves it.", project: "The Loft — Mumbai" },
  { id: 3, name: "Priya Mehta", rating: 5, text: "The spa design exceeded all expectations. His use of natural materials created exactly the serene atmosphere we envisioned.", project: "Serenity Spa, Pune" },
];

function AnkitProfile() {
  const p = DESIGNER_PROFILE;
  const ACCENT = ANKIT_ACCENT;
  const publishedBlogs = BLOG_POSTS.filter((b) => b.status === "published");
  const [isSaved, setIsSaved] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const [isAnkitLoggedIn, setIsAnkitLoggedIn] = useState(() => getAuthUser()?.id === "ankit-sharma");
  useEffect(() => {
    const handler = () => setIsAnkitLoggedIn(getAuthUser()?.id === "ankit-sharma");
    window.addEventListener("ml-auth-change", handler);
    return () => window.removeEventListener("ml-auth-change", handler);
  }, []);

  const visibleAreas = showAllAreas ? SERVICE_AREAS : SERVICE_AREAS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
            alt="Ankit Sharma cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-end pb-12">

            <div className="lg:col-span-2">
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 rounded-2xl flex-shrink-0 border-4 shadow-2xl overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
                  <ImageWithFallback src="https://i.pravatar.cc/300?img=68" alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-[36px] md:text-[42px] font-bold text-white drop-shadow-lg">{p.name}</h1>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full">
                      <CheckCircle2 size={14} style={{ color: ACCENT }} />
                      <span className="text-[11px] font-bold text-gray-900">Verified</span>
                    </div>
                  </div>
                  <p className="text-[16px] text-white/90 mb-3 drop-shadow">{p.headline}</p>
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[14px]">
                      <MapPin size={16} className="text-white/70" />
                      <span className="text-white font-medium">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={16} style={{ color: ACCENT, fill: ACCENT }} />
                      <span className="text-[15px] font-bold text-white">4.8</span>
                      <span className="text-[13px] text-white/70">(87 reviews)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Interior Design", "Hospitality", "Residential"].map((d) => (
                      <span key={d} className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-[12px] font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
                <div className="space-y-3 mb-6">
                  {isAnkitLoggedIn ? (
                    <Link to="/d/profile" className="w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2" style={{ background: ACCENT, color: "white" }}>
                      Edit Profile
                    </Link>
                  ) : (
                    <>
                      <a href={`mailto:${p.email}`} className="w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2" style={{ background: ACCENT, color: "white" }}>
                        <FileText size={16} /> Get Quote
                      </a>
                      <a href={`mailto:${p.email}`} className="w-full h-12 bg-gray-900 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                        <MessageCircle size={16} /> Contact
                      </a>
                    </>
                  )}
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isSaved ? "text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                    style={isSaved ? { background: ACCENT } : {}}
                  >
                    <Heart size={16} className={isSaved ? "fill-white" : ""} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-gray-600 pt-4 border-t border-gray-200">
                  <Clock size={14} className="text-gray-400" />
                  <span>Responds within 24 hrs</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Service Areas</h3>
          <div className="flex flex-wrap items-center gap-2">
            {visibleAreas.map((area) => (
              <span key={area} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-[13px] font-medium border border-gray-200">{area}</span>
            ))}
            {!showAllAreas && SERVICE_AREAS.length > 4 && (
              <button
                onClick={() => setShowAllAreas(true)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-white"
                style={{ background: ACCENT }}
              >
                +{SERVICE_AREAS.length - 4} more
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── NUMBERS STRIP ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {[
              { val: "24+",                                  label: "Projects Completed" },
              { val: "6",                                    label: "Years Experience" },
              { val: "5",                                    label: "Cities Served" },
              { val: p.stats.profileViews.toLocaleString(), label: "Profile Views" },
              { val: p.stats.connections,                   label: "Connections" },
              { val: p.stats.endorsements,                  label: "Endorsements" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-gray-200 mx-6" />}
                <div className="text-center">
                  <div className="text-[32px] font-bold mb-1" style={{ color: ACCENT }}>{s.val}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-[15px] text-gray-700 leading-relaxed">{p.bio}</p>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Design Approach</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  I begin every project with deep listening — understanding not just how a space will be used, but how it should feel. Material honesty, biophilic connection, and contextual craft guide every decision. I believe the best interiors are the ones that feel inevitable.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Core Expertise</h3>
              <div className="space-y-2.5">
                {CORE_EXPERTISE.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: ACCENT, flexShrink: 0 }} />
                    <span className="text-[14px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {p.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-gray-200 bg-gray-50 text-gray-600">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Services I Offer</h2>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES_OFFERED.map((service) => (
              <div
                key={service}
                className="px-5 py-2.5 bg-white rounded-lg text-[13px] font-medium text-gray-700 transition-all cursor-pointer border border-gray-200"
                style={{ ["--hover-bg" as string]: ACCENT }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = ACCENT; (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = ACCENT; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.color = "#374151"; (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE (with verification badges) ── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">Professional Experience</h2>
          <div className="max-w-3xl space-y-8">
            {CAREER_HISTORY.map((exp) => {
              const verification = WORK_VERIFICATIONS.find((v) => v.experienceId === exp.id && v.candidateSlug === p.id);
              const companySlug = verification?.companySlug ?? exp.company.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ background: ACCENT }} />
                  <div>
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-[16px] font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-[14px] font-medium" style={{ color: ACCENT }}>{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-gray-500 whitespace-nowrap">
                        <Calendar size={14} /> {exp.period}
                        {!exp.to && <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">Current</span>}
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-xs bg-gray-50 text-gray-500 border border-gray-200">{s}</span>
                      ))}
                    </div>
                    <VerificationBadge
                      status={exp.verificationStatus}
                      experienceId={exp.id}
                      candidateSlug={p.id}
                      companySlug={companySlug}
                      companyName={exp.company}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SELECTED PROJECTS ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[28px] font-bold text-gray-900">Selected Projects</h2>
            <Link to="/d/works" className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest hover:gap-3 transition-all" style={{ color: ACCENT }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PORTFOLIO_WORKS.slice(0, 4).map((w) => (
              <motion.div
                key={w.id}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 hover:shadow-lg transition-all"
                style={{ ["--tw-border-opacity" as string]: 1 }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = ACCENT}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <ImageWithFallback
                    src={PROJECT_IMAGES[w.id]}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">{w.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 group-hover:transition-colors" style={{}}>{w.title}</h3>
                  <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">{w.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                      <MapPin size={12} /> {PROJECT_CITIES[w.id]}
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-gray-400">
                      <span className="flex items-center gap-1"><Eye size={12} />{w.views}</span>
                      <span className="flex items-center gap-1"><Heart size={12} />{w.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">Client Reviews</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-end gap-3 mb-3">
                  <div className="text-[52px] font-bold text-gray-900 leading-none">4.8</div>
                  <div className="pb-2">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} className="text-[#FF6A3D] fill-[#FF6A3D]" />)}
                    </div>
                    <p className="text-[12px] text-gray-600">Based on 87 reviews</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-300">
                  <p className="text-[13px] text-gray-700 font-medium">Trusted by 24+ clients</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {ANKIT_REVIEWS.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 mb-1">{review.name}</h4>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} size={13} className={i <= review.rating ? "text-[#FF6A3D] fill-[#FF6A3D]" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                      <Quote size={20} className="text-gray-300" />
                    </div>
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-2">{review.text}</p>
                    <p className="text-[12px] text-gray-500 italic">Project: {review.project}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-5 flex flex-col items-center text-center border border-gray-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: `${ACCENT}18` }}>
                  <Award size={24} style={{ color: ACCENT }} />
                </div>
                <h3 className="text-[12px] font-bold text-gray-900 mb-1">{c.name}</h3>
                <p className="text-[11px] text-gray-400">{c.issuer}</p>
                <p className="text-[11px] text-gray-400">{c.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENROLLED_COURSES.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 p-5 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.completed ? "rgba(16,185,129,0.1)" : `${ACCENT}18` }}>
                    {c.completed
                      ? <CheckCircle2 style={{ color: "#10b981", width: 18, height: 18 }} />
                      : <GraduationCap style={{ color: ACCENT, width: 18, height: 18 }} />}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={c.completed
                      ? { background: "rgba(16,185,129,0.1)", color: "#10b981" }
                      : { background: `${ACCENT}18`, color: ACCENT }}
                  >
                    {c.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-gray-900 leading-snug">{c.title}</div>
                  <div className="text-[12px] text-gray-500 mt-1">{c.provider} · {c.level}</div>
                </div>
                {!c.completed && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: ACCENT }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: ACCENT }}>{c.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {publishedBlogs.map((post) => (
              <div key={post.id} className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}18` }}>
                  <FileText style={{ color: ACCENT, width: 18, height: 18 }} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-gray-900 leading-snug">{post.title}</div>
                  <p className="mt-1.5 line-clamp-3 text-[13px] text-gray-600 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <span className="text-[11px] text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400"><Heart className="w-3 h-3" />{post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLIED JOBS (only when logged in as Ankit) ── */}
      {isAnkitLoggedIn && (
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
            <h2 className="text-[24px] font-bold text-gray-900 mb-6">Applied Jobs</h2>
            <div className="space-y-3 max-w-2xl">
              {APPLIED_JOBS.map((job) => {
                const st = STATUS_STYLE[job.status] ?? STATUS_STYLE.Applied;
                return (
                  <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-gray-900">{job.title}</div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-[13px] text-gray-600">{job.studio}</span>
                        <span className="flex items-center gap-0.5 text-[12px] text-gray-500"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-0.5 text-[12px] text-gray-500"><IndianRupee className="w-3 h-3" />{job.salary}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: st.bg, color: st.color }}>{job.status}</span>
                  </div>
                );
              })}
            </div>
            <Link to="/d/jobs" className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: ACCENT }}>
              Manage in Dashboard <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* ── ACTIVITY ── */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACTIVITY_FEED.slice(0, 4).map((item) => (
              <div key={item.id} className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18`, border: `2px solid ${item.color}30` }}
                >
                  <Activity style={{ color: item.color, width: 16, height: 16 }} />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-gray-800 leading-snug">{item.text}</div>
                  <div className="text-[12px] text-gray-400 mt-2">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Verifier / colleague public profile ──────────────────────────────────── */

function VerifierProfile({ profile: vp }: { profile: DesignerProfileData }) {
  const accent = vp.accentColor;
  const rgb = hexToRgb(accent);

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div style={{ background: `linear-gradient(135deg,${accent} 0%,${accent}99 100%)`, height: 180 }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 pb-24 space-y-5">
        {/* Header */}
        <div className="rounded-2xl p-5 sm:p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div className="flex flex-col sm:flex-row gap-5">
            {vp.avatar ? (
              <img
                src={vp.avatar}
                alt={vp.name}
                className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                style={{ border: "4px solid white", boxShadow: `0 4px 12px rgba(${rgb},0.4)`, marginTop: -48 }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${accent},${accent}cc)`, border: "4px solid white", boxShadow: `0 4px 12px rgba(${rgb},0.4)`, marginTop: -48 }}
              >
                {vp.initials}
              </div>
            )}
            <div className="flex-1 min-w-0 mt-2 sm:mt-0">
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{vp.name}</h1>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 4, fontWeight: 500 }}>{vp.headline}</p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}><MapPin className="w-3.5 h-3.5" />{vp.location}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: `rgba(${rgb},0.1)`, color: accent }}>{vp.type}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-5 pt-4 flex-wrap" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {[{ label: "Works", value: vp.stats.works }, { label: "Profile Views", value: vp.stats.profileViews.toLocaleString() }, { label: "Connections", value: vp.stats.connections }, { label: "Endorsements", value: vp.stats.endorsements }].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: accent }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-3">
              <a href={`mailto:${vp.email}`} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}><Mail style={{ width: 16, height: 16, color: "var(--text-muted)" }} /></a>
              {vp.linkedin && <a href={`https://${vp.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}><Linkedin style={{ width: 16, height: 16, color: "var(--text-muted)" }} /></a>}
            </div>
          </div>
        </div>

        {/* About */}
        <SectionCard title="About" icon={Eye} accent={accent}>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{vp.bio}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {vp.skills.map((s) => <span key={s} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `rgba(${rgb},0.08)`, color: accent }}>{s}</span>)}
          </div>
        </SectionCard>

        {/* Works */}
        {vp.works.length > 0 && (
          <SectionCard title="Works" icon={Eye} accent={accent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vp.works.map((w) => (
                <div key={w.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="h-36" style={{ background: w.gradient }} />
                  <div className="p-3">
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{w.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{w.category} · {w.year}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><Eye className="w-3 h-3" />{w.views}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><Heart className="w-3 h-3" />{w.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Career History */}
        {vp.careerHistory.length > 0 && (
          <SectionCard title="Career History" icon={Briefcase} accent={accent}>
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <div className="space-y-6">
                {vp.careerHistory.map((exp) => {
                  const companySlug = exp.company.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <div key={exp.id} className="flex items-start gap-4 pl-1">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: `rgba(${rgb},0.12)`, border: `2px solid rgba(${rgb},0.25)` }}>
                        <Briefcase style={{ color: accent, width: 16, height: 16 }} />
                      </div>
                      <div className="flex-1 pb-2">
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{exp.role}</div>
                        <div style={{ fontSize: "0.82rem", color: accent, fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                        <div className="flex items-center gap-1 mt-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          <Calendar className="w-3.5 h-3.5" />{exp.period}
                          {!exp.to && <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>Current</span>}
                        </div>
                        <p className="mt-2" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.skills.map((s) => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>{s}</span>)}
                        </div>
                        <VerificationBadge
                          status={exp.verificationStatus ?? "unverified"}
                          experienceId={exp.id}
                          candidateSlug={vp.id}
                          companySlug={companySlug}
                          companyName={exp.company}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionCard>
        )}

        {/* Certifications */}
        {vp.certifications.length > 0 && (
          <SectionCard title="Certifications" icon={Award} accent={accent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vp.certifications.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${rgb},0.1)` }}>
                    <Award style={{ color: accent, width: 18, height: 18 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{c.issuer} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Courses */}
        {vp.courses.length > 0 && (
          <SectionCard title="Courses" icon={GraduationCap} accent={accent}>
            <div className="space-y-3">
              {vp.courses.map((c) => (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.completed ? "rgba(16,185,129,0.1)" : `rgba(${rgb},0.1)` }}>
                    {c.completed ? <CheckCircle2 style={{ color: "#10b981", width: 16, height: 16 }} /> : <GraduationCap style={{ color: accent, width: 16, height: 16 }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{c.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{c.provider} · {c.level}</div>
                    {!c.completed && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                          <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: accent }} />
                        </div>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: accent }}>{c.progress}%</span>
                      </div>
                    )}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={c.completed ? { background: "rgba(16,185,129,0.1)", color: "#10b981" } : { background: `rgba(${rgb},0.1)`, color: accent }}>
                    {c.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Blogs */}
        {vp.blogs.length > 0 && (
          <SectionCard title="Blogs" icon={FileText} accent={accent}>
            <div className="space-y-4">
              {vp.blogs.map((post) => (
                <div key={post.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${rgb},0.1)` }}>
                    <FileText style={{ color: accent, width: 18, height: 18 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{post.title}</div>
                    <p className="mt-1 line-clamp-2" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}><Heart className="w-3 h-3" />{post.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Verified Ankit note */}
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
          <ShieldCheck style={{ color: "#10b981", width: 20, height: 20, flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {vp.name} has verified Ankit Sharma's work experience at Studio Lotus.
            </span>
            <Link to="/designer/ankit-sharma" className="ml-2 text-sm font-semibold" style={{ color: "#10b981" }}>
              View Ankit's profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Studio team member data ──────────────────────────────────────────────── */

const OR = "#FF6A3D";

interface StudioMemberData {
  id: string;
  name: string;
  role: string;
  type: string;
  location: string;
  avatar: string;
  cover: string;
  rating: number;
  reviewCount: number;
  disciplines: string[];
  serviceAreas: string[];
  stats: { projects: number; years: number; cities: number };
  about: string;
  approach: string;
  expertise: string[];
  services: string[];
  skills: string[];
  certifications: Array<{ name: string; issuer: string; year: string }>;
  experience: Array<{ id: string; role: string; company: string; period: string; to: string | null; description: string; skills: string[]; verificationStatus: "verified" | "pending" | "unverified" }>;
  projects: Array<{ id: string; name: string; type: string; location: string; image: string }>;
  reviews: Array<{ id: number; name: string; rating: number; text: string; project: string }>;
}

const STUDIO_MEMBERS: Record<string, StudioMemberData> = {
  "ananya-rao": {
    id: "ananya-rao", name: "Ananya Rao", role: "Interior Designer", type: "Interior Designer",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    cover: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600",
    rating: 4.8, reviewCount: 54, disciplines: ["Interior Design", "Residential", "Hospitality"],
    serviceAreas: ["Chennai", "Bangalore", "Hyderabad", "Coimbatore"],
    stats: { projects: 38, years: 7, cities: 4 },
    about: "Interior designer with 7+ years creating immersive residential and hospitality spaces across South India. Known for blending traditional Chettinad craft with contemporary material palettes. Every project begins with a material story.",
    approach: "I work with natural materials first — stone, wood, hand-woven textiles — and build the spatial narrative around them. Functionality and beauty are never in opposition.",
    expertise: ["Residential Interiors", "Hospitality Design", "Material Curation", "Lighting Design", "Space Planning", "Heritage Adaptation"],
    services: ["Interior Design Consultation", "Space Planning", "Material Specification", "Lighting Design", "FF&E Procurement", "Site Supervision"],
    skills: ["AutoCAD", "SketchUp", "3ds Max", "Photoshop", "Revit", "Hand Sketching", "Material Boards"],
    certifications: [
      { name: "Certified Interior Designer (CID)", issuer: "IIID", year: "2021" },
      { name: "LEED Green Associate", issuer: "USGBC", year: "2022" },
      { name: "Lighting Design Certificate", issuer: "IES India", year: "2020" },
    ],
    experience: [
      { id: "ar-e1", role: "Interior Designer", company: "Kalpa Studio", period: "Mar 2020 – Present", to: null, description: "Lead designer on high-end residential and boutique hotel projects. Manage client relationships, material procurement, and site execution.", skills: ["Residential", "Hospitality", "Team Lead"], verificationStatus: "verified" },
      { id: "ar-e2", role: "Junior Designer", company: "Vinyasa Design Lab", period: "Jun 2017 – Feb 2020", to: "2020-02", description: "Supported senior designers on commercial and residential projects. Developed expertise in material specification and vendor coordination.", skills: ["Commercial", "Material Spec", "CAD"], verificationStatus: "unverified" },
    ],
    projects: [
      { id: "ar-p1", name: "Chettinad Heritage Villa", type: "Residential", location: "Karaikudi", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
      { id: "ar-p2", name: "Spice Route Restaurant", type: "Hospitality", location: "Chennai", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
      { id: "ar-p3", name: "Coastal Retreat", type: "Residential", location: "Pondicherry", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
      { id: "ar-p4", name: "ECR Weekend Home", type: "Residential", location: "Chennai", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Meenakshi Rajan", rating: 5, text: "Ananya transformed our ancestral home into a beautiful contemporary space while preserving its soul. Her knowledge of local materials is unmatched.", project: "Chettinad Heritage Villa" },
      { id: 2, name: "Siddharth Nair", rating: 5, text: "Our restaurant design exceeded every expectation. She understood our brand identity intuitively and translated it into the space perfectly.", project: "Spice Route Restaurant" },
      { id: 3, name: "Deepa Krishnamurthy", rating: 5, text: "Professional, detail-oriented, and genuinely passionate about her craft. Highly recommend for residential projects.", project: "ECR Weekend Home" },
    ],
  },
  "rohan-mehta": {
    id: "rohan-mehta", name: "Rohan Mehta", role: "Junior Architect", type: "Architect",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
    rating: 4.6, reviewCount: 18, disciplines: ["Architecture", "Computational Design", "Residential"],
    serviceAreas: ["Chennai", "Bangalore", "Mumbai"],
    stats: { projects: 12, years: 2, cities: 3 },
    about: "Graduate architect from CEPT, passionate about computational design and parametric workflows. Currently honing skills in residential and mixed-use architecture at Kalpa Studio, with a focus on climate-responsive design for South Indian conditions.",
    approach: "I approach every project through the lens of climate performance — passive cooling, natural light, and local materials are non-negotiables before aesthetics are even discussed.",
    expertise: ["Parametric Design", "Climate-Responsive Architecture", "Computational Workflows", "Residential Architecture", "3D Visualisation"],
    services: ["Design Development", "3D Visualisation", "Parametric Modelling", "Construction Documentation", "Site Analysis"],
    skills: ["Rhino", "Grasshopper", "Revit", "AutoCAD", "Lumion", "Python Scripting", "SketchUp"],
    certifications: [
      { name: "COA Registered Architect", issuer: "Council of Architecture", year: "2024" },
      { name: "Rhino & Grasshopper Certificate", issuer: "McNeel Institute", year: "2023" },
    ],
    experience: [
      { id: "rm-e1", role: "Junior Architect", company: "Kalpa Studio", period: "Aug 2024 – Present", to: null, description: "Working on residential and mixed-use projects. Leads computational design workflows and BIM coordination.", skills: ["BIM", "Computational Design", "Documentation"], verificationStatus: "verified" },
      { id: "rm-e2", role: "Architecture Intern", company: "Studio Morphogenesis", period: "Jan 2024 – Jul 2024", to: "2024-07", description: "Thesis internship. Contributed to conceptual design on an institutional campus project in Pune.", skills: ["Concept Design", "Institutional", "Grasshopper"], verificationStatus: "pending" },
    ],
    projects: [
      { id: "rm-p1", name: "Parametric Pavilion — IIT Madras", type: "Institutional", location: "Chennai", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" },
      { id: "rm-p2", name: "Compact Urban Home", type: "Residential", location: "Chennai", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&q=80&w=800" },
      { id: "rm-p3", name: "Climate Study — ECR Villa", type: "Residential", location: "Chennai", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800" },
      { id: "rm-p4", name: "Modular Retail Unit", type: "Commercial", location: "Bangalore", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Prof. Suresh Iyer", rating: 5, text: "Rohan brings a rare combination of technical rigour and design sensitivity for someone so early in his career. His Grasshopper workflows saved us 2 weeks on the pavilion project.", project: "Parametric Pavilion — IIT Madras" },
      { id: 2, name: "Latha Venkataraman", rating: 4, text: "Very professional, responsive, and technically sharp. Would love to work with him again on the next phase.", project: "Compact Urban Home" },
    ],
  },
  "priya-iyer": {
    id: "priya-iyer", name: "Priya Iyer", role: "BIM Coordinator", type: "BIM Specialist",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    cover: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600",
    rating: 4.9, reviewCount: 31, disciplines: ["BIM", "Architecture", "Construction Tech"],
    serviceAreas: ["Chennai", "Hyderabad", "Bangalore", "Pune"],
    stats: { projects: 29, years: 5, cities: 4 },
    about: "BIM Coordinator with 5 years of experience managing model coordination, clash detection, and digital delivery across large-scale commercial and institutional projects. Specialises in Revit-to-site workflows and ISO 19650 compliance.",
    approach: "BIM is not a software skill — it is a project management philosophy. I focus on information flows, model governance, and ensuring every discipline speaks the same digital language on-site.",
    expertise: ["Revit Model Management", "Clash Detection", "ISO 19650 Compliance", "4D Scheduling", "Construction Documentation", "Point Cloud Integration"],
    services: ["BIM Model Setup", "Clash Detection & Resolution", "LOD Documentation", "Digital Delivery", "BIM Training", "Site-to-Model Verification"],
    skills: ["Revit", "Navisworks", "BIM 360", "AutoCAD", "Dynamo", "Solibri", "MS Project"],
    certifications: [
      { name: "Autodesk Certified Professional — Revit", issuer: "Autodesk", year: "2022" },
      { name: "ISO 19650 BIM Manager", issuer: "BSI Group", year: "2023" },
      { name: "LEED BD+C Associate", issuer: "USGBC", year: "2021" },
    ],
    experience: [
      { id: "pi-e1", role: "BIM Coordinator", company: "Kalpa Studio", period: "Apr 2022 – Present", to: null, description: "Leads BIM coordination across all active projects. Manages federated models, conducts weekly clash-detection reviews, and owns the project CDE.", skills: ["Model Coordination", "CDE Management", "ISO 19650"], verificationStatus: "verified" },
      { id: "pi-e2", role: "BIM Technician", company: "L&T Construction", period: "Jul 2019 – Mar 2022", to: "2022-03", description: "Supported BIM delivery on hospital and institutional projects. Built Revit families and managed construction documentation packages.", skills: ["Revit", "Hospital Projects", "Documentation"], verificationStatus: "pending" },
    ],
    projects: [
      { id: "pi-p1", name: "Apollo Hospitals Expansion", type: "Healthcare", location: "Chennai", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
      { id: "pi-p2", name: "IIT Madras Research Park", type: "Institutional", location: "Chennai", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800" },
      { id: "pi-p3", name: "Brigade Tower — MEP Coordination", type: "Commercial", location: "Bangalore", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800" },
      { id: "pi-p4", name: "TIDEL Park Phase 3", type: "Commercial", location: "Chennai", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Arjun Subramaniam", rating: 5, text: "Priya's BIM coordination eliminated virtually all RFIs during construction. That's a feat. Her clash detection process is gold standard.", project: "Apollo Hospitals Expansion" },
      { id: 2, name: "Divya Rangan", rating: 5, text: "She set up our entire project CDE from scratch, trained the team, and kept it running flawlessly. Absolutely invaluable on complex projects.", project: "IIT Madras Research Park" },
    ],
  },
  "kabir-shah": {
    id: "kabir-shah", name: "Kabir Shah", role: "Office Manager", type: "Studio Operations",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    rating: 4.7, reviewCount: 22, disciplines: ["Studio Operations", "Project Management", "Client Relations"],
    serviceAreas: ["Chennai", "Pan India"],
    stats: { projects: 45, years: 8, cities: 6 },
    about: "Operations lead with 8 years of studio management experience across architecture and design firms. Expert in project scheduling, vendor management, client communications, and financial tracking for multi-project studios.",
    approach: "A well-run studio lets designers design. My job is to remove friction — from vendor delays to invoice confusion — so the creative team can focus entirely on the work.",
    expertise: ["Studio Operations", "Project Scheduling", "Vendor Management", "Client Relations", "Financial Tracking", "HR Coordination"],
    services: ["Studio Setup Consulting", "Project Scheduling", "Vendor Network Access", "Operations Audit", "SOP Documentation"],
    skills: ["Monday.com", "Notion", "Zoho Projects", "QuickBooks", "MS Excel", "Slack", "Google Workspace"],
    certifications: [
      { name: "PMP — Project Management Professional", issuer: "PMI", year: "2020" },
      { name: "Lean Six Sigma Green Belt", issuer: "KPMG India", year: "2019" },
    ],
    experience: [
      { id: "ks-e1", role: "Office Manager", company: "Kalpa Studio", period: "Jan 2021 – Present", to: null, description: "Manages studio operations for a 38-person firm. Oversees project timelines, vendor contracts, client invoicing, and team coordination.", skills: ["Operations", "HR", "Finance", "Scheduling"], verificationStatus: "verified" },
      { id: "ks-e2", role: "Project Coordinator", company: "Design Inc. Bangalore", period: "Mar 2016 – Dec 2020", to: "2020-12", description: "Coordinated 12+ concurrent projects across residential and commercial typologies. Managed client communication and sub-contractor scheduling.", skills: ["Project Coordination", "Client Comms", "Scheduling"], verificationStatus: "unverified" },
    ],
    projects: [
      { id: "ks-p1", name: "Kalpa Studio — Office Expansion", type: "Operations", location: "Chennai", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" },
      { id: "ks-p2", name: "38-Person Studio Workflow Redesign", type: "Operations", location: "Chennai", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Ishaan Kapoor", rating: 5, text: "Kabir runs the studio like clockwork. Since he joined, project delays dropped by 60% and our clients notice the difference in responsiveness.", project: "Studio Operations" },
      { id: 2, name: "Nisha Verma", rating: 5, text: "He handles the chaos so we don't have to. Every document, every vendor, every deadline — always on top of it.", project: "38-Person Studio Workflow" },
    ],
  },
  "ishaan-kapoor": {
    id: "ishaan-kapoor", name: "Ishaan Kapoor", role: "Principal Architect", type: "Architect",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    cover: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600",
    rating: 4.9, reviewCount: 112, disciplines: ["Architecture", "Urban Design", "Institutional"],
    serviceAreas: ["Chennai", "Bangalore", "Hyderabad", "Delhi", "Mumbai", "Coimbatore"],
    stats: { projects: 87, years: 16, cities: 6 },
    about: "Principal Architect and co-founder of Kalpa Studio. 16 years designing across institutional, civic, and large-scale residential typologies in South and Central India. National award winner for sustainable architecture in tropical climates.",
    approach: "Architecture must earn its place in the landscape. I start with the site — its topography, prevailing winds, the quality of light at different hours — before a single line is drawn. Climate performance is non-negotiable; beauty follows from it.",
    expertise: ["Institutional Architecture", "Civic Design", "Sustainable Tropical Architecture", "Urban Design", "Master Planning", "Site-Responsive Design"],
    services: ["Architectural Design", "Master Planning", "Urban Design", "Sustainability Consulting", "Design Reviews", "Expert Witness"],
    skills: ["AutoCAD", "Rhino", "Revit", "Photoshop", "SketchUp", "InDesign", "Hand Drawing"],
    certifications: [
      { name: "COA Registered Architect", issuer: "Council of Architecture India", year: "2008" },
      { name: "IGBC Accredited Professional", issuer: "CII – IGBC", year: "2015" },
      { name: "LEED AP BD+C", issuer: "USGBC", year: "2016" },
      { name: "National Architecture Award — Tropical Sustainability", issuer: "IIA", year: "2022" },
    ],
    experience: [
      { id: "ik-e1", role: "Principal Architect & Co-Founder", company: "Kalpa Studio", period: "Jun 2014 – Present", to: null, description: "Founded and leads a 38-person architecture and interior design practice. Responsible for design direction, client relationships, and business strategy.", skills: ["Design Leadership", "Business Dev", "Institutional", "Urban Design"], verificationStatus: "verified" },
      { id: "ik-e2", role: "Associate Architect", company: "Venkataramanan Associates", period: "Mar 2010 – May 2014", to: "2014-05", description: "Lead designer on government and civic commissions across Tamil Nadu. Managed teams of 8–12 and delivered projects up to ₹180 Cr.", skills: ["Civic Architecture", "Government Projects", "Team Management"], verificationStatus: "pending" },
      { id: "ik-e3", role: "Architect", company: "Abin Design Studio", period: "Aug 2008 – Feb 2010", to: "2010-02", description: "Worked on residential and cultural projects. Developed expertise in hand-crafted material details and contractor management.", skills: ["Residential", "Cultural", "Material Details"], verificationStatus: "unverified" },
    ],
    projects: [
      { id: "ik-p1", name: "Tamil Nadu Judicial Academy", type: "Institutional", location: "Chennai", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800" },
      { id: "ik-p2", name: "Nilgiri District Collectorate", type: "Civic", location: "Ooty", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800" },
      { id: "ik-p3", name: "Habitat Community Centre", type: "Cultural", location: "Coimbatore", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800" },
      { id: "ik-p4", name: "IIM Tiruchirappalli Expansion", type: "Institutional", location: "Trichy", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Justice Ramachandran", rating: 5, text: "The Judicial Academy Ishaan designed is a masterclass in dignified civic architecture. Every space communicates gravitas without ostentation.", project: "Tamil Nadu Judicial Academy" },
      { id: 2, name: "Dr. Sunita Rao", rating: 5, text: "We have been working with Ishaan for 6 years across three projects. His ability to navigate government approvals and design quality simultaneously is exceptional.", project: "IIM Tiruchirappalli Expansion" },
      { id: 3, name: "Rajan Krishnamoorthy", rating: 5, text: "A rare architect who is equally comfortable with sketch, specification, and site. An absolute pleasure to work with.", project: "Habitat Community Centre" },
    ],
  },
  "nisha-verma": {
    id: "nisha-verma", name: "Nisha Verma", role: "Senior Associate", type: "Architect",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    cover: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1600",
    rating: 4.8, reviewCount: 67, disciplines: ["Architecture", "Residential", "Commercial"],
    serviceAreas: ["Chennai", "Bangalore", "Hyderabad", "Kochi"],
    stats: { projects: 52, years: 11, cities: 4 },
    about: "Senior Associate at Kalpa Studio with 11 years of experience across high-end residential and premium commercial architecture. Known for rigorous construction detailing, client management on complex briefs, and mentoring junior architects.",
    approach: "I believe architecture lives in the details — the joint between materials, the threshold between inside and out, the sequence of arrival. Getting the big moves right is table stakes; what differentiates a project is the thousand small decisions made with care.",
    expertise: ["High-End Residential", "Commercial Architecture", "Construction Detailing", "Material Specification", "Client Management", "Team Mentoring"],
    services: ["Architectural Design", "Construction Documentation", "Site Supervision", "Interior Architecture", "Material Specification", "Project Management"],
    skills: ["AutoCAD", "Revit", "SketchUp", "Rhino", "Lumion", "InDesign", "Photoshop"],
    certifications: [
      { name: "COA Registered Architect", issuer: "Council of Architecture India", year: "2013" },
      { name: "IGBC Green Homes Evaluator", issuer: "CII – IGBC", year: "2018" },
      { name: "Project Management for Architects", issuer: "AIA India", year: "2020" },
    ],
    experience: [
      { id: "nv-e1", role: "Senior Associate", company: "Kalpa Studio", period: "Sep 2018 – Present", to: null, description: "Leads a team of 5 on concurrent residential and commercial projects. Primary client contact for premium residential portfolio.", skills: ["Team Lead", "Residential", "Commercial", "Client Mgmt"], verificationStatus: "verified" },
      { id: "nv-e2", role: "Project Architect", company: "Ar. Shyam Sunder & Associates", period: "May 2014 – Aug 2018", to: "2018-08", description: "Delivered 14 residential and 5 commercial projects end-to-end. Developed specialisation in premium villa design in Hyderabad.", skills: ["Villa Design", "Residential", "Documentation"], verificationStatus: "pending" },
      { id: "nv-e3", role: "Architect", company: "Vivek Nair Design Studio", period: "Jul 2013 – Apr 2014", to: "2014-04", description: "First role post-registration. Focused on construction drawings and site coordination.", skills: ["Construction Drawings", "Site Coordination"], verificationStatus: "unverified" },
    ],
    projects: [
      { id: "nv-p1", name: "Boat Club Villa — Adyar", type: "Residential", location: "Chennai", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" },
      { id: "nv-p2", name: "Prestige Leela Residences", type: "Residential", location: "Bangalore", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800" },
      { id: "nv-p3", name: "Nxt Campus — Phase 1", type: "Commercial", location: "Hyderabad", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" },
      { id: "nv-p4", name: "The Studio — Artist Retreat", type: "Residential", location: "Kochi", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" },
    ],
    reviews: [
      { id: 1, name: "Padma Seshadri", rating: 5, text: "Nisha designed our Adyar villa and it is everything we dreamed of. Her attention to the details — the joinery, the material transitions — is extraordinary.", project: "Boat Club Villa — Adyar" },
      { id: 2, name: "Amit Mehrotra", rating: 5, text: "She managed a very complex client brief with grace and precision. Every change request was handled smoothly without compromising the design vision.", project: "Prestige Leela Residences" },
      { id: 3, name: "Kiran Nambiar", rating: 5, text: "The Studio retreat has exceeded all our expectations. Nisha's material palette is outstanding and the construction quality speaks to her site rigour.", project: "The Studio — Artist Retreat" },
    ],
  },
};

/* ── Studio member profile component ─────────────────────────────────────── */

function StudioMemberProfile({ member }: { member: StudioMemberData }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const visibleAreas = showAllAreas ? member.serviceAreas : member.serviceAreas.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={member.cover} alt={member.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-end pb-12">

            <div className="lg:col-span-2">
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 rounded-2xl flex-shrink-0 border-4 shadow-2xl overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-[36px] md:text-[42px] font-bold text-white drop-shadow-lg">{member.name}</h1>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full">
                      <CheckCircle2 size={14} style={{ color: OR }} />
                      <span className="text-[11px] font-bold text-gray-900">Verified</span>
                    </div>
                  </div>
                  <p className="text-[16px] text-white/90 mb-3 drop-shadow">{member.role} · Kalpa Studio</p>
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[14px]">
                      <MapPin size={16} className="text-white/70" />
                      <span className="text-white font-medium">{member.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={16} style={{ color: OR, fill: OR }} />
                      <span className="text-[15px] font-bold text-white">{member.rating}</span>
                      <span className="text-[13px] text-white/70">({member.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.disciplines.map((d) => (
                      <span key={d} className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-[12px] font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
                <div className="space-y-3 mb-6">
                  <a href={`mailto:studio@kalpastudio.in`} className="w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2" style={{ background: OR, color: "white" }}>
                    <FileText size={16} /> Get Quote
                  </a>
                  <a href={`mailto:studio@kalpastudio.in`} className="w-full h-12 bg-gray-900 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <MessageCircle size={16} /> Contact
                  </a>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isSaved ? "text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                    style={isSaved ? { background: OR } : {}}
                  >
                    <Heart size={16} className={isSaved ? "fill-white" : ""} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-gray-600 pt-4 border-t border-gray-200">
                  <Clock size={14} className="text-gray-400" />
                  <span>Responds within 24 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Service Areas</h3>
          <div className="flex flex-wrap items-center gap-2">
            {visibleAreas.map((a) => (
              <span key={a} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-[13px] font-medium border border-gray-200">{a}</span>
            ))}
            {!showAllAreas && member.serviceAreas.length > 4 && (
              <button onClick={() => setShowAllAreas(true)} className="px-4 py-2 rounded-lg text-[13px] font-medium text-white" style={{ background: OR }}>
                +{member.serviceAreas.length - 4} more
              </button>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {[
              { val: `${member.stats.projects}+`, label: "Projects Completed" },
              { val: member.stats.years,           label: "Years Experience" },
              { val: member.stats.cities,          label: "Cities Served" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-gray-200 mx-8" />}
                <div className="text-center">
                  <div className="text-[32px] font-bold mb-1" style={{ color: OR }}>{s.val}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-[15px] text-gray-700 leading-relaxed">{member.about}</p>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Design Approach</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{member.approach}</p>
              </div>
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Core Expertise</h3>
              <div className="space-y-2.5">
                {member.expertise.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: OR, flexShrink: 0 }} />
                    <span className="text-[14px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Services I Offer</h2>
          <div className="flex flex-wrap gap-2.5">
            {member.services.map((s) => (
              <div
                key={s}
                className="px-5 py-2.5 bg-white rounded-lg text-[13px] font-medium text-gray-700 cursor-pointer border border-gray-200 transition-all"
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = OR; el.style.color = "white"; el.style.borderColor = OR; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.color = "#374151"; el.style.borderColor = "#E5E7EB"; }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">Professional Experience</h2>
          <div className="max-w-3xl space-y-8">
            {member.experience.map((exp) => {
              const companySlug = exp.company.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
              return (
                <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ background: OR }} />
                  <div>
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-[16px] font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-[14px] font-medium" style={{ color: OR }}>{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-gray-500 whitespace-nowrap">
                        <Calendar size={14} /> {exp.period}
                        {!exp.to && <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">Current</span>}
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-xs bg-gray-50 text-gray-500 border border-gray-200">{s}</span>
                      ))}
                    </div>
                    <VerificationBadge
                      status={exp.verificationStatus}
                      experienceId={exp.id}
                      candidateSlug={member.id}
                      companySlug={companySlug}
                      companyName={exp.company}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {member.projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 hover:shadow-lg transition-all"
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = OR}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <ImageWithFallback src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">{project.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">{project.name}</h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                    <MapPin size={12} /> {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">Client Reviews</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-end gap-3 mb-3">
                  <div className="text-[52px] font-bold text-gray-900 leading-none">{member.rating}</div>
                  <div className="pb-2">
                    <div className="flex gap-0.5 mb-1">
                      {[1,2,3,4,5].map((i) => <Star key={i} size={16} style={{ color: OR, fill: OR }} />)}
                    </div>
                    <p className="text-[12px] text-gray-600">Based on {member.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-[13px] text-gray-700 font-medium pt-4 border-t border-gray-300">Trusted by {member.stats.projects}+ clients</p>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              {member.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">{review.name}</h4>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => <Star key={i} size={13} style={i <= review.rating ? { color: OR, fill: OR } : { color: "#D1D5DB" }} />)}
                      </div>
                    </div>
                    <Quote size={20} className="text-gray-300" />
                  </div>
                  <p className="text-[14px] text-gray-700 leading-relaxed mb-2">{review.text}</p>
                  <p className="text-[12px] text-gray-500 italic">Project: {review.project}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Skills & Software</h2>
          <div className="flex flex-wrap gap-2.5">
            {member.skills.map((s) => (
              <span key={s} className="px-4 py-2 bg-white text-gray-700 rounded-lg text-[12px] font-medium border border-gray-200">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {member.certifications.map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center border border-gray-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: `${OR}18` }}>
                  <Award size={24} style={{ color: OR }} />
                </div>
                <h3 className="text-[12px] font-bold text-gray-900 mb-1">{c.name}</h3>
                <p className="text-[11px] text-gray-400">{c.issuer} · {c.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "c1", title: "Sustainable Design Principles", provider: "IGBC Academy", level: "Intermediate", completed: true, progress: 100 },
              { id: "c2", title: "Advanced BIM for Architecture", provider: "Autodesk University", level: "Advanced", completed: false, progress: 55 },
              { id: "c3", title: "Climate-Responsive Architecture", provider: "EcoDesign Academy", level: "Intermediate", completed: true, progress: 100 },
              { id: "c4", title: "Parametric Design with Grasshopper", provider: "McNeel Institute", level: "Advanced", completed: false, progress: 40 },
            ].map((c) => (
              <div key={c.id} className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.completed ? "rgba(16,185,129,0.1)" : `${OR}18` }}>
                    {c.completed
                      ? <CheckCircle2 style={{ color: "#10b981", width: 18, height: 18 }} />
                      : <GraduationCap style={{ color: OR, width: 18, height: 18 }} />}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={c.completed ? { background: "rgba(16,185,129,0.1)", color: "#10b981" } : { background: `${OR}18`, color: OR }}>
                    {c.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-gray-900 leading-snug">{c.title}</div>
                  <div className="text-[12px] text-gray-500 mt-1">{c.provider} · {c.level}</div>
                </div>
                {!c.completed && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: OR }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: OR }}>{c.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "a1", title: `Material Thinking in ${member.role} Practice`, excerpt: "How material choices define space, not just surface. A practitioner's perspective on specification and sourcing.", date: "2026-03-10", views: 1240, likes: 87 },
              { id: "a2", title: "Working with Local Contractors", excerpt: "Bridging design intent and site execution — lessons from years of on-ground collaboration.", date: "2026-01-22", views: 890, likes: 63 },
              { id: "a3", title: "Climate and Context in South Indian Design", excerpt: "Passive cooling, natural light, and vernacular strategies that make buildings perform for their geography.", date: "2025-11-15", views: 2100, likes: 142 },
              { id: "a4", title: "The Client Conversation Nobody Teaches You", excerpt: "Managing expectations, creative boundaries, and trust across a long-term design engagement.", date: "2025-09-05", views: 1560, likes: 108 },
            ].map((post) => (
              <div key={post.id} className="flex flex-col gap-3 p-5 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${OR}18` }}>
                  <FileText style={{ color: OR, width: 18, height: 18 }} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-gray-900 leading-snug">{post.title}</div>
                  <p className="mt-1.5 line-clamp-3 text-[13px] text-gray-600 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <span className="text-[11px] text-gray-400">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400"><Heart className="w-3 h-3" />{post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "act1", text: `Completed a project — ${member.projects[0]?.name ?? "New Project"}`, time: "2 days ago", color: OR },
              { id: "act2", text: "Published a new article on material specification", time: "1 week ago", color: "#10b981" },
              { id: "act3", text: "Received a 5-star client review", time: "2 weeks ago", color: "#f59e0b" },
              { id: "act4", text: `Endorsed by a colleague at Kalpa Studio`, time: "3 weeks ago", color: "#6366f1" },
            ].map((item) => (
              <div key={item.id} className="flex flex-col gap-3 p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${item.color}18`, border: `2px solid ${item.color}30` }}>
                  <Activity style={{ color: item.color, width: 16, height: 16 }} />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-gray-800 leading-snug">{item.text}</div>
                  <div className="text-[12px] text-gray-400 mt-2">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Page entry point ─────────────────────────────────────────────────────── */

export function DesignerProfilePage() {
  const { designerId = "" } = useParams<{ designerId: string }>();

  if (designerId === DESIGNER_PROFILE.id) return <AnkitProfile />;

  const studioMember = STUDIO_MEMBERS[designerId];
  if (studioMember) return <StudioMemberProfile member={studioMember} />;

  const verifier = VERIFIER_PROFILES.find((p) => p.id === designerId);
  if (verifier) return <VerifierProfile profile={verifier} />;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafaf9" }}>
      <div className="text-center">
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Profile not found</div>
        <Link to="/professionals" className="mt-3 text-sm font-semibold" style={{ color: OR }}>← Back to Professionals</Link>
      </div>
    </div>
  );
}
