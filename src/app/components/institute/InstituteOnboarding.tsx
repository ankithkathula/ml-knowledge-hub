import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Sparkles, ChevronRight, X } from "lucide-react";

const ACCENT = "#3b82f6";

const INSTITUTE_TYPES = [
  { label: "Architecture School",    emoji: "🏛️" },
  { label: "Design College",         emoji: "🎨" },
  { label: "Engineering College",    emoji: "⚙️" },
  { label: "Interior Design School", emoji: "🪑" },
  { label: "Planning Institute",     emoji: "🗺️" },
  { label: "Fine Arts College",      emoji: "🖼️" },
];

const AFFILIATIONS = ["UGC Recognised", "AICTE Approved", "Autonomous", "Deemed University", "State University"];

const PROGRAMS = [
  "B.Arch", "M.Arch", "B.Design", "M.Design", "B.Planning",
  "BIM & Technology", "Sustainable Design", "Urban Design",
  "Interior Design", "Landscape Architecture", "Fine Arts", "Construction Management",
];

interface Props { onComplete: () => void; }

export function InstituteOnboarding({ onComplete }: Props) {
  const [step, setStep]           = useState(1);
  const [type, setType]           = useState("");
  const [affiliation, setAffil]   = useState("");
  const [programs, setPrograms]   = useState<string[]>([]);
  const [website, setWebsite]     = useState("");
  const [naac, setNaac]           = useState("");

  function toggleProgram(p: string) {
    setPrograms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  }

  function finish() {
    localStorage.setItem("ml_institute_onboarded", "true");
    onComplete();
  }

  const step1Ready = type && affiliation;
  const step2Ready = programs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(59,130,246,0.1)` }}>
                <GraduationCap style={{ width: 18, height: 18, color: ACCENT }} />
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Step {step} of 3
                </p>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {step === 1 && "Tell us about your institute"}
                  {step === 2 && "Programs you offer"}
                  {step === 3 && "Final touches"}
                </h2>
              </div>
            </div>
            <button onClick={onComplete} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
              <X style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
            </button>
          </div>
          <div className="flex gap-1.5 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full transition-all" style={{ background: s <= step ? ACCENT : "rgba(0,0,0,0.08)" }} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="px-7 py-6 space-y-5">
              <div>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>Institute Type</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {INSTITUTE_TYPES.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setType(t.label)}
                      className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all"
                      style={{
                        background: type === t.label ? `rgba(59,130,246,0.1)` : "rgba(0,0,0,0.03)",
                        border: `1.5px solid ${type === t.label ? ACCENT : "transparent"}`,
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>{t.emoji}</span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: type === t.label ? ACCENT : "var(--text-secondary)" }}>
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>Affiliation / Recognition</p>
                <div className="flex flex-wrap gap-2">
                  {AFFILIATIONS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAffil(a)}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                      style={{
                        background: affiliation === a ? ACCENT : "rgba(0,0,0,0.04)",
                        color: affiliation === a ? "white" : "var(--text-secondary)",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="px-7 py-6">
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: 12 }}>
                Select all that apply
              </p>
              <div className="flex flex-wrap gap-2">
                {PROGRAMS.map((p) => {
                  const active = programs.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => toggleProgram(p)}
                      className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                      style={{
                        background: active ? `rgba(59,130,246,0.12)` : "rgba(0,0,0,0.04)",
                        color: active ? ACCENT : "var(--text-secondary)",
                        border: `1.5px solid ${active ? ACCENT : "transparent"}`,
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {programs.length > 0 && (
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 14 }}>
                  {programs.length} program{programs.length > 1 ? "s" : ""} selected
                </p>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="px-7 py-6 space-y-4">
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)" }}>Institute Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.rics-sbe.org"
                  className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.02)", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)" }}>NAAC Grade (optional)</label>
                <input
                  value={naac}
                  onChange={(e) => setNaac(e.target.value)}
                  placeholder="e.g. A++"
                  className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.02)", color: "var(--text-primary)" }}
                />
              </div>
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}
              >
                <Sparkles style={{ width: 18, height: 18, color: ACCENT, flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Your institute profile is now active on Material Library. Students and professionals can discover your programs, faculty, and placement records.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-7 pb-7 flex items-center justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" }}>
              Back
            </button>
          ) : <div />}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : finish()}
            disabled={step === 1 ? !step1Ready : step === 2 ? !step2Ready : false}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
            style={{ background: (step === 1 ? step1Ready : step === 2 ? step2Ready : true) ? ACCENT : "rgba(0,0,0,0.15)" }}
          >
            {step === 3 ? "Get Started" : "Continue"}
            <ChevronRight style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
