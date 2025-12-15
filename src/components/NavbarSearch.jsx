import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";

export default function NavbarSearch({ options }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: 200, sm: 260, md: 380, lg: 450 },
      }}
    >
      <Autocomplete
        freeSolo
        disableClearable
        options={options}

        PaperProps={{
          sx: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search movies"
            variant="outlined"

            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              },
            }}

            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#000",
                borderRadius: "10px",
                paddingLeft: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f5c518",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f5c518",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#f5c518",
                  borderWidth: 2,
                },
            }}
          />
        )}
      />
    </Box>
  );
}
