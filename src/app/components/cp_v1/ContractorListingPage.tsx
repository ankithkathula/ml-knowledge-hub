import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2,
  X,
  ChevronDown,
  SlidersHorizontal,
  Paintbrush,
  Droplet,
  Zap,
  Hammer,
  Shield,
  Grid3x3,
  Wind,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- TYPES ---

interface Contractor {
  id: number;
  name: string;
  type: string;
  businessType: 'Firm' | 'Individual';
  tagline: string;
  services: string[];
  rating: number;
  reviews: number;
  projectsCompleted: number;
  location: string;
  banner: string;
  verified: boolean;
  yearsExperience: number;
  availability: 'Immediate' | 'Within 3 days' | 'Within a week';
}

// --- MOCK DATA ---

const CONTRACTOR_TYPES = [
  'All',
  'General Contractors',
  'Specialty Contractors', 
  'Trade Contractors',
  'Material Suppliers',
  'Testing Labs',
  'Consultants',
  'Interior Contractors',
  'Turnkey Firms'
];

const BUSINESS_TYPES = ['All', 'Firms', 'Individuals'];

const SERVICE_TYPES = [
  { id: 'painting', name: 'Painting', icon: Paintbrush },
  { id: 'plumbing', name: 'Plumbing', icon: Droplet },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer },
  { id: 'waterproofing', name: 'Waterproofing', icon: Shield },
  { id: 'tiling', name: 'Tiling', icon: Grid3x3 },
  { id: 'hvac', name: 'HVAC', icon: Wind },
  { id: 'renovation', name: 'Renovation', icon: Home }
];

const CONTRACTORS: Contractor[] = [
  {
    id: 1,
    name: 'BuildPro Construction',
    type: 'General Contractors',
    businessType: 'Firm',
    tagline: 'Turnkey Interiors • Civil Works',
    services: ['Renovation', 'Electrical', 'Plumbing'],
    rating: 4.9,
    reviews: 234,
    projectsCompleted: 324,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 12,
    availability: 'Immediate'
  },
  {
    id: 2,
    name: 'Elite Finishing Solutions',
    type: 'Specialty Contractors',
    businessType: 'Firm',
    tagline: 'Premium Painting • Waterproofing',
    services: ['Painting', 'Waterproofing'],
    rating: 4.8,
    reviews: 456,
    projectsCompleted: 567,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 8,
    availability: 'Within 3 days'
  },
  {
    id: 3,
    name: 'Precision Electricals',
    type: 'Trade Contractors',
    businessType: 'Firm',
    tagline: 'Commercial • Residential Wiring',
    services: ['Electrical', 'HVAC'],
    rating: 5.0,
    reviews: 189,
    projectsCompleted: 189,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 15,
    availability: 'Immediate'
  },
  {
    id: 4,
    name: 'Master Carpenters Co.',
    type: 'General Contractors',
    businessType: 'Firm',
    tagline: 'Custom Woodwork • Modular Kitchens',
    services: ['Carpentry', 'Renovation'],
    rating: 4.7,
    reviews: 312,
    projectsCompleted: 412,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1617047209531-3e6a1e4f9d9f?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 10,
    availability: 'Within 3 days'
  },
  {
    id: 5,
    name: 'AquaShield Experts',
    type: 'Specialty Contractors',
    businessType: 'Firm',
    tagline: 'Leak-Free Guarantee',
    services: ['Waterproofing', 'Tiling'],
    rating: 4.9,
    reviews: 278,
    projectsCompleted: 278,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 7,
    availability: 'Immediate'
  },
  {
    id: 6,
    name: 'TileArt Studios',
    type: 'Material Suppliers',
    businessType: 'Firm',
    tagline: 'Designer Tiles Installation',
    services: ['Tiling', 'Renovation'],
    rating: 4.6,
    reviews: 234,
    projectsCompleted: 345,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 6,
    availability: 'Within a week'
  },
  {
    id: 7,
    name: 'UrbanBuild Testing Labs',
    type: 'Testing Labs',
    businessType: 'Firm',
    tagline: 'Quality Assurance',
    services: ['Testing', 'Inspection'],
    rating: 4.8,
    reviews: 156,
    projectsCompleted: 523,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 20,
    availability: 'Immediate'
  },
  {
    id: 8,
    name: 'ProTech HVAC Systems',
    type: 'Trade Contractors',
    businessType: 'Firm',
    tagline: 'Climate Control Experts',
    services: ['HVAC', 'Ventilation'],
    rating: 4.9,
    reviews: 267,
    projectsCompleted: 398,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1631545806608-bc87d60b9fdb?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 11,
    availability: 'Within 3 days'
  },
  {
    id: 9,
    name: 'Rajesh Kumar',
    type: 'Trade Contractors',
    businessType: 'Individual',
    tagline: 'Expert Plumber • 24/7 Service',
    services: ['Plumbing', 'Waterproofing'],
    rating: 4.7,
    reviews: 89,
    projectsCompleted: 156,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 9,
    availability: 'Immediate'
  },
  {
    id: 10,
    name: 'Smart Interiors Hub',
    type: 'Interior Contractors',
    businessType: 'Firm',
    tagline: 'Complete Turnkey Solutions',
    services: ['Renovation', 'Painting', 'Tiling'],
    rating: 4.8,
    reviews: 423,
    projectsCompleted: 512,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 13,
    availability: 'Within 3 days'
  },
  {
    id: 11,
    name: 'Phoenix Build Solutions',
    type: 'Turnkey Firms',
    businessType: 'Firm',
    tagline: 'End-to-End Construction',
    services: ['Renovation', 'Electrical', 'Plumbing', 'Painting'],
    rating: 4.9,
    reviews: 567,
    projectsCompleted: 678,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 16,
    availability: 'Immediate'
  },
  {
    id: 12,
    name: 'Vikram Electricals',
    type: 'Trade Contractors',
    businessType: 'Individual',
    tagline: 'Licensed Electrician',
    services: ['Electrical'],
    rating: 4.6,
    reviews: 67,
    projectsCompleted: 134,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800',
    verified: false,
    yearsExperience: 5,
    availability: 'Immediate'
  }
];

