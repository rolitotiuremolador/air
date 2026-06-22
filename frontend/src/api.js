import axios from "axios";

// Using Vite's environment variable system
const api = axios.create({
    baseURL: import.meta.env.VITE_API_UR || "http://127.0.0.1:8000",

    timeoout: 10000,

    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically add the JWT token to every request 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;