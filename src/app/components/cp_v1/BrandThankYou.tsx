import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

interface BrandThankYouProps {
  onSetupCredentials?: () => void;
}

export default function BrandThankYou({ onSetupCredentials }: BrandThankYouProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Success Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-24 h-24 rounded-full bg-[#FF6A3D]/10 flex items-center justify-center mb-8"
            >
              {/* Inner Circle */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-16 h-16 rounded-full bg-[#FF6A3D] flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-normal text-[#0F172A] uppercase tracking-tight mb-4 font-['Satoshi']">
              Thank You for Joining
            </h1>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-12 max-w-lg font-['Satoshi']">
              Your registration request has been received. Our team will review your brand profile and contact you within 24-48 hours to complete the onboarding process.
            </p>

            {/* Next Steps */}
            <div className="space-y-8 mb-12 text-left w-full max-w-md mx-auto">
              {[
                {
                  title: 'Email Verification',
                  desc: "We've sent a verification link to your official brand email. Please verify to continue."
                },
                {
                  title: 'Profile Review',
                  desc: "Our ecosystem managers will verify your brand details, product categories, and certifications."
                },
                {
                  title: 'Catalog Activation',
                  desc: "Once approved, you'll receive full access to your dashboard to start listing your product catalog."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6A3D]/10 flex items-center justify-center mt-1">
                    <span className="font-bold text-[#FF6A3D] text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-[#0F172A] uppercase tracking-wider mb-1 font-['Satoshi']">{step.title}</h3>
                    <p className="text-[12px] text-[#6B7280] leading-relaxed font-['Satoshi']">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="flex items-center gap-3 text-[#6B7280]">
                <svg className="w-5 h-5 text-[#FF6A3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-['Satoshi']">Estimated review time: 24-48 Hours</span>
              </div>

              <motion.a
                href="/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#FF6A3D] text-white rounded-full font-bold uppercase tracking-widest text-[11px] transition-all hover:bg-[#E55A2D] shadow-lg shadow-[#FF6A3D]/20"
              >
                Return to Homepage
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-100"
        >
          <p className="font-['Satoshi',sans-serif] text-[#9CA3AF] text-[11px] uppercase tracking-widest">
            Have questions? Reach out to us at{' '}
            <a href="mailto:brands@materiallibrary.com" className="text-[#FF6A3D] hover:underline font-bold">
              brands@materiallibrary.com
            </a>
          </p>
        </motion.div>

        {/* Demo: Setup Credentials */}
        {onSetupCredentials && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-center mt-8 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
          >
            <p className="font-['Satoshi',sans-serif] text-[#6B7280] text-xs mb-4 uppercase tracking-widest">
              Demo Access: Simulate brand approval
            </p>
            <motion.button
              onClick={onSetupCredentials}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#FF6A3D] text-[#FF6A3D] rounded-full font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-[#FF6A3D] hover:text-white"
            >
              Set Up Login Credentials
              <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
