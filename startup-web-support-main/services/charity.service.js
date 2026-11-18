import { API_URL } from "@/constants";
import api from "./api";
import axios from "axios";

const charityService = {
  getAll: async ({
    page = 1,
    limit = 100,
    search = "",
    category = "all",
    status = "all",
    featured = "all",
  } = {}) => {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search && search.trim() !== "") params.append("search", search.trim());
    if (category && category !== "all") params.append("category", category);
    if (status && status !== "all") params.append("status", status);
    if (featured !== undefined && featured !== "all") params.append("featured", featured);

    try {
      const res = await api.get(`/charity?${params.toString()}`);
      return res.data;
    } catch {
      const res = await axios.get(`${API_URL}/charity?${params.toString()}`);
      return res.data;
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/charity/${id}`);
      return res.data;
    } catch {
      const res = await axios.get(`${API_URL}/charity/${id}`);
      return res.data;
    }
  },

  create: async (data) => {
    try {
      const res = await api.post("/charity", data);
      return res.data;
    } catch {
      const res = await axios.post(`${API_URL}/charity`, data);
      return res.data;
    }
  },

  update: async (id, data) => {
    try {
      const res = await api.put(`/charity/${id}`, data);
      return res.data;
    } catch {
      const res = await axios.put(`${API_URL}/charity/${id}`, data);
      return res.data;
    }
  },

  remove: async (id) => {
    try {
      const res = await api.delete(`/charity/${id}`);
      return res.data;
    } catch {
      const res = await axios.delete(`${API_URL}/charity/${id}`);
      return res.data;
    }
  },
};

export default charityService;
