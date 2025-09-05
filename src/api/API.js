import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const APIBolsistaImage = axios.create({
  baseURL: "/ft",
});

APIBolsistaImage.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("upload_token");
    if (token) {
      config.headers["x-access-token"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
