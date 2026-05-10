import { useState } from "react";
import { Link } from "react-router";
import {
  MapPin, Clock, Smartphone, Users, Package, MessageCircle,
  ChevronDown, ChevronUp, ArrowRight, Sparkles, Eye, Star,
  CalendarDays
} from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

const kcLocations = [
  { city: "Gurugram", address: "Plot 42, Sector 44, Gurugram, Haryana 122003", hours: "Mon-Sat, 10:00 AM - 6:00 PM", features: ["Touch-and-Feel Zone", "AR Experience Lab", "Expert Guidance", "Free Parking"] },
  { city: "Bengaluru", address: "2nd Floor, Whitefield Tech Park, Bengaluru, Karnataka 560066", hours: "Mon-Sat, 10:00 AM - 6:00 PM", features: ["Touch-and-Feel Zone", "AR Experience Lab", "Expert Guidance", "Cafe Lounge"] },
  { city: "Mumbai", address: "Unit 15, Andheri East Business Hub, Mumbai, Maharashtra 400069", hours: "Mon-Sat, 10:00 AM - 7:00 PM", features: ["Touch-and-Feel Zone", "AR Experience Lab", "Expert Guidance", "Client Meeting Rooms"] },
  { city: "Chennai", address: "3rd Floor, T. Nagar Commercial Complex, Chennai, Tamil Nadu 600017", hours: "Mon-Sat, 10:00 AM - 6:00 PM", features: ["Touch-and-Feel Zone", "AR Experience Lab", "Expert Guidance", "Workshop Space"] },
  { city: "Hyderabad", address: "Tower B, HITEC City, Hyderabad, Telangana 500081", hours: "Mon-Sat, 10:00 AM - 6:00 PM", features: ["Touch-and-Feel Zone", "AR Experience Lab", "Expert Guidance", "Sample Takeaway"] },
];

const whatToExpect = [
  { title: "Material Samples", description: "Browse and touch thousands of material samples from tiles, stones, wood, laminates, paints, and more from 200+ brands.", icon: Package, color: "#3b82f6" },
  { title: "Expert Guidance", description: "Our material specialists help you choose the right products for your project requirements and budget.", icon: Users, color: "#10b981" },
  { title: "AR Visualization", description: "Use augmented reality to see how materials look in your actual space before making decisions.", icon: Smartphone, color: "#a855f7" },
  { title: "Free Consultation", description: "Book a free one-on-one session with our design consultants for personalized material recommendations.", icon: MessageCircle, color: "#ff6a3d" },
];

const faqs = [
  { q: "Do I need to book an appointment?", a: "Walk-ins are welcome, but we recommend booking an appointment to ensure our material specialists are available for a guided experience. You can book through your dashboard or call the center directly." },
  { q: "Can I take material samples home?", a: "Yes! Most of our KC locations allow you to take small sample swatches for free. Larger samples can be requested through our sample request system with a small refundable deposit." },
  { q: "Is there a fee to visit a Knowledge Center?", a: "No, visiting our Knowledge Centers is completely free. All services including expert guidance, AR visualization, and consultation are complimentary." },
  { q: "How long does a typical visit take?", a: "A self-guided visit typically takes 45-60 minutes. If you book an expert consultation, plan for 1.5-2 hours to get the most out of your visit." },
  { q: "Can I bring my clients to the Knowledge Center?", a: "Absolutely! Many architects and designers bring their clients for a hands-on material selection experience. We have dedicated client meeting rooms at select locations." },
];

export function KcInfoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,106,61,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.15 }}>
            Visit Our Material<br />
            <span style={{ color: "var(--accent)" }}>Knowledge Centers</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: 14, maxWidth: 620, marginInline: "auto", lineHeight: 1.7 }}>
            Experience construction materials firsthand. Touch, feel, and compare thousands of products from leading brands — all under one roof. Our expert team is ready to guide you through the perfect material selection for your project.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { label: "Locations", value: "5", icon: MapPin },
              { label: "Brands", value: "200+", icon: Star },
              { label: "Samples", value: "10,000+", icon: Package },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <Icon size={20} className="mx-auto mb-1" style={{ color: "var(--accent)" }} />
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent)" }}>{s.value}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-16">
        {/* KC Locations Grid */}
        <section>
          <h2 className="text-center mb-8" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kcLocations.map((loc) => (
              <div key={loc.city} className="glass-card hover-lift rounded-xl overflow-hidden">
                <div className="h-36 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.08), rgba(59,130,246,0.08))" }}>
                  <div className="text-center">
                    <MapPin size={28} className="mx-auto mb-2" style={{ color: "var(--accent)" }} />
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{loc.city}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2 mb-3" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <Clock size={14} style={{ color: "var(--text-muted)" }} />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.features.map((f) => (
                      <span key={f} className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section>
          <h2 className="text-center mb-2" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>What to Expect</h2>
          <p className="text-center mb-8" style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>Everything you need for an informed material selection</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatToExpect.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card hover-lift rounded-xl p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon size={26} style={{ color: item.color }} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Book a Visit CTA */}
        <section className="glass-card rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, rgba(255,106,61,0.08), rgba(255,106,61,0.02))", border: "1px solid rgba(255,106,61,0.15)" }}>
          <Sparkles size={32} className="mx-auto mb-4" style={{ color: "var(--accent)" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>Schedule Your Visit Today</h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: 500, marginInline: "auto", lineHeight: 1.7 }}>
            Book a free visit to any of our Knowledge Centers. Our material specialists will help you find the perfect materials for your next project.
          </p>
          <Link to="/u/kc-visits" className="btn-primary inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-xl text-base font-semibold">
            <CalendarDays size={18} />
            Book a Visit
            <ArrowRight size={16} />
          </Link>
        </section>

        {/* FAQ Accordion */}
        <section>
          <h2 className="text-center mb-8" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 cursor-pointer text-left" style={{ color: "var(--text-primary)" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
