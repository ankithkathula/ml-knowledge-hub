import { useState } from "react";
import { useParams } from "react-router";
import {
  ArrowLeft, Edit3, Trash2, Eye, Heart, MessageCircle,
  MapPin, Tag, X, Save, Image, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle,
} from "lucide-react";

// --- Mock Data ---

const mockProject = {
  id: "P001",
  title: "Modern Living Room Makeover",
  category: "Interior Design",
  description:
    "Complete transformation of a 450 sq.ft. living room in a 3BHK apartment in Koramangala, Bangalore. The design features a minimalist Scandinavian-Indian fusion aesthetic with warm wood tones, neutral walls, and accent lighting. Sustainable materials were prioritised throughout, including reclaimed teak flooring and VOC-free paints.",
  location: "Koramangala, Bangalore",
  materials: ["Reclaimed Teak Flooring", "Asian Paints Royale Matt", "Philips Hue Lighting", "Godrej Interio Sofa", "Somany Duragres Accent Wall"],
  views: 1284,
  likes: 237,
  comments: 42,
  coverGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
  galleryGradients: [
    "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    "linear-gradient(135deg, #8b5cf6 0%, #c4b5fd 100%)",
    "linear-gradient(135deg, #a78bfa 0%, #ddd6fe 100%)",
    "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    "linear-gradient(135deg, #6366f1 0%, #f0abfc 100%)",
  ],
  createdAt: "15 Jan 2026",
};

// --- Component ---

export function UserPortfolioProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState(mockProject);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description);
  const [editCategory, setEditCategory] = useState(project.category);
  const [editLocation, setEditLocation] = useState(project.location);
  const [editMaterials, setEditMaterials] = useState(project.materials.join(", "));

  function handleSave() {
    setProject((prev) => ({
      ...prev,
      title: editTitle,
      description: editDescription,
      category: editCategory,
      location: editLocation,
      materials: editMaterials.split(",").map((m) => m.trim()).filter(Boolean),
    }));
    setEditMode(false);
  }

  function handleCancelEdit() {
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditCategory(project.category);
    setEditLocation(project.location);
    setEditMaterials(project.materials.join(", "));
    setEditMode(false);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition"
          style={{ color: "#6366f1" }}
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (editMode) handleCancelEdit();
              else setEditMode(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{
              backgroundColor: editMode ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)",
              color: editMode ? "#ef4444" : "#6366f1",
            }}
          >
            {editMode ? <><X size={14} /> Cancel</> : <><Edit3 size={14} /> Edit</>}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Cover Hero */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: project.coverGradient, height: 240 }}
      >
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            {!editMode ? (
              <>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  {project.category}
                </span>
                <h1 className="text-2xl font-bold text-white">{project.title}</h1>
                <p className="text-sm text-white/70 mt-1 flex items-center gap-1">
                  <MapPin size={13} /> {project.location}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-2 w-full max-w-md">
                <input
                  className="gl-input w-full text-sm"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Project title"
                />
                <div className="flex gap-2">
                  <input
                    className="gl-input w-1/2 text-sm"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                  />
                  <input
                    className="gl-input w-1/2 text-sm"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Location"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Eye, label: "Views", value: project.views },
          { icon: Heart, label: "Likes", value: project.likes },
          { icon: MessageCircle, label: "Comments", value: project.comments },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(99,102,241,0.1)" }}
            >
              <s.icon size={18} style={{ color: "#6366f1" }} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value.toLocaleString()}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Gallery */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Image size={18} style={{ color: "#6366f1" }} /> Gallery
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {project.galleryGradients.map((g, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className="rounded-xl overflow-hidden hover-lift transition aspect-[4/3]"
              style={{ background: g }}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Description
        </h2>
        {editMode ? (
          <textarea
            className="gl-input w-full h-32 resize-none text-sm"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>
        )}
      </div>

      {/* Materials Used */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Tag size={16} style={{ color: "#6366f1" }} /> Materials Used
        </h2>
        {editMode ? (
          <div>
            <textarea
              className="gl-input w-full h-20 resize-none text-sm"
              value={editMaterials}
              onChange={(e) => setEditMaterials(e.target.value)}
              placeholder="Comma-separated list of materials"
            />
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Separate materials with commas</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.materials.map((m) => (
              <span
                key={m}
                className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition"
                style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Save button in edit mode */}
      {editMode && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#6366f1" }}
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      )}

      {/* Gallery Lightbox */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setGalleryIndex(null)}>
          <div className="relative w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div
              className="rounded-2xl aspect-video"
              style={{ background: project.galleryGradients[galleryIndex] }}
            />
            <button
              onClick={() => setGalleryIndex(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
            >
              <X size={16} />
            </button>
            <button
              onClick={() => setGalleryIndex((galleryIndex - 1 + project.galleryGradients.length) % project.galleryGradients.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setGalleryIndex((galleryIndex + 1) % project.galleryGradients.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                <AlertTriangle size={20} style={{ color: "#ef4444" }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Delete Project?</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); window.history.back(); }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#ef4444" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
