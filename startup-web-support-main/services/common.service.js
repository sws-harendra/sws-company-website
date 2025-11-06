import { API_URL } from "@/constants";
import axios from "axios";

const CommonServices = {
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/upload-media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

export default CommonServices;
