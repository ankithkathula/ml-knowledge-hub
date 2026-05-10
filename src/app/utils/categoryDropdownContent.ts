// Detailed category dropdown content for hero navigation

export interface DropdownGroup {
  heading: string;
  items: string[];
}

export interface CategoryDropdownContent {
  [key: string]: DropdownGroup[];
}

export const CATEGORY_DROPDOWN_CONTENT: CategoryDropdownContent = {
  'building-materials': [
    {
      heading: 'CEMENT',
      items: ['Portland Cement', 'White Cement', 'Pozzolana Cement', 'Ready Mix Concrete', 'Fly Ash Cement']
    },
    {
      heading: 'STEEL',
      items: ['TMT Bars', 'MS Channels', 'MS Angles', 'Steel Plates', 'Wire Rods', 'Structural Steel']
    },
    {
      heading: 'BLOCKS & BRICKS',
      items: ['AAC Blocks', 'Red Bricks', 'Fly Ash Bricks', 'Concrete Blocks', 'Hollow Blocks']
    },
    {
      heading: 'CONCRETE',
      items: ['Ready Mix Concrete', 'Pre-Cast Concrete', 'Fiber Concrete', 'Lightweight Concrete']
    },
    {
      heading: 'CONSTRUCTION CHEMICALS',
      items: ['Waterproofing', 'Adhesives', 'Sealants', 'Grouts', 'Repair Mortars', 'Admixtures']
    },
    {
      heading: 'AGGREGATES',
      items: ['Coarse Aggregates', 'Fine Sand', 'M-Sand', 'Crushed Stone', 'River Sand']
    }
  ],
  'flooring': [
    {
      heading: 'CERAMIC TILES',
      items: ['Glazed Ceramic', 'Matte Finish', 'Glossy Finish', 'Anti-Skid', 'Designer Ceramic']
    },
    {
      heading: 'VITRIFIED TILES',
      items: ['Polished Vitrified', 'Double Charge', 'Full Body Vitrified', 'Glazed Vitrified', 'Nano Vitrified']
    },
    {
      heading: 'MARBLE & GRANITE',
      items: ['Italian Marble', 'Indian Marble', 'Granite Slabs', 'Engineered Stone', 'Quartz Slabs']
    },
    {
      heading: 'WOODEN FLOORING',
      items: ['Hardwood Flooring', 'Engineered Wood', 'Laminate Flooring', 'Vinyl Flooring', 'Bamboo Flooring']
    },
    {
      heading: 'CARPET & RUGS',
      items: ['Carpet Tiles', 'Vinyl Carpet', 'Artificial Grass', 'Indoor Carpet', 'Commercial Carpet']
    },
    {
      heading: 'SPECIALTY FLOORING',
      items: ['Epoxy Flooring', 'Sports Flooring', 'Anti-Static Flooring', 'Rubber Flooring']
    }
  ],
  'wall-finishes': [
    {
      heading: 'DISTEMPER',
      items: ['Dry Distemper', 'Oil Bound Distemper', 'Acrylic Distemper']
    },
    {
      heading: 'EMULSION',
      items: ['Interior Emulsion', 'Exterior Emulsion', 'Premium Emulsion', 'Washable Emulsion']
    },
    {
      heading: 'ENAMEL',
      items: ['Synthetic Enamel', 'Water-Based Enamel', 'High-Gloss Enamel', 'Satin Enamel', 'Matte Enamel']
    },
    {
      heading: 'TEXTURED COATS',
      items: ['Interior Textured', 'Exterior Textured', 'Asian Royale', 'Rustic Finish']
    },
    {
      heading: 'SPECIALTY PAINTS',
      items: ['Anti-Corrosive', 'Fire-Retardant', 'Anti-Fungal', 'Heat-Reflective', 'Floor Coatings']
    },
    {
      heading: 'PRIMERS & UNDERCOATS',
      items: ['Wall Primers', 'Wood Primers', 'Metal Primers', 'Universal Primer', 'Putty']
    }
  ],
  'lighting': [
    {
      heading: 'LED LIGHTING',
      items: ['LED Bulbs', 'LED Tubes', 'LED Panels', 'LED Downlights', 'LED Strip Lights']
    },
    {
      heading: 'DECORATIVE LIGHTING',
      items: ['Chandeliers', 'Pendant Lights', 'Wall Sconces', 'Table Lamps', 'Floor Lamps']
    },
    {
      heading: 'COMMERCIAL LIGHTING',
      items: ['Office Lighting', 'Industrial Lighting', 'Street Lights', 'Flood Lights', 'High Bay Lights']
    },
    {
      heading: 'OUTDOOR LIGHTING',
      items: ['Garden Lights', 'Pathway Lights', 'Facade Lighting', 'Security Lights', 'Solar Lights']
    },
    {
      heading: 'SMART LIGHTING',
      items: ['Smart Bulbs', 'Motion Sensor Lights', 'Dimmer Systems', 'Color Changing Lights']
    }
  ],
  'sanitary': [
    {
      heading: 'TAPS & FAUCETS',
      items: ['Basin Taps', 'Kitchen Taps', 'Shower Taps', 'Wall Mixers', 'Sensor Taps', 'Designer Faucets']
    },
    {
      heading: 'WASH BASINS',
      items: ['Table Top Basins', 'Wall Hung Basins', 'Pedestal Basins', 'Under Counter Basins', 'Designer Basins']
    },
    {
      heading: 'WATER CLOSETS',
      items: ['Wall Hung WC', 'Floor Mounted WC', 'One Piece WC', 'Smart Toilets', 'Urinals']
    },
    {
      heading: 'BATHROOM ACCESSORIES',
      items: ['Shower Panels', 'Bathroom Fittings', 'Towel Rods', 'Soap Dispensers', 'Health Faucets']
    },
    {
      heading: 'KITCHEN SINKS',
      items: ['Stainless Steel Sinks', 'Granite Sinks', 'Ceramic Sinks', 'Double Bowl Sinks']
    }
  ],
  'hardware': [
    {
      heading: 'DOOR HARDWARE',
      items: ['Door Handles', 'Door Knobs', 'Lever Handles', 'Pull Handles', 'Smart Locks', 'Door Stoppers']
    },
    {
      heading: 'LOCKS & SECURITY',
      items: ['Mortise Locks', 'Cylindrical Locks', 'Digital Locks', 'Padlocks', 'Smart Locks', 'Biometric Locks']
    },
    {
      heading: 'HINGES',
      items: ['Butt Hinges', 'Piano Hinges', 'Spring Hinges', 'Concealed Hinges', 'Heavy Duty Hinges']
    },
    {
      heading: 'SLIDING SYSTEMS',
      items: ['Sliding Door Systems', 'Sliding Window Systems', 'Folding Systems', 'Telescopic Systems']
    },
    {
      heading: 'FURNITURE FITTINGS',
      items: ['Cabinet Handles', 'Drawer Slides', 'Soft Close Systems', 'Kitchen Fittings', 'Wardrobe Fittings']
    }
  ],
  'electrical': [
    {
      heading: 'WIRES & CABLES',
      items: ['House Wires', 'Armored Cables', 'Flexible Cables', 'Coaxial Cables', 'Control Cables']
    },
    {
      heading: 'SWITCHES & SOCKETS',
      items: ['Modular Switches', 'Touch Switches', 'Smart Switches', '5A/15A Sockets', 'USB Sockets']
    },
    {
      heading: 'CIRCUIT PROTECTION',
      items: ['MCBs', 'RCCBs', 'Distribution Boards', 'Isolators', 'SPDs', 'ELCBs']
    },
    {
      heading: 'CONDUITS & ACCESSORIES',
      items: ['PVC Conduits', 'Metal Conduits', 'Cable Trays', 'Junction Boxes', 'Cable Glands']
    },
    {
      heading: 'FANS & VENTILATION',
      items: ['Ceiling Fans', 'Exhaust Fans', 'Pedestal Fans', 'Wall Fans', 'Ventilators']
    }
  ]
};

// Helper function to get dropdown content for a category
export function getDropdownContent(categorySlug: string): DropdownGroup[] | null {
  return CATEGORY_DROPDOWN_CONTENT[categorySlug] || null;
}

// Helper function to determine number of columns based on content
export function getDropdownColumns(groups: DropdownGroup[]): number {
  const totalItems = groups.reduce((sum, group) => sum + group.items.length + 1, 0); // +1 for heading
  
  if (totalItems <= 12) return 2;
  if (totalItems <= 20) return 3;
  return 3; // Maximum 3 columns
}
