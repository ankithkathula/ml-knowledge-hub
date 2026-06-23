import { useNavigate, useParams, NavigateFunction } from "react-router";
import { findPathToCategory } from "../../utils/categoryTaxonomy";
import { StudentLandingTutorial } from "../student/tutorial/StudentLandingTutorial";
import { setAuthUser, DEFAULT_USER, INSTITUTE_USER, BRAND_USER, STUDENT_USER, FACULTY_USER, STUDIO_USER, RETAIL_USER, ADMIN_USER, DEALER_USER } from "../../utils/auth";
import { WelcomeBanner } from "../shared/WelcomeBanner";
import { BrandsPage as BrandsPageInner } from "../brand/BrandsPage";
import { BrandsLandingPage as BrandsLandingPageInner } from "../brand/BrandsLandingPage";
import { BrandListingPage as BrandListingPageInner } from "../brand/BrandListingPage";
import { BrandProfile as BrandProfileInner } from "../brand/BrandProfile";
import BrandDashboardInner from "../brand/BrandDashboard";
import BrandSignUpInner from "../brand/BrandSignUp";
import { BrandAccountSuccess as BrandAccountSuccessInner } from "../brand/BrandAccountSuccess";
import BrandThankYouInner from "../brand/BrandThankYou";
import { ProductsListingPage as ProductsListingPageInner } from "../products/ProductsListingPage";
import { ProductDetailPage as ProductDetailPageInner } from "../products/ProductDetailPage";
import SignInInner from "../auth/SignIn";
import SignUpRoleSelectionInner from "../auth/SignUpRoleSelection";
import StudentSignUpInner from "../auth/StudentSignUp";

// ── v1 (entire customer portal page surface) ──
import { MarketingHero as V1MarketingHero } from "../cp_v1/MarketingHero";
import { BrandMarquee as V1BrandMarquee } from "../cp_v1/BrandMarquee";
import { CategoryDiscovery as V1CategoryDiscovery } from "../cp_v1/CategoryDiscovery";
import { FeaturedBrands as V1FeaturedBrands } from "../cp_v1/FeaturedBrands";
import { ServicesSection as V1ServicesSection } from "../cp_v1/ServicesSection";
import { ProfessionalsSection as V1ProfessionalsSection } from "../cp_v1/ProfessionalsSection";
import { EcosystemCTA as V1EcosystemCTA } from "../cp_v1/EcosystemCTA";
import { ProfessionalsPage as V1ProfessionalsPage } from "../cp_v1/ProfessionalsPage";
import { ServicesPage as V1ServicesPage } from "../cp_v1/ServicesPage";
import V1ProfessionalProfilePage from "../cp_v1/ProfessionalProfilePage";
import { ContractorListingPage as V1ContractorListingPage } from "../cp_v1/ContractorListingPage";
import { ContractorMicrosite as V1ContractorMicrosite } from "../cp_v1/ContractorMicrosite";
import { ContractorServicesPage as V1ContractorServicesPage } from "../cp_v1/ContractorServicesPage";
import { ProfessionalsLandingPage as V1ProfessionalsLandingPage } from "../cp_v1/ProfessionalsLandingPage";
import V1ProfessionalListingPage from "../cp_v1/ProfessionalListingPage";
import { ProfessionalMicrosite as V1ProfessionalMicrosite } from "../cp_v1/ProfessionalMicrosite";
import { ProfessionalDirectory as V1ProfessionalDirectory } from "../cp_v1/ProfessionalDirectory";
import { StudioDirectory as V1StudioDirectory } from "../cp_v1/StudioDirectory";
import { StudioProfile as V1StudioProfile } from "../cp_v1/StudioProfile";
import { StudioMicrosite as V1StudioMicrosite } from "../cp_v1/StudioMicrosite";
import { FirmMicrosite as V1FirmMicrosite } from "../cp_v1/FirmMicrosite";
import { IndividualProfessionalMicrosite as V1IndividualProfessionalMicrosite } from "../cp_v1/IndividualProfessionalMicrosite";
import { ServiceDetail as V1ServiceDetail } from "../cp_v1/ServiceDetail";
import { ServiceDetailPage as V1ServiceDetailPage } from "../cp_v1/ServiceDetailPage";
import { ServiceProfessionalsLandingPage as V1ServiceProfessionalsLandingPage } from "../cp_v1/ServiceProfessionalsLandingPage";
import { StudentsLandingPage as V1StudentsLandingPage } from "../cp_v1/StudentsLandingPage";
import { DesignersLandingPage as V1DesignersLandingPage } from "../cp_v1/DesignersLandingPage";
import { StudiosLandingPage as V1StudiosLandingPage } from "../cp_v1/StudiosLandingPage";
import { BrandsLandingPage as V1BrandsLandingPage } from "../cp_v1/BrandsLandingPage";
import { FacultyLandingPage as V1FacultyLandingPage } from "../cp_v1/FacultyLandingPage";
import V1CategoryDetailPage from "../cp_v1/CategoryDetailPage";
import V1SubCategoryPage from "../cp_v1/SubCategoryPage";

