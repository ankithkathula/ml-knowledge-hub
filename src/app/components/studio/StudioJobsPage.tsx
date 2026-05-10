import { useState, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Eye,
  Plus,
  Edit3,
  Pause,
  Play,
  XCircle,
  ChevronRight,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Timer,
  X,
  Trash2,
  ExternalLink,
  FileText,
  UserCheck,
  CalendarClock,
  UserX,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type JobTab = "active" | "closed" | "drafts";
type JobStatus = "Active" | "Paused" | "Closed" | "Draft";
type JobType = "Full-time" | "Contract" | "Freelance";
type ApplicantStatus = "Applied" | "Shortlisted" | "Interview" | "Offered" | "Rejected";

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  appliedDate: string;
  status: ApplicantStatus;
  resumeSummary: string;
  portfolioLink: string;
  coverNote: string;
  experience: string;
}

interface PostedJob {
  id: string;
  title: string;
  type: JobType;
  postedDate: string;
  status: JobStatus;
  location: string;
  salaryMin: number;
  salaryMax: number;
  category: string;
  experienceRequired: string;
  description: string;
  requirements: string[];
  views: number;
  applicants: Applicant[];
}

interface NewJobForm {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: JobType;
  salaryMin: string;
  salaryMax: string;
  category: string;
  experienceRequired: string;
}

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_APPLICANTS: Applicant[] = [
  { id: "a1", name: "Priya Sharma", avatar: "PS", appliedDate: "25 Mar 2026", status: "Interview", resumeSummary: "8 years experience in luxury residential interiors. Worked with Lodha Group and Godrej Properties. Proficient in AutoCAD, SketchUp, and V-Ray rendering. Completed 40+ high-end residential projects across Mumbai and Pune.", portfolioLink: "https://priyasharma.design", coverNote: "I am passionate about creating spaces that tell stories. My experience with premium residential projects aligns perfectly with your studio's portfolio. I would love to bring my expertise in material sourcing and client management to your team.", experience: "8 years" },
  { id: "a2", name: "Rohit Mehta", avatar: "RM", appliedDate: "24 Mar 2026", status: "Shortlisted", resumeSummary: "5 years in commercial interior design. Specializes in office spaces and co-working environments. Strong 3D visualization skills. Previously at WeWork India and Awfis.", portfolioLink: "https://rohitmehta.in/portfolio", coverNote: "Your studio's approach to blending functionality with aesthetics resonates with my design philosophy. I have successfully delivered 15+ commercial projects on time and within budget.", experience: "5 years" },
  { id: "a3", name: "Ananya Krishnan", avatar: "AK", appliedDate: "23 Mar 2026", status: "Applied", resumeSummary: "3 years experience, NID Ahmedabad graduate. Skilled in sustainable design practices. Interned at Studio Lotus, Delhi. Published research on biophilic design in Indian urban homes.", portfolioLink: "https://ananyak.design", coverNote: "As an NID graduate with a focus on sustainable interiors, I believe I can contribute fresh perspectives to your projects. I am eager to work on residential projects that prioritize eco-friendly materials.", experience: "3 years" },
  { id: "a4", name: "Vikram Desai", avatar: "VD", appliedDate: "22 Mar 2026", status: "Offered", resumeSummary: "10 years in luxury interior design. Led a team of 6 designers at DesignCafe. Expert in Italian and Scandinavian design aesthetics. Multiple IIID awards recipient.", portfolioLink: "https://vikramdesai.com", coverNote: "With a decade of experience in luxury interiors and a proven track record of award-winning projects, I am confident I can elevate your studio's design output. I bring strong vendor relationships and project management skills.", experience: "10 years" },
  { id: "a5", name: "Meera Joshi", avatar: "MJ", appliedDate: "21 Mar 2026", status: "Shortlisted", resumeSummary: "6 years experience. JJ School of Art alumna. Specializes in hospitality interiors. Worked on 5-star hotel projects in Goa and Rajasthan.", portfolioLink: "https://meerajoshi.design", coverNote: "My background in hospitality interiors has given me a keen eye for detail and guest experience. I am excited about the opportunity to apply these skills to residential luxury projects.", experience: "6 years" },
  { id: "a6", name: "Arjun Nair", avatar: "AN", appliedDate: "20 Mar 2026", status: "Applied", resumeSummary: "4 years in residential interiors. Proficient in Revit and 3ds Max. Completed projects in Kerala and Karnataka. Strong understanding of Vastu principles.", portfolioLink: "https://arjunnair.in", coverNote: "I bring a unique blend of modern design sensibility and traditional Vastu knowledge. My clients have consistently appreciated my ability to balance both aspects in my designs.", experience: "4 years" },
  { id: "a7", name: "Kavitha Reddy", avatar: "KR", appliedDate: "19 Mar 2026", status: "Applied", resumeSummary: "7 years BIM modeling experience. Expert in Revit Architecture and Navisworks. Worked on large-scale commercial and infrastructure projects at L&T and Shapoorji Pallonji.", portfolioLink: "https://kavithareddy.tech", coverNote: "With 7 years of dedicated BIM experience on mega projects, I can bring efficiency and accuracy to your modeling workflows. I am also certified in BIM Level 2 standards.", experience: "7 years" },
  { id: "a8", name: "Sanjay Kulkarni", avatar: "SK", appliedDate: "18 Mar 2026", status: "Shortlisted", resumeSummary: "9 years in BIM coordination. Previously at Tata Projects. Managed clash detection and model coordination for 3 hospitals and 2 metro stations.", portfolioLink: "https://sanjaykulkarni.com", coverNote: "My extensive experience in BIM coordination on complex infrastructure projects makes me well-suited for this role. I am passionate about leveraging technology to improve construction outcomes.", experience: "9 years" },
  { id: "a9", name: "Deepa Menon", avatar: "DM", appliedDate: "17 Mar 2026", status: "Interview", resumeSummary: "5 years as BIM modeler. Autodesk certified. Worked at Dar Al Handasah on Middle East projects. Experienced in MEP and structural modeling.", portfolioLink: "https://deepamenon.design", coverNote: "Having worked on international projects with strict BIM requirements, I understand the importance of model accuracy and LOD standards. I am eager to contribute to your projects.", experience: "5 years" },
  { id: "a10", name: "Rajesh Iyer", avatar: "RI", appliedDate: "16 Mar 2026", status: "Applied", resumeSummary: "12 years as site architect. Managed construction of 4 residential townships and 2 commercial complexes. Strong vendor management and cost estimation skills.", portfolioLink: "https://rajeshiyer.arch", coverNote: "My 12 years of site experience have taught me how to bridge the gap between design intent and construction reality. I can ensure your projects are executed exactly as envisioned.", experience: "12 years" },
  { id: "a11", name: "Sunita Patil", avatar: "SP", appliedDate: "15 Mar 2026", status: "Shortlisted", resumeSummary: "8 years in construction procurement. Expert in material cost optimization. Saved 15% on average procurement costs at Sobha Ltd. Strong network of material suppliers across South India.", portfolioLink: "https://sunitapatil.com", coverNote: "I have a proven track record of reducing procurement costs without compromising quality. My supplier network across India can benefit your studio's projects significantly.", experience: "8 years" },
  { id: "a12", name: "Amit Choudhury", avatar: "AC", appliedDate: "14 Mar 2026", status: "Applied", resumeSummary: "6 years in procurement and supply chain. Previously at Ultratech Cement. Specializes in sustainable and locally sourced materials.", portfolioLink: "https://amitchoudhury.in", coverNote: "My expertise in sustainable procurement aligns with the growing demand for eco-friendly construction. I can help your studio source innovative, green materials at competitive prices.", experience: "6 years" },
  { id: "a13", name: "Lakshmi Venkatesh", avatar: "LV", appliedDate: "13 Mar 2026", status: "Interview", resumeSummary: "10 years in landscape architecture. Designed gardens for 20+ luxury villas in Bengaluru. Expert in tropical and drought-resistant plantscaping.", portfolioLink: "https://lakshmivenkatesh.design", coverNote: "My decade of experience in landscape design, particularly in tropical climates, makes me uniquely qualified for this position. I am passionate about creating outdoor spaces that are both beautiful and sustainable.", experience: "10 years" },
  { id: "a14", name: "Nikhil Gupta", avatar: "NG", appliedDate: "12 Mar 2026", status: "Applied", resumeSummary: "4 years in structural drafting. Proficient in STAAD Pro, ETABS, and AutoCAD Structural. Worked on high-rise buildings up to 40 floors.", portfolioLink: "https://nikhilgupta.tech", coverNote: "I am a detail-oriented structural draftsman who takes pride in producing accurate and clear construction drawings. My experience with high-rise structures has sharpened my understanding of complex structural systems.", experience: "4 years" },
  { id: "a15", name: "Fatima Khan", avatar: "FK", appliedDate: "11 Mar 2026", status: "Shortlisted", resumeSummary: "7 years in structural drafting and design. IIT Bombay graduate. Worked at Arup India. Experienced in steel and RCC structural design.", portfolioLink: "https://fatimakhan.tech", coverNote: "With my IIT education and experience at a global firm like Arup, I bring rigorous engineering standards and innovative problem-solving to structural drafting. I am eager to contribute to your studio.", experience: "7 years" },
  { id: "a16", name: "Harish Bhat", avatar: "HB", appliedDate: "10 Mar 2026", status: "Applied", resumeSummary: "3 years landscape design. CEPT Ahmedabad graduate. Focus on urban public spaces and rooftop gardens. Won national landscape design competition 2024.", portfolioLink: "https://harishbhat.design", coverNote: "As a recent CEPT graduate with award-winning landscape projects, I bring fresh ideas and energy. I am passionate about creating green urban spaces that enhance community well-being.", experience: "3 years" },
];

