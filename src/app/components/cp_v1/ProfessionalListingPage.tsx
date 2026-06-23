/**
 * Professional Listing Page - Premium Discovery Experience
 * Editorial, architecture-focused, contextual professional discovery
 */
import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  MapPin,
  Star,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- Types ---

interface Professional {
  id: number;
  name: string;
  type: string;
  disciplines: string[];
  practices: string[];
  applicationAreas: string[];
  serviceAreas: string[];
  experience: number;
  location: string;
  bannerImage: string;
  profileImage?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  projectCount?: number;
}

interface ProfessionalListingPageProps {
  onBack?: () => void;
  onProfessionalClick?: (professionalId: number, professionalType: 'firm' | 'studio' | 'individual') => void;
}

// --- Database-Driven Mapping ---

const DISCIPLINES = [
  'Architecture',
  'Interior Design',
  'Landscape & Outdoor',
  'Structural Engineering',
  'Civil Engineering & Construction',
  'MEP Systems',
  'Sustainability & Energy',
  'Safety, Fire & Security',
  'Planning & Advisory',
  'Visualization & BIM',
  'Surveying & Testing',
  'Design-Build & Turnkey'
];

const DISCIPLINE_MAPPING: { [key: string]: { practices: string[], applicationAreas: string[], serviceAreas: string[] } } = {
  'Architecture': {
    practices: [
      'Architecture Firm',
      'Heritage / Conservation Architecture Firm',
      'Green / Sustainable Architecture Firm',
      'Boutique Architecture Studio',
      'Urban Design Firm',
      'Facade Design Consultancy'
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
    ],
    serviceAreas: [
      'Architectural Design',
      'Facade Design / Engineering',
      'Heritage / Conservation Design',
      'Villa Design',
      'Apartment / Group Housing',
      'Row House Design',
      'Bungalow Design'
    ]
  },
  'Interior Design': {
    practices: [
      'Interior Design Studio',
      'Modular Kitchen Specialist',
      'Retail Interior Consultant',
      'Hospitality Interior Firm',
      'Residential Interior Designer'
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
    ],
    serviceAreas: [
      'Interior Concept Design',
      'Kitchen & Bath Design',
      'Lighting Design',
      'Furniture Design (Custom)',
      'Exhibition / Stall Design',
      'Modular Furniture & Fitout'
    ]
  },
  'Landscape & Outdoor': {
    practices: [
      'Landscape Architecture Firm',
      'Garden Design Studio',
      'Hardscape Specialist'
    ],
    applicationAreas: [
      'Garden Design',
      'Outdoor Living Spaces',
      'Terrace Garden',
      'Rooftop Garden',
      'Parks & Recreation',
      'Urban Plaza Design'
    ],
    serviceAreas: [
      'Landscape Design',
      'Hardscape Design',
      'Irrigation Systems',
      'Green Walls',
      'Water Features'
    ]
  },
  'Sustainability & Energy': {
    practices: [
      'Green Building Consultancy',
      'Energy Audit Firm',
      'Solar Consultancy',
      'LEED Consultancy'
    ],
    applicationAreas: [
      'Green Building Certification',
      'Energy Modeling',
      'Renewable Energy Design',
      'Sustainable Materials Consulting'
    ],
    serviceAreas: [
      'LEED Certification',
      'IGBC Certification',
      'GRIHA Certification',
      'Energy Audit',
      'Daylight Analysis',
      'Carbon Footprint Analysis'
    ]
  },
  'Structural Engineering': {
    practices: [
      'Structural Engineering Firm',
      'Seismic Consultancy',
      'Foundation Engineering Firm'
    ],
    applicationAreas: [
      'Structural Design',
      'Structural Analysis',
      'Seismic Design',
      'Foundation Engineering'
    ],
    serviceAreas: [
      'RCC Design',
      'Steel Structure Design',
      'Seismic Analysis',
      'Foundation Design',
      'Structural Audit'
    ]
  },
  'MEP Systems': {
    practices: [
      'MEP Consultancy',
      'HVAC Experts',
      'Electrical Consultants',
      'Plumbing Consultancy'
    ],
    applicationAreas: [
      'HVAC Design',
      'Electrical System Design',
      'Plumbing System Design',
      'Fire Fighting System'
    ],
    serviceAreas: [
      'HVAC Design',
      'Electrical Design',
      'Plumbing Design',
      'Fire Protection Design',
      'BMS Design'
    ]
  },
  'Visualization & BIM': {
    practices: [
      '3D Visualization Studio',
      'BIM Consultancy',
      'VR / AR Studio',
      'Rendering Studio'
    ],
    applicationAreas: [
      '3D Rendering',
      'Walkthrough Animation',
      'VR Visualization',
      'BIM Modeling'
    ],
    serviceAreas: [
      'Exterior Rendering',
      'Interior Rendering',
      'Walkthrough Video',
      'VR Experience',
      'BIM Coordination'
    ]
  },
  'Civil Engineering & Construction': {
    practices: [
      'Civil Engineering Consultancy',
      'Construction Management Firm',
      'Project Management Consultancy'
    ],
    applicationAreas: [
      'Construction Management',
      'Project Planning',
      'Site Supervision',
      'Quality Control'
    ],
    serviceAreas: [
      'Civil Design',
      'Construction Planning',
      'Project Coordination',
      'Site Management'
    ]
  }
};

