import { motion } from 'motion/react';
import { Building2, Users, Briefcase, Palette, GraduationCap, Check, Sparkles, Users2, Layers } from 'lucide-react';
import { useState } from 'react';
import logoImage from 'figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png';
import RetailCustomerSignUp from './RetailCustomerSignUp';

interface SignUpRoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const roles = [
  {
    title: 'Brand',
    description: 'Showcase products to designers',
    id: 'brand',
    Icon: Building2
  },
  {
    title: 'Retail Customer',
    description: 'Explore materials & services',
    id: 'retail',
    Icon: Users
  },
  {
    title: 'Designer',
    description: 'Network with professionals',
    id: 'designers',
    Icon: Briefcase
  },
  {
    title: 'Studio',
    description: 'Connect & showcase projects',
    id: 'studio',
    Icon: Palette
  },
  {
    title: 'Student',
    description: 'Learn & grow your network',
    id: 'students',
    Icon: GraduationCap
  }
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Premium Access',
    description: 'Unlock exclusive materials, tools, and industry insights'
  },
  {
    icon: Users2,
    title: 'Global Network',
    description: 'Connect with 50,000+ construction professionals'
  },
  {
    icon: Layers,
    title: 'Smart Collaboration',
    description: 'Streamline projects with integrated workflows'
  }
];

export default function SignUpRoleSelection({ onRoleSelect }: SignUpRoleSelectionProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showRetailSignup, setShowRetailSignup] = useState(false);

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleContinue = () => {
    if (selectedRoles.length > 0) {
      // If retail customer is selected, show the retail signup form
      if (selectedRoles[0] === 'retail') {
        setShowRetailSignup(true);
      } else {
        onRoleSelect(selectedRoles[0]);
      }
    }
  };

  // Show retail signup form if retail is selected
  if (showRetailSignup) {
    return <RetailCustomerSignUp onBack={() => setShowRetailSignup(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden w-full max-w-[1152px] lg:h-[774px] flex flex-col lg:flex-row">
        
        {/* Left Panel - Image & Benefits */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
          <img 
            src="https://images.unsplash.com/photo-1761287347579-a9f73da0f959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvciUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NjQzMTUxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern Architecture"
            className="absolute w-full h-full object-cover opacity-40"
          />
          
          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-between p-12 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1617357978159-3f6551e11751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBhcmNoaXRlY3R1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzY0MzIxNTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)' }}>
            {/* Top Section - Headline */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-['Satoshi',sans-serif] text-[42px] leading-[52px] text-white mb-4"
              >
                Build your future in<br />construction & design
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-['Satoshi',sans-serif] text-[16px] leading-[24px] text-white/70 max-w-md"
              >
                Join India's largest digital ecosystem connecting brands, designers, studios, and students
              </motion.p>
            </div>

            {/* Bottom Section - Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF6A3D] flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Satoshi',sans-serif] text-[16px] leading-[24px] text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-8 pt-6 border-t border-white/10"
              >
                <div>
                  <div className="font-['Satoshi',sans-serif] text-[28px] leading-[32px] text-white mb-1">
                    50K+
                  </div>
                  <div className="font-['Satoshi',sans-serif] text-[13px] leading-[18px] text-white/60">
                    Active Users
                  </div>
                </div>
                <div>
                  <div className="font-['Satoshi',sans-serif] text-[28px] leading-[32px] text-white mb-1">
                    2,500+
                  </div>
                  <div className="font-['Satoshi',sans-serif] text-[13px] leading-[18px] text-white/60">
                    Premium Brands
                  </div>
                </div>
                <div>
                  <div className="font-['Satoshi',sans-serif] text-[28px] leading-[32px] text-white mb-1">
                    100K+
                  </div>
                  <div className="font-['Satoshi',sans-serif] text-[13px] leading-[18px] text-white/60">
                    Products Listed
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Panel - Role Selection */}
        <div className="w-full lg:w-1/2 px-6 py-24 md:px-12 md:py-12 flex flex-col justify-center text-center items-center">
          {/* Logo */}
          <div className="mb-8 lg:mb-10">
            <img 
              src={logoImage} 
              alt="Material Library" 
              className="h-[32px] md:h-[40px] w-auto brightness-100 invert-0"
            />
          </div>

          {/* Header */}
          <div className="mb-6 lg:mb-8 text-left w-full">
            <h1 className="font-['Satoshi',sans-serif] text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#101828] mb-2 md:mb-3">
              Join us today
            </h1>
            <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#6A7282]">
              Select your role to get started and create your account.
            </p>
          </div>

          {/* Role Cards */}
          <div className="flex flex-col gap-3 mb-8 w-full text-left">
            {roles.map((role) => {
              const isSelected = selectedRoles.includes(role.id);
              return (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedRoles([role.id])}
                  className={`relative w-full p-4 rounded-[10px] border transition-all text-left group hover:border-[#FF6A3D]/50 ${
                    isSelected 
                      ? 'border-[#FF6A3D] bg-[#FF6A3D]/5' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-[8px] flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#FF6A3D]' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <role.Icon className={`w-6 h-6 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="font-['Satoshi',sans-serif] text-[16px] leading-[24px] text-[#101828] mb-0.5">
                        {role.title}
                      </h3>
                      <p className="font-['Satoshi',sans-serif] text-[13px] leading-[18px] text-[#6A7282]">
                        {role.description}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-[#FF6A3D] bg-[#FF6A3D]' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={selectedRoles.length === 0}
            className={`w-full h-[48px] px-[16px] py-[12px] rounded-[10px] font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-white transition-colors ${
              selectedRoles.length > 0
                ? 'bg-[#FF6A3D] hover:bg-[#E55A2D] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="font-['Satoshi',sans-serif] text-[14px] leading-[20px] text-[#6A7282] inline">
              Already have an account?{' '}
              <button
                onClick={() => onRoleSelect('signin')}
                className="text-[#FF6A3D] hover:text-[#E55A2D] underline transition-colors"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}