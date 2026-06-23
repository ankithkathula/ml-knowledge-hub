import { useState } from 'react';
import { Search, Tag, Lock, ChevronRight, Plus, X } from 'lucide-react';
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

interface AttributeDetail {
  name: string;
  type: 'String' | 'Number' | 'Boolean' | 'Enum';
  filterable: boolean;
  variantDefining: boolean;
  required: boolean;
  unit?: string;
  inherited: boolean;
  customized: boolean;
  allowedValues?: string[];
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

// Mock existing attributes from Attribute Master with Enum types
const mockExistingAttributes = [
  { 
    id: 'attr1', 
    name: 'Compressive Strength', 
    type: 'Number', 
    filterable: true, 
    variantDefining: false, 
    usedInCategories: 12, 
    usedInFamilies: 8 
  },
  { 
    id: 'attr2', 
    name: 'Tensile Strength', 
    type: 'Number', 
    filterable: true, 
    variantDefining: false, 
    usedInCategories: 10, 
    usedInFamilies: 6 
  },
  { 
    id: 'attr3', 
    name: 'Finish Type', 
    type: 'Enum', 
    filterable: true, 
    variantDefining: true, 
    usedInCategories: 15, 
    usedInFamilies: 12,
    allowedValues: ['Matte', 'Gloss', 'Satin', 'Polished', 'Textured', 'Brushed']
  },
  { 
    id: 'attr4', 
    name: 'Fire Rating', 
    type: 'Enum', 
    filterable: true, 
    variantDefining: false, 
    usedInCategories: 8, 
    usedInFamilies: 5,
    allowedValues: ['A1', 'A2', 'B', 'C', 'D', 'E', 'F']
  },
  { 
    id: 'attr5', 
    name: 'Eco Certified', 
    type: 'Boolean', 
    filterable: true, 
    variantDefining: false, 
    usedInCategories: 20, 
    usedInFamilies: 15 
  },
  { 
    id: 'attr6', 
    name: 'Warranty Period', 
    type: 'Number', 
    filterable: false, 
    variantDefining: false, 
    usedInCategories: 18, 
    usedInFamilies: 14 
  },
  { 
    id: 'attr7', 
    name: 'Color Family', 
    type: 'Enum', 
    filterable: true, 
    variantDefining: true, 
    usedInCategories: 22, 
    usedInFamilies: 18,
    allowedValues: ['White', 'Black', 'Gray', 'Beige', 'Brown', 'Blue', 'Green', 'Red', 'Yellow']
  },
  { 
    id: 'attr8', 
    name: 'Slip Resistance', 
    type: 'Enum', 
    filterable: true, 
    variantDefining: false, 
    usedInCategories: 7, 
    usedInFamilies: 4,
    allowedValues: ['R9', 'R10', 'R11', 'R12', 'R13']
  },
];

interface AddAttributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: { groupId: string; sectionId: string } | null;
  categoryConfig: CategoryConfig;
  setCategoryConfig: (config: CategoryConfig) => void;
}

type Step = 0 | 1 | 2;
type ActionType = 'existing' | 'new' | null;

