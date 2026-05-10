import { useState } from "react";
import {
  Search, Briefcase, MapPin, Clock, Users, ChevronRight,
  Bookmark, BookmarkCheck, IndianRupee, Building2, Filter,
  CheckCircle, XCircle, ArrowRight, Calendar, Star
} from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

/* ── Mock Data ──────────────────────────────────────────────────────── */

type Job = {
  id: number;
  title: string;
  studio: string;
  studioInitials: string;
  location: string;
  salary: string;
  type: "Full-time" | "Contract" | "Freelance" | "Internship";
  category: string;
  posted: string;
  applicants: number;
  description: string;
  requirements: string[];
  skills: string[];
  studioInfo: string;
  saved: boolean;
};

type Application = {
  id: number;
  jobTitle: string;
  studio: string;
  appliedDate: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Offered" | "Rejected";
  timeline: { stage: string; date: string; done: boolean }[];
};

const jobs: Job[] = [
  {
    id: 1, title: "Senior Architect", studio: "DesignCraft Studio", studioInitials: "DC",
    location: "Mumbai, Maharashtra", salary: "12-18 LPA", type: "Full-time", category: "Architecture",
    posted: "2 days ago", applicants: 45,
    description: "We are looking for an experienced Senior Architect to lead residential and commercial projects across Mumbai. You will work closely with clients to transform their vision into reality using sustainable design principles.",
    requirements: ["8+ years of experience in architecture", "Proficiency in AutoCAD, Revit, and SketchUp", "Strong portfolio of completed projects", "LEED certification preferred", "Excellent client communication skills"],
    skills: ["AutoCAD", "Revit", "SketchUp", "Sustainability", "Project Management"],
    studioInfo: "DesignCraft Studio is an award-winning architecture firm based in Mumbai with 50+ completed projects across India.",
    saved: false,
  },
  {
    id: 2, title: "Interior Designer", studio: "SpaceWorks India", studioInitials: "SW",
    location: "Bangalore, Karnataka", salary: "8-12 LPA", type: "Full-time", category: "Interior Design",
    posted: "1 day ago", applicants: 32,
    description: "Join our growing team to design innovative interior spaces for tech companies and luxury residences in Bangalore.",
    requirements: ["5+ years in interior design", "3D visualization skills", "Knowledge of Indian materials", "Client-facing experience"],
    skills: ["3ds Max", "V-Ray", "AutoCAD", "Material Selection", "Space Planning"],
    studioInfo: "SpaceWorks India creates modern, functional spaces with an emphasis on Indian design aesthetics.",
    saved: false,
  },
  {
    id: 3, title: "Sustainability Consultant", studio: "GreenBuild Associates", studioInitials: "GB",
    location: "Pune, Maharashtra", salary: "10-15 LPA", type: "Full-time", category: "Sustainability",
    posted: "3 days ago", applicants: 18,
    description: "Help buildings achieve green certifications and implement sustainable design strategies across our projects in Western India.",
    requirements: ["GRIHA/LEED AP certification", "3+ years in green building consultancy", "Energy modeling experience", "Knowledge of NBC and ECBC codes"],
    skills: ["GRIHA", "LEED", "Energy Modeling", "eQUEST", "Sustainability"],
    studioInfo: "GreenBuild Associates is India's leading green building consultancy with 100+ certified projects.",
    saved: true,
  },
  {
    id: 4, title: "Landscape Architect", studio: "Terra Design Lab", studioInitials: "TL",
    location: "Hyderabad, Telangana", salary: "7-10 LPA", type: "Full-time", category: "Landscape",
    posted: "5 days ago", applicants: 22,
    description: "Design outdoor spaces for residential townships, IT parks, and public spaces in Hyderabad.",
    requirements: ["Degree in Landscape Architecture", "4+ years experience", "Knowledge of native Indian plants", "Irrigation design skills"],
    skills: ["Lumion", "AutoCAD", "Plant Selection", "Irrigation Design", "Site Planning"],
    studioInfo: "Terra Design Lab specializes in creating ecologically sensitive landscapes across South India.",
    saved: false,
  },
  {
    id: 5, title: "BIM Coordinator", studio: "Archi+Tech Solutions", studioInitials: "AT",
    location: "Chennai, Tamil Nadu", salary: "9-14 LPA", type: "Contract", category: "Technology",
    posted: "1 week ago", applicants: 15,
    description: "Coordinate BIM workflows for large-scale infrastructure projects. Ensure model accuracy and clash detection across disciplines.",
    requirements: ["Revit expert-level proficiency", "BIM 360 experience", "Clash detection with Navisworks", "3+ years as BIM coordinator"],
    skills: ["Revit", "BIM 360", "Navisworks", "Dynamo", "Coordination"],
    studioInfo: "Archi+Tech combines architecture with cutting-edge technology for smart building design.",
    saved: false,
  },
  {
    id: 6, title: "Junior Architect", studio: "Studio Sangam", studioInitials: "SS",
    location: "Ahmedabad, Gujarat", salary: "4-6 LPA", type: "Full-time", category: "Architecture",
    posted: "4 days ago", applicants: 68,
    description: "Exciting opportunity for fresh graduates to work on heritage conservation and adaptive reuse projects in Gujarat.",
    requirements: ["B.Arch degree from recognized institution", "0-2 years experience", "Interest in heritage architecture", "Good hand-sketching skills"],
    skills: ["AutoCAD", "SketchUp", "Hand Drafting", "Model Making", "Photoshop"],
    studioInfo: "Studio Sangam focuses on preserving Indian architectural heritage through sensitive adaptive reuse.",
    saved: false,
  },
  {
    id: 7, title: "Freelance 3D Visualizer", studio: "RenderHouse India", studioInitials: "RH",
    location: "Remote", salary: "2000-5000/render", type: "Freelance", category: "Visualization",
    posted: "6 days ago", applicants: 90,
    description: "Create photorealistic architectural renders for various firms. Flexible schedule, project-based work.",
    requirements: ["Expert in 3ds Max + V-Ray or Corona", "Strong portfolio of arch-viz", "Fast turnaround ability", "Post-processing in Photoshop"],
    skills: ["3ds Max", "V-Ray", "Corona", "Photoshop", "Lumion"],
    studioInfo: "RenderHouse India is a visualization studio serving 200+ architecture firms across the country.",
    saved: true,
  },
  {
    id: 8, title: "Architecture Intern", studio: "Morphogenesis", studioInitials: "MG",
    location: "New Delhi", salary: "15-25K/month", type: "Internship", category: "Architecture",
    posted: "2 days ago", applicants: 120,
    description: "6-month internship at one of India's premier architecture firms. Exposure to international projects and sustainable design.",
    requirements: ["Currently pursuing B.Arch (4th/5th year)", "Strong design sensibility", "Basic Revit knowledge", "Eagerness to learn"],
    skills: ["Revit", "AutoCAD", "Rhino", "Grasshopper", "Research"],
    studioInfo: "Morphogenesis is an internationally acclaimed New Delhi-based firm known for climate-responsive architecture.",
    saved: false,
  },
];

