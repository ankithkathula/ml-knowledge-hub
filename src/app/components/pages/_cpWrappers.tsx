import { useNavigate, useParams } from "react-router";
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

export function CpBrandsPage() {
  const navigate = useNavigate();
  return (
    <BrandsPageInner
      onBrandClick={(brandName) => navigate(`/brands/profile/${encodeURIComponent(brandName)}`)}
      onViewProducts={() => navigate("/cp/products")}
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
  const { brandName = "" } = useParams();
  return (
    <BrandProfileInner
      brandName={decodeURIComponent(brandName)}
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
  return (
    <ProductsListingPageInner
      onProductClick={(productId) => navigate(`/cp/products/${encodeURIComponent(productId)}`)}
      onBackToHome={() => navigate("/")}
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
      onViewBrandProfile={(brandName) => navigate(`/brands/profile/${encodeURIComponent(brandName)}`)}
    />
  );
}
