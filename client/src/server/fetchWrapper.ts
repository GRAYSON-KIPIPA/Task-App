// src/utils/fetchWrapper.js
import axios from "axios";

const fetchWrapper = axios.create({
  baseURL: "http://localhost:5000", // Base URL for your API
  timeout: 10000, // Optional: request timeout (in ms)
  headers: {
    "Content-Type": "application/json", // Optional: default content type
  },
});

// Optional: Add interceptors for requests and responses
fetchWrapper.interceptors.request.use(
  (config) => {
    // Example: Add an authorization token if needed
    const token = localStorage.getItem("authToken"); // Or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

fetchWrapper.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle global errors like 401 or 500
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.log("Unauthorized, please log in again.");
    }
    return Promise.reject(error);
  },
);

export default fetchWrapper;