// CP "page" string → v1 route. Keeps the sweep-all NAVIGATE callback compatible.
function v1NavigateFor(navigate: NavigateFunction) {
  return (page: string, id?: string | number) => {
    const idStr = id !== undefined ? String(id) : "";
    switch (page) {
      case "home":
        return navigate("/v1");
      case "signin":
        return navigate("/signin");
      case "signup":
        return navigate("/signup");
      case "brands":
        return navigate("/brands");
      case "products":
        return navigate("/products");
      case "professionals":
        return navigate("/v1/professionals");
      case "professionals-landing":
        return navigate("/v1/professionals/landing");
      case "professional-listing":
        return navigate("/v1/professionals/listing");
      case "professional-directory":
        return navigate("/v1/professionals/directory");
      case "professional-microsite":
        return navigate(`/v1/professionals/microsite/${encodeURIComponent(idStr)}`);
      case "professional-profile":
        return navigate(`/v1/professionals/profile/${encodeURIComponent(idStr)}`);
      case "individual-professional-microsite":
        return navigate(`/v1/professionals/individual/${encodeURIComponent(idStr)}`);
      case "studio-directory":
        return navigate("/v1/studios/directory");
      case "studio-profile":
        return navigate(`/v1/studios/profile/${encodeURIComponent(idStr)}`);
      case "studio-microsite":
        return navigate(`/v1/studios/microsite/${encodeURIComponent(idStr)}`);
      case "firm-microsite":
        return navigate(`/v1/firms/microsite/${encodeURIComponent(idStr)}`);
      case "services":
        return navigate("/v1/services");
      case "contractor-listing":
        return navigate("/v1/services/contractor-listing");
      case "contractor-microsite":
        return navigate(`/v1/services/contractor-microsite/${encodeURIComponent(idStr)}`);
      case "service-detail":
        return navigate(`/v1/services/detail/${encodeURIComponent(idStr)}`);
      case "ecosystem-brands":
        return navigate("/brands/landing");
      case "ecosystem-studios":
        return navigate("/v1/studios/landing");
      case "ecosystem-professionals":
        return navigate("/v1/services/professionals-landing");
      case "ecosystem-students":
        return navigate("/v1/students/landing");
      case "brand-profile":
        return navigate(`/brand/${encodeURIComponent(idStr)}`);
      case "product-detail":
        return navigate(`/product/${encodeURIComponent(idStr)}`);
      default:
        return navigate("/v1");
    }
  };
}

// ─────────────────────────────────────────────────────────
// Existing wrappers (brand / products / auth)
// ─────────────────────────────────────────────────────────

export function CpBrandsPage() {
  const navigate = useNavigate();
  return (
    <BrandsPageInner
      onBrandClick={(brandName) => navigate(`/brand/${encodeURIComponent(brandName)}`)}
      onViewProducts={(brandName) =>
        navigate(`/products/${encodeURIComponent(brandName ?? "all")}`)
      }
    />
  );
}

export function CpBrandsLandingPage() {
  const navigate = useNavigate();
  return <BrandsLandingPageInner onNavigate={(target) => navigate(target)} />;
}

export function CpBrandListingPage() {
  const navigate = useNavigate();
  return <BrandListingPageInner onBack={() => navigate(-1)} />;
}

export function CpBrandProfilePage() {
  const navigate = useNavigate();
  const { brandId, brandName } = useParams();
  const name = brandId ?? brandName ?? "";
  return (
    <BrandProfileInner
      brandName={decodeURIComponent(name)}
      onBack={() => navigate(-1)}
    />
  );
}

export function CpBrandDashboard() {
  return <BrandDashboardInner />;
}

export function CpBrandSignUp() {
  const navigate = useNavigate();
  return <BrandSignUpInner onSubmitSuccess={() => navigate("/brands/thank-you")} />;
}

export function CpBrandAccountSuccess() {
  const navigate = useNavigate();
  return <BrandAccountSuccessInner onContinue={() => navigate("/brands/dashboard")} />;
}

export function CpBrandThankYou() {
  const navigate = useNavigate();
  return <BrandThankYouInner onSetupCredentials={() => navigate("/brands/signup")} />;
}

export function CpProductsListingPage() {
  const navigate = useNavigate();
  const { l5Id } = useParams();
  const slug = l5Id ? decodeURIComponent(l5Id) : undefined;
  const initialPath = slug ? (findPathToCategory(slug) ?? [slug]) : undefined;
  return (
    <ProductsListingPageInner
      onProductClick={(productId) => navigate(`/product/${encodeURIComponent(productId)}`)}
      onBackToHome={() => navigate("/v1")}
      initialPath={initialPath}
    />
  );
}

