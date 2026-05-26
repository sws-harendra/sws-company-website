"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../(main)/context/AuthContext";
import { routePermissions } from "./routePermissions";

const WithRouteProtection = ({ children }) => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Not logged in → redirect to login
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    // Check route permissions
    const requiredPermission = routePermissions[pathname];
    if (requiredPermission && !user?.permissions.includes(requiredPermission)) {
      // User does not have permission → redirect
      logout();
    }
  }, [isAuthenticated, pathname, loading, logout, router, user]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default WithRouteProtection;
