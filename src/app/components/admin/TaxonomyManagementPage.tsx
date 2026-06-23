import { useState } from "react";
import {
  Network, Search, Plus, Upload, Download, Edit3, Trash2,
  ChevronRight, ChevronDown, Filter, Eye, Image, FileText,
  BarChart3, Users, Newspaper, Tag, Layers, ArrowUpDown
} from "lucide-react";

interface TaxonomyNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  parentId: string | null;
  childCount: number;
  brandCount: number;
  color: string;
  status: "active" | "draft" | "archived";
}

// Mock data for all layers
const MOCK_TAXONOMY: TaxonomyNode[] = [
  { id: "building-envelope", name: "Building Envelope", description: "Doors, windows, curtain walls, cladding, roofing", icon: "🏢", level: 1, parentId: null, childCount: 5, brandCount: 680, color: "#2a9d8f", status: "active" },
  { id: "structural-systems", name: "Structural Systems", description: "Concrete, cement, steel, reinforcement", icon: "🏗️", level: 1, parentId: null, childCount: 4, brandCount: 520, color: "#6c757d", status: "active" },
  { id: "mep-systems", name: "MEP Systems", description: "Mechanical, electrical, plumbing, HVAC, fire safety", icon: "⚡", level: 1, parentId: null, childCount: 5, brandCount: 920, color: "#ff6a3d", status: "active" },
  { id: "interior-finishes", name: "Interior Finishes", description: "Flooring, tiles, paints, coatings, wall finishes", icon: "🎨", level: 1, parentId: null, childCount: 4, brandCount: 750, color: "#e63946", status: "active" },
  { id: "wet-areas", name: "Wet Areas & Plumbing", description: "Bathroom fittings, sanitaryware, waterproofing", icon: "🚿", level: 1, parentId: null, childCount: 3, brandCount: 560, color: "#457b9d", status: "active" },
  { id: "insulation", name: "Insulation & Protection", description: "Thermal, acoustic, fire protection", icon: "🛡️", level: 1, parentId: null, childCount: 3, brandCount: 310, color: "#6a994e", status: "active" },
  { id: "furniture", name: "Furniture & Fittings", description: "Modular furniture, hardware, fittings", icon: "🪑", level: 1, parentId: null, childCount: 3, brandCount: 650, color: "#bc6c25", status: "active" },
  { id: "ceiling-partition", name: "Ceiling & Partition", description: "False ceilings, drywall, partition systems", icon: "🏠", level: 1, parentId: null, childCount: 3, brandCount: 280, color: "#7209b7", status: "active" },
  { id: "outdoor-landscape", name: "Outdoor & Landscape", description: "Pavers, outdoor lighting, irrigation", icon: "🌿", level: 1, parentId: null, childCount: 4, brandCount: 220, color: "#2d6a4f", status: "active" },
  { id: "safety-security", name: "Safety & Security", description: "Fire safety, CCTV, access control", icon: "🔒", level: 1, parentId: null, childCount: 4, brandCount: 340, color: "#d62828", status: "active" },
  { id: "specialty-materials", name: "Specialty Materials", description: "Acoustic panels, radiation shielding", icon: "✨", level: 1, parentId: null, childCount: 3, brandCount: 190, color: "#023e8a", status: "active" },
  // L2 examples
  { id: "doors-windows", name: "Doors & Windows", description: "All door and window systems", icon: "🚪", level: 2, parentId: "building-envelope", childCount: 8, brandCount: 260, color: "#2a9d8f", status: "active" },
  { id: "cladding-facades", name: "Cladding & Facades", description: "External cladding and facade systems", icon: "🏗️", level: 2, parentId: "building-envelope", childCount: 6, brandCount: 180, color: "#2a9d8f", status: "active" },
  { id: "concrete-cement", name: "Concrete & Cement", description: "All concrete and cement types", icon: "🧱", level: 2, parentId: "structural-systems", childCount: 6, brandCount: 180, color: "#6c757d", status: "active" },
  { id: "electrical-systems", name: "Electrical Systems", description: "Wiring, switches, panels, distribution", icon: "⚡", level: 2, parentId: "mep-systems", childCount: 8, brandCount: 320, color: "#ff6a3d", status: "active" },
  { id: "smart-automation", name: "Smart Home & Building Automation", description: "IoT, smart controls", icon: "🤖", level: 2, parentId: "mep-systems", childCount: 6, brandCount: 150, color: "#ff6a3d", status: "active" },
  // L3 examples
  { id: "curtain-wall", name: "Curtain Wall & Facade Systems", description: "Structural glazing and curtain walls", icon: "🏢", level: 3, parentId: "doors-windows", childCount: 8, brandCount: 45, color: "#2a9d8f", status: "active" },
  { id: "aluminium-windows", name: "Aluminium Windows", description: "Aluminium window systems", icon: "🪟", level: 3, parentId: "doors-windows", childCount: 5, brandCount: 85, color: "#2a9d8f", status: "active" },
  { id: "ready-mix-concrete", name: "Ready-Mix Concrete", description: "RMC products and grades", icon: "🧱", level: 3, parentId: "concrete-cement", childCount: 10, brandCount: 60, color: "#6c757d", status: "active" },
  { id: "smart-lighting", name: "Smart Lighting", description: "Connected and smart lighting controls", icon: "💡", level: 3, parentId: "smart-automation", childCount: 4, brandCount: 35, color: "#ff6a3d", status: "active" },
];

