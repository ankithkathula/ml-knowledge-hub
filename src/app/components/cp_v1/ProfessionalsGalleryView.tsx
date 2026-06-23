import { Search, X, MapPin, Star, ChevronDown, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Mock professional data
const generateProfessionals = (category: string) => {
  const professionals = [
    {
      id: '1',
      name: 'Priya Sharma',
      profession: 'Senior Architect',
      specialization: 'Sustainable Architecture',
      coverImage: 'https://images.unsplash.com/photo-1704040686324-e0552fbc9167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.9,
      reviewCount: 127,
      city: 'Mumbai',
      country: 'India',
      tagline: 'Award-winning sustainable design specialist',
      priceRange: '₹50,000 - ₹2,00,000',
      experience: 12,
      projects: 45
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      profession: 'Interior Designer',
      specialization: 'Modern & Contemporary',
      coverImage: 'https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.8,
      reviewCount: 98,
      city: 'Bangalore',
      country: 'India',
      tagline: 'Transforming spaces into experiences',
      priceRange: '₹30,000 - ₹1,50,000',
      experience: 10,
      projects: 62
    },
    {
      id: '3',
      name: 'Ananya Desai',
      profession: 'Landscape Architect',
      specialization: 'Urban Green Spaces',
      coverImage: 'https://images.unsplash.com/photo-1713371765638-8cf84d350b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 5.0,
      reviewCount: 84,
      city: 'Pune',
      country: 'India',
      tagline: 'Creating harmony between nature and design',
      priceRange: '₹40,000 - ₹1,80,000',
      experience: 8,
      projects: 34
    },
    {
      id: '4',
      name: 'Vikram Singh',
      profession: 'Structural Engineer',
      specialization: 'High-Rise Buildings',
      coverImage: 'https://images.unsplash.com/photo-1559354484-587384b2badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.7,
      reviewCount: 156,
      city: 'Delhi',
      country: 'India',
      tagline: 'Engineering excellence for tomorrow',
      priceRange: '₹60,000 - ₹2,50,000',
      experience: 15,
      projects: 78
    },
    {
      id: '5',
      name: 'Kavita Menon',
      profession: 'Urban Planner',
      specialization: 'Smart City Development',
      coverImage: 'https://images.unsplash.com/photo-1759200135991-eb8fc48febf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.9,
      reviewCount: 72,
      city: 'Chennai',
      country: 'India',
      tagline: 'Building sustainable urban futures',
      priceRange: '₹70,000 - ₹3,00,000',
      experience: 14,
      projects: 28
    },
    {
      id: '6',
      name: 'Arjun Patel',
      profession: 'Interior Designer',
      specialization: 'Luxury Residences',
      coverImage: 'https://images.unsplash.com/photo-1610834651684-35c299a31164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.8,
      reviewCount: 105,
      city: 'Hyderabad',
      country: 'India',
      tagline: 'Crafting timeless elegance',
      priceRange: '₹45,000 - ₹2,20,000',
      experience: 11,
      projects: 54
    },
    {
      id: '7',
      name: 'Neha Gupta',
      profession: 'Architect',
      specialization: 'Heritage Conservation',
      coverImage: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 5.0,
      reviewCount: 91,
      city: 'Jaipur',
      country: 'India',
      tagline: 'Preserving history through design',
      priceRange: '₹55,000 - ₹2,40,000',
      experience: 13,
      projects: 41
    },
    {
      id: '8',
      name: 'Aditya Rao',
      profession: 'Architect',
      specialization: 'Residential Design',
      coverImage: 'https://images.unsplash.com/photo-1704040686324-e0552fbc9167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.6,
      reviewCount: 118,
      city: 'Kolkata',
      country: 'India',
      tagline: 'Creating homes that inspire',
      priceRange: '₹35,000 - ₹1,60,000',
      experience: 9,
      projects: 67
    },
    {
      id: '9',
      name: 'Sneha Iyer',
      profession: 'Interior Designer',
      specialization: 'Commercial Spaces',
      coverImage: 'https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.9,
      reviewCount: 134,
      city: 'Ahmedabad',
      country: 'India',
      tagline: 'Designing spaces that drive business',
      priceRange: '₹40,000 - ₹1,90,000',
      experience: 10,
      projects: 58
    },
    {
      id: '10',
      name: 'Rohan Malhotra',
      profession: 'Landscape Architect',
      specialization: 'Residential Gardens',
      coverImage: 'https://images.unsplash.com/photo-1713371765638-8cf84d350b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.8,
      reviewCount: 79,
      city: 'Gurgaon',
      country: 'India',
      tagline: 'Bringing nature home',
      priceRange: '₹25,000 - ₹1,20,000',
      experience: 7,
      projects: 42
    },
    {
      id: '11',
      name: 'Meera Reddy',
      profession: 'Architect',
      specialization: 'Healthcare Architecture',
      coverImage: 'https://images.unsplash.com/photo-1559354484-587384b2badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.9,
      reviewCount: 88,
      city: 'Mumbai',
      country: 'India',
      tagline: 'Designing for healing and wellness',
      priceRange: '₹65,000 - ₹2,80,000',
      experience: 16,
      projects: 33
    },
    {
      id: '12',
      name: 'Karan Khanna',
      profession: 'Interior Designer',
      specialization: 'Minimalist Design',
      coverImage: 'https://images.unsplash.com/photo-1610834651684-35c299a31164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
      rating: 4.7,
      reviewCount: 102,
      city: 'Bangalore',
      country: 'India',
      tagline: 'Less is more, always',
      priceRange: '₹30,000 - ₹1,40,000',
      experience: 8,
      projects: 51
    }
  ];

  return professionals;
};

interface ProfessionalsGalleryViewProps {
  categoryName: string;
  onBackToProfessionals: () => void;
  onProfessionalClick: (professionalId: string, professionalName: string) => void;
  onBackToHome?: () => void;
}

export default function ProfessionalsGalleryView({
  categoryName,
  onBackToProfessionals,
  onProfessionalClick,
  onBackToHome
}: ProfessionalsGalleryViewProps) {
  const [professionals] = useState(generateProfessionals(categoryName));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Top Rated');
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());

  const cities = [...new Set(professionals.map(p => p.city))];

  const toggleSet = (item: any, set: Set<any>, setter: (set: Set<any>) => void) => {
    const newSet = new Set(set);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setter(newSet);
  };

  const filteredProfessionals = professionals.filter(professional => {
    if (searchQuery && !professional.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !professional.specialization.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedRatings.size > 0) {
      const hasMatchingRating = Array.from(selectedRatings).some(rating => 
        professional.rating >= rating && professional.rating < rating + 1
      );
      if (!hasMatchingRating) return false;
    }
    if (selectedCities.size > 0 && !selectedCities.has(professional.city)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-['Satoshi']">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 pt-32 pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8">
            <button onClick={onBackToHome} className="hover:text-[#FF6A3D] transition-colors">Home</button>
            <span className="opacity-30">/</span>
            <button onClick={onBackToProfessionals} className="hover:text-[#FF6A3D] transition-colors">Professionals</button>
            <span className="opacity-30">/</span>
            <span className="text-[#0F172A] dark:text-white">{categoryName}</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] dark:text-white uppercase font-normal tracking-tight mb-6">
              {categoryName}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-12">
              Connect with verified professionals who bring expertise and excellence to your projects. {filteredProfessionals.length} expert{filteredProfessionals.length !== 1 ? 's' : ''} available.
            </p>

            <div className="relative max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6A3D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${categoryName.toLowerCase()}...`}
                className="w-full h-16 pl-14 pr-14 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-[#FF6A3D]/40 rounded-2xl text-[#0F172A] dark:text-white outline-none shadow-sm transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F172A]">
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex flex-wrap gap-3">
            <select
              onChange={(e) => e.target.value && toggleSet(e.target.value, selectedCities, setSelectedCities)}
              className="h-11 px-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white outline-none hover:border-[#FF6A3D] transition-colors"
            >
              <option value="">Location</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>

            <select
              onChange={(e) => e.target.value && toggleSet(parseFloat(e.target.value), selectedRatings, setSelectedRatings)}
              className="h-11 px-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white outline-none hover:border-[#FF6A3D] transition-colors"
            >
              <option value="">Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>

            {(selectedCities.size > 0 || selectedRatings.size > 0) && (
              <button onClick={() => { setSelectedCities(new Set()); setSelectedRatings(new Set()); }} className="text-[11px] font-bold text-[#FF6A3D] uppercase tracking-widest px-4 hover:underline">
                Clear Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#0F172A] dark:text-white outline-none"
            >
              <option>Top Rated</option>
              <option>Experience</option>
              <option>Projects</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProfessionals.map((pro) => (
            <motion.div
              key={pro.id}
              whileHover={{ y: -8 }}
              onClick={() => onProfessionalClick(pro.id, pro.name)}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6A3D] p-1 shadow-lg overflow-hidden border-2 border-white dark:border-gray-800">
                  <ImageWithFallback src={pro.profileImage} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>{pro.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-medium text-[#0F172A] dark:text-white mb-1 group-hover:text-[#FF6A3D] transition-colors">{pro.name}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{pro.profession}</p>
              
              <div className="space-y-4 pt-6 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</span>
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">{pro.experience} Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Projects</span>
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">{pro.projects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">{pro.city}</span>
                </div>
              </div>

              <button className="w-full h-12 bg-gray-50 dark:bg-gray-800 text-[#0F172A] dark:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest mt-8 group-hover:bg-[#FF6A3D] group-hover:text-white transition-all duration-500">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="py-32 text-center">
            <Search size={48} className="text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">No experts found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCities(new Set()); setSelectedRatings(new Set()); }}
              className="px-8 h-12 bg-[#FF6A3D] text-white rounded-xl font-bold uppercase tracking-widest text-[11px]"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
