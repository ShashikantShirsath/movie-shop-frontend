import api from "./axios";
import toast from "react-hot-toast";

export const getMovies = async ({ q, sortBy, page }) => {
  try {
    const response = await api.get("/movies", {
      params: { q, sortBy, page },
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch movies");
    throw error;
  }
};

export const addMovie = async (movie) => {
  try {
    const response = await api.post("/movies", movie);
    toast.success("Movie added successfully");
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to add movie"
    );
    throw error;
  }
};

export const updateMovie = async (id, movie) => {
  try {
    const response = await api.put(`/movies/${id}`, movie);
    toast.success("Movie updated successfully");
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update movie"
    );
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    await api.delete(`/movies/${id}`);
    toast.success("Movie deleted successfully");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to delete movie"
    );
    throw error;
  }
};
