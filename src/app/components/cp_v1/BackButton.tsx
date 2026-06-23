import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'minimal' | 'default' | 'floating';
  className?: string;
}

export function BackButton({ 
  onClick, 
  label = 'Back', 
  variant = 'default',
  className = ''
}: BackButtonProps) {
  
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={onClick}
        className={`fixed top-[24px] left-[24px] z-50 bg-white rounded-full p-[12px] shadow-lg hover:shadow-xl transition-shadow ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="size-[20px] text-[#364153]" />
      </motion.button>
    );
  }

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={onClick}
        className={`inline-flex items-center gap-[8px] font-['Satoshi',sans-serif] text-[#6a7282] text-[14px] hover:text-[#364153] transition-colors ${className}`}
        whileHover={{ x: -4 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="size-[16px]" />
        {label}
      </motion.button>
    );
  }

  // Default variant
  return (
    <motion.button
      onClick={onClick}
      className={`inline-flex items-center gap-[10px] px-[16px] py-[10px] rounded-[10px] bg-white border border-[#e5e7eb] font-['Satoshi',sans-serif] text-[#364153] text-[14px] hover:border-[#d1d5db] hover:bg-[#f9fafb] transition-all ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowLeft className="size-[16px]" />
      {label}
    </motion.button>
  );
}
