import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Upload, Edit3, Trash2, MoreVertical, Search, Check, ChevronUp, Layers, LayoutGrid, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { CategoryImageUpload } from './category-image-upload';

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  children?: Category[];
}

// Helper function to build category tree from paths
function buildCategoryTree(paths: string[]): Category[] {
  const root: { [key: string]: any } = {};
  
  paths.forEach(path => {
    const parts = path.split('/').filter(p => p);
    let current = root;
    
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = { children: {} };
      }
      current = current[part].children;
    });
  });
  
  function convertToCategories(node: any, parentPath = ''): Category[] {
    return Object.keys(node).map(key => {
      const path = parentPath ? `${parentPath}/${key}` : key;
      const children = node[key].children;
      const category: Category = {
        id: path,
        name: key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      };
      
      if (Object.keys(children).length > 0) {
        category.children = convertToCategories(children, path);
      }
      
      return category;
    });
  }
  
  return convertToCategories(root);
}

const categoryPaths = [
  '/access-systems',
  '/carpet',
  '/carpet/soft-flooring',
  '/carpet/soft-flooring/carpet-flooring',
  '/carpet/soft-flooring/fabric-textile-flooring',
  '/carpet/resilient-flooring',
  '/carpet/resilient-flooring/rubber-flooring',
  '/carpet/resilient-flooring/cork-flooring',
  '/carpet/resilient-flooring/linoleum-flooring',
  '/electrical',
  '/electrical/electric-poles',
  '/electrical/electric-poles/desginer-poles',
  '/electrical/electric-poles/desginer-poles/decorative-street-poles',
  '/electrical/electric-poles/desginer-poles/ornamental-lighting-poles',
  '/electrical/electric-poles/desginer-poles/architectural-designer-poles',
  '/electrical/electric-poles/desginer-poles/custom-artistic-poles',
  '/electrical/electric-poles/desginer-poles/ledsmart-lighting-poles',
  '/electrical/electric-poles/lattice-steel-towers',
  '/electrical/electric-poles/lattice-steel-towers/high-tension-transmission-towers',
  '/electrical/electric-poles/lattice-steel-towers/telecom-lattice-towers',
  '/electrical/electric-poles/lattice-steel-towers/triangularrectangular-lattice-towers',
  '/electrical/electric-poles/lattice-steel-towers/galvanized-steel-towers',
  '/electrical/electric-poles/lattice-steel-towers/modular-lattice-towers',
  '/electrical/electric-poles/rail-steel-poles',
  '/electrical/electric-poles/rcc-poles',
  '/electrical/electric-poles/rolled-steel-poles',
  '/electrical/electric-poles/tubular-steel-poles',
  '/electrical/electric-poles/wooden-poles',
  '/electrical/electrical-earthing',
  '/electrical/electrical-earthing/earthing-system',
  '/electrical/electrical-lights-fixtures',
  '/electrical/electrical-lights-fixtures/lighting',
  '/electrical/electrical-lights-fixtures/street-lights',
  '/electrical/electrical-switchgears',
  '/electrical/electrical-switchgears/circuit-breakers',
  '/electrical/electrical-switchgears/switchgears',
  '/electrical/electrical-wires-cables',
  '/electrical/electrical-dbs-mdbs',
  '/electrical/electrical-dbs-mdbs/distribution-boards',
  '/electrical/electrical-dbs-mdbs/electrical-boxes',
  '/electrical/electrical-panels',
  '/electrical/electrical-panels/ht-switchboards',
  '/electrical/electrical-panels/lt-switchboards',
  '/electrical/electrical-pipes-fittings',
  '/electrical/electrical-pipes-fittings/ms-pipes-fittings',
  '/electrical/electrical-pipes-fittings/pvc-pipes-fittings',
  '/electrical/electrical-equipment',
  '/electrical/electrical-equipment/generator-components',
  '/electrical/electrical-equipment/generators',
  '/electrical/electrical-equipment/transformers',
  '/engineered-stone',
  '/engineered-stone/quartz',
  '/engineered-stone/quartz/corian-quartz',
  '/engineered-stone/quartz/dekton-quartz',
  '/engineered-stone/quartz/one-quartz',
  '/engineered-stone/quartz/silestone-quartz',
  '/engineered-stone/quartz/viatera-quartz',
  '/engineered-stone/solid-surface',
  '/engineered-stone/solid-surface/corian-solid-surface',
  '/engineered-stone/solid-surface/hi-macs-solid-surface',
  '/engineered-stone/solid-surface/livingstone-solid-surface',
  '/engineered-stone/terrazzo',
  '/engineered-stone/terrazzo/terrazzo-tiles',
  '/engineered-stone/terrazzo/terrazzo-slabs',
  '/engineered-stone/terrazzo/precast-terrazzo-panels',
  '/engineered-stone/terrazzo/epoxy-terrazzo-flooring',
  '/engineered-stone/terrazzo/polished-terrazzo-products',
  '/engineered-stone/terrazzo/coloredpatterned-terrazzo-panels',
  '/engineered-stone/agglomerated-marble',
  '/engineered-stone/sintered-stone',
  '/fabric',
  '/fabric/natural-fibers',
  '/fabric/natural-fibers/cotton',
  '/fabric/natural-fibers/linen-flax',
  '/fabric/natural-fibers/wool',
  '/fabric/natural-fibers/silk',
  '/fabric/natural-fibers/jute',
  '/fabric/natural-fibers/hemp',
  '/fabric/natural-fibers/coir',
  '/fabric/natural-fibers/bamboo',
  '/fabric/synthetic-fibers',
  '/fabric/synthetic-fibers/polyester',
  '/fabric/synthetic-fibers/nylon',
  '/fabric/synthetic-fibers/acrylic',
  '/fabric/synthetic-fibers/olefin-polypropylene',
  '/fabric/synthetic-fibers/spandex-elastane',
  '/fabric/synthetic-fibers/rayon-semi-synthetic',
  '/fabric/blended-fabrics',
  '/fabric/blended-fabrics/poly-cotton-polyester-cotton',
  '/fabric/blended-fabrics/wool-blends-wool-nylonacrylic',
  '/fabric/blended-fabrics/silk-blends-silk-cottonpolyester',
  '/fabric/blended-fabrics/linen-blends-linen-cottonpolyester',
  '/fabric/blended-fabrics/spandex-blends-cottonpolyester-spandex',
  '/fabric/performance-fabrics',
  '/fabric/performance-fabrics/stain-resistant-fabrics',
  '/fabric/performance-fabrics/waterproofwater-resistant-fabrics',
  '/fabric/performance-fabrics/fire-retardant-fabrics',
  '/fabric/performance-fabrics/uv-resistant-fabrics',
  '/fabric/performance-fabrics/anti-microbial-fabrics',
  '/fabric/performance-fabrics/wrinkle-resistant-fabrics',
  '/fabric/performance-fabrics/high-durability-upholstery-fabrics',
  '/fabric/specialty-fabrics',
  '/fabric/specialty-fabrics/technical-textiles-industrial-medical-geotextiles',
  '/fabric/specialty-fabrics/smart-fabrics-with-sensorsconductive-fibers',
  '/fabric/specialty-fabrics/luxury-fabrics-velvet-brocade-jacquard',
  '/fabric/specialty-fabrics/eco-friendly-fabrics-organic-cotton-recycled-polyester',
  '/fabric/specialty-fabrics/non-woven-fabrics-felt-interfacing',
  '/furniture',
  '/glass',
  '/glass/float-glass',
  '/glass/float-glass/clear-float-glass',
  '/glass/float-glass/tinted-float-glass',
  '/glass/float-glass/low-iron-float-glass',
  '/glass/float-glass/reflective-float-glass',
  '/glass/decorative-glass',
  '/glass/decorative-glass/sandblasted-glass',
  '/glass/decorative-glass/acid-etched-glass',
  '/glass/decorative-glass/frosted-glass',
  '/glass/decorative-glass/patterned-textured-glass',
  '/glass/processed-glass',
  '/glass/processed-glass/tempered-toughened-glass',
  '/glass/processed-glass/laminated-glass',
  '/glass/processed-glass/insulated-igu-glass',
  '/glass/processed-glass/heat-strengthened-glass',
  '/glass/speciality-glass',
  '/glass/speciality-glass/fire-rated-glass',
  '/glass/speciality-glass/bulletproof-security-glass',
  '/glass/speciality-glass/smart-switchable-glass',
  '/glass/speciality-glass/anti-glare-uv-filtering-glass',
  '/hardware',
  '/hardware/brackets',
  '/hardware/brackets/angle-brackets',
  '/hardware/brackets/shelf-brackets',
  '/hardware/brackets/heavy-duty-support-brackets',
  '/hardware/brackets/decorative-brackets',
  '/hardware/brackets/adjustable-brackets',
  '/hardware/latches-bolts',
  '/hardware/latches-bolts/tower-bolts',
  '/hardware/latches-bolts/barrel-bolts',
  '/hardware/latches-bolts/surface-bolts',
  '/hardware/latches-bolts/flush-bolts',
  '/hardware/latches-bolts/latches-spring-gravity-magnetic',
  '/hardware/door-closers',
  '/hardware/door-closers/hydraulic-closers',
  '/hardware/door-closers/overhead-door-closers',
  '/hardware/door-closers/concealed-closers',
  '/hardware/door-closers/floor-spring-closers',
  '/hardware/door-closers/electromagnetic-closers',
  '/hardware/sliding-system',
  '/hardware/door-accessories',
  '/hardware/handles-knobs',
  '/hardware/locks',
  '/hardware/digital-locks',
  '/hardware/sliders-runners',
  '/hardware/furniture-hardware',
  '/hardware/glass-facade-structural',
  '/hardware/glass-floor-stair-fixings',
  '/hardware/suspension-fittings',
  '/hardware/hinges',
  '/hardware/adhesives',
  '/hardware/sealants',
  '/hardware/wood-finish-treatment',
  '/lignocellulose-wood-others',
  '/lignocellulose-wood-others/bamboo',
  '/lignocellulose-wood-others/rattan-cane',
  '/lignocellulose-wood-others/jute',
  '/lignocellulose-wood-others/coir',
  '/lignocellulose-wood-others/cork',
  '/lignocellulose-wood-others/palm-areca',
  '/lignocellulose-wood-others/coconut-shell',
  '/wood',
  '/wood/solid-wood',
  '/wood/solid-wood/indian-origin',
  '/wood/solid-wood/indian-origin/indian-origin-hardwoods',
  '/wood/solid-wood/indian-origin/indian-origin-softwoods',
  '/wood/solid-wood/indian-origin/indian-origin-decorative-exotic-woods',
  '/wood/solid-wood/african-origin',
  '/wood/solid-wood/african-origin/african-origin-hardwoods',
  '/wood/solid-wood/african-origin/african-origin-softwoods',
  '/wood/solid-wood/african-origin/african-origin-decorative-exotic-woods',
  '/wood/solid-wood/european-origin',
  '/wood/solid-wood/european-origin/european-origin-hardwoods',
  '/wood/solid-wood/european-origin/european-origin-softwoods',
  '/wood/solid-wood/european-origin/european-origin-decorative-exotic-woods',
  '/wood/solid-wood/north-american-origin',
  '/wood/solid-wood/north-american-origin/north-american-origin-hardwoods',
  '/wood/solid-wood/north-american-origin/north-american-origin-softwoods',
  '/wood/solid-wood/north-american-origin/north-american-origin-decorative-exotic-woods',
  '/wood/solid-wood/south-american-origin',
  '/wood/solid-wood/south-american-origin/south-american-origin-hardwoods',
  '/wood/solid-wood/south-american-origin/south-american-origin-softwoods',
  '/wood/solid-wood/south-american-origin/south-american-origin-decorative-exotic-woods',
  '/wood/solid-wood/australian-origin',
  '/wood/solid-wood/australian-origin/australian-origin-hardwoods',
  '/wood/solid-wood/australian-origin/australian-origin-softwoods',
  '/wood/solid-wood/australian-origin/australian-origin-decorative-exotic-woods',
  '/wood/solid-wood/southeast-asian-origin',
  '/wood/solid-wood/southeast-asian-origin/southeast-asian-origin-hardwoods',
  '/wood/solid-wood/southeast-asian-origin/southeast-asian-origin-softwoods',
  '/wood/solid-wood/southeast-asian-origin/southeast-asian-origin-decorative-exotic-woods',
  '/wood/plywood-boards',
  '/wood/plywood-boards/plywood',
  '/wood/plywood-boards/plywood/hardwood-plywood',
  '/wood/plywood-boards/plywood/softwood-plywood',
  '/wood/plywood-boards/plywood/mixed-core-plywood',
  '/wood/plywood-boards/plywood/bwp-boiling-water-proof-ply-or-marine-ply',
  '/wood/plywood-boards/plywood/mr-moisture-resistant-ply',
  '/wood/plywood-boards/plywood/flexible-plywood',
  '/wood/plywood-boards/plywood/shuttering-plywood',
  '/wood/plywood-boards/plywood/fire-retardant-plywood',
  '/wood/plywood-boards/plywood/pre-laminated-plywood',
  '/wood/plywood-boards/plywood/calibrated-plywood',
  '/wood/plywood-boards/plywood/veneered-plywood',
  '/wood/plywood-boards/blockboard',
  '/wood/plywood-boards/mdf',
  '/wood/plywood-boards/mdf/plain-mdf',
  '/wood/plywood-boards/mdf/pre-laminated-mdf',
  '/wood/plywood-boards/mdf/exterior-grade-mdf',
  '/wood/plywood-boards/mdf/moisture-resistant-mdf',
  '/wood/plywood-boards/mdf/carb-certified-mdf',
  '/wood/plywood-boards/particle-board',
  '/wood/plywood-boards/particle-board/plain-particle-board',
  '/wood/plywood-boards/particle-board/pre-laminated-particle-board',
  '/wood/plywood-boards/particle-board/exterior-grade-particle-board',
  '/wood/plywood-boards/particle-board/high-density-particle-board',
  '/wood/plywood-boards/hdf',
  '/wood/plywood-boards/hdhmr',
  '/wood/plywood-boards/osb',
  '/wood/plywood-boards/pre-laminated-board',
  '/wood/plywood-boards/wood-plastic-composite-wpc',
  '/wood/wood-veneer',
  '/wood/wood-veneer/natural-veneer',
  '/wood/wood-veneer/natural-veneer/rotary-cut',
  '/wood/wood-veneer/natural-veneer/plain-sliced',
  '/wood/wood-veneer/natural-veneer/quarter-sliced',
  '/wood/wood-veneer/natural-veneer/rift-cut',
  '/wood/wood-veneer/engineered-veneer',
  '/wood/wood-veneer/engineered-veneer/paper-backed',
  '/wood/wood-veneer/engineered-veneer/phenolic-backed',
  '/wood/wood-veneer/engineered-veneer/burl-veneer',
  '/wood/wood-veneer/engineered-veneer/dyed-veneer',
  '/wood/wood-laminates',
  '/wood/wood-laminates/standard-laminates',
  '/wood/wood-laminates/standard-laminates/standard-laminates',
  '/wood/wood-laminates/industrial-laminates',
  '/wood/wood-laminates/industrial-laminates/high-pressure-laminates-hpl',
  '/wood/wood-laminates/industrial-laminates/low-pressure-laminates-lpl',
  '/wood/wood-panel',
  '/wood/wood-panel/solid-wood-panels',
  '/wood/wood-panel/engineered-wood-panels',
  '/wood/wood-panel/laminated-wood-panels',
  '/wood/wood-flooring',
  '/wood/wood-flooring/soild-hardwood-flooring',
  '/wood/wood-flooring/soild-hardwood-flooring/strip-hardwood-flooring',
  '/wood/wood-flooring/soild-hardwood-flooring/plank-hardwood-flooring',
  '/wood/wood-flooring/soild-hardwood-flooring/parquet-flooring',
  '/wood/wood-flooring/engineered-wood-flooring',
  '/wood/wood-flooring/engineered-wood-flooring/plywood-core',
  '/wood/wood-flooring/engineered-wood-flooring/softwood-core',
  '/wood/wood-flooring/engineered-wood-flooring/wear-layer-thickness',
  '/wood/wood-flooring/engineered-wood-flooring/hdf-high-density-fiberboard-core-engineered-wood',
  '/wood/wood-flooring/engineered-wood-flooring/wear-layer-cut-type',
  '/wood/wood-flooring/laminate-wood-flooring',
  '/wood/wood-flooring/laminate-wood-flooring/ac-abrasion-class-ac3-ac4-ac5',
  '/wood/wood-flooring/laminate-wood-flooring/water-resistant-laminate',
  '/wood/wood-flooring/laminate-wood-flooring/embossedtextured-laminate',
  '/wood/wood-flooring/reclaimed-wood-flooring',
  '/wood/wood-flooring/reclaimed-wood-flooring/barn-wood-flooring',
  '/wood/wood-flooring/reclaimed-wood-flooring/reclaimed-oak-flooring',
  '/wood/wood-flooring/specialty-wood-flooring',
  '/wood/wood-flooring/specialty-wood-flooring/access-panel-wood-flooring',
  '/wood/wood-decking',
  '/wood/wood-decking/hardwood-decking',
  '/wood/wood-decking/hardwood-decking/ipe-decking',
  '/wood/wood-decking/hardwood-decking/teak-decking',
  '/wood/wood-decking/hardwood-decking/cumaru-decking',
  '/wood/wood-decking/hardwood-decking/garapa-decking',
  '/wood/wood-decking/hardwood-decking/red-balau-decking',
  '/wood/wood-decking/hardwood-decking/tigerwood-decking',
  '/wood/wood-decking/thermally-modified-wood-decking',
  '/wood/wood-decking/thermally-modified-wood-decking/thermally-modified-ash-decking',
  '/wood/wood-decking/thermally-modified-wood-decking/thermally-modified-pine-decking',
  '/wood/wood-decking/redwood-decking',
  '/wood/wood-decking/redwood-decking/clear-all-heart-redwood',
  '/wood/wood-decking/redwood-decking/construction-common-redwood',
  '/wood/wood-decking/cedar-decking',
  '/wood/wood-decking/cedar-decking/western-red-cedar-decking',
  '/wood/wood-decking/cedar-decking/alaskan-yellow-cedar-decking',
  '/wood/wood-decking/pressure-treated-wood-decking',
  '/wood/wood-decking/pressure-treated-wood-decking/southern-yellow-pine-syp-decking',
  '/wood/wood-decking/pressure-treated-wood-decking/douglas-fir-decking',
  '/wood/wood-decking/pressure-treated-wood-decking/cedar-tone-pressure-treated',
  '/wood/wood-cladding',
  '/wood/wood-cladding/solid-wood-cladding',
  '/wood/wood-cladding/engineered-wood-cladding',
  '/wood/wood-cladding/treated-wood-cladding',
];

