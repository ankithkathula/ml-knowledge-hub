import { useState } from "react";
import { useParams } from "react-router";
import {
  ArrowLeft, Star, Users, Clock, Play, Lock, CheckCircle,
  ChevronDown, ChevronUp, BookOpen, Award, IndianRupee,
  Heart, Share2, MessageSquare, User,
} from "lucide-react";

// --- Types ---

interface Module {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
  completed: boolean;
}

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface RelatedCourse {
  id: string;
  title: string;
  studio: string;
  rating: number;
  price: number;
  gradient: string;
}

// --- Mock Data ---

const mockCourse = {
  id: "CRS001",
  title: "Complete Guide to Sustainable Building Materials",
  studio: "GreenBuild Academy",
  studioAvatar: "GA",
  studioDescription: "Leading sustainable construction education platform with 50+ courses and 12,000+ students across India.",
  rating: 4.7,
  reviewCount: 328,
  enrolled: 2145,
  price: 2499,
  originalPrice: 4999,
  gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
  description:
    "Master the art of selecting eco-friendly and sustainable building materials for residential and commercial projects. This course covers green certifications (IGBC, GRIHA), lifecycle analysis, carbon footprint calculations, and hands-on material comparison labs. Taught by industry experts with 20+ years of experience in Indian construction.",
  enrolled_status: true,
  progress: 42,
  modules: [
    { id: "M1", title: "Introduction to Sustainable Construction", duration: "45 min", locked: false, completed: true },
    { id: "M2", title: "Understanding Green Building Certifications (IGBC & GRIHA)", duration: "1 hr 10 min", locked: false, completed: true },
    { id: "M3", title: "Sustainable Cement & Concrete Alternatives", duration: "55 min", locked: false, completed: true },
    { id: "M4", title: "Eco-Friendly Flooring Materials", duration: "1 hr 5 min", locked: false, completed: false },
    { id: "M5", title: "Low-VOC Paints & Wall Finishes", duration: "50 min", locked: false, completed: false },
    { id: "M6", title: "Reclaimed & Recycled Materials in Interiors", duration: "1 hr 15 min", locked: true, completed: false },
    { id: "M7", title: "Energy-Efficient Insulation & Roofing", duration: "1 hr", locked: true, completed: false },
    { id: "M8", title: "Water Management & Sustainable Plumbing", duration: "55 min", locked: true, completed: false },
    { id: "M9", title: "Carbon Footprint Calculation Workshop", duration: "1 hr 20 min", locked: true, completed: false },
    { id: "M10", title: "Final Project: Green Material Specification", duration: "2 hr", locked: true, completed: false },
  ] as Module[],
  reviews: [
    { id: "R1", name: "Priya Sharma", avatar: "PS", rating: 5, comment: "Excellent course! The module on IGBC certification was incredibly detailed. I could immediately apply the learnings to my ongoing villa project in Whitefield.", date: "12 Mar 2026" },
    { id: "R2", name: "Rahul Menon", avatar: "RM", rating: 4, comment: "Very informative content. The practical workshops are the highlight. Would love more case studies from South Indian projects.", date: "28 Feb 2026" },
    { id: "R3", name: "Deepika Reddy", avatar: "DR", rating: 5, comment: "Changed how I approach material selection entirely. The lifecycle cost analysis module alone is worth the entire course fee.", date: "15 Feb 2026" },
  ] as Review[],
  relatedCourses: [
    { id: "CRS002", title: "BIM for Interior Designers", studio: "DesignTech India", rating: 4.5, price: 1999, gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" },
    { id: "CRS003", title: "Advanced Waterproofing Techniques", studio: "BuildPro Academy", rating: 4.3, price: 1499, gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
    { id: "CRS004", title: "Indian Vastu & Modern Design", studio: "Heritage Design School", rating: 4.8, price: 999, gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" },
  ] as RelatedCourse[],
};

// --- Component ---

export function UserCourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course] = useState(mockCourse);
  const [isEnrolled, setIsEnrolled] = useState(course.enrolled_status);
  const [modules, setModules] = useState(course.modules);
  const [expandedModules, setExpandedModules] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const completedCount = modules.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / modules.length) * 100);

  function toggleModuleComplete(moduleId: string) {
    if (!isEnrolled) return;
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId && !m.locked ? { ...m, completed: !m.completed } : m))
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <button
        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition"
        style={{ color: "#6366f1" }}
        onClick={() => window.history.back()}
      >
        <ArrowLeft size={16} /> Back to Courses
      </button>

      {/* Course Header */}
      <div className="glass-card overflow-hidden">
        <div className="relative" style={{ background: course.gradient, height: 200 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-sm font-medium" style={{ color: "#f59e0b" }}>
              <Star size={14} fill="#f59e0b" /> {course.rating}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>({course.reviewCount} reviews)</span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <Users size={13} /> {course.enrolled.toLocaleString()} enrolled
            </span>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{course.title}</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>by {course.studio}</p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold" style={{ color: "#6366f1" }}>
              <IndianRupee size={18} className="inline" />{course.price.toLocaleString()}
            </span>
            <span className="text-sm line-through" style={{ color: "var(--text-muted)" }}>
              Rs {course.originalPrice.toLocaleString()}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
            </span>
          </div>
        </div>
      </div>

      {/* Progress (if enrolled) */}
      {isEnrolled && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Your Progress</span>
            <span className="text-sm font-bold" style={{ color: "#6366f1" }}>{progress}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ backgroundColor: "rgba(99,102,241,0.1)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: "#6366f1" }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            {completedCount} of {modules.length} modules completed
          </p>
        </div>
      )}

      {/* Description */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>About This Course</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{course.description}</p>
      </div>

      {/* Modules */}
      <div className="glass-card p-6">
        <button
          className="w-full flex items-center justify-between"
          onClick={() => setExpandedModules(!expandedModules)}
        >
          <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <BookOpen size={18} style={{ color: "#6366f1" }} /> Course Modules ({modules.length})
          </h2>
          {expandedModules ? <ChevronUp size={18} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />}
        </button>
        {expandedModules && (
          <div className="mt-4 space-y-2">
            {modules.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3 rounded-xl transition"
                style={{
                  backgroundColor: m.completed ? "rgba(34,197,94,0.05)" : m.locked ? "rgba(156,163,175,0.05)" : "transparent",
                  opacity: m.locked ? 0.6 : 1,
                }}
              >
                {isEnrolled ? (
                  <button
                    onClick={() => toggleModuleComplete(m.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition"
                    style={{
                      borderColor: m.completed ? "#22c55e" : m.locked ? "var(--text-muted)" : "#6366f1",
                      backgroundColor: m.completed ? "#22c55e" : "transparent",
                    }}
                    disabled={m.locked}
                  >
                    {m.completed && <CheckCircle size={14} className="text-white" />}
                  </button>
                ) : (
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                    {i + 1}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{m.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock size={12} className="inline mr-1" />{m.duration}
                  </span>
                  {m.locked && <Lock size={14} style={{ color: "var(--text-muted)" }} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructor Card */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Award size={18} style={{ color: "#6366f1" }} /> Instructor / Studio
        </h2>
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
          >
            {course.studioAvatar}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{course.studio}</p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{course.studioDescription}</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <MessageSquare size={18} style={{ color: "#6366f1" }} /> Reviews
        </h2>
        <div className="space-y-4">
          {(showAllReviews ? course.reviews : course.reviews.slice(0, 2)).map((r) => (
            <div key={r.id} className="flex gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
              >
                {r.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{r.name}</span>
                  <span className="flex items-center gap-0.5 text-xs" style={{ color: "#f59e0b" }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={11} fill="#f59e0b" />
                    ))}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
        {course.reviews.length > 2 && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-xs font-medium mt-4"
            style={{ color: "#6366f1" }}
          >
            {showAllReviews ? "Show less" : `View all ${course.reviewCount} reviews`}
          </button>
        )}
      </div>

      {/* Enroll / Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsEnrolled(true)}
          className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: "#6366f1" }}
        >
          {isEnrolled ? <><Play size={16} /> Continue Learning</> : <><BookOpen size={16} /> Enroll Now - Rs {course.price.toLocaleString()}</>}
        </button>
      </div>

      {/* Related Courses */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Related Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {course.relatedCourses.map((rc) => (
            <div key={rc.id} className="glass-card overflow-hidden hover-lift transition cursor-pointer">
              <div className="h-24" style={{ background: rc.gradient }} />
              <div className="p-4">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{rc.title}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{rc.studio}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#f59e0b" }}>
                    <Star size={11} fill="#f59e0b" /> {rc.rating}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "#6366f1" }}>Rs {rc.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
