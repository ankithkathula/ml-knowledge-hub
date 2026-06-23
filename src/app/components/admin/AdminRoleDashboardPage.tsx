import { useState } from "react";
import { Building2, Users, GraduationCap, Briefcase, BookOpen, TrendingUp, TrendingDown, Eye, MessageSquare, Star } from "lucide-react";

type RoleType = "Brand" | "Designer" | "Studio" | "Institute" | "Student" | "Faculty";

const ROLE_SUMMARY: {
  role: RoleType;
  icon: React.ElementType;
  color: string;
  total: number;
  active: number;
  pending: number;
  growth: number;
  avgEngagement: string;
}[] = [
  { role: "Brand",     icon: Building2,    color: "#ff6a3d", total: 1240,  active: 1108, pending: 32,  growth: +12.4, avgEngagement: "4.2K views/mo" },
  { role: "Designer",  icon: Users,        color: "#8b5cf6", total: 8420,  active: 7340, pending: 180, growth: +24.1, avgEngagement: "3 projects/yr" },
  { role: "Studio",    icon: Briefcase,    color: "#3b82f6", total: 670,   active: 580,  pending: 21,  growth: +8.7,  avgEngagement: "12 bookings/mo" },
  { role: "Institute", icon: GraduationCap,color: "#22c55e", total: 310,   active: 294,  pending: 6,   growth: +5.2,  avgEngagement: "820 students" },
  { role: "Student",   icon: BookOpen,     color: "#f59e0b", total: 62400, active: 54200,pending: 0,   growth: +31.6, avgEngagement: "2.1 courses" },
  { role: "Faculty",   icon: Users,        color: "#14b8a6", total: 1890,  active: 1620, pending: 48,  growth: +9.4,  avgEngagement: "3.4 courses" },
];

const BRAND_BREAKDOWN = [
  { name: "UltraTech Cement",    products: 48,  leads: 1240, views: 82400, rating: 4.8, plan: "Platinum" },
  { name: "Asian Paints",        products: 72,  leads: 980,  views: 64200, rating: 4.7, plan: "Platinum" },
  { name: "Kajaria Ceramics",    products: 134, leads: 760,  views: 51800, rating: 4.6, plan: "Gold" },
  { name: "Hindware Innovation", products: 89,  leads: 540,  views: 38400, rating: 4.4, plan: "Gold" },
  { name: "Greenply Industries", products: 42,  leads: 320,  views: 24100, rating: 4.3, plan: "Free" },
  { name: "Jaquar Group",        products: 61,  leads: 290,  views: 21600, rating: 4.5, plan: "Gold" },
];

const DESIGNER_BREAKDOWN = [
  { name: "Priya Sharma",       projects: 14, followers: 2840, views: 18200, rating: 4.9, plan: "Pro" },
  { name: "Arjun Mehta",        projects: 9,  followers: 1640, views: 11400, rating: 4.7, plan: "Pro" },
  { name: "Divya Krishnamurthy",projects: 22, followers: 3100, views: 22800, rating: 4.8, plan: "Elite" },
  { name: "Rohan Gupta",        projects: 6,  followers: 820,  views: 6200,  rating: 4.5, plan: "Free" },
  { name: "Sneha Patel",        projects: 11, followers: 1920, views: 14800, rating: 4.6, plan: "Pro" },
];

const PLAN_COLOR: Record<string, { bg: string; color: string }> = {
  Free:     { bg: "rgba(148,163,184,0.12)", color: "#64748b" },
  Gold:     { bg: "rgba(234,179,8,0.12)",   color: "#b45309" },
  Platinum: { bg: "rgba(168,85,247,0.12)",  color: "#7c3aed" },
  Pro:      { bg: "rgba(59,130,246,0.12)",  color: "#1d4ed8" },
  Elite:    { bg: "rgba(168,85,247,0.12)",  color: "#7c3aed" },
  Premium:  { bg: "rgba(34,197,94,0.12)",   color: "#15803d" },
};

