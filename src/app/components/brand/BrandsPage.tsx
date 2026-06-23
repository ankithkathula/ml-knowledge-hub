import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Package, 
  Filter, 
  X, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Building2,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- Mock Data ---

const AD_SLIDES = [
  {
    id: 1,
    heading: "Premium Construction Brands",
    subtext: "Discover India's leading manufacturers and material providers",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    cta: "Explore Catalog"
  },
  {
    id: 2,
    heading: "Verified Material Partners",
    subtext: "Source certified material suppliers for large-scale projects",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920",
    cta: "View Directory"
  },
  {
    id: 3,
    heading: "Sustainable Building Solutions",
    subtext: "Discover eco-friendly materials from top-tier brands",
    image: "https://images.unsplash.com/photo-1518005020251-582c788447dd?auto=format&fit=crop&q=80&w=1920",
    cta: "Learn More"
  }
];

const LOCATIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Noida', 'Gurgaon'
];

interface CategoryNode {
  id: string;
  name: string;
  subcategories?: CategoryNode[];
}

const CATEGORY_HIERARCHY: CategoryNode[] = [
  {
    id: 'building-materials',
    name: 'Building Materials',
    subcategories: [
      {
        id: 'cement',
        name: 'Cement',
        subcategories: [
          { id: 'opc', name: 'OPC Cement' },
          { id: 'ppc', name: 'PPC Cement' },
          { id: 'white-cement', name: 'White Cement' },
        ]
      },
      { id: 'concrete', name: 'Concrete' },
      { id: 'bricks-blocks', name: 'Bricks & Blocks' },
    ]
  },
  {
    id: 'tiles-flooring',
    name: 'Tiles & Flooring',
    subcategories: [
      { id: 'ceramic-tiles', name: 'Ceramic Tiles' },
      { id: 'vitrified-tiles', name: 'Vitrified Tiles' },
      { id: 'marble', name: 'Marble' },
      { id: 'granite', name: 'Granite' },
    ]
  },
  {
    id: 'electrical-lighting',
    name: 'Electrical & Lighting',
    subcategories: [
      { id: 'switches', name: 'Switches' },
      {
        id: 'lighting',
        name: 'Lighting',
        subcategories: [
          { id: 'pendant-lights', name: 'Pendant Lights' },
          { id: 'ceiling-lights', name: 'Ceiling Lights' },
          { id: 'wall-lights', name: 'Wall Lights' },
        ]
      }
    ]
  }
];

const BRANDS_LIST = [
  'UltraTech Cement', 'ACC Cement', 'Ambuja Cement', 'Asian Paints', 
  'Berger Paints', 'Kajaria Ceramics', 'Saint-Gobain', 'Pidilite', 
  'Hafele India', 'Legrand India', 'Schneider Electric', 'Polycab'
];

interface Brand {
  id: number;
  name: string;
  categories: string[];
  location: string;
  logo: string;
  banner: string;
  tags: string[];
  productCount: number;
}

const MOCK_BRANDS: Brand[] = [
  {
    id: 1,
    name: 'UltraTech Cement',
    categories: ['Cement', 'Concrete', 'Building Materials'],
    location: 'Mumbai',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    tags: ['Premium', 'Verified', 'ISO Certified'],
    productCount: 980
  },
  {
    id: 2,
    name: 'Asian Paints',
    categories: ['Paints', 'Coatings', 'Home Decor'],
    location: 'Mumbai',
    logo: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=600',
    tags: ['Premium', 'Verified'],
    productCount: 1200
  },
  {
    id: 3,
    name: 'Kajaria Ceramics',
    categories: ['Ceramic Tiles', 'Vitrified Tiles', 'Flooring'],
    location: 'Delhi',
    logo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600',
    tags: ['Premium', 'ISO Certified'],
    productCount: 1540
  },
  {
    id: 4,
    name: 'Saint-Gobain',
    categories: ['Architectural Glass', 'Facades', 'Building Materials'],
    location: 'Pune',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    tags: ['Verified', 'ISO Certified'],
    productCount: 450
  },
  {
    id: 5,
    name: 'Legrand India',
    categories: ['Switches', 'Electrical', 'Smart Home'],
    location: 'Gurgaon',
    logo: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1558223108-6379a5463a24?auto=format&fit=crop&q=80&w=600',
    tags: ['Premium', 'ISO Certified'],
    productCount: 820
  },
  {
    id: 6,
    name: 'Pidilite',
    categories: ['Construction Chemicals', 'Adhesives', 'Waterproofing'],
    location: 'Mumbai',
    logo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=600',
    tags: ['Verified'],
    productCount: 320
  },
  {
    id: 7,
    name: 'Hafele India',
    categories: ['Hardware', 'Kitchen', 'Fittings'],
    location: 'Mumbai',
    logo: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=600',
    tags: ['Premium', 'Verified'],
    productCount: 2100
  },
  {
    id: 8,
    name: 'ACC Cement',
    categories: ['Cement', 'Concrete', 'Building Materials'],
    location: 'Delhi',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    tags: ['Verified', 'ISO Certified'],
    productCount: 750
  }
];

