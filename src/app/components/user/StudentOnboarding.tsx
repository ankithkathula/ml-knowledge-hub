import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Check, Link2, Sparkles } from "lucide-react";

const INSTITUTES = [
  "RICS SBE", "CEPT University", "NID Ahmedabad", "SPA Delhi",
  "NICMAR", "Sushant School of Art & Architecture", "Other",
];
const PROGRAMMES = [
  "B.Arch", "B.Des", "M.Arch", "M.Des",
  "B.Sc Interior Design", "M.Sc Interior Design", "Diploma in Interior Design",
];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni"];
const INTERESTS = [
  "Sustainable Design", "Interior Design", "Landscape Architecture", "Urban Planning",
  "Materials & Finishes", "Structural Design", "Lighting Design", "BIM / Revit",
  "Parametric Design", "Heritage Conservation", "Product Design", "Construction Tech",
];

interface StudentOnboardingProps {
  onComplete: () => void;
}

export function StudentOnboarding({ onComplete }: StudentOnboardingProps) {
  const [step, setStep] = useState(1);
  const [institute, setInstitute] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function handleComplete() {
    localStorage.setItem("ml_student_onboarded", "true");
    onComplete();
  }

  function toggleInterest(tag: string) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const canProceedStep1 = institute && programme && year;

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
        {/* Header */}
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    background: s <= step ? "#FF6A3D" : "rgba(0,0,0,0.06)",
                    color: s <= step ? "white" : "var(--text-muted)",
                  }}
                >
                  {s < step ? <Check style={{ width: 13, height: 13 }} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className="h-0.5 w-10"
                    style={{ background: s < step ? "#FF6A3D" : "rgba(0,0,0,0.08)" }}
                  />
                )}
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
            {step === 1
              ? "Welcome to your dashboard 👋"
              : step === 2
              ? "What are you interested in?"
              : "Build your presence"}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
            {step === 1
              ? "Tell us about your academic background to personalise your experience."
              : step === 2
              ? "Select your areas of interest — we'll match you with relevant jobs, courses and events."
              : "Share your portfolio so studios and brands can find you."}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Institute
                  </label>
                  <select
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-xl text-[13px] appearance-none outline-none"
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      color: institute ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    <option value="">Select your institute</option>
                    {INSTITUTES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Programme
                  </label>
                  <select
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-xl text-[13px] appearance-none outline-none"
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      color: programme ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    <option value="">Select your programme</option>
                    {PROGRAMMES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Year of Study
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        className="h-9 rounded-xl text-[12px] font-semibold transition-all"
                        style={{
                          background: year === y ? "#FF6A3D" : "rgba(0,0,0,0.04)",
                          color: year === y ? "white" : "var(--text-secondary)",
                          border: year === y ? "1px solid #FF6A3D" : "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        {y}
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
                  {INTERESTS.map((tag) => {
                    const selected = interests.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleInterest(tag)}
                        className="px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                        style={{
                          background: selected ? "rgba(255,106,61,0.12)" : "rgba(0,0,0,0.04)",
                          color: selected ? "#FF6A3D" : "var(--text-secondary)",
                          border: selected ? "1px solid rgba(255,106,61,0.3)" : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {selected && "✓ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
                {interests.length > 0 && (
                  <p className="mt-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {interests.length} selected
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
                  style={{ background: "rgba(255,106,61,0.06)", border: "1px solid rgba(255,106,61,0.15)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,106,61,0.1)" }}
                  >
                    <Sparkles style={{ width: 20, height: 20, color: "#FF6A3D" }} />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Studios search for talent on Material Library. A complete profile makes you{" "}
                    <strong>3× more likely to get hired</strong>.
                  </p>
                </div>
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Portfolio URL{" "}
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
                      placeholder="https://behance.net/yourname"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    LinkedIn URL{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div className="mt-1 relative">
                    <Link2
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ width: 15, height: 15, color: "var(--text-muted)" }}
                    />
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/yourname"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
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
                background:
                  step === 1 && !canProceedStep1 ? "rgba(0,0,0,0.12)" : "#FF6A3D",
                cursor: step === 1 && !canProceedStep1 ? "not-allowed" : "pointer",
              }}
            >
              Continue <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
              style={{ background: "#FF6A3D" }}
            >
              Go to Dashboard <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
