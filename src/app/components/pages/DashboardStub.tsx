import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

type Tile = { label: string; href?: string; muted?: boolean };

interface DashboardStubProps {
  surface: string;
  tagline: string;
  tiles: Tile[];
}

export function DashboardStub({ surface, tagline, tiles }: DashboardStubProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ background: "var(--bg-hero)", border: "var(--border-subtle)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "0.1em" }}>
            {surface}
          </p>
          <h1 className="text-3xl mb-3" style={{ fontWeight: 700, color: "var(--text-primary)" }}>
            Welcome to your {surface.toLowerCase()}
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--text-secondary)" }}>{tagline}</p>
        </div>

        <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.1em" }}>
          What you'll be able to do
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((t) => (
            <Link
              key={t.label}
              to={t.href || "#"}
              className="rounded-xl p-5 transition-all hover:translate-y-[-2px] flex items-center justify-between"
              style={{ background: "var(--glass-strong)", border: "var(--border-subtle)" }}
            >
              <span className="text-sm" style={{ fontWeight: 600, color: t.muted ? "var(--text-muted)" : "var(--text-primary)" }}>
                {t.label}
              </span>
              <ArrowRight className="w-4 h-4" style={{ color: "var(--accent)", opacity: t.muted ? 0.4 : 1 }} />
            </Link>
          ))}
        </div>

        <p className="text-xs mt-8 text-center" style={{ color: "var(--text-muted)" }}>
          This dashboard is being built — pages marked above will activate as they ship.
        </p>
      </div>
    </div>
  );
}
