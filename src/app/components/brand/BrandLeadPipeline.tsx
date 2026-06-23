import { useState } from "react";
import {
  TrendingUp, TrendingDown, Users, Eye, Heart, FileText,
  Lightbulb, AlertTriangle, CheckCircle,
  Search, Download, MessageSquare, Send, X, Clock,
  CheckCircle2, Package, Truck, ChevronDown, ChevronUp,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type LeadTemp = "Cold" | "Warm" | "Hot";
type UserRole = "Architect" | "Interior Designer" | "Contractor" | "End User" | "Student";

interface Lead {
  id: number;
  userName: string;
  initials: string;
  color: string;
  role: UserRole;
  city: string;
  product: string;
  category: string;
  temp: LeadTemp;
  action: string;
  date: string;
  value: string;
}

type RFQStatus = "pending" | "responded" | "won" | "declined";
type RFQFilter = "all" | RFQStatus;

interface RFQResponse {
  pricePerUnit: string;
  leadTime: string;
  availability: string;
  notes: string;
  respondedOn: string;
}

interface RFQ {
  id: string;
  requester: string;
  initials: string;
  color: string;
  role: string;
  firm: string;
  city: string;
  product: string;
  category: string;
  quantity: string;
  projectType: string;
  projectName: string;
  deadline: string;
  receivedOn: string;
  estimatedValue: string;
  status: RFQStatus;
  notes?: string;
  response?: RFQResponse;
}

interface ProductPerf {
  name: string;
  category: string;
  cold: number;
  warm: number;
  hot: number;
  coldToWarm: number;
  warmToHot: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MONTHLY = [
  { month: "Nov", cold: 82,  warm: 28, hot: 10 },
  { month: "Dec", cold: 94,  warm: 34, hot: 12 },
  { month: "Jan", cold: 110, warm: 42, hot: 18 },
  { month: "Feb", cold: 98,  warm: 38, hot: 14 },
  { month: "Mar", cold: 128, warm: 52, hot: 22 },
  { month: "Apr", cold: 142, warm: 58, hot: 28 },
  { month: "May", cold: 156, warm: 68, hot: 36 },
];

const PRODUCTS: ProductPerf[] = [
  { name: "Glazed Ceramic Floor Tile",   category: "Tiles",       cold: 284, warm: 96,  hot: 44,  coldToWarm: 34, warmToHot: 46 },
  { name: "Matte Porcelain Wall Panel",  category: "Wall Panels", cold: 198, warm: 72,  hot: 28,  coldToWarm: 36, warmToHot: 39 },
  { name: "Outdoor Stone Paving",        category: "Flooring",    cold: 162, warm: 38,  hot: 12,  coldToWarm: 23, warmToHot: 32 },
  { name: "Wooden Plank Flooring",       category: "Flooring",    cold: 144, warm: 30,  hot: 8,   coldToWarm: 21, warmToHot: 27 },
  { name: "Subway Tile Collection",      category: "Tiles",       cold: 128, warm: 54,  hot: 24,  coldToWarm: 42, warmToHot: 44 },
  { name: "Terrazzo Effect Slab",        category: "Tiles",       cold: 96,  warm: 42,  hot: 18,  coldToWarm: 44, warmToHot: 43 },
  { name: "Anti-Skid Bath Floor Tile",   category: "Bathroom",    cold: 88,  warm: 18,  hot: 4,   coldToWarm: 20, warmToHot: 22 },
  { name: "Feature Wall Marble Look",    category: "Wall Panels", cold: 74,  warm: 32,  hot: 16,  coldToWarm: 43, warmToHot: 50 },
];

const LEADS: Lead[] = [
  { id: 1,  userName: "Arjun Mehta",    initials: "AM", color: "#1e40af", role: "Architect",         city: "Mumbai",    product: "Glazed Ceramic Floor Tile",  category: "Tiles",       temp: "Hot",  action: "Added to BOQ",        date: "Today, 11:32 AM",     value: "₹2.4L" },
  { id: 2,  userName: "Priya Nair",     initials: "PN", color: "#065f46", role: "Interior Designer", city: "Bangalore", product: "Matte Porcelain Wall Panel", category: "Wall Panels", temp: "Hot",  action: "Added to BOQ",        date: "Today, 9:14 AM",      value: "₹1.8L" },
  { id: 3,  userName: "Sneha Kapoor",   initials: "SK", color: "#be185d", role: "Interior Designer", city: "Delhi",     product: "Feature Wall Marble Look",   category: "Wall Panels", temp: "Warm", action: "Added to Wishlist",   date: "Today, 8:50 AM",      value: "—" },
  { id: 4,  userName: "Rohan Sharma",   initials: "RS", color: "#7c3aed", role: "Architect",         city: "Pune",      product: "Subway Tile Collection",     category: "Tiles",       temp: "Hot",  action: "Added to BOQ",        date: "Yesterday, 5:30 PM",  value: "₹3.1L" },
  { id: 5,  userName: "Kavita Iyer",    initials: "KI", color: "#b45309", role: "Contractor",        city: "Chennai",   product: "Glazed Ceramic Floor Tile",  category: "Tiles",       temp: "Warm", action: "Added to Wishlist",   date: "Yesterday, 3:12 PM",  value: "—" },
  { id: 6,  userName: "Vikram Joshi",   initials: "VJ", color: "#0e7490", role: "Architect",         city: "Hyderabad", product: "Terrazzo Effect Slab",       category: "Tiles",       temp: "Warm", action: "Added to Wishlist",   date: "Yesterday, 1:44 PM",  value: "—" },
  { id: 7,  userName: "Divya Menon",    initials: "DM", color: "#374151", role: "End User",          city: "Mumbai",    product: "Wooden Plank Flooring",      category: "Flooring",    temp: "Cold", action: "Viewed Product",      date: "Yesterday, 11:20 AM", value: "—" },
  { id: 8,  userName: "Ananya Singh",   initials: "AS", color: "#9a3412", role: "Interior Designer", city: "Kolkata",   product: "Outdoor Stone Paving",       category: "Flooring",    temp: "Cold", action: "Viewed Product",      date: "11 May, 4:00 PM",     value: "—" },
  { id: 9,  userName: "Rahul Verma",    initials: "RV", color: "#166534", role: "Architect",         city: "Mumbai",    product: "Matte Porcelain Wall Panel", category: "Wall Panels", temp: "Hot",  action: "Added to BOQ",        date: "11 May, 2:30 PM",     value: "₹1.1L" },
  { id: 10, userName: "Meera Pillai",   initials: "MP", color: "#6d28d9", role: "Interior Designer", city: "Bangalore", product: "Glazed Ceramic Floor Tile",  category: "Tiles",       temp: "Warm", action: "Added to Wishlist",   date: "11 May, 10:15 AM",    value: "—" },
  { id: 11, userName: "Sanjay Kumar",   initials: "SK", color: "#15803d", role: "Contractor",        city: "Pune",      product: "Anti-Skid Bath Floor Tile",  category: "Bathroom",    temp: "Cold", action: "Viewed Product",      date: "10 May, 6:00 PM",     value: "—" },
  { id: 12, userName: "Deepika Rao",    initials: "DR", color: "#0369a1", role: "Student",           city: "Delhi",     product: "Subway Tile Collection",     category: "Tiles",       temp: "Cold", action: "Viewed Product",      date: "10 May, 3:40 PM",     value: "—" },
];

const INSIGHTS: { type: "positive" | "warning" | "tip"; text: string; metric: string }[] = [
  { type: "positive", text: "Your Tile range generates 3.2× more warm leads than Flooring — allocate more catalogue space here.", metric: "3.2× warm leads" },
  { type: "positive", text: "Architects are your highest-value segment: 68% of all BOQ leads come from architects.", metric: "68% of hot leads" },
  { type: "warning",  text: "Anti-Skid Bath Tile has only 20% cold→warm conversion — add a 360° view or video to improve engagement.", metric: "20% conversion" },
  { type: "warning",  text: "Outdoor Stone Paving sees high views but low BOQ adds. Pricing clarity or availability info may be missing.", metric: "32% warm→hot" },
  { type: "tip",      text: "Tuesday–Thursday sees peak BOQ activity. Schedule new product drops for early in the week.", metric: "Peak: Tue–Thu" },
  { type: "tip",      text: "Mumbai accounts for 44% of hot leads. Consider a localised offer or KC store event for Mumbai designers.", metric: "44% from Mumbai" },
];

const RFQS: RFQ[] = [
  {
    id: "RFQ001", requester: "Arjun Mehta", initials: "AM", color: "#1e40af",
    role: "Architect", firm: "Morphogenesis", city: "Mumbai",
    product: "OPC 53 Grade Cement", category: "Cement & Concrete",
    quantity: "500 bags (25 MT)", projectType: "Township",
    projectName: "Godrej Woodsville Phase 2", deadline: "May 22, 2026",
    receivedOn: "May 14, 2026", estimatedValue: "₹4.2L", status: "pending",
    notes: "Require IS 269 certified product with test reports. Delivery in 3 lots.",
  },
  {
    id: "RFQ002", requester: "Rohan Sharma", initials: "RS", color: "#7c3aed",
    role: "Architect", firm: "Creative Spaces Studio", city: "Delhi",
    product: "Ready Mix Concrete M25", category: "Ready Mix Concrete",
    quantity: "150 m³", projectType: "Commercial",
    projectName: "DLF Cyber Hub Extension", deadline: "May 25, 2026",
    receivedOn: "May 13, 2026", estimatedValue: "₹6.8L", status: "pending",
    notes: "Site access from 7 AM only. Need pump placement support.",
  },
  {
    id: "RFQ003", requester: "Meera Pillai", initials: "MP", color: "#6d28d9",
    role: "Interior Designer", firm: "DesignCraft Studio", city: "Bangalore",
    product: "Premium Wall Putty", category: "Wall Putty",
    quantity: "200 bags", projectType: "Residential",
    projectName: "Prestige Lakeside Habitat", deadline: "May 28, 2026",
    receivedOn: "May 12, 2026", estimatedValue: "₹1.4L", status: "pending",
    notes: "Require white finish grade. Site delivery to 3rd floor, no lift.",
  },
  {
    id: "RFQ004", requester: "Priya Nair", initials: "PN", color: "#065f46",
    role: "Interior Designer", firm: "Livspace Mumbai", city: "Mumbai",
    product: "UltraTech PPC Cement", category: "Cement & Concrete",
    quantity: "300 bags (15 MT)", projectType: "Residential",
    projectName: "Lodha Palava City Interiors", deadline: "May 18, 2026",
    receivedOn: "May 10, 2026", estimatedValue: "₹2.1L", status: "responded",
    response: {
      pricePerUnit: "₹390/bag",
      leadTime: "3–5 business days",
      availability: "In Stock",
      notes: "IS 1489 certified. We can arrange site delivery in 2 lots of 150 bags each. Technical rep will coordinate.",
      respondedOn: "May 11, 2026",
    },
  },
  {
    id: "RFQ005", requester: "Sneha Kapoor", initials: "SK", color: "#be185d",
    role: "Interior Designer", firm: "Studio Sangam", city: "Delhi",
    product: "Waterproofing Solution", category: "Waterproofing",
    quantity: "20 drums (200 L)", projectType: "Luxury Villa",
    projectName: "DLF The Camellias Basement", deadline: "May 15, 2026",
    receivedOn: "May 8, 2026", estimatedValue: "₹85K", status: "won",
    response: {
      pricePerUnit: "₹4,200/drum",
      leadTime: "2 business days",
      availability: "In Stock",
      notes: "Includes technical application support for basement waterproofing. Warranty certificate provided.",
      respondedOn: "May 9, 2026",
    },
  },
  {
    id: "RFQ006", requester: "Vikram Joshi", initials: "VJ", color: "#0e7490",
    role: "Contractor", firm: "BuildPro Pvt Ltd", city: "Hyderabad",
    product: "AAC Blocks 600×200×200", category: "AAC Blocks",
    quantity: "5,000 blocks", projectType: "Industrial",
    projectName: "Phoenix Warehouse Complex", deadline: "May 12, 2026",
    receivedOn: "May 7, 2026", estimatedValue: "₹3.5L", status: "declined",
    notes: "Requested delivery within 24 hrs — outside our coverage zone.",
  },
];

const RFQ_STATUS: Record<RFQStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:   { label: "Pending Response", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)"  },
  responded: { label: "Responded",        color: "#0891b2", bg: "rgba(8,145,178,0.1)",   border: "rgba(8,145,178,0.25)"   },
  won:       { label: "Won",              color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)"  },
  declined:  { label: "Declined",         color: "#6b7280", bg: "rgba(107,114,128,0.1)", border: "rgba(107,114,128,0.25)" },
};

// ── Derived numbers ──────────────────────────────────────────────────────────

const totalCold = LEADS.filter(l => l.temp === "Cold").length;
const totalWarm = LEADS.filter(l => l.temp === "Warm").length;
const totalHot  = LEADS.filter(l => l.temp === "Hot").length;
const totalLeads = LEADS.length;
const coldToWarm = Math.round((totalWarm / (totalCold + totalWarm + totalHot)) * 100 * (totalWarm / totalCold) * 10) / 10;

const tempColors: Record<LeadTemp, { color: string; bg: string; border: string; label: string }> = {
  Cold: { color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.2)", label: "Search & View" },
  Warm: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", label: "Added to Wishlist" },
  Hot:  { color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.2)",  label: "Added to BOQ" },
};

const roleColors: Record<UserRole, string> = {
  "Architect":         "#1e40af",
  "Interior Designer": "#be185d",
  "Contractor":        "#b45309",
  "End User":          "#374151",
  "Student":           "#15803d",
};

const maxMonthlyBar = Math.max(...MONTHLY.map(m => m.cold + m.warm + m.hot));

// ── Sub-components ────────────────────────────────────────────────────────────

function TempBadge({ temp }: { temp: LeadTemp }) {
  const t = tempColors[temp];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
      {temp === "Cold" && <Eye className="w-2.5 h-2.5" />}
      {temp === "Warm" && <Heart className="w-2.5 h-2.5" />}
      {temp === "Hot"  && <FileText className="w-2.5 h-2.5" />}
      {temp}
    </span>
  );
}

