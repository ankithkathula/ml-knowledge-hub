import { useState } from "react";
import { Package, Eye, MessageSquare, Search, Plus, ChevronDown } from "lucide-react";

const ACCENT = "#f59e0b";

const INVENTORY = [
  { id: 1, name: "UltraTech OPC 53 Grade Cement", brand: "UltraTech", category: "Building Materials / Cement", sku: "UC-OPC53-50KG", price: "₹420/bag", stock: "In stock", views: 840, enquiries: 34, status: "active" },
  { id: 2, name: "Tata Tiscon Fe 500D TMT Bar 12mm", brand: "Tata Steel", category: "Building Materials / Steel", sku: "TS-FE500-12", price: "₹68/kg", stock: "In stock", views: 610, enquiries: 22, status: "active" },
  { id: 3, name: "Asian Paints Apex Ultima 10L", brand: "Asian Paints", category: "Wall Finishes / Paint", sku: "AP-APEX-10L", price: "₹2,840/can", stock: "In stock", views: 490, enquiries: 18, status: "active" },
  { id: 4, name: "Kajaria Jazz Porcelain 600×600", brand: "Kajaria", category: "Flooring / Tiles", sku: "KJ-JAZZ-6060", price: "₹68/sq ft", stock: "Out of stock", views: 380, enquiries: 11, status: "paused" },
  { id: 5, name: "Havells Concealed Wire 2.5 sq mm", brand: "Havells", category: "Electrical / Wiring", sku: "HV-WIRE-2.5", price: "₹3,200/coil", stock: "In stock", views: 270, enquiries: 8, status: "active" },
  { id: 6, name: "Pidilite Dr Fixit Raincoat 4L", brand: "Pidilite", category: "Building Materials / Waterproofing", sku: "PD-DFRW-4L", price: "₹1,560/can", stock: "In stock", views: 210, enquiries: 6, status: "active" },
  { id: 7, name: "Hindware Aspire WC Suite", brand: "Hindware", category: "Sanitary / WC", sku: "HW-ASPIRE-WC", price: "₹8,200", stock: "In stock", views: 180, enquiries: 5, status: "active" },
  { id: 8, name: "Kohler Serif Washbasin", brand: "Kohler", category: "Sanitary / Washbasin", sku: "KH-SERIF-WB", price: "₹12,400", stock: "Limited", views: 140, enquiries: 4, status: "active" },
];

type StatusFilter = "all" | "active" | "paused";

export function DealerInventoryPage() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = INVENTORY.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
      || item.brand.toLowerCase().includes(search.toLowerCase())
      || item.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Inventory on Material Library
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex-shrink-0"
          style={{ background: ACCENT }}
        >
          <Plus style={{ width: 15, height: 15 }} />
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search products, brands, categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "var(--text-primary)",
              fontSize: "0.85rem",
            }}
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "var(--text-primary)",
              fontSize: "0.85rem",
            }}
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
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
            gridTemplateColumns: "2fr 1fr 1fr 80px 80px 80px",
            color: "var(--text-muted)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-right">Views</span>
          <span className="text-right">Enquiries</span>
          <span className="text-right">Status</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16" style={{ color: "var(--text-muted)" }}>
            <Package style={{ width: 36, height: 36, marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>No products found</p>
            <p style={{ fontSize: "0.8rem", marginTop: 4 }}>Try a different search or filter</p>
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={item.id}
              className="grid items-center gap-3 px-4 py-3.5 cursor-pointer transition-all"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 80px 80px 80px",
                borderBottom: idx < filtered.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.03)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <div className="min-w-0">
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                  {item.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {item.brand} · {item.sku}
                </div>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }} className="truncate">
                {item.category}
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {item.price}
              </div>
              <div className="flex items-center justify-end gap-1" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                <Eye style={{ width: 12, height: 12 }} /> {item.views}
              </div>
              <div className="flex items-center justify-end gap-1" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                <MessageSquare style={{ width: 12, height: 12 }} /> {item.enquiries}
              </div>
              <div className="flex justify-end">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={
                    item.status === "active"
                      ? { background: "rgba(16,185,129,0.1)", color: "#10b981" }
                      : { background: "rgba(239,68,68,0.1)", color: "#ef4444" }
                  }
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
