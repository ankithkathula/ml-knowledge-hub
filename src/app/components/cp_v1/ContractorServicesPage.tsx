import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  TrendingUp,
  X,
  Paintbrush,
  Droplet,
  Zap,
  Hammer,
  Sparkles,
  Grid3x3,
  Wind,
  Home
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- MOCK DATA ---

export const CONTRACTOR_SERVICES = [
  { 
    id: 'painting', 
    name: 'Painting', 
    icon: Paintbrush, 
    count: 1240,
    color: 'from-orange-50 to-orange-100'
  },
  { 
    id: 'plumbing', 
    name: 'Plumbing', 
    icon: Droplet, 
    count: 980,
    color: 'from-blue-50 to-blue-100'
  },
  { 
    id: 'electrical', 
    name: 'Electrical', 
    icon: Zap, 
    count: 1156,
    color: 'from-yellow-50 to-yellow-100'
  },
  { 
    id: 'carpentry', 
    name: 'Carpentry', 
    icon: Hammer, 
    count: 876,
    color: 'from-amber-50 to-amber-100'
  },
  { 
    id: 'waterproofing', 
    name: 'Waterproofing', 
    icon: Shield, 
    count: 542,
    color: 'from-cyan-50 to-cyan-100'
  },
  { 
    id: 'tiling', 
    name: 'Tiling', 
    icon: Grid3x3, 
    count: 1089,
    color: 'from-slate-50 to-slate-100'
  },
  { 
    id: 'hvac', 
    name: 'HVAC', 
    icon: Wind, 
    count: 423,
    color: 'from-sky-50 to-sky-100'
  },
  { 
    id: 'renovation', 
    name: 'Renovation', 
    icon: Home, 
    count: 1567,
    color: 'from-purple-50 to-purple-100'
  }
];

export const CONTRACTOR_FIRMS = [
  {
    id: 1,
    name: 'BuildPro Construction',
    type: 'General Contractors',
    tagline: 'Turnkey Interiors • Civil Works',
    services: ['Renovation', 'Electrical'],
    rating: 4.9,
    reviews: 234,
    projectsCompleted: 324,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: true
  },
  {
    id: 2,
    name: 'Elite Finishing Solutions',
    type: 'Specialty Contractors',
    tagline: 'Premium Painting • Waterproofing',
    services: ['Painting', 'Waterproofing'],
    rating: 4.8,
    reviews: 456,
    projectsCompleted: 567,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: true
  },
  {
    id: 3,
    name: 'Precision Electricals',
    type: 'Trade Contractors',
    tagline: 'Commercial • Residential Wiring',
    services: ['Electrical', 'HVAC'],
    rating: 5.0,
    reviews: 189,
    projectsCompleted: 189,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: true
  },
  {
    id: 4,
    name: 'Master Carpenters Co.',
    type: 'General Contractors',
    tagline: 'Custom Woodwork • Modular Kitchens',
    services: ['Carpentry', 'Renovation'],
    rating: 4.7,
    reviews: 312,
    projectsCompleted: 412,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1617047209531-3e6a1e4f9d9f?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: true
  },
  {
    id: 5,
    name: 'AquaShield Experts',
    type: 'Specialty Contractors',
    tagline: 'Leak-Free Guarantee',
    services: ['Waterproofing', 'Tiling'],
    rating: 4.9,
    reviews: 278,
    projectsCompleted: 278,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: false
  },
  {
    id: 6,
    name: 'TileArt Studios',
    type: 'Material Suppliers',
    tagline: 'Designer Tiles Installation',
    services: ['Tiling', 'Renovation'],
    rating: 4.6,
    reviews: 234,
    projectsCompleted: 345,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: false
  },
  {
    id: 7,
    name: 'UrbanBuild Testing Labs',
    type: 'Testing Labs',
    tagline: 'Quality Assurance',
    services: ['Testing', 'Inspection'],
    rating: 4.8,
    reviews: 156,
    projectsCompleted: 523,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: false
  },
  {
    id: 8,
    name: 'ProTech HVAC Systems',
    type: 'Trade Contractors',
    tagline: 'Climate Control Experts',
    services: ['HVAC', 'Ventilation'],
    rating: 4.9,
    reviews: 267,
    projectsCompleted: 398,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1631545806608-bc87d60b9fdb?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trending: false
  }
];

