import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Download,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Package,
  IndianRupee,
  ShoppingCart,
  Truck,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  FileText,
  StickyNote,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type BomStatus = "Pending" | "Ordered" | "Delivered";
type SortField = "material" | "category" | "qty" | "unitPrice" | "total" | "status";
type SortDir = "asc" | "desc";

interface BomEntry {
  id: string;
  material: string;
  brand: string;
  category: string;
  qty: number;
  unit: string;
  unitPrice: number;
  status: BomStatus;
  notes: string;
}

/* ── Mock Data ─────────────────────────────────────────────────────── */

const INITIAL_BOM: BomEntry[] = [
  { id: "b1", material: "OPC 53 Grade Cement", brand: "UltraTech", category: "Cement & Concrete", qty: 450, unit: "bags", unitPrice: 380, status: "Delivered", notes: "IS 12269 compliant. Prefer UltraTech for consistent quality. Store in dry area." },
  { id: "b2", material: "Fe 500D TMT Steel Bars", brand: "Tata Tiscon", category: "Steel & Reinforcement", qty: 12, unit: "tonnes", unitPrice: 58500, status: "Ordered", notes: "BIS certified Fe 500D grade. 8mm, 12mm, 16mm dia required. Check mill certificates on delivery." },
  { id: "b3", material: "AAC Blocks 600x200x200mm", brand: "HIL (Birla Aerocon)", category: "Masonry & Blocks", qty: 5000, unit: "nos", unitPrice: 52, status: "Pending", notes: "Density: 550-650 kg/m3. Thermal conductivity 0.16 W/mK. Ensure blocks are cured min 21 days." },
  { id: "b4", material: "APP Waterproofing Membrane", brand: "Dr. Fixit (Pidilite)", category: "Waterproofing", qty: 320, unit: "sqm", unitPrice: 185, status: "Ordered", notes: "3mm thick APP modified bituminous membrane. Use for terrace and bathroom waterproofing." },
  { id: "b5", material: "Double Charge Vitrified Tiles 800x800mm", brand: "Kajaria", category: "Flooring & Tiles", qty: 1200, unit: "sqft", unitPrice: 62, status: "Pending", notes: "Polished finish, PEI Class IV. Color: Armani Crema. Keep 5% extra for wastage." },
  { id: "b6", material: "FR PVC Insulated Copper Wire 2.5 sqmm", brand: "Havells Lifeline", category: "Electrical", qty: 800, unit: "meters", unitPrice: 18, status: "Delivered", notes: "Fire retardant, ISI marked. Red for phase, black for neutral, green for earth." },
  { id: "b7", material: "CPVC Pipes SDR-11 1 inch", brand: "Astral", category: "Plumbing", qty: 150, unit: "meters", unitPrice: 145, status: "Pending", notes: "For hot & cold water lines. Working pressure 28 kg/cm2. Use Astral-recommended solvent cement." },
  { id: "b8", material: "Exterior Emulsion Paint (20L)", brand: "Asian Paints Apex Ultima", category: "Paints & Finishes", qty: 24, unit: "nos", unitPrice: 4850, status: "Ordered", notes: "Color: Pristine White (0101). Weather-resistant up to 9 years. 2 coats over primer." },
];

