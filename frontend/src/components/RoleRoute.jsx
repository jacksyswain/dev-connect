// src/components/RoleRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RoleRoute({ allowedRoles, children }) {
  // Get logged-in user from Redux state
  const { user } = useSelector((state) => state.auth);

  // If user doesn't exist or role is not allowed, redirect to dashboard
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If role is allowed, render the child component
  return children;
}