export function AdminRoleDashboardPage() {
  const [view, setView] = useState<"aggregate" | "single">("aggregate");
  const [selectedRole, setSelectedRole] = useState<RoleType>("Brand");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Role Dashboard</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Platform-wide stakeholder metrics and engagement</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)" }}>
          {(["aggregate", "single"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all"
              style={{
                background: view === v ? "white" : "transparent",
                color: view === v ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {v === "aggregate" ? "Aggregate" : "Single Role"}
            </button>
          ))}
        </div>
      </div>

      {view === "aggregate" ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {ROLE_SUMMARY.map((r) => {
              const Icon = r.icon;
              const isUp = r.growth >= 0;
              return (
                <div
                  key={r.role}
                  className="rounded-2xl p-5 cursor-pointer transition-all"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
                  onClick={() => { setSelectedRole(r.role); setView("single"); }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.color + "15" }}>
                      <Icon className="w-5 h-5" style={{ color: r.color }} />
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: isUp ? "#16a34a" : "#dc2626" }}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(r.growth)}%
                    </span>
                  </div>
                  <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{r.total.toLocaleString()}</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-secondary)", marginTop: 2 }}>{r.role}s</p>
                  <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 600 }}>{r.active.toLocaleString()} active</span>
                    {r.pending > 0 && <span style={{ fontSize: "0.72rem", color: "#ca8a04", fontWeight: 600 }}>{r.pending} pending</span>}
                  </div>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{r.avgEngagement}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 16 }}>Total Users by Role</h3>
            <div className="space-y-3">
              {ROLE_SUMMARY.sort((a, b) => b.total - a.total).map((r) => {
                const maxTotal = ROLE_SUMMARY.reduce((m, x) => Math.max(m, x.total), 0);
                const pct = (r.total / maxTotal) * 100;
                return (
                  <div key={r.role} className="flex items-center gap-3">
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", width: 72 }}>{r.role}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.05)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", width: 52, textAlign: "right" }}>{r.total.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Role selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {ROLE_SUMMARY.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: selectedRole === r.role ? r.color : "white",
                    color: selectedRole === r.role ? "white" : "var(--text-secondary)",
                    border: selectedRole === r.role ? "none" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {r.role}s
                </button>
              );
            })}
          </div>

          {/* Single role detail */}
          {(() => {
            const r = ROLE_SUMMARY.find((x) => x.role === selectedRole)!;
            const Icon = r.icon;
            return (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total", val: r.total.toLocaleString(), sub: "registered" },
                    { label: "Active", val: r.active.toLocaleString(), sub: "verified" },
                    { label: "Pending", val: r.pending.toString(), sub: "review" },
                    { label: "Growth", val: `+${r.growth}%`, sub: "this month" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <p style={{ fontSize: "1.5rem", fontWeight: 800, color: r.color }}>{s.val}</p>
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>{s.label}</p>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>

                {selectedRole === "Brand" && (
                  <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>Top Brands by Engagement</h3>
                    </div>
                    <table className="w-full" style={{ borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                          {["Brand", "Products", "Leads", "Views", "Rating", "Plan"].map((h) => (
                            <th key={h} className="text-left px-5 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {BRAND_BREAKDOWN.map((b, i) => (
                          <tr key={b.name} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                            <td className="px-5 py-3.5" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{b.name}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.products}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.leads.toLocaleString()}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.views.toLocaleString()}</td>
                            <td className="px-5 py-3.5">
                              <span className="flex items-center gap-0.5" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#b45309" }}>
                                <Star className="w-3 h-3" />{b.rating}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ ...PLAN_COLOR[b.plan] }}>{b.plan}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedRole === "Designer" && (
                  <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>Top Designers</h3>
                    </div>
                    <table className="w-full" style={{ borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                          {["Designer", "Projects", "Followers", "Profile Views", "Rating", "Plan"].map((h) => (
                            <th key={h} className="text-left px-5 py-3" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {DESIGNER_BREAKDOWN.map((d) => (
                          <tr key={d.name} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                            <td className="px-5 py-3.5" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{d.name}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{d.projects}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{d.followers.toLocaleString()}</td>
                            <td className="px-5 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{d.views.toLocaleString()}</td>
                            <td className="px-5 py-3.5">
                              <span className="flex items-center gap-0.5" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#b45309" }}>
                                <Star className="w-3 h-3" />{d.rating}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ ...PLAN_COLOR[d.plan] }}>{d.plan}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!["Brand", "Designer"].includes(selectedRole) && (
                  <div className="rounded-2xl p-8 flex flex-col items-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: r.color + "12" }}>
                      <Icon className="w-7 h-7" style={{ color: r.color }} />
                    </div>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 4 }}>{selectedRole} Detail View</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Detailed {selectedRole.toLowerCase()} table coming soon</p>
                  </div>
                )}
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
