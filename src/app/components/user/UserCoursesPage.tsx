import { useState } from "react";
import {
  Search, GraduationCap, Clock, Users, Star, ChevronRight,
  Play, Award, Download, Share2, ExternalLink, X, CheckCircle,
  BookOpen, IndianRupee, Filter
} from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

/* ── Mock Data ──────────────────────────────────────────────────────── */

type EnrolledCourse = {
  id: number;
  title: string;
  provider: string;
  progress: number;
  modulesCompleted: number;
  totalModules: number;
  thumbnail: string;
  completed: boolean;
};

type BrowseCourse = {
  id: number;
  title: string;
  creator: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  rating: number;
  enrolled: number;
  category: string;
  description: string;
  modules: { title: string; duration: string }[];
  thumbnail: string;
};

type Certificate = {
  id: number;
  courseName: string;
  issuer: string;
  completionDate: string;
  certificateId: string;
};

const enrolledCourses: EnrolledCourse[] = [
  {
    id: 1, title: "Green Building Certification (GRIHA)", provider: "EcoDesign Academy",
    progress: 65, modulesCompleted: 8, totalModules: 12, thumbnail: "linear-gradient(135deg, #10b981, #059669)", completed: false,
  },
  {
    id: 2, title: "Advanced Revit for Architecture", provider: "BuildSkill Pro",
    progress: 30, modulesCompleted: 3, totalModules: 10, thumbnail: "linear-gradient(135deg, #3b82f6, #1d4ed8)", completed: false,
  },
  {
    id: 3, title: "Fundamentals of Vastu Shastra", provider: "Heritage Design Institute",
    progress: 100, modulesCompleted: 6, totalModules: 6, thumbnail: "linear-gradient(135deg, #f59e0b, #d97706)", completed: true,
  },
];

