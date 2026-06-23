import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";
import architectureImage from "figma:asset/6344822aa737b77519536de928132bd8c7576482.png";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface SignInProps {
  onBrandDashboard?: () => void;
}

export default function SignIn({ onBrandDashboard }: SignInProps = {}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [currentTestimonial, setCurrentTestimonial] = useState(1);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check for Aditya Birla credentials
    if (email === 'abg@test.com' && password === 'Aditya@123') {
      if (onBrandDashboard) {
        onBrandDashboard();
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden w-full max-w-[1152px] lg:h-[774px] flex flex-col lg:flex-row">
        
        {/* Right Panel - Image & Testimonial */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img 
            src={architectureImage}
            alt="Modern Architecture"
            className="absolute w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Testimonial Card */}
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
                  <p className="font-['Satoshi',sans-serif] text-[20px] leading-[28px] text-white mb-1">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#D1D5DC]">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="font-['Satoshi',sans-serif] text-[12px] leading-[16px] text-[#99A1AF]">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={prevTestimonial}
                className="w-[40px] h-[40px] rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M8.33333 5L3.33333 10L8.33333 15M3.33333 10H16.6667" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-[40px] h-[40px] rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M3.33333 10H16.6667M11.6667 5L16.6667 10L11.6667 15" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-[6px] rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'w-[32px] bg-white' 
                      : 'w-[6px] bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 px-6 py-24 md:px-12 md:py-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8 lg:mb-10">
            <img 
              src={logoImage} 
              alt="Material Library" 
              className="h-[32px] md:h-[40px] w-auto brightness-100 invert-0"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 lg:gap-6 mb-8 lg:mb-10 border-b border-gray-200 relative">
            <button
              onClick={() => setActiveTab('login')}
              className="pb-3 px-1 transition-all relative"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path 
                    d="M10 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V13C15 13.5304 14.7893 14.0391 14.4142 14.4142C14.0391 14.7893 13.5304 15 13 15H10M6.66667 11.3333L10 8M10 8L6.66667 4.66667M10 8H1" 
                    stroke={activeTab === 'login' ? '#101828' : '#99A1AF'}
                    strokeWidth="1.33333" 
                  />
                </svg>
                <span className={`font-['Satoshi',sans-serif] text-[16px] leading-[24px] ${
                  activeTab === 'login' ? 'text-[#101828]' : 'text-[#99A1AF]'
                }`}>
                  Login
                </span>
              </div>
              {activeTab === 'login' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" />
              )}
            </button>
          </div>

          {/* Welcome Text */}
          <div className="mb-6 lg:mb-8">
            <h1 className="font-['Satoshi',sans-serif] text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#101828] mb-2 md:mb-3">
              Welcome!
            </h1>
            <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#6A7282]">
              Please enter your details below. Sign in using email or phone number.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-[20px]" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="flex flex-col gap-[8px]">
              <label 
                htmlFor="email" 
                className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#364153]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-[46px] px-[16px] py-[12px] bg-white border border-gray-200 rounded-[10px] font-['Satoshi',sans-serif] text-[14px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D] transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center justify-between h-[20px]">
                <label 
                  htmlFor="password" 
                  className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#364153]"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="font-['Satoshi',sans-serif] text-[12px] leading-[16px] text-[#6A7282] hover:text-[#FF6A3D] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative w-full h-[46px]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-full px-[16px] py-[12px] pr-[48px] bg-white border border-gray-200 rounded-[10px] font-['Satoshi',sans-serif] text-[14px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[16px] top-[13px] w-[20px] h-[20px] text-[#99A1AF] hover:text-[#6A7282] transition-colors"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6667C4.16667 16.6667 1.66667 10 1.66667 10C2.49596 8.35509 3.64605 6.89086 5.05 5.68333M8.25 3.53333C8.82365 3.39907 9.41093 3.33195 10 3.33333C15.8333 3.33333 18.3333 10 18.3333 10C17.9286 10.8463 17.446 11.6576 16.8917 12.4233M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9552 12.3459C10.6486 12.4826 10.3178 12.556 9.98267 12.562C9.64754 12.5679 9.31444 12.5061 9.00334 12.3804C8.69224 12.2547 8.40967 12.0675 8.17237 11.8302C7.93507 11.5929 7.74784 11.3104 7.62216 10.9993C7.49648 10.6882 7.43467 10.3551 7.44061 10.0199C7.44655 9.68479 7.51999 9.35397 7.65664 9.04738C7.79329 8.74078 7.99028 8.46481 8.23583 8.23583" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.66667 1.66667L18.3333 18.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M0.833374 10C0.833374 10 4.16671 3.33333 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C19.1667 10 15.8334 16.6667 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#FF6A3D] hover:bg-[#E55A2D] rounded-[10px] font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-white transition-colors"
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#6A7282] inline">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-[#FF6A3D] hover:text-[#E55A2D] underline transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-red-500 mt-2">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}