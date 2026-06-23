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
  ChevronDown,
  Home as HomeIcon,
  Phone,
  Mail,
  Building2,
  Users
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- MOCK DATA ---

const CONTRACTOR_TYPES = [
  'All',
  'General Contractors',
  'Specialty Contractors',
  'Trade Contractors',
  'Material Suppliers',
  'Testing Labs'
];

const SERVICE_INFO: Record<string, {
  name: string;
  description: string;
  scope: string[];
  faqs: { q: string; a: string }[];
}> = {
  painting: {
    name: 'Painting Services',
    description: 'Professional painting contractors for residential and commercial projects. From interior walls to exterior facades, get expert color consultation and flawless execution.',
    scope: [
      'Interior & exterior painting',
      'Texture & specialty finishes',
      'Surface preparation & repair',
      'Color consultation',
      'Waterproof coatings',
      'Wood & metal painting'
    ],
    faqs: [
      {
        q: 'How long does a typical painting project take?',
        a: 'Most residential painting projects take 3-7 days depending on the size and complexity. Commercial projects may take longer.'
      },
      {
        q: 'Do contractors provide paint materials?',
        a: 'Most contractors can source materials or work with your preferred brands. This is discussed during the quotation phase.'
      },
      {
        q: 'What preparation work is included?',
        a: 'Professional contractors include surface cleaning, filling cracks, sanding, and priming as part of the standard service.'
      }
    ]
  },
  plumbing: {
    name: 'Plumbing Services',
    description: 'Certified plumbing contractors for installation, repair, and maintenance. Expert solutions for water supply, drainage, and sanitation systems.',
    scope: [
      'Pipe installation & repair',
      'Bathroom & kitchen plumbing',
      'Water heater installation',
      'Drainage solutions',
      'Leak detection & repair',
      'Sanitary fitting installation'
    ],
    faqs: [
      {
        q: 'Are contractors licensed and insured?',
        a: 'All verified contractors on our platform are licensed professionals with valid certifications and insurance coverage.'
      },
      {
        q: 'Do you provide emergency services?',
        a: 'Many contractors offer 24/7 emergency plumbing services. Contact them directly to confirm availability.'
      }
    ]
  },
  electrical: {
    name: 'Electrical Services',
    description: 'Licensed electricians for residential and commercial electrical work. Safe, code-compliant installations and repairs.',
    scope: [
      'Wiring & rewiring',
      'Switch & socket installation',
      'Lighting installation',
      'MCB & distribution board',
      'Earthing & safety systems',
      'Electrical troubleshooting'
    ],
    faqs: [
      {
        q: 'Are all electricians certified?',
        a: 'Yes, all electrical contractors are certified and follow local electrical codes and safety standards.'
      }
    ]
  },
  carpentry: {
    name: 'Carpentry Services',
    description: 'Expert carpenters for custom woodwork, furniture, and installations. Quality craftsmanship for residential and commercial projects.',
    scope: [
      'Custom furniture making',
      'Kitchen & wardrobe installation',
      'Door & window frames',
      'False ceiling work',
      'Wooden flooring',
      'Repair & restoration'
    ],
    faqs: [
      {
        q: 'Can I provide my own materials?',
        a: 'Yes, most carpenters can work with client-provided materials or source materials as per your specifications.'
      }
    ]
  },
  waterproofing: {
    name: 'Waterproofing Services',
    description: 'Specialized waterproofing contractors for terraces, bathrooms, and basements. Permanent solutions with warranty.',
    scope: [
      'Terrace waterproofing',
      'Bathroom waterproofing',
      'Basement sealing',
      'Leak repair & treatment',
      'Dampness solutions',
      'Expansion joint treatment'
    ],
    faqs: [
      {
        q: 'What warranty do contractors provide?',
        a: 'Most waterproofing work comes with 5-10 year warranties depending on the materials and methods used.'
      }
    ]
  },
  tiling: {
    name: 'Tiling Services',
    description: 'Professional tile installation for floors, walls, and outdoor spaces. Expert handling of ceramic, vitrified, and designer tiles.',
    scope: [
      'Floor & wall tiling',
      'Bathroom tiling',
      'Kitchen backsplash',
      'Outdoor & patio tiling',
      'Tile repair & replacement',
      'Grouting & finishing'
    ],
    faqs: [
      {
        q: 'How is pricing calculated?',
        a: 'Pricing is typically per square foot and varies based on tile type, area complexity, and design patterns.'
      }
    ]
  },
  hvac: {
    name: 'HVAC Services',
    description: 'Heating, ventilation, and air conditioning specialists. Installation, maintenance, and repair services.',
    scope: [
      'AC installation & repair',
      'Ventilation systems',
      'Duct installation',
      'Preventive maintenance',
      'System upgrades',
      'Energy efficiency solutions'
    ],
    faqs: []
  },
  renovation: {
    name: 'Renovation Services',
    description: 'Complete home and office renovation contractors. From planning to execution, comprehensive remodeling solutions.',
    scope: [
      'Complete home renovation',
      'Kitchen remodeling',
      'Bathroom renovation',
      'Office fit-outs',
      'Interior redesign',
      'Space optimization'
    ],
    faqs: []
  }
};

