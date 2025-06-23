// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

api.interceptors.request.use(config => {
  // Para ambiente de desenvolvimento, use sessionStorage ou estado global
  // localStorage não funciona em artifacts do Claude
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;