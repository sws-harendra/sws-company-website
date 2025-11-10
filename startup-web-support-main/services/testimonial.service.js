import { API_URL } from "@/constants";
import axios from "axios";

const testimonialService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/testimonials`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/testimonials/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/testimonials`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/testimonials/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/testimonials/${id}`);
    return res.data;
  },
};

export default testimonialService;
