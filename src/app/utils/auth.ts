const KEY = "ml_auth_user";

export interface AuthUser {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  type: string;
  profilePath: string;
  dashboardPath: string;
  landingPath: string;
}

export const ANKIT: AuthUser = {
  id: "ankit-sharma",
  name: "Ankit Sharma",
  initials: "AS",
  avatarUrl: "https://i.pravatar.cc/80?img=68",
  type: "Interior Designer",
  profilePath: "/designer/ankit-sharma",
  dashboardPath: "/d",
  landingPath: "/d",
};

export const INSTITUTE_USER: AuthUser = {
  id: "rics-sbe-admin",
  name: "RICS SBE",
  initials: "RS",
  type: "Institute Manager",
  profilePath: "/college/rics-sbe",
  dashboardPath: "/institute",
  landingPath: "/institute",
};

export const BRAND_USER: AuthUser = {
  id: "kajaria-brand",
  name: "Kajaria Ceramics",
  initials: "KC",
  type: "Brand",
  profilePath: "/brand/Kajaria%20Ceramics",
  dashboardPath: "/b",
  landingPath: "/b",
};

export const STUDENT_USER: AuthUser = {
  id: "priya-mehta",
  name: "Priya Mehta",
  initials: "PM",
  avatarUrl: "https://i.pravatar.cc/80?img=38",
  type: "Student",
  profilePath: "/student/priya-mehta",
  dashboardPath: "/s",
  landingPath: "/s",
};

export const FACULTY_USER: AuthUser = {
  id: "ravi-kumar",
  name: "Dr. Ravi Kumar",
  initials: "RK",
  avatarUrl: "https://i.pravatar.cc/80?img=65",
  type: "Faculty",
  profilePath: "/faculty/ravi-kumar",
  dashboardPath: "/f",
  landingPath: "/f",
};

export const STUDIO_USER: AuthUser = {
  id: "bdp-india",
  name: "Studio Materium",
  initials: "SM",
  type: "Studio",
  profilePath: "/v1/studios/microsite/bdp-india",
  dashboardPath: "/studio",
  landingPath: "/studio",
};

export const RETAIL_USER: AuthUser = {
  id: "retail-user",
  name: "Sam Patel",
  initials: "SP",
  avatarUrl: "https://i.pravatar.cc/80?img=35",
  type: "Retail Customer",
  profilePath: "/u/profile",
  dashboardPath: "/u",
  landingPath: "/v1",
};

export function isInstituteManager(user: AuthUser | null): boolean {
  return user?.type === "Institute Manager";
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser): void {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("ml-auth-change"));
}

export function clearAuthUser(): void {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("ml-auth-change"));
}

export const DEALER_USER: AuthUser = {
  id: "buildmart-dealer",
  name: "BuildMart India",
  initials: "BM",
  type: "Dealer",
  profilePath: "/store/buildmart-india",
  dashboardPath: "/dealer",
  landingPath: "/dealer",
};

export const ADMIN_USER: AuthUser = {
  id: "raj-sharma-admin",
  name: "Raj Sharma",
  initials: "RS",
  avatarUrl: "https://i.pravatar.cc/80?img=56",
  type: "ML Admin",
  profilePath: "/admin/profile",
  dashboardPath: "/admin",
  landingPath: "/admin",
};

export { ANKIT as DEFAULT_USER };
