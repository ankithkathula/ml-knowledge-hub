import { useState } from "react";
import { Plus, Search, Mail, Star, CheckCircle, MoreHorizontal } from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

interface Faculty {
  id: number;
  name: string;
  initials: string;
  avatarUrl: string;
  color: string;
  designation: string;
  specialisation: string;
  courses: string[];
  students: number;
  rating: number;
  reviews: number;
  status: "Active" | "On Leave" | "Invited";
  joined: string;
  email: string;
}

const FACULTY: Faculty[] = [
  {
    id: 1, name: "Dr. Ramesh Iyer", initials: "RI", avatarUrl: "https://i.pravatar.cc/80?img=64", color: "#1e40af",
    designation: "Senior BIM Consultant", specialisation: "BIM & Digital Construction",
    courses: ["BIM Professional: Revit Architecture", "IGBC Green Building Professional"],
    students: 984, rating: 4.8, reviews: 368, status: "Active", joined: "Jan 2023", email: "r.iyer@rics.in",
  },
  {
    id: 2, name: "Priya Suresh", initials: "PS", avatarUrl: "https://i.pravatar.cc/80?img=23", color: "#065f46",
    designation: "Senior Trainer", specialisation: "AutoCAD & Civil Drafting",
    courses: ["Advanced AutoCAD for Construction Drawings"],
    students: 720, rating: 4.5, reviews: 240, status: "Active", joined: "Mar 2023", email: "p.suresh@rics.in",
  },
  {
    id: 3, name: "Arjun Nair", initials: "AN", avatarUrl: "https://i.pravatar.cc/80?img=3", color: "#7c3aed",
    designation: "Computational Designer", specialisation: "Grasshopper, Parametric Design",
    courses: ["Grasshopper & Parametric Design"],
    students: 314, rating: 4.7, reviews: 98, status: "Active", joined: "Jun 2023", email: "a.nair@rics.in",
  },
  {
    id: 4, name: "Meera Pillai", initials: "MP", avatarUrl: "https://i.pravatar.cc/80?img=48", color: "#0e7490",
    designation: "Smart Buildings Expert", specialisation: "Building Automation, KNX, DALI",
    courses: ["Smart Home & Building Automation"],
    students: 182, rating: 4.6, reviews: 64, status: "Active", joined: "Sep 2023", email: "m.pillai@rics.in",
  },
  {
    id: 5, name: "Rohit Desai", initials: "RD", avatarUrl: "https://i.pravatar.cc/80?img=9", color: "#b45309",
    designation: "Façade Engineer", specialisation: "Cladding, Curtain Wall Systems",
    courses: ["Façade Engineering & Cladding Systems"],
    students: 96, rating: 4.5, reviews: 42, status: "Active", joined: "Jan 2024", email: "r.desai@rics.in",
  },
  {
    id: 6, name: "Sanjay Kumar", initials: "SK", avatarUrl: "https://i.pravatar.cc/80?img=14", color: "#374151",
    designation: "Quantity Surveyor", specialisation: "BOQ, Cost Estimation",
    courses: ["Construction Cost Estimation & Tendering"],
    students: 228, rating: 4.4, reviews: 88, status: "Active", joined: "Nov 2022", email: "s.kumar@rics.in",
  },
  {
    id: 7, name: "Deepika Rao", initials: "DR", avatarUrl: "https://i.pravatar.cc/80?img=27", color: "#be185d",
    designation: "Sustainability Consultant", specialisation: "LEED, IGBC, Green Design",
    courses: [],
    students: 0, rating: 0, reviews: 0, status: "Invited", joined: "—", email: "d.rao@ricsguest.in",
  },
];

export function InstituteFacultyPage() {
  const [search, setSearch] = useState("");

  const filtered = FACULTY.filter((f) =>
    !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.specialisation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 sm:p-7 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Faculty</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{FACULTY.filter(f => f.status === "Active").length} active · {FACULTY.filter(f => f.status === "Invited").length} invited</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "#3b82f6", color: "#fff" }}>
          <Plus className="w-4 h-4" /> Invite Faculty
        </button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search faculty..."
          className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((f) => (
          <div key={f.id} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <AvatarImg src={f.avatarUrl} fallback={f.initials} size={44} fallbackBg={f.color} style={{ borderRadius: "0.75rem" }} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.name}</p>
                    {f.status === "Active" && <CheckCircle className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />}
                  </div>
                  <p style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>{f.designation}</p>
                </div>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                style={{
                  background: f.status === "Active" ? "rgba(16,185,129,0.1)" : f.status === "Invited" ? "rgba(245,158,11,0.1)" : "rgba(107,114,128,0.1)",
                  color: f.status === "Active" ? "#10b981" : f.status === "Invited" ? "#f59e0b" : "#6b7280",
                }}
              >
                {f.status}
              </span>
            </div>

            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "10px" }}>{f.specialisation}</p>

            {f.courses.length > 0 && (
              <div className="mb-3">
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "5px" }}>Courses</p>
                <div className="flex flex-col gap-1">
                  {f.courses.map((c) => (
                    <p key={c} className="truncate px-2 py-1 rounded-lg" style={{ fontSize: "0.72rem", color: "var(--text-secondary)", background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.1)" }}>
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {f.status === "Active" && (
              <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <div>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Students</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.students.toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.rating}</p>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>({f.reviews})</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <a href={`mailto:${f.email}`} className="p-1.5 rounded-lg transition-colors" style={{ color: "#6b7280" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(107,114,128,0.08)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <button className="p-1.5 rounded-lg transition-colors" style={{ color: "#6b7280" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(107,114,128,0.08)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {f.status === "Invited" && (
              <div className="flex gap-2 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                  Resend Invite
                </button>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold" style={{ border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-secondary)" }}>
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
