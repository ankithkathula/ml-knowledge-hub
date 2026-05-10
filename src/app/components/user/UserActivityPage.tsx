import { useState } from "react";
import {
  Briefcase, BookOpen, Package, Bookmark, FolderKanban,
  Building2, Filter, Clock, ExternalLink, MessageSquare,
  Heart, Star, CheckCircle, Upload, Eye, Send,
} from "lucide-react";

// --- Types ---

type ActivityType = "job" | "course" | "sample" | "bookmark" | "portfolio" | "kc_visit" | "message";

interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  group: "today" | "yesterday" | "this_week" | "earlier";
  link?: string;
}

// --- Mock Data ---

const mockActivities: Activity[] = [
  { id: "A01", type: "job", description: "Applied to 'Senior Interior Designer' at Livspace Bangalore", timestamp: "10:30 AM", group: "today" },
  { id: "A02", type: "course", description: "Completed Module 3: Sustainable Cement & Concrete in 'Green Building Materials' course", timestamp: "9:15 AM", group: "today" },
  { id: "A03", type: "bookmark", description: "Bookmarked 'Italian Marble Floor Tile 800x1600' by Kajaria Ceramics", timestamp: "8:45 AM", group: "today" },
  { id: "A04", type: "sample", description: "Sample request SMP004 submitted for Philips LED Recessed Downlight", timestamp: "Yesterday 4:30 PM", group: "yesterday" },
  { id: "A05", type: "portfolio", description: "Updated project 'Modern Living Room Makeover' with new images", timestamp: "Yesterday 2:00 PM", group: "yesterday" },
  { id: "A06", type: "message", description: "Received message from GreenBuild Academy about course assignment", timestamp: "Yesterday 11:20 AM", group: "yesterday" },
  { id: "A07", type: "kc_visit", description: "Scheduled visit to MaterialKart KC Koramangala for 5 Apr 2026", timestamp: "Yesterday 9:00 AM", group: "yesterday" },
  { id: "A08", type: "job", description: "Job application for 'Material Consultant' at BuildPro was viewed by the employer", timestamp: "Mon, 30 Mar", group: "this_week" },
  { id: "A09", type: "course", description: "Enrolled in 'BIM for Interior Designers' by DesignTech India", timestamp: "Mon, 30 Mar", group: "this_week" },
  { id: "A10", type: "sample", description: "Sample SMP003 (Somany Vitrified Tile) approved by brand", timestamp: "Sun, 29 Mar", group: "this_week" },
  { id: "A11", type: "bookmark", description: "Bookmarked 'Weatherproof Exterior Emulsion' by Berger Paints", timestamp: "Sun, 29 Mar", group: "this_week" },
  { id: "A12", type: "portfolio", description: "Published new portfolio project: 'Terrace Garden Design - Jubilee Hills'", timestamp: "Sat, 28 Mar", group: "this_week" },
  { id: "A13", type: "kc_visit", description: "Visited MaterialKart KC Whitefield - viewed Kajaria 2026 collection", timestamp: "Fri, 27 Mar", group: "earlier" },
  { id: "A14", type: "job", description: "Saved job 'Junior Architect' at Studio Symbiosis", timestamp: "Wed, 25 Mar", group: "earlier" },
  { id: "A15", type: "sample", description: "Sample SMP002 (Asian Paints Royale Glitz) delivered successfully", timestamp: "Tue, 24 Mar", group: "earlier" },
  { id: "A16", type: "course", description: "Left a 5-star review on 'Green Building Materials' course", timestamp: "Mon, 23 Mar", group: "earlier" },
  { id: "A17", type: "message", description: "Sent material specification list to Priya Desai", timestamp: "Sun, 22 Mar", group: "earlier" },
];

const TYPE_CONFIG: Record<ActivityType, { icon: typeof Briefcase; color: string; bg: string; label: string }> = {
  job: { icon: Briefcase, color: "#2563eb", bg: "rgba(59,130,246,0.1)", label: "Jobs" },
  course: { icon: BookOpen, color: "#7c3aed", bg: "rgba(139,92,246,0.1)", label: "Courses" },
  sample: { icon: Package, color: "#d97706", bg: "rgba(245,158,11,0.1)", label: "Samples" },
  bookmark: { icon: Bookmark, color: "#ec4899", bg: "rgba(236,72,153,0.1)", label: "Bookmarks" },
  portfolio: { icon: FolderKanban, color: "#6366f1", bg: "rgba(99,102,241,0.1)", label: "Portfolio" },
  kc_visit: { icon: Building2, color: "#059669", bg: "rgba(16,185,129,0.1)", label: "KC Visits" },
  message: { icon: MessageSquare, color: "#0891b2", bg: "rgba(6,182,212,0.1)", label: "Messages" },
};

const FILTER_OPTIONS: Array<{ key: ActivityType | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "job", label: "Jobs" },
  { key: "course", label: "Courses" },
  { key: "sample", label: "Samples" },
  { key: "bookmark", label: "Bookmarks" },
  { key: "portfolio", label: "Portfolio" },
  { key: "kc_visit", label: "KC Visits" },
];

const GROUP_LABELS: Record<string, string> = {
  today: "Today",
  yesterday: "Yesterday",
  this_week: "This Week",
  earlier: "Earlier",
};

// --- Component ---

export function UserActivityPage() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  const filtered = filter === "all" ? mockActivities : mockActivities.filter((a) => a.type === filter);

  const grouped = ["today", "yesterday", "this_week", "earlier"]
    .map((g) => ({
      key: g,
      label: GROUP_LABELS[g],
      items: filtered.filter((a) => a.group === g),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Activity Log</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Your recent actions across the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium transition"
            style={{
              backgroundColor: filter === f.key ? "#6366f1" : "rgba(99,102,241,0.08)",
              color: filter === f.key ? "#fff" : "#6366f1",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {grouped.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Clock size={36} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activities found for this filter</p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.key}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((activity) => {
                  const config = TYPE_CONFIG[activity.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-xl transition hover:shadow-sm"
                      style={{ backgroundColor: "rgba(99,102,241,0.02)" }}
                    >
                      {/* Timeline dot + icon */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: config.bg }}
                      >
                        <Icon size={16} style={{ color: config.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
                          {activity.description}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          <Clock size={10} className="inline mr-1" />{activity.timestamp}
                        </p>
                      </div>

                      {/* Type badge */}
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
