import { useState, useMemo } from "react";
import {
  Users,
  Plus,
  X,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Crown,
  Mail,
  Clock,
  Check,
  RefreshCw,
  Trash2,
  ChevronDown,
  Activity,
  UserPlus,
  Settings,
  FileEdit,
  Briefcase,
  BarChart3,
  CalendarCheck,
  PenSquare,
  BookOpen,
  CalendarDays,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Role = "Owner" | "Admin" | "Editor" | "Viewer";
type MemberStatus = "Active" | "Invited";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarUrl: string;
  role: Role;
  joinedDate: string;
  lastActive: string;
  status: MemberStatus;
}

interface Invitation {
  id: string;
  email: string;
  role: Role;
  sentDate: string;
  status: "Pending" | "Expired";
}

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  icon: typeof Users;
  color: string;
}

/* ── Mock Data ─────────────────────────────────────────────────────── */

const MEMBER_AVATARS: Record<string, string> = {
  m1: "https://i.pravatar.cc/80?img=12",
  m2: "https://i.pravatar.cc/80?img=47",
  m3: "https://i.pravatar.cc/80?img=57",
  m4: "https://i.pravatar.cc/80?img=44",
  m5: "https://i.pravatar.cc/80?img=15",
};

const INITIAL_MEMBERS: TeamMember[] = [
  { id: "m1", name: "Arjun Mehta", email: "arjun@designstudio.in", avatar: "AM", avatarUrl: MEMBER_AVATARS.m1, role: "Owner", joinedDate: "Jan 15, 2024", lastActive: "2 min ago", status: "Active" },
  { id: "m2", name: "Priya Sharma", email: "priya.sharma@designstudio.in", avatar: "PS", avatarUrl: MEMBER_AVATARS.m2, role: "Admin", joinedDate: "Mar 8, 2024", lastActive: "1h ago", status: "Active" },
  { id: "m3", name: "Rahul Krishnan", email: "rahul.k@designstudio.in", avatar: "RK", avatarUrl: MEMBER_AVATARS.m3, role: "Editor", joinedDate: "Jun 22, 2024", lastActive: "3h ago", status: "Active" },
  { id: "m4", name: "Sneha Patel", email: "sneha.p@designstudio.in", avatar: "SP", avatarUrl: MEMBER_AVATARS.m4, role: "Editor", joinedDate: "Sep 5, 2024", lastActive: "Yesterday", status: "Active" },
  { id: "m5", name: "Vikram Desai", email: "vikram.d@designstudio.in", avatar: "VD", avatarUrl: MEMBER_AVATARS.m5, role: "Viewer", joinedDate: "Dec 10, 2025", lastActive: "5 days ago", status: "Active" },
];

const INITIAL_INVITATIONS: Invitation[] = [
  { id: "inv1", email: "deepa.nair@gmail.com", role: "Editor", sentDate: "Mar 28, 2026", status: "Pending" },
  { id: "inv2", email: "karthik.rao@outlook.com", role: "Viewer", sentDate: "Mar 25, 2026", status: "Pending" },
];

const ACTIVITY_LOG: ActivityItem[] = [
  { id: "a1", text: "Priya Sharma edited project 'Villa Greenfield - Structural Design'", time: "1h ago", icon: FileEdit, color: "#3b82f6" },
  { id: "a2", text: "Arjun Mehta invited deepa.nair@gmail.com as Editor", time: "3h ago", icon: UserPlus, color: "#10b981" },
  { id: "a3", text: "Rahul Krishnan published blog 'AAC vs Red Brick: A Comparative Study'", time: "5h ago", icon: PenSquare, color: "#a855f7" },
  { id: "a4", text: "Sneha Patel updated BOM for project 'Lakewood Residences'", time: "Yesterday", icon: BookOpen, color: "#f59e0b" },
  { id: "a5", text: "Arjun Mehta changed Vikram Desai's role to Viewer", time: "2 days ago", icon: Shield, color: "#ef4444" },
  { id: "a6", text: "Priya Sharma accepted a booking from Ravi Sharma", time: "3 days ago", icon: CalendarCheck, color: "#10b981" },
];

