const KEYS = {
  landing:   "ml_student_landing_tour_done",
  dashboard: "ml_student_dashboard_tour_done",
} as const;

export type TourKey = keyof typeof KEYS;

export function isTourDone(key: TourKey): boolean {
  try { return localStorage.getItem(KEYS[key]) === "1"; } catch { return false; }
}

export function markTourDone(key: TourKey): void {
  try { localStorage.setItem(KEYS[key], "1"); } catch {}
}

export function resetTour(key: TourKey): void {
  try { localStorage.removeItem(KEYS[key]); } catch {}
}