const mockCategories: Category[] = buildCategoryTree(categoryPaths);

// Pre-populate some images for the demo
const carpetCategory = mockCategories.find(c => c.name === 'Carpet');
if (carpetCategory) {
  carpetCategory.imageUrl = 'https://images.unsplash.com/photo-1761655488212-401d0558400c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJwZXQlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MDI5MjU5OHww&ixlib=rb-4.1.0&q=80&w=1080';
}
const electricalCategory = mockCategories.find(c => c.name === 'Electrical');
if (electricalCategory) {
  electricalCategory.imageUrl = 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nfGVufDF8fHx8MTc3MDI5MjU5OHww&ixlib=rb-4.1.0&q=80&w=1080';
}

const attributeGroups = [
  {
    id: 'dim-geom',
    name: 'Dimensions & Geometry',
    description: 'Physical dimensional master schema',
    sections: 3,
    attributes: 12,
  },
  {
    id: 'phys-prop',
    name: 'Physical Properties',
    description: 'Inherent material characteristics',
    sections: 2,
    attributes: 8,
  },
  {
    id: 'vis-aes',
    name: 'Visual & Aesthetics',
    description: 'Surface finish and visual parameters',
    sections: 4,
    attributes: 15,
  },
  {
    id: 'perf-met',
    name: 'Performance Metrics',
    description: 'Measured efficiency standards',
    sections: 3,
    attributes: 10,
  },
  {
    id: 'cert-comp',
    name: 'Certifications & Compliance',
    description: 'Regulatory standards and badges',
    sections: 2,
    attributes: 6,
  },
  {
    id: 'const-det',
    name: 'Construction Details',
    description: 'Structural and assembly parameters',
    sections: 3,
    attributes: 9,
  },
];

