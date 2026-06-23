const KEYS = {
  designer:  "ml_designer_tour_done",
  studio:    "ml_studio_tour_done",
  customer:  "ml_customer_tour_done",
  faculty:   "ml_faculty_tour_done",
  brand:     "ml_brand_tour_done",
  institute: "ml_institute_tour_done",
  dealer:    "ml_dealer_tour_done",
} as const;

export type DashboardTourKey = keyof typeof KEYS;

export function isTourDone(key: DashboardTourKey): boolean {
  try { return localStorage.getItem(KEYS[key]) === "1"; } catch { return false; }
}

export function markTourDone(key: DashboardTourKey): void {
  try { localStorage.setItem(KEYS[key], "1"); } catch {}
}

export function resetTour(key: DashboardTourKey): void {
  try { localStorage.removeItem(KEYS[key]); } catch {}
}
