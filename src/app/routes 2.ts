import { createBrowserRouter } from "react-router";

// ── Layouts ──
import { PublicLayout } from "./components/PublicLayout";

// ── Public Pages ──
import { HomePage } from "./components/pages/HomePage";
import { HierarchyPage } from "./components/pages/HierarchyPage";
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
import { ForgotPasswordPage } from "./components/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import { VerifyEmailPage } from "./components/pages/VerifyEmailPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { CartPage } from "./components/pages/CartPage";
import { WishlistPage } from "./components/pages/WishlistPage";
import { WishlistProjectsPage } from "./components/shared/WishlistProjectsPage";
import { ChatPage } from "./components/pages/ChatPage";
import { EventsBrowsePage } from "./components/pages/EventsBrowsePage";
import { EventDetailPage } from "./components/pages/EventDetailPage";
import {
  BrandEventsPage, BrandEventDetailPage,
  StudioEventsPage, StudioEventDetailPage,
  InstituteEventsPage, InstituteEventDetailPage,
} from "./components/events/stakeholderWrappers";
import { AdminV1Page } from "./components/pages/AdminV1Page";
import {
  EducationistDashboardPage,
  InstituteDashboardPage,
  EndUserDashboardPage,
  StoreDashboardPage,
  FacultyDashboardPage,
} from "./components/pages/RoleDashboardPages";

// ── Customer-portal pages (imported from ML_Customer Portal repo) ──
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
  CpSignInPage,
  CpSignUpPage,
  CpStudentSignUpPage,
  CpV1ProfessionalsPage,
  CpV1ServicesPage,
  CpV1ProfessionalProfilePage,
  CpV1ContractorListingPage,
  CpV1ContractorMicrositePage,
  CpV1ContractorServicesPage,
  CpV1ProfessionalsLandingPage,
  CpV1ProfessionalListingPage,
  CpV1ProfessionalMicrositePage,
  CpV1ProfessionalDirectoryPage,
  CpV1StudioDirectoryPage,
  CpV1StudioProfilePage,
  CpV1StudioMicrositePage,
  CpV1FirmMicrositePage,
  CpV1IndividualProfessionalMicrositePage,
  CpV1ServiceDetailPage,
  CpV1ServiceDetailFullPage,
  CpV1ServiceProfessionalsLandingPage,
  CpV1StudentsLandingPage,
  CpV1DesignersLandingPage,
  CpV1StudiosLandingPage,
  CpV1BrandsLandingPage,
  CpV1FacultyLandingPage,
  CpV1CategoryDetailPage,
  CpV1SubCategoryPage,
  CpV1HomePage,
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
import { StudioProjectDetailPage } from "./components/studio/StudioProjectDetailPage";

// ── Customer Dashboard ──
import { CustomerDashboardLayout } from "./components/customer/CustomerDashboardLayout";
import { CustomerDashboardHome, CustomerProjectsPage, CustomerMoodboardPage } from "./components/customer/CustomerPages";
import { CustomerActivitiesPage } from "./components/customer/CustomerActivitiesPage";

// ── Student Dashboard ──
import { StudentDashboardLayout } from "./components/student/StudentDashboardLayout";
import { StudentDashboardHome } from "./components/student/StudentDashboardHome";
import { StudentAssignmentsPage } from "./components/student/StudentAssignmentsPage";
import { StudentJobsPage } from "./components/student/StudentJobsPage";
import { StudentRewardsPage } from "./components/student/StudentRewardsPage";

// ── User pages (shared with customer dashboard) ──
import { UserCoursesPage } from "./components/user/UserCoursesPage";
import { UserCourseDetailPage } from "./components/user/UserCourseDetailPage";
import { UserProfileEditPage } from "./components/user/UserProfileEditPage";
import { UserSettingsPage } from "./components/user/UserSettingsPage";
import { UserPortfolioPage } from "./components/user/UserPortfolioPage";
import { UserBookmarksPage } from "./components/user/UserBookmarksPage";
import { UserMessagesPage } from "./components/user/UserMessagesPage";

// ── Brand Dashboard ──
import { BrandDashboardLayout } from "./components/brand_dashboard/BrandDashboardLayout";
import { BrandDashboardHome } from "./components/brand_dashboard/BrandDashboardHome";
import { BrandProductsPage, BrandLeadsPage, BrandAnalyticsPage, BrandCataloguePage, BrandKcVisitsPage, BrandMessagesPage, BrandProfileEditPage, BrandSettingsPage } from "./components/brand_dashboard/BrandStubPages";
import { BrandTeamPage } from "./components/brand_dashboard/BrandTeamPage";

