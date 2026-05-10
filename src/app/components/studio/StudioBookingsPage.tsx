import { useState } from "react";
import {
  Calendar, Clock, MapPin, User, Phone, Mail, Plus, X,
  Check, XCircle, RefreshCw, ChevronLeft, ChevronRight,
  IndianRupee, Filter, Search, FileText, MessageSquare,
  ArrowRight, Briefcase, Star, ToggleLeft, ToggleRight,
  CalendarDays, CheckCircle, AlertCircle, Timer,
} from "lucide-react";

// --- Types ---

interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: "Upcoming" | "In Progress" | "Completed" | "Cancelled";
  amount: number;
  notes: string;
  timeline: { status: string; date: string; note: string }[];
}

interface TimeSlot {
  time: string;
  enabled: boolean;
}

interface DayAvailability {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

// --- Mock Data ---

const mockBookings: Booking[] = [
  {
    id: "BK001",
    clientName: "Rajesh Mehta",
    clientPhone: "+91 98765 12345",
    clientEmail: "rajesh.mehta@gmail.com",
    serviceType: "Architectural Design Consultation",
    date: "2026-04-01",
    time: "10:00 AM",
    duration: "2 hours",
    location: "Baner, Pune",
    status: "Upcoming",
    amount: 15000,
    notes: "New 3BHK villa design. Client wants modern minimalist aesthetic with Vastu compliance. Plot size: 2400 sq.ft.",
    timeline: [
      { status: "Booking Created", date: "2026-03-25", note: "Client booked via platform" },
      { status: "Confirmed", date: "2026-03-26", note: "Appointment confirmed by studio" },
    ],
  },
  {
    id: "BK002",
    clientName: "Sunita Sharma",
    clientPhone: "+91 87654 98765",
    clientEmail: "sunita.sharma@yahoo.com",
    serviceType: "Interior Design Package",
    date: "2026-04-01",
    time: "02:00 PM",
    duration: "3 hours",
    location: "Koregaon Park, Pune",
    status: "In Progress",
    amount: 125000,
    notes: "Full 3BHK interior. Currently in material selection phase. Prefers Italian marble and teak wood finishes.",
    timeline: [
      { status: "Booking Created", date: "2026-03-10", note: "Client enquiry converted" },
      { status: "Confirmed", date: "2026-03-11", note: "Advance payment received" },
      { status: "Site Visit Done", date: "2026-03-15", note: "Measurements taken" },
      { status: "In Progress", date: "2026-03-20", note: "Design phase started" },
    ],
  },
  {
    id: "BK003",
    clientName: "Anil Kulkarni",
    clientPhone: "+91 99876 54321",
    clientEmail: "anil.k@outlook.com",
    serviceType: "Vastu Consultation",
    date: "2026-04-02",
    time: "11:00 AM",
    duration: "1.5 hours",
    location: "Hinjewadi, Pune",
    status: "Upcoming",
    amount: 8000,
    notes: "Existing flat Vastu analysis. Client concerned about kitchen and bedroom placement.",
    timeline: [
      { status: "Booking Created", date: "2026-03-28", note: "Online booking" },
      { status: "Confirmed", date: "2026-03-29", note: "Slot confirmed" },
    ],
  },
  {
    id: "BK004",
    clientName: "Priya Desai",
    clientPhone: "+91 90909 12121",
    clientEmail: "priya.desai@gmail.com",
    serviceType: "3D Visualization & Walkthrough",
    date: "2026-03-28",
    time: "04:00 PM",
    duration: "1 hour",
    location: "Virtual / Online",
    status: "Completed",
    amount: 25000,
    notes: "Final walkthrough presentation for 4BHK duplex project. Client approved all renders.",
    timeline: [
      { status: "Booking Created", date: "2026-03-15", note: "Client booked for review" },
      { status: "Confirmed", date: "2026-03-16", note: "Meeting scheduled" },
      { status: "Completed", date: "2026-03-28", note: "Presentation delivered, client approved" },
    ],
  },
  {
    id: "BK005",
    clientName: "Manoj Joshi",
    clientPhone: "+91 88888 77777",
    clientEmail: "manoj.joshi@corp.in",
    serviceType: "Project Management",
    date: "2026-03-25",
    time: "09:00 AM",
    duration: "Full day",
    location: "Wakad, Pune",
    status: "Completed",
    amount: 50000,
    notes: "Monthly site supervision. Checked plumbing, electrical rough-in. Flagged 3 issues with contractor.",
    timeline: [
      { status: "Booking Created", date: "2026-03-01", note: "Monthly recurring visit" },
      { status: "Confirmed", date: "2026-03-02", note: "Scheduled" },
      { status: "Completed", date: "2026-03-25", note: "Report submitted to client" },
    ],
  },
  {
    id: "BK006",
    clientName: "Kavita Nair",
    clientPhone: "+91 77777 66666",
    clientEmail: "kavita.nair@gmail.com",
    serviceType: "Architectural Design Consultation",
    date: "2026-03-20",
    time: "11:00 AM",
    duration: "2 hours",
    location: "Kothrud, Pune",
    status: "Cancelled",
    amount: 15000,
    notes: "Cancelled due to client travel. Rescheduling requested.",
    timeline: [
      { status: "Booking Created", date: "2026-03-12", note: "Client booking" },
      { status: "Confirmed", date: "2026-03-13", note: "Confirmed" },
      { status: "Cancelled", date: "2026-03-19", note: "Client requested cancellation due to travel" },
    ],
  },
  {
    id: "BK007",
    clientName: "Deepak Patil",
    clientPhone: "+91 95555 44444",
    clientEmail: "deepak.p@gmail.com",
    serviceType: "Interior Design Package",
    date: "2026-04-05",
    time: "10:30 AM",
    duration: "2 hours",
    location: "Viman Nagar, Pune",
    status: "Upcoming",
    amount: 95000,
    notes: "2BHK complete interior overhaul. Budget-conscious client, prefers laminate and engineered wood.",
    timeline: [
      { status: "Booking Created", date: "2026-03-30", note: "Referral from Rajesh Mehta" },
    ],
  },
];

const defaultSlots: TimeSlot[] = [
  { time: "09:00 AM", enabled: true },
  { time: "10:00 AM", enabled: true },
  { time: "11:00 AM", enabled: true },
  { time: "12:00 PM", enabled: false },
  { time: "01:00 PM", enabled: false },
  { time: "02:00 PM", enabled: true },
  { time: "03:00 PM", enabled: true },
  { time: "04:00 PM", enabled: true },
  { time: "05:00 PM", enabled: true },
  { time: "06:00 PM", enabled: false },
];

const mockAvailability: DayAvailability[] = [
  { day: "Monday", enabled: true, slots: defaultSlots.map((s) => ({ ...s })) },
  { day: "Tuesday", enabled: true, slots: defaultSlots.map((s) => ({ ...s })) },
  { day: "Wednesday", enabled: true, slots: defaultSlots.map((s) => ({ ...s })) },
  { day: "Thursday", enabled: true, slots: defaultSlots.map((s) => ({ ...s })) },
  { day: "Friday", enabled: true, slots: defaultSlots.map((s) => ({ ...s })) },
  { day: "Saturday", enabled: true, slots: [
    { time: "10:00 AM", enabled: true },
    { time: "11:00 AM", enabled: true },
    { time: "12:00 PM", enabled: true },
    { time: "01:00 PM", enabled: false },
    { time: "02:00 PM", enabled: true },
    { time: "03:00 PM", enabled: false },
  ] },
  { day: "Sunday", enabled: false, slots: defaultSlots.map((s) => ({ ...s, enabled: false })) },
];

const statusConfig: Record<string, { bg: string; text: string; border: string; icon: typeof Check }> = {
  "Upcoming": { bg: "rgba(59,130,246,0.1)", text: "#3b82f6", border: "rgba(59,130,246,0.25)", icon: CalendarDays },
  "In Progress": { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", border: "rgba(245,158,11,0.25)", icon: Timer },
  "Completed": { bg: "rgba(16,185,129,0.1)", text: "#10b981", border: "rgba(16,185,129,0.25)", icon: CheckCircle },
  "Cancelled": { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.25)", icon: XCircle },
};

// --- Helper ---

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// --- Component ---

export function StudioBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedDate, setSelectedDate] = useState<string>("2026-04-01");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(3); // April (0-indexed)
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState<DayAvailability[]>(mockAvailability);

