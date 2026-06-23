import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  MapPin, Phone, Globe, Mail, Package, CheckCircle, Star,
  MessageSquare, ExternalLink, Eye, TrendingUp, Building2,
  ShieldCheck,
} from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#f59e0b";
const ACCENT_RGB = "245,158,11";

/* ── mock data ───────────────────────────────────────────────────────────────*/

const DEALER = {
  id: "buildmart-india",
  name: "BuildMart India",
  initials: "BM",
  tagline: "Authorised distributor of premium building materials across North & South India",
  type: "Authorised Dealer · Multi-brand Distributor",
  established: "2008",
  location: "Delhi NCR",
  phone: "+91 98100 45678",
  email: "sales@buildmart.in",
  website: "buildmart.in",
  gstin: "07AACCB1234A1Z5",
  rating: 4.7,
  reviewCount: 112,
  stats: [
    { label: "Products Listed", value: "43" },
    { label: "Pin Codes Served", value: "18" },
    { label: "Cities Active", value: "5" },
    { label: "Years in Business", value: "16+" },
  ],
  about: `BuildMart India is one of Delhi NCR's leading authorised distributors of construction and finishing materials. Established in 2008, we work directly with brands like UltraTech, Tata Steel, Asian Paints, Kajaria, and Havells to supply architects, interior designers, and contractors across North and South India.\n\nWe offer competitive pricing, reliable stock availability, and same-day delivery within our serviceable pin codes. Our team of 40+ material specialists is available to assist with product selection, quantity estimation, and on-site technical queries.`,
  brands: [
    { name: "UltraTech Cement", color: "#d32f2f" },
    { name: "Tata Steel",       color: "#1565c0" },
    { name: "Asian Paints",     color: "#6a1b9a" },
    { name: "Kajaria",          color: "#00695c" },
    { name: "Havells",          color: "#e65100" },
    { name: "Pidilite",         color: "#1b5e20" },
  ],
  listings: [
    { name: "UltraTech OPC 53 Grade Cement",   brand: "UltraTech",    category: "Cement",        price: "₹420/bag",    views: 840, enquiries: 34 },
    { name: "Tata Tiscon Fe 500D TMT Bar 12mm", brand: "Tata Steel",   category: "Steel",         price: "₹68/kg",      views: 610, enquiries: 22 },
    { name: "Asian Paints Apex Ultima 10L",     brand: "Asian Paints", category: "Paint",         price: "₹2,840/can",  views: 490, enquiries: 18 },
    { name: "Kajaria Jazz Porcelain 600×600",   brand: "Kajaria",      category: "Tiles",         price: "₹68/sq ft",   views: 380, enquiries: 11 },
    { name: "Havells Concealed Wire 2.5 sq mm", brand: "Havells",      category: "Electrical",    price: "₹3,200/coil", views: 270, enquiries: 8  },
    { name: "Pidilite Dr Fixit Raincoat 4L",    brand: "Pidilite",     category: "Waterproofing", price: "₹1,560/can",  views: 210, enquiries: 6  },
  ],
  serviceAreas: [
    { state: "Delhi", pincodes: ["110001", "110016", "110048", "110063"] },
    { state: "Maharashtra", pincodes: ["400001", "400050", "400076", "400097"] },
    { state: "Karnataka", pincodes: ["560001", "560034"] },
    { state: "Telangana", pincodes: ["500001", "500032"] },
    { state: "Tamil Nadu", pincodes: ["600001"] },
  ],
  reviews: [
    { name: "Ankit Sharma",          type: "Interior Designer",   rating: 5, text: "Reliable stock and same-day delivery on OPC 53 cement. Pricing was transparent — no hidden charges.", date: "Apr 2026" },
    { name: "Morphogenesis",          type: "Studio",              rating: 5, text: "Used BuildMart for our Powai commercial project. The TMT bars arrived on schedule and grade was verified.", date: "Mar 2026" },
    { name: "Livspace",               type: "Studio",              rating: 4, text: "Good range of Kajaria tiles in stock. Would have liked faster response on the initial enquiry.", date: "Feb 2026" },
  ],
};