export function CategoriesView() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['access-systems']));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set(['dim-geom', 'phys-prop']));
  const [groupSearch, setGroupSearch] = useState('');
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const [groupError, setGroupError] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const findCategoryById = (items: Category[], id: string): Category | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findCategoryById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const getBreadcrumb = (id: string) => {
    const parts = id.split('/').filter(p => p);
    return parts.map(part => 
      part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    );
  };

  const currentCategory = selectedCategory ? findCategoryById(categories, selectedCategory) : null;
  const breadcrumbParts = selectedCategory ? getBreadcrumb(selectedCategory) : [];

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!categoryToDelete) return;

    const deleteCategoryFromTree = (items: Category[]): Category[] => {
      return items.filter(item => {
        if (item.id === categoryToDelete) {
          return false;
        }
        if (item.children) {
          item.children = deleteCategoryFromTree(item.children);
        }
        return true;
      });
    };

    setCategories(deleteCategoryFromTree(categories));
    if (selectedCategory === categoryToDelete) {
      setSelectedCategory(null);
    }
    toast.success('Category deleted successfully');
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const updateCategoryInTree = (items: Category[], id: string, updates: Partial<Category>): Category[] => {
    return items.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      if (item.children) {
        return { ...item, children: updateCategoryInTree(item.children, id, updates) };
      }
      return item;
    });
  };

  const handleImageChange = (url: string | undefined) => {
    if (!selectedCategory) return;
    setCategories(prev => updateCategoryInTree(prev, selectedCategory, { imageUrl: url }));
    toast.success(url ? 'Image uploaded successfully' : 'Image removed');
  };

  const toggleGroup = (id: string) => {
    setSelectedGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setGroupError(false);
  };

  const filteredGroups = attributeGroups.filter(group => 
    group.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const handleSaveChanges = () => {
    if (selectedGroupIds.size === 0) {
      setGroupError(true);
      toast.error('Please select at least one attribute group.');
      return;
    }
    toast.success('Category saved successfully');
    setIsEditMode(false);
    setGroupError(false);
  };

  const renderCategory = (category: Category, depth: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;

    const depthStyles = {
      0: 'text-sm font-normal text-gray-900',
      1: 'text-sm text-gray-700',
      2: 'text-xs text-gray-600',
    };
    
    const textStyle = depthStyles[Math.min(depth, 2) as keyof typeof depthStyles];
    const hoverBg = depth === 0 ? 'hover:bg-gray-100' : depth === 1 ? 'hover:bg-gray-50' : 'hover:bg-gray-50/50';

    return (
      <div key={category.id}>
        <div className="group relative flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory(category.id);
              if (hasChildren) toggleExpand(category.id);
            }}
            className={`flex-1 flex items-center gap-2 px-3 py-2 pr-20 rounded-lg transition-colors min-w-0 font-normal ${
              isSelected 
                ? 'bg-[#FF7A59]/5 text-[#FF7A59]' 
                : `${hoverBg}`
            }`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            {hasChildren && (
              isExpanded ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
            {!hasChildren && <div className="w-4 flex-shrink-0" />}
            <span 
              className={`${textStyle} flex-1 text-left leading-relaxed break-words font-['Satoshi'] font-normal`}
              title={category.name}
            >
              {category.name}
            </span>
          </button>

          <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(category.id);
                setIsEditMode(true);
                setEditedName(category.name);
                setEditedDescription('');
              }}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#FF7A59] transition-colors flex-shrink-0 font-normal"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => handleDeleteClick(category.id, e)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors flex-shrink-0 font-normal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {hasChildren && isExpanded && category.children?.map((child) => renderCategory(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="font-['Satoshi'] font-normal h-full bg-white">
      <div className="flex h-full flex-col lg:flex-row font-normal">
        {/* Category Tree Panel */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white font-normal overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 space-y-3 font-normal">
            <button 
              onClick={() => setAddDialogOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF7A59] text-white rounded-lg hover:bg-[#FF7A59]/90 transition-colors uppercase tracking-widest text-xs font-normal cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs font-normal cursor-pointer">
              <Upload className="w-4 h-4" />
              Import CSV
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 font-normal">
            {categories.map((category) => renderCategory(category))}
          </div>
        </div>

        {/* Category Editor */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50 font-normal custom-scrollbar">
          {selectedCategory ? (
            <div className="space-y-8 max-w-3xl font-normal">
              {/* Breadcrumb */}
              <div className="text-xs text-gray-400 font-normal uppercase tracking-widest flex items-center gap-2">
                {breadcrumbParts.map((part, index) => (
                  <span key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-200">/</span>}
                    <span className={index === breadcrumbParts.length - 1 ? "text-gray-900" : "text-gray-400"}>{part}</span>
                  </span>
                ))}
              </div>

              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-normal">
                <input
                  type="text"
                  value={isEditMode ? editedName : currentCategory?.name ?? ''}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-2xl border-none outline-none focus:outline-none p-0 bg-transparent text-gray-900 font-normal w-full sm:w-auto"
                  placeholder="Category name"
                />
                <button 
                  onClick={handleSaveChanges}
                  className="px-6 py-2.5 bg-[#FF7A59] text-white rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap uppercase tracking-widest text-xs font-normal cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              {/* Category Content */}
              <div className="space-y-8 font-normal bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <CategoryImageUpload 
                  imageUrl={currentCategory?.imageUrl}
                  onImageChange={handleImageChange}
                  categoryName={currentCategory?.name ?? ''}
                />

                <div className="border-t border-gray-100 pt-8 font-normal">
                  <label className="block text-xs font-normal text-gray-400 uppercase tracking-widest mb-3">Description</label>
                  <textarea
                    value={isEditMode ? editedDescription : ''}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder={`Description for ${currentCategory?.name ?? 'this category'}`}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#FF7A59] transition-all resize-none font-normal min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-normal border-t border-gray-100 pt-8">
                  <div>
                    <label className="block text-xs font-normal text-gray-400 uppercase tracking-widest mb-3">Parent Category</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#FF7A59] transition-all font-normal appearance-none cursor-pointer">
                      <option>None (Root Category)</option>
                      {breadcrumbParts.length > 1 && (
                        <option selected>{breadcrumbParts.slice(0, -1).join(' / ')}</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Attribute Groups Multi-Select */}
                <div className="border-t border-gray-100 pt-8 font-normal">
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer group/header"
                    onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-normal text-gray-400 uppercase tracking-widest">Attribute Groups</label>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-normal ${selectedGroupIds.size > 0 ? 'bg-[#FF7A59]/10 text-[#FF7A59]' : 'bg-gray-100 text-gray-400'}`}>
                          {selectedGroupIds.size} Groups Selected
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-normal mt-1">Select one or more predefined attribute groups that should apply to this category.</p>
                    </div>
                    {isGroupsExpanded ? <ChevronUp className="w-4 h-4 text-gray-300 group-hover/header:text-gray-900 transition-colors" /> : <ChevronDown className="w-4 h-4 text-gray-300 group-hover/header:text-gray-900 transition-colors" />}
                  </div>

                  {isGroupsExpanded && (
                    <div className="space-y-4">
                      <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within/search:text-[#FF7A59] transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Search groups..."
                          value={groupSearch}
                          onChange={(e) => setGroupSearch(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-normal focus:outline-none focus:border-[#FF7A59] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredGroups.map((group) => {
                          const isSelected = selectedGroupIds.has(group.id);
                          return (
                            <div 
                              key={group.id}
                              onClick={() => toggleGroup(group.id)}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 relative group/card ${
                                isSelected 
                                  ? 'bg-[#FF7A59]/5 border-[#FF7A59]/30 shadow-sm shadow-[#FF7A59]/5' 
                                  : 'bg-white border-gray-100 hover:border-gray-200'
                              }`}
                            >
                              <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                isSelected ? 'bg-[#FF7A59] border-[#FF7A59]' : 'bg-white border-gray-200 group-hover/card:border-gray-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                              </div>
                              <div className="flex-1 space-y-1">
                                <h4 className={`text-sm font-normal uppercase tracking-tight ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {group.name}
                                </h4>
                                <p className="text-[11px] text-gray-400 font-normal leading-relaxed">
                                  {group.description}
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-widest flex items-center gap-1.5">
                                    <Layers className="w-3 h-3" /> {group.sections} Sections
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-widest flex items-center gap-1.5">
                                    <LayoutGrid className="w-3 h-3" /> {group.attributes} Attributes
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {groupError && (
                        <p className="text-[11px] text-red-500 font-normal uppercase tracking-widest flex items-center gap-1.5 px-2">
                          <AlertTriangle className="w-3 h-3" /> Please select at least one attribute group.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-normal">
                  <div>
                    <label className="block text-xs font-normal text-gray-400 uppercase tracking-widest mb-3">Associated Products</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 font-normal">
                      24 Active Products
                    </div>
                  </div>
                </div>

                <div className="font-normal">
                  <label className="block text-xs font-normal text-gray-400 uppercase tracking-widest mb-3">Category Path</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-400 font-mono font-normal">
                    {selectedCategory}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center font-normal">
              <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <Plus className="w-8 h-8 text-[#FF7A59]" />
              </div>
              <h3 className="text-xl font-normal text-gray-900 uppercase tracking-tight mb-2">Select a category</h3>
              <p className="text-sm text-gray-500 max-w-xs font-normal">
                Click on a category from the tree on the left to manage its details and attributes.
              </p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white rounded-3xl border-none shadow-2xl p-8 font-normal">
          <AlertDialogHeader className="font-normal">
            <AlertDialogTitle className="text-xl font-normal text-gray-900 uppercase tracking-tight">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 font-normal">
              This action cannot be undone. This will permanently delete the category and all its subcategories.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="font-normal mt-8">
            <AlertDialogCancel className="px-6 py-2.5 rounded-xl text-xs font-normal uppercase tracking-widest border-gray-200 hover:bg-gray-50 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="px-6 py-2.5 rounded-xl text-xs font-normal uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
