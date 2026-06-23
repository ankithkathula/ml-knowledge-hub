import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, GraduationCap, ClipboardList, Briefcase, Layout } from "lucide-react";

const ACCENT = "#6366f1";
const PAD = 16; // spotlight padding around the target element

interface Step {
  icon: React.ReactNode;
  title: string;
  body: string;
  anchor: "center" | "bottom-right" | "top-right" | "bottom-center" | "bottom-left";
  hint?: string;
  /** id of the DOM element to spotlight. undefined = dim everything. */
  targetId?: string;
}

const STEPS: Step[] = [
  {
    icon: <span style={{ fontSize: "2rem" }}>🎓</span>,
    title: "Welcome to your dashboard, Priya!",
    body: "This is your student command centre. Courses, assignments, deadlines, jobs, and placements — everything you need for your learning journey lives right here.",
    anchor: "center",
    targetId: "tour-stats",
  },
  {
    icon: <GraduationCap className="w-7 h-7" style={{ color: ACCENT }} />,
    title: "Track your learning",
    body: "The 'Continue Learning' section shows all your enrolled courses with progress bars. One click picks up exactly where you left off.",
    anchor: "bottom-right",
    hint: "↑ Continue Learning is above",
    targetId: "tour-continue-learning",
  },
  {
    icon: <ClipboardList className="w-7 h-7" style={{ color: ACCENT }} />,
    title: "Never miss a deadline",
    body: "The 'Due This Week' section shows assignments needing your attention. You can see days remaining and hit Submit without navigating away.",
    anchor: "top-right",
    hint: "↓ Due This Week is below",
    targetId: "tour-due-this-week",
  },
  {
    icon: <Briefcase className="w-7 h-7" style={{ color: ACCENT }} />,
    title: "Jobs & placements, curated for you",
    body: "'Recommended for You' surfaces internship and full-time roles from ML's brand and studio network — matched to your courses and profile.",
    anchor: "bottom-center",
    hint: "↑ Recommended for You is above",
    targetId: "tour-recommended-jobs",
  },
  {
    icon: <Layout className="w-7 h-7" style={{ color: ACCENT }} />,
    title: "Explore the full platform",
    body: "The sidebar gives you instant access to all sections: Courses, Jobs, Portfolio, Bookmarks, Rewards, and Messages. Profile and Settings are at the bottom.",
    anchor: "bottom-left",
    hint: "← Sidebar is to the left",
    targetId: "tour-sidebar",
  },
];

const ANCHOR_STYLE: Record<Step["anchor"], React.CSSProperties> = {
  center:         { top: "50%",  left: "50%",  transform: "translate(-50%, -50%)" },
  "bottom-right": { bottom: 32,  right: 32 },
  "top-right":    { top: 80,     right: 32 },
  "bottom-center":{ bottom: 32,  left: "50%", transform: "translateX(-50%)" },
  "bottom-left":  { bottom: 32,  left: 272 },
};

// Build a clip-path polygon with a rectangular hole over the target rect.
function spotlightClip(rect: DOMRect): string {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const t = Math.max(0, rect.top - PAD);
  const l = Math.max(0, rect.left - PAD);
  const b = Math.min(H, rect.bottom + PAD);
  const r = Math.min(W, rect.right + PAD);
  // Outer rect, then inner hole (wound opposite direction so it cuts through)
  return `polygon(
    0px 0px, ${W}px 0px, ${W}px ${H}px, 0px ${H}px, 0px 0px,
    ${l}px ${t}px, ${l}px ${b}px, ${r}px ${b}px, ${r}px ${t}px, ${l}px ${t}px
  )`;
}

interface Props {
  onClose: () => void;
}

export function StudentDashboardTutorial({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [clipPath, setClipPath] = useState<string | undefined>(undefined);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  // Measure the target element, scroll it into view, then compute clip-path
  useEffect(() => {
    if (!current.targetId) {
      setClipPath(undefined);
      return;
    }

    const el = document.getElementById(current.targetId);
    if (!el) { setClipPath(undefined); return; }

    // Scroll the element into view so it's visible before measuring
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Slight delay to let scroll settle before measuring
    const t = setTimeout(() => {
      const el2 = document.getElementById(current.targetId!);
      if (el2) setClipPath(spotlightClip(el2.getBoundingClientRect()));
    }, 320);

    return () => clearTimeout(t);
  }, [step, current.targetId]);

  function next() { if (isLast) { onClose(); } else { setStep((s) => s + 1); } }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  // Mobile: always bottom sheet regardless of anchor
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardStyle: React.CSSProperties = isMobile
    ? { bottom: 16, left: 16, right: 16 }
    : ANCHOR_STYLE[current.anchor];

  return (
    <>
      {/* Backdrop with spotlight hole */}
      <motion.div
        key="dash-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] pointer-events-auto"
        style={{
          background: "rgba(10,10,20,0.62)",
          clipPath: clipPath,
          transition: "clip-path 0.35s ease",
        }}
        onClick={onClose}
      />

      {/* Spotlight border glow — sits inside the cutout */}
      {clipPath && (
        <SpotlightRing targetId={current.targetId!} />
      )}

      {/* Tutorial card */}
      <motion.div
        key={`dash-card-${step}`}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="fixed z-[202]"
        style={{
          ...cardStyle,
          width: isMobile ? "auto" : "min(360px, calc(100vw - 2rem))",
          background: "white",
          borderRadius: 22,
          boxShadow: "0 24px 72px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(99,102,241,0.12)" }}>
          <motion.div
            style={{ height: "100%", background: ACCENT, borderRadius: 99 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Dots + close */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 18 : 6,
                  height: 6,
                  background: i <= step ? ACCENT : "rgba(99,102,241,0.15)",
                }}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.10)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)")}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="px-5 pt-4 pb-2"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl mb-4" style={{ background: "rgba(99,102,241,0.08)" }}>
              {current.icon}
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 8 }}>
              {current.title}
            </h3>
            <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {current.body}
            </p>
            {current.hint && (
              <p className="mt-3 text-xs font-semibold" style={{ color: ACCENT }}>
                {current.hint}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={onClose} style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={back}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold"
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
              {isLast ? "Done" : "Next"}
              {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="px-5 pb-4 -mt-2">
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Step {step + 1} of {STEPS.length}</span>
        </div>
      </motion.div>
    </>
  );
}

// Renders an animated indigo ring around the spotlighted element
function SpotlightRing({ targetId }: { targetId: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById(targetId);
      if (el) setRect(el.getBoundingClientRect());
    };
    const t = setTimeout(measure, 340);
    return () => clearTimeout(t);
  }, [targetId]);

  if (!rect) return null;

  return (
    <motion.div
      key={targetId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-[201] pointer-events-none rounded-2xl"
      style={{
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
        border: `2px solid ${ACCENT}`,
        boxShadow: `0 0 0 3px rgba(99,102,241,0.18), inset 0 0 0 3px rgba(99,102,241,0.08)`,
        transition: "all 0.35s ease",
      }}
    />
  );
}
