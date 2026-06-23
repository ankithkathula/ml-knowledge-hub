import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Check, Lock } from "lucide-react";

export function ResetPasswordPage() {
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const valid = pwd.length >= 8 && pwd === pwd2;

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ background: "var(--glass-strong)", border: "var(--border)", boxShadow: "var(--shadow-md)" }}
      >
        {!done ? (
          <>
            <h1 className="text-2xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Set a new password</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Choose a strong password (minimum 8 characters).
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }}
              className="space-y-4"
            >
              {[
                { label: "New password", value: pwd, set: setPwd },
                { label: "Confirm password", value: pwd2, set: setPwd2 },
              ].map((f, i) => (
                <div key={i}>
                  <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
                    {f.label}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <input
                      type={show ? "text" : "password"}
                      required
                      minLength={8}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className="gl-input pl-10 pr-10 text-sm"
                    />
                    {i === 0 && (
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {pwd2 && pwd !== pwd2 && (
                <p className="text-xs" style={{ color: "#ef4444" }}>Passwords don't match.</p>
              )}
              <button
                type="submit"
                disabled={!valid}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium uppercase tracking-wider transition-opacity disabled:opacity-50"
                style={{ background: "var(--accent)", color: "white", letterSpacing: "0.06em" }}
              >
                Update password
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }}>
              <Check className="w-7 h-7" style={{ color: "#22c55e" }} />
            </div>
            <h1 className="text-xl mb-2" style={{ fontWeight: 700, color: "var(--text-primary)" }}>Password updated</h1>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              You can now sign in with your new password.
            </p>
            <Link
              to="/signin"
              className="inline-block px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "white", fontWeight: 500, letterSpacing: "0.06em" }}
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
