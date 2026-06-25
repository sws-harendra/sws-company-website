import api from "./api";

export const getSecurityLogs = async (params) => {
  const response = await api.get("/security/logs", { params });
  return response.data;
};

export const lookupLogLocation = async (id) => {
  const response = await api.post(`/security/logs/${id}/lookup`);
  return response.data;
};

export const getSecurityStats = async () => {
  const response = await api.get("/security/stats");
  return response.data;
};

export const getBlockedRules = async (params) => {
  const response = await api.get("/security/blocks", { params });
  return response.data;
};

export const addBlockRule = async (data) => {
  const response = await api.post("/security/blocks", data);
  return response.data;
};

export const deleteBlockRule = async (id) => {
  const response = await api.delete(`/security/blocks/${id}`);
  return response.data;
};
