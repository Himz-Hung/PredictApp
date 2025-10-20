import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/ld+json",
  },
});

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    if (status === 401) {
      const token = localStorage.getItem("token");
      if (token && currentPath !== "/login") {
        localStorage.removeItem("token");

        const authError = new Error(
          "JWT-INVALID"
        );
        return Promise.reject(authError);
      }
    }

    return Promise.reject(error); 
  }
);

export default axiosClient;
