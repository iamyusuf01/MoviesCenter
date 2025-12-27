import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import toast from "react-hot-toast";
import { grey, yellow } from "@mui/material/colors";

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);

  const greyColor = grey[100]

  const fetchAllMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/movie/all-movies"
      );
      if (data?.success) {
        setAllMovies(data.movies);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);
  return (
    <Box sx={{ py: 6 }}>
      {allMovies.map((movie) => (
        <Box
          key={movie._id}
          sx={{ display: "flex", pb: 1, my: 1, p: 2, bgcolor: greyColor }}
        >
          <Avatar
            variant="rounded"
            src={movie.poster}
            sx={{ width: 90, height: 120, mr: 2 }}
          />

          <CardContent sx={{ p: 0, direction: "flex" }}>
            <Box>
              <Typography fontWeight="bold">{movie.title}</Typography>
              <Box sx={{ display: "flex", gap: 2, py: 1 }}>
                <Typography fontWeight="" color="grey" letterSpacing={1}>
                  {movie.releaseYear}
                </Typography>
                <Typography variant="body1" color="grey" letterSpacing={1}>
                  {movie.duration}
                </Typography>
                <Typography variant="body1" color="grey" letterSpacing={1}>
                  {movie.ageRating}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarIcon fontSize="small" c />
                  <Typography
                    variant="body2"
                    color="grey"
                    letterSpacing={1}
                    fontSize="medium"
                    sx={{ pt: 0.5 }}
                  >
                    {movie.rating}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="grey"
                  letterSpacing={1}
                  fontSize="medium"
                >
                  (3.1M)
                </Typography>
                <Button sx={{ alignItems: "center", gap: 1 }}>
                  <StarOutlineIcon fontSize="small" sx={{ py: 0 }} />
                  <Typography variant="body2"> Rate</Typography>
                </Button>
                <Button sx={{ alignItems: "center", gap: 1 }}>
                  <VisibilityIcon fontSize="small" color="yellow" />
                  <Typography variant="body2"> Mark as watched</Typography>
                </Button>
              </Box>
            </Box>
            {/* <Box>
              <ErrorOutlineIcon />
            </Box> */}
          </CardContent>
        </Box>
      ))}
    </Box>
  );
};

export default AllMovies;
