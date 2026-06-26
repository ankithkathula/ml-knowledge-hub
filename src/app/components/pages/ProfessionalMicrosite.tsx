import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft, ArrowRight, Star, MapPin, CheckCircle, Mail, Phone, Globe,
  Instagram, Linkedin, Award, Users, Calendar, Layers,
} from "lucide-react";
import {
  RegisteredProfile,
  PROFESSIONAL_TYPES,
  getCategoryById,
  REGISTERED_PROFESSIONALS,
  categoryImage,
} from "../data/kcPortalData";
import teamAnanya from "../../../assets/team/ananya-rao.jpg";
import teamDaniel from "../../../assets/team/daniel-foster.jpg";
import teamPriya from "../../../assets/team/priya-iyer.jpg";
import teamMarcus from "../../../assets/team/marcus-bennett.jpg";
import teamIshaan from "../../../assets/team/ishaan-kapoor.jpg";
import teamSofia from "../../../assets/team/sofia-rossi.jpg";
import teamAarav from "../../../assets/team/aarav-singh.jpg";
import teamEmily from "../../../assets/team/emily-carter.jpg";
import teamRohan from "../../../assets/team/rohan-mehta.jpg";
import teamHannah from "../../../assets/team/hannah-schmidt.jpg";

interface Props {
  profile: RegisteredProfile;
}

// ─── Generated editorial "projects" from specializations ──
function buildProjects(profile: RegisteredProfile) {
  return profile.specializations.slice(0, 6).map((spec, i) => {
    const lock = profile.id.length * 7 + i * 23 + 41;
    return {
      id: `${profile.id}-proj-${i}`,
      title: `${spec} — ${["Residence", "Pavilion", "Headquarters", "Atelier", "Retreat", "Courtyard"][i % 6]}`,
      year: 2020 + (i % 5),
      location: profile.city,
      // Curated, stable Unsplash photo themed to the practice's discipline.
      image: categoryImage(profile.categoryId, lock, 1200),
      type: spec,
    };
  });
}

const TEAM_ROLES = [
  "Principal Architect", "Senior Associate", "Design Lead", "Project Architect",
  "Interior Designer", "Junior Architect", "BIM Coordinator", "Office Manager",
];

// Real, diverse (Indian + Western) headshots — bundled locally so they always
// load and read as actual studio people, not random/broken live thumbnails.
const TEAM_MEMBERS_POOL = [
  { name: "Ananya Rao",     avatar: teamAnanya },
  { name: "Daniel Foster",  avatar: teamDaniel },
  { name: "Priya Iyer",     avatar: teamPriya },
  { name: "Marcus Bennett", avatar: teamMarcus },
  { name: "Ishaan Kapoor",  avatar: teamIshaan },
  { name: "Sofia Rossi",    avatar: teamSofia },
  { name: "Aarav Singh",    avatar: teamAarav },
  { name: "Emily Carter",   avatar: teamEmily },
  { name: "Rohan Mehta",    avatar: teamRohan },
  { name: "Hannah Schmidt", avatar: teamHannah },
];

function buildTeam(profile: RegisteredProfile) {
  const count = Math.min(6, profile.teamSize);
  // Offset the roster per studio so different practices show different people.
  const offset = (profile.name.length + profile.id.length) % TEAM_MEMBERS_POOL.length;
  return Array.from({ length: count }).map((_, i) => {
    const person = TEAM_MEMBERS_POOL[(i + offset) % TEAM_MEMBERS_POOL.length];
    return {
      id: `${profile.id}-team-${i}`,
      name: person.name,
      slug: person.name.toLowerCase().replace(/\s+/g, "-"),
      role: TEAM_ROLES[(i + profile.name.length) % TEAM_ROLES.length],
      avatar: person.avatar,
    };
  });
}