export function CpProductDetailPage() {
  const navigate = useNavigate();
  const { productId = "" } = useParams();
  return (
    <ProductDetailPageInner
      productId={decodeURIComponent(productId)}
      onBack={() => navigate(-1)}
      onViewBrandProfile={(brandName) => navigate(`/brand/${encodeURIComponent(brandName)}`)}
    />
  );
}

export function CpSignInPage() {
  const navigate = useNavigate();
  return (
    <SignInInner
      onLogin={(role) => {
        switch (role) {
          case "designer":   setAuthUser(DEFAULT_USER);   navigate(DEFAULT_USER.landingPath);   break;
          case "brand":      setAuthUser(BRAND_USER);     navigate(BRAND_USER.landingPath);     break;
          case "institute":  setAuthUser(INSTITUTE_USER); navigate(INSTITUTE_USER.landingPath); break;
          case "student":    setAuthUser(STUDENT_USER);   navigate(STUDENT_USER.landingPath);   break;
          case "faculty":    setAuthUser(FACULTY_USER);   navigate(FACULTY_USER.landingPath);   break;
          case "studio":     setAuthUser(STUDIO_USER);    navigate(STUDIO_USER.landingPath);    break;
          case "retail":     setAuthUser(RETAIL_USER);    navigate(RETAIL_USER.landingPath);    break;
          case "dealer":     setAuthUser(DEALER_USER);    navigate(DEALER_USER.landingPath);    break;
        }
      }}
      onAdminLogin={() => { setAuthUser(ADMIN_USER); navigate(ADMIN_USER.landingPath); }}
    />
  );
}

export function CpSignUpPage() {
  const navigate = useNavigate();
  return (
    <SignUpRoleSelectionInner
      onRoleSelect={(role) => {
        if (role === "brand") navigate("/brands/signup");
        else if (role === "students") navigate("/signup/student");
        else if (role === "signin") navigate("/signin");
        else {
          setAuthUser(DEFAULT_USER);
          navigate(DEFAULT_USER.landingPath);
        }
      }}
    />
  );
}

export function CpStudentSignUpPage() {
  const navigate = useNavigate();
  return (
    <StudentSignUpInner
      onBack={() => navigate("/signup")}
      onSubmitSuccess={() => {
        setAuthUser(STUDENT_USER);
        navigate("/");
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// v1 wrappers (CP page surface, accessible via footer "from v1" links)
// ─────────────────────────────────────────────────────────

export function CpV1HomePage() {
  // Recreates the customer portal's home composition (CP App.tsx home case).
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <V1MarketingHero
        onSearch={() => v1nav("services")}
        onNavigateToProducts={() => navigate("/products")}
      />
      <V1BrandMarquee />
      <V1CategoryDiscovery onViewAll={() => navigate("/products")} />
      <V1FeaturedBrands
        onViewAll={() => navigate("/brands")}
        onBrandFilterClick={(brand) => navigate(`/brand/${encodeURIComponent(brand)}`)}
      />
      <V1ServicesSection onViewAll={() => v1nav("services")} />
      <V1ProfessionalsSection onViewAll={() => v1nav("professionals")} />
      <V1EcosystemCTA
        onGetStarted={() => navigate("/signup")}
        onNavigateToRole={(role) => {
          if (role === "brands") navigate("/brands/landing");
          else if (role === "studios") v1nav("ecosystem-studios");
          else if (role === "professionals") v1nav("ecosystem-professionals");
          else if (role === "students") v1nav("ecosystem-students");
        }}
      />
    </main>
  );
}

export function CpV1ProfessionalsPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return (
    <V1ProfessionalsPage
      onProfessionalClick={(id, type) => {
        if (type === "firm") v1nav("firm-microsite", id);
        else if (type === "studio") v1nav("studio-microsite", id);
        else v1nav("individual-professional-microsite", id);
      }}
      onViewAll={() => v1nav("professional-listing")}
    />
  );
}

export function CpV1ServicesPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1ServicesPage onNavigate={v1nav} />;
}

export function CpV1ProfessionalProfilePage() {
  const navigate = useNavigate();
  const { professionalId = "" } = useParams();
  return (
    <V1ProfessionalProfilePage
      professionalId={decodeURIComponent(professionalId)}
      professionalName="Professional"
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1ContractorListingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1ContractorListingPage onContractorClick={(id) => v1nav("contractor-microsite", id)} />;
}

export function CpV1ContractorMicrositePage() {
  const navigate = useNavigate();
  const { contractorId = "1" } = useParams();
  return (
    <V1ContractorMicrosite
      contractorId={Number(decodeURIComponent(contractorId)) || 1}
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1ContractorServicesPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return (
    <V1ContractorServicesPage
      onServiceClick={(serviceId) => v1nav("service-detail", serviceId)}
      onFirmClick={(firmId) => v1nav("firm-microsite", firmId)}
      onContractorClick={(contractorId) => v1nav("contractor-microsite", contractorId)}
      onViewAllContractors={() => v1nav("contractor-listing")}
    />
  );
}

export function CpV1ProfessionalsLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1ProfessionalsLandingPage onNavigate={v1nav} />;
}

export function CpV1ProfessionalListingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return (
    <V1ProfessionalListingPage
      onBack={() => navigate(-1)}
      onProfessionalClick={(id, type) => {
        if (type === "firm") v1nav("firm-microsite", id);
        else if (type === "studio") v1nav("studio-microsite", id);
        else v1nav("individual-professional-microsite", id);
      }}
    />
  );
}

export function CpV1ProfessionalMicrositePage() {
  const navigate = useNavigate();
  const { professionalId = "" } = useParams();
  return (
    <V1ProfessionalMicrosite
      professionalId={decodeURIComponent(professionalId)}
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1ProfessionalDirectoryPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1ProfessionalDirectory onNavigate={v1nav} />;
}

export function CpV1StudioDirectoryPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1StudioDirectory onNavigate={v1nav} />;
}

export function CpV1StudioProfilePage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  const { studioId = "" } = useParams();
  return <V1StudioProfile id={decodeURIComponent(studioId)} onNavigate={v1nav} />;
}

