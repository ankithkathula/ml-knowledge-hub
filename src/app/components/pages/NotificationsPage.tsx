import { useState } from "react";
import { Bell, Check, MessageSquare, Briefcase, ShoppingCart, Star, GraduationCap } from "lucide-react";

type N = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  when: string;
  read: boolean;
  group: "all" | "messages" | "jobs" | "orders" | "system";
};

const SEED: N[] = [
  { id: "1", icon: MessageSquare, title: "New message from Studio Mosaic", body: "We'd love to discuss your portfolio for the Pune project.", when: "2m ago", read: false, group: "messages" },
  { id: "2", icon: Briefcase, title: "New job match: Lead Architect", body: "3 new openings match your saved filter 'Architecture · Mumbai'.", when: "1h ago", read: false, group: "jobs" },
  { id: "3", icon: ShoppingCart, title: "Sample request approved", body: "Asian Paints approved your sample request for Ultima Protek.", when: "Yesterday", read: false, group: "orders" },
  { id: "4", icon: Star, title: "Saved brand updated their catalogue", body: "Greenply added 12 new products under MDF · Marine.", when: "2d ago", read: true, group: "system" },
  { id: "5", icon: GraduationCap, title: "Course reminder", body: "‘BIM for Architects’ resumes tomorrow at 10:00 AM.", when: "3d ago", read: true, group: "system" },
];

const TABS: { id: N["group"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "messages", label: "Messages" },
  { id: "jobs", label: "Jobs" },
  { id: "orders", label: "Orders" },
  { id: "system", label: "System" },
];

export function NotificationsPage() {
  const [tab, setTab] = useState<N["group"]>("all");
  const [items, setItems] = useState<N[]>(SEED);
  const visible = tab === "all" ? items : items.filter((n) => n.group === tab);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
              <Bell className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h1 className="text-xl" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Notifications</h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{unread} unread</p>
            </div>
          </div>
          <button
            onClick={() => setItems(items.map((n) => ({ ...n, read: true })))}
            className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full transition-all"
            style={{ color: "var(--text-secondary)", border: "var(--border-subtle)", background: "transparent", fontWeight: 500, letterSpacing: "0.06em" }}
          >
            <Check className="inline w-3.5 h-3.5 mr-1" /> Mark all read
          </button>
        </header>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-light)" : "transparent",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {visible.length === 0 ? (
            <div className="text-center py-16 rounded-xl" style={{ background: "var(--glass)", border: "var(--border-subtle)" }}>
              <Bell className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>You're all caught up.</p>
            </div>
          ) : (
            visible.map((n) => (
              <div
                key={n.id}
                onClick={() => setItems(items.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all hover:translate-y-[-1px]"
                style={{
                  background: n.read ? "var(--glass)" : "var(--glass-strong)",
                  border: "var(--border-subtle)",
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-light)" }}>
                  <n.icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm truncate" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{n.title}</h3>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{n.body}</p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>{n.when}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
