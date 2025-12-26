import { Box, IconButton, InputBase, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [input, setInput] = useState(queryParam);
  const navigate = useNavigate()

  useEffect(() => {
    if(!queryParam.trim()){
      setMovies([])
      return;
    }
    const searchMovies = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/movie/search",
          {
            params: { q: queryParam }, // 🔥 send search text
            withCredentials: true,
          }
        );

        if (data.success) {
          setMovies(data.movies); // ✅ movies go here
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    searchMovies();
  }, [queryParam]); // ✅ only input triggers search

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      setSearchParams({ q: value }); // 👉 shows in URL
    } else {
      setSearchParams({}); // clear param
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "4px",
        flexGrow: 1,
        height: "36px",
        overflow: "hidden",
      }}
    >
      {/* Dropdown */}
      <Select
        defaultValue="all"
        sx={{
          height: "100%",
          borderRight: "1px solid #ddd",
          ".MuiSelect-select": {
            padding: "6px 12px",
          },
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="movies">Movies</MenuItem>
        <MenuItem value="tv">TV Shows</MenuItem>
      </Select>

      {/* Input */}
      <InputBase
        onClick={() => navigate('/search')}
        placeholder="Search IMDb"
        value={input}
        onChange={handleChange}
        sx={{
          paddingX: 2,
          flexGrow: 1,
        }}
      />

      {/* Search Icon */}
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default Search;
