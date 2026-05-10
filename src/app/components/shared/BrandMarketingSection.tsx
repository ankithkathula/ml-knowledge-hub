import { Megaphone, TrendingUp, Users, Eye, Target, Zap, ArrowRight, CheckCircle } from "lucide-react";

interface BrandMarketingSectionProps {
  categoryName: string;
  level: "L2" | "L3" | "L4";
}

export function BrandMarketingSection({ categoryName, level }: BrandMarketingSectionProps) {
  const levelStats = {
    L2: { reach: "280K", engagement: "42%", leads: "1,800" },
    L3: { reach: "120K", engagement: "48%", leads: "950" },
    L4: { reach: "45K", engagement: "56%", leads: "520" },
  };

  const stats = levelStats[level];

  const benefits = [
    { icon: Eye, title: "Enhanced Visibility", desc: `${stats.reach}+ monthly impressions on ${categoryName} pages` },
    { icon: Target, title: "Targeted Audience", desc: "Reach decision-makers actively searching for your products" },
    { icon: TrendingUp, title: "SEO Boost", desc: "High-authority backlinks improving your domain ranking" },
    { icon: Users, title: "Lead Generation", desc: `Avg. ${stats.leads}+ qualified leads per month` },
  ];

  const packages = [
    {
      name: "Basic Listing",
      price: "Free",
      features: ["Company profile", "Product listings", "Contact information", "Basic analytics"],
      cta: "Join Now",
      highlighted: false,
    },
    {
      name: "Featured Brand",
      price: level === "L2" ? "₹15,000/mo" : level === "L3" ? "₹10,000/mo" : "₹6,000/mo",
      features: [
        "Premium badge & priority placement",
        "Brand story & multimedia content",
        "Advanced analytics dashboard",
        "Newsletter feature spots",
        "Direct inquiry management",
      ],
      cta: "Upgrade Now",
      highlighted: true,
    },
    {
      name: "Sponsored Content",
      price: "Custom",
      features: ["Dedicated wiki articles", "Video content integration", "Webinar hosting", "Case study publications"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="brand-marketing" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-5 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Brand Marketing Opportunities
          </h2>
        </div>
      </div>

      {/* Marketing CTA Card */}
      <div 
        className="relative overflow-hidden rounded-2xl mb-8 p-8"
        style={{
          background: "linear-gradient(135deg, rgba(255,106,61,0.08) 0%, rgba(255,106,61,0.03) 100%)",
          border: "2px solid rgba(255,106,61,0.2)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Megaphone className="w-6 h-6" style={{ color: "var(--accent)" }} />
              <span 
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "var(--accent)", color: "white" }}
              >
                FOR BRANDS
              </span>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
              Showcase Your {categoryName} Products to {stats.reach}+ Monthly Visitors
            </h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "700px" }}>
              Join 6,000+ verified brands on Material Library. Get featured placement, generate qualified leads, 
              and establish thought leadership in the construction materials industry.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              className="btn-primary"
              style={{ padding: "12px 24px", fontSize: "0.95rem" }}
            >
              Join as a Brand <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button 
              className="btn-secondary"
              style={{ padding: "12px 24px", fontSize: "0.95rem" }}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div 
              key={idx}
              className="gl-card p-5 text-center"
              style={{ borderRadius: "var(--r-md)" }}
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                <Icon className="w-6 h-6" style={{ color: "var(--accent)" }} />
              </div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
                {benefit.title}
              </h4>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                {benefit.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pricing Packages */}
      

      {/* Success Metrics */}
      
    </section>
  );
}
