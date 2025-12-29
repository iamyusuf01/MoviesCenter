import React, { useContext, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AppContext } from "../../context/AppContext";
import Input from "@mui/material/Input";
import { TableRow } from "@mui/material";
import { useParams } from "react-router";
const UpdateMovies = () => {
  const { token, navigate } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const {id} = useParams()

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/movie/${id}`, {title, description, duration},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setDuration("");
        navigate('admin/movies')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box
      sx={{
        overflow: "hidden",
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 6,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>IMDb</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Add Movies
        </Typography>
      </Box>

      <Box
        sx={{
          width: 360,
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 3,
          flexDirection: "row",
        }}
      >
        <form onSubmit={handleClick}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Title
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Add Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Duration
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            placeholder="eg: 2h 30m"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            sx={{ mb: 1 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Description
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              width: "100%",
              marginBottom: 16,
              padding: "10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
            }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#ffd814",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "999px",
              py: 1,
              mb: 2,
              "&:hover": {
                backgroundColor: "#f7ca00",
              },
            }}
          >
            Add Movie
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateMovies;
