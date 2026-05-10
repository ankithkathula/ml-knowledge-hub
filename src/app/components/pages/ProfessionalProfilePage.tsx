import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, MapPin, Share2, MessageCircle, Heart, Eye,
  Users, Calendar, Award, Briefcase, Send, ExternalLink,
  ThumbsUp, Clock, Bookmark, ChevronDown,
  Linkedin, Globe, Instagram, PenTool, Star,
  UserPlus, Mail, GraduationCap, BadgeCheck, Languages,
  FolderOpen, MessageSquare, Link2, Activity,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

/* ── types ──────────────────────────────────────────────────── */

interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  date: string;
  likes: number;
  views: number;
  comments: number;
  gradient: string;
  description: string;
  materials: string[];
  mockComments: { author: string; initials: string; text: string; time: string; gradient: string }[];
}

interface Experience {
  role: string;
  company: string;
  duration: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface ActivityItem {
  id: number;
  type: "project" | "comment" | "like" | "share" | "connect";
  description: string;
  time: string;
}

interface SimilarProfessional {
  name: string;
  slug: string;
  initials: string;
  specialty: string;
  gradient: string;
}

interface ProfileData {
  slug: string;
  name: string;
  initials: string;
  headline: string;
  type: string;
  location: string;
  memberSince: string;
  gradient: string;
  projects: number;
  followers: number;
  following: number;
  views: number;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  languages: string[];
  socials: { platform: string; url: string }[];
  portfolio: PortfolioProject[];
  activity: ActivityItem[];
  similarPros: SimilarProfessional[];
  sharedConnections: number;
}

/* ── mock data ─────────────────────────────────────────────── */

const PROFILES: ProfileData[] = [
  {
    slug: "ananya-sharma",
    name: "Ananya Sharma",
    initials: "AS",
    headline: "Senior Architect | Sustainable Design | LEED AP",
    type: "Architect",
    location: "Bengaluru, Karnataka",
    memberSince: "March 2023",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    projects: 24,
    followers: 1340,
    following: 285,
    views: 18420,
    bio: "Award-winning architect with 9 years of experience in sustainable residential and commercial design. Passionate about integrating biophilic design principles with modern construction technology. Currently leading the design studio at GreenFrame Architects, Bengaluru. Featured in Architectural Digest India and DesignBoom.",
    skills: ["AutoCAD", "Revit", "SketchUp", "V-Ray", "Sustainability", "IGBC", "LEED", "BIM", "Rhino", "Grasshopper", "Lumion", "Adobe Suite"],
    experience: [
      { role: "Design Studio Lead", company: "GreenFrame Architects, Bengaluru", duration: "2021 - Present" },
      { role: "Senior Architect", company: "Studio Lotus, New Delhi", duration: "2018 - 2021" },
      { role: "Junior Architect", company: "Morphogenesis, New Delhi", duration: "2015 - 2018" },
    ],
    education: [
      { degree: "B.Arch", institution: "School of Planning & Architecture, New Delhi", year: "2015" },
      { degree: "M.Arch (Sustainable Design)", institution: "CEPT University, Ahmedabad", year: "2017" },
    ],
    certifications: ["LEED Accredited Professional (AP)", "IGBC Accredited Professional", "Autodesk Certified Professional — Revit"],
    languages: ["English", "Hindi", "Kannada"],
    socials: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Behance", url: "#" },
      { platform: "Website", url: "#" },
      { platform: "Instagram", url: "#" },
    ],
    portfolio: [
      {
        id: 1, title: "Lakeside Villa Residence", category: "Residential", date: "Nov 2025", likes: 342, views: 4820, comments: 28,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        description: "A 4,200 sq.ft. sustainable villa on the banks of Ulsoor Lake, Bengaluru. The design maximizes cross-ventilation and natural daylighting while using locally sourced Sadarahalli granite and reclaimed teak. Achieved IGBC Gold rating with 40% reduction in energy consumption compared to conventional homes.",
        materials: ["Sadarahalli Granite", "Reclaimed Teak", "Low-E Glass", "Compressed Earth Blocks", "Bamboo Composite"],
        mockComments: [
          { author: "Vikram Singh", initials: "VS", text: "Stunning use of reclaimed materials. The courtyard integration is masterful!", time: "3 days ago", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
          { author: "Priya Nair", initials: "PN", text: "How did you handle the waterproofing near the lake edge? Would love to learn more.", time: "5 days ago", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
          { author: "Rohan Mehta", initials: "RM", text: "The material palette is incredible. Perfect blend of modern and vernacular.", time: "1 week ago", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
        ],
      },
      {
        id: 2, title: "Green Office Campus — TechPark", category: "Commercial", date: "Aug 2025", likes: 276, views: 3910, comments: 19,
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        description: "A 2,00,000 sq.ft. net-zero office campus in Whitefield, Bengaluru for a leading tech company. Features a living green facade, rainwater harvesting system processing 5 lakh litres/month, and rooftop solar installation generating 60% of the building's energy needs.",
        materials: ["Green Facade System", "Solar PV Panels", "Fly Ash Bricks", "Low VOC Paints", "Recycled Steel"],
        mockComments: [
          { author: "Sneha Kulkarni", initials: "SK", text: "The BIM coordination on this must have been complex. Great execution!", time: "2 weeks ago", gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
          { author: "Arjun Reddy", initials: "AR", text: "Loved the MEP integration with the green facade. We should collaborate!", time: "2 weeks ago", gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
        ],
      },
      {
        id: 3, title: "Adaptive Reuse — Old Textile Mill", category: "Adaptive Reuse", date: "May 2025", likes: 518, views: 7230, comments: 45,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        description: "Conversion of a 1920s textile mill in Peenya Industrial Area into a co-working space and artisan market. Retained the original cast iron columns and truss structure while introducing a contemporary glass atrium. The project won the IIA Karnataka Chapter Award for Adaptive Reuse 2025.",
        materials: ["Exposed Brick", "Cast Iron (retained)", "Structural Glass", "Polished Concrete", "Corten Steel"],
        mockComments: [
          { author: "Kavitha Menon", initials: "KM", text: "The juxtaposition of old and new is beautifully handled. Inspiring work!", time: "1 month ago", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
          { author: "Rahul Deshmukh", initials: "RD", text: "This is the kind of adaptive reuse we need more of in Indian cities. Bravo!", time: "1 month ago", gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
          { author: "Deepa Iyer", initials: "DI", text: "How did you assess the structural integrity of the existing columns?", time: "1 month ago", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
        ],
      },
      {
        id: 4, title: "Farmhouse Retreat — Nandi Hills", category: "Residential", date: "Feb 2025", likes: 195, views: 2800, comments: 12,
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        description: "A weekend retreat nestled into the contours of Nandi Hills. The design uses rammed earth walls and a green roof that blends with the surrounding landscape. Solar-powered with an off-grid rainwater system.",
        materials: ["Rammed Earth", "Mangalore Tiles", "Kadapa Stone", "Bamboo", "Solar Panels"],
        mockComments: [
          { author: "Vikram Singh", initials: "VS", text: "Rammed earth done right. The texture is beautiful.", time: "2 months ago", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
        ],
      },
      {
        id: 5, title: "Community Library — Yelahanka", category: "Institutional", date: "Dec 2024", likes: 310, views: 4100, comments: 22,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        description: "A 3,500 sq.ft. community library designed for a Bengaluru NGO. The project was completed within a tight budget of Rs 35 lakh using ferrocement shells and compressed stabilised earth blocks. Features passive cooling with zero mechanical HVAC.",
        materials: ["Ferrocement", "CSEB", "Kota Stone", "Recycled Wood", "Jali Screens"],
        mockComments: [
          { author: "Priya Nair", initials: "PN", text: "The passive cooling strategy is genius. What are the indoor temps in summer?", time: "4 months ago", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
          { author: "Rohan Mehta", initials: "RM", text: "Love the reading nooks. Such a thoughtful design for the community.", time: "4 months ago", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
        ],
      },
      {
        id: 6, title: "Yoga Studio & Wellness Centre", category: "Commercial", date: "Sep 2024", likes: 178, views: 2340, comments: 9,
        gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        description: "A serene wellness space in Indiranagar, Bengaluru designed around natural light and ventilation. Lime-plastered walls, terrazzo flooring, and large pivoting wooden screens create a meditative atmosphere.",
        materials: ["Lime Plaster", "Terrazzo", "Teak Screens", "Jute Acoustic Panels", "Natural Stone"],
        mockComments: [
          { author: "Meera Kapoor", initials: "MK", text: "The materiality is so calming. Perfect for the purpose.", time: "6 months ago", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
        ],
      },
    ],
    activity: [
      { id: 1, type: "project", description: "Posted a new project: Lakeside Villa Residence", time: "2 days ago" },
      { id: 2, type: "comment", description: "Commented on Vikram Singh's Heritage Hotel Restoration", time: "4 days ago" },
      { id: 3, type: "like", description: "Liked Meera Kapoor's Boutique Caf\u00e9 Interiors", time: "5 days ago" },
      { id: 4, type: "share", description: "Shared an article: 'Passive Cooling in Tropical Climates'", time: "1 week ago" },
      { id: 5, type: "connect", description: "Connected with Deepa Iyer", time: "1 week ago" },
      { id: 6, type: "project", description: "Updated project: Green Office Campus", time: "2 weeks ago" },
      { id: 7, type: "comment", description: "Replied to Sneha Kulkarni on BIM coordination workflow", time: "2 weeks ago" },
      { id: 8, type: "like", description: "Liked Rahul Deshmukh's thesis project on modular housing", time: "3 weeks ago" },
    ],
    similarPros: [
      { name: "Vikram Singh", slug: "vikram-singh", initials: "VS", specialty: "Heritage Conservation", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
      { name: "Priya Nair", slug: "priya-nair", initials: "PN", specialty: "Landscape Architecture", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
      { name: "Sneha Kulkarni", slug: "sneha-kulkarni", initials: "SK", specialty: "BIM Specialist", gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
    ],
    sharedConnections: 12,
  },
  {
    slug: "rohan-mehta",
    name: "Rohan Mehta",
    initials: "RM",
    headline: "Interior Designer | Hospitality & Luxury Residential | 12 Years Experience",
    type: "Interior Designer",
    location: "Mumbai, Maharashtra",
    memberSince: "January 2023",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    projects: 31,
    followers: 2180,
    following: 412,
    views: 26750,
    bio: "Interior designer specializing in luxury hospitality and high-end residential projects. My work bridges contemporary Indian aesthetics with global design sensibilities. Studio founder at FORM Interiors, Mumbai. Published in Elle Decor India, AD India, and Platform Magazine. Finalist, IIID Anchor Award 2024.",
    skills: ["SketchUp", "V-Ray", "AutoCAD", "3ds Max", "FF&E", "Material Sourcing", "Color Theory", "Space Planning", "Lighting Design", "Adobe InDesign", "Procurement"],
    experience: [
      { role: "Founder & Principal Designer", company: "FORM Interiors, Mumbai", duration: "2020 - Present" },
      { role: "Senior Interior Designer", company: "SJK Architects, Mumbai", duration: "2016 - 2020" },
    ],
    education: [
      { degree: "B.Des (Interior Design)", institution: "Rachana Sansad, Mumbai", year: "2013" },
    ],
    certifications: ["IIID Professional Member", "WELL AP (Building Standard)"],
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    socials: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Instagram", url: "#" },
      { platform: "Website", url: "#" },
    ],
    portfolio: [
      {
        id: 1, title: "Minimalist Studio Apartment — Worli", category: "Residential", date: "Oct 2025", likes: 518, views: 7230, comments: 45,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        description: "A 1,800 sq.ft. apartment in Worli transformed into a serene Japanese-inspired minimalist living space. Custom-made furniture from Indian walnut, hand-troweled lime plaster walls, and concealed storage throughout. The entire palette uses only 4 materials.",
        materials: ["Indian Walnut", "Lime Plaster", "Italian Marble", "Brushed Brass", "Linen"],
        mockComments: [
          { author: "Ananya Sharma", initials: "AS", text: "The restraint in material selection is what makes this so powerful. Beautiful.", time: "1 week ago", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
          { author: "Meera Kapoor", initials: "MK", text: "That walnut joinery detail is incredible. Where did you source it?", time: "2 weeks ago", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
          { author: "Kavitha Menon", initials: "KM", text: "The indoor planting strategy integrates so well with the interiors.", time: "2 weeks ago", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
        ],
      },
      {
        id: 2, title: "Boutique Hotel Lobby — Goa", category: "Hospitality", date: "Jul 2025", likes: 421, views: 5890, comments: 33,
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        description: "Lobby and lounge design for a 45-key boutique hotel in Assagao, Goa. Inspired by Portuguese-Goan heritage with a contemporary twist. Features handmade Athangudi tiles, local laterite stone, and custom cane furniture from Assam artisans.",
        materials: ["Athangudi Tiles", "Laterite Stone", "Cane & Rattan", "Terracotta", "Handloom Textiles"],
        mockComments: [
          { author: "Vikram Singh", initials: "VS", text: "The tile work is phenomenal. Athangudi tiles in a hotel lobby — brave and beautiful choice.", time: "3 weeks ago", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
          { author: "Deepa Iyer", initials: "DI", text: "How do the laterite walls perform with Goa's humidity?", time: "1 month ago", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
        ],
      },
      {
        id: 3, title: "Penthouse — Bandra West", category: "Residential", date: "Apr 2025", likes: 367, views: 4980, comments: 27,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        description: "A 3,600 sq.ft. duplex penthouse with panoramic sea views. The design concept 'Horizon' uses a gradient material palette that transitions from warm tones at the entrance to cool coastal blues in the living areas.",
        materials: ["Statuario Marble", "Teak", "Tinted Glass", "Suede Panels", "Burnished Copper"],
        mockComments: [
          { author: "Ananya Sharma", initials: "AS", text: "The gradient material concept is genius. The spatial flow is seamless.", time: "2 months ago", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
        ],
      },
      {
        id: 4, title: "Restaurant — Banjara Hills", category: "Hospitality", date: "Jan 2025", likes: 289, views: 3670, comments: 18,
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        description: "A 2,200 sq.ft. fine-dining restaurant in Hyderabad celebrating Deccan heritage. Nizam-era arches reinterpreted in contemporary form with bidriware-inspired metalwork and indigo-dyed fabric panels.",
        materials: ["Bidriware Metal", "Indigo Textiles", "Black Granite", "Fluted Glass", "Dhokra Brass"],
        mockComments: [
          { author: "Arjun Reddy", initials: "AR", text: "The lighting design elevates the entire space. Masterful.", time: "3 months ago", gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
        ],
      },
      {
        id: 5, title: "Co-working Space — Lower Parel", category: "Commercial", date: "Oct 2024", likes: 234, views: 3120, comments: 15,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        description: "A 12,000 sq.ft. co-working space designed for a creative agency. The concept 'Workshop' uses raw industrial materials — exposed concrete, perforated metal, and plywood — with pops of terracotta and green.",
        materials: ["Exposed Concrete", "Perforated Metal", "Marine Plywood", "Terracotta Planters", "Acoustic Felt"],
        mockComments: [
          { author: "Sneha Kulkarni", initials: "SK", text: "Great use of budget-friendly materials without compromising on aesthetics.", time: "5 months ago", gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
        ],
      },
      {
        id: 6, title: "Private Art Gallery — Juhu", category: "Cultural", date: "Jul 2024", likes: 198, views: 2560, comments: 11,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        description: "A 1,400 sq.ft. private gallery in a Juhu bungalow. Minimal intervention — white lime-washed walls, polished Kota stone flooring, and a carefully designed track lighting system. The architecture disappears to let the art speak.",
        materials: ["Lime Wash", "Kota Stone", "Track Lighting", "White Oak", "Linen Panels"],
        mockComments: [
          { author: "Rohan Mehta", initials: "RM", text: "Sometimes the best design is knowing when to step back. Proud of this one.", time: "8 months ago", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
        ],
      },
    ],
    activity: [
      { id: 1, type: "project", description: "Posted a new project: Minimalist Studio Apartment", time: "3 days ago" },
      { id: 2, type: "like", description: "Liked Ananya Sharma's Lakeside Villa Residence", time: "4 days ago" },
      { id: 3, type: "share", description: "Shared: 'Japandi Design in Indian Homes — A Guide'", time: "6 days ago" },
      { id: 4, type: "comment", description: "Commented on Kavitha Menon's terrace garden project", time: "1 week ago" },
      { id: 5, type: "connect", description: "Connected with Rahul Deshmukh", time: "1 week ago" },
      { id: 6, type: "project", description: "Updated project: Boutique Hotel Lobby", time: "2 weeks ago" },
      { id: 7, type: "like", description: "Liked Vikram Singh's Heritage Hotel Restoration", time: "3 weeks ago" },
      { id: 8, type: "comment", description: "Replied to Deepa Iyer on waterproofing discussion", time: "3 weeks ago" },
    ],
    similarPros: [
      { name: "Meera Kapoor", slug: "meera-kapoor", initials: "MK", specialty: "Interior Design", gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)" },
      { name: "Ananya Sharma", slug: "ananya-sharma", initials: "AS", specialty: "Architecture", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
      { name: "Kavitha Menon", slug: "kavitha-menon", initials: "KM", specialty: "Landscape Architecture", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    ],
    sharedConnections: 8,
  },
];

/* ── helpers ────────────────────────────────────────────────── */

const categoryColors: Record<string, { color: string; bg: string }> = {
  Residential: { color: "#667eea", bg: "rgba(102,126,234,0.12)" },
  Commercial: { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  Hospitality: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  "Adaptive Reuse": { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  Institutional: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  Cultural: { color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
};

function getSocialIcon(platform: string) {
  switch (platform) {
    case "LinkedIn": return Linkedin;
    case "Instagram": return Instagram;
    case "Website": return Globe;
    case "Behance": return PenTool;
    default: return Globe;
  }
}

function getActivityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "project": return FolderOpen;
    case "comment": return MessageSquare;
    case "like": return Heart;
    case "share": return Share2;
    case "connect": return UserPlus;
  }
}

/* ── component ──────────────────────────────────────────────── */

export function ProfessionalProfilePage() {
  const { userSlug } = useParams<{ userSlug: string }>();
  const profile = PROFILES.find((p) => p.slug === userSlug) || PROFILES[0];

  const [activeTab, setActiveTab] = useState<"work" | "about" | "activity">("work");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  const TABS = [
    { id: "work" as const, label: "Work", count: profile.portfolio.length },
    { id: "about" as const, label: "About" },
    { id: "activity" as const, label: "Activity", count: profile.activity.length },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* ── Profile Header ──────────────────────────────────── */}
      <section className="px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* back nav */}
          <Link to="/professionals" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:gap-2.5 transition-all" style={{ color: "var(--accent)" }}>
            <ArrowLeft size={16} /> Back to Community
          </Link>

          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto sm:mx-0" style={{ background: profile.gradient }}>
                  {profile.initials}
                </div>
              </div>

              {/* info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{profile.name}</h1>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold self-center sm:self-auto" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                    {profile.type}
                  </span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 4 }}>{profile.headline}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {profile.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={13} /> Member since {profile.memberSince}</span>
                </div>

                {/* action buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-5">
                  <button className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                    <UserPlus size={15} /> Connect
                  </button>
                  <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                    <Mail size={15} /> Message
                  </button>
                  <button className="btn-secondary px-3 py-2 rounded-lg text-sm" title="Share profile">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              {[
                { value: profile.projects, label: "Projects" },
                { value: profile.followers.toLocaleString(), label: "Followers" },
                { value: profile.following, label: "Following" },
                { value: profile.views.toLocaleString(), label: "Views" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation + Content ───────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto" style={{ borderBottom: "2px solid rgba(0,0,0,0.06)" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setExpandedProject(null); }}
                className="px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative"
                style={{
                  color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                  borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
                  marginBottom: -2,
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: activeTab === tab.id ? "var(--accent-light)" : "rgba(0,0,0,0.05)", fontSize: "0.68rem" }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* main content */}
            <div className="flex-1 min-w-0">

              {/* ── Work Tab ─────────────────────────────────── */}
              {activeTab === "work" && (
                <div>
                  {expandedProject !== null ? (
                    /* expanded project detail */
                    (() => {
                      const project = profile.portfolio.find((p) => p.id === expandedProject);
                      if (!project) return null;
                      return (
                        <div className="glass-card rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setExpandedProject(null)}
                            className="flex items-center gap-1.5 text-sm font-medium px-6 pt-5"
                            style={{ color: "var(--accent)" }}
                          >
                            <ArrowLeft size={14} /> Back to portfolio
                          </button>
                          {/* large image */}
                          <div className="mx-6 mt-4 rounded-xl overflow-hidden" style={{ background: project.gradient, height: 320 }} />
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: categoryColors[project.category]?.color ?? "#667eea", background: categoryColors[project.category]?.bg ?? "rgba(102,126,234,0.12)" }}>
                                  {project.category}
                                </span>
                                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 8 }}>{project.title}</h2>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{project.date}</p>
                              </div>
                              <div className="flex items-center gap-4" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                <span className="flex items-center gap-1"><Heart size={14} /> {project.likes}</span>
                                <span className="flex items-center gap-1"><Eye size={14} /> {project.views.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><MessageCircle size={14} /> {project.comments}</span>
                              </div>
                            </div>
                            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: 16, lineHeight: 1.7 }}>{project.description}</p>

                            {/* materials */}
                            <div className="mt-6">
                              <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Materials Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.materials.map((m) => (
                                  <Link key={m} to="#" className="px-3 py-1.5 rounded-full text-xs font-medium hover-lift" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                                    {m}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* comments section */}
                            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                              <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                                Comments ({project.mockComments.length})
                              </h4>
                              <div className="flex flex-col gap-4">
                                {project.mockComments.map((c, i) => (
                                  <div key={i} className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: c.gradient }}>
                                      {c.initials}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.author}</span>
                                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{c.time}</span>
                                      </div>
                                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.5 }}>{c.text}</p>
                                      <div className="flex items-center gap-4 mt-2">
                                        <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                                          <ThumbsUp size={12} /> Like
                                        </button>
                                        <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                                          <MessageCircle size={12} /> Reply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* add comment */}
                              <div className="flex gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(0,0,0,0.06)", color: "var(--text-muted)" }}>
                                  You
                                </div>
                                <div className="flex-1 flex gap-2">
                                  <input className="gl-input flex-1 px-4 py-2 rounded-lg text-sm" placeholder="Add a comment..." />
                                  <button className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold">
                                    <Send size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* portfolio grid */
                    <>
                      <div className="columns-1 sm:columns-2 gap-5 space-y-5">
                        {profile.portfolio.map((p, i) => {
                          const heights = [240, 200, 260, 220, 200, 240];
                          return (
                            <button
                              key={p.id}
                              onClick={() => setExpandedProject(p.id)}
                              className="glass-card block break-inside-avoid overflow-hidden rounded-2xl group hover-lift text-left w-full"
                            >
                              <div
                                className="relative w-full flex items-end"
                                style={{ background: p.gradient, height: heights[i % heights.length] }}
                              >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <span className="text-white font-semibold text-sm px-4 py-2 rounded-lg" style={{ background: "var(--accent)" }}>View Details</span>
                                </div>
                                <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: categoryColors[p.category]?.color ?? "#667eea", background: categoryColors[p.category]?.bg ?? "rgba(102,126,234,0.12)" }}>
                                  {p.category}
                                </span>
                              </div>
                              <div className="p-4">
                                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{p.title}</h3>
                                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{p.date}</p>
                                <div className="flex items-center gap-4 mt-3" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                  <span className="flex items-center gap-1"><Heart size={12} /> {p.likes}</span>
                                  <span className="flex items-center gap-1"><Eye size={12} /> {p.views.toLocaleString()}</span>
                                  <span className="flex items-center gap-1"><MessageCircle size={12} /> {p.comments}</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-center mt-8">
                        <button className="btn-secondary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 mx-auto">
                          Load More <ChevronDown size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── About Tab ────────────────────────────────── */}
              {activeTab === "about" && (
                <div className="flex flex-col gap-6">
                  {/* bio */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>About</h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{profile.bio}</p>
                  </div>

                  {/* skills */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((s) => (
                        <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* experience */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                      <Briefcase size={18} style={{ color: "var(--accent)" }} /> Experience
                    </h3>
                    <div className="flex flex-col gap-5">
                      {profile.experience.map((exp, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i === 0 ? "var(--accent)" : "rgba(0,0,0,0.12)", marginTop: 4 }} />
                            {i < profile.experience.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(0,0,0,0.08)" }} />}
                          </div>
                          <div className="pb-2">
                            <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{exp.role}</h4>
                            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>{exp.company}</p>
                            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{exp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* education */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                      <GraduationCap size={18} style={{ color: "var(--accent)" }} /> Education
                    </h3>
                    <div className="flex flex-col gap-4">
                      {profile.education.map((ed, i) => (
                        <div key={i}>
                          <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>{ed.degree}</h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>{ed.institution}</p>
                          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{ed.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* certifications */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                      <BadgeCheck size={18} style={{ color: "var(--accent)" }} /> Certifications
                    </h3>
                    <div className="flex flex-col gap-2">
                      {profile.certifications.map((c, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* languages */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                      <Languages size={18} style={{ color: "var(--accent)" }} /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((l) => (
                        <span key={l} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* socials */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                      <Link2 size={18} style={{ color: "var(--accent)" }} /> Social Links
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.socials.map((s) => {
                        const Icon = getSocialIcon(s.platform);
                        return (
                          <a key={s.platform} href={s.url} className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                            <Icon size={16} /> {s.platform}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Activity Tab ─────────────────────────────── */}
              {activeTab === "activity" && (
                <div className="flex flex-col gap-3">
                  {profile.activity.map((item) => {
                    const Icon = getActivityIcon(item.type);
                    const iconColors: Record<string, string> = {
                      project: "#667eea", comment: "#10b981", like: "#ef4444", share: "#3b82f6", connect: "#f59e0b",
                    };
                    return (
                      <div key={item.id} className="glass-card rounded-xl p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${iconColors[item.type]}14` }}>
                          <Icon size={16} style={{ color: iconColors[item.type] }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{item.description}</p>
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, display: "block" }}>{item.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Sidebar (desktop) ──────────────────────────── */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
              {/* contact form */}
              <div className="glass-card rounded-2xl p-6">
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                  Connect with {profile.name.split(" ")[0]}
                </h3>
                {contactSent ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(16,185,129,0.12)" }}>
                      <Send size={20} style={{ color: "#10b981" }} />
                    </div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>Message Sent!</p>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>They'll get back to you soon</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                    <input
                      className="gl-input px-4 py-2.5 rounded-lg text-sm"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                    <input
                      className="gl-input px-4 py-2.5 rounded-lg text-sm"
                      placeholder="Email address"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                    <textarea
                      className="gl-input px-4 py-2.5 rounded-lg text-sm"
                      placeholder="Your message..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                    <button type="submit" className="btn-primary py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                      <Send size={14} /> Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* similar professionals */}
              <div className="glass-card rounded-2xl p-6">
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Similar Professionals</h3>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 12 }}>
                  {profile.sharedConnections} shared connections
                </p>
                <div className="flex flex-col gap-4">
                  {profile.similarPros.map((sp) => (
                    <Link key={sp.slug} to={`/professionals/${sp.slug}`} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: sp.gradient }}>
                        {sp.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="group-hover:underline" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{sp.name}</h4>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{sp.specialty}</p>
                      </div>
                      <ExternalLink size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
