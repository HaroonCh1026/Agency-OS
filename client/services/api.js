import axios from "axios";
import { getToken, removeToken } from "@/utils/storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // let the broweser switch do form instance if file is attached
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (response) => ({
    ok: true,
    status: response.status,
    data: response.data,
  }),
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        removeToken();
      }
      return Promise.resolve({
        ok: false,
        status: error.response.status,
        data: error.response.data,
      });
    }
    console.error("API request failed:", error);
    return Promise.resolve({
      ok: false,
      status: 0,
      data: null,
      error: "NETWORK_ERROR",
    });
  }
);

export default api;