function ConversionBar({ cold, warm, hot }: { cold: number; warm: number; hot: number }) {
  const total = cold + warm + hot;
  return (
    <div className="flex h-2 rounded-full overflow-hidden w-full">
      <div style={{ width: `${(cold / total) * 100}%`, background: "#94a3b8" }} />
      <div style={{ width: `${(warm / total) * 100}%`, background: "#f59e0b" }} />
      <div style={{ width: `${(hot  / total) * 100}%`, background: "#ef4444" }} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

function RFQManagement() {
  const [rfqList, setRfqList] = useState<RFQ[]>(RFQS);
  const [statusFilter, setStatusFilter] = useState<RFQFilter>("all");
  const [activeRFQ, setActiveRFQ] = useState<RFQ | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ pricePerUnit: "", leadTime: "3–5 business days", availability: "In Stock", notes: "" });

  const filtered = statusFilter === "all" ? rfqList : rfqList.filter((r) => r.status === statusFilter);

  const pendingCount = rfqList.filter((r) => r.status === "pending").length;
  const respondedCount = rfqList.filter((r) => r.status === "responded").length;
  const wonCount = rfqList.filter((r) => r.status === "won").length;

  function openRespond(rfq: RFQ) {
    setActiveRFQ(rfq);
    setForm({ pricePerUnit: "", leadTime: "3–5 business days", availability: "In Stock", notes: "" });
  }

  function submitResponse() {
    if (!activeRFQ) return;
    const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    setRfqList((prev) => prev.map((r) =>
      r.id === activeRFQ.id
        ? { ...r, status: "responded" as RFQStatus, response: { ...form, respondedOn: today } }
        : r
    ));
    setActiveRFQ(null);
  }

  const FILTER_TABS: Array<{ key: RFQFilter; label: string; count: number }> = [
    { key: "all",       label: "All",       count: rfqList.length },
    { key: "pending",   label: "Pending",   count: pendingCount },
    { key: "responded", label: "Responded", count: respondedCount },
    { key: "won",       label: "Won",       count: wonCount },
    { key: "declined",  label: "Declined",  count: rfqList.filter((r) => r.status === "declined").length },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total RFQs",        value: rfqList.length,  color: "#171717", bg: "#f5f5f5",                      icon: MessageSquare },
          { label: "Pending Response",  value: pendingCount,    color: "#f59e0b", bg: "rgba(245,158,11,0.08)",         icon: Clock },
          { label: "Responded",         value: respondedCount,  color: "#0891b2", bg: "rgba(8,145,178,0.08)",          icon: Send },
          { label: "Won",               value: wonCount,         color: "#10b981", bg: "rgba(16,185,129,0.08)",         icon: CheckCircle2 },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
              <Icon className="w-4 h-4 mb-3" style={{ color: s.color }} />
              <p className="text-[2rem] font-black leading-none" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[13px] font-semibold mt-1.5 text-[#525252]">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map((t) => {
          const active = statusFilter === t.key;
          const st = t.key !== "all" ? RFQ_STATUS[t.key as RFQStatus] : null;
          return (
            <button
              key={t.key}
              onClick={() => setStatusFilter(t.key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
              style={{
                background: active ? (st?.bg ?? "#171717") : "#f5f5f5",
                color: active ? (st?.color ?? "#fff") : "#737373",
                border: `1px solid ${active ? (st?.border ?? "#171717") : "transparent"}`,
              }}
            >
              {t.label}
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: active ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.08)", color: active ? (st?.color ?? "#fff") : "#a3a3a3" }}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* RFQ cards */}
      <div className="space-y-3">
        {filtered.map((rfq) => {
          const st = RFQ_STATUS[rfq.status];
          const expanded = expandedId === rfq.id;
          return (
            <div key={rfq.id} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="p-5">
                <div className="flex items-start gap-4 flex-wrap">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0" style={{ background: rfq.color }}>
                    {rfq.initials}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[14px] font-bold text-[#171717]">{rfq.requester}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${rfq.color}15`, color: rfq.color }}>{rfq.role}</span>
                        </div>
                        <div className="text-[12px] text-[#a3a3a3] mt-0.5">{rfq.firm} · {rfq.city}</div>
                      </div>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                        {rfq.status === "pending"   && <Clock className="w-2.5 h-2.5" />}
                        {rfq.status === "responded" && <Send className="w-2.5 h-2.5" />}
                        {rfq.status === "won"       && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {rfq.status === "declined"  && <X className="w-2.5 h-2.5" />}
                        {st.label}
                      </span>
                    </div>

                    {/* RFQ details row */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Product</div>
                        <div className="text-[13px] font-semibold text-[#171717]">{rfq.product}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Quantity</div>
                        <div className="text-[13px] font-semibold text-[#171717]">{rfq.quantity}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Project</div>
                        <div className="text-[13px] font-semibold text-[#171717]">{rfq.projectName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Est. Value</div>
                        <div className="text-[13px] font-bold" style={{ color: "#10b981" }}>{rfq.estimatedValue}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Response By</div>
                        <div className="text-[13px] font-semibold" style={{ color: rfq.status === "pending" ? "#ef4444" : "#a3a3a3" }}>{rfq.deadline}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">Received</div>
                        <div className="text-[13px] text-[#737373]">{rfq.receivedOn}</div>
                      </div>
                    </div>

                    {/* Notes */}
                    {rfq.notes && (
                      <div className="mt-3 px-3 py-2 rounded-xl text-[12px] text-[#525252] italic" style={{ background: "rgba(0,0,0,0.03)", borderLeft: "3px solid rgba(0,0,0,0.1)" }}>
                        "{rfq.notes}"
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      {rfq.status === "pending" && (
                        <button
                          onClick={() => openRespond(rfq)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold"
                          style={{ background: "#FF6A3D", color: "white" }}
                        >
                          <Send className="w-3.5 h-3.5" /> Respond to RFQ
                        </button>
                      )}
                      {(rfq.status === "responded" || rfq.status === "won") && rfq.response && (
                        <button
                          onClick={() => setExpandedId(expanded ? null : rfq.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold"
                          style={{ background: `${st.color}15`, color: st.color }}
                        >
                          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {expanded ? "Hide Response" : "View Response"}
                        </button>
                      )}
                      {rfq.status === "pending" && (
                        <button
                          onClick={() => setRfqList((prev) => prev.map((r) => r.id === rfq.id ? { ...r, status: "declined" } : r))}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold"
                          style={{ background: "rgba(0,0,0,0.04)", color: "#737373" }}
                        >
                          Decline
                        </button>
                      )}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.04)", color: "#a3a3a3" }}>
                        {rfq.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded response */}
                {expanded && rfq.response && (
                  <div className="mt-4 rounded-2xl p-4 space-y-3" style={{ background: `${st.color}08`, border: `1px solid ${st.border}` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-3.5 h-3.5" style={{ color: st.color }} />
                      <span className="text-[13px] font-bold" style={{ color: st.color }}>Your Response · {rfq.response.respondedOn}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide mb-1">Price Per Unit</div>
                        <div className="text-[14px] font-black text-[#171717]">{rfq.response.pricePerUnit}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide mb-1">Lead Time</div>
                        <div className="text-[13px] font-semibold text-[#171717] flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[#a3a3a3]" />{rfq.response.leadTime}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide mb-1">Availability</div>
                        <div className="text-[13px] font-semibold text-[#171717] flex items-center gap-1"><Package className="w-3.5 h-3.5 text-[#a3a3a3]" />{rfq.response.availability}</div>
                      </div>
                    </div>
                    {rfq.response.notes && (
                      <div className="text-[12px] text-[#525252] leading-relaxed pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        {rfq.response.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#a3a3a3]">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-[14px] font-semibold">No RFQs in this status</p>
          </div>
        )}
      </div>

      {/* Response slide-over */}
      {activeRFQ && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setActiveRFQ(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-[480px] h-full flex flex-col overflow-y-auto"
            style={{ background: "white", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Slide-over header */}
            <div className="flex items-center justify-between px-6 py-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <div>
                <div className="text-[16px] font-black text-[#171717]">Respond to RFQ</div>
                <div className="text-[12px] text-[#a3a3a3] mt-0.5">{activeRFQ.id} · {activeRFQ.requester}</div>
              </div>
              <button onClick={() => setActiveRFQ(null)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4 text-[#737373]" />
              </button>
            </div>

            {/* RFQ summary */}
            <div className="px-6 py-4 flex-shrink-0" style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Product",  value: activeRFQ.product },
                  { label: "Quantity", value: activeRFQ.quantity },
                  { label: "Project",  value: activeRFQ.projectName },
                  { label: "Est. Value", value: activeRFQ.estimatedValue },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-wide">{f.label}</div>
                    <div className="text-[13px] font-semibold text-[#171717] mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>
              {activeRFQ.notes && (
                <div className="mt-3 px-3 py-2 rounded-xl text-[12px] text-[#525252] italic" style={{ background: "rgba(0,0,0,0.04)" }}>
                  "{activeRFQ.notes}"
                </div>
              )}
            </div>

            {/* Response form */}
            <div className="flex-1 px-6 py-5 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#525252] mb-1.5 uppercase tracking-wide">Price Per Unit *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#a3a3a3]">₹</span>
                  <input
                    value={form.pricePerUnit}
                    onChange={(e) => setForm((f) => ({ ...f, pricePerUnit: e.target.value }))}
                    placeholder="e.g. 390/bag or 4,500/m³"
                    className="w-full pl-7 pr-4 py-2.5 rounded-xl text-[13px] outline-none"
                    style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#171717", background: "#fafafa" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#525252] mb-1.5 uppercase tracking-wide">Lead Time *</label>
                <select
                  value={form.leadTime}
                  onChange={(e) => setForm((f) => ({ ...f, leadTime: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none appearance-none"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#171717", background: "#fafafa" }}
                >
                  {["Same day", "1–2 business days", "3–5 business days", "1 week", "2 weeks", "On order (3–4 weeks)"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#525252] mb-1.5 uppercase tracking-wide">Availability *</label>
                <div className="flex gap-2">
                  {["In Stock", "Limited Stock", "On Order"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, availability: opt }))}
                      className="flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all"
                      style={{
                        background: form.availability === opt ? "#FF6A3D" : "rgba(0,0,0,0.04)",
                        color: form.availability === opt ? "white" : "#737373",
                        border: `1px solid ${form.availability === opt ? "#FF6A3D" : "transparent"}`,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#525252] mb-1.5 uppercase tracking-wide">Notes / Special Terms</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Delivery conditions, certifications, payment terms, technical support offered…"
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none resize-none"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#171717", background: "#fafafa", lineHeight: 1.6 }}
                />
              </div>
            </div>

            {/* Slide-over footer */}
            <div className="px-6 py-4 flex-shrink-0 flex gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={submitResponse}
                disabled={!form.pricePerUnit}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold transition-all"
                style={{
                  background: form.pricePerUnit ? "#FF6A3D" : "rgba(0,0,0,0.08)",
                  color: form.pricePerUnit ? "white" : "#a3a3a3",
                  cursor: form.pricePerUnit ? "pointer" : "not-allowed",
                }}
              >
                <Send className="w-4 h-4" /> Send Response
              </button>
              <button
                onClick={() => setActiveRFQ(null)}
                className="px-5 py-3 rounded-xl text-[14px] font-semibold"
                style={{ background: "rgba(0,0,0,0.05)", color: "#737373" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BrandLeadPipeline() {
  const [tab, setTab] = useState<"pipeline" | "rfq">("pipeline");
  const [tempFilter, setTempFilter] = useState<LeadTemp | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = LEADS.filter(l => {
    if (tempFilter !== "All" && l.temp !== tempFilter) return false;
    if (search && !l.userName.toLowerCase().includes(search.toLowerCase()) && !l.product.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const working = PRODUCTS.filter(p => p.coldToWarm >= 36 || p.warmToHot >= 43).sort((a, b) => b.warmToHot - a.warmToHot);
  const improve = PRODUCTS.filter(p => p.coldToWarm < 30 || p.warmToHot < 35).sort((a, b) => a.coldToWarm - b.coldToWarm);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-7 font-['Satoshi',sans-serif]">

      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-[22px] font-black text-[#171717]">Lead Pipeline</h2>
          <p className="text-[13px] text-[#737373] mt-1">Track interactions, manage quote requests, and close deals.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "#FF6A3D", color: "#fff" }}>
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 p-1 rounded-2xl w-fit" style={{ background: "rgba(0,0,0,0.05)" }}>
        {([
          { key: "pipeline", label: "Lead Pipeline",   icon: Users },
          { key: "rfq",      label: "RFQ Management",  icon: MessageSquare, count: RFQS.filter((r) => r.status === "pending").length },
        ] as const).map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
              style={{ background: active ? "white" : "transparent", color: active ? "#171717" : "#737373", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
              {"count" in t && t.count > 0 && (
                <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: "#f59e0b" }}>{t.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "rfq" && <RFQManagement />}
      {tab === "pipeline" && (<>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Leads",  value: totalLeads, sub: "+24 this week", icon: Users,    color: "#171717", bg: "#f5f5f5", border: "rgba(0,0,0,0.06)" },
          { label: "Cold Leads",   value: totalCold,  sub: "Search & view",  icon: Eye,      color: "#64748b", bg: "rgba(100,116,139,0.06)", border: "rgba(100,116,139,0.15)" },
          { label: "Warm Leads",   value: totalWarm,  sub: "Added to wishlist", icon: Heart,  color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)" },
          { label: "Hot Leads",    value: totalHot,   sub: "Added to BOQ",   icon: FileText, color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)", color: s.color }}>
                  {Math.round((s.value / totalLeads) * 100)}%
                </span>
              </div>
              <p className="text-[2rem] font-black leading-none" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[13px] font-semibold mt-1.5 text-[#171717]">{s.label}</p>
              <p className="text-[11px] text-[#a3a3a3] mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Funnel + Monthly chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 className="text-[14px] font-bold text-[#171717] mb-5">Lead Funnel</h3>
          <div className="flex flex-col gap-2">
            {/* Cold */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" style={{ color: "#64748b" }} />
                  <span className="text-[12px] font-semibold text-[#525252]">Cold — Search & View</span>
                </div>
                <span className="text-[13px] font-black text-[#64748b]">{totalCold}</span>
              </div>
              <div className="h-9 rounded-xl flex items-center px-3" style={{ background: "rgba(100,116,139,0.1)", width: "100%" }}>
                <span className="text-[11px] font-semibold text-[#64748b]">{Math.round((totalCold / totalLeads) * 100)}% of leads</span>
              </div>
            </div>

            {/* Arrow + conversion rate */}
            <div className="flex items-center gap-2 py-1 px-3">
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                {Math.round((totalWarm / totalCold) * 100)}% convert
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
            </div>

            {/* Warm */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5" style={{ color: "#f59e0b" }} />
                  <span className="text-[12px] font-semibold text-[#525252]">Warm — Wishlisted</span>
                </div>
                <span className="text-[13px] font-black text-[#f59e0b]">{totalWarm}</span>
              </div>
              <div className="h-9 rounded-xl flex items-center px-3" style={{ background: "rgba(245,158,11,0.1)", width: `${(totalWarm / totalCold) * 100}%`, minWidth: "60%" }}>
                <span className="text-[11px] font-semibold text-[#f59e0b]">{Math.round((totalWarm / totalLeads) * 100)}% of leads</span>
              </div>
            </div>

            {/* Arrow + conversion rate */}
            <div className="flex items-center gap-2 py-1 px-3">
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                {Math.round((totalHot / totalWarm) * 100)}% convert
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
            </div>

            {/* Hot */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                  <span className="text-[12px] font-semibold text-[#525252]">Hot — In BOQ</span>
                </div>
                <span className="text-[13px] font-black text-[#ef4444]">{totalHot}</span>
              </div>
              <div className="h-9 rounded-xl flex items-center px-3" style={{ background: "rgba(239,68,68,0.1)", width: `${(totalHot / totalCold) * 100 + 20}%`, minWidth: "40%" }}>
                <span className="text-[11px] font-semibold text-[#ef4444]">{Math.round((totalHot / totalLeads) * 100)}% of leads</span>
              </div>
            </div>
          </div>

          {/* Conversion summary */}
          <div className="mt-5 pt-4 grid grid-cols-2 gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="rounded-xl p-3 text-center" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <p className="text-[18px] font-black" style={{ color: "#f59e0b" }}>{Math.round((totalWarm / totalCold) * 100)}%</p>
              <p className="text-[11px] text-[#737373] mt-0.5">Cold → Warm</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-[18px] font-black" style={{ color: "#ef4444" }}>{Math.round((totalHot / totalWarm) * 100)}%</p>
              <p className="text-[11px] text-[#737373] mt-0.5">Warm → Hot</p>
            </div>
          </div>
        </div>

        {/* Monthly trend chart */}
        <div className="lg:col-span-3 rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-bold text-[#171717]">Lead Trend — Last 7 Months</h3>
            <div className="flex items-center gap-3 text-[11px]">
              {(["Cold","Warm","Hot"] as const).map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: t === "Cold" ? "#94a3b8" : t === "Warm" ? "#f59e0b" : "#ef4444" }} />
                  <span style={{ color: "#737373" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-44">
            {MONTHLY.map((m) => {
              const total = m.cold + m.warm + m.hot;
              const maxH = 160;
              const h = (total / maxMonthlyBar) * maxH;
              const hotH = (m.hot / total) * h;
              const warmH = (m.warm / total) * h;
              const coldH = h - hotH - warmH;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex flex-col-reverse rounded-t-lg overflow-hidden" style={{ height: `${h}px` }}>
                    <div style={{ height: `${coldH}px`, background: "#94a3b8" }} />
                    <div style={{ height: `${warmH}px`, background: "#f59e0b" }} />
                    <div style={{ height: `${hotH}px`, background: "#ef4444" }} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#a3a3a3]">{m.month}</span>
                </div>
              );
            })}
          </div>
          {/* Values row */}
          <div className="flex gap-2 mt-1">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex-1 text-center">
                <span className="text-[10px] text-[#a3a3a3]">{m.cold + m.warm + m.hot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's working / What to improve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* What's working */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <CheckCircle className="w-4 h-4" style={{ color: "#10b981" }} />
            <h3 className="text-[14px] font-bold text-[#171717]">What's Working</h3>
            <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}>High conversion</span>
          </div>
          <div className="divide-y" style={{ divideColor: "rgba(0,0,0,0.04)" }}>
            {working.slice(0, 4).map((p) => (
              <div key={p.name} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#171717] leading-snug">{p.name}</p>
                    <p className="text-[11px] text-[#a3a3a3] mt-0.5">{p.category}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <div className="text-center px-2 py-1 rounded-lg" style={{ background: "rgba(245,158,11,0.08)" }}>
                      <p className="text-[13px] font-black" style={{ color: "#f59e0b" }}>{p.coldToWarm}%</p>
                      <p className="text-[9px] text-[#a3a3a3]">C→W</p>
                    </div>
                    <div className="text-center px-2 py-1 rounded-lg" style={{ background: "rgba(239,68,68,0.08)" }}>
                      <p className="text-[13px] font-black" style={{ color: "#ef4444" }}>{p.warmToHot}%</p>
                      <p className="text-[9px] text-[#a3a3a3]">W→H</p>
                    </div>
                  </div>
                </div>
                <ConversionBar cold={p.cold} warm={p.warm} hot={p.hot} />
                <div className="flex gap-3 mt-1.5" style={{ fontSize: "10px", color: "#a3a3a3" }}>
                  <span>{p.cold} cold</span><span>{p.warm} warm</span><span>{p.hot} hot</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to improve */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <AlertTriangle className="w-4 h-4" style={{ color: "#f59e0b" }} />
            <h3 className="text-[14px] font-bold text-[#171717]">What to Improve</h3>
            <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>Low conversion</span>
          </div>
          <div className="divide-y" style={{ divideColor: "rgba(0,0,0,0.04)" }}>
            {improve.slice(0, 4).map((p) => {
              const issue = p.coldToWarm < 25 ? "Poor cold→warm — add better visuals or 360° view" : "Poor warm→hot — clarify pricing or availability";
              return (
                <div key={p.name} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[13px] font-semibold text-[#171717] leading-snug">{p.name}</p>
                      <p className="text-[11px] text-[#a3a3a3] mt-0.5">{p.category}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <div className="text-center px-2 py-1 rounded-lg" style={{ background: p.coldToWarm < 30 ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)" }}>
                        <p className="text-[13px] font-black" style={{ color: p.coldToWarm < 30 ? "#ef4444" : "#f59e0b" }}>{p.coldToWarm}%</p>
                        <p className="text-[9px] text-[#a3a3a3]">C→W</p>
                      </div>
                      <div className="text-center px-2 py-1 rounded-lg" style={{ background: p.warmToHot < 35 ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)" }}>
                        <p className="text-[13px] font-black" style={{ color: p.warmToHot < 35 ? "#ef4444" : "#f59e0b" }}>{p.warmToHot}%</p>
                        <p className="text-[9px] text-[#a3a3a3]">W→H</p>
                      </div>
                    </div>
                  </div>
                  <ConversionBar cold={p.cold} warm={p.warm} hot={p.hot} />
                  <p className="text-[11px] mt-2 flex items-center gap-1.5" style={{ color: "#f59e0b" }}>
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {issue}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI-style Insights */}
      <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4" style={{ color: "#FF6A3D" }} />
          <h3 className="text-[14px] font-bold text-[#171717]">Actionable Insights</h3>
          <span className="ml-auto text-[11px] text-[#a3a3a3]">Based on last 90 days</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {INSIGHTS.map((ins, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-3.5 rounded-xl"
              style={{
                background: ins.type === "positive" ? "rgba(16,185,129,0.04)" : ins.type === "warning" ? "rgba(245,158,11,0.04)" : "rgba(255,106,61,0.04)",
                border: `1px solid ${ins.type === "positive" ? "rgba(16,185,129,0.15)" : ins.type === "warning" ? "rgba(245,158,11,0.15)" : "rgba(255,106,61,0.15)"}`,
              }}
            >
              <div className="flex items-center gap-1.5">
                {ins.type === "positive" && <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#10b981" }} />}
                {ins.type === "warning"  && <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#f59e0b" }} />}
                {ins.type === "tip"      && <Lightbulb className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#FF6A3D" }} />}
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full" style={{
                  background: ins.type === "positive" ? "rgba(16,185,129,0.12)" : ins.type === "warning" ? "rgba(245,158,11,0.12)" : "rgba(255,106,61,0.12)",
                  color: ins.type === "positive" ? "#10b981" : ins.type === "warning" ? "#f59e0b" : "#FF6A3D",
                }}>
                  {ins.metric}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "#525252" }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lead table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        {/* Table header */}
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 className="text-[14px] font-bold text-[#171717]">All Leads <span className="text-[#a3a3a3] font-normal">({filtered.length})</span></h3>
          <div className="flex items-center gap-2">
            {/* Temp filter pills */}
            <div className="flex gap-1.5">
              {(["All","Cold","Warm","Hot"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTempFilter(t)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                  style={{
                    background: tempFilter === t ? (t === "All" ? "#171717" : tempColors[t as LeadTemp]?.bg ?? "#f5f5f5") : "#f5f5f5",
                    color: tempFilter === t ? (t === "All" ? "#fff" : tempColors[t as LeadTemp]?.color) : "#737373",
                    border: `1px solid ${tempFilter === t ? (t === "All" ? "#171717" : tempColors[t as LeadTemp]?.border ?? "transparent") : "transparent"}`,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a3a3a3]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="pl-8 pr-3 py-1.5 rounded-lg text-[12px] outline-none"
                style={{ background: "#f5f5f5", color: "#171717", width: "160px" }}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                {["User", "Role", "Product", "Lead Type", "Action", "Est. Value", "Date"].map(h => (
                  <th key={h} className="text-left px-5 py-3" style={{ fontSize: "11px", fontWeight: 700, color: "#a3a3a3", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr
                  key={l.id}
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", transition: "background 0.1s" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#fafafa"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: l.color }}>{l.initials}</div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#171717]">{l.userName}</p>
                        <p className="text-[11px] text-[#a3a3a3]">{l.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${roleColors[l.role]}15`, color: roleColors[l.role] }}>
                      {l.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5" style={{ maxWidth: "200px" }}>
                    <p className="text-[13px] text-[#525252] truncate">{l.product}</p>
                    <p className="text-[11px] text-[#a3a3a3]">{l.category}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <TempBadge temp={l.temp} />
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-[12px] text-[#737373]">{l.action}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-[13px] font-bold" style={{ color: l.value !== "—" ? "#10b981" : "#a3a3a3" }}>{l.value}</p>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-[12px] text-[#a3a3a3]">{l.date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </>)}
    </div>
  );
}