export function ProfessionalMicrosite({ profile }: Props) {
  const cat = getCategoryById(profile.categoryId);
  const type = PROFESSIONAL_TYPES.find((t) => t.id === profile.typeId);
  const [activeProject, setActiveProject] = useState(0);

  const projects = useMemo(() => buildProjects(profile), [profile]);
  const team = useMemo(() => buildTeam(profile), [profile]);
  const offerings = type?.offerings || [];


  const alsoOfNote = useMemo(
    () =>
      REGISTERED_PROFESSIONALS.filter(
        (p) => p.id !== profile.id && p.categoryId === profile.categoryId
      ).slice(0, 3),
    [profile]
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── Back nav ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          to="/professionals"
          className="inline-flex items-center gap-2 transition-all"
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registry
        </Link>
      </div>

      {/* ══ HERO — full-bleed editorial ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14">
        {/* Practice type eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: cat?.color || "var(--accent)" }} />
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: cat?.color || "var(--accent)",
            }}
          >
            {cat?.name} · {profile.typeName}
          </span>
        </div>

        {/* Name — large editorial title */}
        <div className="flex items-start gap-6 mb-10">
          <div className="flex-1 min-w-0">
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                marginBottom: 14,
              }}
            >
              {profile.name}
              {profile.verified && (
                <CheckCircle
                  className="w-6 h-6 inline ml-3"
                  style={{ color: "#10b981", verticalAlign: "middle" }}
                />
              )}
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                maxWidth: 640,
                fontWeight: 400,
              }}
            >
              {profile.tagline}
            </p>
          </div>

          {/* Minimal actions */}
          <div className="hidden md:flex gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "var(--accent)",
                color: "#fff",
                border: "1px solid var(--accent)",
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Enquire
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "rgba(255,255,255,0.7)",
                color: "var(--text-primary)",
                border: "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              Follow
            </button>
          </div>
        </div>

        {/* Hero full-bleed image */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "21/9",
            background: `${cat?.color || "var(--accent)"}10`,
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <img
            src={profile.heroImage}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35) 100%)",
            }}
          />
          {/* Thin stat row overlaid on bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-8 py-5"
            style={{
              color: "#fff",
            }}
          >
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
                  Practice since
                </p>
                <p style={{ fontSize: "1.05rem", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                  {2026 - profile.yearsExp}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
                  Completed
                </p>
                <p style={{ fontSize: "1.05rem", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                  {profile.projectCount} projects
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
                  Studio
                </p>
                <p style={{ fontSize: "1.05rem", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                  {profile.teamSize} people
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
                  Based in
                </p>
                <p style={{ fontSize: "1.05rem", fontWeight: 500 }}>
                  {profile.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRACTICE STATEMENT ══ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span
            style={{
              fontSize: "0.64rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Practice
          </span>
        </div>
        <p
          style={{
            fontSize: "1.3rem",
            lineHeight: 1.55,
            color: "var(--text-primary)",
            fontWeight: 300,
            letterSpacing: "-0.005em",
            marginBottom: 20,
          }}
        >
          {profile.tagline}. Based in {profile.city}, the practice has completed {profile.projectCount}+ projects
          across India over {profile.yearsExp} years — working at the intersection of craft, context, and contemporary making.
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
          }}
        >
          The studio works across {profile.specializations.slice(0, 3).join(", ").toLowerCase()} — shaped by a commitment to
          material honesty, climatic sensitivity, and a quiet resistance to trend. Each project begins with site, brief,
          and a close reading of how a place is already being lived in.
        </p>
      </section>

      {/* ══ SELECTED WORKS ══ */}
      <section style={{ background: "rgba(0,0,0,0.015)", borderTop: "1px solid rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8" style={{ background: "var(--accent)" }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  Selected works
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                A body of work
              </h2>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>
              {projects.length} of {profile.projectCount}
            </span>
          </div>

          {/* Featured project — full width */}
          {projects[activeProject] && (
            <div
              className="mb-8 rounded-2xl overflow-hidden relative group"
              style={{
                aspectRatio: "21/9",
                background: "rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>
                  {projects[activeProject].type} · {projects[activeProject].year}
                </p>
                <h3 style={{ fontSize: "1.65rem", fontWeight: 400, letterSpacing: "-0.015em" }}>
                  {projects[activeProject].title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
                  {projects[activeProject].location}
                </p>
              </div>
            </div>
          )}

          {/* Project grid — other works */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(i)}
                className="group text-left"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="relative overflow-hidden rounded-xl mb-3"
                  style={{
                    aspectRatio: "4/5",
                    background: "rgba(0,0,0,0.05)",
                    border: i === activeProject ? "2px solid var(--accent)" : "2px solid transparent",
                    transition: "all 0.3s",
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.005em" }}>
                  {proj.title}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {proj.location} · {proj.year}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AREAS OF PRACTICE ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "var(--accent)" }} />
              <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Practice areas
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              What we do
            </h2>
          </div>
          <div>
            <div className="space-y-0">
              {offerings.map((offering, idx) => (
                <div
                  key={offering}
                  className="flex items-center justify-between py-5 group"
                  style={{
                    borderTop: idx === 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "12px")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "0")}
                >
                  <div className="flex items-center gap-5">
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {offering}
                    </span>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section style={{ background: "rgba(0,0,0,0.015)", borderTop: "1px solid rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8" style={{ background: "var(--accent)" }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  People
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                The studio
              </h2>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>
              {profile.teamSize} people
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <Link
                key={member.id}
                to={`/designer/${member.slug}`}
                className="text-center group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-full rounded-xl overflow-hidden mb-4 transition-all"
                  style={{
                    aspectRatio: "1/1",
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="transition-colors"
                  style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.005em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                >
                  {member.name}
                </p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {member.role}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RECOGNITION ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Award, label: "Recognition", value: `${Math.max(3, Math.floor(profile.yearsExp / 3))} awards` },
            { icon: Star, label: "Client rating", value: profile.rating.toFixed(1) },
            { icon: Users, label: "Reviewed by", value: `${profile.reviewCount} clients` },
            { icon: Layers, label: "Disciplines", value: `${offerings.length} practice areas` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <stat.icon className="w-5 h-5 mb-4" style={{ color: "var(--accent)" }} />
              <p
                style={{
                  fontSize: "1.65rem",
                  fontWeight: 300,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.015em",
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-20"
      >
        <div
          className="rounded-2xl p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          }}
        >
          <img
            src={profile.heroImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.12, mixBlendMode: "luminosity" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(31,41,55,0.92) 0%, rgba(17,24,39,0.88) 100%)",
            }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: "var(--accent)" }} />

          <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "var(--accent)" }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Get in touch
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 300,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 14,
                }}
              >
                Start a conversation.
              </h2>
              <p style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.65, maxWidth: 520 }}>
                For new commissions, collaborations, or press enquiries — we'd love to hear from you.
              </p>

              <div className="flex items-center gap-3 mt-8 flex-wrap">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    background: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  <Mail className="w-4 h-4" /> Write to the studio
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <Phone className="w-4 h-4" /> Schedule a call
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
                  Studio
                </p>
                <p style={{ fontSize: "0.9rem", color: "#fff" }}>
                  {profile.city}, {profile.state}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
                  Social
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ALSO OF NOTE ══ */}
      {alsoOfNote.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8" style={{ background: "var(--accent)" }} />
            <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Also of note
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {alsoOfNote.map((p) => (
              <Link
                key={p.id}
                to={`/services/consultant/${p.slug}`}
                className="group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl mb-4"
                  style={{
                    aspectRatio: "4/3",
                    background: "rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                  {p.typeName}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)", letterSpacing: "-0.005em" }}>
                  {p.name}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>
                  {p.city} · {p.projectCount} projects
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
