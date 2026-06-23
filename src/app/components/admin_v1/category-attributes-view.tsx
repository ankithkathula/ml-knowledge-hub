import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  FolderTree,
  Plus,
  Layers,
  Tag,
  GripVertical,
  Trash2,
  Edit3,
  XCircle,
  CheckCircle2,
  Lock
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { AddAttributeDialog } from "./add-attribute-dialog";

interface Category {
  id: string;
  name: string;
  children?: Category[];
  attributeCount?: number;
}

interface AttributeDetail {
  name: string;
  type: 'String' | 'Number' | 'Boolean';
  filterable: boolean;
  variantDefining: boolean;
  required: boolean;
  unit?: string;
  inherited: boolean;
  customized: boolean;
}

interface Section {
  id: string;
  name: string;
  attributes: AttributeDetail[];
}

interface AttributeGroup {
  id: string;
  name: string;
  description: string;
  sections: Section[];
}

interface CategoryConfig {
  categoryId: string;
  attributeGroups: AttributeGroup[];
}

// Mock data
const mockCategories: Category[] = [
  {
    id: 'flooring',
    name: 'Flooring',
    children: [
      {
        id: 'tiles',
        name: 'Tiles',
        children: [
          { id: 'ceramic-tiles', name: 'Ceramic Tiles', attributeCount: 28 },
          { id: 'porcelain-tiles', name: 'Porcelain Tiles', attributeCount: 24 },
        ]
      },
    ]
  },
  {
    id: 'stone',
    name: 'Stone',
    children: [
      { id: 'marble', name: 'Marble', attributeCount: 18 },
      { id: 'granite', name: 'Granite', attributeCount: 16 },
    ]
  },
  {
    id: 'wood',
    name: 'Wood',
    children: [
      {
        id: 'plywood',
        name: 'Plywood',
        children: [
          { id: 'marine-plywood', name: 'Marine Plywood', attributeCount: 12 },
          { id: 'commercial-plywood', name: 'Commercial Plywood', attributeCount: 10 },
        ]
      },
    ]
  },
];

const availableGroups: AttributeGroup[] = [
  {
    id: 'g1',
    name: 'Physical Properties',
    description: 'Dimensional and physical characteristics',
    sections: [
      {
        id: 's1',
        name: 'Material Density',
        attributes: [
          { name: 'Density', type: 'Number', filterable: true, variantDefining: false, required: true, unit: 'kg/m³', inherited: true, customized: false },
          { name: 'Water Absorption', type: 'Number', filterable: true, variantDefining: false, required: false, unit: '%', inherited: true, customized: false },
          { name: 'Bulk Density', type: 'Number', filterable: false, variantDefining: false, required: false, unit: 'kg/m³', inherited: true, customized: false }
        ]
      },
      {
        id: 's2',
        name: 'Thermal Properties',
        attributes: [
          { name: 'Thermal Expansion', type: 'Number', filterable: true, variantDefining: false, required: false, unit: '°C⁻¹', inherited: true, customized: false },
          { name: 'Heat Resistance', type: 'Number', filterable: true, variantDefining: false, required: false, unit: '°C', inherited: true, customized: false }
        ]
      }
    ]
  },
  {
    id: 'g2',
    name: 'Visual Properties',
    description: 'Aesthetic and appearance attributes',
    sections: [
      {
        id: 's3',
        name: 'Surface Finish',
        attributes: [
          { name: 'Finish Type', type: 'String', filterable: true, variantDefining: true, required: true, inherited: true, customized: false },
          { name: 'Gloss Level', type: 'String', filterable: true, variantDefining: false, required: false, inherited: true, customized: false }
        ]
      },
      {
        id: 's4',
        name: 'Color',
        attributes: [
          { name: 'Color Family', type: 'String', filterable: true, variantDefining: true, required: false, inherited: true, customized: false },
          { name: 'Color Code', type: 'String', filterable: false, variantDefining: false, required: false, inherited: true, customized: false }
        ]
      }
    ]
  },
  {
    id: 'g3',
    name: 'Performance Metrics',
    description: 'Performance and quality indicators',
    sections: [
      {
        id: 's5',
        name: 'Durability',
        attributes: [
          { name: 'Scratch Resistance', type: 'String', filterable: true, variantDefining: false, required: false, inherited: true, customized: false },
          { name: 'Wear Resistance', type: 'Number', filterable: true, variantDefining: false, required: false, inherited: true, customized: false }
        ]
      }
    ]
  },
  {
    id: 'g4',
    name: 'Certifications',
    description: 'Compliance and certification data',
    sections: [
      {
        id: 's6',
        name: 'Standards Compliance',
        attributes: [
          { name: 'ISO Certified', type: 'Boolean', filterable: true, variantDefining: false, required: false, inherited: true, customized: false },
          { name: 'CE Marking', type: 'Boolean', filterable: true, variantDefining: false, required: false, inherited: true, customized: false }
        ]
      }
    ]
  }
];

