import api from "./api";

export const PermissionService = {
  getAll: async () => {
    const { data } = await api.get("/permissions");
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post("/permissions", payload);
    return data;
  },
};
