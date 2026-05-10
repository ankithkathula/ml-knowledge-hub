import { useState } from "react";
import { Lightbulb, Zap, Globe, MapPin, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface Technology {
  name: string;
  description: string;
  icon?: string;
  benefits?: string[];
  applications?: string[];
}

interface TechnologiesSectionProps {
  level: "L2" | "L3" | "L4";
  technologies: {
    world?: Technology[];
    india?: Technology[];
    specific?: Technology[];
  };
}

export function TechnologiesSection({ level, technologies }: TechnologiesSectionProps) {
  const [activeTab, setActiveTab] = useState<"world" | "india" | "specific">(
    level === "L2" ? "world" : level === "L3" ? "india" : "specific"
  );

  const tabs = [
    { id: "world" as const, label: "Global Technologies", icon: Globe, show: level === "L2" },
    { id: "india" as const, label: "India Market", icon: MapPin, show: level === "L2" || level === "L3" },
    { id: "specific" as const, label: "Product Specific", icon: Zap, show: level === "L3" || level === "L4" },
  ].filter((tab) => tab.show);

  const currentTech = technologies[activeTab] || [];

  return (
    <section id="types">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Types of Technologies Available
        </h2>
      </div>

      {tabs.length > 1 && (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-5">
          <TabsList className="gl-strong">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-xs px-4 py-2">
                <tab.icon className="w-3.5 h-3.5 mr-1.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {currentTech.map((tech, idx) => (
          <div
            key={idx}
            className="gl-card p-5 group hover:border-[var(--accent-border)] transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              {tech.icon && (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "var(--accent-light)" }}
                >
                  {tech.icon}
                </div>
              )}
              <div className="flex-1">
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {tech.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {tech.description}
                </p>
              </div>
            </div>

            {tech.benefits && tech.benefits.length > 0 && (
              <div className="mt-3 pt-3" style={{ borderTop: "var(--border)" }}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                    marginBottom: "6px",
                  }}
                >
                  Key Benefits
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tech.benefits.map((benefit, bidx) => (
                    <span
                      key={bidx}
                      className="px-2 py-1 rounded-md"
                      style={{
                        fontSize: "0.68rem",
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        fontWeight: 600,
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tech.applications && tech.applications.length > 0 && (
              <div className="mt-3 pt-3" style={{ borderTop: "var(--border)" }}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                    marginBottom: "6px",
                  }}
                >
                  Best For
                </p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {tech.applications.join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
