"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AdminThemeContext = createContext();

export const AdminThemeProvider = ({ children }) => {
  const [isAdminDark, setIsAdminDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "dark") {
      setIsAdminDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsAdminDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleAdminTheme = () => {
    setIsAdminDark((prev) => {
      const newVal = !prev;
      localStorage.setItem("admin-theme", newVal ? "dark" : "light");
      if (newVal) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newVal;
    });
  };

  return (
    <AdminThemeContext.Provider value={{ isAdminDark, toggleAdminTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
};