const LOCATIONS = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

// --- Hero Slides ---

const BANNER_SLIDES = [
  {
    id: 1,
    heading: "Find the Right Professionals for Your Project",
    subtext: "Discover architects, consultants, studios, and technical experts across India",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    cta: "Explore Professionals"
  },
  {
    id: 2,
    heading: "Verified Architecture & Design Experts",
    subtext: "Connect with premium studios and specialized consultants",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1920",
    cta: "Browse Directory"
  },
  {
    id: 3,
    heading: "BIM & Visualization Specialists",
    subtext: "Find cutting-edge technology partners for your architectural projects",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1920",
    cta: "View Experts"
  }
];

// --- Mock Data ---

const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: 'Morphogenesis',
    type: 'Architecture Firm',
    disciplines: ['Architecture', 'Sustainability & Energy'],
    practices: ['Architecture Firm', 'Urban Design Firm'],
    applicationAreas: ['Office Design', 'Hotel Design', 'School Design', 'Museum Design'],
    serviceAreas: ['Architectural Design', 'Facade Design / Engineering'],
    experience: 18,
    location: 'Mumbai, Maharashtra',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    projectCount: 350
  },
  {
    id: 2,
    name: 'Design Axis Architects',
    type: 'Architecture Firm',
    disciplines: ['Architecture', 'Interior Design'],
    practices: ['Architecture Firm', 'Boutique Architecture Studio'],
    applicationAreas: ['Villa Design', 'Retail Store Design', 'Office Interior', 'Restaurant Interior'],
    serviceAreas: ['Architectural Design', 'Interior Concept Design'],
    experience: 12,
    location: 'Bangalore, Karnataka',
    bannerImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    projectCount: 180
  },
  {
    id: 3,
    name: 'Green Scape Design',
    type: 'Landscape Architecture Firm',
    disciplines: ['Landscape & Outdoor'],
    practices: ['Landscape Architecture Firm', 'Garden Design Studio'],
    applicationAreas: ['Garden Design', 'Rooftop Garden', 'Parks & Recreation'],
    serviceAreas: ['Landscape Design', 'Hardscape Design', 'Green Walls'],
    experience: 10,
    location: 'Pune, Maharashtra',
    bannerImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    reviewCount: 72,
    verified: true,
    projectCount: 125
  },
  {
    id: 4,
    name: 'Vision Architects',
    type: 'Architecture Firm',
    disciplines: ['Architecture'],
    practices: ['Architecture Firm', 'Green / Sustainable Architecture Firm'],
    applicationAreas: ['Apartment / Group Housing', 'Office Design', 'School Design'],
    serviceAreas: ['Architectural Design', 'Villa Design'],
    experience: 15,
    location: 'Delhi NCR',
    bannerImage: 'https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.5,
    reviewCount: 95,
    verified: true,
    projectCount: 210
  },
  {
    id: 5,
    name: 'EcoBuild Consultants',
    type: 'Green Building Consultancy',
    disciplines: ['Sustainability & Energy'],
    practices: ['Green Building Consultancy', 'LEED Consultancy'],
    applicationAreas: ['Green Building Certification', 'Energy Modeling'],
    serviceAreas: ['LEED Certification', 'IGBC Certification', 'Energy Audit'],
    experience: 10,
    location: 'Bangalore',
    bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    reviewCount: 78,
    verified: true,
    projectCount: 95
  },
  {
    id: 6,
    name: 'Heritage Design Associates',
    type: 'Heritage / Conservation Architecture Firm',
    disciplines: ['Architecture'],
    practices: ['Heritage / Conservation Architecture Firm'],
    applicationAreas: ['Museum Design', 'Library Design', 'College Campus Design'],
    serviceAreas: ['Heritage / Conservation Design', 'Architectural Design'],
    experience: 20,
    location: 'Jaipur',
    bannerImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    reviewCount: 56,
    verified: true,
    projectCount: 85
  },
  {
    id: 7,
    name: 'Urban Grid Planners',
    type: 'Urban Design Firm',
    disciplines: ['Architecture'],
    practices: ['Urban Design Firm', 'Architecture Firm'],
    applicationAreas: ['College Campus Design', 'Hospital Planning', 'Office Design'],
    serviceAreas: ['Architectural Design', 'Facade Design / Engineering'],
    experience: 14,
    location: 'Hyderabad',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    reviewCount: 91,
    verified: true,
    projectCount: 175
  },
  {
    id: 8,
    name: 'Spaces & Design',
    type: 'Interior Design Studio',
    disciplines: ['Interior Design'],
    practices: ['Interior Design Studio', 'Residential Interior Designer'],
    applicationAreas: ['Office Interior', 'Retail Interior', 'Modular Kitchen', 'Living Room Interior'],
    serviceAreas: ['Interior Concept Design', 'Kitchen & Bath Design', 'Lighting Design'],
    experience: 8,
    location: 'Chennai',
    bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.5,
    reviewCount: 67,
    verified: true,
    projectCount: 145
  },
  {
    id: 9,
    name: 'BIM Tech Solutions',
    type: '3D Visualization Studio',
    disciplines: ['Visualization & BIM'],
    practices: ['3D Visualization Studio', 'BIM Consultancy'],
    applicationAreas: ['3D Rendering', 'Walkthrough Animation', 'BIM Modeling'],
    serviceAreas: ['Exterior Rendering', 'Interior Rendering', 'BIM Coordination'],
    experience: 6,
    location: 'Noida',
    bannerImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    reviewCount: 54,
    verified: true,
    projectCount: 320
  },
  {
    id: 10,
    name: 'Structural Dynamics',
    type: 'Structural Engineering Firm',
    disciplines: ['Structural Engineering'],
    practices: ['Structural Engineering Firm', 'Seismic Consultancy'],
    applicationAreas: ['Structural Design', 'Seismic Design', 'Foundation Engineering'],
    serviceAreas: ['RCC Design', 'Steel Structure Design', 'Seismic Analysis'],
    experience: 16,
    location: 'Mumbai',
    bannerImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    reviewCount: 103,
    verified: true,
    projectCount: 240
  },
  {
    id: 11,
    name: 'Facade Innovators',
    type: 'Facade Design Consultancy',
    disciplines: ['Architecture'],
    practices: ['Facade Design Consultancy', 'Architecture Firm'],
    applicationAreas: ['Office Design', 'Hotel Design', 'Mall Design', 'Showroom Design'],
    serviceAreas: ['Facade Design / Engineering', 'Architectural Design'],
    experience: 11,
    location: 'Gurgaon',
    bannerImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    reviewCount: 82,
    verified: true,
    projectCount: 160
  },
  {
    id: 12,
    name: 'MEP Solutions India',
    type: 'MEP Consultancy',
    disciplines: ['MEP Systems'],
    practices: ['MEP Consultancy', 'HVAC Experts'],
    applicationAreas: ['HVAC Design', 'Electrical System Design', 'Fire Fighting System'],
    serviceAreas: ['HVAC Design', 'Electrical Design', 'Fire Protection Design'],
    experience: 13,
    location: 'Bangalore',
    bannerImage: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&q=80&w=1200',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    reviewCount: 88,
    verified: true,
    projectCount: 195
  }
];

