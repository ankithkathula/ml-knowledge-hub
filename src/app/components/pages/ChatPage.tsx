import { useState } from "react";
import { Send, Search, Phone, Video, MoreHorizontal } from "lucide-react";

type Thread = { id: string; name: string; role: string; preview: string; when: string; unread: number; avatar: string };
type Msg = { id: string; from: "me" | "them"; text: string; when: string };

const THREADS: Thread[] = [
  { id: "1", name: "Studio Mosaic", role: "Architecture studio · Mumbai", preview: "Sharing the moodboard for floor 2...", when: "2m", unread: 2, avatar: "M" },
  { id: "2", name: "Asian Paints", role: "Brand · Decorative", preview: "Sample request approved.", when: "1h", unread: 0, avatar: "A" },
  { id: "3", name: "Riya Kapoor", role: "Interior designer", preview: "Are you free this Thursday?", when: "Yesterday", unread: 0, avatar: "R" },
  { id: "4", name: "Greenply Sales", role: "Brand · Plywood", preview: "Bulk pricing PDF attached.", when: "3d", unread: 0, avatar: "G" },
];

const SEED_MSGS: Record<string, Msg[]> = {
  "1": [
    { id: "a", from: "them", text: "Hey, sharing the moodboard for floor 2 — see attachment.", when: "10:14" },
    { id: "b", from: "them", text: "Let me know if the marble palette works.", when: "10:14" },
    { id: "c", from: "me",   text: "Looks great. Can we tweak the floor inlay slightly?", when: "10:18" },
  ],
};

export function ChatPage() {
  const [active, setActive] = useState<string>("1");
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Record<string, Msg[]>>(SEED_MSGS);

  const thread = THREADS.find((t) => t.id === active)!;
  const list = msgs[active] || [];

  const send = () => {
    if (!draft.trim()) return;
    setMsgs({ ...msgs, [active]: [...list, { id: Date.now().toString(), from: "me", text: draft, when: "now" }] });
    setDraft("");
  };

  return (
    <div className="min-h-[calc(100vh-58px)]" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto h-[calc(100vh-58px)] flex">
        {/* Threads */}
        <aside className="w-[320px] flex-shrink-0 flex flex-col" style={{ borderRight: "var(--border-subtle)" }}>
          <div className="p-4">
            <h1 className="text-lg mb-3" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input className="gl-input text-sm pl-10" placeholder="Search conversations" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {THREADS.map((t) => {
              const sel = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="w-full text-left flex gap-3 px-3 py-3 rounded-xl mb-1 transition-all"
                  style={{ background: sel ? "var(--accent-light)" : "transparent" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--accent), #e8522a)", fontWeight: 700 }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm truncate" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</span>
                      <span className="text-[11px] flex-shrink-0 ml-2" style={{ color: "var(--text-muted)" }}>{t.when}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>{t.preview}</p>
                  </div>
                  {t.unread > 0 && (
                    <span className="self-center w-5 h-5 rounded-full text-[10px] flex items-center justify-center text-white" style={{ background: "var(--accent)", fontWeight: 700 }}>
                      {t.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Conversation */}
        <main className="flex-1 flex flex-col">
          <header className="flex items-center justify-between px-6 py-3" style={{ borderBottom: "var(--border-subtle)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm"
                style={{ background: "linear-gradient(135deg, var(--accent), #e8522a)", fontWeight: 700 }}>{thread.avatar}</div>
              <div>
                <p className="text-sm" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{thread.name}</p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{thread.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[Phone, Video, MoreHorizontal].map((I, i) => (
                <button key={i} className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-light)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                  <I className="w-4 h-4" />
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {list.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm"
                  style={{
                    background: m.from === "me" ? "var(--accent)" : "var(--glass-strong)",
                    color: m.from === "me" ? "white" : "var(--text-primary)",
                    border: m.from === "me" ? "none" : "var(--border-subtle)",
                  }}>
                  {m.text}
                  <div className="text-[10px] mt-1" style={{ color: m.from === "me" ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>{m.when}</div>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <p className="text-center text-xs mt-10" style={{ color: "var(--text-muted)" }}>Say hello — start the conversation.</p>
            )}
          </div>

          <div className="px-4 py-3" style={{ borderTop: "var(--border-subtle)" }}>
            <div className="flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Write a message…"
                className="gl-input text-sm flex-1"
              />
              <button onClick={send} className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent)", color: "white" }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
