import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  Share2, 
  Heart, 
  ChevronLeft, 
  Award, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ArrowRight, 
  ExternalLink,
  Globe,
  Briefcase
} from 'lucide-react';
import { PROVIDERS } from './ServicesPage';

interface ProfessionalProfileProps {
  id: string | number | null;
  onNavigate: (page: any, id?: string) => void;
}

export const ProfessionalProfile = ({ id, onNavigate }: ProfessionalProfileProps) => {
  const provider = PROVIDERS.find(p => p.id === id) || PROVIDERS[0];

  const portfolio = [
    'https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1770200574989-a4cca2c70c00?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1761637823293-f96835ec5038?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1759830374424-bc3a516d987c?auto=format&fit=crop&q=80&w=600',
  ];

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-[#0B1F3A] selection:bg-[#FF6A3D]/20 pb-32">
      
      {/* SECTION 1: HEADER (Functional & Calm) */}
      <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] pt-[64px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-12 pb-12 md:pb-20">
          <button 
            onClick={() => onNavigate('services')}
            className="flex items-center text-[#9CA3AF] hover:text-[#0B1F3A] transition-colors mb-8 md:mb-12 uppercase text-[10px] font-bold tracking-[0.3em] group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Directory
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 text-center md:text-left">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border border-[#E5E7EB] bg-white shadow-sm shrink-0">
                <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
              </div>
              <div className="pb-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2 md:mb-3">
                  <h1 className="text-[24px] md:text-3xl font-bold text-[#0B1F3A] uppercase tracking-wider font-['Satoshi'] leading-tight">{provider.name}</h1>
                  {provider.verified && (
                    <div className="text-[#FF6A3D]">
                      <CheckCircle2 size={24} />
                    </div>
                  )}
                </div>
                <p className="text-[12px] md:text-sm font-bold text-[#9CA3AF] uppercase tracking-widest mb-4 md:mb-6">{provider.type}</p>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
                  <div className="flex items-center text-[10px] md:text-xs font-bold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
                    <MapPin size={16} className="mr-1.5 md:mr-2 text-[#9CA3AF]" /> {provider.location}
                  </div>
                  <div className="flex items-center text-[10px] md:text-xs font-bold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
                    <Star size={16} className="mr-1.5 md:mr-2 text-[#FF6A3D] fill-[#FF6A3D]" /> {provider.rating} Rating
                  </div>
                  <div className="flex items-center text-[10px] md:text-xs font-bold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
                    <Award size={16} className="mr-1.5 md:mr-2 text-[#9CA3AF]" /> {provider.experience} Exp.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto pb-2">
              <button className="flex-1 md:flex-none px-6 md:px-8 py-4 bg-[#0B1F3A] text-white rounded-lg font-bold hover:bg-[#FF6A3D] transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                Send Inquiry <ArrowRight size={14} />
              </button>
              <button className="p-4 bg-white border border-[#E5E7EB] rounded-lg text-[#0B1F3A] hover:border-[#FF6A3D] hover:text-[#FF6A3D] transition-all">
                <Heart size={20} />
              </button>
              <button className="p-4 bg-white border border-[#E5E7EB] rounded-lg text-[#0B1F3A] hover:border-[#0B1F3A] transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 md:mt-20">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-12 md:space-y-20">
          
          {/* About Section */}
          <section>
            <h2 className="text-[10px] md:text-xs font-bold text-[#0B1F3A] uppercase tracking-[0.3em] mb-6 md:mb-8 font-['Satoshi'] flex items-center gap-3">
              <div className="w-6 md:w-8 h-[1px] bg-[#FF6A3D]" /> Professional Biography
            </h2>
            <p className="text-[15px] md:text-lg text-[#6B7280] leading-relaxed font-medium">
              With over {provider.experience} years of specialized experience, {provider.name} has established a track record of delivering high-performance solutions for complex challenges. 
              Our methodology integrates rigorous technical standards with refined aesthetic sensibilities, ensuring that every engagement within the Material Library ecosystem meets professional benchmarks for quality and sustainability.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
              <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-center">
                <div className="text-[#FF6A3D] mb-4 flex justify-center"><Briefcase size={20} /></div>
                <p className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-1">150+</p>
                <p className="text-[9px] md:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Projects Completed</p>
              </div>
              <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-center">
                <div className="text-[#FF6A3D] mb-4 flex justify-center"><Award size={20} /></div>
                <p className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-1">48</p>
                <p className="text-[9px] md:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Industry Awards</p>
              </div>
              <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-center">
                <div className="text-[#FF6A3D] mb-4 flex justify-center"><Globe size={20} /></div>
                <p className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-1">12</p>
                <p className="text-[9px] md:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Global Regions</p>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-[10px] md:text-xs font-bold text-[#0B1F3A] uppercase tracking-[0.3em] font-['Satoshi'] flex items-center gap-3">
                <div className="w-6 md:w-8 h-[1px] bg-[#FF6A3D]" /> Project Portfolio
              </h2>
              <button className="text-[10px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline flex items-center gap-2">
                View Full <ExternalLink size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {portfolio.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-[#E5E7EB] hover:border-[#0B1F3A] transition-all cursor-zoom-in group">
                  <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <h2 className="text-[10px] md:text-xs font-bold text-[#0B1F3A] uppercase tracking-[0.3em] mb-6 md:mb-8 font-['Satoshi'] flex items-center gap-3">
              <div className="w-6 md:w-8 h-[1px] bg-[#FF6A3D]" /> Verified Testimonials
            </h2>
            <div className="space-y-4 md:space-y-6">
              {[1, 2].map((idx) => (
                <div key={idx} className="p-6 md:p-10 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#0B1F3A]/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="size-10 md:w-12 md:h-12 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] flex items-center justify-center font-bold text-[#0B1F3A]">
                        {idx === 1 ? 'S' : 'J'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider">{idx === 1 ? 'Sarah Miller' : 'James Wilson'}</h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Oct 2025</p>
                      </div>
                    </div>
                    <div className="flex text-[#FF6A3D]">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-[#FF6A3D]" />)}
                    </div>
                  </div>
                  <p className="text-sm md:text-[#6B7280] leading-relaxed italic">
                    "{idx === 1 
                      ? "Working with the team was a highly professional experience. Their attention to technical detail and adherence to our timeline was exceptional." 
                      : "A true ecosystem partner. Delivered the project ahead of schedule and maintained consistent communication throughout the structural phase."}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Filters / Info */}
        <aside className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="sticky top-24 space-y-6 md:space-y-8">
            
            {/* Services Offered Card */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 md:p-10 space-y-6 md:space-y-8">
              <h3 className="text-[10px] md:text-xs font-bold text-[#0B1F3A] uppercase tracking-[0.3em]">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {['Interior Design', 'Project Mgmt', 'Site Survey', 'Technical Spec'].map(spec => (
                  <span key={spec} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#F9FAFB] border border-[#E5E7EB] text-[#0B1F3A] rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:border-[#FF6A3D] transition-all cursor-default">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Inquiry Form Card */}
            <div className="bg-[#0B1F3A] rounded-xl p-6 md:p-10 text-white shadow-xl shadow-[#0B1F3A]/20">
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 text-white flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[#FF6A3D]" /> Professional Inquiry
              </h3>
              
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="size-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#FF6A3D] group-hover:bg-[#FF6A3D] group-hover:text-white transition-all">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Call Office</p>
                    <p className="text-sm font-medium">+1 (555) 0123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="size-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#FF6A3D] group-hover:bg-[#FF6A3D] group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Official Email</p>
                    <p className="text-sm font-medium">connect@provider.com</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4 md:space-y-5">
                <input 
                  type="text" 
                  placeholder="Subject of inquiry" 
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-[12px] focus:outline-none focus:border-[#FF6A3D] transition-all text-white placeholder:text-white/20"
                />
                <textarea 
                  placeholder="Describe your requirements..." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[12px] focus:outline-none focus:border-[#FF6A3D] transition-all text-white placeholder:text-white/20 resize-none"
                />
                <button className="w-full py-4 md:py-5 bg-[#FF6A3D] text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#0B1F3A] transition-all shadow-lg active:scale-95">
                  Initiate Discussion
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
