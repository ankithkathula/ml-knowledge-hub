import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Building2, 
  Globe, 
  User, 
  MessageSquare, 
  Package, 
  Store, 
  Tags, 
  ChevronRight, 
  Check,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  ExternalLink,
  Clock,
  Layout,
  ArrowLeft,
  Edit2,
  ChevronDown,
  Eye,
  Plus,
  Layers,
  MoreVertical,
  ShieldCheck,
  FileText,
  X,
  Camera,
  Map,
  Truck
} from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";

// --- Types ---

type BrandStatus = 'pending' | 'follow-up' | 'verified' | 'rejected';
type ViewMode = 'dashboard' | 'profile' | 'categories' | 'products' | 'stores';

interface ContactPerson {
  id: string;
  name: string;
  phone: string;
  email: string;
  isPrimary?: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  status: 'Published' | 'Draft';
  image: string;
}

interface StoreItem {
  id: string;
  name: string;
  address: string;
  status: 'Active' | 'Inactive';
  type: string;
  image: string;
}

interface Brand {
  id: string;
  name: string;
  status: BrandStatus;
  primaryCategory: string;
  submittedDate: string;
  description: string;
  website: string;
  brandEmail: string;
  allCategories: { name: string; attributes: string[]; icon?: any }[];
  locationsServed: string[];
  contacts: ContactPerson[];
  engagementPreferences: string[];
  // Verified stats
  productCount?: number;
  categoryCount?: number;
  storeCount?: number;
  products?: Product[];
  stores?: StoreItem[];
  adminNotes?: string;
  missingInfo?: string[];
  rejectionReason?: string;
}

// --- Mock Data ---

