import React, { useState } from 'react';
import { ArrowRight, Building2, Briefcase, Users, GraduationCap } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  onKnowMore: () => void;
}

function RoleCard({ title, description, image, icon, onKnowMore }: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: '#0F172A',
        borderRadius: '12px',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.3)'
          : '0 8px 20px rgba(0, 0, 0, 0.2)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onKnowMore}
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Icon + Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[#FF6A3D]" style={{ width: '16px', height: '16px' }}>
            {icon}
          </div>
          <h3 className="text-white text-[15px] font-medium">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-[#9CA3AF] text-[13px] leading-relaxed mb-3">
          {description}
        </p>

        {/* CTA */}
        <button className="flex items-center gap-1.5 text-[#FF6A3D] text-[11px] font-medium uppercase tracking-wide hover:gap-2 transition-all">
          KNOW MORE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

interface EcosystemCTAProps {
  onGetStarted?: () => void;
  onNavigateToRole?: (role: string) => void;
}

export function EcosystemCTA({ onGetStarted, onNavigateToRole }: EcosystemCTAProps) {
  const cards = [
    {
      title: 'Brands',
      description: "Reach India's top architects and designers, and showcase your product catalog.",
      image: 'https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: <Building2 className="w-4 h-4" />,
      role: 'brands',
    },
    {
      title: 'Studios',
      description: 'Streamline collaboration, manage projects, and access exclusive architectural tools.',
      image: 'https://images.unsplash.com/photo-1627917932033-74123f070958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: <Briefcase className="w-4 h-4" />,
      role: 'studios',
    },
    {
      title: 'Service Professionals',
      description: 'Connect with architects, designers, consultants, freelancers, and studios offering professional services.',
      image: 'https://images.unsplash.com/photo-1641060272821-df59e2c0b5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: <Users className="w-4 h-4" />,
      role: 'professionals',
    },
    {
      title: 'Students',
      description: 'Learn from industry giants, build your professional network, and kickstart your career.',
      image: 'https://images.unsplash.com/photo-1773565181326-a6331eeca84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: <GraduationCap className="w-4 h-4" />,
      role: 'students',
    },
  ];

  return (
    <section 
      className="relative w-full py-16 px-6 font-['Satoshi',sans-serif]"
      style={{
        background: 'linear-gradient(135deg, #FF8A65 0%, #FF7043 50%, #FF5722 100%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-white text-[32px] md:text-[40px] font-normal mb-3 tracking-wider">
            JOIN OUR ECOSYSTEM
          </h2>
          <p className="text-white/80 text-[14px] max-w-2xl mx-auto">
            A connected platform where brands, designers, studios, and students collaborate through materials, knowledge, and projects.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <RoleCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              icon={card.icon}
              onKnowMore={() => onNavigateToRole?.(card.role)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#FF6A3D] rounded-full font-semibold text-[14px] hover:bg-white/95 transition-all hover:scale-105"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-white">
          <div className="text-center">
            <div className="text-[24px] md:text-[28px] font-bold mb-1">500+</div>
            <div className="text-[10px] uppercase tracking-wider opacity-70">TRUSTED BRANDS</div>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-[24px] md:text-[28px] font-bold mb-1">10k+</div>
            <div className="text-[10px] uppercase tracking-wider opacity-70">PROFESSIONALS</div>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-[24px] md:text-[28px] font-bold mb-1">50k+</div>
            <div className="text-[10px] uppercase tracking-wider opacity-70">PRODUCTS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
