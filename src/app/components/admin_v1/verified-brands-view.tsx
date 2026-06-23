import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  User,
  Package,
  Layers,
  MapPin,
  ExternalLink,
  Flag,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Mail,
  Globe,
  Building2,
  Calendar,
  Phone,
  ArrowLeft,
  X,
  FileText,
  Eye,
  Check,
  Clock,
  Edit2,
  Minus
} from 'lucide-react';
import { ProductsDetailAdmin } from './products-detail-admin';

// --- Types ---

type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED' | 'OUTDATED';

interface VerifiedBrand {
  id: string;
  name: string;
  category: string;
  status: 'complete' | 'incomplete';
  issues?: string[];
  activeSince: string;
  email: string;
  website: string;
  gst: string;
  headquarters: string;
  founded: string;
  about: string;
  contacts: { name: string; role: string }[];
  products: ProductCategory[];
  categories: CategoryMapping[];
  stores: Store[];
  verifications: VerificationData;
}

interface VerificationData {
  kyc: KYCData;
  certifications: Certification[];
  catalogues: Catalogue[];
}

interface KYCData {
  kyc_id: string;
  registration_number: string;
  gst_number: string;
  documents: KYCDocument[];
  overall_status: VerificationStatus;
  verified_by?: string;
  verified_at?: string;
  rejection_reason?: string;
}

interface KYCDocument {
  type: 'registration' | 'gst' | 'pan' | 'other';
  file_url: string;
  status: VerificationStatus;
  name: string;
}

interface Certification {
  certificate_id: string;
  name: string;
  type: string;
  issuing_org: string;
  certificate_number: string;
  issue_date: string;
  expiry_date: string;
  file_url: string;
  status: VerificationStatus;
  verified_by?: string;
  verified_at?: string;
  rejection_reason?: string;
}

interface Catalogue {
  catalogue_id: string;
  name: string;
  category: string;
  type: string;
  year: number;
  file_url: string;
  status: VerificationStatus;
  verified_by?: string;
  verified_at?: string;
  rejection_reason?: string;
}

interface ProductCategory {
  name: string;
  families: ProductFamily[];
}

interface ProductFamily {
  name: string;
  products: string[];
}

interface CategoryMapping {
  name: string;
  subcategories: string[];
}

// New hierarchical category structure
interface HierarchicalCategory {
  id: string;
  name: string;
  subcategories: HierarchicalSubcategory[];
}

interface HierarchicalSubcategory {
  id: string;
  name: string;
  items: string[];
}

interface Store {
  name: string;
  address: string;
  type: 'Flagship' | 'Distribution' | 'Partner';
}

type DetailView = 'overview' | 'profile' | 'products' | 'categories' | 'stores' | 'verifications';

// --- Construction Industry Category Data ---

