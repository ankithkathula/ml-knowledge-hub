import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  CheckSquare,
  Square,
  MinusSquare
} from 'lucide-react';

// Enhanced product type for verification
interface ProductWithVerification {
  id: string;
  name: string;
  sku: string;
  description: string;
  uom: string;
  status: 'Published' | 'Draft';
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
}

interface ProductFamilyWithVerification {
  id: string;
  name: string;
  categoryPath: string;
  products: ProductWithVerification[];
}

// Mock enhanced product data
const mockProductFamilies: ProductFamilyWithVerification[] = [
  {
    id: 'fam1',
    name: 'Premium Vitrified Tiles Family',
    categoryPath: 'Flooring / Tiles / Vitrified Tiles',
    products: [
      {
        id: 'p1',
        name: 'Premium Vitrified Tile',
        sku: 'VIT-PRM-600-01',
        description: 'High-gloss vitrified tile designed for residential and commercial spaces.',
        uom: 'sqm',
        status: 'Published',
        verificationStatus: 'Verified'
      },
      {
        id: 'p2',
        name: 'Matte Finish Ceramic Tile',
        sku: 'CER-MAT-300-02',
        description: 'Contemporary matte finish ceramic tile with superior stain resistance.',
        uom: 'sqm',
        status: 'Published',
        verificationStatus: 'Pending'
      },
      {
        id: 'p3',
        name: 'Glazed Wall Tile',
        sku: 'GLZ-WL-250-03',
        description: 'Premium glazed wall tile with elegant surface finish.',
        uom: 'sqm',
        status: 'Draft',
        verificationStatus: 'Pending'
      }
    ]
  },
  {
    id: 'fam2',
    name: 'Full Body Porcelain Family',
    categoryPath: 'Flooring / Tiles / Porcelain Tiles',
    products: [
      {
        id: 'p4',
        name: 'Full Body Porcelain Tile',
        sku: 'POR-FB-800-01',
        description: 'Through-body porcelain tile with consistent color throughout thickness.',
        uom: 'sqm',
        status: 'Published',
        verificationStatus: 'Verified'
      },
      {
        id: 'p5',
        name: 'Polished Porcelain Slab',
        sku: 'POR-POL-1200-02',
        description: 'Large format polished porcelain slab for seamless applications.',
        uom: 'pcs',
        status: 'Published',
        verificationStatus: 'Rejected'
      }
    ]
  },
  {
    id: 'fam3',
    name: 'LED Panel Lights Family',
    categoryPath: 'Lighting / Indoor Lighting / LED Panels',
    products: [
      {
        id: 'p6',
        name: 'Slim Panel 24W',
        sku: 'LED-PNL-24W-01',
        description: 'Ultra-slim LED panel light with 3000K warm white color temperature.',
        uom: 'pcs',
        status: 'Published',
        verificationStatus: 'Verified'
      },
      {
        id: 'p7',
        name: 'Surface Panel 18W',
        sku: 'LED-SRF-18W-02',
        description: 'Surface mounted LED panel suitable for false ceiling installations.',
        uom: 'pcs',
        status: 'Draft',
        verificationStatus: 'Pending'
      }
    ]
  }
];

interface ProductsDetailAdminProps {
  brandName: string;
  onBack: () => void;
}

