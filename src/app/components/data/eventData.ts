// Events module — shared mock data for the public BookMyShow-style discovery
// surface and the stakeholder event dashboards (Brand / Studio / Institute).
//
// Domain:
//   EventOrganizer  — who is running the event (brand, studio, institute, platform)
//   MlEvent         — the event itself: type, dates, venue, ticketing
//   EventSession    — agenda items inside an event (for multi-session events)
//   EventSpeaker    — speakers / panellists
//   EventAttendee   — registrations
//   EventSponsor    — brands sponsoring an event (separate from organizer)

import { getBrandLogo, getBrandAccent } from "../../utils/brandAssets";

// ============================================
// Types
// ============================================

export type EventType =
  | "seminar"
  | "product-launch"
  | "kc-event"
  | "competition"
  | "fair"
  | "networking"
  | "private";

export type EventStatus =
  | "draft"
  | "published"
  | "sold-out"
  | "in-progress"
  | "completed"
  | "cancelled";

export type OrganizerType = "brand" | "studio" | "institute" | "platform";

export interface EventOrganizer {
  id: string;
  type: OrganizerType;
  name: string;
  logo: string;
  accent: string;
  city: string;
  /** Optional links to existing records. */
  brandId?: string;
  studioId?: string;
  instituteId?: string;
}

export interface EventSpeaker {
  name: string;
  title: string;
  org: string;
  initials: string;
  color: string;
}

export interface EventSession {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  speakerNames?: string[];
  description?: string;
}

export type TicketTierKind = "free-rsvp" | "general" | "premium" | "vip" | "invitation-only";

export interface TicketTier {
  id: string;
  kind: TicketTierKind;
  name: string;
  price: number; // INR
  capacity: number;
  sold: number;
  perks: string[];
}

export interface MlEvent {
  id: string;
  title: string;
  subtitle: string;
  type: EventType;
  organizerId: string;
  coverImage: string;
  description: string;
  highlights: string[];
  tags: string[];

  startsAt: string;
  endsAt: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  rsvpDeadline?: string;

  city: string;
  venue: string;
  venueAddress: string;
  isOnline: boolean;
  onlineUrl?: string;

  capacity: number;
  registeredCount: number;
  attendingCount: number;
  status: EventStatus;
  isInvitationOnly: boolean;
  isFree: boolean;

  ticketTiers: TicketTier[];
  speakers: EventSpeaker[];
  sessions: EventSession[];
  /** Organizer ids of co-sponsors (separate brands). */
  sponsorOrganizerIds: string[];

  /** True when the platform is co-presenting / featuring the event. */
  isFeatured: boolean;
}

export type AttendeeStatus =
  | "reserved"
  | "confirmed"
  | "waitlisted"
  | "cancelled"
  | "checked-in"
  | "no-show";

export interface EventAttendee {
  id: string;
  eventId: string;
  userName: string;
  userType: "designer" | "student" | "professional" | "brand-rep" | "consultant" | "guest";
  email: string;
  city: string;
  registeredAt: string;
  ticketTierId: string;
  status: AttendeeStatus;
  /** Used by event organisers to triage VIP guests. */
  isVip: boolean;
}

// ============================================
// Organizers
// ============================================

export const EVENT_ORGANIZERS: EventOrganizer[] = [
  // ── Brands ──
  { id: "org-ultratech",        type: "brand",  name: "UltraTech Cement",            logo: getBrandLogo("UltraTech Cement"),    accent: getBrandAccent("UltraTech Cement"), city: "Mumbai",   brandId: "ultratech-cement" },
  { id: "org-schneider",        type: "brand",  name: "Schneider Electric",           logo: getBrandLogo("Schneider Electric"),  accent: getBrandAccent("Schneider Electric"), city: "Gurgaon", brandId: "schneider-electric" },
  { id: "org-asianpaints",      type: "brand",  name: "Asian Paints",                  logo: getBrandLogo("Asian Paints"),        accent: getBrandAccent("Asian Paints"), city: "Mumbai",  brandId: "asian-paints" },
  { id: "org-kajaria",          type: "brand",  name: "Kajaria Ceramics",              logo: getBrandLogo("Kajaria Ceramics"),    accent: getBrandAccent("Kajaria Ceramics"), city: "Delhi",   brandId: "kajaria-ceramics" },
  { id: "org-saintgobain",      type: "brand",  name: "Saint-Gobain",                  logo: getBrandLogo("Saint-Gobain"),        accent: getBrandAccent("Saint-Gobain"), city: "Pune",    brandId: "saint-gobain" },
  { id: "org-hafele",           type: "brand",  name: "Hafele India",                  logo: getBrandLogo("Hafele India"),        accent: getBrandAccent("Hafele India"), city: "Mumbai",  brandId: "hafele" },
  // ── Studios ──
  { id: "org-bdp-india",        type: "studio", name: "BDP India — Design Studio",     logo: getBrandLogo("BDP"),                 accent: "#0f766e",                          city: "Bengaluru", studioId: "studio-bdp" },
  { id: "org-morph-design",     type: "studio", name: "Morph Design Co.",              logo: getBrandLogo("Morph Design"),        accent: "#9333ea",                          city: "Mumbai",    studioId: "studio-morph" },
  // ── Institutes ──
  { id: "org-rics",             type: "institute", name: "RICS School of Built Environment", logo: getBrandLogo("RICS"),         accent: "#3b82f6",                          city: "Noida",  instituteId: "rics-sbe" },
  { id: "org-cept",             type: "institute", name: "CEPT University",            logo: getBrandLogo("CEPT University"),     accent: "#dc2626",                          city: "Ahmedabad", instituteId: "cept" },
  // ── Platform ──
  { id: "org-ml-platform",      type: "platform", name: "ML Knowledge Hub",            logo: getBrandLogo("Material Library"),    accent: "#ff6a3d",                          city: "Mumbai" },
];

