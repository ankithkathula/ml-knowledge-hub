// This component handles pending, follow-up, and rejected brand onboarding
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
  Edit2,
  ChevronDown,
  Eye,
  Plus,
  Layers,
  MoreVertical,
  ShieldCheck,
  X
} from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";

// --- Types ---

type BrandStatus = 'pending' | 'follow-up' | 'rejected';

interface ContactPerson {
  id: string;
  name: string;
  phone: string;
  email: string;
  isPrimary?: boolean;
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
  adminNotes?: string;
  missingInfo?: string[];
  rejectionReason?: string;
}

// --- Mock Data ---

const mockBrands: Brand[] = [
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
    description: 'EcoStructure Solutions focuses on providing carbon-neutral building materials and sustainable supply chain management for green architecture.',
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

// --- Main View Component ---

export function BrandOnboardingView() {
  const [activeStatus, setActiveStatus] = useState<BrandStatus>('pending');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [activeStatus]);

  const handleStatusChange = (status: BrandStatus) => {
    setActiveStatus(status);
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-['Satoshi'] font-normal overflow-hidden">
      <div className="px-8 py-4 font-normal shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-1.5 flex font-normal shadow-sm">
          {['pending', 'follow-up', 'rejected'].map((status) => (
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
                  placeholder="Filter brands by name..."
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
                    onClick={() => setSelectedBrand(brand)}
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
                        <h4 className={`text-sm font-normal truncate uppercase tracking-tight ${selectedBrand?.id === brand.id ? 'text-gray-900' : 'text-gray-700'}`}>{brand.name}</h4>
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
              <BrandDetailsPanel brand={selectedBrand} />
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

// --- Brand Details Panel ---

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

      {/* Rejection Details */}
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

          {/* Admin Notes & Missing Information */}
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
        ) : (
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
        )}
      </div>
    </div>
  );
}
