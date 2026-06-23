import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  MapPin, Globe, Linkedin, Instagram, Eye, Heart,
  GraduationCap, Award, Briefcase, BookOpen,
  ExternalLink, Share2, UserPlus, CheckCircle2,
  LayoutDashboard, ChevronLeft,
} from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

const STUDENT_PROFILE = {
  id: "priya-mehta",
  name: "Priya Mehta",
  initials: "PM",
  headline: "B.Arch Student · Interior Design Enthusiast · RICS SBE '27",
  institute: "RICS School of Built Environment, Noida",
  year: "4th Year",
  location: "Noida, Uttar Pradesh",
  email: "priya.mehta@student.rics.edu.in",
  linkedin: "linkedin.com/in/priya-mehta-arch",
  behance: "behance.net/priyamehta",
  instagram: "@priya.designs",
  bio: "4th year B.Arch student at RICS School of Built Environment, passionate about sustainable interior design and material innovation. Exploring the intersection of regional craft traditions and contemporary space-making. Actively seeking internship and placement opportunities in Mumbai and Delhi.",
  skills: ["AutoCAD", "SketchUp", "Adobe Photoshop", "Hand Sketching", "Space Planning", "Revit (Basic)", "InDesign", "Model Making"],
  stats: { projects: 8, profileViews: 320, connections: 84, endorsements: 12 },
  openTo: ["Internships", "Placements", "Freelance Projects", "Competitions"],
};

const STUDENT_WORKS = [
  {
    id: "sw1",
    title: "Community Learning Hub — Noida",
    type: "Thesis Project",
    year: "2025",
    institute: "RICS SBE",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
    description: "A 4,200 sq ft community library and maker-space for a mixed-income neighbourhood — integrating passive cooling, natural light, and flexible learning zones.",
    tags: ["Institutional", "Sustainable", "Community"],
    views: 148,
    likes: 22,
    isPublic: true,
  },
  {
    id: "sw2",
    title: "Biophilic Office Redesign",
    type: "Studio Project",
    year: "2024",
    institute: "RICS SBE",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    description: "A speculative redesign of a 2,000 sq ft co-working floor using biophilic principles — living walls, circadian lighting, and material honesty.",
    tags: ["Commercial", "Biophilic", "Co-working"],
    views: 97,
    likes: 14,
    isPublic: true,
  },
  {
    id: "sw3",
    title: "Studio Sangam — Residential Interiors",
    type: "Internship Work",
    year: "2025",
    institute: "Studio Sangam, Ahmedabad",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    description: "Contributed to documentation, material boards, and 3D renders for two residential projects during a 3-month internship at Studio Sangam.",
    tags: ["Residential", "Internship", "3D Renders"],
    views: 74,
    likes: 9,
    isPublic: true,
  },
  {
    id: "sw4",
    title: "FutureSpace Student Competition",
    type: "Competition Entry",
    year: "2024",
    institute: "CII Competition",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    description: "A speculative housing cluster designed for climate resilience in coastal Odisha — shortlisted in the national round of the FutureSpace Student Design Challenge.",
    tags: ["Residential", "Climate", "Competition"],
    views: 61,
    likes: 8,
    isPublic: true,
  },
];

const EDUCATION = [
  { degree: "B.Arch (4th Year, ongoing)", institution: "RICS School of Built Environment, Noida", year: "2022 – 2027 (Expected)" },
  { degree: "Class XII — Science (PCM)", institution: "Delhi Public School, Noida", year: "2022" },
];

const EXPERIENCE = [
  { role: "Design Intern", company: "Studio Sangam, Ahmedabad", duration: "May – Jul 2025", desc: "Assisted in documentation, 3D visualisation, and material specification for residential and hospitality projects." },
];

const CERTIFICATIONS = [
  { name: "Introduction to Sustainable Design", issuer: "Coursera / IIT Bombay", year: "2024", color: "#10b981" },
  { name: "AutoCAD Essentials", issuer: "Autodesk", year: "2023", color: "#3b82f6" },
];

const WORK_TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  "Thesis Project":     { bg: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT },
  "Studio Project":     { bg: "rgba(16,185,129,0.1)",    color: "#10b981" },
  "Internship Work":    { bg: "rgba(245,158,11,0.1)",    color: "#d97706" },
  "Competition Entry":  { bg: "rgba(236,72,153,0.1)",    color: "#ec4899" },
};

