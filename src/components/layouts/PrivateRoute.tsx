// src/components/PrivateRoute.tsx
import React from "react";
import { useAuthStore } from "@/store/useAuthStore"; // Menggunakan store Zustand
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useNavigate();

  if (!isLoggedIn) {
    router("/auth/sign-in");
    return null; 
  }

  return <>{children}</>; 
};

export default PrivateRoute;
