import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  FolderTree,
  Plus,
  Edit3,
  Upload,
  Image as ImageIcon,
  X,
  Layers,
  Tag,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  slug?: string;
  status: 'active' | 'inactive';
  children?: Category[];
  attributeCount?: number;
  parentId?: string | null;
}

interface AttributeGroup {
  id: string;
  name: string;
  description: string;
  attributeCount: number;
  sectionCount: number;
  sections: AttributeGroupSection[];
  selected: boolean;
  expanded: boolean;
}

interface AttributeGroupSection {
  id: string;
  name: string;
  attributes: AttributeDetail[];
  selected: boolean;
}

interface AttributeDetail {
  id: string;
  name: string;
  slug: string;
  filterable: boolean;
  variantDefining: boolean;
  required: boolean;
  searchable: boolean;
  selected: boolean;
}

// Mock data
const mockCategories: Category[] = [
  {
    id: 'flooring',
    name: 'Flooring',
    slug: 'flooring',
    status: 'active',
    description: 'Floor covering materials and solutions',
    children: [
      {
        id: 'tiles',
        name: 'Tiles',
        slug: 'tiles',
        status: 'active',
        description: 'Tile products for flooring and walls',
        children: [
          { 
            id: 'ceramic-tiles', 
            name: 'Ceramic Tiles',
            slug: 'ceramic-tiles',
            status: 'active',
            description: 'Ceramic tiles are versatile surface materials used for flooring and walls in residential and commercial spaces.',
            attributeCount: 28,
            image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=512&h=512&fit=crop'
          },
          { 
            id: 'porcelain-tiles', 
            name: 'Porcelain Tiles',
            slug: 'porcelain-tiles',
            status: 'active',
            attributeCount: 24 
          },
        ]
      },
    ]
  },
  {
    id: 'stone',
    name: 'Stone',
    slug: 'stone',
    status: 'active',
    description: 'Natural stone materials',
    children: [
      { id: 'marble', name: 'Marble', slug: 'marble', status: 'active', attributeCount: 18 },
      { id: 'granite', name: 'Granite', slug: 'granite', status: 'active', attributeCount: 16 },
    ]
  },
  {
    id: 'wood',
    name: 'Wood',
    slug: 'wood',
    status: 'active',
    description: 'Wood and engineered wood products',
    children: [
      {
        id: 'plywood',
        name: 'Plywood',
        slug: 'plywood',
        status: 'active',
        children: [
          { id: 'marine-plywood', name: 'Marine Plywood', slug: 'marine-plywood', status: 'active', attributeCount: 12 },
          { id: 'commercial-plywood', name: 'Commercial Plywood', slug: 'commercial-plywood', status: 'active', attributeCount: 10 },
        ]
      },
    ]
  },
];

