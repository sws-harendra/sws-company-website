import { API_URL } from "@/constants";
import axios from "axios";

const bannerService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/banners`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/banners/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/banners`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/banners/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    await axios.delete(`${API_URL}/banners/${id}`);
  },
};

export default bannerService;
