import { useState } from "react";
import { Link } from "react-router";
import {
  MessageSquare, Settings, Camera, Plus, X, Save,
  User, Briefcase, Award, Globe, Linkedin, Mail,
  MapPin, CheckCircle, ExternalLink, GraduationCap,
} from "lucide-react";
import {
  DESIGNER_PROFILE, CAREER_HISTORY, CERTIFICATIONS, PORTFOLIO_WORKS,
} from "../data/designerData";

const ACCENT = "#8b5cf6";

/* ── shared stub ── */
function StubPage({ icon: Icon, title, description, color }: { icon: React.ElementType; title: string; description: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <Icon style={{ color, width: 32, height: 32 }} />
      </div>
      <div className="text-center">
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>{description}</div>
      </div>
    </div>
  );
}

export function DesignerMessagesPage() {
  return <StubPage icon={MessageSquare} title="Messages" description="Your conversations will appear here." color="#8b5cf6" />;
}

export function DesignerSettingsPage() {
  return <StubPage icon={Settings} title="Settings" description="Manage account preferences and notifications." color="#6b7280" />;
}

/* ── helpers ── */
const INPUT = {
  width: "100%", padding: "10px 14px", fontSize: "0.88rem",
  border: "1px solid #E2E8F0", borderRadius: 8, outline: "none",
  background: "#FAFAFA", boxSizing: "border-box" as const,
  color: "#1a1a1a",
};
const TEXTAREA = { ...INPUT, resize: "vertical" as const, lineHeight: 1.7 };
const LABEL = { fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6, display: "block" };
const CARD = { background: "white", border: "1px solid #F1F5F9", borderRadius: 16, padding: "24px" };
const SECTION_TITLE = { fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginBottom: 20 };

function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2.5 pb-4 mb-5" style={{ borderBottom: "1px solid #F1F5F9" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}14` }}>
        <Icon style={{ color: ACCENT, width: 15, height: 15 }} />
      </div>
      <h2 style={SECTION_TITLE as React.CSSProperties}>{title}</h2>
    </div>
  );
}

