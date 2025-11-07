// services/invoice.service.js
import { API_URL } from "@/constants";
import axios from "axios";

const invoiceService = {
  getAll: async ({ page = 1, limit = 10 } = {}) => {
    const res = await axios.get(
      `${API_URL}/invoices?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/invoices/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_URL}/invoices`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_URL}/invoices/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/invoices/${id}`);
    return res.data;
  },
  download: async (invoiceId) => {
    const response = await axios.get(
      `${API_URL}/invoices/invoice-pdf/${invoiceId}`, // ✅ this matches your backend route
      {
        responseType: "blob", // ✅ must be inside the config object
      }
    );

    // Create blob and trigger download in browser
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${invoiceId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};

export default invoiceService;
