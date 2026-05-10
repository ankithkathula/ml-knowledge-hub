import { useState } from "react";
import {
  Package, Truck, CheckCircle, Clock, Search, Plus, X,
  MapPin, FileText, Hash, Calendar, ExternalLink, Box,
} from "lucide-react";

// --- Types ---

interface SampleRequest {
  id: string;
  product: string;
  brand: string;
  status: "Requested" | "Approved" | "Shipped" | "Delivered";
  requestedDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  tracking?: string;
  quantity: number;
}

// --- Mock Data ---

const mockSamples: SampleRequest[] = [
  {
    id: "SMP001",
    product: "Italian Marble Floor Tile 800x1600",
    brand: "Kajaria Ceramics",
    status: "Shipped",
    requestedDate: "20 Mar 2026",
    shippedDate: "24 Mar 2026",
    tracking: "DTDC-9876543210",
    quantity: 2,
  },
  {
    id: "SMP002",
    product: "Royale Glitz Luxury Emulsion - Pearl White",
    brand: "Asian Paints",
    status: "Delivered",
    requestedDate: "10 Mar 2026",
    shippedDate: "13 Mar 2026",
    deliveredDate: "16 Mar 2026",
    tracking: "BLUEDART-1234567890",
    quantity: 1,
  },
  {
    id: "SMP003",
    product: "Vitrified Double Charge Tile - Statuario",
    brand: "Somany Ceramics",
    status: "Approved",
    requestedDate: "28 Mar 2026",
    quantity: 3,
  },
  {
    id: "SMP004",
    product: "LED Recessed Downlight 12W Warm White",
    brand: "Philips",
    status: "Requested",
    requestedDate: "30 Mar 2026",
    quantity: 2,
  },
];

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  Requested: { bg: "rgba(245,158,11,0.1)", text: "#d97706" },
  Approved: { bg: "rgba(59,130,246,0.1)", text: "#2563eb" },
  Shipped: { bg: "rgba(139,92,246,0.1)", text: "#7c3aed" },
  Delivered: { bg: "rgba(34,197,94,0.1)", text: "#16a34a" },
};

// --- Component ---

export function UserSamplesPage() {
  const [samples] = useState(mockSamples);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("Flat 302, Prestige Lakeside Habitat, Whitefield, Bangalore - 560066");

  const stats = {
    active: samples.filter((s) => s.status === "Requested" || s.status === "Approved").length,
    shipped: samples.filter((s) => s.status === "Shipped").length,
    received: samples.filter((s) => s.status === "Delivered").length,
    total: samples.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Sample Requests</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Track your material sample requests
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#6366f1" }}
        >
          <Plus size={16} /> Request Sample
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active", value: stats.active, icon: Clock, color: "#d97706", bg: "rgba(245,158,11,0.1)" },
          { label: "Shipped", value: stats.shipped, icon: Truck, color: "#7c3aed", bg: "rgba(139,92,246,0.1)" },
          { label: "Received", value: stats.received, icon: CheckCircle, color: "#16a34a", bg: "rgba(34,197,94,0.1)" },
          { label: "Total", value: stats.total, icon: Package, color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Request List */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>All Requests</h2>
        <div className="space-y-3">
          {samples.map((s) => (
            <div key={s.id} className="p-4 rounded-xl border transition hover:shadow-sm" style={{ borderColor: "rgba(99,102,241,0.08)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{s.id}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ backgroundColor: STATUS_STYLE[s.status].bg, color: STATUS_STYLE[s.status].text }}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{s.product}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.brand} | Qty: {s.quantity}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      <Calendar size={11} className="inline mr-1" />Requested: {s.requestedDate}
                    </span>
                    {s.shippedDate && (
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        <Truck size={11} className="inline mr-1" />Shipped: {s.shippedDate}
                      </span>
                    )}
                    {s.deliveredDate && (
                      <span className="text-xs" style={{ color: "#16a34a" }}>
                        <CheckCircle size={11} className="inline mr-1" />Delivered: {s.deliveredDate}
                      </span>
                    )}
                  </div>
                  {s.tracking && (
                    <p className="text-xs mt-1 font-mono" style={{ color: "#6366f1" }}>
                      <Hash size={10} className="inline" /> {s.tracking}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Sample Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowRequestModal(false)}>
          <div className="glass-card p-6 max-w-md mx-4 w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Request a Sample</h3>
              <button onClick={() => setShowRequestModal(false)}>
                <X size={18} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Search Product</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    className="gl-input w-full pl-9 text-sm"
                    placeholder="Search material library..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Quantity</label>
                <input
                  type="number"
                  className="gl-input w-full text-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  max="5"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Purpose</label>
                <textarea
                  className="gl-input w-full h-20 resize-none text-sm"
                  placeholder="Why do you need this sample?"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  <MapPin size={12} className="inline mr-1" />Delivery Address
                </label>
                <textarea
                  className="gl-input w-full h-16 resize-none text-sm"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#6366f1" }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
