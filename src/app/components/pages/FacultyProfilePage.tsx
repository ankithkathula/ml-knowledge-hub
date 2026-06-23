import { Link, useParams } from "react-router";
import {
  MapPin, Linkedin, Globe, GraduationCap, Briefcase,
  BookOpen, FlaskConical, Users, LayoutDashboard,
} from "lucide-react";
import { getAuthUser } from "../../utils/auth";

const ACCENT = "#2563eb";
const ACCENT_RGB = "37,99,235";

const FACULTY_PROFILE = {
  id: "ravi-kumar",
  name: "Dr. Ravi Kumar",
  initials: "RK",
  headline: "Associate Professor · Dept. of Architecture · RICS School of Built Environment",
  institute: "RICS School of Built Environment, Noida",
  location: "Noida, Uttar Pradesh",
  linkedin: "linkedin.com/in/dr-ravi-kumar",
  researchgate: "researchgate.net/profile/Ravi_Kumar",
  bio: "Associate Professor at RICS SBE with 14 years of teaching and research experience. PhD in Sustainable Architecture from IIT Delhi. Research focuses on climate-responsive design, building materials innovation, and heritage conservation. Has guided 40+ B.Arch thesis projects and published 18 peer-reviewed papers.",
  stats: { courses: 3, students: 86, papers: 18, citations: 47 },
  expertise: [
    "Sustainable Architecture",
    "Climate-Responsive Design",
    "Heritage Conservation",
    "Building Materials",
    "Biophilic Design",
  ],
};

const COURSES = [
  { name: "Environmental Design Studio", students: 28, schedule: "Mon/Thu 9–11 AM", year: "B.Arch 4th Year" },
  { name: "Building Construction III", students: 30, schedule: "Tue/Fri 11 AM–1 PM", year: "B.Arch 3rd Year" },
  { name: "History of Architecture II", students: 28, schedule: "Wed 2–5 PM", year: "B.Arch 2nd Year" },
];

const PUBLICATIONS = [
  { title: "Climate-Responsive Design in Tropical Climates", journal: "Journal of Architecture & Planning", year: "2024", citations: 12 },
  { title: "Heritage Conservation in Post-Colonial India", journal: "Built Environment Journal", year: "2022", citations: 18 },
  { title: "Biophilic Principles in Educational Spaces", journal: "IJBE", year: "2021", citations: 17 },
];

const EDUCATION = [
  { degree: "PhD Sustainable Architecture", institution: "IIT Delhi", year: "2010" },
  { degree: "M.Arch", institution: "CEPT University", year: "2006" },
  { degree: "B.Arch", institution: "SPA Delhi", year: "2004" },
];

const EXPERIENCE = [
  { role: "Associate Professor", company: "RICS School of Built Environment", duration: "2014 – Present" },
  { role: "Guest Faculty", company: "NID Ahmedabad", duration: "2012 – 2014" },
  { role: "Assistant Professor", company: "Amity School of Architecture", duration: "2010 – 2012" },
];

function SectionCard({ title, icon: Icon, children }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
    >
      <div
        className="flex items-center gap-2.5 mb-5"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "1rem" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
        >
          <Icon style={{ color: ACCENT, width: 16, height: 16 }} />
        </div>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function FacultyProfilePage() {
  const { facultyId } = useParams<{ facultyId: string }>();
  const authUser = getAuthUser();

  const isRavi = !facultyId || facultyId === FACULTY_PROFILE.id;
  const isOwnProfile = authUser?.id === FACULTY_PROFILE.id;

  if (!isRavi) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p style={{ color: "var(--text-muted)" }}>Profile not found.</p>
        <Link to="/" className="mt-3 text-sm font-semibold" style={{ color: ACCENT }}>← Go home</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      <div
        style={{
          background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.1) 0%, rgba(${ACCENT_RGB},0.03) 100%)`,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {isOwnProfile && (
            <div className="mb-6 flex items-center gap-3">
              <Link
                to="/f"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}
              >
                <LayoutDashboard style={{ width: 13, height: 13 }} />
                My Dashboard
              </Link>
              <Link
                to="/f/profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-secondary)" }}
              >
                Edit Profile
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`,
                boxShadow: `0 8px 32px rgba(${ACCENT_RGB},0.3)`,
              }}
            >
              {FACULTY_PROFILE.initials}
            </div>

            <div className="flex-1 min-w-0">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                {FACULTY_PROFILE.name}
              </h1>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: 4 }}>
                {FACULTY_PROFILE.headline}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  <GraduationCap style={{ width: 14, height: 14 }} />
                  {FACULTY_PROFILE.institute}
                </span>
                <span className="flex items-center gap-1.5" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  <MapPin style={{ width: 14, height: 14 }} />
                  {FACULTY_PROFILE.location}
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-8 grid grid-cols-4 gap-4 rounded-2xl p-4"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            {[
              { label: "Courses", value: FACULTY_PROFILE.stats.courses },
              { label: "Students", value: FACULTY_PROFILE.stats.students },
              { label: "Papers", value: FACULTY_PROFILE.stats.papers },
              { label: "Citations", value: FACULTY_PROFILE.stats.citations },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: ACCENT }}>{value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-5">
            {FACULTY_PROFILE.linkedin && (
              <a
                href={`https://${FACULTY_PROFILE.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#0a66c2" }}
              >
                <Linkedin style={{ width: 14, height: 14 }} />
                LinkedIn
              </a>
            )}
            {FACULTY_PROFILE.researchgate && (
              <a
                href={`https://${FACULTY_PROFILE.researchgate}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#00d0af" }}
              >
                <Globe style={{ width: 14, height: 14 }} />
                ResearchGate
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <SectionCard title="About" icon={BookOpen}>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            {FACULTY_PROFILE.bio}
          </p>
          <div className="mt-5">
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
              Research Expertise
            </div>
            <div className="flex flex-wrap gap-2">
              {FACULTY_PROFILE.expertise.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{ background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Courses Currently Teaching" icon={Users}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COURSES.map((course) => (
              <div
                key={course.name}
                className="p-4 rounded-xl"
                style={{ background: `rgba(${ACCENT_RGB},0.04)`, border: `1px solid rgba(${ACCENT_RGB},0.12)` }}
              >
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  {course.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                  <div>{course.year}</div>
                  <div>{course.schedule}</div>
                  <div>{course.students} students</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Research & Publications" icon={FlaskConical}>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-4 p-4 rounded-xl"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>
                    {pub.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {pub.journal} · {pub.year}
                  </div>
                </div>
                <span
                  className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
                >
                  {pub.citations} citations
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Education" icon={GraduationCap}>
          <div className="space-y-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${ACCENT_RGB},0.1)` }}
                >
                  <GraduationCap style={{ width: 18, height: 18, color: ACCENT }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>
                    {edu.institution}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {edu.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Experience" icon={Briefcase}>
          <div className="space-y-4">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)" }}
                >
                  <Briefcase style={{ width: 18, height: 18, color: "#f59e0b" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 1 }}>
                    {exp.company}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {exp.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
