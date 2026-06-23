import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Building2,
  Home,
  Trees,
  Hammer,
  Zap,
  Droplet,
  Wind,
  Shield,
  FileText,
  Eye,
  LineChart,
  Package,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Hotel,
  ShoppingBag,
  GraduationCap,
  Church,
  Boxes,
  Landmark,
  Network
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MainFooter } from './MainFooter';

// --- TYPES ---

interface Professional {
  id: number;
  name: string;
  type: string;
  disciplines: string[];
  image: string;
  verified: boolean;
  rating?: number;
  location: string;
  isStudio?: boolean;
  responseTime?: string;
  services: string[];
}

interface ProfessionalsPageProps {
  onProfessionalClick?: (professionalId: number, professionalType: 'firm' | 'studio' | 'individual') => void;
  onViewAll?: () => void;
}

interface Practice {
  name: string;
  icon?: any;
}

interface ApplicationAreaService {
  category: string;
  items: string[];
}

// --- DATA STRUCTURES ---

const APPLICATION_AREAS = [
  'Residential',
  'Commercial',
  'Industrial',
  'Hospitality',
  'Retail',
  'Healthcare',
  'Infrastructure'
];

// --- POPULAR SERVICES ---

const POPULAR_SERVICES = [
  'Modular Kitchen',
  'Office Interiors',
  'Villa Design',
  'Facade Design',
  'Landscape Design'
];

// --- REAL PRACTICE TAGS FROM DATABASE ---

const REAL_PRACTICE_TAGS = [
  'Architecture Firm',
  'Boutique / Niche Design Studio',
  'Heritage / Conservation Architecture Firm',
  'Green / Sustainable Architecture Firm',
  'Interior Design Firm',
  'Interior Fit-out Company',
  'Landscape Architecture Firm',
  'Design-Build Firm',
  'Structural Engineering Firm',
  'Civil Engineering Consultancy',
  'MEP Consultancy',
  'BIM Consultancy',
  '3D Visualization Studio',
  'Project Management Consultancy (PMC)',
  'Urban Planning Firm',
  'Fire Safety Consultancy',
  'Energy Audit Firm',
  'VR / AR Studio'
];

// --- APPLICATION AREAS BY DISCIPLINE (GROUPED) ---

interface ApplicationAreaGroup {
  category: string;
  items: string[];
}

const APPLICATION_AREAS_BY_DISCIPLINE: { [key: string]: ApplicationAreaGroup[] } = {
  'Architecture': [
    {
      category: 'Application Areas',
      items: ['Residential', 'Commercial', 'Institutional', 'Hospitality', 'Industrial']
    },
    {
      category: 'Architectural Services',
      items: ['Architectural Design', 'Facade Design / Engineering', 'Heritage / Conservation Design', 'Independent House Design', 'Villa Design', 'Apartment / Group Housing', 'Row House Design', 'Bungalow Design']
    },
    {
      category: 'Commercial Projects',
      items: ['Office Design', 'Retail Store Design', 'Mall Design', 'Showroom Design', 'Co-working Space Design']
    },
    {
      category: 'Hospitality Projects',
      items: ['Hotel Design', 'Resort Design', 'Restaurant Design', 'Cafe Design']
    },
    {
      category: 'Institutional Projects',
      items: ['School Design', 'Hospital Planning', 'College Campus Design', 'Library Design', 'Museum Design']
    },
    {
      category: 'Industrial Projects',
      items: ['Factory Design', 'Warehouse Design', 'Industrial Layout', 'Manufacturing Facility']
    }
  ],
  'Interior Design': [
    {
      category: 'Application Areas',
      items: ['Residential', 'Commercial', 'Hospitality', 'Retail', 'Healthcare', 'Office']
    },
    {
      category: 'Design Services',
      items: ['Interior Concept Design', 'Kitchen & Bath Design', 'Lighting Design', 'Furniture Design (Custom)', 'Exhibition / Stall Design']
    },
    {
      category: 'Modular & Fitout',
      items: ['Modular Furniture & Fitout', 'Carpentry & Joinery Work', 'Modular Kitchen', 'Wardrobe Design', 'False Ceiling', 'Flooring Design', 'Wall Paneling']
    },
    {
      category: 'Commercial Interiors',
      items: ['Office Interior', 'Retail Interior', 'Restaurant Interior', 'Hotel Room Interior', 'Salon Interior', 'Spa Interior']
    },
    {
      category: 'Healthcare Interiors',
      items: ['Clinic Interior', 'Hospital Ward Design']
    }
  ],
  'Landscape & Outdoor': [
    {
      category: 'Landscape Services',
      items: ['Landscape Concept Design', 'Garden Layout', 'Outdoor Seating', 'Water Feature Design', 'Terrace Landscaping', 'Vertical Garden', 'Pergola Design', 'Outdoor Lighting']
    }
  ],
  'Structural Engineering': [
    {
      category: 'Structural Services',
      items: ['Structural Design & Analysis', 'Bridge Design', 'Steel Structure Design', 'High-rise Structural Design', 'Seismic Design', 'Retaining Wall Design', 'Foundation Design']
    }
  ],
  'MEP Systems': [
    {
      category: 'MEP Services',
      items: ['Water Supply & Distribution Design', 'Sewerage & Drainage Design', 'Irrigation / Canal Design', 'HVAC System Design', 'Electrical System Design', 'Plumbing System Design', 'Fire Fighting System Design', 'Home Automation Wiring', 'ELV Systems', 'Smart Lighting']
    }
  ],
  'Sustainability & Energy': [
    {
      category: 'Sustainability Services',
      items: ['Green / Sustainable Building Design', 'Energy Audit', 'Solar / Renewable Energy Installation', 'Green Building Certification', 'Passive Cooling Systems', 'Net-Zero Design', 'Water Conservation Planning']
    }
  ],
  'Planning & Advisory': [
    {
      category: 'Planning Services',
      items: ['Project Management Consulting', 'Feasibility Study & Due Diligence', 'Cost Estimation & BOQ Preparation', 'Quantity Surveying & Valuation', 'Town Planning / Master Planning', 'RERA / Liaison & Approval Services', 'Legal & Documentation Services']
    }
  ],
  'Visualization & BIM': [
    {
      category: 'Visualization & BIM Services',
      items: ['3D Modeling & Rendering', '3D Walkthrough / Animation', '360 Panorama / VR Experience', 'BIM Modeling & Coordination', '4D Construction Simulation']
    }
  ],
  'Civil Engineering & Construction': [
    {
      category: 'Construction Services',
      items: ['House Construction', 'Villa Construction', 'Office Construction', 'Mall Construction', 'Road Construction', 'Bridge Construction', 'Site Development']
    }
  ],
  'Safety, Fire & Security': [
    {
      category: 'Fire Safety Services',
      items: ['Fire Safety Audit', 'Fire Fighting System Design', 'Fire NOC', 'Sprinkler System Design']
    },
    {
      category: 'Security Services',
      items: ['CCTV Installation', 'Access Control Systems', 'Security Audit', 'Perimeter Security']
    }
  ],
  'Surveying & Testing': [
    {
      category: 'Surveying Services',
      items: ['Land Survey', 'Topographic Survey', 'Boundary Survey', 'Construction Survey']
    },
    {
      category: 'Testing Services',
      items: ['Soil Testing', 'Structural Testing', 'Material Testing', 'NDT Testing']
    }
  ],
  'Design-Build & Turnkey': [
    {
      category: 'Turnkey Services',
      items: ['Turnkey Construction (Residential)', 'Turnkey Construction (Commercial)']
    }
  ],
  'Roofing & Waterproofing': [
    {
      category: 'Roofing & Waterproofing Services',
      items: ['Roofing Installation', 'Waterproofing Solutions', 'Leak Repair', 'Membrane Installation']
    }
  ],
  'Finishing & Interior Trades': [
    {
      category: 'Finishing Services',
      items: ['Painting', 'Tiling', 'Flooring', 'Carpentry', 'Plastering']
    }
  ],
  'Facility Management & Support': [
    {
      category: 'Facility Services',
      items: ['Building Maintenance', 'Cleaning Services', 'Security Services', 'Landscaping Maintenance']
    }
  ],
  'Material Suppliers': [
    {
      category: 'Material Supply',
      items: ['Construction Materials', 'Electrical Materials', 'Plumbing Materials', 'Interior Materials']
    }
  ]
};

