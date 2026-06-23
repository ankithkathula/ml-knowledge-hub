import { useState } from 'react';
import { ArrowLeft, Search, Edit2, Save, XCircle, Image as ImageIcon, X, Plus, ChevronDown, ChevronUp } from 'lucide-react';

type ViewMode = 'dashboard' | 'profile-management' | 'categories-attributes' | 'products-management' | 'stores-management';

interface Brand {
  id: string;
  name: string;
}

interface ProductData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  image: string;
  description: string;
  finish: string;
  color: string;
  size: string;
  applicationTags: string[];
  attributes: { name: string; value: string }[];
  technicalSpecs: {
    physical: { name: string; value: string }[];
    mechanical: { name: string; value: string }[];
    certifications: { name: string; value: string }[];
    additional: { name: string; value: string }[];
  };
}

interface ProductsManagementProps {
  brand: Brand;
  setViewMode: (mode: ViewMode) => void;
}

// Mock product data
const mockProducts: ProductData[] = [
  {
    id: '1',
    name: 'Premium Porcelain Floor Tile - Matte Finish',
    category: 'Tiles & Ceramics',
    subcategory: 'Porcelain Tiles',
    status: 'active',
    lastUpdated: '2026-01-20',
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400',
    description: 'High-quality porcelain floor tile with a sophisticated matte finish. Perfect for both residential and commercial applications.',
    finish: 'Matte',
    color: 'Light Gray',
    size: '24x24 inches',
    applicationTags: ['Floor', 'Indoor', 'Commercial', 'Residential'],
    attributes: [
      { name: 'Material', value: 'Porcelain' },
      { name: 'Thickness', value: '10mm' },
      { name: 'Water Absorption', value: '<0.5%' },
    ],
    technicalSpecs: {
      physical: [
        { name: 'Dimensions', value: '24" x 24" x 10mm' },
        { name: 'Weight', value: '4.2 kg per tile' },
        { name: 'Surface Type', value: 'Non-slip matte' },
      ],
      mechanical: [
        { name: 'Breaking Strength', value: '>1300 N' },
        { name: 'Abrasion Resistance', value: 'PEI 4' },
      ],
      certifications: [
        { name: 'ISO 13006', value: 'Certified' },
        { name: 'LEED Compliant', value: 'Yes' },
      ],
      additional: [
        { name: 'Frost Resistant', value: 'Yes' },
        { name: 'Chemical Resistant', value: 'Class A' },
      ],
    },
  },
  {
    id: '2',
    name: 'Natural Stone Mosaic Tile',
    category: 'Tiles & Ceramics',
    subcategory: 'Mosaic Tiles',
    status: 'active',
    lastUpdated: '2026-01-18',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=400',
    description: 'Elegant natural stone mosaic tiles perfect for feature walls and backsplashes.',
    finish: 'Polished',
    color: 'Mixed Earth Tones',
    size: '12x12 inches (mesh mounted)',
    applicationTags: ['Wall', 'Indoor', 'Backsplash'],
    attributes: [
      { name: 'Material', value: 'Natural Stone' },
      { name: 'Thickness', value: '8mm' },
    ],
    technicalSpecs: {
      physical: [
        { name: 'Dimensions', value: '12" x 12" sheet' },
        { name: 'Tile Size', value: '1" x 1" individual pieces' },
      ],
      mechanical: [],
      certifications: [],
      additional: [],
    },
  },
  {
    id: '3',
    name: 'Ceramic Wall Tile - Glossy White',
    category: 'Tiles & Ceramics',
    subcategory: 'Ceramic Tiles',
    status: 'inactive',
    lastUpdated: '2025-12-15',
    image: 'https://images.unsplash.com/photo-1621544402532-4d51e62f1a31?w=400',
    description: 'Classic glossy white ceramic tile ideal for bathroom and kitchen walls.',
    finish: 'Glossy',
    color: 'White',
    size: '12x18 inches',
    applicationTags: ['Wall', 'Indoor', 'Bathroom', 'Kitchen'],
    attributes: [
      { name: 'Material', value: 'Ceramic' },
      { name: 'Thickness', value: '7mm' },
    ],
    technicalSpecs: {
      physical: [],
      mechanical: [],
      certifications: [],
      additional: [],
    },
  },
];

