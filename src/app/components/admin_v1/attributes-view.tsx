import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Edit3, 
  Trash2, 
  MoreVertical,
  X,
  Layers,
  ArrowRightLeft,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  Maximize2,
  Database,
  Check,
  Copy,
  ClipboardList,
  Activity,
  PlusCircle,
  GripVertical,
  Hash,
  PackageSearch,
  Settings2,
  FolderTree,
  Filter,
  RefreshCw,
  Box,
  LayoutGrid,
  Info,
  AlertTriangle,
  FileText,
  Tag,
  CheckSquare,
  FolderPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// --- Types ---

type AttributeType = 'String' | 'Number' | 'Boolean' | 'Enum' | 'Text';
type AttributeClassification = 'Master Data' | 'Transactional Data';
type AttributeSource = 'System' | 'Custom';

interface Attribute {
  id: string;
  name: string;
  displayName: string;
  slug: string;
  description?: string;
  type: AttributeType;
  classification: AttributeClassification;
  source: AttributeSource;
  unit?: string;
  groupId: string;
  sectionId: string;
  isRequired: boolean;
  isVariant: boolean;
  isFilterable: boolean;
  isComparable: boolean;
  isPriceable: boolean;
  categoryId: string;
  enumValues?: string[];
  isOverridden?: boolean;
}

interface Section {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: AttributeClassification;
  displayOrder: number;
  active: boolean;
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  status: 'Active' | 'Inactive';
  categoryId: string;
}

interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

// --- Initial Mock Data ---

const INITIAL_GROUPS: Group[] = [
  { id: 'g1', name: 'Dimensions & Geometry', slug: 'dimensions_geometry', description: 'Physical dimensional master schema', displayOrder: 1, status: 'Active', categoryId: 'sub-sub-1' },
  { id: 'g2', name: 'Physical Properties', slug: 'physical_properties', description: 'Inherent material characteristics', displayOrder: 2, status: 'Active', categoryId: 'sub-sub-1' },
  { id: 'g3', name: 'Visual & Aesthetics', slug: 'visual_aesthetics', description: 'Surface finish and visual parameters', displayOrder: 3, status: 'Active', categoryId: 'sub-sub-1' },
  { id: 'g4', name: 'Certifications', slug: 'certifications', description: 'Regulatory standards and badges', displayOrder: 4, status: 'Active', categoryId: 'sub-sub-1' },
];

const INITIAL_SECTIONS: Section[] = [
  { id: 's1', name: 'Standard Size', slug: 'standard_size', description: 'Core dimensional parameters', type: 'Master Data', displayOrder: 1, active: true, groupId: 'g1' },
  { id: 's2', name: 'Mechanical', slug: 'mechanical', description: 'Resistance and density performance metrics', type: 'Transactional Data', displayOrder: 1, active: true, groupId: 'g2' },
  { id: 's3', name: 'Appearance', slug: 'appearance', description: 'Decorative and aesthetic characteristic data', type: 'Master Data', displayOrder: 1, active: true, groupId: 'g3' },
  { id: 's4', name: 'Compliance', slug: 'compliance', description: 'Industry standards', type: 'Master Data', displayOrder: 1, active: true, groupId: 'g4' },
];

const INITIAL_ATTRIBUTES: Attribute[] = [
  { id: 'a1', name: 'Width', displayName: 'Width', slug: 'width', type: 'Number', classification: 'Master Data', source: 'System', unit: 'mm', groupId: 'g1', sectionId: 's1', isRequired: true, isVariant: true, isFilterable: true, isComparable: true, isPriceable: false, categoryId: 'sub-sub-1' },
  { id: 'a2', name: 'Height', displayName: 'Height', slug: 'height', type: 'Number', classification: 'Master Data', source: 'System', unit: 'mm', groupId: 'g1', sectionId: 's1', isRequired: false, isVariant: false, isFilterable: false, isComparable: false, isPriceable: false, categoryId: 'sub-sub-1' },
  { id: 'a3', name: 'Thickness', displayName: 'Thickness', slug: 'thickness', type: 'Number', classification: 'Master Data', source: 'System', unit: 'mm', groupId: 'g1', sectionId: 's1', isRequired: false, isVariant: true, isFilterable: false, isComparable: false, isPriceable: false, categoryId: 'sub-sub-1' },
  { id: 'a4', name: 'Density', displayName: 'Density', slug: 'density', type: 'Number', classification: 'Transactional Data', source: 'System', unit: 'kg/m³', groupId: 'g2', sectionId: 's2', isRequired: false, isVariant: false, isFilterable: false, isComparable: true, isPriceable: false, categoryId: 'sub-sub-1' },
  { id: 'a5', name: 'Color', displayName: 'Color', slug: 'color', type: 'Enum', classification: 'Master Data', source: 'System', groupId: 'g3', sectionId: 's3', isRequired: false, isVariant: true, isFilterable: true, isComparable: false, isPriceable: false, categoryId: 'sub-sub-1', enumValues: ['Red', 'Blue', 'Green'] },
  { id: 'a6', name: 'Fire Rating', displayName: 'Fire Rating', slug: 'fire_rating', type: 'Text', classification: 'Transactional Data', source: 'System', groupId: 'g4', sectionId: 's4', isRequired: false, isVariant: false, isFilterable: false, isComparable: true, isPriceable: false, categoryId: 'sub-sub-1' },
];