export function ProductsDetailAdmin({ brandName, onBack }: ProductsDetailAdminProps) {
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set(['fam1']));
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const toggleFamily = (familyId: string) => {
    setExpandedFamilies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(familyId)) {
        newSet.delete(familyId);
      } else {
        newSet.add(familyId);
      }
      return newSet;
    });
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleFamilySelection = (family: ProductFamilyWithVerification) => {
    const publishedProducts = family.products.filter(p => p.status === 'Published');
    const allSelected = publishedProducts.every(p => selectedProducts.has(p.id));
    
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        // Deselect all published products
        publishedProducts.forEach(p => newSet.delete(p.id));
      } else {
        // Select all published products
        publishedProducts.forEach(p => newSet.add(p.id));
      }
      return newSet;
    });
  };

  const isFamilySelected = (family: ProductFamilyWithVerification) => {
    const publishedProducts = family.products.filter(p => p.status === 'Published');
    return publishedProducts.length > 0 && publishedProducts.every(p => selectedProducts.has(p.id));
  };

  const isFamilyPartiallySelected = (family: ProductFamilyWithVerification) => {
    const publishedProducts = family.products.filter(p => p.status === 'Published');
    const selectedCount = publishedProducts.filter(p => selectedProducts.has(p.id)).length;
    return selectedCount > 0 && selectedCount < publishedProducts.length;
  };

  const handleVerifySelected = () => {
    console.log('Verifying products:', Array.from(selectedProducts));
    // TODO: Implement verification logic
    setSelectedProducts(new Set());
  };

  const handleRejectSelected = () => {
    console.log('Rejecting products:', Array.from(selectedProducts));
    // TODO: Implement rejection logic
    setSelectedProducts(new Set());
  };

  const clearSelection = () => {
    setSelectedProducts(new Set());
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-['Satoshi'] font-normal">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] text-gray-600 hover:text-gray-900 mb-4 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Overview
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] text-gray-900 font-normal mb-1">Products</h2>
            <p className="text-[12px] text-gray-500">Review and verify brand products</p>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedProducts.size > 0 && (
        <div className="bg-white border-b border-gray-200 px-8 py-3 shrink-0 shadow-sm animate-slideInDown">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-700">
              <span className="font-medium text-gray-900">{selectedProducts.size}</span> product{selectedProducts.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={clearSelection}
                className="text-[11px] text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={handleRejectSelected}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-[11px] hover:bg-red-100 transition-all uppercase tracking-wider"
              >
                Reject
              </button>
              <button
                onClick={handleVerifySelected}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-[11px] hover:bg-green-700 transition-all uppercase tracking-wider shadow-sm"
              >
                Verify Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-4">
          {mockProductFamilies.map((family) => {
            const isExpanded = expandedFamilies.has(family.id);
            const isSelected = isFamilySelected(family);
            const isPartial = isFamilyPartiallySelected(family);

            return (
              <div key={family.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Family Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isPartial;
                        }}
                        onChange={() => toggleFamilySelection(family)}
                        className="w-4 h-4 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer transition-transform hover:scale-110"
                      />
                    </div>
                    <button
                      onClick={() => toggleFamily(family.id)}
                      className="flex-1 flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
                    >
                      <div className={`transition-transform duration-200 ease-out ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[13px] text-gray-900 font-medium mb-0.5">{family.name}</h3>
                        <p className="text-[10px] text-gray-500">
                          {family.categoryPath} • {family.products.length} product{family.products.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Products List */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {family.products.map((product) => {
                      const isProductSelected = selectedProducts.has(product.id);
                      const isDraft = product.status === 'Draft';

                      return (
                        <div
                          key={product.id}
                          className={`p-4 transition-all duration-200 hover:bg-gray-50 ${
                            isProductSelected ? 'bg-[#FF6A3D]/5 border-l-2 border-[#FF6A3D]' : ''
                          } ${isDraft ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              checked={isProductSelected}
                              onChange={() => toggleProductSelection(product.id)}
                              disabled={isDraft}
                              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#FF6A3D] focus:ring-[#FF6A3D] cursor-pointer transition-transform hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
                            />

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[13px] text-gray-900 font-medium mb-0.5">{product.name}</h4>
                              <p className="text-[10px] text-gray-400 mb-1.5 tracking-wide">SKU: {product.sku}</p>
                              <p className="text-[11px] text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Right Side: UOM, Status, Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider px-2 py-1 bg-gray-100 rounded font-medium">
                                {product.uom}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-medium ${
                                  product.status === 'Published'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                }`}>
                                  {product.status}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-medium ${
                                  product.verificationStatus === 'Verified'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : product.verificationStatus === 'Rejected'
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {product.verificationStatus}
                                </span>
                              </div>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
