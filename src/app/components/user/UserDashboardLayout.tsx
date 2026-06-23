import { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Image, Briefcase, GraduationCap, Bookmark,
  MapPin, Activity, MessageSquare, User, Settings,
  ChevronLeft, ChevronRight, Menu, Bell, Award, ExternalLink,
} from "lucide-react";
import { getAuthUser, type AuthUser } from "../../utils/auth";
import { AvatarImg } from "../ui/AvatarImg";
import { Navbar } from "../Navbar";
import { StudentOnboarding } from "./StudentOnboarding";

const USER_NAV = [
  { label: "Dashboard",  href: "/u",            icon: LayoutDashboard },
  { label: "Portfolio",  href: "/u/portfolio",  icon: Image },
  { label: "Jobs",       href: "/u/jobs",       icon: Briefcase },
  { label: "Courses",    href: "/u/courses",    icon: GraduationCap },
  { label: "Placements", href: "/u/placements", icon: Award },
  { label: "Bookmarks",  href: "/u/bookmarks",  icon: Bookmark },
  { label: "KC Visits",  href: "/u/kc-visits",  icon: MapPin },
  { label: "Activity",   href: "/u/activity",   icon: Activity },
  { label: "Messages",   href: "/u/messages",   icon: MessageSquare },
  { label: "Profile",    href: "/u/profile",    icon: User },
  { label: "Settings",   href: "/u/settings",   icon: Settings },
];

const NOTIFICATIONS = [
  { icon: Briefcase,     color: "#6366f1", text: "DesignCraft Studio viewed your profile",             time: "10m ago", unread: true  },
  { icon: GraduationCap, color: "#a855f7", text: "Green Building: new module released",                time: "2h ago",  unread: true  },
  { icon: Award,         color: "#FF6A3D", text: "Placement drive at Morphogenesis — apply by May 20", time: "5h ago",  unread: false },
  { icon: MessageSquare, color: "#10b981", text: "Dr. Ravi Kumar accepted your connection request",     time: "1d ago",  unread: false },
];

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

export function UserDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const sync = () => setAuthUser(getAuthUser());
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("ml_student_onboarded")) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/u") return location.pathname === "/u";
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Label */}
      <div
        className="flex items-center px-4 h-[52px] flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        {!collapsed && (
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Student Portal
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {USER_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: active ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
                  color: active ? ACCENT : "var(--text-secondary)",
                  fontWeight: active ? 700 : 500,
                }}
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.06)`;
                    (e.currentTarget as HTMLElement).style.color = ACCENT;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                {!collapsed && (
                  <span className="truncate" style={{ fontSize: "0.82rem" }}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* View public profile link */}
      <div className="px-2 pb-1 flex-shrink-0" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 8 }}>
        <Link
          to="/student/priya-mehta"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
          style={{ color: ACCENT, fontWeight: 500 }}
          title={collapsed ? "View Public Profile" : undefined}
          onClick={() => setMobileOpen(false)}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.06)`)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <ExternalLink style={{ width: 18, height: 18, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: "0.82rem" }}>View Public Profile</span>}
        </Link>
      </div>

      {/* User card */}
      {authUser && !collapsed && (
        <div className="px-3 pb-3 flex-shrink-0">
          <div
            className="flex items-center gap-2.5 p-3 rounded-xl"
            style={{ background: `rgba(${ACCENT_RGB},0.06)` }}
          >
            <AvatarImg src={authUser.avatarUrl} fallback={authUser.initials} size={32} fallbackBg={`linear-gradient(135deg,${ACCENT},#4f46e5)`} />
            <div className="min-w-0">
              <div
                style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}
                className="truncate"
              >
                {authUser.name}
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{authUser.type}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "#f5f7fb" }}>
      <Navbar />

      {showOnboarding && (
        <StudentOnboarding onComplete={() => setShowOnboarding(false)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className="hidden md:flex flex-col flex-shrink-0 relative transition-all duration-300"
          style={{
            width: collapsed ? 64 : 240,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            borderRight: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {sidebarContent}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </button>
        </aside>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 flex"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <aside
              className="relative w-64 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header
            className="flex items-center justify-between h-[52px] px-4 sm:px-6 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-lg"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <span
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                {authUser ? `Hi, ${authUser.name.split(" ")[0]} 👋` : "Student Dashboard"}
              </span>
            </div>

            {/* Notifications bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: notifOpen ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
                  color: notifOpen ? ACCENT : "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.08)`;
                  (e.currentTarget as HTMLElement).style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  if (!notifOpen) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                <Bell style={{ width: 18, height: 18 }} />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: "#FF6A3D" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+8px)] w-80 rounded-2xl overflow-hidden z-50"
                    style={{
                      background: "rgba(255,255,255,0.98)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ background: "#FF6A3D" }}
                        >
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="py-1 max-h-72 overflow-y-auto">
                      {NOTIFICATIONS.map((n, idx) => {
                        const Icon = n.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 px-4 py-3 transition-all cursor-pointer"
                            style={{
                              background: n.unread
                                ? `rgba(${ACCENT_RGB},0.03)`
                                : "transparent",
                            }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLElement).style.background =
                                "rgba(0,0,0,0.03)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLElement).style.background = n.unread
                                ? `rgba(${ACCENT_RGB},0.03)`
                                : "transparent")
                            }
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${n.color}18` }}
                            >
                              <Icon style={{ width: 15, height: 15, color: n.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                style={{
                                  fontSize: "0.78rem",
                                  fontWeight: n.unread ? 600 : 400,
                                  color: "var(--text-primary)",
                                  lineHeight: 1.4,
                                }}
                              >
                                {n.text}
                              </p>
                              <span
                                style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}
                              >
                                {n.time}
                              </span>
                            </div>
                            {n.unread && (
                              <div
                                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                style={{ background: ACCENT }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="px-4 py-2.5 text-center"
                      style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <button
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: ACCENT,
                        }}
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
