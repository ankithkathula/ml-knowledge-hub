import { useState } from "react";
import {
  Users2, Plus, Shield, Check, X, Trash2, Mail,
  Clock, ChevronDown, Crown, ShieldCheck, Eye,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

const ACCENT = "#ff6a3d";

// ─── Types ───────────────────────────────────────────────────────────────────

type InternalRole = "Super Admin" | "Admin" | "Staff" | "Viewer";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: InternalRole;
  joinedAt: string;
  lastActive: string;
  initials: string;
  avatarUrl: string;
  avatarColor: string;
  isSelf?: boolean;
}

interface PendingInvite {
  id: number;
  email: string;
  role: InternalRole;
  sentAt: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INIT_MEMBERS: TeamMember[] = [
  { id: 1,  name: "Raj Sharma",    email: "raj@materiallibrary.org",   role: "Super Admin", joinedAt: "Jan 2023", lastActive: "Just now",   initials: "RS", avatarUrl: "https://i.pravatar.cc/80?img=56", avatarColor: "#ff6a3d", isSelf: true },
  { id: 2,  name: "Priya Verma",   email: "priya@materiallibrary.org", role: "Admin",       joinedAt: "Mar 2023", lastActive: "2h ago",     initials: "PV", avatarUrl: "https://i.pravatar.cc/80?img=43", avatarColor: "#3b82f6" },
  { id: 3,  name: "Ankit Mehta",   email: "ankit@materiallibrary.org", role: "Admin",       joinedAt: "Jun 2023", lastActive: "Yesterday",  initials: "AM", avatarUrl: "https://i.pravatar.cc/80?img=19", avatarColor: "#8b5cf6" },
  { id: 4,  name: "Deepa Kumar",   email: "deepa@materiallibrary.org", role: "Staff",       joinedAt: "Sep 2023", lastActive: "3h ago",     initials: "DK", avatarUrl: "https://i.pravatar.cc/80?img=55", avatarColor: "#10b981" },
  { id: 5,  name: "Rohan Singh",   email: "rohan@materiallibrary.org", role: "Staff",       joinedAt: "Nov 2023", lastActive: "1d ago",     initials: "RS", avatarUrl: "https://i.pravatar.cc/80?img=70", avatarColor: "#f59e0b" },
  { id: 6,  name: "Nisha Patel",   email: "nisha@materiallibrary.org", role: "Viewer",      joinedAt: "Feb 2024", lastActive: "5d ago",     initials: "NP", avatarUrl: "https://i.pravatar.cc/80?img=36", avatarColor: "#ec4899" },
];

const INIT_INVITES: PendingInvite[] = [
  { id: 1, email: "sana@materiallibrary.org",  role: "Staff",  sentAt: "2d ago" },
  { id: 2, email: "kunal@materiallibrary.org", role: "Admin",  sentAt: "5d ago" },
];

// ─── Role config ──────────────────────────────────────────────────────────────

const ROLE_META: Record<InternalRole, { color: string; bg: string; Icon: React.ElementType; description: string }> = {
  "Super Admin": { color: "#ef4444", bg: "rgba(239,68,68,0.10)",   Icon: Crown,       description: "Unrestricted access — billing, system config, RBAC, team management" },
  "Admin":       { color: "#ff6a3d", bg: "rgba(255,106,61,0.10)",  Icon: ShieldCheck, description: "Full platform management — content, brands, users, approvals, analytics" },
  "Staff":       { color: "#3b82f6", bg: "rgba(59,130,246,0.10)",  Icon: Shield,      description: "Day-to-day ops — approvals, content editing, KC bookings, support" },
  "Viewer":      { color: "#6b7280", bg: "rgba(107,114,128,0.10)", Icon: Eye,         description: "Read-only access to analytics and reporting dashboards" },
};

type PermLevel = "full" | "read" | "none";

const ROLE_PERMISSIONS: { area: string; superAdmin: PermLevel; admin: PermLevel; staff: PermLevel; viewer: PermLevel }[] = [
  { area: "Taxonomy & Products",  superAdmin: "full", admin: "full", staff: "none", viewer: "read" },
  { area: "Brands & Studios",     superAdmin: "full", admin: "full", staff: "read", viewer: "read" },
  { area: "Users & RBAC",         superAdmin: "full", admin: "read", staff: "none", viewer: "none" },
  { area: "Content & News",       superAdmin: "full", admin: "full", staff: "full", viewer: "read" },
  { area: "Jobs & Courses",       superAdmin: "full", admin: "full", staff: "read", viewer: "read" },
  { area: "Analytics",            superAdmin: "full", admin: "full", staff: "read", viewer: "full" },
  { area: "KC & Samples",         superAdmin: "full", admin: "full", staff: "full", viewer: "read" },
  { area: "Ads & Subscriptions",  superAdmin: "full", admin: "read", staff: "none", viewer: "none" },
  { area: "Billing & System",     superAdmin: "full", admin: "none", staff: "none", viewer: "none" },
  { area: "Team Management",      superAdmin: "full", admin: "none", staff: "none", viewer: "none" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function PermBadge({ level }: { level: PermLevel }) {
  if (level === "full")
    return (
      <div className="w-6 h-6 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
        <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
      </div>
    );
  if (level === "read")
    return (
      <div className="w-6 h-6 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)" }}>
        <Eye className="w-3 h-3" style={{ color: "#eab308" }} />
      </div>
    );
  return (
    <div className="w-6 h-6 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}>
      <X className="w-3 h-3" style={{ color: "#d1d5db" }} />
    </div>
  );
}

function RoleBadge({ role }: { role: InternalRole }) {
  const m = ROLE_META[role];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: m.bg, color: m.color }}>
      <m.Icon className="w-3 h-3" /> {role}
    </span>
  );
}

