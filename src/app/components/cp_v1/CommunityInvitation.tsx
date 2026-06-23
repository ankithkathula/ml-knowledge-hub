import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Users, TrendingUp, Globe } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CommunityInvitation() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden font-['Satoshi']">
      {/* Decorative animated line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6A3D] to-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#FF6A3D]/5 to-[#ad46ff]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-[#2b7fff]/5 to-[#00bba7]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            style={{ opacity, scale }}
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#101828] mb-6 font-normal uppercase tracking-tight"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(90deg, #101828, #FF6A3D, #101828)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Be Part of Something Bigger
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-lg"
            >
              Join our vibrant community and explore endless opportunities to collaborate with fellow professionals, inspire aspiring talent, and partner with leading brands in the construction industry.
            </motion.p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10">
              {[
                { value: 50000, label: 'Members', suffix: '+', icon: Users, color: '#FF6A3D' },
                { value: 5000, label: 'Brands', suffix: '+', icon: TrendingUp, color: '#ad46ff' },
                { value: 200, label: 'Countries', suffix: '+', icon: Globe, color: '#2b7fff' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.6 + index * 0.15, 
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-50 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${stat.color}10, transparent)` }}
                  />
                  <div className="relative z-10">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-3" style={{ color: stat.color }} />
                    <p className="text-xl sm:text-2xl text-[#101828] mb-1 font-normal">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255,106,61,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF6A3D] text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden w-full sm:w-auto text-[11px] font-bold uppercase tracking-widest"
            >
              <span className="relative z-10">Join Now</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: i === 0 ? '#FF6A3D20' : i === 1 ? '#ad46ff20' : '#2b7fff20',
                    scale: 1 - i * 0.2,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1 - i * 0.2, 1 - i * 0.2 + 0.05, 1 - i * 0.2],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    },
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-[#FF6A3D] via-[#ad46ff] to-[#2b7fff] rounded-full p-1 shadow-2xl">
                  <div className="bg-white rounded-full p-12">
                    <Users className="w-24 h-24 text-[#FF6A3D]" />
                  </div>
                </div>
              </div>

              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                  style={{
                    left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  }}
                  animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full" 
                    style={{
                      background: `linear-gradient(135deg, ${
                        i % 3 === 0 ? '#FF6A3D' : i % 3 === 1 ? '#ad46ff' : '#2b7fff'
                      }, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
