import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, MapPin, Mail, ExternalLink, Heart, Eye,
  FolderOpen, Award, Briefcase, GraduationCap, Calendar,
  Linkedin, Globe, MessageCircle, Star
} from "lucide-react";
const mockProfile = {
  name: "Arjun Mehta",
  slug: "arjun-mehta",
  avatar: "AM",
  headline: "Senior Architect | Sustainable Design Enthusiast",
  type: "Architect" as const,
  location: "Mumbai, Maharashtra",
  email: "arjun@example.com",
  website: "https://arjunmehta.design",
  linkedin: "https://linkedin.com/in/arjunmehta",
  bio: "Award-winning architect with 10+ years of experience in sustainable residential and commercial design. Passionate about integrating traditional Indian building wisdom with modern green technologies.",
  stats: { projects: 14, views: 3200, likes: 890 },
  skills: ["Sustainable Design", "Revit", "AutoCAD", "LEED", "3D Visualization", "Space Planning", "Green Building", "BIM Coordination", "Project Management", "SketchUp"],
  portfolio: [
    { id: 1, title: "Eco-Luxury Villa, Lonavala", category: "Residential", views: 580, likes: 142 },
    { id: 2, title: "Corporate HQ, BKC Mumbai", category: "Commercial", views: 420, likes: 98 },
    { id: 3, title: "Boutique Hotel, Goa", category: "Hospitality", views: 350, likes: 87 },
    { id: 4, title: "Smart School Campus, Pune", category: "Institutional", views: 290, likes: 65 },
    { id: 5, title: "Waterfront Apartments, Kochi", category: "Residential", views: 480, likes: 120 },
    { id: 6, title: "Art Gallery Renovation, Delhi", category: "Cultural", views: 310, likes: 76 },
  ],
  education: [
    { degree: "M.Arch in Sustainable Architecture", institution: "IIT Kharagpur", year: "2014-2016" },
    { degree: "B.Arch", institution: "Sir J.J. College of Architecture, Mumbai", year: "2009-2014" },
  ],
  experience: [
    { role: "Senior Architect", company: "DesignCraft Studios", period: "2020 - Present", description: "Leading design team for luxury residential projects." },
    { role: "Architect", company: "UrbanEdge Architects", period: "2016 - 2020", description: "Worked on mixed-use commercial developments." },
    { role: "Junior Architect", company: "GreenScape Design", period: "2014 - 2016", description: "Assisted in sustainable landscape architecture projects." },
  ],
  certifications: [
    { name: "LEED AP BD+C", issuer: "USGBC", year: "2018" },
    { name: "IGBC AP", issuer: "Indian Green Building Council", year: "2019" },
    { name: "Revit Architecture Professional", issuer: "Autodesk", year: "2020" },
  ],
};

const typeColor = { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" };

export function UserPublicProfilePage() {
  const { userSlug } = useParams<{ userSlug: string }>();
  const profile = mockProfile; // In production, fetch by userSlug

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Back Nav */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link to="/directory" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
              {profile.avatar}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{profile.name}</h1>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: 2 }}>{profile.headline}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: typeColor.bg, color: typeColor.color }}>{profile.type}</span>
                    <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}><MapPin size={14} />{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {profile.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="LinkedIn">
                        <Linkedin size={16} style={{ color: "var(--text-muted)" }} />
                      </a>
                    )}
                    {profile.website && (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Website">
                        <Globe size={16} style={{ color: "var(--text-muted)" }} />
                      </a>
                    )}
                    <a href={`mailto:${profile.email}`} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Email">
                      <Mail size={16} style={{ color: "var(--text-muted)" }} />
                    </a>
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shrink-0">
                  <MessageCircle size={16} /> Message
                </button>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 16 }}>{profile.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Projects", value: profile.stats.projects, icon: FolderOpen, color: "#3b82f6" },
              { label: "Views", value: profile.stats.views.toLocaleString(), icon: Eye, color: "#10b981" },
              { label: "Likes", value: profile.stats.likes.toLocaleString(), icon: Heart, color: "#ef4444" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={18} className="mx-auto mb-1" style={{ color: s.color }} />
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card rounded-xl p-6">
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.portfolio.map((project) => (
              <div key={project.id} className="glass-card hover-lift rounded-xl overflow-hidden cursor-pointer">
                <div className="h-40 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.06), rgba(59,130,246,0.06))" }}>
                  <FolderOpen size={28} style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="p-4">
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>{project.title}</h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,106,61,0.1)", color: "var(--accent)" }}>{project.category}</span>
                  <div className="flex items-center gap-4 mt-3" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Eye size={13} />{project.views}</span>
                    <span className="flex items-center gap-1"><Heart size={13} />{project.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experience */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase size={18} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>Experience</h2>
            </div>
            <div className="space-y-5">
              {profile.experience.map((exp, i) => (
                <div key={i} className="relative pl-6" style={{ borderLeft: "2px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.15)" }} />
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{exp.role}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>{exp.company}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{exp.period}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.6 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap size={18} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>Education</h2>
            </div>
            <div className="space-y-5">
              {profile.education.map((edu, i) => (
                <div key={i} className="relative pl-6" style={{ borderLeft: "2px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.15)" }} />
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{edu.degree}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>{edu.institution}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{edu.year}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} style={{ color: "var(--accent)" }} />
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>Certifications</h2>
              </div>
              <div className="space-y-3">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--accent-light)" }}>
                      <Award size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{cert.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{cert.issuer} &middot; {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
