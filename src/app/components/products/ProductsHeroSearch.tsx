import { useEffect, useRef, useState } from "react";
import {
  Search,
  Sparkles,
  QrCode,
  ImagePlus,
  FileText,
  X,
  ArrowRight,
  SlidersHorizontal,
  Camera,
  Lock,
  Leaf,
  Star,
  Tag,
} from "lucide-react";

type Attachment =
  | { kind: "image"; name: string; previewUrl: string }
  | { kind: "pdf"; name: string }
  | { kind: "qr"; payload: string };

const ADV_FILTERS = [
  { id: "verified",    icon: Lock, label: "Verified brands only" },
  { id: "in-stock",    icon: Tag,  label: "In stock near me" },
  { id: "sustainable", icon: Leaf, label: "Sustainable / low-VOC" },
  { id: "top-rated",   icon: Star, label: "Top-rated (4+ stars)" },
];

const SUGGESTIONS = [
  "Marine MR-grade plywood 19mm",
  "Low-VOC interior emulsion",
  "Italian Carrara marble 18×18",
  "Brushed brass cabinet handles",
  "Cement-board for wet areas",
];

interface ProductsHeroSearchProps {
  onSubmit?: (query: string) => void;
}

export function ProductsHeroSearch({ onSubmit }: ProductsHeroSearchProps) {
  const [query, setQuery] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [qrOpen, setQrOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [floating, setFloating] = useState(false);
  const [floatingFocused, setFloatingFocused] = useState(false);

  const imgInput = useRef<HTMLInputElement>(null);
  const pdfInput = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const floatingWrapRef = useRef<HTMLDivElement>(null);

  // Detect when the in-flow hero scrolls out → swap to floating glass version.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFloating(!entry.isIntersecting),
      { rootMargin: "-58px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Click outside the floating bar → deactivate (drop ring, close suggestions).
  useEffect(() => {
    if (!floatingFocused && !showSuggestions) return;
    function onMouseDown(e: MouseEvent) {
      const wrap = floatingWrapRef.current;
      if (wrap && !wrap.contains(e.target as Node)) {
        setFloatingFocused(false);
        setShowSuggestions(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [floatingFocused, showSuggestions]);

  const toggleFilter = (id: string) => {
    const next = new Set(activeFilters);
    next.has(id) ? next.delete(id) : next.add(id);
    setActiveFilters(next);
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachment({ kind: "image", name: file.name, previewUrl: url });
  };

  const handlePdf = (file?: File) => {
    if (!file) return;
    setAttachment({ kind: "pdf", name: file.name });
  };

  const submit = () => {
    onSubmit?.(query);
  };

  const placeholder =
    attachment?.kind === "image" ? "Searching by image — refine with words…"
    : attachment?.kind === "pdf"  ? "Find products like the ones in this PDF…"
    : attachment?.kind === "qr"   ? "Looking up QR target…"
    : "Search products by name, attribute, or paste a spec…";

  // The visible search panel + filter chips, reused for both in-flow and floating.
  const SearchPanel = ({
    glass = false,
    compact = false,
    showChips = true,
    onFocusChange,
    isFocused = false,
  }: {
    glass?: boolean;
    compact?: boolean;
    showChips?: boolean;
    onFocusChange?: (v: boolean) => void;
    isFocused?: boolean;
  }) => (
    <>
      <div
        className={`relative rounded-2xl ${compact ? "p-1.5" : "p-2 md:p-2.5"}`}
        style={{
          background: glass ? "rgba(255,255,255,0.65)" : "var(--glass-strong)",
          backdropFilter: glass ? "blur(20px) saturate(1.4)" : "blur(8px)",
          WebkitBackdropFilter: glass ? "blur(20px) saturate(1.4)" : "blur(8px)",
          border: glass
            ? (isFocused
                ? "1.5px solid var(--accent)"
                : "1px solid rgba(255,255,255,0.55)")
            : "var(--border)",
          boxShadow: glass
            ? (isFocused
                ? "0 16px 50px rgba(255,106,61,0.22), 0 0 0 4px var(--accent-light), inset 0 1px 0 rgba(255,255,255,0.5)"
                : "0 12px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)")
            : "0 14px 48px rgba(0,0,0,0.10)",
          transition: "border-color 0.15s ease, box-shadow 0.18s ease, transform 0.18s ease",
          transform: glass && isFocused ? "translateY(-1px)" : undefined,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex w-9 h-9 flex-shrink-0 rounded-xl items-center justify-center" style={{ background: "var(--accent-light)" }}>
            <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
          </div>

          <div className="flex-1 relative flex items-center gap-2 min-w-0">
            {attachment && <AttachmentChip att={attachment} onRemove={() => setAttachment(null)} />}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { setShowSuggestions(true); onFocusChange?.(true); }}
              onBlur={() => { setTimeout(() => setShowSuggestions(false), 150); onFocusChange?.(false); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={placeholder}
              className={`flex-1 min-w-0 bg-transparent outline-none border-none ${compact ? "text-sm py-1.5" : "text-sm md:text-base py-2"}`}
              style={{ color: "var(--text-primary)", fontWeight: 500 }}
            />
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <ToolButton title="Scan QR code" onClick={() => setQrOpen(true)}>
              <QrCode className="w-4 h-4" />
            </ToolButton>
            <ToolButton title="Attach image — search by photo" onClick={() => imgInput.current?.click()}>
              <ImagePlus className="w-4 h-4" />
            </ToolButton>
            <ToolButton title="Attach PDF — find products from a catalog or spec" onClick={() => pdfInput.current?.click()}>
              <FileText className="w-4 h-4" />
            </ToolButton>

            <input ref={imgInput} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files?.[0] || undefined)} />
            <input ref={pdfInput} type="file" accept="application/pdf" hidden onChange={(e) => handlePdf(e.target.files?.[0] || undefined)} />

            <button
              onClick={submit}
              className="ml-1 h-10 px-4 md:px-5 rounded-xl flex items-center gap-2 transition-all"
              style={{ background: "var(--accent)", color: "white", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ff5a2d")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {showSuggestions && query.length === 0 && (
          <div
            className="absolute left-0 right-0 top-full mt-2 rounded-xl py-2 z-30"
            style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "0 14px 48px rgba(0,0,0,0.12)" }}
          >
            <p className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.1em" }}>
              Trending searches
            </p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onMouseDown={() => { setQuery(s); setShowSuggestions(false); }}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-all"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <Search className="w-3.5 h-3.5 opacity-60" /> {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter chips — bottom of the panel (auto-hides while sticky+idle) */}
      {showChips && (
        <div
          className="overflow-hidden"
          style={{
            maxHeight: 80,
            opacity: 1,
            transition: "max-height 0.22s ease, opacity 0.22s ease, margin-top 0.22s ease",
            marginTop: 12,
          }}
        >
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mr-1" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.1em" }}>
              <SlidersHorizontal className="w-3 h-3" /> Refine
            </span>
            {ADV_FILTERS.map((f) => {
              const Icon = f.icon;
              const active = activeFilters.has(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFilter(f.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-all"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    background: active ? "var(--accent-light)" : (glass ? "rgba(255,255,255,0.55)" : "var(--glass)"),
                    border: active ? "1px solid var(--accent-border)" : (glass ? "1px solid rgba(255,255,255,0.45)" : "var(--border-subtle)"),
                    backdropFilter: glass ? "blur(8px)" : undefined,
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Floating glass version — appears once user scrolls past the hero.
          Filter chips only show when the input is focused, has typed text, or has an attachment.
          Click anywhere outside this wrapper deactivates it. */}
      <div
        ref={floatingWrapRef}
        className="fixed left-0 right-0 z-40 px-4 transition-all duration-300"
        style={{
          top: 58,
          opacity: floating ? 1 : 0,
          transform: floating ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: floating ? "auto" : "none",
        }}
      >
        <div className="max-w-2xl mx-auto py-2">
          <SearchPanel
            glass
            compact
            isFocused={floatingFocused}
            onFocusChange={setFloatingFocused}
            showChips={floatingFocused || query.length > 0 || attachment !== null}
          />
        </div>
      </div>

      {/* In-flow hero — slim, no copy. Bottom border removed so the gradient
          flows continuously into the brand strip that follows. */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-hero)",
        }}
      >
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,61,0.10) 0%, transparent 65%)", transform: "translate(35%,-35%)" }} />
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,106,61,0.08) 0%, transparent 65%)", transform: "translate(-30%,30%)" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <SearchPanel />
        </div>

        {/* Sentinel — when this leaves view, floating bar takes over */}
        <div ref={sentinelRef} className="h-px" />
      </section>

      {/* QR mock modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{ background: "var(--glass-strong)", border: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setQrOpen(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <h3 className="text-base" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Scan a QR</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Point your camera at a product QR or label barcode — we'll match it to the catalog.
            </p>
            <div
              className="rounded-xl flex items-center justify-center mb-4"
              style={{ background: "var(--bg-base)", border: "var(--border-subtle)", aspectRatio: "1", minHeight: 220 }}
            >
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Camera preview will appear here</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setAttachment({ kind: "qr", payload: "MOCK-QR-PAYLOAD-#A1283" }); setQrOpen(false); }}
                className="flex-1 h-10 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ background: "var(--accent)", color: "white", fontWeight: 600, letterSpacing: "0.06em" }}
              >
                Mock scan a code <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setQrOpen(false)}
                className="h-10 px-4 rounded-lg text-xs uppercase tracking-wider"
                style={{ color: "var(--text-secondary)", border: "var(--border-subtle)", fontWeight: 500, letterSpacing: "0.06em" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToolButton({ title, onClick, children }: { title: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center transition-all"
      style={{ color: "var(--text-secondary)", background: "transparent" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
      }}
    >
      {children}
    </button>
  );
}

function AttachmentChip({ att, onRemove }: { att: Attachment; onRemove: () => void }) {
  const Icon = att.kind === "image" ? ImagePlus : att.kind === "pdf" ? FileText : QrCode;
  const label =
    att.kind === "image" ? att.name :
    att.kind === "pdf"   ? att.name :
                            att.payload;

  return (
    <span
      className="inline-flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full text-xs flex-shrink-0 max-w-[200px]"
      style={{
        background: "var(--accent-light)",
        color: "var(--accent)",
        border: "1px solid var(--accent-border)",
        fontWeight: 600,
      }}
    >
      {att.kind === "image" && (
        <img src={(att as { previewUrl: string }).previewUrl} alt="" className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
      )}
      {att.kind !== "image" && <Icon className="w-3.5 h-3.5 ml-1 flex-shrink-0" />}
      <span className="truncate">{label}</span>
      <button onClick={onRemove} className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,106,61,0.18)" }}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
