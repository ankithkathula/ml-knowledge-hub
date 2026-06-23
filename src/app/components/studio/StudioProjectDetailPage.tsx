import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, MapPin, Layers, IndianRupee, Calendar,
  Sparkles, Lightbulb, FileText, Box, ClipboardList,
  CheckCircle2, Clock, MoreVertical, Download, Eye,
  Upload, Plus, StickyNote, Palette, ExternalLink,
  Folder, FolderOpen, ChevronDown, ChevronRight,
} from "lucide-react";
import { StudioProjectBomPage } from "./StudioProjectBomPage";
import { MANAGED_PROJECTS } from "../data/consultantData";
import { AvatarImg } from "../ui/AvatarImg";

const ACCENT = "#ff6a3d";
const AL = "rgba(255,106,61,0.1)";

const PROJECT_TEAM = [
  { initials: "MN", name: "Mira Nayar",    role: "Principal Architect", color: "#7c3aed", slug: "mira-nayar",    avatarUrl: "https://i.pravatar.cc/80?img=43" },
  { initials: "AM", name: "Arjun Mehta",   role: "Project Lead",        color: "#6d28d9", slug: "arjun-mehta",   avatarUrl: "https://i.pravatar.cc/80?img=12" },
  { initials: "PI", name: "Priya Iyer",    role: "Interior Designer",   color: "#2563eb", slug: "priya-iyer",    avatarUrl: "https://i.pravatar.cc/80?img=44" },
  { initials: "VB", name: "Vikram Bhalla", role: "QS Lead",             color: "#d97706", slug: "vikram-bhalla", avatarUrl: "https://i.pravatar.cc/80?img=59" },
];

const MILESTONES = [
  { title: "Schematic design approval", date: "15 Jun 2025",  status: "done"        },
  { title: "GFC drawings issued",       date: "20 Sept 2025", status: "done"        },
  { title: "Civil + structural works",  date: "28 Feb 2026",  status: "done"        },
  { title: "MEP rough-in",             date: "10 Jun 2026",  status: "in-progress" },
  { title: "Finishes + handover",      date: "30 Sept 2026", status: "upcoming"    },
];

// ── BOM ───────────────────────────────────────────────────────────────────────

const BOM_FOLDERS = [
  { id: "all",    label: "All items",         count: 9, parentId: null  },
  { id: "struct", label: "Structure & Shell", count: 2, parentId: "all" },
  { id: "facade", label: "Façade & Glazing",  count: 2, parentId: "all" },
  { id: "int",    label: "Interiors",         count: 1, parentId: "all" },
  { id: "wet",    label: "Wet Areas",         count: 1, parentId: "int" },
  { id: "floor",  label: "Flooring",          count: 2, parentId: "int" },
  { id: "mep",    label: "MEP & Smart Home",  count: 2, parentId: "all" },
];

const BOM_ITEMS = [
  { id: 1, name: "Composite Rainscreen IGU Panels", sub: "Façade · PVDF coat, ash-grey custom RAL.", brand: "Alucobond",    qty: "1,240 sqft", up: "₹5.2k",  total: "₹6.45 Cr", status: "Ordered",   fid: "facade" },
  { id: 2, name: "IGU Double-Glazed Vision Panels",  sub: "Glass · Low-E + argon-filled.",           brand: "Saint-Gobain", qty: "980 sqft",   up: "₹2.8k",  total: "₹27.4 L",  status: "Specified", fid: "facade" },
  { id: 3, name: "Italian Calacatta marble — slab",  sub: "Flooring",                                brand: "Stonex",       qty: "920 sqft",   up: "₹1.9k",  total: "₹17.5 L",  status: "Ordered",   fid: "floor"  },
  { id: 4, name: "Wide-plank engineered oak",        sub: "Flooring",                                brand: "—",            qty: "1,200 sqft", up: "₹1.1k",  total: "₹13.2 L",  status: "Planned",   fid: "floor"  },
  { id: 5, name: "Concealed cisterns + wall-hung WC",sub: "Sanitaryware",                            brand: "Kohler",       qty: "8 set",      up: "₹92.0k", total: "₹7.4 L",   status: "Ordered",   fid: "wet"    },
  { id: 6, name: "RCC structural frame",             sub: "Superstructure · M40 grade",              brand: "—",            qty: "2,100 sqft", up: "₹1.2k",  total: "₹2.52 Cr", status: "Ordered",   fid: "struct" },
  { id: 7, name: "Waterproofing membrane",           sub: "Terrace + wet areas",                     brand: "Fosroc",       qty: "920 sqft",   up: "₹95",    total: "₹8.74 L",  status: "Planned",   fid: "struct" },
  { id: 8, name: "KNX Smart Home Hub",               sub: "Building Automation",                     brand: "ABB",          qty: "1 set",      up: "₹8.4 L", total: "₹8.4 L",   status: "Specified", fid: "mep"    },
  { id: 9, name: "VRF HVAC System",                  sub: "Air Conditioning · 14 indoor units",      brand: "Daikin",       qty: "14 units",   up: "₹1.8 L", total: "₹25.2 L",  status: "Ordered",   fid: "mep"    },
];

