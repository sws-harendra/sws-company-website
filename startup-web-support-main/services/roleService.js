import api from "./api";

export const RoleService = {
  getAll: async () => {
    const { data } = await api.get("/roles");
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post("/roles", payload);
    return data;
  },
  assignPermissions: async (payload) => {
    const { data } = await api.post("/roles/assign", payload);
    return data;
  },
};
