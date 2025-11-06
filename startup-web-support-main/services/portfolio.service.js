import { API_URL } from "@/constants";
import axios from "axios";

const portfolioService = {
  getAll: async ({ page = 1, limit = 6 }) => {
    // const query = new URLSearchParams(params).toString();
    const res = await axios.get(
      `${API_URL}/portfolio?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/portfolio/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/portfolio`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/portfolio/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/portfolio/${id}`);
    return res.data;
  },
};

export default portfolioService;
