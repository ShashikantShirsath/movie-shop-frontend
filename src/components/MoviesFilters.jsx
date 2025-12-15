import {
  TextField,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";

export default function MovieFilters({
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      mb={3}
    >
      <TextField
        label="Search movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />

      <TextField
        select
        label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="title">Name</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="releaseDate">Release Date</MenuItem>
        <MenuItem value="duration">Duration</MenuItem>
      </TextField>
    </Stack>
  );
}
