export const CATEGORIES = [
  'Architecture',
  'Interior Design',
  'Installation',
  'Fabrication',
  'Consulting',
  'Freelancers'
];

export const PROFESSIONALS = [
  {
    id: 'p1',
    name: 'Sarah Chen',
    role: 'Senior Architect',
    location: 'Singapore',
    rating: 4.9,
    experience: 12,
    photo: 'https://images.unsplash.com/photo-1724596734619-3cb11db3b21a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    about: 'Specializing in sustainable urban residential projects with a focus on biophilic design. Over a decade of experience in high-density metropolitan areas.',
    expertise: ['Biophilic Design', 'Urban Planning', 'LEED Certification', 'Residential'],
    portfolio: [
      'https://images.unsplash.com/photo-1742440710193-3547e0b9d4db?q=80&w=1080',
      'https://images.unsplash.com/photo-1765371513276-a74f1ecbcf7d?q=80&w=1080'
    ],
    services: ['Site Analysis', 'Concept Design', 'Construction Documentation'],
    specialization: 'Sustainable Materials',
    studio_id: 's1',
    verified: true,
    featured: true,
    availability: 'Available this week'
  },
  {
    id: 'p2',
    name: 'Marcus Thorne',
    role: 'Interior Designer',
    location: 'London',
    rating: 4.8,
    experience: 8,
    photo: 'https://images.unsplash.com/photo-1535930735840-f3c6a645f80d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    about: 'Minimalist interior designer focused on luxury retail and hospitality spaces. Expert in material sourcing and bespoke furniture design.',
    expertise: ['Minimalism', 'Retail Design', 'Hospitality', 'Bespoke Furniture'],
    portfolio: [
      'https://images.unsplash.com/photo-1649930536248-df58fd1f54f8?q=80&w=1080',
      'https://images.unsplash.com/photo-1715593948040-d013495c3647?q=80&w=1080'
    ],
    services: ['Space Planning', 'Material Selection', 'FF&E Specification'],
    specialization: 'Stone & Timber',
    studio_id: 's2',
    verified: true,
    featured: false,
    availability: 'Available now'
  }
];

export const STUDIOS = [
  {
    id: 's1',
    name: 'Apex Architects',
    location: 'Singapore / Dubai',
    team_size: '25-50',
    cover_image: 'https://images.unsplash.com/photo-1742440710193-3547e0b9d4db?q=80&w=1920',
    logo: 'https://images.unsplash.com/photo-1724596734619-3cb11db3b21a?q=80&w=200',
    about: 'Apex is a global design collective focused on the intersection of technology and sustainability in architecture.',
    specialization: 'Commercial & Urban Infrastructure',
    services: ['Master Planning', 'Architectural Design', 'Sustainability Consulting'],
    portfolio: [
      'https://images.unsplash.com/photo-1742440710193-3547e0b9d4db?q=80&w=1080'
    ],
    verified: true,
    featured: true,
    rating: 4.9,
    materials: ['Recycled Concrete', 'Mass Timber', 'Smart Glass']
  },
  {
    id: 's2',
    name: 'Lumina Design Studio',
    location: 'London / Milan',
    team_size: '10-20',
    cover_image: 'https://images.unsplash.com/photo-1649930536248-df58fd1f54f8?q=80&w=1920',
    logo: 'https://images.unsplash.com/photo-1715593948040-d013495c3647?q=80&w=200',
    about: 'A boutique interior design firm specializing in high-end residential and luxury commercial interiors.',
    specialization: 'Luxury Residential',
    services: ['Interior Architecture', 'Lighting Design', 'Art Procurement'],
    portfolio: [
      'https://images.unsplash.com/photo-1715593948040-d013495c3647?q=80&w=1080'
    ],
    verified: true,
    featured: false,
    rating: 4.8,
    materials: ['Natural Stone', 'Hand-crafted Metals', 'Textiles']
  }
];

export const SERVICES = [
  {
    id: 'ser1',
    name: 'Sustainable Site Analysis',
    provider_id: 'p1',
    provider_type: 'professional',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1760963301666-582b92218a19?q=80&w=1080',
    description: 'A comprehensive evaluation of your site physical, biological, and cultural characteristics to inform sustainable design.',
    process: ['Initial Survey', 'Data Collection', 'Environmental Impact Study', 'Final Report'],
    deliverables: ['Topographical Map', 'Sun/Wind Path Analysis', 'Sustainable Strategy Document'],
    pricing: 'Starting at $2,500',
    rating: 4.9
  },
  {
    id: 'ser2',
    name: 'Bespoke Retail Concept',
    provider_id: 'p2',
    provider_type: 'professional',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1715593948040-d013495c3647?q=80&w=1080',
    description: 'Tailored interior design concepts for retail brands looking to create unique, high-conversion physical spaces.',
    process: ['Brand Discovery', 'Moodboarding', '3D Visuals', 'Material Specification'],
    deliverables: ['Concept Presentation', 'Floor Plans', 'Material Board'],
    pricing: 'Custom Quote',
    rating: 4.8
  }
];
