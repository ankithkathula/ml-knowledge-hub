import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, Star, MapPin, Share2, MessageCircle, Phone,
  Mail, Globe, ChevronRight, CheckCircle, Award, Users,
  Clock, Briefcase, ThumbsUp, Send, Calendar, Building2,
  Shield, Instagram, Linkedin, Facebook, Youtube, ExternalLink,
  Image as ImageIcon, ChevronDown, X,
} from "lucide-react";
import { CONSULTANTS, PROJECTS, TEAM_MEMBERS, REVIEWS } from "../data/consultantData";
import { REGISTERED_PROFESSIONALS } from "../data/kcPortalData";
import { ProfessionalMicrosite } from "./ProfessionalMicrosite";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="flex-shrink-0"
          style={{
            width: size,
            height: size,
            color: i <= Math.round(rating) ? "#f59e0b" : "rgba(0,0,0,0.1)",
            fill: i <= Math.round(rating) ? "#f59e0b" : "none",
          }}
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", minWidth: 50 }}>
        {stars} star{stars !== 1 && "s"}
      </span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#f59e0b" }} />
      </div>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", minWidth: 28, textAlign: "right" }}>{count}</span>
    </div>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "instagram": return Instagram;
    case "linkedin": return Linkedin;
    case "facebook": return Facebook;
    case "youtube": return Youtube;
    default: return Globe;
  }
}

