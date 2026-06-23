import { Save, Globe, Mail, Phone, MapPin } from "lucide-react";

export function InstituteSettingsPage() {
  return (
    <div className="p-5 sm:p-7 max-w-3xl mx-auto space-y-7">
      <div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Settings</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Manage your institute profile and preferences.</p>
      </div>

      {/* Profile */}
      <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Institute Profile</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black" style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}>RS</div>
            <div>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(59,130,246,0.08)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" }}>
                Upload Logo
              </button>
              <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 4 }}>PNG, JPG or SVG. Max 2MB.</p>
            </div>
          </div>
          {[
            { label: "Institute Name", value: "RICS School of Built Environment", placeholder: "" },
            { label: "Tagline", value: "India's leading institute for construction professionals", placeholder: "" },
            { label: "Description", value: "", placeholder: "About your institute...", multiline: true },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>{f.label}</label>
              {f.multiline ? (
                <textarea
                  defaultValue={f.value}
                  placeholder={f.placeholder}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }}
                />
              ) : (
                <input
                  defaultValue={f.value}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Contact Details</h3>
        <div className="flex flex-col gap-4">
          {[
            { label: "Website", icon: Globe, value: "www.rics.org/en/india" },
            { label: "Contact Email", icon: Mail, value: "india@rics.org" },
            { label: "Phone", icon: Phone, value: "+91 22 4232 4920" },
            { label: "Location", icon: MapPin, value: "Mumbai, Maharashtra" },
          ].map(({ label, icon: Icon, value }) => (
            <div key={label}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                <input
                  defaultValue={value}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Notifications</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: "New enrollment", desc: "Email when a student enrolls in any course" },
            { label: "New review", desc: "Email when a student submits a review" },
            { label: "Weekly digest", desc: "Summary of enrollments, revenue, and ratings" },
            { label: "Faculty activity", desc: "Notifications about faculty updates and invitations" },
          ].map((n) => (
            <label key={n.label} className="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{n.label}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{n.desc}</p>
              </div>
              <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: "#3b82f6" }}>
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#3b82f6", color: "#fff" }}>
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}