const DISCIPLINES_WITH_PRACTICES: { [key: string]: Practice[] } = {
  'Architecture': [
    { name: 'Architecture Firm' },
    { name: 'Heritage / Conservation Architecture Firm' },
    { name: 'Green / Sustainable Architecture Firm' }
  ],
  'Interior Design': [
    { name: 'Interior Design Firm' },
    { name: 'Interior Fit-out Company' },
    { name: 'Boutique / Niche Design Studio' }
  ],
  'Landscape & Outdoor': [
    { name: 'Landscape Architecture Firm' }
  ],
  'Structural Engineering': [
    { name: 'Structural Engineering Firm' },
    { name: 'Seismic / Earthquake Engineering Consultancy' }
  ],
  'Civil Engineering & Construction': [
    { name: 'Civil Engineering Consultancy' },
    { name: 'Construction Management Firm' }
  ],
  'MEP Systems': [
    { name: 'MEP Consultancy' }
  ],
  'Sustainability & Energy': [
    { name: 'Green Building Consultancy (LEED/GRIHA/IGBC)' },
    { name: 'Energy Audit Firm' }
  ],
  'Safety, Fire & Security': [
    { name: 'Fire Safety Consultancy' }
  ],
  'Planning & Advisory': [
    { name: 'Project Management Consultancy (PMC)' },
    { name: 'Urban Planning Firm' },
    { name: 'Quantity Surveying Firm' },
    { name: 'Construction Management Firm' },
    { name: 'RERA / Liaison Consultancy' },
    { name: 'Real Estate Legal Consultancy' }
  ],
  'Visualization & BIM': [
    { name: '3D Visualization Studio' },
    { name: 'BIM Consultancy' },
    { name: 'VR / AR Studio' }
  ],
  'Surveying & Testing': [
    { name: 'Geotechnical / Soil Testing Lab' },
    { name: 'Environmental / EIA Consultancy' }
  ],
  'Design-Build & Turnkey': [
    { name: 'Design-Build Firm' }
  ],
  'Roofing & Waterproofing': [],
  'Finishing & Interior Trades': [],
  'Facility Management & Support': [],
  'Material Suppliers': []
};

const APPLICATION_CATEGORY_DATA: { [key: string]: ApplicationAreaService[] } = {
  'Residential': [
    {
      category: 'Design',
      items: ['Independent House Design', 'Villa Design', 'Apartment / Group Housing Design', 'Renovation Design']
    },
    {
      category: 'Interiors',
      items: ['Modular Kitchen', 'Bedroom Interior', 'Living Room Interior', 'Bathroom Interior']
    },
    {
      category: 'Services',
      items: ['Plumbing', 'Electrical Work', 'Home Automation', 'HVAC Installation']
    },
    {
      category: 'Execution',
      items: ['Flooring', 'Painting', 'Carpentry', 'False Ceiling']
    }
  ],
  'Commercial': [
    {
      category: 'Design',
      items: ['Office Design', 'Workspace Design', 'Co-working Space Design', 'Reception Design']
    },
    {
      category: 'Interiors',
      items: ['Office Interior', 'Meeting Room Design', 'Cafeteria Design', 'Cabin Design']
    },
    {
      category: 'Services',
      items: ['Office HVAC', 'Office Electrical', 'Commercial PMC', 'Fire Safety']
    }
  ],
  'Industrial': [
    {
      category: 'Design',
      items: ['Factory Design', 'Warehouse Planning', 'Industrial Layout', 'Manufacturing Facility']
    },
    {
      category: 'Services',
      items: ['Industrial HVAC', 'Industrial Electrical', 'Factory Automation', 'Material Handling']
    }
  ],
  'Institutional': [
    {
      category: 'Design',
      items: ['Government Building Design', 'Administrative Complex', 'Public Facility Design']
    }
  ],
  'Hospitality': [
    {
      category: 'Design',
      items: ['Hotel Design', 'Restaurant Interior', 'Resort Planning', 'Café Design']
    },
    {
      category: 'Services',
      items: ['Hotel HVAC', 'Kitchen Equipment', 'Hospitality PMC']
    }
  ],
  'Retail': [
    {
      category: 'Design',
      items: ['Showroom Design', 'Retail Interior', 'Mall Fitout', 'Store Design']
    },
    {
      category: 'Services',
      items: ['Retail Lighting', 'Display Systems', 'Retail HVAC']
    }
  ],
  'Healthcare': [
    {
      category: 'Design',
      items: ['Hospital Design', 'Clinic Interior', 'Medical Facility Planning', 'Lab Design']
    },
    {
      category: 'Services',
      items: ['Medical HVAC', 'Medical Gas Systems', 'Healthcare PMC']
    }
  ],
  'Educational': [
    {
      category: 'Design',
      items: ['School Design', 'College Campus Planning', 'Classroom Design', 'Library Design']
    }
  ],
  'Religious': [
    {
      category: 'Design',
      items: ['Temple Design', 'Church Design', 'Mosque Design', 'Religious Complex']
    }
  ],
  'Mixed-Use': [
    {
      category: 'Design',
      items: ['Mixed-Use Development', 'Integrated Township', 'Commercial-Residential Complex']
    }
  ],
  'Heritage': [
    {
      category: 'Design',
      items: ['Heritage Conservation', 'Restoration Design', 'Adaptive Reuse', 'Monument Preservation']
    }
  ],
  'Infrastructure': [
    {
      category: 'Engineering',
      items: ['Road Design', 'Bridge Engineering', 'Drainage Systems', 'Urban Infrastructure']
    }
  ]
};

