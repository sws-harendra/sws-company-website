import api from "./api";

export const UserService = {
  getAll: async () => {
    const { data } = await api.get("/users");
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
  login: async (email, password) => {
    const payload = {
      email,
      password,
    };
    const res = await api.post(`/auth/login`, payload);

    if (!res.status == 200) throw new Error(data.message || "Login failed");

    // Store token and user info
    localStorage.setItem("token", res.data.token);
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    console.log("res=>", res);

    return res;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUserDetailLoggedin: async () => {
    const { data } = await api.post("/auth/userdetail");
    return data;
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  },
};