const STATUS_STYLE: Record<BomStatus, { bg: string; text: string }> = {
  Pending: { bg: "rgba(245,158,11,0.12)", text: "#d97706" },
  Ordered: { bg: "rgba(59,130,246,0.12)", text: "#2563eb" },
  Delivered: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
};

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioProjectBomPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [bom, setBom] = useState<BomEntry[]>(INITIAL_BOM);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [sortField, setSortField] = useState<SortField>("material");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [exportOpen, setExportOpen] = useState(false);

  const [form, setForm] = useState({
    material: "",
    brand: "",
    category: "",
    qty: "",
    unit: "sqft",
    unitPrice: "",
    notes: "",
  });

  /* ── Computed ──────────────────────────────────────────────────── */

  const filtered = useMemo(() => {
    let list = [...bom];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.material.toLowerCase().includes(q) ||
          b.brand.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "material") cmp = a.material.localeCompare(b.material);
      else if (sortField === "category") cmp = a.category.localeCompare(b.category);
      else if (sortField === "qty") cmp = a.qty - b.qty;
      else if (sortField === "unitPrice") cmp = a.unitPrice - b.unitPrice;
      else if (sortField === "total") cmp = a.qty * a.unitPrice - b.qty * b.unitPrice;
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [bom, searchQuery, sortField, sortDir]);

  const stats = useMemo(() => {
    const totalItems = bom.length;
    const totalCost = bom.reduce((s, b) => s + b.qty * b.unitPrice, 0);
    const ordered = bom.filter((b) => b.status === "Ordered" || b.status === "Delivered").length;
    const delivered = bom.filter((b) => b.status === "Delivered").length;
    return {
      totalItems,
      totalCost,
      orderedPct: totalItems ? Math.round((ordered / totalItems) * 100) : 0,
      deliveredPct: totalItems ? Math.round((delivered / totalItems) * 100) : 0,
    };
  }, [bom]);

  /* ── Handlers ─────────────────────────────────────────────────── */

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ material: "", brand: "", category: "", qty: "", unit: "sqft", unitPrice: "", notes: "" });
    setModalOpen(true);
  };

  const openEdit = (entry: BomEntry) => {
    setEditingId(entry.id);
    setForm({
      material: entry.material,
      brand: entry.brand,
      category: entry.category,
      qty: String(entry.qty),
      unit: entry.unit,
      unitPrice: String(entry.unitPrice),
      notes: entry.notes,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.material.trim() || !form.qty || !form.unitPrice) return;
    if (editingId) {
      setBom((prev) =>
        prev.map((b) =>
          b.id === editingId
            ? { ...b, material: form.material, brand: form.brand, category: form.category, qty: Number(form.qty), unit: form.unit, unitPrice: Number(form.unitPrice), notes: form.notes }
            : b
        )
      );
    } else {
      setBom((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          material: form.material,
          brand: form.brand,
          category: form.category,
          qty: Number(form.qty),
          unit: form.unit,
          unitPrice: Number(form.unitPrice),
          status: "Pending" as BomStatus,
          notes: form.notes,
        },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setBom((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  const SortIcon = ({ field }: { field: SortField }) => (
    <ArrowUpDown
      className="w-3 h-3 cursor-pointer inline ml-1"
      style={{ color: sortField === field ? "var(--accent)" : "var(--text-muted)", opacity: sortField === field ? 1 : 0.5 }}
      onClick={() => toggleSort(field)}
    />
  );

  const statCards = [
    { label: "Total Items", value: stats.totalItems, icon: Package, color: "var(--accent)" },
    { label: "Total Cost", value: `₹${formatINR(stats.totalCost)}`, icon: IndianRupee, color: "#10b981" },
    { label: "Ordered", value: `${stats.orderedPct}%`, icon: ShoppingCart, color: "#3b82f6" },
    { label: "Delivered", value: `${stats.deliveredPct}%`, icon: Truck, color: "#a855f7" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div>
        <Link
          to="/studio/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-4 transition-all"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
              <FileText className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Bill of Materials
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Project ID: {projectId || "PRJ-001"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="btn-secondary" onClick={() => setExportOpen(!exportOpen)}>
                <Download className="w-4 h-4" /> Export
              </button>
              {exportOpen && (
                <div
                  className="absolute right-0 mt-1 w-32 rounded-xl shadow-lg z-20 py-1"
                  style={{ background: "var(--bg-base)", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <button
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-black/5"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-black/5"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
            <button className="btn-primary" onClick={openAdd}>
              <Plus className="w-4 h-4" /> Add Material
            </button>
          </div>
        </div>
      </div>

      {/* ── Cost Summary Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 transition-all hover:scale-[1.02]"
            style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>
              {s.value}
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Search ──────────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl !p-1.5 max-w-lg">
        <div className="flex items-center gap-3 px-4">
          <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search materials, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ── BOM Table ───────────────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                {[
                  { label: "Material", field: "material" as SortField },
                  { label: "Brand", field: null },
                  { label: "Category", field: "category" as SortField },
                  { label: "Qty", field: "qty" as SortField },
                  { label: "Unit", field: null },
                  { label: "Unit Price (₹)", field: "unitPrice" as SortField },
                  { label: "Total (₹)", field: "total" as SortField },
                  { label: "Status", field: "status" as SortField },
                  { label: "Actions", field: null },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="px-4 py-3 text-xs font-semibold whitespace-nowrap"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {col.label}
                    {col.field && <SortIcon field={col.field} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <>
                  <tr
                    key={entry.id}
                    className="transition-all hover:bg-black/[0.02]"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {entry.material}
                        </span>
                        {entry.notes && (
                          <button onClick={() => toggleNotes(entry.id)} className="flex-shrink-0">
                            <StickyNote className="w-3.5 h-3.5" style={{ color: expandedNotes[entry.id] ? "var(--accent)" : "var(--text-muted)" }} />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{entry.brand}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{formatINR(entry.qty)}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{entry.unit}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>₹{formatINR(entry.unitPrice)}</td>
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: "var(--text-primary)" }}>₹{formatINR(entry.qty * entry.unitPrice)}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: STATUS_STYLE[entry.status].bg, color: STATUS_STYLE[entry.status].text }}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ background: "var(--accent-light)" }}
                          onClick={() => openEdit(entry)}
                        >
                          <Pencil className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ background: "rgba(239,68,68,0.10)" }}
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Specification Notes (expandable) */}
                  {expandedNotes[entry.id] && entry.notes && (
                    <tr key={`${entry.id}-notes`}>
                      <td colSpan={9} className="px-4 py-3" style={{ background: "rgba(255,106,61,0.03)" }}>
                        <div className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                          <StickyNote className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                          <span>{entry.notes}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>No materials found</p>
          </div>
        )}
      </div>

      {/* ── Add/Edit Material Modal ─────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-card-strong w-full max-w-lg max-h-[85vh] overflow-y-auto !rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {editingId ? "Edit Material" : "Add Material"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Product Name *</label>
                <input type="text" className="gl-input" placeholder="Search product name..." value={form.material} onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Brand</label>
                  <input type="text" className="gl-input" placeholder="e.g., UltraTech" value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Category (L5)</label>
                  <input type="text" className="gl-input" placeholder="e.g., Cement & Concrete" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Quantity *</label>
                  <input type="number" className="gl-input" placeholder="0" value={form.qty} onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Unit</label>
                  <select className="gl-input" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}>
                    {["sqft", "kg", "nos", "meters", "liters", "bags", "tonnes", "sqm"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Unit Price (₹) *</label>
                  <input type="number" className="gl-input" placeholder="0" value={form.unitPrice} onChange={(e) => setForm((f) => ({ ...f, unitPrice: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Notes</label>
                <textarea className="gl-input" rows={3} placeholder="Specification details, requirements..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleSave}>
                  {editingId ? "Save Changes" : "Add Material"}
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
