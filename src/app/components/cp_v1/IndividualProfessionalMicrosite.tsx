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
  Award,
  Briefcase,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Quote
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- TYPES ---

interface IndividualProfessionalMicrositeProps {
  professionalId: string;
  onBack?: () => void;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Project {
  id: number;
  name: string;
  type: string;
  image: string;
  location: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  project?: string;
}

// --- MOCK DATA ---

const MOCK_PROFESSIONAL = {
  id: '1',
  name: 'Anita Sharma',
  type: 'Senior Architect & Interior Designer',
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600',
  location: 'Mumbai, India',
  rating: 4.9,
  reviewCount: 89,
  verified: true,
  responseTime: 'Responds within 12 hrs',
  disciplines: ['Architecture', 'Interior Design', 'Residential'],
  serviceAreas: ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune'],
  stats: {
    projectsCompleted: 65,
    yearsExperience: 8,
    citiesServed: 4
  },
  about: "Passionate architect and interior designer specializing in residential and boutique commercial projects. I focus on creating timeless, functional spaces that reflect my clients' personalities.",
  approach: 'Every project begins with understanding your vision and lifestyle. I believe in collaborative design where your input shapes the creative process, resulting in spaces that truly feel like home.',
  expertise: [
    'Residential Architecture',
    'Interior Design',
    'Space Planning',
    'Sustainable Design',
    'Renovation & Restoration',
    'Site Supervision'
  ],
  services: [
    'Architectural Consultation',
    'Interior Design',
    'Space Planning',
    'Residential Projects',
    'Renovations',
    '3D Visualization'
  ],
  skills: ['AutoCAD', 'SketchUp', 'Revit', 'Photoshop', 'Hand Sketching', 'BIM'],
  certifications: ['COA Registered Architect', 'IGBC Accredited', 'LEED Green Associate']
};

const EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: 'Independent Practice',
    role: 'Principal Architect',
    duration: '2020 - Present',
    description: 'Running my own practice focusing on residential and small-scale commercial projects'
  },
  {
    id: 2,
    company: 'Studio Naqshbandi',
    role: 'Senior Architect',
    duration: '2017 - 2020',
    description: 'Led design teams for high-end residential and hospitality projects across India'
  },
  {
    id: 3,
    company: 'Morphogenesis',
    role: 'Architect',
    duration: '2015 - 2017',
    description: 'Worked on sustainable architecture and institutional projects'
  }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Juhu Residence',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    location: 'Mumbai'
  },
  {
    id: 2,
    name: 'Pali Hill Apartment',
    type: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    location: 'Mumbai'
  },
  {
    id: 3,
    name: 'Boutique Hotel',
    type: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    location: 'Pune'
  },
  {
    id: 4,
    name: 'Farmhouse Retreat',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    location: 'Lonavala'
  }
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Rohit Malhotra',
    rating: 5,
    text: 'Anita transformed our home beautifully. Her attention to detail and understanding of our needs was exceptional.',
    project: 'Juhu Residence'
  },
  {
    id: 2,
    name: 'Meera Patel',
    rating: 5,
    text: 'Professional, creative, and easy to work with. Highly recommend for residential projects!',
    project: 'Apartment Renovation'
  },
  {
    id: 3,
    name: 'Sandeep Joshi',
    rating: 4,
    text: 'Great experience. Very responsive and delivered beyond our expectations.',
    project: 'Farmhouse Retreat'
  }
];

// --- COMPONENT ---