const DISCIPLINES = [
  { id: 1, name: 'Architecture', icon: Building2, image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Interior Design', icon: Home, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Landscape & Outdoor', icon: Trees, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Structural Engineering', icon: Hammer, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Civil Engineering & Construction', icon: Package, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'MEP Systems', icon: Zap, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Sustainability & Energy', icon: Wind, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Safety, Fire & Security', icon: Shield, image: 'https://images.unsplash.com/photo-1577414923355-f3777449c73c?auto=format&fit=crop&q=80&w=400' },
  { id: 9, name: 'Planning & Advisory', icon: FileText, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400' },
  { id: 10, name: 'Visualization & BIM', icon: Eye, image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Surveying & Testing', icon: LineChart, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400' },
  { id: 12, name: 'Design-Build & Turnkey', icon: Building2, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' },
  { id: 13, name: 'Roofing & Waterproofing', icon: Shield, image: 'https://images.unsplash.com/photo-1632580966294-c21f65dfb194?auto=format&fit=crop&q=80&w=400' },
  { id: 14, name: 'Finishing & Interior Trades', icon: Package, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
  { id: 15, name: 'Facility Management & Support', icon: Building2, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=400' },
  { id: 16, name: 'Material Suppliers', icon: Boxes, image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=400' }
];

const APPLICATION_CATEGORIES = [
  {
    name: 'Residential',
    icon: Home,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accentColor: '#3B82F6', // blue-500
    lightTint: 'rgba(59, 130, 246, 0.03)',
    hoverBorder: 'hover:border-blue-400'
  },
  {
    name: 'Commercial',
    icon: Building2,
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    accentColor: '#9333EA', // purple-600
    lightTint: 'rgba(147, 51, 234, 0.03)',
    hoverBorder: 'hover:border-purple-400'
  },
  {
    name: 'Industrial',
    icon: Factory,
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
    accentColor: '#EA580C', // orange-600
    lightTint: 'rgba(234, 88, 12, 0.03)',
    hoverBorder: 'hover:border-orange-400'
  },
  {
    name: 'Institutional',
    icon: Landmark,
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    accentColor: '#4F46E5', // indigo-600
    lightTint: 'rgba(79, 70, 229, 0.03)',
    hoverBorder: 'hover:border-indigo-400'
  },
  {
    name: 'Hospitality',
    icon: Hotel,
    color: 'bg-pink-50',
    iconColor: 'text-pink-600',
    accentColor: '#DB2777', // pink-600
    lightTint: 'rgba(219, 39, 119, 0.03)',
    hoverBorder: 'hover:border-pink-400'
  },
  {
    name: 'Retail',
    icon: ShoppingBag,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    accentColor: '#16A34A', // green-600
    lightTint: 'rgba(22, 163, 74, 0.03)',
    hoverBorder: 'hover:border-green-400'
  },
  {
    name: 'Healthcare',
    icon: Home,
    color: 'bg-red-50',
    iconColor: 'text-red-600',
    accentColor: '#DC2626', // red-600
    lightTint: 'rgba(220, 38, 38, 0.03)',
    hoverBorder: 'hover:border-red-400'
  },
  {
    name: 'Educational',
    icon: GraduationCap,
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    accentColor: '#CA8A04', // yellow-600
    lightTint: 'rgba(202, 138, 4, 0.03)',
    hoverBorder: 'hover:border-yellow-400'
  },
  {
    name: 'Religious',
    icon: Church,
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    accentColor: '#E11D48', // rose-600
    lightTint: 'rgba(225, 29, 72, 0.03)',
    hoverBorder: 'hover:border-rose-400'
  },
  {
    name: 'Mixed-Use',
    icon: Boxes,
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
    accentColor: '#0D9488', // teal-600
    lightTint: 'rgba(13, 148, 136, 0.03)',
    hoverBorder: 'hover:border-teal-400'
  },
  {
    name: 'Heritage',
    icon: Landmark,
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    accentColor: '#D97706', // amber-600
    lightTint: 'rgba(217, 119, 6, 0.03)',
    hoverBorder: 'hover:border-amber-400'
  },
  {
    name: 'Infrastructure',
    icon: Network,
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    accentColor: '#0891B2', // cyan-600
    lightTint: 'rgba(8, 145, 178, 0.03)',
    hoverBorder: 'hover:border-cyan-400'
  }
];

const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: 'Morphogenesis',
    type: 'Architecture Firm',
    disciplines: ['Architecture', 'Sustainable Design'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.9,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '2 hrs',
    services: ['Architecture', 'Sustainable Design', 'Urban Planning']
  },
  {
    id: 2,
    name: 'Design Axis Architects',
    type: 'Interior Design Firm',
    disciplines: ['Interior Design', 'Residential'],
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.8,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '4 hrs',
    services: ['Interior Design', 'Residential', 'Modular Kitchen']
  },
  {
    id: 3,
    name: 'Green Scape Design',
    type: 'Landscape Architecture Firm',
    disciplines: ['Landscape', 'Urban Planning'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.7,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '1 hr',
    services: ['Landscape', 'Urban Planning', 'Garden Design']
  },
  {
    id: 4,
    name: 'Structural Solutions',
    type: 'Structural Engineering Firm',
    disciplines: ['Structural', 'MEP'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.9,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '3 hrs',
    services: ['Structural Engineering', 'MEP Systems']
  },
  {
    id: 5,
    name: 'Heritage Design Associates',
    type: 'Architecture & Design Firm',
    disciplines: ['Architecture', 'Interior Design'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.8,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '6 hrs',
    services: ['Architecture', 'Interior Design', 'Heritage']
  },
  {
    id: 6,
    name: 'Sustainable Consultants',
    type: 'Sustainability Consulting Firm',
    disciplines: ['Sustainability', 'Energy'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.9,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '5 hrs',
    services: ['Sustainability', 'LEED', 'Energy Audit']
  },
  {
    id: 7,
    name: 'Vision Architects',
    type: 'Architecture Firm',
    disciplines: ['Architecture', 'Planning'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.7,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '2 hrs',
    services: ['Architecture', 'Urban Planning', 'Commercial']
  },
  {
    id: 8,
    name: 'BIM Tech Solutions',
    type: 'BIM & Visualization Firm',
    disciplines: ['BIM', 'Visualization'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    verified: true,
    rating: 4.8,
    location: 'Mumbai',
    isStudio: false,
    responseTime: '1 hr',
    services: ['BIM', '3D Visualization', 'VR']
  }
];

// --- HELPER FUNCTIONS ---

const getProfessionalType = (professional: Professional): 'firm' | 'studio' | 'individual' => {
  if (professional.type.toLowerCase().includes('firm')) return 'firm';
  if (professional.type.toLowerCase().includes('studio')) return 'studio';
  return 'individual';
};

// --- COMPONENT ---

export function ProfessionalsPage({ onProfessionalClick, onViewAll }: ProfessionalsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [selectedApplicationAreas, setSelectedApplicationAreas] = useState<string[]>([]);
  const [expandedDiscipline, setExpandedDiscipline] = useState<string | null>(null);
  const [expandedApplicationArea, setExpandedApplicationArea] = useState<string | null>(null);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(['All']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['All']);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Search by Service section state
  const [selectedServiceDiscipline, setSelectedServiceDiscipline] = useState<string>('Architecture');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  // Explore by Discipline - Enhanced filtering state
  const [disciplineSearchQuery, setDisciplineSearchQuery] = useState('');
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([]);
  const [selectedServiceItems, setSelectedServiceItems] = useState<string[]>([]);

  // Professionals Near You section state
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Architecture');
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showMoreDisciplines, setShowMoreDisciplines] = useState(false);

  // Scroll refs for horizontal scrolling with arrows
  const heroTagsScrollRef = useRef<HTMLDivElement>(null);
  const disciplinesScrollRef = useRef<HTMLDivElement>(null);
  const [showHeroLeftArrow, setShowHeroLeftArrow] = useState(false);
  const [showHeroRightArrow, setShowHeroRightArrow] = useState(true);
  const [showDisciplineLeftArrow, setShowDisciplineLeftArrow] = useState(false);
  const [showDisciplineRightArrow, setShowDisciplineRightArrow] = useState(true);

  // Scroll handlers
  const scrollHeroTags = (direction: 'left' | 'right') => {
    if (heroTagsScrollRef.current) {
      const scrollAmount = 300;
      heroTagsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollDisciplines = (direction: 'left' | 'right') => {
    if (disciplinesScrollRef.current) {
      const scrollAmount = 300;
      disciplinesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll position to show/hide arrows
  const checkHeroScroll = () => {
    if (heroTagsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = heroTagsScrollRef.current;
      setShowHeroLeftArrow(scrollLeft > 10);
      setShowHeroRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const checkDisciplineScroll = () => {
    if (disciplinesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = disciplinesScrollRef.current;
      setShowDisciplineLeftArrow(scrollLeft > 10);
      setShowDisciplineRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Check scroll on mount
  useEffect(() => {
    checkHeroScroll();
    checkDisciplineScroll();
  }, []);

  // Primary visible disciplines
  const primaryDisciplines = [
    'Architecture',
    'Interior Design',
    'Structural Engineering',
    'MEP Systems',
    'Landscape & Outdoor',
    'Sustainability & Energy'
  ];

  // Additional disciplines (shown when "+ More" clicked)
  const additionalDisciplines = [
    'Civil Engineering & Construction',
    'Safety, Fire & Security',
    'Planning & Advisory',
    'Visualization & BIM',
    'Surveying & Testing',
    'Design-Build & Turnkey'
  ];

  const typeFilters = ['All', 'Firms', 'Individuals'];

  // Practice mappings based on discipline
  const practicesByDiscipline: { [key: string]: string[] } = {
    'Architecture': [
      'Architecture Firm',
      'Heritage / Conservation Architecture Firm',
      'Green / Sustainable Architecture Firm'
    ],
    'Interior Design': [
      'Interior Design Firm',
      'Interior Fit-out Company',
      'Boutique / Niche Design Studio'
    ],
    'Structural Engineering': [
      'Structural Engineering Firm',
      'Seismic / Earthquake Engineering Consultancy'
    ],
    'MEP Systems': [
      'MEP Consultancy'
    ],
    'Landscape & Outdoor': [
      'Landscape Architecture Firm'
    ],
    'Sustainability & Energy': [
      'Green Building Consultancy (LEED/GRIHA/IGBC)',
      'Energy Audit Firm'
    ],
    'Civil Engineering & Construction': [
      'Civil Engineering Consultancy',
      'Construction Management Firm'
    ],
    'Safety, Fire & Security': [
      'Fire Safety Consultancy'
    ],
    'Planning & Advisory': [
      'Project Management Consultancy (PMC)',
      'Urban Planning Firm',
      'Quantity Surveying Firm',
      'Construction Management Firm',
      'RERA / Liaison Consultancy',
      'Real Estate Legal Consultancy'
    ],
    'Visualization & BIM': [
      '3D Visualization Studio',
      'BIM Consultancy',
      'VR / AR Studio'
    ],
    'Surveying & Testing': [
      'Geotechnical / Soil Testing Lab',
      'Environmental / EIA Consultancy'
    ],
    'Design-Build & Turnkey': [
      'Design-Build Firm'
    ],
    'Roofing & Waterproofing': [],
    'Finishing & Interior Trades': [],
    'Facility Management & Support': [],
    'Material Suppliers': []
  };

  const disciplineFilters = [
    'All',
    'Architecture',
    'Interior Design',
    'Structural',
    'MEP',
    'Landscape',
    'Sustainability'
  ];

  const toggleApplicationArea = (area: string) => {
    setSelectedApplicationAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const toggleDiscipline = (discipline: string) => {
    if (discipline === 'All') {
      setSelectedDisciplines(['All']);
    } else {
      const newSelection = selectedDisciplines.includes(discipline)
        ? selectedDisciplines.filter(d => d !== discipline)
        : [...selectedDisciplines.filter(d => d !== 'All'), discipline];

      setSelectedDisciplines(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  const toggleType = (type: string) => {
    if (type === 'All') {
      setSelectedTypes(['All']);
    } else {
      const newSelection = selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes.filter(t => t !== 'All'), type];

      setSelectedTypes(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Professionals Near You filter handlers
  const handleDisciplineSelect = (discipline: string) => {
    setSelectedDiscipline(discipline);
    // Auto-select all practices under this discipline
    const practices = practicesByDiscipline[discipline] || [];
    setSelectedPractices(practices);
  };

  const handlePracticeToggle = (practice: string) => {
    setSelectedPractices(prev =>
      prev.includes(practice)
        ? prev.filter(p => p !== practice)
        : [...prev, practice]
    );
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const clearAllPractices = () => {
    setSelectedPractices([]);
  };

  // Get current practices based on selected discipline
  const currentPractices = practicesByDiscipline[selectedDiscipline] || [];



  const getSelectedFiltersText = () => {
    if (selectedApplicationAreas.length === 0) return null;
    return `Showing results for: ${selectedApplicationAreas.join(' + ')}`;
  };

  // Toggle application area filter
  const toggleApplicationAreaFilter = (area: string) => {
    setSelectedCategoryFilters(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  // Toggle service item filter
  const toggleServiceItemFilter = (service: string) => {
    setSelectedServiceItems(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Select all services in a category
  const selectAllInCategory = (category: string) => {
    const categoryData = APPLICATION_AREAS_BY_DISCIPLINE[expandedDiscipline || '']?.find(
      g => g.category === category
    );

    if (!categoryData) return;

    const allSelected = categoryData.items.every(item => selectedServiceItems.includes(item));

    if (allSelected) {
      // Deselect all
      setSelectedServiceItems(prev => prev.filter(item => !categoryData.items.includes(item)));
      setSelectedCategoryFilters(prev => prev.filter(a => a !== category));
    } else {
      // Select all
      setSelectedServiceItems(prev => {
        const newItems = categoryData.items.filter(item => !prev.includes(item));
        return [...prev, ...newItems];
      });
      if (!selectedCategoryFilters.includes(category)) {
        setSelectedCategoryFilters(prev => [...prev, category]);
      }
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategoryFilters([]);
    setSelectedServiceItems([]);
  };

  // Get all selected filters for display
  const getAllSelectedFilters = () => {
    return [...selectedCategoryFilters, ...selectedServiceItems];
  };

  // Remove individual filter
  const removeFilter = (filter: string) => {
    if (selectedCategoryFilters.includes(filter)) {
      setSelectedCategoryFilters(prev => prev.filter(a => a !== filter));
      // Also remove all services from this category
      const categoryData = APPLICATION_AREAS_BY_DISCIPLINE[expandedDiscipline || '']?.find(
        g => g.category === filter
      );
      if (categoryData) {
        setSelectedServiceItems(prev => prev.filter(item => !categoryData.items.includes(item)));
      }
    } else {
      setSelectedServiceItems(prev => prev.filter(s => s !== filter));
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi',sans-serif] overflow-x-hidden">

      {/* SECTION 1: HERO */}
      <section className="relative h-[540px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            alt="Professionals workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative max-w-[1280px] mx-auto px-12 h-full flex flex-col items-center justify-center text-center">

          {/* Heading */}
          <h1 className="text-[44px] font-medium text-white mb-4 leading-[1.05] tracking-tight whitespace-nowrap">
            FIND PROFESSIONALS FOR YOUR PROJECT
          </h1>

          {/* Subtext */}
          <p className="text-[18px] text-white/85 mb-8 max-w-[700px]">
            Discover verified architects, designers, studios, and consultants near you.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-[920px] bg-white rounded-[18px] p-2 flex items-center gap-2 mb-8 h-[72px]" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)' }}>
            <Search size={20} className="text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search by service (Modular Kitchen), professional (Architect), or project (Villa Design)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-full bg-transparent outline-none text-gray-900 text-[15px] placeholder:text-gray-400"
            />
            <button className="h-[56px] px-8 bg-[#FF6A3D] text-white rounded-[14px] text-[13px] font-bold uppercase tracking-wide hover:bg-[#E55A2D] transition-all">
              Find Professionals
            </button>
          </div>

          {/* Real Practice Tags - Horizontally Scrollable with Arrow Controls */}
          <div className="relative max-w-4xl w-full overflow-hidden">
            {/* Left Arrow */}
            {showHeroLeftArrow && (
              <button
                onClick={() => scrollHeroTags('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={heroTagsScrollRef}
              onScroll={checkHeroScroll}
              className="flex gap-3 overflow-x-auto scrollbar-hide"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%)'
              }}
            >
              {REAL_PRACTICE_TAGS.map(tag => {
                const isSelected = selectedApplicationAreas.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleApplicationArea(tag)}
                    className={`px-5 h-[34px] rounded-full text-[13px] font-medium transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#FFF1EB] text-[#D95A2B] border border-[#FFD3C2] shadow-sm'
                        : 'bg-white/80 text-gray-700 border border-white/60 hover:bg-white/95 hover:border-white/80'
                    }`}
                    style={isSelected ? {} : { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}
                  >
                    {isSelected && <CheckCircle2 size={15} className="text-[#D95A2B]" />}
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            {showHeroRightArrow && (
              <button
                onClick={() => scrollHeroTags('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            )}
          </div>

          {/* Selected Tags Display */}
          {selectedApplicationAreas.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap items-center gap-2 max-w-4xl"
            >
              <span className="text-[13px] text-white/70 font-medium">Selected:</span>
              {selectedApplicationAreas.map((tag, idx) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-[12px] font-medium flex items-center gap-1.5 border border-white/30"
                >
                  <CheckCircle2 size={13} className="text-white" />
                  {tag}
                  <button
                    onClick={() => toggleApplicationArea(tag)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <span className="text-[14px]">×</span>
                  </button>
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 2: PROFESSIONALS NEAR YOU */}
      <section className="bg-white pt-8 pb-6">
        <div className="max-w-[1280px] mx-auto px-12">

          {/* Header Row - Compact Single Line */}
          <div className="flex items-center justify-between mb-5">
            {/* LEFT: Title + Location */}
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] font-semibold text-[#111827] leading-tight uppercase tracking-wide">
                Professionals Near You
              </h2>
              <button className="flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#374151] transition-colors group">
                <MapPin size={13} className="text-[#6B7280]" />
                <span>{selectedLocation}, Maharashtra</span>
                <span className="text-[11px] text-[#9CA3AF] group-hover:underline ml-1">Change</span>
              </button>
            </div>

            {/* RIGHT: View All */}
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#FF6A3D] hover:gap-2 transition-all"
              >
                View All <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* DISCIPLINES - Compact Pills */}
          <div className="mb-3.5">
            <h3 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.1em] mb-2">
              Disciplines
            </h3>
            <div className="flex flex-wrap gap-2">
              {DISCIPLINES.map(discipline => {
                const isSelected = selectedDiscipline === discipline.name;
                return (
                  <button
                    key={discipline.id}
                    onClick={() => handleDisciplineSelect(discipline.name)}
                    className={`h-[36px] px-5 rounded-full text-[13px] font-medium transition-all ${
                      isSelected
                        ? 'bg-[#FF6A3D] text-white shadow-sm'
                        : 'bg-white text-[#374151] border border-[#E5E7EB] hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {discipline.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRACTICES - Compact Secondary Pills */}
          {currentPractices.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.1em]">
                  Practices
                </h3>
                {selectedPractices.length > 0 && (
                  <button
                    onClick={clearAllPractices}
                    className="text-[11px] text-[#6B7280] hover:text-[#374151] hover:underline transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentPractices.map(practice => {
                  const isSelected = selectedPractices.includes(practice);
                  return (
                    <motion.button
                      key={practice}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePracticeToggle(practice)}
                      className={`px-4 h-[32px] rounded-full text-[12px] font-medium transition-all flex items-center gap-1 border ${
                        isSelected
                          ? 'bg-[#FFF1EB] text-[#FF6A3D] border-[#FFD3C2]'
                          : 'bg-gray-50 text-[#6B7280] border-[#E5E7EB] hover:border-gray-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={12} className="text-[#FF6A3D]" />}
                      {practice}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Professional Cards Grid - Compact Premium Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" style={{ rowGap: '18px' }}>
            {MOCK_PROFESSIONALS.slice(0, 8).map(professional => (
              <motion.div
                key={professional.id}
                whileHover={{ y: -4 }}
                onClick={() => onProfessionalClick?.(professional.id, getProfessionalType(professional))}
                className="group bg-white border border-[#E6E8EC] rounded-[16px] overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-xl transition-all w-full h-[280px] md:h-[300px] relative"
              >
                {/* Banner Image */}
                <div className="h-[90px] md:h-[110px] shrink-0 w-full overflow-hidden">
                  <ImageWithFallback
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Profile Photo - Small circular overlay */}
                <div className="absolute top-[65px] md:top-[80px] left-[16px] size-[34px] md:size-[40px] bg-white rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.12)] p-[2px] flex items-center justify-center z-10 pointer-events-none overflow-hidden">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-600">
                    {professional.name.charAt(0)}
                  </div>
                </div>

                {/* Verified Badge */}
                {professional.verified && (
                  <div className="absolute top-[14px] right-[14px] bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-0.5 shadow-sm">
                    <CheckCircle2 size={11} className="text-green-600" />
                    <span className="text-[9px] font-bold text-gray-900 uppercase tracking-wide">Verified</span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 pt-[18px] md:pt-[24px] px-[13px] md:px-[15px] pb-[11px] md:pb-[13px] gap-[2px] md:gap-[4px] overflow-hidden">
                  <div className="flex flex-col gap-0 w-full shrink-0">
                    <h3 className="text-[13px] md:text-[14px] font-medium text-[#111111] leading-tight truncate">
                      {professional.name}
                    </h3>
                    <p className="text-[10px] md:text-[11px] font-normal text-[#667085] truncate">
                      {professional.type}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-[#667085] w-full shrink-0">
                    <MapPin size={10} className="shrink-0" />
                    <span>{professional.location}</span>
                  </div>

                  {/* Rating & Response Time */}
                  <div className="flex items-center gap-2.5 w-full shrink-0">
                    {professional.rating && (
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                        <span className="text-[10px] font-semibold text-gray-900">{professional.rating}</span>
                      </div>
                    )}
                    {professional.responseTime && (
                      <div className="flex items-center gap-0.5 text-[9px] text-gray-600">
                        <Clock size={10} />
                        <span>{professional.responseTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 w-full shrink-0">
                    {professional.services.slice(0, 2).map((service, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[9px] font-medium truncate max-w-[110px]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="flex-1 w-full" />

                  {/* CTA Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onProfessionalClick?.(professional.id, getProfessionalType(professional));
                    }}
                    className="h-8 md:h-9 w-full bg-[#FF6A3D] text-white text-[10px] md:text-[12px] font-medium rounded-[8px] hover:bg-[#E55A2D] transition-colors uppercase cursor-pointer"
                  >
                    VIEW PROFILE
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO BANNER - Immersive Break */}
      <section className="pb-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-12">
          <div className="relative h-[320px] rounded-[24px] overflow-hidden bg-gray-900">
            {/* Background Image Placeholder (replace with video in production) */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
              alt="Architectural professionals at work"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <h2 className="text-[40px] font-medium text-white mb-3 leading-tight max-w-[800px]">
                DISCOVER EXPERTS FOR EVERY PROJECT SCALE
              </h2>
              <p className="text-[16px] text-white/80 mb-6 max-w-[600px]">
                From residential interiors to large-scale infrastructure
              </p>
              <button
                onClick={onViewAll}
                className="px-8 py-3.5 bg-white text-[#111827] rounded-xl text-[13px] font-semibold uppercase tracking-wide hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Explore Professionals
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPLORE BY APPLICATION AREA / SERVICES */}
      <section className="bg-[#F7F7F8] border-b border-[#F1F5F9] pt-12 pb-12">
        <div className="max-w-[1280px] mx-auto px-12">
          {/* Section Header */}
          <div className="mb-7">
            <h2 className="text-[24px] font-semibold text-[#111827] leading-tight mb-2 uppercase tracking-wide">
              Explore by Application Area / Services
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              Browse professionals based on project type, services, and industry applications.
            </p>
          </div>

          {/* Discipline Cards - Visual Editorial Cards with Images - 2 Rows of 8 */}
          <div className="mb-4">
            {/* Row 1: First 8 Disciplines */}
            <div className="grid grid-cols-8 gap-3 mb-2.5">
              {DISCIPLINES.slice(0, 8).map(discipline => {
                const isActive = expandedDiscipline === discipline.name;
                return (
                  <motion.button
                    key={discipline.id}
                    onClick={() => setExpandedDiscipline(isActive ? null : discipline.name)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`flex flex-col bg-white border transition-all relative overflow-hidden ${
                      isActive
                        ? 'border-[#FF6A3D] z-10 shadow-lg'
                        : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                    }`}
                    style={{
                      height: '130px',
                      borderRadius: '20px',
                      ...(isActive && {
                        boxShadow: '0 0 0 1px rgba(255, 106, 61, 0.15), 0 6px 16px rgba(255, 106, 61, 0.12)',
                        transform: 'translateY(-2px)'
                      })
                    }}
                  >
                    {/* Image - Top 70% */}
                    <div className="relative h-[92px] overflow-hidden">
                      <ImageWithFallback
                        src={discipline.image}
                        alt={discipline.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isActive ? 'scale-105' : ''
                        }`}
                        style={{ borderRadius: '16px 16px 0 0' }}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#FF6A3D]/10" />
                      )}
                    </div>

                    {/* Label - Bottom 30% */}
                    <div className="flex items-center justify-center px-1.5 h-[38px]">
                      <span className={`text-[13px] text-center leading-tight font-medium transition-colors ${
                        isActive ? 'text-[#FF6A3D]' : 'text-[#111827]'
                      }`}>
                        {discipline.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Row 2: Remaining 8 Disciplines */}
            <div className="grid grid-cols-8 gap-3">
              {DISCIPLINES.slice(8, 16).map(discipline => {
                const isActive = expandedDiscipline === discipline.name;
                return (
                  <motion.button
                    key={discipline.id}
                    onClick={() => setExpandedDiscipline(isActive ? null : discipline.name)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`flex flex-col bg-white border transition-all relative overflow-hidden ${
                      isActive
                        ? 'border-[#FF6A3D] z-10 shadow-lg'
                        : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                    }`}
                    style={{
                      height: '130px',
                      borderRadius: '20px',
                      ...(isActive && {
                        boxShadow: '0 0 0 1px rgba(255, 106, 61, 0.15), 0 6px 16px rgba(255, 106, 61, 0.12)',
                        transform: 'translateY(-2px)'
                      })
                    }}
                  >
                    {/* Image - Top 70% */}
                    <div className="relative h-[92px] overflow-hidden">
                      <ImageWithFallback
                        src={discipline.image}
                        alt={discipline.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isActive ? 'scale-105' : ''
                        }`}
                        style={{ borderRadius: '16px 16px 0 0' }}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#FF6A3D]/10" />
                      )}
                    </div>

                    {/* Label - Bottom 30% */}
                    <div className="flex items-center justify-center px-1.5 h-[38px]">
                      <span className={`text-[13px] text-center leading-tight font-medium transition-colors ${
                        isActive ? 'text-[#FF6A3D]' : 'text-[#111827]'
                      }`}>
                        {discipline.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Expandable Application Area Panel - Minimal Premium Layout */}
          <AnimatePresence mode="wait">
            {expandedDiscipline && APPLICATION_AREAS_BY_DISCIPLINE[expandedDiscipline] && (() => {
              // Separate application areas from service areas
              const allGroups = APPLICATION_AREAS_BY_DISCIPLINE[expandedDiscipline];

              // Filter out the category-only "Application Areas" group
              const applicationGroups = allGroups.filter(group =>
                group.category !== 'Application Areas' &&
                (group.category.includes('Projects') ||
                 group.category.includes('Interiors') ||
                 group.category.includes('Design'))
              );

              const serviceGroups = allGroups.filter(group =>
                group.category.includes('Services') ||
                group.category.includes('Visualization') ||
                group.category.includes('Planning') ||
                group.category.includes('Engineering') ||
                group.category.includes('MEP') ||
                group.category.includes('Testing') ||
                group.category.includes('Safety') ||
                group.category.includes('Turnkey')
              );

              // Collect all application items
              const applicationItems: string[] = [];
              applicationGroups.forEach(group => {
                applicationItems.push(...group.items);
              });

              // Collect all service items
              const serviceItems: string[] = [];
              serviceGroups.forEach(group => {
                serviceItems.push(...group.items);
              });

              return (
                <motion.div
                  key={expandedDiscipline}
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="overflow-hidden mt-1"
                >
                  <div
                    className="bg-white border border-[#E5E7EB] relative"
                    style={{
                      borderRadius: '24px',
                      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {/* Subtle orange connector line */}
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-[#FF6A3D]"
                    />

                    {/* Header with integrated CTA */}
                    <div className="flex items-start justify-between px-7 pt-5 pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="text-[20px] font-semibold text-[#111827] mb-1">
                          {expandedDiscipline}
                        </h3>
                        <p className="text-[13px] text-[#6B7280]">Select project types and services to find professionals</p>
                      </div>

                      {/* CTA Button - Material Library Orange */}
                      <button
                        onClick={onViewAll}
                        className="h-[42px] px-6 bg-[#FF6A3D] text-white text-[12px] font-semibold uppercase tracking-wide hover:bg-[#E55A2D] transition-all flex items-center gap-2 whitespace-nowrap"
                        style={{ borderRadius: '12px' }}
                      >
                        View Professionals
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* 60/40 Split Layout with Strong Visual Distinction */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-7 py-6">
                      {/* LEFT COLUMN: Application Areas - 60% (3 cols) */}
                      {applicationItems.length > 0 && (
                        <div className="lg:col-span-3">
                          <h4 className="text-[12px] font-bold text-[#6B7280] mb-4 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#FF6A3D]" />
                            Application Areas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {applicationItems.slice(0, 15).map((item, itemIdx) => {
                              const isSelected = selectedServiceItems.includes(item);
                              return (
                                <motion.button
                                  key={itemIdx}
                                  initial={{ opacity: 0, y: 3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: itemIdx * 0.015, duration: 0.18 }}
                                  onClick={() => toggleServiceItemFilter(item)}
                                  className={`px-4 h-[40px] text-[13px] font-semibold transition-all border flex items-center gap-1.5 ${
                                    isSelected
                                      ? 'bg-[#FFF1EB] text-[#FF6A3D] border-[#FFD3C2] shadow-sm'
                                      : 'bg-white text-[#374151] border-[#D1D5DB] hover:bg-[#FAFAFA] hover:border-[#9CA3AF] hover:shadow-sm'
                                  }`}
                                  style={{ borderRadius: '12px' }}
                                >
                                  {isSelected && <CheckCircle2 size={14} className="text-[#FF6A3D]" />}
                                  {item}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* RIGHT COLUMN: Service Areas - 40% (2 cols) */}
                      {serviceItems.length > 0 && (
                        <div className="lg:col-span-2">
                          <h4 className="text-[12px] font-bold text-[#6B7280] mb-4 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                            Service Areas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {serviceItems.slice(0, 15).map((item, itemIdx) => {
                              const isSelected = selectedServiceItems.includes(item);
                              return (
                                <motion.button
                                  key={itemIdx}
                                  initial={{ opacity: 0, y: 3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: itemIdx * 0.015, duration: 0.18 }}
                                  onClick={() => toggleServiceItemFilter(item)}
                                  className={`px-3.5 h-[36px] text-[13px] font-medium transition-all border flex items-center gap-1.5 ${
                                    isSelected
                                      ? 'bg-[#FFF1EB] text-[#FF6A3D] border-[#FFD3C2]'
                                      : 'bg-[#FAFAFA] text-[#374151] border-[#D1D5DB] hover:bg-white hover:border-[#9CA3AF]'
                                  }`}
                                  style={{ borderRadius: '12px' }}
                                >
                                  {isSelected && <CheckCircle2 size={14} className="text-[#FF6A3D]" />}
                                  {item}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* OLD SECTION 2: FEATURED DISCIPLINES - KEEPING FOR REFERENCE (HIDDEN) */}
      <section className="bg-gray-50 py-16 hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8 text-center uppercase tracking-tight">
            Featured Disciplines
          </h2>

          {/* Disciplines Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
            {DISCIPLINES.map(discipline => {
              const Icon = discipline.icon;
              const isExpanded = expandedDiscipline === discipline.name;
              return (
                <motion.div
                  key={discipline.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setExpandedDiscipline(isExpanded ? null : discipline.name)}
                  className={`flex flex-col items-center cursor-pointer group p-4 rounded-2xl transition-all ${
                    isExpanded ? 'bg-white shadow-lg' : 'bg-transparent'
                  }`}
                >
                  <div className={`w-[68px] h-[68px] rounded-full ${discipline.color} flex items-center justify-center mb-3 transition-all group-hover:shadow-lg`}>
                    <Icon size={28} className={discipline.iconColor} />
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 text-center leading-tight group-hover:text-[#FF6A3D] transition-colors">
                    {discipline.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Practices */}
          <AnimatePresence>
            {expandedDiscipline && DISCIPLINES_WITH_PRACTICES[expandedDiscipline] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-gray-900">
                    {expandedDiscipline} Practices
                  </h3>
                  <button
                    onClick={() => setExpandedDiscipline(null)}
                    className="text-[12px] text-gray-500 hover:text-gray-900"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {DISCIPLINES_WITH_PRACTICES[expandedDiscipline].map((practice, idx) => (
                    <div
                      key={idx}
                      onClick={onViewAll}
                      className="px-4 py-3 bg-gray-50 hover:bg-[#FF6A3D] hover:text-white rounded-xl text-[13px] font-medium transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{practice.name}</span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* OLD SECTION 3: START WITH WHAT YOU NEED - KEEPING FOR REFERENCE (HIDDEN) */}
      <section className="bg-white py-12 hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2 text-center uppercase tracking-tight">
            Start with What You Need
          </h2>
          <p className="text-[14px] text-gray-600 mb-8 text-center">
            Browse by project type and scope
          </p>

          {/* Application Area Cards Grid - Compact Design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
            {APPLICATION_CATEGORIES.map(category => {
              const Icon = category.icon;
              const isExpanded = expandedApplicationArea === category.name;
              return (
                <motion.div
                  key={category.name}
                  whileHover={{ y: -3 }}
                  onClick={() => setExpandedApplicationArea(isExpanded ? null : category.name)}
                  className={`relative cursor-pointer group rounded-xl transition-all duration-300 ${
                    isExpanded
                      ? 'shadow-md'
                      : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    height: '100px',
                    ...(isExpanded && {
                      borderWidth: '2px',
                      borderColor: category.accentColor,
                      backgroundColor: category.lightTint
                    })
                  }}
                >
                  {/* Card Content */}
                  <div className="h-full p-3 flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all ${
                      isExpanded ? category.color : 'bg-gray-50'
                    }`}>
                      <Icon size={18} className={isExpanded ? category.iconColor : 'text-gray-600'} />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-[13px] font-bold leading-tight transition-colors ${
                        isExpanded ? '' : 'text-gray-900'
                      }`}
                      style={isExpanded ? { color: category.accentColor } : {}}
                    >
                      {category.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Scope Section */}
          <AnimatePresence mode="wait">
            {expandedApplicationArea && APPLICATION_CATEGORY_DATA[expandedApplicationArea] && (() => {
              // Get the selected category data
              const selectedCategory = APPLICATION_CATEGORIES.find(cat => cat.name === expandedApplicationArea);
              const accentColor = selectedCategory?.accentColor || '#FF6A3D';
              const lightTint = selectedCategory?.lightTint || 'rgba(255, 106, 61, 0.03)';

              // Organize data into Design and Execution categories
              const designItems: { subGroup: string; items: string[] }[] = [];
              const executionItems: { subGroup: string; items: string[] }[] = [];

              APPLICATION_CATEGORY_DATA[expandedApplicationArea].forEach((serviceGroup) => {
                const isDesignScope = serviceGroup.category.toLowerCase().includes('design') ||
                                    serviceGroup.category.toLowerCase().includes('interiors');

                const topItems = serviceGroup.items.slice(0, 4);

                if (isDesignScope) {
                  designItems.push({
                    subGroup: serviceGroup.category,
                    items: topItems
                  });
                } else {
                  executionItems.push({
                    subGroup: serviceGroup.category,
                    items: topItems
                  });
                }
              });

              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="bg-white pt-6 pb-8 mt-6 border-t-2" style={{ borderTopColor: accentColor }}>
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-[18px] font-bold mb-1" style={{ color: accentColor }}>
                          {expandedApplicationArea} Scope
                        </h3>
                        <p className="text-[13px] text-gray-500">
                          Select what you need — we'll match you with the right professionals
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedApplicationArea(null)}
                        className="text-[11px] text-gray-400 hover:text-gray-900 font-medium transition-colors"
                      >
                        ✕ Close
                      </button>
                    </div>

                    {/* 2-Column Flat Layout with Divider */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                      {/* LEFT COLUMN: Design Scope */}
                      {designItems.length > 0 && (
                        <div className="relative rounded-lg p-5 -m-5" style={{ backgroundColor: 'rgba(59, 130, 246, 0.02)' }}>
                          {/* Vertical Divider (desktop only) */}
                          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px opacity-20" style={{ backgroundColor: accentColor }}></div>

                          {/* Column Header with Icon */}
                          <div className="mb-5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                              <Eye size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                <h4 className="text-[14px] font-bold text-gray-900">
                                  Design Scope
                                </h4>
                              </div>
                              <p className="text-[11px] text-gray-500">
                                Planning / Consulting
                              </p>
                            </div>
                          </div>

                          {/* Design Sub-groups */}
                          <div className="space-y-5">
                            {designItems.map((group, idx) => (
                              <div key={idx}>
                                {/* Sub-category Label */}
                                <div className="text-[11px] font-medium text-gray-400 mb-2.5 uppercase tracking-wide">
                                  {group.subGroup}
                                </div>

                                {/* Chips */}
                                <div className="flex flex-wrap gap-2">
                                  {group.items.map((item, itemIdx) => {
                                    const isSelected = selectedServices.includes(item);
                                    return (
                                      <motion.button
                                        key={itemIdx}
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleService(item)}
                                        className={`px-3.5 py-2 rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5 border ${
                                          isSelected
                                            ? 'text-gray-900 border-2'
                                            : 'bg-white text-gray-700 border-gray-200'
                                        }`}
                                        style={isSelected ? {
                                          backgroundColor: lightTint,
                                          borderColor: accentColor
                                        } : {}}
                                        onMouseEnter={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.borderColor = accentColor;
                                            e.currentTarget.style.color = accentColor;
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#E5E7EB';
                                            e.currentTarget.style.color = '#374151';
                                          }
                                        }}
                                      >
                                        {isSelected && <CheckCircle2 size={12} style={{ color: accentColor }} />}
                                        {item}
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            {/* View All Link */}
                            <button
                              onClick={onViewAll}
                              className="text-[11px] font-medium text-gray-400 transition-all flex items-center gap-1 mt-3"
                              onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                            >
                              View All
                              <ArrowRight size={11} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* RIGHT COLUMN: Execution Scope */}
                      {executionItems.length > 0 && (
                        <div className="relative rounded-lg p-5 -m-5" style={{ backgroundColor: 'rgba(234, 88, 12, 0.02)' }}>
                          {/* Column Header with Icon */}
                          <div className="mb-5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(234, 88, 12, 0.08)' }}>
                              <Hammer size={16} className="text-orange-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                <h4 className="text-[14px] font-bold text-gray-900">
                                  Execution Scope
                                </h4>
                              </div>
                              <p className="text-[11px] text-gray-500">
                                Implementation / Build
                              </p>
                            </div>
                          </div>

                          {/* Execution Sub-groups */}
                          <div className="space-y-5">
                            {executionItems.map((group, idx) => (
                              <div key={idx}>
                                {/* Sub-category Label */}
                                <div className="text-[11px] font-medium text-gray-400 mb-2.5 uppercase tracking-wide">
                                  {group.subGroup}
                                </div>

                                {/* Chips */}
                                <div className="flex flex-wrap gap-2">
                                  {group.items.map((item, itemIdx) => {
                                    const isSelected = selectedServices.includes(item);
                                    return (
                                      <motion.button
                                        key={itemIdx}
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleService(item)}
                                        className={`px-3.5 py-2 rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5 border ${
                                          isSelected
                                            ? 'text-gray-900 border-2'
                                            : 'bg-white text-gray-700 border-gray-200'
                                        }`}
                                        style={isSelected ? {
                                          backgroundColor: lightTint,
                                          borderColor: accentColor
                                        } : {}}
                                        onMouseEnter={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.borderColor = accentColor;
                                            e.currentTarget.style.color = accentColor;
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isSelected) {
                                            e.currentTarget.style.borderColor = '#E5E7EB';
                                            e.currentTarget.style.color = '#374151';
                                          }
                                        }}
                                      >
                                        {isSelected && <CheckCircle2 size={12} style={{ color: accentColor }} />}
                                        {item}
                                      </motion.button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            {/* View All Link */}
                            <button
                              onClick={onViewAll}
                              className="text-[11px] font-medium text-gray-400 transition-all flex items-center gap-1 mt-3"
                              onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                            >
                              View All
                              <ArrowRight size={11} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA - Bottom Right */}
                    <div className="flex justify-end pt-6 mt-8 border-t border-gray-200">
                      <button
                        onClick={onViewAll}
                        className="px-7 py-3 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                        style={{ backgroundColor: accentColor }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        👉 View Professionals
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4: VERIFIED BY MATERIAL LIBRARY - Minimal Trust Section */}
      <section
        className="relative pt-12 pb-12 overflow-hidden"
        style={{
          background: '#FFFFFF'
        }}
      >
        {/* Subtle Top Gradient Tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,106,61,0.06), rgba(255,106,61,0.02), transparent)'
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-20">
          {/* Heading */}
          <div className="mb-12">
            <h2 className="text-[20px] font-medium text-[#0F172A] uppercase tracking-[0.4px] leading-[28px] mb-1">
              Verified by Material Library
            </h2>
            <p className="text-[14px] text-[#6B7280] leading-[20px] max-w-[600px]">
              Every professional is reviewed for expertise, portfolio quality, and credibility — ensuring you connect with trusted industry experts.
            </p>
          </div>

          {/* Minimal Icon + Label Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {[
              { icon: CheckCircle2, label: 'Verified Profiles', iconColor: '#22C55E' },
              { icon: Eye, label: 'Portfolio Reviewed', iconColor: '#3B82F6' },
              { icon: Star, label: 'Industry Experts', iconColor: '#F97316' },
              { icon: Shield, label: 'Trusted Network', iconColor: '#8B5CF6' }
            ].map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex flex-col items-center cursor-default"
                >
                  {/* Icon Container - Soft Circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-200"
                    style={{
                      background: 'rgba(255,106,61,0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,106,61,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,106,61,0.08)';
                    }}
                  >
                    <Icon size={20} style={{ color: point.iconColor }} />
                  </div>

                  {/* Label */}
                  <span
                    className="text-[14px] font-medium transition-colors duration-200"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#374151';
                    }}
                  >
                    {point.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MainFooter />
    </div>
  );
}
