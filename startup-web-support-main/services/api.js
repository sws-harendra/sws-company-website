import { API_URL } from "@/constants";
import axios from "axios";

let finalBaseURL = API_URL || "http://localhost:8000/api";
if (finalBaseURL && !finalBaseURL.endsWith("/api") && !finalBaseURL.endsWith("/api/")) {
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

export default api;
