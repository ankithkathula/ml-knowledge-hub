import { useState } from "react";
import {
  Award, Building2, MapPin, Calendar, Clock, Users,
  ChevronRight, CheckCircle, XCircle, Search, Filter,
  FileText, Mic, BookOpen, Briefcase, Star, TrendingUp,
  IndianRupee, ArrowRight, AlertCircle, Target,
} from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";
const ORANGE = "#FF6A3D";

/* ── Types ──────────────────────────────────────────────────────────── */

type Drive = {
  id: number;
  company: string;
  initials: string;
  roles: string[];
  type: "On-Campus" | "Off-Campus" | "Pool Campus";
  ctc: string;
  location: string;
  deadline: string;
  daysLeft: number;
  eligibility: string;
  cgpa: number;
  batch: string;
  description: string;
  skills: string[];
  process: string[];
  applied: boolean;
};

type PlacementApp = {
  id: number;
  company: string;
  role: string;
  type: string;
  appliedDate: string;
  status: "Applied" | "Shortlisted" | "Aptitude" | "Interview" | "Offered" | "Rejected";
  rounds: { name: string; date: string; done: boolean; result?: "pass" | "fail" }[];
};

type PrepResource = {
  title: string;
  desc: string;
  icon: React.FC<{ style?: React.CSSProperties }>;
  color: string;
  bg: string;
  tag: string;
  cta: string;
};

/* ── Mock Data ──────────────────────────────────────────────────────── */

const drives: Drive[] = [
  {
    id: 1,
    company: "Morphogenesis",
    initials: "MG",
    roles: ["Architecture Intern", "Design Intern"],
    type: "On-Campus",
    ctc: "₹20,000/mo",
    location: "Gurgaon + Mumbai",
    deadline: "May 25, 2026",
    daysLeft: 11,
    eligibility: "4th & 5th year B.Arch",
    cgpa: 6.5,
    batch: "2026 & 2027 batch",
    description: "Morphogenesis is conducting a campus placement drive for architecture and design interns. You will work on live commercial and hospitality projects under senior architects.",
    skills: ["Revit", "AutoCAD", "Design Thinking", "Sketching"],
    process: ["Online Test", "Portfolio Review", "HR Interview"],
    applied: false,
  },
  {
    id: 2,
    company: "DesignCraft Studio",
    initials: "DC",
    roles: ["Junior Architect"],
    type: "On-Campus",
    ctc: "₹4–6 LPA",
    location: "Mumbai",
    deadline: "May 28, 2026",
    daysLeft: 14,
    eligibility: "Final year B.Arch / M.Arch",
    cgpa: 7.0,
    batch: "2026 batch",
    description: "DesignCraft is looking for fresh graduates to join their residential and commercial team. Strong design sensibility and Revit proficiency required.",
    skills: ["Revit", "SketchUp", "AutoCAD", "3D Visualization"],
    process: ["Portfolio Review", "Design Test", "Technical Interview", "HR Round"],
    applied: true,
  },
  {
    id: 3,
    company: "Morphogenesis",
    initials: "MG",
    roles: ["Architecture Intern"],
    type: "Off-Campus",
    ctc: "₹15,000/mo",
    location: "New Delhi",
    deadline: "Jun 3, 2026",
    daysLeft: 20,
    eligibility: "4th / 5th year B.Arch",
    cgpa: 7.5,
    batch: "2026 & 2027 batch",
    description: "Internship at one of India's most celebrated studios. Exposure to climate-responsive architecture and international projects. Portfolio-based shortlisting.",
    skills: ["Rhino", "Grasshopper", "Revit", "Research"],
    process: ["Portfolio Submission", "Design Challenge", "Interview"],
    applied: false,
  },
  {
    id: 4,
    company: "GreenBuild Associates",
    initials: "GB",
    roles: ["Sustainability Intern"],
    type: "Pool Campus",
    ctc: "₹18,000/mo",
    location: "Pune",
    deadline: "Jun 10, 2026",
    daysLeft: 27,
    eligibility: "Any year, GBCI/LEED interest",
    cgpa: 6.0,
    batch: "All batches",
    description: "India's leading green building consultancy invites students interested in sustainability. Training provided on GRIHA and LEED documentation.",
    skills: ["Energy Modeling", "LEED", "AutoCAD", "Excel"],
    process: ["Aptitude Test", "Case Study", "Interview"],
    applied: false,
  },
  {
    id: 5,
    company: "Asian Paints",
    initials: "AP",
    roles: ["Design Associate", "Colour Consultant"],
    type: "Pool Campus",
    ctc: "₹6–8 LPA",
    location: "Multiple Cities",
    deadline: "Jun 15, 2026",
    daysLeft: 32,
    eligibility: "B.Arch / B.Des graduates",
    cgpa: 6.5,
    batch: "2025 & 2026 batch",
    description: "Asian Paints Design Services is looking for passionate design graduates across India. You'll consult with homeowners and specifiers on design and colour.",
    skills: ["Colour Theory", "Client Facing", "AutoCAD", "Presentation"],
    process: ["Group Discussion", "Design Aptitude", "HR Interview"],
    applied: false,
  },
];

