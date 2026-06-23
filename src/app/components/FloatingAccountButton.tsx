import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  LogOut,
  User,
  Building2,
  Bell,
  ShoppingCart,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const DASHBOARDS = [
  { to: "/u", icon: User, label: "Professional Dashboard" },
  { to: "/studio", icon: Building2, label: "Studio Dashboard" },
  { to: "/admin", icon: LayoutDashboard, label: "Admin Console" },
  { to: "/v1/admin", icon: LayoutDashboard, label: "ML Admin (v1)" },
];

export function FloatingAccountButton() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-6 left-6 z-[60]"
      style={{ pointerEvents: "auto" }}
    >
      {open && (
        <div
          className="absolute bottom-full mb-3 left-0 w-64 rounded-2xl overflow-hidden"
          style={{
            background: "var(--glass-strong)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 14px 48px rgba(0,0,0,0.18)",
            border: "var(--border)",
          }}
        >
          {/* User card */}
          <div className="px-4 py-3" style={{ borderBottom: "var(--border-subtle)" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Admin User</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>admin@materiallibrary.com</div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 px-3 py-3" style={{ borderBottom: "var(--border-subtle)" }}>
            <ActionTile
              icon={ShoppingCart}
              label="Cart"
              dot
              onClick={() => { navigate("/cart"); setOpen(false); }}
            />
            <ActionTile
              icon={Bell}
              label="Alerts"
              dot
              onClick={() => { navigate("/notifications"); setOpen(false); }}
            />
            <ActionTile
              icon={isDarkMode ? Sun : Moon}
              label={isDarkMode ? "Light" : "Dark"}
              onClick={toggleDarkMode}
            />
          </div>

          {/* Dashboards */}
          <div className="py-1">
            {DASHBOARDS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-2.5 transition-all"
                style={{ color: "var(--text-secondary)", fontSize: "0.82rem", fontWeight: 500 }}
                onClick={() => setOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.10)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
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

          {/* Sign out */}
          <div className="py-1" style={{ borderTop: "var(--border-subtle)" }}>
            <button
              className="flex items-center gap-3 px-4 py-2.5 w-full transition-all"
              style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 500 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
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

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
        aria-expanded={open}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
        style={{
          background: "linear-gradient(135deg, var(--accent) 0%, #e8522a 100%)",
          boxShadow: "0 10px 30px rgba(255,106,61,0.40)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "")}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}

function ActionTile({
  icon: Icon,
  label,
  onClick,
  dot,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  dot?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all"
      style={{
        background: "transparent",
        color: "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.10)";
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
      }}
    >
      <Icon className="w-4 h-4" />
      <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.04em" }}>{label}</span>
      {dot && (
        <span
          className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
    </button>
  );
}
