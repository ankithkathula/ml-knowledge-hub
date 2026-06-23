import { useState, useEffect } from "react";
import {
  Camera, Plus, X, Trash2, Edit3, ChevronDown, Save,
  Linkedin, Globe, Instagram,
} from "lucide-react";
import { getAuthUser, type AuthUser } from "../../utils/auth";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

/* ── Mock Data ──────────────────────────────────────────────────────── */

type Education    = { id: number; degree: string; institution: string; year: string };
type Experience   = { id: number; role: string; company: string; duration: string };
type Certification = { id: number; name: string; issuer: string; date: string };

const initialProfile = {
  name: "Priya Mehta",
  headline: "B.Arch Student · Interior Design Enthusiast · RICS SBE '27",
  type: "Student",
  year: "4th Year",
  institute: "RICS School of Built Environment, Noida",
  bio: "4th year B.Arch student at RICS School of Built Environment, passionate about sustainable interior design and material innovation. Exploring the intersection of regional craft traditions and contemporary space-making. Actively seeking internship and placement opportunities in Mumbai and Delhi.",
  skills: ["AutoCAD", "SketchUp", "Adobe Photoshop", "Hand Sketching", "Space Planning", "Revit (Basic)"],
  city: "Noida",
  state: "Uttar Pradesh",
  linkedin: "linkedin.com/in/priya-mehta-arch",
  behance: "behance.net/priyamehta",
  website: "",
  instagram: "@priya.designs",
};

const initialEducation: Education[] = [
  { id: 1, degree: "B.Arch (4th Year, ongoing)", institution: "RICS School of Built Environment, Noida", year: "Expected 2027" },
  { id: 2, degree: "Class XII — Science (PCM)", institution: "Delhi Public School, Noida", year: "2022" },
];

const initialExperience: Experience[] = [
  { id: 1, role: "Design Intern", company: "Studio Sangam, Ahmedabad", duration: "May – Jul 2025" },
];

const initialCertifications: Certification[] = [
  { id: 1, name: "Introduction to Sustainable Design", issuer: "Coursera / IIT Bombay", date: "2024" },
  { id: 2, name: "AutoCAD Essentials", issuer: "Autodesk", date: "2023" },
];

const PROFESSIONAL_TYPES = ["Student", "Architect", "Interior Designer", "Landscape Architect", "Urban Planner", "Other"];
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni"];

/* ── Main Component ────────────────────────────────────────────────── */

