import { useState, useEffect } from "react";
import { Link } from "react-router";
import { LayoutDashboard, X, ChevronRight } from "lucide-react";
import { getAuthUser, type AuthUser } from "../../utils/auth";

interface WelcomeBannerProps {
  requiredType?: string | string[];
}

export function WelcomeBanner({ requiredType }: WelcomeBannerProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const sync = () => { setUser(getAuthUser()); setDismissed(false); };
    window.addEventListener("ml-auth-change", sync);
    return () => window.removeEventListener("ml-auth-change", sync);
  }, []);

  if (!user || dismissed) return null;

  if (requiredType) {
    const allowed = Array.isArray(requiredType) ? requiredType : [requiredType];
    if (!allowed.includes(user.type)) return null;
  }

  const initials = user.initials;
  const dashLabel =
    user.type === "Institute Manager" ? "Institute Dashboard"
    : user.type === "Brand" ? "Brand Dashboard"
    : user.type === "Studio" ? "Studio Dashboard"
    : "My Dashboard";

  return (
    <div
      className="w-full flex items-center justify-between gap-3 px-4 md:px-8 py-2.5"
      style={{ background: "var(--accent, #FF6A3D)", color: "white" }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <span className="text-[13px] font-semibold">Welcome back, {user.name}</span>
          <span className="hidden sm:inline text-[12px] text-white/70 ml-2">· {user.type}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          to={user.dashboardPath}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{dashLabel}</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
