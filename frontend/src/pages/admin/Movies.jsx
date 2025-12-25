import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Movies = () => {
  const { isAdmin, token } = useContext(AppContext);
  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();
  const fetchAdminMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/admin/get-movies",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      data.success && setMovie(data.movies);
      console.log(data)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminMovies();
    }
  }, [isAdmin]);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Movies
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/add-movie")}
        >
          Add Movie
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movie?.length ? (
              movie.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell align="center">{item.ageRating}+</TableCell>
                  <TableCell align="center">{item.releaseYear}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No movies available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Movies;
