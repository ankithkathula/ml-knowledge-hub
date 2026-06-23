import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

type Tab = 'studios' | 'designers' | 'freelancers';

interface Pro {
  name: string;
  role: string;
  location: string;
  image: string;
  slug: string;
}

const professionals: Record<Tab, Pro[]> = {
  studios: [
    { name: 'Khosla Associates', role: 'Architecture & Design', location: 'Bangalore', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300', slug: 'khosla-associates' },
    { name: 'Morphogenesis', role: 'Sustainable Architecture', location: 'New Delhi', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=300', slug: 'morphogenesis' },
    { name: 'Sanjay Puri Architects', role: 'Contemporary Design', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=300', slug: 'sanjay-puri-architects' },
    { name: 'Wallmakers', role: 'Experimental Design', location: 'Kochi', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=300', slug: 'wallmakers' },
  ],
  designers: [
    { name: 'Ananya Sharma', role: 'Interior Architect', location: 'Pune', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300', slug: 'ananya-sharma' },
    { name: 'Rahul Verma', role: 'Product Designer', location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', slug: 'rahul-verma' },
    { name: 'Sarah Joseph', role: 'Lighting Designer', location: 'Chennai', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300', slug: 'sarah-joseph' },
    { name: 'Vikram Malhotra', role: 'Landscape Designer', location: 'Chandigarh', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', slug: 'vikram-malhotra' },
  ],
  freelancers: [
    { name: 'David Miller', role: '3D Visualizer', location: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', slug: 'david-miller' },
    { name: 'Lisa Ray', role: 'Structural Consultant', location: 'Kolkata', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300', slug: 'lisa-ray' },
    { name: 'Mark Chen', role: 'MEP Engineer', location: 'Jaipur', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300', slug: 'mark-chen' },
    { name: 'Priya Das', role: 'Acoustic Specialist', location: 'Indore', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', slug: 'priya-das' },
  ]
};

function profilePath(tab: Tab, slug: string): string {
  if (tab === 'studios') return `/v1/studios/microsite/${slug}`;
  return `/v1/professionals/individual/${slug}`;
}

export function ProfessionalsSection({ onViewAll }: { onViewAll?: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('studios');

  return (
    <section className="py-12 px-6 max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="space-y-1.5">
          <h2 className="font-['Satoshi',sans-serif] font-medium uppercase text-[10px] md:text-[12px] text-gray-400 tracking-[0.2em]">
            Professionals
          </h2>
          <p className="text-[14px] md:text-[15px] text-gray-900 dark:text-white">Verified experts for your next project.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[11px] font-medium uppercase tracking-wide text-[#FF6A3D] hover:text-[#FF6A3D]/80 transition-colors cursor-pointer flex items-center gap-1.5 group"
        >
          <span>Explore All Professionals</span>
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

      <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit mb-6">
        {(['studios', 'designers', 'freelancers'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all cursor-pointer ${
              activeTab === tab 
                ? 'bg-[#FF6A3D] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x relative">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 min-w-full"
          >
            {professionals[activeTab].map((pro, idx) => (
              <Link
                key={`${activeTab}-${pro.slug}`}
                to={profilePath(activeTab, pro.slug)}
                className="flex-shrink-0 w-[240px] snap-start block"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-[#FF6A3D]/30 hover:shadow-md transition-all h-full"
                >
                  <div className="h-[180px] relative overflow-hidden">
                    <img src={pro.image} alt={pro.name} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">{pro.location}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-['Satoshi',sans-serif] font-medium text-[14px] text-gray-900 dark:text-white mb-0.5">{pro.name}</h4>
                    <p className="text-[11px] text-gray-500 font-normal">{pro.role}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}