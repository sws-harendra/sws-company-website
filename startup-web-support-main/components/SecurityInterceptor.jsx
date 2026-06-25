"use client";
import { useEffect } from "react";
import axios from "axios";

export default function SecurityInterceptor() {
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          const msg = error.response.data?.message;
          if (msg && msg.toLowerCase().includes("blocked")) {
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
