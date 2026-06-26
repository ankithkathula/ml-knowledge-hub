import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Droplet, 
  Lightbulb, 
  Square, 
  Hammer, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

interface SubCategory {
  name: string;
  children: string[];
}

interface Category {
  id: string;
  name: string;
  icon: any;
  image: string;
  subcategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: 'flooring',
    name: 'Flooring',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1767554261805-95185e9ecf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Tiles',
        children: ['Ceramic Tiles', 'Vitrified Tiles', 'Porcelain Tiles']
      },
      {
        name: 'Stone',
        children: ['Marble', 'Granite', 'Italian Marble', 'Sandstone']
      },
      {
        name: 'Wood',
        children: ['Hardwood', 'Engineered Wood']
      },
      {
        name: 'Vinyl & Laminates',
        children: ['Luxury Vinyl', 'Laminate Flooring', 'SPC Flooring']
      }
    ]
  },
  {
    id: 'sanitaryware',
    name: 'Sanitaryware',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1744828367881-97196efa6ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Toilets & WC',
        children: ['Wall Hung WC', 'One Piece WC', 'Smart Toilets']
      },
      {
        name: 'Basins',
        children: ['Countertop Basins', 'Wall Mounted', 'Pedestal Basins']
      },
      {
        name: 'Fittings',
        children: ['Flush Tanks', 'Concealed Systems']
      },
      {
        name: 'Accessories',
        children: ['Soap Dispensers', 'Towel Rails', 'Paper Holders']
      }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1763060722627-e06bfa20faaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Indoor Lighting',
        children: ['LED Downlights', 'Ceiling Panels', 'Track Lights']
      },
      {
        name: 'Outdoor Lighting',
        children: ['Street Lights', 'Garden Lights', 'Facade Wash Lights']
      },
      {
        name: 'Decorative',
        children: ['Pendant Lights', 'Wall Sconces']
      },
      {
        name: 'Commercial',
        children: ['High Bay Lights', 'Linear Fixtures', 'Panel Lights']
      }
    ]
  },
  {
    id: 'paints',
    name: 'Paints & Coatings',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1758199714795-e76f84a3910f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Interior Paints',
        children: ['Emulsion', 'Distemper', 'Matte Finish']
      },
      {
        name: 'Exterior Paints',
        children: ['Weatherproof', 'Texture Coats']
      },
      {
        name: 'Specialty',
        children: ['Anti-Bacterial', 'Waterproof Coatings', 'Primer']
      }
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1690522399419-63543099915a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Door Hardware',
        children: ['Hinges', 'Handles', 'Locks', 'Door Closers']
      },
      {
        name: 'Cabinet Hardware',
        children: ['Drawer Systems', 'Knobs']
      },
      {
        name: 'Architectural',
        children: ['Glass Fittings', 'Sliding Systems', 'Railings']
      }
    ]
  },
  {
    id: 'steel',
    name: 'Steel & Metals',
    icon: Square,
    image: 'https://images.unsplash.com/photo-1763926062529-1edf8664c366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    subcategories: [
      {
        name: 'Structural Steel',
        children: ['TMT Bars', 'Steel Beams']
      },
      {
        name: 'Sheets & Plates',
        children: ['MS Sheets', 'Galvanized Sheets', 'Color Coated']
      },
      {
        name: 'Profiles',
        children: ['Angles', 'Channels', 'I-Beams']
      }
    ]
  }
];

