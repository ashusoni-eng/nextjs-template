import axios, { AxiosError } from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Axios instance
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token for all requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // If no token, block the request
    throw { status: 401, message: "Token not found" };
  }
  return config;
});

// Centralized error handler
const handleError = (error: AxiosError): never => {
  let message = "An unknown error occurred.";

  if (error.response) {
    const data: any = error.response.data;
    message = data?.message || data?.error || message;
    throw {
      status: error.response.status,
      message,
      data,
    };
  } else if (error.request) {
    throw { status: 0, message: "No response from server" };
  } else {
    throw { status: 0, message: error.message };
  }
};

export const api = {
  get: async <T>(path: string): Promise<T> => {
    try {
      const res = await apiClient.get<T>(path);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  post: async <T>(path: string, data: any): Promise<T> => {
    try {
      const res = await apiClient.post<T>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  put: async <T>(path: string, data: any): Promise<T> => {
    try {
      const res = await apiClient.put<T>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  patch: async <T>(path: string, data: any): Promise<T> => {
    try {
      const res = await apiClient.patch<T>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  delete: async <T>(path: string): Promise<T> => {
    try {
      const res = await apiClient.delete<T>(path);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  upload: async <T>(path: string, formData: FormData): Promise<T> => {
    try {
      const res = await apiClient.post<T>(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },
};
