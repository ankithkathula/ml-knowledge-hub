import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, Clock, Eye, Share2, Bookmark,
  Facebook, Twitter, Linkedin, Mail,
  ThumbsUp, MessageCircle, Play, Send, ChevronDown, ChevronUp, X,
} from "lucide-react";
import { AvatarImg } from "../ui/AvatarImg";

interface BlogContent {
  id: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  author: {
    name: string;
    title: string;
    avatarUrl: string;
    bio: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  views: number;
  likes: number;
  comments: number;
  content: Array<{
    type: "text" | "heading" | "image" | "video" | "quote";
    content: string;
    caption?: string;
    credit?: string;
  }>;
}

const ACCENT = "#ff6a3d";
const LINE = "1px solid rgba(0,0,0,0.1)";

const SAMPLE_BLOG: BlogContent = {
  id: "sustainable-concrete-innovations-2026",
  title: "Sustainable Concrete Innovations Transforming Modern Construction",
  subtitle: "How eco-friendly concrete solutions are reducing carbon footprint in mega projects",
  bannerImage: "https://picsum.photos/seed/concrete-build/1400/700",
  author: {
    name: "Ar. Priya Sharma",
    title: "Senior Structural Engineer & Sustainability Consultant",
    avatarUrl: "https://i.pravatar.cc/80?img=55",
    bio: "Priya Sharma is a licensed architect and structural engineer with over 15 years of experience in sustainable construction. She specialises in green building materials and has consulted on 200+ LEED certified projects across India and Southeast Asia.",
  },
  date: "28 Mar 2026",
  readTime: "8 min read",
  tags: ["Sustainability", "Concrete", "Green Building", "Innovation", "Carbon Neutral"],
  category: "Structural",
  views: 12450,
  likes: 342,
  comments: 28,
  content: [
    {
      type: "text",
      content: "The construction industry stands at a critical juncture. Concrete, the world's most widely used building material, is responsible for approximately 8% of global CO2 emissions. As urbanisation accelerates and infrastructure demands grow, the need for sustainable alternatives has never been more urgent.",
    },
    {
      type: "text",
      content: "In 2026, we're witnessing a revolutionary shift in how concrete is formulated, produced, and deployed. From carbon-negative mixes to recycled aggregate innovations, the industry is embracing technologies that not only reduce environmental impact but often improve structural performance.",
    },
    {
      type: "heading",
      content: "Carbon-Capture Concrete: A Game Changer",
    },
    {
      type: "text",
      content: "One of the most promising developments is carbon-capture concrete technology. Unlike traditional Portland cement, which releases CO2 during production, new formulations actually absorb atmospheric carbon dioxide as they cure. Companies like CarbonCure and Solidia Technologies have pioneered processes that inject captured CO2 into concrete mixes, permanently sequestering the gas while simultaneously improving compressive strength by up to 20%.",
    },
    {
      type: "image",
      content: "https://picsum.photos/seed/carbon-concrete/1200/600",
      caption: "Carbon-capture concrete being poured at a commercial construction site in Mumbai",
      credit: "Photo: Industrial Construction Review",
    },
    {
      type: "text",
      content: "In a recent project in Bangalore, we implemented carbon-capture concrete across 45,000 square metres of floor slabs. The results were remarkable: a 35% reduction in embodied carbon compared to conventional mixes, with no compromise in structural integrity. The project achieved a 15% cost premium initially, but lifecycle analysis revealed savings within 7 years due to enhanced durability and reduced maintenance.",
    },
    {
      type: "heading",
      content: "Recycled Aggregate: Circular Economy in Action",
    },
    {
      type: "text",
      content: "Construction and demolition waste constitutes nearly 40% of total waste in urban India. Recycled aggregate concrete (RAC) addresses this challenge by incorporating crushed concrete from demolished structures. Modern processing techniques now allow up to 100% replacement of natural aggregates in certain applications.",
    },
    {
      type: "quote",
      content: "We've successfully used 80% recycled aggregate in non-structural applications like pavements and partition walls. The key is rigorous quality control and proper mix design. When done right, RAC performs identically to virgin concrete while diverting thousands of tons from landfills.",
    },
    {
      type: "image",
      content: "https://picsum.photos/seed/recycled-aggregate/1200/600",
      caption: "Recycled concrete aggregate processing facility showing crushed material grading",
      credit: "Photo: Sustainable Materials Institute",
    },
    {
      type: "text",
      content: "Current regulations in several Indian states now mandate minimum recycled content in government projects. This policy push, combined with improving economics, is driving widespread adoption. We're seeing recycled aggregate prices drop to within 10–15% of virgin material costs in major metros.",
    },
    {
      type: "heading",
      content: "Geopolymer Concrete: The Portland Cement Alternative",
    },
    {
      type: "text",
      content: "Geopolymer concrete represents perhaps the most radical departure from traditional formulations. By replacing Portland cement entirely with industrial byproducts like fly ash and slag, geopolymers can reduce CO2 emissions by up to 90%. These materials also exhibit superior resistance to chemical attack, fire, and high temperatures.",
    },
    {
      type: "video",
      content: "https://www.youtube.com/watch?v=sample-geopolymer-demo",
      caption: "Time-lapse demonstration of geopolymer concrete curing and strength development over 28 days",
    },
    {
      type: "text",
      content: "The Australian construction sector has been at the forefront of geopolymer adoption, with several airports and infrastructure projects completed successfully. In India, pilot projects are underway in Chennai and Pune, focusing on precast elements and pavements where the technology's benefits are most pronounced.",
    },
    {
      type: "heading",
      content: "Implementation Challenges and Solutions",
    },
    {
      type: "text",
      content: "Despite tremendous potential, sustainable concrete faces adoption barriers. Supply chain logistics, contractor familiarity, and specification uncertainty remain challenges. However, these are surmountable with proper planning:",
    },
    {
      type: "text",
      content: "• Early Engagement: Involve materials suppliers and ready-mix plants during design development, not procurement\n\n• Performance Specifications: Specify outcomes (strength, durability) rather than prescriptive mixes to enable innovation\n\n• Pilot Testing: Start with non-critical elements to build team confidence and gather site-specific data\n\n• Lifecycle Costing: Evaluate materials on total cost of ownership, not just initial price\n\n• Documentation: Maintain detailed records to support future projects and code development",
    },
    {
      type: "image",
      content: "https://picsum.photos/seed/concrete-site-team/1200/600",
      caption: "Construction team reviewing sustainable concrete specifications on-site",
      credit: "Photo: BuildTech Magazine",
    },
    {
      type: "heading",
      content: "The Path Forward",
    },
    {
      type: "text",
      content: "The transition to sustainable concrete is not merely an environmental imperative — it's becoming an economic necessity. As carbon pricing mechanisms expand and green building certifications become market differentiators, early adopters will have competitive advantages.",
    },
    {
      type: "text",
      content: "For architects, engineers, and developers, the message is clear: sustainable concrete technologies are ready for mainstream deployment today. The industry has moved beyond experimentation into proven, scalable solutions. The question is no longer 'if' but 'how quickly' we can implement these innovations across our projects.",
    },
    {
      type: "quote",
      content: "In five years, specifying traditional high-carbon concrete when sustainable alternatives exist will be seen as professional negligence. The technology is here. The economics are favourable. The only missing ingredient is willingness to change.",
    },
    {
      type: "text",
      content: "As we look toward 2030 and India's ambitious net-zero targets, concrete innovation will play a pivotal role. The material that built our modern world is now being reimagined to sustain it. And that transformation is happening on construction sites today.",
    },
  ],
};

const RELATED: Array<{ id: string; title: string; category: string; imgUrl: string; author: string; authorImg: string; readTime: string }> = [
  {
    id: "smart-glass",
    title: "Smart Glass Technology: The Future of Building Envelopes",
    category: "Facade",
    imgUrl: "https://picsum.photos/seed/glass-facade/600/400",
    author: "Eng. Rajesh Kumar",
    authorImg: "https://i.pravatar.cc/80?img=66",
    readTime: "6 min",
  },
  {
    id: "hvac-vrf",
    title: "VRF vs Traditional Ducted HVAC: A 15-Project Analysis",
    category: "MEP",
    imgUrl: "https://picsum.photos/seed/hvac-system/600/400",
    author: "Ar. Sneha Patel",
    authorImg: "https://i.pravatar.cc/80?img=13",
    readTime: "10 min",
  },
  {
    id: "waterproofing-guide",
    title: "Complete Guide to Basement Waterproofing Solutions",
    category: "Structural",
    imgUrl: "https://picsum.photos/seed/basement-build/600/400",
    author: "Ar. Vikram Mehta",
    authorImg: "https://i.pravatar.cc/80?img=69",
    readTime: "11 min",
  },
];

interface Comment {
  id: string;
  author: string;
  authorImg: string;
  date: string;
  body: string;
  likes: number;
  replies?: Comment[];
}

const SEED_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Ar. Deepak Nair",
    authorImg: "https://i.pravatar.cc/80?img=11",
    date: "29 Mar 2026",
    body: "Excellent coverage of geopolymer concrete. We implemented fly-ash based mixes in a Chennai warehouse project last year — compressive strength was on par with M40 grade but curing time was notably longer in humid conditions. Would love to see a follow-up on tropical climate considerations.",
    likes: 14,
    replies: [
      {
        id: "c1r1",
        author: "Ar. Priya Sharma",
        authorImg: "https://i.pravatar.cc/80?img=55",
        date: "29 Mar 2026",
        body: "Great point, Deepak. Humidity is genuinely a challenge — alkaline activator dosage needs to be adjusted. I'm planning a follow-up specifically on monsoon-season performance data from the Pune pilot.",
        likes: 6,
      },
    ],
  },
  {
    id: "c2",
    author: "Eng. Kavitha Suresh",
    authorImg: "https://i.pravatar.cc/80?img=32",
    date: "30 Mar 2026",
    body: "The 35% embodied carbon reduction figure for the Bangalore project is impressive. Do you have an EPD (Environmental Product Declaration) that can be shared? We're compiling a benchmarking database for the India Green Building Council.",
    likes: 9,
  },
  {
    id: "c3",
    author: "Prof. Anand Krishnamurthy",
    authorImg: "https://i.pravatar.cc/80?img=52",
    date: "1 Apr 2026",
    body: "From an academic standpoint, the lifecycle costing methodology you mentioned is under-studied in Indian context. Most peer-reviewed studies use European pricing models which skew the economics. Happy to collaborate on a India-specific LCA framework if you're interested.",
    likes: 21,
    replies: [
      {
        id: "c3r1",
        author: "Ar. Vikram Mehta",
        authorImg: "https://i.pravatar.cc/80?img=69",
        date: "2 Apr 2026",
        body: "Professor, we ran into exactly this issue during a GRIHA rating submission. The default carbon factors in most tools are not calibrated for Indian grid mix or local supply chains.",
        likes: 8,
      },
    ],
  },
];