function TagInput({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (t && !values.includes(t)) onChange([...values, t]);
    setDraft("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((v) => (
          <span key={v} className="flex items-center gap-1 px-3 py-1 rounded-full text-[13px] font-medium" style={{ background: `${ACCENT}12`, color: ACCENT }}>
            {v}
            <button onClick={() => onChange(values.filter((x) => x !== v))}><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          style={{ ...INPUT, flex: 1 }}
        />
        <button onClick={add} className="px-3 py-2 rounded-lg flex items-center gap-1 text-[13px] font-semibold" style={{ background: `${ACCENT}12`, color: ACCENT }}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── main edit page ── */
export function DesignerProfileEditPage() {
  const p = DESIGNER_PROFILE;

  const [form, setForm] = useState({
    name: p.name,
    headline: p.headline,
    type: p.type,
    location: p.location,
    email: p.email,
    website: p.website,
    linkedin: p.linkedin,
    bio: p.bio,
  });
  const [skills, setSkills] = useState<string[]>([...p.skills]);
  const [serviceAreas, setServiceAreas] = useState(["Mumbai", "Pune", "Bangalore", "Goa", "Delhi"]);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20">

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em" }}>Edit Profile</h1>
          <p style={{ fontSize: "0.82rem", color: "#94A3B8", marginTop: 3 }}>Changes are reflected on your public profile</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/designer/ankit-sharma"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold"
            style={{ border: "1px solid #E2E8F0", color: "#64748B" }}
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Public Profile
          </Link>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all"
            style={{ background: saved ? "#10b981" : ACCENT, color: "white" }}
          >
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="space-y-6">

        {/* ── Photo & Cover ── */}
        <div style={CARD}>
          <SectionHeader title="Photo & Cover" icon={Camera} />
          <div className="relative mb-6">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=900"
              alt="cover"
              className="w-full rounded-xl object-cover"
              style={{ height: 160 }}
            />
            <button
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
              style={{ background: "rgba(0,0,0,0.55)", color: "white", backdropFilter: "blur(4px)" }}
            >
              <Camera className="w-3.5 h-3.5" /> Change Cover
            </button>
            <div className="absolute -bottom-8 left-5 w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              <img src="https://i.pravatar.cc/300?img=68" alt={p.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold"
              style={{ background: `${ACCENT}12`, color: ACCENT }}
            >
              <Camera className="w-3.5 h-3.5" /> Change Photo
            </button>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>JPG, PNG or WebP · max 2 MB</span>
          </div>
        </div>

        {/* ── Basic Info ── */}
        <div style={CARD}>
          <SectionHeader title="Basic Information" icon={User} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={LABEL}>Full Name</label>
              <input style={INPUT} value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={LABEL}>Professional Type</label>
              <input style={INPUT} value={form.type} onChange={set("type")} />
            </div>
            <div className="sm:col-span-2">
              <label style={LABEL}>Headline</label>
              <input style={INPUT} value={form.headline} onChange={set("headline")} placeholder="e.g. Interior Designer & Spatial Storyteller" />
            </div>
            <div>
              <label style={LABEL}>Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input style={{ ...INPUT, paddingLeft: 36 }} value={form.location} onChange={set("location")} />
              </div>
            </div>
            <div>
              <label style={LABEL}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input style={{ ...INPUT, paddingLeft: 36 }} value={form.email} onChange={set("email")} type="email" />
              </div>
            </div>
            <div>
              <label style={LABEL}>Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input style={{ ...INPUT, paddingLeft: 36 }} value={form.website} onChange={set("website")} />
              </div>
            </div>
            <div>
              <label style={LABEL}>LinkedIn</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input style={{ ...INPUT, paddingLeft: 36 }} value={form.linkedin} onChange={set("linkedin")} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bio ── */}
        <div style={CARD}>
          <SectionHeader title="About & Bio" icon={User} />
          <label style={LABEL}>Bio</label>
          <textarea style={{ ...TEXTAREA, minHeight: 120 }} value={form.bio} onChange={set("bio")} />
          <p style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 6 }}>{form.bio.length} / 500 characters</p>
        </div>

        {/* ── Skills ── */}
        <div style={CARD}>
          <SectionHeader title="Skills & Software" icon={Award} />
          <label style={LABEL}>Skills (press Enter to add)</label>
          <TagInput values={skills} onChange={setSkills} placeholder="e.g. AutoCAD, SketchUp…" />
        </div>

        {/* ── Service Areas ── */}
        <div style={CARD}>
          <SectionHeader title="Service Areas" icon={MapPin} />
          <label style={LABEL}>Cities you serve</label>
          <TagInput values={serviceAreas} onChange={setServiceAreas} placeholder="e.g. Hyderabad…" />
        </div>

        {/* ── Career History ── */}
        <div style={CARD}>
          <SectionHeader title="Career History" icon={Briefcase} />
          <div className="space-y-3 mb-4">
            {CAREER_HISTORY.map((exp) => (
              <div key={exp.id} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{exp.role}</div>
                  <div style={{ fontSize: "0.8rem", color: ACCENT, fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 2 }}>{exp.period}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {exp.verificationStatus === "verified" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  {exp.verificationStatus === "pending" && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#d97706" }}>Pending</span>
                  )}
                  {exp.verificationStatus === "unverified" && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(0,0,0,0.04)", color: "#94A3B8" }}>Unverified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold" style={{ background: `${ACCENT}12`, color: ACCENT }}>
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
        </div>

        {/* ── Certifications ── */}
        <div style={CARD}>
          <SectionHeader title="Certifications" icon={Award} />
          <div className="space-y-3 mb-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-4 p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F172A" }}>{c.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 2 }}>{c.issuer} · {c.year}</div>
                </div>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontFamily: "monospace" }}>{c.credentialId}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold" style={{ background: `${ACCENT}12`, color: ACCENT }}>
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>

        {/* ── Portfolio Works ── */}
        <div style={CARD}>
          <SectionHeader title="Portfolio Works" icon={GraduationCap} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {PORTFOLIO_WORKS.map((w) => (
              <div key={w.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: w.gradient }} />
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: "0.84rem", fontWeight: 700, color: "#0F172A" }}>{w.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{w.category} · {w.year}</div>
                </div>
                {w.isPublic && (
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>Live</span>
                )}
              </div>
            ))}
          </div>
          <Link to="/d/works" className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold w-fit" style={{ background: `${ACCENT}12`, color: ACCENT }}>
            <Plus className="w-3.5 h-3.5" /> Manage Works
          </Link>
        </div>

        {/* Save CTA (bottom) */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold transition-all"
            style={{ background: saved ? "#10b981" : ACCENT, color: "white" }}
          >
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>

      </div>
    </div>
  );
}
