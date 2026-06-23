import { Search, X, ChevronDown, ChevronUp, Heart, ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Product image mapping for different categories
const categoryImages: { [key: string]: string[] } = {
  Wood: [
    'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcGxhbmt8ZW58MXx8fHwxNzY2Mzk2MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1700973408133-b45276ec8feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdmVuZWVyfGVufDF8fHx8MTc2NjM5NjAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1626551039948-ddd7e595fe06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1pbmF0ZSUyMGZsb29yaW5nfGVufDF8fHx8MTc2NjMzNjY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjYzMTAyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  Tile: [
    'https://images.unsplash.com/photo-1642678751244-296d18c4cab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlcyUyMGZsb29yaW5nfGVufDF8fHx8MTc2NjM5NjAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdGlsZXxlbnwxfHx8fDE3NjYzMTU1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1709962701974-5ac5ccb4718b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdGlsZSUyMGJhdGhyb29tfGVufDF8fHx8MTc2NjM5NjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1642678751244-296d18c4cab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlcyUyMGZsb29yaW5nfGVufDF8fHx8MTc2NjM5NjAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  Stone: [
    'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NjM4NDk4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1764021995962-53921e9f2317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuaXRlJTIwc3VyZmFjZXxlbnwxfHx8fDE3NjYzOTYwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1551554781-c46200ea959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdG9uZXxlbnwxfHx8fDE3NjYzOTU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NjM4NDk4OHww&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  default: [
    'https://images.unsplash.com/photo-1595414440701-da000c40df9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMG1hdGVyaWFsc3xlbnwxfHx8fDE3NjYzOTU4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1637050599965-cc59b3c82a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwcGFpbnQlMjBjb2xvcnxlbnwxfHx8fDE3NjYzOTYwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1627383838166-6e697cd673c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWlsaW5nJTIwbGlnaHR8ZW58MXx8fHwxNzY2MzYyNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1558455322-911adf441b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdpbmRvd3xlbnwxfHx8fDE3NjYzOTYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ]
};

// Mock product data generator with relevant images
const generateProducts = (categoryName: string, count: number = 12) => {
  const products = [];
  const images = categoryImages[categoryName] || categoryImages.default;
  const brands = ['Asian Paints', 'Kajaria', 'Century Ply', 'Greenply', 'Somany', 'Johnson Tiles', 'Nitco', 'RAK Ceramics'];
  
  for (let i = 1; i <= count; i++) {
    const imageIndex = i % images.length;
    products.push({
      id: `${categoryName}-${i}`,
      name: `Premium ${categoryName} ${['Classic', 'Modern', 'Luxury', 'Elite', 'Royal', 'Imperial', 'Designer', 'Signature'][i % 8]} ${Math.floor(Math.random() * 900) + 100}`,
      brand: brands[Math.floor(Math.random() * brands.length)],
      price: Math.floor(Math.random() * 400) + 60,
      originalPrice: Math.floor(Math.random() * 600) + 150,
      unit: categoryName === 'Wood' || categoryName === 'Tile' || categoryName === 'Stone' ? 'Sq. Ft.' : ['Box', 'Piece', 'Set'][Math.floor(Math.random() * 3)],
      image: images[imageIndex],
      finish: ['Matte', 'Glossy', 'Satin', 'Textured', 'Polished', 'Natural'][Math.floor(Math.random() * 6)],
      color: ['Natural', 'Brown', 'White', 'Gray', 'Black', 'Beige', 'Cream'][Math.floor(Math.random() * 7)],
      material: categoryName,
      thickness: ['8mm', '10mm', '12mm', '15mm', '18mm'][Math.floor(Math.random() * 5)],
      size: ['2x2', '2x4', '4x4', '4x8', '600x600mm', '800x800mm'][Math.floor(Math.random() * 6)],
      application: ['Flooring', 'Wall', 'Both'][Math.floor(Math.random() * 3)],
      warranty: ['1 Year', '5 Years', '10 Years', 'Lifetime'][Math.floor(Math.random() * 4)],
      inStock: Math.random() > 0.2
    });
  }
  return products;
};

interface CategoryDetailPageProps {
  categoryName: string;
  subcategories: string[];
  onBackToHome?: () => void;
  onBackToProducts?: () => void;
  onBackToProfessionals?: () => void;
  source?: 'products' | 'professionals';
}

export default function CategoryDetailPage({ categoryName, subcategories, onBackToHome, onBackToProducts, onBackToProfessionals, source = 'products' }: CategoryDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Popular');
  const [products] = useState(generateProducts(categoryName));
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // Filter states
  const [priceOpen, setPriceOpen] = useState(true);
  const [materialTypeOpen, setMaterialTypeOpen] = useState(true);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [thicknessOpen, setThicknessOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<string>>(new Set());
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedFinishes, setSelectedFinishes] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedThickness, setSelectedThickness] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [inStoreOnly, setInStoreOnly] = useState(false);
  const [showSamples, setShowSamples] = useState(false);

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sub)) {
        newSet.delete(sub);
      } else {
        newSet.add(sub);
      }
      return newSet;
    });
  };

  const toggleSet = (item: string, set: Set<string>, setter: (set: Set<string>) => void) => {
    const newSet = new Set(set);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setter(newSet);
  };

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedApplications.size > 0 && !selectedApplications.has(product.application)) {
      return false;
    }
    if (selectedColors.size > 0 && !selectedColors.has(product.color)) {
      return false;
    }
    if (selectedFinishes.size > 0 && !selectedFinishes.has(product.finish)) {
      return false;
    }
    if (selectedSizes.size > 0 && !selectedSizes.has(product.size)) {
      return false;
    }
    if (selectedThickness.size > 0 && !selectedThickness.has(product.thickness)) {
      return false;
    }
    if (selectedBrands.size > 0 && !selectedBrands.has(product.brand)) {
      return false;
    }
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    if (inStoreOnly && !product.inStock) {
      return false;
    }
    return true;
  });

  const applications = ['Flooring', 'Wall', 'Both'];
  const colors = ['Natural', 'Brown', 'White', 'Gray', 'Black', 'Beige', 'Cream'];
  const finishes = ['Matte', 'Glossy', 'Satin', 'Textured', 'Polished', 'Natural'];
  const sizes = ['2x2', '2x4', '4x4', '4x8', '600x600mm', '800x800mm'];
  const thicknesses = ['8mm', '10mm', '12mm', '15mm', '18mm'];
  const brands = [...new Set(products.map(p => p.brand))];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-[64px] md:pt-[100px]">
      {/* Hero Section */}
      <section className="relative h-[240px] md:h-[320px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1920"
            alt={categoryName}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-[32px] md:text-[48px] font-normal uppercase tracking-tight mb-2">
              {categoryName}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl font-['Satoshi']">
              Discover India's finest {categoryName.toLowerCase()} selection from verified premium brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
            <button onClick={onBackToHome} className="hover:text-[#FF6A3D] transition-colors">
              Home
            </button>
            <span className="opacity-30">/</span>
            <button 
              onClick={source === 'professionals' ? onBackToProfessionals : onBackToProducts} 
              className="hover:text-[#FF6A3D] transition-colors"
            >
              {source === 'professionals' ? 'Professionals' : 'Products'}
            </button>
            <span className="opacity-30">/</span>
            <span className="text-[#0F172A] dark:text-white">{categoryName}</span>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Left Sidebar - Filters */}
          <aside className="w-full shrink-0 lg:sticky lg:top-32 space-y-8">
            <div>
              <h3 className="text-[12px] font-bold text-[#0F172A] dark:text-white uppercase tracking-[0.2em] mb-6">Filters</h3>

              {/* Price Range */}
              <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                <button
                  onClick={() => setPriceOpen(!priceOpen)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <span className="text-[13px] font-medium text-[#0F172A] dark:text-white">Price Range</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {priceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                          placeholder="Min"
                          className="w-full px-3 h-10 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-[#FF6A3D] outline-none"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 1000 })}
                          placeholder="Max"
                          className="w-full px-3 h-10 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-[#FF6A3D] outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Subcategories */}
              {subcategories.length > 0 && (
                <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                  <button
                    onClick={() => setMaterialTypeOpen(!materialTypeOpen)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="text-[13px] font-medium text-[#0F172A] dark:text-white">Sub Category</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${materialTypeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {materialTypeOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-2 max-h-[200px] overflow-y-auto no-scrollbar"
                      >
                        {subcategories.map((sub) => (
                          <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedSubcategories.has(sub)}
                              onChange={() => toggleSubcategory(sub)}
                              className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                            />
                            <span className="text-[13px] text-gray-500 dark:text-gray-400 group-hover:text-[#FF6A3D] transition-colors">{sub}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Generic Filter Generator */}
              {[
                { label: 'Application', open: applicationOpen, setOpen: setApplicationOpen, items: applications, selected: selectedApplications, setter: setSelectedApplications },
                { label: 'Color', open: colorOpen, setOpen: setColorOpen, items: colors, selected: selectedColors, setter: setSelectedColors },
                { label: 'Finish', open: finishOpen, setOpen: setFinishOpen, items: finishes, selected: selectedFinishes, setter: setSelectedFinishes },
                { label: 'Size', open: sizeOpen, setOpen: setSizeOpen, items: sizes, selected: selectedSizes, setter: setSelectedSizes },
                { label: 'Thickness', open: thicknessOpen, setOpen: setThicknessOpen, items: thicknesses, selected: selectedThickness, setter: setSelectedThickness },
                { label: 'Brand', open: brandOpen, setOpen: setBrandOpen, items: brands, selected: selectedBrands, setter: setSelectedBrands }
              ].map((filter) => (
                <div key={filter.label} className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                  <button
                    onClick={() => filter.setOpen(!filter.open)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="text-[13px] font-medium text-[#0F172A] dark:text-white">{filter.label}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${filter.open ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {filter.open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-2 max-h-[200px] overflow-y-auto no-scrollbar"
                      >
                        {filter.items.map((item) => (
                          <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={filter.selected.has(item)}
                              onChange={() => toggleSet(item, filter.selected, filter.setter)}
                              className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                            />
                            <span className="text-[13px] text-gray-500 dark:text-gray-400 group-hover:text-[#FF6A3D] transition-colors">{item}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStoreOnly}
                    onChange={(e) => setInStoreOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                  />
                  <span className="text-[13px] font-medium text-[#0F172A] dark:text-white">In Store Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showSamples}
                    onChange={(e) => setShowSamples(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                  />
                  <span className="text-[13px] font-medium text-[#0F172A] dark:text-white">Show Samples</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Content - Products Grid */}
          <div className="flex-1 space-y-8">
            {/* Grid Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${categoryName.toLowerCase()}...`}
                  className="w-full h-11 pl-12 pr-10 text-sm border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-[#FF6A3D]/40 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:w-48 h-11 text-sm border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 text-[#0F172A] dark:text-white outline-none focus:border-[#FF6A3D]/40 px-4"
                >
                  <option>Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                    <ImageWithFallback src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {!product.inStock && (
                        <span className="bg-gray-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Out of Stock</span>
                      )}
                      {product.originalPrice > product.price && (
                        <span className="bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Sale</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        likedProducts.has(product.id)
                          ? 'bg-[#FF6A3D] text-white'
                          : 'bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white hover:bg-[#FF6A3D] hover:text-white'
                      }`}
                    >
                      <Heart size={18} className={likedProducts.has(product.id) ? 'fill-current' : ''} />
                    </button>

                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full h-11 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
                        <ShoppingBag size={14} /> Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-[0.2em] mb-1">{product.brand}</p>
                      <h3 className="text-[15px] font-medium text-[#0F172A] dark:text-white line-clamp-1 group-hover:text-[#FF6A3D] transition-colors">{product.name}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#0F172A] dark:text-white">₹{product.price}</span>
                          <span className="text-xs text-gray-400">/ {product.unit}</span>
                        </div>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#0F172A] dark:text-white">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50 dark:border-gray-800 grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Finish</span>
                        <span className="text-[11px] font-medium text-[#0F172A] dark:text-white">{product.finish}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Size</span>
                        <span className="text-[11px] font-medium text-[#0F172A] dark:text-white">{product.size}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <Search size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-[#0F172A] dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