function CategoryLabel({ cat }: { cat: string }) {
  return (
    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em" }}>
      {cat}
    </span>
  );
}

export function BlogDetailPage() {
  const { blogId } = useParams<{ blogId: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const commentsRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [gateVisible, setGateVisible] = useState(false);
  const [gateDismissed, setGateDismissed] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    if (gateDismissed) return;
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolledThrough = (-top) / height;
      if (scrolledThrough >= 0.52) setGateVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [gateDismissed]);

  const blog = SAMPLE_BLOG;

  if (!blog) {
    return (
      <div className="min-h-screen" style={{ background: "#fafaf9" }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Article not found</h1>
          <Link to="/blog" style={{ color: ACCENT, fontSize: "0.9rem", fontWeight: 600 }}>← Back to Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#fafaf9" }}>

      {/* ── Editorial header ── */}
      <div className="max-w-5xl mx-auto px-6 pt-8">

        {/* Breadcrumb */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 mb-8"
          style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Insights
        </Link>

        {/* Category + title */}
        <div style={{ borderTop: LINE, paddingTop: 28 }}>
          <CategoryLabel cat={blog.category} />
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#1a1a1a",
              marginTop: 10,
              marginBottom: 16,
              maxWidth: "80%",
            }}
          >
            {blog.title}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.55, maxWidth: 680, marginBottom: 24 }}>
            {blog.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap" style={{ borderTop: LINE, paddingTop: 16, paddingBottom: 20 }}>
            <div className="flex items-center gap-2">
              <AvatarImg src={blog.author.avatarUrl} fallback={blog.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)} size={28} borderStyle="none" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a1a1a" }}>{blog.author.name}</span>
            </div>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.03em" }}>{blog.date}</span>
            <span className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
              <Clock className="w-3 h-3" /> {blog.readTime}
            </span>
            <span className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
              <Eye className="w-3 h-3" /> {(blog.views / 1000).toFixed(1)}k views
            </span>
            <div className="ml-auto flex flex-wrap gap-1.5">
              {blog.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full"
                  style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text-secondary)", border: LINE }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover image – full editorial width ── */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div style={{ borderTop: LINE }}>
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full"
            style={{ height: 480, objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* ── Body: sticky sidebar + article ── */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex gap-10 items-start">

          {/* Sticky action sidebar */}
          <div style={{ width: 44, flexShrink: 0, position: "sticky", top: 88 }}>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all"
                style={{ background: liked ? ACCENT : "white", border: LINE, color: liked ? "#fff" : "var(--text-muted)" }}
                title="Like"
              >
                <ThumbsUp className="w-4 h-4" style={{ fill: liked ? "#fff" : "none" }} />
              </button>
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600 }}>{blog.likes + (liked ? 1 : 0)}</span>

              <button
                onClick={() => commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "white", border: LINE, color: "var(--text-muted)" }}
                title="Comments"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600 }}>{comments.length}</span>

              <div className="relative mt-1">
                <button
                  onClick={() => setShowShare(!showShare)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "white", border: LINE, color: "var(--text-muted)" }}
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {showShare && (
                  <div className="absolute left-12 top-0 p-2 rounded-xl" style={{ background: "white", border: LINE, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", minWidth: 140, zIndex: 10 }}>
                    {[
                      { icon: <Facebook className="w-3.5 h-3.5" style={{ color: "#1877f2" }} />, label: "Facebook" },
                      { icon: <Twitter className="w-3.5 h-3.5" style={{ color: "#1da1f2" }} />, label: "Twitter" },
                      { icon: <Linkedin className="w-3.5 h-3.5" style={{ color: "#0a66c2" }} />, label: "LinkedIn" },
                      { icon: <Mail className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />, label: "Email" },
                    ].map(item => (
                      <button key={item.label} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ fontSize: "0.75rem", fontWeight: 500, color: "#1a1a1a" }}>
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="w-10 h-10 rounded-full flex items-center justify-center mt-1"
                style={{ background: bookmarked ? ACCENT : "white", border: LINE, color: bookmarked ? "#fff" : "var(--text-muted)" }}
                title="Bookmark"
              >
                <Bookmark className="w-4 h-4" style={{ fill: bookmarked ? "#fff" : "none" }} />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="flex-1 min-w-0">
            <article ref={articleRef} style={{ maxWidth: 680, position: "relative" }}>
              {blog.content.map((block, i) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2
                        key={i}
                        style={{
                          fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                          fontWeight: 800,
                          letterSpacing: "-0.025em",
                          color: "#1a1a1a",
                          marginTop: 52,
                          marginBottom: 18,
                          lineHeight: 1.2,
                          paddingTop: 24,
                          borderTop: LINE,
                        }}
                      >
                        {block.content}
                      </h2>
                    );

                  case "text":
                    return (
                      <p
                        key={i}
                        style={{ fontSize: "1.02rem", lineHeight: 1.85, color: "#2a2a2a", marginBottom: 22, whiteSpace: "pre-line" }}
                      >
                        {block.content}
                      </p>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={i}
                        style={{
                          borderLeft: `3px solid ${ACCENT}`,
                          paddingLeft: 24,
                          paddingTop: 4,
                          paddingBottom: 4,
                          margin: "36px 0",
                        }}
                      >
                        <p style={{ fontSize: "1.15rem", fontWeight: 500, fontStyle: "italic", lineHeight: 1.65, color: "#1a1a1a" }}>
                          "{block.content}"
                        </p>
                      </blockquote>
                    );

                  case "image":
                    return (
                      <figure key={i} style={{ margin: "40px 0" }}>
                        <img
                          src={block.content}
                          alt={block.caption || ""}
                          className="w-full"
                          style={{ display: "block", borderTop: LINE, borderBottom: LINE }}
                        />
                        {(block.caption || block.credit) && (
                          <figcaption style={{ paddingTop: 10 }}>
                            {block.caption && (
                              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{block.caption}</p>
                            )}
                            {block.credit && (
                              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2, fontStyle: "italic" }}>{block.credit}</p>
                            )}
                          </figcaption>
                        )}
                      </figure>
                    );

                  case "video":
                    return (
                      <figure key={i} style={{ margin: "40px 0" }}>
                        <div
                          className="relative flex items-center justify-center"
                          style={{ aspectRatio: "16/9", background: "#f0ede8", borderTop: LINE, borderBottom: LINE }}
                        >
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: ACCENT }}>
                              <Play className="w-6 h-6 text-white ml-0.5" />
                            </div>
                            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>Watch Video</p>
                          </div>
                        </div>
                        {block.caption && (
                          <figcaption style={{ paddingTop: 10 }}>
                            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{block.caption}</p>
                          </figcaption>
                        )}
                      </figure>
                    );

                  default:
                    return null;
                }
              })}

              {/* Fade-out overlay when gate is active */}
              {gateVisible && !gateDismissed && (
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 220,
                    background: "linear-gradient(to bottom, transparent, #fafaf9 72%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </article>

            {/* ── Author bio ── */}
            <div style={{ borderTop: LINE, marginTop: 56, paddingTop: 32 }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
                About the Author
              </p>
              <div className="flex gap-4 items-start">
                <AvatarImg src={blog.author.avatarUrl} fallback={blog.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)} size={52} borderStyle="none" style={{ borderRadius: "50%", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1a1a1a", marginBottom: 2 }}>{blog.author.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 10 }}>{blog.author.title}</p>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "#2a2a2a" }}>{blog.author.bio}</p>
                </div>
              </div>
            </div>

            {/* ── Comments ── */}
            <div ref={commentsRef} style={{ borderTop: LINE, marginTop: 56, paddingTop: 32 }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 24 }}>
                {comments.length} Comment{comments.length !== 1 ? "s" : ""}
              </p>

              {/* Comment input */}
              <div style={{ border: LINE, borderRadius: 12, padding: 20, background: "white", marginBottom: 32 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>Leave a comment</p>
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentName}
                  onChange={e => setCommentName(e.target.value)}
                  style={{
                    width: "100%", padding: "9px 12px", fontSize: "0.85rem",
                    border: LINE, borderRadius: 8, marginBottom: 10,
                    background: "#fafaf9", outline: "none", boxSizing: "border-box",
                  }}
                />
                <textarea
                  placeholder="Share your thoughts…"
                  value={commentBody}
                  onChange={e => setCommentBody(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%", padding: "9px 12px", fontSize: "0.85rem",
                    border: LINE, borderRadius: 8, marginBottom: 14, resize: "vertical",
                    background: "#fafaf9", outline: "none", boxSizing: "border-box", lineHeight: 1.6,
                  }}
                />
                <button
                  onClick={() => {
                    if (!commentName.trim() || !commentBody.trim()) return;
                    setComments(prev => [{
                      id: `c${Date.now()}`,
                      author: commentName.trim(),
                      authorImg: `https://i.pravatar.cc/80?u=${commentName}`,
                      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                      body: commentBody.trim(),
                      likes: 0,
                    }, ...prev]);
                    setCommentName("");
                    setCommentBody("");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity"
                  style={{ background: ACCENT, color: "white", fontSize: "0.78rem", fontWeight: 700, opacity: commentName && commentBody ? 1 : 0.45 }}
                >
                  <Send className="w-3.5 h-3.5" /> Post Comment
                </button>
              </div>

              {/* Comment list */}
              <div className="flex flex-col gap-0">
                {comments.map((c, ci) => (
                  <div key={c.id} style={{ borderTop: ci === 0 ? LINE : "none", borderBottom: LINE, paddingTop: 24, paddingBottom: 24 }}>
                    <div className="flex gap-3 items-start">
                      <AvatarImg src={c.authorImg} fallback={c.author.split(" ").map(n => n[0]).join("").slice(0, 2)} size={36} borderStyle="none" style={{ borderRadius: "50%", flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap mb-2">
                          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1a1a1a" }}>{c.author}</span>
                          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{c.date}</span>
                        </div>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#2a2a2a", marginBottom: 10 }}>{c.body}</p>
                        <div className="flex items-center gap-4">
                          <button style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                            <ThumbsUp className="w-3 h-3" /> {c.likes}
                          </button>
                          {c.replies?.length ? (
                            <button
                              onClick={() => setExpandedReplies(prev => {
                                const next = new Set(prev);
                                next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                                return next;
                              })}
                              className="flex items-center gap-1"
                              style={{ fontSize: "0.72rem", color: ACCENT, fontWeight: 600 }}
                            >
                              {expandedReplies.has(c.id) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {c.replies.length} {c.replies.length === 1 ? "reply" : "replies"}
                            </button>
                          ) : null}
                        </div>

                        {/* Replies */}
                        {expandedReplies.has(c.id) && c.replies?.map(r => (
                          <div key={r.id} className="flex gap-3 items-start mt-4 pl-2" style={{ borderLeft: `2px solid ${ACCENT}20` }}>
                            <AvatarImg src={r.authorImg} fallback={r.author.split(" ").map(n => n[0]).join("").slice(0, 2)} size={28} borderStyle="none" style={{ borderRadius: "50%", flexShrink: 0 }} />
                            <div>
                              <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
                                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#1a1a1a" }}>{r.author}</span>
                                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{r.date}</span>
                              </div>
                              <p style={{ fontSize: "0.87rem", lineHeight: 1.7, color: "#2a2a2a" }}>{r.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Related articles ── */}
            <div style={{ borderTop: LINE, marginTop: 56, paddingTop: 28 }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                Continue Reading
              </p>
              <div className="grid grid-cols-3 gap-0" style={{ borderTop: LINE, borderLeft: LINE }}>
                {RELATED.map(a => (
                  <Link
                    key={a.id}
                    to={`/blog/${a.id}`}
                    className="group"
                    style={{ borderRight: LINE, borderBottom: LINE, display: "block", textDecoration: "none" }}
                  >
                    <div className="overflow-hidden" style={{ borderBottom: LINE }}>
                      <img
                        src={a.imgUrl}
                        alt={a.title}
                        className="w-full transition-transform duration-700 group-hover:scale-105"
                        style={{ height: 140, objectFit: "cover", display: "block" }}
                      />
                    </div>
                    <div style={{ padding: "16px 18px" }}>
                      <CategoryLabel cat={a.category} />
                      <h4
                        className="line-clamp-2"
                        style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.35, marginTop: 6, marginBottom: 10 }}
                      >
                        {a.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <AvatarImg src={a.authorImg} fallback={a.author.split(" ").map(n => n[0]).join("").slice(0, 2)} size={18} borderStyle="none" />
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{a.author.split(" ").slice(-1)[0]} · {a.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Membership gate modal ── */}
      {gateVisible && !gateDismissed && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 60,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px 16px",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={e => { if (e.target === e.currentTarget) { setGateDismissed(true); setGateVisible(false); } }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } } @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }`}</style>
          <div
            style={{
              background: "white", borderRadius: 20, width: "100%", maxWidth: 480,
              boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
              overflow: "hidden",
              animation: "slideUp 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Top band */}
            <div style={{ background: "#0F172A", padding: "28px 32px 24px", position: "relative" }}>
              <button
                onClick={() => { setGateDismissed(true); setGateVisible(false); }}
                style={{ position: "absolute", top: 16, right: 16, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
              >
                <X className="w-4 h-4" />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />
                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                  Material Library — Members Only
                </span>
              </div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "white", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: 10 }}>
                Enjoying the read?<br />Keep going — it's free.
              </h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                Join 14,000+ architects, engineers, and material professionals on Material Library. Unlimited articles, spec sheets, and curated product knowledge.
              </p>
            </div>

            {/* Form */}
            <div style={{ padding: "28px 32px 32px" }}>
              {leadSubmitted ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p style={{ fontSize: "1rem", fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>You're on the list!</p>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6 }}>We'll send your membership link to <strong>{leadEmail}</strong>. Check your inbox.</p>
                  <button
                    onClick={() => { setGateDismissed(true); setGateVisible(false); }}
                    style={{ marginTop: 20, fontSize: "0.78rem", fontWeight: 700, color: ACCENT, background: "none", border: "none", cursor: "pointer" }}
                  >
                    Continue reading →
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      style={{
                        flex: 1, padding: "10px 14px", fontSize: "0.85rem",
                        border: "1px solid #E2E8F0", borderRadius: 8, outline: "none",
                        background: "#F8FAFC", boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Work email"
                    value={leadEmail}
                    onChange={e => setLeadEmail(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px", fontSize: "0.85rem",
                      border: "1px solid #E2E8F0", borderRadius: 8, marginBottom: 14, outline: "none",
                      background: "#F8FAFC", boxSizing: "border-box",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!leadEmail.trim() || !leadName.trim()) return;
                      setLeadSubmitted(true);
                    }}
                    style={{
                      width: "100%", padding: "12px 0", borderRadius: 10,
                      background: leadEmail && leadName ? ACCENT : "#CBD5E1",
                      color: "white", fontSize: "0.9rem", fontWeight: 800,
                      border: "none", cursor: leadEmail && leadName ? "pointer" : "default",
                      transition: "background 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Create free account
                  </button>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
                    No credit card. Unsubscribe anytime.
                  </p>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #F1F5F9", textAlign: "center" }}>
                    <button
                      onClick={() => { setGateDismissed(true); setGateVisible(false); }}
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                    >
                      I'll read less. Continue without account →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
