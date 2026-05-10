import { useState, useRef, useEffect } from "react";
import {
  Search, Send, Paperclip, Phone, Video, MoreVertical,
  Plus, X, User, Check, CheckCheck, Image, File,
  MessageSquare, ArrowRight, Circle,
} from "lucide-react";

// --- Types ---

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean; // true = sent by consultant, false = received
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
  typing?: boolean;
}

// --- Mock Data ---

const mockConversations: Conversation[] = [
  {
    id: "C001",
    name: "Priya Desai",
    avatar: "PD",
    lastMessage: "Hi Arjun, can you recommend eco-friendly tiles for a bathroom renovation?",
    lastMessageTime: "10:24 AM",
    unreadCount: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hi Arjun! I saw your profile on MaterialKart. Very impressive portfolio!", timestamp: "9:45 AM", sent: false, read: true },
      { id: "m2", text: "Thank you, Priya! How can I help you today?", timestamp: "9:48 AM", sent: true, read: true },
      { id: "m3", text: "We are renovating our 2BHK bathroom in Koramangala, Bangalore. Looking for something modern yet sustainable.", timestamp: "9:52 AM", sent: false, read: true },
      { id: "m4", text: "Great choice! For eco-friendly options, I'd recommend recycled glass mosaic tiles from Orientbell or Kajaria's GreenLam collection. Both are durable and sustainable.", timestamp: "9:58 AM", sent: true, read: true },
      { id: "m5", text: "That sounds perfect! What's the approximate cost per sq.ft.?", timestamp: "10:05 AM", sent: false, read: true },
      { id: "m6", text: "Recycled glass mosaics range from Rs 120-280 per sq.ft. depending on the design. The GreenLam tiles are around Rs 85-150 per sq.ft. I can share a detailed price comparison sheet.", timestamp: "10:12 AM", sent: true, read: true },
      { id: "m7", text: "Please do! Also, do you offer site visit consultations in Bangalore?", timestamp: "10:18 AM", sent: false, read: true },
      { id: "m8", text: "Hi Arjun, can you recommend eco-friendly tiles for a bathroom renovation?", timestamp: "10:24 AM", sent: false, read: false },
    ],
    typing: false,
  },
  {
    id: "C002",
    name: "Amit Verma",
    avatar: "AV",
    lastMessage: "Thanks for the consultation yesterday! The cement brand comparison was really helpful.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hello Arjun, I wanted to follow up on our meeting regarding cement brands for the foundation work.", timestamp: "Yesterday 3:15 PM", sent: false, read: true },
      { id: "m2", text: "Of course, Amit! Based on our discussion, I strongly recommend UltraTech PPC for your foundation. It offers better workability compared to ACC or Ambuja in the Hyderabad climate.", timestamp: "Yesterday 3:22 PM", sent: true, read: true },
      { id: "m3", text: "What about the pricing? I got a quote of Rs 380 per bag from a local dealer.", timestamp: "Yesterday 3:30 PM", sent: false, read: true },
      { id: "m4", text: "That's slightly above market rate. I can connect you with our verified dealer network. Current wholesale price is around Rs 340-355 per bag for UltraTech PPC.", timestamp: "Yesterday 3:35 PM", sent: true, read: true },
      { id: "m5", text: "Thanks for the consultation yesterday! The cement brand comparison was really helpful.", timestamp: "Yesterday 4:00 PM", sent: false, read: true },
    ],
    typing: false,
  },
  {
    id: "C003",
    name: "Neha Kulkarni",
    avatar: "NK",
    lastMessage: "Would you be available for a site visit in Banjara Hills next week?",
    lastMessageTime: "2d ago",
    unreadCount: 1,
    online: true,
    messages: [
      { id: "m1", text: "Hi Arjun, I'm looking for a material consultant for our new villa project in Banjara Hills, Hyderabad.", timestamp: "Mar 29, 11:00 AM", sent: false, read: true },
      { id: "m2", text: "Hello Neha! I'd be happy to assist. Could you share more details about the project scope?", timestamp: "Mar 29, 11:15 AM", sent: true, read: true },
      { id: "m3", text: "It's a 4500 sq.ft. independent villa. We need guidance on everything from structural materials to interior finishes. Budget is around Rs 1.2 crore for materials.", timestamp: "Mar 29, 11:30 AM", sent: false, read: true },
      { id: "m4", text: "That's a comprehensive project! I can definitely help with end-to-end material selection. Let me put together a preliminary material plan.", timestamp: "Mar 29, 12:00 PM", sent: true, read: true },
      { id: "m5", text: "Would you be available for a site visit in Banjara Hills next week?", timestamp: "Mar 30, 10:00 AM", sent: false, read: false },
    ],
    typing: false,
  },
  {
    id: "C004",
    name: "Rajesh Mehta",
    avatar: "RM",
    lastMessage: "The Somany tiles samples look great! Let's finalize the living room design.",
    lastMessageTime: "3d ago",
    unreadCount: 0,
    online: false,
    messages: [
      { id: "m1", text: "Arjun, I checked the Somany tiles showroom as you suggested. The Duragres collection is stunning!", timestamp: "Mar 28, 2:00 PM", sent: false, read: true },
      { id: "m2", text: "Glad you liked them! The Duragres 800x1600 slabs are perfect for your living room. The marble finish variant would pair beautifully with the Italian flooring we discussed.", timestamp: "Mar 28, 2:15 PM", sent: true, read: true },
      { id: "m3", text: "The Somany tiles samples look great! Let's finalize the living room design.", timestamp: "Mar 28, 3:00 PM", sent: false, read: true },
    ],
    typing: false,
  },
  {
    id: "C005",
    name: "Sunita Sharma",
    avatar: "SS",
    lastMessage: "Can we reschedule the interior material review to Thursday?",
    lastMessageTime: "4d ago",
    unreadCount: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hi Arjun, the teak wood panel samples arrived. Quality looks excellent!", timestamp: "Mar 27, 10:00 AM", sent: false, read: true },
      { id: "m2", text: "Wonderful! Century Ply's teak veneers are indeed top quality. We should review the full material board together.", timestamp: "Mar 27, 10:30 AM", sent: true, read: true },
      { id: "m3", text: "Can we reschedule the interior material review to Thursday?", timestamp: "Mar 27, 4:00 PM", sent: false, read: true },
    ],
    typing: false,
  },
  {
    id: "C006",
    name: "Karthik Nair",
    avatar: "KN",
    lastMessage: "The waterproofing work is progressing well. Dr. Fixit was a great suggestion!",
    lastMessageTime: "5d ago",
    unreadCount: 0,
    online: true,
    messages: [
      { id: "m1", text: "Arjun, quick update - the contractor started applying Dr. Fixit Raincoat on the terrace today.", timestamp: "Mar 26, 9:00 AM", sent: false, read: true },
      { id: "m2", text: "Great! Make sure they apply at least 2 coats with 24-hour gap between each. Also ensure the surface is clean and dry before application.", timestamp: "Mar 26, 9:15 AM", sent: true, read: true },
      { id: "m3", text: "The waterproofing work is progressing well. Dr. Fixit was a great suggestion!", timestamp: "Mar 26, 5:00 PM", sent: false, read: true },
    ],
    typing: false,
  },
];

