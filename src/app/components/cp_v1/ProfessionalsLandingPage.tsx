import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Award,
  Briefcase,
  Users
} from 'lucide-react';

// --- MOCK DATA ---

export const PROFESSIONAL_CATEGORIES = [
  { id: 'architects', name: 'Architects', desc: 'Licensed architects specializing in residential and commercial design.', count: 284, image: 'https://images.unsplash.com/photo-1772475385529-92037713a057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3NjIzNjk1NXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'interior-designers', name: 'Interior Designers', desc: 'Creative designers for residential and commercial interiors.', count: 412, image: 'https://images.unsplash.com/photo-1752650735511-b21192b66491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbmVyJTIwY29uc3VsdGF0aW9uJTIwbWVldGluZ3xlbnwxfHx8fDE3NzYyMzY5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'consultants', name: 'Project Consultants', desc: 'Expert guidance on project feasibility and execution.', count: 196, image: 'https://images.unsplash.com/photo-1768926968986-a88590ce5025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBjb25zdWx0YW50JTIwaGFyZGhhdCUyMHNpdGV8ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'engineers', name: 'Structural Engineers', desc: 'Licensed engineers for structural design and analysis.', count: 168, image: 'https://images.unsplash.com/photo-1582057811341-a22d524c6a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3QlMjBibHVlcHJpbnQlMjBkcmFmdGluZyUyMHRhYmxlfGVufDF8fHx8MTc3NjIzNjk1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'landscape', name: 'Landscape Architects', desc: 'Outdoor design and sustainable landscape planning.', count: 142, image: 'https://images.unsplash.com/photo-1760502431557-2976b538959b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwYXJjaGl0ZWN0dXJlJTIwc2t5bGluZXxlbnwxfHx8fDE3NzYyMzY5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'lighting', name: 'Lighting Designers', desc: 'Specialized lighting design for architecture and interiors.', count: 89, image: 'https://images.unsplash.com/photo-1772475385529-92037713a057?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc3NjIzNjk1NXww&ixlib=rb-4.1.0&q=80&w=1080' }
];

export const PROFESSIONALS = [
  { 
    id: 'prof1', 
    name: 'Sarah Mitchell', 
    type: 'Architects', 
    location: 'New York, NY', 
    rating: 4.9, 
    reviewCount: 127,
    experience: '15+ Years', 
    specializations: ['Residential', 'Commercial', 'Sustainable Design'],
    profileImage: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: true,
    projectsCompleted: 84,
    license: 'AIA Certified'
  },
  { 
    id: 'prof2', 
    name: 'David Chen', 
    type: 'Interior Designers', 
    location: 'San Francisco, CA', 
    rating: 4.8, 
    reviewCount: 98,
    experience: '12+ Years', 
    specializations: ['Modern', 'Minimalist', 'Hospitality'],
    profileImage: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwbWFufGVufDF8fHx8MTc3NjIzNjk1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: true,
    projectsCompleted: 56,
    license: 'NCIDQ Certified'
  },
  { 
    id: 'prof3', 
    name: 'Maya Rodriguez', 
    type: 'Project Consultants', 
    location: 'Miami, FL', 
    rating: 5.0, 
    reviewCount: 154,
    experience: '18+ Years', 
    specializations: ['Construction Management', 'Feasibility Studies'],
    profileImage: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: true,
    projectsCompleted: 112,
    license: 'PMP Certified'
  },
  { 
    id: 'prof4', 
    name: 'James Anderson', 
    type: 'Structural Engineers', 
    location: 'Chicago, IL', 
    rating: 4.7, 
    reviewCount: 89,
    experience: '20+ Years', 
    specializations: ['High-Rise', 'Seismic Design', 'Steel Structures'],
    profileImage: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwbWFufGVufDF8fHx8MTc3NjIzNjk1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: false,
    featured: false,
    projectsCompleted: 147,
    license: 'PE License'
  },
  { 
    id: 'prof5', 
    name: 'Emily Watson', 
    type: 'Landscape Architects', 
    location: 'Seattle, WA', 
    rating: 4.9, 
    reviewCount: 76,
    experience: '10+ Years', 
    specializations: ['Sustainable Landscapes', 'Urban Planning'],
    profileImage: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: false,
    projectsCompleted: 63,
    license: 'ASLA Certified'
  },
  { 
    id: 'prof6', 
    name: 'Alex Thompson', 
    type: 'Lighting Designers', 
    location: 'Los Angeles, CA', 
    rating: 4.8, 
    reviewCount: 64,
    experience: '8+ Years', 
    specializations: ['Architectural Lighting', 'Residential'],
    profileImage: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwbWFufGVufDF8fHx8MTc3NjIzNjk1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: false,
    projectsCompleted: 41,
    license: 'LC Certified'
  },
  { 
    id: 'prof7', 
    name: 'Rachel Kim', 
    type: 'Architects', 
    location: 'Boston, MA', 
    rating: 4.9, 
    reviewCount: 142,
    experience: '14+ Years', 
    specializations: ['Historic Restoration', 'Adaptive Reuse'],
    profileImage: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    featured: true,
    projectsCompleted: 92,
    license: 'AIA Certified'
  },
  { 
    id: 'prof8', 
    name: 'Michael Brown', 
    type: 'Interior Designers', 
    location: 'Austin, TX', 
    rating: 4.7, 
    reviewCount: 53,
    experience: '9+ Years', 
    specializations: ['Contemporary', 'Retail Design'],
    profileImage: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwbWFufGVufDF8fHx8MTc3NjIzNjk1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: false,
    featured: false,
    projectsCompleted: 38,
    license: 'ASID Member'
  }
];

// --- REUSABLE COMPONENTS ---

interface CategoryCardProps {
  category: typeof PROFESSIONAL_CATEGORIES[0];
  onClick: () => void;
}

const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(({ category, onClick }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden group cursor-pointer hover:border-[#FF6A3D]/40 transition-all duration-300 flex flex-col h-full"
    onClick={onClick}
  >
    <div className="aspect-[16/10] overflow-hidden bg-[#F9FAFB]">
      <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-sm font-medium text-[#0F172A] uppercase tracking-wider mb-2 font-['Satoshi']">{category.name}</h3>
      <p className="text-xs text-[#6B7280] mb-4 line-clamp-2 leading-relaxed">{category.desc}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest">{category.count} Professionals</span>
        <span className="text-[#FF6A3D] text-[10px] font-medium uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
          View All <ChevronRight size={12} />
        </span>
      </div>
    </div>
  </motion.div>
));

interface ProfessionalCardProps {
  professional: typeof PROFESSIONALS[0];
  onClick: () => void;
}

const ProfessionalCard = React.forwardRef<HTMLDivElement, ProfessionalCardProps>(({ professional, onClick }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white border border-[#E5E7EB] rounded-lg p-6 flex flex-col group cursor-pointer hover:border-[#0B1F33]/20 hover:shadow-xl transition-all duration-300"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#F3F4F6] shrink-0 relative">
        <img src={professional.profileImage} alt={professional.name} className="w-full h-full object-cover" />
        {professional.verified && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF6A3D] rounded-full flex items-center justify-center border-2 border-white">
            <CheckCircle2 size={12} className="text-white" />
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <h4 className="text-[15px] font-medium text-[#0F172A] truncate transition-colors">{professional.name}</h4>
        <p className="text-[9px] font-medium text-[#6B7280] uppercase tracking-widest truncate">{professional.type}</p>
      </div>
    </div>

    <div className="space-y-3 mb-6 flex-grow">
      <div className="flex items-center text-xs text-[#6B7280]">
        <MapPin size={14} className="mr-2 text-[#94A3B8]" /> {professional.location}
      </div>
      <div className="flex items-center text-xs text-[#6B7280]">
        <Star size={14} className="mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> 
        <span className="font-medium text-[#0F172A]">{professional.rating}</span>
        <span className="mx-2 opacity-30">|</span>
        <span>{professional.reviewCount} reviews</span>
      </div>
      <div className="flex items-center text-xs text-[#6B7280]">
        <Briefcase size={14} className="mr-2 text-[#94A3B8]" /> {professional.experience}
      </div>
    </div>

    <div className="flex flex-wrap gap-1.5 mb-8 min-h-[56px]">
      {professional.specializations.slice(0, 3).map(spec => (
        <span key={spec} className="px-2.5 py-1 bg-[#F8FAFC] text-[#6B7280] text-[9px] font-medium border border-[#E5E7EB] uppercase tracking-widest rounded-md">
          {spec}
        </span>
      ))}
    </div>

    <button className="w-full py-3 bg-white border border-[#E5E7EB] text-[#0F172A] rounded-md text-[10px] font-medium uppercase tracking-[0.2em] group-hover:bg-[#0B1F33] group-hover:text-white group-hover:border-[#0B1F33] transition-all flex items-center justify-center gap-2">
      View Profile
    </button>
  </motion.div>
));

// Featured Professional Card (larger)
const FeaturedProfessionalCard = React.forwardRef<HTMLDivElement, ProfessionalCardProps>(({ professional, onClick }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -6 }}
    className="bg-white border border-[#E5E7EB] rounded-xl p-8 flex flex-col group cursor-pointer hover:border-[#FF6A3D]/40 hover:shadow-2xl transition-all duration-300"
    onClick={onClick}
  >
    <div className="flex items-start gap-6 mb-8">
      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#F3F4F6] shrink-0 relative">
        <img src={professional.profileImage} alt={professional.name} className="w-full h-full object-cover" />
        {professional.verified && (
          <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#FF6A3D] rounded-full flex items-center justify-center border-2 border-white">
            <CheckCircle2 size={16} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-medium text-[#0F172A] truncate">{professional.name}</h3>
          {professional.verified && (
            <span className="px-2 py-0.5 bg-[#FF6A3D]/10 text-[#FF6A3D] text-[8px] font-medium uppercase tracking-widest rounded-md shrink-0 ml-2">
              Verified
            </span>
          )}
        </div>
        <p className="text-[10px] font-medium text-[#6B7280] uppercase tracking-widest mb-3">{professional.type}</p>
        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center">
            <Star size={14} className="mr-1 text-[#FF6A3D] fill-[#FF6A3D]" /> 
            <span className="font-medium text-[#0F172A]">{professional.rating}</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-[#94A3B8]" /> 
            <span>{professional.projectsCompleted} Projects</span>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center text-sm text-[#6B7280]">
        <MapPin size={16} className="mr-2 text-[#94A3B8]" /> {professional.location}
      </div>
      <div className="flex items-center text-sm text-[#6B7280]">
        <Award size={16} className="mr-2 text-[#94A3B8]" /> {professional.license}
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-8">
      {professional.specializations.map(spec => (
        <span key={spec} className="px-3 py-1.5 bg-[#F8FAFC] text-[#6B7280] text-[10px] font-medium border border-[#E5E7EB] uppercase tracking-widest rounded-md">
          {spec}
        </span>
      ))}
    </div>

    <button className="w-full py-3.5 bg-[#FF6A3D] text-white rounded-md text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#E55A2D] transition-all flex items-center justify-center gap-2">
      View Profile <ArrowRight size={14} />
    </button>
  </motion.div>
));

// --- MAIN PAGE ---

export const ProfessionalsLandingPage = ({ onNavigate }: { onNavigate: (page: any, id?: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState(false);

  const filterTabs = ['All', 'Architects', 'Interior Designers', 'Project Consultants', 'Structural Engineers', 'Landscape Architects', 'Lighting Designers'];
  const quickChips = ['Residential Design', 'Commercial Projects', 'Sustainable Architecture', 'Renovation', 'New Construction', 'Consulting'];

  const filteredProfessionals = useMemo(() => {
    return PROFESSIONALS.filter(p => {
      const matchesTab = activeTab === 'All' || p.type === activeTab;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLocation = !locationQuery || p.location.toLowerCase().includes(locationQuery.toLowerCase());
      return matchesTab && matchesSearch && matchesLocation;
    });
  }, [activeTab, searchQuery, locationQuery]);

  const featuredProfessionals = PROFESSIONALS.filter(p => p.featured);
  const verifiedProfessionals = PROFESSIONALS.filter(p => p.verified && !p.featured).slice(0, 4);

  const visibleCategories = expandedCategories ? PROFESSIONAL_CATEGORIES : PROFESSIONAL_CATEGORIES.slice(0, 6);

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-[#0F172A] selection:bg-[#FF6A3D]/20">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Professional Workspace" 
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
            <span className="text-white">Find Professionals</span> <br className="hidden sm:block" />
            <span className="text-[#FF6A3D]">Near You</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#94A3B8] text-[14px] md:text-base mb-10 max-w-[600px] font-normal"
          >
            Connect with verified architects, designers, consultants, and specialists across the Material Library ecosystem.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[640px] mb-8"
          >
            <div className="flex flex-col sm:flex-row bg-white rounded-xl sm:rounded-md overflow-hidden shadow-2xl">
              <div className="flex-1 flex items-center px-5 h-12 sm:h-[54px] border-b sm:border-b-0 sm:border-r border-[#E5E7EB]">
                <MapPin size={20} className="text-[#94A3B8] mr-3" />
                <input 
                  type="text" 
                  placeholder="City, State or ZIP" 
                  className="w-full bg-transparent border-none focus:outline-none text-[#0F172A] text-sm placeholder:text-[#94A3B8]"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-5 h-12 sm:h-[54px]">
                <Search size={20} className="text-[#94A3B8] mr-3" />
                <input 
                  type="text" 
                  placeholder="Search by name, specialty..." 
                  className="w-full bg-transparent border-none focus:outline-none text-[#0F172A] text-sm placeholder:text-[#94A3B8]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-[#FF6A3D] text-white px-10 h-12 sm:h-[54px] font-medium text-[10px] uppercase tracking-[0.25em] hover:bg-[#E55A2D] transition-colors">
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

      {/* SECTION 2: FEATURED PROFESSIONALS */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-14">
          <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Featured Professionals</h2>
          <p className="text-[#6B7280] text-sm font-normal">Top-rated and verified professionals in your area</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {featuredProfessionals.map(professional => (
              <FeaturedProfessionalCard 
                key={professional.id} 
                professional={professional} 
                onClick={() => onNavigate('professional-microsite', professional.id)} 
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3: EXPLORE BY CATEGORY */}
      <section className="py-24 bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-14">
            <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Explore by Category</h2>
            <p className="text-[#6B7280] text-sm font-normal">Browse professionals by their specialty</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map(category => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onClick={() => {
                    setActiveTab(category.name);
                    window.scrollTo({ top: document.getElementById('browse-section')?.offsetTop, behavior: 'smooth' });
                  }} 
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-start">
            <button 
              onClick={() => setExpandedCategories(!expandedCategories)}
              className="flex items-center gap-2 text-[#FF6A3D] text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all"
            >
              {expandedCategories ? 'Show Less' : 'View All Categories'} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: BROWSE ALL PROFESSIONALS */}
      <section id="browse-section" className="py-24 max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-xl font-normal text-[#0F172A] uppercase tracking-[0.25em] mb-4">Browse All Professionals</h2>
          
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
            {filteredProfessionals.map(professional => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional} 
                onClick={() => onNavigate('professional-microsite', professional.id)} 
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 5: VERIFIED BY US */}
      <section className="py-24 bg-gradient-to-br from-[#0B1F33] to-[#1E3A5F]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6A3D]/10 border border-[#FF6A3D]/30 rounded-full mb-6">
              <CheckCircle2 size={18} className="text-[#FF6A3D]" />
              <span className="text-[#FF6A3D] text-[10px] font-medium uppercase tracking-widest">Verified by Material Library</span>
            </div>
            <h2 className="text-3xl font-normal text-white uppercase tracking-[0.25em] mb-4">Trusted Professionals</h2>
            <p className="text-[#94A3B8] text-base font-normal max-w-[600px] mx-auto">
              All verified professionals have been thoroughly vetted for credentials, experience, and quality of work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {verifiedProfessionals.map(professional => (
              <motion.div 
                key={professional.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col group cursor-pointer hover:bg-white/10 hover:border-[#FF6A3D]/40 transition-all duration-300"
                onClick={() => onNavigate('professional-microsite', professional.id)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/20 shrink-0 relative">
                    <img src={professional.profileImage} alt={professional.name} className="w-full h-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF6A3D] rounded-full flex items-center justify-center border-2 border-[#0B1F33]">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[15px] font-medium text-white truncate">{professional.name}</h4>
                    <p className="text-[9px] font-medium text-[#94A3B8] uppercase tracking-widest truncate">{professional.type}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-xs text-[#94A3B8]">
                    <Star size={14} className="mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> 
                    <span className="font-medium text-white">{professional.rating}</span>
                    <span className="mx-2 opacity-30">|</span>
                    <span>{professional.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center text-xs text-[#94A3B8]">
                    <MapPin size={14} className="mr-2" /> {professional.location}
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 border border-white/20 text-white rounded-md text-[10px] font-medium uppercase tracking-[0.2em] group-hover:bg-[#FF6A3D] group-hover:border-[#FF6A3D] transition-all flex items-center justify-center gap-2">
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[#94A3B8] text-sm mb-6">
              Want to become a verified professional on Material Library?
            </p>
            <button className="px-10 py-4 bg-[#FF6A3D] text-white rounded-md text-[11px] font-medium uppercase tracking-[0.3em] hover:bg-[#E55A2D] transition-all inline-flex items-center gap-3">
              Apply for Verification <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
