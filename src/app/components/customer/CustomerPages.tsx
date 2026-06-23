import { useState } from "react";
import { Link } from "react-router";
import {
  FolderOpen, Layout, Plus, ChevronRight, MoreHorizontal,
  Clock, CheckCircle, Circle, Pencil, Trash2, Tag,
  Heart, Share2, Download, Search, Filter, Sofa, ChefHat,
  BedDouble, Bath, Sun, Package,
} from "lucide-react";

const ACCENT = "#0891b2";
const ACCENT_RGB = "8,145,178";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`} style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────── Home ──────────────────────────────── */

const RECENT_PROJECTS = [
  { id: "kitchen", name: "Kitchen Renovation", room: "Kitchen", icon: ChefHat, color: "#f59e0b", status: "In Progress", progress: 60, designer: "Priya Nair", due: "Jun 30, 2026" },
  { id: "living",  name: "Living Room Redesign", room: "Living Room", icon: Sofa, color: "#6366f1", status: "Planning",     progress: 20, designer: "Arjun Mehta", due: "Jul 15, 2026" },
];

const RECENT_BOARDS = [
  { id: 1, name: "Modern Kitchen Inspirations", items: 12, color: "#f59e0b", style: "Modern" },
  { id: 2, name: "Minimalist Living Room",      items: 8,  color: "#6366f1", style: "Minimalist" },
  { id: 3, name: "Bedroom Warm Palette",        items: 15, color: "#ec4899", style: "Warm" },
];

export function CustomerDashboardHome() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Stats */}
      <div id="tour-customer-stats" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Projects",   value: "2",  color: ACCENT,     bg: `rgba(${ACCENT_RGB},0.08)`,  href: "/u/projects" },
          { label: "Moodboards",        value: "3",  color: "#7c3aed",  bg: "rgba(124,58,237,0.08)",     href: "/u/moodboard" },
          { label: "Saved Products",    value: "24", color: "#10b981",  bg: "rgba(16,185,129,0.08)",     href: "/u/moodboard" },
        ].map((s) => (
          <Link key={s.label} to={s.href} style={{ textDecoration: "none" }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* My Projects */}
      <div id="tour-customer-projects">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>My Projects</span>
          <Link to="/u/projects" className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: ACCENT }}>
            View all <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RECENT_PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}15` }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>by {p.designer}</p>
                  </div>
                  <StatusPill status={p.status} />
                </div>
                <div className="h-1.5 rounded-full mb-1.5" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{p.progress}% complete</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Due {p.due}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* My Moodboards */}
      <div id="tour-customer-moodboards">
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>My Moodboards</span>
          <Link to="/u/moodboard" className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: ACCENT }}>
            View all <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RECENT_BOARDS.map((b) => (
            <Card key={b.id}>
              <div className="h-14 rounded-xl mb-3" style={{ background: `linear-gradient(135deg, ${b.color}30, ${b.color}10)`, border: `1px solid ${b.color}20` }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{b.name}</p>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{b.items} items</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${b.color}15`, color: b.color }}>{b.style}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Projects ───────────────────────────── */

const PROJECTS = [
  {
    id: "kitchen",
    name: "Kitchen Renovation",
    room: "Kitchen",
    icon: ChefHat,
    color: "#f59e0b",
    status: "In Progress",
    progress: 60,
    designer: "Priya Nair",
    designerInitials: "PN",
    designerColor: "#065f46",
    due: "Jun 30, 2026",
    started: "Apr 10, 2026",
    description: "Full kitchen remodel with custom cabinets, quartz countertops, and open-plan layout.",
    budget: "₹4.2L",
    tags: ["Modern", "Open Kitchen"],
  },
  {
    id: "living",
    name: "Living Room Redesign",
    room: "Living Room",
    icon: Sofa,
    color: "#6366f1",
    status: "Planning",
    progress: 20,
    designer: "Arjun Mehta",
    designerInitials: "AM",
    designerColor: "#1e40af",
    due: "Jul 15, 2026",
    started: "May 1, 2026",
    description: "Contemporary living room with a curated furniture mix, statement lighting, and custom artwork wall.",
    budget: "₹2.8L",
    tags: ["Contemporary", "Minimalist"],
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    room: "Bedroom",
    icon: BedDouble,
    color: "#ec4899",
    status: "Completed",
    progress: 100,
    designer: "Sneha Kapoor",
    designerInitials: "SK",
    designerColor: "#be185d",
    due: "Apr 5, 2026",
    started: "Feb 15, 2026",
    description: "Warm, cocooning master bedroom with bespoke joinery, indirect lighting, and layered textiles.",
    budget: "₹1.6L",
    tags: ["Warm", "Cosy"],
  },
  {
    id: "bathroom",
    name: "Ensuite Bathroom",
    room: "Bathroom",
    icon: Bath,
    color: "#0891b2",
    status: "On Hold",
    progress: 10,
    designer: "Vikram Joshi",
    designerInitials: "VJ",
    designerColor: "#0e7490",
    due: "Aug 20, 2026",
    started: "May 10, 2026",
    description: "Spa-inspired ensuite with natural stone, rain shower, and freestanding tub.",
    budget: "₹2.1L",
    tags: ["Luxury", "Spa"],
  },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; icon: typeof Circle }> = {
    "In Progress": { bg: "rgba(8,145,178,0.1)",   color: "#0891b2", icon: Clock },
    "Planning":    { bg: "rgba(99,102,241,0.1)",  color: "#6366f1", icon: Circle },
    "Completed":   { bg: "rgba(16,185,129,0.1)",  color: "#10b981", icon: CheckCircle },
    "On Hold":     { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b", icon: Clock },
  };
  const s = map[status] ?? map["Planning"];
  const Icon = s.icon;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0" style={{ background: s.bg, color: s.color }}>
      <Icon size={10} /> {status}
    </span>
  );
}

export function CustomerProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filters = ["All", "In Progress", "Planning", "Completed", "On Hold"];
  const visible = PROJECTS.filter((p) => {
    if (filter !== "All" && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>My Projects</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>All your ongoing and completed design projects</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: ACCENT }}
        >
          <Plus size={15} /> New Project
        </button>
      </div>

      {/* Filter + Search */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors"
              style={{
                background: filter === f ? ACCENT : "rgba(0,0,0,0.05)",
                color: filter === f ? "white" : "var(--text-secondary)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-8 pr-3 py-1.5 rounded-lg text-[12px] outline-none"
            style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-primary)", width: 160 }}
          />
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {visible.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.id}>
              {/* Top */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}15` }}>
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{p.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.room}</p>
                </div>
                <StatusPill status={p.status} />
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: 14 }}>{p.description}</p>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Progress</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: p.color }}>{p.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: p.designerColor }}>
                    {p.designerInitials}
                  </div>
                  {p.designer}
                </div>
                <span>·</span>
                <span>Due {p.due}</span>
                <span>·</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.budget}</span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: `${p.color}10`, color: p.color }}>
                    {t}
                  </span>
                ))}
                <Link
                  to={`/u/moodboard`}
                  className="ml-auto text-[12px] font-semibold flex items-center gap-1"
                  style={{ color: ACCENT }}
                >
                  View Moodboard <ChevronRight size={12} />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
          <FolderOpen size={36} className="mx-auto mb-3 opacity-30" />
          <p style={{ fontSize: "0.88rem" }}>No projects match your filter.</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── Moodboard ──────────────────────────── */