const INITIAL_JOBS: PostedJob[] = [
  {
    id: "j1",
    title: "Senior Interior Designer",
    type: "Full-time",
    postedDate: "15 Mar 2026",
    status: "Active",
    location: "Mumbai, Maharashtra",
    salaryMin: 800000,
    salaryMax: 1400000,
    category: "Interior Design",
    experienceRequired: "5-10 years",
    description: "We are looking for a Senior Interior Designer to lead residential and commercial projects. The ideal candidate will have a strong portfolio of completed projects, excellent client communication skills, and the ability to manage a small team of junior designers. You will be responsible for concept development, material selection, vendor coordination, and project execution from start to finish.",
    requirements: [
      "Bachelor's degree in Interior Design or Architecture",
      "Minimum 5 years of experience in residential/commercial interiors",
      "Proficiency in AutoCAD, SketchUp, and 3D visualization tools",
      "Strong understanding of materials, finishes, and construction methods",
      "Excellent client presentation and communication skills",
      "Portfolio of at least 10 completed projects",
    ],
    views: 342,
    applicants: [INITIAL_APPLICANTS[0], INITIAL_APPLICANTS[1], INITIAL_APPLICANTS[2], INITIAL_APPLICANTS[3], INITIAL_APPLICANTS[4], INITIAL_APPLICANTS[5]],
  },
  {
    id: "j2",
    title: "BIM Modeler",
    type: "Full-time",
    postedDate: "12 Mar 2026",
    status: "Active",
    location: "Bengaluru, Karnataka",
    salaryMin: 600000,
    salaryMax: 1000000,
    category: "BIM & Technology",
    experienceRequired: "3-7 years",
    description: "Seeking an experienced BIM Modeler to create and manage Building Information Models for our architectural and structural projects. You will work closely with architects and structural engineers to develop detailed 3D models, perform clash detection, and generate construction documentation. Knowledge of Indian building codes and standards is essential.",
    requirements: [
      "Proficiency in Revit Architecture and Navisworks",
      "Experience with BIM Level 2 workflows",
      "Understanding of MEP and structural systems",
      "Ability to manage and coordinate multi-discipline models",
      "Autodesk certification preferred",
      "Experience with large-scale commercial or infrastructure projects",
    ],
    views: 218,
    applicants: [INITIAL_APPLICANTS[6], INITIAL_APPLICANTS[7], INITIAL_APPLICANTS[8]],
  },
  {
    id: "j3",
    title: "Site Architect",
    type: "Contract",
    postedDate: "10 Mar 2026",
    status: "Active",
    location: "Pune, Maharashtra",
    salaryMin: 900000,
    salaryMax: 1500000,
    category: "Architecture",
    experienceRequired: "8-15 years",
    description: "We need an experienced Site Architect for a 2-year residential township project in Pune. The role involves daily site supervision, coordination with contractors and consultants, quality control, and progress reporting. The ideal candidate will have extensive experience managing large residential projects and a thorough understanding of NBC and local building regulations.",
    requirements: [
      "Bachelor's or Master's in Architecture (COA registered)",
      "Minimum 8 years of site experience on large-scale projects",
      "Strong knowledge of NBC and Maharashtra building regulations",
      "Experience in contractor management and cost estimation",
      "Ability to read and interpret structural and MEP drawings",
      "Willingness to be stationed on-site full time",
    ],
    views: 156,
    applicants: [INITIAL_APPLICANTS[9]],
  },
  {
    id: "j4",
    title: "Material Procurement Specialist",
    type: "Full-time",
    postedDate: "8 Mar 2026",
    status: "Paused",
    location: "Chennai, Tamil Nadu",
    salaryMin: 500000,
    salaryMax: 800000,
    category: "Procurement",
    experienceRequired: "4-8 years",
    description: "Looking for a Material Procurement Specialist to manage sourcing, vendor relationships, and cost optimization for all construction materials. You will be responsible for maintaining quality standards while negotiating competitive prices. The role requires building and maintaining a network of reliable suppliers for materials including cement, steel, tiles, sanitary ware, and specialty finishes.",
    requirements: [
      "Degree in Civil Engineering, Supply Chain, or related field",
      "4+ years in construction material procurement",
      "Strong negotiation and vendor management skills",
      "Knowledge of material testing and quality standards",
      "Proficiency in procurement software and Excel",
      "Existing network of material suppliers preferred",
    ],
    views: 89,
    applicants: [INITIAL_APPLICANTS[10], INITIAL_APPLICANTS[11]],
  },
  {
    id: "j5",
    title: "Landscape Designer",
    type: "Freelance",
    postedDate: "5 Mar 2026",
    status: "Active",
    location: "Bengaluru, Karnataka",
    salaryMin: 400000,
    salaryMax: 700000,
    category: "Landscape Design",
    experienceRequired: "3-8 years",
    description: "Seeking a talented Landscape Designer for multiple villa projects in Bengaluru. This is a freelance engagement covering design development, planting plans, hardscape detailing, and irrigation layout. The designer will work on 5-6 luxury villa gardens over a period of 8-10 months. Experience with tropical and drought-resistant landscaping is highly valued.",
    requirements: [
      "Degree in Landscape Architecture or related field",
      "3+ years of landscape design experience",
      "Proficiency in AutoCAD and landscape visualization tools",
      "Knowledge of native and tropical plant species",
      "Understanding of irrigation and drainage systems",
      "Portfolio of completed residential landscape projects",
    ],
    views: 134,
    applicants: [INITIAL_APPLICANTS[12], INITIAL_APPLICANTS[15]],
  },
  {
    id: "j6",
    title: "Structural Draftsman",
    type: "Contract",
    postedDate: "1 Mar 2026",
    status: "Closed",
    location: "Hyderabad, Telangana",
    salaryMin: 350000,
    salaryMax: 550000,
    category: "Structural Engineering",
    experienceRequired: "2-5 years",
    description: "Required a Structural Draftsman for a 6-month contract to prepare detailed structural drawings for a commercial complex. The draftsman will work under the supervision of our lead structural engineer to produce RCC and steel structural drawings, bar bending schedules, and foundation details. Accuracy and adherence to IS codes are critical.",
    requirements: [
      "Diploma or Degree in Civil/Structural Engineering",
      "Proficiency in AutoCAD and STAAD Pro",
      "Experience in preparing RCC and steel structural drawings",
      "Knowledge of IS codes for structural design",
      "Ability to prepare bar bending schedules",
      "Attention to detail and accuracy in drafting",
    ],
    views: 267,
    applicants: [INITIAL_APPLICANTS[13], INITIAL_APPLICANTS[14]],
  },
];

