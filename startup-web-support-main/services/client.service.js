// services/client.service.js
import { API_URL } from "@/constants";
import axios from "axios";

const clientService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/our-clients`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/our-clients/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/our-clients`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/our-clients/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/our-clients/${id}`);
    return res.data;
  },
};

export default clientService;
