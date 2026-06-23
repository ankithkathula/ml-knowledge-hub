import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ChevronDown, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

const carouselImages = [
  "https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBzaG93cm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NjQyNDI3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2NDI0Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzdHVkaW8lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NDI0Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1610834651699-1d76adff0c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQyNDI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1630025504699-0df6d41b56a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBzcGFjZXxlbnwxfHx8fDE3NjQyNDI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

interface RetailCustomerSignUpProps {
  onBack: () => void;
}

export default function RetailCustomerSignUp({ onBack }: RetailCustomerSignUpProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle registration here
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-[1152px] lg:h-[774px] flex flex-col lg:flex-row">
        
        {/* Right Panel - Image Carousel & Benefits */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={carouselImages[currentImageIndex]}
                alt="Architecture"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

          <div className="absolute inset-0 flex items-center px-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-2xl backdrop-blur-md bg-white/10 rounded-2xl p-10 border border-white/10"
            >
              <h2 className="font-['Satoshi',sans-serif] text-4xl text-white mb-10 leading-tight">
                Access premium materials<br />
                and connect with experts
              </h2>
              
              <div className="space-y-6">
                {[
                  "Browse 100,000+ premium construction materials",
                  "Connect with verified designers and contractors",
                  "Get expert advice for your construction projects",
                  "Access exclusive deals and promotions"
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FF6A3D] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-[#FF6A3D]/20">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <p className="font-['Satoshi',sans-serif] text-white text-lg font-medium opacity-90">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-12 md:py-8 flex flex-col overflow-y-auto custom-scrollbar">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-[#0F172A] transition-colors text-[11px] font-bold uppercase tracking-widest mb-8 cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <p className="font-['Satoshi',sans-serif] text-[#FF6A3D] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
            RETAIL CUSTOMER SIGN UP
          </p>

          <div className="flex gap-8 mb-8 border-b border-gray-100 relative">
            <button
              onClick={() => setActiveTab('signup')}
              className="pb-4 px-2 transition-all relative group"
            >
              <span className={`font-['Satoshi',sans-serif] text-sm leading-[24px] font-medium transition-colors ${
                activeTab === 'signup' ? 'text-[#0F172A]' : 'text-[#9CA3AF]'
              }`}>
                Create Account
              </span>
              {activeTab === 'signup' && (
                <motion.div 
                  layoutId="activeTabRetail"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" 
                />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-6">
              <h3 className="font-['Satoshi',sans-serif] font-bold text-[#0F172A] text-[11px] tracking-[0.2em] uppercase">Personal Information</h3>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="h-12 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="rahul@example.com"
                      className="h-12 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-12 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Location (City)</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="h-12 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      placeholder="400001"
                      maxLength={6}
                      className="h-12 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-['Satoshi',sans-serif] font-bold text-[#0F172A] text-[11px] tracking-[0.2em] uppercase">Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Create Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Min 8 characters"
                      className="h-12 w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F172A] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-['Satoshi',sans-serif] text-[12px] font-bold text-[#364153] uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Repeat password"
                      className="h-12 w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-100 rounded-xl font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D]/40 focus:ring-1 focus:ring-[#FF6A3D]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F172A] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 px-6 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] hover:bg-[#E55A2D] transition-all mt-4 shadow-xl shadow-[#FF6A3D]/20 flex items-center justify-center gap-2"
            >
              Complete Registration <ArrowRight size={16} />
            </button>

            <p className="text-center text-[12px] text-gray-400 font-['Satoshi'] mt-4">
              By joining, you agree to our <button className="underline hover:text-[#0F172A]">Terms of Service</button> and <button className="underline hover:text-[#0F172A]">Privacy Policy</button>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
