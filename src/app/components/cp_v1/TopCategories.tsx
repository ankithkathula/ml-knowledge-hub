import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, X, ChevronDown } from 'lucide-react';
import { useState, Fragment } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

const brandCards = [
  {
    type: 'image',
    category: 'Architecture & Design',
    title: 'Modern Construction Solutions',
    brandName: 'BuildTech',
    description: 'Leading provider of innovative architectural and construction materials',
    image: 'https://images.unsplash.com/photo-1725710017711-eaabee5c0ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXV0cmFsJTIwYXJjaGl0ZWN0dXJlJTIwZGVzaWdufGVufDF8fHx8MTc2MjQyMjgzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    categories: [
      { name: 'Flooring', count: 45, image: 'https://images.unsplash.com/photo-1680888758071-4a452f5929fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
      { name: 'Walls & Ceilings', count: 32, image: 'https://images.unsplash.com/photo-1731167710757-22cd88c30a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
      { name: 'Windows & Doors', count: 28, image: 'https://images.unsplash.com/photo-1761353854314-4bda99811659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
      { name: 'Structural Materials', count: 56, image: 'https://images.unsplash.com/photo-1719597677070-35e90ba944d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080' },
    ]
  },
  {
    type: 'info',
    category: 'Premium Brands',
    title: 'Kohler & Miele',
    brandName: 'Kohler & Miele',
    description: 'Leading manufacturers in kitchen, bath, and premium appliances',
    link: 'More Information',
    categories: [
      { name: 'Kitchen & Bath', count: 78, image: 'https://images.unsplash.com/photo-1761353854314-4bda99811659?w=1080' },
      { name: 'Fixtures & Faucets', count: 92, image: 'https://images.unsplash.com/photo-1731167710757-22cd88c30a90?w=1080' },
      { name: 'Appliances', count: 65, image: 'https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=1080' },
      { name: 'Lighting', count: 41, image: 'https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=1080' },
    ]
  },
  {
    type: 'image',
    category: 'Interior Design',
    title: 'Luxury Spaces & Furnishing',
    brandName: 'DesignPro',
    description: 'Premium interior design solutions and luxury furnishings',
    image: 'https://images.unsplash.com/photo-1578500361532-ce1c4fa01c69?w=1080',
    categories: [
      { name: 'Furniture', count: 134, image: 'https://images.unsplash.com/photo-1540932428079-887d0d7a8fa5?w=1080' },
      { name: 'Textiles & Fabrics', count: 87, image: 'https://images.unsplash.com/photo-1560121361-3968dbf2b749?w=1080' },
      { name: 'Decorative Elements', count: 102, image: 'https://images.unsplash.com/photo-1752262167753-37a0ec83f614?w=1080' },
      { name: 'Storage Solutions', count: 56, image: 'https://images.unsplash.com/photo-1540932428079-887d0d7a8fa5?w=1080' },
    ]
  },
  {
    type: 'image',
    category: 'Building Materials',
    title: 'Quality Construction Supplies',
    brandName: 'MaterialsPlus',
    description: 'Comprehensive range of construction and building materials',
    image: 'https://images.unsplash.com/photo-1626814213960-f595aff441e1?w=1080',
    categories: [
      { name: 'Stone & Tile', count: 156, image: 'https://images.unsplash.com/photo-1731167710757-22cd88c30a90?w=1080' },
      { name: 'Concrete & Masonry', count: 89, image: 'https://images.unsplash.com/photo-1719597677070-35e90ba944d4?w=1080' },
      { name: 'Wood & Timber', count: 112, image: 'https://images.unsplash.com/photo-1680888758071-4a452f5929fa?w=1080' },
      { name: 'Composite Materials', count: 67, image: 'https://images.unsplash.com/photo-1719597677070-35e90ba944d4?w=1080' },
    ]
  },
];

function ImageCard({ card, index, onClick, isExpanded }: { card: any; index: number; onClick: () => void; isExpanded: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden cursor-pointer h-[360px] shadow-sm border border-gray-100 dark:border-gray-800"
    >
      <div className="absolute inset-0">
        <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.6 }} className="w-full h-full">
          <ImageWithFallback src={card.image} alt={card.title} className="w-full h-full object-cover" />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">{card.category}</p>
        <h3 className="text-2xl text-white mb-4 uppercase tracking-tight leading-tight">{card.title}</h3>
        <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className="flex items-center gap-3 text-[#FF6A3D] text-[11px] font-bold uppercase tracking-widest">
          {isExpanded ? 'Collapse' : 'Explore Categories'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoCard({ card, index, onClick, isExpanded }: { card: any; index: number; onClick: () => void; isExpanded: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-900 rounded-[32px] p-10 cursor-pointer h-[360px] flex flex-col justify-between border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500"
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6A3D] mb-4">{card.category}</p>
        <h3 className="text-3xl text-[#0F172A] dark:text-white mb-4 uppercase tracking-tight leading-tight">{card.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{card.description}</p>
      </div>
      <div className="flex items-center gap-3 text-[#FF6A3D] text-[11px] font-bold uppercase tracking-widest">
        {isExpanded ? 'Close View' : 'Browse Categories'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
    </motion.div>
  );
}

function ExpandedCategories({ brand }: { brand: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="col-span-full"
    >
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[40px] p-8 md:p-12 mt-6 border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {brand.categories.map((cat: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <ImageWithFallback src={cat.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={16} className="text-[#FF6A3D]" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-[15px] font-medium text-[#0F172A] dark:text-white mb-1 group-hover:text-[#FF6A3D] transition-colors uppercase tracking-tight">{cat.name}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.count} Products</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-10 py-4 bg-[#FF6A3D] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/20 flex items-center gap-3 mx-auto">
            View Full Catalog <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function TopCategories() {
  const [expandedBrandIndex, setExpandedBrandIndex] = useState<number | null>(null);
  const handleCardClick = (index: number) => setExpandedBrandIndex(expandedBrandIndex === index ? null : index);

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-950 font-['Satoshi']">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FF6A3D]" />
              <p className="text-[#FF6A3D] text-[10px] font-bold uppercase tracking-[0.3em]">Industry Leaders</p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white font-normal uppercase tracking-tight">
              Our Top <span className="text-[#FF6A3D]">Partner Brands</span>
            </h2>
          </div>
          <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#FF6A3D] transition-colors pb-2">
            See All Brands <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandCards.map((card, index) => (
            <Fragment key={index}>
              {card.type === 'image' ? (
                <ImageCard card={card} index={index} onClick={() => handleCardClick(index)} isExpanded={expandedBrandIndex === index} />
              ) : (
                <InfoCard card={card} index={index} onClick={() => handleCardClick(index)} isExpanded={expandedBrandIndex === index} />
              )}
              <AnimatePresence>
                {expandedBrandIndex === index && (
                  <ExpandedCategories brand={card} />
                )}
              </AnimatePresence>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
