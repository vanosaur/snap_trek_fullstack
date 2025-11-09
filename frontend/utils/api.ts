import axios from "axios";

const base =
  process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: base,
});

export default api;
