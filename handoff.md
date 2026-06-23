# ML Knowledge Hub — Handoff Notes
**Date:** 15 May 2026  
**Branch:** main  
**Dev server:** `npm run dev` from project root → `http://localhost:5174`

---

## Summary of changes in this session

Six feature areas were built or wired up. All changes are mock-data only — no backend.

---

## 1. Faculty Courses page — institute-linked + management

**Route:** `/f/courses`  
**File changed:** `src/app/components/faculty/FacultyStubPages.tsx`

### What changed
The stub card list was replaced with two sections:

**Section 1 — "Courses I Teach"**  
The 3 existing teaching courses (Environmental Design Studio, Building Construction III, History of Architecture II). Each card now has:
- External link icon → `/courses` public catalog
- **Manage** button that expands an inline panel with:
  - Students count → links to `/f/students`
  - Assignments → links to `/f/assignments`
  - Upload Materials button (stub)
  - **"View in My Courses →"** → links to `/u/courses`

**Section 2 — "Offered by RICS SBE on Platform"**  
3 courses from the public catalog belonging to the faculty's affiliated institute (RICS SBE). Data defined as `INSTITUTE_COURSES` inline. Each card shows:
- Gradient thumbnail, category + level badges, rating, enrolled count, price
- **My Courses** button → `/u/courses`
- External link icon → `/courses`

### New data added
```ts
// src/app/components/faculty/FacultyStubPages.tsx
const INSTITUTE_COURSES = [
  { id: 1, title: "BIM Professional: Revit Architecture Complete", ... },
  { id: 4, title: "Advanced AutoCAD for Construction Drawings", ... },
  { id: 7, title: "Façade Engineering & Cladding Systems", ... },
]
```

### New imports added
```ts
import { useState } from "react";
import { Link } from "react-router";
import { ExternalLink, Users, ClipboardList, Upload, BookOpen, Link2, Plus, GraduationCap, Globe } from "lucide-react";
```

---

## 2. Faculty Assignments page — college vs KC platform tabs

**Route:** `/f/assignments`  
**File changed:** `src/app/components/faculty/FacultyStubPages.tsx`

### What changed
`FacultyAssignmentsPage` replaced with a tabbed layout:

| Tab | Label | Content |
|-----|-------|---------|
| 1 | **College (RICS SBE)** | Existing 5 institutional B.Arch assignments + "Link from College Portal" button |
| 2 | **KC Platform Courses** | 5 assignments across the 3 RICS SBE KC courses + "New Assignment" + "View Courses →" link |

Shared `AssignmentStatusBadge` component handles Open / Grading / Closed styling.

KC assignments are keyed to courses by `courseColor`, with a colored dot and assignment type badge (Project / Quiz / Exercise / Assessment) per row.

### New data added
```ts
const KC_ASSIGNMENTS = [
  { id: 1, title: "Revit Floor Plan: Residential Project", course: "BIM Professional...", type: "Project", ... },
  { id: 2, title: "Module 3 Quiz: BIM Standards & IFC",   course: "BIM Professional...", type: "Quiz",    ... },
  { id: 3, title: "AutoCAD Sheet Set Exercise",           course: "Advanced AutoCAD...", type: "Exercise", ... },
  { id: 4, title: "Dynamic Blocks Assessment",            course: "Advanced AutoCAD...", type: "Assessment", ... },
  { id: 5, title: "Curtain Wall Detail Submission",       course: "Façade Engineering...", type: "Project", ... },
]
```

---

## 3. Brand Lead Pipeline dashboard

**Route:** `/b/leads`  
**Files changed:**
- `src/app/components/brand/BrandLeadPipeline.tsx` — pre-existing component, cleaned up
- `src/app/components/brand_dashboard/BrandStubPages.tsx` — `BrandLeadsPage` now delegates to `BrandLeadPipeline`

### What was already built (now wired)
`BrandLeadPipeline.tsx` was a complete component that was never connected to the route. It contains:

