import { useState } from "react";
import { Check, X, Eye, Clock, AlertCircle, Building2, Users, FileText, Briefcase, BookOpen } from "lucide-react";

type ApprovalStatus = "pending" | "approved" | "rejected";
type ApprovalCategory = "brand" | "studio" | "content" | "job" | "course";

interface ApprovalItem {
  id: number;
  category: ApprovalCategory;
  name: string;
  submittedBy: string;
  submittedAt: string;
  status: ApprovalStatus;
  notes?: string;
}

const INITIAL_ITEMS: ApprovalItem[] = [
  { id: 1,  category: "brand",   name: "Kajaria Ceramics Ltd",      submittedBy: "admin@kajaria.com",        submittedAt: "2026-05-17", status: "pending", notes: "GST verification pending" },
  { id: 2,  category: "brand",   name: "Asian Paints Pvt Ltd",      submittedBy: "portal@asianpaints.com",   submittedAt: "2026-05-17", status: "pending" },
  { id: 3,  category: "studio",  name: "Arch & Co Design Studio",   submittedBy: "archco@studio.in",         submittedAt: "2026-05-16", status: "pending" },
  { id: 4,  category: "studio",  name: "Form Follows Function LLP", submittedBy: "hello@fff.design",         submittedAt: "2026-05-16", status: "pending", notes: "Portfolio link broken" },
  { id: 5,  category: "content", name: "Cement Market Trends 2026", submittedBy: "editor@ml.in",             submittedAt: "2026-05-15", status: "pending" },
  { id: 6,  category: "job",     name: "Senior Architect – Gensler India", submittedBy: "hr@gensler.com",   submittedAt: "2026-05-15", status: "pending" },
  { id: 7,  category: "job",     name: "Interior Designer – Godrej Interio", submittedBy: "hr@godrej.com",  submittedAt: "2026-05-14", status: "pending" },
  { id: 8,  category: "course",  name: "BIM Modelling Fundamentals", submittedBy: "faculty@nid.ac.in",       submittedAt: "2026-05-14", status: "pending" },
  { id: 9,  category: "brand",   name: "Hindware Home Innovation",  submittedBy: "info@hindware.com",        submittedAt: "2026-05-13", status: "approved" },
  { id: 10, category: "studio",  name: "Morphogenesis Delhi",        submittedBy: "contact@morphogenesis.org",submittedAt: "2026-05-12", status: "approved" },
  { id: 11, category: "job",     name: "Fresher Designer – Smallcase", submittedBy: "jobs@smallcase.com",    submittedAt: "2026-05-12", status: "rejected", notes: "Not architecture-related" },
  { id: 12, category: "content", name: "Guest Post: Cheap Tiles",   submittedBy: "spam@example.com",         submittedAt: "2026-05-11", status: "rejected", notes: "Spam / low quality" },
];

const CAT_ICON: Record<ApprovalCategory, React.ElementType> = {
  brand: Building2, studio: Users, content: FileText, job: Briefcase, course: BookOpen,
};
const CAT_COLOR: Record<ApprovalCategory, string> = {
  brand: "#ff6a3d", studio: "#8b5cf6", content: "#3b82f6", job: "#22c55e", course: "#f59e0b",
};
const STATUS_STYLE: Record<ApprovalStatus, { bg: string; color: string; label: string }> = {
  pending:  { bg: "rgba(234,179,8,0.1)",  color: "#ca8a04", label: "Pending" },
  approved: { bg: "rgba(34,197,94,0.1)",  color: "#16a34a", label: "Approved" },
  rejected: { bg: "rgba(239,68,68,0.1)",  color: "#dc2626", label: "Rejected" },
};

export function AdminApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState<ApprovalStatus | "all">("pending");
  const [catFilter, setCatFilter] = useState<ApprovalCategory | "all">("all");

  const pending = items.filter((i) => i.status === "pending").length;
  const approve = (id: number) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "approved" } : i));
  const reject  = (id: number) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "rejected" } : i));

  const visible = items.filter((i) => {
    if (filter !== "all" && i.status !== filter) return false;
    if (catFilter !== "all" && i.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Approvals Queue</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Review and action pending submissions across the platform</p>
        </div>
        {pending > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "rgba(234,179,8,0.1)", color: "#ca8a04" }}>
            <AlertCircle className="w-4 h-4" />
            <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{pending} pending</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(["pending", "approved", "rejected"] as ApprovalStatus[]).map((s) => {
          const count = items.filter((i) => i.status === s).length;
          const { bg, color, label } = STATUS_STYLE[s];
          return (
            <div key={s} className="rounded-2xl p-4 cursor-pointer transition-all" style={{ background: filter === s ? bg : "white", border: `1px solid ${filter === s ? color + "40" : "rgba(0,0,0,0.06)"}` }} onClick={() => setFilter(s)}>
              <p style={{ fontSize: "1.6rem", fontWeight: 800, color }}>{count}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(["all", "brand", "studio", "content", "job", "course"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
            style={{
              background: catFilter === c ? "#ff6a3d" : "white",
              color: catFilter === c ? "white" : "var(--text-secondary)",
              border: catFilter === c ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {c === "all" ? "All Types" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
        {filter !== "all" && (
          <button onClick={() => setFilter("all")} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>
            Clear status filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <th className="text-left px-5 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Submission</th>
              <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Type</th>
              <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Submitted By</th>
              <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</th>
              <th className="text-left px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</th>
              <th className="px-4 py-3" style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No items match the current filters</td></tr>
            )}
            {visible.map((item, i) => {
              const Icon = CAT_ICON[item.category];
              const { bg, color, label } = STATUS_STYLE[item.status];
              return (
                <tr key={item.id} style={{ borderBottom: i < visible.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                  <td className="px-5 py-4">
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-primary)" }}>{item.name}</p>
                    {item.notes && <p style={{ fontSize: "0.72rem", color: "#f59e0b", marginTop: 1 }}><AlertCircle className="w-3 h-3 inline mr-0.5" />{item.notes}</p>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: CAT_COLOR[item.category] + "14" }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: CAT_COLOR[item.category] }} />
                      </div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "capitalize" }}>{item.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4" style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{item.submittedBy}</td>
                  <td className="px-4 py-4" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.submittedAt}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: bg, color }}>{label}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }} title="Preview">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {item.status === "pending" && (
                        <>
                          <button onClick={() => approve(item.id)} className="p-1.5 rounded-lg transition-all" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }} title="Approve">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => reject(item.id)} className="p-1.5 rounded-lg transition-all" style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }} title="Reject">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Showing {visible.length} of {items.length} items</p>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Auto-expires after 30 days</span>
        </div>
      </div>
    </div>
  );
}
