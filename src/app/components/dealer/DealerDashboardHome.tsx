import { Package, MapPin, MessageSquare, ShoppingCart, Eye, TrendingUp, ArrowUpRight, CheckCircle, XCircle } from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#f59e0b";

const STATS = [
  { label: "Products Listed",   value: "43",   icon: Package,       color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  { label: "Active Pin Codes",  value: "18",   icon: MapPin,        color: "#10b981", bg: "rgba(16,185,129,0.1)"  },
  { label: "Enquiries Received",value: "92",   icon: MessageSquare, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)"  },
  { label: "Orders This Month", value: "27",   icon: ShoppingCart,  color: "#0284c7", bg: "rgba(2,132,199,0.1)"   },
];

const TOP_INVENTORY = [
  { name: "UltraTech OPC 53 Grade Cement",    brand: "UltraTech",    views: "840",  enquiries: "34", status: "active" },
  { name: "Tata Tiscon Fe 500D TMT Bar 12mm",  brand: "Tata Steel",   views: "610",  enquiries: "22", status: "active" },
  { name: "Asian Paints Apex Ultima 10L",      brand: "Asian Paints", views: "490",  enquiries: "18", status: "active" },
  { name: "Kajaria Jazz Porcelain 600×600",    brand: "Kajaria",      views: "380",  enquiries: "11", status: "paused" },
  { name: "Havells Concealed Wire 2.5 sq mm",  brand: "Havells",      views: "270",  enquiries: "8",  status: "active" },
];

const SERVICE_AREAS = [
  { pincode: "400001", city: "Mumbai - Fort", state: "Maharashtra", active: true  },
  { pincode: "400050", city: "Mumbai - Bandra", state: "Maharashtra", active: true  },
  { pincode: "110001", city: "New Delhi - Connaught Place", state: "Delhi", active: true  },
  { pincode: "560001", city: "Bengaluru - MG Road", state: "Karnataka", active: false },
  { pincode: "500001", city: "Hyderabad - Abids", state: "Telangana", active: true  },
];

export function DealerDashboardHome() {
  const authUser = getAuthUser();
  void authUser;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Dealer Overview
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
          Your inventory listings and serviceable areas on Material Library.
        </p>
      </div>

      <div id="tour-dealer-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        id="tour-dealer-inventory"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Top Inventory on Material Library
          </h2>
          <button className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: ACCENT }}>
            View all <ArrowUpRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
        <div className="space-y-1">
          {TOP_INVENTORY.map((item, idx) => (
            <div
              key={item.name}
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: idx < TOP_INVENTORY.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: "rgba(245,158,11,0.1)", color: ACCENT }}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                  {item.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {item.brand} · <Eye style={{ width: 10, height: 10, display: "inline" }} /> {item.views} views · {item.enquiries} enquiries
                </div>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                style={
                  item.status === "active"
                    ? { background: "rgba(16,185,129,0.1)", color: "#10b981" }
                    : { background: "rgba(239,68,68,0.1)", color: "#ef4444" }
                }
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        id="tour-dealer-areas"
        className="rounded-2xl p-5"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Serviceable Areas
          </h2>
          <button className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: ACCENT }}>
            Manage <ArrowUpRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
        <div className="space-y-2">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area.pincode}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: area.active ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)" }}
              >
                <MapPin style={{ width: 15, height: 15, color: area.active ? "#10b981" : "#ef4444" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {area.city}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {area.pincode} · {area.state}
                </div>
              </div>
              {area.active
                ? <CheckCircle style={{ width: 16, height: 16, color: "#10b981", flexShrink: 0 }} />
                : <XCircle    style={{ width: 16, height: 16, color: "#ef4444", flexShrink: 0 }} />
              }
              <span
                className="text-[10px] font-bold flex-shrink-0"
                style={{ color: area.active ? "#10b981" : "#ef4444" }}
              >
                {area.active ? "Active" : "Paused"}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-2 p-3 rounded-xl"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px dashed rgba(245,158,11,0.3)" }}
        >
          <TrendingUp style={{ width: 15, height: 15, color: ACCENT, flexShrink: 0 }} />
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Adding more pin codes increases your visibility to designers sourcing materials nearby.
          </span>
        </div>
      </div>
    </div>
  );
}
