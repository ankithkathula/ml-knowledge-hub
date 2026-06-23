import { useState } from "react";
import {
  Plus, Search, Filter, Calendar, IndianRupee, Users,
  Clock, ChevronRight, MoreHorizontal, CheckCircle2,
  Circle, ArrowUpRight, Layers, FileText, PenLine,
  TrendingUp, Briefcase, Package, Edit3, Eye, Heart, Globe, Lock, Image,
} from "lucide-react";
import { PORTFOLIO_WORKS } from "../data/designerData";

const ACCENT = "#8b5cf6";
const ACCENT_RGB = "139,92,246";

/* ── Types ──────────────────────────────────────────────────────────── */

type ProjectStatus = "Briefing" | "Design" | "Review" | "Execution" | "Delivered";

type Project = {
  id: string;
  name: string;
  client: string;
  type: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  budget: string;
  area: string;
  city: string;
  tasks: { done: number; total: number };
  color: string;
  pending?: string;
};

type MaterialBoard = {
  id: string;
  project: string;
  title: string;
  materials: number;
  updated: string;
  gradient: string;
  tags: string[];
};

type Proposal = {
  id: string;
  client: string;
  projectType: string;
  value: string;
  status: "Draft" | "Sent" | "Under Review" | "Accepted" | "Declined";
  date: string;
  area: string;
};

