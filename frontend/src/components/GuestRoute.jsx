// src/components/GuestRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function GuestRoute({ children }) {
  // Get auth state from Redux
  const { token } = useSelector((state) => state.auth);

  // If user is logged in, redirect to dashboard
  if (token) return <Navigate to="/dashboard" replace />;

  // Otherwise, allow access to the route
  return children;
}
