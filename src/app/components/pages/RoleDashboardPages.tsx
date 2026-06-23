import { DashboardStub } from "./DashboardStub";

export function EducationistDashboardPage() {
  return (
    <DashboardStub
      surface="Educationist Dashboard"
      tagline="Plan curricula, run sessions, and track outcomes for the institutes you teach at."
      tiles={[
        { label: "My Profile" },
        { label: "Course Plans" },
        { label: "Session Calendar" },
        { label: "Student Roster" },
        { label: "Resources Library" },
        { label: "Subscription", muted: true },
        { label: "Rewards", muted: true },
        { label: "Chat", muted: true },
        { label: "Settings", muted: true },
      ]}
    />
  );
}

export function InstituteDashboardPage() {
  return (
    <DashboardStub
      surface="Institute Dashboard"
      tagline="Manage your faculty, course catalogue, students, and approvals in one place."
      tiles={[
        { label: "Profile & Branding" },
        { label: "Faculty" },
        { label: "Courses" },
        { label: "Student Body" },
        { label: "Applications" },
        { label: "Subscription", muted: true },
        { label: "Rewards", muted: true },
        { label: "Chat", muted: true },
        { label: "Settings", muted: true },
      ]}
    />
  );
}

export function EndUserDashboardPage() {
  return (
    <DashboardStub
      surface="End-User Dashboard"
      tagline="Plan your home or workspace project — track materials, vendors, and budgets."
      tiles={[
        { label: "My Projects" },
        { label: "Saved Materials" },
        { label: "Vendor Conversations" },
        { label: "Budget Tracker" },
        { label: "RFQ Inbox" },
        { label: "Subscription", muted: true },
        { label: "Rewards", muted: true },
        { label: "Settings", muted: true },
      ]}
    />
  );
}

export function StoreDashboardPage() {
  return (
    <DashboardStub
      surface="Store / Dealer Dashboard"
      tagline="Run your local catalogue, service areas, RFQ inbox, and inventory."
      tiles={[
        { label: "Profile" },
        { label: "Catalogue" },
        { label: "Service Areas / Pincodes" },
        { label: "RFQ Inbox" },
        { label: "Inventory" },
        { label: "Pricelist" },
        { label: "Subscription", muted: true },
        { label: "Rewards", muted: true },
        { label: "Settings", muted: true },
      ]}
    />
  );
}

export function FacultyDashboardPage() {
  return (
    <DashboardStub
      surface="Faculty Dashboard"
      tagline="Run your classes, share resources, and grade students."
      tiles={[
        { label: "Profile" },
        { label: "Courses" },
        { label: "Schedule" },
        { label: "Students" },
        { label: "Resources" },
        { label: "Settings", muted: true },
      ]}
    />
  );
}