export function UserProfileEditPage() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());
  const [profile, setProfile]  = useState(initialProfile);
  const [education, setEducation]           = useState(initialEducation);
  const [experience, setExperience]         = useState(initialExperience);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [newSkill, setNewSkill]             = useState("");
  const [showAddEducation, setShowAddEducation]   = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddCert, setShowAddCert]             = useState(false);

  const [tempEdu,  setTempEdu]  = useState({ degree: "", institution: "", year: "" });
  const [tempExp,  setTempExp]  = useState({ role: "", company: "", duration: "" });
  const [tempCert, setTempCert] = useState({ name: "", issuer: "", date: "" });

  useEffect(() => {
    const sync = () => setAuthUser(getAuthUser());
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  const initials = authUser?.initials ?? "PM";
  const displayName = authUser?.name ?? profile.name;

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !profile.skills.includes(s)) {
      setProfile({ ...profile, skills: [...profile.skills, s] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) =>
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });

  const addEducation = () => {
    if (tempEdu.degree && tempEdu.institution) {
      setEducation([...education, { id: Date.now(), ...tempEdu }]);
      setTempEdu({ degree: "", institution: "", year: "" });
      setShowAddEducation(false);
    }
  };

  const addExperience = () => {
    if (tempExp.role && tempExp.company) {
      setExperience([...experience, { id: Date.now(), ...tempExp }]);
      setTempExp({ role: "", company: "", duration: "" });
      setShowAddExperience(false);
    }
  };

  const addCertification = () => {
    if (tempCert.name && tempCert.issuer) {
      setCertifications([...certifications, { id: Date.now(), ...tempCert }]);
      setTempCert({ name: "", issuer: "", date: "" });
      setShowAddCert(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto space-y-6 pb-24">

      {/* ── Avatar / Identity ─────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #4f46e5)`, fontWeight: 800 }}
          >
            {initials}
          </div>
          <button
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{
              background: ACCENT,
              border: "3px solid white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
          {displayName}
        </h3>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2, textAlign: "center" }}>
          {profile.headline}
        </p>
      </div>

      {/* ── Basic Info ─────────────────────────────────────────────── */}
      <Section title="Basic Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input
              className="gl-input w-full"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </Field>
          <Field label="Headline / Tagline">
            <input
              className="gl-input w-full"
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            />
          </Field>
          <Field label="Profile Type">
            <div className="relative">
              <select
                className="gl-input w-full appearance-none pr-8"
                value={profile.type}
                onChange={(e) => setProfile({ ...profile, type: e.target.value })}
              >
                {PROFESSIONAL_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </Field>
          <Field label="Year of Study">
            <div className="relative">
              <select
                className="gl-input w-full appearance-none pr-8"
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value })}
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </Field>
          <Field label="Institute">
            <input
              className="gl-input w-full"
              value={profile.institute}
              onChange={(e) => setProfile({ ...profile, institute: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <Section title="About">
        <textarea
          className="gl-input w-full"
          rows={4}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Write a brief summary about yourself..."
        />
      </Section>

      {/* ── Skills ─────────────────────────────────────────────────── */}
      <Section title="Skills">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            className="gl-input flex-1"
            placeholder="Add a skill (e.g., Lumion, InDesign)..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <button
            onClick={addSkill}
            className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </Section>

      {/* ── Education ──────────────────────────────────────────────── */}
      <Section title="Education" onAdd={() => setShowAddEducation(true)}>
        <div className="space-y-2">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(0,0,0,0.03)" }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {edu.degree}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {edu.institution} &middot; {edu.year}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg" style={{ color: "var(--text-muted)" }}>
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg"
                  style={{ color: "#ef4444" }}
                  onClick={() => setEducation(education.filter((e) => e.id !== edu.id))}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showAddEducation && (
          <AddForm
            fields={[
              { placeholder: "Degree (e.g., B.Arch)", value: tempEdu.degree, onChange: (v) => setTempEdu({ ...tempEdu, degree: v }) },
              { placeholder: "Institution", value: tempEdu.institution, onChange: (v) => setTempEdu({ ...tempEdu, institution: v }) },
              { placeholder: "Year / Expected year", value: tempEdu.year, onChange: (v) => setTempEdu({ ...tempEdu, year: v }) },
            ]}
            onSave={addEducation}
            onCancel={() => setShowAddEducation(false)}
          />
        )}
      </Section>

      {/* ── Internships & Experience ────────────────────────────────── */}
      <Section title="Internships & Experience" onAdd={() => setShowAddExperience(true)}>
        <div className="space-y-2">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(0,0,0,0.03)" }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {exp.role}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {exp.company} &middot; {exp.duration}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg" style={{ color: "var(--text-muted)" }}>
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg"
                  style={{ color: "#ef4444" }}
                  onClick={() => setExperience(experience.filter((e) => e.id !== exp.id))}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showAddExperience && (
          <AddForm
            fields={[
              { placeholder: "Role / Title (e.g., Design Intern)", value: tempExp.role, onChange: (v) => setTempExp({ ...tempExp, role: v }) },
              { placeholder: "Company / Studio", value: tempExp.company, onChange: (v) => setTempExp({ ...tempExp, company: v }) },
              { placeholder: "Duration (e.g., May – Jul 2025)", value: tempExp.duration, onChange: (v) => setTempExp({ ...tempExp, duration: v }) },
            ]}
            onSave={addExperience}
            onCancel={() => setShowAddExperience(false)}
          />
        )}
      </Section>

      {/* ── Certifications ─────────────────────────────────────────── */}
      <Section title="Certifications & Courses" onAdd={() => setShowAddCert(true)}>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(0,0,0,0.03)" }}
            >
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {cert.issuer} &middot; {cert.date}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg" style={{ color: "var(--text-muted)" }}>
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg"
                  style={{ color: "#ef4444" }}
                  onClick={() =>
                    setCertifications(certifications.filter((c) => c.id !== cert.id))
                  }
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showAddCert && (
          <AddForm
            fields={[
              { placeholder: "Certification / Course name", value: tempCert.name, onChange: (v) => setTempCert({ ...tempCert, name: v }) },
              { placeholder: "Issuing organisation", value: tempCert.issuer, onChange: (v) => setTempCert({ ...tempCert, issuer: v }) },
              { placeholder: "Year (e.g., 2024)", value: tempCert.date, onChange: (v) => setTempCert({ ...tempCert, date: v }) },
            ]}
            onSave={addCertification}
            onCancel={() => setShowAddCert(false)}
          />
        )}
      </Section>

      {/* ── Social Links ───────────────────────────────────────────── */}
      <Section title="Social Links">
        <div className="space-y-3">
          {[
            {
              icon: <Linkedin className="w-4 h-4" style={{ color: "#0077B5" }} />,
              bg: "rgba(0,119,181,0.1)",
              key: "linkedin" as const,
              placeholder: "linkedin.com/in/yourname",
            },
            {
              icon: <Globe className="w-4 h-4" style={{ color: "#0563ff" }} />,
              bg: "rgba(5,99,255,0.1)",
              key: "behance" as const,
              placeholder: "behance.net/yourname",
            },
            {
              icon: <Globe className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />,
              bg: "rgba(0,0,0,0.06)",
              key: "website" as const,
              placeholder: "Personal website URL",
            },
            {
              icon: <Instagram className="w-4 h-4" style={{ color: "#E4405F" }} />,
              bg: "rgba(228,64,95,0.1)",
              key: "instagram" as const,
              placeholder: "@yourhandle",
            },
          ].map(({ icon, bg, key, placeholder }) => (
            <div key={key} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                {icon}
              </div>
              <input
                className="gl-input flex-1"
                placeholder={placeholder}
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Location ───────────────────────────────────────────────── */}
      <Section title="Location">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City">
            <input
              className="gl-input w-full"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </Field>
          <Field label="State">
            <input
              className="gl-input w-full"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      {/* ── Sticky Save ────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 z-40"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[800px] mx-auto">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: ACCENT,
              boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)`,
            }}
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function Section({
  title,
  children,
  onAdd,
}: {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
          {title}
        </h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: `rgba(99,102,241,0.1)`, color: "#6366f1" }}
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--text-secondary)",
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function AddForm({
  fields,
  onSave,
  onCancel,
}: {
  fields: { placeholder: string; value: string; onChange: (v: string) => void }[];
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="mt-3 p-4 rounded-xl space-y-3"
      style={{
        background: `rgba(${ACCENT_RGB},0.04)`,
        border: `1px solid rgba(${ACCENT_RGB},0.15)`,
      }}
    >
      {fields.map((f, i) => (
        <input
          key={i}
          className="gl-input w-full"
          placeholder={f.placeholder}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
        />
      ))}
      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
          style={{ background: ACCENT }}
        >
          Add
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ color: "var(--text-muted)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
