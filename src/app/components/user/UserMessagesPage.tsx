import { useState, useRef, useEffect } from "react";
import {
  Search, Send, Paperclip, MoreVertical, Plus, X,
  Check, CheckCheck, MessageSquare, Circle,
} from "lucide-react";

// --- Types ---

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

// --- Mock Data ---

const mockConversations: Conversation[] = [
  {
    id: "C001",
    name: "GreenBuild Academy",
    avatar: "GA",
    role: "Course Instructor",
    lastMessage: "Great progress on Module 3! The assignment deadline is extended to Friday.",
    lastMessageTime: "10:15 AM",
    unreadCount: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hi! Welcome to the Sustainable Building Materials course. Feel free to ask any questions.", timestamp: "Mon 9:00 AM", sent: false, read: true },
      { id: "m2", text: "Thank you! I'm really excited about this course. The IGBC module was excellent.", timestamp: "Mon 9:30 AM", sent: true, read: true },
      { id: "m3", text: "Glad to hear that! Make sure to complete the carbon footprint worksheet before Module 4.", timestamp: "Mon 10:00 AM", sent: false, read: true },
      { id: "m4", text: "Sure, I'll submit it by Wednesday. Also, are there any recommended readings on recycled aggregates?", timestamp: "Mon 2:15 PM", sent: true, read: true },
      { id: "m5", text: "Yes! Check the Resources tab - I've uploaded a PDF on recycled aggregate standards by BIS.", timestamp: "Tue 9:45 AM", sent: false, read: true },
      { id: "m6", text: "Great progress on Module 3! The assignment deadline is extended to Friday.", timestamp: "10:15 AM", sent: false, read: false },
    ],
  },
  {
    id: "C002",
    name: "Priya Desai",
    avatar: "PD",
    role: "Interior Designer",
    lastMessage: "The tile samples from Kajaria look amazing! Can we meet this weekend to finalise?",
    lastMessageTime: "Yesterday",
    unreadCount: 1,
    online: true,
    messages: [
      { id: "m1", text: "Hi! I saw your portfolio project on MaterialKart. The living room makeover is beautiful!", timestamp: "Sat 11:00 AM", sent: false, read: true },
      { id: "m2", text: "Thank you, Priya! Are you working on something similar?", timestamp: "Sat 11:20 AM", sent: true, read: true },
      { id: "m3", text: "Yes, I'm renovating my 2BHK in Indiranagar. Looking for flooring inspiration. Which tiles did you use?", timestamp: "Sat 11:35 AM", sent: false, read: true },
      { id: "m4", text: "I used Kajaria Eternity series for the living room and Somany Duragres for the kitchen. Both are excellent quality.", timestamp: "Sat 12:00 PM", sent: true, read: true },
      { id: "m5", text: "The tile samples from Kajaria look amazing! Can we meet this weekend to finalise?", timestamp: "Yesterday 4:00 PM", sent: false, read: false },
    ],
  },
  {
    id: "C003",
    name: "Amit Verma Architects",
    avatar: "AV",
    role: "Architecture Studio",
    lastMessage: "We have an opening for a junior material consultant. Would you be interested?",
    lastMessageTime: "2d ago",
    unreadCount: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hello! We came across your profile on MaterialKart. Impressive portfolio and certifications.", timestamp: "Thu 3:00 PM", sent: false, read: true },
      { id: "m2", text: "Thank you! I'm familiar with your firm's work in Hyderabad. The Jubilee Hills residential project was outstanding.", timestamp: "Thu 3:30 PM", sent: true, read: true },
      { id: "m3", text: "We have an opening for a junior material consultant. Would you be interested?", timestamp: "Thu 4:00 PM", sent: false, read: true },
    ],
  },
  {
    id: "C004",
    name: "Rahul Menon",
    avatar: "RM",
    role: "Civil Engineer",
    lastMessage: "Thanks for the UltraTech vs ACC comparison. Very helpful for the foundation work!",
    lastMessageTime: "5d ago",
    unreadCount: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hi, I need help choosing between UltraTech PPC and ACC Gold for a G+2 residential foundation.", timestamp: "Sat 10:00 AM", sent: false, read: true },
      { id: "m2", text: "Both are excellent! For Hyderabad soil conditions, I'd recommend UltraTech PPC. It has better sulphate resistance and workability. ACC Gold is also good but slightly higher priced.", timestamp: "Sat 10:30 AM", sent: true, read: true },
      { id: "m3", text: "What about compressive strength at 28 days?", timestamp: "Sat 11:00 AM", sent: false, read: true },
      { id: "m4", text: "UltraTech PPC gives around 53-55 MPa at 28 days, ACC Gold about 50-53 MPa. Both exceed the IS 1489 requirement of 33 MPa.", timestamp: "Sat 11:15 AM", sent: true, read: true },
      { id: "m5", text: "Thanks for the UltraTech vs ACC comparison. Very helpful for the foundation work!", timestamp: "Sat 12:00 PM", sent: false, read: true },
    ],
  },
];

