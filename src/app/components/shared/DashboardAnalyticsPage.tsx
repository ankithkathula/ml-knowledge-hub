import { getAuthUser } from "../../utils/auth";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared analytics page used by all dashboards.
   Role is inferred from the auth user's type.
───────────────────────────────────────────────────────────────────────────── */

// ── Heatmap helpers ────────────────────────────────────────────────────────

function generateWeeklyHeatmap(): number[][] {
  return Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, () => {
      const base = Math.random();
      // Weekend dip
      return Math.round(base * 8);
    })
  );
}

function heatColor(val: number, accent: string): string {
  if (val === 0) return "rgba(0,0,0,0.06)";
  const opacity = 0.15 + (val / 8) * 0.85;
  return `${accent}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];

function generateHourHeatmap(): number[][] {
  return Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 6 }, (_, hour) => {
      const isWeekend = day >= 5;
      const isPeak = hour >= 1 && hour <= 3;
      const val = Math.random() * (isWeekend ? 4 : isPeak ? 9 : 6);
      return Math.round(val);
    })
  );
}

// ── Role-specific data ────────────────────────────────────────────────────

interface RoleAnalytics {
  accent: string;
  accentRGB: string;
  bgColor: string;
  kpis: { label: string; value: string; trend: string; up: boolean }[];
  working: { title: string; detail: string }[];
  notWorking: { title: string; detail: string }[];
  topItems: { label: string; value: number; max: number; unit: string }[];
  heatmapLabel: string;
  hourLabel: string;
}

function getRoleData(type: string | undefined): RoleAnalytics {
  switch (type) {
    case "Student":
      return {
        accent: "#6366f1", accentRGB: "99,102,241", bgColor: "#f5f3ff",
        kpis: [
          { label: "Course Completion Rate", value: "74%",   trend: "+8% this month",   up: true  },
          { label: "Avg. Assignment Score",  value: "82/100", trend: "+5 pts vs last sem", up: true },
          { label: "Active Weeks",           value: "14/18", trend: "On track",           up: true  },
          { label: "Jobs Applied",           value: "5",     trend: "-2 this week",       up: false },
        ],
        working: [
          { title: "High course engagement on Tuesdays & Thursdays", detail: "Your peak learning sessions fall in afternoon slots — your scores in these sessions are 23% higher than morning attempts." },
          { title: "BIM course progressing well", detail: "BIM for Interior Designers has a 94% completion rate for your enrolled cohort — you're in the top quartile." },
          { title: "Portfolio views increasing", detail: "Your portfolio received 48 views this month — up 31% from April. Hiring studios are your top visitor segment." },
        ],
        notWorking: [
          { title: "Assignment submissions are last-minute", detail: "7 of your last 10 assignments were submitted within 2 hours of the deadline. Early submission correlates with 12% better scores." },
          { title: "Low engagement on weekends", detail: "Weekend activity is 78% lower than weekdays. Even 30 mins of reading on Saturday can significantly improve retention." },
          { title: "Job applications stalling", detail: "5 applications sent, 0 responses. Your profile is missing a project portfolio link — profiles with portfolio links get 3× more callbacks." },
        ],
        topItems: [
          { label: "BIM for Interior Designers", value: 82, max: 100, unit: "%" },
          { label: "Green Building Materials",   value: 67, max: 100, unit: "%" },
          { label: "Sustainable Architecture",   value: 41, max: 100, unit: "%" },
        ],
        heatmapLabel: "Learning Activity (past 52 weeks)",
        hourLabel: "Most active learning hours",
      };

    case "Interior Designer":
      return {
        accent: "#8b5cf6", accentRGB: "139,92,246", bgColor: "#f5f3ff",
        kpis: [
          { label: "Profile Views",     value: "1,240", trend: "+18% this month",    up: true  },
          { label: "Works Engagement",  value: "4.2×",  trend: "vs platform avg",    up: true  },
          { label: "Job Applications",  value: "8",     trend: "3 shortlisted",       up: true  },
          { label: "Blog Reach",        value: "2,840", trend: "-12% vs last month",  up: false },
        ],
        working: [
          { title: "Portfolio drives 68% of profile views", detail: "Visitors who land on your works page spend 3.4× longer on your profile. Adding 2 more projects could push views past 1,500." },
          { title: "Luxury residential is your highest-rated category", detail: "Projects tagged 'Luxury Residential' average 4.8 stars vs 4.1 for commercial. Studios in this segment are actively hiring." },
          { title: "Endorsements converting to enquiries", detail: "3 of your 8 job applications came via verifier profiles who endorsed your work. Network-driven applications have a 40% higher response rate." },
        ],
        notWorking: [
          { title: "Blog traffic declining despite quality", detail: "Posts published on weekends get 58% fewer impressions. Shift to Tuesday/Wednesday publishing for better algorithmic reach." },
          { title: "Missing BIM certification", detail: "78% of studio job listings now require BIM proficiency. Your profile is filtered out of these searches. Completing the BIM course takes ~6 weeks." },
          { title: "Workspace section underutilised", detail: "Your saved product collections have 0 shares. Designers who share curated collections get 2× profile discovery via brand channels." },
        ],
        topItems: [
          { label: "Luxury Residential Works", value: 92, max: 100, unit: "engagement" },
          { label: "Commercial Interiors",      value: 71, max: 100, unit: "engagement" },
          { label: "Hospitality Projects",      value: 58, max: 100, unit: "engagement" },
        ],
        heatmapLabel: "Platform Activity (past 52 weeks)",
        hourLabel: "Most active browsing hours",
      };

    case "Studio":
      return {
        accent: "#FF6A3D", accentRGB: "255,106,61", bgColor: "#fff5f0",
        kpis: [
          { label: "Profile Views",        value: "3,420", trend: "+22% this month",  up: true  },
          { label: "Enquiry Conversion",   value: "18%",   trend: "+4% vs last qtr",  up: true  },
          { label: "Active Projects",      value: "7",     trend: "2 closing soon",    up: false },
          { label: "Avg. Project Value",   value: "₹28L",  trend: "+11% YoY",          up: true  },
        ],
        working: [
          { title: "KC visits converting at 2× industry average", detail: "Designers who visit your KC before a project decision have a 36% booking rate — well above the 18% platform average." },
          { title: "Hospitality segment is outperforming", detail: "Your 3 hospitality projects drove 44% of all enquiries despite being 20% of your portfolio. Target more hospitality leads." },
          { title: "Fast response time builds trust", detail: "Your average enquiry response time is 1.8 hours — studios under 2 hours have 2.4× higher booking rates." },
        ],
        notWorking: [
          { title: "Residential bookings are stalling", detail: "12 residential enquiries in the last 60 days resulted in 1 booking. Your portfolio shows commercial strength — residential clients may not feel confident." },
          { title: "Blog content has low organic reach", detail: "3 blogs published, averaging 140 views. Adding material specification tags increases search discoverability by 3×." },
          { title: "Team page is incomplete", detail: "Studios with complete team pages (photos + bios) get 28% more bookings. Your team page is missing 4 member bios." },
        ],
        topItems: [
          { label: "Hospitality Projects",   value: 88, max: 100, unit: "enquiry score" },
          { label: "Commercial Interiors",   value: 74, max: 100, unit: "enquiry score" },
          { label: "Luxury Residential",     value: 52, max: 100, unit: "enquiry score" },
        ],
        heatmapLabel: "Studio Activity (past 52 weeks)",
        hourLabel: "Enquiry peak hours",
      };

    case "Retail Customer":
      return {
        accent: "#0891b2", accentRGB: "8,145,178", bgColor: "#f0fdff",
        kpis: [
          { label: "Products Saved",   value: "34",   trend: "+6 this week",      up: true  },
          { label: "Projects Active",  value: "2",    trend: "1 completing soon",  up: false },
          { label: "Moodboards",       value: "5",    trend: "+2 this month",      up: true  },
          { label: "Brands Followed",  value: "8",    trend: "3 new collections",  up: true  },
        ],
        working: [
          { title: "Flooring & tiles are your top category", detail: "67% of your saved products are in flooring. 3 brands have launched new collections matching your saved palette." },
          { title: "Project-based wishlist drives decisions", detail: "Products saved to a specific project have a 4× higher chance of being purchased vs generic wishlist saves." },
          { title: "Service discovery increasing", detail: "You've viewed 12 interior designer profiles this month — up 3× from last month. Ready to connect with one for your renovation?" },
        ],
        notWorking: [
          { title: "Moodboards have no shared collaborators", detail: "Your 5 moodboards are private. Sharing with your architect or spouse can reduce decision time by 60%." },
          { title: "Budget range not set on projects", detail: "Projects without a budget filter show you products across all price points. Setting a budget narrows to the right tier instantly." },
          { title: "No KC visit booked yet", detail: "3 brands on your wishlist have Knowledge Centres nearby. A KC visit lets you see, touch, and test materials before buying." },
        ],
        topItems: [
          { label: "Flooring Products",    value: 67, max: 100, unit: "% of saves" },
          { label: "Wall Finishes",        value: 18, max: 100, unit: "% of saves" },
          { label: "Sanitary & Fittings",  value: 10, max: 100, unit: "% of saves" },
        ],
        heatmapLabel: "Browsing Activity (past 52 weeks)",
        hourLabel: "Most active shopping hours",
      };

    case "Faculty":
      return {
        accent: "#2563eb", accentRGB: "37,99,235", bgColor: "#eff6ff",
        kpis: [
          { label: "Avg. Student Score",    value: "76/100", trend: "+4 pts this sem",  up: true  },
          { label: "Submission Rate",       value: "88%",    trend: "-3% vs last month", up: false },
          { label: "Course Completion",     value: "71%",    trend: "On track",           up: true  },
          { label: "Student Satisfaction",  value: "4.6★",   trend: "+0.3 this sem",     up: true  },
        ],
        working: [
          { title: "Live sessions outperform recorded content", detail: "Attendance in your Thursday live classes is 94% vs 61% for recorded module consumption. Students ask 3× more questions in live sessions." },
          { title: "Assignment feedback drives improvement", detail: "Students who received your detailed feedback improved scores by an average of 14 points on the next attempt." },
          { title: "Research module engagement is highest", detail: "Your Sustainable Materials Research module has the highest completion rate (94%) in the institute — considered for replication across departments." },
        ],
        notWorking: [
          { title: "Late submissions are rising", detail: "28% of assignments were submitted after the deadline — up from 18% last semester. Consider breaking large assignments into milestone check-ins." },
          { title: "Quiz scores declining mid-module", detail: "Students show a consistent drop in quiz scores at week 5-6. This typically signals content density is too high — consider a mid-module revision session." },
          { title: "Low participation in discussion forums", detail: "Only 22% of students post in discussion forums. Tying 5% of grade to forum participation increases engagement significantly." },
        ],
        topItems: [
          { label: "Sustainable Arch. Module",  value: 94, max: 100, unit: "completion" },
          { label: "BIM Fundamentals",           value: 78, max: 100, unit: "completion" },
          { label: "Construction Technology",    value: 63, max: 100, unit: "completion" },
        ],
        heatmapLabel: "Teaching Activity (past 52 weeks)",
        hourLabel: "Student submission patterns",
      };

    case "Brand":
      return {
        accent: "#0284c7", accentRGB: "2,132,199", bgColor: "#f0f9ff",
        kpis: [
          { label: "Designer Reach",       value: "4,820", trend: "+31% this month",  up: true  },
          { label: "Enquiry Conversion",   value: "12%",   trend: "+2% vs last qtr",  up: true  },
          { label: "KC Visit Rate",        value: "38",    trend: "14 this week",      up: true  },
          { label: "Sample Requests",      value: "47",    trend: "-8 vs last month",  up: false },
        ],
        working: [
          { title: "OPC 53 cement drives 40% of all enquiries", detail: "Your flagship product accounts for a disproportionate share of enquiries. Prioritise stock and pricing updates here first." },
          { title: "KC visits from studios converting at 36%", detail: "Studio architects who visit your Knowledge Centre have a 36% purchase conversion — 2× the platform average. Invest in KC experience." },
          { title: "Designer newsletter open rate at 28%", detail: "Industry benchmark is 18%. Your technical spec content resonates — expand to monthly product deep-dives." },
        ],
        notWorking: [
          { title: "Sample request follow-ups are delayed", detail: "Average sample-to-quote response time is 6.2 days. Brands with under 48-hour response times convert 3× more samples to orders." },
          { title: "Wall putty category is underperforming", detail: "Wall Putty has 62% fewer views than comparable products on the platform. Product images and spec sheets are missing — add them." },
          { title: "No events scheduled this quarter", detail: "Brands running quarterly events (product launches, design workshops) generate 4× more enquiry volume. Schedule at least one before June." },
        ],
        topItems: [
          { label: "OPC 53 Grade Cement",    value: 91, max: 100, unit: "demand score" },
          { label: "Ready Mix Concrete M25", value: 73, max: 100, unit: "demand score" },
          { label: "UltraTech Wall Putty",   value: 42, max: 100, unit: "demand score" },
        ],
        heatmapLabel: "Platform Activity (past 52 weeks)",
        hourLabel: "Designer enquiry peak hours",
      };

    case "Institute Manager":
      return {
        accent: "#3b82f6", accentRGB: "59,130,246", bgColor: "#eff6ff",
        kpis: [
          { label: "Placement Rate",       value: "84%",   trend: "+6% YoY",           up: true  },
          { label: "Active Enrolments",    value: "1,240", trend: "+180 this semester", up: true  },
          { label: "Avg. CGPA",            value: "7.8",   trend: "-0.2 vs last sem",   up: false },
          { label: "Industry Tie-ups",     value: "23",    trend: "+4 this year",        up: true  },
        ],
        working: [
          { title: "B.Arch placements at highest ever rate", detail: "84% of 2026 B.Arch graduates placed — the highest in 8 years. Studio Morphogenesis and Lloyds Group are your top recruiters." },
          { title: "Industry certification courses driving enrolment", detail: "Short certification courses added this semester account for 28% of new enrolments — high ROI with minimal overhead." },
          { title: "Material Library discovery increasing student employability", detail: "Students active on ML get 3.2× more recruiter profile views. Promote platform usage in orientation." },
        ],
        notWorking: [
          { title: "M.Arch placement rate below target", detail: "Only 62% of M.Arch graduates placed vs an 80% target. Research-focused students lack industry-facing portfolios — add a capstone industry project." },
          { title: "Faculty research output stagnating", detail: "3 research papers published this year vs a target of 12. Consider tying faculty KPIs to research output for promotions." },
          { title: "Alumni network not engaged", detail: "Only 14% of alumni participate in mentorship or placement referrals. Activating even 30% would double internship placements." },
        ],
        topItems: [
          { label: "B.Arch (5-year)",          value: 84, max: 100, unit: "placement %" },
          { label: "Interior Design Diploma",   value: 79, max: 100, unit: "placement %" },
          { label: "M.Arch (2-year)",           value: 62, max: 100, unit: "placement %" },
        ],
        heatmapLabel: "Institute Activity (past 52 weeks)",
        hourLabel: "Student portal peak hours",
      };

    case "Dealer":
    default:
      return {
        accent: "#f59e0b", accentRGB: "245,158,11", bgColor: "#fffbeb",
        kpis: [
          { label: "Enquiry Volume",       value: "92",   trend: "+18% this month",   up: true  },
          { label: "Conversion Rate",      value: "31%",  trend: "+5% vs last month", up: true  },
          { label: "Avg. Order Value",     value: "₹2.4L", trend: "-8% this month",   up: false },
          { label: "Active Pincodes",      value: "18",   trend: "5 pincodes idle",    up: false },
        ],
        working: [
          { title: "TMT Bar enquiries converting at highest rate", detail: "Steel product enquiries have a 42% close rate — nearly double your average. Prioritise stock and response time for steel." },
          { title: "North Delhi pincodes are top performers", detail: "110001, 110016, and 110048 account for 61% of your total enquiry volume with only 17% of your pincode coverage." },
          { title: "Fast response driving repeat orders", detail: "Customers where your first response was under 1 hour have a 3.1× higher reorder rate. Protect this with a dedicated enquiry handler." },
        ],
        notWorking: [
          { title: "5 pincodes have had zero enquiries in 30 days", detail: "Pausing idle pincodes and reinvesting in active zones increases ranking in search results for your top areas." },
          { title: "Paint category has low visibility", detail: "Your Asian Paints listing has 490 views but only 18 enquiries (3.7% CTR vs 8% platform average). Add price, stock status, and delivery time." },
          { title: "No customer reviews yet", detail: "Dealers with 10+ reviews get 2.8× more inbound enquiries. Send a follow-up to your last 10 completed orders and ask for a review." },
        ],
        topItems: [
          { label: "Steel Products",   value: 88, max: 100, unit: "demand score" },
          { label: "Cement",           value: 74, max: 100, unit: "demand score" },
          { label: "Paint & Finishes", value: 47, max: 100, unit: "demand score" },
        ],
        heatmapLabel: "Enquiry Activity (past 52 weeks)",
        hourLabel: "Peak enquiry hours",
      };
  }
}

// ── Calendar Heatmap component ─────────────────────────────────────────────

function CalendarHeatmap({ data, accent, label }: { data: number[][]; accent: string; label: string }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div>
      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 4, minWidth: 720 }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 22, flexShrink: 0 }}>
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
              <div key={i} style={{ height: 11, fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500, width: 24, lineHeight: "11px" }}>{d}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {/* Month labels */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(52, 1fr)`, marginBottom: 4 }}>
              {Array.from({ length: 52 }, (_, w) => (
                <div key={w} style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 500, textAlign: "center" }}>
                  {w % 4 === 0 ? months[Math.floor(w / 4.33) % 12] : ""}
                </div>
              ))}
            </div>
            {/* Grid */}
            <div style={{ display: "flex", gap: 3 }}>
              {data.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((val, di) => (
                    <div
                      key={di}
                      title={`${val} activities`}
                      style={{
                        width: 11, height: 11, borderRadius: 2,
                        background: heatColor(val, accent),
                        cursor: "default",
                        transition: "transform 0.1s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.3)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Less</span>
              {[0, 2, 4, 6, 8].map((v) => (
                <div key={v} style={{ width: 11, height: 11, borderRadius: 2, background: heatColor(v, accent) }} />
              ))}
              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hour heatmap ───────────────────────────────────────────────────────────

function HourHeatmap({ data, accent, label }: { data: number[][]; accent: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 20, flexShrink: 0 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ height: 28, fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", width: 28 }}>{d}</div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(6, 1fr)`, gap: 2, marginBottom: 4 }}>
            {HOURS.map((h) => (
              <div key={h} style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 500, textAlign: "center" }}>{h}</div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {data.map((row, ri) => (
              <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
                {row.map((val, ci) => (
                  <div
                    key={ci}
                    title={`${DAYS[ri]} ${HOURS[ci]}: activity ${val}`}
                    style={{
                      height: 28, borderRadius: 6,
                      background: heatColor(val, accent),
                      cursor: "default",
                      transition: "transform 0.1s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export function DashboardAnalyticsPage() {
  const authUser = getAuthUser();
  const d = getRoleData(authUser?.type);
  const weeklyData = generateWeeklyHeatmap();
  const hourData = generateHourHeatmap();

  const cardStyle = {
    background: "white",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    borderRadius: 16,
    padding: "20px 24px",
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Data Analytics
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
          Your personalised platform insights — what's working, what's not, and where to focus.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {d.kpis.map((kpi) => (
          <div key={kpi.label} style={cardStyle}>
            <div style={{ fontSize: "1.55rem", fontWeight: 900, color: d.accent, lineHeight: 1 }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
              {kpi.label}
            </div>
            <div
              className="flex items-center gap-1 mt-2"
              style={{ fontSize: "0.72rem", fontWeight: 600, color: kpi.up ? "#10b981" : "#ef4444" }}
            >
              <span>{kpi.up ? "↑" : "↓"}</span>
              <span>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Heatmaps */}
      <div style={cardStyle}>
        <CalendarHeatmap data={weeklyData} accent={d.accent} label={d.heatmapLabel} />
      </div>

      <div style={cardStyle}>
        <HourHeatmap data={hourData} accent={d.accent} label={d.hourLabel} />
      </div>

      {/* What's Working / Not Working */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Working */}
        <div style={cardStyle}>
          <div
            className="flex items-center gap-2 mb-4 pb-3"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "rgba(16,185,129,0.1)" }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
              What's Working
            </h2>
          </div>
          <div className="space-y-4">
            {d.working.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ background: "#10b981", fontSize: "0.65rem", fontWeight: 900 }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 3, lineHeight: 1.55 }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Not Working */}
        <div style={cardStyle}>
          <div
            className="flex items-center gap-2 mb-4 pb-3"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "rgba(245,158,11,0.1)" }}
            >
              ⚠
            </div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Where to Improve
            </h2>
          </div>
          <div className="space-y-4">
            {d.notWorking.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ background: "#f59e0b", fontSize: "0.65rem", fontWeight: 900 }}
                >
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 3, lineHeight: 1.55 }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Items bar chart */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
          Performance Breakdown
        </h2>
        <div className="space-y-4">
          {d.topItems.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: d.accent }}>
                  {item.value} {item.unit}
                </span>
              </div>
              <div style={{ height: 8, background: "rgba(0,0,0,0.06)", borderRadius: 100, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(item.value / item.max) * 100}%`,
                    background: `linear-gradient(90deg,${d.accent}cc,${d.accent})`,
                    borderRadius: 100,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
