import { useState, useCallback } from "react";
import { MapPin, Navigation, Search, Loader2, AlertCircle, Phone, Clock, Lock, X, CheckCircle2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface StoreLocation {
  id: string;
  name: string;
  type: "flagship" | "dealer" | "depot" | "showroom";
  address: string;
  area: string;
  city: string;
  pincode: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
}

export interface StoreLeadEntry {
  id: string;
  phone: string;
  email: string;
  storeName: string;
  storeCity: string;
  brandName: string;
  timestamp: string;
}

export const ML_STORE_LEADS_KEY = "ml_store_leads";
const ML_UNLOCKED_KEY = "ml_unlocked_stores";

interface StoreNavigatorProps {
  stores: StoreLocation[];
  brandName: string;
  accentColor?: string;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceColor(km: number): string {
  if (km < 5) return "#16a34a";
  if (km < 20) return "#d97706";
  return "#dc2626";
}

function formatDist(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

const TYPE_LABEL: Record<StoreLocation["type"], string> = {
  flagship: "Flagship",
  dealer:   "Authorised Dealer",
  depot:    "Supply Depot",
  showroom: "Showroom",
};

function openMaps(store: StoreLocation) {
  window.open(
    `https://www.google.com/maps?q=${store.lat},${store.lng}+(${encodeURIComponent(store.name)})`,
    "_blank",
    "noopener"
  );
}

function loadUnlocked(): Set<string> {
  try {
    const s = localStorage.getItem(ML_UNLOCKED_KEY);
    return new Set(s ? JSON.parse(s) : []);
  } catch { return new Set(); }
}

/* ── Lead-gate modal ──────────────────────────────────────────────────── */

function LeadGateModal({
  store,
  brandName,
  accentColor,
  onClose,
  onUnlock,
}: {
  store: StoreLocation;
  brandName: string;
  accentColor: string;
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const p = phone.trim();
    const e = email.trim();
    if (!p || !e) { setError("Both fields are required."); return; }
    if (!/^\+?[\d\s\-]{7,15}$/.test(p)) { setError("Enter a valid phone number."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setError("Enter a valid email address."); return; }

    const lead: StoreLeadEntry = {
      id: `sl-${Date.now()}`,
      phone: p,
      email: e,
      storeName: store.name,
      storeCity: store.city,
      brandName,
      timestamp: new Date().toISOString(),
    };

    const existing: StoreLeadEntry[] = JSON.parse(localStorage.getItem(ML_STORE_LEADS_KEY) || "[]");
    existing.push(lead);
    localStorage.setItem(ML_STORE_LEADS_KEY, JSON.stringify(existing));

    onUnlock();
    setSubmitted(true);
    setError("");
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 24px 80px rgba(0,0,0,0.22)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${accentColor}15` }}
            >
              <Lock className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#111" }}>
                {submitted ? "Details Unlocked!" : "Unlock Store Details"}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#888" }}>
                {store.name}, {store.city}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          {!submitted ? (
            <>
              <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.65, marginBottom: 20 }}>
                Get the phone number, exact address, and directions for this{" "}
                <strong style={{ color: "#111" }}>{brandName}</strong> store. We'll
                only use your details to share relevant product updates.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "#888", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(""); }}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: error && !phone ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "#888", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      className="w-full h-10 pl-9 pr-3 rounded-xl text-[13px] outline-none"
                      style={{ background: "rgba(0,0,0,0.04)", border: error && !email ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[11px] font-semibold" style={{ color: "#ef4444" }}>{error}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 w-full h-11 rounded-xl text-[13px] font-bold text-white transition-all"
                style={{ background: accentColor }}
              >
                Get Store Details
              </button>

              <p className="mt-3 text-center text-[10px]" style={{ color: "#aaa" }}>
                Your details are safe. We won't spam you.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(16,185,129,0.1)" }}
              >
                <CheckCircle2 className="w-7 h-7" style={{ color: "#10b981" }} />
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111", marginBottom: 8 }}>
                Store details unlocked!
              </div>
              <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6, marginBottom: 20 }}>
                You can now see the full address, phone number, and open the location in Google Maps.
              </p>
              <button
                onClick={onClose}
                className="w-full h-11 rounded-xl text-[13px] font-bold text-white"
                style={{ background: accentColor }}
              >
                View Store Info
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

export function StoreNavigator({ stores, brandName, accentColor = "#FF6A3D" }: StoreNavigatorProps) {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoState, setGeoState] = useState<"idle" | "loading" | "denied" | "ok">("idle");
  const [pincode, setPincode] = useState("");
  const [unlockedStores, setUnlockedStores] = useState<Set<string>>(loadUnlocked);
  const [captureStore, setCaptureStore] = useState<(StoreLocation & { distKm: number | null }) | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setGeoState("ok"); },
      () => setGeoState("denied"),
      { timeout: 8000 }
    );
  }, []);

  const filtered = stores
    .filter((s) => pincode.trim() === "" ? true : s.pincode.startsWith(pincode.trim()))
    .map((s) => ({ ...s, distKm: userCoords ? haversineKm(userCoords.lat, userCoords.lng, s.lat, s.lng) : null }))
    .sort((a, b) => a.distKm !== null && b.distKm !== null ? a.distKm - b.distKm : 0);

  function handleCardClick(store: StoreLocation & { distKm: number | null }) {
    if (unlockedStores.has(store.id)) {
      openMaps(store);
    } else {
      setCaptureStore(store);
    }
  }

  function handleUnlock(storeId: string) {
    const next = new Set(unlockedStores);
    next.add(storeId);
    setUnlockedStores(next);
    localStorage.setItem(ML_UNLOCKED_KEY, JSON.stringify([...next]));
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">
              Find a Store
            </h2>
          </div>
          <p className="text-[13px] text-gray-400 ml-11">
            {stores.length} authorised {brandName} locations
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[200px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/, ""))}
              placeholder="Filter by pincode"
              className="w-full h-[38px] pl-8 pr-3 bg-[#F8FAFC] border border-[#E6EAF0] rounded-lg text-[13px] outline-none focus:border-gray-300 transition-all"
            />
          </div>
          <button
            onClick={requestLocation}
            disabled={geoState === "loading"}
            className="h-[38px] px-3 flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E6EAF0] rounded-lg text-[12px] font-medium text-gray-600 hover:border-gray-300 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {geoState === "loading" ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Navigation size={13} style={{ color: geoState === "ok" ? accentColor : undefined }} />
            )}
            {geoState === "ok" ? "Located" : "Near me"}
          </button>
        </div>
      </div>

      {geoState === "denied" && (
        <div className="flex items-center gap-2 mb-4 text-[12px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5">
          <AlertCircle size={13} />
          Location access denied — distances unavailable. Search by pincode above.
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <MapPin size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-[13px]">No stores found for pincode "{pincode}"</p>
        </div>
      )}

      {/* Store grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((store) => {
          const unlocked = unlockedStores.has(store.id);
          return (
            <button
              key={store.id}
              onClick={() => handleCardClick(store)}
              className="text-left bg-white border border-[#E6EAF0] rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all group cursor-pointer relative"
            >
              {/* Lock badge for locked stores */}
              {!unlocked && (
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(0,0,0,0.06)", color: "#888" }}
                >
                  <Lock size={9} /> Tap to unlock
                </div>
              )}

              {/* Type badge + distance */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
                >
                  {TYPE_LABEL[store.type]}
                </span>
                {store.distKm !== null && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: distanceColor(store.distKm) }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: distanceColor(store.distKm) }} />
                    {formatDist(store.distKm)} away
                  </span>
                )}
              </div>

              {/* Store name — always visible */}
              <h3 className="text-[14px] font-semibold text-[#111111] group-hover:text-[#0F172A] mb-1 leading-snug pr-16">
                {store.name}
              </h3>

              {/* Area + city visible; exact address blurred */}
              <div className="flex items-start gap-1.5 mb-2">
                <MapPin size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[12px] text-gray-600 font-medium">
                    {store.area}, {store.city}
                  </p>
                  <p
                    className="text-[12px] text-gray-400 mt-0.5"
                    style={!unlocked ? { filter: "blur(4px)", userSelect: "none", pointerEvents: "none" } : undefined}
                  >
                    {store.address} — {store.pincode}
                  </p>
                </div>
              </div>

              {/* Phone — blurred when locked */}
              {store.phone && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Phone size={11} className="text-gray-400 flex-shrink-0" />
                  <span
                    className="text-[12px] text-gray-500 whitespace-nowrap"
                    style={!unlocked ? { filter: "blur(4px)", userSelect: "none", pointerEvents: "none" } : undefined}
                  >
                    {store.phone}
                  </span>
                </div>
              )}

              {/* Hours — always visible */}
              {store.hours && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock size={11} className="text-gray-400" />
                  <span className="text-[12px] text-gray-500">{store.hours}</span>
                </div>
              )}

              {/* Open in Maps CTA — blurred when locked */}
              <div
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mt-3 pt-3 border-t border-[#F0F0F0]"
                style={{
                  color: unlocked ? accentColor : "#999",
                  ...(unlocked ? {} : { filter: "blur(3px)", userSelect: "none", pointerEvents: "none" }),
                  opacity: unlocked ? 0.85 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <ExternalLink size={11} />
                {unlocked ? "Open in Google Maps" : "Open in Google Maps"}
              </div>

              {/* Unlock prompt overlay when locked */}
              {!unlocked && (
                <div
                  className="absolute inset-0 rounded-xl flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.92) 0%, transparent 50%)" }}
                >
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                    style={{ background: accentColor, boxShadow: `0 4px 14px ${accentColor}50` }}
                  >
                    <Lock size={10} /> Unlock details
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lead gate modal */}
      <AnimatePresence>
        {captureStore && (
          <LeadGateModal
            store={captureStore}
            brandName={brandName}
            accentColor={accentColor}
            onClose={() => setCaptureStore(null)}
            onUnlock={() => handleUnlock(captureStore.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
