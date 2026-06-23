import { useState } from 'react';
import { ArrowLeft, Edit2, Save, XCircle, Globe, Building2, MapPin, User, Mail, Phone, Bell, FileText, AlertCircle, X } from 'lucide-react';

type ViewMode = 'dashboard' | 'profile-management';

interface Brand {
  id: string;
  name: string;
  status: 'pending' | 'verified' | 'rejected';
  category: string;
  subcategories: string[];
  submittedDate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  website: string;
  locationsServed: string[];
  engagementPreferences: {
    emailNotifications: boolean;
    weeklyReports: boolean;
    productUpdates: boolean;
  };
}

interface ProfileManagementProps {
  brand: Brand;
  setViewMode: (mode: ViewMode) => void;
}

export function ProfileManagement({ brand, setViewMode }: ProfileManagementProps) {
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [brandData, setBrandData] = useState<Brand>(brand);

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setViewMode('dashboard')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF7A59] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Brand Overview
      </button>

      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Profile Management</h2>
        <p className="text-sm text-gray-500">Review and edit brand profile information</p>
      </div>

      {/* Brand Information Card */}
      <BrandInformationCard
        brand={brandData}
        isEditing={editingCard === 'brand-info'}
        onEdit={() => setEditingCard('brand-info')}
        onSave={(data) => {
          setBrandData({ ...brandData, ...data });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />

      {/* Primary Category Card */}
      <PrimaryCategoryCard
        brand={brandData}
        isEditing={editingCard === 'primary-category'}
        onEdit={() => setEditingCard('primary-category')}
        onSave={(category) => {
          setBrandData({ ...brandData, category });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />

      {/* Subcategories Card */}
      <SubcategoriesCard
        brand={brandData}
        isEditing={editingCard === 'subcategories'}
        onEdit={() => setEditingCard('subcategories')}
        onSave={(subcategories) => {
          setBrandData({ ...brandData, subcategories });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />

      {/* Locations Served Card */}
      <LocationsServedCard
        brand={brandData}
        isEditing={editingCard === 'locations'}
        onEdit={() => setEditingCard('locations')}
        onSave={(locationsServed) => {
          setBrandData({ ...brandData, locationsServed });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />

      {/* Contact Person Details Card */}
      <ContactPersonCard
        brand={brandData}
        isEditing={editingCard === 'contact'}
        onEdit={() => setEditingCard('contact')}
        onSave={(data) => {
          setBrandData({ ...brandData, ...data });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />

      {/* Engagement Preferences Card */}
      <EngagementPreferencesCard
        brand={brandData}
        isEditing={editingCard === 'engagement'}
        onEdit={() => setEditingCard('engagement')}
        onSave={(engagementPreferences) => {
          setBrandData({ ...brandData, engagementPreferences });
          setEditingCard(null);
        }}
        onCancel={() => setEditingCard(null)}
      />
    </div>
  );
}

// Brand Information Card Component
interface BrandInformationCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: { name: string; website: string; description: string }) => void;
  onCancel: () => void;
}

function BrandInformationCard({ brand, isEditing, onEdit, onSave, onCancel }: BrandInformationCardProps) {
  const [name, setName] = useState(brand.name);
  const [website, setWebsite] = useState(brand.website);
  const [description, setDescription] = useState(brand.description);

  const handleSave = () => {
    onSave({ name, website, description });
  };

  const handleCancel = () => {
    setName(brand.name);
    setWebsite(brand.website);
    setDescription(brand.description);
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Brand Information</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Brand Name</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            />
          ) : (
            <p className="text-sm text-gray-900">{brand.name}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Website</label>
          {isEditing ? (
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            />
          ) : (
            <a
              href={`https://${brand.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {brand.website}
            </a>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">About / Description</label>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59] resize-none"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{brand.description}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Primary Category Card Component
interface PrimaryCategoryCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (category: string) => void;
  onCancel: () => void;
}

function PrimaryCategoryCard({ brand, isEditing, onEdit, onSave, onCancel }: PrimaryCategoryCardProps) {
  const [category, setCategory] = useState(brand.category);

  const categories = [
    'Construction & Building Materials',
    'Wood & Timber Products',
    'Natural Stone & Surfaces',
    'Electrical & Lighting',
    'Paints & Coatings',
    'Tiles & Ceramics',
    'Hardware & Metal Products',
  ];

  const handleSave = () => {
    onSave(category);
  };

  const handleCancel = () => {
    setCategory(brand.category);
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Primary Category</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Primary Category</label>
          {isEditing ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
              <Building2 className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-sm text-gray-900">{brand.category}</span>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Subcategories Card Component
interface SubcategoriesCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (subcategories: string[]) => void;
  onCancel: () => void;
}

function SubcategoriesCard({ brand, isEditing, onEdit, onSave, onCancel }: SubcategoriesCardProps) {
  const [subcategories, setSubcategories] = useState<string[]>(brand.subcategories);
  const [newSubcategory, setNewSubcategory] = useState('');

  const allSubcategories = [
    'Concrete', 'Aggregates', 'Reinforcement', 'Hardwood Flooring', 'Plywood', 
    'Millwork', 'Granite', 'Marble', 'Quartz', 'Smart Lighting', 
    'Electrical Panels', 'Energy Management', 'Interior Paint', 'Exterior Coatings',
    'Specialty Finishes', 'Ceramic Tiles', 'Porcelain', 'Natural Stone Tiles',
    'Architectural Metal', 'Custom Hardware', 'Fabrication'
  ];

  const handleAddSubcategory = (subcat: string) => {
    if (!subcategories.includes(subcat)) {
      setSubcategories([...subcategories, subcat]);
    }
    setNewSubcategory('');
  };

  const handleRemoveSubcategory = (subcat: string) => {
    setSubcategories(subcategories.filter((s) => s !== subcat));
  };

  const handleSave = () => {
    onSave(subcategories);
  };

  const handleCancel = () => {
    setSubcategories(brand.subcategories);
    setNewSubcategory('');
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Subcategories</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Allowed Subcategories</label>
          {isEditing ? (
            <>
              <select
                value={newSubcategory}
                onChange={(e) => handleAddSubcategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59] mb-3"
              >
                <option value="">Select to add subcategory...</option>
                {allSubcategories
                  .filter((s) => !subcategories.includes(s))
                  .map((subcat) => (
                    <option key={subcat} value={subcat}>
                      {subcat}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {subcategories.map((subcat) => (
                  <span
                    key={subcat}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
                  >
                    {subcat}
                    <button
                      onClick={() => handleRemoveSubcategory(subcat)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {brand.subcategories.map((subcat, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
                >
                  {subcat}
                </span>
              ))}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Locations Served Card Component
interface LocationsServedCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (locations: string[]) => void;
  onCancel: () => void;
}

function LocationsServedCard({ brand, isEditing, onEdit, onSave, onCancel }: LocationsServedCardProps) {
  const [locations, setLocations] = useState<string[]>(brand.locationsServed);
  const [newLocation, setNewLocation] = useState('');

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const handleAddLocation = (location: string) => {
    if (!locations.includes(location)) {
      setLocations([...locations, location]);
    }
    setNewLocation('');
  };

  const handleRemoveLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const handleSave = () => {
    onSave(locations);
  };

  const handleCancel = () => {
    setLocations(brand.locationsServed);
    setNewLocation('');
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Locations Served</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 mb-2 block">States / Cities Served</label>
          {isEditing ? (
            <>
              <select
                value={newLocation}
                onChange={(e) => handleAddLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59] mb-3"
              >
                <option value="">Select to add location...</option>
                {usStates
                  .filter((s) => !locations.includes(s))
                  .map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <span
                    key={location}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-600" />
                    {location}
                    <button
                      onClick={() => handleRemoveLocation(location)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {brand.locationsServed.map((location, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-sm text-gray-900">{location}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Contact Person Card Component
interface ContactPersonCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: { contactName: string; contactEmail: string; contactPhone: string }) => void;
  onCancel: () => void;
}

function ContactPersonCard({ brand, isEditing, onEdit, onSave, onCancel }: ContactPersonCardProps) {
  const [contactName, setContactName] = useState(brand.contactName);
  const [contactEmail, setContactEmail] = useState(brand.contactEmail);
  const [contactPhone, setContactPhone] = useState(brand.contactPhone);

  const handleSave = () => {
    onSave({ contactName, contactEmail, contactPhone });
  };

  const handleCancel = () => {
    setContactName(brand.contactName);
    setContactEmail(brand.contactEmail);
    setContactPhone(brand.contactPhone);
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Contact Person Details</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email Address</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm text-gray-900">{brand.contactName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="text-sm text-[#FF7A59] hover:text-[#FF7A59]/80"
                >
                  {brand.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm text-gray-900">{brand.contactPhone}</p>
              </div>
            </div>
          </>
        )}

        {isEditing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Engagement Preferences Card Component
interface EngagementPreferencesCardProps {
  brand: Brand;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (preferences: Brand['engagementPreferences']) => void;
  onCancel: () => void;
}

function EngagementPreferencesCard({ brand, isEditing, onEdit, onSave, onCancel }: EngagementPreferencesCardProps) {
  const [preferences, setPreferences] = useState(brand.engagementPreferences);

  const handleSave = () => {
    onSave(preferences);
  };

  const handleCancel = () => {
    setPreferences(brand.engagementPreferences);
    onCancel();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Engagement Preferences</h3>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-[#FF7A59] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {isEditing ? (
          <>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </div>
              <button
                onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.emailNotifications ? 'bg-[#FF7A59]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Weekly Reports</span>
              </div>
              <button
                onClick={() => setPreferences({ ...preferences, weeklyReports: !preferences.weeklyReports })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.weeklyReports ? 'bg-[#FF7A59]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Product Updates</span>
              </div>
              <button
                onClick={() => setPreferences({ ...preferences, productUpdates: !preferences.productUpdates })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.productUpdates ? 'bg-[#FF7A59]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.productUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </div>
              <span
                className={`text-xs ${
                  brand.engagementPreferences.emailNotifications ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {brand.engagementPreferences.emailNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Weekly Reports</span>
              </div>
              <span
                className={`text-xs ${
                  brand.engagementPreferences.weeklyReports ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {brand.engagementPreferences.weeklyReports ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Product Updates</span>
              </div>
              <span
                className={`text-xs ${
                  brand.engagementPreferences.productUpdates ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {brand.engagementPreferences.productUpdates ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </>
        )}

        {isEditing && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
