import { useState } from "react";
import {
  User, Mail, Phone, MapPin, Shield, Edit2, Check, X,
  Key, Clock, Activity, Eye, Package, Users, FileText,
  BarChart3, Lock, CheckCircle,
} from "lucide-react";

const ACCENT = "#ff6a3d";
const ACCENT_RGB = "255,106,61";

const ACCESS_MODULES = [
  { module: "Dashboard & Analytics",  level: "Full",  icon: BarChart3,  color: "#3b82f6", desc: "View all platform KPIs, export reports" },
  { module: "Taxonomy Management",    level: "Full",  icon: Package,    color: "#8b5cf6", desc: "Create, edit, archive all L1–L5 nodes and service taxonomy" },
  { module: "Brand & Products",       level: "Full",  icon: Package,    color: "#ff6a3d", desc: "Approve brands, manage products (L6), feature placement" },
  { module: "User Management",        level: "Full",  icon: Users,      color: "#22c55e", desc: "View, suspend, delete any user account" },
  { module: "Content & News",         level: "Full",  icon: FileText,   color: "#f59e0b", desc: "Publish, edit, unpublish blog posts, KC articles, news" },
  { module: "RBAC",                   level: "Full",  icon: Shield,     color: "#dc2626", desc: "Create roles, assign permissions, manage access policies" },
  { module: "Approvals Queue",        level: "Full",  icon: CheckCircle,color: "#16a34a", desc: "Approve/reject brand signups, studio verifications, content" },
  { module: "Subscriptions & Billing",level: "Full",  icon: Lock,       color: "#7c3aed", desc: "Manage plans, override tiers, view revenue data" },
  { module: "Advertisements",         level: "Full",  icon: Eye,        color: "#0891b2", desc: "Create campaigns, manage ad slots, view performance" },
  { module: "Careers (ML)",           level: "Full",  icon: Users,      color: "#059669", desc: "Post internal jobs, manage applications" },
];

const RECENT_ACTIVITY = [
  { action: "Approved brand registration",  target: "Kajaria Ceramics Ltd",          time: "10 min ago",   color: "#22c55e" },
  { action: "Updated taxonomy node",        target: "Flooring > Ceramic Tiles (L3)",  time: "42 min ago",   color: "#3b82f6" },
  { action: "Rejected job listing",         target: "Fresher Designer – Smallcase",   time: "2h ago",       color: "#ef4444" },
  { action: "Modified RBAC permissions",    target: "Content Editor role",            time: "Yesterday",    color: "#8b5cf6" },
  { action: "Published industry news",      target: "Cement Sector Q1 2026 Report",   time: "Yesterday",    color: "#f59e0b" },
  { action: "Bulk imported products",       target: "432 SKUs from UltraTech feed",   time: "2 days ago",   color: "#ff6a3d" },
];

export function AdminProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name,  setName]  = useState("Raj Sharma");
  const [email, setEmail] = useState("raj.sharma@materiallibrary.in");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [city,  setCity]  = useState("Mumbai, Maharashtra");

  const inputStyle = (active: boolean) => ({
    width: "100%",
    padding: "8px 12px",
    borderRadius: 10,
    border: `1px solid ${active ? ACCENT : "rgba(0,0,0,0.1)"}`,
    fontSize: "0.85rem",
    color: "var(--text-primary)",
    background: active ? "white" : "rgba(0,0,0,0.02)",
    outline: "none",
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header card */}
      <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${ACCENT},#e8522a)` }}
            >
              RS
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}>
                  Super Admin
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Material Library · since Jan 2024</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: editing ? `rgba(${ACCENT_RGB},0.1)` : "rgba(0,0,0,0.04)",
              color: editing ? ACCENT : "var(--text-secondary)",
            }}
          >
            <Edit2 className="w-3.5 h-3.5" />
            {editing ? "Editing…" : "Edit Profile"}
          </button>
        </div>

        {/* Contact fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[
            { icon: User,    label: "Full Name",     val: name,  setter: setName },
            { icon: Mail,    label: "Email",         val: email, setter: setEmail },
            { icon: Phone,   label: "Phone",         val: phone, setter: setPhone },
            { icon: MapPin,  label: "Location",      val: city,  setter: setCity },
          ].map(({ icon: Icon, label, val, setter }) => (
            <div key={label}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>
                {label}
              </label>
              <div className="relative flex items-center">
                <Icon className="absolute left-3 w-3.5 h-3.5 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                <input
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  disabled={!editing}
                  style={{ ...inputStyle(editing), paddingLeft: 34 }}
                />
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: ACCENT }}
            >
              <Check className="w-3.5 h-3.5" /> Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access permissions */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.1)` }}>
              <Shield className="w-3.5 h-3.5" style={{ color: ACCENT }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>Access Permissions</p>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Super Admin — full platform access</p>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
            {ACCESS_MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.module} className="flex items-start gap-3 px-5 py-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: m.color + "12" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{m.module}</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
                        {m.level}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Security */}
          <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)" }}>
                <Key className="w-3.5 h-3.5" style={{ color: "#8b5cf6" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>Security</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Password", value: "Last changed 42 days ago", action: "Change" },
                { label: "Two-Factor Auth", value: "Enabled via Authenticator App", action: "Manage" },
                { label: "Active Sessions", value: "2 devices — Mumbai & Bangalore", action: "View" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.value}</p>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.08)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"}
                  >
                    {s.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)" }}>
                <Activity className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>Recent Activity</p>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{a.action}</span>
                      {" — "}{a.target}
                    </p>
                    <p className="flex items-center gap-1 mt-0.5" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      <Clock className="w-2.5 h-2.5" />{a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