// --- Sub-components ---

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i: number) => (
      <div className="size-2 rounded-full bg-white/30 transition-all hover:bg-white/50 mt-[-20px] relative z-20" />
    )
  };

  return (
    <div className="w-full h-[140px] md:h-[220px] bg-gray-900 overflow-hidden relative">
      <Slider {...settings}>
        {AD_SLIDES.map((slide) => (
          <div key={slide.id} className="relative h-[140px] md:h-[220px] outline-none">
            <ImageWithFallback 
              src={slide.image} 
              alt={slide.heading} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-[140px] max-w-[1320px] mx-auto">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-white text-xl md:text-3xl lg:text-4xl font-normal uppercase tracking-tight mb-1 md:mb-2"
              >
                {slide.heading}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-[10px] md:text-base lg:text-lg mb-3 md:mb-6 max-w-[280px] md:max-w-[500px] line-clamp-1 md:line-clamp-none"
              >
                {slide.subtext}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-fit h-8 md:h-11 px-4 md:px-8 bg-[#FF6A3D] text-white text-[9px] md:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#E55A2D] transition-all"
              >
                {slide.cta}
              </motion.button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
  >
    <ArrowRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
  >
    <ArrowLeft size={20} />
  </button>
);

const CategoryItem = ({ 
  node, 
  level = 0, 
  expanded, 
  onToggle, 
  selectedId, 
  onSelect 
}: { 
  node: CategoryNode; 
  level?: number; 
  expanded: Set<string>; 
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) => {
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const hasSub = node.subcategories && node.subcategories.length > 0;

  return (
    <div className="w-full">
      <div 
        onClick={() => onSelect(node.id)}
        className={`group flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
          isSelected ? 'bg-[#FF6A3D]/5' : 'hover:bg-gray-50'
        }`}
      >
        {isSelected && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#FF6A3D] rounded-r-full" />
        )}
        <span className={`text-[13px] ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
          {node.name}
        </span>
        {hasSub && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className={`size-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <ChevronDown size={14} />
          </button>
        )}
      </div>
      {hasSub && isExpanded && (
        <div className="ml-4 border-l border-gray-100 mt-1">
          {node.subcategories?.map((sub) => (
            <CategoryItem 
              key={sub.id} 
              node={sub} 
              level={level + 1} 
              expanded={expanded} 
              onToggle={onToggle}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

export function BrandsPage({ onBrandClick, onViewProducts }: { onBrandClick?: (brandName: string) => void, onViewProducts?: (brandName: string) => void }) {
  const [mainSearch, setMainSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [brandFilterSearch, setBrandFilterSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  const toggleCat = (id: string) => {
    const next = new Set(expandedCats);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedCats(next);
  };

  const handleCategorySelect = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      setExpandedCats(new Set());
    } else {
      setSelectedCategory(id);
      // Auto-expand the selected category's hierarchy
      const expandPath = (catId: string, hierarchy: CategoryNode[]): string[] => {
        for (const cat of hierarchy) {
          if (cat.id === catId) return [catId];
          if (cat.subcategories) {
            const path = expandPath(catId, cat.subcategories);
            if (path.length > 0) return [cat.id, ...path];
          }
        }
        return [];
      };
      const pathToExpand = expandPath(id, CATEGORY_HIERARCHY);
      setExpandedCats(new Set(pathToExpand));
    }
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const removeFilter = (type: 'category' | 'location' | 'brand', value?: string) => {
    if (type === 'category') {
      setSelectedCategory(null);
      setExpandedCats(new Set());
    } else if (type === 'location') {
      setSelectedLocation(null);
    } else if (type === 'brand' && value) {
      setSelectedBrands(prev => prev.filter(b => b !== value));
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
    setSelectedBrands([]);
    setMainSearch('');
    setExpandedCats(new Set());
  };

  // Get selected category name for display
  const getSelectedCategoryName = (id: string | null): string => {
    if (!id) return '';
    const findName = (catId: string, hierarchy: CategoryNode[]): string => {
      for (const cat of hierarchy) {
        if (cat.id === catId) return cat.name;
        if (cat.subcategories) {
          const name = findName(catId, cat.subcategories);
          if (name) return name;
        }
      }
      return '';
    };
    return findName(id, CATEGORY_HIERARCHY);
  };

  // Get top brands based on selected category
  const getTopBrands = (): string[] => {
    if (!selectedCategory) {
      return ['UltraTech Cement', 'Asian Paints', 'Kajaria Ceramics', 'Legrand India'];
    }
    const categoryName = getSelectedCategoryName(selectedCategory);
    if (categoryName.toLowerCase().includes('cement')) {
      return ['UltraTech Cement', 'ACC Cement', 'Ambuja Cement'];
    }
    if (categoryName.toLowerCase().includes('electrical') || categoryName.toLowerCase().includes('lighting')) {
      return ['Legrand India', 'Schneider Electric', 'Polycab'];
    }
    if (categoryName.toLowerCase().includes('tiles')) {
      return ['Kajaria Ceramics', 'Saint-Gobain'];
    }
    return ['UltraTech Cement', 'Asian Paints', 'Kajaria Ceramics'];
  };

  // Sort categories - selected one at top
  const getSortedCategories = (): CategoryNode[] => {
    if (!selectedCategory) return CATEGORY_HIERARCHY;
    
    const findAndMove = (categories: CategoryNode[]): CategoryNode[] => {
      const result = [...categories];
      for (let i = 0; i < result.length; i++) {
        if (result[i].id === selectedCategory) {
          const [selected] = result.splice(i, 1);
          return [selected, ...result];
        }
        if (result[i].subcategories) {
          // Check if selected is in subcategories
          const hasSelected = result[i].subcategories!.some(sub => sub.id === selectedCategory);
          if (hasSelected) {
            const [parent] = result.splice(i, 1);
            return [parent, ...result];
          }
        }
      }
      return result;
    };
    
    return findAndMove(CATEGORY_HIERARCHY);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* APPLIED FILTERS SECTION */}
      {(selectedCategory || selectedLocation || selectedBrands.length > 0) && (
        <div className="pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applied</h3>
            <button 
              onClick={clearFilters}
              className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                <span className="text-[11px] font-medium text-[#FF6A3D]">
                  {getSelectedCategoryName(selectedCategory)}
                </span>
                <button 
                  onClick={() => removeFilter('category')}
                  className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            )}
            {selectedLocation && (
              <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                <span className="text-[11px] font-medium text-[#FF6A3D]">{selectedLocation}</span>
                <button 
                  onClick={() => removeFilter('location')}
                  className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            )}
            {selectedBrands.map(brand => (
              <div key={brand} className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                <span className="text-[11px] font-medium text-[#FF6A3D]">{brand}</span>
                <button 
                  onClick={() => removeFilter('brand', brand)}
                  className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY FILTER */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Categories</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search categories…"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/30 transition-all"
          />
        </div>
        <div className="space-y-0.5 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
          {getSortedCategories()
            .filter(cat => cat.name.toLowerCase().includes(categorySearch.toLowerCase()))
            .map((cat) => (
              <CategoryItem 
                key={cat.id} 
                node={cat} 
                expanded={expandedCats} 
                onToggle={toggleCat}
                selectedId={selectedCategory}
                onSelect={handleCategorySelect}
              />
            ))}
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Brands</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search brands…"
            value={brandFilterSearch}
            onChange={(e) => setBrandFilterSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/30 transition-all"
          />
        </div>

        {/* Top Brands */}
        {!brandFilterSearch && (
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Top Brands</p>
            {getTopBrands().map((brand) => (
              <div 
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`group flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                  selectedBrands.includes(brand) ? 'bg-[#FFF3EF]' : 'hover:bg-gray-50'
                }`}
              >
                {selectedBrands.includes(brand) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#FF6A3D] rounded-r-full" />
                )}
                <span className={`text-[13px] ${selectedBrands.includes(brand) ? 'text-[#FF6A3D] font-medium' : 'text-gray-700'}`}>
                  {brand}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Full Brand List */}
        <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {BRANDS_LIST
            .filter(b => b.toLowerCase().includes(brandFilterSearch.toLowerCase()))
            .filter(b => !getTopBrands().includes(b) || brandFilterSearch)
            .map((brand) => (
              <div 
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`group flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all relative overflow-hidden ${
                  selectedBrands.includes(brand) ? 'bg-[#FFF3EF]' : 'hover:bg-gray-50'
                }`}
              >
                {selectedBrands.includes(brand) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#FF6A3D] rounded-r-full" />
                )}
                <span className={`text-[13px] ${selectedBrands.includes(brand) ? 'text-[#FF6A3D] font-medium' : 'text-gray-700'}`}>
                  {brand}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* LOCATION FILTER */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Location</h3>
        <button
          onClick={() => setIsLocationDrawerOpen(true)}
          className="w-full flex items-center justify-between h-10 px-3 bg-gray-50 border border-gray-100 rounded-lg hover:border-[#FF6A3D]/30 transition-all group"
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="text-[13px] text-gray-700">
              {selectedLocation || 'All Locations'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Change
          </span>
        </button>
      </div>
    </div>
  );

  // Filter Logic
  const filteredBrands = useMemo(() => {
    return MOCK_BRANDS.filter(brand => {
      const searchLower = mainSearch.toLowerCase();
      const matchesMain = !mainSearch || 
        brand.name.toLowerCase().includes(searchLower) ||
        brand.categories.some(c => c.toLowerCase().includes(searchLower));
      
      const matchesLoc = !selectedLocation || brand.location === selectedLocation;
      
      const matchesBrandFilter = selectedBrands.length === 0 || selectedBrands.includes(brand.name);

      return matchesMain && matchesLoc && matchesBrandFilter;
    });
  }, [mainSearch, selectedLocation, selectedBrands]);

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif]">
      
      {/* Auto-Scrolling Banner */}
      <BannerCarousel />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Sidebar (Desktop Only) */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h1 className="text-[24px] md:text-[32px] font-medium text-gray-900 uppercase tracking-tight leading-tight mb-2">
                Discover Premium Brands
              </h1>
              <p className="text-sm md:text-base text-gray-500 font-normal">
                Explore verified construction brands across India
              </p>
            </div>

            {/* Search Bar & Mobile Filter Toggle */}
            <div className="flex flex-col gap-4 mb-8 md:mb-12">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search brands, products, or categories..."
                  value={mainSearch}
                  onChange={(e) => setMainSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-[#FF6A3D] transition-all shadow-sm"
                />
              </div>
              
              {/* Mobile Filter Button */}
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF6A3D]/20 active:scale-[0.98] transition-all"
              >
                <Filter size={18} />
                Filters
                { (selectedCategory || selectedLocation || selectedBrands.length > 0) && (
                  <span className="size-5 bg-white text-[#FF6A3D] rounded-full flex items-center justify-center text-[10px]">!</span>
                )}
              </button>
            </div>

            {/* Brand Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredBrands.map((brand) => (
                  <motion.div 
                    layout
                    key={brand.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white rounded-[16px] border border-[#E6E8EC] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all flex flex-col h-[340px] md:h-[360px] relative w-full cursor-pointer"
                    onClick={() => onBrandClick?.(brand.name)}
                  >
                    {/* BANNER IMAGE */}
                    <div className="h-[120px] md:h-[140px] shrink-0 w-full overflow-hidden">
                      <ImageWithFallback 
                        src={brand.banner} 
                        alt={brand.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    
                    {/* BRAND LOGO */}
                    <div className="absolute top-[100px] md:top-[110px] left-[18px] size-[40px] md:size-[48px] bg-white rounded-[10px] md:rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] p-[6px] flex items-center justify-center z-10 pointer-events-none">
                      <ImageWithFallback src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex flex-col flex-1 pt-[28px] md:pt-[36px] px-[16px] md:px-[18px] pb-[16px] md:pb-[18px] gap-[6px] md:gap-[8px] overflow-hidden">
                      <div className="flex flex-col gap-1 w-full shrink-0">
                        <h3 className="text-[14px] md:text-[16px] font-medium text-[#111111] leading-tight truncate">
                          {brand.name}
                        </h3>
                        <p className="text-[11px] md:text-[13px] font-normal text-[#667085] truncate">
                          {brand.categories.join(' • ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-[6px] text-[11px] md:text-[13px] text-[#667085] uppercase font-medium w-full shrink-0">
                        <Package size={14} className="shrink-0 md:size-4" />
                        <span>{brand.productCount} Products</span>
                      </div>

                      <div className="flex-1 w-full" />
                      
                      <div className="flex items-center gap-2 md:gap-3 w-full shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); onBrandClick?.(brand.name); }}
                          className="h-10 md:h-11 flex-1 bg-[#FF6A3D] text-white text-[12px] md:text-[14px] font-medium rounded-[8px] md:rounded-[10px] hover:bg-[#E55A2D] transition-colors whitespace-nowrap uppercase cursor-pointer"
                        >
                          PROFILE
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onViewProducts?.(brand.name); }}
                          className="h-10 md:h-11 flex-1 border-[1.5px] border-[#FF6A3D] text-[#FF6A3D] text-[12px] md:text-[14px] font-medium rounded-[8px] md:rounded-[10px] hover:bg-[#FF6A3D]/[0.08] transition-all whitespace-nowrap uppercase cursor-pointer"
                        >
                          PRODUCTS
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredBrands.length === 0 && (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 px-4">
                  <div className="size-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Search className="text-gray-300" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No brands found</h3>
                  <p className="text-gray-500 mb-6 text-sm">Try adjusting your filters or clearing your search.</p>
                  <button 
                    onClick={clearFilters}
                    className="px-6 h-10 bg-white border border-gray-200 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold uppercase tracking-widest">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="size-10 flex items-center justify-center text-gray-400 hover:text-black">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar pb-32">
                <FilterContent />
              </div>
              <div className="p-6 border-t border-gray-100 bg-white absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { clearFilters(); setIsFilterOpen(false); }}
                  className="h-14 border border-gray-200 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-900"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="h-14 bg-[#FF6A3D] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Location Drawer */}
      <AnimatePresence>
        {isLocationDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-[360px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold uppercase tracking-widest">Select Location</h2>
                <button onClick={() => setIsLocationDrawerOpen(false)} className="size-10 flex items-center justify-center text-gray-400 hover:text-black">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search location…"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-100 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/30 transition-all"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Suggested Cities</p>
                    <div className="space-y-1">
                      {LOCATIONS.filter(loc => loc.toLowerCase().includes(locationSearch.toLowerCase())).map((loc) => (
                        <div 
                          key={loc}
                          onClick={() => {
                            setSelectedLocation(selectedLocation === loc ? null : loc);
                            setIsLocationDrawerOpen(false);
                          }}
                          className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-gray-50 relative overflow-hidden ${
                            selectedLocation === loc ? 'bg-[#FFF3EF]' : ''
                          }`}
                        >
                          {selectedLocation === loc && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#FF6A3D] rounded-r-full" />
                          )}
                          <MapPin size={14} className={`mr-2 ${selectedLocation === loc ? 'text-[#FF6A3D]' : 'text-gray-400'}`} />
                          <span className={`text-[13px] ${
                            selectedLocation === loc ? 'text-[#FF6A3D] font-medium' : 'text-gray-700'
                          }`}>
                            {loc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}