// ============================================
// Events
// ============================================

const today = new Date();
function daysFromNow(offsetDays: number, hour = 10, minute = 0): string {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const EVENTS: MlEvent[] = [
  // Brand product launch
  {
    id: "evt-schneider-ecostruxure-2026",
    title: "EcoStruxure Buildings 2026 Launch",
    subtitle: "India product reveal — smart power + BMS for net-zero buildings",
    type: "product-launch",
    organizerId: "org-schneider",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Schneider Electric unveils the 2026 EcoStruxure Buildings platform with new edge gateways, EV-ready switchgear, and an AI co-pilot for facility managers. Hands-on demos, signature giveaways and a fireside chat with Anil Chaudhry (CEO, Schneider Electric India).",
    highlights: ["Live demo of EcoStruxure Co-Pilot", "Signature edition merchandise", "1:1 architect consults", "Exclusive partner pricing for the first 50 specifications"],
    tags: ["smart-buildings", "bms", "net-zero", "switchgear"],
    startsAt: daysFromNow(12, 18, 0),
    endsAt: daysFromNow(12, 21, 30),
    registrationOpensAt: daysFromNow(-20),
    registrationClosesAt: daysFromNow(11, 23, 59),
    city: "Bengaluru",
    venue: "Taj West End — Crystal Ballroom",
    venueAddress: "Race Course Road, Bengaluru 560001",
    isOnline: false,
    capacity: 320,
    registeredCount: 248,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: false,
    ticketTiers: [
      { id: "tier-sn-general",  kind: "general",  name: "General Admission",  price: 0,    capacity: 240, sold: 188, perks: ["Keynote + demo", "Cocktails", "Signature swag"] },
      { id: "tier-sn-premium",  kind: "premium",  name: "Premium Pass",       price: 2500, capacity: 60,  sold: 48,  perks: ["Front-row seating", "Fireside chat access", "Curated dinner"] },
      { id: "tier-sn-vip",      kind: "vip",      name: "Architects VIP",     price: 5000, capacity: 20,  sold: 12,  perks: ["1:1 with product team", "Year-1 spec discount", "Branded gift kit"] },
    ],
    speakers: [
      { name: "Anil Chaudhry",       title: "CEO, Schneider Electric India",    org: "Schneider Electric", initials: "AC", color: "#16a34a" },
      { name: "Pooja Singh",         title: "VP, Smart Buildings",              org: "Schneider Electric", initials: "PS", color: "#0ea5e9" },
      { name: "Hafeez Contractor",   title: "Founder, Hafeez Contractor",       org: "Hafeez Contractor",  initials: "HC", color: "#f97316" },
    ],
    sessions: [
      { id: "sn-s1", title: "Welcome + market context",        startsAt: daysFromNow(12, 18, 0),  endsAt: daysFromNow(12, 18, 30) },
      { id: "sn-s2", title: "Live product reveal — Co-Pilot",  startsAt: daysFromNow(12, 18, 30), endsAt: daysFromNow(12, 19, 30), speakerNames: ["Pooja Singh"] },
      { id: "sn-s3", title: "Fireside: building India's net-zero stock", startsAt: daysFromNow(12, 19, 30), endsAt: daysFromNow(12, 20, 30), speakerNames: ["Anil Chaudhry", "Hafeez Contractor"] },
      { id: "sn-s4", title: "Cocktails + hands-on demos",      startsAt: daysFromNow(12, 20, 30), endsAt: daysFromNow(12, 21, 30) },
    ],
    sponsorOrganizerIds: ["org-ml-platform"],
    isFeatured: true,
  },

  // Brand seminar
  {
    id: "evt-asianpaints-spec-summit",
    title: "Specification Summit — Premium Coatings 2026",
    subtitle: "Architect-only deep-dive on the Royale Luxe + Apex Ultima 2026 lines",
    type: "seminar",
    organizerId: "org-asianpaints",
    coverImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "A 90-minute walk-through of Asian Paints' premium 2026 interior + exterior offering for architects and design studios. Includes spec libraries, BIM blocks, IS 15489 conformance data, and curated colour palettes for the upcoming season.",
    highlights: ["BIM block downloads", "On-site sample library", "Round-table with paint chemists"],
    tags: ["coatings", "specification", "interiors", "architect-only"],
    startsAt: daysFromNow(5, 11, 0),
    endsAt: daysFromNow(5, 13, 0),
    registrationOpensAt: daysFromNow(-12),
    registrationClosesAt: daysFromNow(4, 18, 0),
    city: "Mumbai",
    venue: "Asian Paints Colour World — BKC",
    venueAddress: "G-Block, Bandra Kurla Complex, Mumbai 400051",
    isOnline: false,
    capacity: 80,
    registeredCount: 64,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: true,
    isFree: true,
    ticketTiers: [
      { id: "tier-ap-invite", kind: "invitation-only", name: "Architect Invite", price: 0, capacity: 80, sold: 64, perks: ["Spec library access", "Lunch", "Q&A with chemists"] },
    ],
    speakers: [
      { name: "Karthik Menon",  title: "Head — Specifications",    org: "Asian Paints", initials: "KM", color: "#dc2626" },
      { name: "Rina Saxena",    title: "Senior Paint Chemist",     org: "Asian Paints", initials: "RS", color: "#0891b2" },
    ],
    sessions: [
      { id: "ap-s1", title: "What's new in 2026 — Royale Luxe + Apex Ultima", startsAt: daysFromNow(5, 11, 0),  endsAt: daysFromNow(5, 11, 45) },
      { id: "ap-s2", title: "Walk-through: BIM blocks + IS conformance",      startsAt: daysFromNow(5, 11, 45), endsAt: daysFromNow(5, 12, 30) },
      { id: "ap-s3", title: "Q&A + lunch",                                    startsAt: daysFromNow(5, 12, 30), endsAt: daysFromNow(5, 13, 30) },
    ],
    sponsorOrganizerIds: [],
    isFeatured: false,
  },

  // Brand fair / expo
  {
    id: "evt-kajaria-design-fair-2026",
    title: "Kajaria Design Fair 2026",
    subtitle: "Three-day tile + bathware fair for trade partners and architects",
    type: "fair",
    organizerId: "org-kajaria",
    coverImage: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Walk through the entire 2026 collection across porcelain, vitrified, marble-finish, large-format and sanitaryware. Trade-only exclusive offers, live cutting + finishing workshops, designer panels and a buyer-meet zone with 40+ Kajaria stockists.",
    highlights: ["Trade-only pricing", "40+ stockist meet zone", "Live cutting workshops", "Designer panel by RJ Yug"],
    tags: ["tiles", "fair", "bathware", "interiors"],
    startsAt: daysFromNow(28, 10, 0),
    endsAt: daysFromNow(30, 19, 0),
    registrationOpensAt: daysFromNow(-15),
    registrationClosesAt: daysFromNow(27, 23, 59),
    city: "New Delhi",
    venue: "Pragati Maidan — Hall 8",
    venueAddress: "Pragati Maidan, New Delhi 110001",
    isOnline: false,
    capacity: 2000,
    registeredCount: 1240,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-kj-trade",     kind: "free-rsvp",       name: "Trade Visitor",      price: 0,    capacity: 1600, sold: 1040, perks: ["3-day pass", "Trade pricing book"] },
      { id: "tier-kj-architect", kind: "general",         name: "Architect Pass",     price: 1500, capacity: 380,  sold: 200,  perks: ["VIP lounge", "Designer panel seating", "Coffee + lunch"] },
      { id: "tier-kj-premium",   kind: "premium",         name: "Studio Premium",     price: 6000, capacity: 20,   sold: 0,    perks: ["Curated brand tour", "1:1 with product GM", "Branded gift kit"] },
    ],
    speakers: [
      { name: "RJ Yug",        title: "Host + Design Curator",   org: "Independent",   initials: "RY", color: "#a855f7" },
      { name: "Shailendra Mehta", title: "VP — Premium Tiles",   org: "Kajaria Ceramics", initials: "SM", color: "#7c3aed" },
    ],
    sessions: [
      { id: "kj-s1", title: "Day 1 — Floors & Walls",            startsAt: daysFromNow(28, 10, 0), endsAt: daysFromNow(28, 19, 0) },
      { id: "kj-s2", title: "Day 2 — Bath + Large-format reveal", startsAt: daysFromNow(29, 10, 0), endsAt: daysFromNow(29, 19, 0) },
      { id: "kj-s3", title: "Day 3 — Designer panel + Award",     startsAt: daysFromNow(30, 10, 0), endsAt: daysFromNow(30, 19, 0) },
    ],
    sponsorOrganizerIds: ["org-ml-platform"],
    isFeatured: true,
  },

  // KC (Knowledge Centre) event
  {
    id: "evt-ml-kc-rmc-deepdive",
    title: "Knowledge Centre Visit — Ready-Mix Concrete Plant",
    subtitle: "Half-day site immersion with UltraTech's Bengaluru RMC unit",
    type: "kc-event",
    organizerId: "org-ml-platform",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Take a curated half-day visit through UltraTech's largest RMC unit in Bengaluru: batching tour, IS 4926 quality lab walk-through, fleet-management ops, and a closing session on M-Sand sourcing. Limited to 24 attendees for a hands-on group.",
    highlights: ["Batching tour", "Quality lab walk-through", "Fleet ops session", "Lunch on-site"],
    tags: ["kc", "concrete", "site-visit", "operations"],
    startsAt: daysFromNow(9, 9, 30),
    endsAt: daysFromNow(9, 14, 0),
    registrationOpensAt: daysFromNow(-7),
    registrationClosesAt: daysFromNow(8, 18, 0),
    city: "Bengaluru",
    venue: "UltraTech RMC Plant — Yelahanka",
    venueAddress: "Yelahanka, Bengaluru 560064",
    isOnline: false,
    capacity: 24,
    registeredCount: 22,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-kc-rsvp", kind: "free-rsvp", name: "KC RSVP", price: 0, capacity: 24, sold: 22, perks: ["Plant tour", "Lunch", "Materials kit"] },
    ],
    speakers: [
      { name: "Vijay Sridharan",  title: "Plant GM",            org: "UltraTech Cement", initials: "VS", color: "#dc2626" },
      { name: "Anita Khanna",     title: "Head Campus & KC",     org: "UltraTech Cement", initials: "AK", color: "#0ea5e9" },
    ],
    sessions: [
      { id: "kc-s1", title: "Arrival + safety briefing",  startsAt: daysFromNow(9,  9, 30), endsAt: daysFromNow(9, 10, 0) },
      { id: "kc-s2", title: "Batching tour",              startsAt: daysFromNow(9, 10, 0), endsAt: daysFromNow(9, 11, 30) },
      { id: "kc-s3", title: "Quality lab walk-through",   startsAt: daysFromNow(9, 11, 30), endsAt: daysFromNow(9, 12, 30) },
      { id: "kc-s4", title: "Lunch + Q&A",                startsAt: daysFromNow(9, 12, 30), endsAt: daysFromNow(9, 14,  0) },
    ],
    sponsorOrganizerIds: ["org-ultratech"],
    isFeatured: true,
  },

  // Institute competition
  {
    id: "evt-rics-quantathon-2026",
    title: "RICS Quanta-thon 2026",
    subtitle: "National quantity-surveying case-study championship",
    type: "competition",
    organizerId: "org-rics",
    coverImage: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "A two-day inter-college case-study championship judged by Saint-Gobain, Fosroc and L&T Construction. Teams of 3 from 28 institutes compete on real-world cost-takeoff briefs, with cash prizes worth ₹3L and placement interviews waiting for the finalists.",
    highlights: ["Real-world case briefs", "₹3L prize pool", "Direct interviews with top recruiters", "Free residential package for outstation teams"],
    tags: ["competition", "qs", "students"],
    startsAt: daysFromNow(45, 9, 0),
    endsAt: daysFromNow(46, 19, 0),
    registrationOpensAt: daysFromNow(-3),
    registrationClosesAt: daysFromNow(38, 18, 0),
    city: "Noida",
    venue: "RICS SBE Campus — Plot 16",
    venueAddress: "Knowledge Park IV, Greater Noida 201310",
    isOnline: false,
    capacity: 84,
    registeredCount: 51,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: false,
    ticketTiers: [
      { id: "tier-quanta-team",   kind: "general", name: "Team Registration (3 members)", price: 1500, capacity: 28, sold: 17, perks: ["All-meals package", "Certificate", "Goodie bag"] },
      { id: "tier-quanta-spect",  kind: "free-rsvp", name: "Spectator", price: 0, capacity: 250, sold: 132, perks: ["Day passes both days"] },
    ],
    speakers: [
      { name: "Prof. Sanjay Tyagi",      title: "Dean, RICS SBE",           org: "RICS SBE", initials: "ST", color: "#3b82f6" },
      { name: "Anuj Aggarwal",           title: "Head — Pre-Construction",  org: "L&T Construction", initials: "AA", color: "#1d4ed8" },
    ],
    sessions: [
      { id: "qt-s1", title: "Day 1 — Brief release + workshop", startsAt: daysFromNow(45, 9, 0), endsAt: daysFromNow(45, 19, 0) },
      { id: "qt-s2", title: "Day 2 — Final pitches + awards",   startsAt: daysFromNow(46, 9, 0), endsAt: daysFromNow(46, 19, 0) },
    ],
    sponsorOrganizerIds: ["org-saintgobain", "org-ultratech"],
    isFeatured: true,
  },

  // Institute seminar
  {
    id: "evt-cept-greenbuilding",
    title: "Green Building Codes 2026 — A CEPT Seminar",
    subtitle: "Hybrid panel on India's evolving energy-conservation rules",
    type: "seminar",
    organizerId: "org-cept",
    coverImage: "https://images.unsplash.com/photo-1518005020251-582c788447dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Architects, sustainability consultants and policy folks unpack the 2026 revisions to ECBC, ENS and the Net-Zero roadmap. Includes a panel with IGBC chair and a Q&A on how to translate the new rules into BoQ decisions.",
    highlights: ["ECBC 2026 deep-dive", "IGBC chair panel", "Hybrid — attend online or in person", "Free e-handbook"],
    tags: ["sustainability", "seminar", "policy"],
    startsAt: daysFromNow(17, 16, 0),
    endsAt: daysFromNow(17, 18, 30),
    registrationOpensAt: daysFromNow(-10),
    registrationClosesAt: daysFromNow(16, 23, 59),
    city: "Ahmedabad",
    venue: "CEPT University — Lecture Theatre 1",
    venueAddress: "K.L. Campus, Navrangpura, Ahmedabad 380009",
    isOnline: true,
    onlineUrl: "https://events.cept.ac.in/greenbuilding",
    capacity: 350,
    registeredCount: 218,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-cept-online", kind: "free-rsvp", name: "Online RSVP",  price: 0, capacity: 250, sold: 168, perks: ["Live stream", "E-handbook"] },
      { id: "tier-cept-onsite", kind: "free-rsvp", name: "On-site RSVP", price: 0, capacity: 100, sold:  50, perks: ["Refreshments", "Networking", "Printed handbook"] },
    ],
    speakers: [
      { name: "Dr. Yatin Pandya",   title: "Founder, Footprints Earth",   org: "Footprints",  initials: "YP", color: "#10b981" },
      { name: "Mahesh Ramanujam",   title: "Former CEO, USGBC",            org: "USGBC",       initials: "MR", color: "#0ea5e9" },
    ],
    sessions: [
      { id: "ce-s1", title: "Policy update — ECBC 2026",     startsAt: daysFromNow(17, 16, 0),  endsAt: daysFromNow(17, 16, 45), speakerNames: ["Mahesh Ramanujam"] },
      { id: "ce-s2", title: "Translating policy into BoQ",   startsAt: daysFromNow(17, 16, 45), endsAt: daysFromNow(17, 17, 30), speakerNames: ["Dr. Yatin Pandya"] },
      { id: "ce-s3", title: "Audience Q&A",                  startsAt: daysFromNow(17, 17, 30), endsAt: daysFromNow(17, 18, 30) },
    ],
    sponsorOrganizerIds: [],
    isFeatured: false,
  },

  // Studio private event
  {
    id: "evt-bdp-portfolio-night",
    title: "BDP India Portfolio Night — Class of 2026",
    subtitle: "Closed-door portfolio reviews + studio recruiting",
    type: "private",
    organizerId: "org-bdp-india",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "An invitation-only evening for shortlisted final-year students of architecture and design. 20-minute portfolio crits with BDP principals, followed by a private dinner and structured studio Q&A.",
    highlights: ["20-min portfolio crit", "Recruiting conversations", "Dinner", "Limited to 30 students"],
    tags: ["studio", "recruiting", "portfolio", "private"],
    startsAt: daysFromNow(22, 19, 0),
    endsAt: daysFromNow(22, 22, 0),
    registrationOpensAt: daysFromNow(-5),
    registrationClosesAt: daysFromNow(15, 23, 59),
    rsvpDeadline: daysFromNow(18, 23, 59),
    city: "Bengaluru",
    venue: "BDP Studio — Indiranagar",
    venueAddress: "100 Ft Road, Indiranagar, Bengaluru 560038",
    isOnline: false,
    capacity: 30,
    registeredCount: 26,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: true,
    isFree: true,
    ticketTiers: [
      { id: "tier-bdp-invite", kind: "invitation-only", name: "Invitation Only", price: 0, capacity: 30, sold: 26, perks: ["Portfolio crit", "Dinner", "Folio kit"] },
    ],
    speakers: [
      { name: "Mira Nayar",   title: "Principal — BDP India",    org: "BDP India", initials: "MN", color: "#0f766e" },
      { name: "Sanjay Puri",  title: "Founder, Sanjay Puri Architects",  org: "SPA", initials: "SP", color: "#7c3aed" },
    ],
    sessions: [
      { id: "bdp-s1", title: "Portfolio crits + studio Q&A", startsAt: daysFromNow(22, 19, 0), endsAt: daysFromNow(22, 21, 0) },
      { id: "bdp-s2", title: "Dinner",                       startsAt: daysFromNow(22, 21, 0), endsAt: daysFromNow(22, 22, 0) },
    ],
    sponsorOrganizerIds: [],
    isFeatured: false,
  },

  // Networking event
  {
    id: "evt-morph-arch-mixer",
    title: "Architects Mixer — Mumbai",
    subtitle: "Casual mixer for studios, brands and design entrepreneurs",
    type: "networking",
    organizerId: "org-morph-design",
    coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "An unstructured evening mixer for Mumbai's architect/design crowd. Bring 10 business cards and one design provocation. Hosted at Morph's studio loft in Bandra. Co-curated with the ML Knowledge Hub team.",
    highlights: ["No talks — just conversations", "Curated guest list of 80", "Single-origin coffee bar", "Live jazz set"],
    tags: ["networking", "mixer", "design"],
    startsAt: daysFromNow(3, 19, 30),
    endsAt: daysFromNow(3, 22, 30),
    registrationOpensAt: daysFromNow(-12),
    registrationClosesAt: daysFromNow(2, 18, 0),
    city: "Mumbai",
    venue: "Morph Studio Loft — Bandra",
    venueAddress: "Off Carter Road, Bandra (W), Mumbai 400050",
    isOnline: false,
    capacity: 80,
    registeredCount: 72,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: false,
    ticketTiers: [
      { id: "tier-morph-pass", kind: "general", name: "Mixer Pass", price: 600, capacity: 80, sold: 72, perks: ["Coffee bar", "Light bites", "Live jazz set"] },
    ],
    speakers: [],
    sessions: [
      { id: "morph-s1", title: "Mixer + jazz set", startsAt: daysFromNow(3, 19, 30), endsAt: daysFromNow(3, 22, 30) },
    ],
    sponsorOrganizerIds: ["org-ml-platform"],
    isFeatured: true,
  },

  // Hafele product launch
  {
    id: "evt-hafele-kitchen-2026",
    title: "Hafele Loox 2026 — Lighting & Hardware Launch",
    subtitle: "All-new modular wardrobe + kitchen system reveal",
    type: "product-launch",
    organizerId: "org-hafele",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Hafele unveils the new Loox 2026 lighting line and the matching Easys profile system for wardrobes and kitchens. 90 minutes of demos, plus take-away spec sheets for designers and one-on-one consultations.",
    highlights: ["Spec-sheet drop", "Hands-on demos", "Loox Pro starter kits for studios"],
    tags: ["product-launch", "hardware", "lighting", "kitchens"],
    startsAt: daysFromNow(7, 17, 30),
    endsAt: daysFromNow(7, 20, 0),
    registrationOpensAt: daysFromNow(-8),
    registrationClosesAt: daysFromNow(6, 23, 59),
    city: "Mumbai",
    venue: "Hafele Design Centre — Lower Parel",
    venueAddress: "Senapati Bapat Marg, Mumbai 400013",
    isOnline: false,
    capacity: 140,
    registeredCount: 96,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-haf-rsvp", kind: "free-rsvp", name: "Designer RSVP", price: 0, capacity: 120, sold: 86, perks: ["Spec sheets", "Loox starter kit (limited)"] },
      { id: "tier-haf-premium", kind: "premium", name: "Studio Premium", price: 1500, capacity: 20, sold: 10, perks: ["1:1 consult", "Branded gift kit"] },
    ],
    speakers: [
      { name: "Frank Schiek", title: "MD, Hafele India",       org: "Hafele India", initials: "FS", color: "#212121" },
      { name: "Anita Padhye", title: "Head — Design Centre",   org: "Hafele India", initials: "AP", color: "#0891b2" },
    ],
    sessions: [
      { id: "haf-s1", title: "Loox 2026 reveal",         startsAt: daysFromNow(7, 17, 30), endsAt: daysFromNow(7, 18, 30) },
      { id: "haf-s2", title: "Easys profile walk-through", startsAt: daysFromNow(7, 18, 30), endsAt: daysFromNow(7, 19, 15) },
      { id: "haf-s3", title: "1:1 consults + canapés",    startsAt: daysFromNow(7, 19, 15), endsAt: daysFromNow(7, 20, 0) },
    ],
    sponsorOrganizerIds: [],
    isFeatured: false,
  },

  // Saint-Gobain seminar
  {
    id: "evt-saintgobain-facade-masterclass",
    title: "High-Performance Facades — Saint-Gobain Masterclass",
    subtitle: "Full-day masterclass on IGU specification and U-value engineering",
    type: "seminar",
    organizerId: "org-saintgobain",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Saint-Gobain's flagship full-day deep dive into glass selection, IGU make-ups, U-value engineering and Façade Pro™ specification. CPD credits via IIA. Lunch + breakouts included.",
    highlights: ["IGU make-up calculator", "Façade Pro™ live demo", "CPD credits", "Glazing samples included"],
    tags: ["facades", "glass", "specification", "cpd"],
    startsAt: daysFromNow(20, 9, 30),
    endsAt: daysFromNow(20, 17, 0),
    registrationOpensAt: daysFromNow(-10),
    registrationClosesAt: daysFromNow(19, 23, 59),
    city: "Pune",
    venue: "Saint-Gobain Research India",
    venueAddress: "MIDC, Hinjawadi, Pune 411057",
    isOnline: false,
    capacity: 60,
    registeredCount: 42,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: false,
    ticketTiers: [
      { id: "tier-sg-arch", kind: "general", name: "Architect Pass", price: 3500, capacity: 50, sold: 36, perks: ["CPD credits", "Lunch", "Glazing samples"] },
      { id: "tier-sg-stud", kind: "general", name: "Student Pass",   price: 1200, capacity: 10, sold: 6,  perks: ["CPD credits", "Lunch"] },
    ],
    speakers: [
      { name: "Aditi Sharma",    title: "Head — Glazing R&D",    org: "Saint-Gobain", initials: "AS", color: "#00529c" },
      { name: "Karan Verma",     title: "Senior HRBP",            org: "Saint-Gobain", initials: "KV", color: "#1d4ed8" },
    ],
    sessions: [
      { id: "sg-s1", title: "Glass families & coatings",       startsAt: daysFromNow(20,  9, 30), endsAt: daysFromNow(20, 11,  0) },
      { id: "sg-s2", title: "IGU make-up + U-value lab",       startsAt: daysFromNow(20, 11, 30), endsAt: daysFromNow(20, 13,  0) },
      { id: "sg-s3", title: "Façade Pro™ demo",                 startsAt: daysFromNow(20, 14,  0), endsAt: daysFromNow(20, 15, 30) },
      { id: "sg-s4", title: "Working lab — own design crit",   startsAt: daysFromNow(20, 15, 30), endsAt: daysFromNow(20, 17,  0) },
    ],
    sponsorOrganizerIds: [],
    isFeatured: false,
  },

  // RICS networking
  {
    id: "evt-rics-alumni-mixer",
    title: "RICS Alumni Mixer — Class of 2025 Send-Off",
    subtitle: "Annual alumni + graduating-class mixer with recruiters",
    type: "networking",
    organizerId: "org-rics",
    coverImage: "https://images.unsplash.com/photo-1505373876331-ff89baa8ce3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Final-year send-off and alumni-network reunion. 250+ attendees including alumni partners at L&T, Tata Projects, Shapoorji, UltraTech, Saint-Gobain and more.",
    highlights: ["Alumni from 2008-2024", "Recruiter speed-dating", "Live band", "Photo memory wall"],
    tags: ["networking", "alumni", "students"],
    startsAt: daysFromNow(35, 18, 30),
    endsAt: daysFromNow(35, 23, 0),
    registrationOpensAt: daysFromNow(-2),
    registrationClosesAt: daysFromNow(33, 23, 59),
    city: "Noida",
    venue: "Radisson Noida — Royal Ballroom",
    venueAddress: "Sector 18, Noida 201301",
    isOnline: false,
    capacity: 280,
    registeredCount: 174,
    attendingCount: 0,
    status: "published",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-rics-alumni", kind: "free-rsvp", name: "Alumni RSVP",      price: 0, capacity: 200, sold: 138, perks: ["Cocktails", "Dinner", "Goodie bag"] },
      { id: "tier-rics-final",  kind: "free-rsvp", name: "Graduating Class", price: 0, capacity: 80,  sold: 36,  perks: ["Cocktails", "Dinner"] },
    ],
    speakers: [],
    sessions: [
      { id: "rics-alumni-s1", title: "Mixer + dinner", startsAt: daysFromNow(35, 18, 30), endsAt: daysFromNow(35, 23, 0) },
    ],
    sponsorOrganizerIds: ["org-ml-platform", "org-ultratech"],
    isFeatured: false,
  },

  // Past completed event
  {
    id: "evt-ml-spec-roadshow",
    title: "ML Specification Roadshow — Mumbai",
    subtitle: "How leading studios spec across the L1-L5 hierarchy",
    type: "seminar",
    organizerId: "org-ml-platform",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    description:
      "Recap event from October 2025. Hosted across Mumbai, Bengaluru and Delhi. The Mumbai chapter drew 260 attendees and 12 brand partners.",
    highlights: ["Recorded — replay available", "12 brand partners on stage", "260 attendees"],
    tags: ["seminar", "specification"],
    startsAt: daysFromNow(-25, 11, 0),
    endsAt: daysFromNow(-25, 17, 0),
    registrationOpensAt: daysFromNow(-50),
    registrationClosesAt: daysFromNow(-26, 23, 59),
    city: "Mumbai",
    venue: "JW Marriott — Sahar",
    venueAddress: "International Airport Road, Mumbai 400099",
    isOnline: false,
    capacity: 280,
    registeredCount: 260,
    attendingCount: 232,
    status: "completed",
    isInvitationOnly: false,
    isFree: true,
    ticketTiers: [
      { id: "tier-spec-rsvp", kind: "free-rsvp", name: "Spec Roadshow RSVP", price: 0, capacity: 280, sold: 260, perks: ["Replay access"] },
    ],
    speakers: [
      { name: "Maya Sundar",   title: "Editor, ML Knowledge Hub", org: "ML Knowledge Hub", initials: "MS", color: "#ff6a3d" },
    ],
    sessions: [
      { id: "spec-s1", title: "Specification panel + Q&A", startsAt: daysFromNow(-25, 11, 0), endsAt: daysFromNow(-25, 17, 0) },
    ],
    sponsorOrganizerIds: ["org-ultratech", "org-asianpaints", "org-kajaria"],
    isFeatured: false,
  },
];

