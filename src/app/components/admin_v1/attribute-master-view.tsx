import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2,
  Tag,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  Layers,
  FolderTree
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

type AttributeType = 'String' | 'Number' | 'Boolean' | 'Enum';

interface Attribute {
  id: string;
  name: string;
  type: AttributeType;
  filterable: boolean;
  variantDefining: boolean;
  status: 'Active' | 'Inactive';
}

interface Section {
  id: string;
  name: string;
  description?: string;
  attributes: Attribute[];
}

interface ParentGroup {
  id: string;
  name: string;
  sections: Section[];
}

// Mock data with hierarchical structure
const mockParentGroups: ParentGroup[] = [
  {
    id: 'technical',
    name: 'Technical',
    sections: [
      {
        id: 'physical-props',
        name: 'Physical Properties',
        description: 'Weight, density, moisture content',
        attributes: [
          { id: 'a1', name: 'Material Density', type: 'Number', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a2', name: 'Water Absorption', type: 'Number', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a3', name: 'Bulk Density', type: 'Number', filterable: false, variantDefining: false, status: 'Active' },
        ]
      },
      {
        id: 'performance',
        name: 'Performance Metrics',
        description: 'Strength, durability, and performance indicators',
        attributes: [
          { id: 'a4', name: 'Compressive Strength', type: 'Number', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a5', name: 'Flexural Strength', type: 'Number', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a6', name: 'Tensile Strength', type: 'Number', filterable: false, variantDefining: false, status: 'Active' },
        ]
      },
    ]
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    sections: [
      {
        id: 'visual-props',
        name: 'Visual Properties',
        description: 'Color, finish, and surface appearance',
        attributes: [
          { id: 'a7', name: 'Color', type: 'String', filterable: true, variantDefining: true, status: 'Active' },
          { id: 'a8', name: 'Finish Type', type: 'Enum', filterable: true, variantDefining: true, status: 'Active' },
          { id: 'a9', name: 'Texture Pattern', type: 'String', filterable: true, variantDefining: false, status: 'Active' },
        ]
      },
    ]
  },
  {
    id: 'quality',
    name: 'Quality',
    sections: [
      {
        id: 'certifications',
        name: 'Certifications',
        description: 'Standards compliance and certifications',
        attributes: [
          { id: 'a10', name: 'ISI Certified', type: 'Boolean', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a11', name: 'ISO Certified', type: 'Boolean', filterable: true, variantDefining: false, status: 'Active' },
          { id: 'a12', name: 'BIS Certified', type: 'Boolean', filterable: true, variantDefining: false, status: 'Active' },
        ]
      },
    ]
  },
];

export function AttributeMasterView() {
  const [parentGroups, setParentGroups] = useState<ParentGroup[]>(mockParentGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['technical', 'aesthetics', 'quality']));
  
  // Dialogs
  const [isAddAttributeDialogOpen, setIsAddAttributeDialogOpen] = useState(false);
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
  
  // Form state
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [newAttrName, setNewAttrName] = useState('');
  const [newAttrType, setNewAttrType] = useState<AttributeType>('String');
  const [newAttrFilterable, setNewAttrFilterable] = useState(false);
  const [newAttrVariantDefining, setNewAttrVariantDefining] = useState(false);
  
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newSectionParentGroup, setNewSectionParentGroup] = useState('');
  
  const [newGroupName, setNewGroupName] = useState('');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleDeleteAttribute = (groupId: string, sectionId: string, attrId: string) => {
    if (confirm('Are you sure you want to delete this attribute?')) {
      setParentGroups(parentGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            sections: group.sections.map(section => {
              if (section.id === sectionId) {
                return {
                  ...section,
                  attributes: section.attributes.filter(attr => attr.id !== attrId)
                };
              }
              return section;
            })
          };
        }
        return group;
      }));
      toast.success('Attribute deleted successfully');
    }
  };

  const handleAddAttribute = () => {
    if (!newAttrName.trim() || !selectedSection) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAttribute: Attribute = {
      id: `a${Date.now()}`,
      name: newAttrName,
      type: newAttrType,
      filterable: newAttrFilterable,
      variantDefining: newAttrVariantDefining,
      status: 'Active'
    };

    setParentGroups(parentGroups.map(group => ({
      ...group,
      sections: group.sections.map(section => {
        if (section.id === selectedSection) {
          return {
            ...section,
            attributes: [...section.attributes, newAttribute]
          };
        }
        return section;
      })
    })));

    toast.success('Attribute created successfully');
    setIsAddAttributeDialogOpen(false);
    resetAttributeForm();
  };

  const handleAddSection = () => {
    if (!newSectionName.trim() || !newSectionParentGroup) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newSection: Section = {
      id: `s${Date.now()}`,
      name: newSectionName,
      description: newSectionDescription,
      attributes: []
    };

    setParentGroups(parentGroups.map(group => {
      if (group.id === newSectionParentGroup) {
        return {
          ...group,
          sections: [...group.sections, newSection]
        };
      }
      return group;
    }));

    toast.success('Section created successfully');
    setIsAddSectionDialogOpen(false);
    resetSectionForm();
  };

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    const newGroup: ParentGroup = {
      id: newGroupName.toLowerCase().replace(/\s+/g, '-'),
      name: newGroupName,
      sections: []
    };

    setParentGroups([...parentGroups, newGroup]);
    toast.success('Parent group created successfully');
    setIsAddGroupDialogOpen(false);
    setNewGroupName('');
  };

  const resetAttributeForm = () => {
    setSelectedSection('');
    setNewAttrName('');
    setNewAttrType('String');
    setNewAttrFilterable(false);
    setNewAttrVariantDefining(false);
  };

  const resetSectionForm = () => {
    setNewSectionName('');
    setNewSectionDescription('');
    setNewSectionParentGroup('');
  };

  // Filter logic
  const filteredGroups = parentGroups.map(group => ({
    ...group,
    sections: group.sections.map(section => ({
      ...section,
      attributes: section.attributes.filter(attr =>
        searchQuery === '' ||
        attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => 
      searchQuery === '' || 
      section.attributes.length > 0 ||
      section.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => 
    searchQuery === '' || 
    group.sections.length > 0 ||
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-expand groups when searching
  if (searchQuery && filteredGroups.length > 0) {
    filteredGroups.forEach(group => {
      if (!expandedGroups.has(group.id)) {
        setExpandedGroups(prev => new Set([...prev, group.id]));
      }
    });
  }

  const getAllSections = () => {
    const sections: { groupId: string; groupName: string; sectionId: string; sectionName: string }[] = [];
    parentGroups.forEach(group => {
      group.sections.forEach(section => {
        sections.push({
          groupId: group.id,
          groupName: group.name,
          sectionId: section.id,
          sectionName: section.name
        });
      });
    });
    return sections;
  };

  return (
    <div className="h-full flex flex-col font-['Satoshi'] font-normal bg-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <h1 className="text-[24px] text-[#101828] mb-1">Attribute Master</h1>
        <p className="text-[14px] text-[#667085]">Manage global attributes organized into groups and sections used across product categories.</p>
      </div>

      {/* Actions Bar */}
      <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
          <input
            type="text"
            placeholder="Search attributes, sections, or groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddGroupDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-[#344054] rounded-lg hover:bg-gray-50 transition-colors text-[14px] font-normal"
          >
            <FolderTree className="w-4 h-4" />
            Add Group
          </button>
          <button
            onClick={() => setIsAddSectionDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-[#344054] rounded-lg hover:bg-gray-50 transition-colors text-[14px] font-normal"
          >
            <Layers className="w-4 h-4" />
            Add Section
          </button>
          <button
            onClick={() => setIsAddAttributeDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#FF6A3D]/90 transition-colors text-[14px] font-normal"
          >
            <Plus className="w-4 h-4" />
            Add Attribute
          </button>
        </div>
      </div>

      {/* Hierarchical Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Attribute Name
                </th>
                <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Section
                </th>
                <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Group
                </th>
                <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Type
                </th>
                <th className="px-4 py-3 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Filterable
                </th>
                <th className="px-4 py-3 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Variant Defining
                </th>
                <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group) => (
                <React.Fragment key={group.id}>
                  {/* Parent Group Header */}
                  <tr className="bg-blue-50/50 border-b border-gray-100">
                    <td colSpan={8} className="px-4 py-3">
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="flex items-center gap-2 text-[15px] text-[#101828] font-normal hover:text-[#FF6A3D] transition-colors w-full"
                      >
                        {expandedGroups.has(group.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <FolderTree className="w-4 h-4 text-blue-600" />
                        <span>{group.name}</span>
                        <span className="text-[12px] text-[#667085] ml-2">
                          ({group.sections.reduce((sum, s) => sum + s.attributes.length, 0)} attributes)
                        </span>
                      </button>
                    </td>
                  </tr>

                  {/* Sections and Attributes */}
                  {expandedGroups.has(group.id) && group.sections.map((section) => (
                    <React.Fragment key={section.id}>
                      {/* Section Header */}
                      <tr className="bg-purple-50/30 border-b border-gray-50">
                        <td colSpan={8} className="px-4 py-2.5 pl-12">
                          <div className="flex items-start gap-2">
                            <Layers className="w-4 h-4 text-purple-600 mt-0.5" />
                            <div>
                              <div className="text-[14px] text-[#101828] font-normal">{section.name}</div>
                              {section.description && (
                                <div className="text-[12px] text-[#667085] mt-0.5">{section.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Attributes */}
                      {section.attributes.map((attr, index) => (
                        <tr 
                          key={attr.id}
                          className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'
                          }`}
                        >
                          <td className="px-4 py-3 pl-20">
                            <div className="flex items-center gap-2">
                              <Tag className="w-3.5 h-3.5 text-[#667085]" />
                              <span className="text-[14px] text-[#101828] font-normal">{attr.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[13px] text-[#667085]">{section.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[13px] text-[#667085]">{group.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-[12px] border font-normal ${
                              attr.type === 'Enum' 
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : attr.type === 'Number'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : attr.type === 'Boolean'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}>
                              {attr.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {attr.filterable ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {attr.variantDefining ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-normal ${
                                attr.status === 'Active'
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200'
                              }`}
                            >
                              {attr.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                className="p-1.5 text-[#667085] hover:text-[#FF6A3D] hover:bg-[#FF6A3D]/5 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAttribute(group.id, section.id, attr.id)}
                                className="p-1.5 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {section.attributes.length === 0 && (
                        <tr className="border-b border-gray-50">
                          <td colSpan={8} className="px-4 py-4 pl-20">
                            <p className="text-[13px] text-[#667085] italic">No attributes in this section</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {filteredGroups.length === 0 && (
            <div className="py-12 text-center">
              <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-[14px] text-[#667085]">No attributes found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Attribute Dialog */}
      <Dialog open={isAddAttributeDialogOpen} onOpenChange={setIsAddAttributeDialogOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add New Attribute</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Create a new global attribute and assign it to a section.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Section *</Label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              >
                <option value="">Select a section</option>
                {getAllSections().map(s => (
                  <option key={s.sectionId} value={s.sectionId}>
                    {s.groupName} → {s.sectionName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Attribute Name *</Label>
              <Input
                placeholder="e.g., Color, Size, Material"
                value={newAttrName}
                onChange={(e) => setNewAttrName(e.target.value)}
                className="mt-1.5 font-normal"
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Data Type *</Label>
              <select 
                value={newAttrType}
                onChange={(e) => setNewAttrType(e.target.value as AttributeType)}
                className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              >
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[13px] text-[#344054]">
                <input
                  type="checkbox"
                  checked={newAttrFilterable}
                  onChange={(e) => setNewAttrFilterable(e.target.checked)}
                  className="rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                />
                <span className="font-normal">Filterable</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-[#344054]">
                <input
                  type="checkbox"
                  checked={newAttrVariantDefining}
                  onChange={(e) => setNewAttrVariantDefining(e.target.checked)}
                  className="rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                />
                <span className="font-normal">Variant Defining</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddAttributeDialogOpen(false);
                resetAttributeForm();
              }}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAttribute}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Create Attribute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Section Dialog */}
      <Dialog open={isAddSectionDialogOpen} onOpenChange={setIsAddSectionDialogOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add New Section</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Create a new section within a parent group.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Parent Group *</Label>
              <select
                value={newSectionParentGroup}
                onChange={(e) => setNewSectionParentGroup(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              >
                <option value="">Select a parent group</option>
                {parentGroups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Section Name *</Label>
              <Input
                placeholder="e.g., Thermal Properties"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="mt-1.5 font-normal"
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Description (Optional)</Label>
              <Textarea
                placeholder="Thermal expansion and heat resistance properties"
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                className="mt-1.5 font-normal resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddSectionDialogOpen(false);
                resetSectionForm();
              }}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddSection}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Create Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Parent Group Dialog */}
      <Dialog open={isAddGroupDialogOpen} onOpenChange={setIsAddGroupDialogOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add Parent Group</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Create a new top-level group for organizing sections.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Group Name *</Label>
              <Input
                placeholder="e.g., Technical, Aesthetics, Quality, Installation, Features"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="mt-1.5 font-normal"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddGroupDialogOpen(false);
                setNewGroupName('');
              }}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddGroup}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}