import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketbooks-backend.onrender.com",
});
