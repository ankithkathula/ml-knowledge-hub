import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ChevronDown, Filter, Grid, Package, MapPin, X } from 'lucide-react';
import { CATEGORY_TAXONOMY, CategoryNode, buildBreadcrumb, findCategoryByPath } from '../../utils/categoryTaxonomy';
import { PRODUCTS, Product } from '../../utils/products';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AdBanner } from './AdBanner';
import { MainFooter } from './MainFooter';
import { StickyPageNav } from './StickyPageNav';
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

  // Count products in this category
  const products = allProducts.filter(p => {
    return p.category === node.slug ||
           p.subcategory === node.slug ||
           p.subSubcategory === node.slug;
  });

  const productCount = products.length;
  const brandCount = new Set(products.map(p => p.brand)).size;

  return { subcategoryCount, brandCount, productCount, isLeafNode };
};

// Helper to count products in a category tree node.
// A product belongs to this node's subtree iff the node's slug appears anywhere
// in the product's path (category > subcategory > subSubcategory > productType).
// Each slug occurs at most once per product, so this counts every product exactly
// once — ancestor nodes naturally include all descendant products, leaf product-type
// nodes are counted, and nothing is double-counted.
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
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(initialPath));
  const [selectedAttributes, setSelectedAttributes] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(new Set());
  const [selectedStock, setSelectedStock] = useState<'In Stock' | 'Made to Order' | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'name-az' | 'name-za' | 'brand'>('relevance');
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

  // Top brands derived from PRODUCTS by count (for quick filter strip)
  const topBrands = useMemo(() => {
    const m = new Map<string, number>();
    PRODUCTS.forEach(p => m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    const filtered = extendedProducts.filter(p => {
      // Category filter - ONLY DIRECT PRODUCTS AT CURRENT LEVEL
      if (currentPath.length > 0) {
        // Level 1: Only products where category matches AND no deeper assignment
        if (currentPath.length === 1) {
          if (p.category !== currentPath[0]) return false;
          // Check if product is DIRECTLY assigned to this level (no subcategory)
          // If it has a subcategory, it belongs to a deeper level
          if (p.subcategory && currentCategoryNode?.children?.some(c => c.slug === p.subcategory)) {
            return false; // This product belongs to a subcategory, not directly to this level
          }
        }
        // Level 2: Only products where subcategory matches AND no deeper assignment
        else if (currentPath.length === 2) {
          if (p.category !== currentPath[0]) return false;
          if (p.subcategory !== currentPath[1]) return false;
          // Check if product is DIRECTLY assigned to this level (no sub-subcategory)
          if (p.subSubcategory && currentCategoryNode?.children?.some(c => c.slug === p.subSubcategory)) {
            return false; // This product belongs to a sub-subcategory
          }
        }
        // Level 3: Only products where subSubcategory matches AND no deeper assignment
        else if (currentPath.length === 3) {
          if (p.category !== currentPath[0]) return false;
          if (p.subcategory !== currentPath[1]) return false;
          if (p.subSubcategory !== currentPath[2]) return false;
          // Check if product is DIRECTLY assigned to this level (no productType)
          if (p.productType && currentCategoryNode?.children?.some(c => c.slug === p.productType)) {
            return false; // This product belongs to a product type level
          }
        }
        // Level 4+: Show all matching products (leaf level)
        else {
          if (p.category !== currentPath[0]) return false;
          if (currentPath.length > 1 && p.subcategory !== currentPath[1]) return false;
          if (currentPath.length > 2 && p.subSubcategory !== currentPath[2]) return false;
          if (currentPath.length > 3 && p.productType !== currentPath[3]) return false;
        }
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(query) ||
                        p.brand.toLowerCase().includes(query) ||
                        p.category.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Multi-select brand filter
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) return false;

      // Badge filter
      if (selectedBadges.size > 0 && (!p.badge || !selectedBadges.has(p.badge))) return false;

      // Stock filter
      if (selectedStock && p.stock !== selectedStock) return false;

      // City filter
      if (selectedCity && !(p.availableCities ?? []).includes(selectedCity)) return false;

      // Attributes filter
      if (selectedAttributes.size > 0) {
        const pAttrs = [p.grade, p.finish, p.materialType, ...p.features, ...p.application].filter(Boolean) as string[];
        const hasAll = Array.from(selectedAttributes).every(a => pAttrs.includes(a));
        if (!hasAll) return false;
      }

      return true;
    });

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === 'name-az') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'name-za') sorted.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === 'brand') sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    return sorted;
  }, [currentPath, searchQuery, selectedBrands, selectedBadges, selectedStock, selectedCity, selectedAttributes, extendedProducts, currentCategoryNode, sortBy]);

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
    const [brandSearch, setBrandSearch] = useState('');
    const [showAllBrands, setShowAllBrands] = useState(false);

    const allBrands = useMemo(() => {
      const m = new Map<string, number>();
      PRODUCTS.forEach(p => m.set(p.brand, (m.get(p.brand) || 0) + 1));
      return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
    }, []);

    const allBadges = useMemo(() => {
      const m = new Map<string, number>();
      PRODUCTS.forEach(p => p.badge && m.set(p.badge, (m.get(p.badge) || 0) + 1));
      return [...m.entries()];
    }, []);

    const allCities = useMemo(() => {
      const s = new Set<string>();
      PRODUCTS.forEach(p => p.availableCities?.forEach(c => s.add(c)));
      return [...s].sort();
    }, []);

    const allMaterials = useMemo(() => {
      const s = new Set<string>();
      PRODUCTS.forEach(p => p.materialType && s.add(p.materialType));
      return [...s].sort();
    }, []);

    const allFinishes = useMemo(() => {
      const s = new Set<string>();
      PRODUCTS.forEach(p => p.finish && s.add(p.finish));
      return [...s].sort();
    }, []);

    const allFeatures = useMemo(() => {
      const s = new Set<string>();
      PRODUCTS.forEach(p => p.features.forEach(f => s.add(f)));
      return [...s].sort();
    }, []);

    const filteredBrandList = useMemo(() => {
      if (!brandSearch) return allBrands;
      return allBrands.filter(([b]) => b.toLowerCase().includes(brandSearch.toLowerCase()));
    }, [allBrands, brandSearch]);

    const visibleBrands = showAllBrands ? filteredBrandList : filteredBrandList.slice(0, 8);
    const hiddenCount = filteredBrandList.length - 8;

    const badgeEmoji: Record<string, string> = {
      'Top Seller': '🔥',
      'Eco-Friendly': '🌿',
      'New Launch': '✨',
      'Premium': '💎',
      'Best Value': '💰',
    };

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

        {/* Brands Section — multi-select with checkboxes */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">BRANDS</h3>
            {selectedBrands.size > 0 && (
              <button onClick={() => setSelectedBrands(new Set())} className="text-[10px] text-[#FF6A3D] font-semibold">Clear</button>
            )}
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-100 rounded-lg text-[12px] outline-none focus:border-[#FF6A3D]/30 transition-all"
            />
          </div>
          <div className="space-y-1">
            {visibleBrands.map(([brand, count]) => {
              const isSelected = selectedBrands.has(brand);
              return (
                <div
                  key={brand}
                  onClick={() => setSelectedBrands(prev => {
                    const next = new Set(prev);
                    next.has(brand) ? next.delete(brand) : next.add(brand);
                    return next;
                  })}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                    isSelected ? 'bg-[#FF6A3D] border-[#FF6A3D]' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg width="10" height="8" viewBox="0 0 10 8">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={`text-[13px] flex-1 ${isSelected ? 'text-[#101828] font-medium' : 'text-gray-600'}`}>
                    {brand}
                  </span>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full font-medium">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
          {!brandSearch && hiddenCount > 0 && (
            <button
              onClick={() => setShowAllBrands(v => !v)}
              className="mt-2 text-[11px] text-[#FF6A3D] font-semibold hover:underline"
            >
              {showAllBrands ? 'Show less' : `Show ${hiddenCount} more`}
            </button>
          )}
        </section>

        {/* Availability Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">AVAILABILITY</h3>
            {selectedStock && (
              <button onClick={() => setSelectedStock(null)} className="text-[10px] text-[#FF6A3D] font-semibold">Clear</button>
            )}
          </div>
          <div className="flex gap-2">
            {(['In Stock', 'Made to Order'] as const).map(stock => {
              const isActive = selectedStock === stock;
              return (
                <button
                  key={stock}
                  onClick={() => setSelectedStock(isActive ? null : stock)}
                  className={`flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all ${
                    isActive
                      ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white'
                      : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                  }`}
                >
                  {stock}
                </button>
              );
            })}
          </div>
        </section>

        {/* Badge / Tag Section */}
        {allBadges.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">BADGES</h3>
              {selectedBadges.size > 0 && (
                <button onClick={() => setSelectedBadges(new Set())} className="text-[10px] text-[#FF6A3D] font-semibold">Clear</button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allBadges.map(([badge]) => {
                const isSelected = selectedBadges.has(badge);
                return (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadges(prev => {
                      const next = new Set(prev);
                      next.has(badge) ? next.delete(badge) : next.add(badge);
                      return next;
                    })}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white'
                        : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                    }`}
                  >
                    {badgeEmoji[badge] || ''} {badge}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* City Availability Section */}
        {allCities.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">CITY AVAILABILITY</h3>
              {selectedCity && (
                <button onClick={() => setSelectedCity(null)} className="text-[10px] text-[#FF6A3D] font-semibold">Clear</button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allCities.map(city => {
                const isSelected = selectedCity === city;
                return (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(isSelected ? null : city)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white'
                        : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Material Type Section */}
        {allMaterials.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">MATERIAL TYPE</h3>
              {[...selectedAttributes].some(a => allMaterials.includes(a)) && (
                <button
                  onClick={() => setSelectedAttributes(prev => {
                    const next = new Set(prev);
                    allMaterials.forEach(m => next.delete(m));
                    return next;
                  })}
                  className="text-[10px] text-[#FF6A3D] font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-1">
              {allMaterials.map(material => {
                const isSelected = selectedAttributes.has(material);
                return (
                  <div
                    key={material}
                    onClick={() => toggleAttribute(material)}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                      isSelected ? 'bg-[#FF6A3D] border-[#FF6A3D]' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-[13px] ${isSelected ? 'text-[#101828] font-medium' : 'text-gray-600'}`}>
                      {material}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Finish Section */}
        {allFinishes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">FINISH</h3>
              {[...selectedAttributes].some(a => allFinishes.includes(a)) && (
                <button
                  onClick={() => setSelectedAttributes(prev => {
                    const next = new Set(prev);
                    allFinishes.forEach(f => next.delete(f));
                    return next;
                  })}
                  className="text-[10px] text-[#FF6A3D] font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allFinishes.map(finish => (
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
        )}

        {/* Dynamic Attribute Filters */}
        {isLevel4 && allFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="h-px bg-gray-100" />

            {/* FEATURES */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#101828]">FEATURES</h3>
                {[...selectedAttributes].some(a => allFeatures.includes(a)) && (
                  <button
                    onClick={() => setSelectedAttributes(prev => {
                      const next = new Set(prev);
                      allFeatures.forEach(f => next.delete(f));
                      return next;
                    })}
                    className="text-[10px] text-[#FF6A3D] font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allFeatures.map(feat => (
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

  const hasActiveFilters = selectedBrands.size > 0 || selectedBadges.size > 0 || selectedStock !== null || selectedCity !== null || selectedAttributes.size > 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-['Satoshi',sans-serif] pt-16 md:pt-20 lg:pt-24">
      {/* Ad Banner */}
      <AdBanner />

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

            {/* Heading */}
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h1 className="text-[22px] md:text-[28px] font-medium text-[#101828] leading-tight mb-2 uppercase tracking-tight">
                {currentCategoryNode?.name || 'DISCOVER MATERIALS'}
              </h1>
              <p className="text-[13px] md:text-[15px] text-[#667085]">
                Explore verified products from leading brands across India
              </p>
            </div>

            {/* Global Search & Filter Toggle */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[54px] pl-12 pr-6 bg-white border border-gray-200 rounded-xl text-[14px] md:text-[15px] outline-none focus:border-[#FF6A3D]/50 shadow-sm transition-all placeholder:text-[#98A2B3]"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center justify-center gap-2 w-full h-[48px] bg-[#FF6A3D] text-white rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF6A3D]/10">
                    <Filter size={16} /> Filters
                    {(selectedAttributes.size > 0 || selectedBrands.size > 0 || currentPath.length > 0) && (
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
                      onClick={() => {
                        setSelectedAttributes(new Set());
                        setSelectedBrands(new Set());
                        setSelectedBadges(new Set());
                        setSelectedStock(null);
                        setSelectedCity(null);
                        setCurrentPath([]);
                      }}
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

            {/* Sort + Results Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-[#667085]">
                <span className="font-semibold text-[#101828]">{filteredProducts.length}</span> products
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#98A2B3] hidden sm:block">Sort:</span>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
                  {([['relevance', 'Relevance'], ['name-az', 'A → Z'], ['name-za', 'Z → A'], ['brand', 'Brand']] as const).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setSortBy(val)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        sortBy === val ? 'bg-white text-[#101828] shadow-sm' : 'text-[#667085] hover:text-[#101828]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick brand filters strip */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[11px] text-[#98A2B3] font-semibold shrink-0 uppercase tracking-wider">Quick:</span>
              {topBrands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrands(prev => {
                    const next = new Set(prev);
                    next.has(brand) ? next.delete(brand) : next.add(brand);
                    return next;
                  })}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                    selectedBrands.has(brand)
                      ? 'bg-[#FF6A3D] border-[#FF6A3D] text-white'
                      : 'bg-white border-gray-200 text-[#4A5565] hover:border-[#FF6A3D]/50'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* APPLIED FILTERS STRIP */}
            {(hasActiveFilters || (currentPath.length > 0 && filteredProducts.length > 0)) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 pb-6 border-b border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Applied Filters</h3>
                  <button
                    onClick={() => {
                      setSelectedAttributes(new Set());
                      setSelectedBrands(new Set());
                      setSelectedBadges(new Set());
                      setSelectedStock(null);
                      setSelectedCity(null);
                      setSearchQuery('');
                    }}
                    className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPath.length > 0 && currentCategoryNode && (
                    <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">
                        {currentCategoryNode.name}
                      </span>
                      <button
                        onClick={() => setCurrentPath([])}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                  {Array.from(selectedBrands).map(brand => (
                    <div key={brand} className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{brand}</span>
                      <button
                        onClick={() => setSelectedBrands(prev => { const next = new Set(prev); next.delete(brand); return next; })}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                  {Array.from(selectedBadges).map(badge => (
                    <div key={badge} className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{badge}</span>
                      <button
                        onClick={() => setSelectedBadges(prev => { const next = new Set(prev); next.delete(badge); return next; })}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                  {selectedStock && (
                    <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{selectedStock}</span>
                      <button
                        onClick={() => setSelectedStock(null)}
                        className="size-3.5 flex items-center justify-center text-[#FF6A3D] hover:bg-[#FF6A3D]/10 rounded-full transition-colors"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                  {selectedCity && (
                    <div className="flex items-center gap-1.5 h-7 px-3 bg-[#FFF3EF] border border-[#FF6A3D]/20 rounded-full">
                      <span className="text-[11px] font-medium text-[#FF6A3D]">{selectedCity}</span>
                      <button
                        onClick={() => setSelectedCity(null)}
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
              {/* Subcategories Section - Always show if children exist */}
              {currentCategoryNode?.children && currentCategoryNode.children.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] mb-4 px-1">
                    SUBCATEGORIES
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {currentCategoryNode.children.map((child, idx) => {
                        const metrics = calculateCategoryMetrics(child, PRODUCTS);

                        return (
                          <motion.div
                            key={child.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="group cursor-pointer"
                            onClick={() => {
                              setCurrentPath([...currentPath, child.slug]);
                              toggleCat(child.slug);
                            }}
                          >
                            <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-gray-100 mb-3 relative border border-gray-100 shadow-sm transition-all group-hover:shadow-md group-hover:border-[#FF6A3D]/20">
                              <ImageWithFallback
                                src={`https://images.unsplash.com/photo-1595414440701-da000c40df9c?auto=format&fit=crop&q=80&w=600&sig=${idx + (currentPath.length * 10)}`}
                                alt={child.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <h3 className="text-[14px] md:text-[16px] font-medium text-[#101828] uppercase tracking-wide group-hover:text-[#FF6A3D] transition-colors mb-1.5">
                                {child.name}
                              </h3>
                              {/* Horizontal Metrics Row - Hierarchy-aware */}
                              <div className="flex items-center gap-3 text-[11px] md:text-[12px] text-[#6B7280] px-1">
                                {metrics.subcategoryCount > 0 && (
                                  <span>{metrics.subcategoryCount} Subcategor{metrics.subcategoryCount === 1 ? 'y' : 'ies'}</span>
                                )}
                                {metrics.productCount > 0 && (
                                  <span>•</span>
                                )}
                                {metrics.productCount > 0 && (
                                  <span>{metrics.productCount} Product{metrics.productCount === 1 ? '' : 's'}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Top-level categories when no path */}
              {currentPath.length === 0 && (
                <div className="mb-12">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] mb-4 px-1">
                    CATEGORIES
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {CATEGORY_TAXONOMY.map((child, idx) => {
                        const metrics = calculateCategoryMetrics(child, PRODUCTS);

                        return (
                          <motion.div
                            key={child.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="group cursor-pointer"
                            onClick={() => {
                              setCurrentPath([child.slug]);
                              toggleCat(child.slug);
                              setActiveTopLevelCategory(child.slug);
                            }}
                          >
                            <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-gray-100 mb-3 relative border border-gray-100 shadow-sm transition-all group-hover:shadow-md group-hover:border-[#FF6A3D]/20">
                              <ImageWithFallback
                                src={`https://images.unsplash.com/photo-1595414440701-da000c40df9c?auto=format&fit=crop&q=80&w=600&sig=${idx}`}
                                alt={child.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <h3 className="text-[14px] md:text-[16px] font-medium text-[#101828] uppercase tracking-wide group-hover:text-[#FF6A3D] transition-colors mb-1.5">
                                {child.name}
                              </h3>
                              <div className="flex items-center gap-3 text-[11px] md:text-[12px] text-[#6B7280] px-1">
                                {metrics.subcategoryCount > 0 && (
                                  <span>{metrics.subcategoryCount} Subcategor{metrics.subcategoryCount === 1 ? 'y' : 'ies'}</span>
                                )}
                                {metrics.productCount > 0 && (
                                  <span>•</span>
                                )}
                                {metrics.productCount > 0 && (
                                  <span>{metrics.productCount} Product{metrics.productCount === 1 ? '' : 's'}</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Products Section Wrapper - Always rendered for scroll anchor */}
            <div id="products" className="scroll-mt-32">
              {/* Products Section - Always show if products exist in current category */}
              {filteredProducts.length > 0 && (
                <div>
                  {/* Section Heading */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#667085] px-1">
                      {currentCategoryNode?.name
                        ? `PRODUCTS IN ${currentCategoryNode.name.toUpperCase()}`
                        : 'FEATURED PRODUCTS'
                      }
                    </h2>
                    <span className="text-[12px] text-[#98A2B3] font-medium">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </span>
                  </div>

                  {/* View Toggle - only show if at leaf level with multiple families */}
                  {currentPath.length >= 3 && showFamilyToggle && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                      <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] text-[#667085]">Display Mode</span>
                      <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                        <button
                          onClick={() => setViewMode('byFamily')}
                          className={`px-4 py-2 rounded-full text-[11px] md:text-[12px] font-bold uppercase tracking-wider transition-all ${
                            viewMode === 'byFamily'
                              ? 'bg-[#FF6A3D] text-white shadow-sm'
                              : 'text-[#667085] hover:text-[#101828]'
                          }`}
                        >
                          By Family
                        </button>
                        <button
                          onClick={() => setViewMode('allProducts')}
                          className={`px-4 py-2 rounded-full text-[11px] md:text-[12px] font-bold uppercase tracking-wider transition-all ${
                            viewMode === 'allProducts'
                              ? 'bg-[#FF6A3D] text-white shadow-sm'
                              : 'text-[#667085] hover:text-[#101828]'
                          }`}
                        >
                          All Products
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Products Display */}
                  {viewMode === 'byFamily' && showFamilyToggle ? (
                    // By Brand then Family View
                    <div id="brands" className="space-y-12 scroll-mt-32">
                      {Array.from(productsByBrandAndFamily.entries()).map(([brand, familyGroups]) => {
                        const isBrandExpanded = expandedBrands.has(brand);
                        const totalProducts = Array.from(familyGroups.values()).reduce((sum, products) => sum + products.length, 0);

                        return (
                          <div key={brand} className="border-b border-gray-100 pb-10 last:border-0">
                            {/* Compact Brand Header */}
                            <div
                              className="flex items-center justify-between h-[52px] px-4 mb-4 cursor-pointer group hover:bg-gray-50/50 rounded-lg transition-colors border-b border-gray-100"
                              onClick={() => toggleBrand(brand)}
                            >
                              <div className="flex items-center gap-3">
                                {/* Compact Brand Logo */}
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                                  <Package className="text-gray-400" size={16} />
                                </div>

                                {/* Brand Info - Compact */}
                                <div className="flex items-baseline gap-3">
                                  <h2 className="text-[16px] md:text-[17px] font-semibold text-[#101828] group-hover:text-[#FF6A3D] transition-colors">
                                    {brand}
                                  </h2>
                                  <span className="text-[12px] text-[#98A2B3] font-normal hidden md:inline">
                                    {familyGroups.size} {familyGroups.size === 1 ? 'family' : 'families'} · {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
                                  </span>
                                </div>
                              </div>

                              {/* Collapse/Expand Icon - Smaller */}
                              <motion.div
                                initial={false}
                                animate={{ rotate: isBrandExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown
                                  className="text-gray-400 shrink-0"
                                  size={18}
                                />
                              </motion.div>
                            </div>

                            {/* Brand's Product Families */}
                            <AnimatePresence>
                              {isBrandExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-8"
                                >
                                  {Array.from(familyGroups.entries()).map(([familyId, familyProducts]) => {
                                    const firstProduct = familyProducts[0];

                                    return (
                                      <div key={familyId} className="ml-0">
                                        {/* Product Family Header */}
                                        <div className="mb-4 px-4">
                                          <div className="flex items-baseline gap-2.5 mb-1">
                                            <h3 className="text-[15px] md:text-[16px] font-medium text-[#101828]">
                                              {firstProduct.productFamily || `${firstProduct.subcategory.charAt(0).toUpperCase() + firstProduct.subcategory.slice(1)} Series`}
                                            </h3>
                                            <span className="text-[11px] text-[#98A2B3] font-medium">
                                              ({familyProducts.length})
                                            </span>
                                          </div>
                                          <p className="text-[12px] text-[#667085]">
                                            Professional-grade {firstProduct.subcategory} products
                                          </p>
                                        </div>

                                        {/* Product Cards Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 px-4">
                                          {familyProducts.map((p, idx) => renderProductCard(p, idx))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // All Products View (Flat Grid)
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredProducts.map((p, idx) => renderProductCard(p, idx))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {(filteredProducts.length === 0 && isLevel4) && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="text-gray-300" size={32} />
                  </div>
                  <h3 className="text-[18px] font-medium text-[#101828] mb-1">No products found</h3>
                  <p className="text-[#667085] text-[14px]">Try adjusting your search or filters to find what you're looking for.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedAttributes(new Set());
                      setSelectedBrands(new Set());
                      setSelectedBadges(new Set());
                      setSelectedStock(null);
                      setSelectedCity(null);
                    }}
                    className="mt-6 px-6 py-2 bg-[#FF6A3D] text-white rounded-lg text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Sticky Right-Side Page Navigation */}
          <StickyPageNav
            sections={
              viewMode === 'byFamily' && showFamilyToggle
                ? [
                    { id: 'categories', label: 'Categories' },
                    { id: 'brands', label: 'Brands' },
                    { id: 'products', label: 'Products' }
                  ]
                : [
                    { id: 'categories', label: 'Categories' },
                    { id: 'products', label: 'Products' }
                  ]
            }
          />
        </div>
      </div>
      <MainFooter />

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
