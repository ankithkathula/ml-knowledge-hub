import { useState, useMemo } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  Send,
  ChevronRight,
  Building2,
  IndianRupee,
  Filter,
  Star,
  CheckCircle2,
  XCircle,
  CircleDot,
  Trophy,
  Sparkles,
} from "lucide-react";
import { JOBS, type JobListing } from "../data/consultantData";

type JobTab = "browse" | "applied" | "saved";
type JobTypeFilter = "All" | "Full-time" | "Contract" | "Freelance";

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Applied: { bg: "rgba(59,130,246,0.10)", text: "#3b82f6", border: "rgba(59,130,246,0.25)" },
  Shortlisted: { bg: "rgba(245,158,11,0.10)", text: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  Interview: { bg: "rgba(139,92,246,0.10)", text: "#8b5cf6", border: "rgba(139,92,246,0.25)" },
  Offered: { bg: "rgba(34,197,94,0.10)", text: "#22c55e", border: "rgba(34,197,94,0.25)" },
  Rejected: { bg: "rgba(239,68,68,0.10)", text: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Applied: <Send className="w-3.5 h-3.5" />,
  Shortlisted: <Star className="w-3.5 h-3.5" />,
  Interview: <CircleDot className="w-3.5 h-3.5" />,
  Offered: <Trophy className="w-3.5 h-3.5" />,
  Rejected: <XCircle className="w-3.5 h-3.5" />,
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Full-time": { bg: "rgba(34,197,94,0.10)", text: "#16a34a" },
  Contract: { bg: "rgba(245,158,11,0.10)", text: "#d97706" },
  Freelance: { bg: "rgba(139,92,246,0.10)", text: "#7c3aed" },
};

export function ConsultantJobsPage() {
  const [activeTab, setActiveTab] = useState<JobTab>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobTypeFilter>("All");
  const [selectedJobId, setSelectedJobId] = useState<string>(JOBS[0]?.id ?? "");
  const [jobsState, setJobsState] = useState<JobListing[]>(JOBS);

  const filteredJobs = useMemo(() => {
    let list = jobsState;
    if (typeFilter !== "All") {
      list = list.filter((j) => j.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }
    return list;
  }, [jobsState, typeFilter, searchQuery]);

  const appliedJobs = useMemo(() => jobsState.filter((j) => j.applied), [jobsState]);
  const savedJobs = useMemo(() => jobsState.filter((j) => j.saved), [jobsState]);

  const selectedJob = jobsState.find((j) => j.id === selectedJobId) ?? filteredJobs[0];

  const recommendedJobs = useMemo(
    () => jobsState.filter((j) => !j.applied && !j.saved).slice(0, 3),
    [jobsState]
  );

  const toggleSave = (id: string) => {
    setJobsState((prev) =>
      prev.map((j) => (j.id === id ? { ...j, saved: !j.saved } : j))
    );
  };

  const applyToJob = (id: string) => {
    setJobsState((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, applied: true, applicationStatus: "Applied" } : j
      )
    );
  };

  const tabs: { key: JobTab; label: string; count: number }[] = [
    { key: "browse", label: "Browse Jobs", count: filteredJobs.length },
    { key: "applied", label: "Applied", count: appliedJobs.length },
    { key: "saved", label: "Saved", count: savedJobs.length },
  ];

  const typeFilters: JobTypeFilter[] = ["All", "Full-time", "Contract", "Freelance"];

  const listToShow =
    activeTab === "applied" ? appliedJobs : activeTab === "saved" ? savedJobs : filteredJobs;

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
              <Briefcase className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <h1
              className="text-3xl"
              style={{ fontWeight: 800, color: "var(--text-primary)" }}
            >
              Jobs & Opportunities
            </h1>
          </div>
          <p className="text-sm ml-[52px]" style={{ color: "var(--text-secondary)" }}>
            Find your next role in India's construction and design industry
          </p>

          {/* Search */}
          <div className="max-w-2xl mt-6">
            <div className="glass-card rounded-2xl !p-1.5">
              <div className="flex items-center gap-3 px-4">
                <Search className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-3 text-sm"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
            </div>
          </div>

          {/* Tabs + Filters */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {/* Tabs */}
            <div className="flex items-center gap-1 glass-card !p-1 !rounded-xl">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: activeTab === t.key ? "var(--accent)" : "transparent",
                    color: activeTab === t.key ? "#fff" : "var(--text-secondary)",
                    boxShadow: activeTab === t.key ? "var(--shadow-orange)" : "none",
                  }}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>

            {/* Type filter pills */}
            {activeTab === "browse" && (
              <div className="flex items-center gap-2 ml-2">
                <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                {typeFilters.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTypeFilter(tf)}
                    className="pill"
                    style={
                      typeFilter === tf
                        ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                        : {}
                    }
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {listToShow.length === 0 ? (
          <div className="glass-card text-center py-16 mt-4">
            <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              No jobs found
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {activeTab === "applied"
                ? "You haven't applied to any jobs yet."
                : activeTab === "saved"
                ? "No saved jobs. Bookmark jobs you're interested in."
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div className="flex gap-6 mt-4">
            {/* Left Panel - Job List */}
            <div className="w-[420px] flex-shrink-0">
              <div
                className="space-y-3 overflow-y-auto pr-2"
                style={{ maxHeight: "calc(100vh - 280px)" }}
              >
                {listToShow.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className="glass-card hover-lift w-full text-left cursor-pointer !p-4"
                    style={{
                      border:
                        selectedJob?.id === job.id
                          ? "1.5px solid var(--accent)"
                          : "var(--border)",
                      background:
                        selectedJob?.id === job.id
                          ? "var(--accent-light)"
                          : "var(--glass)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-semibold truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {job.title}
                        </h3>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {job.company}
                        </p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <IndianRupee className="w-3 h-3" />
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: TYPE_COLORS[job.type]?.bg,
                              color: TYPE_COLORS[job.type]?.text,
                            }}
                          >
                            {job.type}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            <Clock className="w-3 h-3 inline mr-0.5" />
                            {job.postedDate}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            <Users className="w-3 h-3 inline mr-0.5" />
                            {job.applicants} applicants
                          </span>
                        </div>
                        {/* Application status badge for applied tab */}
                        {activeTab === "applied" && job.applicationStatus && (
                          <div className="mt-2">
                            <span
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                              style={{
                                background: STATUS_COLORS[job.applicationStatus]?.bg,
                                color: STATUS_COLORS[job.applicationStatus]?.text,
                                border: `1px solid ${STATUS_COLORS[job.applicationStatus]?.border}`,
                              }}
                            >
                              {STATUS_ICONS[job.applicationStatus]}
                              {job.applicationStatus}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel - Job Detail */}
            {selectedJob && (
              <div className="flex-1 min-w-0">
                <div
                  className="glass-card !p-0 overflow-y-auto sticky top-6"
                  style={{ maxHeight: "calc(100vh - 280px)" }}
                >
                  <div className="p-6 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="flex items-start gap-4">
                      <img
                        src={selectedJob.companyLogo}
                        alt={selectedJob.company}
                        className="w-14 h-14 rounded-xl"
                      />
                      <div className="flex-1">
                        <h2
                          className="text-xl font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedJob.title}
                        </h2>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {selectedJob.company}
                        </p>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {selectedJob.location}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <IndianRupee className="w-3.5 h-3.5" />
                            {selectedJob.salary}
                          </span>
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: TYPE_COLORS[selectedJob.type]?.bg,
                              color: TYPE_COLORS[selectedJob.type]?.text,
                            }}
                          >
                            {selectedJob.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span>
                            <Clock className="w-3 h-3 inline mr-1" />
                            Posted {selectedJob.postedDate}
                          </span>
                          <span>
                            <Users className="w-3 h-3 inline mr-1" />
                            {selectedJob.applicants} applicants
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-5">
                      {selectedJob.applied ? (
                        <button
                          className="btn-primary !opacity-70 !cursor-default"
                          disabled
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Applied
                          {selectedJob.applicationStatus && (
                            <span className="ml-1 opacity-80">
                              ({selectedJob.applicationStatus})
                            </span>
                          )}
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          onClick={() => applyToJob(selectedJob.id)}
                        >
                          <Send className="w-4 h-4" />
                          Apply Now
                        </button>
                      )}
                      <button
                        className="btn-secondary"
                        onClick={() => toggleSave(selectedJob.id)}
                      >
                        {selectedJob.saved ? (
                          <BookmarkCheck className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                        {selectedJob.saved ? "Saved" : "Save Job"}
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-6">
                    <h3
                      className="text-sm font-bold mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Job Description
                    </h3>
                    <p
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedJob.description}
                    </p>

                    {/* Requirements */}
                    <h3
                      className="text-sm font-bold mt-6 mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <ChevronRight
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: "var(--accent)" }}
                          />
                          <span style={{ color: "var(--text-secondary)" }}>{req}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Company Info */}
                    <div
                      className="mt-6 p-4 rounded-xl"
                      style={{ background: "var(--accent-light)" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        <h3
                          className="text-sm font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          About {selectedJob.company}
                        </h3>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {selectedJob.companyInfo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommended Section */}
        {activeTab === "browse" && recommendedJobs.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Recommended for You
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="glass-card hover-lift text-left cursor-pointer !p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div>
                      <h4
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {job.title}
                      </h4>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: TYPE_COLORS[job.type]?.bg,
                        color: TYPE_COLORS[job.type]?.text,
                      }}
                    >
                      {job.type}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                      {job.salary}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
