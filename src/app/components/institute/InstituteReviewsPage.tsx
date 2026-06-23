import { useState } from "react";
import { Link } from "react-router";
import { Star, CheckCircle, EyeOff, ExternalLink, Pin } from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

type ReviewStatus = "Published" | "Pending" | "Hidden";

interface Review {
  id: number;
  studentName: string;
  initials: string;
  avatarUrl: string;
  color: string;
  designation: string;
  company: string;
  profilePath: string;
  course: string;
  faculty: string;
  rating: number;
  quote: string;
  date: string;
  status: ReviewStatus;
  featured: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    studentName: "Akash Mehra", initials: "AM", avatarUrl: "https://i.pravatar.cc/80?img=19", color: "#1e40af",
    designation: "BIM Coordinator", company: "Mace India",
    profilePath: "/professionals/akash-mehra",
    course: "BIM Professional: Revit Architecture Complete",
    faculty: "Dr. Ramesh Iyer",
    rating: 5,
    quote: "This certification changed my career trajectory. Dr. Iyer's depth of knowledge on Revit and BIM workflows is unmatched. The real-project exercises made me job-ready from day one. I landed a BIM Coordinator role within 3 weeks of completing the course.",
    date: "15 Mar 2024",
    status: "Published", featured: true,
  },
  {
    id: 2,
    studentName: "Rahul Saxena", initials: "RS", avatarUrl: "https://i.pravatar.cc/80?img=70", color: "#065f46",
    designation: "Architect", company: "Morphogenesis",
    profilePath: "/professionals/rahul-saxena",
    course: "Advanced AutoCAD for Construction Drawings",
    faculty: "Priya Suresh",
    rating: 5,
    quote: "Priya brings a rare combination of precision and pedagogy. Sheet sets, dynamic blocks, and annotation scaling are explained clearly with real construction drawing examples. This is the most practical AutoCAD course I've taken in 6 years of practice.",
    date: "22 Apr 2024",
    status: "Published", featured: true,
  },
  {
    id: 3,
    studentName: "Arjun Kulkarni", initials: "AK", avatarUrl: "https://i.pravatar.cc/80?img=33", color: "#7c3aed",
    designation: "Computational Design Lead", company: "Zaha Hadid Architects India",
    profilePath: "/designer/arjun-kulkarni",
    course: "Grasshopper & Parametric Design",
    faculty: "Arjun Nair",
    rating: 5,
    quote: "The Grasshopper course pushed my thinking on algorithmic form-finding. Arjun Nair's scripts for structural optimisation were a revelation. As someone already at a top firm, it still gave me new techniques I immediately applied to live projects.",
    date: "8 May 2024",
    status: "Published", featured: true,
  },
  {
    id: 4,
    studentName: "Divya Pillai", initials: "DP", avatarUrl: "https://i.pravatar.cc/80?img=28", color: "#0e7490",
    designation: "ELV Engineer", company: "Larsen & Toubro",
    profilePath: "/professionals/divya-pillai",
    course: "Smart Home & Building Automation",
    faculty: "Meera Pillai",
    rating: 4,
    quote: "Excellent coverage of KNX and DALI protocols. The integration lab exercises were very hands-on. My only feedback is that the Lutron module could go deeper on residential applications.",
    date: "2 May 2024",
    status: "Published", featured: false,
  },
  {
    id: 5,
    studentName: "Vijay Kumar", initials: "VK", avatarUrl: "https://i.pravatar.cc/80?img=20", color: "#6d28d9",
    designation: "Façade Consultant", company: "Enclos India",
    profilePath: "/professionals/vijay-kumar",
    course: "Façade Engineering & Cladding Systems",
    faculty: "Rohit Desai",
    rating: 5,
    quote: "Rohit Desai is one of the few practitioners teaching this niche with real tender and fabrication experience. I've attended conferences that didn't cover thermal bridging and tolerances as clearly as this course did.",
    date: "11 May 2024",
    status: "Published", featured: false,
  },
  {
    id: 6,
    studentName: "Meera Joshi", initials: "MJ", avatarUrl: "https://i.pravatar.cc/80?img=41", color: "#9a3412",
    designation: "Interior Architect", company: "Studio Lotus",
    profilePath: "/designer/meera-joshi",
    course: "BIM Professional: Revit Architecture Complete",
    faculty: "Dr. Ramesh Iyer",
    rating: 4,
    quote: "Good course overall. I would love to see more exercises on furniture families for interior-specific workflows. Dr. Iyer was very responsive to questions in the live sessions.",
    date: "12 May 2024",
    status: "Pending", featured: false,
  },
  {
    id: 7,
    studentName: "Rohan Verma", initials: "RV", avatarUrl: "https://i.pravatar.cc/80?img=31", color: "#374151",
    designation: "Site Engineer", company: "Shapoorji Pallonji",
    profilePath: "/professionals/rohan-verma",
    course: "Construction Cost Estimation & Tendering",
    faculty: "Sanjay Kumar",
    rating: 2,
    quote: "The content was decent but the video quality was poor and many of the rate analysis spreadsheets had errors in formulas. I had to research corrections myself.",
    date: "20 Mar 2024",
    status: "Hidden", featured: false,
  },
];

