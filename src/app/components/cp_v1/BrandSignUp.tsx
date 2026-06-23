import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ChevronDown, Check, X, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

const categories = [
  {
    main: "Flooring",
    sub: ["Tile", "Hardwood", "Carpet", "Vinyl", "Laminate"]
  },
  {
    main: "Lighting",
    sub: ["Pendant", "Chandelier", "Recessed", "Track", "Wall Sconce"]
  },
  {
    main: "Sanitary",
    sub: ["Faucets", "Sinks", "Toilets", "Showers", "Bathtubs"]
  },
  {
    main: "Doors & Windows",
    sub: ["Entry Doors", "Interior Doors", "Windows", "Sliding Doors"]
  },
  {
    main: "Wall Finishes",
    sub: ["Paint", "Wallpaper", "Panels", "Tiles"]
  }
];

const indianStates = [
  "Pan India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const engagementOptions = [
  "Lead Generation",
  "Branding",
  "Marketing"
];

const carouselImages = [
  "https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBzaG93cm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NjQyNDI3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1761415451360-3847fc21bc79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2NDI0Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzdHVkaW8lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NDI0Mjc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1610834651699-1d76adff0c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQyNDI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1630025504699-0df6d41b56a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBzcGFjZXxlbnwxfHx8fDE3NjQyNDI3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

interface BrandSignUpProps {
  onSubmitSuccess?: () => void;
}

export default function BrandSignUp({ onSubmitSuccess }: BrandSignUpProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Form state
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedEngagements, setSelectedEngagements] = useState<string[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  // Auto-rotate carousel images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to thank you page
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-16 md:pt-20 lg:pt-24">
      <div className="relative bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-[1152px] lg:h-[774px] flex flex-col lg:flex-row">
        
        {/* Right Panel - Image & Testimonial */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {/* Carousel Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={carouselImages[currentImageIndex]}
                alt="Brand Showroom"
                className="absolute w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Value Proposition - Centered */}
          <div className="absolute inset-0 flex items-center px-[40px]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-2xl backdrop-blur-md bg-black/40 rounded-2xl p-10 border border-white/10 shadow-2xl"
            >
              <h2 className="font-['Satoshi',sans-serif] text-4xl text-white mb-10 leading-tight">
                Join India's Premier Construction Ecosystem
              </h2>
              
              <div className="space-y-5">
                {[
                  "Connect with 10,000+ designers, architects & studios",
                  "Showcase your products to qualified professionals",
                  "Generate quality leads and grow your brand visibility",
                  "Be part of a trusted ecosystem of construction professionals"
                ].map((text, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FF6A3D] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-['Satoshi',sans-serif] text-white text-lg">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-12 md:py-8 flex flex-col overflow-y-auto">
          {/* Brand Label */}
          <p className="font-['Satoshi',sans-serif] text-[#FF6A3D] text-xs tracking-wider mb-6">
            BRAND SIGN UP
          </p>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b border-gray-200 relative">
            <button
              onClick={() => setActiveTab('signup')}
              className="pb-3 px-2 transition-all relative group"
            >
              <span className={`font-['Satoshi',sans-serif] text-sm leading-[24px] transition-colors ${
                activeTab === 'signup' ? 'text-[#101828]' : 'text-[#99A1AF]'
              } group-hover:text-[#101828]`}>
                Sign Up
              </span>
              {activeTab === 'signup' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]" 
                />
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Brand Information Section */}
            <div className="space-y-4">
              <h3 className="font-['Satoshi',sans-serif] font-semibold text-[#364153] text-xs tracking-wide">BRAND INFORMATION</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter brand name"
                    className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.yourbrand.com"
                    className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    About
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about your brand..."
                    rows={3}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    Brand Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={brandEmail}
                    onChange={(e) => setBrandEmail(e.target.value)}
                    placeholder="contact@yourbrand.com"
                    className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Category Selection - Multi Select */}
            <div className="space-y-4">
              <h3 className="font-['Satoshi',sans-serif] font-semibold text-[#364153] text-xs tracking-wide">CATEGORY</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                  Choose Your Categories
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-left flex items-center justify-between focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  >
                    <span className={selectedCategories.length > 0 ? 'text-[#101828]' : 'text-[#99A1AF]'}>
                      {selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'Select categories'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#99A1AF] transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {categoryOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-52 overflow-y-auto custom-scrollbar">
                      {categories.map((cat, idx) => (
                        <div key={idx}>
                          {cat.sub.map((subCat, subIdx) => {
                            const fullCategory = `${cat.main} - ${subCat}`;
                            const isSelected = selectedCategories.includes(fullCategory);
                            return (
                              <button
                                key={subIdx}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedCategories(selectedCategories.filter(c => c !== fullCategory));
                                  } else {
                                    setSelectedCategories([...selectedCategories, fullCategory]);
                                  }
                                }}
                                className={`w-full px-4 py-2.5 text-left font-['Satoshi',sans-serif] text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between ${
                                  isSelected ? 'bg-[#FF6A3D]/5 text-[#FF6A3D]' : 'text-[#101828]'
                                }`}
                              >
                                <span>{fullCategory}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#FF6A3D]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Selected Categories Tags */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6A3D]/10 text-[#FF6A3D] rounded-lg font-['Satoshi',sans-serif] text-xs"
                      >
                        {cat}
                        <button
                          type="button"
                          onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                          className="hover:text-[#E55A2D] transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Locations Served - Multi Select */}
            <div className="space-y-4">
              <div className="border-t border-gray-200 -mx-0 mb-4"></div>
              <h3 className="font-['Satoshi',sans-serif] font-semibold text-[#364153] text-xs tracking-wide">LOCATIONS SERVED</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                  Where do you serve?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLocationOpen(!locationOpen)}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-left flex items-center justify-between focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  >
                    <span className={selectedLocations.length > 0 ? 'text-[#101828]' : 'text-[#99A1AF]'}>
                      {selectedLocations.length > 0 ? `${selectedLocations.length} selected` : 'Select locations'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#99A1AF] transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {locationOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-52 overflow-y-auto custom-scrollbar">
                      {indianStates.map((state, idx) => {
                        const isSelected = selectedLocations.includes(state);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (state === "Pan India") {
                                if (isSelected) {
                                  setSelectedLocations([]);
                                } else {
                                  setSelectedLocations(["Pan India"]);
                                }
                              } else {
                                if (isSelected) {
                                  setSelectedLocations(selectedLocations.filter(l => l !== state));
                                } else {
                                  const newLocations = selectedLocations.filter(l => l !== "Pan India");
                                  setSelectedLocations([...newLocations, state]);
                                }
                              }
                            }}
                            className={`w-full px-4 py-2.5 text-left font-['Satoshi',sans-serif] text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between ${
                              isSelected ? 'bg-[#FF6A3D]/5 text-[#FF6A3D]' : 'text-[#101828]'
                            } ${state === "Pan India" ? 'font-medium' : ''}`}
                          >
                            <span>{state}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#FF6A3D]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Selected Locations Tags */}
                {selectedLocations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6A3D]/10 text-[#FF6A3D] rounded-lg font-['Satoshi',sans-serif] text-xs"
                      >
                        {loc}
                        <button
                          type="button"
                          onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== loc))}
                          className="hover:text-[#E55A2D] transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Person Section with Background */}
            <div className="bg-gray-50 p-5 rounded-xl space-y-4">
              <h3 className="font-['Satoshi',sans-serif] font-semibold text-[#364153] text-xs tracking-wide">CONTACT PERSON DETAILS</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="John Doe"
                  className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 00000 00000"
                    className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Satoshi',sans-serif] text-xs text-[#364153]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-11 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-['Satoshi',sans-serif] text-sm text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:border-[#FF6A3D] focus:ring-1 focus:ring-[#FF6A3D]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Engagement Options - Multi Select */}
            <div className="space-y-4">
              <h3 className="font-['Satoshi',sans-serif] font-semibold text-[#364153] text-xs tracking-wide">HOW DO YOU LIKE TO ENGAGE WITH US?</h3>
              
              <div className="flex flex-col gap-3">
                {engagementOptions.map((option, idx) => {
                  const isSelected = selectedEngagements.includes(option);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedEngagements(selectedEngagements.filter(e => e !== option));
                        } else {
                          setSelectedEngagements([...selectedEngagements, option]);
                        }
                      }}
                      className={`w-full h-11 px-4 py-2.5 border rounded-lg font-['Satoshi',sans-serif] text-sm text-left flex items-center gap-3 transition-all ${
                        isSelected 
                          ? 'border-[#FF6A3D] bg-[#FF6A3D]/5 text-[#FF6A3D]' 
                          : 'border-gray-200 bg-white text-[#101828] hover:border-[#FF6A3D]/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#FF6A3D] bg-[#FF6A3D]' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#FF6A3D] hover:bg-[#E55A2D] rounded-lg font-['Satoshi',sans-serif] text-sm text-white transition-all shadow-lg hover:shadow-xl mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
