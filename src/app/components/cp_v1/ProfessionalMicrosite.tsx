/**
 * Material Library - Professional Profile Microsite
 * Consistent with Brand Microsite design system
 */
import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, MapPin, Globe, Star, Share2, Award, Briefcase, 
  Mail, Phone, ChevronRight, CheckCircle, Download, Users, Calendar,
  ArrowUpRight, MessageCircle, Building2
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MainFooter } from './MainFooter';

interface ProfessionalMicrositeProps {
  professionalId: string;
  onBack: () => void;
}

const PROFESSIONAL_DATA = {
  name: 'Sarah Mitchell',
  title: 'Principal Architect',
  category: 'Architecture & Design',
  location: 'New York, NY, United States',
  email: 'sarah.mitchell@example.com',
  phone: '+1 (212) 555-0123',
  website: 'www.sarahmitchellarchitects.com',
  rating: 4.9,
  reviews: 127,
  experience: '15+ Years',
  bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920',
  profileImage: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  verified: true,
  certifications: ['AIA Certified Architect', 'LEED AP BD+C', 'NCARB Licensed', 'Green Building Professional'],
  specializations: [
    { name: 'Residential Architecture', desc: 'Custom homes and multi-family residential projects.' },
    { name: 'Commercial Design', desc: 'Office buildings, retail spaces, and mixed-use developments.' },
    { name: 'Sustainable Design', desc: 'LEED-certified and net-zero energy buildings.' },
    { name: 'Interior Architecture', desc: 'Comprehensive interior design and space planning.' },
    { name: 'Urban Planning', desc: 'Master planning and urban design consultation.' },
    { name: 'Historic Preservation', desc: 'Restoration and adaptive reuse of heritage buildings.' }
  ],
  about: 'Sarah Mitchell is an award-winning architect with over 15 years of experience designing innovative, sustainable, and human-centered spaces. Her practice focuses on creating buildings that respond to their context while pushing the boundaries of modern design. With a strong commitment to sustainability and community impact, Sarah has led projects ranging from custom residential homes to large-scale commercial developments.',
  mission: 'To create timeless architecture that enhances the human experience while respecting our planet and its resources.',
  stats: [
    { label: 'PROJECTS COMPLETED', value: '84' },
    { label: 'AWARDS WON', value: '12' },
    { label: 'TEAM MEMBERS', value: '18' },
    { label: 'YEARS EXPERIENCE', value: '15+' },
  ],
  services: [
    { name: 'Architectural Design', desc: 'Comprehensive design services from concept to construction documents.', icon: <Building2 size={20} /> },
    { name: 'Project Management', desc: 'Full oversight of construction process and contractor coordination.', icon: <Briefcase size={20} /> },
    { name: 'Consulting', desc: 'Expert guidance on feasibility studies and design development.', icon: <MessageCircle size={20} /> },
    { name: 'Interior Design', desc: 'Complete interior design services including furniture and finishes.', icon: <Award size={20} /> },
  ],
  portfolioCategories: [
    {
      name: 'Residential',
      count: 34,
      image: 'https://images.unsplash.com/photo-1760475244813-45b6807a0a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFyY2hpdGVjdHVyZSUyMGhvdXNlfGVufDF8fHx8MTc3NjIzNzA5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      projects: [
        {
          title: 'Modern Lakeside Residence',
          type: 'Custom Home',
          shortDescription: 'Contemporary single-family home with panoramic lake views and sustainable features.',
          fullDescription: 'This 4,200 sq.ft contemporary residence sits on a sloped site overlooking a pristine lake. The design maximizes views while minimizing environmental impact through passive solar strategies, high-performance envelope, and native landscaping. Large expanses of glass bring the outdoors in, while carefully placed overhangs provide shading and weather protection.',
          city: 'Lake Placid',
          state: 'New York',
          year: '2024',
          area: '4,200 sq.ft',
          awards: ['AIA New York Design Award 2024', 'Green Building Award'],
          backgroundImage: 'https://images.unsplash.com/photo-1760475244813-45b6807a0a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFyY2hpdGVjdHVyZSUyMGhvdXNlfGVufDF8fHx8MTc3NjIzNzA5MHww&ixlib=rb-4.1.0&q=80&w=1080',
          gallery: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1760475244813-45b6807a0a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFyY2hpdGVjdHVyZSUyMGhvdXNlfGVufDF8fHx8MTc3NjIzNzA5MHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Exterior View' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1669387448840-610c588f003d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBkZXNpZ258ZW58MXx8fHwxNzc2MjM3MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Living Room' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc2MTk3OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Kitchen' },
          ]
        },
      ]
    },
    {
      name: 'Commercial',
      count: 28,
      image: 'https://images.unsplash.com/photo-1656646425215-a3f999cf9c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzYxODMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: [
        {
          title: 'Innovation Hub Office Tower',
          type: 'Commercial Office',
          shortDescription: 'Mixed-use office building with ground-floor retail and rooftop amenities.',
          fullDescription: 'A 12-story office building designed to foster collaboration and innovation. The building features flexible floor plates, abundant natural light, a green roof, and modern amenities. The ground floor includes retail spaces that activate the street, while upper floors house tech company offices.',
          city: 'Brooklyn',
          state: 'New York',
          year: '2023',
          area: '185,000 sq.ft',
          awards: ['LEED Gold Certification'],
          backgroundImage: 'https://images.unsplash.com/photo-1656646425215-a3f999cf9c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzYxODMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          gallery: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1656646425215-a3f999cf9c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzYxODMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Tower Exterior' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', caption: 'Office Interior' },
          ]
        },
      ]
    },
  ],
  testimonials: [
    {
      name: 'Michael Harper',
      role: 'Homeowner',
      project: 'Modern Lakeside Residence',
      text: 'Sarah\'s design transformed our vision into reality. Her attention to detail and commitment to sustainability made our dream home not just beautiful, but environmentally responsible.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwbWFufGVufDF8fHx8MTc3NjIzNjk1OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Jennifer Lee',
      role: 'CEO, Tech Startup',
      project: 'Innovation Hub Office Tower',
      text: 'Working with Sarah was exceptional. She understood our company culture and created a workspace that inspires creativity and collaboration every day.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW58ZW58MXx8fHwxNzc2MjM2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ]
};

export function ProfessionalMicrosite({ professionalId, onBack }: ProfessionalMicrositeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const data = PROFESSIONAL_DATA;

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 400;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">
      {/* HERO BANNER */}
      <section className="relative h-[400px] md:h-[480px]">
        <div className="absolute inset-0">
          <img 
            src={data.bannerImage} 
            alt="Professional Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-6 z-20 flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back to Professionals</span>
        </button>

        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white relative">
                  <img 
                    src={data.profileImage} 
                    alt={data.name} 
                    className="w-full h-full object-cover"
                  />
                  {data.verified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FF6A3D] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-tight">
                    {data.name}
                  </h1>
                  {data.verified && (
                    <span className="px-3 py-1 bg-[#FF6A3D] text-white text-[9px] font-medium uppercase tracking-widest rounded-md">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-white/90 text-base md:text-lg mb-3">{data.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{data.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{data.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="fill-[#FF6A3D] text-[#FF6A3D]" />
                    <span className="font-medium">{data.rating}</span>
                    <span>({data.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-[#FF6A3D] text-white rounded-md text-xs font-medium uppercase tracking-wider hover:bg-[#E55A2D] transition-all flex items-center gap-2 shadow-xl">
                  <MessageCircle size={16} />
                  Contact
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md text-xs font-medium uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#F9FAFB] border-y border-[#E5E7EB] py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-normal text-[#FF6A3D] mb-2">{stat.value}</div>
                <div className="text-[10px] font-medium text-[#6B7280] uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* ABOUT SECTION */}
        <section className="py-20 border-b border-[#E5E7EB]">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-6 text-[#0F172A]">About</h2>
              <p className="text-[#6B7280] text-[15px] leading-relaxed mb-6">{data.about}</p>
              
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-6 mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[#0F172A]">Mission</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed italic">"{data.mission}"</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[#0F172A]">Contact Information</h3>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <Mail size={18} className="text-[#94A3B8]" />
                  <a href={`mailto:${data.email}`} className="hover:text-[#FF6A3D] transition-colors">{data.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <Phone size={18} className="text-[#94A3B8]" />
                  <a href={`tel:${data.phone}`} className="hover:text-[#FF6A3D] transition-colors">{data.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <Globe size={18} className="text-[#94A3B8]" />
                  <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6A3D] transition-colors">{data.website}</a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-6 text-[#0F172A]">Certifications</h2>
              <div className="grid grid-cols-1 gap-3 mb-10">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg">
                    <Award size={20} className="text-[#FF6A3D] shrink-0" />
                    <span className="text-sm text-[#0F172A]">{cert}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-6 text-[#0F172A]">Specializations</h2>
              <div className="grid grid-cols-1 gap-4">
                {data.specializations.map((spec, idx) => (
                  <div key={idx} className="border-l-2 border-[#FF6A3D] pl-4">
                    <h4 className="text-sm font-medium text-[#0F172A] mb-1">{spec.name}</h4>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-12 text-[#0F172A]">Services Offered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#E5E7EB] rounded-lg p-6 hover:border-[#FF6A3D]/40 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FF6A3D]/10 flex items-center justify-center text-[#FF6A3D] mb-4 group-hover:bg-[#FF6A3D] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-sm font-medium text-[#0F172A] uppercase tracking-wider mb-2">{service.name}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section className="py-20 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-4 text-[#0F172A]">Portfolio</h2>
          <p className="text-[#6B7280] text-sm mb-12">Selected projects showcasing design excellence</p>

          {/* Category Tabs */}
          <div className="flex gap-3 mb-12 overflow-x-auto no-scrollbar pb-2">
            {data.portfolioCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-widest whitespace-nowrap transition-all border ${
                  selectedCategory === cat.name || (!selectedCategory && cat.name === 'Residential')
                    ? 'bg-[#0B1F33] text-white border-[#0B1F33]'
                    : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0B1F33] hover:text-[#0B1F33]'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {data.portfolioCategories
              .filter(cat => !selectedCategory || cat.name === selectedCategory)
              .flatMap(cat => cat.projects)
              .map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#F9FAFB]">
                    <img 
                      src={project.backgroundImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-medium text-[#0F172A] group-hover:text-[#FF6A3D] transition-colors">{project.title}</h3>
                    <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest">{project.year}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-3">{project.shortDescription}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#FF6A3D] font-medium uppercase tracking-widest group-hover:gap-3 transition-all">
                    View Project <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-20">
          <h2 className="text-xl font-normal uppercase tracking-[0.25em] mb-4 text-[#0F172A]">Client Testimonials</h2>
          <p className="text-[#6B7280] text-sm mb-12">What clients say about working with us</p>

          <div className="grid md:grid-cols-2 gap-8">
            {data.testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FF6A3D] text-[#FF6A3D]" />
                  ))}
                </div>
                <p className="text-[#0F172A] text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#0F172A]">{testimonial.name}</div>
                    <div className="text-xs text-[#6B7280]">{testimonial.role}</div>
                    <div className="text-[9px] text-[#9CA3AF] uppercase tracking-widest mt-1">{testimonial.project}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-medium text-[#0F172A]">{selectedProject.title}</h2>
                <p className="text-sm text-[#6B7280] mt-1">{selectedProject.type}</p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Hero Image */}
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-6">
                <img 
                  src={selectedProject.backgroundImage} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[#0F172A]">Project Description</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{selectedProject.fullDescription}</p>
                  
                  {selectedProject.awards && selectedProject.awards.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium uppercase tracking-wider mb-3 text-[#0F172A]">Awards & Recognition</h3>
                      <div className="space-y-2">
                        {selectedProject.awards.map((award: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <Award size={16} className="text-[#FF6A3D]" />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[#0F172A]">Project Info</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-1">Location</div>
                      <div className="text-[#0F172A]">{selectedProject.city}, {selectedProject.state}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-1">Year</div>
                      <div className="text-[#0F172A]">{selectedProject.year}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-1">Area</div>
                      <div className="text-[#0F172A]">{selectedProject.area}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-[#0F172A]">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.gallery.map((item: any, idx: number) => (
                      <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F9FAFB] group cursor-pointer">
                        <img 
                          src={item.url} 
                          alt={item.caption} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <MainFooter />

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
}
