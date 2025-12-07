import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8030";

export const publicAxios = axios.create({
    baseURL: BASE_URL + "/public",
    withCredentials: false
});

// GLOBAL ERROR HANDLER
publicAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Backend down or unreachable
    if (!error.response) {
      toast.error("Server is not reachable. Please try again later.");
      return Promise.reject(error);
    }

    // Handle specific status codes
    switch (error.response.status ) {
      case 400:
        toast.error("Bad Request");
        break;
      case 401:
        toast.error("Unauthorized access");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 500:
        toast.error("Internal Server Error");
        break;
      case 503:
        toast.error("Server under maintenance");
        break;
      default:
        toast.error("Something went wrong");
    }

    return Promise.reject(error);
  }
);