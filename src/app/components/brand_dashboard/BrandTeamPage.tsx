import { useState } from "react";
import {
  Users, Activity, Mail, Shield, Crown, Eye,
  ChevronDown, Trash2, RefreshCw, UserPlus,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

const ACCENT = "#0284c7";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";

const ROLE_COLORS: Record<Role, string> = {
  Owner: "#f59e0b",
  Admin: "#ef4444",
  Editor: "#0284c7",
  Viewer: "#6b7280",
};

const ROLE_BG: Record<Role, string> = {
  Owner: "rgba(245,158,11,0.1)",
  Admin: "rgba(239,68,68,0.1)",
  Editor: "rgba(2,132,199,0.1)",
  Viewer: "rgba(107,114,128,0.1)",
};

type PermMatrix = Record<string, Record<Role, boolean>>;

const DEFAULT_PERMS: PermMatrix = {
  "Manage Team":      { Owner: true, Admin: true,  Editor: false, Viewer: false },
  "Post Jobs":        { Owner: true, Admin: true,  Editor: true,  Viewer: false },
  "Edit Products":    { Owner: true, Admin: true,  Editor: true,  Viewer: false },
  "Manage Catalogue": { Owner: true, Admin: true,  Editor: true,  Viewer: false },
  "Publish Blogs":    { Owner: true, Admin: true,  Editor: true,  Viewer: false },
  "View Analytics":   { Owner: true, Admin: true,  Editor: true,  Viewer: true  },
  "Manage Leads":     { Owner: true, Admin: true,  Editor: false, Viewer: false },
  "Edit Profile":     { Owner: true, Admin: true,  Editor: false, Viewer: false },
};

const ROLES: Role[] = ["Owner", "Admin", "Editor", "Viewer"];
const PERMISSIONS = Object.keys(DEFAULT_PERMS);

interface Member {
  id: number;
  name: string;
  initials: string;
  avatarUrl: string;
  email: string;
  role: Role;
  joined: string;
  lastActive: string;
}

interface Invitation {
  id: number;
  email: string;
  role: Role;
  sent: string;
}

const INITIAL_MEMBERS: Member[] = [
  { id: 1, name: "Arjun Mehta",    initials: "AM", avatarUrl: "https://i.pravatar.cc/80?img=12", email: "arjun@materiallibrary.in",   role: "Owner",  joined: "Jan 15, 2024", lastActive: "2 min ago"  },
  { id: 2, name: "Priya Sharma",   initials: "PS", avatarUrl: "https://i.pravatar.cc/80?img=47", email: "priya.s@materiallibrary.in",  role: "Admin",  joined: "Mar 8, 2024",  lastActive: "1h ago"     },
  { id: 3, name: "Rahul Krishnan", initials: "RK", avatarUrl: "https://i.pravatar.cc/80?img=57", email: "rahul.k@materiallibrary.in",  role: "Editor", joined: "Jun 22, 2024", lastActive: "3h ago"     },
  { id: 4, name: "Sneha Patel",    initials: "SP", avatarUrl: "https://i.pravatar.cc/80?img=44", email: "sneha.p@materiallibrary.in",  role: "Editor", joined: "Sep 5, 2024",  lastActive: "Yesterday"  },
  { id: 5, name: "Vikram Desai",   initials: "VD", avatarUrl: "https://i.pravatar.cc/80?img=15", email: "vikram.d@materiallibrary.in", role: "Viewer", joined: "Dec 10, 2025", lastActive: "5 days ago" },
];

const INITIAL_PENDING: Invitation[] = [
  { id: 1, email: "deepa.nair@gmail.com",    role: "Editor", sent: "Mar 28, 2026" },
  { id: 2, email: "karthik.rao@outlook.com", role: "Viewer", sent: "Mar 25, 2026" },
];

function RoleBadge({ role }: { role: Role }) {
  const icons: Record<Role, React.ComponentType<{ style?: React.CSSProperties }>> = {
    Owner: Crown, Admin: Shield, Editor: Shield, Viewer: Eye,
  };
  const Icon = icons[role];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: ROLE_BG[role], color: ROLE_COLORS[role] }}
    >
      <Icon style={{ width: 9, height: 9 }} />
      {role}
    </span>
  );
}

function Toggle({
  enabled,
  onChange,
  disabled,
  color,
}: {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className="relative inline-flex items-center rounded-full flex-shrink-0"
      style={{
        width: 36,
        height: 20,
        background: enabled ? (color ?? ACCENT) : "rgba(0,0,0,0.15)",
        cursor: disabled ? "default" : "pointer",
        padding: 2,
        transition: "background 0.2s",
      }}
    >
      <span
        className="rounded-full bg-white block"
        style={{
          width: 16,
          height: 16,
          transform: `translateX(${enabled ? 16 : 0}px)`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "transform 0.2s",
        }}
      />
    </button>
  );
}

