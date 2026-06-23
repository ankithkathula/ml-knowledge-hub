import { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Briefcase, FolderKanban, GraduationCap, PenSquare, Heart,
  Building2, CalendarCheck, Star, MessageSquare, BarChart3, Settings,
  ChevronLeft, ChevronRight, Menu, Bell, ExternalLink, Users, MapPin, Package, HelpCircle,
} from "lucide-react";
import { getAuthUser, setAuthUser as persistAuthUser, type AuthUser } from "../../utils/auth";
import { Navbar } from "../Navbar";
import { StudioOnboarding } from "./StudioOnboarding";
import { DashboardTourOverlay } from "../shared/DashboardTourOverlay";
import type { TourStep } from "../shared/DashboardTourOverlay";
import { isTourDone, markTourDone, resetTour } from "../../utils/tourStore";
import { AvatarImg } from "../ui/AvatarImg";

const ACCENT = "#FF6A3D";
const ACCENT_RGB = "255,106,61";

const NAV = [
  { label: "Dashboard",  href: "/studio",           icon: LayoutDashboard, exact: true },
  { label: "Jobs",       href: "/studio/jobs",      icon: Briefcase },
  { label: "Projects",   href: "/studio/projects",  icon: FolderKanban },
  { label: "Courses",    href: "/studio/courses",   icon: GraduationCap },
  { label: "Blogs",      href: "/studio/blogs",     icon: PenSquare },
  { label: "Bookings",   href: "/studio/bookings",  icon: CalendarCheck },
  { label: "KC Visits",  href: "/studio/kc-visits", icon: MapPin },
  { label: "Samples",    href: "/studio/samples",   icon: Package },
  { label: "Reviews",    href: "/studio/reviews",   icon: Star },
  { label: "Messages",   href: "/studio/messages",  icon: MessageSquare },
  { label: "Wishlist",   href: "/studio/wishlist",  icon: Heart },
];

const BOTTOM_NAV = [
  { label: "Analytics",      href: "/studio/analytics", icon: BarChart3 },
  { label: "Studio Profile", href: "/studio/profile",   icon: Building2 },
  { label: "Team",           href: "/studio/team",      icon: Users },
  { label: "Settings",       href: "/studio/settings",  icon: Settings },
];

const NOTIFICATIONS = [
  { icon: FolderKanban, color: "#FF6A3D", text: "Client Isha Mehta approved the Bandra project concept", time: "20m ago", unread: true },
  { icon: Star, color: "#f59e0b", text: "New 5-star review from Ravi Sharma — Waterproofing Consultation", time: "2h ago", unread: true },
  { icon: CalendarCheck, color: "#10b981", text: "Booking confirmed: Ananya Iyer on Apr 4, 2:00 PM", time: "1d ago", unread: false },
  { icon: MessageSquare, color: "#8b5cf6", text: "New message from Priya Desai re: flooring recommendations", time: "2d ago", unread: false },
];

export function StudioDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());
  const [showTour, setShowTour] = useState(() => !isTourDone("studio"));
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  function startTour() { resetTour("studio"); setShowTour(true); setMobileOpen(false); }
  function closeTour() { markTourDone("studio"); setShowTour(false); }

  const STEPS: TourStep[] = [
    {
      icon: <span style={{ fontSize: "2rem" }}>🏢</span>,
      title: "Your Studio Command Centre",
      body: "Everything you need to run your studio — daily schedule, client visits, team status, and communications — laid out as a single at-a-glance board.",
      anchor: "center",
      targetId: "tour-studio-greeting",
    },
    {
      icon: <CalendarCheck className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Day Planner",
      body: "All today's appointments on a single 8 AM–6 PM timeline. Live traffic badges flag heavy-traffic routes so you're never caught off guard on the way to a site visit.",
      anchor: "bottom-right",
      hint: "↑ Day Planner is above",
      targetId: "tour-studio-day-planner",
    },
    {
      icon: <MapPin className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Smart Route Planner",
      body: "Site visits are ordered by proximity and estimated travel time. The embedded Google Maps view shows your optimised route for the day so you spend less time driving.",
      anchor: "bottom-right",
      hint: "↑ Route Planner & map are above",
      targetId: "tour-studio-route-planner",
    },
    {
      icon: <span style={{ fontSize: "1.8rem" }}>📅</span>,
      title: "Calendar · Holidays · Team",
      body: "The middle column keeps your week on track — appointment dots on the mini-calendar, upcoming national holidays and studio closures, and a live view of who on your team is in-office, remote, or on leave today.",
      anchor: "bottom-center",
      targetId: "tour-studio-schedule-col",
    },
    {
      icon: <BarChart3 className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Hub Overview",
      body: "A snapshot of all 12 studio modules — Jobs, Bookings, Reviews, Samples, Wishlist, and more — with live counts. Click any tile to jump straight to that section.",
      anchor: "bottom-right",
      hint: "↑ Hub Overview is above",
      targetId: "tour-studio-hub-overview",
    },
    {
      icon: <MessageSquare className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Social Inbox",
      body: "Google reviews, Instagram DMs, WhatsApp enquiries and LinkedIn messages — all in one feed. Unread items are highlighted so you never miss a lead.",
      anchor: "bottom-right",
      hint: "↑ Social Inbox is above",
      targetId: "tour-studio-social-inbox",
    },
    {
      icon: <FolderKanban className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Navigate your studio tools",
      body: "The sidebar gives instant access to Jobs, Projects, Courses, Bookings, KC Visits, Samples, Reviews, Messages, Analytics, and Team management.",
      anchor: "bottom-left",
      hint: "← Sidebar is to the left",
      targetId: "tour-studio-sidebar",
    },
  ];

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const sync = () => setAuthUser(getAuthUser());
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("ml_studio_onboarded")) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    const user = getAuthUser();
    if (user?.type === "Studio" && (user.name !== "Studio Materium" || user.initials !== "SM")) {
      persistAuthUser({ ...user, name: "Studio Materium", initials: "SM" });
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

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  const name = authUser?.name ?? "Studio Materium";
  const initials = authUser?.initials ?? "SM";
  const type = authUser?.type ?? "Studio";
  const firstName = name.split(" ")[0];

  const sidebarContent = (
    <div className="flex flex-col h-full">
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
            Studio Hub
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
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

      <div className="px-2 flex-shrink-0 space-y-0.5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 8 }}>
        {BOTTOM_NAV.map((item) => {
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
              {!collapsed && <span className="truncate" style={{ fontSize: "0.82rem" }}>{item.label}</span>}
            </Link>
          );
        })}
        <Link
          to="/v1/studios/microsite/bdp-india"
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

      {!collapsed && (
        <div className="px-3 pb-3 flex-shrink-0">
          <div
            className="flex items-center gap-2.5 p-3 rounded-xl"
            style={{ background: `rgba(${ACCENT_RGB},0.06)` }}
          >
            <AvatarImg src={authUser?.avatarUrl} fallback={initials} size={32} />
            <div className="min-w-0">
              <div
                style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }}
                className="truncate"
              >
                {name}
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                {type}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "#fff7f5" }}>
      <Navbar />

      {showOnboarding && (
        <StudioOnboarding onComplete={() => setShowOnboarding(false)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside
          id="tour-studio-sidebar"
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

        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 flex"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <aside
              className="relative w-64 flex flex-col"
              style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
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
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {`Hi, ${firstName} 👋`}
              </span>
            </div>

            <div className="flex items-center gap-2">
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
                      style={{ background: ACCENT }}
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
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          Notifications
                        </span>
                        {unreadCount > 0 && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                            style={{ background: ACCENT }}
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
                                background: n.unread ? `rgba(${ACCENT_RGB},0.03)` : "transparent",
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)")
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
                                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
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
                        <button style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }}>
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showTour && <DashboardTourOverlay steps={STEPS} accent={ACCENT} accentRGB={ACCENT_RGB} onClose={closeTour} />}
      </AnimatePresence>

      <AnimatePresence>
        {!showTour && (
          <motion.button
            key="tour-help-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={startTour}
            className="fixed bottom-6 right-6 z-[190] flex items-center gap-2 px-3.5 py-2.5 rounded-full text-white text-xs font-semibold shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 4px 20px rgba(${ACCENT_RGB},0.4)` }}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Tour</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
