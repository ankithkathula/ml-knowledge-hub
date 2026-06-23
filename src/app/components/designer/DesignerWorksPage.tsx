import { useState } from "react";
import { Eye, Heart, Plus, Globe, Lock } from "lucide-react";
import { PORTFOLIO_WORKS } from "../data/designerData";

const ACCENT = "#8b5cf6";
const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Institutional"];

export function DesignerWorksPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PORTFOLIO_WORKS : PORTFOLIO_WORKS.filter(w => w.category === active);

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>My Works</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>{PORTFOLIO_WORKS.length} projects published</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: active === cat ? ACCENT : "rgba(0,0,0,0.04)", color: active === cat ? "white" : "var(--text-secondary)" }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((work) => (
          <div key={work.id} className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="h-44 relative" style={{ background: work.gradient }}>
              <div className="absolute inset-0 flex items-end p-4">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
                  {work.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                {work.isPublic
                  ? <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}><Globe style={{ color: "#10b981", width: 14, height: 14 }} /></div>
                  : <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)" }}><Lock style={{ color: "white", width: 14, height: 14 }} /></div>
                }
              </div>
            </div>
            <div className="p-4">
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{work.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{work.client} · {work.year}</div>
              <p className="mt-2 line-clamp-2" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{work.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}><Eye className="w-3.5 h-3.5" />{work.views}</span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}><Heart className="w-3.5 h-3.5" />{work.likes}</span>
                <div className="flex gap-1.5 ml-auto flex-wrap">
                  {work.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(139,92,246,0.08)", color: ACCENT }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