export function AddAttributeDialog({ 
  open, 
  onOpenChange, 
  context,
  categoryConfig,
  setCategoryConfig
}: AddAttributeDialogProps) {
  const [step, setStep] = useState<Step>(0);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttrId, setSelectedAttrId] = useState<string | null>(null);
  const [expandedEnum, setExpandedEnum] = useState<string | null>(null);
  
  // Create new attribute fields
  const [newAttrName, setNewAttrName] = useState('');
  const [newAttrType, setNewAttrType] = useState<'String' | 'Number' | 'Boolean' | 'Enum'>('String');
  const [newAttrFilterable, setNewAttrFilterable] = useState(false);
  const [newAttrVariantDefining, setNewAttrVariantDefining] = useState(false);
  const [newAttrEnumValues, setNewAttrEnumValues] = useState<string[]>([]);
  const [newEnumValue, setNewEnumValue] = useState('');
  
  // Step 2: Override settings
  const [overrideRequired, setOverrideRequired] = useState(false);
  const [overrideSearchable, setOverrideSearchable] = useState(true);
  const [overrideDisplayOrder, setOverrideDisplayOrder] = useState<number>(1);
  const [overrideUnit, setOverrideUnit] = useState('');
  const [enabledEnumValues, setEnabledEnumValues] = useState<Set<string>>(new Set());

  const filteredAttributes = mockExistingAttributes.filter(attr =>
    searchQuery === '' || attr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedAttr = selectedAttrId 
    ? mockExistingAttributes.find(a => a.id === selectedAttrId)
    : null;

  const handleSelectAction = (type: ActionType) => {
    setActionType(type);
    setStep(1);
  };

  const handleSelectExistingAttribute = (attrId: string) => {
    const attr = mockExistingAttributes.find(a => a.id === attrId);
    setSelectedAttrId(attrId);
    
    // Initialize defaults for step 2
    if (attr) {
      if (attr.type === 'Enum' && attr.allowedValues) {
        setEnabledEnumValues(new Set(attr.allowedValues));
      }
    }
    
    setStep(2);
  };

  const handleNextFromNewAttribute = () => {
    if (!newAttrName.trim()) {
      toast.error('Please enter an attribute name');
      return;
    }
    
    if (newAttrType === 'Enum' && newAttrEnumValues.length === 0) {
      toast.error('Please add at least one allowed value for Enum type');
      return;
    }

    // Initialize overrides for new attribute
    if (newAttrType === 'Enum') {
      setEnabledEnumValues(new Set(newAttrEnumValues));
    }
    
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      setStep(0);
      setActionType(null);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleAddAttribute = () => {
    if (!context) return;

    let newAttribute: AttributeDetail;

    if (actionType === 'existing' && selectedAttr) {
      newAttribute = {
        name: selectedAttr.name,
        type: selectedAttr.type as 'String' | 'Number' | 'Boolean' | 'Enum',
        filterable: selectedAttr.filterable,
        variantDefining: selectedAttr.variantDefining,
        required: overrideRequired,
        unit: overrideUnit,
        inherited: true,
        customized: true,
        allowedValues: selectedAttr.type === 'Enum' 
          ? Array.from(enabledEnumValues)
          : undefined
      };
    } else if (actionType === 'new') {
      newAttribute = {
        name: newAttrName,
        type: newAttrType,
        filterable: newAttrFilterable,
        variantDefining: newAttrVariantDefining,
        required: overrideRequired,
        unit: overrideUnit,
        inherited: false,
        customized: false,
        allowedValues: newAttrType === 'Enum' 
          ? Array.from(enabledEnumValues)
          : undefined
      };
    } else {
      return;
    }

    // Add attribute to the correct section
    const updatedGroups = categoryConfig.attributeGroups.map(group => {
      if (group.id === context.groupId) {
        return {
          ...group,
          sections: group.sections.map(section => {
            if (section.id === context.sectionId) {
              return {
                ...section,
                attributes: [...section.attributes, newAttribute]
              };
            }
            return section;
          })
        };
      }
      return group;
    });

    setCategoryConfig({
      ...categoryConfig,
      attributeGroups: updatedGroups
    });

    toast.success(actionType === 'new' ? 'New attribute created and added' : 'Attribute added to category');
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(0);
    setActionType(null);
    setSearchQuery('');
    setSelectedAttrId(null);
    setExpandedEnum(null);
    setNewAttrName('');
    setNewAttrType('String');
    setNewAttrFilterable(false);
    setNewAttrVariantDefining(false);
    setNewAttrEnumValues([]);
    setNewEnumValue('');
    setOverrideRequired(false);
    setOverrideSearchable(true);
    setOverrideDisplayOrder(1);
    setOverrideUnit('');
    setEnabledEnumValues(new Set());
  };

  const toggleEnumValue = (value: string) => {
    const newEnabled = new Set(enabledEnumValues);
    if (newEnabled.has(value)) {
      newEnabled.delete(value);
    } else {
      newEnabled.add(value);
    }
    setEnabledEnumValues(newEnabled);
  };

  const handleAddEnumValue = () => {
    if (newEnumValue.trim() && !newAttrEnumValues.includes(newEnumValue.trim())) {
      setNewAttrEnumValues([...newAttrEnumValues, newEnumValue.trim()]);
      setNewEnumValue('');
    }
  };

  const handleRemoveEnumValue = (value: string) => {
    setNewAttrEnumValues(newAttrEnumValues.filter(v => v !== value));
  };

  const getCurrentAttribute = () => {
    if (actionType === 'existing' && selectedAttr) {
      return {
        name: selectedAttr.name,
        type: selectedAttr.type,
        variantDefining: selectedAttr.variantDefining,
        allowedValues: selectedAttr.allowedValues
      };
    } else if (actionType === 'new') {
      return {
        name: newAttrName,
        type: newAttrType,
        variantDefining: newAttrVariantDefining,
        allowedValues: newAttrEnumValues
      };
    }
    return null;
  };

  const currentAttr = getCurrentAttribute();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogContent className="sm:max-w-[680px] font-['Satoshi'] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[18px] text-[#101828] font-normal">
            {step === 0 ? 'Add Attribute' : step === 1 && actionType === 'existing' ? 'Select Attribute' : step === 1 && actionType === 'new' ? 'Create New Attribute' : 'Configure Category Overrides'}
          </DialogTitle>
          <DialogDescription className="text-[14px] text-[#667085]">
            {step === 0 
              ? 'Choose how you want to add an attribute to this category.'
              : step === 1 && actionType === 'existing'
              ? 'Select from attributes already defined in the Attribute Master.'
              : step === 1 && actionType === 'new'
              ? 'Define a new attribute and assign it to this category.'
              : 'Configure how this attribute behaves specifically for this category.'}
          </DialogDescription>
        </DialogHeader>

        {/* Step 0: Action Selection */}
        {step === 0 && (
          <div className="flex-1 overflow-auto py-6 space-y-4">
            <button
              onClick={() => handleSelectAction('existing')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 group-hover:bg-[#FF6A3D]/10 group-hover:border-[#FF6A3D]/30 transition-colors">
                  <Tag className="w-6 h-6 text-blue-600 group-hover:text-[#FF6A3D] transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] text-[#101828] font-normal mb-1">Add Existing Attribute</h3>
                  <p className="text-[13px] text-[#667085]">Select from attributes already defined in the Attribute Master.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSelectAction('new')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0 group-hover:bg-[#FF6A3D]/10 group-hover:border-[#FF6A3D]/30 transition-colors">
                  <Plus className="w-6 h-6 text-green-600 group-hover:text-[#FF6A3D] transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] text-[#101828] font-normal mb-1">Create New Attribute</h3>
                  <p className="text-[13px] text-[#667085]">Define a brand new attribute and assign it to this category.</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Step 1A: Select Existing Attribute */}
        {step === 1 && actionType === 'existing' && (
          <div className="flex-1 overflow-auto space-y-4 py-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
                <Input
                  placeholder="Search attributes (e.g., Density, Finish Type, Color)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-normal"
                />
              </div>
            </div>

            {/* Attribute Cards */}
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredAttributes.length > 0 ? (
                filteredAttributes.map((attr) => (
                  <button
                    key={attr.id}
                    onClick={() => handleSelectExistingAttribute(attr.id)}
                    className="w-full text-left border border-gray-200 rounded-xl p-4 hover:border-[#FF6A3D] hover:bg-[#FF6A3D]/5 transition-all bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-[15px] text-[#101828] font-normal">{attr.name}</h4>
                          <span className={`text-[11px] px-2 py-0.5 rounded border ${
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
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3">
                          {attr.filterable && (
                            <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                              Filterable
                            </span>
                          )}
                          {attr.variantDefining && (
                            <span className="text-[10px] px-2 py-0.5 bg-orange-50 text-orange-700 rounded border border-orange-200">
                              Variant Defining
                            </span>
                          )}
                        </div>

                        {/* Enum Values Preview */}
                        {attr.type === 'Enum' && attr.allowedValues && (
                          <div className="mb-3">
                            <p className="text-[11px] text-[#667085] uppercase tracking-[0.05em] mb-1.5">Allowed Values</p>
                            <div className="text-[12px] text-[#101828]">
                              {attr.allowedValues.slice(0, 3).join(' • ')}
                              {attr.allowedValues.length > 3 && ` • +${attr.allowedValues.length - 3} more`}
                            </div>
                          </div>
                        )}

                        {/* Usage Info */}
                        <div className="text-[11px] text-[#667085]">
                          Used in {attr.usedInCategories} categories • {attr.usedInFamilies} product families
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-[14px] text-[#667085] mb-1">No attributes found</p>
                  <p className="text-[12px] text-[#667085]">Try searching with different keywords</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 1B: Create New Attribute */}
        {step === 1 && actionType === 'new' && (
          <div className="flex-1 overflow-auto space-y-4 py-4">
            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Attribute Name *</Label>
              <Input
                placeholder="e.g., Compressive Strength"
                value={newAttrName}
                onChange={(e) => setNewAttrName(e.target.value)}
                className="mt-1.5 font-normal"
              />
            </div>

            <div>
              <Label className="text-[13px] text-[#344054] font-normal">Data Type *</Label>
              <select
                value={newAttrType}
                onChange={(e) => setNewAttrType(e.target.value as 'String' | 'Number' | 'Boolean' | 'Enum')}
                className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
              >
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex-1">
                <Label className="text-[13px] text-[#101828] font-normal">Filterable</Label>
                <p className="text-[11px] text-[#667085] mt-0.5">Show in product filters</p>
              </div>
              <button
                onClick={() => setNewAttrFilterable(!newAttrFilterable)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                  newAttrFilterable ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    newAttrFilterable ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex-1">
                <Label className="text-[13px] text-[#101828] font-normal">Variant Defining</Label>
                <p className="text-[11px] text-[#667085] mt-0.5">Creates product variants</p>
              </div>
              <button
                onClick={() => setNewAttrVariantDefining(!newAttrVariantDefining)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                  newAttrVariantDefining ? 'bg-[#FF6A3D]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    newAttrVariantDefining ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            {/* Enum Values Input */}
            {newAttrType === 'Enum' && (
              <div>
                <Label className="text-[13px] text-[#344054] font-normal mb-2 block">Allowed Values *</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter value (e.g., Matte)"
                    value={newEnumValue}
                    onChange={(e) => setNewEnumValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEnumValue();
                      }
                    }}
                    className="font-normal"
                  />
                  <Button
                    type="button"
                    onClick={handleAddEnumValue}
                    className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {newAttrEnumValues.length > 0 && (
                  <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                    {newAttrEnumValues.map((value, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-[13px] text-[#101828]">{value}</span>
                        <button
                          onClick={() => handleRemoveEnumValue(value)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Configure Overrides */}
        {step === 2 && currentAttr && (
          <div className="flex-1 overflow-auto space-y-5 py-4">
            {/* System Information (Read-only) */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h4 className="text-[12px] text-[#667085] uppercase tracking-[0.05em] mb-3">System Information</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#667085]" />
                    <span className="text-[13px] text-[#667085]">Attribute Name</span>
                  </div>
                  <span className="text-[13px] text-[#101828] font-normal">{currentAttr.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#667085]" />
                    <span className="text-[13px] text-[#667085]">Data Type</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded border ${
                    currentAttr.type === 'Enum' 
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : currentAttr.type === 'Number'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : currentAttr.type === 'Boolean'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {currentAttr.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#667085]" />
                    <span className="text-[13px] text-[#667085]">Variant Defining</span>
                  </div>
                  <span className="text-[13px] text-[#101828] font-normal">{currentAttr.variantDefining ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Category Overrides */}
            <div>
              <h4 className="text-[14px] text-[#101828] font-normal mb-1">Category Overrides</h4>
              <p className="text-[12px] text-[#667085] mb-4">Configure category-specific behavior for this attribute.</p>

              <div className="space-y-3">
                {/* Required Toggle */}
                <div className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <Label className="text-[13px] text-[#101828] font-normal">Required</Label>
                    <p className="text-[11px] text-[#667085] mt-0.5">Must be filled for products in this category</p>
                  </div>
                  <button
                    onClick={() => setOverrideRequired(!overrideRequired)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      overrideRequired ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        overrideRequired ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Searchable Toggle */}
                <div className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <Label className="text-[13px] text-[#101828] font-normal">Searchable</Label>
                    <p className="text-[11px] text-[#667085] mt-0.5">Include this attribute in search and filter options for this category</p>
                  </div>
                  <button
                    onClick={() => setOverrideSearchable(!overrideSearchable)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      overrideSearchable ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        overrideSearchable ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Display Order */}
                <div>
                  <Label className="text-[13px] text-[#344054] font-normal">Display Order</Label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g., 1, 2, 3"
                    value={overrideDisplayOrder}
                    onChange={(e) => setOverrideDisplayOrder(parseInt(e.target.value) || 1)}
                    className="mt-1.5 font-normal"
                  />
                  <p className="text-[11px] text-[#667085] mt-1">Controls the position of this attribute in the product specification form</p>
                </div>

                {/* Unit of Measure - Only for Number type */}
                {currentAttr.type === 'Number' && (
                  <div>
                    <Label className="text-[13px] text-[#344054] font-normal">Unit of Measure (UOM)</Label>
                    <select
                      value={overrideUnit}
                      onChange={(e) => setOverrideUnit(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]/20 focus:border-[#FF6A3D] font-normal"
                    >
                      <option value="">Select unit (optional)</option>
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="kg">kg</option>
                      <option value="kg/m³">kg/m³</option>
                      <option value="sqm">sqm</option>
                      <option value="MPa">MPa</option>
                      <option value="%">%</option>
                      <option value="pcs">pcs</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                    </select>
                    <p className="text-[11px] text-[#667085] mt-1">Leave blank if not applicable</p>
                  </div>
                )}
              </div>
            </div>

            {/* Allowed Values for this Category (Enum only) */}
            {currentAttr.type === 'Enum' && currentAttr.allowedValues && currentAttr.allowedValues.length > 0 && (
              <div>
                <h4 className="text-[14px] text-[#101828] font-normal mb-1">Allowed Values for this Category</h4>
                <p className="text-[12px] text-[#667085] mb-3">Select which values are available for this category. Deselect values that don't apply.</p>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-[200px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    {currentAttr.allowedValues.map((value, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={enabledEnumValues.has(value)}
                          onChange={() => toggleEnumValue(value)}
                          className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer"
                        />
                        <span className="text-[13px] text-[#101828]">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#667085] mt-2">
                  {enabledEnumValues.size} of {currentAttr.allowedValues.length} values enabled for this category
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="border-t border-gray-100 pt-4">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="font-normal"
            >
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="font-normal"
          >
            Cancel
          </Button>
          {step === 1 && actionType === 'new' && (
            <Button
              onClick={handleNextFromNewAttribute}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              onClick={handleAddAttribute}
              className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 font-normal"
            >
              Add Attribute
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}