export function IndividualProfessionalMicrosite({ professionalId, onBack }: IndividualProfessionalMicrositeProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleAreas = showAllAreas ? MOCK_PROFESSIONAL.serviceAreas : MOCK_PROFESSIONAL.serviceAreas.slice(0, 4);

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

      {/* HERO SECTION - FULL IMAGE BACKGROUND */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback 
            src={MOCK_PROFESSIONAL.coverImage}
            alt={MOCK_PROFESSIONAL.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-end pb-12">
            
            {/* LEFT: Profile Info */}
            <div className="lg:col-span-2">
              <div className="flex items-end gap-6">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0 backdrop-blur-sm bg-white/5">
                  <ImageWithFallback 
                    src={MOCK_PROFESSIONAL.image}
                    alt={MOCK_PROFESSIONAL.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-[36px] md:text-[42px] font-bold text-white drop-shadow-lg">
                      {MOCK_PROFESSIONAL.name}
                    </h1>
                    {MOCK_PROFESSIONAL.verified && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full">
                        <CheckCircle2 size={14} className="text-[#FF6A3D]" />
                        <span className="text-[11px] font-bold text-gray-900">Verified</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[16px] text-white/90 mb-3 drop-shadow">{MOCK_PROFESSIONAL.type}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-[14px]">
                      <MapPin size={16} className="text-white/70" />
                      <span className="text-white font-medium">{MOCK_PROFESSIONAL.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={16} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                      <span className="text-[15px] font-bold text-white">{MOCK_PROFESSIONAL.rating}</span>
                      <span className="text-[13px] text-white/70">({MOCK_PROFESSIONAL.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Discipline Tags */}
                  <div className="flex flex-wrap gap-2">
                    {MOCK_PROFESSIONAL.disciplines.map(discipline => (
                      <span 
                        key={discipline}
                        className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-[12px] font-medium"
                      >
                        {discipline}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Floating CTA Card */}
            <div className="lg:col-span-1">
              <div className={`bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
                <div className="space-y-3 mb-6">
                  <button className="w-full h-12 bg-[#FF6A3D] text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all flex items-center justify-center gap-2">
                    <FileText size={16} />
                    Get Quote
                  </button>
                  <button className="w-full h-12 bg-gray-900 text-white rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    Contact
                  </button>
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full h-12 rounded-xl text-[13px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      isSaved 
                        ? 'bg-[#FF6A3D] text-white' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={16} className={isSaved ? 'fill-white' : ''} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-gray-600 pt-4 border-t border-gray-200">
                  <Clock size={14} className="text-gray-400" />
                  <span>{MOCK_PROFESSIONAL.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Service Areas</h3>
          <div className="flex flex-wrap items-center gap-2">
            {visibleAreas.map(area => (
              <span 
                key={area}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-[13px] font-medium border border-gray-200"
              >
                {area}
              </span>
            ))}
            {!showAllAreas && MOCK_PROFESSIONAL.serviceAreas.length > 4 && (
              <button
                onClick={() => setShowAllAreas(true)}
                className="px-4 py-2 bg-[#FF6A3D] text-white rounded-lg text-[13px] font-medium hover:bg-[#E55A2D] transition-all"
              >
                +{MOCK_PROFESSIONAL.serviceAreas.length - 4} more
              </button>
            )}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-[36px] font-bold text-gray-900 mb-1">{MOCK_PROFESSIONAL.stats.projectsCompleted}+</div>
              <div className="text-[11px] text-gray-600 uppercase tracking-wide">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold text-gray-900 mb-1">{MOCK_PROFESSIONAL.stats.yearsExperience}</div>
              <div className="text-[11px] text-gray-600 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold text-gray-900 mb-1">{MOCK_PROFESSIONAL.stats.citiesServed}</div>
              <div className="text-[11px] text-gray-600 uppercase tracking-wide">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT - 2 COLUMN LAYOUT */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">About Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: About Text */}
            <div className="space-y-6">
              <p className="text-[15px] text-gray-700 leading-relaxed">
                {MOCK_PROFESSIONAL.about}
              </p>
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Design Approach</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {MOCK_PROFESSIONAL.approach}
                </p>
              </div>
            </div>

            {/* RIGHT: Expertise */}
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Core Expertise</h3>
              <div className="space-y-2.5">
                {MOCK_PROFESSIONAL.expertise.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#FF6A3D] flex-shrink-0" />
                    <span className="text-[14px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (MINIMAL TAG STYLE) */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Services I Offer</h2>
          <div className="flex flex-wrap gap-2.5">
            {MOCK_PROFESSIONAL.services.map(service => (
              <div 
                key={service}
                className="px-5 py-2.5 bg-white rounded-lg text-[13px] font-medium text-gray-700 hover:bg-[#FF6A3D] hover:text-white transition-all cursor-pointer border border-gray-200 hover:border-[#FF6A3D]"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
          <h2 className="text-[28px] font-bold text-gray-900 mb-10">Professional Experience</h2>
          <div className="max-w-3xl space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#FF6A3D] rounded-full border-4 border-white shadow-sm"></div>
                
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-[14px] text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500 whitespace-nowrap">
                      <Calendar size={14} />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS - REDUCED SIZE */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[28px] font-bold text-gray-900">Selected Projects</h2>
            <button className="flex items-center gap-2 text-[13px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:gap-3 transition-all">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map(project => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 hover:border-[#FF6A3D] hover:shadow-lg transition-all"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">{project.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 group-hover:text-[#FF6A3D] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
                    <MapPin size={12} />
                    {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RATINGS & REVIEWS */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT: Rating Summary */}
            <div className="lg:col-span-1">
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">Client Reviews</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-end gap-3 mb-3">
                  <div className="text-[52px] font-bold text-gray-900 leading-none">{MOCK_PROFESSIONAL.rating}</div>
                  <div className="pb-2">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={16} className="text-[#FF6A3D] fill-[#FF6A3D]" />
                      ))}
                    </div>
                    <p className="text-[12px] text-gray-600">Based on {MOCK_PROFESSIONAL.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-300">
                  <p className="text-[13px] text-gray-700 font-medium">Trusted by 65+ clients</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Review Cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {REVIEWS.map(review => (
                  <div 
                    key={review.id}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 mb-1">{review.name}</h4>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star 
                              key={i} 
                              size={13} 
                              className={i <= review.rating ? 'text-[#FF6A3D] fill-[#FF6A3D]' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                      <Quote size={20} className="text-gray-300" />
                    </div>
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-2">
                      {review.text}
                    </p>
                    {review.project && (
                      <p className="text-[12px] text-gray-500 italic">Project: {review.project}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / SOFTWARE - MINIMAL */}
      <section className="bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-6">Skills & Software</h2>
          <div className="flex flex-wrap gap-2.5">
            {MOCK_PROFESSIONAL.skills.map(skill => (
              <span 
                key={skill}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg text-[12px] font-medium border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS - MINIMAL */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-8">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_PROFESSIONAL.certifications.map(cert => (
              <div 
                key={cert}
                className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#FF6A3D]/10 rounded-full flex items-center justify-center mb-3">
                  <Award size={24} className="text-[#FF6A3D]" />
                </div>
                <h3 className="text-[12px] font-bold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
