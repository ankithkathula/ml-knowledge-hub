// Thin wrappers around the shared event dashboard, pre-bound to each
// stakeholder's organizer id, base path, and accent colour.

import { EventsDashboardPage } from "./EventsDashboardPage";
import { EventDashboardDetailPage } from "./EventDashboardDetailPage";

// ── Studio (BDP India as the default sample organizer) ──
export function StudioEventsPage() {
  return (
    <EventsDashboardPage
      stakeholderType="studio"
      organizerId="org-bdp-india"
      basePath="/studio/events"
      accent="#FF6A3D"
    />
  );
}
export function StudioEventDetailPage() {
  return <EventDashboardDetailPage stakeholderType="studio" basePath="/studio/events" accent="#FF6A3D" />;
}

// ── Institute (RICS SBE) ──
export function InstituteEventsPage() {
  return (
    <EventsDashboardPage
      stakeholderType="institute"
      organizerId="org-rics"
      basePath="/institute/events"
      accent="#3b82f6"
    />
  );
}
export function InstituteEventDetailPage() {
  return <EventDashboardDetailPage stakeholderType="institute" basePath="/institute/events" accent="#3b82f6" />;
}

// ── Brand (UltraTech as the default sample) ──
export function BrandEventsPage() {
  return (
    <EventsDashboardPage
      stakeholderType="brand"
      organizerId="org-ultratech"
      basePath="/b/events"
      accent="#ff6a3d"
    />
  );
}
export function BrandEventDetailPage() {
  return <EventDashboardDetailPage stakeholderType="brand" basePath="/b/events" accent="#ff6a3d" />;
}
