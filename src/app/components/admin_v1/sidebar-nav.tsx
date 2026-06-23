import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderTree, 
  Package2, 
  Users, 
  GraduationCap, 
  ChevronDown, 
  ChevronRight,
  School,
  BookOpen,
  Library,
  Tags,
  Layers,
  UserCheck,
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import logoImg from "figma:asset/84319742a432eabc75aa1b62e8b22d482a7499e6.png";

interface SidebarNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function SidebarNav({ activeView, onViewChange }: SidebarNavProps) {
  const [academicOpen, setAcademicOpen] = useState(
    ['students', 'institutes', 'courses'].includes(activeView)
  );
  const [taxonomyOpen, setTaxonomyOpen] = useState(
    ['attribute-master', 'attribute-groups', 'product-categories', 'category-attributes', 'feature-grouping'].includes(activeView)
  );
  const [brandsOpen, setBrandsOpen] = useState(
    ['brand-onboarding', 'verified-brands', 'category-mapping'].includes(activeView)
  );

  const academicItems = [
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'institutes', label: 'Institutes', icon: School },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  const taxonomyItems = [
    { id: 'attribute-master', label: 'Attribute Master', icon: Tags },
    { id: 'attribute-groups', label: 'Attribute Grouping', icon: Layers },
    { id: 'feature-grouping', label: 'Feature Grouping', icon: Sparkles },
    { id: 'product-categories', label: 'Product Categories', icon: FolderTree },
    { id: 'category-attributes', label: 'Category Attributes', icon: Package2 },
  ];

  const brandItems = [
    { id: 'brand-onboarding', label: 'Brand Onboarding', icon: UserCheck },
    { id: 'verified-brands', label: 'Verified Brands', icon: ShieldCheck },
    { id: 'category-mapping', label: 'Category Mapping', icon: MapPin },
  ];

  return (
    <aside className="w-64 border-r border-gray-100 bg-white flex flex-col font-['Satoshi'] font-normal h-full shrink-0">
      {/* Logo Section */}
      <div className="px-8 py-10">
        <img 
          src={logoImg} 
          alt="Material Library" 
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* Label Section */}
      <div className="px-8 mb-4">
        <span className="text-[11px] font-normal text-[#98A2B3] uppercase tracking-[0.05em]">
          ML Admin Centre
        </span>
      </div>
      
      <nav className="flex-1 px-4 font-normal overflow-y-auto custom-scrollbar">
        <ul className="space-y-1 font-normal">
          {/* Overview */}
          <li className="font-normal">
            <button
              onClick={() => onViewChange('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-normal cursor-pointer ${
                activeView === 'overview' 
                  ? 'bg-[#FF7A59]/5 text-[#FF7A59]' 
                  : 'text-[#667085] hover:bg-gray-50 hover:text-[#101828]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className={`text-[14px] font-normal ${activeView === 'overview' ? 'text-[#FF7A59]' : 'text-[#667085]'}`}>
                Overview
              </span>
            </button>
          </li>

          {/* Product Taxonomy Accordion */}
          <li className="font-normal pt-1">
            <button
              onClick={() => setTaxonomyOpen(!taxonomyOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-normal cursor-pointer ${
                ['attribute-master', 'attribute-groups', 'product-categories', 'category-attributes', 'feature-grouping'].includes(activeView)
                  ? 'bg-[#FF7A59]/5 text-[#FF7A59]'
                  : 'text-[#667085] hover:bg-gray-50 hover:text-[#101828]'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-5 h-5" />
                <span className={`text-[14px] font-normal ${['attribute-master', 'attribute-groups', 'product-categories', 'category-attributes', 'feature-grouping'].includes(activeView) ? 'text-[#FF7A59]' : 'text-[#667085]'}`}>
                  Product Taxonomy
                </span>
              </div>
              {taxonomyOpen ? (
                <ChevronDown className="w-4 h-4 opacity-50" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-50" />
              )}
            </button>
            {taxonomyOpen && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 font-normal">
                {taxonomyItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id} className="font-normal">
                      <button
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-5 py-2 rounded-lg transition-all font-normal cursor-pointer ${
                          isActive 
                            ? 'text-[#FF7A59]' 
                            : 'text-[#667085] hover:text-[#101828]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[13px] font-normal">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* Brands Accordion */}
          <li className="font-normal pt-1">
            <button
              onClick={() => setBrandsOpen(!brandsOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-normal cursor-pointer ${
                ['brand-onboarding', 'verified-brands', 'category-mapping'].includes(activeView)
                  ? 'bg-[#FF7A59]/5 text-[#FF7A59]'
                  : 'text-[#667085] hover:bg-gray-50 hover:text-[#101828]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className={`text-[14px] font-normal ${['brand-onboarding', 'verified-brands', 'category-mapping'].includes(activeView) ? 'text-[#FF7A59]' : 'text-[#667085]'}`}>
                  Brands
                </span>
              </div>
              {brandsOpen ? (
                <ChevronDown className="w-4 h-4 opacity-50" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-50" />
              )}
            </button>
            {brandsOpen && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 font-normal">
                {brandItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id} className="font-normal">
                      <button
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-5 py-2 rounded-lg transition-all font-normal cursor-pointer ${
                          isActive 
                            ? 'text-[#FF7A59]' 
                            : 'text-[#667085] hover:text-[#101828]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[13px] font-normal">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* Academic Accordion */}
          <li className="font-normal pt-1">
            <button
              onClick={() => setAcademicOpen(!academicOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-normal cursor-pointer ${
                ['students', 'institutes', 'courses'].includes(activeView)
                  ? 'bg-[#FF7A59]/5 text-[#FF7A59]'
                  : 'text-[#667085] hover:bg-gray-50 hover:text-[#101828]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Library className="w-5 h-5" />
                <span className={`text-[14px] font-normal ${['students', 'institutes', 'courses'].includes(activeView) ? 'text-[#FF7A59]' : 'text-[#667085]'}`}>
                  Academic
                </span>
              </div>
              {academicOpen ? (
                <ChevronDown className="w-4 h-4 opacity-50" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-50" />
              )}
            </button>
            {academicOpen && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 font-normal">
                {academicItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id} className="font-normal">
                      <button
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-5 py-2 rounded-lg transition-all font-normal cursor-pointer ${
                          isActive 
                            ? 'text-[#FF7A59]' 
                            : 'text-[#667085] hover:text-[#101828]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[13px] font-normal">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-8 border-t border-gray-50">
        <div className="flex items-center gap-2 text-[#667085] text-xs">
          <span>Need help?</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
        </div>
      </div>
    </aside>
  );
}