const MOCK_CATEGORIES: CategoryNode[] = [
  {
    id: 'cat-1',
    name: 'Tiles & Ceramics',
    children: [
      { 
        id: 'sub-1', 
        name: 'Ceramic Tiles', 
        children: [
          { id: 'sub-sub-1', name: 'Vitrified Tiles' },
          { id: 'sub-sub-2', name: 'Mosaic Tiles' }
        ]
      },
      { id: 'sub-2', name: 'Wall Tiles' },
      { id: 'sub-3', name: 'Floor Tiles' }
    ]
  },
  {
    id: 'cat-2',
    name: 'Woods & Laminates',
    children: [
      { id: 'sub-4', name: 'Plywood' },
      { id: 'sub-5', name: 'Hardwood' },
      { id: 'sub-6', name: 'Laminates' }
    ]
  },
];

// --- Drawer Context ---
type DrawerType = 'ADD_GROUP' | 'ADD_SECTION' | 'ADD_ATTRIBUTE' | 'EDIT_ATTRIBUTE' | 'NONE';

interface DrawerState {
  type: DrawerType;
  data?: any;
}

// --- Helper Components ---

function ClassificationBadge({ classification }: { classification: AttributeClassification }) {
  const isMaster = classification === 'Master Data';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-normal uppercase tracking-widest border shrink-0 ${isMaster ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
      {classification}
    </span>
  );
}

function TypeBadge({ source }: { source: AttributeSource }) {
  const isSystem = source === 'System';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-normal uppercase tracking-widest border shrink-0 ${isSystem ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
      {source}
    </span>
  );
}

