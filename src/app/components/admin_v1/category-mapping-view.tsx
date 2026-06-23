import React, { useState } from 'react';
import {
  Search,
  CheckSquare,
  Square,
  MinusSquare,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  RotateCcw,
  Save,
  Eye,
  Edit2,
  Minus,
  Check,
  X
} from 'lucide-react';

// --- Types ---

interface Brand {
  id: string;
  name: string;
  status: 'complete' | 'incomplete';
  issues?: string[];
}

interface Subcategory {
  id: string;
  name: string;
  children?: Subcategory[];
  selected: boolean;
  partial?: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
  selected: boolean;
  partial?: boolean;
  subcategories: Subcategory[];
}

interface AttributeGroup {
  id: string;
  name: string;
  attributes: { id: string; name: string; selected: boolean }[];
}

// --- Mock Data ---

const mockBrands: Brand[] = [
  {
    id: 'b1',
    name: 'TileWorks Global',
    status: 'incomplete',
    issues: [
      'Products exist in "Lighting" but category not enabled',
      'Missing attributes for 3 products',
      'No stores in North India'
    ]
  },
  {
    id: 'b2',
    name: 'Lumina Lighting',
    status: 'complete'
  },
  {
    id: 'b3',
    name: 'BuildPro Materials',
    status: 'incomplete',
    issues: ['Missing category mapping']
  }
];

const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Building Materials',
    count: 12,
    selected: true,
    partial: true,
    subcategories: [
      {
        id: 'sub1',
        name: 'Cement',
        selected: true,
        partial: true,
        children: [
          { id: 'sub1-1', name: 'OPC Cement', selected: true },
          { id: 'sub1-2', name: 'PPC Cement', selected: true },
          { id: 'sub1-3', name: 'White Cement', selected: false }
        ]
      },
      {
        id: 'sub2',
        name: 'Steel',
        selected: true,
        partial: true,
        children: [
          { id: 'sub2-1', name: 'TMT Bars', selected: true },
          { id: 'sub2-2', name: 'Structural Steel', selected: false },
          { id: 'sub2-3', name: 'Steel Pipes', selected: false }
        ]
      },
      {
        id: 'sub3',
        name: 'Construction Chemicals',
        selected: false,
        children: [
          { id: 'sub3-1', name: 'Waterproofing Compounds', selected: false },
          { id: 'sub3-2', name: 'Tile Adhesives', selected: false },
          { id: 'sub3-3', name: 'Grouts & Sealants', selected: false }
        ]
      }
    ]
  },
  {
    id: 'cat2',
    name: 'Flooring',
    count: 12,
    selected: true,
    partial: true,
    subcategories: [
      {
        id: 'sub4',
        name: 'Tiles',
        selected: true,
        children: [
          { id: 'sub4-1', name: 'Ceramic Tiles', selected: true },
          { id: 'sub4-2', name: 'Vitrified Tiles', selected: true },
          { id: 'sub4-3', name: 'Porcelain Tiles', selected: true }
        ]
      },
      {
        id: 'sub5',
        name: 'Stone',
        selected: true,
        partial: true,
        children: [
          { id: 'sub5-1', name: 'Marble', selected: true },
          { id: 'sub5-2', name: 'Granite', selected: true },
          { id: 'sub5-3', name: 'Kota Stone', selected: false }
        ]
      },
      {
        id: 'sub6',
        name: 'Wood Flooring',
        selected: false,
        children: [
          { id: 'sub6-1', name: 'Engineered Wood', selected: false },
          { id: 'sub6-2', name: 'Laminate Flooring', selected: false }
        ]
      }
    ]
  },
  {
    id: 'cat3',
    name: 'Wall Finishes',
    count: 8,
    selected: true,
    subcategories: [
      {
        id: 'sub7',
        name: 'Paints & Coatings',
        selected: true,
        children: [
          { id: 'sub7-1', name: 'Interior Paints', selected: true },
          { id: 'sub7-2', name: 'Exterior Paints', selected: true },
          { id: 'sub7-3', name: 'Primers', selected: true }
        ]
      },
      {
        id: 'sub8',
        name: 'Wallpapers',
        selected: false,
        children: [
          { id: 'sub8-1', name: 'Textured Finishes', selected: false }
        ]
      }
    ]
  },
  {
    id: 'cat4',
    name: 'Lighting',
    count: 15,
    selected: false,
    subcategories: [
      {
        id: 'sub9',
        name: 'Indoor Lighting',
        selected: false,
        children: [
          { id: 'sub9-1', name: 'LED Downlights', selected: false },
          { id: 'sub9-2', name: 'Panel Lights', selected: false },
          { id: 'sub9-3', name: 'Track Lights', selected: false }
        ]
      },
      {
        id: 'sub10',
        name: 'Outdoor Lighting',
        selected: false,
        children: [
          { id: 'sub10-1', name: 'Street Lights', selected: false },
          { id: 'sub10-2', name: 'Garden Lights', selected: false },
          { id: 'sub10-3', name: 'Facade Lights', selected: false }
        ]
      }
    ]
  },
  {
    id: 'cat5',
    name: 'Sanitary',
    count: 6,
    selected: false,
    subcategories: [
      {
        id: 'sub11',
        name: 'Bathroom Fittings',
        selected: false,
        children: [
          { id: 'sub11-1', name: 'Wash Basins', selected: false },
          { id: 'sub11-2', name: 'WC Units', selected: false },
          { id: 'sub11-3', name: 'Faucets', selected: false },
          { id: 'sub11-4', name: 'Showers', selected: false }
        ]
      }
    ]
  }
];

