import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 3 }}>
        No movies found
      </Typography>
    );
  }

  return (
    <Box>
      {movies.map((movie) => (
        <Card
          key={movie._id}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            p: 2,
            borderRadius: 2,
          }}
        >
          {/* 🎬 Poster */}
          <Avatar
            variant="rounded"
            src={movie.poster}
            alt={movie.title}
            sx={{ width: 80, height: 110, mr: 2 }}
          />

          {/* 📄 Details */}
          <CardContent sx={{ p: 0 }}>
            <Typography fontWeight="bold">
              {movie.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {movie.description}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {movie.releaseYear} • {movie.duration}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MovieList;