const browseCourses: BrowseCourse[] = [
  {
    id: 101, title: "Sustainable Materials for Modern Construction", creator: "GreenBuild Associates",
    duration: "8 weeks", level: "Intermediate", price: "4,999", rating: 4.7, enrolled: 1240,
    category: "Sustainability", thumbnail: "linear-gradient(135deg, #10b981, #059669)",
    description: "Learn to select and specify sustainable building materials. Covers lifecycle analysis, embodied carbon, and green certifications for Indian construction.",
    modules: [
      { title: "Introduction to Sustainable Materials", duration: "45 min" },
      { title: "Lifecycle Assessment (LCA) Basics", duration: "1 hr" },
      { title: "Low-Carbon Cement & Concrete", duration: "1.5 hr" },
      { title: "Sustainable Timber & Bamboo", duration: "1 hr" },
      { title: "Recycled & Reclaimed Materials", duration: "1 hr" },
      { title: "Green Certifications (GRIHA/LEED)", duration: "1.5 hr" },
      { title: "Material Specifications & Documentation", duration: "1 hr" },
      { title: "Capstone Project", duration: "2 hr" },
    ],
  },
  {
    id: 102, title: "AutoCAD Mastery for Architects", creator: "SkillForge India",
    duration: "6 weeks", level: "Beginner", price: "Free", rating: 4.5, enrolled: 3450,
    category: "Software", thumbnail: "linear-gradient(135deg, #ef4444, #dc2626)",
    description: "Complete AutoCAD training from basics to advanced drafting. Industry-standard workflows for architectural drawings and construction documentation.",
    modules: [
      { title: "Interface & Setup", duration: "30 min" },
      { title: "Basic Drawing Tools", duration: "1 hr" },
      { title: "Layers & Organization", duration: "45 min" },
      { title: "Dimensioning & Annotation", duration: "1 hr" },
      { title: "Blocks & Templates", duration: "1 hr" },
      { title: "Plotting & Publishing", duration: "45 min" },
    ],
  },
  {
    id: 103, title: "BIM Management & Coordination", creator: "Archi+Tech Solutions",
    duration: "10 weeks", level: "Advanced", price: "7,499", rating: 4.8, enrolled: 680,
    category: "Technology", thumbnail: "linear-gradient(135deg, #a855f7, #7c3aed)",
    description: "Master BIM coordination for large-scale projects. Learn clash detection, model federation, and BIM execution planning.",
    modules: [
      { title: "BIM Fundamentals & Standards", duration: "1 hr" },
      { title: "Revit Advanced Modeling", duration: "2 hr" },
      { title: "Model Federation (Navisworks)", duration: "1.5 hr" },
      { title: "Clash Detection & Resolution", duration: "1.5 hr" },
      { title: "BIM Execution Plan (BEP)", duration: "1 hr" },
      { title: "4D & 5D BIM", duration: "1.5 hr" },
      { title: "Collaboration & Cloud Workflows", duration: "1 hr" },
      { title: "Case Studies: Indian Infrastructure", duration: "2 hr" },
      { title: "Advanced Dynamo Scripting", duration: "1.5 hr" },
      { title: "Final Assessment", duration: "2 hr" },
    ],
  },
  {
    id: 104, title: "Indian Vernacular Architecture", creator: "Heritage Design Institute",
    duration: "4 weeks", level: "Beginner", price: "2,499", rating: 4.6, enrolled: 920,
    category: "Design", thumbnail: "linear-gradient(135deg, #f59e0b, #d97706)",
    description: "Explore the rich diversity of Indian regional architecture from Kerala to Kashmir. Understand climate-responsive design wisdom from traditional builders.",
    modules: [
      { title: "Climate & Architecture in India", duration: "1 hr" },
      { title: "South Indian Temple Architecture", duration: "1.5 hr" },
      { title: "Rajasthani Havelis & Desert Architecture", duration: "1 hr" },
      { title: "Vernacular Materials & Techniques", duration: "1.5 hr" },
    ],
  },
  {
    id: 105, title: "Construction Project Management", creator: "BuildCorp Academy",
    duration: "8 weeks", level: "Intermediate", price: "5,999", rating: 4.4, enrolled: 1560,
    category: "Management", thumbnail: "linear-gradient(135deg, #ec4899, #db2777)",
    description: "End-to-end project management for construction professionals. Covers scheduling, cost estimation, risk management, and Indian regulatory compliance.",
    modules: [
      { title: "Project Initiation & Planning", duration: "1 hr" },
      { title: "Scheduling with Primavera/MS Project", duration: "1.5 hr" },
      { title: "Cost Estimation (IS Standards)", duration: "1.5 hr" },
      { title: "Quality Management", duration: "1 hr" },
      { title: "Risk & Safety Management", duration: "1 hr" },
      { title: "Contract Administration", duration: "1 hr" },
      { title: "Indian Regulatory Compliance", duration: "1 hr" },
      { title: "Final Project", duration: "2 hr" },
    ],
  },
  {
    id: 106, title: "Parametric Design with Grasshopper", creator: "DigiFab Studio",
    duration: "6 weeks", level: "Advanced", price: "6,999", rating: 4.9, enrolled: 420,
    category: "Software", thumbnail: "linear-gradient(135deg, #6366f1, #4f46e5)",
    description: "Unlock computational design with Grasshopper for Rhino. Create complex parametric facades, structures, and environmental analysis tools.",
    modules: [
      { title: "Grasshopper Fundamentals", duration: "1 hr" },
      { title: "Data Trees & Lists", duration: "1.5 hr" },
      { title: "Surface & Mesh Operations", duration: "1.5 hr" },
      { title: "Parametric Facades", duration: "2 hr" },
      { title: "Environmental Analysis Plugins", duration: "1.5 hr" },
      { title: "Fabrication & Output", duration: "1 hr" },
    ],
  },
];

const certificates: Certificate[] = [
  {
    id: 1,
    courseName: "Fundamentals of Vastu Shastra",
    issuer: "Heritage Design Institute",
    completionDate: "Feb 15, 2026",
    certificateId: "CERT-HDI-2026-0412",
  },
];

const LEVEL_COLORS = {
  Beginner: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  Intermediate: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  Advanced: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
};

const CATEGORIES = ["All", "Sustainability", "Software", "Technology", "Design", "Management"];

/* ── Main Component ────────────────────────────────────────────────── */