// ============================================
// Attendees (sample — enough to drive the dashboards)
// ============================================

const ATTENDEE_AVATAR_COLORS = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

function makeAttendees(eventId: string, tierId: string, count: number, baseIndex: number, status: AttendeeStatus = "confirmed"): EventAttendee[] {
  const names = [
    "Arjun Mehta", "Priya Iyer", "Nikhil Rao", "Rhea Kapoor", "Aditya Shah",
    "Sara Khan", "Vivek Gupta", "Ananya Roy", "Karthik Nair", "Ishita Bose",
    "Rohan Jain", "Meera Patel", "Sneha Verma", "Aryan Reddy", "Diya Chopra",
    "Ravi Krishnan", "Anjali Joshi", "Sahil Bhatia", "Tara Pillai", "Kabir Singh",
    "Ira Banerjee", "Yash Sethi", "Naina Sen", "Vikram Bhalla", "Pooja Menon",
  ];
  const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Chennai", "Hyderabad", "Noida", "Ahmedabad"];
  const types: EventAttendee["userType"][] = ["designer", "student", "professional", "brand-rep", "consultant"];
  const out: EventAttendee[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (baseIndex + i) % names.length;
    const name = names[idx];
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    out.push({
      id: `att-${eventId}-${i + 1}`,
      eventId,
      userName: name,
      userType: types[(baseIndex + i) % types.length],
      email: `${slug}@ml.example`,
      city: cities[(baseIndex + i) % cities.length],
      registeredAt: new Date(today.getTime() - (8 + i) * 86_400_000).toISOString(),
      ticketTierId: tierId,
      status,
      isVip: i % 9 === 0,
    });
  }
  return out;
}

