import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logoImage from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";

type FooterCol = {
  title: string;
  links: { label: string; href: string }[];
};

// Existing ml_ui columns — kept intact.
const FOOTER_COLS: FooterCol[] = [
  {
    title: "Platform",
    links: [
      { label: "Services", href: "/services" },
      { label: "Jobs", href: "/jobs" },
      { label: "Courses", href: "/courses" },
      { label: "Knowledge Center", href: "/kc" },
      { label: "Studios", href: "/professionals/b" },
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


const BG = "linear-gradient(180deg, rgb(4,7,15) 0%, rgb(2,4,10) 100%)";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden mt-20"
      style={{
        background: BG,
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Decorative orange radials matching CP MainFooter */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,61,0.4) 0%, rgba(128,53,31,0.2) 22%, transparent 45%)",
          right: "-180px",
          top: "60%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,61,0.25) 0%, rgba(128,53,31,0.125) 25%, transparent 50%)",
          left: "-220px",
          top: "60%",
        }}
      />
      {/* Top fade strip */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: "200px",
          background: "linear-gradient(to bottom, rgba(255,106,61,0.05) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8 relative">
        {/* Newsletter strip */}
        <div
          className="rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p className="text-xs mb-0.5" style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Stay Informed
            </p>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: "1.05rem" }}>
              Get the latest construction & material insights
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
              Weekly updates on brands, regulations, and new products.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
            <input
              placeholder="Your email address"
              className="px-4 py-2.5 rounded-lg outline-none text-sm"
              style={{
                minWidth: "220px",
                fontSize: "0.82rem",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <button
              className="flex-shrink-0 px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: "var(--accent)", color: "white" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ff5a2d")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand zone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <div className="lg:col-span-1">
            <Link to="/v1" className="flex items-center gap-3 mb-4" aria-label="Material Library home">
              <img
                src={logoImage}
                alt="Material Library"
                className="h-5 w-auto"
                style={{ maxHeight: "20px", filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.7 }} className="mb-5 max-w-xs">
              India's first digital platform transforming the construction industry ecosystem — connecting brands, designers, and buyers.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { Icon: Mail, text: "contact@materiallibrary.in" },
                { Icon: Phone, text: "+91 123 456 7890" },
                { Icon: MapPin, text: "Mumbai, Maharashtra" },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Existing link columns */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLS.map((col) => (
              <FooterColumn key={col.title} col={col} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}>
            © 2026 Material Library
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Sitemap", href: "#" },
              { label: "Accessibility", href: "#" },
              { label: "Status", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", transition: "var(--t-fast)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ col }: { col: FooterCol }) {
  return (
    <div>
      <h5
        className="mb-3"
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {col.title}
      </h5>
      <ul className="space-y-2">
        {col.links.map((item) => (
          <li key={item.label}>
            {item.href === "#" ? (
              <a
                href="#"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", transition: "var(--t-fast)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.href}
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", transition: "var(--t-fast)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
