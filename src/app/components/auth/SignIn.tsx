import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import architectureImage from "figma:asset/6344822aa737b77519536de928132bd8c7576482.png";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export type DemoRole = "designer" | "brand" | "institute" | "student" | "faculty" | "studio" | "retail" | "dealer";

interface SignInProps {
  onLogin?: (role: DemoRole) => void;
  onAdminLogin?: () => void;
  // legacy callbacks kept for compat
  onBrandDashboard?: () => void;
  onSuccess?: () => void;
  onInstituteDashboard?: () => void;
}

const DEMO_USERS: { role: DemoRole; label: string; email: string; password: string; color: string }[] = [
  { role: "designer",  label: "Designer",         email: "ankit.sharma@design.in", password: "Ankit@123",   color: "#8b5cf6" },
  { role: "student",   label: "Student",           email: "priya@student.ml",       password: "Student@123", color: "#6366f1" },
  { role: "faculty",   label: "Faculty",           email: "ravi@faculty.ml",        password: "Faculty@123", color: "#0ea5e9" },
  { role: "brand",     label: "Brand",             email: "abg@test.com",           password: "Aditya@123",  color: "#d32f2f" },
  { role: "studio",    label: "Studio",            email: "studio@bdp.in",          password: "Studio@123",  color: "#FF6A3D" },
  { role: "institute", label: "Institute",         email: "admin@rics.in",          password: "RICS@123",    color: "#2563eb" },
  { role: "retail",    label: "Retail Customer",   email: "sam@retail.ml",          password: "Retail@123",  color: "#16a34a" },
  { role: "dealer",   label: "Dealer",             email: "dealer@buildmart.in",    password: "Dealer@123",  color: "#f59e0b" },
];