interface CategoryCardProps {
  category: Category;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoverHold, setIsHoverHold] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Icon = category.icon;

  const handleMouseEnter = () => {
    setIsExpanded(true);
    setHoverProgress(0);
    
    // Start progress animation
    const startTime = Date.now();
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 700) * 100, 100);
      setHoverProgress(progress);
      
      if (progress >= 100) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      }
    }, 16);
    
    // Trigger hover hold after 700ms
    hoverTimerRef.current = setTimeout(() => {
      setIsHoverHold(true);
    }, 700);
  };

  const handleMouseLeave = () => {
    // Clear timers
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    
    // Small grace period before resetting
    setTimeout(() => {
      setIsExpanded(false);
      setIsHoverHold(false);
      setHoverProgress(0);
    }, 100);
  };

  return (
    <motion.div
      className="relative flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        zIndex: isHoverHold ? 30 : isExpanded ? 20 : 1,
      }}
    >
      <motion.div
        className="relative cursor-pointer rounded-2xl overflow-hidden"
        animate={{
          width: isHoverHold ? '380px' : isExpanded ? '340px' : '260px',
          height: isHoverHold ? '320px' : isExpanded ? '260px' : '200px',
          y: isHoverHold ? -12 : isExpanded ? -6 : 0,
          scale: isHoverHold ? 1.04 : isExpanded ? 1.04 : 1,
        }}
        transition={{ 
          width: { duration: isHoverHold ? 0.28 : 0.24, ease: [0.22, 1, 0.36, 1] },
          height: { duration: isHoverHold ? 0.28 : 0.24, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
        }}
        style={{
          boxShadow: isHoverHold
            ? '0 24px 50px rgba(0, 0, 0, 0.38)'
            : isExpanded 
              ? '0 18px 40px rgba(0, 0, 0, 0.32)' 
              : '0 12px 30px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Front State - Image with gradient */}
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            style={{
              transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          
          {/* Dark Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 50%, transparent)',
              opacity: isExpanded ? 0 : 1,
              transition: 'opacity 200ms ease'
            }}
          />
          
          {/* Content - Default State */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2.5">
                <Icon className="w-5 h-5 text-[#FF6A3D]" />
                <h3 className="text-white font-semibold text-base">
                  {category.name}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Hover Progress Indicator */}
        {isExpanded && !isHoverHold && (
          <div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#FF6A3D] transition-all"
            style={{
              width: `${hoverProgress}%`,
              opacity: hoverProgress < 100 ? 0.4 : 0,
              transition: hoverProgress >= 100 ? 'opacity 200ms ease' : 'none'
            }}
          />
        )}

        {/* Expanded State - Information Panel */}
        <motion.div
          className="absolute inset-0 bg-[#0F172A] border border-white/10 p-5 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <Icon className="w-5 h-5 text-[#FF6A3D]" />
            <h3 className="text-white font-semibold text-[16px]">
              {category.name}
            </h3>
          </div>

          {/* 2-Column Grid Layout */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {category.subcategories.slice(0, isHoverHold ? 6 : 4).map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="text-[#D1D5DB] font-medium text-[13px] leading-tight">
                  {sub.name}
                </div>
                <div className="space-y-0.5">
                  {sub.children.slice(0, isHoverHold ? 4 : 3).map((child, childIdx) => (
                    <div
                      key={childIdx}
                      className="text-[#9CA3AF] text-[12px] leading-tight"
                    >
                      • {child}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Footer - Always visible */}
          <div 
            className="mt-auto pt-3 flex items-center gap-1.5 text-[#FF6A3D] text-[12px] font-medium transition-opacity duration-200 cursor-pointer"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              opacity: 0.9,
              marginTop: '12px'
            }}
          >
            <span className="hover:opacity-100 transition-opacity">
              {isHoverHold ? 'View All Categories' : 'Explore Category'}
            </span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function VisualCategoryExplorer() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate categories for seamless infinite scroll
  const allCategories = [...categories, ...categories];

  return (
    <div 
      className="w-full py-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-5"
        animate={{
          x: isPaused ? undefined : ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
        style={{
          width: 'fit-content',
        }}
      >
        {allCategories.map((category, index) => (
          <CategoryCard
            key={`${category.id}-${index}`}
            category={category}
            index={index % categories.length}
          />
        ))}
      </motion.div>
    </div>
  );
}