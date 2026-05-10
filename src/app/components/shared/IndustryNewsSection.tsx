import { Newspaper, Clock, ExternalLink, TrendingUp } from "lucide-react";

interface NewsItem {
  title: string;
  tag: string;
  date: string;
  source?: string;
  url?: string;
}

interface IndustryNewsSectionProps {
  news: NewsItem[];
  categoryName?: string;
}

const newsImages = [
  "https://images.unsplash.com/photo-1650630718105-497674381f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  "https://images.unsplash.com/photo-1731317735479-1011ba08ad65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  "https://images.unsplash.com/photo-1594080051162-74b97d619668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  "https://images.unsplash.com/photo-1646579886741-12b59340c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Policy: { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" },
  Technology: { bg: "rgba(168, 85, 247, 0.1)", color: "#a855f7" },
  Market: { bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  Innovation: { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" },
  Sustainability: { bg: "rgba(34, 197, 94, 0.1)", color: "#22c55e" },
};

export function IndustryNewsSection({ news, categoryName = "Lighting" }: IndustryNewsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Industry News
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600 }}>
            Live Updates
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {news.map((item, idx) => {
          const tagStyle = tagColors[item.tag] || { bg: "rgba(107, 114, 128, 0.1)", color: "#6b7280" };
          return (
            <div
              key={idx}
              className="gl-card flex gap-0 group cursor-pointer hover:border-[var(--accent-border)] transition-all overflow-hidden"
              style={{ padding: 0 }}
            >
              <div className="w-28 h-full flex-shrink-0 relative overflow-hidden" style={{ minHeight: 100 }}>
                <img
                  src={newsImages[idx % newsImages.length]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap"
                    style={{ background: tagStyle.bg, color: tagStyle.color, fontSize: "0.65rem" }}
                  >
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3
                  className="line-clamp-2 group-hover:text-[var(--accent)] transition-colors"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>

                {item.source && (
                  <p className="mt-1.5" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                    {item.source}
                  </p>
                )}
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity m-4 mt-4" style={{ color: "var(--accent)" }} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <button
          className="btn-secondary"
          style={{ fontSize: "0.78rem", padding: "8px 18px" }}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          View All News
        </button>
      </div>
    </section>
  );
}
