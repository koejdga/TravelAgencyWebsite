import { AUTH_TOKEN } from "../constants";
import axios from "axios";

const token = localStorage.getItem(AUTH_TOKEN);

// export const config = {
//   link: "http://localhost:8080",
//   headers: { headers: { authorization: token ? `${token}` : "" } },
// };

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: {
    authorization: token ? `${token}` : "",
  },
});

// export default config;
