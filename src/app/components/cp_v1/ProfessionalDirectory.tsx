import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  Filter, 
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { PROVIDERS, SERVICE_CATEGORIES } from './ServicesPage';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedExp: string;
  setSelectedExp: (exp: string) => void;
}

const FilterSidebar = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedType, 
  setSelectedType, 
  selectedExp, 
  setSelectedExp 
}: FilterSidebarProps) => {
  const providerTypes = ['All', 'Architects', 'Interior Designers', 'Studios', 'Freelancers', 'Consultants', 'Service Companies'];
  const expLevels = ['All', '1-5 Years', '5-10 Years', '10+ Years'];

  return (
    <div className="space-y-8 py-2">
      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.2em]">Service Category</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`block w-full text-left text-[13px] px-3 py-2 rounded-md transition-colors ${selectedCategory === 'All' ? 'bg-[#0B1F33] text-white' : 'text-[#6B7280] hover:bg-[#F8FAFC]'}`}
          >
            All Categories
          </button>
          {SERVICE_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`block w-full text-left text-[13px] px-3 py-2 rounded-md transition-colors ${selectedCategory === cat.name ? 'bg-[#0B1F33] text-white' : 'text-[#6B7280] hover:bg-[#F8FAFC]'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.2em]">Provider Type</h3>
        <div className="space-y-2">
          {providerTypes.map(type => (
            <button 
              key={type}
              onClick={() => setSelectedType(type)}
              className={`block w-full text-left text-[13px] px-3 py-2 rounded-md transition-colors ${selectedType === type ? 'bg-[#0B1F33] text-white' : 'text-[#6B7280] hover:bg-[#F8FAFC]'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.2em]">Experience</h3>
        <div className="space-y-2">
          {expLevels.map(level => (
            <button 
              key={level}
              onClick={() => setSelectedExp(level)}
              className={`block w-full text-left text-[13px] px-3 py-2 rounded-md transition-colors ${selectedExp === level ? 'bg-[#0B1F33] text-white' : 'text-[#6B7280] hover:bg-[#F8FAFC]'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProfessionalDirectory = ({ onNavigate }: { onNavigate: (page: any, id?: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');
  const [sortBy, setSortBy] = useState('Rating');

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || p.tags.includes(selectedCategory);
      const matchesType = selectedType === 'All' || p.type === selectedType;
      
      let matchesExp = true;
      if (selectedExp !== 'All') {
        const years = parseInt(p.experience);
        if (selectedExp === '1-5 Years') matchesExp = years >= 1 && years <= 5;
        if (selectedExp === '5-10 Years') matchesExp = years > 5 && years <= 10;
        if (selectedExp === '10+ Years') matchesExp = years > 10;
      }

      return matchesSearch && matchesCategory && matchesType && matchesExp;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedExp]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedExp('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] pt-24 pb-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="mb-8 md:mb-12">
          <button 
            onClick={() => onNavigate('services')}
            className="flex items-center text-[#6B7280] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 hover:text-[#0B1F33] transition-colors group"
          >
            <ChevronRight className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" size={14} /> Back to Services
          </button>
          <h1 className="text-2xl md:text-3xl font-normal text-[#0F172A] uppercase tracking-tight mb-4 leading-tight">Professional Directory</h1>
          <p className="text-[#6B7280] text-sm max-w-[600px] leading-relaxed">Browse and filter verified professionals across the Material Library ecosystem.</p>
        </div>

        {/* Mobile Filter Trigger */}
        <div className="md:hidden flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">Directory</span>
            <span className="text-xs text-gray-400">({filteredProviders.length})</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6A3D] text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                <Filter size={14} /> Filter
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl border-none">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-bold uppercase tracking-widest text-left">Filter Professionals</SheetTitle>
                <SheetDescription className="sr-only">
                  Use the filters below to find professionals by category, type, and experience.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-y-auto h-full pb-20">
                <FilterSidebar 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedExp={selectedExp}
                  setSelectedExp={setSelectedExp}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Sidebar Filters - Desktop Only */}
          <aside className="hidden md:block col-span-3">
            <div className="sticky top-28 bg-white border border-[#E5E7EB] rounded-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-[0.2em] hover:underline"
                >
                  Reset
                </button>
              </div>
              <FilterSidebar 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedExp={selectedExp}
                setSelectedExp={setSelectedExp}
              />
            </div>
          </aside>

          {/* Listing Content */}
          <div className="md:col-span-9 space-y-8">
            {/* Top Bar - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 md:p-5 gap-4">
              <div className="relative w-full sm:w-[400px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Search professionals, studios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-md pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-[#0B1F33] transition-colors font-['Satoshi']"
                />
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <span className="text-[10px] md:text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em]">Sort By</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-md text-sm font-bold text-[#0F172A]">
                    {sortBy} <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                    {['Rating', 'Experience', 'Name'].map(option => (
                      <button 
                        key={option}
                        onClick={() => setSortBy(option)}
                        className="block w-full text-left px-5 py-3 text-sm hover:bg-[#F9FAFB] transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProviders.map(provider => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    key={provider.id}
                    className="bg-white border border-[#E5E7EB] rounded-lg p-6 hover:shadow-xl hover:border-[#0B1F33]/20 transition-all group cursor-pointer"
                    onClick={() => onNavigate('professional-profile', provider.id)}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#E5E7EB]">
                        <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-[15px] font-bold text-[#0F172A] truncate transition-colors group-hover:text-[#FF6A3D]">{provider.name}</h4>
                        <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-[0.2em] truncate">{provider.type}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-xs text-[#6B7280]">
                        <MapPin size={14} className="mr-2 text-[#94A3B8]" /> {provider.location}
                      </div>
                      <div className="flex items-center text-xs text-[#6B7280]">
                        <Star size={14} className="mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> 
                        <span className="font-bold text-[#0F172A]">{provider.rating}</span>
                        <span className="mx-2 opacity-30">|</span>
                        <span>{provider.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-8 min-h-[56px]">
                      {provider.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-[#F9FAFB] text-[#6B7280] text-[9px] font-bold border border-[#E5E7EB] uppercase tracking-widest rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-white border border-[#E5E7EB] text-[#0F172A] rounded-md text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#0B1F33] group-hover:text-white group-hover:border-[#0B1F33] transition-all flex items-center justify-center gap-2">
                      View Profile
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-24 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <p className="text-[#6B7280] mb-4 text-sm font-bold">No professionals found matching your criteria.</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-[#FF6A3D] font-bold text-[11px] uppercase tracking-widest hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredProviders.length > 0 && (
              <div className="pt-12 flex justify-center">
                <button className="px-10 py-4 border border-[#E5E7EB] text-[#0F172A] rounded-md text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#0B1F33] transition-all">
                  Load More Professionals
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
