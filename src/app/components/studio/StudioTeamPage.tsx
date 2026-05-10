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
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type Role = "Owner" | "Admin" | "Editor" | "Viewer";
type MemberStatus = "Active" | "Invited";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
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

const INITIAL_MEMBERS: TeamMember[] = [
  { id: "m1", name: "Arjun Mehta", email: "arjun@designstudio.in", avatar: "AM", role: "Owner", joinedDate: "Jan 15, 2024", lastActive: "2 min ago", status: "Active" },
  { id: "m2", name: "Priya Sharma", email: "priya.sharma@designstudio.in", avatar: "PS", role: "Admin", joinedDate: "Mar 8, 2024", lastActive: "1h ago", status: "Active" },
  { id: "m3", name: "Rahul Krishnan", email: "rahul.k@designstudio.in", avatar: "RK", role: "Editor", joinedDate: "Jun 22, 2024", lastActive: "3h ago", status: "Active" },
  { id: "m4", name: "Sneha Patel", email: "sneha.p@designstudio.in", avatar: "SP", role: "Editor", joinedDate: "Sep 5, 2024", lastActive: "Yesterday", status: "Active" },
  { id: "m5", name: "Vikram Desai", email: "vikram.d@designstudio.in", avatar: "VD", role: "Viewer", joinedDate: "Dec 10, 2025", lastActive: "5 days ago", status: "Active" },
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

const PERMISSIONS: { action: string; Owner: boolean; Admin: boolean; Editor: boolean; Viewer: boolean }[] = [
  { action: "Manage Team", Owner: true, Admin: true, Editor: false, Viewer: false },
  { action: "Post Jobs", Owner: true, Admin: true, Editor: true, Viewer: false },
  { action: "Edit Projects", Owner: true, Admin: true, Editor: true, Viewer: false },
  { action: "Manage BOM", Owner: true, Admin: true, Editor: true, Viewer: false },
  { action: "Publish Blogs", Owner: true, Admin: true, Editor: true, Viewer: false },
  { action: "View Analytics", Owner: true, Admin: true, Editor: true, Viewer: true },
  { action: "Manage Bookings", Owner: true, Admin: true, Editor: false, Viewer: false },
  { action: "Settings", Owner: true, Admin: false, Editor: false, Viewer: false },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [invitations, setInvitations] = useState<Invitation[]>(INITIAL_INVITATIONS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: "", role: "Editor" as Role, message: "" });
  const [roleDropdown, setRoleDropdown] = useState<string | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);

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
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #e8522a 100%)", fontSize: "0.7rem", fontWeight: 700 }}
                >
                  {member.avatar}
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
                    <th key={r} className="px-4 py-3 text-xs font-semibold text-center" style={{ color: ROLE_STYLE[r].text }}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm) => (
                  <tr key={perm.action} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <td className="px-4 py-2.5 text-xs font-medium" style={{ color: "var(--text-primary)" }}>{perm.action}</td>
                    {(["Owner", "Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                      <td key={r} className="px-4 py-2.5 text-center">
                        {perm[r] ? (
                          <Check className="w-4 h-4 mx-auto" style={{ color: "#10b981" }} />
                        ) : (
                          <X className="w-4 h-4 mx-auto" style={{ color: "rgba(0,0,0,0.15)" }} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
