import { useState } from "react";
import { Search, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

interface Student {
  id: number;
  name: string;
  initials: string;
  avatarUrl: string;
  color: string;
  email: string;
  course: string;
  faculty: string;
  enrolled: string;
  progress: number;
  status: "Completed" | "In Progress" | "Dropped";
  certificate: boolean;
}

const STUDENTS: Student[] = [
  { id: 1, name: "Akash Mehra",    initials: "AM", avatarUrl: "https://i.pravatar.cc/80?img=19", color: "#1e40af", email: "akash.mehra@gmail.com", course: "BIM Professional: Revit", faculty: "Dr. Ramesh Iyer", enrolled: "10 Jan 2024", progress: 100, status: "Completed", certificate: true },
  { id: 2, name: "Priya Menon",    initials: "PM", avatarUrl: "https://i.pravatar.cc/80?img=34", color: "#be185d", email: "priya.menon@studio.in",  course: "BIM Professional: Revit", faculty: "Dr. Ramesh Iyer", enrolled: "12 Feb 2024", progress: 72,  status: "In Progress", certificate: false },
  { id: 3, name: "Rahul Saxena",   initials: "RS", avatarUrl: "https://i.pravatar.cc/80?img=70", color: "#065f46", email: "r.saxena@arch.co",       course: "AutoCAD for Construction", faculty: "Priya Suresh",   enrolled: "5 Mar 2024",  progress: 100, status: "Completed", certificate: true },
  { id: 4, name: "Sneha Tiwari",   initials: "ST", avatarUrl: "https://i.pravatar.cc/80?img=51", color: "#7c3aed", email: "sneha.t@design.in",      course: "BIM Professional: Revit", faculty: "Dr. Ramesh Iyer", enrolled: "18 Mar 2024", progress: 45,  status: "In Progress", certificate: false },
  { id: 5, name: "Arjun Kulkarni", initials: "AK", avatarUrl: "https://i.pravatar.cc/80?img=33", color: "#b45309", email: "a.kulkarni@eng.net",     course: "Grasshopper & Parametric",faculty: "Arjun Nair",     enrolled: "2 Apr 2024",  progress: 100, status: "Completed", certificate: true },
  { id: 6, name: "Divya Pillai",   initials: "DP", avatarUrl: "https://i.pravatar.cc/80?img=28", color: "#0e7490", email: "divya.p@homedesign.io",  course: "Smart Home Automation",   faculty: "Meera Pillai",   enrolled: "15 Apr 2024", progress: 30,  status: "In Progress", certificate: false },
  { id: 7, name: "Rohan Verma",    initials: "RV", avatarUrl: "https://i.pravatar.cc/80?img=31", color: "#374151", email: "r.verma@contractor.in",  course: "Cost Estimation",         faculty: "Sanjay Kumar",   enrolled: "20 Jan 2024", progress: 10,  status: "Dropped", certificate: false },
  { id: 8, name: "Ananya Shah",    initials: "AS", avatarUrl: "https://i.pravatar.cc/80?img=16", color: "#15803d", email: "ananya.s@build.co",      course: "AutoCAD for Construction", faculty: "Priya Suresh",   enrolled: "3 May 2024",  progress: 62,  status: "In Progress", certificate: false },
  { id: 9, name: "Vijay Kumar",    initials: "VK", avatarUrl: "https://i.pravatar.cc/80?img=20", color: "#6d28d9", email: "vijay.k@firm.in",        course: "Façade Engineering",      faculty: "Rohit Desai",    enrolled: "10 May 2024", progress: 100, status: "Completed", certificate: true },
  { id: 10, name: "Meera Joshi",   initials: "MJ", avatarUrl: "https://i.pravatar.cc/80?img=41", color: "#9a3412", email: "meera.j@spaces.in",      course: "BIM Professional: Revit", faculty: "Dr. Ramesh Iyer", enrolled: "12 May 2024", progress: 5,   status: "In Progress", certificate: false },
];

const statusMeta = {
  Completed:   { icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  "In Progress":{ icon: Clock,      color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  Dropped:     { icon: AlertCircle, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export function InstituteStudentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "In Progress" | "Dropped">("All");

  const filtered = STUDENTS.filter((s) => {
    if (statusFilter !== "All" && s.status !== statusFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.course.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const completed = STUDENTS.filter(s => s.status === "Completed").length;
  const inProgress = STUDENTS.filter(s => s.status === "In Progress").length;
  const dropped = STUDENTS.filter(s => s.status === "Dropped").length;

  return (
    <div className="p-5 sm:p-7 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Students</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
            {STUDENTS.length} enrolled · {completed} completed · {inProgress} in progress · {dropped} dropped
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(59,130,246,0.08)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" }}>
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[
          { label: "All", count: STUDENTS.length, val: "All" as const },
          { label: "Completed", count: completed, val: "Completed" as const },
          { label: "In Progress", count: inProgress, val: "In Progress" as const },
          { label: "Dropped", count: dropped, val: "Dropped" as const },
        ].map((f) => (
          <button
            key={f.val}
            onClick={() => setStatusFilter(f.val)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: statusFilter === f.val ? "#3b82f6" : "white",
              color: statusFilter === f.val ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${statusFilter === f.val ? "#3b82f6" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            {f.label}
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: statusFilter === f.val ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.06)" }}>
              {f.count}
            </span>
          </button>
        ))}

        <div className="relative ml-auto min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {["Student", "Course", "Faculty", "Enrolled", "Progress", "Status", "Certificate"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const sm = statusMeta[s.status];
                const StatusIcon = sm.icon;
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.02)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <AvatarImg src={s.avatarUrl} fallback={s.initials} size={28} fallbackBg={s.color} />
                        <div>
                          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</p>
                          <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5" style={{ maxWidth: "200px" }}>
                      <p className="truncate" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{s.course}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{s.faculty}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.enrolled}</p>
                    </td>
                    <td className="px-5 py-3.5" style={{ minWidth: "120px" }}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${s.progress}%`,
                              background: s.progress === 100 ? "#10b981" : "#3b82f6",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)", minWidth: "28px", textAlign: "right" }}>{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className="w-3.5 h-3.5" style={{ color: sm.color }} />
                        <span className="text-[11px] font-semibold" style={{ color: sm.color }}>{s.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {s.certificate ? (
                        <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                          <Download className="w-3 h-3" /> Download
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