| Section | Description |
|---------|-------------|
| KPI strip | Total (12), Cold (4), Warm (4), Hot (4) with % share badges |
| Lead Funnel | Cold → Warm → Hot bars with conversion rate pills; Cold→Warm / Warm→Hot summary cards |
| Lead Trend chart | Stacked bar chart, last 7 months (Nov–May), Cold/Warm/Hot color segments |
| What's Working | Products with coldToWarm ≥ 36% or warmToHot ≥ 43%, sorted by warmToHot |
| What to Improve | Products with coldToWarm < 30% or warmToHot < 35%, with actionable tip per row |
| Actionable Insights | 6 insight cards: positive / warning / tip types |
| All Leads table | Filter All/Cold/Warm/Hot + search; columns: User, Role, Product, Lead Type, Action, Est. Value, Date |

### Change to BrandLeadPipeline.tsx
A segmented top navigation bar (Overview / Lead Pipeline / Products / Catalogue) was added and then removed on request. The component now starts directly at the "Lead Pipeline" heading.

### Change to BrandStubPages.tsx
```ts
// Before: full stub implementation with HOT_LEADS/WARM_LEADS/COLD_LEADS
export function BrandLeadsPage() { ... }

// After:
import { BrandLeadPipeline } from "../brand/BrandLeadPipeline";
export function BrandLeadsPage() { return <BrandLeadPipeline />; }
```

### Mock data shape (in BrandLeadPipeline.tsx)
```ts
LEADS       — 12 records, 4 each of Cold/Warm/Hot
PRODUCTS    — 8 records with cold/warm/hot counts + coldToWarm% + warmToHot%
INSIGHTS    — 6 records, type: "positive" | "warning" | "tip"
MONTHLY     — 7 months of cold/warm/hot for the trend chart
tempColors  — display map for Cold/Warm/Hot (color, bg, border, label)
roleColors  — display map for Architect/Interior Designer/Contractor/End User/Student
```

---

## 4. Studio Team — role permission matrix toggles

**Route:** `/studio/team`  
**File changed:** `src/app/components/studio/StudioTeamPage.tsx`

### What changed
The static check/X icon matrix was replaced with interactive toggle switches.

- **Owner column** — always-on checkmarks, labelled "locked", not interactive
- **Admin / Editor / Viewer columns** — each cell is a `PermToggle` the studio head can click to flip on/off; state is local, resets on page reload

### New pieces added
```ts
// Type alias
type PermRow = { action: string; Owner: boolean; Admin: boolean; Editor: boolean; Viewer: boolean }

// Default data (was const PERMISSIONS, now DEFAULT_PERMISSIONS)
const DEFAULT_PERMISSIONS: PermRow[] = [ ... ]

// Toggle component
function PermToggle({ checked, onChange }: { checked: boolean; onChange: () => void })
// 30×17px pill, indigo (#6366f1) when on, gray when off

// State inside StudioTeamPage
const [permissions, setPermissions] = useState<PermRow[]>(DEFAULT_PERMISSIONS);
function togglePermission(action: string, role: Exclude<Role, "Owner">) { ... }
```

Footer note added: "Changes apply immediately. Owner permissions are fixed and cannot be modified."

---

## 5. Customer dashboard at `/u`

**Routes:** `/u`, `/u/projects`, `/u/moodboard`  
**New files:**
- `src/app/components/customer/CustomerDashboardLayout.tsx`
- `src/app/components/customer/CustomerPages.tsx`

**Routes file changed:** `src/app/routes.ts`

### Sidebar (CustomerDashboardLayout)
Accent: `#0891b2` (teal). Sidebar label: **"My Space"**.

Primary nav — only two items:

| Label | Route | Icon |
|-------|-------|------|
| Projects | `/u/projects` | FolderOpen |
| Moodboard | `/u/moodboard` | Layout |

Profile and Settings sit in a secondary group below a divider. User card at the bottom shows name + "Customer" role label. Sidebar collapses to icon-only (64px). Mobile hamburger overlay included.

