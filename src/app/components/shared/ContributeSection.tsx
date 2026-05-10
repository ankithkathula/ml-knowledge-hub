import { PenLine, Trophy } from "lucide-react";

interface Contributor {
  name: string;
  initials: string;
  contributions: number;
  rank?: number;
}

interface ContributeSectionProps {
  topContributors: Contributor[];
  categoryName?: string;
}

export function ContributeSection({ topContributors, categoryName = "this category" }: ContributeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Contributors
        </h2>
      </div>

      <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Stacked avatars */}
        <div className="flex -space-x-2.5 flex-shrink-0">
          {topContributors.slice(0, 5).map((c, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-full flex items-center justify-center ring-2 ring-white"
              style={{
                background: `hsl(${i * 50 + 15}, 60%, 52%)`,
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 700,
                zIndex: 5 - i,
              }}
            >
              {c.initials}
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>
            {topContributors.length} experts contribute to {categoryName}
          </p>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
            Share your expertise -- write guides, reviews, or technical articles.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg flex-shrink-0"
          style={{ background: "var(--accent)", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}
        >
          <PenLine className="w-3.5 h-3.5" /> Contribute
        </button>
      </div>
    </section>
  );
}