const mockBrands: Brand[] = [
  {
    id: 'v1',
    name: 'TileWorks Global',
    status: 'verified',
    primaryCategory: 'Tiles & Ceramics',
    submittedDate: '2025-12-28T08:00:00',
    brandEmail: 'support@tileworks.com',
    description: 'TileWorks Global is an international supplier of ceramic tiles, providing bespoke flooring solutions for commercial and residential sectors. We collaborate with designers worldwide to bring unique patterns and textures to modern spaces.',
    website: 'www.tileworks.com',
    allCategories: [
      { name: 'Ceramic Tiles', attributes: ['Material', 'Finish', 'Size', 'Thickness'], icon: Layers },
      { name: 'Vitrified Tiles', attributes: ['Body Type', 'Abrasion Resistance', 'Water Absorption'], icon: Package }
    ],
    locationsServed: ['Pan India', 'International', 'Maharashtra', 'Gujarat'],
    contacts: [
      { id: 'c1', name: 'Vikram Malhotra', phone: '+91 99887 76655', email: 'vikram.m@tileworks.com', isPrimary: true },
      { id: 'c2', name: 'Sanjay Gupta', phone: '+91 98200 11122', email: 'sanjay@tileworks.com' }
    ],
    engagementPreferences: ['Lead generation', 'Collaborations', 'Workshops & events'],
    productCount: 142,
    categoryCount: 4,
    storeCount: 12,
    products: [
      { id: 'p1', name: 'Premium Marble Finish Tile', category: 'Ceramic Tiles', status: 'Published', image: 'https://images.unsplash.com/photo-1611265642783-9e46b5cc6f48?auto=format&fit=crop&q=80&w=400' },
      { id: 'p2', name: 'Industrial Heavy Duty Slab', category: 'Vitrified Tiles', status: 'Draft', image: 'https://images.unsplash.com/photo-1611265642783-9e46b5cc6f48?auto=format&fit=crop&q=80&w=400' }
    ],
    stores: [
      { id: 's1', name: 'Mumbai Experience Center', address: 'Worli, Mumbai', status: 'Active', type: 'Experience Center', image: 'https://images.unsplash.com/photo-1765162308598-e67b089969c6?auto=format&fit=crop&q=80&w=400' },
      { id: 's2', name: 'Delhi Flagship', address: 'Okhla, Delhi', status: 'Active', type: 'Flagship Store', image: 'https://images.unsplash.com/photo-1765162308598-e67b089969c6?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 'v2',
    name: 'Lumina Lighting',
    status: 'verified',
    primaryCategory: 'Electricals & Lighting',
    submittedDate: '2026-01-05T10:00:00',
    brandEmail: 'info@lumina.design',
    description: 'Lumina Lighting creates architectural lighting solutions that blend seamless aesthetics with cutting-edge LED technology.',
    website: 'www.lumina.design',
    allCategories: [
      { name: 'Architectural Lighting', attributes: ['Wattage', 'CCT', 'CRI'], icon: Globe }
    ],
    locationsServed: ['Maharashtra', 'Delhi NCR'],
    contacts: [
      { id: 'c3', name: 'Aditi Shah', phone: '+91 98111 22233', email: 'aditi@lumina.design', isPrimary: true }
    ],
    engagementPreferences: ['Branding', 'Lead generation'],
    productCount: 85,
    categoryCount: 2,
    storeCount: 4,
    products: [],
    stores: []
  },
  {
    id: '1',
    name: 'BuildPro Materials',
    status: 'pending',
    primaryCategory: 'Construction & Building Materials',
    submittedDate: '2026-01-19T10:30:00',
    brandEmail: 'contact@buildpro.com',
    description: 'BuildPro Materials is a premium construction materials supplier specializing in structural components and heavy-duty fabrication for large-scale infrastructure projects.',
    website: 'www.buildpro.com',
    allCategories: [{ name: 'Structural Steel', attributes: [] }],
    locationsServed: ['Maharashtra', 'Gujarat'],
    contacts: [
      { id: 'c4', name: 'Sanjay Kapoor', phone: '+91 98200 12345', email: 'sanjay.k@buildpro.com', isPrimary: true }
    ],
    engagementPreferences: ['Lead generation']
  },
  {
    id: 'follow-1',
    name: 'EcoStructure Solutions',
    status: 'follow-up',
    primaryCategory: 'Sustainable Building Materials',
    submittedDate: '2026-01-15T09:00:00',
    brandEmail: 'info@ecostructure.io',
    description: 'EcoStructure Solutions focuses on providing carbon-neutral building materials and sustainable supply chain management for green architecture. Our mission is to reduce the carbon footprint of the construction industry through innovation and circular economy principles.',
    website: 'www.ecostructure.io',
    allCategories: [{ name: 'Recycled Aggregates', attributes: [] }],
    locationsServed: ['Karnataka', 'Kerala', 'Goa'],
    contacts: [
      { id: 'c5', name: 'Ananya Rao', phone: '+91 91234 56789', email: 'ananya@ecostructure.io', isPrimary: true }
    ],
    engagementPreferences: ['Collaborations', 'Branding'],
    adminNotes: 'Brand needs to provide clearer documentation regarding their carbon-neutral claims.',
    missingInfo: ['GST certificate', 'Sustainability certification', 'Detailed product catalog']
  },
  {
    id: 'r1',
    name: 'IronClad Heavy Industry',
    status: 'rejected',
    primaryCategory: 'Heavy Machinery',
    submittedDate: '2026-01-10T14:20:00',
    brandEmail: 'ops@ironclad.com',
    description: 'IronClad specializes in heavy-duty excavators and earth-moving equipment for large scale mining operations.',
    website: 'www.ironclad.com',
    allCategories: [{ name: 'Excavation Equipment', attributes: [] }],
    locationsServed: ['Pan India'],
    contacts: [
      { id: 'c6', name: 'Rajesh Khanna', phone: '+91 90000 11111', email: 'rajesh@ironclad.com', isPrimary: true }
    ],
    engagementPreferences: ['Lead generation'],
    adminNotes: 'Initial screening found insufficient compliance documents.',
    rejectionReason: 'Incomplete documentation and failure to meet the minimum safety standard certifications required for this category.'
  }
];

// --- Verified Sub-Views ---

const ProfileManagement = ({ brand }: { brand: Brand }) => {
  const [expanded, setExpanded] = useState<string | null>('basic');

  const Section = ({ id, title, children }: any) => (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white mb-4 shadow-sm">
      <button 
        onClick={() => setExpanded(expanded === id ? null : id)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="text-xs font-normal text-gray-900 uppercase tracking-widest font-normal">{title}</span>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#FF7A59] uppercase tracking-widest font-normal opacity-0 group-hover:opacity-100">Click to expand</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === id ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {expanded === id && (
        <div className="px-6 py-8 border-t border-gray-50 bg-white space-y-8 font-normal animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl">
      <Section id="basic" title="Brand Information">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">Brand name</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Edit</button>
            </div>
            <p className="text-sm text-gray-900 font-normal">{brand.name}</p>
          </div>
          <div className="space-y-2 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">Website</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Edit</button>
            </div>
            <p className="text-sm text-[#FF7A59] font-normal lowercase">{brand.website}</p>
          </div>
          <div className="col-span-2 space-y-2 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">About the brand</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Edit</button>
            </div>
            <p className="text-sm text-gray-600 font-normal leading-relaxed">{brand.description}</p>
          </div>
          <div className="space-y-2 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">Brand email</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Edit</button>
            </div>
            <p className="text-sm text-gray-900 font-normal lowercase">{brand.brandEmail}</p>
          </div>
        </div>
      </Section>

      <Section id="contacts" title="Contact Person Details">
        <div className="space-y-4">
          {brand.contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-[#FF7A59]/20 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] text-gray-900 font-normal">{contact.name}</p>
                    {contact.isPrimary && <span className="text-[9px] bg-[#FF7A59]/10 text-[#FF7A59] px-2.5 py-1 rounded-full uppercase tracking-widest font-normal">Primary</span>}
                  </div>
                  <div className="flex items-center gap-5 mt-2">
                    <span className="text-xs text-gray-500 flex items-center gap-2 lowercase"><Mail className="w-3.5 h-3.5 text-gray-300" /> {contact.email}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-300" /> {contact.phone}</span>
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF7A59] hover:border-[#FF7A59]/30 transition-all shadow-sm">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button className="w-full py-4 border border-dashed border-gray-200 rounded-2xl text-[10px] text-gray-400 uppercase tracking-widest hover:border-[#FF7A59]/30 hover:text-[#FF7A59] transition-all flex items-center justify-center gap-2.5 bg-gray-50/20">
            <Plus className="w-3.5 h-3.5" /> Add additional contact
          </button>
        </div>
      </Section>

      <Section id="locations" title="Locations Served & Preferences">
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">Locations served</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Manage</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.locationsServed.map(loc => (
                <span key={loc} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] text-gray-600 font-normal uppercase tracking-tight">{loc}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest">Engagement preferences</label>
              <button className="opacity-0 group-hover:opacity-100 text-[#FF7A59] text-[9px] uppercase tracking-widest transition-opacity">Manage</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.engagementPreferences.map(pref => (
                <span key={pref} className="px-3 py-1.5 bg-[#FF7A59]/5 border border-[#FF7A59]/10 rounded-lg text-[10px] text-[#FF7A59] font-normal uppercase tracking-tight">{pref}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const CategoriesAttributes = ({ brand }: { brand: Brand }) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(brand.allCategories[0]?.name);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]"></div>
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-normal">{brand.categoryCount || brand.allCategories.length} Categories mapped</p>
        </div>
        <button className="text-[10px] text-[#FF7A59] uppercase tracking-widest hover:underline cursor-pointer flex items-center gap-2 font-normal">
          <Plus className="w-3.5 h-3.5" /> Manage categories
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {brand.allCategories.map((cat) => (
          <div key={cat.name} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-[#FF7A59]/10 transition-colors">
            <button 
              onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
              className="w-full px-7 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shadow-inner">
                  {cat.icon ? <cat.icon className="w-5.5 h-5.5" /> : <Tags className="w-5.5 h-5.5" />}
                </div>
                <div className="text-left">
                  <span className="text-[15px] font-normal text-gray-900 uppercase tracking-tight block">{cat.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 block">{cat.attributes.length} attributes active</span>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform ${expandedCat === cat.name ? 'rotate-180' : ''}`} />
            </button>
            {expandedCat === cat.name && (
              <div className="px-7 pb-8 pt-2 space-y-5 font-normal animate-in fade-in duration-200">
                <div className="h-px bg-gray-50"></div>
                <div className="flex items-center justify-between">
                  <label className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">Mapped Attributes</label>
                  <button className="text-[9px] text-[#FF7A59] uppercase tracking-widest font-normal hover:underline">Add Attribute</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cat.attributes.map(attr => (
                    <div key={attr} className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between group cursor-default">
                      <span className="text-[11px] text-gray-600 font-normal uppercase tracking-tight">{attr}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-[#FF7A59]"><Edit2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button className="px-4 py-3 border border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:border-[#FF7A59]/30 hover:bg-[#FF7A59]/5 transition-all cursor-pointer group">
                    <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF7A59]" />
                    <span className="text-[9px] text-gray-400 group-hover:text-[#FF7A59] uppercase tracking-widest font-normal">New attribute</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsManagement = ({ brand }: { brand: Brand }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-normal text-gray-900 uppercase tracking-[0.15em]">Product catalog</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{brand.productCount || 0} items total</p>
        </div>
        <button className="px-5 py-2.5 bg-[#FF7A59] text-white text-[10px] rounded-xl uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 cursor-pointer flex items-center gap-2 font-normal active:scale-[0.98]">
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-normal">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] text-gray-400 uppercase tracking-widest font-normal">Product</th>
                <th className="px-6 py-4 text-[10px] text-gray-400 uppercase tracking-widest font-normal">Category</th>
                <th className="px-6 py-4 text-[10px] text-gray-400 uppercase tracking-widest font-normal">Status</th>
                <th className="px-6 py-4 text-[10px] text-gray-400 uppercase tracking-widest font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(brand.products || []).map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] text-gray-900 font-normal uppercase tracking-tight truncate">{product.name}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">PID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] text-gray-500 uppercase tracking-tight font-normal">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] px-2.5 py-1 rounded-full border uppercase tracking-widest font-normal ${
                      product.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#FF7A59] hover:bg-gray-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-[#FF7A59] hover:bg-gray-50 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {(brand.products || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 mb-6">
                        <Package className="w-8 h-8" />
                      </div>
                      <p className="text-[11px] text-gray-300 uppercase tracking-[0.2em] font-normal">No products in catalog</p>
                      <button className="mt-6 text-[10px] text-[#FF7A59] uppercase tracking-widest font-normal hover:underline">Click to import products</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StoresManagement = ({ brand }: { brand: Brand }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-normal text-gray-900 uppercase tracking-[0.15em]">Store Locations</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{brand.storeCount || 0} locations managed</p>
        </div>
        <button className="text-[10px] text-[#FF7A59] uppercase tracking-widest hover:underline cursor-pointer flex items-center gap-2 font-normal">
          <Plus className="w-4 h-4" /> Add new location
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {(brand.stores || []).map(store => (
          <div key={store.id} className="bg-white border border-gray-100 rounded-3xl p-6 hover:border-[#FF7A59]/20 hover:shadow-xl hover:shadow-gray-100/30 transition-all group flex items-center justify-between font-normal shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 shadow-inner">
                <ImageWithFallback src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-4">
                  <h4 className="text-[16px] font-normal text-gray-900 uppercase tracking-tight">{store.name}</h4>
                  <span className={`text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest font-normal border ${
                    store.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}>
                    {store.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-gray-500 flex items-center gap-2 font-normal"><MapPin className="w-4 h-4 text-gray-300" /> {store.address}</span>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Store className="w-3.5 h-3.5" /> {store.type}</span>
                    <button className="text-[10px] text-[#FF7A59] flex items-center gap-1.5 hover:underline cursor-pointer uppercase tracking-widest font-normal"><Map className="w-3.5 h-3.5" /> View on map</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
              <button className="w-10 h-10 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#FF7A59] transition-all"><Edit2 className="w-4.5 h-4.5" /></button>
              <button className="w-10 h-10 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all"><MoreVertical className="w-4.5 h-4.5" /></button>
            </div>
          </div>
        ))}
        {(brand.stores || []).length === 0 && (
          <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl p-24 text-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-gray-200 mx-auto mb-6 shadow-sm">
              <Store className="w-10 h-10" />
            </div>
            <p className="text-[11px] text-gray-300 uppercase tracking-[0.2em] font-normal">No physical stores listed</p>
            <button className="mt-6 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] text-[#FF7A59] uppercase tracking-widest font-normal hover:shadow-md transition-all">Add first store</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main View Component ---

export function BrandsView() {
  const [activeStatus, setActiveStatus] = useState<BrandStatus>('pending');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  const filteredBrands = mockBrands
    .filter((brand) => brand.status === activeStatus)
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    if (filteredBrands.length > 0) {
      setSelectedBrand(filteredBrands[0]);
    } else {
      setSelectedBrand(null);
    }
    setViewMode('dashboard');
  }, [activeStatus]);

  const handleStatusChange = (status: BrandStatus) => {
    setActiveStatus(status);
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-['Satoshi'] font-normal overflow-hidden">
      <div className="px-8 py-4 font-normal shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-1.5 flex font-normal shadow-sm">
          {['pending', 'follow-up', 'verified', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status as BrandStatus)}
              className={`flex-1 py-2.5 rounded-lg text-[11px] transition-all text-center font-normal uppercase tracking-[0.15em] cursor-pointer ${
                activeStatus === status
                  ? 'bg-[#FF7A59] text-white shadow-lg shadow-orange-100 font-normal'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden px-8 pb-8 font-normal">
        <div className="flex-1 flex gap-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm font-normal">
          {/* Left Column: List (Filtered) */}
          <div className="w-[320px] border-r border-gray-100 flex flex-col bg-white font-normal shrink-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 font-normal">
              <div className="relative font-normal">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-normal" />
                <input
                  type="text"
                  placeholder={activeStatus === 'verified' ? "Search verified brands..." : "Filter brands by name..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all bg-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar font-normal">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => { setSelectedBrand(brand); setViewMode('dashboard'); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all font-normal cursor-pointer ${
                      selectedBrand?.id === brand.id
                        ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm ring-1 ring-[#FF7A59]/20'
                        : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-4 font-normal">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-normal ${selectedBrand?.id === brand.id ? 'bg-[#FF7A59] text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                        <span className="text-sm font-normal uppercase tracking-tighter">{brand.name.slice(0, 2)}</span>
                      </div>
                      <div className="flex-1 min-w-0 font-normal">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-normal truncate uppercase tracking-tight ${selectedBrand?.id === brand.id ? 'text-gray-900' : 'text-gray-700'}`}>{brand.name}</h4>
                          {brand.status === 'verified' && <ShieldCheck className={`w-3.5 h-3.5 ${selectedBrand?.id === brand.id ? 'text-[#FF7A59]' : 'text-green-500'}`} />}
                        </div>
                        <p className="text-[10px] text-gray-400 truncate font-normal uppercase tracking-widest leading-none mt-1">{brand.primaryCategory}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center font-normal px-6">
                  <Building2 className="w-10 h-10 text-gray-200 mb-4 font-normal" />
                  <p className="text-[10px] text-gray-400 font-normal uppercase tracking-widest leading-relaxed">
                    {searchQuery ? 'No matching brands found' : `No brands in ${activeStatus.replace('-', ' ')}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar font-normal relative bg-white">
            {selectedBrand ? (
              activeStatus === 'verified' ? (
                <VerifiedBrandDashboard brand={selectedBrand} viewMode={viewMode} setViewMode={setViewMode} />
              ) : (
                <BrandDetailsPanel brand={selectedBrand} />
              )
            ) : (
              <div className="h-full flex items-center justify-center font-normal p-12 text-center">
                <div className="text-center font-normal">
                  <Building2 className="w-16 h-16 mx-auto mb-6 text-gray-100 font-normal" />
                  <p className="font-normal uppercase tracking-[0.2em] text-gray-300 text-[11px] leading-relaxed">Select a brand from the list <br/> to access administrative controls</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Verified Brand Specific Dashboard ---

function VerifiedBrandDashboard({ brand, viewMode, setViewMode }: { brand: Brand, viewMode: ViewMode, setViewMode: (mode: ViewMode) => void }) {
  
  if (viewMode !== 'dashboard') {
    const titles: Record<string, string> = {
      'profile': 'Profile Management',
      'categories': 'Categories & Attributes',
      'products': 'Products Catalog',
      'stores': 'Stores Management'
    };
    
    return (
      <div className="p-10 font-normal font-['Satoshi']">
        <button 
          onClick={() => setViewMode('dashboard')} 
          className="mb-8 text-[#FF7A59] font-normal uppercase tracking-widest text-[11px] cursor-pointer flex items-center gap-2 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Brand Dashboard
        </button>
        <div className="flex items-center justify-between mb-10 border-b border-gray-50 pb-8">
          <div>
            <h2 className="text-2xl tracking-tight font-normal text-gray-900 font-normal uppercase">{titles[viewMode]}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{brand.name}</span>
              <span className="w-1 h-1 rounded-full bg-gray-200"></span>
              <span className="text-[10px] text-green-500 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Verified Account</span>
            </div>
          </div>
        </div>
        
        {viewMode === 'profile' && <ProfileManagement brand={brand} />}
        {viewMode === 'categories' && <CategoriesAttributes brand={brand} />}
        {viewMode === 'products' && <ProductsManagement brand={brand} />}
        {viewMode === 'stores' && <StoresManagement brand={brand} />}
      </div>
    );
  }

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-500 font-['Satoshi'] font-normal">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-3 font-normal border-b border-gray-50 pb-8">
        <div className="flex items-center gap-5 font-normal">
          <h2 className="text-3xl font-normal text-gray-900 uppercase tracking-tight font-normal">{brand.name}</h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] uppercase tracking-widest font-normal">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified
          </div>
        </div>
        <div className="flex items-center gap-8 font-normal">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-normal">
            <Briefcase className="w-3.5 h-3.5 text-gray-300" />
            <span className="uppercase tracking-widest text-[10px]">{brand.primaryCategory}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-normal uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-gray-300" />
            <span>Active since {new Date(brand.submittedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 font-normal">
        <ManagementCard 
          title="Profile Management" 
          desc="Review & edit brand profile, contact details, and locations."
          icon={User}
          onClick={() => setViewMode('profile')}
        />
        <ManagementCard 
          title="Categories & Attributes" 
          desc="Review and manage allowed categories and mapped attributes."
          icon={Tags}
          onClick={() => setViewMode('categories')}
        />
        <ManagementCard 
          title="Products" 
          desc="Review and manage all brand products, inventory, and catalog."
          icon={Package}
          onClick={() => setViewMode('products')}
        />
        <ManagementCard 
          title="Stores" 
          desc="Review and manage all brand stores, locations, and centers."
          icon={Store}
          onClick={() => setViewMode('stores')}
        />
      </div>
    </div>
  );
}

function ManagementCard({ title, desc, icon: Icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#FF7A59] hover:shadow-md transition-all text-left group relative ring-1 ring-gray-50 cursor-pointer shadow-sm overflow-hidden flex flex-col gap-4"
    >
      <div className="flex items-start justify-between w-full">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#FF7A59]/10 group-hover:text-[#FF7A59] transition-all border border-gray-100/50">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#FF7A59] transition-all" />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-[#FF7A59] transition-all" />
      </div>
      <div>
        <h3 className="text-[15px] font-bold text-gray-900 mb-1 uppercase tracking-tight">{title}</h3>
        <p className="text-[13px] text-gray-400 leading-snug font-normal line-clamp-1">{desc}</p>
      </div>
    </button>
  );
}

// --- Standard Details Panel (Pending, Follow-up, Rejected) ---

function BrandDetailsPanel({ brand }: { brand: Brand }) {
  return (
    <div className="p-10 space-y-10 font-normal animate-in fade-in duration-500 font-['Satoshi']">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8 font-normal">
        <div className="space-y-3 font-normal">
          <div className="flex items-center gap-4 font-normal">
            <h2 className="text-3xl font-normal text-gray-900 leading-tight tracking-tight font-normal">{brand.name}</h2>
            <span className={`text-[10px] font-normal px-3 py-1 rounded-full border uppercase tracking-widest font-normal ${
              brand.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              brand.status === 'follow-up' ? 'bg-orange-50 text-orange-700 border-orange-200' :
              'bg-red-50 text-red-700 border-red-200'
            }`}>
              {brand.status.replace('-', ' ')}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-normal">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-normal">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{brand.primaryCategory}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-normal uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              <span>Submitted on {new Date(brand.submittedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Merged Rejection Details Section - Appears before main content grid for Rejected Brands */}
      {brand.status === 'rejected' && (
        <section className="bg-red-50/30 border border-red-100 rounded-2xl p-8 font-normal animate-in fade-in duration-500">
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-normal text-gray-900 uppercase tracking-[0.2em] font-normal">Rejection Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] text-red-400 uppercase tracking-widest font-normal block">Reason for Rejection</label>
                <p className="text-[14px] text-red-700 font-bold uppercase tracking-tight leading-relaxed">{brand.rejectionReason || 'No specific reason provided.'}</p>
              </div>
              <div className="space-y-2 md:border-l md:border-red-100 md:pl-10">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-normal block">Admin Notes (Internal)</label>
                <p className="text-[13px] text-gray-600 font-normal leading-relaxed italic">{brand.adminNotes || 'No internal notes available.'}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 font-normal">
        <div className="lg:col-span-8 space-y-10 font-normal">
          <section className="space-y-4 font-normal">
            <h3 className="text-sm font-normal text-gray-900 uppercase tracking-widest">About the brand</h3>
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 font-normal">
              <p className="text-[14px] text-gray-600 leading-relaxed font-normal">{brand.description}</p>
            </div>
          </section>

          <section className="space-y-4 font-normal">
            <h3 className="text-sm font-normal text-gray-900 uppercase tracking-widest font-normal">Contact Person Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-normal">
              {brand.contacts.map((contact, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 font-normal relative overflow-hidden">
                  {contact.isPrimary && <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#FF7A59]/10 text-[#FF7A59] text-[9px] uppercase tracking-widest rounded-bl-lg">Primary</div>}
                  <div className="flex items-center gap-3 font-normal">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><User className="w-4.5 h-4.5" /></div>
                    <span className="text-[15px] text-gray-900 font-normal">{contact.name}</span>
                  </div>
                  <div className="space-y-2 pt-1 font-normal">
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-normal lowercase"><Mail className="w-3.5 h-3.5 text-gray-300" /> <span>{contact.email}</span></div>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] font-normal"><Phone className="w-3.5 h-3.5 text-gray-300" /> <span>{contact.phone}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Notes & Missing Information (New Section) */}
          {brand.status === 'follow-up' && (
            <section className="space-y-4 font-normal animate-in fade-in duration-500">
              <h3 className="text-sm font-normal text-gray-900 uppercase tracking-widest font-normal">Admin Notes & Missing Information</h3>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm font-normal">
                <div className="p-6 space-y-6 font-normal">
                  <div className="space-y-3 font-normal">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-normal block">Admin Notes</label>
                    <textarea 
                      defaultValue={brand.adminNotes || ''}
                      placeholder="Add internal remarks about this brand..."
                      className="w-full min-h-[100px] p-4 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] transition-all font-normal resize-none"
                    />
                  </div>
                  <div className="space-y-3 font-normal border-t border-gray-50 pt-6">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-normal block">Missing / Requested Information</label>
                    <div className="space-y-2 font-normal">
                      {brand.missingInfo && brand.missingInfo.length > 0 ? (
                        <div className="flex flex-wrap gap-2 font-normal">
                          {brand.missingInfo.map((info, i) => (
                            <div key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-xs font-normal">
                              {info}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic font-normal">No information currently requested.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8 font-normal">
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 font-normal">
            <h3 className="text-[11px] font-normal text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Digital Presence
            </h3>
            <div className="space-y-4 font-normal">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 block">Website</label>
                <a href={`https://${brand.website}`} target="_blank" rel="noreferrer" className="text-[13px] text-[#FF7A59] hover:underline flex items-center gap-1.5 lowercase">{brand.website} <ExternalLink className="w-3 h-3" /></a>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 block">Brand email</label>
                <div className="text-[13px] text-gray-700 lowercase">{brand.brandEmail}</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-10 flex flex-wrap items-center gap-6 border-t border-gray-50 font-normal">
        {brand.status === 'pending' ? (
          <>
            <button className="flex items-center gap-3 px-10 py-4 bg-[#FF7A59] text-white rounded-2xl text-[11px] font-normal shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-[0.2em] active:scale-[0.98] cursor-pointer">
              <Check className="w-4 h-4 font-normal" strokeWidth={3} /> Approve onboarding
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[11px] font-normal hover:bg-gray-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <MessageSquare className="w-4 h-4 text-gray-400 font-normal" /> Request more information
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[11px] font-normal hover:bg-red-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <X className="w-4 h-4 text-red-400 font-normal" /> Reject
            </button>
          </>
        ) : brand.status === 'follow-up' ? (
          <>
            <button className="flex items-center gap-3 px-10 py-4 bg-[#FF7A59] text-white rounded-2xl text-[11px] font-normal shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-[0.2em] active:scale-[0.98] cursor-pointer">
              <Check className="w-4 h-4 font-normal" strokeWidth={3} /> Approve onboarding
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[11px] font-normal hover:bg-gray-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <MessageSquare className="w-4 h-4 text-gray-400 font-normal" /> Re-request more information
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[11px] font-normal hover:bg-red-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <X className="w-4 h-4 text-red-400 font-normal" /> Reject
            </button>
          </>
        ) : brand.status === 'rejected' ? (
          <>
            <button className="flex items-center gap-3 px-10 py-4 bg-[#FF7A59] text-white rounded-2xl text-[11px] font-normal shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-[0.2em] active:scale-[0.98] cursor-pointer">
              <Check className="w-4 h-4 font-normal" strokeWidth={3} /> Re-approve brand
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[11px] font-normal hover:bg-gray-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <MessageSquare className="w-4 h-4 text-gray-400 font-normal" /> Request more information
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-red-100 text-red-500 rounded-2xl text-[11px] font-normal hover:bg-red-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <X className="w-4 h-4 text-red-400 font-normal" strokeWidth={3} /> Reject permanently
            </button>
          </>
        ) : (
          <>
            <button className="flex items-center gap-3 px-10 py-4 bg-[#FF7A59] text-white rounded-2xl text-[11px] font-normal shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all uppercase tracking-[0.2em] active:scale-[0.98] cursor-pointer">
              <Check className="w-4 h-4 font-normal" strokeWidth={3} /> Approve onboarding
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[11px] font-normal hover:bg-gray-50 transition-all uppercase tracking-[0.2em] shadow-sm cursor-pointer">
              <MessageSquare className="w-4 h-4 text-gray-400 font-normal" /> Request documentation
            </button>
          </>
        )}
      </div>
    </div>
  );
}
