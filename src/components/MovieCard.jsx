import { Card, CardContent, CardMedia, Typography, Chip, Box, Rating, Button } from "@mui/material";
import { CalendarToday, AccessTime, Star } from "@mui/icons-material";
import { deleteMovie } from "../apis/movies";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function MovieCard({ movie, onDelete, onEdit  }) {
 const { role } = useContext(AuthContext);
  return (
    <Card
      sx={{
        width: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(1px)',
          boxShadow: '0 5px 14px rgba(0,0,0,0.15)',
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {movie.poster && (
        <CardMedia
          component="img"
          height="300"
          image={movie.poster}
          alt={movie.title}
          sx={{
            objectFit: 'cover',
            backgroundColor: '#f5f5f5'
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, p: 2.5 
       , display: 'flex', flexDirection: 'column', justifyContent: 'space-between' 
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            lineHeight: 1.3,
            color: '#1a1a1a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 0.5 }}>
          <Rating
            value={movie.rating / 2}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 600, color: '#f5c518' }}>
            {movie.rating}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            maxWidth: "100%"
          }}
        >
          {movie.description.length > 40
            ? movie.description.slice(0, 40) + "..."
            : movie.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
          {movie.releaseDate && (
            <Chip
              icon={<CalendarToday sx={{ fontSize: 16 }} />}
              label={new Date(movie.releaseDate).getFullYear()}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {movie.duration && (
            <Chip
              icon={<AccessTime sx={{ fontSize: 16 }} />}
              label={`${movie.duration} min`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
          {movie.genre && (
            <Chip
              label={movie.genre}
              size="small"
              color="primary"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
      </CardContent>
      {role === "admin" && (
        <Box sx={{ display: "flex", gap: 1, p: 2 }}>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(movie._id)}
          >
            Delete
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={() => onEdit(movie)}
          >
            Edit
          </Button>
        </Box>
      )}
    </Card>
  );
}