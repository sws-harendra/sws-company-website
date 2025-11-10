"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const token = UserService.getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        UserService.logout();
        router.push("/admin/login");

        return;
      }

      const res = await UserService.getUserDetailLoggedin();
      if (res.status === 401) {
        // Token is invalid, clear it
        UserService.removeToken();
        setUser(null);
      } else {
        setUser(res.data?.user || res.data || null);
      }
    } catch (error) {
      console.error("Auth fetch error:", error);
      UserService.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData, token) => {
    try {
      // Use UserService to set token consistently
      localStorage.setItem("token", token);
      setUser(userData);
      setLoading(false);

      // Redirect after state update
      router.push("/admin"); // or wherever you want to redirect
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    UserService.removeToken();
    setUser(null);
    router.push("/admin/login");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refetchUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