/* ── helpers ─────────────────────────────────────────────────────────────────*/

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-2.5 mb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "1rem" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.1)` }}>
          <Icon style={{ color: ACCENT, width: 16, height: 16 }} />
        </div>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          style={{ width: 13, height: 13, color: n <= Math.round(rating) ? ACCENT : "rgba(0,0,0,0.15)", fill: n <= Math.round(rating) ? ACCENT : "transparent" }}
        />
      ))}
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export function DealerPublicProfilePage() {
  const { dealerId = "" } = useParams<{ dealerId: string }>();
  const [isOwner, setIsOwner] = useState(() => getAuthUser()?.id === "buildmart-dealer");

  useEffect(() => {
    const handler = () => setIsOwner(getAuthUser()?.id === "buildmart-dealer");
    window.addEventListener("ml-auth-change", handler);
    return () => window.removeEventListener("ml-auth-change", handler);
  }, []);

  if (dealerId !== DEALER.id) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fffbeb" }}>
        <div className="text-center">
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Store not found</div>
          <Link to="/products" className="mt-3 block text-sm font-semibold" style={{ color: ACCENT }}>← Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#fffbeb" }}>
      {/* Hero banner */}
      <div style={{ background: `linear-gradient(135deg,#d97706 0%,${ACCENT} 50%,#fbbf24 100%)`, height: 180 }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 pb-24 space-y-5">

        {/* Header card */}
        <div className="rounded-2xl p-5 sm:p-6" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div className="flex flex-col sm:flex-row gap-5">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black flex-shrink-0"
              style={{ background: `linear-gradient(135deg,#d97706,${ACCENT})`, border: "4px solid white", boxShadow: `0 4px 12px rgba(${ACCENT_RGB},0.4)`, marginTop: -48 }}
            >
              {DEALER.initials}
            </div>

            <div className="flex-1 min-w-0 mt-2 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                    {DEALER.name}
                  </h1>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 4, fontWeight: 500 }}>
                    {DEALER.type}
                  </p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <MapPin style={{ width: 13, height: 13 }} />{DEALER.location}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Building2 style={{ width: 13, height: 13 }} />Est. {DEALER.established}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={DEALER.rating} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: ACCENT }}>{DEALER.rating}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({DEALER.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                  {isOwner ? (
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ border: `1.5px solid rgba(${ACCENT_RGB},0.3)`, color: ACCENT }}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: ACCENT, boxShadow: `0 3px 12px rgba(${ACCENT_RGB},0.35)` }}
                    >
                      <MessageSquare style={{ width: 14, height: 14 }} /> Send Enquiry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {DEALER.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: ACCENT }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div className="flex items-center gap-4 mt-5 pt-5 flex-wrap" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <a href={`tel:${DEALER.phone}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.08)` }}>
                <Phone style={{ width: 14, height: 14, color: ACCENT }} />
              </div>
              {DEALER.phone}
            </a>
            <a href={`mailto:${DEALER.email}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.08)` }}>
                <Mail style={{ width: 14, height: 14, color: ACCENT }} />
              </div>
              {DEALER.email}
            </a>
            <a href={`https://${DEALER.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.08)` }}>
                <Globe style={{ width: 14, height: 14, color: ACCENT }} />
              </div>
              {DEALER.website}
            </a>
            <div className="ml-auto flex items-center gap-2" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <ShieldCheck style={{ width: 14, height: 14, color: "#10b981" }} />
              GSTIN: {DEALER.gstin}
            </div>
          </div>
        </div>

        {/* About */}
        <SectionCard title="About" icon={Building2}>
          {DEALER.about.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75, marginTop: i > 0 ? 12 : 0 }}>
              {para}
            </p>
          ))}
        </SectionCard>

        {/* Brands carried */}
        <SectionCard title="Brands We Carry" icon={ShieldCheck}>
          <div className="flex flex-wrap gap-2">
            {DEALER.brands.map((b) => (
              <span
                key={b.name}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold"
                style={{ background: `${b.color}10`, color: b.color, border: `1px solid ${b.color}25` }}
              >
                <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-black" style={{ background: b.color }}>
                  {b.name[0]}
                </div>
                {b.name}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Listings on ML */}
        <SectionCard title="Products Available on Material Library" icon={Package}>
          <div className="space-y-1">
            {DEALER.listings.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center gap-3 py-3 cursor-pointer transition-all rounded-xl px-2"
                style={{ borderBottom: idx < DEALER.listings.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.04)`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    {item.brand} · {item.category}
                  </div>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", flexShrink: 0 }}>
                  {item.price}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    <Eye style={{ width: 11, height: 11 }} />{item.views}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    <TrendingUp style={{ width: 11, height: 11 }} />{item.enquiries}
                  </span>
                </div>
                <ExternalLink style={{ width: 13, height: 13, color: "var(--text-muted)", flexShrink: 0 }} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/products" className="flex items-center gap-1 text-sm font-semibold" style={{ color: ACCENT }}>
              Browse all products on Material Library <ExternalLink style={{ width: 13, height: 13 }} />
            </Link>
          </div>
        </SectionCard>

        {/* Service Areas */}
        <SectionCard title="Service Areas" icon={MapPin}>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 16 }}>
            We deliver to {DEALER.serviceAreas.reduce((sum, s) => sum + s.pincodes.length, 0)} pin codes across {DEALER.serviceAreas.length} states. Contact us to confirm availability in your area.
          </p>
          <div className="space-y-4">
            {DEALER.serviceAreas.map((area) => (
              <div key={area.state}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                  {area.state}
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.pincodes.map((pin) => (
                    <span
                      key={pin}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT, border: `1px solid rgba(${ACCENT_RGB},0.15)` }}
                    >
                      <CheckCircle style={{ width: 10, height: 10 }} />
                      {pin}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 flex items-center gap-2 p-3 rounded-xl"
            style={{ background: `rgba(${ACCENT_RGB},0.05)`, border: `1px dashed rgba(${ACCENT_RGB},0.25)` }}
          >
            <MapPin style={{ width: 14, height: 14, color: ACCENT, flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              Don't see your pin code? <button className="font-semibold" style={{ color: ACCENT }}>Send an enquiry</button> — we may be able to arrange delivery.
            </span>
          </div>
        </SectionCard>

        {/* Reviews */}
        <SectionCard title={`Reviews (${DEALER.reviewCount})`} icon={Star}>
          <div className="flex items-center gap-4 mb-5 p-4 rounded-xl" style={{ background: `rgba(${ACCENT_RGB},0.05)` }}>
            <div className="text-center">
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: ACCENT, lineHeight: 1 }}>{DEALER.rating}</div>
              <StarRating rating={DEALER.rating} />
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>{DEALER.reviewCount} reviews</div>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5,4,3,2,1].map((n) => {
                const pct = n === 5 ? 72 : n === 4 ? 18 : n === 3 ? 7 : n === 2 ? 2 : 1;
                return (
                  <div key={n} className="flex items-center gap-2">
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", width: 12, flexShrink: 0 }}>{n}</span>
                    <Star style={{ width: 10, height: 10, color: ACCENT, fill: ACCENT, flexShrink: 0 }} />
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", width: 28, flexShrink: 0 }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {DEALER.reviews.map((r) => (
              <div
                key={r.name}
                className="p-4 rounded-xl"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${ACCENT},#d97706)` }}
                    >
                      {r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{r.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{r.type}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <StarRating rating={r.rating} />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{r.date}</span>
                  </div>
                </div>
                <p className="mt-3 italic" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CTA */}
        {!isOwner && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `linear-gradient(135deg,#d97706,${ACCENT})`, color: "white" }}
          >
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 6 }}>
              Need building materials for your project?
            </h3>
            <p style={{ fontSize: "0.88rem", opacity: 0.9, marginBottom: 20 }}>
              Send an enquiry and a BuildMart specialist will respond within 2 hours.
            </p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "white", color: ACCENT }}
            >
              <MessageSquare style={{ width: 16, height: 16 }} />
              Send Enquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
