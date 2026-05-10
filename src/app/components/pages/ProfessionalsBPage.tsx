import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  Search, Heart, MessageCircle, Share2, Bookmark, ChevronLeft, ChevronRight,
  FileText, Award, Download, Eye, Copy, Mail, Users, MapPin, Briefcase,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

/* ── Types ── */

type Tab = "feed" | "discover" | "people" | "pdf";

interface PhotoPost {
  kind: "photo";
  id: number;
  author: string;
  slug: string;
  initials: string;
  headline: string;
  gradient: string;
  time: string;
  caption: string;
  photos: { gradient: string; aspect: string }[];
  likes: number;
  comments: number;
}

interface PdfPost {
  kind: "pdf";
  id: number;
  author: string;
  slug: string;
  initials: string;
  headline: string;
  gradient: string;
  time: string;
  caption: string;
  pdfTitle: string;
  pdfSize: string;
  pdfPages: number;
  likes: number;
  comments: number;
}

interface TextPost {
  kind: "text";
  id: number;
  author: string;
  slug: string;
  initials: string;
  headline: string;
  gradient: string;
  time: string;
  text: string;
  photo: { gradient: string; aspect: string };
  likes: number;
  comments: number;
}

interface MilestonePost {
  kind: "milestone";
  id: number;
  author: string;
  slug: string;
  initials: string;
  headline: string;
  gradient: string;
  milestone: string;
  bgGradient: string;
}

type FeedPost = PhotoPost | PdfPost | TextPost | MilestonePost;

/* ── Data ── */