### `/u` — CustomerDashboardHome
- 3 stat tiles: Active Projects (2), Moodboards (3), Saved Products (24) — each links to relevant section
- "My Projects" preview: 2 project cards with progress bar, designer, due date, status pill
- "My Moodboards" preview: 3 mini cards with palette swatch strip + item count

### `/u/projects` — CustomerProjectsPage
4 project cards:

| Project | Status | Progress | Budget |
|---------|--------|----------|--------|
| Kitchen Renovation | In Progress | 60% | ₹4.2L |
| Living Room Redesign | Planning | 20% | ₹2.8L |
| Master Bedroom | Completed | 100% | ₹1.6L |
| Ensuite Bathroom | On Hold | 10% | ₹2.1L |

Each card: room icon + color theme, description, progress bar, designer avatar + name, due date, budget, style tags, "View Moodboard →" link.  
Filter pills: All / In Progress / Planning / Completed / On Hold. Search by name.

### `/u/moodboard` — CustomerMoodboardPage
4 boards (one per project):

| Board | Items | Style |
|-------|-------|-------|
| Modern Kitchen Inspirations | 12 | Modern |
| Minimalist Living Room | 8 | Minimalist |
| Bedroom Warm Palette | 15 | Warm |
| Bathroom Spa Vibes | 9 | Luxury |

Each card: 5-swatch color strip, 4 product thumbnail tiles (2×2), item count, last updated, style badge, Heart / Share / Open actions.

### Routes.ts changes
```ts
// /u block replaced entirely
{
  path: "/u",
  Component: CustomerDashboardLayout,
  children: [
    { index: true,               Component: CustomerDashboardHome },
    { path: "projects",          Component: CustomerProjectsPage },
    { path: "moodboard",         Component: CustomerMoodboardPage },
    { path: "profile",           Component: UserProfileEditPage },   // reused
    { path: "settings",          Component: UserSettingsPage },      // reused
    { path: "courses",           Component: UserCoursesPage },       // linked from faculty /f/courses
    { path: "courses/:courseId", Component: UserCourseDetailPage },  // reused
  ],
}
```

Old student dashboard imports (UserPortfolioPage, UserJobsPage, UserBookmarksPage, etc.) removed from routes.ts.

---

## File map

| File | Type | Description |
|------|------|-------------|
| `src/app/components/faculty/FacultyStubPages.tsx` | Modified | Courses rebuilt (2 sections + manage panel); Assignments rebuilt (2 tabs + KC data) |
| `src/app/components/brand/BrandLeadPipeline.tsx` | Modified | Removed top tab nav; standalone page |
| `src/app/components/brand_dashboard/BrandStubPages.tsx` | Modified | `BrandLeadsPage` delegates to `BrandLeadPipeline`; import added |
| `src/app/components/studio/StudioTeamPage.tsx` | Modified | `PermRow` type, `PermToggle` component, state-driven permission matrix |
| `src/app/components/customer/CustomerDashboardLayout.tsx` | **New** | 2-item sidebar layout for customer role |
| `src/app/components/customer/CustomerPages.tsx` | **New** | Home, Projects, Moodboard pages |
| `src/app/routes.ts` | Modified | `/u` block replaced; stale student imports removed; customer imports added |

---

## Known stubs / not yet implemented

| Location | Item | Status |
|----------|------|--------|
| `/f/courses` manage panel | "Upload Materials" button | Stub — no modal |
| `/f/assignments` college tab | "Link from College Portal" button | Stub — no modal |
| `/f/assignments` KC tab | "New Assignment" button | Stub — no modal |
| `/b/leads` | "Export Report" button | Stub — no download handler |
| `/studio/team` permissions | Toggle state | Local only — resets on reload |
| `/u/projects` | "New Project" button | Stub — no modal |
| `/u/moodboard` | "Create Board" button | Stub — no modal |
| `/u/moodboard` | Product thumbnails | Placeholder Package icons — no real images |
| `/u/courses` | Enrolled courses data | Uses old student mock data from `UserCoursesPage` |