const ROLE_STYLE: Record<Role, { bg: string; text: string; icon: typeof Crown }> = {
  Owner: { bg: "rgba(245,158,11,0.12)", text: "#d97706", icon: Crown },
  Admin: { bg: "rgba(239,68,68,0.12)", text: "#dc2626", icon: ShieldAlert },
  Editor: { bg: "rgba(59,130,246,0.12)", text: "#2563eb", icon: ShieldCheck },
  Viewer: { bg: "rgba(156,163,175,0.12)", text: "#6b7280", icon: Eye },
};

type PermRow = { action: string; Owner: boolean; Admin: boolean; Editor: boolean; Viewer: boolean };

const DEFAULT_PERMISSIONS: PermRow[] = [
  { action: "Manage Team",     Owner: true, Admin: true,  Editor: false, Viewer: false },
  { action: "Post Jobs",       Owner: true, Admin: true,  Editor: true,  Viewer: false },
  { action: "Edit Projects",   Owner: true, Admin: true,  Editor: true,  Viewer: false },
  { action: "Manage BOM",      Owner: true, Admin: true,  Editor: true,  Viewer: false },
  { action: "Publish Blogs",   Owner: true, Admin: true,  Editor: true,  Viewer: false },
  { action: "View Analytics",  Owner: true, Admin: true,  Editor: true,  Viewer: true  },
  { action: "Manage Bookings", Owner: true, Admin: true,  Editor: false, Viewer: false },
  { action: "Settings",        Owner: true, Admin: false, Editor: false, Viewer: false },
];

/* ── Attendance Data ───────────────────────────────────────────────── */

type AttendanceStatus = "present" | "remote" | "leave" | "absent" | "halfday";

const WEEK_DAYS = [
  { key: "mon", label: "Mon", date: 25, isToday: true  },
  { key: "tue", label: "Tue", date: 26, isToday: false },
  { key: "wed", label: "Wed", date: 27, isToday: false },
  { key: "thu", label: "Thu", date: 28, isToday: false },
  { key: "fri", label: "Fri", date: 29, isToday: false },
];

