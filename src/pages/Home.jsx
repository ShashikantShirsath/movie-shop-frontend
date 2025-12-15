import { useEffect, useMemo, useState } from "react";
import { deleteMovie, getMovies } from "../apis/movies";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MoviesFilters";
import { Grid, Container, Pagination, Box } from "@mui/material";
import { Oval } from "react-loader-spinner";
import EditMovieDialog from "../components/EditMovieDialog";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    page: 1,
  });

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editMovie, setEditMovie] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = (movie) => {
    setEditMovie(movie);
    setEditOpen(true);
  };

  const { search, sortBy, page } = filters;

  const fetchMovies = async ({ q, sortBy, page }) => {
    setLoading(true);
    try {
      const data = await getMovies({ q, sortBy, page });
      setMovies(data.data);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () => debounce(fetchMovies, 500),
    []
  );

  useEffect(() => {
    debouncedFetch({ q: search, sortBy, page });
  }, [search]);

  useEffect(() => {
    fetchMovies({ q: search, sortBy, page });
  }, [sortBy, page]);

  const handleDeleteMovie = async (movieId) => {
    try {
      setLoading(true);
      console.log("Deleting movie with ID:", movieId);
      await deleteMovie(movieId);

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );

      setTotal((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleMovieUpdated = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m._id === updatedMovie._id ? updatedMovie : m))
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <EditMovieDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        movie={editMovie}
        onUpdated={handleMovieUpdated}
      />

      <MovieFilters
        search={search}
        setSearch={(value) =>
          setFilters((prev) => ({ ...prev, search: value, page: 1 }))
        }
        sortBy={sortBy}
        setSortBy={(value) =>
          setFilters((prev) => ({ ...prev, sortBy: value, page: 1 }))
        }
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            width: "100%",
          }}
        >
          <Oval
            height={40}
            width={40}
            color="#1976d2"
            secondaryColor="#90caf9"
            strokeWidth={4}
            strokeWidthSecondary={4}
            ariaLabel="loading"
          />
        </Box>
      ) : movies.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            color: "text.secondary",
            minHeight: "60vh",
          }}
        >
          <h3>No movies found</h3>
          <p>Try adjusting your search or filters</p>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {movies.map((movie) => (
            <Grid key={movie._id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} onDelete={handleDeleteMovie} onEdit={handleEditOpen} />
            </Grid>
          ))}
        </Grid>
      )}


      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) =>
            setFilters((prev) => ({ ...prev, page: value }))
          }
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      )}

      <p style={{ textAlign: "center", marginTop: 8 }}>
        Total Movies: {total}
      </p>
    </Container>
  );
}
