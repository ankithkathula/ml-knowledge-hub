import { useState } from "react";
import {
  Bell, Shield, Lock, Download, AlertTriangle, Save,
  Eye, EyeOff, CheckCircle, User, Mail, Phone,
  Briefcase, FolderKanban, Package, BookOpen,
} from "lucide-react";

// --- Types ---

interface NotificationPrefs {
  emailNotifications: boolean;
  smsAlerts: boolean;
  jobAlerts: boolean;
  courseUpdates: boolean;
  sampleUpdates: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisible: boolean;
  showContactInfo: boolean;
  showPortfolio: boolean;
}

// --- Component ---

export function UserSettingsPage() {
  // Notifications
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailNotifications: true,
    smsAlerts: true,
    jobAlerts: true,
    courseUpdates: true,
    sampleUpdates: false,
    marketingEmails: false,
  });

  // Privacy
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    showContactInfo: true,
    showPortfolio: true,
  });

  // Account
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // UI
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

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

  function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{ backgroundColor: enabled ? "#6366f1" : "rgba(99,102,241,0.2)" }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: enabled ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    );
  }

  const notificationItems: Array<{ key: keyof NotificationPrefs; label: string; desc: string; icon: typeof Bell }> = [
    { key: "emailNotifications", label: "Email Notifications", desc: "Receive important updates via email", icon: Mail },
    { key: "smsAlerts", label: "SMS Alerts", desc: "Get text messages for critical updates", icon: Phone },
    { key: "jobAlerts", label: "Job Alerts", desc: "Notifications for new matching jobs", icon: Briefcase },
    { key: "courseUpdates", label: "Course Updates", desc: "Updates on enrolled courses and new launches", icon: BookOpen },
    { key: "sampleUpdates", label: "Sample Updates", desc: "Status changes on your sample requests", icon: Package },
    { key: "marketingEmails", label: "Marketing & Promotions", desc: "Offers, newsletters, and promotional content", icon: Bell },
  ];

  const privacyItems: Array<{ key: keyof PrivacySettings; label: string; desc: string }> = [
    { key: "profileVisible", label: "Profile Visibility", desc: "Allow others to find and view your profile" },
    { key: "showContactInfo", label: "Show Contact Info", desc: "Display your email and phone to studios" },
    { key: "showPortfolio", label: "Show Portfolio", desc: "Make your portfolio projects publicly visible" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage your notifications, privacy, and account preferences
        </p>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div
          className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium"
          style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#16a34a" }}
        >
          <CheckCircle size={16} /> Settings saved successfully!
        </div>
      )}

      {/* Notification Preferences */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Bell size={18} style={{ color: "#6366f1" }} /> Notification Preferences
        </h2>
        <div className="space-y-4">
          {notificationItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(99,102,241,0.08)" }}
                >
                  <item.icon size={16} style={{ color: "#6366f1" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              </div>
              <ToggleSwitch enabled={notifications[item.key]} onToggle={() => toggleNotification(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Shield size={18} style={{ color: "#6366f1" }} /> Privacy
        </h2>
        <div className="space-y-4">
          {privacyItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
              <ToggleSwitch enabled={privacy[item.key]} onToggle={() => togglePrivacy(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Account - Change Password */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Lock size={18} style={{ color: "#6366f1" }} /> Change Password
        </h2>
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="gl-input w-full text-sm pr-10"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showCurrentPassword ? <EyeOff size={15} style={{ color: "var(--text-muted)" }} /> : <Eye size={15} style={{ color: "var(--text-muted)" }} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="gl-input w-full text-sm pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? <EyeOff size={15} style={{ color: "var(--text-muted)" }} /> : <Eye size={15} style={{ color: "var(--text-muted)" }} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Confirm New Password</label>
            <input
              type="password"
              className="gl-input w-full text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="glass-card p-6">
        <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <User size={18} style={{ color: "#6366f1" }} /> Account
        </h2>
        <div className="space-y-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition hover:opacity-80"
            style={{ backgroundColor: "rgba(99,102,241,0.08)", color: "#6366f1" }}
          >
            <Download size={16} /> Download My Data
          </button>
          <button
            onClick={() => setShowDeactivateConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition hover:opacity-80"
            style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#ef4444" }}
          >
            <AlertTriangle size={16} /> Deactivate Account
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#6366f1" }}
        >
          <Save size={16} /> Save Settings
        </button>
      </div>

      {/* Deactivate Confirmation */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowDeactivateConfirm(false)}>
          <div className="glass-card p-6 max-w-sm mx-4 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                <AlertTriangle size={20} style={{ color: "#ef4444" }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Deactivate Account?</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Your profile will be hidden and data archived. You can reactivate within 30 days.</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#ef4444" }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
