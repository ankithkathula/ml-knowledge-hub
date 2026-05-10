import { Link } from "react-router";
import { Star, MapPin, ExternalLink, Award } from "lucide-react";

interface BrandCardProps {
  id: string;
  name: string;
  city?: string;
  region?: string;
  type?: string;
  tier?: string;
  specialization?: string;
  isFeatured?: boolean;
  coverImage?: string;
  accentColor?: string;
}

export function BrandCard({
  id,
  name,
  city,
  region,
  type,
  tier,
  specialization,
  isFeatured,
  coverImage,
  accentColor = "#ff6a3d",
}: BrandCardProps) {
  return (
    <Link
      to={`/brand/${id}`}
      className="group cursor-pointer relative overflow-hidden rounded-xl hover-lift transition-all"
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Fallback gradient if no cover image
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}ee 0%, ${accentColor}99 50%, ${accentColor}cc 100%)`,
            }}
          />
        )}
        
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg backdrop-blur-md" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <Star className="w-3 h-3" style={{ fill: "var(--accent)", color: "var(--accent)" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)" }}>Featured</span>
          </div>
        )}

        {/* Tier badge for regional brands */}
        {tier && tier !== "Premium" && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md" style={{ background: "rgba(168, 85, 247, 0.9)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "white" }}>{tier}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="glass-card p-4" style={{ borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <h3 className="font-bold mb-1 group-hover:text-[var(--accent)] transition-colors line-clamp-1" style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
          {name}
        </h3>

        {/* Metadata */}
        {(type || region || specialization) && (
          <p className="text-xs mb-3 line-clamp-1" style={{ color: "var(--text-secondary)" }}>
            {[type, region, specialization].filter(Boolean).join(" • ")}
          </p>
        )}

        {/* Location */}
        {city && (
          <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: "var(--accent)" }} />
            <span className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
              {city}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function BrandCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="h-32 bg-gray-200 animate-pulse" />
      <div className="glass-card p-4" style={{ borderTop: "none" }}>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
