import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft, Download, Plus, Pencil, Trash2, X, Search,
  Package, IndianRupee, Truck, ArrowUpDown, FileText, StickyNote,
  CalendarDays, Phone, Building2, Hash, MapPin,
  BarChart3, List, AlertCircle, ChevronRight, ChevronDown,
  ShoppingCart, TrendingUp, TrendingDown, CheckCircle2,
  Layers, Users, ClipboardList, HardHat, Wrench, Receipt,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

const STATUS_ORDER = [
  "Specified", "Pending Quote", "Quoted", "PO Raised", "In Transit", "Delivered", "Installed",
] as const;
type BomStatus = (typeof STATUS_ORDER)[number];
type SortField = "material" | "category" | "qty" | "budget" | "status";
type SortDir = "asc" | "desc";
type Tab = "table" | "regions" | "labor" | "budget" | "workorders" | "delivery";

type LaborSkill = "Helper" | "Skilled" | "Supervisor";
interface LaborRate {
  id: string; trade: string; skillLevel: LaborSkill;
  dailyRate: number; sqftRate: number; vendor: string;
}
interface InstallItem {
  id: string; bomId: string; material: string; trade: string;
  qty: number; unit: string; ratePerUnit: number;
  contractor: string; status: "Pending" | "In Progress" | "Completed";
}
type ContractStatus = "Draft" | "Signed" | "Active" | "Completed";
interface LaborContract {
  id: string; contractNo: string; contractor: string; trade: string;
  scope: string; value: number; paid: number;
  startDate: string; endDate: string; status: ContractStatus;
}
type WOStatus = "Draft" | "Issued" | "Acknowledged" | "In Progress" | "Completed" | "Cancelled";
interface WorkOrder {
  id: string; woNo: string; date: string; contractor: string; trade: string;
  description: string; amount: number; dueDate: string;
  status: WOStatus; contractId: string;
}

interface BomEntry {
  id: string;
  material: string;
  brand: string;
  category: string;
  room: string;
  qty: number;
  unit: string;
  budgetPrice: number;
  actualPrice: number;
  status: BomStatus;
  notes: string;
  supplier: string;
  supplierContact: string;
  poNumber: string;
  expectedDelivery: string;
  actualDelivery: string;
}

const STATUS_META: Record<BomStatus, { bg: string; text: string }> = {
  Specified:       { bg: "rgba(107,114,128,0.12)", text: "#6b7280" },
  "Pending Quote": { bg: "rgba(245,158,11,0.12)",  text: "#d97706" },
  Quoted:          { bg: "rgba(249,115,22,0.12)",  text: "#ea580c" },
  "PO Raised":     { bg: "rgba(59,130,246,0.12)",  text: "#2563eb" },
  "In Transit":    { bg: "rgba(168,85,247,0.12)",  text: "#9333ea" },
  Delivered:       { bg: "rgba(34,197,94,0.12)",   text: "#16a34a" },
  Installed:       { bg: "rgba(20,184,166,0.12)",  text: "#0d9488" },
};

/* ── Seed Data ─────────────────────────────────────────────────────── */

const INITIAL_BOM: BomEntry[] = [
  {
    id: "b1", material: "OPC 53 Grade Cement", brand: "UltraTech",
    category: "Cement & Concrete", room: "All Areas",
    qty: 450, unit: "bags", budgetPrice: 380, actualPrice: 395,
    status: "Installed",
    notes: "IS 12269 compliant. Store in dry area.",
    supplier: "BuildMart Chennai", supplierContact: "+91 98400 12345",
    poNumber: "PO-2024-0041", expectedDelivery: "2025-01-15", actualDelivery: "2025-01-14",
  },
  {
    id: "b2", material: "Fe 500D TMT Steel Bars", brand: "Tata Tiscon",
    category: "Steel & Reinforcement", room: "Structure",
    qty: 12, unit: "tonnes", budgetPrice: 58500, actualPrice: 61000,
    status: "Delivered",
    notes: "BIS certified. 8mm, 12mm, 16mm dia. Check mill certificates.",
    supplier: "Steel Plus India", supplierContact: "+91 98401 67890",
    poNumber: "PO-2024-0052", expectedDelivery: "2025-02-10", actualDelivery: "2025-02-12",
  },
  {
    id: "b3", material: "AAC Blocks 600×200×200mm", brand: "HIL (Birla Aerocon)",
    category: "Masonry & Blocks", room: "All Walls",
    qty: 5000, unit: "nos", budgetPrice: 52, actualPrice: 52,
    status: "PO Raised",
    notes: "Density 550–650 kg/m³. Min 21-day cure.",
    supplier: "Aerocon Direct", supplierContact: "+91 98402 11111",
    poNumber: "PO-2025-0003", expectedDelivery: "2026-07-01", actualDelivery: "",
  },
  {
    id: "b4", material: "APP Waterproofing Membrane", brand: "Dr. Fixit (Pidilite)",
    category: "Waterproofing", room: "Terrace & Bathrooms",
    qty: 320, unit: "sqm", budgetPrice: 185, actualPrice: 190,
    status: "In Transit",
    notes: "3mm thick APP modified bituminous. Terrace + bathroom.",
    supplier: "Pidilite Authorized", supplierContact: "+91 98403 22222",
    poNumber: "PO-2025-0007", expectedDelivery: "2026-06-15", actualDelivery: "",
  },
  {
    id: "b5", material: "Vitrified Tiles 800×800mm Double Charge", brand: "Kajaria",
    category: "Flooring & Tiles", room: "Living & Dining",
    qty: 1200, unit: "sqft", budgetPrice: 62, actualPrice: 0,
    status: "Quoted",
    notes: "Polished, PEI Class IV. Color: Armani Crema. +5% wastage.",
    supplier: "Kajaria T.Nagar", supplierContact: "+91 98404 33333",
    poNumber: "", expectedDelivery: "2026-08-01", actualDelivery: "",
  },
  {
    id: "b6", material: "FR PVC Copper Wire 2.5 sqmm", brand: "Havells Lifeline",
    category: "Electrical", room: "All Areas",
    qty: 800, unit: "meters", budgetPrice: 18, actualPrice: 17,
    status: "Installed",
    notes: "ISI marked, fire retardant. Red=phase, black=neutral, green=earth.",
    supplier: "Electro Traders", supplierContact: "+91 98405 44444",
    poNumber: "PO-2024-0038", expectedDelivery: "2024-12-20", actualDelivery: "2024-12-19",
  },
  {
    id: "b7", material: "CPVC Pipes SDR-11 1 inch", brand: "Astral",
    category: "Plumbing", room: "Bathrooms & Kitchen",
    qty: 150, unit: "meters", budgetPrice: 145, actualPrice: 0,
    status: "Pending Quote",
    notes: "Hot & cold lines. 28 kg/cm² working pressure.",
    supplier: "", supplierContact: "",
    poNumber: "", expectedDelivery: "2026-08-15", actualDelivery: "",
  },
  {
    id: "b8", material: "Exterior Emulsion Paint 20L", brand: "Asian Paints Apex Ultima",
    category: "Paints & Finishes", room: "Exterior",
    qty: 24, unit: "nos", budgetPrice: 4850, actualPrice: 0,
    status: "PO Raised",
    notes: "Color: Pristine White (0101). 2 coats over primer.",
    supplier: "Asian Paints Depot", supplierContact: "+91 98406 55555",
    poNumber: "PO-2025-0009", expectedDelivery: "2026-07-10", actualDelivery: "",
  },
];

