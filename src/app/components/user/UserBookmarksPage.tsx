import { useState } from "react";
import {
  Search, Bookmark, Trash2, ExternalLink, Plus, X,
  ShoppingCart, Package, SortAsc, FolderPlus,
  Pin, Layers, ArrowLeft,
} from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

interface BookmarkedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  priceRange: string;
  gradient: string;
  collection: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  itemIds: string[];
  createdAt: string;
}

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

const INITIAL_BOARDS: Board[] = [
  { id: "B1", name: "Living Room Renovation", description: "Material palette for client project in Koramangala", itemIds: ["BK001", "BK005", "BK002", "BK006"], createdAt: "May 10, 2026" },
  { id: "B2", name: "Thesis — Sustainable Materials", description: "Final year thesis material research", itemIds: ["BK003", "BK007", "BK008"], createdAt: "May 1, 2026" },
  { id: "B3", name: "Kitchen Inspiration", description: "", itemIds: ["BK005", "BK001"], createdAt: "Apr 22, 2026" },
];

const collectionTabs = ["All", "Flooring", "Lighting", "Paints", "Structural"];

export function UserBookmarksPage() {
  const [bookmarks, setBookmarks] = useState(mockBookmarks);
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS);

  // Saved Items state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "brand">("name");
  const [collections, setCollections] = useState(collectionTabs);

  // Page view
  const [view, setView] = useState<"items" | "boards">("items");
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  // Modals
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDesc, setNewBoardDesc] = useState("");
  const [pinModalItemId, setPinModalItemId] = useState<string | null>(null);
  const [pinSelections, setPinSelections] = useState<string[]>([]);

  const filtered = bookmarks
    .filter((b) => {
      const matchesTab = activeTab === "All" || b.collection === activeTab;
      const matchesSearch = !searchQuery ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : a.brand.localeCompare(b.brand));

  function removeBookmark(id: string) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    setBoards((prev) => prev.map((board) => ({ ...board, itemIds: board.itemIds.filter((iid) => iid !== id) })));
  }

  function handleCreateCollection() {
    if (newCollectionName.trim() && !collections.includes(newCollectionName.trim())) {
      setCollections([...collections, newCollectionName.trim()]);
      setNewCollectionName("");
      setShowCreateCollection(false);
    }
  }

  function handleCreateBoard() {
    if (!newBoardName.trim()) return;
    const board: Board = {
      id: `B${Date.now()}`,
      name: newBoardName.trim(),
      description: newBoardDesc.trim(),
      itemIds: [],
      createdAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    };
    setBoards((prev) => [board, ...prev]);
    setNewBoardName("");
    setNewBoardDesc("");
    setShowCreateBoard(false);
  }

  function openPinModal(itemId: string) {
    setPinSelections(boards.filter((b) => b.itemIds.includes(itemId)).map((b) => b.id));
    setPinModalItemId(itemId);
  }

  function savePinSelections() {
    if (!pinModalItemId) return;
    setBoards((prev) =>
      prev.map((board) => {
        const selected = pinSelections.includes(board.id);
        const alreadyIn = board.itemIds.includes(pinModalItemId);
        if (selected && !alreadyIn) return { ...board, itemIds: [...board.itemIds, pinModalItemId] };
        if (!selected && alreadyIn) return { ...board, itemIds: board.itemIds.filter((id) => id !== pinModalItemId) };
        return board;
      })
    );
    setPinModalItemId(null);
  }

  function removeFromBoard(boardId: string, itemId: string) {
    setBoards((prev) => prev.map((b) => b.id === boardId ? { ...b, itemIds: b.itemIds.filter((id) => id !== itemId) } : b));
  }

  function deleteBoard(boardId: string) {
    setBoards((prev) => prev.filter((b) => b.id !== boardId));
    if (selectedBoardId === boardId) setSelectedBoardId(null);
  }

  function getBoardItems(board: Board): BookmarkedProduct[] {
    return board.itemIds.map((id) => bookmarks.find((b) => b.id === id)).filter(Boolean) as BookmarkedProduct[];
  }

  function itemPinCount(itemId: string) {
    return boards.filter((b) => b.itemIds.includes(itemId)).length;
  }

  const selectedBoard = boards.find((b) => b.id === selectedBoardId) ?? null;
  const selectedBoardItems = selectedBoard ? getBoardItems(selectedBoard) : [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {selectedBoard ? (
            <>
              <button
                onClick={() => setSelectedBoardId(null)}
                className="flex items-center gap-1.5 text-xs font-medium mb-2"
                style={{ color: ACCENT }}
              >
                <ArrowLeft size={13} /> My Boards
              </button>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{selectedBoard.name}</h1>
              {selectedBoard.description && (
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{selectedBoard.description}</p>
              )}
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {selectedBoardItems.length} item{selectedBoardItems.length !== 1 ? "s" : ""} · Created {selectedBoard.createdAt}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>My Wishlist</h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                {bookmarks.length} saved items · {boards.length} board{boards.length !== 1 ? "s" : ""}
              </p>
            </>
          )}
        </div>

        {!selectedBoard && view === "items" && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                className="gl-input pl-9 w-56 text-sm"
                placeholder="Search saved items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setSortBy(sortBy === "name" ? "brand" : "name")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
              style={{ backgroundColor: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
            >
              <SortAsc size={14} /> {sortBy === "name" ? "Name" : "Brand"}
            </button>
          </div>
        )}

        {!selectedBoard && view === "boards" && (
          <button
            onClick={() => setShowCreateBoard(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: ACCENT }}
          >
            <Plus size={14} /> New Board
          </button>
        )}
      </div>

      {/* View Toggle */}
      {!selectedBoard && (
        <div
          className="flex items-center gap-1 p-1 rounded-xl w-fit"
          style={{ background: `rgba(${ACCENT_RGB},0.06)` }}
        >
          {(["items", "boards"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: view === v ? "white" : "transparent",
                color: view === v ? ACCENT : "var(--text-muted)",
                boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {v === "items" ? <Bookmark size={13} /> : <Layers size={13} />}
              {v === "items" ? "Saved Items" : "My Boards"}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background: view === v ? `rgba(${ACCENT_RGB},0.1)` : "rgba(0,0,0,0.06)",
                  color: view === v ? ACCENT : "var(--text-muted)",
                }}
              >
                {v === "items" ? bookmarks.length : boards.length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ---- SAVED ITEMS VIEW ---- */}
      {view === "items" && !selectedBoard && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            {collections.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition"
                style={{
                  backgroundColor: activeTab === tab ? ACCENT : `rgba(${ACCENT_RGB},0.08)`,
                  color: activeTab === tab ? "#fff" : ACCENT,
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

          {filtered.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Bookmark size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>No bookmarks found</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Browse the material library and save products you like</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((b) => {
                const pinCount = itemPinCount(b.id);
                return (
                  <div key={b.id} className="glass-card overflow-hidden hover-lift transition">
                    <div className="h-32 relative" style={{ background: b.gradient }}>
                      {pinCount > 0 && (
                        <div
                          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ background: "rgba(0,0,0,0.42)" }}
                        >
                          <Pin size={9} /> {pinCount} board{pinCount !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: ACCENT }}>{b.category}</span>
                      <h3 className="text-sm font-semibold mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{b.name}</h3>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{b.brand}</p>
                      <p className="text-xs font-medium mt-1.5" style={{ color: "var(--text-secondary)" }}>{b.priceRange}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <button
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                          style={{ backgroundColor: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                        >
                          <ExternalLink size={11} /> View
                        </button>
                        <button
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                          style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                        >
                          <ShoppingCart size={11} /> BOM
                        </button>
                        <button
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                          style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#d97706" }}
                        >
                          <Package size={11} /> Sample
                        </button>
                        <button
                          onClick={() => openPinModal(b.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                          style={{ backgroundColor: "rgba(168,85,247,0.1)", color: "#9333ea" }}
                        >
                          <Pin size={11} /> Pin
                        </button>
                        <button
                          onClick={() => removeBookmark(b.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                          style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                        >
                          <Trash2 size={11} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ---- MY BOARDS VIEW ---- */}
      {view === "boards" && !selectedBoard && (
        <>
          {boards.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Layers size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>No boards yet</h3>
              <p className="text-xs mt-1 mb-4" style={{ color: "var(--text-muted)" }}>Create a board to organise saved items for your projects</p>
              <button
                onClick={() => setShowCreateBoard(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Create your first board
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {boards.map((board) => {
                const items = getBoardItems(board);
                return (
                  <div
                    key={board.id}
                    className="glass-card overflow-hidden hover-lift transition cursor-pointer"
                    onClick={() => setSelectedBoardId(board.id)}
                  >
                    {/* 2×2 mosaic cover */}
                    <div className="grid grid-cols-2 h-40">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{ background: items[i]?.gradient ?? "rgba(0,0,0,0.04)" }}
                        />
                      ))}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{board.name}</h3>
                          {board.description && (
                            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>{board.description}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteBoard(board.id); }}
                          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs font-semibold" style={{ color: ACCENT }}>
                          {items.length} item{items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Created {board.createdAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* New board card */}
              <button
                onClick={() => setShowCreateBoard(true)}
                className="glass-card overflow-hidden border-2 border-dashed flex flex-col items-center justify-center transition hover:opacity-80"
                style={{ borderColor: `rgba(${ACCENT_RGB},0.25)`, minHeight: "13.5rem" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                >
                  <Plus size={20} style={{ color: ACCENT }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: ACCENT }}>New Board</span>
                <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Group items by project or theme</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* ---- BOARD DETAIL VIEW ---- */}
      {selectedBoard && (
        <>
          {selectedBoardItems.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Pin size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>No items pinned yet</h3>
              <p className="text-xs mt-1 mb-4" style={{ color: "var(--text-muted)" }}>
                Go to Saved Items and hit "Pin" to add materials to this board
              </p>
              <button
                onClick={() => { setSelectedBoardId(null); setView("items"); }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Browse Saved Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedBoardItems.map((b) => (
                <div key={b.id} className="glass-card overflow-hidden hover-lift transition">
                  <div className="h-32" style={{ background: b.gradient }} />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: ACCENT }}>{b.category}</span>
                    <h3 className="text-sm font-semibold mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{b.name}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{b.brand}</p>
                    <p className="text-xs font-medium mt-1.5" style={{ color: "var(--text-secondary)" }}>{b.priceRange}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <button
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                        style={{ backgroundColor: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                      >
                        <ExternalLink size={11} /> View
                      </button>
                      <button
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                        style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                      >
                        <ShoppingCart size={11} /> BOM
                      </button>
                      <button
                        onClick={() => removeFromBoard(selectedBoard.id, b.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:opacity-80"
                        style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                      >
                        <X size={11} /> Unpin
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ---- MODALS ---- */}

      {/* Create Collection */}
      {showCreateCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowCreateCollection(false)}>
          <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Create Collection</h3>
              <button onClick={() => setShowCreateCollection(false)}><X size={16} style={{ color: "var(--text-muted)" }} /></button>
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
              <button onClick={() => setShowCreateCollection(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--text-secondary)" }}>Cancel</button>
              <button onClick={handleCreateCollection} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: ACCENT }}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Board */}
      {showCreateBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowCreateBoard(false)}>
          <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Create Board</h3>
              <button onClick={() => setShowCreateBoard(false)}><X size={16} style={{ color: "var(--text-muted)" }} /></button>
            </div>
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Board name *</label>
                <input
                  type="text"
                  className="gl-input w-full text-sm"
                  placeholder="e.g., Living Room Project"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Description <span style={{ color: "var(--text-muted)" }}>(optional)</span>
                </label>
                <input
                  type="text"
                  className="gl-input w-full text-sm"
                  placeholder="What's this board for?"
                  value={newBoardDesc}
                  onChange={(e) => setNewBoardDesc(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateBoard()}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateBoard(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--text-secondary)" }}>Cancel</button>
              <button
                onClick={handleCreateBoard}
                disabled={!newBoardName.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                style={{ backgroundColor: ACCENT }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pin to Board */}
      {pinModalItemId && (() => {
        const item = bookmarks.find((b) => b.id === pinModalItemId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPinModalItemId(null)}>
            <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Pin to Boards</h3>
                <button onClick={() => setPinModalItemId(null)}><X size={16} style={{ color: "var(--text-muted)" }} /></button>
              </div>
              <p className="text-xs mb-4 line-clamp-1" style={{ color: "var(--text-muted)" }}>"{item.name}"</p>

              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {boards.map((board) => {
                  const checked = pinSelections.includes(board.id);
                  const boardItems = getBoardItems(board);
                  return (
                    <label
                      key={board.id}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition"
                      style={{
                        background: checked ? `rgba(${ACCENT_RGB},0.07)` : "rgba(0,0,0,0.02)",
                        border: `1px solid ${checked ? `rgba(${ACCENT_RGB},0.2)` : "transparent"}`,
                      }}
                    >
                      <div className="grid grid-cols-2 w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} style={{ background: boardItems[i]?.gradient ?? "rgba(0,0,0,0.06)" }} />
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{board.name}</div>
                        <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {boardItems.length} item{boardItems.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: ACCENT }}
                        onChange={() => {
                          setPinSelections((prev) =>
                            prev.includes(board.id) ? prev.filter((id) => id !== board.id) : [...prev, board.id]
                          );
                        }}
                      />
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <button
                  onClick={() => { setPinModalItemId(null); setShowCreateBoard(true); }}
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: ACCENT }}
                >
                  <Plus size={13} /> New board
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setPinModalItemId(null)} className="px-3 py-1.5 rounded-lg text-xs" style={{ color: "var(--text-secondary)" }}>Cancel</button>
                  <button
                    onClick={savePinSelections}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
