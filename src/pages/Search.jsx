import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import api from "../apis/axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchSearch = async (q) => {
    const { data } = await api.get(`/movies/search?q=${q}`);
    setMovies(data);
  };

  const fetchSorted = async (key) => {
    const { data } = await api.get(`/movies/sorted?sortBy=${key}`);
    setMovies(data);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      fetchSearch(value);
    } else {
      setMovies([]);
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (value) fetchSorted(value);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Search Movies
      </Typography>

      <TextField
        fullWidth
        label="Search by name or description"
        value={query}
        onChange={handleSearch}
      />

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={handleSort}>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
