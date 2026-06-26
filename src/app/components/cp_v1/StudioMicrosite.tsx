import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  Clock,
  Heart,
  MessageCircle,
  FileText,
  CheckCircle2,
  Users,
  Building2,
  Award,
  Briefcase,
  ArrowLeft,
  ChevronRight,
  Home,
  Wind,
  Quote
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { TestimonialsSection } from './TestimonialsSection';

// --- TYPES ---

interface StudioMicrositeProps {
  studioId: string;
  onBack?: () => void;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

interface Project {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  project?: string;
}

// --- MOCK DATA ---

const MOCK_STUDIO = {
  id: '1',
  name: 'Studio Materium',
  type: 'Architecture Studio',
  logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
  coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600',
  location: 'Mumbai, India',
  rating: 4.8,
  reviewCount: 120,
  verified: true,
  responseTime: 'Responds within 24 hrs',
  disciplines: ['Architecture', 'Sustainability', 'Urban Planning'],
  practices: ['Architecture Firms', 'Urban Design', 'Facade Engineering'],
  serviceAreas: ['Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Ahmedabad'],
  stats: {
    projectsCompleted: 250,
    yearsExperience: 15,
    citiesServed: 12,
    teamSize: 45
  },
  about: 'Award-winning architecture and urban design practice specializing in sustainable, contextual, and innovative design solutions that respond to climate, culture, and community needs.',
  designApproach: 'We believe in creating architecture that serves both people and planet. Every project begins with deep research into context, climate, and culture, resulting in designs that are both timeless and responsive.',
  expertise: [
    'Sustainable Architecture',
    'Mixed-Use Development',
    'Institutional Design',
    'Urban Master Planning',
    'Facade Engineering',
    'Interior Design'
  ],
  industries: ['Commercial', 'Residential', 'Institutional', 'Hospitality', 'Industrial'],
  servicesOffered: ['Architectural Design', 'Interior Design', 'Urban Planning', 'PMC']
};

const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Architectural Design',
    description: 'Complete architectural solutions from concept to construction',
    icon: 'Building2'
  },
  {
    id: 2,
    name: 'Interior Design',
    description: 'Thoughtful interior spaces that enhance user experience',
    icon: 'Home'
  },
  {
    id: 3,
    name: 'Sustainable Design',
    description: 'Net-zero and green building certified projects',
    icon: 'Wind'
  },
  {
    id: 4,
    name: 'Urban Planning',
    description: 'Master planning and urban design at all scales',
    icon: 'MapPin'
  },
  {
    id: 5,
    name: 'Project Management',
    description: 'End-to-end project execution and coordination',
    icon: 'Briefcase'
  },
  {
    id: 6,
    name: 'Turnkey Solutions',
    description: 'Complete design-build solutions for seamless delivery',
    icon: 'CheckCircle2'
  }
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Sonali Rastogi',
    role: 'Principal Architect',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Manit Rastogi',
    role: 'Principal Architect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Anjali Sharma',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Rajesh Kumar',
    role: 'Senior Architect',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
  }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Pearl Academy',
    type: 'Educational',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    location: 'Rajasthan'
  },
  {
    id: 2,
    name: 'ITC Grand Bharat',
    type: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    location: 'Gurugram'
  },
  {
    id: 3,
    name: 'Lodha World Towers',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    location: 'Mumbai'
  },
  {
    id: 4,
    name: 'Infosys Campus',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    location: 'Bangalore'
  },
  {
    id: 5,
    name: 'DLF Cyber City',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    location: 'Hyderabad'
  },
  {
    id: 6,
    name: 'Residential Complex',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    location: 'Pune'
  }
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    text: 'Exceptional design quality and professionalism. They transformed our vision into a stunning reality.',
    project: 'Residential Villa'
  },
  {
    id: 2,
    name: 'Rajesh Mehta',
    rating: 5,
    text: 'Outstanding team with deep expertise in sustainable architecture. Highly recommend!',
    project: 'Commercial Complex'
  },
  {
    id: 3,
    name: 'Neha Kapoor',
    rating: 4,
    text: 'Great experience working with the team. Very responsive and detail-oriented.',
    project: 'Office Interiors'
  }
];

