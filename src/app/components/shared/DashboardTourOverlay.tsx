import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const PAD = 16;

export interface TourStep {
  icon: React.ReactNode;
  title: string;
  body: string;
  anchor: "center" | "bottom-right" | "top-right" | "bottom-center" | "bottom-left";
  hint?: string;
  targetId?: string;
}

const ANCHOR_STYLE: Record<TourStep["anchor"], React.CSSProperties> = {
  center:          { top: "50%",  left: "50%",  transform: "translate(-50%, -50%)" },
  "bottom-right":  { bottom: 32,  right: 32 },
  "top-right":     { top: 80,     right: 32 },
  "bottom-center": { bottom: 32,  left: "50%", transform: "translateX(-50%)" },
  "bottom-left":   { bottom: 32,  left: 272 },
};

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

function SpotlightRing({ targetId, accent }: { targetId: string; accent: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) setRect(el.getBoundingClientRect());
    }, 340);
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
        border: `2px solid ${accent}`,
        boxShadow: `0 0 0 3px ${accent}30, inset 0 0 0 3px ${accent}14`,
        transition: "all 0.35s ease",
      }}
    />
  );
}

interface Props {
  steps: TourStep[];
  accent: string;
  accentRGB: string;
  onClose: () => void;
}

export function DashboardTourOverlay({ steps, accent, accentRGB, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [clipPath, setClipPath] = useState<string | undefined>(undefined);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    if (!current.targetId) { setClipPath(undefined); return; }
    const el = document.getElementById(current.targetId);
    if (!el) { setClipPath(undefined); return; }
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const t = setTimeout(() => {
      const el2 = document.getElementById(current.targetId!);
      if (el2) setClipPath(spotlightClip(el2.getBoundingClientRect()));
    }, 320);
    return () => clearTimeout(t);
  }, [step, current.targetId]);

  function next() { if (isLast) { onClose(); } else { setStep((s) => s + 1); } }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardStyle: React.CSSProperties = isMobile
    ? { bottom: 16, left: 16, right: 16 }
    : ANCHOR_STYLE[current.anchor];

  return (
    <>
      <motion.div
        key="tour-backdrop"
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

      {clipPath && <SpotlightRing targetId={current.targetId!} accent={accent} />}

      <motion.div
        key={`tour-card-${step}`}
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
        <div style={{ height: 3, background: `rgba(${accentRGB},0.12)` }}>
          <motion.div
            style={{ height: "100%", background: accent, borderRadius: 99 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Dots + close */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 18 : 6,
                  height: 6,
                  background: i <= step ? accent : `rgba(${accentRGB},0.15)`,
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
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
              style={{ background: `rgba(${accentRGB},0.08)` }}
            >
              {current.icon}
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 8 }}>
              {current.title}
            </h3>
            <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {current.body}
            </p>
            {current.hint && (
              <p className="mt-3 text-xs font-semibold" style={{ color: accent }}>
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
              style={{ background: accent }}
            >
              {isLast ? "Done" : "Next"}
              {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="px-5 pb-4 -mt-2">
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Step {step + 1} of {steps.length}</span>
        </div>
      </motion.div>
    </>
  );
}
