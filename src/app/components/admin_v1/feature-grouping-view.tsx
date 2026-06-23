import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
  Package,
  Palette,
  Shield,
  Sparkles,
  Layers
} from 'lucide-react';

// --- Types ---

interface FeatureGroup {
  group_id: string;
  name: string;
  description: string;
  used_in_categories: number;
  status: 'active' | 'inactive';
  created_at: string;
  icon?: string;
}

// --- Mock Data ---

const mockFeatureGroups: FeatureGroup[] = [
  {
    group_id: 'FG001',
    name: 'Durability & Performance',
    description: 'Section for performance-related product highlights',
    used_in_categories: 14,
    status: 'active',
    created_at: '2024-01-10',
    icon: 'shield'
  },
  {
    group_id: 'FG002',
    name: 'Environmental Benefits',
    description: 'Describes sustainability and environmental advantages',
    used_in_categories: 8,
    status: 'active',
    created_at: '2024-01-15',
    icon: 'sparkles'
  },
  {
    group_id: 'FG003',
    name: 'Installation & Maintenance',
    description: 'Covers ease of installation and upkeep',
    used_in_categories: 10,
    status: 'active',
    created_at: '2024-02-01',
    icon: 'package'
  },
  {
    group_id: 'FG004',
    name: 'Design & Aesthetics',
    description: 'Highlights visual appeal and design flexibility',
    used_in_categories: 12,
    status: 'active',
    created_at: '2024-02-10',
    icon: 'palette'
  }
];

// --- Main Component ---

export function FeatureGroupingView() {
  const [featureGroups, setFeatureGroups] = useState<FeatureGroup[]>(mockFeatureGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<FeatureGroup | null>(null);

  // Filter groups based on search
  const filteredGroups = featureGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (group: FeatureGroup) => {
    setEditingGroup(group);
    setShowEditModal(true);
  };

  const handleDelete = (groupId: string) => {
    if (confirm('Are you sure you want to delete this feature group?')) {
      setFeatureGroups(prev => prev.filter(g => g.group_id !== groupId));
    }
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'package':
        return <Package className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-['Satoshi'] font-normal overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shrink-0">
        <h1 className="text-[20px] text-gray-900 font-normal mb-2">Feature Sections</h1>
        <p className="text-[12px] text-gray-500">
          Define reusable sections for product features.
        </p>
      </div>

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search feature groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all bg-white"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#FF6A3D] text-white rounded-xl text-[11px] uppercase tracking-wider hover:bg-[#FF5A2D] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Group
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[13px] text-gray-900 mb-2">No feature groups created yet</h3>
            <p className="text-[11px] text-gray-500 mb-4">Create your first feature group to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#FF6A3D] text-white rounded-lg text-[11px] uppercase tracking-wider hover:bg-[#FF5A2D] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Feature Group
            </button>
          </div>
        ) : (
          <div className="max-w-5xl space-y-4">
            {filteredGroups.map((group) => (
              <FeatureGroupCard
                key={group.group_id}
                group={group}
                onEdit={() => handleEdit(group)}
                onDelete={() => handleDelete(group.group_id)}
                getIcon={getIconComponent}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <FeatureGroupModal
          onClose={() => setShowAddModal(false)}
          onSave={(newGroup) => {
            setFeatureGroups(prev => [...prev, newGroup]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && editingGroup && (
        <FeatureGroupModal
          group={editingGroup}
          onClose={() => {
            setShowEditModal(false);
            setEditingGroup(null);
          }}
          onSave={(updatedGroup) => {
            setFeatureGroups(prev =>
              prev.map(g => g.group_id === updatedGroup.group_id ? updatedGroup : g)
            );
            setShowEditModal(false);
            setEditingGroup(null);
          }}
        />
      )}
    </div>
  );
}

// --- Feature Group Card ---

interface FeatureGroupCardProps {
  group: FeatureGroup;
  onEdit: () => void;
  onDelete: () => void;
  getIcon: (iconName?: string) => React.ReactNode;
}

function FeatureGroupCard({ group, onEdit, onDelete, getIcon }: FeatureGroupCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <button
            className="shrink-0 w-10 h-10 rounded-lg bg-[#FF6A3D]/10 text-[#FF6A3D] flex items-center justify-center hover:bg-[#FF6A3D]/20 transition-colors"
          >
            {getIcon(group.icon)}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <button onClick={onEdit} className="text-left flex-1">
                <h3 className="text-[13px] text-gray-900 font-normal uppercase tracking-wider mb-1">
                  {group.name}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {group.description}
                </p>
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onEdit}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-gray-500">
                Used in: <span className="text-gray-900 font-normal">{group.used_in_categories} Categories</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${
                group.status === 'active'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200'
              }`}>
                {group.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Feature Group Modal ---

interface FeatureGroupModalProps {
  group?: FeatureGroup;
  onClose: () => void;
  onSave: (group: FeatureGroup) => void;
}

function FeatureGroupModal({ group, onClose, onSave }: FeatureGroupModalProps) {
  const [name, setName] = useState(group?.name || '');
  const [description, setDescription] = useState(group?.description || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(group?.status || 'active');

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please provide a group name');
      return;
    }

    const newGroup: FeatureGroup = {
      group_id: group?.group_id || `FG${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      used_in_categories: group?.used_in_categories || 0,
      status,
      created_at: group?.created_at || new Date().toISOString().split('T')[0],
      icon: group?.icon || 'layers'
    };

    onSave(newGroup);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[13px] text-gray-900 uppercase tracking-wider">
            {group ? 'Edit Feature Group' : 'Add Feature Group'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Group Name */}
          <div>
            <label className="block text-[11px] text-gray-700 uppercase tracking-wider mb-2">
              Group Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Performance Features"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-gray-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this group represents..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF7A59]/10 focus:border-[#FF7A59] font-normal resize-none transition-all"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] text-gray-700 uppercase tracking-wider mb-2">
              Status
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStatus('active')}
                className={`px-4 py-2.5 rounded-lg text-[11px] uppercase tracking-wider ${
                  status === 'active'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatus('inactive')}
                className={`px-4 py-2.5 rounded-lg text-[11px] uppercase tracking-wider ${
                  status === 'inactive'
                    ? 'bg-gray-50 text-gray-700 border border-gray-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[11px] text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-[11px] text-white bg-[#FF6A3D] hover:bg-[#FF5A2D] rounded-lg uppercase tracking-wider transition-colors"
          >
            {group ? 'Update Group' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  );
}