// services/blog.service.js
import { API_URL } from "@/constants";
import axios from "axios";

const blogService = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${API_URL}/blogs`);
    return res.data;
  },

  getBySlug: async (slug) => {
    const res = await axios.get(`${API_URL}/blogs/${slug}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/blogs`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/blogs/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};

export default blogService;
