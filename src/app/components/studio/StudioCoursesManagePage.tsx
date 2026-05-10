import { useState, useMemo } from "react";
import {
  BookOpen,
  Plus,
  X,
  Search,
  Star,
  Users,
  IndianRupee,
  Clock,
  Pencil,
  Trash2,
  Eye,
  Archive,
  Upload,
  GripVertical,
  ChevronDown,
  ChevronUp,
  BarChart3,
  TrendingUp,
  Send,
  Play,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

type CourseStatus = "Draft" | "Published" | "Archived";
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
type CourseCategory = "Architecture" | "Interior Design" | "Green Building" | "BIM" | "Safety" | "Structural" | "MEP";

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
}

interface EnrolledStudent {
  id: string;
  name: string;
  enrolledDate: string;
  progress: number;
}

interface CourseReview {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  status: CourseStatus;
  price: number;
  isFree: boolean;
  thumbnail: string;
  enrolledCount: number;
  rating: number;
  revenue: number;
  lastUpdated: string;
  modules: CourseModule[];
  students: EnrolledStudent[];
  reviews: CourseReview[];
}

/* ── Mock Data ─────────────────────────────────────────────────────── */

const INITIAL_COURSES: Course[] = [
  {
    id: "c1",
    title: "Sustainable Building Materials: A Comprehensive Guide",
    description: "Learn about eco-friendly construction materials, their properties, lifecycle analysis, and how to specify them in real projects. Covers bamboo, recycled steel, AAC blocks, fly ash bricks, and more.",
    category: "Green Building",
    level: "Intermediate",
    status: "Published",
    price: 2999,
    isFree: false,
    thumbnail: "",
    enrolledCount: 184,
    rating: 4.7,
    revenue: 412800,
    lastUpdated: "Mar 20, 2026",
    modules: [
      { id: "m1", title: "Introduction to Sustainable Materials", duration: "45 min", description: "Overview of green building certifications and material selection criteria" },
      { id: "m2", title: "Natural Building Materials", duration: "1h 15min", description: "Bamboo, rammed earth, cob, and other natural materials in modern construction" },
      { id: "m3", title: "Recycled & Upcycled Materials", duration: "55 min", description: "Recycled steel, fly ash bricks, plastic lumber, and waste-derived products" },
      { id: "m4", title: "Energy-Efficient Envelope Materials", duration: "1h 30min", description: "AAC blocks, insulated panels, low-E glass, and thermal break systems" },
      { id: "m5", title: "LCA & Material Specification", duration: "1h", description: "Life cycle assessment, EPDs, and writing green material specifications" },
    ],
    students: [
      { id: "st1", name: "Meera Reddy", enrolledDate: "Mar 1, 2026", progress: 85 },
      { id: "st2", name: "Amit Verma", enrolledDate: "Mar 5, 2026", progress: 62 },
      { id: "st3", name: "Neha Kulkarni", enrolledDate: "Mar 12, 2026", progress: 40 },
    ],
    reviews: [
      { id: "r1", studentName: "Meera Reddy", rating: 5, comment: "Excellent course! The LCA module was incredibly detailed. Helped me specify better materials for my current project.", date: "Mar 25, 2026" },
      { id: "r2", studentName: "Ravi Kumar", rating: 4, comment: "Very informative. Would have liked more case studies on Indian projects though.", date: "Mar 18, 2026" },
    ],
  },
  {
    id: "c2",
    title: "BIM for Material Specification & Quantity Takeoff",
    description: "Master BIM workflows for material specification, quantity estimation, and BOM generation using Revit and BIM 360. Includes real project templates.",
    category: "BIM",
    level: "Advanced",
    status: "Published",
    price: 4499,
    isFree: false,
    thumbnail: "",
    enrolledCount: 97,
    rating: 4.9,
    revenue: 356400,
    lastUpdated: "Mar 28, 2026",
    modules: [
      { id: "m6", title: "BIM Fundamentals for Specifiers", duration: "50 min", description: "BIM LOD levels, material properties in Revit families" },
      { id: "m7", title: "Material Libraries in Revit", duration: "1h 20min", description: "Creating and managing material libraries, Autodesk Material Library" },
      { id: "m8", title: "Quantity Takeoff Workflows", duration: "1h 45min", description: "Accurate QTO from BIM models, schedule creation, export to Excel" },
      { id: "m9", title: "BOM Generation & Cost Estimation", duration: "1h 10min", description: "Automated BOM from Revit, linking to cost databases" },
    ],
    students: [
      { id: "st4", name: "Karthik Nair", enrolledDate: "Feb 15, 2026", progress: 100 },
      { id: "st5", name: "Priya Desai", enrolledDate: "Mar 1, 2026", progress: 75 },
    ],
    reviews: [
      { id: "r3", studentName: "Karthik Nair", rating: 5, comment: "This course transformed how I handle BOMs. The Revit templates alone are worth the price.", date: "Mar 30, 2026" },
    ],
  },
  {
    id: "c3",
    title: "Interior Material Selection Masterclass",
    description: "A hands-on course covering flooring, wall finishes, countertops, hardware, and lighting materials for residential and commercial interiors.",
    category: "Interior Design",
    level: "Beginner",
    status: "Draft",
    price: 0,
    isFree: true,
    thumbnail: "",
    enrolledCount: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: "Mar 31, 2026",
    modules: [
      { id: "m10", title: "Flooring Materials Deep Dive", duration: "1h 30min", description: "Vitrified tiles, marble, granite, engineered wood, vinyl - pros, cons, costs" },
      { id: "m11", title: "Wall Finishes & Cladding", duration: "1h", description: "Paints, wallpapers, stone cladding, PU panels, textured finishes" },
    ],
    students: [],
    reviews: [],
  },
  {
    id: "c4",
    title: "Fire Safety Materials & Code Compliance",
    description: "Understanding fire-rated materials, IS codes, NBC requirements, and how to specify fire-safe construction materials for commercial buildings.",
    category: "Safety",
    level: "Intermediate",
    status: "Archived",
    price: 1999,
    isFree: false,
    thumbnail: "",
    enrolledCount: 56,
    rating: 4.3,
    revenue: 89600,
    lastUpdated: "Jan 15, 2026",
    modules: [
      { id: "m12", title: "Fire Rating Fundamentals", duration: "40 min", description: "Understanding fire ratings, flame spread index, smoke development index" },
      { id: "m13", title: "NBC 2016 Part 4 - Fire & Life Safety", duration: "1h 15min", description: "Key NBC requirements for materials in different building types" },
      { id: "m14", title: "Fire-Rated Products & Systems", duration: "55 min", description: "Fire doors, fire-stop sealants, intumescent coatings, fire-rated glass" },
    ],
    students: [
      { id: "st6", name: "Sunita Joshi", enrolledDate: "Nov 10, 2025", progress: 100 },
    ],
    reviews: [
      { id: "r4", studentName: "Sunita Joshi", rating: 4, comment: "Good coverage of NBC codes. The product database reference was very useful.", date: "Dec 20, 2025" },
    ],
  },
];

