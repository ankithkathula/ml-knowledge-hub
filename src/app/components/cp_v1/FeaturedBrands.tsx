import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

const brands = [
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    description: 'Leading paints and wall finishes provider.',
    cover: 'https://images.unsplash.com/photo-1760101187116-fa8409c3d9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    logo: 'https://companieslogo.com/img/orig/ASIANPAINT.NS-51d08d98.png?t=1593960012',
    categories: [
      { name: 'Interior Paints', image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=200' },
      { name: 'Exterior Paints', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=200' },
      { name: 'Waterproofing', image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wood Finishes', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=200' },
      { name: 'Adhesives', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wallpapers', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=200' },
      { name: 'Tools', image: 'https://images.unsplash.com/photo-1530124560677-bdaea02c9a59?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'ultratech',
    name: 'UltraTech',
    description: "The Engineer's Choice for cement.",
    cover: 'https://images.unsplash.com/photo-1764856601179-dfeca7b37e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    logo: 'https://companieslogo.com/img/orig/ULTRACEMCO.NS-471277a0.png?t=1593960012',
    categories: [
      { name: 'Grey Cement', image: 'https://images.unsplash.com/photo-1541888941255-276ad416006c?auto=format&fit=crop&q=80&w=200' },
      { name: 'White Cement', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200' },
      { name: 'Ready Mix', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    description: 'Global leader in habitat materials.',
    cover: 'https://images.unsplash.com/photo-1715156153744-d5fd2f1f66eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    logo: 'https://companieslogo.com/img/orig/SGO.PA-94578b87.png?t=1593960012',
    categories: [
      { name: 'Glass Solutions', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=200' },
      { name: 'Gypsum Plaster', image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=200' },
      { name: 'Insulation', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'kajaria',
    name: 'Kajaria',
    description: 'India\'s No. 1 tile company specialist.',
    cover: 'https://images.unsplash.com/photo-1745124372154-81972a68eaae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    logo: 'https://companieslogo.com/img/orig/KAJARIACER.NS-3507198e.png?t=1593960012',
    categories: [
      { name: 'Ceramic Tiles', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=200' },
      { name: 'Vitrified Tiles', image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wall Tiles', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    description: 'Structural solutions and advanced steel.',
    cover: 'https://images.unsplash.com/photo-1674062333283-41a1b59f0408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    logo: 'https://companieslogo.com/img/orig/TATASTEEL.NS-70335805.png?t=1593960012',
    categories: [
      { name: 'Structural Steel', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200' },
      { name: 'TMT Bars', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=200' },
      { name: 'Steel Sheets', image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=200' }
    ]
  }
];

export function FeaturedBrands({ onViewAll, onBrandFilterClick }: { onViewAll?: () => void; onBrandFilterClick?: (brand: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  const selectedBrand = brands.find(b => b.id === selectedId);

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-['Satoshi',sans-serif] font-medium uppercase text-[10px] md:text-[12px] text-gray-400 tracking-[0.2em] mb-1">
              Featured Brands
            </h2>
            <p className="text-[13px] md:text-[14px] text-gray-900 dark:text-white">Partnering with industry pioneers.</p>
          </div>
          <button 
            onClick={onViewAll}
            className="text-[10px] md:text-[11px] font-medium uppercase tracking-wider text-[#FF6A3D] hover:opacity-80 transition-opacity cursor-pointer"
          >
            View all brands
          </button>
        </div>

        {/* Brand Cards - Reduced to 5 with better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {brands.map((brand) => {
            const isSelected = selectedId === brand.id;
            return (
              <motion.div
                key={brand.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedId(selectedId === brand.id ? null : brand.id);
                  setActiveCategoryId(null);
                }}
                className={`relative w-full h-[260px] overflow-hidden cursor-pointer group transition-all duration-300 rounded-xl ${
                  isSelected 
                    ? 'ring-2 ring-[#FF6A3D] ring-offset-2 shadow-[0px_12px_32px_rgba(255,106,61,0.15)]' 
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                {/* Brand Cover Image */}
                <img 
                  src={brand.cover} 
                  alt={brand.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Simplified Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Brand Info - Clean and Minimal */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="font-['Satoshi',sans-serif] font-medium text-[15px] text-white mb-1.5 tracking-wide">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-white/70 line-clamp-1 leading-snug">
                    {brand.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Collections Panel - Refined and Lighter */}
        <AnimatePresence>
          {selectedId && selectedBrand && selectedBrand.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="relative mt-6 p-6 md:p-8 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A3D]" />
                  <span className="text-[13px] font-['Satoshi'] font-medium text-[#1A1A1A] dark:text-white tracking-wide">
                    {selectedBrand.name} Collections
                  </span>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6">
                  <button 
                    onClick={() => onBrandFilterClick?.(selectedBrand.name)} 
                    className="text-[11px] uppercase font-medium text-[#FF6A3D] hover:opacity-70 transition-opacity"
                  >
                    View Brand Collection
                  </button>
                  <button 
                    onClick={() => setSelectedId(null)} 
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Collection Icons - Uniform and Balanced */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8">
                {selectedBrand.categories.map((cat) => {
                  const isActive = activeCategoryId === cat.name;
                  return (
                    <motion.div 
                      key={cat.name} 
                      className="flex flex-col items-center gap-3 group cursor-pointer" 
                      onClick={() => setActiveCategoryId(isActive ? null : cat.name)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Consistent Circular Thumbnail */}
                      <div 
                        className={`relative w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden transition-all duration-300 ${
                          isActive 
                            ? 'ring-2 ring-[#FF6A3D] ring-offset-2 shadow-lg' 
                            : 'ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-[#FF6A3D] group-hover:shadow-md'
                        }`}
                      >
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      {/* Category Label */}
                      <p className={`text-[11px] md:text-[12px] font-['Satoshi'] font-medium text-center transition-colors duration-300 leading-tight ${
                        isActive ? 'text-[#FF6A3D]' : 'text-[#667085] dark:text-gray-400 group-hover:text-[#FF6A3D]'
                      }`}>
                        {cat.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}