const applications: Application[] = [
  {
    id: 1, jobTitle: "Senior Architect", studio: "XYZ Studio", appliedDate: "Mar 25, 2026", status: "Shortlisted",
    timeline: [
      { stage: "Applied", date: "Mar 25", done: true },
      { stage: "Shortlisted", date: "Mar 28", done: true },
      { stage: "Interview", date: "Pending", done: false },
      { stage: "Decision", date: "Pending", done: false },
    ],
  },
  {
    id: 2, jobTitle: "Design Lead", studio: "BuildCorp India", appliedDate: "Mar 18, 2026", status: "Interview",
    timeline: [
      { stage: "Applied", date: "Mar 18", done: true },
      { stage: "Shortlisted", date: "Mar 20", done: true },
      { stage: "Interview", date: "Mar 30", done: true },
      { stage: "Decision", date: "Pending", done: false },
    ],
  },
  {
    id: 3, jobTitle: "Sustainability Analyst", studio: "EcoHomes", appliedDate: "Mar 10, 2026", status: "Offered",
    timeline: [
      { stage: "Applied", date: "Mar 10", done: true },
      { stage: "Shortlisted", date: "Mar 12", done: true },
      { stage: "Interview", date: "Mar 18", done: true },
      { stage: "Offered", date: "Mar 25", done: true },
    ],
  },
  {
    id: 4, jobTitle: "Junior Designer", studio: "ArtSpace", appliedDate: "Feb 28, 2026", status: "Rejected",
    timeline: [
      { stage: "Applied", date: "Feb 28", done: true },
      { stage: "Reviewed", date: "Mar 5", done: true },
      { stage: "Rejected", date: "Mar 8", done: true },
    ],
  },
];

const JOB_TYPES = ["All", "Full-time", "Contract", "Freelance", "Internship"];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Applied: { bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
  Shortlisted: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  Interview: { bg: "rgba(168,85,247,0.1)", color: "#a855f7" },
  Offered: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  Rejected: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
};

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  "Full-time": { bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
  Contract: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  Freelance: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  Internship: { bg: "rgba(168,85,247,0.1)", color: "#a855f7" },
};

/* ── Main Component ────────────────────────────────────────────────── */

