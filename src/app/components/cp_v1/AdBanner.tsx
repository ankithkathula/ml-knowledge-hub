import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    headline: 'PREMIUM MATERIAL COLLECTIONS',
    subtext: 'Discover high-performance materials for modern construction',
    cta: 'EXPLORE NOW',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1280'
  },
  {
    id: 2,
    headline: 'SUSTAINABLE BUILDING SOLUTIONS',
    subtext: 'Eco-friendly materials that don\'t compromise on strength',
    cta: 'LEARN MORE',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1280'
  },
  {
    id: 3,
    headline: 'ARCHITECTURAL GLASS & STEEL',
    subtext: 'Next-generation solutions for contemporary designs',
    cta: 'VIEW CATALOGUE',
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1280'
  }
];

export function AdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  return (
    <div 
      className="relative w-full h-[140px] md:h-[220px] overflow-hidden group mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={BANNERS[currentIndex].image} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0F172A] via-[#0F172A]/40 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-center px-12 md:px-20">
            <h2 className="text-white text-[16px] md:text-[20px] font-medium tracking-wider mb-1">
              {BANNERS[currentIndex].headline}
            </h2>
            <p className="text-white/80 text-[12px] md:text-[14px] mb-4 max-w-lg">
              {BANNERS[currentIndex].subtext}
            </p>
            <button className="w-fit px-4 py-2 bg-[#FF6A3D] text-white text-[11px] font-bold uppercase tracking-widest rounded transition-colors hover:bg-[#E55A2D]">
              {BANNERS[currentIndex].cta}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={prev} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20">
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={next} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-[#FF6A3D] w-4' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
}