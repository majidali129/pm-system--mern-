import { signInPath } from "@/paths";
import type { CustomError } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL!,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for sending cookies with tokens
});

// Request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response?.data) {
      const customError: CustomError = {
        name: error.name,
        message: error.response.data.message,
        statusCode: error.response.data.statusCode || error.response.status,
        status: error.response.data.status || "error",
        isOperational: Boolean(error.response.data.isOperational),
      };
      // console.log(customError);

      if (customError.statusCode === 401) {
        const isManual = localStorage.getItem("isManual");
        if (isManual && isManual === "true") {
          return;
        }
        localStorage.removeItem("accessToken");
        window.location.replace(`/${signInPath()}?signedOut=true`);
        return;
      }
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  }
);

export { api };