const mockAttributeGroups: AttributeGroup[] = [
  {
    id: 'ag1',
    name: 'General',
    attributes: [
      { id: 'a1', name: 'Grade', selected: true },
      { id: 'a2', name: 'Strength', selected: true },
      { id: 'a3', name: 'Finish', selected: true },
      { id: 'a4', name: 'Size', selected: true },
      { id: 'a5', name: 'Thickness', selected: true }
    ]
  },
  {
    id: 'ag2',
    name: 'Certification',
    attributes: [
      { id: 'a6', name: 'Brand Certification', selected: true },
      { id: 'a7', name: 'Fire Rating', selected: true }
    ]
  },
  {
    id: 'ag3',
    name: 'Structural',
    attributes: [
      { id: 'a8', name: 'Load Bearing', selected: true },
      { id: 'a9', name: 'Density', selected: true }
    ]
  }
];

// --- Main Component ---

export function CategoryMappingView() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(mockBrands[0]);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [availableSearchQuery, setAvailableSearchQuery] = useState('');
  const [attributeSearchQuery, setAttributeSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [attributeGroups, setAttributeGroups] = useState<AttributeGroup[]>(mockAttributeGroups);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([]));
  const [expandedAvailable, setExpandedAvailable] = useState<Set<string>>(new Set([]));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showIssuesDrawer, setShowIssuesDrawer] = useState(false);
  
  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalCategories, setOriginalCategories] = useState<Category[]>([]);

  // Calculations
  const selectedCategoryCount = categories.filter(c => c.selected).length;
  const selectedSubcategoryCount = categories.reduce((acc, cat) => {
    return acc + cat.subcategories.filter(sub => sub.selected).length;
  }, 0);
  const issuesCount = selectedBrand.issues?.length || 0;

  const filteredBrands = mockBrands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, selected: !cat.selected, partial: false };
      }
      return cat;
    }));
  };

  const handleAttributeToggle = (groupId: string, attributeId: string) => {
    setAttributeGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          attributes: group.attributes.map(attr =>
            attr.id === attributeId ? { ...attr, selected: !attr.selected } : attr
          )
        };
      }
      return group;
    }));
  };

  const handleAutoMap = () => {
    // Simulate auto-mapping logic
    console.log('Auto mapping based on products...');
  };

  const handleReset = () => {
    setCategories(mockCategories);
    setAttributeGroups(mockAttributeGroups);
  };

  const handleSave = () => {
    console.log('Saving changes...');
  };

  const handleEditMapping = () => {
    setIsEditMode(true);
    // Deep copy to avoid reference issues
    setOriginalCategories(JSON.parse(JSON.stringify(categories)));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setCategories(JSON.parse(JSON.stringify(originalCategories)));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-['Satoshi'] font-normal">
      {/* Compressed Top Bar - Single Row */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 shrink-0 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-gray-900 font-normal">{selectedBrand.name}</span>
              <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-[9px] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="text-gray-900 font-normal">{selectedCategoryCount}</span>
                <span className="text-gray-400">Categories</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-900 font-normal">{selectedSubcategoryCount}</span>
                <span className="text-gray-400">Subcategories</span>
              </span>
              {issuesCount > 0 && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => setShowIssuesDrawer(!showIssuesDrawer)}
                    className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{issuesCount} Issues</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoMap}
              className="px-4 py-2 border border-gray-200 rounded-lg text-[11px] text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-wider flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" /> Auto Map
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-200 rounded-lg text-[11px] text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-wider flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#FF7A59] text-white rounded-lg text-[11px] hover:bg-[#FF6A3D] transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-100"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Compressed Selection Bar - Single Line */}
      <div className="bg-white border-b border-gray-100 px-8 py-2.5 shrink-0 sticky top-[72px] z-10">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar" style={{ scrollbarWidth: 'thin' }}>
          {categories.filter(cat => cat.selected || cat.partial).map((cat) => {
            const selectedSubs = cat.subcategories
              .filter(sub => sub.selected)
              .map(sub => {
                if (sub.children) {
                  const selectedChildren = sub.children.filter(child => child.selected).map(c => c.name);
                  return selectedChildren.length > 0 ? sub.name : sub.name;
                }
                return sub.name;
              });
            
            return (
              <div key={cat.id} className="flex items-center gap-1.5 shrink-0">
                <span className="px-2.5 py-1 bg-[#FF7A59]/10 text-[#FF6A3D] border border-[#FF7A59]/20 rounded text-[10px] font-normal whitespace-nowrap">
                  {cat.name}
                </span>
                {selectedSubs.length > 0 && (
                  <>
                    <span className="text-gray-300 text-[10px]">→</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] whitespace-nowrap">
                      {selectedSubs.join(', ')}
                    </span>
                  </>
                )}
              </div>
            );
          })}
          {selectedCategoryCount === 0 && (
            <span className="text-[11px] text-gray-400 italic py-1">No categories assigned yet</span>
          )}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex px-8 pb-8 pt-6 gap-6 min-h-full">
          {/* Left Panel: Brand List */}
          <div className="w-[280px] bg-white border border-gray-200 rounded-2xl shadow-sm shrink-0 flex flex-col max-h-[600px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all bg-white"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedBrand.id === brand.id
                      ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm ring-1 ring-[#FF7A59]/20'
                      : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[12px] font-normal uppercase tracking-tight ${
                      selectedBrand.id === brand.id ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {brand.name}
                    </span>
                    {brand.status === 'complete' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className={`text-[9px] uppercase tracking-wider ${
                    brand.status === 'complete' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {brand.status === 'complete' ? 'Fully Configured' : 'Missing Categories'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content: Unified Hierarchical View */}
          <div className="flex-1 flex flex-col gap-6">
            {/* SECTION 1: Assigned Categories */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-start justify-between">
                <div>
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider mb-1">
                    Assigned Categories
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    Categories currently enabled for this brand
                  </p>
                </div>
                {!isEditMode ? (
                  <button
                    onClick={handleEditMapping}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-gray-700 hover:bg-white border border-gray-300 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Mapping
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsEditMode(false);
                        console.log('Saving mapping changes...');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-white bg-[#FF6A3D] hover:bg-[#FF5A2D] rounded-lg transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5">
                {categories.filter(cat => cat.selected || cat.partial).length === 0 ? (
                  <div className="flex items-center justify-center py-12 text-[11px] text-gray-400 italic">
                    No categories assigned yet
                  </div>
                ) : (
                  <div className="space-y-1">
                    {categories.filter(cat => cat.selected || cat.partial).map((category) => (
                      <div key={category.id} className="transition-all duration-200 ease-in-out">
                        {/* Category Level */}
                        <div
                          className="flex items-center gap-2 group relative"
                          onMouseEnter={() => setHoveredItem(category.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <button
                            onClick={() => toggleCategoryExpand(category.id)}
                            className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left"
                          >
                            <div className="transition-transform duration-200 ease-in-out" style={{ transform: expandedCategories.has(category.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>
                            <span className="text-[13px] text-gray-900 font-semibold">{category.name}</span>
                          </button>
                          {isEditMode && hoveredItem === category.id && (
                            <button
                              onClick={() => alert(`Remove category: ${category.name}`)}
                              className="absolute right-2 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Subcategories with smooth animation */}
                        {expandedCategories.has(category.id) && (
                          <div className="ml-7 mt-1 space-y-1 animate-fadeInSlide">
                            {category.subcategories.filter(sub => sub.selected || sub.partial).map((subcategory) => (
                              <div key={subcategory.id} className="transition-all duration-200 ease-in-out">
                                <div
                                  className="flex items-center gap-2 group relative"
                                  onMouseEnter={() => setHoveredItem(subcategory.id)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <button
                                    onClick={() => toggleCategoryExpand(subcategory.id)}
                                    className="flex-1 flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left"
                                  >
                                    <div className="transition-transform duration-200 ease-in-out" style={{ transform: expandedCategories.has(subcategory.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    </div>
                                    <span className="text-[12px] text-gray-700">├─ {subcategory.name}</span>
                                  </button>
                                  {isEditMode && hoveredItem === subcategory.id && (
                                    <button
                                      onClick={() => alert(`Remove subcategory: ${subcategory.name}`)}
                                      className="absolute right-2 px-2 py-1 text-[10px] text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                {/* Sub-subcategories (items) */}
                                {expandedCategories.has(subcategory.id) && subcategory.children && (
                                  <div className="ml-7 mt-1 space-y-1 animate-fadeInSlide">
                                    {subcategory.children.filter(child => child.selected).map((item) => (
                                      <div
                                        key={item.id}
                                        className="group relative"
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                      >
                                        <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                                          <span className="text-[11px] text-gray-600 ml-4">└─ {item.name}</span>
                                        </div>
                                        {hoveredItem === item.id && (
                                          <button
                                            onClick={() => alert(`Remove item: ${item.name}`)}
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
                )}
              </div>
            </div>

            {/* SECTION 2: Available Categories */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <div className="mb-3">
                  <h3 className="text-[11px] text-gray-900 font-normal uppercase tracking-wider mb-1">
                    Available Categories
                  </h3>
                  <p className="text-[12px] text-gray-500">
                    Add more categories and subcategories to this brand
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={availableSearchQuery}
                    onChange={(e) => setAvailableSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all bg-white"
                  />
                </div>
              </div>

              <div className="p-5">
                {categories.filter(cat => !cat.selected && !cat.partial).length === 0 ? (
                  <div className="flex items-center justify-center py-12 text-[11px] text-gray-400 italic">
                    All categories have been assigned
                  </div>
                ) : (
                  <div className="space-y-1">
                    {categories
                      .filter(cat => !cat.selected && !cat.partial)
                      .filter(cat => cat.name.toLowerCase().includes(availableSearchQuery.toLowerCase()))
                      .map((category) => {
                        const hasProductIssue = category.name === 'Lighting';
                        
                        return (
                          <div key={category.id} className="transition-all duration-200 ease-in-out">
                            {/* Category with checkbox */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${hasProductIssue ? 'border-l-2 border-amber-400 bg-amber-50/30' : ''}`}>
                              <input
                                type="checkbox"
                                checked={category.selected}
                                onChange={() => handleCategoryToggle(category.id)}
                                className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                              />
                              <button
                                onClick={() => {
                                  setExpandedAvailable(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(category.id)) {
                                      newSet.delete(category.id);
                                    } else {
                                      newSet.add(category.id);
                                    }
                                    return newSet;
                                  });
                                }}
                                className="flex-1 flex items-center gap-2 text-left"
                              >
                                <div className="transition-transform duration-200 ease-in-out" style={{ transform: expandedAvailable.has(category.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[13px] text-gray-900 font-semibold">{category.name}</span>
                                    {hasProductIssue && (
                                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                                    )}
                                  </div>
                                  {hasProductIssue && (
                                    <p className="text-[9px] text-amber-600 mt-0.5">Used in 12 products</p>
                                  )}
                                </div>
                              </button>
                            </div>

                            {/* Subcategories */}
                            {expandedAvailable.has(category.id) && (
                              <div className="ml-11 mt-1 space-y-1 animate-fadeInSlide">
                                {category.subcategories.map((subcategory) => (
                                  <div key={subcategory.id} className="transition-all duration-200 ease-in-out">
                                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                      <input
                                        type="checkbox"
                                        checked={subcategory.selected}
                                        onChange={() => {/* Handle sub toggle */}}
                                        className="w-3.5 h-3.5 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                                      />
                                      <button
                                        onClick={() => {
                                          setExpandedAvailable(prev => {
                                            const newSet = new Set(prev);
                                            if (newSet.has(subcategory.id)) {
                                              newSet.delete(subcategory.id);
                                            } else {
                                              newSet.add(subcategory.id);
                                            }
                                            return newSet;
                                          });
                                        }}
                                        className="flex-1 flex items-center gap-2 text-left"
                                      >
                                        <div className="transition-transform duration-200 ease-in-out" style={{ transform: expandedAvailable.has(subcategory.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                        </div>
                                        <span className="text-[12px] text-gray-700">├─ {subcategory.name}</span>
                                      </button>
                                    </div>

                                    {/* Items */}
                                    {expandedAvailable.has(subcategory.id) && subcategory.children && (
                                      <div className="ml-9 mt-1 space-y-1 animate-fadeInSlide">
                                        {subcategory.children.map((item) => (
                                          <div key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                                            <input
                                              type="checkbox"
                                              checked={item.selected}
                                              onChange={() => {/* Handle item toggle */}}
                                              className="w-3 h-3 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                                            />
                                            <span className="text-[11px] text-gray-600 ml-4">└─ {item.name}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Drawer */}
      {showIssuesDrawer && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] text-gray-900 font-normal uppercase tracking-wider mb-1">
                Configuration Issues
              </h3>
              <p className="text-[11px] text-gray-500">
                {issuesCount} issues require attention
              </p>
            </div>
            <button
              onClick={() => setShowIssuesDrawer(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {selectedBrand.issues?.map((issue, index) => (
              <div
                key={index}
                className="p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-amber-900">{issue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}