export const EVENT_ATTENDEES: EventAttendee[] = [
  // Sample a few attendees per event — enough to populate roster tables
  ...makeAttendees("evt-schneider-ecostruxure-2026", "tier-sn-general", 8, 0),
  ...makeAttendees("evt-schneider-ecostruxure-2026", "tier-sn-premium", 4, 8, "confirmed"),
  ...makeAttendees("evt-schneider-ecostruxure-2026", "tier-sn-vip", 2, 12, "confirmed"),
  ...makeAttendees("evt-asianpaints-spec-summit", "tier-ap-invite", 6, 1),
  ...makeAttendees("evt-kajaria-design-fair-2026", "tier-kj-trade", 10, 2),
  ...makeAttendees("evt-kajaria-design-fair-2026", "tier-kj-architect", 4, 12),
  ...makeAttendees("evt-ml-kc-rmc-deepdive", "tier-kc-rsvp", 8, 3),
  ...makeAttendees("evt-rics-quantathon-2026", "tier-quanta-team", 6, 4),
  ...makeAttendees("evt-cept-greenbuilding", "tier-cept-online", 5, 5),
  ...makeAttendees("evt-cept-greenbuilding", "tier-cept-onsite", 4, 10),
  ...makeAttendees("evt-bdp-portfolio-night", "tier-bdp-invite", 6, 6),
  ...makeAttendees("evt-morph-arch-mixer", "tier-morph-pass", 8, 7),
  ...makeAttendees("evt-hafele-kitchen-2026", "tier-haf-rsvp", 6, 0),
  ...makeAttendees("evt-saintgobain-facade-masterclass", "tier-sg-arch", 5, 9),
  ...makeAttendees("evt-rics-alumni-mixer", "tier-rics-alumni", 6, 11),
  ...makeAttendees("evt-ml-spec-roadshow", "tier-spec-rsvp", 12, 14, "checked-in"),
];

