import { useState } from 'react';
import { ArrowLeft, Search, Tag, Layers, Edit2, X, Plus, Save, XCircle, AlertCircle } from 'lucide-react';

type ViewMode = 'dashboard' | 'profile-management' | 'categories-attributes';

interface Brand {
  id: string;
  name: string;
  category: string;
  subcategories: string[];
}

interface CategoryData {
  id: string;
  name: string;
  type: 'primary' | 'secondary';
  subcategoryCount: number;
  attributeCount: number;
  enabled: boolean;
  subcategories: string[];
  attributes: AttributeData[];
}

interface AttributeData {
  id: string;
  name: string;
  type: 'dropdown' | 'multi-select' | 'numeric' | 'text';
  values: string[];
  enabled: boolean;
  required: boolean;
}

interface CategoriesAttributesProps {
  brand: Brand;
  setViewMode: (mode: ViewMode) => void;
}

// Mock category data
const mockCategories: CategoryData[] = [
  {
    id: '1',
    name: 'Tiles & Ceramics',
    type: 'primary',
    subcategoryCount: 5,
    attributeCount: 12,
    enabled: true,
    subcategories: ['Natural Stone', 'Engineered Stone', 'Ceramic Tiles', 'Porcelain Tiles', 'Mosaic Tiles'],
    attributes: [
      { id: 'a1', name: 'Size', type: 'dropdown', values: ['12x12', '18x18', '24x24', '12x24'], enabled: true, required: true },
      { id: 'a2', name: 'Finish', type: 'multi-select', values: ['Matte', 'Glossy', 'Satin', 'Textured'], enabled: true, required: false },
      { id: 'a3', name: 'Color', type: 'text', values: [], enabled: true, required: true },
      { id: 'a4', name: 'Thickness', type: 'numeric', values: [], enabled: true, required: false },
      { id: 'a5', name: 'Material', type: 'dropdown', values: ['Ceramic', 'Porcelain', 'Natural Stone', 'Glass'], enabled: true, required: true },
      { id: 'a6', name: 'Application', type: 'multi-select', values: ['Floor', 'Wall', 'Indoor', 'Outdoor'], enabled: true, required: false },
    ],
  },
  {
    id: '2',
    name: 'Natural Stone',
    type: 'secondary',
    subcategoryCount: 3,
    attributeCount: 8,
    enabled: true,
    subcategories: ['Granite', 'Marble', 'Limestone'],
    attributes: [
      { id: 'a7', name: 'Stone Type', type: 'dropdown', values: ['Granite', 'Marble', 'Limestone', 'Travertine'], enabled: true, required: true },
      { id: 'a8', name: 'Finish', type: 'dropdown', values: ['Polished', 'Honed', 'Brushed', 'Flamed'], enabled: true, required: false },
      { id: 'a9', name: 'Origin', type: 'text', values: [], enabled: true, required: false },
    ],
  },
  {
    id: '3',
    name: 'Flooring Materials',
    type: 'secondary',
    subcategoryCount: 4,
    attributeCount: 10,
    enabled: true,
    subcategories: ['Hardwood', 'Laminate', 'Vinyl', 'Carpet'],
    attributes: [
      { id: 'a10', name: 'Material Type', type: 'dropdown', values: ['Hardwood', 'Laminate', 'Vinyl', 'Carpet'], enabled: true, required: true },
      { id: 'a11', name: 'Width', type: 'numeric', values: [], enabled: true, required: false },
    ],
  },
];

