import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---

export const SERVICE_CATEGORIES = [
  { id: 'interior-design', name: 'Interior Design', desc: 'Expert space planning and aesthetic refinement.', count: 142, image: 'https://images.unsplash.com/photo-1765766601432-edcdc9ae017d?auto=format&fit=crop&q=80&w=400' },
  { id: 'architecture', name: 'Architecture', desc: 'Structural design and planning for residential projects.', count: 86, image: 'https://images.unsplash.com/photo-1764983265127-8ec30a9c7b64?auto=format&fit=crop&q=80&w=400' },
  { id: 'consulting', name: 'Consulting', desc: 'Professional guidance on materials and feasibility.', count: 54, image: 'https://images.unsplash.com/photo-1686100510085-041504fa9528?auto=format&fit=crop&q=80&w=400' },
  { id: 'installation', name: 'Installation', desc: 'Precision fitting for architectural systems.', count: 110, image: 'https://images.unsplash.com/photo-1647790292957-c7f3b44b3973?auto=format&fit=crop&q=80&w=400' },
  { id: 'fabrication', name: 'Fabrication', desc: 'Custom manufacturing of architectural components.', count: 42, image: 'https://images.unsplash.com/photo-1762803841043-bee9f5691411?auto=format&fit=crop&q=80&w=400' },
  { id: 'lighting-design', name: 'Lighting Design', desc: 'Specialized schemes for atmosphere and safety.', count: 38, image: 'https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&q=80&w=400' },
  { id: 'project-management', name: 'Project Management', desc: 'End-to-end coordination of construction projects.', count: 65, image: 'https://images.unsplash.com/photo-1634133472760-e5c2bd346787?auto=format&fit=crop&q=80&w=400' },
  { id: 'landscape-design', name: 'Landscape Design', desc: 'Sustainable planning for outdoor environments.', count: 29, image: 'https://images.unsplash.com/photo-1761637823293-f96835ec5038?auto=format&fit=crop&q=80&w=400' },
  { id: 'visualization', name: 'Visualization', desc: 'High-fidelity 3D rendering and VR experiences.', count: 51, image: 'https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&q=80&w=400' },
  { id: 'acoustics', name: 'Acoustic Consulting', desc: 'Sound engineering for auditory experiences.', count: 22, image: 'https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?auto=format&fit=crop&q=80&w=400' },
  { id: 'structural', name: 'Structural Engineering', desc: 'Technical assessment and structural integrity design.', count: 47, image: 'https://images.unsplash.com/photo-1768126792497-9e2ef9239b2b?auto=format&fit=crop&q=80&w=400' },
  { id: 'sustainability', name: 'Sustainability', desc: 'ESG reporting and carbon footprint optimization.', count: 34, image: 'https://images.unsplash.com/photo-1762803841043-bee9f5691411?auto=format&fit=crop&q=80&w=400' }
];