// ── Faculty Dashboard ──
import { FacultyDashboardLayout } from "./components/faculty/FacultyDashboardLayout";
import { FacultyDashboardHome } from "./components/faculty/FacultyDashboardHome";
import { FacultyCoursesPage, FacultyStudentsPage, FacultyAssignmentsPage, FacultySchedulePage, FacultyResearchPage, FacultyMessagesPage, FacultyProfileEditPage, FacultySettingsPage } from "./components/faculty/FacultyStubPages";
import { FacultyProfilePage } from "./components/pages/FacultyProfilePage";

// ── Designer ──
import { DesignerProfilePage } from "./components/pages/DesignerProfilePage";
import { StudentPublicProfilePage } from "./components/pages/StudentPublicProfilePage";
import { WorkVerificationPage } from "./components/pages/WorkVerificationPage";
import { DesignerDashboardLayout } from "./components/designer/DesignerDashboardLayout";
import { DesignerDashboardHome } from "./components/designer/DesignerDashboardHome";
import { DesignerJobsPage } from "./components/designer/DesignerJobsPage";
import { DesignerCoursesPage } from "./components/designer/DesignerCoursesPage";
import { DesignerCertificationsPage } from "./components/designer/DesignerCertificationsPage";
import { DesignerBlogsPage } from "./components/designer/DesignerBlogsPage";
import { DesignerActivityPage } from "./components/designer/DesignerActivityPage";
import { DesignerMessagesPage, DesignerProfileEditPage, DesignerSettingsPage } from "./components/designer/DesignerStubPages";
import { DesignerWorkspacePage } from "./components/designer/DesignerWorkspacePage";

// ── Institute Dashboard ──
import { InstituteDashboardLayout } from "./components/institute/InstituteDashboardLayout";
import { InstituteDashboardHome } from "./components/institute/InstituteDashboardHome";
import { InstituteCoursesPage } from "./components/institute/InstituteCoursesPage";
import { InstituteFacultyPage } from "./components/institute/InstituteFacultyPage";
import { InstituteStudentsPage } from "./components/institute/InstituteStudentsPage";
import { InstituteAnalyticsPage } from "./components/institute/InstituteAnalyticsPage";
import { InstituteReviewsPage } from "./components/institute/InstituteReviewsPage";
import { InstituteSettingsPage } from "./components/institute/InstituteSettingsPage";
import { InstitutePlacementsPage, InstituteMessagesPage, InstituteProfileEditPage, InstituteJobsPage } from "./components/institute/InstituteStubPages";
import { InstituteTeamPage } from "./components/institute/InstituteTeamPage";
import { InstitutePublicProfilePage } from "./components/pages/InstitutePublicProfilePage";

// ── Dealer ──
import { DealerPublicProfilePage } from "./components/pages/DealerPublicProfilePage";
import { DealerDashboardLayout } from "./components/dealer/DealerDashboardLayout";
import { DealerDashboardHome } from "./components/dealer/DealerDashboardHome";
import { DealerInventoryPage } from "./components/dealer/DealerInventoryPage";
import { DealerServiceAreasPage } from "./components/dealer/DealerServiceAreasPage";

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
import { AdminRBACPage } from "./components/admin/AdminRBACPage";
import { AdminApprovalsPage } from "./components/admin/AdminApprovalsPage";
import { AdminRoleDashboardPage } from "./components/admin/AdminRoleDashboardPage";
import { AdminSubscriptionsPage } from "./components/admin/AdminSubscriptionsPage";
import { AdminAdsPage } from "./components/admin/AdminAdsPage";
import { AdminCareersPage } from "./components/admin/AdminCareersPage";
import { AdminProfilePage } from "./components/admin/AdminProfilePage";
import { AdminTeamPage } from "./components/admin/AdminTeamPage";

