import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Check, Link2, Sparkles } from "lucide-react";

const ACCENT = "#2563eb";

const DEPARTMENTS = [
  "Architecture",
  "Interior Design",
  "Urban Planning",
  "Landscape Architecture",
  "Building Technology",
  "Design History",
];

const DESIGNATIONS = ["Assistant Professor", "Associate Professor", "Professor"];

const RESEARCH_AREAS = [
  "Sustainable Architecture",
  "Biophilic Design",
  "Heritage Conservation",
  "Urban Mobility",
  "Building Materials",
  "Parametric Design",
  "Housing",
  "Vernacular Architecture",
  "Climate-Responsive Design",
  "Digital Fabrication",
  "Landscape Ecology",
  "Accessibility Design",
];

interface FacultyOnboardingProps {
  onComplete: () => void;
}

export function FacultyOnboarding({ onComplete }: FacultyOnboardingProps) {
  const [step, setStep] = useState(1);
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [researchAreas, setResearchAreas] = useState<string[]>([]);
  const [officeHours, setOfficeHours] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [researchgate, setResearchgate] = useState("");

  function handleComplete() {
    localStorage.setItem("ml_faculty_onboarded", "true");
    onComplete();
  }

  function toggleResearchArea(area: string) {
    setResearchAreas((prev) =>
      prev.includes(area) ? prev.filter((x) => x !== area) : [...prev, area]
    );
  }

  const canProceedStep1 = department && designation;

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
              ? "Welcome to your Faculty Hub 👋"
              : step === 2
              ? "What are your research areas?"
              : "Complete your profile"}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
            {step === 1
              ? "Tell us about your department so we can tailor your experience."
              : step === 2
              ? "Select your research interests — we'll surface relevant events and connections."
              : "Add your availability and links so students can connect with you."}
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
                    Department
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {DEPARTMENTS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDepartment(d)}
                        className="py-2 px-3 rounded-xl text-[12px] font-semibold text-left transition-all"
                        style={{
                          background: department === d ? "rgba(37,99,235,0.12)" : "rgba(0,0,0,0.04)",
                          color: department === d ? ACCENT : "var(--text-secondary)",
                          border: department === d ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {department === d && "✓ "}
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Designation
                  </label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {DESIGNATIONS.map((des) => (
                      <button
                        key={des}
                        onClick={() => setDesignation(des)}
                        className="h-10 rounded-xl text-[11px] font-semibold transition-all"
                        style={{
                          background: designation === des ? ACCENT : "rgba(0,0,0,0.04)",
                          color: designation === des ? "white" : "var(--text-secondary)",
                          border: designation === des ? `1px solid ${ACCENT}` : "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        {des}
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
                  {RESEARCH_AREAS.map((area) => {
                    const selected = researchAreas.includes(area);
                    return (
                      <button
                        key={area}
                        onClick={() => toggleResearchArea(area)}
                        className="px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                        style={{
                          background: selected ? "rgba(37,99,235,0.12)" : "rgba(0,0,0,0.04)",
                          color: selected ? ACCENT : "var(--text-secondary)",
                          border: selected ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {selected && "✓ "}
                        {area}
                      </button>
                    );
                  })}
                </div>
                {researchAreas.length > 0 && (
                  <p className="mt-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {researchAreas.length} selected
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
                  style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(37,99,235,0.1)" }}
                  >
                    <Sparkles style={{ width: 20, height: 20, color: ACCENT }} />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Students browse faculty profiles to book office hours and find research mentors.{" "}
                    <strong>Complete your profile to start receiving requests.</strong>
                  </p>
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Office Hours{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={officeHours}
                    onChange={(e) => setOfficeHours(e.target.value)}
                    placeholder="e.g. Mon & Wed, 2–4 PM"
                    className="mt-1 w-full h-10 px-3 rounded-xl text-[13px] outline-none"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    LinkedIn{" "}
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

                <div>
                  <label className="text-[12px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    ResearchGate{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div className="mt-1 relative">
                    <Link2
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ width: 15, height: 15, color: "var(--text-muted)" }}
                    />
                    <input
                      type="url"
                      value={researchgate}
                      onChange={(e) => setResearchgate(e.target.value)}
                      placeholder="https://researchgate.net/profile/yourname"
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