const MOODBOARDS = [
  {
    id: 1,
    name: "Modern Kitchen Inspirations",
    project: "Kitchen Renovation",
    style: "Modern",
    items: 12,
    color: "#f59e0b",
    updated: "2 days ago",
    swatches: ["#f5f5f4", "#d6d3d1", "#292524", "#f59e0b", "#a3a3a3"],
    products: [
      { name: "Quartz Countertop White",  brand: "Silestone",   grad: "linear-gradient(135deg,#f5f5f0,#e5e5e0)" },
      { name: "Matte Black Cabinet Pull", brand: "Hafele",      grad: "linear-gradient(135deg,#3f3f46,#18181b)" },
      { name: "Subway Tile Ivory",        brand: "Kajaria",     grad: "linear-gradient(135deg,#fafaf9,#e7e5e4)" },
      { name: "Pendant Light Brushed",    brand: "Philips",     grad: "linear-gradient(135deg,#d4af37,#b8860b)" },
    ],
  },
  {
    id: 2,
    name: "Minimalist Living Room",
    project: "Living Room Redesign",
    style: "Minimalist",
    items: 8,
    color: "#6366f1",
    updated: "5 days ago",
    swatches: ["#f8fafc", "#e2e8f0", "#334155", "#6366f1", "#cbd5e1"],
    products: [
      { name: "Sectional Sofa Linen",     brand: "Fabindia",    grad: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
      { name: "Travertine Coffee Table",  brand: "Urban Ladder",grad: "linear-gradient(135deg,#d4c5b0,#c4a882)" },
      { name: "Textured Jute Rug 6×8",    brand: "Pepperfry",   grad: "linear-gradient(135deg,#d4c5a9,#b5975e)" },
      { name: "Arc Floor Lamp",           brand: "Flos",        grad: "linear-gradient(135deg,#f8fafc,#d4af37)" },
    ],
  },
  {
    id: 3,
    name: "Bedroom Warm Palette",
    project: "Master Bedroom",
    style: "Warm",
    items: 15,
    color: "#ec4899",
    updated: "1 week ago",
    swatches: ["#fdf4ff", "#f5d0fe", "#7e22ce", "#ec4899", "#fce7f3"],
    products: [
      { name: "Upholstered Bed Frame",    brand: "Godrej Interio", grad: "linear-gradient(135deg,#fdf4ff,#f5d0fe)" },
      { name: "Egyptian Cotton Bedding",  brand: "Welspun",     grad: "linear-gradient(135deg,#fff7ed,#fde8d0)" },
      { name: "Bedside Table Walnut",     brand: "Wooden Street",grad: "linear-gradient(135deg,#92400e,#78350f)" },
      { name: "Sheer Curtain Ivory",      brand: "Trident",     grad: "linear-gradient(135deg,#fafafa,#f5f5f5)" },
    ],
  },
  {
    id: 4,
    name: "Bathroom Spa Vibes",
    project: "Ensuite Bathroom",
    style: "Luxury",
    items: 9,
    color: "#0891b2",
    updated: "3 days ago",
    swatches: ["#ecfeff", "#a5f3fc", "#0e7490", "#0891b2", "#164e63"],
    products: [
      { name: "Travertine Wall Tile",     brand: "Nitco",       grad: "linear-gradient(135deg,#d6d0c8,#c4b9a8)" },
      { name: "Freestanding Bathtub",     brand: "Jaquar",      grad: "linear-gradient(135deg,#f0fafa,#e0f5f5)" },
      { name: "Rain Shower Brushed Gold", brand: "Kohler",      grad: "linear-gradient(135deg,#d4af37,#b8860b)" },
      { name: "Teak Bath Mat",            brand: "IKEA",        grad: "linear-gradient(135deg,#92400e,#78350f)" },
    ],
  },
];

export function CustomerMoodboardPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<number | null>(null);

  const visible = MOODBOARDS.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.style.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Moodboards</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Curated product and inspiration collections for each project</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: ACCENT }}
        >
          <Plus size={15} /> Create Board
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search boards..."
          className="pl-8 pr-3 py-2 rounded-xl text-[12px] outline-none w-full"
          style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-primary)" }}
        />
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {visible.map((b) => (
          <Card key={b.id}>
            {/* Swatch strip */}
            <div className="flex h-16 rounded-xl overflow-hidden mb-4">
              {b.swatches.map((sw, i) => (
                <div key={i} className="flex-1" style={{ background: sw }} />
              ))}
            </div>

            {/* Name + badge */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{b.name}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>for {b.project}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{ background: `${b.color}12`, color: b.color }}>
                {b.style}
              </span>
            </div>

            {/* Product thumbnails */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {b.products.map((prod, i) => (
                <div
                  key={i}
                  className="rounded-xl aspect-square flex flex-col items-center justify-center p-1.5 relative group cursor-pointer"
                  style={{ background: prod.grad }}
                  title={prod.name}
                >
                  <Package size={16} className="opacity-30" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                <span>{b.items} items</span>
                <span>·</span>
                <span>Updated {b.updated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: "rgba(0,0,0,0.04)" }} title="Save">
                  <Heart size={13} style={{ color: "var(--text-muted)" }} />
                </button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: "rgba(0,0,0,0.04)" }} title="Share">
                  <Share2 size={13} style={{ color: "var(--text-muted)" }} />
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
                  style={{ background: `${b.color}12`, color: b.color }}
                >
                  Open <ChevronRight size={11} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
          <Layout size={36} className="mx-auto mb-3 opacity-30" />
          <p style={{ fontSize: "0.88rem" }}>No boards found.</p>
        </div>
      )}
    </div>
  );
}
