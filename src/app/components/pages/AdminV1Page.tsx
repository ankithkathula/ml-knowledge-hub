import { useState } from "react";
import { Toaster } from "../admin_v1/ui/sonner";
import { SidebarNav } from "../admin_v1/sidebar-nav";
import { TopBar } from "../admin_v1/top-bar";
import { OverviewView } from "../admin_v1/overview-view";
import { CategoriesView } from "../admin_v1/categories-view";
import { AttributesView } from "../admin_v1/attributes-view";
import { BrandOnboardingView } from "../admin_v1/brand-onboarding-view";
import { VerifiedBrandsView } from "../admin_v1/verified-brands-view";
import { CategoryMappingView } from "../admin_v1/category-mapping-view";
import { StudentsView } from "../admin_v1/students-view";
import { InstitutesView } from "../admin_v1/institutes-view";
import { CoursesView } from "../admin_v1/courses-view";
import { AttributeMasterView } from "../admin_v1/attribute-master-view";
import { AttributeGroupsView } from "../admin_v1/attribute-groups-view";
import { ProductCategoriesView } from "../admin_v1/product-categories-view";
import { CategoryAttributesView } from "../admin_v1/category-attributes-view";
import { FeatureGroupingView } from "../admin_v1/feature-grouping-view";

const VIEW_TITLES: Record<string, string> = {
  overview: "Overview",
  categories: "Categories",
  attributes: "Attributes",
  "brand-onboarding": "Brand Onboarding",
  "verified-brands": "Verified Brands",
  "category-mapping": "Category Mapping",
  students: "Students",
  institutes: "Institutes",
  courses: "Courses",
  "attribute-master": "Attribute Master",
  "attribute-groups": "Attribute Grouping",
  "product-categories": "Product Categories",
  "category-attributes": "Category Attributes",
  "feature-grouping": "Feature Grouping",
};

export function AdminV1Page() {
  const [activeView, setActiveView] = useState("overview");

  const renderView = () => {
    switch (activeView) {
      case "overview":            return <OverviewView />;
      case "categories":          return <CategoriesView />;
      case "attributes":          return <AttributesView />;
      case "brand-onboarding":    return <BrandOnboardingView />;
      case "verified-brands":     return <VerifiedBrandsView />;
      case "category-mapping":    return <CategoryMappingView />;
      case "students":            return <StudentsView />;
      case "institutes":          return <InstitutesView />;
      case "courses":             return <CoursesView />;
      case "attribute-master":    return <AttributeMasterView />;
      case "attribute-groups":    return <AttributeGroupsView />;
      case "product-categories":  return <ProductCategoriesView />;
      case "category-attributes": return <CategoryAttributesView />;
      case "feature-grouping":    return <FeatureGroupingView />;
      default:                    return <OverviewView />;
    }
  };

  return (
    <div className="h-screen w-full flex bg-white font-['Satoshi'] font-normal">
      <div className="hidden lg:block shrink-0 h-full">
        <SidebarNav activeView={activeView} onViewChange={setActiveView} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <TopBar title="ML ADMIN CENTER" subheading={VIEW_TITLES[activeView]} />

        <main className="flex-1 overflow-hidden bg-white relative">
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar font-normal">
            {renderView()}
          </div>
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
