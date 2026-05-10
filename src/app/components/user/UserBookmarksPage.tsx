import { useState } from "react";
import {
  Search, Bookmark, Trash2, ExternalLink, Plus, X,
  ShoppingCart, Package, SortAsc, FolderPlus, Filter,
} from "lucide-react";

// --- Types ---

interface BookmarkedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  priceRange: string;
  gradient: string;
  collection: string;
}

// --- Mock Data ---

const mockBookmarks: BookmarkedProduct[] = [
  { id: "BK001", name: "Italian Marble Floor Tile 800x1600", brand: "Kajaria Ceramics", category: "Flooring", priceRange: "Rs 180 - Rs 320/sq.ft.", gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)", collection: "Flooring" },
  { id: "BK002", name: "LED Recessed Downlight 12W", brand: "Philips", category: "Lighting", priceRange: "Rs 450 - Rs 850/unit", gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", collection: "Lighting" },
  { id: "BK003", name: "Royale Glitz Luxury Emulsion", brand: "Asian Paints", category: "Paints", priceRange: "Rs 620 - Rs 780/litre", gradient: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)", collection: "Paints" },
  { id: "BK004", name: "TMT Steel Bars Fe-550D", brand: "Tata Tiscon", category: "Structural", priceRange: "Rs 58,000 - Rs 62,000/tonne", gradient: "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)", collection: "Structural" },
  { id: "BK005", name: "Vitrified Double Charge Tile", brand: "Somany Ceramics", category: "Flooring", priceRange: "Rs 95 - Rs 180/sq.ft.", gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)", collection: "Flooring" },
  { id: "BK006", name: "Decorative Wall Sconce E27", brand: "Havells", category: "Lighting", priceRange: "Rs 1,200 - Rs 2,500/unit", gradient: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)", collection: "Lighting" },
  { id: "BK007", name: "Weatherproof Exterior Emulsion", brand: "Berger Paints", category: "Paints", priceRange: "Rs 340 - Rs 520/litre", gradient: "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)", collection: "Paints" },
  { id: "BK008", name: "Portland Pozzolana Cement (PPC)", brand: "UltraTech", category: "Structural", priceRange: "Rs 340 - Rs 380/bag", gradient: "linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)", collection: "Structural" },
];

const collectionTabs = ["All", "Flooring", "Lighting", "Paints", "Structural"];

// --- Component ---

export function UserBookmarksPage() {
  const [bookmarks, setBookmarks] = useState(mockBookmarks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "brand">("name");
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collections, setCollections] = useState(collectionTabs);

  const filtered = bookmarks
    .filter((b) => {
      const matchesTab = activeTab === "All" || b.collection === activeTab;
      const matchesSearch = !searchQuery || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : a.brand.localeCompare(b.brand)));

  function removeBookmark(id: string) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }

  function handleCreateCollection() {
    if (newCollectionName.trim() && !collections.includes(newCollectionName.trim())) {
      setCollections([...collections, newCollectionName.trim()]);
      setNewCollectionName("");
      setShowCreateCollection(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>My Bookmarks</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {bookmarks.length} saved products from the material library
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              className="gl-input pl-9 w-56 text-sm"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSortBy(sortBy === "name" ? "brand" : "name")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
            style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
          >
            <SortAsc size={14} /> {sortBy === "name" ? "Name" : "Brand"}
          </button>
        </div>
      </div>

      {/* Collection Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {collections.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition"
            style={{
              backgroundColor: activeTab === tab ? "#6366f1" : "rgba(99,102,241,0.08)",
              color: activeTab === tab ? "#fff" : "#6366f1",
            }}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => setShowCreateCollection(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed transition hover:opacity-80"
          style={{ borderColor: "var(--text-muted)", color: "var(--text-muted)" }}
        >
          <FolderPlus size={13} /> New
        </button>
      </div>

      {/* Bookmark Cards */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Bookmark size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>No bookmarks found</h3>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Browse the material library and save products you like
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((b) => (
            <div key={b.id} className="glass-card overflow-hidden hover-lift transition">
              <div className="h-32" style={{ background: b.gradient }} />
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#6366f1" }}>{b.category}</span>
                <h3 className="text-sm font-semibold mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{b.name}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{b.brand}</p>
                <p className="text-xs font-medium mt-1.5" style={{ color: "var(--text-secondary)" }}>{b.priceRange}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <button
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition hover:opacity-80"
                    style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                  >
                    <ExternalLink size={11} /> View
                  </button>
                  <button
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition hover:opacity-80"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                  >
                    <ShoppingCart size={11} /> BOM
                  </button>
                  <button
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition hover:opacity-80"
                    style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#d97706" }}
                  >
                    <Package size={11} /> Sample
                  </button>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition hover:opacity-80"
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                  >
                    <Trash2 size={11} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowCreateCollection(false)}>
          <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Create Collection</h3>
              <button onClick={() => setShowCreateCollection(false)}>
                <X size={16} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
            <input
              type="text"
              className="gl-input w-full text-sm mb-4"
              placeholder="Collection name (e.g., Kitchen Materials)"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateCollection(false)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#6366f1" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
