import { useState } from "react";
import { Link } from "react-router";
import {
  Search, BookOpen, Users, Clock, Star, ArrowRight,
  GraduationCap, Award, TrendingUp
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface PublicCourse {
  id: number;
  title: string;
  creator: string;
  duration: string;
  level: CourseLevel;
  price: string;
  rating: number;
  enrolled: number;
  category: string;
  featured: boolean;
}

const mockCourses: PublicCourse[] = [
  { id: 1, title: "Advanced Revit for Architects", creator: "DesignCraft Studios", duration: "24 hours", level: "Advanced", price: "₹4,999", rating: 4.8, enrolled: 1240, category: "BIM", featured: true },
  { id: 2, title: "Sustainable Building Design", creator: "EcoDesign Partners", duration: "18 hours", level: "Intermediate", price: "₹3,499", rating: 4.6, enrolled: 890, category: "Sustainability", featured: true },
  { id: 3, title: "Structural Analysis Fundamentals", creator: "BuildRight Engineering", duration: "30 hours", level: "Beginner", price: "₹5,999", rating: 4.5, enrolled: 560, category: "Engineering", featured: false },
  { id: 4, title: "Interior Space Planning", creator: "SpaceForm Architects", duration: "16 hours", level: "Intermediate", price: "₹2,999", rating: 4.7, enrolled: 720, category: "Interior", featured: true },
  { id: 5, title: "MEP Systems Design", creator: "TechBuild Systems", duration: "28 hours", level: "Advanced", price: "₹6,499", rating: 4.3, enrolled: 340, category: "MEP", featured: false },
  { id: 6, title: "Architectural Photography", creator: "RenderWorks Studio", duration: "10 hours", level: "Beginner", price: "₹1,999", rating: 4.9, enrolled: 450, category: "Design", featured: false },
  { id: 7, title: "AutoCAD Mastery", creator: "PrecisionBuild", duration: "20 hours", level: "Beginner", price: "₹3,999", rating: 4.4, enrolled: 1560, category: "BIM", featured: true },
  { id: 8, title: "Landscape Architecture Basics", creator: "GreenScape Design", duration: "14 hours", level: "Beginner", price: "₹2,499", rating: 4.2, enrolled: 280, category: "Architecture", featured: false },
];

const levelColors: Record<CourseLevel, { color: string; bg: string }> = {
  Beginner: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Intermediate: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Advanced: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

const categories = ["All", "BIM", "Architecture", "Engineering", "Interior", "Sustainability", "MEP", "Design"];

export function PublicCourseCatalogPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const featured = mockCourses.filter((c) => c.featured);
  const filtered = mockCourses.filter((c) => {
    if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.creator.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,106,61,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.15 }}>
            Learn from<br />
            <span style={{ color: "var(--accent)" }}>Industry Experts</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: 12, maxWidth: 560, marginInline: "auto" }}>
            Upgrade your skills with courses designed by leading professionals in construction and design
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input className="gl-input w-full pl-12 py-3 text-base rounded-xl" placeholder="Search courses, topics, or instructors..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { label: "Courses", value: "50+", icon: BookOpen },
              { label: "Instructors", value: "20+", icon: GraduationCap },
              { label: "Learners", value: "5,000+", icon: Users },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <Icon size={20} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent)" }}>{s.value}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
        {/* Featured / Popular */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Popular Courses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((c) => (
                <div key={c.id} className="glass-card hover-lift rounded-xl overflow-hidden">
                  <div className="h-28 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.1), rgba(59,130,246,0.1))" }}>
                    <BookOpen size={28} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", minHeight: "2.5em" }}>{c.title}</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{c.creator}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star size={13} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.rating}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({c.enrolled.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent)" }}>{c.price}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: levelColors[c.level].bg, color: levelColors[c.level].color }}>{c.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategoryFilter(c)} className="px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors" style={{ background: categoryFilter === c ? "var(--accent)" : "rgba(255,255,255,0.05)", color: categoryFilter === c ? "#fff" : "var(--text-secondary)" }}>
              {c}
            </button>
          ))}
        </div>

        {/* All Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="glass-card hover-lift rounded-xl overflow-hidden">
              <div className="h-32 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.06), rgba(168,85,247,0.06))" }}>
                <BookOpen size={32} style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="line-clamp-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.title}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold shrink-0" style={{ background: levelColors[c.level].bg, color: levelColors[c.level].color }}>{c.level}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{c.creator}</p>
                <div className="flex items-center gap-3 mt-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><Clock size={12} />{c.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{c.enrolled.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />{c.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent)" }}>{c.price}</span>
                  <Link to="/u/courses" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                    View Course <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <BookOpen size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No courses found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