export const PROVIDERS = [
  { id: 'p1', name: 'Elena Rodriguez', type: 'Architects', location: 'Barcelona, ES', rating: 4.9, experience: '12+ Years', tags: ['Architecture', 'Sustainable Design'], image: 'https://images.unsplash.com/photo-1754307943303-2fa2a935255e?auto=format&fit=crop&q=80&w=300', verified: true },
  { id: 'p2', name: 'Studio Nova', type: 'Studios', location: 'London, UK', rating: 4.8, experience: '8+ Years', tags: ['Interior Design', 'Retail'], image: 'https://images.unsplash.com/photo-1768126792497-9e2ef9239b2b?auto=format&fit=crop&q=80&w=300', verified: true },
  { id: 'p3', name: 'Marcus Chen', type: 'Freelancers', location: 'Singapore, SG', rating: 4.7, experience: '15+ Years', tags: ['Facade Design', 'BIM'], image: 'https://images.unsplash.com/photo-1634133472760-e5c2bd346787?auto=format&fit=crop&q=80&w=300', verified: false },
  { id: 'p4', name: 'Aria Thompson', type: 'Consultants', location: 'New York, US', rating: 5.0, experience: '20+ Years', tags: ['Materials', 'Project Management'], image: 'https://images.unsplash.com/photo-1770200574989-a4cca2c70c00?auto=format&fit=crop&q=80&w=300', verified: true },
  { id: 'p5', name: 'Structura Ltd', type: 'Service Companies', location: 'Berlin, DE', rating: 4.6, experience: '25+ Years', tags: ['Installation', 'Fabrication'], image: 'https://images.unsplash.com/photo-1758519288417-d359ac3c494d?auto=format&fit=crop&q=80&w=300', verified: true },
  { id: 'p6', name: 'Julian Vance', type: 'Interior Designers', location: 'Paris, FR', rating: 4.9, experience: '10+ Years', tags: ['Hospitality', 'Lighting Design'], image: 'https://images.unsplash.com/photo-1600880212319-7832e5ef859c?auto=format&fit=crop&q=80&w=300', verified: true },
  { id: 'p7', name: 'Zenith Design', type: 'Studios', location: 'Tokyo, JP', rating: 4.7, experience: '14+ Years', tags: ['Modernism', 'Acoustics'], image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', verified: false },
  { id: 'p8', name: 'Bloom & Timber', type: 'Service Companies', location: 'Stockholm, SE', rating: 4.8, experience: '18+ Years', tags: ['Woodwork', 'Sustainable'], image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300', verified: true }
];

// --- REUSABLE COMPONENTS ---

interface ServiceCardProps {
  service: typeof SERVICE_CATEGORIES[0];
  onClick: () => void;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(({ service, onClick }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden group cursor-pointer hover:border-[#FF6A3D]/40 transition-all duration-300 flex flex-col h-full"
    onClick={onClick}
  >
    <div className="aspect-[16/10] overflow-hidden bg-[#F9FAFB]">
      <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-sm font-medium text-[#0F172A] uppercase tracking-wider mb-2 font-['Satoshi']">{service.name}</h3>
      <p className="text-xs text-[#6B7280] mb-4 line-clamp-2 leading-relaxed">{service.desc}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest">{service.count} Providers</span>
        <span className="text-[#FF6A3D] text-[10px] font-medium uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
          View Providers <ChevronRight size={12} />
        </span>
      </div>
    </div>
  </motion.div>
));

interface ProviderCardProps {
  provider: typeof PROVIDERS[0];
  onClick: () => void;
}

const ProviderCard = React.forwardRef<HTMLDivElement, ProviderCardProps>(({ provider, onClick }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white border border-[#E5E7EB] rounded-lg p-6 flex flex-col group cursor-pointer hover:border-[#0B1F33]/20 hover:shadow-xl transition-all duration-300"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#F3F4F6] shrink-0">
        <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
      </div>
      <div className="overflow-hidden">
        <h4 className="text-[15px] font-medium text-[#0F172A] truncate transition-colors">{provider.name}</h4>
        <p className="text-[9px] font-medium text-[#6B7280] uppercase tracking-widest truncate">{provider.type}</p>
      </div>
    </div>

    <div className="space-y-3 mb-6 flex-grow">
      <div className="flex items-center text-xs text-[#6B7280]">
        <MapPin size={14} className="mr-2 text-[#94A3B8]" /> {provider.location}
      </div>
      <div className="flex items-center text-xs text-[#6B7280]">
        <Star size={14} className="mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> 
        <span className="font-medium text-[#0F172A]">{provider.rating}</span>
        <span className="mx-2 opacity-30">|</span>
        <span>{provider.experience}</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-1.5 mb-8 min-h-[56px]">
      {provider.tags.slice(0, 3).map(tag => (
        <span key={tag} className="px-2.5 py-1 bg-[#F8FAFC] text-[#6B7280] text-[9px] font-medium border border-[#E5E7EB] uppercase tracking-widest rounded-md">
          {tag}
        </span>
      ))}
    </div>

    <button className="w-full py-3 bg-white border border-[#E5E7EB] text-[#0F172A] rounded-md text-[10px] font-medium uppercase tracking-[0.2em] group-hover:bg-[#0B1F33] group-hover:text-white group-hover:border-[#0B1F33] transition-all flex items-center justify-center gap-2">
      View Profile
    </button>
  </motion.div>
));

// --- MAIN PAGE ---

export const ServicesPage = ({ onNavigate }: { onNavigate: (page: any, id?: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [expandedServices, setExpandedServices] = useState(false);

  const filterTabs = ['All', 'Architects', 'Interior Designers', 'Studios', 'Freelancers', 'Consultants', 'Service Companies'];
  const quickChips = ['Interior Design', 'Architecture', 'Consulting', 'Installation', 'Fabrication', 'Lighting Design'];

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(p => {
      const matchesTab = activeTab === 'All' || p.type === activeTab;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const visibleServices = expandedServices ? SERVICE_CATEGORIES : SERVICE_CATEGORIES.slice(0, 8);

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-[#0F172A] selection:bg-[#FF6A3D]/20">
      
      {/* SECTION 1: HERO BANNER (DARK, CENTER-ALIGNED) */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Architecture Workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/60 to-black/85" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[28px] sm:text-4xl md:text-5xl font-normal tracking-tight mb-6 uppercase font-['Satoshi'] leading-tight"
          >
            <span className="text-white">Find Professional</span> <br className="hidden sm:block" />
            <span className="text-[#FF6A3D]">Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#94A3B8] text-[14px] md:text-base mb-10 max-w-[600px] font-normal"
          >
            Discover architects, designers, studios, consultants, and service providers across the Material Library ecosystem.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[640px] mb-8"
          >
            <div className="flex flex-col sm:flex-row bg-white rounded-xl sm:rounded-md overflow-hidden h-auto sm:h-[54px] shadow-2xl p-1 sm:p-0">
              <div className="flex-1 flex items-center px-5 h-12 sm:h-full">
                <Search size={20} className="text-[#94A3B8] mr-3" />
                <input 
                  type="text" 
                  placeholder="Search services, professionals..." 
                  className="w-full bg-transparent border-none focus:outline-none text-[#0F172A] text-sm placeholder:text-[#94A3B8]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-[#FF6A3D] text-white px-10 h-12 sm:h-full font-medium text-[10px] uppercase tracking-[0.25em] hover:bg-[#E55A2D] transition-colors rounded-lg sm:rounded-none">
                Search
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-3 w-full overflow-x-auto no-scrollbar pb-2"
          >
            {quickChips.map((chip) => (
              <button 
                key={chip}
                onClick={() => setSearchQuery(chip)}
                className="px-4 py-1.5 border border-white/20 rounded-full text-[9px] font-medium text-white/80 uppercase tracking-widest hover:bg-[#FF6A3D] hover:border-[#FF6A3D] hover:text-white transition-all whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: EXPLORE SERVICES */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Explore Services</h2>
          <p className="text-[#6B7280] text-sm font-normal">Browse services across the Material Library ecosystem</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {visibleServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onClick={() => onNavigate('service-detail', service.id)} 
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-start">
          <button 
            onClick={() => setExpandedServices(!expandedServices)}
            className="flex items-center gap-2 text-[#FF6A3D] text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all"
          >
            {expandedServices ? 'Show Less' : 'View All Services'} <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* SECTION 3: BROWSE SERVICE PROVIDERS */}
      <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Browse Service Providers</h2>
            
            <div className="flex items-center gap-2 mt-10 overflow-x-auto no-scrollbar pb-2">
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-widest whitespace-nowrap transition-all border ${
                    activeTab === tab 
                      ? 'bg-[#0B1F33] text-white border-[#0B1F33]' 
                      : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0B1F33] hover:text-[#0B1F33]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredProviders.map(provider => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  onClick={() => onNavigate('professional-profile', provider.id)} 
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => onNavigate('professional-directory')}
              className="px-16 py-4.5 bg-[#FF6A3D] text-white rounded-md text-[11px] font-medium uppercase tracking-[0.3em] hover:bg-[#E55A2D] transition-all flex items-center gap-3 shadow-xl shadow-[#FF6A3D]/10"
            >
              Browse All Professionals
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
