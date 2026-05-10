import { createBrowserRouter } from "react-router";

// ── Public Pages ──
import { HomePage } from "./components/pages/HomePage";
import { HierarchyPage } from "./components/pages/HierarchyPage";
import { ProductListingPage } from "./components/pages/ProductListingPage";
import { BrandPage } from "./components/pages/BrandPage";
import { BlogEditorPage } from "./components/pages/BlogEditorPage";
import { BlogListingPage } from "./components/pages/BlogListingPage";
import { BlogDetailPage } from "./components/pages/BlogDetailPage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { ServicesCategoryPage } from "./components/pages/ServicesCategoryPage";
import { ConsultantProfilePage } from "./components/pages/ConsultantProfilePage";
import { ConsultantProjectDetailPage } from "./components/pages/ConsultantProjectDetailPage";
import { PublicJobBoardPage } from "./components/pages/PublicJobBoardPage";
import { PublicCourseCatalogPage } from "./components/pages/PublicCourseCatalogPage";
import { KcInfoPage } from "./components/pages/KcInfoPage";
import { UserPublicProfilePage } from "./components/pages/UserPublicProfilePage";
import { ProfessionalsPage } from "./components/pages/ProfessionalsPage";
import { ProfessionalProfilePage } from "./components/pages/ProfessionalProfilePage";
import { ProfessionalsBPage } from "./components/pages/ProfessionalsBPage";
import { FeedPage } from "./components/pages/FeedPage";

// ── Customer-portal Brand & Product pages (imported from ML_Customer Portal repo) ──
import {
  CpBrandsPage,
  CpBrandsLandingPage,
  CpBrandListingPage,
  CpBrandProfilePage,
  CpBrandDashboard,
  CpBrandSignUp,
  CpBrandAccountSuccess,
  CpBrandThankYou,
  CpProductsListingPage,
  CpProductDetailPage,
} from "./components/pages/_cpWrappers";

// ── Studio Dashboard ──
import { StudioDashboardLayout } from "./components/studio/StudioDashboardLayout";
import { StudioDashboardHome } from "./components/studio/StudioDashboardHome";
import { StudioJobsPage } from "./components/studio/StudioJobsPage";
import { StudioProjectsManagePage } from "./components/studio/StudioProjectsPage";
import { StudioProjectBomPage } from "./components/studio/StudioProjectBomPage";
import { StudioCoursesManagePage } from "./components/studio/StudioCoursesManagePage";
import { StudioBlogsPage } from "./components/studio/StudioBlogsPage";
import { StudioStudioManagePage } from "./components/studio/StudioManagePage";
import { StudioTeamPage } from "./components/studio/StudioTeamPage";
import { StudioBookingsPage } from "./components/studio/StudioBookingsPage";
import { StudioKcVisitsPage } from "./components/studio/StudioKcVisitsPage";
import { StudioSamplesPage } from "./components/studio/StudioSamplesPage";
import StudioReviewsPage from "./components/studio/StudioReviewsPage";
import StudioMessagesPage from "./components/studio/StudioMessagesPage";
import { StudioAnalyticsPage } from "./components/studio/StudioAnalyticsPage";
import StudioSettingsPage from "./components/studio/StudioSettingsPage";

// ── User Dashboard ──
import { UserDashboardLayout } from "./components/user/UserDashboardLayout";
import { UserDashboardHome } from "./components/user/UserDashboardHome";
import { UserPortfolioPage } from "./components/user/UserPortfolioPage";
import { UserPortfolioProjectPage } from "./components/user/UserPortfolioProjectPage";
import { UserJobsPage } from "./components/user/UserJobsPage";
import { UserCoursesPage } from "./components/user/UserCoursesPage";
import { UserCourseDetailPage } from "./components/user/UserCourseDetailPage";
import { UserBookmarksPage } from "./components/user/UserBookmarksPage";
import { UserSamplesPage } from "./components/user/UserSamplesPage";
import { UserKcVisitsPage } from "./components/user/UserKcVisitsPage";
import { UserActivityPage } from "./components/user/UserActivityPage";
import { UserMessagesPage } from "./components/user/UserMessagesPage";
import { UserProfileEditPage } from "./components/user/UserProfileEditPage";
import { UserSettingsPage } from "./components/user/UserSettingsPage";

// ── Admin Dashboard ──
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboardPage } from "./components/admin/AdminDashboardPage";
import { TaxonomyManagementPage } from "./components/admin/TaxonomyManagementPage";
import { ProductManagementPage } from "./components/admin/ProductManagementPage";
import { BrandManagementPage } from "./components/admin/BrandManagementPage";
import { ContentManagementPage } from "./components/admin/ContentManagementPage";
import { NewsManagementPage } from "./components/admin/NewsManagementPage";
import { ConsultantManagementPage } from "./components/admin/ConsultantManagementPage";
import { MarketDataManagementPage } from "./components/admin/MarketDataManagementPage";
import { BulkImportPage } from "./components/admin/BulkImportPage";
import { ContributorConsolePage } from "./components/admin/ContributorConsolePage";
import { AdminUsersManagementPage } from "./components/admin/AdminUsersManagementPage";
import { AdminJobsManagementPage } from "./components/admin/AdminJobsManagementPage";
import { AdminCoursesManagementPage } from "./components/admin/AdminCoursesManagementPage";
import { AdminKcBookingsPage } from "./components/admin/AdminKcBookingsPage";
import { AdminSamplesPage } from "./components/admin/AdminSamplesPage";

