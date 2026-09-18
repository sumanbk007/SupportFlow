import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "./types";
import { storage } from "@services/storage";
import { config } from "@config/env";

console.log("API URL:", import.meta.env.VITE_API_URL);

const client = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(config, "baseurle");

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    console.log(error, "error");
    const status = error.response?.status || 0;
    const message = error.response?.data?.message ?? "Something went wrong";

    if (status === 401) {
      storage.clearAll();
      window.location.href = "/login";
    }

    return Promise.reject({
      message,
      statusCode: status,
      errors: error.response?.data?.errors,
    } satisfies ApiError);
  },
);

export { client };
