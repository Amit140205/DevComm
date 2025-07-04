import axios from "axios";

// during production
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

export const axiosInstance = axios.create({
    // baseURL : "http://localhost:5000/api",
    baseURL : BASE_URL,
    withCredentials : true //send cookie along with the request
})