const TESTIMONIALS_FOR_SECTION = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Exceptional design quality and professionalism. They transformed our vision into a stunning reality that exceeded all expectations.',
    project: 'Residential Villa'
  },
  {
    id: 2,
    name: 'Rajesh Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Outstanding team with deep expertise in sustainable architecture. Their innovative approach to our project was remarkable. Highly recommend!',
    project: 'Commercial Complex'
  },
  {
    id: 3,
    name: 'Neha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 4,
    text: 'Great experience working with the team. Very responsive and detail-oriented throughout the entire project lifecycle.',
    project: 'Office Interiors'
  },
  {
    id: 4,
    name: 'Amit Patel',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Studio Materium delivered beyond expectations. Their sustainable design approach helped us achieve LEED certification.',
    project: 'Corporate Headquarters'
  },
  {
    id: 5,
    name: 'Kavita Singh',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    text: 'Exceptional attention to detail and commitment to quality. The team understood our vision perfectly.',
    project: 'Hospitality Project'
  },
  {
    id: 6,
    name: 'Sandeep Joshi',
    avatar: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400',
    rating: 4,
    text: 'Professional, creative, and collaborative. The design process was transparent and inclusive.',
    project: 'Mixed-Use Development'
  }
];

// --- COMPONENT ---

// Similar firms data
const SIMILAR_FIRMS = [
  {
    id: 1,
    name: 'Studio Lotus',
    type: 'Architecture Studio',
    location: 'Delhi',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'NUDES',
    type: 'Design Studio',
    location: 'Mumbai',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'SpaceMatters',
    type: 'Architecture Firm',
    location: 'Bangalore',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Sanjay Puri Architects',
    type: 'Architecture Studio',
    location: 'Mumbai',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400'
  }
];

