import { useState } from 'react';
import { ArrowLeft, Search, Edit2, Save, XCircle, MapPin, Phone, Mail, User, ExternalLink, X, Plus } from 'lucide-react';

type ViewMode = 'dashboard' | 'profile-management' | 'categories-attributes' | 'products-management' | 'stores-management';

interface Brand {
  id: string;
  name: string;
}

interface StoreData {
  id: string;
  name: string;
  city: string;
  state: string;
  status: 'active' | 'inactive';
  address: string;
  pincode: string;
  contactName: string;
  phone: string;
  email: string;
  services: string[];
  productCategories: string[];
  storeType: 'experience-center' | 'dealer' | 'warehouse';
  appointmentRequired: boolean;
  visibleOnPortal: boolean;
  mapsLink: string;
}

interface StoresManagementProps {
  brand: Brand;
  setViewMode: (mode: ViewMode) => void;
}

// Mock store data
const mockStores: StoreData[] = [
  {
    id: '1',
    name: 'TileWorks Chicago Showroom',
    city: 'Chicago',
    state: 'Illinois',
    status: 'active',
    address: '1250 West Madison Street, Suite 100',
    pincode: '60607',
    contactName: 'Michael Thompson',
    phone: '+1 (312) 555-0198',
    email: 'chicago@tileworks.com',
    services: ['Product Display', 'Design Consultation', 'Sample Pick-up', 'Installation Support'],
    productCategories: ['Ceramic Tiles', 'Porcelain', 'Natural Stone Tiles', 'Mosaic Tiles'],
    storeType: 'experience-center',
    appointmentRequired: false,
    visibleOnPortal: true,
    mapsLink: 'https://maps.google.com/?q=Chicago+IL',
  },
  {
    id: '2',
    name: 'TileWorks Milwaukee Dealer',
    city: 'Milwaukee',
    state: 'Wisconsin',
    status: 'active',
    address: '4580 North Port Washington Road',
    pincode: '53212',
    contactName: 'Jennifer Martinez',
    phone: '+1 (414) 555-0142',
    email: 'milwaukee@tileworks.com',
    services: ['Product Display', 'Sample Pick-up'],
    productCategories: ['Ceramic Tiles', 'Porcelain'],
    storeType: 'dealer',
    appointmentRequired: true,
    visibleOnPortal: true,
    mapsLink: 'https://maps.google.com/?q=Milwaukee+WI',
  },
  {
    id: '3',
    name: 'TileWorks Indianapolis Distribution Center',
    city: 'Indianapolis',
    state: 'Indiana',
    status: 'inactive',
    address: '6800 Hague Road',
    pincode: '46256',
    contactName: 'Robert Chen',
    phone: '+1 (317) 555-0189',
    email: 'indy-warehouse@tileworks.com',
    services: ['Bulk Orders', 'Trade Pick-up'],
    productCategories: ['Ceramic Tiles', 'Porcelain', 'Natural Stone Tiles'],
    storeType: 'warehouse',
    appointmentRequired: true,
    visibleOnPortal: false,
    mapsLink: 'https://maps.google.com/?q=Indianapolis+IN',
  },
];