function SectionCard({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
    >
      <div
        className="flex items-center gap-2.5 mb-5"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "1rem" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
        >
          <Icon style={{ color: ACCENT, width: 16, height: 16 }} />
        </div>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function StudentPublicProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const authUser = getAuthUser();
  const isPriya = !studentId || studentId === STUDENT_PROFILE.id;
  const isOwnProfile = authUser?.id === STUDENT_PROFILE.id;

  const [worksCategory, setWorksCategory] = useState("All");
  const WORK_TYPES = ["All", "Thesis Project", "Studio Project", "Internship Work", "Competition Entry"];
  const filteredWorks = worksCategory === "All" ? STUDENT_WORKS : STUDENT_WORKS.filter(w => w.type === worksCategory);

  if (!isPriya) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p style={{ color: "var(--text-muted)" }}>Profile not found.</p>
        <Link to="/" className="mt-3 text-sm font-semibold" style={{ color: ACCENT }}>← Go home</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.08) 0%, rgba(${ACCENT_RGB},0.02) 100%)`,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {isOwnProfile && (
            <div className="mb-6 flex items-center gap-3">
              <Link
                to="/u"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
              >
                <LayoutDashboard style={{ width: 13, height: 13 }} />
                My Dashboard
              </Link>
              <Link
                to="/u/profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
              >
                Edit Profile
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)`, boxShadow: `0 8px 32px rgba(${ACCENT_RGB},0.3)` }}
            >
              {STUDENT_PROFILE.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                    {STUDENT_PROFILE.name}
                  </h1>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: 4 }}>
                    {STUDENT_PROFILE.headline}
                  </p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <span className="flex items-center gap-1.5" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      <GraduationCap style={{ width: 14, height: 14 }} />
                      {STUDENT_PROFILE.institute} · {STUDENT_PROFILE.year}
                    </span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      <MapPin style={{ width: 14, height: 14 }} />
                      {STUDENT_PROFILE.location}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {!isOwnProfile && (
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ background: ACCENT, boxShadow: `0 4px 12px rgba(${ACCENT_RGB},0.3)` }}
                    >
                      <UserPlus style={{ width: 15, height: 15 }} /> Connect
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-secondary)" }}
                    >
                      <Share2 style={{ width: 15, height: 15 }} /> Share
                    </button>
                  </div>
                )}
              </div>

              {/* Open to */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>Open to:</span>
                {STUDENT_PROFILE.openTo.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-8 grid grid-cols-4 gap-4 rounded-2xl p-4"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            {[
              { label: "Projects", value: STUDENT_PROFILE.stats.projects },
              { label: "Profile Views", value: STUDENT_PROFILE.stats.profileViews },
              { label: "Connections", value: STUDENT_PROFILE.stats.connections },
              { label: "Endorsements", value: STUDENT_PROFILE.stats.endorsements },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: ACCENT }}>{value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-5">
            {STUDENT_PROFILE.linkedin && (
              <a
                href={`https://${STUDENT_PROFILE.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold transition-all"
                style={{ color: "#0a66c2" }}
              >
                <Linkedin style={{ width: 14, height: 14 }} />
                LinkedIn
              </a>
            )}
            {STUDENT_PROFILE.behance && (
              <a
                href={`https://${STUDENT_PROFILE.behance}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold transition-all"
                style={{ color: "#0057ff" }}
              >
                <Globe style={{ width: 14, height: 14 }} />
                Behance
              </a>
            )}
            {STUDENT_PROFILE.instagram && (
              <a
                href={`https://instagram.com/${STUDENT_PROFILE.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#e1306c" }}
              >
                <Instagram style={{ width: 14, height: 14 }} />
                {STUDENT_PROFILE.instagram}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* About */}
        <SectionCard title="About" icon={BookOpen}>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            {STUDENT_PROFILE.bio}
          </p>

          {/* Skills */}
          <div className="mt-5">
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
              Skills & Tools
            </div>
            <div className="flex flex-wrap gap-2">
              {STUDENT_PROFILE.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Works */}
        <SectionCard title="Portfolio & Projects" icon={Eye}>
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {WORK_TYPES.map((cat) => (
              <button
                key={cat}
                onClick={() => setWorksCategory(cat)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: worksCategory === cat ? ACCENT : "rgba(0,0,0,0.04)",
                  color: worksCategory === cat ? "white" : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWorks.map((work) => {
              const typeStyle = WORK_TYPE_STYLE[work.type] ?? { bg: "rgba(0,0,0,0.06)", color: "var(--text-muted)" };
              return (
                <div
                  key={work.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="h-36 relative" style={{ background: work.gradient }}>
                    <div className="absolute inset-0 flex items-end p-3">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
                      >
                        {work.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-4" style={{ background: "white" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {work.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {work.institute} · {work.year}
                    </div>
                    <p className="mt-2 line-clamp-2" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {work.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <Eye style={{ width: 13, height: 13 }} />{work.views}
                      </span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <Heart style={{ width: 13, height: 13 }} />{work.likes}
                      </span>
                      <div className="flex gap-1.5 ml-auto">
                        {work.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold"
                            style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Education */}
        <SectionCard title="Education" icon={GraduationCap}>
          <div className="space-y-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                >
                  <GraduationCap style={{ width: 18, height: 18, color: ACCENT }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>
                    {edu.institution}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {edu.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard title="Internships & Experience" icon={Briefcase}>
          <div className="space-y-4">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)" }}
                >
                  <Briefcase style={{ width: 18, height: 18, color: "#f59e0b" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>
                    {exp.company}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {exp.duration}
                  </div>
                  <p className="mt-2" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Certifications */}
        <SectionCard title="Certifications" icon={Award}>
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cert.color}18` }}
                >
                  <CheckCircle2 style={{ width: 16, height: 16, color: cert.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {cert.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 1 }}>
                    {cert.issuer} · {cert.year}
                  </div>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                  style={{ background: `${cert.color}18`, color: cert.color }}
                >
                  Certified
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
