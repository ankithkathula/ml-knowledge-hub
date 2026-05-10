import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  LayoutDashboard, Briefcase, FolderKanban, GraduationCap, PenSquare,
  Building2, CalendarCheck, Star, MessageSquare, BarChart3, Settings,
  ChevronLeft, ChevronRight, Zap, LogOut, Menu, X, Users, MapPin, Package
} from "lucide-react";

const STUDIO_NAV = [
  { label: "Dashboard", href: "/studio", icon: LayoutDashboard },
  { label: "Jobs", href: "/studio/jobs", icon: Briefcase },
  { label: "Projects", href: "/studio/projects", icon: FolderKanban },
  { label: "Courses", href: "/studio/courses", icon: GraduationCap },
  { label: "Blogs", href: "/studio/blogs", icon: PenSquare },
  { label: "Studio Profile", href: "/studio/profile", icon: Building2 },
  { label: "Team", href: "/studio/team", icon: Users },
  { label: "Bookings", href: "/studio/bookings", icon: CalendarCheck },
  { label: "KC Visits", href: "/studio/kc-visits", icon: MapPin },
  { label: "Samples", href: "/studio/samples", icon: Package },
  { label: "Reviews", href: "/studio/reviews", icon: Star },
  { label: "Messages", href: "/studio/messages", icon: MessageSquare },
  { label: "Analytics", href: "/studio/analytics", icon: BarChart3 },
  { label: "Settings", href: "/studio/settings", icon: Settings },
];

export function StudioDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/studio") return location.pathname === "/studio";
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-[58px] flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#ff6a3d", boxShadow: "0 3px 10px rgba(255,106,61,0.35)" }}
          >
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
              Studio Hub
            </span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {STUDIO_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group"
                style={{
                  background: active ? "rgba(255,106,61,0.1)" : "transparent",
                  color: active ? "#ff6a3d" : "var(--text-secondary)",
                  fontWeight: active ? 700 : 500,
                }}
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#ff6a3d";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                {!collapsed && <span className="truncate" style={{ fontSize: "0.82rem" }}>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="pt-3 space-y-0.5">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            style={{ color: "var(--text-muted)", fontWeight: 500 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)";
              (e.currentTarget as HTMLElement).style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
            {!collapsed && <span style={{ fontSize: "0.82rem" }}>Back to Site</span>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen" style={{ background: "#f5f7fb" }}>
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
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between h-[58px] px-4 sm:px-6 flex-shrink-0"
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
            <h1 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Studio Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/studio/profile"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: "rgba(255,106,61,0.08)",
                color: "#ff6a3d",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.15)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.08)")}
            >
              View Profile
            </Link>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs cursor-pointer"
              style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #e8522a 100%)", fontWeight: 700 }}
            >
              AK
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
