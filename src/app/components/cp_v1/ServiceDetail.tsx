import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  ArrowRight, 
  MapPin, 
  Star,
  ExternalLink,
  Users
} from 'lucide-react';
import { SERVICE_CATEGORIES, PROVIDERS } from './ServicesPage';

interface ServiceDetailProps {
  id: string | number | null;
  onNavigate: (page: any, id?: string) => void;
}

// --- MOCK PROJECT DATA ---
const PROJECTS = [
  {
    id: 'prj-1',
    title: 'Modern Residential Complex',
    provider: 'Elena Rodriguez',
    location: 'Barcelona, ES',
    image: 'https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prj-2',
    title: 'Corporate HQ Workspace',
    provider: 'Studio Nova',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1770200574989-a4cca2c70c00?auto=format&fit=crop&q=80&w=800'
  }
];

export const ServiceDetail = ({ id, onNavigate }: ServiceDetailProps) => {
  const [providerSearch, setProviderSearch] = useState('');
  
  const service = useMemo(() => {
    return SERVICE_CATEGORIES.find(s => s.id === id) || SERVICE_CATEGORIES[0];
  }, [id]);

  const subServices = useMemo(() => [
    { name: 'Residential Design', image: 'https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&q=80&w=400' },
    { name: 'Commercial Design', image: 'https://images.unsplash.com/photo-1770200574989-a4cca2c70c00?auto=format&fit=crop&q=80&w=400' },
    { name: 'Space Planning', image: 'https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?auto=format&fit=crop&q=80&w=400' },
    { name: 'Lighting Planning', image: 'https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&q=80&w=400' }
  ], []);

  // Filter providers that have this service name in their tags
  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(p => {
      const matchesCategory = p.tags.some(tag => tag.toLowerCase().includes(service.name.toLowerCase()));
      const matchesSearch = p.name.toLowerCase().includes(providerSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    }).slice(0, 4); // Grid of 4
  }, [service.name, providerSearch]);

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-[#0F172A] selection:bg-[#FF6A3D]/20">
      
      {/* SECTION 1: HERO SECTION (Service Identity) */}
      <section className="relative min-h-[480px] md:h-[520px] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.image} 
            className="w-full h-full object-cover" 
            alt={service.name} 
          />
          <div className="absolute inset-0 bg-[#0B1F33]/85 md:bg-[#0B1F33]/80" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 w-full flex flex-col items-start text-left">
          <button 
            onClick={() => onNavigate('services')}
            className="flex items-center text-white/60 hover:text-white transition-colors mb-8 md:mb-12 uppercase text-[10px] md:text-[11px] font-normal tracking-[0.3em] group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </button>
          
          <div className="max-w-[720px]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#FF6A3D] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
            >
              Service Category
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 uppercase tracking-tight leading-tight"
            >
              {service.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-[600px]"
            >
              {service.desc} Specialized professional solutions across every stage of your project lifecycle within the Material Library ecosystem.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <button 
                onClick={() => {
                  document.getElementById('featured-providers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-10 py-4 bg-[#FF6A3D] text-white rounded-md font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/10"
              >
                Browse Providers
              </button>
              
              <div className="flex items-center gap-4 border-l border-white/20 pl-0 sm:pl-8 border-none sm:border-l">
                <div className="flex -space-x-3">
                  {PROVIDERS.slice(0, 4).map((p, i) => (
                    <div key={i} className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-[#0B1F33] overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-[11px] font-normal uppercase tracking-widest">{service.count} Verified Providers</span>
                  <span className="text-white/40 text-[9px] uppercase tracking-widest">Available in ecosystem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* SECTION 2: SPECIALIZED SOLUTIONS SECTION (Sub-services) */}
        <section className="py-24 border-b border-[#F1F5F9]">
          <div className="mb-14">
            <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Specialized Solutions</h2>
            <p className="text-[#64748B] text-sm">Targeted expertise across all {service.name} specializations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subServices.map((sub, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="group cursor-pointer rounded-lg overflow-hidden border border-[#E2E8F0] hover:border-[#FF6A3D]/30 transition-all flex flex-col h-full bg-white"
                onClick={() => onNavigate('professional-directory')}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#F8FAFC]">
                  <img src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-[#0F172A] text-[13px] font-medium uppercase tracking-widest mb-4">{sub.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-widest">Explore niche</span>
                    <ArrowRight size={16} className="text-[#FF6A3D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SERVICE PROVIDERS SECTION (CRITICAL SECTION) */}
        {filteredProviders.length > 0 && (
          <section id="featured-providers" className="py-24 border-b border-[#F1F5F9]">
            <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-8">
              <div>
                <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Featured Providers</h2>
                <p className="text-[#64748B] text-sm font-normal">Expert partners for your {service.name} project requirements.</p>
              </div>
              
              <div className="relative w-full max-w-[400px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Search providers within this service..." 
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#FF6A3D] transition-all font-['Satoshi']"
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <AnimatePresence mode="popLayout">
                {filteredProviders.map((provider) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    key={provider.id}
                    className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-xl hover:border-[#FF6A3D]/20 transition-all cursor-pointer group flex flex-col"
                    onClick={() => onNavigate('professional-profile', provider.id)}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#F1F5F9] shrink-0">
                        <img src={provider.image} className="w-full h-full object-cover" alt={provider.name} />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-[15px] font-medium text-[#0F172A] truncate transition-colors group-hover:text-[#FF6A3D]">{provider.name}</h4>
                        <p className="text-[9px] font-medium text-[#64748B] uppercase tracking-[0.2em] truncate">{provider.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center text-xs text-[#64748B]">
                        <MapPin size={14} className="mr-2 text-[#94A3B8]" /> {provider.location}
                      </div>
                      <div className="flex items-center text-xs text-[#64748B]">
                        <Star size={14} className="mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> 
                        <span className="font-medium text-[#0F172A]">{provider.rating}</span>
                        <span className="mx-2 opacity-30">|</span>
                        <span>{provider.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-8 min-h-[56px]">
                      {provider.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#F8FAFC] text-[#64748B] text-[9px] font-medium border border-[#E2E8F0] uppercase tracking-widest rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-md text-[10px] font-medium uppercase tracking-[0.2em] group-hover:bg-[#FF6A3D] group-hover:text-white group-hover:border-[#FF6A3D] transition-all flex items-center justify-center gap-2">
                      View Profile
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => onNavigate('professional-directory')}
                className="px-12 py-4 bg-[#FF6A3D] text-white rounded-md font-medium uppercase tracking-[0.25em] text-[11px] hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/10"
              >
                Browse All Providers
              </button>
            </div>
          </section>
        )}

        {/* SECTION 4: RECENT PROJECTS SECTION (SUBTLE) */}
        <section className="py-24">
          <div className="mb-14">
            <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Recent Projects</h2>
            <p className="text-[#64748B] text-sm">Realized visions delivered by our ecosystem partners.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id} 
                className="group cursor-pointer bg-white"
                onClick={() => onNavigate('project-case-study', project.id)}
              >
                <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8 border border-[#E2E8F0]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-[#0F172A] mb-2 uppercase tracking-tight">{project.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-[#64748B]">
                      <span className="font-medium text-[#0F172A] uppercase text-[10px] tracking-widest">{project.provider}</span>
                      <span className="text-[#E2E8F0]">|</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#94A3B8]" /> {project.location}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 border border-[#E2E8F0] rounded-md text-[10px] font-medium uppercase tracking-widest hover:border-[#0F172A] transition-all flex items-center gap-2">
                    View Case Study <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
