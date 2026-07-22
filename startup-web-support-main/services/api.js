import { API_URL } from "@/constants";
import axios from "axios";

let finalBaseURL = API_URL || "http://localhost:8000/api";
if (
  finalBaseURL &&
  !finalBaseURL.endsWith("/api") &&
  !finalBaseURL.endsWith("/api/")
) {
  finalBaseURL = finalBaseURL.replace(/\/+$/, "") + "/api";
}

const api = axios.create({
  baseURL: finalBaseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      const message = error.response.data?.message?.toLowerCase();
      const isSecurityBlock =
        error.response.data?.error === "Forbidden" &&
        message === "access denied.";

      if (isSecurityBlock) {
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/blocked"
        ) {
          window.location.href = "/blocked";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
