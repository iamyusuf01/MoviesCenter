import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const AddMovies = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>IMDb</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>
          Add Movies
        </Typography>
      </Box>

      <Box
        sx={{
          width: 360,
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 3,
        }}
      >
        <form>
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Title
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Add Title"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Add Description"
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
            sx={{ mb: 1 }}
          />

          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Age Limit
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            placeholder="Age Limit"
            sx={{ mb: 3 }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: "bold", mb: 0.5 }}>
            Release Date
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            placeholder="eg: 2025"
            sx={{ mb: 3 }}
          />
          <Button
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
  )
}

export default AddMovies