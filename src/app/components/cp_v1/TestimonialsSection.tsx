import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// --- TYPES ---

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  project?: string;
}

interface TestimonialsSectionProps {
  rating?: number;
  reviewCount?: number;
  clientCount?: number;
  testimonials: Testimonial[];
  clientLogos?: string[];
}

// --- COMPONENT ---

export function TestimonialsSection({
  rating = 4.8,
  reviewCount = 120,
  clientCount = 100,
  testimonials,
  clientLogos
}: TestimonialsSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollContainer) {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        
        setScrollPosition(prev => {
          const newPosition = prev + scrollSpeed;
          
          // Reset to start when reaching end (infinite loop)
          if (newPosition >= maxScroll) {
            scrollContainer.scrollTop = 0;
            return 0;
          }
          
          scrollContainer.scrollTop = newPosition;
          return newPosition;
        });
      }
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT SIDE - TRUST SUMMARY */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              {/* Rating Block */}
              <div className="mb-8">
                <div className="flex items-end gap-4 mb-4">
                  <div className="text-[64px] font-bold text-gray-900 leading-none">
                    {rating.toFixed(1)}
                  </div>
                  <div className="pb-3">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i <= Math.floor(rating)
                              ? 'text-[#FF6A3D] fill-[#FF6A3D]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[13px] text-gray-600">
                      Based on {reviewCount}+ reviews
                    </p>
                  </div>
                </div>

                <div className="w-16 h-px bg-gray-200 my-6" />

                <p className="text-[14px] font-medium text-gray-700">
                  Trusted by {clientCount}+ clients
                </p>
              </div>

              {/* Client Logos (Optional) */}
              {clientLogos && clientLogos.length > 0 && (
                <div className="mt-8">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-4">
                    Featured Clients
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {clientLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="h-12 bg-gray-50 rounded-lg flex items-center justify-center p-3 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                      >
                        <ImageWithFallback
                          src={logo}
                          alt={`Client ${index + 1}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - AUTO-SCROLL TESTIMONIALS */}
          <div className="lg:col-span-2">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="h-[600px] overflow-y-auto scrollbar-hide scroll-smooth"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
              }}
            >
              <div className="space-y-4 pb-4">
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- TESTIMONIAL CARD COMPONENT ---

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15)' }}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all relative group"
    >
      {/* Subtle Quote Icon */}
      <Quote
        size={28}
        className="absolute top-4 right-4 text-gray-200 group-hover:text-gray-300 transition-colors"
      />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
            <ImageWithFallback
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name & Rating */}
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-[15px] font-bold text-gray-900">
              {testimonial.name}
            </h4>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i <= testimonial.rating
                      ? 'text-[#FF6A3D] fill-[#FF6A3D]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-[14px] text-gray-700 leading-relaxed mb-3 line-clamp-3">
            {testimonial.text}
          </p>

          {/* Project Tag */}
          {testimonial.project && (
            <p className="text-[12px] text-gray-500 italic">
              Project: {testimonial.project}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- DEFAULT EXPORT ---

export default TestimonialsSection;