const FEATURED_FIRMS = [
  {
    id: 1,
    name: 'BuildPro Construction',
    type: 'General Contractors',
    tagline: 'Turnkey Interiors • Civil Works',
    services: ['Renovation', 'Electrical', 'Plumbing'],
    rating: 4.9,
    reviewCount: 234,
    projectsCompleted: 324,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 12
  },
  {
    id: 2,
    name: 'Elite Finishing Solutions',
    type: 'Specialty Contractors',
    tagline: 'Premium Painting • Waterproofing',
    services: ['Painting', 'Waterproofing', 'Tiling'],
    rating: 4.8,
    reviewCount: 189,
    projectsCompleted: 567,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 8
  },
  {
    id: 3,
    name: 'Precision Electricals',
    type: 'Trade Contractors',
    tagline: 'Commercial • Residential Wiring',
    services: ['Electrical', 'HVAC'],
    rating: 5.0,
    reviewCount: 156,
    projectsCompleted: 189,
    location: 'Delhi',
    banner: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 15
  },
  {
    id: 4,
    name: 'Master Carpenters Co.',
    type: 'Specialty Contractors',
    tagline: 'Custom Woodwork • Modular Kitchens',
    services: ['Carpentry', 'Renovation'],
    rating: 4.7,
    reviewCount: 201,
    projectsCompleted: 412,
    location: 'Bangalore',
    banner: 'https://images.unsplash.com/photo-1617047209531-3e6a1e4f9d9f?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 10
  }
];