const applications: PlacementApp[] = [
  {
    id: 1,
    company: "DesignCraft Studio",
    role: "Junior Architect",
    type: "On-Campus",
    appliedDate: "May 14, 2026",
    status: "Shortlisted",
    rounds: [
      { name: "Portfolio Review", date: "May 14", done: true, result: "pass" },
      { name: "Design Test", date: "May 20", done: false },
      { name: "Technical Interview", date: "TBD", done: false },
      { name: "HR Round", date: "TBD", done: false },
    ],
  },
  {
    id: 2,
    company: "SpaceWorks India",
    role: "Design Intern",
    type: "Off-Campus",
    appliedDate: "May 8, 2026",
    status: "Interview",
    rounds: [
      { name: "Application", date: "May 8", done: true, result: "pass" },
      { name: "Portfolio Review", date: "May 11", done: true, result: "pass" },
      { name: "Design Round", date: "May 16", done: true, result: "pass" },
      { name: "Final Interview", date: "May 21", done: false },
    ],
  },
  {
    id: 3,
    company: "Studio Sangam",
    role: "Junior Architect",
    type: "Pool Campus",
    appliedDate: "Apr 30, 2026",
    status: "Rejected",
    rounds: [
      { name: "Application", date: "Apr 30", done: true, result: "pass" },
      { name: "Aptitude Test", date: "May 3", done: true, result: "fail" },
      { name: "Interview", date: "—", done: false },
    ],
  },
];

