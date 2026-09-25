import api from "./api";

export const login = (form) => api.post("/login", form);

export const signup = (form) => api.post("/signup", form);