const STATUS_STYLE: Record<CourseStatus, { bg: string; text: string }> = {
  Draft: { bg: "rgba(156,163,175,0.12)", text: "#6b7280" },
  Published: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
  Archived: { bg: "rgba(245,158,11,0.12)", text: "#d97706" },
};

const LEVEL_STYLE: Record<CourseLevel, { bg: string; text: string }> = {
  Beginner: { bg: "rgba(59,130,246,0.12)", text: "#2563eb" },
  Intermediate: { bg: "rgba(168,85,247,0.12)", text: "#7c3aed" },
  Advanced: { bg: "rgba(239,68,68,0.12)", text: "#dc2626" },
};

const CATEGORIES: CourseCategory[] = ["Architecture", "Interior Design", "Green Building", "BIM", "Safety", "Structural", "MEP"];
const LEVELS: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];

/* ── Component ─────────────────────────────────────────────────────── */

export function StudioCoursesManagePage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "students" | "reviews">("modules");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Architecture" as CourseCategory,
    level: "Beginner" as CourseLevel,
    price: "",
    isFree: false,
    modules: [] as CourseModule[],
  });

  const [moduleForm, setModuleForm] = useState({ title: "", duration: "", description: "" });

  /* ── Computed ──────────────────────────────────────────────────── */

  const stats = useMemo(() => {
    const total = courses.length;
    const published = courses.filter((c) => c.status === "Published").length;
    const totalEnrollments = courses.reduce((s, c) => s + c.enrolledCount, 0);
    const ratedCourses = courses.filter((c) => c.rating > 0);
    const avgRating = ratedCourses.length
      ? (ratedCourses.reduce((s, c) => s + c.rating, 0) / ratedCourses.length).toFixed(1)
      : "N/A";
    return { total, published, totalEnrollments, avgRating };
  }, [courses]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const q = searchQuery.toLowerCase();
    return courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [courses, searchQuery]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  /* ── Handlers ─────────────────────────────────────────────────── */

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: "", description: "", category: "Architecture", level: "Beginner", price: "", isFree: false, modules: [] });
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.isFree ? "" : String(course.price),
      isFree: course.isFree,
      modules: [...course.modules],
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, title: form.title, description: form.description, category: form.category, level: form.level, price: form.isFree ? 0 : Number(form.price), isFree: form.isFree, modules: form.modules, lastUpdated: "Just now" }
            : c
        )
      );
    } else {
      setCourses((prev) => [
        {
          id: `c-${Date.now()}`,
          title: form.title,
          description: form.description,
          category: form.category,
          level: form.level,
          status: "Draft" as CourseStatus,
          price: form.isFree ? 0 : Number(form.price),
          isFree: form.isFree,
          thumbnail: "",
          enrolledCount: 0,
          rating: 0,
          revenue: 0,
          lastUpdated: "Just now",
          modules: form.modules,
          students: [],
          reviews: [],
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const addModule = () => {
    if (!moduleForm.title.trim()) return;
    setForm((f) => ({
      ...f,
      modules: [...f.modules, { id: `mod-${Date.now()}`, ...moduleForm }],
    }));
    setModuleForm({ title: "", duration: "", description: "" });
  };

  const removeModule = (id: string) => {
    setForm((f) => ({ ...f, modules: f.modules.filter((m) => m.id !== id) }));
  };

  const toggleStatus = (id: string, newStatus: CourseStatus) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus, lastUpdated: "Just now" } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (expandedCourse === id) setExpandedCourse(null);
  };

  const statCards = [
    { label: "Total Courses", value: stats.total, icon: BookOpen, color: "var(--accent)" },
    { label: "Published", value: stats.published, icon: Send, color: "#10b981" },
    { label: "Total Enrollments", value: stats.totalEnrollments, icon: Users, color: "#3b82f6" },
    { label: "Avg Rating", value: stats.avgRating, icon: Star, color: "#f59e0b" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
            <BookOpen className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>My Courses</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Create and manage your educational content</p>
          </div>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}20` }}>
              <s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Search ──────────────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl !p-1.5 max-w-lg">
        <div className="flex items-center gap-3 px-4">
          <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2.5 text-sm"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ── Course List ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        {filtered.map((course) => (
          <div key={course.id} className="rounded-2xl overflow-hidden transition-all" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
            {/* Course Card */}
            <div className="flex items-center gap-4 p-5">
              <div className="w-24 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)", border: "1px dashed rgba(0,0,0,0.1)" }}>
                <Play className="w-6 h-6" style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{course.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: STATUS_STYLE[course.status].bg, color: STATUS_STYLE[course.status].text }}>
                    {course.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: LEVEL_STYLE[course.level].bg, color: LEVEL_STYLE[course.level].text }}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.enrolledCount} enrolled</span>
                  {course.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {course.rating}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {course.isFree ? "Free" : `₹${formatINR(course.price)}`}
                  </span>
                  {course.revenue > 0 && (
                    <span className="flex items-center gap-1" style={{ color: "#10b981" }}>
                      <TrendingUp className="w-3 h-3" /> ₹{formatINR(course.revenue)}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }} onClick={() => openEdit(course)}>
                  <Pencil className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                </button>
                {course.status === "Draft" && (
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }} onClick={() => toggleStatus(course.id, "Published")}>
                    <Send className="w-3.5 h-3.5" style={{ color: "#16a34a" }} />
                  </button>
                )}
                {course.status === "Published" && (
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }} onClick={() => toggleStatus(course.id, "Archived")}>
                    <Archive className="w-3.5 h-3.5" style={{ color: "#d97706" }} />
                  </button>
                )}
                <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.10)" }} onClick={() => deleteCourse(course.id)}>
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#ef4444" }} />
                </button>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.04)" }}
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                >
                  <ChevronDown className="w-4 h-4 transition-transform" style={{ color: "var(--text-muted)", transform: expandedCourse === course.id ? "rotate(180deg)" : "none" }} />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCourse === course.id && (
              <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                {/* Tabs */}
                <div className="flex items-center gap-4 pt-4 mb-4">
                  {(["modules", "students", "reviews"] as const).map((tab) => (
                    <button
                      key={tab}
                      className="text-xs font-semibold pb-2 capitalize transition-all"
                      style={{
                        color: activeTab === tab ? "var(--accent)" : "var(--text-muted)",
                        borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab} {tab === "modules" && `(${course.modules.length})`}
                      {tab === "students" && `(${course.students.length})`}
                      {tab === "reviews" && `(${course.reviews.length})`}
                    </button>
                  ))}
                </div>

                {/* Modules Tab */}
                {activeTab === "modules" && (
                  <div className="space-y-2">
                    {course.modules.map((mod, idx) => (
                      <div key={mod.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                        <GripVertical className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                        <span className="text-xs font-bold w-6 text-center" style={{ color: "var(--accent)" }}>{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{mod.title}</p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{mod.description}</p>
                        </div>
                        <span className="text-xs font-medium flex items-center gap-1 flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                          <Clock className="w-3 h-3" /> {mod.duration}
                        </span>
                      </div>
                    ))}
                    {course.modules.length === 0 && (
                      <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>No modules yet</p>
                    )}
                  </div>
                )}

                {/* Students Tab */}
                {activeTab === "students" && (
                  <div>
                    {course.students.length > 0 ? (
                      <>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Completion Rate:{" "}
                            <strong style={{ color: "#10b981" }}>
                              {Math.round(course.students.filter((s) => s.progress === 100).length / course.students.length * 100)}%
                            </strong>
                          </span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Revenue: <strong style={{ color: "var(--accent)" }}>₹{formatINR(course.revenue)}</strong>
                          </span>
                        </div>
                        <div className="space-y-2">
                          {course.students.map((student) => (
                            <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #e8522a 100%)", fontSize: "0.6rem", fontWeight: 700 }}>
                                {student.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{student.name}</p>
                                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Enrolled: {student.enrolledDate}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0 w-32">
                                <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                                  <div className="h-full rounded-full" style={{ width: `${student.progress}%`, background: student.progress === 100 ? "#10b981" : "var(--accent)" }} />
                                </div>
                                <span className="text-[10px] font-bold w-8 text-right" style={{ color: student.progress === 100 ? "#10b981" : "var(--text-secondary)" }}>
                                  {student.progress}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>No students enrolled yet</p>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    {course.reviews.length > 0 ? (
                      <div className="space-y-3">
                        {course.reviews.map((review) => (
                          <div key={review.id} className="p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)" }}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{review.studentName}</span>
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3" style={{ color: i < review.rating ? "#f59e0b" : "rgba(0,0,0,0.1)", fill: i < review.rating ? "#f59e0b" : "none" }} />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{review.date}</span>
                            </div>
                            <p className="text-xs" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>No reviews yet</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="glass-card text-center py-12">
            <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>No courses found</p>
          </div>
        )}
      </div>

      {/* ── Create/Edit Course Modal ────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div className="glass-card-strong w-full max-w-2xl max-h-[85vh] overflow-y-auto !rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {editingId ? "Edit Course" : "Create New Course"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Course Title *</label>
                <input type="text" className="gl-input" placeholder="e.g., Sustainable Building Materials Guide" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Description</label>
                <textarea className="gl-input" rows={4} placeholder="What will students learn..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Category</label>
                  <select className="gl-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as CourseCategory }))}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Level</label>
                  <select className="gl-input" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value as CourseLevel }))}>
                    {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Price (INR)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      className="gl-input flex-1"
                      placeholder="0"
                      disabled={form.isFree}
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    />
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                      <input
                        type="checkbox"
                        checked={form.isFree}
                        onChange={(e) => setForm((f) => ({ ...f, isFree: e.target.checked, price: "" }))}
                        className="rounded"
                      />
                      Free
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Thumbnail</label>
                  <div className="border-2 border-dashed rounded-xl p-3 text-center cursor-pointer" style={{ borderColor: "rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.5)" }}>
                    <Upload className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--text-muted)" }} />
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Upload image</p>
                  </div>
                </div>
              </div>

              {/* Modules Section */}
              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--text-secondary)" }}>
                  Modules ({form.modules.length})
                </label>
                <div className="space-y-2 mb-3">
                  {form.modules.map((mod, idx) => (
                    <div key={mod.id} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.03)" }}>
                      <GripVertical className="w-4 h-4 flex-shrink-0 cursor-grab" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                      <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{idx + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{mod.title}</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{mod.duration} &middot; {mod.description}</p>
                      </div>
                      <button
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ background: "rgba(239,68,68,0.1)" }}
                        onClick={() => removeModule(mod.id)}
                      >
                        <X className="w-3 h-3" style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl space-y-2" style={{ background: "rgba(0,0,0,0.02)", border: "1px dashed rgba(0,0,0,0.1)" }}>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" className="gl-input !text-xs" placeholder="Module title" value={moduleForm.title} onChange={(e) => setModuleForm((f) => ({ ...f, title: e.target.value }))} />
                    <input type="text" className="gl-input !text-xs" placeholder="Duration (e.g., 1h 30min)" value={moduleForm.duration} onChange={(e) => setModuleForm((f) => ({ ...f, duration: e.target.value }))} />
                    <input type="text" className="gl-input !text-xs" placeholder="Brief description" value={moduleForm.description} onChange={(e) => setModuleForm((f) => ({ ...f, description: e.target.value }))} />
                  </div>
                  <button
                    className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    onClick={addModule}
                  >
                    <Plus className="w-3 h-3" /> Add Module
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button className="btn-primary" onClick={handleSave}>
                  {editingId ? "Save Changes" : "Create Course"}
                </button>
                <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
