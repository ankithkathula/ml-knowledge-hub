import { useState } from "react";
import {
  Camera, User, Mail, Phone, Globe, Linkedin, Instagram,
  Building2, FileText, MapPin, IndianRupee, Bell, Shield,
  Lock, Download, AlertTriangle, Save, X, Plus, Trash2,
  ChevronDown, Eye, EyeOff, CheckCircle,
} from "lucide-react";

// --- Types ---

interface NotificationPrefs {
  emailNotifications: boolean;
  smsAlerts: boolean;
  newBookingAlerts: boolean;
  reviewAlerts: boolean;
  marketingEmails: boolean;
  jobAlerts: boolean;
}

interface PrivacySettings {
  profileVisible: boolean;
  showContactInfo: boolean;
  showPricing: boolean;
}

// --- Component ---

export default function ConsultantSettingsPage() {
  // Profile
  const [fullName, setFullName] = useState("Arjun Kapoor");
  const [tagline, setTagline] = useState("Senior Construction Materials Consultant | 12+ Years Experience");
  const [bio, setBio] = useState(
    "Experienced construction materials consultant specializing in residential and commercial projects across Hyderabad and Bangalore. Expert in sustainable building materials, waterproofing solutions, and interior finishes. Certified by IGBC for green building material selection."
  );
  const [category, setCategory] = useState("materials-consultant");
  const [experience, setExperience] = useState("12");

  // Contact
  const [email, setEmail] = useState("arjun.kapoor@materialkart.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [website, setWebsite] = useState("www.arjunkapoor.in");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/arjunkapoor");
  const [instagram, setInstagram] = useState("@arjun_materials");

  // Business
  const [companyName, setCompanyName] = useState("AK Material Consultants Pvt. Ltd.");
  const [gstin, setGstin] = useState("36AABCT1234K1ZK");
  const [pan, setPan] = useState("ABCPK1234F");
  const [regNumber, setRegNumber] = useState("MCA-HYD-2018-04521");

  // Location
  const [address, setAddress] = useState("Plot 42, Road No. 12, Jubilee Hills");
  const [city, setCity] = useState("Hyderabad");
  const [state, setState] = useState("Telangana");
  const [pincode, setPincode] = useState("500033");
  const [areasServing, setAreasServing] = useState([
    "Jubilee Hills", "Banjara Hills", "HITEC City", "Gachibowli",
    "Kondapur", "Madhapur", "Koramangala", "Whitefield",
  ]);
  const [newArea, setNewArea] = useState("");

  // Pricing
  const [pricingModel, setPricingModel] = useState("hourly");
  const [rate, setRate] = useState("5000");
  const [currency] = useState("INR");

  // Notifications
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailNotifications: true,
    smsAlerts: true,
    newBookingAlerts: true,
    reviewAlerts: true,
    marketingEmails: false,
    jobAlerts: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    showContactInfo: true,
    showPricing: false,
  });

  // UI State
  const [saveSuccess, setSaveSuccess] = useState(false);

  function addArea() {
    if (newArea.trim() && !areasServing.includes(newArea.trim())) {
      setAreasServing([...areasServing, newArea.trim()]);
      setNewArea("");
    }
  }

  function removeArea(area: string) {
    setAreasServing(areasServing.filter((a) => a !== area));
  }

  function handleAddAreaKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addArea();
    }
  }

  function toggleNotification(key: keyof NotificationPrefs) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function togglePrivacy(key: keyof PrivacySettings) {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleSave() {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  /* Toggle Switch */
  function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{
          backgroundColor: enabled ? "var(--accent)" : "var(--accent-light)",
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{
            transform: enabled ? "translateX(22px)" : "translateX(2px)",
          }}
        />
      </button>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage your profile, business details, and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <User size={18} style={{ color: "var(--accent)" }} />
          Profile Information
        </h2>

        {/* Avatar Upload */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
            >
              AK
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Profile Photo
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              JPG or PNG, max 2MB. Recommended: 400x400px
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Full Name
            </label>
            <input
              type="text"
              className="gl-input w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Experience (Years)
            </label>
            <input
              type="number"
              className="gl-input w-full"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Tagline
            </label>
            <input
              type="text"
              className="gl-input w-full"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Bio
            </label>
            <textarea
              className="gl-input w-full h-28 resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Category
            </label>
            <div className="relative">
              <select
                className="gl-input w-full appearance-none pr-10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="materials-consultant">Materials Consultant</option>
                <option value="interior-designer">Interior Designer</option>
                <option value="architect">Architect</option>
                <option value="structural-engineer">Structural Engineer</option>
                <option value="vastu-consultant">Vastu Consultant</option>
                <option value="landscape-designer">Landscape Designer</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Mail size={18} style={{ color: "var(--accent)" }} />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="email" className="gl-input pl-9 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Phone Number
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="tel" className="gl-input pl-9 w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Website
            </label>
            <div className="relative">
              <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="url" className="gl-input pl-9 w-full" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="text" className="gl-input pl-9 w-full" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Instagram
            </label>
            <div className="relative">
              <Instagram size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input type="text" className="gl-input pl-9 w-full" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Building2 size={18} style={{ color: "var(--accent)" }} />
          Business Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Company / Studio Name
            </label>
            <input type="text" className="gl-input w-full" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              GSTIN
            </label>
            <input type="text" className="gl-input w-full" value={gstin} onChange={(e) => setGstin(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              PAN Number
            </label>
            <input type="text" className="gl-input w-full" value={pan} onChange={(e) => setPan(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Registration Number
            </label>
            <input type="text" className="gl-input w-full" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <MapPin size={18} style={{ color: "var(--accent)" }} />
          Location
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Address
            </label>
            <input type="text" className="gl-input w-full" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              City
            </label>
            <input type="text" className="gl-input w-full" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              State
            </label>
            <div className="relative">
              <select
                className="gl-input w-full appearance-none pr-10"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="Telangana">Telangana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Kerala">Kerala</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Pincode
            </label>
            <input type="text" className="gl-input w-full" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          </div>
        </div>

        {/* Areas Serving */}
        <div className="mt-5">
          <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-secondary)" }}>
            Areas Serving
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {areasServing.map((area) => (
              <span
                key={area}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ backgroundColor: "var(--accent-light)", color: "var(--text-primary)" }}
              >
                {area}
                <button onClick={() => removeArea(area)}>
                  <X size={12} style={{ color: "var(--text-muted)" }} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="gl-input flex-1"
              placeholder="Add a new area..."
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyDown={handleAddAreaKeyDown}
            />
            <button
              onClick={addArea}
              className="btn-secondary flex items-center gap-1.5 px-4 py-2 text-sm"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <IndianRupee size={18} style={{ color: "var(--accent)" }} />
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Pricing Model
            </label>
            <div className="relative">
              <select
                className="gl-input w-full appearance-none pr-10"
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
              >
                <option value="hourly">Per Hour</option>
                <option value="per-project">Per Project</option>
                <option value="per-sqft">Per Sq.Ft.</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Rate ({pricingModel === "hourly" ? "per hour" : pricingModel === "per-project" ? "per project" : "per sq.ft."})
            </label>
            <div className="relative">
              <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="number"
                className="gl-input pl-8 w-full"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
              Currency
            </label>
            <input type="text" className="gl-input w-full" value={currency} disabled />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Bell size={18} style={{ color: "var(--accent)" }} />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {([
            { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive updates and alerts via email" },
            { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Get important alerts on your phone" },
            { key: "newBookingAlerts" as const, label: "New Booking Alerts", desc: "Get notified when a new booking is made" },
            { key: "reviewAlerts" as const, label: "Review Alerts", desc: "Get notified when a client leaves a review" },
            { key: "marketingEmails" as const, label: "Marketing Emails", desc: "Receive promotional offers and newsletters" },
            { key: "jobAlerts" as const, label: "Job Alerts", desc: "Get notified about new job postings matching your profile" },
          ]).map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
              <ToggleSwitch
                enabled={notifications[item.key]}
                onToggle={() => toggleNotification(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Shield size={18} style={{ color: "var(--accent)" }} />
          Privacy
        </h2>
        <div className="space-y-4">
          {([
            { key: "profileVisible" as const, label: "Profile Visibility", desc: "Make your profile visible to the public", icon: Eye },
            { key: "showContactInfo" as const, label: "Show Contact Information", desc: "Display your email and phone on your public profile", icon: Phone },
            { key: "showPricing" as const, label: "Show Pricing", desc: "Display your pricing information on your profile", icon: IndianRupee },
          ]).map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent-light)" }}
                >
                  <item.icon size={15} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={privacy[item.key]}
                onToggle={() => togglePrivacy(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Lock size={18} style={{ color: "var(--accent)" }} />
          Account Actions
        </h2>
        <div className="space-y-3">
          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left"
            style={{ backgroundColor: "var(--accent-light)" }}
          >
            <Lock size={16} style={{ color: "var(--text-secondary)" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Change Password
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Update your account password
              </p>
            </div>
          </button>
          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left"
            style={{ backgroundColor: "var(--accent-light)" }}
          >
            <Download size={16} style={{ color: "var(--text-secondary)" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Download My Data
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Export all your data in a downloadable format
              </p>
            </div>
          </button>
          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left border"
            style={{ borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.05)" }}
          >
            <AlertTriangle size={16} style={{ color: "#ef4444" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                Deactivate Account
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Temporarily disable your account. You can reactivate anytime.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pb-8">
        {saveSuccess && (
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#10b981" }}>
            <CheckCircle size={16} />
            Changes saved successfully!
          </span>
        )}
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8 py-3 text-sm font-semibold">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