// --- Component ---

export function UserMessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find((c) => c.id === activeConvoId) || null;

  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery) return true;
    return c.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages.length]);

  function handleSendMessage() {
    if (!messageInput.trim() || !activeConvoId) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
      sent: true,
      read: false,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvoId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastMessageTime: "Just now" }
          : c
      )
    );
    setMessageInput("");
  }

  function selectConversation(id: string) {
    setActiveConvoId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, unreadCount: 0, messages: c.messages.map((m) => ({ ...m, read: true })) }
          : c
      )
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] gap-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.08)" }}>
      {/* Left - Conversation List */}
      <div className="w-80 flex-shrink-0 flex flex-col" style={{ borderRight: "1px solid rgba(99,102,241,0.08)", backgroundColor: "var(--bg-base)" }}>
        {/* Search */}
        <div className="p-4">
          <h2 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Messages</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              className="gl-input w-full pl-9 text-sm"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((c) => (
            <button
              key={c.id}
              onClick={() => selectConversation(c.id)}
              className="w-full text-left px-4 py-3 flex items-start gap-3 transition hover:opacity-90"
              style={{
                backgroundColor: activeConvoId === c.id ? "rgba(99,102,241,0.06)" : "transparent",
                borderLeft: activeConvoId === c.id ? "3px solid #6366f1" : "3px solid transparent",
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                >
                  {c.avatar}
                </div>
                {c.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 bg-green-500" style={{ borderColor: "var(--bg-base)" }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{c.name}</span>
                  <span className="text-[10px] flex-shrink-0 ml-2" style={{ color: "var(--text-muted)" }}>{c.lastMessageTime}</span>
                </div>
                <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{c.lastMessage}</p>
              </div>

              {/* Unread badge */}
              {c.unreadCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-1"
                  style={{ backgroundColor: "#6366f1" }}
                >
                  {c.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right - Active Chat */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: "var(--bg-base)" }}>
        {!activeConvo ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center">
            <MessageSquare size={48} className="mb-3" style={{ color: "var(--text-muted)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Select a conversation</h3>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Choose from your existing conversations to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                >
                  {activeConvo.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{activeConvo.name}</p>
                  <p className="text-[11px]" style={{ color: activeConvo.online ? "#22c55e" : "var(--text-muted)" }}>
                    {activeConvo.online ? "Online" : "Offline"} {activeConvo.role && `- ${activeConvo.role}`}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:opacity-70 transition">
                <MoreVertical size={16} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {activeConvo.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[70%] px-4 py-2.5 rounded-2xl"
                    style={{
                      backgroundColor: msg.sent ? "rgba(99,102,241,0.12)" : "rgba(156,163,175,0.1)",
                      borderBottomRightRadius: msg.sent ? 4 : 16,
                      borderBottomLeftRadius: msg.sent ? 16 : 4,
                    }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sent ? "justify-end" : ""}`}>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{msg.timestamp}</span>
                      {msg.sent && (
                        msg.read
                          ? <CheckCheck size={12} style={{ color: "#6366f1" }} />
                          : <Check size={12} style={{ color: "var(--text-muted)" }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:opacity-70 transition flex-shrink-0">
                  <Paperclip size={18} style={{ color: "var(--text-muted)" }} />
                </button>
                <input
                  type="text"
                  className="gl-input flex-1 text-sm"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 rounded-xl flex-shrink-0 transition hover:opacity-90"
                  style={{
                    backgroundColor: messageInput.trim() ? "#6366f1" : "rgba(99,102,241,0.1)",
                    color: messageInput.trim() ? "#fff" : "var(--text-muted)",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
