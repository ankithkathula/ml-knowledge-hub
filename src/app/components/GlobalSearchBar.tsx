import { useState, useRef, useEffect } from "react";
import {
  Search, Sparkles, QrCode, ImagePlus, FileText, X,
  ArrowRight, Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";

type Attachment =
  | { kind: "image"; name: string; previewUrl: string }
  | { kind: "pdf"; name: string }
  | { kind: "qr"; payload: string };


type PageContext = {
  suggestions: string[];
  placeholder: string;
  label: string;
};

const PAGE_CONTEXTS: { match: (p: string) => boolean; ctx: PageContext }[] = [
  {
    match: (p) => p === "/" || p === "/v1",
    ctx: {
      label: "Popular on Material Library",
      placeholder: "Search materials, brands, professionals…",
      suggestions: [
        "Marine MR-grade plywood",
        "Asian Paints interior emulsion",
        "Italian Carrara marble",
        "UltraTech Cement OPC 53",
        "Brushed brass cabinet handles",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/events"),
    ctx: {
      label: "Upcoming events",
      placeholder: "Search events, workshops, webinars…",
      suggestions: [
        "Sustainable Materials Summit",
        "BIM for Architects webinar",
        "Asian Paints Earth Series launch",
        "Designer Meet Bangalore",
        "Composite Cladding Workshop",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/feed"),
    ctx: {
      label: "Trending on Feed",
      placeholder: "Search posts, projects, designers…",
      suggestions: [
        "Serenity Villa",
        "Tropical Home Design",
        "Luxury Villa interiors",
        "Contemporary Residential",
        "Heritage Restoration",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/blog"),
    ctx: {
      label: "Popular articles",
      placeholder: "Search articles, topics…",
      suggestions: [
        "Ready-Mix Concrete quality",
        "Self-compacting concrete",
        "Sustainable green concrete",
        "Precast installation guide",
        "High-rise building materials",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/jobs"),
    ctx: {
      label: "Popular searches",
      placeholder: "Search jobs, roles, companies…",
      suggestions: [
        "Senior Architect",
        "BIM Coordinator",
        "Interior Designer",
        "MEP Design Engineer",
        "3D Visualizer",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/courses"),
    ctx: {
      label: "Popular courses",
      placeholder: "Search courses, topics, instructors…",
      suggestions: [
        "Material Selection Masterclass",
        "Revit for Indian Practice",
        "Sustainable Design Tropical",
        "Kitchen & Bathroom Design",
        "Site Management Essentials",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/professionals") || p.startsWith("/designer") || p.startsWith("/services/professional"),
    ctx: {
      label: "Popular searches",
      placeholder: "Search designers, architects, engineers…",
      suggestions: [
        "Principal Architect",
        "Interior Designer",
        "Structural Engineer",
        "Landscape Architect",
        "Sustainable design expert",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/brand") || p.startsWith("/brands"),
    ctx: {
      label: "Popular brands",
      placeholder: "Search brands, manufacturers…",
      suggestions: [
        "UltraTech Cement",
        "ACC Cement",
        "Asian Paints",
        "Fosroc Chemicals",
        "Sika India",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/kc"),
    ctx: {
      label: "Knowledge centres",
      placeholder: "Search centres, cities, locations…",
      suggestions: [
        "Bengaluru Indiranagar",
        "Mumbai Andheri",
        "Hyderabad Banjara Hills",
        "Noida Sector 18",
        "Material selection demo",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/services"),
    ctx: {
      label: "Popular services",
      placeholder: "Search services, specialisations…",
      suggestions: [
        "Ready-Mix Concrete",
        "Waterproofing solutions",
        "Precast concrete elements",
        "Concrete admixtures",
        "Superplasticizers",
      ],
    },
  },
  {
    match: (p) => p.startsWith("/studio") || p.startsWith("/u/") || p.startsWith("/d/") || p.startsWith("/f/") || p.startsWith("/admin") || p.startsWith("/institute"),
    ctx: {
      label: "Quick searches",
      placeholder: "Search materials, brands, products…",
      suggestions: [
        "Marine MR-grade plywood 19mm",
        "Low-VOC interior emulsion",
        "Italian Carrara marble 18×18",
        "Brushed brass cabinet handles",
        "Cement-board for wet areas",
      ],
    },
  },
];

const DEFAULT_CTX: PageContext = {
  label: "Trending searches",
  placeholder: "Search products by name, attribute, or paste a spec…",
  suggestions: [
    "Marine MR-grade plywood 19mm",
    "Low-VOC interior emulsion",
    "Italian Carrara marble 18×18",
    "Brushed brass cabinet handles",
    "Cement-board for wet areas",
  ],
};

function getPageContext(pathname: string): PageContext {
  return PAGE_CONTEXTS.find((r) => r.match(pathname))?.ctx ?? DEFAULT_CTX;
}

interface GlobalSearchBarProps {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearchBar({ open, onClose }: GlobalSearchBarProps) {
  const [query, setQuery] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);
  const pdfInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ctx = getPageContext(pathname);

  useEffect(() => {
    if (open) {
      setTimeout(() => { inputRef.current?.focus(); setShowSuggestions(true); }, 60);
    } else {
      setQuery("");
      setAttachment(null);
      setShowSuggestions(false);
      setIsFocused(false);
      setQrOpen(false);
    }
  }, [open]);

  const handleImage = (file?: File) => {
    if (!file) return;
    setAttachment({ kind: "image", name: file.name, previewUrl: URL.createObjectURL(file) });
  };

  const handlePdf = (file?: File) => {
    if (!file) return;
    setAttachment({ kind: "pdf", name: file.name });
  };

  const submit = () => {
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const placeholder =
    attachment?.kind === "image" ? "Searching by image — refine with words…"
    : attachment?.kind === "pdf"  ? "Find products like the ones in this PDF…"
    : attachment?.kind === "qr"   ? "Looking up QR target…"
    : ctx.placeholder;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 right-0 z-40 px-4"
            style={{ top: 58 }}
          >
            <div className="max-w-2xl mx-auto py-2">
              {/* Glass search panel — matches ProductsHeroSearch floating style */}
              <div
                className="relative rounded-2xl p-1.5"
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  border: isFocused ? "1.5px solid var(--accent)" : "1px solid rgba(255,255,255,0.55)",
                  boxShadow: isFocused
                    ? "0 16px 50px rgba(255,106,61,0.22), 0 0 0 4px var(--accent-light), inset 0 1px 0 rgba(255,255,255,0.5)"
                    : "0 12px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
                  transition: "border-color 0.15s ease, box-shadow 0.18s ease, transform 0.18s ease",
                  transform: isFocused ? "translateY(-1px)" : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex w-9 h-9 flex-shrink-0 rounded-xl items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  </div>

                  <div className="flex-1 relative flex items-center gap-2 min-w-0">
                    {attachment && <AttachmentChip att={attachment} onRemove={() => setAttachment(null)} />}
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => { setShowSuggestions(true); setIsFocused(true); }}
                      onBlur={() => { setTimeout(() => setShowSuggestions(false), 150); setIsFocused(false); }}
                      onKeyDown={(e) => e.key === "Enter" && submit()}
                      placeholder={placeholder}
                      className="flex-1 min-w-0 bg-transparent outline-none border-none text-sm py-2"
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    />
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <ToolButton title="Scan QR code" onClick={() => setQrOpen(true)}>
                      <QrCode className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Attach image" onClick={() => imgInput.current?.click()}>
                      <ImagePlus className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Attach PDF" onClick={() => pdfInput.current?.click()}>
                      <FileText className="w-4 h-4" />
                    </ToolButton>

                    <input ref={imgInput} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files?.[0])} />
                    <input ref={pdfInput} type="file" accept="application/pdf" hidden onChange={(e) => handlePdf(e.target.files?.[0])} />

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
                      {ctx.label}
                    </p>
                    {ctx.suggestions.map((s) => (
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-light)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
    >
      {children}
    </button>
  );
}

function AttachmentChip({ att, onRemove }: { att: Attachment; onRemove: () => void }) {
  const Icon = att.kind === "image" ? ImagePlus : att.kind === "pdf" ? FileText : QrCode;
  const label = att.kind === "image" ? att.name : att.kind === "pdf" ? att.name : att.payload;
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full text-xs flex-shrink-0 max-w-[200px]"
      style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent-border)", fontWeight: 600 }}
    >
      {att.kind === "image" && <img src={(att as { previewUrl: string }).previewUrl} alt="" className="w-5 h-5 rounded-full object-cover flex-shrink-0" />}
      {att.kind !== "image" && <Icon className="w-3.5 h-3.5 ml-1 flex-shrink-0" />}
      <span className="truncate">{label}</span>
      <button onClick={onRemove} className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,106,61,0.18)" }}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