function ToggleSwitch({ active, onClick, disabled }: { active: boolean, onClick: () => void, disabled?: boolean }) {
  return (
    <button 
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
      disabled={disabled}
      className={`relative w-8 h-4 rounded-full transition-all duration-300 ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} ${active ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${active ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
}

// --- Main View Component ---

export function AttributesView() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [attributes, setAttributes] = useState<Attribute[]>(INITIAL_ATTRIBUTES);
  
  const [activeCategoryId, setActiveCategoryId] = useState('sub-sub-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(INITIAL_GROUPS.map(g => g.id));
  const [expandedSections, setExpandedSections] = useState<string[]>(INITIAL_SECTIONS.map(s => s.id));
  
  const [isBulkEdit, setIsBulkEdit] = useState(false);
  const [selectedAttrs, setSelectedAttrs] = useState<Set<string>>(new Set());
  
  const [drawer, setDrawer] = useState<DrawerState>({ type: 'NONE' });

  const activeCategoryName = useMemo(() => {
    const find = (nodes: CategoryNode[]): string => {
      for (const node of nodes) {
        if (node.id === activeCategoryId) return node.name;
        if (node.children) {
          const res = find(node.children);
          if (res !== 'Unknown') return res;
        }
      }
      return 'Unknown';
    };
    return find(MOCK_CATEGORIES);
  }, [activeCategoryId]);

  const currentCategoryGroups = useMemo(() => {
    return groups.filter(g => g.categoryId === activeCategoryId).sort((a, b) => a.displayOrder - b.displayOrder);
  }, [groups, activeCategoryId]);

  const handleToggleAttribute = (id: string, field: keyof Attribute) => {
    setAttributes(prev => prev.map(a => a.id === id ? { ...a, [field]: !a[field] } : a));
    toast.success('Property updated');
  };

  const handleBulkToggle = (field: keyof Attribute, value: boolean) => {
    setAttributes(prev => prev.map(a => selectedAttrs.has(a.id) ? { ...a, [field]: value } : a));
    toast.success(`Bulk updated ${field}`);
  };

  const handleDeleteAttribute = (attr: Attribute) => {
    if (attr.isVariant) {
      if (!confirm('WARNING: Removing a variant attribute may affect product configurations. Continue?')) return;
    } else {
      if (!confirm(`Are you sure you want to delete "${attr.name}"?`)) return;
    }
    setAttributes(prev => prev.filter(a => a.id !== attr.id));
    toast.error('Attribute deleted');
  };

  const handleDeleteSection = (section: Section) => {
    const sectionAttrs = attributes.filter(a => a.sectionId === section.id);
    if (sectionAttrs.length > 0) {
      toast.error('Cannot delete section while it contains attributes.');
      return;
    }
    if (confirm(`Delete section "${section.name}"?`)) {
      setSections(prev => prev.filter(s => s.id !== section.id));
      toast.error('Section deleted');
    }
  };

  const handleDeleteGroup = (group: Group) => {
    const groupSections = sections.filter(s => s.groupId === group.id);
    if (groupSections.length > 0) {
      toast.error('Cannot delete group while it contains sections.');
      return;
    }
    if (confirm(`Delete group "${group.name}"?`)) {
      setGroups(prev => prev.filter(g => g.id !== group.id));
      toast.error('Group deleted');
    }
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <div className="flex h-full bg-[#fcfcfd] font-['Satoshi'] font-normal overflow-hidden relative">
      
      {/* Category Tree Panel */}
      <aside className="w-72 border-r border-gray-100 flex flex-col h-full bg-white shrink-0 sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] text-gray-400 font-normal uppercase tracking-[0.2em]">Filter Category</h3>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input 
                type="text" 
                placeholder="Search category..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[11px] focus:outline-none focus:border-[#FF7A59] transition-all font-normal"
              />
            </div>
            <div className="space-y-1 -mx-2">
              {MOCK_CATEGORIES.map(cat => (
                <CategoryTreeNode 
                  key={cat.id} 
                  node={cat} 
                  activeId={activeCategoryId} 
                  onSelect={(id) => { setActiveCategoryId(id); setIsBulkEdit(false); setSelectedAttrs(new Set()); }} 
                  search={categorySearch} 
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header */}
        <div className="bg-white px-10 py-8 border-b border-gray-100 shrink-0">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-normal uppercase tracking-widest">
                <span>Product Taxonomy</span>
                <ChevronRight className="w-3 h-3" />
                <span>Categories</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-900">{activeCategoryName}</span>
              </div>
              <h1 className="text-2xl text-gray-900 font-normal uppercase tracking-tight">Manage Attributes – {activeCategoryName}</h1>
            </div>
            
            <div className="flex items-center gap-3 shrink-0 pt-1">
              <div className="flex items-center rounded-2xl bg-gray-50 border border-gray-100 p-1">
                <button onClick={() => toast.info('Export schema')} className="flex items-center gap-2 px-4 py-2 text-[10px] text-gray-500 font-normal uppercase tracking-widest hover:text-gray-900 transition-colors cursor-pointer group">
                  <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF7A59] transition-colors" /> Export
                </button>
                <button onClick={() => toast.info('Import schema')} className="flex items-center gap-2 px-4 py-2 text-[10px] text-gray-500 font-normal uppercase tracking-widest hover:text-gray-900 transition-colors cursor-pointer border-l border-gray-200 group">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF7A59] transition-colors" /> Import
                </button>
              </div>
              <button 
                onClick={() => { setIsBulkEdit(!isBulkEdit); setSelectedAttrs(new Set()); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-normal uppercase tracking-widest transition-all cursor-pointer shadow-lg ${isBulkEdit ? 'bg-[#FF7A59] text-white' : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'}`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" /> {isBulkEdit ? 'Exit Bulk Edit' : 'Bulk Edit'}
              </button>
              <button 
                onClick={() => setDrawer({ type: 'ADD_GROUP', data: { categoryId: activeCategoryId, categoryName: activeCategoryName } })}
                className="flex items-center gap-2 px-6 py-3 border border-[#FF7A59] text-[#FF7A59] rounded-2xl text-[10px] font-normal uppercase tracking-widest hover:bg-[#FF7A59]/5 transition-all cursor-pointer shadow-sm"
              >
                <FolderPlus className="w-4 h-4" /> Add Group
              </button>
              <button 
                onClick={() => setDrawer({ type: 'ADD_ATTRIBUTE', data: { categoryId: activeCategoryId } })}
                className="flex items-center gap-2 px-8 py-3 bg-[#FF7A59] text-white rounded-2xl text-[10px] font-normal uppercase tracking-widest hover:bg-orange-600 transition-all cursor-pointer shadow-xl shadow-orange-100"
              >
                <Plus className="w-4 h-4" /> Add Attribute
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#FF7A59] transition-colors" />
            <input 
              type="text" 
              placeholder="Search attributes by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs focus:outline-none focus:border-[#FF7A59] focus:bg-white transition-all font-normal"
            />
          </div>
        </div>

        {/* Groups & Sections List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-[#fcfcfd]/30 relative">
          <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {currentCategoryGroups.map(group => {
              const isGroupExpanded = expandedGroups.includes(group.id);
              const groupSections = sections.filter(s => s.groupId === group.id).sort((a, b) => a.displayOrder - b.displayOrder);
              
              return (
                <div key={group.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div 
                    className="px-8 py-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none group"
                    onClick={() => toggleGroupExpansion(group.id)}
                  >
                    <div className="flex items-center gap-5 text-left">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner ${isGroupExpanded ? 'bg-[#FF7A59]/10 text-[#FF7A59]' : 'bg-gray-50 text-gray-400'}`}>
                        {group.slug.includes('dimensions') ? <Maximize2 className="w-4 h-4" /> : group.slug.includes('physical') ? <Database className="w-4 h-4" /> : group.slug.includes('visual') ? <Layers className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[15px] text-gray-900 font-normal uppercase tracking-tight">{group.name}</h3>
                          <span className="text-[9px] px-1.5 py-0.5 bg-gray-50 text-gray-400 border border-gray-100 rounded-full font-normal uppercase tracking-widest">{groupSections.length} Sections</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-normal uppercase tracking-widest">{group.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDrawer({ type: 'ADD_SECTION', data: { groupId: group.id } }); }} 
                          className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-[#FF7A59] transition-all"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group); }} 
                          className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <motion.div animate={{ rotate: isGroupExpanded ? 180 : 0 }}>
                        <ChevronDown className="w-5 h-5 text-gray-300" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isGroupExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-10 pt-2 border-t border-gray-50 space-y-10">
                          {groupSections.map(section => {
                            const isSectionExpanded = expandedSections.includes(section.id);
                            const sectionAttrs = attributes.filter(a => a.sectionId === section.id && (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.slug.toLowerCase().includes(searchQuery.toLowerCase())));
                            
                            return (
                              <div key={section.id} className="space-y-4">
                                <div 
                                  className="flex items-center justify-between group/section cursor-pointer border-b border-gray-50 pb-3"
                                  onClick={() => toggleSectionExpansion(section.id)}
                                >
                                  <div className="flex items-center gap-3 text-left">
                                    <div className={`p-1 rounded transition-colors ${isSectionExpanded ? 'text-[#FF7A59]' : 'text-gray-300'}`}>
                                      {isSectionExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-3">
                                        <h4 className="text-[13px] text-gray-900 font-normal uppercase tracking-tight">{section.name}</h4>
                                        <span className="text-[9px] text-gray-300 font-normal uppercase tracking-widest">{sectionAttrs.length} Attributes</span>
                                      </div>
                                      <p className="text-[10px] text-gray-400 font-normal italic tracking-tight">{section.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-4 opacity-0 group-hover/section:opacity-100 transition-opacity">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); setDrawer({ type: 'ADD_ATTRIBUTE', data: { groupId: group.id, sectionId: section.id, categoryId: activeCategoryId } }); }}
                                        className="text-[9px] text-[#FF7A59] hover:underline font-normal uppercase tracking-widest transition-colors flex items-center gap-1.5"
                                      >
                                        <Plus className="w-3.5 h-3.5" /> Add Attribute
                                      </button>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteSection(section); }} 
                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <AnimatePresence initial={false}>
                                  {isSectionExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      {sectionAttrs.length === 0 ? (
                                        <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-50 rounded-[24px] bg-gray-50/20 space-y-3">
                                          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-normal">No attributes mapped yet</p>
                                          <button onClick={() => setDrawer({ type: 'ADD_ATTRIBUTE', data: { groupId: group.id, sectionId: section.id, categoryId: activeCategoryId } })} className="text-[10px] text-[#FF7A59] font-normal hover:underline uppercase tracking-widest">+ Add Attribute</button>
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                          {sectionAttrs.map(attr => (
                                            <div 
                                              key={attr.id} 
                                              className={`bg-white border rounded-2xl p-5 transition-all group/card relative text-left ${isBulkEdit ? 'cursor-pointer' : ''} ${selectedAttrs.has(attr.id) ? 'border-[#FF7A59] bg-[#FF7A59]/5' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
                                              onClick={() => {
                                                if (isBulkEdit) {
                                                  const next = new Set(selectedAttrs);
                                                  if (next.has(attr.id)) next.delete(attr.id);
                                                  else next.add(attr.id);
                                                  setSelectedAttrs(next);
                                                }
                                              }}
                                            >
                                              {isBulkEdit && (
                                                <div className={`absolute top-4 left-4 w-4 h-4 rounded border transition-colors flex items-center justify-center ${selectedAttrs.has(attr.id) ? 'bg-[#FF7A59] border-[#FF7A59]' : 'bg-white border-gray-200'}`}>
                                                  {selectedAttrs.has(attr.id) && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                              )}
                                              
                                              <div className={`flex flex-col h-full space-y-4 ${isBulkEdit ? 'pl-8' : ''}`}>
                                                <div className="flex items-start justify-between gap-4">
                                                  <div className="space-y-1.5 min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                      <span className="text-[14px] text-gray-900 font-normal uppercase tracking-tight truncate">{attr.name}</span>
                                                      <ClassificationBadge classification={attr.classification} />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-300">
                                                      <Hash className="w-3 h-3" />
                                                      <span>{attr.slug}</span>
                                                    </div>
                                                  </div>
                                                  <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity shrink-0">
                                                    <button onClick={(e) => { e.stopPropagation(); setDrawer({ type: 'EDIT_ATTRIBUTE', data: attr }); }} className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-[#FF7A59] transition-all"><Edit3 className="w-4 h-4" /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); toast.info('Duplicate'); }} className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all"><Copy className="w-4 h-4" /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteAttribute(attr); }} className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                                                  </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5">
                                                  <TypeBadge source={attr.source} />
                                                  <span className="px-1.5 py-0.5 rounded text-[8px] font-normal uppercase tracking-widest border bg-gray-900 text-white border-gray-900">{attr.type}</span>
                                                  {attr.unit && <span className="px-1.5 py-0.5 rounded text-[8px] font-normal uppercase tracking-widest border bg-[#FF7A59]/10 text-[#FF7A59] border-[#FF7A59]/20">UNIT: {attr.unit}</span>}
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2 pt-4 border-t border-gray-50">
                                                  <ControlItem label="Required" active={attr.isRequired} onClick={() => handleToggleAttribute(attr.id, 'isRequired')} />
                                                  <ControlItem label="Variant" active={attr.isVariant} onClick={() => handleToggleAttribute(attr.id, 'isVariant')} />
                                                  <ControlItem label="Filterable" active={attr.isFilterable} onClick={() => handleToggleAttribute(attr.id, 'isFilterable')} />
                                                  <ControlItem label="Comparable" active={attr.isComparable} onClick={() => handleToggleAttribute(attr.id, 'isComparable')} />
                                                  <ControlItem label="Priceable" active={attr.isPriceable} onClick={() => handleToggleAttribute(attr.id, 'isPriceable')} />
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <button 
              onClick={() => setDrawer({ type: 'ADD_GROUP', data: { categoryId: activeCategoryId, categoryName: activeCategoryName } })}
              className="w-full py-8 border-2 border-dashed border-gray-50 rounded-[32px] text-gray-300 hover:text-[#FF7A59] hover:border-[#FF7A59]/30 hover:bg-[#FF7A59]/5 transition-all flex flex-col items-center justify-center gap-3 group opacity-50"
            >
              <PlusCircle className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-normal uppercase tracking-[0.2em]">Add New Hierarchy Group</span>
            </button>
          </div>
        </div>

        {/* Bulk Action Bar Overlay */}
        <AnimatePresence>
          {isBulkEdit && selectedAttrs.size > 0 && (
            <motion.div 
              initial={{ y: 100 }} 
              animate={{ y: 0 }} 
              exit={{ y: 100 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-10 py-6 rounded-[32px] shadow-2xl flex items-center gap-10 z-[100]"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-normal uppercase tracking-widest text-gray-400">{selectedAttrs.size} Attributes Selected</p>
                <p className="text-[13px] font-normal uppercase tracking-tight">Batch Update Behavior</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-6">
                <button onClick={() => handleBulkToggle('isRequired', true)} className="text-[10px] font-normal uppercase tracking-widest hover:text-[#FF7A59] transition-colors">Required</button>
                <button onClick={() => handleBulkToggle('isFilterable', true)} className="text-[10px] font-normal uppercase tracking-widest hover:text-[#FF7A59] transition-colors">Filterable</button>
                <button onClick={() => handleBulkToggle('isComparable', true)} className="text-[10px] font-normal uppercase tracking-widest hover:text-[#FF7A59] transition-colors">Comparable</button>
                <button onClick={() => handleBulkToggle('isPriceable', true)} className="text-[10px] font-normal uppercase tracking-widest hover:text-[#FF7A59] transition-colors">Priceable</button>
              </div>
              <button 
                onClick={() => { setSelectedAttrs(new Set()); setIsBulkEdit(false); }}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-normal uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side Drawer Component */}
      <AnimatePresence>
        {drawer.type !== 'NONE' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setDrawer({ type: 'NONE' })}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[500px] bg-white z-[110] shadow-2xl flex flex-col"
            >
              <DrawerContent 
                type={drawer.type} 
                data={drawer.data} 
                onClose={() => setDrawer({ type: 'NONE' })}
                onSave={(actionData: any) => {
                  if (drawer.type === 'ADD_GROUP') {
                    const newGroup: Group = {
                      id: `g${Date.now()}`,
                      ...actionData,
                      categoryId: activeCategoryId
                    };
                    setGroups(prev => [newGroup, ...prev]);
                    setExpandedGroups(prev => [...prev, newGroup.id]);
                    toast.success('Group created');
                  } else if (drawer.type === 'ADD_SECTION') {
                    const newSection: Section = {
                      id: `s${Date.now()}`,
                      ...actionData,
                      groupId: drawer.data.groupId
                    };
                    setSections(prev => [...prev, newSection]);
                    setExpandedSections(prev => [...prev, newSection.id]);
                    toast.success('Section created');
                  } else if (drawer.type === 'ADD_ATTRIBUTE') {
                    const newAttr: Attribute = {
                      id: `a${Date.now()}`,
                      ...actionData,
                      categoryId: activeCategoryId,
                      source: 'Custom',
                      scope: 'Category'
                    };
                    setAttributes(prev => [...prev, newAttr]);
                    toast.success('Attribute created');
                  } else if (drawer.type === 'EDIT_ATTRIBUTE') {
                    setAttributes(prev => prev.map(a => a.id === drawer.data.id ? { ...a, ...actionData } : a));
                    toast.success('Attribute updated');
                  }
                  setDrawer({ type: 'NONE' });
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Internal Helper Components ---

function CategoryTreeNode({ node, depth = 0, activeId, onSelect, search }: { node: CategoryNode, depth?: number, activeId: string, onSelect: (id: string) => void, search: string }) {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const isActive = activeId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  
  const matchesSearch = !search || node.name.toLowerCase().includes(search.toLowerCase()) || 
                      (node.children && node.children.some(c => c.name.toLowerCase().includes(search.toLowerCase())));

  if (!matchesSearch) return null;

  return (
    <div className="font-normal select-none">
      <div 
        onClick={() => {
          onSelect(node.id);
          if (hasChildren) setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer transition-all group ${isActive ? 'bg-[#FF7A59]/10 text-[#FF7A59]' : 'hover:bg-gray-50'}`}
        style={{ marginLeft: `${depth * 12}px` }}
      >
        {hasChildren ? (
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="text-gray-300">
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
        ) : <div className="w-3.5 h-3.5" />}
        <span className={`text-[12px] truncate uppercase tracking-tight ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
          {node.name}
        </span>
      </div>
      {isOpen && hasChildren && (
        <div className="mt-0.5">
          {node.children?.map(child => (
            <CategoryTreeNode key={child.id} node={child} depth={depth + 1} activeId={activeId} onSelect={onSelect} search={search} />
          ))}
        </div>
      )}
    </div>
  );
}

function ControlItem({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-2.5 bg-gray-50/50 rounded-xl border border-gray-100/50">
      <span className="text-[9px] text-gray-400 font-normal uppercase tracking-widest">{label}</span>
      <ToggleSwitch active={active} onClick={onClick} />
    </div>
  );
}

function DrawerContent({ type, data, onClose, onSave }: { type: DrawerType, data?: any, onClose: () => void, onSave: (data: any) => void }) {
  const [step, setStep] = useState(type === 'ADD_ATTRIBUTE' ? 'choice' : 'form');
  const [formData, setFormData] = useState<any>(() => {
    if (type === 'EDIT_ATTRIBUTE') return { ...data };
    if (type === 'ADD_GROUP') return { name: '', slug: '', description: '', displayOrder: 1, status: 'Active' };
    if (type === 'ADD_SECTION') return { name: '', slug: '', description: '', type: 'Master Data', displayOrder: 1, active: true };
    if (type === 'ADD_ATTRIBUTE') return { 
      name: '', displayName: '', slug: '', description: '', type: 'String', 
      classification: 'Master Data', isRequired: false, isVariant: false, 
      isFilterable: false, isComparable: false, isPriceable: false, 
      unit: '', enumValues: [], sectionId: data.sectionId || '' 
    };
    return {};
  });

  const slugify = (text: string) => text.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      toast.error('Name and slug are required');
      return;
    }
    if (formData.type === 'Enum' && (!formData.enumValues || formData.enumValues.length === 0)) {
      toast.error('At least one enum value is required');
      return;
    }
    onSave(formData);
  };

  const isSystem = type === 'EDIT_ATTRIBUTE' && data?.source === 'System';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="space-y-1 text-left">
          <h3 className="text-xl text-gray-900 font-normal uppercase tracking-tight">
            {type === 'ADD_GROUP' ? 'Create New Group' : 
             type === 'ADD_SECTION' ? 'Create New Section' : 
             type === 'ADD_ATTRIBUTE' ? 'Add Attribute' : 'Edit Attribute'}
          </h3>
          <p className="text-[10px] text-gray-400 font-normal uppercase tracking-widest">
            {isSystem ? 'System Attribute (Core fields non-editable)' : 'Category Level Master Data'}
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-300 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10 text-left">
        {type === 'ADD_ATTRIBUTE' && step === 'choice' ? (
          <div className="grid grid-cols-1 gap-6">
            <button 
              onClick={() => { setStep('form'); }}
              className="group p-8 border-2 border-gray-100 rounded-[32px] hover:border-[#FF7A59] hover:bg-[#FF7A59]/5 transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#FF7A59] transition-colors">
                <PackageSearch className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base text-gray-900 font-normal uppercase tracking-tight">Add Existing Attribute</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-normal uppercase tracking-widest">Search master registry and specialize it for this category context.</p>
              </div>
            </button>
            <button 
              onClick={() => { setStep('form'); }}
              className="group p-8 border-2 border-gray-100 rounded-[32px] hover:border-[#FF7A59] hover:bg-[#FF7A59]/5 transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#FF7A59] transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base text-gray-900 font-normal uppercase tracking-tight">Create New Attribute</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-normal uppercase tracking-widest">Define a unique attribute from scratch for this category.</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-8 pb-10">
            {type === 'ADD_GROUP' && (
              <>
                <Field label="Category Context" locked>
                   <input className="w-full px-5 py-4 bg-gray-100 border border-gray-100 rounded-2xl text-sm text-gray-500 cursor-not-allowed" value={data?.categoryName} disabled />
                </Field>
                <Field label="Group Name" required>
                  <input 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value, slug: slugify(e.target.value) })}
                    placeholder="e.g. Dimensions & Geometry"
                  />
                </Field>
                <Field label="Group Slug" required>
                  <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-mono text-gray-400" value={formData.slug} onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })} />
                </Field>
                <Field label="Description">
                  <textarea className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm min-h-[100px]" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Display Order">
                    <input type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} />
                  </Field>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl mt-6">
                    <span className="text-[10px] text-gray-600 font-normal uppercase tracking-widest">Status Toggle</span>
                    <ToggleSwitch active={formData.status === 'Active'} onClick={() => setFormData({ ...formData, status: formData.status === 'Active' ? 'Inactive' : 'Active' })} />
                  </div>
                </div>
              </>
            )}

            {type === 'ADD_SECTION' && (
              <>
                <Field label="Section Name" required>
                  <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value, slug: slugify(e.target.value) })} />
                </Field>
                <Field label="Section Slug" required>
                  <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-mono text-gray-400" value={formData.slug} onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })} />
                </Field>
                <Field label="Section Type">
                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm appearance-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                    <option>Master Data</option>
                    <option>Transactional Data</option>
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Display Order">
                    <input type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} />
                  </Field>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl mt-6">
                    <span className="text-[10px] text-gray-600 font-normal uppercase tracking-widest">Active Toggle</span>
                    <ToggleSwitch active={formData.active} onClick={() => setFormData({ ...formData, active: !formData.active })} />
                  </div>
                </div>
              </>
            )}

            {(type === 'ADD_ATTRIBUTE' || type === 'EDIT_ATTRIBUTE') && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Attribute Name" required className="col-span-2">
                    <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value, displayName: e.target.value, slug: isSystem ? formData.slug : slugify(e.target.value) })} disabled={isSystem} />
                  </Field>
                  <Field label="Display Name" required>
                    <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm" value={formData.displayName} onChange={e => setFormData({ ...formData, displayName: e.target.value })} />
                  </Field>
                  <Field label="Slug" required>
                    <input className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-mono text-gray-400" value={formData.slug} onChange={e => setFormData({ ...formData, slug: isSystem ? formData.slug : slugify(e.target.value) })} disabled={isSystem} />
                  </Field>
                </div>
                <Field label="Data Type">
                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm appearance-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} disabled={isSystem}>
                    <option>String</option>
                    <option>Number</option>
                    <option>Boolean</option>
                    <option>Enum</option>
                    <option>Text</option>
                  </select>
                </Field>
                
                {formData.type === 'Number' && (
                  <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-[24px]">
                    <span className="text-[10px] text-gray-600 font-normal uppercase tracking-widest">Has Unit?</span>
                    <div className="flex items-center gap-4">
                      <input className="w-20 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-center" placeholder="e.g. mm" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
                      <ToggleSwitch active={!!formData.unit} onClick={() => {}} />
                    </div>
                  </div>
                )}

                {formData.type === 'Enum' && (
                  <Field label="Enum Values (Dynamic Chips)">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {formData.enumValues?.map((v: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-[#FF7A59]/10 text-[#FF7A59] border border-[#FF7A59]/20 rounded-full text-[10px] font-normal uppercase tracking-widest flex items-center gap-2">
                            {v}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => setFormData({ ...formData, enumValues: formData.enumValues.filter((_: any, idx: number) => idx !== i) })} />
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          id="enum-input" 
                          className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm" 
                          placeholder="Type and press Enter..." 
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                setFormData({ ...formData, enumValues: [...(formData.enumValues || []), val] });
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Field>
                )}

                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400 font-normal uppercase tracking-widest">Behavior Settings</p>
                  <div className="grid grid-cols-2 gap-4">
                    <BehaviorToggle label="Required" active={formData.isRequired} onClick={() => setFormData({ ...formData, isRequired: !formData.isRequired })} />
                    <BehaviorToggle label="Variant" active={formData.isVariant} onClick={() => setFormData({ ...formData, isVariant: !formData.isVariant })} />
                    <BehaviorToggle label="Filterable" active={formData.isFilterable} onClick={() => setFormData({ ...formData, isFilterable: !formData.isFilterable })} />
                    <BehaviorToggle label="Comparable" active={formData.isComparable} onClick={() => setFormData({ ...formData, isComparable: !formData.isComparable })} />
                    <BehaviorToggle label="Priceable" active={formData.isPriceable} onClick={() => setFormData({ ...formData, isPriceable: !formData.isPriceable })} />
                  </div>
                </div>

                <Field label="Data Classification">
                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm appearance-none" value={formData.classification} onChange={e => setFormData({ ...formData, classification: e.target.value })}>
                    <option>Master Data</option>
                    <option>Transactional Data</option>
                  </select>
                </Field>
              </>
            )}
          </div>
        )}
      </div>

      <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/30 flex items-center justify-end gap-4 shrink-0">
        <button onClick={onClose} className="px-8 py-3.5 text-gray-400 hover:text-gray-600 text-[10px] font-normal uppercase tracking-[0.2em] transition-colors cursor-pointer">Cancel</button>
        <button 
          onClick={handleSave} 
          className="px-12 py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-normal uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-black transition-all cursor-pointer"
        >
          {type.includes('ADD') ? 'Create' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, required, locked, children, className = '' }: { label: string, required?: boolean, locked?: boolean, children: React.ReactNode, className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] text-gray-400 font-normal uppercase tracking-widest ml-1 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>} {locked && <CheckSquare className="w-3 h-3 text-gray-300" />}
      </label>
      {children}
    </div>
  );
}

function BehaviorToggle({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white transition-all group">
      <span className="text-[10px] text-gray-600 font-normal uppercase tracking-widest">{label}</span>
      <ToggleSwitch active={active} onClick={onClick} />
    </div>
  );
}
