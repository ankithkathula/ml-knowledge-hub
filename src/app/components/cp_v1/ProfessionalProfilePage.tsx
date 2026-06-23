import { MapPin, Star, Mail, Briefcase, Award, Users, X, ChevronLeft, ChevronRight, Heart, Share2, Bookmark, Globe, Phone, Calendar, Package, ArrowLeft, MessageCircle, UserPlus, Facebook, Twitter, Linkedin, Instagram, Eye, Download, Play, FileText, ArrowRight, File, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Mock professional data
const getProfessionalData = (professionalId: string, professionalName: string) => {
  return {
    id: professionalId,
    name: professionalName || 'Vikram Singh',
    profession: 'Senior Architect',
    specialization: 'Sustainable Architecture',
    bannerImage: 'https://images.unsplash.com/photo-1652790494674-7cf78538d7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    city: 'Mumbai',
    country: 'India',
    rating: 4.9,
    reviewCount: 127,
    projectCount: 45,
    experience: 12,
    followers: '3.2K',
    following: '450',
    website: 'www.architect-portfolio.com',
    phone: '+91 98765 43210',
    email: 'contact@architect.com',
    bio: 'Award-winning architect with over 12 years of experience specializing in sustainable and eco-friendly design. Passionate about creating spaces that harmonize with nature while meeting modern living standards. Led multiple LEED-certified projects and received national recognition for innovative green building solutions.',
    bioShort: 'Award-winning architect with over 12 years of experience specializing in sustainable and eco-friendly design. Passionate about creating spaces that harmonize with nature while meeting modern living standards.',
    skills: [
      'Sustainable Design',
      'LEED Certification',
      'Residential Architecture',
      'Commercial Projects',
      'Urban Planning',
      'BIM/Revit',
      'AutoCAD',
      '3D Visualization'
    ],
    studio: {
      name: 'Matrix Design Studio',
      role: 'Partner / Lead Architect',
      logo: 'https://images.unsplash.com/photo-1765371513276-a74f1ecbcf7d?w=200',
      location: 'Mumbai, India'
    },
    portfolio: [
      {
        id: '1',
        title: 'Eco Villa Residence - Design Portfolio',
        category: 'Residential',
        thumbnail: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
        fileSize: '12.4 MB',
        year: '2024'
      },
      {
        id: '2',
        title: 'Green Office Complex - Documentation',
        category: 'Commercial',
        thumbnail: 'https://images.unsplash.com/photo-1762846993410-76d8681e3044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
        fileSize: '18.7 MB',
        year: '2023'
      },
      {
        id: '3',
        title: 'Urban Garden Apartments',
        category: 'Residential',
        thumbnail: 'https://images.unsplash.com/photo-1738748444659-f8975b12ce57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
        fileSize: '9.8 MB',
        year: '2023'
      }
    ],
    reviews: [
      {
        id: '1',
        clientName: 'Amit Verma',
        rating: 5,
        date: 'November 2024',
        review: 'Exceptional work! The design exceeded our expectations. The attention to detail and commitment to sustainability was remarkable.'
      },
      {
        id: '2',
        clientName: 'Priya Kapoor',
        rating: 5,
        date: 'October 2024',
        review: 'Professional, creative, and delivered on time. The space transformation was incredible and the team absolutely loves the new design.'
      }
    ]
  };
};

interface ProfessionalProfilePageProps {
  professionalId: string;
  professionalName: string;
  onBack: () => void;
}

export default function ProfessionalProfilePage({
  professionalId,
  professionalName,
  onBack
}: ProfessionalProfilePageProps) {
  const professional = getProfessionalData(professionalId, professionalName);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [activeRole, setActiveRole] = useState<'individual' | 'studio'>('individual');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-['Satoshi'] selection:bg-[#FF6A3D]/30">
      {/* Navigation Header */}
      <div className="fixed top-20 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 pointer-events-auto"
        >
          <ArrowLeft className="w-5 h-5 text-[#0F172A] dark:text-white group-hover:-translate-x-1 transition-transform" />
        </motion.button>

        {/* Role Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 p-1 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-1 pointer-events-auto"
        >
          <button 
            onClick={() => setActiveRole('individual')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeRole === 'individual' 
                ? 'bg-[#FF6A3D] text-white' 
                : 'text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            Individual
          </button>
          <button 
            onClick={() => setActiveRole('studio')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeRole === 'studio' 
                ? 'bg-[#FF6A3D] text-white' 
                : 'text-gray-400 hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            Studio View
          </button>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Main Content */}
          <div className="space-y-12">
            
            <AnimatePresence mode="wait">
              {activeRole === 'individual' ? (
                <motion.div
                  key="individual-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  <div className="h-64 relative bg-gray-100 dark:bg-gray-800">
                    <ImageWithFallback src={professional.bannerImage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start gap-8 -mt-24 relative z-10">
                      <div className="w-32 h-32 rounded-2xl bg-[#FF6A3D] p-1 shadow-2xl border-4 border-white dark:border-gray-900 overflow-hidden">
                        <ImageWithFallback src={professional.profileImage} className="w-full h-full object-cover rounded-xl" />
                      </div>

                      <div className="flex-1 pt-12 md:pt-16">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <h1 className="text-3xl md:text-4xl font-normal text-[#0F172A] dark:text-white uppercase tracking-tight mb-2">{professional.name}</h1>
                            <p className="text-[#FF6A3D] text-lg font-bold uppercase tracking-widest mb-4">{professional.profession}</p>
                            <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-[#FF6A3D]" />
                                <span>{professional.city}, IN</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase size={14} className="text-[#FF6A3D]" />
                                <span>{professional.experience} YEARS EXP.</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="px-8 h-12 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all shadow-lg shadow-[#FF6A3D]/20 flex items-center gap-2">
                              <MessageCircle size={16} /> Message
                            </button>
                            <button 
                              onClick={() => setIsFollowing(!isFollowing)}
                              className={`px-8 h-12 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all border ${
                                isFollowing 
                                  ? 'bg-gray-100 border-gray-100 text-[#0F172A]' 
                                  : 'border-[#FF6A3D] text-[#FF6A3D] hover:bg-[#FF6A3D]/5'
                              }`}
                            >
                              {isFollowing ? 'Following' : 'Follow'}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                          {[
                            { label: 'Followers', value: professional.followers },
                            { label: 'Projects', value: professional.projectCount },
                            { label: 'Rating', value: professional.rating },
                            { label: 'Reviews', value: professional.reviewCount }
                          ].map((stat) => (
                            <div key={stat.label}>
                              <p className="text-2xl font-normal text-[#0F172A] dark:text-white mb-1">{stat.value}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="studio-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#0B1220] rounded-[32px] p-10 md:p-16 text-white relative overflow-hidden border border-white/5"
                >
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A3D]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl p-1 bg-white">
                      <ImageWithFallback src={professional.studio.logo} className="w-full h-full object-cover rounded-[2.2rem]" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF6A3D] rounded-full mb-6 shadow-lg shadow-[#FF6A3D]/20">
                        <Building2 size={12} className="text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Studio Member</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-tight mb-4">{professional.studio.name}</h2>
                      <p className="text-[#FF6A3D] text-lg font-bold uppercase tracking-[0.2em] mb-6">{professional.studio.role}</p>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-white/40">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span className="text-[11px] font-bold uppercase tracking-widest">{professional.studio.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span className="text-[11px] font-bold uppercase tracking-widest">24 Team Members</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <button className="px-10 h-14 bg-white text-[#0B1220] rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#FF6A3D] hover:text-white transition-all shadow-xl">
                        Explore Studio
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* About & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-[12px] font-bold text-[#0F172A] dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#FF6A3D]" /> Professional Biography
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {showFullBio ? professional.bio : professional.bioShort}
                </p>
                <button onClick={() => setShowFullBio(!showFullBio)} className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline">
                  {showFullBio ? 'Read Less' : 'Read Full Bio'}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-[12px] font-bold text-[#0F172A] dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#FF6A3D]" /> Specializations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {professional.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-[10px] font-bold uppercase tracking-wider text-gray-500 rounded-lg border border-gray-100 dark:border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Portfolio Documents */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[12px] font-bold text-[#0F172A] dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-8 h-px bg-[#FF6A3D]" /> Design Documents
                </h2>
                <button className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-[0.2em] hover:translate-x-2 transition-all flex items-center gap-2">
                  View All Portfolio <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {professional.portfolio.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <ImageWithFallback src={item.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-2">
                        <FileText size={14} className="text-[#FF6A3D]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">PDF</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-[15px] font-medium text-[#0F172A] dark:text-white mb-2 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category}</span>
                        <span className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest">{item.fileSize}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#0F172A] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A3D]/10 rounded-full blur-3xl" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-[#FF6A3D] flex items-center gap-3">
                <div className="w-6 h-px bg-[#FF6A3D]" /> Contact Info
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF6A3D] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Direct Phone</p>
                    <p className="text-sm font-medium">{professional.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF6A3D] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Official Email</p>
                    <p className="text-sm font-medium">{professional.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF6A3D] shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Portfolio Site</p>
                    <p className="text-sm font-medium">{professional.website}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <button className="w-full h-14 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/20">
                  Hire Professional
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 border border-gray-100 dark:border-gray-800">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-[#0F172A] dark:text-white flex items-center gap-3">
                <div className="w-6 h-px bg-[#FF6A3D]" /> Verified Reviews
              </h2>
              <div className="space-y-8">
                {professional.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} className="fill-current" />)}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs italic leading-relaxed">"{review.review}"</p>
                    <p className="text-[10px] font-bold text-[#0F172A] dark:text-white uppercase tracking-widest">— {review.clientName}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
