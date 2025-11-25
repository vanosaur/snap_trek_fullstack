import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
});

api.interceptors.request.use(
  (config) => {
    // Check if window is defined (to avoid server-side errors)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Or "jwt", "userToken", etc.
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
