import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, MapPin, Globe, Users, GraduationCap,
  CheckCircle, Star, BookOpen, ExternalLink, Award, Calendar,
} from "lucide-react";
import {
  getInstitute,
  getCoursesForInstitute,
  getFacultyForInstitute,
  getInstituteLogo,
} from "../data/instituteCatalogData";
import { AvatarImg } from "../ui/AvatarImg";

const LINE = "1px solid #F2F4F7";

export function InstituteMicrositePage() {
  const { instituteId } = useParams<{ instituteId: string }>();
  const inst = getInstitute(instituteId ?? "");
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "faculty">("overview");

  if (!inst) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF9" }}>
        <div className="text-center">
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "#101828" }}>Institute not found</p>
          <Link to="/courses" style={{ fontSize: "0.82rem", color: "#FF6A3D", fontWeight: 600 }}>← Back to Courses</Link>
        </div>
      </div>
    );
  }

  const courses = getCoursesForInstitute(inst.id);
  const faculty = getFacultyForInstitute(inst.id);
  const logoUrl = getInstituteLogo(inst, 200);

  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "courses", label: `Courses (${courses.length})` },
    { key: "faculty", label: `Faculty (${faculty.length})` },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF9" }}>

      {/* Hero */}
      <div className="relative" style={{ height: 340, overflow: "hidden" }}>
        <img
          src={inst.heroImage}
          alt={inst.name}
          className="w-full h-full object-cover"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 mb-5"
            style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}
          >
            <ArrowLeft className="w-3 h-3" /> Courses
          </Link>
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: "white", border: "2px solid rgba(255,255,255,0.3)" }}>
              <img src={logoUrl} alt={inst.shortName} className="w-full h-full object-contain p-1.5" />
            </div>
            <div>
              {inst.rankingTag && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2" style={{ background: "rgba(255,106,61,0.18)", color: "#FF6A3D", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", backdropFilter: "blur(4px)" }}>
                  <Award className="w-2.5 h-2.5" /> {inst.rankingTag}
                </span>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  {inst.name}
                </h1>
                {inst.isVerified && <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#60A5FA" }} />}
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)" }}>
                  <MapPin className="w-3 h-3" /> {inst.city}, {inst.country}
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>·</span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)" }}>
                  <Calendar className="w-3 h-3" /> Est. {inst.foundedYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "white", borderBottom: LINE }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-8 py-4 flex-wrap">
            <div className="text-center">
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#101828" }}>{courses.length}</p>
              <p style={{ fontSize: "0.65rem", color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Courses</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#F2F4F7" }} />
            <div className="text-center">
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#101828" }}>{faculty.length}</p>
              <p style={{ fontSize: "0.65rem", color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Faculty</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#F2F4F7" }} />
            <div className="text-center">
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#101828" }}>{(inst.studentCount / 1000).toFixed(1)}k</p>
              <p style={{ fontSize: "0.65rem", color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Students</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#F2F4F7" }} />
            <div className="text-center">
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#101828" }}>{(inst.alumniCount / 1000).toFixed(0)}k+</p>
              <p style={{ fontSize: "0.65rem", color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Alumni</p>
            </div>
            <div className="ml-auto">
              <a
                href={inst.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg"
                style={{ background: "#FF6A3D", color: "white", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}
              >
                <Globe className="w-3.5 h-3.5" /> Visit Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: "white", borderBottom: LINE, position: "sticky", top: 0, zIndex: 20 }}>
        <div className="max-w-5xl mx-auto px-6 flex gap-0">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-5 py-3 text-[12px] font-semibold transition-colors uppercase tracking-wide"
              style={{
                color: activeTab === t.key ? "#101828" : "#98A2B3",
                borderBottom: activeTab === t.key ? "2px solid #FF6A3D" : "2px solid transparent",
                marginBottom: -1,
                background: "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="flex gap-10 items-start">
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#FF6A3D", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>About</p>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#344054", marginBottom: 32 }}>{inst.description}</p>

              {/* Specialisations */}
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#FF6A3D", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Specialisations</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {inst.specialisations.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#344054", background: "white", border: LINE }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Accreditation */}
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#FF6A3D", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Accreditation & Recognition</p>
              <div className="flex flex-col gap-2 mb-10">
                {inst.accreditation.map(a => (
                  <div key={a} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#16B364" }} />
                    <span style={{ fontSize: "0.82rem", color: "#344054" }}>{a}</span>
                  </div>
                ))}
              </div>

              {/* Campus image */}
              <img
                src={inst.campusImage}
                alt={`${inst.shortName} campus`}
                className="w-full rounded-xl"
                style={{ height: 280, objectFit: "cover" }}
              />
            </div>

            {/* Sidebar card */}
            <div style={{ width: 260, flexShrink: 0 }}>
              <div className="rounded-2xl p-6" style={{ background: "white", border: LINE }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Quick Info</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#FF6A3D" }} />
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "#98A2B3", fontWeight: 600 }}>Location</p>
                      <p style={{ fontSize: "0.82rem", color: "#101828", fontWeight: 600 }}>{inst.city}, {inst.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: "#FF6A3D" }} />
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "#98A2B3", fontWeight: 600 }}>Founded</p>
                      <p style={{ fontSize: "0.82rem", color: "#101828", fontWeight: 600 }}>{inst.foundedYear}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 flex-shrink-0" style={{ color: "#FF6A3D" }} />
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "#98A2B3", fontWeight: 600 }}>Students</p>
                      <p style={{ fontSize: "0.82rem", color: "#101828", fontWeight: 600 }}>{inst.studentCount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: "#FF6A3D" }} />
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "#98A2B3", fontWeight: 600 }}>Alumni</p>
                      <p style={{ fontSize: "0.82rem", color: "#101828", fontWeight: 600 }}>{inst.alumniCount.toLocaleString()}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 flex-shrink-0" style={{ color: "#FF6A3D" }} />
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "#98A2B3", fontWeight: 600 }}>Website</p>
                      <a href={inst.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "#FF6A3D", fontWeight: 600, textDecoration: "none" }}>
                        {inst.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full mt-6 py-2.5 rounded-xl"
                  style={{ background: "#0F172A", color: "white", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}
                >
                  <Globe className="w-3.5 h-3.5" /> Open Official Website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <div>
            {courses.length === 0 ? (
              <p style={{ color: "#98A2B3", fontSize: "0.88rem" }}>No courses listed yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(c => (
                  <div key={c.id} className="rounded-2xl overflow-hidden" style={{ background: "white", border: LINE }}>
                    {c.coverImage && (
                      <img src={c.coverImage} alt={c.title} className="w-full" style={{ height: 160, objectFit: "cover" }} />
                    )}
                    <div style={{ padding: "18px 20px" }}>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: inst.brandColor, background: `${inst.brandColor}14` }}>
                          {c.level}
                        </span>
                        <span style={{ fontSize: "0.65rem", color: "#98A2B3" }}>{c.studyMode}</span>
                      </div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#101828", lineHeight: 1.3, marginBottom: 6 }}>{c.title}</p>
                      <p className="line-clamp-2" style={{ fontSize: "0.78rem", color: "#667085", lineHeight: 1.55, marginBottom: 12 }}>{c.shortDescription}</p>
                      <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: "0.7rem", color: "#667085" }}>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.durationLabel}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3" style={{ fill: "#FF6A3D", color: "#FF6A3D" }} />{c.rating}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.enrolled} enrolled</span>
                        <span className="ml-auto font-semibold" style={{ color: "#101828" }}>{c.feeLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FACULTY */}
        {activeTab === "faculty" && (
          <div>
            {faculty.length === 0 ? (
              <p style={{ color: "#98A2B3", fontSize: "0.88rem" }}>No faculty listed yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faculty.map(f => (
                  <div key={f.id} className="rounded-2xl p-5" style={{ background: "white", border: LINE }}>
                    <div className="flex gap-3 items-start">
                      <AvatarImg
                        fallback={f.initials}
                        size={48}
                        borderStyle="none"
                        style={{ borderRadius: "50%", flexShrink: 0, background: f.color, color: "white", fontWeight: 800, fontSize: "0.85rem" }}
                      />
                      <div className="min-w-0">
                        <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#101828" }}>{f.name}</p>
                        <p style={{ fontSize: "0.72rem", color: "#667085", marginBottom: 8 }}>{f.title}</p>
                        <p className="line-clamp-2" style={{ fontSize: "0.78rem", color: "#344054", lineHeight: 1.6, marginBottom: 10 }}>{f.bio}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {f.expertise.slice(0, 3).map(e => (
                            <span key={e} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 600, color: "#667085", background: "#F9FAFB", border: "1px solid #F2F4F7" }}>
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