// Data fields that each layer needs
const LAYER_FIELDS: Record<number, string[]> = {
  1: ["Name", "Description", "Icon", "Image URL", "Color", "Brand Count"],
  2: ["Name", "Description", "Icon", "Image URL", "Parent (L1)", "Brand Count", "Market Size", "Growth Rate"],
  3: ["Name", "Description", "Icon", "Image URL", "Parent (L2)", "Brand Count", "Technologies", "Standards"],
  4: ["Name", "Description", "Icon", "Image URL", "Parent (L3)", "Brand Count", "Specifications", "Selection Criteria"],
  5: ["Name", "Description", "Icon", "Image URL", "Parent (L4)", "Brand Count", "Technical Specs", "Comparison Parameters"],
};

// Content sections per layer
const LAYER_SECTIONS: Record<number, { name: string; icon: React.ElementType; description: string }[]> = {
  1: [
    { name: "Overview", icon: FileText, description: "Category description, key facts" },
    { name: "Subcategories", icon: Layers, description: "L2 child categories" },
    { name: "Top Brands", icon: Users, description: "Featured brands in this category" },
  ],
  2: [
    { name: "Overview", icon: FileText, description: "Detailed description, market overview" },
    { name: "Market Metrics", icon: BarChart3, description: "Market size, growth, regional data" },
    { name: "Technologies", icon: Tag, description: "Key technologies and innovations" },
    { name: "Industry News", icon: Newspaper, description: "Category-specific news" },
    { name: "Brands", icon: Users, description: "Brands operating in this category" },
    { name: "Selection Criteria", icon: Filter, description: "Product selection guidance" },
  ],
  3: [
    { name: "Overview", icon: FileText, description: "Technical overview, applications" },
    { name: "Standards & Codes", icon: FileText, description: "BIS, ISO, ASTM standards" },
    { name: "Sustainability", icon: Tag, description: "Green certifications, eco-ratings" },
    { name: "Technologies", icon: Tag, description: "Manufacturing technologies" },
    { name: "News", icon: Newspaper, description: "Product group specific news" },
    { name: "Experts", icon: Users, description: "Domain consultants" },
    { name: "Selection Criteria", icon: Filter, description: "Detailed selection parameters" },
    { name: "Photos & Videos", icon: Image, description: "Visual gallery" },
  ],
  4: [
    { name: "Overview", icon: FileText, description: "Product type details" },
    { name: "Specifications", icon: FileText, description: "Technical specifications table" },
    { name: "Brands", icon: Users, description: "Brands manufacturing this type" },
    { name: "Selection Criteria", icon: Filter, description: "Comparison matrix" },
    { name: "Market Data", icon: BarChart3, description: "Pricing, availability, trends" },
    { name: "Consultants", icon: Users, description: "Tagged experts" },
    { name: "News", icon: Newspaper, description: "Relevant industry news" },
    { name: "Media", icon: Image, description: "Product images, installation videos" },
  ],
  5: [
    { name: "Overview", icon: FileText, description: "Specification variant details" },
    { name: "Technical Data", icon: FileText, description: "Detailed technical datasheets" },
    { name: "Products (L6)", icon: Layers, description: "Actual products from brands" },
    { name: "Comparison", icon: ArrowUpDown, description: "Product comparison table" },
    { name: "Brands", icon: Users, description: "Brands offering this spec" },
    { name: "Selection Guide", icon: Filter, description: "Application-specific guide" },
    { name: "Consultants", icon: Users, description: "Specialist experts" },
    { name: "Media", icon: Image, description: "Technical drawings, videos" },
  ],
};

