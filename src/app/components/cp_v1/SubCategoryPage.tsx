import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, ChevronDown, Filter, X, ArrowRight } from 'lucide-react';
import { CategoryNode, CATEGORY_TAXONOMY } from '../../utils/categoryTaxonomy';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CarouselBanner } from './CarouselBanner';

interface SubCategoryPageProps {
  breadcrumb: { name: string; slug: string }[];
  categories: CategoryNode[];
  onCategoryClick: (slug: string) => void;
  onBreadcrumbClick: (index: number) => void;
}

const getCategoryImage = (slug: string) => {
  const imageMap: { [key: string]: string } = {
    'wood': 'https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?auto=format&fit=crop&q=80&w=1080',
    'tile': 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?auto=format&fit=crop&q=80&w=1080',
    'stone': 'https://images.unsplash.com/photo-1551554781-c46200ea959d?auto=format&fit=crop&q=80&w=1080',
    'wallpapers': 'https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&q=80&w=1080',
    'paints-coats': 'https://images.unsplash.com/photo-1581782046583-d09f142bdd65?auto=format&fit=crop&q=80&w=1080',
    'electrical': 'https://images.unsplash.com/photo-1764705637770-9fc400e090cb?auto=format&fit=crop&q=80&w=1080',
    'hardware': 'https://images.unsplash.com/photo-1674009599023-842e4c331605?auto=format&fit=crop&q=80&w=1080',
    'glass': 'https://images.unsplash.com/photo-1689890078990-a0bf1a7828e6?auto=format&fit=crop&q=80&w=1080',
    'fabric': 'https://images.unsplash.com/photo-1615799998603-7c6270a45196?auto=format&fit=crop&q=80&w=1080',
    'metal': 'https://images.unsplash.com/photo-1666594406463-84956e388260?auto=format&fit=crop&q=80&w=1080',
    'carpet': 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?auto=format&fit=crop&q=80&w=1080'
  };
  return imageMap[slug] || 'https://images.unsplash.com/photo-1595414440701-da000c40df9c?auto=format&fit=crop&q=80&w=1080';
};

export default function SubCategoryPage({
  breadcrumb,
  categories,
  onCategoryClick,
  onBreadcrumbClick
}: SubCategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const currentCategorySlug = breadcrumb.length > 2 ? breadcrumb[breadcrumb.length - 1].slug : '';
  
  const getInitialExpandedCategories = () => {
    const expanded = new Set<string>();
    breadcrumb.forEach(crumb => { if (crumb.slug) expanded.add(crumb.slug); });
    return expanded;
  };
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(getInitialExpandedCategories());
  
  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const renderCategoryTree = (cats: CategoryNode[], level: number = 0) => {
    return cats.map((cat) => {
      const isExpanded = expandedCategories.has(cat.slug);
      const hasChildren = cat.children && cat.children.length > 0;
      const isCurrentCategory = cat.slug === currentCategorySlug;
      const isInBreadcrumb = breadcrumb.some(crumb => crumb.slug === cat.slug);
      
      return (
        <div key={cat.slug} style={{ marginLeft: level > 0 ? '16px' : '0' }}>
          <div className={`flex items-center justify-between w-full py-2 rounded-lg transition-colors ${
            isCurrentCategory ? 'bg-[#FF6A3D]/10' : ''
          }`}>
            <button
              onClick={() => onCategoryClick(cat.slug)}
              className={`text-[14px] transition-colors flex-1 text-left px-2 ${
                isCurrentCategory 
                  ? 'text-[#FF6A3D] font-bold' 
                  : isInBreadcrumb
                  ? 'text-[#0F172A]'
                  : 'text-gray-500 hover:text-[#FF6A3D]'
              }`}
            >
              {cat.name}
              {cat.hasProducts && (
                <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${
                  isCurrentCategory ? 'text-[#FF6A3D] bg-[#FF6A3D]/20' : 'text-[#FF6A3D] bg-[#FF6A3D]/10'
                }`}>
                  Available
                </span>
              )}
            </button>
            {hasChildren && (
              <button onClick={() => toggleCategory(cat.slug)} className="ml-2 p-1">
                <ChevronDown className={`w-4 h-4 transition-transform ${isCurrentCategory ? 'text-[#FF6A3D]' : 'text-gray-400'} ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div className="border-l-2 border-gray-100 ml-2">
              {renderCategoryTree(cat.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] pt-32 pb-24">
      <CarouselBanner />
      
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-12 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          {breadcrumb.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => onBreadcrumbClick(index)}
                className={`transition-colors ${index === breadcrumb.length - 1 ? 'text-[#0F172A]' : 'hover:text-[#FF6A3D]'}`}
              >
                {crumb.name}
              </button>
              {index < breadcrumb.length - 1 && <span className="opacity-30">/</span>}
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full h-12 flex items-center justify-between px-6 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-8"
        >
          <div className="flex items-center gap-3">
            <Filter size={14} />
            <span>Filter Categories</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-16 items-start">
          <aside className={`w-full shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-8">
              <h3 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-[0.2em] mb-6">Directory</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-transparent focus:border-[#FF6A3D]/40 rounded-xl text-sm outline-none transition-all"
                />
              </div>
              <div className="pt-4 max-h-[600px] overflow-y-auto no-scrollbar">
                {renderCategoryTree(CATEGORY_TAXONOMY)}
              </div>
            </div>
          </aside>

          <main className="w-full">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {filteredCategories.length} Results Found
              </p>
            </div>

            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.slug}
                    whileHover={{ y: -8 }}
                    onClick={() => onCategoryClick(category.slug)}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={getCategoryImage(category.slug)}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowRight size={18} className="text-[#FF6A3D]" />
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-lg font-medium text-[#0F172A] mb-2 group-hover:text-[#FF6A3D] transition-colors line-clamp-1 uppercase tracking-tight">
                        {category.name}
                      </h3>
                      {category.children && category.children.length > 0 && (
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {category.children.length} Subcategories
                        </p>
                      )}
                      {category.hasProducts && (
                        <div className="flex items-center gap-3 mt-6">
                          <div className="h-1 flex-1 bg-gray-50 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-[#FF6A3D] rounded-full" />
                          </div>
                          <span className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest">Available</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
                <Search size={48} className="text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl text-[#0F172A] mb-2 font-normal">No categories matched</h3>
                <p className="text-gray-500 mb-8">Try adjusting your search criteria.</p>
                <button onClick={() => setSearchQuery('')} className="text-[#FF6A3D] font-bold text-[11px] uppercase tracking-widest hover:underline">
                  Clear All Search
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
