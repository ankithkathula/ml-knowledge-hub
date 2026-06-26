/**
 * Material Library - Brand Profile Microsite
 * Clean Version
 */
import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { StoreNavigator } from '../shared/StoreNavigator';
import {
  ArrowLeft, ArrowRight, MapPin, Globe, Star, Share2, Award, Building2,
  Package, ChevronRight, CheckCircle,
  Download, FileText, Layout, ArrowUpRight, Mail, Phone,
  ChevronDown, Play, X
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MainFooter } from '../MainFooter';
import { getBrandProfile } from './brandProfileData';

// Icons for the SERVICES section, applied by position (data is now per-brand).
const SERVICE_ICONS = [
  <Package size={20} />,
  <Layout size={20} />,
  <Award size={20} />,
  <CheckCircle size={20} />,
];

interface BrandProfileProps {
  brandName: string;
  onBack: () => void;
  /** Open the product listing for this brand, optionally narrowed by a category. */
  onViewProducts?: (category?: string) => void;
}


export function BrandProfile({ brandName, onBack, onViewProducts }: BrandProfileProps) {
  // Resolve real, brand-specific content for whatever id/name the route passes.
  const BRAND_DATA = getBrandProfile(brandName);
  const currentBrandName = BRAND_DATA.name;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-['Satoshi',sans-serif]">
      <section className="relative min-h-[500px] md:min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 h-[240px] md:h-full">
          <ImageWithFallback 
            src={BRAND_DATA.bannerImage} 
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 md:px-6 pb-12 md:pb-16 pt-[200px] md:pt-0">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-4 md:top-0 left-4 md:left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[11px] font-medium uppercase tracking-widest mb-8 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Brands
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 mt-12 md:mt-0">
            <div className="max-w-[800px]">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 text-center md:text-left">
                <div className="h-16 md:h-24 w-auto min-w-[64px] md:min-w-[96px] bg-white rounded-xl p-2 md:p-3 shadow-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/20">
                  <ImageWithFallback 
                    src={BRAND_DATA.logoImage} 
                    alt={currentBrandName}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-[24px] md:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-white mb-2 leading-tight">
                    {currentBrandName}
                  </h1>
                  <p className="text-gray-300 text-[14px] md:text-lg font-medium opacity-90">{BRAND_DATA.tagline}</p>
                </div>
              </div>

              {/* Product Category Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {BRAND_DATA.categories.map((cat) => (
                  <span key={cat.name} className="px-2.5 md:px-3 py-1.5 bg-white/12 backdrop-blur-md text-white text-[9px] md:text-[10px] font-medium uppercase tracking-widest rounded-md border border-white/25">
                    {cat.name}
                  </span>
                ))}
              </div>

              {/* Certification Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {BRAND_DATA.certifications.map((cert) => (
                  <span key={cert} className="px-2.5 md:px-3 py-1.5 bg-[#22C55E]/15 backdrop-blur-md text-[#4ADE80] text-[9px] md:text-[10px] font-medium uppercase tracking-widest rounded-full border border-[#22C55E]/40 flex items-center gap-1.5">
                    <CheckCircle size={10} /> {cert}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 text-white/70 text-[10px] md:text-[11px] font-medium uppercase tracking-widest">
                <a href={`https://${BRAND_DATA.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#FF6A3D] transition-colors">
                  <Globe size={14} /> {BRAND_DATA.website}
                </a>
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> {BRAND_DATA.location}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Building2 size={14} /> EST. {BRAND_DATA.est}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#FF6A3D]">
                    <Star size={14} fill="#FF6A3D" />
                    <span>{BRAND_DATA.rating}</span>
                  </div>
                  <span className="opacity-60 uppercase">({BRAND_DATA.reviews} REVIEWS)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:mb-2 w-full lg:w-auto">
              <button className="h-[48px] md:h-[54px] w-full px-8 md:px-10 bg-[#FF6A3D] text-white text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] md:tracking-[0.25em] hover:bg-[#E55A2D] transition-all flex items-center justify-center gap-3">
                VISIT WEBSITE <ArrowUpRight size={16} />
              </button>
              <button 
                onClick={scrollToContact}
                className="w-full h-[48px] md:h-[54px] border border-white/20 backdrop-blur-md text-white text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center"
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16 flex flex-col gap-[64px]">
        {/* SECTION 1: ABOUT THE BRAND & BRAND CATEGORIES */}
        <section>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-[24px]">ABOUT THE BRAND</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                {BRAND_DATA.about}
              </p>
              <div className="flex flex-col gap-6">
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {BRAND_DATA.mission}
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-[400px] p-5 bg-white rounded-xl border border-[#E6EAF0] shrink-0">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-[16px]">BRAND CATEGORIES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                {BRAND_DATA.categories.map((cat) => (
                  <div 
                    key={cat.name} 
                    className="h-auto md:h-[64px] px-[14px] py-[12px] bg-white border border-[#E6EAF0] rounded-[10px] cursor-pointer hover:border-[#FF6A3D] hover:bg-[#FFF7F3] transition-all flex items-start gap-2 group"
                  >
                    <div className="size-1 rounded-full bg-[#FF6A3D] mt-[6px] shrink-0" />
                    <div className="flex flex-col gap-[4px] overflow-hidden">
                      <span className="text-[13px] font-medium text-[#101828] uppercase tracking-[0.02em] leading-none truncate">
                        {cat.name}
                      </span>
                      <p className="text-[11px] text-[#667085] leading-tight line-clamp-2 font-normal">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PRODUCT CATEGORIES */}
        <section>
          <div className="flex items-center justify-between mb-[24px]">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">PRODUCT CATEGORIES</h2>
            <button
              onClick={() => onViewProducts?.()}
              className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
            >
              VIEW ALL <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            {BRAND_DATA.productCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                onClick={() => onViewProducts?.(cat.name)}
                className="bg-white border border-[#E6EAF0] rounded-xl overflow-hidden h-[220px] cursor-pointer group shadow-sm hover:shadow-md transition-all shrink-0 w-[240px] md:w-full"
              >
                <div className="h-[140px] w-full overflow-hidden">
                  <ImageWithFallback 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[16px] font-medium text-[#111111] truncate">{cat.name}</h3>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-1">
                    {cat.count} PRODUCTS
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SERVICES (OPTIONAL) */}
        {BRAND_DATA.materials.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-[24px]">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">SERVICES</h2>
              <button className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                VIEW ALL <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRAND_DATA.materials.map((service, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[#E6EAF0] p-5 rounded-xl h-[140px] flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FF6A3D]/5 text-[#FF6A3D] rounded-lg flex items-center justify-center shrink-0">
                      {SERVICE_ICONS[idx % SERVICE_ICONS.length]}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-[13px] font-medium text-[#111111] uppercase tracking-wider truncate">{service.name}</h3>
                      <p className="text-[12px] text-gray-500 leading-tight mt-1 line-clamp-2">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    LEARN MORE <ChevronRight size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: PRODUCT CATALOGUES */}
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-[24px]">PRODUCT CATALOGUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRAND_DATA.catalogues.map((cat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white border border-[#E6EAF0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex h-auto min-h-[140px]"
              >
                <div className="w-[100px] md:w-[120px] h-auto flex-shrink-0 relative overflow-hidden bg-gray-100">
                  <ImageWithFallback 
                    src={cat.cover} 
                    alt={cat.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[9px] font-medium text-[#FF6A3D] uppercase tracking-[0.2em] mb-1 block">
                      {cat.type} • {cat.year}
                    </span>
                    <h3 className="text-[13px] md:text-[14px] font-medium text-[#111111] uppercase leading-tight line-clamp-2">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 mt-3">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF6A3D] transition-colors flex items-center gap-2">
                      <FileText size={14} /> VIEW
                    </button>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF6A3D] transition-colors flex items-center gap-2">
                      <Download size={14} /> DOWNLOAD
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CERTIFICATIONS */}
        <section>
          <div className="flex items-start justify-between mb-[24px]">
            <div>
              <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-1">CERTIFICATIONS</h2>
              <p className="text-[12px] text-gray-500">Verified quality standards and compliance</p>
            </div>
          </div>
          <div className="overflow-x-auto pb-4 -mx-4 md:mx-0">
            <div className="flex gap-6 px-4 md:px-0 min-w-max md:grid md:grid-cols-4 md:min-w-0">
              {BRAND_DATA.certificationsDetailed.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-[200px] md:w-auto bg-white border border-[#E6EAF0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-[140px] relative overflow-hidden bg-gray-50">
                    <ImageWithFallback 
                      src={cert.image} 
                      alt={cert.name} 
                      className="w-full h-full object-cover"
                    />
                    {cert.verified && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 h-6 px-2.5 bg-white/95 backdrop-blur-sm rounded-full">
                        <CheckCircle size={10} className="text-green-600" />
                        <span className="text-[9px] font-bold text-gray-900">VERIFIED</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-medium text-[#111111] mb-1 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      {cert.issuer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: PORTFOLIO */}
        <section>
          {/* Portfolio Categories Grid View */}
          {!selectedPortfolioCategory && !selectedProject && (
            <>
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">PORTFOLIO</h2>
                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                  {BRAND_DATA.portfolioCategories.reduce((acc, cat) => acc + cat.count, 0)} PROJECTS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {BRAND_DATA.portfolioCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedPortfolioCategory(category.name)}
                    className="bg-white border border-[#E6EAF0] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="h-[200px] overflow-hidden relative">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-[18px] font-medium text-white uppercase tracking-wider mb-1">
                          {category.name}
                        </h3>
                        <p className="text-[11px] font-medium text-white/80 uppercase tracking-widest">
                          {category.count} PROJECTS
                        </p>
                        {/* Hover CTA */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] font-medium text-[#FF6A3D] uppercase tracking-wider flex items-center gap-1.5">
                            View Projects <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Projects List View (within selected category) */}
          {selectedPortfolioCategory && !selectedProject && (
            <>
              <div className="flex items-center gap-4 mb-[24px]">
                <button
                  onClick={() => setSelectedPortfolioCategory(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#FF6A3D] transition-colors text-[11px] font-medium uppercase tracking-widest"
                >
                  <ArrowLeft size={14} /> BACK TO CATEGORIES
                </button>
              </div>
              <h2 className="text-[24px] font-medium uppercase tracking-tight text-[#111111] mb-[24px]">
                {selectedPortfolioCategory} PROJECTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BRAND_DATA.portfolioCategories
                  .find(cat => cat.name === selectedPortfolioCategory)
                  ?.projects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white border border-[#E6EAF0] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="h-[280px] overflow-hidden relative">
                        <ImageWithFallback
                          src={project.backgroundImage || project.gallery[0].url}
                          alt={project.title || project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-[20px] font-medium text-white uppercase tracking-wider mb-2">
                            {project.title || project.name}
                          </h3>
                          <div className="flex items-center gap-3 text-white/80 text-[11px] font-medium uppercase tracking-widest mb-3">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} /> {project.city}, {project.country}
                            </span>
                            <span>•</span>
                            <span>{project.completionYear || project.year}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(project.tags || project.materials)?.slice(0, 3).map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/15 backdrop-blur-md text-white text-[9px] font-medium uppercase tracking-wider rounded-md border border-white/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </>
          )}

          {/* Individual Project Gallery View - Modal Popup */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[1000px] my-8 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FF6A3D] hover:border-[#FF6A3D] transition-all shadow-lg"
                >
                  <X size={20} />
                </button>

                {/* Scrollable Content */}
                <div className="max-h-[85vh] overflow-y-auto">
                  {/* Hero Image */}
                  {selectedProject.backgroundImage && (
                    <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
                      <ImageWithFallback
                        src={selectedProject.backgroundImage}
                        alt={selectedProject.title || selectedProject.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="px-6 md:px-10 py-8">
                    <div className="mb-8">
                      <h1 className="text-[28px] md:text-[36px] font-medium uppercase tracking-tight text-[#111111] mb-3">
                        {selectedProject.title || selectedProject.name}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-500 text-[11px] font-medium uppercase tracking-widest mb-6">
                        <span className="flex items-center gap-2">
                          <MapPin size={13} /> {selectedProject.city}, {selectedProject.country}
                        </span>
                        <span>•</span>
                        <span>{selectedProject.completionYear || selectedProject.year}</span>
                        {selectedProject.client && (
                          <>
                            <span>•</span>
                            <span>Client: {selectedProject.client}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Short Description */}
                      {selectedProject.shortDescription && (
                        <p className="text-[14px] text-gray-700 leading-relaxed mb-6">
                          {selectedProject.shortDescription}
                        </p>
                      )}

                      {/* Full Description */}
                      {selectedProject.fullDescription && (
                        <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
                          {selectedProject.fullDescription}
                        </p>
                      )}

                      {/* Project Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                        {selectedProject.projectCategory && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Category</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.projectCategory}</p>
                          </div>
                        )}
                        {selectedProject.serviceType && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Service Type</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.serviceType}</p>
                          </div>
                        )}
                        {selectedProject.duration && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Duration</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.duration}</p>
                          </div>
                        )}
                        {selectedProject.area && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Area</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.area}</p>
                          </div>
                        )}
                        {selectedProject.teamSize && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Team Size</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.teamSize}</p>
                          </div>
                        )}
                        {selectedProject.architect && (
                          <div>
                            <h4 className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Architect</h4>
                            <p className="text-[12px] font-medium text-gray-900">{selectedProject.architect}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Materials Used */}
                      {selectedProject.materialsUsed && (
                        <div className="mb-6">
                          <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-3">
                            MATERIALS USED
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.materialsUsed.map((material: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 bg-white border border-[#E6EAF0] text-[#111111] text-[10px] font-medium uppercase tracking-wider rounded-md hover:border-[#FF6A3D] hover:bg-[#FFF7F3] transition-all cursor-pointer"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Gallery */}
                    <div>
                      <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-4">
                        PROJECT GALLERY ({selectedProject.gallery.length} IMAGES)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.gallery.map((item: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group cursor-pointer"
                            onClick={() => setLightboxImage(item.url)}
                          >
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-video">
                              <ImageWithFallback
                                src={item.url}
                                alt={item.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                            </div>
                            {item.caption && (
                              <p className="text-[11px] text-gray-500 mt-2 uppercase tracking-wider font-medium">
                                {item.caption}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Lightbox for Full-Screen Image View */}
          {lightboxImage && (
            <div
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={lightboxImage}
                alt="Full screen"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </section>

        {/* SECTION 7: STORES & LOCATIONS */}
        <section>
          <StoreNavigator stores={BRAND_DATA.stores} brandName={currentBrandName} accentColor={BRAND_DATA.accentColor} />
        </section>

        {/* SECTION 8: CONTACT BRAND (UPGRADED) */}
        <section ref={contactSectionRef} className="relative w-full max-w-[1280px] mx-auto bg-linear-to-r from-[#0B1F3A] to-[#0F2747] md:rounded-[16px] overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6A3D]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 px-6 md:px-16 py-12 md:py-20">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
              {/* Left Column: Brand Info & Trust */}
              <div className="flex flex-col">
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#98A2B3] mb-4">
                  CONTACT BRAND
                </span>
                
                <h2 className="text-[28px] md:text-[36px] font-medium text-white leading-tight mb-4 uppercase">
                  CONNECT WITH {currentBrandName}
                </h2>
                
                <p className="text-[14px] md:text-[15px] text-[#CBD5E1] font-normal leading-relaxed mb-10 max-w-[480px]">
                  Speak directly with {currentBrandName}'s technical experts, sales representatives, and project consultants for product selection, specifications, and procurement assistance.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mb-12">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#98A2B3]">
                      <Globe size={16} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">WEBSITE</span>
                    </div>
                    <a href={`https://${BRAND_DATA.contact.website}`} target="_blank" rel="noreferrer" className="text-[14px] md:text-[16px] font-medium text-white hover:text-[#FF6A3D] transition-colors">
                      {BRAND_DATA.contact.website}
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#98A2B3]">
                      <Mail size={16} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">EMAIL</span>
                    </div>
                    <a href={`mailto:${BRAND_DATA.contact.email}`} className="text-[14px] md:text-[16px] font-medium text-white hover:text-[#FF6A3D] transition-colors">
                      {BRAND_DATA.contact.email}
                    </a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#98A2B3]">
                      <Phone size={16} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">PHONE</span>
                    </div>
                    <span className="text-[14px] md:text-[16px] font-medium text-white">{BRAND_DATA.contact.phone}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#98A2B3]">
                      <MapPin size={16} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">HEAD OFFICE</span>
                    </div>
                    <span className="text-[14px] md:text-[16px] font-medium text-white">{BRAND_DATA.contact.hq}</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {[
                    'Responds within 24 hours',
                    'Technical consultation available',
                    'Pan-India service network'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#98A2B3]">
                      <CheckCircle size={14} className="text-[#22C55E]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Inquiry Form Card */}
              <div className="relative mt-12 lg:mt-0">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[14px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="size-16 bg-[#22C55E]/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={32} className="text-[#22C55E]" />
                      </div>
                      <h3 className="text-[20px] font-medium text-white mb-2">Message sent successfully</h3>
                      <p className="text-[#CBD5E1] text-[14px]">
                        {currentBrandName} team will contact you shortly.
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="mt-8 text-[13px] font-medium text-[#FF6A3D] hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-[18px] font-medium text-[#FF6A3D] mb-3">DIRECT INQUIRY</h3>
                        <p className="text-[14px] text-[#CBD5E1] leading-relaxed">
                          Send a message to {currentBrandName}'s project team for product specifications, pricing, and technical guidance.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Your name" 
                          required
                          className="w-full h-[44px] bg-white/5 border border-white/10 rounded-lg px-4 text-white text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all placeholder:text-gray-500"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="email" 
                            placeholder="Your email" 
                            required
                            className="w-full h-[44px] bg-white/5 border border-white/10 rounded-lg px-4 text-white text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all placeholder:text-gray-500"
                          />
                          <input 
                            type="tel" 
                            placeholder="Your phone" 
                            className="w-full h-[44px] bg-white/5 border border-white/10 rounded-lg px-4 text-white text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all placeholder:text-gray-500"
                          />
                        </div>
                        <textarea 
                          placeholder="Your message or project requirements..." 
                          required
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#FF6A3D]/50 transition-all placeholder:text-gray-500 resize-none"
                        />
                        <button 
                          type="submit"
                          className="w-full h-[54px] bg-[#FF6A3D] text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#E55A2D] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#FF6A3D]/20"
                        >
                          SEND INQUIRY <ArrowUpRight size={18} />
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}