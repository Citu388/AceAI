import axios from "axios";
import { BASE_URL } from "../../../constants";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const res = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return res.data;
}

export async function login({ email, password }) {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await api.get("/api/auth/logout");
  return res.data;
}

export async function getMe() {
  const res = await api.get("/api/user/get-me");
  return res.data;
}
