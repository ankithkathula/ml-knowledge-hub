import { useState, useRef, useEffect } from "react";
import {
  Search, Send, Paperclip, Hash, Plus, FileText, Image as ImageIcon,
  Download, Users, File as FileIcon,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

// --- Types ---
interface ChannelMessage {
  id: string;
  sender: string;
  avatarUrl: string;
  text: string;
  time: string;
  self?: boolean;
}
interface ChannelFile {
  id: string;
  name: string;
  kind: "pdf" | "image" | "dwg" | "doc";
  size: string;
  by: string;
  time: string;
}
interface ChannelMember { name: string; avatarUrl: string }
interface ProjectChannel {
  id: string;
  project: string;
  client: string;
  members: ChannelMember[];
  unread: number;
  messages: ChannelMessage[];
  files: ChannelFile[];
}

const A = (n: number) => `https://i.pravatar.cc/80?img=${n}`;

// --- Mock project channels ---
const INITIAL_CHANNELS: ProjectChannel[] = [
  {
    id: "p-greenfield",
    project: "Villa Greenfield",
    client: "Ravi Sharma",
    members: [
      { name: "Arjun Mehta", avatarUrl: A(12) },
      { name: "Rahul Krishnan", avatarUrl: A(57) },
      { name: "Vikram Desai", avatarUrl: A(15) },
    ],
    unread: 3,
    messages: [
      { id: "1", sender: "Arjun Mehta", avatarUrl: A(12), text: "Kicking off the structural design phase for Villa Greenfield. Shared the latest site survey in files.", time: "9:10 AM", self: true },
      { id: "2", sender: "Rahul Krishnan", avatarUrl: A(57), text: "Got it. I'll start the foundation layout today. Are we going with M30 RMC as discussed?", time: "9:18 AM" },
      { id: "3", sender: "Arjun Mehta", avatarUrl: A(12), text: "Yes, M30 for the raft. UltraTech RMC quote is in the BOM.", time: "9:21 AM", self: true },
      { id: "4", sender: "Vikram Desai", avatarUrl: A(15), text: "Client wants to review the facade options before we finalise. Can we add a moodboard?", time: "10:02 AM" },
      { id: "5", sender: "Rahul Krishnan", avatarUrl: A(57), text: "Uploading the facade reference deck now 👇", time: "10:05 AM" },
    ],
    files: [
      { id: "f1", name: "Site_Survey_Greenfield.pdf", kind: "pdf", size: "2.4 MB", by: "Arjun Mehta", time: "9:10 AM" },
      { id: "f2", name: "Foundation_Layout_R1.dwg", kind: "dwg", size: "1.1 MB", by: "Rahul Krishnan", time: "9:40 AM" },
      { id: "f3", name: "Facade_Moodboard.png", kind: "image", size: "3.8 MB", by: "Rahul Krishnan", time: "10:05 AM" },
    ],
  },
  {
    id: "p-lakewood",
    project: "Lakewood Residences",
    client: "Lodha Group",
    members: [
      { name: "Priya Sharma", avatarUrl: A(47) },
      { name: "Sneha Patel", avatarUrl: A(44) },
    ],
    unread: 0,
    messages: [
      { id: "1", sender: "Priya Sharma", avatarUrl: A(47), text: "Construction docs for Tower B are due Friday. Where are we on the MEP coordination?", time: "Yesterday 4:20 PM" },
      { id: "2", sender: "Sneha Patel", avatarUrl: A(44), text: "MEP markups are 80% done. I'll have the updated BOM by tomorrow EOD.", time: "Yesterday 4:35 PM" },
      { id: "3", sender: "Priya Sharma", avatarUrl: A(47), text: "Perfect. Added the client's revised tile selection to files — they switched to Kajaria Marbonite for the lobbies.", time: "Yesterday 5:02 PM" },
    ],
    files: [
      { id: "f1", name: "TowerB_GA_Drawings.pdf", kind: "pdf", size: "5.6 MB", by: "Priya Sharma", time: "Yesterday" },
      { id: "f2", name: "Lobby_Tile_Selection.pdf", kind: "pdf", size: "900 KB", by: "Priya Sharma", time: "Yesterday" },
      { id: "f3", name: "MEP_Coordination_R3.dwg", kind: "dwg", size: "2.2 MB", by: "Sneha Patel", time: "Yesterday" },
    ],
  },
  {
    id: "p-oberoi",
    project: "Oberoi Commercial Tower",
    client: "Oberoi Realty",
    members: [
      { name: "Priya Sharma", avatarUrl: A(47) },
      { name: "Rahul Krishnan", avatarUrl: A(57) },
    ],
    unread: 1,
    messages: [
      { id: "1", sender: "Priya Sharma", avatarUrl: A(47), text: "Concept presentation for Oberoi is scheduled next Tuesday. Let's align on the massing options.", time: "Mon 11:00 AM" },
      { id: "2", sender: "Rahul Krishnan", avatarUrl: A(57), text: "I've prepped three massing studies. Sharing the deck — option 2 maximises the river view.", time: "Mon 11:24 AM" },
    ],
    files: [
      { id: "f1", name: "Oberoi_Massing_Studies.pdf", kind: "pdf", size: "8.1 MB", by: "Rahul Krishnan", time: "Mon" },
      { id: "f2", name: "Concept_Render_Option2.png", kind: "image", size: "6.3 MB", by: "Rahul Krishnan", time: "Mon" },
    ],
  },
];

const FILE_ICON = { pdf: FileText, image: ImageIcon, dwg: FileIcon, doc: FileIcon };
const FILE_COLOR = { pdf: "#ef4444", image: "#8b5cf6", dwg: "#0ea5e9", doc: "#10b981" };

export default function StudioMessagesPage() {
  const [channels, setChannels] = useState(INITIAL_CHANNELS);
  const [activeId, setActiveId] = useState(INITIAL_CHANNELS[0].id);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const active = channels.find((c) => c.id === activeId)!;
  const filtered = channels.filter((c) => c.project.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active.messages.length]);

  const send = () => {
    if (!input.trim()) return;
    setChannels((prev) => prev.map((c) => c.id === activeId ? {
      ...c,
      messages: [...c.messages, { id: `${Date.now()}`, sender: "Arjun Mehta", avatarUrl: A(12), text: input.trim(), time: "Just now", self: true }],
    } : c));
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: "var(--bg-base)" }}>
      {/* ── Channels sidebar ── */}
      <aside className="w-64 flex-shrink-0 border-r flex flex-col" style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}>
        <div className="p-4 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>Messages</h2>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)", color: "var(--accent)" }} title="New project channel">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-8 pr-3 py-2 rounded-lg text-[13px] outline-none"
              style={{ background: "rgba(0,0,0,0.04)", border: "1px solid transparent" }}
            />
          </div>
        </div>
        <div className="px-3 pt-3 pb-1" style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Project Channels
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
          {filtered.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => { setActiveId(c.id); setChannels((prev) => prev.map((x) => x.id === c.id ? { ...x, unread: 0 } : x)); }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all"
                style={{ background: isActive ? "var(--accent-light)" : "transparent" }}
              >
                <Hash className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: "0.82rem", fontWeight: isActive ? 700 : 600, color: isActive ? "var(--accent)" : "var(--text-primary)" }}>{c.project}</div>
                  <div className="truncate" style={{ fontSize: "0.66rem", color: "var(--text-muted)" }}>{c.members.length} members · {c.files.length} files</div>
                </div>
                {c.unread > 0 && (
                  <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#ef4444" }}>{c.unread}</span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── Channel thread ── */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="truncate" style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)" }}>{active.project}</h3>
            </div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Client: {active.client} · {active.members.length} members</p>
          </div>
          <div className="flex -space-x-2">
            {active.members.map((m) => (
              <div key={m.name} title={m.name} className="rounded-full ring-2 ring-white">
                <AvatarImg src={m.avatarUrl} fallback={m.name.split(" ").map((w) => w[0]).join("")} size={28} />
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {active.messages.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <AvatarImg src={m.avatarUrl} fallback={m.sender.split(" ").map((w) => w[0]).join("")} size={34} />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{m.sender}{m.self && <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--accent)" }}> (you)</span>}</span>
                  <span style={{ fontSize: "0.66rem", color: "var(--text-muted)" }}>{m.time}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginTop: 2 }}>{m.text}</p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ color: "var(--text-muted)" }} title="Attach file to this project">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
              placeholder={`Message #${active.project.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
            <button onClick={send} disabled={!input.trim()} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ background: "var(--accent)", opacity: input.trim() ? 1 : 0.5 }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* ── Project files / members panel ── */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 border-l flex-col" style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}>
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <Paperclip className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Project Files</h4>
          <span className="ml-auto text-[11px]" style={{ color: "var(--text-muted)" }}>{active.files.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {active.files.map((f) => {
            const Icon = FILE_ICON[f.kind];
            return (
              <div key={f.id} className="group flex items-center gap-2.5 p-2.5 rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${FILE_COLOR[f.kind]}1a` }}>
                  <Icon className="w-4 h-4" style={{ color: FILE_COLOR[f.kind] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-primary)" }}>{f.name}</div>
                  <div style={{ fontSize: "0.64rem", color: "var(--text-muted)" }}>{f.size} · {f.by}</div>
                </div>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: "var(--text-muted)" }} title="Download">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-3 border-t flex items-center gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <Users className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>Members</h4>
        </div>
        <div className="px-3 pb-4 space-y-1">
          {active.members.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
              <AvatarImg src={m.avatarUrl} fallback={m.name.split(" ").map((w) => w[0]).join("")} size={28} />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{m.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