export default function SignIn({ onLogin, onAdminLogin, onBrandDashboard, onSuccess, onInstituteDashboard }: SignInProps = {}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab] = useState<'login'>('login');
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const match = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (match) {
      fireLogin(match.role);
      return;
    }
    setError('Invalid credentials. Please try again.');
  };

  function fireLogin(role: DemoRole) {
    if (onLogin) {
      onLogin(role);
      return;
    }
    // legacy fallback
    if (role === "brand") onBrandDashboard?.();
    else if (role === "institute") onInstituteDashboard?.();
    else onSuccess?.();
  }

  function fillAndLogin(role: DemoRole) {
    const u = DEMO_USERS.find(d => d.role === role)!;
    setEmail(u.email);
    setPassword(u.password);
    setError('');
    fireLogin(role);
  }

  const testimonials: Testimonial[] = [
    {
      quote: "Material Library has transformed how we source and specify materials. The platform connects us directly with leading manufacturers and innovative products.",
      name: "Sarah Chen",
      role: "Lead Architect",
      company: "Modern Design Studio"
    },
    {
      quote: "The best platform for discovering new materials and connecting with industry professionals. It's become an essential tool for our design process.",
      name: "Michael Torres",
      role: "Interior Designer",
      company: "Urban Spaces Inc"
    },
    {
      quote: "As a manufacturer, Material Library gives us direct access to designers and architects. The quality of connections we've made has been exceptional.",
      name: "Emily Johnson",
      role: "Brand Manager",
      company: "Innovative Materials Co"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden w-full max-w-[1152px] flex flex-col lg:flex-row">

        {/* Right Panel - Image & Testimonial */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden" style={{ minHeight: 600 }}>
          <img
            src={architectureImage}
            alt="Modern Architecture"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-[40px] left-[40px] right-[40px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-['Satoshi',sans-serif] italic text-[18px] leading-[29.25px] text-white mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="mb-6">
                  <p className="font-['Satoshi',sans-serif] text-[20px] leading-[28px] text-white mb-1">{testimonials[currentTestimonial].name}</p>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#D1D5DC]">{testimonials[currentTestimonial].role}</p>
                  <p className="font-['Satoshi',sans-serif] text-[12px] leading-[16px] text-[#99A1AF]">{testimonials[currentTestimonial].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mb-4">
              <button onClick={() => setCurrentTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-[40px] h-[40px] rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M8.33333 5L3.33333 10L8.33333 15M3.33333 10H16.6667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={() => setCurrentTestimonial(p => (p + 1) % testimonials.length)}
                className="w-[40px] h-[40px] rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M3.33333 10H16.6667M11.6667 5L16.6667 10L11.6667 15" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)}
                  className={`h-[6px] rounded-full transition-all ${i === currentTestimonial ? 'w-[32px] bg-white' : 'w-[6px] bg-white/40 hover:bg-white/60'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 px-6 py-10 md:px-10 flex flex-col justify-center">
          <div className="mb-6">
            <img src={logoImage} alt="Material Library" className="h-[32px] md:h-[38px] w-auto" />
          </div>

          <div className="flex gap-4 mb-6 border-b border-gray-200 relative">
            <button className="pb-3 px-1 relative">
              <span className={`font-['Satoshi',sans-serif] text-[16px] leading-[24px] ${activeTab === 'login' ? 'text-[#101828]' : 'text-[#99A1AF]'}`}>Login</span>
              {activeTab === 'login' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" />}
            </button>
          </div>

          <div className="mb-5">
            <h1 className="font-['Satoshi',sans-serif] text-[26px] md:text-[32px] text-[#101828] mb-1">Welcome!</h1>
            <p className="font-['Satoshi',sans-serif] text-[13px] text-[#6A7282]">Sign in using a demo account below, or enter your credentials.</p>
          </div>

          {/* Demo tiles */}
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Demo accounts — click to sign in instantly</p>
            <div className="grid grid-cols-4 gap-1.5">
              {DEMO_USERS.map(u => (
                <button
                  key={u.role}
                  onClick={() => fillAndLogin(u.role)}
                  className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: u.color }}>
                    {u.label[0]}
                  </div>
                  <span className="text-[10px] font-semibold text-gray-600 leading-tight">{u.label}</span>
                </button>
              ))}
              {/* ML Admin shortcut */}
              <button
                onClick={() => onAdminLogin ? onAdminLogin() : navigate("/admin")}
                className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl border transition-all text-center"
                style={{ borderColor: "rgba(255,106,61,0.3)", background: "rgba(255,106,61,0.04)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#ff6a3d"; (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,61,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.04)"; }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg,#ff6a3d,#e8522a)" }}>
                  A
                </div>
                <span className="text-[10px] font-semibold leading-tight" style={{ color: "#ff6a3d" }}>ML Admin</span>
              </button>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-['Satoshi',sans-serif] text-[13px] text-[#364153]">Email address</label>
              <input
                id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-[44px] px-4 bg-white border border-gray-200 rounded-[10px] font-['Satoshi',sans-serif] text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-['Satoshi',sans-serif] text-[13px] text-[#364153]">Password</label>
                <button type="button" className="font-['Satoshi',sans-serif] text-[11px] text-[#6A7282] hover:text-[#FF6A3D] transition-colors">Forgot password?</button>
              </div>
              <div className="relative w-full h-[44px]">
                <input
                  id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-full px-4 pr-12 bg-white border border-gray-200 rounded-[10px] font-['Satoshi',sans-serif] text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D] transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99A1AF] hover:text-[#6A7282] transition-colors">
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="none"><path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6667C4.16667 16.6667 1.66667 10 1.66667 10C2.49596 8.35509 3.64605 6.89086 5.05 5.68333M8.25 3.53333C8.82365 3.39907 9.41093 3.33195 10 3.33333C15.8333 3.33333 18.3333 10 18.3333 10C17.9286 10.8463 17.446 11.6576 16.8917 12.4233M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9552 12.3459C10.6486 12.4826 10.3178 12.556 9.98267 12.562C9.64754 12.5679 9.31444 12.5061 9.00334 12.3804C8.69224 12.2547 8.40967 12.0675 8.17237 11.8302C7.93507 11.5929 7.74784 11.3104 7.62216 10.9993C7.49648 10.6882 7.43467 10.3551 7.44061 10.0199C7.44655 9.68479 7.51999 9.35397 7.65664 9.04738C7.79329 8.74078 7.99028 8.46481 8.23583 8.23583" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.66667 1.66667L18.3333 18.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none"><path d="M0.833374 10C0.833374 10 4.16671 3.33333 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C19.1667 10 15.8334 16.6667 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-[13px] text-red-500">{error}</p>}

            <button type="submit" className="w-full h-[46px] bg-[#FF6A3D] hover:bg-[#E55A2D] rounded-[10px] font-['Satoshi',sans-serif] text-[14px] text-white transition-colors">
              Log In
            </button>

            <div className="text-center">
              <p className="font-['Satoshi',sans-serif] text-[13px] text-[#6A7282] inline">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#FF6A3D] hover:text-[#E55A2D] underline transition-colors">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
