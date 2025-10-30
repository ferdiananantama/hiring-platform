import React from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem("userRole") !== null;
  const userRole = localStorage.getItem("userRole"); 
  const navigate = useNavigate();

  if (!isLoggedIn || userRole !== requiredRole) {
    navigate("/auth/sign-in");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