const constructionCategories: HierarchicalCategory[] = [
  {
    id: 'building-materials',
    name: 'Building Materials',
    subcategories: [
      {
        id: 'cement',
        name: 'Cement',
        items: ['OPC Cement', 'PPC Cement', 'White Cement']
      },
      {
        id: 'steel',
        name: 'Steel',
        items: ['TMT Bars', 'Structural Steel', 'Steel Pipes']
      },
      {
        id: 'construction-chemicals',
        name: 'Construction Chemicals',
        items: ['Waterproofing Compounds', 'Tile Adhesives', 'Grouts & Sealants']
      }
    ]
  },
  {
    id: 'flooring',
    name: 'Flooring',
    subcategories: [
      {
        id: 'tiles',
        name: 'Tiles',
        items: ['Ceramic Tiles', 'Vitrified Tiles', 'Porcelain Tiles']
      },
      {
        id: 'stone',
        name: 'Stone',
        items: ['Marble', 'Granite', 'Kota Stone']
      },
      {
        id: 'wood-flooring',
        name: 'Wood Flooring',
        items: ['Engineered Wood', 'Laminate Flooring']
      }
    ]
  },
  {
    id: 'wall-finishes',
    name: 'Wall Finishes',
    subcategories: [
      {
        id: 'paints-coatings',
        name: 'Paints & Coatings',
        items: ['Interior Paints', 'Exterior Paints', 'Primers']
      },
      {
        id: 'wallpapers',
        name: 'Wallpapers',
        items: ['Textured Finishes']
      }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting',
    subcategories: [
      {
        id: 'indoor-lighting',
        name: 'Indoor Lighting',
        items: ['LED Downlights', 'Panel Lights', 'Track Lights']
      },
      {
        id: 'outdoor-lighting',
        name: 'Outdoor Lighting',
        items: ['Street Lights', 'Garden Lights', 'Facade Lights']
      }
    ]
  },
  {
    id: 'sanitary',
    name: 'Sanitary',
    subcategories: [
      {
        id: 'bathroom-fittings',
        name: 'Bathroom Fittings',
        items: ['Wash Basins', 'WC Units', 'Faucets', 'Showers']
      }
    ]
  }
];

// --- Mock Data ---

const mockVerifiedBrands: VerifiedBrand[] = [
  {
    id: 'b1',
    name: 'TileWorks Global',
    category: 'Tiles & Ceramics',
    status: 'incomplete',
    issues: ['Missing Categories', 'No North India presence'],
    activeSince: 'Jan 2026',
    email: 'info@tileworks.design',
    website: 'www.tileworks.design',
    gst: '06AABCT8976B1Z5',
    headquarters: 'Morbi, Gujarat',
    founded: '2015',
    about: 'Leading manufacturer of premium tiles and ceramics for residential and commercial spaces.',
    contacts: [
      { name: 'Amit Patel', role: 'Brand Manager' },
      { name: 'Priya Shah', role: 'Sales Head' }
    ],
    products: [
      {
        name: 'Tiles',
        families: [
          { name: 'Floor Tiles', products: ['Glossy Vitrified 600x600', 'Matt Vitrified 800x800'] },
          { name: 'Wall Tiles', products: ['Designer Wall Tile', 'Subway Tiles'] }
        ]
      }
    ],
    categories: [
      { name: 'Tiles', subcategories: ['Floor Tiles', 'Wall Tiles'] }
    ],
    stores: [
      { name: 'Morbi Factory Outlet', address: 'Morbi, Gujarat', type: 'Flagship' },
      { name: 'Mumbai Dealer Network', address: 'Andheri, Mumbai', type: 'Partner' }
    ],
    verifications: {
      kyc: {
        kyc_id: 'kyc1',
        registration_number: '1234567890',
        gst_number: '06AABCT8976B1Z5',
        documents: [
          { type: 'registration', file_url: 'registration-doc.pdf', status: 'PENDING', name: 'Registration Document' },
          { type: 'gst', file_url: 'gst-doc.pdf', status: 'PENDING', name: 'GST Document' },
          { type: 'pan', file_url: 'pan-doc.pdf', status: 'PENDING', name: 'PAN Document' },
          { type: 'other', file_url: 'bank-statement.pdf', status: 'PENDING', name: 'Bank Statement' },
          { type: 'other', file_url: 'utility-bill.pdf', status: 'PENDING', name: 'Utility Bill' }
        ],
        overall_status: 'PENDING'
      },
      certifications: [
        {
          certificate_id: 'c1',
          name: 'ISO 9001',
          type: 'Quality Management',
          issuing_org: 'ISO',
          certificate_number: 'ISO9001-123456',
          issue_date: '2026-01-01',
          expiry_date: '2027-12-31',
          file_url: 'iso9001-cert.pdf',
          status: 'VERIFIED',
          verified_by: 'John Doe',
          verified_at: '2026-06-15'
        }
      ],
      catalogues: [
        {
          catalogue_id: 'cat1',
          name: 'TileWorks 2026 Catalogue',
          category: 'Tiles & Ceramics',
          type: 'PDF',
          year: 2026,
          file_url: 'tileworks-catalogue.pdf',
          status: 'VERIFIED',
          verified_by: 'Jane Smith',
          verified_at: '2026-07-20'
        }
      ]
    }
  },
  {
    id: 'b2',
    name: 'Lumina Lighting',
    category: 'Electricals & Lighting',
    status: 'complete',
    issues: [],
    activeSince: 'Jan 2026',
    email: 'info@lumina.design',
    website: 'www.lumina.design',
    gst: '06AABCL9876B1Z3',
    headquarters: 'Mumbai, India',
    founded: '2018',
    about: 'Premium lighting solutions for modern spaces with focus on energy efficiency and design.',
    contacts: [
      { name: 'Rajat Sharma', role: 'Brand Manager' },
      { name: 'Neha Kapoor', role: 'Sales Head' }
    ],
    products: [
      {
        name: 'Lighting',
        families: [
          { name: 'LED Panels', products: ['Slim Panel 24W', 'Surface Panel 18W'] },
          { name: 'Track Lights', products: ['Focus Track Pro', 'Adjustable Beam Light'] },
          { name: 'Outdoor', products: ['Flood Light X200'] }
        ]
      }
    ],
    categories: [
      { name: 'Lighting', subcategories: ['Indoor Lighting', 'Outdoor Lighting'] },
      { name: 'Electrical', subcategories: ['Wiring', 'Switches'] }
    ],
    stores: [
      { name: 'Mumbai Experience Center', address: 'Andheri East, Mumbai', type: 'Flagship' },
      { name: 'Delhi Warehouse', address: 'Delhi', type: 'Distribution' },
      { name: 'Bangalore Dealer Network', address: 'Bangalore', type: 'Partner' }
    ],
    verifications: {
      kyc: {
        kyc_id: 'kyc2',
        registration_number: '0987654321',
        gst_number: '06AABCL9876B1Z3',
        documents: [
          { type: 'registration', file_url: 'registration-doc.pdf', status: 'VERIFIED', name: 'Registration Document' },
          { type: 'gst', file_url: 'gst-doc.pdf', status: 'VERIFIED', name: 'GST Document' },
          { type: 'pan', file_url: 'pan-doc.pdf', status: 'VERIFIED', name: 'PAN Document' },
          { type: 'other', file_url: 'bank-statement.pdf', status: 'VERIFIED', name: 'Bank Statement' },
          { type: 'other', file_url: 'utility-bill.pdf', status: 'VERIFIED', name: 'Utility Bill' }
        ],
        overall_status: 'VERIFIED',
        verified_by: 'Alice Johnson',
        verified_at: '2026-05-10'
      },
      certifications: [
        {
          certificate_id: 'c2',
          name: 'ISO 9001',
          type: 'Quality Management',
          issuing_org: 'ISO',
          certificate_number: 'ISO9001-123456',
          issue_date: '2026-01-01',
          expiry_date: '2027-12-31',
          file_url: 'iso9001-cert.pdf',
          status: 'VERIFIED',
          verified_by: 'John Doe',
          verified_at: '2026-06-15'
        }
      ],
      catalogues: [
        {
          catalogue_id: 'cat2',
          name: 'Lumina Lighting 2026 Catalogue',
          category: 'Electricals & Lighting',
          type: 'PDF',
          year: 2026,
          file_url: 'lumina-catalogue.pdf',
          status: 'VERIFIED',
          verified_by: 'Jane Smith',
          verified_at: '2026-07-20'
        }
      ]
    }
  },
  {
    id: 'b3',
    name: 'Urban Surfaces',
    category: 'Wall Finishes',
    status: 'complete',
    issues: [],
    activeSince: 'Dec 2025',
    email: 'contact@urbansurfaces.com',
    website: 'www.urbansurfaces.com',
    gst: '27AABCU5432B1Z8',
    headquarters: 'Bangalore, India',
    founded: '2020',
    about: 'Contemporary wall finishes and texture solutions for premium interiors.',
    contacts: [
      { name: 'Sanjay Kumar', role: 'Operations Head' },
      { name: 'Anjali Reddy', role: 'Business Development' }
    ],
    products: [
      {
        name: 'Wall Finishes',
        families: [
          { name: 'Textured Paints', products: ['Royale Play', 'Asian Royale'] },
          { name: 'Wallpapers', products: ['Designer Wallpaper', 'Textured Wall Covering'] }
        ]
      }
    ],
    categories: [
      { name: 'Wall Finishes', subcategories: ['Textured Paints', 'Wallpapers'] }
    ],
    stores: [
      { name: 'Bangalore Showroom', address: 'Koramangala, Bangalore', type: 'Flagship' },
      { name: 'Chennai Partner Store', address: 'Chennai', type: 'Partner' }
    ],
    verifications: {
      kyc: {
        kyc_id: 'kyc3',
        registration_number: '1122334455',
        gst_number: '27AABCU5432B1Z8',
        documents: [
          { type: 'registration', file_url: 'registration-doc.pdf', status: 'VERIFIED', name: 'Registration Document' },
          { type: 'gst', file_url: 'gst-doc.pdf', status: 'VERIFIED', name: 'GST Document' },
          { type: 'pan', file_url: 'pan-doc.pdf', status: 'VERIFIED', name: 'PAN Document' },
          { type: 'other', file_url: 'bank-statement.pdf', status: 'VERIFIED', name: 'Bank Statement' },
          { type: 'other', file_url: 'utility-bill.pdf', status: 'VERIFIED', name: 'Utility Bill' }
        ],
        overall_status: 'VERIFIED',
        verified_by: 'Alice Johnson',
        verified_at: '2026-05-10'
      },
      certifications: [
        {
          certificate_id: 'c3',
          name: 'ISO 9001',
          type: 'Quality Management',
          issuing_org: 'ISO',
          certificate_number: 'ISO9001-123456',
          issue_date: '2026-01-01',
          expiry_date: '2027-12-31',
          file_url: 'iso9001-cert.pdf',
          status: 'VERIFIED',
          verified_by: 'John Doe',
          verified_at: '2026-06-15'
        }
      ],
      catalogues: [
        {
          catalogue_id: 'cat3',
          name: 'Urban Surfaces 2026 Catalogue',
          category: 'Wall Finishes',
          type: 'PDF',
          year: 2026,
          file_url: 'urbansurfaces-catalogue.pdf',
          status: 'VERIFIED',
          verified_by: 'Jane Smith',
          verified_at: '2026-07-20'
        }
      ]
    }
  },
  {
    id: 'b4',
    name: 'MetalCore Industries',
    category: 'Structural Steel',
    status: 'incomplete',
    issues: ['Missing Products'],
    activeSince: 'Feb 2026',
    email: 'sales@metalcore.in',
    website: 'www.metalcore.in',
    gst: '09AABCM3456B1Z1',
    headquarters: 'Pune, India',
    founded: '2012',
    about: 'High-quality structural steel and metal products for construction industry.',
    contacts: [
      { name: 'Vikram Singh', role: 'Technical Manager' },
      { name: 'Pooja Mehta', role: 'Sales Director' }
    ],
    products: [
      {
        name: 'Steel',
        families: [
          { name: 'TMT Bars', products: ['Fe500D TMT', 'Fe550 TMT'] }
        ]
      }
    ],
    categories: [
      { name: 'Building Materials', subcategories: ['Steel', 'Metal Products'] }
    ],
    stores: [
      { name: 'Pune Manufacturing Unit', address: 'Pune, Maharashtra', type: 'Flagship' }
    ],
    verifications: {
      kyc: {
        kyc_id: 'kyc4',
        registration_number: '5544332211',
        gst_number: '09AABCM3456B1Z1',
        documents: [
          { type: 'registration', file_url: 'registration-doc.pdf', status: 'PENDING', name: 'Registration Document' },
          { type: 'gst', file_url: 'gst-doc.pdf', status: 'PENDING', name: 'GST Document' },
          { type: 'pan', file_url: 'pan-doc.pdf', status: 'PENDING', name: 'PAN Document' },
          { type: 'other', file_url: 'bank-statement.pdf', status: 'PENDING', name: 'Bank Statement' },
          { type: 'other', file_url: 'utility-bill.pdf', status: 'PENDING', name: 'Utility Bill' }
        ],
        overall_status: 'PENDING'
      },
      certifications: [
        {
          certificate_id: 'c4',
          name: 'ISO 9001',
          type: 'Quality Management',
          issuing_org: 'ISO',
          certificate_number: 'ISO9001-123456',
          issue_date: '2026-01-01',
          expiry_date: '2027-12-31',
          file_url: 'iso9001-cert.pdf',
          status: 'VERIFIED',
          verified_by: 'John Doe',
          verified_at: '2026-06-15'
        }
      ],
      catalogues: [
        {
          catalogue_id: 'cat4',
          name: 'MetalCore Industries 2026 Catalogue',
          category: 'Structural Steel',
          type: 'PDF',
          year: 2026,
          file_url: 'metalcore-catalogue.pdf',
          status: 'VERIFIED',
          verified_by: 'Jane Smith',
          verified_at: '2026-07-20'
        }
      ]
    }
  }
];

// --- Main Component ---

export function VerifiedBrandsView() {
  const [selectedBrand, setSelectedBrand] = useState<VerifiedBrand>(mockVerifiedBrands[1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailView, setDetailView] = useState<DetailView>('overview');

  const filteredBrands = mockVerifiedBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-gray-50 font-['Satoshi'] font-normal overflow-hidden">
      {/* Left Panel: Brand List */}
      <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-[13px] text-gray-900 font-normal uppercase tracking-wider mb-4">
            Verified Brands
          </h1>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all bg-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {filteredBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => {
                setSelectedBrand(brand);
                setDetailView('overview');
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selectedBrand.id === brand.id
                  ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm ring-1 ring-[#FF7A59]/20'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-[13px] text-gray-900 font-normal uppercase tracking-tight">
                  {brand.name}
                </h3>
                {brand.status === 'complete' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-[11px] text-gray-500 mb-2">{brand.category}</p>
              <div className="flex items-center gap-1.5">
                {brand.status === 'complete' ? (
                  <span className="text-[9px] text-green-600 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Fully Configured
                  </span>
                ) : (
                  <span className="text-[9px] text-amber-600 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {brand.issues?.[0] || 'Incomplete'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {detailView === 'overview' ? (
          <OverviewContent brand={selectedBrand} onNavigate={setDetailView} />
        ) : detailView === 'profile' ? (
          <ProfileDetailView brand={selectedBrand} onBack={() => setDetailView('overview')} />
        ) : detailView === 'products' ? (
          <ProductsDetailAdmin brandName={selectedBrand.name} onBack={() => setDetailView('overview')} />
        ) : detailView === 'categories' ? (
          <CategoriesDetailView brand={selectedBrand} onBack={() => setDetailView('overview')} />
        ) : detailView === 'stores' ? (
          <StoresDetailView brand={selectedBrand} onBack={() => setDetailView('overview')} />
        ) : detailView === 'verifications' ? (
          <VerificationsDetailView brand={selectedBrand} onBack={() => setDetailView('overview')} />
        ) : null}
      </div>
    </div>
  );
}

// --- Overview Content ---

function OverviewContent({ brand, onNavigate }: { brand: VerifiedBrand; onNavigate: (view: DetailView) => void }) {
  const profileStatus = 'complete';
  const productsStatus = brand.products.length > 0 ? (brand.products[0].families.length >= 3 ? 'complete' : 'incomplete') : 'incomplete';
  const storesStatus = brand.stores.length >= 3 ? 'complete' : 'limited';

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[20px] text-gray-900 font-normal">{brand.name}</h2>
              <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[9px] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            </div>
            <p className="text-[12px] text-gray-500">
              {brand.category} • Active since {brand.activeSince}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[11px] text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-wider flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Public Profile
            </button>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-[11px] text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-wider flex items-center gap-2">
              <Flag className="w-3.5 h-3.5" /> Flag Issue
            </button>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="grid grid-cols-2 gap-5 max-w-5xl">
          {/* Profile Card */}
          <button
            onClick={() => onNavigate('profile')}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left transition-all hover:shadow-lg hover:border-[#FF7A59] hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider">Profile</h3>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[9px] uppercase tracking-wider">
                ✓ Complete
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[13px] text-gray-900">{brand.name}</p>
              <p className="text-[11px] text-gray-500">{brand.email}</p>
              <div className="pt-2 space-y-1 text-[11px] text-gray-600">
                <p>GST: {brand.gst}</p>
                <p>HQ: {brand.headquarters}</p>
                <p>Founded: {brand.founded}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-[#FF7A59] group-hover:text-[#FF6A3D] flex items-center gap-1.5">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>

          {/* Products Card */}
          <button
            onClick={() => onNavigate('products')}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left transition-all hover:shadow-lg hover:border-[#FF7A59] hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider">Products</h3>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider ${
                productsStatus === 'complete'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {productsStatus === 'complete' ? '✓ Complete' : '⚠ Incomplete'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[11px] text-gray-600">
                Total Products: <span className="text-gray-900 font-normal">{brand.products.reduce((acc, cat) => acc + cat.families.reduce((a, f) => a + f.products.length, 0), 0)}</span>
              </p>
              <p className="text-[11px] text-gray-600">
                Product Families: <span className="text-gray-900 font-normal">{brand.products.reduce((acc, cat) => acc + cat.families.length, 0)}</span>
              </p>
              <div className="pt-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Top Categories:</p>
                <div className="space-y-1">
                  {brand.products[0]?.families.slice(0, 3).map((family, idx) => (
                    <p key={idx} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                      <span className="text-gray-400">•</span> {family.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-[#FF7A59] group-hover:text-[#FF6A3D] flex items-center gap-1.5">
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>

          {/* Verifications Card */}
          <button
            onClick={() => onNavigate('verifications')}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left transition-all hover:shadow-lg hover:border-[#FF7A59] hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider">Verifications</h3>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider ${
                brand.verifications.kyc.overall_status === 'VERIFIED'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {brand.verifications.kyc.overall_status === 'VERIFIED' ? '✓ Verified' : '⚠ Pending'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500 uppercase tracking-wider text-[10px]">KYC Status</span>
                <span className={`font-normal ${
                  brand.verifications.kyc.overall_status === 'VERIFIED' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {brand.verifications.kyc.overall_status === 'VERIFIED' ? '✓ Verified' : '⚠ Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500 uppercase tracking-wider text-[10px]">Certifications</span>
                <span className="text-gray-900 font-normal">
                  {brand.verifications.certifications.filter(c => c.status === 'VERIFIED').length} Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-500 uppercase tracking-wider text-[10px]">Catalogues</span>
                <span className="text-gray-900 font-normal">
                  {brand.verifications.catalogues.filter(c => c.status === 'VERIFIED').length} Available
                </span>
              </div>
              
              {brand.verifications.kyc.overall_status !== 'VERIFIED' && (
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <p className="text-[10px] text-amber-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" /> 1 Item Requires Attention
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-[#FF7A59] group-hover:text-[#FF6A3D] flex items-center gap-1.5">
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>

          {/* Stores & Locations Card */}
          <button
            onClick={() => onNavigate('stores')}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left transition-all hover:shadow-lg hover:border-[#FF7A59] hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider">Stores & Locations</h3>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider ${
                storesStatus === 'complete'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {storesStatus === 'complete' ? '✓ Complete' : '⚠ Limited'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[11px] text-gray-600">
                Total Locations: <span className="text-gray-900 font-normal">{brand.stores.length}</span>
              </p>
              <div className="pt-2 space-y-1 mb-3">
                {brand.stores.map((store, idx) => (
                  <p key={idx} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                    <span className="text-gray-400">•</span> {store.name}
                  </p>
                ))}
              </div>
              <div className="pt-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Coverage:</p>
                <p className="text-[11px] text-gray-600">West, South India</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-[#FF7A59] group-hover:text-[#FF6A3D] flex items-center gap-1.5">
                View Locations <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

// --- Detail Views ---

function ProfileDetailView({ brand, onBack }: { brand: VerifiedBrand; onBack: () => void }) {
  return (
    <>
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <h2 className="text-[20px] text-gray-900 font-normal">Brand Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl space-y-6">
          {/* Company Info Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-[16px] text-gray-900 font-normal mb-1">{brand.name}</h3>
                <p className="text-[11px] text-gray-500">{brand.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Email</p>
                <p className="text-[12px] text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> {brand.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Website</p>
                <p className="text-[12px] text-gray-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" /> {brand.website}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">GST Number</p>
                <p className="text-[12px] text-gray-900">{brand.gst}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Year Founded</p>
                <p className="text-[12px] text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" /> {brand.founded}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">About</p>
              <p className="text-[12px] text-gray-700 leading-relaxed">{brand.about}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Head Office</p>
              <p className="text-[12px] text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" /> {brand.headquarters}
              </p>
            </div>
          </div>

          {/* Contact Persons */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-[11px] text-gray-900 uppercase tracking-wider mb-4">Contact Persons</h4>
            <div className="space-y-4">
              {brand.contacts.map((contact, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[12px] text-gray-900 font-normal">{contact.name}</p>
                    <p className="text-[11px] text-gray-500">{contact.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductsDetailView({ brand, onBack }: { brand: VerifiedBrand; onBack: () => void }) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const toggleFamily = (familyName: string) => {
    setExpandedFamilies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(familyName)) {
        newSet.delete(familyName);
      } else {
        newSet.add(familyName);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <h2 className="text-[20px] text-gray-900 font-normal">Product Structure</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            {brand.products.map((category, catIdx) => (
              <div key={catIdx} className="mb-4 last:mb-0">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  {expandedCategories.has(category.name) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <Package className="w-5 h-5 text-purple-600" />
                  <span className="text-[13px] text-gray-900 font-normal">{category.name}</span>
                  <span className="ml-auto text-[10px] text-gray-400 px-2 py-1 bg-gray-100 rounded">
                    {category.families.length} families
                  </span>
                </button>

                {expandedCategories.has(category.name) && (
                  <div className="ml-10 mt-2 space-y-2">
                    {category.families.map((family, famIdx) => (
                      <div key={famIdx}>
                        <button
                          onClick={() => toggleFamily(family.name)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          {expandedFamilies.has(family.name) ? (
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                          )}
                          <span className="text-[12px] text-gray-900">→ {family.name}</span>
                          <span className="ml-auto text-[10px] text-gray-400 px-2 py-0.5 bg-gray-50 rounded">
                            {family.products.length}
                          </span>
                        </button>

                        {expandedFamilies.has(family.name) && (
                          <div className="ml-8 mt-1 space-y-1">
                            {family.products.map((product, prodIdx) => (
                              <div
                                key={prodIdx}
                                className="p-2.5 text-[11px] text-gray-600 flex items-center gap-2"
                              >
                                <span className="text-gray-400">•</span>
                                {product}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CategoriesDetailView({ brand, onBack }: { brand: VerifiedBrand; onBack: () => void }) {
  const [expandedAssigned, setExpandedAssigned] = useState<Set<string>>(new Set());
  const [expandedAvailable, setExpandedAvailable] = useState<Set<string>>(new Set());
  const [selectedAvailable, setSelectedAvailable] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Sample assigned categories (simulating what brand already has)
  const assignedCategories: HierarchicalCategory[] = [
    {
      id: 'flooring',
      name: 'Flooring',
      subcategories: [
        {
          id: 'tiles',
          name: 'Tiles',
          items: ['Ceramic Tiles', 'Vitrified Tiles', 'Porcelain Tiles']
        },
        {
          id: 'stone',
          name: 'Stone',
          items: ['Marble', 'Granite']
        }
      ]
    },
    {
      id: 'wall-finishes',
      name: 'Wall Finishes',
      subcategories: [
        {
          id: 'paints-coatings',
          name: 'Paints & Coatings',
          items: ['Interior Paints', 'Exterior Paints', 'Primers']
        }
      ]
    }
  ];

  // Available categories (not yet assigned)
  const availableCategories: HierarchicalCategory[] = constructionCategories.filter(
    cat => !assignedCategories.find(a => a.id === cat.id)
  );

  const toggleAssigned = (id: string) => {
    setExpandedAssigned(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAvailable = (id: string) => {
    setExpandedAvailable(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelection = (id: string, selectChildren?: string[]) => {
    setSelectedAvailable(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        // Remove children if parent is deselected
        if (selectChildren) {
          selectChildren.forEach(child => newSet.delete(child));
        }
      } else {
        newSet.add(id);
        // Add children if parent is selected
        if (selectChildren) {
          selectChildren.forEach(child => newSet.add(child));
        }
      }
      return newSet;
    });
  };

  const handleRemove = (categoryId: string, subcategoryId?: string, itemName?: string) => {
    if (itemName) {
      alert(`Remove: ${itemName}`);
    } else if (subcategoryId) {
      alert(`Remove subcategory: ${subcategoryId}`);
    } else {
      alert(`Remove category: ${categoryId}`);
    }
  };

  // Calculate stats
  const totalCategories = assignedCategories.length;
  const totalSubcategories = assignedCategories.reduce((sum, cat) => sum + cat.subcategories.length, 0);
  const totalItems = assignedCategories.reduce((sum, cat) => 
    sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.items.length, 0), 0
  );

  return (
    <>
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] text-gray-900 font-normal">Category Mapping</h2>
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span>Categories: <span className="text-gray-900 font-medium">{totalCategories}</span></span>
            <span>•</span>
            <span>Subcategories: <span className="text-gray-900 font-medium">{totalSubcategories}</span></span>
            <span>•</span>
            <span>Items: <span className="text-gray-900 font-medium">{totalItems}</span></span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-5xl space-y-6">
          {/* Assigned Categories */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-[11px] text-gray-900 uppercase tracking-wider mb-1">Assigned Categories</h4>
                <p className="text-[12px] text-gray-500">Categories currently enabled for this brand</p>
              </div>
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>

            <div className="space-y-1">
              {assignedCategories.map((category) => (
                <div key={category.id}>
                  <div 
                    className="flex items-center gap-2 group relative"
                    onMouseEnter={() => setHoveredItem(category.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => toggleAssigned(category.id)}
                      className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      {expandedAssigned.has(category.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                      <span className="text-[13px] text-gray-900 font-semibold">{category.name}</span>
                    </button>
                    {hoveredItem === category.id && (
                      <button
                        onClick={() => handleRemove(category.id)}
                        className="absolute right-2 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                      >
                        <Minus className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>

                  {expandedAssigned.has(category.id) && (
                    <div className="ml-7 mt-1 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id}>
                          <div 
                            className="flex items-center gap-2 group relative"
                            onMouseEnter={() => setHoveredItem(subcategory.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <button
                              onClick={() => toggleAssigned(subcategory.id)}
                              className="flex-1 flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            >
                              {expandedAssigned.has(subcategory.id) ? (
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              )}
                              <span className="text-[12px] text-gray-700">├─ {subcategory.name}</span>
                            </button>
                            {hoveredItem === subcategory.id && (
                              <button
                                onClick={() => handleRemove(category.id, subcategory.id)}
                                className="absolute right-2 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                              >
                                <Minus className="w-3 h-3" />
                                Remove
                              </button>
                            )}
                          </div>

                          {expandedAssigned.has(subcategory.id) && (
                            <div className="ml-7 mt-1 space-y-1">
                              {subcategory.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="group relative"
                                  onMouseEnter={() => setHoveredItem(`${subcategory.id}-${item}`)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                                    <span className="text-[11px] text-gray-500 ml-4">└─ {item}</span>
                                  </div>
                                  {hoveredItem === `${subcategory.id}-${item}` && (
                                    <button
                                      onClick={() => handleRemove(category.id, subcategory.id, item)}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                                    >
                                      <Minus className="w-3 h-3" />
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Categories */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="mb-5">
              <h4 className="text-[11px] text-gray-900 uppercase tracking-wider mb-1">Available Categories</h4>
              <p className="text-[12px] text-gray-500">Add more categories and subcategories to this brand</p>
            </div>

            <div className="space-y-1">
              {availableCategories.map((category) => {
                const allSubIds = category.subcategories.flatMap(sub => 
                  [sub.id, ...sub.items.map((_, idx) => `${sub.id}-${idx}`)]
                );
                const isParentSelected = selectedAvailable.has(category.id);

                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={isParentSelected}
                        onChange={() => toggleSelection(category.id, allSubIds)}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                      />
                      <button
                        onClick={() => toggleAvailable(category.id)}
                        className="flex-1 flex items-center gap-2 text-left"
                      >
                        {expandedAvailable.has(category.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-[13px] text-gray-900 font-semibold">{category.name}</span>
                      </button>
                    </div>

                    {expandedAvailable.has(category.id) && (
                      <div className="ml-11 mt-1 space-y-1">
                        {category.subcategories.map((subcategory) => {
                          const childIds = subcategory.items.map((_, idx) => `${subcategory.id}-${idx}`);
                          const isSubSelected = selectedAvailable.has(subcategory.id);

                          return (
                            <div key={subcategory.id}>
                              <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={isSubSelected || isParentSelected}
                                  onChange={() => toggleSelection(subcategory.id, childIds)}
                                  disabled={isParentSelected}
                                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer disabled:opacity-50"
                                />
                                <button
                                  onClick={() => toggleAvailable(subcategory.id)}
                                  className="flex-1 flex items-center gap-2 text-left"
                                >
                                  {expandedAvailable.has(subcategory.id) ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                  )}
                                  <span className="text-[12px] text-gray-700">├─ {subcategory.name}</span>
                                </button>
                              </div>

                              {expandedAvailable.has(subcategory.id) && (
                                <div className="ml-9 mt-1 space-y-1">
                                  {subcategory.items.map((item, idx) => {
                                    const itemId = `${subcategory.id}-${idx}`;
                                    const isItemSelected = selectedAvailable.has(itemId);

                                    return (
                                      <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={isItemSelected || isSubSelected || isParentSelected}
                                          onChange={() => toggleSelection(itemId)}
                                          disabled={isSubSelected || isParentSelected}
                                          className="w-3 h-3 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer disabled:opacity-50"
                                        />
                                        <span className="text-[11px] text-gray-600 ml-4">└─ {item}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedAvailable.size > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center justify-between">
                <p className="text-[12px] text-gray-600">
                  <span className="font-medium text-gray-900">{selectedAvailable.size}</span> items selected
                </p>
                <button 
                  className="px-4 py-2 text-[12px] text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#FF6A3D' }}
                  onClick={() => alert(`Adding ${selectedAvailable.size} selected items`)}
                >
                  Add Selected Categories
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StoresDetailView({ brand, onBack }: { brand: VerifiedBrand; onBack: () => void }) {
  return (
    <>
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <h2 className="text-[20px] text-gray-900 font-normal">Stores & Locations</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="space-y-4">
              {brand.stores.map((store, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[13px] text-gray-900 font-normal mb-2">{store.name}</h5>
                      <p className="text-[11px] text-gray-600 mb-2">{store.address}</p>
                      <span className="inline-block px-2.5 py-1 bg-white border border-gray-200 rounded text-[9px] text-gray-600 uppercase tracking-wider">
                        {store.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function VerificationsDetailView({ brand, onBack }: { brand: VerifiedBrand; onBack: () => void }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<{ type: 'kyc' | 'cert' | 'catalogue'; id: string; name: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Status badge helper - Pill style (non-clickable)
  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.12)', 
              color: '#22C55E' 
            }}
          >
            Approved
          </span>
        );
      case 'PENDING':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(245, 158, 11, 0.12)', 
              color: '#F59E0B' 
            }}
          >
            Pending
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.12)', 
              color: '#3B82F6' 
            }}
          >
            Under Review
          </span>
        );
      case 'REJECTED':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.12)', 
              color: '#EF4444' 
            }}
          >
            Rejected
          </span>
        );
      case 'EXPIRED':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(107, 114, 128, 0.12)', 
              color: '#6B7280' 
            }}
          >
            Expired
          </span>
        );
      case 'OUTDATED':
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(107, 114, 128, 0.12)', 
              color: '#6B7280' 
            }}
          >
            Outdated
          </span>
        );
      default:
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-[12px] font-medium"
            style={{ 
              backgroundColor: 'rgba(107, 114, 128, 0.12)', 
              color: '#6B7280' 
            }}
          >
            {status}
          </span>
        );
    }
  };

  // Handlers
  const handleApproveDoc = (docType: string, docName: string) => {
    alert(`✓ Approved: ${docName}`);
  };

  const handleRequestMoreInfo = () => {
    const info = prompt('What additional information is required?');
    if (info) {
      alert(`✓ Request sent to brand:\n${info}`);
    }
  };

  const handleRejectDoc = (type: 'kyc' | 'cert' | 'catalogue', id: string, name: string) => {
    setRejectTarget({ type, id, name });
    setShowRejectModal(true);
  };

  const handleMarkUnderReview = (type: string, name: string) => {
    alert(`Marked as Under Review: ${name}`);
  };

  const confirmReject = () => {
    if (rejectTarget && rejectionReason) {
      alert(`✗ Rejected: ${rejectTarget.name}\nReason: ${rejectionReason}`);
      setShowRejectModal(false);
      setRejectTarget(null);
      setRejectionReason('');
    }
  };

  const handleApproveAllDocs = () => {
    alert('✓ All KYC documents approved');
  };

  const handleApproveAllCerts = () => {
    alert('✓ All certifications approved');
  };

  return (
    <>
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <h2 className="text-[20px] text-gray-900 font-normal">Verifications</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl space-y-6">
          {/* Verification Summary */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
            <h3 className="text-[11px] text-gray-900 uppercase tracking-wider mb-4">Verification Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">KYC Status</p>
                {getStatusBadge(brand.verifications.kyc.overall_status)}
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Certifications</p>
                <p className="text-[11px] text-gray-900">
                  {brand.verifications.certifications.filter(c => c.status === 'VERIFIED').length} / {brand.verifications.certifications.length} Verified
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Catalogues</p>
                <p className="text-[11px] text-gray-900">
                  {brand.verifications.catalogues.filter(c => c.status === 'VERIFIED').length} Active
                </p>
              </div>
            </div>
          </div>

          {/* KYC Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[11px] text-gray-900 uppercase tracking-wider mb-1">KYC Verification</h4>
                <p className="text-[12px] text-gray-500">
                  {brand.verifications.kyc.overall_status === 'VERIFIED' 
                    ? 'Approved'
                    : brand.verifications.kyc.overall_status === 'REJECTED'
                    ? `Rejected${brand.verifications.kyc.rejection_reason ? ` (Reason: ${brand.verifications.kyc.rejection_reason})` : ''}`
                    : `Pending (${brand.verifications.kyc.documents.filter(d => d.status === 'VERIFIED').length}/${brand.verifications.kyc.documents.length} documents verified)`
                  }
                </p>
              </div>
              {getStatusBadge(brand.verifications.kyc.overall_status)}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Registration Number</p>
                  <p className="text-[12px] text-gray-900">{brand.verifications.kyc.registration_number}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">GST Number</p>
                  <p className="text-[12px] text-gray-900">{brand.verifications.kyc.gst_number}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Documents</p>
                <div className="space-y-3">
                  {brand.verifications.kyc.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-gray-900 font-normal">{doc.name}</p>
                          <p className="text-[11px] text-gray-500 uppercase tracking-wider">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getStatusBadge(doc.status)}
                        {doc.status !== 'VERIFIED' && (
                          <button 
                            onClick={() => handleApproveDoc(doc.type, doc.name)}
                            className="px-3 py-1.5 text-[12px] text-white rounded-lg transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#FF6A3D' }}
                          >
                            Verify
                          </button>
                        )}
                        <button 
                          onClick={() => alert(`Viewing ${doc.name}`)}
                          className="px-3 py-1.5 text-[12px] text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {brand.verifications.kyc.rejection_reason && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded">
                <p className="text-[10px] text-red-700 uppercase tracking-wider mb-1">Rejection Reason</p>
                <p className="text-[11px] text-red-900">{brand.verifications.kyc.rejection_reason}</p>
              </div>
            )}

            {brand.verifications.kyc.overall_status !== 'VERIFIED' && (
              <div className="pt-5 border-t border-gray-200 flex items-center gap-3">
                <button 
                  onClick={handleRequestMoreInfo}
                  className="px-4 py-2.5 text-[12px] text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  Request More Info
                </button>
                <button 
                  onClick={() => handleRejectDoc('kyc', brand.verifications.kyc.kyc_id, 'KYC')}
                  className="px-4 py-2.5 text-[12px] rounded-lg transition-colors hover:opacity-90"
                  style={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    color: '#EF4444' 
                  }}
                >
                  Reject
                </button>
                <button 
                  onClick={handleApproveAllDocs}
                  className="px-4 py-2.5 text-[12px] text-white font-medium rounded-lg transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#22C55E' }}
                >
                  Approve All
                </button>
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] text-gray-900 uppercase tracking-wider">Certifications</h4>
              <button 
                onClick={handleApproveAllCerts}
                className="px-3 py-1.5 text-[10px] text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded uppercase tracking-wider transition-colors"
              >
                Approve All
              </button>
            </div>
            
            <div className="space-y-4">
              {brand.verifications.certifications.map((cert) => (
                <div key={cert.certificate_id} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-[13px] text-gray-900 font-normal mb-1">{cert.name}</h5>
                      <p className="text-[10px] text-gray-500">Certificate #{cert.certificate_number}</p>
                    </div>
                    {getStatusBadge(cert.status)}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Type</p>
                      <p className="text-[11px] text-gray-900">{cert.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Issuing Org</p>
                      <p className="text-[11px] text-gray-900">{cert.issuing_org}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Valid Till</p>
                      <p className="text-[11px] text-gray-900">{cert.expiry_date}</p>
                    </div>
                  </div>

                  {cert.rejection_reason && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded">
                      <p className="text-[10px] text-red-700 uppercase tracking-wider mb-1">❌ Rejection Reason</p>
                      <p className="text-[11px] text-red-900">{cert.rejection_reason}</p>
                    </div>
                  )}

                  {cert.verified_by && cert.verified_at && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded">
                      <p className="text-[10px] text-green-700 uppercase tracking-wider mb-1">✓ Verified By</p>
                      <p className="text-[11px] text-green-900">{cert.verified_by} • {cert.verified_at}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-[10px] text-gray-600 hover:bg-white border border-gray-200 rounded uppercase tracking-wider flex items-center gap-1 transition-colors">
                      <Eye className="w-3 h-3" /> View Certificate
                    </button>
                    {cert.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => handleMarkUnderReview('cert', cert.name)}
                          className="px-3 py-1.5 text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded uppercase tracking-wider transition-colors"
                        >
                          Mark Under Review
                        </button>
                        <button 
                          onClick={() => handleApproveDoc('cert', cert.name)}
                          className="px-3 py-1.5 text-[10px] text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded uppercase tracking-wider transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRejectDoc('cert', cert.certificate_id, cert.name)}
                          className="px-3 py-1.5 text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded uppercase tracking-wider transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalogues Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-[11px] text-gray-900 uppercase tracking-wider mb-6">Catalogues</h4>
            
            <div className="space-y-4">
              {brand.verifications.catalogues.map((cat) => (
                <div key={cat.catalogue_id} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-[13px] text-gray-900 font-normal mb-1">{cat.name}</h5>
                      <p className="text-[10px] text-gray-500">{cat.year} • {cat.type} • {cat.category}</p>
                    </div>
                    {getStatusBadge(cat.status)}
                  </div>

                  {cat.rejection_reason && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded">
                      <p className="text-[10px] text-red-700 uppercase tracking-wider mb-1">❌ Rejection Reason</p>
                      <p className="text-[11px] text-red-900">{cat.rejection_reason}</p>
                    </div>
                  )}

                  {cat.verified_by && cat.verified_at && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded">
                      <p className="text-[10px] text-green-700 uppercase tracking-wider mb-1">✓ Approved By</p>
                      <p className="text-[11px] text-green-900">{cat.verified_by} • {cat.verified_at}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-[10px] text-gray-600 hover:bg-white border border-gray-200 rounded uppercase tracking-wider flex items-center gap-1 transition-colors">
                      <Eye className="w-3 h-3" /> View Catalogue
                    </button>
                    {cat.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => handleApproveDoc('catalogue', cat.name)}
                          className="px-3 py-1.5 text-[10px] text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded uppercase tracking-wider transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRejectDoc('catalogue', cat.catalogue_id, cat.name)}
                          className="px-3 py-1.5 text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded uppercase tracking-wider transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] text-gray-900 uppercase tracking-wider">Reject: {rejectTarget.name}</h3>
              <button 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectTarget(null);
                  setRejectionReason('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-[11px] text-gray-600 mb-4">Please provide a reason for rejecting this item:</p>
            
            <div className="space-y-3 mb-4">
              <button 
                onClick={() => setRejectionReason('Document unclear or illegible')}
                className={`w-full text-left px-3 py-2 text-[11px] rounded border transition-colors ${
                  rejectionReason === 'Document unclear or illegible'
                    ? 'text-gray-900 bg-gray-100 border-gray-300'
                    : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                Document unclear or illegible
              </button>
              <button 
                onClick={() => setRejectionReason('Expired certificate')}
                className={`w-full text-left px-3 py-2 text-[11px] rounded border transition-colors ${
                  rejectionReason === 'Expired certificate'
                    ? 'text-gray-900 bg-gray-100 border-gray-300'
                    : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                Expired certificate
              </button>
              <button 
                onClick={() => setRejectionReason('Incorrect or mismatched details')}
                className={`w-full text-left px-3 py-2 text-[11px] rounded border transition-colors ${
                  rejectionReason === 'Incorrect or mismatched details'
                    ? 'text-gray-900 bg-gray-100 border-gray-300'
                    : 'text-gray-700 bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                Incorrect or mismatched details
              </button>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Or enter custom reason..."
                className="w-full px-3 py-2 text-[11px] border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={confirmReject}
                disabled={!rejectionReason}
                className="flex-1 px-4 py-2 text-[11px] text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg uppercase tracking-wider transition-colors"
              >
                Confirm Rejection
              </button>
              <button 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectTarget(null);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-2 text-[11px] text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}