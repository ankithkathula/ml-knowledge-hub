import { useState } from "react";
import { Gift, ShoppingBag, Utensils, Clapperboard, Activity, Lock, Star, Trophy, Zap, Clock, CheckCircle2, ChevronRight } from "lucide-react";

const ACCENT = "#6366f1";
const ACCENT_RGB = "99,102,241";

type RewardCategory = "all" | "food" | "shopping" | "entertainment" | "fitness";
type RewardStatus = "unlocked" | "locked" | "claimed";

interface Reward {
  id: string;
  partner: string;
  offer: string;
  offerDetail: string;
  category: Exclude<RewardCategory, "all">;
  status: RewardStatus;
  unlockCondition: string;
  progress?: number;
  progressLabel?: string;
  expiresOn?: string;
  coins: number;
  color: string;
}

const CAT_CONFIG: Record<Exclude<RewardCategory, "all">, { label: string; icon: typeof Gift; color: string; bg: string }> = {
  food:          { label: "Food",          icon: Utensils,     color: "#ea580c", bg: "rgba(234,88,12,0.1)"   },
  shopping:      { label: "Shopping",      icon: ShoppingBag,  color: "#db2777", bg: "rgba(219,39,119,0.1)"  },
  entertainment: { label: "Entertainment", icon: Clapperboard, color: "#0891b2", bg: "rgba(8,145,178,0.1)"   },
  fitness:       { label: "Fitness",       icon: Activity,     color: "#16a34a", bg: "rgba(22,163,74,0.1)"   },
};

const REWARDS: Reward[] = [
  {
    id: "R1",
    partner: "PVR Cinemas",
    offer: "2 Free Movie Tickets",
    offerDetail: "Valid at any PVR multiplex across India",
    category: "entertainment",
    status: "unlocked",
    unlockCondition: "Complete your first course",
    expiresOn: "Jun 30, 2026",
    coins: 80,
    color: "#0891b2",
  },
  {
    id: "R2",
    partner: "Swiggy",
    offer: "₹300 Off Your Order",
    offerDetail: "Min. order ₹500 · Valid once",
    category: "food",
    status: "unlocked",
    unlockCondition: "Attend 3 KC visits",
    expiresOn: "Jul 15, 2026",
    coins: 60,
    color: "#ea580c",
  },
  {
    id: "R3",
    partner: "Myntra",
    offer: "₹500 Off on Fashion",
    offerDetail: "Min. purchase ₹1,500 · All brands",
    category: "shopping",
    status: "unlocked",
    unlockCondition: "Submit 3 assignments",
    expiresOn: "Jun 20, 2026",
    coins: 50,
    color: "#db2777",
  },
  {
    id: "R4",
    partner: "Domino's",
    offer: "30% Off Any Order",
    offerDetail: "Valid on app orders only",
    category: "food",
    status: "locked",
    unlockCondition: "Complete Green Building Materials by Jun 30",
    progress: 68,
    progressLabel: "68% complete — keep going!",
    coins: 70,
    color: "#ea580c",
  },
  {
    id: "R5",
    partner: "BookMyShow",
    offer: "₹200 Off Live Events",
    offerDetail: "Concerts, comedy shows & more",
    category: "entertainment",
    status: "locked",
    unlockCondition: "Complete BIM for Interior Designers",
    progress: 35,
    progressLabel: "35% complete · 5 modules remaining",
    coins: 90,
    color: "#0891b2",
  },
  {
    id: "R6",
    partner: "Cult.fit",
    offer: "1 Month Free Membership",
    offerDetail: "Access to all centres + live classes",
    category: "fitness",
    status: "locked",
    unlockCondition: "Attend 10 KC Knowledge Centre visits",
    progress: 30,
    progressLabel: "3 of 10 visits completed",
    coins: 120,
    color: "#16a34a",
  },
  {
    id: "R7",
    partner: "Spotify",
    offer: "3 Months Premium Free",
    offerDetail: "Ad-free music + offline downloads",
    category: "entertainment",
    status: "locked",
    unlockCondition: "Add 3 projects to your portfolio",
    progress: 33,
    progressLabel: "1 of 3 portfolio projects added",
    coins: 100,
    color: "#0891b2",
  },
  {
    id: "R8",
    partner: "Flipkart",
    offer: "15% Off Electronics",
    offerDetail: "Max discount ₹2,000 · Select items",
    category: "shopping",
    status: "locked",
    unlockCondition: "Get shortlisted for any job",
    progress: 0,
    progressLabel: "Apply to jobs to get shortlisted",
    coins: 110,
    color: "#db2777",
  },
  {
    id: "R9",
    partner: "Starbucks",
    offer: "1 Free Beverage",
    offerDetail: "Any size, any drink",
    category: "food",
    status: "claimed",
    unlockCondition: "Complete 5 assignments",
    coins: 40,
    color: "#ea580c",
  },
];

const CATEGORY_TABS: Array<{ key: RewardCategory; label: string }> = [
  { key: "all",          label: "All" },
  { key: "food",         label: "Food" },
  { key: "shopping",     label: "Shopping" },
  { key: "entertainment",label: "Entertainment" },
  { key: "fitness",      label: "Fitness" },
];