export function CpV1StudioMicrositePage() {
  const navigate = useNavigate();
  const { studioId = "" } = useParams();
  return (
    <V1StudioMicrosite
      studioId={decodeURIComponent(studioId)}
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1FirmMicrositePage() {
  const navigate = useNavigate();
  const { firmId = "" } = useParams();
  return (
    <V1FirmMicrosite
      firmId={decodeURIComponent(firmId)}
      firmName=""
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1IndividualProfessionalMicrositePage() {
  const navigate = useNavigate();
  const { professionalId = "" } = useParams();
  return (
    <V1IndividualProfessionalMicrosite
      professionalId={decodeURIComponent(professionalId)}
      onBack={() => navigate(-1)}
    />
  );
}

export function CpV1ServiceDetailPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  const { serviceId = "" } = useParams();
  return <V1ServiceDetail id={decodeURIComponent(serviceId)} onNavigate={v1nav} />;
}

export function CpV1ServiceDetailFullPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  const { serviceId = "" } = useParams();
  return (
    <V1ServiceDetailPage
      serviceId={decodeURIComponent(serviceId)}
      onBack={() => navigate(-1)}
      onContractorClick={(contractorId) => v1nav("contractor-microsite", contractorId)}
    />
  );
}

export function CpV1ServiceProfessionalsLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <V1ServiceProfessionalsLandingPage onNavigate={v1nav} />;
}

export function CpV1StudentsLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return (
    <>
      <WelcomeBanner requiredType="Student" />
      <V1StudentsLandingPage onNavigate={v1nav} />
      <StudentLandingTutorial />
    </>
  );
}

export function CpV1DesignersLandingPage() {
  const navigate = useNavigate();
  return <><WelcomeBanner requiredType="Interior Designer" /><V1DesignersLandingPage onNavigateToHome={() => navigate("/")} /></>;
}

export function CpV1StudiosLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <><WelcomeBanner requiredType="Studio" /><V1StudiosLandingPage onNavigate={v1nav} /></>;
}

export function CpV1BrandsLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <><WelcomeBanner requiredType="Brand" /><V1BrandsLandingPage onNavigate={v1nav} /></>;
}

export function CpV1FacultyLandingPage() {
  const navigate = useNavigate();
  const v1nav = v1NavigateFor(navigate);
  return <><WelcomeBanner requiredType="Faculty" /><V1FacultyLandingPage onNavigate={v1nav} /></>;
}

export function CpV1CategoryDetailPage() {
  const navigate = useNavigate();
  const { categoryId = "" } = useParams();
  return (
    <V1CategoryDetailPage
      categoryName={decodeURIComponent(categoryId)}
      subcategories={[]}
      onBackToHome={() => navigate("/")}
      onBackToProducts={() => navigate("/products")}
      onBackToProfessionals={() => navigate("/v1/professionals")}
      source="products"
    />
  );
}

export function CpV1SubCategoryPage() {
  const navigate = useNavigate();
  return (
    <V1SubCategoryPage
      breadcrumb={[]}
      categories={[]}
      onCategoryClick={(slug) => navigate(`/v1/subcategories/${encodeURIComponent(slug)}`)}
      onBreadcrumbClick={() => navigate(-1)}
    />
  );
}
