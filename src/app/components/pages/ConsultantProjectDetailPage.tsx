import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, MapPin, ChevronRight, Calendar, Clock, Ruler,
  IndianRupee, Star, Send, MessageCircle, X, ChevronLeft,
  Share2, Building2, Image as ImageIcon, ExternalLink,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { PROJECTS, CONSULTANTS } from "../data/consultantData";

export function ConsultantProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];
  const consultant = CONSULTANTS.find((c) => c.id === project.consultantId);
  const relatedProjects = PROJECTS.filter(
    (p) => p.consultantId === project.consultantId && p.id !== project.id
  ).slice(0, 3);

  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const category = consultant?.categoryId
    ? consultant.categoryId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Consultant";

  if (!project) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Project not found</h1>
          <Link to="/services" className="btn-primary mt-6 inline-flex">Browse Services</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setExpandedImage(project.images[index]);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    const newIndex = direction === "prev"
      ? (lightboxIndex - 1 + project.images.length) % project.images.length
      : (lightboxIndex + 1) % project.images.length;
    setLightboxIndex(newIndex);
    setExpandedImage(project.images[newIndex]);
  };

  const completedDate = new Date(project.completedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const infoCards = [
    { label: "Location", value: project.location, icon: MapPin, color: "#ff6a3d" },
    { label: "Area", value: project.area, icon: Ruler, color: "#6366f1" },
    { label: "Budget", value: project.budget, icon: IndianRupee, color: "#10b981" },
    { label: "Duration", value: project.duration, icon: Clock, color: "#f59e0b" },
    { label: "Completed", value: completedDate, icon: Calendar, color: "#8b5cf6" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/services" className="transition-colors" style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              Services
            </Link>
            <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
            {consultant && (
              <>
                <Link
                  to={`/services/consultant/${consultant.slug}`}
                  className="transition-colors"
                  style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                >
                  {consultant.name}
                </Link>
                <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)" }}>Projects</span>
                <ChevronRight className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
              </>
            )}
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{project.title}</span>
          </div>
        </div>
      </div>

      {/* ── Project Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 420 }}>
        <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            {/* Consultant credit */}
            {consultant && (
              <Link
                to={`/services/consultant/${consultant.slug}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4 transition-all"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center" style={{ background: consultant.avatar ? "transparent" : "rgba(255,255,255,0.25)", color: "#fff", fontSize: "0.55rem", fontWeight: 700 }}>
                  {consultant.avatar ? (
                    <img src={consultant.avatar} alt={consultant.name} className="w-full h-full object-cover" />
                  ) : (
                    consultant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                  )}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>by {consultant.name}</span>
              </Link>
            )}

            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 8, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
              {project.title}
            </h1>
            <p className="flex items-center gap-1.5" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
              <MapPin className="w-4 h-4" /> {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          {/* Left Content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Project Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {infoCards.map((card) => (
                <div key={card.label} className="gl-card hover-lift" style={{ padding: "20px 16px", textAlign: "center" }}>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${card.color}12` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <p style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{card.label}</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Image Gallery */}
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Project Gallery</h2>
              {project.images.length === 0 ? (
                <div className="gl-card flex flex-col items-center justify-center py-16" style={{ border: "2px dashed rgba(0,0,0,0.08)" }}>
                  <ImageIcon className="w-12 h-12 mb-3" style={{ color: "var(--text-muted)" }} />
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>No gallery images available</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="relative group rounded-xl overflow-hidden"
                      style={{ aspectRatio: index === 0 ? "16/10" : "4/3" }}
                    >
                      <img src={img} alt={`${project.title} - ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                          <ImageIcon className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="gl-card" style={{ padding: "32px 36px" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>About This Project</h2>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--text-secondary)", whiteSpace: "pre-line" }}>
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="gl-card" style={{ padding: "24px 32px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>Project Tags</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full"
                    style={{ fontSize: "0.8rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                  More Projects by {consultant?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.id}
                      to={`/services/project/${rp.id}`}
                      className="gl-card group overflow-hidden hover-lift"
                      style={{ padding: 0 }}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img src={rp.featuredImage} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="line-clamp-1" style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>{rp.title}</h4>
                          <p className="flex items-center gap-1 mt-1" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.85)" }}>
                            <MapPin className="w-3 h-3" /> {rp.location}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-2">
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{rp.area}</span>
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{rp.budget}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {rp.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 500, background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar - Consultant Card ── */}
          <div className="hidden lg:block" style={{ width: 320, flexShrink: 0, position: "sticky", top: 80 }}>
            {consultant && (
              <div className="gl-card" style={{ padding: "28px 24px" }}>
                {/* Mini Profile */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: consultant.avatar ? "transparent" : "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.9rem", fontWeight: 700 }}>
                    {consultant.avatar ? (
                      <img src={consultant.avatar} alt={consultant.name} className="w-full h-full object-cover" />
                    ) : (
                      consultant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{consultant.name}</h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full mt-1" style={{ fontSize: "0.68rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}>
                      {category}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="flex-shrink-0"
                        style={{
                          width: 14,
                          height: 14,
                          color: i <= Math.round(consultant.rating) ? "#f59e0b" : "rgba(0,0,0,0.1)",
                          fill: i <= Math.round(consultant.rating) ? "#f59e0b" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{consultant.rating}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>({consultant.reviewCount} reviews)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="text-center p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <p style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>{consultant.projectCount}</p>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>Projects</p>
                  </div>
                  <div className="text-center p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                    <p style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>{consultant.yearsExp}</p>
                    <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 500 }}>Years Exp</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{consultant.location.city}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    to={`/services/consultant/${consultant.slug}`}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                    style={{ fontSize: "0.82rem", padding: "10px 0" }}
                  >
                    <Building2 className="w-4 h-4" /> View More Projects
                  </Link>
                  <button className="btn-primary w-full" style={{ fontSize: "0.82rem", padding: "10px 0" }}>
                    <Send className="w-4 h-4" /> Get Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setExpandedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                className="absolute left-5 w-11 h-11 rounded-full flex items-center justify-center transition-colors z-10"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                className="absolute right-5 w-11 h-11 rounded-full flex items-center justify-center transition-colors z-10"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={expandedImage}
              alt={`${project.title} - ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="text-center mt-3" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
              {lightboxIndex + 1} / {project.images.length}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
