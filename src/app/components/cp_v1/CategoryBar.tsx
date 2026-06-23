import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const categories = [
  'Flooring',
  'Lighting',
  'Sanitary',
  'Doors & Windows',
  'Wall Finishes',
  'Kitchen',
  'Hardware',
  'HVAC',
  'Electrical'
];

interface CategoryBarProps {
  onCategoryClick?: (category: string) => void;
  onViewAll?: () => void;
}

export function CategoryBar({ onCategoryClick, onViewAll }: CategoryBarProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-[60px] z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick?.(cat)}
              className="text-[12px] font-medium text-gray-500 dark:text-gray-400 hover:text-[#FF6A3D] dark:hover:text-[#FF6A3D] transition-colors whitespace-nowrap cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
        
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[12px] font-medium text-[#FF6A3D] hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer ml-4"
        >
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
