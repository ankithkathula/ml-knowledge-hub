import { useState } from "react";
import {
  MapPin, Calendar, Clock, Plus, X, CheckCircle,
  ArrowRight, Building2, FileText, Star, Navigation,
} from "lucide-react";

// --- Types ---

interface KcVisit {
  id: string;
  location: string;
  address: string;
  date: string;
  time: string;
  purpose: string;
  status: "upcoming" | "completed";
  notes?: string;
  rating?: number;
}

// --- Mock Data ---

const mockVisits: KcVisit[] = [
  {
    id: "KV001",
    location: "MaterialKart Knowledge Centre - Koramangala",
    address: "2nd Floor, Forum Mall, Koramangala 5th Block, Bangalore - 560095",
    date: "5 Apr 2026",
    time: "11:00 AM",
    purpose: "Explore sustainable flooring options for a 3BHK renovation project",
    status: "upcoming",
  },
  {
    id: "KV002",
    location: "MaterialKart Knowledge Centre - Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad - 500033",
    date: "12 Apr 2026",
    time: "2:30 PM",
    purpose: "Compare waterproofing solutions and get expert advice on terrace treatment",
    status: "upcoming",
  },
  {
    id: "KV003",
    location: "MaterialKart Knowledge Centre - Koramangala",
    address: "2nd Floor, Forum Mall, Koramangala 5th Block, Bangalore - 560095",
    date: "15 Mar 2026",
    time: "10:00 AM",
    purpose: "Attended workshop on green building certifications (IGBC)",
    status: "completed",
    notes: "Excellent session by Dr. Suresh on IGBC Gold certification process. Collected brochures on eco-friendly cement brands. Need to follow up on UltraTech green range pricing.",
    rating: 5,
  },
  {
    id: "KV004",
    location: "MaterialKart Knowledge Centre - Whitefield",
    address: "Phoenix Marketcity, Whitefield Main Road, Bangalore - 560066",
    date: "28 Feb 2026",
    time: "3:00 PM",
    purpose: "Sample viewing - Italian marble and vitrified tiles",
    status: "completed",
    notes: "Viewed Kajaria's new 2026 collection. The Eternity series marble-finish tiles are stunning. Shortlisted 3 designs for the client. Pricing slightly above budget.",
    rating: 4,
  },
  {
    id: "KV005",
    location: "MaterialKart Knowledge Centre - Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad - 500033",
    date: "10 Feb 2026",
    time: "11:30 AM",
    purpose: "Paint colour consultation with Asian Paints expert",
    status: "completed",
    notes: "The colour consultant was very helpful. Finalised a warm neutral palette for the Banjara Hills villa. Asian Paints Royale range selected. Got a 15% trade discount.",
    rating: 5,
  },
];

const kcLocations = [
  "MaterialKart Knowledge Centre - Koramangala",
  "MaterialKart Knowledge Centre - Jubilee Hills",
  "MaterialKart Knowledge Centre - Whitefield",
  "MaterialKart Knowledge Centre - HITEC City",
  "MaterialKart Knowledge Centre - Indiranagar",
];

// --- Component ---

export function UserKcVisitsPage() {
  const [visits] = useState(mockVisits);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formLocation, setFormLocation] = useState(kcLocations[0]);
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formPurpose, setFormPurpose] = useState("");

  const upcoming = visits.filter((v) => v.status === "upcoming");
  const past = visits.filter((v) => v.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Knowledge Centre Visits</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Schedule and track your visits to MaterialKart experience centres
          </p>
        </div>
        <button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#6366f1" }}
        >
          {showScheduleForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Schedule Visit</>}
        </button>
      </div>

      {/* Schedule Form */}
      {showScheduleForm && (
        <div className="glass-card p-6">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Calendar size={18} style={{ color: "#6366f1" }} /> Schedule a Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Location</label>
              <select
                className="gl-input w-full text-sm"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
              >
                {kcLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Date</label>
              <input
                type="date"
                className="gl-input w-full text-sm"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Time</label>
              <input
                type="time"
                className="gl-input w-full text-sm"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Purpose</label>
              <textarea
                className="gl-input w-full h-20 resize-none text-sm"
                placeholder="What would you like to explore at the KC?"
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowScheduleForm(false)}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#6366f1" }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Visits */}
      <div>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Navigation size={16} style={{ color: "#6366f1" }} /> Upcoming Visits ({upcoming.length})
        </h2>
        {upcoming.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Calendar size={32} className="mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No upcoming visits scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((v) => (
              <div key={v.id} className="glass-card p-5 hover-lift transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(99,102,241,0.1)" }}
                    >
                      <Building2 size={18} style={{ color: "#6366f1" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{v.location}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <MapPin size={11} /> {v.address}
                      </p>
                      <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>{v.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: "#6366f1" }}>
                        <Calendar size={12} className="inline mr-1" />{v.date}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        <Clock size={11} className="inline mr-1" />{v.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Visits */}
      <div>
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <CheckCircle size={16} style={{ color: "#16a34a" }} /> Past Visits ({past.length})
        </h2>
        <div className="space-y-3">
          {past.map((v) => (
            <div key={v.id} className="glass-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                  >
                    <CheckCircle size={18} style={{ color: "#16a34a" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{v.location}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{v.purpose}</p>
                    {v.notes && (
                      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(99,102,241,0.04)" }}>
                        <p className="text-xs font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                          <FileText size={11} /> Notes
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{v.date}</p>
                  {v.rating && (
                    <div className="flex items-center gap-0.5 mt-1 justify-end">
                      {Array.from({ length: v.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
