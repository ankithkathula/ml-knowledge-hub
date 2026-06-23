import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, ShieldCheck, ChevronRight, SlidersHorizontal, ArrowLeft, Users } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MainFooter } from './MainFooter';
import { STUDIOS } from './servicesData';

interface StudioDirectoryProps {
  onNavigate: (page: any, id?: string | number) => void;
}

export function StudioDirectory({ onNavigate }: StudioDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = STUDIOS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <button 
          onClick={() => onNavigate('services')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[12px] font-medium uppercase tracking-widest">Back to Services</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-normal uppercase tracking-[0.12em] text-gray-900 dark:text-white mb-4">
              Design <span className="text-[#FF6A3D]">Studios</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Partner with world-class architecture and interior design firms.
            </p>
          </div>
          
          <div className="w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search studios or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[14px] focus:border-[#FF6A3D]/40 outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(studio => (
            <StudioCard key={studio.id} studio={studio} onClick={() => onNavigate('studio-profile', studio.id)} />
          ))}
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

function StudioCard({ studio, onClick }: { studio: typeof STUDIOS[0], onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback 
          src={studio.cover_image} 
          alt={studio.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white p-1 shadow-lg overflow-hidden border border-white/20">
            <ImageWithFallback src={studio.logo} alt={studio.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <h3 className="text-xl font-normal text-white uppercase tracking-wider">{studio.name}</h3>
            <div className="flex items-center gap-2 text-white/70 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>{studio.location}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6">
          {studio.verified && (
            <div className="bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-[9px] font-medium uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-[#FF6A3D]/20">
              <ShieldCheck className="w-3 h-3" /> Verified Studio
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {studio.services.slice(0, 3).map(service => (
            <span key={service} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider rounded-lg border border-gray-100 dark:border-gray-700">
              {service}
            </span>
          ))}
        </div>

        <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {studio.about}
        </p>

        <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-widest">{studio.team_size} Experts</span>
          </div>
          <button className="h-10 px-6 bg-[#0B1220] hover:bg-[#1a253a] text-white rounded-xl text-[10px] font-medium uppercase tracking-widest transition-all shadow-lg shadow-black/10">
            Explore Studio
          </button>
        </div>
      </div>
    </motion.div>
  );
}