/* ── Mock Data ──────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    id: "p1",
    name: "The Willow Residence",
    client: "Arjun & Deepika Malhotra",
    type: "Residential",
    status: "Design",
    progress: 55,
    deadline: "Jul 15, 2026",
    budget: "₹28L",
    area: "3,200 sq ft",
    city: "Mumbai",
    tasks: { done: 11, total: 20 },
    color: "#8b5cf6",
    pending: "Await client sign-off on furniture layout",
  },
  {
    id: "p2",
    name: "Kora Café — Bandra",
    client: "Kora Hospitality Pvt Ltd",
    type: "F&B / Retail",
    status: "Execution",
    progress: 78,
    deadline: "Jun 2, 2026",
    budget: "₹14L",
    area: "900 sq ft",
    city: "Mumbai",
    tasks: { done: 16, total: 21 },
    color: "#f59e0b",
    pending: "FF&E delivery tracking",
  },
  {
    id: "p3",
    name: "Miraya Wellness Clinic",
    client: "Dr. Prerna Sinha",
    type: "Healthcare",
    status: "Review",
    progress: 40,
    deadline: "Aug 30, 2026",
    budget: "₹9L",
    area: "1,100 sq ft",
    city: "Pune",
    tasks: { done: 8, total: 20 },
    color: "#10b981",
    pending: "3D presentation pending approval",
  },
  {
    id: "p4",
    name: "Nomad Co-Work Lounge",
    client: "Nomad Spaces",
    type: "Commercial",
    status: "Briefing",
    progress: 12,
    deadline: "Oct 10, 2026",
    budget: "₹22L",
    area: "4,500 sq ft",
    city: "Bangalore",
    tasks: { done: 2, total: 18 },
    color: "#3b82f6",
    pending: "Site visit scheduled May 22",
  },
  {
    id: "p5",
    name: "The Orchid Suite — Alibaug",
    client: "The Orchid Hotels",
    type: "Hospitality",
    status: "Delivered",
    progress: 100,
    deadline: "Apr 30, 2026",
    budget: "₹18L",
    area: "2,200 sq ft",
    city: "Alibaug",
    tasks: { done: 24, total: 24 },
    color: "#ec4899",
  },
];

const materialBoards: MaterialBoard[] = [
  {
    id: "mb1",
    project: "The Willow Residence",
    title: "Living Room Palette",
    materials: 18,
    updated: "2 days ago",
    gradient: "linear-gradient(135deg, #f3e8ff, #ddd6fe)",
    tags: ["Stone", "Fabric", "Wood"],
  },
  {
    id: "mb2",
    project: "The Willow Residence",
    title: "Master Bedroom Finishes",
    materials: 12,
    updated: "5 days ago",
    gradient: "linear-gradient(135deg, #ede9fe, #c4b5fd)",
    tags: ["Veneer", "Carpet", "Metal"],
  },
  {
    id: "mb3",
    project: "Kora Café — Bandra",
    title: "Counter & Bar Area",
    materials: 9,
    updated: "1 week ago",
    gradient: "linear-gradient(135deg, #fef3c7, #fde68a)",
    tags: ["Ceramic", "Brass", "Concrete"],
  },
  {
    id: "mb4",
    project: "Miraya Wellness Clinic",
    title: "Reception Mood Board",
    materials: 14,
    updated: "3 days ago",
    gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    tags: ["Stone", "Fabric", "Lighting"],
  },
  {
    id: "mb5",
    project: "Nomad Co-Work Lounge",
    title: "Primary Concept Board",
    materials: 6,
    updated: "Today",
    gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    tags: ["Acoustic", "Glass", "Steel"],
  },
  {
    id: "mb6",
    project: "Nomad Co-Work Lounge",
    title: "Breakout Zone Materials",
    materials: 4,
    updated: "Today",
    gradient: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
    tags: ["Plywood", "Upholstery"],
  },
];

const proposals: Proposal[] = [
  {
    id: "pr1",
    client: "Vikram & Sonal Nair",
    projectType: "4BHK Residential — Bandra West",
    value: "₹32L",
    status: "Under Review",
    date: "May 12, 2026",
    area: "3,800 sq ft",
  },
  {
    id: "pr2",
    client: "Zara Fashion India",
    projectType: "Flagship Store Interior",
    value: "₹48L",
    status: "Sent",
    date: "May 8, 2026",
    area: "5,200 sq ft",
  },
  {
    id: "pr3",
    client: "The Grand Hyatt (Concept Study)",
    projectType: "Executive Lounge Redesign",
    value: "₹25L",
    status: "Accepted",
    date: "Apr 28, 2026",
    area: "1,600 sq ft",
  },
  {
    id: "pr4",
    client: "Raghav Mehta",
    projectType: "Home Office + Studio",
    value: "₹8L",
    status: "Draft",
    date: "May 14, 2026",
    area: "600 sq ft",
  },
  {
    id: "pr5",
    client: "BluePebble Retail",
    projectType: "Pop-up Store Concept",
    value: "₹5L",
    status: "Declined",
    date: "Apr 15, 2026",
    area: "400 sq ft",
  },
];

const STATUS_ORDER: ProjectStatus[] = ["Briefing", "Design", "Review", "Execution", "Delivered"];

const STATUS_STYLE: Record<ProjectStatus, { bg: string; color: string }> = {
  Briefing:  { bg: "rgba(59,130,246,0.1)",   color: "#3b82f6"  },
  Design:    { bg: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT     },
  Review:    { bg: "rgba(245,158,11,0.1)",   color: "#f59e0b"  },
  Execution: { bg: "rgba(249,115,22,0.1)",   color: "#f97316"  },
  Delivered: { bg: "rgba(16,185,129,0.1)",   color: "#10b981"  },
};

const PROPOSAL_STYLE: Record<Proposal["status"], { bg: string; color: string }> = {
  Draft:        { bg: "rgba(0,0,0,0.06)",          color: "var(--text-muted)" as string },
  Sent:         { bg: "rgba(59,130,246,0.1)",       color: "#3b82f6"  },
  "Under Review": { bg: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT     },
  Accepted:     { bg: "rgba(16,185,129,0.1)",       color: "#10b981"  },
  Declined:     { bg: "rgba(239,68,68,0.1)",        color: "#ef4444"  },
};

/* ── Main Component ──────────────────────────────────────────────────*/

