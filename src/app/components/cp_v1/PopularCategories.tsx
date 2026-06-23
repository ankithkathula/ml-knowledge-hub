import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const mainCategories = [
  {
    name: 'Access Systems',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Door Access', image: 'https://images.unsplash.com/photo-1760866613530-e3e09e013c42?w=400&h=300&fit=crop' },
      { name: 'Security Systems', image: 'https://images.unsplash.com/photo-1653039923048-aa285ded90ca?w=400&h=300&fit=crop' },
      { name: 'Smart Locks', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop' },
      { name: 'Biometric Systems', image: 'https://images.unsplash.com/photo-1611330500121-d9439ddc3d9d?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Carpet',
    image: 'https://images.unsplash.com/photo-1625044364652-c841c1ae31b1?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Wool Carpets', image: 'https://images.unsplash.com/photo-1562869929-bda0650edb1f?w=400&h=300&fit=crop' },
      { name: 'Synthetic Carpets', image: 'https://images.unsplash.com/photo-1548091764-0c182a95bbe0?w=400&h=300&fit=crop' },
      { name: 'Area Rugs', image: 'https://images.unsplash.com/photo-1745905308908-25f35bacd146?w=400&h=300&fit=crop' },
      { name: 'Commercial Carpeting', image: 'https://images.unsplash.com/photo-1763356844645-dbfd9244fa20?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Electrical',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Electric Poles', image: 'https://images.unsplash.com/photo-1596470512784-a79d0a28009b?w=400&h=300&fit=crop' },
      { name: 'Lights & Fixtures', image: 'https://images.unsplash.com/photo-1622433488405-1a28d05f85f7?w=400&h=300&fit=crop' },
      { name: 'Switchgears', image: 'https://images.unsplash.com/photo-1467733238130-bb6846885316?w=400&h=300&fit=crop' },
      { name: 'Wires & Cables', image: 'https://images.unsplash.com/photo-1563068261-13ebbdf16aa3?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Engineered Stone',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Quartz Surfaces', image: 'https://images.unsplash.com/photo-1642935263083-2f80ed5da14f?w=400&h=300&fit=crop' },
      { name: 'Granite Countertops', image: 'https://images.unsplash.com/photo-1560185127-1902ccdc5094?w=400&h=300&fit=crop' },
      { name: 'Marble Slabs', image: 'https://images.unsplash.com/photo-1587749158407-58ef2b89ccf8?w=400&h=300&fit=crop' },
      { name: 'Composite Stone', image: 'https://images.unsplash.com/photo-1709795433815-bdd1ac025ee0?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Fabric',
    image: 'https://images.unsplash.com/photo-1761682719790-4e0b38ed5beb?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Upholstery Fabrics', image: 'https://images.unsplash.com/photo-1758546407134-42b017d5f011?w=400&h=300&fit=crop' },
      { name: 'Curtain Fabrics', image: 'https://images.unsplash.com/photo-1642698982318-df463895ef21?w=400&h=300&fit=crop' },
      { name: 'Outdoor Fabrics', image: 'https://images.unsplash.com/photo-1599493502803-68b4c362b959?w=400&h=300&fit=crop' },
      { name: 'Commercial Textiles', image: 'https://images.unsplash.com/photo-1624525005654-c828ed32950d?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
      { name: 'Bedroom Furniture', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop' },
      { name: 'Office Furniture', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop' },
      { name: 'Outdoor Furniture', image: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400&h=300&fit=crop' },
    ]
  },
  {
    name: 'Glass',
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=300&h=300&fit=crop',
    subcategories: [
      { name: 'Tempered Glass', image: 'https://images.unsplash.com/photo-1755182528946-1dad8a79f44d?w=400&h=300&fit=crop' },
      { name: 'Laminated Glass', image: 'https://images.unsplash.com/photo-1562408589-4b96d09ec657?w=400&h=300&fit=crop' },
      { name: 'Decorative Glass', image: 'https://images.unsplash.com/photo-1749815362047-373af7e61072?w=400&h=300&fit=crop' },
      { name: 'Insulated Glass', image: 'https://images.unsplash.com/photo-1671728507647-053bfa783305?w=400&h=300&fit=crop' },
    ]
  },
];

export function PopularCategories() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>('Electrical');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  const selectedCategoryData = mainCategories.find(cat => cat.name === selectedCategory);

  // Carousel settings for mobile
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '20px',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  const renderCategoryItem = (category: typeof mainCategories[0], index: number) => {
    const isSelected = selectedCategory === category.name;
    return (
      <div key={category.name} className="px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          onClick={() => handleCategoryClick(category.name)}
          className="flex flex-col items-center gap-3 cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300 ${
              isSelected 
                ? 'ring-2 ring-[#FF6A3D] ring-offset-4 ring-offset-white dark:ring-offset-gray-900' 
                : 'ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-gray-300 dark:group-hover:ring-gray-600'
            }`}
          >
            <ImageWithFallback
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            {isSelected && (
              <div className="absolute inset-0 bg-[#FF6A3D]/10" />
            )}
          </motion.div>
          <span className={`text-xs sm:text-sm text-center max-w-[80px] transition-colors ${
            isSelected 
              ? 'text-[#FF6A3D]' 
              : 'text-[#667085] dark:text-gray-400 group-hover:text-[#101828] dark:group-hover:text-gray-300'
          }`}>
            {category.name}
          </span>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="pt-10 pb-20 px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#FF6A3D] mb-1 text-xs uppercase tracking-wide"
            >
              Explore Our Range
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl text-[#101828] dark:text-white"
            >
              Popular Categories
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 4 }}
            className="hidden md:flex items-center gap-2 text-[#667085] dark:text-gray-400 hover:text-[#FF6A3D] dark:hover:text-[#FF6A3D] transition-colors text-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Main Categories - Circular */}
        {/* Mobile Carousel */}
        <div className="block sm:hidden mb-16">
          <Slider {...carouselSettings}>
            {mainCategories.map((category, index) => renderCategoryItem(category, index))}
          </Slider>
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:flex flex-wrap justify-center gap-10 sm:gap-16 mb-16">
          {mainCategories.map((category, index) => {
            const isSelected = selectedCategory === category.name;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-[#FF6A3D] ring-offset-4 ring-offset-white dark:ring-offset-gray-900' 
                      : 'ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-gray-300 dark:group-hover:ring-gray-600'
                  }`}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#FF6A3D]/10" />
                  )}
                </motion.div>
                <span className={`text-xs sm:text-sm text-center max-w-[80px] transition-colors ${
                  isSelected 
                    ? 'text-[#FF6A3D]' 
                    : 'text-[#667085] dark:text-gray-400 group-hover:text-[#101828] dark:group-hover:text-gray-300'
                }`}>
                  {category.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Subcategories Grid */}
        {selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200 dark:border-gray-800 pt-12"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {selectedCategoryData.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] mb-3 ring-1 ring-gray-200/50 dark:ring-gray-700/50 group-hover:ring-gray-300 dark:group-hover:ring-gray-600 transition-all">
                    <ImageWithFallback
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm text-[#667085] dark:text-gray-400 group-hover:text-[#101828] dark:group-hover:text-white transition-colors overflow-hidden whitespace-nowrap text-ellipsis">
                    {subcategory.name}
                  </h3>
                </motion.div>
              ))}
              
              {/* Explore All Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: selectedCategoryData.subcategories.length * 0.03 }}
                whileHover={{ y: -2 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-[4/3] mb-3 flex flex-col items-center justify-center gap-2 group-hover:border-[#FF6A3D] group-hover:bg-[#FF6A3D]/5 dark:group-hover:bg-[#FF6A3D]/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-[#FF6A3D] transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-[#FF6A3D] transition-colors">
                    View All
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm text-[#667085] dark:text-gray-400 group-hover:text-[#FF6A3D] transition-colors overflow-hidden whitespace-nowrap text-ellipsis">
                  Explore All
                </h3>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}