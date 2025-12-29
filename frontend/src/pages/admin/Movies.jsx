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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Movies = () => {
  const { isAdmin, token } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchAdminMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/admin/get-movies",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      data.success && setMovies(data.movies);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClickDelete = async (id) => {
    if(!id) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/admin/movie/${id}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setMovies((prev) => prev.filter((m) => m._id !== id));
         fetchAdminMovies();
      } else {
        toast.error(data.message);
         fetchAdminMovies();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (isAdmin && token) {
      fetchAdminMovies();
    }
  }, [isAdmin, token]);
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
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movies?.length ? (
              movies.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={item.poster}
                      alt={item.title}
                      sx={{ width: 56, height: 80 }}
                    />
                  </TableCell>

                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell align="center">{item.ageRating}+</TableCell>
                  <TableCell align="center">{item.releaseYear}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`edit/${item._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleClickDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
