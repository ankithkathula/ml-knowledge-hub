import { motion } from 'motion/react';

const services = [
  {
    title: 'Architecture',
    desc: 'Bespoke structural design and master planning.',
    image: 'https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  },
  {
    title: 'Interior Design',
    desc: 'Curated aesthetic environments for living.',
    image: 'https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  },
  {
    title: 'Installation',
    desc: 'Professional assembly and fitting services.',
    image: 'https://images.unsplash.com/photo-1763665814538-8ba04597286c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  },
  {
    title: 'Fabrication',
    desc: 'Custom material crafting and engineering.',
    image: 'https://images.unsplash.com/photo-1764114235891-66ff86abaf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  },
  {
    title: 'Consulting',
    desc: 'Expert technical advice and sustainability.',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  }
];

export function ServicesSection({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <section className="py-16 px-4 md:px-6 max-w-[1400px] mx-auto">
      {/* Improved Header Spacing */}
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1.5">
          <h2 className="font-['Satoshi',sans-serif] font-medium uppercase text-[10px] md:text-[12px] text-gray-400 tracking-[0.2em]">
            Services
          </h2>
          <p className="text-[14px] md:text-[15px] text-gray-900 dark:text-white">Professional support for every project stage.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[11px] font-medium uppercase tracking-wide text-[#FF6A3D] hover:text-[#FF6A3D]/80 transition-colors cursor-pointer flex items-center gap-1.5 group"
        >
          <span>Explore All Services</span>
          <svg 
            className="w-3 h-3 transition-transform group-hover:translate-x-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 5-Column Grid with Better Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-7">
        {services.map((service) => (
          <motion.div
            key={service.title}
            whileHover={{ y: -6 }}
            className="group cursor-pointer"
            onClick={onViewAll}
          >
            {/* Card with Subtle Shadow and Hover Elevation */}
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden relative bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-['Satoshi',sans-serif] font-medium text-[15px] text-gray-900 dark:text-white mb-1.5">
                  {service.title}
                </h3>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-1">
                  {service.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}