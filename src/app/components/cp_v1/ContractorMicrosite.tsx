import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Bookmark,
  Users,
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Shield,
  Target,
  X
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- TYPES ---

interface ContractorMicrositeProps {
  contractorId: number;
  onBack?: () => void;
}

interface Contractor {
  id: number;
  name: string;
  type: 'Firm' | 'Individual';
  contractorType: string;
  location: string;
  rating: number;
  reviewCount: number;
  profileImage: string;
  heroImage: string;
  services: string[];
  trustBadges: string[];
  serviceAreas: string[];
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    citiesServed: number;
    teamSize?: number;
  };
  about: {
    description: string;
    projectScale: string[];
    industries: string[];
    keyStrengths: string[];
  };
  servicesDetailed: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  portfolio: Array<{
    id: number;
    image: string;
    name: string;
    category: string;
  }>;
  certifications: Array<{
    name: string;
    image: string;
    verified: boolean;
  }>;
  clientReviews: Array<{
    clientName: string;
    rating: number;
    review: string;
    verified: boolean;
  }>;
  capabilities: string[];
  responseTime: string;
}

// --- MOCK DATA ---

const CONTRACTOR_DATA: Record<number, Contractor> = {
  1: {
    id: 1,
    name: 'BuildPro Construction',
    type: 'Firm',
    contractorType: 'General Contractor',
    location: 'Mumbai, India',
    rating: 4.8,
    reviewCount: 234,
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600',
    services: ['Renovation', 'Electrical', 'Interior', 'Turnkey'],
    trustBadges: ['Verified', 'Background Checked', 'Multi-service Expertise'],
    serviceAreas: ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune', 'Panvel', 'Kalyan'],
    stats: {
      projectsCompleted: 324,
      yearsExperience: 12,
      citiesServed: 6,
      teamSize: 45
    },
    about: {
      description: 'BuildPro Construction is a full-service general contractor specializing in residential and commercial projects. With over 12 years of experience, we deliver quality workmanship and exceptional customer service across Mumbai and surrounding areas.',
      projectScale: ['Residential', 'Commercial', 'Industrial'],
      industries: ['Real Estate', 'Hospitality', 'Retail', 'Corporate Offices'],
      keyStrengths: ['Turnkey Solutions', 'On-time Delivery', 'Quality Assurance', 'Post-completion Support']
    },
    servicesDetailed: [
      { name: 'Complete Renovation', description: 'Full home and office renovation services', icon: 'home' },
      { name: 'Electrical Works', description: 'Commercial & residential wiring solutions', icon: 'zap' },
      { name: 'Interior Fit-outs', description: 'Custom interior design and execution', icon: 'layout' },
      { name: 'Plumbing Services', description: 'Installation, repair, and maintenance', icon: 'droplet' },
      { name: 'Painting & Finishing', description: 'Premium painting and texture work', icon: 'paintbrush' },
      { name: 'Turnkey Projects', description: 'End-to-end project management', icon: 'briefcase' }
    ],
    portfolio: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        name: 'Modern Villa Renovation',
        category: 'Residential'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
        name: 'Corporate Office Interiors',
        category: 'Commercial'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
        name: 'Luxury Apartment',
        category: 'Residential'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
        name: 'Retail Store Fit-out',
        category: 'Commercial'
      }
    ],
    certifications: [
      {
        name: 'ISO 9001:2015 Certified',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'IGBC Green Building',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Safety Compliance',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
        verified: true
      }
    ],
    clientReviews: [
      {
        clientName: 'Priya Sharma',
        rating: 5,
        review: 'Excellent work on our office renovation. Professional team, completed on time and within budget.',
        verified: true
      },
      {
        clientName: 'Amit Patel',
        rating: 4.5,
        review: 'Very satisfied with the quality of work. The team was responsive and addressed all our concerns promptly.',
        verified: true
      },
      {
        clientName: 'Rahul Desai',
        rating: 5,
        review: 'Outstanding service from start to finish. Highly recommend BuildPro for any construction needs.',
        verified: false
      }
    ],
    capabilities: ['Residential Projects', 'Commercial Buildings', 'Industrial Facilities', 'Interior Fit-outs', 'Turnkey Solutions', 'Renovation & Remodeling'],
    responseTime: 'Responds within 24 hours'
  },
  9: {
    id: 9,
    name: 'Rajesh Kumar',
    type: 'Individual',
    contractorType: 'Trade Contractor',
    location: 'Mumbai, India',
    rating: 4.7,
    reviewCount: 89,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1600',
    services: ['Plumbing', 'Waterproofing', 'Repair'],
    trustBadges: ['Verified', 'Background Checked', 'Expert Plumber'],
    serviceAreas: ['Mumbai', 'Navi Mumbai', 'Thane'],
    stats: {
      projectsCompleted: 156,
      yearsExperience: 9,
      citiesServed: 3
    },
    about: {
      description: 'Licensed plumbing professional with 9 years of experience. Specializing in residential and commercial plumbing installations, repairs, and waterproofing solutions. Available 24/7 for emergency services.',
      projectScale: ['Residential', 'Commercial'],
      industries: ['Residential Complexes', 'Commercial Buildings', 'Restaurants'],
      keyStrengths: ['24/7 Availability', 'Licensed Professional', 'Quality Materials', 'Warranty on Work']
    },
    servicesDetailed: [
      { name: 'Plumbing Installation', description: 'New installations for homes and offices', icon: 'droplet' },
      { name: 'Leak Repair', description: 'Quick and effective leak detection and repair', icon: 'shield' },
      { name: 'Waterproofing', description: 'Bathroom and terrace waterproofing', icon: 'umbrella' },
      { name: 'Drainage Solutions', description: 'Drain cleaning and maintenance', icon: 'filter' }
    ],
    portfolio: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800',
        name: 'Apartment Bathroom',
        category: 'Residential'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800',
        name: 'Commercial Kitchen',
        category: 'Commercial'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
        name: 'Waterproofing Project',
        category: 'Residential'
      }
    ],
    certifications: [
      {
        name: 'Licensed Plumber',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
        verified: true
      },
      {
        name: 'Safety Training',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
        verified: true
      }
    ],
    clientReviews: [
      {
        clientName: 'Sneha Joshi',
        rating: 5,
        review: 'Fixed our bathroom leak quickly and efficiently. Very professional and reasonably priced.',
        verified: true
      },
      {
        clientName: 'Vikram Singh',
        rating: 4.5,
        review: 'Excellent service! Rajesh is very skilled and completed the work on time.',
        verified: true
      }
    ],
    capabilities: ['Residential Plumbing', 'Commercial Plumbing', 'Emergency Services', 'Waterproofing', 'Leak Detection'],
    responseTime: 'Responds within 2 hours'
  }
};