// Mock existing attributes from Attribute Master
const mockExistingAttributes = [
  { id: 'attr1', name: 'Compressive Strength', type: 'Number', filterable: true, variantDefining: false, usedInCategories: 12, usedInFamilies: 8 },
  { id: 'attr2', name: 'Tensile Strength', type: 'Number', filterable: true, variantDefining: false, usedInCategories: 10, usedInFamilies: 6 },
  { id: 'attr3', name: 'Surface Treatment', type: 'String', filterable: true, variantDefining: true, usedInCategories: 15, usedInFamilies: 12 },
  { id: 'attr4', name: 'Fire Rating', type: 'String', filterable: true, variantDefining: false, usedInCategories: 8, usedInFamilies: 5 },
  { id: 'attr5', name: 'Eco Certified', type: 'Boolean', filterable: true, variantDefining: false, usedInCategories: 20, usedInFamilies: 15 },
  { id: 'attr6', name: 'Warranty Period', type: 'Number', filterable: false, variantDefining: false, usedInCategories: 18, usedInFamilies: 14 },
  { id: 'attr7', name: 'Installation Date', type: 'String', filterable: false, variantDefining: false, usedInCategories: 5, usedInFamilies: 3 },
  { id: 'attr8', name: 'Slip Resistance', type: 'String', filterable: true, variantDefining: false, usedInCategories: 7, usedInFamilies: 4 },
];