const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'];

// --- COMPONENT ---

export function ContractorListingPage({ 
  onContractorClick 
}: { 
  onContractorClick?: (contractorId: number) => void;
}) {
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Mumbai');
  const [contractorType, setContractorType] = useState('All');
  const [businessType, setBusinessType] = useState('All');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  
  // Advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [experienceRange, setExperienceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availability, setAvailability] = useState('all');

  // UI states
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Ref for scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll to left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll to right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Toggle service filter
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(s => s !== serviceId) 
        : [...prev, serviceId]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setContractorType('All');
    setBusinessType('All');
    setSelectedServices([]);
    setExperienceRange('all');
    setMinRating(0);
    setVerifiedOnly(false);
    setAvailability('all');
  };

  // Filter and sort contractors
  const filteredContractors = useMemo(() => {
    let filtered = CONTRACTORS.filter(contractor => {
      // Location
      if (contractor.location !== location) return false;

      // Search
      if (searchQuery && !contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !contractor.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Contractor type
      if (contractorType !== 'All' && contractor.type !== contractorType) return false;

      // Business type
      if (businessType !== 'All' && contractor.businessType !== businessType) return false;

      // Services
      if (selectedServices.length > 0 && !selectedServices.some(s => 
        contractor.services.some(cs => cs.toLowerCase() === s.toLowerCase())
      )) {
        return false;
      }

      // Experience
      if (experienceRange === '0-5' && contractor.yearsExperience > 5) return false;
      if (experienceRange === '5-10' && (contractor.yearsExperience < 5 || contractor.yearsExperience > 10)) return false;
      if (experienceRange === '10+' && contractor.yearsExperience < 10) return false;

      // Rating
      if (contractor.rating < minRating) return false;

      // Verified only
      if (verifiedOnly && !contractor.verified) return false;

      // Availability
      if (availability !== 'all' && contractor.availability !== availability) return false;

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'projects':
          return b.projectsCompleted - a.projectsCompleted;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [location, searchQuery, contractorType, businessType, selectedServices, experienceRange, minRating, verifiedOnly, availability, sortBy]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (contractorType !== 'All') count++;
    if (businessType !== 'All') count++;
    if (selectedServices.length > 0) count += selectedServices.length;
    if (experienceRange !== 'all') count++;
    if (minRating > 0) count++;
    if (verifiedOnly) count++;
    if (availability !== 'all') count++;
    return count;
  }, [contractorType, businessType, selectedServices, experienceRange, minRating, verifiedOnly, availability]);

  return (
    <div className="min-h-screen bg-gray-50 font-['Satoshi',sans-serif] pt-16 md:pt-20 lg:pt-24">
      
      {/* PAGE HEADER */}
      <section className="bg-white border-b border-gray-200 sticky top-[64px] md:top-[72px] z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* LEFT - Title */}
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold text-gray-900 uppercase tracking-tight mb-1">
                Verified Contractors
              </h1>
              <p className="text-[13px] text-gray-600">
                Find trusted professionals based on your location and needs
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="relative">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 h-11 px-4 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 hover:border-gray-300 transition-all min-w-[200px] justify-between"
              >
                <span className="text-gray-500">Sort by:</span>
                <span className="font-medium">
                  {sortBy === 'rating' && 'Highest Rating'}
                  {sortBy === 'projects' && 'Most Projects'}
                  {sortBy === 'reviews' && 'Most Reviews'}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {[
                      { value: 'rating', label: 'Highest Rating' },
                      { value: 'projects', label: 'Most Projects' },
                      { value: 'reviews', label: 'Most Reviews' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full h-10 px-4 text-[13px] text-left hover:bg-gray-50 transition-colors ${
                          sortBy === option.value ? 'bg-[#FFF3EF] text-[#FF6A3D] font-medium' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL FILTER BAR */}
      <section className="bg-white border-b border-gray-200 sticky top-[160px] md:top-[152px] z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
          {/* Row 1: Search + Location + Advanced Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search contractors, firms, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/50 focus:bg-white transition-all"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <button 
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-700 hover:border-gray-300 transition-all min-w-[160px]"
              >
                <MapPin size={16} className="text-gray-400" />
                <span className="font-medium">{location}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLocationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {LOCATIONS.map(loc => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full h-10 px-4 text-[13px] text-left hover:bg-gray-50 transition-colors ${
                          location === loc ? 'bg-[#FFF3EF] text-[#FF6A3D] font-medium' : 'text-gray-700'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Advanced Filters Button */}
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 h-11 px-4 border rounded-lg text-[13px] font-medium transition-all ${
                activeFiltersCount > 0
                  ? 'bg-[#FF6A3D] text-white border-[#FF6A3D]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-white text-[#FF6A3D] rounded-full text-[11px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Row 2: Contractor Type Pills */}
          <div className="relative mb-3 group">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all ${
                showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all ${
                showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>

            {/* Left Gradient Overlay */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-[5] pointer-events-none transition-opacity ${
                showLeftArrow ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Right Gradient Overlay */}
            <div 
              className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-[5] pointer-events-none transition-opacity ${
                showRightArrow ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              className="overflow-x-auto scrollbar-hide pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-2.5 px-1 min-w-max">
                {CONTRACTOR_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setContractorType(type)}
                    className={`h-10 px-5 rounded-[24px] text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap select-none ${
                      contractorType === type
                        ? 'bg-[#FF6A3D] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Business Type + Service Type */}
          <div className="flex flex-wrap gap-2">
            {/* Business Type */}
            {BUSINESS_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setBusinessType(type)}
                className={`h-8 px-3 rounded-lg text-[11px] font-medium transition-all ${
                  businessType === type
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}

            <div className="w-px h-8 bg-gray-200 mx-1" />

            {/* Service Type */}
            {SERVICE_TYPES.map(service => (
              <button
                key={service.id}
                onClick={() => toggleService(service.name)}
                className={`h-8 px-3 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                  selectedServices.includes(service.name)
                    ? 'bg-[#FFF3EF] text-[#FF6A3D] border border-[#FF6A3D]'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <service.icon size={12} />
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANCED FILTERS DRAWER */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdvancedFilters(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold text-gray-900 uppercase tracking-tight">
                    Advanced Filters
                  </h3>
                  <button onClick={() => setShowAdvancedFilters(false)}>
                    <X size={24} className="text-gray-400 hover:text-gray-900" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Experience */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                      Experience
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All' },
                        { value: '0-5', label: '0-5 years' },
                        { value: '5-10', label: '5-10 years' },
                        { value: '10+', label: '10+ years' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setExperienceRange(option.value)}
                          className={`w-full h-10 px-4 rounded-lg text-[13px] text-left transition-all ${
                            experienceRange === option.value
                              ? 'bg-[#FFF3EF] text-[#FF6A3D] font-medium border border-[#FF6A3D]'
                              : 'bg-gray-50 text-gray-700 border border-transparent hover:bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                      Minimum Rating
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 0, label: 'All Ratings' },
                        { value: 3, label: '3★ & above' },
                        { value: 4, label: '4★ & above' },
                        { value: 4.5, label: '4.5★ & above' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setMinRating(option.value)}
                          className={`w-full h-10 px-4 rounded-lg text-[13px] text-left transition-all ${
                            minRating === option.value
                              ? 'bg-[#FFF3EF] text-[#FF6A3D] font-medium border border-[#FF6A3D]'
                              : 'bg-gray-50 text-gray-700 border border-transparent hover:bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                      Availability
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'Immediate', label: 'Immediate' },
                        { value: 'Within 3 days', label: 'Within 3 days' },
                        { value: 'Within a week', label: 'Within a week' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setAvailability(option.value)}
                          className={`w-full h-10 px-4 rounded-lg text-[13px] text-left transition-all ${
                            availability === option.value
                              ? 'bg-[#FFF3EF] text-[#FF6A3D] font-medium border border-[#FF6A3D]'
                              : 'bg-gray-50 text-gray-700 border border-transparent hover:bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div>
                    <label className="flex items-center justify-between h-12 px-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all">
                      <span className="text-[13px] font-medium text-gray-900">Verified Only</span>
                      <input 
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="w-5 h-5 accent-[#FF6A3D] cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={clearAllFilters}
                    className="flex-1 h-12 bg-gray-100 text-gray-900 rounded-lg text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowAdvancedFilters(false)}
                    className="flex-1 h-12 bg-[#FF6A3D] text-white rounded-lg text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ACTIVE FILTERS BAR */}
      {activeFiltersCount > 0 && (
        <section className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Active Filters:
              </span>
              
              {contractorType !== 'All' && (
                <button 
                  onClick={() => setContractorType('All')}
                  className="flex items-center gap-2 h-7 px-3 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700 hover:border-[#FF6A3D] transition-all"
                >
                  {contractorType}
                  <X size={12} />
                </button>
              )}

              {businessType !== 'All' && (
                <button 
                  onClick={() => setBusinessType('All')}
                  className="flex items-center gap-2 h-7 px-3 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700 hover:border-[#FF6A3D] transition-all"
                >
                  {businessType}
                  <X size={12} />
                </button>
              )}

              {selectedServices.map(service => (
                <button 
                  key={service}
                  onClick={() => toggleService(service)}
                  className="flex items-center gap-2 h-7 px-3 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700 hover:border-[#FF6A3D] transition-all"
                >
                  {service}
                  <X size={12} />
                </button>
              ))}

              {verifiedOnly && (
                <button 
                  onClick={() => setVerifiedOnly(false)}
                  className="flex items-center gap-2 h-7 px-3 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700 hover:border-[#FF6A3D] transition-all"
                >
                  Verified Only
                  <X size={12} />
                </button>
              )}

              <button 
                onClick={clearAllFilters}
                className="ml-2 text-[11px] font-bold uppercase tracking-widest text-[#FF6A3D] hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* RESULTS SECTION */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[13px] text-gray-600">
              <span className="font-bold text-gray-900">{filteredContractors.length}</span> contractors found
            </p>
          </div>

          {/* Results Grid */}
          {filteredContractors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredContractors.slice(0, visibleCount).map((contractor, idx) => (
                  <motion.div
                    key={contractor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onContractorClick?.(contractor.id)}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                  >
                    <div className="h-[140px] relative overflow-hidden">
                      <ImageWithFallback 
                        src={contractor.banner}
                        alt={contractor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {contractor.verified && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 h-6 px-2.5 bg-white/95 backdrop-blur-sm rounded-full">
                          <CheckCircle2 size={10} className="text-[#FF6A3D]" />
                          <span className="text-[9px] font-bold text-gray-900">VERIFIED</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors line-clamp-1">
                        {contractor.name}
                      </h3>
                      <p className="text-[11px] text-gray-600 mb-3">
                        {contractor.type}
                      </p>

                      {/* Services */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {contractor.services.slice(0, 2).map(service => (
                          <span 
                            key={service}
                            className="h-5 px-2 bg-gray-100 text-gray-700 rounded-full text-[9px] font-medium flex items-center"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-2 mb-4 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                          <span className="font-bold text-gray-900">{contractor.rating}</span>
                        </div>
                        <span className="text-gray-500">({contractor.reviews})</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{contractor.location}</span>
                      </div>

                      <button className="w-full h-9 bg-gray-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] transition-all">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredContractors.length && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="h-12 px-8 bg-gray-900 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] transition-all"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                No contractors found
              </h3>
              <p className="text-[14px] text-gray-600 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button 
                onClick={clearAllFilters}
                className="h-12 px-8 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}