export function StudioMicrosite({ studioId, onBack }: StudioMicrositeProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [showAllServiceAreas, setShowAllServiceAreas] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif]">

      {/* BACK BUTTON */}
      {onBack && (
        <div className="border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Professionals
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION - INFORMATIONAL ONLY */}
      <section className="relative overflow-hidden">
        {/* Cover Image Banner */}
        <div className="relative h-[190px]">
          <ImageWithFallback
            src={MOCK_STUDIO.coverImage}
            alt={MOCK_STUDIO.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

          {/* Profile Info Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 pb-7">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[34px] md:text-[38px] font-bold text-white drop-shadow-xl">
                  {MOCK_STUDIO.name}
                </h1>
                {MOCK_STUDIO.verified && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm">
                    <CheckCircle2 size={14} className="text-[#FF6A3D]" />
                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Verified</span>
                  </div>
                )}
              </div>

              <p className="text-[16px] text-white/95 mb-4 drop-shadow-lg font-medium">{MOCK_STUDIO.type}</p>

              <div className="flex flex-wrap items-center gap-5 text-[14px] text-white drop-shadow-lg font-medium">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-white/90" />
                  <span>{MOCK_STUDIO.location}</span>
                </div>
                <span className="text-white/50">|</span>
                <span>{MOCK_STUDIO.stats.yearsExperience} yrs</span>
                <span className="text-white/50">|</span>
                <span>{MOCK_STUDIO.stats.projectsCompleted}+ projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT - FLUID WITH FLOATING RIGHT PANEL */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <div className="lg:pr-[360px]">

            {/* MAIN CONTENT */}
            <div className="space-y-16">

            {/* 1. EXPERTISE & SCOPE (HIERARCHICAL SYSTEM) */}
            <section>
              <h2 className="text-[28px] font-bold text-gray-900 mb-10">Expertise & Scope</h2>

              <div className="space-y-8">
                {/* DISCIPLINE: ARCHITECTURE */}
                <div className="bg-[#FAFAFA] rounded-2xl p-8">
                  {/* Discipline Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#FF6A3D]/10 rounded-lg flex items-center justify-center">
                      <Building2 size={20} className="text-[#FF6A3D]" />
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900">Architecture</h3>
                  </div>

                  {/* Practices + Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* PRACTICES */}
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Practices</h4>
                      <ul className="space-y-3">
                        {MOCK_STUDIO.practices.map((practice, index) => (
                          <li key={index} className="flex items-start gap-2 text-[14px] text-gray-700">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Services</h4>
                      <ul className="space-y-3">
                        {MOCK_STUDIO.servicesOffered.map((service, index) => (
                          <li key={index} className="flex items-start gap-2 text-[14px] text-gray-900 font-medium">
                            <span className="text-[#FF6A3D] mt-1">•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DISCIPLINE: SUSTAINABILITY */}
                <div className="bg-[#FAFAFA] rounded-2xl p-8">
                  {/* Discipline Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Wind size={20} className="text-green-600" />
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900">Sustainability</h3>
                  </div>

                  {/* Practices + Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* PRACTICES */}
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Practices</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-[14px] text-gray-700">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>Green Building Certification</span>
                        </li>
                        <li className="flex items-start gap-2 text-[14px] text-gray-700">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>Energy Modeling</span>
                        </li>
                        <li className="flex items-start gap-2 text-[14px] text-gray-700">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>Climate-Responsive Design</span>
                        </li>
                      </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Services</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-[14px] text-gray-900 font-medium">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Net-Zero Design</span>
                        </li>
                        <li className="flex items-start gap-2 text-[14px] text-gray-900 font-medium">
                          <span className="text-green-600 mt-1">•</span>
                          <span>LEED Consulting</span>
                        </li>
                        <li className="flex items-start gap-2 text-[14px] text-gray-900 font-medium">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Carbon Footprint Analysis</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* APPLICATION AREAS (SUPPORTING INFO) */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Application Areas</h4>
                  <div className="flex flex-wrap gap-3">
                    {MOCK_STUDIO.industries.map((industry, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SERVICES (HERO SECTION) */}
            <section>
              <h2 className="text-[28px] font-bold text-gray-900 mb-10">Services</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SERVICES.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -4 }}
                    className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-[#FF6A3D] hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FF6A3D]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6A3D] transition-all">
                        <Building2 size={22} className="text-[#FF6A3D] group-hover:text-white transition-all" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[16px] font-bold text-gray-900 mb-2 group-hover:text-[#FF6A3D] transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-[13px] text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 3. ABOUT */}
            <section>
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">About {MOCK_STUDIO.name}</h2>

              <div className="max-w-[680px]">
                <p className="text-[15px] text-gray-700 leading-relaxed">
                  {MOCK_STUDIO.about}
                </p>
              </div>
            </section>

            {/* 4. FEATURED PROJECTS - HERO LAYOUT */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[28px] font-bold text-gray-900">Featured Projects</h2>
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-2.5 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hero Project (2/3 width) */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="md:col-span-2 group cursor-pointer overflow-hidden rounded-xl border border-gray-200 hover:border-[#FF6A3D] transition-all"
                >
                  <div className="relative h-[320px] overflow-hidden">
                    <ImageWithFallback
                      src={PROJECTS[0].image}
                      alt={PROJECTS[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wide">{PROJECTS[0].type}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[18px] font-bold text-white mb-1">{PROJECTS[0].name}</h3>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <MapPin size={13} />
                        <span className="text-[12px]">{PROJECTS[0].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Grid: 2x2 Smaller Projects */}
                <div className="grid grid-cols-1 gap-4">
                  {PROJECTS.slice(1, 3).map(project => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -4 }}
                      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 hover:border-[#FF6A3D] transition-all"
                    >
                      <div className="relative h-[154px] overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all" />
                        <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
                          <span className="text-[9px] font-bold text-white uppercase tracking-wide">{project.type}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-[13px] font-bold text-white mb-0.5 truncate">{project.name}</h3>
                          <div className="flex items-center gap-1 text-white/90">
                            <MapPin size={11} />
                            <span className="text-[10px]">{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. REVIEWS - COMPRESSED */}
            <section>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Star size={20} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                  <span className="text-[28px] font-bold text-gray-900">{MOCK_STUDIO.rating}</span>
                  <span className="text-[15px] text-gray-600">({MOCK_STUDIO.reviewCount} reviews)</span>
                </div>
                <p className="text-[14px] text-gray-600">Trusted by 100+ clients</p>
              </div>

              <div className="space-y-4 mb-6">
                {REVIEWS.slice(0, showAllReviews ? undefined : 2).map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-[13px] font-bold text-gray-900">{review.name}</h4>
                          <div className="flex items-center gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={11} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[12px] text-gray-700 leading-relaxed mb-2 line-clamp-2">
                          {review.text}
                        </p>
                        {review.project && (
                          <span className="text-[10px] text-gray-500">{review.project}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline"
              >
                {showAllReviews ? 'Show Less' : 'View All Reviews'}
              </button>
            </section>

            {/* 6. TEAM - SIMPLIFIED */}
            <section>
              <h2 className="text-[28px] font-bold text-gray-900 mb-8">Our Team</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {TEAM_MEMBERS.slice(0, showAllTeam ? undefined : 4).map(member => (
                  <div key={member.id} className="group cursor-pointer">
                    <div className="relative mb-2.5 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[13px] font-bold text-gray-900">{member.name}</h3>
                    <p className="text-[11px] text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>

              {TEAM_MEMBERS.length > 4 && (
                <button
                  onClick={() => setShowAllTeam(!showAllTeam)}
                  className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline"
                >
                  {showAllTeam ? 'Show Less' : 'View Full Team'}
                </button>
              )}
            </section>

            {/* 7. CERTIFICATIONS - PILL BADGES */}
            <section>
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">Certifications & Awards</h2>
              <div className="flex flex-wrap gap-2">
                {['LEED Certified', 'IGBC', 'GRIHA', 'COA'].map(cert => (
                  <div
                    key={cert}
                    className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-[12px] font-medium border border-gray-200 flex items-center gap-2"
                  >
                    <Award size={14} className="text-[#FF6A3D]" />
                    {cert}
                  </div>
                ))}
              </div>
            </section>

            {/* 8. CONTACT SECTION */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="text-[28px] font-bold text-gray-900 mb-8">Contact This Firm</h2>

              <div className="max-w-[600px] bg-gray-50 rounded-xl border border-gray-200 p-8">
                <form className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#FF6A3D] transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#FF6A3D] transition-all"
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">
                      Project Requirement
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-[#FF6A3D] transition-all resize-none"
                      placeholder="Describe your project requirements"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#FF6A3D] text-white rounded-lg text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all"
                  >
                    SUBMIT INQUIRY
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>

          {/* RIGHT FLOATING PANEL - LIGHTER DESIGN */}
          <div className="hidden lg:block fixed top-24 right-8 w-[320px]">
            <div className="sticky top-28">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm">
                {/* Primary CTA with smooth scroll */}
                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full h-12 bg-[#FF6A3D] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] hover:shadow-lg transition-all mb-6"
                >
                  CONTACT FIRM
                </button>

                {/* Key Stats */}
                <div className="space-y-3.5 text-[14px] mb-6">
                  <div className="flex items-center gap-2.5">
                    <Star size={17} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                    <span className="font-bold text-gray-900">{MOCK_STUDIO.rating}</span>
                    <span className="text-gray-600">rating</span>
                  </div>
                  <div className="text-gray-700 font-medium">{MOCK_STUDIO.stats.projectsCompleted}+ projects</div>
                  <div className="text-gray-700 font-medium">{MOCK_STUDIO.stats.yearsExperience} years experience</div>
                </div>

                {/* Service Areas */}
                <div className="pt-5 border-t border-gray-100 mb-5">
                  <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Service Areas</h3>
                  <div className="text-[13px] text-gray-700 leading-relaxed transition-all duration-200 ease-in-out overflow-hidden">
                    {showAllServiceAreas ? (
                      <>
                        {MOCK_STUDIO.serviceAreas.join(', ')}
                        {MOCK_STUDIO.serviceAreas.length > 3 && (
                          <button
                            onClick={() => setShowAllServiceAreas(false)}
                            className="text-[#FF6A3D] font-medium ml-1 cursor-pointer hover:underline hover:opacity-80 transition-opacity"
                            title="Show less"
                          >
                            Show less
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {MOCK_STUDIO.serviceAreas.slice(0, 3).join(', ')}
                        {MOCK_STUDIO.serviceAreas.length > 3 && (
                          <button
                            onClick={() => setShowAllServiceAreas(true)}
                            className="text-[#FF6A3D] font-medium ml-1 cursor-pointer hover:underline hover:opacity-80 transition-opacity"
                            title="View all locations"
                          >
                            +{MOCK_STUDIO.serviceAreas.length - 3}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Response Time */}
                <div className="pt-5 border-t border-gray-100 text-[13px] text-gray-700 flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  {MOCK_STUDIO.responseTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. SIMILAR FIRMS */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[28px] font-bold text-gray-900 mb-8">Similar Firms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIMILAR_FIRMS.map(firm => (
              <motion.div
                key={firm.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#FF6A3D] transition-all"
              >
                <div className="relative h-[140px] overflow-hidden">
                  <ImageWithFallback
                    src={firm.image}
                    alt={firm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-1">{firm.name}</h3>
                  <p className="text-[11px] text-gray-600 mb-2">{firm.type}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-gray-600">
                      <MapPin size={11} />
                      {firm.location}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={11} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                      <span className="text-[11px] font-bold text-gray-900">{firm.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}