import api from "./axios";
import toast from "react-hot-toast";


export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Login failed. Please try again.";

    toast.error(message);
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post("/auth/register", credentials);
    toast.success(response.data.message || "Registration successful. You can now log in.");
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Registration failed. Please try again.";

    toast.error(message);
    throw error;
  }
}