export function ProductsManagement({ brand, setViewMode }: ProductsManagementProps) {
  const [products] = useState<ProductData[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<ProductData>(products[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveChanges = () => {
    console.log('Saving product changes for brand:', brand.id);
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
        <p className="text-sm text-gray-500">Review and manage brand products</p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Left Panel - Product List */}
        <div className="w-[35%] bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs text-gray-500 mb-3 px-1">PRODUCTS</h3>
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct.id === product.id}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Product Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <ProductDetailView product={selectedProduct} onChange={() => setHasChanges(true)} />
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

// Product Card Component
interface ProductCardProps {
  product: ProductData;
  isSelected: boolean;
  onClick: () => void;
}

function ProductCard({ product, isSelected, onClick }: ProductCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isSelected
          ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
          <p className="text-xs text-gray-500 mb-2">
            {product.category} → {product.subcategory}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                product.status === 'active'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {product.status === 'active' ? 'Active' : 'Inactive'}
            </span>
            <span className="text-xs text-gray-400">{formatDate(product.lastUpdated)}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// Product Detail View
interface ProductDetailViewProps {
  product: ProductData;
  onChange: () => void;
}

function ProductDetailView({ product, onChange }: ProductDetailViewProps) {
  const [status, setStatus] = useState(product.status === 'active');

  return (
    <>
      {/* Product Overview */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Product Overview</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Product Name</label>
            <p className="text-sm text-gray-900">{product.name}</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Category Path</label>
            <p className="text-sm text-gray-700">
              {product.category} → {product.subcategory}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-900 mb-0.5">Product Status</p>
              <p className="text-xs text-gray-500">Active products are visible to customers</p>
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

      {/* Product Media */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-gray-900 mb-4">Product Media</h3>

        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onChange}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Replace Image
            </button>
            <button
              onClick={onChange}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Image
            </button>
          </div>
        </div>
      </section>

      {/* Core Product Details */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Core Product Details</h3>
          <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Short Description</label>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Finish</label>
              <p className="text-sm text-gray-900">{product.finish}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Color</label>
              <p className="text-sm text-gray-900">{product.color}</p>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Size / Dimensions</label>
            <p className="text-sm text-gray-900">{product.size}</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">Application Tags</label>
            <div className="flex flex-wrap gap-2">
              {product.applicationTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
                >
                  {tag}
                  <button onClick={onChange} className="text-gray-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attributes */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-gray-900 mb-2">Attributes</h3>
        <p className="text-xs text-gray-500 mb-4">Auto-populated based on category</p>

        <div className="space-y-3">
          {product.attributes.map((attr, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-0.5">{attr.name}</p>
                <p className="text-xs text-gray-500">{attr.value}</p>
              </div>
              <button
                onClick={onChange}
                className="text-gray-400 hover:text-[#FF7A59] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <TechnicalSpecifications specs={product.technicalSpecs} onChange={onChange} />
    </>
  );
}

// Technical Specifications Component
interface TechnicalSpecificationsProps {
  specs: ProductData['technicalSpecs'];
  onChange: () => void;
}

function TechnicalSpecifications({ specs, onChange }: TechnicalSpecificationsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('physical');

  const sections = [
    { id: 'physical', title: 'Physical Properties', data: specs.physical },
    { id: 'mechanical', title: 'Mechanical Properties', data: specs.mechanical },
    { id: 'certifications', title: 'Certifications & Safety', data: specs.certifications },
    { id: 'additional', title: 'Additional Specs', data: specs.additional },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-gray-900 mb-4">Technical Specifications</h3>

      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-900">{section.title}</span>
              {expandedSection === section.id ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                {section.data.length > 0 ? (
                  section.data.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-0.5">{spec.name}</p>
                        <p className="text-xs text-gray-500">{spec.value}</p>
                      </div>
                      <button
                        onClick={onChange}
                        className="text-gray-400 hover:text-[#FF7A59] transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No specifications added</p>
                )}
                <button
                  onClick={onChange}
                  className="flex items-center gap-1 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Specification
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