const FEED_POSTS: FeedPost[] = [
  {
    kind: "photo",
    id: 1,
    author: "Ananya Sharma",
    slug: "ananya-sharma",
    initials: "AS",
    headline: "Senior Architect · Bengaluru",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    time: "2h",
    caption: "Just wrapped up the Lakeside Villa project in Coorg. The double-height living space with full glazing towards the reservoir — that golden hour light is unreal. Swipe to see the progression from concept to completion.",
    photos: [
      { gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", aspect: "16/10" },
      { gradient: "linear-gradient(135deg, #0f3460 0%, #533483 100%)", aspect: "4/3" },
      { gradient: "linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)", aspect: "16/10" },
      { gradient: "linear-gradient(135deg, #533483 0%, #0f3460 100%)", aspect: "4/3" },
      { gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #533483 100%)", aspect: "16/10" },
    ],
    likes: 342,
    comments: 47,
  },
  {
    kind: "text",
    id: 2,
    author: "Deepa Iyer",
    slug: "deepa-iyer",
    initials: "DI",
    headline: "Structural Engineer · Chennai",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    time: "4h",
    text: "Anyone else noticing the shift in how developers approach seismic design after the updated NBC 2016 guidelines? We just completed a performance-based design for a 22-storey residential tower in Chennai — used response spectrum analysis with site-specific ground motion. The additional cost was only 3% but the safety margin improvement was dramatic. Would love to hear how others are handling this in high-seismicity zones.",
    photo: { gradient: "linear-gradient(135deg, #373B44 0%, #4286f4 100%)", aspect: "16/9" },
    likes: 89,
    comments: 34,
  },
  {
    kind: "pdf",
    id: 3,
    author: "Vikram Singh",
    slug: "vikram-singh",
    initials: "VS",
    headline: "Principal Architect · Jaipur",
    gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    time: "6h",
    caption: "Sharing the sustainable materials guide I compiled after 15 years of heritage conservation work. Covers natural lime plasters, traditional stone masonry specs, and modern equivalents. Free to download.",
    pdfTitle: "Sustainable Materials Guide 2026.pdf",
    pdfSize: "4.2 MB",
    pdfPages: 38,
    likes: 215,
    comments: 52,
  },
  {
    kind: "photo",
    id: 4,
    author: "Rohan Mehta",
    slug: "rohan-mehta",
    initials: "RM",
    headline: "Interior Designer · Mumbai",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    time: "8h",
    caption: "Completed the Japandi-inspired apartment in Bandra. Mixed Japanese minimalism with Indian craftsmanship — Channapatna wooden accents, Khadi upholstery, and handmade Athangudi tiles. The client wanted warmth without clutter.",
    photos: [
      { gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)", aspect: "4/3" },
      { gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", aspect: "16/10" },
      { gradient: "linear-gradient(135deg, #38ef7d 0%, #2d1b69 100%)", aspect: "4/3" },
    ],
    likes: 518,
    comments: 63,
  },
  {
    kind: "milestone",
    id: 5,
    author: "Meera Kapoor",
    slug: "meera-kapoor",
    initials: "MK",
    headline: "Interior Designer · Delhi NCR",
    gradient: "linear-gradient(135deg, #f5576c, #ff6a3d)",
    milestone: "Meera Kapoor completed 50 projects!",
    bgGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    kind: "text",
    id: 6,
    author: "Kavitha Menon",
    slug: "kavitha-menon",
    initials: "KM",
    headline: "Landscape Architect · Kochi",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    time: "1d",
    text: "Just published our research on urban heat island mitigation through strategic tree planting in Kochi. We mapped canopy coverage across 12 neighbourhoods and found that increasing tree cover by just 15% can reduce surface temperature by 2.8°C. The city corporation is now using our recommendations for their new green corridor plan along Marine Drive.",
    photo: { gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)", aspect: "3/2" },
    likes: 176,
    comments: 28,
  },
  {
    kind: "photo",
    id: 7,
    author: "Siddharth Joshi",
    slug: "siddharth-joshi",
    initials: "SJ",
    headline: "Architect · Ahmedabad",
    gradient: "linear-gradient(135deg, #0f2027, #2c5364)",
    time: "1d",
    caption: "Eco-Resort masterplan in Wayanad is finally taking shape. 14 treehouse units, a central pavilion using rammed earth, and an infinity pool that merges with the valley. Construction 60% done — monsoon-proof detailing was the biggest challenge.",
    photos: [
      { gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", aspect: "16/10" },
      { gradient: "linear-gradient(135deg, #2c5364 0%, #203a43 100%)", aspect: "4/3" },
      { gradient: "linear-gradient(135deg, #203a43 0%, #0f2027 100%)", aspect: "16/10" },
      { gradient: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)", aspect: "4/3" },
    ],
    likes: 395,
    comments: 41,
  },
  {
    kind: "pdf",
    id: 8,
    author: "Sneha Kulkarni",
    slug: "sneha-kulkarni",
    initials: "SK",
    headline: "BIM Specialist · Pune",
    gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    time: "2d",
    caption: "Our firm just released the BIM Execution Plan template we use for all projects. Covers LOD requirements, clash detection workflows, and model handover protocols. Hope it helps standardize workflows for smaller firms too.",
    pdfTitle: "BIM Execution Plan Template.pdf",
    pdfSize: "2.8 MB",
    pdfPages: 24,
    likes: 143,
    comments: 38,
  },
];

const DISCOVER_ITEMS = [
  { id: 1, title: "Lakeside Villa", creator: "Ananya Sharma", likes: 342, gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)" },
  { id: 2, title: "Japandi Apartment", creator: "Rohan Mehta", likes: 518, gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)" },
  { id: 3, title: "Green Office Campus", creator: "Priya Nair", likes: 276, gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)" },
  { id: 4, title: "Heritage Hotel Jaipur", creator: "Vikram Singh", likes: 623, gradient: "linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)" },
  { id: 5, title: "Seismic Retrofit — IT Park", creator: "Deepa Iyer", likes: 189, gradient: "linear-gradient(135deg, #373B44 0%, #4286f4 100%)" },
  { id: 6, title: "Boutique Café", creator: "Meera Kapoor", likes: 487, gradient: "linear-gradient(135deg, #e44d26 0%, #ffd700 100%)" },
  { id: 7, title: "Eco-Resort Masterplan", creator: "Siddharth Joshi", likes: 395, gradient: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)" },
  { id: 8, title: "Smart HVAC System", creator: "Arjun Reddy", likes: 154, gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)" },
  { id: 9, title: "Modular Housing Thesis", creator: "Rahul Deshmukh", likes: 214, gradient: "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)" },
  { id: 10, title: "Penthouse Terrace Garden", creator: "Kavitha Menon", likes: 331, gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
  { id: 11, title: "School Library Interiors", creator: "Sneha Kulkarni", likes: 267, gradient: "linear-gradient(135deg, #834d9b 0%, #d04ed6 100%)" },
  { id: 12, title: "Textile Mill Adaptive Reuse", creator: "Ananya Sharma", likes: 412, gradient: "linear-gradient(135deg, #536976 0%, #292E49 100%)" },
  { id: 13, title: "Co-working Space Interiors", creator: "Rohan Mehta", likes: 298, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: 14, title: "Temple Town Masterplan", creator: "Vikram Singh", likes: 445, gradient: "linear-gradient(135deg, #c94b4b 0%, #e44d26 100%)" },
  { id: 15, title: "Bioswale Park Design", creator: "Kavitha Menon", likes: 192, gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { id: 16, title: "Warehouse Loft Conversion", creator: "Meera Kapoor", likes: 376, gradient: "linear-gradient(135deg, #f5576c 0%, #ff6a3d 100%)" },
];

const PEOPLE_DATA = [
  { name: "Ananya Sharma", slug: "ananya-sharma", initials: "AS", title: "Senior Architect", loc: "Bengaluru", projects: 24, followers: 1340, gradient: "linear-gradient(135deg, #667eea, #764ba2)", skills: ["Sustainability", "Revit", "LEED"] },
  { name: "Rohan Mehta", slug: "rohan-mehta", initials: "RM", title: "Interior Designer", loc: "Mumbai", projects: 31, followers: 2180, gradient: "linear-gradient(135deg, #f093fb, #f5576c)", skills: ["Hospitality", "FF&E", "V-Ray"] },
  { name: "Vikram Singh", slug: "vikram-singh", initials: "VS", title: "Principal Architect", loc: "Jaipur", projects: 37, followers: 3200, gradient: "linear-gradient(135deg, #89f7fe, #66a6ff)", skills: ["Heritage", "Conservation", "Documentation"] },
  { name: "Deepa Iyer", slug: "deepa-iyer", initials: "DI", title: "Structural Engineer", loc: "Chennai", projects: 18, followers: 870, gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", skills: ["High-Rise", "Seismic", "ETABS"] },
  { name: "Meera Kapoor", slug: "meera-kapoor", initials: "MK", title: "Interior Designer", loc: "Delhi NCR", projects: 26, followers: 1890, gradient: "linear-gradient(135deg, #f5576c, #ff6a3d)", skills: ["Residential", "Japandi", "Art Curation"] },
  { name: "Kavitha Menon", slug: "kavitha-menon", initials: "KM", title: "Landscape Architect", loc: "Kochi", projects: 22, followers: 1120, gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", skills: ["Urban Green", "Planting", "Sustainability"] },
  { name: "Sneha Kulkarni", slug: "sneha-kulkarni", initials: "SK", title: "BIM Specialist", loc: "Pune", projects: 19, followers: 950, gradient: "linear-gradient(135deg, #ffecd2, #fcb69f)", skills: ["Revit", "Navisworks", "Dynamo"] },
  { name: "Rahul Deshmukh", slug: "rahul-deshmukh", initials: "RD", title: "Architecture Student", loc: "Trichy", projects: 8, followers: 320, gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)", skills: ["Rhino", "Grasshopper", "Parametric"] },
];

const PDF_LIBRARY = [
  { id: 1, title: "IS 456:2000 - Plain & Reinforced Concrete", author: "Bureau of Indian Standards", category: "Standards", pages: 114, downloads: 12400, date: "2024", icon: "#4facfe" },
  { id: 2, title: "IGBC Green Homes Rating Manual", author: "Indian Green Building Council", category: "Standards", pages: 86, downloads: 8200, date: "2025", icon: "#43e97b" },
  { id: 3, title: "Interior Specification BOQ Template", author: "Rohan Mehta", category: "Templates", pages: 32, downloads: 3400, date: "2026", icon: "#f5576c" },
  { id: 4, title: "Seismic Design of Buildings - NBC 2016", author: "Bureau of Indian Standards", category: "Standards", pages: 156, downloads: 9800, date: "2023", icon: "#667eea" },
  { id: 5, title: "Vastu-compliant Floor Plan Guide", author: "Vikram Singh", category: "Case Studies", pages: 48, downloads: 5600, date: "2025", icon: "#89f7fe" },
  { id: 6, title: "BIM Execution Plan Template", author: "Sneha Kulkarni", category: "Templates", pages: 24, downloads: 4100, date: "2026", icon: "#ffecd2" },
];

/* ── Sub-components ── */

function Avatar({ initials, gradient, size = 40 }: { initials: string; gradient: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ background: gradient, width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function ShareDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const items = [
    { label: "Copy Link", icon: Copy },
    { label: "WhatsApp", icon: MessageCircle },
    { label: "LinkedIn", icon: Share2 },
    { label: "Twitter", icon: Share2 },
    { label: "Email", icon: Mail },
  ];
  return (
    <div className="absolute right-0 bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 w-44">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <item.icon size={14} />
          {item.label}
        </button>
      ))}
    </div>
  );
}

function EngagementBar({
  postId,
  likes,
  comments,
  liked,
  bookmarked,
  onLike,
  onBookmark,
  shareOpen,
  onShareToggle,
  onShareClose,
}: {
  postId: number;
  likes: number;
  comments: number;
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  shareOpen: boolean;
  onShareToggle: () => void;
  onShareClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center gap-5">
        <button onClick={onLike} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
          <Heart size={18} className={liked ? "fill-red-500 text-red-500" : ""} />
          <span>{liked ? likes + 1 : likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <MessageCircle size={18} />
          <span>{comments}</span>
        </button>
        <div className="relative">
          <button onClick={onShareToggle} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <Share2 size={18} />
          </button>
          <ShareDropdown open={shareOpen} onClose={onShareClose} />
        </div>
      </div>
      <button onClick={onBookmark} className="text-gray-400 hover:text-gray-800 transition-colors">
        <Bookmark size={18} className={bookmarked ? "fill-gray-800 text-gray-800" : ""} />
      </button>
    </div>
  );
}

function AuthorRow({ initials, gradient, author, slug, headline, time }: {
  initials: string; gradient: string; author: string; slug: string; headline: string; time: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Avatar initials={initials} gradient={gradient} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link to={`/professionals/${slug}`} className="font-semibold text-[#1a1a1a] hover:underline text-[15px] truncate">
            {author}
          </Link>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{headline}</p>
      </div>
    </div>
  );
}

function PhotoCarousel({ photos, postId }: { photos: { gradient: string; aspect: string }[]; postId: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = photos.length;

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const childWidth = (container.children[0] as HTMLElement)?.offsetWidth || 1;
    const idx = Math.round(scrollLeft / childWidth);
    setCurrentIndex(Math.min(idx, total - 1));
  };

  return (
    <div className="relative group mb-1">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2 rounded-xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((photo, i) => (
          <div
            key={`${postId}-photo-${i}`}
            className="snap-center shrink-0 rounded-xl"
            style={{
              background: photo.gradient,
              aspectRatio: photo.aspect,
              width: "100%",
              minWidth: "100%",
            }}
          />
        ))}
      </div>
      {/* Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => scrollTo(currentIndex - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {currentIndex < total - 1 && (
        <button
          onClick={() => scrollTo(currentIndex + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={16} />
        </button>
      )}
      {/* Counter */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
        {currentIndex + 1}/{total}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */

export function ProfessionalsBPage() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
  const [shareOpenId, setShareOpenId] = useState<number | null>(null);
  const [congratulated, setCongratulated] = useState<Set<number>>(new Set());
  const [followedPeople, setFollowedPeople] = useState<Set<string>>(new Set());
  const [likedDiscover, setLikedDiscover] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleFollow = (slug: string) => {
    setFollowedPeople((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "feed", label: "Feed" },
    { key: "discover", label: "Discover" },
    { key: "people", label: "People" },
    { key: "pdf", label: "PDF Library" },
  ];

  /* ── Render Feed Post ── */

  const renderPost = (post: FeedPost) => {
    if (post.kind === "milestone") {
      const isCongratulated = congratulated.has(post.id);
      return (
        <div key={post.id} className="py-5 border-b border-gray-100">
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: post.bgGradient }}
          >
            <Award size={32} className="mx-auto mb-3 text-amber-600" />
            <p className="font-semibold text-[#1a1a1a] text-lg mb-1">{post.milestone}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Avatar initials={post.initials} gradient={post.gradient} size={24} />
              <Link to={`/professionals/${post.slug}`} className="text-sm text-gray-600 hover:underline">
                {post.author}
              </Link>
            </div>
            <button
              onClick={() => {
                setCongratulated((prev) => {
                  const next = new Set(prev);
                  next.add(post.id);
                  return next;
                });
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                isCongratulated
                  ? "bg-white/80 text-gray-500 cursor-default"
                  : "bg-[#1a1a1a] text-white hover:bg-[#333]"
              }`}
            >
              {isCongratulated ? "Congratulated!" : "Congratulate"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={post.id} className="py-5 border-b border-gray-100">
        <AuthorRow
          initials={post.initials}
          gradient={post.gradient}
          author={post.author}
          slug={post.slug}
          headline={post.headline}
          time={post.time}
        />

        {post.kind === "photo" && (
          <>
            <p className="text-[15px] text-gray-800 leading-relaxed mb-3">{post.caption}</p>
            <PhotoCarousel photos={post.photos} postId={post.id} />
          </>
        )}

        {post.kind === "text" && (
          <>
            <p className="text-[15px] text-gray-800 leading-relaxed mb-3">{post.text}</p>
            <div
              className="rounded-xl mb-1"
              style={{
                background: post.photo.gradient,
                aspectRatio: post.photo.aspect,
                width: "100%",
              }}
            />
          </>
        )}

        {post.kind === "pdf" && (
          <>
            <p className="text-[15px] text-gray-800 leading-relaxed mb-3">{post.caption}</p>
            <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 mb-1">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText size={24} className="text-white/80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{post.pdfTitle}</p>
                <p className="text-white/50 text-xs mt-0.5">{post.pdfSize} · {post.pdfPages} pages</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 transition-colors">
                  Preview
                </button>
                <button className="px-3 py-1.5 bg-white text-[#1a1a1a] text-xs rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </>
        )}

        {post.kind !== "milestone" && (
          <EngagementBar
            postId={post.id}
            likes={post.likes}
            comments={post.comments}
            liked={likedPosts.has(post.id)}
            bookmarked={bookmarkedPosts.has(post.id)}
            onLike={() => toggleLike(post.id)}
            onBookmark={() => toggleBookmark(post.id)}
            shareOpen={shareOpenId === post.id}
            onShareToggle={() => setShareOpenId(shareOpenId === post.id ? null : post.id)}
            onShareClose={() => setShareOpenId(null)}
          />
        )}
      </div>
    );
  };

  /* ── Views ── */

  const renderFeed = () => (
    <div className="max-w-[720px] mx-auto px-4">
      {FEED_POSTS.map(renderPost)}
    </div>
  );

  const renderDiscover = () => (
    <div className="max-w-5xl mx-auto px-4">
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {DISCOVER_ITEMS.map((item) => {
          const isLiked = likedDiscover.has(item.id);
          return (
            <div
              key={item.id}
              className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <div
                className="w-full"
                style={{
                  background: item.gradient,
                  aspectRatio: item.id % 3 === 0 ? "3/4" : item.id % 2 === 0 ? "4/5" : "1/1",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                <p className="text-white/70 text-xs">{item.creator}</p>
              </div>
              <button
                onClick={() => {
                  setLikedDiscover((prev) => {
                    const next = new Set(prev);
                    next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                    return next;
                  });
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-1.5"
              >
                <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPeople = () => (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PEOPLE_DATA.map((person) => {
          const isFollowed = followedPeople.has(person.slug);
          return (
            <div key={person.slug} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={person.initials} gradient={person.gradient} size={48} />
                <div className="min-w-0">
                  <Link to={`/professionals/${person.slug}`} className="font-semibold text-[#1a1a1a] hover:underline text-[15px] block truncate">
                    {person.name}
                  </Link>
                  <p className="text-xs text-gray-500">{person.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                <MapPin size={12} />
                <span>{person.loc}</span>
              </div>
              <div className="flex gap-4 mb-3 text-xs text-gray-500">
                <span><span className="font-semibold text-[#1a1a1a]">{person.followers.toLocaleString()}</span> followers</span>
                <span><span className="font-semibold text-[#1a1a1a]">{person.projects}</span> projects</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {person.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[11px]">
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => toggleFollow(person.slug)}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  isFollowed
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                }`}
              >
                {isFollowed ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPdfLibrary = () => {
    const categories = ["Standards", "Templates", "Case Studies", "Research Papers"];
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
              {cat}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PDF_LIBRARY.map((pdf) => (
            <div key={pdf.id} className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${pdf.icon}20` }}
              >
                <FileText size={22} style={{ color: pdf.icon }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1a1a1a] text-sm leading-snug mb-1 line-clamp-2">{pdf.title}</p>
                <p className="text-xs text-gray-400 mb-1">{pdf.author}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-500">{pdf.category}</span>
                  <span>{pdf.pages} pages</span>
                  <span className="flex items-center gap-0.5">
                    <Download size={10} />
                    {pdf.downloads.toLocaleString()}
                  </span>
                  <span>{pdf.date}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <Eye size={12} />
                    Preview
                  </button>
                  <button className="px-3 py-1.5 bg-[#1a1a1a] text-white text-xs rounded-lg hover:bg-[#333] transition-colors flex items-center gap-1">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f8f6" }}>
      <Navbar />

      {/* Tab Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? "text-[#1a1a1a]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#1a1a1a] rounded-full" />
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-48 h-8 px-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
                  autoFocus
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-gray-400 hover:text-gray-600">
                  <span className="text-xs">Esc</span>
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-gray-400 hover:text-gray-600 p-1">
                <Search size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-6">
        {activeTab === "feed" && renderFeed()}
        {activeTab === "discover" && renderDiscover()}
        {activeTab === "people" && renderPeople()}
        {activeTab === "pdf" && renderPdfLibrary()}
      </main>

      <Footer />
    </div>
  );
}