const ATTENDANCE_CFG: Record<AttendanceStatus, { label: string; short: string; color: string; bg: string }> = {
  present: { label: "In Office", short: "IN", color: "#10b981", bg: "rgba(16,185,129,0.12)"  },
  remote:  { label: "Remote",    short: "RM", color: "#3b82f6", bg: "rgba(59,130,246,0.12)"  },
  leave:   { label: "On Leave",  short: "OL", color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
  absent:  { label: "Absent",    short: "AB", color: "#ef4444", bg: "rgba(239,68,68,0.12)"   },
  halfday: { label: "Half Day",  short: "HD", color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
};

const ATTENDANCE_RECORDS = [
  { memberId: "m1", name: "Arjun Mehta",    avatar: "AM", role: "Owner",  checkIn: "09:02 AM",
    schedule: { mon: "present", tue: "present", wed: "present", thu: "present", fri: "present" } },
  { memberId: "m2", name: "Priya Sharma",   avatar: "PS", role: "Admin",  checkIn: "09:15 AM",
    schedule: { mon: "present", tue: "remote",  wed: "present", thu: "remote",  fri: "present" } },
  { memberId: "m3", name: "Rahul Krishnan", avatar: "RK", role: "Editor", checkIn: "09:47 AM",
    schedule: { mon: "present", tue: "present", wed: "remote",  thu: "leave",   fri: "leave"   } },
  { memberId: "m4", name: "Sneha Patel",    avatar: "SP", role: "Editor", checkIn: null,
    schedule: { mon: "remote",  tue: "present", wed: "present", thu: "halfday", fri: "present" } },
  { memberId: "m5", name: "Vikram Desai",   avatar: "VD", role: "Viewer", checkIn: null,
    schedule: { mon: "absent",  tue: "absent",  wed: "present", thu: "present", fri: "remote"  } },
] as const;

/* ── Attendance Section ─────────────────────────────────────────────── */

function AttendanceSection() {
  const todayKey = "mon";

  const todayStats = ATTENDANCE_RECORDS.reduce((acc, m) => {
    const s = m.schedule[todayKey] as AttendanceStatus;
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {} as Partial<Record<AttendanceStatus, number>>);

  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Team Attendance</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}>
            Week of May 25
          </span>
        </div>
        <button className="btn-secondary !text-xs !py-1.5 !px-3">Mark Attendance</button>
      </div>

      {/* Today summary */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {(["present", "remote", "leave", "absent"] as AttendanceStatus[]).map((s) => {
          const cfg = ATTENDANCE_CFG[s];
          return (
            <div key={s} className="rounded-xl p-2.5 text-center" style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: cfg.color, lineHeight: 1.1 }}>{todayStats[s] ?? 0}</div>
              <div style={{ fontSize: "0.62rem", color: cfg.color, fontWeight: 600, marginTop: 2 }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Weekly grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="text-left pb-2 pr-3" style={{ width: 150, fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>
                Member
              </th>
              {WEEK_DAYS.map((day) => (
                <th key={day.key} className="pb-2 text-center" style={{ minWidth: 52 }}>
                  <div className="flex flex-col items-center gap-0.5">
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: day.isToday ? "#ff6a3d" : "var(--text-muted)" }}>
                      {day.label}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center mx-auto"
                      style={{
                        fontSize: "0.62rem", fontWeight: 800,
                        background: day.isToday ? "#ff6a3d" : "transparent",
                        color: day.isToday ? "#fff" : "var(--text-muted)",
                      }}
                    >
                      {day.date}
                    </span>
                  </div>
                </th>
              ))}
              <th className="pb-2 text-center" style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, minWidth: 72 }}>
                Check-in
              </th>
            </tr>
          </thead>
          <tbody>
            {ATTENDANCE_RECORDS.map((member, idx) => (
              <tr key={member.memberId} style={{ borderTop: idx === 0 ? "none" : "1px solid rgba(0,0,0,0.04)" }}>
                <td className="py-2 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 overflow-hidden" style={{ border: "1.5px solid rgba(255,106,61,0.2)" }}>
                      <img
                        src={MEMBER_AVATARS[member.memberId] ?? ""}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = "none";
                          (el.nextElementSibling as HTMLElement | null)?.style.setProperty("display", "flex");
                        }}
                      />
                      <div className="w-full h-full items-center justify-center text-white hidden" style={{ background: "linear-gradient(135deg,#ff6a3d,#e8522a)", fontSize: "0.5rem", fontWeight: 800 }}>
                        {member.avatar}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                        {member.name.split(" ")[0]}
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>{member.role}</div>
                    </div>
                  </div>
                </td>
                {WEEK_DAYS.map((day) => {
                  const status = member.schedule[day.key as keyof typeof member.schedule] as AttendanceStatus;
                  const cfg = ATTENDANCE_CFG[status];
                  return (
                    <td key={day.key} className="py-2 text-center">
                      <span
                        className="inline-flex items-center justify-center rounded-lg font-bold mx-auto"
                        style={{
                          width: 36, height: 22, fontSize: "0.57rem",
                          background: day.isToday ? cfg.bg : cfg.bg.replace("0.12", "0.06"),
                          color: cfg.color,
                          border: day.isToday ? `1px solid ${cfg.color}35` : "none",
                          opacity: day.isToday ? 1 : 0.7,
                        }}
                      >
                        {cfg.short}
                      </span>
                    </td>
                  );
                })}
                <td className="py-2 text-center">
                  {member.checkIn ? (
                    <span style={{ fontSize: "0.65rem", color: "#10b981", fontWeight: 600 }}>{member.checkIn}</span>
                  ) : (member.schedule[todayKey] as AttendanceStatus) === "absent" ? (
                    <span style={{ fontSize: "0.65rem", color: "#ef4444", fontWeight: 600 }}>—</span>
                  ) : (member.schedule[todayKey] as AttendanceStatus) === "remote" ? (
                    <span style={{ fontSize: "0.65rem", color: "#3b82f6", fontWeight: 600 }}>Remote</span>
                  ) : (
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 flex-wrap" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        {(Object.values(ATTENDANCE_CFG)).map((cfg) => (
          <span key={cfg.label} className="flex items-center gap-1.5" style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
            {cfg.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PermToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative inline-flex items-center rounded-full transition-colors mx-auto"
      style={{
        width: 30,
        height: 17,
        background: checked ? "#6366f1" : "rgba(0,0,0,0.13)",
        flexShrink: 0,
      }}
    >
      <span
        className="inline-block rounded-full bg-white shadow-sm transition-transform"
        style={{
          width: 13,
          height: 13,
          transform: checked ? "translateX(15px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [invitations, setInvitations] = useState<Invitation[]>(INITIAL_INVITATIONS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: "", role: "Editor" as Role, message: "" });
  const [roleDropdown, setRoleDropdown] = useState<string | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<PermRow[]>(DEFAULT_PERMISSIONS);

  function togglePermission(action: string, role: Exclude<Role, "Owner">) {
    setPermissions((prev) =>
      prev.map((p) => p.action === action ? { ...p, [role]: !p[role] } : p)
    );
  }

  const stats = useMemo(() => ({
    total: members.length,
    active: members.filter((m) => m.status === "Active").length,
    pending: invitations.filter((i) => i.status === "Pending").length,
    roles: {
      Owner: members.filter((m) => m.role === "Owner").length,
      Admin: members.filter((m) => m.role === "Admin").length,
      Editor: members.filter((m) => m.role === "Editor").length,
      Viewer: members.filter((m) => m.role === "Viewer").length,
    },
  }), [members, invitations]);

  const handleInvite = () => {
    if (!inviteForm.email.trim()) return;
    setInvitations((prev) => [
      { id: `inv-${Date.now()}`, email: inviteForm.email, role: inviteForm.role, sentDate: "Just now", status: "Pending" },
      ...prev,
    ]);
    setInviteForm({ email: "", role: "Editor", message: "" });
    setInviteOpen(false);
  };

  const changeRole = (memberId: string, newRole: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
    setRoleDropdown(null);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const cancelInvite = (id: string) => {
    setInvitations((prev) => prev.filter((i) => i.id !== id));
  };

  const statCards = [
    { label: "Total Members", value: stats.total, icon: Users, color: "var(--accent)" },
    { label: "Active", value: stats.active, icon: Activity, color: "#10b981" },
    { label: "Pending Invitations", value: stats.pending, icon: Mail, color: "#f59e0b" },
    { label: "Roles", value: `${stats.roles.Admin}A / ${stats.roles.Editor}E / ${stats.roles.Viewer}V`, icon: Shield, color: "#a855f7" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
            <Users className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Team Management</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Manage your studio team and permissions</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setInviteOpen(true)}>
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Team Members ────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Team Members</h3>
        <div className="space-y-3">
          {members.map((member) => {
            const rs = ROLE_STYLE[member.role];
            const RoleIcon = rs.icon;
            return (
              <div
                key={member.id}
                className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-black/[0.02]"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden" style={{ border: "2px solid rgba(255,106,61,0.2)" }}>
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      (el.nextElementSibling as HTMLElement | null)?.style.setProperty("display", "flex");
                    }}
                  />
                  <div className="w-full h-full items-center justify-center text-white text-[0.7rem] font-700 hidden" style={{ background: "linear-gradient(135deg,#ff6a3d,#e8522a)", fontWeight: 700 }}>
                    {member.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{member.name}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: rs.bg, color: rs.text }}>
                      <RoleIcon className="w-3 h-3" /> {member.role}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{member.email}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Joined {member.joinedDate}</span>
                    <span>Last active: {member.lastActive}</span>
                  </div>
                </div>
                {member.role !== "Owner" && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="relative">
                      <button
                        className="btn-secondary !text-xs !py-1.5 !px-3"
                        onClick={() => setRoleDropdown(roleDropdown === member.id ? null : member.id)}
                      >
                        Change Role <ChevronDown className="w-3 h-3" />
                      </button>
                      {roleDropdown === member.id && (
                        <div className="absolute right-0 mt-1 w-36 rounded-xl shadow-lg z-20 py-1" style={{ background: "var(--bg-base)", border: "1px solid rgba(0,0,0,0.08)" }}>
                          {(["Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                            <button
                              key={r}
                              className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-black/5"
                              style={{ color: member.role === r ? "var(--accent)" : "var(--text-primary)" }}
                              onClick={() => changeRole(member.id, r)}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(239,68,68,0.10)" }}
                      onClick={() => removeMember(member.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Attendance ──────────────────────────────────────────────── */}
      <AttendanceSection />

      {/* ── Pending Invitations ─────────────────────────────────────── */}
      {invitations.length > 0 && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Pending Invitations</h3>
          <div className="space-y-2">
            {invitations.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)" }}>
                    <Mail className="w-4 h-4" style={{ color: "#d97706" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{inv.email}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Role: {inv.role} &middot; Sent: {inv.sentDate} &middot;{" "}
                      <span style={{ color: "#d97706" }}>{inv.status}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary !text-xs !py-1.5 !px-3">
                    <RefreshCw className="w-3 h-3" /> Resend
                  </button>
                  <button
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.10)" }}
                    onClick={() => cancelInvite(inv.id)}
                  >
                    <X className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Role Permissions Matrix ─────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <button
          className="flex items-center justify-between w-full"
          onClick={() => setShowPermissions(!showPermissions)}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Role Permissions Matrix</h3>
          <ChevronDown className="w-4 h-4 transition-transform" style={{ color: "var(--text-muted)", transform: showPermissions ? "rotate(180deg)" : "none" }} />
        </button>
        {showPermissions && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  <th className="px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Permission</th>
                  {(["Owner", "Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                    <th key={r} className="px-4 py-3 text-xs font-semibold text-center" style={{ color: ROLE_STYLE[r].text }}>
                      <div className="flex flex-col items-center gap-1">
                        {r}
                        {r === "Owner" && <span className="text-[9px] font-normal opacity-60">locked</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.action} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--text-primary)" }}>{perm.action}</td>
                    {/* Owner — always on, locked */}
                    <td className="px-4 py-3 text-center">
                      <Check className="w-4 h-4 mx-auto" style={{ color: "#10b981", opacity: 0.5 }} />
                    </td>
                    {/* Admin, Editor, Viewer — toggleable */}
                    {(["Admin", "Editor", "Viewer"] as Exclude<Role, "Owner">[]).map((r) => (
                      <td key={r} className="px-4 py-3">
                        <div className="flex justify-center">
                          <PermToggle
                            checked={perm[r]}
                            onChange={() => togglePermission(perm.action, r)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
              Changes apply immediately. Owner permissions are fixed and cannot be modified.
            </p>
          </div>
        )}
      </div>

      {/* ── Activity Log ────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Recent Team Activity</h3>
        <div className="space-y-3">
          {ACTIVITY_LOG.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl transition-all" style={{ background: "rgba(0,0,0,0.02)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${item.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.text}</p>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Invite Modal ────────────────────────────────────────────── */}
      {inviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setInviteOpen(false)}
        >
          <div className="glass-card-strong w-full max-w-md !rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Invite Team Member</h2>
              <button onClick={() => setInviteOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Email Address *</label>
                <input type="email" className="gl-input" placeholder="colleague@example.com" value={inviteForm.email} onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Role</label>
                <select className="gl-input" value={inviteForm.role} onChange={(e) => setInviteForm((f) => ({ ...f, role: e.target.value as Role }))}>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Message (optional)</label>
                <textarea className="gl-input" rows={3} placeholder="Add a personal message..." value={inviteForm.message} onChange={(e) => setInviteForm((f) => ({ ...f, message: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleInvite}>
                  <Mail className="w-4 h-4" /> Send Invite
                </button>
                <button className="btn-secondary" onClick={() => setInviteOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
