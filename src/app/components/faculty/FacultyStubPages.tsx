import { useState } from "react";
import { Link } from "react-router";
import { ExternalLink, Users, ClipboardList, Upload, BookOpen, Link2, Plus, GraduationCap, Globe } from "lucide-react";

const ACCENT = "#2563eb";

const COURSES = [
  {
    name: "Environmental Design Studio",
    section: "Sec A",
    year: "B.Arch 4th Year",
    students: 28,
    schedule: "Mon/Thu 9–11 AM",
    room: "Room 301",
    progress: 65,
    color: "#2563eb",
  },
  {
    name: "Building Construction III",
    section: "Sec B",
    year: "B.Arch 3rd Year",
    students: 30,
    schedule: "Tue/Fri 11 AM–1 PM",
    room: "Room 204",
    progress: 48,
    color: "#6366f1",
  },
  {
    name: "History of Architecture II",
    section: "Sec C",
    year: "B.Arch 2nd Year",
    students: 28,
    schedule: "Wed 2–5 PM",
    room: "Room 101",
    progress: 72,
    color: "#10b981",
  },
];

const STUDENTS = [
  { name: "Priya Mehta", programme: "B.Arch", year: "4th", course: "Environmental Design Studio", status: "Active" },
  { name: "Rahul Verma", programme: "B.Arch", year: "3rd", course: "Building Construction III", status: "Late Submission" },
  { name: "Aisha Khan", programme: "B.Arch", year: "2nd", course: "History of Architecture II", status: "Active" },
  { name: "Karan Singh", programme: "B.Arch", year: "4th", course: "Environmental Design Studio", status: "Active" },
  { name: "Meera Pillai", programme: "B.Arch", year: "3rd", course: "Building Construction III", status: "Active" },
  { name: "Arjun Nair", programme: "B.Arch", year: "2nd", course: "History of Architecture II", status: "Late Submission" },
];

const ASSIGNMENTS = [
  { title: "Thesis Draft Submission", course: "Environmental Design Studio", due: "May 20, 2026", submitted: "18/28", status: "Open" },
  { title: "Construction Detail Sheet 4", course: "Building Construction III", due: "May 18, 2026", submitted: "30/30", status: "Closed" },
  { title: "Precedent Study Analysis", course: "History of Architecture II", due: "May 22, 2026", submitted: "12/28", status: "Open" },
  { title: "Material Board Assignment 2", course: "Building Construction III", due: "May 10, 2026", submitted: "28/30", status: "Grading" },
  { title: "Site Analysis Report", course: "Environmental Design Studio", due: "May 8, 2026", submitted: "26/28", status: "Grading" },
];

const KC_ASSIGNMENTS = [
  {
    id: 1,
    title: "Revit Floor Plan: Residential Project",
    course: "BIM Professional: Revit Architecture Complete",
    courseColor: "#1e40af",
    due: "May 24, 2026",
    submitted: "142/320",
    status: "Open",
    type: "Project",
  },
  {
    id: 2,
    title: "Module 3 Quiz: BIM Standards & IFC",
    course: "BIM Professional: Revit Architecture Complete",
    courseColor: "#1e40af",
    due: "May 19, 2026",
    submitted: "298/320",
    status: "Grading",
    type: "Quiz",
  },
  {
    id: 3,
    title: "AutoCAD Sheet Set Exercise",
    course: "Advanced AutoCAD for Construction Drawings",
    courseColor: "#b45309",
    due: "May 21, 2026",
    submitted: "186/240",
    status: "Open",
    type: "Exercise",
  },
  {
    id: 4,
    title: "Dynamic Blocks Assessment",
    course: "Advanced AutoCAD for Construction Drawings",
    courseColor: "#b45309",
    due: "May 15, 2026",
    submitted: "240/240",
    status: "Closed",
    type: "Assessment",
  },
  {
    id: 5,
    title: "Curtain Wall Detail Submission",
    course: "Façade Engineering & Cladding Systems",
    courseColor: "#0e7490",
    due: "May 28, 2026",
    submitted: "34/98",
    status: "Open",
    type: "Project",
  },
];

const SCHEDULE_DATA: Record<string, { name: string; time: string; color: string }[]> = {
  Mon: [{ name: "Environmental Design Studio", time: "9–11 AM", color: "#2563eb" }],
  Tue: [{ name: "Building Construction III", time: "11 AM–1 PM", color: "#6366f1" }],
  Wed: [{ name: "History of Architecture II", time: "2–5 PM", color: "#10b981" }],
  Thu: [{ name: "Environmental Design Studio", time: "9–11 AM", color: "#2563eb" }],
  Fri: [{ name: "Building Construction III", time: "11 AM–1 PM", color: "#6366f1" }],
  Sat: [],
};

