import { useState } from "react";
import {
  Star, ThumbsUp, MessageSquare, Reply, Filter, Search,
  TrendingUp, Clock, CheckCircle, Send, X, Mail, Phone,
  ChevronDown, AlertCircle, Smile, User,
} from "lucide-react";

// --- Types ---

interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
  helpfulCount: number;
  replied: boolean;
  ownerReply?: string;
  ownerReplyDate?: string;
}

type FilterType = "all" | "5" | "4" | "3" | "2" | "1" | "responded" | "not-responded";

// --- Mock Data ---

const mockReviews: Review[] = [
  {
    id: "R001",
    authorName: "Meera Reddy",
    authorAvatar: "MR",
    rating: 5,
    date: "2026-03-28",
    projectTitle: "3BHK Villa Interior Design",
    comment:
      "Absolutely phenomenal work by Arjun and his team! They transformed our 3BHK villa in Jubilee Hills into a dream home. The material selection was top-notch — from the Italian marble flooring to the teak wood panelling. Highly recommend for anyone looking for premium quality work.",
    helpfulCount: 12,
    replied: true,
    ownerReply:
      "Thank you so much, Meera! It was a pleasure working on your villa. The Italian marble really elevated the living spaces. Looking forward to future collaborations!",
    ownerReplyDate: "2026-03-29",
  },
  {
    id: "R002",
    authorName: "Vikram Patel",
    authorAvatar: "VP",
    rating: 5,
    date: "2026-03-22",
    projectTitle: "Office Space Material Consultation",
    comment:
      "Very professional and knowledgeable consultant. Helped us choose the right materials for our 5000 sq.ft. office in HITEC City. The acoustic panelling suggestions were brilliant. Project was completed within budget.",
    helpfulCount: 8,
    replied: true,
    ownerReply:
      "Thanks Vikram! Glad the acoustic solutions worked perfectly for your office environment. Wishing you all the best with the new workspace!",
    ownerReplyDate: "2026-03-23",
  },
  {
    id: "R003",
    authorName: "Ananya Iyer",
    authorAvatar: "AI",
    rating: 4,
    date: "2026-03-18",
    projectTitle: "Kitchen Renovation Guidance",
    comment:
      "Good consultation for our kitchen renovation in Banjara Hills. The quartz countertop recommendation was excellent. Only reason for 4 stars is the initial response was a bit delayed, but once the project started, everything was smooth.",
    helpfulCount: 5,
    replied: false,
  },
  {
    id: "R004",
    authorName: "Rajesh Sharma",
    authorAvatar: "RS",
    rating: 5,
    date: "2026-03-12",
    projectTitle: "Waterproofing & Exterior Cladding",
    comment:
      "Exceptional expertise in waterproofing solutions. Arjun recommended Dr. Fixit products combined with AAC blocks for our exterior walls in Gachibowli. The results have been outstanding even during heavy monsoon rains. Worth every rupee!",
    helpfulCount: 15,
    replied: true,
    ownerReply:
      "Thank you Rajesh! Waterproofing is crucial for Hyderabad's monsoon climate. Glad the AAC + Dr. Fixit combination is holding up perfectly. Do reach out for any future needs!",
    ownerReplyDate: "2026-03-13",
  },
  {
    id: "R005",
    authorName: "Priya Desai",
    authorAvatar: "PD",
    rating: 4,
    date: "2026-03-05",
    projectTitle: "Eco-Friendly Flooring Consultation",
    comment:
      "Very helpful consultation on sustainable flooring options. The bamboo flooring and recycled tile suggestions were creative. Would have appreciated more budget-friendly alternatives, but overall a great experience.",
    helpfulCount: 3,
    replied: false,
  },
  {
    id: "R006",
    authorName: "Karthik Nair",
    authorAvatar: "KN",
    rating: 3,
    date: "2026-02-28",
    projectTitle: "Bathroom Renovation Materials",
    comment:
      "Decent consultation but felt a bit rushed. The material suggestions were good but I expected more detailed comparison sheets. The anti-skid tile recommendations were useful though. Room for improvement in documentation.",
    helpfulCount: 2,
    replied: true,
    ownerReply:
      "Hi Karthik, thank you for the honest feedback. We have since updated our process to include detailed comparison documents for all consultations. Would love to make it right — please reach out for a follow-up session on us.",
    ownerReplyDate: "2026-03-01",
  },
  {
    id: "R007",
    authorName: "Sunita Joshi",
    authorAvatar: "SJ",
    rating: 5,
    date: "2026-02-20",
    projectTitle: "Full Home Material Selection",
    comment:
      "From cement to paint, tiles to wood — Arjun guided us through every single material choice for our new 4BHK in Kondapur. His knowledge of brands like Asian Paints Royale, Somany tiles, and Century Ply is impressive. The home looks stunning!",
    helpfulCount: 20,
    replied: true,
    ownerReply:
      "Thank you Sunita! It was a comprehensive project and I enjoyed every bit of it. Your trust in our recommendations made all the difference. Enjoy your beautiful new home!",
    ownerReplyDate: "2026-02-21",
  },
  {
    id: "R008",
    authorName: "Amit Verma",
    authorAvatar: "AV",
    rating: 2,
    date: "2026-02-15",
    projectTitle: "Roofing Material Advice",
    comment:
      "The consultation was okay but the recommended roofing sheets didn't match our budget expectations. Communication could have been better regarding pricing upfront. The quality of advice was good but cost transparency needs improvement.",
    helpfulCount: 1,
    replied: false,
  },
];

