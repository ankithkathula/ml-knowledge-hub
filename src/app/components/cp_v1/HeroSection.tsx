import { Search, Building2, Package, Briefcase, Users, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { VisualCategoryExplorer } from './VisualCategoryExplorer';

export function HeroSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoveringViewAll, setIsHoveringViewAll] = useState(false);

  // Premium architecture and construction images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1638376007478-83141a1eddd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1764856601179-dfeca7b37e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1762536859942-8076505f7c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  ];

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    console.log('Category selected:', category);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={backgroundImages[currentImageIndex]}
              alt="Architecture background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark translucent gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center pt-8 sm:pt-12 md:pt-16" style={{ marginTop: '-40px' }}>
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mb-6 sm:mb-8 leading-[1.3] px-4"
          >
            India's First <span className="text-[#FF6A3D]">Unique Digital Platform</span> that aims to<br />
            transform the ecosystem of the <span className="text-white">Construction Industry</span>
          </motion.h1>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 sm:mb-8 px-4"
          >
            {/* Category Pills Row with View All on Right */}
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {/* Category Pills */}
                {[
                  { icon: Building2, label: 'Brands' },
                  { icon: Package, label: 'Products' },
                  { icon: Briefcase, label: 'Jobs' },
                  { icon: Users, label: 'Studios' },
                  { icon: ImageIcon, label: 'Images' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = selectedCategory === item.label;
                  const isDisabled = item.label === 'Jobs' || item.label === 'Studios' || item.label === 'Images';
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      {...(!isDisabled && {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.98 }
                      })}
                      onClick={() => !isDisabled && handleCategoryClick(item.label)}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${
                        isDisabled 
                          ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                          : isSelected
                          ? 'bg-[#FF6A3D] border-[#FF6A3D] shadow-md cursor-pointer'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#FF6A3D] hover:shadow-md cursor-pointer'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-[#667085] dark:text-gray-400'}`} />
                      <span className={`font-semibold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-[#667085] dark:text-gray-400'}`}>{item.label}</span>
                    </motion.button>
                  );
                })}

                {/* Spacer between pills and View All */}
                <div className="w-6 sm:w-8 hidden sm:block" />

                {/* View All Link - Simple Text + Arrow */}
                <motion.a
                  href="/products"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  onMouseEnter={() => setIsHoveringViewAll(true)}
                  onMouseLeave={() => setIsHoveringViewAll(false)}
                  className="hidden sm:flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: isHoveringViewAll ? '#FF6A3D' : '#FFFFFF',
                    opacity: isHoveringViewAll ? 1 : 0.85,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>View All</span>
                  <motion.span
                    animate={{
                      x: isHoveringViewAll ? 3 : 0
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>

              {/* Mobile: View All Below Pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="sm:hidden flex items-center justify-center mt-4"
              >
                <a
                  href="/products"
                  onMouseEnter={() => setIsHoveringViewAll(true)}
                  onMouseLeave={() => setIsHoveringViewAll(false)}
                  className="flex items-center gap-1.5 cursor-pointer"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    color: isHoveringViewAll ? '#FF6A3D' : '#FFFFFF',
                    opacity: isHoveringViewAll ? 1 : 0.85,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>View All</span>
                  <motion.span
                    animate={{
                      x: isHoveringViewAll ? 3 : 0
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 sm:mb-10 px-4"
          >
            <div className="relative max-w-3xl mx-auto">
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-3.5 flex items-center gap-3 hover:shadow-xl transition-shadow">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A3D] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent border-none outline-none text-[#101828] dark:text-white placeholder:text-gray-400 text-sm"
                />
                <motion.button 
                  onClick={handleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 px-4 sm:px-6 py-2 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#ff5a2d] transition-colors"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Category Explorer - NEW SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 mt-4"
        >
          <VisualCategoryExplorer />
        </motion.div>
      </div>

      {/* Brand Logo Marquee */}
      <div className="relative z-10 mt-12 sm:mt-16 border-t border-white/20 pt-6 sm:pt-8">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 sm:gap-12"
            animate={{
              x: [0, -1400],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {[
              'ASIAN PAINTS',
              'KAJARIA',
              'SAINT-GOBAIN',
              'SCHNEIDER',
              'LEGRAND',
              'HINDWARE',
              'JAQUAR',
              'KOHLER',
              'HAVELLS',
              'PHILIPS',
              'CERA',
              'TATA STEEL',
              'ULTRATECH',
              'ACC'
            ].map((brand, index) => (
              <div
                key={`brand-1-${index}`}
                className="flex items-center justify-center min-w-[140px] sm:min-w-[160px] opacity-50 hover:opacity-80 transition-opacity"
              >
                <span className="text-xs sm:text-sm tracking-wider text-white whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {[
              'ASIAN PAINTS',
              'KAJARIA',
              'SAINT-GOBAIN',
              'SCHNEIDER',
              'LEGRAND',
              'HINDWARE',
              'JAQUAR',
              'KOHLER',
              'HAVELLS',
              'PHILIPS',
              'CERA',
              'TATA STEEL',
              'ULTRATECH',
              'ACC'
            ].map((brand, index) => (
              <div
                key={`brand-2-${index}`}
                className="flex items-center justify-center min-w-[140px] sm:min-w-[160px] opacity-50 hover:opacity-80 transition-opacity"
              >
                <span className="text-xs sm:text-sm tracking-wider text-white whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}