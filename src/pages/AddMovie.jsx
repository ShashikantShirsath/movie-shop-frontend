import { useState } from "react";
import { addMovie } from "../apis/movies";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  const change = (e) =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};

    if (!movie.title.trim()) {
      newErrors.title = "Title is required";
    } else if (movie.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }

    if (!movie.description.trim()) {
      newErrors.description = "Description is required";
    } else if (movie.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!movie.rating) {
      newErrors.rating = "Rating is required";
    } else if (movie.rating < 0 || movie.rating > 10) {
      newErrors.rating = "Rating must be between 0 and 10";
    }

    if (!movie.duration) {
      newErrors.duration = "Duration is required";
    } else if (movie.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    await addMovie(movie);
    setMovie({ title: "", description: "", rating: "", duration: "" });
    setErrors({});
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Add Movie</Typography>

      <TextField
        fullWidth
        label="Title"
        name="title"
        value={movie.title}
        onChange={change}
        sx={{ mt: 2 }}
        error={!!errors.title}
        helperText={errors.title}
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={movie.description}
        onChange={change}
        sx={{ mt: 2 }}
         error={!!errors.description}
        helperText={errors.description}
      />

      <TextField
        fullWidth
        label="Rating"
        type="number"
        name="rating"
        inputProps={{ min: 0, max: 10, step: 0.1 }}
        value={movie.rating}
        onChange={change}
        error={!!errors.rating}
        helperText={errors.rating || "0 – 10"}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Duration (minutes)"
        type="number"
        name="duration"
        inputProps={{ min: 1 }}
        value={movie.duration}
        onChange={change}
        error={!!errors.duration}
        helperText={errors.duration}
        sx={{ mt: 2 }}
      />

      <Button variant="contained" sx={{ mt: 3 }} onClick={submit}>
        Add Movie
      </Button>
    </Container>
  );
}