// Custom Arrow Components
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-10 size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
    >
      <ChevronLeft size={20} className="text-white" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-10 size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
    >
      <ChevronRight size={20} className="text-white" />
    </button>
  );
};

// --- Component ---

export default function ProfessionalListingPage({
  onBack,
  onProfessionalClick
}: ProfessionalListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);
  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState<string[]>([]);
  const [selectedServiceAreas, setSelectedServiceAreas] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Get contextual filters based on selected discipline
  const contextualFilters = useMemo(() => {
    if (!selectedDiscipline) return null;

    const mapping = DISCIPLINE_MAPPING[selectedDiscipline];
    if (!mapping) return null;

    return {
      practices: mapping.practices,
      applicationAreas: mapping.applicationAreas,
      serviceAreas: mapping.serviceAreas
    };
  }, [selectedDiscipline]);

  // Handle discipline selection - SINGLE SELECTION ONLY
  const handleDisciplineSelect = (discipline: string) => {
    if (selectedDiscipline === discipline) {
      // Deselect
      setSelectedDiscipline(null);
      setSelectedPractices([]);
      setSelectedApplicationAreas([]);
      setSelectedServiceAreas([]);
    } else {
      // Select new discipline and AUTO-PRESELECT practices and application areas
      setSelectedDiscipline(discipline);
      const mapping = DISCIPLINE_MAPPING[discipline];
      if (mapping) {
        setSelectedPractices(mapping.practices);
        setSelectedApplicationAreas(mapping.applicationAreas);
        setSelectedServiceAreas([]); // Service areas NOT preselected
      }
    }
  };

  // Filter professionals
  const filteredProfessionals = useMemo(() => {
    let filtered = MOCK_PROFESSIONALS;

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(prof =>
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.disciplines.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prof.practices.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prof.serviceAreas.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Location
    if (selectedLocation) {
      filtered = filtered.filter(prof => prof.location.includes(selectedLocation));
    }

    // Discipline
    if (selectedDiscipline) {
      filtered = filtered.filter(prof =>
        prof.disciplines.includes(selectedDiscipline)
      );
    }

    // Practices
    if (selectedPractices.length > 0) {
      filtered = filtered.filter(prof =>
        prof.practices.some(p => selectedPractices.includes(p))
      );
    }

    // Application Areas
    if (selectedApplicationAreas.length > 0) {
      filtered = filtered.filter(prof =>
        prof.applicationAreas.some(a => selectedApplicationAreas.includes(a))
      );
    }

    // Service Areas
    if (selectedServiceAreas.length > 0) {
      filtered = filtered.filter(prof =>
        prof.serviceAreas.some(s => selectedServiceAreas.includes(s))
      );
    }

    // Verified
    if (verifiedOnly) {
      filtered = filtered.filter(prof => prof.verified);
    }

    return filtered;
  }, [
    searchQuery,
    selectedLocation,
    selectedDiscipline,
    selectedPractices,
    selectedApplicationAreas,
    selectedServiceAreas,
    verifiedOnly
  ]);

  // Banner slider settings
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots: any) => (
      <div style={{ bottom: '20px' }}>
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-white/50 rounded-full hover:bg-white transition-all" />
    )
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif]">
      {/* HERO BANNER - SHORT CINEMATIC STRIP */}
      <div className="relative h-[350px] overflow-hidden">
        <Slider {...bannerSettings}>
          {BANNER_SLIDES.map(slide => (
            <div key={slide.id} className="relative h-[350px]">
              <ImageWithFallback
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              {/* LEFT-ALIGNED CONTENT */}
              <div className="absolute inset-0 flex items-center px-12">
                <div className="max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-light text-white mb-3 uppercase tracking-tight leading-tight"
                  >
                    {slide.heading}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base text-white/90 mb-6 leading-relaxed"
                  >
                    {slide.subtext}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="px-7 py-3 bg-[#FF6A3D] text-white rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-[#E55A2D] transition-colors shadow-xl"
                  >
                    {slide.cta}
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* MAIN CONTENT - 2 COLUMN LAYOUT */}
      <div className="max-w-[1600px] mx-auto px-6 py-10 flex gap-10">
        {/* LEFT SIDEBAR - STICKY FILTERS */}
        <div className="w-[260px] shrink-0">
          <div className="sticky top-6 space-y-8">
            {/* Disciplines */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Disciplines
              </h3>
              <div
                className="space-y-2 max-h-[550px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {DISCIPLINES.map(discipline => (
                  <button
                    key={discipline}
                    onClick={() => handleDisciplineSelect(discipline)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedDiscipline === discipline
                        ? 'bg-[#FF6A3D] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-[#FF6A3D] hover:text-[#FF6A3D]'
                    }`}
                  >
                    {discipline}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  verifiedOnly
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-green-300'
                }`}
              >
                <CheckCircle2 size={16} className={verifiedOnly ? 'text-green-600' : 'text-gray-400'} />
                <span>Verified Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1">
          {/* TOP SECTION - HEADER + LOCATION + SEARCH */}
          <div className="mb-10">
            {/* Header Row with Location */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-normal text-gray-900 uppercase tracking-tight mb-2">
                  Discover Professionals
                </h2>
                <p className="text-sm text-gray-600">
                  Browse verified studios, consultants, and project experts
                </p>
              </div>

              {/* Location Selector */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-[#FF6A3D] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 transition-all cursor-pointer"
                >
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Premium Search Bar */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search professionals, services, disciplines, or practices..."
                className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Contextual Discipline Mapping */}
          <AnimatePresence>
            {contextualFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 space-y-6"
              >
                {/* Practices */}
                {contextualFilters.practices.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Practices
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {contextualFilters.practices.map(practice => (
                        <button
                          key={practice}
                          onClick={() => {
                            setSelectedPractices(prev =>
                              prev.includes(practice)
                                ? prev.filter(p => p !== practice)
                                : [...prev, practice]
                            );
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                            selectedPractices.includes(practice)
                              ? 'bg-[#FF6A3D] text-white shadow-md'
                              : 'bg-white border border-gray-300 text-gray-700 hover:border-[#FF6A3D]'
                          }`}
                        >
                          {practice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Application Areas */}
                {contextualFilters.applicationAreas.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Application Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {contextualFilters.applicationAreas.map(area => (
                        <button
                          key={area}
                          onClick={() => {
                            setSelectedApplicationAreas(prev =>
                              prev.includes(area)
                                ? prev.filter(a => a !== area)
                                : [...prev, area]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedApplicationAreas.includes(area)
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Areas */}
                {contextualFilters.serviceAreas.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Service Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {contextualFilters.serviceAreas.map(service => (
                        <button
                          key={service}
                          onClick={() => {
                            setSelectedServiceAreas(prev =>
                              prev.includes(service)
                                ? prev.filter(s => s !== service)
                                : [...prev, service]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            selectedServiceAreas.includes(service)
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProfessionals.length}</span> professionals found
            </p>
          </div>

          {/* Professional Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map(professional => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer group"
                onClick={() => onProfessionalClick?.(professional.id, 'firm')}
              >
                {/* Banner Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={professional.bannerImage}
                    alt={professional.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Verified Badge */}
                  {professional.verified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                      <CheckCircle2 size={12} className="text-green-600" />
                      <span className="text-[9px] font-bold text-gray-900 uppercase tracking-wide">Verified</span>
                    </div>
                  )}

                  {/* Profile Image Overlay */}
                  {professional.profileImage && (
                    <div className="absolute -bottom-6 left-5">
                      <ImageWithFallback
                        src={professional.profileImage}
                        alt={professional.name}
                        className="size-14 rounded-full border-3 border-white shadow-xl object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pt-8 px-5 pb-5">
                  {/* Name & Type */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-[#FF6A3D] transition-colors">
                      {professional.name}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      {professional.type}
                    </p>
                  </div>

                  {/* Location & Stats */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={11} />
                      <span>{professional.location}</span>
                    </div>
                    {professional.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-gray-900">{professional.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Briefcase size={11} className="text-gray-400" />
                      <span>{professional.experience} yrs</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2 mb-4">
                    {/* Disciplines */}
                    <div className="flex flex-wrap gap-1.5">
                      {professional.disciplines.slice(0, 2).map((disc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#FFF1EB] text-[#FF6A3D] rounded text-[10px] font-bold uppercase"
                        >
                          {disc}
                        </span>
                      ))}
                    </div>

                    {/* Application Areas */}
                    <div className="flex flex-wrap gap-1">
                      {professional.applicationAreas.slice(0, 3).map((area, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-medium"
                        >
                          {area}
                        </span>
                      ))}
                      {professional.applicationAreas.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-medium">
                          +{professional.applicationAreas.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Profile CTA */}
                  <div className="flex items-center gap-1.5 text-[#FF6A3D] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-semibold">View Profile</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
