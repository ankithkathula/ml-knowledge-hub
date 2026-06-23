import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Palette, Briefcase, Users, Lightbulb, TrendingUp, Award, Globe, ArrowRight, Sparkles, Layers, Eye, Compass } from 'lucide-react';
import { MainFooter } from './MainFooter';

interface DesignersLandingPageProps {
  onNavigateToHome?: () => void;
}

export function DesignersLandingPage({ onNavigateToHome }: DesignersLandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden font-['Satoshi']">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #FF6A3D 1px, transparent 1px),
                linear-gradient(to bottom, #FF6A3D 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1733381919300-e49929a82a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Designer Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 border-2 border-[#FF6A3D]/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-16 w-40 h-40 border-2 border-white/20 rounded-2xl blur-sm rotate-45"
        />

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6A3D]/20 backdrop-blur-sm border border-[#FF6A3D]/40 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#FF6A3D]" />
            <span className="text-white text-[11px] font-bold uppercase tracking-widest">Join 30,000+ Creative Professionals</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight uppercase"
          >
            Design <span className="text-[#FF6A3D]">Without Limits</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl text-white/90 mb-6 leading-tight uppercase tracking-tight"
          >
            Your Creativity, Our Platform,<br/>
            <span className="text-[#FF6A3D]">Infinite Possibilities</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Connect with brands, studios, and clients. Showcase your portfolio, discover inspiring materials, and turn your design vision into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group bg-[#FF6A3D] text-white px-10 py-4 rounded-xl hover:bg-[#E55A2D] transition-all duration-300 flex items-center gap-3 shadow-xl shadow-[#FF6A3D]/30 text-[12px] font-bold uppercase tracking-widest">
              Start Designing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest">
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 sm:py-32 bg-white dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white mb-8 leading-tight uppercase font-normal tracking-tight">
                Showcase Your <br/>
                <span className="text-[#FF6A3D]">Portfolio</span>
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                Build a stunning digital portfolio that captures the essence of your design philosophy. Display your best projects, from concept sketches to completed spaces, in a professional and visually compelling format.
              </p>

              <button className="group bg-[#FF6A3D] text-white px-10 py-4 rounded-xl hover:bg-[#E55A2D] transition-all duration-300 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-[#FF6A3D]/20">
                Create Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758957530781-4ff54e09bee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Portfolio"
                  className="w-full h-[540px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dream Project Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-16 flex items-center justify-center min-h-[480px] shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <Briefcase className="w-32 h-32 text-[#FF6A3D] mx-auto mb-8 opacity-20" />
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">Curated Marketplace</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white mb-8 leading-tight uppercase font-normal tracking-tight">
                Find Your Next<br />
                <span className="text-[#FF6A3D]">Dream Project</span>
              </h2>
              
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                Access a curated marketplace of design opportunities from leading brands, studios, and private clients. Whether you're looking for freelance work or your next full-time role, find projects that match your expertise and creative vision.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Material Library Section */}
      <section className="py-24 sm:py-32 bg-[#0F172A] text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-8 leading-tight uppercase font-normal tracking-tight">
                Explore an Extensive<br />
                <span className="text-[#FF6A3D]">Material Library</span>
              </h2>
              
              <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-lg">
                Access thousands of construction materials, finishes, and products from top brands. Browse high-quality imagery, technical specifications, and pricing to make informed design decisions.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  'Tiles & Flooring', 'Wall Finishes', 'Lighting Solutions',
                  'Furniture & Fixtures', 'Sustainable Options', 'Hardware & Fittings'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-[#FF6A3D] rounded-full shrink-0" />
                    <p className="text-white/80 text-sm font-medium uppercase tracking-widest">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649930536248-df58fd1f54f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Material Samples"
                  className="w-full h-[540px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="py-24 sm:py-32 bg-white dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white mb-6 uppercase font-normal tracking-tight">
              Elevate Your <span className="text-[#FF6A3D]">Design Process</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Access professional tools and inspiration galleries that streamline your workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Design Inspiration',
                description: 'Explore curated galleries of award-winning projects and trending design aesthetics.'
              },
              {
                icon: Layers,
                title: 'Project Templates',
                description: 'Jump-start your work with professional templates for presentations and proposals.'
              },
              {
                icon: Compass,
                title: 'Trend Insights',
                description: 'Stay ahead with analysis of emerging styles, materials, and design movements.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -12 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-10 border border-transparent hover:border-[#FF6A3D]/20 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#FF6A3D] transition-all duration-500">
                  <item.icon className="w-8 h-8 text-[#FF6A3D] group-hover:text-white transition-all duration-500" />
                </div>
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-4 uppercase tracking-widest font-normal">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white mb-8 leading-tight uppercase font-normal tracking-tight">
              Ready to <br />
              <span className="text-[#FF6A3D]">Transform Your Career?</span>
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of designers who are building successful careers and creating exceptional work on our platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group bg-[#FF6A3D] text-white px-12 py-5 rounded-xl hover:bg-[#E55A2D] transition-all duration-300 flex items-center gap-3 shadow-xl shadow-[#FF6A3D]/30 text-[12px] font-bold uppercase tracking-widest">
                Join as Designer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white dark:bg-gray-800 text-[#0F172A] dark:text-white px-12 py-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#FF6A3D] transition-all duration-300 flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest shadow-sm">
                View Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
