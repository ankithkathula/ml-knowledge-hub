import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  FolderKanban,
  Plus,
  LayoutGrid,
  List,
  MapPin,
  IndianRupee,
  Clock,
  Eye,
  Pencil,
  Trash2,
  X,
  Upload,
  Tag,
  Filter,
  FolderOpen,
  CheckCircle2,
  FileEdit,
  Sparkles,
} from "lucide-react";
import { MANAGED_PROJECTS, type ManagedProject } from "../data/consultantData";

type StatusFilter = "All" | "Active" | "Completed" | "Draft";
type ViewMode = "grid" | "list";

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  Active: { bg: "rgba(34,197,94,0.10)", text: "#16a34a", dot: "#22c55e" },
  Completed: { bg: "rgba(59,130,246,0.10)", text: "#2563eb", dot: "#3b82f6" },
  Draft: { bg: "rgba(156,163,175,0.10)", text: "#6b7280", dot: "#9ca3af" },
};

const CATEGORY_OPTIONS = [
  "Structural Design",
  "Interior Design",
  "Green Building",
  "BIM Consultancy",
  "Landscape Design",
  "Conservation",
  "MEP Design",
  "Architecture",
  "Project Management",
  "Fire Safety",
];

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  area: string;
  budget: string;
  duration: string;
  status: "Active" | "Completed" | "Draft";
  tags: string;
}

const EMPTY_FORM: ProjectFormData = {
  title: "",
  description: "",
  category: CATEGORY_OPTIONS[0],
  location: "",
  area: "",
  budget: "",
  duration: "",
  status: "Draft",
  tags: "",
};

