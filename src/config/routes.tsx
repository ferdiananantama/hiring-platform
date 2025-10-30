import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Lazy load components for better performance
const Dashboard = lazy(() => import("@/app/admin/job-list/page"));
const Dashboard2 = lazy(() => import("@/app/admin/manage-job/page"));
const Tasks = lazy(() => import("@/app/user/job-listing/page"));
const Pricing = lazy(() => import("@/app/user/application-form/page"));
const SuccessApply = lazy(() => import("@/app/user/success/page"));

// Auth pages
const SignIn = lazy(() => import("@/app/auth/sign-in/page"));
const SignUp = lazy(() => import("@/app/auth/sign-up/page"));

// Error pages
const Unauthorized = lazy(() => import("@/app/errors/unauthorized/page"));
const Forbidden = lazy(() => import("@/app/errors/forbidden/page"));
const NotFound = lazy(() => import("@/app/errors/not-found/page"));
const InternalServerError = lazy(
  () => import("@/app/errors/internal-server-error/page")
);
const UnderMaintenance = lazy(
  () => import("@/app/errors/under-maintenance/page")
);

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  // Default route - redirect to dashboard
  // Use relative path "dashboard" instead of "/dashboard" for basename compatibility
  {
    path: "/",
    element: <Navigate to="auth/sign-in" replace />,
  },

  // Dashboard Routes
  {
    path: "dashboard/admin/job-list",
    element: <Dashboard />,
  },
  {
    path: "dashboard/admin/manage-job/:id",
    element: <Dashboard2 />,
  },
  {
    path: "dashboard/success/apply",
    element: <SuccessApply />,
  },
  {
    path: "dashboard/user/job-list",
    element: <Tasks />,
  },
  {
    path: "user/apply/:id",
    element: <Pricing />,
  },

  // Authentication Routes
  {
    path: "auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "auth/sign-up",
    element: <SignUp />,
  },

  // Error Pages
  {
    path: "errors/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "errors/forbidden",
    element: <Forbidden />,
  },
  {
    path: "errors/not-found",
    element: <NotFound />,
  },
  {
    path: "errors/internal-server-error",
    element: <InternalServerError />,
  },
  {
    path: "errors/under-maintenance",
    element: <UnderMaintenance />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
