import { useState } from "react";
import { Mail, Send } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Newsletter
        </h2>
      </div>

      <div
        className="flex items-center gap-4 p-5 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,106,61,0.08)" }}
        >
          <Mail className="w-5 h-5" style={{ color: "var(--accent)" }} />
        </div>
        <div className="flex-1 min-w-0">
          {subscribed ? (
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#16a34a" }}>
              Subscribed! You will receive weekly updates.
            </p>
          ) : (
            <>
              <p style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>
                Stay Informed
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 1 }}>
                Weekly updates on products, brands & industry trends.
              </p>
            </>
          )}
        </div>
        {!subscribed && (
          <form onSubmit={handleSubscribe} className="flex gap-2 flex-shrink-0">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-lg w-44"
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                fontSize: "0.78rem",
                background: "rgba(255,255,255,0.9)",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg flex items-center gap-1.5 flex-shrink-0"
              style={{ background: "var(--accent)", color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}
            >
              <Send className="w-3.5 h-3.5" /> Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