export const router = createBrowserRouter([
  // ── Public site (global Navbar + Footer via PublicLayout) ──
  {
    Component: PublicLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/layer/:nodeId", Component: HierarchyPage },
      { path: "/products", Component: CpProductsListingPage },
      { path: "/products/:l5Id", Component: CpProductsListingPage },
      { path: "/product/:productId", Component: CpProductDetailPage },
      { path: "/brand/:brandId", Component: CpBrandProfilePage },
      { path: "/blog", Component: BlogListingPage },
      { path: "/blog/create", Component: BlogEditorPage },
      { path: "/blog/:blogId", Component: BlogDetailPage },
      { path: "/jobs", Component: PublicJobBoardPage },
      { path: "/courses", Component: PublicCourseCatalogPage },
      { path: "/kc", Component: KcInfoPage },
      { path: "/professionals", Component: ProfessionalsPage },
      { path: "/feed", Component: FeedPage },
      { path: "/professionals/b", Component: ProfessionalsBPage },

      // Auth (from customer portal)
      { path: "/signin", Component: CpSignInPage },
      { path: "/signup", Component: CpSignUpPage },
      { path: "/signup/student", Component: CpStudentSignUpPage },
      { path: "/forgot-password", Component: ForgotPasswordPage },
      { path: "/reset-password", Component: ResetPasswordPage },
      { path: "/verify-email", Component: VerifyEmailPage },

      // Cart / wishlist / notifications / chat
      { path: "/cart", Component: CartPage },
      { path: "/wishlist", Component: WishlistPage },
      { path: "/notifications", Component: NotificationsPage },
      { path: "/chat", Component: ChatPage },
      { path: "/events", Component: EventsBrowsePage },
      { path: "/events/:eventId", Component: EventDetailPage },

      // Role-specific dashboard stubs (full builds coming in later sprints)
      { path: "/educationist", Component: EducationistDashboardPage },
      { path: "/end-user", Component: EndUserDashboardPage },
      { path: "/store", Component: StoreDashboardPage },
      { path: "/faculty", Component: FacultyDashboardPage },

      // Brand pages (from customer portal)
      { path: "/brands", Component: CpBrandsPage },
      { path: "/brands/landing", Component: CpBrandsLandingPage },
      { path: "/brands/listing", Component: CpBrandListingPage },
      { path: "/brands/dashboard", Component: CpBrandDashboard },
      { path: "/brands/signup", Component: CpBrandSignUp },
      { path: "/brands/account-success", Component: CpBrandAccountSuccess },
      { path: "/brands/thank-you", Component: CpBrandThankYou },

      { path: "/professionals/:userSlug", Component: ProfessionalProfilePage },

      // Services Directory (public)
      { path: "/services", Component: ServicesPage },
      { path: "/services/consultant/:consultantSlug", Component: ConsultantProfilePage },
      { path: "/services/project/:projectId", Component: ConsultantProjectDetailPage },
      { path: "/services/professional/:userSlug", Component: UserPublicProfilePage },
      { path: "/services/:categorySlug", Component: ServicesCategoryPage },

      // ── Designer public profile ──
      { path: "/designer/:designerId", Component: DesignerProfilePage },
      { path: "/verify/:companySlug/:candidateSlug", Component: WorkVerificationPage },

      // ── Student public profile ──
      { path: "/student/:studentId", Component: StudentPublicProfilePage },

      // ── Faculty public profile ──
      { path: "/faculty/:facultyId", Component: FacultyProfilePage },

      // ── Institute public profile ──
      { path: "/college/:collegeId", Component: InstitutePublicProfilePage },

      // ── Dealer public profile ──
      { path: "/store/:dealerId", Component: DealerPublicProfilePage },

      // ── Customer-portal v1 routes (accessible via footer "from v1" links) ──
      { path: "/v1", Component: CpV1HomePage },
      { path: "/v1/professionals", Component: CpV1ProfessionalsPage },
      { path: "/v1/professionals/landing", Component: CpV1ProfessionalsLandingPage },
      { path: "/v1/professionals/listing", Component: CpV1ProfessionalListingPage },
      { path: "/v1/professionals/directory", Component: CpV1ProfessionalDirectoryPage },
      { path: "/v1/professionals/microsite/:professionalId", Component: CpV1ProfessionalMicrositePage },
      { path: "/v1/professionals/profile/:professionalId", Component: CpV1ProfessionalProfilePage },
      { path: "/v1/professionals/individual/:professionalId", Component: CpV1IndividualProfessionalMicrositePage },
      { path: "/v1/services", Component: CpV1ServicesPage },
      { path: "/v1/services/contractor-listing", Component: CpV1ContractorListingPage },
      { path: "/v1/services/contractor-microsite/:contractorId", Component: CpV1ContractorMicrositePage },
      { path: "/v1/services/contractor", Component: CpV1ContractorServicesPage },
      { path: "/v1/services/detail/:serviceId", Component: CpV1ServiceDetailPage },
      { path: "/v1/services/full/:serviceId", Component: CpV1ServiceDetailFullPage },
      { path: "/v1/services/professionals-landing", Component: CpV1ServiceProfessionalsLandingPage },
      { path: "/v1/studios/directory", Component: CpV1StudioDirectoryPage },
      { path: "/v1/studios/profile/:studioId", Component: CpV1StudioProfilePage },
      { path: "/v1/studios/microsite/:studioId", Component: CpV1StudioMicrositePage },
      { path: "/v1/studios/landing", Component: CpV1StudiosLandingPage },
      { path: "/v1/firms/microsite/:firmId", Component: CpV1FirmMicrositePage },
      { path: "/v1/students/landing", Component: CpV1StudentsLandingPage },
      { path: "/v1/designers/landing", Component: CpV1DesignersLandingPage },
      { path: "/v1/brands/landing", Component: CpV1BrandsLandingPage },
      { path: "/v1/faculty/landing", Component: CpV1FacultyLandingPage },
      { path: "/v1/categories/:categoryId", Component: CpV1CategoryDetailPage },
      { path: "/v1/subcategories/:subcategoryId", Component: CpV1SubCategoryPage },
    ],
  },

  // ── Designer Dashboard ──
  {
    path: "/d",
    Component: DesignerDashboardLayout,
    children: [
      { index: true, Component: DesignerDashboardHome },
      { path: "jobs",           Component: DesignerJobsPage },
      { path: "courses",        Component: DesignerCoursesPage },
      { path: "certifications", Component: DesignerCertificationsPage },
      { path: "blogs",          Component: DesignerBlogsPage },
      { path: "activity",       Component: DesignerActivityPage },
      { path: "workspace",      Component: DesignerWorkspacePage },
      { path: "messages",       Component: DesignerMessagesPage },
      { path: "wishlist",       Component: WishlistProjectsPage },
      { path: "profile",        Component: DesignerProfileEditPage },
      { path: "settings",       Component: DesignerSettingsPage },
    ],
  },

  // ── Studio Dashboard (authenticated — studios/consultants) ──
  {
    path: "/studio",
    Component: StudioDashboardLayout,
    children: [
      { index: true, Component: StudioDashboardHome },
      { path: "jobs", Component: StudioJobsPage },
      { path: "projects", Component: StudioProjectsManagePage },
      { path: "projects/:projectId", Component: StudioProjectDetailPage },
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
      { path: "wishlist", Component: WishlistProjectsPage },
      { path: "analytics", Component: StudioAnalyticsPage },
      { path: "settings", Component: StudioSettingsPage },
      { path: "events",          Component: StudioEventsPage },
      { path: "events/:eventId", Component: StudioEventDetailPage },
    ],
  },
  // ── ML Admin (v1) — standalone admin centre from customer-portal export ──
  {
    path: "/v1/admin",
    Component: AdminV1Page,
  },
  // ── Customer Dashboard ──
  {
    path: "/u",
    Component: CustomerDashboardLayout,
    children: [
      { index: true,           Component: CustomerDashboardHome },
      { path: "projects",      Component: CustomerProjectsPage },
      { path: "moodboard",     Component: CustomerMoodboardPage },
      { path: "activities",    Component: CustomerActivitiesPage },
      { path: "wishlist",      Component: WishlistProjectsPage },
      { path: "profile",       Component: UserProfileEditPage },
      { path: "settings",      Component: UserSettingsPage },
      { path: "courses",       Component: UserCoursesPage },
      { path: "courses/:courseId", Component: UserCourseDetailPage },
    ],
  },
  // ── Student Dashboard ──
  {
    path: "/s",
    Component: StudentDashboardLayout,
    children: [
      { index: true,                Component: StudentDashboardHome },
      { path: "assignments",        Component: StudentAssignmentsPage },
      { path: "courses",            Component: UserCoursesPage },
      { path: "courses/:courseId",  Component: UserCourseDetailPage },
      { path: "jobs",               Component: StudentJobsPage },
      { path: "portfolio",          Component: UserPortfolioPage },
      { path: "bookmarks",          Component: UserBookmarksPage },
      { path: "rewards",            Component: StudentRewardsPage },
      { path: "messages",           Component: UserMessagesPage },
      { path: "profile",            Component: UserProfileEditPage },
      { path: "settings",           Component: UserSettingsPage },
    ],
  },
  // ── Faculty Dashboard ──
  {
    path: "/f",
    Component: FacultyDashboardLayout,
    children: [
      { index: true, Component: FacultyDashboardHome },
      { path: "courses",     Component: FacultyCoursesPage },
      { path: "students",    Component: FacultyStudentsPage },
      { path: "assignments", Component: FacultyAssignmentsPage },
      { path: "schedule",    Component: FacultySchedulePage },
      { path: "research",    Component: FacultyResearchPage },
      { path: "messages",    Component: FacultyMessagesPage },
      { path: "wishlist",    Component: WishlistProjectsPage },
      { path: "profile",     Component: FacultyProfileEditPage },
      { path: "settings",    Component: FacultySettingsPage },
    ],
  },

  // ── Brand Dashboard ──
  {
    path: "/b",
    Component: BrandDashboardLayout,
    children: [
      { index: true,            Component: BrandDashboardHome },
      { path: "products",       Component: BrandProductsPage },
      { path: "leads",          Component: BrandLeadsPage },
      { path: "analytics",      Component: BrandAnalyticsPage },
      { path: "catalogue",      Component: BrandCataloguePage },
      { path: "events",          Component: BrandEventsPage },
      { path: "events/:eventId", Component: BrandEventDetailPage },
      { path: "kc-visits",      Component: BrandKcVisitsPage },
      { path: "messages",       Component: BrandMessagesPage },
      { path: "wishlist",       Component: WishlistProjectsPage },
      { path: "profile",        Component: BrandProfileEditPage },
      { path: "team",           Component: BrandTeamPage },
      { path: "settings",       Component: BrandSettingsPage },
    ],
  },

  // ── Institute Dashboard ──
  {
    path: "/institute",
    Component: InstituteDashboardLayout,
    children: [
      { index: true,           Component: InstituteDashboardHome },
      { path: "courses",       Component: InstituteCoursesPage },
      { path: "faculty",       Component: InstituteFacultyPage },
      { path: "students",      Component: InstituteStudentsPage },
      { path: "placements",    Component: InstitutePlacementsPage },
      { path: "events",          Component: InstituteEventsPage },
      { path: "events/:eventId", Component: InstituteEventDetailPage },
      { path: "analytics",     Component: InstituteAnalyticsPage },
      { path: "reviews",       Component: InstituteReviewsPage },
      { path: "messages",      Component: InstituteMessagesPage },
      { path: "wishlist",      Component: WishlistProjectsPage },
      { path: "profile",       Component: InstituteProfileEditPage },
      { path: "team",          Component: InstituteTeamPage },
      { path: "jobs",          Component: InstituteJobsPage },
      { path: "settings",      Component: InstituteSettingsPage },
    ],
  },

  // ── Dealer Dashboard ──
  {
    path: "/dealer",
    Component: DealerDashboardLayout,
    children: [
      { index: true,         Component: DealerDashboardHome },
      { path: "inventory",   Component: DealerInventoryPage },
      { path: "areas",       Component: DealerServiceAreasPage },
      { path: "orders",      Component: DealerDashboardHome },
      { path: "messages",    Component: DealerDashboardHome },
      { path: "analytics",   Component: DealerDashboardHome },
      { path: "wishlist",    Component: WishlistProjectsPage },
      { path: "profile",     Component: DealerDashboardHome },
      { path: "settings",    Component: DealerDashboardHome },
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
      { path: "market-data",     Component: MarketDataManagementPage },
      { path: "bulk-import",     Component: BulkImportPage },
      { path: "contributors",    Component: ContributorConsolePage },
      { path: "team",            Component: AdminTeamPage },
      { path: "rbac",            Component: AdminRBACPage },
      { path: "approvals",       Component: AdminApprovalsPage },
      { path: "role-dashboard",  Component: AdminRoleDashboardPage },
      { path: "subscriptions",   Component: AdminSubscriptionsPage },
      { path: "ads",             Component: AdminAdsPage },
      { path: "careers",         Component: AdminCareersPage },
      { path: "profile",         Component: AdminProfilePage },
    ],
  },
]);
