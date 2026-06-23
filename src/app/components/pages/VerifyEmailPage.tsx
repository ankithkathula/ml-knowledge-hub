import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";

export function VerifyEmailPage() {
  const [state] = useState<"verified" | "expired">("verified");

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-md)" }}
      >
        {state === "verified" ? (
          <>
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }}>
              <CheckCircle2 className="w-7 h-7" style={{ color: "#22c55e" }} />
            </div>
            <h1 className="text-xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Email verified</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Thanks — your email is confirmed. Continue to your dashboard.
            </p>
            <Link
              to="/u"
              className="inline-block px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              Go to dashboard
            </Link>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
              <AlertCircle className="w-7 h-7" style={{ color: "#ef4444" }} />
            </div>
            <h1 className="text-xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Link expired</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              This verification link has expired. Request a fresh one to continue.
            </p>
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              <Mail className="w-4 h-4" /> Send new link
            </button>
          </>
        )}
      </div>
    </div>
  );
}