const CONTRACTOR_TYPES = ['All', 'General Contractors', 'Specialty Contractors', 'Trade Contractors', 'Material Suppliers', 'Testing Labs'];

const TRUST_INDICATORS = [
  { icon: Shield, text: 'Verified Firms', subtext: 'Background-checked' },
  { icon: Award, text: 'Free Quotes', subtext: 'No commitment' },
  { icon: Sparkles, text: 'Quality Guarantee', subtext: 'Workmanship warranty' },
  { icon: Clock, text: 'Fast Response', subtext: 'Under 24 hours' }
];

const HOW_IT_WORKS = [
  { step: 1, title: 'Tell us your need', desc: 'Share your project details' },
  { step: 2, title: 'Get matched in minutes', desc: 'Connect with verified firms' },
  { step: 3, title: 'Compare quotes', desc: 'Review and select the best' },
  { step: 4, title: 'Hire confidently', desc: 'Start with quality assurance' }
];

// --- MAIN COMPONENT ---

export function ContractorServicesPage({ 
  onServiceClick,
  onFirmClick,
  onContractorClick,
  onViewAllContractors
}: { 
  onServiceClick?: (serviceId: string) => void;
  onFirmClick?: (firmId: number) => void;
  onContractorClick?: (contractorId: number) => void;
  onViewAllContractors?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [location, setLocation] = useState('Mumbai');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedContractorTypes, setSelectedContractorTypes] = useState<string[]>(['All']);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(s => s !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const toggleContractorType = (type: string) => {
    if (type === 'All') {
      setSelectedContractorTypes(['All']);
    } else {
      setSelectedContractorTypes(prev => {
        const withoutAll = prev.filter(t => t !== 'All');
        if (withoutAll.includes(type)) {
          const newTypes = withoutAll.filter(t => t !== type);
          return newTypes.length === 0 ? ['All'] : newTypes;
        } else {
          return [...withoutAll, type];
        }
      });
    }
  };

  const trendingFirms = useMemo(() => 
    CONTRACTOR_FIRMS.filter(f => f.trending && f.location === location),
    [location]
  );

  const filteredContractors = useMemo(() => {
    const isAll = selectedContractorTypes.includes('All');
    return CONTRACTOR_FIRMS.filter(f => 
      f.location === location && (isAll || selectedContractorTypes.includes(f.type))
    );
  }, [location, selectedContractorTypes]);

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif] pt-16 md:pt-20 lg:pt-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[450px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000"
            alt="Construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 md:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[28px] md:text-[36px] lg:text-[42px] font-normal text-white mb-4 md:mb-6 uppercase tracking-tight leading-[1.1]"
          >
            FIND TRUSTED CONTRACTOR FIRMS FOR EVERY SERVICE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] md:text-[18px] text-white/90 mb-8 md:mb-12 max-w-[700px] mx-auto leading-relaxed"
          >
            Discover verified contractor firms for construction, renovation, and finishing — compare expertise and get free quotes.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative max-w-[700px] mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input 
                type="text"
                placeholder="Search services, contractor firms, or tasks…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[64px] pl-16 pr-40 bg-white rounded-2xl text-[16px] outline-none shadow-2xl"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[52px] px-8 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all">
                Find Contractors
              </button>
            </div>
          </motion.div>

          {/* Quick Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            {CONTRACTOR_SERVICES.slice(0, 6).map(service => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`h-9 px-4 rounded-full text-[12px] font-medium transition-all ${
                  selectedServices.includes(service.id)
                    ? 'bg-[#FF6A3D] text-white border-2 border-[#FF6A3D]'
                    : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20'
                }`}
              >
                {service.name}
              </button>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-white/80 text-[14px]"
          >
            <MapPin size={16} />
            <span>Showing results for <strong className="text-white">{location}</strong></span>
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[#FF6A3D] font-bold hover:underline ml-1"
            >
              Change
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS */}
      <section className="py-8 border-y border-gray-100 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TRUST_INDICATORS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="size-12 mb-3 bg-[#FFF3EF] rounded-full flex items-center justify-center">
                  <item.icon size={20} className="text-[#FF6A3D]" />
                </div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">{item.text}</h3>
                <p className="text-[11px] text-gray-500">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 uppercase tracking-tight">
              Popular Services
            </h2>
            <button className="hidden md:flex items-center gap-2 text-[13px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </button>
          </div>

          {/* Single horizontal row - EXACTLY 8 cards */}
          <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
            <div className="flex gap-6 px-4 md:px-0 min-w-max md:grid md:grid-cols-8 md:min-w-0">
              {CONTRACTOR_SERVICES.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onServiceClick?.(service.id)}
                    className="group cursor-pointer flex-shrink-0 w-[120px] md:w-auto"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`size-20 md:size-24 mb-4 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center border-2 border-gray-200 group-hover:border-[#FF6A3D] transition-all group-hover:shadow-lg`}>
                        <Icon size={28} className="text-gray-600 group-hover:text-[#FF6A3D] transition-colors" />
                      </div>
                      <h3 className="text-[13px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        {service.count}+ firms
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRENDING NEAR YOU */}
      {trendingFirms.length >= 4 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-start justify-between mb-6">
              {/* LEFT - Title + Location */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 uppercase tracking-tight">
                    Trending Near You
                  </h2>
                  <button 
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 hover:border-[#FF6A3D]/50 transition-all"
                  >
                    <MapPin size={14} className="text-gray-400" />
                    <span>{location}</span>
                  </button>
                </div>
                <p className="text-[13px] text-gray-600">
                  Most booked firms this week in your area
                </p>
              </div>

              {/* RIGHT - View All */}
              <button 
                onClick={onViewAllContractors}
                className="hidden md:flex items-center gap-2 text-[13px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-3 transition-all mt-1"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            {/* EXACTLY 4 cards visible */}
            <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
              <div className="flex gap-6 px-4 md:px-0 min-w-max md:grid md:grid-cols-4 md:min-w-0">
                {trendingFirms.slice(0, 4).map((firm, idx) => (
                  <motion.div
                    key={firm.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onContractorClick?.(firm.id)}
                    className="w-[280px] md:w-auto bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
                  >
                    <div className="h-[120px] relative overflow-hidden">
                      <ImageWithFallback 
                        src={firm.banner}
                        alt={firm.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {firm.verified && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 h-6 px-2.5 bg-white/95 backdrop-blur-sm rounded-full">
                          <CheckCircle2 size={10} className="text-[#FF6A3D]" />
                          <span className="text-[9px] font-bold text-gray-900">VERIFIED</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                        {firm.name}
                      </h3>
                      <p className="text-[11px] text-gray-600 mb-3">
                        {firm.type}
                      </p>

                      <div className="flex items-center gap-2 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                          <span className="font-bold text-gray-900">{firm.rating}</span>
                        </div>
                        <span className="text-gray-500">({firm.reviews})</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. VERIFIED CONTRACTORS NEAR YOU */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-start justify-between mb-6">
            {/* LEFT - Title + Location */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 uppercase tracking-tight">
                  Verified Contractors Near You
                </h2>
                <button 
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center gap-1.5 h-8 px-3 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 hover:border-[#FF6A3D]/50 transition-all"
                >
                  <MapPin size={14} className="text-gray-400" />
                  <span>{location}</span>
                </button>
              </div>
              <p className="text-[13px] text-gray-600">
                Browse by contractor type and find the right fit
              </p>
            </div>

            {/* RIGHT - View All */}
            <button className="hidden md:flex items-center gap-2 text-[13px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-3 transition-all mt-1">
              View All <ArrowRight size={16} />
            </button>
          </div>

          {/* Contractor Type Pills */}
          <div className="overflow-x-auto pb-4 -mx-4 md:mx-0 mb-8">
            <div className="flex gap-3 px-4 md:px-0 min-w-max">
              {CONTRACTOR_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => toggleContractorType(type)}
                  className={`h-10 px-5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedContractorTypes.includes(type) || (type === 'All' && selectedContractorTypes.includes('All'))
                      ? 'bg-[#FF6A3D] text-white border-2 border-[#FF6A3D]'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* EXACTLY 4 cards visible */}
          <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
            <div className="flex gap-6 px-4 md:px-0 min-w-max md:grid md:grid-cols-4 md:min-w-0">
              {filteredContractors.slice(0, 4).map((firm, idx) => (
                <motion.div
                  key={firm.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onContractorClick?.(firm.id)}
                  className="w-[280px] md:w-auto bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="h-[120px] relative overflow-hidden">
                    <ImageWithFallback 
                      src={firm.banner}
                      alt={firm.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {firm.verified && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 h-6 px-2.5 bg-white/95 backdrop-blur-sm rounded-full">
                        <CheckCircle2 size={10} className="text-[#FF6A3D]" />
                        <span className="text-[9px] font-bold text-gray-900">VERIFIED</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                      {firm.name}
                    </h3>
                    <p className="text-[11px] text-gray-600 mb-3">
                      {firm.type}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {firm.services.slice(0, 2).map(service => (
                        <span 
                          key={service}
                          className="h-5 px-2 bg-gray-100 text-gray-700 rounded-full text-[9px] font-medium flex items-center"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                        <span className="font-bold text-gray-900">{firm.rating}</span>
                      </div>
                      <span className="text-gray-500">({firm.reviews})</span>
                    </div>

                    <button className="w-full h-9 bg-gray-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] transition-all">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-8">
            <button 
              onClick={onViewAllContractors}
              className="h-12 px-8 bg-gray-100 text-gray-900 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* 6. BROWSE BY SERVICE TYPE */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-start justify-between mb-8">
            {/* LEFT - Title */}
            <div>
              <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-2 uppercase tracking-tight">
                Browse by Service Type
              </h2>
              <p className="text-[13px] text-gray-600">
                Find specialized contractors for your specific needs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTRACTOR_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onServiceClick?.(service.id)}
                  className={`group bg-gradient-to-br ${service.color} border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:border-[#FF6A3D]/30 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-14 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
                      <Icon size={24} className="text-gray-700 group-hover:text-[#FF6A3D] transition-colors" />
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-[#FF6A3D] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2 group-hover:text-[#FF6A3D] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-[13px] text-gray-700 font-medium">
                    {service.count}+ firms available
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] font-medium text-white mb-3 uppercase tracking-tight">
              How It Works
            </h2>
            <p className="text-[15px] text-white/70">
              Getting started is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center relative"
              >
                <div className="size-16 bg-[#FF6A3D] rounded-full flex items-center justify-center text-white text-[24px] font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-white/70">
                  {item.desc}
                </p>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INQUIRY SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[32px] md:text-[42px] font-medium text-gray-900 mb-6 uppercase tracking-tight leading-tight">
                Tell Us Your Requirement
              </h2>
              <div className="space-y-4">
                {[
                  'Verified professionals',
                  'Quick matching',
                  'No hidden charges'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#FF6A3D] mt-0.5 shrink-0" />
                    <span className="text-[15px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="space-y-4">
                <input 
                  type="text"
                  placeholder="Name"
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all"
                />
                <input 
                  type="tel"
                  placeholder="Phone"
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all"
                />
                <input 
                  type="text"
                  placeholder="Location"
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all"
                />
                <select className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all text-gray-700">
                  <option>Service required</option>
                  {CONTRACTOR_SERVICES.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
                <textarea 
                  placeholder="Description"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all resize-none"
                />
                <button className="w-full h-14 bg-[#FF6A3D] text-white rounded-xl text-[14px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all">
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTRACTOR CTA */}
      <section className="py-10 bg-gradient-to-r from-[#FF6A3D] to-[#E55A2D]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-[24px] md:text-[28px] font-bold text-white mb-2 uppercase tracking-tight">
                Are you a contractor?
              </h2>
              <p className="text-[14px] text-white/90">
                Join 15,000+ verified contractors. Get leads and grow your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="h-11 px-6 bg-white text-[#FF6A3D] rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all whitespace-nowrap">
                List your business
              </button>
              <button className="h-11 px-6 bg-transparent border-2 border-white text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all whitespace-nowrap">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-white rounded-2xl p-6 z-50 mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-gray-900">Select Location</h3>
                <button onClick={() => setIsLocationModalOpen(false)}>
                  <X size={24} className="text-gray-400 hover:text-gray-900" />
                </button>
              </div>
              <div className="space-y-2">
                {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'].map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full h-12 px-4 rounded-xl text-[14px] font-medium text-left transition-all ${
                      location === loc
                        ? 'bg-[#FFF3EF] text-[#FF6A3D] border-2 border-[#FF6A3D]'
                        : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}