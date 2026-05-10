import { useState } from 'react';
import { ChevronDown, ExternalLink, Plus, Heart, ChevronRight, Minus, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MainFooter } from '../MainFooter';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- Data Structures ---

interface BrandProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  attributes: string[];
}

interface SimilarProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  attributes: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const productData = {
  name: 'Glazed Ceramic Tile',
  brand: 'Kajaria Ceramics',
  brandLogo: 'https://companieslogo.com/img/orig/KAJARIACER.NS-3507198e.png?t=1593960012',
  images: [
    'https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  ],
  description: 'Premium glazed ceramic tile with superior durability and aesthetic appeal. Perfect for both residential and commercial applications. Engineered for high-traffic environments while maintaining a refined matte finish.',
  sizes: ['600×600 mm', '800×800 mm', '1200×600 mm'],
  colors: ['Pearl White', 'Onyx Grey', 'Soft Beige', 'Carbon Black'],
  finishes: ['Matte', 'Glossy', 'Satin'],
  
  // SECTION 2: ATTRIBUTES (Nested Hierarchy)
  attributeGroups: [
    {
      title: 'DIMENSIONS',
      sections: [
        {
          name: 'Physical Properties',
          attributes: [
            { label: 'Width', value: '600 mm' },
            { label: 'Height', value: '600 mm' },
            { label: 'Thickness', value: '10 mm' },
            { label: 'Weight per pc', value: '0.5 kg' },
          ]
        }
      ]
    },
    {
      title: 'TECHNICAL SPECIFICATIONS',
      sections: [
        {
          name: 'Performance',
          attributes: [
            { label: 'Water Absorption', value: '< 0.5%' },
            { label: 'Breaking Strength', value: '> 1300 N' },
            { label: 'Modulus of Rupture', value: '> 35 N/mm²' },
            { label: 'Surface Hardness', value: '6 Mohs' },
          ]
        },
        {
          name: 'Safety & Quality',
          attributes: [
            { label: 'Fire Rating', value: 'Class A1' },
            { label: 'Slip Resistance', value: 'R10' },
            { label: 'Certification', value: 'ISO 13006' },
          ]
        }
      ]
    },
    {
      title: 'PACKAGING',
      sections: [
        {
          name: 'Logistic Details',
          attributes: [
            { label: 'Package Option', value: 'Box' },
            { label: 'Pieces per Box', value: '12 pieces' },
            { label: 'Coverage per Box', value: '4.32 m²' },
            { label: 'Box Dimensions', value: '0.61×0.31×0.12 m' },
          ]
        }
      ]
    }
  ],

  // SECTION 3: FEATURES
  features: [
    'Superior durability and long-lasting performance',
    'Low maintenance and easy to clean with standard solutions',
    'Suitable for heavy-traffic residential and commercial areas',
    'Environmentally friendly production process with recycled content',
    'UV resistant coating prevents color fading over time'
  ],

  // SECTION 3: FEATURES (Grouped Structure)
  featureGroups: [
    {
      title: 'Durability & Performance',
      features: [
        'Superior durability and long-lasting performance',
        'Low maintenance and easy to clean',
        'Suitable for heavy traffic areas'
      ]
    },
    {
      title: 'Environmental Benefits',
      features: [
        'Eco-friendly production process',
        'UV-resistant coating prevents fading'
      ]
    },
    {
      title: 'Installation & Maintenance',
      features: [
        'Easy installation process',
        'Compatible with standard adhesives',
        'Minimal grout joint requirements'
      ]
    }
  ],

  // SECTION 4: APPLICATIONS
  applications: [
    'Residential Flooring',
    'Commercial Spaces',
    'Kitchen Walls',
    'Bathroom Walls',
    'Outdoor Facade',
    'Living Areas',
    'Public Hallways'
  ],

  // SECTION 5: FAQ
  faqs: [
    {
      question: 'Can this tile be used for outdoor applications?',
      answer: 'Yes, this glazed ceramic tile is engineered with a fire rating of Class A1 and low water absorption, making it suitable for outdoor facades and covered patio areas.'
    },
    {
      question: 'What is the recommended grout joint width?',
      answer: 'For a 600×600 mm tile, we recommend a minimum grout joint of 2-3 mm to allow for structural movement and thermal expansion.'
    },
    {
      question: 'Is this product slip-resistant when wet?',
      answer: 'The tile has an R10 slip resistance rating, which provides moderate friction. It is suitable for most interior residential areas, though extra care is recommended in wet-room environments.'
    }
  ],

  aboutBrand: 'Kajaria Ceramics is the largest manufacturer of ceramic/vitrified tiles in India. It has an annual aggregate capacity of 86.47 mn. sq. meters, distributed across eight plants. All plants are ISO 9001, ISO 14001 and OHSAS 18001 certified.'
};

const brandProducts: BrandProduct[] = [
  { id: 'bp1', name: 'Polished Vitrified Tile', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600', attributes: ['800×800 mm', 'Glossy', 'Nano Tech'] },
  { id: 'bp2', name: 'Satin Finish Slab', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', attributes: ['1200×600 mm', 'Satin', 'Stone Look'] },
  { id: 'bp3', name: 'Digital Wall Tile', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?w=600', attributes: ['300×600 mm', 'Matte', 'Ceramic'] },
  { id: 'bp4', name: 'Anti-Skid Outdoor', brand: 'Kajaria', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600', attributes: ['600×600 mm', 'Textured', 'Full Body'] },
];

const similarProducts: SimilarProduct[] = [
  { id: 'sp1', name: 'Pristine White Marble', brand: 'Asian Paints', image: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=600', attributes: ['Matte', '600×600 mm', 'Floor Tile'] },
  { id: 'sp2', name: 'Industrial Grey Slate', brand: 'Nitco Tiles', image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?w=600', attributes: ['Natural', '800×800 mm', 'Vitrified'] },
  { id: 'sp3', name: 'Terrazzo Multi', brand: 'Somany', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600', attributes: ['Polished', '600×600 mm', 'Patterned'] },
  { id: 'sp4', name: 'Obsidian Black', brand: 'Orientbell', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600', attributes: ['High Gloss', '600×1200 mm', 'Wall Slab'] },
];

// --- Sub-Components ---

const ProductCard = ({ product, showBrand = true }: { product: BrandProduct | SimilarProduct, showBrand?: boolean }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden group cursor-pointer flex flex-col h-full shadow-sm hover:shadow-md transition-all"
  >
    <div className="relative h-[180px] overflow-hidden bg-[#F9FAFB]">
      <ImageWithFallback src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm">
        <ImageWithFallback src={productData.brandLogo} className="w-full h-full object-contain" />
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h4 className="text-[#0F172A] text-[15px] font-medium mb-1 truncate">{product.name}</h4>
      {showBrand && <p className="text-[#6B7280] text-[13px] mb-3">{product.brand}</p>}
      
      <div className="flex flex-wrap gap-2 mb-6">
        {product.attributes.map((attr: string) => (
          <span key={attr} className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-widest">{attr}</span>
        ))}
      </div>
      
      <button className="mt-auto w-full h-10 border border-[#E5E7EB] text-[#0F172A] rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-gray-300 transition-all">
        View Product
      </button>
    </div>
  </motion.div>
);

const FAQItem = ({ faq, index }: { faq: FAQ, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden transition-all hover:border-[#D1D5DB]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group bg-white hover:bg-[#F9FAFB] transition-colors"
      >
        <span className="text-[15px] font-medium text-[#0F172A] group-hover:text-[#FF6A3D] transition-colors pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-[#FFEDE5] text-[#FF6A3D]' : 'bg-gray-50 text-gray-400'}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white"
          >
            <p className="text-[#6B7280] text-[14px] leading-relaxed px-6 pb-6 pl-8">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

interface ProductDetailPageProps {
  productId?: string;
  onBack?: () => void;
  onViewBrandProfile?: (brandName: string) => void;
}

export function ProductDetailPage({ productId, onBack, onViewBrandProfile }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [activeAttributeTab, setActiveAttributeTab] = useState(0);

  return (
    <div className="min-h-screen bg-white pt-[64px] md:pt-[100px] font-['Satoshi']">
      
      {/* SECTION 1: HERO PRODUCT SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-[60px]">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Vertical Thumbnails + Main Image */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto no-scrollbar">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border transition-all ${
                    selectedImage === index 
                      ? 'border-[#FF6A3D] shadow-md' 
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                  }`}
                >
                  <img src={image} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden bg-[#F9FAFB] shadow-md border border-[#E5E7EB] order-1 md:order-2">
              <motion.img 
                key={selectedImage}
                src={productData.images[selectedImage]} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right Column: Info & Attributes */}
          <div className="lg:col-span-5 space-y-8">
            {onBack && (
              <button onClick={onBack} className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest hover:text-[#FF6A3D] transition-colors flex items-center gap-2">
                <ChevronLeft size={14} /> Back to Products
              </button>
            )}

            <div>
              <h1 className="text-[26px] md:text-[28px] font-medium text-[#0F172A] uppercase tracking-tight mb-1 leading-tight">
                {productData.name}
              </h1>
              <button 
                onClick={() => onViewBrandProfile?.(productData.brand)}
                className="text-[15px] text-[#6B7280] hover:text-[#FF6A3D] hover:underline transition-colors"
              >
                by {productData.brand}
              </button>
            </div>

            <div className="space-y-6">
              {/* Selectors */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Size</p>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size, i) => (
                    <motion.button 
                      key={size} 
                      onClick={() => setSelectedSize(i)} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${
                        selectedSize === i 
                          ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' 
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Color</p>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color, i) => (
                    <motion.button 
                      key={color} 
                      onClick={() => setSelectedColor(i)} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${
                        selectedColor === i 
                          ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' 
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-[#364153] uppercase tracking-[0.15em]">Finish</p>
                <div className="flex flex-wrap gap-2">
                  {productData.finishes.map((finish, i) => (
                    <motion.button 
                      key={finish} 
                      onClick={() => setSelectedFinish(i)} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-3 rounded-lg border text-[13px] font-medium transition-all ${
                        selectedFinish === i 
                          ? 'border-[#FF6A3D] bg-[#FFF5F0] text-[#FF6A3D]' 
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                      }`}
                    >
                      {finish}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-[12px] font-bold text-[#364153] uppercase tracking-[0.15em] mb-3">Description</h3>
              <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[420px]">{productData.description}</p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-4">
              <motion.button 
                disabled 
                whileHover={{ scale: 1.02 }}
                className="h-12 flex-1 bg-[#E5E7EB] text-[#9CA3AF] border border-transparent rounded-lg text-[11px] font-bold uppercase tracking-widest cursor-not-allowed"
              >
                Request Quote
              </motion.button>
              <motion.button 
                disabled 
                whileHover={{ scale: 1.02 }}
                className="h-12 flex-1 bg-white text-[#9CA3AF] border border-[#E5E7EB] rounded-lg text-[11px] font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Heart size={14} /> Add to Wishlist
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ATTRIBUTES SECTION */}
      {productData.attributeGroups.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#FF6A3D]" />
              <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Product Details</h2>
            </div>

            {/* Tab Bar - Only show if more than 1 group */}
            {productData.attributeGroups.length > 1 && (
              <div className="mb-8 border-b border-[#E5E7EB] overflow-x-auto no-scrollbar">
                <div className="flex gap-6 min-w-max">
                  {productData.attributeGroups.map((group, index) => (
                    <button
                      key={group.title}
                      onClick={() => setActiveAttributeTab(index)}
                      className="relative pb-4 transition-colors"
                    >
                      <span className={`text-[14px] uppercase tracking-wide transition-all ${
                        activeAttributeTab === index 
                          ? 'text-[#0F172A] font-medium' 
                          : 'text-[#6B7280] font-normal hover:text-[#4B5563]'
                      }`}>
                        {group.title}
                      </span>
                      {/* Active underline */}
                      {activeAttributeTab === index && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6A3D]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Panel Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAttributeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-sm"
              >
                {/* Active Tab Content */}
                <div className="space-y-10">
                  {productData.attributeGroups[activeAttributeTab].sections.map((section) => (
                    <div key={section.name}>
                      {/* Sub-group header */}
                      <p className="text-[13px] font-medium text-[#4B5563] uppercase tracking-wide mb-6">{section.name}</p>
                      
                      {/* Spec Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
                        {section.attributes.map((attr) => (
                          <div key={attr.label} className="space-y-1.5">
                            <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wide block font-normal">{attr.label}</span>
                            <span className="text-[15px] text-[#111827] font-medium block">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* SECTION 3: FEATURES SECTION */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Features</h2>
          </div>

          {/* Feature Groups Container - 2 Column Grid */}
          <div className={`grid gap-y-8 gap-x-12 ${
            productData.featureGroups.length === 1 
              ? 'max-w-2xl mx-auto' 
              : 'md:grid-cols-2'
          }`}>
            {productData.featureGroups.map((group, groupIndex) => (
              <div key={group.title} className={groupIndex > 0 ? 'pt-8 border-t border-[#E5E7EB]/60 md:border-t-0 md:pt-0' : ''}>
                {/* Group Title */}
                <h3 className="text-[14px] font-medium text-[#0F172A] mb-3">
                  {group.title}
                </h3>

                {/* Feature List */}
                <div className="space-y-2.5">
                  {group.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      {/* 4px Orange Dot Bullet */}
                      <div className="mt-[7px] w-1 h-1 rounded-full bg-[#FF6A3D] shrink-0" />
                      
                      {/* Feature Text */}
                      <p className="text-[14px] text-[#6B7280] leading-[1.6]">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: APPLICATIONS SECTION */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Applications</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {productData.applications.map((app) => (
              <div 
                key={app}
                className="px-5 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-full text-[13px] font-medium border border-transparent transition-colors"
              >
                {app}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ SECTION */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#FF6A3D]" />
            <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 max-w-4xl">
            {productData.faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: MORE FROM THIS BRAND */}
      <section className="py-16 md:py-20 bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#FF6A3D]" />
                <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">More from this Brand</h2>
              </div>
              <p className="text-[#9CA3AF] text-[13px]">Explore other products from {productData.brand}.</p>
            </div>
            <button className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest hover:underline flex items-center gap-2 transition-colors">
              View Brand <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map(product => <ProductCard key={product.id} product={product} showBrand={false} />)}
          </div>
        </div>
      </section>

      {/* SECTION 7: SIMILAR PRODUCTS */}
      <section className="py-16 md:py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#FF6A3D]" />
              <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.25em]">Similar Products</h2>
            </div>
            <p className="text-[#9CA3AF] text-[13px]">Compare similar products across brands.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* SECTION 8: EXPLORE BRAND PROFILE */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 mb-16">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[28px] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6A3D]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-[0.3em] mb-6">Produced By</h2>
            <h3 className="text-[32px] md:text-[36px] font-medium uppercase tracking-tight mb-6 leading-tight">{productData.brand}</h3>
            <p className="text-white/70 text-[16px] leading-[1.7] mb-10">{productData.aboutBrand}</p>
            <motion.button 
              onClick={() => onViewBrandProfile?.(productData.brand)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 h-14 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E55A2D] transition-all flex items-center gap-3 shadow-xl shadow-[#FF6A3D]/20"
            >
              Explore Brand Profile <ExternalLink size={16} />
            </motion.button>
          </div>
          <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl shrink-0">
            <ImageWithFallback src={productData.brandLogo} className="w-full h-full object-contain" />
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}