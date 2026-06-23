import { Briefcase, GraduationCap, Image, Award, FileText, Activity } from "lucide-react";
import { ACTIVITY_FEED } from "../data/designerData";

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase, GraduationCap, Image, Award, FileText, Activity,
  CheckCircle: Activity,
};

export function DesignerActivityPage() {
  return (
    <div className="p-4 sm:p-6 max-w-[700px] mx-auto space-y-6">
      <div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>Activity</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>Your recent actions and updates</p>
      </div>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: "rgba(0,0,0,0.08)" }} />

        <div className="space-y-1">
          {ACTIVITY_FEED.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] ?? Activity;
            return (
              <div key={item.id} className="flex items-start gap-4 py-3 pl-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{ background: `${item.color}18`, border: `2px solid ${item.color}30` }}
                >
                  <Icon style={{ color: item.color, width: 16, height: 16 }} />
                </div>
                <div
                  className="flex-1 rounded-2xl p-4"
                  style={{ background: idx === 0 ? `rgba(139,92,246,0.04)` : "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.text}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.time}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>·</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
