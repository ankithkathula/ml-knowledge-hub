import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

const professionals = [
  {
    name: 'Vikram Singh',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?q=80&w=300'
  },
  {
    name: 'Ananya Mehta',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?q=80&w=300'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Engineer',
    image: 'https://images.unsplash.com/photo-1659353587484-a83a0ddf8aca?q=80&w=300'
  },
  {
    name: 'Studio Form',
    role: 'Studio',
    image: 'https://images.unsplash.com/photo-1765371513276-a74f1ecbcf7d?q=80&w=300'
  },
  {
    name: 'Mansi Rao',
    role: 'Consultant',
    image: 'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?q=80&w=300'
  }
];

export function ProfessionalsGrid({ onProfessionalClick }: { onProfessionalClick?: (name: string) => void }) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Satoshi',sans-serif] font-medium text-2xl text-gray-900 dark:text-white">
            Top Professionals
          </h2>
          <button className="text-sm font-medium text-gray-400 hover:text-[#FF6A3D] transition-colors flex items-center gap-1">
            Explore All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth">
          {professionals.map((prof, idx) => (
            <motion.div
              key={prof.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onProfessionalClick?.(prof.name)}
              className="flex-shrink-0 w-[180px] group cursor-pointer"
            >
              <div className="relative h-[220px] rounded-xl overflow-hidden mb-3">
                <ImageWithFallback
                  src={prof.image}
                  alt={prof.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-['Satoshi',sans-serif] font-medium text-sm text-gray-900 dark:text-white mb-0.5">
                {prof.name}
              </h3>
              <p className="text-gray-500 text-[11px] font-normal">{prof.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
