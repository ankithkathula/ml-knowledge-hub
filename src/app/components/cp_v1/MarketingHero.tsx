import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { VisualCategoryExplorer } from './VisualCategoryExplorer';
import heroBg from "figma:asset/a2610d18826116c8df556e50afe68d262b23269a.png";

interface MarketingHeroProps {
  onSearch?: (term: string) => void;
  isSearchHidden?: boolean;
  onNavigateToProducts?: () => void;
}

// Category data with subcategories
const categories = [
  {
    name: 'Building Materials',
    subcategories: ['Cement', 'Concrete', 'Steel', 'Bricks', 'Blocks', 'Mortar', 'Insulation'],
    brands: ['ACC Limited', 'UltraTech', 'Tata Steel', 'JSW Steel']
  },
  {
    name: 'Flooring',
    subcategories: ['Ceramic Tiles', 'Vitrified Tiles', 'Marble', 'Granite', 'Hardwood', 'Laminate'],
    brands: ['Kajaria', 'Somany', 'Johnson Tiles', 'Nitco']
  },
  {
    name: 'Wall Finishes',
    subcategories: ['Paint', 'Wallpaper', 'Wall Panels', 'Cladding', 'Texture', 'Primer'],
    brands: ['Asian Paints', 'Berger', 'Dulux', 'Nippon']
  },
  {
    name: 'Lighting',
    subcategories: ['LED', 'Chandeliers', 'Pendant', 'Recessed', 'Track', 'Outdoor'],
    brands: ['Philips', 'Havells', 'Syska', 'Crompton']
  },
  {
    name: 'Sanitary',
    subcategories: ['Toilets', 'Basins', 'Faucets', 'Showers', 'Bathtubs', 'Accessories'],
    brands: ['Kohler', 'Jaquar', 'Cera', 'Hindware']
  },
  {
    name: 'Hardware',
    subcategories: ['Door Handles', 'Locks', 'Hinges', 'Fasteners', 'Tools', 'Closers'],
    brands: ['Hafele', 'Dorset', 'Europa', 'Yale']
  },
  {
    name: 'Electrical',
    subcategories: ['Cables', 'Switches', 'Sockets', 'MCB', 'Distribution', 'Conduits'],
    brands: ['Legrand', 'Schneider', 'Anchor', 'Finolex']
  }
];

export function MarketingHero({ onSearch, isSearchHidden, onNavigateToProducts }: MarketingHeroProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, width: 0 });
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
  // Multi-select filter state - default all selected
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(['BRANDS', 'PRODUCTS', 'SERVICES'])
  );

  const handleCategoryHover = (categoryName: string) => {
    setHoveredCategory(categoryName);
    
    // Calculate dropdown position relative to the category button
    const button = categoryRefs.current[categoryName];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left,
        width: rect.width
      });
    }
  };

  // Toggle filter selection (checkbox behavior)
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const handleSearch = () => {
    // Pass search query with selected filter scopes
    if (onSearch) {
      const filters = Array.from(selectedFilters);
      onSearch(searchQuery);
      // TODO: You can extend onSearch to accept filters as well: onSearch(searchQuery, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section 
      className="relative w-full bg-black"
      style={{ 
        height: '100vh',
        minHeight: '720px',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithFallback 
          src={heroBg}
          alt="Material Library Hero" 
          className="h-full w-full object-cover object-center"
        />
        
        {/* Soft gradient overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.65) 100%)'
          }}
        />
        
        {/* Radial gradient overlay to bring focus to center */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.45) 100%)'
          }}
        />
      </div>

      {/* Bottom fade for clean visual cutoff */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6))'
        }}
      />

      {/* Main Hero Content - Vertically Centered */}
      <div 
        className="relative z-30 px-4 md:px-6"
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          textAlign: 'center',
          transform: 'translateY(-10px)'
        }}
      >
        <div className="w-full max-w-[900px] mx-auto">
          {/* Hero Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-4"
          >
            <h1 className="font-['Satoshi',sans-serif] font-normal uppercase text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] leading-[1.25] md:leading-[1.3] lg:leading-[1.35] tracking-[0.04em] text-white">
              BUILDING <span className="text-[#FF6A3D] font-medium">THE FUTURE</span>
              <br className="hidden sm:block" />
              <span className="sm:inline hidden"> </span>
              OF CONSTRUCTION
            </h1>
          </motion.div>

          {/* Hero Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-['Satoshi',sans-serif] font-normal text-[13px] sm:text-[14px] md:text-[16px] text-white/85 mb-6 max-w-[90%] md:max-w-none mx-auto"
          >
            A digital ecosystem connecting materials, brands, and professionals.
          </motion.p>

          {/* Search Bar - Enhanced */}
          <motion.div
            animate={{ 
              opacity: isSearchHidden ? 0 : 1,
              y: isSearchHidden ? -40 : 0,
              scale: isSearchHidden ? 0.95 : 1
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`w-full max-w-[680px] mx-auto flex flex-col items-center ${isSearchHidden ? 'pointer-events-none' : ''}`}
          >
            <div className="relative w-full h-14 md:h-[58px] bg-white rounded-[14px] border border-white/25 shadow-[0px_12px_40px_rgba(0,0,0,0.4),0px_2px_8px_rgba(0,0,0,0.2)] p-[5px] md:p-[6px] flex items-center">
              <div className="pl-4 md:pl-5 pr-2 text-[#0F172A]/40">
                <Search className="w-[18px] h-[18px] md:w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search products, brands, services..."
                className="flex-1 h-full bg-transparent text-[13px] md:text-[15px] text-[#0F172A] placeholder:text-[#0F172A]/40 outline-none font-['Satoshi',sans-serif] px-2 md:px-3"
              />
              <button 
                onClick={handleSearch}
                className="h-[42px] md:h-[46px] px-5 md:px-6 bg-[#FF6A3D] text-white rounded-[10px] text-[12px] md:text-[13px] font-medium tracking-wide uppercase hover:bg-[#E55A2D] transition-all flex items-center justify-center font-['Satoshi',sans-serif] shadow-sm"
              >
                Search
              </button>
            </div>

            {/* Multi-Select Filter Chips - Checkbox Behavior */}
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mt-5 w-full overflow-x-auto no-scrollbar pb-2 px-1">
              {['BRANDS', 'PRODUCTS', 'SERVICES'].map((filter) => {
                const isSelected = selectedFilters.has(filter);
                
                return (
                  <motion.button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    whileTap={{ scale: 0.96 }}
                    className={`h-[26px] md:h-[28px] px-3 md:px-3.5 rounded-full text-[10px] md:text-[11px] font-medium transition-all duration-200 uppercase tracking-[0.08em] font-['Satoshi',sans-serif] whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#FF6A3D] text-white border border-[#FF6A3D] shadow-sm'
                        : 'bg-white/8 border border-white/15 text-white/75 hover:bg-white/15 hover:text-white/90 hover:border-white/25'
                    }`}
                  >
                    {filter}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CATEGORY CARD ZONE - Anchored at Bottom Inside Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isSearchHidden ? 0 : 1,
          y: isSearchHidden ? 30 : 0
        }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-20"
        style={{ 
          marginTop: 'auto',
          paddingBottom: '32px'
        }}
      >
        <VisualCategoryExplorer />
      </motion.div>
    </section>
  );
}