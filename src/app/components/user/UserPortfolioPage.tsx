import { useState } from "react";
import {
  Plus, Share2, Eye, Heart, Edit3, Trash2, EyeOff, Filter,
  ArrowUpDown, X, Upload, Globe, Lock, ChevronDown, Image as ImageIcon
} from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

/* ── Mock Data ──────────────────────────────────────────────────────── */

type Project = {
  id: number;
  title: string;
  category: string;
  date: string;
  views: number;
  likes: number;
  isPublic: boolean;
  gradient: string;
  description: string;
  location: string;
};

const CATEGORIES = ["All", "Residential", "Commercial", "Institutional", "Hospitality", "Landscape", "Interior"];

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Rajwada Heritage Residence",
    category: "Residential",
    date: "Mar 2026",
    views: 320,
    likes: 48,
    isPublic: true,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description: "A modern interpretation of traditional Rajasthani architecture featuring sandstone facades and jali screens.",
    location: "Jaipur, Rajasthan",
  },
  {
    id: 2,
    title: "Banyan Tree Co-working Hub",
    category: "Commercial",
    date: "Feb 2026",
    views: 215,
    likes: 32,
    isPublic: true,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description: "Biophilic co-working space with exposed brick walls, living green walls, and terracotta flooring.",
    location: "Pune, Maharashtra",
  },
  {
    id: 3,
    title: "Lotus Temple Community Center",
    category: "Institutional",
    date: "Jan 2026",
    views: 180,
    likes: 27,
    isPublic: true,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    description: "Community center inspired by lotus petal geometry with sustainable bamboo and compressed earth blocks.",
    location: "Bhopal, Madhya Pradesh",
  },
  {
    id: 4,
    title: "Spice Route Boutique Hotel",
    category: "Hospitality",
    date: "Dec 2025",
    views: 410,
    likes: 65,
    isPublic: true,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    description: "Boutique hotel blending Kerala architecture with contemporary luxury. Features laterite stone and teak wood.",
    location: "Fort Kochi, Kerala",
  },
  {
    id: 5,
    title: "Urban Terrace Garden Design",
    category: "Landscape",
    date: "Nov 2025",
    views: 145,
    likes: 19,
    isPublic: false,
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    description: "Rooftop terrace garden with native drought-resistant plants, rainwater harvesting, and recycled material planters.",
    location: "Hyderabad, Telangana",
  },
];

/* ── Main Component ────────────────────────────────────────────────── */

export function UserPortfolioPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "views" | "likes">("date");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filtered = projects
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "likes") return b.likes - a.likes;
      return 0;
    });

  const totalViews = projects.reduce((s, p) => s + p.views, 0);
  const totalLikes = projects.reduce((s, p) => s + p.likes, 0);
  const publicCount = projects.filter((p) => p.isPublic).length;

  const toggleVisibility = (id: number) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p)));
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          My Portfolio
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setEditingProject(null); setShowAddModal(true); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all text-white"
            style={{ background: ACCENT, boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)` }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
          >
            <Share2 className="w-3.5 h-3.5" /> Share Portfolio
          </button>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Projects", value: projects.length, color: ACCENT },
          { label: "Public", value: publicCount, color: "#10b981" },
          { label: "Total Views", value: totalViews.toLocaleString(), color: "#3b82f6" },
          { label: "Total Likes", value: totalLikes, color: "#ec4899" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-muted)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filter / Sort ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: selectedCategory === cat ? `rgba(${ACCENT_RGB},0.12)` : "rgba(0,0,0,0.04)",
                color: selectedCategory === cat ? ACCENT : "var(--text-secondary)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          {(["date", "views", "likes"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize"
              style={{
                background: sortBy === s ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
                color: sortBy === s ? ACCENT : "var(--text-muted)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Portfolio Grid ────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        /* Empty State */
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
          >
            <ImageIcon className="w-10 h-10" style={{ color: `rgba(${ACCENT_RGB},0.4)` }} />
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
            Showcase your work
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: 400, margin: "0 auto 16px" }}>
            Add your best projects to build a professional portfolio and attract opportunities.
          </p>
          <button
            onClick={() => { setEditingProject(null); setShowAddModal(true); }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: ACCENT, boxShadow: `0 4px 14px rgba(${ACCENT_RGB},0.35)` }}
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden group transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {/* Cover Image */}
              <div className="relative h-44" style={{ background: project.gradient }}>
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: project.isPublic ? "rgba(16,185,129,0.9)" : "rgba(0,0,0,0.5)",
                      color: "white",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {project.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {project.isPublic ? "Public" : "Draft"}
                  </span>
                </div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <button
                    onClick={() => { setEditingProject(project); setShowAddModal(true); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(project.id)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                  >
                    {project.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    style={{ background: "rgba(239,68,68,0.6)", backdropFilter: "blur(8px)" }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {project.title}
                  </h4>
                </div>
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-xs font-medium mb-2"
                  style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                >
                  {project.category}
                </span>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }} className="line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{project.date} &middot; {project.location}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <Eye className="w-3 h-3" /> {project.views}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      <Heart className="w-3 h-3" /> {project.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add/Edit Project Modal ────────────────────────────────── */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6"
            style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Cover Image */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Cover Image</label>
                <div
                  className="mt-1.5 h-36 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                  style={{ background: "rgba(0,0,0,0.03)", border: "2px dashed rgba(0,0,0,0.12)" }}
                >
                  <Upload className="w-6 h-6" style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Click to upload cover image</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Project Title</label>
                <input
                  className="gl-input w-full mt-1.5"
                  placeholder="e.g. Modern Villa Design"
                  defaultValue={editingProject?.title || ""}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Description</label>
                <textarea
                  className="gl-input w-full mt-1.5"
                  rows={3}
                  placeholder="Describe your project..."
                  defaultValue={editingProject?.description || ""}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Category</label>
                <div className="relative mt-1.5">
                  <select
                    className="gl-input w-full appearance-none pr-8"
                    defaultValue={editingProject?.category || ""}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>

              {/* Images Gallery */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Project Images</label>
                <div
                  className="mt-1.5 h-20 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                  style={{ background: "rgba(0,0,0,0.03)", border: "2px dashed rgba(0,0,0,0.12)" }}
                >
                  <Plus className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Add more images</span>
                </div>
              </div>

              {/* Materials Used */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Materials Used</label>
                <input
                  className="gl-input w-full mt-1.5"
                  placeholder="Type to search materials..."
                />
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {["Sandstone", "Teak Wood", "Terracotta"].map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
                    >
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Location</label>
                <input
                  className="gl-input w-full mt-1.5"
                  placeholder="e.g. Jaipur, Rajasthan"
                  defaultValue={editingProject?.location || ""}
                />
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.03)" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Visibility</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    Public projects appear on your portfolio
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)" }}>Draft</span>
                  <div
                    className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
                    style={{ background: editingProject?.isPublic !== false ? ACCENT : "rgba(0,0,0,0.15)" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all"
                      style={{ left: editingProject?.isPublic !== false ? 22 : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)" }}>Public</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all text-white"
                  style={{ background: ACCENT }}
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