const ALL_CONTRACTORS = [
  ...FEATURED_FIRMS,
  {
    id: 5,
    name: 'AquaShield Experts',
    type: 'Specialty Contractors',
    tagline: 'Leak-Free Guarantee • Terrace Specialists',
    services: ['Waterproofing', 'Tiling'],
    rating: 4.9,
    reviewCount: 178,
    projectsCompleted: 278,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 9
  },
  {
    id: 6,
    name: 'TileArt Studios',
    type: 'Trade Contractors',
    tagline: 'Designer Tiles • Complete Installation',
    services: ['Tiling', 'Renovation'],
    rating: 4.6,
    reviewCount: 145,
    projectsCompleted: 345,
    location: 'Pune',
    banner: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 7
  },
  {
    id: 7,
    name: 'CoolAir Solutions',
    type: 'Trade Contractors',
    tagline: 'HVAC Installation • Maintenance',
    services: ['HVAC', 'Electrical'],
    rating: 4.8,
    reviewCount: 167,
    projectsCompleted: 298,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1631545806608-bc87d60b9fdb?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 11
  },
  {
    id: 8,
    name: 'FlowTech Plumbing',
    type: 'Trade Contractors',
    tagline: 'Licensed Plumbers • 24/7 Service',
    services: ['Plumbing', 'Waterproofing'],
    rating: 4.9,
    reviewCount: 223,
    projectsCompleted: 456,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 14
  },
  {
    id: 9,
    name: 'Bright Spaces',
    type: 'General Contractors',
    tagline: 'Complete Renovation Specialists',
    services: ['Renovation', 'Painting', 'Carpentry'],
    rating: 4.7,
    reviewCount: 189,
    projectsCompleted: 234,
    location: 'Delhi',
    banner: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 13
  },
  {
    id: 10,
    name: 'MaterialHub India',
    type: 'Material Suppliers',
    tagline: 'Premium Building Materials • Delivery',
    services: ['Materials', 'Consultation'],
    rating: 4.5,
    reviewCount: 98,
    projectsCompleted: 567,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1586864387634-80977929cbea?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 6
  },
  {
    id: 11,
    name: 'TestPro Labs',
    type: 'Testing Labs',
    tagline: 'Quality Testing • Certification',
    services: ['Testing', 'Certification'],
    rating: 4.8,
    reviewCount: 112,
    projectsCompleted: 789,
    location: 'Bangalore',
    banner: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 8
  },
  {
    id: 12,
    name: 'ColorCraft Painters',
    type: 'Specialty Contractors',
    tagline: 'Expert Painters • Texture Specialists',
    services: ['Painting', 'Finishing'],
    rating: 4.9,
    reviewCount: 267,
    projectsCompleted: 489,
    location: 'Mumbai',
    banner: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    verified: true,
    yearsExperience: 10
  }
];

// --- MAIN COMPONENT ---

