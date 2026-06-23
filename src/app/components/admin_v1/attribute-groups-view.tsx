import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2,
  Layers,
  Tag,
  FolderTree,
  XCircle,
  ChevronDown,
  Save,
  X
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

interface AttributeDetail {
  id: string;
  name: string;
  type: 'String' | 'Number' | 'Boolean';
  filterable: boolean;
  variantDefining: boolean;
}

interface Section {
  id: string;
  name: string;
  description?: string;
  attributes: AttributeDetail[];
}

interface AttributeGroup {
  id: string;
  name: string;
  description?: string;
  sections: Section[];
  usedInCategories: number;
  createdDate: string;
  status: 'Active' | 'Inactive';
}

// Mock available attributes from Attribute Master
const mockAvailableAttributes: AttributeDetail[] = [
  { id: 'a1', name: 'Density', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a2', name: 'Water Absorption', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a3', name: 'Bulk Density', type: 'Number', filterable: false, variantDefining: false },
  { id: 'a4', name: 'Thermal Expansion', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a5', name: 'Heat Resistance', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a6', name: 'Compressive Strength', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a7', name: 'Flexural Strength', type: 'Number', filterable: true, variantDefining: false },
  { id: 'a8', name: 'Finish Type', type: 'String', filterable: true, variantDefining: true },
  { id: 'a9', name: 'Color Family', type: 'String', filterable: true, variantDefining: true },
  { id: 'a10', name: 'Texture Pattern', type: 'String', filterable: true, variantDefining: true },
];

const mockGroups: AttributeGroup[] = [
  { 
    id: '1', 
    name: 'Physical Properties', 
    description: 'Dimensional and physical characteristics',
    sections: [
      {
        id: 's1',
        name: 'Material Density',
        description: 'Density and absorption properties',
        attributes: [
          { id: 'a1', name: 'Density', type: 'Number', filterable: true, variantDefining: false },
          { id: 'a2', name: 'Water Absorption', type: 'Number', filterable: true, variantDefining: false },
        ]
      },
      {
        id: 's2',
        name: 'Thermal Properties',
        attributes: [
          { id: 'a4', name: 'Thermal Expansion', type: 'Number', filterable: true, variantDefining: false },
          { id: 'a5', name: 'Heat Resistance', type: 'Number', filterable: true, variantDefining: false },
        ]
      },
      {
        id: 's3',
        name: 'Structural Properties',
        attributes: [
          { id: 'a6', name: 'Compressive Strength', type: 'Number', filterable: true, variantDefining: false },
          { id: 'a7', name: 'Flexural Strength', type: 'Number', filterable: true, variantDefining: false },
        ]
      }
    ],
    usedInCategories: 12, 
    createdDate: '2024-01-10',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Visual Properties', 
    description: 'Aesthetic and appearance attributes',
    sections: [
      {
        id: 's4',
        name: 'Surface Finish',
        attributes: [
          { id: 'a8', name: 'Finish Type', type: 'String', filterable: true, variantDefining: true },
        ]
      },
      {
        id: 's5',
        name: 'Color',
        attributes: [
          { id: 'a9', name: 'Color Family', type: 'String', filterable: true, variantDefining: true },
        ]
      },
      {
        id: 's6',
        name: 'Texture',
        attributes: [
          { id: 'a10', name: 'Texture Pattern', type: 'String', filterable: true, variantDefining: true },
        ]
      }
    ],
    usedInCategories: 15, 
    createdDate: '2024-01-20',
    status: 'Active'
  },
];

export function AttributeGroupsView() {
  const [groups, setGroups] = useState<AttributeGroup[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Edit drawer state
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<AttributeGroup | null>(null);
  
  // Section editing
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<Set<string>>(new Set());

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (group: AttributeGroup) => {
    if (group.usedInCategories > 0) {
      if (confirm(`This attribute group is currently used in ${group.usedInCategories} categories. Removing it may affect category configurations. Continue?`)) {
        setGroups(groups.filter(g => g.id !== group.id));
        toast.success('Attribute group deleted successfully');
      }
    } else {
      if (confirm('Are you sure you want to delete this attribute group?')) {
        setGroups(groups.filter(g => g.id !== group.id));
        toast.success('Attribute group deleted successfully');
      }
    }
  };

  const handleEdit = (group: AttributeGroup) => {
    setEditingGroup(JSON.parse(JSON.stringify(group))); // Deep clone
    setIsEditDrawerOpen(true);
  };

  const handleSaveGroup = () => {
    if (editingGroup) {
      setGroups(groups.map(g => g.id === editingGroup.id ? editingGroup : g));
      toast.success('Attribute group updated successfully');
      setIsEditDrawerOpen(false);
      setEditingGroup(null);
    }
  };

  const handleAddSection = () => {
    if (!editingGroup || !newSectionName.trim()) return;
    
    const newSection: Section = {
      id: `s${Date.now()}`,
      name: newSectionName,
      description: newSectionDescription,
      attributes: mockAvailableAttributes.filter(attr => selectedAttributes.has(attr.id))
    };
    
    setEditingGroup({
      ...editingGroup,
      sections: [...editingGroup.sections, newSection]
    });
    
    setNewSectionName('');
    setNewSectionDescription('');
    setSelectedAttributes(new Set());
    setIsAddSectionDialogOpen(false);
    toast.success('Section added successfully');
  };

  const handleRemoveSection = (sectionId: string) => {
    if (!editingGroup) return;
    setEditingGroup({
      ...editingGroup,
      sections: editingGroup.sections.filter(s => s.id !== sectionId)
    });
    toast.success('Section removed');
  };

  const getTotalAttributes = (group: AttributeGroup) => {
    return group.sections.reduce((total, section) => total + section.attributes.length, 0);
  };

  const toggleAttributeSelection = (attrId: string) => {
    const newSelected = new Set(selectedAttributes);
    if (newSelected.has(attrId)) {
      newSelected.delete(attrId);
    } else {
      newSelected.add(attrId);
    }
    setSelectedAttributes(newSelected);
  };

  return (
    <div className="h-full flex font-['Satoshi'] font-normal bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-[24px] text-[#101828] mb-1">Attribute Grouping</h1>
          <p className="text-[14px] text-[#667085]">Organize attributes into reusable groups and sections for use across product categories.</p>
        </div>

        {/* Actions Bar */}
        <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search attribute groups…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
            />
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#FF6A3D]/90 transition-colors text-[14px] font-normal"
          >
            <Plus className="w-4 h-4" />
            Add Group
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                    Group Name
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                    Sections
                  </th>
                  <th className="px-4 py-3 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                    Attributes Count
                  </th>
                  <th className="px-4 py-3 text-center text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                    Used In Categories
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#667085] uppercase tracking-[0.05em] font-normal">
                    Created
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
                {filteredGroups.map((group, index) => (
                  <tr 
                    key={group.id}
                    className={`border-b border-gray-50 hover:bg-[#FF6A3D]/5 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Layers className="w-4 h-4 text-[#667085]" />
                          <span className="text-[14px] text-[#101828] font-normal">{group.name}</span>
                        </div>
                        {group.description && (
                          <p className="text-[12px] text-[#667085] ml-6">{group.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {group.sections.slice(0, 3).map((section, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[11px] border border-purple-200 font-normal"
                            title={`${section.attributes.length} attributes`}
                          >
                            {section.name}
                          </span>
                        ))}
                        {group.sections.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[11px] border border-purple-200 font-normal">
                            +{group.sections.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="text-[13px] font-normal">{getTotalAttributes(group)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md">
                        <FolderTree className="w-3.5 h-3.5" />
                        <span className="text-[13px] font-normal">{group.usedInCategories}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[13px] text-[#667085]">
                        {new Date(group.createdDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-[12px] font-normal ${
                          group.status === 'Active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {group.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(group)}
                          className="p-1.5 text-[#667085] hover:text-[#FF6A3D] hover:bg-[#FF6A3D]/5 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(group)}
                          className="p-1.5 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredGroups.length === 0 && (
              <div className="py-12 text-center">
                <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-[14px] text-[#667085]">No attribute groups found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Drawer */}
      {isEditDrawerOpen && editingGroup && (
        <div className="w-[480px] bg-white border-l border-gray-100 flex flex-col shrink-0">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[18px] text-[#101828] font-normal">Edit Attribute Group</h2>
              <button
                onClick={() => setIsEditDrawerOpen(false)}
                className="text-[#667085] hover:text-[#101828] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[13px] text-[#667085]">Manage group details and sections</p>
          </div>

          <div className="flex-1 overflow-auto px-6 py-5 space-y-5">
            {/* Group Details */}
            <div>
              <h3 className="text-[13px] text-[#344054] mb-3 uppercase tracking-[0.05em]">Group Details</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-[12px] text-[#667085] block mb-1.5">Group Name</Label>
                  <Input
                    value={editingGroup.name}
                    onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                    className="font-normal"
                  />
                </div>
                <div>
                  <Label className="text-[12px] text-[#667085] block mb-1.5">Description</Label>
                  <Textarea
                    value={editingGroup.description || ''}
                    onChange={(e) => setEditingGroup({ ...editingGroup, description: e.target.value })}
                    className="font-normal resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] text-[#344054] uppercase tracking-[0.05em]">Sections ({editingGroup.sections.length})</h3>
                <button
                  onClick={() => setIsAddSectionDialogOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#FF6A3D]/90 transition-colors text-[12px] font-normal"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Section
                </button>
              </div>

              <div className="space-y-2">
                {editingGroup.sections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:border-[#FF6A3D]/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-[14px] text-[#101828] font-normal mb-1">{section.name}</h4>
                        {section.description && (
                          <p className="text-[11px] text-[#667085] mb-2">{section.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {section.attributes.map((attr, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] border border-blue-200"
                            >
                              {attr.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSection(section.id)}
                        className="p-1 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove Section"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => setIsEditDrawerOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 text-[#344054] rounded-lg hover:bg-gray-50 transition-colors text-[14px] font-normal"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveGroup}
              className="flex-1 px-4 py-2 bg-[#FF6A3D] text-white rounded-lg hover:bg-[#FF6A3D]/90 transition-colors text-[14px] font-normal flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Add Section Dialog */}
      <Dialog open={isAddSectionDialogOpen} onOpenChange={setIsAddSectionDialogOpen}>
        <DialogContent className="sm:max-w-[600px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Add Section</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Create a new section and assign attributes to it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Section Name</Label>
              <Input
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g., Material Density"
                className="mt-1.5 font-normal"
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Description (Optional)</Label>
              <Textarea
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                placeholder="Brief description of this section"
                className="mt-1.5 font-normal resize-none"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-[13px] text-[#344054] font-normal mb-2 block">Select Attributes</Label>
              <div className="border border-gray-200 rounded-lg p-3 max-h-[300px] overflow-y-auto space-y-2">
                {mockAvailableAttributes.map((attr) => (
                  <label
                    key={attr.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAttributes.has(attr.id)}
                      onChange={() => toggleAttributeSelection(attr.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D]"
                    />
                    <div className="flex-1">
                      <span className="text-[13px] text-[#101828]">{attr.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-[#667085]">{attr.type}</span>
                        {attr.filterable && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">Filterable</span>
                        )}
                        {attr.variantDefining && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded">Variant</span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-[11px] text-[#667085] mt-2">{selectedAttributes.size} attributes selected</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddSectionDialogOpen(false);
                setNewSectionName('');
                setNewSectionDescription('');
                setSelectedAttributes(new Set());
              }}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSection}
              disabled={!newSectionName.trim() || selectedAttributes.size === 0}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Add Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Dialog (Simple for now) */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] font-['Satoshi']">
          <DialogHeader>
            <DialogTitle className="text-[18px] text-[#101828] font-normal">Create Attribute Group</DialogTitle>
            <DialogDescription className="text-[14px] text-[#667085]">
              Group related attributes together for easier management.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="group-name" className="text-[13px] text-[#344054] font-normal">Group Name</Label>
              <Input id="group-name" placeholder="e.g., Physical Properties" className="mt-1.5 font-normal" />
            </div>
            <div>
              <Label htmlFor="group-desc" className="text-[13px] text-[#344054] font-normal">Description (Optional)</Label>
              <Textarea 
                id="group-desc" 
                placeholder="Brief description of this attribute group"
                className="mt-1.5 font-normal resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast.success('Attribute group created successfully');
                setIsAddDialogOpen(false);
              }}
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
