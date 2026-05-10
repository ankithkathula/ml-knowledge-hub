import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  ChevronDown,
  SlidersHorizontal,
  X,
  Check,
  Building2,
  ArrowLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- TYPES ---

interface BrandListingPageProps {
  onBack?: () => void;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  categories: string[];
  description: string;
  productsCount: number;
  verified: boolean;
}

// --- MOCK DATA ---

const CATEGORIES = [
  'All',
  'Cement',
  'Concrete',
  'Tiles',
  'Paints',
  'Steel',
  'Bricks',
  'Plywood',
  'Adhesives',
  'Waterproofing',
  'Electrical',
  'Plumbing'
];

const BRANDS_LIST = [
  'All Brands',
  'UltraTech',
  'ACC',
  'Ambuja',
  'JK Cement',
  'Asian Paints',
  'Berger Paints',
  'Kajaria',
  'Somany',
  'Tata Steel',
  'JSW Steel'
];

const CEMENT_ATTRIBUTES = ['OPC', 'PPC', 'White Cement', 'Waterproof'];
const PAINT_ATTRIBUTES = ['Interior', 'Exterior', 'Emulsion', 'Enamel'];
const TILE_ATTRIBUTES = ['Ceramic', 'Vitrified', 'Porcelain', 'Marble'];

const MOCK_BRANDS: Brand[] = [
  {
    id: 1,
    name: 'UltraTech Cement',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    categories: ['Cement', 'Concrete'],
    description: 'India\'s largest cement manufacturer with premium quality products',
    productsCount: 45,
    verified: true
  },
  {
    id: 2,
    name: 'Asian Paints',
    logo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400',
    categories: ['Paints', 'Waterproofing'],
    description: 'Leading paint brand offering wide range of interior & exterior solutions',
    productsCount: 120,
    verified: true
  },
  {
    id: 3,
    name: 'Kajaria Ceramics',
    logo: 'https://images.unsplash.com/photo-1604075698925-5f4a79d05b85?auto=format&fit=crop&q=80&w=400',
    categories: ['Tiles'],
    description: 'Premium tiles manufacturer with innovative designs',
    productsCount: 230,
    verified: true
  },
  {
    id: 4,
    name: 'ACC Cement',
    logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400',
    categories: ['Cement'],
    description: 'Trusted cement brand known for strength and durability',
    productsCount: 38,
    verified: true
  },
  {
    id: 5,
    name: 'Berger Paints',
    logo: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=400',
    categories: ['Paints'],
    description: 'Complete range of decorative and protective coatings',
    productsCount: 95,
    verified: true
  },
  {
    id: 6,
    name: 'Tata Steel',
    logo: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=400',
    categories: ['Steel'],
    description: 'High-quality steel products for construction needs',
    productsCount: 67,
    verified: true
  },
  {
    id: 7,
    name: 'Somany Ceramics',
    logo: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=400',
    categories: ['Tiles', 'Sanitaryware'],
    description: 'Premium tiles and bathroom solutions',
    productsCount: 180,
    verified: true
  },
  {
    id: 8,
    name: 'Ambuja Cement',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    categories: ['Cement'],
    description: 'Sustainable cement solutions with superior quality',
    productsCount: 42,
    verified: true
  },
  {
    id: 9,
    name: 'JK Cement',
    logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400',
    categories: ['Cement', 'Putty'],
    description: 'Premium cement and wall putty manufacturer',
    productsCount: 35,
    verified: true
  },
  {
    id: 10,
    name: 'JSW Steel',
    logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400',
    categories: ['Steel'],
    description: 'Comprehensive range of steel products',
    productsCount: 58,
    verified: true
  },
  {
    id: 11,
    name: 'Pidilite',
    logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400',
    categories: ['Adhesives', 'Waterproofing'],
    description: 'Trusted adhesives and waterproofing solutions',
    productsCount: 72,
    verified: true
  },
  {
    id: 12,
    name: 'Greenply',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    categories: ['Plywood'],
    description: 'Leading plywood and decorative veneers brand',
    productsCount: 48,
    verified: true
  }
];

// --- COMPONENT ---