const statusColors: Record<ReviewStatus, { color: string; bg: string }> = {
  Published: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Hidden:    { color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: i <= rating ? "#f59e0b" : "transparent" }} />
      ))}
    </div>
  );
}

export function InstituteReviewsPage() {
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "All">("All");
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const filtered = reviews.filter((r) => statusFilter === "All" || r.status === statusFilter);

  const toggle = (id: number, field: "featured" | "status") => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id !== id
          ? r
          : field === "featured"
          ? { ...r, featured: !r.featured }
          : { ...r, status: r.status === "Published" ? "Hidden" : "Published" }
      )
    );
  };

  const published = reviews.filter(r => r.status === "Published").length;
  const pending   = reviews.filter(r => r.status === "Pending").length;

  return (
    <div className="p-5 sm:p-7 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Student Reviews</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
            {reviews.length} total · {published} published · {pending} awaiting approval
          </p>
        </div>
        {pending > 0 && (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
            {pending} pending review
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {(["All", "Published", "Pending", "Hidden"] as const).map((s) => {
          const count = s === "All" ? reviews.length : reviews.filter(r => r.status === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: statusFilter === s ? "#3b82f6" : "white",
                color: statusFilter === s ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${statusFilter === s ? "#3b82f6" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {s} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((r) => {
          const sc = statusColors[r.status];
          return (
            <div
              key={r.id}
              className="rounded-2xl p-5"
              style={{
                background: r.featured ? "rgba(59,130,246,0.02)" : "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: r.featured ? "1px solid rgba(59,130,246,0.15)" : "1px solid transparent",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AvatarImg src={r.avatarUrl} fallback={r.initials} size={44} fallbackBg={r.color} style={{ borderRadius: "0.75rem" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={r.profilePath}
                          className="font-bold hover:underline"
                          style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}
                        >
                          {r.studentName}
                        </Link>
                        <ExternalLink className="w-3 h-3" style={{ color: "#3b82f6" }} />
                        {r.featured && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                            <Pin className="w-2.5 h-2.5" /> Featured
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.73rem", color: "var(--text-muted)" }}>{r.designation} · {r.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sc.bg, color: sc.color }}>{r.status}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{r.date}</span>
                    </div>
                  </div>

                  <StarRow rating={r.rating} />

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65, marginTop: "8px", fontStyle: "italic" }}>
                    "{r.quote}"
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-3 flex-wrap" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Course:</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{r.course}</span>
                    <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-muted)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Faculty:</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{r.faculty}</span>

                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => toggle(r.id, "featured")}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                        style={{
                          background: r.featured ? "rgba(59,130,246,0.1)" : "rgba(0,0,0,0.04)",
                          color: r.featured ? "#3b82f6" : "var(--text-muted)",
                        }}
                      >
                        <Pin className="w-3 h-3" /> {r.featured ? "Unfeature" : "Feature"}
                      </button>
                      {r.status !== "Hidden" ? (
                        <button
                          onClick={() => toggle(r.id, "status")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                          style={{ background: "rgba(107,114,128,0.06)", color: "#6b7280" }}
                        >
                          <EyeOff className="w-3 h-3" /> Hide
                        </button>
                      ) : (
                        <button
                          onClick={() => toggle(r.id, "status")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                          style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}
                        >
                          <CheckCircle className="w-3 h-3" /> Publish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