export function UserCoursesPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "learning" | "certificates">("learning");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailCourse, setDetailCourse] = useState<BrowseCourse | null>(null);

  const filteredBrowse = browseCourses
    .filter((c) => selectedCategory === "All" || c.category === selectedCategory)
    .filter((c) =>
      searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creator.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const tabs = [
    { key: "learning" as const, label: "My Learning", count: enrolledCourses.length },
    { key: "browse" as const, label: "Browse Courses", count: browseCourses.length },
    { key: "certificates" as const, label: "Certificates", count: certificates.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-5">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Learning & Development
        </h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            className="gl-input w-full pl-9"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.key ? "white" : "transparent",
              color: activeTab === tab.key ? ACCENT : "var(--text-secondary)",
              boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
            <span
              className="px-1.5 py-0.5 rounded-full"
              style={{
                background: activeTab === tab.key ? `rgba(${ACCENT_RGB},0.1)` : "rgba(0,0,0,0.06)",
                color: activeTab === tab.key ? ACCENT : "var(--text-muted)",
                fontSize: "0.65rem",
                fontWeight: 700,
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── My Learning Tab ───────────────────────────────────────── */}
      {activeTab === "learning" && (
        <div className="space-y-3">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl p-4 transition-all"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {/* Thumbnail */}
              <div
                className="w-full sm:w-44 h-28 sm:h-auto rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: course.thumbnail, minHeight: 90 }}
              >
                {course.completed ? (
                  <CheckCircle className="w-10 h-10 text-white/80" />
                ) : (
                  <Play className="w-10 h-10 text-white/80" />
                )}
              </div>
              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {course.title}
                    </h4>
                    {course.completed && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                      >
                        Completed
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    {course.provider} &middot; {course.modulesCompleted}/{course.totalModules} modules completed
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${course.progress}%`,
                          background: course.completed ? "#10b981" : ACCENT,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: course.completed ? "#10b981" : ACCENT, minWidth: 32, textAlign: "right" }}>
                      {course.progress}%
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: course.completed ? "rgba(16,185,129,0.1)" : `rgba(${ACCENT_RGB},0.1)`,
                      color: course.completed ? "#10b981" : ACCENT,
                    }}
                  >
                    {course.completed ? (
                      <>
                        <Award className="w-3.5 h-3.5" /> View Certificate
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Continue
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Browse Tab ────────────────────────────────────────────── */}
      {activeTab === "browse" && (
        <>
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: selectedCategory === cat ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                  color: selectedCategory === cat ? ACCENT : "var(--text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrowse.map((course) => {
              const levelStyle = LEVEL_COLORS[course.level];
              return (
                <div
                  key={course.id}
                  onClick={() => setDetailCourse(course)}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{ background: course.thumbnail }}
                  >
                    <BookOpen className="w-10 h-10 text-white/50" />
                  </div>
                  <div className="p-4">
                    <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 4 }}>
                      {course.title}
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                      {course.creator}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="flex items-center gap-0.5" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        <Clock className="w-3 h-3" /> {course.duration}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-medium"
                        style={{ background: levelStyle.bg, color: levelStyle.color }}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>{course.rating}</span>
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          ({course.enrolled.toLocaleString()} enrolled)
                        </span>
                      </div>
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: course.price === "Free" ? "#10b981" : ACCENT }}>
                        {course.price === "Free" ? "Free" : `\u20B9${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Certificates Tab ──────────────────────────────────────── */}
      {activeTab === "certificates" && (
        <div className="space-y-3">
          {certificates.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <Award className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>No certificates yet</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>
                Complete courses to earn certificates.
              </p>
            </div>
          ) : (
            certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                    >
                      <Award className="w-7 h-7" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {cert.courseName}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>
                        Issued by {cert.issuer}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          Completed {cert.completionDate}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          ID: {cert.certificateId}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: "rgba(0,119,181,0.1)", color: "#0077B5" }}
                    >
                      <Share2 className="w-3.5 h-3.5" /> LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Course Detail Modal ───────────────────────────────────── */}
      {detailCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setDetailCourse(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div
              className="h-40 flex items-center justify-center relative"
              style={{ background: detailCourse.thumbnail }}
            >
              <BookOpen className="w-14 h-14 text-white/40" />
              <button
                onClick={() => setDetailCourse(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6">
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
                {detailCourse.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  {detailCourse.creator}
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-medium" style={LEVEL_COLORS[detailCourse.level]}>
                  {detailCourse.level}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Clock className="w-3.5 h-3.5" /> {detailCourse.duration}
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Users className="w-3.5 h-3.5" /> {detailCourse.enrolled.toLocaleString()} enrolled
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.78rem" }}>
                  <Star className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{detailCourse.rating}</span>
                </span>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                {detailCourse.description}
              </p>

              {/* Modules */}
              <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                Course Modules ({detailCourse.modules.length})
              </h4>
              <div className="space-y-1.5 mb-6">
                {detailCourse.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg"
                    style={{ background: "rgba(0,0,0,0.03)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `rgba(${ACCENT_RGB},0.1)`, fontSize: "0.65rem", fontWeight: 700, color: ACCENT }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {mod.title}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{mod.duration}</span>
                  </div>
                ))}
              </div>

              {/* Enroll */}
              <div className="flex items-center gap-3">
                <button
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: ACCENT, boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)` }}
                >
                  Enroll Now {detailCourse.price !== "Free" && `\u2022 \u20B9${detailCourse.price}`}
                </button>
                {detailCourse.price === "Free" && (
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-bold"
                    style={{ color: "#10b981" }}
                  >
                    Free
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
