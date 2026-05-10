import { useState } from "react";
import {
  CalendarDays, Users, MapPin, Clock, Search, Filter,
  CheckCircle, XCircle, RefreshCw, X, ChevronDown,
  Building2, User, BarChart3, ChevronLeft, ChevronRight
} from "lucide-react";

const stats = [
  { label: "Today's Visits", value: "24", icon: CalendarDays, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  { label: "This Week", value: "142", icon: Users, color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
  { label: "Total Locations", value: "5", icon: MapPin, color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
  { label: "Capacity Utilization", value: "78%", icon: BarChart3, color: "#ff6a3d", bg: "rgba(255,106,61,0.1)", border: "rgba(255,106,61,0.2)" },
];

type BookingStatus = "Confirmed" | "Pending" | "Cancelled" | "Completed";
type VisitorType = "Studio" | "Individual";

interface MockBooking {
  id: number;
  visitor: string;
  visitorType: VisitorType;
  location: string;
  date: string;
  time: string;
  purpose: string;
  attendees: number;
  status: BookingStatus;
}

const mockBookings: MockBooking[] = [
  { id: 1, visitor: "DesignCraft Studios", visitorType: "Studio", location: "Gurugram", date: "2026-04-01", time: "10:00 AM", purpose: "Material Selection", attendees: 4, status: "Confirmed" },
  { id: 2, visitor: "Arjun Mehta", visitorType: "Individual", location: "Mumbai", date: "2026-04-01", time: "11:30 AM", purpose: "Sample Review", attendees: 1, status: "Confirmed" },
  { id: 3, visitor: "SpaceForm Architects", visitorType: "Studio", location: "Bengaluru", date: "2026-04-02", time: "02:00 PM", purpose: "Client Presentation", attendees: 6, status: "Pending" },
  { id: 4, visitor: "Priya Sharma", visitorType: "Individual", location: "Delhi", date: "2026-04-02", time: "10:00 AM", purpose: "AR Experience", attendees: 1, status: "Confirmed" },
  { id: 5, visitor: "BuildRight Engineering", visitorType: "Studio", location: "Chennai", date: "2026-04-03", time: "03:00 PM", purpose: "Product Comparison", attendees: 3, status: "Pending" },
  { id: 6, visitor: "Vikram Rao", visitorType: "Individual", location: "Bengaluru", date: "2026-04-03", time: "11:00 AM", purpose: "Material Research", attendees: 2, status: "Cancelled" },
  { id: 7, visitor: "EcoDesign Partners", visitorType: "Studio", location: "Hyderabad", date: "2026-04-04", time: "10:30 AM", purpose: "Sustainable Materials", attendees: 5, status: "Confirmed" },
  { id: 8, visitor: "Karan Singh", visitorType: "Individual", location: "Gurugram", date: "2026-04-04", time: "02:30 PM", purpose: "Free Consultation", attendees: 1, status: "Pending" },
  { id: 9, visitor: "NexGen Constructions", visitorType: "Studio", location: "Mumbai", date: "2026-04-05", time: "09:30 AM", purpose: "Bulk Material Review", attendees: 8, status: "Confirmed" },
  { id: 10, visitor: "Meera Nair", visitorType: "Individual", location: "Chennai", date: "2026-03-31", time: "04:00 PM", purpose: "Sample Collection", attendees: 1, status: "Completed" },
];

const kcLocations = [
  { name: "Gurugram", address: "Sector 44, Gurugram, Haryana", capacity: 40, hours: "10:00 AM - 6:00 PM", bookingsToday: 8 },
  { name: "Bengaluru", address: "Whitefield, Bengaluru, Karnataka", capacity: 35, hours: "10:00 AM - 6:00 PM", bookingsToday: 6 },
  { name: "Mumbai", address: "Andheri East, Mumbai, Maharashtra", capacity: 50, hours: "10:00 AM - 7:00 PM", bookingsToday: 12 },
  { name: "Chennai", address: "T. Nagar, Chennai, Tamil Nadu", capacity: 30, hours: "10:00 AM - 6:00 PM", bookingsToday: 5 },
  { name: "Hyderabad", address: "HITEC City, Hyderabad, Telangana", capacity: 35, hours: "10:00 AM - 6:00 PM", bookingsToday: 4 },
];

const statusColors: Record<BookingStatus, { color: string; bg: string }> = {
  Confirmed: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  Pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  Completed: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AdminKcBookingsPage() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [tab, setTab] = useState<"bookings" | "locations">("bookings");
  const [weekOffset] = useState(0);

  const filtered = mockBookings.filter((b) => {
    if (locationFilter !== "All" && b.location !== locationFilter) return false;
    if (search && !b.visitor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Simple week calendar data
  const today = new Date("2026-04-01");
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const getBookingsForDate = (date: Date) => {
    const ds = date.toISOString().split("T")[0];
    return mockBookings.filter((b) => b.date === ds);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>KC Bookings Management</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>Manage Knowledge Center visit bookings across all locations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4 transition-all hover:scale-[1.02]" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Week Calendar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Week Overview</h3>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"><ChevronLeft size={16} style={{ color: "var(--text-muted)" }} /></button>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {weekDates[0].toLocaleDateString("en-IN", { month: "short", day: "numeric" })} - {weekDates[6].toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <button className="p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"><ChevronRight size={16} style={{ color: "var(--text-muted)" }} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, i) => {
            const bookings = getBookingsForDate(date);
            const isToday = date.toISOString().split("T")[0] === "2026-04-01";
            return (
              <div key={i} className="rounded-xl p-3 text-center" style={{ background: isToday ? "var(--accent-light)" : "rgba(255,255,255,0.03)", border: isToday ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{DAYS[i]}</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: isToday ? "var(--accent)" : "var(--text-primary)", marginTop: 2 }}>{date.getDate()}</p>
                {bookings.length > 0 && (
                  <div className="flex justify-center gap-1 mt-2">
                    {bookings.slice(0, 3).map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    ))}
                    {bookings.length > 3 && <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>+{bookings.length - 3}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2">
        {(["bookings", "locations"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors" style={{ background: tab === t ? "var(--accent)" : "rgba(255,255,255,0.05)", color: tab === t ? "#fff" : "var(--text-secondary)" }}>
            {t === "bookings" ? "Bookings" : "KC Locations"}
          </button>
        ))}
      </div>

      {tab === "bookings" && (
        <>
          {/* Filters */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input className="gl-input w-full pl-9" placeholder="Search visitors..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <select className="gl-input pl-9 pr-8 appearance-none cursor-pointer" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                  <option value="All">All Locations</option>
                  {kcLocations.map((l) => <option key={l.name} value={l.name}>{l.name}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Visitor", "Type", "Location", "Date & Time", "Purpose", "Attendees", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3" style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td className="px-4 py-3" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{b.visitor}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                          {b.visitorType === "Studio" ? <Building2 size={13} /> : <User size={13} />}
                          {b.visitorType}
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}><div className="flex items-center gap-1"><MapPin size={12} />{b.location}</div></td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                        <div>{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{b.time}</div>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{b.purpose}</td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}><div className="flex items-center gap-1"><Users size={12} />{b.attendees}</div></td>
                      <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statusColors[b.status].bg, color: statusColors[b.status].color }}>{b.status}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Confirm"><CheckCircle size={15} style={{ color: "#10b981" }} /></button>
                          <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Reschedule"><RefreshCw size={15} style={{ color: "#3b82f6" }} /></button>
                          <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer" title="Cancel"><XCircle size={15} style={{ color: "#ef4444" }} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "locations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kcLocations.map((loc) => (
            <div key={loc.name} className="glass-card hover-lift rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <MapPin size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{loc.name}</h4>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{loc.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2" style={{ fontSize: "0.85rem" }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Capacity</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{loc.capacity} visitors</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Hours</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{loc.hours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Today&apos;s Bookings</span>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>{loc.bookingsToday}</span>
                </div>
              </div>
              <div className="mt-3 w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-2 rounded-full" style={{ width: `${(loc.bookingsToday / loc.capacity) * 100}%`, background: "var(--accent)" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
