import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Check, Link2, Sparkles } from "lucide-react";

const ACCENT = "#FF6A3D";
const ACCENT_RGB = "255,106,61";

const STUDIO_TYPES = [
  "Architecture",
  "Interior Design",
  "Landscape Architecture",
  "Urban Design",
  "MEP Consulting",
  "Project Management",
];

const TEAM_SIZES = ["1–5", "6–15", "16–50", "50+"];

const SPECIALIZATIONS = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Healthcare",
  "Education",
  "Retail",
  "Industrial",
  "Mixed Use",
  "Sustainable Design",
  "Heritage Conservation",
  "Workplace",
  "Urban Regeneration",
];

interface StudioOnboardingProps {
  onComplete: () => void;
}

export function StudioOnboarding({ onComplete }: StudioOnboardingProps) {
  const [step, setStep] = useState(1);
  const [studioType, setStudioType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [portfolio, setPortfolio] = useState("");

  function handleComplete() {
    localStorage.setItem("ml_studio_onboarded", "true");
    onComplete();
  }

  function toggleSpecialization(s: string) {
    setSpecializations((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  const canProceedStep1 = studioType && teamSize;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
      >
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    background: s <= step ? ACCENT : "rgba(0,0,0,0.06)",
                    color: s <= step ? "white" : "var(--text-muted)",
                  }}
                >
                  {s < step ? <Check style={{ width: 13, height: 13 }} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className="h-0.5 w-10"
                    style={{ background: s < step ? ACCENT : "rgba(0,0,0,0.08)" }}
                  />
                )}
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
            {step === 1
              ? "Welcome to your Studio Hub 👋"
              : step === 2
              ? "What are your specializations?"
              : "Complete your studio profile"}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
            {step === 1
              ? "Tell us about your studio so we can tailor your experience."
              : step === 2
              ? "Select your practice areas — we'll surface relevant projects and connections."
              : "Add your website and portfolio so clients can discover your work."}
          </p>
        </div>

        <div className="px-6 py-5" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Studio Type
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {STUDIO_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setStudioType(t)}
                        className="py-2 px-3 rounded-xl text-[12px] font-semibold text-left transition-all"
                        style={{
                          background: studioType === t ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                          color: studioType === t ? ACCENT : "var(--text-secondary)",
                          border: studioType === t ? `1px solid rgba(${ACCENT_RGB},0.3)` : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {studioType === t && "✓ "}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Team Size
                  </label>
                  <div className="mt-1.5 grid grid-cols-4 gap-2">
                    {TEAM_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setTeamSize(size)}
                        className="h-10 rounded-xl text-[11px] font-semibold transition-all"
                        style={{
                          background: teamSize === size ? ACCENT : "rgba(0,0,0,0.04)",
                          color: teamSize === size ? "white" : "var(--text-secondary)",
                          border: teamSize === size ? `1px solid ${ACCENT}` : "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map((s) => {
                    const selected = specializations.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSpecialization(s)}
                        className="px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                        style={{
                          background: selected ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                          color: selected ? ACCENT : "var(--text-secondary)",
                          border: selected ? `1px solid rgba(${ACCENT_RGB},0.3)` : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {selected && "✓ "}
                        {s}
                      </button>
                    );
                  })}
                </div>
                {specializations.length > 0 && (
                  <p className="mt-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {specializations.length} selected
                  </p>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div
                  className="p-4 rounded-xl flex items-center gap-3"
                  style={{ background: `rgba(${ACCENT_RGB},0.06)`, border: `1px solid rgba(${ACCENT_RGB},0.15)` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                  >
                    <Sparkles style={{ width: 20, height: 20, color: ACCENT }} />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Complete your studio profile so clients and designers can discover your practice.
                  </p>
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Website URL{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div className="mt-1 relative">
                    <Link2
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ width: 15, height: 15, color: "var(--text-muted)" }}
                    />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourstudio.com"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Behance / Portfolio URL{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div className="mt-1 relative">
                    <Link2
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ width: 15, height: 15, color: "var(--text-muted)" }}
                    />
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://behance.net/yourstudio"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" }}
            >
              ← Back
            </button>
          ) : (
            <button
              onClick={handleComplete}
              style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}
            >
              Skip for now
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && !canProceedStep1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all"
              style={{
                background: step === 1 && !canProceedStep1 ? "rgba(0,0,0,0.12)" : ACCENT,
                cursor: step === 1 && !canProceedStep1 ? "not-allowed" : "pointer",
              }}
            >
              Continue <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
              style={{ background: ACCENT }}
            >
              Go to Dashboard <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