// ============================================
// Helpers
// ============================================

export function getEvent(id: string): MlEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getOrganizer(id: string): EventOrganizer | undefined {
  return EVENT_ORGANIZERS.find((o) => o.id === id);
}

export function getEventsByOrganizer(organizerId: string): MlEvent[] {
  return EVENTS.filter((e) => e.organizerId === organizerId || e.sponsorOrganizerIds.includes(organizerId));
}

export function getEventsByOrganizerType(type: OrganizerType): MlEvent[] {
  return EVENTS.filter((e) => {
    const org = getOrganizer(e.organizerId);
    return org?.type === type;
  });
}

export function getAttendeesForEvent(eventId: string): EventAttendee[] {
  return EVENT_ATTENDEES.filter((a) => a.eventId === eventId);
}

export function getUpcomingEvents(): MlEvent[] {
  const now = Date.now();
  return EVENTS
    .filter((e) => Date.parse(e.startsAt) >= now && e.status !== "cancelled")
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

export function getFeaturedEvents(): MlEvent[] {
  return getUpcomingEvents().filter((e) => e.isFeatured);
}

export function getEventTypeOptions(): { id: EventType; label: string }[] {
  return [
    { id: "seminar",         label: "Seminars" },
    { id: "product-launch",  label: "Product Launches" },
    { id: "kc-event",        label: "KC Visits" },
    { id: "competition",     label: "Competitions" },
    { id: "fair",            label: "Fairs & Expos" },
    { id: "networking",      label: "Networking" },
    { id: "private",         label: "Private" },
  ];
}

export function eventTypeLabel(type: EventType): string {
  const m: Record<EventType, string> = {
    seminar: "Seminar",
    "product-launch": "Product Launch",
    "kc-event": "KC Event",
    competition: "Competition",
    fair: "Fair",
    networking: "Networking",
    private: "Private",
  };
  return m[type];
}

export function eventTypeBadge(type: EventType): { bg: string; color: string } {
  const m: Record<EventType, { bg: string; color: string }> = {
    seminar:         { bg: "rgba(59,130,246,0.10)",  color: "#1d4ed8" },
    "product-launch":{ bg: "rgba(168,85,247,0.10)",  color: "#7c3aed" },
    "kc-event":      { bg: "rgba(245,158,11,0.10)",  color: "#b45309" },
    competition:     { bg: "rgba(236,72,153,0.10)",  color: "#be185d" },
    fair:            { bg: "rgba(20,184,166,0.10)",  color: "#0f766e" },
    networking:      { bg: "rgba(99,102,241,0.10)",  color: "#4338ca" },
    private:         { bg: "rgba(107,114,128,0.10)", color: "#374151" },
  };
  return m[type];
}

export function attendeeStatusBadge(status: AttendeeStatus): { bg: string; color: string; label: string } {
  const m: Record<AttendeeStatus, { bg: string; color: string; label: string }> = {
    reserved:    { bg: "rgba(99,102,241,0.10)",  color: "#4338ca", label: "Reserved" },
    confirmed:   { bg: "rgba(59,130,246,0.10)",  color: "#1d4ed8", label: "Confirmed" },
    waitlisted:  { bg: "rgba(245,158,11,0.10)",  color: "#b45309", label: "Waitlisted" },
    cancelled:   { bg: "rgba(239,68,68,0.10)",   color: "#b91c1c", label: "Cancelled" },
    "checked-in":{ bg: "rgba(16,185,129,0.10)",  color: "#047857", label: "Checked in" },
    "no-show":   { bg: "rgba(107,114,128,0.10)", color: "#374151", label: "No-show" },
  };
  return m[status];
}

export function eventRevenue(event: MlEvent): number {
  return event.ticketTiers.reduce((sum, t) => sum + t.price * t.sold, 0);
}

export function eventCapacityFill(event: MlEvent): number {
  if (!event.capacity) return 0;
  return Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
}

export function organizerKpis(organizerId: string): {
  upcomingCount: number;
  completedCount: number;
  totalRegistrations: number;
  totalRevenue: number;
  averageFill: number;
} {
  const owned = EVENTS.filter((e) => e.organizerId === organizerId);
  const upcoming = owned.filter((e) => Date.parse(e.startsAt) >= Date.now() && e.status !== "cancelled");
  const completed = owned.filter((e) => e.status === "completed");
  const totalRegistrations = owned.reduce((s, e) => s + e.registeredCount, 0);
  const totalRevenue = owned.reduce((s, e) => s + eventRevenue(e), 0);
  const averageFill = owned.length
    ? Math.round(owned.reduce((s, e) => s + eventCapacityFill(e), 0) / owned.length)
    : 0;
  return {
    upcomingCount: upcoming.length,
    completedCount: completed.length,
    totalRegistrations,
    totalRevenue,
    averageFill,
  };
}

/** Returns the inferred organizer for a given stakeholder type. Used by the
 *  dashboard wrappers to scope content to "your events" without an auth flow. */
export function defaultOrganizerForType(type: OrganizerType): EventOrganizer {
  return EVENT_ORGANIZERS.find((o) => o.type === type)!;
}
