import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MapPin, Bell, Menu, X, Search, ChevronDown, Zap, Settings, LayoutDashboard, LogOut, User, Briefcase, GraduationCap, Building2 } from "lucide-react";

const NAV_LINKS = [
  { label: "BRANDS", href: null },
  { label: "PRODUCTS", href: null },
  { label: "RESOURCES", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROFESSIONALS", href: "/professionals" },
  { label: "FEED", href: "/feed" },
  // { label: "JOBS", href: "/jobs" },
  // { label: "COURSES", href: "/courses" },
  // { label: "KC", href: "/kc" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 gl-nav"
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[58px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--accent)", boxShadow: "0 3px 10px rgba(255,106,61,0.35)" }}
            >
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              material
              <span style={{ color: "var(--accent)" }}>library</span>
            </span>
            <span
              className="text-white text-xs px-1.5 py-0.5 rounded"
              style={{ background: "var(--text-primary)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.05em" }}
            >
              KC
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href && location.pathname === link.href;
              const isDisabled = !link.href;
              
              if (isDisabled) {
                return (
                  <button
                    key={link.label}
                    disabled
                    className="px-3.5 py-2 rounded-lg text-xs transition-all cursor-not-allowed"
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "var(--text-muted)",
                      background: "transparent",
                      opacity: 0.5,
                    }}
                  >
                    {link.label}
                  </button>
                );
              }
              
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3.5 py-2 rounded-lg text-xs transition-all"
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    background: isActive ? "var(--accent-light)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="hidden md:flex items-center gap-2 animate-in slide-in-from-right-2">
                <input
                  autoFocus
                  placeholder="Search brands, categories..."
                  className="gl-input text-xs"
                  style={{ width: "220px", padding: "8px 14px", borderRadius: "var(--r-sm)" }}
                  onBlur={() => setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-gray-700 transition-all"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              className="hidden md:flex items-center gap-1.5 text-gray-500 hover:text-gray-800 px-2 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>122004</span>
            </button>

            <button
              className="hidden md:flex p-2 rounded-lg transition-all relative"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </button>

            {/* Avatar with Admin Menu */}
            <div className="relative" ref={profileMenuRef}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs cursor-pointer"
                style={{ background: "linear-gradient(135deg, var(--accent) 0%, #e8522a 100%)", fontWeight: 700, boxShadow: "var(--shadow-orange)" }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                K
              </div>
              {profileMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "rgba(255,255,255,0.98)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Admin User</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>admin@materiallibrary.com</div>
                  </div>
                  <div className="py-1">
                    {[
                      { to: "/u", icon: User, label: "Professional Dashboard" },
                      { to: "/studio", icon: Building2, label: "Studio Dashboard" },
                      { to: "/admin", icon: LayoutDashboard, label: "Admin Console" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-2.5 transition-all"
                        style={{ color: "var(--text-secondary)", fontSize: "0.82rem", fontWeight: 500 }}
                        onClick={() => setProfileMenuOpen(false)}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.06)";
                          (e.currentTarget as HTMLElement).style.color = "#ff6a3d";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        }}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="py-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <button
                      className="flex items-center gap-3 px-4 py-2.5 w-full transition-all"
                      style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 500 }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)";
                        (e.currentTarget as HTMLElement).style.color = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
          style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}
        >
          {/* Mobile search */}
          <div className="relative mb-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search brands, categories..."
              className="gl-input"
              style={{ paddingLeft: "36px", fontSize: "0.85rem" }}
            />
          </div>
          {NAV_LINKS.map((link) => {
            const isDisabled = !link.href;
            
            if (isDisabled) {
              return (
                <button
                  key={link.label}
                  disabled
                  className="px-3 py-2.5 rounded-lg text-sm transition-all cursor-not-allowed text-left"
                  style={{
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    letterSpacing: "0.03em",
                    opacity: 0.5,
                  }}
                >
                  {link.label}
                </button>
              );
            }
            
            return (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.03em",
                }}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 pt-3 border-t flex items-center gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Location: 122004</span>
          </div>
        </div>
      )}
    </header>
  );
}