export function ServiceDetailPage({ 
  serviceId = 'painting',
  onBack,
  onContractorClick
}: { 
  serviceId?: string;
  onBack?: () => void;
  onContractorClick?: (contractorId: number) => void;
}) {
  const [location, setLocation] = useState('Mumbai');
  const [selectedContractorType, setSelectedContractorType] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const serviceInfo = SERVICE_INFO[serviceId] || SERVICE_INFO.painting;

  const filteredContractors = useMemo(() => {
    let filtered = ALL_CONTRACTORS.filter(c => c.location === location);
    
    if (selectedContractorType !== 'All') {
      filtered = filtered.filter(c => c.type === selectedContractorType);
    }
    
    return filtered;
  }, [location, selectedContractorType]);

  const topFirms = useMemo(() => {
    return filteredContractors
      .filter(c => c.type === 'General Contractors' || c.type === 'Specialty Contractors')
      .slice(0, 4);
  }, [filteredContractors]);

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif] pt-16 md:pt-20 lg:pt-24">
      
      {/* COMPACT HERO */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-gray-600 mb-6">
            <button onClick={onBack} className="hover:text-[#FF6A3D] transition-colors">
              Home
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <button onClick={onBack} className="hover:text-[#FF6A3D] transition-colors">
              Services
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium">{serviceInfo.name}</span>
          </nav>

          {/* Service Header */}
          <div className="max-w-[800px]">
            <h1 className="text-[36px] md:text-[48px] font-medium text-gray-900 mb-4 uppercase tracking-tight leading-tight">
              {serviceInfo.name}
            </h1>
            <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed mb-6">
              {serviceInfo.description}
            </p>

            {/* Location Context */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[14px] text-gray-700">
                <MapPin size={18} className="text-[#FF6A3D]" />
                <span>Showing <strong className="font-bold">{filteredContractors.length} contractors</strong> in</span>
                <strong className="font-bold text-gray-900">{location}</strong>
              </div>
              <button 
                onClick={() => setIsLocationModalOpen(true)}
                className="text-[14px] text-[#FF6A3D] font-bold hover:underline"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRACTOR TYPE FILTER BAR */}
      <section className="sticky top-16 md:top-20 lg:top-24 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {CONTRACTOR_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedContractorType(type)}
                className={`h-10 px-5 rounded-full text-[13px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedContractorType === type
                    ? 'bg-[#FF6A3D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: TOP CONTRACTOR FIRMS */}
      {topFirms.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-2 uppercase tracking-tight">
                  Top Contractor Firms
                </h2>
                <p className="text-[14px] text-gray-600">
                  Verified firms with proven track record in {serviceInfo.name.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
              <div className="flex gap-6 px-4 md:px-0 min-w-max md:grid md:grid-cols-4 md:min-w-0">
                {topFirms.map((firm, idx) => (
                  <motion.div
                    key={firm.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onContractorClick?.(firm.id)}
                    className="w-[300px] md:w-auto bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
                  >
                    {/* Banner */}
                    <div className="h-[140px] relative overflow-hidden">
                      <ImageWithFallback 
                        src={firm.banner}
                        alt={firm.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {firm.verified && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 h-6 px-2.5 bg-white/95 backdrop-blur-sm rounded-full">
                          <CheckCircle2 size={12} className="text-[#FF6A3D]" />
                          <span className="text-[10px] font-bold text-gray-900">VERIFIED</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-[16px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                        {firm.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">
                        {firm.type}
                      </p>
                      <p className="text-[12px] text-gray-600 mb-4">
                        {firm.tagline}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-3 mb-4 text-[12px]">
                        <div className="flex items-center gap-1">
                          <Star size={13} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                          <span className="font-bold text-gray-900">{firm.rating}</span>
                          <span className="text-gray-500">({firm.reviewCount})</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{firm.projectsCompleted} projects</span>
                      </div>

                      <button className="w-full h-10 bg-gray-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] transition-all">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: ALL CONTRACTORS */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-2 uppercase tracking-tight">
              All Contractors
            </h2>
            <p className="text-[14px] text-gray-600">
              Browse all verified contractors in {location}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContractors.map((contractor, idx) => (
              <motion.div
                key={contractor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onContractorClick?.(contractor.id)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="h-[120px] relative overflow-hidden">
                  <ImageWithFallback 
                    src={contractor.banner}
                    alt={contractor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {contractor.verified && (
                    <div className="absolute top-2 right-2 size-6 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-[#FF6A3D]" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                    {contractor.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">
                    {contractor.type}
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {contractor.services.slice(0, 2).map(service => (
                      <span 
                        key={service}
                        className="h-5 px-2 bg-gray-100 text-gray-700 rounded-full text-[9px] font-medium flex items-center uppercase tracking-wider"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                      <span className="text-[12px] font-bold text-gray-900">{contractor.rating}</span>
                      <span className="text-[11px] text-gray-500">({contractor.reviewCount})</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] text-gray-600">{contractor.yearsExperience}+ yrs</span>
                  </div>

                  <button className="w-full h-9 bg-gray-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-[#FF6A3D] transition-all">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="h-12 px-10 bg-white border-2 border-gray-200 text-gray-900 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-all">
              Load More Contractors
            </button>
          </div>
        </div>
      </section>

      {/* SCOPE OF SERVICE */}
      {serviceInfo.scope.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-3 uppercase tracking-tight">
                Scope of Service
              </h2>
              <p className="text-[14px] text-gray-600">
                What's typically included in {serviceInfo.name.toLowerCase()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceInfo.scope.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <CheckCircle2 size={18} className="text-[#FF6A3D] mt-0.5 shrink-0" />
                  <span className="text-[14px] text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {serviceInfo.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[900px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-medium text-gray-900 mb-3 uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-[14px] text-gray-600">
                Common questions about {serviceInfo.name.toLowerCase()}
              </p>
            </div>

            <div className="space-y-3">
              {serviceInfo.faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-[15px] font-bold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 shrink-0 transition-transform ${
                        expandedFAQ === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-[14px] text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-[#FF6A3D] to-[#E55A2D]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-3 uppercase tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-[16px] text-white/90 mb-8 max-w-[600px] mx-auto">
            Connect with verified contractors today and get free quotes for your {serviceInfo.name.toLowerCase()} project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="h-14 px-10 bg-white text-[#FF6A3D] rounded-xl text-[14px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
              Get Free Quotes
            </button>
            <button className="h-14 px-10 bg-transparent border-2 border-white text-white rounded-xl text-[14px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Contact Support
            </button>
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
