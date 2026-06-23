import { useState } from "react";
import { MapPin, Plus, Search, CheckCircle, XCircle, ChevronDown } from "lucide-react";

const ACCENT = "#f59e0b";

const PINCODES = [
  { id: 1,  pincode: "400001", city: "Fort",             district: "Mumbai City",       state: "Maharashtra", active: true  },
  { id: 2,  pincode: "400050", city: "Bandra West",      district: "Mumbai Suburban",   state: "Maharashtra", active: true  },
  { id: 3,  pincode: "400076", city: "Powai",            district: "Mumbai Suburban",   state: "Maharashtra", active: true  },
  { id: 4,  pincode: "400097", city: "Borivali West",    district: "Mumbai Suburban",   state: "Maharashtra", active: false },
  { id: 5,  pincode: "110001", city: "Connaught Place",  district: "Central Delhi",     state: "Delhi",       active: true  },
  { id: 6,  pincode: "110016", city: "Hauz Khas",        district: "South Delhi",       state: "Delhi",       active: true  },
  { id: 7,  pincode: "110048", city: "Saket",            district: "South Delhi",       state: "Delhi",       active: false },
  { id: 8,  pincode: "560001", city: "MG Road",          district: "Bengaluru Urban",   state: "Karnataka",   active: true  },
  { id: 9,  pincode: "560034", city: "Koramangala",      district: "Bengaluru Urban",   state: "Karnataka",   active: true  },
  { id: 10, pincode: "500001", city: "Abids",            district: "Hyderabad",         state: "Telangana",   active: true  },
  { id: 11, pincode: "500032", city: "Banjara Hills",    district: "Hyderabad",         state: "Telangana",   active: false },
  { id: 12, pincode: "600001", city: "George Town",      district: "Chennai",           state: "Tamil Nadu",  active: true  },
];

type StateFilter = "all" | "Maharashtra" | "Delhi" | "Karnataka" | "Telangana" | "Tamil Nadu";

export function DealerServiceAreasPage() {
  const [search, setSearch]         = useState("");
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [activeStates, setActiveStates] = useState<Record<number, boolean>>(
    Object.fromEntries(PINCODES.map((p) => [p.id, p.active]))
  );

  const filtered = PINCODES.filter((p) => {
    const matchSearch =
      p.pincode.includes(search) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase()) ||
      p.state.toLowerCase().includes(search.toLowerCase());
    const matchState = stateFilter === "all" || p.state === stateFilter;
    return matchSearch && matchState;
  });

  const activeCount = Object.values(activeStates).filter(Boolean).length;

  function toggle(id: number) {
    setActiveStates((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const states = Array.from(new Set(PINCODES.map((p) => p.state)));

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Serviceable Areas
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
            {activeCount} of {PINCODES.length} pin codes active
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex-shrink-0"
          style={{ background: ACCENT }}
        >
          <Plus style={{ width: 15, height: 15 }} />
          Add Pin Code
        </button>
      </div>

      <div
        className="flex items-start gap-3 p-4 rounded-2xl"
        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
      >
        <MapPin style={{ width: 18, height: 18, color: ACCENT, flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
            What are serviceable areas?
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 3, lineHeight: 1.5 }}>
            When a designer or customer on Material Library searches for a product near their project location, only dealers who cover that pin code appear in results. Keep your active areas up to date to maximise enquiries.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search pin code, city, district…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)", fontSize: "0.85rem" }}
          />
        </div>
        <div className="relative">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value as StateFilter)}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)", fontSize: "0.85rem" }}
          >
            <option value="all">All states</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-muted)", pointerEvents: "none" }} />
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
      >
        <div
          className="grid gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "120px 1fr 1fr 1fr 100px",
            color: "var(--text-muted)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span>Pin Code</span>
          <span>City / Area</span>
          <span>District</span>
          <span>State</span>
          <span className="text-right">Status</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16" style={{ color: "var(--text-muted)" }}>
            <MapPin style={{ width: 36, height: 36, marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>No pin codes found</p>
            <p style={{ fontSize: "0.8rem", marginTop: 4 }}>Try a different search or state filter</p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isActive = activeStates[item.id];
            return (
              <div
                key={item.id}
                className="grid items-center gap-3 px-4 py-3.5"
                style={{
                  gridTemplateColumns: "120px 1fr 1fr 1fr 100px",
                  borderBottom: idx < filtered.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: isActive ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)" }}
                  >
                    <MapPin style={{ width: 13, height: 13, color: isActive ? "#10b981" : "#ef4444" }} />
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {item.pincode}
                  </span>
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{item.city}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{item.district}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{item.state}</span>
                <div className="flex items-center justify-end gap-2">
                  {isActive
                    ? <CheckCircle style={{ width: 14, height: 14, color: "#10b981" }} />
                    : <XCircle    style={{ width: 14, height: 14, color: "#ef4444" }} />
                  }
                  <button
                    onClick={() => toggle(item.id)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
                    style={
                      isActive
                        ? { background: "rgba(239,68,68,0.08)", color: "#ef4444" }
                        : { background: "rgba(16,185,129,0.1)", color: "#10b981" }
                    }
                  >
                    {isActive ? "Pause" : "Activate"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