export function DesignerWorkspacePage() {
  const [activeTab, setActiveTab]         = useState<"projects" | "boards" | "proposals" | "works">("projects");
  const [searchQuery, setSearchQuery]     = useState("");
  const [statusFilter, setStatusFilter]   = useState<ProjectStatus | "All">("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("p1");
  const [worksCategory, setWorksCategory] = useState("All");

  const activeCount    = projects.filter((p) => p.status !== "Delivered").length;
  const boardCount     = materialBoards.length;
  const pendingProposals = proposals.filter((p) => p.status === "Sent" || p.status === "Under Review").length;

  const filteredProjects = projects.filter((p) => {
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selected = projects.find((p) => p.id === selectedProjectId) ?? projects[0];

  const WORKS_CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Institutional"];
  const filteredWorks = worksCategory === "All" ? PORTFOLIO_WORKS : PORTFOLIO_WORKS.filter(w => w.category === worksCategory);

  const tabs = [
    { key: "projects"  as const, label: "Projects",       count: projects.length       },
    { key: "boards"    as const, label: "Material Boards", count: boardCount            },
    { key: "proposals" as const, label: "Proposals",       count: proposals.length      },
    { key: "works"     as const, label: "Published Works", count: PORTFOLIO_WORKS.length },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-5">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Workspace
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>
            Projects, material boards, proposals and published works
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="gl-input pl-9"
              style={{ width: 220 }}
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: ACCENT, boxShadow: `0 4px 12px rgba(${ACCENT_RGB},0.3)` }}
          >
            <Plus style={{ width: 15, height: 15 }} /> New Project
          </button>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Projects",    value: String(activeCount),      icon: Briefcase,   color: ACCENT,    bg: `rgba(${ACCENT_RGB},0.1)` },
          { label: "Material Boards",    value: String(boardCount),       icon: Layers,      color: "#f59e0b", bg: "rgba(245,158,11,0.1)"   },
          { label: "Pending Proposals",  value: String(pendingProposals), icon: FileText,    color: "#3b82f6", bg: "rgba(59,130,246,0.1)"   },
          { label: "Revenue This Month", value: "₹4.2L",                  icon: TrendingUp,  color: "#10b981", bg: "rgba(16,185,129,0.1)"   },
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
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
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

      {/* ════════════════════════════════════════════════════════════
          TAB: Projects
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "projects" && (
        <>
          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter style={{ width: 15, height: 15, color: "var(--text-muted)" }} />
            {(["All", ...STATUS_ORDER] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s as ProjectStatus | "All")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background:
                    statusFilter === s ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                  color: statusFilter === s ? ACCENT : "var(--text-secondary)",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4" style={{ minHeight: 500 }}>
            {/* Left — project list */}
            <div className="lg:col-span-2 space-y-2 overflow-y-auto" style={{ maxHeight: 640 }}>
              {filteredProjects.map((proj) => {
                const ss = STATUS_STYLE[proj.status];
                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className="p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      background:
                        selectedProjectId === proj.id
                          ? `rgba(${ACCENT_RGB},0.06)`
                          : "rgba(255,255,255,0.8)",
                      border:
                        selectedProjectId === proj.id
                          ? `1px solid rgba(${ACCENT_RGB},0.2)`
                          : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                        style={{ background: proj.color }}
                      >
                        {proj.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}
                          className="truncate"
                        >
                          {proj.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 1 }}>
                          {proj.client}
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                            style={ss}
                          >
                            {proj.status}
                          </span>
                          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                            {proj.city} · {proj.area}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${proj.progress}%`, background: proj.color }}
                            />
                          </div>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)" }}>
                            {proj.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right — project detail */}
            <div
              className="lg:col-span-3 rounded-2xl p-6 overflow-y-auto hidden lg:block"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(0,0,0,0.06)",
                maxHeight: 640,
              }}
            >
              {/* Project header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                    style={{ background: selected.color }}
                  >
                    {selected.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3
                      style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}
                    >
                      {selected.name}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 2 }}>
                      {selected.client}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={STATUS_STYLE[selected.status]}
                      >
                        {selected.status}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {selected.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MoreHorizontal style={{ width: 18, height: 18 }} />
                </button>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { icon: IndianRupee, label: "Budget",   value: selected.budget   },
                  { icon: Calendar,    label: "Deadline",  value: selected.deadline },
                  { icon: Package,     label: "Area",      value: selected.area     },
                  { icon: Clock,       label: "Tasks",     value: `${selected.tasks.done}/${selected.tasks.total}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 p-3 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.03)" }}
                  >
                    <Icon style={{ width: 14, height: 14, color: ACCENT, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 500 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall progress */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                    Overall Progress
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: selected.color }}>
                    {selected.progress}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${selected.progress}%`, background: selected.color }}
                  />
                </div>
              </div>

              {/* Phase pipeline */}
              <div className="mb-5">
                <h4
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}
                >
                  Phase Pipeline
                </h4>
                <div className="flex items-center gap-0 overflow-x-auto pb-1">
                  {STATUS_ORDER.map((phase, idx) => {
                    const phaseIdx    = STATUS_ORDER.indexOf(selected.status);
                    const isDone      = idx < phaseIdx;
                    const isCurrent   = idx === phaseIdx;
                    const isPending   = idx > phaseIdx;
                    return (
                      <div key={phase} className="flex items-center">
                        <div className="flex flex-col items-center min-w-[72px]">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: isDone
                                ? "#10b981"
                                : isCurrent
                                ? selected.color
                                : "rgba(0,0,0,0.08)",
                            }}
                          >
                            {isDone ? (
                              <CheckCircle2 style={{ width: 16, height: 16, color: "white" }} />
                            ) : isCurrent ? (
                              <PenLine style={{ width: 14, height: 14, color: "white" }} />
                            ) : (
                              <Circle style={{ width: 14, height: 14, color: "rgba(0,0,0,0.25)" }} />
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: isCurrent ? 700 : 400,
                              color: isCurrent
                                ? selected.color
                                : isDone
                                ? "#10b981"
                                : "var(--text-muted)",
                              marginTop: 4,
                              textAlign: "center",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {phase}
                          </span>
                        </div>
                        {idx < STATUS_ORDER.length - 1 && (
                          <div
                            className="h-0.5 flex-shrink-0"
                            style={{
                              width: 28,
                              marginBottom: 18,
                              background: isDone ? "#10b981" : "rgba(0,0,0,0.1)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending action */}
              {selected.pending && (
                <div
                  className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5"
                  style={{
                    background: `rgba(${ACCENT_RGB},0.05)`,
                    border: `1px solid rgba(${ACCENT_RGB},0.12)`,
                  }}
                >
                  <Clock
                    style={{ width: 14, height: 14, color: ACCENT, flexShrink: 0, marginTop: 1 }}
                  />
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: ACCENT }}>
                      Next action
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>
                      {selected.pending}
                    </div>
                  </div>
                </div>
              )}

              {/* Material boards for this project */}
              {(() => {
                const boards = materialBoards.filter((b) => b.project === selected.name);
                if (!boards.length) return null;
                return (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        Material Boards
                      </h4>
                      <button
                        className="flex items-center gap-1 text-xs font-semibold"
                        style={{ color: ACCENT }}
                        onClick={() => setActiveTab("boards")}
                      >
                        View All <ArrowUpRight style={{ width: 12, height: 12 }} />
                      </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {boards.map((b) => (
                        <div
                          key={b.id}
                          className="rounded-xl overflow-hidden flex-shrink-0 cursor-pointer hover:scale-[1.02] transition-all"
                          style={{ width: 120, border: "1px solid rgba(0,0,0,0.06)" }}
                        >
                          <div className="h-14" style={{ background: b.gradient }} />
                          <div className="p-2">
                            <div
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                lineHeight: 1.3,
                              }}
                            >
                              {b.title}
                            </div>
                            <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 2 }}>
                              {b.materials} materials
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT, boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.3)` }}
                >
                  <Edit3 style={{ width: 15, height: 15 }} /> Edit Project
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                >
                  <Users style={{ width: 15, height: 15 }} /> Share
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════
          TAB: Material Boards
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "boards" && (
        <div className="space-y-5">
          {/* Group by project */}
          {projects
            .filter((p) => materialBoards.some((b) => b.project === p.name))
            .map((proj) => {
              const boards = materialBoards.filter((b) => b.project === proj.name);
              return (
                <div key={proj.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ background: proj.color }}
                    >
                      {proj.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span
                      style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}
                    >
                      {proj.name}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      · {boards.length} boards
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {boards.map((board) => (
                      <div
                        key={board.id}
                        className="rounded-2xl overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <div className="h-28" style={{ background: board.gradient }} />
                        <div className="p-4">
                          <div
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: "var(--text-primary)",
                              marginBottom: 4,
                            }}
                          >
                            {board.title}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            {board.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                                style={{
                                  background: `rgba(${ACCENT_RGB},0.08)`,
                                  color: ACCENT,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                              {board.materials} materials · {board.updated}
                            </span>
                            <button style={{ color: ACCENT }}>
                              <ChevronRight style={{ width: 14, height: 14 }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Add board card */}
                    <button
                      className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md"
                      style={{
                        background: `rgba(${ACCENT_RGB},0.04)`,
                        border: `2px dashed rgba(${ACCENT_RGB},0.2)`,
                        minHeight: 180,
                      }}
                    >
                      <Plus style={{ width: 20, height: 20, color: ACCENT }} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }}>
                        New Board
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          TAB: Published Works
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "works" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {WORKS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setWorksCategory(cat)}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: worksCategory === cat ? ACCENT : "rgba(0,0,0,0.04)",
                    color: worksCategory === cat ? "white" : "var(--text-secondary)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white flex-shrink-0"
              style={{ background: ACCENT }}
            >
              <Plus style={{ width: 15, height: 15 }} /> Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="h-44 relative" style={{ background: work.gradient }}>
                  <div className="absolute inset-0 flex items-end p-4">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
                    >
                      {work.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {work.isPublic ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(16,185,129,0.2)" }}
                      >
                        <Globe style={{ color: "#10b981", width: 14, height: 14 }} />
                      </div>
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                      >
                        <Lock style={{ color: "white", width: 14, height: 14 }} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {work.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                    {work.client} · {work.year}
                  </div>
                  <p
                    className="mt-2 line-clamp-2"
                    style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}
                  >
                    {work.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span
                      className="flex items-center gap-1"
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                    >
                      <Eye style={{ width: 14, height: 14 }} />
                      {work.views}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                    >
                      <Heart style={{ width: 14, height: 14 }} />
                      {work.likes}
                    </span>
                    <div className="flex gap-1.5 ml-auto flex-wrap">
                      {work.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          TAB: Proposals
      ════════════════════════════════════════════════════════════ */}
      {activeTab === "proposals" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {proposals.filter((p) => p.status === "Under Review" || p.status === "Sent").length} proposals awaiting response
            </p>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: ACCENT }}
            >
              <Plus style={{ width: 13, height: 13 }} /> New Proposal
            </button>
          </div>

          {proposals.map((proposal) => {
            const style = PROPOSAL_STYLE[proposal.status];
            return (
              <div
                key={proposal.id}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:shadow-sm"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                >
                  <FileText style={{ width: 20, height: 20, color: ACCENT }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}
                    >
                      {proposal.client}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={style}
                    >
                      {proposal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                      {proposal.projectType}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {proposal.area}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {proposal.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}
                  >
                    {proposal.value}
                  </span>
                  <button
                    className="p-2 rounded-lg transition-all"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.08)`;
                      (e.currentTarget as HTMLElement).style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <Edit3 style={{ width: 15, height: 15 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
