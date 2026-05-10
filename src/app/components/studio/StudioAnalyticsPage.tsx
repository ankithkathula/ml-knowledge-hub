import { useState } from "react";
import {
  Eye, Search, MessageSquare, TrendingUp, TrendingDown, DollarSign,
  Star, Clock, CheckCircle, ArrowUpRight, BarChart3, PieChart,
  Calendar, ChevronDown, ThumbsUp, Zap, Users, Target
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────── */

type DateRange = "week" | "month" | "quarter" | "custom";

/* ── Mock Data ──────────────────────────────────────────────────── */

const kpiData = {
  week: [
    { label: "Profile Views", value: "1,240", change: "+12%", trend: "up" as const, icon: Eye, color: "#3b82f6" },
    { label: "Impressions", value: "8,450", change: "+18%", trend: "up" as const, icon: Search, color: "#a855f7" },
    { label: "Inquiries", value: "34", change: "+8%", trend: "up" as const, icon: MessageSquare, color: "#10b981" },
    { label: "Conversion Rate", value: "12.4%", change: "+1.2%", trend: "up" as const, icon: Target, color: "#f59e0b" },
    { label: "Revenue", value: "Rs 72,000", change: "+22%", trend: "up" as const, icon: DollarSign, color: "#ff6a3d" },
  ],
  month: [
    { label: "Profile Views", value: "5,820", change: "+15%", trend: "up" as const, icon: Eye, color: "#3b82f6" },
    { label: "Impressions", value: "38,200", change: "+20%", trend: "up" as const, icon: Search, color: "#a855f7" },
    { label: "Inquiries", value: "142", change: "+10%", trend: "up" as const, icon: MessageSquare, color: "#10b981" },
    { label: "Conversion Rate", value: "11.8%", change: "+0.8%", trend: "up" as const, icon: Target, color: "#f59e0b" },
    { label: "Revenue", value: "Rs 2,85,000", change: "+18%", trend: "up" as const, icon: DollarSign, color: "#ff6a3d" },
  ],
  quarter: [
    { label: "Profile Views", value: "16,440", change: "+25%", trend: "up" as const, icon: Eye, color: "#3b82f6" },
    { label: "Impressions", value: "1,12,600", change: "+30%", trend: "up" as const, icon: Search, color: "#a855f7" },
    { label: "Inquiries", value: "418", change: "+15%", trend: "up" as const, icon: MessageSquare, color: "#10b981" },
    { label: "Conversion Rate", value: "11.2%", change: "-0.4%", trend: "down" as const, icon: Target, color: "#f59e0b" },
    { label: "Revenue", value: "Rs 8,10,000", change: "+28%", trend: "up" as const, icon: DollarSign, color: "#ff6a3d" },
  ],
  custom: [
    { label: "Profile Views", value: "5,820", change: "+15%", trend: "up" as const, icon: Eye, color: "#3b82f6" },
    { label: "Impressions", value: "38,200", change: "+20%", trend: "up" as const, icon: Search, color: "#a855f7" },
    { label: "Inquiries", value: "142", change: "+10%", trend: "up" as const, icon: MessageSquare, color: "#10b981" },
    { label: "Conversion Rate", value: "11.8%", change: "+0.8%", trend: "up" as const, icon: Target, color: "#f59e0b" },
    { label: "Revenue", value: "Rs 2,85,000", change: "+18%", trend: "up" as const, icon: DollarSign, color: "#ff6a3d" },
  ],
};

const profileViewsTimeline = [
  { label: "Week 1", value: 320 },
  { label: "Week 2", value: 410 },
  { label: "Week 3", value: 385 },
  { label: "Week 4", value: 490 },
  { label: "Week 5", value: 520 },
  { label: "Week 6", value: 475 },
  { label: "Week 7", value: 560 },
  { label: "Week 8", value: 610 },
  { label: "Week 9", value: 580 },
  { label: "Week 10", value: 650 },
  { label: "Week 11", value: 700 },
  { label: "Week 12", value: 740 },
];

const inquirySources = [
  { label: "Direct Search", value: 42, color: "#3b82f6" },
  { label: "Category Browse", value: 28, color: "#10b981" },
  { label: "Blog Referrals", value: 18, color: "#a855f7" },
  { label: "Social Media", value: 15, color: "#f59e0b" },
  { label: "Referrals", value: 12, color: "#ec4899" },
  { label: "Other", value: 5, color: "#6b7280" },
];

const revenueTimeline = [
  { label: "Oct", value: 45000 },
  { label: "Nov", value: 52000 },
  { label: "Dec", value: 48000 },
  { label: "Jan", value: 61000 },
  { label: "Feb", value: 58000 },
  { label: "Mar", value: 72000 },
];

const ratingDistribution = [
  { stars: 5, count: 48, pct: 64 },
  { stars: 4, count: 18, pct: 24 },
  { stars: 3, count: 6, pct: 8 },
  { stars: 2, count: 2, pct: 2.7 },
  { stars: 1, count: 1, pct: 1.3 },
];

const topProjects = [
  { name: "Luxury Villa Waterproofing - Jubilee Hills", views: 342, inquiries: 18, color: "#ff6a3d" },
  { name: "Eco-Friendly Office Interior - HITEC City", views: 285, inquiries: 14, color: "#3b82f6" },
  { name: "Heritage Home Restoration - Secunderabad", views: 210, inquiries: 11, color: "#a855f7" },
  { name: "Commercial Complex Facade - Gachibowli", views: 185, inquiries: 9, color: "#10b981" },
  { name: "Sustainable School Building - Kompally", views: 156, inquiries: 7, color: "#f59e0b" },
];

const topServices = [
  { name: "Waterproofing Consultation", inquiries: 45, rating: 4.9 },
  { name: "Material Selection Advisory", inquiries: 38, rating: 4.8 },
  { name: "Green Building Certification", inquiries: 28, rating: 4.9 },
  { name: "Structural Material Audit", inquiries: 22, rating: 4.7 },
  { name: "Interior Finish Consultation", inquiries: 18, rating: 4.8 },
];

const bestRatedServices = [
  { name: "Green Building Certification", rating: 4.9, reviews: 24 },
  { name: "Waterproofing Consultation", rating: 4.9, reviews: 38 },
  { name: "Material Selection Advisory", rating: 4.8, reviews: 42 },
  { name: "Interior Finish Consultation", rating: 4.8, reviews: 16 },
  { name: "Structural Material Audit", rating: 4.7, reviews: 20 },
];

const engagementMetrics = [
  { label: "Avg Response Time", value: "2.4 hrs", target: "< 4 hrs", status: "good" as const, icon: Clock, color: "#10b981" },
  { label: "Response Rate", value: "96%", target: "> 90%", status: "good" as const, icon: CheckCircle, color: "#3b82f6" },
  { label: "Client Satisfaction", value: "4.8/5", target: "> 4.5", status: "good" as const, icon: ThumbsUp, color: "#f59e0b" },
  { label: "Repeat Client Rate", value: "34%", target: "> 25%", status: "good" as const, icon: Users, color: "#a855f7" },
  { label: "Profile Completion", value: "92%", target: "100%", status: "warning" as const, icon: Zap, color: "#ff6a3d" },
];

/* ── Chart Components ────────────────────────────────────────────── */

function AreaChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const w = 440;
  const h = 140;
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d.value - min) / range) * (h - 20) - 10}`)
    .join(" ");
  const areaPath = `M0,${h} L${pts
    .split(" ")
    .map((p) => p)
    .join(" L")} L${w},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full" style={{ height: 180 }}>
      <defs>
        <linearGradient id={`analytics-area-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#analytics-area-${color.replace("#", "")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={(i / (data.length - 1)) * w}
          cy={h - ((d.value - min) / range) * (h - 20) - 10}
          r={3}
          fill="white"
          stroke={color}
          strokeWidth={2}
        />
      ))}
      {data.map((d, i) => (
        <text
          key={`label-${i}`}
          x={(i / (data.length - 1)) * w}
          y={h + 18}
          textAnchor="middle"
          style={{ fontSize: "8px", fill: "var(--text-muted)" }}
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}

function HorizontalBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)", minWidth: 100, textAlign: "right" }} className="truncate">
            {d.label}
          </span>
          <div className="flex-1 h-3 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(d.value / max) * 100}%`, background: d.color }}
            />
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: d.color, minWidth: 28, textAlign: "right" }}>
            {d.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function VerticalBarChart({ data, color }: { data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-[130px]">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600 }}>
            {(d.value / 1000).toFixed(0)}K
          </span>
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${(d.value / max) * 90}px`,
              background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
              minHeight: 4,
            }}
          />
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */

export function StudioAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("month");

  const currentKpis = kpiData[dateRange];
  const rangeLabels: Record<DateRange, string> = {
    week: "This Week",
    month: "This Month",
    quarter: "This Quarter",
    custom: "Custom Range",
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header + Date Range ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Analytics
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Track your performance, engagement, and growth metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["week", "month", "quarter", "custom"] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: dateRange === range ? "rgba(255,106,61,0.12)" : "rgba(0,0,0,0.03)",
                color: dateRange === range ? "#ff6a3d" : "var(--text-muted)",
                border: dateRange === range ? "1px solid rgba(255,106,61,0.2)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (dateRange !== range) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (dateRange !== range) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }
              }}
            >
              {range === "custom" ? (
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Custom</span>
              ) : (
                rangeLabels[range]
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {currentKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{
                background: `${kpi.color}10`,
                border: `1px solid ${kpi.color}25`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold"
                  style={{
                    color: kpi.trend === "up" ? "#10b981" : "#ef4444",
                    fontSize: "0.7rem",
                  }}
                >
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: kpi.color, lineHeight: 1, marginBottom: 4 }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 500 }}>
                {kpi.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Charts Section ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Line Chart */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Profile Views
            </h3>
            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#10b981" }}>
              <TrendingUp className="w-3 h-3" /> Trending up
            </span>
          </div>
          <AreaChart data={profileViewsTimeline} color="#3b82f6" />
        </div>

        {/* Inquiry Sources */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Inquiry Sources
            </h3>
            <BarChart3 className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </div>
          <HorizontalBarChart data={inquirySources} />
        </div>

        {/* Revenue Trend */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Revenue Trend
            </h3>
            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#10b981" }}>
              <DollarSign className="w-3 h-3" /> +22% this month
            </span>
          </div>
          <VerticalBarChart data={revenueTimeline} color="#10b981" />
        </div>

        {/* Rating Distribution */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Rating Distribution
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>4.8</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>(75 reviews)</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="flex items-center gap-1" style={{ minWidth: 32 }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{r.stars}</span>
                  <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                </span>
                <div className="flex-1 h-2.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${r.pct}%`,
                      background: r.stars >= 4 ? "#f59e0b" : r.stars === 3 ? "#fb923c" : "#ef4444",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", minWidth: 40, textAlign: "right" }}>
                  {r.count} ({r.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top Performing Section ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Projects */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Top Projects by Views
          </h3>
          <div className="space-y-3">
            {topProjects.map((proj, idx) => (
              <div
                key={proj.name}
                className="flex items-start gap-3 p-2.5 rounded-xl transition-all"
                style={{ background: "rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: proj.color }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {proj.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      <Eye className="w-3 h-3 inline mr-0.5" style={{ verticalAlign: "-2px" }} />{proj.views} views
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      <MessageSquare className="w-3 h-3 inline mr-0.5" style={{ verticalAlign: "-2px" }} />{proj.inquiries} inquiries
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Inquired Services */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Most Inquired Services
          </h3>
          <div className="space-y-3">
            {topServices.map((svc) => {
              const maxInq = topServices[0].inquiries;
              return (
                <div key={svc.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                      {svc.name}
                    </span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ff6a3d" }}>{svc.inquiries}</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(svc.inquiries / maxInq) * 100}%`,
                        background: "linear-gradient(90deg, #ff6a3d, #ff8c66)",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{svc.rating} avg rating</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Rated Services */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Best Rated Services
          </h3>
          <div className="space-y-3">
            {bestRatedServices.map((svc) => (
              <div
                key={svc.name}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-all"
                style={{ background: "rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {svc.name}
                  </p>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{svc.reviews} reviews</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3"
                        style={{
                          color: s <= Math.floor(svc.rating) ? "#f59e0b" : "rgba(0,0,0,0.1)",
                          fill: s <= Math.floor(svc.rating) ? "#f59e0b" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b" }}>{svc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Engagement Metrics ────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Engagement Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {engagementMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]"
                style={{
                  background: `${metric.color}08`,
                  border: `1px solid ${metric.color}18`,
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${metric.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: metric.color, lineHeight: 1, marginBottom: 4 }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                  {metric.label}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle
                    className="w-3 h-3"
                    style={{ color: metric.status === "good" ? "#10b981" : "#f59e0b" }}
                  />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: metric.status === "good" ? "#10b981" : "#f59e0b",
                      fontWeight: 500,
                    }}
                  >
                    Target: {metric.target}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
