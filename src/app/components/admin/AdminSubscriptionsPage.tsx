import { useState } from "react";
import { Check, X, TrendingUp, DollarSign, Users, Crown } from "lucide-react";

type StakeholderType = "Brand" | "Designer" | "Student" | "Institute" | "Studio" | "Faculty";

const PLANS: Record<StakeholderType, { name: string; price: string; color: string; subscribers: number; features: string[]; missing: string[] }[]> = {
  Brand: [
    {
      name: "Free", price: "₹0/mo", color: "#94a3b8", subscribers: 480,
      features: ["3 products listed", "Basic brand profile", "Community access", "Email enquiries"],
      missing: ["Advanced analytics", "Lead management", "Priority listing", "KC Showcase slot", "Bulk product upload", "Custom domain", "Dedicated support"],
    },
    {
      name: "Gold", price: "₹2,999/mo", color: "#b45309", subscribers: 620,
      features: ["50 products listed", "Full brand profile", "Lead management dashboard", "Advanced analytics", "Priority search listing", "2 KC Showcase slots/yr", "Bulk product upload", "Email support"],
      missing: ["Custom domain", "Dedicated account manager", "Exclusive homepage placement"],
    },
    {
      name: "Platinum", price: "₹7,999/mo", color: "#7c3aed", subscribers: 140,
      features: ["Unlimited products", "Full brand profile + custom domain", "Lead management + CRM export", "Advanced analytics + market benchmarks", "Homepage + category priority listing", "Unlimited KC Showcase", "Bulk product upload + API access", "Dedicated account manager", "Exclusive homepage placement", "Co-branded campaigns"],
      missing: [],
    },
  ],
  Designer: [
    {
      name: "Free", price: "₹0/mo", color: "#94a3b8", subscribers: 6240,
      features: ["5 portfolio projects", "Public profile", "Job alerts", "Community access"],
      missing: ["Unlimited projects", "Verified badge", "Priority job applications", "BOM access", "Advanced analytics"],
    },
    {
      name: "Pro", price: "₹499/mo", color: "#1d4ed8", subscribers: 1940,
      features: ["30 portfolio projects", "Verified designer badge", "Priority job applications", "Material BOM access", "Analytics dashboard", "Email support"],
      missing: ["Unlimited projects", "Featured profile placement", "Concierge support"],
    },
    {
      name: "Elite", price: "₹1,499/mo", color: "#7c3aed", subscribers: 240,
      features: ["Unlimited portfolio projects", "Elite verified badge + featured profile", "Priority job applications", "Full BOM + material cost calculator", "Advanced analytics + client leads", "Concierge support", "Exclusive networking events"],
      missing: [],
    },
  ],
  Student: [
    {
      name: "Free", price: "₹0/mo", color: "#94a3b8", subscribers: 52400,
      features: ["5 free courses", "Job board access", "Assignment submission", "Community forum"],
      missing: ["Certificate generation", "Premium courses", "Mentorship sessions", "Portfolio hosting"],
    },
    {
      name: "Premium", price: "₹299/mo", color: "#15803d", subscribers: 10000,
      features: ["Unlimited course access", "Certificate generation", "Mentorship sessions (2/mo)", "Portfolio hosting", "Priority job applications", "Internship board access"],
      missing: [],
    },
  ],
  Institute: [
    {
      name: "Starter", price: "₹4,999/mo", color: "#94a3b8", subscribers: 180,
      features: ["Up to 10 courses", "50 student seats", "Basic analytics", "Faculty management", "Placement board"],
      missing: ["Unlimited courses", "Custom branding", "API access", "Dedicated success manager"],
    },
    {
      name: "Growth", price: "₹14,999/mo", color: "#1d4ed8", subscribers: 110,
      features: ["Up to 100 courses", "500 student seats", "Advanced analytics", "Custom branding", "Faculty management + payroll calc", "Placement board + recruiter access"],
      missing: ["Unlimited seats", "API access", "Dedicated success manager"],
    },
    {
      name: "Enterprise", price: "Custom", color: "#7c3aed", subscribers: 20,
      features: ["Unlimited courses + seats", "Full custom branding + domain", "API access + SSO", "Advanced analytics + benchmarks", "Dedicated success manager", "Co-branded events", "Priority listing + homepage slot"],
      missing: [],
    },
  ],
  Studio: [
    {
      name: "Free", price: "₹0/mo", color: "#94a3b8", subscribers: 290,
      features: ["3 portfolio projects", "Basic studio profile", "1 KC booking/yr", "Community access"],
      missing: ["Unlimited projects", "Lead management", "Priority KC bookings", "Verified badge"],
    },
    {
      name: "Pro", price: "₹1,999/mo", color: "#1d4ed8", subscribers: 310,
      features: ["25 portfolio projects", "Full studio profile + verified badge", "10 KC bookings/yr", "Lead management", "Analytics dashboard", "Priority search listing", "Email support"],
      missing: ["Unlimited projects", "Unlimited KC bookings", "Dedicated account manager"],
    },
    {
      name: "Elite", price: "₹5,999/mo", color: "#7c3aed", subscribers: 70,
      features: ["Unlimited portfolio projects", "Elite badge + featured placement", "Unlimited KC bookings", "Lead management + CRM export", "Advanced analytics", "Dedicated account manager", "Co-branded project showcases"],
      missing: [],
    },
  ],
  Faculty: [
    {
      name: "Free", price: "₹0/mo", color: "#94a3b8", subscribers: 1120,
      features: ["1 course published", "Basic faculty profile", "Student management (50)", "Community access"],
      missing: ["Unlimited courses", "Verified badge", "Revenue sharing", "Advanced analytics"],
    },
    {
      name: "Pro", price: "₹799/mo", color: "#1d4ed8", subscribers: 640,
      features: ["10 courses published", "Verified faculty badge", "Student management (500)", "40% revenue share on courses", "Analytics dashboard", "Email support"],
      missing: ["Unlimited courses", "60% revenue share", "Featured placement"],
    },
    {
      name: "Elite", price: "₹1,999/mo", color: "#7c3aed", subscribers: 130,
      features: ["Unlimited courses", "Elite badge + featured placement", "Unlimited students", "60% revenue share on courses", "Advanced analytics + student insights", "Priority course discovery placement", "Dedicated support"],
      missing: [],
    },
  ],
};

