// Complete Category Taxonomy for the Platform

export interface CategoryNode {
  name: string;
  slug: string;
  children?: CategoryNode[];
  hasProducts?: boolean;
  isLeafNode?: boolean; // Added for hierarchy-aware display
}

export const CATEGORY_TAXONOMY: CategoryNode[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    children: [
      {
        name: "Cement",
        slug: "cement",
        children: [
          {
            name: "Portland Cement",
            slug: "portland-cement",
            children: [
              {
                name: "OPC 53",
                slug: "opc-53",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "OPC 43",
                slug: "opc-43",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "PPC Cement",
                slug: "ppc-cement",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          },
          {
            name: "White Cement",
            slug: "white-cement",
            hasProducts: true,
            isLeafNode: true
          },
          {
            name: "Ready Mix Concrete",
            slug: "ready-mix-concrete",
            hasProducts: true,
            isLeafNode: true
          },
          {
            name: "Fly Ash Cement",
            slug: "fly-ash-cement",
            hasProducts: true,
            isLeafNode: true
          }
        ]
      },
      {
        name: "Steel",
        slug: "steel",
        children: [
          {
            name: "TMT Bars",
            slug: "tmt-bars",
            children: [
              {
                name: "Fe500",
                slug: "fe500",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Fe550",
                slug: "fe550",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          },
          {
            name: "Structural Steel",
            slug: "structural-steel",
            children: [
              {
                name: "H Beams",
                slug: "h-beams",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "I Beams",
                slug: "i-beams",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Channels",
                slug: "channels",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Angles",
                slug: "angles",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          },
          {
            name: "Steel Plates",
            slug: "steel-plates",
            children: [
              {
                name: "Mild Steel Plates",
                slug: "mild-steel-plates",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Stainless Steel Plates",
                slug: "stainless-steel-plates",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          }
        ]
      },
      {
        name: "Blocks & Bricks",
        slug: "blocks-bricks",
        children: [
          {
            name: "Clay Bricks",
            slug: "clay-bricks",
            hasProducts: true,
            isLeafNode: true
          },
          {
            name: "Fly Ash Bricks",
            slug: "fly-ash-bricks",
            hasProducts: true,
            isLeafNode: true
          },
          {
            name: "Concrete Blocks",
            slug: "concrete-blocks",
            hasProducts: true,
            isLeafNode: true
          },
          {
            name: "AAC Blocks",
            slug: "aac-blocks",
            hasProducts: true,
            isLeafNode: true
          }
        ]
      },
      {
        name: "Construction Chemicals",
        slug: "construction-chemicals",
        children: [
          {
            name: "Waterproofing",
            slug: "waterproofing",
            children: [
              {
                name: "Liquid Membrane",
                slug: "liquid-membrane",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Bituminous Coating",
                slug: "bituminous-coating",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Cementitious Waterproofing",
                slug: "cementitious-waterproofing",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          },
          {
            name: "Tile Adhesives",
            slug: "tile-adhesives",
            children: [
              {
                name: "Standard Adhesive",
                slug: "standard-adhesive",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "High Bond Adhesive",
                slug: "high-bond-adhesive",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Flexible Adhesive",
                slug: "flexible-adhesive",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          },
          {
            name: "Grouts",
            slug: "grouts",
            children: [
              {
                name: "Epoxy Grout",
                slug: "epoxy-grout",
                hasProducts: true,
                isLeafNode: true
              },
              {
                name: "Cement Grout",
                slug: "cement-grout",
                hasProducts: true,
                isLeafNode: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Flooring",
    slug: "flooring",
    children: [
      { name: "Ceramic Tiles", slug: "ceramic-tiles-flooring", hasProducts: true },
      { name: "Vitrified Tiles", slug: "vitrified-tiles-flooring", hasProducts: true },
      { name: "Hardwood Flooring", slug: "hardwood-flooring", hasProducts: true },
      { name: "Laminate Flooring", slug: "laminate-flooring", hasProducts: true }
    ]
  },
  {
    name: "Wall Finishes",
    slug: "wall-finishes",
    children: [
      { name: "Interior Paint", slug: "interior-paint", hasProducts: true },
      { name: "Exterior Paint", slug: "exterior-paint", hasProducts: true },
      { name: "Wallpapers", slug: "wallpapers-finishes", hasProducts: true },
      { name: "Cladding", slug: "cladding", hasProducts: true }
    ]
  },
  {
    name: "Lighting",
    slug: "lighting",
    children: [
      { name: "LED Bulbs", slug: "led-bulbs", hasProducts: true },
      { name: "Decorative Lighting", slug: "decorative-lighting", hasProducts: true },
      { name: "Commercial Lighting", slug: "commercial-lighting", hasProducts: true }
    ]
  },
  {
    name: "Sanitary",
    slug: "sanitary",
    children: [
      { name: "Taps & Faucets", slug: "taps-faucets", hasProducts: true },
      { name: "Wash Basins", slug: "wash-basins", hasProducts: true },
      { name: "Water Closets", slug: "water-closets", hasProducts: true }
    ]
  },
  {
    name: "Hardware",
    slug: "hardware",
    children: [
      { name: "Door Handles", slug: "door-handles-hardware", hasProducts: true },
      { name: "Locks", slug: "locks-hardware", hasProducts: true },
      { name: "Hinges", slug: "hinges-hardware", hasProducts: true }
    ]
  },
  {
    name: "Electrical",
    slug: "electrical",
    children: [
      { name: "Wires & Cables", slug: "wires-cables", hasProducts: true },
      { name: "Switches & Sockets", slug: "switches-sockets", hasProducts: true },
      { name: "Circuit Breakers", slug: "circuit-breakers", hasProducts: true }
    ]
  }
];

// Helper function to find a category by path
export function findCategoryByPath(path: string[]): CategoryNode | null {
  let current: CategoryNode[] = CATEGORY_TAXONOMY;
  let found: CategoryNode | null = null;

  for (const segment of path) {
    const node = current.find(cat => cat.slug === segment);
    if (!node) return null;
    found = node;
    current = node.children || [];
  }

  return found;
}

// Helper function to build breadcrumb from path
export function buildBreadcrumb(path: string[]): { name: string; slug: string }[] {
  const breadcrumb: { name: string; slug: string }[] = [{ name: 'Home', slug: '' }, { name: 'Products', slug: 'products' }];
  let current: CategoryNode[] = CATEGORY_TAXONOMY;

  for (const segment of path) {
    const node = current.find(cat => cat.slug === segment);
    if (!node) break;
    breadcrumb.push({ name: node.name, slug: node.slug });
    current = node.children || [];
  }

  return breadcrumb;
}

// Helper function to check if a path leads to products
export function hasProducts(path: string[]): boolean {
  const category = findCategoryByPath(path);
  return category?.hasProducts || false;
}

// Helper function to find the full path to a category by its slug
export function findPathToCategory(slug: string, taxonomy: CategoryNode[] = CATEGORY_TAXONOMY, currentPath: string[] = []): string[] | null {
  for (const category of taxonomy) {
    const newPath = [...currentPath, category.slug];
    
    if (category.slug === slug) {
      return newPath;
    }
    
    if (category.children) {
      const found = findPathToCategory(slug, category.children, newPath);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}

// Helper function to find the first category with products in a subtree
export function findFirstProductCategory(path: string[]): string[] | null {
  const category = findCategoryByPath(path);
  
  if (!category) return null;
  
  // If this category has products, return its path
  if (category.hasProducts) {
    return path;
  }
  
  // Otherwise, search children recursively
  if (category.children) {
    for (const child of category.children) {
      const childPath = [...path, child.slug];
      const result = findFirstProductCategory(childPath);
      if (result) {
        return result;
      }
    }
  }
  
  return null;
}
