import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/jwt";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAdminRoute?: boolean;
}

export default function PrivateRoute({
  children,
  isAdminRoute,
}: PrivateRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{message:"EXP-JWT"}} />;
  }
  if (isAdminRoute && !isAdmin(token)) {
    return <Navigate to="/nba-Report" replace state={{message:"UNAUTHORIZED"}} />;
  }
  return <>{children}</>;
}
