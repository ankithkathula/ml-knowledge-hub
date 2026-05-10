import { useState, useMemo } from "react";
import {
  Package,
  Plus,
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  ArrowRight,
  Image,
  MapPin,
  XCircle,
  Eye,
  ChevronDown,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type SampleStage = "Requested" | "Approved" | "Shipped" | "Received" | "Returned";
type SamplePurpose = "Project use" | "Evaluation" | "Client presentation";

interface SampleRequest {
  id: string;
  product: string;
  brand: string;
  requestedDate: string;
  stage: SampleStage;
  trackingId: string | null;
  expectedDelivery: string | null;
  quantity: number;
  purpose: SamplePurpose;
  address: string;
  notes: string;
}

/* ── Mock Data ─────────────────────────────────────────────────────── */

const INITIAL_SAMPLES: SampleRequest[] = [
  { id: "s1", product: "Calacatta Gold Marble 600x600mm", brand: "Stonex India", requestedDate: "Mar 28, 2026", stage: "Shipped", trackingId: "TRK-849201", expectedDelivery: "Apr 4, 2026", quantity: 2, purpose: "Client presentation", address: "Studio 14, Sector 44, Gurugram", notes: "Need polished finish sample" },
  { id: "s2", product: "Anti-Skid Vitrified Floor Tile 800x800mm", brand: "Somany Ceramics", requestedDate: "Mar 26, 2026", stage: "Approved", trackingId: null, expectedDelivery: "Apr 6, 2026", quantity: 3, purpose: "Project use", address: "Studio 14, Sector 44, Gurugram", notes: "Colors: Sahara Beige, Arctic White, Fossil Grey" },
  { id: "s3", product: "Engineered Wooden Flooring - Oak", brand: "Pergo", requestedDate: "Mar 30, 2026", stage: "Requested", trackingId: null, expectedDelivery: null, quantity: 1, purpose: "Evaluation", address: "Studio 14, Sector 44, Gurugram", notes: "12mm thick, natural oak finish" },
  { id: "s4", product: "Quartz Countertop - Carrara White", brand: "Caesarstone", requestedDate: "Mar 20, 2026", stage: "Received", trackingId: "TRK-842156", expectedDelivery: null, quantity: 1, purpose: "Client presentation", address: "Studio 14, Sector 44, Gurugram", notes: "200x200mm sample slab" },
  { id: "s5", product: "Exterior Wall Cladding - Natural Stone", brand: "Stone World", requestedDate: "Mar 15, 2026", stage: "Returned", trackingId: "TRK-838901", expectedDelivery: null, quantity: 2, purpose: "Evaluation", address: "Studio 14, Sector 44, Gurugram", notes: "Returned after client rejected the texture" },
  { id: "s6", product: "Decorative Laminate - Walnut Matte", brand: "Merino Laminates", requestedDate: "Mar 31, 2026", stage: "Requested", trackingId: null, expectedDelivery: null, quantity: 4, purpose: "Project use", address: "Site Office, Jubilee Hills, Hyderabad", notes: "For wardrobe and kitchen cabinet finishes" },
];

const STAGE_CONFIG: Record<SampleStage, { bg: string; text: string; icon: typeof Clock }> = {
  Requested: { bg: "rgba(156,163,175,0.12)", text: "#6b7280", icon: Clock },
  Approved: { bg: "rgba(59,130,246,0.12)", text: "#2563eb", icon: CheckCircle2 },
  Shipped: { bg: "rgba(168,85,247,0.12)", text: "#7c3aed", icon: Truck },
  Received: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", icon: Package },
  Returned: { bg: "rgba(245,158,11,0.12)", text: "#d97706", icon: RotateCcw },
};

const PIPELINE_STAGES: SampleStage[] = ["Requested", "Approved", "Shipped", "Received", "Returned"];

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioSamplesPage() {
  const [samples, setSamples] = useState<SampleRequest[]>(INITIAL_SAMPLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState<SampleStage | "All">("All");
  const [form, setForm] = useState({
    product: "",
    brand: "",
    quantity: "1",
    purpose: "Evaluation" as SamplePurpose,
    address: "",
    notes: "",
  });

  /* ── Computed ──────────────────────────────────────────────────── */

  const pipelineCounts = useMemo(() => {
    const counts: Record<SampleStage, number> = { Requested: 0, Approved: 0, Shipped: 0, Received: 0, Returned: 0 };
    samples.forEach((s) => counts[s.stage]++);
    return counts;
  }, [samples]);

  const stats = useMemo(() => ({
    active: samples.filter((s) => s.stage === "Requested" || s.stage === "Approved").length,
    shipped: samples.filter((s) => s.stage === "Shipped").length,
    receivedThisMonth: samples.filter((s) => s.stage === "Received").length,
    pending: samples.filter((s) => s.stage === "Requested").length,
  }), [samples]);

  const filtered = useMemo(() => {
    let list = samples;
    if (stageFilter !== "All") list = list.filter((s) => s.stage === stageFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.product.toLowerCase().includes(q) || s.brand.toLowerCase().includes(q));
    }
    return list;
  }, [samples, stageFilter, searchQuery]);

  const activeSamples = filtered.filter((s) => s.stage !== "Returned" && s.stage !== "Received");
  const historySamples = filtered.filter((s) => s.stage === "Returned" || s.stage === "Received");

  /* ── Handlers ─────────────────────────────────────────────────── */

  const handleRequest = () => {
    if (!form.product.trim()) return;
    setSamples((prev) => [
      {
        id: `s-${Date.now()}`,
        product: form.product,
        brand: form.brand,
        requestedDate: "Just now",
        stage: "Requested",
        trackingId: null,
        expectedDelivery: null,
        quantity: Number(form.quantity),
        purpose: form.purpose,
        address: form.address,
        notes: form.notes,
      },
      ...prev,
    ]);
    setForm({ product: "", brand: "", quantity: "1", purpose: "Evaluation", address: "", notes: "" });
    setModalOpen(false);
  };

  const markReceived = (id: string) => {
    setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, stage: "Received" as SampleStage, trackingId: s.trackingId } : s)));
  };

  const markReturned = (id: string) => {
    setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, stage: "Returned" as SampleStage } : s)));
  };

  const cancelRequest = (id: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== id));
  };

  const statCards = [
    { label: "Active Requests", value: stats.active, icon: Clock, color: "var(--accent)" },
    { label: "Shipped", value: stats.shipped, icon: Truck, color: "#7c3aed" },
    { label: "Received This Month", value: stats.receivedThisMonth, icon: Package, color: "#10b981" },
    { label: "Pending Approval", value: stats.pending, icon: Eye, color: "#f59e0b" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
            <Package className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Material Samples</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Request, track, and manage material samples</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Request Sample
        </button>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Pipeline View ───────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Sample Pipeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage, idx) => {
            const config = STAGE_CONFIG[stage];
            const Icon = config.icon;
            return (
              <div key={stage} className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all min-w-[120px]"
                  style={{
                    background: stageFilter === stage ? config.bg : "rgba(0,0,0,0.02)",
                    border: stageFilter === stage ? `1px solid ${config.text}30` : "1px solid transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setStageFilter(stageFilter === stage ? "All" : stage)}
                >
                  <Icon className="w-4 h-4" style={{ color: config.text }} />
                  <div className="text-left">
                    <div className="text-lg font-bold" style={{ color: config.text, lineHeight: 1 }}>{pipelineCounts[stage]}</div>
                    <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{stage}</div>
                  </div>
                </button>
                {idx < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)", opacity: 0.3 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Search ──────────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl !p-1.5 max-w-lg">
        <div className="flex items-center gap-3 px-4">
          <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search samples by product or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ── Active Sample Requests ──────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Active Requests</h3>
        {activeSamples.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No active sample requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeSamples.map((sample) => {
              const config = STAGE_CONFIG[sample.stage];
              const StageIcon = config.icon;
              return (
                <div
                  key={sample.id}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-black/[0.02]"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)", border: "1px dashed rgba(0,0,0,0.1)" }}>
                    <Image className="w-6 h-6" style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{sample.product}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: config.bg, color: config.text }}>
                        <StageIcon className="w-3 h-3" /> {sample.stage}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{sample.brand} &middot; Qty: {sample.quantity}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                      <span>Requested: {sample.requestedDate}</span>
                      {sample.trackingId && <span className="font-mono" style={{ color: "#7c3aed" }}>ID: {sample.trackingId}</span>}
                      {sample.expectedDelivery && <span>ETA: {sample.expectedDelivery}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {sample.stage === "Shipped" && (
                      <button className="btn-primary !text-xs !py-1.5 !px-3" onClick={() => markReceived(sample.id)}>
                        <CheckCircle2 className="w-3 h-3" /> Mark Received
                      </button>
                    )}
                    {sample.stage === "Requested" && (
                      <button
                        className="flex items-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-lg"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                        onClick={() => cancelRequest(sample.id)}
                      >
                        <XCircle className="w-3 h-3" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── History ─────────────────────────────────────────────────── */}
      {historySamples.length > 0 && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>History</h3>
          <div className="space-y-2">
            {historySamples.map((sample) => {
              const config = STAGE_CONFIG[sample.stage];
              const StageIcon = config.icon;
              return (
                <div
                  key={sample.id}
                  className="flex items-center justify-between p-3 rounded-xl transition-all hover:bg-black/[0.02]"
                  style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: config.bg }}>
                      <StageIcon className="w-4 h-4" style={{ color: config.text }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{sample.product}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {sample.brand} &middot; Requested: {sample.requestedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: config.bg, color: config.text }}>
                      {sample.stage}
                    </span>
                    {sample.stage === "Received" && (
                      <button className="btn-secondary !text-xs !py-1.5 !px-3" onClick={() => markReturned(sample.id)}>
                        <RotateCcw className="w-3 h-3" /> Return
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Request Sample Modal ────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div className="glass-card-strong w-full max-w-lg max-h-[85vh] overflow-y-auto !rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Request Sample</h2>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Product / Brand *</label>
                <input type="text" className="gl-input" placeholder="Search product or brand from library..." value={form.product} onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Brand</label>
                <input type="text" className="gl-input" placeholder="e.g., Kajaria, Asian Paints..." value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Quantity</label>
                  <input type="number" className="gl-input" min="1" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Purpose</label>
                  <select className="gl-input" value={form.purpose} onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value as SamplePurpose }))}>
                    {(["Project use", "Evaluation", "Client presentation"] as SamplePurpose[]).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Delivery Address</label>
                <input type="text" className="gl-input" placeholder="Studio or site address..." value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Notes</label>
                <textarea className="gl-input" rows={3} placeholder="Color, size, finish preferences..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleRequest}>
                  <Package className="w-4 h-4" /> Request Sample
                </button>
                <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