const recipientSuggestions = [
  "Meera Reddy", "Vikram Patel", "Ananya Iyer", "Ravi Sharma", "Deepak Gupta",
];

// --- Component ---

export default function ConsultantMessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newRecipient, setNewRecipient] = useState("");
  const [recipientResults, setRecipientResults] = useState<string[]>([]);
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  function handleSelectConversation(id: string) {
    setActiveConvoId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c
      )
    );
  }

  function handleRecipientSearch(query: string) {
    setNewRecipient(query);
    if (query.length > 0) {
      setRecipientResults(
        recipientSuggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      );
    } else {
      setRecipientResults([]);
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Messages
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {conversations.reduce((sum, c) => sum + c.unreadCount, 0)} unread messages
          </p>
        </div>
        <button
          onClick={() => setShowNewMessage(true)}
          className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Plus size={16} />
          New Message
        </button>
      </div>

      {/* Split Layout */}
      <div className="glass-card flex-1 flex overflow-hidden rounded-2xl">
        {/* Left: Conversation List */}
        <div
          className="w-80 flex-shrink-0 flex flex-col border-r"
          style={{ borderColor: "var(--accent-light)" }}
        >
          {/* Search */}
          <div className="p-3 border-b" style={{ borderColor: "var(--accent-light)" }}>
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                className="gl-input pl-9 w-full text-sm"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => handleSelectConversation(convo.id)}
                className="w-full text-left p-3 flex items-start gap-3 transition-colors border-b"
                style={{
                  borderColor: "var(--accent-light)",
                  backgroundColor:
                    activeConvoId === convo.id ? "var(--accent-light)" : "transparent",
                }}
              >
                {/* Avatar with online dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: convo.unreadCount > 0 ? "rgba(255,106,61,0.15)" : "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    {convo.avatar}
                  </div>
                  {convo.online && (
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "var(--bg-base)",
                      }}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className="text-sm font-semibold truncate"
                      style={{
                        color: convo.unreadCount > 0 ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      {convo.name}
                    </span>
                    <span className="text-[10px] flex-shrink-0 ml-2" style={{ color: "var(--text-muted)" }}>
                      {convo.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className="text-xs truncate"
                      style={{
                        color: convo.unreadCount > 0 ? "var(--text-primary)" : "var(--text-muted)",
                        fontWeight: convo.unreadCount > 0 ? 600 : 400,
                      }}
                    >
                      {convo.lastMessage}
                    </p>
                    {convo.unreadCount > 0 && (
                      <span
                        className="ml-2 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {convo.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col">
          {!activeConvo ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--accent-light)" }}
              >
                <MessageSquare size={28} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                Select a conversation
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Choose a conversation from the list to start messaging
              </p>
            </div>
          ) : (
            <>
              {/* Conversation Header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "var(--accent-light)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: "var(--accent-light)",
                        color: "var(--accent)",
                      }}
                    >
                      {activeConvo.avatar}
                    </div>
                    {activeConvo.online && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                        style={{
                          backgroundColor: "#10b981",
                          borderColor: "var(--bg-base)",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {activeConvo.name}
                    </h3>
                    <p className="text-[11px]" style={{ color: activeConvo.online ? "#10b981" : "var(--text-muted)" }}>
                      {activeConvo.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Phone size={16} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Video size={16} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {activeConvo.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[70%] px-4 py-2.5 rounded-2xl"
                      style={{
                        backgroundColor: msg.sent
                          ? "rgba(255,106,61,0.12)"
                          : "var(--accent-light)",
                        borderBottomRightRadius: msg.sent ? 4 : 16,
                        borderBottomLeftRadius: msg.sent ? 16 : 4,
                      }}
                    >
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                        {msg.text}
                      </p>
                      <div
                        className={`flex items-center gap-1 mt-1 ${
                          msg.sent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {msg.timestamp}
                        </span>
                        {msg.sent && (
                          msg.read ? (
                            <CheckCheck size={12} style={{ color: "#3b82f6" }} />
                          ) : (
                            <Check size={12} style={{ color: "var(--text-muted)" }} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {activeConvo.typing && (
                  <div className="flex justify-start">
                    <div
                      className="px-4 py-3 rounded-2xl"
                      style={{ backgroundColor: "var(--accent-light)" }}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div
                className="px-4 py-3 border-t flex items-center gap-3"
                style={{ borderColor: "var(--accent-light)" }}
              >
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ color: "var(--text-muted)", backgroundColor: "var(--accent-light)" }}
                >
                  <Paperclip size={16} />
                </button>
                <input
                  type="text"
                  className="gl-input flex-1"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: messageInput.trim() ? "var(--accent)" : "var(--accent-light)",
                    color: messageInput.trim() ? "#fff" : "var(--text-muted)",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="glass-card w-full max-w-md p-6 relative"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            <button
              onClick={() => {
                setShowNewMessage(false);
                setNewRecipient("");
                setRecipientResults([]);
              }}
              className="absolute top-4 right-4"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              New Message
            </h3>

            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                className="gl-input pl-9 w-full"
                placeholder="Search for a recipient..."
                value={newRecipient}
                onChange={(e) => handleRecipientSearch(e.target.value)}
                autoFocus
              />
            </div>

            {recipientResults.length > 0 && (
              <div
                className="mt-2 rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--accent-light)" }}
              >
                {recipientResults.map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setShowNewMessage(false);
                      setNewRecipient("");
                      setRecipientResults([]);
                      // In production, create/find conversation
                    }}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-[var(--accent-light)]"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: "var(--accent-light)",
                        color: "var(--accent)",
                      }}
                    >
                      {name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {newRecipient.length > 0 && recipientResults.length === 0 && (
              <p className="text-xs mt-3 text-center" style={{ color: "var(--text-muted)" }}>
                No contacts found matching "{newRecipient}"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
