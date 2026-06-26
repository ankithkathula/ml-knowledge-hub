  import { useState, useEffect, useRef } from 'react';
  import { motion, AnimatePresence } from 'motion/react';
  import { ArrowRight, Menu } from 'lucide-react';
  import { CATEGORY_TAXONOMY, CategoryNode } from '../../utils/categoryTaxonomy';
  import { getDropdownContent, getDropdownColumns, DropdownGroup } from '../../utils/categoryDropdownContent';
  
  interface HeroCategoryNavProps {
    onNavigate?: (category: string, subcategory?: string, subSubcategory?: string) => void;
    onViewAllCategories?: () => void;
  }
  
  export function HeroCategoryNav({ 
    onNavigate,
    onViewAllCategories
  }: HeroCategoryNavProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showViewAllDropdown, setShowViewAllDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const viewAllDropdownRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
    useEffect(() => {
      const handleScroll = () => {
        // Hero height is approximately 70vh or 720px
        const heroHeight = Math.max(window.innerHeight * 0.7, 600);
        setIsScrolledPastHero(window.scrollY > heroHeight - 100);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          navRef.current &&
          !navRef.current.contains(event.target as Node)
        ) {
          setActiveCategory(null);
        }
  
        if (
          viewAllDropdownRef.current &&
          !viewAllDropdownRef.current.contains(event.target as Node) &&
          navRef.current &&
          !navRef.current.contains(event.target as Node)
        ) {
          setShowViewAllDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const handleCategoryClick = (categorySlug: string, subcategory?: string, subSubcategory?: string) => {
      setActiveCategory(null);
      setIsMobileMenuOpen(false);
      if (onNavigate) {
        onNavigate(categorySlug, subcategory, subSubcategory);
      }
    };
  
    const handleMouseEnter = (categorySlug: string) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setActiveCategory(categorySlug);
    };
  
    const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveCategory(null);
      }, 150);
    };
  
    const handleDropdownMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  
    const handleDropdownMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveCategory(null);
      }, 150);
    };
  
    return (
      <>
        {/* Desktop Category Navigation */}
        <div 
          className={`hidden md:block w-full transition-all duration-500 ${ 
            isScrolledPastHero 
              ? 'fixed top-[64px] z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm' 
              : 'absolute top-[76px] z-[50]'
          }`}
        >
          <nav 
            ref={navRef}
            className={`max-w-[1440px] mx-auto px-8 flex items-center justify-center overflow-visible transition-all ${
              isScrolledPastHero ? 'h-[48px]' : 'h-[48px] mt-3'
            }`}
          >
            {/* Category Strip with Subtle Background */}
            <div 
              className={`flex items-center justify-center rounded-lg border transition-all duration-[120ms] ${
                isScrolledPastHero 
                  ? 'bg-transparent border-transparent' 
                  : 'border-[rgba(0,0,0,0.06)]'
              }`}
              style={{ 
                gap: '28px',
                background: isScrolledPastHero ? 'transparent' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: isScrolledPastHero ? 'none' : 'blur(10px)',
                WebkitBackdropFilter: isScrolledPastHero ? 'none' : 'blur(10px)',
                boxShadow: isScrolledPastHero ? 'none' : '0 6px 16px rgba(0, 0, 0, 0.06)',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '18px',
                paddingRight: '18px',
              }}
            >
              {CATEGORY_TAXONOMY.map((category, index) => (
                <div key={category.slug} className="flex items-center" style={{ gap: '32px' }}>
                  <div 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(category.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      ref={(el) => categoryButtonRefs.current[category.slug] = el}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`font-['Satoshi',sans-serif] text-[14px] font-medium whitespace-nowrap transition-all duration-[120ms] ease-out relative py-2 ${
                        isScrolledPastHero
                          ? activeCategory === category.slug 
                            ? 'text-[#FF6A3D]' 
                            : 'text-[#1F1F1F] hover:text-[#FF6A3D]'
                          : activeCategory === category.slug 
                            ? 'text-[#1F1F1F]' 
                            : 'text-[#1F1F1F]/80 hover:text-[#1F1F1F]'
                      }`}
                      style={{ letterSpacing: '0.3px' }}
                    >
                      {category.name}
                      {/* Hover underline */}
                      {activeCategory === category.slug && (
                        <motion.div
                          layoutId="categoryUnderline"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#FF6A3D]"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
  
                    {/* Hover Bridge - Invisible area to prevent flicker */}
                    {activeCategory === category.slug && (
                      <div 
                        className="absolute top-full left-0 right-0 h-4 z-[60]"
                        onMouseEnter={handleDropdownMouseEnter}
                      />
                    )}
                  </div>
  
                  {/* Dot separator */}
                  {index < CATEGORY_TAXONOMY.length - 1 && (
                    <span className={`text-[10px] transition-colors ${
                      isScrolledPastHero 
                        ? 'text-gray-300 dark:text-gray-700' 
                        : 'text-white/30'
                    }`}>
                      ·
                    </span>
                  )}
                </div>
              ))}
  
              {/* View All Link */}
              <span className={`text-[10px] transition-colors ${
                isScrolledPastHero 
                  ? 'text-gray-300 dark:text-gray-700' 
                  : 'text-white/30'
              }`}>
                ·
              </span>
              <div 
                className="relative"
                onMouseEnter={() => setShowViewAllDropdown(true)}
                onMouseLeave={() => setShowViewAllDropdown(false)}
              >
                <button
                  onClick={() => {
                    if (onViewAllCategories) onViewAllCategories();
                  }}
                  className={`font-['Satoshi',sans-serif] text-[14px] font-medium whitespace-nowrap transition-all duration-150 py-2 relative flex items-center gap-1.5 ${
                    isScrolledPastHero
                      ? 'text-gray-700 dark:text-gray-300 hover:text-[#FF6A3D]'
                      : showViewAllDropdown 
                        ? 'text-white' 
                        : 'text-white/80 hover:text-white'
                  }`}
                  style={{ letterSpacing: '0.3px' }}
                >
                  View All <ArrowRight size={14} />
                  {showViewAllDropdown && (
                    <motion.div
                      layoutId="viewAllUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#FF6A3D]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </nav>
  
          {/* Category Dropdowns - Positioned under active category */}
          {CATEGORY_TAXONOMY.map((category) => {
            const dropdownContent = getDropdownContent(category.slug);
            if (!dropdownContent) return null;
            
            // Get button position for alignment
            const buttonElement = categoryButtonRefs.current[category.slug];
            let leftPosition = '50%';
            
            if (buttonElement && activeCategory === category.slug) {
              const buttonRect = buttonElement.getBoundingClientRect();
              const buttonCenter = buttonRect.left + buttonRect.width / 2;
              leftPosition = `${buttonCenter}px`;
            }
            
            return (
              <AnimatePresence key={`${category.slug}-dropdown`}>
                {activeCategory === category.slug && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    className={`fixed -translate-x-1/2 rounded-[14px] border border-gray-200/60 dark:border-gray-800 z-[9999] max-h-[420px] overflow-y-auto custom-scrollbar pointer-events-auto ${
                      isScrolledPastHero ? 'top-[calc(64px+48px+32px)]' : 'top-[calc(76px+48px+32px+12px)]'
                    }`}
                    style={{
                      left: leftPosition,
                      width: '480px',
                      background: 'rgba(255, 255, 255, 0.96)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 14px 30px rgba(0, 0, 0, 0.12)',
                      padding: '24px'
                    }}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {/* Pointer Triangle */}
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-t border-l border-gray-200/60 dark:border-gray-800 rotate-45"
                      style={{
                        background: 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }}
                    />
  
                    {/* Two-column grid layout */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 relative">
                      {dropdownContent.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          <h3 className="text-[10px] font-medium text-[#9CA3AF] dark:text-gray-500 uppercase tracking-[0.08em] mb-3">
                            {group.heading}
                          </h3>
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((item, itemIndex) => (
                              <button
                                key={itemIndex}
                                onClick={() => handleCategoryClick(category.slug, item.toLowerCase().replace(/\s+/g, '-'))}
                                className="text-[14px] text-[#374151] dark:text-gray-400 hover:text-[#FF6A3D] hover:bg-[#FFF5F2] dark:hover:bg-gray-800 transition-all duration-120 text-left py-2 px-3 rounded-md"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
  
                    {/* View All Link */}
                    <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => {
                          handleCategoryClick(category.slug);
                          setActiveCategory(null);
                        }}
                        className="flex items-center gap-2 text-[12px] font-medium text-[#FF6A3D] hover:gap-3 transition-all"
                      >
                        View All {category.name} <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
  
          {/* View All Dropdown */}
          <AnimatePresence>
            {showViewAllDropdown && (
              <motion.div
                ref={viewAllDropdownRef}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className={`fixed left-1/2 -translate-x-1/2 w-[520px] max-w-[calc(100vw-2rem)] rounded-[14px] border border-gray-200/60 dark:border-gray-800 p-4 z-[9999] pointer-events-auto ${
                  isScrolledPastHero ? 'top-[calc(64px+48px+32px)]' : 'top-[calc(76px+48px+32px+12px)]'
                }`}
                style={{
                  background: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 14px 30px rgba(0, 0, 0, 0.12)'
                }}
                onMouseEnter={() => setShowViewAllDropdown(true)}
                onMouseLeave={() => setShowViewAllDropdown(false)}
              >
                <div className="mb-4">
                  <h3 className="text-[13px] font-medium text-gray-900 dark:text-white mb-1">
                    All Categories
                  </h3>
                  <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                    Browse our complete product catalog
                  </p>
                </div>
  
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {CATEGORY_TAXONOMY.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => {
                        handleCategoryClick(category.slug);
                        setShowViewAllDropdown(false);
                      }}
                      className="text-[13px] text-[#6B7280] dark:text-gray-400 hover:text-[#0F172A] dark:hover:text-white transition-colors text-left py-1.5 px-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
  
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => {
                      if (onViewAllCategories) onViewAllCategories();
                      setShowViewAllDropdown(false);
                    }}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF6A3D] hover:gap-2 transition-all uppercase tracking-wider"
                  >
                    Explore Category Directory <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  
        {/* Mobile "Browse Categories" Button */}
        <div 
          className={`md:hidden w-full transition-all duration-500 ${ 
            isScrolledPastHero 
              ? 'fixed top-[64px] z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800' 
              : 'absolute top-[76px] z-[3]'
          }`}
        >
          <div className="max-w-[640px] mx-auto px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-full h-[36px] px-4 rounded-full flex items-center justify-center gap-2 text-[13px] font-medium transition-all ${
                isScrolledPastHero
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/30'
              }`}
            >
              <Menu size={16} />
              Browse Categories
            </button>
          </div>
  
          {/* Mobile Full-Screen Category Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-y-auto"
              >
                <div className="sticky top-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
                  <h2 className="text-[16px] font-medium text-gray-900 dark:text-white">Categories</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="text-[20px] text-gray-600 dark:text-gray-400">×</span>
                  </button>
                </div>
  
                <div className="px-4 py-6">
                  {CATEGORY_TAXONOMY.map((category) => {
                    const dropdownContent = getDropdownContent(category.slug);
                    return (
                      <MobileAccordionCategory
                        key={category.slug}
                        category={category}
                        dropdownContent={dropdownContent}
                        onCategoryClick={handleCategoryClick}
                      />
                    );
                  })}
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onViewAllCategories) onViewAllCategories();
                    }}
                    className="w-full mt-6 py-3 bg-[#FF6A3D] text-white rounded-xl font-medium text-[14px] uppercase tracking-wider"
                  >
                    View All Categories
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  
        {/* Spacer when sticky (prevents content jump) */}
        {isScrolledPastHero && <div className="h-[48px] md:block hidden" />}
        {isScrolledPastHero && <div className="h-[52px] md:hidden block" />}
      </>
    );
  }
  
  interface MobileAccordionCategoryProps {
    category: CategoryNode;
    dropdownContent: DropdownGroup[] | null;
    onCategoryClick: (categorySlug: string, subcategory?: string, subSubcategory?: string) => void;
  }
  
  export function MobileAccordionCategory({ 
    category,
    dropdownContent,
    onCategoryClick
  }: MobileAccordionCategoryProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="mb-5 border-b border-gray-100 dark:border-gray-800 pb-5 last:border-0">
        <button
          onClick={handleToggle}
          className="w-full text-left font-medium text-[15px] text-gray-900 dark:text-white mb-3 hover:text-[#FF6A3D] transition-colors flex items-center justify-between"
        >
          {category.name}
          <span className={`text-[20px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>
        {isOpen && dropdownContent && (
          <div className="ml-4 space-y-4">
            {dropdownContent.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 className="text-[12px] font-medium text-[#4B5563] dark:text-gray-400 uppercase tracking-wide mb-2">
                  {group.heading}
                </h4>
                <div className="flex flex-col gap-2">
                  {group.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => {
                        onCategoryClick(category.slug, item.toLowerCase().replace(/\s+/g, '-'));
                      }}
                      className="text-left text-[13px] text-gray-600 dark:text-gray-400 hover:text-[#FF6A3D] transition-colors py-1"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }