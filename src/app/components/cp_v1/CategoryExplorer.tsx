import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown, ChevronRight, Heart, Filter, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CATEGORY_TAXONOMY, CategoryNode } from '../../utils/categoryTaxonomy';
import { CarouselBanner } from './CarouselBanner';

// Mock product data
const generateMockProducts = (category: string, count: number = 12) => {
  const products = [];
  const brands = ['Asian Paints', 'Kajaria', 'Somany', 'Nitco', 'RAK Ceramics', 'Johnson Tiles', 'Orientbell'];
  const sizes = ['300x300mm', '600x600mm', '600x1200mm', '800x800mm'];
  const finishes = ['Glossy', 'Matt', 'Satin', 'Polished'];
  const colors = ['White', 'Grey', 'Beige', 'Black'];
  
  // Array of real product images
  const productImages = [
    'https://images.unsplash.com/photo-1642678751244-296d18c4cab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1764021995962-53921e9f2317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1637050599965-cc59b3c82a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1627383838166-6e697cd673c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1583691028182-e8f01e74bfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1558455322-911adf441b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1700973408133-b45276ec8feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdmVuZWVyfGVufDF8fHx8MTc2NjM5NjAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1709962701974-5ac5ccb4718b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdGlsZSUyMGJhdGhyb29tfGVufDF8fHx8MTc2NjM5NjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1626551039948-ddd7e595fe06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1pbmF0ZSUyMGZsb29yaW5nfGVufDF8fHx8MTc2NjMzNjY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1664300067908-84e8beb52a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YWxscGFwZXIlMjBwYXR0ZXJufGVufDF8fHx8MTc2NjM5NjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  ];
  
  for (let i = 0; i < count; i++) {
    products.push({
      id: `prod-${i}`,
      name: `Premium ${category} ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
      brand: brands[i % brands.length],
      price: Math.floor(Math.random() * 5000) + 500,
      unit: 'Box',
      size: sizes[i % sizes.length],
      finish: finishes[i % finishes.length],
      color: colors[i % colors.length],
      inStock: Math.random() > 0.3,
      image: productImages[i % productImages.length],
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 30) + 10 : 0
    });
  }
  return products;
};

interface CategoryExplorerProps {
  breadcrumb: { name: string; slug: string }[];
  onBackToHome: () => void;
  onProductClick?: (productId: string, productName: string) => void;
  onBreadcrumbClick?: (index: number) => void;
}

export default function CategoryExplorer({ 
  breadcrumb,
  onBackToHome,
  onProductClick,
  onBreadcrumbClick
}: CategoryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedFinishes, setSelectedFinishes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  
  // Get current category slug from breadcrumb
  const currentCategorySlug = breadcrumb.length > 2 ? breadcrumb[breadcrumb.length - 1].slug : '';
  
  // Auto-expand the current category path and "All Categories" filter
  const getInitialExpandedFilters = () => {
    const expanded = new Set<string>(['priceRange', 'allCategories']);
    
    // Expand all categories in the breadcrumb path
    breadcrumb.forEach(crumb => {
      if (crumb.slug) {
        expanded.add(`cat-${crumb.slug}`);
      }
    });
    
    return expanded;
  };
  
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(getInitialExpandedFilters());
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  
  const currentCategory = breadcrumb[breadcrumb.length - 1].name;
  
  // Generate products
  const [products] = useState(generateMockProducts(currentCategory, 12));
  
  const allBrands = ['A Star', 'Asian Paints', 'Kajaria', 'Somany', 'Nitco', 'RAK Ceramics', 'Johnson Tiles', 'Orientbell', 'Simpolo', 'H&R Johnson'];
  
  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      onBackToHome();
    } else if (onBreadcrumbClick) {
      onBreadcrumbClick(index);
    }
  };
  
  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(filterName)) {
        newSet.delete(filterName);
      } else {
        newSet.add(filterName);
      }
      return newSet;
    });
  };
  
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      const newSet = new Set(prev);
      if (newSet.has(brand)) {
        newSet.delete(brand);
      } else {
        newSet.add(brand);
      }
      return newSet;
    });
  };
  
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
  
  const filteredBrands = allBrands.filter(brand =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );
  
  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedBrands.size > 0 && !selectedBrands.has(product.brand)) {
      return false;
    }
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    if (showInStockOnly && !product.inStock) {
      return false;
    }
    if (selectedSizes.size > 0 && !selectedSizes.has(product.size)) {
      return false;
    }
    if (selectedFinishes.size > 0 && !selectedFinishes.has(product.finish)) {
      return false;
    }
    if (selectedColors.size > 0 && !selectedColors.has(product.color)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0;
  });
  
  const filterCount = selectedBrands.size + selectedSizes.size + selectedFinishes.size + selectedColors.size + (showInStockOnly ? 1 : 0);

  const renderCategoryTree = (cats: CategoryNode[], level: number = 0) => {
    return cats.map((cat) => {
      const hasChildren = cat.children && cat.children.length > 0;
      const isExpanded = expandedFilters.has(`cat-${cat.slug}`);
      const isCurrentCategory = cat.slug === currentCategorySlug;
      const isInBreadcrumb = breadcrumb.some(crumb => crumb.slug === cat.slug);
      
      return (
        <div key={cat.slug} style={{ marginLeft: level > 0 ? '16px' : '0' }}>
          <div className={`flex items-center justify-between w-full py-2 rounded-lg transition-colors ${
            isCurrentCategory ? 'bg-[#FF6A3D]/10' : ''
          }`}>
            <button
              onClick={() => {
                if (onBreadcrumbClick) {
                  onBreadcrumbClick(1);
                }
              }}
              className={`text-[14px] transition-colors flex-1 text-left px-2 ${
                isCurrentCategory 
                  ? 'text-[#FF6A3D] font-medium' 
                  : isInBreadcrumb
                  ? 'text-[#101828]'
                  : 'text-[#4A5565] hover:text-[#FF6A3D]'
              }`}
            >
              {cat.name}
              {cat.hasProducts && (
                <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${
                  isCurrentCategory 
                    ? 'text-[#FF6A3D] bg-[#FF6A3D]/20' 
                    : 'text-[#FF6A3D] bg-[#FF6A3D]/10'
                }`}>
                  Products
                </span>
              )}
            </button>
            {hasChildren && (
              <button
                onClick={() => {
                  const key = `cat-${cat.slug}`;
                  setExpandedFilters(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(key)) newSet.delete(key);
                    else newSet.add(key);
                    return newSet;
                  });
                }}
                className="ml-2 p-1"
              >
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    isCurrentCategory ? 'text-[#FF6A3D]' : 'text-[#4A5565]'
                  } ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="border-l-2 border-[#E5E7EB] ml-2">
              {renderCategoryTree(cat.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif] pt-20 sm:pt-24 md:pt-32">
      <CarouselBanner />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-12 flex-wrap">
          {breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className={`text-[13px] sm:text-[14px] px-2.5 sm:px-3 py-1.5 rounded-md transition-all ${
                  index === breadcrumb.length - 1
                    ? 'text-[#101828] bg-[#F9FAFB] font-medium'
                    : 'text-[#667085] hover:text-[#FF6A3D] hover:bg-[#FF6A3D]/5'
                }`}
              >
                {crumb.name}
              </button>
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#D0D5DD]" />
              )}
            </div>
          ))}
        </div>

        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-3 hover:border-[#FF6A3D] focus-within:border-[#FF6A3D] transition-colors duration-300">
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-500 font-semibold"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative p-4 bg-white border border-gray-200 rounded-lg hover:border-[#FF6A3D] transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-500" />
              {filterCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6A3D] rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className={`lg:w-[280px] flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-1 bg-white lg:bg-transparent border lg:border-0 border-[#E5E7EB] rounded-lg p-4 lg:p-0">
              <div className="lg:hidden flex items-center justify-between mb-4">
                <h3 className="text-[#101828] text-[16px]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-md">
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>

              <h3 className="text-[#101828] text-[14px] sm:text-[16px] mb-3 sm:mb-4 hidden lg:block uppercase tracking-widest font-bold">Filters</h3>

              <div className="border-b border-[#E5E7EB] pb-4 mb-4">
                <button onClick={() => toggleFilter('allCategories')} className="flex items-center justify-between w-full mb-3">
                  <span className="text-[14px] text-[#101828] font-bold uppercase tracking-wider">All Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.has('allCategories') ? 'rotate-180' : ''}`} />
                </button>
                {expandedFilters.has('allCategories') && (
                  <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                    {renderCategoryTree(CATEGORY_TAXONOMY)}
                  </div>
                )}
              </div>

              <div className="border-b border-[#E5E7EB] pb-4 mb-4">
                <button onClick={() => toggleFilter('priceRange')} className="flex items-center justify-between w-full mb-3">
                  <span className="text-[14px] text-[#101828] font-bold uppercase tracking-wider">Price Range</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.has('priceRange') ? 'rotate-180' : ''}`} />
                </button>
                {expandedFilters.has('priceRange') && (
                  <div className="flex items-center gap-2 px-2">
                    <input
                      type="number"
                      placeholder="MIN"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                      className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:border-[#FF6A3D] outline-none"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="MAX"
                      value={priceRange.max || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                      className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:border-[#FF6A3D] outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="border-b border-[#E5E7EB] pb-4 mb-4">
                <button onClick={() => toggleFilter('brand')} className="flex items-center justify-between w-full mb-3">
                  <span className="text-[14px] text-[#101828] font-bold uppercase tracking-wider">Brand</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.has('brand') ? 'rotate-180' : ''}`} />
                </button>
                {expandedFilters.has('brand') && (
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search brands..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#FF6A3D] outline-none"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto no-scrollbar space-y-2">
                      {filteredBrands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedBrands.has(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 rounded border-[#D0D5DD] text-[#FF6A3D] focus:ring-[#FF6A3D]"
                          />
                          <span className="text-[13px] text-[#4A5565] group-hover:text-[#FF6A3D] transition-colors">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Attribute Filters */}
              {[
                { label: 'Size', items: ['300x300mm', '600x600mm', '600x1200mm', '800x800mm'], selected: selectedSizes, setter: setSelectedSizes },
                { label: 'Finish', items: ['Glossy', 'Matt', 'Satin', 'Polished'], selected: selectedFinishes, setter: setSelectedFinishes },
                { label: 'Color', items: ['White', 'Grey', 'Beige', 'Black'], selected: selectedColors, setter: setSelectedColors }
              ].map((filter) => (
                <div key={filter.label} className="border-b border-[#E5E7EB] pb-4 mb-4">
                  <button onClick={() => toggleFilter(filter.label.toLowerCase())} className="flex items-center justify-between w-full mb-3">
                    <span className="text-[14px] text-[#101828] font-bold uppercase tracking-wider">{filter.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.has(filter.label.toLowerCase()) ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFilters.has(filter.label.toLowerCase()) && (
                    <div className="space-y-2">
                      {filter.items.map(item => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filter.selected.has(item)}
                            onChange={() => {
                              const next = new Set(filter.selected);
                              if (next.has(item)) next.delete(item);
                              else next.add(item);
                              filter.setter(next);
                            }}
                            className="w-4 h-4 rounded border-[#D0D5DD] text-[#FF6A3D] focus:ring-[#FF6A3D]"
                          />
                          <span className="text-[13px] text-[#4A5565] group-hover:text-[#FF6A3D] transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D0D5DD] text-[#FF6A3D] focus:ring-[#FF6A3D]"
                  />
                  <span className="text-[14px] font-medium text-[#101828]">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => onProductClick?.(product.id, product.name)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <ImageWithFallback src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        likedProducts.has(product.id) ? 'bg-[#FF6A3D] text-white' : 'bg-white/80 text-gray-900 hover:bg-[#FF6A3D] hover:text-white'
                      }`}
                    >
                      <Heart size={18} className={likedProducts.has(product.id) ? 'fill-current' : ''} />
                    </button>
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-[0.2em] mb-2">{product.brand}</p>
                    <h3 className="text-[15px] font-medium text-[#101828] mb-4 line-clamp-1 group-hover:text-[#FF6A3D] transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#101828]">₹{product.price}</span>
                        <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-bold">4.8</span>
                        <div className="flex text-[#FF6A3D]">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