export const router = createBrowserRouter([
  // ── Public Pages ──
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/layer/:nodeId",
    Component: HierarchyPage,
  },
  {
    path: "/products/:l5Id",
    Component: ProductListingPage,
  },
  {
    path: "/brand/:brandId",
    Component: BrandPage,
  },
  {
    path: "/blog",
    Component: BlogListingPage,
  },
  {
    path: "/blog/create",
    Component: BlogEditorPage,
  },
  {
    path: "/blog/:blogId",
    Component: BlogDetailPage,
  },
  {
    path: "/jobs",
    Component: PublicJobBoardPage,
  },
  {
    path: "/courses",
    Component: PublicCourseCatalogPage,
  },
  {
    path: "/kc",
    Component: KcInfoPage,
  },
  {
    path: "/professionals",
    Component: ProfessionalsPage,
  },
  {
    path: "/feed",
    Component: FeedPage,
  },
  {
    path: "/professionals/b",
    Component: ProfessionalsBPage,
  },
  // ── Brand pages (from customer portal) ──
  {
    path: "/brands",
    Component: CpBrandsPage,
  },
  {
    path: "/brands/landing",
    Component: CpBrandsLandingPage,
  },
  {
    path: "/brands/listing",
    Component: CpBrandListingPage,
  },
  {
    path: "/brands/profile/:brandName",
    Component: CpBrandProfilePage,
  },
  {
    path: "/brands/dashboard",
    Component: CpBrandDashboard,
  },
  {
    path: "/brands/signup",
    Component: CpBrandSignUp,
  },
  {
    path: "/brands/account-success",
    Component: CpBrandAccountSuccess,
  },
  {
    path: "/brands/thank-you",
    Component: CpBrandThankYou,
  },
  // ── Product pages (from customer portal) ──
  {
    path: "/cp/products",
    Component: CpProductsListingPage,
  },
  {
    path: "/cp/products/:productId",
    Component: CpProductDetailPage,
  },
  {
    path: "/professionals/:userSlug",
    Component: ProfessionalProfilePage,
  },
  // ── Services Directory (public) ──
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/services/consultant/:consultantSlug",
    Component: ConsultantProfilePage,
  },
  {
    path: "/services/project/:projectId",
    Component: ConsultantProjectDetailPage,
  },
  {
    path: "/services/professional/:userSlug",
    Component: UserPublicProfilePage,
  },
  {
    path: "/services/:categorySlug",
    Component: ServicesCategoryPage,
  },
  // ── Studio Dashboard (authenticated — studios/consultants) ──
  {
    path: "/studio",
    Component: StudioDashboardLayout,
    children: [
      { index: true, Component: StudioDashboardHome },
      { path: "jobs", Component: StudioJobsPage },
      { path: "projects", Component: StudioProjectsManagePage },
      { path: "projects/:projectId/bom", Component: StudioProjectBomPage },
      { path: "courses", Component: StudioCoursesManagePage },
      { path: "blogs", Component: StudioBlogsPage },
      { path: "profile", Component: StudioStudioManagePage },
      { path: "team", Component: StudioTeamPage },
      { path: "bookings", Component: StudioBookingsPage },
      { path: "kc-visits", Component: StudioKcVisitsPage },
      { path: "samples", Component: StudioSamplesPage },
      { path: "reviews", Component: StudioReviewsPage },
      { path: "messages", Component: StudioMessagesPage },
      { path: "analytics", Component: StudioAnalyticsPage },
      { path: "settings", Component: StudioSettingsPage },
    ],
  },
  // ── User Dashboard (authenticated — individuals/students) ──
  {
    path: "/u",
    Component: UserDashboardLayout,
    children: [
      { index: true, Component: UserDashboardHome },
      { path: "portfolio", Component: UserPortfolioPage },
      { path: "portfolio/:projectId", Component: UserPortfolioProjectPage },
      { path: "jobs", Component: UserJobsPage },
      { path: "courses", Component: UserCoursesPage },
      { path: "courses/:courseId", Component: UserCourseDetailPage },
      { path: "bookmarks", Component: UserBookmarksPage },
      { path: "samples", Component: UserSamplesPage },
      { path: "kc-visits", Component: UserKcVisitsPage },
      { path: "activity", Component: UserActivityPage },
      { path: "messages", Component: UserMessagesPage },
      { path: "profile", Component: UserProfileEditPage },
      { path: "settings", Component: UserSettingsPage },
    ],
  },
  // ── Admin Management Console ──
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: "taxonomy", Component: TaxonomyManagementPage },
      { path: "products", Component: ProductManagementPage },
      { path: "brands", Component: BrandManagementPage },
      { path: "content", Component: ContentManagementPage },
      { path: "news", Component: NewsManagementPage },
      { path: "consultants", Component: ConsultantManagementPage },
      { path: "users", Component: AdminUsersManagementPage },
      { path: "jobs", Component: AdminJobsManagementPage },
      { path: "courses", Component: AdminCoursesManagementPage },
      { path: "kc-bookings", Component: AdminKcBookingsPage },
      { path: "samples", Component: AdminSamplesPage },
      { path: "market-data", Component: MarketDataManagementPage },
      { path: "bulk-import", Component: BulkImportPage },
      { path: "contributors", Component: ContributorConsolePage },
    ],
  },
]);
