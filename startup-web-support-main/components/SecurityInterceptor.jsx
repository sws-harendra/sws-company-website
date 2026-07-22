"use client";
import { useEffect } from "react";
import axios from "axios";

export default function SecurityInterceptor() {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          const message = error.response.data?.message?.toLowerCase();
          const isSecurityBlock =
            error.response.data?.error === "Forbidden" &&
            message === "access denied. your ip address has been blocked.";

          if (isSecurityBlock) {
            if (typeof window !== "undefined" && window.location.pathname !== "/blocked") {
              window.location.href = "/blocked";
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return null;
}