/* ── Labor & Work Order Seed Data ─────────────────────────────────── */

const INITIAL_LABOR_RATES: LaborRate[] = [
  { id: "lr1", trade: "Masonry",          skillLevel: "Skilled",    dailyRate: 900,  sqftRate: 18,  vendor: "Bhavesh Construction" },
  { id: "lr2", trade: "Masonry",          skillLevel: "Helper",     dailyRate: 550,  sqftRate: 12,  vendor: "Bhavesh Construction" },
  { id: "lr3", trade: "Tiling & Stone",   skillLevel: "Skilled",    dailyRate: 950,  sqftRate: 22,  vendor: "Raj Tilers" },
  { id: "lr4", trade: "Painting",         skillLevel: "Skilled",    dailyRate: 850,  sqftRate: 15,  vendor: "ColorMaster" },
  { id: "lr5", trade: "Electrical",       skillLevel: "Skilled",    dailyRate: 1000, sqftRate: 0,   vendor: "Suresh Electricals" },
  { id: "lr6", trade: "Plumbing",         skillLevel: "Skilled",    dailyRate: 950,  sqftRate: 0,   vendor: "Dilip Plumbers" },
  { id: "lr7", trade: "Waterproofing",    skillLevel: "Skilled",    dailyRate: 900,  sqftRate: 25,  vendor: "Pidilite Authorized" },
  { id: "lr8", trade: "Carpentry",        skillLevel: "Skilled",    dailyRate: 1100, sqftRate: 45,  vendor: "TBD" },
  { id: "lr9", trade: "Steel Fixing",     skillLevel: "Skilled",    dailyRate: 1200, sqftRate: 0,   vendor: "Steel Plus India" },
  { id: "lr10", trade: "Civil Supervisor",skillLevel: "Supervisor", dailyRate: 2500, sqftRate: 0,   vendor: "In-house" },
];

const INITIAL_INSTALL_ITEMS: InstallItem[] = [
  { id: "ii1", bomId: "b1", material: "OPC 53 Grade Cement",            trade: "Masonry",       qty: 450,  unit: "bags",   ratePerUnit: 0,    contractor: "Bhavesh Construction",  status: "Completed"  },
  { id: "ii2", bomId: "b2", material: "Fe 500D TMT Steel Bars",         trade: "Steel Fixing",  qty: 12,   unit: "tonnes", ratePerUnit: 3500, contractor: "Steel Plus India",       status: "Completed"  },
  { id: "ii3", bomId: "b3", material: "AAC Blocks 600×200×200mm",       trade: "Masonry",       qty: 5000, unit: "nos",    ratePerUnit: 12,   contractor: "Bhavesh Construction",  status: "In Progress"},
  { id: "ii4", bomId: "b4", material: "APP Waterproofing Membrane",     trade: "Waterproofing", qty: 320,  unit: "sqm",    ratePerUnit: 65,   contractor: "Pidilite Authorized",   status: "In Progress"},
  { id: "ii5", bomId: "b5", material: "Vitrified Tiles 800×800mm",      trade: "Tiling & Stone",qty: 1200, unit: "sqft",   ratePerUnit: 30,   contractor: "Raj Tilers",            status: "Pending"    },
  { id: "ii6", bomId: "b6", material: "FR PVC Copper Wire 2.5 sqmm",   trade: "Electrical",    qty: 800,  unit: "meters", ratePerUnit: 8,    contractor: "Suresh Electricals",    status: "Completed"  },
  { id: "ii7", bomId: "b7", material: "CPVC Pipes SDR-11 1 inch",       trade: "Plumbing",      qty: 150,  unit: "meters", ratePerUnit: 120,  contractor: "Dilip Plumbers",        status: "Pending"    },
  { id: "ii8", bomId: "b8", material: "Exterior Emulsion Paint 20L",    trade: "Painting",      qty: 24,   unit: "nos",    ratePerUnit: 2500, contractor: "ColorMaster",           status: "Pending"    },
];

const INITIAL_CONTRACTS: LaborContract[] = [
  { id: "lc1", contractNo: "LC-2024-001", contractor: "Bhavesh Construction", trade: "Civil & Masonry",    scope: "All structural, masonry, plastering, external waterproofing from foundation to roof slab", value: 2850000, paid: 1710000, startDate: "2024-11-01", endDate: "2026-08-31", status: "Active"    },
  { id: "lc2", contractNo: "LC-2025-002", contractor: "Raj Tilers",           trade: "Tiling & Flooring",  scope: "Supply & installation of vitrified tiles in living, dining, bedrooms; marble in bathrooms",  value: 420000,  paid: 0,       startDate: "2026-07-01", endDate: "2026-09-30", status: "Signed"    },
  { id: "lc3", contractNo: "LC-2025-003", contractor: "Suresh Electricals",   trade: "Electrical",         scope: "Complete electrical rough-in and finishing — DB boards, conduit, wiring, light fixtures",    value: 520000,  paid: 208000,  startDate: "2025-10-01", endDate: "2026-07-31", status: "Active"    },
  { id: "lc4", contractNo: "LC-2025-004", contractor: "Dilip Plumbers",       trade: "Plumbing & Sanitary",scope: "All plumbing rough-in, hot & cold water lines, drainage, sanitary fixtures",                  value: 310000,  paid: 0,       startDate: "2026-07-15", endDate: "2026-09-15", status: "Draft"     },
  { id: "lc5", contractNo: "LC-2025-005", contractor: "ColorMaster",          trade: "Painting",           scope: "Interior & exterior — 2-coat primer + 2 topcoats, all surfaces incl. ceilings",             value: 190000,  paid: 0,       startDate: "2026-09-01", endDate: "2026-09-28", status: "Draft"     },
];