export function UserJobsPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "applied" | "saved">("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedJobId, setSelectedJobId] = useState<number>(1);

  const savedJobs = jobs.filter((j) => j.saved);

  const filteredJobs = jobs
    .filter((j) => selectedType === "All" || j.type === selectedType)
    .filter((j) =>
      searchQuery === "" ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.studio.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const tabs = [
    { key: "browse" as const, label: "Browse", count: jobs.length },
    { key: "applied" as const, label: "Applied", count: applications.length },
    { key: "saved" as const, label: "Saved", count: savedJobs.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-5">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Jobs & Opportunities
        </h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <input
            className="gl-input w-full pl-9"
            placeholder="Search jobs, studios..."
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
              className="px-1.5 py-0.5 rounded-full text-xs"
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

      {/* ── Browse Tab ────────────────────────────────────────────── */}
      {activeTab === "browse" && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            {JOB_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: selectedType === type ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                  color: selectedType === type ? ACCENT : "var(--text-secondary)",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4" style={{ minHeight: 500 }}>
            {/* Left: Job List */}
            <div className="lg:col-span-2 space-y-2 overflow-y-auto" style={{ maxHeight: 600 }}>
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: selectedJobId === job.id ? `rgba(${ACCENT_RGB},0.06)` : "rgba(255,255,255,0.8)",
                    border: selectedJobId === job.id ? `1px solid rgba(${ACCENT_RGB},0.2)` : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)` }}
                    >
                      {job.studioInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {job.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>
                        {job.studio}
                      </div>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="flex items-center gap-0.5" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-0.5" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          <IndianRupee className="w-3 h-3" /> {job.salary}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-medium"
                          style={TYPE_COLORS[job.type] || { bg: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}
                        >
                          {job.type}
                        </span>
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          {job.posted}
                        </span>
                        <span className="flex items-center gap-0.5" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                          <Users className="w-3 h-3" /> {job.applicants}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Selected Job Detail */}
            <div
              className="lg:col-span-3 rounded-2xl p-6 overflow-y-auto hidden lg:block"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)", maxHeight: 600 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {selectedJob.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                      {selectedJob.studio}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-medium"
                      style={TYPE_COLORS[selectedJob.type]}
                    >
                      {selectedJob.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5 flex-wrap">
                <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <MapPin className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> {selectedJob.location}
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <IndianRupee className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> {selectedJob.salary}
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <Clock className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> {selectedJob.posted}
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <Users className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> {selectedJob.applicants} applicants
                </span>
              </div>

              <div className="mb-5">
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                  About the Role
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {selectedJob.description}
                </p>
              </div>

              <div className="mb-5">
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                  Requirements
                </h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2" style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                  Skills
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedJob.skills.map((skill) => (
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

              <div
                className="p-4 rounded-xl mb-5"
                style={{ background: "rgba(0,0,0,0.03)" }}
              >
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  About {selectedJob.studio}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {selectedJob.studioInfo}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: ACCENT, boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)` }}
                >
                  <Briefcase className="w-4 h-4" /> Apply Now
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                >
                  <Bookmark className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Applied Tab ───────────────────────────────────────────── */}
      {activeTab === "applied" && (
        <div className="space-y-3">
          {applications.map((app) => {
            const statusStyle = STATUS_COLORS[app.status] || STATUS_COLORS.Applied;
            return (
              <div
                key={app.id}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {app.jobTitle}
                      </h4>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: statusStyle.bg, color: statusStyle.color }}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{app.studio}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Applied {app.appliedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-0 overflow-x-auto pb-1">
                  {app.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{
                            background: step.done
                              ? app.status === "Rejected" && idx === app.timeline.length - 1
                                ? "#ef4444"
                                : ACCENT
                              : "rgba(0,0,0,0.08)",
                          }}
                        >
                          {step.done ? (
                            app.status === "Rejected" && idx === app.timeline.length - 1 ? (
                              <XCircle className="w-3.5 h-3.5 text-white" />
                            ) : (
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            )
                          ) : (
                            <div className="w-2 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.2)" }} />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: step.done ? 600 : 400,
                            color: step.done ? "var(--text-primary)" : "var(--text-muted)",
                            marginTop: 4,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {step.stage}
                        </span>
                        <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>{step.date}</span>
                      </div>
                      {idx < app.timeline.length - 1 && (
                        <div
                          className="h-0.5 mx-2"
                          style={{
                            width: 40,
                            background: step.done ? ACCENT : "rgba(0,0,0,0.1)",
                            marginBottom: 28,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Saved Tab ─────────────────────────────────────────────── */}
      {activeTab === "saved" && (
        <div className="space-y-3">
          {savedJobs.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <Bookmark className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>No saved jobs yet</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>
                Bookmark jobs while browsing to save them for later.
              </p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-4 p-4 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)` }}
                >
                  {job.studioInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{job.studio}</span>
                    <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-0.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <IndianRupee className="w-3 h-3" /> {job.salary}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                    style={{ background: ACCENT }}
                  >
                    Quick Apply
                  </button>
                  <button className="p-2 rounded-lg transition-all" style={{ color: "#f59e0b" }}>
                    <BookmarkCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