export function ConsultantProfilePage() {
  const { consultantSlug } = useParams<{ consultantSlug: string }>();

  // If the slug matches a registered professional (studio/consultancy from kcPortalData),
  // render the elegant microsite instead of the legacy consultant profile.
  const professional = REGISTERED_PROFESSIONALS.find((p) => p.slug === consultantSlug);
  if (professional) {
    return <ProfessionalMicrosite profile={professional} />;
  }

  const consultant = CONSULTANTS.find((c) => c.slug === consultantSlug) || CONSULTANTS[0];
  const consultantProjects = PROJECTS.filter((p) => p.consultantId === consultant.id);
  const consultantTeam = TEAM_MEMBERS.filter((t) => t.consultantId === consultant.id);
  const consultantReviews = REVIEWS.filter((r) => r.consultantId === consultant.id);

  const [activeTab, setActiveTab] = useState("overview");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", phone: "", message: "" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 3500);
    setQuoteForm({ name: "", phone: "", message: "" });
  };

  // Rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: consultantReviews.filter((r) => Math.round(r.rating) === stars).length,
  }));

  const category = consultant.categoryId
    ? consultant.categoryId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Consultant";

  const similarConsultants = CONSULTANTS.filter(
    (c) => c.categoryId === consultant.categoryId && c.id !== consultant.id
  ).slice(0, 3);

  if (!consultant) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Consultant not found</h1>
          <Link to="/services" className="btn-primary mt-6 inline-flex">Browse Services</Link>
        </div>
      </div>
    );
  }

  /* ── Overview Tab ── */
  const renderOverview = () => (
    <div className="space-y-8">
      {/* About Snippet */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>About</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          {consultant.description || consultant.about}
        </p>
      </div>

      {/* Specializations */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Specializations</h3>
        <div className="flex flex-wrap gap-2.5">
          {consultant.specializations.map((spec) => (
            <span
              key={spec}
              className="px-4 py-2 rounded-full"
              style={{ fontSize: "0.8rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      {consultantProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>Recent Projects</h3>
            <button
              onClick={() => setActiveTab("projects")}
              className="flex items-center gap-1 transition-colors"
              style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)" }}
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultantProjects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                to={`/services/project/${project.id}`}
                className="gl-card group overflow-hidden hover-lift"
                style={{ padding: 0 }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="line-clamp-1" style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>{project.title}</h4>
                    <p className="flex items-center gap-1 mt-1" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.85)" }}>
                      <MapPin className="w-3 h-3" /> {project.location}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{project.area}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{project.budget}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 500, background: "rgba(0,0,0,0.04)", color: "var(--text-muted)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Review */}
      {consultantReviews.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Featured Review</h3>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>
                {consultantReviews[0].authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{consultantReviews[0].authorName}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={consultantReviews[0].rating} size={13} />
                  {consultantReviews[0].projectTitle && (
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{consultantReviews[0].projectTitle}</span>
                  )}
                </div>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-secondary)", fontStyle: "italic" }}>
              &ldquo;{consultantReviews[0].comment}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Areas Serving */}
      {consultant.areasServing && consultant.areasServing.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Areas We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {consultant.areasServing.map((area) => (
              <div key={area} className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)" }}>{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {consultant.certifications && consultant.certifications.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Certifications</h3>
          <div className="space-y-3">
            {consultant.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <Award className="w-4.5 h-4.5" style={{ color: "#10b981" }} />
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ── Projects Tab ── */
  const renderProjects = () => (
    <div>
      {consultantProjects.length === 0 ? (
        <div className="gl-card flex flex-col items-center justify-center py-16" style={{ border: "2px dashed rgba(0,0,0,0.08)" }}>
          <ImageIcon className="w-12 h-12 mb-3" style={{ color: "var(--text-muted)" }} />
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>No projects to display yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultantProjects.map((project) => (
            <Link
              key={project.id}
              to={`/services/project/${project.id}`}
              className="gl-card group overflow-hidden hover-lift"
              style={{ padding: 0 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{project.title}</h4>
                  <p className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)" }}>
                    <MapPin className="w-3 h-3" /> {project.location}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-5 mb-3">
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>Area: {project.area}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }}>Budget: {project.budget}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  /* ── Team Tab ── */
  const renderTeam = () => (
    <div>
      {consultantTeam.length === 0 ? (
        <div className="gl-card flex flex-col items-center justify-center py-16" style={{ border: "2px dashed rgba(0,0,0,0.08)" }}>
          <Users className="w-12 h-12 mb-3" style={{ color: "var(--text-muted)" }} />
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Team information coming soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {consultantTeam.map((member) => (
            <div key={member.id} className="gl-card hover-lift" style={{ padding: "28px 24px", textAlign: "center" }}>
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center" style={{ background: member.avatar ? "transparent" : "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)", color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                )}
              </div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{member.name}</h4>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>{member.role}</p>
              <div className="space-y-1.5">
                <p className="flex items-center justify-center gap-2" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <Clock className="w-3.5 h-3.5" /> {member.experience}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{member.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── Reviews Tab ── */
  const renderReviews = () => (
    <div className="space-y-6">
      {/* Rating Breakdown */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center justify-center" style={{ minWidth: 140 }}>
            <span style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{consultant.rating}</span>
            <StarRating rating={consultant.rating} size={18} />
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>{consultant.reviewCount} reviews</p>
          </div>
          <div className="flex-1 space-y-2.5">
            {ratingBreakdown.map(({ stars, count }) => (
              <RatingBar key={stars} stars={stars} count={count} total={consultantReviews.length} />
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      {consultantReviews.length === 0 ? (
        <div className="gl-card flex flex-col items-center justify-center py-16" style={{ border: "2px dashed rgba(0,0,0,0.08)" }}>
          <MessageCircle className="w-12 h-12 mb-3" style={{ color: "var(--text-muted)" }} />
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultantReviews.map((review) => (
            <div key={review.id} className="gl-card" style={{ padding: "24px 28px" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>
                    {review.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{review.authorName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={review.rating} size={13} />
                      {review.projectTitle && (
                        <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}>
                          {review.projectTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 12 }}>
                {review.comment}
              </p>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors" style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-muted)", background: "rgba(0,0,0,0.03)" }}>
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── About Tab ── */
  const renderAbout = () => (
    <div className="space-y-6">
      {/* Full Description */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>About {consultant.name}</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-secondary)", whiteSpace: "pre-line" }}>
          {consultant.description || consultant.about}
        </p>
      </div>

      {/* Languages */}
      {consultant.languages && consultant.languages.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Languages</h3>
          <div className="flex flex-wrap gap-2.5">
            {consultant.languages.map((lang) => (
              <span key={lang} className="px-4 py-2 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 500, background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)", border: "1px solid rgba(0,0,0,0.06)" }}>
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {consultant.certifications && consultant.certifications.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Certifications</h3>
          <div className="space-y-3">
            {consultant.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <Shield className="w-4 h-4" style={{ color: "#10b981" }} />
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {consultant.socialLinks && consultant.socialLinks.length > 0 && (
        <div className="gl-card" style={{ padding: "28px 32px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Social Links</h3>
          <div className="flex flex-wrap gap-3">
            {consultant.socialLinks.map((link) => {
              const Icon = getSocialIcon(link.platform);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
                  style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-light)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                >
                  <Icon className="w-4 h-4" /> {link.platform}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Contact Information</h3>
        <div className="space-y-4">
          {consultant.contactInfo?.email && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Email</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{consultant.contactInfo.email}</p>
              </div>
            </div>
          )}
          {consultant.contactInfo?.phone && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                <Phone className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Phone</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{consultant.contactInfo.phone}</p>
              </div>
            </div>
          )}
          {consultant.socialLinks?.website && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                <Globe className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Website</p>
                <a href={consultant.socialLinks.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
                  {consultant.socialLinks.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Office Hours */}
      <div className="gl-card" style={{ padding: "28px 32px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Office Hours</h3>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" style={{ color: "var(--accent)" }} />
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>Mon - Sat, 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );

  const tabContent: Record<string, () => JSX.Element> = {
    overview: renderOverview,
    projects: renderProjects,
    team: renderTeam,
    reviews: renderReviews,
    about: renderAbout,
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── Back Navigation ── */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 transition-colors"
            style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
          </Link>
        </div>
      </div>

      {/* ── Profile Header ── */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-5 py-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  border: "4px solid #fff",
                  boxShadow: "var(--shadow-sm)",
                  background: consultant.avatar ? "transparent" : "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)",
                  color: "#fff",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
              >
                {consultant.avatar ? (
                  <img src={consultant.avatar} alt={consultant.name} className="w-full h-full object-cover" />
                ) : (
                  consultant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pb-5 pt-2">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{consultant.name}</h1>
                    {consultant.verified && (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#10b981", fill: "#10b981", stroke: "#fff" }} />
                    )}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: 8 }}>{consultant.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.72rem", fontWeight: 600, background: "var(--accent-light)", color: "var(--accent)" }}>
                      {category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={consultant.rating} size={15} />
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{consultant.rating}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({consultant.reviewCount} reviews)</span>
                    </div>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <MapPin className="w-3.5 h-3.5" /> {consultant.location.city}, {consultant.location.state}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "10px 20px" }}>
                    <Send className="w-4 h-4" /> Get Quote
                  </button>
                  <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "10px 20px" }}>
                    <MessageCircle className="w-4 h-4" /> Message
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-muted)" }}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {showShareMenu && (
                      <div className="absolute right-0 top-12 p-2 rounded-xl z-20" style={{ background: "rgba(255,255,255,0.98)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", minWidth: 160 }}>
                        {["Copy Link", "WhatsApp", "Email", "LinkedIn"].map((opt) => (
                          <button
                            key={opt}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                            style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}
                            onClick={() => setShowShareMenu(false)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                {[
                  { label: "Projects", value: consultant.projectCount, icon: Briefcase, color: "#ff6a3d" },
                  { label: "Reviews", value: consultant.reviewCount, icon: MessageCircle, color: "#6366f1" },
                  { label: "Years Exp", value: consultant.yearsExp, icon: Clock, color: "#10b981" },
                  { label: "Team Size", value: consultant.teamSize, icon: Users, color: "#f59e0b" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}12` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{stat.value}</p>
                      <p style={{ fontSize: "0.68rem", fontWeight: 500, color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{ background: "var(--glass-strong)", borderBottom: "var(--border)", position: "sticky", top: 0, zIndex: 30 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-3.5 transition-colors flex-shrink-0"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: "var(--accent)" }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {tabContent[activeTab]?.()}
          </div>

          {/* ── Sidebar (Desktop) ── */}
          <div className="hidden lg:block" style={{ width: 320, flexShrink: 0, position: "sticky", top: 80 }}>
            <div className="space-y-5">
              {/* Get Quote Form */}
              <div className="gl-card" style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Get a Free Quote</h3>
                {quoteSubmitted ? (
                  <div className="flex flex-col items-center py-6">
                    <CheckCircle className="w-12 h-12 mb-3" style={{ color: "#10b981" }} />
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#10b981" }}>Quote request sent!</p>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
                      style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl outline-none transition-all"
                      style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
                    />
                    <textarea
                      placeholder="Describe your project..."
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl outline-none transition-all resize-none"
                      style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-primary)" }}
                    />
                    <button type="submit" className="btn-primary w-full" style={{ fontSize: "0.82rem", padding: "10px 0" }}>
                      <Send className="w-4 h-4" /> Send Quote Request
                    </button>
                  </form>
                )}
              </div>

              {/* Location Map Placeholder */}
              <div className="gl-card overflow-hidden" style={{ padding: 0 }}>
                <div className="flex flex-col items-center justify-center py-10" style={{ background: "rgba(0,0,0,0.02)" }}>
                  <MapPin className="w-8 h-8 mb-2" style={{ color: "var(--accent)" }} />
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{consultant.location.city}, {consultant.location.state}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>Map view coming soon</p>
                </div>
              </div>

              {/* Similar Consultants */}
              {similarConsultants.length > 0 && (
                <div className="gl-card" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>Similar Consultants</h3>
                  <div className="space-y-3">
                    {similarConsultants.map((c) => (
                      <Link
                        key={c.id}
                        to={`/services/consultant/${c.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                        style={{ background: "rgba(0,0,0,0.02)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-light)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.02)"; }}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: c.avatar ? "transparent" : "linear-gradient(135deg, var(--accent) 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>
                          {c.avatar ? (
                            <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                          ) : (
                            c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</p>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)" }}>{c.rating}</span>
                            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>({c.reviewCount})</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
