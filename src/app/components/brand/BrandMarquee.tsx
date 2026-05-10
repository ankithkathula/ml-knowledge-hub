import { motion } from 'motion/react';

const brands = [
  { name: 'ACC', logo: 'https://companieslogo.com/img/orig/ACC.NS-27c15243.png?t=1593960012' },
  { name: 'Tata Steel', logo: 'https://companieslogo.com/img/orig/TATASTEEL.NS-70335805.png?t=1593960012' },
  { name: 'JSW', logo: 'https://companieslogo.com/img/orig/JSWSTEEL.NS-2856f4d3.png?t=1593960012' },
  { name: 'Ultratech', logo: 'https://companieslogo.com/img/orig/ULTRACEMCO.NS-471277a0.png?t=1593960012' },
  { name: 'Saint-Gobain', logo: 'https://companieslogo.com/img/orig/SGO.PA-94578b87.png?t=1593960012' },
  { name: 'Asian Paints', logo: 'https://companieslogo.com/img/orig/ASIANPAINT.NS-51d08d98.png?t=1593960012' },
];

export function BrandMarquee() {
  return (
    <div className="bg-white dark:bg-gray-950 py-6 border-y border-gray-100 dark:border-gray-900 overflow-hidden relative">
      <div className="flex items-center">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-16 whitespace-nowrap"
        >
          {Array(4).fill(brands).flat().map((brand, i) => (
            <div 
              key={`${brand.name}-${i}`}
              className="grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-6 md:h-7 w-auto object-contain brightness-0 dark:invert" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