const SERVICE_TAXONOMY = [
  { id: "architecture-design", name: "Architecture & Design", icon: "🏛️", subCount: 6, providerCount: 820, color: "#3b82f6" },
  { id: "structural-civil",    name: "Structural & Civil",   icon: "🏗️", subCount: 4, providerCount: 540, color: "#6c757d" },
  { id: "interior-design",     name: "Interior Design",      icon: "🎨", subCount: 8, providerCount: 1240, color: "#ec4899" },
  { id: "mep-services",        name: "MEP Engineering",      icon: "⚡", subCount: 5, providerCount: 460, color: "#ff6a3d" },
  { id: "project-management",  name: "Project Management",   icon: "📋", subCount: 4, providerCount: 380, color: "#22c55e" },
  { id: "sustainability",      name: "Sustainability & Green",icon: "🌿", subCount: 3, providerCount: 210, color: "#16a34a" },
  { id: "facility-management", name: "Facility Management",  icon: "🔧", subCount: 5, providerCount: 320, color: "#8b5cf6" },
  { id: "landscape",           name: "Landscape & Outdoor",  icon: "🌳", subCount: 4, providerCount: 180, color: "#2d6a4f" },
  { id: "procurement",         name: "Procurement & Supply",  icon: "📦", subCount: 3, providerCount: 290, color: "#b45309" },
  { id: "inspection",          name: "Inspection & Audit",   icon: "🔍", subCount: 4, providerCount: 150, color: "#dc2626" },
];

