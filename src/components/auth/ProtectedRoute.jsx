import { Navigate, Outlet } from "react-router-dom";
import cookie from "js-cookie";

const ProtectedRoute = () => {
  // Get token from cookies
  const token = cookie.get("token");

  console.log("User Token:", token); // Debug: Log token

  // If token exists, user is authenticated
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    console.log("Access granted - user is authenticated");
    return <Outlet />;
  }

  console.log("Access denied - redirecting to home");
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