const ALL_ROLES: InternalRole[] = ["Super Admin", "Admin", "Staff", "Viewer"];

// ─── Main page ────────────────────────────────────────────────────────────────

export function AdminTeamPage() {
  const [tab, setTab] = useState<"members" | "invites" | "permissions">("members");
  const [members, setMembers] = useState<TeamMember[]>(INIT_MEMBERS);
  const [invites, setInvites] = useState<PendingInvite[]>(INIT_INVITES);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState<number | null>(null);
  const [editingRole, setEditingRole] = useState<number | null>(null);

  const roleCounts = ALL_ROLES.reduce<Record<InternalRole, number>>((acc, r) => {
    acc[r] = members.filter((m) => m.role === r).length;
    return acc;
  }, {} as Record<InternalRole, number>);

  function changeRole(memberId: number, newRole: InternalRole) {
    setMembers((prev) => prev.map((m) => m.id === memberId ? { ...m, role: newRole } : m));
    setEditingRole(null);
  }

  function removeMember(memberId: number) {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    setRemoveConfirm(null);
  }

  function cancelInvite(inviteId: number) {
    setInvites((prev) => prev.filter((i) => i.id !== inviteId));
  }

  function addInvite(email: string, role: InternalRole) {
    setInvites((prev) => [
      { id: Date.now(), email, role, sentAt: "Just now" },
      ...prev,
    ]);
    setShowInviteModal(false);
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: ACCENT }}>
            <Users2 className="w-3.5 h-3.5" /> Super Admin Console
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>Team & Access Control</h1>
          <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", marginTop: 3 }}>
            Manage who has access to the Super Admin Console and what they can do.
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
          style={{ background: ACCENT }}
        >
          <Plus className="w-4 h-4" /> Invite member
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {ALL_ROLES.map((r) => {
          const m = ROLE_META[r];
          return (
            <div key={r} className="rounded-xl p-3.5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: m.bg }}>
                <m.Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>{roleCounts[r]}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 1 }}>{r}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background: "rgba(0,0,0,0.04)", width: "fit-content" }}>
        {([
          { key: "members",     label: `Members (${members.length})` },
          { key: "invites",     label: `Pending (${invites.length})` },
          { key: "permissions", label: "Role Permissions" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: tab === key ? "white" : "transparent",
              color: tab === key ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: tab === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab: Members ── */}
      {tab === "members" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["Member", "Role", "Joined", "Last active", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => {
                  const MemberRoleIcon = ROLE_META[member.role].Icon;
                  return (
                  <tr
                    key={member.id}
                    style={{ borderBottom: idx < members.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
                  >
                    {/* Member */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <AvatarImg src={member.avatarUrl} fallback={member.initials} size={36} fallbackBg={member.avatarColor} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{member.name}</span>
                            {member.isSelf && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(255,106,61,0.10)", color: ACCENT }}>You</span>}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{member.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role — editable dropdown */}
                    <td className="px-4 py-3">
                      {member.isSelf ? (
                        <RoleBadge role={member.role} />
                      ) : (
                        <div className="relative inline-block">
                          <button
                            onClick={() => setEditingRole(editingRole === member.id ? null : member.id)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors"
                            style={{ background: ROLE_META[member.role].bg, color: ROLE_META[member.role].color }}
                          >
                            <MemberRoleIcon className="w-3 h-3" />
                            <span className="text-[11px] font-semibold">{member.role}</span>
                            <ChevronDown className="w-3 h-3 opacity-70" />
                          </button>
                          {editingRole === member.id && (
                            <div
                              className="absolute left-0 top-full mt-1 w-44 rounded-xl overflow-hidden z-20"
                              style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                            >
                              {ALL_ROLES.map((r) => {
                                const DropdownIcon = ROLE_META[r].Icon;
                                return (
                                <button
                                  key={r}
                                  onClick={() => changeRole(member.id, r)}
                                  className="w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors"
                                  style={{
                                    background: member.role === r ? ROLE_META[r].bg : "transparent",
                                    color: ROLE_META[r].color,
                                  }}
                                  onMouseEnter={(e) => { if (member.role !== r) (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)"; }}
                                  onMouseLeave={(e) => { if (member.role !== r) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                >
                                  <DropdownIcon className="w-3.5 h-3.5" />
                                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{r}</span>
                                  {member.role === r && <Check className="w-3 h-3 ml-auto" />}
                                </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3">
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{member.joinedAt}</span>
                    </td>

                    {/* Last active */}
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        <Clock className="w-3 h-3" /> {member.lastActive}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      {!member.isSelf && (
                        removeConfirm === member.id ? (
                          <div className="flex items-center gap-2">
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Remove?</span>
                            <button
                              onClick={() => removeMember(member.id)}
                              className="px-2 py-1 rounded-lg text-[11px] font-semibold text-white"
                              style={{ background: "#ef4444" }}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setRemoveConfirm(null)}
                              className="px-2 py-1 rounded-lg text-[11px] font-semibold"
                              style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-secondary)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRemoveConfirm(member.id)}
                            className="p-2 rounded-lg transition-colors"
                            title="Remove member"
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                          >
                            <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Pending Invites ── */}
      {tab === "invites" && (
        <div className="space-y-3">
          {invites.length === 0 && (
            <div className="rounded-2xl p-10 text-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
              <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No pending invitations.</p>
            </div>
          )}
          {invites.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.05)" }}>
                  <Mail className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="min-w-0">
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{inv.email}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <RoleBadge role={inv.role} />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>· Sent {inv.sentAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: `rgba(255,106,61,0.08)`, color: ACCENT }}
                >
                  Resend
                </button>
                <button
                  onClick={() => cancelInvite(inv.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Role Permissions ── */}
      {tab === "permissions" && (
        <div className="space-y-5">
          {/* Role cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_ROLES.map((role) => {
              const m = ROLE_META[role];
              return (
                <div key={role} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                      <m.Icon className="w-4.5 h-4.5" style={{ color: m.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{role}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{roleCounts[role]} member{roleCounts[role] !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{m.description}</p>
                </div>
              );
            })}
          </div>

          {/* Permissions matrix */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Permission Matrix</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>What each internal role can access within the Super Admin Console</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 520 }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <th className="text-left px-5 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 180 }}>
                      Area
                    </th>
                    {ALL_ROLES.map((r) => (
                      <th key={r} className="px-4 py-3 text-center" style={{ fontSize: "0.68rem", fontWeight: 700, color: ROLE_META[r].color, textTransform: "uppercase", letterSpacing: "0.05em", minWidth: 90 }}>
                        {r}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROLE_PERMISSIONS.map((row, i) => (
                    <tr key={row.area} style={{ borderBottom: i < ROLE_PERMISSIONS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                      <td className="px-5 py-3.5" style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--text-primary)" }}>{row.area}</td>
                      <td className="px-4 py-3.5 text-center"><PermBadge level={row.superAdmin} /></td>
                      <td className="px-4 py-3.5 text-center"><PermBadge level={row.admin} /></td>
                      <td className="px-4 py-3.5 text-center"><PermBadge level={row.staff} /></td>
                      <td className="px-4 py-3.5 text-center"><PermBadge level={row.viewer} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-6 px-5 py-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.01)" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}><Check className="w-2.5 h-2.5" style={{ color: "#22c55e" }} /></div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Full access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)" }}><Eye className="w-2.5 h-2.5" style={{ color: "#eab308" }} /></div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Read only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}><X className="w-2.5 h-2.5" style={{ color: "#d1d5db" }} /></div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>No access</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Invite Modal ── */}
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} onSend={addInvite} />
      )}

      {/* Click-away to close role dropdown */}
      {editingRole !== null && (
        <div className="fixed inset-0 z-10" onClick={() => setEditingRole(null)} />
      )}
    </div>
  );
}

// ─── Invite Modal ─────────────────────────────────────────────────────────────

function InviteModal({ onClose, onSend }: { onClose: () => void; onSend: (email: string, role: InternalRole) => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InternalRole>("Staff");
  const [emailError, setEmailError] = useState("");

  function submit() {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    onSend(email.trim(), role);
  }

  const inputCls = "w-full rounded-xl px-3 py-2.5 text-sm outline-none border transition-colors";
  const inputStyle = { background: "rgba(0,0,0,0.02)", borderColor: "rgba(0,0,0,0.12)", color: "var(--text-primary)" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Invite team member</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5">
            <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
              Email address <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="email"
              className={inputCls}
              style={{ ...inputStyle, borderColor: emailError ? "#ef4444" : "rgba(0,0,0,0.12)" }}
              placeholder="colleague@materiallibrary.org"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            />
            {emailError && <p style={{ fontSize: "0.7rem", color: "#ef4444", marginTop: 3 }}>{emailError}</p>}
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_ROLES.map((r) => {
                const m = ROLE_META[r];
                const active = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className="flex items-start gap-2 p-3 rounded-xl text-left transition-all"
                    style={{
                      border: active ? `2px solid ${m.color}` : "1.5px solid rgba(0,0,0,0.10)",
                      background: active ? m.bg : "transparent",
                    }}
                  >
                    <m.Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: m.color }} />
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: m.color }}>{r}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.4, marginTop: 1 }}>{m.description.split("—")[0].trim()}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-primary)" }}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: ACCENT }}
          >
            Send invite
          </button>
        </div>
      </div>
    </div>
  );
}
