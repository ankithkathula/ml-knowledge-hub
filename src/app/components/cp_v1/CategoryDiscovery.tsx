import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'flooring',
    name: 'Flooring',
    applications: 'Residential • Industrial',
    image: 'https://images.unsplash.com/photo-1594570885125-8bc04167a4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmbG9vciUyMHRpbGVzJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzIwMTMzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Ceramic Tiles', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=200' },
      { name: 'Marble', image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=200' },
      { name: 'Hardwood', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=200' },
      { name: 'Laminate', image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=200' },
      { name: 'Vinyl', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting',
    applications: 'Residential • Commercial • Outdoor',
    image: 'https://images.unsplash.com/photo-1758945630632-7a8f1caffc6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW5kYW50JTIwbGlnaHRpbmclMjBmaXh0dXJlfGVufDF8fHx8MTc3MjAxMzMzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Pendants', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=200' },
      { name: 'Chandeliers', image: 'https://images.unsplash.com/photo-1543167653-41279ad7d173?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wall Sconces', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'sanitary',
    name: 'Sanitary',
    applications: 'Kitchen • Bathroom • Commercial',
    image: 'https://images.unsplash.com/photo-1761353854551-361b1c804849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHNpbmslMjBmYXVjZXQlMjBjaHJvbWV8ZW58MXx8fHwxNzcyMDEzMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Faucets', image: 'https://images.unsplash.com/photo-1518005020251-582c788447dd?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wash Basins', image: 'https://images.unsplash.com/photo-1544181093-c712fb401bdc?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'wall-finishes',
    name: 'Wall Finishes',
    applications: 'Interior • Exterior',
    image: 'https://images.unsplash.com/photo-1768320837734-02390d59dfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMHdhbGwlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzIwMTMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Paints', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wallpapers', image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware',
    applications: 'Doors • Windows • Cabinetry',
    image: 'https://images.unsplash.com/photo-1766752599571-ce70688f7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb29yJTIwaGFuZGxlJTIwYnJhc3MlMjBoYXJkd2FyZXxlbnwxfHx8fDE3NzIwMTMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Door Handles', image: 'https://images.unsplash.com/photo-1530124560676-4fbc91abc5f1?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    applications: 'Residential • Infrastructure',
    image: 'https://images.unsplash.com/photo-1769376695235-d3253548a5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3BwZXIlMjBwbHVtYmluZyUyMHBpcGVzJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzIwMTMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Pipes', image: 'https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    applications: 'Grid • Home • Automation',
    image: 'https://images.unsplash.com/photo-1745169921021-3304a3eed8ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcGFuZWwlMjBzd2l0Y2hlcyUyMG1vZGVybnxlbnwxfHx8fDE3NzIwMTMzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Switches', image: 'https://images.unsplash.com/photo-1558444479-c86e10556b82?auto=format&fit=crop&q=80&w=200' },
      { name: 'Wiring', image: 'https://images.unsplash.com/photo-1558444479-c86e10556b82?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  {
    id: 'roofing',
    name: 'Roofing',
    applications: 'Slope • Flat • Green Roofs',
    image: 'https://images.unsplash.com/photo-1760544137672-c22ce36ea818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwdGlsZXMlMjBhcmNoaXRlY3R1cmUlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzcyMDEzMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: [
      { name: 'Tiles', image: 'https://images.unsplash.com/photo-1626247754546-f9478f7e34d6?auto=format&fit=crop&q=80&w=200' },
      { name: 'Metal Sheets', image: 'https://images.unsplash.com/photo-1626247754546-f9478f7e34d6?auto=format&fit=crop&q=80&w=200' }
    ]
  }
];

export function CategoryDiscovery({ onViewAll }: { onViewAll?: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCategory = categories.find(c => c.id === selectedId);

  const handleCategoryClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 w-full max-w-[1280px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <div>
          <h2 className="font-['Satoshi',sans-serif] font-medium uppercase text-[10px] md:text-[11px] text-gray-400 tracking-[0.25em] mb-1.5">
            Ecosystem Materials
          </h2>
          <p className="text-[13px] md:text-[15px] text-gray-900 dark:text-white font-medium">Browse by category to discover brands and products.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#FF6A3D] hover:underline underline-offset-4 transition-all"
        >
          Explore All
        </button>
      </div>

      <div className="relative">
        {/* Main Categories Grid - Adaptive Layout */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-between items-start gap-x-4 gap-y-8 md:gap-[32px] w-full mb-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="flex flex-col items-center gap-[10px] md:gap-[12px] cursor-pointer group/item relative w-full lg:w-auto"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px] rounded-full relative transition-all duration-300 ${
                  selectedId === cat.id 
                    ? 'border-[3px] border-[#FF6A3D] shadow-[0px_0px_0px_4px_rgba(255,106,61,0.10)]' 
                    : 'border-[2px] border-transparent hover:border-gray-200'
                }`}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className={`absolute inset-0 bg-black/5 transition-opacity ${selectedId === cat.id ? 'opacity-0' : 'group-hover/item:opacity-10'}`} />
                </div>
              </motion.div>
              
              <div className="text-center flex flex-col gap-[4px] md:gap-[6px]">
                <span className={`font-['Satoshi',sans-serif] font-medium text-[12px] sm:text-[13px] md:text-[14px] transition-colors duration-300 ${
                  selectedId === cat.id ? 'text-[#FF6A3D]' : 'text-[#1A1A1A] dark:text-gray-200'
                }`}>
                  {cat.name}
                </span>
                <span className="font-['Satoshi',sans-serif] font-normal text-[10px] sm:text-[11px] md:text-[12px] text-[#6B7280] max-w-[100px] sm:max-w-[120px] mx-auto leading-tight hidden sm:block">
                  {cat.applications}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Subcategory Tray - Inline expansion directly below */}
        <AnimatePresence>
          {selectedId && selectedCategory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 md:mt-[32px]"
            >
              <div className="bg-white dark:bg-gray-900 rounded-[12px] p-6 md:p-[32px] border-[2px] border-[#FF6A3D] relative shadow-sm">
                {/* Connection indicator */}
                <div className="absolute -top-[14px] left-[24px] md:left-[32px] bg-white dark:bg-gray-900 px-[8px] flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FF6A3D]" />
                  <h3 className="text-[10px] md:text-[12px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">
                    {selectedCategory.name} Specialties
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-[24px]">
                  {selectedCategory.subcategories.map((sub, idx) => (
                    <motion.div
                      key={sub.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex flex-col items-center justify-center gap-[10px] md:gap-[12px] aspect-square bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-[12px] cursor-pointer transition-all hover:border-[#FF6A3D] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)]"
                      onClick={onViewAll}
                    >
                      <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-[8px] overflow-hidden">
                        <img 
                          src={sub.image} 
                          alt={sub.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      <p className="text-[11px] md:text-[13px] font-['Satoshi',sans-serif] font-medium text-[#1A1A1A] dark:text-gray-200 group-hover:text-[#FF6A3D] transition-colors text-center px-[4px]">
                        {sub.name}
                      </p>
                    </motion.div>
                  ))}
                  
                  {/* View All Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: selectedCategory.subcategories.length * 0.05 }}
                    className="group flex flex-col items-center justify-center gap-[10px] md:gap-[12px] aspect-square bg-white dark:bg-gray-800 border border-dashed border-[#D1D5DB] dark:border-gray-600 rounded-[12px] cursor-pointer transition-all hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/5"
                    onClick={onViewAll}
                  >
                    <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] flex items-center justify-center">
                      <ArrowRight className="w-[16px] md:w-[20px] h-[16px] md:h-[20px] text-gray-400 group-hover:text-[#FF6A3D]" />
                    </div>
                    <p className="text-[11px] md:text-[13px] font-['Satoshi',sans-serif] font-medium text-gray-400 group-hover:text-[#FF6A3D] transition-colors">
                      View All
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}