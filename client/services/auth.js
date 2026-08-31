import { api } from "./api";

export const login = (form) =>
  api("/login", {
    method: "POST",
    body: JSON.stringify(form),
  });

export const signup = (form) =>
  api("/signup", {
    method: "POST",
    body: JSON.stringify(form),
  });
