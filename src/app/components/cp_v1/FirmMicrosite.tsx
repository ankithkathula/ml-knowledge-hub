/**
 * Material Library - Firm/Studio Microsite
 * Premium Professional Profile for Architecture & Design Firms
 */
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, MapPin, Globe, Star, Share2, Award, Building2,
  Package, ChevronRight, CheckCircle2, Mail, Phone, Users, Briefcase,
  Download, ArrowUpRight, Heart, Bookmark, Calendar, Target,
  TrendingUp, Shield, Clock, ExternalLink, Play, X, ChevronDown, Send,
  Home, Trees, Zap, Filter, Linkedin
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MainFooter } from './MainFooter';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FirmMicrositeProps {
  firmId: string | number;
  firmName?: string;
  onBack: () => void;
}

// Mock Firm Data
const FIRM_DATA = {
  name: 'Morphogenesis',
  tagline: 'Architecture & Urban Design Excellence',
  type: 'Architecture & Urban Design Firm',
  disciplines: ['Architecture', 'Urban Design', 'Sustainability'],
  location: 'Mumbai, Delhi, Bangalore',
  headquarters: 'Mumbai, India',
  website: 'www.morphogenesis.in',
  email: 'contact@morphogenesis.in',
  phone: '+91 22 6691 7800',
  rating: 4.8,
  reviews: 124,
  established: '2006',
  yearsExperience: 18,
  teamSize: '120+',
  projectsCompleted: '350+',
  activeCities: 15,
  bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920',
  logoImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
  verified: true,

  sectors: ['Commercial', 'Hospitality', 'Institutional', 'Residential'],
  projectScale: 'Small to Large Scale',
  deliveryType: 'Design + PMC + Turnkey Coordination',
  firmCategory: 'Full-Service Architecture Firm',

  about: 'Morphogenesis is an award-winning architecture and urban design firm with offices across India. We specialize in sustainable design, large-scale urban planning, and institutional architecture. Our design philosophy centers on creating spaces that respond to context, climate, and culture while pushing the boundaries of innovation and sustainability.',

  mission: 'To create transformative spaces that harmonize with their environment and enhance human experience through thoughtful, sustainable design.',

  stats: [
    { label: 'Projects Completed', value: '350+', icon: Building2 },
    { label: 'Team Members', value: '120+', icon: Users },
    { label: 'Cities Served', value: '15', icon: MapPin },
    { label: 'Years Experience', value: '18', icon: Calendar },
  ],

  offerings: [
    {
      id: 'architecture',
      name: 'Architecture',
      icon: Building2,
      description: 'Comprehensive architectural design from concept to completion',
      services: [
        'Architectural Design',
        'Facade Design / Engineering',
        'Heritage / Conservation Design',
        'Villa Design',
        'Apartment / Group Housing',
        'Row House Design',
        'Bungalow Design',
        'Penthouse Design'
      ],
      applicationAreas: [
        'Office Design',
        'Retail Store Design',
        'Mall Design',
        'Showroom Design',
        'Co-working Space Design',
        'Hotel Design',
        'Resort Design',
        'Restaurant Design',
        'Cafe Design',
        'School Design',
        'Hospital Planning',
        'College Campus Design',
        'Library Design',
        'Museum Design',
        'Factory Design',
        'Warehouse Design'
      ]
    },
    {
      id: 'interior-design',
      name: 'Interior Design',
      icon: Home,
      description: 'Complete interior design and space planning solutions',
      services: [
        'Interior Concept Design',
        'Kitchen & Bath Design',
        'Lighting Design',
        'Furniture Design (Custom)',
        'Exhibition / Stall Design',
        'Modular Furniture & Fitout'
      ],
      applicationAreas: [
        'Office Interior',
        'Retail Interior',
        'Restaurant Interior',
        'Hotel Room Interior',
        'Salon Interior',
        'Spa Interior',
        'Clinic Interior',
        'Hospital Ward Design',
        'Modular Kitchen',
        'Home Theater',
        'Living Room Interior',
        'Bedroom Interior'
      ]
    },
    {
      id: 'urban-design',
      name: 'Urban Design & Planning',
      icon: Target,
      description: 'Large-scale urban planning and master planning solutions',
      services: [
        'Urban Design',
        'Master Planning',
        'Town Planning',
        'Site Planning'
      ],
      applicationAreas: [
        'Township Design',
        'Smart City Planning',
        'Transit Oriented Development',
        'Mixed Use Development',
        'Urban Redevelopment',
        'Industrial Park Planning',
        'Special Economic Zone'
      ]
    },
    {
      id: 'sustainability',
      name: 'Sustainability & Energy',
      icon: Shield,
      description: 'Green building design and LEED/GRIHA certification',
      services: [
        'Energy Audit',
        'Green / Sustainable Building Design',
        'Solar / Renewable Energy Installation',
        'LEED Certification',
        'IGBC Certification',
        'GRIHA Certification'
      ],
      applicationAreas: [
        'Net Zero Building',
        'Green Campus',
        'Sustainable Resort',
        'Eco Office',
        'LEED Certified Office',
        'IGBC Building',
        'Green Retail Space',
        'Zero Energy Home'
      ]
    },
    {
      id: 'landscape',
      name: 'Landscape & Outdoor',
      icon: Trees,
      description: 'Landscape architecture and outdoor space design',
      services: [
        'Landscape Design',
        'Garden Design',
        'Hardscape Design',
        'Irrigation Design',
        'Green Roof Design'
      ],
      applicationAreas: [
        'Residential Landscape',
        'Commercial Landscape',
        'Hotel Landscape',
        'Campus Landscape',
        'Terrace Garden',
        'Rooftop Garden',
        'Urban Plaza Design'
      ]
    }
  ],

  certifications: [
    { name: 'LEED Accredited Professional', issuer: 'USGBC', year: '2010', verified: true },
    { name: 'GRIHA Certified', issuer: 'TERI', year: '2012', verified: true },
    { name: 'IGBC Member', issuer: 'Indian Green Building Council', year: '2008', verified: true },
    { name: 'COA Registered', issuer: 'Council of Architecture', year: '2006', verified: true }
  ],

  awards: [
    { name: 'Best Sustainable Project', year: '2024', issuer: 'Architecture Digest', verified: true },
    { name: 'Urban Design Excellence Award', year: '2023', issuer: 'IIA', verified: true },
    { name: 'Green Building Award', year: '2023', issuer: 'IGBC', verified: true }
  ],

  team: [
    {
      id: 1,
      name: 'Sonali Rastogi',
      role: 'Principal Architect',
      discipline: 'Architecture',
      experience: '20+ years',
      category: 'Leadership',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Manit Rastogi',
      role: 'Principal Architect',
      discipline: 'Urban Design',
      experience: '20+ years',
      category: 'Leadership',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Anuj Mittal',
      role: 'Design Director',
      discipline: 'Sustainability',
      experience: '15+ years',
      category: 'Architects',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      role: 'Senior Architect',
      discipline: 'Architecture',
      experience: '12+ years',
      category: 'Architects',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    },
    {
      id: 5,
      name: 'Amit Kumar',
      role: 'Project Manager',
      discipline: 'PMC',
      experience: '10+ years',
      category: 'Engineers',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    },
    {
      id: 6,
      name: 'Neha Gupta',
      role: 'Landscape Architect',
      discipline: 'Landscape',
      experience: '8+ years',
      category: 'Architects',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      linkedin: '#'
    }
  ],

  projects: [
    {
      id: 1,
      title: 'Pearl Academy Campus',
      category: 'Institutional',
      year: '2023',
      location: 'Delhi',
      type: 'Institutional',
      scale: '1,50,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
      description: 'Award-winning sustainable campus design with passive cooling strategies'
    },
    {
      id: 2,
      title: 'IIT Roorkee Campus',
      category: 'Institutional',
      year: '2022',
      location: 'Roorkee',
      type: 'Institutional',
      scale: '3,00,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800',
      description: 'Modern academic complex integrating traditional courtyard planning'
    },
    {
      id: 3,
      title: 'Embassy Golf Links',
      category: 'Commercial',
      year: '2024',
      location: 'Bangalore',
      type: 'Commercial',
      scale: '5,00,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      description: 'LEED Platinum certified corporate campus'
    },
    {
      id: 4,
      title: 'Infosys Pocharam',
      category: 'Commercial',
      year: '2023',
      location: 'Hyderabad',
      type: 'Commercial',
      scale: '6,50,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      description: 'Sustainable IT campus with net-zero design principles'
    },
    {
      id: 5,
      title: 'Luxury Villa Resort',
      category: 'Hospitality',
      year: '2024',
      location: 'Goa',
      type: 'Hospitality',
      scale: '80,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
      description: 'Beachfront luxury resort with sustainable design principles'
    },
    {
      id: 6,
      title: 'Premium Residences',
      category: 'Residential',
      year: '2023',
      location: 'Mumbai',
      type: 'Residential',
      scale: '2,00,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      description: 'High-rise residential tower with contemporary design'
    }
  ],

  testimonials: [
    {
      id: 1,
      client: 'Dr. Rajesh Kumar',
      company: 'IIT Roorkee',
      companyLogo: 'https://via.placeholder.com/80x40/FF6A3D/FFFFFF?text=IIT',
      project: 'IIT Roorkee Campus',
      rating: 5,
      date: 'March 2023',
      verified: true,
      text: 'Morphogenesis delivered an exceptional campus design that perfectly balances modern functionality with traditional architectural elements. Their attention to sustainability and user experience is unmatched.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      client: 'Sunita Patel',
      company: 'Embassy Group',
      companyLogo: 'https://via.placeholder.com/80x40/FF6A3D/FFFFFF?text=EMBASSY',
      project: 'Embassy Golf Links',
      rating: 5,
      date: 'January 2024',
      verified: true,
      text: 'Working with Morphogenesis was a transformative experience. They brought innovative sustainable design solutions that exceeded our LEED Platinum goals while maintaining aesthetic excellence.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      client: 'Arjun Mehta',
      company: 'Infosys',
      companyLogo: 'https://via.placeholder.com/80x40/FF6A3D/FFFFFF?text=INFOSYS',
      project: 'Infosys Pocharam',
      rating: 5,
      date: 'November 2023',
      verified: true,
      text: 'Outstanding project delivery with exceptional attention to detail. The team was professional, responsive, and delivered beyond our expectations.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    }
  ],

  serviceLocations: [
    { city: 'Mumbai', state: 'Maharashtra', type: 'Office', specialization: 'Commercial & Residential' },
    { city: 'Delhi', state: 'Delhi', type: 'Office', specialization: 'Institutional & Urban Planning' },
    { city: 'Bangalore', state: 'Karnataka', type: 'Office', specialization: 'IT Campuses & Sustainability' },
    { city: 'Pune', state: 'Maharashtra', type: 'Service', specialization: 'Commercial Projects' },
    { city: 'Hyderabad', state: 'Telangana', type: 'Service', specialization: 'IT & Commercial' },
    { city: 'Chennai', state: 'Tamil Nadu', type: 'Service', specialization: 'Institutional Projects' }
  ],

  ecosystemPartners: [
    { name: 'Saint-Gobain', type: 'Material Partner', logo: 'https://via.placeholder.com/120x60/4CAF50/FFFFFF?text=Saint-Gobain' },
    { name: 'Johnson Tiles', type: 'Material Partner', logo: 'https://via.placeholder.com/120x60/2196F3/FFFFFF?text=Johnson' },
    { name: 'Asian Paints', type: 'Material Partner', logo: 'https://via.placeholder.com/120x60/FF9800/FFFFFF?text=Asian' },
    { name: 'Hilti India', type: 'Technology Partner', logo: 'https://via.placeholder.com/120x60/F44336/FFFFFF?text=Hilti' }
  ],

  featuredIn: [
    { name: 'ArchDaily', logo: 'https://via.placeholder.com/100x50/333333/FFFFFF?text=ArchDaily' },
    { name: 'Dezeen', logo: 'https://via.placeholder.com/100x50/333333/FFFFFF?text=Dezeen' },
    { name: 'DesignBoom', logo: 'https://via.placeholder.com/100x50/333333/FFFFFF?text=DesignBoom' },
    { name: 'AD India', logo: 'https://via.placeholder.com/100x50/333333/FFFFFF?text=AD' }
  ]
};

const SECTION_TABS = ['About', 'Offerings', 'Projects', 'Team', 'Reviews', 'Contact'];
const PROJECT_FILTERS = ['All', 'Commercial', 'Residential', 'Hospitality', 'Institutional'];
const TEAM_FILTERS = ['All', 'Leadership', 'Architects', 'Interior Designers', 'Engineers', 'Sustainability Experts'];

export function FirmMicrosite({ firmId, firmName, onBack }: FirmMicrositeProps) {
  const [showAboutMore, setShowAboutMore] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<string | null>(null);
  const [expandedApplicationAreas, setExpandedApplicationAreas] = useState<{[key: string]: boolean}>({});
  const [isSaved, setIsSaved] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [activeSection, setActiveSection] = useState('About');
  const [projectFilter, setProjectFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCompany, setReviewerCompany] = useState('');

  const contactFormRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      'About': aboutRef,
      'Offerings': offeringsRef,
      'Projects': projectsRef,
      'Team': teamRef,
      'Reviews': reviewsRef,
      'Contact': contactFormRef
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Filter projects
  const filteredProjects = projectFilter === 'All'
    ? FIRM_DATA.projects
    : FIRM_DATA.projects.filter(p => p.category === projectFilter);

  // Filter team
  const filteredTeam = teamFilter === 'All'
    ? FIRM_DATA.team
    : FIRM_DATA.team.filter(t => t.category === teamFilter);

  // Auto-rotate mini testimonials with pause on hover
  useEffect(() => {
    if (isTestimonialHovered) return;

    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) =>
        prev === FIRM_DATA.testimonials.length - 1 ? 0 : prev + 1
      );
    }, 2800);
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showReviewModal]);

  // Testimonial carousel settings
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif] pt-16 md:pt-20 lg:pt-24">

      {/* ENHANCED HERO BANNER */}
      <section className="relative h-[180px] md:h-[280px] bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={FIRM_DATA.bannerImage}
          alt={FIRM_DATA.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        {/* Firm Info Overlay */}
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pb-5 md:pb-7">
            <div className="flex items-end gap-5 md:gap-6">
              {/* Logo */}
              <div className="size-[70px] md:size-[100px] bg-white rounded-xl shadow-lg p-2.5 md:p-3 flex items-center justify-center shrink-0">
                <ImageWithFallback
                  src={FIRM_DATA.logoImage}
                  alt={FIRM_DATA.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Firm Info */}
              <div className="flex-1 pb-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-white text-xl md:text-3xl font-medium uppercase tracking-tight">
                    {FIRM_DATA.name}
                  </h1>
                  {FIRM_DATA.verified && (
                    <CheckCircle2 size={18} className="text-green-400 md:block hidden" />
                  )}
                </div>

                {/* Disciplines */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5 md:mb-2">
                  {FIRM_DATA.disciplines.map((disc, idx) => (
                    <span key={idx} className="text-white/90 text-[11px] md:text-xs">
                      {disc}{idx < FIRM_DATA.disciplines.length - 1 && ' •'}
                    </span>
                  ))}
                </div>

                {/* Locations & Stats */}
                <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1 text-white/80 text-[10px] md:text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{FIRM_DATA.location}</span>
                  </div>
                  <span className="hidden md:inline text-white/40">|</span>
                  <div className="flex items-center gap-1">
                    <Building2 size={12} />
                    <span>{FIRM_DATA.projectsCompleted} Projects</span>
                  </div>
                  <span className="hidden md:inline text-white/40">|</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{FIRM_DATA.teamSize} Team</span>
                  </div>
                  <span className="hidden md:inline text-white/40">|</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{FIRM_DATA.rating} ({FIRM_DATA.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refined Floating Action Panel - Desktop */}
        <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 w-[240px]">
          <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-2xl shadow-black/10 border border-white/40">
            <button
              onClick={scrollToContact}
              className="w-full h-10 bg-[#FF6A3D] text-white rounded-lg text-[12px] font-semibold uppercase hover:bg-[#E55A2D] transition-colors mb-2.5"
            >
              Contact Firm
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-full h-9 rounded-lg text-[12px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                isSaved
                  ? 'bg-[#FFF1EB] text-[#FF6A3D] border border-[#FF6A3D]'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <Heart size={14} className={isSaved ? 'fill-[#FF6A3D]' : ''} />
              {isSaved ? 'Saved' : 'Save to Favorites'}
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE CTA */}
      <div className="lg:hidden sticky top-16 md:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <button
            onClick={scrollToContact}
            className="flex-1 h-9 bg-[#FF6A3D] text-white rounded-lg text-[11px] font-semibold uppercase hover:bg-[#E55A2D] transition-colors"
          >
            Contact Firm
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`h-9 px-3.5 rounded-lg transition-colors text-[11px] font-medium flex items-center gap-1.5 ${
              isSaved
                ? 'bg-[#FFF1EB] text-[#FF6A3D] border border-[#FF6A3D]'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <Heart size={13} className={isSaved ? 'fill-[#FF6A3D]' : ''} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* STICKY SECTION NAVIGATION */}
      <div className="sticky top-[100px] md:top-[104px] lg:top-[120px] z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {SECTION_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`px-4 md:px-5 py-3 text-[11px] md:text-xs font-medium uppercase tracking-wide whitespace-nowrap transition-all border-b-2 ${
                  activeSection === tab
                    ? 'text-[#FF6A3D] border-[#FF6A3D]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PREMIUM STATS STRIP */}
      <div className="bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6 md:py-7">
          <div className="flex items-center justify-around divide-x divide-gray-200">
            {FIRM_DATA.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex-1 text-center px-4 first:pl-0 last:pr-0">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon size={16} className="text-[#FF6A3D] hidden md:block" />
                    <div className="text-2xl md:text-3xl font-medium text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-[10px] md:text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-12">

        {/* ABOUT SECTION WITH METADATA */}
        <section ref={aboutRef} className="mb-12 md:mb-16 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* LEFT: Title + Metadata */}
            <div className="lg:col-span-4">
              <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-4">
                About Us
              </h2>

              {/* Metadata Blocks */}
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Sectors
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {FIRM_DATA.sectors.map((sector, idx) => (
                      <span key={idx} className="text-xs text-gray-700">
                        {sector}{idx < FIRM_DATA.sectors.length - 1 && ' •'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Project Scale
                  </div>
                  <div className="text-xs text-gray-700">
                    {FIRM_DATA.projectScale}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Delivery Type
                  </div>
                  <div className="text-xs text-gray-700">
                    {FIRM_DATA.deliveryType}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Firm Category
                  </div>
                  <div className="text-xs text-gray-700">
                    {FIRM_DATA.firmCategory}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Description */}
            <div className="lg:col-span-8">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                {showAboutMore ? FIRM_DATA.about : FIRM_DATA.about.slice(0, 280) + '...'}
              </p>
              {!showAboutMore && (
                <button
                  onClick={() => setShowAboutMore(true)}
                  className="text-[#FF6A3D] font-medium text-xs hover:underline"
                >
                  Read More
                </button>
              )}
              {showAboutMore && (
                <div className="mt-5 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                    Our Mission
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {FIRM_DATA.mission}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SERVICE LOCATIONS */}
        <section className="mb-12 md:mb-16 bg-gradient-to-br from-gray-50/50 to-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1.5">
            Service Locations
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Our offices and service areas across India
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {FIRM_DATA.serviceLocations.map((location, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#FF6A3D]/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="size-9 bg-[#FFF1EB] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#FF6A3D] transition-colors">
                    <MapPin size={16} className="text-[#FF6A3D] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">
                      {location.city}
                    </div>
                    <div className="text-[10px] text-gray-500 mb-1.5">
                      {location.state}
                    </div>
                    <div className={`text-[10px] font-bold uppercase mb-1 ${
                      location.type === 'Office' ? 'text-[#FF6A3D]' : 'text-gray-600'
                    }`}>
                      {location.type}
                    </div>
                    <div className="text-[10px] text-gray-600 leading-relaxed">
                      {location.specialization}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OFFERINGS - DATABASE-DRIVEN */}
        <section ref={offeringsRef} className="mb-12 md:mb-16 scroll-mt-32">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1.5">
            Offerings
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Our core disciplines and service offerings
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIRM_DATA.offerings.map((offering, idx) => {
              const Icon = offering.icon;
              const isExpanded = selectedOffering === offering.id;
              const showAllAreas = expandedApplicationAreas[offering.id] || false;
              const MAX_VISIBLE_AREAS = 8;
              const visibleAreas = showAllAreas
                ? offering.applicationAreas
                : offering.applicationAreas.slice(0, MAX_VISIBLE_AREAS);
              const remainingCount = offering.applicationAreas.length - MAX_VISIBLE_AREAS;

              return (
                <motion.div
                  key={offering.id}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
                >
                  {/* Header */}
                  <div
                    className="p-5 pb-4 cursor-pointer"
                    onClick={() => setSelectedOffering(isExpanded ? null : offering.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-11 bg-[#FFF1EB] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#FF6A3D] transition-colors">
                        <Icon size={20} className="text-[#FF6A3D] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {offering.name}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {offering.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div className="px-5 pb-4 border-t border-gray-100">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 mt-3">
                      Services
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {offering.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-md text-[10px] font-medium border border-gray-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Application Areas Section */}
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 mt-3">
                      Application Areas
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {visibleAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#FFF1EB] text-[#FF6A3D] rounded-full text-[10px] font-semibold"
                        >
                          {area}
                        </span>
                      ))}
                      {!showAllAreas && remainingCount > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedApplicationAreas({
                              ...expandedApplicationAreas,
                              [offering.id]: true
                            });
                          }}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold hover:bg-gray-200 transition-colors"
                        >
                          +{remainingCount} More
                        </button>
                      )}
                      {showAllAreas && offering.applicationAreas.length > MAX_VISIBLE_AREAS && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedApplicationAreas({
                              ...expandedApplicationAreas,
                              [offering.id]: false
                            });
                          }}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FEATURED PROJECTS WITH FILTERS */}
        <section ref={projectsRef} className="mb-12 md:mb-16 scroll-mt-32 bg-gradient-to-br from-gray-50/30 to-white rounded-2xl p-6 md:p-8 border border-gray-50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1.5">
                Featured Projects
              </h2>
              <p className="text-xs text-gray-500">
                Showcase of our recent work
              </p>
            </div>

            {/* Project Filters */}
            <div className="hidden md:flex items-center gap-2">
              {PROJECT_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wide transition-all ${
                    projectFilter === filter
                      ? 'bg-[#FF6A3D] text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Large Featured Project */}
            <motion.div
              whileHover={{ y: -4 }}
              className="lg:col-span-2 group relative h-[380px] rounded-xl overflow-hidden cursor-pointer"
            >
              <ImageWithFallback
                src={filteredProjects[0]?.image}
                alt={filteredProjects[0]?.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-[#FF6A3D] text-white rounded-md text-[10px] font-bold uppercase">
                    {filteredProjects[0]?.type}
                  </span>
                  <span className="text-white/80 text-xs">
                    {filteredProjects[0]?.year}
                  </span>
                  <span className="text-white/60 text-xs">
                    • {filteredProjects[0]?.scale}
                  </span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-1.5">
                  {filteredProjects[0]?.title}
                </h3>
                <p className="text-white/90 text-sm mb-2 line-clamp-2">
                  {filteredProjects[0]?.description}
                </p>
                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                  <MapPin size={12} />
                  <span>{filteredProjects[0]?.location}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="size-11 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <ArrowUpRight size={20} className="text-gray-900" />
                </div>
              </div>
            </motion.div>

            {/* Smaller Projects Grid */}
            <div className="space-y-4">
              {filteredProjects.slice(1, 4).map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -3 }}
                  className="group relative h-[120px] rounded-xl overflow-hidden cursor-pointer"
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded text-[9px] font-bold uppercase">
                        {project.type}
                      </span>
                      <span className="text-white/70 text-[10px]">
                        {project.year}
                      </span>
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-0.5 line-clamp-1">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-1 text-white/80 text-[10px]">
                      <MapPin size={10} />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ArrowUpRight size={14} className="text-gray-900" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR TEAM WITH FILTERS */}
        <section ref={teamRef} className="mb-12 md:mb-16 scroll-mt-32">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1.5">
                Our Team
              </h2>
              <p className="text-xs text-gray-500">
                Meet the professionals behind our work
              </p>
            </div>

            {/* Team Filters - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {['All', 'Leadership', 'Architects', 'Engineers'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTeamFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wide transition-all ${
                    teamFilter === filter
                      ? 'bg-[#FF6A3D] text-white'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {filteredTeam.slice(0, showAllTeam ? filteredTeam.length : 6).map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <div className="relative mb-2.5 aspect-square rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={member.linkedin}
                      className="size-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#0A66C2] hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-gray-900 mb-0.5 truncate">
                  {member.name}
                </h4>
                <p className="text-[10px] text-gray-600 truncate">
                  {member.role}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>

          {filteredTeam.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllTeam(!showAllTeam)}
                className="px-6 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold uppercase border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all"
              >
                {showAllTeam ? 'Show Less' : 'View All Team Members'}
              </button>
            </div>
          )}
        </section>

        {/* CERTIFICATIONS & AWARDS - COMPACT LAYOUT */}
        <section className="mb-12 md:mb-16 bg-gradient-to-br from-gray-50/50 to-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1.5">
            Certifications & Awards
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Recognition and professional credentials
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Certifications */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Certifications
              </h3>
              <div className="space-y-2">
                {FIRM_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="size-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 mb-0.5 truncate">
                          {cert.name}
                        </h4>
                        <p className="text-[10px] text-gray-600">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    </div>
                    {cert.verified && (
                      <div className="flex items-center gap-0.5 px-2 py-1 bg-green-50 text-green-700 rounded-md shrink-0">
                        <CheckCircle2 size={9} />
                        <span className="text-[8px] font-bold uppercase tracking-wide">Verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Awards & Recognition
              </h3>
              <div className="space-y-2">
                {FIRM_DATA.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-amber-50/50 to-white border border-amber-100 rounded-lg p-3 hover:shadow-sm transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="size-9 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center shrink-0">
                        <Award size={16} className="text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 mb-0.5 truncate">
                          {award.name}
                        </h4>
                        <p className="text-[10px] text-gray-600">
                          {award.issuer} • {award.year}
                        </p>
                      </div>
                    </div>
                    {award.verified && (
                      <div className="flex items-center gap-0.5 px-2 py-1 bg-green-50 text-green-700 rounded-md shrink-0">
                        <CheckCircle2 size={9} />
                        <span className="text-[8px] font-bold uppercase tracking-wide">Verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT TESTIMONIALS - HORIZONTAL SCROLLING RAIL */}
        <section
          ref={reviewsRef}
          className="mb-8 md:mb-10 scroll-mt-32 relative"
        >
          {/* Header with Rating Summary */}
          <div className="flex items-start justify-between mb-5 px-6">
            <div>
              <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-1">
                Client Testimonials
              </h2>
              <p className="text-xs text-gray-600">
                What clients say about working with {FIRM_DATA.name}
              </p>
            </div>

            {/* Rating Summary Card - Compact */}
            <div className="hidden md:block">
              <div className="bg-white border border-gray-200/60 rounded-lg p-2.5 shadow-sm min-w-[130px]">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <div className="text-xl font-semibold text-gray-900">
                    {FIRM_DATA.rating}
                  </div>
                  <div className="text-[9px] text-gray-500">/ 5.0</div>
                </div>
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={`${
                        i < Math.floor(FIRM_DATA.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[9px] text-gray-600 mb-1.5">
                  {FIRM_DATA.reviews} Verified Reviews
                </div>
                <div className="pt-1.5 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Shield size={9} className="text-green-600" />
                    <span className="text-[8px] font-semibold text-gray-700">Trusted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Rail Container */}
          <div className="relative">
            {/* Fade Gradient Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
            >
              <motion.div
                className="flex gap-4"
                animate={{
                  x: isTestimonialHovered ? 0 : [0, -1920]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear"
                  }
                }}
              >
                {/* Duplicate testimonials for infinite loop */}
                {[...FIRM_DATA.testimonials, ...FIRM_DATA.testimonials].map((testimonial, idx) => {
                  const isActive = idx % FIRM_DATA.testimonials.length === activeTestimonialIndex;
                  return (
                    <motion.div
                      key={`testimonial-${idx}`}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`flex-shrink-0 w-[420px] bg-white border rounded-xl p-5 transition-all duration-300 ${
                        isActive
                          ? 'border-[#FF6A3D]/40 shadow-lg'
                          : 'border-gray-200/60 shadow-md hover:shadow-lg'
                      }`}
                      style={{
                        borderLeftWidth: isActive ? '3px' : '1px',
                        borderLeftColor: isActive ? '#FF6A3D' : undefined
                      }}
                    >
                      {/* Top Row: Rating & Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={`${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {testimonial.verified && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full">
                            <CheckCircle2 size={8} />
                            <span className="text-[8px] font-bold uppercase tracking-wide">Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Quote Mark & Text */}
                      <div className="relative mb-4">
                        <div className="absolute -top-1 -left-1 text-4xl font-serif text-[#FF6A3D]/8 leading-none select-none">
                          "
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed italic line-clamp-3 relative z-10">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.client}
                          className="size-10 rounded-full object-cover ring-2 ring-white shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-900 truncate">
                            {testimonial.client}
                          </div>
                          <div className="text-[10px] text-gray-600 truncate">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Project Metadata */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
                          <Building2 size={9} className="text-[#FF6A3D]" />
                          <span className="font-medium">Project:</span>
                          <span className="truncate">{testimonial.project}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Target size={9} className="text-gray-400" />
                            <span>Architecture</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar size={9} />
                            <span>{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Write Review CTA */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-colors"
            >
              Write a Review
            </button>
          </div>
        </section>

        {/* REVIEW MODAL */}
        <AnimatePresence>
          {showReviewModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReviewModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Share your experience with {FIRM_DATA.name}</p>
                    </div>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X size={18} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="px-6 py-6 space-y-5">
                    {/* Rating */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Your Rating *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={32}
                              className={`${
                                star <= reviewRating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-200'
                              }`}
                            />
                          </button>
                        ))}
                        {reviewRating > 0 && (
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {reviewRating} {reviewRating === 1 ? 'Star' : 'Stars'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Your Review *
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={5}
                        placeholder="Tell us about your experience working with this firm..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1.5">
                        Your feedback helps other users discover trusted professionals
                      </p>
                    </div>

                    {/* Reviewer Name */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g., John Smith"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all"
                      />
                    </div>

                    {/* Reviewer Company */}
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={reviewerCompany}
                        onChange={(e) => setReviewerCompany(e.target.value)}
                        placeholder="e.g., XYZ Corporation"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle review submission
                        if (reviewRating > 0 && reviewText.trim() && reviewerName.trim()) {
                          // Success feedback
                          alert('Thank you for your review! It will be published after verification.');
                          setShowReviewModal(false);
                          setReviewRating(0);
                          setReviewText('');
                          setReviewerName('');
                          setReviewerCompany('');
                        } else {
                          alert('Please fill in all required fields (Rating, Review, and Name)');
                        }
                      }}
                      disabled={reviewRating === 0 || !reviewText.trim() || !reviewerName.trim()}
                      className="px-6 py-2.5 bg-[#FF6A3D] text-white rounded-lg text-sm font-semibold hover:bg-[#E55A2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={14} />
                      Submit Review
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CONTACT SECTION - ENHANCED */}
        <section ref={contactFormRef} className="mb-12 md:mb-16 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Contact Info & Trust Signals */}
            <div className="lg:col-span-5">
              <h2 className="text-lg md:text-xl font-medium text-gray-900 uppercase tracking-tight mb-4">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                Have a project in mind? We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 bg-[#FFF1EB] rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#FF6A3D]" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-0.5">Email</div>
                    <div className="text-sm font-semibold text-gray-900">{FIRM_DATA.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-10 bg-[#FFF1EB] rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#FF6A3D]" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-0.5">Phone</div>
                    <div className="text-sm font-semibold text-gray-900">{FIRM_DATA.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-10 bg-[#FFF1EB] rounded-lg flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-[#FF6A3D]" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-0.5">Website</div>
                    <div className="text-sm font-semibold text-gray-900">{FIRM_DATA.website}</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-green-900 mb-1">
                        Trusted by 350+ Clients
                      </div>
                      <div className="text-[11px] text-green-700">
                        Average response within 12 hours
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2.5">
                    <Star size={16} className="text-blue-600 mt-0.5 shrink-0 fill-blue-600" />
                    <div>
                      <div className="text-xs font-semibold text-blue-900 mb-1">
                        {FIRM_DATA.rating} Rating • {FIRM_DATA.reviews} Reviews
                      </div>
                      <div className="text-[11px] text-blue-700">
                        Free initial consultation available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Profile */}
              <div className="mt-6">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg text-xs font-semibold uppercase hover:bg-gray-50 hover:border-gray-400 transition-all">
                  <Download size={16} />
                  Download Company Profile
                </button>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder=" "
                      className="peer w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all"
                    />
                    <label className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#FF6A3D] peer-focus:bg-white peer-focus:px-1">
                      Full Name *
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder=" "
                      className="peer w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all"
                    />
                    <label className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#FF6A3D] peer-focus:bg-white peer-focus:px-1">
                      Email Address *
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder=" "
                      className="peer w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all"
                    />
                    <label className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#FF6A3D] peer-focus:bg-white peer-focus:px-1">
                      Phone Number *
                    </label>
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all text-gray-500">
                      <option>Select Project Type *</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Institutional</option>
                      <option>Industrial</option>
                      <option>Hospitality</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all text-gray-500">
                    <option>Select Budget Range</option>
                    <option>Under ₹50 Lakhs</option>
                    <option>₹50 Lakhs - ₹1 Crore</option>
                    <option>₹1 Crore - ₹5 Crores</option>
                    <option>₹5 Crores - ₹10 Crores</option>
                    <option>Above ₹10 Crores</option>
                  </select>
                </div>

                <div className="mb-6 relative">
                  <textarea
                    rows={5}
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] transition-all resize-none"
                  />
                  <label className="absolute left-3 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#FF6A3D] peer-focus:bg-white peer-focus:px-1">
                    Tell us about your project requirements *
                  </label>
                </div>

                <button className="w-full h-12 bg-[#FF6A3D] text-white rounded-lg text-sm font-semibold uppercase hover:bg-[#E55A2D] transition-colors flex items-center justify-center gap-2">
                  <Send size={16} />
                  Send Inquiry
                </button>

                <p className="text-[10px] text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* BOTTOM CTA BANNER */}
      <section className="bg-gray-900 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
          alt="CTA background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-14 md:py-18 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-white uppercase tracking-tight mb-3">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Let's create something extraordinary together. Get in touch with our team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6A3D] text-white rounded-lg text-sm font-semibold uppercase hover:bg-[#E55A2D] transition-colors"
            >
              Contact Us
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg text-sm font-semibold uppercase hover:bg-white/20 transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
