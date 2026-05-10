import { CheckCircle2, AlertCircle, Lightbulb, ShoppingBag } from "lucide-react";

interface Criterion {
  title: string;
  description: string;
  tips?: string[];
  importance: "critical" | "important" | "optional";
}

interface SelectionCriteriaSectionProps {
  criteria: Criterion[];
  level?: "L3" | "L4";
}

export function SelectionCriteriaSection({ criteria, level = "L3" }: SelectionCriteriaSectionProps) {
  const importanceConfig = {
    critical: { icon: AlertCircle, bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444", label: "Critical" },
    important: { icon: Lightbulb, bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", label: "Important" },
    optional: { icon: CheckCircle2, bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", label: "Optional" },
  };

  return (
    <section id="selection">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Selection Criteria & Buying Guide
        </h2>
      </div>

      <div
        className="rounded-2xl p-6 mb-5"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(168, 85, 247, 0.06) 100%)",
          border: "var(--border)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(59, 130, 246, 0.15)" }}
          >
            <ShoppingBag className="w-5 h-5" style={{ color: "#3b82f6" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
              Expert Buying Recommendations
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {level === "L4"
                ? "Product-specific recommendations to help you choose the right solution for your project needs."
                : "Key factors to consider when selecting products in this category for your project."}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion, idx) => {
          const config = importanceConfig[criterion.importance];
          const Icon = config.icon;

          return (
            <div
              key={idx}
              className="gl-card p-5 hover:border-[var(--accent-border)] transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: config.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: config.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {criterion.title}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        background: config.bg,
                        color: config.color,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {criterion.description}
                  </p>
                </div>
              </div>

              {criterion.tips && criterion.tips.length > 0 && (
                <div
                  className="mt-3 pt-3 space-y-2"
                  style={{ borderTop: "var(--border)" }}
                >
                  {criterion.tips.map((tip, tidx) => (
                    <div key={tidx} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: "#10b981" }}
                      />
                      <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