/* ------------------------------------------------------------------ */
/*  STYLE HELPERS                                                      */
/* ------------------------------------------------------------------ */

const STATUS_BADGE: Record<JobStatus, { bg: string; text: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#16a34a" },
  Paused: { bg: "rgba(245,158,11,0.12)", text: "#d97706" },
  Closed: { bg: "rgba(107,114,128,0.12)", text: "#6b7280" },
  Draft: { bg: "rgba(139,92,246,0.12)", text: "#7c3aed" },
};

const TYPE_BADGE: Record<JobType, { bg: string; text: string }> = {
  "Full-time": { bg: "rgba(34,197,94,0.10)", text: "#16a34a" },
  Contract: { bg: "rgba(245,158,11,0.10)", text: "#d97706" },
  Freelance: { bg: "rgba(139,92,246,0.10)", text: "#7c3aed" },
};

const APPLICANT_STATUS_COLOR: Record<ApplicantStatus, { bg: string; text: string; border: string }> = {
  Applied: { bg: "rgba(59,130,246,0.10)", text: "#3b82f6", border: "rgba(59,130,246,0.25)" },
  Shortlisted: { bg: "rgba(245,158,11,0.10)", text: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  Interview: { bg: "rgba(139,92,246,0.10)", text: "#8b5cf6", border: "rgba(139,92,246,0.25)" },
  Offered: { bg: "rgba(34,197,94,0.10)", text: "#22c55e", border: "rgba(34,197,94,0.25)" },
  Rejected: { bg: "rgba(239,68,68,0.10)", text: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

const PIPELINE_STAGES: ApplicantStatus[] = ["Applied", "Shortlisted", "Interview", "Offered"];
const PIPELINE_COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#22c55e"];

function formatSalary(val: number): string {
  if (val >= 100000) return `${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
  return val.toString();
}

const EMPTY_FORM: NewJobForm = {
  title: "",
  description: "",
  requirements: [""],
  location: "",
  type: "Full-time",
  salaryMin: "",
  salaryMax: "",
  category: "",
  experienceRequired: "",
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function StudioJobsPage() {
  const [jobs, setJobs] = useState<PostedJob[]>(INITIAL_JOBS);
  const [activeTab, setActiveTab] = useState<JobTab>("active");
  const [showPostModal, setShowPostModal] = useState(false);
  const [viewApplicantsJobId, setViewApplicantsJobId] = useState<string | null>(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [newJob, setNewJob] = useState<NewJobForm>({ ...EMPTY_FORM });
  const [newReqInput, setNewReqInput] = useState("");

  /* Derived data */
  const activeJobs = useMemo(() => jobs.filter((j) => j.status === "Active" || j.status === "Paused"), [jobs]);
  const closedJobs = useMemo(() => jobs.filter((j) => j.status === "Closed"), [jobs]);
  const draftJobs = useMemo(() => jobs.filter((j) => j.status === "Draft"), [jobs]);

  const totalApplicants = useMemo(() => jobs.reduce((s, j) => s + j.applicants.length, 0), [jobs]);
  const positionsFilled = useMemo(() => jobs.reduce((s, j) => s + j.applicants.filter((a) => a.status === "Offered").length, 0), [jobs]);

  const listToShow = activeTab === "active" ? activeJobs : activeTab === "closed" ? closedJobs : draftJobs;

  const viewingJob = jobs.find((j) => j.id === viewApplicantsJobId) ?? null;
  const selectedApplicant = viewingJob?.applicants.find((a) => a.id === selectedApplicantId) ?? null;

  /* Actions */
  const toggleJobStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j;
        if (j.status === "Active") return { ...j, status: "Paused" as JobStatus };
        if (j.status === "Paused") return { ...j, status: "Active" as JobStatus };
        return j;
      })
    );
  };

  const closeJob = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "Closed" as JobStatus } : j)));
  };

  const updateApplicantStatus = (jobId: string, applicantId: string, newStatus: ApplicantStatus) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        return { ...j, applicants: j.applicants.map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a)) };
      })
    );
  };

  const getPipelineCounts = (applicants: Applicant[]) => {
    return PIPELINE_STAGES.map((stage) => applicants.filter((a) => a.status === stage).length);
  };

  const handlePostJob = (asDraft: boolean) => {
    const reqs = newJob.requirements.filter((r) => r.trim() !== "");
    const job: PostedJob = {
      id: `j${Date.now()}`,
      title: newJob.title,
      type: newJob.type,
      postedDate: "1 Apr 2026",
      status: asDraft ? "Draft" : "Active",
      location: newJob.location,
      salaryMin: parseInt(newJob.salaryMin) || 0,
      salaryMax: parseInt(newJob.salaryMax) || 0,
      category: newJob.category,
      experienceRequired: newJob.experienceRequired,
      description: newJob.description,
      requirements: reqs.length > 0 ? reqs : ["To be specified"],
      views: 0,
      applicants: [],
    };
    setJobs((prev) => [job, ...prev]);
    setNewJob({ ...EMPTY_FORM });
    setShowPostModal(false);
    if (asDraft) setActiveTab("drafts");
  };

  const addRequirement = () => {
    if (newReqInput.trim()) {
      setNewJob((prev) => ({ ...prev, requirements: [...prev.requirements.filter((r) => r.trim()), newReqInput.trim(), ""] }));
      setNewReqInput("");
    }
  };

  const removeRequirement = (idx: number) => {
    setNewJob((prev) => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== idx) }));
  };

  /* ---------------------------------------------------------------- */
  /*  TABS CONFIG                                                      */
  /* ---------------------------------------------------------------- */

  const tabs: { key: JobTab; label: string; count: number }[] = [
    { key: "active", label: "Active Jobs", count: activeJobs.length },
    { key: "closed", label: "Closed Jobs", count: closedJobs.length },
    { key: "drafts", label: "Drafts", count: draftJobs.length },
  ];

  /* ---------------------------------------------------------------- */
  /*  RENDER                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-orange-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent-light)" }}
              >
                <Briefcase className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </div>
              <h1 className="text-3xl" style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                Job Postings
              </h1>
            </div>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => setShowPostModal(true)}
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Listings", value: activeJobs.filter((j) => j.status === "Active").length.toString(), icon: <Briefcase className="w-4 h-4" />, color: "#16a34a" },
              { label: "Total Applicants", value: totalApplicants.toString(), icon: <Users className="w-4 h-4" />, color: "#3b82f6" },
              { label: "Positions Filled", value: positionsFilled.toString(), icon: <CheckCircle2 className="w-4 h-4" />, color: "#8b5cf6" },
              { label: "Avg Time to Hire", value: "18 days", icon: <Timer className="w-4 h-4" />, color: "#f59e0b" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card !p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${stat.color}15`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-6 glass-card !p-1 !rounded-xl w-fit">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeTab === t.key ? "var(--accent)" : "transparent",
                  color: activeTab === t.key ? "#fff" : "var(--text-secondary)",
                  boxShadow: activeTab === t.key ? "0 2px 8px rgba(255,106,61,0.3)" : "none",
                }}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* JOB LISTINGS                                                  */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {listToShow.length === 0 ? (
          <div className="glass-card text-center py-16 mt-4">
            <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              No {activeTab === "active" ? "active" : activeTab === "closed" ? "closed" : "draft"} jobs
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {activeTab === "drafts"
                ? "Save a job as draft to see it here."
                : "Post a new job to get started."}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {listToShow.map((job) => {
              const pipeline = getPipelineCounts(job.applicants);
              const totalPipeline = job.applicants.length || 1;

              return (
                <div key={job.id} className="glass-card hover-lift !p-0 overflow-hidden">
                  <div className="p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                            {job.title}
                          </h3>
                          <span
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: TYPE_BADGE[job.type].bg, color: TYPE_BADGE[job.type].text }}
                          >
                            {job.type}
                          </span>
                          <span
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: STATUS_BADGE[job.status].bg, color: STATUS_BADGE[job.status].text }}
                          >
                            {job.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            <IndianRupee className="w-3 h-3" />
                            {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} / yr
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            <Clock className="w-3 h-3" />
                            Posted {job.postedDate}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            <Eye className="w-3 h-3" />
                            {job.views} views
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Applicant Pipeline */}
                    {job.applicants.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                            {job.applicants.length} Applicant{job.applicants.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        {/* Pipeline bar */}
                        <div className="flex items-center gap-0 rounded-full overflow-hidden h-2.5" style={{ background: "rgba(0,0,0,0.06)" }}>
                          {pipeline.map((count, i) =>
                            count > 0 ? (
                              <div
                                key={i}
                                style={{
                                  width: `${(count / totalPipeline) * 100}%`,
                                  background: PIPELINE_COLORS[i],
                                  height: "100%",
                                }}
                              />
                            ) : null
                          )}
                        </div>
                        {/* Pipeline legend */}
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          {PIPELINE_STAGES.map((stage, i) => (
                            <span key={stage} className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
                              <span className="w-2 h-2 rounded-full inline-block" style={{ background: PIPELINE_COLORS[i] }} />
                              {stage} ({pipeline[i]})
                              {i < PIPELINE_STAGES.length - 1 && (
                                <ArrowRight className="w-3 h-3 ml-1" style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      {job.status !== "Draft" && (
                        <button
                          className="btn-primary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                          onClick={() => {
                            setViewApplicantsJobId(job.id);
                            setSelectedApplicantId(null);
                          }}
                        >
                          <Users className="w-3.5 h-3.5" />
                          View Applicants ({job.applicants.length})
                        </button>
                      )}
                      <button className="btn-secondary !text-xs !py-1.5 !px-3 flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      {(job.status === "Active" || job.status === "Paused") && (
                        <button
                          className="btn-secondary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                          onClick={() => toggleJobStatus(job.id)}
                        >
                          {job.status === "Active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {job.status === "Active" ? "Pause" : "Resume"}
                        </button>
                      )}
                      {job.status !== "Closed" && job.status !== "Draft" && (
                        <button
                          className="btn-secondary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                          style={{ color: "#ef4444" }}
                          onClick={() => closeJob(job.id)}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* VIEW APPLICANTS PANEL (Slide-over)                           */}
      {/* ============================================================ */}
      {viewingJob && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setViewApplicantsJobId(null);
              setSelectedApplicantId(null);
            }
          }}
        >
          <div
            className="w-full max-w-2xl h-full overflow-y-auto"
            style={{ background: "var(--bg-base)", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)" }}
          >
            {/* Panel Header */}
            <div className="sticky top-0 z-10 p-5 border-b" style={{ background: "var(--bg-base)", borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    Applicants for {viewingJob.title}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {viewingJob.applicants.length} total applicants
                  </p>
                </div>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                  onClick={() => {
                    setViewApplicantsJobId(null);
                    setSelectedApplicantId(null);
                  }}
                >
                  <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                </button>
              </div>
            </div>

            {viewingJob.applicants.length === 0 ? (
              <div className="p-10 text-center">
                <Users className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No applicants yet.</p>
              </div>
            ) : selectedApplicant ? (
              /* ------ Applicant Detail View ------ */
              <div className="p-5">
                <button
                  className="flex items-center gap-1 text-xs font-medium mb-4"
                  style={{ color: "var(--accent)" }}
                  onClick={() => setSelectedApplicantId(null)}
                >
                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                  Back to all applicants
                </button>

                <div className="glass-card !p-5">
                  {/* Applicant header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      {selectedApplicant.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                        {selectedApplicant.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Applied {selectedApplicant.appliedDate} &middot; {selectedApplicant.experience} experience
                      </p>
                      <span
                        className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1.5"
                        style={{
                          background: APPLICANT_STATUS_COLOR[selectedApplicant.status].bg,
                          color: APPLICANT_STATUS_COLOR[selectedApplicant.status].text,
                          border: `1px solid ${APPLICANT_STATUS_COLOR[selectedApplicant.status].border}`,
                        }}
                      >
                        {selectedApplicant.status}
                      </span>
                    </div>
                  </div>

                  {/* Resume Summary */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Resume Summary</h4>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {selectedApplicant.resumeSummary}
                    </p>
                  </div>

                  {/* Portfolio */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Portfolio</h4>
                    </div>
                    <a
                      href={selectedApplicant.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {selectedApplicant.portfolioLink}
                    </a>
                  </div>

                  {/* Cover Note */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Cover Note</h4>
                    </div>
                    <div
                      className="p-4 rounded-xl text-sm leading-relaxed"
                      style={{ background: "var(--accent-light)", color: "var(--text-secondary)" }}
                    >
                      {selectedApplicant.coverNote}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 flex-wrap pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <span className="text-xs font-medium mr-1" style={{ color: "var(--text-muted)" }}>Actions:</span>
                    {selectedApplicant.status !== "Shortlisted" && selectedApplicant.status !== "Interview" && selectedApplicant.status !== "Offered" && (
                      <button
                        className="btn-primary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                        onClick={() => updateApplicantStatus(viewingJob.id, selectedApplicant.id, "Shortlisted")}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Shortlist
                      </button>
                    )}
                    {selectedApplicant.status !== "Interview" && selectedApplicant.status !== "Offered" && (
                      <button
                        className="btn-secondary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                        onClick={() => updateApplicantStatus(viewingJob.id, selectedApplicant.id, "Interview")}
                      >
                        <CalendarClock className="w-3.5 h-3.5" />
                        Schedule Interview
                      </button>
                    )}
                    {selectedApplicant.status !== "Rejected" && (
                      <button
                        className="btn-secondary !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                        style={{ color: "#ef4444" }}
                        onClick={() => updateApplicantStatus(viewingJob.id, selectedApplicant.id, "Rejected")}
                      >
                        <UserX className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ------ Applicants List ------ */
              <div className="p-5 space-y-3">
                {viewingJob.applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="glass-card hover-lift !p-4 cursor-pointer"
                    onClick={() => setSelectedApplicantId(applicant.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        {applicant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                            {applicant.name}
                          </h4>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              background: APPLICANT_STATUS_COLOR[applicant.status].bg,
                              color: APPLICANT_STATUS_COLOR[applicant.status].text,
                              border: `1px solid ${APPLICANT_STATUS_COLOR[applicant.status].border}`,
                            }}
                          >
                            {applicant.status}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          Applied {applicant.appliedDate} &middot; {applicant.experience} exp.
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                    </div>

                    {/* Inline quick actions */}
                    <div className="flex items-center gap-2 mt-3 pl-[52px]">
                      {applicant.status !== "Shortlisted" && applicant.status !== "Interview" && applicant.status !== "Offered" && (
                        <button
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
                          style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateApplicantStatus(viewingJob.id, applicant.id, "Shortlisted");
                          }}
                        >
                          <UserCheck className="w-3 h-3" />
                          Shortlist
                        </button>
                      )}
                      {applicant.status !== "Interview" && applicant.status !== "Offered" && (
                        <button
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
                          style={{ background: "rgba(139,92,246,0.08)", color: "#8b5cf6" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateApplicantStatus(viewingJob.id, applicant.id, "Interview");
                          }}
                        >
                          <CalendarClock className="w-3 h-3" />
                          Interview
                        </button>
                      )}
                      {applicant.status !== "Rejected" && (
                        <button
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateApplicantStatus(viewingJob.id, applicant.id, "Rejected");
                          }}
                        >
                          <UserX className="w-3 h-3" />
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* POST NEW JOB MODAL                                           */}
      {/* ============================================================ */}
      {showPostModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPostModal(false);
          }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-base)", boxShadow: "0 24px 48px rgba(0,0,0,0.2)" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Post New Job
              </h2>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.06)" }}
                onClick={() => setShowPostModal(false)}
              >
                <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    className="gl-input w-full"
                    placeholder="e.g. Senior Interior Designer"
                    value={newJob.title}
                    onChange={(e) => setNewJob((p) => ({ ...p, title: e.target.value }))}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Job Description *
                  </label>
                  <textarea
                    className="gl-input w-full"
                    rows={5}
                    placeholder="Describe the role, responsibilities, and what makes it exciting..."
                    value={newJob.description}
                    onChange={(e) => setNewJob((p) => ({ ...p, description: e.target.value }))}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Requirements
                  </label>
                  <div className="space-y-2">
                    {newJob.requirements.filter((r) => r.trim()).map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                        <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{req}</span>
                        <button onClick={() => removeRequirement(idx)}>
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="gl-input flex-1"
                        placeholder="Add a requirement..."
                        value={newReqInput}
                        onChange={(e) => setNewReqInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRequirement();
                          }
                        }}
                      />
                      <button
                        className="btn-secondary !text-xs !py-2 !px-3"
                        onClick={addRequirement}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two-column row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      className="gl-input w-full"
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={newJob.location}
                      onChange={(e) => setNewJob((p) => ({ ...p, location: e.target.value }))}
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                      Job Type *
                    </label>
                    <select
                      className="gl-input w-full"
                      value={newJob.type}
                      onChange={(e) => setNewJob((p) => ({ ...p, type: e.target.value as JobType }))}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                    Salary Range (INR per annum)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                      <input
                        type="number"
                        className="gl-input w-full"
                        style={{ paddingLeft: "2rem" }}
                        placeholder="Min e.g. 600000"
                        value={newJob.salaryMin}
                        onChange={(e) => setNewJob((p) => ({ ...p, salaryMin: e.target.value }))}
                      />
                    </div>
                    <div className="relative">
                      <IndianRupee className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                      <input
                        type="number"
                        className="gl-input w-full"
                        style={{ paddingLeft: "2rem" }}
                        placeholder="Max e.g. 1000000"
                        value={newJob.salaryMax}
                        onChange={(e) => setNewJob((p) => ({ ...p, salaryMax: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Two-column row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                      Category
                    </label>
                    <input
                      type="text"
                      className="gl-input w-full"
                      placeholder="e.g. Interior Design"
                      value={newJob.category}
                      onChange={(e) => setNewJob((p) => ({ ...p, category: e.target.value }))}
                    />
                  </div>

                  {/* Experience Required */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-secondary)" }}>
                      Experience Required
                    </label>
                    <input
                      type="text"
                      className="gl-input w-full"
                      placeholder="e.g. 3-5 years"
                      value={newJob.experienceRequired}
                      onChange={(e) => setNewJob((p) => ({ ...p, experienceRequired: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <button
                className="btn-secondary flex items-center gap-2"
                onClick={() => handlePostJob(true)}
                disabled={!newJob.title.trim()}
              >
                Save as Draft
              </button>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => handlePostJob(false)}
                disabled={!newJob.title.trim() || !newJob.description.trim() || !newJob.location.trim()}
              >
                <TrendingUp className="w-4 h-4" />
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
