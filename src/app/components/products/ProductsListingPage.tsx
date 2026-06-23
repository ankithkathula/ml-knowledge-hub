import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ChevronDown, Filter, Grid, Package, MapPin, X, Hourglass } from 'lucide-react';
import { CATEGORY_TAXONOMY, CategoryNode, buildBreadcrumb, findCategoryByPath } from '../../utils/categoryTaxonomy';
import { PRODUCTS, Product } from '../../utils/products';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProductsHeroSearch } from './ProductsHeroSearch';
import { ProductsBrandStrip } from './ProductsBrandStrip';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface ProductsListingPageProps {
  onProductClick: (productId: string) => void;
  onBackToHome?: () => void;
  initialPath?: string[];
}

// Extended product interface with family data
interface ExtendedProduct extends Product {
  familyId?: string;
  familyName?: string;
  familyDescription?: string;
}

// Generate family groupings for products
const generateFamilyData = (products: Product[]): ExtendedProduct[] => {
  return products.map(p => {
    // Generate family based on brand + subcategory
    const familyId = `${p.brand.toLowerCase().replace(/\s+/g, '-')}-${p.subcategory}`;
    const familyName = `${p.brand} ${p.subcategory.charAt(0).toUpperCase() + p.subcategory.slice(1)} Series`;
    const familyDescription = `Professional-grade ${p.subcategory} products from ${p.brand}`;
    
    return {
      ...p,
      familyId,
      familyName,
      familyDescription
    };
  });
};

// Helper to calculate category metrics
const calculateCategoryMetrics = (node: CategoryNode, allProducts: Product[]) => {
  const subcategoryCount = node.children?.length || 0;
  
  // Determine if this is a leaf node (no children OR children have no further children)
  const isLeafNode = !node.children || node.children.length === 0;
  
  // Count products whose path includes this node's slug (matches the full subtree,
  // including leaf product-type nodes). Each slug occurs at most once per product.
  const products = allProducts.filter(p => {
    return p.category === node.slug ||
           p.subcategory === node.slug ||
           p.subSubcategory === node.slug ||
           p.productType === node.slug;
  });

  const productCount = products.length;
  const brandCount = new Set(products.map(p => p.brand)).size;

  return { subcategoryCount, brandCount, productCount, isLeafNode };
};

// Helper to count products in a category tree node.
// A product belongs to this node's subtree iff the node's slug appears anywhere in
// the product's path (category > subcategory > subSubcategory > productType). Each
// slug occurs at most once per product, so this counts every product exactly once —
// ancestor nodes include all descendants, leaf product-type nodes are counted, and
// nothing is double-counted (the old recursive version summed each product at every
// matching level, massively inflating counts).
const countProductsInNode = (node: CategoryNode, allProducts: Product[]): number => {
  return allProducts.filter(p =>
    p.category === node.slug ||
    p.subcategory === node.slug ||
    p.subSubcategory === node.slug ||
    p.productType === node.slug
  ).length;
};

