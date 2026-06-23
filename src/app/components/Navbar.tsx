import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  LocateFixed,
  LayoutDashboard,
  User,
  LogOut,
  Heart,
  GraduationCap,
} from "lucide-react";
import { getAuthUser, clearAuthUser, isInstituteManager, type AuthUser } from "../utils/auth";
import { AvatarImg } from "./ui/AvatarImg";
import logoImage from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import { GlobalSearchBar } from "./GlobalSearchBar";

type NavLink = { label: string; href: string; desc?: string; accent?: string };
type NavLinkRich = { label: string; href: string; desc: string; accent: string; bg: string };
type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; children: NavLink[] }
  | { kind: "join"; label: string; children: NavLinkRich[] };

const DEFAULT_NAV: NavItem[] = [
  { kind: "link", label: "PRODUCTS", href: "/products" },
  { kind: "link", label: "BRANDS",   href: "/brands" },
  {
    kind: "menu",
    label: "CONSULTANTS",
    children: [
      { label: "Services", href: "/services" },
      { label: "Studios",  href: "/professionals" },
    ],
  },
  {
    kind: "menu",
    label: "RESOURCES",
    children: [
      { label: "Knowledge Hub",    href: "/" },
      { label: "Knowledge Center", href: "/kc" },
      { label: "Blog",             href: "/blog" },
      { label: "Courses",          href: "/courses" },
    ],
  },
  { kind: "link", label: "EVENTS",  href: "/events" },
  { kind: "link", label: "JOBS",    href: "/jobs" },
  { kind: "link", label: "FEED",    href: "/feed" },
  {
    kind: "join",
    label: "JOIN",
    children: [
      { label: "Students", href: "/v1/students/landing", desc: "Courses, placements, jobs & events",      accent: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
      { label: "Faculty",  href: "/v1/faculty/landing",  desc: "Teach, mentor & connect with institutes", accent: "#2563eb", bg: "rgba(37,99,235,0.08)"  },
      { label: "Studios",  href: "/v1/studios/landing",  desc: "Projects, clients & workspace tools",     accent: "#FF6A3D", bg: "rgba(255,106,61,0.08)"  },
      { label: "Brands",   href: "/v1/brands/landing",   desc: "Products, events & designer campaigns",   accent: "#d32f2f", bg: "rgba(211,47,47,0.08)"   },
    ],
  },
];

function getRoleNav(type: string | undefined): NavItem[] {
  switch (type) {
    case "Student":
      return [
        { kind: "link", label: "COURSES",    href: "/courses" },
        { kind: "link", label: "JOBS",       href: "/jobs" },
        { kind: "link", label: "EVENTS",     href: "/events" },
        { kind: "link", label: "FEED",       href: "/feed" },
      ];
    case "Faculty":
      return [
        { kind: "link", label: "MY COURSES", href: "/f/courses" },
        { kind: "link", label: "STUDENTS",   href: "/f/students" },
        { kind: "link", label: "RESEARCH",   href: "/f/research" },
        { kind: "link", label: "EVENTS",     href: "/events" },
        { kind: "link", label: "FEED",       href: "/feed" },
      ];
    case "Interior Designer":
      return [
        { kind: "link", label: "PRODUCTS",   href: "/products" },
        { kind: "link", label: "JOBS",       href: "/jobs" },
        { kind: "link", label: "EVENTS",     href: "/events" },
        { kind: "link", label: "WORKSPACE",  href: "/d/workspace" },
        { kind: "link", label: "FEED",       href: "/feed" },
      ];
    case "Brand":
      return [
        { kind: "link", label: "PRODUCTS",   href: "/products" },
        { kind: "link", label: "DESIGNERS",  href: "/professionals" },
        { kind: "link", label: "KC CENTRES", href: "/kc" },
        { kind: "link", label: "EVENTS",     href: "/events" },
        { kind: "link", label: "FEED",       href: "/feed" },
      ];
    case "Studio":
      return [
        { kind: "link", label: "PRODUCTS",   href: "/products" },
        { kind: "link", label: "PROJECTS",   href: "/studio/projects" },
        { kind: "link", label: "JOBS",       href: "/studio/jobs" },
        { kind: "link", label: "KC CENTRES", href: "/kc" },
        { kind: "link", label: "FEED",       href: "/feed" },
      ];
    case "Institute Manager":
      return [
        { kind: "link", label: "STUDENTS",   href: "/institute/students" },
        { kind: "link", label: "PLACEMENTS", href: "/institute/placements" },
        { kind: "link", label: "COURSES",    href: "/courses" },
        { kind: "link", label: "EVENTS",     href: "/institute/events" },
      ];
    case "Retail Customer":
      return [
        { kind: "link", label: "PRODUCTS",   href: "/products" },
        { kind: "link", label: "BRANDS",     href: "/brands" },
        { kind: "link", label: "EVENTS",     href: "/events" },
        { kind: "link", label: "SERVICES",   href: "/services" },
      ];
    case "Dealer":
      return [
        { kind: "link", label: "PRODUCTS",   href: "/products" },
        { kind: "link", label: "DESIGNERS",  href: "/professionals" },
        { kind: "link", label: "MY INVENTORY", href: "/dealer/inventory" },
        { kind: "link", label: "ORDERS",     href: "/dealer/orders" },
        { kind: "link", label: "MESSAGES",   href: "/dealer/messages" },
      ];
    default:
      return DEFAULT_NAV;
  }
}

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location, setLocation] = useState("Delhi");
  const [pincode, setPincode] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const [authUser, setAuthUserState] = useState<AuthUser | null>(() => getAuthUser());

  function getAvatarGradient(type: string | undefined): string {
    switch (type) {
      case "Interior Designer": return "linear-gradient(135deg,#8b5cf6,#6d28d9)";
      case "Studio":            return "linear-gradient(135deg,#FF6A3D,#e05528)";
      case "Brand":             return "linear-gradient(135deg,#0284c7,#0369a1)";
      case "Faculty":           return "linear-gradient(135deg,#2563eb,#1d4ed8)";
      case "Institute Manager": return "linear-gradient(135deg,#3b82f6,#2563eb)";
      case "Retail Customer":   return "linear-gradient(135deg,#0891b2,#0e7490)";
      case "Dealer":            return "linear-gradient(135deg,#f59e0b,#d97706)";
      default:                  return "linear-gradient(135deg,#8b5cf6,#6d28d9)";
    }
  }

  const [wishlistCount, setWishlistCount] = useState(() => {
    try { return (JSON.parse(localStorage.getItem("ml_wishlist") ?? "[]") as unknown[]).length; }
    catch { return 0; }
  });

  useEffect(() => {
    function syncAuth() { setAuthUserState(getAuthUser()); }
    function syncCount() {
      try { setWishlistCount((JSON.parse(localStorage.getItem("ml_wishlist") ?? "[]") as unknown[]).length); }
      catch { setWishlistCount(0); }
    }
    window.addEventListener("ml-auth-change", syncAuth);
    window.addEventListener("ml-wishlist-change", syncCount);
    window.addEventListener("storage", syncAuth);
    window.addEventListener("storage", syncCount);
    return () => {
      window.removeEventListener("ml-auth-change", syncAuth);
      window.removeEventListener("ml-wishlist-change", syncCount);
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  function signOut() {
    clearAuthUser();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate("/");
  }

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationPopupOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      setSearchOpen(false);
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
          {/* Logo zone — both ML logo + Knowledge Center logo from customer portal, link to v1 home */}
          <Link to="/v1" className="flex items-center gap-2 md:gap-3 flex-shrink-0" aria-label="Material Library home">
            <img
              src={logoImage}
              alt="Material Library"
              className="h-[17px] md:h-5 w-auto"
              style={{ maxHeight: "20px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {getRoleNav(authUser?.type).map((item) => (
              <NavButton key={item.label} item={item} pathname={routerLocation.pathname} />
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Search — icon button that expands to floating bar */}
            <button
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full transition-all"
              onMouseDown={(e) => {
                if (searchOpen) {
                  e.preventDefault();
                } else {
                  e.stopPropagation();
                  setSearchOpen(true);
                }
              }}
              aria-label="Search"
              style={{
                background: searchOpen ? "var(--accent)" : "rgba(0,0,0,0.045)",
                border: `1.5px solid ${searchOpen ? "var(--accent)" : "rgba(0,0,0,0.08)"}`,
                color: searchOpen ? "white" : "var(--text-muted)",
                boxShadow: searchOpen ? "0 0 0 3px rgba(255,106,61,0.15)" : "none",
              }}
            >
              <Search style={{ width: 14, height: 14 }} />
            </button>

            <GlobalSearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Location selector with popup */}
            <div className="relative hidden md:block" ref={locationRef}>
              <button
                onClick={() => setLocationPopupOpen(!locationPopupOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-all"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                <span style={{ fontWeight: 500, color: "var(--text-secondary)" }} className="max-w-[90px] truncate">
                  {location}
                </span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

              <AnimatePresence>
                {locationPopupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 rounded-xl p-4 z-50"
                    style={{
                      background: "rgba(255,255,255,0.98)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity" style={{ color: "var(--accent)" }}>
                        <LocateFixed className="w-3.5 h-3.5" /> Auto-detect location
                      </button>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter pincode..."
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full h-9 pl-3 pr-8 rounded-lg text-[11px] outline-none"
                          style={{
                            background: "rgba(0,0,0,0.04)",
                            border: "1px solid transparent",
                          }}
                        />
                        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Select City</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {CITIES.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                setLocation(city);
                                setLocationPopupOpen(false);
                              }}
                              className="text-left px-2 py-1.5 rounded text-[11px] uppercase tracking-widest font-bold transition-colors"
                              style={{ color: "var(--text-secondary)" }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block h-3 w-px mx-1" style={{ background: "rgba(0,0,0,0.1)" }} />

            {/* Desktop: auth-aware zone */}
            {authUser ? (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full transition-all"
                  style={{ background: userMenuOpen ? "rgba(139,92,246,0.1)" : "transparent" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)")}
                  onMouseLeave={(e) => !userMenuOpen && ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <AvatarImg src={authUser.avatarUrl} fallback={authUser.initials} size={28} fallbackBg={getAvatarGradient(authUser.type)} />
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>{authUser.name.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+8px)] w-52 rounded-2xl overflow-hidden z-50"
                      style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    >
                      <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{authUser.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{authUser.type}</div>
                      </div>
                      <div className="py-1.5">
                        {[
                          { to: authUser.profilePath, icon: User, label: "My Profile", color: "#8b5cf6", hover: "rgba(139,92,246,0.06)" },
                          { to: authUser.dashboardPath, icon: isInstituteManager(authUser) ? GraduationCap : LayoutDashboard, label: isInstituteManager(authUser) ? "Institute Dashboard" : "My Dashboard", color: isInstituteManager(authUser) ? "#3b82f6" : "#8b5cf6", hover: isInstituteManager(authUser) ? "rgba(59,130,246,0.06)" : "rgba(139,92,246,0.06)" },
                          { to: "/wishlist", icon: Heart, label: "My Wishlist", color: "#FF6A3D", hover: "rgba(255,106,61,0.06)", badge: wishlistCount || undefined },
                        ].map(({ to, icon: Icon, label, color, hover, badge }) => (
                          <Link key={to} to={to} onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = hover}
                            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                          >
                            <Icon className="w-4 h-4" style={{ color }} />
                            <span style={{ fontWeight: 500 }}>{label}</span>
                            {badge && <span className="ml-auto text-[10px] font-bold bg-[#FF6A3D] text-white px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
                          </Link>
                        ))}
                      </div>
                      <div className="py-1.5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all" style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.05)"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                        >
                          <LogOut className="w-4 h-4" /> <span style={{ fontWeight: 500 }}>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-semibold transition-all border"
                  style={{ color: "var(--text-secondary)", borderColor: "rgba(0,0,0,0.1)", background: userMenuOpen ? "rgba(0,0,0,0.04)" : "transparent" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={(e) => !userMenuOpen && ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  Account <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+8px)] w-40 rounded-2xl overflow-hidden z-50"
                      style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    >
                      <div className="py-1.5">
                        {[
                          { to: "/signin", label: "Sign In" },
                          { to: "/signup", label: "Sign Up" },
                        ].map(({ to, label }) => (
                          <Link key={to} to={to} onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2.5 text-[13px] transition-all"
                            style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"}
                            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile / tablet toggle */}
            <button
              className="lg:hidden p-2 rounded-full text-gray-500 hover:text-gray-800 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <div className="relative mb-2">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search brands, categories..."
                  className="gl-input"
                  style={{ paddingLeft: "36px", fontSize: "0.85rem" }}
                />
              </div>

              {getRoleNav(authUser?.type).flatMap((item) =>
                item.kind === "join"
                  ? [
                      <div key="join-header" className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700 }}>
                        Join as
                      </div>,
                      ...item.children.map((c) => (
                        <Link
                          key={`join-${c.href}`}
                          to={c.href}
                          className="px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3"
                          style={{ fontWeight: 500, color: "var(--text-secondary)" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c.accent }}>
                            {c.label[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>{c.label}</div>
                            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{c.desc}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto" style={{ color: c.accent }} />
                        </Link>
                      )),
                    ]
                  : item.kind === "menu"
                  ? [
                      <div key={item.label} className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700 }}>
                        {item.label}
                      </div>,
                      ...item.children.map((c) => (
                        <Link
                          key={`${item.label}-${c.href}`}
                          to={c.href}
                          className="px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between"
                          style={{ fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.03em" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span>{c.label}</span>
                          <ChevronRight className="w-4 h-4" style={{ color: "var(--accent)" }} />
                        </Link>
                      )),
                    ]
                  : [
                      <Link
                        key={item.label}
                        to={item.href}
                        className="px-3 py-3 rounded-lg text-sm transition-all flex items-center justify-between"
                        style={{ fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.03em" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      </Link>,
                    ]
              )}

              {/* Mobile auth section */}
              <div className="flex flex-col gap-1 mt-3 pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                {authUser ? (
                  <>
                    {/* Logged-in user card */}
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1" style={{ background: "rgba(139,92,246,0.06)" }}>
                      <AvatarImg src={authUser.avatarUrl} fallback={authUser.initials} size={36} fallbackBg={getAvatarGradient(authUser.type)} />
                      <div>
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{authUser.name}</p>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{authUser.type}</p>
                      </div>
                    </div>
                    {[
                      { to: authUser.profilePath, icon: User, label: "My Profile" },
                      { to: authUser.dashboardPath, icon: LayoutDashboard, label: "My Dashboard" },
                      { to: "/wishlist", icon: Heart, label: "My Wishlist", badge: wishlistCount || undefined },
                    ].map(({ to, icon: Icon, label, badge }) => (
                      <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm flex items-center justify-between"
                        style={{ fontWeight: 500, color: "var(--text-secondary)" }}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                          {label}
                          {badge && <span className="text-[10px] font-bold bg-[#FF6A3D] text-white px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </Link>
                    ))}
                    <button
                      onClick={signOut}
                      className="mt-1 w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
                      style={{ color: "#ef4444", fontWeight: 600 }}
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate("/signin"); setMobileOpen(false); }}
                      className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-xs"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", color: "var(--text-primary)", background: "transparent" }}
                    >
                      Sign In
                    </button>
                    <button onClick={() => { navigate("/signup"); setMobileOpen(false); }}
                      className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-xs text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Institute Dashboard — only visible to Institute Manager role */}
              {isInstituteManager(authUser) && (
                <div className="mt-1 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <p className="px-3 pb-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)", fontWeight: 700 }}>Institute</p>
                  <Link
                    to="/institute"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all"
                    style={{ fontWeight: 600, color: "#3b82f6" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.06)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <span className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4" />
                      Institute Dashboard
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                </div>
              )}

              {/* Mobile location */}
              <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.03)" }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <MapPin className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Deliver to</span>
                    <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>{location}</span>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    placeholder="Enter pincode..."
                    className="w-full h-10 pl-9 pr-3 rounded-lg text-xs outline-none"
                    style={{ background: "white", border: "1px solid transparent" }}
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Top-level nav button (link, hover-dropdown, or join-dropdown) ──────────
function NavButton({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const matchesPath = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const childMatch =
    (item.kind === "menu" && item.children.some((c) => matchesPath(c.href))) ||
    (item.kind === "join" && item.children.some((c) => matchesPath(c.href)));
  const isActive =
    (item.kind === "link" && matchesPath(item.href)) ||
    childMatch;

  const baseStyle: React.CSSProperties = {
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: isActive || open ? "var(--accent)" : "var(--text-secondary)",
    background: isActive || open ? "var(--accent-light)" : "transparent",
  };

  if (item.kind === "link") {
    return (
      <Link
        to={item.href}
        className="px-4 py-1.5 rounded-full text-[11px] transition-all"
        style={baseStyle}
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
        {item.label}
      </Link>
    );
  }

  if (item.kind === "join") {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="px-3.5 py-1.5 rounded-full text-[11px] transition-all flex items-center gap-1 font-semibold"
          style={{
            letterSpacing: "0.06em",
            color: open ? "white" : "var(--text-secondary)",
            background: open ? "var(--accent)" : "var(--accent-light)",
          }}
        >
          {item.label}
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full right-0 mt-1.5 w-64 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--text-muted)" }}>Join as</span>
              </div>
              <div className="p-2 flex flex-col gap-0.5">
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.bg)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-white" style={{ background: c.accent }}>
                      {c.label[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{c.label}</div>
                      <div className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>{c.desc}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: c.accent }} />
                  </Link>
                ))}
              </div>
              <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "var(--accent)" }}
                >
                  Sign up free <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Hover-dropdown menu (kind === "menu") — label is intentionally non-navigating
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-4 py-1.5 rounded-full text-[11px] transition-all flex items-center gap-1"
        style={baseStyle}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 rounded-xl overflow-hidden z-50"
            style={{
              background: "var(--glass-strong)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 14px 48px rgba(0,0,0,0.18)",
              border: "var(--border)",
            }}
          >
            <div className="p-2 flex flex-col gap-0.5">
              {item.children.map((c) =>
                c.desc ? (
                  <Link
                    key={c.href}
                    to={c.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-xl transition-all"
                    style={{ background: `${c.accent}0d` }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${c.accent}18`)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = `${c.accent}0d`)}
                  >
                    <div className="text-[13px] font-bold" style={{ color: c.accent }}>{c.label}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{c.desc}</div>
                  </Link>
                ) : (
                  <Link
                    key={c.href}
                    to={c.href}
                    className="flex items-center justify-between px-3 py-2 rounded-xl transition-all"
                    style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)" }}
                    onClick={() => setOpen(false)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {c.label}
                    <ChevronRight className="w-3 h-3 opacity-40" />
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
