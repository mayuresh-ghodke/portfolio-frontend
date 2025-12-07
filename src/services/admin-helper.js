
import axios from "axios";

export const myAxios = axios.create({
  baseURL: "http://localhost:8030",
  withCredentials: true,      // <-- REQUIRED FOR SESSION COOKIE
});