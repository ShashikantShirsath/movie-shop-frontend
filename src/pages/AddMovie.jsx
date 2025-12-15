import { useState } from "react";
import { addMovie } from "../apis/movies";
import { TextField, Button, Container, Typography } from "@mui/material";
import toast from "react-hot-toast";

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

  const submit = async () => {
    if (!movie.title || !movie.description || movie.rating === "" || movie.duration === "") {
      toast.error("All fields are required");
      return;
    }

    if(movie.rating < 0 || movie.rating > 10) {
      toast.error("Rating must be between 0 and 10");
      return;
    }

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
        slotProps={{
          htmlInput: {
            min: 0,
            max: 10,
            step: 0.1,
          },
        }}
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