  // Stats
  const today = "2026-04-01";
  const todaysBookings = bookings.filter((b) => b.date === today && b.status !== "Cancelled").length;
  const thisWeekBookings = bookings.filter((b) => {
    const d = new Date(b.date);
    const start = new Date("2026-03-30");
    const end = new Date("2026-04-05");
    return d >= start && d <= end && b.status !== "Cancelled";
  }).length;
  const pendingBookings = bookings.filter((b) => b.status === "Upcoming").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;

  const stats = [
    { label: "Today's Bookings", value: todaysBookings.toString(), icon: CalendarDays, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
    { label: "This Week", value: thisWeekBookings.toString(), icon: Calendar, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
    { label: "Pending", value: pendingBookings.toString(), icon: AlertCircle, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
    { label: "Completed", value: completedBookings.toString(), icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  ];

  // Calendar
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const bookingsByDate = bookings.reduce((acc, b) => {
    acc[b.date] = (acc[b.date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const matchSearch = !searchQuery ||
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate = !selectedDate || b.date === selectedDate;
    return matchStatus && matchSearch;
  });

  // Booking actions
  const updateStatus = (id: string, newStatus: Booking["status"]) => {
    setBookings(bookings.map((b) => {
      if (b.id !== id) return b;
      const updatedTimeline = [...b.timeline, {
        status: newStatus,
        date: today,
        note: `Status changed to ${newStatus}`,
      }];
      return { ...b, status: newStatus, timeline: updatedTimeline };
    }));
    if (selectedBooking?.id === id) {
      setSelectedBooking(null);
    }
  };

  // Availability
  const toggleDayAvailability = (index: number) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setAvailability(updated);
  };

  const toggleSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...availability];
    const slots = [...updated[dayIndex].slots];
    slots[slotIndex] = { ...slots[slotIndex], enabled: !slots[slotIndex].enabled };
    updated[dayIndex] = { ...updated[dayIndex], slots };
    setAvailability(updated);
  };

  const ToggleSwitch = ({ enabled, onToggle, size = 28 }: { enabled: boolean; onToggle: () => void; size?: number }) => (
    <button onClick={onToggle} className="transition-all shrink-0">
      {enabled ? <ToggleRight size={size} style={{ color: "var(--accent)" }} /> : <ToggleLeft size={size} style={{ color: "var(--text-muted)" }} />}
    </button>
  );

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Bookings &amp; Appointments
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Manage client appointments, track progress, and set availability
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAvailability(!showAvailability)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: showAvailability ? "rgba(255,106,61,0.1)" : "rgba(255,255,255,0.05)",
              color: showAvailability ? "var(--accent)" : "var(--text-secondary)",
              border: `1px solid ${showAvailability ? "rgba(255,106,61,0.2)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <Clock size={16} />
            Availability
          </button>
          <button
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <Plus size={16} />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="glass-card rounded-xl p-4 hover-lift transition-all"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Calendar + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
              <ChevronLeft size={16} style={{ color: "var(--text-muted)" }} />
            </button>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {monthNames[calMonth]} {calYear}
            </h3>
            <button onClick={nextMonth} className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
              <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center py-1" style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const bookingCount = bookingsByDate[dateStr] || 0;
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === today;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className="relative p-1.5 rounded-lg text-center transition-all hover:scale-105"
                  style={{
                    background: isSelected
                      ? "var(--accent)"
                      : isToday
                        ? "rgba(255,106,61,0.1)"
                        : "transparent",
                    color: isSelected ? "#fff" : "var(--text-primary)",
                    fontSize: "0.78rem",
                    fontWeight: isToday || isSelected ? 700 : 400,
                    border: isToday && !isSelected ? "1px solid rgba(255,106,61,0.3)" : "1px solid transparent",
                  }}
                >
                  {day}
                  {bookingCount > 0 && (
                    <div className="flex justify-center gap-0.5 mt-0.5">
                      {Array.from({ length: Math.min(bookingCount, 3) }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1 h-1 rounded-full"
                          style={{ background: isSelected ? "#fff" : "var(--accent)" }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Bookings */}
          {selectedDate && (
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                {new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
              {bookings.filter((b) => b.date === selectedDate).length === 0 ? (
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>No bookings for this date.</p>
              ) : (
                <div className="space-y-2">
                  {bookings.filter((b) => b.date === selectedDate).map((b) => {
                    const sc = statusConfig[b.status];
                    return (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBooking(b)}
                        className="w-full text-left p-2.5 rounded-lg transition-all hover:scale-[1.01]"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>{b.time}</span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: sc.bg, color: sc.text, fontSize: "0.6rem" }}
                          >
                            {b.status}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{b.clientName} - {b.serviceType}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search by client, service, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", "Upcoming", "In Progress", "Completed", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: statusFilter === s ? "var(--accent)" : "rgba(255,255,255,0.04)",
                    color: statusFilter === s ? "#fff" : "var(--text-secondary)",
                    border: `1px solid ${statusFilter === s ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredBookings.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center" style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Calendar size={40} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No bookings found.</p>
              </div>
            )}
            {filteredBookings.map((booking) => {
              const sc = statusConfig[booking.status];
              const StatusIcon = sc.icon;
              return (
                <div
                  key={booking.id}
                  className="glass-card rounded-xl p-4 hover-lift transition-all cursor-pointer"
                  style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <StatusIcon size={16} style={{ color: sc.text, marginTop: 2, flexShrink: 0 }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>{booking.clientName}</h4>
                            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{booking.id}</span>
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>{booking.serviceType}</p>
                        </div>
                        <span
                          className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 ml-6" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                        <span className="flex items-center gap-1"><Clock size={11} />{booking.time}</span>
                        <span className="flex items-center gap-1"><Timer size={11} />{booking.duration}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} />{booking.location}</span>
                        <span className="flex items-center gap-1 font-bold" style={{ color: "#10b981" }}>
                          <IndianRupee size={11} />{booking.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0 ml-6 sm:ml-0">
                      {booking.status === "Upcoming" && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, "In Progress"); }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, "Cancelled"); }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {booking.status === "In Progress" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, "Completed"); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
                        >
                          Complete
                        </button>
                      )}
                      {(booking.status === "Upcoming" || booking.status === "In Progress") && (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}
                        >
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="glass-card rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6"
            style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const b = selectedBooking;
              const sc = statusConfig[b.status];
              const StatusIcon = sc.icon;
              return (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <StatusIcon size={20} style={{ color: sc.text }} />
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>Booking {b.id}</h3>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <X size={18} style={{ color: "var(--text-muted)" }} />
                    </button>
                  </div>

                  {/* Client Info */}
                  <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Client Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <User size={14} style={{ color: "var(--accent)" }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{b.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} style={{ color: "var(--text-muted)" }} />
                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.clientPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <Mail size={14} style={{ color: "var(--text-muted)" }} />
                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.clientEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Service Details</h4>
                    <div className="space-y-2" style={{ fontSize: "0.82rem" }}>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Service</span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{b.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Date & Time</span>
                        <span style={{ color: "var(--text-primary)" }}>
                          {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at {b.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Duration</span>
                        <span style={{ color: "var(--text-primary)" }}>{b.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Location</span>
                        <span style={{ color: "var(--text-primary)" }}>{b.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Amount</span>
                        <span style={{ color: "#10b981", fontWeight: 700 }}>{"\u20B9"}{b.amount.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Notes</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{b.notes}</p>
                  </div>

                  {/* Timeline */}
                  <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Timeline</h4>
                    <div className="space-y-3">
                      {b.timeline.map((t, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ background: i === b.timeline.length - 1 ? "var(--accent)" : "rgba(255,255,255,0.15)", marginTop: 4 }}
                            />
                            {i < b.timeline.length - 1 && (
                              <div className="w-px flex-1 my-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                            )}
                          </div>
                          <div className="pb-2">
                            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>{t.status}</p>
                            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                              {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} - {t.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Availability Settings */}
      {showAvailability && (
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Clock size={18} style={{ color: "var(--accent)" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Weekly Availability</h3>
          </div>

          <div className="space-y-4">
            {availability.map((day, dayIdx) => (
              <div key={day.day}>
                <div className="flex items-center gap-3 mb-2">
                  <ToggleSwitch enabled={day.enabled} onToggle={() => toggleDayAvailability(dayIdx)} size={24} />
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: day.enabled ? "var(--text-primary)" : "var(--text-muted)",
                      width: 90,
                    }}
                  >
                    {day.day}
                  </span>
                  {!day.enabled && (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>Unavailable</span>
                  )}
                </div>
                {day.enabled && (
                  <div className="flex flex-wrap gap-2 ml-10">
                    {day.slots.map((slot, slotIdx) => (
                      <button
                        key={slot.time}
                        onClick={() => toggleSlot(dayIdx, slotIdx)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: slot.enabled ? "rgba(255,106,61,0.1)" : "rgba(255,255,255,0.03)",
                          color: slot.enabled ? "var(--accent)" : "var(--text-muted)",
                          border: `1px solid ${slot.enabled ? "rgba(255,106,61,0.25)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
