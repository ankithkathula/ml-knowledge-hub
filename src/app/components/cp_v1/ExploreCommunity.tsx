import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, TrendingUp, Users, Award, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const communities = [
  {
    id: 'brands',
    title: 'Brands',
    subtitle: 'Leading Manufacturers',
    description: 'Connect with premium construction brands and material suppliers',
    color: '#FF6A3D',
    lightColor: '#FFF4F0',
    icon: Sparkles,
    count: '2,500+',
    countLabel: 'Active Brands',
    profiles: [
      { name: 'Aditya Birla Group', role: 'Building Materials', projects: '1.2K', rating: 4.9 },
      { name: 'Asian Paints', role: 'Paint & Coatings', projects: '980', rating: 4.8 },
      { name: 'Hindware', role: 'Sanitaryware', projects: '750', rating: 4.9 },
      { name: 'Kajaria Ceramics', role: 'Tiles & Flooring', projects: '890', rating: 4.7 },
      { name: 'Jaquar', role: 'Bath Fittings', projects: '650', rating: 4.8 },
    ],
  },
  {
    id: 'designers',
    title: 'Designers',
    subtitle: 'Creative Professionals',
    description: 'Discover talented architects and interior design experts',
    color: '#8B5CF6',
    lightColor: '#F5F3FF',
    icon: TrendingUp,
    count: '15K+',
    countLabel: 'Verified Designers',
    profiles: [
      { name: 'Priya Sharma', role: 'Interior Designer', projects: '124', rating: 5.0 },
      { name: 'Rahul Mehta', role: 'Architect', projects: '89', rating: 4.9 },
      { name: 'Anjali Verma', role: 'Space Planner', projects: '156', rating: 4.8 },
      { name: 'Sanjay Kumar', role: 'Landscape Designer', projects: '92', rating: 4.9 },
      { name: 'Neha Kapoor', role: 'Lighting Designer', projects: '67', rating: 5.0 },
    ],
  },
  {
    id: 'studios',
    title: 'Studios',
    subtitle: 'Design Powerhouses',
    description: 'Partner with award-winning architectural and design firms',
    color: '#0EA5E9',
    lightColor: '#F0F9FF',
    icon: Users,
    count: '3,200+',
    countLabel: 'Registered Studios',
    profiles: [
      { name: 'Urban Design Co.', role: 'Architecture Firm', projects: '340', rating: 4.9 },
      { name: 'Modern Spaces', role: 'Interior Studio', projects: '285', rating: 4.8 },
      { name: 'Green Build', role: 'Sustainable Design', projects: '198', rating: 4.7 },
      { name: 'Crafted Interiors', role: 'Luxury Design', projects: '412', rating: 5.0 },
      { name: 'Visionary Architects', role: 'Commercial Design', projects: '256', rating: 4.8 },
    ],
  },
];

function ProfileCard({ profile, color, index, onClick }: { profile: any; color: string; index: number; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative min-w-[280px] sm:min-w-[320px] md:min-w-[340px] cursor-pointer"
    >
      <div className="relative bg-white rounded-xl p-6 md:p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-xl font-bold uppercase">
              {profile.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[#0F172A] mb-1 truncate font-medium">{profile.name}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest">{profile.role}</p>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-[#0F172A]">{profile.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{profile.projects} PROJECTS</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF6A3D] transition-colors" />
        </div>
      </div>
    </div>
  );
}

export function ExploreCommunity({ onBrandClick }: { onBrandClick?: (brandName: string) => void }) {
  const [selectedTab, setSelectedTab] = useState<'freelancers' | 'firms' | 'consultants'>('freelancers');

  return (
    <section className="py-20 lg:py-32 bg-white font-['Satoshi']">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Users className="w-12 h-12 text-[#FF6A3D]" />
              <div className="h-12 w-px bg-gray-100" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Communities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] leading-tight uppercase font-normal tracking-tight">
              Connect With <br/>
              <span className="text-[#FF6A3D]">The Ecosystem</span>
            </h2>
          </div>
          <div className="lg:pt-20">
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Connect with the right community for your construction and design journey. Each community brings together professionals who share your passion and expertise.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm" />
                ))}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6A3D]">10,000+ Active Members</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-8 md:p-16 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 w-full md:w-auto">
              {['FREELANCERS', 'FIRMS', 'CONSULTANTS'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab.toLowerCase() as any)}
                  className={`pb-4 px-2 text-[11px] font-bold uppercase tracking-widest transition-all relative ${
                    selectedTab === tab.toLowerCase() ? 'text-[#FF6A3D]' : 'text-gray-400 hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                  {selectedTab === tab.toLowerCase() && (
                    <motion.div layoutId="communityTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" />
                  )}
                </button>
              ))}
            </div>
            <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6A3D] hover:translate-x-2 transition-all flex items-center gap-3">
              Browse Directory <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Priya Sharma', role: 'Interior Designer', projects: '124', rating: 5.0, color: '#FF6A3D' },
              { name: 'Rahul Mehta', role: 'Architect', projects: '89', rating: 4.9, color: '#8B5CF6' },
              { name: 'Anjali Verma', role: 'Space Planner', projects: '156', rating: 4.8, color: '#0EA5E9' },
              { name: 'Sanjay Kumar', role: 'Landscape', projects: '92', rating: 4.9, color: '#10B981' },
            ].map((profile, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ backgroundColor: profile.color }}>
                    {profile.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-lg">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{profile.rating}</span>
                  </div>
                </div>
                <h4 className="text-[15px] font-medium text-[#0F172A] dark:text-white mb-1">{profile.name}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">{profile.role}</p>
                <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{profile.projects} Projects</span>
                  <ArrowRight size={14} className="text-gray-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