const PUBLICATIONS = [
  {
    title: "Climate-Responsive Design in Tropical Climates",
    journal: "Journal of Architecture & Planning",
    year: "2024",
    citations: 12,
  },
  {
    title: "Heritage Conservation in Post-Colonial India",
    journal: "Built Environment Journal",
    year: "2022",
    citations: 18,
  },
  {
    title: "Biophilic Principles in Educational Spaces",
    journal: "IJBE",
    year: "2021",
    citations: 17,
  },
];

const INSTITUTE_COURSES = [
  {
    id: 1,
    title: "BIM Professional: Revit Architecture Complete",
    level: "Intermediate",
    duration: "48 hrs",
    price: "₹12,999",
    rating: 4.8,
    enrolled: 8420,
    grad: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    category: "BIM",
    faculty: "Dr. Ramesh Iyer",
  },
  {
    id: 4,
    title: "Advanced AutoCAD for Construction Drawings",
    level: "Intermediate",
    duration: "30 hrs",
    price: "₹6,999",
    rating: 4.5,
    enrolled: 7200,
    grad: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)",
    category: "BIM",
    faculty: "Priya Suresh",
  },
  {
    id: 7,
    title: "Façade Engineering & Cladding Systems",
    level: "Advanced",
    duration: "36 hrs",
    price: "₹9,499",
    rating: 4.6,
    enrolled: 980,
    grad: "linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)",
    category: "Construction",
    faculty: "Rohit Desai",
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
    >
      {children}
    </div>
  );
}

function PageWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-5xl mx-auto">
      <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{title}</h1>
      {children}
    </div>
  );
}