export function TaxonomyManagementPage() {
  const [taxonomyTab, setTaxonomyTab] = useState<"product" | "service">("product");
  const [selectedLayer, setSelectedLayer] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [viewMode, setViewMode] = useState<"tree" | "table">("table");

  const filteredNodes = MOCK_TAXONOMY.filter(
    (n) => n.level === selectedLayer && n.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    const next = new Set(expandedNodes);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedNodes(next);
  };

  const getChildren = (parentId: string) => MOCK_TAXONOMY.filter((n) => n.parentId === parentId);

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Top-level taxonomy type tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)", width: "fit-content" }}>
        {(["product", "service"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTaxonomyTab(t)}
            className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={{
              background: taxonomyTab === t ? "white" : "transparent",
              color: taxonomyTab === t ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: taxonomyTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t === "product" ? "Product Taxonomy" : "Service Taxonomy"}
          </button>
        ))}
      </div>

      {taxonomyTab === "service" ? (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>Service Taxonomy</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 2 }}>Manage service categories for studios, consultants, and professionals</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#ff6a3d" }}>
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICE_TAXONOMY.map((cat) => (
              <div key={cat.id} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-3">
                  <span style={{ fontSize: "1.6rem" }}>{cat.icon}</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"><Edit3 className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} /></button>
                  </div>
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{cat.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{cat.subCount} subcategories</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{cat.providerCount} providers</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min((cat.providerCount / 1240) * 100, 100)}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Product Taxonomy
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage category hierarchy across all 5 layers with bulk import
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
            onClick={() => setShowImportModal(true)}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.08)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.08)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
            style={{ background: "#ff6a3d" }}
            onClick={() => setShowAddModal(true)}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e8522a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ff6a3d")}
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {/* Layer Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.04)" }}>
        {[1, 2, 3, 4, 5].map((layer) => (
          <button
            key={layer}
            className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: selectedLayer === layer ? "white" : "transparent",
              color: selectedLayer === layer ? "#ff6a3d" : "var(--text-muted)",
              boxShadow: selectedLayer === layer ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
            onClick={() => setSelectedLayer(layer)}
          >
            <span className="block font-bold">L{layer}</span>
            <span className="block mt-0.5" style={{ fontSize: "0.65rem", opacity: 0.7 }}>
              {layer === 1 ? "Root (11)" : layer === 2 ? "Sub (41)" : layer === 3 ? "Groups (195)" : layer === 4 ? "Types (6.3K)" : "Specs (53.7K)"}
            </span>
          </button>
        ))}
      </div>

      {/* Layer Content Sections Info */}
      <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
            L{selectedLayer} Content Sections
          </h3>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            {LAYER_SECTIONS[selectedLayer]?.length} sections per category
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {LAYER_SECTIONS[selectedLayer]?.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.name} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "rgba(0,0,0,0.02)" }}>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#ff6a3d" }} />
                <div className="min-w-0">
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{section.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }} className="truncate">{section.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            placeholder={`Search L${selectedLayer} categories...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(0,0,0,0.08)",
              color: "var(--text-primary)",
              outline: "none",
            }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "rgba(0,0,0,0.04)" }}>
          <button
            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              background: viewMode === "table" ? "white" : "transparent",
              color: viewMode === "table" ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: viewMode === "table" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
            }}
            onClick={() => setViewMode("table")}
          >
            Table
          </button>
          <button
            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              background: viewMode === "tree" ? "white" : "transparent",
              color: viewMode === "tree" ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: viewMode === "tree" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
            }}
            onClick={() => setViewMode("tree")}
          >
            Tree
          </button>
        </div>
      </div>

      {/* Data Fields Info */}
      <div className="rounded-xl p-3 flex items-center gap-3 flex-wrap" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3b82f6" }}>L{selectedLayer} Fields:</span>
        {LAYER_FIELDS[selectedLayer]?.map((field) => (
          <span key={field} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", fontWeight: 500 }}>
            {field}
          </span>
        ))}
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                <th className="text-left px-4 py-3 hidden md:table-cell" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Children</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Brands</th>
                <th className="text-center px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th className="text-right px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNodes.map((node) => (
                <tr
                  key={node.id}
                  className="transition-all"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{node.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{node.name}</div>
                        <div style={{ fontSize: "0.7rem", color: node.color, fontWeight: 500 }}>{node.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }} className="line-clamp-1">{node.description}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{node.childCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{node.brandCount.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: node.status === "active" ? "rgba(34,197,94,0.1)" : node.status === "draft" ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.05)",
                        color: node.status === "active" ? "#10b981" : node.status === "draft" ? "#f59e0b" : "var(--text-muted)",
                      }}
                    >
                      {node.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1.5 rounded-lg transition-all"
                        title="View"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.color = "#3b82f6"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg transition-all"
                        title="Edit"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => setEditingNode(node.id)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ff6a3d"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg transition-all"
                        title="Delete"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tree View */}
      {viewMode === "tree" && (
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="space-y-1">
            {MOCK_TAXONOMY.filter((n) => n.level === 1).map((l1) => (
              <div key={l1.id}>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-left"
                  style={{ background: expandedNodes.has(l1.id) ? "rgba(255,106,61,0.06)" : "transparent" }}
                  onClick={() => toggleExpand(l1.id)}
                >
                  {expandedNodes.has(l1.id) ? <ChevronDown className="w-4 h-4" style={{ color: "#ff6a3d" }} /> : <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />}
                  <span className="text-lg">{l1.icon}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{l1.name}</span>
                  <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>{l1.childCount} children &middot; {l1.brandCount} brands</span>
                </button>
                {expandedNodes.has(l1.id) && (
                  <div className="ml-8 pl-4 space-y-0.5" style={{ borderLeft: `2px solid ${l1.color}20` }}>
                    {getChildren(l1.id).map((l2) => (
                      <div key={l2.id}>
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left"
                          style={{ background: expandedNodes.has(l2.id) ? "rgba(255,106,61,0.04)" : "transparent" }}
                          onClick={() => toggleExpand(l2.id)}
                        >
                          {getChildren(l2.id).length > 0 ? (
                            expandedNodes.has(l2.id) ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#ff6a3d" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                          ) : <div className="w-3.5" />}
                          <span>{l2.icon}</span>
                          <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>{l2.name}</span>
                          <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>{l2.childCount} &middot; {l2.brandCount} brands</span>
                        </button>
                        {expandedNodes.has(l2.id) && (
                          <div className="ml-8 pl-4 space-y-0.5" style={{ borderLeft: `2px solid ${l2.color}15` }}>
                            {getChildren(l2.id).map((l3) => (
                              <div
                                key={l3.id}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                style={{ background: "rgba(0,0,0,0.01)" }}
                              >
                                <span>{l3.icon}</span>
                                <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)" }}>{l3.name}</span>
                                <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>{l3.childCount} &middot; {l3.brandCount} brands</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
            style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>
              Add L{selectedLayer} Category
            </h3>
            <div className="space-y-4">
              {LAYER_FIELDS[selectedLayer]?.map((field) => (
                <div key={field}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                    {field}
                  </label>
                  {field === "Description" ? (
                    <textarea
                      className="w-full px-3 py-2.5 rounded-xl text-sm"
                      rows={3}
                      placeholder={`Enter ${field.toLowerCase()}...`}
                      style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none", resize: "vertical" }}
                    />
                  ) : field.startsWith("Parent") ? (
                    <select
                      className="w-full px-3 py-2.5 rounded-xl text-sm"
                      style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                    >
                      <option value="">Select parent category...</option>
                      {MOCK_TAXONOMY.filter((n) => n.level === selectedLayer - 1).map((n) => (
                        <option key={n.id} value={n.id}>{n.icon} {n.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="w-full px-3 py-2.5 rounded-xl text-sm"
                      placeholder={`Enter ${field.toLowerCase()}...`}
                      style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#ff6a3d" }}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative w-full max-w-lg rounded-2xl p-6"
            style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
              Bulk Import L{selectedLayer} Categories
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 20 }}>
              Upload a CSV or Excel file with the required fields for Layer {selectedLayer}
            </p>

            {/* Required Fields */}
            <div className="rounded-xl p-3 mb-4" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>Required CSV Columns:</div>
              <div className="flex flex-wrap gap-1">
                {LAYER_FIELDS[selectedLayer]?.map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
              onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "#ff6a3d"; (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.04)"; }}
              onDragLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              onDrop={(e) => e.preventDefault()}
            >
              <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                Drop CSV/XLSX file here or click to browse
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>
                Supports .csv, .xlsx up to 10MB
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button className="text-xs font-semibold" style={{ color: "#ff6a3d" }}>
                <Download className="w-3.5 h-3.5 inline mr-1" />
                Download Template
              </button>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setShowImportModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "#ff6a3d" }}
                >
                  Upload & Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
