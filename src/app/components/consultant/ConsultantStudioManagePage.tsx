import { useState } from "react";
import {
  Building2, Edit3, Users, Mail, MapPin, Plus, Trash2, X,
  Upload, Shield, Clock, Phone, Bell, ChevronDown, Check,
  Award, FileText, Globe, Briefcase, Star, Camera, Save,
  ToggleLeft, ToggleRight, IndianRupee,
} from "lucide-react";

// --- Types ---

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: "Active" | "Invited";
  joinedDate: string;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  isActive: boolean;
}

interface OperationArea {
  id: string;
  city: string;
  state: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  expiry: string;
  status: "Verified" | "Pending" | "Expired";
  fileName: string;
}

interface StudioProfile {
  name: string;
  tagline: string;
  description: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  foundedYear: string;
}

interface BusinessHours {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

// --- Mock Data ---

const mockTeam: TeamMember[] = [
  { id: "1", name: "Ar. Vikram Deshmukh", role: "Principal Architect", email: "vikram@designstudio.in", avatar: "VD", status: "Active", joinedDate: "2024-01-15" },
  { id: "2", name: "Neha Kulkarni", role: "Senior Interior Designer", email: "neha@designstudio.in", avatar: "NK", status: "Active", joinedDate: "2024-06-20" },
  { id: "3", name: "Rohan Joshi", role: "Project Manager", email: "rohan@designstudio.in", avatar: "RJ", status: "Active", joinedDate: "2025-02-10" },
  { id: "4", name: "Sneha Patil", role: "Junior Architect", email: "sneha@designstudio.in", avatar: "SP", status: "Active", joinedDate: "2025-08-01" },
  { id: "5", name: "Amit Rao", role: "MEP Consultant", email: "amit.rao@gmail.com", avatar: "AR", status: "Invited", joinedDate: "" },
];

const mockServices: ServiceItem[] = [
  { id: "1", name: "Architectural Design Consultation", description: "Complete architectural planning and design for residential and commercial projects", price: 15000, unit: "per session", isActive: true },
  { id: "2", name: "Interior Design Package", description: "End-to-end interior design including 3D renders, material selection, and execution support", price: 75, unit: "per sq.ft", isActive: true },
  { id: "3", name: "Vastu Consultation", description: "Vastu-compliant design review and recommendations", price: 8000, unit: "per visit", isActive: true },
  { id: "4", name: "Project Management", description: "On-site project supervision and vendor coordination", price: 50000, unit: "per month", isActive: true },
  { id: "5", name: "3D Visualization & Walkthrough", description: "Photorealistic 3D renders and virtual walkthrough videos", price: 25000, unit: "per project", isActive: false },
];

const mockAreas: OperationArea[] = [
  { id: "1", city: "Pune", state: "Maharashtra" },
  { id: "2", city: "Mumbai", state: "Maharashtra" },
  { id: "3", city: "Nashik", state: "Maharashtra" },
  { id: "4", city: "Lonavala", state: "Maharashtra" },
];

const mockCertificates: Certificate[] = [
  { id: "1", name: "Council of Architecture Registration", issuer: "Council of Architecture, India", expiry: "2027-12-31", status: "Verified", fileName: "COA_Registration.pdf" },
  { id: "2", name: "GRIHA Certified Professional", issuer: "TERI", expiry: "2026-06-30", status: "Verified", fileName: "GRIHA_Certificate.pdf" },
  { id: "3", name: "IGBC AP Certification", issuer: "Indian Green Building Council", expiry: "2026-03-15", status: "Pending", fileName: "IGBC_AP.pdf" },
  { id: "4", name: "Professional Liability Insurance", issuer: "ICICI Lombard", expiry: "2025-11-30", status: "Expired", fileName: "PLI_Policy.pdf" },
];

const mockBusinessHours: BusinessHours[] = [
  { day: "Monday", enabled: true, start: "09:00", end: "18:00" },
  { day: "Tuesday", enabled: true, start: "09:00", end: "18:00" },
  { day: "Wednesday", enabled: true, start: "09:00", end: "18:00" },
  { day: "Thursday", enabled: true, start: "09:00", end: "18:00" },
  { day: "Friday", enabled: true, start: "09:00", end: "18:00" },
  { day: "Saturday", enabled: true, start: "10:00", end: "15:00" },
  { day: "Sunday", enabled: false, start: "10:00", end: "14:00" },
];

const roleOptions = ["Principal Architect", "Senior Architect", "Junior Architect", "Interior Designer", "Senior Interior Designer", "Project Manager", "MEP Consultant", "Structural Engineer", "Site Supervisor", "Admin"];

const certStatusColors: Record<string, { bg: string; text: string; border: string }> = {
  Verified: { bg: "rgba(16,185,129,0.1)", text: "#10b981", border: "rgba(16,185,129,0.25)" },
  Pending: { bg: "rgba(245,158,11,0.1)", text: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  Expired: { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

// --- Component ---

export function ConsultantStudioManagePage() {
  const [studioProfile, setStudioProfile] = useState<StudioProfile>({
    name: "Deshmukh Design Studio",
    tagline: "Crafting Spaces That Inspire",
    description: "Award-winning architectural and interior design studio specializing in sustainable residential and commercial projects across Maharashtra. With over 12 years of experience, we blend modern aesthetics with traditional Indian design sensibilities.",
    category: "Architecture & Interior Design",
    location: "Koregaon Park, Pune, Maharashtra",
    phone: "+91 98765 43210",
    email: "hello@deshmukh.design",
    website: "www.deshmukh.design",
    foundedYear: "2014",
  });
  const [editingProfile, setEditingProfile] = useState(false);

  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState(roleOptions[0]);

  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", unit: "per session" });

  const [areas, setAreas] = useState<OperationArea[]>(mockAreas);
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("Maharashtra");

  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);

  const [businessHours, setBusinessHours] = useState<BusinessHours[]>(mockBusinessHours);
  const [autoReply, setAutoReply] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [whatsappNotifs, setWhatsappNotifs] = useState(true);

  // Handlers
  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const initials = inviteEmail.split("@")[0].slice(0, 2).toUpperCase();
    setTeam([...team, {
      id: Date.now().toString(),
      name: inviteEmail.split("@")[0],
      role: inviteRole,
      email: inviteEmail,
      avatar: initials,
      status: "Invited",
      joinedDate: "",
    }]);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteRole(roleOptions[0]);
  };

  const handleRemoveMember = (id: string) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  const handleAddService = () => {
    if (!newService.name.trim()) return;
    setServices([...services, {
      id: Date.now().toString(),
      name: newService.name,
      description: newService.description,
      price: parseInt(newService.price) || 0,
      unit: newService.unit,
      isActive: true,
    }]);
    setShowAddService(false);
    setNewService({ name: "", description: "", price: "", unit: "per session" });
  };

  const toggleService = (id: string) => {
    setServices(services.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleAddArea = () => {
    if (!newCity.trim()) return;
    setAreas([...areas, { id: Date.now().toString(), city: newCity.trim(), state: newState }]);
    setNewCity("");
  };

  const handleRemoveArea = (id: string) => {
    setAreas(areas.filter((a) => a.id !== id));
  };

  const toggleBusinessDay = (index: number) => {
    const updated = [...businessHours];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setBusinessHours(updated);
  };

  const updateHours = (index: number, field: "start" | "end", value: string) => {
    const updated = [...businessHours];
    updated[index] = { ...updated[index], [field]: value };
    setBusinessHours(updated);
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="transition-all" style={{ display: "flex", alignItems: "center" }}>
      {enabled ? (
        <ToggleRight size={28} style={{ color: "var(--accent)" }} />
      ) : (
        <ToggleLeft size={28} style={{ color: "var(--text-muted)" }} />
      )}
    </button>
  );

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Studio Management
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 2 }}>
          Manage your studio profile, team, services, and settings
        </p>
      </div>

      {/* Studio Profile Card */}
      <div
        className="glass-card rounded-2xl p-6"
        style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo Area */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,106,61,0.1)", border: "2px dashed rgba(255,106,61,0.3)" }}
            >
              <Building2 size={36} style={{ color: "var(--accent)" }} />
            </div>
            <button
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ color: "var(--accent)", background: "rgba(255,106,61,0.08)", border: "1px solid rgba(255,106,61,0.15)" }}
            >
              <Camera size={12} /> Change Logo
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            {editingProfile ? (
              <div className="space-y-3">
                <input
                  value={studioProfile.name}
                  onChange={(e) => setStudioProfile({ ...studioProfile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                />
                <input
                  value={studioProfile.tagline}
                  onChange={(e) => setStudioProfile({ ...studioProfile, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", outline: "none" }}
                  placeholder="Tagline..."
                />
                <textarea
                  value={studioProfile.description}
                  onChange={(e) => setStudioProfile({ ...studioProfile, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={studioProfile.location}
                    onChange={(e) => setStudioProfile({ ...studioProfile, location: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                    placeholder="Location"
                  />
                  <input
                    value={studioProfile.phone}
                    onChange={(e) => setStudioProfile({ ...studioProfile, phone: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                    placeholder="Phone"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingProfile(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--text-muted)" }}>Cancel</button>
                  <button onClick={() => setEditingProfile(false)} className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "var(--accent)", color: "#fff" }}>
                    <span className="flex items-center gap-1"><Save size={14} /> Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{studioProfile.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600, fontStyle: "italic" }}>{studioProfile.tagline}</p>
                  </div>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                  {studioProfile.description}
                </p>
                <div className="flex flex-wrap gap-4" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1.5"><Briefcase size={13} />{studioProfile.category}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} />{studioProfile.location}</span>
                  <span className="flex items-center gap-1.5"><Phone size={13} />{studioProfile.phone}</span>
                  <span className="flex items-center gap-1.5"><Mail size={13} />{studioProfile.email}</span>
                  <span className="flex items-center gap-1.5"><Globe size={13} />{studioProfile.website}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />Since {studioProfile.foundedYear}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Team Management */}
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} style={{ color: "#3b82f6" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Team Members</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                {team.length}
              </span>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <Plus size={13} /> Invite
            </button>
          </div>
          <div className="space-y-2.5">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "rgba(255,106,61,0.12)", color: "var(--accent)", border: "1px solid rgba(255,106,61,0.2)" }}
                >
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{member.name}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{member.role}</p>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold shrink-0"
                  style={{
                    background: member.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                    color: member.status === "Active" ? "#10b981" : "#f59e0b",
                    border: `1px solid ${member.status === "Active" ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
                  }}
                >
                  {member.status}
                </span>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-1.5 rounded-lg shrink-0 transition-all hover:scale-110"
                  style={{ background: "rgba(239,68,68,0.08)" }}
                >
                  <X size={12} style={{ color: "#ef4444" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Pricing */}
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IndianRupee size={18} style={{ color: "#10b981" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Services & Pricing</h3>
            </div>
            <button
              onClick={() => setShowAddService(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          <div className="space-y-2.5">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-3 rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  opacity: service.isActive ? 1 : 0.5,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{service.name}</p>
                    <p className="line-clamp-1" style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold" style={{ color: "#10b981" }}>
                      {"\u20B9"}{service.price.toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{service.unit}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ToggleSwitch enabled={service.isActive} onToggle={() => toggleService(service.id)} />
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{service.isActive ? "Active" : "Inactive"}</span>
                  <button
                    onClick={() => handleRemoveService(service.id)}
                    className="ml-auto p-1 rounded"
                    style={{ color: "#ef4444" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Service Inline */}
          {showAddService && (
            <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,106,61,0.04)", border: "1px dashed rgba(255,106,61,0.2)" }}>
              <input
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Service name"
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
              />
              <input
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Description"
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
              />
              <div className="flex gap-2 mb-2">
                <input
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="Price (INR)"
                  type="number"
                  className="flex-1 px-3 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                />
                <select
                  value={newService.unit}
                  onChange={(e) => setNewService({ ...newService, unit: e.target.value })}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                >
                  <option value="per session">per session</option>
                  <option value="per sq.ft">per sq.ft</option>
                  <option value="per visit">per visit</option>
                  <option value="per month">per month</option>
                  <option value="per project">per project</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddService(false)} className="px-3 py-1.5 rounded-lg text-xs" style={{ color: "var(--text-muted)" }}>Cancel</button>
                <button onClick={handleAddService} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--accent)", color: "#fff" }}>Add Service</button>
              </div>
            </div>
          )}
        </div>

        {/* Areas of Operation */}
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: "#f59e0b" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Areas of Operation</h3>
          </div>

          {/* Map Placeholder */}
          <div
            className="rounded-xl mb-4 flex items-center justify-center"
            style={{ height: 140, background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)" }}
          >
            <div className="text-center">
              <MapPin size={28} style={{ color: "var(--text-muted)", margin: "0 auto 6px" }} />
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Interactive Map View</p>
              <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Serving {areas.length} locations</p>
            </div>
          </div>

          {/* Area Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {areas.map((area) => (
              <span
                key={area.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <MapPin size={10} />
                {area.city}, {area.state}
                <button onClick={() => handleRemoveArea(area.id)} className="ml-0.5 hover:scale-110 transition-all">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          {/* Add Area */}
          <div className="flex gap-2">
            <input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="City name"
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
              onKeyDown={(e) => e.key === "Enter" && handleAddArea()}
            />
            <select
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
            >
              {["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Delhi NCR", "Kerala", "Telangana", "Uttar Pradesh", "West Bengal"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleAddArea}
              className="px-3 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Documents & Certifications */}
        <div
          className="glass-card rounded-2xl p-5"
          style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={18} style={{ color: "#a855f7" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Documents & Certifications</h3>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}
            >
              <Upload size={13} /> Upload
            </button>
          </div>
          <div className="space-y-2.5">
            {certificates.map((cert) => {
              const sc = certStatusColors[cert.status];
              return (
                <div
                  key={cert.id}
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <FileText size={16} style={{ color: "#a855f7", marginTop: 2, flexShrink: 0 }} />
                      <div className="min-w-0">
                        <p className="truncate" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{cert.name}</p>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{cert.issuer}</p>
                        <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>
                          Expires: {new Date(cert.expiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold shrink-0"
                      style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                    >
                      {cert.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Area */}
          <div
            className="mt-3 p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-[1.01]"
            style={{ border: "2px dashed rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.03)" }}
          >
            <Upload size={24} style={{ color: "var(--text-muted)", margin: "0 auto 6px" }} />
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Drag & drop or click to upload certificates</p>
            <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>PDF, JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Studio Settings - Full Width */}
      <div
        className="glass-card rounded-2xl p-5"
        style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Clock size={18} style={{ color: "#ec4899" }} />
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Studio Settings</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Hours */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>Business Hours</h4>
            <div className="space-y-2">
              {businessHours.map((bh, i) => (
                <div key={bh.day} className="flex items-center gap-3">
                  <ToggleSwitch enabled={bh.enabled} onToggle={() => toggleBusinessDay(i)} />
                  <span style={{ fontSize: "0.8rem", color: bh.enabled ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 600, width: 80 }}>
                    {bh.day.slice(0, 3)}
                  </span>
                  {bh.enabled ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={bh.start}
                        onChange={(e) => updateHours(i, "start", e.target.value)}
                        className="px-2 py-1 rounded text-xs"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>to</span>
                      <input
                        type="time"
                        value={bh.end}
                        onChange={(e) => updateHours(i, "end", e.target.value)}
                        className="px-2 py-1 rounded text-xs"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notification & Contact Preferences */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Auto-Reply Messages</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Send automatic replies to new enquiries</p>
                </div>
                <ToggleSwitch enabled={autoReply} onToggle={() => setAutoReply(!autoReply)} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>Email Notifications</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Receive booking and enquiry updates via email</p>
                </div>
                <ToggleSwitch enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>SMS Notifications</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Get SMS alerts for urgent bookings</p>
                </div>
                <ToggleSwitch enabled={smsNotifs} onToggle={() => setSmsNotifs(!smsNotifs)} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>WhatsApp Notifications</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Receive booking confirmations on WhatsApp</p>
                </div>
                <ToggleSwitch enabled={whatsappNotifs} onToggle={() => setWhatsappNotifs(!whatsappNotifs)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="glass-card rounded-2xl w-full max-w-md p-6"
            style={{ background: "var(--bg-base)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                <X size={16} style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, display: "block" }}>Email Address</label>
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="w-full px-3 py-2.5 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, display: "block" }}>Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", outline: "none" }}
                >
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "var(--text-muted)" }}>Cancel</button>
                <button onClick={handleInvite} className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: "var(--accent)", color: "#fff" }}>
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
