import { useState } from "react";
import {
  Users, UserCheck, GraduationCap, Briefcase, Search, Filter,
  Eye, Ban, Trash2, X, MapPin, Calendar, FolderOpen, Mail,
  ArrowUpDown, ChevronDown
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  { label: "Active", value: "1,102", icon: UserCheck, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  { label: "Students", value: "389", icon: GraduationCap, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
  { label: "Professionals", value: "859", icon: Briefcase, color: "#ff6a3d", bg: "rgba(255,106,61,0.1)", border: "rgba(255,106,61,0.2)" },
];

type UserType = "Architect" | "Student" | "Engineer";
type UserStatus = "Active" | "Suspended";

interface MockUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  type: UserType;
  location: string;
  joined: string;
  portfolioCount: number;
  status: UserStatus;
  bio: string;
  projects: number;
  views: number;
  likes: number;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "Arjun Mehta", email: "arjun@example.com", avatar: "AM", type: "Architect", location: "Mumbai, MH", joined: "2025-08-12", portfolioCount: 14, status: "Active", bio: "Senior architect specializing in sustainable residential design.", projects: 14, views: 3200, likes: 890 },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", avatar: "PS", type: "Student", location: "Delhi, DL", joined: "2025-11-03", portfolioCount: 4, status: "Active", bio: "Final year architecture student at SPA Delhi.", projects: 4, views: 540, likes: 120 },
  { id: 3, name: "Vikram Rao", email: "vikram@example.com", avatar: "VR", type: "Engineer", location: "Bengaluru, KA", joined: "2025-06-20", portfolioCount: 8, status: "Active", bio: "Structural engineer with 10+ years in commercial projects.", projects: 8, views: 1800, likes: 450 },
  { id: 4, name: "Sneha Kulkarni", email: "sneha@example.com", avatar: "SK", type: "Architect", location: "Pune, MH", joined: "2025-09-15", portfolioCount: 11, status: "Suspended", bio: "Interior architect focused on hospitality spaces.", projects: 11, views: 2100, likes: 670 },
  { id: 5, name: "Rahul Gupta", email: "rahul@example.com", avatar: "RG", type: "Student", location: "Jaipur, RJ", joined: "2026-01-08", portfolioCount: 2, status: "Active", bio: "3rd year civil engineering student passionate about green buildings.", projects: 2, views: 180, likes: 35 },
  { id: 6, name: "Ananya Iyer", email: "ananya@example.com", avatar: "AI", type: "Engineer", location: "Chennai, TN", joined: "2025-07-22", portfolioCount: 6, status: "Active", bio: "MEP engineer specializing in HVAC systems.", projects: 6, views: 920, likes: 210 },
  { id: 7, name: "Karan Singh", email: "karan@example.com", avatar: "KS", type: "Architect", location: "Gurugram, HR", joined: "2025-05-10", portfolioCount: 19, status: "Active", bio: "Principal architect at a leading firm, 15 years experience.", projects: 19, views: 5400, likes: 1540 },
  { id: 8, name: "Meera Nair", email: "meera@example.com", avatar: "MN", type: "Student", location: "Kochi, KL", joined: "2026-02-14", portfolioCount: 3, status: "Active", bio: "Architecture student exploring vernacular Kerala design.", projects: 3, views: 310, likes: 75 },
];

const typeColors: Record<UserType, { color: string; bg: string }> = {
  Architect: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  Student: { color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  Engineer: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
};

const statusColors: Record<UserStatus, { color: string; bg: string }> = {
  Active: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Suspended: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export function AdminUsersManagementPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<UserType | "All">("All");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const filtered = mockUsers
    .filter((u) => {
      if (typeFilter !== "All" && u.type !== typeFilter) return false;
      if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.joined).getTime();
      const db = new Date(b.joined).getTime();
      return sortAsc ? da - db : db - da;
    });

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Users Management</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Manage individual user accounts across the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-9" placeholder="Search users by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as UserType | "All")}>
              <option value="All">All Types</option>
              <option value="Architect">Architect</option>
              <option value="Student">Student</option>
              <option value="Engineer">Engineer</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
          </div>
          <button onClick={() => setSortAsc(!sortAsc)} className="gl-input flex items-center gap-2 cursor-pointer hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
            <ArrowUpDown size={14} />
            <span style={{ fontSize: "0.85rem" }}>{sortAsc ? "Oldest First" : "Newest First"}</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["User", "Type", "Location", "Joined", "Portfolios", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3" style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{u.avatar}</div>
                      <div>
                        <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{u.name}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: typeColors[u.type].bg, color: typeColors[u.type].color }}>{u.type}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><MapPin size={12} />{u.location}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><Calendar size={12} />{new Date(u.joined).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex items-center gap-1"><FolderOpen size={12} />{u.portfolioCount}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusColors[u.status].bg, color: statusColors[u.status].color }}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedUser(u)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="View"><Eye size={15} style={{ color: "#3b82f6" }} /></button>
                      <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Suspend"><Ban size={15} style={{ color: "#f59e0b" }} /></button>
                      <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Delete"><Trash2 size={15} style={{ color: "#ef4444" }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>No users found matching your criteria.</div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="glass-card rounded-2xl w-full max-w-lg p-6 relative" style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"><X size={18} style={{ color: "var(--text-muted)" }} /></button>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{selectedUser.avatar}</div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>{selectedUser.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: typeColors[selectedUser.type].bg, color: typeColors[selectedUser.type].color }}>{selectedUser.type}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: statusColors[selectedUser.status].bg, color: statusColors[selectedUser.status].color }}>{selectedUser.status}</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>{selectedUser.bio}</p>
            <div className="space-y-3" style={{ fontSize: "0.85rem" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}><Mail size={14} /> {selectedUser.email}</div>
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}><MapPin size={14} /> {selectedUser.location}</div>
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}><Calendar size={14} /> Joined {new Date(selectedUser.joined).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: "Projects", value: selectedUser.projects, color: "#3b82f6" },
                { label: "Views", value: selectedUser.views.toLocaleString(), color: "#10b981" },
                { label: "Likes", value: selectedUser.likes.toLocaleString(), color: "#ff6a3d" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.value}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn-primary flex-1 text-sm py-2 rounded-lg cursor-pointer">Message User</button>
              <button className="flex-1 text-sm py-2 rounded-lg cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-secondary)", background: "transparent" }}>{selectedUser.status === "Active" ? "Suspend" : "Reactivate"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