export function StudioProjectsManagePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ManagedProject[]>(MANAGED_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = projects;
    if (statusFilter !== "All") {
      list = list.filter((p) => p.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [projects, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((p) => p.status === "Active").length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const draft = projects.filter((p) => p.status === "Draft").length;
    return { total, active, completed, draft };
  }, [projects]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEditModal = (project: ManagedProject) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      location: project.location,
      area: project.area,
      budget: project.budget,
      duration: project.duration,
      status: project.status,
      tags: project.tags.join(", "),
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...formData,
                tags: formData.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
                lastUpdated: "Just now",
              }
            : p
        )
      );
    } else {
      const newProject: ManagedProject = {
        id: `mp-new-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        area: formData.area,
        budget: formData.budget,
        duration: formData.duration,
        status: formData.status,
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        lastUpdated: "Just now",
        views: 0,
      };
      setProjects((prev) => [newProject, ...prev]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
  };

  const statusFilters: StatusFilter[] = ["All", "Active", "Completed", "Draft"];

  const statCards = [
    { label: "Total Projects", value: stats.total, icon: FolderKanban, color: "var(--accent)" },
    { label: "Active", value: stats.active, icon: CheckCircle2, color: "#22c55e" },
    { label: "Completed", value: stats.completed, icon: FolderOpen, color: "#3b82f6" },
    { label: "Draft", value: stats.draft, icon: FileEdit, color: "#9ca3af" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-orange-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--accent-light)" }}
                >
                  <FolderKanban className="w-5 h-5" style={{ color: "var(--accent)" }} />
                </div>
                <h1
                  className="text-3xl"
                  style={{ fontWeight: 800, color: "var(--text-primary)" }}
                >
                  My Projects
                </h1>
              </div>
              <p className="text-sm ml-[52px]" style={{ color: "var(--text-secondary)" }}>
                Manage your project portfolio and showcase your work
              </p>
            </div>
            <button className="btn-primary" onClick={openAddModal}>
              <Plus className="w-4 h-4" />
              Add New Project
            </button>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex-1 min-w-[280px] max-w-lg">
              <div className="glass-card rounded-2xl !p-1.5">
                <div className="flex items-center gap-3 px-4">
                  <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              {statusFilters.map((sf) => (
                <button
                  key={sf}
                  className="pill"
                  style={
                    statusFilter === sf
                      ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                      : {}
                  }
                  onClick={() => setStatusFilter(sf)}
                >
                  {sf}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 glass-card !p-1 !rounded-lg">
              <button
                className="p-1.5 rounded-md"
                style={{
                  background: viewMode === "grid" ? "var(--accent)" : "transparent",
                  color: viewMode === "grid" ? "#fff" : "var(--text-muted)",
                }}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-md"
                style={{
                  background: viewMode === "list" ? "var(--accent)" : "transparent",
                  color: viewMode === "list" ? "#fff" : "var(--text-muted)",
                }}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="stat-card flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}15` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        {filtered.length === 0 ? (
          /* Empty State */
          <div className="glass-card text-center py-16">
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "var(--accent-light)" }}
            >
              <FolderKanban className="w-10 h-10" style={{ color: "var(--accent)" }} />
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {projects.length === 0 ? "No projects yet" : "No matching projects"}
            </h3>
            <p
              className="text-sm max-w-md mx-auto mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {projects.length === 0
                ? "Start building your portfolio by adding your first project. Showcase your work to attract new clients."
                : "Try adjusting your search or filter to find your projects."}
            </p>
            {projects.length === 0 && (
              <button className="btn-primary" onClick={openAddModal}>
                <Plus className="w-4 h-4" />
                Add Your First Project
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="glass-card hover-lift !p-0 overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/studio/projects/${project.id}`)}
              >
                <div className="relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-44 object-cover"
                  />
                  <span
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: STATUS_STYLE[project.status]?.bg,
                      color: STATUS_STYLE[project.status]?.text,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: STATUS_STYLE[project.status]?.dot }}
                    />
                    {project.status}
                  </span>
                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.9)" }}
                      onClick={(e) => { e.stopPropagation(); openEditModal(project); }}
                    >
                      <Pencil className="w-3.5 h-3.5" style={{ color: "var(--text-secondary)" }} />
                    </button>
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.9)" }}
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(project.id); }}
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="text-sm font-bold line-clamp-2 leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {project.budget}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ color: "var(--text-muted)" }}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-center justify-between mt-3 pt-3"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <Clock className="w-3 h-3" />
                      {project.lastUpdated}
                    </span>
                    <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <Eye className="w-3 h-3" />
                      {project.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="glass-card hover-lift !p-0 overflow-hidden flex group cursor-pointer"
                onClick={() => navigate(`/studio/projects/${project.id}`)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-48 h-full object-cover flex-shrink-0"
                />
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: STATUS_STYLE[project.status]?.bg,
                            color: STATUS_STYLE[project.status]?.text,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: STATUS_STYLE[project.status]?.dot }}
                          />
                          {project.status}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {project.category}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-xs mt-1 line-clamp-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-1.5 ml-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--accent-light)" }}
                        onClick={(e) => { e.stopPropagation(); openEditModal(project); }}
                      >
                        <Pencil className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                      </button>
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(239,68,68,0.10)" }}
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(project.id); }}
                      >
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <IndianRupee className="w-3 h-3" />
                      {project.budget}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {project.area} sqft
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <Eye className="w-3 h-3" />
                      {project.views}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                      <Clock className="w-3 h-3" />
                      {project.lastUpdated}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-card-strong w-full max-w-2xl max-h-[85vh] overflow-y-auto !rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  className="gl-input"
                  placeholder="e.g., Prestige Lakewood Residences - Structural Consultancy"
                  value={formData.title}
                  onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  Description
                </label>
                <textarea
                  className="gl-input"
                  rows={4}
                  placeholder="Describe the project scope, your role, and key deliverables..."
                  value={formData.description}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Row: Category + Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Category
                  </label>
                  <select
                    className="gl-input"
                    value={formData.category}
                    onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Status
                  </label>
                  <select
                    className="gl-input"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        status: e.target.value as "Active" | "Completed" | "Draft",
                      }))
                    }
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Row: Location + Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    className="gl-input"
                    placeholder="e.g., Whitefield, Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData((f) => ({ ...f, location: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Area (sqft)
                  </label>
                  <input
                    type="text"
                    className="gl-input"
                    placeholder="e.g., 2,45,000"
                    value={formData.area}
                    onChange={(e) => setFormData((f) => ({ ...f, area: e.target.value }))}
                  />
                </div>
              </div>

              {/* Row: Budget + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Budget
                  </label>
                  <input
                    type="text"
                    className="gl-input"
                    placeholder="e.g., \u20B94.2 Cr"
                    value={formData.budget}
                    onChange={(e) => setFormData((f) => ({ ...f, budget: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    className="gl-input"
                    placeholder="e.g., 18 months"
                    value={formData.duration}
                    onChange={(e) => setFormData((f) => ({ ...f, duration: e.target.value }))}
                  />
                </div>
              </div>

              {/* Image Upload Placeholder */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                  Project Images
                </label>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer"
                  style={{ borderColor: "rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.5)" }}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    PNG, JPG up to 10MB (max 5 images)
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <Tag className="w-3.5 h-3.5" />
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="gl-input"
                  placeholder="e.g., High-rise, RCC, Seismic Design"
                  value={formData.tags}
                  onChange={(e) => setFormData((f) => ({ ...f, tags: e.target.value }))}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleSave}>
                  <Sparkles className="w-4 h-4" />
                  {editingId ? "Save Changes" : "Create Project"}
                </button>
                <button className="btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="glass-card-strong w-full max-w-sm !rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(239,68,68,0.10)" }}
            >
              <Trash2 className="w-7 h-7" style={{ color: "#ef4444" }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Delete Project?
            </h3>
            <p className="text-sm mt-2 mb-6" style={{ color: "var(--text-secondary)" }}>
              This action cannot be undone. The project will be permanently removed from your
              portfolio.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                className="px-5 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "#ef4444", color: "#fff" }}
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Delete
              </button>
              <button className="btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
