import { useState, useMemo } from "react";
import {
  Search,
  GraduationCap,
  Clock,
  Users,
  Star,
  Play,
  Award,
  ExternalLink,
  ChevronRight,
  X,
  BookOpen,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  COURSES,
  CERTIFICATIONS,
  COURSE_CATEGORIES,
  type CourseListing,
} from "../data/consultantData";

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "rgba(34,197,94,0.10)", text: "#16a34a" },
  Intermediate: { bg: "rgba(245,158,11,0.10)", text: "#d97706" },
  Advanced: { bg: "rgba(239,68,68,0.10)", text: "#dc2626" },
};

export function ConsultantCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [detailCourse, setDetailCourse] = useState<CourseListing | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(
    () => new Set(COURSES.filter((c) => c.inProgress).map((c) => c.id))
  );

  const myLearning = useMemo(
    () => COURSES.filter((c) => c.inProgress && (c.progress ?? 0) > 0),
    []
  );

  const filteredCourses = useMemo(() => {
    let list = COURSES;
    if (selectedCategory !== "All") {
      list = list.filter((c) => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.provider.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const handleEnroll = (id: string) => {
    setEnrolledIds((prev) => new Set(prev).add(id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-3 h-3"
        fill={i < Math.floor(rating) ? "#f59e0b" : "none"}
        stroke={i < Math.floor(rating) ? "#f59e0b" : "#d1d5db"}
      />
    ));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-orange-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--accent-light)" }}
            >
              <GraduationCap className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <h1
              className="text-3xl"
              style={{ fontWeight: 800, color: "var(--text-primary)" }}
            >
              Learning & Certifications
            </h1>
          </div>
          <p className="text-sm ml-[52px]" style={{ color: "var(--text-secondary)" }}>
            Upskill with industry-leading courses for construction professionals
          </p>

          {/* Search */}
          <div className="max-w-2xl mt-6">
            <div className="glass-card rounded-2xl !p-1.5">
              <div className="flex items-center gap-3 px-4">
                <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search courses, providers, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-3 text-sm"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* My Learning - In Progress */}
        {myLearning.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Continue Learning
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myLearning.map((course) => (
                <div
                  key={course.id}
                  className="glass-card hover-lift !p-0 overflow-hidden flex cursor-pointer"
                  onClick={() => setDetailCourse(course)}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-40 h-full object-cover flex-shrink-0"
                  />
                  <div className="p-4 flex-1 min-w-0">
                    <h3
                      className="text-sm font-bold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {course.provider}
                    </p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                          {course.progress}% complete
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {course.duration}
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ background: "rgba(0,0,0,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${course.progress}%`,
                            background: "var(--accent)",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="btn-primary mt-3 !py-1.5 !px-3 !text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailCourse(course);
                      }}
                    >
                      <Play className="w-3 h-3" />
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {CERTIFICATIONS.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                My Certifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="glass-card hover-lift !p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${cert.badgeColor}15` }}
                    >
                      <Award className="w-5 h-5" style={{ color: cert.badgeColor }} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {cert.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {cert.issuer}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Earned: {cert.date}
                      </p>
                      <a
                        href={cert.verificationUrl}
                        className="inline-flex items-center gap-1 text-xs font-medium mt-2"
                        style={{ color: "var(--accent)" }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify Credential
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Browse by Category
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="pill"
              style={
                selectedCategory === "All"
                  ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                  : {}
              }
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="pill"
                style={
                  selectedCategory === cat
                    ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                    : {}
                }
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Courses Grid */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {selectedCategory === "All" ? "Recommended Courses" : selectedCategory}
            </h2>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              ({filteredCourses.length} courses)
            </span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="glass-card text-center py-12">
              <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                No courses found. Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="glass-card hover-lift !p-0 overflow-hidden cursor-pointer"
                  onClick={() => setDetailCourse(course)}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <span
                      className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: LEVEL_COLORS[course.level]?.bg,
                        color: LEVEL_COLORS[course.level]?.text,
                      }}
                    >
                      {course.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-sm font-bold line-clamp-2 leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      {course.provider}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>
                        {course.rating}
                      </span>
                      <div className="flex items-center">{renderStars(course.rating)}</div>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        ({course.enrolledCount.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: course.price === "Free" ? "#16a34a" : "var(--text-primary)" }}
                      >
                        {course.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Course Detail Modal */}
      {detailCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setDetailCourse(null)}
        >
          <div
            className="glass-card-strong w-full max-w-2xl max-h-[85vh] overflow-y-auto !rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={detailCourse.thumbnail}
                alt={detailCourse.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setDetailCourse(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
              >
                <X className="w-4 h-4" />
              </button>
              <span
                className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: LEVEL_COLORS[detailCourse.level]?.bg,
                  color: LEVEL_COLORS[detailCourse.level]?.text,
                }}
              >
                {detailCourse.level}
              </span>
            </div>

            <div className="p-6">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {detailCourse.title}
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                by {detailCourse.provider}
              </p>

              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold" style={{ color: "#f59e0b" }}>
                    {detailCourse.rating}
                  </span>
                  <div className="flex">{renderStars(detailCourse.rating)}</div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    ({detailCourse.enrolledCount.toLocaleString()} enrolled)
                  </span>
                </div>
                <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <Clock className="w-3.5 h-3.5" />
                  {detailCourse.duration}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: detailCourse.price === "Free" ? "#16a34a" : "var(--accent)" }}
                >
                  {detailCourse.price}
                </span>
              </div>

              {/* Progress bar for in-progress courses */}
              {detailCourse.inProgress && (detailCourse.progress ?? 0) > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                      Your Progress
                    </span>
                    <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                      {detailCourse.progress}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${detailCourse.progress}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </div>
                </div>
              )}

              <p
                className="text-sm leading-relaxed mt-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {detailCourse.description}
              </p>

              {/* Modules */}
              <h3 className="text-sm font-bold mt-6 mb-3" style={{ color: "var(--text-primary)" }}>
                Course Modules ({detailCourse.modules.length})
              </h3>
              <div className="space-y-2">
                {detailCourse.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "var(--accent-light)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: "var(--accent)", color: "#fff" }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {mod.title}
                      </p>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {mod.duration}
                    </span>
                  </div>
                ))}
              </div>

              {/* Enroll Button */}
              <div className="mt-6 flex items-center gap-3">
                {enrolledIds.has(detailCourse.id) ? (
                  <button className="btn-primary !opacity-70 !cursor-default" disabled>
                    <CheckCircle2 className="w-4 h-4" />
                    Enrolled
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => handleEnroll(detailCourse.id)}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Enroll Now {detailCourse.price !== "Free" && `- ${detailCourse.price}`}
                  </button>
                )}
                <button className="btn-secondary" onClick={() => setDetailCourse(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
