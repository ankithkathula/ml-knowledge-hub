import { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Network, Package, Building2, FileText,
  Newspaper, Users, Users2, BarChart3, Upload, PenTool,
  ChevronLeft, ChevronRight, Menu, Bell, Settings,
  UserCircle, CalendarCheck, Briefcase, GraduationCap,
  ShieldCheck, ClipboardList, PieChart, CreditCard,
  Megaphone, UserPlus, LogOut,
} from "lucide-react";
import { Navbar } from "../Navbar";

type NavItem = { label: string; href: string; icon: React.ElementType };
type NavGroup = { section: string; items: NavItem[] };

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard",      href: "/admin",               icon: LayoutDashboard },
    ],
  },
  {
    section: "Catalogue",
    items: [
      { label: "Taxonomy",       href: "/admin/taxonomy",      icon: Network },
      { label: "Products (L6)",  href: "/admin/products",      icon: Package },
      { label: "Brands",         href: "/admin/brands",        icon: Building2 },
      { label: "Blog & Content", href: "/admin/content",       icon: FileText },
      { label: "Industry News",  href: "/admin/news",          icon: Newspaper },
    ],
  },
  {
    section: "People & Access",
    items: [
      { label: "Team",           href: "/admin/team",          icon: Users2 },
      { label: "Users",          href: "/admin/users",         icon: UserCircle },
      { label: "Studios",        href: "/admin/consultants",   icon: Users },
      { label: "RBAC",           href: "/admin/rbac",          icon: ShieldCheck },
      { label: "Approvals",      href: "/admin/approvals",     icon: ClipboardList },
      { label: "Role Dashboard", href: "/admin/role-dashboard",icon: PieChart },
    ],
  },
  {
    section: "Business",
    items: [
      { label: "Subscriptions",  href: "/admin/subscriptions", icon: CreditCard },
      { label: "Advertisements", href: "/admin/ads",           icon: Megaphone },
      { label: "Careers (ML)",   href: "/admin/careers",       icon: UserPlus },
      { label: "Jobs",           href: "/admin/jobs",          icon: Briefcase },
      { label: "Courses",        href: "/admin/courses",       icon: GraduationCap },
    ],
  },
  {
    section: "KC & Community",
    items: [
      { label: "KC Bookings",    href: "/admin/kc-bookings",   icon: CalendarCheck },
      { label: "Samples",        href: "/admin/samples",       icon: Package },
      { label: "Contributors",   href: "/admin/contributors",  icon: PenTool },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Analytics",      href: "/admin/market-data",   icon: BarChart3 },
      { label: "Bulk Import",    href: "/admin/bulk-import",   icon: Upload },
    ],
  },
];

const BOTTOM_NAV = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const NOTIFICATIONS = [
  { icon: ClipboardList, color: "#f59e0b", text: "12 new brand registrations pending approval", time: "20m ago", unread: true },
  { icon: UserCircle,    color: "#3b82f6", text: "New studio 'Morphogenesis Delhi' joined the platform", time: "1h ago", unread: true },
  { icon: ShieldCheck,   color: "#8b5cf6", text: "RBAC policy update applied to 3 roles", time: "3h ago", unread: false },
  { icon: BarChart3,     color: "#22c55e", text: "Monthly analytics report is ready", time: "1d ago", unread: false },
];

const ACCENT     = "#ff6a3d";
const ACCENT_RGB = "255,106,61";

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

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
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const navLink = (item: NavItem) => {
    const Icon   = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        to={item.href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
        style={{
          background: active ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
          color:      active ? ACCENT : "var(--text-secondary)",
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
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Hub label */}
      <div className="flex items-center px-4 h-[52px] flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        {!collapsed && (
          <span style={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Super Admin Console
          </span>
        )}
      </div>

      {/* Grouped nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {ADMIN_NAV_GROUPS.map((group, gi) => (
          <div key={group.section} className={gi > 0 ? "mt-4" : ""}>
            {!collapsed && (
              <p className="px-3 mb-1" style={{ fontSize: "0.62rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.09em" }}>
                {group.section}
              </p>
            )}
            {collapsed && gi > 0 && <div className="mx-3 my-2" style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />}
            <div className="space-y-0.5">
              {group.items.map(navLink)}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 flex-shrink-0 space-y-0.5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 8 }}>
        {BOTTOM_NAV.map((item) => {
          const Icon   = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: active ? `rgba(${ACCENT_RGB},0.1)` : "transparent",
                color:      active ? ACCENT : "var(--text-secondary)",
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
          to="/v1"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
          style={{ color: "var(--text-secondary)", fontWeight: 500 }}
          title={collapsed ? "Back to Site" : undefined}
          onClick={() => setMobileOpen(false)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)";
            (e.currentTarget as HTMLElement).style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: "0.82rem" }}>Back to Site</span>}
        </Link>
      </div>

      {/* User card */}
      {!collapsed && (
        <div className="px-3 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: `rgba(${ACCENT_RGB},0.06)` }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg,${ACCENT},#e8522a)` }}>
              RS
            </div>
            <div className="min-w-0">
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)" }} className="truncate">Raj Sharma</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Super Admin · ML</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: "#fff7f5" }}>
      <Navbar />

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
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </aside>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/30" />
            <aside className="relative w-64 flex flex-col" style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }} onClick={(e) => e.stopPropagation()}>
              {sidebarContent}
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header
            className="flex items-center justify-between h-[52px] px-4 sm:px-6 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 rounded-lg" style={{ color: "var(--text-secondary)" }} onClick={() => setMobileOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Hi, Raj 👋
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification bell */}
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
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: ACCENT }}>
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
                      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: ACCENT }}>
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
                              style={{ background: n.unread ? `rgba(${ACCENT_RGB},0.03)` : "transparent" }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = n.unread ? `rgba(${ACCENT_RGB},0.03)` : "transparent")}
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}18` }}>
                                <Icon style={{ width: 15, height: 15, color: n.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p style={{ fontSize: "0.78rem", fontWeight: n.unread ? 600 : 400, color: "var(--text-primary)", lineHeight: 1.4 }}>
                                  {n.text}
                                </p>
                                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{n.time}</span>
                              </div>
                              {n.unread && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT }} />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="px-4 py-2.5 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <button style={{ fontSize: "0.78rem", fontWeight: 600, color: ACCENT }}>View all notifications</button>
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
    </div>
  );
}