export function StoresManagement({ brand, setViewMode }: StoresManagementProps) {
  const [stores] = useState<StoreData[]>(mockStores);
  const [selectedStore, setSelectedStore] = useState<StoreData>(stores[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveChanges = () => {
    console.log('Saving store changes for brand:', brand.id);
    setHasChanges(false);
  };

  const handleDiscardChanges = () => {
    console.log('Discarding changes');
    setHasChanges(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <button
          onClick={() => setViewMode('dashboard')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF7A59] transition-colors group mb-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Brand Dashboard
        </button>
        <h2 className="text-gray-900 mb-1">{brand.name}</h2>
        <p className="text-sm text-gray-500">Review and manage store locations</p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Left Panel - Store List */}
        <div className="w-[35%] bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by store name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
          </div>

          {/* Store List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs text-gray-500 mb-3 px-1">STORES</h3>
            <div className="space-y-2">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isSelected={selectedStore.id === store.id}
                  onClick={() => setSelectedStore(store)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Store Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <StoreDetailView store={selectedStore} onChange={() => setHasChanges(true)} />
          </div>

          {/* Sticky Bottom Action Bar */}
          {hasChanges && (
            <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center gap-3">
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleDiscardChanges}
                className="flex items-center gap-2 px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Discard Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Store Card Component
interface StoreCardProps {
  store: StoreData;
  isSelected: boolean;
  onClick: () => void;
}

function StoreCard({ store, isSelected, onClick }: StoreCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Store Icon */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'bg-[#FF7A59]/10' : 'bg-gray-100'
          }`}
        >
          <MapPin className={`w-5 h-5 ${isSelected ? 'text-[#FF7A59]' : 'text-gray-600'}`} />
        </div>

        {/* Store Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-gray-900 mb-1 truncate">{store.name}</h4>
          <p className="text-xs text-gray-500 mb-2">
            {store.city}, {store.state}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded ${
              store.status === 'active'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {store.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </button>
  );
}

// Store Detail View
interface StoreDetailViewProps {
  store: StoreData;
  onChange: () => void;
}

function StoreDetailView({ store, onChange }: StoreDetailViewProps) {
  const [status, setStatus] = useState(store.status === 'active');

  return (
    <>
      {/* Store Overview */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Store Overview</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Store Name</label>
            <p className="text-sm text-gray-900">{store.name}</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-900 mb-0.5">Store Status</p>
              <p className="text-xs text-gray-500">Active stores are visible to customers</p>
            </div>
            <button
              onClick={() => {
                setStatus(!status);
                onChange();
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                status ? 'bg-[#FF7A59]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  status ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Location Details</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Address</label>
            <p className="text-sm text-gray-900">{store.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">City</label>
              <p className="text-sm text-gray-900">{store.city}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">State</label>
              <p className="text-sm text-gray-900">{store.state}</p>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Pincode</label>
            <p className="text-sm text-gray-900">{store.pincode}</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Google Maps</label>
            <a
              href={store.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80"
            >
              <MapPin className="w-4 h-4" />
              View on Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Contact Details</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Store Contact Name</p>
              <p className="text-sm text-gray-900">{store.contactName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <a href={`tel:${store.phone}`} className="text-sm text-[#FF7A59] hover:text-[#FF7A59]/80">
                {store.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <a href={`mailto:${store.email}`} className="text-sm text-[#FF7A59] hover:text-[#FF7A59]/80">
                {store.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Store Capabilities */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Store Capabilities</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Services Offered</label>
            <div className="flex flex-wrap gap-2">
              {store.services.map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
                >
                  {service}
                  <button onClick={onChange} className="text-gray-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={onChange}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 border border-dashed border-gray-300 rounded-md hover:border-[#FF7A59] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Service
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">Product Categories Available</label>
            <div className="flex flex-wrap gap-2">
              {store.productCategories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700"
                >
                  {category}
                  <button onClick={onChange} className="text-blue-500 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={onChange}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 border border-dashed border-gray-300 rounded-md hover:border-[#FF7A59] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Category
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Preferences */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-gray-900 mb-4">Operating Preferences</h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Store Type</label>
            <select
              value={store.storeType}
              onChange={(e) => onChange()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            >
              <option value="experience-center">Experience Center</option>
              <option value="dealer">Dealer</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-gray-900 mb-0.5">Appointment Required</p>
              <p className="text-xs text-gray-500">Customers must book before visiting</p>
            </div>
            <button
              onClick={() => onChange()}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                store.appointmentRequired ? 'bg-[#FF7A59]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  store.appointmentRequired ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-gray-900 mb-0.5">Show on Customer Portal</p>
              <p className="text-xs text-gray-500">Make this store visible to customers</p>
            </div>
            <button
              onClick={() => onChange()}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                store.visibleOnPortal ? 'bg-[#FF7A59]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  store.visibleOnPortal ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
