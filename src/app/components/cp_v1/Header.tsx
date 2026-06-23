import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Sun, 
  Moon, 
  Menu, 
  X,
  MapPin,
  ChevronDown,
  LocateFixed,
  Search,
  ChevronRight
} from 'lucide-react';
import { useTheme } from "../ThemeContext";
import logoImage from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";

interface HeaderProps {
  onNavigateToHome?: () => void;
  onNavigateToSignIn?: () => void;
  onNavigateToSignUp?: () => void;
  onNavigateToBrands?: () => void;
  onNavigateToProducts?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProfessionals?: () => void;
  onSearch?: (query: string) => void;
  currentPage?: string;
  showStickySearch?: boolean;
}

export function Header({ 
  onNavigateToHome, 
  onNavigateToSignIn,
  onNavigateToSignUp,
  onNavigateToBrands,
  onNavigateToProducts,
  onNavigateToServices,
  onNavigateToProfessionals,
  onSearch,
  currentPage,
  showStickySearch = false,
}: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [location, setLocation] = useState('New York, NY');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cities = ['New York', 'London', 'Dubai', 'Singapore', 'Mumbai', 'Sydney'];

  const handleNavClick = (item: string) => {
    if (item === 'Brands' && onNavigateToBrands) onNavigateToBrands();
    if (item === 'Products' && onNavigateToProducts) onNavigateToProducts();
    if (item === 'Services' && onNavigateToServices) onNavigateToServices();
    if (item === 'Professionals' && onNavigateToProfessionals) onNavigateToProfessionals();
    setIsMobileMenuOpen(false);
  };

  const isOpaquePage = currentPage === 'brand-profile' || currentPage === 'product-detail' || currentPage === 'products' || currentPage === 'brands';

  const NavItems = [
    { name: 'BRANDS', action: onNavigateToBrands },
    { name: 'PRODUCTS', action: onNavigateToProducts },
    { name: 'SERVICES', action: onNavigateToServices },
    { name: 'STUDIOS', action: onNavigateToProfessionals },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[64px] flex items-center`}
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* LEFT ZONE — Logo Zone */}
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={onNavigateToHome} className="flex items-center cursor-pointer">
              <img 
                src={logoImage} 
                alt="Material Library" 
                className="h-6 md:h-7 w-auto transition-all duration-[120ms]"
                style={{ maxHeight: '28px' }}
              />
            </button>
          </div>

          {/* CENTER ZONE — Navigation Zone (Desktop Only) */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2" style={{ gap: '28px' }}>
            {['BRANDS', 'PRODUCTS', 'SERVICES', 'STUDIOS'].map((item) => {
              const isActive = 
                currentPage === item.toLowerCase() || 
                (item === 'BRANDS' && currentPage === 'brand-profile') ||
                (item === 'STUDIOS' && (currentPage === 'professionals-landing' || currentPage === 'professional-microsite' || currentPage === 'professional-directory' || currentPage === 'studio-directory' || currentPage === 'professional-profile' || currentPage === 'studio-profile'));
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.charAt(0) + item.slice(1).toLowerCase())}
                  className={`font-['Satoshi',sans-serif] text-[14px] font-medium uppercase tracking-[0.08em] transition-all duration-[120ms] ease-out py-3 ${
                    isActive ? 'text-[#FF6A3D]' : 'text-[#1F1F1F] hover:text-[#FF6A3D]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ZONE — Actions Zone */}
          <div className="flex items-center" style={{ gap: '20px' }}>
            {/* Location Selector (Desktop Only) */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setShowLocationPopup(!showLocationPopup)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-100 transition-all duration-[120ms] cursor-pointer text-[#444444] hover:text-[#FF6A3D]"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold max-w-[80px] truncate uppercase tracking-widest">{location}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

              <AnimatePresence>
                {showLocationPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4"
                  >
                    <div className="flex flex-col gap-4">
                      <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FF6A3D] hover:opacity-80 transition-opacity">
                        <LocateFixed className="w-3.5 h-3.5" /> Auto-detect location
                      </button>
                      
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Enter pincode..." 
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full h-9 pl-3 pr-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-[11px] border border-transparent focus:border-[#FF6A3D]/30 transition-all outline-none font-['Satoshi',sans-serif]"
                        />
                        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Select City</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {cities.map(city => (
                            <button 
                              key={city}
                              onClick={() => { setLocation(city); setShowLocationPopup(false); }}
                              className="text-left px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-[11px] transition-colors uppercase tracking-widest font-bold font-['Satoshi',sans-serif]"
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={toggleDarkMode} className="p-1.5 md:p-2 rounded-lg transition-all duration-[120ms] text-[#444444] hover:text-[#FF6A3D] hover:bg-gray-50">
                {isDarkMode ? <Sun className="w-3.5 md:w-4 h-3.5 md:h-4" /> : <Moon className="w-3.5 md:w-4 h-3.5 md:h-4" />}
              </button>
              <button className="p-1.5 md:p-2 rounded-lg transition-all duration-[120ms] relative text-[#444444] hover:text-[#FF6A3D] hover:bg-gray-50">
                <ShoppingCart className="w-3.5 md:w-4 h-3.5 md:h-4" />
                <span className="absolute top-1.5 right-1.5 w-1 md:w-1.5 h-1 md:h-1.5 bg-[#FF6A3D] rounded-full" />
              </button>
            </div>

            <div className="h-3 w-px mx-1 bg-gray-200 hidden md:block" />

            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={onNavigateToSignIn} className="hidden md:block text-[12px] font-bold uppercase tracking-widest transition-all duration-[120ms] hover:text-[#FF6A3D] font-['Satoshi',sans-serif] text-[#1F1F1F]">
                Sign in
              </button>
              <button 
                onClick={onNavigateToSignUp} 
                className="hidden md:flex h-[32px] md:h-[36px] px-[12px] md:px-[16px] bg-[#FF6A3D] text-white rounded-[6px] md:rounded-[8px] text-[11px] md:text-[13px] font-medium uppercase transition-all hover:bg-[#ff5a2d] font-['Satoshi',sans-serif] whitespace-nowrap items-center justify-center"
              >
                Sign up
              </button>
              {/* Hamburger Menu (Mobile Only) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className={`p-1.5 rounded-lg lg:hidden ${isScrolled || isOpaquePage || isMobileMenuOpen ? 'text-[#0F172A] dark:text-white' : 'text-white'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Search Bar (Mobile & Desktop) */}
        <AnimatePresence>
          {showStickySearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 64, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-full left-0 right-0 overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="h-[64px] flex items-center justify-center px-4 md:px-6">
                <div className="w-full max-w-[520px] relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search materials, brands, categories..."
                    className="w-full h-[40px] pl-10 md:pl-12 pr-24 md:pr-28 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-[#FF6A3D]/20 rounded-[10px] text-[13px] md:text-[14px] font-['Satoshi',sans-serif] outline-none transition-all placeholder:text-gray-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && onSearch) onSearch((e.target as HTMLInputElement).value);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (onSearch) onSearch(input.value);
                    }}
                    className="absolute right-1 h-[32px] px-4 md:px-5 bg-[#FF6A3D] text-white rounded-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-wider hover:bg-[#ff5a2d] transition-colors font-['Satoshi',sans-serif]"
                  >
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-white dark:bg-gray-950 lg:hidden overflow-y-auto"
          >
            <div className="pt-24 px-6 pb-12 flex flex-col min-h-full">
              <div className="flex flex-col gap-2 mb-8">
                {NavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { item.action?.(); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-between py-5 border-b border-gray-100 dark:border-gray-800"
                  >
                    <span className="text-xl font-medium uppercase tracking-[0.1em] text-[#0F172A] dark:text-white">
                      {item.name}
                    </span>
                    <ChevronRight size={20} className="text-[#FF6A3D]" />
                  </button>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  onClick={() => { onNavigateToSignIn?.(); setIsMobileMenuOpen(false); }}
                  className="w-full h-14 border border-gray-200 dark:border-gray-800 rounded-xl font-bold uppercase tracking-widest text-[#0F172A] dark:text-white"
                >
                  Sign in
                </button>
                <button 
                  onClick={() => { onNavigateToSignUp?.(); setIsMobileMenuOpen(false); }}
                  className="w-full h-14 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest"
                >
                  Sign up
                </button>
                
                {/* Mobile Location Selector */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-[#FF6A3D]" size={20} />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Deliver to</span>
                      <span className="text-sm font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">{location}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Enter pincode..." 
                      className="w-full h-11 pl-10 pr-4 bg-white dark:bg-gray-800 rounded-xl text-sm border border-transparent focus:border-[#FF6A3D]/30 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}