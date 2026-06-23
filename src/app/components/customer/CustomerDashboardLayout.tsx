import { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderOpen, Layout, User, Settings, Heart, BarChart2,
  ChevronLeft, ChevronRight, Menu, Bell, CalendarCheck, HelpCircle,
} from "lucide-react";
import { getAuthUser, type AuthUser } from "../../utils/auth";
import { Navbar } from "../Navbar";
import { DashboardTourOverlay } from "../shared/DashboardTourOverlay";
import type { TourStep } from "../shared/DashboardTourOverlay";
import { isTourDone, markTourDone, resetTour } from "../../utils/tourStore";

const ACCENT = "#0891b2";
const ACCENT_RGB = "8,145,178";

const NAV = [
  { label: "Projects",      href: "/u/projects",    icon: FolderOpen },
  { label: "Moodboard",     href: "/u/moodboard",   icon: Layout },
  { label: "My Activities", href: "/u/activities",  icon: CalendarCheck },
  { label: "Wishlist",      href: "/u/wishlist",    icon: Heart },
];

const BOTTOM_NAV = [
  { label: "Analytics", href: "/u/analytics", icon: BarChart2 },
  { label: "Profile",   href: "/u/profile",   icon: User },
  { label: "Settings",  href: "/u/settings",  icon: Settings },
];

const NOTIFICATIONS = [
  { color: "#0891b2", text: "Your Kitchen Renovation project was updated by the designer", time: "20m ago", unread: true },
  { color: "#7c3aed", text: "3 new products added to your Living Room moodboard", time: "2h ago", unread: true },
  { color: "#10b981", text: "Quote approved for Master Bedroom project", time: "1d ago", unread: false },
];

export function CustomerDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());
  const [showTour, setShowTour] = useState(() => !isTourDone("customer"));
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  function startTour() { resetTour("customer"); setShowTour(true); setMobileOpen(false); }
  function closeTour() { markTourDone("customer"); setShowTour(false); }

  const STEPS: TourStep[] = [
    {
      icon: <span style={{ fontSize: "2rem" }}>🏠</span>,
      title: "Welcome to your dashboard!",
      body: "Everything you need for your interior design journey — projects, moodboards, saved products, and activity — all in one place.",
      anchor: "center",
      targetId: "tour-customer-stats",
    },
    {
      icon: <FolderOpen className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Track your projects",
      body: "My Projects shows all your active design projects with progress bars. See what your designer is working on and mark milestones.",
      anchor: "bottom-right",
      hint: "↑ My Projects is above",
      targetId: "tour-customer-projects",
    },
    {
      icon: <Layout className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Build your moodboards",
      body: "My Moodboards lets you collect and organise products by room or style. Share with your designer to align on your vision.",
      anchor: "bottom-right",
      hint: "↑ My Moodboards is above",
      targetId: "tour-customer-moodboards",
    },
    {
      icon: <CalendarCheck className="w-7 h-7" style={{ color: ACCENT }} />,
      title: "Navigate your dashboard",
      body: "Use the sidebar to jump between your Projects, Moodboards, Activities, and Wishlist. Profile and Settings are at the bottom.",
      anchor: "bottom-left",
      hint: "← Sidebar is to the left",
      targetId: "tour-customer-sidebar",
    },
  ];

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const sync = () => setAuthUser(getAuthUser());
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => location.pathname.startsWith(href);

  function NavLink({ item }: { item: { label: string; href: string; icon: typeof FolderOpen } }) {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        to={item.href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
        style={{
          background: active ? `rgba(${ACCENT_RGB},0.12)` : "transparent",
          color: active ? ACCENT : "var(--text-secondary)",
          fontWeight: active ? 700 : 500,
        }}
        title={collapsed ? item.label : undefined}
        onClick={() => setMobileOpen(false)}
        onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = `rgba(${ACCENT_RGB},0.07)`; (e.currentTarget as HTMLElement).style.color = ACCENT; } }}
        onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; } }}
      >
        <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
        {!collapsed && <span style={{ fontSize: "0.85rem" }}>{item.label}</span>}
      </Link>
    );
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Label */}
      <div className="flex items-center px-4 h-[52px] flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        {!collapsed && (
          <span style={{ fontWeight: 700, fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
            My Space
          </span>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV.map((item) => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* Divider + bottom nav */}
      <div className="px-2 pb-2 flex-shrink-0 space-y-0.5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 8 }}>
        {BOTTOM_NAV.map((item) => <NavLink key={item.href} item={item} />)}
      </div>

      {/* User card */}
      {authUser && !collapsed && (
        <div className="px-3 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: `rgba(${ACCENT_RGB},0.07)` }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${ACCENT},#0e7490)` }}
            >
              {authUser.initials}
            </div>
            <div className="min-w-0">
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{authUser.name}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Customer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "#f5f7fb" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Sidebar */}
        <aside
          id="tour-customer-sidebar"
          className="hidden md:flex flex-col flex-shrink-0 relative transition-all duration-300"
          style={{ width: collapsed ? 64 : 220, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(0,0,0,0.06)" }}
        >
          {sidebarContent}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center z-10"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </aside>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/30" />
            <aside className="relative w-56 flex flex-col" style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }} onClick={(e) => e.stopPropagation()}>
              {sidebarContent}
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header
            className="flex items-center justify-between h-[52px] px-4 sm:px-6 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 rounded-lg" style={{ color: "var(--text-secondary)" }} onClick={() => setMobileOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {authUser ? `Hi, ${authUser.name.split(" ")[0]} 👋` : "My Space"}
              </span>
            </div>

            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: notifOpen ? `rgba(${ACCENT_RGB},0.1)` : "transparent", color: notifOpen ? ACCENT : "var(--text-secondary)" }}
              >
                <Bell style={{ width: 18, height: 18 }} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "#FF6A3D" }}>
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
                    style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
                  >
                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Notifications</span>
                      {unreadCount > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: "#FF6A3D" }}>{unreadCount} new</span>}
                    </div>
                    <div className="py-1">
                      {NOTIFICATIONS.map((n, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 px-4 py-3 cursor-pointer"
                          style={{ background: n.unread ? `rgba(${ACCENT_RGB},0.03)` : "transparent" }}
                        >
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: n.unread ? n.color : "transparent" }} />
                          <div className="flex-1 min-w-0">
                            <p style={{ fontSize: "0.78rem", fontWeight: n.unread ? 600 : 400, color: "var(--text-primary)", lineHeight: 1.4 }}>{n.text}</p>
                            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{n.time}</span>
                          </div>
                        </div>
                      ))}
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
