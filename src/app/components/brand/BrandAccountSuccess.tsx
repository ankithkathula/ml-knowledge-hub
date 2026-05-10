import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const carouselImages = [
  "https://images.unsplash.com/photo-1644749700856-a82a92828a1b?auto=format&fit=crop&q=80&w=1080",
  "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?auto=format&fit=crop&q=80&w=1080",
  "https://images.unsplash.com/photo-1742440710226-450e3b85c100?auto=format&fit=crop&q=80&w=1080",
  "https://images.unsplash.com/photo-1610834651699-1d76adff0c6c?auto=format&fit=crop&q=80&w=1080",
  "https://images.unsplash.com/photo-1630025504699-0df6d41b56a3?auto=format&fit=crop&q=80&w=1080"
];

interface BrandAccountSuccessProps {
  onContinue?: () => void;
}

export function BrandAccountSuccess({ onContinue }: BrandAccountSuccessProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden pt-[64px] md:pt-[80px]">
      {/* Left Panel - Image Carousel (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative h-[calc(100vh-80px)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={carouselImages[currentImageIndex]}
              alt="Brand Success"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[#0F172A]/20" />

        {/* Content on Image */}
        <div className="absolute bottom-20 left-20 right-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-4xl font-normal text-white uppercase tracking-tight mb-4 leading-tight">
              Welcome to the <br/>
              <span className="text-[#FF6A3D] font-bold">Premium Ecosystem</span>
            </h2>
            <p className="text-white/80 text-lg max-w-md font-['Satoshi']">
              Join India's most innovative brands connecting directly with high-intent architects and designers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Success Message & Onboarding */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-lg w-full text-center lg:text-left"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#FF6A3D] rounded-full shadow-lg mb-8"
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>

          <p className="font-['Satoshi',sans-serif] text-[#FF6A3D] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
            REGISTRATION SUCCESSFUL
          </p>

          <h1 className="text-3xl md:text-4xl font-normal text-[#0F172A] uppercase tracking-tight mb-6 leading-tight">
            Account Created <br className="hidden md:block"/> Successfully
          </h1>
          
          <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
            Welcome to Material Library. Your brand account is now being reviewed by our team. You can proceed to your dashboard to complete your profile setup.
          </p>

          {/* Onboarding Steps */}
          <div className="space-y-6 mb-12 text-left bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-widest mb-4">Your Onboarding Checklist</h3>
            
            {[
              {
                title: 'Verify Official Email',
                desc: 'Check your inbox for a verification link sent to your registered brand email.'
              },
              {
                title: 'Complete Brand Profile',
                desc: 'Upload high-resolution logos, banners, and brand descriptions for the microsite.'
              },
              {
                title: 'Upload Product Catalog',
                desc: 'Begin listing your materials with detailed technical specifications and visuals.'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF6A3D]/10 flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#FF6A3D]" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider mb-1 font-['Satoshi']">{step.title}</p>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed font-['Satoshi']">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button 
              onClick={onContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 bg-[#FF6A3D] text-white rounded-lg font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/20 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={16} />
            </motion.button>
            <button className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest hover:text-[#0F172A] transition-colors py-2 px-4">
              Need Help? Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
