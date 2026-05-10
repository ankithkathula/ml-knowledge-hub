import { useState } from "react";
import { TrendingUp, Users, Package, Eye, Globe, MapPin, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface MetricsSectionProps {
  level: "L1" | "L2" | "L3" | "L4";
  categoryName?: string;
  regionalData?: {
    region: string;
    brands: number;
    products: number;
    experts: number;
    pageViews: string;
  }[];
}

export function MetricsSection({ level, categoryName = "Lighting", regionalData }: MetricsSectionProps) {
  const [viewMode, setViewMode] = useState<"overall" | "country" | "region">("overall");

  // Mock data that becomes more granular at deeper levels
  const overallMetrics = {
    L1: {
      brands: 12500,
      products: 125000,
      experts: 850,
      pageViews: "8.5M",
    },
    L2: {
      brands: 500,
      products: 12000,
      experts: 48,
      pageViews: "3.2M",
    },
    L3: {
      brands: 320,
      products: 4800,
      experts: 32,
      pageViews: "1.8M",
    },
    L4: {
      brands: 145,
      products: 2100,
      experts: 18,
      pageViews: "850K",
    },
  };

  const countryMetrics = {
    national: {
      brands: level === "L4" ? 85 : level === "L3" ? 180 : level === "L2" ? 280 : 5200,
      products: level === "L4" ? 1250 : level === "L3" ? 2800 : level === "L2" ? 7800 : 68000,
    },
    international: {
      brands: level === "L4" ? 60 : level === "L3" ? 140 : level === "L2" ? 220 : 7300,
      products: level === "L4" ? 850 : level === "L3" ? 2000 : level === "L2" ? 4200 : 57000,
    },
  };

  const defaultRegionalData = [
    { region: "North India", brands: 42, products: 680, experts: 6, pageViews: "285K" },
    { region: "South India", brands: 38, products: 620, experts: 7, pageViews: "245K" },
    { region: "West India", brands: 35, products: 550, experts: 5, pageViews: "220K" },
    { region: "East India", brands: 30, products: 450, experts: 4, pageViews: "100K" },
  ];

  const regions = regionalData || defaultRegionalData;
  const metrics = overallMetrics[level];

  return (
    <section className="space-y-4">
      {/* Header with toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Material Library Metrics
          </h2>
        </div>

        {/* Region Toggle - Only show for L3 and L4 */}
        {(level === "L3" || level === "L4") && (
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-auto">
            <TabsList className="gl-strong h-9">
              <TabsTrigger value="overall" className="text-xs px-3 py-1.5">
                <Globe className="w-3 h-3 mr-1.5" />
                Overall
              </TabsTrigger>
              <TabsTrigger value="country" className="text-xs px-3 py-1.5">
                <MapPin className="w-3 h-3 mr-1.5" />
                India
              </TabsTrigger>
              <TabsTrigger value="region" className="text-xs px-3 py-1.5">
                <BarChart3 className="w-3 h-3 mr-1.5" />
                Regional
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {viewMode === "overall" && (
          <>
            <div className="gl-card p-5 group hover:border-[var(--accent-border)] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--accent-light)" }}
                >
                  <Package className="w-4 h-4" style={{ color: "var(--accent)" }} />
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {metrics.brands.toLocaleString()}+
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Verified Brands
              </p>
            </div>

            <div className="gl-card p-5 group hover:border-[var(--accent-border)] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(59, 130, 246, 0.1)" }}
                >
                  <BarChart3 className="w-4 h-4" style={{ color: "#3b82f6" }} />
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#3b82f6",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {metrics.products.toLocaleString()}+
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Unique Products
              </p>
            </div>

            <div className="gl-card p-5 group hover:border-[var(--accent-border)] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(16, 185, 129, 0.1)" }}
                >
                  <Users className="w-4 h-4" style={{ color: "#10b981" }} />
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#10b981",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {metrics.experts}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Industry Experts
              </p>
            </div>

            <div className="gl-card p-5 group hover:border-[var(--accent-border)] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(168, 85, 247, 0.1)" }}
                >
                  <Eye className="w-4 h-4" style={{ color: "#a855f7" }} />
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#a855f7",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {metrics.pageViews}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Page Views / Mo
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span style={{ fontSize: "0.62rem", color: "#10b981", fontWeight: 600 }}>
                  Live
                </span>
              </div>
            </div>
          </>
        )}

        {viewMode === "country" && (
          <>
            <div className="lg:col-span-2 gl-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #ff9933 0%, #138808 100%)" }}
                >
                  🇮🇳
                </div>
                <div>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                    National Players
                  </p>
                  <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {countryMetrics.national.brands}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: "var(--border)" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Brands</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
                    {countryMetrics.national.brands}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Products</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3b82f6" }}>
                    {countryMetrics.national.products.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 gl-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
                >
                  🌏
                </div>
                <div>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                    International Players
                  </p>
                  <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {countryMetrics.international.brands}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: "var(--border)" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Brands</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
                    {countryMetrics.international.brands}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Products</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3b82f6" }}>
                    {countryMetrics.international.products.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {viewMode === "region" && regions.map((region, idx) => (
          <div key={idx} className="gl-card p-4 hover:border-[var(--accent-border)] transition-all">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {region.region}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Brands</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)" }}>
                  {region.brands}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Products</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3b82f6" }}>
                  {region.products}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Experts</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981" }}>
                  {region.experts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Views/mo</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#a855f7" }}>
                  {region.pageViews}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