export function CategoriesAttributes({ brand, setViewMode }: CategoriesAttributesProps) {
  const [categories] = useState<CategoryData[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData>(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<string | null>(null);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveChanges = () => {
    console.log('Saving changes for brand:', brand.id);
    setHasChanges(false);
    // Show success toast
  };

  const handleDiscardChanges = () => {
    console.log('Discarding changes');
    setHasChanges(false);
    // Reset to original state
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
          Back to Brand Management
        </button>
        <h2 className="text-gray-900 mb-1">{brand.name}</h2>
        <p className="text-sm text-gray-500">Manage allowed categories and their attributes for this brand</p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Left Panel - Category List */}
        <div className="w-[35%] bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              />
            </div>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs text-gray-500 mb-3 px-1">ALLOWED CATEGORIES</h3>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory.id === category.id}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Category Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Category Overview Card */}
            <CategoryOverviewCard category={selectedCategory} onToggle={() => setHasChanges(true)} />

            {/* Subcategories Card */}
            <SubcategoriesCard category={selectedCategory} onChange={() => setHasChanges(true)} />

            {/* Attributes Management Card */}
            <AttributesCard
              category={selectedCategory}
              editingAttribute={editingAttribute}
              setEditingAttribute={setEditingAttribute}
              onChange={() => setHasChanges(true)}
            />
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

// Category Card Component
interface CategoryCardProps {
  category: CategoryData;
  isSelected: boolean;
  onClick: () => void;
}

function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? 'bg-[#FF7A59]/5 border-[#FF7A59] shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm text-gray-900 flex-1">{category.name}</h4>
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            category.type === 'primary'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          {category.type === 'primary' ? 'Primary' : 'Secondary'}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          {category.subcategoryCount} subcategories
        </span>
        <span className="flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          {category.attributeCount} attributes
        </span>
      </div>
    </button>
  );
}

// Category Overview Card
interface CategoryOverviewCardProps {
  category: CategoryData;
  onToggle: () => void;
}

function CategoryOverviewCard({ category, onToggle }: CategoryOverviewCardProps) {
  const [enabled, setEnabled] = useState(category.enabled);

  const handleToggle = () => {
    setEnabled(!enabled);
    onToggle();
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Category Overview</h3>
        <button className="text-gray-400 hover:text-[#FF7A59] transition-colors">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Category Name</label>
          <p className="text-sm text-gray-900">{category.name}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Category Type</label>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
              category.type === 'primary'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {category.type === 'primary' ? 'Primary Category' : 'Subcategory'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-900 mb-0.5">Allowed for this brand</p>
            <p className="text-xs text-gray-500">Enable or disable this category</p>
          </div>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? 'bg-[#FF7A59]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

// Subcategories Card
interface SubcategoriesCardProps {
  category: CategoryData;
  onChange: () => void;
}

function SubcategoriesCard({ category, onChange }: SubcategoriesCardProps) {
  const [subcategories, setSubcategories] = useState(category.subcategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleRemove = (subcat: string) => {
    setSubcategories(subcategories.filter((s) => s !== subcat));
    onChange();
  };

  const handleAdd = () => {
    if (newSubcategory.trim()) {
      setSubcategories([...subcategories, newSubcategory.trim()]);
      setNewSubcategory('');
      setIsAdding(false);
      onChange();
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Subcategories</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Subcategory
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Enter subcategory name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewSubcategory('');
            }}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {subcategories.map((subcat, index) => (
          <span
            key={index}
            className="group inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
          >
            {subcat}
            <button
              onClick={() => handleRemove(subcat)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>

      {subcategories.length === 0 && (
        <p className="text-sm text-gray-400 italic">No subcategories added yet</p>
      )}
    </section>
  );
}

// Attributes Card
interface AttributesCardProps {
  category: CategoryData;
  editingAttribute: string | null;
  setEditingAttribute: (id: string | null) => void;
  onChange: () => void;
}

function AttributesCard({ category, editingAttribute, setEditingAttribute, onChange }: AttributesCardProps) {
  const [attributes, setAttributes] = useState(category.attributes);

  const handleToggleAttribute = (id: string) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, enabled: !attr.enabled } : attr
      )
    );
    onChange();
  };

  const handleRemoveAttribute = (id: string) => {
    if (confirm('Are you sure you want to remove this attribute?')) {
      setAttributes(attributes.filter((attr) => attr.id !== id));
      onChange();
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-900">Attributes</h3>
        <button className="flex items-center gap-1 text-sm text-[#FF7A59] hover:text-[#FF7A59]/80 transition-colors">
          <Plus className="w-4 h-4" />
          Add Attribute
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">Manage attributes applicable to this category</p>

      <div className="space-y-3">
        {attributes.map((attribute) => (
          <AttributeRow
            key={attribute.id}
            attribute={attribute}
            isEditing={editingAttribute === attribute.id}
            onEdit={() => setEditingAttribute(attribute.id)}
            onToggle={() => handleToggleAttribute(attribute.id)}
            onRemove={() => handleRemoveAttribute(attribute.id)}
            onSave={(updatedAttr) => {
              setAttributes(
                attributes.map((attr) =>
                  attr.id === attribute.id ? updatedAttr : attr
                )
              );
              setEditingAttribute(null);
              onChange();
            }}
            onCancel={() => setEditingAttribute(null)}
          />
        ))}
      </div>

      {attributes.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No attributes defined for this category</p>
        </div>
      )}
    </section>
  );
}

// Attribute Row Component
interface AttributeRowProps {
  attribute: AttributeData;
  isEditing: boolean;
  onEdit: () => void;
  onToggle: () => void;
  onRemove: () => void;
  onSave: (attribute: AttributeData) => void;
  onCancel: () => void;
}

function AttributeRow({ attribute, isEditing, onEdit, onToggle, onRemove, onSave, onCancel }: AttributeRowProps) {
  const [editedAttribute, setEditedAttribute] = useState(attribute);

  const handleSave = () => {
    onSave(editedAttribute);
  };

  const handleCancel = () => {
    setEditedAttribute(attribute);
    onCancel();
  };

  if (isEditing) {
    return (
      <div className="border border-[#FF7A59] rounded-lg p-4 bg-[#FF7A59]/5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Attribute Name</label>
            <input
              type="text"
              value={editedAttribute.name}
              onChange={(e) => setEditedAttribute({ ...editedAttribute, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Attribute Type</label>
            <select
              value={editedAttribute.type}
              onChange={(e) => setEditedAttribute({ ...editedAttribute, type: e.target.value as AttributeData['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
            >
              <option value="dropdown">Dropdown</option>
              <option value="multi-select">Multi-select</option>
              <option value="numeric">Numeric</option>
              <option value="text">Text</option>
            </select>
          </div>
        </div>

        {(editedAttribute.type === 'dropdown' || editedAttribute.type === 'multi-select') && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Allowed Values</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editedAttribute.values.map((value, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700"
                >
                  {value}
                  <button
                    onClick={() =>
                      setEditedAttribute({
                        ...editedAttribute,
                        values: editedAttribute.values.filter((_, i) => i !== index),
                      })
                    }
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type and press Enter to add value..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/20 focus:border-[#FF7A59]"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setEditedAttribute({
                    ...editedAttribute,
                    values: [...editedAttribute.values, e.currentTarget.value.trim()],
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={editedAttribute.required}
              onChange={(e) => setEditedAttribute({ ...editedAttribute, required: e.target.checked })}
              className="w-4 h-4 text-[#FF7A59] border-gray-300 rounded focus:ring-[#FF7A59]"
            />
            Required field
          </label>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex-1 grid grid-cols-4 gap-4 items-center">
        <div>
          <p className="text-sm text-gray-900">{attribute.name}</p>
          {attribute.required && (
            <span className="text-xs text-red-600">Required</span>
          )}
        </div>
        <div>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {attribute.type === 'dropdown' && 'Dropdown'}
            {attribute.type === 'multi-select' && 'Multi-select'}
            {attribute.type === 'numeric' && 'Numeric'}
            {attribute.type === 'text' && 'Text'}
          </span>
        </div>
        <div>
          {attribute.values.length > 0 && (
            <p className="text-xs text-gray-500 truncate">
              {attribute.values.slice(0, 2).join(', ')}
              {attribute.values.length > 2 && ` +${attribute.values.length - 2}`}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onToggle}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              attribute.enabled ? 'bg-[#FF7A59]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                attribute.enabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-[#FF7A59] transition-colors p-1"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
