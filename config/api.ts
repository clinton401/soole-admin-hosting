import axios from "axios";
import { NEXT_API_URL } from "./variables";

const api = axios.create({
  baseURL: `${NEXT_API_URL}/admin`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request, logging out...");
        localStorage.removeItem("authToken");
        const pathname = window.location.pathname;
        if(pathname !== "/auth/login" && pathname !== "/auth/register"){
        window.location.href = "/auth/login"; 
        }
      }
      return Promise.reject(error);
    }
  );
  
export default api;