export function FacultyCoursesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageWrapper title="My Courses">
      {/* ── Courses I Teach ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Courses I Teach
          </span>
          <Link
            to="/courses"
            className="flex items-center gap-1"
            style={{ fontSize: "0.78rem", color: ACCENT, fontWeight: 600 }}
          >
            Browse Catalog <ExternalLink size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {COURSES.map((course) => (
            <Card key={course.name}>
              <div className="h-1.5 rounded-full mb-4" style={{ background: `${course.color}20` }}>
                <div className="h-1.5 rounded-full" style={{ width: `${course.progress}%`, background: course.color }} />
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                {course.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 2 }}>
                <div>{course.section} · {course.year}</div>
                <div>{course.schedule} · {course.room}</div>
                <div>{course.students} students</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Progress: {course.progress}%</span>
                <div className="flex items-center gap-2">
                  <Link to="/courses" title="View on public catalog" style={{ color: "var(--text-muted)", display: "flex" }}>
                    <ExternalLink size={13} />
                  </Link>
                  <button
                    onClick={() => setExpanded(expanded === course.name ? null : course.name)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                    style={{ background: `${course.color}15`, color: course.color }}
                  >
                    {expanded === course.name ? "Close" : "Manage"}
                  </button>
                </div>
              </div>
              {expanded === course.name && (
                <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                  <Link
                    to="/f/students"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg w-full"
                    style={{ background: "rgba(0,0,0,0.03)", fontSize: "0.78rem", color: "var(--text-secondary)" }}
                  >
                    <Users size={13} /> {course.students} Students
                  </Link>
                  <Link
                    to="/f/assignments"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg w-full"
                    style={{ background: "rgba(0,0,0,0.03)", fontSize: "0.78rem", color: "var(--text-secondary)" }}
                  >
                    <ClipboardList size={13} /> Assignments
                  </Link>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left"
                    style={{ background: "rgba(0,0,0,0.03)", fontSize: "0.78rem", color: "var(--text-secondary)" }}
                  >
                    <Upload size={13} /> Upload Materials
                  </button>
                  <Link
                    to="/u/courses"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg w-full font-semibold"
                    style={{ background: `${course.color}10`, fontSize: "0.78rem", color: course.color }}
                  >
                    <BookOpen size={13} /> View in My Courses →
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* ── Institute Courses on Platform ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Offered by RICS SBE on Platform
          </span>
          <Link
            to="/courses"
            className="flex items-center gap-1"
            style={{ fontSize: "0.78rem", color: ACCENT, fontWeight: 600 }}
          >
            Browse all <ExternalLink size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {INSTITUTE_COURSES.map((c) => (
            <Card key={c.id}>
              <div className="h-16 rounded-xl mb-3" style={{ background: c.grad }} />
              <div className="flex items-center gap-1 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                  {c.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}>
                  {c.level}
                </span>
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3, lineHeight: 1.4 }}>
                {c.title}
              </div>
              <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginBottom: 6 }}>
                By {c.faculty} · {c.duration}
              </div>
              <div className="flex items-center gap-3 mb-3" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <span>★ {c.rating}</span>
                <span>{c.enrolled.toLocaleString()} enrolled</span>
                <span style={{ marginLeft: "auto", fontWeight: 700, color: "var(--text-primary)", fontSize: "0.78rem" }}>{c.price}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/u/courses"
                  className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold text-center"
                  style={{ background: `${ACCENT}15`, color: ACCENT }}
                >
                  My Courses
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                  style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
                  title="View in course catalog"
                >
                  <ExternalLink size={12} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export function FacultyStudentsPage() {
  return (
    <PageWrapper title="Students">
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                {["Name", "Programme", "Year", "Assigned Course", "Status"].map((h) => (
                  <th key={h} className="pb-3 pr-4" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td className="py-3 pr-4" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {s.name}
                  </td>
                  <td className="py-3 pr-4" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {s.programme}
                  </td>
                  <td className="py-3 pr-4" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {s.year}
                  </td>
                  <td className="py-3 pr-4" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {s.course}
                  </td>
                  <td className="py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        background: s.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                        color: s.status === "Active" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}

function AssignmentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Open:    { bg: "rgba(37,99,235,0.1)",   color: ACCENT },
    Closed:  { bg: "rgba(0,0,0,0.06)",      color: "var(--text-muted)" },
    Grading: { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b" },
  };
  const s = styles[status] ?? styles.Open;
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

export function FacultyAssignmentsPage() {
  const [tab, setTab] = useState<"college" | "kc">("college");

  return (
    <PageWrapper title="Assignments">
      {/* ── Tab Toggle ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("college")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors"
          style={{
            background: tab === "college" ? ACCENT : "rgba(0,0,0,0.05)",
            color: tab === "college" ? "white" : "var(--text-secondary)",
          }}
        >
          <GraduationCap size={14} /> College (RICS SBE)
        </button>
        <button
          onClick={() => setTab("kc")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors"
          style={{
            background: tab === "kc" ? ACCENT : "rgba(0,0,0,0.05)",
            color: tab === "kc" ? "white" : "var(--text-secondary)",
          }}
        >
          <Globe size={14} /> KC Platform Courses
        </button>
      </div>

      {/* ── College Assignments ── */}
      {tab === "college" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Institutional assignments for B.Arch cohorts at RICS SBE
            </span>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
              style={{ background: `${ACCENT}12`, color: ACCENT }}
            >
              <Link2 size={13} /> Link from College Portal
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
            {ASSIGNMENTS.map((a, idx) => (
              <div key={idx} className="py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {a.course} · Due {a.due}
                  </div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", flexShrink: 0 }}>
                  {a.submitted} submitted
                </div>
                <AssignmentStatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── KC Platform Assignments ── */}
      {tab === "kc" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Assignments across RICS SBE courses published on KC
            </span>
            <div className="flex items-center gap-2">
              <Link
                to="/courses"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
              >
                <ExternalLink size={12} /> View Courses
              </Link>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                style={{ background: `${ACCENT}12`, color: ACCENT }}
              >
                <Plus size={13} /> New Assignment
              </button>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
            {KC_ASSIGNMENTS.map((a) => (
              <div key={a.id} className="py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {a.title}
                    </div>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0"
                      style={{ background: `${a.courseColor}15`, color: a.courseColor }}
                    >
                      {a.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: a.courseColor }}
                    />
                    {a.course} · Due {a.due}
                  </div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", flexShrink: 0 }}>
                  {a.submitted} submitted
                </div>
                <AssignmentStatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </PageWrapper>
  );
}

export function FacultySchedulePage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <PageWrapper title="Schedule">
      <Card>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {days.map((day) => (
            <div key={day}>
              <div
                className="text-center py-1 mb-2 rounded-lg text-[11px] font-bold uppercase"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)", letterSpacing: "0.06em" }}
              >
                {day}
              </div>
              <div className="space-y-2">
                {(SCHEDULE_DATA[day] ?? []).map((cls, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl"
                    style={{ background: `${cls.color}12`, border: `1px solid ${cls.color}30` }}
                  >
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: cls.color, lineHeight: 1.3 }}>
                      {cls.name}
                    </div>
                    <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {cls.time}
                    </div>
                  </div>
                ))}
                {(SCHEDULE_DATA[day] ?? []).length === 0 && (
                  <div className="h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Free</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}

export function FacultyResearchPage() {
  return (
    <PageWrapper title="Research & Publications">
      <div className="space-y-4">
        {PUBLICATIONS.map((pub, idx) => (
          <Card key={idx}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  {pub.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {pub.journal} · {pub.year}
                </div>
              </div>
              <span
                className="flex-shrink-0 px-3 py-1 rounded-full text-[12px] font-bold"
                style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
              >
                {pub.citations} citations
              </span>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}

export function FacultyMessagesPage() {
  return (
    <PageWrapper title="Messages">
      <Card>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Messaging — coming soon.</p>
      </Card>
    </PageWrapper>
  );
}

export function FacultyProfileEditPage() {
  return (
    <PageWrapper title="Edit Profile">
      <Card>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Profile editor — coming soon.</p>
      </Card>
    </PageWrapper>
  );
}

export function FacultySettingsPage() {
  return (
    <PageWrapper title="Settings">
      <Card>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Settings — coming soon.</p>
      </Card>
    </PageWrapper>
  );
}
