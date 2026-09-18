import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import { ROUTES } from "./constants.routes";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { LoginPage, SignupPage } from "@pages/index";
import Dashboard from "@pages/dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Settings from "@pages/settings/Settings";

const publicRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <SignupPage />,
      },
    ],
  },
];

const protectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/leads", element: <Dashboard /> },
          { path: "/students", element: <Dashboard /> },
          { path: "/tasks", element: <Dashboard /> },
          { path: "/reports", element: <Dashboard /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);
