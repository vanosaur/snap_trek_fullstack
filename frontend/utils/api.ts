import axios from "axios";

const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    console.warn("NEXT_PUBLIC_API_BASE_URL is not defined. Falling back to localhost:8080");
    return "http://localhost:8080/api";
  }
  return url.endsWith("/api") ? url : `${url}/api`;
};

const calculatedBaseURL = getBaseURL();
console.log("🛠️ API Base URL initialized:", calculatedBaseURL);

const api = axios.create({
  baseURL: getBaseURL(),
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
