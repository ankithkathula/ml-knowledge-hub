import { productImage } from "./productImages";

export interface Product {
  id: string;
  name: string;
  brand: string;
  productFamily?: string; // e.g., "Cement Series", "Gold Series"
  category: string;
  subcategory: string;
  subSubcategory?: string;
  productType?: string;
  grade?: string;
  finish?: string;
  materialType?: string;
  thickness?: string;
  density?: string;
  compressiveStrength?: string;
  packaging?: string;
  certifications?: string[];
  features: string[];
  application: string[];
  stock: 'In Stock' | 'Made to Order';
  image: string;
  price?: string;
  // New realistic data fields
  badge?: 'Top Seller' | 'New Launch' | 'Eco-Friendly' | 'Premium' | 'Best Value';
  coverage?: string; // e.g., "140-160 sq ft/litre"
  durability?: string; // e.g., "8-10 years"
  washability?: 'High' | 'Medium' | 'Low';
  availableCities?: string[]; // e.g., ["Delhi", "Mumbai", "Bangalore"]
  priceType?: 'fixed' | 'quote' | 'outOfStock'; // For variation
  dryingTime?: string; // e.g., "30 min - 2 hrs"
}

const RAW_PRODUCTS: Product[] = [
  // ========== CEMENT > PORTLAND CEMENT > OPC 53 ==========
  {
    id: 'p1',
    name: 'UltraTech OPC 53 Cement',
    brand: 'UltraTech Cement',
    productFamily: 'Cement Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'ISO 9001:2015'],
    features: ['High Strength', 'Fast Setting', 'Weather Resistant'],
    application: ['Structural Concrete', 'High-Rise Buildings', 'Industrial Projects'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹400/bag',
    badge: 'Top Seller',
    durability: '30+ years',
    availableCities: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Pune'],
    priceType: 'fixed'
  },
  {
    id: 'p2',
    name: 'UltraTech OPC 53 Premium',
    brand: 'UltraTech Cement',
    productFamily: 'Cement Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'ISO 9001:2015', 'Green Building Council'],
    features: ['High Strength', 'Ultra Fast Setting', 'Superior Finish'],
    application: ['Structural Concrete', 'Pre-cast Elements', 'RCC Work'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    price: '₹450/bag',
    badge: 'Premium',
    durability: '30+ years',
    availableCities: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Pune', 'Ahmedabad'],
    priceType: 'fixed'
  },
  {
    id: 'p3',
    name: 'ACC OPC 53 Cement',
    brand: 'ACC Cement',
    productFamily: 'ACC Gold Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'ISO 14001:2015'],
    features: ['High Compressive Strength', 'Durability', 'Consistency'],
    application: ['Structural Concrete', 'Bridges', 'Dams'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹395/bag',
    badge: 'Best Value',
    durability: '25+ years',
    availableCities: ['Delhi NCR', 'Mumbai', 'Chennai'],
    priceType: 'fixed'
  },
  {
    id: 'p4',
    name: 'ACC Super OPC 53',
    brand: 'ACC Cement',
    productFamily: 'ACC Gold Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'BIS Certified'],
    features: ['Extra High Strength', 'Low Heat Generation', 'Crack Resistant'],
    application: ['High-Rise Construction', 'Infrastructure', 'Commercial Buildings'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    priceType: 'quote',
    availableCities: ['Delhi NCR', 'Kolkata']
  },
  {
    id: 'p5',
    name: 'Ambuja OPC 53 Cement',
    brand: 'Ambuja Cement',
    productFamily: 'Ambuja Plus Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'IGBC Certified'],
    features: ['Superior Strength', 'Excellent Workability', 'Low Carbon Footprint'],
    application: ['RCC Structures', 'Pre-stressed Concrete', 'Mass Concreting'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹410/bag',
    badge: 'Eco-Friendly',
    durability: '30+ years',
    availableCities: ['Available in 18 cities'],
    priceType: 'fixed'
  },
  {
    id: 'p6',
    name: 'Ambuja OPC 53 Plus',
    brand: 'Ambuja Cement',
    productFamily: 'Ambuja Plus Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269', 'Green Pro Certified'],
    features: ['High Early Strength', 'Superior Finish', 'Eco-Friendly'],
    application: ['Structural Concrete', 'Industrial Construction', 'Flyovers'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    price: '₹430/bag',
    badge: 'New Launch',
    durability: '30+ years',
    priceType: 'fixed'
  },
  {
    id: 'p7',
    name: 'JK Cement OPC 53',
    brand: 'JK Cement',
    productFamily: 'JK Super Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-53',
    grade: 'OPC 53',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '53 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 12269'],
    features: ['High Strength', 'Quick Hardening', 'Sulphate Resistant'],
    application: ['Structural Work', 'RCC Construction', 'Marine Structures'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹405/bag',
    durability: '25+ years',
    availableCities: ['North India'],
    priceType: 'fixed'
  },

  // ========== CEMENT > PORTLAND CEMENT > OPC 43 ==========
  {
    id: 'p8',
    name: 'UltraTech OPC 43 Cement',
    brand: 'UltraTech Cement',
    productFamily: 'Cement Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-43',
    grade: 'OPC 43',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '43 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 8112', 'ISO 9001:2015'],
    features: ['Good Strength', 'Consistent Quality', 'Reliable Performance'],
    application: ['Residential Construction', 'Plastering', 'Masonry Work'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    price: '₹350/bag'
  },
  {
    id: 'p9',
    name: 'Shree Cement OPC 43',
    brand: 'Shree Cement',
    productFamily: 'Shree Ultra Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'opc-43',
    grade: 'OPC 43',
    materialType: 'Ordinary Portland Cement',
    compressiveStrength: '43 MPa',
    packaging: '50 kg bag',
    certifications: ['IS 8112', 'BIS'],
    features: ['Excellent Workability', 'Smooth Finish', 'Uniform Strength'],
    application: ['General Construction', 'Residential Buildings', 'Brick Masonry'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹340/bag'
  },

  // ========== CEMENT > PORTLAND CEMENT > PPC CEMENT ==========
  {
    id: 'p10',
    name: 'UltraTech PPC Cement',
    brand: 'UltraTech Cement',
    productFamily: 'Cement Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'ppc-cement',
    grade: 'PPC',
    materialType: 'Portland Pozzolana Cement',
    compressiveStrength: '33 MPa (28 days)',
    packaging: '50 kg bag',
    certifications: ['IS 1489', 'Eco-Label'],
    features: ['Eco-Friendly', 'Low Heat of Hydration', 'Improved Durability'],
    application: ['Residential Construction', 'Plastering', 'Mass Concrete'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    price: '₹360/bag'
  },
  {
    id: 'p11',
    name: 'Ambuja PPC Cement',
    brand: 'Ambuja Cement',
    productFamily: 'Ambuja Plus Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'portland-cement',
    productType: 'ppc-cement',
    grade: 'PPC',
    materialType: 'Portland Pozzolana Cement',
    compressiveStrength: '33 MPa (28 days)',
    packaging: '50 kg bag',
    certifications: ['IS 1489', 'Green Building Certified'],
    features: ['Corrosion Resistant', 'Workable Mix', 'Sustainable'],
    application: ['Residential', 'Plastering', 'Underground Structures'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹355/bag'
  },

  // ========== CEMENT > WHITE CEMENT ==========
  {
    id: 'p12',
    name: 'Birla White Cement',
    brand: 'Birla White',
    productFamily: 'White Wall Putty Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'white-cement',
    grade: 'White Cement',
    materialType: 'White Portland Cement',
    packaging: '40 kg bag',
    certifications: ['IS 8042'],
    features: ['High Whiteness', 'Smooth Finish', 'Superior Adhesion'],
    application: ['Wall Putty', 'Decorative Work', 'Flooring'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
    price: '₹650/bag'
  },
  {
    id: 'p13',
    name: 'JK White Cement',
    brand: 'JK White',
    productFamily: 'Wall Care Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'white-cement',
    grade: 'White Cement',
    materialType: 'White Portland Cement',
    packaging: '40 kg bag',
    certifications: ['IS 8042'],
    features: ['Ultra White', 'Non-Yellowing', 'Crack Resistance'],
    application: ['Interior Walls', 'Art Work', 'Tile Grouting'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹630/bag'
  },

  // ========== CEMENT > READY MIX CONCRETE ==========
  {
    id: 'p14',
    name: 'UltraTech Ready Mix Concrete M25',
    brand: 'UltraTech RMC',
    productFamily: 'Ready Mix Series',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'ready-mix-concrete',
    grade: 'M25',
    materialType: 'Ready Mix Concrete',
    compressiveStrength: '25 MPa',
    packaging: 'Per Cubic Meter',
    certifications: ['IS 456', 'ISO 9001'],
    features: ['Consistent Quality', 'Time-Saving', 'Reduced Wastage'],
    application: ['Slabs', 'Beams', 'Columns'],
    stock: 'Made to Order',
    image: 'https://images.unsplash.com/photo-1517089152318-42ec560349c0?auto=format&fit=crop&q=80&w=600',
    price: '₹4,500/m³'
  },
  {
    id: 'p15',
    name: 'ACC Ready Mix Concrete M30',
    brand: 'ACC RMC',
    productFamily: 'ACC Concrete Solutions',
    category: 'building-materials',
    subcategory: 'cement',
    subSubcategory: 'ready-mix-concrete',
    grade: 'M30',
    materialType: 'Ready Mix Concrete',
    compressiveStrength: '30 MPa',
    packaging: 'Per Cubic Meter',
    certifications: ['IS 456'],
    features: ['High Strength', 'Superior Finish', 'Quality Assured'],
    application: ['Structural Elements', 'High-Rise Buildings', 'Industrial Floors'],
    stock: 'Made to Order',
    image: 'https://images.unsplash.com/photo-1517089152318-42ec560349c0?auto=format&fit=crop&q=80&w=600',
    price: '₹5,000/m³'
  },

  // ========== STEEL > TMT BARS > Fe500 ==========
  {
    id: 'p16',
    name: 'Tata Tiscon Fe500 TMT Bar',
    brand: 'Tata Steel',
    productFamily: 'Tiscon Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'tmt-bars',
    productType: 'fe500',
    grade: 'Fe500',
    materialType: 'TMT Reinforcement Bar',
    packaging: 'Per Tonne',
    certifications: ['IS 1786', 'BIS', 'CRS'],
    features: ['High Tensile Strength', 'Earthquake Resistant', 'Corrosion Resistant'],
    application: ['RCC Structures', 'Beams', 'Columns'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&q=80&w=600',
    price: '₹62,000/tonne'
  },
  {
    id: 'p17',
    name: 'JSW Neosteel Fe500 TMT Bar',
    brand: 'JSW Steel',
    productFamily: 'Neosteel Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'tmt-bars',
    productType: 'fe500',
    grade: 'Fe500',
    materialType: 'TMT Reinforcement Bar',
    packaging: 'Per Tonne',
    certifications: ['IS 1786', 'ISO 9001'],
    features: ['Superior Strength', 'Better Elongation', 'Fire Resistant'],
    application: ['Residential Buildings', 'Bridges', 'Industrial Structures'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    price: '₹61,500/tonne'
  },

  // ========== STEEL > TMT BARS > Fe550 ==========
  {
    id: 'p18',
    name: 'Tata Tiscon Fe550 TMT Bar',
    brand: 'Tata Steel',
    productFamily: 'Tiscon Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'tmt-bars',
    productType: 'fe550',
    grade: 'Fe550',
    materialType: 'TMT Reinforcement Bar',
    packaging: 'Per Tonne',
    certifications: ['IS 1786', 'BIS', 'CRS'],
    features: ['Extra High Strength', 'Bendability', 'Weldability'],
    application: ['High-Rise Buildings', 'Flyovers', 'Dams'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    price: '₹65,000/tonne'
  },
  {
    id: 'p19',
    name: 'JSW Neosteel Fe550 TMT Bar',
    brand: 'JSW Steel',
    productFamily: 'Neosteel Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'tmt-bars',
    productType: 'fe550',
    grade: 'Fe550',
    materialType: 'TMT Reinforcement Bar',
    packaging: 'Per Tonne',
    certifications: ['IS 1786', 'ISO 9001'],
    features: ['Maximum Strength', 'Ductility', 'Thermal Resistance'],
    application: ['Infrastructure', 'Metro Projects', 'Commercial Buildings'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&q=80&w=600',
    price: '₹64,500/tonne'
  },

  // ========== STEEL > STRUCTURAL STEEL > H BEAMS ==========
  {
    id: 'p20',
    name: 'SAIL H Beam ISHB 150',
    brand: 'SAIL',
    productFamily: 'Structural Steel Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'structural-steel',
    productType: 'h-beams',
    grade: 'Fe410',
    materialType: 'H Beam',
    packaging: 'Per Tonne',
    certifications: ['IS 808', 'IS 2062'],
    features: ['High Load Capacity', 'Uniform Strength', 'Precision Rolled'],
    application: ['Building Frames', 'Industrial Sheds', 'Bridge Construction'],
    stock: 'Made to Order',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    price: '₹58,000/tonne'
  },

  // ========== STEEL > STRUCTURAL STEEL > I BEAMS ==========
  {
    id: 'p21',
    name: 'Tata I Beam ISMB 200',
    brand: 'Tata Steel',
    productFamily: 'Structural Solutions',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'structural-steel',
    productType: 'i-beams',
    grade: 'Fe440',
    materialType: 'I Beam',
    packaging: 'Per Tonne',
    certifications: ['IS 808', 'IS 2062'],
    features: ['Superior Strength', 'Versatile Application', 'Dimensional Accuracy'],
    application: ['Roof Structures', 'Platform Construction', 'Support Beams'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    price: '₹57,000/tonne'
  },

  // ========== STEEL > STRUCTURAL STEEL > CHANNELS ==========
  {
    id: 'p22',
    name: 'JSW Channel ISMC 100',
    brand: 'JSW Steel',
    productFamily: 'Channel Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'structural-steel',
    productType: 'channels',
    grade: 'Fe410',
    materialType: 'Channel',
    packaging: 'Per Tonne',
    certifications: ['IS 808'],
    features: ['High Strength', 'Good Formability', 'Rust Resistant'],
    application: ['Framing', 'Support Structures', 'Trusses'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&q=80&w=600',
    price: '₹56,000/tonne'
  },

  // ========== STEEL > STRUCTURAL STEEL > ANGLES ==========
  {
    id: 'p23',
    name: 'SAIL Angle ISA 50x50x6',
    brand: 'SAIL',
    productFamily: 'Angle Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'structural-steel',
    productType: 'angles',
    grade: 'Fe410',
    materialType: 'Angle',
    packaging: 'Per Tonne',
    certifications: ['IS 808'],
    features: ['Corner Reinforcement', 'Lightweight', 'Easy Installation'],
    application: ['Edge Protection', 'Frame Corners', 'Support Brackets'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
    price: '₹55,000/tonne'
  },

  // ========== STEEL > STEEL PLATES > MILD STEEL PLATES ==========
  {
    id: 'p24',
    name: 'Tata Mild Steel Plate 8mm',
    brand: 'Tata Steel',
    productFamily: 'Plate Solutions',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'steel-plates',
    productType: 'mild-steel-plates',
    grade: 'IS 2062',
    materialType: 'Mild Steel Plate',
    thickness: '8mm',
    packaging: 'Per Tonne',
    certifications: ['IS 2062', 'BIS'],
    features: ['Good Weldability', 'Machinability', 'Formability'],
    application: ['Industrial Fabrication', 'General Engineering', 'Shipbuilding'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    price: '₹60,000/tonne'
  },

  // ========== STEEL > STEEL PLATES > STAINLESS STEEL PLATES ==========
  {
    id: 'p25',
    name: 'JSW Stainless Steel Plate SS304',
    brand: 'JSW Steel',
    productFamily: 'Stainless Series',
    category: 'building-materials',
    subcategory: 'steel',
    subSubcategory: 'steel-plates',
    productType: 'stainless-steel-plates',
    grade: 'SS304',
    materialType: 'Stainless Steel Plate',
    thickness: '6mm',
    packaging: 'Per Tonne',
    certifications: ['ASTM A240', 'ISO 9001'],
    features: ['Corrosion Resistant', 'Hygienic', 'High Polish Finish'],
    application: ['Food Processing', 'Chemical Plants', 'Decorative Cladding'],
    stock: 'Made to Order',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&q=80&w=600',
    price: '₹1,80,000/tonne'
  },

  // ========== BLOCKS & BRICKS > CLAY BRICKS ==========
  {
    id: 'p26',
    name: 'Wienerberger Clay Brick',
    brand: 'Wienerberger',
    productFamily: 'Porotherm Series',
    category: 'building-materials',
    subcategory: 'blocks-bricks',
    subSubcategory: 'clay-bricks',
    materialType: 'Clay Brick',
    packaging: 'Per 1000 Bricks',
    certifications: ['IS 1077'],
    features: ['Thermal Insulation', 'Sound Absorption', 'Fire Resistant'],
    application: ['Wall Construction', 'Facades', 'Partition Walls'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=600',
    price: '₹8,500/1000 bricks'
  },

  // ========== BLOCKS & BRICKS > FLY ASH BRICKS ==========
  {
    id: 'p27',
    name: 'Magicrete Fly Ash Brick',
    brand: 'Magicrete',
    productFamily: 'Smart Wall Series',
    category: 'building-materials',
    subcategory: 'blocks-bricks',
    subSubcategory: 'fly-ash-bricks',
    materialType: 'Fly Ash Brick',
    packaging: 'Per 1000 Bricks',
    certifications: ['IS 12894'],
    features: ['Eco-Friendly', 'High Strength', 'Lightweight'],
    application: ['Load Bearing Walls', 'Partition Walls', 'Compound Walls'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=600',
    price: '₹6,000/1000 bricks'
  },

  // ========== BLOCKS & BRICKS > CONCRETE BLOCKS ==========
  {
    id: 'p28',
    name: 'Nuvoco Concrete Block',
    brand: 'Nuvoco',
    productFamily: 'Instamix Block Series',
    category: 'building-materials',
    subcategory: 'blocks-bricks',
    subSubcategory: 'concrete-blocks',
    materialType: 'Concrete Block',
    packaging: 'Per Block',
    certifications: ['IS 2185'],
    features: ['High Compressive Strength', 'Dimensional Accuracy', 'Cost Effective'],
    application: ['Load Bearing Walls', 'Retaining Walls', 'Boundary Walls'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?auto=format&fit=crop&q=80&w=600',
    price: '₹45/block'
  },

  // ========== BLOCKS & BRICKS > AAC BLOCKS ==========
  {
    id: 'p29',
    name: 'UltraTech AAC Block',
    brand: 'UltraTech Cement',
    productFamily: 'Xtralite Series',
    category: 'building-materials',
    subcategory: 'blocks-bricks',
    subSubcategory: 'aac-blocks',
    materialType: 'AAC Block',
    density: '550 kg/m³',
    packaging: 'Per Block',
    certifications: ['IS 2185 Part 3'],
    features: ['Lightweight', 'Thermal Insulation', 'Fire Resistant'],
    application: ['Interior Walls', 'Exterior Walls', 'Infill Panels'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?auto=format&fit=crop&q=80&w=600',
    price: '₹55/block'
  },

  // ========== CONSTRUCTION CHEMICALS > WATERPROOFING > LIQUID MEMBRANE ==========
  {
    id: 'p30',
    name: 'Fosroc Proofex Liquid Membrane',
    brand: 'Fosroc',
    productFamily: 'Proofex Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'waterproofing',
    productType: 'liquid-membrane',
    materialType: 'Liquid Waterproofing Membrane',
    packaging: '20 kg drum',
    certifications: ['ISO 9001'],
    features: ['Flexible', 'UV Resistant', 'Seamless Application'],
    application: ['Roofs', 'Terraces', 'Balconies'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹4,200/drum'
  },

  // ========== CONSTRUCTION CHEMICALS > WATERPROOFING > BITUMINOUS COATING ==========
  {
    id: 'p31',
    name: 'Dr. Fixit Bituminous Coating',
    brand: 'Dr. Fixit',
    productFamily: 'Pidilite Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'waterproofing',
    productType: 'bituminous-coating',
    materialType: 'Bituminous Waterproofing',
    packaging: '20 ltr drum',
    certifications: ['BIS'],
    features: ['Water Resistant', 'Easy Application', 'Long Lasting'],
    application: ['Basements', 'Foundations', 'Water Tanks'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹2,800/drum'
  },

  // ========== CONSTRUCTION CHEMICALS > WATERPROOFING > CEMENTITIOUS WATERPROOFING ==========
  {
    id: 'p32',
    name: 'BASF MasterSeal Cementitious',
    brand: 'BASF',
    productFamily: 'MasterSeal Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'waterproofing',
    productType: 'cementitious-waterproofing',
    materialType: 'Cementitious Waterproofing',
    packaging: '25 kg bag',
    certifications: ['ISO 9001', 'LEED Compliant'],
    features: ['Breathable', 'Crack Bridging', 'Polymer Modified'],
    application: ['Wet Areas', 'Swimming Pools', 'Water Retaining Structures'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹1,500/bag'
  },

  // ========== CONSTRUCTION CHEMICALS > TILE ADHESIVES > STANDARD ADHESIVE ==========
  {
    id: 'p33',
    name: 'Kajaria K-Fix Standard Adhesive',
    brand: 'Kajaria',
    productFamily: 'K-Fix Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'tile-adhesives',
    productType: 'standard-adhesive',
    materialType: 'Tile Adhesive',
    packaging: '40 kg bag',
    certifications: ['IS 15477'],
    features: ['Good Bonding', 'Easy Application', 'Water Resistant'],
    application: ['Wall Tiles', 'Floor Tiles', 'Ceramic Tiles'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹350/bag'
  },

  // ========== CONSTRUCTION CHEMICALS > TILE ADHESIVES > HIGH BOND ADHESIVE ==========
  {
    id: 'p34',
    name: 'MYK Laticrete High Bond Adhesive',
    brand: 'MYK Laticrete',
    productFamily: 'Professional Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'tile-adhesives',
    productType: 'high-bond-adhesive',
    materialType: 'High Bond Tile Adhesive',
    packaging: '40 kg bag',
    certifications: ['IS 15477', 'ANSI A118'],
    features: ['Superior Bond Strength', 'Extended Open Time', 'Vertical Hold'],
    application: ['Large Format Tiles', 'Porcelain Tiles', 'Heavy Tiles'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹550/bag'
  },

  // ========== CONSTRUCTION CHEMICALS > TILE ADHESIVES > FLEXIBLE ADHESIVE ==========
  {
    id: 'p35',
    name: 'Ardex Flexible Tile Adhesive',
    brand: 'Ardex',
    productFamily: 'Flex Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'tile-adhesives',
    productType: 'flexible-adhesive',
    materialType: 'Flexible Tile Adhesive',
    packaging: '40 kg bag',
    certifications: ['ISO 13007', 'CE Marked'],
    features: ['Crack Bridging', 'Movement Tolerance', 'Weather Resistant'],
    application: ['Expansion Joints', 'Facades', 'Swimming Pools'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=600',
    price: '₹650/bag'
  },

  // ========== CONSTRUCTION CHEMICALS > GROUTS > EPOXY GROUT ==========
  {
    id: 'p36',
    name: 'Sika Epoxy Grout',
    brand: 'Sika',
    productFamily: 'SikaGrout Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'grouts',
    productType: 'epoxy-grout',
    materialType: 'Epoxy Grout',
    packaging: '5 kg kit',
    certifications: ['ISO 9001'],
    features: ['Stain Resistant', 'Chemical Resistant', 'Non-Porous'],
    application: ['Kitchen Counters', 'Bathrooms', 'Commercial Kitchens'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹2,500/kit'
  },

  // ========== LIGHTING > LED BULBS ==========
  {
    id: 'lb-001',
    name: 'Havells Adore 9W LED Bulb',
    brand: 'Havells',
    productFamily: 'Adore Series',
    category: 'lighting',
    subcategory: 'led-bulbs',
    materialType: 'LED Bulb',
    grade: 'E27 Base',
    packaging: 'Single unit',
    certifications: ['BEE 5-Star', 'IS 16102', 'RoHS'],
    features: ['High Luminous Efficacy', 'Cool White 6500K', 'Instant On', 'Long Life'],
    application: ['Living Rooms', 'Offices', 'Study Rooms', 'Kitchen'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600',
    price: '₹149/unit',
    badge: 'Top Seller',
    durability: '25,000 hours',
    availableCities: ['Pan India'],
    priceType: 'fixed'
  },
  {
    id: 'lb-002',
    name: 'Philips Stellar Bright 12W LED',
    brand: 'Philips Lighting',
    productFamily: 'Stellar Bright Series',
    category: 'lighting',
    subcategory: 'led-bulbs',
    materialType: 'LED Bulb',
    grade: 'E27 Base',
    packaging: 'Single unit',
    certifications: ['BEE 5-Star', 'IS 16102', 'CE'],
    features: ['Super Bright 1200lm', 'Warm White 3000K', 'Energy Star Rated', 'Dimmable'],
    application: ['Bedrooms', 'Living Rooms', 'Hospitality Spaces', 'Retail'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600',
    price: '₹179/unit',
    badge: 'Premium',
    durability: '25,000 hours',
    availableCities: ['Pan India'],
    priceType: 'fixed'
  },

  // ========== LIGHTING > COMMERCIAL LIGHTING ==========
  {
    id: 'cl-001',
    name: 'Havells Endura Star LED Panel 18W',
    brand: 'Havells',
    productFamily: 'Endura Star Series',
    category: 'lighting',
    subcategory: 'commercial-lighting',
    materialType: 'LED Panel Light',
    grade: 'Recessed Mount',
    packaging: 'Single unit',
    certifications: ['BIS', 'IS 10322', 'IP44'],
    features: ['Uniform Light Distribution', 'Cool White 6500K', 'Low Glare Design', 'Flicker Free'],
    application: ['Offices', 'Conference Rooms', 'Retail Showrooms', 'Hospitals'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
    price: '₹1,250/unit',
    badge: 'Top Seller',
    durability: '30,000 hours',
    availableCities: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Pune'],
    priceType: 'fixed'
  },
  {
    id: 'cl-002',
    name: 'Wipro Garnet LED Downlight 12W',
    brand: 'Wipro Lighting',
    productFamily: 'Garnet Series',
    category: 'lighting',
    subcategory: 'commercial-lighting',
    materialType: 'LED Downlight',
    grade: 'Recessed Mount',
    packaging: 'Single unit',
    certifications: ['BIS', 'IS 10322', 'IP20'],
    features: ['Adjustable Beam Angle', 'Warm White 3000K', 'CRI > 80', 'Dimmable'],
    application: ['Hotels', 'Restaurants', 'Boutique Retail', 'Residential Ceilings'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=600',
    price: '₹980/unit',
    badge: 'New Launch',
    durability: '25,000 hours',
    availableCities: ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'],
    priceType: 'fixed'
  },

  // ========== LIGHTING > DECORATIVE LIGHTING ==========
  {
    id: 'dl-001',
    name: 'Havells Filamento LED Filament Bulb',
    brand: 'Havells',
    productFamily: 'Filamento Series',
    category: 'lighting',
    subcategory: 'decorative-lighting',
    materialType: 'LED Filament Bulb',
    grade: 'E27 Base',
    packaging: 'Single unit',
    certifications: ['BEE 5-Star', 'IS 16102', 'RoHS'],
    features: ['360° Omni-directional Light', 'Vintage Edison Style', 'Dimmable', 'Instant On'],
    application: ['Pendant Lights', 'Chandeliers', 'Cafe & Restaurant Decor', 'Residential Accent Lighting'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600',
    price: '₹249/unit',
    badge: 'Top Seller',
    durability: '15,000 hours',
    availableCities: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad'],
    priceType: 'fixed'
  },
  {
    id: 'dl-002',
    name: 'Syska Heritage ST64 Edison Bulb',
    brand: 'Syska',
    productFamily: 'Heritage Series',
    category: 'lighting',
    subcategory: 'decorative-lighting',
    materialType: 'LED Filament Bulb',
    grade: 'E27 Base',
    packaging: 'Single unit',
    certifications: ['BEE 4-Star', 'IS 16102'],
    features: ['ST64 Globe Shape', 'Amber Warm Glow', 'Low Flicker', 'Energy Efficient'],
    application: ['Table Lamps', 'Wall Sconces', 'Industrial Loft Decor', 'Hotel Lobby Lighting'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600',
    price: '₹199/unit',
    badge: 'New Launch',
    durability: '12,000 hours',
    availableCities: ['Mumbai', 'Delhi NCR', 'Chennai', 'Kolkata'],
    priceType: 'fixed'
  },

  // ========== CONSTRUCTION CHEMICALS > GROUTS > CEMENT GROUT ==========
  {
    id: 'p37',
    name: 'Weber Cement Grout',
    brand: 'Weber',
    productFamily: 'Joint Pro Series',
    category: 'building-materials',
    subcategory: 'construction-chemicals',
    subSubcategory: 'grouts',
    productType: 'cement-grout',
    materialType: 'Cement Grout',
    packaging: '5 kg bag',
    certifications: ['IS 1542'],
    features: ['Smooth Finish', 'Colour Fast', 'Crack Free'],
    application: ['Tile Joints', 'Wall Tiles', 'Floor Tiles'],
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    price: '₹350/bag'
  },

  // ========== PAINTS & COATINGS ==========
  { id: 'asp1', name: 'Royale Luxury Emulsion', brand: 'Asian Paints', productFamily: 'Royale Series', category: 'wall-finishes', subcategory: 'paints', productType: 'interior-emulsion', grade: 'Luxury', materialType: 'Interior Emulsion', packaging: '1L / 4L / 10L / 20L', certifications: ['GreenPro', 'Low-VOC'], features: ['Washable & Stain Resistant', 'Rich Sheen Finish', 'Low VOC'], application: ['Living Rooms', 'Bedrooms', 'Interior Walls'], stock: 'In Stock', image: '', price: '₹520/litre', badge: 'Premium', coverage: '140-160 sq ft/litre', washability: 'High', availableCities: ['Pan India'], priceType: 'fixed' },
  { id: 'asp2', name: 'Apex Ultima Exterior Emulsion', brand: 'Asian Paints', productFamily: 'Apex Series', category: 'wall-finishes', subcategory: 'paints', productType: 'exterior-emulsion', grade: 'Ultima', materialType: 'Exterior Emulsion', packaging: '1L / 4L / 10L / 20L', certifications: ['Weatherproof Certified'], features: ['Weatherproof', 'UV Resistant', 'Anti-Algal'], application: ['Exterior Walls', 'Facades'], stock: 'In Stock', image: '', price: '₹480/litre', badge: 'Top Seller', durability: '8-10 years', availableCities: ['Pan India'], priceType: 'fixed' },
  { id: 'asp3', name: 'Tractor Emulsion Advanced', brand: 'Asian Paints', productFamily: 'Tractor Series', category: 'wall-finishes', subcategory: 'paints', productType: 'interior-emulsion', grade: 'Economy', materialType: 'Interior Emulsion', packaging: '1L / 10L / 20L', certifications: ['BIS'], features: ['Smooth Matte Finish', 'Good Coverage', 'Value for Money'], application: ['Interior Walls', 'Budget Projects'], stock: 'In Stock', image: '', price: '₹220/litre', badge: 'Best Value', priceType: 'fixed' },
  { id: 'bgr1', name: 'Silk Glamor Interior Emulsion', brand: 'Berger Paints', productFamily: 'Silk Series', category: 'wall-finishes', subcategory: 'paints', productType: 'interior-emulsion', grade: 'Premium', materialType: 'Interior Emulsion', packaging: '1L / 4L / 10L / 20L', certifications: ['GreenPro', 'Low-VOC'], features: ['Luxurious Silk Finish', 'Washable', 'Anti-Bacterial'], application: ['Living Rooms', 'Bedrooms'], stock: 'In Stock', image: '', price: '₹490/litre', badge: 'Premium', coverage: '150 sq ft/litre', washability: 'High', priceType: 'fixed' },
  { id: 'bgr2', name: 'WeatherCoat Anti-Dust Exterior', brand: 'Berger Paints', productFamily: 'WeatherCoat Series', category: 'wall-finishes', subcategory: 'paints', productType: 'exterior-emulsion', grade: 'Premium', materialType: 'Exterior Emulsion', packaging: '1L / 4L / 10L / 20L', certifications: ['Weatherproof Certified'], features: ['Anti-Dust Technology', 'Weather Resistant', 'Colour Retention'], application: ['Exterior Walls', 'Facades'], stock: 'In Stock', image: '', price: '₹450/litre', badge: 'Top Seller', durability: '7-9 years', priceType: 'fixed' },

  // ========== TILES & FLOORING ==========
  { id: 'som1', name: 'Glossy Vitrified Floor Tile', brand: 'Somany Ceramics', productFamily: 'Duragres Series', category: 'flooring', subcategory: 'tiles', productType: 'vitrified-tiles', grade: 'GVT', materialType: 'Vitrified Tile', packaging: 'Box of 4 (2.88 sq.m)', certifications: ['ISO 13006', 'GreenPro'], features: ['Scratch Resistant', 'Low Water Absorption', 'High Gloss'], application: ['Living Room Flooring', 'Commercial Spaces'], stock: 'In Stock', image: '', price: '₹65/sq ft', badge: 'Top Seller', availableCities: ['Pan India'], priceType: 'fixed' },
  { id: 'som2', name: 'Matte Ceramic Wall Tile', brand: 'Somany Ceramics', productFamily: 'Ceramic Series', category: 'flooring', subcategory: 'tiles', productType: 'ceramic-tiles', grade: 'Standard', materialType: 'Ceramic Tile', packaging: 'Box of 8', certifications: ['ISO 13006'], features: ['Anti-Skid', 'Easy to Clean', 'Design Variety'], application: ['Kitchen Walls', 'Bathroom Walls'], stock: 'In Stock', image: '', price: '₹42/sq ft', priceType: 'fixed' },
  { id: 'som3', name: 'Large Format Porcelain Slab', brand: 'Somany Ceramics', productFamily: 'Slabstone Series', category: 'flooring', subcategory: 'tiles', productType: 'porcelain-slabs', grade: 'Porcelain', materialType: 'Porcelain Slab', packaging: 'Per Slab (1200x2400mm)', certifications: ['ISO 13006', 'CE Marked'], features: ['Seamless Surface', 'Stain Resistant', 'Premium Look'], application: ['Feature Walls', 'Countertops', 'Lobbies'], stock: 'Made to Order', image: '', price: '₹180/sq ft', badge: 'Premium', priceType: 'quote' },

  // ========== PLYWOOD & PANELS ==========
  { id: 'grn1', name: 'Ecotec BWP Plywood', brand: 'Greenply', productFamily: 'Ecotec Series', category: 'building-materials', subcategory: 'plywood', productType: 'bwp-plywood', grade: 'IS 710', materialType: 'BWP Plywood', packaging: '8x4 ft sheets', certifications: ['IS 710', 'CARB-P2', 'FSC'], features: ['Boiling Water Proof', 'Borer & Termite Proof', 'Calibrated Thickness'], application: ['Kitchen Cabinets', 'Bathroom Vanities', 'Furniture'], stock: 'In Stock', image: '', price: '₹85/sq ft', badge: 'Premium', priceType: 'fixed' },
  { id: 'grn2', name: 'Club Prime MR Plywood', brand: 'Greenply', productFamily: 'Club Prime Series', category: 'building-materials', subcategory: 'plywood', productType: 'mr-plywood', grade: 'IS 303', materialType: 'MR Grade Plywood', packaging: '8x4 ft sheets', certifications: ['IS 303'], features: ['Moisture Resistant', 'High Strength', 'Smooth Finish'], application: ['Wardrobes', 'Interior Furniture', 'Partitions'], stock: 'In Stock', image: '', price: '₹62/sq ft', badge: 'Best Value', priceType: 'fixed' },
  { id: 'grn3', name: 'Decowood Natural Veneer', brand: 'Greenply', productFamily: 'Decowood Series', category: 'building-materials', subcategory: 'veneer', materialType: 'Natural Veneer', packaging: '8x4 ft sheets', certifications: ['FSC'], features: ['Real Wood Grain', 'Premium Finish', 'Pre-Polished Options'], application: ['Wall Paneling', 'Door Skins', 'Furniture Facades'], stock: 'Made to Order', image: '', price: '₹140/sq ft', badge: 'Premium', priceType: 'quote' },

  // ========== ADHESIVES & WATERPROOFING (PIDILITE) ==========
  { id: 'pid1', name: 'Fevicol Marine Adhesive', brand: 'Pidilite', productFamily: 'Fevicol Series', category: 'building-materials', subcategory: 'construction-chemicals', subSubcategory: 'adhesives', materialType: 'Synthetic Resin Adhesive', packaging: '500g / 1kg / 5kg / 20kg', certifications: ['IS 4835'], features: ['Waterproof Bond', 'High Strength', 'Long Open Time'], application: ['Woodwork', 'Laminates', 'Plywood Bonding'], stock: 'In Stock', image: '', price: '₹240/kg', badge: 'Top Seller', priceType: 'fixed' },
  { id: 'pid2', name: 'Dr. Fixit LW+ Integral Waterproofing', brand: 'Pidilite', productFamily: 'Dr. Fixit Series', category: 'building-materials', subcategory: 'construction-chemicals', subSubcategory: 'waterproofing', materialType: 'Integral Waterproofing Compound', packaging: '1L / 5L / 20L', certifications: ['IS 2645'], features: ['Reduces Permeability', 'Easy to Mix', 'Corrosion Inhibiting'], application: ['Concrete', 'Plaster', 'Foundations'], stock: 'In Stock', image: '', price: '₹95/litre', priceType: 'fixed' },
  { id: 'pid3', name: 'M-Seal Phataphat Instant Adhesive', brand: 'Pidilite', productFamily: 'M-Seal Series', category: 'building-materials', subcategory: 'construction-chemicals', subSubcategory: 'adhesives', materialType: 'Cyanoacrylate Adhesive', packaging: '2g / 20g', certifications: ['ISO 9001'], features: ['Instant Bond', 'Multi-Surface', 'Strong Hold'], application: ['Quick Repairs', 'Multi-Material Bonding'], stock: 'In Stock', image: '', price: '₹45/unit', priceType: 'fixed' },

  // ========== GLASS & GYPSUM (SAINT-GOBAIN) ==========
  { id: 'sgb1', name: 'Gyproc Gypsum Board', brand: 'Saint-Gobain', productFamily: 'Gyproc Series', category: 'wall-finishes', subcategory: 'gypsum', materialType: 'Gypsum Plasterboard', packaging: '1.2 x 2.4 m boards', certifications: ['IS 2095', 'GreenPro'], features: ['Fire Resistant', 'Lightweight', 'Acoustic Performance'], application: ['False Ceilings', 'Drywall Partitions'], stock: 'In Stock', image: '', price: '₹55/sq ft', badge: 'Top Seller', priceType: 'fixed' },
  { id: 'sgb2', name: 'SGG Clear Float Glass', brand: 'Saint-Gobain', productFamily: 'Planilux Series', category: 'building-materials', subcategory: 'glass', materialType: 'Float Glass', packaging: 'Per sq.m (custom cut)', certifications: ['IS 14900'], features: ['Optical Clarity', 'Distortion-Free', 'Cuttable to Size'], application: ['Windows', 'Facades', 'Partitions'], stock: 'Made to Order', image: '', price: '₹120/sq ft', priceType: 'quote' },

  // ========== ELECTRICAL (LEGRAND) ==========
  { id: 'leg1', name: 'Myrius Modular Switch', brand: 'Legrand India', productFamily: 'Myrius Series', category: 'electrical', subcategory: 'switches', materialType: 'Modular Switch', packaging: 'Per module', certifications: ['IS 3854'], features: ['Shock Proof', 'Elegant Finish', 'Silent Operation'], application: ['Residential Wiring', 'Offices'], stock: 'In Stock', image: '', price: '₹120/module', badge: 'Top Seller', priceType: 'fixed' },
  { id: 'leg2', name: 'DX3 32A Miniature Circuit Breaker', brand: 'Legrand India', productFamily: 'DX3 Series', category: 'electrical', subcategory: 'circuit-protection', materialType: 'Miniature Circuit Breaker (MCB)', packaging: 'Single pole / Double pole', certifications: ['IS 60898'], features: ['Overload Protection', 'Short-Circuit Protection', 'Trip-Free Mechanism'], application: ['Distribution Boards', 'Residential & Commercial'], stock: 'In Stock', image: '', price: '₹280/unit', priceType: 'fixed' },

  // ========== HARDWARE & FITTINGS (HAFELE) ==========
  { id: 'haf1', name: 'Soft-Close Concealed Hinge', brand: 'Hafele India', productFamily: 'Metalla Series', category: 'hardware', subcategory: 'fittings', materialType: 'Cabinet Hinge', packaging: 'Pair', certifications: ['DIN EN 15570'], features: ['Soft-Close Mechanism', 'Corrosion Resistant', '110° Opening'], application: ['Modular Kitchens', 'Wardrobes'], stock: 'In Stock', image: '', price: '₹180/pair', badge: 'Premium', priceType: 'fixed' },
  { id: 'haf2', name: 'Mortise Door Lock Set', brand: 'Hafele India', productFamily: 'Startec Series', category: 'hardware', subcategory: 'locks', materialType: 'Mortise Lock', packaging: 'Complete set', certifications: ['EN 12209'], features: ['Anti-Pick Cylinder', 'Stainless Finish', 'Smooth Action'], application: ['Main Doors', 'Bedroom Doors'], stock: 'In Stock', image: '', price: '₹2,400/set', priceType: 'fixed' },
];

// Override each product's image with a local, category-relevant asset so the
// catalogue never relies on a live image host and photos always match the product.
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({ ...p, image: productImage(p) }));