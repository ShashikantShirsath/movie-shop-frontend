import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateMovie } from "../apis/movies";
import toast from "react-hot-toast";

export default function EditMovieDialog({
  open,
  onClose,
  movie,
  onUpdated,
}) {
  const [form, setForm] = useState(movie);

  useEffect(() => {
    setForm(movie);
  }, [movie]);

  if (!movie) return null;

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (form.rating < 0 || form.rating > 10) {
    toast.error("Rating must be between 0 and 10" );
    return;
  }

  const submit = async () => {
    if (!form.title || !form.description || form.rating === "" || form.duration === "") {
      toast.error("All fields are required");
      return;
    }
    const updatedMovie = await updateMovie(movie._id, form);
    onUpdated(updatedMovie);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Movie</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            name="title"
            value={form?.title}
            onChange={change}
          />
          <TextField
            label="Description"
            name="description"
            value={form?.description}
            onChange={change}
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={form?.rating}
            slotProps={{
              htmlInput: {
                min: 0,
                max: 10,
                step: 0.1,
              },
            }}
            onChange={change}
          />
          <TextField
            label="Duration"
            name="duration"
            type="number"
            value={form?.duration}
            onChange={change}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}