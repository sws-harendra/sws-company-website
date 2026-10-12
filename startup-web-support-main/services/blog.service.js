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

  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/blogs/id/${id}`);
      return res.data;
    } catch {
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        return res.data;
      } catch {
        const all = await blogService.getAll();
        const found = all.find(
          (b) => String(b.id) === String(id) || b.slug === String(id)
        );
        if (found) return found;
        throw new Error("Blog not found");
      }
    }
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
    const res = await axios.delete(`${API_URL}/blogs/${id}`);
    return res.data;
  },
  setFeatured: async (id, featuredBlogIds) => {
    const res = await axios.post(`${API_URL}/blogs/${id}/featured`, {
      featuredBlogIds,
    });
    return res.data;
  },
};

export default blogService;
