import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowRight, Check } from "lucide-react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-md)" }}
      >
        {!sent ? (
          <>
            <h1 className="text-2xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Forgot password?</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Enter the email address associated with your account and we'll send you a reset link.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="gl-input pl-10 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium uppercase tracking-wider"
                style={{ background: "var(--accent)", color: "white", letterSpacing: "0.06em" }}
              >
                Send reset link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
              Remembered it?{" "}
              <Link to="/signin" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign in</Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(255,106,61,0.12)" }}
            >
              <Check className="w-7 h-7" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Check your email</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              We've sent a reset link to <strong>{email}</strong>. The link expires in 30 minutes.
            </p>
            <Link
              to="/signin"
              className="inline-block px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