// --- COMPONENT ---

export function ContractorMicrosite({ contractorId, onBack }: ContractorMicrositeProps) {
  const [showMoreAreas, setShowMoreAreas] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    requirement: ''
  });

  const contractor = CONTRACTOR_DATA[contractorId];

  if (!contractor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Contractor not found</p>
      </div>
    );
  }

  const visibleAreas = showMoreAreas ? contractor.serviceAreas : contractor.serviceAreas.slice(0, 4);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    setShowEnquiryForm(false);
    alert('Enquiry sent successfully! The contractor will respond within 24 hours.');
  };

  // Smooth scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Auto-focus first input after scroll
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        firstInput?.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Satoshi',sans-serif]">
      
      {/* HERO SECTION - OPTIMIZED */}
      <section className="relative h-[520px] md:h-[580px] max-h-[65vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={contractor.heroImage}
            alt={contractor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-end pt-20 md:pt-24 pb-10 md:pb-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT - Profile Info */}
            <div className="lg:col-span-2">
              {/* Profile Image/Logo - REDUCED SIZE */}
              <div className="w-16 h-16 md:w-[68px] md:h-[68px] rounded-xl overflow-hidden border-2 border-white shadow-lg mb-4">
                <ImageWithFallback 
                  src={contractor.profileImage}
                  alt={contractor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name - REDUCED SIZE */}
              <h1 className="text-[28px] md:text-[40px] font-bold text-white mb-3 leading-tight">
                {contractor.name}
              </h1>

              {/* Type & Location - TIGHTER SPACING */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-[14px] text-gray-300">
                  {contractor.contractorType}
                </span>
                <span className="text-gray-500">•</span>
                <div className="flex items-center gap-1.5 text-[14px] text-gray-300">
                  <MapPin size={14} />
                  {contractor.location}
                </div>
              </div>

              {/* Rating - TIGHTER SPACING */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Star size={14} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                  <span className="font-bold text-white">{contractor.rating}</span>
                  <span className="text-gray-300 text-[13px]">({contractor.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Services Tags - TIGHTER SPACING */}
              <div className="flex flex-wrap gap-2 mb-2.5">
                {contractor.services.map(service => (
                  <span 
                    key={service}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-[12px] font-medium rounded-lg"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Trust Badges - TIGHTER SPACING */}
              <div className="flex flex-wrap gap-2">
                {contractor.trustBadges.map(badge => (
                  <div 
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg"
                  >
                    <CheckCircle2 size={12} className="text-[#FF6A3D]" />
                    <span className="text-[11px] font-bold text-gray-900">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - CTA Panel (Desktop Only) - REDUCED PADDING */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-5 shadow-2xl sticky top-24">
                <div className="space-y-2.5 mb-3">
                  <button 
                    onClick={() => setShowEnquiryForm(true)}
                    className="w-full h-11 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                  >
                    Get Quote
                  </button>
                  <button 
                    onClick={scrollToContact}
                    className="w-full h-11 bg-gray-900 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                  >
                    Contact
                  </button>
                  <button className="w-full h-11 bg-gray-100 text-gray-900 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    <Bookmark size={16} />
                    Save
                  </button>
                </div>
                <div className="flex items-center gap-2 justify-center pt-3 border-t border-gray-200">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-[12px] text-gray-600">{contractor.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setShowEnquiryForm(true)}
            className="flex-1 h-11 bg-[#FF6A3D] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest"
          >
            Get Quote
          </button>
          <button 
            onClick={scrollToContact}
            className="flex-1 h-11 bg-gray-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest"
          >
            Contact
          </button>
          <button className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bookmark size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* SERVICE AREAS */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-[18px] font-bold text-gray-900 uppercase tracking-tight">
              Service Areas
            </h2>
            <input 
              type="text"
              placeholder="Enter pincode or city"
              className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF6A3D]/50 max-w-[280px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleAreas.map(area => (
              <span 
                key={area}
                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-[12px] font-medium"
              >
                {area}
              </span>
            ))}
            {contractor.serviceAreas.length > 4 && (
              <button 
                onClick={() => setShowMoreAreas(!showMoreAreas)}
                className="px-4 py-2 text-[#FF6A3D] text-[12px] font-bold hover:underline"
              >
                {showMoreAreas ? 'Show less' : `+${contractor.serviceAreas.length - 4} more`}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-[32px] font-bold text-gray-900 mb-1">
                {contractor.stats.projectsCompleted}+
              </div>
              <div className="text-[12px] text-gray-600 uppercase tracking-wider">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-bold text-gray-900 mb-1">
                {contractor.stats.yearsExperience}
              </div>
              <div className="text-[12px] text-gray-600 uppercase tracking-wider">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-bold text-gray-900 mb-1">
                {contractor.stats.citiesServed}
              </div>
              <div className="text-[12px] text-gray-600 uppercase tracking-wider">
                Cities Served
              </div>
            </div>
            {contractor.type === 'Firm' && contractor.stats.teamSize && (
              <div className="text-center">
                <div className="text-[32px] font-bold text-gray-900 mb-1">
                  {contractor.stats.teamSize}
                </div>
                <div className="text-[12px] text-gray-600 uppercase tracking-wider">
                  Team Members
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 uppercase tracking-tight">
            About
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
                {contractor.about.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Project Scale
                </h3>
                <div className="flex flex-wrap gap-2">
                  {contractor.about.projectScale.map(scale => (
                    <span 
                      key={scale}
                      className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg text-[12px] font-medium"
                    >
                      {scale}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Industries Served
                </h3>
                <div className="flex flex-wrap gap-2">
                  {contractor.about.industries.map(industry => (
                    <span 
                      key={industry}
                      className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg text-[12px] font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Key Strengths
                </h3>
                <ul className="space-y-2">
                  {contractor.about.keyStrengths.map(strength => (
                    <li 
                      key={strength}
                      className="flex items-center gap-2 text-[13px] text-gray-700"
                    >
                      <CheckCircle2 size={14} className="text-[#FF6A3D]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OFFERED */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 uppercase tracking-tight">
            Services Offered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractor.servicesDetailed.map(service => (
              <div 
                key={service.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF6A3D] transition-all"
              >
                <div className="w-12 h-12 bg-[#FFF3EF] rounded-xl flex items-center justify-center mb-4">
                  <Briefcase size={24} className="text-[#FF6A3D]" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-[13px] text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold text-gray-900 uppercase tracking-tight">
              Portfolio
            </h2>
            <button className="flex items-center gap-2 text-[13px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-3 transition-all">
              View All Projects <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractor.portfolio.map(project => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="h-[220px] rounded-2xl overflow-hidden mb-3">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                  {project.name}
                </h3>
                <p className="text-[12px] text-gray-600">
                  {project.category}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 uppercase tracking-tight">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contractor.certifications.map(cert => (
              <div 
                key={cert.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback 
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                    {cert.name}
                  </h3>
                  {cert.verified && (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#FF6A3D]" />
                      <span className="text-[11px] text-gray-600">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT REVIEWS */}
      <section className="bg-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 uppercase tracking-tight">
            Client Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contractor.clientReviews.map((review, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(review.rating) 
                          ? 'text-[#FF6A3D] fill-[#FF6A3D]' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[14px] text-gray-700 mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-900">
                    {review.clientName}
                  </span>
                  {review.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-lg">
                      <CheckCircle2 size={10} className="text-[#FF6A3D]" />
                      <span className="text-[10px] text-gray-600">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT CAPABILITIES */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 uppercase tracking-tight">
            Project Capabilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {contractor.capabilities.map(capability => (
              <div 
                key={capability}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200"
              >
                <Target size={16} className="text-[#FF6A3D]" />
                <span className="text-[13px] font-medium text-gray-900">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / ENQUIRY */}
      <section className="bg-white py-12" id="contact-section">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT */}
              <div>
                <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-3">
                  Get a quote from {contractor.name}
                </h2>
                <p className="text-[15px] text-gray-300 mb-6">
                  Describe your requirement and get a response within 24 hours
                </p>
                <div className="flex items-center gap-2 text-gray-300">
                  <Shield size={18} className="text-[#FF6A3D]" />
                  <span className="text-[13px]">Your information is secure and confidential</span>
                </div>
              </div>

              {/* RIGHT - Form */}
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                <input 
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 text-[13px] outline-none focus:border-[#FF6A3D] transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 text-[13px] outline-none focus:border-[#FF6A3D] transition-all"
                  />
                  <input 
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 text-[13px] outline-none focus:border-[#FF6A3D] transition-all"
                  />
                </div>
                <input 
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                  className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 text-[13px] outline-none focus:border-[#FF6A3D] transition-all"
                />
                <textarea 
                  placeholder="Describe your requirement"
                  value={formData.requirement}
                  onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 text-[13px] outline-none focus:border-[#FF6A3D] transition-all resize-none"
                />
                <button 
                  type="submit"
                  className="w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-[500px] w-full relative"
          >
            <button 
              onClick={() => setShowEnquiryForm(false)}
              className="absolute top-6 right-6"
            >
              <X size={24} className="text-gray-400 hover:text-gray-900" />
            </button>
            
            <h3 className="text-[24px] font-bold text-gray-900 mb-2">
              Get a Quote
            </h3>
            <p className="text-[13px] text-gray-600 mb-6">
              Fill in your details and we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <input 
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-[#FF6A3D]/50 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-[#FF6A3D]/50 transition-all"
                />
                <input 
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-[#FF6A3D]/50 transition-all"
                />
              </div>
              <input 
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-[#FF6A3D]/50 transition-all"
              />
              <textarea 
                placeholder="Describe your requirement"
                value={formData.requirement}
                onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-[#FF6A3D]/50 transition-all resize-none"
              />
              <button 
                type="submit"
                className="w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}