export function ProductsListingPage({ onProductClick, onBackToHome, initialPath = [] }: ProductsListingPageProps) {
  const [currentPath, setCurrentPath] = useState<string[]>(initialPath);
  const [searchQuery, setSearchQuery] = useState('');
  const [catSearch, setCatSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(initialPath));
  const [selectedAttributes, setSelectedAttributes] = useState<Set<string>>(new Set());
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'byFamily' | 'allProducts'>('byFamily');
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());
  const [activeTopLevelCategory, setActiveTopLevelCategory] = useState<string | null>(initialPath.length > 0 ? initialPath[0] : null);

  // Reorder categories to move active one to top
  const reorderedCategories = useMemo(() => {
    if (!activeTopLevelCategory || catSearch) {
      // If searching, don't reorder
      return CATEGORY_TAXONOMY.filter(node => 
        !catSearch || node.name.toLowerCase().includes(catSearch.toLowerCase())
      );
    }
    
    const activeNode = CATEGORY_TAXONOMY.find(n => n.slug === activeTopLevelCategory);
    const otherNodes = CATEGORY_TAXONOMY.filter(n => n.slug !== activeTopLevelCategory);
    
    return activeNode ? [activeNode, ...otherNodes] : CATEGORY_TAXONOMY;
  }, [activeTopLevelCategory, catSearch]);

  // Handle category click - moves to top and expands
  const handleCategoryClick = (node: CategoryNode, isTopLevel: boolean = false) => {
    if (isTopLevel) {
      // Collapse all others, expand this one, move to top
      setActiveTopLevelCategory(node.slug);
      setExpandedCats(new Set([node.slug]));
      setCurrentPath([node.slug]);
    } else {
      // For subcategories, just navigate
      const parentSlug = currentPath[0];
      setCurrentPath([parentSlug, node.slug]);
      toggleCat(node.slug);
    }
  };

  // Render filter tree with new "move to top" behavior
  const renderNewFilterTree = () => {
    return reorderedCategories.map((node, nodeIndex) => {
      const isExpanded = expandedCats.has(node.slug);
      const isActive = currentPath[0] === node.slug;
      const isActiveSection = activeTopLevelCategory === node.slug;
      const productCount = countProductsInNode(node, PRODUCTS);

      return (
        <motion.div
          key={node.slug}
          layout
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {/* Top-level Category */}
          <div 
            className={`relative flex items-center justify-between py-3 px-4 cursor-pointer group transition-all duration-150 ${
              isActive 
                ? 'bg-[#FFF8F6] border-l-2 border-[#FF6A3D]' 
                : 'hover:bg-gray-50 border-l-2 border-transparent'
            }`}
            onClick={() => handleCategoryClick(node, true)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className={`text-[14px] transition-colors truncate ${
                isActive 
                  ? 'text-[#FF6A3D] font-medium' 
                  : 'text-[#667085] group-hover:text-[#101828] font-normal'
              }`}>
                {node.name}
              </span>
            </div>
            {productCount > 0 && (
              <span className={`text-[11px] font-medium shrink-0 ${
                isActive ? 'text-[#FF6A3D]/60' : 'text-gray-400'
              }`}>
                {productCount}
              </span>
            )}
          </div>

          {/* Subcategories - only show if expanded */}
          <AnimatePresence initial={false}>
            {node.children && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="overflow-hidden bg-white"
              >
                <div className="py-1">
                  {node.children.map(child => {
                    const isChildActive = currentPath.includes(child.slug);
                    const childProductCount = countProductsInNode(child, PRODUCTS);
                    
                    return (
                      <div
                        key={child.slug}
                        className={`flex items-center justify-between py-2.5 px-4 pl-8 cursor-pointer group transition-all duration-120 ${
                          isChildActive 
                            ? 'bg-gray-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(child, false);
                        }}
                      >
                        <span className={`text-[13px] transition-colors truncate ${
                          isChildActive 
                            ? 'text-[#101828] font-medium' 
                            : 'text-[#667085] group-hover:text-[#101828]'
                        }`}>
                          {child.name}
                        </span>
                        {childProductCount > 0 && (
                          <span className="text-[11px] text-gray-400 shrink-0">
                            {childProductCount}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider after active section */}
          {isActiveSection && nodeIndex === 0 && reorderedCategories.length > 1 && (
            <div className="h-px bg-[#EAEAEA] my-2" />
          )}
        </motion.div>
      );
    });
  };

  // Generate extended products with family data
  const extendedProducts = useMemo(() => generateFamilyData(PRODUCTS), []);

  // Get current category data
  const currentCategoryNode = useMemo(() => findCategoryByPath(currentPath), [currentPath]);
  const breadcrumbs = useMemo(() => buildBreadcrumb(currentPath), [currentPath]);

  // Handle category expansion
  const toggleCat = (slug: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  // Handle attribute selection
  const toggleAttribute = (attr: string) => {
    setSelectedAttributes(prev => {
      const next = new Set(prev);
      if (next.has(attr)) next.delete(attr);
      else next.add(attr);
      return next;
    });
  };

  // Toggle family expansion
  const toggleFamily = (familyId: string) => {
    setExpandedFamilies(prev => {
      const next = new Set(prev);
      if (next.has(familyId)) next.delete(familyId);
      else next.add(familyId);
      return next;
    });
  };

  // Toggle brand expansion
  const toggleBrand = (brand: string) => {
    setExpandedBrands(prev => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  };

  // Filtering logic — DESCENDANT-INCLUSIVE: at any level, show every product that
  // sits anywhere under the current path (this level + all sub-categories below).
  const filteredProducts = useMemo(() => {
    const list = extendedProducts.filter(p => {
      // Category filter: each path segment must match the corresponding field.
      // Levels deeper than the path are unconstrained → all descendants included.
      if (currentPath.length > 0) {
        if (p.category !== currentPath[0]) return false;
        if (currentPath.length > 1 && p.subcategory    !== currentPath[1]) return false;
        if (currentPath.length > 2 && p.subSubcategory !== currentPath[2]) return false;
        if (currentPath.length > 3 && p.productType    !== currentPath[3]) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(query) || 
                        p.brand.toLowerCase().includes(query) || 
                        p.category.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Brand filter (single-select)
      if (selectedBrand && p.brand !== selectedBrand) {
        return false;
      }

      // Attributes filter
      if (selectedAttributes.size > 0) {
        const pAttrs = [p.grade, p.finish, p.materialType, ...p.features, ...p.application].filter(Boolean) as string[];
        const hasAll = Array.from(selectedAttributes).every(a => pAttrs.includes(a));
        if (!hasAll) return false;
      }

      return true;
    });

    // ─── Ranking: sponsored / featured / popularity ─────────────────────
    // Higher score = higher in list. Drives "show me the good stuff first" feel
    // and gets stronger as the user drills deeper (specificityBoost).
    const specificityBoost = currentPath.length;
    const badgeWeight: Record<string, number> = {
      'Top Seller':   100,
      'Premium':       80,
      'New Launch':    65,
      'Best Value':    55,
      'Eco-Friendly':  50,
    };
    function pseudoPopularity(id: string) {
      // Deterministic 0–40 from id hash — stands in for real interaction data.
      let h = 0;
      for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
      return h % 40;
    }
    function score(p: ExtendedProduct) {
      let s = pseudoPopularity(p.id);
      if (p.badge) s += badgeWeight[p.badge] ?? 30;
      if (p.stock === 'In Stock') s += 15;
      // Closer match to current path → stronger signal
      if (currentPath.length > 0 && p.subcategory === currentPath[currentPath.length - 1]) s += 10 * specificityBoost;
      return s;
    }
    list.sort((a, b) => score(b) - score(a));
    return list;
  }, [currentPath, searchQuery, selectedBrand, selectedAttributes, extendedProducts, currentCategoryNode]);

  // Group products by family
  const productsByFamily = useMemo(() => {
    const groups = new Map<string, ExtendedProduct[]>();
    
    filteredProducts.forEach(p => {
      const familyId = p.familyId || 'ungrouped';
      if (!groups.has(familyId)) {
        groups.set(familyId, []);
      }
      groups.get(familyId)!.push(p);
    });

    // Auto-expand first family and families with < 8 products
    groups.forEach((products, familyId) => {
      if (products.length < 8 && !expandedFamilies.has(familyId)) {
        setExpandedFamilies(prev => new Set(prev).add(familyId));
      }
    });

    // Expand first family by default
    if (groups.size > 0 && expandedFamilies.size === 0) {
      const firstFamilyId = Array.from(groups.keys())[0];
      setExpandedFamilies(new Set([firstFamilyId]));
    }

    return groups;
  }, [filteredProducts]);

  // Group products by brand, then by family within each brand
  const productsByBrandAndFamily = useMemo(() => {
    const brandGroups = new Map<string, Map<string, ExtendedProduct[]>>();
    
    filteredProducts.forEach(p => {
      const brand = p.brand;
      const familyId = p.familyId || 'ungrouped';
      
      if (!brandGroups.has(brand)) {
        brandGroups.set(brand, new Map());
      }
      
      const familyGroups = brandGroups.get(brand)!;
      if (!familyGroups.has(familyId)) {
        familyGroups.set(familyId, []);
      }
      
      familyGroups.get(familyId)!.push(p);
    });

    // Auto-expand all brands by default (can be changed if too many brands)
    if (expandedBrands.size === 0 && brandGroups.size > 0) {
      const allBrands = Array.from(brandGroups.keys());
      setExpandedBrands(new Set(allBrands));
    }

    return brandGroups;
  }, [filteredProducts]);

  // Check if we should show family toggle (multiple families exist)
  const showFamilyToggle = productsByFamily.size > 1;

  // Determine if we are at Level 4 (Product Level) to show attributes
  const isLevel4 = currentPath.length >= 3;

  const FiltersContent = () => {
    const allBrands = useMemo(() => {
      const brands = new Set<string>();
      PRODUCTS.forEach(p => brands.add(p.brand));
      return Array.from(brands).sort();
    }, []);

    const filteredBrands = useMemo(() => {
      if (!brandSearch) return allBrands;
      return allBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
    }, [allBrands, brandSearch]);

    return (
      <div className="flex flex-col gap-8">
        {/* Categories Section */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">CATEGORIES</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search categories..."
              value={catSearch}
              onChange={(e) => setCatSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/30 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            {renderNewFilterTree()}
          </div>
        </section>

        {/* Brand Filter - List View */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">BRANDS</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/30 transition-all"
            />
          </div>
          <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredBrands.map(brand => (
              <div
                key={brand}
                onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 relative overflow-hidden ${
                  selectedBrand === brand ? 'bg-[#FF6A3D]/5' : ''
                }`}
              >
                {selectedBrand === brand && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#FF6A3D] rounded-r-full" />
                )}
                <span className={`text-[13px] font-medium ${
                  selectedBrand === brand ? 'text-[#FF6A3D]' : 'text-gray-700'
                }`}>
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Material Type Filter */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">MATERIAL TYPE</h3>
          <div className="flex flex-wrap gap-2">
            {['Ceramic', 'Porcelain', 'Vitrified', 'Natural Stone', 'Wood', 'Metal', 'Composite'].map(material => (
              <button
                key={material}
                onClick={() => toggleAttribute(material)}
                className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                  selectedAttributes.has(material) 
                  ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white' 
                  : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                }`}
              >
                {material}
              </button>
            ))}
          </div>
        </section>

        {/* Finish Filter */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">FINISH</h3>
          <div className="flex flex-wrap gap-2">
            {['Glossy', 'Matte', 'Satin', 'Polished', 'Textured', 'Metallic'].map(finish => (
              <button
                key={finish}
                onClick={() => toggleAttribute(finish)}
                className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                  selectedAttributes.has(finish) 
                  ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white' 
                  : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        </section>

        {/* Application Filter */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">APPLICATION</h3>
          <div className="flex flex-wrap gap-2">
            {['Residential', 'Commercial', 'Industrial', 'Structural', 'Decorative'].map(app => (
              <button
                key={app}
                onClick={() => toggleAttribute(app)}
                className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                  selectedAttributes.has(app) 
                  ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white' 
                  : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                }`}
              >
                {app}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Attribute Filters */}
        {isLevel4 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="h-px bg-gray-100" />
            
            {/* FEATURES */}
            <section>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">FEATURES</h3>
              <div className="flex flex-wrap gap-2">
                {['Waterproof', 'Fire Resistant', 'Weather Resistant', 'Eco Friendly', 'Anti-bacterial'].map(feat => (
                  <button
                    key={feat}
                    onClick={() => toggleAttribute(feat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                      selectedAttributes.has(feat) 
                      ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white' 
                      : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                    }`}
                  >
                    {feat}
                  </button>
                ))}
              </div>
            </section>

            {/* GRADE (Product-Specific) */}
            <section>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#101828] mb-4">GRADE</h3>
              <div className="flex flex-wrap gap-2">
                {['OPC 53', 'PPC', 'White', 'Premium', 'Standard', 'Economy'].map(grade => (
                  <button
                    key={grade}
                    onClick={() => toggleAttribute(grade)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                      selectedAttributes.has(grade) 
                      ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white' 
                      : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    );
  };

  // Render product card component
  const renderProductCard = (p: ExtendedProduct, idx: number) => (
    <motion.div
      key={p.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="bg-white border border-gray-100 rounded-[14px] shadow-sm flex flex-col h-auto hover:shadow-lg transition-all group hover:border-[#FF6A3D]/20 cursor-pointer relative overflow-hidden"
      onClick={() => onProductClick(p.id)}
    >
      {/* Product Image */}
      <div className="h-[180px] w-full relative overflow-hidden rounded-t-[14px] shrink-0">
        <ImageWithFallback 
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand • Series */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] text-[#98A2B3] font-medium uppercase tracking-wider">
            {p.brand}
          </span>
          {p.productFamily && (
            <>
              <span className="text-[10px] text-[#D0D5DD]">•</span>
              <span className="text-[10px] text-[#98A2B3] font-normal">
                {p.productFamily}
              </span>
            </>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-[15px] font-medium text-[#101828] leading-tight mb-auto line-clamp-2 group-hover:text-[#FF6A3D] transition-colors">
          {p.name}
        </h3>
        
        {/* CTA */}
        <div className="flex items-center justify-end pt-4 mt-3">
          <button 
            className="text-[11px] font-bold text-[#FF6A3D] flex items-center gap-1 hover:gap-2 transition-all"
          >
            VIEW <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-['Satoshi',sans-serif]">
      {/* Hero search — AI / image / PDF / QR */}
      <ProductsHeroSearch onSubmit={(q) => setSearchQuery(q)} />

      {/* Featured brands marquee */}
      <ProductsBrandStrip />

      <div className="mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="flex gap-8 relative">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <FiltersContent />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Breadcrumbs - Scrollable on mobile */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (crumb.name === 'Home') onBackToHome?.();
                      else if (crumb.name === 'Products') setCurrentPath([]);
                      else {
                        const newPath = currentPath.slice(0, idx - 1);
                        setCurrentPath(newPath);
                      }
                    }}
                    className={`text-[12px] md:text-[13px] ${idx === breadcrumbs.length - 1 ? 'text-[#101828] font-medium' : 'text-[#98A2B3] hover:text-[#FF6A3D] transition-colors'}`}
                  >
                    {crumb.name}
                  </button>
                  {idx < breadcrumbs.length - 1 && <ChevronRight size={14} className="text-[#D0D5DD]" />}
                </div>
              ))}
            </div>

            {/* Heading — shows only when drilled into a category */}
            {currentCategoryNode?.name && (
              <div className="mb-4 text-center md:text-left">
                <h1 className="text-[22px] md:text-[28px] font-medium text-[#101828] leading-tight uppercase tracking-tight">
                  {currentCategoryNode.name}
                </h1>
              </div>
            )}

            {/* Mobile Filter Toggle — only renders on <lg, no margin space on desktop */}
            <div className="lg:hidden flex flex-col gap-3 mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center justify-center gap-2 w-full h-[48px] bg-[#FF6A3D] text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF6A3D]/10">
                    <Filter size={16} /> Filters
                    {(selectedAttributes.size > 0 || selectedBrand || currentPath.length > 0) && (
                      <span className="size-5 bg-white text-[#FF6A3D] rounded-full flex items-center justify-center text-[10px]">!</span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-[320px] overflow-y-auto pt-10 px-6">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-lg font-bold uppercase tracking-widest text-left">Filters</SheetTitle>
                    <SheetDescription className="sr-only">
                      Select categories and brands to filter the product list.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="pb-24">
                    <FiltersContent />
                  </div>
                  {/* Sticky Footer for Filters in Sheet */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex gap-4">
                    <button 
                      onClick={() => { setSelectedAttributes(new Set()); setSelectedBrand(null); setCurrentPath([]); }}
                      className="flex-1 h-12 border border-gray-200 rounded-xl text-[11px] font-bold uppercase tracking-widest"
                    >
                      Clear
                    </button>
                    <SheetClose asChild>
                      <button className="flex-1 h-12 bg-[#FF6A3D] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest">
                        Apply
                      </button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* APPLIED FILTERS STRIP — brand/attribute only; category path is shown in breadcrumbs */}
            {(selectedBrand || selectedAttributes.size > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 pb-6 border-b border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applied Filters</h3>
                  <button
                    onClick={() => { setSelectedAttributes(new Set()); setSelectedBrand(null); }}
                    className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBrand && (
                    <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{selectedBrand}</span>
                      <button
                        onClick={() => setSelectedBrand(null)}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                  {Array.from(selectedAttributes).map(attr => (
                    <div key={attr} className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{attr}</span>
                      <button
                        onClick={() => toggleAttribute(attr)}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content Grid */}
            {/* Categories Section Wrapper - Always rendered for scroll anchor */}
            <div id="categories" className="scroll-mt-32">
              {/* Subcategories Section - compact cards with hover-expand */}
              {currentCategoryNode?.children && currentCategoryNode.children.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] mb-3 px-1">
                    SUBCATEGORIES
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {currentCategoryNode.children.map((child, idx) => (
                      <CompactCategoryCard
                        key={child.slug}
                        node={child}
                        idx={idx + currentPath.length * 10}
                        hoveredId={hoveredCard}
                        setHoveredId={setHoveredCard}
                        onClick={() => {
                          setCurrentPath([...currentPath, child.slug]);
                          toggleCat(child.slug);
                          setHoveredCard(null);
                        }}
                        onSubClick={(subSlug) => {
                          setCurrentPath([...currentPath, child.slug, subSlug]);
                          toggleCat(child.slug);
                          toggleCat(subSlug);
                          setHoveredCard(null);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Top-level categories when no path — compact cards with hover-expand */}
              {currentPath.length === 0 && (
                <div className="mb-8">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] mb-3 px-1">
                    CATEGORIES
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {CATEGORY_TAXONOMY.map((child, idx) => (
                      <CompactCategoryCard
                        key={child.slug}
                        node={child}
                        idx={idx}
                        hoveredId={hoveredCard}
                        setHoveredId={setHoveredCard}
                        onClick={() => {
                          setCurrentPath([child.slug]);
                          toggleCat(child.slug);
                          setActiveTopLevelCategory(child.slug);
                          setHoveredCard(null);
                        }}
                        onSubClick={(subSlug) => {
                          setCurrentPath([child.slug, subSlug]);
                          toggleCat(child.slug);
                          toggleCat(subSlug);
                          setActiveTopLevelCategory(child.slug);
                          setHoveredCard(null);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Products Section Wrapper - Always rendered for scroll anchor */}
            <div id="products" className="scroll-mt-32">
              <div>
                {/* Section Heading — always rendered */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] px-1">
                    PRODUCT LISTING
                  </h2>
                  <span className="text-[12px] text-[#98A2B3] font-medium">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  /* Flat product grid */
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((p, idx) => renderProductCard(p, idx))}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Empty placeholder — "Data in Pipeline" with hourglass animation */
                  <DataInPipeline />
                )}
              </div>
            </div>
          </main>

        </div>
      </div>

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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// ─── Empty-state placeholder: data not yet seeded for this scope ──────────
function DataInPipeline() {
  return (
    <div
      className="rounded-2xl py-16 px-6 text-center relative overflow-hidden"
      style={{
        background: "var(--glass)",
        border: "var(--border-subtle)",
      }}
    >
      {/* Subtle moving wash to convey "in transit" */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(255,106,61,0.06) 45%, rgba(255,106,61,0.12) 50%, rgba(255,106,61,0.06) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "pipelineShimmer 3.6s linear infinite",
        }}
      />

      <div className="relative">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{
            background: "rgba(255,106,61,0.10)",
            border: "1px solid rgba(255,106,61,0.20)",
          }}
        >
          <Hourglass
            className="w-7 h-7"
            style={{
              color: "var(--accent)",
              animation: "hourglassFlip 2.4s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
        </div>
        <h3
          className="text-[15px] mb-1"
          style={{ fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.02em" }}
        >
          Data in Pipeline
        </h3>
        <p className="text-[12.5px] max-w-xs mx-auto" style={{ color: "var(--text-secondary)" }}>
          Products for this category are being ingested. Check back shortly or explore a sibling category.
        </p>
      </div>

      <style>{`
        @keyframes hourglassFlip {
          0%   { transform: rotate(0deg); }
          45%  { transform: rotate(0deg); }
          55%  { transform: rotate(180deg); }
          100% { transform: rotate(180deg); }
        }
        @keyframes pipelineShimmer {
          0%   { background-position: -100% 0; }
          100% { background-position:  100% 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Featured brands strip — relevant to the current drilled category ─────
function CategoryFeaturedBrands({
  products,
  categoryName,
  onBrandClick,
  selectedBrand,
}: {
  products: ExtendedProduct[];
  categoryName?: string;
  onBrandClick: (brand: string) => void;
  selectedBrand: string | null;
}) {
  // Unique brands with their product count, sorted by count desc
  const brands = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.brand, (m.get(p.brand) ?? 0) + 1));
    return Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([brand, count]) => ({ brand, count }));
  }, [products]);

  if (brands.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] mb-3 px-1">
        FEATURED BRANDS{categoryName ? ` IN ${categoryName.toUpperCase()}` : ""}
      </h2>
      <div className="flex flex-wrap gap-2">
        {brands.map(({ brand, count }) => {
          const active = selectedBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => onBrandClick(brand)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] transition-all"
              style={{
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: active ? "white" : "var(--text-primary)",
                background: active ? "var(--accent)" : "var(--glass-strong)",
                border: active ? "1px solid var(--accent)" : "var(--border-subtle)",
                boxShadow: active ? "0 4px 14px rgba(255,106,61,0.25)" : "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: active ? "white" : "var(--accent)" }}
              />
              <span>{brand}</span>
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px]"
                style={{
                  background: active ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.06)",
                  color: active ? "white" : "var(--text-muted)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Featured products spotlight — top-ranked products at each level ──────
function CategoryFeaturedProducts({
  products,
  categoryName,
  onProductClick,
}: {
  products: ExtendedProduct[];
  categoryName?: string;
  onProductClick?: (id: string) => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085]">
          FEATURED PRODUCTS{categoryName ? ` IN ${categoryName.toUpperCase()}` : ""}
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>
          Top picks
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onProductClick?.(p.id)}
            className="text-left rounded-2xl overflow-hidden transition-all hover:translate-y-[-2px] group"
            style={{
              background: "var(--glass-strong)",
              border: "var(--border-subtle)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.badge && (
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    letterSpacing: "0.08em",
                  }}
                >
                  {p.badge}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em" }}>
                {p.brand}
              </p>
              <p className="text-[12.5px] line-clamp-2" style={{ fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                {p.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Button-shaped category that morphs into a mini-card on hover ──────────
// Idle: a pill button (small thumbnail + name + sub-count chevron).
// Hover: the same wrapper expands in-place into a card showing up to 6
//        next-level buttons. Clicking one bypasses the L1 listing.
function CompactCategoryCard({
  node,
  idx,
  hoveredId,
  setHoveredId,
  onClick,
  onSubClick,
}: {
  node: CategoryNode;
  idx: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onClick: () => void;
  onSubClick: (subSlug: string) => void;
}) {
  const isHovered = hoveredId === node.slug;
  const children = node.children ?? [];
  const showMore = children.length > 5;
  const visible = children.slice(0, showMore ? 5 : 6);
  const subCount = children.length;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unusedIdx = idx;

  return (
    // Outer reserves only the button's idle height so neighbors don't shift on hover.
    <div
      className="relative"
      style={{ height: 56 }}
      onMouseEnter={() => setHoveredId(node.slug)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div
        className="absolute left-0 right-0 top-0 rounded-2xl overflow-hidden transition-all duration-200"
        style={{
          zIndex: isHovered ? 30 : 1,
          background: isHovered ? "var(--glass-strong)" : "var(--glass-mid)",
          backdropFilter: "blur(12px) saturate(1.2)",
          WebkitBackdropFilter: "blur(12px) saturate(1.2)",
          border: isHovered
            ? "1.5px solid rgba(255,106,61,0.45)"
            : "var(--border-subtle)",
          boxShadow: isHovered
            ? "0 22px 50px rgba(255,106,61,0.20), 0 0 0 4px var(--accent-light)"
            : "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {/* HEADER (button surface, always shown). Click → drill into this node. */}
        <button
          onClick={onClick}
          className="group w-full flex items-center gap-2 px-4 cursor-pointer text-left"
          style={{ height: 56 }}
        >
          <span
            className="flex-1 truncate"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
            }}
            title={node.name}
          >
            {node.name}
          </span>
          {subCount > 0 && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: isHovered ? "var(--accent-light)" : "rgba(0,0,0,0.04)",
                color: isHovered ? "var(--accent)" : "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                transition: "all 0.18s ease",
              }}
            >
              {subCount}
              <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </button>

        {/* EXPANDED BODY (revealed on hover). Stays inside the card. */}
        <AnimatePresence initial={false}>
          {isHovered && children.length > 0 && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-2 pb-2 pt-0">
                {/* Hairline divider */}
                <div
                  className="h-px mx-1 mb-2"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                />
                {/* 6 next-level buttons in a 2-col grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {visible.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={(e) => { e.stopPropagation(); onSubClick(sub.slug); }}
                      className="text-left px-2.5 py-2 rounded-lg text-[11.5px] truncate transition-all"
                      style={{
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--accent-light)";
                        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.04)";
                      }}
                      title={sub.name}
                    >
                      {sub.name}
                    </button>
                  ))}
                  {showMore && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onClick(); }}
                      className="text-left px-2.5 py-2 rounded-lg text-[11.5px] truncate flex items-center justify-between gap-1"
                      style={{
                        fontWeight: 700,
                        color: "var(--accent)",
                        background: "var(--accent-light)",
                        border: "1px solid var(--accent-border)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      <span>More</span> <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}