export function CategoryAttributesView() {
  const [categories] = useState<Category[]>(mockCategories);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['flooring', 'tiles', 'stone', 'wood', 'plywood']));
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedAttribute, setSelectedAttribute] = useState<{ attribute: AttributeDetail; groupId: string; sectionId: string } | null>(null);
  const [isAddAttributeDialogOpen, setIsAddAttributeDialogOpen] = useState(false);
  const [addAttributeContext, setAddAttributeContext] = useState<{ groupId: string; sectionId: string } | null>(null);
  const [attributeSearchQuery, setAttributeSearchQuery] = useState('');
  const [selectedExistingAttribute, setSelectedExistingAttribute] = useState<string | null>(null);
  
  // Assigned groups for selected category
  const [categoryConfig, setCategoryConfig] = useState<CategoryConfig>({
    categoryId: 'ceramic-tiles',
    attributeGroups: [
      availableGroups[0], // Physical Properties
      availableGroups[1], // Visual Properties
    ]
  });

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getBreadcrumb = (cat: Category | null): string => {
    if (!cat) return '';
    // Simple breadcrumb for demo
    if (cat.id === 'ceramic-tiles') return 'Flooring / Tiles / Ceramic Tiles';
    if (cat.id === 'porcelain-tiles') return 'Flooring / Tiles / Porcelain Tiles';
    if (cat.id === 'marble') return 'Stone / Marble';
    if (cat.id === 'granite') return 'Stone / Granite';
    return cat.name;
  };

  const getTotalAttributes = () => {
    return categoryConfig.attributeGroups.reduce((total, group) => {
      return total + group.sections.reduce((sectionTotal, section) => {
        return sectionTotal + section.attributes.length;
      }, 0);
    }, 0);
  };

  const getFilterableCount = () => {
    return categoryConfig.attributeGroups.reduce((total, group) => {
      return total + group.sections.reduce((sectionTotal, section) => {
        return sectionTotal + section.attributes.filter(a => a.filterable).length;
      }, 0);
    }, 0);
  };

  const getVariantCount = () => {
    return categoryConfig.attributeGroups.reduce((total, group) => {
      return total + group.sections.reduce((sectionTotal, section) => {
        return sectionTotal + section.attributes.filter(a => a.variantDefining).length;
      }, 0);
    }, 0);
  };

  const removeGroup = (groupId: string) => {
    setCategoryConfig({
      ...categoryConfig,
      attributeGroups: categoryConfig.attributeGroups.filter(g => g.id !== groupId)
    });
    toast.success('Attribute group removed from category');
  };

  const addAttributeGroup = (groupId: string) => {
    const group = availableGroups.find(g => g.id === groupId);
    if (group && !categoryConfig.attributeGroups.find(g => g.id === groupId)) {
      setCategoryConfig({
        ...categoryConfig,
        attributeGroups: [...categoryConfig.attributeGroups, group]
      });
      toast.success('Attribute group added to category');
      setIsAddGroupDialogOpen(false);
    }
  };

  const renderCategoryNode = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedNodes.has(category.id);
    const isSelected = selectedCategory?.id === category.id;
    const matchesSearch = searchQuery === '' || category.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch && searchQuery !== '') return null;

    return (
      <div key={category.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
            isSelected 
              ? 'bg-[#FF7A59]/5 border-l-2 border-[#FF7A59] text-[#FF7A59]' 
              : 'hover:bg-gray-50 text-[#344054]'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => setSelectedCategory(category)}
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
          <div className="flex-1">
            <span className="text-[14px] font-normal">{category.name}</span>
            {category.attributeCount && (
              <p className="text-[11px] text-[#667085]">{category.attributeCount} attributes</p>
            )}
          </div>
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
    <div className="h-full flex font-['Satoshi'] font-normal bg-gray-50">
      {/* Left Panel - Category Tree */}
      <div className="w-[320px] bg-white border-r border-gray-100 flex flex-col shrink-0">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-[16px] text-[#101828] font-normal mb-1">Categories</h2>
          <p className="text-[13px] text-[#667085]">Select a category to configure</p>
        </div>

        {/* Search */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59] font-normal"
            />
          </div>
        </div>

        {/* Tree View */}
        <div className="flex-1 overflow-auto px-3 py-4">
          {categories.map(category => renderCategoryNode(category))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100">
          <h1 className="text-[24px] text-[#101828] mb-1">Category Attributes</h1>
          <p className="text-[14px] text-[#667085]">Configure attribute groups and attributes for each product category.</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {selectedCategory ? (
            <div className="px-8 py-6 space-y-6">
              {/* Breadcrumb & Title */}
              <div>
                <p className="text-[12px] text-[#667085] mb-2">{getBreadcrumb(selectedCategory)}</p>
                <h2 className="text-[20px] text-[#101828] mb-1">{selectedCategory.name}</h2>
                <p className="text-[13px] text-[#667085]">Manage attribute groups and attributes for this category.</p>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Total Groups</p>
                  <p className="text-[24px] text-[#101828]">{categoryConfig.attributeGroups.length}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Total Attributes</p>
                  <p className="text-[24px] text-[#101828]">{getTotalAttributes()}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Filterable</p>
                  <p className="text-[24px] text-blue-600">{getFilterableCount()}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1">Variant Attributes</p>
                  <p className="text-[24px] text-[#FF7A59]">{getVariantCount()}</p>
                </div>
              </div>

              {/* Attribute Groups Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] text-[#101828]">Assigned Attribute Groups</h3>
                  <button
                    onClick={() => setIsAddGroupDialogOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-[14px] font-normal"
                  >
                    <Plus className="w-4 h-4" />
                    Add Attribute Group
                  </button>
                </div>

                {categoryConfig.attributeGroups.length > 0 ? (
                  <div className="space-y-4">
                    {categoryConfig.attributeGroups.map((group) => (
                      <div key={group.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                        {/* Group Header */}
                        <div className="px-6 py-4 border-b border-gray-100">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Layers className="w-5 h-5 text-[#667085] mt-0.5" />
                              <div className="flex-1">
                                <h4 className="text-[15px] text-[#101828] mb-1">{group.name}</h4>
                                <p className="text-[13px] text-[#667085] mb-3">{group.description}</p>
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] border border-blue-200">
                                    <Tag className="w-3 h-3" />
                                    {group.sections.reduce((total, s) => total + s.attributes.length, 0)} attributes
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[11px] border border-purple-200">
                                    <Layers className="w-3 h-3" />
                                    {group.sections.length} sections
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleGroup(group.id)}
                                className="p-1.5 text-[#667085] hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 rounded transition-colors"
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedGroups.has(group.id) ? '' : '-rotate-90'}`} />
                              </button>
                              <button
                                onClick={() => removeGroup(group.id)}
                                className="p-1.5 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Remove Group"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Sections */}
                        {expandedGroups.has(group.id) && (
                          <div className="px-6 py-4 space-y-3 bg-gray-50/50">
                            {group.sections.map((section) => (
                              <div key={section.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                                {/* Section Header */}
                                <div
                                  className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                  <div 
                                    className="flex items-center gap-2 flex-1 cursor-pointer"
                                    onClick={() => toggleSection(section.id)}
                                  >
                                    <ChevronRight className={`w-4 h-4 text-[#667085] transition-transform ${expandedSections.has(section.id) ? 'rotate-90' : ''}`} />
                                    <span className="text-[14px] text-[#101828] font-normal">{section.name}</span>
                                    <span className="text-[12px] text-[#667085]">({section.attributes.length} attributes)</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAddAttributeContext({ groupId: group.id, sectionId: section.id });
                                      setIsAddAttributeDialogOpen(true);
                                    }}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] bg-[#FF7A59] text-white rounded hover:bg-[#FF7A59]/90 transition-colors font-normal"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Attribute
                                  </button>
                                </div>

                                {/* Attribute Table */}
                                {expandedSections.has(section.id) && (
                                  <div className="overflow-x-auto">
                                    <table className="w-full">
                                      <thead className="bg-gray-50 border-t border-b border-gray-100">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Attribute</th>
                                          <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Data Type</th>
                                          <th className="px-4 py-2 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Filterable</th>
                                          <th className="px-4 py-2 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Variant</th>
                                          <th className="px-4 py-2 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Required</th>
                                          <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Unit</th>
                                          <th className="px-4 py-2 text-right text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {section.attributes.map((attr, idx) => (
                                          <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3">
                                              <div className="flex items-center gap-2">
                                                <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-move" />
                                                <span className="text-[13px] text-[#101828]">{attr.name}</span>
                                                {attr.inherited && !attr.customized && (
                                                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Inherited</span>
                                                )}
                                                {attr.customized && (
                                                  <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded">Customized</span>
                                                )}
                                              </div>
                                            </td>
                                            <td className="px-4 py-3">
                                              <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px]">
                                                {attr.type}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                              {attr.filterable ? (
                                                <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" />
                                              ) : (
                                                <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                                              )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                              {attr.variantDefining ? (
                                                <CheckCircle2 className="w-4 h-4 text-[#FF7A59] mx-auto" />
                                              ) : (
                                                <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                                              )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                              {attr.required ? (
                                                <CheckCircle2 className="w-4 h-4 text-red-600 mx-auto" />
                                              ) : (
                                                <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                                              )}
                                            </td>
                                            <td className="px-4 py-3">
                                              <span className="text-[12px] text-[#667085]">{attr.unit || '-'}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                              <div className="flex items-center justify-end gap-1">
                                                <button
                                                  onClick={() => setSelectedAttribute({ attribute: attr, groupId: group.id, sectionId: section.id })}
                                                  className="p-1 text-[#667085] hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 rounded transition-colors"
                                                  title="Edit"
                                                >
                                                  <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                  className="p-1 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  title="Remove"
                                                >
                                                  <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-100 rounded-lg py-12 text-center">
                    <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-[14px] text-[#667085] mb-4">No attribute groups assigned</p>
                    <button
                      onClick={() => setIsAddGroupDialogOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-[14px] font-normal"
                    >
                      <Plus className="w-4 h-4" />
                      Add Attribute Group
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <FolderTree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-[18px] text-[#101828] mb-2">Select a Category</h3>
                <p className="text-[14px] text-[#667085]">
                  Choose a category from the tree to configure its attribute groups and attributes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Attribute Group Dialog */}
      <Dialog open={isAddGroupDialogOpen} onOpenChange={setIsAddGroupDialogOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add Attribute Group to Category</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Select an attribute group to add to this category. All sections and attributes will be imported.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="group-select" className="text-[13px] text-[#344054] font-normal">Select Attribute Group</Label>
            <div className="mt-2 space-y-2">
              {availableGroups.map((group) => {
                const isAssigned = categoryConfig.attributeGroups.find(g => g.id === group.id);
                return (
                  <button
                    key={group.id}
                    onClick={() => !isAssigned && addAttributeGroup(group.id)}
                    disabled={!!isAssigned}
                    className={`w-full text-left p-4 border rounded-lg transition-colors ${
                      isAssigned 
                        ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                        : 'border-gray-200 hover:border-[#FF7A59] hover:bg-[#FF7A59]/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-[#667085] mt-0.5" />
                      <div className="flex-1">
                        <p className="text-[14px] text-[#101828] mb-1">{group.name}</p>
                        <p className="text-[12px] text-[#667085] mb-2">{group.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#667085]">{group.sections.length} sections</span>
                          <span className="text-[11px] text-[#667085]">•</span>
                          <span className="text-[11px] text-[#667085]">
                            {group.sections.reduce((total, s) => total + s.attributes.length, 0)} attributes
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
              onClick={() => setIsAddGroupDialogOpen(false)}
              className="font-normal"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attribute Settings Drawer */}
      {selectedAttribute && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white border-l border-gray-100 shadow-xl z-50 flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[18px] text-[#101828] font-normal">Attribute Settings</h2>
              <button
                onClick={() => setSelectedAttribute(null)}
                className="text-[#667085] hover:text-[#101828] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[13px] text-[#667085]">Configure attribute properties</p>
          </div>

          <div className="flex-1 overflow-auto px-6 py-5 space-y-5">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Attribute Name</Label>
              <Input 
                value={selectedAttribute.attribute.name} 
                className="mt-1.5 font-normal" 
              />
            </div>

            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Data Type</Label>
              <select className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59] font-normal">
                <option>{selectedAttribute.attribute.type}</option>
              </select>
            </div>

            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Unit (Optional)</Label>
              <Input 
                value={selectedAttribute.attribute.unit || ''} 
                placeholder="e.g., kg/m³, mm, sqm"
                className="mt-1.5 font-normal" 
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-[#101828] font-normal">Filterable</p>
                  <p className="text-[11px] text-[#667085]">Show in product filters</p>
                </div>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    selectedAttribute.attribute.filterable ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      selectedAttribute.attribute.filterable ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-[#101828] font-normal">Variant Defining</p>
                  <p className="text-[11px] text-[#667085]">Creates product variants</p>
                </div>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    selectedAttribute.attribute.variantDefining ? 'bg-[#FF7A59]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      selectedAttribute.attribute.variantDefining ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-[#101828] font-normal">Required</p>
                  <p className="text-[11px] text-[#667085]">Must be filled</p>
                </div>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    selectedAttribute.attribute.required ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      selectedAttribute.attribute.required ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedAttribute(null)}
              className="flex-1 font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast.success('Attribute settings saved');
                setSelectedAttribute(null);
              }}
              className="flex-1 bg-[#FF7A59] hover:bg-[#FF7A59]/90 font-normal"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Add Attribute Dialog */}
      <AddAttributeDialog
        open={isAddAttributeDialogOpen}
        onOpenChange={setIsAddAttributeDialogOpen}
        context={addAttributeContext}
        categoryConfig={categoryConfig}
        setCategoryConfig={setCategoryConfig}
      />
    </div>
  );
}