import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, LayoutDashboard, Footprints } from "lucide-react";
import { isTourDone, markTourDone } from "./tutorialStore";

const ACCENT = "#ff6a3d";
const PAD = 20;

interface Step {
  icon: React.ReactNode;
  title: string;
  body: string;
  targetId?: string;
}

const STEPS: Step[] = [
  {
    icon: <span style={{ fontSize: "2rem" }}>👋</span>,
    title: "Hi Priya, welcome to Material Library!",
    body: "You're on the student landing page — the gateway to India's most comprehensive AEC materials platform. Let's take a quick look at what's waiting for you.",
    targetId: "landing-tour-hero",
  },
  {
    icon: <span style={{ fontSize: "2rem" }}>🛠️</span>,
    title: "Everything a student needs",
    body: "Access the Knowledge Centre, browse a verified materials database, discover industry trends, connect with professionals, join events, and build an academic portfolio — all in one place.",
    targetId: "landing-tour-capabilities",
  },
  {
    icon: <Footprints className="w-8 h-8" style={{ color: ACCENT }} />,
    title: "Getting started is simple",
    body: "Four steps: create your student profile → explore the catalogue → build your portfolio → connect with studios & brands for placements. The whole journey happens on this platform.",
    targetId: "landing-tour-how-it-works",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8" style={{ color: ACCENT }} />,
    title: "Your dashboard awaits you",
    body: "Once you join, you unlock a full student dashboard with courses, assignments, job listings, placement prep tools, and rewards — all curated for students like you. Ready?",
    targetId: "landing-tour-cta",
  },
];

function spotlightClip(rect: DOMRect): string {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const t = Math.max(0, rect.top - PAD);
  const l = Math.max(0, rect.left - PAD);
  const b = Math.min(H, rect.bottom + PAD);
  const r = Math.min(W, rect.right + PAD);
  return `polygon(
    0px 0px, ${W}px 0px, ${W}px ${H}px, 0px ${H}px, 0px 0px,
    ${l}px ${t}px, ${l}px ${b}px, ${r}px ${b}px, ${r}px ${t}px, ${l}px ${t}px
  )`;
}

interface Props {
  onDismiss?: () => void;
}

export function StudentLandingTutorial({ onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [clipPath, setClipPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isTourDone("landing")) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  // Spotlight: scroll target into view then measure
  useEffect(() => {
    if (!visible) return;
    const targetId = STEPS[step].targetId;
    if (!targetId) { setClipPath(undefined); return; }

    const el = document.getElementById(targetId);
    if (!el) { setClipPath(undefined); return; }

    el.scrollIntoView({ behavior: "smooth", block: "nearest" });

    const t = setTimeout(() => {
      const el2 = document.getElementById(targetId);
      if (el2) setClipPath(spotlightClip(el2.getBoundingClientRect()));
    }, 350);

    return () => clearTimeout(t);
  }, [step, visible]);

  function close() {
    markTourDone("landing");
    setVisible(false);
    onDismiss?.();
  }

  function next() {
    if (step < STEPS.length - 1) { setStep((s) => s + 1); } else { close(); }
  }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop with spotlight hole */}
          <motion.div
            key="landing-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200]"
            style={{
              background: "rgba(10,10,20,0.65)",
              clipPath: clipPath,
              transition: "clip-path 0.35s ease",
            }}
            onClick={close}
          />

          {/* Spotlight ring */}
          {clipPath && current.targetId && (
            <SpotlightRing targetId={current.targetId} accent={ACCENT} />
          )}

          {/* Card — always centered on landing page */}
          <motion.div
            key="landing-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-[201] w-[92vw] sm:w-[400px]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: 24,
              boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div style={{ height: 3, background: "rgba(0,0,0,0.06)" }}>
              <motion.div
                style={{ height: "100%", background: ACCENT, borderRadius: 99 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Dots + close */}
            <div className="flex items-center justify-between px-5 pt-4 pb-0">
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 18 : 6,
                      height: 6,
                      background: i <= step ? ACCENT : "rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={close}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.10)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)")}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="px-5 pt-5 pb-2"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "rgba(255,106,61,0.08)" }}>
                  {current.icon}
                </div>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 10 }}>
                  {current.title}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4">
              <button onClick={close} style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Skip tour
              </button>
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={back}
                    className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-primary)" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={next}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}
                >
                  {isLast ? "Let's go" : "Next"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="px-5 pb-4 -mt-2">
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Step {step + 1} of {STEPS.length}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SpotlightRing({ targetId, accent }: { targetId: string; accent: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) setRect(el.getBoundingClientRect());
    }, 360);
    return () => clearTimeout(t);
  }, [targetId]);

  if (!rect) return null;

  return (
    <motion.div
      key={targetId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-[201] pointer-events-none"
      style={{
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
        border: `2px solid ${accent}`,
        borderRadius: 16,
        boxShadow: `0 0 0 3px rgba(255,106,61,0.18)`,
        transition: "all 0.35s ease",
      }}
    />
  );
}
