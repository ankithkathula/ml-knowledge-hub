import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft, Image, Video, Type, Bold, Italic, List,
  Link as LinkIcon, Save, Eye, Plus, X, Upload, Calendar,
  User, Tag, Sparkles, FileText, ChevronDown, AlignLeft,
  AlignCenter, Heading1, Heading2, Quote,
} from "lucide-react";
interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
}

interface BlogPost {
  title: string;
  subtitle: string;
  bannerImage: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  content: string;
  media: MediaItem[];
}

export function BlogEditorPage() {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    subtitle: "",
    bannerImage: "",
    author: "Ar. Priya Sharma",
    date: new Date().toISOString().split("T")[0],
    tags: [],
    category: "Building Envelope",
    content: "",
    media: [],
  });

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !blogPost.tags.includes(newTag.trim())) {
      setBlogPost({ ...blogPost, tags: [...blogPost.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setBlogPost({ ...blogPost, tags: blogPost.tags.filter(t => t !== tag) });
  };

  const handleBannerUpload = () => {
    // Simulate upload - in production this would handle actual file upload
    setUploadingBanner(true);
    setTimeout(() => {
      setBlogPost({
        ...blogPost,
        bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      });
      setUploadingBanner(false);
    }, 1000);
  };

  const addMediaToContent = (type: "image" | "video") => {
    const placeholder = type === "image" 
      ? "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
      : "https://www.example.com/sample-video.mp4";
    
    const newMedia: MediaItem = {
      id: Date.now().toString(),
      type,
      url: placeholder,
      caption: "",
    };
    
    setBlogPost({ ...blogPost, media: [...blogPost.media, newMedia] });
    setShowMediaUpload(false);
  };

  const removeMedia = (id: string) => {
    setBlogPost({ ...blogPost, media: blogPost.media.filter(m => m.id !== id) });
  };

  const categories = [
    "Building Envelope",
    "Structural Systems",
    "MEP Systems",
    "Interior Finishes",
    "Fixtures & Equipment",
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #f5f7fb 50%, #fdf4ef 100%)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[300px] opacity-20" style={{ background: "radial-gradient(ellipse, rgba(255,106,61,0.25) 0%, transparent 70%)" }} />
        
        <div className="relative max-w-6xl mx-auto px-6 py-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:text-orange-500 transition-colors" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-6 h-6" style={{ color: "#ff6a3d" }} />
                <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  Create Blog Post
                </h1>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Share your expertise with the construction materials community
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}
              >
                <Eye className="w-4 h-4" /> {activeTab === "edit" ? "Preview" : "Edit"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "#ff6a3d", color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "#10b981", color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>
                <Sparkles className="w-4 h-4" /> Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "edit" ? (
          <div className="flex gap-6">
            {/* Main Editor */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Banner Image Upload */}
              <div className="gl-card" style={{ padding: "24px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, display: "block" }}>
                  Banner Image
                </label>
                {blogPost.bannerImage ? (
                  <div className="relative group">
                    <img src={blogPost.bannerImage} alt="Banner" className="w-full h-56 object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                      <button
                        onClick={handleBannerUpload}
                        className="px-4 py-2 rounded-lg"
                        style={{ background: "#fff", color: "var(--text-primary)", fontSize: "0.78rem", fontWeight: 600 }}
                      >
                        <Upload className="w-4 h-4 inline mr-1" /> Change
                      </button>
                      <button
                        onClick={() => setBlogPost({ ...blogPost, bannerImage: "" })}
                        className="px-4 py-2 rounded-lg"
                        style={{ background: "#ef4444", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}
                      >
                        <X className="w-4 h-4 inline mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleBannerUpload}
                    disabled={uploadingBanner}
                    className="w-full h-56 rounded-xl flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all hover:border-orange-500 hover:bg-orange-50/50"
                    style={{ borderColor: "rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.5)" }}
                  >
                    {uploadingBanner ? (
                      <>
                        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10" style={{ color: "rgba(255,106,61,0.4)" }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Upload Banner Image</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Recommended: 1200x600px, JPG or PNG</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="gl-card" style={{ padding: "24px" }}>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, display: "block" }}>
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your blog title..."
                      value={blogPost.title}
                      onChange={(e) => setBlogPost({ ...blogPost, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "1.1rem", fontWeight: 600, background: "rgba(255,255,255,0.8)", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, display: "block" }}>
                      Subtitle
                    </label>
                    <input
                      type="text"
                      placeholder="Add a brief subtitle..."
                      value={blogPost.subtitle}
                      onChange={(e) => setBlogPost({ ...blogPost, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.88rem", background: "rgba(255,255,255,0.8)", outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              {/* Rich Text Editor Toolbar */}
              <div className="gl-card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="flex items-center gap-1 flex-wrap px-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                  <button className="editor-btn" title="Heading 1"><Heading1 className="w-4 h-4" /></button>
                  <button className="editor-btn" title="Heading 2"><Heading2 className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  <button className="editor-btn" title="Bold"><Bold className="w-4 h-4" /></button>
                  <button className="editor-btn" title="Italic"><Italic className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  <button className="editor-btn" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                  <button className="editor-btn" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  <button className="editor-btn" title="Bullet List"><List className="w-4 h-4" /></button>
                  <button className="editor-btn" title="Quote"><Quote className="w-4 h-4" /></button>
                  <button className="editor-btn" title="Insert Link"><LinkIcon className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-200 mx-1" />
                  <button
                    onClick={() => setShowMediaUpload(!showMediaUpload)}
                    className="editor-btn"
                    title="Insert Media"
                    style={{ background: showMediaUpload ? "rgba(255,106,61,0.1)" : undefined, color: showMediaUpload ? "#ff6a3d" : undefined }}
                  >
                    <Image className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowMediaUpload(!showMediaUpload)}
                    className="editor-btn"
                    title="Insert Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>

                {showMediaUpload && (
                  <div className="p-4" style={{ background: "rgba(255,106,61,0.04)", borderBottom: "1px solid rgba(255,106,61,0.1)" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>Insert Media</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addMediaToContent("image")}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-orange-100 transition-colors"
                        style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,106,61,0.2)", fontSize: "0.78rem", fontWeight: 600 }}
                      >
                        <Image className="w-4 h-4" style={{ color: "#ff6a3d" }} /> Add Image
                      </button>
                      <button
                        onClick={() => addMediaToContent("video")}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-orange-100 transition-colors"
                        style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,106,61,0.2)", fontSize: "0.78rem", fontWeight: 600 }}
                      >
                        <Video className="w-4 h-4" style={{ color: "#ff6a3d" }} /> Add Video
                      </button>
                    </div>
                  </div>
                )}

                <textarea
                  placeholder="Write your blog content here... Use the toolbar above to format your text and insert media."
                  value={blogPost.content}
                  onChange={(e) => setBlogPost({ ...blogPost, content: e.target.value })}
                  className="w-full px-6 py-4 resize-none outline-none"
                  style={{ minHeight: "400px", fontSize: "0.9rem", lineHeight: 1.8, background: "rgba(255,255,255,0.5)", border: "none" }}
                />
              </div>

              {/* Media Items */}
              {blogPost.media.length > 0 && (
                <div className="gl-card" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
                    Inserted Media ({blogPost.media.length})
                  </h3>
                  <div className="space-y-4">
                    {blogPost.media.map((media) => (
                      <div key={media.id} className="flex gap-4 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          {media.type === "image" ? (
                            <img src={media.url} alt="Media" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.08)" }}>
                              <Video className="w-8 h-8" style={{ color: "var(--text-muted)" }} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 600, background: media.type === "image" ? "rgba(59,130,246,0.1)" : "rgba(139,92,246,0.1)", color: media.type === "image" ? "#3b82f6" : "#8b5cf6" }}>
                              {media.type.toUpperCase()}
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Add a caption..."
                            value={media.caption || ""}
                            onChange={(e) => {
                              const updated = blogPost.media.map(m => m.id === media.id ? { ...m, caption: e.target.value } : m);
                              setBlogPost({ ...blogPost, media: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg"
                            style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.78rem", background: "#fff", outline: "none" }}
                          />
                        </div>
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Metadata */}
            <div style={{ width: 300, flexShrink: 0 }} className="space-y-4">
              {/* Author & Date */}
              <div className="gl-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  Post Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
                      <User className="w-3 h-3 inline mr-1" /> Author
                    </label>
                    <input
                      type="text"
                      value={blogPost.author}
                      onChange={(e) => setBlogPost({ ...blogPost, author: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.8rem", background: "rgba(255,255,255,0.8)", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
                      <Calendar className="w-3 h-3 inline mr-1" /> Publish Date
                    </label>
                    <input
                      type="date"
                      value={blogPost.date}
                      onChange={(e) => setBlogPost({ ...blogPost, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.8rem", background: "rgba(255,255,255,0.8)", outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="gl-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  Category
                </h3>
                <div className="relative">
                  <select
                    value={blogPost.category}
                    onChange={(e) => setBlogPost({ ...blogPost, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg appearance-none"
                    style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.8rem", background: "rgba(255,255,255,0.8)", outline: "none", paddingRight: 32 }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>

              {/* Tags */}
              <div className="gl-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  <Tag className="w-3 h-3 inline mr-1" /> Tags
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      className="flex-1 px-3 py-2 rounded-lg"
                      style={{ border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.78rem", background: "rgba(255,255,255,0.8)", outline: "none" }}
                    />
                    <button
                      onClick={addTag}
                      className="p-2 rounded-lg"
                      style={{ background: "#ff6a3d", color: "#fff" }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {blogPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {blogPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                          style={{ fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,106,61,0.1)", color: "#ff6a3d" }}
                        >
                          {tag}
                          <button onClick={() => removeTag(tag)} className="hover:bg-orange-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Preview */}
              <div className="gl-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                  SEO Preview
                </h3>
                <div className="space-y-2">
                  <p style={{ fontSize: "0.78rem", color: "#1a73e8", fontWeight: 600 }}>
                    {blogPost.title || "Your Blog Title"}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "#5f6368", lineHeight: 1.5 }}>
                    {blogPost.subtitle || "Your subtitle will appear here in search results..."}
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#5f6368" }}>
                    materiallibrary.com › blog › {blogPost.category.toLowerCase().replace(/\s+/g, "-")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="gl-card overflow-hidden" style={{ padding: 0 }}>
              {/* Banner */}
              {blogPost.bannerImage && (
                <div className="relative h-96 overflow-hidden">
                  <img src={blogPost.bannerImage} alt={blogPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "#ff6a3d", color: "#fff" }}>
                        {blogPost.category}
                      </span>
                      {blogPost.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                      {blogPost.title || "Your Blog Title"}
                    </h1>
                    {blogPost.subtitle && (
                      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)", marginTop: 8, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                        {blogPost.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Author & Date Bar */}
              <div className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #ff8f6d 100%)", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>
                    {blogPost.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{blogPost.author}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {new Date(blogPost.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-orange-50 transition-colors" title="Share">
                    <LinkIcon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8" style={{ background: "#fff" }}>
                <div style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-primary)" }}>
                  {blogPost.content ? (
                    <p style={{ whiteSpace: "pre-wrap" }}>{blogPost.content}</p>
                  ) : (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                      Your blog content will appear here...
                    </p>
                  )}
                </div>

                {/* Media Items in Preview */}
                {blogPost.media.length > 0 && (
                  <div className="mt-8 space-y-6">
                    {blogPost.media.map((media) => (
                      <div key={media.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                        {media.type === "image" ? (
                          <img src={media.url} alt={media.caption || ""} className="w-full h-auto" />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.05)" }}>
                            <div className="text-center">
                              <Video className="w-12 h-12 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Video: {media.url}</p>
                            </div>
                          </div>
                        )}
                        {media.caption && (
                          <div className="px-4 py-3" style={{ background: "rgba(0,0,0,0.02)" }}>
                            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>{media.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags at bottom */}
                {blogPost.tags.length > 0 && (
                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 8 }}>TAGS</p>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full"
                          style={{ fontSize: "0.75rem", fontWeight: 600, background: "rgba(255,106,61,0.08)", color: "#ff6a3d" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .editor-btn {
          padding: 6px 8px;
          border-radius: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
          color: var(--text-secondary);
        }
        .editor-btn:hover {
          background: rgba(0,0,0,0.05);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