export function BrandListingPage({ onBack }: BrandListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['All Brands']);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  // Advanced Filter States (Drawer)
  const [drawerCategories, setDrawerCategories] = useState<string[]>([]);
  const [drawerBrands, setDrawerBrands] = useState<string[]>([]);
  const [drawerAttributes, setDrawerAttributes] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newSelection = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== 'All'), category];
      setSelectedCategories(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  const toggleBrand = (brand: string) => {
    if (brand === 'All Brands') {
      setSelectedBrands(['All Brands']);
    } else {
      const newSelection = selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands.filter(b => b !== 'All Brands'), brand];
      setSelectedBrands(newSelection.length === 0 ? ['All Brands'] : newSelection);
    }
  };

  const toggleAttribute = (attr: string) => {
    setSelectedAttributes(prev =>
      prev.includes(attr)
        ? prev.filter(a => a !== attr)
        : [...prev, attr]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories(['All']);
    setSelectedBrands(['All Brands']);
    setSelectedAttributes([]);
    setSearchQuery('');
  };

  const getActiveAttributes = () => {
    if (selectedCategories.includes('Cement')) return CEMENT_ATTRIBUTES;
    if (selectedCategories.includes('Paints')) return PAINT_ATTRIBUTES;
    if (selectedCategories.includes('Tiles')) return TILE_ATTRIBUTES;
    return [];
  };

  const activeAttributes = getActiveAttributes();

  // Calculate active filters
  const activeFilters = useMemo(() => {
    const filters: Array<{ type: string; value: string }> = [];
    
    if (!selectedCategories.includes('All')) {
      selectedCategories.forEach(cat => filters.push({ type: 'category', value: cat }));
    }
    if (!selectedBrands.includes('All Brands')) {
      selectedBrands.forEach(brand => filters.push({ type: 'brand', value: brand }));
    }
    selectedAttributes.forEach(attr => filters.push({ type: 'attribute', value: attr }));
    
    return filters;
  }, [selectedCategories, selectedBrands, selectedAttributes]);

  // Filter brands
  const filteredBrands = useMemo(() => {
    return MOCK_BRANDS.filter(brand => {
      // Search
      if (searchQuery && !brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !brand.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Categories
      if (!selectedCategories.includes('All')) {
        if (!brand.categories.some(c => selectedCategories.includes(c))) {
          return false;
        }
      }

      // Brands
      if (!selectedBrands.includes('All Brands')) {
        if (!selectedBrands.some(b => brand.name.includes(b))) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedBrands]);

  const removeFilter = (type: string, value: string) => {
    if (type === 'category') {
      toggleCategory(value);
    } else if (type === 'brand') {
      toggleBrand(value);
    } else if (type === 'attribute') {
      toggleAttribute(value);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif]">
      
      {/* BACK BUTTON */}
      {onBack && (
        <div className="border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      )}

      {/* TOP SPACING */}
      <div className="h-8"></div>

      {/* PRIMARY SEARCH + CONTROL BAR (STICKY) */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-2.5">
            
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search materials, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-white border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
              />
            </div>

            {/* Location Selector */}
            <div className="relative w-full md:w-[160px]">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-11 pl-10 pr-9 bg-white border border-gray-300 rounded-lg text-[13px] font-medium outline-none cursor-pointer appearance-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-[180px]">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-3.5 pr-9 bg-white border border-gray-300 rounded-lg text-[13px] font-medium outline-none cursor-pointer appearance-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="name">Name (A-Z)</option>
                <option value="popular">Most Popular</option>
                <option value="products">Product Count</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Filters Button */}
            <button 
              onClick={() => setShowFilterDrawer(true)}
              className="relative h-11 px-5 bg-gray-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 justify-center whitespace-nowrap"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6A3D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* FILTER CHIP SECTIONS */}
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 space-y-3">
            
            {/* Category Chips */}
            <div className="flex items-center gap-3">
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap min-w-[70px]">
                Category:
              </label>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {CATEGORIES.slice(0, 6).map(category => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#FF6A3D] text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-[#FF6A3D]'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                      {category}
                    </button>
                  );
                })}
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all whitespace-nowrap"
                >
                  + More
                </button>
              </div>
            </div>

            {/* Brand Chips */}
            <div className="flex items-center gap-3">
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap min-w-[70px]">
                Brands:
              </label>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {BRANDS_LIST.slice(0, 5).map(brand => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Attribute Chips (Contextual) */}
            {activeAttributes.length > 0 && (
              <div className="flex items-center gap-3">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide whitespace-nowrap min-w-[70px]">
                  Type:
                </label>
                <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {activeAttributes.map(attr => {
                    const isSelected = selectedAttributes.includes(attr);
                    return (
                      <button
                        key={attr}
                        onClick={() => toggleAttribute(attr)}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#FF6A3D] text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-[#FF6A3D]'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                        {attr}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* APPLIED FILTERS BAR */}
      {activeFilters.length > 0 && (
        <div className="sticky top-[136px] z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Active:
              </span>
              
              {activeFilters.map((filter, index) => (
                <button
                  key={`${filter.type}-${filter.value}-${index}`}
                  onClick={() => removeFilter(filter.type, filter.value)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium hover:opacity-80 transition-all ${
                    filter.type === 'category' ? 'bg-[#FF6A3D] text-white' :
                    filter.type === 'brand' ? 'bg-gray-900 text-white' :
                    'bg-[#FF6A3D] text-white'
                  }`}
                >
                  {filter.value}
                  <X size={12} className="group-hover:rotate-90 transition-transform" />
                </button>
              ))}
              
              <button
                onClick={clearAllFilters}
                className="ml-auto text-[11px] font-bold text-[#FF6A3D] uppercase tracking-wide hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS HEADER */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          
          {/* Left: Location + Count */}
          <div className="flex items-center gap-2 text-[13px]">
            <MapPin size={14} className="text-gray-400" />
            <span className="font-medium text-gray-900">{selectedLocation}</span>
            <span className="text-gray-400">•</span>
            <span className="font-bold text-gray-900">{filteredBrands.length}</span>
            <span className="text-gray-600">Brands Found</span>
          </div>

          {/* Right: Results Range */}
          <div className="text-[12px] text-gray-600">
            Showing <span className="font-bold text-gray-900">1–{Math.min(12, filteredBrands.length)}</span> of{' '}
            <span className="font-bold text-gray-900">{filteredBrands.length}</span>
          </div>
        </div>
      </div>

      {/* BRAND GRID */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-16">
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBrands.slice(0, 12).map(brand => (
              <motion.div
                key={brand.id}
                whileHover={{ y: -6 }}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#FF6A3D] hover:shadow-lg transition-all"
              >
                {/* Logo */}
                <div className="relative h-[160px] overflow-hidden bg-gray-50">
                  <ImageWithFallback 
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {brand.verified && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-[#FF6A3D]" />
                      <span className="text-[10px] font-bold text-gray-900">Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2 group-hover:text-[#FF6A3D] transition-colors">
                    {brand.name}
                  </h3>

                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {brand.categories.slice(0, 2).map(category => (
                      <span 
                        key={category}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {brand.description}
                  </p>

                  {/* Products Count */}
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-4">
                    <Building2 size={12} />
                    <span>{brand.productsCount} Products</span>
                  </div>

                  {/* CTA */}
                  <button className="w-full h-10 bg-gray-100 text-gray-900 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] hover:text-white transition-all group-hover:bg-[#FF6A3D] group-hover:text-white flex items-center justify-center gap-2">
                    View Products
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-2">No brands found</h3>
            <p className="text-[14px] text-gray-600 mb-6 text-center max-w-md">
              Try adjusting your filters or search criteria to find more results.
            </p>
            <button 
              onClick={clearAllFilters}
              className="px-8 py-3 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* ADVANCED FILTER DRAWER */}
      <AnimatePresence>
        {showFilterDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterDrawer(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[440px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
                <h2 className="text-[20px] font-bold text-gray-900">Advanced Filters</h2>
                <button 
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-8">
                
                {/* Categories */}
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Categories
                  </label>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text"
                      placeholder="Search categories..."
                      className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
                    />
                  </div>
                  {/* List */}
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {CATEGORIES.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-5 h-5 border-2 border-gray-300 rounded accent-[#FF6A3D] cursor-pointer"
                        />
                        <span className="text-[14px] text-gray-700 group-hover:text-gray-900">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Brands
                  </label>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text"
                      placeholder="Search brands..."
                      className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
                    />
                  </div>
                  {/* List */}
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {BRANDS_LIST.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-5 h-5 border-2 border-gray-300 rounded accent-[#FF6A3D] cursor-pointer"
                        />
                        <span className="text-[14px] text-gray-700 group-hover:text-gray-900">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Attributes (if category selected) */}
                {activeAttributes.length > 0 && (
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">
                      Specifications
                    </label>
                    <div className="space-y-2">
                      {activeAttributes.map(attr => (
                        <label key={attr} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={selectedAttributes.includes(attr)}
                            onChange={() => toggleAttribute(attr)}
                            className="w-5 h-5 border-2 border-gray-300 rounded accent-[#FF6A3D] cursor-pointer"
                          />
                          <span className="text-[14px] text-gray-700 group-hover:text-gray-900">
                            {attr}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 flex gap-3">
                <button 
                  onClick={clearAllFilters}
                  className="flex-1 h-12 bg-gray-100 text-gray-900 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilterDrawer(false)}
                  className="flex-1 h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CATEGORY MODAL (+ More) */}
      <AnimatePresence>
        {showCategoryModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategoryModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <h2 className="text-[20px] font-bold text-gray-900">All Categories</h2>
                <button 
                  onClick={() => setShowCategoryModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    placeholder="Search categories..."
                    className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D] focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                  {CATEGORIES.map(category => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          toggleCategory(category);
                          setShowCategoryModal(false);
                        }}
                        className={`px-4 py-3 rounded-lg text-[13px] font-medium transition-all text-left ${
                          isSelected
                            ? 'bg-[#FF6A3D] text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white border-t border-gray-200 px-8 py-6">
                <button 
                  onClick={() => setShowCategoryModal(false)}
                  className="w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