const ratingBreakdown = [
  { stars: 5, count: 42, percentage: 58 },
  { stars: 4, count: 18, percentage: 25 },
  { stars: 3, count: 7, percentage: 10 },
  { stars: 2, count: 3, percentage: 4 },
  { stars: 1, count: 2, percentage: 3 },
];

// --- Helpers ---

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

// --- Component ---

export default function StudioReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyTarget, setReplyTarget] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestPhone, setRequestPhone] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const totalReviews = 72;
  const overallRating = 4.8;

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "5 Star", value: "5" },
    { label: "4 Star", value: "4" },
    { label: "3 Star", value: "3" },
    { label: "2 Star", value: "2" },
    { label: "1 Star", value: "1" },
    { label: "Responded", value: "responded" },
    { label: "Not Responded", value: "not-responded" },
  ];

  const filteredReviews = mockReviews.filter((r) => {
    if (activeFilter === "responded") return r.replied;
    if (activeFilter === "not-responded") return !r.replied;
    if (["5", "4", "3", "2", "1"].includes(activeFilter))
      return r.rating === Number(activeFilter);
    return true;
  }).filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.authorName.toLowerCase().includes(q) ||
      r.projectTitle.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q)
    );
  });

  function openReplyModal(review: Review) {
    setReplyTarget(review);
    setReplyText("");
    setReplyModalOpen(true);
  }

  function handleSendReply() {
    if (!replyText.trim()) return;
    // In production, this would call an API
    setReplyModalOpen(false);
    setReplyTarget(null);
    setReplyText("");
  }

  function handleRequestReview() {
    if (!requestEmail && !requestPhone) return;
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setRequestEmail("");
      setRequestPhone("");
    }, 3000);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Reviews & Ratings
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Manage your client feedback and reputation
          </p>
        </div>
      </div>

      {/* Overview + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Rating Card */}
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
            Overall Rating
          </p>
          <div className="text-5xl font-bold mb-2" style={{ color: "var(--accent)" }}>
            {overallRating}
          </div>
          <StarRating rating={Math.round(overallRating)} size={24} />
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Rating Breakdown
          </h3>
          <div className="space-y-2.5">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span
                  className="text-xs font-medium w-10 text-right"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.stars} star
                </span>
                <div
                  className="flex-1 h-2.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--accent-light)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.stars >= 4 ? "#f59e0b" : item.stars === 3 ? "#fb923c" : "#ef4444",
                    }}
                  />
                </div>
                <span
                  className="text-xs font-medium w-8"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Response Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(16,185,129,0.1)" }}
                >
                  <CheckCircle size={16} style={{ color: "#10b981" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Response Rate
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                87%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(59,130,246,0.1)" }}
                >
                  <Clock size={16} style={{ color: "#3b82f6" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Avg Response Time
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                4.2 hrs
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(245,158,11,0.1)" }}
                >
                  <Smile size={16} style={{ color: "#f59e0b" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Positive Ratio
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                92%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,106,61,0.1)" }}
                >
                  <TrendingUp size={16} style={{ color: "#ff6a3d" }} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  This Month
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                +8 reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              className="gl-input pl-9 w-full"
              placeholder="Search reviews by name, project, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === f.value ? "btn-primary" : ""
                }`}
                style={
                  activeFilter !== f.value
                    ? {
                        backgroundColor: "var(--accent-light)",
                        color: "var(--text-secondary)",
                      }
                    : {}
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 && (
          <div className="glass-card p-12 text-center">
            <AlertCircle size={40} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No reviews found matching your criteria.
            </p>
          </div>
        )}

        {filteredReviews.map((review) => (
          <div key={review.id} className="glass-card hover-lift p-5">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  backgroundColor: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                {review.authorAvatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {review.authorName}
                    </span>
                    <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                      {new Date(review.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>

                <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>
                  {review.projectTitle}
                </p>

                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {review.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ThumbsUp size={13} />
                    Helpful ({review.helpfulCount})
                  </button>
                  {!review.replied && (
                    <button
                      onClick={() => openReplyModal(review)}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: "var(--accent)" }}
                    >
                      <Reply size={13} />
                      Reply
                    </button>
                  )}
                  {review.replied && (
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "#10b981" }}>
                      <CheckCircle size={13} />
                      Responded
                    </span>
                  )}
                </div>

                {/* Owner Reply */}
                {review.replied && review.ownerReply && (
                  <div
                    className="mt-4 p-4 rounded-xl border-l-3"
                    style={{
                      backgroundColor: "var(--accent-light)",
                      borderLeftColor: "var(--accent)",
                      borderLeftWidth: "3px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "#fff",
                        }}
                      >
                        AS
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                        Your Response
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {review.ownerReplyDate &&
                          new Date(review.ownerReplyDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {review.ownerReply}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request Review Section */}
      <div className="glass-card p-6">
        <h3 className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Request a Review
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          Send a review request to your past clients via email or SMS
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="email"
              className="gl-input pl-9 w-full"
              placeholder="Client email address"
              value={requestEmail}
              onChange={(e) => setRequestEmail(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="tel"
              className="gl-input pl-9 w-full"
              placeholder="Client phone (+91)"
              value={requestPhone}
              onChange={(e) => setRequestPhone(e.target.value)}
            />
          </div>
          <button
            onClick={handleRequestReview}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <Send size={14} />
            {requestSent ? "Request Sent!" : "Send Request"}
          </button>
        </div>
        {requestSent && (
          <p className="text-xs mt-2" style={{ color: "#10b981" }}>
            Review request sent successfully! The client will receive an email/SMS with a link to leave a review.
          </p>
        )}
      </div>

      {/* Reply Modal */}
      {replyModalOpen && replyTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="glass-card w-full max-w-lg p-6 relative"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            <button
              onClick={() => setReplyModalOpen(false)}
              className="absolute top-4 right-4"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              Reply to Review
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Responding to {replyTarget.authorName}'s review on "{replyTarget.projectTitle}"
            </p>

            {/* Original Review Preview */}
            <div
              className="p-3 rounded-xl mb-4"
              style={{ backgroundColor: "var(--accent-light)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={replyTarget.rating} size={12} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {new Date(replyTarget.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                {replyTarget.comment}
              </p>
            </div>

            <textarea
              className="gl-input w-full h-32 resize-none"
              placeholder="Write your response..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setReplyModalOpen(false)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="btn-primary flex items-center gap-2 px-5 py-2 text-sm"
                disabled={!replyText.trim()}
              >
                <Send size={14} />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
