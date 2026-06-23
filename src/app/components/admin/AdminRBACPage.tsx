import { useState } from "react";
import { Shield, Plus, Edit2, Trash2, Check, X, Users, Lock } from "lucide-react";

const ROLES = [
  { id: 1, name: "Super Admin", users: 2, color: "#ef4444", description: "Full platform access, billing, RBAC management" },
  { id: 2, name: "Content Editor", users: 8, color: "#f97316", description: "Blog, news, knowledge center content" },
  { id: 3, name: "Brand Manager", users: 142, color: "#eab308", description: "Brand profile, products, leads" },
  { id: 4, name: "Studio Manager", users: 67, color: "#22c55e", description: "Studio profile, projects, bookings" },
  { id: 5, name: "Institute Admin", users: 31, color: "#3b82f6", description: "Courses, faculty, students management" },
  { id: 6, name: "Designer", users: 2840, color: "#8b5cf6", description: "Portfolio, jobs, courses access" },
  { id: 7, name: "Student", users: 14720, color: "#ec4899", description: "Courses, assignments, job listings" },
  { id: 8, name: "Faculty", users: 390, color: "#14b8a6", description: "Course creation, student management" },
  { id: 9, name: "Guest", users: 0, color: "#94a3b8", description: "Read-only public content access" },
];

type Module = "Brands" | "Products" | "Taxonomy" | "Users" | "Content" | "Jobs" | "Courses" | "Analytics" | "KC" | "Ads" | "Billing";

const PERMISSIONS: { module: Module; roles: Record<string, "full" | "read" | "none"> }[] = [
  { module: "Brands",   roles: { "Super Admin": "full", "Content Editor": "read", "Brand Manager": "full", "Studio Manager": "none", "Institute Admin": "none", "Designer": "read", "Student": "none", "Faculty": "none", "Guest": "none" } },
  { module: "Products", roles: { "Super Admin": "full", "Content Editor": "read", "Brand Manager": "full", "Studio Manager": "read", "Institute Admin": "none", "Designer": "read", "Student": "none", "Faculty": "none", "Guest": "none" } },
  { module: "Taxonomy", roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "none", "Studio Manager": "none", "Institute Admin": "none", "Designer": "none", "Student": "none", "Faculty": "none", "Guest": "none" } },
  { module: "Users",    roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "none", "Studio Manager": "none", "Institute Admin": "read", "Designer": "none", "Student": "none", "Faculty": "read", "Guest": "none" } },
  { module: "Content",  roles: { "Super Admin": "full", "Content Editor": "full", "Brand Manager": "read", "Studio Manager": "read", "Institute Admin": "read", "Designer": "read", "Student": "read", "Faculty": "read", "Guest": "read" } },
  { module: "Jobs",     roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "full", "Studio Manager": "full", "Institute Admin": "full", "Designer": "read", "Student": "read", "Faculty": "none", "Guest": "none" } },
  { module: "Courses",  roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "none", "Studio Manager": "none", "Institute Admin": "full", "Designer": "read", "Student": "read", "Faculty": "full", "Guest": "none" } },
  { module: "Analytics",roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "read", "Studio Manager": "read", "Institute Admin": "read", "Designer": "none", "Student": "none", "Faculty": "none", "Guest": "none" } },
  { module: "KC",       roles: { "Super Admin": "full", "Content Editor": "full", "Brand Manager": "read", "Studio Manager": "read", "Institute Admin": "read", "Designer": "read", "Student": "read", "Faculty": "read", "Guest": "read" } },
  { module: "Ads",      roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "read", "Studio Manager": "none", "Institute Admin": "none", "Designer": "none", "Student": "none", "Faculty": "none", "Guest": "none" } },
  { module: "Billing",  roles: { "Super Admin": "full", "Content Editor": "none", "Brand Manager": "read", "Studio Manager": "read", "Institute Admin": "read", "Designer": "none", "Student": "none", "Faculty": "none", "Guest": "none" } },
];

const badge = (level: "full" | "read" | "none") => {
  if (level === "full") return <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}><Check className="w-3 h-3" style={{ color: "#22c55e" }} /></div>;
  if (level === "read") return <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)" }}><Lock className="w-3 h-3" style={{ color: "#eab308" }} /></div>;
  return <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}><X className="w-3 h-3" style={{ color: "#cbd5e1" }} /></div>;
};

export function AdminRBACPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "matrix">("roles");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Role-Based Access Control</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Manage roles, permissions, and access levels across the platform</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#ff6a3d" }}
        >
          <Plus className="w-4 h-4" /> New Role
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "rgba(0,0,0,0.04)", width: "fit-content" }}>
        {(["roles", "matrix"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize"
            style={{
              background: activeTab === t ? "white" : "transparent",
              color: activeTab === t ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: activeTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t === "roles" ? "Roles" : "Permissions Matrix"}
          </button>
        ))}
      </div>

      {activeTab === "roles" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <div key={role.id} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: role.color + "18" }}>
                    <Shield className="w-4 h-4" style={{ color: role.color }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>{role.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Users className="w-3 h-3 inline mr-0.5" />{role.users.toLocaleString()} users
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"><Edit2 className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
                  {role.id > 2 && <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} /></button>}
                </div>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{role.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 120 }}>Module</th>
                  {ROLES.map((r) => (
                    <th key={r.id} className="px-3 py-3 text-center" style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", minWidth: 80 }}>{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((row, i) => (
                  <tr key={row.module} style={{ borderBottom: i < PERMISSIONS.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                    <td className="px-4 py-3" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{row.module}</td>
                    {ROLES.map((r) => (
                      <td key={r.id} className="px-3 py-3 text-center">{badge(row.roles[r.name] ?? "none")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-6 px-4 py-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.01)" }}>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}><Check className="w-2.5 h-2.5" style={{ color: "#22c55e" }} /></div><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Full access</span></div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)" }}><Lock className="w-2.5 h-2.5" style={{ color: "#eab308" }} /></div><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Read only</span></div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}><X className="w-2.5 h-2.5" style={{ color: "#cbd5e1" }} /></div><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>No access</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