export function BrandTeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [pending, setPending] = useState<Invitation[]>(INITIAL_PENDING);
  const [perms, setPerms] = useState<PermMatrix>(DEFAULT_PERMS);
  const [matrixOpen, setMatrixOpen] = useState(true);
  const [openRoleId, setOpenRoleId] = useState<number | null>(null);

  const admins  = members.filter(m => m.role === "Admin").length;
  const editors = members.filter(m => m.role === "Editor").length;
  const viewers = members.filter(m => m.role === "Viewer").length;
  const roleBreakdown = `${admins}A / ${editors}E / ${viewers}V`;

  const stats = [
    { label: "Total Members",       value: String(members.length), icon: Users,    color: ACCENT,     bg: "rgba(2,132,199,0.1)",    card: false },
    { label: "Active",              value: String(members.length), icon: Activity, color: "#10b981",  bg: "rgba(16,185,129,0.1)",   card: true  },
    { label: "Pending Invitations", value: String(pending.length), icon: Mail,     color: "#f59e0b",  bg: "rgba(245,158,11,0.1)",   card: false },
    { label: "Roles",               value: roleBreakdown,          icon: Shield,   color: "#8b5cf6",  bg: "rgba(139,92,246,0.1)",   card: false },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(2,132,199,0.1)" }}>
            <Users style={{ width: 20, height: 20, color: ACCENT }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Team Management</h1>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 1 }}>Manage your brand team and permissions</p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white"
          style={{ background: "#FF6A3D" }}
        >
          <UserPlus style={{ width: 15, height: 15 }} />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-4"
              style={{
                background: s.card ? s.bg : "white",
                border: `1px solid ${s.card ? s.color + "40" : "rgba(0,0,0,0.07)"}`,
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                <Icon style={{ width: 17, height: 17, color: s.color }} />
              </div>
              <div style={{ fontSize: s.value.length > 4 ? "1.05rem" : "1.7rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Team Members */}
      <div
        className="rounded-2xl overflow-visible"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Team Members</h2>
        </div>
        {members.map((m, i) => (
          <div
            key={m.id}
            className="flex items-center gap-4 px-5 py-4"
            style={{ borderBottom: i < members.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
          >
            <AvatarImg src={m.avatarUrl} fallback={m.initials} size={44} fallbackBg={`linear-gradient(135deg,${ROLE_COLORS[m.role]},${ROLE_COLORS[m.role]}aa)`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</span>
                <RoleBadge role={m.role} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{m.email}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>
                Joined {m.joined} &nbsp;·&nbsp; Last active: {m.lastActive}
              </div>
            </div>
            {m.role !== "Owner" && (
              <div className="flex items-center gap-2 flex-shrink-0 relative">
                <div className="relative">
                  <button
                    onClick={() => setOpenRoleId(openRoleId === m.id ? null : m.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
                    style={{ border: "1px solid rgba(0,0,0,0.15)", color: "var(--text-primary)", background: "white" }}
                  >
                    Change Role <ChevronDown style={{ width: 12, height: 12 }} />
                  </button>
                  {openRoleId === m.id && (
                    <div
                      className="absolute right-0 top-full mt-1 rounded-xl z-30 overflow-hidden"
                      style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: 130 }}
                    >
                      {(["Admin", "Editor", "Viewer"] as Role[]).map(r => (
                        <button
                          key={r}
                          onClick={() => {
                            setMembers(prev => prev.map(mb => mb.id === m.id ? { ...mb, role: r } : mb));
                            setOpenRoleId(null);
                          }}
                          className="w-full px-3 py-2 text-left text-[13px]"
                          style={{
                            color: m.role === r ? ROLE_COLORS[r] : "var(--text-primary)",
                            background: m.role === r ? ROLE_BG[r] : "transparent",
                            fontWeight: m.role === r ? 700 : 400,
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setMembers(prev => prev.filter(mb => mb.id !== m.id))}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)" }}
                >
                  <Trash2 style={{ width: 14, height: 14 }} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pending Invitations */}
      {pending.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
        >
          <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Pending Invitations</h2>
          </div>
          {pending.map((inv, i) => (
            <div
              key={inv.id}
              className="flex items-center gap-4 px-5 py-4"
              style={{ borderBottom: i < pending.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(245,158,11,0.1)" }}
              >
                <Mail style={{ width: 16, height: 16, color: "#f59e0b" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{inv.email}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                  Role: {inv.role} &nbsp;·&nbsp; Sent: {inv.sent} &nbsp;·&nbsp;{" "}
                  <span style={{ color: "#f59e0b", fontWeight: 600 }}>Pending</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
                  style={{ border: "1px solid rgba(0,0,0,0.15)", color: "var(--text-primary)", background: "white" }}
                >
                  <RefreshCw style={{ width: 11, height: 11 }} /> Resend
                </button>
                <button
                  onClick={() => setPending(prev => prev.filter(p => p.id !== inv.id))}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)" }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role Permissions Matrix */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <button
          className="w-full flex items-center justify-between px-5 py-4"
          style={{ borderBottom: matrixOpen ? "1px solid rgba(0,0,0,0.06)" : "none" }}
          onClick={() => setMatrixOpen(o => !o)}
        >
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Role Permissions Matrix</h2>
          <ChevronDown
            style={{
              width: 16, height: 16, color: "var(--text-muted)",
              transform: matrixOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {matrixOpen && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <th
                    className="px-5 py-3 text-left"
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}
                  >
                    Permission
                  </th>
                  {ROLES.map(role => (
                    <th
                      key={role}
                      className="px-4 py-3 text-center"
                      style={{ fontSize: "0.82rem", fontWeight: 700, color: ROLE_COLORS[role] }}
                    >
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm, i) => (
                  <tr key={perm} style={{ borderBottom: i < PERMISSIONS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                    <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {perm}
                    </td>
                    {ROLES.map(role => (
                      <td key={role} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <Toggle
                            enabled={perms[perm][role]}
                            disabled={role === "Owner"}
                            color={ROLE_COLORS[role]}
                            onChange={() => {
                              if (role === "Owner") return;
                              setPerms(prev => ({
                                ...prev,
                                [perm]: { ...prev[perm], [role]: !prev[perm][role] },
                              }));
                            }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
