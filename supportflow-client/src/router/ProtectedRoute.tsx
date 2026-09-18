import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuth = Boolean(localStorage.getItem("access_token"));

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
