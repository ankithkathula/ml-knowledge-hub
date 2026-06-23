import { motion } from 'motion/react';
import { Palette, Building2, Briefcase, GraduationCap, ArrowRight, Users, TrendingUp, Globe } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

const stakeholders = [
  {
    title: 'I am a Designer',
    description: 'Showcase your portfolio, connect with brands, and find exciting design opportunities.',
    icon: Palette,
  },
  {
    title: 'I am a Brand',
    description: 'Reach thousands of professionals, showcase your products, and grow your market presence.',
    icon: Building2,
  },
  {
    title: 'I am a Studio',
    description: 'Collaborate with industry experts, find talented designers, and manage large-scale projects.',
    icon: Briefcase,
  },
  {
    title: 'I am a Student',
    description: 'Learn from professionals, build your portfolio, and kickstart your design career.',
    icon: GraduationCap,
  },
];

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StakeholderBlocks({ onBrandLandingClick, onStudioLandingClick, onStudentLandingClick, onDesignerLandingClick }: { onBrandLandingClick?: () => void; onStudioLandingClick?: () => void; onStudentLandingClick?: () => void; onDesignerLandingClick?: () => void }) {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0F172A] overflow-hidden w-full font-['Satoshi']">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FF6A3D]" />
            <p className="text-[#FF6A3D] text-[10px] font-bold uppercase tracking-[0.3em]">Join The Ecosystem</p>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-tight mb-6">
            Tailored Experiences <br/>
            For <span className="text-[#FF6A3D]">Every Role</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stakeholders.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-[#FF6A3D] hover:border-[#FF6A3D]"
              onClick={
                item.title.includes('Designer') ? onDesignerLandingClick :
                item.title.includes('Brand') ? onBrandLandingClick :
                item.title.includes('Studio') ? onStudioLandingClick :
                onStudentLandingClick
              }
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500">
                <item.icon className="w-6 h-6 text-[#FF6A3D] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl text-white mb-4 uppercase tracking-wider font-normal">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-white/80 transition-colors duration-500">{item.description}</p>
              <div className="flex items-center gap-3 text-[#FF6A3D] text-[11px] font-bold uppercase tracking-widest group-hover:text-white transition-all duration-500">
                Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: 50000, label: 'Active Members', suffix: '+' },
            { value: 5000, label: 'Brands', suffix: '+' },
            { value: 200, label: 'Cities', suffix: '+' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-4xl text-white mb-2 font-normal">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