export function StudentRewardsPage() {
  const [cat, setCat] = useState<RewardCategory>("all");

  const filtered = cat === "all" ? REWARDS : REWARDS.filter((r) => r.category === cat);
  const unlocked = filtered.filter((r) => r.status === "unlocked");
  const locked = filtered.filter((r) => r.status === "locked");
  const claimed = filtered.filter((r) => r.status === "claimed");

  const totalCoins = REWARDS.filter((r) => r.status === "claimed").reduce((s, r) => s + r.coins, 0);
  const unlockedCount = REWARDS.filter((r) => r.status === "unlocked").length;
  const expiringSoon = REWARDS.filter((r) => r.status === "unlocked").length;

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>Rewards</h1>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 3 }}>
          Earn deals and discounts by completing courses, visiting KCs, and more
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: `rgba(${ACCENT_RGB},0.07)`, border: `1px solid rgba(${ACCENT_RGB},0.18)` }}>
          <Trophy style={{ width: 18, height: 18, color: ACCENT }} />
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{unlockedCount}</div>
          <div style={{ fontSize: "0.72rem", color: ACCENT, fontWeight: 600 }}>Ready to Claim</div>
        </div>
        <div className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: "rgba(234,88,12,0.07)", border: "1px solid rgba(234,88,12,0.18)" }}>
          <Star style={{ width: 18, height: 18, color: "#ea580c" }} />
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ea580c", lineHeight: 1 }}>{totalCoins}</div>
          <div style={{ fontSize: "0.72rem", color: "#ea580c", fontWeight: 600 }}>ML Coins Earned</div>
        </div>
        <div className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: "rgba(22,163,74,0.07)", border: "1px solid rgba(22,163,74,0.18)" }}>
          <Clock style={{ width: 18, height: 18, color: "#16a34a" }} />
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>{expiringSoon}</div>
          <div style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 600 }}>Expiring Soon</div>
        </div>
      </div>

      {/* How it works strip */}
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3 flex-wrap"
        style={{ background: `rgba(${ACCENT_RGB},0.04)`, border: `1px dashed rgba(${ACCENT_RGB},0.25)` }}
      >
        <Zap style={{ width: 15, height: 15, color: ACCENT, flexShrink: 0 }} />
        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          Complete courses on time · Visit KC centres · Submit assignments · Build your portfolio → unlock exclusive deals
        </span>
        <button className="ml-auto flex items-center gap-1 flex-shrink-0" style={{ fontSize: "0.75rem", fontWeight: 600, color: ACCENT }}>
          How it works <ChevronRight style={{ width: 12, height: 12 }} />
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {CATEGORY_TABS.map((t) => {
          const active = cat === t.key;
          const count = t.key === "all" ? REWARDS.length : REWARDS.filter((r) => r.category === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setCat(t.key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0"
              style={{ background: active ? ACCENT : "rgba(0,0,0,0.05)", color: active ? "white" : "var(--text-secondary)" }}
            >
              {t.label}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: active ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)", color: active ? "white" : "var(--text-muted)" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Unlocked / Ready to Claim */}
      {unlocked.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Ready to Claim ({unlocked.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlocked.map((r) => {
              const catCfg = CAT_CONFIG[r.category];
              const CatIcon = catCfg.icon;
              return (
                <div
                  key={r.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <div style={{ height: 4, background: r.color }} />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.partner}</div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, marginTop: 2 }}>{r.offer}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{r.offerDetail}</div>
                      </div>
                      <span
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold flex-shrink-0"
                        style={{ background: catCfg.bg, color: catCfg.color }}
                      >
                        <CatIcon style={{ width: 10, height: 10 }} />
                        {catCfg.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <CheckCircle2 style={{ width: 11, height: 11, color: "#10b981" }} />
                      {r.unlockCondition}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {r.expiresOn && (
                        <span className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "#f59e0b", fontWeight: 600 }}>
                          <Clock style={{ width: 10, height: 10 }} />
                          Expires {r.expiresOn}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ background: "rgba(234,88,12,0.1)", color: "#ea580c" }}
                        >
                          <Star style={{ width: 9, height: 9 }} />{r.coins} coins
                        </span>
                        <button
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold"
                          style={{ background: ACCENT, color: "white" }}
                        >
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked / In Progress */}
      {locked.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              In Progress ({locked.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locked.map((r) => {
              const catCfg = CAT_CONFIG[r.category];
              const CatIcon = catCfg.icon;
              return (
                <div
                  key={r.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div style={{ height: 4, background: "rgba(0,0,0,0.08)" }} />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.partner}</div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-secondary)", lineHeight: 1.2, marginTop: 2 }}>{r.offer}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{r.offerDetail}</div>
                      </div>
                      <span
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold flex-shrink-0"
                        style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}
                      >
                        <CatIcon style={{ width: 10, height: 10 }} />
                        {catCfg.label}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Lock style={{ width: 11, height: 11, flexShrink: 0, marginTop: 1 }} />
                      <span>{r.unlockCondition}</span>
                    </div>

                    {r.progress !== undefined && r.progress > 0 && (
                      <div>
                        <div className="w-full rounded-full overflow-hidden mb-1" style={{ height: 5, background: "rgba(0,0,0,0.08)" }}>
                          <div style={{ height: "100%", width: `${r.progress}%`, background: r.color, borderRadius: 999 }} />
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{r.progressLabel}</div>
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-auto">
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}
                      >
                        <Star style={{ width: 9, height: 9 }} />{r.coins} coins on unlock
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Claimed */}
      {claimed.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Claimed ({claimed.length})
            </span>
          </div>
          <div className="space-y-2">
            {claimed.map((r) => (
              <div
                key={r.id}
                className="rounded-xl px-4 py-3 flex items-center gap-3 opacity-60"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <CheckCircle2 style={{ width: 16, height: 16, color: "#10b981", flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{r.offer}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 8 }}>· {r.partner}</span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>Claimed</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Gift style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.2 }} />
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>No rewards in this category yet</p>
        </div>
      )}

    </div>
  );
}
