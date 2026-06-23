import { useState, useMemo } from "react";
import { Link, useParams } from "react-router";
import {
  Search,
  Star,
  ChevronRight,
  MapPin,
  CheckCircle,
  Users,
  Briefcase,
  Grid,
  List as ListIcon,
  ChevronDown,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  Phone,
  MessageSquare,
  X,
  ChevronLeft,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  CONSULTANTS,
  type Consultant,
} from "../data/consultantData";

const LOCATIONS = [
  "All Locations",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
];

const RATING_OPTIONS = [
  { label: "All Ratings", value: 0 },
  { label: "4.5+ Stars", value: 4.5 },
  { label: "4.0+ Stars", value: 4.0 },
  { label: "3.5+ Stars", value: 3.5 },
];

const EXPERIENCE_OPTIONS = [
  { label: "Any Experience", value: 0 },
  { label: "5+ Years", value: 5 },
  { label: "10+ Years", value: 10 },
  { label: "20+ Years", value: 20 },
];

const SORT_OPTIONS = [
  { label: "Rating: High to Low", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Experience", value: "experience" },
  { label: "Projects Completed", value: "projects" },
];

const ITEMS_PER_PAGE = 9;

export function ServicesCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = SERVICE_CATEGORIES.find((c) => c.slug === categorySlug) || SERVICE_CATEGORIES[0];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState(0);
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredConsultants = useMemo(() => {
    let results = CONSULTANTS.filter((c) => c.categoryId === category.id);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.specializations.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (locationFilter !== "All Locations") {
      results = results.filter((c) => c.location.city === locationFilter);
    }

    if (ratingFilter > 0) {
      results = results.filter((c) => c.rating >= ratingFilter);
    }

    if (experienceFilter > 0) {
      results = results.filter((c) => c.yearsExp >= experienceFilter);
    }

    results.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "experience":
          return b.yearsExp - a.yearsExp;
        case "projects":
          return b.projectCount - a.projectCount;
        default:
          return 0;
      }
    });

    return results;
  }, [category.id, searchQuery, locationFilter, ratingFilter, experienceFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredConsultants.length / ITEMS_PER_PAGE));
  const paginatedConsultants = filteredConsultants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const topRated = CONSULTANTS.filter((c) => c.categoryId === category.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const resetFilters = () => {
    setSearchQuery("");
    setLocationFilter("All Locations");
    setRatingFilter(0);
    setExperienceFilter(0);
    setSortBy("rating");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    locationFilter !== "All Locations" ||
    ratingFilter > 0 ||
    experienceFilter > 0 ||
    searchQuery !== "";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Category Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${category.color}08 0%, ${category.color}04 100%)`,
          borderBottom: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6" style={{ fontSize: "0.78rem" }}>
            <Link
              to="/"
              className="transition-colors"
              style={{ color: "var(--text-muted)", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <Link
              to="/services"
              className="transition-colors"
              style={{ color: "var(--text-muted)", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
              {category.name}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1
                className="text-3xl md:text-4xl mb-2"
                style={{ fontWeight: 800, color: "var(--text-primary)" }}
              >
                {category.name}
              </h1>
              <p
                className="max-w-2xl mb-3"
                style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {category.description}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="flex items-center gap-1.5"
                  style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}
                >
                  <Users className="w-4 h-4" style={{ color: category.color }} />
                  <strong style={{ color: "var(--text-primary)" }}>
                    {filteredConsultants.length}
                  </strong>{" "}
                  Consultants found
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="sticky top-0 z-20"
        style={{ background: "var(--bg-base)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div
              className="glass-card flex items-center gap-2 flex-1 min-w-[200px]"
              style={{ padding: "8px 14px", borderRadius: "10px" }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search consultants..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border-none outline-none text-sm flex-1"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-2">
              <SelectFilter
                value={locationFilter}
                onChange={(v) => { setLocationFilter(v); setCurrentPage(1); }}
                options={LOCATIONS.map((l) => ({ label: l, value: l }))}
                icon={<MapPin className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={String(ratingFilter)}
                onChange={(v) => { setRatingFilter(Number(v)); setCurrentPage(1); }}
                options={RATING_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
                icon={<Star className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={String(experienceFilter)}
                onChange={(v) => { setExperienceFilter(Number(v)); setCurrentPage(1); }}
                options={EXPERIENCE_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
                icon={<Clock className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
                label="Sort"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden glass-card flex items-center gap-2"
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </button>

            {/* View Toggle */}
            <div className="flex items-center gap-1 glass-card" style={{ padding: "4px", borderRadius: "10px" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: viewMode === "grid" ? "var(--accent-light)" : "transparent",
                  color: viewMode === "grid" ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: viewMode === "list" ? "var(--accent-light)" : "transparent",
                  color: viewMode === "list" ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-sm transition-colors"
                style={{ color: "var(--accent)", fontWeight: 600 }}
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Mobile Filters Drawer */}
          {showMobileFilters && (
            <div className="lg:hidden flex flex-wrap gap-2 pt-3 pb-1">
              <SelectFilter
                value={locationFilter}
                onChange={(v) => { setLocationFilter(v); setCurrentPage(1); }}
                options={LOCATIONS.map((l) => ({ label: l, value: l }))}
                icon={<MapPin className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={String(ratingFilter)}
                onChange={(v) => { setRatingFilter(Number(v)); setCurrentPage(1); }}
                options={RATING_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
                icon={<Star className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={String(experienceFilter)}
                onChange={(v) => { setExperienceFilter(Number(v)); setCurrentPage(1); }}
                options={EXPERIENCE_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
                icon={<Clock className="w-3.5 h-3.5" />}
              />
              <SelectFilter
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
                label="Sort"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            {/* Top Rated */}
            <div className="gl-card mb-6" style={{ padding: "20px" }}>
              <h3
                className="mb-4"
                style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}
              >
                Top Rated in {category.name}
              </h3>
              <div className="space-y-4">
                {topRated.map((c, idx) => (
                  <Link
                    key={c.id}
                    to={`/services/consultant/${c.slug}`}
                    className="flex items-center gap-3 group"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: idx === 0 ? "#fbbf24" : idx === 1 ? "#d1d5db" : "#d97706",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="truncate group-hover:underline"
                        style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}
                      >
                        {c.name}
                      </p>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                          {c.rating}
                        </span>
                        <span style={{ color: "var(--text-muted)" }}>
                          ({c.reviewCount})
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Specializations */}
            <div className="gl-card mb-6" style={{ padding: "20px" }}>
              <h3
                className="mb-4"
                style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}
              >
                Popular Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(CONSULTANTS.filter((c) => c.categoryId === category.id).flatMap((c) => c.specializations))).slice(0, 10).map((spec) => (
                  <button
                    key={spec}
                    onClick={() => {
                      setSearchQuery(spec);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      background:
                        searchQuery === spec ? `${category.color}15` : "rgba(0,0,0,0.04)",
                      color: searchQuery === spec ? category.color : "var(--text-secondary)",
                      border:
                        searchQuery === spec
                          ? `1px solid ${category.color}30`
                          : "1px solid transparent",
                    }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="gl-card" style={{ padding: "20px" }}>
              <h3
                className="mb-4"
                style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}
              >
                Quick Filters
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Verified Only", action: () => {} },
                  { label: "Featured", action: () => {} },
                  { label: "Available Now", action: () => {} },
                  { label: "Free Consultation", action: () => {} },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full text-left px-3 py-2.5 rounded-lg transition-colors hover:bg-orange-50"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                    }}
                    onClick={item.action}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Consultant Listing */}
          <div className="flex-1 min-w-0">
            {paginatedConsultants.length === 0 ? (
              <div
                className="gl-card flex flex-col items-center justify-center py-16 text-center"
                style={{ padding: "48px 24px" }}
              >
                <Search
                  className="w-12 h-12 mb-4"
                  style={{ color: "var(--text-muted)" }}
                />
                <h3
                  className="mb-2"
                  style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}
                >
                  No consultants found
                </h3>
                <p
                  className="mb-4"
                  style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
                >
                  Try adjusting your search or filters to find more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                  style={{ padding: "10px 24px", fontSize: "0.85rem" }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5"
                      : "space-y-4"
                  }
                >
                  {paginatedConsultants.map((consultant) => (
                    <ConsultantCard
                      key={consultant.id}
                      consultant={consultant}
                      viewMode={viewMode}
                      categoryColor={category.color}
                      categoryName={category.name}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="glass-card p-2.5 rounded-xl transition-colors disabled:opacity-40"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 rounded-xl text-sm font-semibold transition-colors"
                        style={{
                          background:
                            currentPage === page ? "var(--accent)" : "transparent",
                          color:
                            currentPage === page ? "#fff" : "var(--text-secondary)",
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="glass-card p-2.5 rounded-xl transition-colors disabled:opacity-40"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

/* ---------- Subcomponents ---------- */

function SelectFilter({
  value,
  onChange,
  options,
  icon,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  icon?: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      className="glass-card flex items-center gap-2 relative"
      style={{ padding: "6px 10px 6px 12px", borderRadius: "10px" }}
    >
      {icon && (
        <span style={{ color: "var(--text-muted)", display: "flex" }}>{icon}</span>
      )}
      {label && (
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>
          {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none outline-none appearance-none pr-5 cursor-pointer"
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none"
        style={{ color: "var(--text-muted)" }}
      />
    </div>
  );
}

function ConsultantCard({
  consultant,
  viewMode,
  categoryColor,
  categoryName,
}: {
  consultant: Consultant;
  viewMode: "grid" | "list";
  categoryColor: string;
  categoryName: string;
}) {
  if (viewMode === "list") {
    return (
      <div className="gl-card flex flex-col sm:flex-row gap-5 group hover-lift transition-all" style={{ padding: "20px" }}>
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={consultant.avatar}
            alt={consultant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {consultant.name}
                </h3>
                {consultant.verified && (
                  <CheckCircle className="w-4 h-4" style={{ color: "#10b981" }} />
                )}
              </div>
              <p
                className="mb-2"
                style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}
              >
                {consultant.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <span className="flex items-center gap-1" style={{ fontSize: "0.78rem" }}>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                {consultant.rating}
              </span>
              <span style={{ color: "var(--text-muted)" }}>
                ({consultant.reviewCount} reviews)
              </span>
            </span>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
            >
              <MapPin className="w-3.5 h-3.5" />
              {consultant.location.city}
            </span>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {consultant.yearsExp} yrs
            </span>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
            >
              <Users className="w-3.5 h-3.5" />
              {consultant.teamSize} members
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {consultant.specializations.map((spec) => (
              <span
                key={spec}
                className="px-2.5 py-1 rounded-full"
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: `${categoryColor}10`,
                  color: categoryColor,
                }}
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {consultant.pricing.range}
            </span>
            <div className="flex items-center gap-2">
              <Link
                to={`/services/consultant/${consultant.slug}`}
                className="btn-primary"
                style={{ padding: "8px 16px", fontSize: "0.78rem" }}
              >
                View Profile
              </Link>
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: `${categoryColor}12`,
                  color: categoryColor,
                  fontSize: "0.78rem",
                  border: `1px solid ${categoryColor}25`,
                }}
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Get Quote
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="gl-card group hover-lift transition-all"
      style={{ padding: "20px" }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={consultant.avatar}
            alt={consultant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="truncate"
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {consultant.name}
            </h3>
            {consultant.verified && (
              <CheckCircle
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "#10b981" }}
              />
            )}
          </div>
          <p
            className="line-clamp-1"
            style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
          >
            {consultant.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="flex items-center gap-1" style={{ fontSize: "0.78rem" }}>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
            {consultant.rating}
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            ({consultant.reviewCount})
          </span>
        </span>
        <span
          className="flex items-center gap-1"
          style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        >
          <MapPin className="w-3.5 h-3.5" />
          {consultant.location.city}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span
          className="flex items-center gap-1"
          style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        >
          <Briefcase className="w-3.5 h-3.5" />
          {consultant.yearsExp} yrs
        </span>
        <span
          className="flex items-center gap-1"
          style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        >
          <Users className="w-3.5 h-3.5" />
          {consultant.teamSize} team
        </span>
        <span
          style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
        >
          {consultant.projectCount} projects
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {consultant.specializations.map((spec) => (
          <span
            key={spec}
            className="px-2 py-0.5 rounded-full"
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              background: `${categoryColor}10`,
              color: categoryColor,
            }}
          >
            {spec}
          </span>
        ))}
      </div>

      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <span
          style={{
            fontSize: "0.88rem",
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          {consultant.priceRange}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Link
          to={`/services/consultant/${consultant.slug}`}
          className="btn-primary flex-1 text-center"
          style={{ padding: "9px 16px", fontSize: "0.78rem" }}
        >
          View Profile
        </Link>
        <button
          className="flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all text-center"
          style={{
            background: `${categoryColor}10`,
            color: categoryColor,
            fontSize: "0.78rem",
            border: `1px solid ${categoryColor}20`,
          }}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
