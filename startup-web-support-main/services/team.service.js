import api from "./api"; // your axios instance

const teamService = {
  async getAll() {
    const res = await api.get("/teams");
    return res.data.data;
  },

  async getById(id) {
    const res = await api.get(`/teams/${id}`);
    return res.data.data;
  },

  async create(data) {
    const res = await api.post("/teams", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/teams/${id}`, data);
    return res.data;
  },

  async remove(id) {
    const res = await api.delete(`/teams/${id}`);
    return res.data;
  },
};

export default teamService;
