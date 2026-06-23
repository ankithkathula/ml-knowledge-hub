import { TrendingUp, Users, IndianRupee, Star, BarChart2 } from "lucide-react";

const MONTHLY_DATA = [
  { month: "Nov", revenue: 82000,  enrollments: 48 },
  { month: "Dec", revenue: 95000,  enrollments: 62 },
  { month: "Jan", revenue: 118000, enrollments: 88 },
  { month: "Feb", revenue: 104000, enrollments: 74 },
  { month: "Mar", revenue: 134000, enrollments: 102 },
  { month: "Apr", revenue: 152000, enrollments: 118 },
  { month: "May", revenue: 186000, enrollments: 142 },
];

const COURSE_BREAKDOWN = [
  { title: "BIM Professional: Revit",       enrolled: 842, revenue: 420000, rating: 4.8, pct: 38 },
  { title: "AutoCAD for Construction",       enrolled: 720, revenue: 290000, rating: 4.5, pct: 25 },
  { title: "Grasshopper & Parametric",       enrolled: 314, revenue: 180000, rating: 4.7, pct: 15 },
  { title: "Smart Home Automation",          enrolled: 182, revenue: 160000, rating: 4.6, pct: 12 },
  { title: "Cost Estimation",                enrolled: 228, revenue: 50000,  rating: 4.4, pct: 10 },
];

const CREATOR_BREAKDOWN = [
  { name: "Dr. Ramesh Iyer",  students: 984, revenue: "₹6.0L", color: "#1e40af" },
  { name: "Priya Suresh",     students: 720, revenue: "₹2.9L", color: "#065f46" },
  { name: "Arjun Nair",       students: 314, revenue: "₹1.8L", color: "#7c3aed" },
  { name: "Meera Pillai",     students: 182, revenue: "₹1.6L", color: "#0e7490" },
  { name: "Sanjay Kumar",     students: 228, revenue: "₹0.5L", color: "#374151" },
];

const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));
const maxEnrol   = Math.max(...MONTHLY_DATA.map((d) => d.enrollments));

export function InstituteAnalyticsPage() {
  return (
    <div className="p-5 sm:p-7 max-w-6xl mx-auto space-y-7">
      <div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Analytics</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Performance overview — last 7 months</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue",    value: "₹18.4L", change: "+23%", icon: IndianRupee, color: "#10b981", bg: "rgba(16,185,129,0.08)" },
          { label: "Total Enrollments",value: "3,842",  change: "+186 this month", icon: Users, color: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
          { label: "Avg Rating",       value: "4.73",   change: "Across 7 courses", icon: Star,  color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
          { label: "Completion Rate",  value: "68%",    change: "+4% vs last mo",   icon: TrendingUp, color: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: s.bg }}>
                <Icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 }}>{s.label}</p>
              <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 2 }}>{s.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <IndianRupee className="w-4 h-4" style={{ color: "#10b981" }} />
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Monthly Revenue</h3>
          </div>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md" style={{ height: `${(d.revenue / maxRevenue) * 140}px`, background: "linear-gradient(180deg, #3b82f6, #1e40af)", minHeight: 4 }} />
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {MONTHLY_DATA.map((d) => (
              <span key={d.month} style={{ fontSize: "0.6rem", color: "var(--text-muted)", flex: 1, textAlign: "center" }}>
                ₹{(d.revenue / 1000).toFixed(0)}K
              </span>
            ))}
          </div>
        </div>

        {/* Enrollment chart */}
        <div className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-4 h-4" style={{ color: "#3b82f6" }} />
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Monthly Enrollments</h3>
          </div>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md" style={{ height: `${(d.enrollments / maxEnrol) * 140}px`, background: "linear-gradient(180deg, #8b5cf6, #6d28d9)", minHeight: 4 }} />
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600 }}>{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {MONTHLY_DATA.map((d) => (
              <span key={d.month} style={{ fontSize: "0.6rem", color: "var(--text-muted)", flex: 1, textAlign: "center" }}>
                {d.enrollments}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Course performance breakdown */}
      <div className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="w-4 h-4" style={{ color: "#f59e0b" }} />
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>Course Revenue Share</h3>
        </div>
        <div className="flex flex-col gap-3.5">
          {COURSE_BREAKDOWN.map((c) => (
            <div key={c.title}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="truncate" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", maxWidth: "60%" }}>{c.title}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.enrolled} students</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10b981" }}>₹{(c.revenue / 100000).toFixed(1)}L</span>
                </div>
              </div>
              <div className="h-2 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: "linear-gradient(90deg, #3b82f6, #6d28d9)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty revenue table */}
      <div className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Faculty Contribution</h3>
        <div className="flex flex-col gap-3">
          {CREATOR_BREAKDOWN.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 py-2 px-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", minWidth: "18px" }}>#{i + 1}</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c.color }}>
                {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>{c.name}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{c.students.toLocaleString()} students</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981" }}>{c.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
