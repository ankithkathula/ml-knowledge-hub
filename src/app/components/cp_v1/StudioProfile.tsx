import { motion } from 'motion/react';
import { 
  MapPin, Star, ShieldCheck, Mail, Users, 
  ArrowLeft, ArrowRight, Building2, Layers
} from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { MainFooter } from './MainFooter';
import { STUDIOS, PROFESSIONALS } from './servicesData';

interface StudioProfileProps {
  id: string | number | null;
  onNavigate: (page: any, id?: string | number) => void;
}

export function StudioProfile({ id, onNavigate }: StudioProfileProps) {
  const studio = STUDIOS.find(s => s.id === id) || STUDIOS[0];
  const teamMembers = PROFESSIONALS.filter(p => p.studio_id === studio.id);

  return (
    <div className="pt-20 bg-white dark:bg-gray-950 min-h-screen font-['Satoshi']">
      {/* Cover Area */}
      <section className="relative h-[400px] md:h-[500px] bg-[#0F172A]">
        <ImageWithFallback src={studio.cover_image} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 w-full pb-12">
            <button 
              onClick={() => onNavigate('studio-directory')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Back to Studios</span>
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-1 shadow-2xl overflow-hidden shrink-0 border border-white/20">
                <ImageWithFallback src={studio.logo} className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                  {studio.verified && (
                    <span className="bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-[#FF6A3D]/20">
                      <ShieldCheck className="w-3 h-3" /> Verified Studio
                    </span>
                  )}
                  <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                    <Users className="w-3 h-3" /> {studio.team_size} Experts
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-normal text-white uppercase tracking-tight mb-4">{studio.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF6A3D]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{studio.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{studio.rating} Studio Rating</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-10 py-4 bg-[#FF6A3D] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#E55A2D] transition-all shadow-xl shadow-[#FF6A3D]/20">
                  Contact Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-24">
            <div className="space-y-8">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F172A] dark:text-white flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#FF6A3D]" /> About Studio
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
                {studio.about}
              </p>
            </div>

            <div className="space-y-12">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F172A] dark:text-white flex items-center gap-3">
                <Layers className="w-6 h-6 text-[#FF6A3D]" /> Portfolio Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {studio.portfolio.map((img, i) => (
                  <div key={i} className="group relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                    <ImageWithFallback src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        View Case Study
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0F172A] dark:text-white flex items-center gap-3">
                <Users className="w-6 h-6 text-[#FF6A3D]" /> Core Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map(pro => (
                  <div key={pro.id} className="group flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-[#FF6A3D]/20 transition-all cursor-pointer shadow-sm hover:shadow-xl" onClick={() => onNavigate('professional-profile', pro.id)}>
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                      <ImageWithFallback src={pro.photo} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-medium text-[#0F172A] dark:text-white group-hover:text-[#FF6A3D] transition-colors">{pro.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{pro.role}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF6A3D] transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-10 bg-[#0B1220] text-white rounded-[32px] sticky top-32 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A3D]/10 rounded-full blur-3xl" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-10 text-[#FF6A3D] flex items-center gap-3">
                <div className="w-6 h-px bg-[#FF6A3D]" /> Services Offered
              </h3>
              <div className="space-y-4">
                {studio.services.map(service => (
                  <div key={service} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-all">
                    <CheckCircleIcon />
                    <span className="text-[13px] font-medium tracking-wide text-white/90">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Expertise Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {studio.materials.map(m => (
                    <span key={m} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/5">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 text-[#FF6A3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
