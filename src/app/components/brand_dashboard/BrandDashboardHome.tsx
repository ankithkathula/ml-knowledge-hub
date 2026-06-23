import { useState, useEffect } from "react";
import {
  Building2, Package, TrendingUp, BarChart2, Eye,
  MessageSquare, MapPin, Star, Plus, ArrowUpRight, ChevronRight,
} from "lucide-react";
import { getAuthUser } from "../../utils/auth";
import { ML_STORE_LEADS_KEY, type StoreLeadEntry } from "../shared/StoreNavigator";

const ACCENT = "#0284c7";

const STATS = [
  { label: "Product Listings",   value: "24",    icon: Package,    color: "#0284c7", bg: "rgba(2,132,199,0.1)" },
  { label: "Designer Enquiries", value: "138",   icon: TrendingUp, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Profile Views",      value: "2,840", icon: Eye,        color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  { label: "Sample Requests",    value: "47",    icon: Star,       color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

const HOT_LEADS = [
  { name: "Morphogenesis Architects", project: "OPC 53 bulk order for township",       value: "₹4.2L potential" },
  { name: "Morphogenesis",             project: "RMC supply for commercial project",     value: "₹6.8L potential" },
];

const WARM_LEADS = [
  { name: "Livspace Mumbai",  project: "Wall putty + tile adhesive for 200 units", value: "₹1.4L potential" },
  { name: "Studio Sangam",    project: "Birla White + POP for luxury villa",        value: "₹85K potential" },
];

const COLD_LEADS = [
  { name: "Design Atelier",       project: "Product catalogue request",    value: "Exploring" },
  { name: "DesignCraft Studio",   project: "Sample request — OPC 43",      value: "Sampling" },
];

const TOP_PRODUCTS = [
  { name: "UltraTech OPC 53 Grade Cement",      views: "1,240", enquiries: "48" },
  { name: "UltraTech Ready Mix Concrete M25",   views: "890",   enquiries: "31" },
  { name: "UltraTech Wall Putty",               views: "640",   enquiries: "22" },
];

const KC_VISITS = [
  { studio: "Morphogenesis Architects", location: "KC Bandra West, Mumbai",     date: "May 22, 2026",  purpose: "Product demo & samples" },
  { studio: "Studio Lotus",             location: "KC Connaught Place, Delhi",   date: "May 28, 2026",  purpose: "Technical consultation" },
];

const QUICK_ACTIONS = [
  { label: "Add Product",        icon: Plus,        color: "#0284c7" },
  { label: "Post Announcement",  icon: Building2,   color: "#10b981" },
  { label: "Download Report",    icon: BarChart2,   color: "#f59e0b" },
  { label: "Schedule Event",     icon: MapPin,      color: "#8b5cf6" },
];

export function BrandDashboardHome() {
  const authUser = getAuthUser();
  void authUser;

  const [storeLeads, setStoreLeads] = useState<{ name: string; project: string; value: string }[]>([]);

  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem(ML_STORE_LEADS_KEY);
        if (!raw) return;
        const leads: StoreLeadEntry[] = JSON.parse(raw);
        setStoreLeads(leads.map((l) => ({
          name: `${l.email}`,
          project: `Store enquiry — ${l.storeName}, ${l.storeCity}`,
          value: `📍 Store lead`,
        })));
      } catch {}
    }
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Brand Overview
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
          Here's how UltraTech Cement is performing on Material Library.
        </p>
      </div>

      <div id="tour-brand-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-4"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <Icon style={{ width: 18, height: 18, color: stat.color }} />
                </div>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        id="tour-brand-pipeline"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Lead Pipeline
          </h2>
          <button
            className="flex items-center gap-1 text-[12px] font-semibold"
            style={{ color: ACCENT }}
          >
            View all <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-3"
              style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
            >
              🔥 Hot
            </div>
            <div className="space-y-3">
              {HOT_LEADS.map((lead) => (
                <div
                  key={lead.name}
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}
                >
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {lead.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {lead.project}
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold"
                    style={{ color: "#ef4444" }}
                  >
                    <TrendingUp style={{ width: 11, height: 11 }} />
                    {lead.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-3"
              style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
            >
              ♨️ Warm
            </div>
            <div className="space-y-3">
              {WARM_LEADS.map((lead) => (
                <div
                  key={lead.name}
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}
                >
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {lead.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {lead.project}
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold"
                    style={{ color: "#f59e0b" }}
                  >
                    <TrendingUp style={{ width: 11, height: 11 }} />
                    {lead.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-3"
              style={{ background: "rgba(2,132,199,0.1)", color: "#0284c7" }}
            >
              ❄️ Cold
            </div>
            <div className="space-y-3">
              {[...COLD_LEADS, ...storeLeads].map((lead, i) => (
                <div
                  key={`${lead.name}-${i}`}
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.1)" }}
                >
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {lead.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {lead.project}
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold"
                    style={{ color: "#0284c7" }}
                  >
                    {lead.value}
                  </div>
                </div>
              ))}
              {storeLeads.length === 0 && COLD_LEADS.length === 0 && (
                <p className="text-[12px] text-gray-400 py-2">No cold leads yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id="tour-brand-products"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Top Products
        </h2>
        <div className="space-y-1">
          {TOP_PRODUCTS.map((product, idx) => (
            <div
              key={product.name}
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: idx < TOP_PRODUCTS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: "rgba(2,132,199,0.1)", color: ACCENT }}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                  {product.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {product.views} views · {product.enquiries} enquiries
                </div>
              </div>
              <ArrowUpRight style={{ width: 15, height: 15, color: "#10b981", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      <div
        id="tour-brand-kc"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Recent KC Visits
        </h2>
        <div className="space-y-3">
          {KC_VISITS.map((visit) => (
            <div
              key={visit.studio}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(245,158,11,0.1)" }}
              >
                <MapPin style={{ width: 15, height: 15, color: "#f59e0b" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {visit.studio}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>
                  {visit.location} · {visit.date}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 2 }}>
                  {visit.purpose}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="h-12 rounded-xl text-[12px] font-bold transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 text-white"
                style={{ background: action.color }}
              >
                <Icon style={{ width: 15, height: 15 }} />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
