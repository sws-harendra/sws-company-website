"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../(main)/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log("routes", router);
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Only redirect if we're not already on the login page
      if (!pathname.includes("/login")) {
        router.push("/admin/login");
      }
    }
  }, [isAuthenticated, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("here--->");
    return null;
  }

  return <>{children}</>;
}