const STAKEHOLDERS: StakeholderType[] = ["Brand", "Designer", "Student", "Institute", "Studio", "Faculty"];

export function AdminSubscriptionsPage() {
  const [active, setActive] = useState<StakeholderType>("Brand");

  const totalSubs = PLANS[active].reduce((s, p) => s + p.subscribers, 0);
  const paidSubs = PLANS[active].slice(1).reduce((s, p) => s + p.subscribers, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Subscription Management</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Plan tiers and subscriber counts by stakeholder type</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <DollarSign className="w-4 h-4" style={{ color: "#16a34a" }} />
            <div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1 }}>Paid subscribers</p>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#16a34a", lineHeight: 1.2 }}>{paidSubs.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STAKEHOLDERS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: active === s ? "#ff6a3d" : "white",
              color: active === s ? "white" : "var(--text-secondary)",
              border: active === s ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {s}s
          </button>
        ))}
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {PLANS[active].map((plan) => (
          <div key={plan.name} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4" style={{ color: plan.color }} />
              <span style={{ fontWeight: 700, fontSize: "0.88rem", color: plan.color }}>{plan.name}</span>
            </div>
            <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>{plan.subscribers.toLocaleString()}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>subscribers · {plan.price}</p>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${(plan.subscribers / totalSubs) * 100}%`, background: plan.color }} />
            </div>
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 4 }}>
              {Math.round((plan.subscribers / totalSubs) * 100)}% of {active.toLowerCase()} base
            </p>
          </div>
        ))}
      </div>

      {/* Plan comparison table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>{active} Plan Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th className="text-left px-5 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Feature</th>
                {PLANS[active].map((p) => (
                  <th key={p.name} className="px-5 py-3 text-center" style={{ fontSize: "0.78rem", fontWeight: 800, color: p.color }}>{p.name}<br /><span style={{ fontWeight: 400, fontSize: "0.7rem", color: "var(--text-muted)" }}>{p.price}</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Combine all features from all plans (deduped) */}
              {Array.from(new Set(PLANS[active].flatMap((p) => [...p.features, ...p.missing]))).map((feature, i, arr) => (
                <tr key={feature} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                  <td className="px-5 py-3" style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{feature}</td>
                  {PLANS[active].map((p) => (
                    <td key={p.name} className="px-5 py-3 text-center">
                      {p.features.includes(feature)
                        ? <Check className="w-4 h-4 mx-auto" style={{ color: "#16a34a" }} />
                        : <X className="w-4 h-4 mx-auto" style={{ color: "#cbd5e1" }} />
                      }
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ background: "rgba(0,0,0,0.02)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <td className="px-5 py-3" style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-primary)" }}>Subscribers</td>
                {PLANS[active].map((p) => (
                  <td key={p.name} className="px-5 py-3 text-center" style={{ fontWeight: 800, fontSize: "0.95rem", color: p.color }}>{p.subscribers.toLocaleString()}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
