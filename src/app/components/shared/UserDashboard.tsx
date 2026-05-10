import { 
  Eye, Users, Search, TrendingUp, FileText, Building2, 
  Globe, Activity, Zap, Package 
} from "lucide-react";

export function UserDashboard() {
  // Material Library Platform Statistics
  const platformStats = [
    {
      label: "Monthly Page Views",
      value: "2.8M",
      change: "+18%",
      icon: Eye,
      color: "#ff6a3d",
      bgGradient: "linear-gradient(135deg, rgba(255,106,61,0.1) 0%, rgba(255,106,61,0.05) 100%)",
      border: "1px solid rgba(255,106,61,0.2)",
    },
    {
      label: "Active Users (30d)",
      value: "145K",
      change: "+22%",
      icon: Users,
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, rgba(59, 130, 246,0.1) 0%, rgba(59, 130, 246,0.05) 100%)",
      border: "1px solid rgba(59, 130, 246,0.2)",
    },
    {
      label: "Search Queries/Day",
      value: "28K",
      change: "+15%",
      icon: Search,
      color: "#a855f7",
      bgGradient: "linear-gradient(135deg, rgba(168, 85, 247,0.1) 0%, rgba(168, 85, 247,0.05) 100%)",
      border: "1px solid rgba(168, 85, 247,0.2)",
    },
    {
      label: "Verified Brands",
      value: "6,240",
      change: "+12%",
      icon: Building2,
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, rgba(16, 185, 129,0.1) 0%, rgba(16, 185, 129,0.05) 100%)",
      border: "1px solid rgba(16, 185, 129,0.2)",
    },
    {
      label: "Products Listed",
      value: "52K+",
      change: "+25%",
      icon: Package,
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11,0.1) 0%, rgba(245, 158, 11,0.05) 100%)",
      border: "1px solid rgba(245, 158, 11,0.2)",
    },
    {
      label: "Wiki Articles",
      value: "1,850",
      change: "+8%",
      icon: FileText,
      color: "#ec4899",
      bgGradient: "linear-gradient(135deg, rgba(236, 72, 153,0.1) 0%, rgba(236, 72, 153,0.05) 100%)",
      border: "1px solid rgba(236, 72, 153,0.2)",
    },
    {
      label: "Countries Served",
      value: "24",
      change: "+3",
      icon: Globe,
      color: "#06b6d4",
      bgGradient: "linear-gradient(135deg, rgba(6, 182, 212,0.1) 0%, rgba(6, 182, 212,0.05) 100%)",
      border: "1px solid rgba(6, 182, 212,0.2)",
    },
    {
      label: "Avg. Session Time",
      value: "8.5m",
      change: "+12%",
      icon: Activity,
      color: "#8b5cf6",
      bgGradient: "linear-gradient(135deg, rgba(139, 92, 246,0.1) 0%, rgba(139, 92, 246,0.05) 100%)",
      border: "1px solid rgba(139, 92, 246,0.2)",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>
              Material Library Platform Analytics
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Real-time engagement metrics and platform statistics
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>
              Live Data
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="relative overflow-hidden rounded-xl p-4 group hover:scale-105 transition-all" 
                style={{ background: stat.bgGradient, border: stat.border }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span 
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ 
                      background: stat.change.startsWith('+') ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                      color: stat.change.startsWith('+') ? '#10b981' : '#ef4444'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: stat.color, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "6px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500, lineHeight: 1.3 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Highlights */}
        <div className="mt-6 pt-6" style={{ borderTop: "var(--border)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            Platform Highlights
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--glass-subtle)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,106,61,0.15)" }}>
                <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>98.5% Uptime</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Last 30 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--glass-subtle)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59, 130, 246,0.15)" }}>
                <TrendingUp className="w-4 h-4" style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>4.8/5 Rating</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>User satisfaction</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--glass-subtle)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16, 185, 129,0.15)" }}>
                <Globe className="w-4 h-4" style={{ color: "#10b981" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>24 Countries</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Global reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
