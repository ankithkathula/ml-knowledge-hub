import { useState } from "react";
import { Eye, Heart, Edit2, Plus } from "lucide-react";
import { BLOG_POSTS } from "../data/designerData";

const ACCENT = "#8b5cf6";

export function DesignerBlogsPage() {
  const [tab, setTab] = useState<"published" | "draft">("published");
  const filtered = BLOG_POSTS.filter(b => b.status === tab);

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>My Blogs</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 }}>
            {BLOG_POSTS.filter(b => b.status === "published").length} published · {BLOG_POSTS.filter(b => b.status === "draft").length} drafts
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: ACCENT }}>
          <Plus className="w-4 h-4" /> Write Post
        </button>
      </div>

      <div className="flex gap-2">
        {(["published", "draft"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
            style={{ background: tab === t ? ACCENT : "rgba(0,0,0,0.04)", color: tab === t ? "white" : "var(--text-secondary)" }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl p-5 transition-all hover:scale-[1.005]"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{post.title}</div>
                <p className="mt-1.5 line-clamp-2" style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  {post.status === "published" && (
                    <>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}><Eye className="w-3.5 h-3.5" />{post.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}><Heart className="w-3.5 h-3.5" />{post.likes}</span>
                    </>
                  )}
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(139,92,246,0.08)", color: ACCENT }}>{tag}</span>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0" style={{ background: "rgba(0,0,0,0.04)", color: "var(--text-secondary)" }}>
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>No {tab} posts yet</div>
        )}
      </div>
    </div>
  );
}
