import { Award, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../data/designerData";

const ACCENT = "#8b5cf6";
const COLORS = ["#8b5cf6", "#3b82f6", "#f97316", "#10b981"];

export function DesignerCertificationsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-6">
      <div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Certifications</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{CERTIFICATIONS.length} certifications earned</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((cert, idx) => {
          const color = COLORS[idx % COLORS.length];
          return (
            <div
              key={cert.id}
              className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Award style={{ color, width: 24, height: 24 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{cert.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 4, fontWeight: 500 }}>{cert.issuer}</div>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: `${color}12`, color }}>
                      Issued {cert.year}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer" style={{ color: "var(--text-muted)" }}>
                      <ExternalLink className="w-3 h-3" /> {cert.credentialId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Certification CTA */}
      <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: `rgba(139,92,246,0.05)`, border: `1px dashed rgba(139,92,246,0.3)` }}>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Add a certification</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>Showcase your credentials to potential employers</div>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          + Add
        </button>
      </div>
    </div>
  );
}
