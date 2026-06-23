import { useState } from "react";
import { useParams, Link } from "react-router";
import { CheckCircle, Clock, Shield, User, ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import { WORK_VERIFICATIONS, VERIFIER_PROFILES, type Endorsement } from "../data/verificationData";
import { DESIGNER_PROFILE, CAREER_HISTORY } from "../data/designerData";

const RELATIONSHIPS = ["Direct Manager", "Colleague", "HR", "Client", "Mentor"] as const;

function EndorserCard({ e }: { e: Endorsement }) {
  const verifier = VERIFIER_PROFILES.find((v) => v.id === e.verifierId);
  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
        style={{ backgroundColor: verifier?.accentColor ?? "#6b7280" }}
      >
        {e.verifierInitials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/designer/${e.verifierId}`}
            className="font-semibold text-gray-900 hover:text-violet-700 transition-colors text-sm"
          >
            {e.verifierName}
          </Link>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{e.relationship}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          {e.verifierRole} · {e.verifierCompany}
        </p>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">"{e.comment}"</p>
        <p className="text-xs text-gray-400 mt-1.5">
          Verified {new Date(e.verifiedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>
      {verifier && (
        <Link to={`/designer/${e.verifierId}`} className="flex-shrink-0 text-gray-400 hover:text-violet-600 transition-colors">
          <ExternalLink size={14} />
        </Link>
      )}
    </div>
  );
}

function SuccessState({ name, company }: { name: string; company: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle size={32} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Verification submitted</h2>
      <p className="text-gray-500 max-w-sm">
        Thank you, {name}. Your endorsement of {DESIGNER_PROFILE.name}'s work at {company} has been recorded. This helps build trust in the design community.
      </p>
      <Link
        to={`/designer/${DESIGNER_PROFILE.id}`}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
      >
        View {DESIGNER_PROFILE.name}'s profile
        <ExternalLink size={14} />
      </Link>
    </div>
  );
}

export function WorkVerificationPage() {
  const { companySlug, candidateSlug } = useParams<{ companySlug: string; candidateSlug: string }>();

  const verification = WORK_VERIFICATIONS.find(
    (v) => v.companySlug === companySlug && v.candidateSlug === candidateSlug
  );

  const experience = verification
    ? CAREER_HISTORY.find((e) => e.id === verification.experienceId)
    : null;

  const [form, setForm] = useState({
    name: "",
    role: "",
    relationship: "" as (typeof RELATIONSHIPS)[number] | "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.role.trim()) e.role = "Your role is required";
    if (!form.relationship) e.relationship = "Please select your relationship";
    if (form.comment.trim().length < 20) e.comment = "Please write at least 20 characters";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  }

  if (!verification || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <Shield size={40} className="text-gray-300" />
        <p className="text-lg font-medium">Verification link not found</p>
        <p className="text-sm">This link may be invalid or expired.</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">Back to home</Link>
      </div>
    );
  }

  const companyName = verification.companyName;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <Link to={`/designer/${DESIGNER_PROFILE.id}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          Back to profile
        </Link>
        <span className="text-gray-200">|</span>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-violet-600" />
          <span className="text-sm font-medium text-gray-700">Work Experience Verification</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* Candidate + experience card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-lg flex-shrink-0">
              {DESIGNER_PROFILE.initials}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">{DESIGNER_PROFILE.name}</h1>
              <p className="text-sm text-gray-500">{DESIGNER_PROFILE.headline}</p>
              <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Role being verified</p>
                <p className="text-sm font-semibold text-gray-900">{experience.role}</p>
                <p className="text-sm text-gray-600">{companyName} · {experience.period}</p>
              </div>
            </div>
          </div>

          {/* Verification status */}
          <div className="mt-4 flex items-center gap-2">
            {verification.status === "verified" ? (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium border border-green-100">
                <CheckCircle size={12} /> Verified by {verification.endorsements.length} people
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-100">
                <Clock size={12} /> Pending verification
              </span>
            )}
          </div>
        </div>

        {/* Existing endorsers */}
        {verification.endorsements.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={15} className="text-violet-500" />
              Already verified by
            </h2>
            <div className="space-y-3">
              {verification.endorsements.map((e) => (
                <EndorserCard key={e.verifierId} e={e} />
              ))}
            </div>
          </div>
        )}

        {/* Verification form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {submitted ? (
            <SuccessState name={form.name} company={companyName} />
          ) : (
            <>
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                Verify {DESIGNER_PROFILE.name}'s work at {companyName}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                If you worked with {DESIGNER_PROFILE.name} at {companyName}, your endorsement helps verify their experience and builds trust.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your full name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Priya Kapoor"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-violet-400"}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your role at {companyName}</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    placeholder="e.g. Senior Architect"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${errors.role ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-violet-400"}`}
                  />
                  {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your relationship to {DESIGNER_PROFILE.name}</label>
                  <div className="relative">
                    <select
                      value={form.relationship}
                      onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value as typeof form.relationship }))}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none appearance-none transition-colors ${errors.relationship ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-violet-400"} ${!form.relationship ? "text-gray-400" : "text-gray-900"}`}
                    >
                      <option value="" disabled>Select relationship</option>
                      {RELATIONSHIPS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.relationship && <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your endorsement</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    rows={4}
                    placeholder={`Describe your experience working with ${DESIGNER_PROFILE.name} at ${companyName}. What did they work on? What were they like to work with?`}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none transition-colors ${errors.comment ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-violet-400"}`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.comment ? (
                      <p className="text-xs text-red-500">{errors.comment}</p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-gray-400">{form.comment.length} chars</p>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  By submitting, you confirm that the information is accurate to the best of your knowledge. False verifications may be reported and removed.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 active:scale-[0.98] transition-all"
                >
                  Submit verification
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 pb-6">
          Verifications are displayed publicly on {DESIGNER_PROFILE.name}'s profile.{" "}
          <Link to={`/designer/${DESIGNER_PROFILE.id}`} className="text-violet-500 hover:underline">
            View profile →
          </Link>
        </p>
      </div>
    </div>
  );
}