const prepResources: PrepResource[] = [
  {
    title: "Resume Builder",
    desc: "Create an ATS-friendly architecture resume with our guided template.",
    icon: FileText,
    color: ACCENT,
    bg: `rgba(${ACCENT_RGB},0.08)`,
    tag: "Tool",
    cta: "Build Resume",
  },
  {
    title: "Portfolio Review",
    desc: "Get expert feedback on your portfolio from industry professionals.",
    icon: Star,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    tag: "Mentorship",
    cta: "Request Review",
  },
  {
    title: "Mock Interview",
    desc: "Practice design and HR interview questions with AI and peer review.",
    icon: Mic,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    tag: "Practice",
    cta: "Start Practice",
  },
  {
    title: "Design Aptitude",
    desc: "Prepare for design aptitude tests with 200+ questions and case studies.",
    icon: BookOpen,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    tag: "Study",
    cta: "Start Prep",
  },
  {
    title: "Salary Benchmarks",
    desc: "Explore market salary data for fresh architects across cities and firms.",
    icon: IndianRupee,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    tag: "Insights",
    cta: "View Data",
  },
  {
    title: "Alumni Connect",
    desc: "Reach out to RICS SBE alumni placed in top studios for guidance.",
    icon: Users,
    color: ORANGE,
    bg: "rgba(255,106,61,0.08)",
    tag: "Network",
    cta: "Connect",
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Applied:     { bg: "rgba(59,130,246,0.1)",   color: "#3b82f6" },
  Shortlisted: { bg: "rgba(245,158,11,0.1)",   color: "#f59e0b" },
  Aptitude:    { bg: "rgba(168,85,247,0.1)",   color: "#a855f7" },
  Interview:   { bg: "rgba(99,102,241,0.1)",   color: ACCENT    },
  Offered:     { bg: "rgba(16,185,129,0.1)",   color: "#10b981" },
  Rejected:    { bg: "rgba(239,68,68,0.1)",    color: "#ef4444" },
};

const TYPE_STYLES: Record<string, { bg: string; color: string }> = {
  "On-Campus":   { bg: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT    },
  "Off-Campus":  { bg: "rgba(245,158,11,0.1)",    color: "#f59e0b" },
  "Pool Campus": { bg: "rgba(16,185,129,0.1)",    color: "#10b981" },
};

/* ── Main Component ──────────────────────────────────────────────────*/

export function UserPlacementsPage() {
  const [activeTab, setActiveTab] = useState<"drives" | "applications" | "prep">("drives");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedDriveId, setSelectedDriveId] = useState<number>(1);

  const appliedCount = drives.filter((d) => d.applied).length + applications.length;
  const offersCount = applications.filter((a) => a.status === "Offered").length;
  const interviewCount = applications.filter((a) => a.status === "Interview").length;

  const filteredDrives = drives
    .filter((d) => typeFilter === "All" || d.type === typeFilter)
    .filter(
      (d) =>
        searchQuery === "" ||
        d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.roles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const selectedDrive = drives.find((d) => d.id === selectedDriveId) ?? drives[0];

  const tabs = [
    { key: "drives" as const,       label: "Placement Drives",    count: drives.length  },
    { key: "applications" as const, label: "My Applications",     count: applications.length },
    { key: "prep" as const,         label: "Placement Prep",      count: prepResources.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-5">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Placements
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>
            Campus drives, applications tracker and prep resources
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            className="gl-input w-full pl-9"
            placeholder="Search companies, roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Placement Score",      value: "78/100", icon: Target,      color: ORANGE,    bg: "rgba(255,106,61,0.1)"  },
          { label: "Drives Applied",        value: String(appliedCount),   icon: Briefcase,  color: ACCENT,    bg: `rgba(${ACCENT_RGB},0.1)` },
          { label: "Interviews Scheduled",  value: String(interviewCount), icon: Calendar,   color: "#a855f7", bg: "rgba(168,85,247,0.1)"   },
          { label: "Offers Received",       value: String(offersCount),    icon: Award,      color: "#10b981", bg: "rgba(16,185,129,0.1)"   },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{ background: bg, border: `1px solid ${bg.replace("0.1", "0.2")}` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Icon style={{ width: 15, height: 15, color }} />
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 500 }}>
                {label}
              </span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl"
        style={{ background: "rgba(0,0,0,0.04)" }}
      >
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

      {/* ════════════════════════════════════════════════════════════
          TAB: Placement Drives
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "drives" && (
        <>
          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter style={{ width: 15, height: 15, color: "var(--text-muted)" }} />
            {["All", "On-Campus", "Off-Campus", "Pool Campus"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background:
                    typeFilter === t ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                  color: typeFilter === t ? ACCENT : "var(--text-secondary)",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4" style={{ minHeight: 500 }}>
            {/* Left — Drive list */}
            <div className="lg:col-span-2 space-y-2 overflow-y-auto" style={{ maxHeight: 640 }}>
              {filteredDrives.map((drive) => {
                const typeStyle = TYPE_STYLES[drive.type];
                const urgent = drive.daysLeft <= 14;
                return (
                  <div
                    key={drive.id}
                    onClick={() => setSelectedDriveId(drive.id)}
                    className="p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      background:
                        selectedDriveId === drive.id
                          ? `rgba(${ACCENT_RGB},0.06)`
                          : "rgba(255,255,255,0.8)",
                      border:
                        selectedDriveId === drive.id
                          ? `1px solid rgba(${ACCENT_RGB},0.2)`
                          : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)` }}
                      >
                        {drive.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}
                          >
                            {drive.company}
                          </span>
                          {drive.applied && (
                            <span
                              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}
                            >
                              Applied
                            </span>
                          )}
                        </div>
                        <div
                          style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 1 }}
                        >
                          {drive.roles.join(" · ")}
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                            style={typeStyle}
                          >
                            {drive.type}
                          </span>
                          <span
                            className="flex items-center gap-0.5"
                            style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                          >
                            <IndianRupee style={{ width: 10, height: 10 }} /> {drive.ctc}
                          </span>
                          <span
                            className="flex items-center gap-0.5"
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              color: urgent ? "#ef4444" : "var(--text-muted)",
                            }}
                          >
                            <Clock style={{ width: 10, height: 10 }} /> {drive.daysLeft}d left
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right — Drive detail */}
            <div
              className="lg:col-span-3 rounded-2xl p-6 overflow-y-auto hidden lg:block"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(0,0,0,0.06)",
                maxHeight: 640,
              }}
            >
              {/* Company header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)` }}
                >
                  {selectedDrive.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}
                  >
                    {selectedDrive.company}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 2 }}>
                    {selectedDrive.roles.join(" · ")}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-semibold"
                      style={TYPE_STYLES[selectedDrive.type]}
                    >
                      {selectedDrive.type}
                    </span>
                    <span
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                    >
                      {selectedDrive.batch}
                    </span>
                  </div>
                </div>
                {selectedDrive.daysLeft <= 14 && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                  >
                    <AlertCircle style={{ width: 13, height: 13 }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                      {selectedDrive.daysLeft}d left
                    </span>
                  </div>
                )}
              </div>

              {/* Meta chips */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: IndianRupee, label: "CTC / Stipend", value: selectedDrive.ctc },
                  { icon: MapPin,      label: "Location",       value: selectedDrive.location },
                  { icon: Calendar,   label: "Deadline",       value: selectedDrive.deadline },
                  { icon: TrendingUp, label: "Min CGPA",        value: `${selectedDrive.cgpa}+` },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 p-3 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.03)" }}
                  >
                    <Icon style={{ width: 15, height: 15, color: ACCENT, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4
                  style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}
                >
                  About the Drive
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {selectedDrive.description}
                </p>
              </div>

              {/* Eligibility */}
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-xl mb-4"
                style={{ background: `rgba(${ACCENT_RGB},0.05)`, border: `1px solid rgba(${ACCENT_RGB},0.12)` }}
              >
                <AlertCircle style={{ width: 15, height: 15, color: ACCENT, flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT }}>
                    Eligibility Criteria
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>
                    {selectedDrive.eligibility} · Min CGPA {selectedDrive.cgpa} · {selectedDrive.batch}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}
                >
                  Skills Required
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedDrive.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selection process */}
              <div className="mb-5">
                <h4
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}
                >
                  Selection Process
                </h4>
                <div className="flex items-center gap-0 overflow-x-auto">
                  {selectedDrive.process.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: ACCENT }}
                        >
                          {idx + 1}
                        </div>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            color: "var(--text-secondary)",
                            marginTop: 4,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {step}
                        </span>
                      </div>
                      {idx < selectedDrive.process.length - 1 && (
                        <div
                          className="h-0.5 mx-2"
                          style={{ width: 32, background: `rgba(${ACCENT_RGB},0.2)`, marginBottom: 18 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {selectedDrive.applied ? (
                  <div
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                  >
                    <CheckCircle style={{ width: 16, height: 16 }} /> Already Applied
                  </div>
                ) : (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: ACCENT,
                      boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)`,
                    }}
                  >
                    <Briefcase style={{ width: 16, height: 16 }} /> Apply Now
                  </button>
                )}
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                >
                  <Building2 style={{ width: 16, height: 16 }} /> Company Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════
          TAB: My Applications
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Briefcase
                style={{ width: 40, height: 40, color: "var(--text-muted)", margin: "0 auto 12px" }}
              />
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                No applications yet
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>
                Apply to placement drives to track your progress here.
              </p>
            </div>
          ) : (
            applications.map((app) => {
              const statusStyle = STATUS_STYLES[app.status] ?? STATUS_STYLES.Applied;
              const typeStyle = TYPE_STYLES[app.type as keyof typeof TYPE_STYLES] ?? TYPE_STYLES["On-Campus"];
              return (
                <div
                  key={app.id}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}
                        >
                          {app.company}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: statusStyle.bg, color: statusStyle.color }}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          {app.role}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                          style={typeStyle}
                        >
                          {app.type}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          Applied {app.appliedDate}
                        </span>
                      </div>
                    </div>
                    {app.status === "Interview" && (
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0"
                        style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                      >
                        <Calendar style={{ width: 13, height: 13 }} /> Prep for Interview
                      </button>
                    )}
                    {app.status === "Offered" && (
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "#10b981" }}
                      >
                        <CheckCircle style={{ width: 13, height: 13 }} /> Accept Offer
                      </button>
                    )}
                  </div>

                  {/* Round timeline */}
                  <div className="flex items-start gap-0 overflow-x-auto pb-1">
                    {app.rounds.map((round, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex flex-col items-center min-w-[72px]">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: round.done
                                ? round.result === "fail"
                                  ? "#ef4444"
                                  : ACCENT
                                : "rgba(0,0,0,0.08)",
                            }}
                          >
                            {round.done ? (
                              round.result === "fail" ? (
                                <XCircle style={{ width: 16, height: 16, color: "white" }} />
                              ) : (
                                <CheckCircle style={{ width: 16, height: 16, color: "white" }} />
                              )
                            ) : (
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: "rgba(0,0,0,0.2)" }}
                              />
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: round.done ? 700 : 400,
                              color: round.done ? "var(--text-primary)" : "var(--text-muted)",
                              marginTop: 5,
                              textAlign: "center",
                              lineHeight: 1.3,
                            }}
                          >
                            {round.name}
                          </span>
                          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 2 }}>
                            {round.date}
                          </span>
                        </div>
                        {idx < app.rounds.length - 1 && (
                          <div
                            className="h-0.5 flex-shrink-0"
                            style={{
                              width: 36,
                              marginTop: 16,
                              background: round.done
                                ? round.result === "fail"
                                  ? "#ef4444"
                                  : ACCENT
                                : "rgba(0,0,0,0.1)",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          TAB: Placement Prep
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "prep" && (
        <div className="space-y-5">
          {/* Readiness banner */}
          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-5"
            style={{ background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.08), rgba(168,85,247,0.06))`, border: `1px solid rgba(${ACCENT_RGB},0.12)` }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Target style={{ width: 16, height: 16, color: ACCENT }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Interview Readiness
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                You're 78% ready for placement interviews.
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4, lineHeight: 1.5 }}>
                Complete your portfolio review and mock interview to reach 100%.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="32" cy="32" r="26" fill="none" stroke={`rgba(${ACCENT_RGB},0.15)`} strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${0.78 * 2 * Math.PI * 26} ${2 * Math.PI * 26}`}
                  />
                </svg>
              </div>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: ACCENT }}>78%</span>
            </div>
          </div>

          {/* Prep resource cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prepResources.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={res.title}
                  className="rounded-2xl p-5 transition-all hover:shadow-md hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: res.bg }}
                    >
                      <Icon style={{ width: 22, height: 22, color: res.color }} />
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: res.bg, color: res.color }}
                    >
                      {res.tag}
                    </span>
                  </div>
                  <h4
                    style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}
                  >
                    {res.title}
                  </h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: 16 }}>
                    {res.desc}
                  </p>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: res.bg, color: res.color }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    {res.cta} <ArrowRight style={{ width: 12, height: 12 }} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Upcoming prep sessions */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Upcoming Prep Sessions
              </h3>
              <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: ACCENT }}>
                View All <ChevronRight style={{ width: 12, height: 12 }} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Mock Design Interview — Architecture Track", date: "May 18, 2026", time: "3:00 PM", host: "By ML Mentors", color: ACCENT, bg: `rgba(${ACCENT_RGB},0.08)` },
                { title: "Portfolio Critique Workshop",               date: "May 22, 2026", time: "11:00 AM", host: "By Morphogenesis", color: "#a855f7", bg: "rgba(168,85,247,0.08)" },
                { title: "Resume Review Drop-in",                     date: "May 24, 2026", time: "2:00 PM",  host: "By Career Services", color: ORANGE, bg: "rgba(255,106,61,0.08)" },
              ].map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: session.bg }}
                  >
                    <Calendar style={{ color: session.color, width: 15, height: 15 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                      {session.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {session.date} · {session.time}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: session.color, fontWeight: 600 }}>
                        {session.host}
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all"
                    style={{ background: session.bg, color: session.color }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
