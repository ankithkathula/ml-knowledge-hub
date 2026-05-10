import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Zap, ArrowRight, Star } from "lucide-react";

const FOOTER_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Services", href: "/services" },
      { label: "Jobs", href: "/jobs" },
      { label: "Courses", href: "/courses" },
      { label: "Knowledge Center", href: "/kc" },
      { label: "Professionals B", href: "/professionals/b" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "For You",
    links: [
      { label: "For Brands", href: "#" },
      { label: "For Designers", href: "#" },
      { label: "For Students", href: "#" },
      { label: "For Studios", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden mt-20"
      style={{ background: "linear-gradient(160deg, #fff8f5 0%, #f5f7fb 50%, #fdf4ef 100%)", borderTop: "var(--border)" }}
    >
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,61,0.07) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,61,0.05) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8 relative">
        {/* Newsletter strip */}
        <div
          className="rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--glass-strong)",
            border: "var(--border)",
            boxShadow: "var(--shadow-md)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p className="text-xs mb-0.5" style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Stay Informed
            </p>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.05rem" }}>
              Get the latest lighting industry insights
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              Weekly updates on brands, regulations, and new products.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
            <input
              placeholder="Your email address"
              className="gl-input"
              style={{ minWidth: "220px", fontSize: "0.82rem" }}
            />
            <button className="btn-primary flex-shrink-0">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--accent)", boxShadow: "0 3px 10px rgba(255,106,61,0.3)" }}
              >
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                material<span style={{ color: "var(--accent)" }}>library</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.7 }} className="mb-5 max-w-xs">
              India's first digital platform transforming the construction industry ecosystem — connecting brands, designers, and buyers.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.8)", border: "var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-orange)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.8)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            {/* Contact mini */}
            <div className="space-y-2">
              {[
                { Icon: Mail, text: "contact@materiallibrary.in" },
                { Icon: Phone, text: "+91 123 456 7890" },
                { Icon: MapPin, text: "Mumbai, Maharashtra" },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h5
                className="mb-3"
                style={{ color: "var(--text-primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                {col.title}
              </h5>
              <ul className="space-y-2">
                {col.links.map((item) => (
                  <li key={item.label}>
                    {item.href === "#" ? (
                      <a
                        href="#"
                        style={{ color: "var(--text-secondary)", fontSize: "0.8rem", transition: "var(--t-fast)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        style={{ color: "var(--text-secondary)", fontSize: "0.8rem", transition: "var(--t-fast)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "var(--border)" }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
            © 2025 MaterialLibrary Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: "var(--text-muted)", fontSize: "0.72rem", transition: "var(--t-fast)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Rate Brand button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="btn-primary shadow-xl"
          style={{ borderRadius: "var(--r-full)", padding: "10px 18px", fontSize: "0.78rem", boxShadow: "var(--shadow-orange)" }}
        >
          <Star className="w-4 h-4" /> Rate a Brand
        </button>
      </div>
    </footer>
  );
}