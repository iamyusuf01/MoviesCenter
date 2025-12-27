import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { useContext} from "react";
import { AppContext } from "../../context/AppContext";

const MovieList = () => {
    const {query, movies} = useContext(AppContext)


  if (!query) {
    return <Typography align="center">Search something</Typography>;
  }

  if (movies.length === 0) {
    return <Typography align="center">No movies found</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Card key={movie._id} sx={{ display: "flex", mb: 2, p: 2 }}>
          <Avatar
            variant="rounded"
            src={movie.poster}
            sx={{ width: 80, height: 110, mr: 2 }}
          />

          <CardContent sx={{ p: 0 }}>
            <Typography fontWeight="bold">{movie.title}</Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Typography fontWeight="">{movie.releaseYear}</Typography>
              <Typography variant="body2">{movie.duration}</Typography>
              <Typography variant="body2">{movie.ageRating}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">{movie.rating}</Typography>
              <Typography variant="body2">(3.1M)</Typography>
              <Typography variant="body2">Rate</Typography>
              <Typography variant="body2">Mark as watched</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MovieList;
