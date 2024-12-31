import axios from "axios";

//interceptor sample code
const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});


apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    console.log("Request Sent:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response);
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);
