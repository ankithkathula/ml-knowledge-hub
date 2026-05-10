import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, Calendar, Clock, Eye, Share2, Bookmark,
  Tag, User, Facebook, Twitter, Linkedin, Mail,
  ThumbsUp, MessageCircle, TrendingUp, ChevronRight,
  Play, Image as ImageIcon,
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface BlogContent {
  id: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
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

const SAMPLE_BLOG: BlogContent = {
  id: "sustainable-concrete-innovations-2026",
  title: "Sustainable Concrete Innovations Transforming Modern Construction",
  subtitle: "How eco-friendly concrete solutions are reducing carbon footprint in mega projects",
  bannerImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600",
  author: {
    name: "Ar. Priya Sharma",
    title: "Senior Structural Engineer & Sustainability Consultant",
    bio: "Priya Sharma is a licensed architect and structural engineer with over 15 years of experience in sustainable construction. She specializes in green building materials and has consulted on 200+ LEED certified projects across India and Southeast Asia.",
  },
  date: "2026-03-28",
  readTime: "8 min read",
  tags: ["Sustainability", "Concrete", "Green Building", "Innovation", "Carbon Neutral"],
  category: "Structural Systems",
  views: 12450,
  likes: 342,
  comments: 28,
  content: [
    {
      type: "text",
      content: "The construction industry stands at a critical juncture. Concrete, the world's most widely used building material, is responsible for approximately 8% of global CO2 emissions. As urbanization accelerates and infrastructure demands grow, the need for sustainable alternatives has never been more urgent.",
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
      content: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      caption: "Carbon-capture concrete being poured at a commercial construction site in Mumbai",
      credit: "Photo: Industrial Construction Review",
    },
    {
      type: "text",
      content: "In a recent project in Bangalore, we implemented carbon-capture concrete across 45,000 square meters of floor slabs. The results were remarkable: a 35% reduction in embodied carbon compared to conventional mixes, with no compromise in structural integrity. The project achieved a 15% cost premium initially, but lifecycle analysis revealed savings within 7 years due to enhanced durability and reduced maintenance.",
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
      content: "https://images.unsplash.com/photo-1590856029620-7484c60f38a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      caption: "Recycled concrete aggregate processing facility showing crushed material grading",
      credit: "Photo: Sustainable Materials Institute",
    },
    {
      type: "text",
      content: "Current regulations in several Indian states now mandate minimum recycled content in government projects. This policy push, combined with improving economics, is driving widespread adoption. We're seeing recycled aggregate prices drop to within 10-15% of virgin material costs in major metros.",
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
      content: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      caption: "Construction team reviewing sustainable concrete specifications on-site",
      credit: "Photo: BuildTech Magazine",
    },
    {
      type: "heading",
      content: "The Path Forward",
    },
    {
      type: "text",
      content: "The transition to sustainable concrete is not merely an environmental imperative—it's becoming an economic necessity. As carbon pricing mechanisms expand and green building certifications become market differentiators, early adopters will have competitive advantages.",
    },
    {
      type: "text",
      content: "For architects, engineers, and developers, the message is clear: sustainable concrete technologies are ready for mainstream deployment today. The industry has moved beyond experimentation into proven, scalable solutions. The question is no longer 'if' but 'how quickly' we can implement these innovations across our projects.",
    },
    {
      type: "quote",
      content: "In five years, specifying traditional high-carbon concrete when sustainable alternatives exist will be seen as professional negligence. The technology is here. The economics are favorable. The only missing ingredient is willingness to change.",
    },
    {
      type: "text",
      content: "As we look toward 2030 and India's ambitious net-zero targets, concrete innovation will play a pivotal role. The material that built our modern world is now being reimagined to sustain it. And that transformation is happening on construction sites today.",
    },
  ],
};

const RELATED_ARTICLES = [
  {
    id: "smart-glass-technology",
    title: "Smart Glass Technology: The Future of Building Envelopes",
    category: "Building Envelope",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    readTime: "6 min read",
  },
  {
    id: "hvac-systems-comparison",
    title: "HVAC Systems Comparison: VRF vs Traditional",
    category: "MEP Systems",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    readTime: "10 min read",
  },
  {
    id: "waterproofing-solutions",
    title: "Complete Guide to Basement Waterproofing",
    category: "Structural Systems",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    readTime: "11 min read",
  },
];

export function BlogDetailPage() {
  const { blogId } = useParams<{ blogId: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // In production, fetch blog by ID
  const blog = SAMPLE_BLOG;

  if (!blog) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Article not found</h1>
          <Link to="/blog" className="btn-primary mt-6 inline-flex">Browse Articles</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Banner Image with Overlay */}
      <div className="relative h-[500px] overflow-hidden">
        <img src={blog.bannerImage} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }} />
        
        {/* Breadcrumb & Category Badge */}
        <div className="absolute top-6 left-0 right-0">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors" style={{ fontSize: "0.8rem" }}>
                <ArrowLeft className="w-4 h-4" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/60" />
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors" style={{ fontSize: "0.8rem" }}>
                Blog
              </Link>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600, background: "#ff6a3d", color: "#fff" }}>
              {blog.category}
            </span>
          </div>
        </div>

        {/* Title & Metadata Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-6 pb-8">
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 12, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              {blog.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.95)", marginBottom: 20, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              {blog.subtitle}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{ fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Info Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.9rem", fontWeight: 700 }}>
                  {blog.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{blog.author.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)" }}>{blog.author.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white/90">
                <span className="flex items-center gap-2" style={{ fontSize: "0.8rem" }}>
                  <Calendar className="w-4 h-4" /> {formattedDate}
                </span>
                <span className="flex items-center gap-2" style={{ fontSize: "0.8rem" }}>
                  <Clock className="w-4 h-4" /> {blog.readTime}
                </span>
                <span className="flex items-center gap-2" style={{ fontSize: "0.8rem" }}>
                  <Eye className="w-4 h-4" /> {(blog.views / 1000).toFixed(1)}k views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-8 items-start">
          {/* Sidebar - Sticky Actions */}
          <div style={{ width: 80, flexShrink: 0, position: "sticky", top: 100 }}>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className="w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all"
                style={{ background: liked ? "#ff6a3d" : "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", color: liked ? "#fff" : "var(--text-muted)" }}
              >
                <ThumbsUp className="w-5 h-5" style={{ fill: liked ? "#fff" : "none" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 600, marginTop: 2 }}>{blog.likes + (liked ? 1 : 0)}</span>
              </button>
              
              <button
                className="w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-muted)" }}
              >
                <MessageCircle className="w-5 h-5" />
                <span style={{ fontSize: "0.65rem", fontWeight: 600, marginTop: 2 }}>{blog.comments}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", color: "var(--text-muted)" }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                {showShareMenu && (
                  <div className="absolute left-16 top-0 ml-2 p-3 rounded-xl space-y-2" style={{ background: "rgba(255,255,255,0.98)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", minWidth: 160 }}>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      <Facebook className="w-4 h-4" style={{ color: "#1877f2" }} /> Facebook
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      <Twitter className="w-4 h-4" style={{ color: "#1da1f2" }} /> Twitter
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      <Linkedin className="w-4 h-4" style={{ color: "#0a66c2" }} /> LinkedIn
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      <Mail className="w-4 h-4" style={{ color: "var(--text-muted)" }} /> Email
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                style={{ background: bookmarked ? "#ff6a3d" : "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", color: bookmarked ? "#fff" : "var(--text-muted)" }}
              >
                <Bookmark className="w-5 h-5" style={{ fill: bookmarked ? "#fff" : "none" }} />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-1 min-w-0">
            <article className="gl-card" style={{ padding: "48px 56px", maxWidth: "100%" }}>
              {blog.content.map((block, index) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2 key={index} style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginTop: index > 0 ? 48 : 0, marginBottom: 20, lineHeight: 1.3 }}>
                        {block.content}
                      </h2>
                    );
                  
                  case "text":
                    return (
                      <p key={index} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-primary)", marginBottom: 24, whiteSpace: "pre-line" }}>
                        {block.content}
                      </p>
                    );
                  
                  case "quote":
                    return (
                      <blockquote key={index} className="my-8 pl-6 pr-4 py-4" style={{ borderLeft: "4px solid #ff6a3d", background: "rgba(255,106,61,0.04)", borderRadius: "0 8px 8px 0" }}>
                        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-primary)", fontStyle: "italic", fontWeight: 500 }}>
                          {block.content}
                        </p>
                      </blockquote>
                    );
                  
                  case "image":
                    return (
                      <figure key={index} className="my-10">
                        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                          <img src={block.content} alt={block.caption || ""} className="w-full h-auto" />
                        </div>
                        {(block.caption || block.credit) && (
                          <figcaption className="mt-3 px-2">
                            {block.caption && (
                              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 4 }}>
                                {block.caption}
                              </p>
                            )}
                            {block.credit && (
                              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                                {block.credit}
                              </p>
                            )}
                          </figcaption>
                        )}
                      </figure>
                    );
                  
                  case "video":
                    return (
                      <figure key={index} className="my-10">
                        <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.05)", aspectRatio: "16/9" }}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,106,61,0.9)" }}>
                                <Play className="w-10 h-10 text-white ml-1" />
                              </div>
                              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500 }}>Video Content</p>
                              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>{block.content}</p>
                            </div>
                          </div>
                        </div>
                        {block.caption && (
                          <figcaption className="mt-3 px-2">
                            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                              {block.caption}
                            </p>
                          </figcaption>
                        )}
                      </figure>
                    );
                  
                  default:
                    return null;
                }
              })}
            </article>

            {/* Author Bio */}
            <div className="gl-card mt-6" style={{ padding: "32px" }}>
              <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 16 }}>
                About the Author
              </h3>
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "1.3rem", fontWeight: 700 }}>
                  {blog.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1">
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                    {blog.author.name}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                    {blog.author.title}
                  </p>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-primary)" }}>
                    {blog.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5" style={{ color: "#ff6a3d" }} />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Related Articles
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RELATED_ARTICLES.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="gl-card group overflow-hidden"
                    style={{ padding: 0 }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 600, background: "rgba(255,106,61,0.95)", color: "#fff" }}>
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="line-clamp-2 mb-2" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
                        {article.title}
                      </h4>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        <Clock className="w-3 h-3 inline mr-1" /> {article.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
