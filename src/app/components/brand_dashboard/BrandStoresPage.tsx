import { useState } from "react";
import {
  MapPin, Phone, Clock, Plus, X, Pencil, Trash2, Search,
  ExternalLink, Store, CheckCircle,
} from "lucide-react";
import { Link } from "react-router";
import type { StoreLocation } from "../shared/StoreNavigator";

const ACCENT = "#0284c7";
const ACCENT_RGB = "2,132,199";

const STORE_TYPES: StoreLocation["type"][] = ["flagship", "dealer", "depot", "showroom"];

const TYPE_META: Record<StoreLocation["type"], { label: string; color: string; bg: string }> = {
  flagship: { label: "Flagship",         color: "#0284c7", bg: "rgba(2,132,199,0.1)"   },
  dealer:   { label: "Authorised Dealer", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  depot:    { label: "Supply Depot",      color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  showroom: { label: "Showroom",          color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};

const SEED_STORES: StoreLocation[] = [
  { id: "kj1", name: "Kajaria Experience Centre",     type: "flagship", address: "Plot 42, G Block",                   area: "BKC",          city: "Mumbai",      pincode: "400051", phone: "+91 22 6652 5000", hours: "Mon–Sat 10am–7pm",   lat: 19.0659, lng: 72.8658 },
  { id: "kj2", name: "Kajaria World Showroom",        type: "showroom", address: "Shop 12, Linking Road",              area: "Bandra West",  city: "Mumbai",      pincode: "400050", phone: "+91 22 2632 8800", hours: "Mon–Sat 10am–7:30pm",lat: 19.0606, lng: 72.8365 },
  { id: "kj3", name: "Kajaria Eternity Studio",       type: "showroom", address: "7 Senapati Bapat Marg",              area: "Dadar West",   city: "Mumbai",      pincode: "400028", phone: "+91 22 2436 7700", hours: "Mon–Sat 10am–6:30pm",lat: 19.0178, lng: 72.8478 },
  { id: "kj4", name: "Kajaria Tiles Distribution Depot", type: "depot", address: "MIDC Road, Wagle Estate",            area: "Thane West",   city: "Thane",       pincode: "400604", phone: "+91 22 2580 3300", hours: "Mon–Fri 9am–6pm",    lat: 19.2183, lng: 72.9781 },
  { id: "kj5", name: "Kajaria Authorised Dealer — Kharghar", type: "dealer", address: "Plot 18, Sector 19",            area: "Kharghar",     city: "Navi Mumbai", pincode: "410210", phone: "+91 22 2774 6600", hours: "Mon–Sat 9am–6pm",    lat: 19.0476, lng: 73.0688 },
  { id: "kj6", name: "Kajaria Tile Boutique — Ghodbunder", type: "dealer",  address: "Ghodbunder Road, Near Viviana Mall", area: "Manpada",  city: "Thane",       pincode: "400610", phone: "+91 22 2596 1100", hours: "Mon–Sat 9am–6pm",    lat: 19.2468, lng: 72.9659 },
];

const EMPTY_FORM = {
  name: "", type: "dealer" as StoreLocation["type"],
  address: "", area: "", city: "", pincode: "",
  phone: "", hours: "",
};

type Form = typeof EMPTY_FORM;

export function BrandStoresPage() {
  const [stores, setStores] = useState<StoreLocation[]>(SEED_STORES);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | StoreLocation["type"]>("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(EMPTY_FORM);

  const filtered = stores.filter(s => {
    if (typeFilter !== "All" && s.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.pincode.includes(q) ||
        s.area.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    total: stores.length,
    flagship: stores.filter(s => s.type === "flagship").length,
    dealer:   stores.filter(s => s.type === "dealer").length,
    depot:    stores.filter(s => s.type === "depot").length,
    showroom: stores.filter(s => s.type === "showroom").length,
  };

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  }

  function openEdit(store: StoreLocation) {
    setEditingId(store.id);
    setForm({
      name: store.name, type: store.type,
      address: store.address, area: store.area,
      city: store.city, pincode: store.pincode,
      phone: store.phone ?? "", hours: store.hours ?? "",
    });
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function saveForm() {
    if (!form.name.trim() || !form.city.trim() || !form.pincode.trim()) return;
    if (editingId) {
      setStores(prev => prev.map(s => s.id === editingId
        ? { ...s, ...form, phone: form.phone || undefined, hours: form.hours || undefined }
        : s
      ));
    } else {
      setStores(prev => [{
        id: `store-${Date.now()}`,
        ...form,
        phone: form.phone || undefined,
        hours: form.hours || undefined,
        lat: 19.076,
        lng: 72.877,
      }, ...prev]);
    }
    closeDrawer();
  }

  function confirmDelete() {
    if (deleteId) setStores(prev => prev.filter(s => s.id !== deleteId));
    setDeleteId(null);
  }

  const f = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>Store Management</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
            Manage your authorised stores and dealer locations visible on your public brand page.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/brand/Kajaria%20Ceramics"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold"
            style={{ border: `1px solid rgba(${ACCENT_RGB},0.35)`, color: ACCENT, background: `rgba(${ACCENT_RGB},0.05)` }}
          >
            <ExternalLink style={{ width: 13, height: 13 }} /> View on site
          </Link>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold text-white"
            style={{ background: ACCENT }}
          >
            <Plus style={{ width: 14, height: 14 }} /> Add Store
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {[
          { label: "Total",    value: counts.total,    color: ACCENT,    bg: `rgba(${ACCENT_RGB},0.08)` },
          { label: "Flagship", value: counts.flagship, color: "#0284c7", bg: "rgba(2,132,199,0.08)"    },
          { label: "Dealers",  value: counts.dealer,   color: "#10b981", bg: "rgba(16,185,129,0.08)"   },
          { label: "Depots",   value: counts.depot,    color: "#f59e0b", bg: "rgba(245,158,11,0.08)"   },
          { label: "Showrooms",value: counts.showroom, color: "#8b5cf6", bg: "rgba(139,92,246,0.08)"   },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: s.bg }}>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
          {(["All", ...STORE_TYPES] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-3.5 py-2 text-[11px] font-bold transition-all capitalize"
              style={{
                background: typeFilter === t ? ACCENT : "white",
                color: typeFilter === t ? "white" : "var(--text-muted)",
              }}
            >
              {t === "All" ? "All" : TYPE_META[t].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.1)", background: "white", minWidth: 180 }}>
          <Search style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, city, or pincode…"
            className="flex-1 text-[13px] outline-none bg-transparent"
            style={{ color: "var(--text-primary)" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: "var(--text-muted)" }}>
              <X style={{ width: 12, height: 12 }} />
            </button>
          )}
        </div>
      </div>

      {/* Store grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(store => {
          const tm = TYPE_META[store.type];
          return (
            <div
              key={store.id}
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tm.bg }}>
                    <Store style={{ width: 17, height: 17, color: tm.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold truncate" style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{store.name}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5" style={{ background: tm.bg, color: tm.color }}>
                      {tm.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEdit(store)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                  >
                    <Pencil style={{ width: 12, height: 12 }} />
                  </button>
                  <button
                    onClick={() => setDeleteId(store.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                  >
                    <Trash2 style={{ width: 12, height: 12 }} />
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2" style={{ color: "var(--text-muted)" }}>
                <MapPin style={{ width: 13, height: 13, marginTop: 2, flexShrink: 0 }} />
                <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                  {store.address}, {store.area}<br />
                  {store.city} — {store.pincode}
                </div>
              </div>

              {/* Phone + Hours */}
              <div className="space-y-1">
                {store.phone && (
                  <div className="flex items-center gap-2">
                    <Phone style={{ width: 12, height: 12, color: "var(--text-muted)", flexShrink: 0 }} />
                    <a href={`tel:${store.phone}`} className="text-[12px] whitespace-nowrap hover:underline" style={{ color: ACCENT }}>
                      {store.phone}
                    </a>
                  </div>
                )}
                {store.hours && (
                  <div className="flex items-center gap-2">
                    <Clock style={{ width: 12, height: 12, color: "var(--text-muted)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{store.hours}</span>
                  </div>
                )}
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-1.5 mt-auto pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <CheckCircle style={{ width: 12, height: 12, color: "#10b981" }} />
                <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 600 }}>Live on brand page</span>
              </div>
            </div>
          );
        })}

        {/* Empty add card */}
        <button
          onClick={openAdd}
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all"
          style={{
            background: `rgba(${ACCENT_RGB},0.02)`,
            border: `2px dashed rgba(${ACCENT_RGB},0.2)`,
            minHeight: 200,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `rgba(${ACCENT_RGB},0.5)`)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = `rgba(${ACCENT_RGB},0.2)`)}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `rgba(${ACCENT_RGB},0.1)` }}>
            <Plus style={{ width: 20, height: 20, color: ACCENT }} />
          </div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: ACCENT }}>Add a New Store</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
            Flagship, dealer, depot, or showroom
          </div>
        </button>

        {filtered.length === 0 && search && (
          <div className="col-span-full py-12 flex flex-col items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <Store style={{ width: 28, height: 28 }} />
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>No stores match "{search}"</div>
          </div>
        )}
      </div>

      {/* Add / Edit Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.4)" }} onClick={closeDrawer} />
          <div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: "white", boxShadow: "-4px 0 24px rgba(0,0,0,0.14)" }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {editingId ? "Edit Store" : "Add New Store"}
              </h2>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Store Name */}
              <Field label="Store Name" required>
                <input
                  value={form.name}
                  onChange={f("name")}
                  placeholder="e.g. Kajaria World Showroom, Bandra"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </Field>

              {/* Store Type */}
              <Field label="Store Type" required>
                <select
                  value={form.type}
                  onChange={f("type")}
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", background: "white", color: "var(--text-primary)" }}
                >
                  {STORE_TYPES.map(t => (
                    <option key={t} value={t}>{TYPE_META[t].label}</option>
                  ))}
                </select>
              </Field>

              {/* Address */}
              <Field label="Street Address" required>
                <input
                  value={form.address}
                  onChange={f("address")}
                  placeholder="e.g. Shop 12, Versova Road"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </Field>

              {/* Area */}
              <Field label="Area / Locality">
                <input
                  value={form.area}
                  onChange={f("area")}
                  placeholder="e.g. Andheri West"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </Field>

              {/* City + Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" required>
                  <input
                    value={form.city}
                    onChange={f("city")}
                    placeholder="Mumbai"
                    className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                    style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                  />
                </Field>
                <Field label="Pincode" required>
                  <input
                    value={form.pincode}
                    onChange={f("pincode")}
                    placeholder="400058"
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                    style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                  />
                </Field>
              </div>

              {/* Phone */}
              <Field label="Phone Number">
                <input
                  value={form.phone}
                  onChange={f("phone")}
                  placeholder="+91 22 1234 5678"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </Field>

              {/* Hours */}
              <Field label="Working Hours">
                <input
                  value={form.hours}
                  onChange={f("hours")}
                  placeholder="Mon–Sat 9am–6pm"
                  className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                  style={{ border: "1px solid rgba(0,0,0,0.12)", outline: "none", color: "var(--text-primary)" }}
                />
              </Field>
            </div>

            <div className="px-6 py-5 flex gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={closeDrawer}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold"
                style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={saveForm}
                disabled={!form.name.trim() || !form.city.trim() || !form.pincode.trim()}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all"
                style={{ background: (form.name.trim() && form.city.trim() && form.pincode.trim()) ? ACCENT : "rgba(0,0,0,0.2)" }}
              >
                {editingId ? "Save Changes" : "Add Store"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setDeleteId(null)} />
          <div
            className="fixed z-50 w-full max-w-sm rounded-2xl p-6"
            style={{
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(239,68,68,0.1)" }}>
              <Trash2 style={{ width: 22, height: 22, color: "#ef4444" }} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Remove Store?</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 20 }}>
              "{stores.find(s => s.id === deleteId)?.name}" will be removed from your brand page. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold"
                style={{ border: "1px solid rgba(0,0,0,0.12)", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white"
                style={{ background: "#ef4444" }}
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
    </div>
  );
}
