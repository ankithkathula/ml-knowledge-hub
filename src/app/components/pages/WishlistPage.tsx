import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Heart, ShoppingCart, X, Trash2, Plus, Layers, ArrowLeft,
  Pin, MapPin, Clock, Tag, Upload, Link2, ImageIcon, FileImage,
} from "lucide-react";
import { getWishlist, type WishlistItem } from "../products/ProductDetailPage";

const WISHLIST_KEY = "ml_wishlist";
const PROJECTS_KEY = "ml_wishlist_projects";
const ACCENT = "#FF6A3D";

const PROJECT_TYPES = [
  "Residential", "Commercial", "Hospitality", "Retail",
  "Healthcare", "Education", "Industrial", "Landscape", "Other",
];

const ITEM_CATEGORIES = [
  "Material", "Furniture", "Lighting", "Decor",
  "Flooring", "Hardware", "Fabric", "Reference",
];

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  duration: string;
  itemIds: string[];
  createdAt: string;
}

const SEED: WishlistItem[] = [
  { id: "seed-1", name: "Royale Atmos 4L", brand: "Asian Paints", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80", addedAt: new Date(Date.now() - 2 * 86400000).toISOString(), source: "platform" },
  { id: "seed-2", name: "Italian Statuario Marble", brand: "RAK Ceramics", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", addedAt: new Date(Date.now() - 5 * 86400000).toISOString(), source: "platform" },
  { id: "seed-3", name: "Engineered Hardwood Plank", brand: "Greenply", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", addedAt: new Date(Date.now() - 8 * 86400000).toISOString(), source: "platform" },
  { id: "seed-4", name: "Brushed Brass Door Handle", brand: "Hettich", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80", addedAt: new Date(Date.now() - 12 * 86400000).toISOString(), source: "platform" },
];

const SEED_PROJECTS: Project[] = [
  { id: "SP1", name: "Living Room Renovation", description: "Client project in Koramangala", type: "Residential", location: "Bangalore", duration: "3 months", itemIds: ["seed-1", "seed-2"], createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: "SP2", name: "Thesis Moodboard", description: "Sustainable materials research", type: "Education", location: "Mumbai", duration: "6 months", itemIds: ["seed-3", "seed-4"], createdAt: new Date(Date.now() - 14 * 86400000).toISOString() },
];

function initWishlist(): WishlistItem[] {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(SEED));
  return SEED;
}

function initProjects(): Project[] {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
  return SEED_PROJECTS;
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const BLANK_FORM = { name: "", description: "", type: "", location: "", duration: "" };
const BLANK_UPLOAD = { name: "", category: "", note: "", urlInput: "" };

export function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [view, setView] = useState<"items" | "projects">("items");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);

  const [pinModalItemId, setPinModalItemId] = useState<string | null>(null);
  const [pinSelections, setPinSelections] = useState<string[]>([]);

  // Upload flow
  const [uploadStep, setUploadStep] = useState<"source" | "meta" | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const [uploadForm, setUploadForm] = useState(BLANK_UPLOAD);
  const [urlMode, setUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setItems(initWishlist());
    setProjects(initProjects());
    function sync() { setItems(getWishlist()); }
    window.addEventListener("ml-wishlist-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ml-wishlist-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function setField(key: keyof typeof BLANK_FORM, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function remove(id: string) {
    const next = items.filter(i => i.id !== id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setItems(next);
    const nextProjects = projects.map(p => ({ ...p, itemIds: p.itemIds.filter(iid => iid !== id) }));
    setProjects(nextProjects);
    saveProjects(nextProjects);
    window.dispatchEvent(new Event("ml-wishlist-change"));
  }

  function clearAll() {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([]));
    setItems([]);
    window.dispatchEvent(new Event("ml-wishlist-change"));
  }

  function handleCreateProject() {
    if (!form.name.trim()) return;
    const project: Project = {
      id: `P${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      type: form.type,
      location: form.location.trim(),
      duration: form.duration.trim(),
      itemIds: [],
      createdAt: new Date().toISOString(),
    };
    const next = [project, ...projects];
    setProjects(next);
    saveProjects(next);
    setForm(BLANK_FORM);
    setShowCreateProject(false);
  }

  function deleteProject(projectId: string) {
    const next = projects.filter(p => p.id !== projectId);
    setProjects(next);
    saveProjects(next);
    if (selectedProjectId === projectId) setSelectedProjectId(null);
  }

  function openPinModal(itemId: string) {
    setPinSelections(projects.filter(p => p.itemIds.includes(itemId)).map(p => p.id));
    setPinModalItemId(itemId);
  }

  function savePinSelections() {
    if (!pinModalItemId) return;
    const next = projects.map(project => {
      const selected = pinSelections.includes(project.id);
      const alreadyIn = project.itemIds.includes(pinModalItemId);
      if (selected && !alreadyIn) return { ...project, itemIds: [...project.itemIds, pinModalItemId] };
      if (!selected && alreadyIn) return { ...project, itemIds: project.itemIds.filter(id => id !== pinModalItemId) };
      return project;
    });
    setProjects(next);
    saveProjects(next);
    setPinModalItemId(null);
  }

  function unpinFromProject(projectId: string, itemId: string) {
    const next = projects.map(p => p.id === projectId ? { ...p, itemIds: p.itemIds.filter(id => id !== itemId) } : p);
    setProjects(next);
    saveProjects(next);
  }

  function getProjectItems(project: Project): WishlistItem[] {
    return project.itemIds.map(id => items.find(i => i.id === id)).filter(Boolean) as WishlistItem[];
  }

  function itemPinCount(itemId: string) {
    return projects.filter(p => p.itemIds.includes(itemId)).length;
  }

  // Upload handlers
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUploadPreview(dataUrl);
      setUploadForm(prev => ({ ...prev, name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") }));
      setUploadStep("meta");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleUrlConfirm() {
    const url = uploadForm.urlInput.trim();
    if (!url) return;
    setUploadPreview(url);
    setUploadForm(prev => ({ ...prev, name: "" }));
    setUploadStep("meta");
  }

  function handleSaveUpload() {
    if (!uploadPreview || !uploadForm.name.trim()) return;
    const newItem: WishlistItem = {
      id: `uploaded-${Date.now()}`,
      name: uploadForm.name.trim(),
      brand: uploadForm.category || "My Upload",
      image: uploadPreview,
      addedAt: new Date().toISOString(),
      source: "uploaded",
      category: uploadForm.category,
      note: uploadForm.note.trim() || undefined,
    };
    const next = [newItem, ...items];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("ml-wishlist-change"));
    setUploadStep(null);
    setUploadPreview("");
    setUploadForm(BLANK_UPLOAD);
    setUrlMode(false);
  }

  function closeUpload() {
    setUploadStep(null);
    setUploadPreview("");
    setUploadForm(BLANK_UPLOAD);
    setUrlMode(false);
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId) ?? null;
  const selectedProjectItems = selectedProject ? getProjectItems(selectedProject) : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {selectedProject ? (
              <>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="flex items-center gap-1.5 text-xs font-medium mb-2 hover:opacity-70 transition-opacity"
                  style={{ color: ACCENT }}
                >
                  <ArrowLeft size={13} /> My Projects
                </button>
                <h1 className="text-[22px] font-semibold text-[#0F172A]">{selectedProject.name}</h1>
                {selectedProject.description && (
                  <p className="text-[13px] text-gray-400 mt-0.5">{selectedProject.description}</p>
                )}
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  {selectedProject.type && <span className="flex items-center gap-1 text-[11px] text-gray-400"><Tag size={10} /> {selectedProject.type}</span>}
                  {selectedProject.location && <span className="flex items-center gap-1 text-[11px] text-gray-400"><MapPin size={10} /> {selectedProject.location}</span>}
                  {selectedProject.duration && <span className="flex items-center gap-1 text-[11px] text-gray-400"><Clock size={10} /> {selectedProject.duration}</span>}
                  <span className="text-[11px] text-gray-300">{selectedProjectItems.length} item{selectedProjectItems.length !== 1 ? "s" : ""} · Created {formatDate(selectedProject.createdAt)}</span>
                </div>
              </>
            ) : (
              <h1 className="text-[22px] font-semibold text-[#0F172A] flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#FF6A3D]" fill="currentColor" />
                My Wishlist
                <span className="text-[14px] font-normal text-gray-400">{items.length} item{items.length !== 1 ? "s" : ""}</span>
              </h1>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!selectedProject && view === "items" && items.length > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={13} /> Clear all
              </button>
            )}
            {!selectedProject && view === "items" && (
              <button
                onClick={() => setUploadStep("source")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                <Upload size={14} /> Upload
              </button>
            )}
            {!selectedProject && view === "projects" && (
              <button
                onClick={() => setShowCreateProject(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                <Plus size={14} /> New Project
              </button>
            )}
          </div>
        </div>

        {/* View Toggle */}
        {!selectedProject && (
          <div className="flex items-center gap-1 p-1 rounded-xl w-fit mb-8" style={{ background: "rgba(0,0,0,0.04)" }}>
            {(["items", "projects"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: view === v ? "white" : "transparent",
                  color: view === v ? ACCENT : "#94a3b8",
                  boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {v === "items" ? <Heart size={13} /> : <Layers size={13} />}
                {v === "items" ? "Saved Items" : "My Projects"}
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    background: view === v ? "rgba(255,106,61,0.1)" : "rgba(0,0,0,0.06)",
                    color: view === v ? ACCENT : "#94a3b8",
                  }}
                >
                  {v === "items" ? items.length : projects.length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ---- SAVED ITEMS VIEW ---- */}
        {view === "items" && !selectedProject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Upload card — always first */}
            <button
              onClick={() => setUploadStep("source")}
              className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all hover:border-[#FF6A3D]/50 hover:bg-orange-50/30 group"
              style={{ borderColor: "rgba(255,106,61,0.25)", minHeight: "15rem" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "rgba(255,106,61,0.1)" }}>
                <Upload size={22} style={{ color: ACCENT }} />
              </div>
              <div className="text-center px-4">
                <div className="text-[13px] font-semibold" style={{ color: ACCENT }}>Add Item</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Upload photo or paste URL</div>
              </div>
            </button>

            {items.length === 0 ? (
              <div className="col-span-3 rounded-2xl border border-[#E5E7EB] p-16 text-center">
                <Heart className="w-10 h-10 mx-auto mb-4 text-gray-200" />
                <p className="text-[15px] font-medium text-gray-500 mb-2">Your wishlist is empty</p>
                <p className="text-[13px] text-gray-400 mb-6">Browse products or upload inspiration images.</p>
                <Link to="/products" className="inline-block px-6 py-2.5 bg-[#FF6A3D] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-colors">
                  Browse products
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const pinCount = itemPinCount(item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#FF6A3D]/30 hover:shadow-md transition-all group">
                    <div className="relative h-44 overflow-hidden bg-[#F9FAFB]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={() => remove(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {item.source === "uploaded" && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>
                          <FileImage size={9} /> Uploaded
                        </div>
                      )}
                      {pinCount > 0 && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "rgba(0,0,0,0.50)" }}>
                          <Pin size={9} /> {pinCount} project{pinCount !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-1">{item.brand}</p>
                      {item.source === "uploaded" ? (
                        <p className="text-[14px] font-semibold text-[#0F172A] line-clamp-2">{item.name}</p>
                      ) : (
                        <Link to={`/product/${item.id}`} className="text-[14px] font-semibold text-[#0F172A] line-clamp-2 hover:text-[#FF6A3D] transition-colors">
                          {item.name}
                        </Link>
                      )}
                      {item.note && <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 italic">"{item.note}"</p>}
                      <p className="text-[10px] text-gray-300 mt-1">Saved {formatDate(item.addedAt)}</p>
                      <div className="flex items-center gap-2 mt-4">
                        {item.source !== "uploaded" && (
                          <Link to={`/product/${item.id}`} className="flex-1 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#0F172A] hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-all">
                            View
                          </Link>
                        )}
                        <button
                          onClick={() => openPinModal(item.id)}
                          className="h-9 px-3 flex items-center justify-center gap-1 rounded-lg text-[11px] font-bold uppercase tracking-widest border transition-all"
                          style={{ borderColor: "rgba(255,106,61,0.3)", color: ACCENT }}
                          title="Add to project"
                        >
                          <Pin size={12} /> Add
                        </button>
                        {item.source !== "uploaded" && (
                          <button className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#FF6A3D] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-colors">
                            <ShoppingCart className="w-3 h-3" /> Quote
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ---- MY PROJECTS VIEW ---- */}
        {view === "projects" && !selectedProject && (
          <>
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-[#E5E7EB] p-16 text-center">
                <Layers className="w-10 h-10 mx-auto mb-4 text-gray-200" />
                <p className="text-[15px] font-medium text-gray-500 mb-2">No projects yet</p>
                <p className="text-[13px] text-gray-400 mb-6">Create a project to organise saved items</p>
                <button onClick={() => setShowCreateProject(true)} className="px-6 py-2.5 bg-[#FF6A3D] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-colors">
                  Create your first project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => {
                  const projectItems = getProjectItems(project);
                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#FF6A3D]/30 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <div className="grid grid-cols-2 h-44">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="relative overflow-hidden bg-[#F9FAFB]">
                            {projectItems[i] ? (
                              <img src={projectItems[i].image} alt={projectItems[i].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Heart size={16} className="text-gray-200" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-[14px] font-semibold text-[#0F172A] leading-snug">{project.name}</h3>
                            {project.description && <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{project.description}</p>}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                            style={{ color: "#ef4444" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          {project.type && <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,106,61,0.08)", color: ACCENT }}><Tag size={9} /> {project.type}</span>}
                          {project.location && <span className="flex items-center gap-1 text-[10px] text-gray-400"><MapPin size={9} /> {project.location}</span>}
                          {project.duration && <span className="flex items-center gap-1 text-[10px] text-gray-400"><Clock size={9} /> {project.duration}</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] font-semibold" style={{ color: ACCENT }}>{projectItems.length} item{projectItems.length !== 1 ? "s" : ""}</span>
                          <span className="text-[10px] text-gray-300">· {formatDate(project.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => setShowCreateProject(true)}
                  className="rounded-2xl border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center transition-all hover:border-[#FF6A3D]/40 hover:bg-orange-50/30"
                  style={{ minHeight: "14rem" }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-[#FF6A3D]/10">
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: ACCENT }}>New Project</span>
                  <span className="text-[11px] text-gray-400 mt-1">Group items by project or theme</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ---- PROJECT DETAIL VIEW ---- */}
        {selectedProject && (
          <>
            {/* Add items from inbox button */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] text-gray-400">{selectedProjectItems.length} item{selectedProjectItems.length !== 1 ? "s" : ""} in this project</p>
              <button
                onClick={() => { setSelectedProjectId(null); setView("items"); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold border transition-all"
                style={{ borderColor: "rgba(255,106,61,0.3)", color: ACCENT }}
              >
                <Plus size={13} /> Add from Saved Items
              </button>
            </div>

            {selectedProjectItems.length === 0 ? (
              <div className="rounded-2xl border border-[#E5E7EB] p-16 text-center">
                <Pin className="w-10 h-10 mx-auto mb-4 text-gray-200" />
                <p className="text-[15px] font-medium text-gray-500 mb-2">No items added yet</p>
                <p className="text-[13px] text-gray-400 mb-6">Go to Saved Items and hit "Add" to include products in this project</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {selectedProjectItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#FF6A3D]/30 hover:shadow-md transition-all group">
                    <div className="relative h-44 overflow-hidden bg-[#F9FAFB]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={() => unpinFromProject(selectedProject.id, item.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                        title="Remove from project"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {item.source === "uploaded" && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>
                          <FileImage size={9} /> Uploaded
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-1">{item.brand}</p>
                      <p className="text-[14px] font-semibold text-[#0F172A] line-clamp-2">{item.name}</p>
                      {item.note && <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 italic">"{item.note}"</p>}
                      <p className="text-[10px] text-gray-300 mt-1">Saved {formatDate(item.addedAt)}</p>
                      {item.source !== "uploaded" && (
                        <div className="flex items-center gap-2 mt-4">
                          <Link to={`/product/${item.id}`} className="flex-1 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#0F172A] hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-all">View</Link>
                          <button className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#FF6A3D] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-colors">
                            <ShoppingCart className="w-3 h-3" /> Quote
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── UPLOAD MODAL ── */}
      {uploadStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeUpload}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>

            {/* Step 1: Choose source */}
            {uploadStep === "source" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-semibold text-[#0F172A]">Add to Wishlist</h3>
                  <button onClick={closeUpload}><X size={16} className="text-gray-400" /></button>
                </div>

                {!urlMode ? (
                  <div className="space-y-3">
                    {/* Upload from device */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed hover:border-[#FF6A3D]/50 hover:bg-orange-50/30 transition-all group"
                      style={{ borderColor: "rgba(255,106,61,0.25)" }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{ background: "rgba(255,106,61,0.1)" }}>
                        <ImageIcon size={22} style={{ color: ACCENT }} />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-semibold text-[#0F172A]">Upload from device</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">Phone camera roll, desktop files, screenshots</div>
                      </div>
                    </button>

                    {/* Add URL */}
                    <button
                      onClick={() => setUrlMode(true)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#FF6A3D]/30 hover:bg-gray-50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 group-hover:scale-105 transition-transform">
                        <Link2 size={20} className="text-gray-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-semibold text-[#0F172A]">Paste image URL</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">From a website, Pinterest, Houzz, etc.</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Image URL</label>
                    <input
                      type="url"
                      autoFocus
                      className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors"
                      placeholder="https://..."
                      value={uploadForm.urlInput}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, urlInput: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && handleUrlConfirm()}
                    />
                    {uploadForm.urlInput && (
                      <div className="rounded-xl overflow-hidden border border-[#E5E7EB] h-32 bg-gray-50">
                        <img src={uploadForm.urlInput} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                      </div>
                    )}
                    <div className="flex justify-between gap-2">
                      <button onClick={() => setUrlMode(false)} className="px-4 py-2 rounded-lg text-sm text-gray-400">Back</button>
                      <button
                        onClick={handleUrlConfirm}
                        disabled={!uploadForm.urlInput.trim()}
                        className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                        style={{ backgroundColor: ACCENT }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
              </div>
            )}

            {/* Step 2: Metadata */}
            {uploadStep === "meta" && (
              <div>
                {/* Preview */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img src={uploadPreview} alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-[#0F172A]">Add details</h3>
                    <button onClick={closeUpload}><X size={16} className="text-gray-400" /></button>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Name *</label>
                    <input
                      type="text"
                      autoFocus
                      className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors"
                      placeholder="e.g., Textured limestone tile"
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {ITEM_CATEGORIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setUploadForm(prev => ({ ...prev, category: prev.category === c ? "" : c }))}
                          className="px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all"
                          style={{
                            background: uploadForm.category === c ? ACCENT : "white",
                            color: uploadForm.category === c ? "white" : "#64748b",
                            borderColor: uploadForm.category === c ? ACCENT : "#E5E7EB",
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Note <span className="text-gray-300 normal-case font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors"
                      placeholder="e.g., Use in master bath, warm tone"
                      value={uploadForm.note}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, note: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveUpload()}
                    />
                  </div>

                  <div className="flex justify-between gap-2 pt-1">
                    <button onClick={() => setUploadStep("source")} className="px-4 py-2 rounded-lg text-sm text-gray-400">Back</button>
                    <button
                      onClick={handleSaveUpload}
                      disabled={!uploadForm.name.trim()}
                      className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-opacity"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Save to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CREATE PROJECT MODAL ── */}
      {showCreateProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowCreateProject(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold text-[#0F172A]">New Project</h3>
              <button onClick={() => setShowCreateProject(false)}><X size={16} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Project Name *</label>
                <input
                  type="text"
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors"
                  placeholder="e.g., Sharma Residence — Living Room"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Project Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => setField("type", form.type === t ? "" : t)}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all"
                      style={{ background: form.type === t ? ACCENT : "white", color: form.type === t ? "white" : "#64748b", borderColor: form.type === t ? ACCENT : "#E5E7EB" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" className="w-full border border-[#E5E7EB] rounded-lg pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors" placeholder="City" value={form.location} onChange={(e) => setField("location", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Duration</label>
                  <div className="relative">
                    <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" className="w-full border border-[#E5E7EB] rounded-lg pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors" placeholder="e.g., 3 months" value={form.duration} onChange={(e) => setField("duration", e.target.value)} />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Description <span className="text-gray-300 normal-case font-normal">(optional)</span></label>
                <input type="text" className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6A3D] transition-colors" placeholder="Brief notes about this project" value={form.description} onChange={(e) => setField("description", e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreateProject()} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowCreateProject(false)} className="px-4 py-2 rounded-lg text-sm text-gray-400">Cancel</button>
              <button onClick={handleCreateProject} disabled={!form.name.trim()} className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-opacity" style={{ backgroundColor: ACCENT }}>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD TO PROJECT MODAL ── */}
      {pinModalItemId && (() => {
        const item = items.find(i => i.id === pinModalItemId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPinModalItemId(null)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-semibold text-[#0F172A]">Add to Project</h3>
                <button onClick={() => setPinModalItemId(null)}><X size={16} className="text-gray-400" /></button>
              </div>
              <p className="text-[11px] text-gray-400 mb-4 line-clamp-1">"{item.name}"</p>
              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {projects.length === 0 ? (
                  <p className="text-[12px] text-gray-400 text-center py-6">No projects yet — create one first.</p>
                ) : projects.map((project) => {
                  const checked = pinSelections.includes(project.id);
                  const projectItems = getProjectItems(project);
                  return (
                    <label key={project.id} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{ background: checked ? "rgba(255,106,61,0.06)" : "rgba(0,0,0,0.02)", border: `1px solid ${checked ? "rgba(255,106,61,0.25)" : "transparent"}` }}>
                      <div className="grid grid-cols-2 w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#E5E7EB]">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="bg-[#F9FAFB] overflow-hidden">
                            {projectItems[i] && <img src={projectItems[i].image} alt="" className="w-full h-full object-cover" />}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-[#0F172A] truncate">{project.name}</div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                          {project.type && <span>{project.type}</span>}
                          {project.location && <span>· {project.location}</span>}
                        </div>
                      </div>
                      <input type="checkbox" checked={checked} className="w-4 h-4 rounded" style={{ accentColor: ACCENT }}
                        onChange={() => setPinSelections(prev => prev.includes(project.id) ? prev.filter(id => id !== project.id) : [...prev, project.id])} />
                    </label>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                <button onClick={() => { setPinModalItemId(null); setShowCreateProject(true); }} className="flex items-center gap-1 text-[11px] font-semibold hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>
                  <Plus size={13} /> New project
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setPinModalItemId(null)} className="px-3 py-1.5 rounded-lg text-[11px] text-gray-400">Cancel</button>
                  <button onClick={savePinSelections} className="px-4 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ backgroundColor: ACCENT }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