const BOM_S: Record<string, { bg: string; color: string }> = {
  Ordered:   { bg: "rgba(59,130,246,0.12)",  color: "#2563eb" },
  Specified: { bg: "rgba(139,92,246,0.12)",  color: "#7c3aed" },
  Planned:   { bg: "rgba(107,114,128,0.12)", color: "#6b7280" },
};

// ── Moodboard ─────────────────────────────────────────────────────────────────

type MbTile =
  | { id: number; col: number; type: "image"; src: string; title: string; author: string; tag: string }
  | { id: number; col: number; type: "swatch"; color: string; name: string; hex: string }
  | { id: number; col: number; type: "note"; note: string; author: string; tag: string };

const MOODBOARD: MbTile[] = [
  { id: 1, col: 0, type: "image",  src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=380&fit=crop", title: "Open kitchen reference", author: "Mira Nayar", tag: "#kitchen" },
  { id: 4, col: 0, type: "image",  src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400&h=320&fit=crop", title: "", author: "", tag: "" },
  { id: 2, col: 1, type: "swatch", color: "#cfb27d", name: "Brass — warm", hex: "#cfb27d" },
  { id: 5, col: 1, type: "image",  src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=320&fit=crop", title: "Spa floor reference", author: "Mira Nayar", tag: "#wellness" },
  { id: 7, col: 1, type: "swatch", color: "#8b6b4a", name: "Walnut — Italian flamed", hex: "#8b6b4a" },
  { id: 3, col: 2, type: "swatch", color: "#0e1a1d", name: "Charcoal — wet areas", hex: "#0e1a1d" },
  { id: 6, col: 2, type: "note",   note: "Use 12mm IGU with low-E. Aim < 0.9 U-value across the facade.", author: "Arjun Mehta", tag: "#facade" },
];

// ── Drawings ──────────────────────────────────────────────────────────────────

const DRAWINGS = [
  {
    discipline: "Architectural", color: "#7c3aed", bg: "rgba(124,58,237,0.1)",
    files: [
      { code: "A-101", title: "Ground floor plan",             file: "KP-A-101-v3.pdf",         size: "4.1 MB",  rev: "v3 (rev 3)", by: "Mira Nayar",    date: "20 Sept 2025", type: "PDF", note: "" },
      { code: "A-102", title: "First floor plan",              file: "KP-A-102-v3.pdf",         size: "4.0 MB",  rev: "v3 (rev 3)", by: "Mira Nayar",    date: "20 Sept 2025", type: "PDF", note: "" },
      { code: "A-110", title: "Façade elevations (East/West)", file: "KP-Facade-East-West.dwg", size: "12.1 MB", rev: "v2 (rev 2)", by: "Arjun Mehta",   date: "15 Oct 2025",  type: "DWG", note: "Unitised curtain wall layout updates." },
    ],
  },
  {
    discipline: "Structural", color: "#d97706", bg: "rgba(217,119,6,0.1)",
    files: [
      { code: "S-201", title: "Foundation layout", file: "KP-Foundation.dwg", size: "9.6 MB", rev: "v1 (rev 1)", by: "Vikram Bhalla", date: "12 Jul 2025", type: "DWG", note: "" },
    ],
  },
  {
    discipline: "MEP", color: "#059669", bg: "rgba(5,150,105,0.1)",
    files: [
      { code: "M-301", title: "HVAC schematic",           file: "KP-HVAC-v1.pdf",    size: "6.2 MB", rev: "v1 (rev 1)", by: "Arjun Mehta",   date: "5 Nov 2025",  type: "PDF", note: "" },
      { code: "E-401", title: "Electrical layout — L1",   file: "KP-Elec-L1.dwg",    size: "8.8 MB", rev: "v1 (rev 1)", by: "Vikram Bhalla", date: "20 Nov 2025", type: "DWG", note: "" },
    ],
  },
];


// ── Sub-tab components ────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 rounded-2xl p-6 space-y-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>About this project</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            Tri-level 6,400 sqft luxury penthouse with a wellness floor, double-height living, and full-glazed facade.
            Net-zero ambition with on-site PV + Battery storage.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["#luxury", "#residential", "#net-zero", "#wellness"].map(t => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: AL, color: ACCENT }}>{t}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Milestones</h3>
          <div className="space-y-4">
            {MILESTONES.map((m, i) => {
              const icon =
                m.status === "done" ? <CheckCircle2 style={{ width: 20, height: 20, color: "#10b981" }} /> :
                m.status === "in-progress" ? <Sparkles style={{ width: 20, height: 20, color: ACCENT }} /> :
                <Clock style={{ width: 20, height: 20, color: "#9ca3af" }} />;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                      {m.date} · {m.status === "done" ? "done" : m.status === "in-progress" ? "in progress" : "upcoming"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>At a glance</h3>
          <div className="space-y-3">
            {[
              ["Type",              "residential"],
              ["Status",           "Active"],
              ["Address",          "North Main Road, Koregaon Park, Pune 411001"],
              ["Started",          "12 Apr 2025"],
              ["Target Completion","30 Sept 2026"],
              ["Last Activity",    "8 May 2026"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3 text-sm">
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600, textAlign: "right" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>Team</h3>
          <div className="space-y-2">
            {PROJECT_TEAM.map(m => (
              <Link
                key={m.initials}
                to={`/designer/${m.slug}`}
                className="flex items-center gap-3 p-2 rounded-xl transition-all group"
                style={{ textDecoration: "none" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <AvatarImg src={m.avatarUrl} fallback={m.initials} size={40} fallbackBg={m.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</span>
                    <ExternalLink style={{ width: 11, height: 11, color: "var(--text-muted)", opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{m.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IdeaBoardTab() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Moodboard</h2>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>7 pinned tiles · combine images, swatches and notes</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold" style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-secondary)" }}>
            🖼 Add image
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold" style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-secondary)" }}>
            <Palette style={{ width: 13, height: 13 }} /> Add swatch
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold text-white" style={{ background: ACCENT }}>
            <Plus style={{ width: 14, height: 14 }} /> New tile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map(col => (
          <div key={col} className="flex flex-col gap-3">
            {MOODBOARD.filter(t => t.col === col).map(tile => {
              if (tile.type === "image") return (
                <div key={tile.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                  <img src={tile.src} alt={tile.title} className="w-full object-cover" />
                  {tile.title && (
                    <div className="p-3">
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{tile.title}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{tile.author} · {tile.tag}</div>
                    </div>
                  )}
                </div>
              );
              if (tile.type === "swatch") return (
                <div key={tile.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ height: 80, background: tile.color }} />
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{tile.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{tile.hex}</div>
                    </div>
                    <Palette style={{ width: 14, height: 14, color: ACCENT }} />
                  </div>
                </div>
              );
              if (tile.type === "note") return (
                <div key={tile.id} className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#fffbeb", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <StickyNote style={{ width: 15, height: 15, color: ACCENT, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.55 }}>{tile.note}</p>
                    <div style={{ fontSize: "0.7rem", color: ACCENT, marginTop: 6 }}>— {tile.author} · {tile.tag}</div>
                  </div>
                </div>
              );
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DrawingsTab() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Drawings</h2>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>7 files · DWG / PDF / DXF</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold" style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-secondary)" }}>
              All disciplines <ChevronDown style={{ width: 12, height: 12 }} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold text-white" style={{ background: ACCENT }}>
              <Upload style={{ width: 14, height: 14 }} /> Upload DWG / PDF
            </button>
          </div>
        </div>
        <div className="m-4 flex items-center gap-4 px-5 py-4 rounded-xl" style={{ border: "1.5px dashed rgba(0,0,0,0.14)" }}>
          <Upload style={{ width: 20, height: 20, color: "var(--text-muted)" }} />
          <div className="flex-1">
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>Drag & drop DWG, PDF or DXF files here</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Max 100 MB per file. Drawings get versioned automatically.</div>
          </div>
          <button className="px-4 py-2 rounded-xl text-[13px] font-bold text-white" style={{ background: ACCENT }}>Browse</button>
        </div>
      </div>

      {DRAWINGS.map(group => (
        <div key={group.discipline} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ background: group.bg, color: group.color }}>{group.discipline}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{group.files.length} {group.files.length === 1 ? "file" : "files"}</span>
          </div>
          {group.files.map((f, i) => (
            <div key={f.code} className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: i < group.files.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: AL }}>
                <FileText style={{ width: 18, height: 18, color: ACCENT }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)" }}>{f.code}</span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{f.title}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{f.file} · {f.size} · {f.rev} · by {f.by} on {f.date}</div>
                {f.note && <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>{f.note}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: f.type === "PDF" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", color: f.type === "PDF" ? "#ef4444" : "#d97706" }}>
                  {f.type}
                </span>
                <button style={{ color: "var(--text-muted)" }}><Eye style={{ width: 16, height: 16 }} /></button>
                <button style={{ color: "var(--text-muted)" }}><Download style={{ width: 16, height: 16 }} /></button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function BomTab() {
  const [sel, setSel] = useState("all");
  const [exp, setExp] = useState(new Set(["all", "int"]));

  const toggle = (id: string) => setExp(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const getDescendants = (id: string): string[] => {
    const children = BOM_FOLDERS.filter(f => f.parentId === id).map(f => f.id);
    return [id, ...children.flatMap(getDescendants)];
  };
  const items = sel === "all" ? BOM_ITEMS : BOM_ITEMS.filter(it => getDescendants(sel).includes(it.fid));

  const renderFolder = (parentId: string | null, depth = 0): React.ReactNode =>
    BOM_FOLDERS.filter(f => f.parentId === parentId).map(f => {
      const hasKids = BOM_FOLDERS.some(c => c.parentId === f.id);
      const isExp = exp.has(f.id);
      const isSel = sel === f.id;
      return (
        <div key={f.id}>
          <button
            onClick={() => setSel(f.id)}
            className="w-full flex items-center gap-1.5 py-2 rounded-xl text-left text-[13px] transition-all"
            style={{ paddingLeft: 8 + depth * 14, background: isSel ? AL : "transparent", color: isSel ? ACCENT : "var(--text-secondary)", fontWeight: isSel ? 700 : 500 }}
          >
            {hasKids ? (
              <button onClick={e => { e.stopPropagation(); toggle(f.id); }} className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                {isExp ? <ChevronDown style={{ width: 11, height: 11 }} /> : <ChevronRight style={{ width: 11, height: 11 }} />}
              </button>
            ) : <span className="w-4" />}
            {isExp && hasKids
              ? <FolderOpen style={{ width: 13, height: 13, flexShrink: 0, color: isSel ? ACCENT : "#f59e0b" }} />
              : <Folder style={{ width: 13, height: 13, flexShrink: 0, color: isSel ? ACCENT : "#f59e0b" }} />
            }
            <span className="flex-1 truncate">{f.label}</span>
            <span className="pr-2" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{f.count}</span>
          </button>
          {hasKids && isExp && renderFolder(f.id, depth + 1)}
        </div>
      );
    });

  return (
    <div className="flex gap-4">
      <div className="w-56 flex-shrink-0 rounded-2xl p-3" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="flex items-center justify-between px-2 py-2 mb-1">
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Folders</span>
          <button style={{ fontSize: "0.72rem", fontWeight: 600, color: ACCENT }}>+ New folder</button>
        </div>
        {renderFolder(null)}
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Bill of Materials</h2>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{items.length} items · ₹7.65 Cr</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold" style={{ border: "1px solid rgba(0,0,0,0.15)", color: "var(--text-secondary)" }}>
              <Download style={{ width: 13, height: 13 }} /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold text-white" style={{ background: ACCENT }}>
              <Plus style={{ width: 14, height: 14 }} /> Add item
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {[["MATERIAL",""], ["BRAND",""], ["QTY",""], ["UNIT PRICE",""], ["TOTAL",""], ["STATUS",""], ["",""]].map(([h], i) => (
                  <th key={i} className="px-4 py-3 text-left" style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => {
                const s = BOM_S[it.status] ?? BOM_S.Planned;
                return (
                  <tr key={it.id} style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                    <td className="px-4 py-3.5" style={{ maxWidth: 200 }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{it.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{it.sub}</div>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{it.brand}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{it.qty}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{it.up}</td>
                    <td className="px-4 py-3.5" style={{ fontSize: "0.9rem", fontWeight: 700, color: ACCENT, whiteSpace: "nowrap" }}>{it.total}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: s.bg, color: s.color }}>{it.status}</span>
                    </td>
                    <td className="px-3 py-3.5"><button style={{ color: "var(--text-muted)" }}><MoreVertical style={{ width: 15, height: 15 }} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BoqTab() {
  return <StudioProjectBomPage embedded />;
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Tab = "overview" | "ideaboard" | "drawings" | "bom" | "boq";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ style?: React.CSSProperties }> }[] = [
  { id: "overview",  label: "Overview",   icon: Sparkles    },
  { id: "ideaboard", label: "Idea Board", icon: Lightbulb   },
  { id: "drawings",  label: "Drawings",   icon: FileText    },
  { id: "bom",       label: "BOM",        icon: Box         },
  { id: "boq",       label: "BOQ",        icon: ClipboardList },
];

export function StudioProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = MANAGED_PROJECTS.find(p => p.id === projectId) ?? MANAGED_PROJECTS[0];
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      <div className="px-4 sm:px-6 pt-4">
        <Link to="/studio/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
          <ArrowLeft style={{ width: 15, height: 15 }} /> Workspace
        </Link>
      </div>

      {/* Hero */}
      <div className="mx-4 sm:mx-6 mt-3 rounded-2xl overflow-hidden relative" style={{ height: 280 }}>
        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.62) 100%)" }} />
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "rgba(16,185,129,0.9)", color: "white" }}>
          {project.status}
        </span>
        <div className="absolute bottom-5 left-5">
          <h1 className="text-white font-extrabold leading-tight" style={{ fontSize: "1.65rem" }}>{project.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginTop: 3 }}>Mehrotra Family Trust</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="mx-4 sm:mx-6 mt-3 px-5 py-3 rounded-2xl flex flex-wrap items-center gap-x-6 gap-y-2" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
        {[
          { icon: MapPin,        text: project.location },
          { icon: Layers,        text: project.area },
          { icon: IndianRupee,   text: project.budget },
          { icon: Calendar,      text: "12 Apr 2025 → 30 Sept 2026" },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
            <Icon style={{ width: 14, height: 14 }} /> {text}
          </span>
        ))}
        <div className="ml-auto flex items-center">
          {PROJECT_TEAM.map((m, i) => (
            <AvatarImg key={m.initials} src={m.avatarUrl} fallback={m.initials} size={32} fallbackBg={m.color} style={{ marginLeft: i > 0 ? -8 : 0, border: "2px solid white" }} />
          ))}
          <button className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center text-sm font-bold" style={{ borderColor: "rgba(0,0,0,0.2)", color: "var(--text-muted)", marginLeft: -8 }}>+</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 sm:mx-6 mt-4 flex" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: active ? ACCENT : "var(--text-secondary)", borderBottom: active ? `2px solid ${ACCENT}` : "2px solid transparent", marginBottom: -1, transition: "color 0.15s" }}>
              <Icon style={{ width: 15, height: 15 }} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mx-4 sm:mx-6 mt-5 pb-10">
        {activeTab === "overview"  && <OverviewTab />}
        {activeTab === "ideaboard" && <IdeaBoardTab />}
        {activeTab === "drawings"  && <DrawingsTab />}
        {activeTab === "bom"       && <BomTab />}
        {activeTab === "boq"       && <BoqTab />}
      </div>
    </div>
  );
}