const mockAssignedGroups: AttributeGroup[] = [
  {
    id: 'g1',
    name: 'Physical Properties',
    description: 'Dimensional and physical characteristics',
    attributeCount: 8,
    sectionCount: 2,
    sections: [
      {
        id: 's1',
        name: 'Dimensions',
        attributes: [
          {
            id: 'a1',
            name: 'Length',
            slug: 'length',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a2',
            name: 'Width',
            slug: 'width',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a3',
            name: 'Height',
            slug: 'height',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      },
      {
        id: 's2',
        name: 'Weight',
        attributes: [
          {
            id: 'a4',
            name: 'Weight',
            slug: 'weight',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      }
    ],
    selected: true,
    expanded: true
  },
  {
    id: 'g2',
    name: 'Visual Properties',
    description: 'Aesthetic and appearance attributes',
    attributeCount: 5,
    sectionCount: 2,
    sections: [
      {
        id: 's3',
        name: 'Color',
        attributes: [
          {
            id: 'a5',
            name: 'Color',
            slug: 'color',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      },
      {
        id: 's4',
        name: 'Texture',
        attributes: [
          {
            id: 'a6',
            name: 'Texture',
            slug: 'texture',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      }
    ],
    selected: true,
    expanded: true
  },
  {
    id: 'g3',
    name: 'Performance Metrics',
    description: 'Performance and quality indicators',
    attributeCount: 6,
    sectionCount: 1,
    sections: [
      {
        id: 's5',
        name: 'Performance',
        attributes: [
          {
            id: 'a7',
            name: 'Durability',
            slug: 'durability',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a8',
            name: 'Strength',
            slug: 'strength',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a9',
            name: 'Resistance',
            slug: 'resistance',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      }
    ],
    selected: true,
    expanded: true
  },
  {
    id: 'g4',
    name: 'Certifications',
    description: 'Compliance and certification data',
    attributeCount: 4,
    sectionCount: 1,
    sections: [
      {
        id: 's6',
        name: 'Certifications',
        attributes: [
          {
            id: 'a10',
            name: 'ISO',
            slug: 'iso',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a11',
            name: 'CE',
            slug: 'ce',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          },
          {
            id: 'a12',
            name: 'FSC',
            slug: 'fsc',
            filterable: true,
            variantDefining: true,
            required: true,
            searchable: true,
            selected: true
          }
        ],
        selected: true
      }
    ],
    selected: true,
    expanded: true
  }
];

export function ProductCategoriesView() {
  const [categories] = useState<Category[]>(mockCategories);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['flooring', 'tiles', 'stone', 'wood', 'plywood']));
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Dialogs
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  
  // Create category form
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParent, setNewCategoryParent] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  
  // Assigned groups
  const [assignedGroups, setAssignedGroups] = useState<AttributeGroup[]>(mockAssignedGroups);

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleGroupExpansion = (groupId: string) => {
    setAssignedGroups(assignedGroups.map(group => 
      group.id === groupId ? { ...group, expanded: !group.expanded } : group
    ));
  };

  const toggleGroupSelection = (groupId: string) => {
    setAssignedGroups(assignedGroups.map(group => {
      if (group.id === groupId) {
        const newSelected = !group.selected;
        return {
          ...group,
          selected: newSelected,
          sections: group.sections.map(section => ({
            ...section,
            selected: newSelected,
            attributes: section.attributes.map(attr => ({
              ...attr,
              selected: newSelected
            }))
          }))
        };
      }
      return group;
    }));
  };

  const toggleSectionSelection = (groupId: string, sectionId: string) => {
    setAssignedGroups(assignedGroups.map(group => {
      if (group.id === groupId) {
        const newSections = group.sections.map(section => {
          if (section.id === sectionId) {
            const newSelected = !section.selected;
            return {
              ...section,
              selected: newSelected,
              attributes: section.attributes.map(attr => ({
                ...attr,
                selected: newSelected
              }))
            };
          }
          return section;
        });
        
        // Update group selection based on sections
        const allSectionsSelected = newSections.every(s => s.selected);
        
        return {
          ...group,
          sections: newSections,
          selected: allSectionsSelected
        };
      }
      return group;
    }));
  };

  const toggleAttributeSelection = (groupId: string, sectionId: string, attributeId: string) => {
    setAssignedGroups(assignedGroups.map(group => {
      if (group.id === groupId) {
        const newSections = group.sections.map(section => {
          if (section.id === sectionId) {
            const newAttributes = section.attributes.map(attr =>
              attr.id === attributeId ? { ...attr, selected: !attr.selected } : attr
            );
            
            // Update section selection based on attributes
            const allAttributesSelected = newAttributes.every(a => a.selected);
            
            return {
              ...section,
              attributes: newAttributes,
              selected: allAttributesSelected
            };
          }
          return section;
        });
        
        // Update group selection based on sections
        const allSectionsSelected = newSections.every(s => s.selected);
        
        return {
          ...group,
          sections: newSections,
          selected: allSectionsSelected
        };
      }
      return group;
    }));
  };

  const getTotalAttributes = () => {
    return assignedGroups.reduce((total, group) => total + group.attributeCount, 0);
  };

  const getFilterableCount = () => {
    return 12; // Mock data
  };

  const getVariantCount = () => {
    return 3; // Mock data
  };

  const getTotalSections = () => {
    return assignedGroups.reduce((total, group) => total + group.sectionCount, 0);
  };

  const renderCategoryNode = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedNodes.has(category.id);
    const isSelected = selectedCategory?.id === category.id;
    const isHovered = hoveredNode === category.id;
    const matchesSearch = searchQuery === '' || category.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch && searchQuery !== '') return null;

    return (
      <div key={category.id}>
        <div
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all relative ${
            isSelected 
              ? 'bg-[#FF6A3D]/5 border-l-2 border-[#FF6A3D] text-[#FF6A3D]' 
              : 'hover:bg-gray-50 text-[#344054]'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => setSelectedCategory(category)}
          onMouseEnter={() => setHoveredNode(category.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(category.id);
              }}
              className="shrink-0 p-0.5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          <FolderTree className="w-4 h-4 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[14px] font-normal truncate block">{category.name}</span>
            {category.attributeCount && (
              <p className="text-[11px] text-[#667085]">{category.attributeCount} attributes</p>
            )}
          </div>
          
          {/* Action buttons on hover */}
          {isHovered && !isSelected && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success('Edit category');
                }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Edit"
              >
                <Edit3 className="w-3 h-3 text-[#667085]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success('Add subcategory');
                }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Add Subcategory"
              >
                <Plus className="w-3 h-3 text-[#667085]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.error('Delete category');
                }}
                className="p-1 hover:bg-red-50 rounded"
                title="Delete"
              >
                <Trash2 className="w-3 h-3 text-red-600" />
              </button>
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {category.children!.map(child => renderCategoryNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col font-['Satoshi'] font-normal bg-gray-50">
      {/* Page Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] text-[#101828] mb-1">Product Categories</h1>
            <p className="text-[14px] text-[#667085]">Manage the full product taxonomy used across the Material Library ecosystem.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-normal">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button 
              onClick={() => setIsCreateCategoryOpen(true)}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>
      </div>

      {/* 2 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - Category Tree */}
        <div className="w-[340px] bg-white border-r border-gray-100 flex flex-col shrink-0">
          {/* Search */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              />
            </div>
          </div>

          {/* Tree View */}
          <div className="flex-1 overflow-auto px-3 py-4 custom-scrollbar">
            {categories.map(category => renderCategoryNode(category))}
          </div>
        </div>

        {/* RIGHT PANEL - Category Details */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-auto">
          {selectedCategory ? (
            <div className="p-8 space-y-6">
              {/* Category Details Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-[16px] text-[#101828] font-normal mb-5">Category Details</h3>
                
                <div className="space-y-4">
                  {/* Category Name */}
                  <div>
                    <Label className="text-[13px] text-[#344054] font-normal">Category Name</Label>
                    <Input
                      value={selectedCategory.name}
                      className="mt-1.5 font-normal"
                    />
                  </div>

                  {/* Parent Category */}
                  <div>
                    <Label className="text-[13px] text-[#344054] font-normal">Parent Category</Label>
                    <select
                      className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
                    >
                      <option value="">None (Top Level)</option>
                      <option value="flooring">Flooring</option>
                      <option value="tiles">Tiles</option>
                      <option value="stone">Stone</option>
                    </select>
                  </div>

                  {/* Slug / URL Key */}
                  <div>
                    <Label className="text-[13px] text-[#344054] font-normal">Slug / URL Key</Label>
                    <Input
                      value={selectedCategory.slug || ''}
                      className="mt-1.5 font-normal bg-gray-50"
                      readOnly
                    />
                    <p className="text-[11px] text-[#667085] mt-1">Auto-generated from category name</p>
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <Label className="text-[13px] text-[#344054] font-normal mb-2 block">Status</Label>
                    <div className="flex items-center gap-3">
                      <button
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          selectedCategory.status === 'active' ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            selectedCategory.status === 'active' ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                      <span className="text-[13px] text-[#344054]">
                        {selectedCategory.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Image Card */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-[16px] text-[#101828] font-normal mb-4">Category Image</h3>
                <div className="flex items-start gap-4">
                  <div className="w-[120px] h-[120px] border-2 border-dashed border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center group relative">
                    {selectedCategory.image ? (
                      <>
                        <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="text-white text-[12px]">Change</button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-[11px] text-[#667085]">No image</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Button variant="outline" size="sm" className="font-normal">
                        <Upload className="w-3.5 h-3.5 mr-1.5" />
                        {selectedCategory.image ? 'Replace Image' : 'Upload Image'}
                      </Button>
                      {selectedCategory.image && (
                        <Button variant="outline" size="sm" className="font-normal text-red-600 hover:text-red-700">
                          <X className="w-3.5 h-3.5 mr-1.5" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] text-[#667085]"><strong>Recommended:</strong> 512 × 512px</p>
                      <p className="text-[11px] text-[#667085]">JPG, PNG, WEBP • Max 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Description */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-[16px] text-[#101828] font-normal mb-2">Category Description</h3>
                <p className="text-[12px] text-[#667085] mb-3">Used for search, catalog display, and SEO context.</p>
                <Textarea
                  value={selectedCategory.description || ''}
                  placeholder="Enter category description..."
                  className="min-h-[120px] font-normal"
                />
              </div>

              {/* Attribute Overview Cards */}
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Attributes Assigned</p>
                  <p className="text-[28px] text-[#101828] font-normal">{getTotalAttributes()}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Attribute Groups</p>
                  <p className="text-[28px] text-[#101828] font-normal">{assignedGroups.length}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Filterable</p>
                  <p className="text-[28px] text-blue-600 font-normal">{getFilterableCount()}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Variant</p>
                  <p className="text-[28px] text-[#FF6A3D] font-normal">{getVariantCount()}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Sections</p>
                  <p className="text-[28px] text-purple-600 font-normal">{getTotalSections()}</p>
                </div>
              </div>

              {/* Attribute Groups Section */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-[16px] text-[#101828] font-normal mb-1">Category Attributes Configuration</h3>
                    <p className="text-[13px] text-[#667085]">Configure which attributes apply to this category by selecting groups, sections, or individual attributes.</p>
                  </div>
                  <Button 
                    onClick={() => setIsAddGroupOpen(true)}
                    size="sm"
                    className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Attribute Group
                  </Button>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {assignedGroups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      {/* Group Header */}
                      <div className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={group.selected}
                          onChange={() => toggleGroupSelection(group.id)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] text-[#101828] font-normal mb-1">{group.name}</h4>
                          <p className="text-[12px] text-[#667085] mb-2">{group.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#667085]">
                              {group.sectionCount} Sections • {group.attributeCount} Attributes
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleGroupExpansion(group.id)}
                            className="p-1.5 text-[#667085] hover:text-[#FF6A3D] hover:bg-[#FF6A3D]/5 rounded transition-colors"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${group.expanded ? '' : '-rotate-90'}`} />
                          </button>
                          <button
                            onClick={() => {
                              setAssignedGroups(assignedGroups.filter(g => g.id !== group.id));
                              toast.success('Attribute group removed');
                            }}
                            className="p-1.5 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove Group"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Sections */}
                      {group.expanded && (
                        <div className="p-4 space-y-3 bg-white">
                          {group.sections.map((section, sectionIdx) => (
                            <div key={section.id}>
                              {sectionIdx > 0 && <div className="border-t border-gray-100 -mx-4 mb-3" />}
                              
                              {/* Section Header */}
                              <div className="flex items-start gap-3" style={{ paddingLeft: '16px' }}>
                                <input
                                  type="checkbox"
                                  checked={section.selected}
                                  onChange={() => toggleSectionSelection(group.id, section.id)}
                                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[14px] text-[#101828] font-normal">{section.name}</span>
                                    <span className="text-[11px] text-[#667085]">({section.attributes.length} attributes)</span>
                                  </div>

                                  {/* Attributes */}
                                  <div className="space-y-2">
                                    {section.attributes.map((attr) => (
                                      <div 
                                        key={attr.id} 
                                        className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
                                        style={{ marginLeft: '16px' }}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={attr.selected}
                                          onChange={() => toggleAttributeSelection(group.id, section.id, attr.id)}
                                          className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                                        />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[13px] text-[#101828]">{attr.name}</span>
                                          </div>
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-[10px] text-[#667085]">Slug: {attr.slug}</span>
                                            {attr.filterable && (
                                              <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                                                Filterable
                                              </span>
                                            )}
                                            {attr.variantDefining && (
                                              <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded border border-orange-200">
                                                Variant
                                              </span>
                                            )}
                                            {attr.required && (
                                              <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-700 rounded border border-red-200">
                                                Required
                                              </span>
                                            )}
                                            {attr.searchable && (
                                              <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
                                                Searchable
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="font-normal">
                  Cancel
                </Button>
                <Button 
                  onClick={() => toast.success('Category saved successfully')}
                  className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <FolderTree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-[18px] text-[#101828] mb-2">Select a Category</h3>
                <p className="text-[14px] text-[#667085]">
                  Choose a category from the tree to view and edit its details, upload images, and manage attribute groups.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Category Modal */}
      <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Category Name</Label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Ceramic Tiles"
                className="mt-1.5 font-normal"
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Parent Category</Label>
              <select
                value={newCategoryParent}
                onChange={(e) => setNewCategoryParent(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              >
                <option value="">None (Top level)</option>
                <option value="flooring">Flooring</option>
                <option value="tiles">Tiles</option>
                <option value="stone">Stone</option>
              </select>
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Description</Label>
              <Textarea
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Enter category description..."
                className="mt-1.5 font-normal min-h-[80px]"
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Upload Image</Label>
              <div className="mt-1.5 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#FF6A3D]/50 transition-colors cursor-pointer">
                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-[13px] text-[#667085] mb-1">Click to upload or drag and drop</p>
                <p className="text-[11px] text-[#667085]">Recommended: 512 × 512px • JPG, PNG, WEBP • Max 5MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateCategoryOpen(false)} className="font-normal">
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast.success('Category created successfully');
                setIsCreateCategoryOpen(false);
                setNewCategoryName('');
                setNewCategoryParent('');
                setNewCategoryDescription('');
              }}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Save Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Attribute Group Modal */}
      <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
        <DialogContent className="sm:max-w-[600px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add Attribute Group</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Select attribute groups to assign to this category.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[13px] text-[#667085] mb-3">Available attribute groups:</p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {mockAssignedGroups.map((group) => {
                const isAssigned = assignedGroups.find(g => g.id === group.id);
                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      if (!isAssigned) {
                        setAssignedGroups([...assignedGroups, group]);
                        toast.success(`${group.name} added`);
                      }
                    }}
                    disabled={!!isAssigned}
                    className={`w-full text-left p-4 border rounded-lg transition-colors ${
                      isAssigned 
                        ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                        : 'border-gray-200 hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-[14px] text-[#101828] font-normal mb-1">{group.name}</h4>
                        <p className="text-[12px] text-[#667085] mb-2">{group.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                            {group.attributeCount} attributes
                          </span>
                          <span className="text-[11px] px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
                            {group.sectionCount} sections
                          </span>
                        </div>
                      </div>
                      {isAssigned && (
                        <span className="text-[11px] px-2 py-1 bg-green-100 text-green-700 rounded">Assigned</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddGroupOpen(false)}
              className="font-normal"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}