const INITIAL_WORK_ORDERS: WorkOrder[] = [
  { id: "wo1", woNo: "WO-2024-001", date: "2024-11-15", contractor: "Bhavesh Construction", trade: "Civil",        description: "Excavation, PCC, raft foundation & basement retaining walls as per S-201",          amount: 680000, dueDate: "2025-01-31", status: "Completed",  contractId: "lc1" },
  { id: "wo2", woNo: "WO-2025-002", date: "2025-02-01", contractor: "Bhavesh Construction", trade: "RCC Structure", description: "G/F and F/F RCC structure — columns, beams, slabs, M40 grade concrete Fe 500 rebar", amount: 820000, dueDate: "2026-03-31", status: "Completed",  contractId: "lc1" },
  { id: "wo3", woNo: "WO-2025-003", date: "2025-04-01", contractor: "Bhavesh Construction", trade: "Masonry",      description: "AAC block masonry — all floors, internal partitions, parapet walls",                 amount: 350000, dueDate: "2026-06-30", status: "In Progress",contractId: "lc1" },
  { id: "wo4", woNo: "WO-2025-004", date: "2025-11-01", contractor: "Suresh Electricals",   trade: "Electrical",   description: "Electrical conduit & rough-in wiring Phase 1 — G/F + F/F",                           amount: 210000, dueDate: "2026-06-30", status: "In Progress",contractId: "lc3" },
  { id: "wo5", woNo: "WO-2026-005", date: "2026-05-01", contractor: "Bhavesh Construction", trade: "Waterproofing",description: "Terrace APP membrane + all wet-area bathroom waterproofing",                        amount: 85000,  dueDate: "2026-06-20", status: "Issued",     contractId: "lc1" },
  { id: "wo6", woNo: "WO-2026-006", date: "2026-05-15", contractor: "Suresh Electricals",   trade: "Electrical",   description: "Electrical rough-in Phase 2 — second floor, terrace, DB boards, earthing",            amount: 180000, dueDate: "2026-07-31", status: "Acknowledged",contractId: "lc3" },
  { id: "wo7", woNo: "WO-2026-007", date: "2026-05-20", contractor: "Raj Tilers",           trade: "Tiling",       description: "Vitrified tile installation — living, dining, all common areas floor area 1,200 sqft", amount: 156000, dueDate: "2026-08-15", status: "Draft",      contractId: "lc2" },
  { id: "wo8", woNo: "WO-2026-008", date: "2026-05-22", contractor: "Dilip Plumbers",       trade: "Plumbing",     description: "CPVC piping rough-in — hot & cold water lines all floors + terrace",                  amount: 125000, dueDate: "2026-08-31", status: "Draft",      contractId: "lc4" },
];

const CONTRACT_META: Record<ContractStatus, { bg: string; text: string }> = {
  Draft:     { bg: "rgba(107,114,128,0.12)", text: "#6b7280" },
  Signed:    { bg: "rgba(59,130,246,0.12)",  text: "#2563eb" },
  Active:    { bg: "rgba(34,197,94,0.12)",   text: "#16a34a" },
  Completed: { bg: "rgba(20,184,166,0.12)",  text: "#0d9488" },
};

const WO_META: Record<WOStatus, { bg: string; text: string }> = {
  Draft:          { bg: "rgba(107,114,128,0.12)", text: "#6b7280" },
  Issued:         { bg: "rgba(245,158,11,0.12)",  text: "#d97706" },
  Acknowledged:   { bg: "rgba(249,115,22,0.12)",  text: "#ea580c" },
  "In Progress":  { bg: "rgba(59,130,246,0.12)",  text: "#2563eb" },
  Completed:      { bg: "rgba(34,197,94,0.12)",   text: "#16a34a" },
  Cancelled:      { bg: "rgba(239,68,68,0.12)",   text: "#ef4444" },
};

const WO_ORDER: WOStatus[] = ["Draft","Issued","Acknowledged","In Progress","Completed","Cancelled"];

const EMPTY_FORM = {
  material: "", brand: "", category: "", room: "",
  qty: "", unit: "sqft", budgetPrice: "", actualPrice: "",
  status: "Specified" as BomStatus,
  notes: "", supplier: "", supplierContact: "",
  poNumber: "", expectedDelivery: "", actualDelivery: "",
};

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioProjectBomPage({ embedded = false }: { embedded?: boolean }) {
  const { projectId } = useParams<{ projectId: string }>();
  const [bom, setBom] = useState<BomEntry[]>(INITIAL_BOM);
  const [activeTab, setActiveTab] = useState<Tab>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BomStatus | "All">("All");
  const [catFilter, setCatFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [sortField, setSortField] = useState<SortField>("material");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [exportOpen, setExportOpen] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [laborRates] = useState<LaborRate[]>(INITIAL_LABOR_RATES);
  const [installItems] = useState<InstallItem[]>(INITIAL_INSTALL_ITEMS);
  const [contracts] = useState<LaborContract[]>(INITIAL_CONTRACTS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(INITIAL_WORK_ORDERS);
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});

  /* ── Computed ── */

  const categories = useMemo(() => ["All", ...new Set(bom.map((b) => b.category))], [bom]);

  const filtered = useMemo(() => {
    let list = [...bom];
    if (statusFilter !== "All") list = list.filter((b) => b.status === statusFilter);
    if (catFilter !== "All") list = list.filter((b) => b.category === catFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.material.toLowerCase().includes(q) ||
          b.brand.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.supplier.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "material") cmp = a.material.localeCompare(b.material);
      else if (sortField === "category") cmp = a.category.localeCompare(b.category);
      else if (sortField === "qty") cmp = a.qty - b.qty;
      else if (sortField === "budget") cmp = a.qty * a.budgetPrice - b.qty * b.budgetPrice;
      else if (sortField === "status") cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [bom, searchQuery, statusFilter, catFilter, sortField, sortDir]);

  const stats = useMemo(() => {
    const totalBudget = bom.reduce((s, b) => s + b.qty * b.budgetPrice, 0);
    const confirmedItems = bom.filter((b) => b.actualPrice > 0);
    const confirmedActual = confirmedItems.reduce((s, b) => s + b.qty * b.actualPrice, 0);
    const confirmedBudget = confirmedItems.reduce((s, b) => s + b.qty * b.budgetPrice, 0);
    const variance = confirmedActual - confirmedBudget;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = bom.filter(
      (b) =>
        b.expectedDelivery &&
        !["Delivered", "Installed"].includes(b.status) &&
        new Date(b.expectedDelivery) < today
    ).length;
    const pipelineCounts = STATUS_ORDER.reduce(
      (acc, s) => { acc[s] = bom.filter((b) => b.status === s).length; return acc; },
      {} as Record<BomStatus, number>
    );
    const delivered = bom.filter((b) => ["Delivered", "Installed"].includes(b.status)).length;
    return { totalBudget, confirmedActual, confirmedBudget, variance, overdue, pipelineCounts, delivered, total: bom.length };
  }, [bom]);

  const categoryStats = useMemo(() => {
    const cats = [...new Set(bom.map((b) => b.category))];
    return cats.map((cat) => {
      const items = bom.filter((b) => b.category === cat);
      const budget = items.reduce((s, b) => s + b.qty * b.budgetPrice, 0);
      const confirmed = items.filter((b) => b.actualPrice > 0);
      const actual = confirmed.reduce((s, b) => s + b.qty * b.actualPrice, 0);
      const confirmedBudget = confirmed.reduce((s, b) => s + b.qty * b.budgetPrice, 0);
      const done = items.filter((b) => ["Delivered", "Installed"].includes(b.status)).length;
      return {
        cat, count: items.length, budget, actual,
        variance: actual - confirmedBudget,
        donePct: items.length ? Math.round((done / items.length) * 100) : 0,
        hasActual: confirmed.length > 0,
      };
    });
  }, [bom]);

  const deliveryItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [...bom]
      .filter((b) => b.expectedDelivery || ["Delivered", "Installed"].includes(b.status))
      .map((b) => ({
        ...b,
        isOverdue:
          b.expectedDelivery &&
          !["Delivered", "Installed"].includes(b.status) &&
          new Date(b.expectedDelivery) < today,
      }))
      .sort((a, b) => {
        if (!a.expectedDelivery && !b.expectedDelivery) return 0;
        if (!a.expectedDelivery) return 1;
        if (!b.expectedDelivery) return -1;
        return new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime();
      });
  }, [bom]);

  const regionGroups = useMemo(() => {
    const rooms = [...new Set(bom.map((b) => b.room))].sort();
    return rooms.map((room) => {
      const items = bom.filter((b) => b.room === room);
      const budget = items.reduce((s, b) => s + b.qty * b.budgetPrice, 0);
      const actual = items.filter((b) => b.actualPrice > 0).reduce((s, b) => s + b.qty * b.actualPrice, 0);
      const delivered = items.filter((b) => ["Delivered", "Installed"].includes(b.status)).length;
      return { room, items, budget, actual, delivered };
    });
  }, [bom]);

  const laborStats = useMemo(() => {
    const total = installItems.reduce((s, i) => s + i.qty * i.ratePerUnit, 0);
    const completed = installItems.filter((i) => i.status === "Completed").reduce((s, i) => s + i.qty * i.ratePerUnit, 0);
    const contractValue = contracts.reduce((s, c) => s + c.value, 0);
    const contractPaid = contracts.reduce((s, c) => s + c.paid, 0);
    return { total, completed, contractValue, contractPaid };
  }, [installItems, contracts]);

  /* ── Handlers ── */

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const cycleStatus = (id: string) => {
    setBom((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const idx = STATUS_ORDER.indexOf(b.status);
        return idx < STATUS_ORDER.length - 1 ? { ...b, status: STATUS_ORDER[idx + 1] } : b;
      })
    );
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowTracking(false);
    setModalOpen(true);
  };

  const openEdit = (entry: BomEntry) => {
    setEditingId(entry.id);
    setForm({
      material: entry.material, brand: entry.brand, category: entry.category, room: entry.room,
      qty: String(entry.qty), unit: entry.unit,
      budgetPrice: String(entry.budgetPrice),
      actualPrice: entry.actualPrice ? String(entry.actualPrice) : "",
      status: entry.status, notes: entry.notes,
      supplier: entry.supplier, supplierContact: entry.supplierContact,
      poNumber: entry.poNumber, expectedDelivery: entry.expectedDelivery, actualDelivery: entry.actualDelivery,
    });
    setShowTracking(true);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.material.trim() || !form.qty || !form.budgetPrice) return;
    const patch = {
      material: form.material, brand: form.brand, category: form.category, room: form.room,
      qty: Number(form.qty), unit: form.unit,
      budgetPrice: Number(form.budgetPrice),
      actualPrice: form.actualPrice ? Number(form.actualPrice) : 0,
      status: form.status, notes: form.notes,
      supplier: form.supplier, supplierContact: form.supplierContact,
      poNumber: form.poNumber, expectedDelivery: form.expectedDelivery, actualDelivery: form.actualDelivery,
    };
    if (editingId) {
      setBom((prev) => prev.map((b) => (b.id === editingId ? { ...b, ...patch } : b)));
    } else {
      setBom((prev) => [...prev, { id: `b-${Date.now()}`, ...patch }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => setBom((prev) => prev.filter((b) => b.id !== id));
  const toggleRow = (id: string) => setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  const formatDate = (d: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
  };

  const exportCSV = () => {
    const headers = [
      "Material", "Brand", "Category", "Room", "Qty", "Unit",
      "Budget Rate", "Actual Rate", "Total Budget", "Total Actual",
      "Status", "Supplier", "Supplier Contact", "PO Number",
      "Expected Delivery", "Actual Delivery", "Notes",
    ];
    const rows = bom.map((b) => [
      b.material, b.brand, b.category, b.room, b.qty, b.unit,
      b.budgetPrice, b.actualPrice || "",
      b.qty * b.budgetPrice,
      b.actualPrice ? b.qty * b.actualPrice : "",
      b.status, b.supplier, b.supplierContact, b.poNumber,
      b.expectedDelivery, b.actualDelivery, b.notes,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `boq-${projectId || "project"}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportOpen(false);
  };

  const SortBtn = ({ field }: { field: SortField }) => (
    <ArrowUpDown
      className="w-3 h-3 cursor-pointer inline ml-1 opacity-40 hover:opacity-100"
      style={{ color: sortField === field ? "var(--accent)" : "var(--text-muted)", opacity: sortField === field ? 1 : undefined }}
      onClick={(e) => { e.stopPropagation(); toggleSort(field); }}
    />
  );

  /* ── Render ── */

  return (
    <div className={embedded ? "space-y-5" : "p-4 sm:p-6 max-w-[1400px] mx-auto space-y-5"}>

      {/* Header */}
      <div>
        {!embedded && (
          <Link
            to="/studio/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-4"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
              <FileText className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
                BOQ & Procurement Tracker
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Project: {projectId?.toUpperCase() || "PRJ-001"} · {bom.length} items
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
                  className="absolute right-0 mt-1 w-36 rounded-xl shadow-lg z-20 py-1"
                  style={{ background: "var(--bg-base)", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <button
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-black/5"
                    style={{ color: "var(--text-primary)" }}
                    onClick={exportCSV}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-black/5"
                    style={{ color: "var(--text-muted)" }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
            <button className="btn-primary" onClick={openAdd}>
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Budget", icon: IndianRupee, color: "var(--accent)",
            value: `₹${formatINR(stats.totalBudget)}`,
          },
          {
            label: "Confirmed Spend", icon: ShoppingCart, color: "#3b82f6",
            value: `₹${formatINR(stats.confirmedActual)}`,
          },
          {
            label: "Cost Variance",
            icon: stats.variance > 0 ? TrendingUp : TrendingDown,
            color: stats.variance > 0 ? "#ef4444" : "#10b981",
            value: `${stats.variance > 0 ? "+" : ""}₹${formatINR(Math.abs(stats.variance))}`,
          },
          {
            label: stats.overdue > 0 ? `${stats.overdue} Overdue` : "On Schedule",
            icon: stats.overdue > 0 ? AlertCircle : CheckCircle2,
            color: stats.overdue > 0 ? "#ef4444" : "#10b981",
            value: `${stats.delivered}/${stats.total} done`,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4"
            style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>
              {s.value}
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Pipeline strip */}
      <div
        className="rounded-2xl p-4 overflow-x-auto"
        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Procurement Pipeline
        </p>
        <div className="flex items-center gap-0 min-w-max">
          {STATUS_ORDER.map((s, i) => {
            const count = stats.pipelineCounts[s] || 0;
            const meta = STATUS_META[s];
            return (
              <div key={s} className="flex items-center">
                <button
                  className="flex flex-col items-center px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: statusFilter === s ? meta.bg : "transparent",
                    border: `1px solid ${statusFilter === s ? meta.text + "40" : "transparent"}`,
                  }}
                  onClick={() => setStatusFilter((prev) => (prev === s ? "All" : s))}
                >
                  <span
                    className="text-[18px] font-black leading-none"
                    style={{ color: count > 0 ? meta.text : "var(--text-muted)", opacity: count === 0 ? 0.35 : 1 }}
                  >
                    {count}
                  </span>
                  <span className="text-[9px] font-semibold mt-0.5 whitespace-nowrap" style={{ color: count > 0 ? meta.text : "var(--text-muted)", opacity: count === 0 ? 0.35 : 1 }}>
                    {s}
                  </span>
                </button>
                {i < STATUS_ORDER.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 mx-1 flex-shrink-0" style={{ color: "var(--text-muted)", opacity: 0.3 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: "rgba(0,0,0,0.04)" }}>
        {([
          { id: "table" as Tab,      label: "BOQ Table",       icon: List },
          { id: "regions" as Tab,    label: "Regions",          icon: Layers },
          { id: "labor" as Tab,      label: "Labor & Install",  icon: Users },
          { id: "budget" as Tab,     label: "Budget",           icon: BarChart3 },
          { id: "workorders" as Tab, label: "Work Orders",      icon: ClipboardList },
          { id: "delivery" as Tab,   label: "Delivery",         icon: CalendarDays },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === id ? "white" : "transparent",
              color: activeTab === id ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: activeTab === id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── TABLE TAB ── */}
      {activeTab === "table" && (
        <div className="space-y-3">
          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="glass-card rounded-xl !p-0 flex items-center gap-2 px-3 flex-1 min-w-[200px] max-w-xs">
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none py-2.5 text-xs"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
            <select
              className="gl-input text-xs !py-2 !px-3 w-auto"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {statusFilter !== "All" && (
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ background: STATUS_META[statusFilter].bg, color: STATUS_META[statusFilter].text }}
                onClick={() => setStatusFilter("All")}
              >
                {statusFilter} <span className="opacity-60">✕</span>
              </button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    {[
                      { label: "Material", field: "material" as SortField, w: "" },
                      { label: "Category", field: "category" as SortField, w: "" },
                      { label: "Qty", field: "qty" as SortField, w: "" },
                      { label: "Budget", field: "budget" as SortField, w: "" },
                      { label: "Actual", field: null, w: "" },
                      { label: "Status", field: "status" as SortField, w: "" },
                      { label: "", field: null, w: "w-20" },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${col.w}`}
                        style={{ color: "var(--text-muted)" }}
                      >
                        {col.label}
                        {col.field && <SortBtn field={col.field} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry) => {
                    const isExpanded = expandedRows[entry.id];
                    const totalBudget = entry.qty * entry.budgetPrice;
                    const totalActual = entry.actualPrice ? entry.qty * entry.actualPrice : 0;
                    const variance = totalActual - totalBudget;
                    return (
                      <>
                        <tr
                          key={entry.id}
                          className="transition-all hover:bg-black/[0.015]"
                          style={{ borderBottom: isExpanded ? "none" : "1px solid rgba(0,0,0,0.04)" }}
                        >
                          {/* Material */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleRow(entry.id)}
                                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                style={{ background: isExpanded ? "var(--accent-light)" : "rgba(0,0,0,0.05)" }}
                              >
                                <ChevronRight
                                  className="w-3 h-3 transition-transform"
                                  style={{
                                    color: isExpanded ? "var(--accent)" : "var(--text-muted)",
                                    transform: isExpanded ? "rotate(90deg)" : "none",
                                  }}
                                />
                              </button>
                              <div>
                                <span className="text-xs font-semibold block" style={{ color: "var(--text-primary)" }}>
                                  {entry.material}
                                </span>
                                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{entry.brand}</span>
                              </div>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                              {entry.category}
                            </span>
                          </td>
                          {/* Qty */}
                          <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                            {new Intl.NumberFormat("en-IN").format(entry.qty)} <span style={{ color: "var(--text-muted)" }}>{entry.unit}</span>
                          </td>
                          {/* Budget */}
                          <td className="px-4 py-3">
                            <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>₹{formatINR(totalBudget)}</div>
                            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>@₹{formatINR(entry.budgetPrice)}</div>
                          </td>
                          {/* Actual */}
                          <td className="px-4 py-3">
                            {entry.actualPrice > 0 ? (
                              <>
                                <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>₹{formatINR(totalActual)}</div>
                                <div
                                  className="text-[10px] font-semibold"
                                  style={{ color: variance > 0 ? "#ef4444" : "#16a34a" }}
                                >
                                  {variance > 0 ? "+" : ""}₹{formatINR(Math.abs(variance))}
                                </div>
                              </>
                            ) : (
                              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>—</span>
                            )}
                          </td>
                          {/* Status — click to advance */}
                          <td className="px-4 py-3">
                            <button
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-all hover:opacity-80 active:scale-95 group relative"
                              style={{ background: STATUS_META[entry.status].bg, color: STATUS_META[entry.status].text }}
                              onClick={() => cycleStatus(entry.id)}
                              title="Click to advance to next stage"
                            >
                              {entry.status}
                            </button>
                          </td>
                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "var(--accent-light)" }}
                                onClick={() => openEdit(entry)}
                              >
                                <Pencil className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                              </button>
                              <button
                                className="w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{ background: "rgba(239,68,68,0.1)" }}
                                onClick={() => handleDelete(entry.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded tracking row */}
                        {isExpanded && (
                          <tr
                            key={`${entry.id}-exp`}
                            style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: "rgba(255,106,61,0.02)" }}
                          >
                            <td colSpan={7} className="px-4 pb-4 pt-2">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                                {[
                                  { icon: MapPin, label: "Room / Zone", val: entry.room || "—" },
                                  { icon: Building2, label: "Supplier", val: entry.supplier || "—" },
                                  { icon: Phone, label: "Contact", val: entry.supplierContact || "—" },
                                  { icon: Hash, label: "PO Number", val: entry.poNumber || "—" },
                                  { icon: CalendarDays, label: "Expected", val: formatDate(entry.expectedDelivery) },
                                  { icon: Truck, label: "Delivered", val: formatDate(entry.actualDelivery) },
                                ].map(({ icon: Icon, label, val }) => (
                                  <div key={label}>
                                    <div className="flex items-center gap-1 mb-0.5">
                                      <Icon className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                                      <span className="text-[9px] uppercase tracking-wide font-semibold" style={{ color: "var(--text-muted)" }}>{label}</span>
                                    </div>
                                    <span className="font-medium" style={{ color: "var(--text-primary)" }}>{val}</span>
                                  </div>
                                ))}
                              </div>
                              {entry.notes && (
                                <div className="mt-3 flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                                  <StickyNote className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                                  <span>{entry.notes}</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>No items found</p>
              </div>
            )}
            {/* Table footer: totals */}
            {filtered.length > 0 && (
              <div
                className="flex items-center justify-between px-4 py-3 text-xs font-semibold"
                style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "var(--text-secondary)" }}
              >
                <span>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
                <div className="flex items-center gap-6">
                  <span>
                    Budget Total:{" "}
                    <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>
                      ₹{formatINR(filtered.reduce((s, b) => s + b.qty * b.budgetPrice, 0))}
                    </span>
                  </span>
                  {filtered.some((b) => b.actualPrice > 0) && (
                    <span>
                      Actual Total:{" "}
                      <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>
                        ₹{formatINR(filtered.filter((b) => b.actualPrice > 0).reduce((s, b) => s + b.qty * b.actualPrice, 0))}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Tip: Click a status badge to advance it to the next stage. Click the arrow to expand tracking details.
          </p>
        </div>
      )}

      {/* ── REGIONS TAB ── */}
      {activeTab === "regions" && (
        <div className="space-y-3">
          {regionGroups.map((rg) => {
            const isOpen = expandedRegions[rg.room];
            const donePct = rg.items.length ? Math.round((rg.delivered / rg.items.length) * 100) : 0;
            return (
              <div key={rg.room} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setExpandedRegions((prev) => ({ ...prev, [rg.room]: !prev[rg.room] }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-light)" }}>
                      <MapPin className="w-4 h-4" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{rg.room}</div>
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{rg.items.length} items · ₹{formatINR(rg.budget)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{donePct}% done</div>
                      <div className="w-24 h-1.5 rounded-full mt-1" style={{ background: "rgba(0,0,0,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${donePct}%`, background: donePct === 100 ? "#10b981" : "var(--accent)" }} />
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform flex-shrink-0" style={{ color: "var(--text-muted)", transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </div>
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                            {["Material", "Qty", "Budget", "Actual", "Status"].map((h) => (
                              <th key={h} className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rg.items.map((item) => (
                            <tr key={item.id} className="hover:bg-black/[0.015]" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                              <td className="px-5 py-3">
                                <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{item.material}</div>
                                <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{item.brand}</div>
                              </td>
                              <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                                {new Intl.NumberFormat("en-IN").format(item.qty)} {item.unit}
                              </td>
                              <td className="px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>₹{formatINR(item.qty * item.budgetPrice)}</td>
                              <td className="px-5 py-3 text-xs" style={{ color: item.actualPrice > 0 ? "var(--text-primary)" : "var(--text-muted)" }}>
                                {item.actualPrice > 0 ? `₹${formatINR(item.qty * item.actualPrice)}` : "—"}
                              </td>
                              <td className="px-5 py-3">
                                <button
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-full hover:opacity-80 transition-all"
                                  style={{ background: STATUS_META[item.status].bg, color: STATUS_META[item.status].text }}
                                  onClick={() => cycleStatus(item.id)}
                                  title="Click to advance"
                                >
                                  {item.status}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3 text-xs font-semibold" style={{ borderTop: "1px solid rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}>
                      <span>Region Total</span>
                      <div className="flex gap-5">
                        <span>Budget: <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>₹{formatINR(rg.budget)}</span></span>
                        {rg.actual > 0 && <span>Actual: <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>₹{formatINR(rg.actual)}</span></span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── LABOR TAB ── */}
      {activeTab === "labor" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Total Install Cost",  val: `₹${formatINR(laborStats.total)}`,         color: "var(--accent)" },
              { label: "Completed Work",       val: `₹${formatINR(laborStats.completed)}`,     color: "#10b981" },
              { label: "Contract Value",       val: `₹${formatINR(laborStats.contractValue)}`, color: "#3b82f6" },
              { label: "Amount Paid",          val: `₹${formatINR(laborStats.contractPaid)}`,  color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                <div className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Labor Rates</h3>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Daily & per-sqft rates by trade</p>
              </div>
              <HardHat className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {["Trade", "Skill Level", "Daily Rate", "Sqft Rate", "Vendor"].map((h) => (
                      <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {laborRates.map((lr) => (
                    <tr key={lr.id} className="hover:bg-black/[0.015]" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                      <td className="px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{lr.trade}</td>
                      <td className="px-5 py-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                          background: lr.skillLevel === "Supervisor" ? "rgba(139,92,246,0.12)" : lr.skillLevel === "Skilled" ? "rgba(59,130,246,0.12)" : "rgba(107,114,128,0.12)",
                          color: lr.skillLevel === "Supervisor" ? "#8b5cf6" : lr.skillLevel === "Skilled" ? "#2563eb" : "#6b7280",
                        }}>
                          {lr.skillLevel}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>₹{formatINR(lr.dailyRate)}/day</td>
                      <td className="px-5 py-3 text-xs" style={{ color: lr.sqftRate > 0 ? "var(--text-primary)" : "var(--text-muted)" }}>
                        {lr.sqftRate > 0 ? `₹${lr.sqftRate}/sqft` : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{lr.vendor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Installation Costs</h3>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Per-item installation cost breakdown</p>
              </div>
              <Wrench className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {["Material", "Trade", "Qty", "Rate/Unit", "Total Install", "Contractor", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {installItems.map((ii) => {
                    const total = ii.qty * ii.ratePerUnit;
                    return (
                      <tr key={ii.id} className="hover:bg-black/[0.015]" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                        <td className="px-5 py-3">
                          <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{ii.material}</div>
                        </td>
                        <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{ii.trade}</td>
                        <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{new Intl.NumberFormat("en-IN").format(ii.qty)} {ii.unit}</td>
                        <td className="px-5 py-3 text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                          {ii.ratePerUnit > 0 ? `₹${ii.ratePerUnit}/${ii.unit}` : "—"}
                        </td>
                        <td className="px-5 py-3 text-xs font-bold" style={{ color: total > 0 ? "var(--text-primary)" : "var(--text-muted)" }}>
                          {total > 0 ? `₹${formatINR(total)}` : "—"}
                        </td>
                        <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{ii.contractor}</td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                            background: ii.status === "Completed" ? "rgba(34,197,94,0.12)" : ii.status === "In Progress" ? "rgba(59,130,246,0.12)" : "rgba(107,114,128,0.12)",
                            color: ii.status === "Completed" ? "#16a34a" : ii.status === "In Progress" ? "#2563eb" : "#6b7280",
                          }}>
                            {ii.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end px-5 py-3 text-xs font-semibold gap-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "var(--text-secondary)" }}>
              Total Install Cost:
              <span style={{ color: "var(--accent)", fontWeight: 900, fontSize: "0.9rem" }}>₹{formatINR(laborStats.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── WORK ORDERS TAB ── */}
      {activeTab === "workorders" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>Labor Contracts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {contracts.map((c) => {
                const balance = c.value - c.paid;
                const paidPct = c.value > 0 ? Math.round((c.paid / c.value) * 100) : 0;
                return (
                  <div key={c.id} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{c.contractNo}</div>
                        <div className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{c.contractor}</div>
                        <div className="text-[10px]" style={{ color: "var(--accent)" }}>{c.trade}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2" style={{ background: CONTRACT_META[c.status].bg, color: CONTRACT_META[c.status].text }}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-[10px] mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>{c.scope}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: "var(--text-muted)" }}>
                        <span>Payment Progress</span>
                        <span className="font-bold" style={{ color: "var(--text-primary)" }}>{paidPct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${paidPct}%`, background: paidPct === 100 ? "#10b981" : "var(--accent)" }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center mt-3">
                      {[
                        { label: "Contract", val: `₹${formatINR(c.value)}`,   color: undefined },
                        { label: "Paid",     val: `₹${formatINR(c.paid)}`,    color: "#16a34a" },
                        { label: "Balance",  val: `₹${formatINR(balance)}`,   color: balance > 0 ? "#d97706" : "#16a34a" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="text-[9px] uppercase font-semibold tracking-wide" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                          <div className="text-[11px] font-black mt-0.5" style={{ color: s.color || "var(--text-primary)" }}>{s.val}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-[9px]" style={{ color: "var(--text-muted)" }}>{c.startDate} → {c.endDate}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>Work Orders</h3>
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      {["WO No.", "Date", "Contractor", "Description", "Amount", "Due Date", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.map((wo) => {
                      const today = new Date(); today.setHours(0,0,0,0);
                      const isOverdue = wo.dueDate && !["Completed","Cancelled"].includes(wo.status) && new Date(wo.dueDate) < today;
                      const cycleWO = () => setWorkOrders((prev) => prev.map((w) => {
                        if (w.id !== wo.id) return w;
                        const idx = WO_ORDER.indexOf(w.status);
                        return idx < WO_ORDER.length - 1 ? { ...w, status: WO_ORDER[idx + 1] } : w;
                      }));
                      return (
                        <tr key={wo.id} className="hover:bg-black/[0.015] transition-all" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: isOverdue ? "rgba(239,68,68,0.03)" : undefined }}>
                          <td className="px-4 py-3">
                            <div className="text-[10px] font-mono font-bold" style={{ color: "var(--accent)" }}>{wo.woNo}</div>
                            <div className="text-[9px]" style={{ color: "var(--text-muted)" }}>{wo.trade}</div>
                          </td>
                          <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{formatDate(wo.date)}</td>
                          <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "var(--text-primary)" }}>{wo.contractor}</td>
                          <td className="px-4 py-3 text-xs max-w-[260px]" style={{ color: "var(--text-secondary)" }}>
                            <span className="line-clamp-2">{wo.description}</span>
                          </td>
                          <td className="px-4 py-3 text-xs font-bold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>₹{formatINR(wo.amount)}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs whitespace-nowrap" style={{ color: isOverdue ? "#ef4444" : "var(--text-secondary)" }}>{formatDate(wo.dueDate)}</span>
                            {isOverdue && <div className="text-[9px] font-bold" style={{ color: "#ef4444" }}>OVERDUE</div>}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full hover:opacity-80 transition-all whitespace-nowrap"
                              style={{ background: WO_META[wo.status].bg, color: WO_META[wo.status].text }}
                              onClick={cycleWO}
                              title="Click to advance"
                            >
                              {wo.status}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BUDGET TAB ── */}
      {activeTab === "budget" && (
        <div className="space-y-4">
          {/* Budget summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Project Budget", val: `₹${formatINR(stats.totalBudget)}`, sub: `${bom.length} line items`, color: "var(--accent)" },
              { label: "Confirmed Spend", val: `₹${formatINR(stats.confirmedActual)}`, sub: `${bom.filter(b => b.actualPrice > 0).length} items priced`, color: "#3b82f6" },
              {
                label: "Variance",
                val: `${stats.variance > 0 ? "+" : ""}₹${formatINR(Math.abs(stats.variance))}`,
                sub: stats.variance > 0 ? "Over budget" : stats.variance < 0 ? "Under budget" : "On budget",
                color: stats.variance > 0 ? "#ef4444" : "#10b981",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5"
                style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: s.color, lineHeight: 1.1 }}>{s.val}</div>
                <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Budget utilisation bar */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Budget Utilisation</span>
              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                {stats.totalBudget > 0 ? Math.round((stats.confirmedActual / stats.totalBudget) * 100) : 0}% confirmed
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, stats.totalBudget > 0 ? (stats.confirmedActual / stats.totalBudget) * 100 : 0)}%`,
                  background: stats.confirmedActual > stats.totalBudget ? "#ef4444" : "var(--accent)",
                }}
              />
            </div>
          </div>

          {/* Category breakdown */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Category Breakdown</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["Category", "Items", "Budget", "Actual", "Variance", "Delivery Progress"].map((h) => (
                    <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryStats.map((cs) => (
                  <tr key={cs.cat} className="hover:bg-black/[0.015]" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <td className="px-5 py-3">
                      <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{cs.cat}</span>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{cs.count}</td>
                    <td className="px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>₹{formatINR(cs.budget)}</td>
                    <td className="px-5 py-3 text-xs font-semibold" style={{ color: cs.hasActual ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {cs.hasActual ? `₹${formatINR(cs.actual)}` : "—"}
                    </td>
                    <td className="px-5 py-3">
                      {cs.hasActual ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: cs.variance > 0 ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                            color: cs.variance > 0 ? "#ef4444" : "#10b981",
                          }}
                        >
                          {cs.variance > 0 ? "+" : ""}₹{formatINR(Math.abs(cs.variance))}
                        </span>
                      ) : <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>—</span>}
                    </td>
                    <td className="px-5 py-3 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${cs.donePct}%`, background: cs.donePct === 100 ? "#10b981" : "var(--accent)" }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold w-8 text-right" style={{ color: "var(--text-muted)" }}>{cs.donePct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── DELIVERY TAB ── */}
      {activeTab === "delivery" && (
        <div className="space-y-3">
          {stats.overdue > 0 && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {stats.overdue} item{stats.overdue > 1 ? "s are" : " is"} overdue — click the status badge to update
            </div>
          )}

          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    {["Material", "Room", "Supplier", "PO Number", "Expected", "Actual", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deliveryItems.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-black/[0.015] transition-all"
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                        background: entry.isOverdue ? "rgba(239,68,68,0.03)" : undefined,
                      }}
                    >
                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{entry.material}</div>
                        <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{entry.brand}</div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{entry.room || "—"}</td>
                      <td className="px-4 py-3">
                        {entry.supplier ? (
                          <>
                            <div className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{entry.supplier}</div>
                            {entry.supplierContact && (
                              <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{entry.supplierContact}</div>
                            )}
                          </>
                        ) : (
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Not assigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: entry.poNumber ? "var(--text-primary)" : "var(--text-muted)" }}>
                        {entry.poNumber || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-medium"
                          style={{ color: entry.isOverdue ? "#ef4444" : "var(--text-primary)" }}
                        >
                          {formatDate(entry.expectedDelivery)}
                        </span>
                        {entry.isOverdue && (
                          <div className="text-[9px] font-bold" style={{ color: "#ef4444" }}>OVERDUE</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: entry.actualDelivery ? "#16a34a" : "var(--text-muted)" }}>
                        {formatDate(entry.actualDelivery)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full hover:opacity-80 transition-all"
                          style={{ background: STATUS_META[entry.status].bg, color: STATUS_META[entry.status].text }}
                          onClick={() => cycleStatus(entry.id)}
                          title="Click to advance"
                        >
                          {entry.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {deliveryItems.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>No delivery data yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-card-strong w-full max-w-lg max-h-[90vh] overflow-y-auto !rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {editingId ? "Edit Item" : "Add BOQ Item"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Material & Brand */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Material / Product Name *</label>
                <input type="text" className="gl-input" placeholder="e.g., OPC 53 Grade Cement" value={form.material} onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Brand</label>
                  <input type="text" className="gl-input" placeholder="e.g., UltraTech" value={form.brand} onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Category</label>
                  <input type="text" className="gl-input" placeholder="e.g., Flooring & Tiles" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Room / Zone</label>
                  <input type="text" className="gl-input" placeholder="e.g., Living Room" value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Status</label>
                  <select className="gl-input" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as BomStatus }))}>
                    {STATUS_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {/* Qty, Unit, Prices */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Qty *</label>
                  <input type="number" className="gl-input" placeholder="0" value={form.qty} onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Unit</label>
                  <select className="gl-input" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}>
                    {["sqft", "sqm", "kg", "nos", "meters", "liters", "bags", "tonnes", "rft"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Budget ₹/unit *</label>
                  <input type="number" className="gl-input" placeholder="0" value={form.budgetPrice} onChange={(e) => setForm((f) => ({ ...f, budgetPrice: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Actual ₹/unit</label>
                  <input type="number" className="gl-input" placeholder="0" value={form.actualPrice} onChange={(e) => setForm((f) => ({ ...f, actualPrice: e.target.value }))} />
                </div>
              </div>
              {/* Notes */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Specification Notes</label>
                <textarea className="gl-input" rows={2} placeholder="Grade, size, finish, compliance requirements..." value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              {/* Tracking details accordion */}
              <button
                className="flex items-center gap-2 text-xs font-semibold w-full py-2"
                style={{ color: "var(--accent)" }}
                onClick={() => setShowTracking((v) => !v)}
              >
                <ChevronRight className="w-3.5 h-3.5 transition-transform" style={{ transform: showTracking ? "rotate(90deg)" : "none" }} />
                {showTracking ? "Hide" : "Add"} Tracking Details (Supplier, PO, Dates)
              </button>
              {showTracking && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Supplier</label>
                      <input type="text" className="gl-input" placeholder="Company name" value={form.supplier} onChange={(e) => setForm((f) => ({ ...f, supplier: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Supplier Contact</label>
                      <input type="text" className="gl-input" placeholder="+91 XXXXX XXXXX" value={form.supplierContact} onChange={(e) => setForm((f) => ({ ...f, supplierContact: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>PO Number</label>
                    <input type="text" className="gl-input" placeholder="e.g., PO-2025-0042" value={form.poNumber} onChange={(e) => setForm((f) => ({ ...f, poNumber: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Expected Delivery</label>
                      <input type="date" className="gl-input" value={form.expectedDelivery} onChange={(e) => setForm((f) => ({ ...f, expectedDelivery: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Actual Delivery</label>
                      <input type="date" className="gl-input" value={form.actualDelivery} onChange={(e) => setForm((f) => ({ ...f, actualDelivery: e.target.value }))} />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleSave}>
                  {editingId ? "Save Changes" : "Add Item"}
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
